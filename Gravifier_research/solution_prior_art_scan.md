# GRAVIFIRE Prior-Art Scan — Solution Type Across Domains

**Question asked:** has anyone built our kind of solution — a provenance-aware
evidence system returning supported / contradicted / insufficient verdicts on
transfer claims, with uncertainty, applicability domains, and next-experiment
ranking — on this kind of problem (experimental fire-safety archives)?

**Scope:** the four family reviews (`Gravifier_research/BASS-II/`) already
audited dataset-specific novelty (no BASS/SAFFIRE ML predictor etc.). This
scan checks the *solution type* across all domains. Searched 2026-10-02 via
web search; ~10 query families. "No evidence found" = search result, not
proof of absence (house rule).

---

## 1. Verdict

- **Exact match found: none.** No published system was found that applies
  evidence-verdict semantics with provenance to raw experiment files,
  uncertainty propagation, and experiment recommendation on combustion or
  spacecraft fire data.
- **Every component exists as a mature field elsewhere** — mostly
  biomedicine and cheminformatics. Our contribution is the composition and
  the domain, not the invention of any mechanism. This is good: mature
  methods to borrow, and a defensible "no evidence found" gap at the
  intersection.
- **Novelty phrasing (binding):** never "first evidence-verdict system"
  (medicine has GRADE). Defensible: "no prior system was found that applies
  evidence-verdict semantics with run-level provenance to spacecraft fire
  experiment archives."

## 2. Component fields that exist — and what to borrow

