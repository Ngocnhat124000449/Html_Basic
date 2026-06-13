import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Trả toàn bộ ngân hàng câu hỏi ở dạng an toàn cho chế độ Luyện tổng hợp.
// Tuyệt đối không gửi correctIndex / answer / requirements — chấm ở /api/practice/answer.
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  // Cả hai track — client lọc theo phạm vi người dùng chọn (HTML / CSS / tất cả)
  const questions = await prisma.question.findMany({
    include: { tag: { select: { name: true, description: true, track: true } } },
    orderBy: [{ tag: { track: "asc" } }, { tag: { order: "asc" } }],
  });

  return NextResponse.json({
    questions: questions.map((q) => ({
      id: q.id,
      type: q.type,
      prompt: q.prompt,
      options: (q.options as string[] | null) ?? null,
      starterCode: q.starterCode,
      tagName: q.tag.name,
      tagDescription: q.tag.description,
      track: q.tag.track,
    })),
  });
}
