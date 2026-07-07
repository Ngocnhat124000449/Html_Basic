# Spec — FSRS cho cơ chế ôn tập (P1)

- Ngày: 2026-06-15
- Trạng thái: CHỜ DUYỆT
- Phạm vi: Giai đoạn 1 (P1) — thay scheduler SM-2 rút gọn bằng FSRS (default weights), giữ nguyên trải nghiệm học hiện tại.

## 1. Bối cảnh
Hệ thống ôn hiện tại (`src/lib/srs.ts`) là SM-2 rút gọn ở mức **thẻ** (Tag = 7 câu / 3 bậc):
- `ease` mặc định 2.5, interval `0→1→3→round(interval×ease)`; sai → interval 0, `ease −0.2` (sàn 1.3), `lapses++`; `mastered` khi interval ≥ 21.
- Nhược điểm: chấm nhị phân pass/fail, **ease chỉ giảm** (không có "Easy" để giãn nhanh), không jitter, `lapses` không được dùng, mốc ngày theo giờ server.

Quyết định (đã chốt với người dùng): chuyển sang **FSRS** dùng thư viện chính chủ `ts-fsrs`, default weights (chưa optimizer). Optimizer + ReviewLog + dashboard để ở P2.

## 2. Mục tiêu / Không thuộc phạm vi
**Mục tiêu P1**
- Lịch ôn do FSRS quyết định (DSR: Difficulty/Stability/Retrievability), `request_retention = 0.9`.
- Giữ nguyên luồng học (1 câu/bậc, tối đa 3 lượt sai), **không thêm nút tự chấm thủ công** — grade suy ra tự động từ số lượt sai.
- Di trú dữ liệu tiến độ cũ sang state FSRS, **không mất** progress/attempts; HTML giữ bất biến 60 thẻ/420 câu/301 attempts.

**KHÔNG thuộc P1**
- Optimizer 21 tham số per-khóa, bảng ReviewLog, dashboard retention (→ P2).
- Đổi granularity (vẫn ôn theo thẻ, không theo từng câu).
- Đổi quota thẻ mới/ngày (giữ 5/khóa) và cap phiên (giữ 10).

## 3. Thiết kế

### 3.1 Thư viện
- `ts-fsrs` (open-spaced-repetition, MIT). KHÔNG tự hiện thực công thức.
- Scheduler cấu hình:
  ```ts
  fsrs({ request_retention: 0.9, enable_fuzz: true, enable_short_term: true })
  ```
  `enable_short_term: true` để grade **Again** cho lịch lại trong ngày (~1–10 phút) → khớp UX "học lại hôm nay" hiện tại. `enable_fuzz` chống dồn cục.

### 3.2 Map kết quả thẻ → Rating (tự động, không thêm UI)
Dữ liệu sẵn có khi `completeTag`: `wrongCount` (0..3), `MAX_WRONG = 3`.

| wrongCount | Rating | Ý nghĩa |
|-----------:|--------|---------|
| ≥ 3 (rớt)  | `Again` | Sai quá 3 lần → học lại hôm nay |
| 2          | `Hard`  | Đúng nhưng chật vật |
| 1          | `Good`  | Đúng, sai vặt 1 lần |
| 0          | `Easy`  | Đúng hết, mượt |

→ Client gửi thêm `wrongCount` (0..3) trong body `complete-tag`; server map sang `Rating`. (Có thể giữ `passed` để tương thích, nhưng nguồn chính là `wrongCount`.)

### 3.3 Schema (`UserTagProgress`) — migration CỘNG cột
Thêm cột lưu Card của ts-fsrs (giữ `dueAt`, `lapses`):
```
stability      Float    @default(0)
difficulty     Float    @default(0)
reps           Int      @default(0)
state          Int      @default(0)   // 0 New,1 Learning,2 Review,3 Relearning
scheduledDays  Int      @default(0)
lastReviewedAt DateTime?
```
Giữ lại `ease`, `intervalDays`, `mastered` (không xóa ở P1 để rollback an toàn; `mastered` tính lại = `stability >= 21`). Migration chỉ THÊM cột có default → an toàn trên Neon dùng chung; `verify-html-intact` không kiểm cột.

