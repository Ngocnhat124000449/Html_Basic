import type { DsaSeedTag } from "./types";

const PART = "Giải thuật";

// PHẦN 2 — Giải thuật (Tuần 12): linear/binary search, bubble sort & sort(), đệ quy.
// Bậc 3 CHẠY THẬT nhiều ca test; mảng coerce về scalar trong `call` (.join(',') /
// lấy chỉ số). Giá trị grader kiểm (equals, tên hàm) hiện nguyên văn trong đề.
export const PART2_GIAI_THUAT: DsaSeedTag[] = [
  // ===== CHƯƠNG 6: TÌM KIẾM TUYẾN TÍNH =====
  {
    name: "tìm kiếm tuyến tính",
    topic: "Tìm kiếm tuyến tính",
    part: PART,
    description: "Duyệt lần lượt từng phần tử để tìm",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Tìm kiếm tuyến tính (linear search) hoạt động thế nào?",
        options: [
          "Duyệt lần lượt từng phần tử cho tới khi gặp",
          "Nhảy vào giữa rồi chia đôi liên tục",
          "Sắp xếp trước rồi đoán vị trí",
          "Tra theo khóa tức thì",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Phương thức mảng nào trả về CHỈ SỐ phần tử đầu tiên khớp (hoặc -1)?",
        options: ["indexOf()", "includes()", "push()", "slice()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tìm kiếm tuyến tính KHÔNG đòi hỏi điều gì ở dữ liệu?",
        options: ["Không cần dữ liệu đã sắp xếp", "Bắt buộc đã sắp xếp", "Bắt buộc toàn số", "Bắt buộc không trùng lặp"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Độ phức tạp ở trường hợp xấu nhất của tìm kiếm tuyến tính trên n phần tử là?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi nào tìm kiếm tuyến tính là lựa chọn hợp lý?",
        options: [
          "Khi dữ liệu nhỏ hoặc chưa được sắp xếp",
          "Luôn tốt hơn nhị phân trong mọi trường hợp",
          "Chỉ khi dữ liệu đã sắp xếp",
          "Khi cần độ phức tạp O(1)",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Phương thức indexOf trả về gì khi không tìm thấy phần tử?",
        options: ["-1", "0", "null", "undefined"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm viTri(arr, x) trả về CHỈ SỐ đầu tiên của x trong mảng arr, hoặc -1 nếu không có. Ví dụ: viTri([7,8,9], 8) trả về 1; viTri([7,8,9], 5) trả về -1.",
        requirements: [
          { type: "contains", text: "viTri", message: "Đặt tên hàm là viTri" },
          { type: "returns", call: "viTri([7,8,9],8)", equals: 1, message: "viTri([7,8,9], 8) phải trả về 1" },
          { type: "returns", call: "viTri([7,8,9],5)", equals: -1, message: "viTri([7,8,9], 5) phải trả về -1" },
        ],
        starterCode: "// Duyệt arr tìm x, trả về chỉ số hoặc -1\nfunction viTri(arr, x) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 7: TÌM KIẾM NHỊ PHÂN =====
  {
    name: "tìm kiếm nhị phân",
    topic: "Tìm kiếm nhị phân",
    part: PART,
    description: "Chia đôi liên tục trên mảng đã sắp xếp",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Tìm kiếm nhị phân (binary search) ĐÒI HỎI điều gì ở mảng?",
        options: ["Mảng phải đã được sắp xếp", "Mảng phải có số chẵn phần tử", "Mảng không được trùng lặp", "Mảng phải là chuỗi"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Mỗi bước của tìm kiếm nhị phân làm gì?",
        options: [
          "So với phần tử ở giữa rồi bỏ đi một nửa",
          "Duyệt lần lượt từng phần tử",
          "Đảo ngược cả mảng",
          "Cộng dồn các phần tử",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trên mảng đã sắp xếp 1.000.000 phần tử, tìm nhị phân cần tối đa khoảng bao nhiêu bước?",
        options: ["Khoảng 20 bước", "Khoảng 1.000.000 bước", "Khoảng 1.000 bước", "Đúng 2 bước"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Độ phức tạp của tìm kiếm nhị phân là?",
        options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nhị phân nhanh hơn tuyến tính trên dữ liệu lớn đã sắp xếp?",
        options: [
          "Mỗi bước loại bỏ được một nửa số ứng viên",
          "Vì nó không cần vòng lặp",
          "Vì bắt buộc dùng đệ quy",
          "Vì luôn chạy O(1)",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nếu mảng CHƯA sắp xếp mà vẫn áp dụng tìm nhị phân thì sao?",
        options: ["Kết quả có thể sai", "Vẫn luôn đúng", "Tự động sắp xếp giúp", "Báo lỗi cú pháp"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm timNhiPhan(arr, x) tìm CHỈ SỐ của x trong mảng arr ĐÃ SẮP XẾP TĂNG dần, hoặc -1 nếu không có. Ví dụ: timNhiPhan([1,3,5,7,9], 7) trả về 3; timNhiPhan([1,3,5,7,9], 4) trả về -1.",
        requirements: [
          { type: "contains", text: "timNhiPhan", message: "Đặt tên hàm là timNhiPhan" },
          { type: "returns", call: "timNhiPhan([1,3,5,7,9],7)", equals: 3, message: "timNhiPhan(..., 7) phải trả về 3" },
          { type: "returns", call: "timNhiPhan([1,3,5,7,9],4)", equals: -1, message: "timNhiPhan(..., 4) phải trả về -1" },
        ],
        starterCode:
          "// Tìm nhị phân: so phần tử giữa rồi bỏ một nửa\nfunction timNhiPhan(arr, x) {\n  let lo = 0, hi = arr.length - 1;\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 8: SẮP XẾP =====
  {
    name: "sắp xếp",
    topic: "Sắp xếp",
    part: PART,
    description: "Bubble sort và sort() của JavaScript",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bubble sort (sắp xếp nổi bọt) sắp xếp bằng cách nào?",
        options: [
          "Đổi chỗ các cặp kề nhau sai thứ tự, lặp nhiều lượt",
          "Chia đôi rồi trộn lại",
          "Tra theo khóa rồi đặt chỗ",
          "Đếm phân phối các giá trị",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gọi sort() trên mảng số [10, 2, 1] mà KHÔNG truyền hàm so sánh sẽ ra sao?",
        options: [
          "Sai thứ tự vì sort() mặc định so sánh theo chuỗi",
          "Luôn đúng tăng dần",
          "Báo lỗi ngay",
          "Tự động đảo ngược mảng",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để sắp xếp số TĂNG dần đúng, truyền hàm so sánh nào cho sort()?",
        options: ["(a, b) => a - b", "(a, b) => a + b", "(a, b) => b", "() => 0"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Độ phức tạp của bubble sort ở trường hợp xấu nhất là?",
        options: ["O(n²)", "O(n)", "O(log n)", "O(1)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "sort() của JS sửa đổi mảng gốc hay tạo mảng mới?",
        options: ["Sửa đổi mảng gốc (in-place)", "Luôn tạo mảng mới", "Không thay đổi gì", "Tạo một Set mới"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để sắp xếp số GIẢM dần, hàm so sánh truyền cho sort() là gì?",
        options: ["(a, b) => b - a", "(a, b) => a - b", "(a, b) => a", "(a, b) => 0"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm sapTang(arr) trả về MẢNG MỚI gồm các số đã sắp xếp TĂNG dần (không sửa mảng gốc). Ví dụ: sapTang([3,1,2]).join(',') là '1,2,3'; sapTang([5,4]).join(',') là '4,5'.",
        requirements: [
          { type: "contains", text: "sapTang", message: "Đặt tên hàm là sapTang" },
          { type: "returns", call: "sapTang([3,1,2]).join(',')", equals: "1,2,3", message: "sapTang([3,1,2]) phải cho 1,2,3" },
          { type: "returns", call: "sapTang([5,4]).join(',')", equals: "4,5", message: "sapTang([5,4]) phải cho 4,5" },
        ],
        starterCode: "// Trả về mảng mới đã sắp tăng dần (đừng đổi arr gốc)\nfunction sapTang(arr) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 9: ĐỆ QUY =====
  {
    name: "đệ quy",
    topic: "Đệ quy",
    part: PART,
    description: "Hàm tự gọi lại chính nó",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đệ quy (recursion) là gì?",
        options: [
          "Hàm tự gọi lại chính nó để giải bài nhỏ hơn",
          "Một vòng lặp for chạy ngược",
          "Một loại mảng đặc biệt",
          "Một cách khai báo biến",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Thành phần BẮT BUỘC để đệ quy không chạy mãi mãi là gì?",
        options: ["Điều kiện dừng (base case)", "Một vòng while", "Một biến toàn cục", "Một câu try/catch"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Điều gì xảy ra nếu hàm đệ quy THIẾU điều kiện dừng?",
        options: ["Tràn ngăn xếp (stack overflow)", "Trả về 0", "Chạy nhanh hơn", "Tự thêm điều kiện dừng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tính giai thừa n! bằng đệ quy thì base case thường là gì?",
        options: ["n === 0 trả về 1", "n === 100", "n nhỏ hơn -1", "Không cần base case"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "So với vòng lặp, đệ quy thường có đặc điểm gì?",
        options: [
          "Gọn và dễ đọc cho bài chia nhỏ, nhưng tốn bộ nhớ ngăn xếp",
          "Luôn chạy nhanh hơn",
          "Luôn tốn ít bộ nhớ hơn",
          "Không bao giờ dùng được trong thực tế",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mỗi lần hàm đệ quy gọi chính nó, điều gì được thêm vào?",
        options: [
          "Một khung (frame) trên call stack",
          "Một phần tử vào mảng",
          "Một khóa vào Map",
          "Một sự kiện DOM",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm đệ quy giaiThua(n) tính n giai thừa (n!). Ví dụ: giaiThua(5) trả về 120; giaiThua(0) trả về 1.",
        requirements: [
          { type: "contains", text: "giaiThua", message: "Đặt tên hàm là giaiThua" },
          { type: "returns", call: "giaiThua(5)", equals: 120, message: "giaiThua(5) phải trả về 120" },
          { type: "returns", call: "giaiThua(0)", equals: 1, message: "giaiThua(0) phải trả về 1" },
        ],
        starterCode:
          "// Đệ quy: base case n===0 trả 1, ngược lại n * giaiThua(n-1)\nfunction giaiThua(n) {\n  \n}\n",
      },
    ],
  },
];
