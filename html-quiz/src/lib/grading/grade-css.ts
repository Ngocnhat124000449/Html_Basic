import type { GradeResult, RequirementResult } from "./types";
import type { CssRequirement } from "./css-types";

type CssRule = { selector: string; decls: Map<string, string> };

// Chuẩn hóa selector: lowercase, gọn khoảng trắng, bỏ khoảng quanh tổ hợp > + ~ ,
function normSelector(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s*([>+~,])\s*/g, "$1")
    .replace(/\s+/g, " ");
}

// Chuẩn hóa giá trị: khoan dung với khoảng trắng, dấu ; thừa, hoa/thường,
// quote ('Arial' = "Arial" = Arial), 0px = 0, #abc = #aabbccc
function normValue(s: string): string {
  let v = s
    .trim()
    .toLowerCase()
    .replace(/;+\s*$/, "")
    .replace(/['"]/g, "")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s+/g, " ");
  v = v.replace(/(^|[\s,(/])0(?:\.0+)?(px|em|rem|%|vh|vw|pt|ch)(?=$|[\s,)/])/g, "$10");
  v = v.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])(?![0-9a-f])/g, "#$1$1$2$2$3$3");
  return v;
}

function normProp(s: string): string {
  return s.trim().toLowerCase();
}

// Parser CSS tối giản: bỏ comment, đọc các block "selector { prop: value; ... }".
// Block @media/@supports được mở ra để đọc rule bên trong; rule trùng selector được gộp.
export function parseCss(input: string): CssRule[] {
  const src = input.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules: CssRule[] = [];
  const byKey = new Map<string, CssRule>();

  let i = 0;
  const n = src.length;
  while (i < n) {
    const open = src.indexOf("{", i);
    if (open === -1) break;
    const selector = src.slice(i, open).trim();
    // At-rule có block con (@media, @supports): bỏ dòng @, parse tiếp phần trong
    if (selector.startsWith("@")) {
      i = open + 1;
      continue;
    }
    const close = src.indexOf("}", open);
    if (close === -1) break;
    const body = src.slice(open + 1, close);
    const key = normSelector(selector);
    if (key.length > 0) {
      let rule = byKey.get(key);
      if (!rule) {
        rule = { selector: key, decls: new Map() };
        byKey.set(key, rule);
        rules.push(rule);
      }
      for (const piece of body.split(";")) {
        const colon = piece.indexOf(":");
        if (colon === -1) continue;
        const prop = normProp(piece.slice(0, colon));
        const value = normValue(piece.slice(colon + 1));
        if (prop.length > 0 && value.length > 0) rule.decls.set(prop, value);
      }
    }
    i = close + 1;
  }
  return rules;
}

export function gradeCss(input: string, requirements: CssRequirement[]): GradeResult {
  const rules = parseCss(input);

  if (rules.length === 0) {
    return {
      passed: false,
      parseError: true,
      results: requirements.map(() => ({
        passed: false,
        message: "Không đọc được CSS của bạn — kiểm tra lại cú pháp selector { thuộc-tính: giá-trị; }",
      })),
    };
  }

  const results = requirements.map((req) => checkRequirement(req, rules));
  return { passed: results.every((r) => r.passed), results };
}

function findRule(rules: CssRule[], selector: string): CssRule | undefined {
  const key = normSelector(selector);
  return rules.find((r) => r.selector === key);
}

function checkRequirement(req: CssRequirement, rules: CssRule[]): RequirementResult {
  switch (req.type) {
    case "selector": {
      return findRule(rules, req.value)
        ? { passed: true, message: `Có rule cho ${req.value}` }
        : {
            passed: false,
            message: `Thiếu rule cho selector "${req.value}" — bạn đang viết: ${rules
              .map((r) => r.selector)
              .join(", ")}`,
          };
    }
    case "property": {
      const rule = findRule(rules, req.selector);
      if (!rule)
        return { passed: false, message: `Thiếu rule cho selector "${req.selector}"` };
      return rule.decls.has(normProp(req.name))
        ? { passed: true, message: `${req.selector} có ${req.name}` }
        : { passed: false, message: `Rule ${req.selector} thiếu thuộc tính ${req.name}` };
    }
    case "value": {
      const rule = findRule(rules, req.selector);
      if (!rule)
        return { passed: false, message: `Thiếu rule cho selector "${req.selector}"` };
      const actual = rule.decls.get(normProp(req.name));
      if (actual === undefined)
        return { passed: false, message: `Rule ${req.selector} thiếu thuộc tính ${req.name}` };
      return actual === normValue(req.value)
        ? { passed: true, message: `${req.name}: ${req.value}` }
        : {
            passed: false,
            message: `${req.name} sai giá trị — bạn viết "${actual}", cần "${normValue(req.value)}"`,
          };
    }
  }
}
