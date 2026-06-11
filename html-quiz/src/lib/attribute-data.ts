// Kho dữ liệu thuộc tính của 60 thẻ HTML, phân 3 mức quan trọng.
// Dùng cho trang chi tiết thẻ (tra cứu) và các chế độ luyện thuộc tính.
//
// - essential: quan trọng nhất — thiếu là thẻ không hoạt động đúng / mất ý nghĩa
// - common:    hay dùng — gặp thường xuyên trong code thực tế
// - rare:      ít dùng nhưng hợp lệ — biết để đọc hiểu code người khác
//
// Thẻ không có thuộc tính riêng sẽ có attrs rỗng + note; mọi thẻ đều dùng được
// các thuộc tính chung trong GLOBAL_ATTRIBUTES.

export type AttrImportance = "essential" | "common" | "rare";

export type TagAttribute = {
  name: string;
  importance: AttrImportance;
  /** Thuộc tính làm gì */
  desc: string;
  /** Khi nào dùng */
  when: string;
  /** Ví dụ code ngắn */
  example: string;
  /** Cảnh báo: lỗi thời, accessibility, bảo mật... */
  warn?: string;
};

export type TagAttributeEntry = {
  tag: string;
  /** Ghi chú riêng của thẻ (vd: "không có thuộc tính riêng") */
  note?: string;
  attrs: TagAttribute[];
};

/** Thuộc tính chung — dùng được trên MỌI thẻ HTML */
export const GLOBAL_ATTRIBUTES: TagAttribute[] = [
  {
    name: "class",
    importance: "essential",
    desc: "Gắn một hoặc nhiều tên lớp để CSS/JS chọn phần tử",
    when: "Bất cứ khi nào cần định dạng bằng CSS hoặc chọn bằng JS — thuộc tính được dùng nhiều nhất trong HTML",
    example: '<p class="intro highlight">',
  },
  {
    name: "id",
    importance: "essential",
    desc: "Định danh duy nhất của phần tử trên trang",
    when: "Khi cần trỏ đích danh một phần tử: label for, anchor link #id, JS getElementById",
    example: '<input id="email">',
    warn: "Mỗi id chỉ xuất hiện một lần trên trang",
  },
  {
    name: "style",
    importance: "common",
    desc: "Viết CSS inline trực tiếp trên phần tử",
    when: "Style nhanh một chỗ duy nhất; hạn chế dùng — ưu tiên class + file CSS",
    example: '<p style="color: red">',
  },
  {
    name: "title",
    importance: "common",
    desc: "Chú thích hiện khi rê chuột (tooltip)",
    when: "Bổ sung thông tin phụ; không thay được alt/label vì cảm ứng không rê chuột được",
    example: '<abbr title="HyperText Markup Language">HTML</abbr>',
  },
  {
    name: "hidden",
    importance: "common",
    desc: "Ẩn phần tử khỏi trang",
    when: "Ẩn/hiện nội dung bằng JS mà không cần viết CSS display:none",
    example: "<div hidden>Nội dung chờ hiển thị</div>",
  },
  {
    name: "data-*",
    importance: "common",
    desc: "Nhúng dữ liệu tùy ý cho JavaScript đọc (dataset)",
    when: "Truyền dữ liệu từ HTML sang JS: data-id, data-price...",
    example: '<button data-product-id="42">Mua</button>',
  },
  {
    name: "lang",
    importance: "rare",
    desc: "Khai báo ngôn ngữ của riêng phần tử",
    when: "Khi một đoạn khác ngôn ngữ với phần còn lại của trang",
    example: '<q lang="en">Hello world</q>',
  },
  {
    name: "tabindex",
    importance: "rare",
    desc: "Điều khiển thứ tự focus khi nhấn Tab",
    when: "tabindex=\"0\" cho phần tử tự tạo cần focus được; tránh số dương",
    example: '<div tabindex="0" role="button">',
  },
  {
    name: "contenteditable",
    importance: "rare",
    desc: "Cho phép người dùng sửa nội dung trực tiếp",
    when: "Xây trình soạn thảo văn bản đơn giản",
    example: '<div contenteditable="true">Sửa được chữ này</div>',
  },
];

