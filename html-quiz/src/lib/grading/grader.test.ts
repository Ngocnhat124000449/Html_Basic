import { describe, it, expect } from "vitest";
import { gradeCode, gradeFillBlank } from "./grader";
import type { Requirement } from "./types";

const inputReqs: Requirement[] = [
  { type: "tagName", value: "input" },
  { type: "attr", name: "type", value: "email" },
  { type: "attr", name: "required" },
  { type: "attr", name: "placeholder", value: "ten@email.com" },
];

const listReqs: Requirement[] = [
  { type: "tagName", value: "ul" },
  { type: "contains", parent: "ul", child: "li", count: 2 },
  { type: "text", tag: "li", index: 0, value: "Táo" },
  { type: "text", tag: "li", index: 1, value: "Cam" },
];

describe("gradeCode", () => {
  it("chấm đúng thẻ chuẩn với nháy kép", () => {
    const r = gradeCode('<input type="email" required placeholder="ten@email.com">', inputReqs);
    expect(r.passed).toBe(true);
    expect(r.results).toHaveLength(4);
    expect(r.results.every((x) => x.passed)).toBe(true);
  });

  it("chấp nhận nháy đơn", () => {
    const r = gradeCode("<input type='email' required placeholder='ten@email.com'>", inputReqs);
    expect(r.passed).toBe(true);
  });

  it("thứ tự attribute không quan trọng", () => {
    const r = gradeCode('<input placeholder="ten@email.com" required type="email">', inputReqs);
    expect(r.passed).toBe(true);
  });

  it("không phân biệt chữ hoa/thường", () => {
    const r = gradeCode('<INPUT TYPE="EMAIL" REQUIRED PLACEHOLDER="TEN@EMAIL.COM">', inputReqs);
    expect(r.passed).toBe(true);
  });

  it("báo thiếu attribute", () => {
    const r = gradeCode('<input type="email">', inputReqs);
    expect(r.passed).toBe(false);
    expect(r.results[2].passed).toBe(false);
    expect(r.results[2].message).toContain("required");
  });

  it("báo attribute sai giá trị, kèm giá trị người dùng viết", () => {
    const r = gradeCode('<input type="email" required placeholder="email">', inputReqs);
    expect(r.passed).toBe(false);
    expect(r.results[3].passed).toBe(false);
    expect(r.results[3].message).toContain('"email"');
    expect(r.results[3].message).toContain('"ten@email.com"');
  });

  it("báo sai tên thẻ", () => {
    const r = gradeCode('<textarea type="email"></textarea>', inputReqs);
    expect(r.results[0].passed).toBe(false);
    expect(r.results[0].message).toContain("input");
  });

  it("chấm cấu trúc nhiều thẻ đúng", () => {
    const r = gradeCode("<ul>\n  <li>Táo</li>\n  <li>Cam</li>\n</ul>", listReqs);
    expect(r.passed).toBe(true);
  });

  it("báo thiếu thẻ con", () => {
    const r = gradeCode("<ul><li>Táo</li></ul>", listReqs);
    expect(r.passed).toBe(false);
    expect(r.results[1].passed).toBe(false);
  });

  it("báo sai nội dung text", () => {
    const r = gradeCode("<ul><li>Ổi</li><li>Cam</li></ul>", listReqs);
    expect(r.results[2].passed).toBe(false);
    expect(r.results[2].message).toContain("Táo");
  });

  it("input không có thẻ nào → parseError", () => {
    const r = gradeCode("xin chào", inputReqs);
    expect(r.passed).toBe(false);
    expect(r.parseError).toBe(true);
  });
});

describe("gradeFillBlank", () => {
  it("đáp án đúng", () => {
    expect(gradeFillBlank("a", "a").passed).toBe(true);
  });
  it("chấp nhận hoa/thường và khoảng trắng", () => {
    expect(gradeFillBlank("  A ", "a").passed).toBe(true);
  });
  it("chấp nhận người dùng gõ kèm ngoặc nhọn", () => {
    expect(gradeFillBlank("<a>", "a").passed).toBe(true);
  });
  it("đáp án sai", () => {
    expect(gradeFillBlank("b", "a").passed).toBe(false);
  });
  it("input rỗng không pass", () => {
    expect(gradeFillBlank("", "a").passed).toBe(false);
  });
});
