// Kiểu dữ liệu seed cho track Git & Công cụ (tuần 17).
// Mỗi "mục" là một Tag (track="git"). topic = tên chương, part = Phần lớn.
// Bậc 3 dùng type WRITE_CMD: gõ lệnh Git/CLI hoặc nội dung file, chấm TĨNH bằng
// so chuỗi con (contains/notContains) — KHÔNG chạy Worker.
export type GitSeedQuestion = {
  tier: number;
  type: "MCQ" | "WRITE_CMD";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  requirements?: object[];
  starterCode?: string;
};

export type GitSeedTag = {
  name: string;
  topic: string;
  part: string;
  description: string;
  questions: GitSeedQuestion[];
};
