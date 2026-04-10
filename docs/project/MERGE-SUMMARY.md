# MERGE SUMMARY — 24 Maret 2026
Versi    : v14.26.0 → v14.27.0
Tanggal  : 24 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Tasks Merged
| Task | Tipe | Keterangan |
|------|------|------------|
| TASK-FLUFFY-1 | Fluffy flow merge (Curriculum docs) | Ecosystem Fit Clearance by Crunchy |

## Files Changed
| File | Perubahan |
|------|-----------|
| `docs/curriculum/NUGGET-NIHONGO-TAXONOMY-MASTER-v2.md` | BARU — curriculum architecture reference |
| `docs/curriculum/conjugation_engine_consolidated_v1.json` | BARU — conjugation engine data v1 |
| `docs/curriculum/CURRICULUM-PROPOSAL-TASK-FLUFFY-1-v2.md` | BARU — approved curriculum proposal |
| `docs/operational/proposal-reviews/ECOSYSTEM-FIT-CLEARANCE-TASK-FLUFFY-1.md` | BARU — Crunchy clearance archived |
| `_MAP.md` | TASK-FLUFFY-1 ✅, 4 implementation tasks seeded, INC018-FIX + GOV-017-D2 status updated |
| `MASTER-DIRECTIVE-LOG.md` | 5 entries baru (Fluffy directives + Crunchy advisory notes) |
| `js/core/version.js` | v14.26.0 → v14.27.0 |
| `sw.js` | CACHE nihongo-v14.26.0 → nihongo-v14.27.0 |

## Merge Type
Fluffy flow merge — tidak menggunakan FOR-INTEGRATOR ZIP standard.
Approval: ECOSYSTEM-FIT-CLEARANCE-TASK-FLUFFY-1.md dari Agent 6 Crunchy (Fluffy flow: Crunchy sebagai ecosystem fit checker per MASTER-FLOW section 2e).

## run-merge-checklist.js Result
FAIL (3/15) — semua failures adalah flow mismatch, bukan actual merge issues:
- Item 1 (QA-VERDICT): Fluffy flow menggunakan ECOSYSTEM-FIT-CLEARANCE, bukan QA-VERDICT. Manual verified ✅
- Item 2 (root folder for-integrator-crunchy/): Fluffy flow ZIP structure berbeda. N/A.
- Item 3 (version match): False positive — script tidak membaca post-edit sw.js. Actual: version.js = v14.27.0, sw.js CACHE = nihongo-v14.27.0 ✅ match.
Manual verification dilakukan — merge proceed per GOV-017 infrastructure exception.
Flag ke Spicy: run-merge-checklist.js perlu handle Fluffy flow (ECOSYSTEM-FIT-CLEARANCE) sebagai alternative approval path.


- docs/curriculum/ folder dibuat untuk pertama kali di sesi ini
- Tiga advisory notes dari Crunchy di-capture di MASTER-DIRECTIVE-LOG:
  NOTE-1: ID format authoritative = 4-digit (bukan 5-digit di teks CP-3.1/5.3)
  NOTE-2: Grammar ID prefix canonical = `gn` (bukan `gp` dari get-next-id.js) → get-next-id.js perlu fix
  NOTE-3: `_curriculum-map.md` tidak exist — perlu dibuat, pending Fluffy follow-up
- Implementation tasks (TASK-SPICY-8/VOC-6/GRM-7/BOOK-3) seeded di _MAP.md, Task Briefs pending further discussion Fluffy + Nugget-san
- Task Briefs TASK-INC018-FIX + TASK-GOV-017-D2 dispatched ke CP(1) Crunchy 24 Maret 2026

---

# MERGE SUMMARY — 23 Maret 2026
Versi    : v14.25.2 → v14.26.0
Tanggal  : 23 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : TASK-GOV-017-D1 — Crispy prompt updates + _MAP.md hygiene (self-task)
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Bump     : minor (governance update scope besar — 2 agent prompts + living doc baru)
Files    : AGENT-1-INTEGRATOR v11→v12, AGENT-COMMON v13→v14, _MAP.md (HYG-002/003/006/017), MASTER-DIRECTIVE-LOG seeded
Pending  : ⚠️ AGENT-COMMON-v14.md wajib diupload ke PK SEMUA agent (A1–A9)
           ⚠️ AGENT-1-INTEGRATOR-v12.txt wajib diupload ke PK Agent 1
Script   : ⚠️ run-merge-checklist.js check-version-consistency false-fail (script bug, bukan merge issue) — version.js + sw.js ✅ match v14.26.0. Flag ke Spicy.

---

# MERGE SUMMARY — 23 Maret 2026
Versi    : v14.25.1 → v14.25.2
Tanggal  : 23 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : TASK-GOV-017-C — Crunchy packaging update (self-task)
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Bump     : patch (governance scope kecil — 2 prompt files + 1 DB fix)
Files    : AGENT-6-QA-v12 → v13, AGENT-COMMON-CRUNCHY-ADDENDUM-v4 → v5, DECISION-DB (HYG-011/022)
Pending  : ⚠️ AGENT-6-QA-v13.txt + AGENT-COMMON-CRUNCHY-ADDENDUM-v5.md perlu diupload ke PK Agent 6
Script   : ⚠️ run-merge-checklist.js check-version-consistency false-fail — script membaca v14.25.0 dari MERGE-SUMMARY history bukan versi aktif. version.js + sw.js ✅ match v14.25.2. Flag ke Spicy.

---

# MERGE SUMMARY — 23 Maret 2026
Versi    : v14.25.0 → v14.25.1
Tanggal  : 23 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : TASK-INC019-FIX-B — INC-019 fix 3 malformed jp: entries (Batter)
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Bump     : patch (koreksi data — 3 karakter di grammar-n4.js)
Findings : INC-019 RESOLVED — gn4-0048, gn4-0053, gn4-0090 fixed (missing opening quote)
Spicy    : Tidak tersedia untuk task ini (Spicy scan counter: 3/3 → periodic scan due)
Pending  : ⚠️ Governance task needed — tambahkan grammar-n*.js ke scope Batter di AGENT-COMMON

---

# MERGE SUMMARY — 23 Maret 2026
Versi    : v14.23.2 → v14.23.3
Tanggal  : 23 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : TASK-INC019-FIX-A — INC-019 investigasi (Spicy, investigate only)
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Bump     : patch (investigasi only, tidak ada perubahan code/data)
Findings : 3 entries bermasalah di grammar-n4.js (bukan 2) — gn4-0048/0053/0090
           Missing opening quote `'` di field jp: examples[1]
Next     : TASK-INC019-FIX-B dispatched ke Batter — fix 3 entries

---

# MERGE SUMMARY — 23 Maret 2026
Versi    : v14.23.1 → v14.23.2
Tanggal  : 23 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : TASK-INC017-FIX — Load order fix (conjugation-engine.js sebelum quiz.js)
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Bump     : patch
INC-017  : RESOLVED

---

# MERGE SUMMARY
Versi    : v14.18.7 → v14.18.8
Tanggal  : 21 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : SPICY-PROP-007 Crunchy Review (Ecosystem Fit + DECISION-DB update)
QA by    : Agent 6 — Crunchy 🦷 (Ecosystem Fit ✅)


## Merge Batch — 22 Maret 2026 (v14.21.0 → v14.22.3)
Merged by: Agent 1 Crispy 🥐
QA: Agent 6 Crunchy 🦷 (semua ✅ APPROVED)
Tasks: 8

