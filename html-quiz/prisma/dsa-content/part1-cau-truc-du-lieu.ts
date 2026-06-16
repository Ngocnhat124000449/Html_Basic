import type { DsaSeedTag } from "./types";

const PART = "Cấu trúc dữ liệu";

// PHẦN 1 — Cấu trúc dữ liệu (Tuần 11): array vs object, stack, queue, Map, Set.
// Bậc 3 (WRITE_JS) CHẠY THẬT nhiều ca test qua runner Web Worker; mảng coerce về
// scalar trong `call` (vd .join(',') / lấy phần tử). Giá trị grader kiểm (equals,
// tên hàm) đều hiện nguyên văn trong đề (quy tắc đề tự chứa).
export const PART1_CAU_TRUC_DU_LIEU: DsaSeedTag[] = [
  // ===== CHƯƠNG 1: ARRAY VS OBJECT =====
  {
    name: "array vs object",
    topic: "Array vs Object",
    part: PART,
    description: "Chọn mảng hay đối tượng cho từng bài toán",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trang shop cần lưu NHIỀU sản phẩm, mỗi sản phẩm có các trường tên và giá. Cấu trúc tổng hợp hợp lý nhất là gì?",
        options: ["Mảng các object", "Một chuỗi dài", "Một số duy nhất", "Một boolean"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn cần lưu danh sách 50 khoản chi theo đúng thứ tự nhập vào. Cấu trúc nào hợp nhất?",
        options: ["Mảng (array)", "Một số (number)", "Một chuỗi (string)", "Một boolean"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn muốn lưu thông tin MỘT người dùng gồm tên, tuổi, email. Cấu trúc nào hợp nhất?",
        options: [
          "Đối tượng (object) với các khóa name, age, email",
          "Một chuỗi nối tất cả lại",
          "Một số duy nhất",
          "Một boolean",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để lấy phần tử ĐẦU TIÊN của mảng ds, bạn viết thế nào?",
        options: ["ds[0]", "ds[1]", "ds.first", "ds(0)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Truy cập phần tử theo CHỈ SỐ trong mảng (vd ds[3]) có độ phức tạp bao nhiêu?",
        options: ["O(1) — tức thì", "O(n) — duyệt hết", "O(log n)", "O(n²)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tra một mục theo KHÓA trong object (vd nguoi['email']) nhanh cỡ nào?",
        options: ["O(1) trung bình — tra theo khóa", "O(n) — luôn duyệt hết", "O(n²)", "O(log n) luôn"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bạn cần vừa giữ THỨ TỰ vừa tra nhanh từng mục theo id. Cách kết hợp nào hợp lý?",
        options: [
          "Mảng các object, mỗi object có khóa id",
          "Chỉ một số duy nhất",
          "Chỉ một boolean",
          "Một chuỗi rất dài nối tất cả",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm tongChi(ds) nhận một MẢNG các số tiền và trả về tổng các phần tử. Ví dụ: tongChi([10,20,30]) trả về 60; tongChi([5,5]) trả về 10.",
        requirements: [
          { type: "contains", text: "tongChi", message: "Đặt tên hàm là tongChi" },
          { type: "returns", call: "tongChi([10,20,30])", equals: 60, message: "tongChi([10,20,30]) phải trả về 60" },
          { type: "returns", call: "tongChi([5,5])", equals: 10, message: "tongChi([5,5]) phải trả về 10" },
        ],
        starterCode: "// Cộng dồn các phần tử trong mảng ds rồi trả về\nfunction tongChi(ds) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 2: STACK =====
  {
    name: "stack",
    topic: "Stack (LIFO)",
    part: PART,
    description: "Ngăn xếp: vào sau ra trước (push/pop)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Tính năng 'Hoàn tác' (Undo) phải hoàn lại thao tác làm GẦN NHẤT trước tiên. Cấu trúc dữ liệu nào mô tả đúng hành vi này?",
        options: ["Stack (ngăn xếp)", "Queue (hàng đợi)", "Mảng đã sắp xếp", "Set"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Stack (ngăn xếp) hoạt động theo nguyên tắc nào?",
        options: ["LIFO — vào sau ra trước", "FIFO — vào trước ra trước", "Lấy ngẫu nhiên", "Theo bảng chữ cái"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Dùng mảng làm stack, để THÊM một phần tử lên đỉnh bạn gọi phương thức nào?",
        options: ["push()", "shift()", "unshift()", "slice()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để LẤY RA phần tử ở đỉnh stack (phần tử mới nhất), bạn gọi phương thức nào?",
        options: ["pop()", "shift()", "push()", "concat()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tính năng Undo (hoàn tác) trong trình soạn thảo hợp với cấu trúc nào nhất?",
        options: ["Stack — thao tác mới nhất được hoàn tác trước", "Queue", "Một số đơn", "Một boolean"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thao tác push() và pop() trên cuối mảng có độ phức tạp bao nhiêu?",
        options: ["O(1) — thao tác ở cuối mảng", "O(n)", "O(log n)", "O(n²)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bạn push lần lượt 1, 2, 3 vào stack rồi pop một lần. Giá trị pop ra là gì?",
        options: ["3", "1", "2", "stack rỗng"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm layDinh(ds) nhận một MẢNG dùng như stack và trả về phần tử ở ĐỈNH (mới nhất, tức cuối mảng). Ví dụ: layDinh([1,2,3]) trả về 3; layDinh([7]) trả về 7.",
        requirements: [
          { type: "contains", text: "layDinh", message: "Đặt tên hàm là layDinh" },
          { type: "returns", call: "layDinh([1,2,3])", equals: 3, message: "layDinh([1,2,3]) phải trả về 3" },
          { type: "returns", call: "layDinh([7])", equals: 7, message: "layDinh([7]) phải trả về 7" },
        ],
        starterCode: "// Trả về phần tử ở đỉnh stack (cuối mảng ds)\nfunction layDinh(ds) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 3: QUEUE =====
  {
    name: "queue",
    topic: "Queue (FIFO)",
    part: PART,
    description: "Hàng đợi: vào trước ra trước (enqueue/dequeue)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Hàng chờ in tài liệu: ai gửi lệnh in TRƯỚC thì được in TRƯỚC. Cấu trúc dữ liệu nào đúng?",
        options: ["Queue (hàng đợi)", "Stack (ngăn xếp)", "Map", "Set"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Queue (hàng đợi) hoạt động theo nguyên tắc nào?",
        options: ["FIFO — vào trước ra trước", "LIFO — vào sau ra trước", "Lấy ngẫu nhiên", "Theo độ lớn"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Dùng mảng làm queue, để LẤY phần tử ra khỏi ĐẦU hàng đợi bạn gọi gì?",
        options: ["shift()", "pop()", "push()", "reverse()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để THÊM một phần tử vào CUỐI hàng đợi bạn gọi phương thức nào?",
        options: ["push()", "shift()", "unshift()", "pop()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Xử lý các lệnh in ấn theo đúng thứ tự gửi đến hợp với cấu trúc nào?",
        options: ["Queue — ai đến trước phục vụ trước", "Stack", "Một boolean", "Một số đơn"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "shift() (lấy phần tử đầu mảng) có nhược điểm gì so với pop()?",
        options: [
          "Phải dời mọi phần tử còn lại nên tốn O(n)",
          "Không lấy được phần tử nào",
          "Luôn báo lỗi",
          "Chậm hơn đúng 1000 lần cố định",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bạn enqueue lần lượt 1, 2, 3 rồi dequeue một lần. Giá trị lấy ra là gì?",
        options: ["1", "3", "2", "hàng đợi rỗng"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm phucVu(ds) nhận MẢNG hàng đợi và trả về người ĐẦU hàng (phần tử đầu tiên). Ví dụ: phucVu([10,20,30]) trả về 10; phucVu([5]) trả về 5.",
        requirements: [
          { type: "contains", text: "phucVu", message: "Đặt tên hàm là phucVu" },
          { type: "returns", call: "phucVu([10,20,30])", equals: 10, message: "phucVu([10,20,30]) phải trả về 10" },
          { type: "returns", call: "phucVu([5])", equals: 5, message: "phucVu([5]) phải trả về 5" },
        ],
        starterCode: "// Trả về phần tử đầu hàng đợi ds\nfunction phucVu(ds) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 4: MAP =====
  {
    name: "map",
    topic: "Map",
    part: PART,
    description: "Map: gom nhóm và tra cứu theo khóa",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn cần tra nhanh 'mã sản phẩm → số tồn kho' cho hàng nghìn sản phẩm. Cấu trúc nào cho tra cứu theo khóa nhanh nhất?",
        options: ["Map", "Mảng rồi duyệt tuyến tính", "Stack", "Set"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo một Map rỗng trong JS bằng cú pháp nào?",
        options: ["new Map()", "Map[]", "{}.map()", "Map.create()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để đặt giá trị 100 cho khóa 'an' trong Map m, bạn dùng phương thức nào?",
        options: ["m.set('an', 100)", "m.add('an', 100)", "m.put('an', 100)", "m.insert('an', 100)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để lấy giá trị theo khóa 'an' từ Map m, bạn viết thế nào?",
        options: ["m.get('an')", "m.read('an')", "m.value('an')", "m.find('an')"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Map hơn object thường ở điểm nào khi gom nhóm dữ liệu?",
        options: [
          "Giữ thứ tự chèn, có .size và khóa kiểu bất kỳ",
          "Chạy nhanh gấp 100 lần trong mọi trường hợp",
          "Không cần khai báo gì",
          "Tự động sắp xếp khóa tăng dần",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để biết Map m có chứa khóa 'an' hay không, bạn dùng phương thức nào?",
        options: ["m.has('an')", "m.exists('an')", "m.contains('an')", "m.includes('an')"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Gom 1000 giao dịch theo danh mục bằng Map, mỗi lần tra/cập nhật một danh mục tốn cỡ bao nhiêu?",
        options: ["O(1) trung bình", "O(n)", "O(n²)", "O(log n) luôn"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm demDanhMuc(m, khoa) nhận một Map m và một khóa, trả về giá trị tại khóa đó, hoặc 0 nếu chưa có. Với m chứa cặp 'an' = 2: demDanhMuc(m, 'an') trả về 2; demDanhMuc(m, 'binh') trả về 0.",
        requirements: [
          { type: "contains", text: "demDanhMuc", message: "Đặt tên hàm là demDanhMuc" },
          { type: "returns", call: "demDanhMuc(new Map([['an',2]]),'an')", equals: 2, message: "Khóa có sẵn 'an' phải trả về 2" },
          { type: "returns", call: "demDanhMuc(new Map([['an',2]]),'binh')", equals: 0, message: "Khóa chưa có 'binh' phải trả về 0" },
        ],
        starterCode: "// Trả về m.get(khoa) nếu có, ngược lại trả 0\nfunction demDanhMuc(m, khoa) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 5: SET =====
  {
    name: "set",
    topic: "Set",
    part: PART,
    description: "Set: khử trùng lặp, kiểm tra tồn tại",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Danh sách email đăng ký có thể TRÙNG nhau, bạn cần lấy ra danh sách email DUY NHẤT. Cấu trúc nào hợp nhất?",
        options: ["Set", "Stack", "Queue", "Mảng giữ nguyên"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo một Set rỗng trong JS bằng cú pháp nào?",
        options: ["new Set()", "Set[]", "[].set()", "Set.new()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Set khác mảng ở điểm cốt lõi nào?",
        options: ["Không chứa phần tử trùng lặp", "Luôn đảo ngược thứ tự", "Chỉ chứa được số", "Không lặp được qua phần tử"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để kiểm tra Set s có chứa giá trị 5 hay không, bạn dùng phương thức nào?",
        options: ["s.has(5)", "s.contains(5)", "s.exists(5)", "s.find(5)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Cách nhanh gọn để KHỬ TRÙNG LẶP mảng arr là gì?",
        options: ["[...new Set(arr)]", "arr.unique()", "arr.distinct()", "arr.dedupe()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Kiểm tra tồn tại bằng Set.has() so với mảng.includes() trên dữ liệu lớn thì sao?",
        options: [
          "Set.has() nhanh hơn — O(1) trung bình so với O(n)",
          "Giống hệt nhau",
          "includes() luôn nhanh hơn",
          "Cả hai đều O(n²)",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Số phần tử của Set s được lấy bằng cách nào?",
        options: ["s.size", "s.length", "s.count()", "s.size()"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm demKhacNhau(arr) nhận MẢNG và trả về SỐ phần tử khác nhau (sau khi khử trùng lặp). Ví dụ: demKhacNhau([1,2,2,3]) trả về 3; demKhacNhau([5,5,5]) trả về 1.",
        requirements: [
          { type: "contains", text: "demKhacNhau", message: "Đặt tên hàm là demKhacNhau" },
          { type: "returns", call: "demKhacNhau([1,2,2,3])", equals: 3, message: "demKhacNhau([1,2,2,3]) phải trả về 3" },
          { type: "returns", call: "demKhacNhau([5,5,5])", equals: 1, message: "demKhacNhau([5,5,5]) phải trả về 1" },
        ],
        starterCode: "// Dùng Set để khử trùng rồi trả về số lượng phần tử\nfunction demKhacNhau(arr) {\n  \n}\n",
      },
    ],
  },
];
