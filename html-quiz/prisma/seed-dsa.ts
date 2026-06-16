import "dotenv/config";
import { PrismaClient, Prisma, type QuestionType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { DSA_TAGS } from "./dsa-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Seed track DSA — KHÔNG phá hủy, TUYỆT ĐỐI không đụng dữ liệu track html/css/js.
// Chạy: npm run seed:dsa
async function main() {
  let order = 0;
  for (const t of DSA_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { track_name: { track: "dsa", name: t.name } },
      update: { topic: t.topic, part: t.part, description: t.description, order },
      create: {
        track: "dsa",
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

  // Dọn mục DSA không còn trong seed — giới hạn track dsa
  await prisma.tag.deleteMany({
    where: { track: "dsa", name: { notIn: DSA_TAGS.map((t) => t.name) } },
  });

  const [dsaTags, dsaQs, dsaProg, htmlTags, cssTags, jsTags] = await Promise.all([
    prisma.tag.count({ where: { track: "dsa" } }),
    prisma.question.count({ where: { tag: { track: "dsa" } } }),
    prisma.userTagProgress.count({ where: { tag: { track: "dsa" } } }),
    prisma.tag.count({ where: { track: "html" } }),
    prisma.tag.count({ where: { track: "css" } }),
    prisma.tag.count({ where: { track: "js" } }),
  ]);
  console.log(
    `DSA: ${dsaTags} mục, ${dsaQs} câu — giữ ${dsaProg} tiến độ. Không đổi: HTML ${htmlTags} thẻ, CSS ${cssTags} mục, JS ${jsTags} mục`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
