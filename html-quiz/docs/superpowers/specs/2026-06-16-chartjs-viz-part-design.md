# Thiết kế: Phần 6 "Trực quan hóa" (Chart.js) cho track JS

Ngày: 2026-06-16
Trạng thái: Đã duyệt & triển khai (user yêu cầu triển khai–commit–deploy luôn).

## 1. Mục tiêu

Thêm nội dung tuần 14 của lộ trình (Chart.js & trực quan hóa) vào WebQuiz để người
học tiếp tục lộ trình. Vì tuần 14 chỉ 1 tuần (nhỏ hơn DSA 3 tuần), gộp làm **Phần 6
"Trực quan hóa" của track JS** thay vì track riêng — Chart.js là thư viện JS.

## 2. Quyết định đã chốt

- **Cấu trúc:** Phần 6 trong track `js` (không thêm thẻ dashboard). JS: 72 → 76 mục.
- **Bậc 3:** CẢ HAI kiểu — (a) chuẩn bị/biến đổi dữ liệu, (b) dựng object config.

## 3. Thách thức & lời giải (không đổi hạ tầng)

Chart.js KHÔNG chạy trong Web Worker (không có `canvas`/`Chart`) → bậc 3 KHÔNG
render biểu đồ. Chấm phần JS thuần dẫn tới biểu đồ, coerce về scalar trong `call`:
- Data-prep: `chieuCaoCot(50,100,200)` → 100; `tongTheoDanhMuc(ds).An` → 30.
- Config: `taoConfig().type` → "bar"; `bieuDoCot(['T1','T2'],[10,20]).data.datasets[0].data.join(',')` → "10,20".
Runner scalar sẵn có chấm được; ≥2 ca test/câu chống hard-code.

## 4. Curriculum — 4 mục × 7 câu (28 câu)

1. **canvas cơ bản** (Canvas) — `<canvas>`, getContext, fillRect/fillStyle; bậc 3
   `chieuCaoCot` (data-prep: quy đổi giá trị → pixel).
2. **khởi tạo chart.js** (Khởi tạo Chart.js) — CDN, `new Chart(ctx, config)`,
   type/data/datasets/options; bậc 3 `taoConfig` (config).
3. **biểu đồ tròn** (Biểu đồ tròn) — pie, labels/backgroundColor, gom theo danh
   mục; bậc 3 `tongTheoDanhMuc` (data-prep).
4. **biểu đồ cột** (Biểu đồ cột) — bar, datasets theo tháng, label; bậc 3
   `bieuDoCot` (config trả labels + data).

## 5. File & điểm chạm

- MỚI: `prisma/js-content/part6-truc-quan-hoa.ts` (`PART6_TRUC_QUAN_HOA`).
- SỬA: `prisma/js-content/index.ts` (import + nối PART6); `src/app/js/page.tsx`
  (PART_ICON "Trực quan hóa" → 📊; mô tả & câu kết "6 Phần").
- Seed: `npm run seed:js` (idempotent, cô lập track js). KHÔNG migration.
- Test: dùng `src/lib/js-seed-content.test.ts` sẵn có (tự phủ Part 6).

## 6. Quy tắc nội dung

Đề tự chứa (equals, tên hàm, 'bar', '10,20'… hiện trong đề); phong cách tình huống
(gắn expense tracker: gom chi tiêu theo danh mục, tổng theo tháng); giữ thuật ngữ.

## 7. Kiểm chứng

lint 0 lỗi · vitest 131 pass · build OK · `seed:js` → JS 76 mục/532 câu, giữ tiến
độ, HTML/CSS không đổi · `verify-html-intact` HTML 60/420 nguyên vẹn.
