"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AnswerResult, SessionTag } from "@/lib/study-types";
import { TAG_ATTRIBUTES, type AttrImportance } from "@/lib/attribute-data";

const TIER_INFO: Record<number, { label: string; cls: string }> = {
  1: { label: "Bậc 1 · Nhận biết", cls: "bg-sky-100 text-sky-700" },
  2: { label: "Bậc 2 · Hiểu", cls: "bg-violet-100 text-violet-700" },
  3: { label: "Bậc 3 · Viết được", cls: "bg-flame-100 text-flame-700" },
};

const ATTR_GROUPS: { importance: AttrImportance; title: string; chip: string }[] = [
  { importance: "essential", title: "★ Quan trọng nhất", chip: "bg-flame-500 text-white" },
  { importance: "common", title: "● Hay dùng", chip: "bg-sky-600 text-white" },
  { importance: "rare", title: "○ Ít dùng nhưng hợp lệ", chip: "bg-ink/70 text-white" },
];

const MAX_WRONG = 3;

// Nhãn hiển thị: thẻ HTML bọc <>, mục CSS hiện tên trần
const tagLabel = (tag: { track: "html" | "css"; name: string }) =>
  tag.track === "css" ? tag.name : `<${tag.name}>`;

// Màn làm quen mục CSS mới: chương + mô tả trước khi vào câu hỏi
function CssIntro({ tag, onStart }: { tag: SessionTag; onStart: () => void }) {
  return (
    <div className="animate-rise space-y-5 py-8">
      <div className="text-center">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
          ✦ Mục mới — chương {tag.topic}
        </span>
        <p className="mt-4">
          <code className="rounded-xl bg-ink px-3 py-1.5 font-mono text-2xl font-bold text-sky-300">
            {tag.name}
          </code>
        </p>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">{tag.description}</p>
      </div>
      <div className="text-center">
        <button
          onClick={onStart}
          autoFocus
          className="rounded-full bg-flame-500 px-8 py-3 font-display text-lg font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600 hover:shadow-xl"
        >
          Bắt đầu trả lời ✍️
        </button>
        <p className="mt-2 text-xs text-ink/40">hoặc nhấn Enter</p>
      </div>
    </div>
  );
}

