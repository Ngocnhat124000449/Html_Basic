// Dữ liệu Phản xạ React: nhu cầu giao diện → người chơi gõ TÊN HOOK/CÚ PHÁP/THUỘC
// TÍNH JSX. Cố ý KHÔNG nhắc tên cần trả lời trong đề — luyện "gặp nhu cầu, nhớ API".
// answer = tên hook/cú pháp; accept = các cách viết khác cũng chấp nhận.

export type ReactReflexQuestion = {
  answer: string;
  accept?: string[];
  prompt: string;
  explain: string;
};

export const REACT_REFLEX_QUESTIONS: ReactReflexQuestion[] = [
  // ===== NỀN TẢNG =====
  {
    answer: "component",
    prompt: "Muốn tách thẻ sản phẩm (ảnh + tên + giá) thành một mảnh giao diện tái dùng nhiều nơi.",
    explain: "Component là mảnh UI tái dùng.",
  },
  {
    answer: "JSX",
    prompt: "Cú pháp giống HTML viết thẳng trong JavaScript để mô tả giao diện.",
    explain: "JSX = HTML viết trong JS.",
  },
  {
    answer: "props",
    prompt: "Component cha truyền dữ liệu (tên, giá) xuống component con để hiển thị.",
    explain: "props truyền dữ liệu cha → con.",
  },
  {
    answer: "children",
    accept: ["props.children"],
    prompt: "Một component bọc (như Card) muốn hiển thị bất cứ nội dung nào đặt giữa thẻ mở và đóng.",
    explain: "children là nội dung lồng bên trong.",
  },
  {
    answer: "className",
    prompt: "Trong JSX, muốn gắn lớp CSS cho một thẻ div (không viết như HTML thuần).",
    explain: "className thay cho class trong JSX.",
  },
  {
    answer: "htmlFor",
    prompt: "Trong JSX, thuộc tính của nhãn label trỏ tới id của ô nhập (không viết như HTML thuần).",
    explain: "htmlFor thay cho for trong JSX.",
  },
  {
    answer: "fragment",
    accept: ["react.fragment"],
    prompt: "Muốn trả về nhiều phần tử cạnh nhau mà không thêm một thẻ div thừa bọc ngoài.",
    explain: "Fragment <>…</> gói mà không thêm DOM.",
  },
  // ===== STATE & SỰ KIỆN =====
  {
    answer: "useState",
    prompt: "Nút Thích cần nhớ số lượt và cập nhật giao diện mỗi khi bấm.",
    explain: "useState lưu dữ liệu thay đổi của component.",
  },
  {
    answer: "state",
    prompt: "Tên gọi dữ liệu thay đổi theo thời gian bên trong component, đổi thì giao diện vẽ lại.",
    explain: "Dữ liệu động của component.",
  },
  {
    answer: "setState",
    accept: ["set"],
    prompt: "Hàm dùng để CẬP NHẬT một giá trị đã khai báo bằng useState.",
    explain: "Hàm set... cập nhật giá trị.",
  },
  {
    answer: "onClick",
    prompt: "Muốn chạy một hàm khi người dùng bấm vào nút.",
    explain: "onClick gắn xử lý cú bấm.",
  },
  {
    answer: "onChange",
    prompt: "Ô tìm kiếm cần biết người dùng đang gõ gì để lọc kết quả theo.",
    explain: "onChange bắt thay đổi của ô nhập.",
  },
  {
    answer: "onSubmit",
    prompt: "Biểu mẫu muốn chạy xử lý khi người dùng bấm Gửi.",
    explain: "onSubmit bắt sự kiện gửi form.",
  },
  {
    answer: "preventDefault",
    accept: ["e.preventdefault"],
    prompt: "Chặn biểu mẫu tự tải lại trang khi gửi, để xử lý bằng JS.",
    explain: "preventDefault chặn hành vi mặc định.",
  },
  {
    answer: "value",
    prompt: "Thuộc tính gắn state vào ô nhập để React luôn nắm nội dung (input điều khiển).",
    explain: "value gắn state vào input.",
  },
  {
    answer: "e.target.value",
    accept: ["target.value"],
    prompt: "Trong hàm xử lý gõ phím, lấy nội dung người dùng vừa nhập ra từ đâu?",
    explain: "Đọc nội dung gõ từ đối tượng sự kiện.",
  },
  // ===== DANH SÁCH & ĐIỀU KIỆN =====
  {
    answer: "map",
    prompt: "Có mảng 10 sản phẩm, muốn sinh ra 10 card tương ứng để hiển thị.",
    explain: ".map() biến mảng thành danh sách phần tử.",
  },
  {
    answer: "key",
    prompt: "Khi render một danh sách, mỗi phần tử cần một giá trị duy nhất để React quản lý hiệu quả.",
    explain: "key giúp React nhận diện từng phần tử.",
  },
  {
    answer: "&&",
    accept: ["render có điều kiện", "conditional"],
    prompt: "Chỉ hiển thị huy hiệu 'MỚI' KHI sản phẩm là hàng mới, ngược lại bỏ qua.",
    explain: "{điều_kiện && <JSX/>} hiển thị có điều kiện.",
  },
  {
    answer: "ternary",
    accept: ["? :", "?:"],
    prompt: "Chọn HIỂN THỊ 'Còn hàng' hoặc 'Hết hàng' tùy một điều kiện, ngay trong JSX.",
    explain: "Toán tử 3 ngôi điều_kiện ? a : b.",
  },
  // ===== HOOKS KHÁC =====
  {
    answer: "useEffect",
    accept: ["effect"],
    prompt: "Khi trang sản phẩm vừa mở, tự động gọi API lấy dữ liệu một lần.",
    explain: "useEffect chạy việc phụ sau khi render.",
  },
  {
    answer: "dependency array",
    accept: ["deps", "mảng phụ thuộc"],
    prompt: "Mảng quyết định khi nào việc phụ trong useEffect được chạy lại.",
    explain: "Tham số thứ hai của useEffect.",
  },
  {
    answer: "useContext",
    accept: ["context"],
    prompt: "Nhiều component xa nhau cùng cần đọc theme/đăng nhập mà không truyền tay qua từng tầng.",
    explain: "useContext đọc giá trị từ Context.",
  },
  {
    answer: "useRef",
    accept: ["ref"],
    prompt: "Muốn giữ tham chiếu tới ô nhập để focus, mà không gây vẽ lại giao diện.",
    explain: "useRef giữ tham chiếu/giá trị bền.",
  },
  {
    answer: "useMemo",
    prompt: "Một phép tính nặng chỉ nên chạy lại khi dữ liệu đầu vào của nó thay đổi.",
    explain: "useMemo ghi nhớ kết quả tính toán.",
  },
  {
    answer: "useCallback",
    prompt: "Muốn giữ nguyên một hàm giữa các lần vẽ lại để không tạo lại nó liên tục.",
    explain: "useCallback ghi nhớ một hàm.",
  },
  {
    answer: "useReducer",
    prompt: "Quản lý dữ liệu thay đổi phức tạp nhiều nhánh, gọn hơn là dùng nhiều useState.",
    explain: "useReducer cho state phức tạp.",
  },
  {
    answer: "hook",
    prompt: "Tên gọi chung của các hàm useXxx cho phép dùng trạng thái/việc phụ trong component hàm.",
    explain: "Hook = các hàm useXxx của React.",
  },
  // ===== MODULE =====
  {
    answer: "export default",
    accept: ["export"],
    prompt: "Cách phổ biến để một tệp component cho phép nơi khác nạp nó vào dùng.",
    explain: "export default <Component>.",
  },
  {
    answer: "import",
    prompt: "Đưa một component hoặc hàm từ tệp khác vào tệp hiện tại để dùng.",
    explain: "import nạp thứ từ tệp khác.",
  },
];
