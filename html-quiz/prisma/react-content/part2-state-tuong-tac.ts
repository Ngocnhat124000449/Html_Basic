import type { ReactSeedTag } from "./types";

const PART = "State & Tương tác";

// PHẦN 2 — State & Tương tác (Tuần 19): useState, sự kiện onClick, controlled input
// (onChange), form có state. Bậc 3 type WRITE_JSX dùng spec INTERACT: render bằng
// react-test-renderer rồi click/onChange theo kịch bản, đọc text hiển thị.
// Hook useState/useEffect được tiêm sẵn vào scope (KHÔNG cần import).
// Mẹo đề: nhãn nút KHÔNG chứa số để textContains số không khớp nhầm.
export const PART2_STATE_TUONG_TAC: ReactSeedTag[] = [
  // ===== CHƯƠNG: USESTATE =====
  {
    name: "usestate",
    topic: "useState",
    part: PART,
    description: "Lưu dữ liệu thay đổi và khiến UI tự cập nhật",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "State trong React dùng để làm gì?",
        options: [
          "Lưu dữ liệu thay đổi theo thời gian và khiến UI tự cập nhật",
          "Định dạng CSS",
          "Lưu file vào ổ cứng",
          "Tạo cơ sở dữ liệu",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khai báo state trong component bằng hook nào?",
        options: ["useState", "useStore", "useData", "useVar"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong const [so, setSo] = useState(0), số 0 là gì?",
        options: [
          "Giá trị khởi tạo của state",
          "Số lần render tối đa",
          "Vị trí component",
          "Một mã lỗi",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để cập nhật state so, bạn gọi gì?",
        options: ["setSo(giá trị mới)", "so = giá trị mới", "update(so)", "so.set()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao không nên gán trực tiếp so = so + 1 để đổi state?",
        options: [
          "React sẽ không render lại — phải dùng hàm set",
          "Vì cú pháp sai",
          "Vì so là hằng số vật lý",
          "Vì sẽ xóa component",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi state đổi bằng hàm set, điều gì xảy ra?",
        options: [
          "Component render lại với giá trị mới",
          "Trang tải lại hoàn toàn",
          "Không có gì xảy ra",
          "App tắt",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component BoDem dùng useState bắt đầu từ 0, hiển thị số trong thẻ <span> và một <button> nhãn Tăng. Mỗi lần bấm Tăng thì số tăng thêm 1. Ban đầu hiển thị 0; bấm một lần ra 1; bấm hai lần ra 2.",
        requirements: [
          { type: "contains", text: "BoDem", message: "Đặt tên component là BoDem" },
          { type: "contains", text: "useState", message: "Dùng useState" },
          { type: "interacts", component: "BoDem", actions: [], textContains: "0", message: "Ban đầu phải hiển thị 0" },
          {
            type: "interacts",
            component: "BoDem",
            actions: [{ click: 0 }],
            textContains: "1",
            message: "Bấm Tăng một lần phải ra 1",
          },
          {
            type: "interacts",
            component: "BoDem",
            actions: [{ click: 0 }, { click: 0 }],
            textContains: "2",
            message: "Bấm Tăng hai lần phải ra 2",
          },
        ],
        starterCode:
          "function BoDem() {\n  const [so, setSo] = useState(0);\n  // hiển thị {so} trong <span>, nút Tăng gọi setSo(so + 1)\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: SỰ KIỆN ONCLICK =====
  {
    name: "sự kiện onclick",
    topic: "Sự kiện onClick",
    part: PART,
    description: "Xử lý cú bấm và đổi state khi người dùng tương tác",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Để xử lý cú click chuột trong React, bạn dùng thuộc tính nào?",
        options: ["onClick", "onPress", "onTap", "click"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Giá trị của onClick nên là gì?",
        options: [
          "Một hàm xử lý sự kiện",
          "Một chuỗi văn bản",
          "Một con số",
          "Một thẻ HTML",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "onClick={xuLy} khác onClick={xuLy()} ở chỗ nào?",
        options: [
          "Cái sau GỌI hàm ngay khi render — thường là sai",
          "Hai cái giống hệt nhau",
          "Cái đầu bị lỗi",
          "Không cái nào chạy",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để vừa click vừa truyền tham số, cách viết đúng là gì?",
        options: [
          "onClick={() => xuLy(thamSo)}",
          "onClick={xuLy(thamSo)}",
          "onClick=xuLy(thamSo)",
          "onClick={xuLy thamSo}",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Kết hợp onClick với useState thường để làm gì?",
        options: [
          "Đổi state khi người dùng bấm, khiến UI cập nhật",
          "Xóa toàn bộ state",
          "In ra console",
          "Tải lại trang",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một nút bật/tắt (toggle) thường lưu trạng thái bằng kiểu dữ liệu gì?",
        options: ["boolean (true/false)", "string dài", "mảng", "object lồng nhau"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component CongTac dùng useState lưu trạng thái bật/tắt, hiển thị trong một <button>. Ban đầu nút hiển thị Tắt; mỗi lần bấm thì đảo trạng thái: bấm một lần thành Bật, bấm lần nữa quay lại Tắt.",
        requirements: [
          { type: "contains", text: "CongTac", message: "Đặt tên component là CongTac" },
          { type: "contains", text: "useState", message: "Dùng useState" },
          { type: "interacts", component: "CongTac", actions: [], textEquals: "Tắt", message: "Ban đầu phải hiển thị Tắt" },
          {
            type: "interacts",
            component: "CongTac",
            actions: [{ click: 0 }],
            textEquals: "Bật",
            message: "Bấm một lần phải thành Bật",
          },
          {
            type: "interacts",
            component: "CongTac",
            actions: [{ click: 0 }, { click: 0 }],
            textEquals: "Tắt",
            message: "Bấm hai lần phải quay lại Tắt",
          },
        ],
        starterCode:
          "function CongTac() {\n  const [bat, setBat] = useState(false);\n  // <button onClick=...>{bat ? 'Bật' : 'Tắt'}</button>\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: CONTROLLED INPUT =====
  {
    name: "controlled input",
    topic: "Controlled input",
    part: PART,
    description: "Ô nhập liệu được điều khiển bằng state qua onChange",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Controlled input (ô nhập được điều khiển) nghĩa là gì?",
        options: [
          "Giá trị ô input do state quyết định",
          "Input tự lưu vào file",
          "Input không cho gõ",
          "Input chỉ để đọc",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để bắt sự kiện gõ phím trong ô input, dùng thuộc tính nào?",
        options: ["onChange", "onType", "onKey", "onInput2"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong onChange, lấy nội dung vừa gõ ở đâu?",
        options: ["e.target.value", "e.value", "e.text", "e.input"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một controlled input cần hai thứ gì?",
        options: [
          "Thuộc tính value (từ state) và onChange (cập nhật state)",
          "Chỉ cần value",
          "Chỉ cần onChange",
          "Một thẻ <button>",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nếu đặt value={chu} mà quên onChange thì điều gì xảy ra?",
        options: [
          "Ô input không gõ được (bị khóa theo state)",
          "Gõ vẫn bình thường",
          "App tắt",
          "Trang tải lại",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên dùng controlled input?",
        options: [
          "React nắm dữ liệu, dễ kiểm tra và xử lý",
          "Để gõ nhanh hơn",
          "Để bỏ qua state",
          "Vì HTML bắt buộc",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component ONhap: một ô <input> được điều khiển bởi state (controlled input) và một thẻ <p> hiển thị đúng nội dung đang gõ. Dùng useState. Khi gõ Xin thì <p> hiển thị Xin; khi gõ Chào thì hiển thị Chào.",
        requirements: [
          { type: "contains", text: "ONhap", message: "Đặt tên component là ONhap" },
          { type: "contains", text: "useState", message: "Dùng useState" },
          {
            type: "interacts",
            component: "ONhap",
            actions: [{ change: 0, value: "Xin" }],
            textEquals: "Xin",
            message: "Gõ Xin thì <p> phải hiển thị Xin",
          },
          {
            type: "interacts",
            component: "ONhap",
            actions: [{ change: 0, value: "Chào" }],
            textEquals: "Chào",
            message: "Gõ Chào thì <p> phải hiển thị Chào",
          },
        ],
        starterCode:
          "function ONhap() {\n  const [chu, setChu] = useState('');\n  // <input value={chu} onChange=... /> và <p>{chu}</p>\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: FORM CÓ STATE =====
  {
    name: "form có state",
    topic: "Form có state",
    part: PART,
    description: "Ghép input + nút + hiển thị thành form tương tác",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một form React đơn giản thường gồm những gì?",
        options: [
          "Input điều khiển bằng state và nút bấm để xử lý",
          "Chỉ một thẻ <div>",
          "Một file CSS",
          "Một câu lệnh SQL",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khi bấm nút trong form, ta thường làm gì với state?",
        options: [
          "Đọc state hiện tại để tạo ra kết quả mới",
          "Xóa component",
          "Bắt buộc tải lại trang",
          "Bỏ qua dữ liệu",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một component có thể có bao nhiêu state (useState)?",
        options: [
          "Nhiều — mỗi state một useState",
          "Đúng một",
          "Tối đa hai",
          "Không được quá năm",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Dữ liệu người dùng nhập nên lưu ở đâu trước khi xử lý?",
        options: [
          "Trong state qua useState",
          "Trong file CSS",
          "Trong tên component",
          "Trong console",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sau khi gọi setState, đọc ngay biến state cũ trong cùng hàm sẽ thấy gì?",
        options: [
          "Giá trị CŨ (cập nhật áp dụng ở lần render sau)",
          "Giá trị mới ngay lập tức",
          "undefined",
          "Báo lỗi",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Ghép input + nút + vùng hiển thị kết quả tạo nên cái gì?",
        options: [
          "Một form tương tác có state",
          "Một biểu đồ",
          "Một file ảnh",
          "Một route",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JSX",
        prompt:
          "Viết component FormChao gồm: một <input> điều khiển bằng state cho tên, một <button> nhãn Chào, và một <p> hiển thị lời chào. Khi bấm Chào, <p> hiển thị 'Xin chào ' cộng tên đã nhập. Dùng useState. Gõ An rồi bấm Chào ra Xin chào An; gõ Lan rồi bấm Chào ra Xin chào Lan.",
        requirements: [
          { type: "contains", text: "FormChao", message: "Đặt tên component là FormChao" },
          { type: "contains", text: "useState", message: "Dùng useState" },
          {
            type: "interacts",
            component: "FormChao",
            actions: [{ change: 0, value: "An" }, { click: 0 }],
            textContains: "Xin chào An",
            message: "Gõ An rồi bấm Chào phải hiển thị Xin chào An",
          },
          {
            type: "interacts",
            component: "FormChao",
            actions: [{ change: 0, value: "Lan" }, { click: 0 }],
            textContains: "Xin chào Lan",
            message: "Gõ Lan rồi bấm Chào phải hiển thị Xin chào Lan",
          },
        ],
        starterCode:
          "function FormChao() {\n  const [ten, setTen] = useState('');\n  const [chao, setChao] = useState('');\n  // input đổi ten; nút Chào gọi setChao('Xin chào ' + ten); <p>{chao}</p>\n}\n",
      },
    ],
  },
];