export const TAG_ATTRIBUTES: TagAttributeEntry[] = [
  // ===== VĂN BẢN =====
  {
    tag: "h1",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [
      {
        name: "align",
        importance: "rare",
        desc: "Căn lề tiêu đề (trái/giữa/phải)",
        when: "Chỉ gặp trong code cũ",
        example: '<h1 align="center">',
        warn: "Đã lỗi thời — dùng CSS text-align thay thế",
      },
    ],
  },
  {
    tag: "h2",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "h3",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "p",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [
      {
        name: "align",
        importance: "rare",
        desc: "Căn lề đoạn văn",
        when: "Chỉ gặp trong code cũ",
        example: '<p align="justify">',
        warn: "Đã lỗi thời — dùng CSS text-align thay thế",
      },
    ],
  },
  {
    tag: "strong",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "em",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "span",
    note: "Không có thuộc tính riêng — sức mạnh của span nằm ở class/id để CSS và JS bám vào",
    attrs: [],
  },
  {
    tag: "br",
    note: "Thẻ rỗng, không có thuộc tính riêng đáng dùng",
    attrs: [
      {
        name: "clear",
        importance: "rare",
        desc: "Ngắt dòng xuống dưới phần tử float",
        when: "Chỉ gặp trong code rất cũ",
        example: '<br clear="all">',
        warn: "Đã lỗi thời — dùng CSS clear thay thế",
      },
    ],
  },
  {
    tag: "hr",
    note: "Thẻ rỗng; mọi trang trí (độ dày, màu) làm bằng CSS",
    attrs: [
      {
        name: "size / width / align",
        importance: "rare",
        desc: "Độ dày, chiều rộng, căn lề của đường kẻ",
        when: "Chỉ gặp trong code cũ",
        example: '<hr size="3" width="50%">',
        warn: "Đã lỗi thời — dùng CSS border/width thay thế",
      },
    ],
  },
  {
    tag: "blockquote",
    attrs: [
      {
        name: "cite",
        importance: "common",
        desc: "URL nguồn của trích dẫn (máy đọc, không hiển thị)",
        when: "Khi trích từ một bài viết/trang web cụ thể",
        example: '<blockquote cite="https://vi.wikipedia.org/...">',
      },
    ],
  },
  {
    tag: "code",
    note: "Không có thuộc tính riêng — thường thêm class ngôn ngữ cho thư viện tô màu cú pháp",
    attrs: [],
  },
  {
    tag: "pre",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "mark",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "sub",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "sup",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  // ===== LIÊN KẾT & MEDIA =====
  {
    tag: "a",
    attrs: [
      {
        name: "href",
        importance: "essential",
        desc: "Địa chỉ đích của liên kết (URL, #id, mailto:, tel:)",
        when: "Luôn cần — thiếu href thì <a> không còn là liên kết",
        example: '<a href="/gio-hang">Giỏ hàng</a>',
      },
      {
        name: "target",
        importance: "common",
        desc: "Nơi mở liên kết; _blank = tab mới",
        when: "Mở tab mới khi dẫn ra trang ngoài để người dùng không rời trang của bạn",
        example: '<a href="..." target="_blank">',
      },
      {
        name: "rel",
        importance: "common",
        desc: "Quan hệ với trang đích: noopener, noreferrer, nofollow",
        when: 'Luôn kèm rel="noopener" khi dùng target="_blank" (bảo mật); nofollow cho link không bảo chứng',
        example: '<a target="_blank" rel="noopener noreferrer">',
      },
      {
        name: "download",
        importance: "rare",
        desc: "Bấm vào tải file về thay vì mở trang",
        when: "Link tải file PDF, ảnh, hóa đơn...",
        example: '<a href="/hoa-don.pdf" download="hoa-don-2026.pdf">',
      },
      {
        name: "hreflang",
        importance: "rare",
        desc: "Ngôn ngữ của trang đích",
        when: "Website đa ngôn ngữ, hỗ trợ SEO",
        example: '<a href="/en" hreflang="en">English</a>',
      },
    ],
  },
  {
    tag: "img",
    attrs: [
      {
        name: "src",
        importance: "essential",
        desc: "Đường dẫn file ảnh",
        when: "Luôn cần — thiếu src thì không có ảnh",
        example: '<img src="/anh/giay.jpg">',
      },
      {
        name: "alt",
        importance: "essential",
        desc: "Văn bản thay thế khi ảnh lỗi / cho máy đọc màn hình",
        when: "Luôn cần — ảnh trang trí thuần túy thì để alt=\"\" (rỗng) chứ không bỏ",
        example: '<img src="giay.jpg" alt="Giày Nike Air màu trắng">',
        warn: "Thiếu alt là lỗi accessibility phổ biến nhất",
      },
      {
        name: "width / height",
        importance: "common",
        desc: "Kích thước ảnh (px)",
        when: "Khai báo để trình duyệt giữ chỗ, tránh giật layout khi ảnh tải xong",
        example: '<img src="..." width="400" height="300">',
      },
      {
        name: "loading",
        importance: "common",
        desc: 'lazy = chỉ tải khi cuộn gần đến',
        when: "Ảnh nằm dưới màn hình đầu tiên — tăng tốc tải trang",
        example: '<img src="..." loading="lazy">',
      },
      {
        name: "srcset / sizes",
        importance: "rare",
        desc: "Nhiều phiên bản ảnh cho các kích thước màn hình",
        when: "Tối ưu responsive: điện thoại tải ảnh nhỏ, desktop tải ảnh lớn",
        example: '<img srcset="s.jpg 480w, l.jpg 1080w" sizes="100vw">',
      },
      {
        name: "decoding",
        importance: "rare",
        desc: "async = giải mã ảnh không chặn render",
        when: "Tối ưu hiệu năng nâng cao",
        example: '<img src="..." decoding="async">',
      },
    ],
  },
  {
    tag: "video",
    attrs: [
      {
        name: "src",
        importance: "essential",
        desc: "Đường dẫn file video (hoặc dùng <source> bên trong)",
        when: "Khi chỉ có một định dạng video",
        example: '<video src="intro.mp4"></video>',
      },
      {
        name: "controls",
        importance: "essential",
        desc: "Hiện nút play/pause, âm lượng, tua",
        when: "Hầu như luôn cần — không có thì người xem không điều khiển được",
        example: "<video src='...' controls></video>",
      },
      {
        name: "autoplay / muted / loop",
        importance: "common",
        desc: "Tự phát / tắt tiếng / lặp lại",
        when: "Video nền trang trí: cần cả ba (trình duyệt chỉ cho autoplay khi muted)",
        example: "<video autoplay muted loop>",
      },
      {
        name: "poster",
        importance: "common",
        desc: "Ảnh bìa hiện trước khi phát",
        when: "Cho video có thumbnail đẹp thay vì khung hình đen",
        example: '<video poster="bia.jpg" controls>',
      },
      {
        name: "preload",
        importance: "rare",
        desc: "Tải trước metadata/toàn bộ/không tải (metadata|auto|none)",
        when: "Tiết kiệm băng thông khi trang có nhiều video",
        example: '<video preload="metadata">',
      },
      {
        name: "playsinline",
        importance: "rare",
        desc: "Phát trong trang thay vì toàn màn hình trên iOS",
        when: "Video nền trên thiết bị di động Apple",
        example: "<video autoplay muted playsinline>",
      },
    ],
  },
  {
    tag: "audio",
    attrs: [
      {
        name: "src",
        importance: "essential",
        desc: "Đường dẫn file âm thanh",
        when: "Khi chỉ có một định dạng audio",
        example: '<audio src="podcast.mp3"></audio>',
      },
      {
        name: "controls",
        importance: "essential",
        desc: "Hiện trình phát (play, âm lượng)",
        when: "Hầu như luôn cần với audio người dùng chủ động nghe",
        example: "<audio src='...' controls></audio>",
      },
      {
        name: "loop / muted / autoplay",
        importance: "common",
        desc: "Lặp lại / tắt tiếng / tự phát",
        when: "Nhạc nền lặp; lưu ý autoplay có tiếng thường bị trình duyệt chặn",
        example: "<audio src='nhac.mp3' loop>",
      },
      {
        name: "preload",
        importance: "rare",
        desc: "Chiến lược tải trước (none|metadata|auto)",
        when: "Trang danh sách podcast dài — preload=\"none\" tiết kiệm băng thông",
        example: '<audio preload="none" controls>',
      },
    ],
  },
  {
    tag: "source",
    attrs: [
      {
        name: "src",
        importance: "essential",
        desc: "Đường dẫn file media (trong video/audio)",
        when: "Luôn cần khi nằm trong <video>/<audio>",
        example: '<source src="clip.webm" type="video/webm">',
      },
      {
        name: "type",
        importance: "essential",
        desc: "Định dạng MIME để trình duyệt chọn không cần tải thử",
        when: "Luôn nên kèm: video/mp4, video/webm, audio/mpeg...",
        example: '<source src="clip.mp4" type="video/mp4">',
      },
      {
        name: "srcset / media",
        importance: "rare",
        desc: "Nguồn ảnh theo điều kiện màn hình (trong <picture>)",
        when: "Ảnh responsive nâng cao với <picture>",
        example: '<source media="(min-width: 800px)" srcset="lon.jpg">',
      },
    ],
  },
  {
    tag: "figure",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "figcaption",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  // ===== DANH SÁCH =====
  {
    tag: "ul",
    note: "Không có thuộc tính riêng còn dùng — kiểu dấu chấm đổi bằng CSS list-style",
    attrs: [
      {
        name: "type",
        importance: "rare",
        desc: "Kiểu dấu đầu dòng (disc, circle, square)",
        when: "Chỉ gặp trong code cũ",
        example: '<ul type="square">',
        warn: "Đã lỗi thời — dùng CSS list-style-type thay thế",
      },
    ],
  },
  {
    tag: "ol",
    attrs: [
      {
        name: "start",
        importance: "common",
        desc: "Bắt đầu đánh số từ giá trị chỉ định",
        when: "Danh sách tiếp nối từ phần trước (vd bước 6 → 10)",
        example: '<ol start="6">',
      },
      {
        name: "type",
        importance: "common",
        desc: "Kiểu đánh số: 1, a, A, i, I",
        when: "Đề mục kiểu a) b) c) hoặc số La Mã i. ii. iii.",
        example: '<ol type="a">',
      },
      {
        name: "reversed",
        importance: "rare",
        desc: "Đánh số ngược (đếm lùi)",
        when: "Bảng xếp hạng đếm ngược về vị trí số 1",
        example: "<ol reversed>",
      },
    ],
  },
  {
    tag: "li",
    attrs: [
      {
        name: "value",
        importance: "common",
        desc: "Đặt số thứ tự cụ thể cho mục này (trong <ol>)",
        when: "Nhảy cóc số thứ tự giữa chừng danh sách",
        example: '<li value="10">Mục thứ mười</li>',
      },
    ],
  },
  {
    tag: "dl",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "dt",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "dd",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  // ===== BẢNG =====
  {
    tag: "table",
    note: "Mọi trang trí bảng (viền, khoảng cách ô) ngày nay làm bằng CSS",
    attrs: [
      {
        name: "border / cellpadding / cellspacing",
        importance: "rare",
        desc: "Viền và khoảng cách ô",
        when: "Chỉ gặp trong code cũ và email HTML",
        example: '<table border="1" cellpadding="8">',
        warn: "Đã lỗi thời — dùng CSS border, padding, border-collapse",
      },
    ],
  },
  {
    tag: "tr",
    note: "Không có thuộc tính riêng còn dùng — màu nền/căn lề hàng làm bằng CSS",
    attrs: [],
  },
  {
    tag: "td",
    attrs: [
      {
        name: "colspan",
        importance: "common",
        desc: "Ô trải rộng qua N cột",
        when: "Ô 'Tổng cộng' chiếm nhiều cột, gộp ô theo chiều ngang",
        example: '<td colspan="2">Tổng</td>',
      },
      {
        name: "rowspan",
        importance: "common",
        desc: "Ô kéo dài qua N hàng",
        when: "Gộp ô theo chiều dọc (một giá trị áp cho nhiều hàng)",
        example: '<td rowspan="3">Quý 1</td>',
      },
      {
        name: "headers",
        importance: "rare",
        desc: "Liệt kê id các ô <th> liên quan",
        when: "Bảng phức tạp nhiều tầng tiêu đề — hỗ trợ máy đọc màn hình",
        example: '<td headers="thang doanh-thu">',
      },
    ],
  },
  {
    tag: "th",
    attrs: [
      {
        name: "scope",
        importance: "common",
        desc: "Tiêu đề áp cho cột hay hàng (col | row)",
        when: "Luôn nên ghi để máy đọc màn hình hiểu cấu trúc bảng",
        example: '<th scope="col">Giá</th>',
      },
      {
        name: "colspan / rowspan",
        importance: "common",
        desc: "Ô tiêu đề trải qua nhiều cột / hàng",
        when: "Tiêu đề nhóm bao nhiều cột con",
        example: '<th colspan="3">Doanh thu 2026</th>',
      },
      {
        name: "abbr",
        importance: "rare",
        desc: "Tên rút gọn của tiêu đề cho máy đọc màn hình",
        when: "Tiêu đề cột quá dài, đọc lặp lại nhiều lần",
        example: '<th abbr="SL">Số lượng tồn kho</th>',
      },
    ],
  },
  {
    tag: "thead",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "tbody",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "tfoot",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "caption",
    note: "Không có thuộc tính riêng — vị trí hiển thị chỉnh bằng CSS caption-side",
    attrs: [],
  },
  // ===== FORM =====
  {
    tag: "form",
    attrs: [
      {
        name: "action",
        importance: "essential",
        desc: "Địa chỉ nhận dữ liệu khi submit",
        when: "Luôn cần (bỏ trống = gửi về chính trang hiện tại)",
        example: '<form action="/dang-ky">',
      },
      {
        name: "method",
        importance: "essential",
        desc: "Cách gửi: get (lên URL) hoặc post (trong body)",
        when: "GET cho tìm kiếm/lọc (chia sẻ được link); POST cho dữ liệu nhạy cảm hoặc làm thay đổi server",
        example: '<form action="/login" method="post">',
      },
      {
        name: "enctype",
        importance: "common",
        desc: "Kiểu mã hóa dữ liệu gửi đi",
        when: 'BẮT BUỘC multipart/form-data khi form có upload file',
        example: '<form method="post" enctype="multipart/form-data">',
      },
      {
        name: "autocomplete",
        importance: "common",
        desc: "Bật/tắt tự điền của trình duyệt cho cả form",
        when: 'Tắt (off) cho form nội bộ nhạy cảm; mặc định nên để bật',
        example: '<form autocomplete="off">',
      },
      {
        name: "novalidate",
        importance: "rare",
        desc: "Bỏ qua kiểm tra hợp lệ của trình duyệt khi submit",
        when: "Khi muốn tự kiểm tra hoàn toàn bằng JavaScript",
        example: "<form novalidate>",
      },
    ],
  },
  {
    tag: "input",
    attrs: [
      {
        name: "type",
        importance: "essential",
        desc: "Loại ô nhập: text, email, password, number, checkbox, radio, file, date...",
        when: "Luôn cần — quyết định giao diện và cách kiểm tra dữ liệu",
        example: '<input type="email">',
      },
      {
        name: "name",
        importance: "essential",
        desc: "Tên trường — khóa của dữ liệu khi gửi lên server",
        when: "Luôn cần nếu muốn dữ liệu được gửi đi khi submit",
        example: '<input type="text" name="username">',
        warn: "Thiếu name là dữ liệu KHÔNG được gửi — lỗi rất hay gặp",
      },
      {
        name: "value",
        importance: "common",
        desc: "Giá trị có sẵn / giá trị gửi đi (với checkbox, radio)",
        when: "Điền sẵn dữ liệu cũ khi sửa form; định giá trị cho radio/checkbox",
        example: '<input type="radio" name="size" value="m">',
      },
      {
        name: "placeholder",
        importance: "common",
        desc: "Chữ gợi ý mờ trong ô khi chưa nhập",
        when: "Gợi ý định dạng (vd: ten@email.com) — không thay được <label>",
        example: '<input placeholder="ten@email.com">',
      },
      {
        name: "required",
        importance: "common",
        desc: "Bắt buộc nhập — trình duyệt chặn submit nếu trống",
        when: "Mọi trường không được để trống",
        example: "<input type='email' required>",
      },
      {
        name: "disabled / readonly",
        importance: "common",
        desc: "disabled: khóa hẳn (không gửi đi); readonly: chỉ đọc (vẫn gửi)",
        when: "disabled khi chưa đủ điều kiện nhập; readonly cho giá trị hệ thống tự điền",
        example: "<input value='AUTO-42' readonly>",
      },
      {
        name: "checked",
        importance: "common",
        desc: "Checkbox/radio được chọn sẵn",
        when: "Giá trị mặc định của lựa chọn",
        example: '<input type="checkbox" checked>',
      },
      {
        name: "min / max / step",
        importance: "rare",
        desc: "Giới hạn và bước nhảy cho number/date/range",
        when: "Ô số lượng 1-99, ngày trong khoảng cho phép",
        example: '<input type="number" min="1" max="99">',
      },
      {
        name: "pattern",
        importance: "rare",
        desc: "Regex kiểm tra định dạng khi submit",
        when: "Định dạng đặc thù: mã bưu điện, biển số xe...",
        example: '<input pattern="[0-9]{10}" title="10 chữ số">',
      },
      {
        name: "maxlength / minlength",
        importance: "rare",
        desc: "Giới hạn số ký tự nhập",
        when: "Tên đăng nhập tối đa 20 ký tự, mật khẩu tối thiểu 8...",
        example: '<input minlength="8" type="password">',
      },
      {
        name: "accept / multiple",
        importance: "rare",
        desc: "Loại file cho phép / chọn nhiều file (type=file)",
        when: "Upload ảnh đại diện: accept=\"image/*\"",
        example: '<input type="file" accept="image/*" multiple>',
      },
      {
        name: "autofocus",
        importance: "rare",
        desc: "Tự focus vào ô khi trang tải xong",
        when: "Ô tìm kiếm/đăng nhập là hành động chính của trang",
        example: "<input type='search' autofocus>",
      },
    ],
  },
  {
    tag: "label",
    attrs: [
      {
        name: "for",
        importance: "essential",
        desc: "Trỏ đến id của ô nhập tương ứng",
        when: "Luôn dùng (hoặc bọc ô nhập bên trong label) — bấm nhãn là focus ô, máy đọc màn hình đọc đúng",
        example: '<label for="email">Email</label> <input id="email">',
      },
    ],
  },
  {
    tag: "button",
    attrs: [
      {
        name: "type",
        importance: "essential",
        desc: "submit (gửi form) | button (chạy JS) | reset (xóa form)",
        when: "Luôn ghi rõ — trong form, mặc định là submit nên nút JS không ghi type sẽ gửi form ngoài ý muốn",
        example: '<button type="button" onclick="...">Hiện mật khẩu</button>',
        warn: "Quên type=\"button\" là bug kinh điển khiến form tự submit",
      },
      {
        name: "disabled",
        importance: "common",
        desc: "Vô hiệu hóa nút",
        when: "Chờ xử lý (đang gửi...) hoặc chưa đủ điều kiện",
        example: "<button disabled>Đang gửi...</button>",
      },
      {
        name: "name / value",
        importance: "rare",
        desc: "Gửi kèm cặp tên-giá trị cho biết nút nào được bấm",
        when: "Form có nhiều nút submit (Lưu nháp / Đăng bài)",
        example: '<button name="action" value="draft">Lưu nháp</button>',
      },
      {
        name: "formaction",
        importance: "rare",
        desc: "Ghi đè action của form cho riêng nút này",
        when: "Một form gửi đến địa chỉ khác nhau tùy nút",
        example: '<button formaction="/xoa">Xóa</button>',
      },
    ],
  },
  {
    tag: "textarea",
    attrs: [
      {
        name: "name",
        importance: "essential",
        desc: "Tên trường khi gửi dữ liệu",
        when: "Luôn cần để dữ liệu được gửi đi",
        example: '<textarea name="gop-y"></textarea>',
      },
      {
        name: "rows / cols",
        importance: "common",
        desc: "Số hàng / cột hiển thị mặc định",
        when: "Định cỡ ban đầu của ô (chiều cao thường chỉnh thêm bằng CSS)",
        example: '<textarea rows="5"></textarea>',
      },
      {
        name: "placeholder / required / maxlength",
        importance: "common",
        desc: "Gợi ý, bắt buộc nhập, giới hạn ký tự",
        when: "Như với <input>: bình luận tối đa 500 ký tự...",
        example: '<textarea maxlength="500" required>',
      },
      {
        name: "wrap",
        importance: "rare",
        desc: "Cách xuống dòng khi gửi (soft | hard)",
        when: "Hiếm khi cần chỉnh — mặc định soft",
        example: '<textarea wrap="hard" cols="40">',
      },
    ],
  },
  {
    tag: "select",
    attrs: [
      {
        name: "name",
        importance: "essential",
        desc: "Tên trường khi gửi dữ liệu",
        when: "Luôn cần để giá trị được gửi đi",
        example: '<select name="tinh-thanh">',
      },
      {
        name: "required / disabled",
        importance: "common",
        desc: "Bắt buộc chọn / khóa dropdown",
        when: "required kèm option đầu value=\"\" làm placeholder",
        example: "<select name='size' required>",
      },
      {
        name: "multiple",
        importance: "common",
        desc: "Cho chọn nhiều giá trị cùng lúc",
        when: "Chọn nhiều tag/danh mục (giữ Ctrl để chọn)",
        example: "<select multiple>",
      },
      {
        name: "size",
        importance: "rare",
        desc: "Hiện sẵn N dòng thay vì thả xuống",
        when: "Danh sách chọn dạng hộp cuộn",
        example: '<select size="5">',
      },
    ],
  },
  {
    tag: "option",
    attrs: [
      {
        name: "value",
        importance: "essential",
        desc: "Giá trị gửi đi khi được chọn (khác chữ hiển thị)",
        when: "Luôn nên ghi — thiếu thì gửi nguyên chữ hiển thị",
        example: '<option value="hcm">TP. Hồ Chí Minh</option>',
      },
      {
        name: "selected",
        importance: "common",
        desc: "Được chọn sẵn khi tải trang",
        when: "Giá trị mặc định của dropdown",
        example: '<option value="m" selected>Size M</option>',
      },
      {
        name: "disabled",
        importance: "common",
        desc: "Lựa chọn bị mờ, không chọn được",
        when: "Option đầu làm placeholder: 'Chọn tỉnh thành...'",
        example: '<option value="" disabled selected>Chọn size...</option>',
      },
      {
        name: "label",
        importance: "rare",
        desc: "Chữ hiển thị thay cho nội dung thẻ",
        when: "Hiếm dùng trực tiếp; gặp trong <optgroup>",
        example: '<option value="1" label="Một">',
      },
    ],
  },
  {
    tag: "fieldset",
    attrs: [
      {
        name: "disabled",
        importance: "common",
        desc: "Vô hiệu hóa TOÀN BỘ trường nhập bên trong",
        when: "Khóa cả nhóm theo điều kiện (vd chọn 'nhận tại cửa hàng' thì khóa nhóm địa chỉ)",
        example: "<fieldset disabled>...</fieldset>",
      },
      {
        name: "name / form",
        importance: "rare",
        desc: "Tên nhóm / gắn với form theo id khi nằm ngoài form",
        when: "Form phức tạp tách rời vị trí",
        example: '<fieldset form="form-thanh-toan">',
      },
    ],
  },
  {
    tag: "legend",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  // ===== CẤU TRÚC TRANG =====
  {
    tag: "html",
    attrs: [
      {
        name: "lang",
        importance: "essential",
        desc: "Ngôn ngữ chính của trang",
        when: "Luôn khai báo (vd lang=\"vi\") — máy đọc màn hình phát âm đúng, hỗ trợ SEO và dịch tự động",
        example: '<html lang="vi">',
      },
      {
        name: "dir",
        importance: "rare",
        desc: "Hướng chữ: ltr (trái→phải) | rtl (phải→trái)",
        when: "Trang tiếng Ả Rập, Do Thái...",
        example: '<html lang="ar" dir="rtl">',
      },
    ],
  },
  {
    tag: "head",
    note: "Không có thuộc tính riêng — chỉ là khu vực chứa metadata",
    attrs: [],
  },
  {
    tag: "body",
    note: "Không có thuộc tính riêng còn nên dùng — sự kiện onload viết bằng JS addEventListener",
    attrs: [
      {
        name: "onload",
        importance: "rare",
        desc: "Chạy JS khi trang tải xong",
        when: "Gặp trong code cũ",
        example: '<body onload="init()">',
        warn: "Nên dùng addEventListener trong file JS thay vì inline",
      },
    ],
  },
  {
    tag: "title",
    note: "Không có thuộc tính riêng — chỉ chứa văn bản thuần",
    attrs: [],
  },
  {
    tag: "meta",
    attrs: [
      {
        name: "charset",
        importance: "essential",
        desc: "Bảng mã ký tự của trang",
        when: "Luôn cần <meta charset=\"UTF-8\"> ngay đầu <head> — thiếu là tiếng Việt lỗi font",
        example: '<meta charset="UTF-8">',
      },
      {
        name: "name + content",
        importance: "essential",
        desc: "Cặp khai báo metadata: viewport, description, robots...",
        when: 'viewport bắt buộc cho responsive; description hiện trong kết quả Google',
        example: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
      {
        name: "property (Open Graph)",
        importance: "common",
        desc: "Metadata cho mạng xã hội: og:title, og:image...",
        when: "Để link chia sẻ lên Facebook/Zalo hiện ảnh và tiêu đề đẹp",
        example: '<meta property="og:image" content="/share.jpg">',
      },
      {
        name: "http-equiv",
        importance: "rare",
        desc: "Mô phỏng HTTP header (refresh, CSP...)",
        when: "Hiếm dùng — ưu tiên cấu hình header thật trên server",
        example: '<meta http-equiv="refresh" content="5">',
      },
    ],
  },
  {
    tag: "div",
    note: "Không có thuộc tính riêng — sức mạnh nằm ở class/id/data-* cho CSS và JS",
    attrs: [],
  },
  {
    tag: "link",
    attrs: [
      {
        name: "rel",
        importance: "essential",
        desc: "Quan hệ tài nguyên: stylesheet, icon, preload...",
        when: "Luôn cần — quyết định trình duyệt làm gì với file",
        example: '<link rel="stylesheet" href="style.css">',
      },
      {
        name: "href",
        importance: "essential",
        desc: "Đường dẫn tài nguyên",
        when: "Luôn cần",
        example: '<link rel="icon" href="/favicon.ico">',
      },
      {
        name: "type / sizes",
        importance: "common",
        desc: "Kiểu MIME / kích thước icon",
        when: "Khai báo favicon nhiều kích cỡ cho các thiết bị",
        example: '<link rel="icon" sizes="32x32" href="/icon-32.png">',
      },
      {
        name: "media",
        importance: "rare",
        desc: "Chỉ áp dụng CSS theo điều kiện màn hình",
        when: "Tách CSS in ấn: media=\"print\"",
        example: '<link rel="stylesheet" media="print" href="print.css">',
      },
      {
        name: "crossorigin / integrity",
        importance: "rare",
        desc: "CORS và kiểm tra hash chống file CDN bị sửa đổi",
        when: "Nạp CSS/font từ CDN bên thứ ba (Subresource Integrity)",
        example: '<link href="https://cdn..." integrity="sha384-..." crossorigin="anonymous">',
      },
    ],
  },
  {
    tag: "script",
    attrs: [
      {
        name: "src",
        importance: "essential",
        desc: "Đường dẫn file JavaScript ngoài",
        when: "Nạp file .js (bỏ src nếu viết JS inline trong thẻ)",
        example: '<script src="app.js"></script>',
      },
      {
        name: "defer",
        importance: "common",
        desc: "Tải song song, chạy sau khi HTML parse xong, giữ đúng thứ tự",
        when: "Lựa chọn mặc định tốt nhất cho hầu hết script",
        example: '<script src="app.js" defer></script>',
      },
      {
        name: "async",
        importance: "common",
        desc: "Tải song song, chạy NGAY khi tải xong (không chờ, không giữ thứ tự)",
        when: "Script độc lập: analytics, quảng cáo",
        example: '<script src="analytics.js" async></script>',
      },
      {
        name: 'type="module"',
        importance: "common",
        desc: "Bật ES modules (import/export), tự defer",
        when: "Dự án JavaScript hiện đại dùng import/export",
        example: '<script type="module" src="main.js"></script>',
      },
      {
        name: "crossorigin / integrity",
        importance: "rare",
        desc: "CORS và kiểm tra hash file từ CDN",
        when: "Nạp thư viện từ CDN bên thứ ba an toàn",
        example: '<script src="https://cdn..." integrity="sha384-..." crossorigin="anonymous"></script>',
      },
      {
        name: "nomodule",
        importance: "rare",
        desc: "Chỉ chạy trên trình duyệt cũ không hỗ trợ module",
        when: "Fallback cho trình duyệt rất cũ — ngày càng hiếm cần",
        example: '<script nomodule src="legacy.js"></script>',
      },
    ],
  },
  // ===== NGỮ NGHĨA =====
  {
    tag: "header",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "nav",
    note: "Không có thuộc tính riêng — nên thêm aria-label khi trang có nhiều <nav>",
    attrs: [
      {
        name: "aria-label",
        importance: "common",
        desc: "Đặt tên cho khối điều hướng (ARIA)",
        when: "Trang có nhiều <nav> (menu chính, breadcrumb, footer) — máy đọc màn hình phân biệt được",
        example: '<nav aria-label="Điều hướng chính">',
      },
    ],
  },
  {
    tag: "main",
    note: "Không có thuộc tính riêng — mỗi trang chỉ một <main>",
    attrs: [],
  },
  {
    tag: "section",
    note: "Không có thuộc tính riêng — có thể dùng aria-labelledby trỏ đến heading của phần",
    attrs: [
      {
        name: "aria-labelledby",
        importance: "rare",
        desc: "Trỏ đến id của heading đặt tên cho section",
        when: "Giúp máy đọc màn hình đọc tên vùng nội dung",
        example: '<section aria-labelledby="tieu-de-km"><h2 id="tieu-de-km">Khuyến mãi</h2>',
      },
    ],
  },
  {
    tag: "article",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "aside",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
  {
    tag: "footer",
    note: "Không có thuộc tính riêng — dùng thuộc tính chung (class, id...)",
    attrs: [],
  },
];
