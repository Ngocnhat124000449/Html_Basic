import { describe, expect, it } from "vitest";
import { CSS_REFLEX_QUESTIONS } from "./css-reflex-data";
import { CSS_PROPERTIES, findCssPropertyForMuc } from "./css-value-data";

// Cùng cách chuẩn hóa với reflex-game (mode css) để bảo đảm đáp án chấm được
const norm = (s: string) => s.toLowerCase().split("=")[0].replace(/[<>"'`/\s*]/g, "");

describe("Phản xạ CSS", () => {
  it("có đủ câu hỏi", () => {
    expect(CSS_REFLEX_QUESTIONS.length).toBeGreaterThanOrEqual(30);
  });

  it("mỗi câu có answer, prompt, explain không rỗng", () => {
    for (const q of CSS_REFLEX_QUESTIONS) {
      expect(q.answer.length, q.prompt).toBeGreaterThan(0);
      expect(q.prompt.length, q.answer).toBeGreaterThan(10);
      expect(q.explain.length, q.answer).toBeGreaterThan(5);
    }
  });

  it("đề KHÔNG lộ tên thuộc tính cần trả lời (luyện phản xạ thật)", () => {
    for (const q of CSS_REFLEX_QUESTIONS) {
      expect(
        q.prompt.toLowerCase().includes(q.answer.toLowerCase()),
        `Đề lộ đáp án "${q.answer}": ${q.prompt}`
      ).toBe(false);
    }
  });

  it("answer và accept chuẩn hóa ra chuỗi không rỗng (chấm được)", () => {
    for (const q of CSS_REFLEX_QUESTIONS) {
      expect(norm(q.answer), q.answer).not.toBe("");
      for (const a of q.accept ?? []) expect(norm(a), a).not.toBe("");
    }
  });
});

describe("Giá trị 3 mức CSS", () => {
  it("mỗi thuộc tính có prop, match, và ít nhất 2 giá trị", () => {
    for (const e of CSS_PROPERTIES) {
      expect(e.prop.length).toBeGreaterThan(0);
      expect(e.match.length, e.prop).toBeGreaterThan(0);
      expect(e.values.length, e.prop).toBeGreaterThanOrEqual(2);
    }
  });

  it("mỗi thuộc tính có ít nhất 1 giá trị essential", () => {
    for (const e of CSS_PROPERTIES) {
      expect(
        e.values.some((v) => v.importance === "essential"),
        `${e.prop} thiếu giá trị essential`
      ).toBe(true);
    }
  });

  it("mỗi giá trị có value/desc/when, importance hợp lệ", () => {
    const valid = new Set(["essential", "common", "rare"]);
    for (const e of CSS_PROPERTIES) {
      for (const v of e.values) {
        expect(v.value.length, `${e.prop}`).toBeGreaterThan(0);
        expect(v.desc.length, `${e.prop}: ${v.value}`).toBeGreaterThan(0);
        expect(v.when.length, `${e.prop}: ${v.value}`).toBeGreaterThan(0);
        expect(valid.has(v.importance), `${e.prop}: ${v.value}`).toBe(true);
      }
    }
  });

  it("findCssPropertyForMuc khớp đúng tên mục seed", () => {
    expect(findCssPropertyForMuc("display flex")?.prop).toBe("display");
    expect(findCssPropertyForMuc("position relative")?.prop).toBe("position");
    expect(findCssPropertyForMuc("font-weight")?.prop).toBe("font-weight");
    expect(findCssPropertyForMuc("cú pháp rule")).toBeUndefined();
  });
});
