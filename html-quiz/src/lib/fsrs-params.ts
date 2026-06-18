// FSRS-6 dùng đúng 21 trọng số. Dùng để validate tham số tối ưu (Pha 2) trước khi
// lưu/áp — phòng dữ liệu hỏng làm lịch ôn sai.
export const FSRS_PARAM_COUNT = 21;

export function isValidFsrsParams(w: unknown): w is number[] {
  return (
    Array.isArray(w) &&
    w.length === FSRS_PARAM_COUNT &&
    w.every((x) => typeof x === "number" && Number.isFinite(x))
  );
}
