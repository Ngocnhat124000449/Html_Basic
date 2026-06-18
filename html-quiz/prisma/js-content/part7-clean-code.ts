import type { JsSeedTag } from "./types";

const PART = "Clean Code";

// PHẦN 7 — Clean Code (Tuần 15): đặt tên rõ ràng, tránh lặp (DRY), tách hàm nhỏ
// (mỗi hàm một việc), tách module theo chức năng (storage/render/calc).
// Bậc 3 là JS chạy thật trong Worker → coerce scalar trong `call`. Khái niệm
// "sạch" dạy qua MCQ; bậc 3 ép viết hàm thuần đúng tên có nghĩa cho sẵn.
// Giá trị grader kiểm (equals, tên hàm) hiện nguyên văn trong đề (đề tự chứa).
export const PART7_CLEAN_CODE: JsSeedTag[] = [
  // ===== CHƯƠNG: ĐẶT TÊN RÕ RÀNG =====
  {
    name: "đặt tên rõ ràng",
    topic: "Đặt tên",
    part: PART,
    description: "Tên biến/hàm nói rõ ý nghĩa, đọc là hiểu",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đọc lại code thấy các biến tên 'd', 'x2', 'tmp'. Vấn đề chính là gì?",
        options: [
          "Tên không nói lên ý nghĩa — khó hiểu, khó bảo trì",
          "Chạy sai kết quả",
          "Tốn RAM",
          "Lỗi cú pháp",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tên biến nào dưới đây nói rõ nhất rằng nó lưu tổng chi tiêu?",
        options: ["tongChi", "x", "a1", "tmp"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Vì sao nên đặt tên hàm theo việc nó làm, ví dụ tinhThanhTien?",
        options: [
          "Để đọc code hiểu ngay mà không cần dò vào bên trong",
          "Để file nặng hơn cho oai",
          "Để chương trình chạy nhanh hơn",
          "Vì cú pháp JavaScript bắt buộc",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đọc lại code sau ba tháng, các tên biến như d, m, t gây vấn đề gì?",
        options: [
          "Khó nhớ chúng đại diện cho cái gì",
          "Làm chương trình chạy sai kết quả",
          "Tốn nhiều bộ nhớ RAM",
          "Gây lỗi cú pháp khi chạy",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hằng số 'số ngày trong tuần' nên đặt tên thế nào cho dễ hiểu?",
        options: ["SO_NGAY_TRONG_TUAN = 7", "n = 7", "x7 = 7", "val = 7"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một biến boolean cho biết người dùng đã đăng nhập nên đặt tên ra sao?",
        options: ["daDangNhap", "user", "check", "flag1"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt tên hàm là data() có nhược điểm gì so với layDanhSachChi()?",
        options: [
          "Không cho biết hàm làm gì và trả về cái gì",
          "Chạy chậm hơn hẳn",
          "Sai cú pháp JavaScript",
          "Không thể gọi được",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Thay vì hàm mơ hồ như f(a, b), hãy đặt tên có nghĩa. Viết hàm tinhThanhTien(soLuong, donGia) trả về soLuong nhân donGia. Ví dụ: tinhThanhTien(3, 1000) trả về 3000; tinhThanhTien(5, 200) trả về 1000.",
        requirements: [
          { type: "contains", text: "tinhThanhTien", message: "Đặt tên hàm là tinhThanhTien" },
          { type: "returns", call: "tinhThanhTien(3,1000)", equals: 3000, message: "tinhThanhTien(3,1000) phải trả về 3000" },
          { type: "returns", call: "tinhThanhTien(5,200)", equals: 1000, message: "tinhThanhTien(5,200) phải trả về 1000" },
        ],
        starterCode: "// Trả về soLuong * donGia\nfunction tinhThanhTien(soLuong, donGia) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: TRÁNH LẶP (DRY) =====
  {
    name: "tránh lặp (DRY)",
    topic: "DRY",
    part: PART,
    description: "Gom code lặp vào một hàm dùng lại — Don't Repeat Yourself",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Thấy cùng đoạn tính giảm giá bị chép ở 3 trang. Theo nguyên tắc DRY nên làm gì?",
        options: [
          "Tách thành một hàm dùng chung",
          "Chép thêm cho trang thứ 4",
          "Xóa hết đi",
          "Đổi tên biến ở mỗi nơi",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "DRY trong lập trình là viết tắt của nguyên tắc nào?",
        options: [
          "Don't Repeat Yourself — đừng lặp lại code",
          "Do Repeat Yourself — cứ lặp cho chắc",
          "Delete Random Years",
          "Data Read Yearly",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khi thấy cùng một đoạn tính toán bị chép ở ba chỗ, nên làm gì?",
        options: [
          "Tách thành một hàm rồi gọi lại ở cả ba chỗ",
          "Chép thêm cho chỗ thứ tư",
          "Xóa hết cho gọn",
          "Đổi tên biến ở từng chỗ",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lợi ích lớn nhất của việc gom code lặp vào một hàm là gì?",
        options: [
          "Sửa một chỗ là mọi nơi cập nhật theo",
          "Code chạy nhanh gấp đôi",
          "File tự động nén lại",
          "Trình duyệt tự tối ưu hộ",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hai đoạn tính tổng giỏ hàng và tổng hóa đơn giống hệt nhau — xử lý DRY thế nào?",
        options: [
          "Viết một hàm tính tổng rồi gọi cho cả hai",
          "Để nguyên vì vẫn chạy được",
          "Gộp hai trang làm một",
          "Xóa bớt một trong hai tính năng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sao chép code thay vì tái sử dụng dễ dẫn tới lỗi nào khi bảo trì?",
        options: [
          "Sửa chỗ này quên chỗ kia, gây sai lệch",
          "Code đột nhiên chạy nhanh hơn",
          "Mất kết nối mạng",
          "Trình duyệt tự đóng lại",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đưa các 'con số ma' (magic number) lặp lại thành hằng số đặt tên giúp gì?",
        options: [
          "Tránh lặp giá trị và chỉ cần chỉnh một nơi",
          "Làm code dài hơn một cách vô ích",
          "Khiến con số chạy nhanh hơn",
          "Bắt buộc phải theo chuẩn ES6",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Nhiều nơi đang lặp lại vòng cộng dồn. Hãy gom vào một hàm dùng lại: viết tongTien(ds) nhận MẢNG số và trả về tổng. Ví dụ: tongTien([10, 20, 30]) trả về 60; tongTien([5, 5]) trả về 10.",
        requirements: [
          { type: "contains", text: "tongTien", message: "Đặt tên hàm là tongTien" },
          { type: "returns", call: "tongTien([10,20,30])", equals: 60, message: "tongTien([10,20,30]) phải trả về 60" },
          { type: "returns", call: "tongTien([5,5])", equals: 10, message: "tongTien([5,5]) phải trả về 10" },
        ],
        starterCode: "// Cộng dồn các phần tử của ds rồi trả về tổng\nfunction tongTien(ds) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: TÁCH HÀM NHỎ =====
  {
    name: "tách hàm nhỏ",
    topic: "Hàm nhỏ",
    part: PART,
    description: "Mỗi hàm làm đúng một việc, ngắn gọn dễ kiểm thử",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một hàm 200 dòng vừa tải dữ liệu, vừa vẽ, vừa lưu. Hướng cải thiện theo clean code là gì?",
        options: [
          "Tách thành nhiều hàm nhỏ, mỗi hàm một việc",
          "Gộp thêm việc nữa cho gọn file",
          "Để nguyên cho nhanh",
          "Xóa bớt tính năng",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một hàm tốt nên làm bao nhiêu việc chính?",
        options: [
          "Một việc duy nhất, làm cho thật tốt",
          "Càng nhiều việc càng tiện",
          "Ít nhất năm việc một lúc",
          "Không làm việc gì cả",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một hàm dài 200 dòng làm đủ thứ gây khó khăn gì?",
        options: [
          "Khó đọc, khó kiểm thử và khó sửa",
          "Chạy nhanh hơn hẳn",
          "Tốn ít bộ nhớ hơn",
          "Luôn luôn tự động đúng",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khi một hàm vừa tính toán vừa in ra màn hình, nên làm gì cho sạch?",
        options: [
          "Tách phần tính và phần hiển thị thành hai hàm",
          "Gộp thêm cả việc lưu file vào",
          "Để nguyên cho nhanh",
          "Xóa hẳn phần tính toán",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tách hàm nhỏ giúp việc kiểm thử (test) dễ hơn vì sao?",
        options: [
          "Mỗi hàm một việc rõ ràng nên dễ kiểm từng phần",
          "Vì có hàm nhỏ thì khỏi cần test",
          "Vì hàm nhỏ không bao giờ sai",
          "Vì trình duyệt tự test giúp",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Có ba bước: lấy dữ liệu, tính tổng, vẽ biểu đồ — cách tổ chức tốt là gì?",
        options: [
          "Mỗi bước một hàm riêng rồi ghép lại",
          "Nhét tất cả vào một hàm khổng lồ",
          "Viết ba lần trong ba file giống nhau",
          "Bỏ hẳn bước tính tổng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hàm con nên nhận dữ liệu qua tham số thay vì đọc biến toàn cục vì sao?",
        options: [
          "Dễ tái sử dụng và ít phụ thuộc ngầm",
          "Vì biến toàn cục không hề tồn tại",
          "Vì tham số luôn chạy nhanh hơn",
          "Vì JavaScript cấm biến toàn cục",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Tách riêng phần định dạng hiển thị thành một hàm nhỏ làm đúng một việc. Viết dinhDangTien(tien) trả về số tiền nối thêm chữ 'đ'. Ví dụ: dinhDangTien(1000) trả về '1000đ'; dinhDangTien(0) trả về '0đ'.",
        requirements: [
          { type: "contains", text: "dinhDangTien", message: "Đặt tên hàm là dinhDangTien" },
          { type: "returns", call: "dinhDangTien(1000)", equals: "1000đ", message: "dinhDangTien(1000) phải trả về '1000đ'" },
          { type: "returns", call: "dinhDangTien(0)", equals: "0đ", message: "dinhDangTien(0) phải trả về '0đ'" },
        ],
        starterCode: "// Nối tien với chuỗi 'đ' rồi trả về\nfunction dinhDangTien(tien) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: TÁCH MODULE =====
  {
    name: "tách module",
    topic: "Tách module",
    part: PART,
    description: "Chia dự án theo chức năng: storage, render, calc",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Dự án dồn hết vào một file app.js rối rắm. Cách tổ chức tốt hơn là gì?",
        options: [
          "Tách thành các module: storage, render, calc",
          "Viết tất cả vào index.html",
          "Đổi sang một file CSS",
          "Xóa bớt hàm cho gọn",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tách dự án thành các file storage, render, calc nhằm mục đích gì?",
        options: [
          "Mỗi file một nhiệm vụ, dễ tìm và bảo trì",
          "Để có nhiều file cho oai",
          "Để chương trình chạy nhanh hơn",
          "Vì trình duyệt bắt buộc phải vậy",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "File calc.js trong expense tracker nên chứa gì?",
        options: [
          "Các hàm tính toán như tổng, số dư",
          "Mã giao diện HTML",
          "Các ảnh nền của trang",
          "Cấu hình bảng màu sắc",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong JS hiện đại, để dùng hàm từ file khác bạn dùng cặp từ khóa nào?",
        options: ["export và import", "include và require2", "open và close", "link và load"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tách phần đọc/ghi localStorage ra file storage.js đem lại lợi ích gì?",
        options: [
          "Đổi cách lưu chỉ phải sửa một file",
          "Làm dữ liệu chạy nhanh hơn",
          "Khiến app không cần mạng",
          "Tự động sao lưu lên đám mây",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên giữ module tính toán (calc) tách khỏi module giao diện (render)?",
        options: [
          "Để đổi giao diện mà không đụng tới logic tính",
          "Vì tính toán không quan trọng",
          "Vì render không cần dữ liệu",
          "Để giảm tổng số dòng code",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một module nên phơi ra (export) cái gì cho bên ngoài?",
        options: [
          "Chỉ những hàm cần dùng, giấu chi tiết bên trong",
          "Toàn bộ biến nội bộ",
          "Không export gì cả",
          "Cả file dưới dạng một chuỗi",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Module calc chỉ lo tính toán thuần, không đụng giao diện. Viết tinhSoDu(thu, chi) trả về thu trừ chi. Ví dụ: tinhSoDu(100, 30) trả về 70; tinhSoDu(50, 50) trả về 0.",
        requirements: [
          { type: "contains", text: "tinhSoDu", message: "Đặt tên hàm là tinhSoDu" },
          { type: "returns", call: "tinhSoDu(100,30)", equals: 70, message: "tinhSoDu(100,30) phải trả về 70" },
          { type: "returns", call: "tinhSoDu(50,50)", equals: 0, message: "tinhSoDu(50,50) phải trả về 0" },
        ],
        starterCode: "// Trả về thu - chi\nfunction tinhSoDu(thu, chi) {\n  \n}\n",
      },
    ],
  },
];
