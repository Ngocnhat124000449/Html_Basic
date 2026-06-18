import type { JsSeedTag } from "./types";

const PART = "Luồng & Hàm";

// PHẦN 2 — Luồng & Hàm: điều kiện (if/else, else if, ?:, switch),
// vòng lặp (for, while, break/continue, for...of), hàm (khai báo, tham số/return,
// arrow, mặc định, scope, hàm gọi hàm).
// Bậc 3 dùng nhiều requirement ĐỘNG (returns/logs) — chạy thật trong Web Worker (client).
export const PART2_LUONG_HAM: JsSeedTag[] = [
  // ===== CHƯƠNG 6: ĐIỀU KIỆN =====
  {
    name: "if else",
    topic: "Điều kiện",
    part: PART,
    description: "Rẽ nhánh: chạy code khi điều kiện đúng, else khi sai",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn hiện 'Miễn phí ship' khi tổng đơn ≥ 500k, ngược lại tính phí. Dùng cấu trúc nào?",
        options: ["if...else", "vòng for", "switch luôn", "while"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Form đăng nhập cần: nếu nhập đúng thì cho vào trang. Câu điều kiện cơ bản trong JS viết theo cú pháp nào?",
        options: ["if (điều_kiện) { ... }", "if điều_kiện then ...", "when (đk) { ... }", "if [đk] { ... }"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đăng nhập: mật khẩu đúng thì vào trang, ngược lại báo lỗi. Phần 'ngược lại' là khối else — nó chạy khi nào?",
        options: ["Khi điều kiện của if là false", "Luôn chạy", "Khi if đúng", "Không bao giờ chạy"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn viết if (tuoi >= 18). Biểu thức bên trong if (...) sau khi đánh giá nên cho ra kiểu gì?",
        options: ["boolean (true/false)", "luôn là số", "luôn là chuỗi", "một mảng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "if (diem) { ... } với diem = 0 thì khối if có chạy không?",
        options: [
          "Không — 0 là giá trị falsy nên điều kiện coi như false",
          "Có, vì 0 vẫn là một giá trị",
          "Lỗi cú pháp",
          "Luôn chạy bất kể giá trị",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để code điều kiện dễ đọc, nên tránh điều gì?",
        options: [
          "Lồng if quá sâu — nên dùng else if hoặc tách hàm",
          "Dùng dấu { }",
          "Đặt tên biến rõ ràng",
          "Viết chú thích",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Dấu { } quanh thân if khi chỉ có 1 lệnh thì sao?",
        options: [
          "Không bắt buộc nhưng NÊN có để tránh bug khi thêm dòng",
          "Bắt buộc, thiếu là lỗi",
          "Cấm dùng khi 1 lệnh",
          "Chỉ cấm khi nhiều lệnh",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          'Viết hàm kiemTra(diem) trả về chuỗi "đỗ" nếu diem >= 5, ngược lại trả về "trượt".',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "kiemTra", message: "Tên hàm là kiemTra" },
          { type: "construct", construct: "if", message: "Dùng if" },
          { type: "contains", text: "return", message: "Dùng return để trả giá trị" },
          { type: "returns", call: "kiemTra(8)", equals: "đỗ", message: 'kiemTra(8) phải trả "đỗ"' },
          { type: "returns", call: "kiemTra(3)", equals: "trượt", message: 'kiemTra(3) phải trả "trượt"' },
        ],
        starterCode:
          'function kiemTra(diem) {\n  // dùng if so sánh diem >= 5\n  // return "đỗ" hoặc return "trượt"\n}\n',
      },
    ],
  },
  {
    name: "else if",
    topic: "Điều kiện",
    part: PART,
    description: "Nhiều nhánh loại trừ nhau nối tiếp bằng else if",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Xếp hạng thành viên theo điểm với nhiều mốc loại trừ nhau (Vàng/Bạc/Đồng). Dùng cấu trúc nào?",
        options: ["Chuỗi if...else if", "Nhiều vòng for", "Một biến duy nhất", "Một câu if đơn"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Xếp loại học lực Giỏi / Khá / Trung bình theo nhiều mức điểm loại trừ nhau. Dùng cấu trúc nào?",
        options: [
          "Chuỗi if / else if / else",
          "Nhiều if rời rạc luôn tốt hơn",
          "Bắt buộc switch",
          "Vòng for",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một điểm số đi qua chuỗi if / else if / else. Cuối cùng có bao nhiêu nhánh thực sự được chạy?",
        options: ["Tối đa MỘT — nhánh đúng đầu tiên", "Tất cả nhánh đúng", "Luôn đúng 2 nhánh", "Không nhánh nào"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong chuỗi rẽ nhánh, khối else (không kèm if) để 'bắt' mọi trường hợp còn lại nên đặt ở đâu?",
        options: ["Cuối cùng, bắt mọi trường hợp còn lại", "Đầu tiên", "Ở giữa", "Lặp lại nhiều lần"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thứ tự các nhánh else if có quan trọng không?",
        options: [
          "Có — nhánh đúng đầu tiên sẽ chạy, nên xếp điều kiện hẹp/cao trước",
          "Không bao giờ quan trọng",
          "Chỉ quan trọng với số",
          "JS tự sắp xếp lại",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Phân loại điểm A/B/C theo ngưỡng nên đặt điều kiện thế nào?",
        options: [
          "Từ cao xuống thấp: >= 9 ra A, rồi >= 7 ra B, còn lại C",
          "Từ thấp lên cao",
          "Thứ tự ngẫu nhiên",
          "Chỉ dùng === cho từng điểm",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nếu các điều kiện KHÔNG loại trừ nhau mà vẫn dùng if/else if thì rủi ro gì?",
        options: [
          "Chỉ nhánh khớp đầu tiên chạy, có thể bỏ sót trường hợp khác cũng đúng",
          "Không có rủi ro gì",
          "Tất cả nhánh đều chạy",
          "Luôn báo lỗi cú pháp",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          'Viết hàm xepLoai(diem): trả "A" nếu diem >= 9, "B" nếu diem >= 7, còn lại trả "C".',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "xepLoai", message: "Tên hàm là xepLoai" },
          { type: "contains", text: "else if", message: "Dùng else if cho nhánh giữa" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "xepLoai(9)", equals: "A", message: 'xepLoai(9) phải trả "A"' },
          { type: "returns", call: "xepLoai(7)", equals: "B", message: 'xepLoai(7) phải trả "B"' },
          { type: "returns", call: "xepLoai(4)", equals: "C", message: 'xepLoai(4) phải trả "C"' },
        ],
        starterCode:
          'function xepLoai(diem) {\n  // dùng if / else if / else\n  // return "A", "B" hoặc "C"\n}\n',
      },
    ],
  },
  {
    name: "toán tử 3 ngôi",
    topic: "Điều kiện",
    part: PART,
    description: "Rẽ nhánh ngắn gọn dạng biểu thức: điều_kiện ? a : b",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn gán nhanh: nhan = diem >= 5 ? 'Đạt' : 'Trượt' gọn trong một dòng. Đó là toán tử gì?",
        options: ["Toán tử 3 ngôi ? :", "Toán tử && ", "Vòng for", "switch"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn gán nhanh một biến theo điều kiện chỉ trong một dòng. Cú pháp toán tử 3 ngôi (ternary) là gì?",
        options: ["dk ? a : b", "dk ? a , b", "if dk a else b", "dk => a : b"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: 'const a = (x > 0) ? "dương" : "không dương" nghĩa là gì?',
        options: [
          'x > 0 thì a = "dương", ngược lại a = "không dương"',
          'a luôn là "dương"',
          "Báo lỗi",
          "a là một boolean",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Toán tử 3 ngôi thường dùng thay cho cấu trúc nào?",
        options: ["if/else đơn giản để GÁN một giá trị", "vòng lặp", "switch nhiều nhánh", "try/catch"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi nào KHÔNG nên dùng toán tử 3 ngôi?",
        options: [
          "Khi logic phức tạp hoặc lồng nhiều tầng — khó đọc, nên dùng if",
          "Khi gán một giá trị đơn giản",
          "Khi cần trả về boolean",
          "Lúc nào cũng nên dùng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "const phi = tuoi >= 60 ? 0 : 50000 làm gì?",
        options: [
          "Người từ 60 tuổi miễn phí (0), còn lại 50000",
          "Luôn gán 50000",
          "Luôn gán 0",
          "Báo lỗi",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao gọi toán tử 3 ngôi là một BIỂU THỨC?",
        options: [
          "Vì nó trả về MỘT trong hai giá trị để gán/dùng tiếp",
          "Vì nó chỉ chạy lệnh, không trả giá trị",
          "Vì nó chỉ in ra màn hình",
          "Vì nó luôn trả mảng",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm phi(tuoi) dùng toán tử 3 ngôi ` ? : `: trả 0 nếu tuoi >= 60, ngược lại trả 50000.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "phi", message: "Tên hàm là phi" },
          { type: "contains", text: "?", message: "Dùng toán tử 3 ngôi (?)" },
          { type: "contains", text: ":", message: "Dùng toán tử 3 ngôi (:)" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "phi(65)", equals: 0, message: "phi(65) phải trả 0" },
          { type: "returns", call: "phi(30)", equals: 50000, message: "phi(30) phải trả 50000" },
        ],
        starterCode: "function phi(tuoi) {\n  // return <điều kiện> ? 0 : 50000\n}\n",
      },
    ],
  },
  {
    name: "switch",
    topic: "Điều kiện",
    part: PART,
    description: "Chọn nhánh theo giá trị cụ thể bằng switch/case",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Hiển thị tên thứ theo số 1..7 (nhiều giá trị cụ thể rời rạc). Cấu trúc nào gọn nhất?",
        options: ["switch/case", "Hàng chục if lồng nhau", "vòng for", "while"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Hiển thị tên thứ theo mã 'T2', 'T3', 'T4'... So MỘT giá trị với nhiều trường hợp cụ thể — switch dùng để làm gì?",
        options: [
          "So MỘT giá trị với nhiều case cụ thể",
          "Lặp lại nhiều lần",
          "Khai báo biến",
          "Định nghĩa hàm",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để một case trong switch khỏi 'chạy lan' xuống case bên dưới, nó (nếu không return) thường kết thúc bằng từ khóa nào?",
        options: ["break", "stop", "end", "exit"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong switch, nhánh 'bắt' mọi trường hợp còn lại là default. Nó tương ứng với gì trong if?",
        options: ["else — chạy khi không case nào khớp", "if đầu tiên", "break", "case 0"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thiếu break trong một case dẫn tới hiện tượng gì?",
        options: [
          "Fall-through: chạy lan sang các case kế tiếp",
          "Lỗi cú pháp",
          "Bỏ qua cả switch",
          "Tự nhảy tới default",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "switch so khớp case bằng kiểu so sánh nào?",
        options: ["=== (chặt, cả kiểu)", "== (lỏng)", "chỉ so số", "theo thứ tự bảng chữ cái"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi nào nên ưu tiên switch hơn if/else if?",
        options: [
          "Khi so CÙNG MỘT biến với nhiều giá trị rời rạc, cố định",
          "Khi điều kiện là khoảng (>=, <)",
          "Lúc nào cũng nên",
          "Khi duyệt mảng",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          'Viết hàm loaiNgay(day) dùng switch: trả "Cuối tuần" nếu day là "T7" hoặc "CN", còn lại (default) trả "Trong tuần".',
        requirements: [
          { type: "contains", text: "switch", message: "Dùng switch" },
          { type: "contains", text: "loaiNgay", message: "Tên hàm là loaiNgay" },
          { type: "contains", text: "return", message: "Dùng return trong các case" },
          { type: "returns", call: 'loaiNgay("T7")', equals: "Cuối tuần", message: 'loaiNgay("T7") phải trả "Cuối tuần"' },
          { type: "returns", call: 'loaiNgay("CN")', equals: "Cuối tuần", message: 'loaiNgay("CN") phải trả "Cuối tuần"' },
          { type: "returns", call: 'loaiNgay("T2")', equals: "Trong tuần", message: 'loaiNgay("T2") phải trả "Trong tuần"' },
        ],
        starterCode:
          'function loaiNgay(day) {\n  // switch (day) với case "T7", case "CN"\n  // return "Cuối tuần" hoặc "Trong tuần"\n}\n',
      },
    ],
  },

  // ===== CHƯƠNG 7: VÒNG LẶP =====
  {
    name: "vòng for",
    topic: "Vòng lặp",
    part: PART,
    description: "Lặp một số lần xác định bằng for",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn in ra 10 dòng sản phẩm giả lập (lặp đúng 10 lần đã biết trước). Dùng vòng nào?",
        options: ["for", "while(true)", "if", "switch"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn lặp đúng 10 lần để in 10 dòng số thứ tự. Cú pháp vòng for cơ bản là gì?",
        options: [
          "for (let i = 0; i < n; i++) { ... }",
          "for i in n { ... }",
          "for (i; n) { ... }",
          "loop n { ... }",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Ba phần trong dấu () của for theo đúng thứ tự là gì?",
        options: [
          "khởi tạo ; điều kiện ; cập nhật",
          "điều kiện ; khởi tạo ; cập nhật",
          "cập nhật ; điều kiện ; khởi tạo",
          "tên ; giá trị ; bước nhảy",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cuối mỗi vòng lặp bạn viết i++ để biến đếm nhích lên. i++ nghĩa là gì?",
        options: ["Tăng i lên 1", "Giảm i đi 1", "Nhân i với 2", "Gán i = 1"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "for (let i = 0; i < 3; i++) chạy bao nhiêu lần?",
        options: ["3 lần (i = 0, 1, 2)", "4 lần", "2 lần", "Vô hạn"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Quên viết phần cập nhật i++ thì điều gì xảy ra?",
        options: [
          "Vòng lặp vô hạn vì điều kiện luôn đúng",
          "Chạy đúng 1 lần",
          "Lỗi cú pháp",
          "Bỏ qua vòng lặp",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lặp từ 1 đến n (bao gồm cả n) thì viết điều kiện thế nào?",
        options: ["i = 1; i <= n; i++", "i = 0; i < n; i++", "i = 1; i < n; i++", "i = 0; i <= n; i++"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Dùng vòng for in các số từ 1 đến 5, mỗi số một dòng, bằng console.log.",
        requirements: [
          { type: "construct", construct: "for", message: "Dùng vòng for" },
          { type: "contains", text: "console.log", message: "In bằng console.log" },
          { type: "logs", equals: "1\n2\n3\n4\n5", message: "Phải in lần lượt 1,2,3,4,5 mỗi số một dòng" },
        ],
        starterCode:
          "// lặp i từ 1 đến 5, mỗi vòng console.log(i)\nfor (let i = 1; i <= 5; i++) {\n\n}\n",
      },
    ],
  },
  {
    name: "vòng while",
    topic: "Vòng lặp",
    part: PART,
    description: "Lặp tới khi điều kiện thành false (chưa biết trước số lần)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn lặp hỏi mật khẩu TỚI KHI người dùng nhập đúng (chưa biết trước số lần). Dùng vòng nào?",
        options: ["while", "for đúng 1 lần", "switch", "if"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lặp lại tới khi người dùng nhập đúng mật khẩu (chưa biết trước mấy lần). Cú pháp vòng while là gì?",
        options: ["while (điều_kiện) { ... }", "while: ...", "loop while ...", "while [đk] ..."],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn đặt while (conLai > 0). Thân vòng while chạy khi nào?",
        options: ["Khi điều kiện còn true", "Khi điều kiện false", "Đúng 1 lần", "Không bao giờ"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Vòng while cứ chạy mãi không dừng. Để nó dừng được, trong thân vòng cần làm gì?",
        options: [
          "Cập nhật biến để điều kiện cuối cùng thành false",
          "Không cần làm gì",
          "Luôn phải có break",
          "Phải có return",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác biệt chính giữa for và while?",
        options: [
          "for hợp khi biết trước số lần; while hợp khi lặp tới khi điều kiện đổi",
          "Hai cái giống hệt nhau",
          "while luôn nhanh hơn",
          "for không lặp được",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "do...while khác while ở điểm nào?",
        options: [
          "Chạy thân ÍT NHẤT 1 lần TRƯỚC khi kiểm tra điều kiện",
          "Không bao giờ chạy thân",
          "Chỉ dùng cho số",
          "Giống hệt for",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nguyên nhân phổ biến nhất gây while lặp vô hạn là gì?",
        options: [
          "Quên cập nhật biến điều kiện trong thân",
          "Dùng let",
          "Có console.log",
          "Có break",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm tongDen(n) dùng while, trả về tổng các số từ 1 đến n. Ví dụ tongDen(5) = 15.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "construct", construct: "while", message: "Dùng vòng while" },
          { type: "contains", text: "tongDen", message: "Tên hàm là tongDen" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "tongDen(5)", equals: 15, message: "tongDen(5) phải trả 15" },
          { type: "returns", call: "tongDen(3)", equals: 6, message: "tongDen(3) phải trả 6" },
        ],
        starterCode:
          "function tongDen(n) {\n  let tong = 0;\n  let i = 1;\n  // dùng while (i <= n): cộng dồn vào tong rồi tăng i\n  // return tong\n}\n",
      },
    ],
  },
  {
    name: "break & continue",
    topic: "Vòng lặp",
    part: PART,
    description: "Dừng sớm (break) hoặc bỏ qua vòng hiện tại (continue)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đang duyệt danh sách, tìm thấy món cần thì muốn DỪNG vòng lặp ngay. Dùng từ khóa nào?",
        options: ["break", "continue", "return", "stop"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đang duyệt danh sách, vừa tìm thấy món cần nên muốn dừng tìm luôn. break trong vòng lặp làm gì?",
        options: ["Thoát khỏi vòng lặp ngay lập tức", "Bỏ qua 1 vòng", "Khởi động lại vòng lặp", "Không làm gì"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đang duyệt danh sách, gặp món hết hàng muốn bỏ qua và xét ngay món tiếp theo. continue làm gì?",
        options: [
          "Bỏ qua phần còn lại của vòng hiện tại, sang vòng kế tiếp",
          "Thoát hẳn vòng lặp",
          "Dừng chương trình",
          "Lặp lại từ vòng đầu",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tìm thấy phần tử cần và muốn dừng tìm ngay thì dùng gì?",
        options: ["break", "continue", "luôn dùng return", "while"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "break trong vòng lặp LỒNG sẽ thoát mấy lớp?",
        options: ["Chỉ lớp gần nhất chứa nó", "Tất cả các lớp", "Lớp ngoài cùng", "Không thoát lớp nào"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "continue thường dùng trong tình huống nào?",
        options: [
          "Bỏ qua các phần tử KHÔNG thỏa điều kiện rồi xử lý phần còn lại",
          "Khi muốn dừng hẳn vòng lặp",
          "Khi khai báo biến",
          "Khi return giá trị",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lạm dụng break/continue tùy tiện có thể gây ra điều gì?",
        options: [
          "Luồng logic khó theo dõi, dễ nhầm",
          "Lỗi cú pháp",
          "Vòng lặp chạy nhanh hơn",
          "Mất biến cục bộ",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Dùng vòng for từ 1 đến 10: nếu số chẵn thì continue (bỏ qua), ngược lại console.log số đó. Kết quả in ra các số lẻ.",
        requirements: [
          { type: "construct", construct: "for", message: "Dùng vòng for" },
          { type: "contains", text: "continue", message: "Dùng continue để bỏ qua số chẵn" },
          { type: "contains", text: "console.log", message: "In bằng console.log" },
          { type: "logs", equals: "1\n3\n5\n7\n9", message: "Phải in các số lẻ 1,3,5,7,9 mỗi số một dòng" },
        ],
        starterCode:
          "for (let i = 1; i <= 10; i++) {\n  // nếu i chẵn (i % 2 === 0) → continue\n  // ngược lại console.log(i)\n}\n",
      },
    ],
  },
  {
    name: "for...of",
    topic: "Vòng lặp",
    part: PART,
    description: "Lặp qua từng phần tử của mảng/chuỗi gọn gàng",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn duyệt qua TỪNG sản phẩm trong mảng giohang để in tên, gọn nhất. Dùng cú pháp nào?",
        options: ["for (const sp of giohang)", "for (i=0; i<n; i++) thủ công", "while", "switch"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lặp qua từng phần tử của mảng arr theo cách hiện đại dùng cú pháp nào?",
        options: [
          "for (const x of arr) { ... }",
          "for (const x = arr) { ... }",
          "for arr as x { ... }",
          "loop arr { ... }",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn viết for (const x of arr). Mỗi vòng, x nhận được cái gì của mảng?",
        options: ["Giá trị từng phần tử", "Chỉ số (index)", "Độ dài mảng", "Tên thuộc tính"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn duyệt qua từng ký tự của một chuỗi để xử lý. for...of dùng được với chuỗi không?",
        options: ["Có — duyệt từng ký tự", "Không dùng được", "Chỉ với mảng số", "Chỉ với object"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác biệt giữa for...of và for...in?",
        options: [
          "of: lấy GIÁ TRỊ phần tử (mảng); in: lấy KHÓA/chỉ số (thường cho object)",
          "Hai cái giống nhau",
          "of dùng cho object",
          "in luôn nhanh hơn",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Muốn lấy cả chỉ số lẫn giá trị khi dùng for...of thì sao?",
        options: [
          "Dùng arr.entries(): for (const [i, x] of arr.entries())",
          "Dùng arr.index()",
          "Chuyển sang for...in",
          "Không lấy được",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "for...of có ưu điểm gì so với for cổ điển khi duyệt mảng?",
        options: [
          "Gọn, không phải tự quản lý chỉ số i",
          "Luôn nhanh hơn nhiều",
          "Lặp ngược tự động",
          "Tự lọc phần tử",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm tong(arr) trả về tổng các số trong mảng arr (gợi ý: dùng for...of). Ví dụ tong([1, 2, 3]) = 6.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "construct", construct: "for", message: "Dùng vòng lặp (for...of)" },
          { type: "contains", text: "tong", message: "Tên hàm là tong" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "tong([1, 2, 3])", equals: 6, message: "tong([1,2,3]) phải trả 6" },
          { type: "returns", call: "tong([10, 20])", equals: 30, message: "tong([10,20]) phải trả 30" },
        ],
        starterCode:
          "function tong(arr) {\n  let s = 0;\n  // for (const x of arr) cộng x vào s\n  // return s\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 8: HÀM =====
  {
    name: "khai báo hàm",
    topic: "Hàm",
    part: PART,
    description: "Định nghĩa khối code tái sử dụng bằng từ khóa function",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đoạn tính tổng tiền được dùng lại ở nhiều nơi. Nên gói nó vào đâu để tái sử dụng?",
        options: ["Một hàm (function)", "Một biến const", "Một vòng for", "Một file CSS"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khai báo một hàm tên chao dùng từ khóa nào?",
        options: ["function", "def", "func", "fn"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gọi (chạy) hàm chao đã định nghĩa viết thế nào?",
        options: ["chao()", "chao", "call chao", "run chao"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cùng đoạn code tính tiền được dùng ở nhiều nơi. Gói nó vào một hàm thì lợi ích chính là gì?",
        options: [
          "Đóng gói code để TÁI SỬ DỤNG nhiều lần",
          "Làm chương trình chạy nhanh hơn",
          "Thay thế cho biến",
          "Tự động sửa lỗi",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bạn lỡ gọi tinhTong() ở dòng TRÊN chỗ khai báo nó bằng function. Nhờ hoisting, việc đó có chạy được không?",
        options: [
          "Có — gọi được cả trước dòng khai báo",
          "Không bao giờ",
          "Chỉ trong hàm khác",
          "Chỉ với arrow function",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hàm chỉ console.log một thông báo mà quên viết return. Gọi nó nhận lại giá trị gì?",
        options: ["undefined", "null", "0", "chuỗi rỗng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt tên hàm nên theo nguyên tắc nào?",
        options: [
          "Động từ mô tả việc nó làm, vd tinhTong, layTen",
          "Chỉ một chữ cái",
          "Càng ngắn càng tốt bất kể nghĩa",
          "Bắt đầu bằng số",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm chao() in ra "Xin chào" bằng console.log, rồi GỌI hàm chao() để chạy.',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "chao", message: "Tên hàm là chao" },
          { type: "contains", text: "console.log", message: "In bằng console.log" },
          { type: "contains", text: "Xin chào", message: 'In đúng nội dung "Xin chào"' },
          { type: "logs", equals: "Xin chào", message: 'Phải in ra "Xin chào" (nhớ gọi chao())' },
        ],
        starterCode:
          'function chao() {\n  // in "Xin chào" bằng console.log\n}\n\n// đừng quên gọi hàm:\nchao();\n',
      },
    ],
  },
  {
    name: "tham số & return",
    topic: "Hàm",
    part: PART,
    description: "Truyền dữ liệu vào hàm (tham số) và lấy kết quả ra (return)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Hàm tinhTong cần NHẬN danh sách giá và TRẢ kết quả ra ngoài. Dùng cặp khái niệm nào?",
        options: ["Tham số và return", "class và new", "import và export", "try và catch"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn hàm cong nhận vào hai số a và b để cộng. Tham số của hàm được khai báo ở đâu?",
        options: [
          "Trong dấu () khi định nghĩa: function f(a, b)",
          "Trong thân hàm",
          "Sau lệnh return",
          "Trong dấu []",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Hàm tính xong tổng và cần đưa kết quả ra ngoài cho nơi gọi dùng tiếp. Lệnh return làm gì?",
        options: [
          "Trả giá trị ra cho nơi gọi và kết thúc hàm",
          "Chỉ in giá trị ra console",
          "Lặp lại hàm",
          "Khai báo một biến",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khi gọi f(2, 3) thì 2 và 3 được gọi là gì?",
        options: ["Đối số (arguments) truyền vào", "Tham số khai báo", "Biến toàn cục", "Giá trị trả về"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Code đặt SAU lệnh return trong hàm thì sao?",
        options: [
          "Không chạy — return kết thúc hàm ngay",
          "Vẫn chạy bình thường",
          "Chạy sau cùng",
          "Báo lỗi cú pháp",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một hàm có thể nhận bao nhiêu tham số?",
        options: ["Nhiều tham số, cách nhau dấu phẩy", "Tối đa 1", "Tối đa 2", "Không có tham số nào"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau cốt lõi giữa return và console.log?",
        options: [
          "return đưa giá trị RA để dùng tiếp; console.log chỉ in ra để xem",
          "Chúng giống hệt nhau",
          "return chỉ in ra",
          "console.log trả giá trị về",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm cong(a, b) trả về tổng a + b. Ví dụ cong(2, 3) = 5.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "cong", message: "Tên hàm là cong" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "contains", text: "+", message: "Dùng phép cộng +" },
          { type: "returns", call: "cong(2, 3)", equals: 5, message: "cong(2,3) phải trả 5" },
          { type: "returns", call: "cong(10, 7)", equals: 17, message: "cong(10,7) phải trả 17" },
        ],
        starterCode: "function cong(a, b) {\n  // return tổng a + b\n}\n",
      },
    ],
  },
  {
    name: "arrow function",
    topic: "Hàm",
    part: PART,
    description: "Cú pháp hàm ngắn gọn với =>",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn viết hàm ngắn gọn để truyền vào .map() bằng cú pháp =>. Đó là loại hàm gì?",
        options: ["Arrow function", "Generator", "Class", "Callback duy nhất"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gán một arrow function vào biến viết thế nào?",
        options: [
          "const f = (a) => a + 1;",
          "const f = (a) -> a + 1;",
          "const f = function => a;",
          "arrow f(a) { a + 1 }",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Arrow function một dòng KHÔNG có {} thì có cần return không?",
        options: [
          "Không — tự trả giá trị của biểu thức (implicit return)",
          "Luôn cần return",
          "Không bao giờ trả giá trị",
          "Cần thêm dấu ;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "(x) => x * 2 là gì?",
        options: [
          "Một hàm nhận x và trả về x * 2",
          "Khai báo biến x",
          "Phép nhân toàn cục",
          "Một lỗi cú pháp",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Arrow chỉ nhận đúng 1 tham số thì có thể bỏ dấu () không?",
        options: ["Có: x => x * 2", "Không bao giờ", "Phải có đúng 2 tham số", "Bắt buộc {} bao thân"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Arrow có thân NHIỀU DÒNG thì cần gì để trả giá trị?",
        options: [
          "Dùng {} bao thân và return tường minh",
          "Không cần gì",
          "Tự return mọi thứ",
          "Thêm dấu ?",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Điểm khác biệt quan trọng của arrow so với function thường là gì?",
        options: [
          "Arrow không có 'this' riêng — kế thừa this từ ngữ cảnh bao ngoài",
          "Arrow chạy nhanh hơn nhiều",
          "Arrow không nhận tham số",
          "Arrow không return được",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết một arrow function gán vào const x2, nhận n và trả về n * 2. Ví dụ x2(5) = 10.",
        requirements: [
          { type: "construct", construct: "arrow", message: "Dùng arrow function (=>)" },
          { type: "contains", text: "x2", message: "Tên biến hàm là x2" },
          { type: "contains", text: "*", message: "Dùng phép nhân *" },
          { type: "returns", call: "x2(5)", equals: 10, message: "x2(5) phải trả 10" },
          { type: "returns", call: "x2(0)", equals: 0, message: "x2(0) phải trả 0" },
        ],
        starterCode: "// arrow gán vào const x2, nhận n, trả n * 2\n// const x2 = (n) => ... ;\n",
      },
    ],
  },
  {
    name: "tham số mặc định",
    topic: "Hàm",
    part: PART,
    description: "Giá trị mặc định cho tham số khi nơi gọi không truyền",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Hàm chao(ten) muốn khi không truyền tên thì mặc định là 'bạn'. Dùng kỹ thuật nào?",
        options: ["Tham số mặc định: chao(ten = 'bạn')", "try/catch", "Một câu if rất dài", "Biến toàn cục"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đặt giá trị mặc định cho tham số x là 10 viết thế nào?",
        options: ["function f(x = 10) {}", "function f(x := 10) {}", "function f(x default 10) {}", "function f(x | 10) {}"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Với function f(x = 5), gọi f() (không truyền) thì x bằng bao nhiêu?",
        options: ["5", "undefined", "0", "null"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Hàm chao(ten) khi gọi mà quên truyền ten sẽ bị undefined. Tham số mặc định giúp ích gì?",
        options: [
          "Tránh undefined khi thiếu đối số",
          "Bắt buộc phải truyền đủ",
          "Tăng tốc độ chạy",
          "Khai báo biến toàn cục",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Với function f(a, b = 2), gọi f(10) thì a và b là gì?",
        options: ["a = 10, b = 2", "a = 2, b = 10", "Cả hai undefined", "Báo lỗi"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Giá trị mặc định được áp dụng khi đối số là gì?",
        options: ["undefined (không truyền hoặc truyền undefined)", "null", "0", "chuỗi rỗng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tham số có giá trị mặc định nên đặt ở vị trí nào?",
        options: [
          "Cuối danh sách tham số",
          "Đầu tiên",
          "Giữa các tham số bắt buộc",
          "Bất kỳ đâu, không ảnh hưởng",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          'Viết hàm chao(ten = "bạn") trả về chuỗi "Xin chào " ghép với ten. chao() = "Xin chào bạn", chao("An") = "Xin chào An".',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "chao", message: "Tên hàm là chao" },
          { type: "contains", text: "=", message: 'Đặt tham số mặc định ten = "bạn"' },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "contains", text: "Xin chào", message: 'Ghép với chuỗi "Xin chào "' },
          { type: "returns", call: "chao()", equals: "Xin chào bạn", message: 'chao() phải trả "Xin chào bạn"' },
          { type: "returns", call: 'chao("An")', equals: "Xin chào An", message: 'chao("An") phải trả "Xin chào An"' },
        ],
        starterCode:
          'function chao(ten = "bạn") {\n  // return chuỗi "Xin chào " ghép với ten\n}\n',
      },
    ],
  },
  {
    name: "phạm vi biến",
    topic: "Hàm",
    part: PART,
    description: "Scope: biến trong hàm/block không 'rò' ra ngoài",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Biến khai báo bằng let BÊN TRONG một hàm có dùng được ở ngoài hàm không?",
        options: [
          "Không — nó chỉ sống trong phạm vi hàm",
          "Có, dùng được ở mọi nơi",
          "Chỉ khi là số",
          "Tùy trình duyệt",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Biến khai báo bằng let bên trong một hàm thấy được ở đâu?",
        options: ["Chỉ trong hàm đó", "Mọi nơi trong file", "Trong hàm khác", "Toàn cục"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Biến khai báo NGOÀI mọi hàm gọi là gì?",
        options: ["Biến toàn cục (global)", "Biến cục bộ", "Tham số", "Hằng số"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bên trong một hàm có truy cập được biến toàn cục không?",
        options: [
          "Có (nếu không bị che bởi biến cùng tên bên trong)",
          "Không bao giờ",
          "Chỉ với biến số",
          "Chỉ với hằng số",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hai hàm khác nhau cùng có biến let x thì sao?",
        options: [
          "Độc lập — mỗi x thuộc scope riêng, không ảnh hưởng nhau",
          "Xung đột gây lỗi",
          "Dùng chung một giá trị",
          "Ghi đè lẫn nhau",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên hạn chế dùng biến toàn cục?",
        options: [
          "Dễ bị sửa nhầm từ nhiều nơi, gây bug khó tìm",
          "Vì chạy chậm hơn",
          "Vì không khai báo được",
          "Vì trình duyệt cấm",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Block scope nghĩa là biến let/const sống trong phạm vi nào?",
        options: ["Cặp { } gần nhất chứa nó", "Cả file", "Cả hàm bất kể { }", "Toàn cục"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm dem() có biến CỤC BỘ let n = 0, cộng n thêm 1 rồi return n. Vì n cục bộ nên mỗi lần gọi dem() đều trả 1.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "construct", construct: "let", message: "Khai báo biến cục bộ bằng let" },
          { type: "contains", text: "dem", message: "Tên hàm là dem" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "dem()", equals: 1, message: "dem() phải trả 1" },
        ],
        starterCode:
          "function dem() {\n  let n = 0;\n  // cộng n thêm 1 rồi return n\n}\n",
      },
    ],
  },
  {
    name: "hàm gọi hàm",
    topic: "Hàm",
    part: PART,
    description: "Phối hợp nhiều hàm nhỏ; khái niệm hàm thuần",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một hàm dựng trang gọi lần lượt layDuLieu(), tinhTong(), veBieuDo(). Cách tổ chức này gọi là gì?",
        options: ["Phối hợp nhiều hàm nhỏ", "Đệ quy vô hạn", "Một vòng lặp", "Ép kiểu"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gọi hàm b() bên trong hàm a() có được không?",
        options: ["Có — hàm gọi hàm khác là bình thường", "Không được", "Chỉ gọi 1 lần", "Phải cùng tên"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Chia bài toán lớn thành nhiều hàm nhỏ giúp gì?",
        options: [
          "Dễ đọc, dễ test, dễ tái sử dụng",
          "Luôn chạy chậm hơn",
          "Luôn tốn bộ nhớ hơn",
          "Là bắt buộc của cú pháp",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Kết quả return của một hàm có thể truyền làm đối số cho hàm khác không?",
        options: ["Có: f(g(x))", "Không", "Chỉ với số", "Phải lưu vào biến trước đã"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: '"Hàm thuần" (pure function) là gì?',
        options: [
          "Cùng đầu vào luôn cho cùng đầu ra, không gây tác dụng phụ",
          "Hàm không có tham số",
          "Hàm có in ra màn hình",
          "Hàm khai báo toàn cục",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao hàm thuần dễ test?",
        options: [
          "Chỉ cần so đầu ra với đầu vào, không phụ thuộc trạng thái ngoài",
          "Vì nó luôn ngắn",
          "Vì nó có console.log",
          "Vì nó dùng var",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tách logic lặp lại thành một hàm riêng giúp tuân theo nguyên tắc nào?",
        options: [
          "DRY (Don't Repeat Yourself) — sửa một chỗ là xong",
          "Lặp lại càng nhiều càng tốt",
          "Luôn dùng biến toàn cục",
          "Tránh dùng return",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm binhPhuong(n) trả về n * n, và hàm tongBinhPhuong(a, b) trả về binhPhuong(a) + binhPhuong(b). Ví dụ tongBinhPhuong(2, 3) = 13.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "binhPhuong", message: "Có hàm binhPhuong" },
          { type: "contains", text: "tongBinhPhuong", message: "Có hàm tongBinhPhuong" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "binhPhuong(4)", equals: 16, message: "binhPhuong(4) phải trả 16" },
          { type: "returns", call: "tongBinhPhuong(2, 3)", equals: 13, message: "tongBinhPhuong(2,3) phải trả 13" },
        ],
        starterCode:
          "function binhPhuong(n) {\n  // return n * n\n}\n\nfunction tongBinhPhuong(a, b) {\n  // dùng binhPhuong(a) và binhPhuong(b) rồi return tổng\n}\n",
      },
    ],
  },
];
