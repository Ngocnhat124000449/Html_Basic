import type { GradeResult, RequirementResult } from "./types";
import type { CmdRequirement } from "./cmd-types";

// Chuẩn hóa khoảng trắng (gộp nhiều dấu cách/xuống dòng thành một dấu cách).
const normSpace = (s: string) => s.replace(/\s+/g, " ").trim();

// Chấm câu WRITE_CMD: chỉ so chuỗi con trên bài nộp (lệnh CLI / nội dung file).
// Server KHÔNG thực thi gì — đây là so khớp văn bản thuần, không có ReDoS.
export function gradeCmd(input: string, requirements: CmdRequirement[]): GradeResult {
  const raw = normSpace(input);
  if (raw.length === 0) {
    return {
      passed: false,
      parseError: true,
      results: requirements.map(() => ({ passed: false, message: "Bạn chưa nhập lệnh nào" })),
    };
  }

  const results: RequirementResult[] = requirements.map((req) => {
    const needle = normSpace(req.text);
    if (req.type === "contains") {
      return raw.includes(needle)
        ? { passed: true, message: req.message ?? `Có dùng \`${req.text}\`` }
        : { passed: false, message: req.message ?? `Cần dùng \`${req.text}\`` };
    }
    // notContains
    return !raw.includes(needle)
      ? { passed: true, message: req.message ?? `Không dùng \`${req.text}\` — tốt` }
      : { passed: false, message: req.message ?? `Không nên dùng \`${req.text}\`` };
  });

  return { passed: results.every((r) => r.passed), results };
}
