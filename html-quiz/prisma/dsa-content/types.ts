// Kiểu dữ liệu seed cho track DSA (Cấu trúc dữ liệu & Giải thuật).
// Mỗi "mục" là một Tag (track="dsa"). topic = tên chương, part = Phần lớn.
// Tái dùng nguyên loại câu WRITE_JS + bộ chạy Web Worker JS (không đổi hạ tầng).
export type DsaSeedQuestion = {
  tier: number;
  type: "MCQ" | "WRITE_JS";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  requirements?: object[];
  starterCode?: string;
};

export type DsaSeedTag = {
  name: string;
  topic: string;
  part: string;
  description: string;
  questions: DsaSeedQuestion[];
};
