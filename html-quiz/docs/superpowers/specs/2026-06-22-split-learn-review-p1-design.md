# Tách luồng Học mới / Ôn tập — Giai đoạn 1

Ngày: 2026-06-22
Trạng thái: Đã duyệt thiết kế, chờ viết plan.

## Bối cảnh & vấn đề

Hiện `/study` **gộp** thẻ mới + thẻ đến hạn vào một hàng đợi rồi **xáo trộn**
(`buildQueue` Fisher–Yates trong `study/page.tsx`), hiển thị badge "🔀 Ôn trộn ·
thẻ nào đây?" và ẩn tên thẻ tới khi trả lời. Cách này tốt cho luyện phản xạ nhưng
**mâu thuẫn với học mới**: học khái niệm lần đầu mà bị xáo + ẩn tên thì chỉ là đoán,
không theo lộ trình.

Người dùng yêu cầu:
1. Tách riêng **Ôn tập** (chỉ ôn thẻ đã học) và **Học mới**.
2. Học mới **không xáo**, đi **tuần tự theo lộ trình** (`order`).
3. (Giai đoạn 2 — ngoài phạm vi spec này) CSS dựa nền HTML: gating liên-khóa +
   xen kẽ ôn kiến thức cũ vào buổi học mới.

Quyết định phạm vi: làm **2 giai đoạn**. Spec này là **Giai đoạn 1 (A+B)** — tách
UI + học tuần tự trong-khóa. Gating/xen kẽ liên-khóa (C) để Giai đoạn 2, brainstorm
spec riêng sau khi dùng thử G1.

Quyết định kiểu ôn: Giai đoạn 1 **giữ ôn xáo trộn như hiện tại** (tận dụng code sẵn
có, ít rủi ro). Liên quan: `[[srs-fsrs-scheduler]]`,
`docs/superpowers/specs/2026-06-15-reflex-shuffle-review-mode-design.md`.

## Tận dụng code sẵn có

`session/route.ts` đã phân biệt `due` (ôn) và `newTags` (`orderBy: order asc`) —
chỉ vô tình nối lại rồi để client xáo. `track=all`/`leech` đã là review-only thuần.
→ Giai đoạn 1 chủ yếu là **tách ý định ở route + rẽ nhánh UI**, KHÔNG migration schema.

## Hành vi hai chế độ

| | **Học mới** (`mode=learn`) | **Ôn tập** (`mode=review`) |
|---|---|---|
| Thẻ lấy | Chỉ thẻ **chưa học** của khóa, theo `order` | Chỉ thẻ **đã học, đến hạn** (`dueAt ≤ now`) |
| Thứ tự | Tuần tự, từng thẻ một, KHÔNG xáo | Xáo trộn Fisher–Yates (giữ nguyên) |
| Tên thẻ | Hiện ngay (đang học, cần biết khái niệm) | Ẩn đến khi trả lời (luyện nhận diện) |
| Câu/thẻ | 3 câu (1/bậc), bậc 1→2→3 tuần tự | 1 câu/bậc, đã trộn lẫn các thẻ |
| Màn làm quen | Có — giới thiệu khái niệm trước khi hỏi | Không |
| Phạm vi | Theo từng khóa | Theo khóa **hoặc** `all` (mọi khóa) |
| Quota | `dailyNew`/ngày + `extra=1` (học vượt) | `reviewCap` |
| Chốt phiên | Vẫn upsert `UserTagProgress` + `ReviewLog` (thẻ vào FSRS) | Như cũ |

## Thay đổi kỹ thuật (KHÔNG migration)

### `src/app/api/study/session/route.ts`
- Thêm param `mode` ∈ {`learn`, `review`}; mặc định suy ra để tương thích ngược.
- `mode=learn` + track cụ thể: chỉ trả `newTags` (bỏ nhánh `due`), giữ quota
  `dailyNew` và `extra`. Vẫn `orderBy: { order: "asc" }`, `take: allowedNew`.
- `mode=review` + track cụ thể: chỉ trả `due` của khóa đó (giống nhánh `track=all`
  nhưng lọc đúng 1 track), order `dueAt asc`, `take: reviewCap`.
- `track=all` và `track=leech`: giữ nguyên (đều review-only).
- Tương thích ngược: nếu không có `mode`, giữ hành vi cũ (due + new) để link cũ
  không vỡ; các điểm vào mới luôn truyền `mode` tường minh.

### `src/app/study/page.tsx`
- Đọc thêm `mode` từ query (cạnh `track`, `extra`).
- `mode === "learn"`:
  - KHÔNG gọi `buildQueue`. Đi **tuần tự theo thẻ** (giữ thứ tự server trả về).
  - Mỗi thẻ: **màn làm quen** (tên thẻ + `description` khái niệm) → nút "Bắt đầu"
    → lần lượt 3 câu bậc 1→2→3 của thẻ đó → sang thẻ kế.
  - Badge đổi thành "📖 Học mới · `<tên thẻ>`"; hiện tên thẻ xuyên suốt.
  - Nội dung làm quen: dùng `tag.description` (đã có sẵn ở mọi thẻ). Không cần
    thêm trường nội dung mới.
- `mode === "review"` (và `all`/`leech`): giữ nguyên luồng xáo + ẩn tên + badge
  "🔀 Ôn trộn".
- Tổng kết & `complete-session`: dùng chung cho cả hai (chấm theo lượt sai/thẻ).

### Điều hướng
- `src/components/nav-links.tsx`: "Ôn tập" giữ `/study?track=all` (đã đúng;
  có thể thêm `&mode=review` cho tường minh).
- `src/app/css/page.tsx`, `js/page.tsx`, `html/page.tsx` (và các track khác nếu
  có trang lộ trình tương tự): tách 2 nút —
  - "📖 Học mới" → `/study?track=<t>&mode=learn`
  - "🔁 Ôn tập" → `/study?track=<t>&mode=review`
  - Nút "Học vượt" gắn vào nhánh learn (`&mode=learn&extra=1`).

## Ngoài phạm vi (Giai đoạn 1)
- Gating liên-khóa (chặn CSS tới khi HTML đạt ngưỡng).
- Xen kẽ ôn HTML đến hạn vào phiên học CSS.
- `/reflex` và `/practice`: **không đụng**.
- Pipeline tối ưu FSRS per-user (data-gated ≥400 lượt, để dành).

## Kiểm thử
- Unit: `session/route.ts` — `mode=learn` chỉ trả thẻ chưa học theo order, không
  kèm due; `mode=review` chỉ trả thẻ đến hạn; không `mode` → hành vi cũ.
- Lint + `npm run build` sạch.
- Tay: học mới CSS đi tuần tự có màn làm quen; ôn tập CSS chỉ ra thẻ đến hạn, xáo.

## Rủi ro & quay lui
- Không migration → quay lui = revert code. Link cũ không vỡ nhờ tương thích ngược.
- `complete-session`/FSRS không đổi → không ảnh hưởng dữ liệu tiến độ hiện có.