| Component | Where it exists | Key sources | What we borrow |
| --------- | --------------- | ----------- | -------------- |
| Claim verification (supports/refutes/not-enough) | NLP, biomedicine: SciFact task = label claims SUPPORTS/REFUTES/NEI against literature | [SciFact, Wadden et al., EMNLP 2020](https://arxiv.org/abs/2004.14974); [SciFact-Open](https://kyleclo.com/assets/pdf/scifact-open-towards-open-domain-scientific-claim-verification.pdf) | The three-way verdict label incl. "not enough information"; their rationale/evidence-snippet output shape |
| Evidence-synthesis automation + certainty grading | Medicine: 65 AI tools catalogued; GRADE Working Group's official AI certainty rater | [AI tools for evidence synthesis, PMC 2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC13035263); [GRADErater, J Clin Epi 2026](https://pubmed.ncbi.nlm.nih.gov/42413633); [automated quality-assessment scoping review](https://link.springer.com/article/10.1186/s12874-026-02868-3) | GRADE's certainty factors (risk of bias, inconsistency, imprecision, indirectness) as a template for D4 confidence dimensions — cite as the medical gold standard we adapt |
| Contradiction detection in scientific text | NLP: clinical/legal contradiction detection | [Clinical Contradiction Detection, EMNLP 2023](https://aclanthology.org/2023.emnlp-main.80.pdf); [drug-repurposing contradictions roadmap](https://pmc.ncbi.nlm.nih.gov/articles/PMC9294417); [Finding Contradictions in Text, ACL 2008](https://aclanthology.org/P08-1118.pdf) | Taxonomy and weak-supursion labeling tricks for our conflict classes (TRUE_CONTRADICTION / CONTEXT_DIFFERENCE / SCHEMA_ERROR / UNRESOLVED) |
| Applicability domain (AD) | Cheminformatics: OECD-core QSAR concept; generalized to ML 2025 | [AD comprehensive analysis, PMC 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7432167); [general AD for ML models, npj 2025](https://www.nature.com/articles/s41524-025-01573-x); [AD comparative eval, arXiv 2024](https://arxiv.org/html/2411.00920v1) | Distance-to-model / leverage / density AD methods → our "distance-to-evidence-domain" for verdict confidence and INSUFFICIENT triggers; cite OECD lineage |
| Model discrepancy & calibration | Uncertainty quantification: Kennedy–O'Hagan framework, still active | [KOH 2001](https://www.semanticscholar.org/paper/c67ff56d0f5d252e80b48de917e3fc71e47d13a0); [Bayesian calibration of imperfect models, JMLR](https://www.jmlr.org/papers/volume24/22-0676/22-0676.pdf); [2026 KOH review](https://arxiv.org/html/2601.22890v1) | Vocabulary for model cards ("discrepancy term", identifiability caveat) in WP6 model-applicability atlas |
| Next-experiment selection | Bayesian optimal experimental design / active learning, incl. materials | [Modern BED review, Rainforth et al.](https://arxiv.org/pdf/2302.14545); [Bayesian active learning, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4181721); [CMU Ulissi materials DoE notes](https://ulissigroup.cheme.cmu.edu/F22-06-325/notes/bayesian_optimization.html) | Expected-information-gain scoring for D7 — keeps the recommender defensible and non-ad-hoc |
| Model/simulation credibility scoring | NASA itself: NASA-STD-7009 credibility assessment scale | [NASA-STD-7009](https://standards.nasa.gov/standard/NASA/NASA-STD-7009); [credibility scale paper, NTRS](https://ntrs.nasa.gov/api/citations/20090005963/downloads/20090005963.pdf) | **Anchor our evidence grades in NASA's own standard** (verification, validation, input pedigree, uncertainty factors). Strongest possible legitimacy move: we grade NASA evidence by NASA's credibility rubric |

## 3. Closest neighbors inside fire science (must cite, must not claim over)

| Neighbor | What it does | Why it is not our claim |
| -------- | ------------ | ---------------------- |
| [FDS Validation Guide, NIST SP 1018-3](https://github.com/firemodels/fds/blob/master/Manuals/FDS_Validation_Guide/FDS_Validation_Guide.tex); [V&V process paper](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=910622) | Statistical model-vs-experiment comparison with uncertainty for one fire model (FDS) across validation cases | Single-model validation, not cross-study evidence verdicts on transfer claims; no provenance-to-raw-archive layer |
| [Meta-analysis of 112 compartment fire tests, Appl. Therm. Eng. 2025](https://www.sciencedirect.com/science/article/pii/S1359431125003242) | Pools test data for behavior insights | Data pooling for insight, not verdicts/applicability/refusal |
| [Pyrolysis-model uncertainty method, FSRI](https://fsri.org/research-update/journal-article-reports-conducting-uncertainty-analysis-pyrolysis-models); [metamodel uncertainty for fire risk, MDPI Fire](https://www.mdpi.com/2313-576X/7/3/50); [TU Delft uncertainty-based fire-safety decisions](https://research.tudelft.nl/en/publications/uncertainty-based-decision-making-in-fire-safety-analyzing-the-al) | UQ inside fire models and risk frameworks | Model-side UQ, not evidence-side verdicts; no microgravity archive |
| [Instantaneous flame spread rate via image analysis + error analysis, Fire Safety J. 2017](https://www.sciencedirect.com/science/article/abs/pii/S0379711217300498) | Separates measurement uncertainty from true spread variation in image-derived rates | Closest to WP3 — cite it; our delta: ensemble intervals, per-frame provenance, NOT-MEASURABLE states, archive level |
| [MAPTIS](https://maptis.nasa.gov/Features) — NASA materials DB incl. Test 1 flammability data ([test-data message, NTRS](https://ntrs.nasa.gov/citations/20040084025); [barrier-statistics bulletin using MAPTIS data](https://ntrs.nasa.gov/api/citations/20260001542/downloads/TB_26-03Final.pdf)) | Engineering repository of ground flammability tests (32k+ materials) | Stores results; no microgravity comparison, evidence classes, or verdict semantics. Potential integration point / source of Earth-side claims |
| BASS↔SAFFIRE cross-scale papers ([Urban 2019](https://www.sciencedirect.com/science/article/abs/pii/S0010218018304395), [Edinburgh/USRA Saffire analysis](https://www.pure.ed.ac.uk/ws/files/31828517/The_Saffire_Experiment_2017_US_National_Meeting_Final.pdf)) + NASA Liao 2023–26 | Manual per-paper cross-experiment synthesis; NASA's automated image extraction + partial-gravity prediction | These are our evidence *sources* and the occupied prediction lane — the verdict/applicability layer on top is the open seat |

## 4. Consequences for the research plan

1. **D4 (verdict semantics):** adapt GRADE's certainty dimensions instead of
   inventing factors; keep the three-way verdict aligned with
   SciFact's SUPPORTS/REFUTES/NEI so the shape is familiar and citable.
2. **Evidence grading:** map our MEASURED/DERIVED/MODELED/INTERPRETED
   classes onto NASA-STD-7009 credibility factors where possible — pitch
   line: "we grade NASA evidence with NASA's own credibility standard."
3. **D7:** use expected-information-gain style scoring (Bayesian ED
   literature) as the named method, not an ad-hoc score.
4. **WP3:** cite the Fire Safety Journal 2017 error-analysis paper as direct
   prior art and state the delta explicitly.
5. **Award identity / project page:** frame as "evidence system for
   spacecraft fire safety" — borrowing mature methods from evidence-based
   medicine and QSAR — applied where no such system was found.
6. **Overclaim guard:** all component mechanisms get "adapted from" framing;
   only the composition + domain claim openness, with "no evidence found"
   phrasing intact.
