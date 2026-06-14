import type { JsSeedTag } from "./types";
import { PART1_NEN_TANG } from "./part1-nen-tang";
import { PART2_LUONG_HAM } from "./part2-luong-ham";
import { PART3_DU_LIEU } from "./part3-du-lieu";
import { PART4_DOM_SU_KIEN } from "./part4-dom-su-kien";
import { PART5_BAT_DONG_BO } from "./part5-bat-dong-bo";

// Toàn bộ mục JS theo thứ tự lộ trình (5 Phần)
export const JS_TAGS: JsSeedTag[] = [
  ...PART1_NEN_TANG,
  ...PART2_LUONG_HAM,
  ...PART3_DU_LIEU,
  ...PART4_DOM_SU_KIEN,
  ...PART5_BAT_DONG_BO,
];

export type { JsSeedTag, JsSeedQuestion } from "./types";
