# NUGGET NIHONGO — EVIDENCE BASE CORPUS
## README FOR CRISPY
**Version:** v17
**Date:** 5 April 2026
**Maintained by:** Agent 2 (Sonnet 4.6) — handoff prep pass

---

## WHAT CHANGED IN v17

This is a **clean handoff preparation pass** — no bibliography edits, no new research sections. All changes are management-document-only.

| Change | Detail |
|---|---|
| README-ARCHIVE.md recovered | Was missing from v15/v16 ZIP. Restored from v14 `05-ARCHIVE/`. Now at `archive/README-ARCHIVE.md`. |
| `archive/` folder re-added to ZIP | Was entirely absent from v16-CLEAN.zip. Now present with proper structure. |
| Duplicate flag policy confirmed | Agent 2 does **NOT** touch bibliography for duplicate entries. All left for Crispy decision. See DUPLICATE FLAG TABLE below. |
| DUPLICATE FLAG TABLE added | New dedicated section — all confirmed duplicate pairs with context, options, and downstream impact. |
| OPUS-SUGGESTIONS bumped to v5 | Session C order updated. Reflects policy decision and archive recovery. |
| All management docs bumped to v17 | CLAUDE.md, INDEX.md, README-CRISPY.md, OPUS-SUGGESTIONS-v5.md. |

**Bibliography unchanged from v16: 747 entries, v6. No new stubs filled this pass.**

---

## CORPUS STATUS — v17

| Metric | Value |
|---|---|
| **Total unique citations** | **747** |
| Sections complete | 16 (§1–§5, §8–§17, §CA) + standalone Platform Research Agenda |
| Ghost stubs remaining | 0 |
| Stubs remaining (bibliography) | **7** (AL×2, CM×2, ER×2, SC×1) |
| DOI verifications pending | 42 |
| GA stubs outstanding | 0 ✅ |
| LS stubs outstanding | 0 ✅ |
| 🔴 Duplicate flags | **11 confirmed pairs (DUP-01–DUP-11); DUP-04/05 candidates pending Agent 38** — see DUPLICATE FLAG TABLE below |
| Open agent verdicts | 37A–C, 38A–C (6 sub-agents dispatched, none returned yet) |
| Archive folder | ✅ Restored — `archive/README-ARCHIVE.md` present in v17 ZIP |

---

## ⚠️ DUPLICATE FLAG TABLE — CRISPY DECISION REQUIRED

**Policy (confirmed 5 April 2026):** Agent 2 does NOT modify the bibliography or section files for duplicate entries. All pairs below are left exactly as-is in both the bibliography and section files. Crispy decides which ID to keep, which to retire. After Crispy's decision, Agent 2 Session C executes the mechanical ID replacements.

**11 confirmed pairs (DUP-01 through DUP-11). DUP-04/DUP-05 remain candidates pending Agent 38.**

| DUP # | Pair | Status | Action Required |
|---|---|---|---|
| DUP-01 | GA-09 = GA-19 (Kanno 2007 SSLA) | Confirmed — Crispy decision pending | Retire one ID; update §2 in-text refs |
| DUP-02 | LS-01 = LS-06 (Vandergrift 2007 Lang Teaching) | Confirmed — Crispy decision pending | Retire one ID; update §3 in-text refs |
| DUP-03 | SC-05 = VS-22 (Cook H.M. 2008 *Socializing identities through speech style.* Multilingual Matters.) | Confirmed — title corrected Pass 10 | Retire one ID; update §14/§15 refs |
| DUP-04 | ER-05 vs BC-08 (Hu & Nation 2000) | **Candidate** — Agent 38 pending | Hold pending Agent 38 verdict |
| DUP-05 | ER-10 vs OT-25–30 (Webb 2007) | **Candidate** — Agent 38 pending | Hold pending Agent 38 verdict |
| DUP-06 | CP-64 = EA-03 (Selinker 1972 *Interlanguage*) | Confirmed — self-declared in bibliography | Retire CP-64; canonical = EA-03 |
| DUP-07 | CP-09 = ER-20 (Chikamatsu 1996 SSLA 18(4)) | Confirmed — self-declared in bibliography | Retire CP-09; canonical = ER-20 |
| DUP-08 | SC-10 = SC-23 = CP-07 (Blum-Kulka, House & Kasper 1989) | **Confirmed — triple ID**; canonical = CP-07 | Retire SC-10 stub; delete SC-23 from bib; update §14 refs to CP-07 |
| DUP-09 | SC-09 = CP-57 (Ohta 2001 *SLA Processes in the Classroom*) | Confirmed; canonical = CP-57 | Retire SC-09 stub; update §14 refs to CP-57 |
| DUP-10 | SC-15 = SC-08 (Kasper & Rose 2002 *Pragmatic Development*) | Confirmed; canonical = SC-08 | Retire SC-15 stub; update §14 refs to SC-08 |
| DUP-11 | OT-01 = KR-09 (Swain 1985 *Communicative Competence*) | Confirmed; canonical = KR-09 | Retire OT-01; update §12 refs to KR-09; fix §1 body [NEW] tag to [KR-09] |

