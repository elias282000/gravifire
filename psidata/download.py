#!/usr/bin/env python3
"""GRAVIFIRE PSI dataset downloader.

Downloads from NASA's Physical Sciences Informatics repository:
  - science set (tables, spreadsheets, documents, papers) for ALL studies
  - raw data (zips, videos, everything) for the studies listed in RAW_STUDIES

Progress: live per-file bar + overall stats. Fully resumable: files whose
size on disk matches the manifest are skipped.

Usage:
    python3 download.py                 # full run (science set + SAFFIRE raw)
    python3 download.py --science-only  # just the ~800 MB science set
    python3 download.py --study PSI-98  # single study
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

BASE = "https://psi.nasa.gov/geode-py/ws"
ROOT = os.path.dirname(os.path.abspath(__file__))
MANIFESTS = os.path.join(ROOT, "manifests")
LOG_PATH = os.path.join(ROOT, "download_log.tsv")

SCIENCE_STUDIES = ["PSI-25", "PSI-26", "PSI-98", "PSI-99"]
RAW_STUDIES = ["PSI-98", "PSI-99"]  # SAFFIRE-I and SAFFIRE-II
SCIENCE_EXTS = {".csv", ".xlsx", ".pdf", ".docx", ".pptx", ".jpg", ".rtf", ".txt", ".png"}
RAW_EXTS = {".zip", ".mp4", ".avi", ".mov", ".csv", ".xlsx", ".hdf", ".h5", ".txt", ".dat", ".jpg", ".png"}
CHUNK = 1024 * 512
BAR_WIDTH = 30


def human(n):
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if n < 1024 or unit == "TB":
            return f"{n:.1f} {unit}" if unit != "B" else f"{int(n)} B"
        n /= 1024


def manifest_files(pid):
    """Latest-state file map for a study from its version history."""
    with open(os.path.join(MANIFESTS, f"{pid}.json")) as fh:
        d = json.load(fh)
    files = {}
    for v in d["versions"]:
        for key in ("added", "changed"):
            for f in v.get(key) or []:
                files[f["s3_path"] or f["remote_path"]] = f
        for f in (v.get("removed") or []):
            files.pop(f["s3_path"] or f["remote_path"], None)
    return files


def build_plan(pid, want_raw):
    """Return ordered list of (dest_path, basename, expected_size)."""
    files = manifest_files(pid)
    plan, seen = [], set()
    for path, f in sorted(files.items()):
        name = f["file_name"] or os.path.basename(path)
        if name in seen or f.get("restricted"):
            continue
        ext = os.path.splitext(name)[1].lower()
        category = path.split("/")[2] if path.count("/") >= 2 else "misc"
        if category == "metadata" or ext in SCIENCE_EXTS or (want_raw and category == "Raw Data"):
            seen.add(name)
            dest = os.path.join(ROOT, pid, category, name)
            plan.append((dest, name, f.get("file_size") or 0))
    return plan


def get_presigned(pid, name, retries=3):
    q = urllib.parse.urlencode({"file": name, "redirect": "false"})
    url = f"{BASE}/studies/{pid}/download?{q}"
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "gravifier/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                body = r.read().decode()
            if body.startswith("http"):
                return body
            raise RuntimeError(f"no presigned URL: {body[:100]}")
        except Exception as e:
            if attempt == retries - 1:
                raise
            time.sleep(2 * (attempt + 1))


def fetch(url, dest, size, stats, retries=3):
    tmp = dest + ".part"
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "gravifier/1.0"})
            done = os.path.getsize(tmp) if os.path.exists(tmp) else 0
            if done and size and done >= size:  # .part already complete
                os.replace(tmp, dest)
                print()
                return done
            if done:
                req.add_header("Range", f"bytes={done}-")
            with urllib.request.urlopen(req, timeout=120) as r, open(tmp, "ab" if done else "wb") as fh:
                mode_append = r.status == 206
                if done and not mode_append:
                    fh.seek(0)
                    done = 0
                t0 = time.time()
                while True:
                    chunk = r.read(CHUNK)
                    if not chunk:
                        break
                    fh.write(chunk)
                    done += len(chunk)
                    stats.bytes += len(chunk)
                    dt = max(time.time() - t0, 1e-6)
                    frac = done / size if size else 1.0
                    bar = "#" * int(frac * BAR_WIDTH) + "-" * (BAR_WIDTH - int(frac * BAR_WIDTH))
                    print(f"\r    [{bar}] {human(done):>10} / {human(size) if size else '?':>10} "
                          f"{human(done / dt):>10}/s   ", end="", flush=True)
            os.replace(tmp, dest)
            print()
            return os.path.getsize(dest)
        except Exception:
            if attempt == retries - 1:
                if os.path.exists(tmp):
                    os.remove(tmp)
                raise
            time.sleep(3 * (attempt + 1))


class Stats:
    def __init__(self):
        self.bytes = 0
        self.t0 = time.time()

    def rate(self):
        dt = max(time.time() - self.t0, 1e-6)
        return self.bytes / dt


def main():
    args = sys.argv[1:]
    science_only = "--science-only" in args
    only = [a for a in args if a.startswith("PSI-")]
    studies = only or SCIENCE_STUDIES

    # Build the full plan first so overall totals are known up front.
    jobs = []  # (pid, dest, name, size)
    for pid in studies:
        want_raw = (not science_only) and pid in RAW_STUDIES
        plan = build_plan(pid, want_raw)
        sz = sum(s for _, _, s in plan)
        print(f"{pid}: {len(plan)} files ({human(sz)}){' + raw' if want_raw else ''}")
        jobs += [(pid, d, n, s) for d, n, s in plan]

    todo = [(pid, d, n, s) for pid, d, n, s in jobs
            if not (os.path.exists(d) and (s == 0 or os.path.getsize(d) == s))]
    total_bytes = sum(s for _, _, _, s in todo)
    cached = len(jobs) - len(todo)
    print(f"\nPlan: {len(jobs)} files total, {human(total_bytes)} to download"
          f" ({cached} already complete, skipped)\n")

    stats = Stats()
    ok = fail = 0
    log = open(LOG_PATH, "a")
    t_start = time.time()
    for i, (pid, dest, name, size) in enumerate(todo, 1):
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        overall_done = sum(s for _, _, _, s in todo[:i - 1]) + stats.bytes
        print(f"[{i}/{len(todo)}] {pid}/{name} ({human(size)})")
        try:
            url = get_presigned(pid, name)
            got = fetch(url, dest, size, stats)
            status = "ok" if (size == 0 or got == size) else "size-mismatch"
            log.write(f"{pid}\t{name}\t{status}\t{got}\n")
            ok += 1
        except Exception as e:
            print(f"    FAILED: {e}")
            log.write(f"{pid}\t{name}\tERROR\t{e}\n")
            fail += 1
        log.flush()
        elapsed = time.time() - t_start
        if stats.rate() > 0:
            eta = (total_bytes - overall_done) / stats.rate()
            eta_s = f"{int(eta // 60)}m{int(eta % 60):02d}s"
        else:
            eta_s = "?"
        print(f"    overall: {human(overall_done)}/{human(total_bytes)} "
              f"({100 * overall_done / total_bytes if total_bytes else 100:.1f}%) "
              f"avg {human(stats.rate())}/s  ETA {eta_s}  failed: {fail}")
    log.close()
    print(f"\nDone. {ok} downloaded, {fail} failed, log: {LOG_PATH}")


if __name__ == "__main__":
    main()
