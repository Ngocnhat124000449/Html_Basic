import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { applyPass, applyFail } from "@/lib/srs";

const schema = z.object({
  tagId: z.string(),
  passed: z.boolean(),
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
  const { tagId, passed } = parsed.data;

  const tag = await prisma.tag.findUnique({ where: { id: tagId } });
  if (!tag) {
    return NextResponse.json({ error: "Không tìm thấy thẻ" }, { status: 404 });
  }

  const existing = await prisma.userTagProgress.findUnique({
    where: { userId_tagId: { userId, tagId } },
  });
  const state = {
    ease: existing?.ease ?? 2.5,
    intervalDays: existing?.intervalDays ?? 0,
    lapses: existing?.lapses ?? 0,
  };
  const next = passed ? applyPass(state) : applyFail(state);
  const dueAt = new Date(Date.now() + next.intervalDays * 24 * 60 * 60 * 1000);

  await prisma.userTagProgress.upsert({
    where: { userId_tagId: { userId, tagId } },
    update: {
      ease: next.ease,
      intervalDays: next.intervalDays,
      lapses: next.lapses,
      mastered: next.mastered,
      dueAt,
    },
    create: {
      userId,
      tagId,
      ease: next.ease,
      intervalDays: next.intervalDays,
      lapses: next.lapses,
      mastered: next.mastered,
      dueAt,
    },
  });

  return NextResponse.json({ ok: true, mastered: next.mastered });
}
