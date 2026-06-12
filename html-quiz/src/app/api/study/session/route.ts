import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ClientQuestion, SessionTag } from "@/lib/study-types";

const NEW_PER_DAY = 5;
const SESSION_CAP = 10;

type TagWithQuestions = Prisma.TagGetPayload<{ include: { questions: true } }>;

// Mỗi bậc có nhiều biến thể — mỗi phiên chọn ngẫu nhiên 1 câu/bậc
// để lần ôn sau không gặp lại đúng đề cũ
function pickOnePerTier(questions: TagWithQuestions["questions"]) {
  const byTier = new Map<number, TagWithQuestions["questions"]>();
  for (const q of questions) {
    const list = byTier.get(q.tier) ?? [];
    list.push(q);
    byTier.set(q.tier, list);
  }
  return [...byTier.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, list]) => list[Math.floor(Math.random() * list.length)]);
}

function toClient(tag: TagWithQuestions, isNew: boolean): SessionTag {
  return {
    tagId: tag.id,
    name: tag.name,
    topic: tag.topic,
    description: tag.description,
    isNew,
    questions: pickOnePerTier(tag.questions).map(
      (q): ClientQuestion => ({
        id: q.id,
        tier: q.tier,
        type: q.type,
        prompt: q.prompt,
        options: (q.options as string[] | null) ?? null,
        starterCode: q.starterCode,
      })
    ),
  };
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const userId = session.user.id;
  const now = new Date();
  // extra=1: học vượt — bỏ giới hạn thẻ mới/ngày, lấy tiếp 5 thẻ chưa học kế tiếp
  const extra = new URL(req.url).searchParams.get("extra") === "1";

  const due = await prisma.userTagProgress.findMany({
    where: { userId, dueAt: { lte: now } },
    orderBy: { dueAt: "asc" },
    include: { tag: { include: { questions: { orderBy: { tier: "asc" } } } } },
  });

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const newToday = await prisma.userTagProgress.count({
    where: { userId, createdAt: { gte: startOfDay } },
  });
  const allowedNew = extra ? NEW_PER_DAY : Math.max(0, NEW_PER_DAY - newToday);

  let newTags: TagWithQuestions[] = [];
  if (allowedNew > 0) {
    const seen = await prisma.userTagProgress.findMany({
      where: { userId },
      select: { tagId: true },
    });
    newTags = await prisma.tag.findMany({
      where: { id: { notIn: seen.map((s) => s.tagId) } },
      orderBy: { order: "asc" },
      take: allowedNew,
      include: { questions: { orderBy: { tier: "asc" } } },
    });
  }

  const tags = [
    ...due.map((d) => toClient(d.tag, false)),
    ...newTags.map((t) => toClient(t, true)),
  ].slice(0, SESSION_CAP);

  return NextResponse.json({ tags });
}
