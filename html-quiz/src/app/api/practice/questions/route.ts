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

  const questions = await prisma.question.findMany({
    where: { tag: { track: "html" } },
    include: { tag: { select: { name: true, description: true } } },
    orderBy: { tag: { order: "asc" } },
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
    })),
  });
}
