import type { JsSeedTag } from "./types";
import { PART1_NEN_TANG } from "./part1-nen-tang";
import { PART2_LUONG_HAM } from "./part2-luong-ham";
import { PART3_DU_LIEU } from "./part3-du-lieu";

// Toàn bộ mục JS theo thứ tự lộ trình — sẽ nối Phần 4→5 vào đây
export const JS_TAGS: JsSeedTag[] = [
  ...PART1_NEN_TANG,
  ...PART2_LUONG_HAM,
  ...PART3_DU_LIEU,
];

export type { JsSeedTag, JsSeedQuestion } from "./types";
