"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { REFLEX_QUESTIONS } from "@/lib/reflex-data";
import { ATTRIBUTE_REFLEX_QUESTIONS } from "@/lib/attribute-reflex-data";
import { CSS_REFLEX_QUESTIONS } from "@/lib/css-reflex-data";
import { JS_REFLEX_QUESTIONS } from "@/lib/js-reflex-data";

const ROUND_SIZE = 10;
const TIME_PER_QUESTION = 45; // giây

type Mode = "tag" | "attr" | "css" | "js";

// Câu hỏi đã chuẩn hóa cho cả 3 chế độ
type RoundItem = {
  prompt: string;
  explain: string;
  /** Đáp án hiển thị: "video", "required" hoặc "font-weight" */
  answer: string;
  /** Các đáp án chấp nhận (đã gồm answer) */
  targets: string[];
  /** Chấp nhận đáp án bắt đầu bằng answer (data-*) */
  prefix?: boolean;
  /** Hiển thị đáp án dạng trần (thuộc tính/CSS) thay vì bọc <> như thẻ */
  plain: boolean;
};

const MODE_META: Record<Mode, { unit: string; ask: string; placeholder: string }> = {
  tag: { unit: "Thẻ", ask: "thẻ nào?", placeholder: "Gõ tên thẻ rồi nhấn Enter... (vd: video)" },
  attr: {
    unit: "Thuộc tính",
    ask: "thuộc tính nào?",
    placeholder: "Gõ tên thuộc tính rồi nhấn Enter... (vd: required)",
  },
  css: {
    unit: "CSS",
    ask: "thuộc tính CSS nào?",
    placeholder: "Gõ tên thuộc tính CSS rồi nhấn Enter... (vd: font-weight)",
  },
  js: {
    unit: "JS",
    ask: "dùng cú pháp/hàm JS nào?",
    placeholder: "Gõ tên cú pháp/hàm rồi nhấn Enter... (vd: map)",
  },
};

