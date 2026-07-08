# UX trả lời một chạm + tự chuyển câu

Ngày: 2026-07-08
Trạng thái: Đã duyệt thiết kế.

## Yêu cầu (đã chốt với người dùng)

1. **MCQ một chạm**: bấm đáp án = nộp luôn, bỏ nút "Trả lời" cho MCQ. Câu gõ code
   giữ cách nộp hiện tại (Enter / nút).
2. **Tự chuyển câu** sau khi feedback hiện (câu JS/JSX tính từ lúc Worker chấm xong):
   - đúng → **3s**; sai MCQ → **5s**; sai câu gõ code → **7s**.
   - Nút "Câu tiếp theo →" giữ nguyên, hiện đếm ngược "(Ns)" + thanh thời gian thu
     ngắn; bấm nút hoặc Enter = qua ngay (clear timer). Câu cuối tự chốt phiên.
3. Phạm vi: `/study` (study/page.tsx) + `/practice` (practice-game.tsx).
   `/reflex` KHÔNG đụng (đã có timer riêng).

## Kỹ thuật

- Thuần client, không đổi API/chấm điểm.
- MCQ: onClick option → set selected + submit ngay (guard đang submitting/feedback).
- Auto-advance: khi `feedback` xuất hiện → `setTimeout(next, delayMs)`;
  `delayMs = correct ? 3000 : (isCode ? 7000 : 5000)`. Clear timeout khi next thủ
  công / unmount / đổi câu. Đếm ngược hiển thị bằng state giây còn lại (interval 1s)
  hoặc CSS animation width theo delay.
- Enter đã gắn sẵn cho next — giữ.

## Kiểm thử

- Verify browser 4 nhánh: đúng-MCQ tự qua sau ~3s; sai-MCQ ~5s; sai-câu-code ~7s;
  bấm nút/Enter qua ngay. MCQ không còn nút "Trả lời". /practice hành xử tương tự.
- Câu cuối phiên: hết giờ tự hiện tổng kết phiên.
- Lint + build sạch.

## Ngoài phạm vi
- /reflex, chấm điểm, API, số giây tùy chỉnh trong Settings.
