import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nextWithLog, MAX_WRONG } from "@/lib/fsrs";

const schema = z.object({
  tagId: z.string(),
  // Số lượt sai trong phiên (0..MAX_WRONG). ≥MAX_WRONG = rớt thẻ.
  wrongCount: z.number().int().min(0).max(MAX_WRONG),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  const { tagId, wrongCount } = parsed.data;

  const tag = await prisma.tag.findUnique({ where: { id: tagId } });
  if (!tag) {
    return NextResponse.json({ error: "Không tìm thấy thẻ" }, { status: 404 });
  }

  const existing = await prisma.userTagProgress.findUnique({
    where: { userId_tagId: { userId, tagId } },
  });
  // FSRS lên lịch lần ôn kế tiếp từ state hiện tại + số lượt sai trong phiên.
  const { fields: next, log } = nextWithLog(existing, wrongCount, new Date());

  const data = {
    stability: next.stability,
    difficulty: next.difficulty,
    reps: next.reps,
    state: next.state,
    scheduledDays: next.scheduledDays,
    lapses: next.lapses,
    mastered: next.mastered,
    dueAt: next.dueAt,
    lastReviewedAt: next.lastReviewedAt,
  };

  await prisma.userTagProgress.upsert({
    where: { userId_tagId: { userId, tagId } },
    update: data,
    create: { userId, tagId, ...data },
  });

  // Nhật ký ôn (P2) — để dành cho optimizer FSRS sau này.
  await prisma.reviewLog.create({
    data: {
      userId,
      tagId,
      rating: log.rating,
      state: log.state,
      stability: log.stability,
      difficulty: log.difficulty,
      elapsedDays: log.elapsedDays,
      scheduledDays: log.scheduledDays,
      due: log.due,
      reviewedAt: log.reviewedAt,
    },
  });

  return NextResponse.json({ ok: true, mastered: next.mastered });
}