| Task | Versi | Bump | Keterangan |
|------|-------|------|-----------|
| TASK-SPICY-7 | v14.21.1 | patch | project-health.js + resolve-project-root.js (BARU) + run-cp1-checklist.js |
| TASK-SPICY-DIAG | v14.22.0 | minor | 6 script fixes + scan-deprecated-fields.js (BARU) + CRUNCHY-DISPATCH-DIAG-001.md |
| TASK-INTEL-P0B | v14.22.1 | patch | extract-archive-metadata.js (BARU) + METADATA-HEADER-STANDARD.md (BARU) |
| TASK-UI-10 | v14.22.2 | patch | srs.js + quiz-vocab.js — bug fix SRS quality mapping |
| TASK-INC015-FIX | — | — | FALSE POSITIVE confirmed — validator bug (validate-css-variables.js) |
| TASK-INC014-FIX | — | — | FALSE POSITIVE confirmed — validator bug (validate-bank-soal-coverage.js) |
| TASK-BATTER-CATS-REVIEW | v14.22.3 | patch | config.js — hapus duplicate 'kontras' |
| TASK-8 | — | — | Dokumentasi investigasi noun-suru. Ref vocab-n5-soumatome.js (RETIRED) dihapus. |

Post-merge notes:
- TASK-INTEL-P0C di-unlock (dep TASK-INTEL-P0B ✅)
- INC-015 + INC-014 status: FALSE POSITIVE — validator bugs, bukan data/CSS bugs
- Task Brief perlu di-dispatch ke Spicy: fix validate-css-variables.js + fix validate-bank-soal-coverage.js
- TASK-QA-INIT-3 bisa di-dispatch (TASK-BATTER-CATS-REVIEW ✅)
- Spicy scan counter: 3/3 → periodic Spicy scan due setelah batch ini
- TOOLS zip perlu diperbarui untuk: A7 Spicy (TASK-SPICY-7, TASK-SPICY-DIAG merged)


## Perubahan
- docs/DECISION-DB.md — DEC-011, DEC-012, DEC-013 ditambahkan
- docs/INCONSISTENCY-DB.md — INC-020 (SWA-001 sw.js caching) seeded

## Catatan INC
- ISSUE-7 (LOAD-001) = INC-017 — sudah ada
- ISSUE-8 (BSL-006)  = INC-018 — sudah ada
- ISSUE-6 (SWA-001)  = INC-020 — baru di-seed
- ISSUE-1 (XREF-001 count gap) = INC-013 — sudah tracked

## Flag
⚠️ P1-D scope update per DEC-013: 4 file + 3 addendum baru (Spicy/Fluffy/Savory)
⚠️ INC-020 (SWA-001): perlu task untuk Crispy (sw.js ASSETS fix)
⚠️ INC-013 (XREF-001 gap): ISSUE-1 masih open — perlu investigasi scope

---

# MERGE SUMMARY
Versi    : v14.18.6 → v14.18.7
Tanggal  : 21 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : TASK-SPICY-6 Batch (C1 + C2 + C3a)
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED

## Perubahan
- tools/scripts/utils/project-health.js — path fix js/core/version.js ✅
- tools/scripts/utils/bump-version.js — path fix js/core/version.js ✅
- tools/scripts/utils/generate-quick-context.js — path fix ✅
- tools/scripts/utils/run-session-orientation.js — --mode senior branch added ✅
- tools/scripts/utils/scaffold-vocab-entry.js — field word: fix ✅
- tools/scripts/utils/sync-sw-assets.js — base64 filter added ✅
- tools/scripts/spicy/validate-grammar-schema.js — brace-counting parser ✅
- tools/scripts/spicy/validate-book-index.js — brace-counting parser ✅
- tools/scripts/spicy/validate-bank-soal.js — type-dispatch per soal type ✅
- tools/scripts/spicy/test-conjugation.js — ConjugationEngine lookup path ✅
- tools/scripts/spicy/config.js — BANK_SOAL_SCHEMA added ✅
- tools/scripts/spicy/scan-ids.js — NEW (replace scan-ids.sh) ✅
- tools/scripts/spicy/scan-secrets.js — NEW (replace scan-secrets.sh) ✅
- tools/scripts/spicy/run-full-scan.js — NEW aggregate runner ✅
- tools/scripts/spicy/scan-ids.sh — DELETED ✅
- tools/scripts/spicy/scan-secrets.sh — DELETED ✅
- docs/INCONSISTENCY-DB.md — INC-018 (BSL-006 bank-soal) + INC-019 (GRM-000 n4) seeded
- _MAP.md — C1/C2/C3a ✅, C3b unblocked → 🔴 OPEN, Spicy Scan Counter 1/3
- docs/operational/qa-verdicts/QA-VERDICT-SPICY-6-C1C2C3a.md — archived

## Flag
⚠️ INC-018: BSL-006 bs-n4-w4d7-13 duplicate choices — perlu Task Brief untuk Batter
⚠️ INC-019: GRM-000 n4 genuine parse errors — perlu investigasi Spicy
⚠️ TASK-SPICY-6-C3b: 🔴 OPEN, siap dispatch ke Crunchy CP1

---

# MERGE SUMMARY
Versi    : v14.18.5 → v14.18.6
Tanggal  : 21 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : SPICY-PROP-006 — Spicy Proposal Review + SPICY-SCAN post-v14.18.5 acknowledge
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED

## Perubahan
- docs/INCONSISTENCY-DB.md — INC-017 ditambahkan (tabel row), INC-013 count diupdate 57→106
- docs/QA-EFFECTIVENESS-DB.md — diupdate Crunchy (acknowledge SPICY-SCAN findings)
- _MAP.md — 5 task SPICY-6 ditambahkan (C1–C4), INC-013 count diupdate, Spicy Scan Counter reset
- docs/operational/proposals/SPICY-PROP-006-CRUNCHY-REVIEW.md — archived
- docs/operational/qa-verdicts/QA-VERDICT-SPICY-PROP-006.md — archived

## Task Brief Disiapkan (siap dispatch ke Crunchy CP1)
- TASK-BRIEF_SPICY-6-C1.zip — Bugfixes Kritikal (dispatch segera)
- TASK-BRIEF_SPICY-6-C2.zip — Validator Fixes (dispatch segera, paralel C1)
- TASK-BRIEF_SPICY-6-C3a.zip — New Scripts (dispatch setelah C2 merged)
- TASK-BRIEF_SPICY-6-C3b.zip — Coverage Scripts (dispatch setelah C3a merged)

## Flag
⚠️ Milestone Counter: 5/5 🔔 TIER 1 AUDIT sudah triggered (counter aktif mulai v15.0.0)
⚠️ INC-017: load order violation di index.html — Task Brief untuk Golden perlu dibuat
   (ditahan per arahan Nugget-san — dispatch setelah C1+C2 merged)

---

# MERGE SUMMARY
Versi    : v14.14.2 → v14.15.0
Tanggal  : 19 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- GOV-013-A — Token Efficiency + Hygiene Governance (Agent 6 Crunchy)
- GOV-013-B — Hygiene fixes: sw.js, style.css, manifest.json, README.md (Agent 5 Golden)
- TASK-SPICY-2 + GOV-013-C — 26 utils scripts + 2 spicy fixes (Agent 7 Spicy)

