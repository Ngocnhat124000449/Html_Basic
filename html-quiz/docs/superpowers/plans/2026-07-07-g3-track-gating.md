# G3 — Gating cứng liên khóa: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chặn học thẻ MỚI của khóa sau khi mọi khóa nền chưa đạt 80% thẻ đã học; mở rồi là vĩnh viễn (ratchet, lưu `UserSettings.unlockedTracks`); ôn tập không bao giờ chặn.

**Architecture:** Logic thuần `gateFor` trong `src/lib/tracks.ts` (TDD). Helper server `src/lib/track-gate.ts` đếm stats + fast-path/ratchet qua `unlockedTracks`. Chặn tại API `session/route.ts` (mode=learn trả `{tags:[], gate}`; legacy `allowedNew=0`) và tại UI (màn 🔒 ở /study, chip 🔒 trang chủ, nút Học mới trang track).

**Tech Stack:** Next.js 16 App Router, Prisma (PostgreSQL/Neon), vitest, TypeScript.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-07-g3-track-gating-design.md`.
- Ngưỡng `GATE_THRESHOLD = 0.8`; `need = Math.ceil(total * 0.8)`; đạt biên (learned ≥ need) = QUA.
- HTML (TRACK_ORDER[0]) và track lạ: KHÔNG BAO GIỜ bị chặn. Khóa nền 0 thẻ: coi như đạt.
- `mode=review`, `track=all`, `track=leech`, `/practice`, `/reflex`: KHÔNG đụng.
- Comment code bằng tiếng Việt, phong cách như file hiện có. Commit message tiếng Việt kiểu `feat(study): ...`.
- Chạy lệnh trong thư mục `html-quiz/`.

---

### Task 1: Migration `unlockedTracks`

**Files:**
- Modify: `prisma/schema.prisma` (model UserSettings, sau `hiddenTracks`)

**Interfaces:**
- Produces: cột `UserSettings.unlockedTracks String[] @default([])` — Task 3 đọc/ghi.

- [ ] **Step 1: Thêm cột vào schema**

```prisma
  hiddenTracks    String[] @default([])
  // G3 — khóa đã mở học mới VĨNH VIỄN (ratchet): đạt 80% mọi khóa nền lần đầu thì ghi vào.
  unlockedTracks  String[] @default([])
```

- [ ] **Step 2: Chạy migration**

Run: `npx prisma migrate dev --name add_unlocked_tracks`
Expected: migration mới trong `prisma/migrations/`, client regenerate không lỗi.

- [ ] **Step 3: Test hiện có vẫn xanh**

Run: `npm test`
Expected: PASS toàn bộ.

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma prisma/migrations
git commit -m "feat(study): cột UserSettings.unlockedTracks cho gating G3"
```

---

### Task 2: `gateFor` — logic gate thuần (TDD)

**Files:**
- Modify: `src/lib/tracks.ts`
- Test: `src/lib/tracks.test.ts`

**Interfaces:**
- Produces:
  - `export const GATE_THRESHOLD = 0.8`
  - `export type TrackStats = Record<string, { learned: number; total: number }>`
  - `export type GateInfo = { blockedBy: string; learned: number; need: number; total: number }`
  - `export function gateFor(track: string, stats: TrackStats): GateInfo | null`
  - `export const TRACK_LABEL: Record<string, string>` (tên hiển thị khóa cho UI)

- [ ] **Step 1: Viết test fail** — thêm vào `src/lib/tracks.test.ts`:

