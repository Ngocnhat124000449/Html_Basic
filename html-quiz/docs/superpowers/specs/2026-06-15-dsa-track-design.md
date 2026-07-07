# Thiết kế: Track "Cấu trúc dữ liệu & Giải thuật" (DSA)

Ngày: 2026-06-15
Trạng thái: Đề xuất — chờ duyệt trước khi lập kế hoạch triển khai.

## 1. Mục tiêu

Thêm khóa học thứ 4 vào WebQuiz để người học tiếp tục lộ trình fullstack (tuần
11–13: cấu trúc dữ liệu, giải thuật, Big-O). Track mới tái dùng toàn bộ hạ tầng
hiện có (SRS/FSRS, Ôn trộn, runner Web Worker JS) — KHÔNG đổi hạ tầng, KHÔNG
migration DB (`Tag.track` đã là cột `String` tự do).

Phi mục tiêu (YAGNI): không làm game `/reflex` cho DSA; không optimizer FSRS;
không thêm loại câu mới ngoài `MCQ` + `WRITE_JS`.

## 2. Curriculum — 12 mục × 7 câu = 84 câu

Mỗi mục = 1 `Tag` (track `"dsa"`), 7 câu: 3 bậc-1 MCQ + 3 bậc-2 MCQ + 1 bậc-3
`WRITE_JS`.

**Phần 1 — Cấu trúc dữ liệu (Tuần 11) · 5 mục**
1. Array vs Object — khi nào dùng cái nào
2. Stack (LIFO) — push/pop
3. Queue (FIFO) — enqueue/dequeue (shift)
4. Map — gom nhóm theo khóa
5. Set — khử trùng lặp, kiểm tra tồn tại

**Phần 2 — Giải thuật (Tuần 12) · 4 mục**
6. Tìm kiếm tuyến tính (linear search)
7. Tìm kiếm nhị phân (binary search)
8. Sắp xếp: bubble sort & `sort()` của JS
9. Đệ quy cơ bản (recursion)

**Phần 3 — Big-O (Tuần 13) · 3 mục**
10. Big-O notation — đọc hiểu ký hiệu
11. Time/Space complexity
12. So sánh độ phức tạp & tối ưu

## 3. Chấm bài bậc 3 (đã chốt)

- **Chạy thật, NHIỀU ca test**: mỗi câu `WRITE_JS` có 2–3 run requirement
  (`returns`/`logs`) với input khác nhau để chặn lời giải hard-code. Runner Web
  Worker sẵn có chạy được; mảng coerce về scalar qua `call`, ví dụ:
  - `{ type: "returns", call: "bubbleSort([3,1,2]).join(',')", equals: "1,2,3" }`
  - `{ type: "returns", call: "bubbleSort([5,4,3,2,1]).join(',')", equals: "1,2,3,4,5" }`
  - `{ type: "returns", call: "binarySearch([1,3,5,7,9],7)", equals: 3 }`
  Run requirement giữ đúng thứ tự → `runOutputs` khớp theo index (đã hỗ trợ sẵn
  trong `grade-js.ts` / `toRunSpecs`). Không cần đổi runner.
- **Big-O bậc 3 = bài tối ưu O(n²)→O(n)**: đề cho đoạn code chậm, người học viết
  lại nhanh hơn. Chấm = chạy đúng kết quả (returns/logs) + static `contains`
  `"Set"`/`"Map"` để ép dùng cấu trúc dữ liệu phù hợp.
- Có thể kèm static `construct`/`contains` phụ trợ (vd `function`, `for`) nhưng
  điểm tựa chính là run-based.

## 4. Kiến trúc — nhân bản khuôn track JS

### File MỚI
- `prisma/dsa-content/types.ts` — `DsaSeedTag` / `DsaSeedQuestion` (sao y
  `js-content/types.ts`).
