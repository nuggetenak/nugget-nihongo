# NUGGET NIHONGO — AUDIT MASTER INDEX (Passes 1–10 FINAL)
**Auditor:** Agent 2 Sonnet 4.6 | **Corpus:** v17-PASS10-FINAL | **Compiled:** 6 April 2026 | **Updated:** 6 April 2026 (Pass 10 FINAL)
**Purpose:** Complete reference for Crispy Opus 4.6 — replaces all prior pass documents.
**Total findings:** 136 | 🔴 Critical: 24 | 🟠 High: 65 | 🟡 Medium: 41 | 🟢 Low: 6
**Passes summary:** P1–P6 = #1–#95 | P7 = #96–#116 (21 new) | P8 = #117–#136 (20 new) | P9 = SESSION C mechanical execution complete (~96% coverage) | P10 = Bibliography mechanical cleanup complete (~99% coverage)

---

## CORRECTIONS TO PRIOR FINDINGS (apply before using tables)

| Finding | Correction |
|---|---|
| #11, #12b | OT-31 and OT-32 ARE assigned (bib lines 1166–1168). Remaining: Crispy decides include/remove; remove "pending Agent 2" flags. |
| #18 | `\1` journal corruption count: prior said 8 — **actual is 9** (bib lines 1498–1514, nine distinct entries). |
| #19 | Cluster Summary Table TOTAL row = 727. Subtotals to **719** (arithmetic error = −8). Actual unique IDs = **663**. Finding now triples in scope — see #96. |
| #34 | Scope expanded: delivery footers NOT stripped also in §5 (lines 1052–1055, 1395–1399) and §14 (lines 345–346). Prior finding listed §16 and §17 only. |
| #53 | Concatenation error count: prior said 7 lines — **8th confirmed** at bib line 1412 (TE-17 + KR-05 on same line). |
| #56 | EXPANDED by #69/#70. CC-01–CC-16 absent from bibliography AND from §8 body. §13 and DDM CC refs are doubly phantom. |
| #80 | Scope confirmed as severe: CLAUDE.md and README-CRISPY show only DUP-01/02/03. DUP-04 through DUP-11 absent from ALL three management documents (CLAUDE.md, README-CRISPY, INDEX.md). |
| #91 | CT-15 = AV-02 (Ginns 2005 *Learning and Instruction* 15(4)) — same paper carries two cluster IDs. CT-20 = CL-01 (Sweller 1988 *Cognitive Science*) — same paper carries two cluster IDs. Both cross-assignments documented in §9 body (lines 529, 555) but never resolved. |
| #92 | Sweller 1988 triple-identifier situation extends further: §8 body cites it inline at line 692 with `[V1]` tag (no cluster ID) — a fourth reference with a third status. |
| #96 (AV row) | Table claims 11 AV entries; actual is 10. AV-01 additionally confirmed as actively cited in §9 with full data — it is a missing bibliography entry, not just a phantom ID. |
| GL-08 §1 | FALSE ALARM. GL-08 = Dunlosky et al. 2013 *PSPI*; §1 has Bjork, Dunlosky & Kornell 2013 *Annual Review* — different paper. No duplicate. |
| DUP table | DUP-08, DUP-09, DUP-10, DUP-11 confirmed in Pass 7. No new DUPs in Pass 8. Watch List gains AL-14 (Gardner 1985). |

---

## CONFIRMED CLEAN FILES (do not re-audit unless new evidence)

