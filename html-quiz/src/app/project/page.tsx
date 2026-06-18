import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Status = "unseen" | "learning" | "due" | "mastered";

const STATUS_LABEL: Record<Status, { text: string; cls: string }> = {
  unseen: { text: "Chưa học", cls: "bg-ink/5 text-ink/50" },
  learning: { text: "Đang học", cls: "bg-sky-100 text-sky-700" },
  due: { text: "Đến hạn", cls: "bg-amber-100 text-amber-700" },
  mastered: { text: "Nắm vững", cls: "bg-emerald-100 text-emerald-700" },
};

const PART_ICON: Record<string, string> = {
  "Khối giao diện": "🧩",
  "Tô kiểu & Tương tác": "🎨",
};

export default async function ProjectRoadmapPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;
  const now = new Date();

  const [tags, progress] = await Promise.all([
    prisma.tag.findMany({ where: { track: "project" }, orderBy: { order: "asc" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "project" } } }),
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
  const started = tags.length - counts.unseen;

  const parts: { part: string; topics: { topic: string; tags: typeof tags }[] }[] = [];
  for (const tag of tags) {
    const partName = tag.part ?? "Khác";
    let part = parts.find((p) => p.part === partName);
    if (!part) {
      part = { part: partName, topics: [] };
      parts.push(part);
    }
    let topic = part.topics.find((t) => t.topic === tag.topic);
    if (!topic) {
      topic = { topic: tag.topic, tags: [] };
      part.topics.push(topic);
    }
    topic.tags.push(tag);
  }

  let chapterNo = 0;

  return (
    <div className="space-y-8 py-10">
      <div className="animate-rise">
        <Link href="/" className="text-sm text-ink/50 hover:text-flame-600">
          ← Khóa học
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight">Dự án — ghép cả trang</h1>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
            Beta
          </span>
        </div>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/60">
          Sau khi biết từng thẻ, đây là lúc <strong>LẮP RÁP</strong>: dựng nguyên một khối giao diện
          thật — card sản phẩm, header, form, footer, cả khung trang. Câu bậc 3 chấm cấu trúc HTML
          bạn viết (đúng thẻ bọc ngoài + các thẻ con + nội dung).
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/study?track=project"
            className="rounded-full bg-flame-500 px-6 py-2.5 font-display font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600"
          >
            📖 Luyện ghép trang
          </Link>
          {counts.unseen > 0 && started > 0 && (
            <Link
              href="/study?track=project&extra=1"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
            >
              ⚡ Học vượt
            </Link>
          )}
        </div>
      </div>

      <div className="animate-rise stagger-1 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-ink/5 px-3 py-1 font-medium text-ink/60">
          {tags.length} mục
        </span>
        {(Object.keys(STATUS_LABEL) as Status[]).map((st) => (
          <span key={st} className={`rounded-full px-3 py-1 font-medium ${STATUS_LABEL[st].cls}`}>
            {STATUS_LABEL[st].text}: {counts[st]}
          </span>
        ))}
      </div>

      {parts.map((part, pi) => (
        <section key={part.part} className="animate-rise" style={{ animationDelay: `${pi * 0.07}s` }}>
          <h2 className="font-display text-xl font-bold">
            <span className="mr-1.5">{PART_ICON[part.part] ?? "🧩"}</span>
            Phần {pi + 1} · {part.part}
          </h2>
          <div className="mt-4 space-y-6">
            {part.topics.map((topic) => {
              chapterNo++;
              const topicMastered = topic.tags.filter(
                (t) => statuses.get(t.id) === "mastered"
              ).length;
              return (
                <div key={topic.topic}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <h3 className="font-display font-bold text-ink/80">
                      Chương {chapterNo}: {topic.topic}
                    </h3>
                    <span className="text-xs font-medium text-ink/50">
                      {topicMastered}/{topic.tags.length} nắm vững
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {topic.tags.map((tag) => {
                      const st = STATUS_LABEL[statuses.get(tag.id)!];
                      return (
                        <div key={tag.id} className="rounded-xl border border-ink/10 bg-surface p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <code className="font-mono text-sm font-bold text-flame-600">
                              {tag.name}
                            </code>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${st.cls}`}
                            >
                              {st.text}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                            {tag.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <p className="text-sm text-ink/50">
        🎉 Đây là bước TÍCH HỢP: ghép kiến thức HTML rời rạc thành những khối giao diện hoàn chỉnh —
        nền tảng để tự dựng cả một trang web.
      </p>
    </div>
  );
}
