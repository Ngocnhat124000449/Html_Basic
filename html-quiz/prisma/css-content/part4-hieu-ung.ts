import type { CssSeedTag } from "./types";

const PART = "Hiệu ứng";

// PHẦN 4 — Chương 16 (Trạng thái) + 17 (Transition) + 18 (Transform) + 19 (Animation) + 20 (Cuộn)
export const PART4_CHUONG_16_20: CssSeedTag[] = [
  // ===== CHƯƠNG 16: TRẠNG THÁI =====
  {
    name: "hover",
    topic: "Trạng thái",
    part: PART,
    description: "Đổi kiểu khi rê chuột vào phần tử với :hover",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đổi màu nút khi RÊ CHUỘT vào dùng pseudo-class nào?",
        options: [".nut:hover", ".nut:click", ".nut:over", ".nut.hover"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: ":hover kích hoạt khi nào?",
        options: [
          "Khi bấm vào phần tử",
          "Khi con trỏ chuột nằm TRÊN phần tử",
          "Khi phần tử được focus",
          "Khi trang tải xong",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cú pháp viết :hover đúng là gì?",
        options: [
          "selector:hover { ... }",
          "selector hover { ... }",
          "hover(selector) { ... }",
          ":hover selector { ... }",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hạn chế của :hover trên thiết bị CẢM ỨNG là gì?",
        options: [
          "Không có hạn chế",
          "Điện thoại không có con trỏ rê — hiệu ứng hover khó/không kích hoạt; đừng để thông tin QUAN TRỌNG chỉ hiện khi hover",
          ":hover bị cấm trên mobile",
          "Hover làm chậm cảm ứng",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao hiệu ứng hover thường đi kèm transition?",
        options: [
          "Bắt buộc cú pháp",
          "Không có transition, kiểu đổi ĐỘT NGỘT; transition làm thay đổi diễn ra mượt mà",
          "transition kích hoạt hover",
          "Để tăng tốc",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt  .menu:hover .submenu { display: block; }  có ý nghĩa gì?",
        options: [
          "Submenu luôn hiện",
          "Hiện submenu khi rê chuột vào .menu cha — pattern menu thả xuống thuần CSS",
          "Ẩn menu khi hover",
          "Lỗi cú pháp",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có nút class nut-hover. Viết rule cho trạng thái hover (selector .nut-hover:hover) đổi nền thành #c2410c và màu chữ white.",
        requirements: [
          { type: "selector", value: ".nut-hover:hover" },
          { type: "value", selector: ".nut-hover:hover", name: "background-color", value: "#c2410c" },
          { type: "value", selector: ".nut-hover:hover", name: "color", value: "white" },
        ],
        starterCode: "/* HTML căn cứ:\n<button class=\"nut-hover\">Đăng ký</button>\n*/\n",
      },
    ],
  },
  {
    name: "focus active",
    topic: "Trạng thái",
    part: PART,
    description: ":focus (đang chọn ô nhập) và :active (đang nhấn)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đổi kiểu ô input KHI ĐANG GÕ (được chọn) dùng pseudo-class nào?",
        options: [".o:focus", ".o:hover", ".o:active", ".o:typing"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: ":active kích hoạt vào lúc nào?",
        options: [
          "Khi rê chuột",
          "Trong khoảnh khắc đang NHẤN GIỮ chuột lên phần tử",
          "Khi phần tử hiện ra",
          "Khi gõ phím",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: ":focus thường áp dụng cho loại phần tử nào nhất?",
        options: [
          "Ảnh",
          "Phần tử nhận tương tác bàn phím: input, textarea, button, link",
          "Đoạn văn p",
          "Thẻ div trang trí",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao KHÔNG nên xóa hẳn kiểu :focus (outline) mà không thay thế?",
        options: [
          "Làm trang chậm",
          "Người dùng bàn phím mất dấu hiệu biết đang đứng ở đâu — vi phạm accessibility",
          "Trình duyệt cấm",
          "Mất màu nền",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: ":focus-within có công dụng gì?",
        options: [
          "Giống hệt :focus",
          "Áp kiểu cho phần tử CHA khi MỘT con bên trong nó đang focus — vd làm sáng cả ô tìm kiếm khi input bên trong được chọn",
          "Focus nhiều phần tử",
          "Chỉ cho button",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thứ tự áp dụng đúng khi cùng một link có nhiều trạng thái (quy tắc LVHA)?",
        options: [
          "hover, active, link, visited tùy ý",
          ":link, :visited, :hover, :active — sai thứ tự khiến trạng thái sau bị đè mất",
          "Thứ tự không quan trọng",
          ":active luôn viết đầu",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có ô nhập class o-nhap. Viết rule trạng thái focus (selector .o-nhap:focus) đặt  border-color: #2563eb  và  outline: none  (giả định đã có dấu hiệu focus khác).",
        requirements: [
          { type: "selector", value: ".o-nhap:focus" },
          { type: "value", selector: ".o-nhap:focus", name: "border-color", value: "#2563eb" },
          { type: "value", selector: ".o-nhap:focus", name: "outline", value: "none" },
        ],
        starterCode: "/* HTML căn cứ:\n<input class=\"o-nhap\" type=\"text\" placeholder=\"Họ tên\">\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 17: TRANSITION =====
  {
    name: "transition",
    topic: "Transition",
    part: PART,
    description: "Chuyển động mượt giữa hai trạng thái khi giá trị đổi",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Làm nút đổi màu MƯỢT trong 0.3s khi hover dùng khai báo nào (trên trạng thái thường)?",
        options: [
          "transition: background-color 0.3s;",
          "animation: 0.3s;",
          "transform: 0.3s;",
          "smooth: background 0.3s;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "transition nên đặt ở trạng thái nào để vào VÀ ra đều mượt?",
        options: [
          "Chỉ ở :hover",
          "Ở trạng thái THƯỜNG (gốc) — để cả khi hover vào lẫn rời ra đều áp dụng",
          "Ở :active",
          "Ở thẻ body",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "transition: all 0.3s  nghĩa là gì?",
        options: [
          "Mọi thuộc tính thay đổi đều được làm mượt trong 0.3s",
          "Tất cả phần tử chuyển động",
          "Lặp 0.3s",
          "Chỉ màu đổi",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao  transition: all  bị khuyên hạn chế, nên liệt kê thuộc tính cụ thể?",
        options: [
          "all không hợp lệ",
          "all theo dõi MỌI thuộc tính gây tốn hiệu năng và đôi khi animate cả thứ không mong muốn; liệt kê rõ (vd transform, opacity) tối ưu hơn",
          "all chỉ chạy trên Chrome",
          "Không có lý do",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bốn phần của shorthand  transition: transform 0.3s ease-in-out 0.1s  là gì?",
        options: [
          "thuộc-tính | thời-lượng | kiểu-gia-tốc | độ-trễ",
          "màu | cỡ | vị trí | góc",
          "tên | lặp | hướng | trạng thái",
          "x | y | blur | màu",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thuộc tính nào KHÔNG thể transition mượt (đổi đột ngột)?",
        options: [
          "opacity",
          "display (none ↔ block) — là giá trị rời rạc, không có bước trung gian để nội suy",
          "background-color",
          "transform",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thẻ class the-muot. Viết rule .the-muot (trạng thái thường) đặt  transition: box-shadow 0.3s ease  để bóng đổi mượt khi hover.",
        requirements: [
          { type: "selector", value: ".the-muot" },
          { type: "value", selector: ".the-muot", name: "transition", value: "box-shadow 0.3s ease" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"the-muot\">Thẻ sản phẩm</div>\n/* (rule .the-muot:hover đổi box-shadow đã có sẵn) */\n*/\n",
      },
    ],
  },
  {
    name: "timing function",
    topic: "Transition",
    part: PART,
    description: "Đường cong tốc độ: ease, linear, cubic-bezier",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Giá trị timing nào cho tốc độ ĐỀU từ đầu đến cuối?",
        options: ["linear", "ease", "ease-in", "bounce"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Giá trị MẶC ĐỊNH của timing function là gì?",
        options: ["linear", "ease (chậm-nhanh-chậm, tự nhiên)", "ease-out", "steps"],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "ease-out cho chuyển động thế nào?",
        options: [
          "Bắt đầu nhanh rồi CHẬM dần về cuối",
          "Chậm đầu nhanh cuối",
          "Đều tăm tắp",
          "Giật cục",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao chuyển động UI thường ưa ease-out hơn linear?",
        options: [
          "linear không hợp lệ",
          "ease-out chậm dần lúc kết thúc tạo cảm giác 'hạ cánh' tự nhiên; linear máy móc, kém sinh động",
          "linear chậm hơn",
          "ease-out tốn ít CPU",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "cubic-bezier() dùng để làm gì?",
        options: [
          "Tạo màu gradient",
          "TỰ ĐỊNH NGHĨA đường cong tốc độ tùy ý — kể cả hiệu ứng nảy vượt mốc (overshoot)",
          "Vẽ đường cong SVG",
          "Bo góc",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hàm  steps()  trong timing tạo hiệu ứng gì?",
        options: [
          "Chuyển động mượt liên tục",
          "Chuyển động NHẢY BẬC theo từng nấc — dùng cho sprite animation, hiệu ứng đồng hồ/đánh máy",
          "Lặp vô hạn",
          "Đảo chiều",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có nút class nut-ease. Viết rule .nut-ease đặt  transition: transform 0.25s ease-out.",
        requirements: [
          { type: "selector", value: ".nut-ease" },
          { type: "value", selector: ".nut-ease", name: "transition", value: "transform 0.25s ease-out" },
        ],
        starterCode: "/* HTML căn cứ:\n<button class=\"nut-ease\">Nhấn tôi</button>\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 18: TRANSFORM =====
  {
    name: "transform scale rotate",
    topic: "Transform",
    part: PART,
    description: "Biến đổi phần tử: phóng to (scale), xoay (rotate)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "PHÓNG TO phần tử lên 1.1 lần khi hover dùng khai báo nào?",
        options: [
          "transform: scale(1.1);",
          "zoom: 1.1;",
          "size: 110%;",
          "scale-up: 1.1;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "XOAY phần tử 45 độ dùng khai báo nào?",
        options: ["transform: rotate(45deg);", "rotate: 45;", "transform: turn(45);", "angle: 45deg;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "transform: scale(0.5) làm gì?",
        options: [
          "Phóng to gấp đôi",
          "THU NHỎ phần tử còn một nửa",
          "Xoay 50 độ",
          "Làm mờ 50%",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao transform được ưa chuộng cho animation hơn việc đổi width/top?",
        options: [
          "transform dễ viết hơn",
          "transform (và opacity) chạy trên GPU, không gây reflow/relayout — mượt hơn nhiều, ít giật",
          "width animate không được",
          "transform không tốn CPU nào",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Phần tử scale(1.5) có ĐẨY các phần tử xung quanh ra không?",
        options: [
          "Có, như tăng width",
          "KHÔNG — transform chỉ biến đổi hình ảnh hiển thị, không thay đổi chỗ thật trong layout (có thể đè lên hàng xóm)",
          "Chỉ đẩy theo chiều ngang",
          "Đẩy nếu có position",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "transform-origin điều khiển điều gì?",
        options: [
          "Màu của transform",
          "ĐIỂM NEO mà phép biến đổi xoay/phóng quanh đó — mặc định là tâm phần tử (center)",
          "Thời lượng",
          "Số lần lặp",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thẻ ảnh class anh-zoom. Viết rule trạng thái hover (selector .anh-zoom:hover) phóng to với  transform: scale(1.05).",
        requirements: [
          { type: "selector", value: ".anh-zoom:hover" },
          { type: "value", selector: ".anh-zoom:hover", name: "transform", value: "scale(1.05)" },
        ],
        starterCode: "/* HTML căn cứ:\n<img class=\"anh-zoom\" src=\"mon.jpg\" alt=\"Món ăn\">\n*/\n",
      },
    ],
  },
  {
    name: "transform translate",
    topic: "Transform",
    part: PART,
    description: "Dịch chuyển phần tử theo x/y mà không chiếm chỗ",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Dịch phần tử LÊN TRÊN 8px khi hover dùng khai báo nào?",
        options: [
          "transform: translateY(-8px);",
          "top: -8px;",
          "margin-top: -8px;",
          "move-up: 8px;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "translateX(20px) dịch phần tử theo hướng nào?",
        options: ["Lên trên", "Sang PHẢI 20px", "Xuống dưới", "Sang trái"],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "translate(10px, 20px) nghĩa là gì?",
        options: [
          "Dịch ngang 10px, dọc 20px",
          "Phóng to 10×20",
          "Xoay 10 và 20 độ",
          "Cách lề 10px 20px",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao translate mượt hơn đổi top/left cho hiệu ứng di chuyển?",
        options: [
          "translate viết ngắn hơn",
          "top/left gây relayout mỗi khung hình; translate chạy trên GPU, không động đến layout — êm và tiết kiệm",
          "top/left không animate được",
          "translate luôn nhanh tuyệt đối",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Kỹ thuật căn giữa tuyệt đối  top: 50%; left: 50%; transform: translate(-50%, -50%)  hoạt động nhờ đâu?",
        options: [
          "translate dùng px",
          "translate tính % theo KÍCH THƯỚC CHÍNH phần tử — kéo lùi nửa rộng/nửa cao để tâm phần tử trùng tâm khung",
          "top/left đủ để căn giữa",
          "Nhờ margin auto",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Ghép nhiều biến đổi  transform: translateY(-4px) scale(1.05)  — lưu ý gì?",
        options: [
          "Phải viết hai dòng transform",
          "Viết trên MỘT khai báo, cách nhau khoảng trắng — viết transform hai lần thì cái sau ĐÈ cái trước",
          "scale phải đứng đầu",
          "Không ghép được",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thẻ class the-nang. Viết rule hover (selector .the-nang:hover) nâng thẻ lên với  transform: translateY(-6px).",
        requirements: [
          { type: "selector", value: ".the-nang:hover" },
          { type: "value", selector: ".the-nang:hover", name: "transform", value: "translateY(-6px)" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"the-nang\">Thẻ nổi lên khi hover</div>\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 19: ANIMATION =====
  {
    name: "keyframes",
    topic: "Animation",
    part: PART,
    description: "Định nghĩa các mốc của hoạt ảnh với @keyframes",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Định nghĩa một hoạt ảnh nhiều bước dùng cú pháp nào?",
        options: [
          "@keyframes ten-anim { from {...} to {...} }",
          "@animation ten { ... }",
          "@frames ten { ... }",
          "keyframe: ten;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong @keyframes, from và to tương ứng với gì?",
        options: [
          "0% (bắt đầu) và 100% (kết thúc)",
          "Màu đầu và màu cuối",
          "Trên và dưới",
          "Lặp đầu và lặp cuối",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Có thể đặt mốc Ở GIỮA hoạt ảnh (vd nửa chừng) không?",
        options: [
          "Không, chỉ from/to",
          "Có — dùng phần trăm: 0%, 50%, 100% cho các bước trung gian",
          "Chỉ 25% và 75%",
          "Tối đa 2 mốc",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "@keyframes chỉ ĐỊNH NGHĨA hoạt ảnh. Để CHẠY nó cần làm gì?",
        options: [
          "Tự chạy ngay",
          "Gắn vào phần tử qua thuộc tính animation (animation-name + duration...)",
          "Gọi bằng JavaScript bắt buộc",
          "Thêm vào HTML",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hoạt ảnh nảy (bounce) cần các mốc thế nào?",
        options: [
          "Chỉ from và to",
          "Nhiều mốc % với translateY đổi qua lại (vd 0%, 50% nhảy lên, 100% về) tạo dao động",
          "Một mốc 50%",
          "Không làm được bằng keyframes",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thuộc tính nào nên animate trong keyframes để hiệu năng tốt nhất?",
        options: [
          "width, height, margin",
          "transform và opacity — chạy trên GPU, không reflow",
          "top, left, font-size",
          "background-position",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "Viết @keyframes tên hien-dan với mốc from đặt opacity 0 và to đặt opacity 1. (Yêu cầu: rule from và to bên trong.)",
        requirements: [
          { type: "selector", value: "from" },
          { type: "value", selector: "from", name: "opacity", value: "0" },
          { type: "selector", value: "to" },
          { type: "value", selector: "to", name: "opacity", value: "1" },
        ],
        starterCode: "/* HTML căn cứ: phần tử sẽ dùng animation: hien-dan 0.5s\n<div class=\"hop\">Xuất hiện dần</div>\n*/\n@keyframes hien-dan {\n  /* viết from và to ở đây */\n}\n",
      },
    ],
  },
  {
    name: "animation",
    topic: "Animation",
    part: PART,
    description: "Gắn và điều khiển hoạt ảnh: duration, iteration, loop",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Chạy hoạt ảnh tên quay trong 2 giây dùng khai báo nào?",
        options: [
          "animation: quay 2s;",
          "animation-run: quay 2s;",
          "play: quay 2s;",
          "@quay 2s;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cho hoạt ảnh lặp VÔ HẠN dùng giá trị nào?",
        options: [
          "animation-iteration-count: infinite;",
          "animation-loop: always;",
          "animation-repeat: forever;",
          "loop: infinite;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Icon loading (spinner) xoay tròn liên tục cần kết hợp gì?",
        options: [
          "@keyframes xoay rotate(0→360deg) + animation lặp infinite linear",
          "transition: all infinite",
          "transform: rotate mãi mãi",
          "hover: rotate",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "animation-direction: alternate có tác dụng gì?",
        options: [
          "Đổi màu mỗi vòng",
          "Chạy XUÔI rồi NGƯỢC luân phiên — tạo dao động qua lại mượt thay vì nhảy về đầu",
          "Lặp 2 lần",
          "Chạy ngược hoàn toàn",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "animation-fill-mode: forwards giải quyết vấn đề gì?",
        options: [
          "Tăng tốc",
          "GIỮ trạng thái cuối (100%) sau khi animation kết thúc — không bị nhảy về kiểu gốc",
          "Lặp về sau",
          "Chạy trước khi tải",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên tôn trọng  @media (prefers-reduced-motion)  khi làm animation?",
        options: [
          "Để tải nhanh hơn",
          "Một số người bị chóng mặt/khó chịu với chuyển động mạnh — nên giảm/tắt animation khi họ bật tùy chọn này (accessibility)",
          "Bắt buộc của trình duyệt",
          "Để SEO tốt hơn",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có spinner class spinner (giả định đã có @keyframes xoay). Viết rule .spinner chạy hoạt ảnh:  animation: xoay 1s linear infinite.",
        requirements: [
          { type: "selector", value: ".spinner" },
          { type: "value", selector: ".spinner", name: "animation", value: "xoay 1s linear infinite" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"spinner\"></div>\n/* @keyframes xoay { from{transform:rotate(0)} to{transform:rotate(360deg)} } đã có */\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 20: CUỘN =====
  {
    name: "scroll-behavior",
    topic: "Cuộn",
    part: PART,
    description: "Cuộn mượt khi nhảy tới anchor với scroll-behavior",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Làm trang cuộn MƯỢT (thay vì nhảy phắt) khi bấm link #anchor dùng khai báo nào?",
        options: [
          "scroll-behavior: smooth;",
          "scroll: smooth;",
          "scroll-type: animate;",
          "smooth-scroll: on;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "scroll-behavior: smooth thường đặt trên phần tử nào?",
        options: ["html (hoặc khối cuộn cụ thể)", "body chữ", "từng link", "footer"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Giá trị mặc định của scroll-behavior là gì?",
        options: ["smooth", "auto (nhảy tức thì)", "instant", "none"],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "scroll-behavior: smooth hoạt động trong tình huống nào?",
        options: [
          "Mọi lần cuộn chuột",
          "Khi cuộn được KÍCH HOẠT bằng chương trình/anchor (bấm link #id, scrollIntoView) — không đổi cảm giác cuộn tay",
          "Chỉ khi kéo thanh cuộn",
          "Chỉ trên mobile",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Header sticky che mất tiêu đề khi nhảy tới anchor. Thuộc tính nào sửa?",
        options: [
          "scroll-padding / scroll-margin — chừa khoảng để mục tiêu không bị header che",
          "z-index",
          "overflow: hidden",
          "position: fixed",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nên cân nhắc gì khi bật smooth scroll toàn trang?",
        options: [
          "Không cần cân nhắc",
          "Tôn trọng prefers-reduced-motion — người nhạy cảm chuyển động có thể muốn cuộn tức thì",
          "Phải dùng JavaScript",
          "Chỉ bật trên desktop",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "Viết rule cho thẻ html bật cuộn mượt toàn trang:  scroll-behavior: smooth.",
        requirements: [
          { type: "selector", value: "html" },
          { type: "value", selector: "html", name: "scroll-behavior", value: "smooth" },
        ],
        starterCode: "/* HTML căn cứ:\n<a href=\"#lien-he\">Tới phần liên hệ</a>\n...\n<section id=\"lien-he\">...</section>\n*/\n",
      },
    ],
  },
  {
    name: "scroll-snap",
    topic: "Cuộn",
    part: PART,
    description: "Cuộn 'bắt dính' từng khối như slider/carousel",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo cuộn ngang 'bắt dính' từng slide, ta đặt trên KHUNG cuộn khai báo nào?",
        options: [
          "scroll-snap-type: x mandatory;",
          "scroll-snap: on;",
          "snap: x;",
          "carousel: true;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Mỗi slide con cần khai báo gì để 'điểm dính' canh vào?",
        options: [
          "scroll-snap-align: start (hoặc center)",
          "snap-to: yes",
          "align: snap",
          "scroll-stop: true",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "scroll-snap-type: x mandatory — chữ 'x' nghĩa là gì?",
        options: [
          "Bắt dính theo trục NGANG",
          "Tắt snap",
          "10 slide",
          "Cuộn dọc",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau giữa  mandatory  và  proximity  trong scroll-snap-type?",
        options: [
          "Như nhau",
          "mandatory LUÔN dính vào điểm gần nhất khi dừng; proximity chỉ dính khi cuộn ĐỦ GẦN một điểm",
          "proximity mạnh hơn",
          "mandatory chỉ cho dọc",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Ưu điểm của scroll-snap so với carousel viết bằng JavaScript?",
        options: [
          "Đẹp hơn",
          "Thuần CSS — nhẹ, mượt tự nhiên theo cử chỉ vuốt của thiết bị, không cần thư viện JS",
          "Chạy nhanh hơn JS gấp 10 lần",
          "Hỗ trợ video",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khung scroll-snap cần điều kiện cơ bản nào để cuộn được?",
        options: [
          "z-index cao",
          "Có overflow cuộn (vd overflow-x: auto) và nội dung con rộng/cao hơn khung",
          "position: fixed",
          "display: none",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có carousel class bang-chuyen. Viết rule .bang-chuyen với  display: flex,  overflow-x: auto  và  scroll-snap-type: x mandatory.",
        requirements: [
          { type: "selector", value: ".bang-chuyen" },
          { type: "value", selector: ".bang-chuyen", name: "display", value: "flex" },
          { type: "value", selector: ".bang-chuyen", name: "overflow-x", value: "auto" },
          { type: "value", selector: ".bang-chuyen", name: "scroll-snap-type", value: "x mandatory" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"bang-chuyen\">\n  <div class=\"slide\">1</div>\n  <div class=\"slide\">2</div>\n</div>\n*/\n",
      },
    ],
  },
];
