import type { JsRunSpec } from "./grading/js-types";
import type { ReactSpec } from "./grading/react-types";

export type ClientQuestion = {
  id: string;
  tier: number;
  type:
    | "MCQ"
    | "FILL_BLANK"
    | "WRITE_TAG"
    | "FIX_BUG"
    | "WRITE_STRUCTURE"
    | "WRITE_CSS"
    | "WRITE_JS"
    | "WRITE_CMD"
    | "WRITE_JSX";
  prompt: string;
  options: string[] | null;
  starterCode: string | null;
  // Câu WRITE_JS cần chạy thử: spec để client chạy trong Web Worker (không kèm đáp án).
  runSpecs?: JsRunSpec[] | null;
  // Câu WRITE_JSX cần render/tương tác thử: spec để client chạy trong Web Worker (không kèm đáp án).
  reactSpecs?: ReactSpec[] | null;
};

export type SessionTag = {
  tagId: string;
  track: "html" | "css" | "js" | "dsa" | "git" | "react" | "project";
  name: string;
  topic: string;
  description: string;
  isNew: boolean;
  questions: ClientQuestion[];
};

export type AnswerResult = {
  correct: boolean;
  parseError?: boolean;
  results?: { passed: boolean; message: string }[];
  // Chỉ số đáp án đúng của MCQ (chế độ phản xạ tô đáp án khi sai).
  correctIndex?: number | null;
};
