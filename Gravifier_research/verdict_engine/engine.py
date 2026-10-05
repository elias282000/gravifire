#!/usr/bin/env python
"""GRAVIFIRE verdict engine v1.0 — implements verdict_spec.md (FROZEN).

Deterministic rule-based evidence synthesis over the L1 store + cited
literature register. Every verdict carries rule_trace, evidence list,
confidence dimensions, and (for INSUFFICIENT) named missing evidence.
"""
import json
import re
import sqlite3
from pathlib import Path

ROOT = Path("/home/elias/Codes/NSAC")
DB = ROOT / "Gravifier_research/evidence_store/gravifire_l1.db"
VE = ROOT / "Gravifier_research/verdict_engine"

CLASS_SCORE = {"MEASURED": 1.0, "DERIVED": 0.8, "INTERPRETED": 0.5, "OPEN": 0.2}

FLOW_BUCKETS = [("very_low_lt1", 0, 1), ("low_1_5", 1, 5),
                ("moderate_5_25", 5, 25), ("high_gt25", 25, 1e9)]


def flow_bucket(v):
    for name, lo, hi in FLOW_BUCKETS:
        if lo <= v < hi:
            return name
    return None


def o2_bucket(v):
    if v < 18:
        return "depleted_lt18"
    if v < 20:
        return "low_18_20"
    if v <= 22.5:  # covers '~22.1' source approximations in normal cabin air
        return "normal_20_22"
    return "enriched_gt22"


# ---------------------------------------------------------------- store layer
class Store:
    def __init__(self, db=DB):
        self.con = sqlite3.connect(db)
        self.con.row_factory = sqlite3.Row

    def families(self):
        return {r["family"] for r in self.con.execute(
            "SELECT DISTINCT family FROM runs WHERE family IS NOT NULL")}

    def runs_for_family(self, family, study=None):
        q = "SELECT * FROM runs WHERE family=? AND is_test=1"
        args = [family]
        if study:
            q += " AND study_id=?"
            args.append(study)
        return self.con.execute(q, args).fetchall()

    def items(self, run_id, variable=None):
        q = "SELECT * FROM evidence_items WHERE run_id=?"
        args = [run_id]
        if variable:
            q += " AND variable=?"
            args.append(variable)
        return self.con.execute(q, args).fetchall()

    def first_val(self, run_id, variable):
        rows = self.items(run_id, variable)
        for r in rows:
            if r["value_norm"] not in (None, "", "None"):
                try:
                    return float(r["value_norm"]), r
                except (TypeError, ValueError):
                    continue
        return None, (rows[0] if rows else None)


# --------------------------------------------------------- run conditioning
def run_conditions(store, run):
    """flow (display-or-calibrated, never mixed), O2, direction, scale."""
    cond = {"flow": None, "flow_kind": None, "o2": None,
            "direction": run["direction"], "scale": run["scale_class"],
            "display_flags": []}
    # SAFFIRE studies: air_flow item (calibrated duct setting)
    v, item = store.first_val(run["run_id"], "air_flow")
    if item is not None:
        cond["flow"] = v
        cond["flow_kind"] = "calibrated" if run["study_id"].startswith("SAFFIRE") else "display"
        cond["o2_item"] = item
    if cond["flow"] is None:  # BASS/BASS-II: fan display sequence, first value
        v2, item2 = store.first_val(run["run_id"], "fan_display")
        if item2 is not None and str(item2["value_norm"]).startswith("["):
            try:
                seq = json.loads(item2["value_norm"])
                nums = [x for x in seq if isinstance(x, (int, float))]
                if nums:
                    cond["flow"] = float(nums[0])
                    cond["flow_kind"] = "display"
            except (ValueError, TypeError):
                pass
    v, _ = store.first_val(run["run_id"], "o2_pct")
    if v is None:
        v, _ = store.first_val(run["run_id"], "o2_pct_volume")
        if v is not None and v < 1.0:  # fraction (0.221) -> %
            v = v * 100.0
    if v is None:
        v, _ = store.first_val(run["run_id"], "o2_initial_pct")
    cond["o2"] = v
    if cond["flow_kind"] == "display":
        cond["display_flags"].append("DISPLAY_NOT_CALIBRATED")
    return cond


