import { describe, expect, it } from "vitest";
import { REACT_TAGS } from "../../prisma/react-content";
import { gradeReactStatic } from "./grading/grade-react";
import {
  isInteractRequirement,
  isRenderRequirement,
  isRunRequirement,
  type ReactRequirement,
} from "./grading/react-types";
import type { JsConstruct } from "./grading/js-types";

// Đoạn code mẫu kích hoạt mỗi construct — dựng đáp án tổng hợp để tự kiểm phần tĩnh.
const CONSTRUCT_SNIPPET: Record<JsConstruct, string> = {
  arrow: "const _f = (x) => x;",
  const: "const _c = 1;",
  let: "let _l = 1;",
  function: "function _fn(){}",
  for: "for (let i=0;i<1;i++){}",
  while: "while(false){}",
  if: "if(true){}",
  template: "const _t = `${1}`;",
  map: "[].map((x)=>x);",
  filter: "[].filter((x)=>x);",
  reduce: "[].reduce((a,b)=>a,0);",
  forEach: "[].forEach((x)=>x);",
  find: "[].find((x)=>x);",
  addEventListener: "el.addEventListener('click', ()=>{});",
  querySelector: "document.querySelector('a');",
  async: "async function _af(){}",
  await: "async function _aw(){ await p; }",
  promise: "new Promise(()=>{});",
  tryCatch: "try{}catch(e){}",
  destructure: "const {a} = obj;",
  spread: "const _s = [...arr];",
};

function buildSampleAnswer(reqs: ReactRequirement[]): string {
  const lines: string[] = [];
  for (const r of reqs) {
    if (r.type === "contains") lines.push(r.text);
    else if (r.type === "construct") lines.push(CONSTRUCT_SNIPPET[r.construct]);
  }
  return lines.join("\n");
}

const textOf = (q: { prompt: string; starterCode?: string }) =>
  `${q.prompt}\n${q.starterCode ?? ""}`;

// Gom các lá chuỗi/số trong giá trị prop (bỏ qua boolean/null) để kiểm tự chứa.
function leafValues(v: unknown): (string | number)[] {
  if (typeof v === "string" || typeof v === "number") return [v];
  if (Array.isArray(v)) return v.flatMap(leafValues);
  if (v && typeof v === "object") return Object.values(v).flatMap(leafValues);
  return [];
}

