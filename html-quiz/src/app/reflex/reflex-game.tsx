"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { REFLEX_QUESTIONS, type ReflexQuestion } from "@/lib/reflex-data";

const ROUND_SIZE = 10;
const TIME_PER_QUESTION = 45; // giây

// Cùng quy ước với gradeFillBlank: bỏ < > / và khoảng trắng, không phân biệt hoa thường
const norm = (s: string) => s.toLowerCase().replace(/[<>/\s]/g, "");

function buildRound(): ReflexQuestion[] {
  const shuffled = [...REFLEX_QUESTIONS].sort(() => Math.random() - 0.5);
  const seen = new Set<string>();
  const round: ReflexQuestion[] = [];
  for (const q of shuffled) {
    if (seen.has(q.tag)) continue;
    seen.add(q.tag);
    round.push(q);
    if (round.length === ROUND_SIZE) break;
  }
  return round;
}

type Result = { q: ReflexQuestion; answer: string; correct: boolean; timedOut: boolean };
type Phase = "intro" | "playing" | "done";

export default function ReflexGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [round, setRound] = useState<ReflexQuestion[]>([]);
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
      const correct = !timedOut && norm(answer) !== "" && norm(answer) === norm(q.tag);
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

  function start() {
    setRound(buildRound());
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
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Luyện phản xạ thẻ</h1>
        <p className="mt-3 leading-relaxed text-ink/70">
          Đọc tình huống thực tế — <strong>gõ ngay tên thẻ</strong> bạn nghĩ đến. Không có gợi ý,
          không có đáp án để chọn. Nhìn là phải nghĩ ra!
        </p>
        <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-ink/70">
          <li className="flex gap-2">
            <span>🎲</span> {ROUND_SIZE} câu ngẫu nhiên từ 60 thẻ — mỗi vòng mỗi khác
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
        <button
          onClick={start}
          className="mt-8 rounded-full bg-flame-500 px-8 py-3 font-display text-lg font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600 hover:shadow-xl"
        >
          Bắt đầu ⚡
        </button>
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
                  <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-xs font-bold text-flame-300">
                    &lt;{r.q.tag}&gt;
                  </code>{" "}
                  <span className="text-ink/60">— {r.q.explain}</span>
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
            Chơi lại ⚡
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
          Tình huống — thẻ nào?
        </p>
        <p className="mt-2 text-lg font-medium leading-relaxed">{q.prompt}</p>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!!feedback}
          spellCheck={false}
          autoComplete="off"
          placeholder="Gõ tên thẻ rồi nhấn Enter... (vd: video)"
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
                <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-sm font-bold text-flame-300">
                  &lt;{feedback.q.tag}&gt;
                </code>
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
