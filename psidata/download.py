#!/usr/bin/env python3
"""GRAVIFIRE PSI dataset downloader (v2 — uses the website's own download API).

How this works (reverse-engineered from psi.nasa.gov):
  1. POST /geode-py/ws/files/v2  -> full file tree for a study version,
     including each file's internal id and per-file version.
  2. GET  /geode-py/ws/studies/{pid}/download?file={id}&version={file_version}
     &studyVersion={study_version}&redirect=false  -> S3 presigned URL.
  3. GET presigned URL -> file bytes.

Downloads:
  - science set (tables, docs, papers, metadata) for ALL studies
  - raw data (videos, zip archives) for RAW_STUDIES (SAFFIRE-I & II)

Progress: one overall bar (bytes, rate, ETA) + per-file done/FAIL lines.
Resumable: completed files (size matches) are skipped; partial downloads
resume via HTTP Range. Re-run any time to continue where it left off.

Usage:
    python3 download.py                  # full run: science set (all) + raw (SAFFIRE I/II)
    python3 download.py --science-only   # just the small science set (~0.1 GB)
    python3 download.py --study PSI-98   # single study
    python3 download.py --jobs=6         # more parallel downloads (default 4)

A few NASA-side dead links exist (see dead_files.txt); they fail fast and are
logged to download_log.tsv — nothing can be done about those server-side.
"""
import json
import os
import sys
import threading
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE = "https://psi.nasa.gov/geode-py/ws"
ROOT = os.path.dirname(os.path.abspath(__file__))
LOG_PATH = os.path.join(ROOT, "download_log.tsv")
UA = {"User-Agent": "gravifier/1.0"}

SCIENCE_STUDIES = ["PSI-25", "PSI-26", "PSI-98", "PSI-99"]
RAW_STUDIES = {"PSI-98", "PSI-99"}  # SAFFIRE-I and SAFFIRE-II
STUDY_VERSION = {"PSI-25": 4, "PSI-26": 4, "PSI-98": 4, "PSI-99": 5}
RAW_CATEGORY = "Raw Data"
CHUNK = 1024 * 512
BAR_WIDTH = 30


def human(n):
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if n < 1024 or unit == "TB":
            return f"{n:.1f} {unit}" if unit != "B" else f"{int(n)} B"
        n /= 1024


def http_json(url, body=None, retries=3):
    for attempt in range(retries):
        try:
            data = json.dumps(body).encode() if body is not None else None
            headers = dict(UA)
            if data:
                headers["Content-Type"] = "application/json"
            req = urllib.request.Request(url, data=data, headers=headers)
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.loads(r.read())
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(2 * (attempt + 1))


def get_tree(pid):
    sv = STUDY_VERSION[pid]
    d = http_json(f"{BASE}/files/v2", {
        "folder": "", "fileType": "study",
        "studyId": pid, "version": sv, "obfuscationcode": None,
    })
    leaves = []

    def walk(nodes, path):
        for n in nodes:
            key = n.get("key") or ""
            kids = n.get("files") or []
            name = str(n.get("displayName") or "") or (key.rstrip("/").split("/")[-1] if key else "")
            if kids:
                walk(kids, path + [name])
            elif name and n.get("id"):
                cat = key.split("/")[2] if key.count("/") >= 2 else "misc"
                leaves.append({
                    "name": name, "category": cat, "key": key,
                    "id": n.get("id"), "version": n.get("version") or 1,
                    "size": n.get("bytes_size") or 0,
                    "restricted": bool(n.get("restricted")),
                })

    walk(d.get("files") or [], [])
    return leaves, sv


def build_plan(pid, want_raw):
    files, sv = get_tree(pid)
    plan = []
    for f in files:
        if f["restricted"] or not f["id"]:
            continue
        if f["category"] == RAW_CATEGORY:
            science_ext = f["name"].lower().endswith((".csv", ".xlsx", ".jpg", ".png", ".txt"))
            if not (want_raw or science_ext):
                continue
        dest = os.path.join(ROOT, pid, f["category"], f["name"])
        plan.append((dest, f, sv))
    return plan


def presign(pid, f, sv, retries=3):
    q = urllib.parse.urlencode({
        "file": f["id"], "version": f["version"],
        "studyVersion": sv, "redirect": "false",
    })
    body = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(f"{BASE}/studies/{pid}/download?{q}", headers=UA)
            with urllib.request.urlopen(req, timeout=60) as r:
                body = r.read().decode()
            if body.startswith("http"):
                return body
            raise RuntimeError(f"no presigned URL: {body[:100]}")
        except Exception:
            if attempt == retries - 1:
                raise RuntimeError(f"presign failed: {body or 'request error'}")
            time.sleep(2 * (attempt + 1))


