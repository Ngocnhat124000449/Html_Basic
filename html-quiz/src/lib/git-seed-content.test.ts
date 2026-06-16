import { describe, expect, it } from "vitest";
import { GIT_TAGS } from "../../prisma/git-content";
import { gradeCmd } from "./grading/grade-cmd";
import type { CmdRequirement } from "./grading/cmd-types";

// Dựng đáp án mẫu: nối mọi text `contains` lại — phải tự chấm đậu.
function buildSampleAnswer(reqs: CmdRequirement[]): string {
  return reqs
    .filter((r) => r.type === "contains")
    .map((r) => r.text)
    .join("\n");
}

const textOf = (q: { prompt: string; starterCode?: string }) =>
  `${q.prompt}\n${q.starterCode ?? ""}`;

describe("Nội dung seed Git & Công cụ", () => {
  it("có đúng 5 mục", () => {
    expect(GIT_TAGS.length).toBe(5);
  });

  it("tên mục không trùng", () => {
    const names = GIT_TAGS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("mỗi mục có part/topic/description", () => {
    for (const t of GIT_TAGS) {
      expect(t.part.length, t.name).toBeGreaterThan(0);
      expect(t.topic.length, t.name).toBeGreaterThan(0);
      expect(t.description.length, t.name).toBeGreaterThan(0);
    }
  });

  it("mỗi mục đúng 3 MCQ bậc 1 + 3 MCQ bậc 2 + 1 WRITE_CMD bậc 3", () => {
    for (const t of GIT_TAGS) {
      const t1 = t.questions.filter((q) => q.tier === 1);
      const t2 = t.questions.filter((q) => q.tier === 2);
      const t3 = t.questions.filter((q) => q.tier === 3);
      expect(t1.length, `${t.name} bậc1`).toBe(3);
      expect(t2.length, `${t.name} bậc2`).toBe(3);
      expect(t3.length, `${t.name} bậc3`).toBe(1);
      expect(t1.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t2.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t3[0].type, t.name).toBe("WRITE_CMD");
    }
  });

  it("không trùng (tier|prompt) trong cùng mục", () => {
    for (const t of GIT_TAGS) {
      const keys = t.questions.map((q) => `${q.tier}|${q.prompt}`);
      expect(new Set(keys).size, t.name).toBe(keys.length);
    }
  });

  it("đề MCQ là CÂU HỎI rõ ràng (kết thúc bằng ? và đủ dài để mô tả ngữ cảnh)", () => {
    for (const t of GIT_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        const p = q.prompt.trim();
        expect(p.endsWith("?"), `${t.name}: đề MCQ phải là câu hỏi (kết thúc "?"): ${p}`).toBe(true);
        expect(p.length, `${t.name}: đề MCQ quá ngắn/trừu tượng: ${p}`).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it("MCQ có 4 lựa chọn + correctIndex hợp lệ", () => {
    for (const t of GIT_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        expect(q.options?.length, `${t.name}: ${q.prompt}`).toBe(4);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeLessThan(4);
      }
    }
  });

  it("bậc 3 WRITE_CMD có >=2 yêu cầu contains và starterCode", () => {
    for (const t of GIT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_CMD")!;
      const reqs = (q.requirements ?? []) as CmdRequirement[];
      const containsReqs = reqs.filter((r) => r.type === "contains");
      expect(containsReqs.length, `${t.name}: bậc 3 cần >=2 yêu cầu contains`).toBeGreaterThanOrEqual(2);
      expect((q.starterCode ?? "").length, `${t.name}: thiếu starterCode`).toBeGreaterThan(0);
    }
  });

  it("đề tự chứa: giá trị tùy ý (inPrompt) phải hiện nguyên văn trong đề", () => {
    for (const t of GIT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_CMD")!;
      const text = textOf(q);
      for (const req of (q.requirements ?? []) as CmdRequirement[]) {
        if (req.inPrompt) {
          expect(text.includes(req.text), `${t.name}: "${req.text}" phải có trong đề`).toBe(true);
        }
      }
    }
  });

  it("đề có lời giải hợp lệ: đáp án mẫu tự chấm đậu", () => {
    for (const t of GIT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_CMD")!;
      const reqs = (q.requirements ?? []) as CmdRequirement[];
      const sample = buildSampleAnswer(reqs);
      const res = gradeCmd(sample, reqs);
      expect(
        res.passed,
        `${t.name}: không dựng được lời giải — ${res.results
          .filter((r) => !r.passed)
          .map((r) => r.message)
          .join("; ")}\nCODE:\n${sample}`
      ).toBe(true);
    }
  });
});
