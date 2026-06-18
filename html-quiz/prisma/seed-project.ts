import "dotenv/config";
import { PrismaClient, Prisma, type QuestionType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PROJECT_TAGS } from "./project-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Seed track "Dự án" — KHÔNG phá hủy, TUYỆT ĐỐI không đụng track khác.
// Chạy: npm run seed:project
async function main() {
  let order = 0;
  for (const t of PROJECT_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { track_name: { track: "project", name: t.name } },
      update: { topic: t.topic, part: t.part, description: t.description, order },
      create: {
        track: "project",
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

  await prisma.tag.deleteMany({
    where: { track: "project", name: { notIn: PROJECT_TAGS.map((t) => t.name) } },
  });

  const [projTags, projQs, projProg, htmlTags] = await Promise.all([
    prisma.tag.count({ where: { track: "project" } }),
    prisma.question.count({ where: { tag: { track: "project" } } }),
    prisma.userTagProgress.count({ where: { tag: { track: "project" } } }),
    prisma.tag.count({ where: { track: "html" } }),
  ]);
  console.log(
    `Dự án: ${projTags} mục, ${projQs} câu — giữ ${projProg} tiến độ. HTML không đổi: ${htmlTags} thẻ`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
