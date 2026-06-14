import type { JsRunSpec } from "./grading/js-types";

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
    | "WRITE_JS";
  prompt: string;
  options: string[] | null;
  starterCode: string | null;
  // Câu WRITE_JS cần chạy thử: spec để client chạy trong Web Worker (không kèm đáp án).
  runSpecs?: JsRunSpec[] | null;
};

export type SessionTag = {
  tagId: string;
  track: "html" | "css" | "js";
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
};
