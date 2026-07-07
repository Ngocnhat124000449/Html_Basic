// Thứ tự lộ trình các khóa — xác định "khóa nền" khi xen kẽ ôn cũ vào học mới.
export const TRACK_ORDER = ["html", "css", "js", "dsa", "git", "react", "project"] as const;

// Số thẻ ôn nền tối đa chèn đầu mỗi phiên học mới.
export const WARMUP_CAP = 8;

// Khóa nền của X = mọi khóa đứng trước X trong TRACK_ORDER, kèm chính X.
// Track lạ (không có trong danh sách) → chỉ trả về chính nó (an toàn).
export function foundationTracks(track: string): string[] {
  const i = TRACK_ORDER.indexOf(track as (typeof TRACK_ORDER)[number]);
  if (i < 0) return [track];
  return TRACK_ORDER.slice(0, i + 1);
}

// G3 — ngưỡng % thẻ ĐÃ HỌC mỗi khóa nền phải đạt để mở học mới khóa sau.
export const GATE_THRESHOLD = 0.8;

// Thống kê mỗi khóa: đã học (có UserTagProgress) / tổng số thẻ.
export type TrackStats = Record<string, { learned: number; total: number }>;

// Thông tin gate khi bị chặn — khóa nền SỚM NHẤT chưa đạt + số liệu cho UI.
export type GateInfo = { blockedBy: string; learned: number; need: number; total: number };

// Tên hiển thị khóa cho UI (màn chặn, chip 🔒, nút trang track).
export const TRACK_LABEL: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  dsa: "Cấu trúc DL & Giải thuật",
  git: "Git & Công cụ",
  react: "React",
  project: "Dự án — ghép cả trang",
};

// Khóa track có được HỌC MỚI không: mọi khóa đứng trước trong TRACK_ORDER phải
// đã học ≥ GATE_THRESHOLD. Đạt hết → null; khóa đầu/track lạ → null (an toàn);
// khóa nền 0 thẻ hoặc thiếu stats → coi như đạt.
export function gateFor(track: string, stats: TrackStats): GateInfo | null {
  const i = TRACK_ORDER.indexOf(track as (typeof TRACK_ORDER)[number]);
  if (i < 0) return null;
  for (const t of TRACK_ORDER.slice(0, i)) {
    const s = stats[t];
    if (!s || s.total <= 0) continue;
    const need = Math.ceil(s.total * GATE_THRESHOLD);
    if (s.learned < need) return { blockedBy: t, learned: s.learned, need, total: s.total };
  }
  return null;
}
