export type Requirement =
  | { type: "tagName"; value: string }
  | { type: "attr"; name: string; value?: string }
  | { type: "contains"; parent: string; child: string; count?: number }
  | { type: "text"; tag: string; index: number; value: string };

export type RequirementResult = {
  passed: boolean;
  message: string;
};

export type GradeResult = {
  passed: boolean;
  results: RequirementResult[];
  parseError?: boolean;
};
