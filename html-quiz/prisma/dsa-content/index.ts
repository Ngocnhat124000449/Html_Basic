import type { DsaSeedTag } from "./types";
import { PART1_CAU_TRUC_DU_LIEU } from "./part1-cau-truc-du-lieu";
import { PART2_GIAI_THUAT } from "./part2-giai-thuat";
import { PART3_BIG_O } from "./part3-big-o";

// Toàn bộ mục DSA theo thứ tự lộ trình tuần 11–13 (3 Phần)
export const DSA_TAGS: DsaSeedTag[] = [
  ...PART1_CAU_TRUC_DU_LIEU,
  ...PART2_GIAI_THUAT,
  ...PART3_BIG_O,
];

export type { DsaSeedTag, DsaSeedQuestion } from "./types";
