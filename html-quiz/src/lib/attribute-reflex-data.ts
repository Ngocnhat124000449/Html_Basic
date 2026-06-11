// Phản xạ THUỘC TÍNH: tình huống thực tế → gõ tên thuộc tính.
// Bổ trợ cho kho attribute-data.ts (giai đoạn 3 của kế hoạch thuộc tính).

export type AttributeReflexQuestion = {
  /** Đáp án chính (tên thuộc tính) */
  attr: string;
  /** Các cách viết khác được chấp nhận */
  accept?: string[];
  /** Chấp nhận đáp án bắt đầu bằng attr (cho data-*) */
  prefix?: boolean;
  /** Thẻ ngữ cảnh */
  tag: string;
  prompt: string;
  explain: string;
};

export const ATTRIBUTE_REFLEX_QUESTIONS: AttributeReflexQuestion[] = [
  // ===== <a> =====
  {
    attr: "href",
    tag: "a",
    prompt: "Chữ 'Giỏ hàng' đã bọc trong thẻ <a> nhưng bấm không đi đâu cả. Thiếu thuộc tính nào?",
    explain: "href chứa địa chỉ đích — thiếu nó <a> không còn là liên kết.",
  },
  {
    attr: "target",
    tag: "a",
    prompt: "Link đến trang đối tác phải mở trong TAB MỚI thay vì rời trang hiện tại.",
    explain: 'target="_blank" mở tab mới — nhớ kèm rel="noopener".',
  },
  {
    attr: "rel",
    tag: "a",
    prompt: 'Link đã có target="_blank" — cần thêm thuộc tính bảo mật nào với giá trị noopener?',
    explain: 'rel="noopener" chặn trang mới điều khiển trang cũ qua window.opener.',
  },
  {
    attr: "download",
    tag: "a",
    prompt: "Bấm link là TẢI file hóa đơn PDF về máy thay vì mở ra xem.",
    explain: "download biến link thành nút tải file, có thể đặt tên file tải về.",
  },
  {
    attr: "hreflang",
    tag: "a",
    prompt: "Link sang bản tiếng Anh của trang — khai báo ngôn ngữ của trang đích cho SEO.",
    explain: 'hreflang="en" cho biết ngôn ngữ trang đích.',
  },
  // ===== <img> =====
  {
    attr: "src",
    tag: "img",
    prompt: "Thẻ ảnh hiển thị khung rỗng vì chưa khai báo đường dẫn file ảnh.",
    explain: "src trỏ đến file ảnh — thuộc tính bắt buộc của <img>.",
  },
  {
    attr: "alt",
    tag: "img",
    prompt: "Người dùng máy đọc màn hình cần nghe mô tả ảnh; khi ảnh lỗi cũng hiện chữ thay thế.",
    explain: "alt là văn bản thay thế — bắt buộc cho accessibility.",
  },
  {
    attr: "loading",
    tag: "img",
    prompt: "Ảnh cuối trang chỉ nên tải khi người dùng cuộn gần đến (giá trị lazy).",
    explain: 'loading="lazy" hoãn tải ảnh ngoài màn hình — tăng tốc trang.',
  },
  {
    attr: "width",
    tag: "img",
    prompt: "Khai báo BỀ NGANG của ảnh (px) để trình duyệt giữ chỗ, tránh giật layout.",
    explain: "width (+ height) giúp trình duyệt biết kích thước trước khi ảnh tải xong.",
  },
  {
    attr: "height",
    tag: "img",
    prompt: "Khai báo CHIỀU CAO của ảnh (px) để giữ chỗ chống giật layout.",
    explain: "height (+ width) chống Cumulative Layout Shift.",
  },
  {
    attr: "srcset",
    tag: "img",
    prompt: "Khai báo nhiều phiên bản ảnh để điện thoại tải bản nhỏ, desktop tải bản lớn.",
    explain: "srcset liệt kê các phiên bản ảnh theo độ rộng cho responsive.",
  },
  {
    attr: "decoding",
    tag: "img",
    prompt: "Cho ảnh giải mã không chặn render trang (giá trị async).",
    explain: 'decoding="async" — tối ưu hiệu năng nâng cao.',
  },
  // ===== <video> / <audio> / <source> =====
  {
    attr: "controls",
    tag: "video",
    prompt: "Video nhúng đúng file nhưng người xem không có nút play/pause, âm lượng.",
    explain: "controls bật bộ điều khiển có sẵn của trình duyệt.",
  },
  {
    attr: "autoplay",
    tag: "video",
    prompt: "Video nền hero phải TỰ CHẠY ngay khi trang mở (kèm tắt tiếng).",
    explain: "autoplay tự phát — trình duyệt chỉ cho phép khi kèm muted.",
  },
  {
    attr: "muted",
    tag: "video",
    prompt: "Trình duyệt chỉ cho video tự phát khi đã làm gì với âm thanh? (thuộc tính)",
    explain: "muted tắt tiếng — điều kiện để autoplay hoạt động.",
  },
  {
    attr: "loop",
    tag: "video",
    prompt: "Đoạn phim nền phải phát lại từ đầu mãi mãi, không dừng.",
    explain: "loop phát lặp vô hạn.",
  },
  {
    attr: "poster",
    tag: "video",
    prompt: "Hiện ảnh bìa đẹp trước khi người xem bấm phát video (thay khung hình đen).",
    explain: "poster là ảnh thumbnail hiển thị trước khi phát.",
  },
  {
    attr: "playsinline",
    tag: "video",
    prompt: "Trên iPhone, video nền bị bung toàn màn hình — thuộc tính nào để phát ngay trong trang?",
    explain: "playsinline cần cho video nền trên iOS.",
  },
  {
    attr: "preload",
    tag: "audio",
    prompt: "Trang có 50 tập podcast — đừng tải trước dữ liệu audio nào cả (giá trị none).",
    explain: 'preload="none" tiết kiệm băng thông khi có nhiều media.',
  },
  {
    attr: "type",
    tag: "source",
    prompt: "Trong thẻ <source>, khai báo định dạng MIME (video/webm) để trình duyệt chọn không cần tải thử.",
    explain: 'type="video/webm" giúp trình duyệt bỏ qua định dạng nó không hỗ trợ.',
  },
  {
    attr: "media",
    tag: "source",
    prompt: "Trong <picture>, nguồn ảnh này chỉ áp dụng khi màn hình rộng từ 800px trở lên.",
    explain: 'media="(min-width: 800px)" — điều kiện chọn nguồn.',
  },
  // ===== <form> =====
  {
    attr: "action",
    tag: "form",
    prompt: "Form cần biết ĐỊA CHỈ server nhận dữ liệu khi submit.",
    explain: "action là URL đích của form.",
  },
  {
    attr: "method",
    tag: "form",
    prompt: "Form đăng nhập đang gửi mật khẩu lộ trên URL — đổi thuộc tính nào sang giá trị post?",
    explain: 'method="post" gửi dữ liệu trong body thay vì trên URL.',
  },
  {
    attr: "enctype",
    tag: "form",
    prompt: "Form có ô upload file — phải đặt thuộc tính nào thành multipart/form-data?",
    explain: "enctype quyết định cách mã hóa dữ liệu; upload file bắt buộc multipart/form-data.",
  },
  {
    attr: "autocomplete",
    tag: "form",
    prompt: "Tắt tính năng trình duyệt tự điền dữ liệu cũ cho cả form (giá trị off).",
    explain: 'autocomplete="off" tắt tự điền — dùng cho form nội bộ nhạy cảm.',
  },
  {
    attr: "novalidate",
    tag: "form",
    prompt: "Bỏ qua toàn bộ kiểm tra hợp lệ mặc định của trình duyệt để JavaScript tự xử lý.",
    explain: "novalidate tắt HTML validation khi submit.",
  },
  // ===== <input> =====
  {
    attr: "type",
    tag: "input",
    prompt: "Biến ô nhập chữ thường thành ô MẬT KHẨU hiện dấu chấm tròn — đổi thuộc tính nào?",
    explain: 'type="password" — type quyết định loại ô nhập.',
  },
  {
    attr: "name",
    tag: "input",
    prompt: "Đã gõ dữ liệu nhưng khi submit, trường này KHÔNG xuất hiện trong request — thiếu gì?",
    explain: "name là khóa của dữ liệu — thiếu name thì giá trị không được gửi.",
  },
  {
    attr: "placeholder",
    tag: "input",
    prompt: "Chữ gợi ý mờ 'ten@email.com' hiện trong ô khi chưa nhập gì.",
    explain: "placeholder là gợi ý — không thay được <label>.",
  },
  {
    attr: "required",
    tag: "input",
    prompt: "Trình duyệt phải CHẶN submit và báo lỗi nếu ô này còn trống.",
    explain: "required bắt buộc nhập, trình duyệt tự kiểm tra.",
  },
  {
    attr: "value",
    tag: "input",
    prompt: "Form sửa hồ sơ cần ĐIỀN SẴN tên cũ của người dùng vào ô nhập.",
    explain: "value đặt giá trị có sẵn của ô.",
  },
  {
    attr: "checked",
    tag: "input",
    prompt: "Checkbox 'Ghi nhớ đăng nhập' phải được TICK SẴN khi mở trang.",
    explain: "checked đánh dấu checkbox/radio được chọn mặc định.",
  },
  {
    attr: "disabled",
    tag: "input",
    prompt: "Khóa hẳn ô nhập: mờ đi, không gõ được và KHÔNG gửi giá trị khi submit.",
    explain: "disabled khóa hoàn toàn (khác readonly vẫn gửi giá trị).",
  },
  {
    attr: "readonly",
    tag: "input",
    prompt: "Ô hiện mã đơn hàng hệ thống tự sinh: xem được, không sửa được, nhưng VẪN gửi đi.",
    explain: "readonly chỉ đọc nhưng giá trị vẫn được submit (khác disabled).",
  },
  {
    attr: "min",
    tag: "input",
    prompt: "Ô số lượng không cho nhập giá trị NHỎ hơn 1.",
    explain: 'min="1" — giới hạn dưới cho input number/date.',
  },
  {
    attr: "max",
    tag: "input",
    prompt: "Ô số lượng không cho nhập VƯỢT quá 99.",
    explain: 'max="99" — giới hạn trên.',
  },
  {
    attr: "step",
    tag: "input",
    prompt: "Ô giá tiền nhảy theo bội số 1000 mỗi lần bấm mũi tên tăng giảm.",
    explain: 'step="1000" — bước nhảy của input number.',
  },
  {
    attr: "pattern",
    tag: "input",
    prompt: "Bắt ô nhập phải khớp biểu thức chính quy [0-9]{10} (số điện thoại 10 chữ số).",
    explain: "pattern kiểm tra định dạng bằng regex khi submit.",
  },
  {
    attr: "maxlength",
    tag: "input",
    prompt: "Ô tên hiển thị không cho gõ quá 20 ký tự.",
    explain: 'maxlength="20" chặn nhập vượt giới hạn.',
  },
  {
    attr: "minlength",
    tag: "input",
    prompt: "Mật khẩu phải gõ tối thiểu 8 ký tự — trình duyệt tự kiểm tra khi submit.",
    explain: 'minlength="8" — độ dài tối thiểu.',
  },
  {
    attr: "accept",
    tag: "input",
    prompt: "Ô chọn file chỉ cho chọn ẢNH (image/*), không hiện file khác.",
    explain: 'accept="image/*" lọc loại file trong hộp chọn.',
  },
  {
    attr: "multiple",
    tag: "input",
    prompt: "Ô upload cho phép chọn NHIỀU file cùng lúc.",
    explain: "multiple cho phép chọn nhiều file/giá trị.",
  },
  {
    attr: "autofocus",
    tag: "input",
    prompt: "Con trỏ tự nằm sẵn trong ô tìm kiếm ngay khi trang vừa mở.",
    explain: "autofocus tự focus khi trang tải — mỗi trang chỉ một phần tử.",
  },
  // ===== <label> / <button> =====
  {
    attr: "for",
    tag: "label",
    prompt: "Bấm vào chữ nhãn thì con trỏ nhảy vào ô nhập có id tương ứng — nhãn cần thuộc tính nào?",
    explain: 'for="id-ô-nhập" liên kết label với input.',
  },
  {
    attr: "type",
    tag: "button",
    prompt: "Nút 'Hiện mật khẩu' trong form cứ bấm là form bị gửi đi — đặt thuộc tính nào thành button?",
    explain: 'Trong form, <button> mặc định là submit — phải ghi rõ type="button".',
  },
  {
    attr: "disabled",
    tag: "button",
    prompt: "Nút 'Đang gửi...' phải bấm không được trong lúc chờ server xử lý.",
    explain: "disabled vô hiệu hóa nút, tránh double-submit.",
  },
  {
    attr: "formaction",
    tag: "button",
    prompt: "Một form có hai nút: nút 'Xóa' phải gửi đến /xoa thay vì action chung của form.",
    explain: "formaction ghi đè action riêng cho từng nút submit.",
  },
  {
    attr: "value",
    tag: "button",
    prompt: "Hai nút submit 'Lưu nháp' và 'Đăng bài' — server phân biệt nút nào được bấm nhờ name kèm thuộc tính gì?",
    explain: 'name + value của nút được gửi kèm: action=draft hay action=publish.',
  },
  // ===== <textarea> / <select> / <option> / <fieldset> =====
  {
    attr: "rows",
    tag: "textarea",
    prompt: "Ô góp ý cần CAO sẵn 5 dòng khi hiển thị.",
    explain: 'rows="5" đặt chiều cao mặc định theo số dòng.',
  },
  {
    attr: "cols",
    tag: "textarea",
    prompt: "Đặt BỀ NGANG của ô nhập nhiều dòng theo số cột ký tự.",
    explain: 'cols đặt bề ngang (thực tế hay dùng CSS width hơn).',
  },
  {
    attr: "wrap",
    tag: "textarea",
    prompt: "Điều khiển cách văn bản trong ô nhiều dòng XUỐNG DÒNG khi gửi đi (soft/hard).",
    explain: 'wrap="hard" gửi cả ký tự xuống dòng theo hiển thị.',
  },
  {
    attr: "multiple",
    tag: "select",
    prompt: "Dropdown danh mục cho phép chọn NHIỀU mục cùng lúc (giữ Ctrl).",
    explain: "multiple biến select thành hộp chọn nhiều giá trị.",
  },
  {
    attr: "size",
    tag: "select",
    prompt: "Hộp chọn hiện sẵn 5 dòng dạng danh sách cuộn thay vì thả xuống.",
    explain: 'size="5" hiện sẵn N dòng.',
  },
  {
    attr: "value",
    tag: "option",
    prompt: "Dropdown hiển thị chữ 'TP. Hồ Chí Minh' nhưng server cần nhận mã 'hcm'.",
    explain: "value của option là giá trị gửi đi, khác chữ hiển thị.",
  },
  {
    attr: "selected",
    tag: "option",
    prompt: "Lựa chọn 'Size M' phải được CHỌN SẴN khi trang mở.",
    explain: "selected đặt option mặc định.",
  },
  {
    attr: "disabled",
    tag: "option",
    prompt: "Dòng đầu dropdown 'Chọn tỉnh thành...' chỉ làm placeholder, KHÔNG chọn được.",
    explain: 'Kết hợp disabled + selected + value="" làm placeholder cho select.',
  },
  {
    attr: "disabled",
    tag: "fieldset",
    prompt: "Chọn 'Nhận tại cửa hàng' thì CẢ NHÓM ô địa chỉ bị khóa bằng MỘT thuộc tính trên thẻ bao.",
    explain: "disabled trên fieldset vô hiệu mọi trường nhập bên trong.",
  },
  // ===== Danh sách & bảng =====
  {
    attr: "start",
    tag: "ol",
    prompt: "Danh sách bước ở phần 2 phải tiếp tục đánh số TỪ 6 thay vì từ 1.",
    explain: 'start="6" đặt số bắt đầu của <ol>.',
  },
  {
    attr: "reversed",
    tag: "ol",
    prompt: "Bảng xếp hạng Top 10 đếm NGƯỢC từ 10 về 1.",
    explain: "reversed đánh số giảm dần.",
  },
  {
    attr: "type",
    tag: "ol",
    prompt: "Đề mục đánh thứ tự kiểu a, b, c thay vì 1, 2, 3.",
    explain: 'type="a" đổi kiểu đánh số của <ol>.',
  },
  {
    attr: "value",
    tag: "li",
    prompt: "Một mục giữa danh sách có thứ tự phải NHẢY sang số 10.",
    explain: 'value="10" trên <li> đặt lại số thứ tự từ đó.',
  },
  {
    attr: "colspan",
    tag: "td",
    prompt: "Ô 'Tổng cộng' cuối bảng phải TRẢI RỘNG qua 3 cột.",
    explain: 'colspan="3" gộp ô theo chiều ngang.',
  },
  {
    attr: "rowspan",
    tag: "td",
    prompt: "Ô 'Quý 1' phải KÉO DÀI qua 3 hàng tháng theo chiều dọc.",
    explain: 'rowspan="3" gộp ô theo chiều dọc.',
  },
  {
    attr: "scope",
    tag: "th",
    prompt: "Ô tiêu đề bảng cần khai báo nó là nhãn của CỘT hay của HÀNG cho máy đọc màn hình.",
    explain: 'scope="col" / scope="row" làm rõ cấu trúc bảng.',
  },
  {
    attr: "headers",
    tag: "td",
    prompt: "Trong bảng phức tạp nhiều tầng tiêu đề, ô dữ liệu liệt kê id các ô tiêu đề liên quan.",
    explain: "headers nối ô dữ liệu với các <th> qua id — hỗ trợ accessibility.",
  },
  {
    attr: "abbr",
    tag: "th",
    prompt: "Tiêu đề cột 'Số lượng tồn kho' quá dài — cần tên RÚT GỌN cho máy đọc màn hình đọc lặp lại.",
    explain: 'abbr="SL" — tên ngắn của tiêu đề cột.',
  },
  // ===== blockquote / html / meta / link / script / nav =====
  {
    attr: "cite",
    tag: "blockquote",
    prompt: "Khối trích dẫn cần ghi URL NGUỒN bài gốc (máy đọc được, không hiển thị).",
    explain: "cite chứa URL nguồn trích dẫn.",
  },
  {
    attr: "lang",
    tag: "html",
    prompt: "Khai báo trang là TIẾNG VIỆT để máy đọc màn hình phát âm đúng và Google hiểu.",
    explain: '<html lang="vi"> — khai báo ngôn ngữ trang.',
  },
  {
    attr: "dir",
    tag: "html",
    prompt: "Trang tiếng Ả Rập cần chữ chạy từ PHẢI sang TRÁI (giá trị rtl).",
    explain: 'dir="rtl" đổi hướng văn bản.',
  },
  {
    attr: "charset",
    tag: "meta",
    prompt: "Khai báo bảng mã UTF-8 để tiếng Việt không lỗi font — thuộc tính nào của meta?",
    explain: '<meta charset="UTF-8"> phải đứng đầu <head>.',
  },
  {
    attr: "content",
    tag: "meta",
    prompt: "Cặp với name trong thẻ meta, thuộc tính nào chứa GIÁ TRỊ thật (vd width=device-width)?",
    explain: '<meta name="viewport" content="..."> — name là khóa, content là giá trị.',
  },
  {
    attr: "property",
    tag: "meta",
    prompt: "Thẻ meta Open Graph (og:image cho Facebook/Zalo) dùng thuộc tính nào thay cho name?",
    explain: '<meta property="og:image" ...> — chuẩn Open Graph dùng property.',
  },
  {
    attr: "http-equiv",
    tag: "meta",
    prompt: "Thẻ meta mô phỏng HTTP header, ví dụ tự refresh trang sau 5 giây.",
    explain: 'http-equiv="refresh" — hiếm dùng, ưu tiên header thật từ server.',
  },
  {
    attr: "rel",
    tag: "link",
    prompt: "Thẻ <link> cần nói rõ file đi kèm là STYLESHEET — thuộc tính nào?",
    explain: 'rel khai báo quan hệ: stylesheet, icon, preload...',
  },
  {
    attr: "media",
    tag: "link",
    prompt: "File print.css chỉ được áp dụng KHI IN trang.",
    explain: 'media="print" giới hạn điều kiện áp dụng CSS.',
  },
  {
    attr: "integrity",
    tag: "link",
    prompt: "Kiểm tra HASH của file CSS tải từ CDN để chống bị sửa đổi (Subresource Integrity).",
    explain: 'integrity="sha384-..." — trình duyệt từ chối file sai hash.',
  },
  {
    attr: "sizes",
    tag: "link",
    prompt: "Khai báo kích thước 32x32 cho favicon trong thẻ link.",
    explain: 'sizes="32x32" giúp trình duyệt chọn icon phù hợp.',
  },
  {
    attr: "src",
    tag: "script",
    prompt: "Thẻ script cần nạp file app.js từ bên ngoài thay vì viết JS inline.",
    explain: 'src trỏ đến file JavaScript ngoài.',
  },
  {
    attr: "defer",
    tag: "script",
    prompt: "Script tải SONG SONG nhưng chỉ chạy SAU khi HTML parse xong, giữ đúng thứ tự.",
    explain: "defer — lựa chọn mặc định tốt cho hầu hết script.",
  },
  {
    attr: "async",
    tag: "script",
    prompt: "Script analytics độc lập: tải song song và chạy NGAY khi tải xong, không cần thứ tự.",
    explain: "async cho script không phụ thuộc script khác.",
  },
  {
    attr: "type",
    tag: "script",
    prompt: "Bật cú pháp import/export (ES modules) cho file JS — đặt thuộc tính nào thành module?",
    explain: '<script type="module"> — tự defer, bật import/export.',
  },
  {
    attr: "nomodule",
    tag: "script",
    prompt: "Script dự phòng CHỈ chạy trên trình duyệt cũ không hiểu ES modules.",
    explain: "nomodule — trình duyệt hiện đại bỏ qua script này.",
  },
  {
    attr: "aria-label",
    tag: "nav",
    prompt: "Trang có 3 khối điều hướng — đặt TÊN 'Điều hướng chính' cho một khối để máy đọc màn hình phân biệt.",
    explain: 'aria-label đặt tên cho vùng — cần khi có nhiều <nav>.',
  },
  // ===== Thuộc tính chung (global) =====
  {
    attr: "class",
    tag: "mọi thẻ",
    prompt: "Gắn tên lớp 'btn-primary' lên phần tử để CSS định dạng hàng loạt.",
    explain: "class — thuộc tính được dùng nhiều nhất, chọn phần tử cho CSS/JS.",
  },
  {
    attr: "id",
    tag: "mọi thẻ",
    prompt: "Đặt định danh DUY NHẤT cho ô nhập để label for trỏ tới và link #anchor nhảy đến.",
    explain: "id duy nhất trên trang — đích của for, #link, getElementById.",
  },
  {
    attr: "style",
    tag: "mọi thẻ",
    prompt: "Viết CSS màu đỏ TRỰC TIẾP trên một phần tử duy nhất, không tạo class.",
    explain: 'style="color: red" — CSS inline, hạn chế dùng.',
  },
  {
    attr: "title",
    tag: "mọi thẻ",
    prompt: "Rê chuột vào chữ viết tắt 'HTML' thì hiện TOOLTIP giải nghĩa đầy đủ.",
    explain: "title hiện tooltip khi hover (không hoạt động trên cảm ứng).",
  },
  {
    attr: "hidden",
    tag: "mọi thẻ",
    prompt: "Ẩn khối thông báo khỏi trang cho đến khi JavaScript gỡ thuộc tính này ra.",
    explain: "hidden ẩn phần tử — tương đương display:none.",
  },
  {
    attr: "data-*",
    accept: ["data"],
    prefix: true,
    tag: "mọi thẻ",
    prompt: "Nhúng id sản phẩm vào nút bấm để JavaScript đọc qua dataset — nhóm thuộc tính nào?",
    explain: 'data-* (vd data-product-id) — dữ liệu tùy ý cho JS, đọc qua element.dataset.',
  },
  {
    attr: "tabindex",
    tag: "mọi thẻ",
    prompt: "Cho một div tự chế nhận focus được khi nhấn phím Tab (giá trị 0).",
    explain: 'tabindex="0" đưa phần tử vào thứ tự Tab; tránh số dương.',
  },
  {
    attr: "contenteditable",
    tag: "mọi thẻ",
    prompt: "Cho người dùng SỬA trực tiếp nội dung chữ bên trong một khối trên trang.",
    explain: 'contenteditable="true" — nền tảng của các trình soạn thảo web.',
  },
];
