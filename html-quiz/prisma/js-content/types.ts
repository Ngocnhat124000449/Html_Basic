// Kiểu dữ liệu seed cho track JS — mỗi "mục" là một Tag (track="js").
// topic = tên chương, part = tên Phần lớn của lộ trình.
export type JsSeedQuestion = {
  tier: number;
  type: "MCQ" | "WRITE_JS";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  requirements?: object[];
  starterCode?: string;
};

export type JsSeedTag = {
  name: string;
  topic: string;
  part: string;
  description: string;
  questions: JsSeedQuestion[];
};
