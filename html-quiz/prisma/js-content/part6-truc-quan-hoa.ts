import type { JsSeedTag } from "./types";

const PART = "Trực quan hóa";

// PHẦN 6 — Trực quan hóa (Tuần 14): canvas cơ bản, Chart.js (CDN), biểu đồ tròn
// theo danh mục, biểu đồ cột theo tháng.
// Chart.js KHÔNG chạy trong Web Worker (không có canvas/Chart) → bậc 3 chấm phần
// JS thuần dẫn tới biểu đồ: (a) chuẩn bị/biến đổi dữ liệu, (b) dựng OBJECT config.
// Chạy thật, coerce về scalar trong `call` (.type / .join(',') / .An). Giá trị
// grader kiểm (equals, tên hàm, 'bar') hiện nguyên văn trong đề (đề tự chứa).
export const PART6_TRUC_QUAN_HOA: JsSeedTag[] = [
  // ===== CHƯƠNG: CANVAS CƠ BẢN =====
  {
    name: "canvas cơ bản",
    topic: "Canvas",
    part: PART,
    description: "Vẽ đồ họa 2D lên <canvas> bằng getContext",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn vẽ đồ họa 2D (cột biểu đồ) thủ công bằng JS lên trang. Vẽ lên thẻ nào?",
        options: ["<canvas>", "<svg2d>", "<draw>", "<graph>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để vẽ đồ họa 2D bằng JavaScript, bạn dùng thẻ HTML nào?",
        options: ["<canvas>", "<draw>", "<svg2d>", "<graphic>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lấy bối cảnh vẽ 2D từ một phần tử canvas bằng cách nào?",
        options: ["canvas.getContext('2d')", "canvas.draw2d()", "canvas.context2d", "canvas.get2d()"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Chart.js vẽ biểu đồ lên phần tử nào bên trong trang?",
        options: ["Một phần tử <canvas>", "Một thẻ <img>", "Một thẻ <table>", "Một thẻ <svg>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để vẽ một hình chữ nhật đặc trên canvas context ctx, bạn gọi phương thức nào?",
        options: ["ctx.fillRect(x, y, w, h)", "ctx.rect2d()", "ctx.drawBox()", "ctx.square()"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt màu tô cho hình sắp vẽ trên canvas bằng thuộc tính nào của ctx?",
        options: ["ctx.fillStyle = 'red'", "ctx.color = 'red'", "ctx.fill = 'red'", "ctx.background = 'red'"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao vẽ biểu đồ phức tạp người ta dùng Chart.js thay vì tự vẽ canvas thủ công?",
        options: [
          "Chart.js lo sẵn phần tính toán, trục, chú thích và tương tác",
          "Vì canvas không vẽ được biểu đồ",
          "Vì Chart.js không cần canvas",
          "Vì canvas chậm hơn đúng 1000 lần",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Để vẽ cột biểu đồ trên canvas, cần quy đổi giá trị ra chiều cao pixel. Viết hàm chieuCaoCot(giaTri, max, cao) trả về (giaTri / max) nhân với cao. Ví dụ: chieuCaoCot(50, 100, 200) trả về 100; chieuCaoCot(100, 100, 200) trả về 200.",
        requirements: [
          { type: "contains", text: "chieuCaoCot", message: "Đặt tên hàm là chieuCaoCot" },
          { type: "returns", call: "chieuCaoCot(50,100,200)", equals: 100, message: "chieuCaoCot(50,100,200) phải trả về 100" },
          { type: "returns", call: "chieuCaoCot(100,100,200)", equals: 200, message: "chieuCaoCot(100,100,200) phải trả về 200" },
        ],
        starterCode: "// Tỉ lệ giaTri/max rồi nhân với cao\nfunction chieuCaoCot(giaTri, max, cao) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: KHỞI TẠO CHART.JS =====
  {
    name: "khởi tạo chart.js",
    topic: "Khởi tạo Chart.js",
    part: PART,
    description: "Nhúng CDN và tạo new Chart với object config",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn vẽ biểu đồ đẹp nhanh mà không tự tính trục/chú thích. Tạo biểu đồ bằng cú pháp nào?",
        options: ["new Chart(ctx, config)", "Chart.draw(config)", "new Graph(config)", "chart(config)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Cách nhanh nhất để dùng Chart.js trong một dự án nhỏ không cài npm là gì?",
        options: [
          "Nhúng qua thẻ <script> từ CDN",
          "Tải về rồi tự biên dịch lại",
          "Viết lại Chart.js từ đầu",
          "Dùng <link rel='chart'>",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tạo một biểu đồ Chart.js bằng cú pháp nào?",
        options: ["new Chart(ctx, config)", "Chart.create(config)", "ctx.chart(config)", "new Graph(config)"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Object config của Chart.js bắt buộc có khóa nào để biết LOẠI biểu đồ?",
        options: ["type", "kind", "shape", "mode"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Trong config Chart.js, nhãn và số liệu được đặt ở khóa nào?",
        options: ["data", "values", "content", "items"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bên trong data của Chart.js, mảng các bộ số liệu nằm ở khóa nào?",
        options: ["datasets", "rows", "series", "points"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để tùy chỉnh trục, chú thích hay chế độ responsive, bạn đặt vào khóa nào của config?",
        options: ["options", "settings", "config", "extra"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm taoConfig() trả về object config Chart.js cho biểu đồ cột: khóa type là 'bar' và data.labels là ['T1','T2']. Ví dụ: taoConfig().type là 'bar'; taoConfig().data.labels.join(',') là 'T1,T2'.",
        requirements: [
          { type: "contains", text: "taoConfig", message: "Đặt tên hàm là taoConfig" },
          { type: "contains", text: "bar", message: "type phải là 'bar'" },
          { type: "returns", call: "taoConfig().type", equals: "bar", message: "taoConfig().type phải là 'bar'" },
          { type: "returns", call: "taoConfig().data.labels.join(',')", equals: "T1,T2", message: "data.labels phải là ['T1','T2']" },
        ],
        starterCode:
          "// Trả về { type: 'bar', data: { labels: ['T1','T2'], datasets: [] } }\nfunction taoConfig() {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: BIỂU ĐỒ TRÒN =====
  {
    name: "biểu đồ tròn",
    topic: "Biểu đồ tròn",
    part: PART,
    description: "Biểu đồ tròn (pie) gom chi tiêu theo danh mục",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn xem TỈ LỆ chi tiêu theo từng danh mục. Loại biểu đồ Chart.js nào hợp nhất?",
        options: ["type: 'pie'", "type: 'line'", "type: 'scatter'", "type: 'bar'"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Loại biểu đồ nào hợp để xem TỈ LỆ chi tiêu giữa các danh mục?",
        options: ["Biểu đồ tròn (pie)", "Biểu đồ đường (line)", "Biểu đồ phân tán", "Biểu đồ vùng xếp chồng"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong config Chart.js, để vẽ biểu đồ tròn thì khóa type đặt là gì?",
        options: ["'pie'", "'circle'", "'round'", "'donut'"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Biểu đồ tròn cần dữ liệu ở dạng nào?",
        options: [
          "Danh sách nhãn kèm số liệu tương ứng",
          "Một chuỗi văn bản dài",
          "Một số duy nhất",
          "Một giá trị boolean",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để hiện tên danh mục quanh biểu đồ tròn, bạn điền vào khóa nào trong data?",
        options: ["labels", "names", "titles", "tags"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mỗi phần của biểu đồ tròn nên một màu — đặt màu đó ở đâu trong dataset?",
        options: ["backgroundColor (mảng màu)", "lineColor", "fillRect", "borderType"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Gom chi tiêu theo danh mục trước khi vẽ biểu đồ tròn nên dùng cấu trúc nào?",
        options: [
          "Object hoặc Map gom theo khóa danh mục",
          "Một mảng số rời rạc",
          "Một chuỗi nối dài",
          "Một Set rỗng",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm tongTheoDanhMuc(ds) nhận MẢNG giao dịch dạng {danhMuc, soTien} và trả về object tổng tiền theo từng danh mục. Ví dụ: với ds gồm An 10, An 20, Binh 5 thì tongTheoDanhMuc(ds).An trả về 30; tongTheoDanhMuc(ds).Binh trả về 5.",
        requirements: [
          { type: "contains", text: "tongTheoDanhMuc", message: "Đặt tên hàm là tongTheoDanhMuc" },
          {
            type: "returns",
            call: "tongTheoDanhMuc([{danhMuc:'An',soTien:10},{danhMuc:'An',soTien:20},{danhMuc:'Binh',soTien:5}]).An",
            equals: 30,
            message: "Tổng danh mục An phải là 30",
          },
          {
            type: "returns",
            call: "tongTheoDanhMuc([{danhMuc:'An',soTien:10},{danhMuc:'An',soTien:20},{danhMuc:'Binh',soTien:5}]).Binh",
            equals: 5,
            message: "Tổng danh mục Binh phải là 5",
          },
        ],
        starterCode:
          "// Gom tổng soTien theo danhMuc, trả về object { An: ..., Binh: ... }\nfunction tongTheoDanhMuc(ds) {\n  \n}\n",
      },
    ],
  },

  // ===== CHƯƠNG: BIỂU ĐỒ CỘT =====
  {
    name: "biểu đồ cột",
    topic: "Biểu đồ cột",
    part: PART,
    description: "Biểu đồ cột (bar) so tổng chi theo tháng",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Muốn SO SÁNH tổng chi giữa các tháng. Loại biểu đồ Chart.js nào hợp nhất?",
        options: ["type: 'bar'", "type: 'pie'", "type: 'doughnut'", "type: 'radar'"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Loại biểu đồ nào hợp để SO SÁNH tổng chi giữa các tháng?",
        options: ["Biểu đồ cột (bar)", "Biểu đồ tròn", "Biểu đồ radar", "Biểu đồ bong bóng"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trong config Chart.js, để vẽ biểu đồ cột thì khóa type đặt là gì?",
        options: ["'bar'", "'column'", "'vertical'", "'rect'"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Trên biểu đồ cột theo tháng, trục ngang (labels) thường là gì?",
        options: ["Tên các tháng", "Tổng số tiền", "Màu sắc", "Tên người dùng"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Số liệu từng cột (chiều cao) nằm ở khóa nào bên trong một dataset?",
        options: ["data", "height", "value", "bars"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Muốn vẽ hai dataset (vd hai năm) trên cùng một biểu đồ cột thì làm thế nào?",
        options: [
          "Thêm nhiều object vào mảng datasets",
          "Bắt buộc tạo hai biểu đồ tách biệt",
          "Không thể làm được",
          "Đổi type sang 'pie'",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Đặt nhãn cho một dataset (hiện trong phần chú thích) bằng khóa nào?",
        options: ["label", "name", "title", "legend"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_JS",
        prompt:
          "Viết hàm bieuDoCot(thang, tien) nhận mảng tên tháng và mảng số tiền, trả về config Chart.js cột: type là 'bar', data.labels là thang, và dataset đầu tiên có data là tien. Ví dụ: bieuDoCot(['T1','T2'],[10,20]).type là 'bar'; bieuDoCot(['T1','T2'],[10,20]).data.datasets[0].data.join(',') là '10,20'.",
        requirements: [
          { type: "contains", text: "bieuDoCot", message: "Đặt tên hàm là bieuDoCot" },
          { type: "contains", text: "bar", message: "type phải là 'bar'" },
          { type: "returns", call: "bieuDoCot(['T1','T2'],[10,20]).type", equals: "bar", message: "type phải là 'bar'" },
          {
            type: "returns",
            call: "bieuDoCot(['T1','T2'],[10,20]).data.datasets[0].data.join(',')",
            equals: "10,20",
            message: "dataset đầu tiên phải có data là [10,20]",
          },
        ],
        starterCode:
          "// Trả về { type:'bar', data:{ labels: thang, datasets:[{ data: tien }] } }\nfunction bieuDoCot(thang, tien) {\n  \n}\n",
      },
    ],
  },
];
