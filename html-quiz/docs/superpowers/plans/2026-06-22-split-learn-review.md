# Tách luồng Học mới / Ôn tập (Giai đoạn 1) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tách `/study` thành 2 chế độ rõ rệt — Học mới (tuần tự theo lộ trình, không xáo, có màn làm quen) và Ôn tập (chỉ thẻ đã học đến hạn, xáo trộn như hiện tại).

**Architecture:** Trích logic dựng hàng đợi (thuần) ra `src/lib/study-queue.ts` để test TDD. Route `session` thêm param `mode` (`learn`|`review`) rẽ truy vấn Prisma; thiếu `mode` = hành vi cũ (tương thích ngược). Trang `study/page.tsx` rẽ nhánh UI theo `mode`. Các trang lộ trình + nav tách 2 nút.

**Tech Stack:** Next.js (bản tùy biến — xem `node_modules/next/dist/docs/` trước khi viết route/page), React client component, Prisma 7, vitest (env node), Tailwind 4.

**Spec:** `docs/superpowers/specs/2026-06-22-split-learn-review-p1-design.md`

---

## File Structure

- **Create** `src/lib/study-queue.ts` — 2 hàm thuần dựng hàng đợi: `buildReviewQueue` (xáo) và `buildLearnSequence` (tuần tự). Tách khỏi `page.tsx` cho gọn + test được.
- **Create** `src/lib/study-queue.test.ts` — test cho 2 hàm trên.
- **Modify** `src/app/api/study/session/route.ts` — thêm rẽ nhánh `mode`.
- **Modify** `src/app/study/page.tsx` — import từ `study-queue`, đọc `mode`, UI học mới (màn làm quen + tuần tự), giữ UI ôn cũ.
- **Modify** `src/app/css/page.tsx`, `src/app/js/page.tsx`, `src/app/html/page.tsx` — tách nút Học mới / Ôn tập.
- **Modify** `src/components/nav-links.tsx` — thêm `&mode=review` cho link "Ôn tập" (tường minh).

Lưu ý: `docs/` bị gitignore → các bước "Commit" chỉ add file **src** (spec/plan không commit, đúng quy ước dự án).

---

### Task 1: Trích & test logic hàng đợi thuần (TDD)

**Files:**
- Create: `src/lib/study-queue.ts`
- Test: `src/lib/study-queue.test.ts`

- [ ] **Step 1: Viết test thất bại**

`src/lib/study-queue.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildLearnSequence, buildReviewQueue } from "./study-queue";
import type { SessionTag } from "./study-types";

function mkTag(id: string, tiers: number[]): SessionTag {
  return {
    tagId: id,
    track: "css",
    name: id,
    topic: "topic",
    description: "desc",
    isNew: true,
    questions: tiers.map((tier, i) => ({
      id: `${id}-q${i}`,
      tier,
      type: "MCQ",
      prompt: "p",
      options: ["a", "b"],
      starterCode: null,
    })),
  };
}

const A = mkTag("A", [3, 1, 2]);
const B = mkTag("B", [1, 2]);

describe("buildLearnSequence", () => {
  it("giữ thứ tự thẻ, không xáo", () => {
    const seq = buildLearnSequence([A, B]);
    const tagOrder = seq.map((i) => i.tag.tagId);
    expect(tagOrder).toEqual(["A", "A", "A", "B", "B"]);
  });

  it("trong mỗi thẻ, câu xếp theo bậc tăng dần", () => {
    const seq = buildLearnSequence([A]);
    expect(seq.map((i) => i.q.tier)).toEqual([1, 2, 3]);
  });

  it("độ dài = tổng số câu", () => {
    expect(buildLearnSequence([A, B])).toHaveLength(5);
  });
});

describe("buildReviewQueue", () => {
  it("là hoán vị đủ mọi câu (không mất/không thêm)", () => {
    const q = buildReviewQueue([A, B]);
    expect(q).toHaveLength(5);
    expect(new Set(q.map((i) => i.q.id))).toEqual(
      new Set(["A-q0", "A-q1", "A-q2", "B-q0", "B-q1"])
    );
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `cd html-quiz && npx vitest run src/lib/study-queue.test.ts`
Expected: FAIL — `Cannot find module './study-queue'`.

- [ ] **Step 3: Viết implementation tối thiểu**

`src/lib/study-queue.ts`:

```ts
import type { ClientQuestion, SessionTag } from "./study-types";

