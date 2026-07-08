import type { GitSeedTag } from "./types";

const PART = "Nhập môn";

// Phần 0 — Nhập môn: vì sao cần quản lý phiên bản trước khi học lệnh Git cụ thể.
export const PART0_NHAP_MON: GitSeedTag[] = [
  {
    name: "vì sao cần git",
    topic: "Nhập môn",
    part: PART,
    description: "Quản lý phiên bản: lưu lịch sử từng mốc code, quay lui được, cộng tác không giẫm chân",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn có thư mục dự án đầy các bản sao: web-final.html, web-final2.html, web-final-that-su.html. Công cụ nào sinh ra để chấm dứt cảnh này?",
        options: ["Git — hệ quản lý phiên bản", "Photoshop", "PowerPoint", "Trình nén WinRAR"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Git giúp gì cho người viết code?",
        options: ["Lưu lịch sử từng mốc thay đổi và quay lại được phiên bản cũ", "Tự viết code thay người dùng", "Tăng tốc độ mạng", "Diệt virus trong máy"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Mỗi 'mốc lưu' trong lịch sử Git (kèm lời nhắn mô tả thay đổi) được gọi là gì?",
        options: ["Commit", "Copy", "Screenshot", "Backup.zip"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bạn sửa hỏng giao diện lúc 2h sáng và muốn quay về bản chạy tốt hồi chiều. Không có Git thì sao, có Git thì sao?",
        options: ["Không Git: dò sửa tay từng chỗ; có Git: quay lại commit chiều trong một lệnh", "Không Git vẫn quay lui được bằng nút Undo của trình duyệt", "Có Git cũng phải sửa tay như nhau", "Git chỉ giúp khi mất điện"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hai người cùng làm một website. Git giúp việc cộng tác thế nào?",
        options: ["Mỗi người làm trên bản của mình rồi hợp nhất, thấy rõ ai đổi gì", "Bắt buộc hai người dùng chung một máy tính", "Tự động cấm người kia sửa file", "Gửi file qua chat cho nhau mỗi giờ"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Git khác với việc chép dự án vào USB mỗi tối ở điểm nào?",
        options: ["Git lưu lịch sử có tổ chức theo từng commit kèm lời nhắn, so sánh/quay lui từng mốc", "USB lưu được nhiều dữ liệu hơn Git", "Git chỉ hoạt động khi có Internet", "Không khác gì nhau"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CMD",
        prompt: "Khởi động với Git: gõ lần lượt (mỗi lệnh một dòng) lệnh git --version để kiểm tra Git đã cài chưa, rồi lệnh git init để biến thư mục hiện tại thành kho Git.",
        requirements: [
          { type: "contains", text: "git --version", inPrompt: true, message: "Kiểm tra cài đặt bằng `git --version`" },
          { type: "contains", text: "git init", inPrompt: true, message: "Khởi tạo kho bằng `git init`" },
        ],
        starterCode: "# Mỗi lệnh trên một dòng\n",
      },
    ],
  },
];
