import { describe, expect, it } from "vitest";
import { Rating } from "ts-fsrs";
import {
  ratingFromWrong,
  toCard,
  fromCard,
  nextFromWrong,
  MAX_WRONG,
} from "./fsrs";

const NOW = new Date("2026-06-15T00:00:00.000Z");

describe("FSRS — map grade", () => {
  it("số lượt sai → Rating đúng", () => {
    expect(ratingFromWrong(0)).toBe(Rating.Easy);
    expect(ratingFromWrong(1)).toBe(Rating.Good);
    expect(ratingFromWrong(2)).toBe(Rating.Hard);
    expect(ratingFromWrong(3)).toBe(Rating.Again);
    expect(ratingFromWrong(MAX_WRONG)).toBe(Rating.Again);
    expect(ratingFromWrong(99)).toBe(Rating.Again);
  });
});

describe("FSRS — lịch thẻ mới", () => {
  const easy = nextFromWrong(null, 0, NOW);
  const good = nextFromWrong(null, 1, NOW);
  const hard = nextFromWrong(null, 2, NOW);
  const again = nextFromWrong(null, 3, NOW);

  it("Easy giãn cách ≥ Good ≥ Hard", () => {
    expect(easy.dueAt.getTime()).toBeGreaterThanOrEqual(good.dueAt.getTime());
    expect(good.dueAt.getTime()).toBeGreaterThanOrEqual(hard.dueAt.getTime());
  });

  it("Again lịch lại sớm nhất (trong ngày)", () => {
    expect(again.dueAt.getTime()).toBeLessThan(hard.dueAt.getTime());
    expect(again.dueAt.getTime() - NOW.getTime()).toBeLessThan(24 * 60 * 60 * 1000);
  });

  it("stability/difficulty là số dương hợp lệ", () => {
    for (const r of [easy, good, hard, again]) {
      expect(r.stability).toBeGreaterThan(0);
      expect(r.difficulty).toBeGreaterThanOrEqual(1);
      expect(r.difficulty).toBeLessThanOrEqual(10);
    }
  });

  it("mastered khi stability ≥ 21", () => {
    expect(easy.mastered).toBe(easy.stability >= 21);
  });
});

describe("FSRS — round-trip toCard/fromCard", () => {
  it("giữ nguyên các trường đã lưu", () => {
    const row = {
      stability: 12.5,
      difficulty: 6.2,
      reps: 4,
      state: 2,
      scheduledDays: 12,
      lapses: 1,
      dueAt: new Date("2026-07-01T00:00:00.000Z"),
      lastReviewedAt: new Date("2026-06-19T00:00:00.000Z"),
    };
    const back = fromCard(toCard(row));
    expect(back.stability).toBe(row.stability);
    expect(back.difficulty).toBe(row.difficulty);
    expect(back.reps).toBe(row.reps);
    expect(back.state).toBe(row.state);
    expect(back.lapses).toBe(row.lapses);
    expect(back.dueAt.getTime()).toBe(row.dueAt.getTime());
  });

  it("ôn tiếp thẻ đã có stability cao thì giãn cách dài hơn thẻ mới", () => {
    const matured = {
      stability: 30,
      difficulty: 5,
      reps: 5,
      state: 2,
      scheduledDays: 30,
      lapses: 0,
      dueAt: NOW,
      lastReviewedAt: new Date(NOW.getTime() - 30 * 24 * 60 * 60 * 1000),
    };
    const next = nextFromWrong(matured, 1, NOW); // Good
    const freshGood = nextFromWrong(null, 1, NOW);
    expect(next.dueAt.getTime()).toBeGreaterThan(freshGood.dueAt.getTime());
  });
});