// Một câu trong hàng đợi — kèm thẻ gốc để chấm gom theo thẻ + hiển thị tên.
export type QueueItem = { tag: SessionTag; q: ClientQuestion };

// HỌC MỚI: đi tuần tự theo thứ tự thẻ server trả về; trong mỗi thẻ xếp câu theo
// bậc tăng dần (1→2→3). KHÔNG xáo trộn.
export function buildLearnSequence(tags: SessionTag[]): QueueItem[] {
  const items: QueueItem[] = [];
  for (const tag of tags) {
    const sorted = [...tag.questions].sort((a, b) => a.tier - b.tier);
    for (const q of sorted) items.push({ tag, q });
  }
  return items;
}

// ÔN TẬP: gom phẳng mọi câu của mọi thẻ rồi xáo trộn (Fisher–Yates) — luyện nhận diện.
export function buildReviewQueue(tags: SessionTag[]): QueueItem[] {
  const items: QueueItem[] = [];
  for (const tag of tags) for (const q of tag.questions) items.push({ tag, q });
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `cd html-quiz && npx vitest run src/lib/study-queue.test.ts`
Expected: PASS (4 test).

- [ ] **Step 5: Commit**

```bash
cd html-quiz && git add src/lib/study-queue.ts src/lib/study-queue.test.ts
git commit -m "feat(study): trích hàng đợi học/ôn ra study-queue (thuần, có test)"
```

---

### Task 2: Route `session` — thêm rẽ nhánh `mode`

**Files:**
- Modify: `src/app/api/study/session/route.ts`

Không có test route trong codebase (mock Prisma 7/NextAuth không tương xứng) → xác minh bằng build + kiểm thử tay ở Task 5.

- [ ] **Step 1: Đọc tài liệu route handler của bản Next tùy biến**

Run: `ls html-quiz/node_modules/next/dist/docs/` rồi đọc phần route handlers nếu có khác biệt API. Không viết code tới khi xác nhận chữ ký `GET(req: Request)` vẫn đúng (file hiện dùng dạng này).

- [ ] **Step 2: Thêm đọc param `mode`**

Trong `GET`, ngay sau dòng `const trackParam = params.get("track");` (hiện ở khoảng dòng 83), thêm:

```ts
  const mode = params.get("mode"); // "learn" | "review" | null(legacy)
```

- [ ] **Step 3: Thêm 2 nhánh `review`/`learn` cho khóa cụ thể**

Ngay sau dòng `const track = SPECIFIC.includes(trackParam ?? "") ? trackParam! : "html";`
(trước khối `const due = await prisma.userTagProgress.findMany(...)` của nhánh legacy),
chèn:

```ts
  // mode=review: chỉ thẻ ĐÃ HỌC đến hạn của khóa này (không bốc thẻ mới).
  if (mode === "review") {
    const dueOnly = await prisma.userTagProgress.findMany({
      where: { userId, dueAt: { lte: now }, tag: { track } },
      orderBy: { dueAt: "asc" },
      take: settings.reviewCap,
      include: withQuestions,
    });
    return NextResponse.json({ tags: dueOnly.map((d) => toClient(d.tag, false)) });
  }

  // mode=learn: chỉ thẻ MỚI theo lộ trình (order asc), giữ quota dailyNew + extra.
  if (mode === "learn") {
    const sod = new Date(now);
    sod.setHours(0, 0, 0, 0);
    const newCount = await prisma.userTagProgress.count({
      where: { userId, createdAt: { gte: sod }, tag: { track } },
    });
    const allowed = extra ? settings.dailyNew : Math.max(0, settings.dailyNew - newCount);
    if (allowed <= 0) return NextResponse.json({ tags: [] });
    const seenIds = await prisma.userTagProgress.findMany({
      where: { userId, tag: { track } },
      select: { tagId: true },
    });
    const fresh = await prisma.tag.findMany({
      where: { track, id: { notIn: seenIds.map((s) => s.tagId) } },
      orderBy: { order: "asc" },
      take: allowed,
      include: { questions: { orderBy: { tier: "asc" } } },
    });
    return NextResponse.json({ tags: fresh.map((t) => toClient(t, true)) });
  }
```

Khối legacy (due + new trộn) phía dưới **giữ nguyên** — chỉ chạy khi không có `mode`.

- [ ] **Step 4: Lint + typecheck nhanh**

Run: `cd html-quiz && npx eslint src/app/api/study/session/route.ts`
Expected: không lỗi.

- [ ] **Step 5: Commit**

```bash
cd html-quiz && git add src/app/api/study/session/route.ts
git commit -m "feat(study): route session phân biệt mode=learn|review (giữ legacy)"
```

---

### Task 3: `study/page.tsx` — UI học mới tuần tự + màn làm quen

**Files:**
- Modify: `src/app/study/page.tsx`

- [ ] **Step 1: Đổi import — dùng study-queue, bỏ buildQueue cục bộ**

Xóa hàm `buildQueue` (dòng 26–35) và thêm import gần đầu file (sau import `react-runner`):

```ts
import { buildLearnSequence, buildReviewQueue, type QueueItem } from "@/lib/study-queue";
```

Xóa luôn khai báo `type QueueItem = ...` cục bộ (dòng 24) vì đã import.

- [ ] **Step 2: Thêm state `mode` + `intro`**

Cạnh các `useState` khác (sau `const [track, setTrack] = useState<...>("html");`), thêm:

```ts
  const [mode, setMode] = useState<"learn" | "review">("review");
  // Màn làm quen ở chế độ học mới — bật khi bắt đầu một thẻ mới.
  const [intro, setIntro] = useState(false);
```

- [ ] **Step 3: queue rẽ theo mode**

Thay dòng `const queue = useMemo(() => (tags ? buildQueue(tags) : []), [tags]);` bằng:

```ts
  const queue = useMemo<QueueItem[]>(
    () => (tags ? (mode === "learn" ? buildLearnSequence(tags) : buildReviewQueue(tags)) : []),
    [tags, mode]
  );
```

- [ ] **Step 4: Đọc `mode` từ URL + bật intro khi học mới**

Trong `useEffect` phiên đầu tiên (đọc `?extra&?track`), sau khi tính `trk`, thêm tính `md`
và truyền vào query; trong `.then` setMode + setIntro. Sửa khối thành:

```ts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const extra = params.get("extra") === "1";
    const tp = params.get("track");
    const md = params.get("mode") === "learn" ? "learn" : "review";
    const trk =
      tp === "css" ||
      tp === "js" ||
      tp === "dsa" ||
      tp === "git" ||
      tp === "react" ||
      tp === "project" ||
      tp === "all" ||
      tp === "leech"
        ? tp
        : "html";
    const qs = new URLSearchParams();
    if (extra) qs.set("extra", "1");
    if (trk !== "html") qs.set("track", trk);
    if (md === "learn") qs.set("mode", "learn");
    let cancelled = false;
    fetch(`/api/study/session${qs.size > 0 ? `?${qs}` : ""}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setTrack(trk);
        setMode(md);
        setIntro(md === "learn");
        setTags(d.tags ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);
```

- [ ] **Step 5: `loadSession` giữ mode + bật lại intro**

Trong `loadSession`, thêm `mode` vào query và reset intro. Sửa thân hàm: thêm
`if (mode === "learn") qs.set("mode", "learn");` ngay sau dòng
`if (track !== "html") qs.set("track", track);`, và trong `.then((d) => ...)` đổi thành:

```ts
        .then((d) => {
          setTags(d.tags ?? []);
          setIntro(mode === "learn");
        });
```

Đồng thời thêm `mode` vào mảng phụ thuộc `useCallback`: đổi `[track]` thành `[track, mode]`.

- [ ] **Step 6: Cập nhật `reviewMode` + tính biên thẻ**

Đổi dòng `const reviewMode = track === "all" || track === "leech";` thành:

```ts
  const reviewMode = mode === "review";
```

(Chế độ `all`/`leech` luôn vào nhánh review nên `mode` đã là `"review"`.)

- [ ] **Step 7: Màn làm quen (early return) — chỉ ở học mới**

Sau cụm `const item = queue[pos]; const tag = item.tag; const q = item.q;` (đầu phần render
câu hỏi, hiện ~dòng 251), thêm tính biên thẻ + early return intro **trước** khối `return (` chính:

```ts
  const atCardStart = pos === 0 || queue[pos - 1]?.tag.tagId !== tag.tagId;
  const showIntro = mode === "learn" && intro && atCardStart;
  const cardNo = queue.slice(0, pos + 1).filter((it, i, arr) => i === 0 || arr[i - 1].tag.tagId !== it.tag.tagId).length;
  const cardTotal = queue.filter((it, i, arr) => i === 0 || arr[i - 1].tag.tagId !== it.tag.tagId).length;

  if (showIntro) {
    return (
      <div className="animate-rise space-y-6 py-12 text-center">
        <p className="text-sm font-medium text-ink/50">
          Thẻ {cardNo}/{cardTotal} · 📖 Học mới
        </p>
        <code className="inline-block rounded-xl bg-ink px-4 py-2 font-mono text-2xl font-bold text-flame-300">
          {tagLabel(tag)}
        </code>
        <p className="mx-auto max-w-md leading-relaxed text-ink/70">{tag.description}</p>
        <button
          onClick={() => setIntro(false)}
          className="rounded-full bg-flame-500 px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-flame-600"
        >
          Bắt đầu →
        </button>
      </div>
    );
  }
```

- [ ] **Step 8: Badge trạng thái theo mode**

Thay khối badge "🔀 Ôn trộn · thẻ nào đây?" (hiện ~dòng 327–329) bằng:

```tsx
        {mode === "learn" ? (
          <span className="rounded-full bg-sky-100 px-2.5 py-1 font-semibold text-sky-700">
            📖 Học mới · {tagLabel(tag)}
          </span>
        ) : (
          <span className="rounded-full bg-violet-100 px-2.5 py-1 font-semibold text-violet-700">
            🔀 Ôn trộn · thẻ nào đây?
          </span>
        )}
```

- [ ] **Step 9: `next()` — bật intro khi sang thẻ mới (học mới)**

Trong hàm `next()`, sau `setPos((p) => p + 1);` thêm:

```ts
    const nextNewCard = queue[pos + 1]?.tag.tagId !== queue[pos]?.tag.tagId;
    if (mode === "learn" && nextNewCard) setIntro(true);
```

- [ ] **Step 10: Lint + build**

Run: `cd html-quiz && npx eslint src/app/study/page.tsx && npm run build`
Expected: lint sạch, build thành công.

- [ ] **Step 11: Commit**

```bash
cd html-quiz && git add src/app/study/page.tsx
git commit -m "feat(study): trang study rẽ nhánh học mới (tuần tự + màn làm quen) / ôn"
```

---

### Task 4: Điểm vào — tách nút Học mới / Ôn tập

**Files:**
- Modify: `src/app/css/page.tsx`
- Modify: `src/app/js/page.tsx`
- Modify: `src/app/html/page.tsx`
- Modify: `src/components/nav-links.tsx`

- [ ] **Step 1: `css/page.tsx` — 2 nút**

Thay khối nút (hiện dòng 80–94, nút "📖 Học CSS hôm nay" + "⚡ Học vượt") bằng:

```tsx
          <Link
            href="/study?track=css&mode=learn"
            className="rounded-full bg-flame-500 px-6 py-2.5 font-display font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600"
          >
            📖 Học mới
          </Link>
          <Link
            href="/study?track=css&mode=review"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            🔁 Ôn tập
          </Link>
          {counts.unseen > 0 && started > 0 && (
            <Link
              href="/study?track=css&mode=learn&extra=1"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
            >
              ⚡ Học vượt
            </Link>
          )}
```

- [ ] **Step 2: `js/page.tsx` — 2 nút (giống CSS, đổi track=js)**

Thay khối nút (dòng 88–101) bằng cùng cấu trúc Step 1 nhưng `track=js` và nhãn nút chính
giữ "📖 Học mới":

```tsx
          <Link
            href="/study?track=js&mode=learn"
            className="rounded-full bg-flame-500 px-6 py-2.5 font-display font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600"
          >
            📖 Học mới
          </Link>
          <Link
            href="/study?track=js&mode=review"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            🔁 Ôn tập
          </Link>
          {counts.unseen > 0 && started > 0 && (
            <Link
              href="/study?track=js&mode=learn&extra=1"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
            >
              ⚡ Học vượt
            </Link>
          )}
```

- [ ] **Step 3: `html/page.tsx` — CTA chính theo mode**

Trang HTML có 1 CTA lớn trỏ `/study`. Đổi thành 2 hành động. Thay thuộc tính `href="/study"`
của thẻ `<Link>` CTA chính (dòng 118) thành `href="/study?track=html&mode=learn"`.
Và đổi link "Học vượt" (dòng 144) `href="/study?extra=1"` thành
`href="/study?track=html&mode=learn&extra=1"`.

Thêm 1 nút Ôn tập HTML ngay dưới CTA chính: chèn sau khối `</Link>`/`</div>` của CTA
(sau dòng 151, trước khối `{studiedToday.length > 0 && ...}`):

```tsx
      {due > 0 && (
        <Link
          href="/study?track=html&mode=review"
          className="animate-rise stagger-4 block rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-semibold text-amber-800 transition-colors hover:border-amber-300"
        >
          🔁 Ôn tập {due} thẻ đến hạn
        </Link>
      )}
```

- [ ] **Step 4: `nav-links.tsx` — link "Ôn tập" tường minh**

Đổi dòng `{ href: "/study?track=all", label: "Ôn tập" },` thành:

```ts
  { href: "/study?track=all&mode=review", label: "Ôn tập" },
```

(Khớp active vẫn dùng `href.split("?")[0]` nên không ảnh hưởng.)

- [ ] **Step 5: Lint + build**

Run: `cd html-quiz && npx eslint src/app/css/page.tsx src/app/js/page.tsx src/app/html/page.tsx src/components/nav-links.tsx && npm run build`
Expected: sạch + build OK.

- [ ] **Step 6: Commit**

```bash
cd html-quiz && git add src/app/css/page.tsx src/app/js/page.tsx src/app/html/page.tsx src/components/nav-links.tsx
git commit -m "feat(study): tách nút Học mới / Ôn tập ở trang lộ trình + nav"
```

---

### Task 5: Kiểm thử tay toàn chuỗi

**Files:** không sửa code.

- [ ] **Step 1: Chạy toàn bộ test + build**

Run: `cd html-quiz && npm run test && npm run build`
Expected: tất cả test PASS (gồm `study-queue.test.ts`), build thành công.

- [ ] **Step 2: Kiểm thử tay (cần DB + đăng nhập)**

Run: `cd html-quiz && npm run dev` rồi trong trình duyệt:
- Mở `/css` → bấm "📖 Học mới": phải đi **tuần tự**, mỗi thẻ có **màn làm quen**
  (tên + mô tả), badge "📖 Học mới · <tên>", không xáo, không ẩn tên.
- Bấm "🔁 Ôn tập" ở `/css`: chỉ ra thẻ CSS **đã học & đến hạn**, **xáo**, ẩn tên tới khi
  trả lời (badge "🔀 Ôn trộn"). Nếu chưa có thẻ đến hạn → màn "Không có mục nào đến hạn".
- Nav "Ôn tập" (`track=all&mode=review`): gom thẻ đến hạn mọi khóa, xáo.
- Link cũ `/study?track=css` (không mode): vẫn chạy như trước (due + new, xáo) — tương thích ngược.
- Học hết 1 thẻ mới → về `/css`/`/html` thấy trạng thái chuyển "Đang học"/đếm "mới học hôm nay" tăng (FSRS đã ghi).

Expected: đúng như mô tả. Nếu lệch, ghi lại và sửa ở task tương ứng.

- [ ] **Step 3: Deploy (tùy người dùng)**

Theo quy ước dự án: `cd html-quiz && vercel --prod --yes` (chỉ khi người dùng đồng ý).

---

## Self-Review (đã rà)

- **Spec coverage:** Tách học/ôn (Task 2+3), học tuần tự không xáo (Task 1 `buildLearnSequence` + Task 3), màn làm quen dùng `description` (Task 3 Step 7), 2 nút điểm vào (Task 4), không migration (toàn plan), `/reflex`+`/practice` không đụng (không có task nào sửa), tương thích ngược (Task 2 giữ legacy + Task 5 Step 2 kiểm). ✓
- **Placeholder scan:** không có TBD/“xử lý lỗi phù hợp”; mọi bước có code/lệnh cụ thể. ✓
- **Type consistency:** `QueueItem`, `buildLearnSequence`, `buildReviewQueue` khớp giữa Task 1 (định nghĩa) và Task 3 (sử dụng); `mode: "learn"|"review"` nhất quán route↔page; `tagLabel`/`SessionTag.description` đã tồn tại trong page/types hiện hữu. ✓
