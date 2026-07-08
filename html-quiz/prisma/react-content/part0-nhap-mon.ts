import type { ReactSeedTag } from "./types";

const PART = "Nhập môn";

// Phần 0 — Nhập môn: vì sao cần React khi đã có HTML/CSS/JS.
export const PART0_NHAP_MON: ReactSeedTag[] = [
  {
    name: "vì sao cần react",
    topic: "Nhập môn",
    part: PART,
    description: "Thư viện dựng UI theo COMPONENT tái sử dụng — giao diện tự cập nhật theo dữ liệu",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Nghe đồng nghiệp bảo 'dự án này viết bằng React' — React thực chất là gì?",
        options: ["Thư viện JavaScript để dựng giao diện theo component", "Một ngôn ngữ thay thế HTML", "Một trình duyệt mới", "Một hệ điều hành"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trang bán hàng có 50 card sản phẩm giống hệt nhau về khung (ảnh, tên, giá, nút Mua). Với React, bạn xử lý thế nào?",
        options: ["Viết MỘT component card rồi tái sử dụng 50 lần với dữ liệu khác nhau", "Chép tay 50 khối HTML giống nhau", "Chụp ảnh một card rồi dán 50 lần", "Dùng 50 file HTML riêng"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "'Component' trong React hiểu đơn giản là gì?",
        options: ["Một mảnh giao diện độc lập, tái sử dụng được (nút, card, thanh menu...)", "Một file ảnh", "Một bảng dữ liệu", "Một máy chủ"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Điểm mạnh cốt lõi của React so với tự thao tác DOM bằng JS thuần là gì?",
        options: ["Chỉ cần đổi DỮ LIỆU, React tự cập nhật giao diện khớp theo", "React không cần JavaScript", "React chạy không cần trình duyệt", "React tự thiết kế giao diện đẹp thay người dùng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Giỏ hàng hiện số lượng ở 3 nơi (menu, banner, footer). Với JS thuần phải tự sửa cả 3 chỗ mỗi lần thay đổi; với React thì sao?",
        options: ["Cả 3 nơi cùng đọc một dữ liệu — dữ liệu đổi là cả 3 tự cập nhật", "Vẫn phải sửa tay 3 chỗ như cũ", "React chỉ cho hiện số ở một nơi", "Phải tải lại trang mới thấy số mới"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "JSX — cú pháp viết 'HTML trong JavaScript' của React — tồn tại để làm gì?",
        options: ["Mô tả giao diện ngay trong code JS cho dễ đọc, gần với HTML quen thuộc", "Thay thế hoàn toàn CSS", "Mã hóa code để bảo mật", "Làm code chạy chậm lại cho dễ debug"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt: "Component đầu tiên: viết function component tên ChaoReact trả về một thẻ <p> chứa nội dung React sẵn sàng. Khi render, kết quả HTML phải là <p>React sẵn sàng</p>.",
        requirements: [
          { type: "contains", text: "ChaoReact", message: "Đặt tên component là ChaoReact" },
          { type: "construct", construct: "function", message: "Khai báo bằng function" },
          {
            type: "renders",
            component: "ChaoReact",
            htmlEquals: "<p>React sẵn sàng</p>",
            message: "Render ChaoReact phải ra <p>React sẵn sàng</p>",
          },
        ],
        starterCode: "function ChaoReact() {\n  // trả về JSX ở đây\n}\n",
      },
    ],
  },
];