// Chuẩn hóa: bỏ <>, quotes, khoảng trắng, *; với thuộc tính lấy phần trước dấu =
const norm = (s: string) => s.toLowerCase().split("=")[0].replace(/[<>"'`/\s*]/g, "");

function matches(input: string, item: RoundItem): boolean {
  const ni = norm(input);
  if (ni === "") return false;
  if (item.targets.includes(ni)) return true;
  if (item.prefix && ni.startsWith(norm(item.answer))) return true;
  return false;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRound(mode: Mode): RoundItem[] {
  let pool: RoundItem[];
  if (mode === "tag") {
    pool = REFLEX_QUESTIONS.map((q) => ({
      prompt: q.prompt,
      explain: q.explain,
      answer: q.tag,
      targets: [norm(q.tag)],
      plain: false,
    }));
  } else if (mode === "attr") {
    pool = ATTRIBUTE_REFLEX_QUESTIONS.map((q) => ({
      prompt: q.prompt,
      explain: q.explain,
      answer: q.attr,
      targets: [q.attr, ...(q.accept ?? [])].map(norm),
      prefix: q.prefix,
      plain: true,
    }));
  } else if (mode === "css") {
    pool = CSS_REFLEX_QUESTIONS.map((q) => ({
      prompt: q.prompt,
      explain: q.explain,
      answer: q.answer,
      targets: [q.answer, ...(q.accept ?? [])].map(norm),
      plain: true,
    }));
  } else {
    pool = JS_REFLEX_QUESTIONS.map((q) => ({
      prompt: q.prompt,
      explain: q.explain,
      answer: q.answer,
      targets: [q.answer, ...(q.accept ?? [])].map(norm),
      plain: true,
    }));
  }

  const seen = new Set<string>();
  const round: RoundItem[] = [];
  for (const q of shuffle(pool)) {
    if (seen.has(q.answer)) continue;
    seen.add(q.answer);
    round.push(q);
    if (round.length === ROUND_SIZE) break;
  }
  return round;
}

type Result = { q: RoundItem; answer: string; correct: boolean; timedOut: boolean };
type Phase = "intro" | "playing" | "done";

function AnswerChip({ item }: { item: RoundItem }) {
  return (
    <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-sm font-bold text-flame-300">
      {item.plain ? item.answer : `<${item.answer}>`}
    </code>
  );
}

export default function ReflexGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [mode, setMode] = useState<Mode>("tag");
  const [round, setRound] = useState<RoundItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [feedback, setFeedback] = useState<Result | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const q = round[idx];

  const answerCurrent = useCallback(
    (answer: string, timedOut: boolean) => {
      if (!q || feedback) return;
      const correct = !timedOut && matches(answer, q);
      const result: Result = { q, answer, correct, timedOut };
      setResults((r) => [...r, result]);
      setFeedback(result);
      if (correct) {
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
      } else {
        setStreak(0);
      }
    },
    [q, feedback],
  );

  // Đồng hồ đếm ngược — dừng khi đang xem feedback
  useEffect(() => {
    if (phase !== "playing" || feedback) return;
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const remaining = TIME_PER_QUESTION - (Date.now() - startedAt) / 1000;
      if (remaining <= 0) {
        setTimeLeft(0);
        answerCurrent("", true);
      } else {
        setTimeLeft(remaining);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [phase, idx, feedback, answerCurrent]);

  useEffect(() => {
    if (phase === "playing" && !feedback) inputRef.current?.focus();
  }, [phase, idx, feedback]);

  function start(m: Mode) {
    setMode(m);
    setRound(buildRound(m));
    setIdx(0);
    setInput("");
    setResults([]);
    setFeedback(null);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(TIME_PER_QUESTION);
    setPhase("playing");
  }

  function next() {
    setFeedback(null);
    setInput("");
    setTimeLeft(TIME_PER_QUESTION);
    if (idx + 1 < round.length) {
      setIdx(idx + 1);
    } else {
      setPhase("done");
    }
  }

  // ===== Màn giới thiệu =====
  if (phase === "intro") {
    return (
      <div className="animate-rise mx-auto max-w-lg py-16 text-center">
        <p className="text-5xl">⚡</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Luyện phản xạ</h1>
        <p className="mt-3 leading-relaxed text-ink/70">
          Đọc tình huống thực tế — <strong>gõ ngay đáp án</strong> bạn nghĩ đến. Không có gợi ý,
          không có lựa chọn. Nhìn là phải nghĩ ra!
        </p>
        <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-ink/70">
          <li className="flex gap-2">
            <span>🎲</span> {ROUND_SIZE} câu ngẫu nhiên — mỗi vòng mỗi khác
          </li>
          <li className="flex gap-2">
            <span>⏱️</span> {TIME_PER_QUESTION} giây mỗi câu, hết giờ tính sai
          </li>
          <li className="flex gap-2">
            <span>🔥</span> Trả lời đúng liên tiếp để giữ chuỗi streak
          </li>
          <li className="flex gap-2">
            <span>🧘</span> Chế độ luyện tự do — không ảnh hưởng lịch ôn tập
          </li>
        </ul>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => start("tag")}
            className="rounded-2xl bg-flame-500 px-5 py-4 text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600 hover:shadow-xl"
          >
            <span className="block font-display text-lg font-bold">⚡ Phản xạ thẻ</span>
            <span className="mt-0.5 block text-sm text-white/80">Tình huống → gõ tên thẻ</span>
          </button>
          <button
            onClick={() => start("attr")}
            className="rounded-2xl bg-ink px-5 py-4 text-white shadow-lg shadow-ink/30 transition-all hover:-translate-y-0.5 hover:bg-ink/85 hover:shadow-xl"
          >
            <span className="block font-display text-lg font-bold">🧬 Phản xạ thuộc tính</span>
            <span className="mt-0.5 block text-sm text-white/80">Tình huống → gõ thuộc tính HTML</span>
          </button>
          <button
            onClick={() => start("css")}
            className="rounded-2xl bg-sky-600 px-5 py-4 text-white shadow-lg shadow-sky-600/30 transition-all hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-xl"
          >
            <span className="block font-display text-lg font-bold">🎨 Phản xạ CSS</span>
            <span className="mt-0.5 block text-sm text-white/80">Tình huống → gõ thuộc tính CSS</span>
          </button>
          <button
            onClick={() => start("js")}
            className="rounded-2xl bg-amber-500 px-5 py-4 text-white shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl"
          >
            <span className="block font-display text-lg font-bold">🟨 Phản xạ JS</span>
            <span className="mt-0.5 block text-sm text-white/80">Nhu cầu → gõ cú pháp/hàm JS</span>
          </button>
        </div>
      </div>
    );
  }

  // ===== Màn tổng kết =====
  if (phase === "done") {
    const score = results.filter((r) => r.correct).length;
    const wrong = results.filter((r) => !r.correct);
    return (
      <div className="animate-rise mx-auto max-w-lg space-y-6 py-12">
        <div className="text-center">
          <p className="text-5xl">{score >= 8 ? "🏆" : score >= 5 ? "💪" : "🌱"}</p>
          <h1 className="mt-3 font-display text-3xl font-bold">
            {score}/{round.length} câu đúng
          </h1>
          <p className="mt-1 text-ink/60">
            Chuỗi dài nhất: <strong className="text-flame-600">{bestStreak} 🔥</strong>
          </p>
        </div>

        {wrong.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-display font-bold">Cần luyện thêm</h2>
            {wrong.map((r, i) => (
              <div
                key={i}
                className="animate-rise rounded-xl border border-amber-200 bg-amber-50 p-4"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <p className="text-sm text-ink/70">{r.q.prompt}</p>
                <p className="mt-2 text-sm">
                  <AnswerChip item={r.q} />{" "}
                  <span className="text-ink/60">— {r.q.explain}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => start(mode)}
            className="rounded-full bg-flame-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-flame-600"
          >
            Chơi lại ⚡
          </button>
          <button
            onClick={() => setPhase("intro")}
            className="rounded-full border border-ink/15 px-6 py-2.5 font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            Đổi chế độ
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

  // ===== Màn chơi =====
  const timePct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor =
    timePct > 50 ? "bg-flame-500" : timePct > 25 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="mx-auto max-w-lg space-y-4 py-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink/60">
          Câu {idx + 1}/{round.length}
          <span className="ml-2 rounded-full bg-ink/5 px-2 py-0.5 text-xs">
            {MODE_META[mode].unit}
          </span>
        </span>
        <span className="font-display font-bold text-flame-600">
          {streak > 0 && `${streak} 🔥`}
        </span>
      </div>

      {/* Thanh đếm ngược */}
      <div className="h-2 overflow-hidden rounded-full bg-ink/10">
        <div
          className={`h-full rounded-full transition-[width] duration-100 ease-linear ${timerColor}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      <div
        key={idx}
        className="animate-pop rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-flame-600">
          Tình huống — {MODE_META[mode].ask}
        </p>
        <p className="mt-2 text-lg font-medium leading-relaxed">{q.prompt}</p>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!!feedback}
          spellCheck={false}
          autoComplete="off"
          placeholder={MODE_META[mode].placeholder}
          className="mt-5 w-full rounded-xl border-2 border-ink/10 bg-paper p-4 font-mono text-sm transition-colors focus:border-flame-400 focus:outline-none disabled:opacity-60"
          onKeyDown={(e) => {
            if (e.key !== "Enter" || feedback || !input.trim()) return;
            // Chặn default action: không preventDefault thì cùng sự kiện Enter này
            // sẽ kích hoạt luôn nút "Câu tiếp theo" vừa được autoFocus
            e.preventDefault();
            answerCurrent(input, false);
          }}
        />

        {!feedback && (
          <button
            onClick={() => input.trim() && answerCurrent(input, false)}
            disabled={input.trim() === ""}
            className="mt-4 w-full rounded-xl bg-flame-500 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-flame-600 disabled:opacity-40 sm:w-auto"
          >
            Trả lời
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
            <p className="font-semibold text-emerald-800">✓ Chính xác — phản xạ tốt!</p>
          ) : (
            <>
              <p className="font-semibold text-red-800">
                {feedback.timedOut ? "⏱️ Hết giờ!" : "✗ Chưa đúng"} — đáp án là{" "}
                <AnswerChip item={feedback.q} />
              </p>
              <p className="mt-2 text-sm text-ink/70">{feedback.q.explain}</p>
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
            {idx + 1 < round.length ? "Câu tiếp theo →" : "Xem kết quả 🏁"}
          </button>
          <span className="ml-3 text-xs text-ink/40">hoặc nhấn Enter</span>
        </div>
      )}
    </div>
  );
}
