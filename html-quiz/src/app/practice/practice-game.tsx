"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { REFLEX_QUESTIONS } from "@/lib/reflex-data";
import { ATTRIBUTE_REFLEX_QUESTIONS } from "@/lib/attribute-reflex-data";
import { CSS_REFLEX_QUESTIONS } from "@/lib/css-reflex-data";
import { JS_REFLEX_QUESTIONS } from "@/lib/js-reflex-data";
import { runJsSpecs } from "@/lib/js-runner";
import type { JsRunSpec } from "@/lib/grading/js-types";

const TIME_FAST = 45; // giây — trắc nghiệm, điền thẻ, phản xạ
const TIME_CODE = 90; // giây — viết thẻ, sửa bug, viết cấu trúc

type DbType =
  | "MCQ"
  | "FILL_BLANK"
  | "WRITE_TAG"
  | "FIX_BUG"
  | "WRITE_STRUCTURE"
  | "WRITE_CSS"
  | "WRITE_JS";
type Track = "html" | "css" | "js";
type Scope = "all" | "html" | "css" | "js";

type Item =
  | {
      kind: "db";
      id: string;
      type: DbType;
      prompt: string;
      options: string[] | null;
      starterCode: string | null;
      runSpecs: JsRunSpec[] | null;
      tagName: string;
      tagDescription: string;
      track: Track;
    }
  | { kind: "reflex"; tag: string; prompt: string; explain: string }
  | {
      kind: "attr";
      attr: string;
      accept?: string[];
      prefix?: boolean;
      tag: string;
      prompt: string;
      explain: string;
    }
  | { kind: "cssreflex"; answer: string; accept?: string[]; prompt: string; explain: string }
  | { kind: "jsreflex"; answer: string; accept?: string[]; prompt: string; explain: string };

type Outcome = {
  correct: boolean;
  timedOut: boolean;
  /** Đáp án hiển thị trong feedback/tổng kết: "<video>" hoặc "required" */
  answerLabel: string;
  explain: string;
  correctIndex?: number | null;
  correctAnswer?: string | null;
  results?: { passed: boolean; message: string }[];
};

type WrongEntry = { prompt: string; answerLabel: string; explain: string };
type Phase = "intro" | "playing" | "done";

const TYPE_BADGE: Record<string, { label: string; cls: string }> = {
  MCQ: { label: "Trắc nghiệm", cls: "bg-sky-100 text-sky-700" },
  FILL_BLANK: { label: "Điền thẻ", cls: "bg-violet-100 text-violet-700" },
  WRITE_TAG: { label: "Viết code", cls: "bg-flame-100 text-flame-700" },
  FIX_BUG: { label: "Sửa bug", cls: "bg-rose-100 text-rose-700" },
  WRITE_STRUCTURE: { label: "Viết cấu trúc", cls: "bg-amber-100 text-amber-700" },
  WRITE_CSS: { label: "Viết CSS", cls: "bg-sky-100 text-sky-700" },
  WRITE_JS: { label: "Viết JS", cls: "bg-amber-100 text-amber-700" },
  REFLEX: { label: "Phản xạ thẻ", cls: "bg-emerald-100 text-emerald-700" },
  ATTR: { label: "Thuộc tính", cls: "bg-indigo-100 text-indigo-700" },
  CSSREFLEX: { label: "Phản xạ CSS", cls: "bg-cyan-100 text-cyan-700" },
  JSREFLEX: { label: "Phản xạ JS", cls: "bg-amber-100 text-amber-700" },
};

