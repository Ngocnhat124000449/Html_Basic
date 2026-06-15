import type { CssSeedTag } from "./types";

const PART = "Bố cục";

// PHẦN 3 — Chương 12 (Grid) + Chương 13 (Position) + Chương 14 (Responsive) + Chương 15 (Kích thước)
export const PART3_CHUONG_12_15: CssSeedTag[] = [
  // ===== CHƯƠNG 12: GRID =====
  {
    name: "display grid",
    topic: "Grid",
    part: PART,
    description: "Bật lưới 2 chiều — chia hàng và cột cùng lúc",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bật CSS Grid cho khung chứa dùng khai báo nào?",
        options: ["display: grid;", "display: table;", "grid: on;", "layout: grid;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khác biệt cốt lõi giữa Grid và Flexbox?",
        options: [
          "Grid nhanh hơn",
          "Grid bố cục theo HAI CHIỀU (hàng và cột cùng lúc); Flex chủ yếu MỘT chiều (một hàng hoặc một cột)",
          "Flex mới hơn Grid",
          "Grid chỉ cho bảng",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "display: grid đặt lên phần tử nào?",
        options: ["Từng ô con", "Phần tử CHA (grid container)", "Thẻ html", "Mỗi hàng"],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi nào nên chọn Grid thay vì Flex?",
        options: [
          "Khi xếp một hàng nút",
          "Khi cần bố cục lưới hai chiều: dashboard, gallery ảnh, layout trang có hàng+cột rõ ràng",
          "Khi căn giữa một phần tử",
          "Khi chỉ có một con",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Grid và Flex có dùng CHUNG được không?",
        options: [
          "Không, phải chọn một",
          "Có — thường lồng nhau: Grid cho khung tổng thể trang, Flex cho từng thành phần con (vd thanh nút trong một ô grid)",
          "Chỉ Grid trong Flex",
          "Gây xung đột",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "inline-grid khác grid thế nào?",
        options: [
          "Như nhau",
          "inline-grid làm container nằm cùng dòng (inline) thay vì chiếm cả dòng (block); bên trong vẫn là lưới",
          "inline-grid không có cột",
          "inline-grid chậm hơn",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có gallery class gallery. Viết rule .gallery bật  display: grid  và  gap: 12px.",
        requirements: [
          { type: "selector", value: ".gallery" },
          { type: "value", selector: ".gallery", name: "display", value: "grid" },
          { type: "value", selector: ".gallery", name: "gap", value: "12px" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"gallery\">\n  <img src=\"1.jpg\" alt=\"\"><img src=\"2.jpg\" alt=\"\">\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "grid-template-columns",
    topic: "Grid",
    part: PART,
    description: "Định nghĩa số cột và độ rộng từng cột; đơn vị fr",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo lưới 3 CỘT BẰNG NHAU dùng khai báo nào?",
        options: [
          "grid-template-columns: 1fr 1fr 1fr;",
          "grid-columns: 3;",
          "columns: 3 equal;",
          "grid-template: 3;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đơn vị  fr  trong Grid nghĩa là gì?",
        options: [
          "Pixel phân số",
          "Một PHẦN của khoảng trống còn lại (fraction) — chia tỷ lệ giữa các cột",
          "Font ratio",
          "Frame",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "grid-template-columns: 200px 1fr  tạo lưới thế nào?",
        options: [
          "Hai cột 200px",
          "Cột đầu cố định 200px, cột sau chiếm hết phần còn lại",
          "Một cột 201px",
          "Lỗi cú pháp",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hàm  repeat(3, 1fr)  có nghĩa gì?",
        options: [
          "Lặp lưới 3 lần",
          "Viết gọn cho '1fr 1fr 1fr' — 3 cột mỗi cột 1fr",
          "3 hàng",
          "Cột rộng gấp 3",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lưới sản phẩm tự điều chỉnh số cột theo bề rộng, mỗi cột tối thiểu 200px — pattern kinh điển?",
        options: [
          "repeat(4, 200px)",
          "repeat(auto-fill, minmax(200px, 1fr))",
          "grid-template-columns: auto",
          "columns: 200px",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "minmax(200px, 1fr)  bảo đảm điều gì?",
        options: [
          "Cột luôn đúng 200px",
          "Cột không bao giờ NHỎ hơn 200px, nhưng được GIÃN tới 1fr khi dư chỗ",
          "Cột tối đa 200px",
          "Cột rộng 1fr cố định",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có lưới class luoi-3. Viết rule .luoi-3 với  display: grid,  grid-template-columns: repeat(3, 1fr)  và  gap: 16px.",
        requirements: [
          { type: "selector", value: ".luoi-3" },
          { type: "value", selector: ".luoi-3", name: "display", value: "grid" },
          { type: "value", selector: ".luoi-3", name: "grid-template-columns", value: "repeat(3, 1fr)" },
          { type: "value", selector: ".luoi-3", name: "gap", value: "16px" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"luoi-3\">\n  <div>1</div><div>2</div><div>3</div>\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "grid-template-rows",
    topic: "Grid",
    part: PART,
    description: "Định nghĩa hàng và cách phần tử trải qua nhiều ô (span)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Định nghĩa chiều cao các HÀNG của lưới dùng khai báo nào?",
        options: [
          "grid-template-rows: 100px 200px;",
          "grid-rows: 2;",
          "rows: 100px 200px;",
          "grid-height: ...;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cho một ô trải qua 2 CỘT dùng khai báo nào (trên chính ô đó)?",
        options: [
          "grid-column: span 2;",
          "col-span: 2;",
          "width: 2col;",
          "grid-merge: 2;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "grid-row: span 2  làm gì cho một ô?",
        options: [
          "Ô cao gấp đôi font",
          "Ô trải qua 2 HÀNG của lưới",
          "Tạo 2 ô mới",
          "Lặp ô 2 lần",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nếu không khai báo grid-template-rows, các hàng cao thế nào?",
        options: [
          "Lỗi không hiển thị",
          "Trình duyệt tự tạo hàng ngầm (implicit) cao theo nội dung — có thể chỉnh bằng grid-auto-rows",
          "Tất cả cao 0",
          "Cao bằng cột",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "grid-column: 1 / 3  nghĩa là gì?",
        options: [
          "Ô ở cột 1 và cột 3",
          "Ô trải từ ĐƯỜNG cột 1 đến đường cột 3 (tức chiếm 2 cột: 1 và 2)",
          "Ô rộng 13px",
          "3 cột bắt đầu từ 1",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Layout dashboard có một thẻ 'nổi bật' to gấp đôi — cách làm với Grid?",
        options: [
          "Tăng font-size",
          "Cho thẻ đó grid-column: span 2 và/hoặc grid-row: span 2 để chiếm nhiều ô",
          "position: absolute",
          "width: 200%",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có ô nổi bật class o-noi-bat trong lưới. Viết rule .o-noi-bat trải 2 cột và 2 hàng:  grid-column: span 2  và  grid-row: span 2.",
        requirements: [
          { type: "selector", value: ".o-noi-bat" },
          { type: "value", selector: ".o-noi-bat", name: "grid-column", value: "span 2" },
          { type: "value", selector: ".o-noi-bat", name: "grid-row", value: "span 2" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"luoi\">\n  <div class=\"o-noi-bat\">Tin chính</div>\n  <div>Tin phụ</div>\n</div>\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 13: POSITION =====
  {
    name: "position relative",
    topic: "Position",
    part: PART,
    description: "Dịch phần tử so với vị trí gốc; làm mốc cho con absolute",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "position: relative cho phép làm gì?",
        options: [
          "Dịch phần tử so với VỊ TRÍ GỐC của nó bằng top/left/right/bottom",
          "Ghim cố định khi cuộn",
          "Gỡ khỏi layout",
          "Căn giữa tự động",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khi dịch phần tử relative, chỗ cũ của nó thế nào?",
        options: [
          "Bị xóa, phần tử khác lấp vào",
          "VẪN ĐƯỢC GIỮ — chỉ phần hiển thị dịch đi, không ảnh hưởng layout xung quanh",
          "Co lại 0",
          "Phình to",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn chưa đặt position cho phần tử nào. Giá trị MẶC ĐỊNH của position là gì?",
        options: ["relative", "static (theo luồng tự nhiên, không nhận top/left)", "absolute", "fixed"],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Công dụng QUAN TRỌNG NHẤT của position: relative trong thực tế là gì?",
        options: [
          "Dịch phần tử vài px",
          "Làm MỐC NEO cho phần tử con position: absolute — con sẽ định vị theo nó thay vì theo cả trang",
          "Tăng z-index",
          "Bo góc",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt  position: relative; top: 10px;  — phần tử dịch theo hướng nào?",
        options: [
          "Lên trên 10px",
          "XUỐNG dưới 10px (top = khoảng cách đẩy TỪ mép trên)",
          "Sang phải 10px",
          "Không dịch",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "position: relative có tạo 'positioning context' cho con absolute không?",
        options: [
          "Không",
          "Có — bất kỳ position khác static (relative/absolute/fixed/sticky) đều làm mốc cho con absolute bên trong",
          "Chỉ absolute mới làm mốc",
          "Chỉ fixed",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thẻ ảnh class khung-anh cần làm mốc cho nhãn giảm giá đặt absolute. Viết rule .khung-anh đặt  position: relative.",
        requirements: [
          { type: "selector", value: ".khung-anh" },
          { type: "value", selector: ".khung-anh", name: "position", value: "relative" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"khung-anh\">\n  <img src=\"sp.jpg\" alt=\"\">\n  <span class=\"nhan-sale\">-50%</span>\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "position absolute",
    topic: "Position",
    part: PART,
    description: "Gỡ khỏi luồng, định vị theo tổ tiên positioned gần nhất",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "position: absolute làm gì với phần tử?",
        options: [
          "Giữ trong luồng và dịch nhẹ",
          "GỠ khỏi luồng tài liệu, định vị theo top/left so với tổ tiên 'positioned' gần nhất",
          "Ghim cố định màn hình",
          "Căn giữa",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Nhãn '-50%' dán vào GÓC TRÊN PHẢI của thẻ ảnh — đặt nhãn thế nào?",
        options: [
          "position: absolute; top: 0; right: 0;",
          "float: right;",
          "margin-top: -100%;",
          "text-align: right;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Phần tử absolute có chiếm chỗ trong layout không?",
        options: ["Có", "KHÔNG — bị gỡ khỏi luồng, phần tử khác cư xử như nó không tồn tại", "Chỉ chiếm chiều cao", "Tùy z-index"],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nhãn absolute lại định vị theo CẢ TRANG thay vì theo thẻ cha. Nguyên nhân?",
        options: [
          "Thiếu z-index",
          "Cha CHƯA có position khác static — absolute leo lên tìm tổ tiên positioned, không thấy thì neo theo viewport/body",
          "Phải dùng !important",
          "absolute không neo được",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt cả top/bottom/left/right = 0 cho phần tử absolute (cha relative) thì sao?",
        options: [
          "Lỗi xung đột",
          "Phần tử PHỦ KÍN toàn bộ cha — kỹ thuật tạo lớp overlay",
          "Phần tử biến mất",
          "Chỉ neo góc trên trái",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mẹo căn GIỮA tuyệt đối một phần tử absolute?",
        options: [
          "margin: auto",
          "top: 50%; left: 50%; transform: translate(-50%, -50%);",
          "text-align: center",
          "position: center",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có nhãn giảm giá class nhan-sale trong thẻ ảnh (cha đã relative). Viết rule .nhan-sale dán góc trên phải:  position: absolute,  top: 8px,  right: 8px.",
        requirements: [
          { type: "selector", value: ".nhan-sale" },
          { type: "value", selector: ".nhan-sale", name: "position", value: "absolute" },
          { type: "value", selector: ".nhan-sale", name: "top", value: "8px" },
          { type: "value", selector: ".nhan-sale", name: "right", value: "8px" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"khung-anh\" style=\"position:relative\">\n  <img src=\"sp.jpg\" alt=\"\">\n  <span class=\"nhan-sale\">-50%</span>\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "position fixed sticky",
    topic: "Position",
    part: PART,
    description: "Ghim theo màn hình (fixed) hoặc dính khi cuộn tới (sticky)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Header GHIM CỐ ĐỊNH trên cùng dù cuộn trang dùng position nào?",
        options: ["fixed", "absolute", "relative", "static"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "position: sticky hoạt động thế nào?",
        options: [
          "Luôn ghim như fixed",
          "Cuộn bình thường tới một ngưỡng (vd top: 0) thì DÍNH lại tại đó",
          "Gỡ khỏi layout ngay",
          "Ẩn khi cuộn",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "position: fixed định vị phần tử theo gì?",
        options: [
          "Theo cha gần nhất",
          "Theo VIEWPORT (màn hình) — đứng yên khi cuộn",
          "Theo body",
          "Theo vị trí gốc",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "sticky cần điều kiện gì mới hoạt động?",
        options: [
          "Cần z-index cao",
          "Phải khai báo ÍT NHẤT MỘT ngưỡng (top/bottom/left/right) — thiếu thì sticky không dính",
          "Cần display: flex",
          "Cần !important",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau cốt lõi giữa fixed và sticky?",
        options: [
          "Như nhau",
          "fixed GỠ khỏi luồng và luôn ghim theo màn hình; sticky GIỮ trong luồng, chỉ dính khi cuộn tới ngưỡng và rời đi khi cha cuộn qua hết",
          "sticky luôn ghim",
          "fixed dính theo cha",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Header fixed thường gây vấn đề gì và sửa thế nào?",
        options: [
          "Không có vấn đề",
          "Nó che mất phần đầu nội dung (vì gỡ khỏi luồng) — chừa padding-top cho body bằng chiều cao header",
          "Làm chậm cuộn",
          "Mất màu nền",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thanh tiêu đề mục class tieu-de-sticky cần dính lên đầu khi cuộn. Viết rule đặt  position: sticky,  top: 0  và nền white.",
        requirements: [
          { type: "selector", value: ".tieu-de-sticky" },
          { type: "value", selector: ".tieu-de-sticky", name: "position", value: "sticky" },
          { type: "value", selector: ".tieu-de-sticky", name: "top", value: "0" },
          { type: "value", selector: ".tieu-de-sticky", name: "background-color", value: "white" },
        ],
        starterCode: "/* HTML căn cứ:\n<h2 class=\"tieu-de-sticky\">Chương 1</h2>\n<p>Nội dung dài...</p>\n*/\n",
      },
    ],
  },
  {
    name: "z-index",
    topic: "Position",
    part: PART,
    description: "Thứ tự xếp chồng các phần tử positioned theo chiều sâu",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "z-index điều khiển gì?",
        options: [
          "Thứ tự XẾP CHỒNG (phần tử nào nằm TRÊN khi đè nhau)",
          "Độ trong suốt",
          "Vị trí ngang",
          "Cỡ chữ",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Phần tử z-index cao hơn hiển thị thế nào so với z-index thấp?",
        options: ["Nằm DƯỚI", "Nằm TRÊN (gần người xem hơn)", "Bị ẩn", "Mờ hơn"],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "z-index có tác dụng với phần tử position: static (mặc định) không?",
        options: [
          "Có, luôn luôn",
          "KHÔNG — z-index chỉ áp cho phần tử đã positioned (relative/absolute/fixed/sticky)",
          "Chỉ với block",
          "Chỉ số âm",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Modal popup bị nội dung khác đè lên dù z-index: 9999. Nguyên nhân hay gặp?",
        options: [
          "z-index quá cao gây tràn",
          "Modal nằm trong một 'stacking context' bị giới hạn bởi cha — z-index chỉ so sánh trong cùng context, không xuyên qua cha có z-index/opacity/transform",
          "Thiếu position: static",
          "Phải dùng !important",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Điều gì TẠO RA một stacking context mới (ngoài z-index + position)?",
        options: [
          "Chỉ z-index",
          "opacity < 1, transform, filter, will-change... cũng tạo context riêng cho con bên trong",
          "margin",
          "color",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "z-index nhận giá trị âm có ý nghĩa gì?",
        options: [
          "Không hợp lệ",
          "Đẩy phần tử ra SAU — vd ra sau nền của cha; hữu ích cho lớp trang trí phía sau nội dung",
          "Ẩn phần tử",
          "Tăng độ ưu tiên",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có lớp phủ modal class lop-phu. Viết rule .lop-phu đặt  position: fixed  và  z-index: 1000  để nổi trên mọi nội dung.",
        requirements: [
          { type: "selector", value: ".lop-phu" },
          { type: "value", selector: ".lop-phu", name: "position", value: "fixed" },
          { type: "value", selector: ".lop-phu", name: "z-index", value: "1000" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"lop-phu\">\n  <div class=\"hop-thoai\">Bạn chắc chứ?</div>\n</div>\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 14: RESPONSIVE =====
  {
    name: "media query",
    topic: "Responsive",
    part: PART,
    description: "Áp CSS theo bề rộng màn hình với @media",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Áp CSS riêng khi màn hình HẸP hơn 600px dùng cú pháp nào?",
        options: [
          "@media (max-width: 600px) { ... }",
          "@screen 600px { ... }",
          "@if width < 600 { ... }",
          "media: 600px { ... }",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "max-width: 768px trong media query nghĩa là rule áp dụng khi nào?",
        options: [
          "Màn hình RỘNG hơn 768px",
          "Màn hình từ 768px trở XUỐNG",
          "Đúng 768px",
          "Mọi màn hình",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "min-width: 1024px áp dụng khi nào?",
        options: [
          "Màn hình từ 1024px trở LÊN",
          "Màn hình nhỏ hơn 1024px",
          "Đúng 1024px",
          "Chỉ máy in",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Triết lý 'mobile-first' viết media query thế nào?",
        options: [
          "Viết CSS cho desktop trước, dùng max-width thu nhỏ dần",
          "Viết CSS mặc định cho MOBILE, rồi dùng min-width để THÊM kiểu cho màn lớn dần",
          "Chỉ viết cho mobile",
          "Không dùng media query",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao thẻ <meta name=\"viewport\"> trong HTML quan trọng cho responsive?",
        options: [
          "Nó nạp file CSS",
          "Thiếu nó, mobile sẽ GIẢ LẬP màn rộng ~980px và thu nhỏ trang — media query mobile không kích hoạt đúng",
          "Nó tạo media query",
          "Không liên quan",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Kết hợp nhiều điều kiện 'từ 768px đến 1024px' viết thế nào?",
        options: [
          "@media (min-width: 768px) and (max-width: 1024px)",
          "@media 768px-1024px",
          "@media (768px < width < 1024px)",
          "@media min768 max1024",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có menu class menu-chinh. Viết media query: khi màn hình tối đa 600px, ẩn menu (display: none). (Bậc 3 cho phép @media bao quanh rule.)",
        requirements: [
          { type: "selector", value: ".menu-chinh" },
          { type: "value", selector: ".menu-chinh", name: "display", value: "none" },
        ],
        starterCode: "/* HTML căn cứ:\n<nav class=\"menu-chinh\">...</nav>\n*/\n@media (max-width: 600px) {\n  /* viết rule .menu-chinh ở đây */\n}\n",
      },
    ],
  },
  {
    name: "breakpoint",
    topic: "Responsive",
    part: PART,
    description: "Chọn điểm ngắt hợp lý theo nội dung, không theo thiết bị",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Breakpoint (điểm ngắt) là gì?",
        options: [
          "Lỗi gãy layout",
          "Bề rộng màn hình mà tại đó ta đổi bố cục bằng media query",
          "Điểm dừng của animation",
          "Giới hạn số cột",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Các mốc breakpoint phổ biến (xấp xỉ) thường là?",
        options: [
          "100px, 200px, 300px",
          "~640px (mobile/tablet), ~768px, ~1024px (desktop), ~1280px",
          "50px, 5000px",
          "Chỉ 1 mốc duy nhất",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Nên đặt breakpoint dựa vào đâu là tốt nhất?",
        options: [
          "Theo từng dòng điện thoại cụ thể (iPhone 12, 13...)",
          "Theo NỘI DUNG — nơi layout bắt đầu vỡ/xấu thì đặt điểm ngắt ở đó",
          "Theo độ phân giải camera",
          "Cố định 5 mốc cho mọi dự án",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao bám theo kích thước thiết bị cụ thể là cách làm dở?",
        options: [
          "Khó nhớ số",
          "Thiết bị mới ra liên tục với đủ kích thước — chạy theo là vô tận; bám nội dung thì bền vững cho mọi màn",
          "Trình duyệt không hỗ trợ",
          "Tốn nhiều media query hơn",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lưới  repeat(auto-fit, minmax(250px, 1fr))  liên quan gì tới breakpoint?",
        options: [
          "Không liên quan",
          "Đây là responsive KHÔNG cần breakpoint — lưới tự thêm/bớt cột theo bề rộng, giảm nhu cầu media query",
          "Nó tạo breakpoint tự động ở 250px",
          "Chỉ chạy trên mobile",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đơn vị nào giúp giảm số breakpoint cho chữ co giãn mượt theo màn hình?",
        options: [
          "px cố định",
          "clamp() / đơn vị vw — cỡ chữ co giãn liên tục thay vì nhảy bậc tại từng breakpoint",
          "pt",
          "cm",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có lưới class luoi-sp. Viết rule .luoi-sp responsive không cần breakpoint:  display: grid  và  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)).",
        requirements: [
          { type: "selector", value: ".luoi-sp" },
          { type: "value", selector: ".luoi-sp", name: "display", value: "grid" },
          {
            type: "value",
            selector: ".luoi-sp",
            name: "grid-template-columns",
            value: "repeat(auto-fit, minmax(250px, 1fr))",
          },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"luoi-sp\">\n  <div>SP1</div><div>SP2</div><div>SP3</div>\n</div>\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 15: KÍCH THƯỚC =====
  {
    name: "width height",
    topic: "Kích thước",
    part: PART,
    description: "Đặt kích thước phần tử; auto theo nội dung",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đặt chiều rộng cố định 300px dùng khai báo nào?",
        options: ["width: 300px;", "size: 300px;", "w: 300px;", "length: 300px;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một thẻ div (block) chưa đặt width. Giá trị MẶC ĐỊNH width: auto của nó nghĩa là gì?",
        options: [
          "Rộng bằng nội dung",
          "Rộng chiếm HẾT chiều ngang phần tử cha",
          "Rộng 0",
          "Rộng bằng màn hình",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "height: auto (mặc định) làm chiều cao phần tử thế nào?",
        options: [
          "Cao bằng cha",
          "Cao vừa đủ ÔM nội dung bên trong",
          "Cao 100vh",
          "Cao 0",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao đặt height cố định (px) cho khối chứa CHỮ là rủi ro?",
        options: [
          "height không nhận px",
          "Chữ nhiều/cỡ to hơn dự kiến sẽ TRÀN ra ngoài khối — nên để height: auto, chỉ dùng min-height nếu cần cao tối thiểu",
          "Trình duyệt báo lỗi",
          "Làm chậm trang",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Các từ khóa  fit-content / max-content / min-content  cho width làm gì?",
        options: [
          "Đều bằng 100%",
          "Đặt width theo NỘI DUNG: max-content = rộng nhất không xuống dòng, min-content = hẹp nhất có thể, fit-content = vừa nội dung nhưng không quá khung",
          "Chỉ dùng cho ảnh",
          "Không hợp lệ",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi nào dùng height: 100% có tác dụng?",
        options: [
          "Luôn luôn",
          "Chỉ khi phần tử CHA có chiều cao xác định — 100% tính theo cha",
          "Chỉ trên mobile",
          "Khi có position",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thẻ avatar class o-avatar. Viết rule .o-avatar đặt  width: 64px  và  height: 64px.",
        requirements: [
          { type: "selector", value: ".o-avatar" },
          { type: "value", selector: ".o-avatar", name: "width", value: "64px" },
          { type: "value", selector: ".o-avatar", name: "height", value: "64px" },
        ],
        starterCode: "/* HTML căn cứ:\n<img class=\"o-avatar\" src=\"user.jpg\" alt=\"Ảnh đại diện\">\n*/\n",
      },
    ],
  },
  {
    name: "min-max width",
    topic: "Kích thước",
    part: PART,
    description: "Giới hạn co giãn: min-width, max-width, min/max-height",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Giới hạn khối KHÔNG RỘNG QUÁ 1200px (nhưng co được khi màn hẹp) dùng gì?",
        options: ["max-width: 1200px;", "width: 1200px;", "min-width: 1200px;", "limit-width: 1200px;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "min-width: 320px bảo đảm điều gì?",
        options: [
          "Khối luôn đúng 320px",
          "Khối KHÔNG hẹp hơn 320px (co tới đó là dừng)",
          "Khối tối đa 320px",
          "Khối ẩn dưới 320px",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Combo container giữa trang co giãn nhưng có trần: thường viết?",
        options: [
          "width: 1200px; margin: 0 auto;",
          "max-width: 1200px; width: 100%; margin: 0 auto;",
          "min-width: 1200px;",
          "width: 100vw;",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao  max-width: 100%  thắng  width: 500px  khi khung cha chỉ rộng 300px?",
        options: [
          "max-width luôn thua width",
          "max-width là GIỚI HẠN TRÊN — nó ghi đè width khi width vượt quá; phần tử co còn 300px thay vì tràn",
          "width thắng vì cụ thể hơn",
          "Cả hai bị bỏ qua",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đoạn văn dài đọc mỏi mắt vì chạy hết màn hình rộng. Cách giới hạn độ dài dòng dễ đọc?",
        options: [
          "text-align: justify",
          "Đặt max-width khoảng 60-75 ký tự (vd max-width: 65ch) cho khối chữ",
          "font-size lớn hơn",
          "width: 100%",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "min-height: 100vh thường dùng để làm gì?",
        options: [
          "Giới hạn chiều cao tối đa",
          "Bảo đảm phần tử (vd footer dính đáy) CAO ÍT NHẤT bằng màn hình, nhưng vẫn giãn thêm nếu nội dung dài",
          "Ẩn phần tử ngắn",
          "Cố định cao đúng 1 màn hình",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có container chính class khung-trang. Viết rule .khung-trang với  max-width: 1200px,  width: 100%  và  margin: 0 auto.",
        requirements: [
          { type: "selector", value: ".khung-trang" },
          { type: "value", selector: ".khung-trang", name: "max-width", value: "1200px" },
          { type: "value", selector: ".khung-trang", name: "width", value: "100%" },
          { type: "value", selector: ".khung-trang", name: "margin", value: "0 auto" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"khung-trang\">\n  <h1>Nội dung trang</h1>\n</div>\n*/\n",
      },
    ],
  },
];
