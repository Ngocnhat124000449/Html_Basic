// Lớp bọc ts-fsrs cho lịch ôn tập (P1). Chấm ở mức THẺ; grade suy ra tự động
// từ số lượt sai trong phiên (không có nút tự chấm thủ công).
import { createEmptyCard, fsrs, Rating, State, type Card, type Grade } from "ts-fsrs";

// request_retention 0.9 = mục tiêu nhớ 90%; fuzz chống dồn cục; short_term để
// grade "Again" lịch lại trong ngày (khớp UX "học lại hôm nay").
const scheduler = fsrs({
  request_retention: 0.9,
  enable_fuzz: true,
  enable_short_term: true,
});

// stability (số ngày để độ nhớ tụt còn 90%) đạt ngưỡng này coi là "nắm vững".
export const MASTERY_STABILITY = 21;
export const MAX_WRONG = 3;

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
export function schedule(card: Card, grade: Grade, now: Date): Card {
  return scheduler.next(card, now, grade).card;
}

// Tiện ích gộp: từ row + số lượt sai → các trường cần lưu.
export function nextFromWrong(
  row: Partial<CardFields> | null | undefined,
  wrongCount: number,
  now: Date
): CardFields & { mastered: boolean } {
  return fromCard(schedule(toCard(row), ratingFromWrong(wrongCount), now));
}
