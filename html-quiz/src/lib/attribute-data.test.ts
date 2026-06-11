import { describe, expect, it } from "vitest";
import { GLOBAL_ATTRIBUTES, TAG_ATTRIBUTES } from "./attribute-data";

// Danh sách 60 thẻ trong seed — kho thuộc tính phải phủ đủ
const SEED_TAGS = [
  "h1", "p", "strong", "em", "br", "a", "img", "ul", "ol", "li",
  "table", "tr", "td", "th", "form", "input", "label", "button", "textarea", "select",
  "h2", "h3", "span", "blockquote", "code", "pre", "hr", "mark", "sub", "sup",
  "video", "audio", "source", "figure", "figcaption", "dl", "dt", "dd",
  "thead", "tbody", "tfoot", "caption", "option", "fieldset", "legend",
  "html", "head", "body", "title", "meta", "div", "link", "script",
  "header", "nav", "main", "section", "article", "aside", "footer",
];

describe("attribute-data", () => {
  it("phủ đủ 60 thẻ của seed, không thừa không thiếu", () => {
    const tags = TAG_ATTRIBUTES.map((t) => t.tag);
    expect(new Set(tags).size).toBe(tags.length); // không trùng
    expect([...tags].sort()).toEqual([...SEED_TAGS].sort());
  });

  it("mỗi thuộc tính có đủ trường nội dung và mức quan trọng hợp lệ", () => {
    const valid = new Set(["essential", "common", "rare"]);
    for (const entry of [...TAG_ATTRIBUTES, { tag: "_global", attrs: GLOBAL_ATTRIBUTES }]) {
      for (const a of entry.attrs) {
        expect(valid.has(a.importance), `${entry.tag}.${a.name} importance`).toBe(true);
        expect(a.name.length, `${entry.tag} attr name`).toBeGreaterThan(0);
        expect(a.desc.length, `${entry.tag}.${a.name} desc`).toBeGreaterThan(0);
        expect(a.when.length, `${entry.tag}.${a.name} when`).toBeGreaterThan(0);
        expect(a.example.length, `${entry.tag}.${a.name} example`).toBeGreaterThan(0);
      }
    }
  });

  it("thẻ không có thuộc tính riêng phải có ghi chú giải thích", () => {
    for (const entry of TAG_ATTRIBUTES) {
      if (entry.attrs.length === 0) {
        expect(entry.note, `${entry.tag} cần note khi attrs rỗng`).toBeTruthy();
      }
    }
  });

  it("thuộc tính chung có đủ 3 mức quan trọng", () => {
    const levels = new Set(GLOBAL_ATTRIBUTES.map((a) => a.importance));
    expect(levels).toEqual(new Set(["essential", "common", "rare"]));
  });
});
