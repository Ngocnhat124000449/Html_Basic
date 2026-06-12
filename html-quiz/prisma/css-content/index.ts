import type { CssSeedTag } from "./types";
import { PART1_CHUONG_1_2 } from "./part1-cu-phap-selector";
import { PART1_CHUONG_3_5 } from "./part1-cascade-don-vi-box";

// Toàn bộ mục CSS theo thứ tự lộ trình — GĐ5 sẽ nối thêm Phần 2/3/4 vào đây
export const CSS_TAGS: CssSeedTag[] = [...PART1_CHUONG_1_2, ...PART1_CHUONG_3_5];

export type { CssSeedTag, CssSeedQuestion } from "./types";
