# Lộ trình HTML từ số 0 — Nhập môn + reorder: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm chủ đề "Nhập môn" (5 thẻ khái niệm, 35 câu) đứng đầu lộ trình HTML và kéo "Cấu trúc trang" lên vị trí 2; tên thẻ khái niệm hiển thị trần (không bọc `<>`).

**Architecture:** Nội dung vào `prisma/seed.ts` (order = vị trí mảng; upsert giữ tiến độ). Helper thuần `htmlTagLabel` trong `src/lib/tracks.ts` quyết định bọc `<>`, dùng ở 5 chỗ hiển thị. Baseline guard cập nhật sau seed.

**Tech Stack:** Prisma seed (tsx), vitest, Next.js.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-08-html-onramp-redesign.md`.
- Guard seed: mỗi thẻ ≥3 bậc1, ≥3 bậc2, ĐÚNG 1 bậc3; MCQ đúng 4 options; không trùng prompt; giá trị tùy ý trong requirements attr/text phải hiện nguyên văn trong prompt/starterCode.
- KHÔNG đổi prompt/nội dung 60 thẻ HTML hiện có. Seed chạy trên Neon (chung prod).

---

### Task 1: `htmlTagLabel` — tên thẻ khái niệm không bọc `<>`

**Files:**
- Modify: `src/lib/tracks.ts`, Test: `src/lib/tracks.test.ts`
- Modify (dùng helper): `src/app/study/page.tsx:19-22` (tagLabel), `src/app/html/page.tsx:197`, `src/app/tags/page.tsx:115`, `src/app/tags/[name]/page.tsx:122`, `src/app/practice/practice-game.tsx:103`

**Interfaces:**
- Produces: `export function htmlTagLabel(name: string): string` — trả `<name>` nếu name khớp `/^[a-z][a-z0-9]*$/`, ngược lại trả name trần.

- [ ] **Step 1: Test fail** — thêm vào `tracks.test.ts`:

```ts
describe("htmlTagLabel", () => {
  it("tên thẻ thật bọc <>", () => {
    expect(htmlTagLabel("h1")).toBe("<h1>");
    expect(htmlTagLabel("figcaption")).toBe("<figcaption>");
  });
  it("tên khái niệm (có khoảng trắng/ký tự ngoài a-z0-9) hiện trần", () => {
    expect(htmlTagLabel("trang web & trình duyệt")).toBe("trang web & trình duyệt");
    expect(htmlTagLabel("file .html")).toBe("file .html");
  });
});
```

(nhớ thêm `htmlTagLabel` vào import đầu file)

- [ ] **Step 2:** `npx vitest run src/lib/tracks.test.ts` → FAIL (chưa export).

- [ ] **Step 3: Cài đặt** — thêm cuối `tracks.ts`:

```ts
// Tên thẻ HTML thật (h1, p, figcaption...) bọc <>; thẻ KHÁI NIỆM của phần Nhập môn
// ("trang web & trình duyệt"...) hiện trần.
export function htmlTagLabel(name: string): string {
  return /^[a-z][a-z0-9]*$/.test(name) ? `<${name}>` : name;
}
```

- [ ] **Step 4:** vitest PASS.

- [ ] **Step 5: Thay 5 chỗ hiển thị** (mỗi file import `htmlTagLabel` từ `@/lib/tracks`):
  - `study/page.tsx` tagLabel: `(tag.track === "html" ? htmlTagLabel(tag.name) : tag.name)`
  - `html/page.tsx:197`: `<code ...>{htmlTagLabel(t.name)}</code>` (bỏ `&lt;`/`&gt;`)
  - `tags/page.tsx:115` và `tags/[name]/page.tsx:122`: tương tự — nhưng CHỈ khi tag.track === "html"; xem code từng file, các trang này hiển thị mọi track: giữ nhánh track khác nguyên trạng.
  - `practice-game.tsx:103`: nhánh html dùng `htmlTagLabel(name)`.

- [ ] **Step 6:** `npm run build` sạch → commit `feat(ui): htmlTagLabel — tên thẻ khái niệm hiện trần`.

---

### Task 2: Seed 5 thẻ Nhập môn + kéo Cấu trúc trang lên vị trí 2

**Files:**
- Modify: `prisma/seed.ts` (mảng `tags`)
- Cập nhật: `scripts/html-baseline.json` (qua script, sau seed)

Chèn block sau vào ĐẦU mảng `tags` (trước `// ===== VĂN BẢN =====`), và DI CHUYỂN nguyên khối `// ===== CẤU TRÚC TRANG =====` (8 thẻ html→script) lên NGAY SAU block Nhập môn. Nội dung 5 thẻ (đầy đủ, đúng guard):

