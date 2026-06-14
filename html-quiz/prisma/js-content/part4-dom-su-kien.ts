import type { JsSeedTag } from "./types";

const PART = "DOM & Sự kiện";

// PHẦN 4 — DOM & Sự kiện: chọn phần tử, đổi nội dung/class/style, bắt sự kiện, tạo/xóa phần tử.
// LƯU Ý: DOM KHÔNG chạy trong Web Worker (worker không có document) → bậc 3 chấm TĨNH
// (construct querySelector/addEventListener + contains/notContains), KHÔNG dùng returns/logs.
export const PART4_DOM_SU_KIEN: JsSeedTag[] = [
  // ===== CHƯƠNG 13: CHỌN PHẦN TỬ =====
  {
    name: "querySelector",
    topic: "Chọn phần tử",
    part: PART,
    description: "Chọn MỘT phần tử đầu tiên khớp CSS selector",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Chọn phần tử ĐẦU TIÊN khớp một CSS selector dùng gì?",
        options: ["document.querySelector(sel)", "document.select(sel)", "document.find(sel)", "document.get(sel)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: 'querySelector("#main") chọn phần tử nào?',
        options: ["Phần tử có id là main", "Mọi phần tử class main", "Thẻ <main>", "Phần tử tên main"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: 'querySelector(".box") chọn gì?',
        options: ["Phần tử ĐẦU TIÊN có class box", "Mọi phần tử class box", "Thẻ <box>", "Phần tử id box"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "querySelector trả về gì khi KHÔNG có phần tử nào khớp?",
        options: ["null", "undefined", "[]", "Báo lỗi dừng chương trình"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Chuỗi selector trong querySelector viết theo cú pháp nào?",
        options: ["Giống CSS: #id, .class, tag", "Chỉ tên thẻ", "Chỉ id (không có #)", "Cú pháp riêng của JS"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Muốn chọn NHIỀU phần tử cùng lúc thì dùng gì thay querySelector?",
        options: ["querySelectorAll", "querySelectorMany", "querySelector với mảng", "selectAll"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm chonTheo(sel) dùng document.querySelector(sel) trả về phần tử khớp selector sel. Ví dụ chonTheo("#tieude"). (DOM không chạy thử ở đây — chấm theo cách viết.)',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "chonTheo", message: "Tên hàm là chonTheo" },
          { type: "construct", construct: "querySelector", message: "Dùng document.querySelector()" },
          { type: "contains", text: "return", message: "Dùng return để trả phần tử" },
        ],
        starterCode: "function chonTheo(sel) {\n  // return document.querySelector(sel);\n}\n",
      },
    ],
  },
  {
    name: "querySelectorAll",
    topic: "Chọn phần tử",
    part: PART,
    description: "Chọn TẤT CẢ phần tử khớp selector (trả NodeList)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Chọn TẤT CẢ phần tử khớp selector dùng gì?",
        options: ["document.querySelectorAll(sel)", "document.querySelector(sel)", "document.all(sel)", "document.selectAll(sel)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "querySelectorAll trả về kiểu gì?",
        options: ["NodeList (giống mảng) các phần tử", "Một phần tử duy nhất", "Một chuỗi", "Một số"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đếm số phần tử querySelectorAll tìm được dùng gì?",
        options: [".length", ".count", ".size()", ".total"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Duyệt qua NodeList từ querySelectorAll thường dùng gì?",
        options: ["forEach hoặc for...of", "chỉ for cổ điển", "map bắt buộc", "không duyệt được"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "querySelectorAll khi không khớp gì trả về?",
        options: ["NodeList RỖNG (length 0)", "null", "undefined", "Báo lỗi"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau giữa querySelector và querySelectorAll?",
        options: [
          "querySelector trả 1 phần tử (đầu tiên); All trả danh sách mọi phần tử khớp",
          "Giống hệt nhau",
          "querySelectorAll trả 1 phần tử",
          "querySelector trả mảng",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm demMuc(sel) dùng document.querySelectorAll(sel) trả về SỐ phần tử khớp (.length). Ví dụ demMuc("li").',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "demMuc", message: "Tên hàm là demMuc" },
          { type: "contains", text: "querySelectorAll", message: "Dùng document.querySelectorAll()" },
          { type: "contains", text: ".length", message: "Lấy số phần tử bằng .length" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: "function demMuc(sel) {\n  // return document.querySelectorAll(sel).length;\n}\n",
      },
    ],
  },
  {
    name: "getElementById",
    topic: "Chọn phần tử",
    part: PART,
    description: "Chọn nhanh phần tử theo thuộc tính id",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Chọn phần tử theo id dùng gì?",
        options: ["document.getElementById(id)", 'document.getElementById("#id")', "document.id(id)", "document.byId(id)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: 'getElementById("main") cần truyền gì?',
        options: ["Tên id KHÔNG có dấu #", "Có dấu # đằng trước", "Dấu chấm .", "Tên thẻ"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "getElementById trả về gì khi không tìm thấy?",
        options: ["null", "undefined", "[]", "Báo lỗi"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'So với querySelector("#main"), getElementById("main") khác chỗ nào?',
        options: [
          "getElementById chỉ theo id và KHÔNG cần dấu #",
          "Hoàn toàn khác kết quả",
          "getElementById chậm hơn nhiều",
          "getElementById trả mảng",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thuộc tính id trên một trang HTML nên thế nào?",
        options: ["Duy nhất (không trùng)", "Trùng tùy ý", "Bắt buộc viết hoa", "Phải có số"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Cách chọn phần tử nào dưới đây KHÔNG dựa vào id?",
        options: ['querySelector(".box")', 'getElementById("x")', 'querySelector("#x")', "getElementById"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm layTheoId(id) dùng document.getElementById(id) trả về phần tử có id đó. Ví dụ layTheoId("tieude").',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "layTheoId", message: "Tên hàm là layTheoId" },
          { type: "contains", text: "getElementById", message: "Dùng document.getElementById()" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: "function layTheoId(id) {\n  // return document.getElementById(id);\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 14: ĐỔI NỘI DUNG =====
  {
    name: "textContent",
    topic: "Đổi nội dung",
    part: PART,
    description: "Đọc & đổi phần CHỮ thuần của phần tử",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đổi phần CHỮ (text) hiển thị của phần tử dùng thuộc tính nào?",
        options: ["el.textContent = ...", "el.text = ...", "el.value = ...", "el.label = ..."],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đọc chữ hiện tại của phần tử dùng gì?",
        options: ["el.textContent", "el.read()", "el.getText()", "el.chu"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Gán textContent một chuỗi có thẻ HTML thì sao?",
        options: ["Hiển thị NGUYÊN văn chuỗi (không tạo thẻ)", "Tạo thẻ HTML thật", "Báo lỗi", "Bỏ luôn chuỗi"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao textContent an toàn hơn innerHTML khi hiện dữ liệu người dùng?",
        options: ["Không chèn HTML/script → tránh tấn công XSS", "Vì nhanh hơn", "Vì ngắn hơn", "Không khác gì"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'Gán el.textContent = "" làm gì?',
        options: ["Xóa hết chữ bên trong phần tử", "Xóa luôn phần tử", "Thêm một dấu cách", "Không có tác dụng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "textContent khác innerText chủ yếu ở điểm nào?",
        options: [
          "textContent lấy cả phần ẩn, không quan tâm CSS; innerText theo những gì hiển thị",
          "Giống hệt nhau",
          "innerText là chuẩn cũ đã bị bỏ",
          "textContent chỉ đọc được",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm datChu(el, chu) gán el.textContent = chu để đổi CHỮ của phần tử el. (Không dùng innerHTML.)",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "datChu", message: "Tên hàm là datChu" },
          { type: "contains", text: ".textContent", message: "Dùng el.textContent" },
          { type: "notContains", text: "innerHTML", message: "Bài này dùng textContent, KHÔNG dùng innerHTML" },
        ],
        starterCode: "function datChu(el, chu) {\n  // el.textContent = chu;\n}\n",
      },
    ],
  },
  {
    name: "innerHTML",
    topic: "Đổi nội dung",
    part: PART,
    description: "Đọc & đổi nội dung HTML bên trong phần tử",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đặt nội dung HTML bên trong phần tử dùng gì?",
        options: ['el.innerHTML = "<b>Hi</b>"', 'el.textContent = "<b>Hi</b>"', "el.html = ...", "el.setHTML = ..."],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "innerHTML khác textContent chỗ nào?",
        options: ["innerHTML PHÂN TÍCH chuỗi thành thẻ HTML thật", "Giống hệt nhau", "innerHTML chỉ đọc", "textContent tạo thẻ"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đọc HTML hiện có bên trong phần tử dùng gì?",
        options: ["el.innerHTML", "el.outer", "el.getHTML()", "el.content"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Rủi ro khi gán innerHTML bằng dữ liệu người dùng nhập?",
        options: ["Có thể chèn mã độc (tấn công XSS)", "Không có rủi ro gì", "Làm chậm CSS", "Xóa mất id"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'el.innerHTML += "<li>x</li>" có nhược điểm gì?',
        options: [
          "Dựng lại toàn bộ nội dung, mất trạng thái & sự kiện đã gắn",
          "Không có nhược điểm",
          "Báo lỗi cú pháp",
          "Chỉ thêm được text",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi chỉ cần đổi CHỮ (không có thẻ), nên dùng gì?",
        options: ["textContent (an toàn, nhanh)", "innerHTML luôn tốt hơn", "outerHTML", "document.write"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm datHTML(el, html) gán el.innerHTML = html để đổi nội dung HTML bên trong phần tử el.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "datHTML", message: "Tên hàm là datHTML" },
          { type: "contains", text: ".innerHTML", message: "Dùng el.innerHTML" },
        ],
        starterCode: "function datHTML(el, html) {\n  // el.innerHTML = html;\n}\n",
      },
    ],
  },
  {
    name: "đọc/ghi value input",
    topic: "Đổi nội dung",
    part: PART,
    description: "Lấy & đặt giá trị ô <input>, <textarea>, <select>",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Lấy chữ người dùng gõ trong ô <input> dùng gì?",
        options: ["input.value", "input.textContent", "input.innerHTML", "input.text"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đặt sẵn giá trị cho ô input dùng gì?",
        options: ['input.value = "..."', 'input.set("...")', 'input.textContent = "..."', "input.default = ..."],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "input.value luôn trả về kiểu gì?",
        options: ["Chuỗi (string)", "Số", "Boolean", "Mảng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'Lấy số từ ô <input type="number"> để TÍNH TOÁN cần làm gì?',
        options: ["Chuyển sang số: Number(input.value)", "Dùng thẳng vì đã là số", "Dùng input.number", "Không thể tính"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Kiểm tra checkbox có được tích không dùng gì?",
        options: ["input.checked (true/false)", "input.value", "input.on", "input.selected"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "value khác textContent ở phần tử form thế nào?",
        options: [
          "value là dữ liệu nhập của form; textContent là chữ hiển thị nói chung",
          "Giống hệt nhau",
          "value chỉ đọc",
          "textContent dành riêng cho input",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm layGiaTri(input) trả về input.value (chuỗi người dùng đã nhập).",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "layGiaTri", message: "Tên hàm là layGiaTri" },
          { type: "contains", text: ".value", message: "Dùng input.value" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: "function layGiaTri(input) {\n  // return input.value;\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 15: CLASS & STYLE =====
  {
    name: "classList",
    topic: "Class & Style",
    part: PART,
    description: "Thêm / bớt / bật-tắt class để đổi giao diện",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Thêm một class cho phần tử dùng gì?",
        options: ['el.classList.add("active")', 'el.class = "active"', 'el.addClass("active")', 'el.classList = "active"'],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bỏ một class dùng gì?",
        options: ['el.classList.remove("active")', 'el.classList.delete("active")', 'el.removeClass("active")', "el.class.remove"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bật/tắt một class (có thì bỏ, chưa có thì thêm) dùng gì?",
        options: ['el.classList.toggle("active")', 'el.classList.switch("active")', 'el.toggleClass("active")', 'el.classList.flip("active")'],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Kiểm tra phần tử CÓ một class nào đó không dùng gì?",
        options: ['el.classList.contains("active")', 'el.hasClass("active")', 'el.classList.has("active")', 'el.class == "active"'],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên đổi class thay vì sửa style trực tiếp?",
        options: ["Tách giao diện sang CSS, dễ tái dùng & bảo trì", "Vì nhanh hơn nhiều", "Vì style bị cấm", "Không có lý do"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'el.className = "a" khác el.classList.add("a") thế nào?',
        options: [
          "className GHI ĐÈ toàn bộ danh sách class; classList.add chỉ thêm 1 class",
          "Giống hệt nhau",
          "className chỉ đọc",
          "classList xóa hết class cũ",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm batClass(el) dùng el.classList.add("active") để thêm class "active" cho phần tử el.',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "batClass", message: "Tên hàm là batClass" },
          { type: "contains", text: "classList.add", message: "Dùng el.classList.add()" },
          { type: "contains", text: "active", message: 'Thêm class "active"' },
        ],
        starterCode: 'function batClass(el) {\n  // el.classList.add("active");\n}\n',
      },
    ],
  },
  {
    name: "đổi style",
    topic: "Class & Style",
    part: PART,
    description: "Sửa CSS nội tuyến trực tiếp qua element.style",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Đổi màu chữ phần tử trực tiếp bằng JS dùng gì?",
        options: ['el.style.color = "red"', 'el.color = "red"', 'el.css("color", "red")', 'el.style = "red"'],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: 'Thuộc tính CSS "background-color" viết trong el.style thế nào?',
        options: ["el.style.backgroundColor", "el.style.background-color", 'el.style["background color"]', "el.style.bgColor"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Giá trị gán cho el.style.width phải là?",
        options: ['Chuỗi kèm đơn vị, vd "20px"', "Số 20", "true", "px(20)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "el.style đọc được loại style nào?",
        options: ["Style nội tuyến (inline) đặt trực tiếp trên phần tử", "Mọi style kể cả từ file CSS", "Chỉ màu", "Không đọc được gì"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đọc style TÍNH TOÁN cuối cùng (kể cả từ CSS ngoài) dùng gì?",
        options: ["getComputedStyle(el)", "el.style", "el.css", "el.realStyle"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao tên CSS đổi sang camelCase trong JS (fontSize)?",
        options: ["Dấu gạch ngang không hợp lệ trong tên thuộc tính JS", "Cho đẹp", "Bắt buộc viết hoa", "Không có lý do"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm toMau(el) đặt el.style.color = "red" để đổi màu chữ phần tử el thành đỏ.',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "toMau", message: "Tên hàm là toMau" },
          { type: "contains", text: ".style", message: "Dùng el.style" },
          { type: "contains", text: "color", message: "Đổi thuộc tính color" },
          { type: "contains", text: "red", message: 'Đặt màu "red"' },
        ],
        starterCode: 'function toMau(el) {\n  // el.style.color = "red";\n}\n',
      },
    ],
  },

  // ===== CHƯƠNG 16: SỰ KIỆN =====
  {
    name: "addEventListener",
    topic: "Sự kiện",
    part: PART,
    description: "Lắng nghe & phản hồi sự kiện người dùng",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Gắn xử lý khi NGƯỜI DÙNG bấm nút dùng gì?",
        options: ['nut.addEventListener("click", handler)', "nut.onClick(handler)", "nut.click = handler", 'nut.listen("click")'],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tham số đầu của addEventListener là gì?",
        options: ['Tên sự kiện, vd "click"', "Hàm xử lý", "Phần tử", "Số lần lặp"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tham số thứ hai của addEventListener là gì?",
        options: ["Hàm callback chạy khi sự kiện xảy ra", "Tên sự kiện", "true/false bắt buộc", "Một mảng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Ưu điểm addEventListener so với gán onclick = ...?",
        options: ["Gắn ĐƯỢC NHIỀU handler cho cùng một sự kiện", "Ngắn hơn", "Chạy nhanh hơn", "Không khác gì"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'Một số sự kiện thường gặp ngoài "click"?',
        options: ['"input", "submit", "keydown", "mouseover"', 'chỉ có "click"', '"red", "blue"', '"add", "remove"'],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Gỡ một handler đã gắn bằng addEventListener dùng gì?",
        options: ["removeEventListener (cùng tham chiếu hàm)", "deleteEvent", "off()", "không gỡ được"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm ganClick(nut) dùng nut.addEventListener("click", ...) để khi bấm nút thì console.log("đã bấm").',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "ganClick", message: "Tên hàm là ganClick" },
          { type: "construct", construct: "addEventListener", message: "Dùng .addEventListener()" },
          { type: "contains", text: "click", message: 'Lắng nghe sự kiện "click"' },
          { type: "contains", text: "console.log", message: "Phản hồi bằng console.log" },
        ],
        starterCode: 'function ganClick(nut) {\n  // nut.addEventListener("click", () => console.log("đã bấm"));\n}\n',
      },
    ],
  },
  {
    name: "đối tượng sự kiện",
    topic: "Sự kiện",
    part: PART,
    description: "Tham số e mang thông tin về sự kiện vừa xảy ra",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Hàm xử lý sự kiện tự nhận tham số gì?",
        options: ["Đối tượng sự kiện (event), thường đặt tên e", "Không nhận gì", "Cả trang web", "Tên sự kiện"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Phần tử đã kích hoạt sự kiện lấy bằng gì?",
        options: ["e.target", "e.this", "e.element", "e.node"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Với ô đang gõ, lấy giá trị qua sự kiện dùng gì?",
        options: ["e.target.value", "e.value", "e.input", "e.text"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "e.type cho biết điều gì?",
        options: ['Loại sự kiện, vd "click"', "Phần tử", "Giá trị", "Thời gian"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: 'Phím vừa nhấn trong sự kiện "keydown" lấy bằng?',
        options: ["e.key", "e.char", "e.value", "e.button"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: '"Lan truyền sự kiện" (bubbling) nghĩa là gì?',
        options: ["Sự kiện nổi từ phần tử con lên các phần tử cha", "Sự kiện tự lặp lại", "Trang tải lại", "Sự kiện bị hủy"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm xuLyNhap(e) nhận đối tượng sự kiện e và trả về e.target.value (giá trị ô đang gõ).",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "xuLyNhap", message: "Tên hàm là xuLyNhap" },
          { type: "contains", text: "e.target", message: "Lấy phần tử bằng e.target" },
          { type: "contains", text: ".value", message: "Lấy giá trị bằng .value" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: "function xuLyNhap(e) {\n  // return e.target.value;\n}\n",
      },
    ],
  },
  {
    name: "ngăn hành vi mặc định",
    topic: "Sự kiện",
    part: PART,
    description: "Chặn hành vi mặc định của trình duyệt (submit form, link)",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Ngăn form tải lại trang khi submit dùng gì?",
        options: ["e.preventDefault()", "e.stop()", "e.cancel()", "return true"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "preventDefault thường gọi trong sự kiện nào của form?",
        options: ['"submit"', '"click" của body', '"load"', '"scroll"'],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "preventDefault ngăn điều gì?",
        options: ["Hành vi MẶC ĐỊNH của trình duyệt cho sự kiện đó", "Mọi sự kiện khác", "Việc chạy JS", "Việc tải CSS"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khác nhau giữa preventDefault và stopPropagation?",
        options: [
          "preventDefault chặn hành vi mặc định; stopPropagation chặn lan truyền lên cha",
          "Giống hệt nhau",
          "Cả hai chặn submit",
          "stopPropagation chặn hành vi mặc định",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Click vào <a href> mà muốn xử lý bằng JS thay vì chuyển trang thì?",
        options: ["Gọi e.preventDefault() trong handler", "Xóa thẻ a", "Dùng return", "Không thể làm được"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi submit form bằng JS, vì sao thường gọi preventDefault trước?",
        options: [
          "Tránh trình duyệt tự gửi form & tải lại trang, để JS tự xử lý",
          "Để form chạy nhanh hơn",
          "Để xóa dữ liệu",
          "Không cần thiết",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm chanGui(e) gọi e.preventDefault() để NGĂN form gửi đi (tải lại trang) khi submit.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "chanGui", message: "Tên hàm là chanGui" },
          { type: "contains", text: "preventDefault", message: "Gọi e.preventDefault()" },
        ],
        starterCode: "function chanGui(e) {\n  // e.preventDefault();\n}\n",
      },
    ],
  },

  // ===== CHƯƠNG 17: TẠO & XÓA PHẦN TỬ =====
  {
    name: "createElement",
    topic: "Tạo & xóa phần tử",
    part: PART,
    description: "Tạo phần tử HTML mới bằng JS",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo một thẻ <p> mới bằng JS dùng gì?",
        options: ['document.createElement("p")', 'document.newElement("p")', 'document.create("<p>")', 'new Element("p")'],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "createElement trả về gì?",
        options: ["Một phần tử mới CHƯA nằm trên trang", "Chuỗi HTML", "null", "id"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Đặt chữ cho phần tử vừa tạo dùng gì?",
        options: ['el.textContent = "..."', 'el.create("...")', 'el.add("...")', "el.value()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Phần tử vừa createElement có hiển thị ngay không?",
        options: ["Chưa — phải gắn vào DOM (vd appendChild)", "Có, hiện ngay", "Chỉ hiện nếu có id", "Tùy trình duyệt"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt thuộc tính (vd src) cho phần tử mới dùng gì?",
        options: ['el.setAttribute("src", "...") hoặc el.src = "..."', "el.attr = ...", 'el.set("src")', "el.addAttribute()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Tạo một node CHỮ thuần dùng gì?",
        options: ['document.createTextNode("...")', 'document.createText("...")', "new Text()", 'document.text("...")'],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: 'Viết hàm taoP() dùng document.createElement("p") tạo một thẻ <p> mới và trả về nó.',
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "taoP", message: "Tên hàm là taoP" },
          { type: "contains", text: "createElement", message: "Dùng document.createElement()" },
          { type: "contains", text: "return", message: "Dùng return" },
        ],
        starterCode: 'function taoP() {\n  // return document.createElement("p");\n}\n',
      },
    ],
  },
  {
    name: "appendChild",
    topic: "Tạo & xóa phần tử",
    part: PART,
    description: "Gắn phần tử vào trong phần tử khác",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Gắn phần tử con vào trong phần tử cha dùng gì?",
        options: ["cha.appendChild(con)", "cha.add(con)", "cha.push(con)", "con.appendTo(cha)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "appendChild thêm con vào đâu?",
        options: ["CUỐI danh sách con của cha", "Đầu danh sách con", "Giữa", "Ngoài cha"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Thêm vào ĐẦU (trước con đầu tiên) dùng gì?",
        options: ["cha.prepend(con)", "cha.appendFirst(con)", "cha.unshiftChild(con)", "cha.addFirst(con)"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "appendChild một phần tử ĐANG nằm chỗ khác thì sao?",
        options: ["Nó được DI CHUYỂN sang vị trí mới (không nhân đôi)", "Bị nhân đôi", "Báo lỗi", "Không làm gì"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Phương thức hiện đại chèn nhiều node/chuỗi cùng lúc?",
        options: ["append (cho phép nhiều phần tử & cả text)", "appendChild nhận mảng", "addAll", "insertMany"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Chèn phần tử TRƯỚC một phần tử cụ thể dùng gì?",
        options: ["cha.insertBefore(con, moc)", "cha.before(moc)", "con.insertAt(0)", "cha.appendBefore()"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm gan(cha, con) dùng cha.appendChild(con) để gắn phần tử con vào trong phần tử cha.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "gan", message: "Tên hàm là gan" },
          { type: "contains", text: "appendChild", message: "Dùng cha.appendChild(con)" },
        ],
        starterCode: "function gan(cha, con) {\n  // cha.appendChild(con);\n}\n",
      },
    ],
  },
  {
    name: "xóa phần tử",
    topic: "Tạo & xóa phần tử",
    part: PART,
    description: "Gỡ phần tử khỏi trang",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Gỡ phần tử el khỏi trang (cách hiện đại) dùng gì?",
        options: ["el.remove()", "el.delete()", "el.destroy()", "remove(el)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cách cũ xóa con thông qua cha dùng gì?",
        options: ["cha.removeChild(con)", "cha.delete(con)", "cha.remove(con)", "con.removeFrom(cha)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Xóa SẠCH mọi con bên trong el nhanh gọn dùng gì?",
        options: ['el.innerHTML = ""', "el.clear()", "el.removeAll()", "el.empty()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sau khi el.remove(), biến el thế nào?",
        options: [
          "Vẫn trỏ tới phần tử (có thể gắn lại), chỉ là không còn trên trang",
          "Trở thành null",
          "Bị xóa khỏi bộ nhớ ngay",
          "Báo lỗi khi dùng tiếp",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "removeChild trả về gì?",
        options: ["Phần tử con vừa bị gỡ", "true/false", "undefined", "phần tử cha"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Ẩn phần tử mà KHÔNG xóa khỏi DOM dùng gì?",
        options: ['el.style.display = "none"', "el.remove()", "el.hidden()", "el.delete()"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt: "Viết hàm xoa(el) dùng el.remove() để gỡ phần tử el khỏi trang.",
        requirements: [
          { type: "construct", construct: "function", message: "Dùng function" },
          { type: "contains", text: "xoa", message: "Tên hàm là xoa" },
          { type: "contains", text: ".remove", message: "Dùng el.remove()" },
        ],
        starterCode: "function xoa(el) {\n  // el.remove();\n}\n",
      },
    ],
  },
];
