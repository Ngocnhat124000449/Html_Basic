// Dữ liệu Phản xạ JS: tình huống/nhu cầu thực tế → người chơi gõ TÊN CÚ PHÁP/HÀM JS.
// Cố ý KHÔNG nhắc tên cần trả lời trong đề — luyện "nhìn nhu cầu, nghĩ ra cú pháp".
// answer = tên từ khóa/method; accept = các tên thay thế cũng chấp nhận.

export type JsReflexQuestion = {
  answer: string;
  accept?: string[];
  prompt: string;
  explain: string;
};

export const JS_REFLEX_QUESTIONS: JsReflexQuestion[] = [
  // ===== BIẾN & KIỂU =====
  {
    answer: "const",
    prompt: "Khai báo một giá trị cố định: gán một lần và không cho phép gán lại.",
    explain: "const tạo ràng buộc không gán lại được (nhưng vẫn sửa được nội dung object/mảng).",
  },
  {
    answer: "let",
    prompt: "Khai báo một biến mà về sau có thể gán lại giá trị khác.",
    explain: "let khai báo biến thay đổi được, phạm vi khối { }.",
  },
  {
    answer: "typeof",
    prompt: "Kiểm tra xem một giá trị đang thuộc kiểu dữ liệu nào (số, chuỗi, boolean...).",
    explain: 'typeof x trả về chuỗi tên kiểu, vd "number", "string".',
  },
  {
    answer: "Number",
    accept: ["parseInt", "parseFloat"],
    prompt: "Chuyển một chuỗi người dùng nhập (vd '42') sang dạng số để tính toán.",
    explain: "Number(chuoi) ép sang số; parseInt/parseFloat đọc số ở đầu chuỗi.",
  },
  {
    answer: "String",
    accept: ["toString"],
    prompt: "Chuyển một con số sang dạng chữ để nối vào văn bản.",
    explain: "String(x) hoặc x.toString() đổi giá trị thành chuỗi.",
  },

  // ===== CHUỖI =====
  {
    answer: "length",
    prompt: "Đếm xem một đoạn chữ có bao nhiêu ký tự.",
    explain: "Thuộc tính length cho số ký tự của chuỗi (và số phần tử của mảng).",
  },
  {
    answer: "toUpperCase",
    prompt: "Đổi toàn bộ chữ trong một đoạn văn bản sang chữ in hoa.",
    explain: 'chuoi.toUpperCase() trả chuỗi mới viết hoa toàn bộ.',
  },
  {
    answer: "toLowerCase",
    prompt: "Đổi toàn bộ chữ trong một đoạn văn bản sang chữ thường.",
    explain: "chuoi.toLowerCase() trả chuỗi mới viết thường toàn bộ.",
  },
  {
    answer: "trim",
    prompt: "Bỏ khoảng trắng thừa ở đầu và cuối ô nhập người dùng vừa gõ.",
    explain: "chuoi.trim() cắt khoảng trắng hai đầu — hay dùng khi xác thực form.",
  },
  {
    answer: "split",
    prompt: "Tách một đoạn 'a,b,c' thành mảng các phần theo dấu phẩy.",
    explain: 'chuoi.split(",") cắt chuỗi thành mảng theo ký tự ngăn cách.',
  },
  {
    answer: "replace",
    accept: ["replaceAll"],
    prompt: "Thay một đoạn con trong chuỗi bằng đoạn khác.",
    explain: "chuoi.replace(cu, moi) đổi lần khớp đầu; replaceAll đổi mọi lần.",
  },

  // ===== MẢNG: THÊM/XÓA =====
  {
    answer: "push",
    prompt: "Thêm một phần tử vào CUỐI mảng.",
    explain: "arr.push(x) thêm vào cuối và trả về độ dài mới.",
  },
  {
    answer: "pop",
    prompt: "Lấy ra và xóa phần tử ở CUỐI mảng.",
    explain: "arr.pop() gỡ phần tử cuối và trả về nó.",
  },
  {
    answer: "unshift",
    prompt: "Thêm một phần tử vào ĐẦU mảng.",
    explain: "arr.unshift(x) chèn vào đầu, dồn các phần tử còn lại lùi xuống.",
  },
  {
    answer: "shift",
    prompt: "Lấy ra và xóa phần tử ở ĐẦU mảng.",
    explain: "arr.shift() gỡ phần tử đầu và trả về nó.",
  },
  {
    answer: "indexOf",
    prompt: "Tìm vị trí (chỉ số) của một giá trị trong mảng hoặc chuỗi.",
    explain: "indexOf(x) trả chỉ số khớp đầu tiên, hoặc -1 nếu không có.",
  },
  {
    answer: "includes",
    prompt: "Kiểm tra một mảng (hoặc chuỗi) có CHỨA giá trị nào đó không, trả true/false.",
    explain: "includes(x) trả boolean — rõ nghĩa hơn so với indexOf so với -1.",
  },

  // ===== MẢNG: BIẾN ĐỔI =====
  {
    answer: "map",
    prompt: "Tạo một MẢNG MỚI bằng cách biến đổi từng phần tử (vd gấp đôi mọi số).",
    explain: "arr.map(fn) trả mảng mới cùng độ dài, mỗi phần tử qua fn.",
  },
  {
    answer: "filter",
    prompt: "Lọc ra mảng mới chỉ gồm những phần tử thỏa một điều kiện.",
    explain: "arr.filter(fn) giữ phần tử khi fn trả truthy.",
  },
  {
    answer: "reduce",
    prompt: "Gộp toàn bộ mảng lại thành một giá trị duy nhất (vd tính tổng).",
    explain: "arr.reduce((tich, x) => ..., khoiTao) tích lũy về một giá trị.",
  },
  {
    answer: "forEach",
    prompt: "Duyệt qua từng phần tử mảng để chạy một việc, không cần mảng kết quả.",
    explain: "arr.forEach(fn) chạy fn cho mỗi phần tử, trả undefined.",
  },
  {
    answer: "find",
    prompt: "Lấy ra phần tử ĐẦU TIÊN trong mảng thỏa một điều kiện.",
    explain: "arr.find(fn) trả phần tử đầu khớp, hoặc undefined.",
  },
  {
    answer: "sort",
    prompt: "Sắp xếp lại thứ tự các phần tử trong mảng.",
    explain: "arr.sort((a,b)=>a-b) sắp tăng dần cho số; sửa mảng tại chỗ.",
  },
  {
    answer: "join",
    prompt: "Nối các phần tử của mảng thành một chuỗi, ngăn bằng ký tự bạn chọn.",
    explain: 'arr.join("-") ghép mảng thành chuỗi.',
  },

  // ===== OBJECT & JSON =====
  {
    answer: "Object.keys",
    accept: ["keys"],
    prompt: "Lấy MẢNG tên các thuộc tính (khóa) của một đối tượng.",
    explain: "Object.keys(obj) trả mảng các khóa — đếm thuộc tính bằng .length.",
  },
  {
    answer: "JSON.stringify",
    accept: ["stringify"],
    prompt: "Chuyển một đối tượng thành chuỗi để lưu lại hoặc gửi đi qua mạng.",
    explain: "JSON.stringify(obj) tạo chuỗi dạng dữ liệu trao đổi.",
  },
  {
    answer: "JSON.parse",
    accept: ["parse"],
    prompt: "Chuyển một chuỗi dữ liệu nhận từ API trở lại thành đối tượng dùng được.",
    explain: "JSON.parse(chuoi) dựng lại object — nên bọc try/catch khi chuỗi có thể sai.",
  },

  // ===== ĐIỀU KHIỂN & HÀM =====
  {
    answer: "for",
    prompt: "Lặp lại một khối lệnh khi đã biết trước số lần (vd chạy đúng 10 lượt).",
    explain: "Vòng for (let i=0; i<n; i++) lặp theo số đếm.",
  },
  {
    answer: "while",
    prompt: "Lặp lại CHỪNG NÀO một điều kiện còn đúng (chưa biết trước số lần).",
    explain: "Vòng while (đk) chạy đến khi điều kiện sai.",
  },
  {
    answer: "switch",
    prompt: "Chọn một trong nhiều nhánh dựa trên giá trị của một biến (thay chuỗi else if dài).",
    explain: "switch (x) { case ...: ... } gọn cho nhiều giá trị rời rạc.",
  },
  {
    answer: "function",
    prompt: "Đóng gói một đoạn code có thể tái sử dụng và gọi lại nhiều lần.",
    explain: "Từ khóa function khai báo hàm (cũng có thể dùng arrow =>).",
  },
  {
    answer: "return",
    prompt: "Trả một giá trị từ trong hàm về cho nơi đã gọi nó.",
    explain: "return kết thúc hàm và đưa giá trị ra ngoài.",
  },

  // ===== DOM & SỰ KIỆN =====
  {
    answer: "querySelector",
    prompt: "Chọn MỘT phần tử trên trang khớp một CSS selector.",
    explain: 'document.querySelector("#id") trả phần tử đầu tiên khớp.',
  },
  {
    answer: "querySelectorAll",
    prompt: "Chọn TẤT CẢ phần tử khớp một selector (trả về danh sách).",
    explain: "document.querySelectorAll(sel) trả NodeList mọi phần tử khớp.",
  },
  {
    answer: "getElementById",
    prompt: "Chọn nhanh một phần tử dựa theo thuộc tính id của nó.",
    explain: 'document.getElementById("ten") — truyền id không có dấu #.',
  },
  {
    answer: "addEventListener",
    prompt: "Lắng nghe và phản hồi khi người dùng bấm hoặc gõ vào một phần tử.",
    explain: 'el.addEventListener("click", fn) gắn xử lý sự kiện.',
  },
  {
    answer: "textContent",
    prompt: "Đổi phần chữ thuần hiển thị bên trong một phần tử (cách an toàn, tránh XSS).",
    explain: "el.textContent = chu đặt chữ, không phân tích thành thẻ.",
  },
  {
    answer: "innerHTML",
    prompt: "Đặt nội dung có chứa thẻ HTML bên trong một phần tử.",
    explain: "el.innerHTML = chuoi phân tích chuỗi thành thẻ thật (cẩn thận XSS).",
  },
  {
    answer: "classList",
    prompt: "Thêm, bớt hoặc bật-tắt class CSS của một phần tử.",
    explain: 'el.classList.add/remove/toggle("active").',
  },
  {
    answer: "createElement",
    prompt: "Tạo một phần tử HTML mới hoàn toàn bằng JavaScript.",
    explain: 'document.createElement("p") tạo thẻ mới (chưa nằm trên trang).',
  },
  {
    answer: "appendChild",
    accept: ["append"],
    prompt: "Gắn một phần tử con vào bên trong một phần tử cha.",
    explain: "cha.appendChild(con) thêm con vào cuối; append nhận cả text.",
  },
  {
    answer: "preventDefault",
    prompt: "Ngăn một form tự gửi đi và tải lại trang khi bấm nút gửi.",
    explain: "e.preventDefault() chặn hành vi mặc định của trình duyệt.",
  },

  // ===== BẤT ĐỒNG BỘ =====
  {
    answer: "setTimeout",
    prompt: "Hẹn cho một đoạn code chạy SAU một khoảng thời gian nhất định.",
    explain: "setTimeout(fn, 1000) chạy fn sau 1000ms (1 giây).",
  },
  {
    answer: "fetch",
    prompt: "Gọi một API để lấy dữ liệu từ server qua mạng.",
    explain: "fetch(url) trả Promise chứa Response; dùng .json() để đọc dữ liệu.",
  },
  {
    answer: "Promise",
    prompt: "Đại diện cho một kết quả SẼ có trong tương lai (có thể thành công hoặc lỗi).",
    explain: "new Promise((resolve, reject) => ...) mô hình hóa việc bất đồng bộ.",
  },
  {
    answer: "async",
    prompt: "Đánh dấu một hàm là bất đồng bộ để được phép chờ kết quả bên trong.",
    explain: "async function ... cho phép dùng await và luôn trả về Promise.",
  },
  {
    answer: "await",
    prompt: "Chờ một việc bất đồng bộ hoàn thành rồi lấy giá trị, viết theo lối tuần tự.",
    explain: "await chỉ dùng trong hàm async; tạm dừng tới khi Promise xong.",
  },
];
