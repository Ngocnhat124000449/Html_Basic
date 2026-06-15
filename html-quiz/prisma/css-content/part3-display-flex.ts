import type { CssSeedTag } from "./types";

const PART = "Bố cục";

// PHẦN 3 — Chương 10 (display) + Chương 11 (Flexbox)
export const PART3_CHUONG_10_11: CssSeedTag[] = [
  // ===== CHƯƠNG 10: DISPLAY =====
  {
    name: "display block inline",
    topic: "Display",
    part: PART,
    description: "Phân biệt phần tử khối (block) và nội tuyến (inline)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Phần tử BLOCK (như div, p) cư xử thế nào?",
        options: [
          "Nằm cùng dòng với phần tử khác",
          "Chiếm trọn chiều rộng dòng, phần tử sau xuống dòng mới",
          "Không nhận width/height",
          "Luôn ẩn",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Phần tử INLINE (như span, a) khác block ở chỗ nào?",
        options: [
          "Nằm cùng dòng với nội dung xung quanh, chỉ rộng bằng nội dung",
          "Luôn xuống dòng mới",
          "Chiếm trọn chiều rộng",
          "Không hiển thị chữ",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Biến một <span> thành phần tử khối dùng khai báo nào?",
        options: ["display: block;", "display: line;", "block: true;", "float: block;"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao đặt  width: 200px  lên thẻ <span> mặc định KHÔNG có tác dụng?",
        options: [
          "span không hỗ trợ width",
          "span là inline — width/height bị bỏ qua; phải đổi sang block hoặc inline-block trước",
          "Phải thêm !important",
          "Do thiếu height",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Phần tử inline cư xử thế nào với margin/padding DỌC (trên-dưới)?",
        options: [
          "Áp dụng bình thường, đẩy dòng ra xa",
          "padding/margin dọc KHÔNG đẩy các dòng khác ra (không chiếm chỗ dọc) — khác hẳn block",
          "Bị cấm hoàn toàn",
          "Tự đổi thành ngang",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mặc định display của thẻ <div> và <a> lần lượt là gì?",
        options: [
          "Cả hai block",
          "div là block, a là inline",
          "div là inline, a là block",
          "Cả hai inline-block",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có nhãn class nhan-block là <span>. Viết rule .nhan-block đổi thành khối (display: block) và đặt  width: 120px.",
        requirements: [
          { type: "selector", value: ".nhan-block" },
          { type: "value", selector: ".nhan-block", name: "display", value: "block" },
          { type: "value", selector: ".nhan-block", name: "width", value: "120px" },
        ],
        starterCode: "/* HTML căn cứ:\n<span class=\"nhan-block\">Trạng thái</span>\n*/\n",
      },
    ],
  },
  {
    name: "inline-block",
    topic: "Display",
    part: PART,
    description: "Kết hợp: nằm cùng dòng nhưng nhận width/height/padding dọc",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "display: inline-block  kết hợp ưu điểm gì?",
        options: [
          "Nằm cùng dòng (như inline) NHƯNG nhận được width/height/padding dọc (như block)",
          "Luôn xuống dòng và rộng kín",
          "Ẩn phần tử",
          "Xóa khoảng cách dòng",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn các nút <a> nằm CÙNG DÒNG nhưng vẫn đặt được padding dọc, dùng display nào?",
        options: ["block", "inline-block", "inline", "none"],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "So với inline, inline-block khác biệt cốt lõi ở chỗ nào?",
        options: [
          "Nhận được width/height",
          "Luôn xuống dòng",
          "Không hiển thị",
          "Mất màu nền",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hai phần tử inline-block xuất hiện KHOẢNG HỞ ~4px dù margin: 0. Vì sao?",
        options: [
          "Lỗi trình duyệt",
          "Khoảng TRẮNG/xuống dòng giữa hai thẻ trong HTML bị tính thành một dấu cách — đặc tính của inline-block",
          "Do padding mặc định",
          "Do border",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Ngày nay vì sao Flexbox thường thay thế inline-block cho việc xếp hàng ngang?",
        options: [
          "inline-block đã bị loại bỏ",
          "Flex không dính lỗi khoảng hở khoảng trắng, căn chỉnh và phân bố khoảng cách dễ hơn nhiều",
          "inline-block chậm hơn",
          "Flex là bắt buộc của HTML5",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "vertical-align ảnh hưởng tới inline-block thế nào?",
        options: [
          "Không ảnh hưởng",
          "Quyết định cách các hộp inline-block căn theo nhau theo chiều dọc (top, middle, baseline) — hay dùng để sửa lệch hàng",
          "Đổi màu chữ",
          "Chỉ dùng cho bảng",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có các thẻ nhãn class the-tag. Viết rule .the-tag đặt  display: inline-block,  padding: 4px 10px  và  margin: 4px.",
        requirements: [
          { type: "selector", value: ".the-tag" },
          { type: "value", selector: ".the-tag", name: "display", value: "inline-block" },
          { type: "value", selector: ".the-tag", name: "padding", value: "4px 10px" },
          { type: "value", selector: ".the-tag", name: "margin", value: "4px" },
        ],
        starterCode: "/* HTML căn cứ:\n<span class=\"the-tag\">CSS</span>\n<span class=\"the-tag\">HTML</span>\n*/\n",
      },
    ],
  },
  {
    name: "display none",
    topic: "Display",
    part: PART,
    description: "Gỡ phần tử khỏi layout hoàn toàn",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "display: none  có tác dụng gì?",
        options: [
          "Làm mờ phần tử",
          "GỠ phần tử khỏi layout — không hiển thị, KHÔNG chiếm chỗ",
          "Ẩn nhưng vẫn giữ chỗ",
          "Thu nhỏ về 1px",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Menu mobile ẩn/hiện khi bấm nút — thường bật tắt thuộc tính nào bằng JS?",
        options: ["opacity", "display (none ↔ block/flex)", "color", "z-index"],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Phần tử display: none còn nhận sự kiện click không?",
        options: ["Có", "Không — nó không tồn tại trong layout lẫn tương tác", "Chỉ trên mobile", "Tùy z-index"],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau cốt lõi giữa display: none và visibility: hidden?",
        options: [
          "Như nhau",
          "none gỡ hẳn (không chiếm chỗ); hidden ẩn nhưng GIỮ chỗ trống",
          "none vẫn chiếm chỗ",
          "hidden xóa khỏi DOM",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hay dùng display: none kết hợp media query để làm gì?",
        options: [
          "Đổi font theo màn hình",
          "Ẩn phần tử ở một số kích thước màn hình (vd ẩn menu desktop trên mobile, hiện menu hamburger)",
          "Tăng tốc tải",
          "Đổi màu nền",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao không nên dùng display: none để ẩn nội dung quan trọng cho SEO/screen reader?",
        options: [
          "Trình duyệt cấm",
          "Nội dung bị loại khỏi cây hiển thị — máy đọc màn hình bỏ qua, công cụ tìm kiếm coi nhẹ",
          "Làm trang chậm",
          "Gây lỗi cú pháp",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có banner class banner-cu cần ẩn hẳn. Viết rule .banner-cu đặt  display: none.",
        requirements: [
          { type: "selector", value: ".banner-cu" },
          { type: "value", selector: ".banner-cu", name: "display", value: "none" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"banner-cu\">Khuyến mãi đã kết thúc</div>\n*/\n",
      },
    ],
  },

  // ===== CHƯƠNG 11: FLEXBOX =====
  {
    name: "display flex",
    topic: "Flexbox",
    part: PART,
    description: "Bật chế độ flex — xếp các con thành hàng linh hoạt",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bật Flexbox cho một khung chứa dùng khai báo nào?",
        options: ["display: flex;", "flex: on;", "layout: flex;", "display: flexbox;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khi đặt display: flex lên phần tử CHA, các con mặc định xếp thế nào?",
        options: [
          "Xếp dọc thành cột",
          "Xếp NGANG thành một hàng (row)",
          "Chồng lên nhau",
          "Mỗi con một dòng riêng",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong Flexbox, ta đặt display: flex lên phần tử nào?",
        options: [
          "Lên từng con",
          "Lên phần tử CHA (flex container) chứa các con cần xếp",
          "Lên thẻ body",
          "Lên thẻ html",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao Flexbox vượt trội inline-block/float cho việc xếp hàng?",
        options: [
          "Flex render nhanh hơn nhiều",
          "Flex căn chỉnh hai trục, phân bố khoảng cách, co giãn con tự động — không dính lỗi khoảng hở hay clearfix",
          "Flex là bắt buộc",
          "Float đã bị xóa",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Flex container có hai TRỤC. Trục chính (main axis) mặc định nằm theo hướng nào?",
        options: [
          "Dọc (trên-xuống)",
          "Ngang (trái-phải) vì flex-direction mặc định là row",
          "Chéo",
          "Tùy nội dung",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "display: flex và display: inline-flex khác nhau ở đâu?",
        options: [
          "Như nhau",
          "flex làm container thành BLOCK (chiếm cả dòng); inline-flex làm container thành INLINE (nằm cùng dòng văn bản) — bên trong vẫn flex như nhau",
          "inline-flex không xếp ngang được",
          "flex không nhận con",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thanh điều hướng class thanh-nav chứa nhiều link. Viết rule .thanh-nav bật  display: flex  và  gap: 16px.",
        requirements: [
          { type: "selector", value: ".thanh-nav" },
          { type: "value", selector: ".thanh-nav", name: "display", value: "flex" },
          { type: "value", selector: ".thanh-nav", name: "gap", value: "16px" },
        ],
        starterCode: "/* HTML căn cứ:\n<nav class=\"thanh-nav\">\n  <a href=\"/\">Trang chủ</a>\n  <a href=\"/tin\">Tin</a>\n  <a href=\"/lien-he\">Liên hệ</a>\n</nav>\n*/\n",
      },
    ],
  },
  {
    name: "flex-direction",
    topic: "Flexbox",
    part: PART,
    description: "Đổi hướng trục chính: row (ngang) hoặc column (dọc)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Xếp các con flex thành CỘT DỌC dùng khai báo nào?",
        options: [
          "flex-direction: column;",
          "flex-direction: vertical;",
          "flex: column;",
          "direction: down;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn đặt display: flex nhưng chưa khai báo flex-direction. Giá trị MẶC ĐỊNH của flex-direction là gì?",
        options: ["column", "row (xếp ngang)", "row-reverse", "none"],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "flex-direction: row-reverse  làm gì?",
        options: [
          "Xếp dọc ngược",
          "Xếp ngang nhưng ĐẢO thứ tự (con đầu nằm bên phải)",
          "Xoay 90 độ",
          "Ẩn con đầu",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi đổi flex-direction: column, justify-content giờ căn theo trục nào?",
        options: [
          "Vẫn trục ngang",
          "Trục DỌC — vì trục chính đã đổi thành dọc; căn ngang giờ là việc của align-items",
          "Cả hai trục",
          "Không còn tác dụng",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Layout 'sidebar bên trái + nội dung bên phải' nên dùng flex-direction nào ở khung ngoài?",
        options: [
          "column",
          "row (mặc định) — hai khối nằm cạnh nhau theo chiều ngang",
          "column-reverse",
          "row-reverse luôn",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Trên mobile muốn sidebar XUỐNG DƯỚI nội dung, cách responsive phổ biến?",
        options: [
          "Xóa sidebar",
          "Trong media query màn nhỏ, đổi container sang flex-direction: column",
          "Dùng float",
          "Tăng z-index",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có thẻ thông tin class the-doc. Viết rule .the-doc bật  display: flex  và xếp dọc với  flex-direction: column.",
        requirements: [
          { type: "selector", value: ".the-doc" },
          { type: "value", selector: ".the-doc", name: "display", value: "flex" },
          { type: "value", selector: ".the-doc", name: "flex-direction", value: "column" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"the-doc\">\n  <img src=\"sp.jpg\" alt=\"\">\n  <h3>Tên sản phẩm</h3>\n  <p>Mô tả</p>\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "justify-content",
    topic: "Flexbox",
    part: PART,
    description: "Căn và phân bố các con dọc theo TRỤC CHÍNH",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đẩy các con flex về CHÍNH GIỮA theo trục chính dùng giá trị nào?",
        options: [
          "justify-content: center;",
          "align-items: center;",
          "text-align: center;",
          "justify: middle;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Layout header 'logo bên trái, menu bên phải' — đẩy hai cụm ra hai đầu dùng giá trị nào?",
        options: [
          "space-between",
          "center",
          "flex-start",
          "stretch",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "justify-content tác động theo trục nào (khi flex-direction: row)?",
        options: ["Trục dọc", "Trục NGANG (trục chính)", "Cả hai", "Không trục nào"],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau giữa space-between và space-around?",
        options: [
          "Như nhau",
          "space-between: không khoảng trống ở hai mép, chỉ chia giữa các con; space-around: mỗi con có khoảng đệm hai bên nên có nửa khoảng ở mép",
          "space-around không có khoảng giữa",
          "space-between đẩy về giữa",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "space-evenly khác space-around thế nào?",
        options: [
          "Như nhau",
          "space-evenly chia MỌI khoảng trống (kể cả hai mép) BẰNG NHAU; space-around để khoảng mép bằng nửa khoảng giữa",
          "space-evenly dồn về phải",
          "space-evenly bỏ khoảng mép",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi flex-direction: column, justify-content: center căn các con thế nào?",
        options: [
          "Căn giữa theo chiều NGANG",
          "Căn giữa theo chiều DỌC — vì trục chính lúc này là dọc",
          "Không tác dụng",
          "Dàn đều ngang",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có header class header-bar. Viết rule .header-bar bật  display: flex  và đẩy hai cụm ra hai đầu với  justify-content: space-between.",
        requirements: [
          { type: "selector", value: ".header-bar" },
          { type: "value", selector: ".header-bar", name: "display", value: "flex" },
          { type: "value", selector: ".header-bar", name: "justify-content", value: "space-between" },
        ],
        starterCode: "/* HTML căn cứ:\n<header class=\"header-bar\">\n  <div class=\"logo\">ShopVN</div>\n  <nav>...</nav>\n</header>\n*/\n",
      },
    ],
  },
  {
    name: "align-items",
    topic: "Flexbox",
    part: PART,
    description: "Căn các con theo TRỤC PHỤ (vuông góc trục chính)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trong flex row, căn các con vào GIỮA theo chiều DỌC dùng khai báo nào?",
        options: [
          "align-items: center;",
          "justify-content: center;",
          "vertical-align: middle;",
          "align: center;",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "align-items tác động theo trục nào (khi flex-direction: row)?",
        options: ["Trục ngang", "Trục DỌC (trục phụ)", "Cả hai", "Không trục nào"],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Combo căn một phần tử vào CHÍNH GIỮA khung cả hai chiều?",
        options: [
          "display: flex; justify-content: center; align-items: center;",
          "text-align: center; margin: auto;",
          "align: center center;",
          "position: center;",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Flex container chưa đặt align-items nên mặc định là stretch. stretch ở đây nghĩa là gì?",
        options: [
          "Các con căn lên đầu",
          "Các con KÉO GIÃN lấp đầy chiều cao trục phụ (nếu không có chiều cao cố định) — vì sao các thẻ cùng hàng tự cao bằng nhau",
          "Các con co lại nhỏ nhất",
          "Các con căn giữa",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau giữa align-items và align-content?",
        options: [
          "Như nhau",
          "align-items căn các con trong MỘT dòng theo trục phụ; align-content căn KHOẢNG CÁCH GIỮA NHIỀU DÒNG (chỉ có tác dụng khi flex-wrap và có ≥2 dòng)",
          "align-content căn theo trục chính",
          "align-items chỉ cho cột",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một item trong hàng flex cần căn KHÁC các item còn lại. align-self dùng để làm gì?",
        options: [
          "Căn toàn bộ container",
          "Ghi đè align-items cho RIÊNG MỘT con — vd cả hàng căn giữa nhưng một con tự căn xuống đáy",
          "Căn theo trục chính",
          "Đổi flex-direction",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có khung canh-giua. Viết rule .canh-giua căn một phần tử vào CHÍNH GIỮA cả hai chiều:  display: flex,  justify-content: center,  align-items: center.",
        requirements: [
          { type: "selector", value: ".canh-giua" },
          { type: "value", selector: ".canh-giua", name: "display", value: "flex" },
          { type: "value", selector: ".canh-giua", name: "justify-content", value: "center" },
          { type: "value", selector: ".canh-giua", name: "align-items", value: "center" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"canh-giua\">\n  <button>Bắt đầu</button>\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "flex-wrap",
    topic: "Flexbox",
    part: PART,
    description: "Cho phép các con xuống dòng khi chật thay vì co ép",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Cho phép các con flex XUỐNG DÒNG khi không đủ chỗ dùng khai báo nào?",
        options: ["flex-wrap: wrap;", "flex-break: on;", "wrap: true;", "overflow: wrap;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Các item flex bị ép chật trên một hàng vì bạn chưa đặt flex-wrap. Giá trị MẶC ĐỊNH của flex-wrap là gì?",
        options: [
          "wrap",
          "nowrap — các con ép trên MỘT dòng, co nhỏ lại nếu chật",
          "wrap-reverse",
          "auto",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lưới thẻ sản phẩm muốn tự xuống dòng khi màn hình hẹp — cần khai báo gì?",
        options: ["flex-wrap: wrap;", "flex-direction: column;", "display: block;", "overflow: scroll;"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Với nowrap, khi tổng chiều rộng con vượt container thì sao?",
        options: [
          "Tự xuống dòng",
          "Các con bị CO NHỎ lại (theo flex-shrink) để ép vừa một dòng",
          "Container phình to",
          "Con cuối bị ẩn",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Shorthand  flex-flow: row wrap  gộp hai thuộc tính nào?",
        options: [
          "justify-content và align-items",
          "flex-direction và flex-wrap",
          "flex-grow và flex-shrink",
          "gap và padding",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi flex-wrap: wrap tạo nhiều dòng, thuộc tính nào căn khoảng cách GIỮA CÁC DÒNG?",
        options: ["justify-content", "align-content", "align-items", "gap-y"],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có lưới thẻ class luoi-the. Viết rule .luoi-the với  display: flex,  flex-wrap: wrap  và  gap: 16px.",
        requirements: [
          { type: "selector", value: ".luoi-the" },
          { type: "value", selector: ".luoi-the", name: "display", value: "flex" },
          { type: "value", selector: ".luoi-the", name: "flex-wrap", value: "wrap" },
          { type: "value", selector: ".luoi-the", name: "gap", value: "16px" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"luoi-the\">\n  <div class=\"the\">1</div>\n  <div class=\"the\">2</div>\n  <div class=\"the\">3</div>\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "flex-grow",
    topic: "Flexbox",
    part: PART,
    description: "Cho con co giãn chiếm phần dư: flex 1, shorthand flex",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Cho một con flex CHIẾM HẾT khoảng trống còn dư dùng khai báo nào?",
        options: ["flex-grow: 1;", "width: 100%;", "flex-fill: max;", "grow: all;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "flex-grow: 0 (mặc định) nghĩa là gì?",
        options: [
          "Con co về 0",
          "Con KHÔNG giãn ra chiếm phần dư — giữ kích thước theo nội dung/width",
          "Con giãn tối đa",
          "Con bị ẩn",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Hai con cùng flex-grow: 1 thì phần dư chia thế nào?",
        options: ["Con đầu lấy hết", "Chia ĐỀU cho hai con", "Con sau lấy hết", "Không chia"],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một con flex-grow: 2, một con flex-grow: 1 — phần DƯ chia thế nào?",
        options: [
          "Bằng nhau",
          "Con grow:2 nhận GẤP ĐÔI phần dư so với con grow:1 (chia theo tỷ lệ 2:1)",
          "Con grow:2 nhận hết",
          "Chia theo width",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Shorthand  flex: 1  tương đương bộ ba giá trị nào?",
        options: [
          "flex-grow:1; flex-shrink:1; flex-basis:0",
          "flex-grow:1; flex-shrink:0; flex-basis:auto",
          "flex-grow:0; flex-shrink:1; flex-basis:100%",
          "flex-grow:1 duy nhất",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "flex-basis đóng vai trò gì trong shorthand flex?",
        options: [
          "Màu nền con",
          "KÍCH THƯỚC CƠ SỞ của con dọc trục chính TRƯỚC khi grow/shrink phân chia phần dư/thiếu",
          "Số dòng tối đa",
          "Khoảng cách giữa các con",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "Layout có sidebar cố định và vùng nội dung class noi-dung cần chiếm hết phần còn lại. Viết rule .noi-dung đặt  flex-grow: 1  và  padding: 24px.",
        requirements: [
          { type: "selector", value: ".noi-dung" },
          { type: "value", selector: ".noi-dung", name: "flex-grow", value: "1" },
          { type: "value", selector: ".noi-dung", name: "padding", value: "24px" },
        ],
        starterCode: "/* HTML căn cứ:\n<div style=\"display:flex\">\n  <aside style=\"width:240px\">Menu</aside>\n  <main class=\"noi-dung\">Bài viết</main>\n</div>\n*/\n",
      },
    ],
  },
  {
    name: "gap",
    topic: "Flexbox",
    part: PART,
    description: "Khoảng cách giữa các con flex/grid — gọn hơn margin",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo khoảng cách đều giữa các con flex dùng khai báo nào (đặt trên container)?",
        options: ["gap: 16px;", "margin: 16px;", "spacing: 16px;", "child-gap: 16px;"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "gap được đặt trên phần tử nào?",
        options: [
          "Từng con",
          "Phần tử CHA (flex/grid container)",
          "Thẻ body",
          "Mỗi con và cha",
        ],
        correctIndex: 1,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "gap: 12px 24px  nghĩa là gì?",
        options: [
          "12px mọi phía",
          "Khoảng cách hàng (dọc) 12px, khoảng cách cột (ngang) 24px",
          "12px trái, 24px phải",
          "Lỗi cú pháp",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao gap tiện hơn margin để tạo khoảng cách giữa các con?",
        options: [
          "gap render nhanh hơn",
          "gap chỉ chèn khoảng GIỮA các con — không dư khoảng ở mép đầu/cuối như margin, khỏi phải xử lý con cuối (:last-child)",
          "margin không dùng được trong flex",
          "gap tự đổi màu",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "gap có hoạt động trong CSS Grid không?",
        options: [
          "Không, chỉ flex",
          "Có — gap dùng được cho cả Grid (vốn là nơi nó ra đời) lẫn Flexbox",
          "Chỉ grid",
          "Chỉ khi flex-wrap",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "row-gap và column-gap khác gap thế nào?",
        options: [
          "Không liên quan",
          "Chúng đặt riêng khoảng cách HÀNG và CỘT; gap là shorthand gộp cả hai",
          "row-gap chỉ cho bảng",
          "column-gap là margin",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: "WRITE_CSS",
        prompt: "HTML có danh sách thẻ class ds-the dạng flex. Viết rule .ds-the đặt  display: flex  và  gap: 20px.",
        requirements: [
          { type: "selector", value: ".ds-the" },
          { type: "value", selector: ".ds-the", name: "display", value: "flex" },
          { type: "value", selector: ".ds-the", name: "gap", value: "20px" },
        ],
        starterCode: "/* HTML căn cứ:\n<div class=\"ds-the\">\n  <div>A</div><div>B</div><div>C</div>\n</div>\n*/\n",
      },
    ],
  },
];