```ts
import { TRACK_ORDER, foundationTracks, WARMUP_CAP, GATE_THRESHOLD, gateFor, TRACK_LABEL } from "./tracks";

describe("gateFor", () => {
  it("html (khóa đầu) không bao giờ bị chặn", () => {
    expect(gateFor("html", {})).toBeNull();
  });
  it("css bị chặn khi html chưa đạt 80%", () => {
    expect(gateFor("css", { html: { learned: 47, total: 60 } })).toEqual({
      blockedBy: "html", learned: 47, need: 48, total: 60,
    });
  });
  it("đạt đúng biên 80% thì qua (need dùng ceil)", () => {
    expect(gateFor("css", { html: { learned: 48, total: 60 } })).toBeNull();
    // 89 * 0.8 = 71.2 → cần 72
    expect(gateFor("js", { html: { learned: 60, total: 60 }, css: { learned: 71, total: 89 } }))
      .toEqual({ blockedBy: "css", learned: 71, need: 72, total: 89 });
  });
  it("trả khóa nền SỚM NHẤT chưa đạt", () => {
    const stats = { html: { learned: 0, total: 60 }, css: { learned: 0, total: 89 } };
    expect(gateFor("react", stats)?.blockedBy).toBe("html");
  });
  it("khóa nền 0 thẻ hoặc thiếu stats coi như đạt", () => {
    expect(gateFor("css", { html: { learned: 0, total: 0 } })).toBeNull();
    expect(gateFor("css", {})).toBeNull();
  });
  it("track lạ không bị chặn", () => {
    expect(gateFor("khac", { html: { learned: 0, total: 60 } })).toBeNull();
  });
  it("GATE_THRESHOLD = 0.8 và TRACK_LABEL đủ 7 khóa", () => {
    expect(GATE_THRESHOLD).toBe(0.8);
    for (const t of TRACK_ORDER) expect(TRACK_LABEL[t]).toBeTruthy();
  });
});
```

- [ ] **Step 2: Chạy test thấy fail**

Run: `npx vitest run src/lib/tracks.test.ts`
Expected: FAIL — `gateFor` chưa export.

- [ ] **Step 3: Cài đặt tối thiểu** — thêm vào cuối `src/lib/tracks.ts`:

```ts
// G3 — ngưỡng % thẻ ĐÃ HỌC mỗi khóa nền phải đạt để mở học mới khóa sau.
export const GATE_THRESHOLD = 0.8;

// Thống kê mỗi khóa: đã học (có UserTagProgress) / tổng số thẻ.
export type TrackStats = Record<string, { learned: number; total: number }>;

// Thông tin gate khi bị chặn — khóa nền SỚM NHẤT chưa đạt + số liệu cho UI.
export type GateInfo = { blockedBy: string; learned: number; need: number; total: number };

// Tên hiển thị khóa cho UI (màn chặn, chip 🔒, nút trang track).
export const TRACK_LABEL: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  dsa: "Cấu trúc DL & Giải thuật",
  git: "Git & Công cụ",
  react: "React",
  project: "Dự án — ghép cả trang",
};

// Khóa track có được HỌC MỚI không: mọi khóa đứng trước trong TRACK_ORDER phải
// đã học ≥ GATE_THRESHOLD. Đạt hết → null; khóa đầu/track lạ → null (an toàn);
// khóa nền 0 thẻ hoặc thiếu stats → coi như đạt.
export function gateFor(track: string, stats: TrackStats): GateInfo | null {
  const i = TRACK_ORDER.indexOf(track as (typeof TRACK_ORDER)[number]);
  if (i < 0) return null;
  for (const t of TRACK_ORDER.slice(0, i)) {
    const s = stats[t];
    if (!s || s.total <= 0) continue;
    const need = Math.ceil(s.total * GATE_THRESHOLD);
    if (s.learned < need) return { blockedBy: t, learned: s.learned, need, total: s.total };
  }
  return null;
}
```

- [ ] **Step 4: Test pass**

Run: `npx vitest run src/lib/tracks.test.ts`
Expected: PASS toàn bộ.

- [ ] **Step 5: Commit**

```bash
git add src/lib/tracks.ts src/lib/tracks.test.ts
git commit -m "feat(study): gateFor — logic gate 80% khóa nền (G3)"
```

---

### Task 3: `track-gate.ts` — helper server (ratchet + lazy backfill)

