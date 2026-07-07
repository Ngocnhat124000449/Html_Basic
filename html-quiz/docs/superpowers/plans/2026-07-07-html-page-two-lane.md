# Trang /html tách 2 tầng Học mới / Ôn tập: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trang /html hiện 2 card ngang hàng — 📖 Học mới (flame) và 🔁 Ôn tập (amber) — thay CTA trộn + dải ôn mỏng.

**Architecture:** Chỉ sửa JSX của `src/app/html/page.tsx` (server component); dữ liệu `due`, `newAvailable`, `unseen`, `nextDue`, `shortDate` đã có sẵn. Spec: `docs/superpowers/specs/2026-07-07-html-page-two-lane-design.md`.

**Tech Stack:** Next.js App Router, Tailwind.

## Global Constraints

- Không đụng API/migration/trang khác. Copy tiếng Việt đúng spec.
- Học mới → `/study?track=html&mode=learn`; Học vượt → thêm `&extra=1`; Ôn tập → `mode=review`.

---

### Task 1: Thay khối CTA + dải ôn bằng lưới 2 card

**Files:**
- Modify: `src/app/html/page.tsx:116-160` (khối `todayCount > 0 ? ... : ...` và `due > 0 && ...`)

- [ ] **Step 1: Thay JSX** — thay toàn bộ 2 khối trên bằng:

```tsx
      {due === 0 && newAvailable === 0 && (
        <p className="animate-rise stagger-4 text-center text-sm font-medium text-emerald-700">
          🎉 Hôm nay xong rồi — bộ nhớ cần thời gian, quay lại ngày mai nhé.
        </p>
      )}

      <div className="animate-rise stagger-4 grid gap-4 sm:grid-cols-2">
        {/* Tầng HỌC MỚI — thẻ mới theo lộ trình (kèm pha ôn nền G2 khi có thẻ đến hạn) */}
        {newAvailable > 0 ? (
          <Link
            href="/study?track=html&mode=learn"
            className="group rounded-2xl bg-gradient-to-br from-flame-500 to-flame-700 p-6 text-white shadow-lg shadow-flame-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-flame-500/30"
          >
            <p className="font-display text-lg font-bold">📖 Học mới</p>
            <p className="mt-3 font-display text-4xl font-bold">{newAvailable} thẻ</p>
            <p className="mt-1 text-sm text-white/80">
              {due > 0 ? "kèm ôn nền trước khi vào bài" : "tuần tự theo lộ trình"}
            </p>
            <span className="mt-4 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-bold transition-transform group-hover:translate-x-1">
              Bắt đầu →
            </span>
          </Link>
        ) : (
          <div className="rounded-2xl border border-ink/10 bg-surface p-6">
            <p className="font-display text-lg font-bold text-ink/60">📖 Học mới</p>
            {unseen > 0 ? (
              <>
                <p className="mt-3 text-sm text-ink/50">đạt mục tiêu 5/ngày 🎯</p>
                <Link
                  href="/study?track=html&mode=learn&extra=1"
                  className="mt-4 inline-block rounded-full bg-flame-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
                >
                  ⚡ Học vượt {Math.min(5, unseen)} thẻ
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-ink/50">đã học hết {totalTags} thẻ 🏁</p>
            )}
          </div>
        )}

        {/* Tầng ÔN TẬP — chỉ thẻ đã học đến hạn (FSRS) */}
        {due > 0 ? (
          <Link
            href="/study?track=html&mode=review"
            className="group rounded-2xl border border-amber-200 bg-amber-50 p-6 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
          >
            <p className="font-display text-lg font-bold text-amber-800">🔁 Ôn tập</p>
            <p className="mt-3 font-display text-4xl font-bold text-amber-600">{due} thẻ</p>
            <p className="mt-1 text-sm text-amber-800/70">đến hạn theo lịch ghi nhớ</p>
            <span className="mt-4 inline-block rounded-full bg-amber-500/15 px-4 py-2 text-sm font-bold text-amber-800 transition-transform group-hover:translate-x-1">
              Ôn ngay →
            </span>
          </Link>
        ) : (
          <div className="rounded-2xl border border-ink/10 bg-surface p-6">
            <p className="font-display text-lg font-bold text-ink/60">🔁 Ôn tập</p>
            <p className="mt-3 text-sm text-ink/50">
              0 thẻ đến hạn{nextDue ? ` — sớm nhất ${shortDate.format(nextDue)}` : ""}
            </p>
          </div>
        )}
      </div>
```

- [ ] **Step 2: Build + lint**

Run: `npm run build && npm run lint`
Expected: sạch (biến `todayCount` không còn dùng → xóa khai báo nếu lint báo).

- [ ] **Step 3: Verify browser** — user test riêng + seed 4 trạng thái (a) ôn+mới, (b) chỉ ôn, (c) chỉ mới, (d) cạn cả hai → dòng 🎉. Dọn user test sau.

- [ ] **Step 4: Commit**

```bash
git add src/app/html/page.tsx docs/superpowers
git commit -m "feat(html): trang khóa HTML tách 2 card Học mới / Ôn tập"
```
