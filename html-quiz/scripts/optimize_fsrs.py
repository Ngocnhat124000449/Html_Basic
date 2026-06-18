"""PHA 2 — Bước 2/3: tối ưu 21 trọng số FSRS-6 cho từng người (offline).

Đọc các CSV do export-revlog.ts tạo (tmp/revlog/<userId>.csv với cột
card_id, review_time[epoch ms], review_rating[1-4], review_state) → chạy
fsrs-optimizer → ghi tmp/revlog/<userId>.params.json = {"userId":..., "w":[21 số]}.

Chạy (trong venv đã pip install -r scripts/requirements.txt):
    python scripts/optimize_fsrs.py

LƯU Ý: script này CÔ LẬP với app Next.js (chỉ chạy thủ công khi đã có dữ liệu
>= ngưỡng). Viết cho fsrs-optimizer>=5; nếu API bản cài khác, chỉ cần chỉnh khối
"chạy optimizer" cho khớp — HỢP ĐỒNG ĐẦU RA (params.json 21 số) giữ nguyên để
import-fsrs-params.ts dùng. Output phải đúng 21 trọng số (FSRS-6).
"""

import json
import sys
from glob import glob
from pathlib import Path

import pandas as pd
from fsrs_optimizer import Optimizer  # type: ignore

OUT_DIR = Path(__file__).resolve().parent.parent / "tmp" / "revlog"
EXPECTED_W = 21


def optimize_csv(csv_path: Path) -> list[float]:
    """Tối ưu một file revlog → trả về danh sách 21 trọng số."""
    df = pd.read_csv(csv_path)
    # epoch ms → datetime (fsrs-optimizer dùng cột review_time dạng thời gian).
    df["review_time"] = pd.to_datetime(df["review_time"], unit="ms", utc=True)

    opt = Optimizer()
    opt.df_revlog = df  # nạp trực tiếp revlog đã chuẩn hóa
    opt.create_time_series(
        timezone="UTC",
        revlog_start_date="2000-01-01",
        next_day_starting_hour=4,
        filter_out_suspended_cards=False,
    )
    opt.define_model()
    opt.pretrain(verbose=False)
    opt.train(verbose=False)
    return [float(x) for x in opt.w]


def main() -> None:
    csvs = sorted(p for p in glob(str(OUT_DIR / "*.csv")))
    if not csvs:
        print("Không có CSV nào trong tmp/revlog — chạy export-revlog.ts trước.")
        return
    for csv in csvs:
        path = Path(csv)
        user_id = path.stem
        try:
            w = optimize_csv(path)
        except Exception as e:  # noqa: BLE001 — log rồi bỏ qua user lỗi
            print(f"✗ {user_id[:8]} — lỗi tối ưu: {e}", file=sys.stderr)
            continue
        if len(w) != EXPECTED_W or not all(isinstance(x, float) and x == x for x in w):
            print(f"✗ {user_id[:8]} — tham số không hợp lệ (cần {EXPECTED_W} số hữu hạn)", file=sys.stderr)
            continue
        out = OUT_DIR / f"{user_id}.params.json"
        out.write_text(json.dumps({"userId": user_id, "w": w}))
        print(f"✓ {user_id[:8]} — đã ghi {out.name}")
    print("\nXong. Bước kế: npx tsx scripts/import-fsrs-params.ts")


if __name__ == "__main__":
    main()
