import type { ReactSeedTag } from "./types";

const PART = "Nền tảng React";

// PHẦN 1 — Nền tảng React (Tuần 18): component & JSX, biểu thức & thuộc tính JSX,
// props, ghép component thành trang. Bậc 3 type WRITE_JSX — render THẬT trong Web
// Worker (Babel transpile + renderToStaticMarkup) rồi so HTML.
// Tự chứa: tên component/prop + giá trị prop + HTML kỳ vọng hiện nguyên văn trong đề;
// text contains cũng hiện trong đề (guard kiểm).
export const PART1_NEN_TANG: ReactSeedTag[] = [
  // ===== CHƯƠNG: COMPONENT & JSX =====
  {
    name: "component & jsx",
    topic: "Component & JSX",
    part: PART,
    description: "Component là hàm trả về JSX — khối dựng giao diện",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn muốn tách phần 'thẻ sản phẩm' (ảnh + tên + giá) thành một mảnh giao diện tái dùng ở nhiều nơi. Trong React, mảnh đó gọi là gì?",
        options: ["Một component", "Một file CSS", "Một biến thường", "Một vòng lặp"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "React là gì trong lập trình web?",
        options: [
          "Thư viện JavaScript để xây dựng giao diện theo component",
          "Một ngôn ngữ lập trình mới",
          "Một hệ cơ sở dữ liệu",
          "Một trình duyệt web",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một component React cơ bản thường là gì?",
        options: [
          "Một hàm trả về JSX",
          "Một file CSS",
          "Một bảng dữ liệu",
          "Một câu lệnh SQL",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "JSX cho phép bạn làm gì?",
        options: [
          "Viết cấu trúc giống HTML ngay trong JavaScript",
          "Tạo cơ sở dữ liệu",
          "Gửi email",
          "Định dạng ổ cứng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một component React nên trả về bao nhiêu phần tử gốc?",
        options: [
          "Một phần tử gốc duy nhất (có thể bọc bằng <div> hoặc <>...</>)",
          "Bắt buộc đúng ba phần tử",
          "Không được trả về gì",
          "Tối thiểu năm phần tử",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tên của một component React nên bắt đầu bằng gì?",
        options: ["Chữ in HOA (vd LoiChao)", "Chữ thường", "Một con số", "Dấu gạch dưới"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao tên component phải viết hoa chữ đầu?",
        options: [
          "Để React phân biệt component với thẻ HTML thường",
          "Để chạy nhanh hơn",
          "Vì JSX cấm chữ thường",
          "Để tiết kiệm bộ nhớ",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết function component tên LoiChao trả về một thẻ <h1> chứa nội dung Xin chào React. Khi render, kết quả HTML phải là <h1>Xin chào React</h1>.",
        requirements: [
          { type: "contains", text: "LoiChao", message: "Đặt tên component là LoiChao" },
          { type: "construct", construct: "function", message: "Khai báo bằng function" },
          {
            type: "renders",
            component: "LoiChao",
            htmlEquals: "<h1>Xin chào React</h1>",
            message: "Render LoiChao phải ra <h1>Xin chào React</h1>",
          },
        ],
        starterCode: "function LoiChao() {\n  // trả về JSX ở đây\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: BIỂU THỨC & THUỘC TÍNH JSX =====
  {
    name: "biểu thức & thuộc tính",
    topic: "Biểu thức & thuộc tính",
    part: PART,
    description: "Chèn biểu thức bằng {} và đặt class bằng className",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn muốn gắn class 'the-sp' cho thẻ <div> bọc card sản phẩm trong JSX. Viết thuộc tính nào?",
        options: ['className="the-sp"', 'class="the-sp"', 'cssClass="the-sp"', 'classList="the-sp"'],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong JSX, để chèn một biểu thức JavaScript bạn dùng gì?",
        options: [
          "Cặp ngoặc nhọn { }",
          "Cặp ngoặc tròn ( )",
          "Cặp ngoặc vuông [ ]",
          "Dấu nháy kép",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong JSX, thuộc tính class của HTML được viết thành gì?",
        options: ["className", "class", "cssClass", "styleName"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đoạn JSX <p>{2 + 3}</p> sẽ hiển thị gì?",
        options: ["5", "2 + 3", "{2 + 3}", "Một lỗi"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao JSX dùng className thay vì class?",
        options: [
          "Vì class là từ khóa dành riêng của JavaScript",
          "Vì class không tồn tại trong HTML",
          "Vì className ngắn hơn",
          "Vì React cấm dùng CSS",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Trong JSX, cách chèn giá trị của một biến tên gia vào nội dung là gì?",
        options: ["{gia}", "gia", "((gia))", "[gia]"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thuộc tính trong JSX (vd onClick, htmlFor) thường viết theo kiểu nào?",
        options: ["camelCase", "tất cả chữ hoa", "có dấu gạch ngang", "snake_case"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component tên Gia hiển thị trong một thẻ <span> có class là gia. Bên trong, dùng biểu thức JSX tính 10 cộng 5 rồi thêm chữ đ. Lưu ý: trong JSX viết className (render ra thành class). Kết quả render phải là <span class=\"gia\">15đ</span>.",
        requirements: [
          { type: "contains", text: "Gia", message: "Đặt tên component là Gia" },
          { type: "contains", text: "className", message: "Dùng className cho class" },
          {
            type: "renders",
            component: "Gia",
            htmlEquals: '<span class="gia">15đ</span>',
            message: 'Render Gia phải ra <span class="gia">15đ</span>',
          },
        ],
        starterCode: "function Gia() {\n  // dùng {} cho biểu thức, className cho class\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: PROPS =====
  {
    name: "props",
    topic: "Props",
    part: PART,
    description: "Truyền và đọc dữ liệu giữa các component qua props",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn có một component TheSanPham và muốn dùng nó hiển thị nhiều sản phẩm khác tên và giá nhau. Truyền dữ liệu mỗi sản phẩm vào bằng cách nào?",
        options: [
          "Truyền qua props",
          "Sửa lại code component mỗi lần",
          "Truyền qua file CSS",
          "Lưu vào localStorage",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Props trong React dùng để làm gì?",
        options: [
          "Truyền dữ liệu từ component cha xuống component con",
          "Lưu dữ liệu vào ổ cứng",
          "Tạo cơ sở dữ liệu",
          "Định dạng CSS",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Truyền props ten cho component TheThanhVien viết thế nào?",
        options: [
          '<TheThanhVien ten="An" />',
          "<TheThanhVien>An</TheThanhVien>",
          "<TheThanhVien props=An />",
          "<TheThanhVien.ten = An />",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bên trong component, đọc giá trị của prop ten viết thế nào?",
        options: ["props.ten", "ten.props", "props(ten)", "get(ten)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Props trong React có đặc điểm gì?",
        options: [
          "Chỉ đọc — component con không nên tự sửa props",
          "Có thể sửa thoải mái",
          "Là biến toàn cục",
          "Tự động lưu vào database",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Cú pháp { ten } trong function TheThanhVien({ ten }) gọi là gì?",
        options: [
          "Phá vỡ (destructuring) props",
          "Spread props",
          "Vòng lặp props",
          "Ép kiểu props",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nếu cha không truyền một prop nào đó, trong con giá trị prop đó là gì?",
        options: ["undefined", "null bắt buộc", "0", "Báo lỗi dừng app"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component tên TheThanhVien nhận props và hiển thị giá trị props.ten bên trong thẻ <h2>. Khi render với ten là An phải ra <h2>An</h2>; với ten là Bình phải ra <h2>Bình</h2>.",
        requirements: [
          { type: "contains", text: "TheThanhVien", message: "Đặt tên component là TheThanhVien" },
          { type: "contains", text: "props", message: "Component nhận props" },
          {
            type: "renders",
            component: "TheThanhVien",
            props: { ten: "An" },
            htmlEquals: "<h2>An</h2>",
            message: "ten='An' phải render <h2>An</h2>",
          },
          {
            type: "renders",
            component: "TheThanhVien",
            props: { ten: "Bình" },
            htmlEquals: "<h2>Bình</h2>",
            message: "ten='Bình' phải render <h2>Bình</h2>",
          },
        ],
        starterCode: "function TheThanhVien(props) {\n  // hiển thị props.ten trong <h2>\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: GHÉP COMPONENT =====
  {
    name: "ghép component",
    topic: "Ghép component",
    part: PART,
    description: "Lồng component nhỏ để dựng nên một trang",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trang chủ shop gồm phần header, danh sách card sản phẩm và footer. Cách dựng trang đó trong React là gì?",
        options: [
          "Ghép các component Header, DanhSachSP, Footer lại với nhau",
          "Viết tất cả trong một hàm khổng lồ",
          "Dùng một file CSS duy nhất",
          "Dùng một ảnh chụp màn hình",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Dùng một component bên trong component khác (vd <Loi />) gọi là gì?",
        options: [
          "Ghép/lồng component (composition)",
          "Kế thừa class",
          "Vòng lặp",
          "Định nghĩa biến",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để dùng component Loi trong JSX, bạn viết gì?",
        options: ["<Loi />", "loi()", "{Loi}", "[Loi]"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một trang React thường được tạo nên bằng cách nào?",
        options: [
          "Ghép nhiều component nhỏ lại với nhau",
          "Viết tất cả trong một hàm khổng lồ",
          "Chỉ dùng HTML thuần",
          "Dùng một file CSS duy nhất",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lợi ích chính của việc chia giao diện thành nhiều component nhỏ là gì?",
        options: [
          "Tái sử dụng và dễ bảo trì",
          "Làm trang nặng hơn",
          "Bắt buộc theo cú pháp",
          "Để có thật nhiều file",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Component cha truyền dữ liệu xuống component con qua đâu?",
        options: ["Qua props", "Qua biến toàn cục", "Qua localStorage", "Qua CSS"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi lồng <Loi /> trong <div> của component Trang, thứ tự render thế nào?",
        options: [
          "Trang render và gọi Loi để render bên trong",
          "Loi xóa Trang đi",
          "Hai component không liên quan nhau",
          "Trình duyệt bỏ qua Loi",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Đã có sẵn component Loi trả về <h1>Chào</h1> (xem code mẫu). Hãy viết thêm component tên Trang dùng lại <Loi /> bên trong một thẻ <div>. Khi render Trang, kết quả phải là <div><h1>Chào</h1></div>.",
        requirements: [
          { type: "contains", text: "Trang", message: "Đặt tên component là Trang" },
          { type: "contains", text: "<Loi", message: "Dùng lại <Loi /> bên trong" },
          {
            type: "renders",
            component: "Trang",
            htmlEquals: "<div><h1>Chào</h1></div>",
            message: "Render Trang phải ra <div><h1>Chào</h1></div>",
          },
        ],
        starterCode:
          "function Loi() {\n  return <h1>Chào</h1>;\n}\n\nfunction Trang() {\n  // dùng <Loi /> bên trong <div>\n}\n",
      },
    ],
  },
];
