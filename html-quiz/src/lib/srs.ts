export type SrsState = {
  ease: number;
  intervalDays: number;
  lapses: number;
};

export type SrsResult = SrsState & { mastered: boolean };

export const MASTERY_INTERVAL = 21;
export const MIN_EASE = 1.3;

export function applyPass(s: SrsState): SrsResult {
  let interval: number;
  if (s.intervalDays <= 0) interval = 1;
  else if (s.intervalDays === 1) interval = 3;
  else interval = Math.round(s.intervalDays * s.ease);
  return {
    ease: s.ease,
    intervalDays: interval,
    lapses: s.lapses,
    mastered: interval >= MASTERY_INTERVAL,
  };
}

export function applyFail(s: SrsState): SrsResult {
  return {
    ease: Math.max(MIN_EASE, Math.round((s.ease - 0.2) * 100) / 100),
    intervalDays: 0,
    lapses: s.lapses + 1,
    mastered: false,
  };
}
