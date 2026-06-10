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

  const [totalTags, progress, newToday] = await Promise.all([
    prisma.tag.count(),
    prisma.userTagProgress.findMany({ where: { userId } }),
    prisma.userTagProgress.count({ where: { userId, createdAt: { gte: startOfDay } } }),
  ]);

  const mastered = progress.filter((p) => p.mastered).length;
  const due = progress.filter((p) => p.dueAt <= now).length;
  const unseen = totalTags - progress.length;
  const newAvailable = Math.min(Math.max(0, 5 - newToday), unseen);
  const todayCount = due + newAvailable;

  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl font-bold">Xin chào, {session.user.name} 👋</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-amber-600">{due}</p>
          <p className="text-sm text-slate-500">Thẻ đến hạn</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-blue-600">{newAvailable}</p>
          <p className="text-sm text-slate-500">Thẻ mới hôm nay</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-green-600">
            {mastered}/{totalTags}
          </p>
          <p className="text-sm text-slate-500">Đã nắm vững</p>
        </div>
      </div>

      {todayCount > 0 ? (
        <Link
          href="/study"
          className="block rounded-xl bg-blue-600 py-4 text-center text-lg font-semibold text-white hover:bg-blue-700"
        >
          Học ngay ({todayCount} thẻ)
        </Link>
      ) : (
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
          <p className="text-lg">Hôm nay xong rồi 🎉</p>
          <p className="text-sm text-slate-500">Quay lại vào ngày mai nhé.</p>
        </div>
      )}

      <Link href="/tags" className="block text-center text-sm text-blue-600 hover:underline">
        Xem tất cả thẻ →
      </Link>
    </div>
  );
}
