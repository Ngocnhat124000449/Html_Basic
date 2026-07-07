# Học kèm ôn nền (Giai đoạn 2) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Phiên "📖 Học mới" bắt đầu bằng pha ôn nền (thẻ đến hạn của khóa hiện tại + mọi khóa nền, xáo) rồi mới tới pha học mới tuần tự — vừa học vừa ôn lại kiến thức cũ.

**Architecture:** Thêm module thuần `tracks.ts` (thứ tự khóa + khóa nền + cap). Hàm thuần `buildLearnWithWarmup` ghép pha ôn (review, xáo) trước pha học (sequential). Route `mode=learn` query thêm thẻ ôn nền (cap 8, ưu tiên khóa nền + đến hạn lâu nhất). Trang study render theo `tag.isNew` (pha ôn = ẩn tên; pha học = màn làm quen), kèm mốc "Xong phần ôn nền". Không migration.

**Tech Stack:** Next.js (bản tùy biến — theo pattern file hiện có), React client component, Prisma 7, vitest (env node), Tailwind 4.

**Spec:** `docs/superpowers/specs/2026-06-30-learn-with-warmup-p2-design.md`. Tiền đề: Giai đoạn 1 (`learn`/`review` mode) đã xong.

---

## File Structure

- **Create** `src/lib/tracks.ts` — `TRACK_ORDER`, `foundationTracks(track)`, `WARMUP_CAP`. Thuần.
- **Create** `src/lib/tracks.test.ts`.
- **Modify** `src/lib/study-queue.ts` — thêm `buildLearnWithWarmup`.
- **Modify** `src/lib/study-queue.test.ts` — thêm test cho hàm mới.
- **Modify** `src/app/api/study/session/route.ts` — nhánh `mode=learn` query thêm pha ôn nền.
- **Modify** `src/app/study/page.tsx` — queue mới + render theo pha + mốc chuyển pha.

Lưu ý: `docs/` gitignore → các bước "Commit" chỉ add file `src/`.
Lệch nhỏ so với spec: hằng `WARMUP_CAP` đặt trong `tracks.ts` (gắn với chọn-thẻ-theo-khóa) thay vì `study-queue.ts` — cohesive hơn, route chỉ cần 1 import.

---

### Task 1: `tracks.ts` — thứ tự khóa & khóa nền (TDD)

**Files:**
- Create: `src/lib/tracks.ts`
- Test: `src/lib/tracks.test.ts`

- [ ] **Step 1: Viết test thất bại**

`src/lib/tracks.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { TRACK_ORDER, foundationTracks, WARMUP_CAP } from "./tracks";

describe("foundationTracks", () => {
  it("css gồm html + css", () => {
    expect(foundationTracks("css")).toEqual(["html", "css"]);
  });
  it("html chỉ gồm chính nó", () => {
    expect(foundationTracks("html")).toEqual(["html"]);
  });
  it("react gồm mọi khóa từ html tới react", () => {
    expect(foundationTracks("react")).toEqual(["html", "css", "js", "dsa", "git", "react"]);
  });
  it("track lạ trả về chính nó", () => {
    expect(foundationTracks("khac")).toEqual(["khac"]);
  });
});

describe("hằng", () => {
  it("WARMUP_CAP = 8", () => expect(WARMUP_CAP).toBe(8));
  it("TRACK_ORDER mở đầu html, kết project", () => {
    expect(TRACK_ORDER[0]).toBe("html");
    expect(TRACK_ORDER[TRACK_ORDER.length - 1]).toBe("project");
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `cd html-quiz && npx vitest run src/lib/tracks.test.ts`
Expected: FAIL — "Cannot find module './tracks'".

- [ ] **Step 3: Viết implementation**

`src/lib/tracks.ts`:

```ts
// Thứ tự lộ trình các khóa — xác định "khóa nền" khi xen kẽ ôn cũ vào học mới.
export const TRACK_ORDER = ["html", "css", "js", "dsa", "git", "react", "project"] as const;

// Số thẻ ôn nền tối đa chèn đầu mỗi phiên học mới.
export const WARMUP_CAP = 8;

// Khóa nền của X = mọi khóa đứng trước X trong TRACK_ORDER, kèm chính X.
// Track lạ (không có trong danh sách) → chỉ trả về chính nó (an toàn).
export function foundationTracks(track: string): string[] {
  const i = TRACK_ORDER.indexOf(track as (typeof TRACK_ORDER)[number]);
  if (i < 0) return [track];
  return TRACK_ORDER.slice(0, i + 1);
}
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `cd html-quiz && npx vitest run src/lib/tracks.test.ts`
Expected: PASS (6 test).

