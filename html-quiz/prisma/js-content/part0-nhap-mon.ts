import type { JsSeedTag } from "./types";

const PART = "Nhập môn";

// Phần 0 — Nhập môn: khái niệm "JavaScript là gì, chương trình chạy thế nào".
export const PART0_NHAP_MON: JsSeedTag[] = [
  {
    name: "javascript là gì",
    topic: "Nhập môn",
    part: PART,
    description: "Mảnh 'hành vi' trong bộ ba HTML/CSS/JS — làm trang web phản ứng với người dùng",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trang của bạn có nút 'Thêm vào giỏ' nhưng bấm không có gì xảy ra. Ngôn ngữ nào giúp trang PHẢN ỨNG khi người dùng bấm nút?",
        options: ["JavaScript", "HTML", "CSS", "PDF"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong bộ ba làm web, vai trò của JavaScript là gì?",
        options: ["Hành vi: xử lý sự kiện, tính toán, đổi nội dung động", "Cấu trúc nội dung trang", "Tô màu và dàn bố cục", "Nén ảnh cho nhẹ"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Code JavaScript của một trang web thường chạy ở đâu?",
        options: ["Ngay trong trình duyệt của người xem", "Chỉ trên máy chủ của Google", "Trong file Excel", "Trong máy in"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Điểm khác cốt lõi giữa JavaScript và HTML/CSS là gì?",
        options: ["JS là ngôn ngữ LẬP TRÌNH (có biến, điều kiện, vòng lặp); HTML/CSS chỉ mô tả", "JS chỉ chạy trên điện thoại", "JS không dùng được với HTML", "JS là bản nâng cấp của CSS"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Trang thương mại điện tử hiện 'Giỏ hàng: 3 sản phẩm' và số này tăng ngay khi bạn bấm mua. Phần việc đó do ai đảm nhiệm?",
        options: ["JavaScript — đọc sự kiện bấm rồi cập nhật nội dung", "HTML — vì số nằm trong thẻ", "CSS — vì số có màu đỏ", "Trình duyệt tự đoán"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Không có JavaScript, trang web sẽ như thế nào?",
        options: ["Vẫn hiện nội dung + kiểu dáng nhưng thành trang 'tĩnh', ít tương tác", "Trắng hoàn toàn", "Mất hết màu sắc", "Không mở được trên điện thoại"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Câu lệnh JavaScript đầu tiên: dùng console.log in ra dòng chữ Xin chào JavaScript.",
        requirements: [
          { type: "contains", text: "console.log", message: "Dùng console.log để in" },
          { type: "contains", text: "Xin chào JavaScript", message: "In đúng nội dung 'Xin chào JavaScript'" },
        ],
        starterCode: "// In ra console dòng: Xin chào JavaScript\n",
      },
    ],
  },
  {
    name: "chương trình & lệnh",
    topic: "Nhập môn",
    part: PART,
    description: "Chương trình = dãy lệnh chạy tuần tự từ trên xuống; lỗi là chuyện bình thường",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một CHƯƠNG TRÌNH JavaScript về bản chất là gì?",
        options: ["Dãy các câu lệnh được máy thực hiện lần lượt", "Một tấm ảnh động", "Một bảng tính", "Một file nén"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Máy thực hiện các câu lệnh trong file theo thứ tự nào (khi không có điều khiển gì đặc biệt)?",
        options: ["Từ trên xuống dưới, mỗi lần một lệnh", "Ngẫu nhiên", "Từ dưới lên trên", "Chạy tất cả cùng lúc"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Code báo đỏ 'SyntaxError' ngay lần chạy đầu. Phản ứng đúng của người học là gì?",
        options: ["Đọc thông báo lỗi để tìm chỗ sai — lỗi là một phần bình thường của lập trình", "Xóa hết code làm lại từ đầu không đọc lỗi", "Cài lại trình duyệt", "Kết luận mình không hợp với lập trình"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Chạy hai lệnh: console.log(\"A\") rồi console.log(\"B\"). Console hiện gì?",
        options: ["A trước rồi B — vì lệnh chạy tuần tự", "B trước rồi A", "Chỉ hiện B vì lệnh sau đè lệnh trước", "Hai chữ trộn thành AB trên một lệnh"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một dòng bị lỗi ở giữa file thì các lệnh phía SAU nó thường ra sao?",
        options: ["Không chạy nữa — chương trình dừng tại chỗ lỗi", "Vẫn chạy hết bình thường", "Chạy nhưng với tốc độ chậm hơn", "Tự sửa lỗi rồi chạy tiếp"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Muốn xem code của mình in gì / lỗi gì khi chạy trong trình duyệt, bạn mở công cụ nào?",
        options: ["Console trong DevTools (F12)", "Notepad", "Task Manager", "Control Panel"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết HAI câu lệnh in theo đúng thứ tự: dòng thứ nhất in Bước 1, dòng thứ hai in Bước 2 (dùng console.log).",
        requirements: [
          { type: "contains", text: "console.log", message: "Dùng console.log để in" },
          { type: "contains", text: "Bước 1", message: "Có dòng in 'Bước 1'" },
          { type: "contains", text: "Bước 2", message: "Có dòng in 'Bước 2'" },
          { type: "logs", equals: "Bước 1\nBước 2", message: "Console phải hiện Bước 1 rồi Bước 2" },
        ],
        starterCode: "// In lần lượt: Bước 1 rồi Bước 2\n",
      },
    ],
  },
];
