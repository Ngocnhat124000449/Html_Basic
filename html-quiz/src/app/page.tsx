import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;
  const now = new Date();

  const [htmlTotal, htmlProgress, cssTotal, cssProgress] = await Promise.all([
    prisma.tag.count({ where: { track: "html" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "html" } } }),
    prisma.tag.count({ where: { track: "css" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "css" } } }),
  ]);

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
  ];

  return (
    <div className="space-y-8 py-12">
      <div className="animate-rise text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Xin chào, {session.user.name} 👋
        </h1>
        <p className="mt-2 text-ink/60">Chọn khóa học để bắt đầu</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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

      <p className="animate-rise stagger-3 text-center text-sm text-ink/40">
        🚧 Thêm khóa học mới (JavaScript, React...) sẽ xuất hiện tại đây.
      </p>
    </div>
  );
}
