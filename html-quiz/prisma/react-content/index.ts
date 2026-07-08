import type { ReactSeedTag } from "./types";
import { PART0_NHAP_MON } from "./part0-nhap-mon";
import { PART1_NEN_TANG } from "./part1-nen-tang";
import { PART2_STATE_TUONG_TAC } from "./part2-state-tuong-tac";
import { PART3_EFFECT_DANH_SACH } from "./part3-effect-danh-sach";

// Toàn bộ mục track React theo thứ tự lộ trình (tuần 18 — Nền tảng; tuần 19 — State
// & Tương tác; tuần 20 — Effect, Danh sách & Điều kiện)
export const REACT_TAGS: ReactSeedTag[] = [
  ...PART0_NHAP_MON,
  ...PART1_NEN_TANG,
  ...PART2_STATE_TUONG_TAC,
  ...PART3_EFFECT_DANH_SACH,
];

export type { ReactSeedTag, ReactSeedQuestion } from "./types";
