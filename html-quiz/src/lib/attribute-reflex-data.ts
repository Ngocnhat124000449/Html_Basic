// Phản xạ THUỘC TÍNH: tình huống thực tế → gõ tên thuộc tính.
//
// Nguyên tắc nội dung (theo yêu cầu "đúng ngữ cảnh, dễ hiểu, đa dạng"):
// - Mỗi câu là MỘT tình huống đời thực cụ thể (trang bán hàng, form đăng ký, blog...)
// - Mỗi câu chỉ có MỘT đáp án đúng — tránh tình huống nhiều thuộc tính đều hợp lý
// - Thuộc tính quan trọng/hay dùng: ≥5 câu từ 5 góc nhìn (nhu cầu, bug, hành vi
//   trình duyệt, phân biệt với cách khác, nghiệp vụ); ít dùng: 2-3 câu
// - Giải thích 1 dòng, ngôn ngữ đơn giản

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
  // ============ <a> ============
  // --- href (quan trọng nhất) ---
  {
    attr: "href",
    tag: "a",
    prompt: "Chữ 'Giỏ hàng' đã bọc trong thẻ <a> nhưng bấm vào không đi đâu cả. Thiếu thuộc tính nào?",
    explain: "href chứa địa chỉ đích — thiếu nó <a> không còn là liên kết.",
  },
  {
    attr: "href",
    tag: "a",
    prompt: "Footer cần một link để khách bấm vào là mở ứng dụng email gửi đến hotro@shopvn.com (dùng giá trị mailto:).",
    explain: 'href="mailto:hotro@shopvn.com" — href nhận cả mailto:, tel:, #id.',
  },
  {
    attr: "href",
    tag: "a",
    prompt: "Mục lục đầu bài viết cần liên kết nhảy xuống phần 'Kết luận' có id=\"ket-luan\" ngay trong cùng trang.",
    explain: 'href="#ket-luan" — liên kết neo (anchor) trong trang cũng đi qua href.',
  },
  {
    attr: "href",
    tag: "a",
    prompt: "Trên điện thoại, bấm vào số hotline phải mở luôn màn hình gọi điện (giá trị tel:0901234567).",
    explain: 'href="tel:..." biến link thành nút gọi điện trên di động.',
  },
  {
    attr: "href",
    tag: "a",
    prompt: "Link 'Trang chủ' đang viết <a src=\"/\">Trang chủ</a> và không hoạt động. Phải đổi src thành thuộc tính nào?",
    explain: "Liên kết dùng href, không phải src (src dành cho img, script, video...).",
  },
  // --- target (hay dùng) ---
  {
    attr: "target",
    tag: "a",
    prompt: "Link đến trang đối tác phải mở trong TAB MỚI để khách không rời trang của bạn.",
    explain: 'target="_blank" mở tab mới — nhớ kèm rel="noopener".',
  },
  {
    attr: "target",
    tag: "a",
    prompt: "Khách phàn nàn: bấm link 'Điều khoản' giữa lúc điền form thì mất hết dữ liệu đang nhập. Thêm thuộc tính nào (giá trị _blank) để điều khoản mở riêng?",
    explain: 'target="_blank" giúp trang hiện tại (và form đang điền) không bị rời đi.',
  },
  {
    attr: "target",
    tag: "a",
    prompt: "Thuộc tính nào của <a> quyết định liên kết mở ở đâu: tab hiện tại, tab mới hay một iframe có tên?",
    explain: "target nhận _self (mặc định), _blank, hoặc tên của frame/cửa sổ.",
  },
  {
    attr: "target",
    tag: "a",
    prompt: "Link tải báo cáo PDF nên xem trong tab riêng thay vì thay thế trang dashboard đang làm việc.",
    explain: 'target="_blank" — giữ nguyên trang làm việc hiện tại.',
  },
  {
    attr: "target",
    tag: "a",
    prompt: "Trong trang có <iframe name=\"preview\">, link bấm vào phải hiển thị nội dung bên trong iframe đó thay vì đổi cả trang.",
    explain: 'target="preview" trỏ đến name của iframe — ít gặp nhưng cùng cơ chế target.',
  },
  // --- rel (hay dùng) ---
  {
    attr: "rel",
    tag: "a",
    prompt: 'Link đã có target="_blank" — cần thêm thuộc tính bảo mật nào (giá trị noopener) để trang mới không điều khiển được trang cũ?',
    explain: 'rel="noopener" chặn trang mới truy cập window.opener của trang cũ.',
  },
  {
    attr: "rel",
    tag: "a",
    prompt: "Khu bình luận đầy link spam — cần đánh dấu để Google KHÔNG tính các link này là phiếu bầu uy tín (giá trị nofollow).",
    explain: 'rel="nofollow" báo công cụ tìm kiếm không truyền uy tín qua link.',
  },
  {
    attr: "rel",
    tag: "a",
    prompt: "Link affiliate quảng cáo cần khai báo quan hệ 'được tài trợ' với công cụ tìm kiếm (giá trị sponsored).",
    explain: 'rel="sponsored" — khai báo link quảng cáo/affiliate.',
  },
  {
    attr: "rel",
    tag: "a",
    prompt: "Thuộc tính nào của <a> mô tả MỐI QUAN HỆ giữa trang hiện tại và trang đích (noopener, nofollow, external...)?",
    explain: "rel = relationship — quan hệ với tài nguyên đích.",
  },
  {
    attr: "rel",
    tag: "a",
    prompt: "Audit bảo mật báo lỗi: các link mở tab mới chưa chặn trang đích đọc thông tin referrer. Thuộc tính nào nhận giá trị noreferrer?",
    explain: 'rel="noreferrer" ẩn địa chỉ trang nguồn khỏi trang đích.',
  },
  // --- download (ít dùng) ---
  {
    attr: "download",
    tag: "a",
    prompt: "Bấm link 'Hóa đơn tháng 6' phải TẢI file PDF về máy thay vì mở ra xem trên trình duyệt.",
    explain: "download biến link thành nút tải file.",
  },
  {
    attr: "download",
    tag: "a",
    prompt: "File ảnh trên server tên là 'IMG_8492.jpg' nhưng khi khách tải về bạn muốn file tự đổi tên thành 'anh-san-pham.jpg'.",
    explain: 'download="anh-san-pham.jpg" — giá trị của download đặt tên file tải về.',
  },
  // --- hreflang (ít dùng) ---
  {
    attr: "hreflang",
    tag: "a",
    prompt: "Link chuyển sang bản tiếng Anh của trang — cần khai báo ngôn ngữ của trang đích cho SEO đa ngôn ngữ.",
    explain: 'hreflang="en" cho biết ngôn ngữ của trang đích.',
  },
  {
    attr: "hreflang",
    tag: "a",
    prompt: "Thuộc tính nào của <a> nói cho công cụ tìm kiếm biết trang đích viết bằng tiếng Nhật (giá trị ja)?",
    explain: "hreflang khai báo mã ngôn ngữ trang đích.",
  },
  // ============ <img> ============
  // --- src (quan trọng nhất) ---
  {
    attr: "src",
    tag: "img",
    prompt: "Thẻ ảnh hiển thị khung rỗng kèm icon vỡ vì chưa khai báo đường dẫn file ảnh.",
    explain: "src trỏ đến file ảnh — thuộc tính bắt buộc của <img>.",
  },
  {
    attr: "src",
    tag: "img",
    prompt: "Bạn cần đổi ảnh banner từ tet.jpg sang he.jpg — sửa giá trị của thuộc tính nào trên thẻ <img>?",
    explain: "src quyết định ảnh nào được hiển thị.",
  },
  {
    attr: "src",
    tag: "img",
    prompt: "Ảnh viết <img href=\"logo.png\"> không hiện gì cả. href là của thẻ <a> — thẻ <img> phải dùng thuộc tính nào?",
    explain: "Nhầm lẫn kinh điển: <a> dùng href, <img> dùng src.",
  },
  {
    attr: "src",
    tag: "img",
    prompt: "JavaScript đổi ảnh đại diện ngay khi người dùng upload xong: avatar.___ = URL.createObjectURL(file). Đó là thuộc tính nào?",
    explain: "Đổi src bằng JS là cách thay ảnh động phổ biến nhất.",
  },
  {
    attr: "src",
    tag: "img",
    prompt: "DevTools báo lỗi 404 cho /anh/giay.png — ảnh không hiện. Kiểm tra lại giá trị thuộc tính nào của <img>?",
    explain: "Đường dẫn trong src sai/thiếu file là nguyên nhân ảnh vỡ phổ biến nhất.",
  },
  // --- alt (quan trọng nhất) ---
  {
    attr: "alt",
    tag: "img",
    prompt: "Người dùng khiếm thị dùng máy đọc màn hình cần NGHE được mô tả của ảnh sản phẩm.",
    explain: "alt là văn bản thay thế — bắt buộc cho accessibility.",
  },
  {
    attr: "alt",
    tag: "img",
    prompt: "Mạng yếu, ảnh không tải được — thay vì ô trống vô nghĩa, vị trí ảnh phải hiện dòng chữ 'Giày Nike Air trắng'.",
    explain: "Trình duyệt hiển thị nội dung alt khi ảnh lỗi.",
  },
  {
    attr: "alt",
    tag: "img",
    prompt: "Công cụ kiểm tra accessibility (Lighthouse) trừ điểm vì hàng loạt <img> thiếu một thuộc tính. Thuộc tính nào?",
    explain: "Thiếu alt là lỗi accessibility bị bắt nhiều nhất.",
  },
  {
    attr: "alt",
    tag: "img",
    prompt: "Ảnh hoa văn trang trí thuần túy: thuộc tính nào nên đặt giá trị RỖNG (=\"\") để máy đọc màn hình bỏ qua thay vì đọc tên file?",
    explain: 'alt="" (rỗng) báo ảnh chỉ trang trí — khác hẳn việc bỏ thuộc tính.',
  },
  {
    attr: "alt",
    tag: "img",
    prompt: "Google Images muốn hiểu nội dung tấm ảnh để xếp hạng tìm kiếm hình ảnh — nó đọc thuộc tính nào của <img>?",
    explain: "alt giúp cả SEO hình ảnh lẫn accessibility.",
  },
  // --- width / height (hay dùng) ---
  {
    attr: "width",
    tag: "img",
    prompt: "Khai báo BỀ NGANG 400px cho ảnh để trình duyệt giữ chỗ từ trước, tránh giật layout.",
    explain: "width (+ height) giúp giữ chỗ trước khi ảnh tải xong.",
  },
  {
    attr: "height",
    tag: "img",
    prompt: "Cùng với bề ngang, cần khai báo CHIỀU CAO của ảnh để trình duyệt tính được tỉ lệ khung.",
    explain: "height + width = trình duyệt biết tỉ lệ, chống Cumulative Layout Shift.",
  },
  {
    attr: "width",
    tag: "img",
    prompt: "Điểm Lighthouse trừ vì 'layout shift': nội dung nhảy khi ảnh tải xong. Cặp thuộc tính nào (gõ cái chỉ bề ngang) phải khai báo trên <img>?",
    explain: "Khai báo width + height là cách chuẩn chống nhảy layout.",
  },
  {
    attr: "height",
    tag: "img",
    prompt: "Ảnh logo cần render đúng 48px theo CHIỀU DỌC ngay từ HTML, không chờ CSS.",
    explain: 'height="48" — kích thước nội tại khai báo ngay trên thẻ.',
  },
  // --- loading (hay dùng) ---
  {
    attr: "loading",
    tag: "img",
    prompt: "Trang chủ có 50 ảnh sản phẩm — các ảnh dưới màn hình đầu chỉ nên tải khi người dùng cuộn gần đến (giá trị lazy).",
    explain: 'loading="lazy" hoãn tải ảnh ngoài màn hình — tăng tốc trang.',
  },
  {
    attr: "loading",
    tag: "img",
    prompt: "Trang tải chậm vì 100 ảnh trong danh sách tải cùng lúc ngay khi mở. Thuộc tính nào của <img> khắc phục mà không cần JavaScript?",
    explain: 'loading="lazy" là lazy-load có sẵn của trình duyệt, không cần thư viện.',
  },
  {
    attr: "loading",
    tag: "img",
    prompt: "Thuộc tính nào của <img> nhận hai giá trị lazy và eager, quyết định THỜI ĐIỂM ảnh được tải?",
    explain: "loading điều khiển thời điểm tải: eager (ngay) hoặc lazy (khi gần hiện).",
  },
  {
    attr: "loading",
    tag: "img",
    prompt: "Ảnh hero đầu trang bị web vital chê chậm vì lỡ đặt giá trị lazy — phải gỡ giá trị đó khỏi thuộc tính nào (ảnh đầu trang nên tải ngay)?",
    explain: "Ảnh trên màn hình đầu KHÔNG nên loading=\"lazy\" — nó cần hiện ngay.",
  },
  {
    attr: "loading",
    tag: "img",
    prompt: "Blog dài 30 ảnh minh họa: muốn tiết kiệm 4G cho người đọc chỉ xem nửa bài, mỗi <img> phía dưới thêm thuộc tính gì?",
    explain: 'loading="lazy" — ảnh chưa cuộn tới thì chưa tốn băng thông.',
  },
  // --- srcset / decoding (ít dùng) ---
  {
    attr: "srcset",
    tag: "img",
    prompt: "Điện thoại nên tải bản ảnh 480px, desktop bản 1080px — khai báo NHIỀU phiên bản ảnh trong thuộc tính nào?",
    explain: "srcset liệt kê các phiên bản ảnh theo độ rộng cho responsive.",
  },
  {
    attr: "srcset",
    tag: "img",
    prompt: "Màn hình Retina cần ảnh 2x sắc nét: <img src=\"logo.png\" ___=\"logo.png 1x, logo@2x.png 2x\">.",
    explain: "srcset với mô tả 1x/2x phục vụ màn hình mật độ cao.",
  },
  {
    attr: "decoding",
    tag: "img",
    prompt: "Tối ưu nâng cao: cho ảnh GIẢI MÃ ở luồng riêng để không chặn render trang (giá trị async).",
    explain: 'decoding="async" — trình duyệt giải mã ảnh không chặn vẽ trang.',
  },
  {
    attr: "decoding",
    tag: "img",
    prompt: "Thuộc tính nào của <img> nhận sync/async/auto, điều khiển cách trình duyệt GIẢI MÃ dữ liệu ảnh?",
    explain: "decoding — ít dùng, chỉ cần khi tinh chỉnh hiệu năng render.",
  },
  // ============ <video> / <audio> / <source> ============
  // --- controls (quan trọng nhất) ---
  {
    attr: "controls",
    tag: "video",
    prompt: "Video bài giảng nhúng đúng file nhưng học viên không thấy nút play/pause hay thanh âm lượng nào.",
    explain: "controls bật bộ điều khiển có sẵn của trình duyệt.",
  },
  {
    attr: "controls",
    tag: "audio",
    prompt: "Trang podcast cần trình phát có nút play, thanh tua và chỉnh âm lượng cho file tap-1.mp3.",
    explain: "controls trên <audio> hiện trình phát đầy đủ.",
  },
  {
    attr: "controls",
    tag: "video",
    prompt: "Khách hỏi: 'video xem được nhưng làm sao tạm dừng?' — dev quên một thuộc tính không có giá trị trên thẻ <video>.",
    explain: "Thiếu controls thì người xem không có nút điều khiển nào.",
  },
  {
    attr: "controls",
    tag: "video",
    prompt: "Video nền trang trí thì KHÔNG nên có, nhưng video nội dung chính BẮT BUỘC phải có thuộc tính nào để người xem chủ động?",
    explain: "controls — video nội dung cần; video nền trang trí thì bỏ.",
  },
  {
    attr: "controls",
    tag: "audio",
    prompt: "Thuộc tính boolean nào (không cần giá trị) khiến <audio> từ vô hình trở thành một trình phát nhìn thấy được?",
    explain: "<audio> không có controls thì không hiển thị gì trên trang.",
  },
  // --- autoplay / muted / loop (hay dùng) ---
  {
    attr: "autoplay",
    tag: "video",
    prompt: "Video nền ở hero section phải TỰ CHẠY ngay khi trang mở, không chờ ai bấm.",
    explain: "autoplay tự phát — trình duyệt chỉ cho phép khi kèm muted.",
  },
  {
    attr: "autoplay",
    tag: "video",
    prompt: "Thuộc tính nào khiến video chạy không cần bấm play — và bị trình duyệt CHẶN nếu video có tiếng?",
    explain: "autoplay bị chặn trừ khi video đã muted — chính sách mọi trình duyệt.",
  },
  {
    attr: "muted",
    tag: "video",
    prompt: "Video nền có autoplay nhưng không chạy trên Chrome. Phải thêm thuộc tính TẮT TIẾNG nào thì autoplay mới được phép?",
    explain: "muted là điều kiện để autoplay hoạt động.",
  },
  {
    attr: "muted",
    tag: "video",
    prompt: "Video quảng cáo phải mở KHÔNG có âm thanh để không làm phiền, người xem tự bật tiếng nếu muốn.",
    explain: "muted khởi động ở trạng thái tắt tiếng.",
  },
  {
    attr: "loop",
    tag: "video",
    prompt: "Đoạn phim nền 10 giây phải phát đi phát lại VÔ HẠN, hết là tự quay về đầu.",
    explain: "loop phát lặp vô hạn.",
  },
  {
    attr: "loop",
    tag: "audio",
    prompt: "Nhạc nền game web cần tự lặp lại từ đầu mỗi khi kết thúc bài.",
    explain: "loop trên <audio> phát lặp liên tục.",
  },
  {
    attr: "loop",
    tag: "video",
    prompt: "Animation logo dạng video cứ chạy hết 5 giây là đứng hình — thiếu thuộc tính boolean nào?",
    explain: "Không có loop, video dừng ở khung hình cuối.",
  },
  // --- poster (hay dùng) ---
  {
    attr: "poster",
    tag: "video",
    prompt: "Trước khi bấm phát, khung video đang đen sì — cần hiện ảnh bìa thumbnail đẹp thay vào đó.",
    explain: "poster là ảnh hiển thị trước khi video phát.",
  },
  {
    attr: "poster",
    tag: "video",
    prompt: "Danh sách khóa học hiện 12 video — mỗi video cần ảnh đại diện riêng dù chưa ai bấm play. Thuộc tính nào nhận đường dẫn ảnh?",
    explain: 'poster="bia.jpg" — ảnh bìa của video.',
  },
  {
    attr: "poster",
    tag: "video",
    prompt: "Thuộc tính nào của <video> nhận URL một file ẢNH (không phải file phim)?",
    explain: "poster là thuộc tính duy nhất của video trỏ đến ảnh tĩnh.",
  },
  {
    attr: "poster",
    tag: "video",
    prompt: "Khung hình đầu của file phim là màn đen fade-in rất xấu khi đứng yên — che nó bằng ảnh marketing chụp sẵn.",
    explain: "poster che khung hình đầu bằng ảnh tùy chọn.",
  },
  {
    attr: "poster",
    tag: "video",
    prompt: "Video chưa tải xong metadata trên mạng chậm thì người dùng vẫn phải thấy MỘT HÌNH GÌ ĐÓ ở vị trí video.",
    explain: "poster hiện ngay lập tức, không phụ thuộc file phim.",
  },
  // --- preload / playsinline (ít dùng) ---
  {
    attr: "preload",
    tag: "audio",
    prompt: "Trang có 50 tập podcast — đừng tải trước bất kỳ dữ liệu audio nào cho đến khi người nghe bấm play (giá trị none).",
    explain: 'preload="none" tiết kiệm băng thông khi có nhiều media.',
  },
  {
    attr: "preload",
    tag: "video",
    prompt: "Thuộc tính nào nhận none / metadata / auto, quyết định trình duyệt tải TRƯỚC bao nhiêu dữ liệu media?",
    explain: "preload điều khiển chiến lược tải trước của video/audio.",
  },
  {
    attr: "playsinline",
    tag: "video",
    prompt: "Trên iPhone, video nền cứ tự bung ra TOÀN MÀN HÌNH — cần thuộc tính nào để nó phát ngay trong trang?",
    explain: "playsinline cần cho video nền/inline trên iOS Safari.",
  },
  {
    attr: "playsinline",
    tag: "video",
    prompt: "Video autoplay muted loop chạy đẹp trên Android nhưng hỏng trải nghiệm trên iOS — bộ tứ thuộc tính còn thiếu cái nào?",
    explain: "autoplay + muted + loop + playsinline là combo chuẩn cho video nền.",
  },
  // --- source: src / type / media (src+type quan trọng nhất) ---
  {
    attr: "src",
    tag: "source",
    prompt: "Mỗi thẻ <source> bên trong <video> khai báo đường dẫn một file phim qua thuộc tính nào?",
    explain: "src của <source> trỏ đến từng phiên bản file.",
  },
  {
    attr: "type",
    tag: "source",
    prompt: "Trong <source>, khai báo định dạng MIME video/webm để trình duyệt BỎ QUA file nó không hỗ trợ mà không cần tải thử.",
    explain: 'type="video/webm" giúp trình duyệt chọn nguồn ngay từ HTML.',
  },
  {
    attr: "type",
    tag: "source",
    prompt: "Có 2 <source> mp4 và webm nhưng trình duyệt vẫn tải thử từng file gây chậm — mỗi source thiếu thuộc tính khai báo định dạng nào?",
    explain: "Thiếu type thì trình duyệt phải tải thử để biết có phát được không.",
  },
  {
    attr: "type",
    tag: "source",
    prompt: "Thuộc tính nào của <source> nhận giá trị dạng audio/mpeg, video/mp4 — tên loại nội dung chuẩn MIME?",
    explain: "type khai báo MIME type của nguồn media.",
  },
  {
    attr: "media",
    tag: "source",
    prompt: "Trong <picture>, bản ảnh ngang chỉ dùng cho màn hình rộng từ 800px: <source ___=\"(min-width: 800px)\">.",
    explain: "media đặt điều kiện màn hình cho từng nguồn trong <picture>.",
  },
  {
    attr: "media",
    tag: "source",
    prompt: "Thuộc tính nào của <source> nhận một media query y như trong CSS để chọn nguồn theo kích thước màn hình?",
    explain: "media — cú pháp giống @media của CSS.",
  },
  // ============ <form> ============
  // --- action (quan trọng nhất) ---
  {
    attr: "action",
    tag: "form",
    prompt: "Form liên hệ cần gửi dữ liệu đến địa chỉ /contact trên server khi khách bấm Gửi.",
    explain: "action là URL đích nhận dữ liệu form.",
  },
  {
    attr: "action",
    tag: "form",
    prompt: "Bấm Gửi xong trang chỉ tự tải lại, dữ liệu không đến server xử lý — form thiếu thuộc tính khai báo ĐỊA CHỈ ĐÍCH nào?",
    explain: "Bỏ trống action thì form gửi về chính trang hiện tại.",
  },
  {
    attr: "action",
    tag: "form",
    prompt: "Backend đổi endpoint xử lý đăng ký từ /signup sang /api/dang-ky — bạn phải sửa giá trị thuộc tính nào của <form>?",
    explain: "action chứa endpoint — đổi backend là đổi action.",
  },
  {
    attr: "action",
    tag: "form",
    prompt: "Thuộc tính nào của <form> giống vai trò href của <a>: nơi trình duyệt sẽ điều hướng đến (kèm dữ liệu) khi submit?",
    explain: "action với form ~ href với a: đích đến của hành động.",
  },
  {
    attr: "action",
    tag: "form",
    prompt: "Form tìm kiếm của Google có dạng <form ___=\"/search\" method=\"get\"> — điền tên thuộc tính.",
    explain: "action=\"/search\" — đích nhận query tìm kiếm.",
  },
  // --- method (quan trọng nhất) ---
  {
    attr: "method",
    tag: "form",
    prompt: "Mật khẩu khách hàng đang hiện NGAY TRÊN URL sau khi đăng nhập — phải đổi thuộc tính nào của form sang giá trị post?",
    explain: 'method="post" gửi dữ liệu trong body, không lộ trên URL.',
  },
  {
    attr: "method",
    tag: "form",
    prompt: "Form lọc sản phẩm nên để khách COPY được link kết quả gửi cho bạn bè — thuộc tính nào đặt giá trị get?",
    explain: 'method="get" gắn tham số lên URL — chia sẻ/bookmark được.',
  },
  {
    attr: "method",
    tag: "form",
    prompt: "Thuộc tính nào của <form> quyết định trình duyệt dùng HTTP GET hay POST khi gửi?",
    explain: "method chọn HTTP verb của lần submit.",
  },
  {
    attr: "method",
    tag: "form",
    prompt: "Quy tắc: form CHỈ ĐỌC dữ liệu (tìm kiếm, lọc) dùng get; form LÀM THAY ĐỔI dữ liệu (đặt hàng, xóa) dùng post. Đây là hai giá trị của thuộc tính nào?",
    explain: "method — get cho truy vấn, post cho thay đổi trạng thái.",
  },
  {
    attr: "method",
    tag: "form",
    prompt: "F5 sau khi đặt hàng làm đơn bị tạo HAI LẦN — một dấu hiệu form đang dùng sai giá trị của thuộc tính nào (đáng lẽ post + redirect)?",
    explain: "Hiểu method giúp xử lý đúng pattern POST-redirect-GET.",
  },
  // --- enctype (hay dùng) ---
  {
    attr: "enctype",
    tag: "form",
    prompt: "Form có ô upload ảnh đại diện nhưng server chỉ nhận được TÊN file, không nhận được nội dung file — form thiếu thuộc tính nào (giá trị multipart/form-data)?",
    explain: "Upload file bắt buộc enctype=\"multipart/form-data\".",
  },
  {
    attr: "enctype",
    tag: "form",
    prompt: "Thuộc tính nào của <form> quyết định CÁCH MÃ HÓA dữ liệu trước khi gửi (urlencoded vs multipart)?",
    explain: "enctype = encoding type của body form.",
  },
  {
    attr: "enctype",
    tag: "form",
    prompt: "<form method=\"post\" ___=\"multipart/form-data\"> là khuôn mẫu bắt buộc cho form chứa <input type=\"file\">.",
    explain: "enctype — thiếu nó file không được gửi kèm.",
  },
  {
    attr: "enctype",
    tag: "form",
    prompt: "Giá trị mặc định application/x-www-form-urlencoded thuộc về thuộc tính nào của form?",
    explain: "enctype mặc định là urlencoded — đủ cho form không có file.",
  },
  {
    attr: "enctype",
    tag: "form",
    prompt: "Form đăng CV (file PDF đính kèm) khác form đăng nhập ở một thuộc tính phải khai báo thêm — thuộc tính nào?",
    explain: "Có file đính kèm → thêm enctype=\"multipart/form-data\".",
  },
  // --- autocomplete (hay dùng) ---
  {
    attr: "autocomplete",
    tag: "form",
    prompt: "Form nội bộ nhập điểm thi không được để trình duyệt TỰ ĐIỀN dữ liệu của lần nhập trước (giá trị off).",
    explain: 'autocomplete="off" tắt tự điền cho cả form.',
  },
  {
    attr: "autocomplete",
    tag: "form",
    prompt: "Thuộc tính nào điều khiển tính năng trình duyệt gợi ý lại email/địa chỉ đã từng nhập?",
    explain: "autocomplete bật/tắt và định loại dữ liệu tự điền.",
  },
  {
    attr: "autocomplete",
    tag: "input",
    prompt: "Để trình quản lý mật khẩu hiểu ô này là 'mật khẩu mới' (gợi ý sinh mật khẩu mạnh), đặt thuộc tính nào thành new-password?",
    explain: 'autocomplete="new-password" giúp password manager xử lý đúng.',
  },
  {
    attr: "autocomplete",
    tag: "input",
    prompt: "Ô địa chỉ giao hàng muốn trình duyệt gợi ý đúng địa chỉ đã lưu: <input ___=\"street-address\">.",
    explain: "autocomplete có bộ giá trị chuẩn: email, tel, street-address...",
  },
  {
    attr: "autocomplete",
    tag: "form",
    prompt: "DevTools cảnh báo 'Input elements should have autocomplete attributes' — nó muốn bạn thêm thuộc tính nào?",
    explain: "Khai báo autocomplete đúng loại giúp UX và accessibility.",
  },
  // --- novalidate (ít dùng) ---
  {
    attr: "novalidate",
    tag: "form",
    prompt: "Team muốn TỰ kiểm tra dữ liệu hoàn toàn bằng JavaScript — tắt toàn bộ validation có sẵn của trình duyệt khi submit bằng thuộc tính nào trên <form>?",
    explain: "novalidate bỏ qua required/pattern/type khi submit.",
  },
  {
    attr: "novalidate",
    tag: "form",
    prompt: "Cần một nút 'Lưu nháp' gửi được form dù các ô required còn trống — một cách là đặt thuộc tính boolean nào lên form?",
    explain: "novalidate cho phép submit không qua kiểm tra (hoặc formnovalidate trên nút).",
  },
  // ============ <input> ============
  // --- type (quan trọng nhất) ---
  {
    attr: "type",
    tag: "input",
    prompt: "Ô mật khẩu đang hiện CHỮ RÕ thay vì dấu chấm tròn — sửa giá trị thuộc tính nào thành password?",
    explain: 'type="password" che ký tự nhập vào.',
  },
  {
    attr: "type",
    tag: "input",
    prompt: "Trên điện thoại, ô 'Số điện thoại' phải mở BÀN PHÍM SỐ thay vì bàn phím chữ — đổi thuộc tính nào (giá trị tel)?",
    explain: 'type="tel" / "number" đổi bàn phím trên mobile.',
  },
  {
    attr: "type",
    tag: "input",
    prompt: "Cùng một thẻ <input>, đổi MỘT thuộc tính là nó biến thành ô chọn ngày có lịch bật lên (giá trị date).",
    explain: 'type="date" — type quyết định toàn bộ giao diện và hành vi của input.',
  },
  {
    attr: "type",
    tag: "input",
    prompt: "Checkbox 'Tôi đồng ý điều khoản' là <input> với thuộc tính nào mang giá trị checkbox?",
    explain: 'type="checkbox" — một trong ~20 giá trị của type.',
  },
  {
    attr: "type",
    tag: "input",
    prompt: "Ô nhập email phải được trình duyệt TỰ kiểm tra định dạng có @ khi submit — nhờ giá trị email của thuộc tính nào?",
    explain: 'type="email" bật kiểm tra định dạng email tự động.',
  },
  // --- name (quan trọng nhất) ---
  {
    attr: "name",
    tag: "input",
    prompt: "Khách đã gõ số điện thoại nhưng server nhận request KHÔNG có trường đó — ô nhập thiếu thuộc tính nào?",
    explain: "Thiếu name thì giá trị không được gửi — lỗi rất hay gặp.",
  },
  {
    attr: "name",
    tag: "input",
    prompt: "Server đọc dữ liệu qua khóa 'email' trong body request — khóa đó được đặt bởi thuộc tính nào của ô nhập?",
    explain: "name là KHÓA của cặp khóa=giá trị gửi lên server.",
  },
  {
    attr: "name",
    tag: "input",
    prompt: "Ba radio 'S', 'M', 'L' phải CÙNG MỘT NHÓM để chỉ chọn được một — chúng phải có chung giá trị của thuộc tính nào?",
    explain: "Radio cùng name = cùng nhóm, chọn cái này bỏ cái kia.",
  },
  {
    attr: "name",
    tag: "input",
    prompt: "URL sau khi tìm kiếm là /search?q=giay — chữ 'q' đến từ thuộc tính nào của ô tìm kiếm?",
    explain: "Tham số trên URL (GET) lấy tên từ name của input.",
  },
  {
    attr: "name",
    tag: "input",
    prompt: "Phân biệt: id để CSS/label trỏ tới, còn thuộc tính nào để SERVER nhận diện trường dữ liệu khi submit?",
    explain: "id phục vụ phía trình duyệt; name phục vụ dữ liệu gửi đi.",
  },
  // --- value (hay dùng) ---
  {
    attr: "value",
    tag: "input",
    prompt: "Form 'Sửa hồ sơ' phải ĐIỀN SẴN tên cũ 'Minh Anh' vào ô nhập khi trang mở.",
    explain: "value đặt giá trị có sẵn của ô.",
  },
  {
    attr: "value",
    tag: "input",
    prompt: "Radio 'Giao hàng nhanh' khi được chọn phải gửi mã 'express' lên server — mã đó khai báo trong thuộc tính nào?",
    explain: "Với radio/checkbox, value là giá trị gửi đi khi được chọn.",
  },
  {
    attr: "value",
    tag: "input",
    prompt: "Ô ngày hẹn mặc định là hôm nay: <input type=\"date\" ___=\"2026-06-11\">.",
    explain: "value điền sẵn — với date dùng định dạng YYYY-MM-DD.",
  },
  {
    attr: "value",
    tag: "input",
    prompt: "JavaScript đọc nội dung người dùng vừa gõ trong ô qua thuộc tính DOM nào (cùng tên với thuộc tính HTML)?",
    explain: "input.value — đọc/ghi giá trị hiện tại của ô.",
  },
  {
    attr: "value",
    tag: "input",
    prompt: "Checkbox không khai báo gì sẽ gửi 'on' — muốn server nhận 'dong-y' thì đặt thuộc tính nào?",
    explain: 'value="dong-y" thay giá trị mặc định "on" của checkbox.',
  },
  // --- placeholder (hay dùng) ---
  {
    attr: "placeholder",
    tag: "input",
    prompt: "Trong ô email trống cần dòng chữ MỜ 'ten@email.com' làm mẫu, gõ vào là biến mất.",
    explain: "placeholder là gợi ý hiển thị khi ô trống.",
  },
  {
    attr: "placeholder",
    tag: "input",
    prompt: "Ô tìm kiếm cần gợi ý 'Tìm giày, áo, phụ kiện...' bên trong chính ô đó thay vì label bên ngoài.",
    explain: "placeholder gợi ý ngay trong ô nhập.",
  },
  {
    attr: "placeholder",
    tag: "input",
    prompt: "Designer yêu cầu ô số điện thoại hiện mẫu '090 123 4567' màu xám nhạt — dùng thuộc tính nào?",
    explain: "placeholder hiện mẫu định dạng mong muốn.",
  },
  {
    attr: "placeholder",
    tag: "input",
    prompt: "Thuộc tính nào KHÔNG thay thế được <label> vì chữ biến mất ngay khi người dùng bắt đầu gõ?",
    explain: "placeholder chỉ là gợi ý — vẫn cần label cho accessibility.",
  },
  {
    attr: "placeholder",
    tag: "textarea",
    prompt: "Ô góp ý nhiều dòng đang trống trơn — thêm dòng mờ 'Chia sẻ trải nghiệm của bạn...' bằng thuộc tính nào?",
    explain: "placeholder dùng được cả với <textarea>.",
  },
  // --- required (hay dùng) ---
  {
    attr: "required",
    tag: "input",
    prompt: "Khách bấm Đăng ký khi ô email còn TRỐNG — trình duyệt phải chặn lại và báo ngay tại ô, không cần JavaScript.",
    explain: "required bắt buộc nhập, trình duyệt tự kiểm tra.",
  },
  {
    attr: "required",
    tag: "input",
    prompt: "Bong bóng 'Please fill out this field' của trình duyệt xuất hiện nhờ thuộc tính boolean nào?",
    explain: "Thông báo đó là validation mặc định của required.",
  },
  {
    attr: "required",
    tag: "select",
    prompt: "Dropdown 'Tỉnh/Thành' không được để ở lựa chọn trống khi submit — thêm thuộc tính nào vào <select>?",
    explain: "required hoạt động với select khi option đầu có value=\"\".",
  },
  {
    attr: "required",
    tag: "input",
    prompt: "Trong form eKYC, trường 'Số CCCD' là BẮT BUỘC về nghiệp vụ — phản ánh điều đó ngay trên HTML bằng thuộc tính nào?",
    explain: "required thể hiện ràng buộc bắt buộc ngay ở markup.",
  },
  {
    attr: "required",
    tag: "input",
    prompt: "Checkbox 'Tôi đồng ý điều khoản' phải được TICK thì form mới gửi được — thuộc tính nào ép điều đó không cần JS?",
    explain: "required trên checkbox bắt buộc phải tick mới submit được.",
  },
  // --- disabled / readonly (hay dùng) ---
  {
    attr: "disabled",
    tag: "input",
    prompt: "Ô 'Mã giới thiệu' phải MỜ ĐI, không gõ được và KHÔNG gửi giá trị khi khách chưa bật công tắc 'Tôi có mã'.",
    explain: "disabled khóa hoàn toàn và loại giá trị khỏi dữ liệu gửi đi.",
  },
  {
    attr: "disabled",
    tag: "input",
    prompt: "Khác với readonly (vẫn gửi giá trị), thuộc tính nào khiến trường bị LOẠI hẳn khỏi dữ liệu submit?",
    explain: "disabled — giá trị không được gửi; readonly thì vẫn gửi.",
  },
  {
    attr: "disabled",
    tag: "input",
    prompt: "Trong lúc chờ server trả kết quả, mọi ô nhập phải tạm khóa để khách không sửa giữa chừng — thuộc tính boolean nào?",
    explain: "disabled dùng khi trường tạm thời không được phép tương tác.",
  },
  {
    attr: "readonly",
    tag: "input",
    prompt: "Ô 'Mã đơn hàng' do hệ thống sinh: khách XEM và COPY được, không sửa được, nhưng giá trị VẪN gửi kèm form.",
    explain: "readonly chỉ đọc nhưng vẫn submit (khác disabled).",
  },
  {
    attr: "readonly",
    tag: "input",
    prompt: "Ô tổng tiền do JS tự tính — người dùng không được gõ đè nhưng server vẫn cần nhận giá trị. Dùng disabled hay thuộc tính nào?",
    explain: "readonly là lựa chọn đúng: khóa sửa nhưng vẫn gửi dữ liệu.",
  },
  // --- checked (hay dùng) ---
  {
    attr: "checked",
    tag: "input",
    prompt: "Checkbox 'Nhận email khuyến mãi' phải được TICK SẴN ngay khi trang đăng ký mở ra.",
    explain: "checked đặt trạng thái chọn mặc định.",
  },
  {
    attr: "checked",
    tag: "input",
    prompt: "Trong nhóm radio phương thức thanh toán, 'COD' là lựa chọn mặc định — thẻ input của COD mang thuộc tính boolean nào?",
    explain: "checked trên một radio của nhóm = lựa chọn ban đầu.",
  },
  {
    attr: "checked",
    tag: "input",
    prompt: "Form 'Sửa cài đặt' phải phản ánh đúng cài đặt cũ: các công tắc khách ĐÃ BẬT trước đó render kèm thuộc tính nào?",
    explain: "Server render checked theo dữ liệu đã lưu.",
  },
  {
    attr: "checked",
    tag: "input",
    prompt: "JS kiểm tra checkbox có đang được tick không qua thuộc tính cùng tên: if (dongY.___) { ... }.",
    explain: "element.checked trả về true/false theo trạng thái hiện tại.",
  },
  {
    attr: "checked",
    tag: "input",
    prompt: "Khác với value (giá trị gửi đi), thuộc tính boolean nào quyết định checkbox CÓ ĐƯỢC CHỌN sẵn hay không?",
    explain: "checked = trạng thái chọn; value = giá trị gửi khi được chọn.",
  },
  // --- min/max/step/pattern/maxlength/minlength/accept/multiple/autofocus (ít dùng) ---
  {
    attr: "min",
    tag: "input",
    prompt: "Ô số lượng không được nhập DƯỚI 1 — trình duyệt tự chặn khi submit.",
    explain: 'min="1" — giới hạn dưới cho input number/date.',
  },
  {
    attr: "min",
    tag: "input",
    prompt: "Ô chọn ngày giao hàng không cho chọn ngày TRONG QUÁ KHỨ: <input type=\"date\" ___=\"2026-06-11\">.",
    explain: "min hoạt động cả với date — chặn ngày trước mốc.",
  },
  {
    attr: "max",
    tag: "input",
    prompt: "Mỗi khách chỉ mua tối đa 5 suất giảm giá — ô số lượng chặn giá trị VƯỢT 5 bằng thuộc tính nào?",
    explain: 'max="5" — giới hạn trên.',
  },
  {
    attr: "max",
    tag: "input",
    prompt: "Ô năm sinh không nhận giá trị lớn hơn 2026 — thuộc tính nào trên input number?",
    explain: "max chặn giá trị vượt trần khi submit.",
  },
  {
    attr: "step",
    tag: "input",
    prompt: "Ô số tiền nạp nhảy theo BỘI SỐ 10.000đ mỗi lần bấm mũi tên tăng/giảm.",
    explain: 'step="10000" — bước nhảy của input number.',
  },
  {
    attr: "step",
    tag: "input",
    prompt: "Input number báo lỗi khi nhập 2.5 vì mặc định chỉ nhận số nguyên — cho phép số lẻ bằng cách đặt thuộc tính nào thành 0.1 (hoặc any)?",
    explain: 'step="any" / "0.1" cho phép giá trị thập phân.',
  },
  {
    attr: "pattern",
    tag: "input",
    prompt: "Ô mã bưu điện phải khớp biểu thức chính quy [0-9]{6} — trình duyệt tự kiểm tra khi submit.",
    explain: "pattern kiểm tra định dạng bằng regex.",
  },
  {
    attr: "pattern",
    tag: "input",
    prompt: "Tên đăng nhập chỉ cho chữ thường và số: thuộc tính nào nhận giá trị [a-z0-9]+ để trình duyệt tự bắt lỗi?",
    explain: "pattern + title (giải thích) = validation regex không cần JS.",
  },
  {
    attr: "maxlength",
    tag: "input",
    prompt: "Ô 'Tên hiển thị' KHÔNG CHO GÕ quá 20 ký tự — bàn phím dừng nhận từ ký tự 21.",
    explain: "maxlength chặn nhập vượt giới hạn ngay khi gõ.",
  },
  {
    attr: "maxlength",
    tag: "textarea",
    prompt: "Ô bình luận giới hạn 500 ký tự kiểu Twitter — thuộc tính nào trên <textarea>?",
    explain: "maxlength dùng cho cả input lẫn textarea.",
  },
  {
    attr: "minlength",
    tag: "input",
    prompt: "Mật khẩu phải DÀI TỐI THIỂU 8 ký tự — trình duyệt từ chối submit nếu ngắn hơn.",
    explain: 'minlength="8" — độ dài tối thiểu.',
  },
  {
    attr: "minlength",
    tag: "input",
    prompt: "Khác maxlength (chặn khi gõ), thuộc tính nào chỉ bắt lỗi LÚC SUBMIT nếu nhập quá ngắn?",
    explain: "minlength kiểm tra khi submit, không chặn lúc gõ.",
  },
  {
    attr: "accept",
    tag: "input",
    prompt: "Hộp chọn file ảnh đại diện chỉ nên liệt kê file ẢNH, ẩn các file khác: <input type=\"file\" ___=\"image/*\">.",
    explain: 'accept="image/*" lọc loại file trong hộp chọn.',
  },
  {
    attr: "accept",
    tag: "input",
    prompt: "Form nộp CV chỉ nhận PDF — thuộc tính nào của input file đặt giá trị .pdf?",
    explain: 'accept=".pdf" giới hạn định dạng được chọn.',
  },
  {
    attr: "multiple",
    tag: "input",
    prompt: "Khung upload cho phép chọn NHIỀU ảnh cùng lúc trong một lần duyệt file.",
    explain: "multiple cho phép chọn nhiều file.",
  },
  {
    attr: "multiple",
    tag: "input",
    prompt: "Ô nhập email người nhận chấp nhận NHIỀU địa chỉ cách nhau dấu phẩy: <input type=\"email\" ___>.",
    explain: "multiple trên type=email cho phép nhập nhiều email.",
  },
  {
    attr: "autofocus",
    tag: "input",
    prompt: "Mở trang tìm kiếm là con trỏ NẰM SẴN trong ô tìm kiếm, gõ được ngay không cần bấm chuột.",
    explain: "autofocus tự focus khi trang tải — mỗi trang chỉ một phần tử.",
  },
  {
    attr: "autofocus",
    tag: "input",
    prompt: "Trang đăng nhập chuyên nghiệp: vừa mở là gõ được email luôn. Thuộc tính boolean nào trên ô đầu tiên?",
    explain: "autofocus đặt focus ban đầu vào ô quan trọng nhất.",
  },
  // ============ <label> ============
  {
    attr: "for",
    tag: "label",
    prompt: "Bấm chữ 'Số điện thoại' mà con trỏ KHÔNG nhảy vào ô nhập bên cạnh — label thiếu thuộc tính nào trỏ đến id của ô?",
    explain: 'for="id-ô-nhập" liên kết label với input.',
  },
  {
    attr: "for",
    tag: "label",
    prompt: "Checkbox bé tí khó bấm trên điện thoại — muốn bấm cả dòng chữ 'Ghi nhớ đăng nhập' cũng tick được thì label cần thuộc tính nào?",
    explain: "for mở rộng vùng bấm của checkbox/radio sang nhãn.",
  },
  {
    attr: "for",
    tag: "label",
    prompt: "Máy đọc màn hình đọc 'edit text' vô nghĩa thay vì 'Mật khẩu' khi focus vào ô — vì label chưa nối với input qua thuộc tính nào?",
    explain: "for giúp máy đọc màn hình đọc đúng nhãn của trường.",
  },
  {
    attr: "for",
    tag: "label",
    prompt: "<label ___=\"email\">Email</label> <input id=\"email\"> — điền tên thuộc tính tạo liên kết giữa hai thẻ.",
    explain: "Giá trị của for phải TRÙNG id của ô nhập.",
  },
  {
    attr: "for",
    tag: "label",
    prompt: "Có 2 cách nối label với input: bọc input vào trong label, hoặc dùng cặp thuộc tính nào + id?",
    explain: "for + id là cách nối khi label và input tách rời nhau.",
  },
  // ============ <button> ============
  // --- type (quan trọng nhất) ---
  {
    attr: "type",
    tag: "button",
    prompt: "Nút 'Hiện mật khẩu' chỉ chạy JavaScript nhưng cứ bấm là FORM BỊ GỬI — phải khai báo rõ thuộc tính nào với giá trị button?",
    explain: 'Trong form, <button> mặc định là submit — phải ghi type="button".',
  },
  {
    attr: "type",
    tag: "button",
    prompt: "Nút 'Đặt hàng' phải kích hoạt validation và gửi form — giá trị submit thuộc về thuộc tính nào?",
    explain: 'type="submit" — nút gửi form chính thức.',
  },
  {
    attr: "type",
    tag: "button",
    prompt: "Nút 'Nhập lại' xóa toàn bộ dữ liệu form về mặc định nhờ giá trị reset của thuộc tính nào?",
    explain: 'type="reset" — ít dùng nhưng là giá trị thứ ba của type.',
  },
  {
    attr: "type",
    tag: "button",
    prompt: "Code review nhắc: 'mọi <button> trong form PHẢI khai báo rõ ràng một thuộc tính để tránh submit ngoài ý muốn' — thuộc tính nào?",
    explain: "Luôn ghi rõ type cho button trong form là best practice.",
  },
  {
    attr: "type",
    tag: "button",
    prompt: "Ba giá trị submit / button / reset cùng thuộc về thuộc tính nào của thẻ <button>?",
    explain: "type quyết định hành vi của nút.",
  },
  // --- disabled (hay dùng) ---
  {
    attr: "disabled",
    tag: "button",
    prompt: "Sau khi bấm 'Thanh toán', nút phải MỜ ĐI và bấm không ăn nữa để tránh tạo 2 đơn hàng.",
    explain: "disabled chống double-submit khi đang xử lý.",
  },
  {
    attr: "disabled",
    tag: "button",
    prompt: "Nút 'Tiếp tục' chỉ sáng lên khi khách đã tick điều khoản — trước đó nó mang thuộc tính boolean nào?",
    explain: "disabled theo điều kiện là pattern UX phổ biến.",
  },
  {
    attr: "disabled",
    tag: "button",
    prompt: "Nút bị thuộc tính nào thì không nhận click, không focus được bằng Tab và thường được CSS làm mờ?",
    explain: "disabled vô hiệu hóa hoàn toàn tương tác của nút.",
  },
  // --- name/value, formaction (ít dùng) ---
  {
    attr: "value",
    tag: "button",
    prompt: "Một form, hai nút submit 'Lưu nháp' và 'Đăng bài' — server biết nút nào được bấm nhờ name kèm thuộc tính nào (draft/publish)?",
    explain: "name+value của nút được bấm sẽ gửi kèm form.",
  },
  {
    attr: "formaction",
    tag: "button",
    prompt: "Nút 'Xóa vĩnh viễn' trong form phải gửi đến /delete thay vì action chung — thuộc tính nào GHI ĐÈ action riêng cho nút?",
    explain: "formaction trên button ghi đè action của form.",
  },
  {
    attr: "formaction",
    tag: "button",
    prompt: "Cùng một form: nút A gửi đến /luu, nút B gửi đến /gui-duyet. Mỗi nút khai báo đích riêng bằng thuộc tính nào?",
    explain: "formaction cho phép nhiều đích submit trong một form.",
  },
  // ============ <textarea> ============
  {
    attr: "rows",
    tag: "textarea",
    prompt: "Ô góp ý phải CAO sẵn 5 dòng khi trang mở, không phải 2 dòng lùn mặc định.",
    explain: 'rows="5" đặt chiều cao mặc định theo số dòng.',
  },
  {
    attr: "rows",
    tag: "textarea",
    prompt: "Thuộc tính nào của <textarea> nhận một CON SỐ và quyết định chiều cao ban đầu (đếm theo dòng chữ)?",
    explain: "rows — số dòng hiển thị ban đầu.",
  },
  {
    attr: "rows",
    tag: "textarea",
    prompt: "Ô 'Ghi chú đơn hàng' chỉ cần thấp 2 dòng cho gọn, ô 'Nội dung bài viết' cần 15 dòng — cả hai chỉnh qua thuộc tính nào?",
    explain: "rows điều chỉnh chiều cao từng textarea theo mục đích.",
  },
  {
    attr: "cols",
    tag: "textarea",
    prompt: "Cặp với rows, thuộc tính nào đặt BỀ NGANG textarea theo số ký tự mỗi dòng (ngày nay hay thay bằng CSS width)?",
    explain: "cols — bề ngang tính theo cột ký tự.",
  },
  {
    attr: "name",
    tag: "textarea",
    prompt: "Nội dung góp ý khách gõ trong <textarea> không xuất hiện trong dữ liệu server nhận — thẻ thiếu thuộc tính nào?",
    explain: "textarea cũng cần name như input để dữ liệu được gửi.",
  },
  {
    attr: "wrap",
    tag: "textarea",
    prompt: "Thuộc tính nào của <textarea> (giá trị soft/hard) quyết định ký tự xuống dòng có được GỬI KÈM theo dữ liệu không?",
    explain: 'wrap="hard" gửi cả ngắt dòng hiển thị; soft (mặc định) thì không.',
  },
  // ============ <select> ============
  {
    attr: "name",
    tag: "select",
    prompt: "Khách chọn size M trong dropdown nhưng server không nhận được trường size nào — thẻ <select> thiếu thuộc tính gì?",
    explain: "select cần name để giá trị option được gửi đi.",
  },
  {
    attr: "multiple",
    tag: "select",
    prompt: "Hộp chọn 'Kỹ năng' cho ứng viên chọn NHIỀU mục cùng lúc (giữ Ctrl) thay vì chỉ một.",
    explain: "multiple biến select thành hộp chọn nhiều giá trị.",
  },
  {
    attr: "multiple",
    tag: "select",
    prompt: "Thuộc tính boolean nào khiến <select> đổi từ dropdown thả xuống thành DANH SÁCH mở sẵn chọn được nhiều dòng?",
    explain: "multiple đổi cả giao diện lẫn hành vi chọn của select.",
  },
  {
    attr: "size",
    tag: "select",
    prompt: "Danh sách 63 tỉnh thành muốn hiện sẵn 8 DÒNG dạng hộp cuộn thay vì menu thả xuống — thuộc tính nào nhận số 8?",
    explain: 'size="8" hiện sẵn N dòng của select.',
  },
  {
    attr: "size",
    tag: "select",
    prompt: "Cùng tên với thuộc tính kích cỡ của input, thuộc tính nào trên <select> quyết định SỐ DÒNG nhìn thấy không cần mở?",
    explain: "size — số dòng hiển thị của hộp chọn.",
  },
  // ============ <option> ============
  {
    attr: "value",
    tag: "option",
    prompt: "Dropdown hiển thị 'TP. Hồ Chí Minh' nhưng hệ thống cần nhận mã ngắn 'hcm' — mã đó đặt ở thuộc tính nào của option?",
    explain: "value của option là giá trị gửi đi, khác chữ hiển thị.",
  },
  {
    attr: "value",
    tag: "option",
    prompt: "Không khai báo thuộc tính nào thì option sẽ gửi NGUYÊN VĂN chữ hiển thị ('Thành phố Hồ Chí Minh') lên server?",
    explain: "Thiếu value, trình duyệt gửi text content của option.",
  },
  {
    attr: "value",
    tag: "option",
    prompt: "API yêu cầu mã quốc gia ISO ('vn', 'us'...) trong khi dropdown hiện tên đầy đủ — ánh xạ này khai báo qua thuộc tính nào?",
    explain: "value tách 'giá trị máy đọc' khỏi 'chữ người đọc'.",
  },
  {
    attr: "value",
    tag: "option",
    prompt: "Option placeholder 'Chọn size...' phải có thuộc tính nào đặt giá trị RỖNG để required của select hoạt động?",
    explain: 'value="" + required trên select = bắt buộc chọn thật.',
  },
  {
    attr: "value",
    tag: "option",
    prompt: "JS đọc selectEl.___ trả về 'm' khi khách đang chọn dòng 'Size M' — thuộc tính nào của option cung cấp giá trị đó?",
    explain: "select.value trả về value của option đang chọn.",
  },
  {
    attr: "selected",
    tag: "option",
    prompt: "Dropdown quốc gia phải MỞ SẴN ở 'Việt Nam' thay vì dòng đầu danh sách.",
    explain: "selected đặt option mặc định.",
  },
  {
    attr: "selected",
    tag: "option",
    prompt: "Form 'Sửa địa chỉ' render dropdown tỉnh thành đúng tỉnh khách đã lưu — option của tỉnh đó mang thuộc tính boolean nào?",
    explain: "Server render selected theo dữ liệu cũ.",
  },
  {
    attr: "selected",
    tag: "option",
    prompt: "Khác checked của checkbox/radio, thuộc tính nào đánh dấu lựa chọn mặc định bên trong <select>?",
    explain: "selected là 'checked' của option.",
  },
  {
    attr: "disabled",
    tag: "option",
    prompt: "Dòng đầu 'Chọn tỉnh thành...' chỉ làm placeholder — khách KHÔNG được chọn lại nó sau khi đã chọn tỉnh thật.",
    explain: "disabled + selected + value=\"\" là combo placeholder của select.",
  },
  {
    attr: "disabled",
    tag: "option",
    prompt: "Size 'XL' tạm hết hàng: vẫn hiện trong dropdown nhưng MỜ ĐI và không chọn được — thuộc tính nào trên option đó?",
    explain: "disabled trên option khóa riêng lựa chọn đó.",
  },
  // ============ <fieldset> ============
  {
    attr: "disabled",
    tag: "fieldset",
    prompt: "Khách chọn 'Nhận tại cửa hàng' — CẢ NHÓM 4 ô địa chỉ giao hàng phải khóa cùng lúc bằng MỘT thuộc tính duy nhất trên thẻ bao.",
    explain: "disabled trên fieldset vô hiệu mọi trường bên trong.",
  },
  {
    attr: "disabled",
    tag: "fieldset",
    prompt: "Thay vì viết disabled cho từng input một, đặt thuộc tính đó ở thẻ nào thì cả nhóm trường bị khóa? (gõ tên thuộc tính)",
    explain: "Một disabled trên fieldset = khóa cả nhóm — đỡ lặp code.",
  },
  {
    attr: "disabled",
    tag: "fieldset",
    prompt: "Phần 'Thông tin xuất hóa đơn' chỉ mở khi khách bật công tắc 'Cần hóa đơn' — JS chỉ cần gỡ MỘT thuộc tính khỏi fieldset.",
    explain: "Toggle disabled của fieldset là cách bật/tắt cả nhóm gọn nhất.",
  },
  {
    attr: "form",
    tag: "fieldset",
    prompt: "Fieldset nằm NGOÀI thẻ <form> (do layout) nhưng vẫn phải thuộc về form có id=\"thanh-toan\" — thuộc tính nào tạo liên kết đó?",
    explain: 'form="id-form" nối phần tử rời với form theo id.',
  },
  // ============ Danh sách & bảng (Đợt B sẽ mở rộng lên 5 câu/thuộc tính) ============
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
  // ============ Cấu trúc & ngữ nghĩa (Đợt B sẽ mở rộng) ============
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
    explain: "rel khai báo quan hệ: stylesheet, icon, preload...",
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
    explain: "src trỏ đến file JavaScript ngoài.",
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
    explain: "aria-label đặt tên cho vùng — cần khi có nhiều <nav>.",
  },
  // ============ Thuộc tính chung (Đợt B sẽ mở rộng) ============
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
    explain: "data-* (vd data-product-id) — dữ liệu tùy ý cho JS, đọc qua element.dataset.",
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