## File yang Diubah
| File | Perubahan |
|------|-----------|
| AGENT-COMMON.md | v9 → v10 |
| AGENT-COMMON-CRISPY-ADDENDUM.md | FILE BARU |
| AGENT-COMMON-CRUNCHY-ADDENDUM.md | FILE BARU |
| agent-prompts/AGENT-1-INTEGRATOR-v9.txt | Replace v8 |
| agent-prompts/AGENT-6-QA-v9.txt | Replace v8 |
| SESSION-RECAP-MARET2026.txt | Replace v16 |
| SESSION-RECAP-ARCHIVE.txt | FILE BARU |
| MASTER-FLOW-NUGGET-NIHONGO-v5.md | Replace v4 |
| docs/ERROR-PATTERN-DB.md | Renamed dari ERROR-PATTERN-LOG.md |
| docs/DECISION-DB.md | Renamed dari DECISION-LOG.md |
| docs/SOURCE-REFERENCE.md | Renamed dari source-reference.md |
| docs/archive/AGENT-RATE-LIMIT-LOG-archived.md | Moved dari root |
| docs/archive/CRUNCHY-NOTIFICATION-CLEANUP-001.md | Moved dari root |
| docs/archive/AGENT6-QA-AuditReport.docx | Moved dari docs/ |
| sw.js | Hygiene fixes + CACHE nihongo-v14.15.0 |
| css/style.css | Hygiene fixes |
| manifest.json | Hygiene fixes |
| README.md | Hygiene fixes |
| tools/scripts/utils/*.js (26 files) | FILE BARU — utils scripts |
| tools/scripts/utils/README-UTILS.md | FILE BARU |
| tools/scripts/spicy/config.js | Replace — VALID_POS + RETIRED_FILES fix |
| tools/scripts/spicy/validate-vocab-schema.js | Replace — field names + parser fix |
| js/core/version.js | v14.14.2 → v14.15.0 |
| _MAP.md | Queue, counters, stale refs cleanup |
| docs/INCONSISTENCY-DB.md | INC-006 added, INC-004 → CARRY-OVER |

## Dispatch Summary
| Task ID | Agent | Dep. Status | Bisa mulai? |
|---------|-------|-------------|-------------|
| TASK-SPICY-3 | Spicy (A7) | 🟢 ISOLATED | ZIP siap |
| RESTRUKTURISASI-C | Saucy+Batter+Crispy | 🟢 READY | Bisa mulai |
| TASK-UI-10 | Golden (A5) | 🟢 ISOLATED | Bisa sekarang |
| TASK-8 | Juicy (A2) | 🟢 ISOLATED | Bisa sekarang |

## Flag untuk Crunchy
- INC-004 ID collision: Crunchy label entry SPICY2 sebagai INC-004, tapi DB sudah ada INC-004 (README-SPICY-SCRIPTS.md). Aku assign INC-006. Perlu Crunchy acknowledge.

## Yang TIDAK Perlu Dilakukan
- Jangan update AGENT-2 s/d AGENT-5, AGENT-7, AGENT-8, AGENT-9 (tidak ada perubahan untuk mereka)
- Jangan ubah index.html — tools scripts tidak di-load browser
- MASTER-FLOW-v4.md di root bisa dihapus setelah Nugget-san konfirmasi rollout atomic selesai

---

# MERGE SUMMARY
Versi    : v14.15.0 (governance/docs — tidak ada versi bump)
Tanggal  : 19 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- SPICY-SERIES-REKOMENDASI — Governance recommendation dari Crunchy, approved Nugget-san.
  Bahan Task Brief untuk TASK-SPICY-3 s/d TASK-SPICY-5 + TASK-GOV-MANDATORY.

## File yang Diubah
| File | Perubahan |
|------|-----------|
| _MAP.md | DISPATCH QUEUE expanded — TASK-SPICY-4A–4D, SPICY-5, GOV-MANDATORY ditambahkan. SPICY-3 note + dependency diperbarui. Header last-updated diperbarui. |
| docs/QA-EFFECTIVENESS-DB.md | Replace — versi terbaru dari Crunchy (update QA-002 acknowledge) |
| docs/REKOMENDASI-SPICY-SERIES.md | FILE BARU — dokumen rekomendasi Crunchy, disimpan sebagai referensi |
| MERGE-SUMMARY.md | Entry ini |

## Versi
Tidak ada bump — ini merge governance/docs, tidak menyentuh app code atau konten.
version.js + sw.js CACHE tidak berubah.

## Yang Harus Dilakukan Nugget-san Selanjutnya
- Bawa TASK-BRIEF_TASK-SPICY-3.zip ke Crunchy untuk CP(1)

## Dispatch Summary
| Task ID | Agent | Dep. Status | Bisa mulai? |
|---------|-------|-------------|-------------|
| TASK-SPICY-3 | Spicy (A7) | 🟢 ISOLATED | Task Brief siap — tunggu CP(1) Crunchy |
| TASK-SPICY-4A–4D | Spicy (A7) | 🔒 | TASK-SPICY-3 merged |
| TASK-SPICY-5 | Spicy (A7) | 🔒 | TASK-SPICY-3 merged |
| TASK-GOV-MANDATORY | Crunchy draft | 🔒 | SPICY-3 + SPICY-4 merged |

## Flag untuk Crunchy
- INC-004 acknowledge (dari MERGE-SUMMARY sebelumnya): Crunchy label INC-004 di QA-EFFECTIVENESS-DB — sudah ada di versi terbaru yang diupload.

---

# MERGE SUMMARY
Versi    : v14.15.0 → v14.15.1
Tanggal  : 19 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- TASK-SPICY-3 — Foundation batch: 9 scripts baru + parse-docx.py + 2 updates (Agent 7 Spicy)

## File yang Diubah
| File | Perubahan |
|------|-----------|
| `tools/scripts/utils/extract-zip.js` | FILE BARU |
| `tools/scripts/utils/zip-intake-check.js` | FILE BARU |
| `tools/scripts/utils/inject-file-into-zip.js` | FILE BARU |
| `tools/scripts/utils/repackage-zip.js` | FILE BARU |
| `tools/scripts/utils/update-db-entry.js` | FILE BARU |
| `tools/scripts/utils/scan-stale-comments.js` | FILE BARU |
| `tools/scripts/utils/check-font-coverage.sh` | FILE BARU |
| `tools/scripts/utils/package-spicy-scan.js` | FILE BARU |
| `tools/scripts/utils/run-qa-tests.js` | FILE BARU |
| `tools/scripts/utils/parse-docx.py` | FILE BARU |
| `tools/scripts/utils/package-task-brief.js` | Update — agent-to-scripts mapping A1–A9 |
| `tools/scripts/utils/README-UTILS.md` | Update — tabel utils-vs-spicy + 9 scripts baru |
| `docs/INCONSISTENCY-DB.md` | INC-007–010 added (config.js findings dari ON-DEMAND scan) |
| `docs/VIOLATION-DB.md` | Update dari Crunchy |
| `docs/QA-EFFECTIVENESS-DB.md` | QA-003 added |
| `docs/RATE-LIMIT-DB.md` | RL-008 added |
| `js/core/version.js` | v14.15.0 → v14.15.1 |
| `sw.js` | CACHE nihongo-v14.15.0 → nihongo-v14.15.1 |
| `_MAP.md` | TASK-SPICY-3 ✅, TASK-CONFIG-FIX added 🔴 URGENT, grammar counts updated (INFO-001), Spicy scan counter updated |
| `MERGE-SUMMARY.md` | Entry ini |

## Versi
Patch — tools infrastructure only. Tidak ada perubahan app code atau konten.

## Yang Harus Dilakukan Nugget-san Selanjutnya
- Bawa TASK-BRIEF_TASK-CONFIG-FIX.zip ke Crunchy untuk CP(1)

## Dispatch Summary
| Task ID | Agent | Dep. Status | Bisa mulai? |
|---------|-------|-------------|-------------|
| TASK-CONFIG-FIX | Spicy (A7) | 🔴 URGENT | Task Brief siap — tunggu CP(1) Crunchy |
| TASK-SPICY-4A–4D | Spicy (A7) | 🔒 | TASK-CONFIG-FIX merged |
| TASK-SPICY-5 (Bucket E) | Spicy (A7) | 🔒 | TASK-CONFIG-FIX merged |

## Flag untuk Crunchy
- Spicy Scan Counter: 3/3 — ON-DEMAND scan sudah jalan. Crunchy acknowledge di QA-EFFECTIVENESS-DB sudah done (QA-003).

---

# MERGE SUMMARY
Versi    : v14.15.1 → v14.15.2
Tanggal  : 19 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- TASK-CONFIG-FIX — Fix config.js, validate-vocab-schema.js + scope expand: validate-grammar-schema.js, schema-validate.js (Agent 7 Spicy)

## File yang Diubah
| File | Perubahan |
|------|-----------|
| `tools/scripts/spicy/config.js` | Fix A (vocab-n4 dari RETIRED_FILES), Fix B (VALID_POS sync), Fix C (6 konstanta + exports) |
| `tools/scripts/spicy/validate-vocab-schema.js` | Fix D ('kanji' → 'word') + VOCAB_DEPRECATED_FIELDS integration |
| `tools/scripts/spicy/validate-grammar-schema.js` | Scope expand — type-aware grammar validation (approved Nugget-san mid-task) |
| `tools/scripts/spicy/schema-validate.js` | Scope expand — now functional setelah Fix C exports tersedia |
| `docs/INCONSISTENCY-DB.md` | INC-007–010 → RESOLVED; INC-011–012 NEW |
| `docs/VIOLATION-DB.md` | GOV-007 baru (non-blocking process violation) |
| `docs/QA-EFFECTIVENESS-DB.md` | QA-004 added |
| `docs/RATE-LIMIT-DB.md` | RL-009 added |
| `js/core/version.js` | v14.15.1 → v14.15.2 |
| `sw.js` | CACHE nihongo-v14.15.1 → nihongo-v14.15.2 |
| `_MAP.md` | TASK-CONFIG-FIX ✅, TASK-INC012-FIX + TASK-BATTER-CATS-REVIEW added, SPICY-4A–4D dep clear |
| `MERGE-SUMMARY.md` | Entry ini |

## Versi
Patch — tools/scripts/spicy/ fixes. INC-007–010 resolved.

## Action Items Post-merge
1. Buat Task Brief untuk TASK-INC012-FIX → Juicy (A2)
2. Buat Task Brief untuk TASK-BATTER-CATS-REVIEW → Batter (A4)
3. TASK-SPICY-4A–4D sekarang bisa di-brief (paralel)

## Dispatch Summary
| Task ID | Agent | Status |
|---------|-------|--------|
| TASK-INC012-FIX | Juicy (A2) | 🔴 Task Brief pending |
| TASK-BATTER-CATS-REVIEW | Batter (A4) | 🔴 Task Brief pending |
| TASK-SPICY-4A | Spicy (A7) | 🔒 → bisa mulai Task Brief |
| TASK-SPICY-4B | Spicy (A7) | 🔒 → bisa mulai Task Brief |
| TASK-SPICY-4C | Spicy (A7) | 🔒 → bisa mulai Task Brief |
| TASK-SPICY-4D | Spicy (A7) | 🔒 → bisa mulai Task Brief |

## Flag untuk Crunchy
- GOV-007 violation Spicy: dicatat di VIOLATION-DB. Spicy sudah diperingatkan via QA-VERDICT.
- INC-011: grammar-n1.js + grammar-n2.js parse errors — placeholder files, low priority.
- INC-012: 533 vocab-n4.js non-verb conj_type 'godan' → Juicy scope.

---

# MERGE SUMMARY
Versi    : v14.15.2 → v14.16.0
Tanggal  : 20 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- TASK-SPICY-4A — Vocab domain tools: 5 scripts (Agent 7 Spicy)
- TASK-SPICY-4B — Grammar/Bank Soal domain tools: 5 scripts (Agent 7 Spicy)
- TASK-SPICY-4C — Book/Sources domain tools: 5 scripts (Agent 7 Spicy)
- TASK-SPICY-4D — UI domain tools: 6 scripts (Agent 7 Spicy)

## File yang Diubah
| File | Perubahan |
|------|-----------|
| `tools/scripts/utils/get-pos-list.js` | FILE BARU |
| `tools/scripts/utils/get-field-template.js` | FILE BARU |
| `tools/scripts/utils/check-xref-bidirectional.js` | FILE BARU |
| `tools/scripts/utils/count-entries-by-level.js` | FILE BARU |
| `tools/scripts/utils/get-vocab-completeness.js` | FILE BARU |
| `tools/scripts/utils/get-cat-list.js` | FILE BARU |
| `tools/scripts/utils/get-week-summary.js` | FILE BARU |
| `tools/scripts/utils/get-bank-soal-stats.js` | FILE BARU |
| `tools/scripts/utils/validate-bank-soal-coverage.js` | FILE BARU |
| `tools/scripts/utils/check-grammar-duplicates.js` | FILE BARU |
| `tools/scripts/utils/get-book-stats.js` | FILE BARU |
| `tools/scripts/utils/get-unit-summary.js` | FILE BARU |
| `tools/scripts/utils/validate-book-completeness.js` | FILE BARU |
| `tools/scripts/utils/scaffold-book-chapter.js` | FILE BARU |
| `tools/scripts/utils/validate-sources-counts.js` | FILE BARU |
| `tools/scripts/utils/get-css-variable-list.js` | FILE BARU |
| `tools/scripts/utils/get-js-function-index.js` | FILE BARU |
| `tools/scripts/utils/get-component-map.js` | FILE BARU |
| `tools/scripts/utils/validate-css-variables.js` | FILE BARU |
| `tools/scripts/utils/get-dead-css-classes.js` | FILE BARU |
| `tools/scripts/utils/get-quiz-api-map.js` | FILE BARU |
| `docs/INCONSISTENCY-DB.md` | INC-013–016 added |
| `docs/QA-EFFECTIVENESS-DB.md` | QA-005 added |
| `docs/RATE-LIMIT-DB.md` | RL-010 added |
| `js/core/version.js` | v14.15.2 → v14.16.0 |
| `sw.js` | CACHE nihongo-v14.15.2 → nihongo-v14.16.0 |
| `_MAP.md` | 4A–4D ✅, INC task briefs added, counters updated |
| `MERGE-SUMMARY.md` | Entry ini |

## Versi
Minor — 21 scripts baru (tools infrastructure). Milestone counter: 4/5.

## Action Items Post-merge
1. Buat Task Brief TASK-INC013-FIX → Juicy (A2)
2. Buat Task Brief TASK-INC014-FIX → Batter (A4)
3. Buat Task Brief TASK-INC015-FIX → Golden (A5)
4. TASK-INC012-FIX + TASK-BATTER-CATS-REVIEW masih pending Task Brief
5. TASK-SPICY-5 sekarang bisa mulai (dependency SPICY-4 sudah merged)

---

# MERGE SUMMARY
Versi    : v14.16.0 → v14.17.0
Tanggal  : 20 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- GOV-014 — ARCHIVE-INIT governance doc + GOV-MANDATORY-v4 (Crunchy, GAP-1 flow)

## File yang Diubah / Ditambah
| File | Perubahan |
|------|-----------|
| `TASK-GOV-MANDATORY-v4.md` | FILE BARU — staged di root, pending TASK-ARCHIVE-INIT |
| `TASK-ARCHIVE-INIT.md` | FILE BARU — staged di root, pending TASK-ARCHIVE-INIT |
| `SPICY-PROPOSAL-FORMAT-CRUNCHY.md` | FILE BARU — staged di root, pending TASK-ARCHIVE-INIT |
| `FLUFFY-PROPOSAL-FORMAT-FORMAL.md` | FILE BARU — staged di root, pending TASK-ARCHIVE-INIT |
| `js/core/version.js` | v14.16.0 → v14.17.0 |
| `sw.js` | CACHE nihongo-v14.16.0 → nihongo-v14.17.0 |
| `_MAP.md` | TASK-GOV-MANDATORY dipecah 3 tahap; TASK-ARCHIVE-INIT + TASK-SAVORY-PREP added |
| `MERGE-SUMMARY.md` | Entry ini |

## Versi
Gov minor — governance docs baru + _MAP restructure. App counter tetap 4/5.

## Archive Note
4 files di root adalah STAGING — perlu dipindah saat TASK-ARCHIVE-INIT selesai:
  · TASK-GOV-MANDATORY-v4.md → docs/governance/
  · TASK-ARCHIVE-INIT.md → docs/governance/
  · SPICY-PROPOSAL-FORMAT-CRUNCHY.md → docs/governance/proposals/
  · FLUFFY-PROPOSAL-FORMAT-FORMAL.md → docs/governance/proposals/

## Action Items Post-merge
1. Buat Task Brief TASK-GOV-MANDATORY-TAHAP1 → Crunchy (A6) — Task Brief siap
2. Buat Task Brief TASK-ARCHIVE-INIT → Crispy (diri sendiri) — lewat CP(1) Crunchy
3. TASK-SPICY-5 bisa dimulai (dependency SPICY-4 ✅)
4. SPICY-PROPOSAL-FORMAT-CRUNCHY.md: forward ke Spicy saat assign (Spicy buat proposal sendiri dulu tanpa baca milik Crunchy)
5. FLUFFY-PROPOSAL-FORMAT-FORMAL.md: simpan, forward ke Fluffy saat onboard

---

# MERGE SUMMARY
Versi    : v14.17.0 → v14.17.1
Tanggal  : 20 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- TASK-ARCHIVE-INIT (GOV-015) — Step 1–4, partial (Crispy self-task)

## File yang Diubah / Ditambah
| File | Perubahan |
|------|-----------|
| `docs/governance/.gitkeep` | FOLDER BARU |
| `docs/governance/archive/.gitkeep` | FOLDER BARU |
| `docs/governance/proposals/.gitkeep` | FOLDER BARU |
| `docs/operational/qa-verdicts/.gitkeep` | FOLDER BARU |
| `docs/operational/dispatch-clearances/.gitkeep` | FOLDER BARU |
| `docs/operational/patch-notes/.gitkeep` | FOLDER BARU |
| `docs/operational/session-proofs/.gitkeep` | FOLDER BARU |
| `docs/governance/TASK-GOV-MANDATORY-v4.md` | MOVED dari root |
| `docs/governance/TASK-ARCHIVE-INIT.md` | MOVED dari root |
| `docs/governance/proposals/SPICY-PROPOSAL-FORMAT-CRUNCHY.md` | MOVED dari root |
| `docs/governance/proposals/FLUFFY-PROPOSAL-FORMAT-FORMAL.md` | MOVED dari root |
| `docs/governance/proposals/REKOMENDASI-SPICY-SERIES.md` | MOVED dari docs/ |
| `docs/governance/proposals/GOV-011-SPICY-COMPLETE-v3.docx` | MOVED dari docs/ |
| `docs/governance/ARCHIVE-INIT-LOG.md` | FILE BARU |
| `js/core/version.js` | v14.17.0 → v14.17.1 |
| `sw.js` | CACHE nihongo-v14.17.0 → nihongo-v14.17.1 |
| `_MAP.md` | TASK-ARCHIVE-INIT → 🟡 PARTIAL |
| `MERGE-SUMMARY.md` | Entry ini |

## Versi
Patch — governance structure only. Counter tetap 4/5.

## Catatan
TASK-ARCHIVE-INIT Step 5+6 masih pending — menunggu TASK-GOV-MANDATORY-TAHAP1 selesai.
Saat TAHAP1 merged: update README.md + AGENT-COMMON-CRISPY-ADDENDUM-v2 checklist.

---

# MERGE SUMMARY
Versi    : v14.17.1 (no bump — governance only)
Tanggal  : 20 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- TASK-ARCHIVE-INIT (GOV-015) — Crispy self-task
- TASK-GOV-MANDATORY-TAHAP1 — Crunchy governance

## File yang Diubah / Ditambah
| File | Perubahan |
|------|-----------|
| `docs/governance/` (tree) | CONFIRMED via merge-patch.js |
| `docs/operational/` (tree) | CONFIRMED via merge-patch.js |
| `docs/governance/ARCHIVE-INIT-LOG.md` | Updated |
| `AGENT-COMMON-v11.md` | FILE BARU — root |
| `AGENT-COMMON-CRISPY-ADDENDUM-v2.md` | FILE BARU — root |
| `AGENT-COMMON-CRUNCHY-ADDENDUM-v2.md` | FILE BARU — root |
| `agent-prompts/AGENT-1-INTEGRATOR-v10.txt` | FILE BARU |
| `agent-prompts/AGENT-2-VOCAB-v6.txt` | FILE BARU |
| `agent-prompts/AGENT-3-BOOK-v6.txt` | FILE BARU |
| `agent-prompts/AGENT-4-GRAMMAR-v6.txt` | FILE BARU |
| `agent-prompts/AGENT-5-UI-v6.txt` | FILE BARU |
| `agent-prompts/AGENT-6-QA-v10.txt` | FILE BARU |
| `agent-prompts/AGENT-7-SPICY-v4.txt` | FILE BARU (.docx → .txt) |
| `agent-prompts/AGENT-8-FLUFFY-v2.txt` | FILE BARU (.docx → .txt) |
| `agent-prompts/AGENT-9-SAVORY-v3.txt` | FILE BARU (.docx → .txt) |
| `README.md` | Tambah docs/ folder structure (ARCHIVE-INIT Step 5) |
| `_MAP.md` | TASK-ARCHIVE-INIT ✅, TASK-GOV-MANDATORY-TAHAP1 ✅ |
| `MERGE-SUMMARY.md` | Entry ini |

## Versi
Governance only — no version bump. v14.17.1 tetap.

## ⚠️ ROLLOUT WAJIB ATOMIC (Nugget-san)
Upload semua ke PK SEBELUM sesi agent manapun dimulai:
1. AGENT-COMMON-v11.md → PK SEMUA agent (replace v10)
2. AGENT-COMMON-CRISPY-ADDENDUM-v2.md → PK Agent 1 SAJA
3. AGENT-COMMON-CRUNCHY-ADDENDUM-v2.md → PK Agent 6 SAJA
4. AGENT-1-INTEGRATOR-v10.txt → PK Agent 1
5. AGENT-2-VOCAB-v6.txt → PK Agent 2
6. AGENT-3-BOOK-v6.txt → PK Agent 3
7. AGENT-4-GRAMMAR-v6.txt → PK Agent 4
8. AGENT-5-UI-v6.txt → PK Agent 5
9. AGENT-6-QA-v10.txt → PK Agent 6
10. AGENT-7-SPICY-v4.txt → PK Agent 7
11. AGENT-8-FLUFFY-v2.txt → PK Agent 8
12. AGENT-9-SAVORY-v3.txt → PK Agent 9

---

# MERGE SUMMARY
Versi    : v14.17.1 → v14.18.4
Tanggal  : 20 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge (6 tasks, 1 sesi)
- TASK-SPICY-BUCKET-J — 8 scripts testing/self-diagnostic (v14.17.2, patch)
- TASK-SPICY-5A — 17 scripts Bucket F + Bucket J/new (v14.18.0, MINOR)
- TASK-SPICY-5B — 6 scripts Bucket E/Crispy (v14.18.1, patch)
- TASK-SPICY-5C — 10 scripts governance/audit (v14.18.2, patch)
- TASK-SPICY-5D — 5 scripts Spicy self + cross-file (v14.18.3, patch)
- TASK-SPICY-5E — prepare-deployment.js (v14.18.4, patch)

## File yang Diubah
| File | Perubahan |
|------|-----------| 
| tools/scripts/utils/ (47 files) | FILE BARU — BUCKET-J (8) + 5A (17) + 5B (6) + 5C (10) + 5D (5) + 5E (1) |
| js/core/version.js | v14.17.1 → v14.18.4 |
| sw.js | CACHE nihongo-v14.17.1 → nihongo-v14.18.4 |
| _MAP.md | 6 tasks ✅, 3 tasks unlocked (GOV-TAHAP2, GOV-TAHAP3, SAVORY-PREP), Spicy counter 3/3, Milestone 5/5 🔔 |
| docs/operational/qa-verdicts/ | 6 QA-VERDICTs diarchive |
| docs/operational/patch-notes/ | 6 PATCH-NOTES diarchive |
| docs/operational/session-proofs/ | 6 SESSION-PROOFs diarchive |

## Unlocks
- TASK-GOV-MANDATORY-TAHAP2 → 🔴 OPEN (Crunchy)
- TASK-GOV-MANDATORY-TAHAP3 → 🔴 OPEN (Crunchy)
- TASK-SAVORY-PREP → 🔴 OPEN (Savory)

## Milestone Alerts
🔔 App minor counter: 5/5 → TIER 1 AUDIT due (Layer 4+5)
🔔 Spicy Scan Counter: 3/3 → PERIODIC SCAN due

## TOOLS zip perlu diperbarui untuk
Semua agent — 47 scripts baru di utils/. Prioritas: agent yang paling sering pakai orientation scripts (A1 Crispy, A6 Crunchy, A7 Spicy).

## Catatan
- TASK-SPICY-5A: 2 non-blocking findings (FINDING-5A-1, 5A-2) — Spicy fix di patch berikutnya
- TASK-SPICY-5C: 3 non-blocking findings termasuk false positive kata "DRAFT" — documented
- TASK-SPICY-5B: sync-sw-assets false positive (data: URI) — documented, tidak perlu fix sekarang

---

# MERGE SUMMARY
Versi    : v14.18.4 → v14.18.5
Tanggal  : 20 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Task yang Di-merge
- GOV-016 — Project Intelligence Architecture (Agent 6 Crunchy)

## File yang Diubah
| File | Perubahan |
|------|-----------|
| docs/governance/VISION.md | FILE BARU — North Star + Agent Constitution |
| docs/governance/PROJECT-INTELLIGENCE-ARCHITECTURE.md | FILE BARU — 14-layer intelligence blueprint |
| docs/governance/DECISION-MATRIX-CONFIG.yaml | FILE BARU — weights, thresholds, scoring config |
| docs/governance/proposals/IDEA-PLAN-PROJECT-INTELLIGENCE-ARCHITECTURE.md | FILE BARU — Phase 0–6 roadmap |
| SESSION-RECAP-MARET2026.txt | Replace — GOV-016 added, GOV-014 trimmed ke archive |
| js/core/version.js | v14.18.4 → v14.18.5 |
| sw.js | CACHE nihongo-v14.18.4 → nihongo-v14.18.5 |
| _MAP.md | GOV-016 ✅, 17 TASK-INTEL seeded, TASK-INTEL-P0A unlocked |

## Unlocks
- TASK-INTEL-P0A → 🔴 OPEN (Crunchy+Crispy) — baca IDEA-PLAN Section 5 sebelum dispatch

## Catatan
- Governance-only patch — tidak ada code change, script baru, atau schema change
- VISION.md dan PIA.md: governance docs, TIDAK masuk PK agent manapun
- TASK-INTEL-P0A bisa langsung di-dispatch — dep. TASK-SPICY-5A sudah merged (v14.18.0)
- Sebelum dispatch TASK-INTEL apapun: wajib baca IDEA-PLAN Section 5

---

## v14.19.0 → v14.19.1 — TASK-INC012-FIX + TASK-INC013-FIX (21 Mar 2026, patch)
**Type:** data fix (INC-012 retroactive close + INC-013 see_also fix)

## Ringkasan
- TASK-INC012-FIX: INC-012 terkonfirmasi sudah bersih di file aktual. Tidak ada file change.
  Entry retroactive ditambahkan ke INCONSISTENCY-DB dengan status RESOLVED.
- TASK-INC013-FIX: 28 broken see_also refs di vocab-n4.js di-remap (v-n4- → vg-n4-). 0 dihapus.
  Catatan: count Task Brief = 106, actual di vocab-n4.js = 28. Kemungkinan 78 sisanya
  di vocab files lain. Flag untuk follow-up Spicy scan.

## File yang Diubah
| File | Perubahan |
|------|-----------|
| data/vocab-n4.js | 28 see_also refs remapped v-n4- → vg-n4- (INC-013) |
| docs/INCONSISTENCY-DB.md | INC-012 retroactive entry (RESOLVED) + INC-013 status → RESOLVED |
| _MAP.md | TASK-INC012-FIX ✅, TASK-INC013-FIX ✅ |
| js/core/version.js | v14.19.0 → v14.19.1 |
| sw.js | CACHE nihongo-v14.19.0 → nihongo-v14.19.1 |

## Catatan
- INC-013 count mismatch (106 vs 28): pertimbangkan follow-up task Juicy untuk vocab-n5.js dan vocab-n3.js

---

## v14.19.1 → v14.20.0 — TASK-SPICY-6-C3b (21 Mar 2026, minor)
**Type:** new scripts (tooling layer)

## Ringkasan
3 scripts baru ditambahkan ke tools layer: detect-stale-project-files.js (utils),
validate-cross-schema-refs.js (spicy, extends validate-xref-ids.js), validate-inc-db-sync.js (utils).
validate-inc-db-sync.js mengidentifikasi ISS-002: INC-007–010 dan INC-012 tidak ada entry
formal di INCONSISTENCY-DB — INC-012 sudah di-handle di merge sebelumnya (v14.19.1).
INC-007–010 butuh retroactive entries terpisah (flag untuk Crispy).

## File yang Diubah
| File | Perubahan |
|------|-----------|
| tools/scripts/utils/detect-stale-project-files.js | BARU |
| tools/scripts/spicy/validate-cross-schema-refs.js | BARU |
| tools/scripts/utils/validate-inc-db-sync.js | BARU |
| _MAP.md | TASK-SPICY-6-C3b ✅, Spicy scan counter 1/3 → 2/3 |
| js/core/version.js | v14.19.1 → v14.20.0 |
| sw.js | CACHE nihongo-v14.19.1 → nihongo-v14.20.0 |

## TOOLS zip perlu diperbarui untuk: A6 Crunchy, A7 Spicy (validate-inc-db-sync.js relevan untuk Crunchy)

## Catatan
- validate-cross-schema-refs.js: EXTEND mode — tidak duplikasi validate-xref-ids.js
- ISS-002 finding: INC-007–010 tidak ada entry di INCONSISTENCY-DB — retroactive entries pending

---

## v14.20.0 → v14.21.0 — TASK-GOV-MANDATORY-TAHAP2+3 (21 Mar 2026, minor)
**Type:** governance update + new config file

## Ringkasan
TAHAP2: AGENT-6-QA-v12.txt — opening sequence diganti dari get-map-summary ke get-db-summary.
TAHAP3: agent-tools-config.js — single source of truth mapping agent → scripts (A1–A9 + UNIVERSAL).
        AGENT-COMMON-CRISPY-ADDENDUM-v4.md — TOOLS ZIP section diupdate dengan referensi ke config baru.
generate-tools-zip.js masih pending — butuh Task Brief Spicy terpisah.

## File yang Diubah
| File | Perubahan |
|------|-----------|
| agent-prompts/AGENT-6-QA-v12.txt | BARU — v11 diganti, opening seq get-db-summary |
| tools/scripts/utils/agent-tools-config.js | BARU — agent-to-scripts mapping config |
| AGENT-COMMON-CRISPY-ADDENDUM-v4.md | BARU — v3 diganti, TOOLS ZIP section updated |
| agent-prompts/AGENT-6-QA-v11.txt | RETIRED → docs/archive/ |
| AGENT-COMMON-CRISPY-ADDENDUM-v3.md | RETIRED → docs/archive/ |
| _MAP.md | TAHAP2 ✅, TAHAP3 ✅, Spicy scan counter 2/3 → 3/3 |
| js/core/version.js | v14.20.0 → v14.21.0 |
| sw.js | CACHE nihongo-v14.20.0 → nihongo-v14.21.0 |

## TOOLS zip perlu diperbarui untuk: A1 Crispy (AGENT-COMMON-CRISPY-ADDENDUM-v4.md), A6 Crunchy (AGENT-6-QA-v12.txt)

## Unlocks
- generate-tools-zip.js: pending Task Brief ke Spicy (agent-tools-config.js sudah tersedia sebagai dependency)

## Catatan
- Spicy scan counter 3/3 tercapai — Spicy periodic scan dijadwalkan setelah sesi ini
- Nugget-san wajib update PK: Agent 6 ← AGENT-6-QA-v12.txt, Agent 1 ← AGENT-COMMON-CRISPY-ADDENDUM-v4.md

---

## v14.22.3 → v14.22.4 — TASK-INC020-FIX (22 Mar 2026, patch)
**Type:** bug fix (INC-020 SWA-001 — sw.js ASSETS missing grammar files)

## Ringkasan
Fix INC-020: grammar-n3.js, grammar-n4.js, grammar-n5.js tidak ada di sw.js ASSETS list →
grammar data tidak ter-cache → tidak loading di offline mode.
8 files ditambahkan: grammar-n3/4/5 (data real, critical), grammar-n1/2 (stub), vocab-n1/2/3 (stub).
Juga fix pre-existing comment: vocab-n4.js "692 entries" → "720 entries".
INC-020 status → RESOLVED.

## File yang Diubah
| File | Perubahan |
|------|-----------| 
| sw.js | +8 entries di ASSETS: Grammar DB section + Vocab DB additional section. Comment fix vocab-n4.js. |
| js/core/version.js | v14.22.3 → v14.22.4 |
| docs/INCONSISTENCY-DB.md | INC-020 status → RESOLVED v14.22.4 |
| docs/RATE-LIMIT-DB.md | RL-017 ditambahkan |
| _MAP.md | TASK-INC020-FIX ✅ |

## Catatan
- Spicy noted run-cp1-checklist.js parsing bug → akan di-address via TASK-SPICY-F-002

---

## v14.22.4 → v14.23.0 — TASK-GAP5-FASE-A (22 Mar 2026, minor)
**Type:** new infrastructure (GAP 5 Fase A — SPICY-PROP-007)

## Ringkasan
GAP 5 Fase A: repo security foundation sebelum GitHub push.
4 deliverables: .gitignore (cegah internal files ter-commit), deploy.yml hardened
(9 explicit deny permissions), pre-deploy-checks.yml (CI baru: secrets + version + ID + assets),
install-hooks.sh (installer pre-commit hook lokal untuk Nugget-san).
Semua scripts di pre-deploy-checks.yml verified CI-compatible (process.cwd()).

## File yang Diubah / Dibuat
| File | Perubahan |
|------|-----------|
| .gitignore | BARU — exclude agent-prompts/, docs/, tools/, .env*, OS junk |
| .github/workflows/deploy.yml | UPDATE — +9 explicit deny permissions |
| .github/workflows/pre-deploy-checks.yml | BARU — CI pre-deploy workflow |
| tools/scripts/install-hooks.sh | BARU — pre-commit hook installer |
| js/core/version.js | v14.22.4 → v14.23.0 |
| sw.js | CACHE nihongo-v14.22.4 → nihongo-v14.23.0 |
| docs/RATE-LIMIT-DB.md | RL-018 ditambahkan |
| _MAP.md | TASK-GAP5-FASE-A ✅ |

## Catatan
- SECRETS-POLICY.md out of scope Fase A — akan di-scope di Fase B
- Nugget-san: jalankan `bash tools/scripts/install-hooks.sh` dari root project untuk aktifkan pre-commit hook

## Merge — 23 Maret 2026 (v14.23.0 → v14.23.1)

Task     : TASK-SPICY-F-002 — AUTO-TRIGGER fix: 5 senior agent prompts (A1/A6/A7/A8/A9)
QA by    : Agent 6 — Crunchy 🦷
Versi    : v14.23.0 → v14.23.1 (patch)

Files merged:
- agent-prompts/AGENT-1-INTEGRATOR-v11.txt — AUTO-TRIGGER lines added
- agent-prompts/AGENT-6-QA-v12.txt — AUTO-TRIGGER lines added
- agent-prompts/AGENT-7-SPICY-v4.txt — AUTO-TRIGGER lines added
- agent-prompts/AGENT-8-FLUFFY-v2.txt — AUTO-TRIGGER lines added
- agent-prompts/AGENT-9-SAVORY-v3.txt — AUTO-TRIGGER lines added

Milestone: governance patch — tidak dihitung ke app minor counter.
TOOLS zip: tidak perlu diperbarui (perubahan di agent-prompts/, bukan tools/scripts/).

## Merge — 23 Maret 2026 (v14.23.1 — no bump, governance-only)

Task     : TASK-GOV-017 — Governance Hygiene + Reform Proposal
QA by    : Agent 6 — Crunchy 🦷
Versi    : no bump (governance-only per Crunchy recommendation)

Files merged:
- docs/governance/DOCUMENT-TAXONOMY-v5.md — BARU
- docs/governance/GOV-017-FINAL.md — BARU
- MASTER-DIRECTIVE-LOG.md — BARU (root, living doc)
- docs/VIOLATION-DB.md — Fix Effective GOV-001–006 → ✅ TERBUKTI, GOV-007 tetap PENDING

_MAP.md updates:
- Header updated → v14.23.1, 23 Maret 2026
- Domain table: A7/A8/A9 ditambahkan
- Workflow section: Fase 6b (step 11–13) ditambahkan
- DISPATCH QUEUE: TASK-GOV-017 ✅ + 5 sub-tasks seeded (A, B, C, D1, D2)
- TASK-SPICY-F-002: ✅ 23 Maret 2026 (dikonfirmasi dari merge sebelumnya sesi ini)
- Spicy Scan Counter: 2/3

Tasks baru open: TASK-GOV-017-A, B, C, D1 (🔴 OPEN) | D2 (🔒 dep: A+B)
Pertanyaan pending ke Nugget-san: status aktual TASK-GRM-6?
TOOLS zip: tidak perlu diperbarui (tidak ada perubahan di tools/scripts/).

## Hygiene Merge — 23 Maret 2026 (v14.23.1 — no bump, hygiene-only)

Task     : Comprehensive Hygiene Audit (Crispy self-task)
QA by    : N/A — Crispy scope only (_MAP.md, docs/, SESSION-RECAP)

Changes:
- _MAP.md: removed TASK-8/UI-10 stale 🔴 blocks, fixed duplicate TASK LIST header,
  removed orphan INTEGRATOR TASKS section, moved TASK-QA-INIT-3 to new ── QA TASKS ── section,
  seeded TASK-INC017/018/019-FIX + TASK-SPICY-PROP-008, fixed 3 stale strings
- docs/INCONSISTENCY-DB.md: INC-004 RESOLVED, INC-005 EXPIRED,
  INC-013/014/015 body statuses corrected
- SESSION-RECAP-MARET2026.txt: fully rewritten — GOV-016+017 (terkini), v14.23.1,
  accurate bug status, GOV-015 archived
- SESSION-RECAP-ARCHIVE.txt: GOV-015 appended
- docs/governance/proposals/SPICY-PROP-008.md: status → APPROVED
- docs/operational/patch-notes/: PATCH-NOTES-SPICY-PROP-006.md moved from root
- MASTER-DIRECTIVE-LOG.md: GRM-6 + SPICY-PROP-008 entries added

Pending (needs discussion):
- ST5: VISION.md dual copies (root vs docs/governance/) — 2 versi berbeda konten
- UF6: RESTRUKTURISASI-B-BATTER-BANKSOAL ghost task
- UF8: Violation Log Agent 4 "Pending revisi" — Crunchy domain

## Hygiene Merge B — 23 Maret 2026 (v14.23.1 — no bump)

Task     : TASK-HYGIENE-C001 verdict execution + CRUNCHY-COMPREHENSIVE-AUDIT-v14.23.1
Verdict  : Agent 6 — Crunchy 🦷

Changes:
- docs/archive/VISION-root-pre-GOV016.md — root VISION.md diarchive (Item 1)
- docs/governance/VISION.md — Status DRAFT → APPROVED (Item 1)
- ROADMAP.md — refs ke "VISION.md" → "docs/governance/VISION.md" (Item 1)
- _MAP.md Violation Log Agent 4 — ⚠️ Pending revisi → 🔒 Abandoned + closed (Item 3)
- _MAP.md DISPATCH QUEUE — RESTRUKTURISASI-B-BATTER-BANKSOAL dihapus (Item 2)
- _MAP.md Catatan Historis — note RESTRUKTURISASI-B-BATTER removal (Item 2)
- _MAP.md DISPATCH QUEUE — TASK-N3 + TASK-VOC-5 🟡 → 🟢 READY (F-1)
- _MAP.md DISPATCH QUEUE — TASK-QA-INIT-3 entry ditambah ke table (F-2)
- _MAP.md DISPATCH QUEUE — TASK-HYGIENE-C001 → ✅ (F-6)
- docs/operational/correspondence/ — CRUNCHY-NOTIFICATION-CLEANUP-001.md dipindah dari archive (F-3)
- docs/archive/ — GOV-011-SPICY-COMPLETE-v3.docx dipindah dari governance/proposals/ (F-5)
- docs/operational/correspondence/ — CRUNCHY-HYGIENE-C001-VERDICT.md + CRUNCHY-COMPREHENSIVE-AUDIT archived

Pending (F-4 + F-7): TASK-INC017-FIX dispatch + GOV-017 sub-task briefs

---

# MERGE SUMMARY — 23 Maret 2026
Versi    : v14.23.3 → v14.24.0
Tanggal  : 23 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Task     : TASK-SPICY-PROP-008 — ZIP Robustness (run-cp1-checklist.js fix)
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Bump     : minor (script fix + improved parsing logic)
Files    : tools/scripts/utils/run-cp1-checklist.js
Changes  : last-token path detection, Format B task ID/agent parsing fallback,
           Format B section header detection
Note     : resolve-project-root.js + project-health.js sudah resolved via TASK-SPICY-7

---

# MERGE SUMMARY — 23 Maret 2026
Versi    : v14.24.0 → v14.25.0
Tanggal  : 23 Maret 2026
Merged by: Agent 1 — Crispy 🥐

Tasks (batch merge GOV-017-A + GOV-017-B):

TASK-GOV-017-B — New Scripts + 11 Folders
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Files    : tools/scripts/utils/scan-unarchived-docs.js (BARU)
           tools/scripts/utils/snapshot-dbs.js (BARU)
           docs/ — 11 folder baru dengan .gitkeep
           docs/RUNBOOK-SCAN-AND-SNAPSHOT.md

TASK-GOV-017-A — run-merge-checklist Extended + generate-for-integrator-readme
QA by    : Agent 6 — Crunchy 🦷 ✅ APPROVED
Files    : tools/scripts/utils/run-merge-checklist.js (9→15 checks, hard exit, fix hints)
           tools/scripts/utils/generate-for-integrator-readme.js (BARU)
           docs/RUNBOOK-RUN-MERGE-CHECKLIST.md

Bump     : minor (2 scripts baru, 11 folder baru, script extended)
TOOLS zip: perlu diperbarui untuk A1 Crispy, A6 Crunchy (run-merge-checklist.js updated)

---

# MERGE SUMMARY — 28 Maret 2026
Versi    : v14.27.0 → v14.27.1
Tanggal  : 28 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Tasks Merged
| Task | Agent | Keterangan |
|------|-------|------------|
| TASK-GOV-018-A | Spicy (A7) | Termux scripts: 6 .sh + TERMUX-README.md → tools/scripts/utils/termux/ |

## Files Changed
| File | Perubahan |
|------|-----------| 
| `tools/scripts/utils/termux/init_workspace.sh` | BARU |
| `tools/scripts/utils/termux/pull_script.sh` | BARU |
| `tools/scripts/utils/termux/push_script.sh` | BARU |
| `tools/scripts/utils/termux/merge_script.sh` | BARU |
| `tools/scripts/utils/termux/conflict_check.sh` | BARU |
| `tools/scripts/utils/termux/rollback_script.sh` | BARU |
| `tools/scripts/utils/termux/TERMUX-README.md` | BARU |
| `js/core/version.js` | v14.27.0 → v14.27.1 |
| `sw.js` | cache nihongo-v14.27.1 |
| `_MAP.md` | TASK-GOV-018-A ✅ |
| `docs/INCONSISTENCY-DB.md` | INC-NEW-1 seeded |
| `docs/RATE-LIMIT-DB.md` | RL-021 seeded |

## INC
INC-NEW-1: merge_script.sh INC-DB path salah (docs/governance/ → docs/research/). Non-blocking. Fix scope: GOV-018-C atau task terpisah.

## RateLimit
RL-021 seeded — 12/12 steps, 0 friction, 0 checkpoint, clean.

## Spicy
Scan mode: not declared — default: full. Counter: 3/3 (periodic overdue).

## Notes
INC-NEW-2 (token validation minor) tidak di-seed ke INC-DB — non-blocking, noted in QA-VERDICT.

---

# MERGE SUMMARY — 28 Maret 2026 (2)
Versi    : v14.27.1 → v14.27.2
Tanggal  : 28 Maret 2026
Merged by: Agent 1 — Crispy 🥐

## Tasks Merged
| Task | Agent | Keterangan |
|------|-------|------------|
| GOV-018-C-TRIM | Crunchy (A6) → Crispy (A1) | PK Trim: 9 AGENT-CORE files, 29% reduction, OUTPUT DISCIPLINE rule |

## Files Changed
| File | Perubahan |
|------|-----------|
| `pk-nugget-nihongo/AGENT-CORE.md` | Trimmed (A6) |
| `pk-nugget-nihongo/AGENT-CORE-A1.md` | Trimmed — removed agent-performance-db scope |
| `pk-nugget-nihongo/AGENT-CORE-A2.md` | Trimmed — removed session modes prose |
| `pk-nugget-nihongo/AGENT-CORE-A3.md` | Trimmed |
| `pk-nugget-nihongo/AGENT-CORE-A4.md` | Trimmed |
| `pk-nugget-nihongo/AGENT-CORE-A5.md` | Trimmed |
| `pk-nugget-nihongo/AGENT-CORE-A7.md` | Trimmed |
| `pk-nugget-nihongo/AGENT-CORE-A8.md` | Trimmed |
| `pk-nugget-nihongo/AGENT-CORE-A9.md` | Trimmed — research-summary + agent-performance-db removed |
| `js/core/version.js` | v14.27.1 → v14.27.2 |
| `sw.js` | cache nihongo-v14.27.2 |
| `_MAP.md` | GOV-018-C-TRIM ✅ seeded |

## INC
none

## RateLimit
none — Crispy direct merge (governance, no agent patch cycle)

## Spicy
Scan mode: not declared — default: full. Counter: 3/3 (periodic overdue).

## Notes
Standalone PK trim — no dep on GOV-018-A/B. Approved by Nugget-san 2026-03-27.
852 → 605 lines total across 9 files. Est. ~1,500–2,000 token saving per agent per session.
SESSION-RECAP: PK trim merged v14.27.2 — 29% reduction, OUTPUT DISCIPLINE rule added.
