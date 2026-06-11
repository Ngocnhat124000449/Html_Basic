import "dotenv/config";
import { PrismaClient, QuestionType, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
const T = QuestionType;

type SeedQuestion = {
  tier: number;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  requirements?: object[];
  starterCode?: string;
  answer?: string;
};

type SeedTag = {
  name: string;
  topic: string;
  description: string;
  questions: SeedQuestion[];
};

const tags: SeedTag[] = [
  // ===== VĂN BẢN =====
  {
    name: "h1",
    topic: "Văn bản",
    description: "Tiêu đề cấp 1 — tiêu đề quan trọng nhất của trang",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang chủ cần dòng tiêu đề lớn nhất hiển thị tên cửa hàng 'ShopVN'. Thẻ nào phù hợp nhất?",
        options: ["<title>", "<h1>", "<header>", "<strong>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao mỗi trang chỉ nên có một thẻ <h1>?",
        options: [
          "Có 2 thẻ <h1> thì trình duyệt báo lỗi cú pháp",
          "<h1> thứ hai sẽ không được hiển thị",
          "Công cụ tìm kiếm dựa vào <h1> để xác định chủ đề chính — nhiều <h1> làm loãng tín hiệu",
          "HTML5 cấm dùng quá một <h1>",
        ],
        correctIndex: 2,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tạo tiêu đề quan trọng nhất của trang:",
        starterCode: "<____>Chào mừng đến ShopVN</____>",
        answer: "h1",
      },
    ],
  },
  {
    name: "p",
    topic: "Văn bản",
    description: "Đoạn văn bản",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bạn dán 3 đoạn giới thiệu công ty, mỗi đoạn cần là một khối văn bản riêng có khoảng cách trên dưới. Bọc mỗi đoạn bằng thẻ nào?",
        options: ["<span>", "<br>", "<p>", "<b>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Điều gì xảy ra nếu bạn lồng <p> bên trong <p>?",
        options: [
          "Hiển thị lồng nhau bình thường",
          "Trình duyệt tự đóng <p> đầu — <p> không được phép lồng trong <p>",
          "Trang trắng do lỗi cú pháp",
          "Đoạn bên trong tự thành chữ nghiêng",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ p chứa nội dung: Xin chào",
        requirements: [
          { type: "tagName", value: "p" },
          { type: "text", tag: "p", index: 0, value: "Xin chào" },
        ],
      },
    ],
  },
  {
    name: "strong",
    topic: "Văn bản",
    description: "Nhấn mạnh nội dung quan trọng (hiển thị đậm)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Câu 'Không hoàn tiền sau 30 ngày' trong điều khoản cần in đậm VÀ được máy đọc màn hình nhấn mạnh là nội dung quan trọng. Thẻ nào đúng nhất?",
        options: ["<b>", "<mark>", "<em>", "<strong>"],
        correctIndex: 3,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<strong> khác <b> ở điểm nào?",
        options: ["Không khác gì", "<strong> mang ngữ nghĩa 'quan trọng', <b> chỉ là kiểu hiển thị", "<strong> đậm hơn <b>", "<b> không còn dùng được"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nhấn mạnh nội dung quan trọng:",
        starterCode: "<____>Cảnh báo: mật khẩu sắp hết hạn</____>",
        answer: "strong",
      },
    ],
  },
  {
    name: "em",
    topic: "Văn bản",
    description: "Nhấn mạnh ngữ điệu (hiển thị nghiêng)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong câu 'Sản phẩm này rất đáng mua', bạn muốn từ 'rất' được nhấn ngữ điệu (đọc màn hình nhấn giọng, hiển thị nghiêng). Dùng thẻ nào?",
        options: ["<em>", "<i>", "<u>", "<small>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<em> khác <i> ở điểm nào?",
        options: ["<em> nghiêng nhiều hơn", "Không khác gì", "<i> bị cấm trong HTML5", "<em> mang ngữ nghĩa nhấn mạnh, <i> chỉ là kiểu hiển thị"],
        correctIndex: 3,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nhấn mạnh ngữ điệu (nghiêng có ngữ nghĩa):",
        starterCode: "<____>rất</____> đáng mua",
        answer: "em",
      },
    ],
  },
  {
    name: "br",
    topic: "Văn bản",
    description: "Ngắt dòng — thẻ rỗng, không có thẻ đóng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Địa chỉ công ty gồm 3 dòng phải xuống dòng đúng vị trí nhưng vẫn nằm trong cùng một đoạn <p>. Dùng thẻ nào?",
        options: ["<hr>", "<br>", "Tách thành 3 thẻ <p>", "Thêm nhiều khoảng trắng"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Phát biểu nào đúng về <br>?",
        options: ["Phải viết </br> để đóng", "Là thẻ rỗng (void element), không có thẻ đóng", "Chỉ dùng được trong <p>", "Tự động lặp lại 2 lần"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ ngắt dòng giữa hai câu:",
        starterCode: "Dòng một<____>Dòng hai",
        answer: "br",
      },
    ],
  },
  // ===== LIÊN KẾT & MEDIA =====
  {
    name: "a",
    topic: "Liên kết & Media",
    description: "Liên kết (anchor) đến trang hoặc vị trí khác",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Chữ 'Xem chính sách đổi trả' phải bấm được và chuyển người dùng sang trang khác. Thẻ nào đúng?",
        options: ["<a>", "<button>", "<link>", "<nav>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Khi nào dùng <a> và khi nào dùng <button>?",
        options: [
          "Thẻ nào cũng được, chỉ khác giao diện",
          "<a> điều hướng sang URL khác; <button> thực hiện hành động (submit, chạy JS)",
          "<button> mới hơn nên thay thế <a>",
          "<a> chỉ dùng cho liên kết ra trang ngoài",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ liên kết đến https://shopvn.com với chữ 'Trang chủ', mở trong tab mới",
        requirements: [
          { type: "tagName", value: "a" },
          { type: "attr", name: "href", value: "https://shopvn.com" },
          { type: "attr", name: "target", value: "_blank" },
          { type: "text", tag: "a", index: 0, value: "Trang chủ" },
        ],
      },
    ],
  },
  {
    name: "img",
    topic: "Liên kết & Media",
    description: "Hiển thị hình ảnh",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Cần hiển thị ảnh cat.jpg kèm mô tả cho người dùng đọc màn hình. Cách viết nào đúng?",
        options: [
          "<img href=\"cat.jpg\" title=\"Mèo con\">",
          "<image src=\"cat.jpg\" alt=\"Mèo con\">",
          "<img src=\"cat.jpg\" alt=\"Mèo con\">",
          "<picture src=\"cat.jpg\" desc=\"Mèo con\">",
        ],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<img loading=\"lazy\"> nghĩa là gì?",
        options: ["Ảnh tải chậm hơn bình thường", "Ảnh chỉ được tải khi người dùng cuộn gần đến", "Ảnh mờ dần khi xuất hiện", "Ảnh chất lượng thấp"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FIX_BUG,
        prompt: "Code dưới đây thiếu nguồn ảnh. Gõ lại bản đúng: hiển thị cat.jpg, mô tả 'Mèo con', lazy loading.",
        starterCode: "<img alt=\"cat.jpg\">",
        requirements: [
          { type: "tagName", value: "img" },
          { type: "attr", name: "src", value: "cat.jpg" },
          { type: "attr", name: "alt", value: "Mèo con" },
          { type: "attr", name: "loading", value: "lazy" },
        ],
      },
    ],
  },
  // ===== DANH SÁCH =====
  {
    name: "ul",
    topic: "Danh sách",
    description: "Danh sách không thứ tự (chấm tròn)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Liệt kê các tính năng sản phẩm — thứ tự không quan trọng, mỗi dòng một dấu chấm tròn. Thẻ bao ngoài là gì?",
        options: ["<ol>", "<ul>", "<dl>", "<li>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao menu điều hướng thường viết bằng <ul> dù không hiển thị dấu chấm tròn?",
        options: [
          "Vì <ul> tải nhanh hơn <div>",
          "Vì menu là 'danh sách các mục ngang hàng' về ngữ nghĩa — dấu chấm ẩn đi bằng CSS",
          "Vì trình duyệt bắt buộc menu phải là <ul>",
          "Không có lý do, chỉ là thói quen cũ",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_STRUCTURE,
        prompt: "Viết danh sách không thứ tự có 2 mục: 'Táo' và 'Cam'",
        requirements: [
          { type: "tagName", value: "ul" },
          { type: "contains", parent: "ul", child: "li", count: 2 },
          { type: "text", tag: "li", index: 0, value: "Táo" },
          { type: "text", tag: "li", index: 1, value: "Cam" },
        ],
      },
    ],
  },
  {
    name: "ol",
    topic: "Danh sách",
    description: "Danh sách có thứ tự (đánh số)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Công thức nấu ăn có 5 bước phải làm đúng trình tự, cần đánh số tự động 1 → 5. Thẻ bao ngoài là gì?",
        options: ["<ul>", "<dl>", "<ol>", "<table>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<ol start=\"5\"> nghĩa là gì?",
        options: ["Danh sách có tối đa 5 mục", "Bắt đầu đánh số từ 5", "Lặp lại 5 lần", "Thụt lề 5 khoảng trắng"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_STRUCTURE,
        prompt: "Viết danh sách có thứ tự gồm 2 bước: 'Đăng ký' rồi 'Đăng nhập'",
        requirements: [
          { type: "tagName", value: "ol" },
          { type: "contains", parent: "ol", child: "li", count: 2 },
          { type: "text", tag: "li", index: 0, value: "Đăng ký" },
          { type: "text", tag: "li", index: 1, value: "Đăng nhập" },
        ],
      },
    ],
  },
  {
    name: "li",
    topic: "Danh sách",
    description: "Một mục trong danh sách",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong danh sách mua sắm, mỗi món hàng 'Táo', 'Cam', 'Sữa' nằm trong thẻ nào?",
        options: ["<item>", "<dd>", "<td>", "<li>"],
        correctIndex: 3,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Code <ul><p>Táo</p></ul> có vấn đề gì?",
        options: [
          "Không có vấn đề gì",
          "Con trực tiếp của <ul> phải là <li> — <p> đặt trong <li> nếu cần",
          "<p> làm <ul> mất dấu chấm tròn",
          "Thiếu thẻ đóng cho <p>",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tạo một mục danh sách:",
        starterCode: "<ul><____>Mục 1</____></ul>",
        answer: "li",
      },
    ],
  },
  // ===== BẢNG =====
  {
    name: "table",
    topic: "Bảng",
    description: "Bảng dữ liệu",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trường hợp nào NÊN dùng <table>?",
        options: [
          "Dàn bố cục trang thành 2 cột trái phải",
          "Bảng điểm: mỗi học sinh một hàng, mỗi môn một cột",
          "Căn các card sản phẩm thẳng hàng",
          "Hiển thị album ảnh dạng lưới",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thứ tự lồng thẻ đúng trong bảng là gì?",
        options: ["table > td > tr", "table > tr > td", "tr > table > td", "td > tr > table"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_STRUCTURE,
        prompt: "Viết bảng có 1 hàng chứa 2 ô dữ liệu: 'A' và 'B'",
        requirements: [
          { type: "tagName", value: "table" },
          { type: "contains", parent: "table", child: "tr", count: 1 },
          { type: "contains", parent: "tr", child: "td", count: 2 },
          { type: "text", tag: "td", index: 0, value: "A" },
          { type: "text", tag: "td", index: 1, value: "B" },
        ],
      },
    ],
  },
  {
    name: "tr",
    topic: "Bảng",
    description: "Một hàng của bảng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong bảng điểm, toàn bộ dữ liệu của học sinh 'An' (tên, điểm toán, điểm văn) nằm trên cùng một hàng. Hàng đó là thẻ gì?",
        options: ["<td>", "<tr>", "<th>", "<tbody>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<tr> chứa trực tiếp những thẻ nào?",
        options: ["<td> và <th>", "<table>", "<li>", "<col> và <row>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tạo một hàng trong bảng:",
        starterCode: "<table><____><td>1</td></____></table>",
        answer: "tr",
      },
    ],
  },
  {
    name: "td",
    topic: "Bảng",
    description: "Ô dữ liệu trong bảng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Ô chứa giá trị '99.000đ' tại giao điểm hàng 'Áo thun' và cột 'Giá' là thẻ gì?",
        options: ["<th>", "<cell>", "<td>", "<tr>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<td colspan=\"2\"> nghĩa là gì?",
        options: ["Ô có 2 màu", "Ô trải rộng qua 2 cột", "Ô chứa tối đa 2 ký tự", "Ô lặp lại 2 lần"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết ô dữ liệu chứa chữ 'Tổng', trải rộng qua 2 cột",
        requirements: [
          { type: "tagName", value: "td" },
          { type: "attr", name: "colspan", value: "2" },
          { type: "text", tag: "td", index: 0, value: "Tổng" },
        ],
      },
    ],
  },
  {
    name: "th",
    topic: "Bảng",
    description: "Ô tiêu đề của bảng (đậm, căn giữa)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Hàng đầu của bảng chứa nhãn cột 'Tên sản phẩm', 'Giá' — cần đậm, căn giữa và mang ngữ nghĩa tiêu đề. Mỗi ô nhãn dùng thẻ gì?",
        options: ["<td>", "<th>", "<thead>", "<caption>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<th> khác <td> ở điểm nào?",
        options: ["Không khác gì", "<th> là ô tiêu đề có ngữ nghĩa header, mặc định đậm và căn giữa", "<th> rộng gấp đôi", "<th> không được chứa chữ"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tạo ô tiêu đề trong hàng đầu của bảng:",
        starterCode: "<tr><____>Tên sản phẩm</____></tr>",
        answer: "th",
      },
    ],
  },
  // ===== FORM =====
  {
    name: "form",
    topic: "Form",
    description: "Biểu mẫu thu thập dữ liệu người dùng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang liên hệ có các ô nhập và nút gửi. Phải bao tất cả trong thẻ nào để nhấn Enter tự gửi và dữ liệu được chuyển đến server?",
        options: ["<fieldset>", "<div>", "<form>", "<section>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Form tìm kiếm nên dùng method=\"get\", form đăng nhập nên dùng method=\"post\". Vì sao?",
        options: [
          "GET gắn dữ liệu lên URL (chia sẻ được link tìm kiếm); POST gửi trong body nên mật khẩu không lộ trên URL",
          "GET nhanh hơn POST nên ưu tiên khi cần tốc độ",
          "POST là chuẩn mới thay thế GET",
          "Không có khác biệt, chọn cái nào cũng được",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ form gửi dữ liệu đến /search bằng phương thức GET (thẻ mở và đóng, không cần nội dung)",
        requirements: [
          { type: "tagName", value: "form" },
          { type: "attr", name: "action", value: "/search" },
          { type: "attr", name: "method", value: "get" },
        ],
      },
    ],
  },
  {
    name: "input",
    topic: "Form",
    description: "Ô nhập liệu",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Cần ô đánh dấu ✓ 'Tôi đồng ý điều khoản'. Cách viết nào đúng?",
        options: [
          "<checkbox name=\"agree\">",
          "<input type=\"checkbox\" name=\"agree\">",
          "<button type=\"checkbox\">",
          "<check name=\"agree\">",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Ô nhập có required và type=\"email\" — người dùng gõ 'abc' rồi submit. Điều gì xảy ra?",
        options: [
          "Form vẫn gửi đi, server tự xử lý",
          "Trình duyệt chặn submit và báo sai định dạng email ngay tại ô nhập",
          "Trang tự tải lại và xóa dữ liệu",
          "Chỉ báo lỗi nếu có JavaScript kiểm tra",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ input: kiểu email, bắt buộc nhập, có gợi ý 'ten@email.com'",
        requirements: [
          { type: "tagName", value: "input" },
          { type: "attr", name: "type", value: "email" },
          { type: "attr", name: "required" },
          { type: "attr", name: "placeholder", value: "ten@email.com" },
        ],
      },
    ],
  },
  {
    name: "label",
    topic: "Form",
    description: "Nhãn mô tả cho ô nhập liệu",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bấm vào chữ 'Số điện thoại' thì con trỏ phải tự nhảy vào ô nhập bên cạnh. Chữ đó cần bọc bằng thẻ gì?",
        options: ["<span>", "<legend>", "<label>", "<caption>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute for của <label> trỏ đến gì?",
        options: ["name của form", "id của ô nhập tương ứng", "class của ô nhập", "href của liên kết"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FIX_BUG,
        prompt: "Nhãn dưới đây chưa liên kết đúng với ô nhập có id=\"email\". Gõ lại bản đúng (giữ chữ 'Email'):",
        starterCode: "<label name=\"email\">Email</label>",
        requirements: [
          { type: "tagName", value: "label" },
          { type: "attr", name: "for", value: "email" },
          { type: "text", tag: "label", index: 0, value: "Email" },
        ],
      },
    ],
  },
  {
    name: "button",
    topic: "Form",
    description: "Nút bấm",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Cuối form đăng ký cần nút 'Tạo tài khoản' để gửi form. Cách viết nào đúng?",
        options: [
          "<a class=\"btn\">Tạo tài khoản</a>",
          "<div onclick=\"submit()\">Tạo tài khoản</div>",
          "<input type=\"text\" value=\"Tạo tài khoản\">",
          "<button type=\"submit\">Tạo tài khoản</button>",
        ],
        correctIndex: 3,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nút 'Hiện mật khẩu' trong form chỉ chạy JavaScript nhưng cứ bấm là form bị gửi đi. Vì sao?",
        options: [
          "Do lỗi trình duyệt",
          "<button> trong form mặc định là type=\"submit\" — phải ghi rõ type=\"button\"",
          "JavaScript tự động gửi form",
          "Vì nút đặt sai vị trí trong form",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết nút submit với chữ 'Gửi'",
        requirements: [
          { type: "tagName", value: "button" },
          { type: "attr", name: "type", value: "submit" },
          { type: "text", tag: "button", index: 0, value: "Gửi" },
        ],
      },
    ],
  },
  {
    name: "textarea",
    topic: "Form",
    description: "Ô nhập văn bản nhiều dòng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Ô 'Nội dung góp ý' cần cho khách viết nhiều dòng và kéo giãn được kích thước. Thẻ nào phù hợp?",
        options: ["<input type=\"text\">", "<textarea>", "<input rows=\"5\">", "<p contenteditable>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<textarea> khác <input type=\"text\"> ở điểm nào?",
        options: ["Không khác gì", "<textarea> cho nhập nhiều dòng và co giãn được kích thước", "<textarea> chỉ nhận số", "<textarea> không dùng được trong form"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết ô nhập nhiều dòng có name là 'note' và 4 hàng (rows)",
        requirements: [
          { type: "tagName", value: "textarea" },
          { type: "attr", name: "name", value: "note" },
          { type: "attr", name: "rows", value: "4" },
        ],
      },
    ],
  },
  {
    name: "select",
    topic: "Form",
    description: "Danh sách chọn thả xuống (dropdown)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trường 'Tỉnh/Thành phố' cho khách chọn 1 trong 63 lựa chọn từ hộp thả xuống. Thẻ bao ngoài là gì?",
        options: ["<select>", "<dropdown>", "<ul>", "<input type=\"list\">"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Mỗi lựa chọn bên trong <select> nằm trong thẻ nào?",
        options: ["<li>", "<item>", "<option>", "<choice>"],
        correctIndex: 2,
      },
      {
        tier: 3, type: T.WRITE_STRUCTURE,
        prompt: "Viết dropdown có name là 'size' với 2 lựa chọn: 'S' và 'M'",
        requirements: [
          { type: "tagName", value: "select" },
          { type: "attr", name: "name", value: "size" },
          { type: "contains", parent: "select", child: "option", count: 2 },
          { type: "text", tag: "option", index: 0, value: "S" },
          { type: "text", tag: "option", index: 1, value: "M" },
        ],
      },
    ],
  },
  // ===== VĂN BẢN (mở rộng) =====
  {
    name: "h2",
    topic: "Văn bản",
    description: "Tiêu đề cấp 2 — mục lớn trong trang",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bài viết đã có tiêu đề chính <h1>, giờ cần tiêu đề cho từng mục lớn: 'Nguyên liệu', 'Cách làm'. Thẻ nào đúng phân cấp?",
        options: ["<h2>", "<h1>", "<h4>", "<strong>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Tiêu đề cấp thấp hơn (nhỏ hơn) <h2> là thẻ nào?",
        options: ["<h1>", "<h3>", "<h0>", "<title>"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tiêu đề cấp 2:",
        starterCode: "<____>Sản phẩm nổi bật</____>",
        answer: "h2",
      },
    ],
  },
  {
    name: "h3",
    topic: "Văn bản",
    description: "Tiêu đề cấp 3 — mục con trong một mục lớn",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong mục <h2>Điện thoại</h2>, cần tiêu đề con cho từng hãng 'iPhone', 'Samsung'. Dùng cấp tiêu đề nào để không nhảy cóc?",
        options: ["<h6>", "<h2>", "<h3>", "<h5>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Trong một mục bắt đầu bằng <h2>, tiêu đề con bên trong nên dùng thẻ nào?",
        options: ["<h1>", "<h2>", "<h3>", "<h6>"],
        correctIndex: 2,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tiêu đề cấp 3:",
        starterCode: "<h2>Điện thoại</h2>\n<____>iPhone</____>",
        answer: "h3",
      },
    ],
  },
  {
    name: "span",
    topic: "Văn bản",
    description: "Vùng inline không ngữ nghĩa — thường dùng để áp CSS",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bạn cần tô đỏ đúng MỘT TỪ ở giữa câu bằng CSS mà không làm câu xuống dòng hay tách khối. Bọc từ đó bằng thẻ gì?",
        options: ["<div>", "<span>", "<p>", "<section>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<span> khác <div> ở điểm nào?",
        options: ["Không khác gì", "<span> là phần tử inline, <div> là phần tử khối (block)", "<span> chỉ dùng trong bảng", "<div> không nhận CSS"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ span có class là 'highlight' chứa chữ 'Giảm giá'",
        requirements: [
          { type: "tagName", value: "span" },
          { type: "attr", name: "class", value: "highlight" },
          { type: "text", tag: "span", index: 0, value: "Giảm giá" },
        ],
      },
    ],
  },
  {
    name: "blockquote",
    topic: "Văn bản",
    description: "Trích dẫn dài, hiển thị thành khối riêng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bài báo trích nguyên văn một đoạn phát biểu dài của chuyên gia, hiển thị thành khối thụt lề riêng. Thẻ nào đúng ngữ nghĩa?",
        options: ["<pre>", "<em>", "<blockquote>", "<aside>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute cite của <blockquote> chứa gì?",
        options: ["Tên tác giả", "URL nguồn của trích dẫn", "Màu chữ trích dẫn", "Số trang sách"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ trích dẫn khối:",
        starterCode: "<____>Học, học nữa, học mãi</____>",
        answer: "blockquote",
      },
    ],
  },
  {
    name: "code",
    topic: "Văn bản",
    description: "Hiển thị một đoạn mã nguồn inline",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong câu 'Chạy lệnh npm install để cài đặt', tên lệnh cần hiển thị font monospace và mang ngữ nghĩa 'đây là mã'. Bọc bằng thẻ gì?",
        options: ["<code>", "<pre>", "<script>", "<tt>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<code> khác <pre> ở điểm nào?",
        options: ["Không khác gì", "<code> là inline, <pre> giữ nguyên khoảng trắng và xuống dòng", "<code> tự tô màu cú pháp", "<pre> chỉ dùng cho Python"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ code chứa lệnh: npm install",
        requirements: [
          { type: "tagName", value: "code" },
          { type: "text", tag: "code", index: 0, value: "npm install" },
        ],
      },
    ],
  },
  {
    name: "pre",
    topic: "Văn bản",
    description: "Văn bản giữ nguyên định dạng (khoảng trắng, xuống dòng)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bạn dán khối code 10 dòng có thụt lề nhưng trình duyệt gộp hết thành một dòng. Thẻ nào giữ nguyên từng khoảng trắng và xuống dòng?",
        options: ["<p>", "<pre>", "<code>", "<div>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Để hiển thị một khối code nhiều dòng, cách phổ biến là gì?",
        options: ["<pre> bọc ngoài <code>", "<code> bọc ngoài <pre>", "Chỉ dùng <p>", "Dùng <textarea>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ giữ nguyên định dạng văn bản:",
        starterCode: "<____>\n  if (x > 0) {\n    console.log(x);\n  }\n</____>",
        answer: "pre",
      },
    ],
  },
  {
    name: "hr",
    topic: "Văn bản",
    description: "Đường kẻ ngang phân tách chủ đề — thẻ rỗng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Giữa phần giới thiệu và phần bình luận cần một đường kẻ ngang thể hiện 'chuyển chủ đề'. Thẻ nào đúng?",
        options: ["<br>", "<line>", "<hr>", "<div class=\"line\">"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Phát biểu nào đúng về <hr>?",
        options: ["Phải viết </hr> để đóng", "Là thẻ rỗng (void element), không có thẻ đóng", "Chỉ dùng trong bảng", "Tạo đường kẻ dọc"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tạo đường kẻ ngang giữa hai phần:",
        starterCode: "<p>Phần 1</p>\n<____>\n<p>Phần 2</p>",
        answer: "hr",
      },
    ],
  },
  {
    name: "mark",
    topic: "Văn bản",
    description: "Đánh dấu / làm nổi bật văn bản (nền vàng)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang kết quả tìm kiếm muốn từ khóa người dùng vừa gõ được tô nền vàng trong từng kết quả. Thẻ nào đúng ngữ nghĩa?",
        options: ["<strong>", "<mark>", "<u>", "<span style=\"background:yellow\">"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<mark> khác <strong> ở điểm nào?",
        options: [
          "Không khác gì, chỉ khác màu hiển thị",
          "<mark> = 'liên quan/nổi bật trong ngữ cảnh hiện tại' (nền vàng); <strong> = 'quan trọng' (đậm)",
          "<mark> đậm hơn <strong>",
          "<strong> đã bị loại bỏ, nên dùng <mark>",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ làm nổi bật từ khóa:",
        starterCode: "Kết quả cho <____>HTML</____>",
        answer: "mark",
      },
    ],
  },
  {
    name: "sub",
    topic: "Văn bản",
    description: "Chỉ số dưới (subscript) — như H₂O",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang hóa học cần viết công thức nước: chữ H, số 2 nằm thấp xuống dưới, rồi chữ O. Số 2 bọc bằng thẻ gì?",
        options: ["<sup>", "<small>", "<sub>", "<low>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Cần viết CO₂ và x² trong cùng một bài. Cặp thẻ nào đúng thứ tự?",
        options: [
          "<sub> cho CO₂, <sup> cho x²",
          "<sup> cho CO₂, <sub> cho x²",
          "Cả hai đều dùng <sub>",
          "Cả hai đều dùng <small>",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tạo chỉ số dưới:",
        starterCode: "H<____>2</____>O",
        answer: "sub",
      },
    ],
  },
  {
    name: "sup",
    topic: "Văn bản",
    description: "Chỉ số trên (superscript) — như x²",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bài toán cần hiển thị 'x bình phương': chữ x rồi số 2 nhỏ nằm cao phía trên. Số 2 bọc bằng thẻ gì?",
        options: ["<sup>", "<sub>", "<top>", "<b>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Ngoài số mũ toán học, <sup> còn thường dùng cho trường hợp nào?",
        options: [
          "Ký hiệu ™ ® và số chú thích cuối trang (footnote¹)",
          "Công thức hóa học như H₂O",
          "Đơn vị tiền tệ",
          "Chữ viết hoa đầu câu",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tạo chỉ số trên:",
        starterCode: "x<____>2</____> + 1",
        answer: "sup",
      },
    ],
  },
  // ===== LIÊN KẾT & MEDIA (mở rộng) =====
  {
    name: "video",
    topic: "Liên kết & Media",
    description: "Nhúng và phát video",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang khóa học cần phát đoạn phim bài giảng từ file intro.mp4 ngay trong trang. Thẻ nào đúng?",
        options: ["<img>", "<video>", "<media>", "<movie>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Video nhúng đúng file nhưng người xem không thấy nút play/pause nào. Thiếu gì?",
        options: [
          "Attribute controls trên thẻ <video>",
          "Attribute type=\"video/mp4\"",
          "Thẻ <button> bên trong video",
          "File JavaScript điều khiển",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ video phát file intro.mp4, có nút điều khiển (controls)",
        requirements: [
          { type: "tagName", value: "video" },
          { type: "attr", name: "src", value: "intro.mp4" },
          { type: "attr", name: "controls" },
        ],
      },
    ],
  },
  {
    name: "audio",
    topic: "Liên kết & Media",
    description: "Nhúng và phát âm thanh",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang podcast cần trình phát cho file tap-1.mp3 với nút play và thanh âm lượng. Thẻ nào đúng?",
        options: ["<sound controls>", "<audio controls>", "<video controls>", "<player>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute loop của <audio> có tác dụng gì?",
        options: ["Phát lặp lại từ đầu khi kết thúc", "Phát ngẫu nhiên", "Tua nhanh gấp đôi", "Tải lại trang"],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ audio phát file nhac.mp3, có nút điều khiển (controls)",
        requirements: [
          { type: "tagName", value: "audio" },
          { type: "attr", name: "src", value: "nhac.mp3" },
          { type: "attr", name: "controls" },
        ],
      },
    ],
  },
  {
    name: "source",
    topic: "Liên kết & Media",
    description: "Khai báo nguồn media thay thế cho video/audio/picture",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Video của bạn có 2 phiên bản .webm và .mp4. Bên trong <video>, mỗi phiên bản khai báo bằng thẻ nào để trình duyệt tự chọn?",
        options: ["<src>", "<file>", "<source>", "<track>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Khi <video> chứa nhiều <source>, trình duyệt làm gì?",
        options: ["Phát tất cả cùng lúc", "Chọn nguồn đầu tiên mà nó hỗ trợ", "Báo lỗi", "Chỉ phát nguồn cuối cùng"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ khai báo nguồn media:",
        starterCode: '<video controls>\n  <____ src="clip.webm" type="video/webm">\n</video>',
        answer: "source",
      },
    ],
  },
  {
    name: "figure",
    topic: "Liên kết & Media",
    description: "Khối minh họa độc lập (ảnh, biểu đồ, code...)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Biểu đồ doanh thu và dòng chú thích bên dưới phải 'dính' với nhau thành một khối minh họa độc lập. Thẻ bao ngoài là gì?",
        options: ["<figure>", "<div>", "<img>", "<frame>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thẻ nào dùng làm chú thích bên trong <figure>?",
        options: ["<caption>", "<figcaption>", "<label>", "<legend>"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_STRUCTURE,
        prompt: "Viết khối figure chứa ảnh so-do.png (img) và chú thích figcaption 'Sơ đồ'",
        requirements: [
          { type: "tagName", value: "figure" },
          { type: "contains", parent: "figure", child: "img", count: 1 },
          { type: "attr", name: "src", value: "so-do.png" },
          { type: "contains", parent: "figure", child: "figcaption", count: 1 },
          { type: "text", tag: "figcaption", index: 0, value: "Sơ đồ" },
        ],
      },
    ],
  },
  {
    name: "figcaption",
    topic: "Liên kết & Media",
    description: "Chú thích cho khối figure",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bên trong khối <figure>, dòng 'Hình 1: Sơ đồ hệ thống' cần thẻ chú thích đúng chuẩn. Thẻ nào?",
        options: ["<caption>", "<figcaption>", "<label>", "<small>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<figcaption> được đặt ở đâu?",
        options: ["Bất kỳ đâu trong trang", "Bên trong <figure>, ở đầu hoặc cuối", "Ngay sau thẻ </figure>", "Trong <head>"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ chú thích cho figure:",
        starterCode: '<figure>\n  <img src="bieu-do.png" alt="Biểu đồ">\n  <____>Doanh thu 2026</____>\n</figure>',
        answer: "figcaption",
      },
    ],
  },
  // ===== DANH SÁCH (mở rộng) =====
  {
    name: "dl",
    topic: "Danh sách",
    description: "Danh sách mô tả (cặp thuật ngữ – định nghĩa)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Hiển thị thông số kỹ thuật dạng cặp 'CPU: i7', 'RAM: 16GB' đúng ngữ nghĩa danh sách mô tả. Thẻ bao ngoài là gì?",
        options: ["<ul>", "<dl>", "<table>", "<ol>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Bên trong <dl> chứa những cặp thẻ nào?",
        options: ["<li> và <ul>", "<dt> và <dd>", "<th> và <td>", "<term> và <def>"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ bao ngoài danh sách mô tả:",
        starterCode: "<____>\n  <dt>HTML</dt>\n  <dd>Ngôn ngữ đánh dấu siêu văn bản</dd>\n</____>",
        answer: "dl",
      },
    ],
  },
  {
    name: "dt",
    topic: "Danh sách",
    description: "Thuật ngữ trong danh sách mô tả",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong danh sách mô tả thông số, phần TÊN thông số ('CPU', 'RAM') nằm trong thẻ nào?",
        options: ["<dd>", "<li>", "<dt>", "<th>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Quan hệ giữa <dt> và <dd> là gì?",
        options: ["<dd> là phần mô tả cho thuật ngữ <dt> đứng trước nó", "<dt> nằm trong <dd>", "Hai thẻ không liên quan", "<dd> phải đứng trước <dt>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ ghi thuật ngữ:",
        starterCode: "<dl>\n  <____>CSS</____>\n  <dd>Ngôn ngữ tạo kiểu cho trang web</dd>\n</dl>",
        answer: "dt",
      },
    ],
  },
  {
    name: "dd",
    topic: "Danh sách",
    description: "Phần mô tả / định nghĩa của thuật ngữ",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong danh sách mô tả thông số, phần GIÁ TRỊ ('i7', '16GB') đứng sau tên thông số nằm trong thẻ nào?",
        options: ["<dt>", "<dd>", "<dl>", "<td>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một thuật ngữ <dt> có thể có bao nhiêu <dd>?",
        options: ["Chỉ đúng 1", "Một hoặc nhiều <dd>", "Tối đa 2", "Không cần <dd>... luôn sai"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ ghi phần mô tả:",
        starterCode: "<dl>\n  <dt>JS</dt>\n  <____>Ngôn ngữ lập trình của web</____>\n</dl>",
        answer: "dd",
      },
    ],
  },
  // ===== BẢNG (mở rộng) =====
  {
    name: "thead",
    topic: "Bảng",
    description: "Nhóm các hàng tiêu đề của bảng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bảng dài cần nhóm các hàng nhãn cột vào một khối riêng ở đầu bảng (để cố định khi cuộn, in lặp mỗi trang). Khối đó là thẻ gì?",
        options: ["<th>", "<thead>", "<header>", "<caption>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Bên trong <thead> thường chứa gì?",
        options: ["Các <tr> chứa ô tiêu đề <th>", "Trực tiếp các <th> không cần <tr>", "Thẻ <caption>", "Thẻ <title>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nhóm hàng tiêu đề bảng:",
        starterCode: "<table>\n  <____>\n    <tr><th>Tên</th><th>Giá</th></tr>\n  </____>\n  <tbody>...</tbody>\n</table>",
        answer: "thead",
      },
    ],
  },
  {
    name: "tbody",
    topic: "Bảng",
    description: "Nhóm các hàng dữ liệu chính của bảng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "JavaScript cần thêm hàng sản phẩm mới vào đúng phần thân bảng, không đụng phần nhãn cột. Phần thân đó là thẻ gì?",
        options: ["<body>", "<main>", "<tbody>", "<tfoot>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thứ tự đúng các phần trong bảng là gì?",
        options: ["tbody → thead → tfoot", "thead → tbody → tfoot", "tfoot → tbody → thead", "Thứ tự nào cũng sai"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nhóm hàng dữ liệu chính:",
        starterCode: "<table>\n  <thead>...</thead>\n  <____>\n    <tr><td>Áo thun</td><td>99k</td></tr>\n  </____>\n</table>",
        answer: "tbody",
      },
    ],
  },
  {
    name: "tfoot",
    topic: "Bảng",
    description: "Nhóm hàng tổng kết ở cuối bảng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Hàng 'Tổng cộng: 500.000đ' cuối bảng hóa đơn cần nằm trong khối tổng kết riêng của bảng. Khối đó là thẻ gì?",
        options: ["<footer>", "<tfoot>", "<tr class=\"total\">", "<caption>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nội dung nào phù hợp nhất đặt trong <tfoot>?",
        options: ["Hàng tiêu đề cột", "Hàng tổng cộng / tổng kết số liệu", "Chú thích bản quyền trang", "Logo công ty"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nhóm hàng tổng kết:",
        starterCode: "<table>\n  <tbody>...</tbody>\n  <____>\n    <tr><td>Tổng</td><td>500k</td></tr>\n  </____>\n</table>",
        answer: "tfoot",
      },
    ],
  },
  {
    name: "caption",
    topic: "Bảng",
    description: "Tiêu đề / chú thích của bảng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình cần đọc tên bảng 'Doanh thu quý 1' trước khi đọc dữ liệu. Tên bảng đặt trong thẻ nào (gắn liền với bảng)?",
        options: ["<h3> đặt trên bảng", "<title>", "<figcaption>", "<caption>"],
        correctIndex: 3,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<caption> phải đặt ở vị trí nào?",
        options: ["Cuối bảng", "Là thẻ con đầu tiên ngay sau <table>", "Trước thẻ <table>", "Trong <thead>"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tiêu đề bảng:",
        starterCode: "<table>\n  <____>Bảng giá 2026</____>\n  <tr><th>Món</th><th>Giá</th></tr>\n</table>",
        answer: "caption",
      },
    ],
  },
  // ===== FORM (mở rộng) =====
  {
    name: "option",
    topic: "Form",
    description: "Một lựa chọn bên trong select",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Bên trong hộp thả xuống chọn size áo, từng dòng 'S', 'M', 'L' là thẻ gì?",
        options: ["<li>", "<choice>", "<option>", "<item>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute value của <option> có tác dụng gì?",
        options: ["Đổi chữ hiển thị", "Là giá trị được gửi đi khi submit form (có thể khác chữ hiển thị)", "Đếm số lựa chọn", "Sắp xếp thứ tự"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ option có value là 'm', hiển thị chữ 'Size M'",
        requirements: [
          { type: "tagName", value: "option" },
          { type: "attr", name: "value", value: "m" },
          { type: "text", tag: "option", index: 0, value: "Size M" },
        ],
      },
    ],
  },
  {
    name: "fieldset",
    topic: "Form",
    description: "Nhóm các trường nhập liên quan trong form",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Form thanh toán dài cần gom nhóm các ô 'Địa chỉ giao hàng' vào một khung riêng, tách khỏi nhóm 'Thông tin thẻ'. Thẻ nào đúng ngữ nghĩa?",
        options: ["<div>", "<fieldset>", "<section>", "<group>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute disabled trên <fieldset> có tác dụng gì?",
        options: ["Ẩn fieldset", "Vô hiệu hóa tất cả trường nhập bên trong nó", "Chỉ vô hiệu trường đầu tiên", "Xóa dữ liệu đã nhập"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nhóm trường nhập:",
        starterCode: '<form>\n  <____>\n    <legend>Địa chỉ giao hàng</legend>\n    <input name="city">\n  </____>\n</form>',
        answer: "fieldset",
      },
    ],
  },
  {
    name: "legend",
    topic: "Form",
    description: "Tiêu đề của nhóm fieldset",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Khung <fieldset> cần dòng tiêu đề 'Thông tin giao hàng' hiển thị chèn trên viền khung. Thẻ nào đúng?",
        options: ["<label>", "<h4>", "<legend>", "<caption>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<legend> phải đặt ở đâu?",
        options: ["Là thẻ con đầu tiên của <fieldset>", "Ngay trước <fieldset>", "Cuối form", "Trong <label>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tiêu đề nhóm:",
        starterCode: "<fieldset>\n  <____>Thông tin thanh toán</____>\n  <input name=\"card\">\n</fieldset>",
        answer: "legend",
      },
    ],
  },
  // ===== CẤU TRÚC TRANG =====
  {
    name: "html",
    topic: "Cấu trúc trang",
    description: "Phần tử gốc bao toàn bộ trang",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Ngay sau dòng <!DOCTYPE html>, toàn bộ tài liệu phải nằm trong một thẻ gốc duy nhất. Thẻ đó là gì?",
        options: ["<body>", "<html>", "<root>", "<head>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute lang trên <html> có tác dụng gì?",
        options: ["Dịch trang tự động", "Khai báo ngôn ngữ chính của trang (hỗ trợ SEO, đọc màn hình)", "Đổi ngôn ngữ trình duyệt", "Bắt buộc viết tiếng Anh"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ gốc của trang:",
        starterCode: '<!DOCTYPE html>\n<____ lang="vi">\n  <head>...</head>\n  <body>...</body>\n</____>',
        answer: "html",
      },
    ],
  },
  {
    name: "head",
    topic: "Cấu trúc trang",
    description: "Chứa metadata của trang — không hiển thị",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Tiêu đề tab, khai báo bảng mã, link file CSS — những thứ KHÔNG hiển thị trong trang — đặt vào khu vực nào?",
        options: ["<header>", "<head>", "<meta>", "<body>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thẻ nào KHÔNG đặt trong <head>?",
        options: ["<title>", "<meta>", "<link>", "<p>"],
        correctIndex: 3,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ chứa metadata:",
        starterCode: "<html>\n  <____>\n    <title>Trang chủ</title>\n  </____>\n  <body>...</body>\n</html>",
        answer: "head",
      },
    ],
  },
  {
    name: "body",
    topic: "Cấu trúc trang",
    description: "Chứa toàn bộ nội dung hiển thị của trang",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Mọi thứ người dùng NHÌN THẤY trên trang — tiêu đề, ảnh, nút bấm — phải nằm trong thẻ nào?",
        options: ["<main>", "<html>", "<body>", "<head>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một trang HTML có bao nhiêu thẻ <body>?",
        options: ["Đúng 1", "Tối đa 2", "Bao nhiêu cũng được", "Không bắt buộc có"],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ chứa nội dung hiển thị:",
        starterCode: "<html>\n  <head>...</head>\n  <____>\n    <h1>Xin chào</h1>\n  </____>\n</html>",
        answer: "body",
      },
    ],
  },
  {
    name: "title",
    topic: "Cấu trúc trang",
    description: "Tiêu đề trang — hiện trên tab trình duyệt",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Dòng chữ 'ShopVN — Giày chính hãng' hiện trên TAB trình duyệt và trong kết quả Google được lấy từ thẻ nào?",
        options: ["<h1>", "<header>", "<meta>", "<title>"],
        correctIndex: 3,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<title> khác <h1> ở điểm nào?",
        options: ["Không khác gì", "<title> nằm trong <head>, hiện trên tab; <h1> hiện trong nội dung trang", "<title> to hơn <h1>", "<h1> chỉ dùng cho SEO"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ tiêu đề trang trên tab:",
        starterCode: "<head>\n  <____>ShopVN — Trang chủ</____>\n</head>",
        answer: "title",
      },
    ],
  },
  {
    name: "meta",
    topic: "Cấu trúc trang",
    description: "Khai báo metadata (charset, viewport...) — thẻ rỗng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Tiếng Việt trên trang hiển thị lỗi thành 'Tiáº¿ng Viá»t'. Bạn cần khai báo bảng mã UTF-8 bằng thẻ rỗng nào trong <head>?",
        options: ["<charset>", "<link>", "<meta>", "<script>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: '<meta name="viewport" content="width=device-width, initial-scale=1"> có tác dụng gì?',
        options: [
          "Trang hiển thị đúng tỉ lệ trên màn hình điện thoại (nền tảng của responsive)",
          "Tăng tốc độ tải trang trên 4G",
          "Khóa không cho người dùng zoom",
          "Tự đổi sang giao diện tối trên mobile",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ meta khai báo bảng mã UTF-8",
        requirements: [
          { type: "tagName", value: "meta" },
          { type: "attr", name: "charset", value: "UTF-8" },
        ],
      },
    ],
  },
  {
    name: "div",
    topic: "Cấu trúc trang",
    description: "Khối chứa không ngữ nghĩa — dùng để dàn bố cục",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Cần một khối bao gom 3 card sản phẩm để áp CSS Grid — khối này không mang ý nghĩa ngữ nghĩa nào. Thẻ nào phù hợp?",
        options: ["<section>", "<div>", "<span>", "<article>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Khi nào nên ưu tiên thẻ ngữ nghĩa (header, nav...) thay vì <div>?",
        options: ["Không bao giờ", "Khi nội dung có vai trò rõ ràng — giúp SEO và đọc màn hình", "Chỉ khi viết CSS", "Khi trang có nhiều ảnh"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ div có class là 'container' (thẻ mở và đóng, không cần nội dung)",
        requirements: [
          { type: "tagName", value: "div" },
          { type: "attr", name: "class", value: "container" },
        ],
      },
    ],
  },
  {
    name: "link",
    topic: "Cấu trúc trang",
    description: "Nạp tài nguyên ngoài (CSS, favicon) — thẻ rỗng trong head",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang cần nạp file style.css từ ngoài vào. Cách viết nào đúng (đặt trong <head>)?",
        options: [
          "<a href=\"style.css\">",
          "<style src=\"style.css\">",
          "<link rel=\"stylesheet\" href=\"style.css\">",
          "<css href=\"style.css\">",
        ],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<link> khác <a> ở điểm nào?",
        options: [
          "Giống nhau, <link> là cách viết tắt",
          "<link> nạp tài nguyên trong <head>, không bấm được; <a> là liên kết bấm được trong nội dung",
          "<a> đã lỗi thời, nên dùng <link>",
          "<link> chỉ dùng cho liên kết nội bộ",
        ],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ link nạp file style.css (rel là stylesheet)",
        requirements: [
          { type: "tagName", value: "link" },
          { type: "attr", name: "rel", value: "stylesheet" },
          { type: "attr", name: "href", value: "style.css" },
        ],
      },
    ],
  },
  {
    name: "script",
    topic: "Cấu trúc trang",
    description: "Nhúng hoặc nạp file JavaScript",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang cần nạp file app.js để nút bấm có tương tác. Thẻ nào đúng?",
        options: [
          "<link rel=\"javascript\" href=\"app.js\">",
          "<script src=\"app.js\"></script>",
          "<js src=\"app.js\">",
          "<code src=\"app.js\">",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute defer trên <script> có tác dụng gì?",
        options: ["Không tải file script", "Tải song song nhưng chỉ chạy sau khi HTML được phân tích xong", "Chạy script hai lần", "Chặn quảng cáo"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_TAG,
        prompt: "Viết thẻ script nạp file app.js với defer (nhớ cả thẻ đóng </script>)",
        requirements: [
          { type: "tagName", value: "script" },
          { type: "attr", name: "src", value: "app.js" },
          { type: "attr", name: "defer" },
        ],
      },
    ],
  },
  // ===== NGỮ NGHĨA =====
  {
    name: "header",
    topic: "Ngữ nghĩa",
    description: "Phần đầu của trang hoặc một khối nội dung",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Vùng trên cùng của trang chứa logo, tên site và menu đang viết bằng <div class=\"top\">. Thẻ ngữ nghĩa nào nên thay thế?",
        options: ["<head>", "<header>", "<nav>", "<title>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<header> khác <head> ở điểm nào?",
        options: ["Là một — viết tắt của nhau", "<header> là nội dung hiển thị; <head> chứa metadata không hiển thị", "<head> mới hơn <header>", "<header> chỉ dùng một lần"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ vùng đầu trang:",
        starterCode: "<____>\n  <h1>ShopVN</h1>\n  <nav>...</nav>\n</____>",
        answer: "header",
      },
    ],
  },
  {
    name: "nav",
    topic: "Ngữ nghĩa",
    description: "Khối chứa các liên kết điều hướng chính",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Khối chứa các liên kết 'Trang chủ / Sản phẩm / Liên hệ' — menu điều hướng chính — nên bọc bằng thẻ ngữ nghĩa nào?",
        options: ["<menu>", "<header>", "<nav>", "<aside>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nhóm liên kết nào nên đặt trong <nav>?",
        options: ["Mọi liên kết trên trang", "Menu điều hướng chính (Trang chủ, Sản phẩm...)", "Chỉ liên kết ra trang ngoài", "Liên kết trong bài viết"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.WRITE_STRUCTURE,
        prompt: "Viết khối nav chứa 2 liên kết: 'Trang chủ' và 'Liên hệ' (thẻ a, href tùy ý)",
        requirements: [
          { type: "tagName", value: "nav" },
          { type: "contains", parent: "nav", child: "a", count: 2 },
          { type: "text", tag: "a", index: 0, value: "Trang chủ" },
          { type: "text", tag: "a", index: 1, value: "Liên hệ" },
        ],
      },
    ],
  },
  {
    name: "main",
    topic: "Ngữ nghĩa",
    description: "Nội dung chính, duy nhất của trang",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Nút 'Bỏ qua đến nội dung chính' cho người dùng bàn phím phải nhảy thẳng đến vùng nội dung trung tâm của trang. Vùng đó là thẻ gì?",
        options: ["<body>", "<main>", "<section>", "<article>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Phát biểu nào đúng về <main>?",
        options: ["Mỗi trang có thể có nhiều <main>", "Mỗi trang chỉ nên có 1 <main>, không đặt trong header/footer/nav", "<main> bắt buộc đứng đầu <body>", "<main> chỉ dùng cho blog"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ bao nội dung chính:",
        starterCode: "<body>\n  <header>...</header>\n  <____>\n    <h1>Bài viết mới</h1>\n  </____>\n  <footer>...</footer>\n</body>",
        answer: "main",
      },
    ],
  },
  {
    name: "section",
    topic: "Ngữ nghĩa",
    description: "Một phần nội dung theo chủ đề, thường có tiêu đề riêng",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Landing page chia thành các phần 'Tính năng', 'Bảng giá', 'Đánh giá' — mỗi phần có tiêu đề riêng nhưng không tự đứng độc lập. Thẻ nào đúng?",
        options: ["<article>", "<div>", "<aside>", "<section>"],
        correctIndex: 3,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<section> khác <div> ở điểm nào?",
        options: ["Không khác gì", "<section> mang ngữ nghĩa 'một phần nội dung', nên có tiêu đề; <div> không có ngữ nghĩa", "<section> tự thêm viền", "<div> không dùng được CSS Grid"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nhóm nội dung theo chủ đề:",
        starterCode: "<____>\n  <h2>Tin khuyến mãi</h2>\n  <p>...</p>\n</____>",
        answer: "section",
      },
    ],
  },
  {
    name: "article",
    topic: "Ngữ nghĩa",
    description: "Nội dung độc lập, tự đứng được (bài viết, bình luận)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Mỗi bài đăng blog có thể copy nguyên khối sang trang khác mà vẫn đầy đủ ý nghĩa. Khối đó nên bọc bằng thẻ gì?",
        options: ["<article>", "<section>", "<main>", "<div>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<article> khác <section> ở điểm nào?",
        options: ["Không khác gì", "<article> là nội dung tự đứng độc lập (tách ra vẫn có nghĩa); <section> là một phần của tổng thể", "<article> chỉ dành cho báo chí", "<section> không chứa được <article>"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ bao bài viết độc lập:",
        starterCode: "<____>\n  <h2>Cách học HTML hiệu quả</h2>\n  <p>...</p>\n</____>",
        answer: "article",
      },
    ],
  },
  {
    name: "aside",
    topic: "Ngữ nghĩa",
    description: "Nội dung phụ, bên lề (sidebar, quảng cáo)",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Cột bên phải trang bài viết chứa 'Bài liên quan' và quảng cáo — bỏ đi không ảnh hưởng bài chính. Thẻ ngữ nghĩa nào đúng?",
        options: ["<sidebar>", "<aside>", "<section>", "<footer>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nội dung nào phù hợp đặt trong <aside>?",
        options: ["Nội dung chính của bài viết", "Bài viết liên quan, quảng cáo, tiểu sử tác giả", "Menu điều hướng chính", "Tiêu đề trang"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ nội dung bên lề:",
        starterCode: "<main>...</main>\n<____>\n  <h3>Bài viết liên quan</h3>\n</____>",
        answer: "aside",
      },
    ],
  },
  {
    name: "footer",
    topic: "Ngữ nghĩa",
    description: "Phần chân trang hoặc chân một khối nội dung",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Vùng cuối trang chứa '© 2026 ShopVN' và liên kết chính sách nên bọc bằng thẻ ngữ nghĩa nào?",
        options: ["<tfoot>", "<bottom>", "<footer>", "<aside>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Phát biểu nào đúng về <footer>?",
        options: ["Mỗi trang chỉ được 1 <footer>", "Có thể có nhiều <footer> — ví dụ mỗi <article> có footer riêng", "<footer> phải là thẻ cuối cùng của file", "<footer> không chứa được liên kết"],
        correctIndex: 1,
      },
      {
        tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên thẻ chân trang:",
        starterCode: "<____>\n  <p>© 2026 ShopVN</p>\n</____>",
        answer: "footer",
      },
    ],
  },
];

