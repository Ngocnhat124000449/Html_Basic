import type { GitSeedTag } from "./types";

const PART = "Git";

// PHẦN 1 — Git (Tuần 17): khởi tạo & commit, nhánh & merge, remote & pull request.
// Bậc 3 type WRITE_CMD: gõ chuỗi lệnh Git, chấm TĨNH bằng so chuỗi con (contains).
// Giá trị TÙY Ý (tên nhánh feature/main, lời nhắn, URL) đánh `inPrompt: true` để
// guard buộc hiện nguyên văn trong đề; ĐỘNG TỪ lệnh (git init…) cố tình KHÔNG lộ.
export const PART1_GIT: GitSeedTag[] = [
  // ===== CHƯƠNG: KHỞI TẠO & COMMIT =====
  {
    name: "git cơ bản",
    topic: "Khởi tạo & commit",
    part: PART,
    description: "Khởi tạo kho, theo dõi thay đổi và tạo commit",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Sửa xong tính năng giỏ hàng, bạn muốn lưu một mốc kèm ghi chú 'thêm giỏ hàng'. Lệnh nào tạo mốc có ghi chú đó?",
        options: [
          'git commit -m "thêm giỏ hàng"',
          'git save "thêm giỏ hàng"',
          'git add -m "thêm giỏ hàng"',
          'git log "thêm giỏ hàng"',
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lệnh nào khởi tạo một kho Git mới trong thư mục hiện tại?",
        options: ["git init", "git start", "git new", "git create"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Để xem những file nào đang thay đổi và trạng thái kho, bạn dùng lệnh nào?",
        options: ["git status", "git show", "git list", "git check"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Một 'commit' trong Git về cơ bản là gì?",
        options: [
          "Một ảnh chụp (snapshot) các thay đổi kèm lời nhắn",
          "Một bản sao toàn bộ ổ cứng",
          "Một trang web tĩnh",
          "Một thư mục nén lại",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lệnh nào đưa tất cả thay đổi vào vùng chờ (staging) trước khi commit?",
        options: ["git add .", "git stage all", "git commit .", "git push ."],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Vì sao mỗi commit nên kèm một lời nhắn (message) rõ ràng?",
        options: [
          "Để sau này biết commit đó đã thay đổi gì",
          "Để Git chạy nhanh hơn",
          "Vì không có message sẽ mất file",
          "Để giảm dung lượng repo",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lệnh nào xem lại lịch sử các commit đã tạo?",
        options: ["git log", "git history", "git past", "git commits"],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CMD",
        prompt:
          "Bạn vừa tạo thư mục dự án expense-tracker. Hãy gõ lần lượt (mỗi lệnh một dòng): lệnh khởi tạo một kho Git mới, lệnh đưa TẤT CẢ thay đổi vào vùng chờ, và lệnh tạo commit đầu tiên với lời nhắn first commit.",
        requirements: [
          { type: "contains", text: "git init", message: "Cần khởi tạo kho bằng `git init`" },
          { type: "contains", text: "git add", message: "Cần đưa thay đổi vào staging bằng `git add`" },
          { type: "contains", text: "git commit", message: "Cần tạo commit bằng `git commit`" },
          { type: "contains", text: "first commit", inPrompt: true, message: "Commit phải có lời nhắn first commit" },
        ],
        starterCode: "# Mỗi lệnh trên một dòng\n",
      },
    ],
  },

  // ===== CHƯƠNG: NHÁNH & MERGE =====
  {
    name: "nhánh & merge",
    topic: "Nhánh & Merge",
    part: PART,
    description: "Tạo nhánh, chuyển nhánh và gộp thay đổi",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Sếp giao làm tính năng mới nhưng KHÔNG được ảnh hưởng code đang chạy ở nhánh chính. Bạn nên làm gì trước tiên?",
        options: [
          "Tạo một nhánh riêng để làm tính năng đó",
          "Sửa thẳng trên nhánh main cho nhanh",
          "Xóa nhánh main đi",
          "Commit đè lên code cũ",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Nhánh (branch) trong Git dùng để làm gì?",
        options: [
          "Tách một hướng làm việc riêng, không ảnh hưởng nhánh chính",
          "Sao lưu toàn bộ máy tính",
          "Tăng tốc độ mạng",
          "Nén các file ảnh",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lệnh nào liệt kê các nhánh hiện có trong kho?",
        options: ["git branch", "git list", "git tree", "git show branches"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Nhánh mặc định của một kho Git thường được đặt tên là gì?",
        options: ["main (hoặc master)", "root", "base", "origin"],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lệnh nào vừa tạo nhánh mới tên feature vừa chuyển sang nó?",
        options: [
          "git checkout -b feature",
          "git branch feature only",
          "git switch feature --old",
          "git new feature",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Sau khi làm xong ở nhánh feature, để đưa thay đổi vào main bạn làm gì?",
        options: [
          "Chuyển về main rồi chạy git merge feature",
          "Xóa nhánh main đi",
          "Đổi tên feature thành main",
          "Chạy git push feature main",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "'Xung đột merge' (merge conflict) thường xảy ra khi nào?",
        options: [
          "Hai nhánh sửa cùng một chỗ trong một file theo cách khác nhau",
          "Khi mạng bị chậm",
          "Khi quên đặt message",
          "Khi repo quá lớn",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CMD",
        prompt:
          "Bạn muốn làm tính năng mới mà không ảnh hưởng nhánh main. Hãy gõ (mỗi lệnh một dòng): lệnh tạo nhánh mới tên feature và chuyển sang nó bằng MỘT lệnh; rồi lệnh chuyển về nhánh main; rồi lệnh gộp nhánh feature vào.",
        requirements: [
          { type: "contains", text: "checkout -b", message: "Tạo & chuyển nhánh bằng `git checkout -b`" },
          { type: "contains", text: "feature", inPrompt: true, message: "Nhánh mới phải tên feature" },
          { type: "contains", text: "main", inPrompt: true, message: "Cần chuyển về nhánh main" },
          { type: "contains", text: "git merge", message: "Cần gộp nhánh bằng `git merge`" },
        ],
        starterCode: "# Tạo nhánh, rồi về main và gộp\n",
      },
    ],
  },

  // ===== CHƯƠNG: REMOTE & PULL REQUEST =====
  {
    name: "remote & pull request",
    topic: "Remote & Pull Request",
    part: PART,
    description: "Liên kết remote, push/pull và quy trình PR",
    questions: [
      {
        tier: 1, type: "MCQ",
        prompt: "Bạn code xong ở máy mình và muốn đồng đội trên GitHub thấy được code đó. Việc cần làm là gì?",
        options: [
          "Đẩy (push) code lên remote",
          "Chụp màn hình gửi cho đồng đội",
          "Copy file qua USB",
          "Chạy git init lại",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "'origin' trong Git thường chỉ điều gì?",
        options: [
          "Tên mặc định của kho từ xa (remote)",
          "Tên người dùng",
          "Nhánh chính",
          "Một loại file",
        ],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "Lệnh nào tải thay đổi mới từ remote về và gộp vào nhánh hiện tại?",
        options: ["git pull", "git get", "git download", "git fetch --merge-now"],
        correctIndex: 0,
      },
      {
        tier: 1, type: "MCQ",
        prompt: "GitHub là gì so với Git?",
        options: [
          "Dịch vụ lưu trữ kho Git trên mạng",
          "Một trình soạn thảo code",
          "Một ngôn ngữ lập trình",
          "Một hệ điều hành",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Lệnh nào liên kết kho local với một remote tên origin?",
        options: [
          "git remote add origin <url>",
          "git connect origin",
          "git link origin",
          "git origin add",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Khi đẩy nhánh lên lần đầu, vì sao thường dùng git push -u origin main?",
        options: [
          "Để thiết lập upstream, lần sau chỉ cần git push",
          "Để xóa nhánh cũ",
          "Để nén dữ liệu",
          "Vì nếu không sẽ mất commit",
        ],
        correctIndex: 0,
      },
      {
        tier: 2, type: "MCQ",
        prompt: "Pull request (PR) trên GitHub dùng để làm gì?",
        options: [
          "Đề nghị gộp thay đổi và để người khác review trước",
          "Tải toàn bộ repo về máy",
          "Xóa một nhánh",
          "Đổi mật khẩu tài khoản",
        ],
        correctIndex: 0,
      },
      {
        tier: 3, type: "WRITE_CMD",
        prompt:
          "Bạn đã tạo repo rỗng trên GitHub tại https://github.com/me/expense.git. Hãy gõ (mỗi lệnh một dòng): lệnh thêm remote tên origin trỏ tới đúng URL đó; rồi lệnh đẩy nhánh main lên lần đầu kèm thiết lập upstream.",
        requirements: [
          { type: "contains", text: "git remote add origin", message: "Thêm remote bằng `git remote add origin`" },
          { type: "contains", text: "https://github.com/me/expense.git", inPrompt: true, message: "Remote phải trỏ tới đúng URL đã cho" },
          { type: "contains", text: "git push", message: "Cần đẩy lên bằng `git push`" },
          { type: "contains", text: "-u", message: "Cần thiết lập upstream bằng cờ -u" },
        ],
        starterCode: "# remote add rồi push -u\n",
      },
    ],
  },
];
