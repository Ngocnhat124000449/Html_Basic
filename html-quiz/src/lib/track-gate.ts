import { prisma } from "./prisma";
import { TRACK_ORDER, gateFor, type GateInfo, type TrackStats } from "./tracks";

// Đếm (đã học / tổng thẻ) theo từng khóa cho một người — nguồn số liệu của gate.
async function trackStats(userId: string): Promise<TrackStats> {
  const [totals, progress] = await Promise.all([
    prisma.tag.groupBy({ by: ["track"], _count: { _all: true } }),
    prisma.userTagProgress.findMany({
      where: { userId },
      select: { tag: { select: { track: true } } },
    }),
  ]);
  const stats: TrackStats = {};
  for (const t of totals) stats[t.track] = { learned: 0, total: t._count._all };
  for (const p of progress) {
    const s = stats[p.tag.track];
    if (s) s.learned++;
  }
  return stats;
}

// Ghi thêm khóa vừa đạt vào unlockedTracks — mở là VĨNH VIỄN (ratchet).
async function persistUnlocked(userId: string, current: string[], newly: string[]) {
  const merged = [...new Set([...current, ...newly])];
  await prisma.userSettings.upsert({
    where: { userId },
    update: { unlockedTracks: merged },
    create: { userId, unlockedTracks: merged },
  });
}

// Gate của MỘT khóa: đã trong unlockedTracks → mở (fast-path, không đếm lại);
// chưa có thì tính động từ stats, đạt thì ghi luôn (lazy backfill cho tài khoản cũ).
export async function getGate(userId: string, track: string): Promise<GateInfo | null> {
  if (track === TRACK_ORDER[0]) return null;
  if (!TRACK_ORDER.includes(track as (typeof TRACK_ORDER)[number])) return null;
  const settings = await prisma.userSettings.findUnique({ where: { userId } });
  const unlocked = settings?.unlockedTracks ?? [];
  if (unlocked.includes(track)) return null;
  const gate = gateFor(track, await trackStats(userId));
  if (!gate) await persistUnlocked(userId, unlocked, [track]);
  return gate;
}

// Gate của CẢ 7 khóa trong một lượt (trang chủ) — dùng chung stats, ghi batch khóa mới đạt.
export async function getAllGates(userId: string): Promise<Record<string, GateInfo | null>> {
  const settings = await prisma.userSettings.findUnique({ where: { userId } });
  const unlocked = settings?.unlockedTracks ?? [];
  const stats = await trackStats(userId);
  const gates: Record<string, GateInfo | null> = {};
  const newly: string[] = [];
  for (const t of TRACK_ORDER) {
    if (t === TRACK_ORDER[0] || unlocked.includes(t)) {
      gates[t] = null;
      continue;
    }
    const g = gateFor(t, stats);
    gates[t] = g;
    if (!g) newly.push(t);
  }
  if (newly.length > 0) await persistUnlocked(userId, unlocked, newly);
  return gates;
}
