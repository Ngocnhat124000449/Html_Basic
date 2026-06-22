import { describe, expect, it } from "vitest";
import { buildLearnSequence, buildReviewQueue } from "./study-queue";
import type { SessionTag } from "./study-types";

function mkTag(id: string, tiers: number[]): SessionTag {
  return {
    tagId: id,
    track: "css",
    name: id,
    topic: "topic",
    description: "desc",
    isNew: true,
    questions: tiers.map((tier, i) => ({
      id: `${id}-q${i}`,
      tier,
      type: "MCQ",
      prompt: "p",
      options: ["a", "b"],
      starterCode: null,
    })),
  };
}

const A = mkTag("A", [3, 1, 2]);
const B = mkTag("B", [1, 2]);

describe("buildLearnSequence", () => {
  it("giữ thứ tự thẻ, không xáo", () => {
    const seq = buildLearnSequence([A, B]);
    const tagOrder = seq.map((i) => i.tag.tagId);
    expect(tagOrder).toEqual(["A", "A", "A", "B", "B"]);
  });

  it("trong mỗi thẻ, câu xếp theo bậc tăng dần", () => {
    const seq = buildLearnSequence([A]);
    expect(seq.map((i) => i.q.tier)).toEqual([1, 2, 3]);
  });

  it("độ dài = tổng số câu", () => {
    expect(buildLearnSequence([A, B])).toHaveLength(5);
  });
});

describe("buildReviewQueue", () => {
  it("là hoán vị đủ mọi câu (không mất/không thêm)", () => {
    const q = buildReviewQueue([A, B]);
    expect(q).toHaveLength(5);
    expect(new Set(q.map((i) => i.q.id))).toEqual(
      new Set(["A-q0", "A-q1", "A-q2", "B-q0", "B-q1"])
    );
  });
});
