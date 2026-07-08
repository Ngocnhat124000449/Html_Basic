import type { DsaSeedTag } from "./types";

const PART = "Nhập môn";

// Phần 0 — Nhập môn: "cấu trúc dữ liệu / giải thuật là gì" bằng ví dụ đời thường.
export const PART0_NHAP_MON: DsaSeedTag[] = [
  {
    name: "cấu trúc dữ liệu là gì",
    topic: "Nhập môn",
    part: PART,
    description: "Cách TỔ CHỨC dữ liệu để tìm/thêm/xóa thuận tiện — như kệ sách hay hàng chờ",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "'Cấu trúc dữ liệu' nghĩa là gì?",
        options: ["Cách tổ chức, sắp xếp dữ liệu để thao tác thuận tiện", "Tên một phần mềm vẽ sơ đồ", "Cách đặt tên file cho gọn", "Một loại máy tính chuyên dụng"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Hàng người xếp trước quầy thu ngân — ai đến trước phục vụ trước. Hình ảnh đời thường này giống cấu trúc dữ liệu nào?",
        options: ["Hàng đợi (queue)", "Chồng đĩa (stack)", "Bảng tính", "Cây thư mục"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Chồng đĩa trong bếp — cái đặt lên SAU CÙNG được lấy ra TRƯỚC TIÊN. Hình ảnh này giống cấu trúc dữ liệu nào?",
        options: ["Ngăn xếp (stack)", "Hàng đợi (queue)", "Danh bạ điện thoại", "Lịch để bàn"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao lập trình viên phải chọn cấu trúc dữ liệu phù hợp thay vì nhét tất cả vào một danh sách?",
        options: ["Mỗi cấu trúc mạnh ở thao tác khác nhau — chọn đúng thì code nhanh và gọn hơn", "Vì danh sách bị cấm trong JavaScript", "Vì máy tính chỉ đọc được một kiểu dữ liệu", "Để file nặng hơn cho chuyên nghiệp"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Danh sách 30 sản phẩm trong giỏ hàng, cần giữ THỨ TỰ thêm vào và duyệt lần lượt. Kiểu dữ liệu JavaScript nào tự nhiên nhất?",
        options: ["Mảng (array)", "Một biến số duy nhất", "Một chuỗi dài nối tên bằng dấu cách", "30 biến rời rạc sp1..sp30"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tra cứu 'mã sinh viên → họ tên' cho tiện, dữ liệu dạng CẶP khóa-giá trị. Cách tổ chức nào hợp?",
        options: ["Object/Map — tra theo khóa trực tiếp", "Mảng rồi duyệt từ đầu mỗi lần tra", "Ghi ra giấy", "Một chuỗi khổng lồ"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Bài khởi động: viết hàm layDau(arr) trả về PHẦN TỬ ĐẦU TIÊN của mảng arr. Ví dụ layDau([5,7,9]) trả về 5, layDau([\"na\",\"cam\"]) trả về na.",
        requirements: [
          { type: "contains", text: "layDau", message: "Đặt tên hàm là layDau" },
          { type: "returns", call: "layDau([5,7,9])", equals: 5, message: "layDau([5,7,9]) phải trả về 5" },
          { type: "returns", call: 'layDau(["na","cam"])', equals: "na", message: 'layDau(["na","cam"]) phải trả về "na"' },
        ],
        starterCode: "// Trả về phần tử đầu của arr\nfunction layDau(arr) {\n  \n}\n",
      },
    ],
  },
  {
    name: "giải thuật là gì",
    topic: "Nhập môn",
    part: PART,
    description: "Dãy BƯỚC rõ ràng, hữu hạn để giải một bài toán — như công thức nấu ăn",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "'Giải thuật' (algorithm) nghĩa là gì?",
        options: ["Dãy bước rõ ràng, làm theo là ra kết quả", "Một loại máy tính", "Tên một ngôn ngữ lập trình", "Phần cứng xử lý đồ họa"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Công thức nấu phở ghi từng bước: ninh xương → chần bánh → chan nước. Trong lập trình, thứ tương tự được gọi là gì?",
        options: ["Giải thuật", "Cấu trúc dữ liệu", "Trình duyệt", "Cơ sở dữ liệu"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một giải thuật tốt cần tính chất nào sau đây?",
        options: ["Các bước rõ ràng và phải KẾT THÚC sau hữu hạn bước", "Càng dài càng tốt", "Chỉ chạy được trên một máy duy nhất", "Không ai hiểu được trừ tác giả"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tìm số lớn nhất trong dãy điểm thi: 'giữ số lớn nhất tạm thời, duyệt từng số, gặp số lớn hơn thì thay'. Đây là gì?",
        options: ["Một giải thuật — dãy bước rõ ràng cho bài toán", "Một cấu trúc dữ liệu", "Một lỗi cú pháp", "Một thư viện đồ họa"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Cùng bài toán 'tìm tên trong danh bạ 1000 số': cách A lật từng trang; cách B mở giữa sổ rồi loại một nửa mỗi lần. Nhận xét đúng?",
        options: ["Cùng bài toán có nhiều giải thuật, nhanh chậm khác nhau", "Chỉ tồn tại đúng một cách giải", "Cách nào cũng mất thời gian như nhau", "Cách B là gian lận"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao học DSA giúp viết web tốt hơn?",
        options: ["Chọn cách tổ chức dữ liệu + bước xử lý hợp lý làm trang nhanh và code gọn", "Vì DSA thay thế được HTML", "Vì thiếu DSA thì trình duyệt không chạy", "Chỉ để trả lời phỏng vấn, không dùng thật"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Giải thuật 2 bước: viết hàm tongHaiSo(a, b) trả về tổng của a và b. Ví dụ tongHaiSo(3, 4) trả về 7, tongHaiSo(10, -2) trả về 8.",
        requirements: [
          { type: "contains", text: "tongHaiSo", message: "Đặt tên hàm là tongHaiSo" },
          { type: "returns", call: "tongHaiSo(3,4)", equals: 7, message: "tongHaiSo(3, 4) phải trả về 7" },
          { type: "returns", call: "tongHaiSo(10,-2)", equals: 8, message: "tongHaiSo(10, -2) phải trả về 8" },
        ],
        starterCode: "// Trả về tổng a + b\nfunction tongHaiSo(a, b) {\n  \n}\n",
      },
    ],
  },
];
