import type { DsaSeedTag } from "./types";

const PART = "Big-O";

// PHẦN 3 — Big-O (Tuần 13): notation, time/space, so sánh & tối ưu.
// Bậc 3 là BÀI TỐI ƯU O(n²)→O(n): chạy thật cho đúng kết quả + static contains
// ép dùng cấu trúc nhanh (Set). Giá trị grader kiểm hiện nguyên văn trong đề.
export const PART3_BIG_O: DsaSeedTag[] = [
  // ===== CHƯƠNG 10: BIG-O NOTATION =====
  {
    name: "big-o notation",
    topic: "Big-O notation",
    part: PART,
    description: "Đọc hiểu ký hiệu độ phức tạp",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Sếp hỏi 'thuật toán này còn chạy nhanh khi dữ liệu tăng gấp đôi không?'. Ký hiệu nào dùng để trả lời về độ phức tạp?",
        options: ["Big-O", "RGB", "HTTP", "JSON"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Big-O dùng để mô tả điều gì?",
        options: [
          "Tốc độ tăng chi phí khi dữ liệu lớn dần",
          "Màu sắc của giao diện",
          "Số dòng code đã viết",
          "Phiên bản trình duyệt",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Độ phức tạp O(1) nghĩa là gì?",
        options: [
          "Chi phí không đổi dù dữ liệu lớn cỡ nào",
          "Chi phí tăng theo n",
          "Chi phí tăng theo n²",
          "Luôn luôn chậm",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong các mức sau, mức nào TỐT (tăng chậm) nhất khi n lớn?",
        options: ["O(1)", "O(n)", "O(n²)", "O(n log n)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sắp theo tốc độ tăng từ ÍT đến NHIỀU, thứ tự nào đúng?",
        options: [
          "O(1) < O(log n) < O(n) < O(n²)",
          "O(n²) < O(n) < O(1)",
          "O(n) < O(1) < O(log n)",
          "O(log n) < O(1) < O(n)",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Big-O bỏ hằng số và số hạng nhỏ: vậy 3n + 5 được viết gọn thành?",
        options: ["O(n)", "O(3n+5)", "O(3n)", "O(5)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tổng O(n²) + O(n) khi n lớn được rút gọn thành gì?",
        options: ["O(n²) — giữ số hạng trội nhất", "O(n)", "O(n³)", "O(2n²)"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Đoạn chậm dùng hai vòng lặp lồng (O(n²)) để xem mảng có phần tử TRÙNG không. Viết lại hàm coTrung(arr) cho nhanh hơn — O(n) bằng Set — trả về true/false. Ví dụ: coTrung([1,2,3]) trả về false; coTrung([1,2,2]) trả về true.",
        requirements: [
          { type: "contains", text: "coTrung", message: "Đặt tên hàm là coTrung" },
          { type: "contains", text: "Set", message: "Dùng Set để đạt O(n)" },
          { type: "returns", call: "coTrung([1,2,3])", equals: false, message: "coTrung([1,2,3]) phải trả về false" },
          { type: "returns", call: "coTrung([1,2,2])", equals: true, message: "coTrung([1,2,2]) phải trả về true" },
        ],
        starterCode:
          "// Cách chậm O(n²): for i { for j { if (arr[i]===arr[j] && i!==j) ... } }\n// Viết lại O(n) dùng new Set():\nfunction coTrung(arr) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 11: TIME & SPACE COMPLEXITY =====
  {
    name: "time & space",
    topic: "Time & Space complexity",
    part: PART,
    description: "Phân biệt chi phí thời gian và bộ nhớ",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một thuật toán chạy rất nhanh nhưng ngốn nhiều RAM để lưu bảng tạm. Đánh đổi này thuộc về hai loại chi phí nào?",
        options: [
          "Thời gian và bộ nhớ (time & space)",
          "Màu sắc và font chữ",
          "Mạng và pin",
          "CPU và màn hình",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Time complexity (độ phức tạp thời gian) đo điều gì?",
        options: [
          "Số phép tính tăng thế nào theo dữ liệu",
          "Dung lượng ổ cứng còn trống",
          "Số màu hiển thị trên màn hình",
          "Tốc độ đường truyền mạng",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Space complexity (độ phức tạp bộ nhớ) đo điều gì?",
        options: [
          "Lượng bộ nhớ thêm cần dùng theo dữ liệu",
          "Số dòng code",
          "Thời gian tải trang",
          "Số biến toàn cục cố định",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo một mảng MỚI có n phần tử thì tốn bộ nhớ (space) cỡ bao nhiêu?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một vòng lặp duyệt n phần tử và chỉ dùng vài biến đếm. Time và space là gì?",
        options: ["Time O(n), space O(1)", "Time O(1), space O(n)", "Cả hai O(n²)", "Cả hai O(1)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đánh đổi time–space (time–space tradeoff) nghĩa là gì?",
        options: [
          "Dùng thêm bộ nhớ để chạy nhanh hơn (vd cache, Set)",
          "Luôn tiết kiệm được cả hai",
          "Bỏ qua cả thời gian lẫn bộ nhớ",
          "Tăng cả hai cùng lúc",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hai vòng for LỒNG nhau, mỗi vòng chạy n bước, có time complexity là?",
        options: ["O(n²)", "O(n)", "O(2n)", "O(log n)"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Cách chậm: với mỗi phần tử lại duyệt cả mảng để đếm (O(n²)). Viết lại hàm demLap(arr, x) đếm số lần x xuất hiện trong arr bằng MỘT vòng lặp (O(n)). Ví dụ: demLap([1,2,2,3], 2) trả về 2; demLap([1,1,1], 5) trả về 0.",
        requirements: [
          { type: "contains", text: "demLap", message: "Đặt tên hàm là demLap" },
          { type: "returns", call: "demLap([1,2,2,3],2)", equals: 2, message: "demLap([1,2,2,3], 2) phải trả về 2" },
          { type: "returns", call: "demLap([1,1,1],5)", equals: 0, message: "demLap([1,1,1], 5) phải trả về 0" },
        ],
        starterCode: "// Đếm số lần x xuất hiện trong arr bằng MỘT vòng lặp (O(n))\nfunction demLap(arr, x) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 12: SO SÁNH & TỐI ƯU =====
  {
    name: "so sánh & tối ưu",
    topic: "So sánh & tối ưu",
    part: PART,
    description: "Chọn cách nhanh hơn cho cùng bài toán",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Vòng lặp lồng nhau kiểm tra trùng (O(n²)) chạy chậm với 10.000 phần tử. Hướng tối ưu thường dùng là gì?",
        options: [
          "Dùng Set/Map để giảm còn O(n)",
          "Thêm nhiều vòng lặp hơn",
          "In ra console nhiều hơn",
          "Đổi tên biến cho gọn",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cùng tìm 1 phần tử trên mảng CHƯA sắp xếp thì nên dùng cách nào?",
        options: ["Tìm tuyến tính O(n)", "Tìm nhị phân O(log n)", "Bubble sort", "Map.set"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cùng tìm 1 phần tử trên mảng ĐÃ sắp xếp và rất lớn thì ưu tiên cách nào?",
        options: ["Tìm nhị phân O(log n)", "Tìm tuyến tính O(n)", "Hai vòng lồng O(n²)", "Đảo ngược mảng"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cần kiểm tra 'đã tồn tại chưa' rất nhiều lần thì nên dùng gì?",
        options: ["Set với has() O(1)", "Mảng với includes() O(n)", "Hai vòng lồng nhau", "Một chuỗi nối dài"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Với n = 1.000.000, cách nào xử lý nhanh hơn rõ rệt?",
        options: ["O(n) thay vì O(n²)", "O(n²) thay vì O(n)", "O(n³) thay vì O(n)", "Như nhau cả"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi tối ưu code, nên bắt đầu từ đâu để có hiệu quả lớn nhất?",
        options: [
          "Giảm độ phức tạp thuật toán (vd O(n²) → O(n))",
          "Đổi tên biến cho đẹp",
          "Xóa hết comment",
          "Gộp tất cả vào một dòng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi n RẤT NHỎ (vd chỉ 5 phần tử) thì khác biệt Big-O thế nào?",
        options: [
          "Thường không đáng kể",
          "O(n²) vẫn luôn sập",
          "Bắt buộc phải dùng nhị phân",
          "Bắt buộc phải dùng Map",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Cách chậm: với mỗi phần tử của a lại includes() trên b (O(n·m)). Viết lại hàm giaoNhau(a, b) trả về SỐ phần tử CHUNG của hai mảng, dùng Set cho nhanh. Ví dụ: giaoNhau([1,2,3],[2,3,4]) trả về 2; giaoNhau([1,2],[3,4]) trả về 0.",
        requirements: [
          { type: "contains", text: "giaoNhau", message: "Đặt tên hàm là giaoNhau" },
          { type: "contains", text: "Set", message: "Dùng Set để tra nhanh O(1)" },
          { type: "returns", call: "giaoNhau([1,2,3],[2,3,4])", equals: 2, message: "giaoNhau([1,2,3],[2,3,4]) phải trả về 2" },
          { type: "returns", call: "giaoNhau([1,2],[3,4])", equals: 0, message: "giaoNhau([1,2],[3,4]) phải trả về 0" },
        ],
        starterCode:
          "// Đưa b vào new Set() rồi đếm phần tử của a có trong Set (O(n+m))\nfunction giaoNhau(a, b) {\n  \n}\n",
      },
    ],
  },
];