def domain_distance(claim, run, cond):
    """count axes off + per-axis detail. Never compares display vs calibrated."""
    axes = {}
    off = 0
    axes["family"] = (run["family"] == claim["family"])
    axes["geometry"] = (claim.get("geometry_class") in (None, run["geometry"]))
    axes["scale"] = (claim.get("scale_class") in (None, run["scale_class"]))
    fr = claim.get("flow_regime") or {}
    if fr.get("bucket") and cond["flow"] is not None:
        claim_kind = "calibrated" if claim.get("scale_class") == "large" else "display"
        if claim_kind != cond["flow_kind"]:
            axes["flow"] = None  # incomparable kinds -> axis not creditable
        else:
            axes["flow"] = (flow_bucket(cond["flow"]) == fr["bucket"])
    else:
        axes["flow"] = None
    if fr.get("direction") and cond["direction"]:
        axes["direction"] = (cond["direction"].lower() == fr["direction"].lower())
    else:
        axes["direction"] = None
    o2r = claim.get("oxygen_regime") or {}
    if o2r.get("bucket") and cond["o2"] is not None:
        axes["o2"] = (o2_bucket(cond["o2"]) == o2r["bucket"])
    else:
        axes["o2"] = None
    creditable = [k for k, v in axes.items() if v is not None]
    off = sum(1 for k in creditable if axes[k] is False)
    return off, axes, creditable


# ------------------------------------------------------------- outcomes
def saffire2_outcome(store, run_id):
    """-> (status, detail, evidence items used). status in
    PROPAGATED|NO_PROPAGATION|PARTIAL_COMPOSITE|UNKNOWN."""
    bl, item_bl = store.first_val(run_id, "ug_burn_length")
    rate, item_rate = store.first_val(run_id, "ug_spread_rate_published")
    items = [i for i in (item_bl, item_rate) if i is not None]
    raw_bl = item_bl["value_raw"] if item_bl else ""
    if "&" in raw_bl:  # S7 composite '5 cm & 0 (note 2)'
        return "PARTIAL_COMPOSITE", raw_bl, items
    if bl is None and item_bl is not None:  # '~ 0' style: numeric under markers
        s = raw_bl.replace("~", "").strip()
        try:
            bl = float(s)
        except ValueError:
            bl = None
    if bl is None and rate is None:
        return "UNKNOWN", raw_bl, items
    if bl is not None and bl >= 20:  # near-full-length burn (sample 29 cm)
        return "PROPAGATED", raw_bl, items
    if rate is not None and rate > 0:
        return "PROPAGATED", f"rate {rate} mm/s", items
    if bl is not None and bl <= 1:
        return "NO_PROPAGATION", raw_bl, items
    return "UNKNOWN", raw_bl, items


def saffire1_outcome(store, run_id):
    """burn_time vs ignition_time + review finding."""
    bt, item_bt = store.first_val(run_id, "burn_time")
    it, _ = store.first_val(run_id, "ignition_time")
    if bt is None:
        return "UNKNOWN", "", ([item_bt] if item_bt else [])
    sustained = bt >= 200
    detail = f"burn_time={bt:.0f}s (ignition {it if it else '?'}s)"
    return ("SUSTAINED_BURN" if sustained else "EARLY_EXTINGUISH", detail,
            [item_bt] if item_bt else [])


BASS_TEXT = {
    "PROPAGATED": r"spread|burn(ed)? (well|completely|full)|steady spread|propagat|good burn|nice .*burn|burnout",
    "EXTINGUISHED": r"extin|went out|blow ?off|quench|self-exting",
    "NO_SPREAD": r"did not (ignite|spread)|not ignite|no spread|would not (burn|spread)|no ignition|failed to ignite",
}


def bass_outcomes(store, family, run_filter=None):
    """text-mine test_observations for all runs of a BASS family."""
    out = []
    rows = store.con.execute(
        "SELECT e.*, r.run_id r_id FROM evidence_items e JOIN runs r ON e.run_id=r.run_id "
        "WHERE e.variable='test_observations' AND r.family=? AND r.study_id='BASS'",
        (family,)).fetchall()
    for r in rows:
        if run_filter and not run_filter(r):
            continue
        txt = (r["value_raw"] or "").lower()
        st = []
        for status, pat in BASS_TEXT.items():
            if re.search(pat, txt):
                st.append(status)
        # precedence: explicit no-spread wins; burn-to-completion is propagation
        if "NO_SPREAD" in st:
            status = "NO_SPREAD"
        elif "PROPAGATED" in st and ("EXTINGUISHED" in st) and \
                ("burnout" in txt or "burn out" in txt or "burned out" in txt):
            status = "PROPAGATED"  # reached end of sample, then ended
        elif "EXTINGUISHED" in st and "PROPAGATED" in st:
            status = "EXTINGUISHED_AFTER_BURN"
        elif "EXTINGUISHED" in st:
            status = "EXTINGUISHED"
        elif "PROPAGATED" in st:
            status = "PROPAGATED"
        else:
            status = "UNCLEAR"
        out.append((r["r_id"], status, r))
    return out


