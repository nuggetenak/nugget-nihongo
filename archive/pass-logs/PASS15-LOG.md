# PASS 15 LOG — NUGGET NIHONGO CORPUS
**Agent:** Agent 2 Sonnet 4.6
**Corpus base:** v17-PASS14-FINAL
**Date:** 6 April 2026
**Session type:** Pass 15 — DOI verification pass (42 entries)

---

## TASKS EXECUTED

### TASK 1 — DOI Verification: 42 entries from DOI-VERIFICATION-TRACKER.md

Web searches + training knowledge applied. Results:

| Result | Count | IDs |
|---|---|---|
| ✅ CONFIRMED | 7 | PH-04, PH-05, PH-06, PH-07, PH-41, PH-43, GI-02 |
| ❌ UNAVAILABLE | 14 | CP-03, CP-11, CP-20, CP-25, CP-33, CP-55, CP-56, CP-58, CP-68, EE-07, FS-04, PH-01, PH-08, PH-09, PH-19, PH-22, PH-23, PH-25 |
| ⬜ PENDING (specific action) | 15 | CA-03, CP-04, CP-24, CP-36, CP-44, CP-46, CP-63, CP-65, CP-73, CV-05, GF-02, GX-05, PH-03, PH-26, PH-29, SRE-06 |
| ⚠️ MOOT | 1 | CP-09 (already RETIRED DUP-07) |

### TASK 2 — Bibliography DOI insertions (6 entries)

| ID | DOI Added |
|---|---|
| PH-04 | `10.1017/S0142716400008912` |
| PH-05 | `10.1016/S0095-4470(19)30537-6` |
| PH-06 | `10.1111/j.1467-1770.1995.tb00963.x` |
| PH-07 | `10.1017/S0272263100010792` |
| PH-41 | `10.1097/00003446-199802000-00001` |
| GI-02 | `10.1088/1742-6596/1764/1/012073` |

### TASK 3 — PH-43 bibliography error correction

**Error found:** Entry had wrong journal (*Journal of Multilingual and Multicultural Development* 26(6)) and wrong article title ("production" instead of "recognition").
**Corrected to:** *Journal of Multilingual Communication Disorders* 3(1), 64–73. DOI: `10.1080/14769670400027332`

### TASK 4 — GI-02 flag §10-A resolved

Faisal & Hijriya (2021) confirmed via IOP Publishing DOI. Paper exists. Flag §10-A RESOLVED.

### TASK 5 — §10-C resolved (Hamari count)

Total Hamari papers in corpus: **3** (GF-02, GM-01, GM-06). Under 5-paper threshold. Flag §10-C RESOLVED.

### TASK 6 — §10-F resolved (GX-04 vs MV-02)

MV-02 is a cross-reference label used in §8/§13/§17 body text only — it is NOT a keyed bibliography entry. GX-04 (Ryan & Deci 2000, *Contemporary Educational Psychology*) is distinct from any MV-cluster entry. No duplicate. GX-04 is safe to retain. Flag §10-F RESOLVED.

### TASK 7 — Tracker ID discrepancies noted

- Tracker listed CP-45 for Matsumoto (1993) → actual bibliography ID is CP-44
- Tracker listed CP-47 for Maynard (1987) → actual bibliography ID is CP-46
- Tracker listed CP-72 for Sutedi (2013) → actual bibliography ID is CP-73
These are tracker typos only; bibliography IDs are canonical.

---

## FILES MODIFIED THIS PASS

| File | Changes |
|---|---|
| `corpus/bibliography/DOI-VERIFICATION-TRACKER.md` | All 42 entries updated from ⬜ PENDING to ✅/❌/⬜ with notes |
| `corpus/bibliography/MASTER-BIBLIOGRAPHY-FINAL.md` | 6 DOIs added; PH-43 journal name + title corrected |
| `archive/pass-logs/PASS15-LOG.md` | Created (this file) |

---

## OPEN ITEMS — REMAINING DOI PENDING (15 entries)

| ID | Action Required |
|---|---|
| CA-03 | Check JSTOR for Wardhaugh (1970) TESOL Quarterly DOI |
| CP-04 | Complete citation (vol/issue/pages) + check Eralingua OJS for DOI |
| CP-24 | Check De Gruyter for Ide (1989) Multilingua DOI |
| CP-36 | Check De Gruyter for Kita (1997) Linguistics DOI |
| CP-44 | Check De Gruyter for Matsumoto (1993) Linguistics DOI |
| CP-46 | Check De Gruyter for Maynard (1987) Text DOI |
| CP-63 | Check J-STAGE for Sakoda (2019) Nihongo Kyōiku |
| CP-65 | Check J-STAGE for Shioda & Saito (2020) Nihongo Kyōiku |
| CP-73 | Check UGM OJS for Sutedi (2013) Humaniora |
| CV-05 | Resolve Agent 37 flag first; full citation needed |
| GF-02 | Check AIS Electronic Library (aisel.aisnet.org) for ECIS 2013 Paper 50 |
| GX-05 | Check Oxford Academic for Murayama et al. (2012) handbook chapter DOI |
| PH-03 | Check Cambridge Core for Flege & Bohn (2021) SLM-r chapter DOI |
| PH-26 | Check ScienceDirect for Gandour (1983) J. Phonetics retroactive DOI |
| PH-29 | Check Oxford Academic for Venditti (2005) chapter DOI |
| SRE-06 | Check Taylor & Francis for Macrae et al. (1995) ERSP DOI |

---

*PASS15-LOG.md — Agent 2 — 6 April 2026*
