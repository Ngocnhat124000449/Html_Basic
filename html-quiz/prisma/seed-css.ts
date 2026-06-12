import "dotenv/config";
import { PrismaClient, Prisma, type QuestionType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CSS_TAGS } from "./css-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Seed track CSS — KHÔNG phá hủy, và TUYỆT ĐỐI không đụng dữ liệu track html.
// Chạy: npm run seed:css
async function main() {
  let order = 0;
  for (const t of CSS_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { track_name: { track: "css", name: t.name } },
      update: { topic: t.topic, part: t.part, description: t.description, order },
      create: {
        track: "css",
        name: t.name,
        topic: t.topic,
        part: t.part,
        description: t.description,
        order,
      },
    });
    order++;

    for (const q of t.questions) {
      const data = {
        type: q.type as QuestionType,
        options: q.options ?? Prisma.DbNull,
        correctIndex: q.correctIndex ?? null,
        requirements: q.requirements ?? Prisma.DbNull,
        starterCode: q.starterCode ?? null,
        answer: null,
      };
      const existing = await prisma.question.findFirst({
        where: { tagId: tag.id, tier: q.tier, prompt: q.prompt },
      });
      if (existing) {
        await prisma.question.update({ where: { id: existing.id }, data });
      } else {
        await prisma.question.create({
          data: { ...data, prompt: q.prompt, tagId: tag.id, tier: q.tier },
        });
      }
    }

    await prisma.question.deleteMany({
      where: {
        tagId: tag.id,
        NOT: { OR: t.questions.map((q) => ({ tier: q.tier, prompt: q.prompt })) },
      },
    });
  }

  // Dọn mục CSS không còn trong seed — giới hạn track css
  await prisma.tag.deleteMany({
    where: { track: "css", name: { notIn: CSS_TAGS.map((t) => t.name) } },
  });

  const [tagCount, qCount, progressCount, htmlTags, htmlQs] = await Promise.all([
    prisma.tag.count({ where: { track: "css" } }),
    prisma.question.count({ where: { tag: { track: "css" } } }),
    prisma.userTagProgress.count({ where: { tag: { track: "css" } } }),
    prisma.tag.count({ where: { track: "html" } }),
    prisma.question.count({ where: { tag: { track: "html" } } }),
  ]);
  console.log(
    `CSS: ${tagCount} mục, ${qCount} câu — giữ ${progressCount} tiến độ. HTML không đổi: ${htmlTags} thẻ, ${htmlQs} câu`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
