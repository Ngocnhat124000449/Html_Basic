// Requirement cho câu WRITE_CSS — chấm theo rule { selector → khai báo }
export type CssRequirement =
  | { type: "selector"; value: string }
  | { type: "property"; selector: string; name: string }
  | { type: "value"; selector: string; name: string; value: string };
