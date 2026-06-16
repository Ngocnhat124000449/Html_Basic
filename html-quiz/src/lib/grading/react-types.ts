// Requirement cho câu WRITE_JSX (React component).
//
// Ba nhóm:
// - TĨNH: tái dùng JsStaticRequirement (contains/notContains/construct) trên MÃ NGUỒN.
// - RENDER: client render component ra HTML tĩnh (renderToStaticMarkup) rồi so HTML.
// - INTERACT: client render bằng react-test-renderer, thực hiện click/onChange theo
//   kịch bản rồi đọc text hiển thị (kiểm hành vi state/sự kiện).
// Server KHÔNG bao giờ tự render/chạy code người học.
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

// Một hành động trên cây đã render: click nút thứ N, hoặc đổi giá trị input thứ N.
export type ReactInteractAction =
  | { click: number }
  | { change: number; value: string };

// Render bằng react-test-renderer, chạy `actions` theo thứ tự rồi so TEXT hiển thị.
export type ReactInteractRequirement = {
  type: "interacts";
  component: string;
  props?: Record<string, ReactScalar>;
  actions: ReactInteractAction[];
  textEquals?: string;
  textContains?: string;
  message?: string;
};

export type ReactRunRequirement = ReactRenderRequirement | ReactInteractRequirement;
export type ReactRequirement = JsStaticRequirement | ReactRunRequirement;

export function isRenderRequirement(r: ReactRequirement): r is ReactRenderRequirement {
  return r.type === "renders";
}
export function isInteractRequirement(r: ReactRequirement): r is ReactInteractRequirement {
  return r.type === "interacts";
}
export function isRunRequirement(r: ReactRequirement): r is ReactRunRequirement {
  return r.type === "renders" || r.type === "interacts";
}

// Spec gửi client để CHẠY (không kèm htmlEquals/textEquals — đáp án ở lại server).
export type ReactSpec =
  | { kind: "render"; component: string; props?: Record<string, ReactScalar> }
  | {
      kind: "interact";
      component: string;
      props?: Record<string, ReactScalar>;
      actions: ReactInteractAction[];
    };

// Kết quả thô client gửi về (server so với htmlEquals/htmlContains/textEquals/textContains).
export type ReactRenderOutput = { html: string } | { text: string } | { error: string };

/** Rút các run requirement (theo đúng thứ tự) thành spec an toàn gửi client. */
export function toReactSpecs(requirements: ReactRequirement[]): ReactSpec[] {
  return requirements.filter(isRunRequirement).map((r) =>
    r.type === "renders"
      ? { kind: "render" as const, component: r.component, props: r.props }
      : { kind: "interact" as const, component: r.component, props: r.props, actions: r.actions }
  );
}
