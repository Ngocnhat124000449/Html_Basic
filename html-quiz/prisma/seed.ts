import "dotenv/config";
import { PrismaClient, QuestionType } from "../src/generated/prisma/client";
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
        prompt: "Thẻ <h1> dùng để làm gì?",
        options: ["Tạo tiêu đề quan trọng nhất của trang", "In đậm văn bản", "Tạo đoạn văn", "Tạo liên kết"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Một trang web nên có bao nhiêu thẻ <h1>?",
        options: ["Bao nhiêu cũng được", "Chỉ nên có 1", "Ít nhất 6", "Không được dùng"],
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
        prompt: "Thẻ <p> dùng để làm gì?",
        options: ["Tạo đường kẻ ngang", "Tạo đoạn văn bản", "Tạo bảng", "Chèn ảnh"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Hai thẻ <p> liền nhau được trình duyệt hiển thị thế nào?",
        options: ["Trên cùng một dòng", "Hai khối riêng, có khoảng cách giữa chúng", "Chồng lên nhau", "Đoạn sau bị ẩn"],
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
        prompt: "Thẻ <strong> dùng để làm gì?",
        options: ["Nghiêng chữ", "Gạch chân", "Đánh dấu nội dung quan trọng (hiển thị đậm)", "Phóng to chữ"],
        correctIndex: 2,
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
        prompt: "Thẻ <em> dùng để làm gì?",
        options: ["Nhấn mạnh ngữ điệu (hiển thị nghiêng)", "In đậm", "Tạo emoji", "Căn giữa văn bản"],
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
        prompt: "Thẻ <br> dùng để làm gì?",
        options: ["Tạo đường kẻ ngang", "Ngắt xuống dòng", "Tạo khoảng trắng", "Kết thúc trang"],
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
        prompt: "Thẻ <a> dùng để làm gì?",
        options: ["Tạo âm thanh", "Tạo chữ in đậm", "Tạo liên kết", "Tạo danh sách"],
        correctIndex: 2,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute nào chứa địa chỉ đích của liên kết?",
        options: ["src", "href", "link", "url"],
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
        prompt: "Thẻ <img> dùng để làm gì?",
        options: ["Hiển thị hình ảnh", "Tạo khung viền", "Nhúng video", "Đổi màu nền"],
        correctIndex: 0,
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
        prompt: "Thẻ <ul> tạo loại danh sách nào?",
        options: ["Danh sách đánh số 1, 2, 3", "Danh sách không thứ tự (chấm tròn)", "Danh sách thả xuống", "Danh sách định nghĩa"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Thẻ con trực tiếp hợp lệ của <ul> là gì?",
        options: ["<p>", "<item>", "<li>", "<option>"],
        correctIndex: 2,
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
        prompt: "Thẻ <ol> tạo loại danh sách nào?",
        options: ["Danh sách chấm tròn", "Danh sách có thứ tự (đánh số)", "Danh sách ngang", "Bảng dữ liệu"],
        correctIndex: 1,
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
        prompt: "Thẻ <li> dùng để làm gì?",
        options: ["Tạo đường kẻ", "Tạo một mục trong danh sách", "Tạo liên kết", "Tạo nhãn"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<li> dùng được bên trong những thẻ nào?",
        options: ["Chỉ <ul>", "Chỉ <ol>", "Cả <ul> và <ol>", "Bất kỳ thẻ nào"],
        correctIndex: 2,
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
        prompt: "Thẻ <table> dùng để làm gì?",
        options: ["Tạo bảng dữ liệu", "Dàn layout trang", "Tạo lưới ảnh", "Tạo khung nhập liệu"],
        correctIndex: 0,
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
        prompt: "Thẻ <tr> dùng để làm gì?",
        options: ["Tạo một cột của bảng", "Tạo một hàng của bảng", "Tạo tiêu đề bảng", "Tạo đường viền bảng"],
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
        prompt: "Thẻ <td> dùng để làm gì?",
        options: ["Tạo ô dữ liệu trong bảng", "Tạo tiêu đề cột", "Tạo dòng mới", "Tạo chú thích bảng"],
        correctIndex: 0,
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
        prompt: "Thẻ <th> dùng để làm gì?",
        options: ["Tạo ô tiêu đề của bảng", "Tạo hàng cuối bảng", "Tạo viền đậm", "Gộp hai bảng"],
        correctIndex: 0,
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
        prompt: "Thẻ <form> dùng để làm gì?",
        options: ["Tạo khung trang trí", "Tạo biểu mẫu thu thập dữ liệu", "Tạo bảng", "Định dạng văn bản"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "Attribute action của <form> làm gì?",
        options: ["Đặt hiệu ứng động", "Đặt địa chỉ nhận dữ liệu khi submit", "Đặt tên form", "Tự động điền dữ liệu"],
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
        prompt: "Thẻ <input> dùng để làm gì?",
        options: ["Hiển thị kết quả", "Tạo ô cho người dùng nhập dữ liệu", "Nhập file CSS", "Tạo nút điều hướng"],
        correctIndex: 1,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<input type=\"email\"> có tác dụng gì?",
        options: ["Tự gửi email", "Trình duyệt kiểm tra định dạng email khi submit", "Mở ứng dụng email", "Mã hóa nội dung nhập"],
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
        prompt: "Thẻ <label> dùng để làm gì?",
        options: ["Tạo nhãn mô tả cho ô nhập liệu", "Tạo nhãn giá sản phẩm", "Đặt tiêu đề trang", "Tạo tooltip"],
        correctIndex: 0,
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
        prompt: "Thẻ <button> dùng để làm gì?",
        options: ["Tạo nút bấm", "Tạo ô đánh dấu", "Tạo menu", "Tạo huy hiệu"],
        correctIndex: 0,
      },
      {
        tier: 2, type: T.MCQ,
        prompt: "<button type=\"submit\"> bên trong form có tác dụng gì?",
        options: ["Xóa toàn bộ dữ liệu form", "Gửi dữ liệu form đi", "Đóng form", "Không làm gì"],
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
        prompt: "Thẻ <textarea> dùng để làm gì?",
        options: ["Tạo vùng hiển thị code", "Tạo ô nhập văn bản nhiều dòng", "Tạo vùng kéo thả file", "Tạo chú thích"],
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
        prompt: "Thẻ <select> dùng để làm gì?",
        options: ["Bôi đen văn bản", "Tạo danh sách chọn thả xuống", "Chọn file", "Tạo bộ lọc tìm kiếm"],
        correctIndex: 1,
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
];

async function main() {
  await prisma.attempt.deleteMany();
  await prisma.userTagProgress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.tag.deleteMany();

  let order = 0;
  for (const t of tags) {
    await prisma.tag.create({
      data: {
        name: t.name,
        topic: t.topic,
        description: t.description,
        order: order++,
        questions: {
          create: t.questions.map((q) => ({
            tier: q.tier,
            type: q.type,
            prompt: q.prompt,
            options: q.options ?? undefined,
            correctIndex: q.correctIndex,
            requirements: q.requirements ?? undefined,
            starterCode: q.starterCode,
            answer: q.answer,
          })),
        },
      },
    });
  }
  const qCount = await prisma.question.count();
  console.log(`Đã seed ${tags.length} thẻ, ${qCount} câu hỏi`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