**Files:**
- Create: `src/lib/track-gate.ts`

**Interfaces:**
- Consumes: `gateFor`, `TrackStats`, `GateInfo`, `TRACK_ORDER` (Task 2); cột `unlockedTracks` (Task 1).
- Produces:
  - `export async function getGate(userId: string, track: string): Promise<GateInfo | null>` — null = được học mới.
  - `export async function getAllGates(userId: string): Promise<Record<string, GateInfo | null>>` — cho trang chủ.

- [ ] **Step 1: Viết file**

```ts
import { prisma } from "./prisma";
import { TRACK_ORDER, gateFor, type GateInfo, type TrackStats } from "./tracks";

// Đếm (đã học / tổng thẻ) theo từng khóa cho một người — nguồn số liệu của gate.
async function trackStats(userId: string): Promise<TrackStats> {
  const [totals, progress] = await Promise.all([
    prisma.tag.groupBy({ by: ["track"], _count: { _all: true } }),
    prisma.userTagProgress.findMany({
      where: { userId },
      select: { tag: { select: { track: true } } },
    }),
  ]);
  const stats: TrackStats = {};
  for (const t of totals) stats[t.track] = { learned: 0, total: t._count._all };
  for (const p of progress) {
    const s = stats[p.tag.track];
    if (s) s.learned++;
  }
  return stats;
}

// Ghi thêm khóa vừa đạt vào unlockedTracks — mở là VĨNH VIỄN (ratchet).
async function persistUnlocked(userId: string, current: string[], newly: string[]) {
  const merged = [...new Set([...current, ...newly])];
  await prisma.userSettings.upsert({
    where: { userId },
    update: { unlockedTracks: merged },
    create: { userId, unlockedTracks: merged },
  });
}

// Gate của MỘT khóa: đã trong unlockedTracks → mở (fast-path, không đếm lại);
// chưa có thì tính động từ stats, đạt thì ghi luôn (lazy backfill cho tài khoản cũ).
export async function getGate(userId: string, track: string): Promise<GateInfo | null> {
  if (track === TRACK_ORDER[0]) return null;
  if (!TRACK_ORDER.includes(track as (typeof TRACK_ORDER)[number])) return null;
  const settings = await prisma.userSettings.findUnique({ where: { userId } });
  const unlocked = settings?.unlockedTracks ?? [];
  if (unlocked.includes(track)) return null;
  const gate = gateFor(track, await trackStats(userId));
  if (!gate) await persistUnlocked(userId, unlocked, [track]);
  return gate;
}

// Gate của CẢ 7 khóa trong một lượt (trang chủ) — dùng chung stats, ghi batch khóa mới đạt.
export async function getAllGates(userId: string): Promise<Record<string, GateInfo | null>> {
  const settings = await prisma.userSettings.findUnique({ where: { userId } });
  const unlocked = settings?.unlockedTracks ?? [];
  const stats = await trackStats(userId);
  const gates: Record<string, GateInfo | null> = {};
  const newly: string[] = [];
  for (const t of TRACK_ORDER) {
    if (t === TRACK_ORDER[0] || unlocked.includes(t)) {
      gates[t] = null;
      continue;
    }
    const g = gateFor(t, stats);
    gates[t] = g;
    if (!g) newly.push(t);
  }
  if (newly.length > 0) await persistUnlocked(userId, unlocked, newly);
  return gates;
}
```

- [ ] **Step 2: Kiểm tra type**

Run: `npx tsc --noEmit`
Expected: không lỗi.

- [ ] **Step 3: Commit**

```bash
git add src/lib/track-gate.ts
git commit -m "feat(study): track-gate — getGate/getAllGates (ratchet + lazy backfill)"
```

---

### Task 4: Chặn ở API session

**Files:**
- Modify: `src/app/api/study/session/route.ts`

