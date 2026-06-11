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
  // ============ Đợt C: Văn bản (+3 câu/thẻ) ============
  {
    tag: "h1",
    prompt: "Lighthouse SEO cảnh báo 'Document does not have a main heading' — trang đang thiếu thẻ nào?",
    explain: "Mỗi trang cần một <h1> làm tiêu đề chính.",
  },
  {
    tag: "h1",
    prompt: "Thiết kế yêu cầu chữ 'Khuyến mãi hè' to nhất trang VÀ là tiêu đề quan trọng nhất về ngữ nghĩa — không chỉ to bằng CSS.",
    explain: "Ý nghĩa 'tiêu đề chính' đến từ <h1>, không phải font-size.",
  },
  {
    tag: "h1",
    prompt: "Trong cây phân cấp tiêu đề h1→h6, thẻ nào là GỐC mà mọi tiêu đề khác phải nằm dưới nó?",
    explain: "<h1> đứng đầu phân cấp — các mục con dùng h2, h3...",
  },
  {
    tag: "p",
    prompt: "Screen reader cho phép nhảy 'đoạn tiếp theo' — tính năng này dựa trên việc nội dung được bọc trong thẻ nào?",
    explain: "Máy đọc màn hình điều hướng theo từng <p>.",
  },
  {
    tag: "p",
    prompt: "Dán văn bản dài không bọc thẻ khiến mọi câu dính thành một khối — muốn trình duyệt tự thêm khoảng cách giữa các đoạn phải bọc bằng gì?",
    explain: "Mỗi <p> là một khối có margin trên dưới mặc định.",
  },
  {
    tag: "p",
    prompt: "Điều khoản sử dụng gồm 12 đoạn văn — mỗi đoạn là một thẻ gì để CSS chỉnh giãn dòng hàng loạt?",
    explain: "Bọc từng đoạn bằng <p> để style thống nhất.",
  },
  {
    tag: "strong",
    prompt: "Trình duyệt đọc to cho người khiếm thị cần NHẤN GIỌNG ở cụm 'hạn chót 30/6' trong câu thông báo — thẻ nào vừa đậm vừa mang nghĩa đó?",
    explain: "<strong> = quan trọng về ngữ nghĩa, không chỉ đậm về hình thức.",
  },
  {
    tag: "strong",
    prompt: "Cảnh báo 'KHÔNG tắt máy khi đang cập nhật' cần được cả người đọc lẫn máy đọc hiểu là nội dung hệ trọng.",
    explain: "Mức độ nghiêm trọng/quan trọng → <strong>.",
  },
  {
    tag: "strong",
    prompt: "Đổi <b> sang thẻ nào thì giao diện giữ nguyên chữ đậm nhưng văn bản có thêm ý nghĩa 'quan trọng' cho SEO và accessibility?",
    explain: "<strong> thay <b> khi nội dung thật sự quan trọng.",
  },
  {
    tag: "em",
    prompt: "Câu 'Tôi *đã bảo* là đừng xóa' — từ 'đã bảo' cần nghiêng VÀ đổi ngữ điệu khi máy đọc lên. Thẻ nào?",
    explain: "<em> nhấn ngữ điệu làm thay đổi sắc thái câu.",
  },
  {
    tag: "em",
    prompt: "Đổi <i> sang thẻ nào thì chữ vẫn nghiêng nhưng mang thêm ý 'nhấn mạnh' thay vì chỉ là kiểu chữ?",
    explain: "<em> = nhấn mạnh có nghĩa; <i> = nghiêng thuần hình thức.",
  },
  {
    tag: "em",
    prompt: "Trong cặp thẻ nghiêng, thẻ nào khi LỒNG NHAU (em trong em) còn thể hiện mức nhấn mạnh tăng dần?",
    explain: "<em> lồng nhau = nhấn mạnh hơn nữa — có ngữ nghĩa tích lũy.",
  },
  {
    tag: "br",
    prompt: "Chữ ký email gồm tên, chức danh, công ty — 3 dòng sát nhau trong cùng một đoạn, không cách quãng như 3 đoạn riêng.",
    explain: "<br> ngắt dòng trong đoạn; <p> mới tạo khoảng cách lớn.",
  },
  {
    tag: "br",
    prompt: "Lời bài hát phải xuống dòng đúng từng câu hát — thẻ rỗng nào chèn giữa các câu?",
    explain: "<br> giữ các câu trong cùng khối nhưng xuống dòng.",
  },
  {
    tag: "br",
    prompt: "Code review chê việc dùng thẻ này 2 lần liên tiếp để tạo khoảng trống (đáng lẽ dùng CSS margin) — thẻ nào đang bị lạm dụng?",
    explain: "<br><br> để tạo khoảng cách là anti-pattern — dấu hiệu cần CSS.",
  },
  {
    tag: "h2",
    prompt: "Trang dài cần mục lục tự sinh từ các TIÊU ĐỀ MỤC LỚN ngay dưới tiêu đề chính — script sẽ quét thẻ nào?",
    explain: "Mục lục cấp 1 thường sinh từ các <h2>.",
  },
  {
    tag: "h2",
    prompt: "SEO checker báo 'heading skip': trang nhảy từ h1 xuống h3 — thẻ cấp nào bị bỏ sót ở giữa?",
    explain: "Không nhảy cóc phân cấp: sau h1 phải là <h2>.",
  },
  {
    tag: "h2",
    prompt: "Landing page có các khối 'Tính năng', 'Bảng giá', 'FAQ' — tiêu đề mỗi khối ngang hàng nhau, ngay dưới tiêu đề trang, dùng thẻ nào?",
    explain: "Các mục ngang cấp dưới h1 đều là <h2>.",
  },
  {
    tag: "h3",
    prompt: "Trong khối 'Bảng giá' (đã có tiêu đề cấp 2), ba gói 'Cơ bản', 'Pro', 'Doanh nghiệp' cần tiêu đề cấp con nào?",
    explain: "Con trực tiếp của mục h2 dùng <h3>.",
  },
  {
    tag: "h3",
    prompt: "FAQ: 'Câu hỏi thường gặp' là h2, vậy MỖI câu hỏi bên trong nên là thẻ tiêu đề nào?",
    explain: "Câu hỏi con trong mục h2 → <h3>.",
  },
  {
    tag: "h3",
    prompt: "Cây tiêu đề chuẩn: h1 tên trang → h2 tên chương → tên BÀI trong chương dùng thẻ nào?",
    explain: "Cấp 3 của phân cấp là <h3>.",
  },
  {
    tag: "span",
    prompt: "Giá '99.000đ' giữa câu cần JS cập nhật realtime khi đổi số lượng — bọc nó bằng thẻ inline nào để gắn id?",
    explain: "<span id> là móc treo inline cho JS.",
  },
  {
    tag: "span",
    prompt: "Một CHỮ CÁI đầu tên thương hiệu cần màu khác các chữ còn lại — bọc riêng chữ đó mà không phá dòng chữ.",
    explain: "<span> bọc phần tử nhỏ nhất có thể trong dòng.",
  },
  {
    tag: "span",
    prompt: "Dùng <div> bọc một từ giữa câu làm câu bị BẺ ĐÔI xuống dòng — phải thay bằng thẻ nào để giữ nguyên dòng?",
    explain: "div là block (xuống dòng); span là inline (giữ dòng).",
  },
  {
    tag: "blockquote",
    prompt: "Bài phân tích trích nguyên một ĐOẠN DÀI từ báo cáo của WHO, cần trình bày tách biệt và đúng đạo văn bản.",
    explain: "Trích dẫn khối từ nguồn khác → <blockquote>.",
  },
  {
    tag: "blockquote",
    prompt: "Trang review sách hiển thị đoạn văn yêu thích thành khối thụt lề có gạch dọc bên trái — về ngữ nghĩa khối đó là thẻ gì?",
    explain: "Kiểu thụt lề + gạch trái là convention hiển thị của <blockquote>.",
  },
  {
    tag: "blockquote",
    prompt: "Khác <q> (trích ngắn trong dòng), thẻ nào dành cho trích dẫn DÀI đứng thành khối riêng?",
    explain: "<q> inline; <blockquote> block — phân biệt theo độ dài/cách trình bày.",
  },
  {
    tag: "code",
    prompt: "Câu 'Gõ lệnh git status để kiểm tra' — tên lệnh cần font monospace và được máy hiểu là MÃ, không phải văn xuôi.",
    explain: "<code> đánh dấu mã nguồn inline.",
  },
  {
    tag: "code",
    prompt: "Blog kỹ thuật nhắc tên biến userName giữa câu văn — thẻ nào giúp người đọc nhận ra ngay đó là code?",
    explain: "Tên biến/hàm/lệnh trong câu → <code>.",
  },
  {
    tag: "code",
    prompt: "Thư viện tô màu cú pháp (highlight.js) quét trang tìm thẻ nào bên trong <pre> để tô màu?",
    explain: "Convention: <pre><code class=\"language-js\"> — highlight.js tìm <code>.",
  },
  {
    tag: "pre",
    prompt: "Đoạn thơ haiku cần giữ CHÍNH XÁC từng khoảng trắng đầu dòng như tác giả viết — trình duyệt không được gộp.",
    explain: "<pre> giữ nguyên mọi khoảng trắng và xuống dòng.",
  },
  {
    tag: "pre",
    prompt: "Log lỗi server dán vào trang bị dồn thành một dòng khó đọc — bọc bằng thẻ nào để giữ nguyên định dạng gốc?",
    explain: "Log, output terminal → <pre>.",
  },
  {
    tag: "pre",
    prompt: "Khối code ví dụ 15 dòng trong tài liệu: <code> lo ngữ nghĩa, còn thẻ nào bọc ngoài để giữ xuống dòng và thụt lề?",
    explain: "<pre> bọc <code> là cặp chuẩn cho khối mã nhiều dòng.",
  },
  {
    tag: "hr",
    prompt: "Truyện ngắn chuyển cảnh từ 'hiện tại' sang 'hồi tưởng' — cần dấu phân cách ngang mang nghĩa 'đổi mạch nội dung'.",
    explain: "<hr> = thematic break, không chỉ là đường kẻ trang trí.",
  },
  {
    tag: "hr",
    prompt: "Cuối phần nội dung chính, trước khối quảng cáo, designer vẽ một vạch ngang mảnh — thẻ rỗng nào tạo nó không cần CSS?",
    explain: "<hr> tạo đường kẻ ngang sẵn có.",
  },
  {
    tag: "hr",
    prompt: "Thẻ nào là thẻ RỖNG (không có thẻ đóng) duy nhất trong nhóm: p, hr, blockquote, pre?",
    explain: "<hr> (và br, img...) là void element.",
  },
  {
    tag: "mark",
    prompt: "Tính năng Ctrl+F của trang docs tự TÔ NỀN VÀNG mọi từ khớp từ khóa — mỗi từ khớp được bọc bằng thẻ nào?",
    explain: "<mark> là thẻ chuẩn cho highlight kết quả tìm kiếm.",
  },
  {
    tag: "mark",
    prompt: "Trong đoạn trích đề thi, cụm từ liên quan trực tiếp đến câu hỏi cần NỔI BẬT như được bôi dạ quang.",
    explain: "<mark> = relevance trong ngữ cảnh hiện tại.",
  },
  {
    tag: "mark",
    prompt: "Khác <strong> (quan trọng vốn có), thẻ nào đánh dấu phần văn bản chỉ nổi bật TRONG NGỮ CẢNH này (ví dụ từ người dùng vừa tìm)?",
    explain: "<mark> nổi bật theo ngữ cảnh; <strong> quan trọng nội tại.",
  },
  {
    tag: "sub",
    prompt: "Công thức hóa học CO₂ trong bài về môi trường — số 2 phải nhỏ và TỤT XUỐNG dưới dòng chữ.",
    explain: "Chỉ số dưới → <sub>.",
  },
  {
    tag: "sub",
    prompt: "Ký hiệu toán logₐ — chữ 'a' nhỏ nằm thấp hơn dòng cơ sở dùng thẻ nào?",
    explain: "<sub> cho cơ số, chỉ số dưới của biến.",
  },
  {
    tag: "sub",
    prompt: "Trong cặp sub/sup, thẻ nào kéo ký tự XUỐNG DƯỚI đường cơ sở của dòng chữ?",
    explain: "sub = subscript (dưới); sup = superscript (trên).",
  },
  {
    tag: "sup",
    prompt: "Diện tích viết là 50m² — số 2 nhỏ BAY LÊN trên dùng thẻ nào?",
    explain: "Số mũ → <sup>.",
  },
  {
    tag: "sup",
    prompt: "Chú thích nguồn kiểu Wikipedia: con số [1] nhỏ nằm cao cạnh câu văn, bấm nhảy xuống tài liệu tham khảo.",
    explain: "Footnote marker dùng <sup> (thường bọc <a> bên trong).",
  },
  {
    tag: "sup",
    prompt: "Ký hiệu thương hiệu Pepsi™ — chữ TM nhỏ phía trên dùng thẻ nào?",
    explain: "™ ® viết bằng <sup> khi cần kiểm soát hiển thị.",
  },
  // ============ Đợt C: Liên kết & Media (+3 câu/thẻ) ============
  {
    tag: "a",
    prompt: "Bài viết nhắc 'xem báo cáo gốc tại đây' — cụm 'tại đây' phải đổi màu, gạch chân và dẫn sang trang khác khi bấm.",
    explain: "<a href> là phần tử duy nhất tạo hyperlink thực thụ.",
  },
  {
    tag: "a",
    prompt: "Nút 'Mua ngay' thực chất chỉ điều hướng sang trang /checkout, không submit gì — về ngữ nghĩa nên là button hay thẻ gì?",
    explain: "Điều hướng = <a> (style như nút bằng CSS); hành động = button.",
  },
  {
    tag: "a",
    prompt: "Tab và Enter của người dùng bàn phím phải kích hoạt được mọi liên kết — div onClick không làm được, phải dùng thẻ nào?",
    explain: "<a> có sẵn focus + Enter; div tự chế thiếu accessibility.",
  },
  {
    tag: "img",
    prompt: "Logo công ty dạng file PNG phải xuất hiện trên header mọi trang — thẻ rỗng nào chèn nó?",
    explain: "<img src alt> — thẻ hiển thị ảnh tiêu chuẩn.",
  },
  {
    tag: "img",
    prompt: "Khác background-image của CSS (trang trí), ảnh sản phẩm là NỘI DUNG thực sự nên phải nằm trong thẻ nào để có alt và được Google index?",
    explain: "Ảnh nội dung dùng <img>; ảnh trang trí mới dùng CSS background.",
  },
  {
    tag: "img",
    prompt: "Email marketing chèn banner 600px — email client chỉ render ảnh qua thẻ HTML nào (không hỗ trợ CSS background)?",
    explain: "Trong email HTML, ảnh luôn là <img>.",
  },
  {
    tag: "video",
    prompt: "Khóa học upload bài giảng .mp4 lên server riêng (không YouTube) — phát trực tiếp trong trang bằng thẻ nào?",
    explain: "<video> phát file media tự host, không cần iframe.",
  },
  {
    tag: "video",
    prompt: "Sản phẩm cần đoạn demo 360° xoay quanh — dạng phim ngắn tự phát không tiếng, lặp vô hạn ngay trong card sản phẩm.",
    explain: "<video autoplay muted loop> thay GIF — nhẹ và nét hơn.",
  },
  {
    tag: "video",
    prompt: "Thẻ nào có thể chứa nhiều <source> và một <track> phụ đề bên trong?",
    explain: "<video> nhận source (định dạng) và track (phụ đề).",
  },
  {
    tag: "audio",
    prompt: "Nút 'Nghe phát âm' từ điển bật file .mp3 đọc mẫu — phần tử HTML nào phát âm thanh đó?",
    explain: "<audio> là phần tử phát âm thanh chuẩn.",
  },
  {
    tag: "audio",
    prompt: "Trang radio online cần trình phát stream chỉ có thanh play/âm lượng, KHÔNG có khung hình — thẻ nào (không phải video)?",
    explain: "Chỉ âm thanh → <audio>, gọn hơn video.",
  },
  {
    tag: "audio",
    prompt: "Sách nói từng chương: mỗi chương một trình phát có nút play riêng. Thẻ nào lặp lại cho mỗi chương?",
    explain: "Mỗi file âm thanh một <audio controls>.",
  },
  {
    tag: "source",
    prompt: "Để Safari phát HEVC còn Chrome phát WebM của CÙNG một video, mỗi định dạng khai báo trong thẻ con nào?",
    explain: "Nhiều <source>, trình duyệt chọn cái đầu tiên phát được.",
  },
  {
    tag: "source",
    prompt: "Trong <picture>, bản ảnh .avif cho trình duyệt mới và .jpg dự phòng — mỗi bản nằm trong thẻ nào (trừ img cuối)?",
    explain: "<picture> chứa các <source> + một <img> fallback.",
  },
  {
    tag: "source",
    prompt: "Thẻ rỗng nào CHỈ có nghĩa khi nằm trong video, audio hoặc picture — đứng một mình thì vô dụng?",
    explain: "<source> luôn là con của phần tử media.",
  },
  {
    tag: "figure",
    prompt: "Biểu đồ + chú thích 'Hình 2.1' phải đi liền nhau, CSS có thể float cả cụm sang phải mà không tách rời.",
    explain: "<figure> nhóm minh họa + chú thích thành một đơn vị.",
  },
  {
    tag: "figure",
    prompt: "Khối code ví dụ kèm dòng 'Ví dụ 3: vòng lặp for' bên dưới — về ngữ nghĩa cả cụm nên bọc trong thẻ nào (không chỉ dành cho ảnh)?",
    explain: "<figure> dùng cho mọi minh họa: ảnh, code, bảng, biểu đồ.",
  },
  {
    tag: "figure",
    prompt: "Máy đọc màn hình thông báo 'hình có chú thích' nhờ cấu trúc thẻ nào bao ngoài img + figcaption?",
    explain: "<figure> tạo liên kết ngữ nghĩa giữa ảnh và chú thích.",
  },
  {
    tag: "figcaption",
    prompt: "Dưới tấm ảnh phóng sự là dòng 'Ảnh: Nguyễn Văn A — chụp tại Hà Nội' — thẻ nào trong figure dành cho dòng này?",
    explain: "<figcaption> là chú thích chính thức của figure.",
  },
  {
    tag: "figcaption",
    prompt: "Trong <figure>, thẻ nào phải là con ĐẦU TIÊN hoặc CUỐI CÙNG, không được kẹp giữa?",
    explain: "<figcaption> đứng đầu hoặc cuối figure theo spec.",
  },
  {
    tag: "figcaption",
    prompt: "Gallery tranh: tên tác phẩm hiện ngay dưới mỗi bức trong khối figure — dùng thẻ gì thay vì <p> thường?",
    explain: "<figcaption> gắn ngữ nghĩa 'đây là chú thích của hình này'.",
  },
  // ============ Đợt C: Danh sách (+3 câu/thẻ) ============
  {
    tag: "ul",
    prompt: "Checklist 'Đồ cần mang khi đi camping' — các mục ngang hàng, đảo thứ tự không đổi nghĩa. Thẻ bao ngoài?",
    explain: "Thứ tự không quan trọng → <ul>.",
  },
  {
    tag: "ul",
    prompt: "Footer có cột 'Về chúng tôi / Tuyển dụng / Liên hệ' — nhóm link dọc này về ngữ nghĩa là thẻ gì (bên trong nav)?",
    explain: "Nhóm link ngang hàng = <ul> chứa các li > a.",
  },
  {
    tag: "ul",
    prompt: "Máy đọc màn hình thông báo 'danh sách, 5 mục' giúp người nghe hình dung — nhờ nội dung nằm trong thẻ nào?",
    explain: "<ul>/<ol> cho máy đọc biết số mục và ranh giới danh sách.",
  },
  {
    tag: "ol",
    prompt: "Hướng dẫn cài đặt: 'Bước 1 tải file, Bước 2 chạy installer...' — đảo thứ tự là hỏng. Thẻ bao ngoài?",
    explain: "Trình tự bắt buộc → <ol>.",
  },
  {
    tag: "ol",
    prompt: "Công thức pha cà phê 5 bước cần trình duyệt TỰ đánh số để khi chèn thêm bước, số tự cập nhật.",
    explain: "<ol> tự đánh số — thêm/xóa mục không phải sửa tay.",
  },
  {
    tag: "ol",
    prompt: "Phần 'Tài liệu tham khảo' đánh số [1], [2], [3] theo thứ tự trích dẫn — danh sách này dùng thẻ nào?",
    explain: "Thứ tự có ý nghĩa tham chiếu → <ol>.",
  },
  {
    tag: "li",
    prompt: "Trong menu <ul> của navbar, MỖI mục 'Trang chủ', 'Sản phẩm' phải nằm trong thẻ nào trước khi đặt link?",
    explain: "Con trực tiếp của ul/ol luôn là <li>.",
  },
  {
    tag: "li",
    prompt: "CSS ::marker tùy biến dấu đầu dòng — pseudo-element này áp lên thẻ nào?",
    explain: "::marker là dấu chấm/số của <li>.",
  },
  {
    tag: "li",
    prompt: "Validator báo lỗi 'div is not allowed as child of ul' — phải thay div bằng thẻ nào rồi đặt nội dung vào trong?",
    explain: "ul chỉ nhận <li> làm con trực tiếp.",
  },
  {
    tag: "dl",
    prompt: "Trang glossary thuật ngữ lập trình: mỗi từ kèm định nghĩa ngay dưới — cấu trúc khóa-giá trị này bọc bằng thẻ nào?",
    explain: "<dl> = description list cho cặp thuật ngữ–định nghĩa.",
  },
  {
    tag: "dl",
    prompt: "Hóa đơn hiển thị 'Mã đơn: #123 / Ngày đặt: 11/6 / Trạng thái: Đang giao' — metadata dạng cặp nhãn-giá trị dùng thẻ nào đúng nhất?",
    explain: "Cặp nhãn–giá trị không phải bảng 2 chiều → <dl>.",
  },
  {
    tag: "dl",
    prompt: "Thẻ danh sách nào KHÔNG dùng <li> mà dùng cặp dt/dd bên trong?",
    explain: "<dl> có cấu trúc con riêng: dt + dd.",
  },
  {
    tag: "dt",
    prompt: "Trong trang FAQ dựng bằng dl, phần CÂU HỎI 'Ship mất mấy ngày?' nằm trong thẻ nào?",
    explain: "<dt> = term/khóa — câu hỏi trong FAQ dl.",
  },
  {
    tag: "dt",
    prompt: "Cặp 'CPU — Intel i7': từ 'CPU' (tên thông số) dùng thẻ nào trong danh sách mô tả?",
    explain: "Tên/nhãn → <dt>.",
  },
  {
    tag: "dt",
    prompt: "Trong dl, thẻ nào luôn đứng TRƯỚC và có thể có nhiều dd theo sau nó?",
    explain: "<dt> đứng trước các <dd> mô tả nó.",
  },
  {
    tag: "dd",
    prompt: "Trong trang FAQ dựng bằng dl, phần CÂU TRẢ LỜI '3-5 ngày làm việc' nằm trong thẻ nào?",
    explain: "<dd> = description — câu trả lời trong FAQ dl.",
  },
  {
    tag: "dd",
    prompt: "Cặp 'CPU — Intel i7': giá trị 'Intel i7' dùng thẻ nào?",
    explain: "Giá trị/mô tả → <dd>.",
  },
  {
    tag: "dd",
    prompt: "Trình duyệt tự THỤT LỀ trái phần tử nào bên trong dl theo style mặc định?",
    explain: "<dd> có margin-left mặc định — dấu hiệu nhận biết.",
  },
  // ============ Đợt C: Bảng (+3 câu/thẻ) ============
  {
    tag: "table",
    prompt: "So sánh thông số 3 mẫu điện thoại: mỗi hàng một thông số, mỗi cột một máy — dữ liệu 2 chiều này dùng thẻ nào?",
    explain: "Dữ liệu hàng × cột thực thụ → <table>.",
  },
  {
    tag: "table",
    prompt: "Máy đọc màn hình đọc được 'hàng 3, cột Giá: 99.000đ' khi dữ liệu nằm trong cấu trúc thẻ nào?",
    explain: "<table> + th/scope cho phép điều hướng theo ô.",
  },
  {
    tag: "table",
    prompt: "Sao kê ngân hàng 50 dòng: ngày, nội dung, số tiền, số dư — thẳng cột tăm tắp. Thẻ bao ngoài cùng?",
    explain: "Sao kê/báo cáo dạng lưới → <table>.",
  },
  {
    tag: "tr",
    prompt: "JS thêm một giao dịch mới vào bảng: document.createElement(?) trước khi nhét các ô td vào — tạo thẻ gì?",
    explain: "Mỗi dòng mới của bảng là một <tr>.",
  },
  {
    tag: "tr",
    prompt: "CSS tô màu xen kẽ các DÒNG bảng bằng :nth-child(even) — selector này áp lên thẻ nào?",
    explain: "tr:nth-child(even) — zebra stripes theo hàng.",
  },
  {
    tag: "tr",
    prompt: "Trong thead, hàng chứa các ô nhãn cột vẫn phải bọc trong thẻ nào (thead không chứa th trực tiếp)?",
    explain: "th nằm trong <tr>, tr nằm trong thead.",
  },
  {
    tag: "td",
    prompt: "Bảng giá: con số '99.000đ' — một Ô DỮ LIỆU thường, không phải nhãn — nằm trong thẻ nào?",
    explain: "Ô dữ liệu → <td>; ô nhãn → th.",
  },
  {
    tag: "td",
    prompt: "Mỗi <tr> của bảng sao kê chứa 4 thẻ con cùng loại đựng ngày, nội dung, số tiền, số dư — thẻ gì?",
    explain: "Các ô thường trong hàng là <td>.",
  },
  {
    tag: "td",
    prompt: "Khác th (đậm, căn giữa, ngữ nghĩa nhãn), thẻ nào hiển thị chữ thường căn trái cho nội dung bảng?",
    explain: "<td> — ô nội dung mặc định.",
  },
  {
    tag: "th",
    prompt: "Hàng đầu bảng điểm ghi 'Họ tên / Toán / Văn / Anh' — các ô NHÃN này in đậm tự nhiên nhờ thẻ nào?",
    explain: "<th> mặc định đậm + căn giữa + mang nghĩa nhãn.",
  },
  {
    tag: "th",
    prompt: "Máy đọc màn hình đọc 'Giá: 99.000đ' (kèm tên cột) cho từng ô là nhờ ô nhãn dùng thẻ nào thay vì td?",
    explain: "<th> cho máy đọc biết nhãn để ghép với từng ô dữ liệu.",
  },
  {
    tag: "th",
    prompt: "Cột đầu mỗi hàng của bảng lương ghi tên nhân viên đóng vai trò NHÃN HÀNG — ô đó nên là thẻ gì kèm scope=\"row\"?",
    explain: "Nhãn của hàng cũng dùng <th>, không riêng nhãn cột.",
  },
  {
    tag: "thead",
    prompt: "In bảng 5 trang giấy, hàng nhãn cột phải TỰ LẶP LẠI ở đầu mỗi trang in — nhờ nhóm hàng đó nằm trong thẻ nào?",
    explain: "<thead> được trình duyệt lặp lại khi in bảng dài.",
  },
  {
    tag: "thead",
    prompt: "CSS position: sticky giữ hàng nhãn đứng yên khi cuộn bảng — selector gọn nhất áp lên thẻ nhóm nào?",
    explain: "thead (hoặc thead th) là mục tiêu sticky header.",
  },
  {
    tag: "thead",
    prompt: "Bảng chuẩn 3 phần: phần ĐẦU chứa hàng nhãn nằm trong thẻ nào, trước tbody và tfoot?",
    explain: "Thứ tự chuẩn: thead → tbody → tfoot.",
  },
  {
    tag: "tbody",
    prompt: "JS render lại 100 dòng dữ liệu mà GIỮ NGUYÊN hàng nhãn cột — nó chỉ cần thay innerHTML của thẻ nhóm nào?",
    explain: "Thay <tbody> = thay toàn bộ dữ liệu, giữ thead.",
  },
  {
    tag: "tbody",
    prompt: "Bảng có 2 nhóm dữ liệu 'Quý 1' và 'Quý 2' tách biệt — một bảng được phép chứa NHIỀU thẻ nhóm này.",
    explain: "Một table có thể có nhiều <tbody> để nhóm hàng.",
  },
  {
    tag: "tbody",
    prompt: "Viết table > tr trực tiếp, DevTools cho thấy trình duyệt TỰ bọc các hàng vào thẻ nào?",
    explain: "Trình duyệt ngầm tạo <tbody> quanh các tr trần.",
  },
  {
    tag: "tfoot",
    prompt: "Bảng chi tiêu in nhiều trang: dòng 'Tổng: 12.500.000đ' phải xuất hiện cuối bảng — nhóm nó trong thẻ nào?",
    explain: "<tfoot> chứa hàng tổng kết của bảng.",
  },
  {
    tag: "tfoot",
    prompt: "Bộ ba thead/tbody/? — thẻ còn thiếu dành cho các hàng tổng hợp cuối bảng là gì?",
    explain: "<tfoot> hoàn thành bộ ba nhóm hàng.",
  },
  {
    tag: "tfoot",
    prompt: "CSS cần in đậm và kẻ viền trên cho riêng khu vực hàng tổng — selector nhắm vào thẻ nhóm nào?",
    explain: "tfoot td { border-top, font-weight } — style khu tổng kết.",
  },
  {
    tag: "caption",
    prompt: "Quy chuẩn kiểm toán: mỗi bảng số liệu phải có TIÊU ĐỀ gắn liền 'Bảng 3: Chi phí Q1/2026' — thẻ nào ngay sau <table>?",
    explain: "<caption> là tiêu đề chính thức của bảng.",
  },
  {
    tag: "caption",
    prompt: "Máy đọc màn hình đọc TÊN BẢNG trước khi vào dữ liệu — tên đó phải đặt trong thẻ nào (không phải h3 đứng cạnh)?",
    explain: "<caption> được máy đọc gắn với chính bảng đó.",
  },
  {
    tag: "caption",
    prompt: "Thẻ nào bắt buộc là con ĐẦU TIÊN của table nếu xuất hiện?",
    explain: "<caption> phải đứng ngay sau thẻ mở <table>.",
  },
  // ============ Đợt C: Form (+3 câu/thẻ) ============
  {
    tag: "form",
    prompt: "Khi khách nhấn Enter trong ô cuối cùng, toàn bộ dữ liệu các ô phải được gói lại gửi server — các ô phải nằm chung trong thẻ nào?",
    explain: "<form> gom các trường và xử lý submit.",
  },
  {
    tag: "form",
    prompt: "Sự kiện JS onsubmit + e.preventDefault() để tự xử lý bằng fetch — sự kiện đó thuộc về thẻ nào?",
    explain: "submit là sự kiện của <form>, không phải của nút.",
  },
  {
    tag: "form",
    prompt: "Validation required/pattern của các ô CHỈ tự chạy khi chúng nằm trong thẻ bao nào và được submit?",
    explain: "Constraint validation kích hoạt qua submit của <form>.",
  },
  {
    tag: "input",
    prompt: "Ô đánh giá sao, ô chọn màu, ô kéo thanh trượt — đều là MỘT thẻ với type khác nhau (range, color...). Thẻ nào?",
    explain: "<input> với ~20 type phủ hầu hết control nhập liệu.",
  },
  {
    tag: "input",
    prompt: "Thẻ rỗng (không có thẻ đóng) duy nhất trong nhóm: textarea, select, input, button?",
    explain: "<input> là void element; ba thẻ kia có thẻ đóng.",
  },
  {
    tag: "input",
    prompt: "Ô tìm kiếm một dòng trên navbar — nhập ngắn gọn không cần nhiều dòng. Thẻ nào (không phải textarea)?",
    explain: "Một dòng → <input type=\"search\">; nhiều dòng → textarea.",
  },
  {
    tag: "label",
    prompt: "Mỗi ô nhập trong form đều cần một dòng chữ mô tả ĐƯỢC LIÊN KẾT về mặt ngữ nghĩa — không phải <span> đứng cạnh. Thẻ nào?",
    explain: "<label> là nhãn chính thức, span không có liên kết ngữ nghĩa.",
  },
  {
    tag: "label",
    prompt: "Audit accessibility: 'form field has no associated ___' — thẻ nào đang thiếu cho các ô nhập?",
    explain: "Mỗi input cần một <label> liên kết.",
  },
  {
    tag: "label",
    prompt: "Cách viết không cần for/id: bọc thẳng <input> vào trong thẻ nào là tự liên kết nhãn–ô?",
    explain: "<label>Email <input></label> — liên kết ngầm bằng cách bọc.",
  },
  {
    tag: "button",
    prompt: "Biểu tượng ❤️ 'yêu thích' chạy JS khi bấm — về accessibility phải là thẻ nào, không phải <div onclick>?",
    explain: "<button> có sẵn focus, Enter/Space, vai trò button.",
  },
  {
    tag: "button",
    prompt: "Phần tử nào nhận Space VÀ Enter để kích hoạt từ bàn phím mà không cần JS thêm?",
    explain: "<button> — hành vi bàn phím có sẵn.",
  },
  {
    tag: "button",
    prompt: "Cần nút chứa cả icon SVG lẫn chữ 'Tải xuống' bên trong (input type=submit không chứa được con) — dùng thẻ nào?",
    explain: "<button> chứa được HTML con; input thì không.",
  },
  {
    tag: "textarea",
    prompt: "Khung soạn bình luận co giãn được bằng cách kéo góc dưới phải — hành vi resize mặc định của thẻ nào?",
    explain: "<textarea> resize được theo mặc định.",
  },
  {
    tag: "textarea",
    prompt: "Nội dung mô tả sản phẩm 2000 ký tự có xuống dòng — ô nhập nào giữ được các dòng đó khi gửi đi?",
    explain: "Văn bản nhiều dòng → <textarea>.",
  },
  {
    tag: "textarea",
    prompt: "Khác input (value là thuộc tính), thẻ nhập liệu nào đặt giá trị mặc định ở NỘI DUNG giữa thẻ mở-đóng?",
    explain: "<textarea>giá trị mặc định</textarea>.",
  },
  {
    tag: "select",
    prompt: "Trường 'Năm sinh' 1950-2010: 60 lựa chọn mà không chiếm chỗ — phần tử gọn nhất là gì?",
    explain: "<select> gói nhiều lựa chọn trong một dropdown.",
  },
  {
    tag: "select",
    prompt: "Trên iPhone, phần tử nào tự bật giao diện cuộn chọn (picker wheel) bản địa của iOS?",
    explain: "<select> dùng UI chọn bản địa của từng thiết bị.",
  },
  {
    tag: "select",
    prompt: "Thẻ nào chứa các <optgroup> để nhóm lựa chọn 'Miền Bắc / Miền Nam' trong một dropdown?",
    explain: "<select> > optgroup > option.",
  },
  {
    tag: "option",
    prompt: "63 dòng tỉnh thành bên trong dropdown — MỖI dòng là thẻ gì?",
    explain: "Mỗi lựa chọn là một <option>.",
  },
  {
    tag: "option",
    prompt: "Thẻ nào chỉ sống bên trong select/optgroup/datalist — đặt ngoài là vô nghĩa?",
    explain: "<option> luôn thuộc một hộp chọn.",
  },
  {
    tag: "option",
    prompt: "Gợi ý tự hoàn thành của <datalist> được liệt kê bằng các thẻ con nào?",
    explain: "datalist cũng chứa <option> như select.",
  },
  {
    tag: "fieldset",
    prompt: "Form khảo sát dài chia 3 phần 'Thông tin / Thói quen / Góp ý' — mỗi phần đóng KHUNG riêng có viền sẵn của trình duyệt.",
    explain: "<fieldset> vẽ khung nhóm mặc định, không cần CSS.",
  },
  {
    tag: "fieldset",
    prompt: "Nhóm radio 'Hình thức thanh toán' cần được máy đọc màn hình giới thiệu TÊN NHÓM trước khi đọc từng lựa chọn — bọc nhóm bằng thẻ nào (kèm legend)?",
    explain: "fieldset + legend đặt tên nhóm control cho accessibility.",
  },
  {
    tag: "fieldset",
    prompt: "Thẻ nào là cha hợp lệ duy nhất của <legend>?",
    explain: "<legend> chỉ đứng đầu <fieldset>.",
  },
  {
    tag: "legend",
    prompt: "Dòng chữ 'Địa chỉ giao hàng' nằm CHÈN LÊN viền khung nhóm — hiệu ứng mặc định của thẻ nào?",
    explain: "<legend> hiển thị cắt ngang viền fieldset.",
  },
  {
    tag: "legend",
    prompt: "Máy đọc màn hình đọc 'Hình thức thanh toán, nhóm' rồi mới đọc các radio — tên nhóm đó lấy từ thẻ nào?",
    explain: "<legend> là accessible name của fieldset.",
  },
  {
    tag: "legend",
    prompt: "Trong fieldset, thẻ tiêu đề nhóm phải đứng ở vị trí nào và là thẻ gì?",
    explain: "<legend> — con đầu tiên của fieldset.",
  },
  // ============ Đợt C: Cấu trúc trang (+3 câu/thẻ) ============
  {
    tag: "html",
    prompt: "document.documentElement trong JS trỏ đến thẻ nào của trang?",
    explain: "documentElement chính là <html> — gốc của DOM.",
  },
  {
    tag: "html",
    prompt: "Dark mode kiểu Tailwind hoạt động bằng cách thêm class 'dark' lên thẻ NGOÀI CÙNG — thẻ nào?",
    explain: "Theme class thường đặt trên <html> để CSS phủ toàn trang.",
  },
  {
    tag: "html",
    prompt: "CSS đơn vị rem tính theo font-size của phần tử gốc — phần tử đó là thẻ nào?",
    explain: "rem = root em — gốc là <html>.",
  },
  {
    tag: "head",
    prompt: "Thẻ <title> và <meta> đặt nhầm trong <body> bị trình duyệt dời đi — vị trí hợp lệ duy nhất của chúng là trong thẻ nào?",
    explain: "Metadata chỉ hợp lệ trong <head>.",
  },
  {
    tag: "head",
    prompt: "SEO specialist gửi checklist 'thêm meta description, canonical, og:image' — tất cả chỉnh trong khu vực nào của HTML?",
    explain: "Mọi khai báo SEO nằm trong <head>.",
  },
  {
    tag: "head",
    prompt: "Hai vùng con trực tiếp của <html>: một hiển thị, một KHÔNG hiển thị — vùng không hiển thị là thẻ nào?",
    explain: "<head> chứa metadata; <body> chứa nội dung.",
  },
  {
    tag: "body",
    prompt: "CSS đặt font chữ và màu nền mặc định cho TOÀN BỘ nội dung nhìn thấy — selector gọn nhất là thẻ nào?",
    explain: "body { font-family, background } áp toàn trang.",
  },
  {
    tag: "body",
    prompt: "document.body trong JS — nơi appendChild các phần tử hiển thị — là thẻ nào?",
    explain: "<body> là gốc của phần nội dung render.",
  },
  {
    tag: "body",
    prompt: "Thẻ <script> nên đặt cuối thẻ nào (ngay trước thẻ đóng) theo cách truyền thống để không chặn render?",
    explain: "Cuối <body> — hoặc dùng defer trong head theo cách hiện đại.",
  },
  {
    tag: "title",
    prompt: "Lịch sử trình duyệt và phím Ctrl+H liệt kê các trang theo DÒNG CHỮ lấy từ thẻ nào?",
    explain: "<title> xuất hiện ở history, tab, bookmark.",
  },
  {
    tag: "title",
    prompt: "SEO: dòng xanh đậm bấm được trong kết quả Google chính là nội dung thẻ nào của trang?",
    explain: "<title> là tiêu đề kết quả tìm kiếm.",
  },
  {
    tag: "title",
    prompt: "Thẻ nào BẮT BUỘC phải có trong head theo chuẩn HTML — thiếu nó validator báo lỗi ngay?",
    explain: "Mỗi tài liệu hợp lệ cần đúng một <title>.",
  },
  {
    tag: "meta",
    prompt: "Trang web chữ BÉ XÍU trên điện thoại như bản thu nhỏ desktop — head thiếu thẻ khai báo viewport nào?",
    explain: '<meta name="viewport"> — thiếu là mobile render kiểu desktop.',
  },
  {
    tag: "meta",
    prompt: "Đoạn mô tả ngắn hiện dưới tiêu đề trong kết quả Google được khai báo bằng thẻ nào (name=\"description\")?",
    explain: "<meta name=\"description\"> — mô tả SEO.",
  },
  {
    tag: "meta",
    prompt: "Thẻ rỗng nào trong head có thể xuất hiện hàng chục lần, mỗi lần một khai báo khác nhau (charset, viewport, og:...)?",
    explain: "<meta> — mỗi thẻ một mẩu metadata.",
  },
  {
    tag: "div",
    prompt: "Cần phần tử bao để CSS Grid chia trang 2 cột — không có thẻ ngữ nghĩa nào khớp vai trò này. Dùng gì?",
    explain: "Wrapper thuần layout → <div>.",
  },
  {
    tag: "div",
    prompt: "Toast notification do JS chèn vào góc màn hình — khối chứa vô danh này thường là thẻ gì?",
    explain: "Container do JS điều khiển → <div>.",
  },
  {
    tag: "div",
    prompt: "Sau khi đã cân nhắc header/main/section đều KHÔNG đúng nghĩa, thẻ khối nào là lựa chọn cuối cùng hợp lệ?",
    explain: "<div> là phương án cuối khi không thẻ ngữ nghĩa nào khớp.",
  },
  {
    tag: "link",
    prompt: "Google Fonts hướng dẫn dán một thẻ vào head để nạp font Roboto — thẻ rỗng nào (không phải script)?",
    explain: "<link rel=\"stylesheet\"> nạp CSS font từ CDN.",
  },
  {
    tag: "link",
    prompt: "Favicon hiện trên tab được khai báo trong head bằng thẻ nào?",
    explain: '<link rel="icon" href="favicon.ico">.',
  },
  {
    tag: "link",
    prompt: "SEO: khai báo URL chính thức tránh duplicate content bằng <??? rel=\"canonical\"> — thẻ nào?",
    explain: "<link rel=\"canonical\"> — khai báo trong head.",
  },
  {
    tag: "script",
    prompt: "Nút hamburger menu cần mở/đóng khi bấm — hành vi này viết bằng JS đặt trong thẻ nào?",
    explain: "Mọi JavaScript inline hoặc src đều qua <script>.",
  },
  {
    tag: "script",
    prompt: "Google Analytics yêu cầu dán một đoạn mã vào trang — đoạn đó nằm trong cặp thẻ nào?",
    explain: "Mã tracking bên thứ ba là các thẻ <script>.",
  },
  {
    tag: "script",
    prompt: "Thẻ nào KHÔNG phải void element: dù nạp file ngoài qua src vẫn bắt buộc viết thẻ đóng?",
    explain: "<script src=\"...\"></script> — luôn cần thẻ đóng.",
  },
  // ============ Đợt C: Ngữ nghĩa (+3 câu/thẻ) ============
  {
    tag: "header",
    prompt: "Khối trên cùng gồm logo + ô tìm kiếm + giỏ hàng lặp lại ở mọi trang shop — thẻ ngữ nghĩa bao ngoài là gì?",
    explain: "Vùng đầu trang → <header>.",
  },
  {
    tag: "header",
    prompt: "Máy đọc màn hình cho phép nhảy đến 'banner landmark' — vùng đó tương ứng thẻ ngữ nghĩa nào của trang?",
    explain: "<header> cấp trang = landmark banner.",
  },
  {
    tag: "header",
    prompt: "Mỗi card bài viết có cụm 'tiêu đề + avatar tác giả + ngày đăng' ở đầu — cụm đó bọc bằng thẻ nào bên trong article?",
    explain: "<header> dùng được trong từng article/section.",
  },
  {
    tag: "nav",
    prompt: "Máy đọc màn hình có phím tắt nhảy thẳng đến 'navigation landmark' — vùng menu phải bọc bằng thẻ nào để có landmark đó?",
    explain: "<nav> tạo navigation landmark.",
  },
  {
    tag: "nav",
    prompt: "Sidebar tài liệu chứa cây link đến từng chương — khối điều hướng nội bộ này dùng thẻ ngữ nghĩa gì?",
    explain: "Mọi khối điều hướng chính → <nav>.",
  },
  {
    tag: "nav",
    prompt: "Footer có 30 link lặt vặt: KHÔNG nên bọc tất cả bằng thẻ điều hướng nào (chỉ dành cho nhóm điều hướng chính)?",
    explain: "<nav> dành cho điều hướng chính — không phải mọi cụm link.",
  },
  {
    tag: "main",
    prompt: "Reader mode của trình duyệt trích đúng phần bài viết, bỏ header/sidebar — nó ưu tiên nội dung trong thẻ nào?",
    explain: "<main> đánh dấu nội dung chính cho reader mode/máy đọc.",
  },
  {
    tag: "main",
    prompt: "Thẻ ngữ nghĩa nào chỉ được dùng MỘT LẦN mỗi trang và không được lồng trong header, footer, nav, article?",
    explain: "<main> — duy nhất và đứng độc lập.",
  },
  {
    tag: "main",
    prompt: "Giữa header và footer giống nhau ở mọi trang, phần nội dung THAY ĐỔI theo từng trang bọc bằng thẻ nào?",
    explain: "Phần riêng của từng trang là <main>.",
  },
  {
    tag: "section",
    prompt: "Trang giới thiệu chia khối 'Sứ mệnh', 'Đội ngũ', 'Đối tác' — mỗi khối có h2 riêng nhưng không tự đứng được ngoài trang. Thẻ nào?",
    explain: "Phần theo chủ đề thuộc tổng thể → <section>.",
  },
  {
    tag: "section",
    prompt: "Code review: 'div này có heading riêng và là một phần nội dung có chủ đề — nên đổi sang thẻ ngữ nghĩa nào?'",
    explain: "div có chủ đề + heading → nâng cấp thành <section>.",
  },
  {
    tag: "section",
    prompt: "Trong một bài hướng dẫn (article), các phần 'Chuẩn bị', 'Các bước', 'Lưu ý' chia bằng thẻ nào?",
    explain: "<section> chia chương mục bên trong article.",
  },
  {
    tag: "article",
    prompt: "RSS reader trích từng TIN trong trang tổng hợp — mỗi tin trọn vẹn (tiêu đề, ảnh, nội dung) phải bọc bằng thẻ nào?",
    explain: "<article> = đơn vị nội dung phân phối độc lập được.",
  },
  {
    tag: "article",
    prompt: "Mỗi BÌNH LUẬN trong khu comment có tác giả, thời gian, nội dung riêng — từng bình luận về ngữ nghĩa là thẻ gì?",
    explain: "Comment tự đứng được → <article> (lồng trong article bài viết).",
  },
  {
    tag: "article",
    prompt: "Card sản phẩm trong lưới shop: tên, ảnh, giá, nút mua — tách ra nhúng trang khác vẫn đủ nghĩa. Thẻ bao là gì?",
    explain: "Card độc lập trọn nghĩa → <article>.",
  },
  {
    tag: "aside",
    prompt: "Hộp 'Có thể bạn quan tâm' đứng cạnh bài viết — xóa đi bài chính vẫn nguyên vẹn. Thẻ ngữ nghĩa nào?",
    explain: "Nội dung phụ trợ → <aside>.",
  },
  {
    tag: "aside",
    prompt: "Máy đọc màn hình gọi vùng này là 'complementary landmark' — đó là thẻ nào trong HTML?",
    explain: "<aside> = complementary — nội dung bổ trợ.",
  },
  {
    tag: "aside",
    prompt: "Khung 'Thuật ngữ: SRS là gì?' chen giữa bài học để giải thích thêm, không thuộc mạch chính — bọc bằng thẻ gì?",
    explain: "Chú giải bên lề trong bài → <aside>.",
  },
  {
    tag: "footer",
    prompt: "Khối cuối mọi trang: logo, '© 2026', link Chính sách + Điều khoản, icon mạng xã hội — thẻ ngữ nghĩa nào?",
    explain: "Chân trang → <footer>.",
  },
  {
    tag: "footer",
    prompt: "Máy đọc màn hình nhảy đến 'contentinfo landmark' (thông tin về trang) — vùng này là thẻ nào?",
    explain: "<footer> cấp trang = landmark contentinfo.",
  },
  {
    tag: "footer",
    prompt: "Cuối mỗi bình luận có dòng 'Trả lời · Thích · 2 giờ trước' — phần kết của riêng bình luận đó bọc bằng thẻ gì?",
    explain: "<footer> dùng được trong từng article/bình luận.",
  },
];
