// Dữ liệu Phản xạ Git & Công cụ: tình huống công việc → người chơi gõ TÊN LỆNH/
// KHÁI NIỆM. Cố ý KHÔNG nhắc tên cần trả lời trong đề — luyện "gặp nhu cầu, nhớ lệnh".
// answer = lệnh/khái niệm; accept = các cách viết khác cũng chấp nhận.

export type GitReflexQuestion = {
  answer: string;
  accept?: string[];
  prompt: string;
  explain: string;
};

export const GIT_REFLEX_QUESTIONS: GitReflexQuestion[] = [
  // ===== CƠ BẢN =====
  {
    answer: "git init",
    prompt: "Bạn vừa tạo thư mục dự án và muốn bắt đầu theo dõi phiên bản mã nguồn từ con số 0.",
    explain: "git init khởi tạo một kho Git mới trong thư mục.",
  },
  {
    answer: "git status",
    prompt: "Muốn xem nhanh những tệp nào đang thay đổi, tệp nào đã vào vùng chờ.",
    explain: "git status hiện trạng thái hiện tại của kho.",
  },
  {
    answer: "git add",
    accept: ["git add ."],
    prompt: "Đưa các thay đổi vào vùng chờ (staging) trước khi lưu một mốc.",
    explain: "git add đưa thay đổi vào staging.",
  },
  {
    answer: "git commit",
    prompt: "Lưu lại một mốc lịch sử kèm lời nhắn mô tả những gì vừa thay đổi.",
    explain: "git commit tạo một mốc lưu trong lịch sử.",
  },
  {
    answer: "git commit -m",
    prompt: "Tạo một mốc lưu kèm lời nhắn ngắn ngay trên cùng một dòng lệnh.",
    explain: "Cờ -m gắn message trực tiếp khi tạo mốc.",
  },
  {
    answer: "git log",
    prompt: "Xem lại toàn bộ các mốc đã lưu — ai làm gì, khi nào.",
    explain: "git log liệt kê lịch sử các mốc lưu.",
  },
  {
    answer: "git diff",
    prompt: "Muốn xem chính xác từng dòng đã đổi so với lần lưu trước.",
    explain: "git diff so sánh chi tiết thay đổi.",
  },
  // ===== NHÁNH =====
  {
    answer: "git branch",
    accept: ["branch"],
    prompt: "Muốn xem hoặc tạo một dòng làm việc song song, tách khỏi dòng chính.",
    explain: "git branch xem/tạo nhánh.",
  },
  {
    answer: "git checkout",
    accept: ["git switch", "checkout", "switch"],
    prompt: "Chuyển sang một dòng làm việc khác để code mà không đụng dòng chính.",
    explain: "git checkout / git switch chuyển nhánh.",
  },
  {
    answer: "git merge",
    accept: ["merge"],
    prompt: "Gộp các thay đổi từ một dòng làm việc khác trở lại dòng hiện tại.",
    explain: "git merge hợp nhất hai nhánh.",
  },
  {
    answer: "main",
    accept: ["master"],
    prompt: "Tên thường gặp của dòng làm việc chính trong một kho hiện đại.",
    explain: "main (hoặc master) là nhánh mặc định.",
  },
  {
    answer: "HEAD",
    prompt: "Con trỏ chỉ tới mốc/nhánh mà bạn đang đứng ngay lúc này.",
    explain: "HEAD trỏ tới vị trí hiện tại.",
  },
  // ===== REMOTE =====
  {
    answer: "git clone",
    prompt: "Tải toàn bộ một kho mã nguồn từ trên mạng về máy lần đầu tiên.",
    explain: "git clone sao một kho remote về máy.",
  },
  {
    answer: "git push",
    prompt: "Đẩy các mốc đã lưu ở máy lên kho chung trên mạng cho cả nhóm thấy.",
    explain: "git push tải các mốc lên remote.",
  },
  {
    answer: "git pull",
    prompt: "Lấy các thay đổi mới nhất từ kho trên mạng về và hợp luôn vào máy.",
    explain: "git pull = fetch + merge.",
  },
  {
    answer: "git fetch",
    prompt: "Tải các thay đổi mới từ kho trên mạng về NHƯNG chưa hợp vào nhánh.",
    explain: "git fetch lấy về, chưa hợp nhất.",
  },
  {
    answer: "git remote",
    accept: ["git remote add"],
    prompt: "Liên kết kho ở máy với một địa chỉ kho trên mạng, đặt tên là origin.",
    explain: "git remote quản lý kho từ xa.",
  },
  {
    answer: "origin",
    prompt: "Tên mặc định trỏ tới kho từ xa khi bạn vừa sao kho về.",
    explain: "origin là tên remote mặc định.",
  },
  {
    answer: "pull request",
    accept: ["pr", "merge request"],
    prompt: "Đề nghị gộp nhánh của bạn vào nhánh chính để người khác duyệt trước trên GitHub.",
    explain: "Pull request để review rồi gộp.",
  },
  {
    answer: "merge conflict",
    accept: ["xung đột", "conflict"],
    prompt: "Hai nhánh sửa cùng một chỗ nên Git không tự gộp được, phải sửa bằng tay.",
    explain: "Xung đột khi gộp — giải quyết thủ công.",
  },
  // ===== HOÀN TÁC =====
  {
    answer: "git revert",
    prompt: "Hoàn tác một mốc đã đẩy lên bằng cách tạo một mốc mới đảo ngược nó.",
    explain: "git revert tạo mốc đảo ngược (an toàn).",
  },
  {
    answer: "git stash",
    prompt: "Tạm cất các thay đổi đang làm dở để chuyển việc, lát lấy lại sau.",
    explain: "git stash cất tạm thay đổi.",
  },
  {
    answer: "git restore",
    accept: ["git checkout --"],
    prompt: "Bỏ các thay đổi chưa lưu ở một tệp, đưa nó về như lần lưu gần nhất.",
    explain: "git restore khôi phục tệp về mốc cũ.",
  },
  {
    answer: "git reset",
    prompt: "Gỡ một tệp ra khỏi vùng chờ vì chưa muốn lưu nó ở mốc này.",
    explain: "git reset bỏ tệp khỏi staging.",
  },
  // ===== CÔNG CỤ =====
  {
    answer: ".gitignore",
    prompt: "Khai báo những tệp/thư mục (như node_modules) KHÔNG muốn theo dõi.",
    explain: ".gitignore liệt kê thứ Git bỏ qua.",
  },
  {
    answer: ".env",
    prompt: "Nơi để các biến bí mật (khóa API, mật khẩu) và phải được bỏ qua khi đưa lên.",
    explain: ".env chứa biến môi trường bí mật.",
  },
  {
    answer: "npm install",
    accept: ["npm i"],
    prompt: "Tải đủ các thư viện một dự án cần, dựa trên khai báo trong package.json.",
    explain: "npm install cài các phụ thuộc.",
  },
  {
    answer: "npm init",
    accept: ["npm init -y"],
    prompt: "Tạo tệp khai báo thông tin và phụ thuộc cho một dự án Node mới.",
    explain: "npm init sinh ra package.json.",
  },
  {
    answer: "npm run",
    prompt: "Chạy một script đã đặt tên tắt trong package.json (vd dev, build).",
    explain: "npm run <tên> chạy script.",
  },
  {
    answer: "package.json",
    prompt: "Tệp khai báo tên, phiên bản, scripts và danh sách thư viện của dự án Node.",
    explain: "package.json là manifest của dự án.",
  },
];