describe("Nội dung seed React", () => {
  it("có đúng 12 mục", () => {
    expect(REACT_TAGS.length).toBe(13);
  });

  it("tên mục không trùng", () => {
    const names = REACT_TAGS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("mỗi mục có part/topic/description", () => {
    for (const t of REACT_TAGS) {
      expect(t.part.length, t.name).toBeGreaterThan(0);
      expect(t.topic.length, t.name).toBeGreaterThan(0);
      expect(t.description.length, t.name).toBeGreaterThan(0);
    }
  });

  it("mỗi mục có ≥3 MCQ bậc 1 + ≥3 MCQ bậc 2 + 1 WRITE_JSX bậc 3", () => {
    for (const t of REACT_TAGS) {
      const t1 = t.questions.filter((q) => q.tier === 1);
      const t2 = t.questions.filter((q) => q.tier === 2);
      const t3 = t.questions.filter((q) => q.tier === 3);
      expect(t1.length, `${t.name} bậc1`).toBeGreaterThanOrEqual(3);
      expect(t2.length, `${t.name} bậc2`).toBeGreaterThanOrEqual(3);
      expect(t3.length, `${t.name} bậc3`).toBe(1);
      expect(t1.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t2.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t3[0].type, t.name).toBe("WRITE_JSX");
    }
  });

  it("không trùng (tier|prompt) trong cùng mục", () => {
    for (const t of REACT_TAGS) {
      const keys = t.questions.map((q) => `${q.tier}|${q.prompt}`);
      expect(new Set(keys).size, t.name).toBe(keys.length);
    }
  });

  it("đề MCQ là CÂU HỎI rõ ràng (kết thúc bằng ? và đủ dài để mô tả ngữ cảnh)", () => {
    for (const t of REACT_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        const p = q.prompt.trim();
        expect(p.endsWith("?"), `${t.name}: đề MCQ phải là câu hỏi (kết thúc "?"): ${p}`).toBe(true);
        expect(p.length, `${t.name}: đề MCQ quá ngắn/trừu tượng: ${p}`).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it("MCQ có 4 lựa chọn + correctIndex hợp lệ", () => {
    for (const t of REACT_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        expect(q.options?.length, `${t.name}: ${q.prompt}`).toBe(4);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeLessThan(4);
      }
    }
  });

  it("câu WRITE_JSX có requirements, starterCode và >=1 ca chạy (render/interact)", () => {
    for (const t of REACT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JSX")!;
      const reqs = (q.requirements ?? []) as ReactRequirement[];
      expect(reqs.length, `${t.name}: thiếu requirements`).toBeGreaterThan(0);
      expect((q.starterCode ?? "").length, `${t.name}: thiếu starterCode`).toBeGreaterThan(0);
      const runReqs = reqs.filter(isRunRequirement);
      expect(runReqs.length, `${t.name}: cần >=1 ca chạy`).toBeGreaterThanOrEqual(1);
    }
  });

  it("đề tự chứa: text contains/notContains phải hiện trong đề", () => {
    for (const t of REACT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JSX")!;
      const text = textOf(q);
      for (const req of (q.requirements ?? []) as ReactRequirement[]) {
        if (req.type === "contains" || req.type === "notContains") {
          expect(text.includes(req.text), `${t.name}: "${req.text}" phải có trong đề`).toBe(true);
        }
      }
    }
  });

  it("đề tự chứa: HTML/text kỳ vọng, prop và giá trị gõ của ca chạy phải hiện trong đề", () => {
    for (const t of REACT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JSX")!;
      const text = textOf(q);
      for (const req of (q.requirements ?? []) as ReactRequirement[]) {
        if (isRenderRequirement(req)) {
          if (req.htmlEquals !== undefined) {
            expect(text.includes(req.htmlEquals), `${t.name}: HTML "${req.htmlEquals}" phải có trong đề`).toBe(true);
          }
          if (req.htmlContains !== undefined) {
            expect(text.includes(req.htmlContains), `${t.name}: HTML "${req.htmlContains}" phải có trong đề`).toBe(true);
          }
          for (const v of leafValues(req.props ?? {})) {
            expect(text.includes(String(v)), `${t.name}: giá trị prop "${String(v)}" phải có trong đề`).toBe(true);
          }
        } else if (isInteractRequirement(req)) {
          if (req.textEquals !== undefined) {
            expect(text.includes(req.textEquals), `${t.name}: text "${req.textEquals}" phải có trong đề`).toBe(true);
          }
          if (req.textContains !== undefined) {
            expect(text.includes(req.textContains), `${t.name}: text "${req.textContains}" phải có trong đề`).toBe(true);
          }
          for (const v of leafValues(req.props ?? {})) {
            expect(text.includes(String(v)), `${t.name}: giá trị prop "${String(v)}" phải có trong đề`).toBe(true);
          }
          for (const a of req.actions) {
            if ("change" in a) {
              expect(text.includes(a.value), `${t.name}: giá trị gõ "${a.value}" phải có trong đề`).toBe(true);
            }
          }
        }
      }
    }
  });

  it("đề có lời giải hợp lệ: đáp án tổng hợp tự chấm đậu phần tĩnh", () => {
    for (const t of REACT_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JSX")!;
      const reqs = (q.requirements ?? []) as ReactRequirement[];
      const staticReqs = reqs.filter((r) => !isRenderRequirement(r));
      const sample = buildSampleAnswer(staticReqs);
      const res = gradeReactStatic(sample, staticReqs);
      expect(
        res.passed,
        `${t.name}: không dựng được lời giải tĩnh — ${res.results
          .filter((r) => !r.passed)
          .map((r) => r.message)
          .join("; ")}\nCODE:\n${sample}`
      ).toBe(true);
    }
  });
});
