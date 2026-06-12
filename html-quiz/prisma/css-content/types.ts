// Kiểu dữ liệu seed cho track CSS — mỗi "mục" là một Tag (track="css")
// topic = tên chương, part = tên Phần lớn của lộ trình
export type CssSeedQuestion = {
  tier: number;
  type: "MCQ" | "WRITE_CSS";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  requirements?: object[];
  starterCode?: string;
};

export type CssSeedTag = {
  name: string;
  topic: string;
  part: string;
  description: string;
  questions: CssSeedQuestion[];
};
