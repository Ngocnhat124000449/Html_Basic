import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Status = "unseen" | "learning" | "due" | "mastered";

const STATUS_LABEL: Record<Status, { text: string; cls: string }> = {
  unseen: { text: "Chưa học", cls: "bg-slate-100 text-slate-600" },
  learning: { text: "Đang học", cls: "bg-blue-100 text-blue-700" },
  due: { text: "Đến hạn", cls: "bg-amber-100 text-amber-700" },
  mastered: { text: "Nắm vững", cls: "bg-green-100 text-green-700" },
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

  const topics = [...new Set(tags.map((t) => t.topic))];

  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl font-bold">Tất cả thẻ HTML</h1>
      {topics.map((topic) => (
        <section key={topic}>
          <h2 className="mb-2 font-semibold text-slate-700">{topic}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tags
              .filter((t) => t.topic === topic)
              .map((tag) => {
                const st = STATUS_LABEL[statusOf(tag.id)];
                return (
                  <div key={tag.id} className="rounded-xl border bg-white p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <code className="font-bold text-blue-700">&lt;{tag.name}&gt;</code>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${st.cls}`}>
                        {st.text}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{tag.description}</p>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
