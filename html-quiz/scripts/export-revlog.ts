import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// PHA 2 — Bước 1/3: export ReviewLog của từng người ra CSV cho fsrs-optimizer.
// Chỉ export user có ĐỦ ngưỡng lượt ôn (mặc định 400). Định dạng CSV tối giản
// mà fsrs-optimizer đọc được: card_id, review_time(epoch ms), review_rating(1-4),
// review_state. Mỗi user một file tmp/revlog/<userId>.csv (KHÔNG commit — trong tmp).
//
// Chạy: npx tsx scripts/export-revlog.ts            (tất cả user đủ ngưỡng)
//       npx tsx scripts/export-revlog.ts <userId>   (một user cụ thể, bỏ qua ngưỡng)

const MIN_REVIEWS = 400;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "tmp", "revlog");

async function main() {
  const onlyUser = process.argv[2];
  mkdirSync(OUT_DIR, { recursive: true });

  // Đếm số lượt ôn mỗi người.
  const grouped = await prisma.reviewLog.groupBy({
    by: ["userId"],
    _count: { _all: true },
    ...(onlyUser ? { where: { userId: onlyUser } } : {}),
  });

  const eligible = grouped.filter((g) => onlyUser || g._count._all >= MIN_REVIEWS);
  if (eligible.length === 0) {
    console.log(
      `Chưa có user nào đạt ${MIN_REVIEWS} lượt ôn. Hiện có: ` +
        (grouped.map((g) => `${g.userId.slice(0, 8)}=${g._count._all}`).join(", ") || "(trống)")
    );
    return;
  }

  const manifest: { userId: string; reviews: number; file: string }[] = [];
  for (const g of eligible) {
    const logs = await prisma.reviewLog.findMany({
      where: { userId: g.userId },
      orderBy: { reviewedAt: "asc" },
      select: { tagId: true, rating: true, state: true, reviewedAt: true },
    });
    const rows = ["card_id,review_time,review_rating,review_state"];
    for (const l of logs) {
      rows.push(`${l.tagId},${l.reviewedAt.getTime()},${l.rating},${l.state}`);
    }
    const file = join(OUT_DIR, `${g.userId}.csv`);
    writeFileSync(file, rows.join("\n") + "\n");
    manifest.push({ userId: g.userId, reviews: logs.length, file });
    console.log(`✓ ${g.userId.slice(0, 8)} — ${logs.length} lượt → ${file}`);
  }
  writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nĐã export ${manifest.length} user. Bước kế: python scripts/optimize_fsrs.py`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