**Interfaces:**
- Consumes: `getGate` (Task 3).
- Produces: response `mode=learn` bị chặn có dạng `{ tags: [], gate: GateInfo }` — Task 5 đọc `gate`.

- [ ] **Step 1: Import** — thêm vào đầu file:

```ts
import { getGate } from "@/lib/track-gate";
```

- [ ] **Step 2: Chặn nhánh `mode === "learn"`** — ngay sau dòng `if (mode === "learn") {`:

```ts
  if (mode === "learn") {
    // G3 — khóa chưa mở (khóa nền <80%) thì không có phiên học mới (kể cả ôn nền).
    const gate = await getGate(userId, track);
    if (gate) return NextResponse.json({ tags: [], gate });
```

- [ ] **Step 3: Chặn nhánh legacy** — thay dòng `const allowedNew = extra ? settings.dailyNew : Math.max(0, settings.dailyNew - newToday);` (nhánh cuối, ~dòng 185) bằng:

```ts
  // G3 — bị gate thì legacy không bốc thẻ mới (thẻ đến hạn vẫn trả bình thường).
  const legacyGate = await getGate(userId, track);
  const allowedNew = legacyGate ? 0 : extra ? settings.dailyNew : Math.max(0, settings.dailyNew - newToday);
```

- [ ] **Step 4: Build sạch**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/study/session/route.ts
git commit -m "feat(study): API session chặn học mới khi khóa chưa mở (G3)"
```

---

### Task 5: Màn 🔒 ở trang /study

**Files:**
- Modify: `src/app/study/page.tsx`

**Interfaces:**
- Consumes: `gate` trong response API (Task 4); `GateInfo`, `TRACK_LABEL` (Task 2).

- [ ] **Step 1: Import + state**

Thêm import: `import { TRACK_LABEL, type GateInfo } from "@/lib/tracks";`
Thêm state cạnh các state sẵn có (~dòng 40):

```ts
  // G3 — thông tin gate khi API chặn học mới (khóa nền chưa đạt 80%).
  const [gate, setGate] = useState<GateInfo | null>(null);
```

- [ ] **Step 2: Nhận gate ở CẢ HAI chỗ fetch** — trong `loadSession` và trong `useEffect` phiên đầu, cạnh `setTags(d.tags ?? [])` thêm:

```ts
          setGate(d.gate ?? null);
```

(Trong `loadSession` cũng reset `setGate(null);` cùng nhóm reset đầu hàm.)

- [ ] **Step 3: Màn chặn** — chèn TRƯỚC khối `if (tags.length === 0) {` hiện có (~dòng 175):

```tsx
  // G3 — khóa chưa mở: hiện điều kiện + lối đi học khóa nền. Chỉ xảy ra với mode=learn.
  if (tags.length === 0 && gate) {
    return (
      <div className="animate-rise py-20 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="mt-3 font-display text-2xl font-bold">Khóa này chưa mở</h1>
        <p className="mt-2 text-ink/60">
          Cần học ≥80% mỗi khóa nền — <strong>{TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy}</strong> mới
          học {gate.learned}/{gate.need} thẻ cần thiết (tổng {gate.total}).
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`/study?track=${gate.blockedBy}&mode=learn`}
            className="rounded-full bg-flame-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-flame-600"
          >
            📖 Học tiếp {TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy} →
          </Link>
          <Link
            href={homeHref}
            className="rounded-full border border-ink/15 px-6 py-2.5 font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            ← Về trang chủ
          </Link>
        </div>
      </div>
    );
  }
```

Lưu ý: link "Học tiếp" phải là thẻ `<a>` thường (dùng `<a href=...>` thay `<Link>` nếu cần full reload) — trang /study đọc query bằng `window.location.search` trong useEffect chạy 1 lần, nên chuyển track cùng route cần reload. Dùng:

```tsx
          <a href={`/study?track=${gate.blockedBy}&mode=learn`} className="rounded-full bg-flame-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-flame-600">
            📖 Học tiếp {TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy} →
          </a>