- `prisma/dsa-content/part1-cau-truc-du-lieu.ts` — `PART1_CAU_TRUC_DU_LIEU` (5 mục)
- `prisma/dsa-content/part2-giai-thuat.ts` — `PART2_GIAI_THUAT` (4 mục)
- `prisma/dsa-content/part3-big-o.ts` — `PART3_BIG_O` (3 mục)
- `prisma/dsa-content/index.ts` — export `DSA_TAGS` (gộp 3 phần theo thứ tự)
- `prisma/seed-dsa.ts` — sao y `seed-js.ts`, đổi track `"dsa"`, đổi log; upsert
  theo khóa `(track,name)` & `(tagId,tier,prompt)`; `deleteMany` GIỚI HẠN
  `track:"dsa"`. TUYỆT ĐỐI không đụng html/css/js.
- `src/app/dsa/page.tsx` — trang khóa học, sao y `src/app/js/page.tsx`.
- `src/lib/dsa-seed-content.test.ts` — guard: 12 mục, mỗi mục 7 câu (3/3/1 theo
  tier), đề tự chứa (giá trị grader kiểm phải có trong prompt), bậc-3 có ≥2 run
  requirement.

### File SỬA (điểm chạm track union & tổng hợp)
- `package.json` — thêm script `"seed:dsa": "tsx prisma/seed-dsa.ts"`.
- `src/lib/study-types.ts` — `track: "html" | "css" | "js" | "dsa"`.
- `src/app/api/study/session/route.ts` — nhận `track="dsa"` (dòng ~30 map, ~64–65
  parse param).
- `src/app/study/page.tsx` — mở rộng union/`tagLabel` cho `"dsa"` (badge/nhãn).
- `src/app/practice/practice-game.tsx` — mở rộng union nếu cần biên dịch (DSA
  không bắt buộc có dữ liệu reflex; chỉ sửa type cho khỏi lỗi build).
- `src/app/page.tsx` — thêm thẻ khóa thứ 4 ("Cấu trúc dữ liệu & Giải thuật", unit
  "mục") + đưa `dsaProgress` vào tổng hợp dự báo/độ nhớ/leech.

### KHÔNG đổi
- Prisma schema / migration (track là String tự do).
- `src/lib/fsrs.ts`, `complete-session`, `answer` route, `js-runner.ts`,
  `grade-js.ts` — dùng nguyên.

## 5. Luồng dữ liệu

Soạn `.ts` có kiểu → `index.ts` gộp `DSA_TAGS` → `npm run seed:dsa` upsert vào
Neon (cô lập track `dsa`) → `/dsa` liệt kê mục, `/study?track=dsa` (hoặc Ôn trộn
chung) phục vụ câu → bậc-1/2 chấm `correctIndex` ở server, bậc-3 client chạy Web
Worker gửi `runOutputs` → `answer` route chấm → `complete-session` cập nhật FSRS.

## 6. Quy tắc nội dung (bắt buộc)

- **Đề tự chứa**: mọi giá trị grader kiểm tra (input mảng, kết quả mong đợi, tên
  hàm) phải xuất hiện nguyên văn trong `prompt`. Guard trong test.
- **Phong cách tình huống**: prompt dùng ngữ cảnh đời thường (gắn expense tracker
  khi hợp lý, vd "sắp xếp chi tiêu theo số tiền"), giữ thuật ngữ.
- Tên hàm trong `call` phải khớp tên yêu cầu trong prompt (vd prompt bảo viết
  `bubbleSort` thì `call` gọi `bubbleSort`).

## 7. Kiểm chứng sau triển khai

- `npm run lint` (0 lỗi), `npm test` (gồm guard DSA mới).
- `npm run seed:dsa` trên Neon → log "DSA: 12 mục, 84 câu; không đổi html/css/js".
- `npx tsx scripts/verify-html-intact.ts` — HTML vẫn 60 thẻ/420 câu, tiến độ
  không giảm.
- Build OK; `/dsa` 200 khi đăng nhập, 307 khi chưa.

## 8. Rủi ro & cách giảm

- **Re-seed đổi prompt xóa attempts của câu đó** (khóa gồm prompt) — chấp nhận
  với track mới (chưa có attempt); về sau đổi chữ thì dùng
  `scripts/migrate-prompt-rewrite.ts`. Tiến độ SRS ở mức Tag vẫn giữ.
- **Runner chỉ trả scalar** — luôn `.join(',')`/`JSON.stringify`/lấy index để
  coerce mảng/đối tượng trong `call`.
- **semgrep hook** — không dùng regex động / `child_process` arg động trong script
  seed.
