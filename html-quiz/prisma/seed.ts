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

export const tags: SeedTag[] = [
  // ===== VĂN BẢN =====
  {
    name: "h1",
    topic: "Văn bản",
    description: "Tiêu đề cấp 1 — tiêu đề quan trọng nhất của trang",
    questions: [
      {
        tier: 1, type: T.MCQ,
        prompt: "Trên trang chi tiết sản phẩm, TÊN SẢN PHẨM là dòng quan trọng nhất ở đầu trang. Dùng thẻ tiêu đề nào?",
        options: ["<h1>", "<p>", "<span>", "<title>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Lighthouse báo 'trang thiếu tiêu đề chính' — thẻ nào cần thêm vào đầu nội dung?",
        options: ["<title>", "<h1>", "<header>", "<b>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Dòng 'Khóa học HTML miễn phí' là nội dung quan trọng nhất của landing page. Thẻ tiêu đề nào phù hợp?",
        options: ["<h6>", "<p>", "<h1>", "<strong>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<h1> khác <title> ở điểm nào?",
        options: [
          "Không khác gì",
          "<h1> hiển thị trong trang; <title> hiện trên tab trình duyệt",
          "<title> to hơn <h1>",
          "<h1> chỉ dùng cho SEO",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Muốn chữ to như <h1> nhưng nội dung KHÔNG phải tiêu đề chính, cách đúng là gì?",
        options: [
          "Cứ dùng <h1> vì trông giống nhau",
          "Dùng thẻ phù hợp ngữ nghĩa rồi phóng to bằng CSS font-size",
          "Dùng <h1> nhưng thêm class",
          "Dùng nhiều <h2> lồng nhau",
        ],
        correctIndex: 1,
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
        prompt: "Phần mô tả sản phẩm gồm vài câu văn xuôi thành một đoạn. Bọc đoạn đó bằng thẻ nào?",
        options: ["<span>", "<p>", "<div>", "<br>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Chatbot trả lời thành 3 đoạn văn riêng biệt, mỗi đoạn cách nhau một khoảng — mỗi đoạn bọc bằng thẻ nào?",
        options: ["<p>", "<br>", "<span>", "<div line>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình cho phép nhảy 'đoạn kế tiếp' khi văn bản được bọc trong thẻ nào?",
        options: ["<span>", "<section>", "<p>", "<b>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Khoảng cách giữa hai thẻ <p> liền nhau đến từ đâu?",
        options: [
          "Trình duyệt tự thêm margin mặc định cho <p>",
          "Phải thêm <br> mới có",
          "Do khoảng trắng trong code",
          "HTML tự chèn một dòng trống",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao KHÔNG nên đặt <div> hay <table> bên trong <p>?",
        options: [
          "Vì <p> chỉ chứa nội dung dạng chữ/inline — gặp phần tử khối, trình duyệt tự đóng <p>",
          "Vì <p> có chiều cao cố định",
          "Vì CSS không áp dụng được",
          "Thực ra đặt được, không sao",
        ],
        correctIndex: 0,
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
        prompt: "Trong dòng 'Giảm giá CHỈ HÔM NAY', muốn cụm 'CHỈ HÔM NAY' đậm và có ngữ nghĩa quan trọng. Dùng thẻ nào?",
        options: ["<b>", "<strong>", "<mark>", "<em>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Dòng 'Hạn chót nộp hồ sơ: 30/6' phải đậm VÀ được máy đọc màn hình nhấn mạnh — thẻ nào?",
        options: ["<em>", "<strong>", "<b>", "<mark>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong cảnh báo 'KHÔNG chia sẻ mã OTP cho bất kỳ ai', cụm quan trọng bọc thẻ nào để có ngữ nghĩa cảnh báo?",
        options: ["<i>", "<u>", "<span class=\"bold\">", "<strong>"],
        correctIndex: 3,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Khi nào dùng <b> thay vì <strong>?",
        options: [
          "Khi muốn chữ đậm hơn",
          "Khi chỉ cần đậm về hình thức (từ khóa, tên sản phẩm) mà không hàm ý quan trọng",
          "Không bao giờ — <b> đã bị loại bỏ",
          "Khi viết tiêu đề",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<strong> lồng trong <strong> có ý nghĩa gì theo chuẩn HTML?",
        options: [
          "Lỗi cú pháp",
          "Mức độ quan trọng tăng thêm",
          "Không có gì khác — chỉ đậm như cũ về mọi mặt",
          "Trình duyệt bỏ qua thẻ trong",
        ],
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
        prompt: "Muốn nhấn ngữ điệu nhẹ ở từ 'thật sự' trong câu (chữ nghiêng, có ngữ nghĩa). Dùng thẻ nào?",
        options: ["<i>", "<em>", "<span>", "<u>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Câu 'Tôi *đã nói* là đừng xóa file đó' — từ cần đổi ngữ điệu khi đọc lên bọc bằng thẻ nào?",
        options: ["<em>", "<strong>", "<u>", "<small>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình NHẤN GIỌNG ở từ được bọc trong thẻ nào (hiển thị nghiêng)?",
        options: ["<i>", "<em>", "<b>", "<q>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Tên tàu 'Titanic' trong câu văn nên in nghiêng theo quy ước — KHÔNG nhấn mạnh gì. Thẻ nào đúng?",
        options: [
          "<em> vì nó nghiêng",
          "<i> — nghiêng do quy ước trình bày, không mang nghĩa nhấn",
          "<strong>",
          "<cite> hoặc <i> đều sai",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Đặt <em> ở từ khác nhau trong cùng câu ('TÔI không nói' vs 'tôi KHÔNG nói') thì điều gì thay đổi?",
        options: [
          "Không gì cả",
          "Sắc thái nghĩa của câu thay đổi theo từ được nhấn",
          "Chỉ vị trí chữ nghiêng đổi, nghĩa giữ nguyên",
          "HTML không cho phép em giữa câu",
        ],
        correctIndex: 1,
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
        prompt: "Trong khối địa chỉ, muốn xuống dòng giữa 'Số 1 Lê Lợi' và 'Quận 1' mà vẫn trong cùng một đoạn. Dùng thẻ nào?",
        options: ["<p>", "<br>", "<hr>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Chữ ký email 3 dòng (tên / chức danh / công ty) sát nhau trong MỘT đoạn — xuống dòng bằng thẻ nào?",
        options: ["<br>", "<p>", "<hr>", "<wbr>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Hiển thị lời bài hát: mỗi câu một dòng, không tách thành các đoạn có khoảng cách. Chèn gì cuối mỗi câu?",
        options: ["<hr>", "<div>", "<br>", "&nbsp;"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Dùng <br><br> để tạo khoảng trống giữa các khối bị code review chê — vì sao?",
        options: [
          "Vì <br> chỉ được dùng 1 lần mỗi trang",
          "Khoảng cách trình bày nên làm bằng CSS margin, <br> chỉ dành cho ngắt dòng có nghĩa",
          "Vì <br><br> gây lỗi cú pháp",
          "Vì nên dùng <hr> thay thế",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Cách viết nào của thẻ ngắt dòng đều hợp lệ trong HTML5?",
        options: [
          "Chỉ <br>",
          "Chỉ <br/>",
          "Cả <br> và <br/> đều hợp lệ",
          "Phải viết <br></br>",
        ],
        correctIndex: 2,
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
        prompt: "Trên card sản phẩm, muốn dòng chữ 'Xem chi tiết' bấm vào thì chuyển sang trang sản phẩm. Dùng thẻ nào?",
        options: ["<a>", "<link>", "<button>", "<nav>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Người dùng bàn phím phải Tab tới và nhấn Enter để mở được 'Xem thêm' — phần tử nào có sẵn hành vi đó?",
        options: ["<div onclick>", "<a href>", "<span>", "<p>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Logo đối tác bấm vào mở website của họ — ảnh được bọc trong thẻ nào?",
        options: ["<link>", "<button>", "<a>", "<nav>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thẻ <a> không có href sẽ thế nào?",
        options: [
          "Vẫn là link bình thường",
          "Mất vai trò liên kết: không focus được, không bấm được",
          "Tự dẫn về trang chủ",
          "Gây lỗi trang trắng",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nút 'Đăng xuất' THỰC HIỆN hành động (gọi API) chứ không điều hướng — nên dùng gì thay <a>?",
        options: [
          "<a href=\"#\"> kèm JS",
          "<button> — hành động dùng button, điều hướng mới dùng a",
          "<a> không href",
          "<span onclick>",
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
        prompt: "Card sản phẩm cần hiển thị ảnh của món hàng ở trên cùng. Dùng thẻ nào?",
        options: ["<image>", "<img>", "<picture>", "<figure>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Banner khuyến mãi dạng file PNG cần xuất hiện đầu trang — thẻ rỗng nào chèn nó?",
        options: ["<picture>", "<img>", "<figure>", "<src>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Ảnh sản phẩm là NỘI DUNG cần Google index và có mô tả thay thế — dùng cách nào?",
        options: [
          "CSS background-image",
          "Thẻ <img> với alt",
          "Thẻ <div> đặt ảnh nền",
          "Thẻ <a> trỏ tới ảnh",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Ảnh trang trí thuần túy (hoa văn) nên khai báo alt thế nào?",
        options: [
          "Bỏ hẳn thuộc tính alt",
          "alt=\"hoa văn trang trí số 3\"",
          "alt=\"\" (rỗng) để máy đọc màn hình bỏ qua",
          "alt=\"image\"",
        ],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao nên khai báo width và height ngay trên <img>?",
        options: [
          "Để ảnh đẹp hơn",
          "Trình duyệt giữ chỗ trước, tránh nội dung nhảy khi ảnh tải xong",
          "Bắt buộc theo chuẩn HTML",
          "Để ảnh tải nhanh hơn",
        ],
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
        prompt: "Menu liệt kê các danh mục KHÔNG cần thứ tự (Điện thoại, Laptop...). Bọc cả danh sách bằng thẻ nào?",
        options: ["<ol>", "<ul>", "<dl>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Checklist 'đồ mang đi camping' — các mục ngang hàng, đảo thứ tự không sao. Thẻ bao ngoài?",
        options: ["<ol>", "<dl>", "<ul>", "<table>"],
        correctIndex: 2,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình thông báo 'danh sách, 5 mục' khi gặp cấu trúc nào?",
        options: [
          "5 thẻ <p> liền nhau",
          "<ul> chứa 5 <li>",
          "5 dòng cách nhau bằng <br>",
          "<div> chứa 5 <span>",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Muốn bỏ dấu chấm tròn của <ul> trong menu, cách đúng là gì?",
        options: [
          "Đổi sang các thẻ <div>",
          "Giữ <ul> và dùng CSS list-style: none",
          "Dùng thuộc tính nobullet",
          "Đổi sang <ol>",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Danh sách lồng nhau (mục con trong mục cha) viết đúng thế nào?",
        options: [
          "<ul> con đặt BÊN TRONG <li> của mục cha",
          "<ul> con đặt ngay sau </li> của mục cha",
          "Hai <ul> ngang hàng nhau",
          "HTML không hỗ trợ danh sách lồng",
        ],
        correctIndex: 0,
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
        prompt: "Hướng dẫn các BƯỚC đặt hàng theo đúng thứ tự 1, 2, 3. Nên dùng loại danh sách nào?",
        options: ["<ul>", "<ol>", "<dl>", "<menu>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Hướng dẫn cài app 4 bước phải làm ĐÚNG THỨ TỰ và tự đánh số — thẻ bao ngoài?",
        options: ["<ul>", "<ol>", "<dl>", "<nav>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Phần 'Tài liệu tham khảo' đánh số [1] [2] [3] theo thứ tự trích dẫn — dùng danh sách nào?",
        options: ["<ol>", "<ul>", "<dl>", "<table>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Chèn thêm một bước vào giữa <ol> thì các số phía sau thế nào?",
        options: [
          "Phải sửa số từng mục bằng tay",
          "Trình duyệt tự đánh số lại toàn bộ",
          "Số bị trùng",
          "Mục mới không có số",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Chọn <ul> hay <ol> dựa trên tiêu chí nào?",
        options: [
          "Số lượng mục nhiều hay ít",
          "Đảo thứ tự các mục có làm sai nghĩa không",
          "Có cần dấu chấm tròn không",
          "Mục dài hay ngắn",
        ],
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
        prompt: "Mỗi danh mục trong menu <ul> là một mục riêng. Dùng thẻ nào cho mỗi mục đó?",
        options: ["<item>", "<li>", "<dd>", "<p>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Trong menu <ul> của navbar, mỗi mục 'Trang chủ', 'Sản phẩm' trước khi đặt link phải nằm trong thẻ nào?",
        options: ["<li>", "<a>", "<span>", "<nav>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "JS thêm việc mới vào cuối todo-list <ul> — nó tạo phần tử nào để append?",
        options: ["<item>", "<li>", "<p>", "<div>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Validator báo lỗi với <ul><div>Mục</div></ul> — vì sao?",
        options: [
          "div không được rỗng",
          "Con trực tiếp của ul phải là li; div phải nằm trong li",
          "ul không được chứa quá 1 phần tử",
          "Thiếu thẻ đóng",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một <li> có thể chứa gì bên trong?",
        options: [
          "Chỉ văn bản thuần",
          "Văn bản, link, ảnh, thậm chí cả danh sách con",
          "Chỉ một thẻ <a>",
          "Không được chứa thẻ khối",
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
        prompt: "Cần hiển thị bảng so sánh giá theo hàng và cột rõ ràng. Dùng thẻ nào để tạo bảng?",
        options: ["<grid>", "<table>", "<div>", "<list>"],
        correctIndex: 1,
      },
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
        prompt: "Dựng bảng dữ liệu bằng các thẻ table, tr, td. Thứ tự lồng đúng từ NGOÀI vào TRONG là gì?",
        options: ["table > td > tr", "table > tr > td", "tr > table > td", "td > tr > table"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "So sánh thông số 3 mẫu điện thoại theo hàng và cột thẳng tắp — cấu trúc nào đúng ngữ nghĩa?",
        options: ["<table>", "<ul> lồng nhau", "<div> + CSS grid", "<dl>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Sao kê ngân hàng: ngày / nội dung / số tiền / số dư, 50 dòng — thẻ bao ngoài cùng?",
        options: ["<form>", "<ol>", "<table>", "<section>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao KHÔNG dùng <table> để dàn layout trang (chia cột trái phải)?",
        options: [
          "Vì bảng tải chậm",
          "Bảng mang ngữ nghĩa 'dữ liệu' — máy đọc màn hình đọc sai bản chất; layout là việc của CSS",
          "Vì bảng không hiển thị trên mobile",
          "Vì Google phạt mọi trang dùng bảng",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Dựng bảng giá đầy đủ có chú thích bảng, đầu bảng, thân và chân bảng. Cấu trúc chuẩn theo thứ tự khai báo là gì?",
        options: [
          "caption → thead → tbody → tfoot",
          "thead → caption → tbody",
          "tbody → thead → tfoot",
          "header → body → footer",
        ],
        correctIndex: 0,
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
        prompt: "Trong bảng, mỗi HÀNG (vd thông tin một sản phẩm) được tạo bằng thẻ nào?",
        options: ["<td>", "<tr>", "<th>", "<row>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "JS thêm một giao dịch mới vào bảng sao kê — nó tạo phần tử nào rồi nhét các ô vào trong?",
        options: ["<td>", "<tr>", "<row>", "<tbody>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Bảng điểm: toàn bộ dữ liệu của học sinh 'Bình' (tên + 3 môn) nằm chung trong thẻ nào?",
        options: ["<th>", "<td>", "<tr>", "<thead>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "CSS tô màu xen kẽ các dòng bảng (zebra) viết thế nào?",
        options: [
          "tr:nth-child(even) { background: ... }",
          "td.even { ... }",
          "table:odd { ... }",
          "Phải thêm class từng hàng bằng tay",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Mọi hàng trong bảng phải có gì để bảng không bị xô lệch?",
        options: [
          "Cùng màu nền",
          "Cùng tổng số cột (tính cả colspan)",
          "Cùng chiều cao",
          "Cùng số ký tự",
        ],
        correctIndex: 1,
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
        prompt: "Trong một hàng bảng, mỗi Ô DỮ LIỆU (vd giá tiền) dùng thẻ nào?",
        options: ["<td>", "<th>", "<tr>", "<cell>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Trong mỗi hàng của bảng sao kê, từng ô số liệu BÌNH THƯỜNG (không phải nhãn) là thẻ gì?",
        options: ["<th>", "<td>", "<tr>", "<col>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Bảng giá có ô chứa '99.000đ' tại hàng 'Áo thun' — thẻ nào bọc giá trị này?",
        options: ["<td>", "<th>", "<caption>", "<span>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<td> được phép chứa nội dung gì?",
        options: [
          "Chỉ chữ và số",
          "Chữ, ảnh, link, nút — thậm chí một bảng con",
          "Chỉ một dòng văn bản",
          "Không được chứa thẻ khác",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Ô trống trong bảng nên viết thế nào để bảng không vỡ cấu trúc?",
        options: [
          "Bỏ hẳn thẻ ô đó",
          "Vẫn giữ <td></td> rỗng để đủ số cột",
          "Thay bằng <br>",
          "Dùng colspan ở ô bên cạnh là bắt buộc",
        ],
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
        prompt: "Hàng đầu bảng là TIÊU ĐỀ CỘT ('Tên', 'Giá') in đậm căn giữa. Mỗi ô tiêu đề dùng thẻ nào?",
        options: ["<td>", "<th>", "<thead>", "<caption>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình đọc 'Giá: 99.000đ' (kèm tên cột) cho từng ô nhờ hàng đầu dùng thẻ nào thay vì td?",
        options: ["<td> in đậm", "<th>", "<caption>", "<thead>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Cột đầu bảng lương ghi tên nhân viên — vai trò NHÃN của hàng. Ô đó dùng thẻ gì?",
        options: ["<th>", "<td>", "<label>", "<tr>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Mặc định trình duyệt hiển thị <th> khác <td> thế nào?",
        options: [
          "Giống hệt nhau",
          "Đậm và căn giữa",
          "Nghiêng và gạch chân",
          "Nền xám",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Dùng <td> in đậm bằng CSS thay cho <th> thì mất gì?",
        options: [
          "Không mất gì",
          "Ngữ nghĩa 'ô nhãn' — máy đọc màn hình không ghép được nhãn với dữ liệu",
          "Mất viền ô",
          "Bảng không hiển thị",
        ],
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
        prompt: "Trang liên hệ cần thu thập tên + email rồi gửi đi. Bọc các ô nhập và nút gửi bằng thẻ nào?",
        options: ["<div>", "<form>", "<fieldset>", "<section>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Nhấn Enter trong ô tìm kiếm là dữ liệu tự gửi đi — hành vi có sẵn khi ô nằm trong thẻ nào?",
        options: ["<form>", "<fieldset>", "<div>", "<search>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang đăng ký gồm 5 ô nhập và nút Gửi — thẻ nào gom tất cả để submit thành một khối dữ liệu?",
        options: ["<section>", "<form>", "<fieldset>", "<main>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "JS chặn form tải lại trang để tự gửi bằng fetch — viết ở đâu?",
        options: [
          "onclick của nút với return false là đủ trong mọi trường hợp",
          "Sự kiện submit của form + e.preventDefault()",
          "Sự kiện change của input",
          "Không thể chặn form tải lại",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Required, pattern, type=email... của các ô CHỈ tự kích hoạt khi nào?",
        options: [
          "Ngay khi gõ từng phím",
          "Khi form được submit (hoặc gọi checkValidity)",
          "Khi trang tải xong",
          "Khi ô bị blur, luôn luôn",
        ],
        correctIndex: 1,
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
        prompt: "Form đăng ký cần một ô để người dùng gõ email trên MỘT dòng. Dùng thẻ nào?",
        options: ["<input>", "<textarea>", "<field>", "<box>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Ô chọn ngày sinh có lịch bật lên, ô kéo thanh trượt âm lượng, ô chọn màu — đều là MỘT thẻ với type khác nhau. Thẻ nào?",
        options: ["<select>", "<input>", "<picker>", "<field>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong nhóm textarea / select / input / button, thẻ nào là thẻ RỖNG không có thẻ đóng?",
        options: ["<textarea>", "<select>", "<input>", "<button>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Hai radio cùng name=\"size\" hành xử thế nào?",
        options: [
          "Chọn được cả hai",
          "Chọn cái này tự bỏ cái kia — cùng một nhóm",
          "Gây lỗi trùng tên",
          "Chỉ cái đầu hoạt động",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Trên điện thoại, <input type=\"tel\"> khác type=\"text\" ở điểm nào?",
        options: [
          "Tự định dạng số điện thoại",
          "Mở bàn phím số thay vì bàn phím chữ",
          "Tự kiểm tra số có thật không",
          "Không khác gì",
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
        prompt: "Muốn dòng chữ 'Email' gắn với ô nhập, bấm vào chữ thì con trỏ nhảy vào ô. Dùng thẻ nào?",
        options: ["<span>", "<label>", "<legend>", "<caption>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Checkbox bé khó bấm trên điện thoại — muốn bấm cả dòng chữ 'Ghi nhớ đăng nhập' cũng tick được, chữ đó bọc bằng thẻ nào?",
        options: ["<span>", "<label>", "<p>", "<button>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Audit accessibility báo 'form field has no associated label' — cần thêm thẻ nào cho từng ô nhập?",
        options: ["<label>", "<legend>", "<title>", "<caption>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Cách nối label với input KHÔNG cần thuộc tính for/id là gì?",
        options: [
          "Đặt label ngay trước input",
          "Bọc thẳng input vào bên trong label",
          "Cho cả hai cùng class",
          "Không có cách nào khác",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Placeholder có thay được label không? Vì sao?",
        options: [
          "Có — nhìn vẫn hiểu",
          "Không — placeholder biến mất khi gõ và máy đọc màn hình không coi nó là nhãn chính thức",
          "Có, nếu chữ đủ rõ",
          "Không — vì placeholder chỉ dùng cho mật khẩu",
        ],
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
        prompt: "Cuối form cần một nút 'Gửi' để bấm gửi biểu mẫu đi. Dùng thẻ nào?",
        options: ["<a>", "<button>", "<span>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Icon ❤️ 'yêu thích' chạy JS khi bấm — về accessibility phải dùng thẻ nào thay vì <div onclick>?",
        options: ["<a>", "<button>", "<span>", "<input type=\"text\">"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Phần tử nào kích hoạt được bằng cả phím Space lẫn Enter mà không cần viết thêm JS?",
        options: ["<div tabindex>", "<span>", "<button>", "<p onclick>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<button> hơn <input type=\"submit\"> ở điểm nào?",
        options: [
          "Gửi form nhanh hơn",
          "Chứa được HTML con bên trong (icon + chữ)",
          "Không cần thẻ đóng",
          "Tự có validation",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Bấm nút 'Thanh toán' hai lần liên tiếp tạo 2 đơn hàng — cách chống chuẩn là gì?",
        options: [
          "Ẩn nút bằng display:none ngay khi bấm",
          "Đặt disabled cho nút ngay khi bắt đầu xử lý",
          "Đổi type nút thành reset",
          "Dùng <a> thay button",
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
        prompt: "Ô 'Lời nhắn' trong form cần cho nhập NHIỀU DÒNG văn bản. Dùng thẻ nào?",
        options: ["<input>", "<textarea>", "<text>", "<p>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Khung soạn bình luận cho phép kéo góc dưới-phải để nới rộng — hành vi mặc định của thẻ nhập liệu nào?",
        options: ["<input type=\"text\">", "<textarea>", "<div contenteditable>", "<select>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Mô tả sản phẩm 2000 ký tự CÓ xuống dòng — ô nhập nào giữ được các dòng đó khi gửi đi?",
        options: ["<textarea>", "<input type=\"text\">", "<input type=\"search\">", "<output>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Giá trị mặc định của <textarea> đặt ở đâu?",
        options: [
          "Thuộc tính value như input",
          "Nội dung giữa thẻ mở và thẻ đóng",
          "Thuộc tính default",
          "Không đặt được giá trị mặc định",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Tắt tính năng kéo giãn của textarea bằng cách nào?",
        options: [
          "Thuộc tính noresize",
          "CSS resize: none",
          "rows=\"0\"",
          "Không tắt được",
        ],
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
        prompt: "Cho người dùng CHỌN một cỡ áo từ danh sách thả xuống. Dùng thẻ nào?",
        options: ["<input>", "<select>", "<datalist>", "<options>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Trường 'Năm sinh' với 60 lựa chọn không thể chiếm cả trang — phần tử nào gọn nhất?",
        options: ["60 radio", "<select>", "60 checkbox", "<ul> các nút"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trên iPhone, phần tử nào tự bật bánh xe cuộn chọn (picker) bản địa của iOS?",
        options: ["<input type=\"text\">", "<datalist>", "<select>", "<menu>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nhóm 63 tỉnh thành thành 'Miền Bắc / Trung / Nam' bên trong dropdown bằng thẻ nào?",
        options: ["<optgroup>", "<fieldset>", "<section>", "<group>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Chọn radio hay <select> dựa trên tiêu chí nào?",
        options: [
          "Radio đẹp hơn nên luôn ưu tiên",
          "Ít lựa chọn (≤5) nên phơi bày bằng radio; nhiều lựa chọn thì gập vào select",
          "Select chỉ dành cho số",
          "Không có khác biệt",
        ],
        correctIndex: 1,
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
        prompt: "Trang chủ chia nhiều mục lớn như 'Sản phẩm nổi bật', 'Khuyến mãi'. Tiêu đề mỗi mục lớn nên dùng thẻ nào?",
        options: ["<h1>", "<h2>", "<p>", "<strong>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Trang dài tự sinh mục lục từ các TIÊU ĐỀ MỤC LỚN ngay dưới h1 — script quét thẻ nào?",
        options: ["<h2>", "<h3>", "<b>", "<section>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Landing page có các khối 'Tính năng', 'Bảng giá', 'FAQ' ngang cấp nhau dưới tiêu đề trang — tiêu đề mỗi khối là thẻ gì?",
        options: ["<h1>", "<h4>", "<h2>", "<title>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "SEO checker cảnh báo 'heading skip' khi trang nhảy từ h1 xuống h3 — vấn đề là gì?",
        options: [
          "h3 to hơn h1",
          "Bỏ cấp h2 làm cây tiêu đề đứt quãng — máy đọc và SEO khó hiểu cấu trúc",
          "h3 không được phép sau h1",
          "Không có vấn đề gì",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một trang có thể có bao nhiêu thẻ <h2>?",
        options: [
          "Chỉ 1 như h1",
          "Bao nhiêu cũng được — mỗi mục lớn một cái",
          "Tối đa 6",
          "Phải bằng số h3",
        ],
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
        prompt: "Trong mục 'Sản phẩm nổi bật' lại có các mục con như 'Điện thoại'. Tiêu đề mục con nên dùng thẻ nào?",
        options: ["<h1>", "<h2>", "<h3>", "<b>"],
        correctIndex: 2,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "FAQ: 'Câu hỏi thường gặp' là <h2>, vậy MỖI câu hỏi bên trong là thẻ tiêu đề nào?",
        options: ["<h3>", "<h2>", "<h5>", "<p>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong khối 'Bảng giá' (tiêu đề h2), ba gói 'Cơ bản / Pro / Doanh nghiệp' dùng tiêu đề cấp nào?",
        options: ["<h2>", "<h6>", "<h3>", "<strong>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Chọn cấp tiêu đề theo nguyên tắc nào?",
        options: [
          "Theo cỡ chữ muốn hiển thị",
          "Theo cấu trúc nội dung — con của h2 là h3, không nhảy cóc; cỡ chữ chỉnh bằng CSS",
          "Theo độ dài tiêu đề",
          "Cấp nào cũng được",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Cây tiêu đề h1 > h2 > h3 giúp gì cho người dùng máy đọc màn hình?",
        options: [
          "Không giúp gì",
          "Nhảy nhanh giữa các mục theo cấp, hình dung dàn ý trang",
          "Đọc to hơn ở cấp cao",
          "Tự dịch nội dung",
        ],
        correctIndex: 1,
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
        prompt: "Muốn tô màu RIÊNG cụm 'còn hàng' trong một câu mà không xuống dòng và không thêm ngữ nghĩa. Dùng thẻ nào?",
        options: ["<div>", "<span>", "<p>", "<strong>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Giá '99.000đ' giữa câu cần JS cập nhật realtime — bọc nó bằng thẻ nào để gắn id mà không phá dòng chữ?",
        options: ["<div>", "<span>", "<p>", "<var>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Chữ cái đầu tên thương hiệu cần MÀU KHÁC các chữ còn lại trong cùng từ — bọc riêng nó bằng gì?",
        options: ["<span>", "<b>", "<div>", "<mark>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Dùng <div> bọc một từ giữa câu thì câu bị BẺ ĐÔI xuống dòng — vì sao?",
        options: [
          "div là phần tử khối (block) chiếm trọn dòng; giữa câu phải dùng span (inline)",
          "Lỗi trình duyệt",
          "Thiếu CSS",
          "div không chứa được chữ",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Khi nào dùng <span> thay vì <em>/<strong>/<mark>?",
        options: [
          "Luôn luôn — span đa năng nhất",
          "Khi cần móc CSS/JS thuần túy mà KHÔNG có ý nghĩa nhấn mạnh/quan trọng/nổi bật nào",
          "Khi chữ cần in đậm",
          "Khi nội dung quan trọng",
        ],
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
        prompt: "Trang giới thiệu muốn trích một đoạn đánh giá DÀI của khách hàng thành một khối riêng. Dùng thẻ nào?",
        options: ["<q>", "<blockquote>", "<p>", "<cite>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Bài phân tích trích nguyên một ĐOẠN DÀI từ báo cáo WHO, trình bày thành khối thụt lề riêng — thẻ nào?",
        options: ["<blockquote>", "<q>", "<pre>", "<cite>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang review sách hiện 'đoạn văn yêu thích' tách thành khối có gạch dọc bên trái — về ngữ nghĩa là thẻ gì?",
        options: ["<aside>", "<blockquote>", "<em>", "<section>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<q> khác <blockquote> thế nào?",
        options: [
          "Giống nhau",
          "<q> trích NGẮN trong dòng (tự thêm ngoặc kép); <blockquote> trích DÀI thành khối",
          "<q> dành cho câu hỏi",
          "<blockquote> đã lỗi thời",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Ghi tên TÁC PHẨM được trích bên dưới blockquote dùng thẻ nào đúng ngữ nghĩa?",
        options: ["<cite>", "<small>", "<b>", "<sub>"],
        correctIndex: 0,
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
        prompt: "Trong bài hướng dẫn, muốn hiển thị một đoạn mã ngắn giữa câu (vd console.log) với phông chữ mã. Dùng thẻ nào?",
        options: ["<code>", "<pre>", "<kbd>", "<samp>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Câu 'Chạy git status để kiểm tra' — tên lệnh giữa câu cần font monospace và ngữ nghĩa 'đây là mã'. Thẻ nào?",
        options: ["<code>", "<pre>", "<kbd>", "<tt>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Blog kỹ thuật nhắc tên biến userName giữa đoạn văn — người đọc nhận ra ngay đó là code nhờ thẻ nào?",
        options: ["<var> hoặc <b>", "<code>", "<i>", "<samp>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thư viện tô màu cú pháp (highlight.js) quét cấu trúc chuẩn nào?",
        options: [
          "<pre><code class=\"language-js\">...",
          "<div class=\"code\">...",
          "<script type=\"display\">...",
          "<code><pre>...",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Ký tự < và > bên trong khối code phải viết thế nào để không bị hiểu nhầm là thẻ?",
        options: [
          "Giữ nguyên < >",
          "Dùng &lt; và &gt;",
          "Bọc trong ngoặc kép",
          "Thêm dấu \\ phía trước",
        ],
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
        prompt: "Bạn dán một đoạn code nhiều dòng và muốn GIỮ NGUYÊN khoảng trắng cùng các dòng xuống. Dùng thẻ nào?",
        options: ["<p>", "<pre>", "<code>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Log lỗi server dán vào trang bị DỒN thành một dòng — bọc bằng thẻ nào để giữ nguyên từng dòng như bản gốc?",
        options: ["<pre>", "<p>", "<code>", "<blockquote>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Tranh ASCII art cần MỌI khoảng trắng đứng đúng chỗ — trình duyệt không được gộp. Thẻ nào?",
        options: ["<div>", "<pre>", "<span>", "<art>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao trình duyệt thường hiển thị <pre> bằng font monospace?",
        options: [
          "Bắt buộc theo chuẩn",
          "Style mặc định — để các cột ký tự thẳng hàng, hợp với code/log",
          "Do CSS của trang",
          "Vì pre chỉ chứa code",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Khối code dài tràn bề ngang <pre> — cách xử lý gọn là gì?",
        options: [
          "Cắt bớt code",
          "CSS overflow-x: auto cho thanh cuộn ngang",
          "Giảm cỡ chữ về 6px",
          "Đổi sang <p>",
        ],
        correctIndex: 1,
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
        prompt: "Muốn một đường kẻ ngang phân tách hai chủ đề khác nhau trên trang. Dùng thẻ nào?",
        options: ["<br>", "<hr>", "<line>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Truyện chuyển cảnh từ 'hiện tại' sang 'hồi tưởng' — dấu phân cách ngang mang nghĩa ĐỔI MẠCH dùng thẻ nào?",
        options: ["<br>", "<hr>", "<div line>", "<sep>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Giữa phần bài viết và khối bình luận cần một vạch ngang có sẵn không cần CSS — thẻ rỗng nào?",
        options: ["<hr>", "<line>", "<border>", "<u>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<hr> khác đường kẻ vẽ bằng CSS border ở điểm nào?",
        options: [
          "Không khác gì",
          "<hr> mang NGỮ NGHĨA 'chuyển chủ đề'; border chỉ là trang trí thị giác",
          "<hr> đậm hơn",
          "border hiện trên mobile, <hr> thì không",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Đổi màu và độ dày của <hr> bằng cách nào?",
        options: [
          "Thuộc tính color và size trên thẻ",
          "CSS (border, height, background) — thuộc tính trang trí trên thẻ đã lỗi thời",
          "Không đổi được",
          "Lồng <hr> trong <b>",
        ],
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
        prompt: "Trong trang kết quả tìm kiếm, muốn làm nổi bật từ khóa khớp bằng nền vàng có ngữ nghĩa. Dùng thẻ nào?",
        options: ["<mark>", "<strong>", "<span>", "<em>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Tính năng tìm kiếm trong trang TÔ NỀN VÀNG mọi từ khớp từ khóa — mỗi từ khớp bọc bằng thẻ nào?",
        options: ["<mark>", "<u>", "<strong>", "<span style=\"background:yellow\">"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong đoạn trích đề thi, cụm liên quan trực tiếp đến câu hỏi cần nổi như bút dạ quang — thẻ nào?",
        options: ["<em>", "<mark>", "<b>", "<ins>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<mark> mang nghĩa gì khác với <strong>?",
        options: [
          "Giống nhau, chỉ khác màu",
          "Nổi bật do LIÊN QUAN trong ngữ cảnh hiện tại; strong là quan trọng vốn có",
          "<mark> đậm hơn",
          "<mark> chỉ dùng trong form",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Đổi màu nền mặc định (vàng) của <mark> được không?",
        options: [
          "Không — màu cố định",
          "Được — CSS mark { background: ... } như mọi phần tử",
          "Chỉ đổi được sang cam",
          "Phải dùng thuộc tính color",
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
        prompt: "Cần viết công thức nước H2O với số 2 nằm ở DƯỚI. Dùng thẻ nào cho số 2?",
        options: ["<sup>", "<sub>", "<small>", "<i>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Bài hóa học viết CO₂ — số 2 nhỏ TỤT XUỐNG dưới dòng dùng thẻ nào?",
        options: ["<sup>", "<sub>", "<small>", "<down>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Ký hiệu toán x₁, x₂ — chỉ số nhỏ nằm thấp bên phải biến dùng thẻ gì?",
        options: ["<sub>", "<sup>", "<i>", "<var>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Trình duyệt hiển thị nội dung <sub> thế nào?",
        options: [
          "Chữ nhỏ hơn, hạ thấp dưới đường cơ sở của dòng",
          "Chữ nhỏ hơn, nâng cao lên",
          "In đậm và thu nhỏ",
          "Gạch chân",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Trường hợp nào dùng <sub> là SAI ngữ nghĩa?",
        options: [
          "Công thức hóa học H₂O",
          "Chỉ số biến toán học",
          "Thu nhỏ chữ ghi chú bản quyền cuối trang cho đẹp",
          "Ký hiệu logₐ",
        ],
        correctIndex: 2,
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
        prompt: "Cần viết x mũ 2 (x²) với số 2 nằm ở TRÊN. Dùng thẻ nào cho số 2?",
        options: ["<sub>", "<sup>", "<b>", "<small>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Diện tích 50m² — số 2 nhỏ BAY LÊN trên dùng thẻ nào?",
        options: ["<sub>", "<top>", "<sup>", "<small>"],
        correctIndex: 2,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Chú thích nguồn kiểu Wikipedia: số [1] nhỏ nằm cao cạnh câu, bấm nhảy xuống mục tham khảo — số đó bọc thẻ gì?",
        options: ["<sup>", "<cite>", "<sub>", "<ref>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Viết x² + y³ cần cấu trúc nào?",
        options: [
          "x<sup>2</sup> + y<sup>3</sup>",
          "x<sub>2</sub> + y<sub>3</sub>",
          "x^2 + y^3 tự hiển thị đúng",
          "x<pow>2</pow>",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Mẹo nhớ phân biệt sub/sup?",
        options: [
          "sub = subscript (chìm xuống); sup = superscript (siêu/lên trên)",
          "sub = lên trên vì s đứng trước",
          "Hai thẻ như nhau",
          "sup là viết tắt của support",
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
        prompt: "Trang giới thiệu cần nhúng một video clip có nút phát/dừng ngay trên trang. Dùng thẻ nào?",
        options: ["<video>", "<media>", "<embed>", "<iframe>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Khóa học upload bài giảng .mp4 lên server riêng (không dùng YouTube) — phát trực tiếp trong trang bằng thẻ nào?",
        options: ["<iframe>", "<video>", "<embed>", "<media>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Card sản phẩm cần đoạn demo xoay 360° tự phát, không tiếng, lặp vô hạn (thay GIF) — thẻ nào?",
        options: ["<img loop>", "<gif>", "<video autoplay muted loop>", "<animation>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao video autoplay phải kèm muted?",
        options: [
          "Để tiết kiệm pin",
          "Trình duyệt chặn tự phát có âm thanh để không làm phiền người dùng",
          "muted giúp tải nhanh hơn",
          "Không cần kèm",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nội dung viết giữa <video> và </video> ('Trình duyệt không hỗ trợ video') hiển thị khi nào?",
        options: [
          "Luôn hiển thị dưới video",
          "Chỉ khi trình duyệt KHÔNG hỗ trợ thẻ video",
          "Khi video đang tải",
          "Khi bấm pause",
        ],
        correctIndex: 1,
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
        prompt: "Muốn nhúng một file nhạc nền có thanh điều khiển phát/dừng. Dùng thẻ nào?",
        options: ["<sound>", "<audio>", "<media>", "<music>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Nút 'Nghe phát âm' của từ điển bật file .mp3 đọc mẫu — phần tử nào chứa và phát file đó?",
        options: ["<audio>", "<sound>", "<voice>", "<video>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trang radio online cần trình phát CHỈ có thanh play/âm lượng, không khung hình — thẻ nào gọn đúng mục đích?",
        options: ["<video controls>", "<audio controls>", "<iframe>", "<player>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<audio> không có thuộc tính controls thì hiển thị thế nào?",
        options: [
          "Trình phát mặc định",
          "Không hiển thị gì — chỉ điều khiển được bằng JS",
          "Một nút play đơn giản",
          "Báo lỗi",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Podcast cần JS tự pause audio này khi audio khác bắt đầu phát — API nào dùng được trên phần tử audio?",
        options: [
          "element.pause() / element.play()",
          "element.stop()",
          "element.mute()",
          "Không điều khiển được bằng JS",
        ],
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
        prompt: "Muốn cung cấp nhiều định dạng (mp4, webm) cho cùng một video để trình duyệt tự chọn được. Dùng thẻ nào bên trong <video>?",
        options: ["<src>", "<source>", "<media>", "<option>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Một video có 2 bản .webm và .mp4 để mọi trình duyệt phát được — mỗi bản khai báo bằng thẻ con nào trong <video>?",
        options: ["<src>", "<source>", "<file>", "<track>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong <picture>, bản ảnh .avif hiện đại và .jpg dự phòng — bản .avif khai báo bằng thẻ nào?",
        options: ["<source>", "<img>", "<option>", "<alt>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Trình duyệt xử lý nhiều <source> trong video theo quy tắc nào?",
        options: [
          "Phát tất cả lần lượt",
          "Chọn nguồn ĐẦU TIÊN nó hỗ trợ, bỏ qua phần còn lại",
          "Chọn file nhẹ nhất",
          "Chọn ngẫu nhiên",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thứ tự các <source> trong <picture>/<video> nên xếp thế nào?",
        options: [
          "Định dạng tốt/hiện đại nhất lên TRƯỚC — trình duyệt lấy cái đầu tiên khớp",
          "Theo bảng chữ cái",
          "File nặng lên trước",
          "Thứ tự không quan trọng",
        ],
        correctIndex: 0,
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
        prompt: "Một biểu đồ kèm chú thích là khối minh họa độc lập có thể di chuyển nguyên khối. Bọc cả khối bằng thẻ nào?",
        options: ["<div>", "<figure>", "<section>", "<aside>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Biểu đồ + dòng chú thích 'Hình 2.1' phải dính nhau thành MỘT khối để CSS float cả cụm — thẻ bao là gì?",
        options: ["<div>", "<figure>", "<section>", "<picture>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Khối code ví dụ kèm dòng 'Ví dụ 3: vòng lặp for' — về ngữ nghĩa cả cụm minh họa này bọc bằng thẻ nào (không chỉ dành cho ảnh)?",
        options: ["<figure>", "<pre>", "<aside>", "<example>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Tiêu chí để bọc nội dung bằng <figure> là gì?",
        options: [
          "Cứ là ảnh thì bọc",
          "Nội dung minh họa ĐỘC LẬP — dời xuống phụ lục vẫn không đứt mạch văn bản chính",
          "Nội dung có chú thích",
          "Nội dung rộng quá 500px",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<figure> chứa được những gì?",
        options: [
          "Chỉ một <img>",
          "Ảnh, video, code, bảng, biểu đồ... kèm figcaption tùy chọn",
          "Chỉ ảnh và chú thích",
          "Chỉ nội dung tĩnh",
        ],
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
        prompt: "Bên trong <figure>, dòng chú thích mô tả cho ảnh nên dùng thẻ nào?",
        options: ["<caption>", "<figcaption>", "<p>", "<label>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Dưới tấm ảnh phóng sự trong figure là dòng 'Ảnh: Nguyễn Văn A' — dòng này dùng thẻ nào?",
        options: ["<caption>", "<figcaption>", "<small>", "<label>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Gallery tranh: tên tác phẩm hiện dưới mỗi bức trong khối figure — thẻ gì thay vì <p> thường?",
        options: ["<figcaption>", "<title>", "<cite>", "<dt>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vị trí hợp lệ của <figcaption> trong figure?",
        options: [
          "Bất kỳ đâu",
          "Con đầu tiên HOẶC con cuối cùng",
          "Chỉ được đứng cuối",
          "Ngoài thẻ figure",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<figcaption> khác <caption> thế nào?",
        options: [
          "Như nhau",
          "<figcaption> chú thích cho figure; <caption> là tiêu đề của table",
          "<caption> mới hơn",
          "<figcaption> chỉ dùng cho video",
        ],
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
        prompt: "Trang FAQ gồm các cặp 'thuật ngữ — định nghĩa' đi liền nhau. Nên dùng loại danh sách nào?",
        options: ["<ul>", "<ol>", "<dl>", "<table>"],
        correctIndex: 2,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Trang glossary: mỗi thuật ngữ kèm định nghĩa ngay dưới — cấu trúc khóa-giá trị này bọc bằng thẻ nào?",
        options: ["<ul>", "<dl>", "<table>", "<details>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Hóa đơn hiện 'Mã đơn: #123 / Ngày: 11/6 / Trạng thái: Đang giao' — metadata dạng cặp nhãn-giá trị dùng danh sách nào?",
        options: ["<ol>", "<dl>", "<ul>", "<li>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một <dt> có nhiều cách hiểu — cấu trúc dl cho phép gì?",
        options: [
          "Một dt theo sau bởi NHIỀU dd (nhiều định nghĩa cho một thuật ngữ)",
          "Chỉ đúng 1 dd mỗi dt",
          "dd phải đứng trước dt",
          "Không được quá 5 cặp",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Chọn <dl> thay vì <table> 2 cột khi nào?",
        options: [
          "Khi dữ liệu là cặp NHÃN-GIÁ TRỊ đơn giản, không cần so sánh theo hàng cột",
          "Khi có trên 10 dòng",
          "Khi cần kẻ viền",
          "Không bao giờ — table luôn đúng hơn",
        ],
        correctIndex: 0,
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
        prompt: "Trong danh sách mô tả, phần THUẬT NGỮ (vd 'Bảo hành') dùng thẻ nào?",
        options: ["<dt>", "<dd>", "<dl>", "<th>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Trong danh sách mô tả thông số, phần TÊN thông số ('CPU', 'RAM') nằm trong thẻ nào?",
        options: ["<dd>", "<li>", "<dt>", "<th>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Trong danh sách thông số 'CPU — Intel i7', <dt> giữ tên còn <dd> giữ mô tả. Quan hệ giữa <dt> và <dd> là gì?",
        options: ["<dd> là phần mô tả cho thuật ngữ <dt> đứng trước nó", "<dt> nằm trong <dd>", "Hai thẻ không liên quan", "<dd> phải đứng trước <dt>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "FAQ dựng bằng dl: phần CÂU HỎI 'Ship mất mấy ngày?' nằm trong thẻ nào?",
        options: ["<dd>", "<dt>", "<dq>", "<li>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Cặp thông số 'CPU — Intel i7': từ 'CPU' (tên thông số) dùng thẻ gì?",
        options: ["<dt>", "<dd>", "<th>", "<b>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Viết một danh sách mô tả <dl> cho mục FAQ. Quy tắc thứ tự đặt <dt> và <dd> là gì?",
        options: [
          "dt đứng trước, các dd mô tả nó theo ngay sau",
          "dd trước dt sau",
          "Xen kẽ tùy ý",
          "dt và dd phải bằng số lượng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "dt là viết tắt của gì — giúp nhớ vai trò của thẻ?",
        options: [
          "description term — thuật ngữ được mô tả",
          "data table",
          "document title",
          "định tên (tiếng Việt)",
        ],
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
        prompt: "Trong danh sách mô tả, phần GIẢI THÍCH cho thuật ngữ dùng thẻ nào?",
        options: ["<dt>", "<dd>", "<li>", "<p>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "FAQ dựng bằng dl: phần CÂU TRẢ LỜI '3-5 ngày làm việc' nằm trong thẻ nào?",
        options: ["<dt>", "<da>", "<dd>", "<p>"],
        correctIndex: 2,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Cặp thông số 'RAM — 16GB': giá trị '16GB' dùng thẻ gì?",
        options: ["<dd>", "<dt>", "<td>", "<value>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Style mặc định nào giúp nhận ra <dd> trong trang chưa có CSS?",
        options: [
          "In đậm",
          "Thụt lề trái so với dt",
          "Có dấu chấm tròn",
          "Màu xám",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một thuật ngữ có 2 nghĩa khác nhau — viết thế nào trong dl?",
        options: [
          "Một <dt> theo sau bởi hai <dd>",
          "Hai <dt> giống nhau",
          "Gộp 2 nghĩa vào một <dd>, bắt buộc",
          "dl không hỗ trợ",
        ],
        correctIndex: 0,
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
        prompt: "Muốn nhóm riêng (các) hàng tiêu đề của bảng để dễ tạo kiểu. Dùng thẻ nào?",
        options: ["<thead>", "<tbody>", "<header>", "<th>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "In bảng dài 5 trang giấy, hàng nhãn cột TỰ LẶP LẠI đầu mỗi trang — nhờ nhóm hàng đó nằm trong thẻ nào?",
        options: ["<thead>", "<header>", "<th>", "<caption>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "CSS position:sticky giữ hàng nhãn đứng yên khi cuộn bảng — selector áp lên thẻ nhóm nào?",
        options: ["<tbody>", "<thead>", "<tr> đầu tiên là duy nhất đúng", "<table>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Dựng hàng nhãn cột cho bảng đặt trong <thead>. Bên trong <thead>, cấu trúc đúng là gì?",
        options: [
          "Các <th> đặt trực tiếp",
          "<tr> bọc ngoài, <th> bên trong",
          "<td> không được xuất hiện trong thead",
          "Chỉ một dòng văn bản",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Lợi ích NGỮ NGHĨA của thead so với để tr đầu trần trong bảng?",
        options: [
          "Tự in đậm hơn",
          "Máy đọc và công cụ hiểu rõ đâu là vùng nhãn; CSS/JS chọn vùng dễ dàng",
          "Bắt buộc mới render được",
          "Không có lợi gì",
        ],
        correctIndex: 1,
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
        prompt: "Muốn nhóm các hàng DỮ LIỆU CHÍNH của bảng, tách khỏi tiêu đề. Dùng thẻ nào?",
        options: ["<tbody>", "<thead>", "<main>", "<tr>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "JavaScript cần thêm hàng sản phẩm mới vào đúng phần thân bảng, không đụng phần nhãn cột. Phần thân đó là thẻ gì?",
        options: ["<body>", "<main>", "<tbody>", "<tfoot>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Bảng có đủ ba nhóm thead, tbody, tfoot. Thứ tự khai báo đúng của ba phần này là gì?",
        options: ["tbody → thead → tfoot", "thead → tbody → tfoot", "tfoot → tbody → thead", "Thứ tự nào cũng sai"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "JS render lại 100 dòng dữ liệu nhưng GIỮ NGUYÊN hàng nhãn — nó thay innerHTML của thẻ nhóm nào?",
        options: ["<table>", "<thead>", "<tbody>", "<tfoot>"],
        correctIndex: 2,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Viết table > tr trần không nhóm, DevTools cho thấy trình duyệt tự bọc các hàng vào thẻ nào?",
        options: ["<tbody>", "<thead>", "<div>", "Không bọc gì"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một bảng có được chứa NHIỀU <tbody> không?",
        options: [
          "Không — chỉ một",
          "Được — để nhóm các cụm hàng (vd Quý 1, Quý 2)",
          "Chỉ khi không có thead",
          "Chỉ tối đa hai",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "tbody đứng ở vị trí nào trong bảng chuẩn?",
        options: [
          "Sau thead, trước tfoot",
          "Trước thead",
          "Sau tfoot, bắt buộc",
          "Vị trí nào cũng sai nếu có caption",
        ],
        correctIndex: 0,
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
        prompt: "Bảng hóa đơn cần một hàng TỔNG CỘNG ở cuối, nhóm riêng. Dùng thẻ nào?",
        options: ["<tfoot>", "<footer>", "<tbody>", "<tr>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Bảng chi tiêu có dòng 'Tổng: 12.500.000đ' cuối cùng — nhóm dòng tổng này trong thẻ nào?",
        options: ["<footer>", "<tfoot>", "<tbottom>", "<total>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Bộ ba nhóm hàng của bảng: thead, tbody và thẻ nào dành cho hàng tổng kết?",
        options: ["<tfoot>", "<tend>", "<tlast>", "<summary>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "CSS in đậm + kẻ viền trên cho riêng khu tổng kết của mọi bảng — selector nào gọn nhất?",
        options: [
          "tfoot td { ... }",
          "tr:last-child luôn đúng mọi bảng",
          ".total từng ô",
          "table::after",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<tfoot> khác <footer> thế nào?",
        options: [
          "Như nhau",
          "<tfoot> là nhóm hàng cuối BẢNG; <footer> là chân TRANG/khối nội dung",
          "<footer> nằm trong bảng được",
          "<tfoot> đã lỗi thời",
        ],
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
        prompt: "Muốn đặt tiêu đề 'Bảng giá tháng 6' gắn liền ngay cho một bảng. Dùng thẻ nào?",
        options: ["<title>", "<caption>", "<h3>", "<legend>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Chuẩn kiểm toán: mỗi bảng phải có tiêu đề 'Bảng 3: Chi phí Q1' GẮN LIỀN với bảng — thẻ nào ngay sau <table>?",
        options: ["<h3>", "<caption>", "<title>", "<thead>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình đọc TÊN BẢNG trước khi đọc dữ liệu — tên đó đặt trong thẻ nào?",
        options: ["<caption>", "<label>", "<figcaption>", "<h4> trên bảng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Dùng <h3> đặt cạnh bảng thay cho <caption> thì thiếu gì?",
        options: [
          "Không thiếu gì",
          "Liên kết ngữ nghĩa giữa tiêu đề và bảng — máy đọc không biết h3 thuộc bảng nào",
          "Cỡ chữ",
          "SEO tốt hơn caption",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Muốn caption hiện DƯỚI bảng thay vì trên?",
        options: [
          "Chuyển thẻ xuống cuối table",
          "CSS caption-side: bottom — vị trí thẻ vẫn đầu table",
          "Dùng tfoot thay thế",
          "Không làm được",
        ],
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
        prompt: "Bên trong dropdown <select>, mỗi lựa chọn (S, M, L) dùng thẻ nào?",
        options: ["<li>", "<option>", "<item>", "<opt>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "63 dòng tỉnh thành bên trong dropdown — MỖI dòng là thẻ gì?",
        options: ["<li>", "<option>", "<item>", "<choice>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Gợi ý tự hoàn thành trong <datalist> được liệt kê bằng các thẻ con nào (giống trong select)?",
        options: ["<option>", "<li>", "<suggestion>", "<dd>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Đặt <option> bên ngoài select/datalist/optgroup thì sao?",
        options: [
          "Hiển thị như nút",
          "Vô nghĩa — option chỉ sống trong hộp chọn",
          "Tự biến thành li",
          "Gây trang trắng",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Option đầu 'Chọn tỉnh thành...' làm placeholder đúng chuẩn cần gì?",
        options: [
          "value=\"\" + disabled + selected (kèm required trên select)",
          "Chỉ cần chữ là đủ",
          "type=\"placeholder\"",
          "Đặt nó cuối danh sách",
        ],
        correctIndex: 0,
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
        prompt: "Muốn nhóm các trường 'Địa chỉ giao hàng' lại với một khung bao quanh. Dùng thẻ nào?",
        options: ["<group>", "<fieldset>", "<section>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Form khảo sát chia 3 phần, mỗi phần đóng KHUNG có viền sẵn của trình duyệt — thẻ nhóm nào?",
        options: ["<div>", "<fieldset>", "<section>", "<frame>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Nhóm radio 'Hình thức thanh toán' cần máy đọc màn hình giới thiệu TÊN NHÓM trước khi đọc từng lựa chọn — bọc bằng gì (kèm legend)?",
        options: ["<fieldset>", "<label>", "<optgroup>", "<ul>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao nhóm radio/checkbox NÊN bọc fieldset + legend?",
        options: [
          "Để có viền đẹp",
          "Label từng ô chỉ mô tả ô đó — tên nhóm chung cần legend mới đến được máy đọc màn hình",
          "Bắt buộc mới hoạt động",
          "Để JS chọn nhanh",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<fieldset> khác <div> bọc form ở điểm nào?",
        options: [
          "Không khác",
          "Có ngữ nghĩa nhóm trường + hỗ trợ disabled cả nhóm + đi cặp legend",
          "Nhẹ hơn div",
          "Bắt buộc trong mọi form",
        ],
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
        prompt: "Muốn đặt tiêu đề 'Thông tin thanh toán' cho một nhóm <fieldset>. Dùng thẻ nào?",
        options: ["<legend>", "<caption>", "<label>", "<h3>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Dòng 'Địa chỉ giao hàng' nằm CHÈN LÊN viền khung nhóm — hiệu ứng mặc định của thẻ nào?",
        options: ["<legend>", "<label>", "<caption>", "<h4>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình đọc 'Hình thức thanh toán, nhóm' trước các radio — tên nhóm lấy từ thẻ nào?",
        options: ["<title>", "<legend>", "<caption>", "<strong>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một <fieldset> được chứa bao nhiêu thẻ <legend>?",
        options: [
          "Đúng một — và phải là thẻ con đầu tiên",
          "Bao nhiêu cũng được",
          "Một ở đầu, một ở cuối",
          "Không bắt buộc có nhưng tối đa ba",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Phân biệt legend / label / caption?",
        options: [
          "Cùng một thứ",
          "legend đặt tên NHÓM trường; label đặt tên MỘT ô nhập; caption đặt tên BẢNG",
          "label dùng được cho cả ba việc",
          "legend dành cho bảng",
        ],
        correctIndex: 1,
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
        prompt: "Thẻ ngoài cùng bao bọc TOÀN BỘ một trang web (cả head lẫn body) là thẻ nào?",
        options: ["<body>", "<html>", "<head>", "<main>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "document.documentElement trong JS trỏ đến thẻ nào?",
        options: ["<body>", "<html>", "<head>", "document"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Dark mode kiểu Tailwind: JS thêm class 'dark' lên thẻ NGOÀI CÙNG để CSS phủ toàn trang — thẻ nào?",
        options: ["<html>", "<body>", "<main>", "<div id=\"root\">"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Đơn vị CSS rem tính theo font-size của phần tử nào?",
        options: [
          "<body>",
          "Phần tử cha gần nhất",
          "<html> — root element",
          "Trình duyệt, không đổi được",
        ],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<html> chứa trực tiếp những gì?",
        options: [
          "Đúng hai thẻ: <head> và <body>",
          "Mọi thẻ tùy ý",
          "<header> và <footer>",
          "<!DOCTYPE> bên trong nó",
        ],
        correctIndex: 0,
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
        prompt: "Phần khai báo charset, title và link CSS — KHÔNG hiển thị trên trang — đặt trong thẻ nào?",
        options: ["<header>", "<head>", "<body>", "<meta>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "SEO specialist yêu cầu 'thêm meta description, canonical, favicon' — tất cả chỉnh trong khu vực nào?",
        options: ["<head>", "<header>", "<body>", "<footer>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Thẻ <title> đặt nhầm trong <body> bị trình duyệt dời đi — nơi hợp lệ của nó là thẻ nào?",
        options: ["<main>", "<head>", "<html> trực tiếp", "<nav>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nội dung trong <head> hiển thị ở đâu?",
        options: [
          "Đầu trang web",
          "KHÔNG hiển thị trong trang — chỉ là khai báo cho trình duyệt/công cụ",
          "Trên thanh địa chỉ",
          "Cuối trang",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Cặp phân biệt kinh điển: head vs header?",
        options: [
          "Là một",
          "head = metadata không hiển thị; header = vùng đầu trang NHÌN THẤY (logo, menu)",
          "header nằm trong head",
          "head mới hơn header",
        ],
        correctIndex: 1,
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
        prompt: "Toàn bộ nội dung NHÌN THẤY của trang (chữ, ảnh, nút) được đặt trong thẻ nào?",
        options: ["<main>", "<body>", "<html>", "<content>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "CSS đặt font chữ mặc định cho TOÀN BỘ nội dung nhìn thấy — selector thẻ nào?",
        options: ["html *", "body", "main", "p"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "document.body.appendChild(...) chèn phần tử vào đâu?",
        options: [
          "Vào <head>",
          "Vào cuối vùng nội dung hiển thị <body>",
          "Vào <html>",
          "Vào <main>",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Theo cách truyền thống (trước khi có defer), <script> đặt ở đâu để không chặn render?",
        options: [
          "Đầu <head>",
          "Cuối <body>, ngay trước thẻ đóng",
          "Trong <title>",
          "Sau </html>",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Nội dung gõ ngoài <body> (sau </body>) sẽ thế nào?",
        options: [
          "Hiển thị bình thường ở cuối — trình duyệt tự sửa, nhưng là HTML không hợp lệ",
          "Bị xóa hẳn",
          "Hiển thị đầu trang",
          "Báo lỗi trang trắng",
        ],
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
        prompt: "Muốn đặt tên trang hiện trên TAB của trình duyệt là 'ShopVN'. Dùng thẻ nào?",
        options: ["<h1>", "<title>", "<head>", "<name>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Dòng xanh đậm bấm được trong kết quả Google chính là nội dung thẻ nào của trang?",
        options: ["<h1>", "<title>", "<meta description>", "<header>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Bookmark trang thì tên gợi ý mặc định lấy từ đâu?",
        options: ["<title>", "<h1>", "URL", "<meta name=\"author\">"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thẻ nào BẮT BUỘC trong head theo chuẩn — thiếu là validator báo lỗi?",
        options: ["<meta>", "<link>", "<title>", "<script>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Mẫu title tốt cho SEO của trang sản phẩm là gì?",
        options: [
          "ShopVN",
          "Giày Nike Air Force 1 chính hãng | ShopVN — cụ thể, có từ khóa, kèm thương hiệu",
          "Trang sản phẩm",
          "index.html",
        ],
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
        prompt: "Cần khai báo bảng mã UTF-8 và viewport cho điện thoại trong <head>. Dùng thẻ nào?",
        options: ["<meta>", "<link>", "<info>", "<config>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Web trên điện thoại chữ BÉ XÍU như bản thu nhỏ desktop — head thiếu thẻ khai báo viewport nào?",
        options: ["<meta>", "<link>", "<style>", "<viewport>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Đoạn mô tả hiện dưới tiêu đề trong kết quả Google khai báo bằng thẻ nào (name=\"description\")?",
        options: ["<title>", "<meta>", "<p>", "<summary>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Vì sao một trang có thể chứa cả CHỤC thẻ <meta>?",
        options: [
          "Lỗi của dev",
          "Mỗi thẻ khai báo một mẩu metadata khác nhau: charset, viewport, description, og:image...",
          "Để tải nhanh hơn",
          "Trình duyệt yêu cầu đủ 10 thẻ",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<meta name=\"robots\" content=\"noindex\"> có tác dụng gì?",
        options: [
          "Chặn người dùng copy trang",
          "Yêu cầu công cụ tìm kiếm KHÔNG đưa trang vào kết quả",
          "Chặn bot DDoS",
          "Tắt JavaScript",
        ],
        correctIndex: 1,
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
        prompt: "Cần một KHỐI bao quanh để dàn bố cục bằng CSS, không mang ngữ nghĩa riêng. Dùng thẻ nào?",
        options: ["<span>", "<div>", "<section>", "<box>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Cần wrapper để CSS Grid chia trang 2 cột — không thẻ ngữ nghĩa nào khớp vai trò. Dùng gì?",
        options: ["<div>", "<section>", "<table>", "<span>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Toast notification do JS chèn vào góc màn hình — khối chứa vô danh này là thẻ gì?",
        options: ["<aside>", "<div>", "<alert>", "<p>"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Quy trình chọn thẻ đúng: khi nào mới đến lượt <div>?",
        options: [
          "Luôn dùng div trước cho nhanh",
          "Sau khi đã cân nhắc các thẻ ngữ nghĩa (header, main, section...) đều không khớp",
          "Khi nội dung quan trọng",
          "Khi cần inline",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "'Div soup' (trang toàn div lồng nhau) gây hại gì?",
        options: [
          "Trang chậm gấp đôi",
          "Máy đọc màn hình và SEO không hiểu cấu trúc; code khó bảo trì",
          "Không hại gì",
          "CSS không hoạt động",
        ],
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
        prompt: "Muốn nạp file style.css vào trang (đặt trong <head>). Dùng thẻ nào?",
        options: ["<style>", "<link>", "<script>", "<a>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Google Fonts đưa một thẻ để dán vào head nạp font — thẻ rỗng nào (không phải script)?",
        options: ["<font>", "<link>", "<style src>", "<import>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Favicon hiện trên tab trình duyệt khai báo bằng thẻ nào trong head?",
        options: ["<img>", "<icon>", "<link>", "<meta>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "SEO: trang có nhiều URL trỏ cùng nội dung — khai báo URL chính thức bằng gì?",
        options: [
          "<link rel=\"canonical\" href=\"...\">",
          "<meta name=\"main-url\">",
          "<a rel=\"canonical\">",
          "Không cần khai báo",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Ba thẻ dễ nhầm: nạp CSS, liên kết bấm được, nạp JS — lần lượt là gì?",
        options: [
          "<link> / <a> / <script>",
          "<a> / <link> / <script>",
          "<link> / <script> / <a>",
          "<style> / <a> / <js>",
        ],
        correctIndex: 0,
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
        prompt: "Muốn nạp file app.js để trang có tương tác. Dùng thẻ nào?",
        options: ["<js>", "<script>", "<link>", "<code>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Nút hamburger menu cần JS mở/đóng khi bấm — code đó nằm trong thẻ nào?",
        options: ["<script>", "<style>", "<code>", "<js>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Google Analytics yêu cầu dán đoạn mã theo dõi vào trang — đoạn đó là thẻ gì?",
        options: ["<meta>", "<track>", "<script>", "<analytics>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<script src=\"app.js\"> có cần thẻ đóng không?",
        options: [
          "Không — nó là void element",
          "Có — script LUÔN cần </script> kể cả khi nạp file ngoài",
          "Chỉ cần khi có code inline",
          "Tùy trình duyệt",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Script vừa có src vừa có code inline bên trong thì sao?",
        options: [
          "Chạy cả hai",
          "Chỉ nạp file từ src — code inline bị BỎ QUA",
          "Chỉ chạy code inline",
          "Báo lỗi cú pháp",
        ],
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
        prompt: "Phần đầu trang chứa logo và thanh tìm kiếm. Dùng thẻ ngữ nghĩa nào để bọc khối đó?",
        options: ["<head>", "<header>", "<top>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Khối logo + ô tìm kiếm + giỏ hàng lặp lại đầu mọi trang shop — thẻ ngữ nghĩa bao ngoài?",
        options: ["<head>", "<header>", "<top>", "<nav>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Card bài viết có cụm 'tiêu đề + avatar + ngày đăng' ở đầu — cụm này bọc bằng thẻ nào trong article?",
        options: ["<header>", "<head>", "<hgroup> là duy nhất đúng", "<title>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một trang dùng được bao nhiêu <header>?",
        options: [
          "Đúng 1",
          "Nhiều — trang một cái, mỗi article/section có thể có cái riêng",
          "Tối đa 2",
          "Không giới hạn nhưng phải lồng nhau",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Máy đọc màn hình coi <header> cấp trang là landmark nào?",
        options: ["banner", "heading", "top", "masthead"],
        correctIndex: 0,
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
        prompt: "Thanh chứa các liên kết điều hướng chính (Trang chủ, Sản phẩm, Liên hệ). Bọc bằng thẻ ngữ nghĩa nào?",
        options: ["<nav>", "<menu>", "<ul>", "<header>"],
        correctIndex: 0,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Máy đọc màn hình có phím tắt nhảy đến 'navigation landmark' — menu phải bọc bằng thẻ nào?",
        options: ["<menu>", "<nav>", "<ul>", "<header>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Sidebar tài liệu chứa cây link đến từng chương — khối điều hướng này dùng thẻ ngữ nghĩa gì?",
        options: ["<nav>", "<aside> là duy nhất đúng", "<list>", "<index>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Footer có 30 link lặt vặt — có nên bọc tất cả bằng <nav>?",
        options: [
          "Có — cứ nhiều link là nav",
          "Không — nav dành cho khối điều hướng CHÍNH; link phụ trong footer không cần",
          "Bắt buộc bọc",
          "Footer không được chứa link",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Bên trong <nav>, các link thường tổ chức thế nào?",
        options: [
          "<ul> các <li> chứa <a> — vì menu là danh sách mục ngang hàng",
          "Các <a> dính liền không cần cấu trúc, là chuẩn bắt buộc",
          "<table> các hàng",
          "<select> các option",
        ],
        correctIndex: 0,
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
        prompt: "Nội dung CHÍNH và duy nhất của trang (không gồm header/footer). Bọc bằng thẻ ngữ nghĩa nào?",
        options: ["<content>", "<main>", "<section>", "<body>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Reader mode của trình duyệt trích đúng phần bài viết, bỏ header/sidebar — nó ưu tiên thẻ nào?",
        options: ["<article> trong <main>", "<main>", "<body>", "<content>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Giữa header và footer giống nhau mọi trang, phần nội dung THAY ĐỔI theo từng trang bọc bằng gì?",
        options: ["<main>", "<section>", "<div id=\"content\">", "<page>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Quy tắc nào đúng với <main>?",
        options: [
          "Mỗi trang nhiều main để chia cột",
          "Một main/trang; không nằm trong header, footer, nav, article, aside",
          "main phải là thẻ đầu tiên của body",
          "main thay thế được body",
        ],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Link 'Bỏ qua đến nội dung chính' (skip link) cho người dùng bàn phím trỏ đến đâu?",
        options: [
          "Đầu trang",
          "id đặt trên thẻ <main>",
          "Thẻ <h1>",
          "Cuối trang",
        ],
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
        prompt: "Trang chủ chia thành các phần theo chủ đề, mỗi phần có tiêu đề riêng. Dùng thẻ ngữ nghĩa nào cho mỗi phần?",
        options: ["<div>", "<section>", "<article>", "<part>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Trang giới thiệu chia khối 'Sứ mệnh / Đội ngũ / Đối tác', mỗi khối có h2 riêng nhưng không tự đứng độc lập — thẻ nào?",
        options: ["<article>", "<section>", "<div>", "<part>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Code review: 'div này có heading và là một phần nội dung theo chủ đề — nâng cấp sang thẻ nào?'",
        options: ["<section>", "<span>", "<main>", "<b>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Dấu hiệu nên dùng section thay div?",
        options: [
          "Khối có CHỦ ĐỀ riêng và (nên có) heading riêng",
          "Khối có trên 3 phần tử con",
          "Khối cần bo góc",
          "Mọi khối đều nên là section",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Trong một bài hướng dẫn (article), các phần 'Chuẩn bị / Các bước / Lưu ý' chia bằng gì?",
        options: [
          "Các <article> con",
          "Các <section> bên trong article",
          "Các <aside>",
          "Các <main> nhỏ",
        ],
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
        prompt: "Một bài blog hoàn chỉnh tự đứng được, có thể chia sẻ riêng. Bọc bằng thẻ ngữ nghĩa nào?",
        options: ["<section>", "<article>", "<div>", "<post>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "RSS reader trích từng TIN trong trang tổng hợp — mỗi tin trọn vẹn bọc bằng thẻ nào?",
        options: ["<article>", "<section>", "<item>", "<news>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Mỗi BÌNH LUẬN (tác giả + thời gian + nội dung) trong khu comment — về ngữ nghĩa là thẻ gì?",
        options: ["<aside>", "<p>", "<article>", "<reply>"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Bài kiểm tra nhanh 'nên dùng article?': câu hỏi nào đúng?",
        options: [
          "Nội dung này TÁCH RIÊNG ra (RSS, trang khác) còn trọn nghĩa không?",
          "Nội dung này có dài hơn 100 từ không?",
          "Nội dung này có ảnh không?",
          "Nội dung này có quan trọng không?",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "article lồng trong article (bình luận trong bài viết) có hợp lệ không?",
        options: [
          "Không — cấm lồng",
          "Hợp lệ — article con liên quan đến article cha (comment thuộc bài viết)",
          "Chỉ lồng tối đa 1 cấp, hơn là lỗi parse",
          "Phải đổi con thành section",
        ],
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
        prompt: "Cột bên phải chứa quảng cáo và 'bài liên quan' — nội dung phụ bên lề. Dùng thẻ ngữ nghĩa nào?",
        options: ["<side>", "<aside>", "<section>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Hộp 'Có thể bạn quan tâm' cạnh bài viết — xóa đi bài chính vẫn nguyên vẹn. Thẻ ngữ nghĩa nào?",
        options: ["<sidebar>", "<aside>", "<section>", "<related>"],
        correctIndex: 1,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Khung 'Thuật ngữ: SRS là gì?' chen giữa bài học để giải thích thêm, ngoài mạch chính — bọc bằng gì?",
        options: ["<aside>", "<blockquote>", "<mark>", "<note>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Máy đọc màn hình gọi vùng <aside> là landmark nào?",
        options: ["complementary", "banner", "extra", "secondary"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Tiêu chí phân biệt aside với section?",
        options: [
          "aside hẹp hơn về bề ngang",
          "Nội dung aside chỉ BỔ TRỢ — cắt bỏ không ảnh hưởng mạch chính; section là một phần của mạch chính",
          "aside luôn nằm bên phải",
          "section không chứa link",
        ],
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
        prompt: "Cuối trang chứa thông tin bản quyền và liên kết chính sách. Bọc bằng thẻ ngữ nghĩa nào?",
        options: ["<bottom>", "<footer>", "<foot>", "<div>"],
        correctIndex: 1,
      },
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
        tier: 1, type: T.MCQ,
        prompt: "Khối cuối mọi trang: '© 2026', link Chính sách, icon mạng xã hội — thẻ ngữ nghĩa nào?",
        options: ["<footer>", "<tfoot>", "<bottom>", "<end>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: T.MCQ,
        prompt: "Cuối mỗi bình luận có dòng 'Trả lời · Thích · 2 giờ trước' — phần kết của riêng bình luận bọc bằng gì?",
        options: ["<small>", "<footer>", "<tfoot>", "<div class=\"end\">"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Máy đọc màn hình coi <footer> cấp trang là landmark nào?",
        options: ["contentinfo", "bottombar", "footer-region", "info"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "footer của bảng dữ liệu (hàng tổng) dùng thẻ nào — KHÔNG phải <footer>?",
        options: ["<tfoot>", "<tbottom>", "<caption>", "<footer> vẫn đúng"],
        correctIndex: 0,
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

// Seed KHÔNG phá hủy: upsert thẻ theo name, khớp câu hỏi theo (tagId, tier, prompt)
// — mỗi bậc có thể có NHIỀU biến thể. Tuyệt đối không xóa UserTagProgress.
async function main() {
  let order = 0;
  for (const t of tags) {
    const tag = await prisma.tag.upsert({
      where: { track_name: { track: "html", name: t.name } },
      update: { topic: t.topic, description: t.description, order },
      create: { track: "html", name: t.name, topic: t.topic, description: t.description, order },
    });
    order++;

    for (const q of t.questions) {
      const data = {
        type: q.type,
        options: q.options ?? Prisma.DbNull,
        correctIndex: q.correctIndex ?? null,
        requirements: q.requirements ?? Prisma.DbNull,
        starterCode: q.starterCode ?? null,
        answer: q.answer ?? null,
      };
      const existing = await prisma.question.findFirst({
        where: { tagId: tag.id, tier: q.tier, prompt: q.prompt },
      });
      if (existing) {
        await prisma.question.update({ where: { id: existing.id }, data });
      } else {
        await prisma.question.create({
          data: { ...data, prompt: q.prompt, tagId: tag.id, tier: q.tier },
        });
      }
    }

    // Dọn câu hỏi của thẻ không còn trong seed (câu bị viết lại prompt cũng được thay sạch)
    await prisma.question.deleteMany({
      where: {
        tagId: tag.id,
        NOT: { OR: t.questions.map((q) => ({ tier: q.tier, prompt: q.prompt })) },
      },
    });
  }

  // Dọn thẻ HTML không còn trong seed — TUYỆT ĐỐI giới hạn track html,
  // không được đụng dữ liệu của track khác (css...)
  await prisma.tag.deleteMany({
    where: { track: "html", name: { notIn: tags.map((t) => t.name) } },
  });

  const [tagCount, qCount, progressCount] = await Promise.all([
    prisma.tag.count({ where: { track: "html" } }),
    prisma.question.count({ where: { tag: { track: "html" } } }),
    prisma.userTagProgress.count({ where: { tag: { track: "html" } } }),
  ]);
  console.log(
    `Đã seed ${tagCount} thẻ, ${qCount} câu hỏi — giữ nguyên ${progressCount} bản ghi tiến độ`
  );
}

// Cho phép import `tags` mà KHÔNG chạy seed (vd script đổi tên prompt tại chỗ).
if (process.env.SEED_IMPORT_ONLY !== "1")
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
  .finally(() => prisma.$disconnect());
