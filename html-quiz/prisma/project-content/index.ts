import type { ProjectSeedTag } from "./types";
import { PART1_KHOI_GIAO_DIEN } from "./part1-khoi-giao-dien";
import { PART2_TO_KIEU_TUONG_TAC } from "./part2-to-kieu-tuong-tac";

// Toàn bộ mục track "Dự án — ghép cả trang"
export const PROJECT_TAGS: ProjectSeedTag[] = [
  ...PART1_KHOI_GIAO_DIEN,
  ...PART2_TO_KIEU_TUONG_TAC,
];

export type { ProjectSeedTag, ProjectSeedQuestion } from "./types";
