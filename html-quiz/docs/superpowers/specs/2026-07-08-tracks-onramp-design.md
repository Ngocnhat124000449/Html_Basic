# Nhân khuôn Nhập môn ra 6 khóa còn lại

Ngày: 2026-07-08
Trạng thái: Đã duyệt thiết kế (nối tiếp 2026-07-08-html-onramp-redesign).

## Thiết kế đã chốt

Mỗi khóa thêm Phần "Nhập môn" (part = topic = "Nhập môn") đứng ĐẦU lộ trình, bù tầng
khái niệm "nó là gì, vì sao cần" (các track đã có thẻ kỹ thuật mở đầu tốt nên chỉ 1-2 thẻ):

| Khóa | Thẻ | Bậc 3 (guard bắt buộc loại viết của khóa) |
|---|---|---|
| css | `css là gì` | WRITE_CSS kèm HTML căn cứ trong starterCode |
| js | `javascript là gì`, `chương trình & lệnh` | WRITE_JS (contains + starterCode) |
| dsa | `cấu trúc dữ liệu là gì`, `giải thuật là gì` | WRITE_JS + ≥2 ca chạy thật (returns) |
| git | `vì sao cần git` | WRITE_CMD ≥2 contains |
| react | `vì sao cần react` | WRITE_JSX + ≥1 ca renders |
| project | `quy trình ghép trang` | WRITE_STRUCTURE |

Mỗi thẻ 3 MCQ bậc 1 + 3 MCQ bậc 2 + 1 câu viết bậc 3 = **8 thẻ / 56 câu**.

## Kỹ thuật

- Mỗi track thêm file `prisma/<track>-content/part0-nhap-mon.ts` export `PART0_NHAP_MON`,
  import ĐẦU TIÊN trong `index.ts` (order = index → Nhập môn đứng đầu, seed upsert
  giữ tiến độ thẻ cũ).
- Cập nhật 4 guard đếm cứng: DSA 12→14, Git 5→6, React 12→13, Project 9→10.
- Icon phần "Nhập môn" dùng fallback 📦 sẵn có ở các trang track (PART_ICON ?? "📦").
- Tên thẻ khái niệm ở track ≠ html hiện trần sẵn (chỉ html bọc `<>`), không cần sửa UI.
- Gate G3: tổng thẻ tăng → % học giảm nhẹ; khóa đã mở giữ nguyên (ratchet).
- Chạy `npm test` (guard 6 track) → seed 6 lệnh `seed:css|js|dsa|git|react|project`
  → verify browser spot-check → deploy qua push.

## Ngoài phạm vi
- Onboarding app, bản đồ hành trình (bước 2-3 của [[onramp-roadmap]]).
- Không đổi thẻ/câu hiện có của 6 track.