```ts
  // ===== NHẬP MÔN =====
  {
    name: "trang web & trình duyệt",
    topic: "Nhập môn",
    description: "Web là gì — trình duyệt đọc mã HTML rồi vẽ thành giao diện",
    questions: [
      { tier: 1, type: T.MCQ,
        prompt: "Bạn gõ shopvn.vn trên điện thoại và thấy trang bán hàng hiện ra. Phần mềm nào đã ĐỌC mã HTML rồi vẽ thành giao diện đó?",
        options: ["Trình duyệt (Chrome, Firefox, Safari...)", "Ứng dụng Facebook", "Ứng dụng Zalo", "Hệ điều hành Windows"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Trang web bạn nhìn thấy (chữ, nút bấm, hình ảnh) thực chất được mô tả bằng gì trước khi trình duyệt vẽ ra?",
        options: ["Mã HTML", "Một tấm ảnh chụp màn hình", "Một đoạn video", "File Word"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "HTML đóng vai trò gì khi xây một trang web?",
        options: ["Ngôn ngữ đánh dấu tạo CẤU TRÚC nội dung trang", "Ngôn ngữ lập trình để tính toán", "Phần mềm chỉnh sửa ảnh", "Hệ quản trị cơ sở dữ liệu"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Cùng một trang tin tức mở bằng Chrome hay Firefox đều hiện nội dung như nhau. Vì sao?",
        options: ["Cả hai đều đọc chung một mã HTML và dựng trang theo nó", "Vì Chrome sao chép giao diện của Firefox", "Vì trang web là một tấm ảnh cố định", "Vì hai trình duyệt dùng chung bộ nhớ"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Bạn bấm 'Xem nguồn trang' (View Source) trên trang tin và thấy toàn chữ kèm ký hiệu < >. Đó là gì?",
        options: ["Mã HTML mà trình duyệt nhận được để dựng trang", "Trang bị lỗi font chữ", "Mật khẩu của trang web", "Nội dung dành riêng cho quản trị viên"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Trong một trang web hoàn chỉnh, HTML chịu trách nhiệm phần nào?",
        options: ["Cấu trúc và nội dung (tiêu đề, đoạn văn, nút, ảnh...)", "Toàn bộ màu sắc và hiệu ứng chuyển động", "Tính toán và xử lý logic", "Lưu trữ dữ liệu người dùng lâu dài"],
        correctIndex: 0 },
      { tier: 3, type: T.FILL_BLANK,
        prompt: "Điền tên NGÔN NGỮ tạo cấu trúc trang web mà trình duyệt đọc để vẽ giao diện:",
        starterCode: "Trình duyệt tải mã ____ về rồi dựng thành trang bạn nhìn thấy",
        answer: "html" },
    ],
  },
  {
    name: "file .html",
    topic: "Nhập môn",
    description: "Trang web nằm trong file đuôi .html — soạn bằng editor, mở bằng trình duyệt",
    questions: [
      { tier: 1, type: T.MCQ,
        prompt: "Bạn viết trang giới thiệu bản thân và muốn trình duyệt mở được thành giao diện. File nên lưu với đuôi nào?",
        options: [".html", ".docx", ".png", ".exe"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Muốn soạn và sửa nội dung file gioi-thieu.html, bạn dùng công cụ nào hợp lý nhất?",
        options: ["Trình soạn code (VS Code, Notepad...)", "Photoshop", "Excel", "Trình nghe nhạc"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Muốn XEM file trang-chu.html hiện thành giao diện, bạn mở nó bằng gì?",
        options: ["Trình duyệt (Chrome, Firefox...)", "Máy in", "Trình giải nén file", "Ứng dụng máy tính bỏ túi"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Bạn lưu bài viết thành ho-so.txt rồi mở bằng trình duyệt thì chỉ thấy chữ thô, không thành giao diện. Vì sao?",
        options: ["Đuôi .txt không được xử lý như trang HTML nên trình duyệt chỉ hiện chữ thô", "Máy tính thiếu RAM", "Trình duyệt cấm mở file cá nhân", "File .txt bắt buộc phải in ra giấy"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Bạn vừa sửa file index.html trong editor nhưng trình duyệt đang mở vẫn hiện bản cũ. Làm gì để thấy thay đổi?",
        options: ["Lưu file rồi tải lại (refresh) trang trong trình duyệt", "Khởi động lại máy tính", "Cài lại trình duyệt", "Đổi tên file sang index2.html"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Theo quy ước phổ biến, trang chủ của một website thường đặt tên file là gì?",
        options: ["index.html", "home.docx", "main.css", "trangchu.txt"],
        correctIndex: 0 },
      { tier: 3, type: T.FILL_BLANK,
        prompt: "Điền đuôi file (gồm cả dấu chấm) để trình duyệt hiểu đây là trang web:",
        starterCode: "gioi-thieu____",
        answer: ".html" },
    ],
  },
  {
    name: "thẻ & phần tử",
    topic: "Nhập môn",
    description: "Cú pháp <thẻ>nội dung</thẻ> — thẻ mở, thẻ đóng, lồng nhau",
    questions: [
      { tier: 1, type: T.MCQ,
        prompt: "Trong dòng <p>Chào bạn</p>, phần nào là THẺ MỞ?",
        options: ["<p>", "</p>", "Chào bạn", "p>"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Thẻ đóng khác thẻ mở ở điểm nào?",
        options: ["Có dấu gạch chéo / trước tên thẻ, ví dụ </p>", "Viết bằng chữ in hoa", "Nằm ở đầu file", "Có dấu chấm than phía trước"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Cả cụm <p>Chào bạn</p> (thẻ mở + nội dung + thẻ đóng) được gọi là gì?",
        options: ["Một phần tử (element)", "Một thuộc tính", "Một file", "Một trình duyệt"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Dòng nào viết ĐÚNG cú pháp thẻ cho đoạn giới thiệu sản phẩm?",
        options: ["<p>Giày thể thao êm nhẹ</p>", "<p>Giày thể thao êm nhẹ<p>", "p>Giày thể thao êm nhẹ</p", "</p>Giày thể thao êm nhẹ<p>"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Muốn in đậm giá tiền bên trong đoạn văn, cách LỒNG thẻ nào đúng?",
        options: ["<p>Giá <strong>99k</strong></p>", "<p>Giá <strong>99k</p></strong>", "<p><strong>Giá 99k</p>", "<strong><p>99k</strong></p>"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Nếu quên thẻ đóng </p>, chuyện gì thường xảy ra?",
        options: ["Trình duyệt có thể hiểu sai chỗ kết thúc đoạn khiến bố cục lệch", "Máy tính tắt nguồn", "File không thể lưu được", "Trình duyệt từ chối mở cả trang"],
        correctIndex: 0 },
      { tier: 3, type: T.WRITE_TAG,
        prompt: "Viết một phần tử hoàn chỉnh: thẻ p chứa nội dung: Mình là Nhật",
        requirements: [
          { type: "tagName", value: "p" },
          { type: "text", tag: "p", index: 0, value: "Mình là Nhật" },
        ] },
    ],
  },
  {
    name: "thuộc tính",
    topic: "Nhập môn",
    description: "Thông tin thêm gắn trong thẻ mở, dạng tên=\"giá trị\"",
    questions: [
      { tier: 1, type: T.MCQ,
        prompt: "Trong <a href=\"https://shopvn.vn\">ShopVN</a>, cụm href=\"https://shopvn.vn\" được gọi là gì?",
        options: ["Thuộc tính (tên + giá trị)", "Thẻ đóng", "Nội dung của phần tử", "Tên file"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Thuộc tính được viết ở vị trí nào của phần tử?",
        options: ["Bên trong THẺ MỞ, ngay sau tên thẻ", "Bên trong thẻ đóng", "Sau thẻ đóng", "Trên một dòng tách riêng khỏi thẻ"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Cú pháp đúng của một thuộc tính là gì?",
        options: ["tên=\"giá trị\"", "tên:giá trị;", "(tên=giá trị)", "tên->giá trị"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Dòng nào viết thuộc tính ĐÚNG cho ảnh bìa anh-bia.jpg?",
        options: ["<img src=\"anh-bia.jpg\">", "<img src=anh bia.jpg>", "<img \"src\"=anh-bia.jpg>", "<img src:\"anh-bia.jpg\">"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Một thẻ có thể mang NHIỀU thuộc tính không?",
        options: ["Có — các thuộc tính cách nhau bằng khoảng trắng trong thẻ mở", "Không — mỗi thẻ chỉ được đúng một thuộc tính", "Chỉ thẻ img mới được nhiều thuộc tính", "Chỉ khi viết mỗi thuộc tính trên một file riêng"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Giá trị của thuộc tính nên được đặt trong gì để tránh lỗi (nhất là khi có khoảng trắng)?",
        options: ["Cặp ngoặc kép \"...\"", "Cặp ngoặc nhọn <...>", "Cặp ngoặc vuông [...]", "Không cần gì cả"],
        correctIndex: 0 },
      { tier: 3, type: T.WRITE_TAG,
        prompt: "Chèn ảnh banner khuyến mãi: viết thẻ img (thẻ chèn ảnh, không cần thẻ đóng) có thuộc tính src mang giá trị banner.jpg",
        requirements: [
          { type: "tagName", value: "img" },
          { type: "attr", tag: "img", name: "src", value: "banner.jpg" },
        ] },
    ],
  },
  {
    name: "khung trang tối thiểu",
    topic: "Nhập môn",
    description: "Bộ khung <!DOCTYPE html> + html/head/body của mọi trang web",
    questions: [
      { tier: 1, type: T.MCQ,
        prompt: "Dòng ĐẦU TIÊN của mọi file trang web hiện đại, báo cho trình duyệt biết 'đây là HTML', là gì?",
        options: ["<!DOCTYPE html>", "<html5>", "#include html", "<!START>"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Nội dung NGƯỜI DÙNG nhìn thấy (chữ, ảnh, nút bấm) được đặt trong thẻ nào?",
        options: ["<body>", "<head>", "<title>", "<meta>"],
        correctIndex: 0 },
      { tier: 1, type: T.MCQ,
        prompt: "Thẻ nào bao ngoài cùng, chứa toàn bộ trang web?",
        options: ["<html>", "<body>", "<head>", "<div>"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Phần <head> của trang chứa gì?",
        options: ["Thông tin VỀ trang (tiêu đề tab, mã hóa ký tự...) — không hiện trong lòng trang", "Toàn bộ chữ và ảnh người dùng nhìn thấy", "Chỉ chứa quảng cáo", "Mật khẩu quản trị của trang"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Bạn viết 'Chào mừng đến ShopVN' nhưng đặt nhầm vào <head> thay vì <body>. Kết quả thường thấy là gì?",
        options: ["Dòng chữ không hiện đúng chỗ trong lòng trang — head không dành cho nội dung hiển thị", "Trang đẹp hơn vì head ưu tiên hiển thị", "Máy tính báo virus", "File tự động đổi đuôi thành .txt"],
        correctIndex: 0 },
      { tier: 2, type: T.MCQ,
        prompt: "Thứ tự khung trang nào là ĐÚNG?",
        options: ["<!DOCTYPE html> rồi <html> bao lấy <head> và <body>", "<body> bao lấy <html> và <head>", "<head> nằm bên trong <body>", "<!DOCTYPE html> đặt ở cuối file"],
        correctIndex: 0 },
      { tier: 3, type: T.WRITE_STRUCTURE,
        prompt: "Viết khung trang tối thiểu: thẻ html chứa thẻ head (để trống) và thẻ body chứa nội dung: Trang đầu tiên của mình",
        requirements: [
          { type: "tagName", value: "html" },
          { type: "contains", parent: "html", child: "head", count: 1 },
          { type: "contains", parent: "html", child: "body", count: 1 },
          { type: "text", tag: "body", index: 0, value: "Trang đầu tiên của mình" },
        ] },
    ],
  },
```