- [ ] **Step 5: Commit**

```bash
cd html-quiz && git add src/lib/tracks.ts src/lib/tracks.test.ts
git commit -m "feat(study): tracks.ts — thứ tự khóa + khóa nền + WARMUP_CAP"
```

---

### Task 2: `buildLearnWithWarmup` (TDD)

**Files:**
- Modify: `src/lib/study-queue.ts`
- Test: `src/lib/study-queue.test.ts` (thêm test, giữ test cũ)

- [ ] **Step 1: Thêm test thất bại**

Chèn vào CUỐI `src/lib/study-queue.test.ts` (giữ nguyên phần hiện có; thêm import hàm mới vào dòng import sẵn có nếu tách — ở đây dùng require-style import mới trong block):

```ts
import { buildLearnWithWarmup } from "./study-queue";

// helper riêng có cờ isNew (helper cũ mkTag mặc định isNew=true)
function mkTagN(id: string, tiers: number[], isNew: boolean): SessionTag {
  return {
    tagId: id,
    track: "css",
    name: id,
    topic: "topic",
    description: "desc",
    isNew,
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

describe("buildLearnWithWarmup", () => {
  const H1 = mkTagN("H1", [1, 2], false);
  const H2 = mkTagN("H2", [1], false);
  const A = mkTagN("A", [3, 1, 2], true);
  const B = mkTagN("B", [1], true);
  const q = buildLearnWithWarmup([H1, H2, A, B]);

  it("pha ôn (isNew=false) đứng TRƯỚC pha học (isNew=true)", () => {
    const flags = q.map((i) => i.tag.isNew);
    expect(flags.lastIndexOf(false)).toBeLessThan(flags.indexOf(true));
  });
  it("pha học tuần tự theo thẻ + bậc tăng dần", () => {
    const learn = q.filter((i) => i.tag.isNew);
    expect(learn.map((i) => i.tag.tagId)).toEqual(["A", "A", "A", "B"]);
    expect(learn.filter((i) => i.tag.tagId === "A").map((i) => i.q.tier)).toEqual([1, 2, 3]);
  });
  it("pha ôn đủ phần tử (hoán vị)", () => {
    const warm = q.filter((i) => !i.tag.isNew);
    expect(new Set(warm.map((i) => i.q.id))).toEqual(new Set(["H1-q0", "H1-q1", "H2-q0"]));
  });
  it("độ dài = tổng số câu", () => expect(q).toHaveLength(6));
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `cd html-quiz && npx vitest run src/lib/study-queue.test.ts`
Expected: FAIL — `buildLearnWithWarmup` chưa export.

- [ ] **Step 3: Thêm implementation**

Chèn vào CUỐI `src/lib/study-queue.ts`:

```ts
// HỌC KÈM ÔN NỀN: pha ôn (thẻ đã học, isNew=false) xáo trộn đặt TRƯỚC, pha học mới
// (isNew=true) tuần tự đặt SAU. Route chịu trách nhiệm chọn & cap thẻ ôn nền.
export function buildLearnWithWarmup(tags: SessionTag[]): QueueItem[] {
  const warmup = tags.filter((t) => !t.isNew);
  const fresh = tags.filter((t) => t.isNew);
  return [...buildReviewQueue(warmup), ...buildLearnSequence(fresh)];
}
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `cd html-quiz && npx vitest run src/lib/study-queue.test.ts`
Expected: PASS (cả test cũ + 4 test mới).

- [ ] **Step 5: Commit**

```bash
cd html-quiz && git add src/lib/study-queue.ts src/lib/study-queue.test.ts
git commit -m "feat(study): buildLearnWithWarmup — ôn nền trước, học mới sau"
```

---

### Task 3: Route `mode=learn` — thêm pha ôn nền

**Files:**
- Modify: `src/app/api/study/session/route.ts`

Không có test route trong codebase → xác minh build + tay (Task 5).

- [ ] **Step 1: Thêm import**

Thêm vào cụm import đầu file (cạnh các import `@/lib/...`):

```ts
import { foundationTracks, WARMUP_CAP, TRACK_ORDER } from "@/lib/tracks";
```

- [ ] **Step 2: Sửa nhánh `mode === "learn"`**

Trong nhánh `if (mode === "learn") { ... }`, thay đoạn từ `const fresh = await prisma.tag.findMany({...})` tới `return NextResponse.json({ tags: fresh.map((t) => toClient(t, true)) });` bằng:

