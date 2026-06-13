import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const [totalTags, progress, newToday, attemptsToday, cssTotal, cssProgress] = await Promise.all([
    prisma.tag.count({ where: { track: "html" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "html" } } }),
    prisma.userTagProgress.count({
      where: { userId, createdAt: { gte: startOfDay }, tag: { track: "html" } },
    }),
    prisma.attempt.findMany({
      where: { userId, createdAt: { gte: startOfDay }, question: { tag: { track: "html" } } },
      include: { question: { select: { tag: { select: { id: true, name: true } } } } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.tag.count({ where: { track: "css" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "css" } } }),
  ]);

  // Thống kê khóa CSS cho thẻ khóa học ở hub
  const cssMastered = cssProgress.filter((p) => p.mastered).length;
  const cssDue = cssProgress.filter((p) => p.dueAt <= now).length;
  const cssStarted = cssProgress.length;
  const cssStartedPct = cssTotal > 0 ? Math.round((cssStarted / cssTotal) * 100) : 0;
  const cssMasteredPct = cssTotal > 0 ? Math.round((cssMastered / cssTotal) * 100) : 0;

  const mastered = progress.filter((p) => p.mastered).length;
  const due = progress.filter((p) => p.dueAt <= now).length;
  const started = progress.length;
  // Lịch ôn gần nhất sắp tới — hiện khi hôm nay chưa có thẻ đến hạn
  const nextDue = progress
    .filter((p) => p.dueAt > now)
    .reduce<Date | null>((min, p) => (!min || p.dueAt < min ? p.dueAt : min), null);

  // Thẻ đã học hôm nay (từ lịch sử trả lời) kèm lịch ôn lại từ SRS
  const progressByTagId = new Map(progress.map((p) => [p.tagId, p]));
  const studiedToday = [
    ...new Map(attemptsToday.map((a) => [a.question.tag.id, a.question.tag])).values(),
  ].map((tag) => {
    const p = progressByTagId.get(tag.id);
    return {
      name: tag.name,
      inSrs: !!p, // chưa có progress = chỉ luyện tự do (phản xạ/tổng hợp), chưa vào lịch SRS
      mastered: p?.mastered ?? false,
      dueAt: p?.dueAt ?? null,
      scheduled: p ? p.dueAt > now : false,
    };
  });
  const shortDate = new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "numeric" });
  const unseen = totalTags - progress.length;
  const newAvailable = Math.min(Math.max(0, 5 - newToday), unseen);
  const todayCount = due + newAvailable;
  const masteredPct = totalTags > 0 ? Math.round((mastered / totalTags) * 100) : 0;
  const startedPct = totalTags > 0 ? Math.round((started / totalTags) * 100) : 0;

  const today = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);

  return (
    <div className="space-y-8 py-10">
      <div className="animate-rise">
        <p className="text-sm font-medium capitalize text-flame-600">{today}</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
          Xin chào, {session.user.name} 👋
        </h1>
      </div>

      {/* Hub đa khóa học: chọn khóa để học, mỗi khóa có tiến độ riêng */}
      <section className="animate-rise stagger-1 space-y-3">
        <h2 className="font-display text-lg font-bold">Khóa học của bạn</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Khóa HTML */}
          <Link
            href="/study"
            className="group rounded-2xl border border-flame-200 bg-flame-50/50 p-5 transition-all hover:-translate-y-0.5 hover:border-flame-400 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">HTML</span>
              <span className="rounded-full bg-flame-100 px-2.5 py-0.5 text-xs font-semibold text-flame-700">
                {due > 0 ? `${due} đến hạn` : "cơ bản ✓"}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink/60">
              Nắm vững {mastered}/{totalTags} thẻ ({masteredPct}%)
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-flame-400 to-flame-600"
                style={{ width: `${Math.max(masteredPct, startedPct)}%` }}
              />
            </div>
            <span className="mt-3 inline-block text-sm font-medium text-flame-600 transition-transform group-hover:translate-x-1">
              Tiếp tục học →
            </span>
          </Link>

          {/* Khóa CSS (Beta) */}
          <Link
            href="/css"
            className="group rounded-2xl border border-sky-200 bg-sky-50/50 p-5 transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">
                CSS{" "}
                <span className="rounded-full bg-sky-100 px-2 py-0.5 align-middle text-xs font-semibold text-sky-700">
                  Beta
                </span>
              </span>
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                {cssDue > 0 ? `${cssDue} đến hạn` : cssStarted > 0 ? "đang học" : "mới"}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink/60">
              {cssStarted > 0
                ? `Nắm vững ${cssMastered}/${cssTotal} mục (${cssMasteredPct}%)`
                : `${cssTotal} mục · học theo phần`}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600"
                style={{ width: `${Math.max(cssMasteredPct, cssStartedPct)}%` }}
              />
            </div>
            <span className="mt-3 inline-block text-sm font-medium text-sky-700 transition-transform group-hover:translate-x-1">
              {cssStarted > 0 ? "Tiếp tục học →" : "Bắt đầu →"}
            </span>
          </Link>
        </div>
      </section>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold">Tiến độ HTML hôm nay</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="animate-rise stagger-1 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center sm:p-5">
          <p className="font-display text-3xl font-bold text-amber-600 sm:text-4xl">{due}</p>
          <p className="mt-1 text-xs font-medium text-amber-800/70 sm:text-sm">Thẻ đến hạn ôn</p>
          {due === 0 && nextDue && (
            <p className="mt-0.5 text-[11px] text-amber-700/60">
              sớm nhất {shortDate.format(nextDue)}
            </p>
          )}
        </div>
        <div className="animate-rise stagger-2 rounded-2xl border border-flame-200 bg-flame-50 p-4 text-center sm:p-5">
          <p className="font-display text-3xl font-bold text-flame-600 sm:text-4xl">{newToday}</p>
          <p className="mt-1 text-xs font-medium text-flame-800/70 sm:text-sm">
            Thẻ mới học hôm nay
          </p>
          <p className="mt-0.5 text-[11px] text-flame-700/60">
            {newAvailable > 0 ? `còn ${newAvailable} trong mục tiêu 5/ngày` : "đạt mục tiêu 5/ngày 🎯"}
          </p>
        </div>
        <div className="animate-rise stagger-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center sm:p-5">
          <p className="font-display text-3xl font-bold text-emerald-600 sm:text-4xl">
            {mastered}
            <span className="text-lg text-emerald-600/50">/{totalTags}</span>
          </p>
          <p className="mt-1 text-xs font-medium text-emerald-800/70 sm:text-sm">Đã nắm vững</p>
          <p className="mt-0.5 text-[11px] text-emerald-700/60">ôn đạt liên tục ~3 tuần</p>
        </div>
      </div>

      <div className="animate-rise stagger-3 space-y-2">
        <div className="flex justify-between text-xs font-medium text-ink/50">
          <span>
            Đã học {started}/{totalTags} thẻ · Nắm vững {mastered}
          </span>
          <span>{startedPct}%</span>
        </div>
        {/* Thanh 2 lớp: nhạt = đã bắt đầu học, đậm = đã nắm vững */}
        <div className="relative h-2.5 overflow-hidden rounded-full bg-ink/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-flame-300 transition-all duration-700"
            style={{ width: `${startedPct}%` }}
          />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700"
            style={{ width: `${masteredPct}%` }}
          />
        </div>
      </div>

      {todayCount > 0 ? (
        <Link
          href="/study"
          className="animate-rise stagger-4 group block rounded-2xl bg-gradient-to-br from-flame-500 to-flame-700 p-6 text-white shadow-lg shadow-flame-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-flame-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-xl font-bold sm:text-2xl">Bắt đầu học hôm nay</p>
              <p className="mt-1 text-sm text-white/80">
                {due > 0 && `${due} thẻ cần ôn lại`}
                {due > 0 && newAvailable > 0 && " · "}
                {newAvailable > 0 && `${newAvailable} thẻ mới`}
              </p>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-white/15 px-4 py-2 font-mono text-sm font-bold transition-transform group-hover:translate-x-1">
              {todayCount} thẻ →
            </span>
          </div>
        </Link>
      ) : (
        <div className="animate-rise stagger-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-3xl">🎉</p>
          <p className="mt-2 font-display text-xl font-bold text-emerald-800">
            Hôm nay xong rồi!
          </p>
          <p className="mt-1 text-sm text-emerald-700/70">
            Bộ nhớ cần thời gian — quay lại ôn vào ngày mai nhé.
          </p>
          {unseen > 0 && (
            <Link
              href="/study?extra=1"
              className="mt-4 inline-block rounded-full bg-flame-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-flame-600 hover:shadow-md"
            >
              ⚡ Học vượt {Math.min(5, unseen)} thẻ của ngày sau
            </Link>
          )}
        </div>
      )}

      {studiedToday.length > 0 && (
        <div className="animate-rise stagger-4 rounded-2xl border border-ink/10 bg-surface p-5">
          <h2 className="font-display font-bold">📚 Đã học hôm nay</h2>
          <p className="mt-0.5 text-xs text-ink/50">
            Tiến độ đã được lưu — mỗi thẻ sẽ tự quay lại đúng lịch ôn tập
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {studiedToday.map((t) => (
              <li
                key={t.name}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
                  t.mastered
                    ? "border-emerald-200 bg-emerald-50"
                    : !t.inSrs || t.scheduled
                      ? "border-ink/10 bg-paper"
                      : "border-amber-200 bg-amber-50"
                }`}
              >
                <code className="font-mono font-bold text-flame-600">&lt;{t.name}&gt;</code>
                <span className="text-xs text-ink/60">
                  {!t.inSrs
                    ? "luyện tự do"
                    : t.mastered
                      ? "✓ nắm vững"
                      : t.scheduled && t.dueAt
                        ? `ôn lại ${shortDate.format(t.dueAt)}`
                        : "học lại hôm nay"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/reflex"
          className="animate-rise stagger-4 group rounded-2xl border border-ink/10 bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-flame-300 hover:shadow-md"
        >
          <p className="font-display text-lg font-bold">⚡ Luyện phản xạ</p>
          <p className="mt-0.5 text-sm text-ink/60">
            Nhìn tình huống — gõ ngay tên thẻ · 10 câu/vòng · 45s/câu
          </p>
          <span className="mt-2 inline-block text-sm font-medium text-flame-600 transition-transform group-hover:translate-x-1">
            Chơi ngay →
          </span>
        </Link>
        <Link
          href="/practice"
          className="animate-rise stagger-4 group rounded-2xl border border-ink/10 bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-flame-300 hover:shadow-md"
        >
          <p className="font-display text-lg font-bold">🎯 Luyện tổng hợp</p>
          <p className="mt-0.5 text-sm text-ink/60">
            Trộn trắc nghiệm + điền thẻ + code · chơi vô tận đến khi bạn dừng
          </p>
          <span className="mt-2 inline-block text-sm font-medium text-flame-600 transition-transform group-hover:translate-x-1">
            Chơi ngay →
          </span>
        </Link>
      </div>

      <Link
        href="/tags"
        className="animate-rise stagger-4 block rounded-2xl border border-ink/10 bg-surface p-4 text-center text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
      >
        Xem toàn bộ {totalTags} thẻ HTML →
      </Link>
    </div>
  );
}