**★ All DUP resolutions require Crispy decision before Agent 2 executes ID replacements.**

---

## SECTIONS (v17 — all clean, merged, push-ready)

| Section | Topic | File | Citations |
|---|---|---|---|
| compass | Foundation | `corpus/source-of-truth/compass_artifact.md` | 44 |
| §1 | SRS + Boundary Conditions | `corpus/sections/SECTION1-EVIDENCE-BASED.md` | ~61 |
| §2 | Grammar Acquisition | `corpus/sections/SECTION2-GRAMMAR.md` | 31 |
| §3 | L2 Listening | `corpus/sections/SECTION3-LISTENING.md` | 25 |
| §4 | Extensive Reading | `corpus/sections/SECTION4-ER.md` | 25 |
| §5 | Contrastive + Error Analysis | `corpus/sections/SECTION5-CONTRASTIVE.md` | ~59 |
| §8 | PWA Platform (incl. Flag 3 malu citations) | `corpus/sections/SECTION8-PWA.md` | ~145 |
| §9 | Multimedia + Orthography + Phon. Recoding | `corpus/sections/SECTION9-MULTIMEDIA.md` | ~93 |
| §10 | Gamification, Habit, Sleep | `corpus/sections/SECTION10-GAMIFICATION-HABIT.md` | ~41 |
| §11 | Phonological Science | `corpus/sections/SECTION11-PHONOLOGY.md` | ~44 |
| §12 | Output Theory | `corpus/sections/SECTION12-OUTPUT-THEORY.md` | ~32 |
| §13 | Individual Differences | `corpus/sections/SECTION13-INDIVIDUAL-DIFFS.md` | ~43 |
| §14 | Sociolinguistics & Keigo | `corpus/sections/SECTION14-SOCIO.md` | 25 |
| §15 | SSW / Vocational | `corpus/sections/SECTION15-SSW.md` | ~26 |
| §16 | CALL/MALL | `corpus/sections/SECTION16-CALL.md` | 21 |
| §17 | Adult Learning | `corpus/sections/SECTION17-ADULT.md` | 19 |
| §CA | Curriculum Architecture | `corpus/sections/SECTION-CA-CURRICULUM.md` | ~107 |
| standalone | Platform Research Agenda | `corpus/sections/PLATFORM-RESEARCH-AGENDA.md` | — |

> §6 dan §7 tidak ada — **intentional skip**. Topik absorbed ke §CA, §9, §11.

---

## ARCHIVE (v17 — restored)

`archive/` was absent from NUGGET-NIHONGO-CORPUS-v16-CLEAN.zip. **Restored in v17.**

| Path | Description |
|---|---|
| `archive/README-ARCHIVE.md` | Superseded files registry. Recovered from v14 `05-ARCHIVE/`. Lists all section files replaced by later canonical versions. |
| `archive/HANDOFF-AGENT2-v14.md` | ⭐ F1/F2/F3 synthesis inputs — Crispy read before writing Level Ladder, §18, Methodology Narrative |
| `archive/absorbed-dispatch/` | 3 dispatch files confirmed absorbed into canonical section files. |

