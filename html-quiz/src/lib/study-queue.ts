import type { ClientQuestion, SessionTag } from "./study-types";

// Một câu trong hàng đợi — kèm thẻ gốc để chấm gom theo thẻ + hiển thị tên.
export type QueueItem = { tag: SessionTag; q: ClientQuestion };

// HỌC MỚI: đi tuần tự theo thứ tự thẻ server trả về; trong mỗi thẻ xếp câu theo
// bậc tăng dần (1→2→3). KHÔNG xáo trộn.
export function buildLearnSequence(tags: SessionTag[]): QueueItem[] {
  const items: QueueItem[] = [];
  for (const tag of tags) {
    const sorted = [...tag.questions].sort((a, b) => a.tier - b.tier);
    for (const q of sorted) items.push({ tag, q });
  }
  return items;
}

// ÔN TẬP: gom phẳng mọi câu của mọi thẻ rồi xáo trộn (Fisher–Yates) — luyện nhận diện.
export function buildReviewQueue(tags: SessionTag[]): QueueItem[] {
  const items: QueueItem[] = [];
  for (const tag of tags) for (const q of tag.questions) items.push({ tag, q });
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
