import type { GradeResult, RequirementResult } from "./types";
import { gradeJsStatic } from "./grade-js";
import type { JsStaticRequirement } from "./js-types";
import {
  isRenderRequirement,
  type ReactRenderRequirement,
  type ReactRenderOutput,
  type ReactRequirement,
} from "./react-types";

const normHtml = (s: string) => s.replace(/\s+/g, " ").trim();

// So một render requirement với output thô client gửi về. KHÔNG render gì ở đây.
function checkRender(req: ReactRenderRequirement, out: ReactRenderOutput | undefined): RequirementResult {
  if (!out) return { passed: false, message: req.message ?? "Chưa render được component" };
  if ("error" in out) return { passed: false, message: out.error };
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

/**
 * Chấm câu WRITE_JSX. Phần TĨNH (contains/notContains/construct) chấm bằng kiểm tra mẫu
 * trên mã nguồn. Phần RENDER so với `renderOutputs` mà CLIENT đã render trong Web Worker —
 * server KHÔNG bao giờ transpile/render code người học.
 *
 * `renderOutputs` xếp theo đúng thứ tự các render requirement (xem `toReactSpecs`).
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

  let renderIdx = 0;
  const results = requirements.map((req): RequirementResult => {
    if (isRenderRequirement(req)) {
      return checkRender(req, renderOutputs?.[renderIdx++]);
    }
    // Tĩnh — tái dùng bộ chấm của WRITE_JS cho từng requirement.
    return gradeJsStatic(code, [req as JsStaticRequirement]).results[0];
  });

  return { passed: results.every((r) => r.passed), results };
}

/** Chấm chỉ phần TĨNH (render requirement coi như chờ render). Dùng cho test nội dung. */
export function gradeReactStatic(code: string, requirements: ReactRequirement[]): GradeResult {
  const staticReqs = requirements.filter((r) => !isRenderRequirement(r)) as JsStaticRequirement[];
  return gradeJsStatic(code, staticReqs);
}
