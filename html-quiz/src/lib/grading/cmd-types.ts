// Yêu cầu chấm cho câu WRITE_CMD (gõ lệnh Git/CLI hoặc nội dung file cấu hình).
// Chấm TĨNH bằng so chuỗi con — KHÔNG chạy gì cả (không Worker, không eval).
// `inPrompt: true` đánh dấu giá trị TÙY Ý (tên nhánh, lời nhắn, tên file, URL)
// bắt buộc hiện nguyên văn trong đề (đề tự chứa); động từ lệnh thì không cần.
export type CmdRequirement =
  | { type: "contains"; text: string; message?: string; inPrompt?: boolean }
  | { type: "notContains"; text: string; message?: string; inPrompt?: boolean };
