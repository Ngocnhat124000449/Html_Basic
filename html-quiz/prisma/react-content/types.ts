// Kiểu dữ liệu seed cho track React. Mỗi "mục" là một Tag (track="react").
// topic = tên chương, part = Phần lớn. Bậc 3 dùng type WRITE_JSX: viết component
// React, chấm = TĨNH (contains/construct trên mã nguồn) + RENDER thật
// (transpile JSX + renderToStaticMarkup trong Web Worker) so HTML.
export type ReactSeedQuestion = {
  tier: number;
  type: "MCQ" | "WRITE_JSX";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  requirements?: object[];
  starterCode?: string;
};

export type ReactSeedTag = {
  name: string;
  topic: string;
  part: string;
  description: string;
  questions: ReactSeedQuestion[];
};