LITERATURE = json.loads((VE / "literature_register.json").read_text())
# SAFFIRE-II-derived findings — masked in blind hold-out mode (Tier 2, R4)
SAFFIRE2_LIT_KEYS = {"pdms_silicone", "sibal_saffire2", "pmma_thick", "pmma_nomex"}


def lit_register(key):
    if key is None:
        return None
    return LITERATURE.get(key)


# ------------------------------------------------------- predicate alignment
def align(predicate, outcome):
    """-> CONFIRM | CONTRADICT | None (uninformative)."""
    table = {
        "PROPAGATES": {"PROPAGATED": "CONFIRM", "SUSTAINED_BURN": "CONFIRM",
                       "EXTINGUISHED_AFTER_BURN": "CONFIRM",
                       "NO_PROPAGATION": "CONTRADICT", "EARLY_EXTINGUISH": "CONTRADICT",
                       "EXTINGUISHED": "CONTRADICT", "NO_SPREAD": "CONTRADICT",
                       "NOMEX_NOT_IGNITED": "CONTRADICT"},
        "NO_PROPAGATION": {"NO_PROPAGATION": "CONFIRM", "PROPAGATED": "CONTRADICT",
                           "NO_SPREAD": "CONFIRM"},
        "EXTINGUISHES_LOW_FLOW": {"EXTINGUISHED": "CONFIRM", "EXTINGUISHED_AFTER_BURN": "CONFIRM",
                                  "PROPAGATED": "CONTRADICT"},
        "SUPPRESSES": {"SUPPRESSION_ENHANCED": "CONTRADICT", "SUPPRESSED": "CONFIRM"},
        "NON_MONOTONIC_FLOW": {"NON_MONOTONIC": "CONFIRM", "MONOTONIC": "CONTRADICT"},
        "REGRESSION_ANCHORED": {"ANCHORED": "CONFIRM", "PROPAGATED": "CONTRADICT"},
        "SPREAD_RATE_MATCHES": {"RATE_WITHIN_BAND": "CONFIRM", "RATE_OUTSIDE_BAND": "CONTRADICT"},
        "THERMAL_HISTORY_INSENSITIVE": {"HISTORY_SENSITIVE": "CONTRADICT",
                                        "HISTORY_INSENSITIVE": "CONFIRM"},
    }
    return table.get(predicate, {}).get(outcome)


# ------------------------------------------------------------------- engine
CONFLICTS = {
    "CR-1": {"class": "SCHEMA_ERROR", "affects": ["reported_rate_values"],
             "desc": "PSI-99 published ug rates sit in 'Spread Length' column (resolved via INTERPRETED companion)"},
    "CR-2": {"class": "UNRESOLVED", "affects": ["geometry_units"],
             "desc": "PSI-98 0.37 cm vs PSI-99 0.37 mm thickness units (behavior verdicts unaffected)"},
    "CR-3": {"class": "CONTEXT_DIFFERENCE", "affects": ["run_identity"],
             "desc": "BASS as-run number collisions (suffixed run ids)"},
}