- [ ] **Step 1:** Chèn block trên + di chuyển khối `CẤU TRÚC TRANG` lên sau Nhập môn (dùng script Python cắt-dán theo marker `// ===== CẤU TRÚC TRANG =====` và `// ===== NGỮ NGHĨA =====`... xem vị trí thật trong file, cắt từ marker tới marker kế tiếp).
- [ ] **Step 2:** `npm test` → guard seed-content PASS (65 thẻ), toàn bộ suite xanh.
- [ ] **Step 3:** `npx tsx prisma/seed.ts` → log "Đã seed 65 thẻ, 515 câu hỏi — giữ nguyên N bản ghi tiến độ" (N không đổi).
- [ ] **Step 4:** `npx tsx scripts/verify-html-intact.ts` → báo lệch tags/questions (đúng kỳ vọng), progress/attempts KHÔNG lệch → chạy lại với `--update`.
- [ ] **Step 5:** Commit `feat(html): phần Nhập môn 5 thẻ khái niệm + kéo Cấu trúc trang lên đầu`.

---

### Task 3: Verify browser + kết thúc

- [ ] **Step 1:** `npm run dev`; đăng ký user test; `/study?track=html&mode=learn` → thẻ đầu là `trang web & trình duyệt` (intro hiện tên TRẦN), làm 1-2 câu; `/html` và `/tags` hiện 65 thẻ, chủ đề Nhập môn đứng đầu, tên khái niệm không bọc `<>`.
- [ ] **Step 2:** Dọn user test; commit docs; FF-merge main; push (tự deploy Vercel).
- [ ] **Step 3:** Cập nhật memory (lộ trình HTML có phần Nhập môn; khuôn để nhân 6 khóa).
