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
