// Kho GIÁ TRỊ của các thuộc tính CSS quan trọng, phân 3 mức (song song attribute-data.ts của HTML).
// CSS không học theo thẻ mà theo thuộc tính — mỗi thuộc tính có tập GIÁ TRỊ, chia 3 mức:
//
// - essential: quan trọng nhất — dùng gần như mỗi ngày, không biết là thiếu nền tảng
// - common:    hay dùng — gặp thường xuyên trong dự án thực tế
// - rare:      ít dùng nhưng hợp lệ — biết để đọc hiểu code người khác
//
// Dùng cho màn làm quen mục CSS mới (study) và tra cứu. `match` = từ khóa tên mục để
// nối entry này với mục tương ứng trong seed CSS.

export type CssValueImportance = "essential" | "common" | "rare";

export type CssValue = {
  value: string;
  importance: CssValueImportance;
  /** Giá trị này làm gì */
  desc: string;
  /** Khi nào chọn nó */
  when: string;
  warn?: string;
};

export type CssPropertyEntry = {
  prop: string;
  /** Từ khóa tên mục để khớp (study CssIntro dò trong tên mục) */
  match: string[];
  note?: string;
  values: CssValue[];
};

export const CSS_PROPERTIES: CssPropertyEntry[] = [
  {
    prop: "display",
    match: ["display block inline", "inline-block", "display none", "display flex", "display grid"],
    note: "Thuộc tính quyết định phần tử bố cục thế nào — học kỹ vì chi phối toàn bộ layout.",
    values: [
      { value: "block", importance: "essential", desc: "Khối chiếm trọn chiều rộng, xuống dòng mới", when: "div, p, section — phần tử khối mặc định" },
      { value: "inline", importance: "essential", desc: "Nằm cùng dòng, rộng bằng nội dung", when: "span, a — chữ trong dòng; không nhận width/height" },
      { value: "flex", importance: "essential", desc: "Bật Flexbox xếp con một chiều", when: "Hàng nút, thanh nav, căn giữa — bố cục linh hoạt 1 chiều" },
      { value: "grid", importance: "essential", desc: "Bật lưới 2 chiều hàng + cột", when: "Gallery, dashboard, layout có hàng và cột" },
      { value: "none", importance: "essential", desc: "Gỡ phần tử khỏi layout (ẩn hẳn)", when: "Ẩn/hiện menu, modal bằng JS" },
      { value: "inline-block", importance: "common", desc: "Cùng dòng nhưng nhận width/height/padding dọc", when: "Nút/nhãn cạnh nhau cần kích thước riêng" },
      { value: "inline-flex", importance: "rare", desc: "Flex container nằm cùng dòng văn bản", when: "Cụm icon+chữ flex nhưng chèn giữa câu" },
      { value: "table", importance: "rare", desc: "Mô phỏng hành vi bảng", when: "Hiếm — trước khi có flex/grid; nay ít dùng" },
    ],
  },
  {
    prop: "position",
    match: ["position relative", "position absolute", "position fixed", "z-index"],
    values: [
      { value: "static", importance: "essential", desc: "Mặc định — theo luồng, không nhận top/left", when: "Trạng thái bình thường của mọi phần tử" },
      { value: "relative", importance: "essential", desc: "Dịch so với vị trí gốc; làm mốc cho con absolute", when: "Bọc ngoài để neo nhãn/badge absolute bên trong" },
      { value: "absolute", importance: "essential", desc: "Gỡ khỏi luồng, neo theo tổ tiên positioned", when: "Nhãn giảm giá góc ảnh, tooltip, overlay" },
      { value: "fixed", importance: "common", desc: "Ghim theo màn hình, đứng yên khi cuộn", when: "Header cố định, nút back-to-top, modal" },
      { value: "sticky", importance: "common", desc: "Cuộn bình thường tới ngưỡng thì dính lại", when: "Tiêu đề mục dính đầu, thanh lọc theo cuộn" },
    ],
  },
  {
    prop: "flex-direction",
    match: ["flex-direction"],
    values: [
      { value: "row", importance: "essential", desc: "Xếp con theo hàng ngang (mặc định)", when: "Thanh nav, hàng nút, sidebar + nội dung" },
      { value: "column", importance: "essential", desc: "Xếp con theo cột dọc", when: "Thẻ sản phẩm dọc, form, layout mobile" },
      { value: "row-reverse", importance: "common", desc: "Ngang nhưng đảo thứ tự (con đầu bên phải)", when: "Đảo vị trí trực quan không sửa HTML" },
      { value: "column-reverse", importance: "rare", desc: "Dọc nhưng đảo thứ tự", when: "Khung chat hiện tin mới nhất dưới cùng" },
    ],
  },
  {
    prop: "justify-content",
    match: ["justify-content"],
    note: "Căn các con dọc theo TRỤC CHÍNH (ngang khi row).",
    values: [
      { value: "center", importance: "essential", desc: "Dồn các con vào giữa trục chính", when: "Căn giữa cụm nút, nội dung hero" },
      { value: "space-between", importance: "essential", desc: "Đẩy hai cụm ra hai đầu, chia đều ở giữa", when: "Logo trái + menu phải trên header" },
      { value: "flex-start", importance: "common", desc: "Dồn về đầu trục (mặc định)", when: "Xếp con từ trái sang, dư chỗ ở cuối" },
      { value: "flex-end", importance: "common", desc: "Dồn về cuối trục", when: "Đẩy nút hành động về cuối hàng" },
      { value: "space-around", importance: "common", desc: "Mỗi con có đệm hai bên (nửa khoảng ở mép)", when: "Chia khoảng quanh các mục đều nhau" },
      { value: "space-evenly", importance: "rare", desc: "Mọi khoảng (kể cả mép) bằng nhau", when: "Khi cần khoảng mép bằng khoảng giữa" },
    ],
  },
  {
    prop: "align-items",
    match: ["align-items"],
    note: "Căn các con dọc theo TRỤC PHỤ (dọc khi row).",
    values: [
      { value: "center", importance: "essential", desc: "Căn giữa theo trục phụ", when: "Căn giữa dọc icon + chữ cùng hàng" },
      { value: "stretch", importance: "essential", desc: "Kéo giãn lấp đầy trục phụ (mặc định)", when: "Các thẻ cùng hàng tự cao bằng nhau" },
      { value: "flex-start", importance: "common", desc: "Căn về đầu trục phụ (trên cùng)", when: "Các con cao khác nhau căn mép trên" },
      { value: "flex-end", importance: "common", desc: "Căn về cuối trục phụ (dưới cùng)", when: "Căn đáy các cột chiều cao khác nhau" },
      { value: "baseline", importance: "rare", desc: "Căn theo đường chân chữ", when: "Hàng chữ nhiều cỡ font cần thẳng baseline" },
    ],
  },
  {
    prop: "text-align",
    match: ["text-align"],
    values: [
      { value: "left", importance: "essential", desc: "Căn chữ về trái (mặc định)", when: "Văn bản dài — mép trái thẳng dễ đọc" },
      { value: "center", importance: "essential", desc: "Căn chữ vào giữa", when: "Tiêu đề, nhãn ngắn, ô trống" },
      { value: "right", importance: "essential", desc: "Căn chữ về phải", when: "Cột số tiền, ngày tháng trong bảng" },
      { value: "justify", importance: "common", desc: "Giãn chữ thẳng cả hai mép", when: "Văn bản dạng báo/tạp chí; coi chừng 'dòng sông' khoảng trắng", warn: "Cột hẹp dễ tạo khoảng trắng xấu" },
    ],
  },
  {
    prop: "font-weight",
    match: ["font-weight"],
    values: [
      { value: "normal", importance: "essential", desc: "Chữ thường (= 400)", when: "Thân bài, mặc định" },
      { value: "bold", importance: "essential", desc: "Chữ đậm (= 700)", when: "Nhấn mạnh, tiêu đề, giá tiền" },
      { value: "600", importance: "common", desc: "Đậm vừa (semibold)", when: "Tiêu đề phụ cần đậm nhẹ hơn 700" },
      { value: "300", importance: "rare", desc: "Mảnh (light)", when: "Tiêu đề lớn phong cách thanh mảnh", warn: "Font phải có sẵn weight này, không thì rơi về gần nhất" },
      { value: "900", importance: "rare", desc: "Rất đậm (black)", when: "Tiêu đề poster, banner gây ấn tượng mạnh" },
    ],
  },
  {
    prop: "font-style",
    match: ["font-style"],
    values: [
      { value: "normal", importance: "essential", desc: "Chữ đứng (mặc định)", when: "Bỏ nghiêng, trạng thái bình thường" },
      { value: "italic", importance: "essential", desc: "Chữ nghiêng (dùng bản thiết kế nghiêng của font)", when: "Trích dẫn, tên tác phẩm, từ nước ngoài" },
      { value: "oblique", importance: "rare", desc: "Nghiêng cơ học chữ đứng", when: "Khi font không có bản italic riêng" },
    ],
  },
  {
    prop: "text-decoration",
    match: ["text-decoration"],
    values: [
      { value: "none", importance: "essential", desc: "Bỏ gạch (vd bỏ gạch chân link)", when: "Link trong menu/nút không cần gạch chân" },
      { value: "underline", importance: "essential", desc: "Gạch chân chữ", when: "Nhấn link trong đoạn văn, nhấn mạnh nhẹ" },
      { value: "line-through", importance: "common", desc: "Gạch ngang chữ", when: "Giá cũ đã giảm, mục đã hoàn thành" },
      { value: "overline", importance: "rare", desc: "Gạch trên đầu chữ", when: "Hiếm — ký hiệu toán/khoa học" },
    ],
  },
  {
    prop: "text-transform",
    match: ["text-transform"],
    values: [
      { value: "none", importance: "essential", desc: "Giữ nguyên chữ như HTML (mặc định)", when: "Văn bản bình thường" },
      { value: "uppercase", importance: "essential", desc: "Hiển thị TOÀN HOA", when: "Nhãn chuyên mục, badge, nút" },
      { value: "lowercase", importance: "common", desc: "Hiển thị toàn thường", when: "Chuẩn hóa email, tag" },
      { value: "capitalize", importance: "common", desc: "Viết hoa chữ đầu mỗi từ", when: "Tiêu đề kiểu Title Case" },
    ],
  },
  {
    prop: "cursor",
    match: ["cursor"],
    values: [
      { value: "pointer", importance: "essential", desc: "Con trỏ bàn tay", when: "Phần tử bấm được không phải button/a (div giả nút)" },
      { value: "default", importance: "essential", desc: "Mũi tên mặc định", when: "Trả về con trỏ thường" },
      { value: "not-allowed", importance: "common", desc: "Hình cấm", when: "Nút/ô bị khóa, disabled" },
      { value: "text", importance: "common", desc: "Con trỏ I-beam chọn chữ", when: "Vùng chữ chọn được" },
      { value: "grab", importance: "rare", desc: "Bàn tay mở (sẵn sàng nắm)", when: "Phần tử kéo-thả; đang kéo dùng grabbing" },
      { value: "wait", importance: "rare", desc: "Đồng hồ/vòng xoay bận", when: "Đang xử lý, chờ kết quả" },
    ],
  },
  {
    prop: "overflow",
    match: ["overflow"],
    values: [
      { value: "visible", importance: "essential", desc: "Nội dung tràn vẫn hiện (mặc định)", when: "Trạng thái thường, không cắt" },
      { value: "hidden", importance: "essential", desc: "Cắt bỏ phần tràn", when: "Cắt ảnh theo bo góc, ẩn phần dư" },
      { value: "auto", importance: "essential", desc: "Hiện thanh cuộn chỉ khi tràn", when: "Khung chat, vùng nội dung cuộn được" },
      { value: "scroll", importance: "common", desc: "Luôn hiện thanh cuộn dù không tràn", when: "Hiếm — khi muốn máng cuộn cố định" },
    ],
  },
  {
    prop: "object-fit",
    match: ["object-fit"],
    note: "Cách ảnh <img> lấp khung khi bị ép width/height.",
    values: [
      { value: "cover", importance: "essential", desc: "Giữ tỷ lệ, phủ kín khung, cắt phần thừa", when: "Thumbnail/avatar đồng đều kích thước" },
      { value: "contain", importance: "essential", desc: "Giữ tỷ lệ, hiện trọn ảnh, có thể hở", when: "Logo không được cắt xén" },
      { value: "fill", importance: "common", desc: "Kéo khít khung (méo ảnh) — mặc định", when: "Hiếm khi muốn; thường gây méo" },
      { value: "none", importance: "rare", desc: "Giữ nguyên kích thước thật", when: "Không co kéo, cắt theo khung" },
    ],
  },
  {
    prop: "background-size",
    match: ["background-size", "background shorthand"],
    values: [
      { value: "cover", importance: "essential", desc: "Phủ kín phần tử (có thể cắt)", when: "Hero/banner full không hở mép" },
      { value: "contain", importance: "essential", desc: "Hiện trọn ảnh trong phần tử", when: "Ảnh nền cần thấy trọn vẹn" },
      { value: "auto", importance: "common", desc: "Giữ kích thước thật ảnh (mặc định)", when: "Pattern lặp đúng cỡ gốc" },
    ],
  },
  {
    prop: "border-style",
    match: ["border"],
    note: "Phần kiểu nét trong shorthand border (vd: 1px solid black).",
    values: [
      { value: "solid", importance: "essential", desc: "Nét liền", when: "Viền thông dụng nhất" },
      { value: "none", importance: "essential", desc: "Không viền", when: "Bỏ viền mặc định (vd của button)" },
      { value: "dashed", importance: "common", desc: "Nét đứt quãng", when: "Vùng kéo-thả, đường phân cách nhẹ" },
      { value: "dotted", importance: "common", desc: "Nét chấm", when: "Trang trí, đường gạch tinh tế" },
      { value: "double", importance: "rare", desc: "Hai nét song song", when: "Trang trí cổ điển" },
    ],
  },
  {
    prop: "white-space",
    match: ["overflow"],
    note: "Cách xử lý khoảng trắng và xuống dòng của chữ.",
    values: [
      { value: "normal", importance: "essential", desc: "Gộp khoảng trắng, tự xuống dòng (mặc định)", when: "Văn bản thường" },
      { value: "nowrap", importance: "essential", desc: "Không xuống dòng, chữ chạy thẳng", when: "Cắt 1 dòng + ellipsis, nút không vỡ chữ" },
      { value: "pre", importance: "common", desc: "Giữ nguyên khoảng trắng + xuống dòng", when: "Hiển thị code, thơ, ASCII" },
      { value: "pre-wrap", importance: "rare", desc: "Giữ khoảng trắng nhưng vẫn tự xuống dòng", when: "Code dài cần wrap mà giữ thụt lề" },
    ],
  },
];

/** Tra entry giá trị 3 mức theo tên mục CSS (khớp qua `match`). */
export function findCssPropertyForMuc(mucName: string): CssPropertyEntry | undefined {
  const name = mucName.toLowerCase();
  return CSS_PROPERTIES.find((e) => e.match.some((m) => name.includes(m)));
}
