import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CSS_TAGS } from "../prisma/css-content";

// GIỮ attempts: đổi tên prompt TẠI CHỖ (update theo id) thay vì để seed xóa+tạo lại.
// Ghép câu DB ↔ seed theo "chữ ký" (mọi trường TRỪ prompt — vì chỉ prompt đổi).
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

type SeedQ = {
  tier: number;
  type: string;
  prompt: string;
  options?: unknown;
  correctIndex?: number | null;
  requirements?: unknown;
  starterCode?: string | null;
  answer?: string | null;
};
type SeedTag = { name: string; questions: SeedQ[] };

function sig(q: {
  tier: number;
  type: string;
  options?: unknown;
  correctIndex?: number | null;
  requirements?: unknown;
  starterCode?: string | null;
  answer?: string | null;
}): string {
  return JSON.stringify([
    q.tier,
    q.type,
    q.options ?? null,
    q.correctIndex ?? null,
    q.requirements ?? null,
    q.starterCode ?? null,
    q.answer ?? null,
  ]);
}

async function reconcile(track: string, seedTags: SeedTag[]) {
  let renamed = 0;
  let unchanged = 0;
  let unmatched = 0;
  for (const t of seedTags) {
    const tag = await prisma.tag.findUnique({
      where: { track_name: { track, name: t.name } },
      include: { questions: true },
    });
    if (!tag) {
      console.warn(`  ! Không thấy tag (track=${track}): ${t.name}`);
      continue;
    }
    // Gom câu DB theo chữ ký (có thể nhiều câu trùng chữ ký → hàng đợi)
    const dbBySig = new Map<string, typeof tag.questions>();
    for (const dq of tag.questions) {
      const k = sig(dq as unknown as Parameters<typeof sig>[0]);
      (dbBySig.get(k) ?? dbBySig.set(k, []).get(k)!).push(dq);
    }
    for (const sq of t.questions) {
      const k = sig(sq);
      const bucket = dbBySig.get(k);
      if (!bucket || bucket.length === 0) {
        unmatched++;
        console.warn(`  ! Không khớp chữ ký (${t.name}): ${sq.prompt.slice(0, 50)}...`);
        continue;
      }
      const dq = bucket.shift()!; // claim
      if (dq.prompt === sq.prompt) {
        unchanged++;
      } else {
        await prisma.question.update({ where: { id: dq.id }, data: { prompt: sq.prompt } });
        renamed++;
      }
    }
  }
  console.log(`[${track}] đổi tên ${renamed} câu, giữ nguyên ${unchanged}, không khớp ${unmatched}.`);
}

async function main() {
  process.env.SEED_IMPORT_ONLY = "1";
  const { tags } = (await import("../prisma/seed")) as { tags: SeedTag[] };
  await reconcile("html", tags);
  await reconcile("css", CSS_TAGS as unknown as SeedTag[]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
