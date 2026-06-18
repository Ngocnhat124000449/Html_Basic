import "dotenv/config";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { isValidFsrsParams } from "../src/lib/fsrs-params";

// PHA 2 — Bước 3/3: nạp tham số FSRS đã tối ưu vào UserSettings.fsrsParams.
// Đọc tmp/revlog/*.params.json (do optimize_fsrs.py tạo), VALIDATE đúng 21 số
// hữu hạn rồi ghi (+ fsrsOptimizedAt). fsrs.ts/getUserSettings tự dùng ngay.
//
// Chạy:  npx tsx scripts/import-fsrs-params.ts          (ghi thật)
//        npx tsx scripts/import-fsrs-params.ts --dry     (chỉ kiểm, không ghi)

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "tmp", "revlog");

async function main() {
  const dry = process.argv.includes("--dry");
  const files = existsSync(DIR)
    ? readdirSync(DIR)
        .filter((f) => f.endsWith(".params.json"))
        .map((f) => join(DIR, f))
    : [];

  if (files.length === 0) {
    console.log("Không có *.params.json — chạy optimize_fsrs.py trước.");
    return;
  }

  let ok = 0;
  for (const file of files) {
    const data = JSON.parse(readFileSync(file, "utf8")) as { userId?: string; w?: unknown };
    if (!data.userId || !isValidFsrsParams(data.w)) {
      console.error(`✗ ${file} — bỏ qua: thiếu userId hoặc tham số không hợp lệ (cần 21 số)`);
      continue;
    }
    if (dry) {
      console.log(`(dry) ✓ ${data.userId.slice(0, 8)} — 21 tham số hợp lệ`);
      ok++;
      continue;
    }
    await prisma.userSettings.upsert({
      where: { userId: data.userId },
      update: { fsrsParams: data.w, fsrsOptimizedAt: new Date() },
      create: { userId: data.userId, fsrsParams: data.w, fsrsOptimizedAt: new Date() },
    });
    console.log(`✓ ${data.userId.slice(0, 8)} — đã lưu tham số tối ưu`);
    ok++;
  }
  console.log(`\n${dry ? "Kiểm" : "Ghi"} xong ${ok}/${files.length} user.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
