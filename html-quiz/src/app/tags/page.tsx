import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Status = "unseen" | "learning" | "due" | "mastered";

const STATUS_LABEL: Record<Status, { text: string; cls: string; card: string }> = {
  unseen: {
    text: "Chưa học",
    cls: "bg-ink/5 text-ink/50",
    card: "border-ink/10 bg-surface",
  },
  learning: {
    text: "Đang học",
    cls: "bg-sky-100 text-sky-700",
    card: "border-sky-200 bg-sky-50/50",
  },
  due: {
    text: "Đến hạn",
    cls: "bg-amber-100 text-amber-700",
    card: "border-amber-200 bg-amber-50/50",
  },
  mastered: {
    text: "Nắm vững",
    cls: "bg-emerald-100 text-emerald-700",
    card: "border-emerald-200 bg-emerald-50/50",
  },
};

const TOPIC_ICON: Record<string, string> = {
  "Văn bản": "📝",
  "Liên kết & Media": "🔗",
  "Danh sách": "📋",
  "Bảng": "📊",
  "Form": "📨",
  "Cấu trúc trang": "🏗️",
  "Ngữ nghĩa": "🧭",
  "Nhúng & Nâng cao": "🧩",
};

export default async function TagsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;
  const now = new Date();

  const [tags, progress] = await Promise.all([
    prisma.tag.findMany({ orderBy: { order: "asc" } }),
    prisma.userTagProgress.findMany({ where: { userId } }),
  ]);
  const progressByTag = new Map(progress.map((p) => [p.tagId, p]));

  function statusOf(tagId: string): Status {
    const p = progressByTag.get(tagId);
    if (!p) return "unseen";
    if (p.mastered) return "mastered";
    if (p.dueAt <= now) return "due";
    return "learning";
  }

  const statuses = new Map(tags.map((t) => [t.id, statusOf(t.id)]));
  const counts = { unseen: 0, learning: 0, due: 0, mastered: 0 };
  for (const st of statuses.values()) counts[st]++;
  const masteredPct = tags.length > 0 ? Math.round((counts.mastered / tags.length) * 100) : 0;

  const topics = [...new Set(tags.map((t) => t.topic))];

  return (
    <div className="space-y-8 py-10">
      <div className="animate-rise">
        <h1 className="font-display text-3xl font-bold tracking-tight">Tất cả thẻ HTML</h1>
        <p className="mt-1 text-ink/60">
          {tags.length} thẻ · đã nắm vững {counts.mastered} ({masteredPct}%)
        </p>
      </div>

      {/* Tổng quan trạng thái */}
      <div className="animate-rise stagger-1 flex flex-wrap gap-2 text-sm">
        {(Object.keys(STATUS_LABEL) as Status[]).map((st) => (
          <span
            key={st}
            className={`rounded-full px-3 py-1 font-medium ${STATUS_LABEL[st].cls}`}
          >
            {STATUS_LABEL[st].text}: {counts[st]}
          </span>
        ))}
      </div>

      {topics.map((topic, ti) => {
        const topicTags = tags.filter((t) => t.topic === topic);
        const topicMastered = topicTags.filter((t) => statuses.get(t.id) === "mastered").length;
        return (
          <section key={topic} className="animate-rise" style={{ animationDelay: `${ti * 0.07}s` }}>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-display text-lg font-bold">
                <span className="mr-1.5">{TOPIC_ICON[topic] ?? "📦"}</span>
                {topic}
              </h2>
              <span className="text-xs font-medium text-ink/50">
                {topicMastered}/{topicTags.length} nắm vững
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {topicTags.map((tag) => {
                const st = STATUS_LABEL[statuses.get(tag.id)!];
                return (
                  <div
                    key={tag.id}
                    className={`rounded-xl border p-3.5 transition-shadow hover:shadow-md ${st.card}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <code className="font-mono text-sm font-bold text-flame-600">
                        &lt;{tag.name}&gt;
                      </code>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${st.cls}`}
                      >
                        {st.text}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{tag.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
