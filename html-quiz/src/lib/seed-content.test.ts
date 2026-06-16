import { describe, expect, it } from "vitest";
import { tags } from "../../prisma/seed";

// Giá trị CHUẨN của HTML = kiến thức được kiểm tra, không cần hiện trong đề.
// Giá trị TÙY Ý (email mẫu, tên file, chuỗi chữ...) bắt buộc hiện nguyên văn
// trong prompt/starterCode — người học không phải đoán chuỗi.
const STANDARD_VALUES = new Set(["_blank", "get", "post", "utf-8", "stylesheet", "lazy"]);

type Req = { type: string; value?: string | number; name?: string };

describe("nội dung seed", () => {
  it("đề câu gõ code tự chứa mọi giá trị tùy ý mà bộ chấm yêu cầu", () => {
    const violations: string[] = [];
    for (const t of tags) {
      for (const q of t.questions) {
        if (!q.requirements) continue;
        const context = `${q.prompt} ${q.starterCode ?? ""}`.toLowerCase();
        for (const r of q.requirements as Req[]) {
          if ((r.type === "attr" || r.type === "text") && r.value !== undefined) {
            const v = String(r.value).toLowerCase();
            if (!STANDARD_VALUES.has(v) && !context.includes(v)) {
              violations.push(`<${t.name}> thiếu "${r.value}" trong đề: ${q.prompt.slice(0, 60)}`);
            }
          }
        }
      }
    }
    expect(violations, violations.join("\n")).toEqual([]);
  });

  it("mỗi thẻ có ≥3 biến thể bậc 1, ≥3 biến thể bậc 2, 1 câu bậc 3", () => {
    for (const t of tags) {
      const byTier: Record<number, number> = {};
      for (const q of t.questions) byTier[q.tier] = (byTier[q.tier] ?? 0) + 1;
      expect(byTier[1], `<${t.name}> bậc 1`).toBeGreaterThanOrEqual(3);
      expect(byTier[2], `<${t.name}> bậc 2`).toBeGreaterThanOrEqual(3);
      expect(byTier[3], `<${t.name}> bậc 3`).toBe(1);
    }
  });

  it("không có hai câu trùng prompt trong cùng thẻ + bậc (seed sẽ gộp mất)", () => {
    for (const t of tags) {
      const keys = t.questions.map((q) => `${q.tier}|${q.prompt}`);
      expect(new Set(keys).size, `<${t.name}> có prompt trùng`).toBe(keys.length);
    }
  });

  it("câu MCQ có đúng 4 lựa chọn và correctIndex hợp lệ", () => {
    for (const t of tags) {
      for (const q of t.questions) {
        if (q.type === "MCQ") {
          expect(q.options?.length, `<${t.name}> ${q.prompt.slice(0, 40)}`).toBe(4);
          expect(q.correctIndex, `<${t.name}> correctIndex`).toBeGreaterThanOrEqual(0);
          expect(q.correctIndex, `<${t.name}> correctIndex`).toBeLessThan(4);
        }
      }
    }
  });
});
