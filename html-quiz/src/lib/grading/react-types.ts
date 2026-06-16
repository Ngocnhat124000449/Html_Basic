// Requirement cho câu WRITE_JSX (React component).
//
// Hai nhóm:
// - TĨNH: tái dùng JsStaticRequirement (contains/notContains/construct) trên MÃ NGUỒN.
// - RENDER: client transpile JSX + render component ra HTML trong Web Worker rồi so
//   với htmlEquals/htmlContains. Server KHÔNG bao giờ tự render code người học.
import type { JsStaticRequirement } from "./js-types";

export type ReactScalar = string | number | boolean | null;

// Render component `component` với `props`, so output HTML tĩnh (renderToStaticMarkup).
export type ReactRenderRequirement = {
  type: "renders";
  component: string;
  props?: Record<string, ReactScalar>;
  htmlEquals?: string;
  htmlContains?: string;
  message?: string;
};

export type ReactRequirement = JsStaticRequirement | ReactRenderRequirement;

export function isRenderRequirement(r: ReactRequirement): r is ReactRenderRequirement {
  return r.type === "renders";
}

// Spec gửi client để RENDER (không kèm htmlEquals/htmlContains — đáp án ở lại server).
export type ReactRenderSpec = { component: string; props?: Record<string, ReactScalar> };

// Kết quả thô client gửi về sau khi render (server so với htmlEquals/htmlContains).
export type ReactRenderOutput = { html: string } | { error: string };

/** Rút các render requirement (theo đúng thứ tự) thành spec an toàn gửi client. */
export function toReactSpecs(requirements: ReactRequirement[]): ReactRenderSpec[] {
  return requirements
    .filter(isRenderRequirement)
    .map((r) => ({ component: r.component, props: r.props }));
}
