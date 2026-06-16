import "dotenv/config";
import { PrismaClient, Prisma, type QuestionType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { GIT_TAGS } from "./git-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Seed track Git & Công cụ — KHÔNG phá hủy, TUYỆT ĐỐI không đụng track html/css/js/dsa.
// Chạy: npm run seed:git
async function main() {
  let order = 0;
  for (const t of GIT_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { track_name: { track: "git", name: t.name } },
      update: { topic: t.topic, part: t.part, description: t.description, order },
      create: {
        track: "git",
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

  // Dọn mục Git không còn trong seed — giới hạn track git
  await prisma.tag.deleteMany({
    where: { track: "git", name: { notIn: GIT_TAGS.map((t) => t.name) } },
  });

  const [gitTags, gitQs, gitProg, htmlTags, cssTags, jsTags, dsaTags] = await Promise.all([
    prisma.tag.count({ where: { track: "git" } }),
    prisma.question.count({ where: { tag: { track: "git" } } }),
    prisma.userTagProgress.count({ where: { tag: { track: "git" } } }),
    prisma.tag.count({ where: { track: "html" } }),
    prisma.tag.count({ where: { track: "css" } }),
    prisma.tag.count({ where: { track: "js" } }),
    prisma.tag.count({ where: { track: "dsa" } }),
  ]);
  console.log(
    `Git: ${gitTags} mục, ${gitQs} câu — giữ ${gitProg} tiến độ. Không đổi: HTML ${htmlTags} thẻ, CSS ${cssTags} mục, JS ${jsTags} mục, DSA ${dsaTags} mục`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