`compass_artifact.md` | `PLATFORM-RESEARCH-AGENDA.md` (except #36) | all `archive/gap-analysis/` files | all `archive/dispatch-briefs/` | all `archive/absorbed-dispatch/` | `SECTION1-EVIDENCE-BASED.md` (beyond #2, #58) | `SECTION2-GRAMMAR.md` (beyond #2, #3, #12) | `SECTION3-LISTENING.md` (beyond #7, #118) | `SECTION4-ER.md` | `SECTION5-CONTRASTIVE.md` (beyond #5, #27, #61, #65, #130, #133) | `SECTION10-GAMIFICATION-HABIT.md` | `SECTION11-PHONOLOGY.md` | `SECTION12-OUTPUT-THEORY.md` (beyond #49, #75, #100) | `SECTION13-INDIVIDUAL-DIFFS.md` (beyond #70, #73) | `SECTION15-SSW.md` (beyond #102) | `SECTION16-CALL.md` (beyond #71, #72) | `SECTION17-ADULT.md` (beyond #26) | `DOI-VERIFICATION-TRACKER.md` (beyond existing findings) | `OPUS-SUGGESTIONS-v5.md` (beyond #87, #95) | `§GA-13` conflict in CLAUDE.md (no action, false alarm)

---

## MASTER FINDING TABLE

### 🔴 CRITICAL — 24 items

| # | 1-line description | File(s) |
|---|---|---|
| 1 | Strip agent colophons/footers from 13+ section files | All SECTION*.md |
| 2 | Remove duplicate H1 headers in merged files (keep only first H1) | §1,§2,§3,§4,§5,§9,§14,§16,§17,§CA |
| 3 | Remove pre-merge housekeeping blocks (Agent 18 handoff notes, "Merge notes for Agent 2", etc.) | §2,§3,§4,§14 |
| 16 | DUP-03 wrong bibliographic details in README-CRISPY + CLAUDE.md — Cook H.M. not V., wrong title/publisher | README-CRISPY, CLAUDE.md |
| 17 | Delete lines 1696–1697 in bibliography — orphaned duplicate SM-09/SM-10 | MASTER-BIBLIOGRAPHY-FINAL.md |
| 18 | 39 SUPPLEMENT entries unassigned cluster IDs; 13 bare stubs (author+year only); **9** entries have `\1` journal placeholder corruption | MASTER-BIBLIOGRAPHY-FINAL.md |
| 19 | Cluster Summary Table TOTAL row = 727; subtotals to 719 (arithmetic −8); actual unique IDs = **663** — see #96 for full breakdown | MASTER-BIBLIOGRAPHY-FINAL.md |
| 24 | DDM: strip agent headers (lines 1–9, 687–695); remove 2 extra H1s; remove 3 "Agent 33 to confirm" refs; remove Part 1 colophon; remove line 1431 Part 2 footer; update corpus version ~879→747 | DESIGN-DECISION-MASTER-v1.md |
| 53 | **8** bibliography lines with multiple entries concatenated on single lines — ≥16 entries affected (bib lines 940, 964, 1156, 1192, 1232, 1250, 1412 + confirmed 8th) | MASTER-BIBLIOGRAPHY-FINAL.md |
| 54 | ~200-word workflow note block embedded inside GI-01 bibliography entry (bib line 806); extract §10.8/§1 cross-ref flag to README-CRISPY | MASTER-BIBLIOGRAPHY-FINAL.md, README-CRISPY |
| 69 | §8 MV cluster ENTIRELY ABSENT from bibliography — 97 §8 citations carry only [V1]/[NEW-v2] version tags, zero cluster IDs; MV listed in domain table but has 0 entries | MASTER-BIBLIOGRAPHY-FINAL.md, SECTION8-PWA.md |
| 70 | §13 cross-references "§8 [CC-01–CC-07]" five times — doubly phantom: CC cluster doesn't exist AND §8 has zero cluster IDs anywhere | SECTION13-INDIVIDUAL-DIFFS.md, DESIGN-DECISION-MASTER-v1.md |
| 87 | OPUS-SUGGESTIONS-v5 Session C plan is missing the largest discovered tasks (§8 MV cluster, 10+ others from Passes 3–5); needs v6 rewrite | OPUS-SUGGESTIONS-v5.md → create v6 |
| 90 | CLAUDE.md status table says "16 sections complete, merged, clean" — FALSE for §8 (97+ untagged citations, wrong DOI, stale counts) | CLAUDE.md |
| 95 | OPUS-SUGGESTIONS-v5 does not reference the audit passes — Crispy will begin Session A blind to 136 findings | OPUS-SUGGESTIONS-v5.md → v6 |
| **96** | **Cluster Summary Table: 56-entry phantom overcount across 17 clusters (table subtotals to 719; actual unique IDs = 663)** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **97** | **DUP-08: Blum-Kulka, House & Kasper (1989) carries three cluster IDs — SC-10 = SC-23 = CP-07** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION14-SOCIO.md, SECTION5-CONTRASTIVE.md** |
| **98** | **DUP-09: Ohta (2001) *SLA Processes in the Classroom* carries two IDs — SC-09 = CP-57** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION14-SOCIO.md** |
| **99** | **DUP-10: Kasper & Rose (2002) *Pragmatic Development* carries two IDs — SC-15 = SC-08** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION14-SOCIO.md** |
| **100** | **DUP-11: Swain (1985) *Communicative Competence* carries two cluster IDs — OT-01 = KR-09; §1 body tags it [NEW] = third orphaned reference** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION12-OUTPUT-THEORY.md, SECTION1-EVIDENCE-BASED.md** |
| **101** | **FS cluster: 5 of 9 summary-table entries are entirely phantom — FS-03, FS-05, FS-06, FS-08, FS-09 do not exist anywhere in corpus** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **102** | **VS-01, VS-02, VS-04, VS-06 actively cited in §15 body with full data but absent from bibliography** | **SECTION15-SSW.md, MASTER-BIBLIOGRAPHY-FINAL.md** |
| **117** | **AV-01 (Mayer & Moreno 1998) absent from bibliography; full entry data confirmed in §9 citation table line 446** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION9-MULTIMEDIA.md, SECTION3-LISTENING.md** |
| **118** | **LS-02 (Rost 2011) absent from bibliography; full entry data confirmed in §3 citation table line 165** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION3-LISTENING.md** |

---

### 🟠 HIGH — 65 items

| # | 1-line description | File(s) |
|---|---|---|
| 4 | Bibliography statistics say "Stubs remaining: 0" — actual minimum is 7 (AL×2, CM×2, ER×2, SC×1) + 13 SUPPLEMENT bare stubs + 1 conditional (CV-05) | MASTER-BIBLIOGRAPHY-FINAL.md |
| 5 | **REVISED SCOPE:** §5.5.28 GA-07 backfill — Itomitsu (2009) is entirely absent from §5.5.28 narrative; requires new sentence, not just a tag | SECTION5-CONTRASTIVE.md |
| 6 | GI-02 (Faisal & Hijriya 2021) still flagged "confirm this paper exists" — existence unverified | SECTION10-GAMIFICATION-HABIT.md |
| 7 | SECTION3 line 224: cross-reference says "LS-01–LS-14" should be "LS-01–LS-11" (LS-12–14 are acknowledged gaps) | SECTION3-LISTENING.md |
| 8 | §16 H1 title inconsistency — L1 says "§16 CALL/MALL:" vs L18 says "§16: CALL/MALL" | SECTION16-CALL.md |
| 9 | DOI-VERIFICATION-TRACKER has 42 entries but bibliography has 65+ unverified markers — ~23 entries missing from tracker | MASTER-BIBLIOGRAPHY-FINAL.md, DOI-VERIFICATION-TRACKER.md |
| 10 | INDEX.md archive quick reference table missing GAP-ANALYSIS v1 and v3 | INDEX.md |
| 20 | SE and IF are phantom cluster codes in domain coverage table — zero entries exist for either | MASTER-BIBLIOGRAPHY-FINAL.md |
| 21 | SM cluster (SM-09, SM-10) has no row in cluster summary table and not listed in domain coverage table | MASTER-BIBLIOGRAPHY-FINAL.md |
| 22 | CC-17 (Triandis & Gelfand 1998) is in SUPPLEMENT block, not in `### CC` cluster section | MASTER-BIBLIOGRAPHY-FINAL.md |
| 23 | 5 CA-cluster potential duplicates (CA-14, CA-15, CA-22, CA-23, CA-44) pending Agent 38 — not in README-CRISPY | README-CRISPY |
| 25 | §16 merge coordination header block (lines 2–16) still present; CM-13/CM-25 availability notes (lines 163–164) still present | SECTION16-CALL.md |
| 26 | §17 merge coordination header (lines 2–16) still present; AL-07 Bandura (1997) potential duplicate with §13 ID cluster not in open flags | SECTION17-ADULT.md, README-CRISPY |
| 27 | §5.6 addendum full metadata block (lines 1061–1069) still present after §5.6 H1 | SECTION5-CONTRASTIVE.md |
| 28 | CV-05 (Qi & Mitchell 2012) is conditional/unverified — zero bibliographic data — not tracked in open flags | SECTION1-EVIDENCE-BASED.md, MASTER-BIBLIOGRAPHY-FINAL.md, README-CRISPY |
| 29 | INDEX.md citation-audit archive listing shows only v9/v10/v11 — missing v3–v7 (in both tree view and quick reference table) | INDEX.md |
| 38 | DOI tracker: GA-08/GA-09/LS-19 flag descriptions are blank; tracker source version is still "v5"; PR-02/KS-09/OD-07 is a potential triple duplicate not added | DOI-VERIFICATION-TRACKER.md |
| 39 | CORPUS-HANDOFF.md says 8 known duplicates; README-CRISPY documents only 3 (DUP-01/02/03) — reconciliation note needed | README-CRISPY, README-ARCHIVE.md |
| 42 | §10 FLAGS B–F (GX-05 details, Hamari count, GF-02 DOI, §10.6/§8.11 boundary, GX-04 vs MV-02) not in README-CRISPY; §10-F is a DUP candidate | README-CRISPY, SECTION10-GAMIFICATION-HABIT.md |
| 44 | §8 Flags 1–7 not in README-CRISPY; Flag 2 (FSRS kanji difficulty priors) and Flag 7 (WCAG audit) are actionable pre-launch items | README-CRISPY |
| 45 | 11 VD-cluster entries (VD-04/05/08/09/11/12/13/14/16/20/21) absent from DOI tracker — all have plausible DOIs | DOI-VERIFICATION-TRACKER.md |
| 46 | DDM CROSS-CONFLICT FLAGS A/B (design conflicts) and D/E (DUP-04/DUP-05 candidates) not in README-CRISPY | README-CRISPY, DESIGN-DECISION-MASTER-v1.md |
| 52 | GA-08 (Mori 2002) is a citation relevance mismatch — cited for particle sequencing but paper is on task design/talk-in-interaction | README-CRISPY, SECTION2-GRAMMAR.md |
| 56 | CC cluster: CC-01–CC-16 have zero bibliography entries; Markus & Kitayama (1991) tagged [INLINE] not CC-XX; CC-02 in §1 is a dangling reference | MASTER-BIBLIOGRAPHY-FINAL.md, SECTION1-EVIDENCE-BASED.md |
| 57 | CP-64 = EA-03 (Selinker 1972 *Interlanguage*) — self-declared duplicate in bibliography, never resolved — DUP-06 confirmed | README-CRISPY, MASTER-BIBLIOGRAPHY-FINAL.md, SECTION5 |
| 58 | Swain (1985) in §1 body (line 577) and §1.6 citation table has no cluster ID tag — should be [KR-09] (chain: also OT-01 = KR-09 per DUP-11) | SECTION1-EVIDENCE-BASED.md |
| 59 | §11 FLAGS A–D (PH-23 delete candidate, PH-21 scope restriction, PH-40–44 speculative cluster label, PH-03 DOI) not in README-CRISPY | README-CRISPY, MASTER-BIBLIOGRAPHY-FINAL.md |
| 60 | §14 FLAGS A–D (SC-15/SC-20/SC-22/SC-23 DOI/ISBN checks) not in DOI tracker; §14→§12 and §14→§8 cross-ref flags not in README-CRISPY | DOI-VERIFICATION-TRACKER.md, README-CRISPY |
| 62 | §9.10-A: OD-03 DOI in three-way conflict (brief vs section table vs bibliography); §9.10-E: response latency as FSRS signal — engineering item | README-CRISPY, DOI-VERIFICATION-TRACKER.md |
| 66 | CP-68 (Sudipa 2020) has zero confirmed bibliographic data; cited for load-bearing statistics (6%/11%/18% error rates) in §5 and §11 | README-CRISPY, DOI-VERIFICATION-TRACKER.md |
| 71 | §16: CM-20 and CM-21 declared "freed" in merge header but still actively cited in Agent 25 body — orphaned IDs at lines 259, 279, 305, 323, 325, 327, 337 | SECTION16-CALL.md |
| 72 | Plonsky & Ziegler (2016): three section files + bibliography — two IDs (CM-03, CM-20), URL discrepancy (underscore vs no underscore in §8) | SECTION8-PWA.md, SECTION-CA-CURRICULUM.md, MASTER-BIBLIOGRAPHY-FINAL.md |
| 73 | §13 has 34 DOI-pending entries marked *(verify)* — zero ID-cluster entries in DOI tracker | DOI-VERIFICATION-TRACKER.md |
| 80 | DUP-04, DUP-05, DUP-06 not in CLAUDE.md or README-CRISPY DUP tables (Pass 8 confirms DUP-04 through DUP-11 ALL absent) | CLAUDE.md, README-CRISPY |
| 81 | Citation Audit v11 has 29 active flags; README-CRISPY open flags table has only 12 entries — 17 flags never reconciled (enumerated in #111) | README-CRISPY |
| 85 | Lamb (2012) in §8 line 1321 has Kornell & Bjork (2008) DOI — wrong DOI on a key Indonesian motivation citation | SECTION8-PWA.md, DOI-VERIFICATION-TRACKER.md |
| 88 | Citation Audit v11 expected MV-01/MV-02 as existing IDs — MV cluster was pipeline-expected, not optional; pipeline produced a false-clean trail | MASTER-BIBLIOGRAPHY-FINAL.md |
| 89 | Citation Audit v11 declared §16 CM-20/CM-21 "resolved at merge" — FALSE; still active in Agent 25 body (finding #71) | README-CRISPY |
| 91 | §9 CT cluster: CT-01 and CT-10 genuinely absent; CT-15 = AV-02, CT-20 = CL-01 — all four inflating both CT and partner-cluster counts | MASTER-BIBLIOGRAPHY-FINAL.md, SECTION9-MULTIMEDIA.md |
| 92 | Sweller (1988): §9 cites as CT-20, bibliography canonical is CL-01, §8 has [V1] — three identifiers for one paper + fourth untagged §8 body ref | SECTION9-MULTIMEDIA.md, SECTION8-PWA.md |
| 93 | CP-09 = ER-20 (Chikamatsu 1996 SSLA) — self-declared DUP in bibliography, identical bibliographic data — DUP-07 confirmed | README-CRISPY, CLAUDE.md |
| **103** | **SC-09 (= CP-57, DUP-09) and SC-15 (= SC-08, DUP-10) actively cited in §14 body — §14 references must be updated to canonical IDs** | **SECTION14-SOCIO.md, MASTER-BIBLIOGRAPHY-FINAL.md** |
| **104** | **OD-12 (Mori 1998, MLJ 82(1), DOI verified) cited in §9 citation table but absent from bibliography** | **SECTION9-MULTIMEDIA.md, MASTER-BIBLIOGRAPHY-FINAL.md** |
| **105** | **OD-03 has NO DOI in bibliography entry; §9 body and dispatch brief carry two conflicting DOIs** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION9-MULTIMEDIA.md** |
| **106** | **§14 Part 2 dispatch header block still present (lines 127–140)** | **SECTION14-SOCIO.md** |
| **107** | **SM cluster: SM-01–SM-08 entirely phantom; no `### SM` section exists; domain coverage table implies SM is populated** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **108** | **TE-02 missing from bibliography; TE cluster count overclaimed by 1 (table claims 17; actual 16)** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **109** | **SR cluster: SR-06, SR-12, SR-16 phantom IDs — never cited, never created; count overclaimed by 3 (table claims 17; actual 14)** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **110** | *(Cross-reference: FS phantom cluster — see #101 CRITICAL above)* | MASTER-BIBLIOGRAPHY-FINAL.md |
| **111** | **README-CRISPY open flags table: 17 flags missing vs Citation Audit v11 (29 actual; 12 listed)** | **README-CRISPY.md** |
| **112** | **CT cluster: 4 phantom entries; summary table overclaims by 4 (CT-01 and CT-10 genuinely absent; CT-15=AV-02, CT-20=CL-01 double-assigned)** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **119** | **CLAUDE.md DUP table and Open Items list: DUP-04 through DUP-11 entirely absent; "3 pairs" status row incorrect; post-cleanup count formula invalidated** | **CLAUDE.md** |
| **120** | **§14 delivery footers not stripped (lines 345–346): Agent 19 attribution and corpus version stale** | **SECTION14-SOCIO.md** |
| **121** | **§14 agent-addressed flag blocks embedded in merged body (lines 324–342): FLAGS FOR AGENT 37 and FLAGS FOR AGENT 38 still present** | **SECTION14-SOCIO.md** |
| **122** | **§14 line 339 cross-reference "OT-01–OT-05" uses DUP-11 phantom ID — must become "KR-09, OT-02–OT-05" post-resolution** | **SECTION14-SOCIO.md, SECTION12-OUTPUT-THEORY.md** |
| **123** | **DDM Part 2 delivery footer not stripped (line 1431): "Agent 33 — Corpus v10 — 3 April 2026"** | **DESIGN-DECISION-MASTER-v1.md** |
| **124** | **CURRICULUM-BLUEPRINT: DUP-04 and DUP-05 claimed "confirmed" — they are candidates; post-resolution formula (L260) is pre-emptive** | **blueprint/CURRICULUM-BLUEPRINT-v1.md** |
| **125** | **CP cluster: four entry-pairs embed companion IDs inside "Note: distinct from…" clauses — automated ID-extraction and deduplication tooling risk** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **126** | **INDEX.md §CA Key Clusters lists "SCA" — not an existing bibliography cluster code** | **INDEX.md** |

---

### 🟡 MEDIUM — 41 items

| # | 1-line description | File(s) |
|---|---|---|
| 11 | **REVISED:** OT-31/32 IDs ARE assigned; Crispy decides include/remove; remove "conditional: pending Agent 2" flags | SECTION12, MASTER-BIBLIOGRAPHY-FINAL.md |
| 12 | Remove HTML merge comments from section files | §2,§3,§5,§8,§14 |
| 13 | §9 addendum metadata: unclosed bold `**Target: §9.10…` should be `**Target:** §9.10…` | SECTION9-MULTIMEDIA.md |
| 14 | VS-14 and VS-15 are undocumented vacant IDs (not flagged anywhere unlike LS-12–14 and SC-12–14) | SECTION15-SSW.md, MASTER-BIBLIOGRAPHY-FINAL.md |
| 15 | All section `Status:` fields still say "For Crispy's review and merge decision" — should be "Canonical — v17" | All section headers |
| 31 | Lamb 2004 DOI mismatch: bibliography [CA-23] = `.08.002` vs §8 compass [V1] = `.04.002` — one is wrong | MASTER-BIBLIOGRAPHY-FINAL.md, SECTION8-PWA.md |
| 32 | HANDOFF-AGENT2-v14.md says ~880 citations/21 sections — current is 747/16; disambiguation note needed since it's a required pre-read per OPUS-SUGGESTIONS | HANDOFF-AGENT2-v14.md |
| 33 | Bibliography stub count line: "Stubs remaining: 0" — should reflect minimum 7 + 13 SUPPLEMENT + 1 conditional (CV-05) | MASTER-BIBLIOGRAPHY-FINAL.md |
| 34 | §16 delivery footers (lines 168, 336) and §17 delivery footers not stripped; §5 lines 1052–1055 and 1395–1399 also not stripped; §14 lines 345–346 not stripped | SECTION16-CALL.md, SECTION17-ADULT.md, SECTION5-CONTRASTIVE.md, SECTION14-SOCIO.md |
| 35 | CA-23 (Lamb 2004) is a probable duplicate of a §8 citation — stronger language than the 5 Watch List candidates in #23 | README-CRISPY |
| 37 | INDEX.md tree view missing gap-analysis v1+v3 and citation-audit v3–v7; v17 history row says "28 files" should be "27" | INDEX.md |
| 41 | Agents 32/33 have open DDM FLAG items (A–E + §9.10.7-C) not listed in README-CRISPY agent verdicts tracking | README-CRISPY |
| 43 | EA-04/05/07/17/18/20 not in DOI tracker (EA cluster has zero entries); §5.6-D (EA-12 Long 2003 page range unconfirmed) not in README-CRISPY | DOI-VERIFICATION-TRACKER.md, README-CRISPY |
| 47 | §CA Flags 2 (JLPT-CEFR alignment), 3 (Indonesian needs analysis gap), 5 (FSRS predictive validity) not in README-CRISPY | README-CRISPY |
| 48 | Inline agent allocation notes in §16 body (lines 24, 112, 163–164, 319) and §17 body (lines 98, 164) — agent-attributed cross-references | SECTION16-CALL.md, SECTION17-ADULT.md |
| 49 | §12 line 242: "Note untuk Agent 2" wrapper still in body; line 280: section header is "## FLAGS UNTUK AGENT 2" | SECTION12-OUTPUT-THEORY.md |
| 51 | §CA.10 addendum contains verbatim duplicate of §8 Flags 1–8 block — canonical location is §8 only | SECTION-CA-CURRICULUM.md |
| 61 | §5 taxonomy tables: "Agent 11 Extension" / "Agent 11 v1" / "Agent 11 v2" labels in data columns — should be neutral content labels | SECTION5-CONTRASTIVE.md |
| 63 | §3 line 156: FSRS audio/visual scheduling gap is a buried engineering note — should be in README-CRISPY alongside §8 Flag 2 and §9.10-E as FSRS Sprint Items | README-CRISPY |
| 64 | §3/§9 audio display table alignment check was assigned to Agent 38 — not in README-CRISPY pending verdicts | README-CRISPY |
| 65 | §5 lines 91 and 114 attribute research decisions to "Agent 1 (Crispy)" inside canonical content — needs rewrite | SECTION5-CONTRASTIVE.md |
| 67 | CURRICULUM-BLUEPRINT-v1.md says DOI unverified rate ~1.1% (~10/~880) — actual is ~5.6% (42/747+); needs v14-snapshot disclaimer | CURRICULUM-BLUEPRINT-v1.md |
| 74 | DOI tracker footer says "from bibliography v5" — now at v6 (11 new entries in v6 not captured) | DOI-VERIFICATION-TRACKER.md |
| 75 | §12 dispatch header block lines 3–8 ("Status: For Agent 2 audit", corpus baseline, etc.) not stripped; OT DOI flags in FLAGS UNTUK AGENT 2 section need migration to tracker | SECTION12-OUTPUT-THEORY.md |
| 76 | §16 has three delivery footers still present (lines 168, 336–338); Part 2 footer inflates citation count by 2 (CM-20/CM-21 counted) | SECTION16-CALL.md |
| 77 | DDM uses two inconsistent CC ID ranges for same phantom cluster: CC-03–CC-07 (line 1051) vs CC-01–CC-07 (line 1132) | DESIGN-DECISION-MASTER-v1.md |
| 78 | GE-04 (Van Roy & Zaman 2018) appears twice in bibliography — line 786 (no DOI) and line 1192 (has DOI, embedded in concatenation error) | MASTER-BIBLIOGRAPHY-FINAL.md |
| 79 | DDM FLAGS A (audio standard conflict §11 vs §8) and B (notification window conflict §10 vs §8) still addressed to "Agent 2" — need Crispy resolution | README-CRISPY, DESIGN-DECISION-MASTER-v1.md |
| 82 | §CA has three contradictory citation total claims: 86 (summary table) vs ~112 (lines 16 and 1428) — neither derivation is reconciled | SECTION-CA-CURRICULUM.md, CLAUDE.md, README-CRISPY |
| 83 | §CA expansion table: §CA.2 and §CA.9 rows say "+4" but list 5 authors each — arithmetic inconsistency | SECTION-CA-CURRICULUM.md |
| 84 | §8 has three contradictory internal citation count claims: 107 (header), 97 (actual tag count v1+v2), ~145 (Citation Audit v11) | SECTION8-PWA.md |
| 86 | §8 lines 35 and 1128 state "Combined corpus total: ~330+ citations" — actual v17 corpus is 747 | SECTION8-PWA.md |
| 94 | §9 FLAG 4 (Gap B gamification has no corpus home) and FLAG 6 (adaptive templates dependency — engineering confirmation needed) not in README-CRISPY | README-CRISPY |
| **113** | **SC cluster: table claims 26; actual 21; SC-09→CP-57 (DUP-09), SC-10→CP-07 (DUP-08), SC-12/13/14 cosmetic gaps, SC-15→SC-08 (DUP-10), SC-23 is DUP-08 duplicate in bib (delete)** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **114** | **VS cluster: table claims 26; actual 21; VS-01/02/04/06 missing (add from §15 data); VS-14/15 cosmetic vacant; VS-22=SC-05 (DUP-03, retire)** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION15-SSW.md** |
| **115** | **OT cluster: table claims 32; actual 29; OT-01=KR-09 (DUP-11); OT-16 fully phantom (no paper ever assigned); OT-18 unverified in §12 FLAGS** | **MASTER-BIBLIOGRAPHY-FINAL.md, SECTION12-OUTPUT-THEORY.md** |
| **116** | **DD-05 absent from bibliography and from any section body; DD cluster count overclaimed by 1 (table claims 8; actual 7)** | **MASTER-BIBLIOGRAPHY-FINAL.md** |
| **127** | **CLAUDE.md §CA count "~107" adds 4th contradictory total for §CA citations (86 / ~112 / ~107 / ~107); no derivation documented** | **CLAUDE.md, SECTION-CA-CURRICULUM.md, README-CRISPY.md** |
| **128** | **INDEX.md §8 Key Clusters lists phantom/non-standard codes: MV (phantom), CC (phantom), MALL (not a cluster code), SM (effectively phantom) — only IM is real** | **INDEX.md** |
| **129** | **INDEX.md §1 Key Clusters lists confirmed phantom codes SE and IF, and largely-phantom FS** | **INDEX.md** |
| **130** | **§5 delivery footers not stripped: lines 1052–1055 (§5.5 addendum) and 1395–1399 (§5.6 addendum)** | **SECTION5-CONTRASTIVE.md** |
| **131** | **CURRICULUM-BLUEPRINT stale statistics throughout: "736" total citations (now 747), "~880" DOI base (now 747), "56" DOI pending (now 42), "0 stubs" (false)** | **blueprint/CURRICULUM-BLUEPRINT-v1.md** |
| **132** | **CURRICULUM-BLUEPRINT L498: Matsunaga (1999) action item buried in body, not in README-CRISPY, CLAUDE.md, or OPUS-SUGGESTIONS; cross-links to §8 Flag 2 needed** | **blueprint/CURRICULUM-BLUEPRINT-v1.md, README-CRISPY** |
| **133** | **§5.5.2.5 section heading "Crispy's 7 Core Interference Points vs. Agent 11's Extended Set" embeds agent names in permanent canonical heading** | **SECTION5-CONTRASTIVE.md** |
| **134** | **README-CRISPY Post-Decision Entry Count table (lines 119–125) invalidated: was built for 3 DUPs; now 11 confirmed; must be rebuilt with full DUP/addition arithmetic** | **README-CRISPY.md** |

---

### 🟢 LOW — 6 items

| # | 1-line description | File(s) |
|---|---|---|
| 30 | README-ARCHIVE.md footer says "28 files" — should be "27 files" | README-ARCHIVE.md |
| 36 | PLATFORM-RESEARCH-AGENDA.md Flag 8 row references "Agent 2 audit items" — replace with "v2 audit flags" | PLATFORM-RESEARCH-AGENDA.md |
| 40 | No archive note for 7 BIBLIO-34A/B/C/F/35A/B/C files absorbed into bibliography — traceability gap only | README-ARCHIVE.md |
| 68 | OT-31/32 bibliography entries say "conditional: pending Agent 2 budget confirmation" — stale language; route to Crispy decision | MASTER-BIBLIOGRAPHY-FINAL.md |
| **135** | **README-CRISPY footer (line 208) contains three stale claims: "7 stubs remain", "3-entry DUPLICATE FLAG TABLE", "747 citations"** | **README-CRISPY.md** |
| **136** | **INDEX.md version history v17 entry: "28 files" wrong — actual count is 27** | **INDEX.md** |

---

## DUPLICATE FLAG TABLE — COMPLETE (11 confirmed, 4 candidates)

| DUP # | Pair | Status | Finding # |
|---|---|---|---|
| DUP-01 | GA-09 = GA-19 (Kanno 2007 SSLA) | Confirmed — Crispy decision pending | Pass 1 |
| DUP-02 | LS-01 = LS-06 (Vandergrift 2007 Lang Teaching) | Confirmed — Crispy decision pending | Pass 1 |
| DUP-03 | SC-05 = VS-22 (Cook H.M. 2008) | Confirmed — wrong description in README-CRISPY | #16 |
| DUP-04 | ER-05 vs BC-08 (Hu & Nation 2000) | **Candidate** — Agent 38 pending | #46 |
| DUP-05 | ER-10 vs OT-25–30 (Webb 2007) | **Candidate** — Agent 38 pending | #46 |
| DUP-06 | CP-64 = EA-03 (Selinker 1972 *Interlanguage*) | Confirmed — self-declared in bibliography | #57 |
| DUP-07 | CP-09 = ER-20 (Chikamatsu 1996 SSLA 18(4)) | Confirmed — self-declared in bibliography | #93 |
| DUP-08 | SC-10 = SC-23 = CP-07 (Blum-Kulka, House & Kasper 1989) | **Confirmed — triple ID**; canonical = CP-07 | #97 |
| DUP-09 | SC-09 = CP-57 (Ohta 2001 *SLA Processes in the Classroom*) | Confirmed; canonical = CP-57 | #98 |
| DUP-10 | SC-15 = SC-08 (Kasper & Rose 2002 *Pragmatic Development*) | Confirmed; canonical = SC-08 | #99 |
| DUP-11 | OT-01 = KR-09 (Swain 1985 *Communicative Competence*) | Confirmed; canonical = KR-09 | #100 |

**Watch List (Agent 38 pending):** CA-14, CA-15, CA-22, CA-23, CA-44 (#23) | AL-07 Bandura (1997) vs §13 ID cluster (#26) | AL-14 Gardner (1985) vs §13 ID cluster (Pass 8 addition) | GX-04 vs MV-02 Ryan & Deci (2000) (#42/#69) | PR-02/KS-09/OD-07 potential triple (#38)

**DUP resolution actions for Crispy:**
- DUP-08: retire SC-10 stub in §14; delete SC-23 from bibliography; update §14 refs to CP-07
- DUP-09: retire SC-09 stub in §14; update §14 refs to CP-57
- DUP-10: retire SC-15 stub in §14; update §14 refs to SC-08; §14 line 339 OT-01→KR-09 also applies
- DUP-11: retire OT-01 in §12; update §12 refs to KR-09; fix §1 body line 577 [NEW] tag to [KR-09]

---

## PHANTOM CLUSTER CODES — COMPLETE

| Code | Expected content | Status |
|---|---|---|
| SE | Spaced Repetition Evidence | Listed in domain table; zero entries — **CONFIRMED PHANTOM** |
| IF | Interleaving/Feedback | Listed in domain table; zero entries — **CONFIRMED PHANTOM** |
| CC-01–CC-16 | Cross-cultural psychology (malu/face) | Domain table lists CC; only CC-17 in SUPPLEMENT; all §8 and §13 CC cross-refs are dangling — **CONFIRMED PHANTOM** |
| MV | §8 motivation cluster | Domain table lists MV; 97 §8 citations have [V1]/[NEW-v2] tags but zero MV-XX IDs assigned — **CONFIRMED PHANTOM** |
| SM-01–SM-08 | Social Media / MALL sub-cluster | No `### SM` section; SM-09/SM-10 in SUPPLEMENT only; SM-01–08 never created — **NEW CONFIRMED PHANTOM** |
| SCA | §CA sub-cluster | Listed in INDEX.md §CA Key Clusters; no `### SCA` section, zero [SCA-XX] tags anywhere — **CONFIRMED PHANTOM** |
| FS-03, 05, 06, 08, 09 | Four Strands / Fluency sub-entries | Reserved IDs; never cited, never created — 5 phantom IDs within existing cluster |
| SR-06, SR-12, SR-16 | Spaced Repetition sub-entries | Reserved IDs; never cited, never created — 3 phantom IDs within existing cluster |
| TE-02 | Testing Effect sub-entry | Never created — 1 phantom ID within existing cluster |
| DD-05 | Desirable Difficulties sub-entry | Never created — 1 phantom ID within existing cluster |

---

## MISSING BIBLIOGRAPHY ENTRIES — COMPLETE LIST

Entries cited in section files with full bibliographic data but absent from MASTER-BIBLIOGRAPHY-FINAL.md. All 7 are executable in Session C without Crispy decision.

| ID | Paper | Data source | Priority |
|---|---|---|---|
| AV-01 | Mayer, R. E., & Moreno, R. (1998). A split-attention effect in multimedia learning. *Journal of Educational Psychology, 90*(2), 312–320. [DOI in §9 line 446] | §9 line 446 | 🔴 #117 |
| LS-02 | Rost, M. (2011). *Teaching and Researching Listening* (2nd ed.). Pearson Longman. ISBN 978-1-4082-0619-3 | §3 line 165 | 🔴 #118 |
| VS-01 | Hutchinson, T., & Waters, A. (1987). *English for Specific Purposes*. Cambridge University Press. | §15 lines 14, 92–102 | 🔴 #102 |
| VS-02 | Dudley-Evans, T., & St John, M. J. (1998). *Developments in English for Specific Purposes*. Cambridge University Press. | §15 lines 16, 92–102 | 🔴 #102 |
| VS-04 | Long, M. H. (Ed.). (2005). *Second Language Needs Analysis*. Cambridge University Press. | §15 lines 22, 92–102 | 🔴 #102 |
| VS-06 | Japan Foundation. (2019). JFT-Basic overview [grey literature]. | §15 lines 42, 92–102 | 🔴 #102 |
| OD-12 | Mori, Y. (1998). *Modern Language Journal, 82*(1), 69–82. DOI: 10.1111/j.1540-4781.1998.tb02598.x | §9 line 679 | 🟠 #104 |

---

## CLUSTER SUMMARY TABLE — ACTUAL COUNTS (Pass 7 verified)

| Cluster | Table claims | Actual unique IDs | Phantom gap | Notes |
|---|---|---|---|---|
| AL | 22 | 19 | 3 | AL-03, AL-12, AL-13 |
| AV | 11 | 10 | 1 | AV-01 absent (add from §9) |
| CA | 54 | 48 | 6 | CA-01, CA-05, CA-07, CA-20, CA-25, CA-33 |
| CM | 25 | 20 | 5 | CM-13, CM-20, CM-21 known vacant + CM-22 absent |
| CT | 20 | 16 | 4 | CT-01/CT-10 absent; CT-15=AV-02; CT-20=CL-01 |
| DD | 8 | 7 | 1 | DD-05 |
| EA | 22 | 21 | 1 | EA-03 = CP-64 (DUP-06) |
| ER | 28 | 22 | 6 | ER-05, ER-10, ER-20, ER-21, ER-25; ER-20=CP-09 (DUP-07) |
| FS | 9 | 4 | 5 | FS-03, 05, 06, 08, 09 — phantom |
| KS | 9 | 8 | 1 | KS-08 |
| LS | 23 | 22 | 1 | LS-02 absent (add from §3) — note: table count was 23 before LS-02 added |
| OD | 22 | 20 | 2 | OD-12 absent (add from §9); OD-20 cross-ref notation |
| OT | 32 | 29 | 3 | OT-01=KR-09 (DUP-11); OT-16 phantom; OT-18 unverified |
| PH | 44 | 43 | 1 | PH-02 |
| SC | 26 | 21 | 5 | SC-09→CP-57; SC-10→CP-07; SC-12/13/14 cosmetic; SC-15→SC-08; SC-23 in bib (delete) |
| SR | 17 | 14 | 3 | SR-06, SR-12, SR-16 |
| TE | 17 | 16 | 1 | TE-02 |
| VD | 21 | 18 | 3 | VD-02, VD-05, VD-12 |
| VS | 26 | 21 | 5 | VS-01/02/04/06 absent (add from §15); VS-14/15 cosmetic; VS-22=SC-05 (DUP-03) |
| **TOTAL** | **719** (subtotal; TOTAL row says 727 = error of −8) | **663** | **56** | |

---

## MANAGEMENT DOCUMENT ACCURACY STATUS

| Document | DUP count shown | Correct | Critical stale facts |
|---|---|---|---|
| CLAUDE.md | 3 | 11 | "16 sections clean" = false; §CA ~107 (4th contradictory value); Open Items missing DUP-04–11; post-cleanup count formula wrong |
| README-CRISPY | 3 | 11 | Post-Decision Entry Count table invalidated; open flags 12 listed / 29 actual; footer "3-entry DUP TABLE" understated |
| INDEX.md | 3 | 11 | §CA shows "SCA" phantom; §8 shows "MV, CC, MALL, SM" phantom codes; §1 shows "SE, IF" phantom; archive = "28 files" → 27 |
| CURRICULUM-BLUEPRINT | 3 claimed confirmed (incl. 2 candidates) | 11 confirmed | 736 citation total stale (now 747); DOI base "~880" stale; Matsunaga action item buried |

---

## FSRS ENGINEERING SPRINT ITEMS (cluster for Crispy)

Three FSRS engineering decisions buried in section bodies — all should be consolidated in README-CRISPY:
- **§8 Flag 2:** FSRS kanji difficulty priors — Matsunaga (1999): non-kanji-background learners need 2.3× exposures — #44, #132
- **§3 FSRS gap:** Audio and visual recall should be weighted separately in FSRS scheduling — #63
- **§9.10-E:** Response latency as FSRS signal — requires engineering sprint — #62

---

## AUDIT COVERAGE ANALYSIS (through Pass 8)

| Dimension | Coverage | Notes |
|---|---|---|
| File coverage — surface | **100%** | All 64 corpus files touched in Passes 1–6 |
| File coverage — deep body | **~90%** | Depth gaps closed in P7/P8; only §8 MV cluster body remains |
| Bibliography structural audit | **~85%** | All clusters ID-counted and gap-mapped (P7); AL/CA/VD phantom-ID decisions remain for Crispy |
| Management documents | **~98%** | CLAUDE.md, README-CRISPY, INDEX.md all updated in P9; DDM decision count and §CA citation count still unresolved |
| SESSION C mechanical execution | **~95%** | 28 of 30 mechanical checklist items complete; 2 stale-count items (8→9, 7→8) not found in specified files; README-CRISPY footer deferred |
| §8 MV cluster assignment | **~0%** | Gap correctly identified and scoped (97 citations); actual MV-XX ID assignment not started — exceeds Sonnet 4.6 capacity |
| **Overall** | **~92%** | Remaining 8% is §8 MV execution + three Crispy-decision phantom-ID clusters (AL, CA, VD) + 2 minor open stale-count items |

**What the 12% gap consists of:**
1. **§8 MV cluster** — 97 [V1]/[NEW-v2] citations need MV-XX IDs assigned. Substantive execution task, not an audit miss. Crispy Opus 4.6 only.
2. **AL phantom decision** — AL-03 (genuinely missing?), AL-12/AL-13 (reserved/vacant?). Crispy call.
3. **CA phantom decision** — 6 absent IDs (CA-01, 05, 07, 20, 25, 33). Reserved slots vs. genuinely absent. Crispy call.
4. **VD phantom decision** — VD-02, 05, 12 absent from bibliography AND section files. Likely safe to reduce count; Crispy confirmation needed.
5. **DDM decision count** — "123 decisions" claimed in CLAUDE.md/INDEX.md but DDM has no standardised `## DDM-NNN` headers; count unverified.
6. **§CA authoritative citation count** — four contradictory values (86, ~107, ~112, ~107) with no documented derivation; must be resolved before F1/F2/F3 synthesis.

---

## KEY STATS — FINAL (through Pass 8)

| Metric | Value |
|---|---|
| Total audit findings | **136** (P1–P6: #1–#95; P7: #96–#116; P8: #117–#136) |
| 🔴 Critical | **24** |
| 🟠 High | **65** |
| 🟡 Medium | **41** |
| 🟢 Low | **6** |
| Bibliography actual grand total | **747 entries** (v17, pre-cleanup) |
| Actual unique cluster IDs verified | **663** (vs. 719 subtotal / 727 TOTAL row claimed) |
| Confirmed DUP pairs | **11** (DUP-01 through DUP-11) |
| DUP candidates pending Agent 38 | **2** (DUP-04, DUP-05) |
| Missing bibliography entries to add | **7** (AV-01, LS-02, VS-01, VS-02, VS-04, VS-06, OD-12) |
| `\1` journal corruptions in SUPPLEMENT | **9** |
| Concatenation error lines in bibliography | **8** |
| README-CRISPY open flags | 12 listed / **29 actual** (17 missing — enumerated in #111) |
| Phantom cluster codes (entire clusters) | **6** (SE, IF, CC-01–16, MV, SM-01–08, SCA) |
| Phantom IDs within real clusters | **13** (FS×5, SR×3, TE×1, DD×1, KS×1, PH×1, AV×1) |
| Session C bibliography additions | **7 entries** + 42 DOI verifications + DUP resolutions + footer strip |

---

## ESTIMATED TOKEN BUDGET — CRISPY OPUS 4.6

*Pricing basis: Opus 4.6 standard API — $5.00/M input tokens, $25.00/M output tokens.*
*This is an estimated budget range, not a fixed ceiling. Actual usage will vary with iteration depth.*

### Token estimate by task

| Task | Input (K tokens) | Output (K tokens) | Subtotal (K) | Notes |
|---|---|---|---|---|
| Orientation (index + CLAUDE.md + README-CRISPY scan) | 40 | 5 | **45** | Single pass; most context already in this index |
| Session A decisions (11 DUPs + phantom clusters + CP notation + DDM FLAGS A/B) | 150 | 25 | **175** | Bib lookups + section spot-reads per DUP; §CA count resolution included |
| §8 MV cluster full assignment | 250 | 80 | **330** | Largest single task — §8 body + bib cross-ref + writing ~97 entries across 3–4 passes |
| DDM decision count verification | 55 | 5 | **60** | Full DDM body read (~1,431 lines); reformat or count only |
| Session C review & oversight (spot-check Agent 2's mechanical edits) | 30 | 5 | **35** | ↓ Reduced from 85K: mechanical work complete; Crispy verifies 4 edited files only |
| Buffer (clarification passes, context reloads, edge-case disambiguation) | 40 | 5 | **45** | ~7% overhead — conservative |
| **Revised realistic total** | **565** | **125** | **~690K** | ↓ ~55K saved vs. prior estimate by completing SESSION C mechanicals |
| **High estimate (1.5× — if §8 MV requires extended cross-referencing)** | **850** | **190** | **~1.04M** | Triggered if MV citations overlap multiple clusters beyond current mapping |

### Cost at standard Opus 4.6 rates

| Scenario | Input cost | Output cost | **Total** |
|---|---|---|---|
| Revised realistic (~690K tokens) | $2.83 | $3.13 | **~$5.96** |
| High (~1.04M tokens) | $4.25 | $4.75 | **~$9.00** |
| Revised realistic + prompt caching (40% cached at $0.50/M) | $1.83 | $3.13 | **~$4.96** |
| High + prompt caching | $2.76 | $4.75 | **~$7.51** |
| Revised realistic + Batch API (50% off, non-urgent tasks) | $1.42 | $1.57 | **~$2.99** |

### Key observations

**Primary cost driver — §8 MV cluster assignment (~44% of total token budget).**
The 97-citation MV assignment requires reading §8 body + bibliography simultaneously, then writing up to 97 new/updated entries. If Crispy discovers significant overlap with other clusters requiring disambiguation, this task could push to or past the 1.12M high estimate alone.

**Prompt caching is the highest-leverage cost lever here.**
The bibliography (~80K tokens) and this index (~8K tokens) will be re-read on nearly every pass. Caching these at $0.50/M vs $5.00/M saves ~90% on repeated input — bringing the realistic total closer to ~$5 than ~$6.

**The 1M context window reduces total tokens for MV assignment.**
Crispy can hold §8 body + bibliography in a single context window rather than multiple round trips, eliminating re-read overhead. This is the primary reason the high estimate is capped at 1.12M rather than 2M+.

**Batch API applies only to Session C review** (non-time-sensitive oversight). Decisions and MV assignment should run at standard rates for interactivity.

---

## SESSION C MASTER CHECKLIST — MECHANICAL TASKS FOR AGENT 2

*(Consolidated from Passes 1–8. Items marked ★ require Crispy decision first.)*

**Bibliography entries to add (all have full data in section files):**
- [x] AV-01: Mayer & Moreno (1998) — data in §9 line 446
- [x] LS-02: Rost (2011) — data in §3 line 165
- [x] VS-01: Hutchinson & Waters (1987) — data in §15 lines 92–102
- [x] VS-02: Dudley-Evans & St John (1998) — data in §15 lines 92–102
- [x] VS-04: Long, M.H. (2005) — data in §15 lines 92–102
- [x] VS-06: Japan Foundation (2019) — data in §15 lines 92–102
- [x] OD-12: Mori (1998) — data in §9 line 679

**Strip colophons/footers (no Crispy decision needed):**
- [x] All SECTION*.md — agent colophon lines (#1)
- [x] §5 lines 1052–1055 (§5.5 addendum footer) — #130
- [x] §5 lines 1395–1399 (§5.6 addendum footer) — #130
- [x] §14 lines 345–346 (Part 2 delivery footer) — #120
- [x] §14 lines 1–12 Part 1 dispatch header, lines 105–115 Agent 18 handoff notes — #3
- [x] §14 lines 126–137 Part 2 dispatch header — #106
- [x] §14 lines 324–342 agent flag blocks (migrate content first — see #121) — #121
- [x] DDM line 1431 (Part 2 footer: "Agent 33 — Corpus v10") — #123

**Management document updates (no Crispy decision needed):**
- [x] README-CRISPY: Add 17 missing open flags (enumerated in #111) — #111
- [x] README-CRISPY: Update DUP table to 11 confirmed pairs — #119
- [x] README-CRISPY: Add Matsunaga (1999) to pending items, cross-link to §8 Flag 2 — #132
- [ ] README-CRISPY: Update footer after Session C, or add "as of v17 handoff" qualifier — #135
- [x] CLAUDE.md: Update DUP table to 11 confirmed pairs — #119
- [x] CLAUDE.md: Update "3 pairs" status row to "11 confirmed pairs" — #119
- [x] INDEX.md: Remove SCA from §CA clusters — #126
- [x] INDEX.md: Remove SE and IF from §1 clusters; note FS as partially populated — #129
- [x] INDEX.md: Correct §8 clusters (remove MV, CC, MALL, SM phantom codes) — #128
- [x] INDEX.md version history: "28 files" → "27 files" — #136
- [x] README-ARCHIVE.md: "28 files" → "27 files" — #30
- [ ] Update `\1` corruption count from 8 → 9 in all status documents — #18 *(text not found in CLAUDE.md or README-CRISPY.md; counts not stated in those files)*
- [ ] Update concatenation error count from 7 → 8 in all status documents — #53 *(text not found in CLAUDE.md or README-CRISPY.md; counts not stated in those files)*

**★ Crispy-decision-required (execute after decision received):**
- [ ] ★ DUP-01 through DUP-11 ID retirement and canonical replacement — #80, #97–#100
- [ ] ★ §14 SC-09→CP-57, SC-10→CP-07, SC-15→SC-08, SC-23 delete from bib — #97–#100, #103
- [ ] ★ §14 line 339: "OT-01–OT-05" → "KR-09, OT-02–OT-05" after DUP-11 — #122
- [ ] ★ §12 OT-01 references → KR-09 — #100
- [ ] ★ §1 body line 577 [NEW] tag → [KR-09] — #58
- [ ] ★ MV cluster creation (97 citations in §8 need MV-XX IDs) — #69, #88
- [ ] ★ FS phantom decision: create FS-03/05/06/08/09 OR reduce cluster count to 4 — #101
- [ ] ★ SR phantom decision: create SR-06/12/16 OR reduce cluster count to 14 — #109
- [ ] ★ CP cross-reference notation style (companion-ID in "Note:" clauses) — #125
- [ ] ★ Rebuild README-CRISPY Post-Decision Entry Count table with 11-DUP arithmetic — #134
- [ ] ★ CURRICULUM-BLUEPRINT L249: correct DUP-04/05 status to "candidate"; update count to 11 confirmed — #124

---

## SCOPE GAPS REMAINING FOR CRISPY

1. **§8 MV cluster full assignment** — 97 [V1]/[NEW-v2] tagged citations need MV-XX IDs. Largest single remaining task. Beyond Sonnet 4.6 session capacity; Crispy Opus 4.6 must execute.
2. **AL cluster gaps: AL-03, AL-12, AL-13** — AL-14 (Gardner 1985) IS in bibliography (line 118). Need Crispy decision on AL-12/AL-13 reserved slots; AL-03 is genuinely missing.
3. **CA cluster: CA-01, CA-05, CA-07, CA-20, CA-25, CA-33** — 6 phantom IDs. Confirm whether reserved slots or permanently absent.
4. **VD cluster: VD-02, VD-05, VD-12** — absent from bibliography AND from section files — safe to reduce cluster count.
5. **OT-16 fully phantom** — no paper ever assigned; reduce OT count to 30 after OT-01 DUP-11 resolution.
6. **KR-06** — unexplained gap in KR cluster numbering (KR-01–05, KR-07–10). Never cited anywhere. Safe to declare permanently vacant.
7. **DDM decision count** — CLAUDE.md/INDEX.md claim "123 decisions." DDM does not use standardised `## DDM-NNN` headers; actual count unverified. Crispy should verify or reformat before building on DDM.
8. **§CA authoritative citation count** — four contradictory values (86, ~107, ~112, ~107) with no documented derivation. Crispy must establish single authoritative count before F1/F2/F3 synthesis.

---

*AUDIT-INDEX-v17-PASSES1-9-FINAL.md*
*Compiled by Agent 2 Sonnet 4.6 — 6 April 2026 | Pass 9 FINAL — 6 April 2026*
*Supersedes: AUDIT-INDEX-v17-PASSES1-8.md, AUDIT-INDEX-v17-PASSES1-6.md, AUDIT-INDEX-v17-PASS7.md, AUDIT-INDEX-v17-PASS8.md*
*136 findings indexed across 9 passes. SESSION C mechanical tasks ~96% complete. All ★ items await Crispy Opus 4.6 decision.*

---

## PASS 9 — MECHANICAL COMPLETION LOG
**Executor:** Agent 2 Sonnet 4.6 | **Date:** 6 April 2026
**Tasks completed:** 28 | **Tasks skipped/flagged:** 3

| File | Change made | Finding # | Notes |
|---|---|---|---|
| MASTER-BIBLIOGRAPHY-FINAL.md | AV-01 (Mayer & Moreno 1998) inserted before AV-02 | #117 | Complete |
| MASTER-BIBLIOGRAPHY-FINAL.md | LS-02 (Rost 2011) inserted between LS-01/LS-03 | #118 | Complete |
| MASTER-BIBLIOGRAPHY-FINAL.md | OD-12 (Mori 1998) inserted between OD-11/OD-13 | #104 | Complete |
| MASTER-BIBLIOGRAPHY-FINAL.md | VS-01, VS-02, VS-04, VS-06 inserted before VS-03 | #102 | Complete |
| SECTION-CA-CURRICULUM.md | Agent colophon stripped | #1 | Complete |
| SECTION1-EVIDENCE-BASED.md | Agent colophon stripped | #1 | Complete |
| SECTION2-GRAMMAR.md | Agent colophon stripped | #1 | Complete |
| SECTION3-LISTENING.md | Agent colophon stripped | #1 | Complete |
| SECTION4-ER.md | Agent colophon stripped | #1 | Complete |
| SECTION5-CONTRASTIVE.md | Agent colophon stripped | #1 | Complete |
| SECTION5-CONTRASTIVE.md | Lines 1052–1055 §5.5 addendum footer stripped | #130 | Complete |
| SECTION5-CONTRASTIVE.md | Lines 1395–1399 §5.6 addendum footer stripped | #130 | Complete |
| SECTION8-PWA.md | Agent colophon stripped | #1 | Complete |
| SECTION9-MULTIMEDIA.md | Agent colophon stripped | #1 | Complete |
| SECTION10-GAMIFICATION-HABIT.md | Agent colophon stripped | #1 | Complete |
| SECTION11-PHONOLOGY.md | Agent colophon stripped | #1 | Complete |
| SECTION12-OUTPUT-THEORY.md | Agent colophon stripped | #1 | Complete |
| SECTION13-INDIVIDUAL-DIFFS.md | Agent colophon stripped | #1 | Complete |
| SECTION14-SOCIO.md | Part 1 dispatch header, Agent 18 handoff notes, Part 2 dispatch header, flag blocks, Part 2 delivery footer all stripped; Agent 37/38 flag content migrated to DOI-VERIFICATION-TRACKER.md and README-CRISPY | #3, #106, #120, #121 | Complete |
| SECTION15-SSW.md | Agent colophon stripped | #1 | Complete |
| SECTION16-CALL.md | Agent colophon stripped | #1 | Complete |
| SECTION17-ADULT.md | Agent colophon stripped | #1 | Complete |
| DESIGN-DECISION-MASTER-v1.md | Line 1431 Part 2 footer deleted | #123 | Complete |
| README-CRISPY.md | 17 missing open flags added (Full Open Flags Table now 36 rows) | #111 | Complete |
| README-CRISPY.md | DUP table replaced with 11-pair table (DUP-01 through DUP-11) | #119 | Complete |
| README-CRISPY.md | Matsunaga (1999) added to PENDING section | #132 | Complete |
| CLAUDE.md | DUP table replaced with 11-pair table | #119 | Complete |
| CLAUDE.md | Status row updated: "3 pairs flagged" → "11 confirmed pairs (DUP-01 through DUP-11); DUP-04/05 remain candidates pending Agent 38." | #119 | Complete |
| CLAUDE.md | Open Items list expanded: DUP-06 through DUP-11 added as HIGH; DUP-04/05 added as MEDIUM candidates | #80 | Complete |
| INDEX.md | §CA Key Clusters: removed phantom code "SCA" | #126 | Complete |
| INDEX.md | §1 Key Clusters: removed phantom codes "SE" and "IF"; added FS partial-population note | #129 | Complete |
| INDEX.md | §8 Key Clusters: removed MV, CC, MALL, SM; retained IM only; added MV note | #128 | Complete |
| INDEX.md | Version history v17 row: "28 files" → "27 files" | #136 | Complete |
| INDEX.md | Archive quick reference: gap-analysis updated to include v1 and v3; citation-audit updated to include v3–v7 | #10, #29 | Complete |
| archive/README-ARCHIVE.md | Footer: "28 files" → "27 files" | #30 | Complete |

### Skipped / Flagged items
| File | Issue | Action taken |
|---|---|---|
| CLAUDE.md / README-CRISPY.md | `\1` journal corruption count 8→9 (#18): searched both files — this specific count (stated as "8") does not appear in either file. Counts are only in the audit index itself. | No edit made. Crispy should verify if any other status documents carry this count. |
| CLAUDE.md / README-CRISPY.md | Concatenation error count 7→8 (#53): same result — count not stated in either management document. | No edit made. Same note to Crispy. |
| README-CRISPY.md | Footer update (#135): completed in Pass 9 Final session. | ✅ Complete |

---

## PASS 9 FINAL — ADDITIONAL CHANGES (this session)

| File | Change made | Finding # | Notes |
|---|---|---|---|
| All 16 SECTION*.md | Status fields updated to `Canonical — v17` across all section headers (16 files, 19 instances) | #15 | Complete |
| SECTION16-CALL.md | Duplicate H1 deleted; merge coordination header block stripped; all agent attribution neutralised (scope note, cross-ref, design implication, Part 2 subheader, synthesis footer) | #8, #25, #48 | Complete |
| SECTION17-ADULT.md | Merge coordination header block stripped; all agent attribution neutralised (citation table, AL-12/13 note, delivery footer, merge note, Part 2 header block, inline prose, Part 2 footer) | #26, #48 | Complete |
| SECTION12-OUTPUT-THEORY.md | Top block replaced with 3-line clean header; Note untuk Agent 2 blockquote deleted; FLAGS block deleted; delivery footer deleted | #49, #75 | Complete |
| DOI-VERIFICATION-TRACKER.md | 10 OT DOI flags migrated from §12 FLAGS block | #75 | Complete (D4 before D3 per safety rules) |
| SECTION5-CONTRASTIVE.md | §5.6 addendum metadata block stripped; MERGED v4-ADDENDUM HTML comment deleted | #27 | Complete |
| SECTION3-LISTENING.md | 3 HTML merge comments deleted; cross-reference fixed (Agent 20 ref + LS-12–14 → LS-01–LS-11) | #7, #12 | Complete |
| SECTION9-MULTIMEDIA.md | Unclosed bold on `**Target:` fixed | #13 | Complete |
| SECTION2-GRAMMAR.md | 2 HTML merge comments deleted | #12 | Complete |
| SECTION8-PWA.md | 3 HTML merge/agent comments deleted | #12 | Complete |
| MASTER-BIBLIOGRAPHY-FINAL.md | Stubs remaining: 0 → accurate count (7 stubs + 13 bare + 1 conditional) | #33 | Complete |
| CLAUDE.md | Corpus sections status fixed to reflect §8 97-citation issue | #90 | Complete |
| README-CRISPY.md | Footer updated to Pass 9 final stats; duplicate flag count 3 → 11 pairs | #135, #80 | Complete |
| CLAUDE.md | Bibliography count 747 → 754; recovered entries note updated | I3, I4 | Complete |
| INDEX.md | Bibliography count 747 → 754 in tree view | I5 | Complete |
| INDEX.md | Archive tree verified correct (gap-analysis v1,v3,v4,v6–v10 ✅; citation-audit v3–v7,v9–v11 ✅) | #29 | No change needed |


---

## PASS 10 — BIBLIOGRAPHY MECHANICAL CLEANUP (6 April 2026)

### Tasks completed
| Task | Action | Finding # | Result |
|---|---|---|---|
| A — GI-01 strip | Embedded ~200-word workflow note stripped from bibliography line 808; GI-01 entry now clean | #54 | ✅ Complete |
| A — FLAG §11-C migrate | §11-C row updated in README-CRISPY Open Flags Table with full speculative cluster detail | #54 | ✅ Complete |
| A — Agent 38B cross-ref | §10.8→§1 cross-ref flag deleted (Agent 38B work superseded) | #54 | ✅ Complete |
| B — SM-09 orphan | Orphaned SM-09 line (4 April tag) deleted; canonical (5 April tag) verified intact | #17 | ✅ Complete |
| B — SM-10 orphan | Orphaned SM-10 line (4 April tag) deleted; canonical (5 April tag) verified intact | #17 | ✅ Complete |
| C1 — ID-31/ID-02 | Lou/MacIntyre concatenation split into 2 entries | #53 | ✅ Complete |
| C2 — ID-43/ID-25/ID-27 | Clément/DeKeyser×2 concatenation split into 3 entries | #53 | ✅ Complete |
| C3 — OT-26/OT-20/OT-21/OT-22 | Barcroft/DeKeyser×3 concatenation split into 4 entries; ⚠ Agent 38A flag preserved | #53 | ✅ Complete |
| C4 — PH-12/GE-04 | Tyler/Van Roy concatenation split into 2 entries | #53 | ✅ Complete |
| C5 — PH-32/GM-04 | Bradlow/Çakiroğlu concatenation split into 2 entries | #53 | ✅ Complete |
| C6 — PH-41/PH-15 | Luce/McQueen concatenation split into 2 entries | #53 | ✅ Complete |
| C7 — TE-17/KR-05 | Tulving/VanPatten concatenation split into 2 entries | #53 | ✅ Complete |
| C8 — scan | Additional concatenation scan: only CP cross-ref pairs found (intentional); no 8th genuine concatenation | #53 | ✅ Clean |
| D — \1 Godwin-Jones | Journal fixed: *Language Learning & Technology, 15* | #18 | ✅ Complete |
| D — \1 Viberg & Grönlund | Journal fixed: *Computers & Education, 60* | #18 | ✅ Complete |
| D — \1 Mori & Nagy | Journal fixed: *Studies in Second Language Acquisition, 21* | #18 | ✅ Complete |
| D — \1 Matsunaga | Journal fixed: *Japanese Language Education around the Globe, 9* | #18 | ⚠ Verify — name inferred, not DOI-confirmed |
| D — \1 Dewaele & MacIntyre | Journal fixed: *Studies in Second Language Learning and Teaching, 4* | #18 | ✅ Complete |
| D — \1 Liu & Jackson | Journal fixed: *The Modern Language Journal, 92* | #18 | ✅ Complete |
| D — \1 Kondo & Ying-Ling | Journal fixed: *ELT Journal, 58* | #18 | ✅ Complete |
| D — \1 Saito, Garza & Horwitz | Journal fixed: *The Modern Language Journal, 83* | #18 | ✅ Complete |
| D — \1 Cowan | Journal fixed: *Behavioral and Brain Sciences, 24* | #18 | ✅ Complete |
| D — README note | #18 resolution note added to README-CRISPY Open Flags Table | #18 | ✅ Complete |
| E1 — DUP-03 README-CRISPY | Title corrected: *Second Language Learning and Language Teaching* → *Socializing identities through speech style.* Multilingual Matters. | #16 | ✅ Complete |
| E2 — DUP-03 CLAUDE.md | Same title correction applied | #16 | ✅ Complete |
| F — OPUS-SUGGESTIONS-v6 | New file created; v5 superseded | — | ✅ Complete |

### Pass 10 coverage estimate: ~99%
### Remaining for Session D (post-Crispy decisions): DUP resolutions, 7 stubs, MV cluster, bibliography v7, repackage v18

---

## PASS 10 ADDENDUM — ARCHIVE FILE RECOVERY (6 April 2026)

| File recovered | Destination |
|---|---|
| GAP-ANALYSIS-MASTER-v1.md | `archive/gap-analysis/` ✅ |
| GAP-ANALYSIS-MASTER-v2.md | `archive/gap-analysis/` ✅ |
| GAP-ANALYSIS-MASTER-v3.md | `archive/gap-analysis/` ✅ |
| CITATION-AUDIT-AGENT2-v3.md | `archive/citation-audit/` ✅ |
| CITATION-AUDIT-AGENT2-v4.md | `archive/citation-audit/` ✅ |
| CITATION-AUDIT-AGENT2-v5.md | `archive/citation-audit/` ✅ |
| CITATION-AUDIT-AGENT2-v6.md | `archive/citation-audit/` ✅ |
| CITATION-AUDIT-AGENT2-v7.md | `archive/citation-audit/` ✅ |

INDEX.md and README-ARCHIVE.md updated to reflect recovered files.

**Still missing:** GAP-ANALYSIS-MASTER-v5.md | CITATION-AUDIT-AGENT2-v8.md | F1/F2/F3 synthesis files (Crispy)
