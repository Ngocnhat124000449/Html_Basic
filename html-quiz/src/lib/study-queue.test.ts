import { describe, expect, it } from "vitest";
import { buildLearnSequence, buildLearnWithWarmup, buildReviewQueue } from "./study-queue";
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

// helper riêng có cờ isNew (helper cũ mkTag mặc định isNew=true)
function mkTagN(id: string, tiers: number[], isNew: boolean): SessionTag {
  return {
    tagId: id,
    track: "css",
    name: id,
    topic: "topic",
    description: "desc",
    isNew,
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

describe("buildLearnWithWarmup", () => {
  const H1 = mkTagN("H1", [1, 2], false);
  const H2 = mkTagN("H2", [1], false);
  const A = mkTagN("A", [3, 1, 2], true);
  const B = mkTagN("B", [1], true);
  const q = buildLearnWithWarmup([H1, H2, A, B]);

  it("pha ôn (isNew=false) đứng TRƯỚC pha học (isNew=true)", () => {
    const flags = q.map((i) => i.tag.isNew);
    expect(flags.lastIndexOf(false)).toBeLessThan(flags.indexOf(true));
  });
  it("pha học tuần tự theo thẻ + bậc tăng dần", () => {
    const learn = q.filter((i) => i.tag.isNew);
    expect(learn.map((i) => i.tag.tagId)).toEqual(["A", "A", "A", "B"]);
    expect(learn.filter((i) => i.tag.tagId === "A").map((i) => i.q.tier)).toEqual([1, 2, 3]);
  });
  it("pha ôn đủ phần tử (hoán vị)", () => {
    const warm = q.filter((i) => !i.tag.isNew);
    expect(new Set(warm.map((i) => i.q.id))).toEqual(new Set(["H1-q0", "H1-q1", "H2-q0"]));
  });
  it("độ dài = tổng số câu", () => expect(q).toHaveLength(7));
});