```ts
    const fresh = await prisma.tag.findMany({
      where: { track, id: { notIn: seenIds.map((s) => s.tagId) } },
      orderBy: { order: "asc" },
      take: allowed,
      include: { questions: { orderBy: { tier: "asc" } } },
    });
    // Pha ôn nền: thẻ ĐẾN HẠN của khóa hiện tại + mọi khóa nền. Lấy hết rồi sắp theo
    // (thứ tự khóa nền, đến hạn lâu nhất) và cap WARMUP_CAP để chọn thẻ ưu tiên.
    const foundation = foundationTracks(track);
    const dueWarm = await prisma.userTagProgress.findMany({
      where: { userId, dueAt: { lte: now }, tag: { track: { in: foundation } } },
      include: withQuestions,
    });
    const trackRank = (t: string) => {
      const i = TRACK_ORDER.indexOf(t as (typeof TRACK_ORDER)[number]);
      return i < 0 ? 999 : i;
    };
    dueWarm.sort(
      (a, b) =>
        trackRank(a.tag.track) - trackRank(b.tag.track) ||
        a.dueAt.getTime() - b.dueAt.getTime()
    );
    const warmup = dueWarm.slice(0, WARMUP_CAP);
    return NextResponse.json({
      tags: [
        ...warmup.map((d) => toClient(d.tag, false)),
        ...fresh.map((t) => toClient(t, true)),
      ],
    });
```

Giữ nguyên đoạn trên đó trong nhánh (tính `allowed`, `if (allowed <= 0) return ... []`, `seenIds`). Pha ôn nền chỉ chạy khi `allowed > 0` (có học mới hôm nay) — đúng ý "ôn nền đi kèm học mới".

- [ ] **Step 3: Lint**

Run: `cd html-quiz && npx eslint src/app/api/study/session/route.ts`
Expected: không lỗi.

- [ ] **Step 4: Commit**

```bash
cd html-quiz && git add src/app/api/study/session/route.ts
git commit -m "feat(study): mode=learn kèm pha ôn nền (khóa nền, cap 8)"
```

---

### Task 4: `study/page.tsx` — render 2 pha + mốc chuyển pha

**Files:**
- Modify: `src/app/study/page.tsx`

READ toàn file trước. Áp các sửa đổi sau theo anchor.

- [ ] **Step 1: Import hàm mới**

Đổi:
```ts
import { buildLearnSequence, buildReviewQueue, type QueueItem } from "@/lib/study-queue";
```
thành:
```ts
import { buildLearnSequence, buildLearnWithWarmup, buildReviewQueue, type QueueItem } from "@/lib/study-queue";
```
(`buildLearnSequence` vẫn được dùng gián tiếp qua `buildLearnWithWarmup`; nếu eslint báo `buildLearnSequence` không dùng trực tiếp, BỎ nó khỏi import — chỉ giữ `buildLearnWithWarmup, buildReviewQueue, type QueueItem`.)

- [ ] **Step 2: queue dùng warmup ở learn mode**

Đổi useMemo:
```ts
  const queue = useMemo<QueueItem[]>(
    () => (tags ? (mode === "learn" ? buildLearnSequence(tags) : buildReviewQueue(tags)) : []),
    [tags, mode]
  );
```
thành:
```ts
  const queue = useMemo<QueueItem[]>(
    () => (tags ? (mode === "learn" ? buildLearnWithWarmup(tags) : buildReviewQueue(tags)) : []),
    [tags, mode]
  );
```

- [ ] **Step 3: introFor trỏ thẻ MỚI đầu tiên (không phải tags[0])**

Trong `loadSession` `.then`, đổi:
```ts
          setIntroFor(mode === "learn" ? (d.tags?.[0]?.tagId ?? null) : null);
```
thành:
```ts
          setIntroFor(
            mode === "learn" ? (d.tags?.find((t: SessionTag) => t.isNew)?.tagId ?? null) : null
          );
```
Trong `useEffect` phiên đầu `.then`, đổi:
```ts
        setIntroFor(md === "learn" ? (d.tags?.[0]?.tagId ?? null) : null);
```
thành:
```ts
        setIntroFor(
          md === "learn" ? (d.tags?.find((t: SessionTag) => t.isNew)?.tagId ?? null) : null
        );
```
(`SessionTag` đã được import sẵn ở đầu file.)

- [ ] **Step 4: next() chỉ bật màn làm quen cho thẻ MỚI**