def fetch(url, dest, size, on_bytes, retries=3, progress=False):
    """Stream one file to dest; calls on_bytes(n) for every chunk read."""
    tmp = dest + ".part"
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            done = os.path.getsize(tmp) if os.path.exists(tmp) else 0
            if done and size and done >= size:  # .part already complete
                os.replace(tmp, dest)
                return done
            if done:
                req.add_header("Range", f"bytes={done}-")
            with urllib.request.urlopen(req, timeout=180) as r, open(tmp, "ab" if done else "wb") as fh:
                if done and r.status != 206:  # server ignored Range; restart
                    fh.seek(0)
                    done = 0
                t0 = time.time()
                while True:
                    chunk = r.read(CHUNK)
                    if not chunk:
                        break
                    fh.write(chunk)
                    done += len(chunk)
                    on_bytes(len(chunk))
                    if progress:
                        frac = done / size if size else 1.0
                        filled = int(frac * BAR_WIDTH)
                        bar = "#" * filled + "-" * (BAR_WIDTH - filled)
                        rate = done / max(time.time() - t0, 1e-6)
                        print(f"\r    [{bar}] {human(done):>10} / {human(size) if size else '?':>10}"
                              f" {human(rate):>10}/s   ", end="", flush=True)
            os.replace(tmp, dest)
            return os.path.getsize(dest)
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(3 * (attempt + 1))


def main():
    args = sys.argv[1:]
    science_only = "--science-only" in args
    jobs_arg = [a for a in args if a.startswith("--jobs")]
    n_workers = int(jobs_arg[0].split("=")[1]) if jobs_arg and "=" in jobs_arg[0] else 4
    only = [a for a in args if a.startswith("PSI-")]
    studies = only or SCIENCE_STUDIES

    jobs = []  # (pid, dest, file, study_version)
    for pid in studies:
        want_raw = (not science_only) and pid in RAW_STUDIES
        plan = build_plan(pid, want_raw)
        sz = sum(f["size"] for _, f, _ in plan)
        n_raw = sum(1 for _, f, _ in plan if f["category"] == RAW_CATEGORY)
        print(f"{pid}: {len(plan)} files ({human(sz)}) — {n_raw} raw data files")
        jobs += [(pid, d, f, sv) for d, f, sv in plan]

    todo = [j for j in jobs
            if not (os.path.exists(j[1]) and (j[2]["size"] == 0 or os.path.getsize(j[1]) == j[2]["size"]))]
    total_bytes = sum(j[2]["size"] for j in todo)
    cached = len(jobs) - len(todo)
    print(f"\nPlan: {len(jobs)} files total, {human(total_bytes)} to download"
          f" ({cached} already complete, skipped), {n_workers} parallel downloads\n")

    lock = threading.Lock()
    state = {"bytes": 0, "accounted": 0, "done_files": 0, "ok": 0, "fail": 0}
    t_start = time.time()

    def draw_overall():
        rate = state["bytes"] / max(time.time() - t_start, 1e-6)
        remaining = total_bytes - state["accounted"]
        eta = remaining / rate if rate > 0 and remaining > 0 else 0
        frac = state["accounted"] / total_bytes if total_bytes else 1.0
        filled = int(frac * BAR_WIDTH)
        bar = "#" * filled + "-" * (BAR_WIDTH - filled)
        sys.stdout.write(
            f"\r[{bar}] {human(state['bytes']):>10}/{human(total_bytes):>10}"
            f" {100 * frac:5.1f}%  {human(rate):>9}/s  ETA {int(eta // 60)}m{int(eta % 60):02d}s"
            f"  ok {state['ok']}  failed {state['fail']}  ")
        sys.stdout.flush()

    def on_bytes(n):
        with lock:
            state["bytes"] += n
            draw_overall()

    log = open(LOG_PATH, "a")

    def work(job):
        i, (pid, dest, f, sv) = job
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        try:
            url = presign(pid, f, sv)
            got = fetch(url, dest, f["size"], on_bytes,
                        progress=(n_workers == 1 and len(todo) > 0))
            status = "ok" if (f["size"] == 0 or got == f["size"]) else "size-mismatch"
            with lock:
                log.write(f"{pid}\t{f['name']}\t{status}\t{got}\n")
                state["ok"] += 1
                state["accounted"] += f["size"]
                state["done_files"] += 1
                sys.stdout.write(f"\n  done [{state['done_files']}/{len(todo)}] "
                                 f"{pid}/{f['category']}/{f['name']} ({human(f['size'])})")
                draw_overall()
        except Exception as e:
            with lock:
                log.write(f"{pid}\t{f['name']}\tERROR\t{e}\n")
                state["fail"] += 1
                state["accounted"] += f["size"]
                state["done_files"] += 1
                sys.stdout.write(f"\n  FAIL [{state['done_files']}/{len(todo)}] "
                                 f"{pid}/{f['category']}/{f['name']} — {e}")
                draw_overall()

    with ThreadPoolExecutor(max_workers=n_workers) as pool:
        list(pool.map(work, list(enumerate(todo))))
    log.close()
    print(f"\n\nDone. {state['ok']} downloaded, {state['fail']} failed. Log: {LOG_PATH}")


if __name__ == "__main__":
    main()
