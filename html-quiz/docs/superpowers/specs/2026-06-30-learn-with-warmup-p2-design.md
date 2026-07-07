# Học kèm ôn nền (interleaving) — Giai đoạn 2

Ngày: 2026-06-30
Trạng thái: Đã duyệt thiết kế, chờ viết plan.

## Bối cảnh & mục tiêu

Tiếp nối Giai đoạn 1 (tách Học mới / Ôn tập — xem [[learn-review-split]]). Động lực gốc
của người dùng: "học CSS phải dùng kiến thức HTML làm nền tảng… vừa học vừa ôn lại kiến
thức cũ, tránh học xong không đụng đến sẽ quên."

G2 hiện thực **xen kẽ ôn cũ vào buổi học mới** (interleaving). Quyết định phạm vi:
- Trọng tâm = interleaving. **Gating cứng** (khóa khóa sau tới khi khóa trước đạt ngưỡng)
  **vẫn để dành** (G3, brainstorm riêng).
- Nguồn thẻ ôn = khóa hiện tại **+ mọi khóa nền đứng trước**.
- Cách đan = **ôn nền trước, học mới sau** (2 pha nối tiếp).

## Hình dạng phiên `mode=learn`

Phiên "📖 Học mới" gồm 2 pha nối tiếp:
1. **Pha ôn nền** — thẻ ĐẾN HẠN của {khóa hiện tại ∪ khóa nền}, kiểu review (xáo, ẩn tên
   → lộ sau khi trả lời). Cap 8 thẻ.
2. **Pha học mới** — thẻ MỚI tuần tự + màn làm quen (y như G1), quota `dailyNew` (+`extra`).

Không có thẻ đến hạn → pha 1 trống → phiên rút về đúng G1 (chỉ học mới). Degrade êm,
không phá G1. `mode=review` (nút "Ôn tập") KHÔNG đổi.

## Thứ tự khóa & khóa nền

Hằng trong code (không migration):
`TRACK_ORDER = ["html","css","js","dsa","git","react","project"]`.
Học khóa X → **khóa nền** = mọi khóa có chỉ số < X trong TRACK_ORDER. `foundationTracks(X)`
trả về {các khóa nền} ∪ {X}. Ví dụ: CSS → [html, css]; React → [html,css,js,dsa,git,react].

## Số lượng & thứ tự pha ôn nền

- Lấy thẻ đến hạn (`dueAt <= now`) của `track IN foundationTracks(track)`.
- Sắp: **khóa nền trước** (theo TRACK_ORDER) → trong cùng khóa, **đến hạn lâu nhất trước**
  (`dueAt asc`).
- Cap = hằng `WARMUP_CAP = 8` (không thêm setting; `reviewCap` chỉ dùng cho mode=review).

## Thay đổi kỹ thuật (KHÔNG migration)

### `src/lib/tracks.ts` (mới)
- `export const TRACK_ORDER = [...] as const`.
- `export function foundationTracks(track: string): string[]` — trả {khóa nền ∪ chính nó}
  theo TRACK_ORDER; nếu track không có trong danh sách → trả `[track]` (an toàn).
- Thuần, có test `tracks.test.ts`.

### `src/lib/study-queue.ts`
- Thêm `export const WARMUP_CAP = 8;`
- Thêm `buildLearnWithWarmup(tags: SessionTag[]): QueueItem[]`:
  tách `tags` theo `isNew` → phần `isNew===false` qua `buildReviewQueue` (xáo) đặt TRƯỚC,
  phần `isNew===true` qua `buildLearnSequence` (tuần tự) đặt SAU; nối lại.
- Thuần, có test (ôn trước-học sau; thứ tự pha học giữ nguyên; pha ôn là hoán vị).

### `src/app/api/study/session/route.ts`
- Nhánh `mode === "learn"`: ngoài thẻ mới, query thêm thẻ ôn nền:
  `userTagProgress where userId, dueAt<=now, tag.track IN foundationTracks(track)`,
  orderBy chuẩn (xem dưới), take `WARMUP_CAP`, include questions.
  Vì Prisma không sắp trực tiếp theo TRACK_ORDER, lấy theo `dueAt asc` rồi sắp lại trong JS
  theo (TRACK_ORDER index, dueAt). Trả `[...warmup.map(toClient(_, false)), ...fresh.map(toClient(_, true))]`.
- `isNew` (field sẵn có trong `SessionTag`) phân biệt pha ở client.
- Các nhánh khác (`review`, `all`, `leech`, legacy) KHÔNG đổi.

### `src/app/study/page.tsx`
- `mode === "learn"`: dùng `buildLearnWithWarmup(tags)` thay `buildLearnSequence(tags)`.
  (`mode==="review"` vẫn `buildReviewQueue`.)
- Suy `phase` mỗi item từ `item.tag.isNew`:
  - Pha ôn (`isNew===false`): badge "🔁 Ôn nền", ẩn tên tới khi trả lời (như review).
  - Pha học (`isNew===true`): màn làm quen + badge "📖 Học mới · <tên>" (như G1).
- `introFor` (đã có): chỉ set cho thẻ MỚI; thẻ ôn không có màn làm quen.
- **Mốc chuyển pha**: khi gặp thẻ MỚI đầu tiên ngay sau một thẻ ôn, hiện một bước
  "✅ Xong phần ôn nền · Bắt đầu học mới →" trước màn làm quen của thẻ mới đầu tiên.
  (Chỉ hiện khi pha ôn có ≥1 thẻ.)
- Thanh tiến độ "Câu x/N" tính cả 2 pha (N = tổng câu của queue).

## Chấm điểm / FSRS

`finishSession` → `complete-session` không đổi: cả thẻ ôn lẫn thẻ mới đều chấm theo
`wrongByTag` → cập nhật FSRS + ReviewLog. Thẻ ôn = lần ôn tiếp; thẻ mới = lần FSRS đầu.

## Kiểm thử

- Unit: `tracks.test.ts` (foundationTracks: css→[html,css]; html→[html]; react gồm 6 khóa;
  track lạ→[track]). `study-queue.test.ts` (+buildLearnWithWarmup: ôn trước-học sau, độ dài,
  pha học giữ thứ tự, pha ôn đủ phần tử).
- Tay (Playwright + DB thật): seed vài thẻ HTML+CSS đến hạn → vào `?track=css&mode=learn`
  → thấy pha ôn (xáo, ẩn tên, gồm cả HTML) trước, mốc chuyển pha, rồi học mới tuần tự.
  Không có thẻ đến hạn → vào thẳng học mới (degrade G1).
- Lint + `npm run build` sạch.

## Ngoài phạm vi
- Gating cứng (G3).
- Setting riêng cho cap warm-up.
- `/reflex`, `/practice`, optimizer FSRS — không đụng.
