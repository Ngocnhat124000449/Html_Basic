# Thiết kế: Track "Git & Công cụ" (tuần 17) — Giai đoạn 2

Ngày: 2026-06-16
Trạng thái: Đã duyệt & triển khai (user yêu cầu triển khai–commit–deploy luôn).

## 1. Mục tiêu

Thêm nội dung tuần 17 (Git + môi trường dev) vào WebQuiz, mở đầu Giai đoạn 2.
Track mới `git` ("Git & Công cụ") phủ trọn tuần 17.

## 2. Quyết định đã chốt (user)

- **Phạm vi:** track riêng `git` phủ cả tuần 17 (Git + npm + .env), 5 mục.
- **Bậc 3:** thêm enum `WRITE_CMD` + migration (user chủ động chọn, dù trái
  nguyên tắc tránh migration). An toàn: chỉ `ALTER TYPE ... ADD VALUE`, không phá
  dữ liệu; đi đúng tiền lệ `add_write_css/js_question_type`.

## 3. Thách thức & lời giải

Git không phải JS, không chạy được trong Web Worker. Lời giải: type `WRITE_CMD`
chấm TĨNH bằng so chuỗi con (`grade-cmd.ts`: contains/notContains, chuẩn hóa
khoảng trắng). Worker không chạy (study/page.tsx chỉ chạy khi
`WRITE_JS && runSpecs.length>0`). Bài nộp = chuỗi lệnh Git/CLI hoặc nội dung file.

Self-contained kiểu mới: động từ lệnh KHÔNG để lộ trong đề; chỉ giá trị tùy ý
(tên nhánh, lời nhắn, URL, node_modules, axios) đánh `inPrompt: true` → guard buộc
hiện trong đề.

## 4. Curriculum — 5 mục × 7 câu (35 câu), 2 Phần

Phần "Git": (1) git cơ bản — init/add/commit; (2) nhánh & merge —
checkout -b/merge; (3) remote & pull request — remote add origin/push -u/PR.
Phần "Công cụ dev": (4) .gitignore & .env — bỏ qua node_modules/.env;
(5) npm & package.json — npm init -y/npm install axios.

## 5. File & điểm chạm

- DB/grading: `schema.prisma` (enum WRITE_CMD), migration
  `20260616120000_add_write_cmd_question_type`, `grade-cmd.ts`, `cmd-types.ts`,
  dispatch ở `api/study/answer` + `api/practice/answer`.
- Track wiring: `study-types.ts`, `api/study/session`, `study/page.tsx`,
  `practice-game.tsx`, `app/page.tsx`.
- Mới: `app/git/page.tsx`, `prisma/git-content/` (types + part1 + part2 + index),
  `seed-git.ts`, `package.json` seed:git, `git-seed-content.test.ts`.

## 6. Kiểm chứng

lint 0 lỗi · vitest 141 pass (+10 git) · build OK (route /git) ·
`migrate deploy` áp enum lên prod · `seed:git` → Git 5 mục/35 câu, các track khác
không đổi · `verify-html-intact` HTML 60/420 nguyên vẹn · deploy prod READY,
`/git` 307, `/study` 200.

## 7. Kế tiếp

Tuần 18+ React — khối lớn nhiều tuần → track riêng; cần brainstorm cách chấm
component/JSX/props.
