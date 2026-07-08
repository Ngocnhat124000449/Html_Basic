import type { ProjectSeedTag } from "./types";

const PART = "Nhập môn";

// Phần 0 — Nhập môn: quy trình ghép một trang hoàn chỉnh trước khi làm từng khối.
export const PART0_NHAP_MON: ProjectSeedTag[] = [
  {
    name: "quy trình ghép trang",
    topic: "Nhập môn",
    part: PART,
    description: "Nhìn thiết kế → chia khối → dựng HTML → tô CSS → thêm JS — làm từng bước",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Nhận một bản thiết kế trang chủ hoàn chỉnh, việc ĐẦU TIÊN nên làm là gì?",
        options: ["Nhìn tổng thể và CHIA trang thành các khối (header, nội dung, footer...)", "Viết ngay CSS cho đẹp", "Thêm hiệu ứng JavaScript trước", "Mua tên miền"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Thứ tự hợp lý khi ghép một khối giao diện là gì?",
        options: ["Dựng HTML (cấu trúc) → tô CSS (kiểu dáng) → thêm JS (tương tác)", "JS trước → CSS → HTML cuối cùng", "CSS trước rồi mới nghĩ nội dung", "Cả ba viết trộn vào một dòng"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một trang chủ thường gồm những khối lớn nào từ trên xuống?",
        options: ["Header (đầu trang) → nội dung chính → footer (chân trang)", "Footer → header → nội dung", "Chỉ có một khối duy nhất", "Menu nằm dưới footer"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên dựng đủ HTML của một khối rồi mới tô CSS, thay vì viết xen kẽ mỗi thứ một ít?",
        options: ["Có cấu trúc ổn định trước thì selector CSS bám vào không phải sửa đi sửa lại", "Vì CSS không thể viết trước HTML về mặt kỹ thuật", "Vì trình duyệt đọc CSS trước HTML", "Không có lý do, thứ tự nào cũng như nhau"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Trang có 6 card sản phẩm giống nhau về khung. Cách làm khôn ngoan là gì?",
        options: ["Làm MỘT card thật chuẩn rồi nhân bản và thay nội dung", "Làm 6 card độc lập từ đầu, mỗi cái một kiểu", "Chỉ làm 1 card, 5 cái kia để trống", "Chụp màn hình card mẫu dán vào"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khối form liên hệ hiển thị đẹp rồi nhưng bấm Gửi chưa kiểm tra dữ liệu. Bước còn thiếu thuộc tầng nào?",
        options: ["JS — tầng tương tác/kiểm tra, làm sau khi cấu trúc và kiểu dáng xong", "HTML — vì form là thẻ HTML", "CSS — thêm màu là hết lỗi", "Không tầng nào, form tự biết kiểm tra"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_STRUCTURE",
        prompt: "Bước 1 của quy trình — dựng khung một khối giới thiệu: thẻ <section> bọc ngoài, bên trong có <h2> ghi Về mình và <p> ghi Trang cá nhân đầu tiên.",
        requirements: [
          { type: "tagName", value: "section" },
          { type: "contains", parent: "section", child: "h2", count: 1 },
          { type: "contains", parent: "section", child: "p", count: 1 },
          { type: "text", tag: "h2", index: 0, value: "Về mình" },
          { type: "text", tag: "p", index: 0, value: "Trang cá nhân đầu tiên" },
        ],
        starterCode: "<!-- <section>: <h2>Về mình</h2> + <p>Trang cá nhân đầu tiên</p> -->\n",
      },
    ],
  },
];
