import type { ReactSeedTag } from "./types";
import { PART1_NEN_TANG } from "./part1-nen-tang";
import { PART2_STATE_TUONG_TAC } from "./part2-state-tuong-tac";

// Toàn bộ mục track React theo thứ tự lộ trình
// (tuần 18 — Phần 1: Nền tảng React; tuần 19 — Phần 2: State & Tương tác)
export const REACT_TAGS: ReactSeedTag[] = [...PART1_NEN_TANG, ...PART2_STATE_TUONG_TAC];

export type { ReactSeedTag, ReactSeedQuestion } from "./types";
