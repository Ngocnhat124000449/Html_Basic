import "dotenv/config";
import { PrismaClient, Prisma, type QuestionType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { JS_TAGS } from "./js-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Seed track JS — KHÔNG phá hủy, TUYỆT ĐỐI không đụng dữ liệu track html/css.
// Chạy: npm run seed:js
async function main() {
  let order = 0;
  for (const t of JS_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { track_name: { track: "js", name: t.name } },
      update: { topic: t.topic, part: t.part, description: t.description, order },
      create: {
        track: "js",
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

  // Dọn mục JS không còn trong seed — giới hạn track js
  await prisma.tag.deleteMany({
    where: { track: "js", name: { notIn: JS_TAGS.map((t) => t.name) } },
  });

  const [jsTags, jsQs, jsProg, htmlTags, cssTags] = await Promise.all([
    prisma.tag.count({ where: { track: "js" } }),
    prisma.question.count({ where: { tag: { track: "js" } } }),
    prisma.userTagProgress.count({ where: { tag: { track: "js" } } }),
    prisma.tag.count({ where: { track: "html" } }),
    prisma.tag.count({ where: { track: "css" } }),
  ]);
  console.log(
    `JS: ${jsTags} mục, ${jsQs} câu — giữ ${jsProg} tiến độ. Không đổi: HTML ${htmlTags} thẻ, CSS ${cssTags} mục`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
