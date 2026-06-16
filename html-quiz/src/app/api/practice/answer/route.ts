import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { gradeCode, gradeFillBlank } from "@/lib/grading/grader";
import { gradeCss } from "@/lib/grading/grade-css";
import { gradeJs } from "@/lib/grading/grade-js";
import { gradeCmd } from "@/lib/grading/grade-cmd";
import { gradeReact } from "@/lib/grading/grade-react";
import type { Requirement } from "@/lib/grading/types";
import type { CssRequirement } from "@/lib/grading/css-types";
import type { JsRequirement, JsRunOutput } from "@/lib/grading/js-types";
import type { CmdRequirement } from "@/lib/grading/cmd-types";
import type { ReactRequirement, ReactRenderOutput } from "@/lib/grading/react-types";

// Output thô client chạy trong Web Worker gửi về (server KHÔNG tự chạy code).
const runOutputSchema = z.union([
  z.object({ value: z.union([z.string(), z.number(), z.boolean(), z.null()]) }),
  z.object({ logs: z.string() }),
  z.object({ error: z.string() }),
]);

const renderOutputSchema = z.union([
  z.object({ html: z.string() }),
  z.object({ text: z.string() }),
  z.object({ error: z.string() }),
]);

const schema = z.object({
  questionId: z.string(),
  answer: z.union([z.string(), z.number()]),
  runOutputs: z.array(runOutputSchema).optional(),
  renderOutputs: z.array(renderOutputSchema).optional(),
});

// Chấm câu hỏi cho chế độ Luyện tổng hợp. Khác /api/study/answer ở chỗ
// TIẾT LỘ đáp án đúng khi sai (practice không bắt làm lại) — vì vậy
// không dùng chung route để chế độ Học không lộ đáp án.
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  const { questionId, answer, runOutputs, renderOutputs } = parsed.data;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { tag: { select: { name: true, description: true, track: true } } },
  });
  if (!question) {
    return NextResponse.json({ error: "Không tìm thấy câu hỏi" }, { status: 404 });
  }

  let correct = false;
  let results: { passed: boolean; message: string }[] | undefined;
  let parseError = false;

  if (question.type === "MCQ") {
    correct = Number(answer) === question.correctIndex;
  } else if (question.type === "FILL_BLANK") {
    const r = gradeFillBlank(String(answer), question.answer ?? "");
    correct = r.passed;
    results = r.results;
  } else if (question.type === "WRITE_CSS") {
    const r = gradeCss(String(answer), (question.requirements as CssRequirement[]) ?? []);
    correct = r.passed;
    results = r.results;
    parseError = r.parseError ?? false;
  } else if (question.type === "WRITE_JS") {
    // Phần tĩnh chấm tại server; phần "chạy thật" so với runOutputs client gửi
    // (đã chạy trong Web Worker) — server KHÔNG bao giờ tự eval code người học.
    const r = gradeJs(
      String(answer),
      (question.requirements as JsRequirement[]) ?? [],
      runOutputs as JsRunOutput[] | undefined
    );
    correct = r.passed;
    results = r.results;
  } else if (question.type === "WRITE_CMD") {
    // Gõ lệnh Git/CLI hoặc nội dung file — chấm tĩnh bằng so chuỗi con, KHÔNG chạy gì.
    const r = gradeCmd(String(answer), (question.requirements as CmdRequirement[]) ?? []);
    correct = r.passed;
    results = r.results;
    parseError = r.parseError ?? false;
  } else if (question.type === "WRITE_JSX") {
    // Phần tĩnh chấm tại server; phần render so với renderOutputs client gửi về.
    const r = gradeReact(
      String(answer),
      (question.requirements as ReactRequirement[]) ?? [],
      renderOutputs as ReactRenderOutput[] | undefined
    );
    correct = r.passed;
    results = r.results;
  } else {
    const r = gradeCode(String(answer), (question.requirements as Requirement[]) ?? []);
    correct = r.passed;
    results = r.results;
    parseError = r.parseError ?? false;
  }

  await prisma.attempt.create({
    data: {
      userId: session.user.id,
      questionId,
      answerText: String(answer),
      isCorrect: correct,
      detail: results ?? undefined,
    },
  });

  return NextResponse.json({
    correct,
    results,
    parseError,
    correctIndex: question.type === "MCQ" ? question.correctIndex : null,
    correctAnswer: question.type === "FILL_BLANK" ? question.answer : null,
    tagName: question.tag.name,
    tagDescription: question.tag.description,
    track: question.tag.track,
  });
}
