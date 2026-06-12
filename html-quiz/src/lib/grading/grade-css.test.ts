import { describe, expect, it } from "vitest";
import { gradeCss, parseCss } from "./grade-css";
import type { CssRequirement } from "./css-types";

describe("parseCss", () => {
  it("đọc được rule cơ bản", () => {
    const rules = parseCss("p { color: red; font-size: 16px; }");
    expect(rules).toHaveLength(1);
    expect(rules[0].selector).toBe("p");
    expect(rules[0].decls.get("color")).toBe("red");
    expect(rules[0].decls.get("font-size")).toBe("16px");
  });

  it("đọc nhiều rule và gộp rule trùng selector", () => {
    const rules = parseCss("p { color: red; } h1 { margin: 0; } p { padding: 4px; }");
    expect(rules).toHaveLength(2);
    expect(rules[0].decls.get("padding")).toBe("4px");
  });

  it("bỏ qua comment", () => {
    const rules = parseCss("/* chú thích { } */ p { color: blue; /* inline */ }");
    expect(rules[0].decls.get("color")).toBe("blue");
  });

  it("đọc được rule bên trong @media", () => {
    const rules = parseCss("@media (max-width: 600px) { .menu { display: none; } }");
    expect(rules).toHaveLength(1);
    expect(rules[0].selector).toBe(".menu");
    expect(rules[0].decls.get("display")).toBe("none");
  });

  it("trả mảng rỗng khi không phải CSS", () => {
    expect(parseCss("xin chào")).toHaveLength(0);
    expect(parseCss("")).toHaveLength(0);
  });

  it("không sập khi thiếu dấu ; cuối hoặc xuống dòng lộn xộn", () => {
    const rules = parseCss("p{\n  color:red\n}");
    expect(rules[0].decls.get("color")).toBe("red");
  });
});

describe("gradeCss — selector", () => {
  const reqs: CssRequirement[] = [{ type: "selector", value: ".card" }];

  it("đậu khi có rule đúng selector", () => {
    expect(gradeCss(".card { color: red; }", reqs).passed).toBe(true);
  });

  it("khoan dung khoảng trắng và hoa/thường trong selector", () => {
    expect(gradeCss("  .CARD  { color: red; }", reqs).passed).toBe(true);
  });

  it("khoan dung khoảng quanh tổ hợp >", () => {
    const r: CssRequirement[] = [{ type: "selector", value: "ul > li" }];
    expect(gradeCss("ul>li { color: red; }", r).passed).toBe(true);
    expect(gradeCss("ul   >   li { color: red; }", r).passed).toBe(true);
  });

  it("rớt khi sai selector và chỉ ra đang viết gì", () => {
    const out = gradeCss("#card { color: red; }", reqs);
    expect(out.passed).toBe(false);
    expect(out.results[0].message).toContain("#card");
  });
});

describe("gradeCss — property", () => {
  const reqs: CssRequirement[] = [{ type: "property", selector: "p", name: "color" }];

  it("đậu khi rule có thuộc tính", () => {
    expect(gradeCss("p { color: anything; }", reqs).passed).toBe(true);
  });

  it("rớt khi thiếu thuộc tính", () => {
    const out = gradeCss("p { font-size: 16px; }", reqs);
    expect(out.passed).toBe(false);
    expect(out.results[0].message).toContain("color");
  });

  it("rớt khi thiếu cả rule", () => {
    const out = gradeCss("h1 { color: red; }", reqs);
    expect(out.passed).toBe(false);
    expect(out.results[0].message).toContain('"p"');
  });
});

describe("gradeCss — value", () => {
  const req = (value: string): CssRequirement[] => [
    { type: "value", selector: "p", name: "color", value },
  ];

  it("đậu khi giá trị đúng", () => {
    expect(gradeCss("p { color: red; }", req("red")).passed).toBe(true);
  });

  it("khoan dung hoa/thường và khoảng trắng", () => {
    expect(gradeCss("p { COLOR :  RED ; }", req("red")).passed).toBe(true);
  });

  it("khoan dung quote trong font-family", () => {
    const r: CssRequirement[] = [
      { type: "value", selector: "p", name: "font-family", value: '"Be Vietnam Pro", sans-serif' },
    ];
    expect(gradeCss("p { font-family: Be Vietnam Pro,sans-serif; }", r).passed).toBe(true);
    expect(gradeCss("p { font-family: 'Be Vietnam Pro' , sans-serif; }", r).passed).toBe(true);
  });

  it("coi 0px = 0", () => {
    const r: CssRequirement[] = [{ type: "value", selector: "p", name: "margin", value: "0" }];
    expect(gradeCss("p { margin: 0px; }", r).passed).toBe(true);
    expect(gradeCss("p { margin: 0; }", r).passed).toBe(true);
  });

  it("không nhầm 10px thành 10", () => {
    const r: CssRequirement[] = [{ type: "value", selector: "p", name: "margin", value: "10px" }];
    expect(gradeCss("p { margin: 10px; }", r).passed).toBe(true);
    expect(gradeCss("p { margin: 10; }", r).passed).toBe(false);
  });

  it("coi #fff = #ffffff", () => {
    const r: CssRequirement[] = [{ type: "value", selector: "p", name: "color", value: "#fff" }];
    expect(gradeCss("p { color: #ffffff; }", r).passed).toBe(true);
    expect(gradeCss("p { color: #FFF; }", r).passed).toBe(true);
  });

  it("giá trị nhiều phần: gọn khoảng trắng quanh dấu phẩy", () => {
    const r: CssRequirement[] = [
      { type: "value", selector: ".box", name: "margin", value: "8px 16px" },
    ];
    expect(gradeCss(".box { margin:  8px   16px ; }", r).passed).toBe(true);
  });

  it("rớt khi sai giá trị, chỉ rõ bạn viết gì và cần gì", () => {
    const out = gradeCss("p { color: blue; }", req("red"));
    expect(out.passed).toBe(false);
    expect(out.results[0].message).toContain('"blue"');
    expect(out.results[0].message).toContain('"red"');
  });
});

describe("gradeCss — tổng hợp", () => {
  it("chấm nhiều requirement, đậu khi đủ hết", () => {
    const reqs: CssRequirement[] = [
      { type: "selector", value: ".card" },
      { type: "value", selector: ".card", name: "background", value: "#fff" },
      { type: "value", selector: ".card", name: "padding", value: "16px" },
    ];
    const ok = gradeCss(".card { background: #ffffff; padding: 16px; }", reqs);
    expect(ok.passed).toBe(true);
    expect(ok.results).toHaveLength(3);

    const miss = gradeCss(".card { background: #ffffff; }", reqs);
    expect(miss.passed).toBe(false);
    expect(miss.results.filter((r) => r.passed)).toHaveLength(2);
  });

  it("báo parseError khi input không phải CSS", () => {
    const out = gradeCss("đây không phải css", [{ type: "selector", value: "p" }]);
    expect(out.passed).toBe(false);
    expect(out.parseError).toBe(true);
    expect(out.results[0].message).toContain("cú pháp");
  });
});
