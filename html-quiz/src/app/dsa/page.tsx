import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getGate } from "@/lib/track-gate";
import { TRACK_LABEL } from "@/lib/tracks";

type Status = "unseen" | "learning" | "due" | "mastered";

const STATUS_LABEL: Record<Status, { text: string; cls: string }> = {
  unseen: { text: "Chưa học", cls: "bg-ink/5 text-ink/50" },
  learning: { text: "Đang học", cls: "bg-sky-100 text-sky-700" },
  due: { text: "Đến hạn", cls: "bg-amber-100 text-amber-700" },
  mastered: { text: "Nắm vững", cls: "bg-emerald-100 text-emerald-700" },
};

const PART_ICON: Record<string, string> = {
  "Cấu trúc dữ liệu": "📦",
  "Giải thuật": "⚙️",
  "Big-O": "📈",
};

export default async function DsaRoadmapPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;
  const now = new Date();

  const [tags, progress] = await Promise.all([
    prisma.tag.findMany({ where: { track: "dsa" }, orderBy: { order: "asc" } }),
    prisma.userTagProgress.findMany({ where: { userId, tag: { track: "dsa" } } }),
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
  // G3 — khóa chưa mở thì thay nút Học mới bằng thông báo (Ôn tập giữ nguyên).
  const gate = await getGate(userId, "dsa");

  // Phần → Chương (topic) theo order
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
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Lộ trình Cấu trúc dữ liệu &amp; Giải thuật
          </h1>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
            Beta
          </span>
        </div>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/60">
          Học theo <strong>phần, theo thứ tự</strong>: cấu trúc dữ liệu → giải thuật → Big-O. Viết
          bằng JavaScript, câu bậc 3 chạy thật để kiểm tra hàm của bạn. Mỗi ngày 5 mục mới + ôn lại
          theo lịch.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {gate ? (
            <span className="rounded-full bg-ink/10 px-6 py-2.5 font-display font-bold text-ink/40">
              🔒 Mở khi {TRACK_LABEL[gate.blockedBy] ?? gate.blockedBy} đạt 80% ({gate.learned}/{gate.need})
            </span>
          ) : (
            <Link
              href="/study?track=dsa&mode=learn"
              className="rounded-full bg-flame-500 px-6 py-2.5 font-display font-bold text-white shadow-lg shadow-flame-500/30 transition-all hover:-translate-y-0.5 hover:bg-flame-600"
            >
              📖 Học mới
            </Link>
          )}
          <Link
            href="/study?track=dsa&mode=review"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-flame-300 hover:text-flame-700"
          >
            🔁 Ôn tập
          </Link>
          {!gate && counts.unseen > 0 && started > 0 && (
            <Link
              href="/study?track=dsa&mode=learn&extra=1"
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
            <span className="mr-1.5">{PART_ICON[part.part] ?? "📦"}</span>
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
                        <div
                          key={tag.id}
                          className="rounded-xl border border-ink/10 bg-surface p-3.5"
                        >
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
        🎉 Trọn bộ 3 Phần: Cấu trúc dữ liệu → Giải thuật → Big-O. Câu bậc 3 viết hàm được chấm tự
        động bằng cách chạy thật nhiều ca test ngay trong trình duyệt.
      </p>
    </div>
  );
}