// Màn làm quen thẻ mới: mô tả + đủ 3 nhóm thuộc tính trước khi vào câu hỏi
function TagIntro({ tag, onStart }: { tag: SessionTag; onStart: () => void }) {
  const entry = TAG_ATTRIBUTES.find((t) => t.tag === tag.name);
  return (
    <div className="animate-rise space-y-5 py-8">
      <div className="text-center">
        <span className="rounded-full bg-flame-100 px-3 py-1 text-xs font-semibold text-flame-700">
          ✦ Thẻ mới — làm quen trước khi trả lời
        </span>
        <p className="mt-4">
          <code className="rounded-xl bg-ink px-3 py-1.5 font-mono text-2xl font-bold text-flame-300">
            &lt;{tag.name}&gt;
          </code>
        </p>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">{tag.description}</p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-surface p-5">
        <h2 className="font-display font-bold">Thuộc tính của &lt;{tag.name}&gt;</h2>
        {entry?.note && <p className="mt-1 text-sm text-ink/60">💡 {entry.note}</p>}
        {ATTR_GROUPS.map(({ importance, title, chip }) => {
          const group = entry?.attrs.filter((a) => a.importance === importance) ?? [];
          if (group.length === 0) return null;
          return (
            <div key={importance} className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">{title}</p>
              <ul className="mt-2 space-y-2.5">
                {group.map((a) => (
                  <li key={a.name} className="text-sm leading-relaxed">
                    <code
                      className={`mr-1.5 rounded px-1.5 py-0.5 font-mono text-xs font-bold ${chip}`}
                    >
                      {a.name}
                    </code>
                    {a.desc}
                    <span className="text-ink/50"> · {a.when}</span>
                    <code className="mt-1 block w-fit max-w-full overflow-x-auto rounded bg-ink px-2 py-1 font-mono text-xs text-flame-100">
                      {a.example}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <p className="mt-4 text-xs text-ink/50">
          Xem đầy đủ kèm thuộc tính chung tại{" "}
          <Link
            href={`/tags/${tag.name}`}
            target="_blank"
            className="font-medium text-flame-600 hover:underline"
          >
            trang chi tiết thẻ ↗
          </Link>
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={onStart}
          autoFocus
          className="rounded-full bg-flame-500 px-8 py-3 font-display text-lg font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600 hover:shadow-xl"
        >
          Bắt đầu trả lời ✍️
        </button>
        <p className="mt-2 text-xs text-ink/40">hoặc nhấn Enter</p>
      </div>
    </div>
  );
}

export default function StudyPage() {
  const [tags, setTags] = useState<SessionTag[] | null>(null);
  const [tagIdx, setTagIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<AnswerResult | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [tagFailed, setTagFailed] = useState(false);
  const [summary, setSummary] = useState<{ name: string; passed: boolean }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  // Đã xem màn làm quen của thẻ mới hiện tại chưa
  const [introSeen, setIntroSeen] = useState(false);
  // Track của phiên học: html (mặc định) | css — đọc từ ?track= trên URL
  const [track, setTrack] = useState<"html" | "css">("html");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Tải phiên học (gọi từ nút bấm); extra=true bỏ giới hạn ngày để học vượt
  const loadSession = useCallback(
    (extra: boolean) => {
      setTags(null);
      setTagIdx(0);
      setQIdx(0);
      setSelected(null);
      setAnswer("");
      setFeedback(null);
      setWrongCount(0);
      setTagFailed(false);
      setSummary([]);
      setIntroSeen(false);
      const qs = new URLSearchParams();
      if (extra) qs.set("extra", "1");
      if (track === "css") qs.set("track", "css");
      fetch(`/api/study/session${qs.size > 0 ? `?${qs}` : ""}`)
        .then((r) => r.json())
        .then((d) => setTags(d.tags ?? []));
    },
    [track]
  );

  // Phiên đầu tiên: đọc ?extra & ?track từ URL, chỉ setState trong callback async
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const extra = params.get("extra") === "1";
    const trk = params.get("track") === "css" ? "css" : "html";
    const qs = new URLSearchParams();
    if (extra) qs.set("extra", "1");
    if (trk === "css") qs.set("track", "css");
    let cancelled = false;
    fetch(`/api/study/session${qs.size > 0 ? `?${qs}` : ""}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setTrack(trk);
        setTags(d.tags ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Tự focus ô nhập khi sang câu mới
  useEffect(() => {
    if (!feedback) {
      inputRef.current?.focus();
      textareaRef.current?.focus();
    }
  }, [feedback, qIdx, tagIdx]);

  if (tags === null) {
    return (
      <div className="space-y-4 py-10">
        <div className="h-4 w-48 animate-pulse rounded-full bg-ink/10" />
        <div className="h-64 animate-pulse rounded-2xl bg-ink/10" />
        <p className="text-center text-sm text-ink/50">Đang chuẩn bị phiên học...</p>
      </div>
    );
  }

  const unit = track === "css" ? "mục" : "thẻ";
  const homeHref = track === "css" ? "/css" : "/";

  if (tags.length === 0) {
    return (
      <div className="animate-rise py-20 text-center">
        <p className="text-4xl">🎉</p>
        <h1 className="mt-3 font-display text-2xl font-bold">Không có {unit} nào đến hạn</h1>
        <p className="mt-2 text-ink/60">
          Bạn đã hoàn thành mục tiêu hôm nay — nhưng vẫn có thể học vượt bài của ngày sau.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => loadSession(true)}
            className="rounded-full bg-flame-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-flame-600"
          >
            ⚡ Học thêm 5 {unit} mới
          </button>
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

  if (tagIdx >= tags.length) {
    const passedCount = summary.filter((s) => s.passed).length;
    return (
      <div className="animate-rise space-y-6 py-12">
        <div className="text-center">
          <p className="text-4xl">🏁</p>
          <h1 className="mt-3 font-display text-3xl font-bold">Kết thúc phiên học</h1>
          <p className="mt-2 text-ink/60">
            Vượt qua <strong className="text-flame-600">{passedCount}</strong>/{summary.length}{" "}
            {unit}
          </p>
        </div>
        <ul className="mx-auto max-w-sm space-y-2">
          {summary.map((s, i) => (
            <li
              key={s.name}
              className={`animate-rise flex items-center justify-between rounded-xl border p-3.5 ${
                s.passed
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-amber-200 bg-amber-50"
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <code className="font-mono font-bold text-ink">
                {tagLabel({ track, name: s.name })}
              </code>
              <span
                className={`text-sm font-medium ${s.passed ? "text-emerald-700" : "text-amber-700"}`}
              >
                {s.passed ? "✓ Vượt qua" : "↻ Học lại hôm nay"}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => loadSession(true)}
            className="rounded-full bg-flame-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-flame-600"
          >
            ⚡ Học thêm 5 {unit} mới
          </button>
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

  const tag = tags[tagIdx];
  const q = tag.questions[qIdx];
  const isCode = q.type !== "MCQ";
  const isMultiline = q.type === "WRITE_STRUCTURE" || q.type === "WRITE_CSS";
  const tier = TIER_INFO[q.tier] ?? TIER_INFO[1];

  async function completeTag(passed: boolean) {
    await fetch("/api/study/complete-tag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagId: tag.tagId, passed }),
    });
    setSummary((s) => [...s, { name: tag.name, passed }]);
  }

  async function submit() {
    const ans = q.type === "MCQ" ? selected : answer.trim();
    if (ans === null || ans === "") return;
    setSubmitting(true);
    const res = await fetch("/api/study/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: q.id, answer: ans }),
    });
    const data: AnswerResult = await res.json();
    setSubmitting(false);
    setFeedback(data);
    if (!data.correct) {
      const w = wrongCount + 1;
      setWrongCount(w);
      if (w >= MAX_WRONG) {
        setTagFailed(true);
        await completeTag(false);
      }
    }
  }

  function goNextTag() {
    setTagIdx((i) => i + 1);
    setQIdx(0);
    setSelected(null);
    setAnswer("");
    setFeedback(null);
    setWrongCount(0);
    setTagFailed(false);
    setIntroSeen(false);
  }

  async function next() {
    if (tagFailed) {
      goNextTag();
      return;
    }
    if (feedback?.correct) {
      if (qIdx + 1 < tag.questions.length) {
        setQIdx(qIdx + 1);
        setSelected(null);
        setAnswer("");
        setFeedback(null);
        setWrongCount(0);
      } else {
        await completeTag(true);
        goNextTag();
      }
    } else {
      // sai nhưng chưa quá MAX_WRONG: làm lại câu này, giữ wrongCount
      setFeedback(null);
      setSelected(null);
      setAnswer("");
    }
  }

  // Thẻ/mục mới: làm quen trước khi vào câu hỏi
  if (tag.isNew && !introSeen) {
    return tag.track === "css" ? (
      <CssIntro tag={tag} onStart={() => setIntroSeen(true)} />
    ) : (
      <TagIntro tag={tag} onStart={() => setIntroSeen(true)} />
    );
  }

  const sessionPct = ((tagIdx + qIdx / tag.questions.length) / tags.length) * 100;

  return (
    <div className="space-y-4 py-8">
      {/* Thanh tiến độ phiên học */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink/60">
            {track === "css" ? "Mục" : "Thẻ"} {tagIdx + 1}/{tags.length}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tier.cls}`}>
            {tier.label}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-flame-400 to-flame-600 transition-all duration-500"
            style={{ width: `${sessionPct}%` }}
          />
        </div>
      </div>

      {/* Thông tin thẻ đang học */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <code className="rounded-lg bg-ink px-2.5 py-1 font-mono text-sm font-bold text-flame-300">
            {tagLabel(tag)}
          </code>
          {tag.isNew && (
            <span className="rounded-full bg-flame-100 px-2.5 py-0.5 text-xs font-semibold text-flame-700">
              ✦ Mới
            </span>
          )}
          <span className="hidden text-xs text-ink/50 sm:inline">{tag.description}</span>
        </div>
        {/* Lượt sai còn lại */}
        <div className="flex gap-1" title={`Còn ${MAX_WRONG - wrongCount} lượt sai`}>
          {Array.from({ length: MAX_WRONG }).map((_, i) => (
            <span
              key={i}
              className={`text-sm ${i < MAX_WRONG - wrongCount ? "" : "opacity-25 grayscale"}`}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Chấm tiến độ 3 câu trong thẻ */}
      <div className="flex gap-1.5">
        {tag.questions.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < qIdx ? "bg-emerald-400" : i === qIdx ? "bg-flame-500" : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      <div
        key={`${tagIdx}-${qIdx}`}
        className="animate-pop rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm"
      >
        <p className="text-lg font-medium leading-relaxed">{q.prompt}</p>

        {q.starterCode && (
          <pre className="mt-4 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm leading-relaxed text-flame-100">
            {q.starterCode}
          </pre>
        )}

        {q.type === "MCQ" && q.options && (
          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !feedback && setSelected(i)}
                disabled={!!feedback}
                className={`group flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                  selected === i
                    ? "border-flame-500 bg-flame-50 shadow-sm"
                    : "border-ink/10 hover:border-flame-200 hover:bg-flame-50/50"
                } disabled:cursor-not-allowed`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold transition-colors ${
                    selected === i
                      ? "bg-flame-500 text-white"
                      : "bg-ink/5 text-ink/60 group-hover:bg-flame-100 group-hover:text-flame-700"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        )}

        {isCode &&
          (isMultiline ? (
            <textarea
              ref={textareaRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!feedback}
              rows={5}
              spellCheck={false}
              placeholder="Gõ code của bạn (nhiều dòng)..."
              className="mt-5 w-full rounded-xl border-2 border-ink/10 bg-paper p-4 font-mono text-sm transition-colors focus:border-flame-400 focus:outline-none disabled:opacity-60"
            />
          ) : (
            <input
              ref={inputRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!feedback}
              spellCheck={false}
              placeholder="Gõ câu trả lời rồi nhấn Enter..."
              className="mt-5 w-full rounded-xl border-2 border-ink/10 bg-paper p-4 font-mono text-sm transition-colors focus:border-flame-400 focus:outline-none disabled:opacity-60"
              onKeyDown={(e) => e.key === "Enter" && !feedback && submit()}
            />
          ))}

        {!feedback && (
          <button
            onClick={submit}
            disabled={submitting || (q.type === "MCQ" ? selected === null : answer.trim() === "")}
            className="mt-5 w-full rounded-xl bg-flame-500 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-flame-600 hover:shadow-md disabled:opacity-40 disabled:shadow-none sm:w-auto"
          >
            {submitting ? "Đang chấm..." : "Trả lời"}
          </button>
        )}
      </div>

      {feedback && (
        <div
          className={`rounded-2xl border-2 p-5 ${
            feedback.correct
              ? "animate-pop border-emerald-300 bg-emerald-50"
              : "animate-shake border-red-300 bg-red-50"
          }`}
        >
          <p className="font-semibold">
            {feedback.correct ? (
              <span className="text-emerald-800">✓ Chính xác!</span>
            ) : tagFailed ? (
              <span className="text-red-800">
                ✗ Sai {MAX_WRONG} lần — thẻ này sẽ quay lại hàng đợi hôm nay
              </span>
            ) : (
              <span className="text-red-800">
                ✗ Chưa đúng (lần {wrongCount}/{MAX_WRONG}) — thử lại nhé
              </span>
            )}
          </p>

          {feedback.results && (
            <ul className="mt-3 space-y-1.5 text-sm">
              {feedback.results.map((r, i) => (
                <li
                  key={i}
                  className={`flex gap-2 ${r.passed ? "text-emerald-700" : "text-red-700"}`}
                >
                  <span className="shrink-0">{r.passed ? "✓" : "✗"}</span>
                  <span>{r.message}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={next}
            autoFocus
            className={`mt-4 rounded-xl px-6 py-2.5 font-semibold text-white transition-colors ${
              feedback.correct
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-ink hover:bg-ink/80"
            }`}
          >
            {tagFailed
              ? "Thẻ tiếp theo →"
              : feedback.correct
                ? qIdx + 1 < tag.questions.length
                  ? "Câu tiếp theo →"
                  : "Hoàn thành thẻ ✓"
                : "Làm lại ↻"}
          </button>
          <span className="ml-3 text-xs text-ink/40">hoặc nhấn Enter</span>
        </div>
      )}
    </div>
  );
}
