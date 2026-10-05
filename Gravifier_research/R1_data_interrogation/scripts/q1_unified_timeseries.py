#!/usr/bin/env python
"""R1-Q1: parse 9 PSI-99 sensor workbooks + PSI-98 Sample-2 TM workbook +
PSI-99 telemetry into ONE time-series schema.

Join is name-based (PSI-98 column order differs; spacers unlabeled).
Output per source: outputs/q1_<id>.csv.gz + one combined stats table
outputs/q1_schema_stats.csv.

No silent fixes: broken/absent epochs are recorded, not repaired here.
"""
import json
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path("/home/elias/Codes/NSAC/psidata")
OUT = Path("/home/elias/Codes/NSAC/Gravifier_research/R1_data_interrogation/outputs")
OUT.mkdir(parents=True, exist_ok=True)

# canonical schema: the 65 shared channels (PSI-99 = reference order)
CANON = [
    "Elapsed Time (s)", "Epoch Time", "Timestamp (ms)", "Index",
    "Average Fan Speed", "CO2", "O2", "Anemometer 1", "Anemometer 2",
    "Ambient Pressure", "Radiometer 1", "Radiometer 2", "Radiometer 3",
    "Radiometer 4", "Humidity", "Test Section Inlet Temp",
    "Plume Temp 1 (TC1)", "Plume Temp 2 (TC2)", "Plume Temp 3 (TC3)",
    "Plume Temp 4 (TC4)", "Plume Temp 5 (TC5)", "Plume Temp 6 (TC6)",
    "Sample Temp 1 (TC7)", "Sample Temp 2 (TC8)", "Sample Temp 3 (TC9)",
    "Sample Temp 4 (TC10)", "Sample Temp 5 (TC11)", "Sample Temp 6 (TC12)",
    "Radiometer Temp 1", "Radiometer Temp 2", "Radiometer Temp 3",
    "Radiometer Temp 4", "Igniter Current", "Igniter Voltage",
    "Avionics H&S Temp 1", "Avionics H&S Temp 2", "Avionics H&S Temp 3",
    "Avionics 24V", "PC104 5V", "PC104 -12V", "PC104 +12V",
    "Igniter Voltage Set Point", "Fan Speed Control", "Igniter Power Enable",
    "Igniter Select 1", "Igniter Select 2", "Igniter Select 3",
    "Igniter Select 4", "Igniter Select 5", "Igniter Select 6",
    "Igniter Select 7", "Igniter Select 8", "Igniter Select 9",
    "Smoke Wire Select", "LED Power 1", "Camera 1 Trigger",
    "Camera 2 Trigger", "GSE DIO0", "GSE DIO1", "Camera 1 Power Control",
    "Camera 2 Power Control", "Anemometer Power Control 1&2",
    "O2 & CO2 Power Control", "Test Section Fan Power Control", "Fan Tach /100",
]
EXTRAS_P98 = ["Downstream Front", "Upstream Front", "Upstream Back", "Downstream Back"]

SOURCES = [
    *(ROOT / "PSI-99/Raw Data" / f"PSI-99_Raw Data_Saffire Sensor Data Sample {n}.xlsx" for n in range(1, 10)),
    ROOT / "PSI-98/Raw Data/PSI-98_Raw Data_Saffire-I Sample 2 Sensor Data Complete TM graphs.xlsx",
]
TELEMETRY = ROOT / "PSI-99/Raw Data/PSI-99_Raw Data_Saffire-II Telemetry Data.xlsx"

MEAS = ["Average Fan Speed", "CO2", "O2", "Anemometer 1", "Anemometer 2",
        "Ambient Pressure", "Radiometer 1", "Radiometer 2", "Radiometer 3",
        "Radiometer 4", "Humidity", "Test Section Inlet Temp"]


def load_calibrated(path):
    df = pd.read_excel(path, sheet_name="Calibrated Data", header=0)
    df.columns = [str(c).strip() for c in df.columns]
    # first data row holds units -> drop it (units recorded in manifest)
    units = {c: str(v).strip() for c, v in df.iloc[0].items() if str(v).strip() not in ("nan", "")}
    df = df.iloc[1:].reset_index(drop=True)
    # drop unnamed spacer columns (PSI-98)
    spacers = [c for c in df.columns if c.startswith("Unnamed")]
    df = df.drop(columns=spacers)
    for c in df.columns:
        df[c] = pd.to_numeric(df[c], errors="coerce")
    return df, units, len(spacers)


