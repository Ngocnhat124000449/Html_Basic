# Trang /html — tách rõ 2 tầng Học mới / Ôn tập

Ngày: 2026-07-07
Trạng thái: Đã duyệt thiết kế.

## Vấn đề

Trang `/html` (dashboard khóa HTML) có một CTA lớn "Bắt đầu học hôm nay" trộn cả hai
tầng ("X thẻ cần ôn lại · Y thẻ mới" → dẫn vào `mode=learn`), còn "🔁 Ôn tập" chỉ là
dải mỏng bên dưới (ẩn khi không có thẻ đến hạn). Người học không phân biệt được tầng
ôn tập và tầng học mới.

## Thiết kế (đã chốt: 2 cột ngang hàng)

Thay khối CTA lớn + dải ôn tập bằng lưới `grid gap-4 sm:grid-cols-2`
(mobile xếp dọc, Học mới trước):

1. **Card 📖 Học mới** — giữ gradient flame của CTA cũ. Số to = `newAvailable`;
   phụ đề "kèm ôn nền trước" khi `due > 0` (phản ánh pha ôn nền G2); bấm →
   `/study?track=html&mode=learn`.
   - Cạn quota (`newAvailable === 0`, còn `unseen > 0`): card mờ (bg-surface, chữ mờ),
     "đạt mục tiêu 5/ngày 🎯" + nút nhỏ "⚡ Học vượt 5 thẻ" → `mode=learn&extra=1`.
   - Học hết (`unseen === 0`): card mờ, "đã học hết 60 thẻ 🏁", không nút.
2. **Card 🔁 Ôn tập** — nền amber, cùng cỡ. Số to = `due`; bấm →
   `/study?track=html&mode=review`.
   - `due === 0`: card mờ, KHÔNG bấm được (render div), "0 thẻ đến hạn" + "sớm nhất
     {shortDate(nextDue)}" nếu có `nextDue`.
3. **Cả hai cạn** (`due === 0 && newAvailable === 0`): thêm dòng
   "🎉 Hôm nay xong rồi — bộ nhớ cần thời gian, quay lại ngày mai nhé." phía trên lưới
   (thay khối celebration cũ).
4. Giữ nguyên: 3 ô thống kê, thanh tiến độ, "📚 Đã học hôm nay", Luyện phản xạ /
   Luyện tổng hợp, link /tags.

## Phạm vi

- Chỉ `src/app/html/page.tsx`. Không đụng API, không migration, không đổi trang track khác.

## Mở rộng (cùng ngày, người dùng yêu cầu sau khi duyệt /html)

Nhân rộng bố cục 2 card ra 6 trang track còn lại (`css|js|dsa|git|react|project/page.tsx`),
thay hàng nút Học mới/Ôn tập/Học vượt. Khác biệt so với /html:
- Đơn vị "mục" thay "thẻ"; quota 5 mục mới/ngày (đồng bộ /html, thêm query `newToday`).
- **Gate G3**: khi khóa chưa mở, card Học mới thành card mờ "🔒 Mở khi X đạt 80% (a/b)"
  (thay span khóa cũ); card Ôn tập không bị ảnh hưởng.
- Dòng 🎉 chỉ hiện khi KHÔNG bị gate và cả hai tầng đều cạn.

## Kiểm thử

- `npm run build` + lint sạch (trang là server component thuần, không unit test).
- Verify browser (user test riêng, dọn sau): 4 trạng thái — (a) có cả ôn + mới,
  (b) chỉ ôn (quota đạt), (c) chỉ mới (không thẻ đến hạn), (d) cạn cả hai → dòng 🎉.
