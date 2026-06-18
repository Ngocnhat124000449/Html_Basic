import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserSettings } from "@/lib/user-settings";
import { isValidFsrsParams } from "@/lib/fsrs-params";

const TRACKS = ["html", "css", "js", "dsa", "git", "react", "project"] as const;

const schema = z.object({
  dailyNew: z.number().int().min(1).max(50),
  reviewCap: z.number().int().min(5).max(100),
  targetRetention: z.number().min(0.7).max(0.97),
  hiddenTracks: z.array(z.enum(TRACKS)).max(TRACKS.length),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const s = await getUserSettings(session.user.id);
  // Lấy thêm trạng thái tối ưu FSRS (Pha 2) để hiển thị.
  const raw = await prisma.userSettings.findUnique({
    where: { userId: session.user.id },
    select: { fsrsParams: true, fsrsOptimizedAt: true },
  });
  return NextResponse.json({
    dailyNew: s.dailyNew,
    reviewCap: s.reviewCap,
    targetRetention: s.targetRetention,
    hiddenTracks: s.hiddenTracks,
    fsrsOptimized: !!raw && isValidFsrsParams(raw.fsrsParams),
    fsrsOptimizedAt: raw?.fsrsOptimizedAt ?? null,
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const userId = session.user.id;

  // Khôi phục lịch FSRS về mặc định: xóa tham số đã tối ưu.
  if (body && (body as { resetFsrs?: boolean }).resetFsrs === true) {
    await prisma.userSettings.upsert({
      where: { userId },
      update: { fsrsParams: Prisma.DbNull, fsrsOptimizedAt: null },
      create: { userId },
    });
    return NextResponse.json({ ok: true, reset: true });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  const { dailyNew, reviewCap, targetRetention, hiddenTracks } = parsed.data;
  await prisma.userSettings.upsert({
    where: { userId },
    update: { dailyNew, reviewCap, targetRetention, hiddenTracks },
    create: { userId, dailyNew, reviewCap, targetRetention, hiddenTracks },
  });
  return NextResponse.json({ ok: true });
}
