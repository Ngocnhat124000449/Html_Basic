"""PHA 2 — Bước 2/3: tối ưu 21 trọng số FSRS-6 cho từng người (offline).

Đọc các CSV do export-revlog.ts tạo (tmp/revlog/<userId>.csv với cột
card_id, review_time[epoch ms], review_rating[1-4], review_state) → chạy
fsrs-optimizer → ghi tmp/revlog/<userId>.params.json = {"userId":..., "w":[21 số]}.

Chạy (trong venv đã pip install -r scripts/requirements.txt):
    python scripts/optimize_fsrs.py

LƯU Ý: script này CÔ LẬP với app Next.js (chỉ chạy thủ công khi đã có dữ liệu
>= ngưỡng). Viết cho fsrs-optimizer==6.5.0 — bản này đọc revlog từ "./revlog.csv"
trong THƯ MỤC HIỆN TẠI, nên với mỗi user ta chép CSV của họ thành ./revlog.csv
rồi chạy. Sau train, trọng số nằm ở opt.w (list). HỢP ĐỒNG ĐẦU RA (params.json
21 số) giữ nguyên để import-fsrs-params.ts dùng.
"""

import json
import os
import shutil
import sys
from glob import glob
from pathlib import Path

from fsrs_optimizer import Optimizer  # type: ignore

OUT_DIR = Path(__file__).resolve().parent.parent / "tmp" / "revlog"
EXPECTED_W = 21


def optimize_one(csv_path: Path) -> list[float]:
    # fsrs-optimizer 6.5.0 đọc cố định "./revlog.csv" ở CWD.
    shutil.copyfile(csv_path, OUT_DIR / "revlog.csv")
    opt = Optimizer()
    opt.create_time_series(
        timezone="UTC",
        revlog_start_date="2006-01-01",
        next_day_starts_at=4,
        analysis=False,
    )
    opt.define_model()
    opt.pretrain(verbose=False)
    opt.train(verbose=False)
    return [float(x) for x in opt.w]


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    os.chdir(OUT_DIR)  # để create_time_series tìm thấy ./revlog.csv
    csvs = sorted(
        p for p in glob(str(OUT_DIR / "*.csv")) if Path(p).name != "revlog.csv"
    )
    if not csvs:
        print("Không có CSV nào trong tmp/revlog — chạy export-revlog.ts trước.")
        return
    for csv in csvs:
        path = Path(csv)
        user_id = path.stem
        try:
            w = optimize_one(path)
        except Exception as e:  # noqa: BLE001 — log rồi bỏ qua user lỗi
            print(f"✗ {user_id[:8]} — lỗi tối ưu: {e}", file=sys.stderr)
            continue
        if len(w) != EXPECTED_W or not all(isinstance(x, float) and x == x for x in w):
            print(
                f"✗ {user_id[:8]} — tham số không hợp lệ (cần {EXPECTED_W} số hữu hạn, nhận {len(w)})",
                file=sys.stderr,
            )
            continue
        (OUT_DIR / f"{user_id}.params.json").write_text(json.dumps({"userId": user_id, "w": w}))
        print(f"✓ {user_id[:8]} — đã ghi {user_id}.params.json")
    # Dọn revlog.csv tạm.
    tmp = OUT_DIR / "revlog.csv"
    if tmp.exists():
        tmp.unlink()
    print("\nXong. Bước kế: npx tsx scripts/import-fsrs-params.ts")


if __name__ == "__main__":
    main()
