import type { ReactSeedTag } from "./types";

const PART = "Effect, Danh sách & Điều kiện";

// PHẦN 3 — Effect, Danh sách & Điều kiện (Tuần 20): render danh sách (.map + key),
// render có điều kiện, useEffect, và Todo (form + list — milestone tháng 5).
// Bậc 3 WRITE_JSX: spec render (so HTML) cho list/điều kiện; spec interact
// (react-test-renderer, act() chạy cả useEffect) cho effect và Todo.
export const PART3_EFFECT_DANH_SACH: ReactSeedTag[] = [
  // ===== CHƯƠNG: RENDER DANH SÁCH =====
  {
    name: "render danh sách",
    topic: "Render danh sách",
    part: PART,
    description: "Biến mảng dữ liệu thành nhiều phần tử bằng .map + key",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn có mảng 10 sản phẩm và muốn hiển thị mỗi sản phẩm thành một card trên trang. Dùng gì để sinh ra 10 card đó?",
        options: [
          ".map() trên mảng sản phẩm",
          "Một vòng for ngoài JSX",
          "Copy đoạn JSX 10 lần",
          "Một biến đếm",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để render một mảng dữ liệu thành nhiều phần tử JSX, bạn dùng gì?",
        options: ["Phương thức .map()", "Vòng for trong JSX", "Câu lệnh print", "Thẻ <loop>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Mỗi phần tử trong danh sách render nên có thuộc tính đặc biệt nào?",
        options: ["key", "id bắt buộc", "index2", "ref"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Thuộc tính key giúp React làm gì?",
        options: [
          "Nhận biết phần tử nào thay đổi để cập nhật hiệu quả",
          "Tô màu phần tử",
          "Sắp xếp mảng",
          "Xóa mảng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "key của mỗi phần tử danh sách nên là gì?",
        options: [
          "Một giá trị duy nhất và ổn định (vd id)",
          "Một số ngẫu nhiên mỗi lần render",
          "Luôn luôn là 0",
          "Tên component",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Biểu thức items.map(it => <li>{it}</li>) trả về gì?",
        options: ["Một mảng các phần tử <li>", "Một chuỗi", "Một số", "Một object rỗng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Dùng index của mảng làm key có nhược điểm gì khi danh sách đổi thứ tự?",
        options: [
          "Có thể gây render sai/nhầm phần tử",
          "Không có nhược điểm gì",
          "Làm app tắt",
          "Bị React cấm hoàn toàn",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component DanhSach nhận props.items (một mảng chuỗi) và render thành một thẻ <ul>, mỗi phần tử là một <li> (nhớ đặt key). Khi items là ['Táo','Cam'], kết quả phải là <ul><li>Táo</li><li>Cam</li></ul>.",
        requirements: [
          { type: "contains", text: "DanhSach", message: "Đặt tên component là DanhSach" },
          { type: "construct", construct: "map", message: "Dùng .map() để render danh sách" },
          {
            type: "renders",
            component: "DanhSach",
            props: { items: ["Táo", "Cam"] },
            htmlEquals: "<ul><li>Táo</li><li>Cam</li></ul>",
            message: "items=['Táo','Cam'] phải render <ul><li>Táo</li><li>Cam</li></ul>",
          },
        ],
        starterCode:
          "function DanhSach(props) {\n  // return <ul>{props.items.map((it, i) => <li key={i}>{it}</li>)}</ul>\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: RENDER CÓ ĐIỀU KIỆN =====
  {
    name: "render có điều kiện",
    topic: "Render có điều kiện",
    part: PART,
    description: "Hiển thị khác nhau tùy điều kiện bằng && và ? :",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Khi giỏ hàng trống, bạn muốn hiện dòng 'Giỏ hàng trống' thay vì danh sách sản phẩm. Kỹ thuật nào phù hợp?",
        options: [
          "Render có điều kiện",
          "Xóa hẳn component giỏ hàng",
          "Đổi màu nền bằng CSS",
          "Tải lại trang",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Render có điều kiện trong React nghĩa là gì?",
        options: [
          "Hiển thị phần tử khác nhau tùy điều kiện",
          "Luôn hiển thị mọi thứ",
          "Ẩn toàn bộ trang",
          "Tải lại trang",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Toán tử nào hay dùng để render khi điều kiện đúng (bỏ qua khi sai)?",
        options: ["&&", "||", "??", "**"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để chọn giữa HAI nhánh hiển thị, toán tử nào tiện nhất?",
        options: ["Ba ngôi điều kiện ? :", "Dấu +", "Dấu =", "Dấu %"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Biểu thức {online && <p>Hi</p>} hiển thị <p>Hi</p> khi nào?",
        options: ["Khi online là true", "Khi online là false", "Luôn luôn", "Không bao giờ"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Biểu thức {online ? 'Trực tuyến' : 'Ngoại tuyến'} làm gì?",
        options: [
          "Hiện 'Trực tuyến' nếu online đúng, ngược lại 'Ngoại tuyến'",
          "Luôn hiện cả hai",
          "Báo lỗi",
          "Hiện một con số",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi danh sách rỗng, cách xử lý hiển thị tốt là gì?",
        options: [
          "Render có điều kiện một thông báo 'trống'",
          "Để màn hình trắng",
          "Văng ra lỗi",
          "Tự thêm dữ liệu giả",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component TrangThai nhận props.online (kiểu boolean true/false). Dùng render có điều kiện trong một <span>: nếu online là true hiển thị Trực tuyến, nếu false hiển thị Ngoại tuyến. Kết quả: online true → <span>Trực tuyến</span>; online false → <span>Ngoại tuyến</span>.",
        requirements: [
          { type: "contains", text: "TrangThai", message: "Đặt tên component là TrangThai" },
          {
            type: "renders",
            component: "TrangThai",
            props: { online: true },
            htmlEquals: "<span>Trực tuyến</span>",
            message: "online=true phải render <span>Trực tuyến</span>",
          },
          {
            type: "renders",
            component: "TrangThai",
            props: { online: false },
            htmlEquals: "<span>Ngoại tuyến</span>",
            message: "online=false phải render <span>Ngoại tuyến</span>",
          },
        ],
        starterCode:
          "function TrangThai(props) {\n  // <span>{props.online ? 'Trực tuyến' : 'Ngoại tuyến'}</span>\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: USEEFFECT =====
  {
    name: "useeffect",
    topic: "useEffect",
    part: PART,
    description: "Chạy hiệu ứng phụ sau khi render (mount, deps)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Khi trang danh sách sản phẩm vừa mở, bạn muốn tự động gọi API lấy dữ liệu một lần. Đặt lời gọi đó ở đâu?",
        options: [
          "Trong useEffect với mảng phụ thuộc []",
          "Ngay giữa thân hàm render",
          "Trong một onClick",
          "Trong file CSS",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "useEffect dùng để làm gì trong React?",
        options: [
          "Chạy hiệu ứng phụ (side effect) sau khi render",
          "Khai báo state",
          "Tạo component",
          "Định nghĩa CSS",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Side effect (hiệu ứng phụ) là gì?",
        options: [
          "Việc ngoài render: gọi API, đặt timer, đọc localStorage...",
          "Một loại CSS",
          "Một thẻ HTML",
          "Một lỗi cú pháp",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "useEffect(() => {...}, []) với mảng rỗng [] chạy khi nào?",
        options: [
          "Một lần sau khi component mount",
          "Mỗi mili-giây",
          "Không bao giờ",
          "Khi đóng tab",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mảng phụ thuộc (dependency array) của useEffect dùng để làm gì?",
        options: [
          "Quyết định khi nào effect chạy lại",
          "Lưu state",
          "Tạo key",
          "Định nghĩa props",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "useEffect KHÔNG có mảng phụ thuộc (bỏ tham số thứ hai) thì chạy khi nào?",
        options: ["Sau MỌI lần render", "Chỉ một lần", "Không bao giờ", "Chỉ khi click"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Gọi API để lấy dữ liệu ban đầu nên đặt ở đâu?",
        options: [
          "Trong useEffect với mảng phụ thuộc []",
          "Ngay giữa thân render",
          "Bắt buộc trong onClick",
          "Trong file CSS",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component BangTin: dùng useState khởi tạo 'Đang tải', và useEffect chạy MỘT LẦN khi mount (mảng phụ thuộc []) để đặt state thành 'Đã tải'. Hiển thị state trong <p>. Sau khi mount xong, component phải hiển thị Đã tải.",
        requirements: [
          { type: "contains", text: "BangTin", message: "Đặt tên component là BangTin" },
          { type: "contains", text: "useEffect", message: "Dùng useEffect" },
          {
            type: "interacts",
            component: "BangTin",
            actions: [],
            textContains: "Đã tải",
            message: "Sau khi mount phải hiển thị Đã tải",
          },
        ],
        starterCode:
          "function BangTin() {\n  const [tin, setTin] = useState('Đang tải');\n  useEffect(() => {\n    // setTin('Đã tải')\n  }, []);\n  // <p>{tin}</p>\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: TODO (FORM + LIST) =====
  {
    name: "todo app",
    topic: "Todo: thêm & render",
    part: PART,
    description: "Ghép input + nút + danh sách thành app Todo nhỏ",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "App 'Danh sách việc cần làm' gồm ô nhập, nút Thêm và vùng hiển thị các việc. Đây là sự kết hợp của những kỹ thuật nào?",
        options: [
          "State (mảng + ô nhập) + sự kiện + render danh sách",
          "Chỉ CSS",
          "Chỉ một thẻ <ul> tĩnh",
          "Chỉ useEffect",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một app Todo cơ bản cần quản lý gì bằng state?",
        options: [
          "Danh sách công việc (mảng) và nội dung ô nhập",
          "Chỉ màu nền",
          "Một con số duy nhất",
          "Tên người dùng",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Thêm một việc vào danh sách todo nên làm gì với mảng state?",
        options: [
          "Tạo mảng mới gồm mảng cũ + việc mới rồi setState",
          "Sửa trực tiếp mảng cũ",
          "Xóa cả mảng",
          "Đổi tên component",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Hiển thị danh sách todo lên màn hình dùng gì?",
        options: [
          ".map() để render mỗi việc thành <li>",
          "Một thẻ <img>",
          "Vòng while ngoài JSX",
          "Một biến số",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên tạo mảng MỚI ([...cũ, mới]) thay vì push vào mảng cũ?",
        options: [
          "React so sánh tham chiếu — mảng mới mới kích hoạt render",
          "Vì push bị cấm",
          "Vì mảng cũ tự xóa",
          "Không có lý do gì",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sau khi thêm việc, để ô nhập trống lại ta làm gì?",
        options: [
          "Đặt lại state của ô nhập về chuỗi rỗng",
          "Tải lại trang",
          "Xóa component",
          "Không thể làm được",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mỗi <li> trong danh sách todo cần gì để React quản lý tốt?",
        options: ["Một key duy nhất", "Một màu riêng", "Một onClick", "Một ảnh"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component Todo: một <input> điều khiển bằng state, một <button> nhãn Thêm, và một <ul> render danh sách việc bằng .map. Bấm Thêm thì đưa nội dung ô nhập vào danh sách. Dùng useState. Gõ Học rồi bấm Thêm phải có một mục Học; gõ tiếp Chơi rồi bấm Thêm thì danh sách có thêm Chơi.",
        requirements: [
          { type: "contains", text: "Todo", message: "Đặt tên component là Todo" },
          { type: "contains", text: "useState", message: "Dùng useState" },
          {
            type: "interacts",
            component: "Todo",
            actions: [{ change: 0, value: "Học" }, { click: 0 }],
            textContains: "Học",
            message: "Gõ Học rồi bấm Thêm phải hiện Học trong danh sách",
          },
          {
            type: "interacts",
            component: "Todo",
            actions: [
              { change: 0, value: "Học" },
              { click: 0 },
              { change: 0, value: "Chơi" },
              { click: 0 },
            ],
            textContains: "Chơi",
            message: "Thêm tiếp Chơi thì danh sách phải có Chơi",
          },
        ],
        starterCode:
          "function Todo() {\n  const [text, setText] = useState('');\n  const [items, setItems] = useState([]);\n  // input đổi text; nút Thêm gọi setItems([...items, text]); <ul>{items.map(...)}</ul>\n}\n",
      },
    ],
  },
];