Đổi:
```ts
    if (mode === "learn" && nextItem && nextItem.tag.tagId !== queue[pos]?.tag.tagId) {
      setIntroFor(nextItem.tag.tagId);
    }
```
thành:
```ts
    if (
      mode === "learn" &&
      nextItem &&
      nextItem.tag.isNew &&
      nextItem.tag.tagId !== queue[pos]?.tag.tagId
    ) {
      setIntroFor(nextItem.tag.tagId);
    }
```

- [ ] **Step 5: Đếm thẻ theo PHA HỌC + mốc chuyển pha; sửa màn làm quen**

Đổi cụm tính `cardNo`/`cardTotal` và khối `if (showIntro)` (hiện sau `const q = item.q;`) thành:

```ts
  const showIntro = mode === "learn" && introFor === tag.tagId;
  // Màn làm quen chỉ cho PHA HỌC MỚI → đánh số trong số thẻ mới.
  const isNewBoundary = (it: QueueItem, i: number, arr: QueueItem[]) =>
    it.tag.isNew && (i === 0 || arr[i - 1].tag.tagId !== it.tag.tagId);
  const cardNo = queue.slice(0, pos + 1).filter(isNewBoundary).length;
  const cardTotal = queue.filter(isNewBoundary).length;
  // Có pha ôn nền nếu thẻ đầu hàng đợi là thẻ ôn (isNew=false).
  const hadWarmup = queue.length > 0 && !queue[0].tag.isNew;
  const firstNewPos = queue.findIndex((it) => it.tag.isNew);

  if (showIntro) {
    return (
      <div className="animate-rise space-y-6 py-12 text-center">
        {hadWarmup && pos === firstNewPos && (
          <p className="text-sm font-semibold text-emerald-600">✅ Xong phần ôn nền</p>
        )}
        <p className="text-sm font-medium text-ink/50">
          Thẻ {cardNo}/{cardTotal} · 📖 Học mới
        </p>
        <code className="inline-block rounded-xl bg-ink px-4 py-2 font-mono text-2xl font-bold text-flame-300">
          {tagLabel(tag)}
        </code>
        <p className="mx-auto max-w-md leading-relaxed text-ink/70">{tag.description}</p>
        <button
          onClick={() => setIntroFor(null)}
          className="rounded-full bg-flame-500 px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-flame-600"
        >
          Bắt đầu →
        </button>
      </div>
    );
  }
```

- [ ] **Step 6: Badge 3 pha (học mới / ôn nền / ôn trộn)**

Đổi khối badge (hiện `mode === "learn" ? (📖 Học mới…) : (🔀 Ôn trộn…)`) thành:

```tsx
        {mode === "learn" && tag.isNew ? (
          <span className="rounded-full bg-sky-100 px-2.5 py-1 font-semibold text-sky-700">
            📖 Học mới · {tagLabel(tag)}
          </span>
        ) : mode === "learn" ? (
          <span className="rounded-full bg-violet-100 px-2.5 py-1 font-semibold text-violet-700">
            🔁 Ôn nền · thẻ nào đây?
          </span>
        ) : (
          <span className="rounded-full bg-violet-100 px-2.5 py-1 font-semibold text-violet-700">
            🔀 Ôn trộn · thẻ nào đây?
          </span>
        )}
```

- [ ] **Step 7: Lint + build**

Run: `cd html-quiz && npx eslint src/app/study/page.tsx && npm run build`
Expected: lint sạch; build thành công (26 trang). Sửa mọi unused-import/type lỗi do mình tạo.

- [ ] **Step 8: Commit**

```bash
cd html-quiz && git add src/app/study/page.tsx
git commit -m "feat(study): trang study render pha ôn nền + mốc chuyển pha + học mới"
```

---

### Task 5: Kiểm thử tay toàn chuỗi

**Files:** không sửa code sản phẩm.

- [ ] **Step 1: Test + build**

Run: `cd html-quiz && npm run test && npm run build`
Expected: tất cả test PASS (gồm `tracks.test.ts` + `study-queue.test.ts` mới); build OK.

- [ ] **Step 2: Seed thẻ HTML + CSS đến hạn rồi kiểm tay**

Tạo `html-quiz/seed-warmup.ts` (KHÔNG commit):

