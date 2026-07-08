# Làm lại lộ trình HTML — phần Nhập môn + sắp lại thứ tự (khuôn mẫu "từ con số 0")

Ngày: 2026-07-08
Trạng thái: Đã duyệt thiết kế.

## Bối cảnh

Người dùng yêu cầu "làm lại lộ trình học, phải có nhận biết, dẫn dắt người học từ con
số 0". Đã chốt 4 tầng (nội dung nhập môn, onboarding app, bản đồ hành trình, sắp lại
thứ tự) làm lần lượt; **dự án con này = tầng nội dung, khóa HTML trước làm khuôn**,
duyệt xong mới nhân ra 6 khóa còn lại (spec riêng sau).

Hiện trạng: lộ trình HTML vào thẳng chủ đề "Văn bản" (`h1, p, strong…`); "Cấu trúc
trang" (`html, head, body, title…`) nằm vị trí 6/7 — người chưa biết "thẻ" là gì đã
phải học `<h1>`.

## Thiết kế

### 1. Chủ đề mới "Nhập môn" — 5 thẻ khái niệm, đứng đầu lộ trình (order 0-4)

| Thẻ (name) | description (ý chính) |
|---|---|
| `trang web & trình duyệt` | Web là gì; trình duyệt đọc HTML rồi vẽ thành giao diện |
| `file .html` | Tạo file đuôi .html, soạn bằng editor, mở bằng trình duyệt |
| `thẻ & phần tử` | Cú pháp `<thẻ>nội dung</thẻ>`; thẻ mở/đóng; lồng nhau |
| `thuộc tính` | Dạng `tên="giá trị"` đặt trong thẻ mở |
| `khung trang tối thiểu` | `<!DOCTYPE html>` + `html/head/body` — nhìn tổng thể trước khi học từng thẻ |

- Mỗi thẻ **7 câu** theo đúng guard `seed-content.test.ts`: 3 câu bậc 1 (MCQ nhận
  biết), 3 câu bậc 2 (MCQ hiểu/phân biệt), **đúng 1** câu bậc 3
  (FILL_BLANK/WRITE_TAG/WRITE_STRUCTURE gõ được cú pháp) → **+35 câu** (480→515).
- Đề theo chuẩn hiện hành: tình huống đời thường tự chứa (giá trị tùy ý phải hiện
  nguyên văn trong đề), giữ thuật ngữ, qua được guard `seed-content.test.ts`.
- Thẻ khái niệm không phải tên thẻ HTML thật → khớp `tagLabel` hiện tại: track html
  bọc `<>`… **KHÔNG ổn** với tên như `trang web & trình duyệt`. Xử lý: `tagLabel`
  (study/page.tsx) và các chỗ hiển thị `<{name}>` chỉ bọc `<>` khi name là tên thẻ
  hợp lệ (regex `^[a-z][a-z0-9]*$`); tên có khoảng trắng hiện trần.

### 2. Sắp lại thứ tự chủ đề (chỉ đổi vị trí trong mảng `tags` của `prisma/seed.ts`)

Nhập môn (mới) → **Cấu trúc trang** (kéo từ vị trí 6 lên 2) → Văn bản → Liên kết &
Media → Danh sách → Bảng → Form → Ngữ nghĩa. Không đổi prompt/nội dung 60 thẻ cũ
→ upsert giữ nguyên câu hỏi, attempts và tiến độ SRS.

### 3. Hệ quả & lưới an toàn

- Tổng thẻ html 60 → **65**; gate G3 cần 52/65 — khóa đã mở giữ nguyên (ratchet).
- Người đang học dở HTML sẽ gặp 5 thẻ Nhập môn làm thẻ mới kế tiếp (đứng đầu order).
- `scripts/html-baseline.json` cập nhật qua `verify-html-intact.ts --update` SAU khi
  seed thành công (tags 60→65, questions 480→515, progress/attempts giữ nguyên).
- Seed chạy trên Neon (prod + local dùng chung DB).

## Kiểm thử

- `npm test` (guard seed-content: tự chứa, phong cách đề, cấu trúc bậc).
- Seed rồi `verify-html-intact.ts` (trước --update phải báo lệch đúng phần tags/questions,
  progress/attempts KHÔNG lệch) → `--update` baseline.
- Verify browser: user test mới học `?track=html&mode=learn` → thẻ đầu là
  `trang web & trình duyệt` (intro screen hiện tên trần không bọc `<>`), làm hết
  bậc 1→3; trang /tags và /html hiển thị 65 thẻ, chủ đề Nhập môn đứng đầu.

## Ngoài phạm vi
- 6 khóa còn lại (nhân khuôn sau khi duyệt), onboarding app, bản đồ hành trình.
- Không đổi nội dung/prompt 60 thẻ HTML hiện có.