---

## PENDING (not changed in v17)

### Synthesis (Crispy/Opus — new sessions)
- F1: Level Ladder Specification (`corpus/sections/LEVEL-LADDER-SPEC.md`)
- F2: §18 Synthesis Section (`corpus/sections/SECTION18-SYNTHESIS.md`)
- F3: Methodology Page Narrative (`blueprint/METHODOLOGY-PAGE-NARRATIVE.md`)

### Bibliography remaining (Agent 2 Session C)
- AL stubs × 2 — fill from SECTION17-ADULT.md
- CM stubs × 2 — fill from SECTION16-CALL.md
- ER stubs × 2 — fill from SECTION4-ER.md
- SC stubs × 1 — fill from SECTION14-SOCIO.md
- 42 DOI verifications — see `corpus/bibliography/DOI-VERIFICATION-TRACKER.md`
- DUP-01 through DUP-11 — mechanical ID replacements after Crispy's decisions
- **Matsunaga (1999) — assign cluster ID, add formal citation to §1.11; cross-link to §8 Flag 2 FSRS kanji difficulty priors** (#132)

### QA verdicts (dispatched, not returned)
- Agents 37A, 37B, 37C — citation QA flags
- Agents 38A, 38B, 38C — cross-ref + anti-duplication audit (includes DUP-03)

---

## FULL OPEN FLAGS TABLE

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🔴 DUP-01 | GA-09 = GA-19 (Kanno 2007 SSLA). Bibliography untouched. See flag table above. | 🔴 CRISPY | PENDING CRISPY DECISION |
| 🔴 DUP-02 | LS-01 = LS-06 (Vandergrift 2007 Lang Teaching). Bibliography untouched. See flag table above. | 🔴 CRISPY | PENDING CRISPY DECISION |
| 🔴 DUP-03 | SC-05 = VS-22 (Cook 2008). Bibliography untouched. See flag table above. | 🔴 CRISPY / Agent 38A | PENDING (38A first) |
| 🔴 VD-17 | Cai (2015) — verify on CiNii/J-STAGE or delete | 🔴 CRISPY | PENDING CRISPY |
| 🔴 EA-22 | Indonesian L1 error study — formalize as gap marker | 🔴 CRISPY | PENDING CRISPY |
| 🔴 §4-A | ER-05 vs BC-08 (Hu & Nation 2000) — DUP candidate; Agent 38 consolidation strategy | Agent 38 | PENDING VERDICT |
| 🔴 §4-B | ER-10 vs OT-25–30 (Webb 2007) — DUP candidate; verify OT-25–30 content | Agent 38 | PENDING VERDICT |
| 🔴 §17-A | AL-07 (Bandura 1997) — check §13 ID cluster for existing Bandura entry | Agent 38 | PENDING VERDICT |
| 🟡 §10-A | GI-02 (Faisal & Hijriya 2021) — paper existence unverified | 🔴 CRISPY | PENDING CRISPY |
| 🟡 §11-A | PH-23 (Hirano 1999) — DOI unverified | 🔴 CRISPY | PENDING CRISPY |
| 🟡 FLAG §11-C | PH-40–PH-44 (Vitevitch/Luce speculative cluster) | Theoretical application to L2 Japanese unvalidated empirically. Consider labelling "Speculative Application Cluster" and not presenting at same weight as HVPT/SLM citations. PH-43 carries Q-Score 3 — may be deleted if citation budget is tight. | 🟡 MEDIUM — Crispy decision |
| 🟡 #18 | SUPPLEMENT \1 journal corruption (9 entries) | All 9 fixed in Pass 10. Journal names inferred from DOIs — verify Matsunaga (1999) journal name specifically as it could not be confirmed via DOI alone. | 🟡 LOW — verify Matsunaga only |
| 🟡 §11-D | PH-03 SLM-r — DOI unverified | 🔴 CRISPY | PENDING CRISPY |
| 🟡 §12-A | OT-22 (DeKeyser) — DOI unverified | 🔴 CRISPY | PENDING CRISPY |
| 🟡 CC-02 | ID discrepancy (Markus & Kitayama vs Brown & Levinson) | Agent 38A | PENDING VERDICT |
| 🟡 GA-13 | Conflict (Di Biase & Kawaguchi vs Pienemann 1984) | Register check | PENDING |
| 🟡 OD-03 | Seymour et al. (2003) — DOI three-way conflict (brief vs section table vs bibliography) | Agent 37 | PENDING VERDICT |
| 🟡 §2-A | GA-08 (Mori 2002) — DOI unverified | Agent 37 | PENDING VERDICT |
| 🟡 §2-B | GA-09 (Kanno 2007) — DOI unverified | Agent 37 | PENDING VERDICT |
| 🟡 LS-19 | Abdous et al. (2009) — DOI unverified | Agent 37 | PENDING VERDICT |
| 🟡 §4-C | ER-19 (Mori & Shimizu 2007) — DOI unverified | Agent 37 | PENDING VERDICT |
| 🟡 §4-D | ER-20 (Chikamatsu 1996) — DOI unverified | Agent 37 | PENDING VERDICT |
| 🟡 §17-B | AL-14 (Gardner 1985) — check §13 ID cluster | Agent 38 | PENDING VERDICT |
| 🟡 Cross-ref CEFR-J | §9.4→§CA CEFR-J alignment cross-reference missing | Agent 38 | PENDING |
| 🟡 Cross-ref Sleep | §10.7→§1 sleep/consolidation cross-reference missing | Agent 38 | PENDING |
| 🟡 Swain (1985) | Relocation §1.6 → §12 | 🟡 CRISPY | MEDIUM priority |
| 🟡 §9.10.7-A | PR-03 DOI (pre-DOI era) | Agent 37B | PENDING VERDICT |
| 🟡 §9.10.7-B | PR-02 DOI verify | Agent 37B | PENDING VERDICT |
| 🟡 §9.10.7-C | PR-06 LCM sequencing — DDM notification | Agent 32/33 | PENDING |
| 🟡 §14→§12 | §14.6 speech act output practice ↔ §12 Output Hypothesis — verify §12 back-refs §14 | Agent 38 | PENDING (migrated from §14 FLAGS FOR AGENT 38) |
| 🟡 §14→§5.5.24 | §14.4–§14.6 ILP theory ↔ §5.5.24 CP cluster — bidirectional cross-ref; confirm no duplicate citation | Agent 38 | PENDING (migrated from §14 FLAGS FOR AGENT 38) |
| 🟡 §14→§8 | §14.5 face/malu ↔ §8 — §8 not yet cross-referenced to §14; suggest adding | Agent 38 | PENDING (migrated from §14 FLAGS FOR AGENT 38) |
| 🟢 §9.10.7-D | Feature proposal: LCM kanji sequencing | LOW | LOW |
| 🟢 §5.6-A | Truscott (EA-19) cosmetic label | Cosmetic | LOW |
| 🟢 §14-B | SC-12–14 gap markers | Cosmetic | LOW |
| 🟢 §3-A | LS-12–14 gap markers | Cosmetic | LOW |
| 🟢 Cosmetic gaps | ER-21/25, CM-13/20/21/25, AL-12/13/21 vacant IDs | Cosmetic | LOW |

---

## §8 OPEN FLAGS (Finding #44 — Pass 11 D1)

Source: `SECTION8-PWA.md` — "UNRESOLVED FLAGS FOR CRISPY (v2 update)" block (~line 1166). Flag 8 is an audit housekeeping note — not added as an open flag per D1 protocol.

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🔴 §8-Flag-1 | Indonesian-specific motivation data: No published SDT or L2MSS study using Indonesian Japanese-language learners as participants. Chirkov et al. (2003) covers collectivist cultures but not Indonesian specifically. Recommend commissioning a motivational orientation survey as platform research agenda item (publishable in *Language Learning* or *MLJ*). | 🔴 CRISPY | PENDING |
| 🔴 §8-Flag-2 | FSRS difficulty priors: Matsunaga (1999) finding (2.3× more exposures for non-kanji-background learners) requires FSRS Indonesia-adjusted kanji difficulty priors. **Actionable engineering sprint item.** Cross-reference §3.4.3 audio/visual scheduling gap. | 🔴 CRISPY / Engineering | PENDING — FSRS Sprint |
| 🔴 §8-Flag-3 | Malu and anxiety: No published study has measured *malu* in Japanese language learning by Indonesian learners specifically. Zhang (2019) meta-analysis and Liu & Jackson (2008) are best available proxies. **Most important gap in entire §8 corpus — genuine contribution opportunity.** | 🔴 CRISPY | PENDING |
| 🟡 §8-Flag-4 | PWA-specific MALL research: Evidence gap is real and unresolvable from existing literature. Acknowledge explicitly; position as platform research contribution. | 🟡 CRISPY | PENDING |
| 🟡 §8-Flag-5 | Session fatigue data: No SRS-specific session fatigue study. Platform analytics should track session abandonment by session length as primary fatigue proxy. | 🟡 CRISPY | PENDING |
| 🟡 §8-Flag-6 | Habit formation in SRS context: Lally et al. (2010) studied general health behaviors only. No published study measures habit formation for daily SRS specifically. Platform analytics should track session-initiation automaticity as habit formation proxy. | 🟡 CRISPY | PENDING |
| 🟡 §8-Flag-7 | WCAG compliance audit: No formal accessibility audit of Nugget Nihongo codebase. Recommend WCAG 2.1 Level AA audit before public launch (Axe + WAVE automated; NVDA/TalkBack manual). | 🟡 CRISPY / Engineering | PENDING |

---

## §10 OPEN FLAGS (Finding #42 — Pass 11 D2)

Source: `SECTION10-GAMIFICATION-HABIT.md` — FLAGS B–F block. FLAG §10-A (GI-02 existence) already present in main flags table above.

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🟡 §10-B | GX-05 chapter details unconfirmed: Murayama et al. (2012) chapter in *Oxford Handbook of Human Motivation* — author cluster and chapter title need page-range verification. Claim is well-supported by primary sources; specific handbook chapter citation needs confirmation. If unverifiable, substitute Murayama & Elliot (2012) *JPSP* 102(1) which tests the distinction empirically. | 🟡 CRISPY | PENDING |
| 🟡 §10-C | Hamari self-citation cluster: Hamari appears as first or co-author on GF-02, GM-01, and GM-06 in §10. Agent 2 should confirm total Hamari count across corpus; flag if cluster exceeds 5 papers total. All three §10 Hamari citations make distinct non-overlapping contributions. | Agent 2 / CRISPY | PENDING |
| 🟡 §10-D | GF-02 DOI unconfirmed: Hamari & Koivisto (2013) ECIS proceedings DOI listed as *(verify)*. ECIS proceedings not always DOI-indexed. If unavailable, cite as: Hamari, J., & Koivisto, J. (2013). In *Proc. 21st European Conf. Information Systems* (ECIS 2013, Paper 50). AIS Electronic Library. | Agent 37 | PENDING |
| 🟡 §10-E | §10.6 / §8 Flag 6 boundary: §10.6 provides theoretical foundation for habit formation; §8.11.4 Study 4 proposes original research on same topic. These are complementary (§10.6 = evidence base; §8.11.4 = proposed study), not duplicative. Crispy should confirm this distinction is understood at merge time. | 🔴 CRISPY | PENDING |
| 🔴 §10-F | GX-04 / MV-02 anti-duplication (DUP candidate): Ryan & Deci (2000) *Contemporary Educational Psychology* (GX-04) confirmed to be different from §8 MV-02. **However:** if MV-02 = the CEP paper rather than the *American Psychologist* SDT paper, GX-04 must be removed from §10. Agent 2 to confirm MV-02 identity before finalizing §10. | Agent 38 / CRISPY | DUP CANDIDATE — PENDING VERDICT |

---

## §11 OPEN FLAGS (Finding #59 — Pass 11 D3)

Source: `SECTION11-PHONOLOGY.md` — FLAGS A–D block (~line 407).

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🟡 §11-A | PH-23 Hirano (1999) — *Journal Japan Academy of Language Studies* vol. 3 — DOI unavailable; journal not indexed in major databases. Verify via NDL Digital (ndlsearch.ndl.go.jp) or CiNii; delete if not found. | 🔴 CRISPY | PENDING |
| 🟡 §11-B | PH-21 Papagno, Valentine & Baddeley (1991) — phonological loop in L2 vocabulary context. Coordination with Agent 3 (§13) required to avoid duplication. Agent 3 should not re-cite Papagno et al. in overlapping context; §11.3 uses it for phonological store specifically. | Agent 3 / CRISPY | PENDING |
| 🟡 §11-C | PH-40–PH-44 phonological neighborhood cluster (§11.6): theoretical application to L2 Japanese not empirically validated directly; all sources are L1 or non-Japanese L2. Consider labelling "Speculative Application Cluster" at merge; do not present at same evidential weight as HVPT/SLM citations. | 🟡 CRISPY | MEDIUM |
| 🟡 §11-D | PH-03 Flege & Bohn (2021) SLM-r: book chapter in Cambridge UP edited volume; DOI unconfirmed. Verify via Cambridge Core. Priority verify — SLM-r is an important theoretical update. | Agent 37 | PENDING |

---

## §CA OPEN FLAGS (Finding #47 — Pass 11 D4)

Source: `SECTION-CA-CURRICULUM.md` — "UNRESOLVED FLAGS FOR CRISPY" block (~line 1387). Flag 1 is RESOLVED; Flag 4 is informational — neither added per D4 protocol.

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🟡 §CA-Flag-2 | JLPT-CEFR alignment (§CA.3): No official alignment study exists in the literature. Use "approximate" language throughout §CA.3 and methodology page. CEFR-J (not standard CEFR) provides better Japanese-specific level descriptors. | 🔴 CRISPY | PENDING — use hedged language at merge |
| 🔴 §CA-Flag-3 | Indonesian-specific needs analysis (§CA.4): GAP CONFIRMED. Lamb (2004) is best available proxy evidence. Recommend commissioning formal needs analysis as research priority for platform's academic credibility program (consistent with §5.5.30 Gap 5 research recommendation from Agent 11). | 🔴 CRISPY | PENDING — research agenda item |
| 🟡 §CA-Flag-5 | FSRS direct validation gap (§CA.7 cross-ref to §1.11): FSRS validation gap identified in Agent 10's §1.11 remains open. Bachman (2004) provides methodology for a future FSRS-vs-JLPT-outcome predictive validity study. Platform research priority. | 🔴 CRISPY / Engineering | PENDING — FSRS Sprint |

---

## §9 OPEN FLAGS (Finding #94 — Pass 11 D5)

Source: `SECTION9-MULTIMEDIA.md` — FLAGS block (~line 549). FLAGS 4 and 6 only per D5 protocol.

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🟡 §9-Flag-4 | Gap B (gamification) disposition: §9 is confirmed complete without gamification. Gap B should be assigned to a §10 expansion agent or returned to Agent 8 as §8 addendum. Agent 7 recommends dedicated §10 agent given scope (Hamari 2014 meta-analysis, Hanus & Fox 2015, SDT × gamification). | 🔴 CRISPY | PENDING ASSIGNMENT |
| 🟡 §9-Flag-6 | Expertise reversal implementation: §9.4 expertise reversal table assumes Nugget Nihongo can implement **level-aware adaptive card templates** (different field display rules for N5 vs. N2 cards). If current PWA architecture does not support adaptive templates, §9.4 table becomes theoretical rather than actionable. Crispy to confirm with Golden whether adaptive templates are in the PWA roadmap. | 🔴 CRISPY / Engineering | PENDING VERDICT |

---

## §9.10 FLAGS (Finding #62 — Pass 11 D6)

Source: `SECTION9-MULTIMEDIA.md` §9.10 flag summary (~line 957). §9.10-A and §9.10-E only per D6 protocol.

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🟡 §9.10-A | OD-03 DOI conflict: Seymour et al. (2003) *British Journal of Psychology* 94(2). Dispatch brief DOI = `10.1348/000712603322503285`; §9.10 body uses `10.1348/000712603321661859`. Bibliography entry has **no DOI**. Both candidates documented in DOI-VERIFICATION-TRACKER.md (CONFLICT row). Verify before merge. | Agent 37 | PENDING VERDICT |
| 🟢 §9.10-E | FSRS response latency as scheduling signal: Decision 3 (response latency as FSRS signal) requires engineering change. Empirical backing: OD-14, OD-15, OD-16. Feature proposal with citations ready — needs Crispy forwarding to engineering. | 🔴 CRISPY / Engineering | PENDING — FSRS Sprint |

---

## FSRS SPRINT ITEMS CLUSTER

Items requiring engineering action with empirical justification already in corpus. Crispy should forward as a group to the engineering team.

| Sprint Item | Source Flag | Empirical Backing | Priority |
|---|---|---|---|
| Indonesia-adjusted kanji difficulty priors for FSRS | §8-Flag-2 | Matsunaga (1999) — 2.3× exposure multiplier for non-kanji-background learners | 🔴 HIGH |
| Separate FSRS scheduling tracks for audio recall vs. visual recall | §3 audio gap (D7 below) | LS-11 (modality-specific form acquisition), §1 FSRS cluster | 🟡 MEDIUM |
| Response latency as FSRS confidence signal | §9.10-E | OD-14, OD-15, OD-16 (RAN + processing speed → reading fluency) | 🟡 MEDIUM |
| FSRS predictive validity study vs. JLPT outcomes | §CA-Flag-5 | Bachman (2004) assessment methodology | 🟡 MEDIUM — research agenda |

---

## §3 AUDIO SCHEDULING GAP (Finding #63 — Pass 11 D7)

Source: `SECTION3-LISTENING.md` ~line 152 and design implication table line 201.

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🟡 §3-FSRS-Audio | FSRS audio vs. visual scheduling separation: §3.4.3 identifies that audio recall and visual recall build distinct components of lexical knowledge. Cards reviewed only through visual reading build orthographic form-meaning connection; cards reviewed with audio build aural form-meaning connection. **Platform gap:** FSRS scheduling algorithm should ideally weight audio recall and visual recall separately — currently this is not implemented. Empirical basis: LS-11 (Vidal 2011 — modality-specific form-meaning link acquisition). Cross-reference §8-Flag-2 (Matsunaga FSRS priors). | 🔴 CRISPY / Engineering | PENDING — FSRS Sprint |

---

## AGENT 38 PENDING VERDICTS

| Verdict Item | Finding | Detail | Status |
|---|---|---|---|
| §3/§9 audio display table alignment | Finding #64 (D8) | §3's staged audio recommendation architecture and §9's audio display table may use different terminology or thresholds for N5/N4/N3 audio exposure levels. Agent 38 to confirm alignment or flag discrepancy for Crispy reconciliation. No edit to corpus until verdict returned. | ⏳ PENDING AGENT 38 |
| DUP-04 candidate: ER-05 vs BC-08 (Hu & Nation 2000) | Finding #41 / DDM Flag D (D9) | §4 cites as ER-05; §1 cites as BC-08. Anti-duplication baseline v10 flags as potential duplicate. Agent 38 to verify whether these are the same or different papers/editions. | ⏳ PENDING AGENT 38 |
| DUP-05 candidate: ER-10 vs OT-25–OT-30 (Webb 2007) | Finding #46 / DDM Flag E (D9) | §4 uses ER-10; §12 uses OT-25–OT-30; §CA.10 uses VD-05. If Agent 38 confirms Webb (2007) = ER-10 = OT-25 or OT-26, §4/§CA.10 citations must be corrected to a single canonical ID. | ⏳ PENDING AGENT 38 |

---

## DDM CROSS-CONFLICT FLAGS (Finding #41 — Pass 11 D9)

Source: `DESIGN-DECISION-MASTER-v1.md` — "CROSS-CONFLICT FLAGS FOR AGENT 2" block (~line 1378). FLAGS A and B only (Flag C is framing note; Flags D/E are DUP candidates covered above).

| Flag ID | Item | Owner | Status |
|---|---|---|---|
| 🔴 DDM-Flag-A | Audio quality standard conflict: §11 (HVPT) requires multi-speaker human-recorded audio as a non-negotiable condition for perceptual learning generalization. If §8's MALL cluster concluded TTS audio is acceptable as a pragmatic compromise, §11 position takes precedence. §8 should cross-reference §11.7 as the architectural specification. Crispy to reconcile at merge. | 🔴 CRISPY | PENDING CRISPY DECISION |
| 🔴 DDM-Flag-B | Evening notification default conflict: §10.7 recommends evening notification window (19:00–22:00) based on sleep consolidation evidence (SL-03, SL-04). If §8 recommended a different default notification time without specifying the evidence-based default, these need reconciliation. §10.7 position should be the evidence-based default; user override permitted per autonomy principles. | 🔴 CRISPY | PENDING CRISPY DECISION |

---

## SKIPPED TASKS — FLAG BLOCKS NOT FOUND (Pass 11 D10–D14)

The following D tasks were attempted but the expected formal flag blocks were not present in the source files at the expected locations. Per protocol: documented as SKIPPED with reason — not guessed.

| Task | Finding | Source File | Expected Block | Status |
|---|---|---|---|---|
| D10 | #43 | SECTION1-EVIDENCE-BASED.md | FLAGS A–E block | ⏭ SKIPPED — no formal `## UNRESOLVED FLAGS FOR CRISPY` block found; file contains inline ⚠ markers at individual citation entries (CC-02 ID discrepancy, CV-03/CV-04/CV-05 DOI flags) but no dedicated FLAGS A–E section. Inline flags already captured in main flags table (CC-02, §2-A, §2-B). |
| D11 | #93 | SECTION4-ER.md | Open flags block | ⏭ SKIPPED — no formal open flags block found; §4 file contains inline design implication flags within body text only. |
| D12 | #95 | SECTION17-ADULT.md | Open flags block | ⏭ SKIPPED — no formal open flags block found; §17 file contains one inline ⚠ Agent 2 flag at line 81 (AL-07 Bandura duplication check — already present in main flags table as §17-A). |
| D13 | #57 | SECTION15-SSW.md | FLAGS 1–3 block | ⏭ SKIPPED — no formal flags block found at any location in file. |
| D14 | #43 (cross-ref) | SECTION12-OUTPUT-THEORY.md | Open flags block | ⏭ SKIPPED — no formal open flags block found; §12 flags are already represented in the DOI-VERIFICATION-TRACKER (FLAGS FROM §12 OUTPUT THEORY section). No additional entries to add. |

**Recommendation for Crispy:** If FLAGS A–E (§1), §4, §15, §17 open flags exist in a different file version or were added by a later agent session, those should be provided to Agent 2 for a targeted D10–D13 continuation pass.

---

| 🟢 Cosmetic gaps | ER-21/25, CM-13/20/21/25, AL-12/13/21 vacant IDs | Cosmetic | LOW |

---

*README-CRISPY v17 — Agent 2 — 6 April 2026 — Pass 12 complete. Pass 11: Groups C (C3–C6) and D (D1–D9 complete; D10–D14 skipped). Pass 12: C7 complete (40 × §13 *(verify)* stubs added to DOI-VERIFICATION-TRACKER); D10–D14 confirmed closed (all §1/§4/§12/§15/§17 flag content confirmed as already captured or permanently absent); D14 (§12) formally RESOLVED. Finding #135 (footer qualifier): this footer now reflects v17-PASS12-FINAL as the current corpus state. All ★ items await Crispy Opus 4.6 decision.*
