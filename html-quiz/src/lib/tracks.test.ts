import { describe, expect, it } from "vitest";
import { TRACK_ORDER, foundationTracks, WARMUP_CAP } from "./tracks";

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

describe("hằng", () => {
  it("WARMUP_CAP = 8", () => expect(WARMUP_CAP).toBe(8));
  it("TRACK_ORDER mở đầu html, kết project", () => {
    expect(TRACK_ORDER[0]).toBe("html");
    expect(TRACK_ORDER[TRACK_ORDER.length - 1]).toBe("project");
  });
});
