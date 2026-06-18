import { describe, expect, it } from "vitest";
import { PROJECT_TAGS } from "../../prisma/project-content";

type Req = { type: string; value?: string | number; name?: string };

describe("Nội dung seed Dự án", () => {
  it("có đúng 5 mục", () => {
    expect(PROJECT_TAGS.length).toBe(5);
  });

  it("tên mục không trùng", () => {
    const names = PROJECT_TAGS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("mỗi mục có part/topic/description", () => {
    for (const t of PROJECT_TAGS) {
      expect(t.part.length, t.name).toBeGreaterThan(0);
      expect(t.topic.length, t.name).toBeGreaterThan(0);
      expect(t.description.length, t.name).toBeGreaterThan(0);
    }
  });

  it("mỗi mục có 3 MCQ bậc 1 + 3 MCQ bậc 2 + 1 WRITE_STRUCTURE bậc 3", () => {
    for (const t of PROJECT_TAGS) {
      const t1 = t.questions.filter((q) => q.tier === 1);
      const t2 = t.questions.filter((q) => q.tier === 2);
      const t3 = t.questions.filter((q) => q.tier === 3);
      expect(t1.length, `${t.name} bậc1`).toBe(3);
      expect(t2.length, `${t.name} bậc2`).toBe(3);
      expect(t3.length, `${t.name} bậc3`).toBe(1);
      expect(t1.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t2.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t3[0].type, t.name).toBe("WRITE_STRUCTURE");
    }
  });

  it("không trùng (tier|prompt) trong cùng mục", () => {
    for (const t of PROJECT_TAGS) {
      const keys = t.questions.map((q) => `${q.tier}|${q.prompt}`);
      expect(new Set(keys).size, t.name).toBe(keys.length);
    }
  });

  it("đề MCQ là câu hỏi rõ ràng (kết thúc ? và ≥15 ký tự)", () => {
    for (const t of PROJECT_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        const p = q.prompt.trim();
        expect(p.endsWith("?"), `${t.name}: ${p}`).toBe(true);
        expect(p.length, `${t.name}: ${p}`).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it("MCQ có 4 lựa chọn + correctIndex hợp lệ", () => {
    for (const t of PROJECT_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        expect(q.options?.length, `${t.name}: ${q.prompt}`).toBe(4);
        expect(q.correctIndex, `${t.name}`).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex, `${t.name}`).toBeLessThan(4);
      }
    }
  });

  it("câu WRITE_STRUCTURE có requirements và starterCode", () => {
    for (const t of PROJECT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_STRUCTURE")!;
      expect((q.requirements ?? []).length, `${t.name}`).toBeGreaterThan(0);
      expect((q.starterCode ?? "").length, `${t.name}`).toBeGreaterThan(0);
    }
  });

  it("đề tự chứa: giá trị text/attr bộ chấm yêu cầu phải hiện trong đề", () => {
    for (const t of PROJECT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_STRUCTURE")!;
      const context = `${q.prompt} ${q.starterCode ?? ""}`.toLowerCase();
      for (const r of (q.requirements ?? []) as Req[]) {
        if ((r.type === "attr" || r.type === "text") && r.value !== undefined) {
          expect(context.includes(String(r.value).toLowerCase()), `${t.name}: thiếu "${r.value}"`).toBe(true);
        }
      }
    }
  });
});
