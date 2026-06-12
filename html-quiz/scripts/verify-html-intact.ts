// Lưới an toàn GĐ 0: xác minh dữ liệu khóa học HTML còn nguyên vẹn.
// Chạy SAU MỖI giai đoạn xây CSS-Quiz:  npx tsx scripts/verify-html-intact.ts
// Cập nhật baseline (chỉ khi chủ đích):  npx tsx scripts/verify-html-intact.ts --update
//
// Script hoạt động cả trước và sau migration thêm cột track (đọc track động).

import "dotenv/config";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const BASELINE_PATH = join(dirname(fileURLToPath(import.meta.url)), "html-baseline.json");

type Baseline = {
  tags: number;
  questions: number;
  questionsPerTag: number;
  progressRows: number;
  attemptRows: number;
  usersWithProgress: Record<string, number>;
};

async function snapshot(): Promise<Baseline> {
  const tags = await prisma.tag.findMany({ include: { questions: { select: { id: true } } } });
  // Trước migration: chưa có cột track → coi tất cả là html.
  // Sau migration: chỉ tính track === "html".
  const htmlTags = tags.filter((t) => ((t as { track?: string }).track ?? "html") === "html");
  const htmlTagIds = new Set(htmlTags.map((t) => t.id));
  const questionIds = htmlTags.flatMap((t) => t.questions.map((q) => q.id));

  const progress = await prisma.userTagProgress.findMany({
    where: { tagId: { in: [...htmlTagIds] } },
    include: { user: { select: { email: true } } },
  });
  const attemptRows = await prisma.attempt.count({
    where: { questionId: { in: questionIds } },
  });

  const usersWithProgress: Record<string, number> = {};
  for (const p of progress) {
    usersWithProgress[p.user.email] = (usersWithProgress[p.user.email] ?? 0) + 1;
  }

  return {
    tags: htmlTags.length,
    questions: questionIds.length,
    questionsPerTag: htmlTags.every((t) => t.questions.length === 7) ? 7 : -1,
    progressRows: progress.length,
    attemptRows,
    usersWithProgress,
  };
}

async function main() {
  const current = await snapshot();

  if (process.argv.includes("--update") || !existsSync(BASELINE_PATH)) {
    writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 2));
    console.log("✓ Đã ghi baseline:", JSON.stringify(current));
    return;
  }

  const baseline: Baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const errors: string[] = [];

  if (current.tags !== baseline.tags)
    errors.push(`Số thẻ HTML: ${current.tags} (baseline ${baseline.tags})`);
  if (current.questions !== baseline.questions)
    errors.push(`Số câu hỏi HTML: ${current.questions} (baseline ${baseline.questions})`);
  if (current.questionsPerTag !== 7) errors.push(`Có thẻ không đủ 7 câu (3+3+1)`);
  // Tiến độ/attempts chỉ được phép TĂNG (người dùng học thêm) — giảm là mất dữ liệu
  if (current.progressRows < baseline.progressRows)
    errors.push(`Tiến độ GIẢM: ${current.progressRows} < ${baseline.progressRows}`);
  if (current.attemptRows < baseline.attemptRows)
    errors.push(`Attempt GIẢM: ${current.attemptRows} < ${baseline.attemptRows}`);
  for (const [email, count] of Object.entries(baseline.usersWithProgress)) {
    if ((current.usersWithProgress[email] ?? 0) < count)
      errors.push(`Tiến độ của ${email} giảm: ${current.usersWithProgress[email] ?? 0} < ${count}`);
  }

  if (errors.length > 0) {
    console.error("✗ DỮ LIỆU HTML BỊ ẢNH HƯỞNG:");
    for (const e of errors) console.error("  -", e);
    process.exit(1);
  }
  console.log(
    `✓ HTML nguyên vẹn: ${current.tags} thẻ, ${current.questions} câu, ` +
      `${current.progressRows} tiến độ, ${current.attemptRows} attempts`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
