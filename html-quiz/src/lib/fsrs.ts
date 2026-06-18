// Lớp bọc ts-fsrs cho lịch ôn tập (P1). Chấm ở mức THẺ; grade suy ra tự động
// từ số lượt sai trong phiên (không có nút tự chấm thủ công).
import { createEmptyCard, fsrs, Rating, State, type Card, type FSRS, type Grade } from "ts-fsrs";

// request_retention = mục tiêu nhớ (mặc định 0.9 = 90%), CÁ NHÂN HÓA theo người
// dùng (UserSettings.targetRetention). fuzz chống dồn cục; short_term để grade
// "Again" lịch lại trong ngày. fsrsParams (Pha 2) = 21 trọng số tối ưu riêng.
export const DEFAULT_RETENTION = 0.9;

export type FsrsOpts = { retention?: number; params?: number[] };

// Bộ lập lịch tốn chút chi phí khởi tạo → memo theo (retention|params).
const schedulerCache = new Map<string, FSRS>();
function getScheduler(opts?: FsrsOpts): FSRS {
  const retention = opts?.retention ?? DEFAULT_RETENTION;
  const w = opts?.params;
  const key = `${retention}|${w ? w.join(",") : ""}`;
  let s = schedulerCache.get(key);
  if (!s) {
    s = fsrs({
      request_retention: retention,
      enable_fuzz: true,
      enable_short_term: true,
      ...(w ? { w } : {}),
    });
    schedulerCache.set(key, s);
  }
  return s;
}

// stability (số ngày để độ nhớ tụt còn mục tiêu) đạt ngưỡng này coi là "nắm vững".
export const MASTERY_STABILITY = 21;
export const MAX_WRONG = 3;
// Số lần quên (lapses) từ ngưỡng này coi là "thẻ hay quên" (leech) — luyện riêng.
export const LEECH_LAPSES = 8;

// Map số lượt sai (0..3) → Rating. 0 mượt = Easy ... ≥3 rớt = Again.
export function ratingFromWrong(wrongCount: number): Grade {
  if (wrongCount >= MAX_WRONG) return Rating.Again;
  if (wrongCount === 2) return Rating.Hard;
  if (wrongCount === 1) return Rating.Good;
  return Rating.Easy;
}

// Các trường FSRS lưu trong UserTagProgress.
export type CardFields = {
  stability: number;
  difficulty: number;
  reps: number;
  state: number;
  scheduledDays: number;
  lapses: number;
  dueAt: Date;
  lastReviewedAt: Date | null;
};

// DB row → ts-fsrs Card. Bắt đầu từ createEmptyCard để chắc chắn đủ trường,
// rồi đè giá trị đã lưu. stability<=0 nghĩa là chưa từng ôn qua FSRS → thẻ mới.
export function toCard(row: Partial<CardFields> | null | undefined): Card {
  const card = createEmptyCard(row?.dueAt ?? undefined);
  if (!row || !row.stability || row.stability <= 0) return card;
  card.due = row.dueAt ?? card.due;
  card.stability = row.stability;
  card.difficulty = row.difficulty ?? card.difficulty;
  card.scheduled_days = row.scheduledDays ?? 0;
  card.elapsed_days = row.scheduledDays ?? 0;
  card.reps = row.reps ?? 0;
  card.lapses = row.lapses ?? 0;
  card.state = (row.state ?? State.Review) as State;
  card.last_review = row.lastReviewedAt ?? undefined;
  return card;
}

// ts-fsrs Card → các trường lưu DB (kèm mastered tính lại).
export function fromCard(card: Card): CardFields & { mastered: boolean } {
  return {
    stability: card.stability,
    difficulty: card.difficulty,
    reps: card.reps,
    state: card.state as number,
    scheduledDays: card.scheduled_days,
    lapses: card.lapses,
    dueAt: card.due,
    lastReviewedAt: card.last_review ?? null,
    mastered: card.stability >= MASTERY_STABILITY,
  };
}

// Lên lịch lần ôn kế tiếp cho card với grade tại thời điểm now.
export function schedule(card: Card, grade: Grade, now: Date, opts?: FsrsOpts): Card {
  return getScheduler(opts).next(card, now, grade).card;
}

// Tiện ích gộp: từ row + số lượt sai → các trường cần lưu.
export function nextFromWrong(
  row: Partial<CardFields> | null | undefined,
  wrongCount: number,
  now: Date,
  opts?: FsrsOpts
): CardFields & { mastered: boolean } {
  return fromCard(schedule(toCard(row), ratingFromWrong(wrongCount), now, opts));
}

// Bản ghi nhật ký ôn (ReviewLog) để lưu DB.
export type ReviewLogFields = {
  rating: number;
  state: number;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  due: Date;
  reviewedAt: Date;
};

// Như nextFromWrong nhưng trả kèm nhật ký để lưu ReviewLog (P2).
export function nextWithLog(
  row: Partial<CardFields> | null | undefined,
  wrongCount: number,
  now: Date,
  opts?: FsrsOpts
): { fields: CardFields & { mastered: boolean }; log: ReviewLogFields } {
  const res = getScheduler(opts).next(toCard(row), now, ratingFromWrong(wrongCount));
  return {
    fields: fromCard(res.card),
    log: {
      rating: res.log.rating,
      state: res.log.state,
      stability: res.log.stability,
      difficulty: res.log.difficulty,
      elapsedDays: res.log.elapsed_days,
      scheduledDays: res.log.scheduled_days,
      due: res.log.due,
      reviewedAt: res.log.review,
    },
  };
}

// Xác suất nhớ lại (retrievability) tại now theo đường cong lãng quên FSRS.
// Thẻ chưa ôn (stability<=0) trả về 0. Dùng cho thống kê dashboard.
export function retrievability(
  row: Partial<CardFields> | null | undefined,
  now: Date,
  opts?: FsrsOpts
): number {
  if (!row || !row.stability || row.stability <= 0) return 0;
  return getScheduler(opts).get_retrievability(toCard(row), now, false) as number;
}
