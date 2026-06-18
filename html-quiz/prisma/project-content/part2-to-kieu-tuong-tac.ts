import type { ProjectSeedTag } from "./types";

const PART = "Tô kiểu & Tương tác";

// PHẦN 2 — Ghép bằng CSS & JS: tô kiểu cả khối (WRITE_CSS, chấm gradeCss) và
// nối một tính năng nhỏ (WRITE_JS, chạy thật trong Worker). Giá trị (value CSS,
// tên hàm, kết quả) hiện nguyên văn trong đề (đề tự chứa).
export const PART2_TO_KIEU_TUONG_TAC: ProjectSeedTag[] = [
  // ===== TÔ KIỂU CARD (CSS) =====
  {
    name: "tô kiểu card",
    topic: "Tô kiểu card",
    part: PART,
    description: "Dùng CSS cho cả khối card: đệm, bo góc, nền",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn card có khoảng đệm bên trong cho nội dung thoáng. Dùng thuộc tính CSS nào?",
        options: ["padding", "margin", "gap", "border"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn bo tròn bốn góc của card. Dùng thuộc tính CSS nào?",
        options: ["border-radius", "border-round", "corner", "radius"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn card nổi lên khỏi nền nhờ bóng đổ. Dùng thuộc tính nào?",
        options: ["box-shadow", "text-shadow", "border", "outline"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Card cần nền trắng để nổi trên nền xám của trang. Dùng thuộc tính nào?",
        options: ["background", "color", "fill", "border-color"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao gom padding/border-radius/box-shadow vào class .card thay vì style inline mỗi card?",
        options: [
          "Tái dùng cho mọi card và dễ bảo trì",
          "Để code chạy nhanh hơn",
          "Vì inline bị cấm",
          "Để file nhẹ hơn",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khoảng cách GIỮA các card (bên ngoài viền) đặt bằng thuộc tính nào?",
        options: ["margin", "padding", "border", "gap-inner"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt:
          "HTML có các card mang class card. Viết rule .card đặt padding: 16px, border-radius: 8px và background: white.",
        requirements: [
          { type: "selector", value: ".card" },
          { type: "value", selector: ".card", name: "padding", value: "16px" },
          { type: "value", selector: ".card", name: "border-radius", value: "8px" },
          { type: "value", selector: ".card", name: "background", value: "white" },
        ],
        starterCode: '/* HTML căn cứ:\n<article class="card">Sản phẩm</article>\n*/\n',
      },
    ],
  },

  // ===== NAVBAR NGANG (CSS) =====
  {
    name: "navbar ngang",
    topic: "Thanh điều hướng ngang",
    part: PART,
    description: "Dùng flexbox dàn logo + menu trên một hàng",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn xếp các mục menu trong navbar thành MỘT HÀNG NGANG. Bật display nào?",
        options: ["flex", "block", "inline", "none"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn tạo khoảng cách đều giữa các mục menu (flex). Dùng thuộc tính nào?",
        options: ["gap", "margin", "padding", "space"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn đẩy logo về trái và menu về phải trong navbar. Dùng thuộc tính nào?",
        options: ["justify-content", "align-items", "text-align", "float"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Giá trị justify-content nào đẩy hai nhóm về hai mép (logo trái, menu phải)?",
        options: ["space-between", "center", "flex-start", "flex-end"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Muốn các mục menu căn giữa theo chiều dọc của navbar. Dùng thuộc tính nào?",
        options: ["align-items", "justify-content", "vertical-align", "line-height"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thanh điều hướng nên dùng thẻ ngữ nghĩa nào bọc ngoài?",
        options: ["<nav>", "<div>", "<header2>", "<menu-bar>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt:
          "HTML có thanh điều hướng mang class navbar. Viết rule .navbar đặt display: flex, gap: 16px và justify-content: space-between.",
        requirements: [
          { type: "selector", value: ".navbar" },
          { type: "value", selector: ".navbar", name: "display", value: "flex" },
          { type: "value", selector: ".navbar", name: "gap", value: "16px" },
          { type: "value", selector: ".navbar", name: "justify-content", value: "space-between" },
        ],
        starterCode: '/* HTML căn cứ:\n<nav class="navbar"><span>Logo</span><ul>...</ul></nav>\n*/\n',
      },
    ],
  },

  // ===== NÚT ĐẾM LƯỢT THÍCH (JS) =====
  {
    name: "nút đếm lượt thích",
    topic: "Nút đếm (JS)",
    part: PART,
    description: "Nối logic tăng số lượt cho nút Thích",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Nút 'Thích' cần nhớ số lượt và tăng khi bấm. Lưu số đó bằng gì?",
        options: ["Một biến số (let)", "Một hằng const cố định", "Một file CSS", "Một thẻ <img>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Mỗi lần bấm nút Thích, số lượt thay đổi thế nào?",
        options: ["Tăng thêm 1", "Giảm 1", "Về 0", "Không đổi"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để cập nhật số hiển thị trên nút sau khi tăng, dùng thuộc tính nào?",
        options: ["el.textContent", "el.value", "el.src", "el.href"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hàm tăng lượt thích nên NHẬN số hiện tại và TRẢ số mới. Dùng cặp khái niệm nào?",
        options: ["tham số và return", "class và new", "import và export", "try và catch"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Gắn hành động tăng lượt thích vào sự kiện nào của nút?",
        options: ["click (addEventListener 'click')", "load", "hover", "submit"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên tách logic tăng lượt thành một hàm riêng?",
        options: ["Dễ kiểm thử và tái dùng", "Để code dài hơn", "Vì cú pháp bắt buộc", "Để chạy nhanh hơn"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm tangThich(soLuot) trả về số lượt thích MỚI sau khi bấm (tăng thêm 1). Ví dụ: tangThich(0) trả về 1; tangThich(5) trả về 6.",
        requirements: [
          { type: "contains", text: "tangThich", message: "Đặt tên hàm là tangThich" },
          { type: "returns", call: "tangThich(0)", equals: 1, message: "tangThich(0) phải trả về 1" },
          { type: "returns", call: "tangThich(5)", equals: 6, message: "tangThich(5) phải trả về 6" },
        ],
        starterCode: "function tangThich(soLuot) {\n  // trả về soLuot + 1\n}\n",
      },
    ],
  },

  // ===== LỌC SẢN PHẨM CÒN HÀNG (JS) =====
  {
    name: "lọc sản phẩm còn hàng",
    topic: "Lọc danh sách (JS)",
    part: PART,
    description: "Nối tính năng lọc danh sách sản phẩm còn hàng",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trang shop muốn chỉ hiện sản phẩm CÒN HÀNG. Method mảng nào lọc ra danh sách con?",
        options: ["filter", "map", "forEach", "reduce"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Method filter trả về cái gì?",
        options: [
          "Một mảng mới gồm phần tử thỏa điều kiện",
          "Một con số",
          "Một chuỗi",
          "undefined",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để đếm có bao nhiêu sản phẩm còn hàng sau khi lọc, dùng gì?",
        options: [".length", ".size", ".count()", ".total"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mỗi sản phẩm có trường conHang (true/false). Điều kiện lọc 'còn hàng' viết thế nào?",
        options: ["sp.conHang === true", "sp.conHang = false", "sp.length", "!sp"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Method filter có làm THAY ĐỔI mảng gốc không?",
        options: ["Không — nó tạo mảng mới", "Có, xóa phần tử gốc", "Có, sắp xếp lại", "Tùy trình duyệt"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Muốn vừa lọc còn hàng vừa lấy ra tên sản phẩm, thường phối hợp filter với method nào?",
        options: ["map", "sort", "push", "pop"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm demConHang(ds) nhận mảng sản phẩm dạng {conHang} và trả về SỐ LƯỢNG sản phẩm còn hàng. Dùng filter. Ví dụ: demConHang([{conHang:true},{conHang:false},{conHang:true}]) trả về 2; demConHang([]) trả về 0.",
        requirements: [
          { type: "contains", text: "demConHang", message: "Đặt tên hàm là demConHang" },
          { type: "contains", text: "filter", message: "Dùng filter để lọc" },
          {
            type: "returns",
            call: "demConHang([{conHang:true},{conHang:false},{conHang:true}])",
            equals: 2,
            message: "Phải trả về 2",
          },
          { type: "returns", call: "demConHang([])", equals: 0, message: "Mảng rỗng trả về 0" },
        ],
        starterCode: "function demConHang(ds) {\n  // return ds.filter(sp => sp.conHang).length\n}\n",
      },
    ],
  },
];
