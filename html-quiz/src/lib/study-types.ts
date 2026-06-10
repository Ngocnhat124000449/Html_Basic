export type ClientQuestion = {
  id: string;
  tier: number;
  type: "MCQ" | "FILL_BLANK" | "WRITE_TAG" | "FIX_BUG" | "WRITE_STRUCTURE";
  prompt: string;
  options: string[] | null;
  starterCode: string | null;
};

export type SessionTag = {
  tagId: string;
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