```

- [ ] **Step 4: Build sạch**

Run: `npm run build`
Expected: OK.

- [ ] **Step 5: Commit**

```bash
git add src/app/study/page.tsx
git commit -m "feat(study): màn 🔒 khóa chưa mở ở trang study (G3)"
```

---

### Task 6: Chip 🔒 trên card trang chủ

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getAllGates` (Task 3), `TRACK_LABEL` (Task 2).

- [ ] **Step 1: Import + gọi getAllGates**

```ts
import { getAllGates } from "@/lib/track-gate";
import { TRACK_LABEL } from "@/lib/tracks";
```

Sau `const fsrsOpts = ...` (~dòng 66) thêm:

```ts
  // G3 — gate từng khóa (null = được học mới); card khóa chưa mở hiện 🔒 + điều kiện.
  const gates = await getAllGates(userId);
```

- [ ] **Step 2: Thêm key `track` vào mỗi course** — trong mảng `courses`, mỗi phần tử thêm trường `track` khớp khóa: `track: "html"`, `track: "css"`, `track: "js"`, `track: "dsa"`, `track: "git"`, `track: "react"`, `track: "project"`.

- [ ] **Step 3: Render 🔒** — trong `courses.map`, đầu callback thêm `const gate = gates[c.track] ?? null;` rồi:

Chip trạng thái (thay span chip hiện có):

```tsx
                <span className={`rounded-full px-2.5 py-0.5 font-semibold ${gate ? "bg-ink/10 text-ink/50" : c.accent.chip}`}>
                  {gate
                    ? "🔒 chưa mở"
                    : c.due > 0
                      ? `${c.due} đến hạn ôn`
                      : c.started > 0
                        ? "đang học"
                        : "chưa bắt đầu"}
                </span>
```

Dòng điều kiện (chèn ngay dưới `div` chứa chip, trước progress bar):

```tsx
              {gate && (
                <p className="mt-2 text-xs text-ink/50">
                  Mở khi {TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy} đạt 80% ({gate.learned}/{gate.need})
                </p>
              )}
```

CTA cuối card (thay span CTA hiện có):

```tsx
              <span className={`mt-4 inline-block font-medium transition-transform group-hover:translate-x-1 ${gate ? "text-ink/40" : c.accent.cta}`}>
                {gate ? "🔒 Xem lộ trình →" : c.started > 0 ? "Tiếp tục học →" : "Bắt đầu →"}
              </span>
```

- [ ] **Step 4: Build sạch**

Run: `npm run build`
Expected: OK.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(study): card trang chủ hiện 🔒 + điều kiện mở khóa (G3)"
```

---

### Task 7: Nút Học mới ở 6 trang track (css/js/dsa/git/react/project)

**Files:**
- Modify: `src/app/css/page.tsx`, `src/app/js/page.tsx`, `src/app/dsa/page.tsx`, `src/app/git/page.tsx`, `src/app/react/page.tsx`, `src/app/project/page.tsx`
- (html/page.tsx KHÔNG đổi — khóa đầu không bao giờ bị chặn.)

**Interfaces:**
- Consumes: `getGate` (Task 3), `TRACK_LABEL` (Task 2).

- [ ] **Step 1: css & js (đã có 2 nút learn/review)** — mỗi trang thêm import + gọi gate:

```ts
import { getGate } from "@/lib/track-gate";
import { TRACK_LABEL } from "@/lib/tracks";
```

Sau khi có `userId` (cạnh Promise.all đầu trang):

```ts
  // G3 — khóa chưa mở thì thay nút Học mới bằng thông báo (Ôn tập giữ nguyên).
  const gate = await getGate(userId, "css"); // trang js dùng "js"
