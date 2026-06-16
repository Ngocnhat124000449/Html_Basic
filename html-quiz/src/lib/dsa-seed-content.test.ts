import { describe, expect, it } from "vitest";
import { DSA_TAGS } from "../../prisma/dsa-content";
import { gradeJsStatic } from "./grading/grade-js";
import { isRunRequirement, type JsConstruct, type JsRequirement } from "./grading/js-types";

// Đoạn code mẫu kích hoạt mỗi construct — dùng dựng đáp án tổng hợp để tự kiểm
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

// Dựng một đáp án thỏa mọi requirement TĨNH để xác nhận đề có lời giải hợp lệ
function buildSampleAnswer(reqs: JsRequirement[]): string {
  const lines: string[] = [];
  for (const r of reqs) {
    if (r.type === "contains") lines.push(r.text);
    else if (r.type === "construct") lines.push(CONSTRUCT_SNIPPET[r.construct]);
  }
  return lines.join("\n");
}

const textOf = (q: { prompt: string; starterCode?: string }) =>
  `${q.prompt}\n${q.starterCode ?? ""}`;

describe("Nội dung seed DSA", () => {
  it("có đúng 12 mục", () => {
    expect(DSA_TAGS.length).toBe(12);
  });

  it("tên mục không trùng", () => {
    const names = DSA_TAGS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("mỗi mục có part/topic/description", () => {
    for (const t of DSA_TAGS) {
      expect(t.part.length, t.name).toBeGreaterThan(0);
      expect(t.topic.length, t.name).toBeGreaterThan(0);
      expect(t.description.length, t.name).toBeGreaterThan(0);
    }
  });

  it("mỗi mục đúng 3 MCQ bậc 1 + 3 MCQ bậc 2 + 1 WRITE_JS bậc 3", () => {
    for (const t of DSA_TAGS) {
      const t1 = t.questions.filter((q) => q.tier === 1);
      const t2 = t.questions.filter((q) => q.tier === 2);
      const t3 = t.questions.filter((q) => q.tier === 3);
      expect(t1.length, `${t.name} bậc1`).toBe(3);
      expect(t2.length, `${t.name} bậc2`).toBe(3);
      expect(t3.length, `${t.name} bậc3`).toBe(1);
      expect(t1.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t2.every((q) => q.type === "MCQ"), t.name).toBe(true);
      expect(t3[0].type, t.name).toBe("WRITE_JS");
    }
  });

  it("không trùng (tier|prompt) trong cùng mục", () => {
    for (const t of DSA_TAGS) {
      const keys = t.questions.map((q) => `${q.tier}|${q.prompt}`);
      expect(new Set(keys).size, t.name).toBe(keys.length);
    }
  });

  it("đề MCQ là CÂU HỎI rõ ràng (kết thúc bằng ? và đủ dài để mô tả ngữ cảnh)", () => {
    for (const t of DSA_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        const p = q.prompt.trim();
        expect(p.endsWith("?"), `${t.name}: đề MCQ phải là câu hỏi (kết thúc "?"): ${p}`).toBe(true);
        expect(p.length, `${t.name}: đề MCQ quá ngắn/trừu tượng: ${p}`).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it("MCQ có 4 lựa chọn + correctIndex hợp lệ", () => {
    for (const t of DSA_TAGS) {
      for (const q of t.questions.filter((q) => q.type === "MCQ")) {
        expect(q.options?.length, `${t.name}: ${q.prompt}`).toBe(4);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex, `${t.name}: ${q.prompt}`).toBeLessThan(4);
      }
    }
  });

  it("câu WRITE_JS có requirements và starterCode căn cứ", () => {
    for (const t of DSA_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JS")!;
      const reqs = (q.requirements ?? []) as JsRequirement[];
      expect(reqs.length, `${t.name}: thiếu requirements`).toBeGreaterThan(0);
      expect((q.starterCode ?? "").length, `${t.name}: thiếu starterCode`).toBeGreaterThan(0);
    }
  });

  it("bậc 3 CHẠY THẬT ít nhất 2 ca test (chống hard-code)", () => {
    for (const t of DSA_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JS")!;
      const runReqs = ((q.requirements ?? []) as JsRequirement[]).filter(isRunRequirement);
      expect(runReqs.length, `${t.name}: bậc 3 cần >=2 ca chạy thật`).toBeGreaterThanOrEqual(2);
    }
  });

  it("đề tự chứa: text contains/notContains phải hiện trong đề", () => {
    for (const t of DSA_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JS")!;
      const text = textOf(q);
      for (const req of (q.requirements ?? []) as JsRequirement[]) {
        if (req.type === "contains" || req.type === "notContains") {
          expect(text.includes(req.text), `${t.name}: "${req.text}" phải có trong đề`).toBe(true);
        }
      }
    }
  });

  it("đề tự chứa: giá trị mong đợi (equals) của ca chạy phải hiện trong đề", () => {
    for (const t of DSA_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JS")!;
      const text = textOf(q);
      for (const req of (q.requirements ?? []) as JsRequirement[]) {
        if (req.type === "returns" || req.type === "logs") {
          expect(
            text.includes(String(req.equals)),
            `${t.name}: kết quả "${String(req.equals)}" của ${req.call ?? "(logs)"} phải có trong đề`
          ).toBe(true);
        }
      }
    }
  });

  it("đề có lời giải hợp lệ: đáp án tổng hợp tự chấm đậu phần tĩnh", () => {
    for (const t of DSA_TAGS) {
      const q = t.questions.find((q) => q.type === "WRITE_JS")!;
      const reqs = (q.requirements ?? []) as JsRequirement[];
      const staticReqs = reqs.filter((r) => !isRunRequirement(r));
      const sample = buildSampleAnswer(staticReqs);
      const res = gradeJsStatic(sample, staticReqs);
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
