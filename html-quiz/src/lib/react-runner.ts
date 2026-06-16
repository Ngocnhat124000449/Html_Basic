// Render / tương tác component React của người học trong Web Worker (cô lập) — CHỈ client.
//
// Vì sao Web Worker:
// - Cô lập khỏi DOM/biến của trang; có thể terminate() nếu code treo (timeout).
// - Phía client KHÔNG có bí mật nên transpile + render ở đây an toàn; TUYỆT ĐỐI
//   không chạy code này trên server.
//
// React 19 đã bỏ bản UMD → worker nạp React 18 + react-dom server (renderToStaticMarkup)
// + @babel/standalone; khi cần tương tác (interact) nạp thêm scheduler + scheduler mock
// + react-test-renderer (render không cần DOM, hỗ trợ hooks + act). Tất cả qua importScripts
// từ CDN (cache sau lần đầu). Đây CHỈ là hộp cát chấm điểm, độc lập React 19 của app.

import type { ReactSpec, ReactRenderOutput } from "./grading/react-types";

// Lần đầu phải tải Babel (~3MB) nên cho timeout rộng.
const TIMEOUT_MS = 9000;

const CDN = {
  react: "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
  domServer:
    "https://unpkg.com/react-dom@18.3.1/umd/react-dom-server-legacy.browser.production.min.js",
  babel: "https://unpkg.com/@babel/standalone@7.26.4/babel.min.js",
  scheduler: "https://unpkg.com/scheduler@0.23.2/umd/scheduler.production.min.js",
  schedulerMock:
    "https://unpkg.com/scheduler@0.23.2/umd/scheduler-unstable_mock.production.min.js",
  testRenderer:
    "https://unpkg.com/react-test-renderer@18.3.1/umd/react-test-renderer.production.min.js",
};

// Mã worker dưới dạng chuỗi — nạp qua Blob URL (không phụ thuộc bundler).
// Chỉ nội suy hằng URL (JSON.stringify), KHÔNG nội suy input không tin cậy.
const WORKER_SRC = `
var __base = false, __tr = false;
function ensureBase() {
  if (__base) return;
  importScripts(${JSON.stringify(CDN.react)}, ${JSON.stringify(CDN.domServer)}, ${JSON.stringify(CDN.babel)});
  __base = true;
}
function ensureTestRenderer() {
  if (__tr) return;
  importScripts(${JSON.stringify(CDN.scheduler)}, ${JSON.stringify(CDN.schedulerMock)}, ${JSON.stringify(CDN.testRenderer)});
  __tr = true;
}

function collectText(n) {
  if (n == null) return "";
  if (typeof n === "string") return n;
  if (typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(collectText).join("");
  if (n && n.children != null) return collectText(n.children);
  return "";
}

self.onmessage = function (e) {
  var code = e.data.code;
  var specs = e.data.specs || [];
  function allError(msg) {
    self.postMessage({ outputs: specs.map(function () { return { error: msg }; }) });
  }
  function emsg(err) { return err && err.message ? err.message : String(err); }

  try {
    ensureBase();
    if (specs.some(function (s) { return s.kind === "interact"; })) ensureTestRenderer();
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

  // AN TOÀN: new Function/eval chạy CODE CỦA CHÍNH NGƯỜI HỌC trong Web Worker cô lập
  // (không DOM, không bí mật, terminate được), CHỈ phía client — giống js-runner.
  // Chỉ ghép code đã transpile của user; __name là tên component do server cấu hình.
  // Tiêm sẵn các hook hay dùng vào scope để người học viết useState/useEffect trực
  // tiếp (worker không có hệ module nên KHÔNG dùng được 'import { useState }').
  var getComp;
  try {
    var factory = new Function(
      "React",
      "useState",
      "useEffect",
      transpiled + "\\n; return function (__name) { return eval(__name); };"
    );
    getComp = factory(self.React, self.React.useState, self.React.useEffect);
  } catch (err) {
    allError("Lỗi khi nạp component: " + emsg(err));
    return;
  }

  function doRender(spec) {
    var Comp = getComp(spec.component);
    if (typeof Comp !== "function") return { error: "Không tìm thấy component " + spec.component };
    var el = self.React.createElement(Comp, spec.props || {});
    return { html: self.ReactDOMServer.renderToStaticMarkup(el) };
  }

  function doInteract(spec) {
    var Comp = getComp(spec.component);
    if (typeof Comp !== "function") return { error: "Không tìm thấy component " + spec.component };
    var TR = self.ReactTestRenderer;
    var root;
    TR.act(function () {
      root = TR.create(self.React.createElement(Comp, spec.props || {}));
    });
    var actions = spec.actions || [];
    for (var i = 0; i < actions.length; i++) {
      var a = actions[i];
      if ("click" in a) {
        var btns = root.root.findAllByType("button");
        if (!btns[a.click]) return { error: "Không tìm thấy nút thứ " + (a.click + 1) };
        (function (h) { TR.act(function () { h.props.onClick(); }); })(btns[a.click]);
      } else if ("change" in a) {
        var inputs = root.root.findAllByType("input");
        if (!inputs[a.change]) return { error: "Không tìm thấy ô nhập thứ " + (a.change + 1) };
        (function (h, v) {
          TR.act(function () { h.props.onChange({ target: { value: v } }); });
        })(inputs[a.change], a.value);
      }
    }
    return { text: collectText(root.toJSON()) };
  }

  var outputs = specs.map(function (spec) {
    try {
      return spec.kind === "interact" ? doInteract(spec) : doRender(spec);
    } catch (err) {
      return { error: "Lỗi khi chạy " + spec.component + ": " + emsg(err) };
    }
  });
  self.postMessage({ outputs: outputs });
};
`;

/**
 * Transpile + render/tương tác `specs` trên `code` trong Web Worker. Luôn trả về
 * đúng `specs.length` output. Hết giờ hoặc lỗi → tất cả output là {error}.
 */
export function runReactSpecs(code: string, specs: ReactSpec[]): Promise<ReactRenderOutput[]> {
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
      () => allError("Hết thời gian chạy thử (9s) — kiểm tra lại code hoặc kết nối mạng?"),
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
