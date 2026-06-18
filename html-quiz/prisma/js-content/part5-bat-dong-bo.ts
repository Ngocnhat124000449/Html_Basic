import type { JsSeedTag } from "./types";

const PART = "Bất đồng bộ & Hiện đại";

// PHẦN 5 — Bất đồng bộ & Hiện đại: callback, setTimeout, Promise, async/await, fetch,
// và cú pháp hiện đại (destructuring mảng, rest/spread, optional chaining).
// LƯU Ý: phần BẤT ĐỒNG BỘ (setTimeout/Promise/async/await/fetch) chấm TĨNH — worker đồng bộ
// không await được. Cú pháp ĐỒNG BỘ (callback, destructuring, rest/spread, ?./??) chạy thật
// trong Web Worker (returns) vì cho kết quả ngay.
export const PART5_BAT_DONG_BO: JsSeedTag[] = [
  // ===== CHƯƠNG 18: BẤT ĐỒNG BỘ & CALLBACK =====
  {
    name: "callback",
    topic: "Bất đồng bộ & Callback",
    part: PART,
    description: "Hàm truyền vào hàm khác để được gọi lại sau",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Hàm bạn truyền vào addEventListener để 'được gọi lại' khi có sự kiện gọi là gì?",
        options: ["Callback", "Promise", "Class", "Module"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn đưa một hàm cho setTimeout để nó 'gọi lại' khi tới giờ. Hàm được truyền kiểu đó gọi là gì?",
        options: ["Một HÀM được truyền vào hàm khác để gọi lại", "Một biến số", "Một vòng lặp", "Một class"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "arr.forEach(x => ...) — phần x => ... đóng vai trò gì?",
        options: ["Một callback", "Một mảng", "Một object", "Một class"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gọi một callback fn bên trong hàm dùng cú pháp nào?",
        options: ["fn()", "call fn", "fn.run", "callback:fn"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'Vì sao callback hữu ích cho việc "chạy sau khi xong"?',
        options: ["Cho phép hàm gọi lại code của bạn vào đúng thời điểm", "Vì nó nhanh", "Vì nó ngắn", "Vì nó luôn đồng bộ"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: '"Callback hell" là vấn đề gì?',
        options: ["Lồng quá nhiều callback → khó đọc, khó bảo trì", "Callback chạy quá nhanh", "Thiếu callback", "Callback bị cấm"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Giải pháp hiện đại thay cho callback lồng nhau?",
        options: ["Promise và async/await", "Thêm thật nhiều callback hơn", "Dùng var", "Bỏ hết hàm"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm apDung(x, fn) trả về kết quả gọi callback: fn(x). Ví dụ apDung(5, n => n * 2) = 10.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "apDung", message: "Tên hàm là apDung" },
          { type: "contains", text: "fn", message: "Gọi callback fn" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "apDung(5, n => n * 2)", equals: 10, message: "apDung(5, n=>n*2) phải trả 10" },
          { type: "returns", call: "apDung(3, n => n + 1)", equals: 4, message: "apDung(3, n=>n+1) phải trả 4" },
        ],
        starterCode: "function apDung(x, fn) {\n  // return fn(x);\n}\n",
      },
    ],
  },
  {
    name: "setTimeout",
    topic: "Bất đồng bộ & Callback",
    part: PART,
    description: "Hẹn chạy code sau một khoảng thời gian",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn hiện thông báo 'Cảm ơn' SAU 3 giây kể từ khi đặt hàng. Dùng hàm nào?",
        options: ["setTimeout", "setInterval", "wait(3)", "sleep(3)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Chạy một hàm SAU 1 giây dùng gì?",
        options: ["setTimeout(fn, 1000)", "wait(1000, fn)", "sleep(1000)", "delay(fn, 1)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đơn vị thời gian của setTimeout là gì?",
        options: ["Mili-giây (1000 = 1 giây)", "Giây", "Phút", "Khung hình"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lặp lại một việc mỗi khoảng thời gian dùng gì?",
        options: ["setInterval(fn, ms)", "setTimeout lặp lại", "repeat(fn)", "loop(fn, ms)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "setTimeout(fn, 0) chạy fn khi nào?",
        options: ["Sau khi code đồng bộ hiện tại chạy xong (không thật sự là 0)", "Ngay lập tức, đồng bộ", "Không bao giờ", "Sau đúng 1 giây"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hủy một setTimeout đã hẹn dùng gì?",
        options: ["clearTimeout(id) với id mà setTimeout trả về", "stopTimeout()", "cancel()", "setTimeout(null)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "setTimeout là đồng bộ hay bất đồng bộ?",
        options: ["Bất đồng bộ — code sau nó chạy trước khi callback chạy", "Đồng bộ", "Tùy trình duyệt", "Cả hai cùng lúc"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm hen(viec) dùng setTimeout để chạy callback viec sau 1000ms (1 giây).",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "hen", message: "Tên hàm là hen" },
          { type: "contains", text: "setTimeout", message: "Dùng setTimeout()" },
          { type: "contains", text: "1000", message: "Hẹn sau 1000ms" },
        ],
        starterCode: "function hen(viec) {\n  // setTimeout(viec, 1000);\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 19: PROMISE =====
  {
    name: "tạo Promise",
    topic: "Promise",
    part: PART,
    description: "Promise đại diện cho kết quả sẽ có trong tương lai",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một thao tác cho kết quả TRONG TƯƠNG LAI (vd tải dữ liệu qua mạng). Đối tượng đại diện cho nó là gì?",
        options: ["Promise", "Callback duy nhất", "Array", "Boolean"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn biểu diễn một kết quả 'sẽ có trong tương lai' (vd tải xong dữ liệu). Tạo một Promise mới dùng cú pháp nào?",
        options: ["new Promise((resolve, reject) => ...)", "Promise.create()", "new Promise[]", "promise()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Báo Promise THÀNH CÔNG gọi gì?",
        options: ["resolve(giaTri)", "return giaTri", "success()", "done()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Báo Promise THẤT BẠI gọi gì?",
        options: ["reject(loi)", "chỉ được throw", "fail()", "error()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một Promise đi qua các trạng thái nào?",
        options: ["pending → fulfilled hoặc rejected", "true/false", "open/closed", "start/stop"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sau khi đã resolve, gọi resolve lần nữa thì?",
        options: ["Bị bỏ qua — Promise chỉ định đoạt MỘT lần", "Tạo Promise mới", "Báo lỗi", "Ghi đè kết quả"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Promise.resolve(5) là gì?",
        options: ["Một Promise đã hoàn thành sẵn với giá trị 5", "Số 5", "Một lỗi", "Một hàm"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm taoLoiHua() trả về một Promise mới (new Promise) và gọi resolve("xong").',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "taoLoiHua", message: "Tên hàm là taoLoiHua" },
          { type: "construct", construct: "promise", message: "Dùng new Promise" },
          { type: "contains", text: "resolve", message: "Gọi resolve()" },
          { type: "contains", text: "return", message: "Dùng return để trả Promise" },
        ],
        starterCode: 'function taoLoiHua() {\n  // return new Promise((resolve) => resolve("xong"));\n}\n',
      },
    ],
  },
  {
    name: "then & catch",
    topic: "Promise",
    part: PART,
    description: "Xử lý kết quả & lỗi của một Promise",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Sau khi một Promise hoàn tất, muốn xử lý KẾT QUẢ và bắt LỖI. Dùng cặp phương thức nào?",
        options: [".then() và .catch()", ".do() và .err()", ".ok() và .fail()", ".run() và .stop()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Nhận KẾT QUẢ khi Promise thành công dùng gì?",
        options: ["p.then(kq => ...)", "p.result(...)", "p.success(...)", "p.get(...)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bắt LỖI khi Promise thất bại dùng gì?",
        options: ["p.catch(err => ...)", "p.error(...)", "try p", "p.fail(...)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Chạy code DÙ thành công hay thất bại dùng gì?",
        options: ["p.finally(() => ...)", "p.always(...)", "p.end(...)", "p.done(...)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: ".then trả về gì để có thể nối tiếp .then?",
        options: ["Một Promise mới", "undefined", "Giá trị thô", "Một mảng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nhiều .then nối tiếp nhau gọi là gì?",
        options: ["Chuỗi Promise (promise chaining)", "Vòng lặp", "Callback hell", "Đệ quy"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một .catch ở cuối chuỗi bắt được lỗi của?",
        options: ["Bất kỳ .then nào phía trước", "Chỉ .then ngay trước nó", "Không bắt được gì", "Chỉ Promise gốc"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm xuLy(p) nhận Promise p, dùng .then(kq => console.log(kq)) để in kết quả và .catch(err => console.log(err)) để bắt lỗi.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "xuLy", message: "Tên hàm là xuLy" },
          { type: "contains", text: ".then", message: "Dùng .then()" },
          { type: "contains", text: ".catch", message: "Dùng .catch()" },
          { type: "contains", text: "console.log", message: "In bằng console.log" },
        ],
        starterCode: "function xuLy(p) {\n  // p.then(kq => console.log(kq)).catch(err => console.log(err));\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 20: ASYNC / AWAIT =====
  {
    name: "async & await",
    topic: "async / await",
    part: PART,
    description: "Viết code bất đồng bộ trông như đồng bộ",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn viết code gọi API trông tuần tự, dễ đọc như đồng bộ. Dùng cặp từ khóa nào?",
        options: ["async / await", "then / then", "loop / wait", "sync / hold"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đánh dấu một hàm là bất đồng bộ dùng từ khóa nào?",
        options: ["async", "await", "promise", "defer"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Chờ một Promise xong và lấy giá trị của nó dùng gì?",
        options: ["await", "wait", "bắt buộc dùng then", "yield"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "await chỉ dùng được ở đâu?",
        options: ["Bên trong hàm async (hoặc top-level của module)", "Bất kỳ đâu", "Chỉ trong vòng for", "Chỉ trong class"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một hàm async LUÔN trả về gì?",
        options: ["Một Promise", "Giá trị thô", "undefined", "Một hàm"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "await một Promise tương đương gì so với .then?",
        options: ["Lấy giá trị mà .then nhận, nhưng viết tuần tự dễ đọc", "Khác hoàn toàn", "Tạo Promise mới", "Hủy Promise"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lợi ích chính của async/await?",
        options: ["Code bất đồng bộ đọc như đồng bộ, dễ theo dõi", "Chạy nhanh gấp đôi", "Bỏ được Promise hoàn toàn", "Tự bắt mọi lỗi"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm bất đồng bộ async function layDuLieu() dùng await để chờ tai() rồi return kết quả.",
        requirements: [
          { type: "construct", construct: "async", message: "Dùng async" },
          { type: "construct", construct: "await", message: "Dùng await" },
          { type: "contains", text: "layDuLieu", message: "Tên hàm là layDuLieu" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: "async function layDuLieu() {\n  // const kq = await tai();\n  // return kq;\n}\n",
      },
    ],
  },
  {
    name: "try/catch bất đồng bộ",
    topic: "async / await",
    part: PART,
    description: "Bắt lỗi trong hàm async bằng try/catch",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Trong hàm async, muốn BẮT LỖI khi 'await fetch' thất bại (mất mạng). Dùng cấu trúc nào?",
        options: ["try/catch", "if/else", "switch", "while"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bắt lỗi của await trong hàm async dùng gì?",
        options: ["try { await ... } catch (e) { }", ".error()", "onError", "catch không cần try"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khối catch nhận tham số gì?",
        options: ["Đối tượng lỗi (error)", "Kết quả thành công", "Một Promise", "Luôn là undefined"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "try/catch quanh await tương ứng với gì ở Promise?",
        options: [".catch()", ".then()", ".finally()", "resolve()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nếu await một Promise bị reject mà KHÔNG có try/catch?",
        options: ["Ném lỗi (unhandled rejection)", "Trả undefined", "Bỏ qua im lặng", "Trả null"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Chạy phần dọn dẹp dù lỗi hay không trong async dùng gì?",
        options: ["finally { }", "catch luôn chạy", "then", "ensure"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Chờ nhiều Promise SONG SONG hiệu quả bằng gì?",
        options: ["await Promise.all([...])", "nhiều await tuần tự là tối ưu nhất", "await một mảng trực tiếp", "luôn dùng Promise.race"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm async layAnToan() dùng try/catch quanh await tai() — thành công thì return dữ liệu, lỗi thì return null.",
        requirements: [
          { type: "construct", construct: "async", message: "Dùng async" },
          { type: "construct", construct: "await", message: "Dùng await" },
          { type: "construct", construct: "tryCatch", message: "Dùng try/catch" },
          { type: "contains", text: "layAnToan", message: "Tên hàm là layAnToan" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: "async function layAnToan() {\n  // try { const kq = await tai(); return kq; }\n  // catch (e) { return null; }\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 21: FETCH =====
  {
    name: "fetch & json",
    topic: "Fetch API",
    part: PART,
    description: "Gọi API lấy dữ liệu qua mạng",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn lấy danh sách sản phẩm từ một API qua mạng. Dùng hàm nào?",
        options: ["fetch(url)", "get(url)", "http(url)", "load(url)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gọi một API để lấy dữ liệu dùng gì?",
        options: ["fetch(url)", "http.get(url)", "ajax(url)", "request(url)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "fetch(url) trả về gì?",
        options: ["Một Promise chứa Response", "Dữ liệu JSON sẵn", "Một chuỗi", "undefined"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Chuyển Response thành object JS dùng gì?",
        options: ["await response.json()", "response.toObject()", "JSON(response)", "response.data"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao thường dùng async/await với fetch?",
        options: ["fetch trả Promise; await giúp viết tuần tự dễ đọc", "fetch là đồng bộ", "Bắt buộc về cú pháp", "Để chạy nhanh hơn"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "response.json() trả về gì?",
        options: ["Một Promise (nên cần await)", "Object ngay lập tức", "Một chuỗi", "Một số"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Kiểm tra request có thành công không (HTTP 200...) dùng gì?",
        options: ["response.ok hoặc response.status", "response.success", 'response.code === "ok"', "response.error"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm async taiUser() dùng fetch("/api/user") rồi await response.json() và return dữ liệu.',
        requirements: [
          { type: "construct", construct: "async", message: "Dùng async" },
          { type: "construct", construct: "await", message: "Dùng await" },
          { type: "contains", text: "fetch", message: "Dùng fetch()" },
          { type: "contains", text: ".json", message: "Dùng response.json()" },
          { type: "contains", text: "taiUser", message: "Tên hàm là taiUser" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: 'async function taiUser() {\n  // const res = await fetch("/api/user");\n  // return await res.json();\n}\n',
      },
    ],
  },

  // ===== CHƯƠNG 22: CÚ PHÁP HIỆN ĐẠI =====
  {
    name: "destructuring mảng",
    topic: "Cú pháp hiện đại",
    part: PART,
    description: "Rút phần tử mảng ra biến theo vị trí",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một hàm trả về mảng [data, error]. Muốn rút nhanh ra hai biến theo VỊ TRÍ. Cú pháp nào?",
        options: ["const [data, error] = ketQua", "const { data } = ketQua", "data = ketQua.0", "ketQua -> data"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Rút hai phần tử đầu mảng ra biến viết thế nào?",
        options: ["const [a, b] = arr", "const {a, b} = arr", "const a, b = arr", "const [a; b] = arr"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong const [a, b] = [10, 20]; thì b bằng?",
        options: ["20", "10", "[10, 20]", "undefined"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bỏ qua phần tử đầu, chỉ lấy phần tử thứ hai viết thế nào?",
        options: ["const [, b] = arr", "const [b] = arr", "const skip(b) = arr", "const [b,] = arr"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lấy phần tử đầu và GOM phần còn lại thành mảng dùng?",
        options: ["const [dau, ...conLai] = arr", "const [dau, conLai] = arr", "const [dau][conLai] = arr", "const dau, ...conLai = arr"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt giá trị mặc định khi destructuring mảng viết thế nào?",
        options: ["const [a = 0] = arr", "const [a || 0] = arr", "const [a: 0] = arr", "const [a ?: 0] = arr"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Hoán đổi hai biến a, b bằng destructuring viết thế nào?",
        options: ["[a, b] = [b, a]", "a, b = b, a", "swap(a, b)", "[a, b] = [a, b]"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm dau(arr) dùng destructuring mảng (const [x] = arr) trả về phần tử đầu. Ví dụ dau([10, 20]) = 10.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "dau", message: "Tên hàm là dau" },
          { type: "construct", construct: "destructure", message: "Dùng destructuring [ ] =" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "dau([10, 20])", equals: 10, message: "dau([10,20]) phải trả 10" },
          { type: "returns", call: 'dau(["a", "b"])', equals: "a", message: 'dau(["a","b"]) phải trả "a"' },
        ],
        starterCode: "function dau(arr) {\n  // const [x] = arr;\n  // return x;\n}\n",
      },
    ],
  },
  {
    name: "rest & spread",
    topic: "Cú pháp hiện đại",
    part: PART,
    description: "Gom tham số (...rest) và trải mảng (...spread)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn gộp hai mảng sản phẩm cũ và mới thành một mảng mới. Dùng cú pháp nào?",
        options: ["[...cu, ...moi]", "cu - moi", "merge(cu, moi)", "cu && moi"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gom MỌI tham số của hàm vào một mảng dùng?",
        options: ["function f(...args) {}", "function f(args[]) {}", "function f(*args) {}", "function f(args...) {}"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trải mảng arr thành các phần tử rời dùng?",
        options: ["...arr", "*arr", "arr[]", "spread(arr)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Math.max(...[3, 9, 1]) cho kết quả?",
        options: ["9", "[3, 9, 1]", "3", "13"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Gộp hai mảng a, b thành mảng mới dùng?",
        options: ["[...a, ...b]", "[a, b]", "a + b", "merge(a, b)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác biệt giữa rest và spread (cùng ký hiệu ...)?",
        options: ["rest GOM nhiều thứ thành mảng; spread TRẢI mảng ra", "Giống hệt nhau", "rest trải, spread gom", "Chỉ dùng cho object"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sao chép nông (shallow) một mảng dùng?",
        options: ["[...arr]", "arr.copy()", "arr", "clone(arr)"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm tong(...nums) dùng rest gom các đối số rồi trả về TỔNG. Ví dụ tong(1, 2, 3) = 6.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "tong", message: "Tên hàm là tong" },
          { type: "construct", construct: "spread", message: "Dùng rest (...)" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: "tong(1, 2, 3)", equals: 6, message: "tong(1,2,3) phải trả 6" },
          { type: "returns", call: "tong(5)", equals: 5, message: "tong(5) phải trả 5" },
        ],
        starterCode: "function tong(...nums) {\n  // return nums.reduce((a, b) => a + b, 0);\n}\n",
      },
    ],
  },
  {
    name: "optional chaining",
    topic: "Cú pháp hiện đại",
    part: PART,
    description: "Truy cập an toàn (?.) và giá trị thay thế (??)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn đọc user.diaChi.thanhPho mà KHÔNG lỗi nếu diaChi chưa có. Dùng cú pháp nào?",
        options: ["user.diaChi?.thanhPho", "user.diaChi.thanhPho", "user!diaChi!thanhPho", "user..thanhPho"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Truy cập a.b.c an toàn khi b có thể là null dùng?",
        options: ["a?.b?.c", "a.b.c (luôn an toàn)", "a!.b!.c", "chỉ có cách a && a.b && a.b.c"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "obj?.ten khi obj là null trả về gì?",
        options: ["undefined (không báo lỗi)", "null", "Báo lỗi", '""'],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lấy giá trị thay thế khi bên trái là null/undefined dùng?",
        options: ['x ?? "mặc định"', "x || cho kết quả y hệt", 'x ?: "mặc định"', 'x ?. "mặc định"'],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau giữa ?? và || ?",
        options: [
          "?? chỉ thay khi null/undefined; || thay cả khi 0, \"\", false",
          "Giống hệt nhau",
          "|| chặt chẽ hơn",
          "?? thay mọi giá trị falsy",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Gọi một hàm có thể không tồn tại một cách an toàn dùng?",
        options: ["obj.fn?.()", "obj.fn()", "obj?fn()", "call?(obj.fn)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "a ?? b — khi a = 0 thì kết quả là?",
        options: ["0 (vì 0 không phải null/undefined)", "b", "undefined", "null"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm tenND(nguoi) trả về nguoi?.ten ?? "khách" (dùng ?. và ??). Ví dụ tenND(null) = "khách".',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "tenND", message: "Tên hàm là tenND" },
          { type: "contains", text: "?.", message: "Dùng optional chaining ?." },
          { type: "contains", text: "??", message: "Dùng nullish ??" },
          { type: "contains", text: "return", message: "Dùng return" },
          { type: "returns", call: 'tenND({ ten: "An" })', equals: "An", message: 'tenND({ten:"An"}) phải trả "An"' },
          { type: "returns", call: "tenND(null)", equals: "khách", message: 'tenND(null) phải trả "khách"' },
        ],
        starterCode: 'function tenND(nguoi) {\n  // return nguoi?.ten ?? "khách";\n}\n',
      },
    ],
  },
];
