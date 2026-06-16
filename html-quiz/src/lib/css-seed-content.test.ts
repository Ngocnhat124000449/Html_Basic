import { describe, expect, it } from "vitest";
import { CSS_TAGS } from "../../prisma/css-content";
import { gradeCss } from "./grading/grade-css";
import type { CssRequirement } from "./grading/css-types";

// Giá trị "kiến thức" — đáp án CHÍNH LÀ thứ người học phải biết, không cần hiện trong đề.
// Giá trị tùy ý (màu, kích thước cụ thể...) bắt buộc hiện nguyên văn trong prompt/starterCode.
const KNOWLEDGE_VALUES = new Set([
  "block", "inline", "inline-block", "none", "flex", "grid",
  "center", "left", "right", "justify",
  "border-box", "content-box", "pointer", "auto", "0", "0 auto",
  "uppercase", "lowercase", "capitalize", "italic", "bold", "underline", "line-through",
  "absolute", "relative", "fixed", "sticky", "static", "hidden",
  "wrap", "nowrap", "column", "row", "space-between", "space-around",
  "inherit", "initial", "unset", "transparent", "solid", "dashed", "dotted",
]);

const textOf = (q: { prompt: string; starterCode?: string }) =>
  `${q.prompt}\n${q.starterCode ?? ""}`.toLowerCase();

describe("Nội dung seed CSS", () => {
  it("tên mục không trùng trong track css", () => {
    const names = CSS_TAGS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("mỗi mục có part, topic, description", () => {
    for (const t of CSS_TAGS) {
      expect(t.part.length, t.name).toBeGreaterThan(0);
      expect(t.topic.length, t.name).toBeGreaterThan(0);
      expect(t.description.length, t.name).toBeGreaterThan(0);
    }
  });

  it("mỗi mục có ≥3 MCQ bậc 1 + ≥3 MCQ bậc 2 + 1 WRITE_CSS bậc 3", () => {
    for (const t of CSS_TAGS) {
      const tier1 = t.questions.filter((q) => q.tier === 1);
      const tier2 = t.questions.filter((q) => q.tier === 2);
      const tier3 = t.questions.filter((q) => q.tier === 3);
      expect(tier1.length, `${t.name}: bậc 1`).toBeGreaterThanOrEqual(3);
      expect(tier2.length, `${t.name}: bậc 2`).toBeGreaterThanOrEqual(3);
      expect(tier3.length, `${t.name}: bậc 3`).toBe(1);
      expect(tier1.every((q) => q.type === "MCQ"), `${t.name}: bậc 1 phải MCQ`).toBe(true);
      expect(tier2.every((q) => q.type === "MCQ"), `${t.name}: bậc 2 phải MCQ`).toBe(true);
      expect(tier3[0].type, `${t.name}: bậc 3 phải WRITE_CSS`).toBe("WRITE_CSS");
    }
  });

  it("không có câu trùng (tier|prompt) trong cùng mục — seed sẽ gộp chúng", () => {
    for (const t of CSS_TAGS) {
      const keys = t.questions.map((q) => `${q.tier}|${q.prompt}`);
      expect(new Set(keys).size, t.name).toBe(keys.length);
    }
  });

  it("MCQ có đúng 4 lựa chọn và correctIndex hợp lệ", () => {
    for (const t of CSS_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        expect(q.options?.length, `${t.name}: ${q.prompt}`).toBe(4);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeLessThan(4);
      }
    }
  });

  it("câu WRITE_CSS luôn có requirement và HTML căn cứ trong starterCode", () => {
    for (const t of CSS_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_CSS")!;
      const reqs = (q.requirements ?? []) as CssRequirement[];
      expect(reqs.length, `${t.name}: thiếu requirements`).toBeGreaterThan(0);
      expect(q.starterCode ?? "", `${t.name}: bậc 3 phải kèm HTML căn cứ`).toContain("<");
    }
  });

  it("đề tự chứa: giá trị tùy ý và tên class/id phải hiện nguyên văn trong đề", () => {
    for (const t of CSS_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_CSS")!;
      const text = textOf(q);
      for (const req of (q.requirements ?? []) as CssRequirement[]) {
        if (req.type === "value") {
          const v = req.value.toLowerCase().replace(/\s+/g, " ").trim();
          if (!KNOWLEDGE_VALUES.has(v)) {
            expect(text, `${t.name}: giá trị "${req.value}" phải có trong đề`).toContain(v);
          }
        }
        const selector = req.type === "selector" ? req.value : req.selector;
        for (const m of selector.matchAll(/[.#]([a-z0-9_-]+)/gi)) {
          expect(text, `${t.name}: tên "${m[1]}" trong selector phải có trong đề`).toContain(
            m[1].toLowerCase()
          );
        }
      }
    }
  });

  it("mọi câu WRITE_CSS tự chấm đậu khi trả lời đúng theo requirements", () => {
    for (const t of CSS_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_CSS")!;
      const reqs = (q.requirements ?? []) as CssRequirement[];
      const bySelector = new Map<string, Map<string, string>>();
      for (const req of reqs) {
        const sel = req.type === "selector" ? req.value : req.selector;
        if (!bySelector.has(sel)) bySelector.set(sel, new Map());
        if (req.type === "property") bySelector.get(sel)!.set(req.name, "dummy");
        if (req.type === "value") bySelector.get(sel)!.set(req.name, req.value);
      }
      const css = [...bySelector.entries()]
        .map(
          ([sel, decls]) =>
            `${sel} { ${[...decls.entries()].map(([k, v]) => `${k}: ${v};`).join(" ") || "color: red;"} }`
        )
        .join("\n");
      const result = gradeCss(css, reqs);
      expect(
        result.passed,
        `${t.name}: đáp án chuẩn không đậu — ${result.results
          .filter((r) => !r.passed)
          .map((r) => r.message)
          .join("; ")}\nCSS: ${css}`
      ).toBe(true);
    }
  });
});
