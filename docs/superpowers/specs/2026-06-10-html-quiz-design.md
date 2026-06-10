# Thiết kế: HTML Quiz — Trắc nghiệm + Trả lời bằng code

**Ngày:** 2026-06-10
**Trạng thái:** Đã duyệt
**Vị trí code:** `html-quiz/` (thư mục con của `HTML_basic/`)

## Mục tiêu

App luyện học thẻ HTML khắc phục điểm yếu của trắc nghiệm thuần: chọn đúng A/B/C/D chỉ chứng minh *nhận ra* đáp án, chưa chứng minh *viết ra được*. Mỗi thẻ HTML đi qua thang nắm vững 3 bậc, kết thúc bằng câu hỏi gõ code thật, chấm theo checklist với phản hồi cụ thể từng yêu cầu.

## Stack

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS** — UI và API trong một codebase
- **Prisma ORM → Neon Postgres** (pooler connection string, lưu trong `.env`, không commit)
- **NextAuth (Auth.js v5)** — Credentials provider (email/password), hash mật khẩu bằng bcrypt, session JWT
- **node-html-parser** — parse HTML người học gõ, phục vụ bộ chấm
- **Vitest** — unit test cho grading engine
- **zod** — validate input API

## Thang nắm vững 3 bậc

Mỗi thẻ HTML (Tag) có các câu hỏi ở 3 bậc:

| Bậc | Tên | Hình thức | Ví dụ |
|---|---|---|---|
| 1 | Nhận biết | Trắc nghiệm | "Thẻ `<img>` dùng để làm gì?" |
| 2 | Hiểu | Trắc nghiệm | "`<img loading='lazy'>` nghĩa là gì?" |
| 3 | Viết được | Gõ code | "Viết thẻ img hiển thị cat.jpg, mô tả 'Mèo con', lazy loading" |

Quy tắc: câu code (bậc 3) chỉ mở khóa sau khi đúng hết trắc nghiệm bậc 1 và 2 của thẻ đó trong phiên. Thẻ chỉ pass phiên khi vượt qua câu code. Sai câu nào làm lại câu đó.

## Bốn dạng câu code (đều thuộc bậc 3)

1. **FILL_BLANK** — điền vào chỗ trống: `<____ href="...">Trang chủ</____>` → gõ `a`
2. **WRITE_TAG** — viết thẻ hoàn chỉnh theo yêu cầu: `<input type="email" required placeholder="ten@email.com">`
3. **FIX_BUG** — cho code sai (`starterCode`), gõ lại bản đúng
4. **WRITE_STRUCTURE** — viết cấu trúc nhiều thẻ (textarea nhiều dòng): `<ul><li>Táo</li><li>Cam</li></ul>`

## Bộ chấm code — checklist, không so chuỗi

Mỗi câu code có mảng `requirements` (JSON discriminated union) lưu trong DB:

```json
[
  { "type": "tagName", "value": "input" },
  { "type": "attr", "name": "type", "value": "email" },
  { "type": "attr", "name": "required" },
  { "type": "contains", "parent": "ul", "child": "li", "count": 2 },
  { "type": "text", "selector": "li:first-child", "value": "Táo" }
]
```

Các loại requirement:
- `tagName` — tên thẻ gốc đúng
- `attr` — có attribute, tùy chọn kiểm tra giá trị (`name` không có `value` = chỉ cần có mặt, ví dụ `required`)
- `contains` — cấu trúc lồng nhau: parent chứa N child
- `text` — text content của phần tử khớp selector

Chuẩn hóa trước khi so:
- Không phân biệt chữ hoa/thường (tên thẻ, tên attribute)
- Nháy đơn `'` và nháy kép `"` đều chấp nhận
- Thứ tự attribute không quan trọng
- Khoảng trắng thừa bỏ qua
- So sánh text content: trim, gộp khoảng trắng

Chấm server-side (route handler), trả về kết quả từng requirement:

```
✗ Chưa đạt (2/4 yêu cầu):
  ✓ Tên thẻ: input
  ✓ type="email"
  ✗ Thiếu thuộc tính required
  ✗ placeholder sai giá trị — bạn viết "email", cần "ten@email.com"
```

Câu FILL_BLANK chấm bằng so sánh chuỗi đã chuẩn hóa (lowercase, trim) với đáp án.

