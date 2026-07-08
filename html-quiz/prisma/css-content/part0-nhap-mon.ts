import type { CssSeedTag } from "./types";

const PART = "Nhập môn";

// Phần 0 — Nhập môn: khái niệm "CSS là gì, vì sao cần" cho người bắt đầu từ số 0.
export const PART0_NHAP_MON: CssSeedTag[] = [
  {
    name: "css là gì",
    topic: "Nhập môn",
    part: PART,
    description: "CSS tô kiểu cho HTML — tách phần trình bày khỏi phần cấu trúc",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trang bán hàng của bạn có đủ chữ và ảnh nhưng trông trơ trụi toàn chữ đen nền trắng. Ngôn ngữ nào dùng để tô màu, chỉnh cỡ chữ, sắp bố cục cho đẹp?",
        options: ["CSS", "HTML", "Excel", "SQL"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong bộ ba làm web, vai trò của CSS là gì?",
        options: ["Trình bày: màu sắc, cỡ chữ, khoảng cách, bố cục", "Cấu trúc: tiêu đề, đoạn văn, nút", "Hành vi: xử lý khi bấm nút", "Lưu trữ dữ liệu người dùng"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "CSS hoạt động bằng cách nào?",
        options: ["Chọn các phần tử HTML rồi áp quy tắc trang trí lên chúng", "Thay thế hoàn toàn file HTML", "Vẽ trang bằng ảnh chụp", "Dịch HTML sang ngôn ngữ máy"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên tách phần trang trí ra CSS thay vì viết lẫn vào từng thẻ HTML?",
        options: ["Đổi giao diện cả trang chỉ cần sửa một chỗ, HTML gọn và dễ đọc", "Vì HTML không cho phép trang trí", "Vì CSS chạy nhanh hơn HTML", "Vì trình duyệt bắt buộc phải có file CSS"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Xóa toàn bộ CSS khỏi một trang tin tức thì chuyện gì xảy ra?",
        options: ["Nội dung vẫn còn đủ nhưng mất kiểu dáng — chữ đen nền trắng xếp dọc", "Trang trắng hoàn toàn, mất hết nội dung", "Trang không mở được nữa", "Ảnh biến mất còn chữ giữ nguyên màu"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Cùng một file HTML, thay bộ CSS khác thì kết quả ra sao?",
        options: ["Giao diện đổi hẳn dù nội dung không đổi — vì CSS chỉ lo phần trình bày", "Nội dung chữ bị thay đổi theo", "Trình duyệt báo lỗi trùng file", "Không có gì thay đổi"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "Lần đầu tô kiểu: HTML có sẵn tiêu đề. Viết MỘT rule CSS chọn thẻ h1 và đặt màu chữ red.",
        requirements: [
          { type: "selector", value: "h1" },
          { type: "value", selector: "h1", name: "color", value: "red" },
        ],
        starterCode: "/* HTML căn cứ:\n<h1>Chào CSS</h1>\n*/\n",
      },
    ],
  },
];
