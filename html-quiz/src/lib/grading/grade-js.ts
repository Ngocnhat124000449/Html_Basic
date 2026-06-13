import type { GradeResult, RequirementResult } from "./types";
import {
  isRunRequirement,
  type JsConstruct,
  type JsRequirement,
  type JsStaticRequirement,
} from "./js-types";

// Regex CỐ ĐỊNH cho từng cấu trúc — không nhận pattern động (tránh ReDoS).
// Tất cả đều tuyến tính, không có nhóm lồng có thể bùng nổ.
const CONSTRUCTS: Record<JsConstruct, { re: RegExp; label: string }> = {
  arrow: { re: /=>/, label: "hàm mũi tên (=>)" },
  const: { re: /\bconst\b/, label: "khai báo const" },
  let: { re: /\blet\b/, label: "khai báo let" },
  function: { re: /\bfunction\b/, label: "từ khóa function" },
  for: { re: /\bfor\b/, label: "vòng lặp for" },
  while: { re: /\bwhile\b/, label: "vòng lặp while" },
  if: { re: /\bif\b/, label: "câu lệnh if" },
  template: { re: /`[^`]*\$\{/, label: "template literal (`${}`)" },
  map: { re: /\.map\s*\(/, label: ".map()" },
  filter: { re: /\.filter\s*\(/, label: ".filter()" },
  reduce: { re: /\.reduce\s*\(/, label: ".reduce()" },
  forEach: { re: /\.forEach\s*\(/, label: ".forEach()" },
  find: { re: /\.find\s*\(/, label: ".find()" },
  addEventListener: { re: /\.addEventListener\s*\(/, label: ".addEventListener()" },
  querySelector: { re: /\bquerySelector(All)?\s*\(/, label: "querySelector()" },
  async: { re: /\basync\b/, label: "async" },
  await: { re: /\bawait\b/, label: "await" },
  promise: { re: /new\s+Promise\b|\.then\s*\(/, label: "Promise (new Promise/.then)" },
  tryCatch: { re: /\btry\b[\s\S]*\bcatch\b/, label: "try...catch" },
  destructure: { re: /(const|let|var)\s*[[{][^=;]*[\]}]\s*=/, label: "phá vỡ (destructuring)" },
  spread: { re: /\.\.\./, label: "spread/rest (...)" },
};

// Bỏ comment (// và /* */) và chuỗi (', ", `) để kiểm tra mẫu không bị nhiễu
// bởi nội dung văn bản — vd cấm "var" nhưng cho phép chuỗi "var" trong console.log.
function stripNoise(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\/\/[^\n]*/g, " ")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/`(?:[^`\\]|\\.)*`/g, "``");
}

const normSpace = (s: string) => s.replace(/\s+/g, " ").trim();

function checkStatic(req: JsStaticRequirement, raw: string, clean: string): RequirementResult {
  switch (req.type) {
    case "contains": {
      const ok = normSpace(clean).includes(normSpace(req.text));
      return ok
        ? { passed: true, message: req.message ?? `Có dùng \`${req.text}\`` }
        : { passed: false, message: req.message ?? `Cần dùng \`${req.text}\`` };
    }
    case "notContains": {
      const ok = !normSpace(clean).includes(normSpace(req.text));
      return { passed: ok, message: req.message };
    }
    case "construct": {
      const entry = CONSTRUCTS[req.construct];
      // "template" là một dạng chuỗi → stripNoise xóa mất ${}; phải soi code GỐC.
      // Các cấu trúc khác soi code đã bỏ comment/chuỗi để khỏi khớp nhầm.
      const src = req.construct === "template" ? raw : clean;
      // Cắt ngắn input cho chắc (regex cố định + input giới hạn = không lo ReDoS)
      const MAX = 4000;
      const sample = src.length > MAX ? src.slice(0, MAX) : src;
      const ok = entry.re.test(sample);
      return ok
        ? { passed: true, message: req.message ?? `Có dùng ${entry.label}` }
        : { passed: false, message: req.message ?? `Cần dùng ${entry.label}` };
    }
  }
}

/**
 * Chấm phần TĨNH của câu WRITE_JS (kiểm tra mẫu). An toàn, không thực thi code.
 * Requirement dạng run (returns/logs) được đánh dấu chờ chạy ở client (Web Worker).
 */
export function gradeJsStatic(code: string, requirements: JsRequirement[]): GradeResult {
  if (code.trim() === "") {
    return {
      passed: false,
      results: requirements.map(() => ({
        passed: false,
        message: "Bạn chưa viết code",
      })),
    };
  }

  const clean = stripNoise(code);
  const results = requirements.map((req): RequirementResult => {
    if (isRunRequirement(req)) {
      // Không tự chạy ở đây — client sẽ thực thi và ghi đè kết quả này.
      return { passed: false, message: req.message ?? "Chờ chạy thử kết quả..." };
    }
    return checkStatic(req, code, clean);
  });

  return { passed: results.every((r) => r.passed), results };
}

/** Câu này có cần chạy thật (có ít nhất 1 run requirement) không? */
export function hasRunRequirement(requirements: JsRequirement[]): boolean {
  return requirements.some(isRunRequirement);
}
