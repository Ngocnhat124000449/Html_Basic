"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TRACKS: { id: string; label: string }[] = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "JavaScript" },
  { id: "dsa", label: "Cấu trúc DL & Giải thuật" },
  { id: "git", label: "Git & Công cụ" },
  { id: "react", label: "React" },
  { id: "project", label: "Dự án — ghép cả trang" },
];

const RETENTIONS = [
  { v: 0.8, label: "80% — ôn thưa, nhẹ nhàng" },
  { v: 0.9, label: "90% — cân bằng (khuyên dùng)" },
  { v: 0.95, label: "95% — ôn dày, nhớ chắc" },
];

export default function SettingsPage() {
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dailyNew, setDailyNew] = useState(5);
  const [reviewCap, setReviewCap] = useState(20);
  const [targetRetention, setTargetRetention] = useState(0.9);
  const [hidden, setHidden] = useState<string[]>([]);
  const [fsrsOptimized, setFsrsOptimized] = useState(false);
  const [fsrsOptimizedAt, setFsrsOptimizedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d.dailyNew === "number") {
          setDailyNew(d.dailyNew);
          setReviewCap(d.reviewCap);
          setTargetRetention(d.targetRetention);
          setHidden(d.hiddenTracks ?? []);
          setFsrsOptimized(!!d.fsrsOptimized);
          setFsrsOptimizedAt(d.fsrsOptimizedAt ?? null);
        }
        setLoaded(true);
      });
  }, []);

  async function resetFsrs() {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetFsrs: true }),
    });
    setFsrsOptimized(false);
    setFsrsOptimizedAt(null);
  }

  function toggleTrack(id: string) {
    setSaved(false);
    setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dailyNew, reviewCap, targetRetention, hiddenTracks: hidden }),
    });
    setSaving(false);
    setSaved(true);
  }

  if (!loaded) {
    return (
      <div className="space-y-4 py-10">
        <div className="h-4 w-40 animate-pulse rounded-full bg-ink/10" />
        <div className="h-64 animate-pulse rounded-2xl bg-ink/10" />
      </div>
    );
  }

  return (
    <div className="animate-rise space-y-8 py-10">
      <div>
        <Link href="/" className="text-sm text-ink/50 hover:text-flame-600">
          ← Trang chủ
        </Link>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Tùy chỉnh ôn tập</h1>
        <p className="mt-2 text-ink/60">Cá nhân hóa nhịp học và mục tiêu ghi nhớ của riêng bạn.</p>
      </div>

      <div className="space-y-6 rounded-2xl border border-ink/10 bg-surface p-6">
        <label className="block">
          <span className="font-display font-bold">Thẻ mới mỗi ngày (mỗi khóa)</span>
          <p className="mb-2 text-sm text-ink/55">Số mục mới tối đa bốc ra mỗi ngày cho từng khóa.</p>
          <input
            type="number"
            min={1}
            max={50}
            value={dailyNew}
            onChange={(e) => {
              setSaved(false);
              setDailyNew(Math.max(1, Math.min(50, Number(e.target.value) || 1)));
            }}
            className="w-28 rounded-xl border border-ink/15 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="font-display font-bold">Số thẻ mỗi phiên “Ôn tất cả”</span>
          <p className="mb-2 text-sm text-ink/55">Giới hạn để không bị ngợp khi nhiều thẻ đến hạn.</p>
          <input
            type="number"
            min={5}
            max={100}
            value={reviewCap}
            onChange={(e) => {
              setSaved(false);
              setReviewCap(Math.max(5, Math.min(100, Number(e.target.value) || 5)));
            }}
            className="w-28 rounded-xl border border-ink/15 px-3 py-2"
          />
        </label>

        <div>
          <span className="font-display font-bold">Mục tiêu ghi nhớ</span>
          <p className="mb-2 text-sm text-ink/55">
            Càng cao thì lịch ôn càng dày (nhớ chắc hơn nhưng tốn công hơn).
          </p>
          <div className="flex flex-col gap-2">
            {RETENTIONS.map((r) => (
              <label key={r.v} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="retention"
                  checked={targetRetention === r.v}
                  onChange={() => {
                    setSaved(false);
                    setTargetRetention(r.v);
                  }}
                />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <span className="font-display font-bold">Khóa tập trung</span>
          <p className="mb-2 text-sm text-ink/55">
            Bỏ chọn khóa muốn TẠM ẨN khỏi phiên “Ôn tất cả” và “Thẻ hay quên”.
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TRACKS.map((t) => {
              const on = !hidden.includes(t.id);
              return (
                <label key={t.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={on} onChange={() => toggleTrack(t.id)} />
                  <span className={on ? "" : "text-ink/40"}>{t.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-surface p-6">
        <span className="font-display font-bold">Lịch ôn tối ưu riêng (FSRS)</span>
        {fsrsOptimized ? (
          <>
            <p className="mt-1 text-sm text-emerald-700">
              ✓ Đã tối ưu theo lịch sử ôn của bạn
              {fsrsOptimizedAt
                ? ` — cập nhật ${new Date(fsrsOptimizedAt).toLocaleDateString("vi-VN")}`
                : ""}
              .
            </p>
            <button
              onClick={resetFsrs}
              className="mt-3 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-red-300 hover:text-red-700"
            >
              Khôi phục lịch mặc định
            </button>
          </>
        ) : (
          <p className="mt-1 text-sm text-ink/55">
            Đang dùng lịch mặc định. Khi bạn ôn đủ nhiều (≈400 lượt), hệ thống có thể tối ưu bộ
            tham số ghi nhớ riêng cho bạn để lịch sát hơn.
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-flame-500 px-6 py-2.5 font-display font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600 disabled:opacity-60"
        >
          {saving ? "Đang lưu..." : "Lưu cài đặt"}
        </button>
        {saved && <span className="text-sm font-medium text-emerald-600">✓ Đã lưu</span>}
      </div>
    </div>
  );
}
