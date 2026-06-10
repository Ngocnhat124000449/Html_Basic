import { describe, it, expect } from "vitest";
import { applyPass, applyFail } from "./srs";

describe("applyPass", () => {
  it("thẻ mới (interval 0) → 1 ngày", () => {
    const r = applyPass({ ease: 2.5, intervalDays: 0, lapses: 0 });
    expect(r.intervalDays).toBe(1);
    expect(r.mastered).toBe(false);
  });

  it("interval 1 → 3 ngày", () => {
    expect(applyPass({ ease: 2.5, intervalDays: 1, lapses: 0 }).intervalDays).toBe(3);
  });

  it("interval 3, ease 2.5 → 8 ngày (3 × 2.5 làm tròn)", () => {
    expect(applyPass({ ease: 2.5, intervalDays: 3, lapses: 0 }).intervalDays).toBe(8);
  });

  it("đạt mastered khi interval mới >= 21", () => {
    const r = applyPass({ ease: 2.5, intervalDays: 10, lapses: 0 });
    expect(r.intervalDays).toBe(25);
    expect(r.mastered).toBe(true);
  });

  it("pass không đổi ease", () => {
    expect(applyPass({ ease: 2.1, intervalDays: 1, lapses: 0 }).ease).toBe(2.1);
  });
});

describe("applyFail", () => {
  it("reset interval về 0 (quay lại hàng đợi hôm nay), tăng lapses, giảm ease 0.2", () => {
    const r = applyFail({ ease: 2.5, intervalDays: 8, lapses: 1 });
    expect(r.intervalDays).toBe(0);
    expect(r.lapses).toBe(2);
    expect(r.ease).toBe(2.3);
    expect(r.mastered).toBe(false);
  });

  it("ease không xuống dưới 1.3", () => {
    expect(applyFail({ ease: 1.35, intervalDays: 1, lapses: 0 }).ease).toBe(1.3);
  });
});
