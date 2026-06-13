import type { CssSeedTag } from "./types";
import { PART1_CHUONG_1_2 } from "./part1-cu-phap-selector";
import { PART1_CHUONG_3_5 } from "./part1-cascade-don-vi-box";
import { PART2_CHUONG_6_7 } from "./part2-mau-nen-chu";
import { PART2_CHUONG_8_9 } from "./part2-trang-tri-anh";
import { PART3_CHUONG_10_11 } from "./part3-display-flex";
import { PART3_CHUONG_12_15 } from "./part3-grid-position-responsive";
import { PART4_CHUONG_16_20 } from "./part4-hieu-ung";

// Toàn bộ mục CSS theo thứ tự lộ trình: 4 Phần × 20 chương
export const CSS_TAGS: CssSeedTag[] = [
  ...PART1_CHUONG_1_2,
  ...PART1_CHUONG_3_5,
  ...PART2_CHUONG_6_7,
  ...PART2_CHUONG_8_9,
  ...PART3_CHUONG_10_11,
  ...PART3_CHUONG_12_15,
  ...PART4_CHUONG_16_20,
];

export type { CssSeedTag, CssSeedQuestion } from "./types";
