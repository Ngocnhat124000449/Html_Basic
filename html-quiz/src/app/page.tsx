import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { retrievability, LEECH_LAPSES } from "@/lib/fsrs";
import { getUserSettings, fsrsOptsOf } from "@/lib/user-settings";

const DAY_MS = 24 * 60 * 60 * 1000;

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;
  const now = new Date();

  const [
    htmlTotal,
    htmlProgress,
    cssTotal,
    cssProgress,
    jsTotal,
    jsProgress,
    dsaTotal,
    dsaProgress,
    gitTotal,
    gitProgress,
    reactTotal,
    reactProgress,
    projectTotal,
    projectProgress,
  ] = await Promise.all([
    prisma.tag.count({ where: { track: "html" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "html" } } }),
    prisma.tag.count({ where: { track: "css" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "css" } } }),
    prisma.tag.count({ where: { track: "js" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "js" } } }),
    prisma.tag.count({ where: { track: "dsa" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "dsa" } } }),
    prisma.tag.count({ where: { track: "git" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "git" } } }),
    prisma.tag.count({ where: { track: "react" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "react" } } }),
    prisma.tag.count({ where: { track: "project" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "project" } } }),
  ]);

  // P2 — dự báo lịch ôn 7 ngày tới + độ nhớ trung bình + thẻ hay quên (mọi khóa)
  const allProgress = [
    ...htmlProgress,
    ...cssProgress,
    ...jsProgress,
    ...dsaProgress,
    ...gitProgress,
    ...reactProgress,
    ...projectProgress,
  ];
  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);
  const forecast = Array.from({ length: 7 }, () => 0);
  for (const p of allProgress) {
    const off = Math.floor((p.dueAt.getTime() - startToday.getTime()) / DAY_MS);
    if (off <= 0) forecast[0]++;
    else if (off < 7) forecast[off]++;
  }
  const fsrsOpts = fsrsOptsOf(await getUserSettings(userId));
  const reviewed = allProgress.filter((p) => p.stability > 0);
  const avgRetention = reviewed.length
    ? Math.round(
        (reviewed.reduce((s, p) => s + retrievability(p, now, fsrsOpts), 0) / reviewed.length) * 100
      )
    : null;
  const leeches = allProgress.filter((p) => p.lapses >= LEECH_LAPSES).length;
  const dueToday = forecast[0];
  const maxForecast = Math.max(...forecast, 1);
  const dayLabel = (i: number) => {
    if (i === 0) return "Hôm nay";
    if (i === 1) return "Mai";
    const d = new Date(startToday.getTime() + i * DAY_MS);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const courses = [
    {
      href: "/html",
      name: "HTML",
      icon: "📄",
      desc: "Cấu trúc trang web qua thẻ ngữ nghĩa",
      total: htmlTotal,
      unit: "thẻ",
      mastered: htmlProgress.filter((p) => p.mastered).length,
      due: htmlProgress.filter((p) => p.dueAt <= now).length,
      started: htmlProgress.length,
      accent: {
        card: "border-flame-200 bg-flame-50/50 hover:border-flame-400",
        bar: "from-flame-400 to-flame-600",
        chip: "bg-flame-100 text-flame-700",
        cta: "text-flame-600",
      },
      beta: false,
    },
    {
      href: "/css",
      name: "CSS",
      icon: "🎨",
      desc: "Tạo giao diện, bố cục và hiệu ứng",
      total: cssTotal,
      unit: "mục",
      mastered: cssProgress.filter((p) => p.mastered).length,
      due: cssProgress.filter((p) => p.dueAt <= now).length,
      started: cssProgress.length,
      accent: {
        card: "border-sky-200 bg-sky-50/50 hover:border-sky-400",
        bar: "from-sky-400 to-sky-600",
        chip: "bg-sky-100 text-sky-700",
        cta: "text-sky-700",
      },
      beta: true,
    },
    {
      href: "/js",
      name: "JavaScript",
      icon: "⚡",
      desc: "Lập trình tương tác cho trang web",
      total: jsTotal,
      unit: "mục",
      mastered: jsProgress.filter((p) => p.mastered).length,
      due: jsProgress.filter((p) => p.dueAt <= now).length,
      started: jsProgress.length,
      accent: {
        card: "border-amber-200 bg-amber-50/50 hover:border-amber-400",
        bar: "from-amber-400 to-amber-600",
        chip: "bg-amber-100 text-amber-700",
        cta: "text-amber-700",
      },
      beta: true,
    },
    {
      href: "/dsa",
      name: "Cấu trúc DL & Giải thuật",
      icon: "🧮",
      desc: "Mảng, stack, queue, tìm kiếm, sắp xếp, Big-O",
      total: dsaTotal,
      unit: "mục",
      mastered: dsaProgress.filter((p) => p.mastered).length,
      due: dsaProgress.filter((p) => p.dueAt <= now).length,
      started: dsaProgress.length,
      accent: {
        card: "border-violet-200 bg-violet-50/50 hover:border-violet-400",
        bar: "from-violet-400 to-violet-600",
        chip: "bg-violet-100 text-violet-700",
        cta: "text-violet-700",
      },
      beta: true,
    },
    {
      href: "/git",
      name: "Git & Công cụ",
      icon: "🔀",
      desc: "Quản lý mã nguồn, GitHub, npm, .env",
      total: gitTotal,
      unit: "mục",
      mastered: gitProgress.filter((p) => p.mastered).length,
      due: gitProgress.filter((p) => p.dueAt <= now).length,
      started: gitProgress.length,
      accent: {
        card: "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400",
        bar: "from-emerald-400 to-emerald-600",
        chip: "bg-emerald-100 text-emerald-700",
        cta: "text-emerald-700",
      },
      beta: true,
    },
    {
      href: "/react",
      name: "React",
      icon: "⚛️",
      desc: "Component, JSX, props — dựng UI hiện đại",
      total: reactTotal,
      unit: "mục",
      mastered: reactProgress.filter((p) => p.mastered).length,
      due: reactProgress.filter((p) => p.dueAt <= now).length,
      started: reactProgress.length,
      accent: {
        card: "border-cyan-200 bg-cyan-50/50 hover:border-cyan-400",
        bar: "from-cyan-400 to-cyan-600",
        chip: "bg-cyan-100 text-cyan-700",
        cta: "text-cyan-700",
      },
      beta: true,
    },
    {
      href: "/project",
      name: "Dự án — ghép cả trang",
      icon: "🧩",
      desc: "Lắp nhiều thẻ thành card, header, form, cả trang",
      total: projectTotal,
      unit: "mục",
      mastered: projectProgress.filter((p) => p.mastered).length,
      due: projectProgress.filter((p) => p.dueAt <= now).length,
      started: projectProgress.length,
      accent: {
        card: "border-rose-200 bg-rose-50/50 hover:border-rose-400",
        bar: "from-rose-400 to-rose-600",
        chip: "bg-rose-100 text-rose-700",
        cta: "text-rose-700",
      },
      beta: true,
    },
  ];

  return (
    <div className="space-y-8 py-12">
      <div className="animate-rise text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Xin chào, {session.user.name} 👋
        </h1>
        <p className="mt-2 text-ink/60">Chọn khóa học để bắt đầu</p>
        <Link
          href="/settings"
          className="mt-3 inline-block text-sm font-medium text-ink/50 transition-colors hover:text-flame-600"
        >
          ⚙️ Tùy chỉnh ôn tập
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, i) => {
          const pct = c.total > 0 ? Math.round((c.mastered / c.total) * 100) : 0;
          const startedPct = c.total > 0 ? Math.round((c.started / c.total) * 100) : 0;
          return (
            <Link
              key={c.href}
              href={c.href}
              className={`animate-rise group rounded-3xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${c.accent.card}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{c.icon}</span>
                {c.beta && (
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                    Beta
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold">{c.name}</h2>
              <p className="mt-1 text-sm text-ink/60">{c.desc}</p>

              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className={`rounded-full px-2.5 py-0.5 font-semibold ${c.accent.chip}`}>
                  {c.due > 0 ? `${c.due} đến hạn ôn` : c.started > 0 ? "đang học" : "chưa bắt đầu"}
                </span>
                <span className="text-ink/50">
                  nắm vững {c.mastered}/{c.total} {c.unit}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${c.accent.bar} transition-all duration-700`}
                  style={{ width: `${Math.max(pct, startedPct)}%` }}
                />
              </div>

              <span
                className={`mt-4 inline-block font-medium transition-transform group-hover:translate-x-1 ${c.accent.cta}`}
              >
                {c.started > 0 ? "Tiếp tục học →" : "Bắt đầu →"}
              </span>
            </Link>
          );
        })}
      </div>

      {/* P2 — Lịch ôn tập theo đường cong lãng quên (FSRS) */}
      <section className="animate-rise stagger-2 rounded-3xl border border-ink/10 bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold">📅 Lịch ôn tập</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-amber-100 px-2.5 py-1 font-semibold text-amber-700">
              {dueToday} thẻ đến hạn hôm nay
            </span>
            {avgRetention !== null && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold text-emerald-700">
                độ nhớ trung bình {avgRetention}%
              </span>
            )}
            {leeches > 0 && (
              <Link
                href="/study?track=leech"
                className="rounded-full bg-red-100 px-2.5 py-1 font-semibold text-red-700 transition-colors hover:bg-red-200"
              >
                {leeches} thẻ hay quên →
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-end gap-2">
          {forecast.map((n, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-xs font-semibold text-ink/70">{n}</span>
              <div className="flex h-24 w-full items-end">
                <div
                  className={`w-full rounded-t-md transition-all ${i === 0 ? "bg-amber-400" : "bg-sky-300"}`}
                  style={{ height: `${Math.max((n / maxForecast) * 100, n > 0 ? 8 : 2)}%` }}
                />
              </div>
              <span className="text-[11px] text-ink/50">{dayLabel(i)}</span>
            </div>
          ))}
        </div>

        {dueToday > 0 ? (
          <Link
            href="/study?track=all"
            className="mt-5 inline-block font-medium text-flame-600 transition-transform hover:translate-x-1"
          >
            Ôn ngay {dueToday} thẻ đến hạn (mọi khóa) →
          </Link>
        ) : (
          <p className="mt-5 text-sm text-ink/50">🎉 Hôm nay không còn thẻ đến hạn — quay lại sau nhé.</p>
        )}
      </section>

      <p className="animate-rise stagger-3 text-center text-sm text-ink/40">
        🚧 Thêm khóa học mới (JavaScript, React...) sẽ xuất hiện tại đây.
      </p>
    </div>
  );
}
