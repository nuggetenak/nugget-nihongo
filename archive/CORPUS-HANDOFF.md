# CORPUS-HANDOFF.md — Resume Instructions for Evidence Base Completion
**Date:** 4 April 2026 | **From:** A1 Crispy 🥐

---

## STATUS

**418 of ~880 bibliography entries compiled** (47%). The compiled file is `MASTER-BIBLIOGRAPHY-COMPILED-v1.md`.

The corpus ZIP (`NUGGET-NIHONGO-CORPUS-UPDATED-v14.zip`) contains all 21 completed section files with inline citations. The bibliography compilation is ~half done because 12 of 19 sub-agent returns are missing.

## WHAT NEEDS TO BE DONE

### Step 1: Extract Missing Bibliographies from Section Files

The section files in `02-SECTIONS/` contain all citations inline. For each missing cluster, read the section file and extract APA-format entries:

| Missing Cluster | Source File | Approx Entries |
|---|---|---|
| GA (Grammar) | SECTION2-GRAMMAR-v1.md | ~31 |
| LS (Listening) | SECTION3-LISTENING-v1.md | ~25 |
| ER (Extensive Reading) | SECTION4-ER-v1.md | ~25 |
| MV, CC (PWA §8.1-8.5) | SECTION8-PWA-v2.md | ~70 |
| MALL, IM, SM (PWA §8.6-8.10) | SECTION8-PWA-v2.md + SECTION8-PWA-v3-FINAL.md | ~75 |
| SC (Sociolinguistics) | SECTION14-SOCIO-v1.md | ~25 |
| VS (SSW/Vocational) | SECTION15-SSW-v1.md | ~26 |
| CM (CALL/MALL) | SECTION16-CALL-v1.md | ~21 |
| AL (Adult Learning) | SECTION17-ADULT-v1.md | ~19 |
| CA-55+ (Curriculum Part 2) | SECTION-CA-CURRICULUM-v1.md | ~53 |
| VD (Vocab Depth) | SECTION-CA-CURRICULUM-v1.md §CA.10 | ~15 |

**Method:** For each section file, search for author-year patterns like `(Author, Year)` or `Author (Year)`, then construct APA entries. Cross-reference with the citation IDs mentioned in the text (e.g., `[GA-01]`, `(GA-01)`).

### Step 2: Merge into Master Bibliography

Add extracted entries to `MASTER-BIBLIOGRAPHY-COMPILED-v1.md`, maintaining:
- APA 7th Edition format
- Alphabetical sort within each cluster
- Citation ID tags in brackets at end of each entry

### Step 3: Resolve Duplicate Flags

8 known duplicates need canonical ID assignment (see Appendix in the compiled file). For each:
- Keep one canonical entry
- Add cross-reference note to the other
- Update the compiled bibliography

> **Note (Pass 11):** DUP count at time of this handoff was 3 confirmed. Subsequent audit (Passes 1–10) raised this to 11 confirmed pairs. See README-CRISPY DUPLICATE FLAG TABLE for current state.

### Step 4: DOI Verification

~35 entries are flagged `[DOI UNVERIFIED]`. For each:
- Search CrossRef/Google Scholar for the DOI
- Add DOI if found, mark `[DOI CONFIRMED UNAVAILABLE]` if not

### Step 5: Synthesis (the final deliverables)

Two documents needed:
1. **Level Ladder Specification** — N5→N1 exit criteria using corpus evidence (see HANDOFF-AGENT2-v14.md Section F1 for inputs)
2. **§18 Synthesis Section** — Unified narrative tying all 21 sections together

---

## FILE LOCATIONS

- Corpus ZIP: `NUGGET-NIHONGO-CORPUS-UPDATED-v14.zip`
- Compiled bibliography (partial): `MASTER-BIBLIOGRAPHY-COMPILED-v1.md` (in outputs)
- 7 returned agent bibliographies: `BIBLIO-34A/34B/34C/34F/35A/35B/35C` (uploaded files)
- Handoff from Agent 2: `corpus_v14/HANDOFF-AGENT2-v14.md`
- Master status: `corpus_v14/README-CRISPY.md`
- All section files: `corpus_v14/02-SECTIONS/`
