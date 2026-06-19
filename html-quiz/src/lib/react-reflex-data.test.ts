import { describe, expect, it } from "vitest";
import { REACT_REFLEX_QUESTIONS } from "./react-reflex-data";

// Cùng cách chuẩn hóa với reflex-game để bảo đảm đáp án chấm được.
const norm = (s: string) => s.toLowerCase().split("=")[0].replace(/[<>"'`/\s*]/g, "");

describe("Phản xạ React", () => {
  it("có đủ câu hỏi", () => {
    expect(REACT_REFLEX_QUESTIONS.length).toBeGreaterThanOrEqual(30);
  });

  it("mỗi câu có answer, prompt, explain hợp lệ", () => {
    for (const q of REACT_REFLEX_QUESTIONS) {
      expect(q.answer.length, q.prompt).toBeGreaterThan(0);
      expect(q.prompt.length, q.answer).toBeGreaterThan(10);
      expect(q.explain.length, q.answer).toBeGreaterThan(5);
    }
  });

  it("đề KHÔNG lộ đáp án (luyện phản xạ thật)", () => {
    for (const q of REACT_REFLEX_QUESTIONS) {
      expect(
        q.prompt.toLowerCase().includes(q.answer.toLowerCase()),
        `Đề lộ đáp án "${q.answer}": ${q.prompt}`
      ).toBe(false);
    }
  });

  it("answer/accept chuẩn hóa ra chuỗi không rỗng (chấm được)", () => {
    for (const q of REACT_REFLEX_QUESTIONS) {
      expect(norm(q.answer), q.answer).not.toBe("");
      for (const a of q.accept ?? []) expect(norm(a), a).not.toBe("");
    }
  });

  it("không trùng answer", () => {
    const a = REACT_REFLEX_QUESTIONS.map((q) => q.answer);
    expect(new Set(a).size).toBe(a.length);
  });
});