```ts
import { PrismaClient } from './src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  const u = await prisma.user.findUnique({ where: { email: 'test@example.com' } });
  if (!u) { console.log('NO USER'); return; }
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  // 2 thẻ HTML (khóa nền) + 2 thẻ CSS, đều "đã học & đến hạn"
  for (const track of ['html', 'css']) {
    const tags = await prisma.tag.findMany({ where: { track }, orderBy: { order: 'asc' }, take: 2 });
    for (const t of tags) {
      await prisma.userTagProgress.upsert({
        where: { userId_tagId: { userId: u.id, tagId: t.id } },
        update: { dueAt: yesterday, state: 2, reps: 1, stability: 5, difficulty: 5, mastered: false },
        create: { userId: u.id, tagId: t.id, dueAt: yesterday, state: 2, reps: 1, stability: 5, difficulty: 5, mastered: false, lastReviewedAt: yesterday },
      });
    }
  }
  console.log('seeded 2 html + 2 css due');
  await prisma.$disconnect();
}
main();
```

Run seed: `cd html-quiz && node --env-file=.env ./node_modules/tsx/dist/cli.mjs seed-warmup.ts`
Run app: `cd html-quiz && PORT=3000 npm run dev` (nền), đăng nhập `test@example.com` / `matkhau123`.

Mở `/study?track=css&mode=learn` và xác nhận:
- Vào phiên là **pha ôn nền** trước: badge "🔁 Ôn nền · thẻ nào đây?" (ẩn tên), câu xáo, gồm cả thẻ **HTML** (khóa nền) lẫn CSS đã học. (CSS có 2 thẻ học CSS đầu trùng với thẻ mới? Không — 2 thẻ CSS đã seed là "đã học" nên KHÔNG xuất hiện lại ở pha học mới; pha học mới lấy thẻ CSS CHƯA học kế tiếp.)
- Trả lời hết pha ôn → màn **"✅ Xong phần ôn nền"** + màn làm quen thẻ CSS mới đầu tiên ("Thẻ 1/…").
- Pha học mới: tuần tự, badge "📖 Học mới · <tên>", lộ tên.
- Đối chứng `/study?track=html&mode=learn`: pha ôn chỉ gồm thẻ HTML (html không có khóa nền nào trước).
- Đối chứng tài khoản không có thẻ đến hạn (xóa seed): `mode=learn` vào thẳng học mới (degrade G1).

- [ ] **Step 3: Dọn seed + artifact**

Tạo `html-quiz/cleanup-warmup.ts` (KHÔNG commit):

```ts
import { PrismaClient } from './src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  const u = await prisma.user.findUnique({ where: { email: 'test@example.com' } });
  if (!u) { console.log('NO USER'); return; }
  for (const track of ['html', 'css']) {
    await prisma.attempt.deleteMany({ where: { userId: u.id, question: { tag: { track } } } });
    await prisma.reviewLog.deleteMany({ where: { userId: u.id, tag: { track } } });
    await prisma.userTagProgress.deleteMany({ where: { userId: u.id, tag: { track } } });
  }
  const remain = await prisma.userTagProgress.count({ where: { userId: u.id, tag: { track: { in: ['html', 'css'] } } } });
  console.log(JSON.stringify({ htmlCssProgressRemaining: remain }));
  await prisma.$disconnect();
}
main();
```

Run: `cd html-quiz && node --env-file=.env ./node_modules/tsx/dist/cli.mjs cleanup-warmup.ts`
Expected: `{"htmlCssProgressRemaining":0}`.

Rồi: `rm -f html-quiz/seed-warmup.ts html-quiz/cleanup-warmup.ts` và `rm -rf html-quiz/.playwright-mcp .playwright-mcp`. Dừng dev server (`taskkill //F //IM node.exe`). Xác nhận `git status --short` chỉ còn `?? html-quiz/docs/`.

---

## Self-Review (đã rà)

- **Spec coverage:** 2 pha nối tiếp (Task 2 `buildLearnWithWarmup` + Task 4 queue); TRACK_ORDER/foundationTracks (Task 1); query khóa nền + cap 8 + sort (Task 3); render theo `isNew` + badge "🔁 Ôn nền" + mốc "Xong phần ôn nền" (Task 4); degrade G1 khi không có due (Task 3 `allowed<=0` + warmup rỗng, Task 5 đối chứng); FSRS/complete-session không đổi (không task nào sửa); không migration. ✓
- **Placeholder scan:** mọi bước có code/lệnh cụ thể; không TBD. ✓
- **Type consistency:** `buildLearnWithWarmup`/`QueueItem`/`SessionTag.isNew`/`foundationTracks`/`WARMUP_CAP`/`TRACK_ORDER` khớp giữa Task 1–4; `isNewBoundary` dùng `QueueItem`. Badge 3 nhánh phủ đủ learn-new / learn-warmup / review. ✓
