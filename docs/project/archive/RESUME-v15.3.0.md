# RESUME — v15.3.0 → Next Session
**Created:** 2 April 2026 by A1 Crispy 🥐  
**Purpose:** Pick up exactly where the database restructuring session got cut off.

---

## WHAT LANDED IN v15.3.0 (confirmed on GitHub)

### Architecture v3 — DONE ✅
- `public/data/_schema.md` rewritten (v3.0, 921 lines)
- `public/data/_taxonomy.md` added (979 lines, Taxonomy Master v1.0)
- Core model: One global DB → book lenses point into it → study tracks navigate through it

### Global Database Migration — DONE ✅
- **Grammar N5**: 80 entries, 5-digit IDs (`gn5-00001`+), `cat` field present
- **Grammar N4**: 90 entries, 5-digit IDs (`gn4-00001`+), `cat` field present
- **Grammar N3**: 103 entries, 5-digit IDs (`gn3-00001`+), `cat` field present
- **Vocab N5**: 711 entries, 5-digit IDs (`vg-n5-00001`+)
- **Vocab N4**: 692 entries, 5-digit IDs (`vg-n4-00001`+)
- **Vocab N3**: 70 entries, 5-digit IDs (`vg-n3-00001`+)
- Grammar N1/N2, Vocab N1/N2/N3 shells exist (empty, commented out in index.html)

### Grammar Index — DONE ✅
- `grammar-index.js`: Merges all grammar-n*.js into `window.grammarDB` + query API
- Backwards-compat: `window.grammarData`, `window.levelMeta` preserved

### Soumatome Grammar Lenses — FULLY POPULATED ✅ (migrated v15.3.1)
- `grammar-lens-sm-n3.js`: 132/132 entries migrated (desc, examples, connection from old w-files)
- `grammar-lens-sm-n4.js`: 102/102 entries migrated
- 4 N3 + 4 N4 entries have `global_grammar_id: null` (need global DB population)
- Migration script: `tools/migrate-soumatome-lens.py`

### Vocab Book Lenses — REMOVED (were just duplicates of old files) ⚠️
- The v15.3.0 "lens" files were identical copies of old book-*.js files, not actual Architecture v3 lenses
- Removed in v15.3.2 to avoid confusion
- Proper vocab lenses need: word→new ID mapping (old IDs like `v-n5-s0001` → new `vg-n5-00001`)
- Old book files (`book-irodori-a1.js` etc.) still loaded in index.html and working

### Study Tracks — FUNCTIONAL ✅ (v15.3.2)
- `tracks/tracks.js`: Rewritten with runtime population
- JLPT tracks (N5-N1): auto-populated from grammarDB + vocabDB at runtime via `dynamic: true`
- Soumatome N3/N4 tracks: auto-populated from lens files via `dynamic_lens: true`
- Freeway track: 21 hand-curated survival grammar patterns (all IDs verified)
- Irodori/Minna book tracks: still empty (needs vocab lens migration first)

### New JS Modules — DONE ✅
- `fsrs-engine.js` — FSRS spaced repetition (loads ts-fsrs from CDN)
- `quiz-engine-v2.js` — new quiz engine
- `gamification.js` — XP/streaks/achievements
- `backup-restore.js` — data export/import
- All wired in `index.html` (53 script tags total)

### Sources Registry — DONE ✅
- `books/sources.js` — book metadata registry

---

## WHAT DID NOT LAND (cut off or not started)

### Supabase Schema
- A `schema.sql` was being written in the session but was **NOT committed** to GitHub
- It existed only in the Claude session's filesystem — now lost
- Will need to be recreated from Architecture v3 spec

### Cleanup — Orphan Files ✅ REMOVED (v15.3.1)
The following files were removed (not loaded in index.html, data migrated to lenses):
- `public/data/grammar/n3-w1.js` through `n3-w6.js` → migrated into grammar-lens-sm-n3.js
- `public/data/grammar/n4-w1.js` through `n4-w6.js` → migrated into grammar-lens-sm-n4.js
- `public/data/grammar/bank-soal.js`, `bank-soal-n4.js`, `bank-soal-quiz4.js` (old quiz banks, will rebuild)
- `public/data/grammar/dummy.js`, `index.js` (replaced by grammar-index.js)
- `public/data/qa-tests.js`

**Still on disk and STILL LOADED in index.html (DO NOT remove yet):**
- `public/data/books/book-irodori-a1.js` through `book-irodori-a2-2.js` (old unit-index format)
- `public/data/books/book-minna-1.js`, `book-minna-2.js` (old unit-index format)
- These contain unit→vocab mappings the app still uses. Remove AFTER vocab lenses are populated and UI updated.

### Remaining Architecture v3 Phases

**Phase 3 — Soumatome Lens Population — DONE ✅ (v15.3.1)**
- All 132 N3 + 102 N4 entries migrated with desc, examples, connection
- Old w-files removed from repo

**Phase 4 — Vocab Book Lens Population**
**Phase 4 — Vocab Book Lens Migration — BLOCKED ⚠️**
- Old book files use old IDs (`v-n5-s0001`, `v-n5-0092`) that don't exist in new vocab DB
- Need to build word→new_id mapping table first (match by kanji/reading)
- Then create proper Architecture v3 vocab lens files
- Old `book-irodori-*.js` and `book-minna-*.js` still work as-is in the meantime

**Phase 5 — Track Curation — MOSTLY DONE ✅ (v15.3.2)**
- JLPT tracks: auto-populated at runtime ✅
- Soumatome N3/N4 tracks: auto-populated from lens ✅
- Freeway: 21 curated grammar patterns ✅
- Irodori/Minna book tracks: blocked on Phase 4

**Phase 6 — UI Integration**
- Browse pages need to use grammar-index.js query API
- Book browsing UI needs to read lens files
- Track selection UI
- FSRS integration with quiz flow

**Phase 7 — Validation & Cleanup**
- Spicy validation scripts for 5-digit IDs, `cat` values, lens integrity
- SW cache update

---

## QUICK START FOR NEXT SESSION

```
cd nugget-nihongo
cat RESUME-v15.3.0.md    # this file
```

**Recommended next action:** Phase 4 — build a word/reading mapping from old vocab IDs to new 5-digit IDs, then create proper vocab lens files for Irodori and Minna. Alternatively, skip to Phase 6 (UI) since JLPT tracks and Soumatome tracks are already functional.

---

## VERSION STATE
- GitHub: `main` branch, v15.3.2
- v15.3.0: Architecture v3 + FSRS + Quiz Engine v2 + Gamification
- v15.3.1: Soumatome lens migration + orphan cleanup (18 files removed)
- v15.3.2: Tracks runtime population + Freeway curation + duplicate lens cleanup
- `version.js` = v15.3.2, `sw.js` reads from `window.APP_VERSION`
