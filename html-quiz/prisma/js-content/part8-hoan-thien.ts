import type { JsSeedTag } from "./types";

const PART = "Hoàn thiện & Xuất dữ liệu";

// PHẦN 8 — Hoàn thiện & Xuất dữ liệu (Tuần 16): xuất JSON (JSON.stringify), xuất
// CSV (ghép chuỗi từ mảng), kiểm thử thủ công & xử lý edge case (mảng rỗng).
// Bậc 3 là JS chạy thật trong Worker → coerce scalar trong `call`. Chuỗi nhiều
// dòng (CSV) được xem qua .split('\n').join('|') để hiện nguyên văn trong đề.
// Giá trị grader kiểm (equals, tên hàm) hiện nguyên văn trong đề (đề tự chứa).
export const PART8_HOAN_THIEN: JsSeedTag[] = [
  // ===== CHƯƠNG: XUẤT JSON =====
  {
    name: "xuất JSON",
    topic: "Xuất JSON",
    part: PART,
    description: "Chuyển dữ liệu thành chuỗi JSON để lưu/tải về",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn cho người dùng TẢI VỀ dữ liệu chi tiêu dạng .json. Bước đầu là chuyển dữ liệu sang gì?",
        options: [
          "Chuỗi JSON bằng JSON.stringify",
          "Ảnh chụp màn hình",
          "Một bảng HTML",
          "Một số nguyên",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để chuyển một object hoặc mảng JavaScript thành chuỗi JSON, bạn dùng gì?",
        options: ["JSON.stringify(data)", "JSON.toText(data)", "data.toJSON()", "String(data)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "JSON là định dạng phù hợp để làm gì với dữ liệu chi tiêu?",
        options: [
          "Lưu hoặc xuất để máy khác đọc lại được",
          "Vẽ biểu đồ một cách trực tiếp",
          "Tăng tốc độ CPU",
          "Mã hóa mật khẩu người dùng",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Ngược lại, để biến một chuỗi JSON thành object JavaScript dùng hàm nào?",
        options: ["JSON.parse(str)", "JSON.read(str)", "str.toObject()", "Number(str)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi xuất dữ liệu cho người dùng tải về dạng .json, bước đầu tiên thường là gì?",
        options: [
          "Chuyển dữ liệu sang chuỗi bằng JSON.stringify",
          "Chụp màn hình bảng dữ liệu",
          "Gửi email cho người dùng",
          "In ra máy in trước",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "JSON.stringify(data, null, 2) khác JSON.stringify(data) ở điểm nào?",
        options: [
          "Thêm thụt lề cho chuỗi JSON dễ đọc",
          "Mã hóa dữ liệu an toàn",
          "Tự xóa bớt các khóa thừa",
          "Đổi luôn sang định dạng CSV",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Giá trị nào KHÔNG biểu diễn được trực tiếp trong JSON?",
        options: ["Hàm (function)", "Số", "Chuỗi", "Mảng"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm xuatJSON(ds) dùng JSON.stringify để trả về chuỗi JSON của mảng giao dịch. Ví dụ: xuatJSON([{ten:'An',tien:30}]) trả về '[{\"ten\":\"An\",\"tien\":30}]'; xuatJSON([]) trả về '[]'.",
        requirements: [
          { type: "contains", text: "xuatJSON", message: "Đặt tên hàm là xuatJSON" },
          { type: "contains", text: "JSON.stringify", message: "Dùng JSON.stringify" },
          {
            type: "returns",
            call: "xuatJSON([{ten:'An',tien:30}])",
            equals: '[{"ten":"An","tien":30}]',
            message: "xuatJSON([{ten:'An',tien:30}]) phải trả về '[{\"ten\":\"An\",\"tien\":30}]'",
          },
          { type: "returns", call: "xuatJSON([])", equals: "[]", message: "xuatJSON([]) phải trả về '[]'" },
        ],
        starterCode: "// Trả về JSON.stringify(ds)\nfunction xuatJSON(ds) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: XUẤT CSV =====
  {
    name: "xuất CSV",
    topic: "Xuất CSV",
    part: PART,
    description: "Ghép mảng dữ liệu thành chuỗi CSV mở được bằng Excel",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn người dùng mở dữ liệu chi tiêu bằng Excel/Google Sheets. Nên xuất ra định dạng nào?",
        options: ["CSV", "PNG", "MP4", "EXE"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "CSV là định dạng lưu dữ liệu kiểu gì?",
        options: [
          "Các giá trị ngăn cách bằng dấu phẩy theo từng dòng",
          "Hình ảnh đã nén",
          "Mã nhị phân thuần",
          "Một trang HTML",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Ưu điểm của việc xuất CSV cho bảng chi tiêu là gì?",
        options: [
          "Mở được trực tiếp bằng Excel hoặc Google Sheets",
          "Chạy được như một chương trình",
          "Hiển thị biểu đồ động",
          "Tự gửi lên server",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong file CSV, các dòng (bản ghi) thường được ngăn cách bằng gì?",
        options: ["Ký tự xuống dòng", "Dấu chấm phẩy kép", "Khoảng trắng đôi", "Dấu gạch dưới"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Dòng đầu tiên của một file CSV thường chứa gì?",
        options: ["Tiêu đề các cột (header)", "Dòng tổng cộng", "Một dòng trống", "Tên của file"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để ghép một mảng các giá trị thành một dòng CSV bạn có thể dùng gì?",
        options: ["arr.join(',')", "arr.split(',')", "arr.push(',')", "arr.concat()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nếu một ô dữ liệu chứa sẵn dấu phẩy thì khi xuất CSV cần xử lý gì?",
        options: [
          "Bọc ô đó trong dấu ngoặc kép",
          "Xóa dấu phẩy đó đi",
          "Đổi cả file sang JSON",
          "Bỏ qua ô dữ liệu đó",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm xuatCSV(ds) nhận mảng {ten, tien}: dòng đầu là tiêu đề 'ten,tien', mỗi giao dịch một dòng 'ten,tien', các dòng nối nhau bằng ký tự xuống dòng. Khi nối các dòng lại bằng '|' để xem: xuatCSV([{ten:'An',tien:30},{ten:'Binh',tien:20}]) cho 'ten,tien|An,30|Binh,20'; xuatCSV([{ten:'An',tien:30}]) cho 'ten,tien|An,30'.",
        requirements: [
          { type: "contains", text: "xuatCSV", message: "Đặt tên hàm là xuatCSV" },
          {
            type: "returns",
            call: "xuatCSV([{ten:'An',tien:30},{ten:'Binh',tien:20}]).split('\\n').join('|')",
            equals: "ten,tien|An,30|Binh,20",
            message: "Hai giao dịch phải cho 'ten,tien|An,30|Binh,20' khi nối bằng '|'",
          },
          {
            type: "returns",
            call: "xuatCSV([{ten:'An',tien:30}]).split('\\n').join('|')",
            equals: "ten,tien|An,30",
            message: "Một giao dịch phải cho 'ten,tien|An,30' khi nối bằng '|'",
          },
        ],
        starterCode:
          "// Bắt đầu bằng 'ten,tien', thêm mỗi giao dịch một dòng, nối bằng '\\n'\nfunction xuatCSV(ds) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: KIỂM THỬ & EDGE CASE =====
  {
    name: "kiểm thử & edge case",
    topic: "Kiểm thử",
    part: PART,
    description: "Thử app như người dùng, xử lý trường hợp biên",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trước khi giao app, nên thử những trường hợp đặc biệt nào để app không vỡ?",
        options: [
          "Danh sách rỗng, số 0, dữ liệu lạ",
          "Chỉ thử khi có nhiều dữ liệu đẹp",
          "Không cần thử gì",
          "Chỉ thử trên máy mình",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Kiểm thử thủ công (manual testing) nghĩa là gì?",
        options: [
          "Tự thao tác app như người dùng để tìm lỗi",
          "Để máy tự viết code thay mình",
          "Xóa toàn bộ phần test đi",
          "Chỉ đọc code mà không chạy",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "'Edge case' (trường hợp biên) là gì?",
        options: [
          "Tình huống hiếm hoặc cực trị như mảng rỗng, số 0, số âm",
          "Một lỗi cú pháp",
          "Tên của một thư viện",
          "Màu viền của giao diện",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khi danh sách chi tiêu rỗng, app nên làm gì cho mượt?",
        options: [
          "Hiển thị thông báo trống, không bị lỗi",
          "Văng ra lỗi đỏ",
          "Tự thêm dữ liệu giả vào",
          "Tải lại trang liên tục",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Trước khi giao sản phẩm, vì sao nên thử cả dữ liệu xấu hoặc bất thường?",
        options: [
          "Để chắc app không vỡ khi gặp đầu vào lạ",
          "Để app chạy chậm lại",
          "Vì người dùng thích gặp lỗi",
          "Để tăng dung lượng file",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hàm tính trung bình chi tiêu cần xử lý đặc biệt trường hợp nào?",
        options: [
          "Khi danh sách rỗng để tránh chia cho 0",
          "Khi có đúng năm phần tử",
          "Khi mọi số đều dương",
          "Khi tên có dấu tiếng Việt",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một checklist kiểm thử thủ công tốt nên bao gồm điều gì?",
        options: [
          "Các bước cần thử và kết quả mong đợi",
          "Chỉ vài ảnh chụp màn hình",
          "Mật khẩu của người dùng",
          "Toàn bộ mã nguồn dán vào",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm tongAnToan(ds) cộng tổng mảng số nhưng xử lý edge case mảng rỗng: trả về 0 nếu mảng rỗng. Ví dụ: tongAnToan([]) trả về 0; tongAnToan([5, 5]) trả về 10.",
        requirements: [
          { type: "contains", text: "tongAnToan", message: "Đặt tên hàm là tongAnToan" },
          { type: "returns", call: "tongAnToan([])", equals: 0, message: "tongAnToan([]) phải trả về 0" },
          { type: "returns", call: "tongAnToan([5,5])", equals: 10, message: "tongAnToan([5,5]) phải trả về 10" },
        ],
        starterCode: "// Mảng rỗng trả về 0, ngược lại trả về tổng các phần tử\nfunction tongAnToan(ds) {\n  \n}\n",
      },
    ],
  },
];
