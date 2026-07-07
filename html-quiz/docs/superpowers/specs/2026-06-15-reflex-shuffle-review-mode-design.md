# Chế độ phản xạ — trộn câu cross-tag (Reflex Review Mode)

Ngày: 2026-06-15

## Vấn đề
Ôn tập hiện đi **tuần tự từng thẻ** (3 câu/bậc trong 1 thẻ rồi mới sang thẻ khác), có
vòng "làm lại tới khi đúng" + màn làm quen thẻ mới + 3 ❤️/thẻ. Người dùng muốn **xáo
trộn tất cả câu của các thẻ cần ôn**, không ôn theo thẻ — luyện **nhận diện thẻ tức thì**.

## Quyết định (đã chốt với user)
1. **Phạm vi**: trộn TẤT CẢ câu, gồm cả thẻ MỚI; **bỏ màn làm quen** (intro).
2. **Chấm**: mỗi câu **một lượt** (đúng/sai đều đi tiếp, không làm lại). Cuối phiên **gom
   lượt sai theo từng thẻ** → suy grade FSRS (0=Easy,1=Good,2=Hard,≥3=Again).
3. **Nhận diện thẻ**: trong lúc làm chỉ thấy đề; **lộ badge tên thẻ sau khi trả lời**.

## Kiến trúc
- **`/api/study/session`**: KHÔNG đổi — vẫn trả `tags` (mỗi thẻ `pickOnePerTier` = 3 câu).
- **`src/app/study/page.tsx`**: gom phẳng mọi `(tag, question)` từ `tags` → mảng, **xáo
  trộn 1 lần** (useMemo theo identity của `tags`). Đi qua từng phần tử:
  - submit → `/api/study/answer` (không đổi); câu WRITE_JS vẫn chạy Web Worker.
  - sai → `wrongByTag[tagId]++` (state object).
  - feedback hiện badge tên thẻ + (MCQ) tô đáp án đúng.
  - hết hàng đợi → build `results = tags.map(t => ({ tagId, wrongCount: min(wrongByTag, MAX_WRONG) }))`
    → POST `/api/study/complete-session` → màn tổng kết (đậu nếu wrong < MAX_WRONG).
  - Bỏ: tagIdx/qIdx/introSeen/tagFailed, vòng làm lại, 3 ❤️/thẻ, các component Intro.
- **`/api/study/complete-session`** (MỚI): nhận `{ results: {tagId, wrongCount}[] }`;
  với mỗi thẻ: `nextWithLog` → upsert `UserTagProgress` + tạo `ReviewLog`, trong
  `prisma.$transaction`. Validate tagId tồn tại, wrongCount ∈ [0, MAX_WRONG].
- **`/api/study/answer`**: trả thêm `correctIndex` cho MCQ (đã trả lời rồi nên lộ đáp án OK).
- **`study-types.ts`**: `AnswerResult` thêm `correctIndex?: number | null`.

## Bất biến
- FSRS vẫn lên lịch **mức thẻ** — chỉ đổi cách TRÌNH BÀY (trộn câu) + nơi chấm (cuối phiên).
- `complete-tag` cũ giữ lại (không xoá) để rollback / tương thích.
- verify-html-intact phải giữ 60/420; attempts chỉ tăng.

## Caveat
- Đề một số câu (vd "Viết thẻ <table>...") tự lộ tên thẻ — không thể giấu hoàn toàn; chỉ
  giấu badge/chip. Chấp nhận.
- Thẻ mới không còn màn học kiến thức trước → khó hơn (đúng ý "phản xạ thuần").
