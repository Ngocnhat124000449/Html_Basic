import { describe, expect, it } from "vitest";
import { gradeJs, gradeJsStatic, hasRunRequirement } from "./grade-js";
import { toRunSpecs, type JsRequirement } from "./js-types";

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

describe("gradeJs — so với runOutputs (returns)", () => {
  const reqs: JsRequirement[] = [
    { type: "contains", text: "function double" },
    { type: "returns", call: "double(5)", equals: 10 },
  ];
  const code = "function double(n){ return n*2 }";

  it("đậu khi output đúng giá trị", () => {
    const out = gradeJs(code, reqs, [{ value: 10 }]);
    expect(out.results[1].passed).toBe(true);
    expect(out.passed).toBe(true);
  });

  it("rớt khi output sai giá trị, thông báo nêu kỳ vọng", () => {
    const out = gradeJs(code, reqs, [{ value: 7 }]);
    expect(out.results[1].passed).toBe(false);
    expect(out.results[1].message).toContain("10");
    expect(out.passed).toBe(false);
  });

  it("rớt khi worker báo lỗi", () => {
    const out = gradeJs(code, reqs, [{ error: "Lỗi cú pháp: ..." }]);
    expect(out.results[1].passed).toBe(false);
    expect(out.results[1].message).toContain("Lỗi");
  });

  it("thiếu runOutputs → run requirement chưa đạt (không tự chạy)", () => {
    const out = gradeJs(code, reqs);
    expect(out.results[0].passed).toBe(true); // static vẫn chấm
    expect(out.results[1].passed).toBe(false);
  });
});

describe("gradeJs — so với runOutputs (logs)", () => {
  const reqs: JsRequirement[] = [{ type: "logs", equals: "Xin chào" }];

  it("đậu khi log khớp (khoan dung khoảng trắng cuối)", () => {
    expect(gradeJs('console.log("Xin chào")', reqs, [{ logs: "Xin chào\n" }]).passed).toBe(true);
  });

  it("rớt khi log khác", () => {
    expect(gradeJs('console.log("Hello")', reqs, [{ logs: "Hello" }]).passed).toBe(false);
  });
});

describe("gradeJs — nhiều run requirement xếp đúng thứ tự", () => {
  const reqs: JsRequirement[] = [
    { type: "contains", text: "function f" },
    { type: "returns", call: "f(1)", equals: 1 },
    { type: "returns", call: "f(2)", equals: 4 },
  ];
  it("output[0]→req returns đầu, output[1]→req returns sau", () => {
    const out = gradeJs("function f(n){return n*n}", reqs, [{ value: 1 }, { value: 4 }]);
    expect(out.passed).toBe(true);
  });
  it("toRunSpecs giữ đúng số lượng & thứ tự, không lộ equals", () => {
    const specs = toRunSpecs(reqs);
    expect(specs).toHaveLength(2);
    expect(specs[0]).toEqual({ kind: "returns", call: "f(1)" });
    expect(JSON.stringify(specs)).not.toContain("equals");
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
