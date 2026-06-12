import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  GLOBAL_ATTRIBUTES,
  TAG_ATTRIBUTES,
  type AttrImportance,
  type TagAttribute,
} from "@/lib/attribute-data";

const IMPORTANCE_META: Record<
  AttrImportance,
  { title: string; hint: string; chip: string; border: string }
> = {
  essential: {
    title: "★ Quan trọng nhất",
    hint: "Thiếu là thẻ không hoạt động đúng hoặc mất ý nghĩa",
    chip: "bg-flame-500 text-white",
    border: "border-flame-200",
  },
  common: {
    title: "● Hay dùng",
    hint: "Gặp thường xuyên trong code thực tế",
    chip: "bg-sky-600 text-white",
    border: "border-sky-200",
  },
  rare: {
    title: "○ Ít dùng nhưng hợp lệ",
    hint: "Biết để đọc hiểu code của người khác",
    chip: "bg-ink/70 text-white",
    border: "border-ink/15",
  },
};

const STATUS_LABEL = {
  unseen: { text: "Chưa học", cls: "bg-ink/5 text-ink/50" },
  learning: { text: "Đang học", cls: "bg-sky-100 text-sky-700" },
  due: { text: "Đến hạn ôn", cls: "bg-amber-100 text-amber-700" },
  mastered: { text: "Nắm vững", cls: "bg-emerald-100 text-emerald-700" },
} as const;

function AttrCard({ attr }: { attr: TagAttribute }) {
  const meta = IMPORTANCE_META[attr.importance];
  return (
    <div className={`rounded-xl border bg-surface p-4 ${meta.border}`}>
      <div className="flex flex-wrap items-center gap-2">
        <code className={`rounded-lg px-2 py-0.5 font-mono text-sm font-bold ${meta.chip}`}>
          {attr.name}
        </code>
        <span className="text-sm text-ink/70">{attr.desc}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed">
        <span className="font-semibold text-ink/60">Khi nào dùng:</span> {attr.when}
      </p>
      <pre className="mt-2 overflow-x-auto rounded-lg bg-ink p-3 font-mono text-xs leading-relaxed text-flame-100">
        {attr.example}
      </pre>
      {attr.warn && (
        <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          ⚠️ {attr.warn}
        </p>
      )}
    </div>
  );
}

function AttrGroup({ attrs, importance }: { attrs: TagAttribute[]; importance: AttrImportance }) {
  const group = attrs.filter((a) => a.importance === importance);
  if (group.length === 0) return null;
  const meta = IMPORTANCE_META[importance];
  return (
    <section className="animate-rise">
      <h2 className="font-display text-lg font-bold">{meta.title}</h2>
      <p className="mb-3 text-xs text-ink/50">{meta.hint}</p>
      <div className="space-y-3">
        {group.map((a) => (
          <AttrCard key={a.name} attr={a} />
        ))}
      </div>
    </section>
  );
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { name } = await params;
  const tag = await prisma.tag.findUnique({
    where: { track_name: { track: "html", name } },
  });
  if (!tag) notFound();

  const progress = await prisma.userTagProgress.findUnique({
    where: { userId_tagId: { userId: session.user.id, tagId: tag.id } },
  });
  const now = new Date();
  const status = !progress
    ? STATUS_LABEL.unseen
    : progress.mastered
      ? STATUS_LABEL.mastered
      : progress.dueAt <= now
        ? STATUS_LABEL.due
        : STATUS_LABEL.learning;

  const entry = TAG_ATTRIBUTES.find((t) => t.tag === tag.name);
  const attrs = entry?.attrs ?? [];

  return (
    <div className="space-y-8 py-10">
      <div className="animate-rise">
        <Link href="/tags" className="text-sm text-ink/50 hover:text-flame-600">
          ← Tất cả thẻ
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <code className="rounded-xl bg-ink px-3 py-1.5 font-mono text-2xl font-bold text-flame-300">
            &lt;{tag.name}&gt;
          </code>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${status.cls}`}>
            {status.text}
          </span>
          <span className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink/60">{tag.topic}</span>
        </div>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">{tag.description}</p>
        {entry?.note && (
          <p className="mt-2 rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink/60">
            💡 {entry.note}
          </p>
        )}
      </div>

      <AttrGroup attrs={attrs} importance="essential" />
      <AttrGroup attrs={attrs} importance="common" />
      <AttrGroup attrs={attrs} importance="rare" />

      <details className="animate-rise rounded-2xl border border-ink/10 bg-surface p-5">
        <summary className="cursor-pointer font-display font-bold text-ink/80 hover:text-flame-600">
          🌐 Thuộc tính chung — dùng được trên mọi thẻ ({GLOBAL_ATTRIBUTES.length})
        </summary>
        <div className="mt-4 space-y-3">
          {GLOBAL_ATTRIBUTES.map((a) => (
            <AttrCard key={a.name} attr={a} />
          ))}
        </div>
      </details>
    </div>
  );
}