def ts_stats(df, source_id, epoch_col="Epoch Time", elapsed_col="Elapsed Time (s)"):
    ep = pd.to_numeric(df[epoch_col], errors="coerce")
    el = pd.to_numeric(df[elapsed_col], errors="coerce")
    ok = ep.notna() & el.notna()
    ep_ok, el_ok = ep[ok], el[ok]
    dt_ms = np.diff(ep_ok.to_numpy()) if len(ep_ok) > 1 else np.array([])
    # epoch vs elapsed consistency
    drift = np.abs((ep_ok - ep_ok.iloc[0]).to_numpy() - el_ok.to_numpy() * 1000.0)
    big_gaps = int((dt_ms > 3 * np.median(dt_ms)).sum()) if len(dt_ms) else 0
    stats = {
        "source": source_id,
        "rows": int(len(df)),
        "t0_epoch_ms": float(ep_ok.iloc[0]) if len(ep_ok) else np.nan,
        "t_end_epoch_ms": float(ep_ok.iloc[-1]) if len(ep_ok) else np.nan,
        "duration_s": float(el_ok.iloc[-1] - el_ok.iloc[0]) if len(el_ok) else np.nan,
        "median_dt_ms": float(np.median(dt_ms)) if len(dt_ms) else np.nan,
        "nominal_hz": round(1000.0 / float(np.median(dt_ms)), 1) if len(dt_ms) else np.nan,
        "big_gaps": big_gaps,
        "max_epoch_elapsed_drift_ms": float(drift.max()) if len(drift) else np.nan,
        "epoch_missing": int((~ep.notna()).sum()),
        "cols": int(len(df.columns)),
    }
    return stats


def main():
    all_stats = []
    manifests = {}
    for path in SOURCES:
        sid = "P99-S" + path.name.split("Sample ")[-1].split(".")[0] if "PSI-99" in str(path) else "P98-S2"
        out = OUT / f"q1_{sid}.csv.gz"
        if out.exists():
            print(f"{sid}: cached, skip")
            continue
        df, units, n_spacers = load_calibrated(path)
        missing = [c for c in CANON if c not in df.columns]
        extra = [c for c in df.columns if c not in CANON]
        stats = ts_stats(df, sid)
        stats["missing_canon"] = len(missing)
        stats["extra_channels"] = "|".join(extra)
        stats["spacer_cols_dropped"] = n_spacers
        nan_rates = {c: round(float(df[c].isna().mean()), 4) for c in MEAS}
        stats["worst_meas_nan"] = max(nan_rates.values())
        stats["nan_worst_channel"] = max(nan_rates, key=nan_rates.get)
        all_stats.append(stats)
        manifests[sid] = {"file": path.name, "units": units,
                          "missing_canon": missing, "extra": extra}
        df.to_csv(OUT / f"q1_{sid}.csv.gz", index=False, compression="gzip")
        print(f"{sid}: {stats['rows']} rows, {stats['cols']} ch, "
              f"{stats['nominal_hz']} Hz, {stats['duration_s']:.0f} s, "
              f"drift {stats['max_epoch_elapsed_drift_ms']:.1f} ms, "
              f"missing_canon={stats['missing_canon']}, extra={len(extra)}")

    # PSI-99 telemetry: SaffireData sheet (good epochs; SaffireTimestamp = epoch ms)
    tml = pd.read_excel(TELEMETRY, sheet_name="SaffireData", header=0)
    tml.columns = [str(c).strip() for c in tml.columns]
    for c in tml.columns:
        tml[c] = pd.to_numeric(tml[c], errors="coerce")
    st = ts_stats(tml, "P99-TELEM-SaffireData",
                  epoch_col="SaffireTimestamp", elapsed_col="Relative Time (s)")
    st["missing_canon"], st["extra_channels"] = 0, "telemetry-specific"
    all_stats.append(st)
    tml.to_csv(OUT / "q1_P99_TELEM_SaffireData.csv.gz", index=False, compression="gzip")
    print(f"P99-TELEM-SaffireData: {st['rows']} rows, {st['nominal_hz']} Hz, "
          f"{st['duration_s']:.0f} s, drift {st['max_epoch_elapsed_drift_ms']:.1f} ms")

    raw = pd.read_excel(TELEMETRY, sheet_name="RawData", header=0)
    raw.columns = [str(c).strip() for c in raw.columns]
    bad = pd.to_numeric(raw["CygnusTimestamp"], errors="coerce")
    sane = ((bad > 1.4e12)).mean()
    print(f"P99-TELEM-RawData: {len(raw)} rows; CygnusTimestamp year-sane fraction: {sane:.3f}")

    stats_df = pd.DataFrame(all_stats)
    stats_df.to_csv(OUT / "q1_schema_stats.csv", index=False)
    (OUT / "q1_channel_manifests.json").write_text(json.dumps(manifests, indent=1))
    print(f"\nwrote {OUT}/q1_schema_stats.csv + {len(manifests)} per-source csv.gz + manifests")


if __name__ == "__main__":
    main()