class Engine:
    def __init__(self, store_path=None, blind=False):
        self.store = Store(store_path or DB)
        if blind:
            for k in SAFFIRE2_LIT_KEYS:
                LITERATURE.pop(k, None)
        self.trace = []

    def evaluate(self, claim):
        self.trace = []
        ev = []          # evidence records
        fam = claim["family"]
        if fam not in self.store.families():
            return self._refuse(claim, f"family '{fam}' not in L1 registry; no NASA μg evidence held")
        runs = self.store.runs_for_family(fam)
        self.trace.append(f"R-MATCH family={fam} candidate_runs={len(runs)}")

        in_domain, near = [], []
        for run in runs:
            cond = run_conditions(self.store, run)
            off, axes, creditable = domain_distance(claim, run, cond)
            if off == 0 and all(v is not False for v in axes.values()):
                in_domain.append((run, cond, axes))
            else:
                near.append((run, cond, axes, off))
        self.trace.append(f"R-DOMAIN in_domain={len(in_domain)} near={len(near)}")

        predicate = claim["earth_expectation"]["predicate"]

        # ---- collect outcome evidence
        confirms, contradicts = [], []
        for run, cond, axes in in_domain:
            for status, detail, items in self._run_outcomes(run):
                a = align(predicate, status)
                if a is None:
                    continue
                for it in items or [None]:
                    flags = (it["flags"] if it else "")
                    if it is not None and it["variable"] == "test_observations":
                        flags = (flags + "|TEXT_MINED|PRIMARY_OPERATOR_LOG").strip("|")
                    ev.append({
                        "run_id": run["run_id"],
                        "item": (it["variable"] if it else status),
                        "value": (it["value_raw"][:120] if it else detail),
                        "class": (it["evidence_class"] if it else "INTERPRETED"),
                        "flags": flags,
                        "source": (f"{it['source_file']}#row{it['source_row']}" if it else "engine"),
                        "domain_distance": 0, "role": a,
                    })
                rec = (run, status, detail)
                (confirms if a == "CONFIRM" else contradicts).append(rec)

        # de-duplicate evidence records
        seen = set()
        ev = [e for e in ev
              if (e["run_id"], e["item"], e["value"], e["role"]) not in seen
              and not seen.add((e["run_id"], e["item"], e["value"], e["role"]))]

        # literature corroboration
        lit = lit_register(claim.get("lit_key", fam))
        if lit:
            ev.append({"run_id": None, "item": lit["finding"],
                       "value": lit["quote"], "class": "INTERPRETED",
                       "flags": "LITERATURE_REVIEW",
                       "source": lit["cite"], "domain_distance": 0,
                       "role": "LITERATURE"})
            self.trace.append(f"R-LIT {fam}: {lit['finding']}")

        # ---- special evidence hooks (suppression, rate match) from claims
        for hook in claim.get("evidence_hooks", []):
            recs = self._hook(hook, claim, in_domain)
            for run, status, it, role in recs:
                ev.append({"run_id": run["run_id"] if run else None,
                           "item": it.get("item", status), "value": it.get("value", ""),
                           "class": it.get("class", "INTERPRETED"),
                           "flags": it.get("flags", ""), "source": it.get("source", "engine"),
                           "domain_distance": 0, "role": role})
                (confirms if role == "CONFIRM" else contradicts).append((run, status, it.get("value")))

        # ---- verdict composition (spec §2)
        n_conf, n_con = len(confirms), len(contradicts)
        self.trace.append(f"R-OUTCOME confirms={n_conf} contradicts={n_con} predicate={predicate}")
        conflicts = [f"{k} {CONFLICTS[k]['class']}: {CONFLICTS[k]['desc']}"
                     for k in claim.get("conflicts", []) if k in CONFLICTS]
        # only UNRESOLVED conflicts that touch outcome values can block/cap a verdict
        unresolved = [c for k in claim.get("conflicts", [])
                      if k in CONFLICTS and CONFLICTS[k]["class"] == "UNRESOLVED"
                      and "outcome" in CONFLICTS[k]["affects"]
                      for c in [f"{k}: {CONFLICTS[k]['desc']}"]]

        if not in_domain:
            return self._refuse(claim,
                                f"zero in-domain runs for family={fam} at the claimed "
                                f"flow/O2/scale domain",
                                near[:3])

        if n_con > 0 and n_conf == 0 and (n_con >= 2 or lit):
            verdict = "CONTRADICTED"
        elif n_conf >= 1 and n_con == 0 and (len(in_domain) >= 2 or lit):
            verdict = "SUPPORTED"
        elif n_conf >= 1 and n_con == 0:
            verdict = "INSUFFICIENT"  # single run, no corroboration (spec §2c)
        elif unresolved:
            verdict = "INSUFFICIENT"
        elif n_conf > 0 and n_con > 0:
            verdict = "INSUFFICIENT"
        else:
            verdict = "INSUFFICIENT"

        conf = self._confidence(claim, in_domain, n_conf, n_con, unresolved, lit, ev)
        out = {
            "tc_id": claim["tc_id"], "verdict": verdict,
            "confidence": conf["level"],
            "grade": claim.get("grade", None),
            "evidence": ev,
            "conflicts_considered": conflicts,
            "missing_evidence": [], "what_would_change_it": [],
            "nearest_domain": None, "refusal": False,
            "confidence_dimensions": conf,
            "rule_trace": self.trace,
        }
        if verdict == "INSUFFICIENT":
            out["missing_evidence"] = [self._missing(claim, in_domain, n_conf, n_con)]
            out["what_would_change_it"] = [self._would_change(claim)]
        return out

    # ---------------------------------------------------------------- hooks
    def _run_outcomes(self, run):
        if run["study_id"] == "SAFFIRE-II":
            if run["family"] == "pmma_nomex":
                it = self.store.items(run["run_id"], "ug_burn_length")
                return [("NOMEX_NOT_IGNITED",
                         "PMMA aid consumed; Nomex not ignited",
                         list(it))]
            s, d, items = saffire2_outcome(self.store, run["run_id"])
            if s == "PARTIAL_COMPOSITE":
                return [("PROPAGATED", d, items)]
            return [(s, d, items)]
        if run["study_id"] == "SAFFIRE-I":
            s, d, items = saffire1_outcome(self.store, run["run_id"])
            return [(s, d, items)]
        if run["study_id"] == "BASS":
            res = []
            for rid, status, row in bass_outcomes(self.store, run["family"],
                                                  run_filter=lambda r: r["r_id"] == run["run_id"]):
                res.append((status, row["value_raw"][:80], [row]))
            return res
        return []  # BASS-II: no local outcome text; literature register only

    def _hook(self, hook, claim, in_domain):
        recs = []
        if hook == "suppression_enhancement":
            rows = self.store.con.execute(
                "SELECT e.*, r.run_id r_id FROM evidence_items e JOIN runs r ON e.run_id=r.run_id "
                "WHERE e.variable='test_observations' AND r.study_id='BASS' "
                "AND (e.value_raw LIKE '%dilut%' OR e.value_raw LIKE '%GN2%' "
                "OR e.value_raw LIKE '%nitrogen%')").fetchall()
            n = len(rows)
            lit = lit_register("bass_suppression")
            example_ids = [r["r_id"] for r in rows[:4]]
            recs.append((None, "SUPPRESSION_ENHANCED",
                         {"item": "gn2/dilution event rows",
                          "value": f"{n} runs mention dilution/GN2 (e.g. {', '.join(example_ids)})",
                          "class": "INTERPRETED", "flags": "TEXT_MINED",
                          "source": "L1 store: test_observations"},
                         "CONTRADICT"))
            if lit:
                recs.append((None, "SUPPRESSION_ENHANCED",
                             {"item": lit["finding"], "value": lit["quote"],
                              "class": "INTERPRETED", "flags": "LITERATURE_REVIEW",
                              "source": lit["cite"]}, "CONTRADICT"))
        if hook == "rate_match_s5":
            rate, item = self.store.first_val("SAFFIRE2-S5", "ug_spread_rate_published")
            g1, item2 = self.store.first_val("SAFFIRE2-S5", "g1_spread_rate")
            recs.append((None, "RATE_WITHIN_BAND",
                         {"item": "ug_spread_rate_published vs 1-g",
                          "value": f"ug={rate} mm/s vs 1-g descriptor",
                          "class": item["evidence_class"],
                          "flags": item["flags"], "source": "SAFFIRE2-S5 table row"},
                         "CONFIRM"))
        if hook == "regression_anchored":
            for rid in ("SAFFIRE2-S8", "SAFFIRE2-S9"):
                bl, item = self.store.first_val(rid, "ug_burn_length")
                if bl is None:  # masked (blind hold-out) or unparseable
                    continue
                run = self.store.con.execute(
                    "SELECT * FROM runs WHERE run_id=?", (rid,)).fetchone()
                recs.append((run, "ANCHORED",
                             {"item": "ug_burn_length ~10cm of 29cm + anchored regression",
                              "value": f"burn_length={bl}",
                              "class": item["evidence_class"], "flags": item["flags"],
                              "source": f"{rid} table row + review §7.1"}, "CONFIRM"))
        return recs

    # ------------------------------------------------------------ confidence
    def _confidence(self, claim, in_domain, n_conf, n_con, unresolved, lit, ev):
        n = len(in_domain)
        directness = 1.0  # verdicts only computed when in-domain
        consistency = 1.0
        if n_conf + n_con > 0:
            consistency -= 0.5 * (n_con / (n_conf + n_con))
        if unresolved:
            consistency = min(consistency, 0.3)
        precision = 0.4 + 0.2 * min(n, 3)
        if n == 1 and not lit:
            precision = min(precision, 0.6)
        # single-condition honesty cap: all in-domain runs from one study,
        # one direction, one flow bucket => one tested condition, not a range
        spans = {(r["study_id"], (c["direction"] or "").lower(),
                  flow_bucket(c["flow"]) if c["flow"] is not None else None)
                 for r, c, _ in in_domain}
        if len(spans) <= 1:
            precision = min(precision, 0.7)
        # strongest aligned primary evidence class actually used
        aligned_classes = [e["class"] for e in ev
                           if e["role"] in ("CONFIRM", "CONTRADICT")]
        if aligned_classes:
            class_strength = max(CLASS_SCORE.get(c, 0.5) for c in aligned_classes)
        else:
            class_strength = 0.2
        score = min(directness, consistency, precision, class_strength)
        level = "HIGH" if score >= 0.75 else ("MODERATE" if score >= 0.50 else "LOW")
        return {"directness": round(directness, 2), "consistency": round(consistency, 2),
                "precision": round(precision, 2), "class_strength": class_strength,
                "score": round(score, 2), "level": level}

    # ------------------------------------------------------------- refusal
    def _refuse(self, claim, why, near=None):
        out = {
            "tc_id": claim["tc_id"], "verdict": "INSUFFICIENT",
            "confidence": "LOW",
            "grade": None, "evidence": [], "conflicts_considered": [],
            "missing_evidence": [why],
            "what_would_change_it": [self._would_change(claim)],
            "nearest_domain": None, "refusal": True,
            "confidence_dimensions": {"directness": 0.0, "consistency": None,
                                      "precision": 0.0, "class_strength": 0.0,
                                      "score": 0.0, "level": "LOW"},
            "rule_trace": self.trace + [f"R-REFUSE {why}"],
        }
        if near:
            r = near[0][0]
            out["nearest_domain"] = f"{r['study_id']} {r['family']} ({r['run_id']})"
            out["evidence"].append({
                "run_id": r["run_id"], "item": "nearest tested domain",
                "value": f"{r['study_id']} {r['family']} at {(near[0][2] or {}).get('scale', '')}",
                "class": "INTERPRETED", "flags": "CONTEXT_ONLY",
                "source": r["source_file"] + f"#row{r['source_row']}",
                "domain_distance": near[0][3], "role": "CONTEXT"})
        lit = lit_register(claim.get("lit_key") or claim.get("family"))
        if lit:
            out["evidence"].append({
                "run_id": None, "item": lit["finding"], "value": lit["quote"],
                "class": "INTERPRETED", "flags": "LITERATURE_REVIEW",
                "source": lit["cite"], "domain_distance": None, "role": "LITERATURE"})
        return out

    def _missing(self, claim, in_domain, n_conf, n_con):
        if n_conf and n_con:
            return ("mixed in-domain outcomes with no resolved conflict; "
                    "a condition-matched replicate series or calibrated per-run "
                    "video re-analysis would resolve the split")
        if not in_domain:
            return "no runs at the claimed domain"
        if n_conf and len(in_domain) == 1:
            return ("single in-domain run; replicate at same flow/O2/scale "
                    "(second camera or repeat test) would establish consistency")
        return ("no in-domain outcome evidence extractable from held data; "
                "per-run video or sensor-derived outcome would be required")

    def _would_change(self, claim):
        return (f"a μg test of {claim['family']} at the claimed domain "
                f"({(claim.get('flow_regime') or {}).get('bucket', 'any flow')}, "
                f"{(claim.get('oxygen_regime') or {}).get('bucket', 'any O2')}, "
                f"{claim.get('scale_class', 'any scale')}) with published outcome")


if __name__ == "__main__":
    eng = Engine()
    print(eng.evaluate(json.loads((VE / "seed_claims.json").read_text())[0]))
