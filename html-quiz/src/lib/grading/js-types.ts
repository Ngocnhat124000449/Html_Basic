// Requirement cho câu WRITE_JS.
//
// Hai nhóm:
// - TĨNH (static): kiểm tra mẫu trên mã nguồn — an toàn, chạy được cả server lẫn client.
// - ĐỘNG (run): chạy thật code rồi so kết quả — CHỈ chạy client-side trong Web Worker
//   (cô lập, không chạm server) để tránh eval mã không tin cậy trên máy chủ.

// Cấu trúc JS kiểm tra được — mỗi tên ứng với MỘT regex CỐ ĐỊNH trong grade-js.ts
// (không dùng regex động để tránh ReDoS từ pattern tùy ý).
export type JsConstruct =
  | "arrow" // hàm mũi tên =>
  | "const" // khai báo const
  | "let" // khai báo let
  | "function" // từ khóa function
  | "for" // vòng for
  | "while" // vòng while
  | "if" // câu if
  | "template" // template literal `...${}`
  | "map" // .map(
  | "filter" // .filter(
  | "reduce" // .reduce(
  | "forEach" // .forEach(
  | "find" // .find(
  | "addEventListener" // .addEventListener(
  | "querySelector" // querySelector / querySelectorAll
  | "async" // async
  | "await" // await
  | "promise" // new Promise / .then(
  | "tryCatch" // try { } catch
  | "destructure" // gán phá vỡ { } = hoặc [ ] =
  | "spread"; // ...

export type JsStaticRequirement =
  | { type: "contains"; text: string; message?: string }
  | { type: "notContains"; text: string; message: string }
  | { type: "construct"; construct: JsConstruct; message?: string };

export type JsScalar = string | number | boolean | null;

export type JsRunRequirement =
  // Sau khi nạp code người học, đánh giá biểu thức `call` và so sánh === với `equals`.
  // Ví dụ: code định nghĩa `function double(n){...}`, call = "double(5)", equals = 10.
  | { type: "returns"; call: string; equals: JsScalar; message?: string }
  // So output console.log (nối bằng \n) sau khi chạy code (+ `call` nếu có).
  | { type: "logs"; call?: string; equals: string; message?: string };

export type JsRequirement = JsStaticRequirement | JsRunRequirement;

export function isRunRequirement(r: JsRequirement): r is JsRunRequirement {
  return r.type === "returns" || r.type === "logs";
}

// Mô tả gửi cho client để CHẠY (không kèm `equals` — đáp án ở lại server).
// Client nạp code người học rồi: returns → eval `call`; logs → chạy code (+`call`) bắt console.log.
export type JsRunSpec = { kind: "returns" | "logs"; call?: string };

// Kết quả thô client gửi về sau khi chạy (chưa biết đúng/sai — server so với `equals`).
export type JsRunOutput =
  | { value: JsScalar } // returns: giá trị trả về (đã chuẩn hóa về scalar)
  | { logs: string } // logs: output console.log nối bằng \n
  | { error: string }; // lỗi cú pháp / runtime / timeout

/** Rút các run requirement (theo đúng thứ tự) thành spec an toàn để gửi client. */
export function toRunSpecs(requirements: JsRequirement[]): JsRunSpec[] {
  return requirements
    .filter(isRunRequirement)
    .map((r) => ({ kind: r.type, call: r.call }));
}
