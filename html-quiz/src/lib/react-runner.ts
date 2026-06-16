// Render component React của người học trong Web Worker (luồng riêng, cô lập) — CHỈ client.
//
// Vì sao Web Worker:
// - Cô lập khỏi DOM/biến của trang; có thể terminate() nếu code treo (timeout).
// - Phía client KHÔNG có bí mật nên transpile + render ở đây an toàn; TUYỆT ĐỐI
//   không chạy code này trên server.
//
// React 19 đã bỏ bản UMD → worker nạp React 18 + react-dom server (legacy.browser) +
// @babel/standalone qua importScripts từ CDN (cache sau lần đầu). Đây CHỈ là hộp cát
// chấm điểm, độc lập với React 19 của app. Cần mạng lúc chạy thử.

import type { ReactRenderSpec, ReactRenderOutput } from "./grading/react-types";

// Lần đầu phải tải Babel (~3MB) nên cho timeout rộng hơn js-runner.
const TIMEOUT_MS = 8000;

const REACT_CDN = "https://unpkg.com/react@18.3.1/umd/react.production.min.js";
const REACT_DOM_SERVER_CDN =
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom-server-legacy.browser.production.min.js";
const BABEL_CDN = "https://unpkg.com/@babel/standalone@7.26.4/babel.min.js";

// Mã worker dưới dạng chuỗi — nạp qua Blob URL (không phụ thuộc bundler).
const WORKER_SRC = `
var __libsLoaded = false;
function ensureLibs() {
  if (__libsLoaded) return;
  importScripts(${JSON.stringify(REACT_CDN)}, ${JSON.stringify(REACT_DOM_SERVER_CDN)}, ${JSON.stringify(BABEL_CDN)});
  __libsLoaded = true;
}

self.onmessage = function (e) {
  var code = e.data.code;
  var specs = e.data.specs || [];

  function allError(msg) {
    self.postMessage({ outputs: specs.map(function () { return { error: msg }; }) });
  }
  function emsg(err) { return err && err.message ? err.message : String(err); }

  try {
    ensureLibs();
  } catch (err) {
    allError("Không tải được thư viện React để chạy thử (cần mạng) — " + emsg(err));
    return;
  }

  var transpiled;
  try {
    transpiled = Babel.transform(code, { presets: [["react", { runtime: "classic" }]] }).code;
  } catch (err) {
    allError("Lỗi cú pháp JSX: " + emsg(err));
    return;
  }

  // Nạp code đã transpile vào một scope, trả về hàm tra cứu component theo tên.
  // AN TOÀN: new Function/eval ở đây chạy CODE CỦA CHÍNH NGƯỜI HỌC trong Web Worker
  // cô lập (không DOM, không bí mật, terminate được), CHỈ phía client — giống js-runner.
  // KHÔNG nội suy chuỗi không tin cậy vào thân hàm (chỉ ghép code đã transpile của user);
  // __name là tên component do server cấu hình (literal trong đề), không phải input ngoài.
  var getComp;
  try {
    var factory = new Function(
      "React",
      transpiled + "\\n; return function (__name) { return eval(__name); };"
    );
    getComp = factory(self.React);
  } catch (err) {
    allError("Lỗi khi nạp component: " + emsg(err));
    return;
  }

  var outputs = specs.map(function (spec) {
    try {
      var Comp = getComp(spec.component);
      if (typeof Comp !== "function") {
        return { error: "Không tìm thấy component " + spec.component };
      }
      var el = self.React.createElement(Comp, spec.props || {});
      return { html: self.ReactDOMServer.renderToStaticMarkup(el) };
    } catch (err) {
      return { error: "Lỗi khi render " + spec.component + ": " + emsg(err) };
    }
  });
  self.postMessage({ outputs: outputs });
};
`;

/**
 * Transpile + render `specs` trên `code` trong Web Worker. Luôn trả về đúng
 * `specs.length` output. Nếu hết giờ hoặc worker lỗi → tất cả output là {error}.
 */
export function runReactSpecs(code: string, specs: ReactRenderSpec[]): Promise<ReactRenderOutput[]> {
  if (specs.length === 0) return Promise.resolve([]);

  return new Promise((resolve) => {
    let settled = false;
    let url: string | null = null;
    let worker: Worker | null = null;

    const finish = (outputs: ReactRenderOutput[]) => {
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
      () => allError("Hết thời gian chạy thử (8s) — kiểm tra lại code hoặc kết nối mạng?"),
      TIMEOUT_MS
    );

    try {
      url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      worker = new Worker(url);
      worker.onmessage = (ev: MessageEvent<{ outputs: ReactRenderOutput[] }>) => {
        const outputs = ev.data?.outputs ?? [];
        finish(specs.map((_, i) => outputs[i] ?? { error: "Không nhận được kết quả" }));
      };
      worker.onerror = () => allError("Không chạy được code trong trình duyệt");
      worker.postMessage({ code, specs });
    } catch {
      allError("Trình duyệt không hỗ trợ chạy thử (Web Worker)");
    }
  });
}
