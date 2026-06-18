import type { ProjectSeedTag } from "./types";

const PART = "Khối giao diện";

// PHẦN 1 — Ghép cả khối: card sản phẩm, header, form, footer, bố cục trang.
// Bậc 3 (WRITE_STRUCTURE) yêu cầu LẮP nhiều thẻ thành một khối hoàn chỉnh; chấm
// bằng gradeCode (tagName + contains parent>child + text). Giá trị chữ tùy ý
// (tên SP, giá, nhãn nút...) đều hiện nguyên văn trong đề (đề tự chứa).
export const PART1_KHOI_GIAO_DIEN: ProjectSeedTag[] = [
  // ===== CARD SẢN PHẨM =====
  {
    name: "card sản phẩm",
    topic: "Card sản phẩm",
    part: PART,
    description: "Ghép ảnh + tên + giá + nút thành một thẻ sản phẩm",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một card sản phẩm (ảnh + tên + giá + nút) là khối nội dung tự đứng được. Thẻ ngữ nghĩa nào hợp để bọc cả card?",
        options: ["<article>", "<span>", "<table>", "<head>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Bên trong card sản phẩm, ảnh của món hàng dùng thẻ nào?",
        options: ["<img>", "<image>", "<picture-only>", "<bg>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tên sản phẩm trong card (một tiêu đề nhỏ của khối) nên dùng thẻ nào?",
        options: ["<h3>", "<p>", "<title>", "<b>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nút 'Mua' trong card nên dùng thẻ nào để bấm được và đúng ngữ nghĩa?",
        options: ["<button>", "<a>", "<div onclick>", "<span>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao nên bọc card bằng <article> thay vì <div>?",
        options: [
          "Có ngữ nghĩa: là khối nội dung tự đứng được",
          "<div> không bọc được ảnh",
          "<article> chạy nhanh hơn",
          "Vì cú pháp bắt buộc",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Giá tiền trong card là một dòng văn bản ngắn. Dùng thẻ nào?",
        options: ["<p>", "<h1>", "<table>", "<input>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_STRUCTURE",
        prompt:
          "Dựng một card sản phẩm: thẻ <article> bọc ngoài, bên trong có <img>, một <h3> ghi tên Áo thun, một <p> ghi giá 199k, và một <button> ghi Mua.",
        requirements: [
          { type: "tagName", value: "article" },
          { type: "contains", parent: "article", child: "img", count: 1 },
          { type: "contains", parent: "article", child: "h3", count: 1 },
          { type: "contains", parent: "article", child: "p", count: 1 },
          { type: "contains", parent: "article", child: "button", count: 1 },
          { type: "text", tag: "h3", index: 0, value: "Áo thun" },
          { type: "text", tag: "p", index: 0, value: "199k" },
          { type: "text", tag: "button", index: 0, value: "Mua" },
        ],
        starterCode: "<!-- <article> bọc ngoài: <img>, <h3>Áo thun</h3>, <p>199k</p>, <button>Mua</button> -->\n",
      },
    ],
  },

  // ===== HEADER TRANG =====
  {
    name: "header trang",
    topic: "Header & điều hướng",
    part: PART,
    description: "Ghép logo + menu điều hướng thành phần đầu trang",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Phần đầu trang gồm logo và menu. Thẻ ngữ nghĩa nào bọc cả khối đầu trang?",
        options: ["<header>", "<head>", "<top>", "<div banner>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Tên thương hiệu lớn trên header thường dùng thẻ tiêu đề nào?",
        options: ["<h1>", "<h6>", "<p>", "<title>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Khối chứa các liên kết điều hướng (Trang chủ, Sản phẩm) dùng thẻ nào?",
        options: ["<nav>", "<menu-bar>", "<links>", "<aside>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Bên trong <nav>, các mục menu nên tổ chức bằng cấu trúc nào?",
        options: [
          "<ul> chứa các <li>, mỗi <li> có một <a>",
          "Các <a> dính liền không cấu trúc",
          "Một <table>",
          "Một <select>",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mỗi mục menu cần bấm để chuyển trang. Dùng thẻ nào trong mỗi <li>?",
        options: ["<a>", "<button>", "<span>", "<p>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thứ tự lồng thẻ đúng cho một menu điều hướng là gì?",
        options: [
          "header > nav > ul > li > a",
          "nav > header > a",
          "ul > nav > li",
          "a > li > ul > nav",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_STRUCTURE",
        prompt:
          "Dựng phần đầu trang: thẻ <header> bọc ngoài, bên trong có một <h1> ghi ShopVN và một <nav>. Trong <nav> có một <ul> chứa 2 <li>, mỗi <li> có một <a>.",
        requirements: [
          { type: "tagName", value: "header" },
          { type: "contains", parent: "header", child: "h1", count: 1 },
          { type: "contains", parent: "header", child: "nav", count: 1 },
          { type: "contains", parent: "nav", child: "ul", count: 1 },
          { type: "contains", parent: "ul", child: "li", count: 2 },
          { type: "contains", parent: "ul", child: "a", count: 2 },
          { type: "text", tag: "h1", index: 0, value: "ShopVN" },
        ],
        starterCode: "<!-- <header>: <h1>ShopVN</h1> và <nav><ul><li><a>...</a></li> x2</ul></nav> -->\n",
      },
    ],
  },

  // ===== FORM LIÊN HỆ =====
  {
    name: "form liên hệ",
    topic: "Form liên hệ",
    part: PART,
    description: "Ghép nhãn + ô nhập + nút thành một biểu mẫu",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Khối thu thập tên + email + lời nhắn rồi gửi đi. Thẻ nào bọc ngoài?",
        options: ["<form>", "<div>", "<section>", "<table>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Nhãn 'Email' mô tả cho ô nhập dùng thẻ nào?",
        options: ["<label>", "<span>", "<legend>", "<caption>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Ô nhập 'Lời nhắn' cho nhập nhiều dòng dùng thẻ nào?",
        options: ["<textarea>", "<input>", "<text>", "<p>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Nút gửi của form nên dùng thẻ nào?",
        options: ["<button>", "<a>", "<div>", "<span>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Để bấm vào nhãn thì con trỏ nhảy vào ô nhập, cần nối <label> với <input> bằng gì?",
        options: [
          "Thuộc tính for của label khớp id của input",
          "class giống nhau",
          "name giống nhau",
          "Không cần gì cả",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Ô nhập email một dòng (có kiểm định dạng) dùng thẻ và kiểu nào?",
        options: ['<input type="email">', "<textarea>", "<email>", '<input type="textarea">'],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_STRUCTURE",
        prompt:
          "Dựng form liên hệ: thẻ <form> bọc ngoài, bên trong có một <label> ghi Email, một <input>, một <textarea>, và một <button> ghi Gửi.",
        requirements: [
          { type: "tagName", value: "form" },
          { type: "contains", parent: "form", child: "label", count: 1 },
          { type: "contains", parent: "form", child: "input", count: 1 },
          { type: "contains", parent: "form", child: "textarea", count: 1 },
          { type: "contains", parent: "form", child: "button", count: 1 },
          { type: "text", tag: "label", index: 0, value: "Email" },
          { type: "text", tag: "button", index: 0, value: "Gửi" },
        ],
        starterCode: "<!-- <form>: <label>Email</label>, <input>, <textarea></textarea>, <button>Gửi</button> -->\n",
      },
    ],
  },

  // ===== FOOTER TRANG =====
  {
    name: "footer trang",
    topic: "Footer",
    part: PART,
    description: "Ghép bản quyền + link thành chân trang",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Cuối trang chứa bản quyền và link chính sách. Thẻ ngữ nghĩa nào bọc khối này?",
        options: ["<footer>", "<bottom>", "<foot>", "<div cuoi>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Dòng bản quyền '© 2026 ShopVN' là văn bản thường. Dùng thẻ nào?",
        options: ["<p>", "<h1>", "<footer-text>", "<title>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Các link 'Chính sách', 'Liên hệ' trong footer nên nhóm bằng thẻ nào?",
        options: ["<nav>", "<table>", "<form>", "<aside>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Footer của trang thường nằm ở vị trí nào?",
        options: ["Cuối trang, sau <main>", "Bắt buộc đầu trang", "Trong <head>", "Trong <title>"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một trang có thể có bao nhiêu <footer>?",
        options: [
          "Một footer chính cho trang (và có thể footer trong article/section)",
          "Bắt buộc đúng 0",
          "Bắt buộc đúng 5",
          "Không được có footer",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Mỗi liên kết trong footer dùng thẻ nào?",
        options: ["<a>", "<button>", "<span>", "<link>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_STRUCTURE",
        prompt:
          "Dựng chân trang: thẻ <footer> bọc ngoài, bên trong có một <p> ghi © 2026 ShopVN và một <nav> chứa 2 <a>.",
        requirements: [
          { type: "tagName", value: "footer" },
          { type: "contains", parent: "footer", child: "p", count: 1 },
          { type: "contains", parent: "footer", child: "nav", count: 1 },
          { type: "contains", parent: "nav", child: "a", count: 2 },
          { type: "text", tag: "p", index: 0, value: "© 2026 ShopVN" },
        ],
        starterCode: "<!-- <footer>: <p>© 2026 ShopVN</p> và <nav><a>...</a><a>...</a></nav> -->\n",
      },
    ],
  },

  // ===== BỐ CỤC TRANG =====
  {
    name: "bố cục trang",
    topic: "Bố cục trang",
    part: PART,
    description: "Ghép header + main + footer thành khung một trang",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Một trang web cơ bản thường gồm ba khối chính nào theo chiều dọc?",
        options: [
          "header → main → footer",
          "title → body → head",
          "nav → table → form",
          "aside → aside → aside",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Nội dung chính ở giữa trang (không gồm đầu/chân trang) dùng thẻ nào?",
        options: ["<main>", "<center>", "<content>", "<body2>"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Mỗi trang nên có bao nhiêu thẻ <main>?",
        options: ["Đúng một", "Ít nhất ba", "Càng nhiều càng tốt", "Không cần thẻ main"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Thứ tự đặt ba khối chính trong khung trang là gì?",
        options: [
          "<header> trước, <main> giữa, <footer> cuối",
          "<footer> trước cùng",
          "<main> nằm trong <header>",
          "Đặt ngẫu nhiên đều được",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao dùng <header>/<main>/<footer> thay vì ba thẻ <div>?",
        options: [
          "Ngữ nghĩa rõ ràng — tốt cho SEO và trợ năng",
          "Để code ngắn hơn",
          "Vì <div> bị cấm",
          "Để chạy nhanh hơn",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Một sidebar nội dung phụ bên cạnh <main> nên dùng thẻ nào?",
        options: ["<aside>", "<main2>", "<side>", "<extra>"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_STRUCTURE",
        prompt:
          "Dựng khung bố cục một trang trong một <div>: bên trong lần lượt có một <header>, một <main>, và một <footer>.",
        requirements: [
          { type: "tagName", value: "div" },
          { type: "contains", parent: "div", child: "header", count: 1 },
          { type: "contains", parent: "div", child: "main", count: 1 },
          { type: "contains", parent: "div", child: "footer", count: 1 },
        ],
        starterCode: "<!-- <div> bọc ngoài: <header></header>, <main></main>, <footer></footer> -->\n",
      },
    ],
  },
];
