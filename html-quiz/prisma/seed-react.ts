import "dotenv/config";
import { PrismaClient, Prisma, type QuestionType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { REACT_TAGS } from "./react-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Seed track React — KHÔNG phá hủy, TUYỆT ĐỐI không đụng track html/css/js/dsa/git.
// Chạy: npm run seed:react
async function main() {
  let order = 0;
  for (const t of REACT_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { track_name: { track: "react", name: t.name } },
      update: { topic: t.topic, part: t.part, description: t.description, order },
      create: {
        track: "react",
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

  // Dọn mục React không còn trong seed — giới hạn track react
  await prisma.tag.deleteMany({
    where: { track: "react", name: { notIn: REACT_TAGS.map((t) => t.name) } },
  });

  const [reactTags, reactQs, reactProg, htmlTags, cssTags, jsTags, dsaTags, gitTags] =
    await Promise.all([
      prisma.tag.count({ where: { track: "react" } }),
      prisma.question.count({ where: { tag: { track: "react" } } }),
      prisma.userTagProgress.count({ where: { tag: { track: "react" } } }),
      prisma.tag.count({ where: { track: "html" } }),
      prisma.tag.count({ where: { track: "css" } }),
      prisma.tag.count({ where: { track: "js" } }),
      prisma.tag.count({ where: { track: "dsa" } }),
      prisma.tag.count({ where: { track: "git" } }),
    ]);
  console.log(
    `React: ${reactTags} mục, ${reactQs} câu — giữ ${reactProg} tiến độ. Không đổi: HTML ${htmlTags} thẻ, CSS ${cssTags} mục, JS ${jsTags} mục, DSA ${dsaTags} mục, Git ${gitTags} mục`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
