import sqlite3
from collections import Counter

con = sqlite3.connect("/home/elias/Codes/NSAC/Gravifier_research/evidence_store/gravifire_l1.db")

print("== runs by study x is_test ==")
for r in con.execute("SELECT study_id, is_test, COUNT(*) FROM runs GROUP BY 1,2 ORDER BY 1,2"):
    print("  ", r)

print("\n== families per study (is_test=1) ==")
for r in con.execute("SELECT study_id, family, COUNT(*) FROM runs WHERE is_test=1 GROUP BY 1,2 ORDER BY 1,3 DESC"):
    print("  ", r)

print("\n== evidence by class ==")
for r in con.execute("SELECT evidence_class, COUNT(*) FROM evidence_items WHERE variable!='_row_flag' GROUP BY 1"):
    print("  ", r)

print("\n== flag frequency (top 20) ==")
fl = Counter()
for (s,) in con.execute("SELECT flags FROM evidence_items WHERE flags!=''"):
    for f in s.split("|"):
        fl[f] += 1
for f, n in fl.most_common(20):
    print(f"   {n:5d}  {f}")

print("\n== BASS outcome text coverage ==")
n = con.execute("SELECT COUNT(DISTINCT run_id) FROM evidence_items WHERE variable='test_observations'").fetchone()[0]
tot = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS' AND is_test=1").fetchone()[0]
print(f"   {n}/{tot} BASS test runs carry free-text outcome observations")
import re
kw = Counter()
for (s,) in con.execute("SELECT LOWER(value_raw) FROM evidence_items WHERE variable='test_observations'"):
    for word, pat in [("ignited", r"ignit"), ("extinguished", r"extin|exting"),
                      ("no_spread/no_ign", r"did not (ignite|spread)|not ignite|no spread|would not"),
                      ("soot", r"soot"), ("dilution/gn2", r"dilut|gn2|nitrogen")]:
        if re.search(pat, s or ""):
            kw[word] += 1
print("   keyword hits:", dict(kw))

print("\n== measured conditions coverage (BASS, from as-run matrix) ==")
for var in ("o2_pct_volume", "pressure_atm", "co2_mmhg", "gn2_pot"):
    n = con.execute("SELECT COUNT(*) FROM evidence_items WHERE variable=? AND value_norm IS NOT NULL", (var,)).fetchone()[0]
    print(f"   {var}: {n} runs with numeric value")

print("\n== SAFFIRE-II per-run inventory ==")
for r in con.execute("""SELECT run_id,
   (SELECT COUNT(*) FROM evidence_items e WHERE e.run_id=r.run_id AND e.variable!='_row_flag'),
   (SELECT COUNT(*) FROM sensor_series s WHERE s.run_id=r.run_id),
   (SELECT COUNT(*) FROM image_sets i WHERE i.run_id=r.run_id AND i.kind='burn')
   FROM runs r WHERE r.study_id='SAFFIRE-II' AND r.is_test=1 ORDER BY r.run_id"""):
    print("  ", r)

print("\n== planned vs as-run ==")
print("   planned points:", con.execute("SELECT COUNT(*) FROM planned_test_points").fetchone()[0])
print("   as-run runs:", con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS' AND is_test=1").fetchone()[0])
print("   runs with planned_test_no set:", con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS' AND planned_test_no NOT IN ('','None') AND is_test=1").fetchone()[0])

print("\n== image sets ==")
for r in con.execute("SELECT set_id, kind, n_frames, extracted_path IS NOT NULL FROM image_sets ORDER BY set_id"):
    print("  ", r)
