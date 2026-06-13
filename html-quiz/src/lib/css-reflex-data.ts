// Dữ liệu Phản xạ CSS: tình huống thực tế → người chơi gõ TÊN THUỘC TÍNH CSS.
// Cố ý KHÔNG nhắc tên thuộc tính trong đề — luyện "nhìn nhu cầu, nghĩ ra thuộc tính".
// answer = tên thuộc tính; accept = các tên thay thế cũng chấp nhận.

export type CssReflexQuestion = {
  answer: string;
  accept?: string[];
  prompt: string;
  explain: string;
};

export const CSS_REFLEX_QUESTIONS: CssReflexQuestion[] = [
  // ===== MÀU & CHỮ =====
  {
    answer: "color",
    prompt: "Đoạn cảnh báo cần chữ chuyển sang màu đỏ để gây chú ý.",
    explain: "color đặt màu chữ của phần tử (kế thừa xuống con).",
  },
  {
    answer: "background-color",
    accept: ["background"],
    prompt: "Khối thông báo thành công cần nền xanh lá nhạt phía sau chữ.",
    explain: "background-color tô màu nền của hộp (hết content + padding).",
  },
  {
    answer: "font-size",
    prompt: "Chú thích dưới ảnh cần chữ nhỏ hơn nội dung chính.",
    explain: "font-size đặt cỡ chữ — nên dùng rem để tôn trọng cài đặt người dùng.",
  },
  {
    answer: "font-weight",
    prompt: "Giá tiền sản phẩm cần in đậm để nổi bật trong thẻ.",
    explain: "font-weight chỉnh độ đậm: normal=400, bold=700.",
  },
  {
    answer: "font-family",
    prompt: "Khối hiển thị code cần đổi sang kiểu chữ đều nhau từng ký tự (monospace).",
    explain: "font-family chọn kiểu chữ, nên kèm font dự phòng và từ khóa chung.",
  },
  {
    answer: "font-style",
    prompt: "Câu trích dẫn sách cần hiển thị chữ nghiêng.",
    explain: "font-style: italic cho chữ nghiêng.",
  },
  {
    answer: "line-height",
    prompt: "Đoạn văn dày đặc, các dòng dính sát nhau khó đọc — cần giãn khoảng cách giữa các dòng.",
    explain: "line-height đặt khoảng cách dòng; giá trị không đơn vị (1.6) là tốt nhất.",
  },
  {
    answer: "text-align",
    prompt: "Tiêu đề khu vực cần được căn vào chính giữa khối.",
    explain: "text-align căn nội dung inline: left/center/right/justify.",
  },
  {
    answer: "text-decoration",
    prompt: "Link trong menu vẫn còn gạch chân mặc định, cần bỏ đi cho gọn.",
    explain: "text-decoration: none bỏ gạch chân link.",
  },
  {
    answer: "text-transform",
    prompt: "Nhãn chuyên mục cần hiển thị TOÀN HOA mà không sửa nội dung HTML.",
    explain: "text-transform: uppercase đổi hiển thị thành chữ hoa.",
  },
  {
    answer: "letter-spacing",
    prompt: "Nhãn chữ hoa đứng sít nhau khó đọc — cần giãn khoảng cách giữa các ký tự.",
    explain: "letter-spacing giãn cách ký tự, nên dùng em để theo cỡ chữ.",
  },

  // ===== NỀN & TRANG TRÍ =====
  {
    answer: "background-image",
    accept: ["background"],
    prompt: "Hero section cần đặt một tấm ảnh làm nền phía sau chữ.",
    explain: "background-image: url(...) đặt ảnh nền.",
  },
  {
    answer: "background-size",
    prompt: "Ảnh nền của banner cần phủ kín toàn bộ khung dù bị cắt bớt.",
    explain: "background-size: cover phủ kín, contain hiện trọn.",
  },
  {
    answer: "background-position",
    prompt: "Ảnh nền chân dung bị cắt mất phần đầu — cần neo ảnh ưu tiên giữ phần trên.",
    explain: "background-position quyết định phần nào của ảnh được thấy (vd: top).",
  },
  {
    answer: "opacity",
    prompt: "Nút bị khóa cần làm mờ toàn bộ để báo hiệu không khả dụng.",
    explain: "opacity (0→1) chỉnh độ mờ của cả phần tử kể cả chữ.",
  },
  {
    answer: "box-shadow",
    prompt: "Thẻ sản phẩm cần một lớp bóng đổ mềm phía dưới để trông như nổi lên.",
    explain: "box-shadow: x y blur màu tạo bóng quanh hộp.",
  },
  {
    answer: "text-shadow",
    prompt: "Chữ trắng trên ảnh nền sáng bị chìm — cần thêm bóng tối quanh nét chữ.",
    explain: "text-shadow đổ bóng theo nét chữ, cứu chữ trên nền phức tạp.",
  },
  {
    answer: "border-radius",
    prompt: "Ảnh đại diện vuông cần bo thành hình tròn.",
    explain: "border-radius bo góc; 50% biến hình vuông thành tròn.",
  },
  {
    answer: "border",
    prompt: "Thẻ nội dung cần một đường viền mảnh 1px màu xám quanh nó.",
    explain: "border: độ-dày kiểu màu (vd 1px solid #ddd).",
  },
  {
    answer: "outline",
    prompt: "Ô input khi được chọn cần một viền nổi bật KHÔNG làm xô lệch layout.",
    explain: "outline vẽ đè ra ngoài, không chiếm chỗ — hợp cho viền focus.",
  },
  {
    answer: "cursor",
    prompt: "Một div đóng vai nút bấm cần con trỏ chuột đổi thành bàn tay khi rê vào.",
    explain: "cursor: pointer báo hiệu vùng bấm được.",
  },
  {
    answer: "list-style",
    accept: ["list-style-type"],
    prompt: "Menu ngang dùng thẻ ul vẫn còn dấu chấm đầu dòng, cần bỏ đi.",
    explain: "list-style: none bỏ dấu đầu dòng của danh sách.",
  },
  {
    answer: "overflow",
    prompt: "Khung chat chiều cao cố định cần hiện thanh cuộn khi tin nhắn dài ra.",
    explain: "overflow (auto/scroll/hidden) xử lý nội dung tràn khung.",
  },
  {
    answer: "filter",
    prompt: "Logo đối tác cần hiển thị đen trắng, hover mới hiện màu.",
    explain: "filter: grayscale(100%) cho ảnh đen trắng.",
  },
  {
    answer: "object-fit",
    prompt: "Ảnh thumbnail bị méo khi ép cùng kích thước — cần giữ tỷ lệ và phủ kín khung.",
    explain: "object-fit: cover giữ tỷ lệ ảnh <img>, phủ kín, cắt thừa.",
  },
  {
    answer: "aspect-ratio",
    prompt: "Khung video cần luôn giữ tỷ lệ 16:9 dù bề rộng thay đổi.",
    explain: "aspect-ratio: 16/9 khóa tỷ lệ khung hình.",
  },

  // ===== HỘP & KÍCH THƯỚC =====
  {
    answer: "padding",
    prompt: "Chữ trong khung dính sát viền — cần thêm khoảng đệm bên trong.",
    explain: "padding là khoảng đệm bên trong viền, đẩy nội dung ra xa mép.",
  },
  {
    answer: "margin",
    prompt: "Hai thẻ sản phẩm dính nhau — cần tạo khoảng cách bên ngoài giữa chúng.",
    explain: "margin là khoảng trống bên ngoài viền; margin: 0 auto căn giữa khối.",
  },
  {
    answer: "width",
    prompt: "Thanh bên cần cố định chiều rộng đúng 300px.",
    explain: "width đặt chiều rộng phần tử.",
  },
  {
    answer: "height",
    prompt: "Hero section cần cao đúng bằng một màn hình khi mở trang.",
    explain: "height đặt chiều cao (vd 100vh cho full màn hình).",
  },
  {
    answer: "max-width",
    prompt: "Khung nội dung cần co giãn nhưng không bao giờ rộng quá 1200px.",
    explain: "max-width đặt trần chiều rộng — co được, không vượt mốc.",
  },
  {
    answer: "box-sizing",
    prompt: "Muốn chiều rộng khai báo là kích thước THẬT đã gồm cả padding và border.",
    explain: "box-sizing: border-box để 'width là width'.",
  },
  {
    answer: "gap",
    prompt: "Các con trong flex/grid cần khoảng cách đều nhau mà không phải gắn margin từng cái.",
    explain: "gap đặt khoảng cách giữa các con (flex/grid), gọn hơn margin.",
  },

  // ===== BỐ CỤC =====
  {
    answer: "display",
    accept: ["display: flex", "flex"],
    prompt: "Một khung chứa cần xếp các con thành hàng linh hoạt theo một chiều.",
    explain: "display: flex bật Flexbox cho khung chứa.",
  },
  {
    answer: "flex-direction",
    prompt: "Đang ở flex, cần đổi cho các con xếp thành cột dọc thay vì hàng ngang.",
    explain: "flex-direction: column xếp con theo cột.",
  },
  {
    answer: "justify-content",
    prompt: "Trong flex, cần đẩy logo về trái và menu về phải (hai cụm ra hai đầu).",
    explain: "justify-content căn theo trục chính; space-between đẩy ra hai đầu.",
  },
  {
    answer: "align-items",
    prompt: "Trong flex hàng ngang, cần căn các con vào giữa theo chiều dọc.",
    explain: "align-items căn theo trục phụ; center căn giữa dọc.",
  },
  {
    answer: "flex-wrap",
    prompt: "Lưới thẻ flex cần tự xuống dòng khi màn hình hẹp thay vì co ép một hàng.",
    explain: "flex-wrap: wrap cho phép các con xuống dòng.",
  },
  {
    answer: "flex-grow",
    accept: ["flex"],
    prompt: "Vùng nội dung cạnh sidebar cần giãn ra chiếm hết khoảng trống còn lại.",
    explain: "flex-grow: 1 cho con chiếm phần dư của trục chính.",
  },
  {
    answer: "grid-template-columns",
    prompt: "Một lưới cần chia thành 3 cột bằng nhau.",
    explain: "grid-template-columns: repeat(3, 1fr) tạo 3 cột đều.",
  },
  {
    answer: "z-index",
    prompt: "Lớp phủ modal cần nổi lên trên mọi nội dung khác khi đè nhau.",
    explain: "z-index đặt thứ tự xếp chồng (chỉ áp cho phần tử positioned).",
  },

  // ===== HIỆU ỨNG =====
  {
    answer: "transition",
    prompt: "Nút cần đổi màu MƯỢT trong 0.3s khi rê chuột thay vì đổi đột ngột.",
    explain: "transition làm mượt thay đổi giữa hai trạng thái.",
  },
  {
    answer: "transform",
    accept: ["transform: scale", "scale"],
    prompt: "Ảnh cần phóng to nhẹ lên 1.05 lần khi hover mà không đẩy các phần tử bên cạnh.",
    explain: "transform: scale/translate/rotate biến đổi phần tử, chạy mượt trên GPU.",
  },
  {
    answer: "animation",
    prompt: "Icon loading cần tự xoay tròn lặp vô hạn.",
    explain: "animation gắn @keyframes vào phần tử (vd: xoay 1s linear infinite).",
  },
  {
    answer: "scroll-behavior",
    prompt: "Trang cần cuộn mượt khi bấm link nhảy tới một mục #anchor thay vì nhảy phắt.",
    explain: "scroll-behavior: smooth (đặt trên html) cho cuộn mượt.",
  },

  // ===== NỀN TẢNG =====
  {
    answer: "transition-duration",
    accept: ["transition"],
    prompt: "Cần đặt riêng thời lượng một hiệu ứng chuyển động kéo dài bao lâu.",
    explain: "transition-duration đặt thời lượng (hoặc viết gộp trong transition).",
  },
  {
    answer: "visibility",
    prompt: "Cần ẩn một phần tử NHƯNG vẫn giữ nguyên chỗ trống của nó trong layout.",
    explain: "visibility: hidden ẩn mà vẫn chiếm chỗ (khác display: none).",
  },
];
