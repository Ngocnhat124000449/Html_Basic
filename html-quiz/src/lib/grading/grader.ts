import { parse, HTMLElement } from "node-html-parser";
import type { GradeResult, Requirement, RequirementResult } from "./types";

const norm = (s: string) => s.trim().replace(/\s+/g, " ");
const normLower = (s: string) => norm(s).toLowerCase();

function getAttrs(el: HTMLElement): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(el.attributes)) out[k.toLowerCase()] = v;
  return out;
}

function tagOf(el: HTMLElement): string {
  return (el.rawTagName ?? "").toLowerCase();
}

export function gradeCode(input: string, requirements: Requirement[]): GradeResult {
  const root = parse(input, { lowerCaseTagName: true });
  const elements = root.querySelectorAll("*");

  if (elements.length === 0) {
    return {
      passed: false,
      parseError: true,
      results: requirements.map(() => ({
        passed: false,
        message: "Không đọc được code của bạn — kiểm tra lại cú pháp thẻ (< >)",
      })),
    };
  }

  const results = requirements.map((req) => checkRequirement(req, elements));
  return { passed: results.every((r) => r.passed), results };
}

function checkRequirement(req: Requirement, elements: HTMLElement[]): RequirementResult {
  switch (req.type) {
    case "tagName": {
      const actual = tagOf(elements[0]);
      return actual === req.value
        ? { passed: true, message: `Tên thẻ: ${req.value}` }
        : { passed: false, message: `Tên thẻ sai — bạn viết <${actual}>, cần <${req.value}>` };
    }
    case "attr": {
      const name = req.name.toLowerCase();
      const holder = elements.find((el) => name in getAttrs(el));
      if (!holder) return { passed: false, message: `Thiếu thuộc tính ${req.name}` };
      if (req.value === undefined) return { passed: true, message: `Có thuộc tính ${req.name}` };
      const actual = getAttrs(holder)[name];
      return normLower(actual) === normLower(req.value)
        ? { passed: true, message: `${req.name}="${req.value}"` }
        : {
            passed: false,
            message: `${req.name} sai giá trị — bạn viết "${actual}", cần "${req.value}"`,
          };
    }
    case "contains": {
      const parent = elements.find((el) => tagOf(el) === req.parent);
      if (!parent) return { passed: false, message: `Thiếu thẻ <${req.parent}>` };
      const count = parent.querySelectorAll(req.child).length;
      const want = req.count ?? 1;
      return count === want
        ? { passed: true, message: `<${req.parent}> chứa ${want} thẻ <${req.child}>` }
        : {
            passed: false,
            message: `<${req.parent}> cần ${want} thẻ <${req.child}>, bạn đang có ${count}`,
          };
    }
    case "text": {
      const matches = elements.filter((el) => tagOf(el) === req.tag);
      const el = matches[req.index];
      if (!el)
        return { passed: false, message: `Không tìm thấy thẻ <${req.tag}> thứ ${req.index + 1}` };
      const actual = norm(el.textContent ?? "");
      return normLower(actual) === normLower(req.value)
        ? { passed: true, message: `Nội dung "${req.value}" đúng` }
        : {
            passed: false,
            message: `Nội dung thẻ <${req.tag}> thứ ${req.index + 1} sai — bạn viết "${actual}", cần "${req.value}"`,
          };
    }
  }
}

export function gradeFillBlank(input: string, answer: string): GradeResult {
  const clean = (s: string) => s.toLowerCase().replace(/[<>/\s]/g, "");
  const ok = clean(input).length > 0 && clean(input) === clean(answer);
  return {
    passed: ok,
    results: [
      ok
        ? { passed: true, message: `Chính xác: ${answer}` }
        : { passed: false, message: "Chưa đúng — xem lại tên thẻ cần điền" },
    ],
  };
}
