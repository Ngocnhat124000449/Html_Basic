import { describe, expect, it } from "vitest";
import { isValidFsrsParams, FSRS_PARAM_COUNT } from "./fsrs-params";

const ok = Array.from({ length: FSRS_PARAM_COUNT }, (_, i) => i * 0.1 + 0.01);

describe("isValidFsrsParams", () => {
  it("chấp nhận đúng 21 số hữu hạn", () => {
    expect(isValidFsrsParams(ok)).toBe(true);
  });

  it("từ chối sai độ dài", () => {
    expect(isValidFsrsParams(ok.slice(0, 20))).toBe(false);
    expect(isValidFsrsParams([...ok, 1])).toBe(false);
  });

  it("từ chối giá trị không hữu hạn / sai kiểu", () => {
    expect(isValidFsrsParams([...ok.slice(0, 20), NaN])).toBe(false);
    expect(isValidFsrsParams([...ok.slice(0, 20), Infinity])).toBe(false);
    expect(isValidFsrsParams([...ok.slice(0, 20), "1"])).toBe(false);
    expect(isValidFsrsParams(null)).toBe(false);
    expect(isValidFsrsParams("nope")).toBe(false);
  });
});
