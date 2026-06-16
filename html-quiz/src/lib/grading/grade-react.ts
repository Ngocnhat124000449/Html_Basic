import type { GradeResult, RequirementResult } from "./types";
import { gradeJsStatic } from "./grade-js";
import type { JsStaticRequirement } from "./js-types";
import {
  isRunRequirement,
  type ReactInteractRequirement,
  type ReactRenderRequirement,
  type ReactRenderOutput,
  type ReactRequirement,
} from "./react-types";

const normHtml = (s: string) => s.replace(/\s+/g, " ").trim();

// So một render requirement với output thô client gửi về. KHÔNG render gì ở đây.
function checkRender(req: ReactRenderRequirement, out: ReactRenderOutput | undefined): RequirementResult {
  if (!out) return { passed: false, message: req.message ?? "Chưa render được component" };
  if ("error" in out) return { passed: false, message: out.error };
  if (!("html" in out)) return { passed: false, message: req.message ?? "Không nhận được HTML" };
  const html = out.html;

  if (req.htmlEquals !== undefined) {
    const ok = normHtml(html) === normHtml(req.htmlEquals);
    return ok
      ? { passed: true, message: req.message ?? `Render đúng: ${req.htmlEquals}` }
      : { passed: false, message: `Cần render ra ${req.htmlEquals}, nhưng nhận ${html}` };
  }
  if (req.htmlContains !== undefined) {
    const ok = normHtml(html).includes(normHtml(req.htmlContains));
    return ok
      ? { passed: true, message: req.message ?? `Có chứa: ${req.htmlContains}` }
      : { passed: false, message: `Cần render chứa ${req.htmlContains}, nhưng nhận ${html}` };
  }
  return { passed: true, message: req.message ?? "Render OK" };
}

// So một interact requirement với output thô (text hiển thị sau khi chạy actions).
function checkInteract(req: ReactInteractRequirement, out: ReactRenderOutput | undefined): RequirementResult {
  if (!out) return { passed: false, message: req.message ?? "Chưa chạy được tương tác" };
  if ("error" in out) return { passed: false, message: out.error };
  if (!("text" in out)) return { passed: false, message: req.message ?? "Không đọc được nội dung" };
  const text = out.text;

  if (req.textEquals !== undefined) {
    const ok = normHtml(text) === normHtml(req.textEquals);
    return ok
      ? { passed: true, message: req.message ?? `Hiển thị đúng: ${req.textEquals}` }
      : { passed: false, message: `Cần hiển thị "${req.textEquals}", nhưng nhận "${text}"` };
  }
  if (req.textContains !== undefined) {
    const ok = normHtml(text).includes(normHtml(req.textContains));
    return ok
      ? { passed: true, message: req.message ?? `Có hiển thị: ${req.textContains}` }
      : { passed: false, message: `Cần hiển thị chứa "${req.textContains}", nhưng nhận "${text}"` };
  }
  return { passed: true, message: req.message ?? "Tương tác OK" };
}

/**
 * Chấm câu WRITE_JSX. Phần TĨNH chấm trên mã nguồn. Phần RENDER/INTERACT so với
 * `renderOutputs` mà CLIENT đã chạy trong Web Worker — server KHÔNG tự render/chạy.
 * `renderOutputs` xếp theo đúng thứ tự các run requirement (xem `toReactSpecs`).
 */
export function gradeReact(
  code: string,
  requirements: ReactRequirement[],
  renderOutputs?: ReactRenderOutput[]
): GradeResult {
  if (code.trim() === "") {
    return {
      passed: false,
      results: requirements.map(() => ({ passed: false, message: "Bạn chưa viết code" })),
    };
  }

  let runIdx = 0;
  const results = requirements.map((req): RequirementResult => {
    if (isRunRequirement(req)) {
      const out = renderOutputs?.[runIdx++];
      return req.type === "renders" ? checkRender(req, out) : checkInteract(req, out);
    }
    // Tĩnh — tái dùng bộ chấm của WRITE_JS cho từng requirement.
    return gradeJsStatic(code, [req as JsStaticRequirement]).results[0];
  });

  return { passed: results.every((r) => r.passed), results };
}

/** Chấm chỉ phần TĨNH (render/interact coi như chờ chạy). Dùng cho test nội dung. */
export function gradeReactStatic(code: string, requirements: ReactRequirement[]): GradeResult {
  const staticReqs = requirements.filter((r) => !isRunRequirement(r)) as JsStaticRequirement[];
  return gradeJsStatic(code, staticReqs);
}
