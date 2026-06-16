import type { GitSeedTag } from "./types";
import { PART1_GIT } from "./part1-git";
import { PART2_CONG_CU } from "./part2-cong-cu";

// Toàn bộ mục track Git & Công cụ theo thứ tự lộ trình (tuần 17, 2 Phần)
export const GIT_TAGS: GitSeedTag[] = [...PART1_GIT, ...PART2_CONG_CU];

export type { GitSeedTag, GitSeedQuestion } from "./types";
