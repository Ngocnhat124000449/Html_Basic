import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Khởi tạo state FSRS cho các UserTagProgress cũ (SM-2) — MỘT lần, idempotent.
// GIỮ nguyên dueAt/lapses/createdAt; chỉ điền stability/difficulty/state/...
// Bỏ qua hàng đã có stability > 0 (đã migrate). Không đụng nội dung thẻ.
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const DAY = 24 * 60 * 60 * 1000;
const STATE_REVIEW = 2;

// ease 2.5 → D≈5 ; ease 1.3 → D≈8 ; cộng nhẹ theo lapses. Kẹp [1,10].
function difficultyFromEase(ease: number, lapses: number): number {
  const d = 5 + ((2.5 - ease) / 1.2) * 3 + Math.min(lapses * 0.3, 2);
  return Math.min(10, Math.max(1, Math.round(d * 100) / 100));
}

async function main() {
  const rows = await prisma.userTagProgress.findMany({
    where: { stability: { lte: 0 } },
  });
  let migrated = 0;
  for (const r of rows) {
    const stability = Math.max(1, r.intervalDays);
    const difficulty = difficultyFromEase(r.ease, r.lapses);
    const lastReviewedAt = new Date(r.dueAt.getTime() - r.intervalDays * DAY);
    await prisma.userTagProgress.update({
      where: { id: r.id },
      data: {
        stability,
        difficulty,
        reps: 1,
        state: STATE_REVIEW,
        scheduledDays: r.intervalDays,
        lastReviewedAt,
        mastered: stability >= 21,
      },
    });
    migrated++;
  }
  const byState = await prisma.userTagProgress.groupBy({ by: ["state"], _count: true });
  console.log("Đã migrate sang FSRS — số bản ghi:", migrated, "| phân bố state:", byState);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