### 3.4 Luồng chấm (`src/app/api/study/complete-tag/route.ts`)
1. Nhận `{ tagId, wrongCount }` (zod: `wrongCount` int 0..3).
2. Đọc `UserTagProgress`; dựng `Card` ts-fsrs từ cột DB (hoặc `createEmptyCard()` nếu chưa có).
3. `const { card } = scheduler.next(prev, now, ratingFrom(wrongCount))`.
4. Upsert: lưu `stability/difficulty/reps/state/scheduledDays/lastReviewedAt`, `dueAt = card.due`, `lapses = card.lapses`, `mastered = card.stability >= 21`.

### 3.5 Lớp bọc thuần (`src/lib/srs.ts` viết lại / `src/lib/fsrs.ts` mới)
- Hàm thuần `schedule(prevCardFields, rating, now) → newCardFields` để **test deterministic** (cố định now + default weights).
- `ratingFromWrong(wrongCount): Rating`.
- `toCard(row)` / `fromCard(card)` map DB ↔ ts-fsrs Card.
- `study/session` không đổi (vẫn lấy `dueAt <= now`, quota, cap).

### 3.6 Di trú dữ liệu tiến độ cũ (script một lần, scoped)
`scripts/migrate-srs-to-fsrs.ts`:
- Với mỗi `UserTagProgress` hiện có: khởi tạo Card:
  - `stability = max(1, intervalDays)` (nếu `intervalDays > 0`), thẻ chưa ôn (interval 0) → coi như New (`createEmptyCard`).
  - `difficulty`: suy từ `ease` và `lapses` → map tuyến tính `ease 2.5→D≈5`, `ease 1.3→D≈8`, cộng nhẹ theo lapses (kẹp 1..10). (Giá trị khởi tạo gần đúng; FSRS tự hiệu chỉnh các lần sau.)
  - `state = Review` nếu từng ôn, `reps = max(1, ...)`, `lapses` giữ nguyên, `dueAt` GIỮ NGUYÊN.
- Chạy theo `track`, không đụng dữ liệu khác; chạy được nhiều lần (idempotent: bỏ qua hàng đã có `stability > 0`).

## 4. Kiểm thử
- `src/lib/fsrs.test.ts`: với `now` cố định + default weights:
  - `ratingFromWrong`: 0→Easy,1→Good,2→Hard,3→Again.
  - Again → `dueAt` trong ngày; Good/Easy → interval tăng dần; Easy ≥ Good.
  - round-trip `toCard/fromCard` giữ nguyên giá trị.
- Cập nhật/loại `srs.test.ts` cũ.
- Sau migration: `npx tsx scripts/verify-html-intact.ts` phải báo **60 thẻ/420 câu/301 attempts** (≥ baseline).
- `vitest` toàn bộ xanh; `next build` sạch.

## 5. Triển khai & rollback
- Thứ tự: thêm `ts-fsrs` → migration schema (prisma) → lib + route + client gửi `wrongCount` → seed lại KHÔNG cần (không đụng nội dung) → migrate dữ liệu cũ → verify → build → deploy.
- Rollback: vẫn còn cột `ease/intervalDays` cũ; có thể trỏ route về `applyPass/applyFail` nếu cần.

## 6. Rủi ro & caveat
- **Thẻ gộp 7 câu** trong khi FSRS giả định 1 item trí nhớ → grade suy ra ở mức thẻ (mục 3.2). Đây là xấp xỉ (SM-2 hiện tại cũng vậy), chấp nhận ở P1.
- Khởi tạo `difficulty` từ `ease` là gần đúng; FSRS hội tụ sau vài lần ôn.
- DB dùng chung (Neon): mọi migration/script nhốt theo `track`, chạy có kiểm chứng `verify-html-intact`.

## 7. Câu hỏi mở (cần chốt khi duyệt)
1. Map grade ở mục 3.2 có ổn không, hay muốn "Easy" phải kèm điều kiện thời gian?
2. `enable_short_term: true` (Again học lại trong ngày) — giữ đúng UX cũ; có muốn đổi không?
3. P1 có cần thêm `ReviewLog` ngay (để sau optimizer có dữ liệu sớm) hay để hẳn P2?
