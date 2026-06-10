"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AnswerResult, SessionTag } from "@/lib/study-types";

const TIER_LABEL: Record<number, string> = {
  1: "Bậc 1 — Nhận biết",
  2: "Bậc 2 — Hiểu",
  3: "Bậc 3 — Viết được",
};

const MAX_WRONG = 3;

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

  useEffect(() => {
    fetch("/api/study/session")
      .then((r) => r.json())
      .then((d) => setTags(d.tags ?? []));
  }, []);

  if (tags === null) return <p className="py-10 text-center">Đang tải phiên học...</p>;

  if (tags.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg">Không có thẻ nào đến hạn hôm nay 🎉</p>
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Về trang chủ
        </Link>
      </div>
    );
  }

  if (tagIdx >= tags.length) {
    return (
      <div className="space-y-4 py-10">
        <h1 className="text-center text-2xl font-bold">Kết thúc phiên học 🏁</h1>
        <ul className="mx-auto max-w-sm space-y-2">
          {summary.map((s) => (
            <li
              key={s.name}
              className={`flex justify-between rounded-lg border p-3 ${
                s.passed ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <code className="font-bold">&lt;{s.name}&gt;</code>
              <span>{s.passed ? "✓ Vượt qua" : "✗ Học lại hôm nay"}</span>
            </li>
          ))}
        </ul>
        <p className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Về trang chủ
          </Link>
        </p>
      </div>
    );
  }

  const tag = tags[tagIdx];
  const q = tag.questions[qIdx];
  const isCode = q.type !== "MCQ";
  const isMultiline = q.type === "WRITE_STRUCTURE";

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

  return (
    <div className="space-y-4 py-6">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          Thẻ {tagIdx + 1}/{tags.length} —{" "}
          <code className="font-bold text-blue-700">&lt;{tag.name}&gt;</code>
          {tag.isNew && (
            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              Mới
            </span>
          )}
        </span>
        <span>{TIER_LABEL[q.tier]}</span>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="font-medium">{q.prompt}</p>

        {q.starterCode && (
          <pre className="mt-3 rounded-lg bg-slate-900 p-3 text-sm text-slate-100">
            {q.starterCode}
          </pre>
        )}

        {q.type === "MCQ" && q.options && (
          <div className="mt-4 space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !feedback && setSelected(i)}
                disabled={!!feedback}
                className={`block w-full rounded-lg border px-4 py-2 text-left transition ${
                  selected === i ? "border-blue-600 bg-blue-50" : "hover:bg-slate-50"
                } disabled:cursor-not-allowed`}
              >
                <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
        )}

        {isCode &&
          (isMultiline ? (
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!feedback}
              rows={5}
              spellCheck={false}
              placeholder="Gõ code của bạn (nhiều dòng)..."
              className="mt-4 w-full rounded-lg border p-3 font-mono text-sm"
            />
          ) : (
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!feedback}
              spellCheck={false}
              placeholder="Gõ câu trả lời..."
              className="mt-4 w-full rounded-lg border p-3 font-mono text-sm"
              onKeyDown={(e) => e.key === "Enter" && !feedback && submit()}
            />
          ))}

        {!feedback && (
          <button
            onClick={submit}
            disabled={submitting || (q.type === "MCQ" ? selected === null : answer.trim() === "")}
            className="mt-4 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Đang chấm..." : "Trả lời"}
          </button>
        )}
      </div>

      {feedback && (
        <div
          className={`rounded-xl border p-5 shadow-sm ${
            feedback.correct ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
          }`}
        >
          <p className="font-semibold">
            {feedback.correct
              ? "✓ Chính xác!"
              : tagFailed
                ? `✗ Sai ${MAX_WRONG} lần — thẻ này sẽ quay lại hàng đợi hôm nay`
                : `✗ Chưa đúng (lần ${wrongCount}/${MAX_WRONG}) — thử lại nhé`}
          </p>

          {feedback.results && (
            <ul className="mt-3 space-y-1 text-sm">
              {feedback.results.map((r, i) => (
                <li key={i} className={r.passed ? "text-green-700" : "text-red-700"}>
                  {r.passed ? "✓" : "✗"} {r.message}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={next}
            className="mt-4 rounded-lg bg-slate-800 px-6 py-2 font-medium text-white hover:bg-slate-900"
          >
            {tagFailed
              ? "Thẻ tiếp theo →"
              : feedback.correct
                ? qIdx + 1 < tag.questions.length
                  ? "Câu tiếp theo →"
                  : "Hoàn thành thẻ ✓"
                : "Làm lại"}
          </button>
        </div>
      )}
    </div>
  );
}