const norm = (s: string) => s.toLowerCase().replace(/[<>/\s]/g, "");
// Với thuộc tính/CSS/JS: lấy phần trước dấu =, bỏ quotes và *
const normAttr = (s: string) => s.toLowerCase().split("=")[0].replace(/[<>"'`/\s*]/g, "");

// Nhãn đáp án: thẻ HTML bọc <>, mục CSS/JS hiện tên trần
const labelFor = (track: Track | undefined, name: string) =>
  track === "css" || track === "js" ? name : `<${name}>`;

const SCOPE_META: Record<Scope, string> = {
  all: "Tất cả",
  html: "Chỉ HTML",
  css: "Chỉ CSS",
  js: "Chỉ JS",
};

// "css" = câu DB css + phản xạ CSS; "js" = câu DB js + phản xạ JS;
// "html" = câu DB html + phản xạ thẻ/thuộc tính
function filterScope(p: Item[], scope: Scope): Item[] {
  if (scope === "all") return p;
  if (scope === "css")
    return p.filter((it) => it.kind === "cssreflex" || (it.kind === "db" && it.track === "css"));
  if (scope === "js")
    return p.filter((it) => it.kind === "jsreflex" || (it.kind === "db" && it.track === "js"));
  return p.filter(
    (it) => it.kind === "reflex" || it.kind === "attr" || (it.kind === "db" && it.track === "html")
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function timeFor(item: Item): number {
  if (item.kind === "db" && item.type !== "MCQ" && item.type !== "FILL_BLANK") {
    return TIME_CODE;
  }
  return TIME_FAST;
}

export default function PracticeGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [pool, setPool] = useState<Item[] | null>(null);
  const [scope, setScope] = useState<Scope>("all");
  const [items, setItems] = useState<Item[]>([]);
  const [ptr, setPtr] = useState(0);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Outcome | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [wrongList, setWrongList] = useState<WrongEntry[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_FAST);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    fetch("/api/practice/questions")
      .then((r) => r.json())
      .then((d) => {
        const db: Item[] = (d.questions ?? []).map(
          (q: Omit<Extract<Item, { kind: "db" }>, "kind">) => ({ kind: "db" as const, ...q })
        );
        const reflex: Item[] = REFLEX_QUESTIONS.map((q) => ({ kind: "reflex" as const, ...q }));
        const attrs: Item[] = ATTRIBUTE_REFLEX_QUESTIONS.map((q) => ({
          kind: "attr" as const,
          ...q,
        }));
        const cssReflex: Item[] = CSS_REFLEX_QUESTIONS.map((q) => ({
          kind: "cssreflex" as const,
          ...q,
        }));
        const jsReflex: Item[] = JS_REFLEX_QUESTIONS.map((q) => ({
          kind: "jsreflex" as const,
          ...q,
        }));
        setPool([...db, ...reflex, ...attrs, ...cssReflex, ...jsReflex]);
      });
  }, []);

  const item = items[ptr];

  const applyOutcome = useCallback(
    (outcome: Outcome, itemPrompt: string) => {
      setFeedback(outcome);
      setAnswered((n) => n + 1);
      if (outcome.correct) {
        setScore((s) => s + 1);
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
      } else {
        setStreak(0);
        setWrongList((w) => [
          ...w,
          { prompt: itemPrompt, answerLabel: outcome.answerLabel, explain: outcome.explain },
        ]);
      }
    },
    []
  );

  const submit = useCallback(
    async (timedOut: boolean) => {
      if (!item || feedback || submitting) return;

      if (item.kind === "reflex") {
        const correct = !timedOut && norm(input) !== "" && norm(input) === norm(item.tag);
        applyOutcome(
          { correct, timedOut, answerLabel: `<${item.tag}>`, explain: item.explain },
          item.prompt
        );
        return;
      }

      if (item.kind === "attr") {
        const ni = normAttr(input);
        const targets = [item.attr, ...(item.accept ?? [])].map(normAttr);
        const correct =
          !timedOut &&
          ni !== "" &&
          (targets.includes(ni) || (!!item.prefix && ni.startsWith(normAttr(item.attr))));
        applyOutcome(
          { correct, timedOut, answerLabel: item.attr, explain: item.explain },
          item.prompt
        );
        return;
      }

      if (item.kind === "cssreflex" || item.kind === "jsreflex") {
        const ni = normAttr(input);
        const targets = [item.answer, ...(item.accept ?? [])].map(normAttr);
        const correct = !timedOut && ni !== "" && targets.includes(ni);
        applyOutcome(
          { correct, timedOut, answerLabel: item.answer, explain: item.explain },
          item.prompt
        );
        return;
      }

      // Câu DB: chấm server-side, kể cả khi hết giờ (để lưu Attempt và lấy đáp án)
      const answer =
        item.type === "MCQ" ? (timedOut ? -1 : (selected ?? -1)) : timedOut ? "" : input;
      setSubmitting(true);
      try {
        // Câu JS cần chạy thử: chạy code trong Web Worker (client) rồi gửi output thô lên server
        const runOutputs =
          item.type === "WRITE_JS" && item.runSpecs && item.runSpecs.length > 0 && !timedOut
            ? await runJsSpecs(String(answer), item.runSpecs)
            : undefined;
        const res = await fetch("/api/practice/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: item.id, answer, runOutputs }),
        });
        const data = await res.json();
        applyOutcome(
          {
            correct: !timedOut && !!data.correct,
            timedOut,
            answerLabel: labelFor(data.track ?? item.track, data.tagName ?? item.tagName),
            explain: data.tagDescription ?? item.tagDescription,
            correctIndex: data.correctIndex,
            correctAnswer: data.correctAnswer,
            results: data.results,
          },
          item.prompt
        );
      } finally {
        setSubmitting(false);
      }
    },
    [item, feedback, submitting, input, selected, applyOutcome]
  );

  // Đồng hồ đếm ngược — dừng khi đang xem feedback hoặc đang chấm
  useEffect(() => {
    if (phase !== "playing" || feedback || submitting || !item) return;
    const total = timeFor(item);
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const remaining = total - (Date.now() - startedAt) / 1000;
      if (remaining <= 0) {
        setTimeLeft(0);
        submit(true);
      } else {
        setTimeLeft(remaining);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [phase, ptr, feedback, submitting, item, submit]);

  useEffect(() => {
    if (phase === "playing" && !feedback) {
      inputRef.current?.focus();
      textareaRef.current?.focus();
    }
  }, [phase, ptr, feedback]);

  function start() {
    if (!pool) return;
    setItems(shuffle(filterScope(pool, scope)));
    setPtr(0);
    setInput("");
    setSelected(null);
    setFeedback(null);
    setScore(0);
    setAnswered(0);
    setStreak(0);
    setBestStreak(0);
    setWrongList([]);
    setTimeLeft(TIME_FAST);
    setPhase("playing");
  }

  function next() {
    setInput("");
    setSelected(null);
    setFeedback(null);
    if (ptr + 1 >= items.length) {
      // Hết pool — xáo lại và chơi tiếp (vô tận)
      setItems(shuffle(items));
      setPtr(0);
    } else {
      setPtr(ptr + 1);
    }
  }

  // ===== Màn giới thiệu =====
  if (phase === "intro") {
    const scopeCount = pool ? filterScope(pool, scope).length : 0;
    return (
      <div className="animate-rise mx-auto max-w-lg py-16 text-center">
        <p className="text-5xl">🎯</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Luyện tổng hợp</h1>
        <p className="mt-3 leading-relaxed text-ink/70">
          Trộn ngẫu nhiên <strong>mọi dạng câu hỏi</strong> của HTML, CSS và JS: trắc nghiệm, điền
          thẻ, viết code/CSS/JS, sửa bug, phản xạ thẻ/thuộc tính/CSS/JS. Chơi đến khi nào bạn muốn
          dừng.
        </p>

        {/* Chọn phạm vi luyện tập */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-ink/60">Phạm vi luyện</p>
          <div className="inline-flex rounded-full border border-ink/15 bg-surface p-1">
            {(Object.keys(SCOPE_META) as Scope[]).map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  scope === s
                    ? "bg-flame-500 text-white shadow-sm"
                    : "text-ink/60 hover:text-flame-700"
                }`}
              >
                {SCOPE_META[s]}
              </button>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-ink/70">
          <li className="flex gap-2">
            <span>♾️</span> Vô tận — hết {pool ? `${scopeCount} câu` : "câu"} sẽ tự xáo lại vòng mới
          </li>
          <li className="flex gap-2">
            <span>⏱️</span> {TIME_FAST}s câu nhanh · {TIME_CODE}s câu gõ code
          </li>
          <li className="flex gap-2">
            <span>💡</span> Sai là biết ngay đáp án đúng + giải thích
          </li>
          <li className="flex gap-2">
            <span>🧘</span> Luyện tự do — không ảnh hưởng lịch ôn tập
          </li>
        </ul>
        <button
          onClick={start}
          disabled={!pool || scopeCount === 0}
          className="mt-8 rounded-full bg-flame-500 px-8 py-3 font-display text-lg font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600 hover:shadow-xl disabled:opacity-50"
        >
          {pool ? "Bắt đầu 🎯" : "Đang tải câu hỏi..."}
        </button>
      </div>
    );
  }

  // ===== Màn tổng kết =====
  if (phase === "done") {
    const accuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;
    return (
      <div className="animate-rise mx-auto max-w-lg space-y-6 py-12">
        <div className="text-center">
          <p className="text-5xl">{accuracy >= 80 ? "🏆" : accuracy >= 50 ? "💪" : "🌱"}</p>
          <h1 className="mt-3 font-display text-3xl font-bold">
            Đúng {score}/{answered} câu ({accuracy}%)
          </h1>
          <p className="mt-1 text-ink/60">
            Chuỗi dài nhất: <strong className="text-flame-600">{bestStreak} 🔥</strong>
          </p>
        </div>

        {wrongList.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-display font-bold">Các câu sai trong phiên</h2>
            {wrongList.slice(-15).map((w, i) => (
              <div
                key={i}
                className="animate-rise rounded-xl border border-amber-200 bg-amber-50 p-4"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <p className="text-sm text-ink/70">{w.prompt}</p>
                <p className="mt-2 text-sm">
                  <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-xs font-bold text-flame-300">
                    {w.answerLabel}
                  </code>{" "}
                  <span className="text-ink/60">— {w.explain}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={start}
            className="rounded-full bg-flame-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-flame-600"
          >
            Chơi lại 🎯
          </button>
          <Link
            href="/tags"
            className="rounded-full border border-ink/15 px-6 py-2.5 font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            Ôn lại các thẻ
          </Link>
        </div>
      </div>
    );
  }

  if (!item) return null;

  // ===== Màn chơi =====
  const total = timeFor(item);
  const timePct = (timeLeft / total) * 100;
  const timerColor =
    timePct > 50 ? "bg-flame-500" : timePct > 25 ? "bg-amber-500" : "bg-red-500";
  const badge =
    TYPE_BADGE[
      item.kind === "db"
        ? item.type
        : item.kind === "attr"
          ? "ATTR"
          : item.kind === "cssreflex"
            ? "CSSREFLEX"
            : item.kind === "jsreflex"
              ? "JSREFLEX"
              : "REFLEX"
    ];
  const isMcq = item.kind === "db" && item.type === "MCQ";
  const isMultiline =
    item.kind === "db" &&
    (item.type === "WRITE_STRUCTURE" || item.type === "WRITE_CSS" || item.type === "WRITE_JS");
  const canSubmit = isMcq ? selected !== null : input.trim() !== "";

  return (
    <div className="mx-auto max-w-lg space-y-4 py-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink/60">
          Đúng {score}/{answered}
          {streak > 0 && <span className="ml-2 font-bold text-flame-600">{streak} 🔥</span>}
        </span>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge.cls}`}>
            {badge.label}
          </span>
          <button
            onClick={() => setPhase("done")}
            className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/60 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            Kết thúc ⏹
          </button>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-ink/10">
        <div
          className={`h-full rounded-full transition-[width] duration-100 ease-linear ${timerColor}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      <div
        key={`${ptr}-${answered}`}
        className="animate-pop rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm"
      >
        <p className="text-lg font-medium leading-relaxed">{item.prompt}</p>

        {item.kind === "db" && item.starterCode && (
          <pre className="mt-4 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm leading-relaxed text-flame-100">
            {item.starterCode}
          </pre>
        )}

        {isMcq && item.options && (
          <div className="mt-5 space-y-2.5">
            {item.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !feedback && setSelected(i)}
                disabled={!!feedback}
                className={`group flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                  selected === i
                    ? "border-flame-500 bg-flame-50 shadow-sm"
                    : feedback && feedback.correctIndex === i
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-ink/10 hover:border-flame-200 hover:bg-flame-50/50"
                } disabled:cursor-not-allowed`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${
                    selected === i ? "bg-flame-500 text-white" : "bg-ink/5 text-ink/60"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        )}

        {!isMcq &&
          (isMultiline ? (
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!!feedback}
              rows={5}
              spellCheck={false}
              placeholder={
                item.kind === "db" && item.type === "WRITE_CSS"
                  ? "Gõ CSS của bạn... (vd: p { color: red; })"
                  : item.kind === "db" && item.type === "WRITE_JS"
                    ? "Gõ code JS của bạn (nhiều dòng)..."
                    : "Gõ code của bạn (nhiều dòng)..."
              }
              className="mt-5 w-full rounded-xl border-2 border-ink/10 bg-paper p-4 font-mono text-sm transition-colors focus:border-flame-400 focus:outline-none disabled:opacity-60"
            />
          ) : (
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!!feedback}
              spellCheck={false}
              autoComplete="off"
              placeholder={
                item.kind === "reflex"
                  ? "Gõ tên thẻ rồi nhấn Enter... (vd: video)"
                  : item.kind === "attr"
                    ? "Gõ tên thuộc tính rồi nhấn Enter... (vd: required)"
                    : item.kind === "cssreflex"
                      ? "Gõ thuộc tính CSS rồi nhấn Enter... (vd: font-weight)"
                      : item.kind === "jsreflex"
                        ? "Gõ cú pháp/hàm JS rồi nhấn Enter... (vd: map)"
                        : "Gõ câu trả lời rồi nhấn Enter..."
              }
              className="mt-5 w-full rounded-xl border-2 border-ink/10 bg-paper p-4 font-mono text-sm transition-colors focus:border-flame-400 focus:outline-none disabled:opacity-60"
              onKeyDown={(e) => {
                if (e.key !== "Enter" || feedback || !input.trim()) return;
                // Chặn default action: tránh cùng sự kiện Enter kích hoạt nút autoFocus
                e.preventDefault();
                submit(false);
              }}
            />
          ))}

        {!feedback && (
          <button
            onClick={() => submit(false)}
            disabled={submitting || !canSubmit}
            className="mt-5 w-full rounded-xl bg-flame-500 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-flame-600 disabled:opacity-40 sm:w-auto"
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
          {feedback.correct ? (
            <p className="font-semibold text-emerald-800">✓ Chính xác!</p>
          ) : (
            <>
              <p className="font-semibold text-red-800">
                {feedback.timedOut ? "⏱️ Hết giờ!" : "✗ Chưa đúng"}
                {feedback.correctIndex != null && isMcq && item.options && (
                  <>
                    {" "}
                    — đáp án đúng:{" "}
                    <strong>
                      {String.fromCharCode(65 + feedback.correctIndex)}.{" "}
                      {item.options[feedback.correctIndex]}
                    </strong>
                  </>
                )}
                {feedback.correctAnswer && (
                  <>
                    {" "}
                    — đáp án:{" "}
                    <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-sm font-bold text-flame-300">
                      {feedback.correctAnswer}
                    </code>
                  </>
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
              <p className="mt-2 text-sm text-ink/70">
                <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-xs font-bold text-flame-300">
                  {feedback.answerLabel}
                </code>{" "}
                — {feedback.explain}
              </p>
            </>
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
            Câu tiếp theo →
          </button>
          <span className="ml-3 text-xs text-ink/40">hoặc nhấn Enter</span>
        </div>
      )}
    </div>
  );
}
