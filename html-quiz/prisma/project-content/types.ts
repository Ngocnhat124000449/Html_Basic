// Kiểu dữ liệu seed cho track "Dự án — ghép cả trang" (track="project").
// Mỗi "mục" là một Tag. Trọng tâm: GHÉP nhiều thẻ thành một KHỐI giao diện hoàn
// chỉnh. Bậc 3 dùng type WRITE_STRUCTURE (đã có sẵn) — chấm bằng gradeCode
// (parse HTML, kiểm tagName + parent>child + text) → không cần hạ tầng/migration mới.
export type ProjectSeedQuestion = {
  tier: number;
  type: "MCQ" | "WRITE_STRUCTURE" | "WRITE_CSS" | "WRITE_JS";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  requirements?: object[];
  starterCode?: string;
};

export type ProjectSeedTag = {
  name: string;
  topic: string;
  part: string;
  description: string;
  questions: ProjectSeedQuestion[];
};
