// Chạy code JS của người học trong Web Worker (luồng riêng, cô lập) — CHỈ client.
//
// Vì sao Web Worker:
// - Cô lập khỏi DOM/biến của trang; có thể terminate() nếu code lặp vô hạn (timeout).
// - Phía client KHÔNG có bí mật (DATABASE_URL...) nên eval ở đây an toàn; tuyệt đối
//   KHÔNG chạy code này trên server.
//
// Worker nhận { code, specs } và trả { outputs }. Mỗi spec chạy code MỘT lần mới
// (scope riêng) để các spec không ảnh hưởng lẫn nhau.

import type { JsRunSpec, JsRunOutput } from "./grading/js-types";

const TIMEOUT_MS = 1500;

// Mã worker dưới dạng chuỗi — nạp qua Blob URL nên không phụ thuộc cấu hình bundler.
// Lưu ý: `new Function(..., code + "; return eval(expr)")` tạo eval TRỰC TIẾP trong
// phạm vi đã nạp code → thấy được hàm/biến người học khai báo.
const WORKER_SRC = `
self.onmessage = function (e) {
  var code = e.data.code;
  var specs = e.data.specs || [];
  var logs = [];

  function toStr(v) {
    if (typeof v === "string") return v;
    if (v === undefined) return "undefined";
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }
  // Bắt console.log/info/warn/error → gom vào logs
  var cap = function () {
    var parts = [];
    for (var i = 0; i < arguments.length; i++) parts.push(toStr(arguments[i]));
    logs.push(parts.join(" "));
  };
  self.console = { log: cap, info: cap, warn: cap, error: cap, debug: cap };

  function scalar(v) {
    if (v === null) return { ok: true, value: null };
    var t = typeof v;
    if (t === "number" || t === "string" || t === "boolean") return { ok: true, value: v };
    return { ok: false };
  }

  function runOne(spec) {
    logs.length = 0;
    var runner;
    try {
      // expr rỗng → chỉ chạy code; có expr → trả về eval(expr) trong scope của code
      runner = new Function("__expr", code + "\\n;return __expr ? eval(__expr) : undefined;");
    } catch (err) {
      return { error: "Lỗi cú pháp: " + (err && err.message ? err.message : String(err)) };
    }
    var ret;
    try {
      ret = runner(spec.call || "");
    } catch (err) {
      return { error: "Lỗi khi chạy: " + (err && err.message ? err.message : String(err)) };
    }
    if (spec.kind === "returns") {
      var s = scalar(ret);
      if (!s.ok) return { error: "Cần trả về số/chuỗi/boolean/null (nhận " + typeof ret + ")" };
      return { value: s.value };
    }
    return { logs: logs.join("\\n") };
  }

  var outputs = specs.map(runOne);
  self.postMessage({ outputs: outputs });
};
`;

/**
 * Chạy `specs` trên `code` trong Web Worker. Luôn trả về đúng `specs.length` output.
 * Nếu hết giờ (vòng lặp vô hạn) hoặc worker lỗi → tất cả output là {error}.
 */
export function runJsSpecs(code: string, specs: JsRunSpec[]): Promise<JsRunOutput[]> {
  if (specs.length === 0) return Promise.resolve([]);

  return new Promise((resolve) => {
    let settled = false;
    let url: string | null = null;
    let worker: Worker | null = null;

    const finish = (outputs: JsRunOutput[]) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        worker?.terminate();
      } catch {
        /* ignore */
      }
      if (url) URL.revokeObjectURL(url);
      resolve(outputs);
    };

    const allError = (msg: string) => finish(specs.map(() => ({ error: msg })));

    const timer = setTimeout(
      () => allError("Hết thời gian chạy (1,5s) — có thể vòng lặp không bao giờ dừng?"),
      TIMEOUT_MS
    );

    try {
      url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      worker = new Worker(url);
      worker.onmessage = (ev: MessageEvent<{ outputs: JsRunOutput[] }>) => {
        const outputs = ev.data?.outputs ?? [];
        // Bảo đảm độ dài khớp specs
        finish(specs.map((_, i) => outputs[i] ?? { error: "Không nhận được kết quả" }));
      };
      worker.onerror = () => allError("Không chạy được code trong trình duyệt");
      worker.postMessage({ code, specs });
    } catch {
      allError("Trình duyệt không hỗ trợ chạy thử (Web Worker)");
    }
  });
}
