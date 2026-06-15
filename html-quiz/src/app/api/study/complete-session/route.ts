import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nextWithLog, MAX_WRONG } from "@/lib/fsrs";

// Chế độ phản xạ chấm cả phiên một lần: mỗi thẻ kèm tổng lượt sai (0..MAX_WRONG).
const schema = z.object({
  results: z
    .array(
      z.object({
        tagId: z.string(),
        wrongCount: z.number().int().min(0).max(MAX_WRONG),
      })
    )
    .min(1)
    .max(50),
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
  // Gộp trùng tagId (phòng client gửi lặp) — giữ lượt sai lớn nhất.
  const byTag = new Map<string, number>();
  for (const r of parsed.data.results) {
    byTag.set(r.tagId, Math.max(byTag.get(r.tagId) ?? 0, r.wrongCount));
  }

  // Chỉ chấm những thẻ có thật.
  const tags = await prisma.tag.findMany({
    where: { id: { in: [...byTag.keys()] } },
    select: { id: true },
  });
  const validIds = new Set(tags.map((t) => t.id));

  const now = new Date();
  const existing = await prisma.userTagProgress.findMany({
    where: { userId, tagId: { in: [...validIds] } },
  });
  const byId = new Map(existing.map((p) => [p.tagId, p]));

  const ops = [];
  const summary: { tagId: string; mastered: boolean }[] = [];
  for (const tagId of validIds) {
    const wrongCount = byTag.get(tagId) ?? 0;
    const { fields: next, log } = nextWithLog(byId.get(tagId) ?? null, wrongCount, now);
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
    ops.push(
      prisma.userTagProgress.upsert({
        where: { userId_tagId: { userId, tagId } },
        update: data,
        create: { userId, tagId, ...data },
      }),
      prisma.reviewLog.create({
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
      })
    );
    summary.push({ tagId, mastered: next.mastered });
  }

  await prisma.$transaction(ops);

  return NextResponse.json({ ok: true, summary });
}