// Seed KHÔNG phá hủy: upsert thẻ theo name, cập nhật câu hỏi theo (tagId, tier).
// Tuyệt đối không xóa UserTagProgress/Attempt — đó là tiến độ học của người dùng.
async function main() {
  let order = 0;
  for (const t of tags) {
    const tag = await prisma.tag.upsert({
      where: { name: t.name },
      update: { topic: t.topic, description: t.description, order },
      create: { name: t.name, topic: t.topic, description: t.description, order },
    });
    order++;

    for (const q of t.questions) {
      const data = {
        type: q.type,
        prompt: q.prompt,
        options: q.options ?? Prisma.DbNull,
        correctIndex: q.correctIndex ?? null,
        requirements: q.requirements ?? Prisma.DbNull,
        starterCode: q.starterCode ?? null,
        answer: q.answer ?? null,
      };
      // Mỗi thẻ có đúng 1 câu hỏi mỗi bậc → (tagId, tier) là khóa tự nhiên
      const existing = await prisma.question.findFirst({
        where: { tagId: tag.id, tier: q.tier },
      });
      if (existing) {
        await prisma.question.update({ where: { id: existing.id }, data });
      } else {
        await prisma.question.create({ data: { ...data, tagId: tag.id, tier: q.tier } });
      }
    }
  }

  // Dọn thẻ không còn trong seed (câu hỏi/tiến độ của riêng thẻ đó cascade theo)
  await prisma.tag.deleteMany({ where: { name: { notIn: tags.map((t) => t.name) } } });

  const [tagCount, qCount, progressCount] = await Promise.all([
    prisma.tag.count(),
    prisma.question.count(),
    prisma.userTagProgress.count(),
  ]);
  console.log(
    `Đã seed ${tagCount} thẻ, ${qCount} câu hỏi — giữ nguyên ${progressCount} bản ghi tiến độ`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
