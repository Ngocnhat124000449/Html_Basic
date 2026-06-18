import { prisma } from "./prisma";
import { DEFAULT_RETENTION, type FsrsOpts } from "./fsrs";

// Cài đặt ôn tập hiệu lực của một người (đọc UserSettings, thiếu thì dùng mặc định).
export type EffectiveSettings = {
  dailyNew: number;
  reviewCap: number;
  targetRetention: number;
  hiddenTracks: string[];
  fsrsParams: number[] | null;
};

export const DEFAULT_SETTINGS: EffectiveSettings = {
  dailyNew: 5,
  reviewCap: 20,
  targetRetention: DEFAULT_RETENTION,
  hiddenTracks: [],
  fsrsParams: null,
};

export async function getUserSettings(userId: string): Promise<EffectiveSettings> {
  const s = await prisma.userSettings.findUnique({ where: { userId } });
  if (!s) return DEFAULT_SETTINGS;
  return {
    dailyNew: s.dailyNew,
    reviewCap: s.reviewCap,
    targetRetention: s.targetRetention,
    hiddenTracks: s.hiddenTracks,
    fsrsParams: (s.fsrsParams as number[] | null) ?? null,
  };
}

// Chuyển settings → tham số cho fsrs (retention + trọng số tùy chỉnh nếu có).
export function fsrsOptsOf(s: EffectiveSettings): FsrsOpts {
  return { retention: s.targetRetention, params: s.fsrsParams ?? undefined };
}
