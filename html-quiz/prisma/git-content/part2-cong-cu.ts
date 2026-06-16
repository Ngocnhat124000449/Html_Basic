import type { GitSeedTag } from "./types";

const PART = "Công cụ dev";

// PHẦN 2 — Công cụ dev (Tuần 17): .gitignore & biến môi trường (.env), npm/pnpm
// & package.json. Bậc 3 WRITE_CMD: viết nội dung file (.gitignore) hoặc lệnh npm,
// chấm TĨNH bằng contains. Giá trị tùy ý (node_modules, .env, axios) `inPrompt`.
export const PART2_CONG_CU: GitSeedTag[] = [
  // ===== CHƯƠNG: .GITIGNORE & BIẾN MÔI TRƯỜNG =====
  {
    name: ".gitignore & .env",
    topic: ".gitignore & biến môi trường",
    part: PART,
    description: "Bỏ qua file không cần theo dõi và giữ bí mật an toàn",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "File .gitignore dùng để làm gì?",
        options: [
          "Liệt kê những file/thư mục Git nên BỎ QUA",
          "Lưu mật khẩu người dùng",
          "Ghi lịch sử commit",
          "Cấu hình màu giao diện",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Vì sao KHÔNG nên đưa file .env lên Git?",
        options: [
          "Nó thường chứa bí mật như khóa API, mật khẩu",
          "Vì nó quá nặng",
          "Vì Git không đọc được .env",
          "Vì nó làm chậm máy",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Thư mục nào dưới đây thường được cho vào .gitignore?",
        options: ["node_modules", "src", "public", "components"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Trong .gitignore, dòng node_modules/ có ý nghĩa gì?",
        options: [
          "Bỏ qua toàn bộ thư mục node_modules",
          "Chỉ bỏ qua một file tên node_modules",
          "Bắt buộc commit node_modules",
          "Xóa node_modules khỏi máy",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Biến môi trường (environment variable) thường dùng để lưu gì?",
        options: [
          "Cấu hình và bí mật khác nhau theo môi trường",
          "Mã nguồn chính của app",
          "Hình ảnh của trang",
          "Lịch sử Git",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lỡ commit file .env chứa khóa API lên GitHub công khai thì nên làm gì?",
        options: [
          "Thu hồi và đổi khóa ngay vì coi như đã lộ",
          "Không sao, cứ để vậy",
          "Đổi tên file thành .env2",
          "Xóa repo là đủ an toàn",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CMD",
        prompt:
          "Dự án có thư mục node_modules (rất nặng) và file .env (chứa bí mật) — cả hai không nên đưa lên Git. Hãy viết nội dung file .gitignore để bỏ qua cả hai (mỗi mục một dòng).",
        requirements: [
          { type: "contains", text: "node_modules", inPrompt: true, message: "Cần bỏ qua node_modules" },
          { type: "contains", text: ".env", inPrompt: true, message: "Cần bỏ qua file .env" },
        ],
        starterCode: "# Mỗi dòng một mục cần Git bỏ qua\n",
      },
    ],
  },

  // ===== CHƯƠNG: NPM & PACKAGE.JSON =====
  {
    name: "npm & package.json",
    topic: "npm & package.json",
    part: PART,
    description: "Quản lý gói, scripts và file package.json",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "npm là gì trong hệ sinh thái Node.js?",
        options: [
          "Trình quản lý gói (package manager)",
          "Một trình duyệt web",
          "Một ngôn ngữ lập trình",
          "Một hệ quản trị cơ sở dữ liệu",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "File package.json lưu giữ thông tin gì của dự án?",
        options: [
          "Tên, phiên bản, scripts và danh sách thư viện phụ thuộc",
          "Toàn bộ mã nguồn",
          "Lịch sử commit",
          "Ảnh giao diện",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lệnh nào cài tất cả thư viện đã khai báo trong package.json?",
        options: ["npm install", "npm get all", "npm download", "npm build"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lệnh npm init -y làm gì?",
        options: [
          "Tạo nhanh package.json với giá trị mặc định",
          "Cài đặt mọi thư viện",
          "Xóa package.json",
          "Đẩy code lên npm",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau cơ bản giữa npm và pnpm là gì?",
        options: [
          "pnpm tiết kiệm dung lượng nhờ chia sẻ gói giữa các dự án",
          "pnpm là một ngôn ngữ khác",
          "npm không cài được thư viện",
          "pnpm chỉ chạy trên Windows",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mục scripts trong package.json (vd 'dev', 'build') dùng để làm gì?",
        options: [
          "Đặt tên tắt cho các lệnh hay chạy",
          "Lưu mật khẩu",
          "Khai báo biến môi trường",
          "Ghi chú lịch sử",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CMD",
        prompt:
          "Bắt đầu một dự án Node mới rồi thêm thư viện axios. Hãy gõ (mỗi lệnh một dòng): lệnh tạo nhanh file package.json với cấu hình mặc định (không hỏi từng bước); rồi lệnh cài đặt thư viện axios.",
        requirements: [
          { type: "contains", text: "npm init", message: "Tạo package.json bằng `npm init`" },
          { type: "contains", text: "-y", message: "Dùng cờ -y để chấp nhận mặc định" },
          { type: "contains", text: "npm install", message: "Cài thư viện bằng `npm install`" },
          { type: "contains", text: "axios", inPrompt: true, message: "Cần cài đúng thư viện axios" },
        ],
        starterCode: "# Tạo package.json rồi cài thư viện\n",
      },
    ],
  },
];