## Spaced repetition (SM-2 rút gọn)

Mỗi (user, tag) có bản ghi tiến độ: `ease` (mặc định 2.5), `intervalDays`, `dueAt`, `lapses`.

- Phiên học lấy: thẻ đến hạn (`dueAt <= now`) + thẻ mới (tối đa 5 thẻ mới/ngày)
- Thẻ **pass** phiên (vượt cả 3 bậc): interval mới = chuỗi 1 → 3 → 7 → 14 → 30 ngày (interval × ease, làm tròn, theo SM-2 rút gọn); `dueAt = now + interval`
- Thẻ **fail** (sai quá 2 lần ở bất kỳ câu nào trong phiên): quay lại hàng đợi hôm nay, interval reset về 1, `lapses + 1`, ease giảm 0.2 (sàn 1.3)
- Thẻ đạt **nắm vững** (mastered) khi `intervalDays >= 21`

## Mô hình dữ liệu (Prisma)

- **User**: `id`, `email` (unique), `passwordHash`, `name`, `createdAt`
- **Tag**: `id`, `name` (vd `img`), `topic` (vd `media`, `form`, `text`, `list`, `table`, `link`), `description`, `order`
- **Question**: `id`, `tagId`, `tier` (1|2|3), `type` (`MCQ` | `FILL_BLANK` | `WRITE_TAG` | `FIX_BUG` | `WRITE_STRUCTURE`), `prompt`, `options` (JSON, MCQ), `correctIndex` (MCQ), `requirements` (JSON, câu code), `starterCode` (FIX_BUG/FILL_BLANK), `answer` (FILL_BLANK)
- **UserTagProgress**: `userId` + `tagId` (unique cặp), `ease`, `intervalDays`, `dueAt`, `lapses`, `mastered`
- **Attempt**: `id`, `userId`, `questionId`, `answerText`, `isCorrect`, `detail` (JSON kết quả checklist), `createdAt`

## Trang & UI (tiếng Việt)

- `/login`, `/register` — đăng nhập, đăng ký email/password
- `/` — dashboard (yêu cầu đăng nhập): số thẻ đến hạn hôm nay, số thẻ nắm vững/tổng, nút "Học ngay"
- `/study` — phiên học: lần lượt từng thẻ qua 3 bậc; trắc nghiệm chọn đáp án, câu code có ô gõ (input 1 dòng hoặc textarea cho WRITE_STRUCTURE); feedback checklist ✓/✗ từng yêu cầu; sai thì làm lại
- `/tags` — lưới 20 thẻ nhóm theo chủ đề, trạng thái từng thẻ (chưa học / đang học / đến hạn / nắm vững)

## Nội dung seed

~20 thẻ HTML cơ bản trong `prisma/seed.ts`, nhóm theo chủ đề:
- **Văn bản**: `h1`, `p`, `strong`, `em`, `br`
- **Liên kết & media**: `a`, `img`
- **Danh sách**: `ul`, `ol`, `li`
- **Bảng**: `table`, `tr`, `td`, `th`
- **Form**: `form`, `input`, `label`, `button`, `textarea`, `select`

Mỗi thẻ: 1 câu MCQ bậc 1 + 1 câu MCQ bậc 2 + 1–2 câu code bậc 3 (trải đều 4 dạng) ≈ 75–80 câu hỏi.

## Kiểm thử & xử lý lỗi

- **Vitest cho grading engine** (ưu tiên cao nhất — logic rủi ro nhất): chuẩn hóa nháy đơn/kép, thứ tự attribute, attribute không giá trị, hoa/thường, cấu trúc lồng nhau, đếm child, text content, input rác/không parse được
- Validate body API bằng zod, trả message lỗi rõ ràng tiếng Việt
- Input không parse được HTML → báo "Không đọc được code của bạn, kiểm tra cú pháp thẻ" thay vì crash

## Ngoài phạm vi (YAGNI)

- Trang admin soạn câu hỏi (nội dung seed cứng)
- OAuth (Google...) — chỉ email/password
- Deploy Vercel (làm sau khi chạy ổn local)
- Leaderboard, gamification

## Ghi chú bảo mật

- `DATABASE_URL` đặt trong `.env`, gitignore. Connection string đã bị dán vào chat → **nên rotate password trên Neon dashboard** sau khi setup xong.
