import { describe, expect, it } from "vitest";
import { gradeJsStatic, hasRunRequirement } from "./grade-js";
import type { JsRequirement } from "./js-types";

describe("gradeJsStatic — contains", () => {
  const reqs: JsRequirement[] = [{ type: "contains", text: "const" }];

  it("đậu khi code chứa chuỗi", () => {
    expect(gradeJsStatic("const x = 1;", reqs).passed).toBe(true);
  });

  it("khoan dung khoảng trắng", () => {
    expect(gradeJsStatic("const    x=1", [{ type: "contains", text: "const x" }]).passed).toBe(true);
  });

  it("rớt khi thiếu", () => {
    expect(gradeJsStatic("let x = 1;", reqs).passed).toBe(false);
  });

  it("rớt khi code rỗng", () => {
    const out = gradeJsStatic("   ", reqs);
    expect(out.passed).toBe(false);
    expect(out.results[0].message).toContain("chưa viết");
  });
});

describe("gradeJsStatic — notContains (cấm)", () => {
  const reqs: JsRequirement[] = [
    { type: "notContains", text: "var", message: "Không dùng var, hãy dùng let/const" },
  ];

  it("đậu khi không chứa từ cấm", () => {
    expect(gradeJsStatic("const x = 1;", reqs).passed).toBe(true);
  });

  it("rớt khi chứa từ cấm", () => {
    expect(gradeJsStatic("var x = 1;", reqs).passed).toBe(false);
  });

  it("không tính từ cấm nằm trong chuỗi/comment", () => {
    expect(gradeJsStatic('const s = "var"; // var', reqs).passed).toBe(true);
  });
});

describe("gradeJsStatic — construct", () => {
  it("nhận arrow function", () => {
    expect(gradeJsStatic("const f = (n) => n * 2;", [{ type: "construct", construct: "arrow" }]).passed).toBe(true);
    expect(gradeJsStatic("function f(n){return n}", [{ type: "construct", construct: "arrow" }]).passed).toBe(false);
  });

  it("nhận .map()", () => {
    expect(gradeJsStatic("arr.map(x => x)", [{ type: "construct", construct: "map" }]).passed).toBe(true);
    expect(gradeJsStatic("arr.filter(x => x)", [{ type: "construct", construct: "map" }]).passed).toBe(false);
  });

  it("nhận addEventListener", () => {
    expect(
      gradeJsStatic('btn.addEventListener("click", f)', [
        { type: "construct", construct: "addEventListener" },
      ]).passed
    ).toBe(true);
  });

  it("nhận template literal", () => {
    expect(
      gradeJsStatic("const s = `Xin chào ${ten}`;", [{ type: "construct", construct: "template" }])
        .passed
    ).toBe(true);
    expect(
      gradeJsStatic('const s = "Xin chào";', [{ type: "construct", construct: "template" }]).passed
    ).toBe(false);
  });

  it("nhận try...catch", () => {
    expect(
      gradeJsStatic("try { f() } catch (e) { console.log(e) }", [
        { type: "construct", construct: "tryCatch" },
      ]).passed
    ).toBe(true);
  });

  it("nhận destructuring", () => {
    expect(
      gradeJsStatic("const { a, b } = obj;", [{ type: "construct", construct: "destructure" }])
        .passed
    ).toBe(true);
    expect(
      gradeJsStatic("const [x, y] = arr;", [{ type: "construct", construct: "destructure" }]).passed
    ).toBe(true);
  });

  it("từ khóa dùng \\b — không khớp nhầm trong tên biến", () => {
    // "format" chứa "for" nhưng không phải vòng for
    expect(
      gradeJsStatic("const format = 1;", [{ type: "construct", construct: "for" }]).passed
    ).toBe(false);
  });
});

describe("gradeJsStatic — run requirement (chờ client)", () => {
  const reqs: JsRequirement[] = [
    { type: "contains", text: "function double" },
    { type: "returns", call: "double(5)", equals: 10 },
  ];

  it("hasRunRequirement nhận diện đúng", () => {
    expect(hasRunRequirement(reqs)).toBe(true);
    expect(hasRunRequirement([{ type: "contains", text: "x" }])).toBe(false);
  });

  it("phần static vẫn chấm, phần run để client xử lý (passed=false tạm)", () => {
    const out = gradeJsStatic("function double(n){ return n*2 }", reqs);
    expect(out.results[0].passed).toBe(true); // contains
    expect(out.results[1].passed).toBe(false); // returns — chờ chạy
    expect(out.passed).toBe(false);
  });
});

describe("gradeJsStatic — tổng hợp", () => {
  it("đậu khi mọi requirement static đều đạt", () => {
    const reqs: JsRequirement[] = [
      { type: "construct", construct: "const" },
      { type: "construct", construct: "arrow" },
      { type: "notContains", text: "var", message: "Không dùng var" },
    ];
    expect(gradeJsStatic("const f = x => x + 1;", reqs).passed).toBe(true);
  });
});