```

Thay `<Link href="/study?track=css&mode=learn" ...>📖 Học mới</Link>` bằng:

```tsx
          {gate ? (
            <span className="rounded-full bg-ink/10 px-6 py-2.5 font-display font-bold text-ink/40">
              🔒 Mở khi {TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy} đạt 80% ({gate.learned}/{gate.need})
            </span>
          ) : (
            <Link
              href="/study?track=css&mode=learn"
              className="rounded-full bg-flame-500 px-6 py-2.5 font-display font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600"
            >
              📖 Học mới
            </Link>
          )}
```

Nút "⚡ Học vượt" (điều kiện `counts.unseen > 0 && started > 0`) thêm điều kiện `!gate &&` phía trước.

- [ ] **Step 2: dsa/git/react/project (đang dùng link legacy 1 nút)** — đồng bộ về mẫu 2 nút của G1 + gate. Với mỗi trang (ví dụ dsa — git/react/project thay `track=dsa` và `getGate(userId, "dsa")` tương ứng), thay khối nút hiện có (`📖 Học DSA hôm nay` + `⚡ Học vượt`) bằng:

```tsx
          {gate ? (
            <span className="rounded-full bg-ink/10 px-6 py-2.5 font-display font-bold text-ink/40">
              🔒 Mở khi {TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy} đạt 80% ({gate.learned}/{gate.need})
            </span>
          ) : (
            <Link
              href="/study?track=dsa&mode=learn"
              className="rounded-full bg-flame-500 px-6 py-2.5 font-display font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600"
            >
              📖 Học mới
            </Link>
          )}
          <Link
            href="/study?track=dsa&mode=review"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            🔁 Ôn tập
          </Link>
          {!gate && counts.unseen > 0 && started > 0 && (
            <Link
              href="/study?track=dsa&mode=learn&extra=1"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
            >
              ⚡ Học vượt
            </Link>
          )}
```

(Import + `const gate = await getGate(userId, "dsa");` như Step 1. Nếu trang không có sẵn biến `counts.unseen`/`started` thì giữ điều kiện Học vượt như code hiện trạng của trang đó, chỉ thêm `!gate &&`. Các biến thể nhãn "Học DSA hôm nay" → thống nhất thành "📖 Học mới".)

- [ ] **Step 3: Build + test**

Run: `npm run build && npm test`
Expected: OK, PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/css/page.tsx src/app/js/page.tsx src/app/dsa/page.tsx src/app/git/page.tsx src/app/react/page.tsx src/app/project/page.tsx
git commit -m "feat(study): trang track khóa nút Học mới khi chưa mở + đồng bộ 2 nút learn/review (G3)"
```

---

### Task 8: Lint, verify trình duyệt, cập nhật memory

- [ ] **Step 1: Lint + full test + build**

Run: `npm run lint && npm test && npm run build`
Expected: sạch.

- [ ] **Step 2: Verify trình duyệt (user test riêng, dọn sau)** — như quy trình G2:
  1. Đăng ký user test qua `/api/register`; đăng nhập Playwright.
  2. User mới → trang chủ: card css/js/... hiện 🔒 "Mở khi HTML đạt 80% (0/48)"; `/study?track=js&mode=learn` → màn 🔒; API trả `{tags:[], gate}`.
  3. Seed progress ≥80% html (48/60) + css (72/89) → js tự MỞ (API mode=learn trả thẻ mới) và `unlockedTracks` chứa "js".
  4. Ratchet: xóa bớt progress html xuống <80% → js VẪN mở.
  5. `mode=review`/`track=all` không bao giờ bị chặn.
  6. Xóa user test (cascade), xóa script tạm.

- [ ] **Step 3: Cập nhật memory** `learn-review-split.md` (G3 XONG + verify) và dòng index `MEMORY.md`.

- [ ] **Step 4: Commit docs** (spec + plan G3 và các spec/plan cũ đang untracked trong `docs/superpowers/`):

```bash
git add docs/superpowers
git commit -m "docs: spec + plan G3 gating cứng liên khóa (kèm spec/plan G1-G2 còn thiếu)"
```
