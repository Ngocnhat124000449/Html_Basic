# Gating cứng liên khóa — Giai đoạn 3

Ngày: 2026-07-07
Trạng thái: Đã duyệt thiết kế, chờ viết plan.

## Bối cảnh & mục tiêu

Tiếp nối G1 (tách Học mới / Ôn tập) và G2 (xen kẽ ôn nền — đã verify browser 2026-07-06).
G3 chặn **học thẻ mới** của khóa sau khi khóa nền chưa đạt ngưỡng — buộc đi lộ trình
tuần tự thay vì nhảy cóc. Ôn tập không bao giờ bị chặn.

Quyết định phạm vi (đã chốt với người dùng):
- Thước đo = **% thẻ ĐÃ HỌC** (thẻ có `UserTagProgress`, tức đã vào hệ thống FSRS).
- Ngưỡng = **80%** mỗi khóa nền.
- Xét **TẤT CẢ khóa nền** đứng trước trong `TRACK_ORDER` (không chỉ khóa liền trước).
- **Chặn ở mọi điểm vào**: card trang chủ, nút trang track, API `mode=learn`.
- **Không override** — muốn mở thì học nốt khóa nền.
- Lưu DB (`UserSettings.unlockedTracks`), **ratchet**: mở rồi là vĩnh viễn, không khóa lại
  kể cả khi % tụt (vd seed thêm thẻ vào khóa nền).

## Ngữ nghĩa gate

- Khóa X **mở học mới** ⇔ X đã có trong `unlockedTracks`, HOẶC mọi khóa đứng trước X
  trong `TRACK_ORDER` đều có `learned/total ≥ 0.8`.
- HTML (khóa đầu) luôn mở. Track lạ (không trong `TRACK_ORDER`) hoặc khóa nền 0 thẻ → qua
  (an toàn, nhất quán với `foundationTracks`).
- Khi tính động mà ĐẠT → ghi ngay X vào `unlockedTracks` (lazy backfill + ratchet).
  Tài khoản hiện hữu đã học ≥80% các khóa → tự mở hết ở lần kiểm tra đầu, không gián đoạn.
- `mode=review`, `track=all`, `track=leech`, `/practice`, `/reflex`: KHÔNG đụng.

## Thay đổi kỹ thuật

### Migration (duy nhất)
`UserSettings.unlockedTracks String[] @default([])` — danh sách track đã mở vĩnh viễn.
(`lib/user-settings.ts` KHÔNG đổi — `track-gate.ts` đọc/ghi cột này trực tiếp qua Prisma.)

### `src/lib/tracks.ts` (mở rộng, thuần, có test)
- `export const GATE_THRESHOLD = 0.8;`
- `export type TrackStats = Record<string, { learned: number; total: number }>;`
- `export function gateFor(track, stats): GateInfo | null` — duyệt các khóa nền của
  `track` (loại chính nó) theo thứ tự `TRACK_ORDER`, trả khóa nền ĐẦU TIÊN chưa đạt:
  `{ blockedBy, learned, need, total }` với `need = Math.ceil(total * GATE_THRESHOLD)`;
  đạt hết → `null`. Khóa nền thiếu stats hoặc `total === 0` → coi như đạt.

### `src/lib/track-gate.ts` (mới, server)
- `getGate(userId, track): Promise<GateInfo | null>`:
  1. `getUserSettings` → `track` trong `unlockedTracks` / là `TRACK_ORDER[0]` / track lạ → `null`.
  2. Đếm stats: `prisma.tag.groupBy({ by: ["track"], _count })` + progress của user kèm
     `tag.track` → gom `TrackStats`.
  3. `gateFor` → `null` thì ghi `track` vào `unlockedTracks` rồi trả `null`; ngược lại trả GateInfo.
- `getAllGates(userId): Promise<Record<string, GateInfo | null>>` — tính 1 lượt cho cả
  `TRACK_ORDER` (dùng chung stats), ghi batch mọi khóa mới đạt; cho trang chủ.

### `src/app/api/study/session/route.ts`
- Nhánh `mode === "learn"`: đầu nhánh gọi `getGate(userId, track)`; bị chặn → trả
  `{ tags: [], gate }` (bỏ cả pha ôn nền — phiên learn không tồn tại; ôn qua nút Ôn tập).
- Nhánh legacy (không `mode`): bị chặn → `allowedNew = 0` (vẫn trả thẻ đến hạn).
- `review` / `all` / `leech`: không đổi.

### UI
- `src/app/study/page.tsx`: `mode=learn` + `tags.length === 0` + có `gate` → màn chặn
  "🔒 Chưa đủ điều kiện học <khóa>" + "<blockedBy> mới học learned/need thẻ (cần 80%)"
  + nút "Học tiếp <blockedBy> →" (`/study?track=<blockedBy>&mode=learn`) + về trang chủ.
- `src/app/page.tsx` (trang chủ): `getAllGates` → card khóa bị chặn hiện 🔒 + dòng
  "Mở khi <blockedBy> đạt 80% (learned/need)"; card vẫn bấm vào trang track được.
- Trang track (`html|css|js|dsa|git|react|project/page.tsx`): bị chặn → nút "📖 Học mới"
  thay bằng khối thông báo khóa (kèm link học khóa nền); nút "🔁 Ôn tập" giữ nguyên.

## Kiểm thử

- Unit `tracks.test.ts` (gateFor): html → null; css bị chặn khi html <80%; react trả
  khóa nền SỚM NHẤT chưa đạt; `need` dùng ceil (vd total 89 → need 72); total 0 → qua;
  track lạ → null; đạt đúng biên 80% → qua.
- Tay (Playwright + user test riêng, dọn sau): user mới → js bị 🔒 ở trang chủ + màn chặn
  ở `/study?track=js&mode=learn` + API trả gate; học đủ 80% html+css (seed progress) →
  js tự mở và ghi vào `unlockedTracks`; đã mở thì giảm % (xóa progress) vẫn mở (ratchet);
  `mode=review` không bao giờ bị chặn.
- Lint + `npm run build` sạch.

## Ngoài phạm vi
- Setting bật/tắt gate, override.
- Điều kiện mastered/nợ ôn (đã cân nhắc, chọn % đã học).
- `/practice`, `/reflex`, optimizer FSRS.
