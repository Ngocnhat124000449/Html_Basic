"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { AnswerResult, SessionTag } from "@/lib/study-types";
import { runJsSpecs } from "@/lib/js-runner";
import { runReactSpecs } from "@/lib/react-runner";
import { buildLearnWithWarmup, buildReviewQueue, type QueueItem } from "@/lib/study-queue";
import { TRACK_LABEL, htmlTagLabel, type GateInfo } from "@/lib/tracks";

const TIER_INFO: Record<number, { label: string; cls: string }> = {
  1: { label: "Bậc 1 · Nhận biết", cls: "bg-sky-100 text-sky-700" },
  2: { label: "Bậc 2 · Hiểu", cls: "bg-violet-100 text-violet-700" },
  3: { label: "Bậc 3 · Viết được", cls: "bg-flame-100 text-flame-700" },
};

const MAX_WRONG = 3;

// Nhãn hiển thị: thẻ HTML bọc <>, mục CSS/JS hiện tên trần
const tagLabel = (tag: {
  track: "html" | "css" | "js" | "dsa" | "git" | "react" | "project" | "all" | "leech";
  name: string;
}) => (tag.track === "html" ? htmlTagLabel(tag.name) : tag.name);

export default function StudyPage() {
  const [tags, setTags] = useState<SessionTag[] | null>(null);
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<AnswerResult | null>(null);
  // Tổng lượt sai theo từng thẻ — cuối phiên suy grade FSRS mức thẻ.
  const [wrongByTag, setWrongByTag] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState<{ name: string; passed: boolean }[]>([]);
  const [track, setTrack] = useState<
    "html" | "css" | "js" | "dsa" | "git" | "react" | "project" | "all" | "leech"
  >("html");
  const [mode, setMode] = useState<"learn" | "review">("review");
  // tagId của thẻ đang ở màn làm quen (null = không hiện) — tránh nhập nhằng khi chuyển thẻ.
  const [introFor, setIntroFor] = useState<string | null>(null);
  // G3 — thông tin gate khi API chặn học mới (khóa nền chưa đạt 80%).
  const [gate, setGate] = useState<GateInfo | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Xáo trộn 1 lần mỗi khi tải phiên mới (tags là mảng mới sau mỗi fetch).
  const queue = useMemo<QueueItem[]>(
    () => (tags ? (mode === "learn" ? buildLearnWithWarmup(tags) : buildReviewQueue(tags)) : []),
    [tags, mode]
  );

  // Tải phiên học; extra=true bỏ giới hạn ngày để học vượt
  const loadSession = useCallback(
    (extra: boolean) => {
      setTags(null);
      setPos(0);
      setSelected(null);
      setAnswer("");
      setFeedback(null);
      setWrongByTag({});
      setFinished(false);
      setSummary([]);
      setGate(null);
      const qs = new URLSearchParams();
      if (extra) qs.set("extra", "1");
      if (track !== "html") qs.set("track", track);
      // Forward CẢ learn lẫn review để API trả đúng tập (review = chỉ thẻ đã học đến hạn).
      qs.set("mode", mode);
      fetch(`/api/study/session${qs.size > 0 ? `?${qs}` : ""}`)
        .then((r) => r.json())
        .then((d) => {
          setTags(d.tags ?? []);
          setGate(d.gate ?? null);
          setIntroFor(
            mode === "learn" ? (d.tags?.find((t: SessionTag) => t.isNew)?.tagId ?? null) : null
          );
        });
    },
    [track, mode]
  );

  // Phiên đầu tiên: đọc ?extra & ?track từ URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const extra = params.get("extra") === "1";
    const tp = params.get("track");
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
    const md = params.get("mode") === "learn" ? "learn" : "review";
    const qs = new URLSearchParams();
    if (extra) qs.set("extra", "1");
    if (trk !== "html") qs.set("track", trk);
    qs.set("mode", md);
    let cancelled = false;
    fetch(`/api/study/session${qs.size > 0 ? `?${qs}` : ""}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setTrack(trk);
        setMode(md);
        setTags(d.tags ?? []);
        setGate(d.gate ?? null);
        setIntroFor(
          md === "learn" ? (d.tags?.find((t: SessionTag) => t.isNew)?.tagId ?? null) : null
        );
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
  }, [feedback, pos]);

  // Tự chuyển câu sau khi xem kết quả — đúng 3s, sai 5s (MCQ) / 7s (câu gõ code).
  // Bấm "Câu tiếp theo"/Enter thì qua ngay không phải chờ.
  const [autoNext, setAutoNext] = useState<{ left: number; total: number } | null>(null);

  // review = chỉ ôn thẻ đã học (mọi track, gồm all/leech); learn = học mới tuần tự.
  const reviewMode = mode === "review";
  const unit = track === "html" ? "thẻ" : "mục";
  const homeHref =
    track === "css"
      ? "/css"
      : track === "js"
        ? "/js"
        : track === "dsa"
          ? "/dsa"
          : track === "git"
            ? "/git"
            : track === "react"
              ? "/react"
              : track === "project"
                ? "/project"
                : track === "all" || track === "leech"
                  ? "/"
                  : "/html";

  // Chốt phiên: gom lượt sai theo thẻ → batch lên server, dựng tổng kết.
  const finishSession = useCallback(
    async (wrong: Record<string, number>) => {
      if (!tags) return;
      const results = tags.map((t) => ({
        tagId: t.tagId,
        wrongCount: Math.min(wrong[t.tagId] ?? 0, MAX_WRONG),
      }));
      setSummary(
        tags.map((t) => ({ name: t.name, passed: (wrong[t.tagId] ?? 0) < MAX_WRONG }))
      );
      setFinished(true);
      await fetch("/api/study/complete-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results }),
      });
    },
    [tags]
  );

  // Sang câu kế (hoặc chốt phiên ở câu cuối) — dùng chung cho nút bấm và tự chuyển câu.
  const next = useCallback(async () => {
    if (pos + 1 >= queue.length) {
      // wrongByTag đã cập nhật ở submit (render trước) nên dùng trực tiếp.
      await finishSession(wrongByTag);
      return;
    }
    const nextPos = pos + 1;
    setPos(nextPos);
    const nextItem = queue[nextPos];
    if (
      mode === "learn" &&
      nextItem &&
      nextItem.tag.isNew &&
      nextItem.tag.tagId !== queue[pos]?.tag.tagId
    ) {
      setIntroFor(nextItem.tag.tagId);
    }
    setSelected(null);
    setAnswer("");
    setFeedback(null);
  }, [pos, queue, mode, wrongByTag, finishSession]);

  // Đồng hồ tự chuyển câu: kick qua setTimeout để không setState đồng bộ trong effect.
  useEffect(() => {
    if (!feedback) return;
    const cur = queue[pos];
    const total = feedback.correct ? 3 : cur && cur.q.type !== "MCQ" ? 7 : 5;
    const startedAt = Date.now();
    const tick = () => {
      const remaining = total - (Date.now() - startedAt) / 1000;
      if (remaining <= 0) {
        clearInterval(timer);
        next();
      } else {
        setAutoNext({ left: Math.ceil(remaining), total });
      }
    };
    const kick = setTimeout(tick, 0);
    const timer = setInterval(tick, 100);
    return () => {
      clearTimeout(kick);
      clearInterval(timer);
      setAutoNext(null);
    };
  }, [feedback, pos, queue, next]);

  if (tags === null) {
    return (
      <div className="space-y-4 py-10">
        <div className="h-4 w-48 animate-pulse rounded-full bg-ink/10" />
        <div className="h-64 animate-pulse rounded-2xl bg-ink/10" />
        <p className="text-center text-sm text-ink/50">Đang chuẩn bị phiên học...</p>
      </div>
    );
  }

  // G3 — khóa chưa mở: hiện điều kiện + lối đi học khóa nền. Chỉ xảy ra với mode=learn.
  if (tags.length === 0 && gate) {
    return (
      <div className="animate-rise py-20 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="mt-3 font-display text-2xl font-bold">Khóa này chưa mở</h1>
        <p className="mt-2 text-ink/60">
          Cần học ≥80% mỗi khóa nền —{" "}
          <strong>{TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy}</strong> mới học {gate.learned}/
          {gate.need} thẻ cần thiết (tổng {gate.total}).
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {/* Thẻ <a> thường (full reload): /study đọc query 1 lần trong useEffect đầu. */}
          <a
            href={`/study?track=${gate.blockedBy}&mode=learn`}
            className="rounded-full bg-flame-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-flame-600"
          >
            📖 Học tiếp {TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy} →
          </a>
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

  if (tags.length === 0) {
    return (
      <div className="animate-rise py-20 text-center">
        <p className="text-4xl">🎉</p>
        <h1 className="mt-3 font-display text-2xl font-bold">
          {track === "leech"
            ? "Không còn thẻ hay quên cần luyện"
            : reviewMode
              ? `Không có ${unit} nào đến hạn`
              : `Đã học đủ ${unit} mới hôm nay`}
        </h1>
        <p className="mt-2 text-ink/60">
          {reviewMode
            ? "Bạn đã ôn hết thẻ đến hạn — quay lại sau nhé."
            : "Bạn đã hoàn thành mục tiêu hôm nay — nhưng vẫn có thể học vượt bài của ngày sau."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!reviewMode && (
            <button
              onClick={() => loadSession(true)}
              className="rounded-full bg-flame-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-flame-600"
            >
              ⚡ Học thêm 5 {unit} mới
            </button>
          )}
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

  if (finished) {
    const passedCount = summary.filter((s) => s.passed).length;
    return (
      <div className="animate-rise space-y-6 py-12">
        <div className="text-center">
          <p className="text-4xl">🏁</p>
          <h1 className="mt-3 font-display text-3xl font-bold">Kết thúc phiên ôn</h1>
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
                s.passed ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
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
            onClick={() => loadSession(!reviewMode)}
            className="rounded-full bg-flame-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-flame-600"
          >
            {reviewMode ? "🔁 Ôn tiếp lô còn lại" : `⚡ Học thêm 5 ${unit} mới`}
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

  const item = queue[pos];
  const tag = item.tag;
  const q = item.q;

  const showIntro = mode === "learn" && introFor === tag.tagId;

  if (showIntro) {
    // Màn làm quen chỉ cho PHA HỌC MỚI → đánh số trong số thẻ mới. Tính trong nhánh
    // này để không chạy O(n) mỗi lần render (vd mỗi keystroke ở ô trả lời).
    const isNewBoundary = (it: QueueItem, i: number, arr: QueueItem[]) =>
      it.tag.isNew && (i === 0 || arr[i - 1].tag.tagId !== it.tag.tagId);
    const cardNo = queue.slice(0, pos + 1).filter(isNewBoundary).length;
    const cardTotal = queue.filter(isNewBoundary).length;
    // Có pha ôn nền nếu thẻ đầu hàng đợi là thẻ ôn (isNew=false).
    const hadWarmup = queue.length > 0 && !queue[0].tag.isNew;
    const firstNewPos = queue.findIndex((it) => it.tag.isNew);
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

  const isCode = q.type !== "MCQ";
  const isMultiline =
    q.type === "WRITE_STRUCTURE" ||
    q.type === "WRITE_CSS" ||
    q.type === "WRITE_JS" ||
    q.type === "WRITE_CMD" ||
    q.type === "WRITE_JSX";
  const tier = TIER_INFO[q.tier] ?? TIER_INFO[1];
  const sessionPct = (pos / queue.length) * 100;
  const totalWrong = Object.values(wrongByTag).reduce((s, n) => s + n, 0);

  // pick: chỉ số MCQ vừa bấm — truyền thẳng vì setSelected chưa kịp cập nhật state.
  async function submit(pick?: number) {
    const ans = q.type === "MCQ" ? (pick ?? selected) : answer.trim();
    if (ans === null || ans === "") return;
    setSubmitting(true);
    // Câu JS cần chạy thử: chạy code trong Web Worker (client) rồi gửi output thô lên server
    const runOutputs =
      q.type === "WRITE_JS" && q.runSpecs && q.runSpecs.length > 0
        ? await runJsSpecs(String(ans), q.runSpecs)
        : undefined;
    // Câu JSX cần render thử: transpile + render trong Web Worker rồi gửi HTML thô lên server
    const renderOutputs =
      q.type === "WRITE_JSX" && q.reactSpecs && q.reactSpecs.length > 0
        ? await runReactSpecs(String(ans), q.reactSpecs)
        : undefined;
    const res = await fetch("/api/study/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: q.id, answer: ans, runOutputs, renderOutputs }),
    });
    const data: AnswerResult = await res.json();
    setSubmitting(false);
    setFeedback(data);
    if (!data.correct) {
      setWrongByTag((prev) => ({ ...prev, [tag.tagId]: (prev[tag.tagId] ?? 0) + 1 }));
    }
  }

  return (
    <div className="space-y-4 py-8">
      {/* Thanh tiến độ phiên phản xạ */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink/60">
            Câu {pos + 1}/{queue.length}
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

      {/* Hàng trạng thái: chế độ + lượt sai (KHÔNG lộ thẻ trước khi trả lời) */}
      <div className="flex items-center justify-between text-xs">
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
        {totalWrong > 0 && (
          <span className="text-ink/50">
            {totalWrong} lượt sai · {summary.length || tags.length} {unit}
          </span>
        )}
      </div>

      <div
        key={pos}
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
            {q.options.map((opt, i) => {
              const isAnswer = feedback != null && feedback.correctIndex === i;
              const isWrongPick = feedback != null && selected === i && !feedback.correct;
              return (
                <button
                  key={i}
                  onClick={() => {
                    // Một chạm: bấm đáp án là nộp luôn, không cần nút xác nhận.
                    if (feedback || submitting) return;
                    setSelected(i);
                    submit(i);
                  }}
                  disabled={!!feedback || submitting}
                  className={`group flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                    isAnswer
                      ? "border-emerald-500 bg-emerald-50"
                      : isWrongPick
                        ? "border-red-400 bg-red-50"
                        : selected === i
                          ? "border-flame-500 bg-flame-50 shadow-sm"
                          : "border-ink/10 hover:border-flame-200 hover:bg-flame-50/50"
                  } disabled:cursor-not-allowed`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold transition-colors ${
                      isAnswer
                        ? "bg-emerald-500 text-white"
                        : isWrongPick
                          ? "bg-red-400 text-white"
                          : selected === i
                            ? "bg-flame-500 text-white"
                            : "bg-ink/5 text-ink/60 group-hover:bg-flame-100 group-hover:text-flame-700"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
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

        {/* MCQ nộp ngay khi bấm đáp án — nút Trả lời chỉ còn cho câu gõ code */}
        {!feedback && q.type !== "MCQ" && (
          <button
            onClick={() => submit()}
            disabled={submitting || answer.trim() === ""}
            className="mt-5 w-full rounded-xl bg-flame-500 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-flame-600 hover:shadow-md disabled:opacity-40 disabled:shadow-none sm:w-auto"
          >
            {submitting ? "Đang chấm..." : "Trả lời"}
          </button>
        )}
        {!feedback && q.type === "MCQ" && submitting && (
          <p className="mt-4 text-sm font-medium text-ink/50">Đang chấm...</p>
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
          {/* Lộ thẻ sau khi trả lời — luyện nhận diện */}
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">
              {feedback.correct ? (
                <span className="text-emerald-800">✓ Chính xác!</span>
              ) : (
                <span className="text-red-800">✗ Chưa đúng</span>
              )}
            </p>
            <span className="text-sm text-ink/50">— thuộc</span>
            <code className="rounded-lg bg-ink px-2.5 py-1 font-mono text-sm font-bold text-flame-300">
              {tagLabel(tag)}
            </code>
            <span className="hidden text-xs text-ink/50 sm:inline">{tag.description}</span>
          </div>

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
              feedback.correct ? "bg-emerald-600 hover:bg-emerald-700" : "bg-ink hover:bg-ink/80"
            }`}
          >
            {pos + 1 >= queue.length
              ? `Xem kết quả 🏁${autoNext ? ` (${autoNext.left}s)` : ""}`
              : `Câu tiếp theo${autoNext ? ` (${autoNext.left}s)` : ""} →`}
          </button>
          <span className="ml-3 text-xs text-ink/40">hoặc nhấn Enter</span>
          {/* Thanh thời gian tự chuyển câu — thu ngắn dần */}
          {autoNext && (
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/10">
              <div
                className={`h-full rounded-full ${feedback.correct ? "bg-emerald-500" : "bg-red-400"}`}
                style={{
                  width: `${(autoNext.left / autoNext.total) * 100}%`,
                  transition: "width 0.9s linear",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
