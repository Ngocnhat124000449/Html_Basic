import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ClientQuestion, SessionTag } from "@/lib/study-types";
import { toRunSpecs, type JsRequirement } from "@/lib/grading/js-types";
import { toReactSpecs, type ReactRequirement } from "@/lib/grading/react-types";
import { LEECH_LAPSES } from "@/lib/fsrs";
import { getUserSettings } from "@/lib/user-settings";
import { foundationTracks, WARMUP_CAP, TRACK_ORDER } from "@/lib/tracks";

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
    track:
      tag.track === "css"
        ? "css"
        : tag.track === "js"
          ? "js"
          : tag.track === "dsa"
            ? "dsa"
            : tag.track === "git"
              ? "git"
              : tag.track === "react"
                ? "react"
                : tag.track === "project"
                  ? "project"
                  : "html",
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
        // Câu JS có run requirement → gửi spec (đã loại `equals`) để client chạy thử
        runSpecs:
          q.type === "WRITE_JS"
            ? toRunSpecs((q.requirements as JsRequirement[]) ?? [])
            : null,
        // Câu JSX có render requirement → gửi spec (đã loại HTML kỳ vọng) để client render thử
        reactSpecs:
          q.type === "WRITE_JSX"
            ? toReactSpecs((q.requirements as ReactRequirement[]) ?? [])
            : null,
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
  const params = new URL(req.url).searchParams;
  const settings = await getUserSettings(userId);
  // extra=1: học vượt — bỏ giới hạn thẻ mới/ngày, lấy tiếp thẻ chưa học kế tiếp
  const extra = params.get("extra") === "1";
  const trackParam = params.get("track");
  const mode = params.get("mode"); // "learn" | "review" | null(legacy)
  const SPECIFIC = ["html", "css", "js", "dsa", "git", "react", "project"];
  const withQuestions = { tag: { include: { questions: { orderBy: { tier: "asc" as const } } } } };

  // CHẾ ĐỘ "Ôn tất cả": thẻ đến hạn của MỌI khóa (trừ khóa đã ẩn), ưu tiên đến
  // hạn lâu nhất, KHÔNG bốc thẻ mới, cap theo reviewCap của người dùng.
  if (trackParam === "all") {
    const due = await prisma.userTagProgress.findMany({
      where: { userId, dueAt: { lte: now }, tag: { track: { notIn: settings.hiddenTracks } } },
      orderBy: { dueAt: "asc" },
      take: settings.reviewCap,
      include: withQuestions,
    });
    return NextResponse.json({ tags: due.map((d) => toClient(d.tag, false)) });
  }

  // CHẾ ĐỘ "Thẻ hay quên" (leech): lapses cao của mọi khóa, KHÔNG cần đến hạn.
  if (trackParam === "leech") {
    const leech = await prisma.userTagProgress.findMany({
      where: { userId, lapses: { gte: LEECH_LAPSES }, tag: { track: { notIn: settings.hiddenTracks } } },
      orderBy: { lapses: "desc" },
      take: settings.reviewCap,
      include: withQuestions,
    });
    return NextResponse.json({ tags: leech.map((d) => toClient(d.tag, false)) });
  }

  // CHẾ ĐỘ theo từng khóa (mặc định html): hàng đợi đến hạn + quota thẻ mới/ngày.
  const track = SPECIFIC.includes(trackParam ?? "") ? trackParam! : "html";

  // mode=review: chỉ thẻ ĐÃ HỌC đến hạn của khóa này (không bốc thẻ mới).
  if (mode === "review") {
    const dueOnly = await prisma.userTagProgress.findMany({
      where: { userId, dueAt: { lte: now }, tag: { track } },
      orderBy: { dueAt: "asc" },
      take: settings.reviewCap,
      include: withQuestions,
    });
    return NextResponse.json({ tags: dueOnly.map((d) => toClient(d.tag, false)) });
  }

  // mode=learn: chỉ thẻ MỚI theo lộ trình (order asc), giữ quota dailyNew + extra.
  if (mode === "learn") {
    const sod = new Date(now);
    sod.setHours(0, 0, 0, 0);
    const newCount = await prisma.userTagProgress.count({
      where: { userId, createdAt: { gte: sod }, tag: { track } },
    });
    const allowed = extra ? settings.dailyNew : Math.max(0, settings.dailyNew - newCount);
    if (allowed <= 0) return NextResponse.json({ tags: [] });
    const seenIds = await prisma.userTagProgress.findMany({
      where: { userId, tag: { track } },
      select: { tagId: true },
    });
    const fresh = await prisma.tag.findMany({
      where: { track, id: { notIn: seenIds.map((s) => s.tagId) } },
      orderBy: { order: "asc" },
      take: allowed,
      include: { questions: { orderBy: { tier: "asc" } } },
    });
    // Pha ôn nền: thẻ ĐẾN HẠN của khóa hiện tại + mọi khóa nền. Lấy hết rồi sắp theo
    // (thứ tự khóa nền, đến hạn lâu nhất) và cap WARMUP_CAP để chọn thẻ ưu tiên.
    const foundation = foundationTracks(track);
    const dueWarm = await prisma.userTagProgress.findMany({
      where: { userId, dueAt: { lte: now }, tag: { track: { in: foundation } } },
      include: withQuestions,
    });
    const trackRank = (t: string) => {
      const i = TRACK_ORDER.indexOf(t as (typeof TRACK_ORDER)[number]);
      return i < 0 ? 999 : i;
    };
    dueWarm.sort(
      (a, b) =>
        trackRank(a.tag.track) - trackRank(b.tag.track) ||
        a.dueAt.getTime() - b.dueAt.getTime()
    );
    const warmup = dueWarm.slice(0, WARMUP_CAP);
    return NextResponse.json({
      tags: [
        ...warmup.map((d) => toClient(d.tag, false)),
        ...fresh.map((t) => toClient(t, true)),
      ],
    });
  }

  const due = await prisma.userTagProgress.findMany({
    where: { userId, dueAt: { lte: now }, tag: { track } },
    orderBy: { dueAt: "asc" },
    include: withQuestions,
  });

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  // Quota thẻ mới/ngày (cá nhân hóa qua settings.dailyNew) tính riêng từng track
  const newToday = await prisma.userTagProgress.count({
    where: { userId, createdAt: { gte: startOfDay }, tag: { track } },
  });
  const allowedNew = extra ? settings.dailyNew : Math.max(0, settings.dailyNew - newToday);

  let newTags: TagWithQuestions[] = [];
  if (allowedNew > 0) {
    const seen = await prisma.userTagProgress.findMany({
      where: { userId, tag: { track } },
      select: { tagId: true },
    });
    newTags = await prisma.tag.findMany({
      where: { track, id: { notIn: seen.map((s) => s.tagId) } },
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
