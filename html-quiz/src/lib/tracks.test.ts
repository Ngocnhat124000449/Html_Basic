import { describe, expect, it } from "vitest";
import {
  TRACK_ORDER,
  foundationTracks,
  WARMUP_CAP,
  GATE_THRESHOLD,
  gateFor,
  TRACK_LABEL,
  htmlTagLabel,
} from "./tracks";

describe("htmlTagLabel", () => {
  it("tên thẻ thật bọc <>", () => {
    expect(htmlTagLabel("h1")).toBe("<h1>");
    expect(htmlTagLabel("figcaption")).toBe("<figcaption>");
  });
  it("tên khái niệm (có khoảng trắng/ký tự ngoài a-z0-9) hiện trần", () => {
    expect(htmlTagLabel("trang web & trình duyệt")).toBe("trang web & trình duyệt");
    expect(htmlTagLabel("file .html")).toBe("file .html");
    expect(htmlTagLabel("khung trang tối thiểu")).toBe("khung trang tối thiểu");
  });
});

describe("foundationTracks", () => {
  it("css gồm html + css", () => {
    expect(foundationTracks("css")).toEqual(["html", "css"]);
  });
  it("html chỉ gồm chính nó", () => {
    expect(foundationTracks("html")).toEqual(["html"]);
  });
  it("react gồm mọi khóa từ html tới react", () => {
    expect(foundationTracks("react")).toEqual(["html", "css", "js", "dsa", "git", "react"]);
  });
  it("track lạ trả về chính nó", () => {
    expect(foundationTracks("khac")).toEqual(["khac"]);
  });
});

describe("gateFor", () => {
  it("html (khóa đầu) không bao giờ bị chặn", () => {
    expect(gateFor("html", {})).toBeNull();
  });
  it("css bị chặn khi html chưa đạt 80%", () => {
    expect(gateFor("css", { html: { learned: 47, total: 60 } })).toEqual({
      blockedBy: "html",
      learned: 47,
      need: 48,
      total: 60,
    });
  });
  it("đạt đúng biên 80% thì qua (need dùng ceil)", () => {
    expect(gateFor("css", { html: { learned: 48, total: 60 } })).toBeNull();
    // 89 * 0.8 = 71.2 → cần 72
    expect(
      gateFor("js", { html: { learned: 60, total: 60 }, css: { learned: 71, total: 89 } })
    ).toEqual({ blockedBy: "css", learned: 71, need: 72, total: 89 });
  });
  it("trả khóa nền SỚM NHẤT chưa đạt", () => {
    const stats = { html: { learned: 0, total: 60 }, css: { learned: 0, total: 89 } };
    expect(gateFor("react", stats)?.blockedBy).toBe("html");
  });
  it("khóa nền 0 thẻ hoặc thiếu stats coi như đạt", () => {
    expect(gateFor("css", { html: { learned: 0, total: 0 } })).toBeNull();
    expect(gateFor("css", {})).toBeNull();
  });
  it("track lạ không bị chặn", () => {
    expect(gateFor("khac", { html: { learned: 0, total: 60 } })).toBeNull();
  });
  it("GATE_THRESHOLD = 0.8 và TRACK_LABEL đủ 7 khóa", () => {
    expect(GATE_THRESHOLD).toBe(0.8);
    for (const t of TRACK_ORDER) expect(TRACK_LABEL[t]).toBeTruthy();
  });
});

describe("hằng", () => {
  it("WARMUP_CAP = 8", () => expect(WARMUP_CAP).toBe(8));
  it("TRACK_ORDER mở đầu html, kết project", () => {
    expect(TRACK_ORDER[0]).toBe("html");
    expect(TRACK_ORDER[TRACK_ORDER.length - 1]).toBe("project");
  });
});
