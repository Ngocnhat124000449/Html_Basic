// Dữ liệu chế độ Phản xạ: tình huống thực tế → người chơi gõ tên thẻ.
// Câu hỏi cố ý KHÔNG nhắc tên thẻ — mục tiêu là luyện phản xạ "nhìn nhu cầu, nghĩ ra thẻ".

export type ReflexQuestion = {
  tag: string;
  prompt: string;
  explain: string;
};

export const REFLEX_QUESTIONS: ReflexQuestion[] = [
  // ===== VĂN BẢN =====
  {
    tag: "h1",
    prompt: "Trang chủ ShopVN cần dòng chữ to nhất nêu tên cửa hàng — tiêu đề quan trọng nhất, mỗi trang chỉ nên có một.",
    explain: "<h1> là tiêu đề cấp cao nhất, mỗi trang chỉ nên có 1 để tốt cho SEO.",
  },
  {
    tag: "h1",
    prompt: "Google đọc trang của bạn và muốn biết chủ đề chính nằm ở dòng tiêu đề nào. Thẻ nào mang trọng số cao nhất?",
    explain: "Công cụ tìm kiếm coi <h1> là tín hiệu mạnh nhất về chủ đề trang.",
  },
  {
    tag: "p",
    prompt: "Bạn dán một đoạn giới thiệu công ty dài 4 câu vào trang và muốn nó hiển thị thành một khối văn bản có khoảng cách trên dưới.",
    explain: "<p> bao mỗi đoạn văn; trình duyệt tự thêm khoảng cách giữa các đoạn.",
  },
  {
    tag: "p",
    prompt: "Mỗi câu trả lời của chatbot cần được hiển thị thành một đoạn văn riêng biệt, xuống khối mới.",
    explain: "Mỗi đoạn văn độc lập nên nằm trong một thẻ <p>.",
  },
  {
    tag: "strong",
    prompt: "Trong điều khoản sử dụng, câu 'Không hoàn tiền sau 30 ngày' rất quan trọng — cần in đậm VÀ máy đọc màn hình phải nhấn mạnh.",
    explain: "<strong> vừa in đậm vừa mang ngữ nghĩa 'quan trọng' (khác <b> chỉ là kiểu chữ).",
  },
  {
    tag: "strong",
    prompt: "Dòng cảnh báo 'Mật khẩu sắp hết hạn' cần nổi bật về mặt ngữ nghĩa, không chỉ về hình thức.",
    explain: "Nội dung quan trọng về ngữ nghĩa dùng <strong>, không dùng <b>.",
  },
  {
    tag: "em",
    prompt: "Trong câu 'Sản phẩm này rất đáng mua', bạn muốn từ 'rất' được đọc nhấn giọng và in nghiêng.",
    explain: "<em> nhấn mạnh ngữ điệu (đọc màn hình sẽ nhấn giọng), hiển thị nghiêng.",
  },
  {
    tag: "em",
    prompt: "Bạn cần nhấn mạnh một từ trong câu sao cho nghĩa của câu thay đổi khi đọc lên — không chỉ làm chữ nghiêng cho đẹp.",
    explain: "Nhấn mạnh có ngữ nghĩa dùng <em>; <i> chỉ là kiểu hiển thị.",
  },
  {
    tag: "br",
    prompt: "Địa chỉ công ty gồm 3 dòng (số nhà, phường, thành phố) phải xuống dòng đúng vị trí nhưng vẫn nằm trong cùng một đoạn văn.",
    explain: "<br> ngắt dòng bên trong một đoạn — không tạo đoạn mới như <p>.",
  },
  {
    tag: "br",
    prompt: "Bạn hiển thị một bài thơ: mỗi câu thơ một dòng, không có khoảng cách đoạn giữa các câu.",
    explain: "Ngắt dòng trong cùng khối văn bản dùng <br> (thẻ rỗng, không có thẻ đóng).",
  },
  {
    tag: "h2",
    prompt: "Trang bài viết đã có tiêu đề chính, giờ cần tiêu đề cho từng mục lớn: 'Nguyên liệu', 'Cách làm', 'Mẹo nhỏ'.",
    explain: "Mục lớn ngay dưới tiêu đề chính dùng <h2> — phân cấp h1 → h2 → h3.",
  },
  {
    tag: "h2",
    prompt: "Sau thẻ tiêu đề trang, các phần 'Sản phẩm nổi bật' và 'Khuyến mãi hot' cần tiêu đề cấp ngay bên dưới.",
    explain: "Cấp tiêu đề ngay dưới <h1> là <h2>; không nhảy cóc xuống h4, h5.",
  },
  {
    tag: "h3",
    prompt: "Trong mục 'Điện thoại' (đã là tiêu đề cấp 2), bạn cần tiêu đề con cho từng hãng: iPhone, Samsung.",
    explain: "Tiêu đề con bên trong mục <h2> dùng <h3> — đi đúng phân cấp.",
  },
  {
    tag: "h3",
    prompt: "Cấu trúc bài: h1 cho tên bài, h2 cho chương, còn tiêu đề từng phần nhỏ trong chương dùng cấp nào?",
    explain: "Dưới <h2> là <h3> — luôn đi xuống từng cấp một.",
  },
  {
    tag: "span",
    prompt: "Bạn muốn tô màu đỏ đúng MỘT TỪ giữa câu bằng CSS mà không làm câu bị xuống dòng hay tách khối.",
    explain: "<span> là phần tử inline không ngữ nghĩa — bọc chữ giữa câu để áp CSS.",
  },
  {
    tag: "span",
    prompt: "Cần gắn class cho giá tiền '99.000đ' nằm giữa dòng chữ để JavaScript cập nhật riêng phần đó.",
    explain: "Bọc một mẩu chữ inline (không ngắt dòng) thì dùng <span>.",
  },
  {
    tag: "blockquote",
    prompt: "Bài báo trích nguyên văn một đoạn phát biểu dài của chuyên gia, cần hiển thị thành khối thụt lề riêng.",
    explain: "<blockquote> dành cho trích dẫn dài dạng khối, có thể kèm cite=\"nguồn\".",
  },
  {
    tag: "blockquote",
    prompt: "Landing page muốn đưa lời nhận xét của khách hàng thành một khối trích dẫn nổi bật, đúng ngữ nghĩa.",
    explain: "Trích lời người khác thành khối riêng → <blockquote>.",
  },
  {
    tag: "code",
    prompt: "Trong câu hướng dẫn 'Chạy lệnh npm install để cài đặt', phần tên lệnh cần hiển thị bằng font monospace ngay giữa câu.",
    explain: "<code> đánh dấu mã nguồn inline — hiển thị font monospace giữa văn bản.",
  },
  {
    tag: "code",
    prompt: "Blog lập trình nhắc đến tên hàm console.log() giữa đoạn văn và muốn nó trông khác chữ thường, đúng ngữ nghĩa 'đây là mã'.",
    explain: "Tên hàm/lệnh trong câu văn bọc bằng <code>.",
  },
  {
    tag: "pre",
    prompt: "Bạn dán một khối code 10 dòng có thụt lề; trình duyệt phải giữ nguyên từng khoảng trắng và xuống dòng như bản gốc.",
    explain: "<pre> giữ nguyên định dạng — thường bọc ngoài <code> cho khối mã nhiều dòng.",
  },
  {
    tag: "pre",
    prompt: "Hiển thị tranh ASCII art — mọi khoảng trắng phải đứng đúng chỗ, không bị gộp lại.",
    explain: "Trình duyệt gộp khoảng trắng, trừ khi nội dung nằm trong <pre>.",
  },
  {
    tag: "hr",
    prompt: "Cuối phần giới thiệu và trước phần bình luận, bạn cần một đường kẻ ngang thể hiện 'đổi chủ đề'.",
    explain: "<hr> là thẻ rỗng tạo đường kẻ ngang, mang nghĩa chuyển chủ đề.",
  },
  {
    tag: "hr",
    prompt: "Giữa hai chương truyện cần một vạch phân cách nằm ngang, không cần nội dung gì bên trong.",
    explain: "Phân tách nội dung bằng đường kẻ → <hr> (không có thẻ đóng).",
  },
  {
    tag: "mark",
    prompt: "Trang kết quả tìm kiếm muốn từ khóa người dùng vừa gõ được tô nền vàng trong từng kết quả.",
    explain: "<mark> làm nổi bật chữ như bút dạ quang — chuẩn cho highlight kết quả tìm kiếm.",
  },
  {
    tag: "mark",
    prompt: "Khi hiển thị tài liệu, đoạn văn bản khớp với ghi chú của người dùng cần được 'tô sáng' đúng ngữ nghĩa.",
    explain: "Đánh dấu phần văn bản liên quan/nổi bật → <mark>.",
  },
  {
    tag: "sub",
    prompt: "Trang hóa học cần viết công thức nước: chữ H, rồi số 2 nằm thấp xuống dưới, rồi chữ O.",
    explain: "Chỉ số dưới (H₂O) dùng <sub>.",
  },
  {
    tag: "sub",
    prompt: "Footnote đánh số nhỏ nằm dưới dòng chữ như 'x₁, x₂' trong tài liệu toán.",
    explain: "Ký tự nằm thấp hơn dòng cơ sở → <sub> (subscript).",
  },
  {
    tag: "sup",
    prompt: "Bài toán cần hiển thị 'x bình phương': chữ x rồi số 2 nhỏ nằm cao phía trên.",
    explain: "Chỉ số trên (x²) dùng <sup>.",
  },
  {
    tag: "sup",
    prompt: "Ghi chú bản quyền 'Thương hiệu™' hoặc số mũ '10⁵' — ký tự nhỏ nằm phía trên dòng chữ.",
    explain: "Ký tự nằm cao hơn dòng cơ sở → <sup> (superscript).",
  },
  // ===== LIÊN KẾT & MEDIA =====
  {
    tag: "a",
    prompt: "Chữ 'Xem chính sách đổi trả' phải bấm được và đưa người dùng sang trang khác.",
    explain: "<a href=\"...\"> tạo liên kết — chữ bấm được dẫn đến địa chỉ khác.",
  },
  {
    tag: "a",
    prompt: "Logo đối tác khi bấm vào phải mở website của họ trong tab mới (target=\"_blank\").",
    explain: "Mọi liên kết — kể cả bọc quanh ảnh — đều dùng <a>.",
  },
  {
    tag: "img",
    prompt: "Hiển thị ảnh sản phẩm giay-nike.jpg kèm văn bản thay thế cho người dùng đọc màn hình.",
    explain: "<img src=\"...\" alt=\"...\"> nhúng ảnh; alt bắt buộc cho accessibility.",
  },
  {
    tag: "img",
    prompt: "Trang tin cần chèn một tấm hình minh họa từ file banner.png — thẻ rỗng, không có thẻ đóng.",
    explain: "<img> là void element hiển thị hình ảnh.",
  },
  {
    tag: "video",
    prompt: "Trang khóa học cần phát đoạn phim bài giảng intro.mp4, người học tự bấm play/pause/tua.",
    explain: "<video src=\"...\" controls> nhúng và phát video với nút điều khiển.",
  },
  {
    tag: "video",
    prompt: "Hero section muốn một đoạn phim nền tự phát, lặp vô hạn, tắt tiếng (autoplay loop muted).",
    explain: "Phát hình động có tiếng/không tiếng từ file phim → <video>.",
  },
  {
    tag: "audio",
    prompt: "Trang podcast cần trình phát cho file tap-1.mp3 với nút play và thanh âm lượng.",
    explain: "<audio src=\"...\" controls> phát âm thanh kèm bộ điều khiển.",
  },
  {
    tag: "audio",
    prompt: "App học tiếng Anh phát file phát âm của từ vựng khi người dùng bấm nút loa.",
    explain: "Nhúng và phát file âm thanh → <audio>.",
  },
  {
    tag: "source",
    prompt: "Video của bạn có 2 phiên bản .webm và .mp4; cần khai báo cả hai để trình duyệt tự chọn định dạng nó hỗ trợ.",
    explain: "<source> khai báo từng nguồn media thay thế bên trong <video>/<audio>/<picture>.",
  },
  {
    tag: "source",
    prompt: "Bên trong trình phát nhạc, mỗi định dạng file (ogg, mp3) cần một thẻ khai báo riêng để fallback.",
    explain: "Nhiều định dạng cho một media → nhiều thẻ <source> bên trong.",
  },
  {
    tag: "figure",
    prompt: "Biểu đồ doanh thu kèm chú thích cần được nhóm thành một khối minh họa độc lập, có thể tách khỏi bài mà vẫn hiểu được.",
    explain: "<figure> nhóm nội dung minh họa độc lập (ảnh, biểu đồ, code) + chú thích.",
  },
  {
    tag: "figure",
    prompt: "Ảnh và dòng chú thích bên dưới phải 'dính' với nhau thành một đơn vị nội dung đúng ngữ nghĩa.",
    explain: "Khối ảnh + chú thích = <figure> chứa <img> và <figcaption>.",
  },
  {
    tag: "figcaption",
    prompt: "Bên trong khối minh họa, dòng 'Hình 1: Sơ đồ hệ thống' cần thẻ chú thích đúng chuẩn.",
    explain: "<figcaption> là chú thích của <figure>, đặt đầu hoặc cuối khối.",
  },
  {
    tag: "figcaption",
    prompt: "Album ảnh có mô tả ngắn dưới mỗi tấm; phần mô tả này dùng thẻ gì khi ảnh nằm trong figure?",
    explain: "Chú thích cho hình trong <figure> → <figcaption>.",
  },
  // ===== DANH SÁCH =====
  {
    tag: "ul",
    prompt: "Liệt kê các tính năng của sản phẩm — thứ tự không quan trọng, mỗi dòng một chấm tròn.",
    explain: "<ul> tạo danh sách không thứ tự; mỗi mục là một <li>.",
  },
  {
    tag: "ul",
    prompt: "Menu điều hướng gồm nhiều mục ngang hàng nhau, không cần đánh số.",
    explain: "Danh sách không cần thứ tự → <ul> (kể cả menu nav).",
  },
  {
    tag: "ol",
    prompt: "Công thức nấu ăn có 5 bước phải làm đúng thứ tự 1 → 5, trình duyệt tự đánh số.",
    explain: "<ol> tạo danh sách có thứ tự — đổi chỗ là đổi nghĩa.",
  },
  {
    tag: "ol",
    prompt: "Bảng xếp hạng top 10 bài hát — vị trí số 1, 2, 3 có ý nghĩa, cần đánh số tự động.",
    explain: "Thứ hạng/trình tự quan trọng → <ol>, không phải <ul>.",
  },
  {
    tag: "li",
    prompt: "Bên trong danh sách mua sắm, mỗi món hàng ('Táo', 'Cam', 'Sữa') nằm trong thẻ nào?",
    explain: "<li> là một mục danh sách — con trực tiếp của <ul> hoặc <ol>.",
  },
  {
    tag: "li",
    prompt: "Bạn đã có khung danh sách đánh số, giờ cần thêm từng dòng nội dung vào trong nó.",
    explain: "Mỗi mục trong <ul>/<ol> đều là <li>.",
  },
  {
    tag: "dl",
    prompt: "Trang FAQ kiểu từ điển: mỗi thuật ngữ đi kèm phần định nghĩa của nó, cần thẻ bao ngoài cả bộ.",
    explain: "<dl> (description list) bao các cặp thuật ngữ <dt> – mô tả <dd>.",
  },
  {
    tag: "dl",
    prompt: "Hiển thị thông số kỹ thuật dạng 'CPU: i7, RAM: 16GB' — danh sách cặp tên–giá trị đúng ngữ nghĩa.",
    explain: "Danh sách cặp khóa–giá trị → <dl> chứa <dt>/<dd>.",
  },
  {
    tag: "dt",
    prompt: "Trong từ điển thuật ngữ, chữ 'HTML' (tên thuật ngữ) đứng trước phần giải nghĩa dùng thẻ nào?",
    explain: "<dt> (description term) ghi tên thuật ngữ trong <dl>.",
  },
  {
    tag: "dt",
    prompt: "Phần 'tên thông số' (ví dụ 'Trọng lượng') trong danh sách mô tả nằm trong thẻ gì?",
    explain: "Tên/khóa trong danh sách mô tả → <dt>.",
  },
  {
    tag: "dd",
    prompt: "Phần giải nghĩa 'Ngôn ngữ đánh dấu siêu văn bản' đứng sau thuật ngữ HTML dùng thẻ nào?",
    explain: "<dd> (description details) là phần mô tả đi sau <dt>.",
  },
  {
    tag: "dd",
    prompt: "Giá trị '16GB' ứng với thông số 'RAM' trong danh sách mô tả nằm trong thẻ gì?",
    explain: "Giá trị/mô tả trong danh sách mô tả → <dd>.",
  },
  // ===== BẢNG =====
  {
    tag: "table",
    prompt: "Hiển thị bảng giá gồm cột 'Gói', 'Giá', 'Thời hạn' với nhiều hàng dữ liệu thẳng cột.",
    explain: "<table> dành cho dữ liệu dạng bảng (hàng × cột) — không dùng để dàn layout.",
  },
  {
    tag: "table",
    prompt: "Báo cáo điểm của lớp: mỗi học sinh một hàng, mỗi môn một cột — cần thẻ bao ngoài cùng.",
    explain: "Dữ liệu hai chiều hàng-cột → <table>.",
  },
  {
    tag: "tr",
    prompt: "Trong bảng điểm, toàn bộ dữ liệu của học sinh 'An' (tên, toán, văn) nằm trên cùng một hàng — hàng đó là thẻ gì?",
    explain: "<tr> (table row) là một hàng của bảng, chứa các ô <td>/<th>.",
  },
  {
    tag: "tr",
    prompt: "Bạn cần thêm một dòng sản phẩm mới vào bảng giá — thẻ nào bao quanh các ô của dòng đó?",
    explain: "Mỗi hàng trong bảng là một <tr>.",
  },
  {
    tag: "td",
    prompt: "Ô chứa giá trị '99.000đ' tại giao điểm hàng 'Áo thun' và cột 'Giá' là thẻ gì?",
    explain: "<td> (table data) là ô dữ liệu thường trong bảng.",
  },
  {
    tag: "td",
    prompt: "Trong một hàng của bảng, từng ô nội dung bình thường (không phải tiêu đề cột) dùng thẻ nào?",
    explain: "Ô dữ liệu trong <tr> → <td>.",
  },
  {
    tag: "th",
    prompt: "Hàng đầu tiên của bảng chứa nhãn cột 'Tên sản phẩm', 'Giá' — các ô này cần đậm, căn giữa và mang ngữ nghĩa tiêu đề.",
    explain: "<th> (table header) là ô tiêu đề — máy đọc màn hình hiểu đây là nhãn cột/hàng.",
  },
  {
    tag: "th",
    prompt: "Cột đầu mỗi hàng ghi tên tháng ('Tháng 1', 'Tháng 2') đóng vai trò nhãn của hàng — ô đó dùng thẻ gì?",
    explain: "Nhãn của hàng/cột trong bảng → <th> (có thể thêm scope=\"row\").",
  },
  {
    tag: "thead",
    prompt: "Nhóm toàn bộ hàng tiêu đề của bảng vào một khối riêng để in lặp lại trên mỗi trang và tách khỏi phần thân.",
    explain: "<thead> bao nhóm hàng tiêu đề, đứng trước <tbody>.",
  },
  {
    tag: "thead",
    prompt: "Bảng dài cần phần đầu (chứa nhãn cột) cố định khi cuộn — khối nào bọc các hàng nhãn đó?",
    explain: "Nhóm hàng tiêu đề bảng → <thead>.",
  },
  {
    tag: "tbody",
    prompt: "Phần dữ liệu chính của bảng (toàn bộ hàng sản phẩm) cần được nhóm vào một khối riêng sau phần tiêu đề.",
    explain: "<tbody> bao nhóm hàng dữ liệu chính của bảng.",
  },
  {
    tag: "tbody",
    prompt: "JavaScript cần thêm hàng mới vào đúng phần thân bảng (không đụng phần tiêu đề) — phần thân đó là thẻ gì?",
    explain: "Hàng dữ liệu nằm trong <tbody>, tách biệt với <thead>/<tfoot>.",
  },
  {
    tag: "tfoot",
    prompt: "Hàng cuối bảng hóa đơn ghi 'Tổng cộng: 500.000đ' cần nằm trong khối tổng kết riêng của bảng.",
    explain: "<tfoot> bao nhóm hàng tổng kết cuối bảng.",
  },
  {
    tag: "tfoot",
    prompt: "Bảng thống kê có dòng tính tổng các cột ở dưới cùng — khối nào dành riêng cho dòng đó?",
    explain: "Hàng tổng/kết luận của bảng → <tfoot>.",
  },
  {
    tag: "caption",
    prompt: "Ngay trên bảng số liệu cần dòng tiêu đề 'Doanh thu quý 1/2026' gắn liền với bảng về mặt ngữ nghĩa.",
    explain: "<caption> là tiêu đề của bảng — thẻ con đầu tiên ngay sau <table>.",
  },
  {
    tag: "caption",
    prompt: "Máy đọc màn hình cần đọc tên bảng trước khi đọc dữ liệu — tên bảng đặt trong thẻ nào?",
    explain: "Tiêu đề mô tả bảng → <caption>, không phải <h3> đặt cạnh bảng.",
  },
  // ===== FORM =====
  {
    tag: "form",
    prompt: "Trang liên hệ có các ô nhập và nút gửi; toàn bộ phải được bao trong thẻ nào để dữ liệu gửi đến /contact khi submit?",
    explain: "<form action=\"...\" method=\"...\"> bao các trường nhập và xử lý submit.",
  },
  {
    tag: "form",
    prompt: "Nhấn Enter trong ô tìm kiếm phải tự gửi dữ liệu đi — hành vi này chỉ có khi ô nằm trong thẻ bao nào?",
    explain: "Enter tự submit là hành vi mặc định của <form>.",
  },
  {
    tag: "input",
    prompt: "Ô cho khách gõ địa chỉ email, một dòng, trình duyệt tự kiểm tra định dạng khi submit.",
    explain: "<input type=\"email\"> — ô nhập một dòng với kiểu dữ liệu cụ thể.",
  },
  {
    tag: "input",
    prompt: "Cần một ô đánh dấu ✓ 'Tôi đồng ý điều khoản' — checkbox là một biến thể của thẻ nào?",
    explain: "<input type=\"checkbox\"> — thẻ input đổi giao diện theo type.",
  },
  {
    tag: "label",
    prompt: "Chữ 'Số điện thoại' đặt cạnh ô nhập; bấm vào chữ đó con trỏ phải nhảy vào ô nhập tương ứng.",
    explain: "<label for=\"id-ô-nhập\"> liên kết nhãn với ô nhập — bấm nhãn là focus ô.",
  },
  {
    tag: "label",
    prompt: "Máy đọc màn hình phải đọc 'Mật khẩu' khi người dùng focus vào ô nhập mật khẩu — nhãn này dùng thẻ gì?",
    explain: "Nhãn mô tả cho trường nhập → <label>, bắt buộc cho accessibility.",
  },
  {
    tag: "button",
    prompt: "Cuối form đăng ký cần nút bấm 'Tạo tài khoản' để gửi form đi.",
    explain: "<button type=\"submit\"> gửi form; type=\"button\" thì không.",
  },
  {
    tag: "button",
    prompt: "Một nút 'Hiện mật khẩu' chạy JavaScript khi bấm, không gửi form — vẫn dùng thẻ nào (với type phù hợp)?",
    explain: "Mọi nút bấm dùng <button>; type=\"button\" để không submit form.",
  },
  {
    tag: "textarea",
    prompt: "Ô 'Nội dung góp ý' cho phép khách viết nhiều dòng và kéo giãn kích thước.",
    explain: "<textarea> là ô nhập văn bản nhiều dòng (khác input một dòng).",
  },
  {
    tag: "textarea",
    prompt: "Form đăng bài blog cần vùng soạn nội dung dài hàng chục dòng — thẻ nhập liệu nào phù hợp?",
    explain: "Văn bản dài nhiều dòng → <textarea rows=\"...\">.",
  },
  {
    tag: "select",
    prompt: "Trường 'Tỉnh/Thành phố' cho khách chọn 1 trong 63 lựa chọn từ một hộp thả xuống.",
    explain: "<select> tạo dropdown; mỗi lựa chọn là một <option>.",
  },
  {
    tag: "select",
    prompt: "Chọn size áo S/M/L/XL từ một menu sổ xuống tiết kiệm diện tích — thẻ bao ngoài là gì?",
    explain: "Hộp chọn thả xuống → <select>.",
  },
  {
    tag: "option",
    prompt: "Bên trong hộp thả xuống chọn size, từng dòng 'S', 'M', 'L' là thẻ gì?",
    explain: "<option value=\"...\"> là một lựa chọn trong <select>.",
  },
  {
    tag: "option",
    prompt: "Mỗi tỉnh thành trong dropdown cần value gửi đi khác với chữ hiển thị ('hcm' vs 'TP. Hồ Chí Minh').",
    explain: "<option value=\"hcm\">TP. Hồ Chí Minh</option> — value là giá trị gửi đi.",
  },
  {
    tag: "fieldset",
    prompt: "Form thanh toán dài cần nhóm các ô 'Địa chỉ giao hàng' vào một khung riêng, tách khỏi nhóm 'Thông tin thẻ'.",
    explain: "<fieldset> nhóm các trường liên quan; disabled trên nó khóa cả nhóm.",
  },
  {
    tag: "fieldset",
    prompt: "Khi chọn 'Nhận tại cửa hàng', cả nhóm ô địa chỉ phải bị vô hiệu hóa bằng MỘT attribute trên thẻ bao — thẻ bao đó là gì?",
    explain: "<fieldset disabled> vô hiệu mọi trường nhập bên trong.",
  },
  {
    tag: "legend",
    prompt: "Khung nhóm trường nhập cần dòng tiêu đề 'Thông tin giao hàng' nằm chèn trên viền khung.",
    explain: "<legend> là tiêu đề của <fieldset>, phải là con đầu tiên.",
  },
  {
    tag: "legend",
    prompt: "Máy đọc màn hình phải đọc tên nhóm ('Phương thức thanh toán') trước các radio bên trong fieldset — tên nhóm dùng thẻ gì?",
    explain: "Tiêu đề nhóm trường trong fieldset → <legend>.",
  },
  // ===== CẤU TRÚC TRANG =====
  {
    tag: "html",
    prompt: "Ngay sau khai báo <!DOCTYPE html>, toàn bộ tài liệu phải nằm trong một thẻ gốc duy nhất có lang=\"vi\".",
    explain: "<html> là phần tử gốc bao toàn bộ trang; lang khai báo ngôn ngữ.",
  },
  {
    tag: "html",
    prompt: "Thẻ ngoài cùng nhất của mọi tài liệu web — cha trực tiếp của cả phần metadata lẫn phần nội dung.",
    explain: "<html> chứa <head> và <body> — gốc của cây DOM.",
  },
  {
    tag: "head",
    prompt: "Tiêu đề tab, khai báo bảng mã, link file CSS — những thứ KHÔNG hiển thị trong trang — đặt vào khu vực nào?",
    explain: "<head> chứa metadata: title, meta, link... không render ra màn hình.",
  },
  {
    tag: "head",
    prompt: "Bạn cần chỗ đặt thẻ mô tả SEO và favicon — khu vực này nằm trước phần thân trang.",
    explain: "Metadata của trang nằm trong <head>, trước <body>.",
  },
  {
    tag: "body",
    prompt: "Mọi thứ người dùng NHÌN THẤY — tiêu đề, ảnh, nút bấm — phải nằm trong thẻ nào?",
    explain: "<body> chứa toàn bộ nội dung hiển thị; mỗi trang đúng 1 body.",
  },
  {
    tag: "body",
    prompt: "Đối lập với khu metadata, phần 'thân' chứa nội dung render của tài liệu là thẻ gì?",
    explain: "<head> = metadata, <body> = nội dung hiển thị.",
  },
  {
    tag: "title",
    prompt: "Dòng chữ 'ShopVN — Giày chính hãng' hiện trên tab trình duyệt và trong kết quả Google lấy từ thẻ nào?",
    explain: "<title> trong <head> — tiêu đề tab + tiêu đề kết quả tìm kiếm.",
  },
  {
    tag: "title",
    prompt: "Khi người dùng bookmark trang, tên gợi ý mặc định lấy từ đâu?",
    explain: "Trình duyệt lấy tên bookmark/tab từ <title>.",
  },
  {
    tag: "meta",
    prompt: "Tiếng Việt trên trang bị hiển thị lỗi mã — bạn cần khai báo bảng mã UTF-8 bằng thẻ rỗng nào trong head?",
    explain: "<meta charset=\"UTF-8\"> khai báo bảng mã; thiếu nó tiếng Việt dễ lỗi.",
  },
  {
    tag: "meta",
    prompt: "Trang cần responsive trên điện thoại: khai báo viewport width=device-width bằng thẻ nào?",
    explain: "<meta name=\"viewport\" ...> — thẻ meta khai báo thông tin cho trình duyệt.",
  },
  {
    tag: "div",
    prompt: "Cần một khối bao để gom 3 card sản phẩm lại và áp CSS Grid — khối này KHÔNG mang ý nghĩa ngữ nghĩa nào.",
    explain: "<div> là khối chứa vô danh cho layout; có ngữ nghĩa thì ưu tiên thẻ semantic.",
  },
  {
    tag: "div",
    prompt: "Bạn cần wrapper block-level thuần túy để JavaScript gắn component vào, không có thẻ ngữ nghĩa nào phù hợp.",
    explain: "Khối chứa không ngữ nghĩa → <div> (block), khác <span> (inline).",
  },
  {
    tag: "link",
    prompt: "Trang cần nạp file style.css từ bên ngoài — thẻ rỗng đặt trong head với rel=\"stylesheet\".",
    explain: "<link rel=\"stylesheet\" href=\"...\"> nạp CSS; khác <a> là liên kết bấm được.",
  },
  {
    tag: "link",
    prompt: "Khai báo favicon (biểu tượng trên tab) cho website dùng thẻ nào trong head?",
    explain: "<link rel=\"icon\" href=\"...\"> — thẻ link nạp tài nguyên ngoài.",
  },
  {
    tag: "script",
    prompt: "Nạp file app.js để trang có tương tác; muốn tải song song nhưng chạy sau khi HTML parse xong (defer).",
    explain: "<script src=\"app.js\" defer></script> nạp và chạy JavaScript.",
  },
  {
    tag: "script",
    prompt: "Bạn cần viết vài dòng JavaScript inline ngay trong trang HTML — code đó nằm trong thẻ nào?",
    explain: "Mã JavaScript (inline hoặc src ngoài) đặt trong <script>.",
  },
  // ===== NGỮ NGHĨA =====
  {
    tag: "header",
    prompt: "Vùng trên cùng của trang chứa logo, tên site và menu — cần thẻ ngữ nghĩa thay vì div class=\"top\".",
    explain: "<header> là vùng đầu của trang hoặc của một khối nội dung.",
  },
  {
    tag: "header",
    prompt: "Mỗi bài viết trong blog có phần mở đầu riêng (tiêu đề + ngày đăng + tác giả) — phần này dùng thẻ gì?",
    explain: "<header> dùng được nhiều lần — mỗi <article> có thể có header riêng.",
  },
  {
    tag: "nav",
    prompt: "Khối chứa các liên kết 'Trang chủ / Sản phẩm / Liên hệ' — menu điều hướng chính của site.",
    explain: "<nav> bao nhóm liên kết điều hướng chính; máy đọc màn hình nhảy nhanh đến được.",
  },
  {
    tag: "nav",
    prompt: "Breadcrumb 'Trang chủ > Giày > Nike' là một dạng điều hướng — thẻ ngữ nghĩa nào bao quanh nó?",
    explain: "Mọi khối điều hướng (menu, breadcrumb) → <nav>.",
  },
  {
    tag: "main",
    prompt: "Phần nội dung trung tâm — duy nhất trên trang, không tính header/footer/sidebar — cần thẻ ngữ nghĩa nào?",
    explain: "<main> bao nội dung chính; mỗi trang chỉ có 1, không nằm trong header/nav/footer.",
  },
  {
    tag: "main",
    prompt: "Nút 'Skip to content' cho người dùng bàn phím nhảy thẳng đến vùng nội dung chính — vùng đó là thẻ gì?",
    explain: "Đích của skip-link chính là <main> — vùng nội dung chính của trang.",
  },
  {
    tag: "section",
    prompt: "Landing page chia thành các phần theo chủ đề: 'Tính năng', 'Bảng giá', 'Đánh giá' — mỗi phần có tiêu đề riêng.",
    explain: "<section> nhóm nội dung theo chủ đề, thường mở đầu bằng heading.",
  },
  {
    tag: "section",
    prompt: "Một phần nội dung có tiêu đề h2 riêng nhưng KHÔNG tự đứng độc lập được (vẫn thuộc tổng thể trang) — dùng thẻ gì thay div?",
    explain: "Phần của tổng thể, có chủ đề riêng → <section>; tự đứng được → <article>.",
  },
  {
    tag: "article",
    prompt: "Mỗi bài đăng trên blog có thể copy nguyên khối sang trang khác mà vẫn đầy đủ ý nghĩa — khối đó dùng thẻ gì?",
    explain: "<article> = nội dung độc lập, tự đứng được (bài viết, bình luận, card tin).",
  },
  {
    tag: "article",
    prompt: "Trong trang tin tức, từng mẩu tin trong danh sách (có tiêu đề, ảnh, tóm tắt riêng) nên bọc bằng thẻ nào?",
    explain: "Mỗi đơn vị nội dung trọn vẹn → <article>, kể cả khi nằm trong danh sách.",
  },
  {
    tag: "aside",
    prompt: "Cột bên phải trang bài viết chứa 'Bài liên quan' và quảng cáo — nội dung phụ, bỏ đi không ảnh hưởng bài chính.",
    explain: "<aside> chứa nội dung bên lề: sidebar, quảng cáo, ghi chú phụ.",
  },
  {
    tag: "aside",
    prompt: "Hộp 'Mẹo nhỏ' chen giữa bài hướng dẫn — liên quan nhưng tách khỏi mạch chính của bài.",
    explain: "Nội dung phụ trợ tách khỏi mạch chính → <aside>.",
  },
  {
    tag: "footer",
    prompt: "Vùng cuối trang chứa '© 2026 ShopVN', liên kết chính sách và thông tin liên hệ.",
    explain: "<footer> là chân trang hoặc chân của một khối nội dung.",
  },
  {
    tag: "footer",
    prompt: "Cuối mỗi bài viết có dòng 'Đăng ngày 10/6 — 5 bình luận' — phần kết của riêng bài đó dùng thẻ gì?",
    explain: "<footer> dùng được nhiều lần — mỗi <article> có thể có footer riêng.",
  },
];
