# NUGGET NIHONGO — MASTER AUDIT & CLAUDE CODE PLAYBOOK
**Dibuat:** 15 April 2026 · Senior PM/Architect Review  
**Owner:** Nugget  
**Purpose:** Single source of truth untuk Claude Code session berikutnya. Baca ini sebelum ngapa-ngapain.

---

## SITUASI SAAT INI — PLAIN LANGUAGE

Repo ini dalam kondisi **dua dunia paralel yang tidak sinkron:**

1. **`main`** — PWA codebase (v15.6.0). App berjalan, tapi data content masih banyak yang kosong.
2. **`corpus/v17-pass15`** — Research corpus 80+ file. Beda struktur direktori total. Bukan app code.

Di atas itu, ada **7 branch lain** yang sebagian berisi kerja valid yang belum di-merge, sebagian lagi sudah mati.

**Akibatnya:** Nugget kehilangan track karena setiap Claude Code session bikin branch baru (`claude/...`) tanpa ada yang membersihkan, dan dokumen tersebar di `docs/project/`, root, dan branch yang tidak di-merge.

---

## BRANCH STATUS — KEPUTUSAN FINAL

| Branch | Status | Action |
|---|---|---|
| `main` | ✅ Active — production | KEEP, all work merges here |
| `corpus/v17-pass15` | 🔒 Research world — separate concern | KEEP as-is, do NOT touch or merge into main |
| `claude/codebase-audit-cleanup-sRoZc` | ⚠️ Has valuable files NOT in main | **CHERRY-PICK** 3 files, then DELETE branch |
| `claude/architecture-audit-cleanup-WKJ2n` | ❌ Superseded by main v15.6.0 | DELETE |
| `claude/setup-supabase-mcp-IDFOp` | ❌ Prisma setup, already superseded | DELETE |
| `claude/upgrade-nihongo-architecture-eCHm7` | ❌ Old architecture work, superseded | DELETE |
| `cloudflare/workers-autoconfig` | ❌ Workers config already in main | DELETE |
| `overhaul/v2` | ❌ Empty scaffold, dead | DELETE |
| `master` | ❌ Old/empty | DELETE |

**About Claude Code auto-branches:** Claude Code WILL create a new `claude/...` branch automatically when you start a session. That's fine — it's the working branch. After work is done, the branch should be merged into main and then deleted. This is normal git flow. Do not let branches accumulate.

---

## WHAT ACTUALLY EXISTS IN main (v15.6.0)

### App Code — WORKING ✅
- `public/index.html` — SPA, 63 `<script>` tags (large but functional)
- `public/styles/app.css` — 3144 lines
- `public/sw.js` — Service worker
- `public/js/` — 34 JS modules (see list below)
- `public/manifest.webmanifest`
- `workers/` — Cloudflare Worker (AI proxy)
- `supabase/` — schema.sql (idempotent) + ai-router Edge Function
- `tests/run.js` — test runner

### Data — PARTIAL ⚠️
```
Grammar DB:
  grammar-n5.js    80 entries  ✅ Full
  grammar-n4.js    90 entries  ✅ Full
  grammar-n3.js   103 entries  ✅ Full
  grammar-n2.js    30 entries  🌱 Seed only
  grammar-n1.js     8 entries  🌱 Seed only

Vocab DB:
  vocab-n5.js     711 entries  ✅ Full
  vocab-n4.js     692 entries  ✅ Full
  vocab-n3.js      70 entries  ⚠️ Needs ~3,680 more (target: 3,750)
  vocab-n2.js      50 entries  🌱 Seed only
  vocab-n1.js      20 entries  🌱 Seed only

Book Lenses:
  book-irodori-a1.js     vocab_ids filled, grammar_ids: [] ALL EMPTY
  book-irodori-a2-1.js   vocab_ids filled, grammar_ids: [] ALL EMPTY ← SPEC exists
  book-irodori-a2-2.js   vocab_ids filled, grammar_ids: [] ALL EMPTY ← SPEC exists
  book-minna-1.js        ALL EMPTY (vocab_ids + grammar_ids)
  book-minna-2.js        ALL EMPTY

Grammar Lenses (Soumatome):
  grammar-lens-sm-n3.js  132 entries ✅ Full
  grammar-lens-sm-n4.js  102 entries ✅ Full
  grammar-sm-n3.js       132 entries ⚠️ DUPLICATE (different from lens — verify)
  grammar-sm-n4.js       102 entries ⚠️ DUPLICATE (different from lens — verify)
```

### Infrastructure — INCOMPLETE ⚠️
- Supabase credentials NOT wired (`YOUR_PROJECT` placeholder still in `supabase-client.js`)
- Cloudflare Worker secrets NOT set (GROQ_API_KEY, GEMINI_API_KEY)
- Project ref: `oxeuwkpgrtojjzhcboqz` (in `.mcp.json`)

### Docs — STALE ⚠️
- `_MAP.md` references OLD file paths (data/n3-w1.js, data/vocab-n5.js without `public/` prefix). Out of date by ~4 versions.
- `RESUME-v15.3.0.md` in root — stale (current is v15.6.0). Should be moved to `docs/project/archive/`.
- `docs/agent-system/` — 14 AGENT-CORE files, many stale. A6 (QA) and A7+ may be obsolete.
- `docs/project/MASTER-FLOW-v5.md` + `_MAP.md` have conflicting task lists.

---

## PROBLEMS — RANKED BY SEVERITY

### P0 — BLOCKING (fix before anything else)

**P0-A: Missing Irodori Grammar Lens Files**
Branch `claude/codebase-audit-cleanup-sRoZc` has 3 files NOT in main:
- `public/data/books/irodori/grammar-lens-ir-a1.js` — **61 entries, complete**
- `public/data/books/irodori/grammar-lens-ir-a2-1.js` — stub
- `public/data/books/irodori/grammar-lens-ir-a2-2.js` — stub

These need to be cherry-picked into main. The A1 file is valuable work that would be LOST if the branch is deleted without merging.

**P0-B: grammar_ids Empty Everywhere**
All Irodori book lens files have `grammar_ids: []`. SPEC file exists at root: `SPEC-GRAMMAR-IRODORI-A2.md`.

### P1 — HIGH PRIORITY

**P1-A: Branch Graveyard**
7 stale branches that confuse Claude Code agents. DELETE all except `main` and `corpus/v17-pass15`.

**P1-B: Soumatome Duplicate Files**
`grammar-sm-n3.js` and `grammar-lens-sm-n3.js` in `public/data/books/soumatome/` are NOT identical (different MD5). One of them is old/wrong. Need to determine which is canonical and delete the other.

**P1-C: `_MAP.md` Out of Date**
Still references `data/n3-w1.js` etc. (pre-restructure paths). Claude Code reads this file first every session and gets confused by stale paths.

### P2 — MEDIUM PRIORITY

**P2-A: Books Dir Structure Mismatch**
Schema v3 spec (`public/data/_schema.md`) defines `books/irodori/`, `books/soumatome/`, `books/minna/` subdirectories. Reality:
- `books/soumatome/` ✅ exists
- `books/irodori/` ❌ only in unmerged branch
- `books/minna/` ❌ doesn't exist
- `book-irodori-*.js`, `book-minna-*.js` still in flat `books/` root (schema calls these "vocab lenses" that should be renamed)

**P2-B: Supabase + Cloudflare Credentials**
App is fully built but auth + AI are dead without credentials. This is a human task (Nugget provides keys), but the wiring code is ready.

**P2-C: Minna no Nihongo Book Lenses Empty**
`book-minna-1.js` and `book-minna-2.js` — no vocab_ids, no grammar_ids. Low priority unless Nugget has Minna PDFs.

### P3 — LOW PRIORITY (content backfill)

**P3-A: N3 Vocab Thin** — 70 entries vs target 3,750  
**P3-B: N2/N1 Seed Data** — grammar (30/8) and vocab (50/20) need full population  
**P3-C: Minna Grammar Lenses** — grammar-lens-mn-1.js, grammar-lens-mn-2.js don't exist  
**P3-D: Irodori Vocab IDs** — book-irodori-a1.js uses old vg-n5-* format, needs verification  

---

## CLAUDE CODE TASK LIST — EXECUTION ORDER

**How to use this:** Each task is atomic. One task = one Claude Code session. Do NOT combine tasks. Commit and merge before starting the next task.

**Branch naming:** Claude Code will auto-create `claude/...` branches. That's fine. After each task, merge to main and delete the working branch.

---

### TASK 1 — CHERRY-PICK + BRANCH CLEANUP `[P0]`
**Estimated tokens:** Low  
**Files touched:** 3 new files, branch operations  
**Do this first, no dependencies.**

Steps:
1. Cherry-pick 3 files from `claude/codebase-audit-cleanup-sRoZc` into main:
   - `public/data/books/irodori/grammar-lens-ir-a1.js`
   - `public/data/books/irodori/grammar-lens-ir-a2-1.js`
   - `public/data/books/irodori/grammar-lens-ir-a2-2.js`
   
   Command:
   ```bash
   git fetch origin
   git checkout main
   git checkout origin/claude/codebase-audit-cleanup-sRoZc -- \
     public/data/books/irodori/grammar-lens-ir-a1.js \
     public/data/books/irodori/grammar-lens-ir-a2-1.js \
     public/data/books/irodori/grammar-lens-ir-a2-2.js
   git add public/data/books/irodori/
   git commit -m "feat: cherry-pick Irodori grammar lenses from codebase-audit branch"
   ```

2. Delete all dead branches (remote):
   ```bash
   git push origin --delete claude/architecture-audit-cleanup-WKJ2n
   git push origin --delete claude/codebase-audit-cleanup-sRoZc
   git push origin --delete claude/setup-supabase-mcp-IDFOp
   git push origin --delete claude/upgrade-nihongo-architecture-eCHm7
   git push origin --delete cloudflare/workers-autoconfig
   git push origin --delete overhaul/v2
   git push origin --delete master
   ```

3. Verify remaining branches: only `main` and `corpus/v17-pass15` should exist.

4. Run `node tests/run.js` — verify 0 failures.

**Output:** `public/data/books/irodori/` directory exists in main with 3 files.

---

### TASK 2 — RESOLVE SOUMATOME DUPLICATES `[P1-B]`
**Estimated tokens:** Low  
**Files touched:** 1-2 files in `public/data/books/soumatome/`

In `public/data/books/soumatome/`:
- `grammar-lens-sm-n3.js` (canonical, linked by index)
- `grammar-sm-n3.js` (different content — old version?)
- Same pattern for n4.

Steps:
1. Read both files for N3. Determine which is current/correct by checking:
   - Which one does `public/js/core/grammar-query.js` or `grammar-index.js` reference?
   - Which one has `window.grammarLensSoumatomeN3` (correct variable)?
   - Which one has `window.grammarSoumatomeN3` (old variable)?
2. Keep the canonical one (`grammar-lens-sm-*.js`). Delete the duplicate (`grammar-sm-*.js`).
3. Update any references in `index.html` or `grammar-index.js` if needed.
4. Run `node tests/run.js`.
5. Commit: `"chore: remove duplicate soumatome grammar files (grammar-sm-n*.js)"`

---

### TASK 3 — UPDATE `_MAP.md` + `CLAUDE.md` `[P1-C]`
**Estimated tokens:** Low-Medium  
**Files touched:** `docs/project/_MAP.md`, `CLAUDE.md`, optionally `RESUME-v15.3.0.md`

`_MAP.md` is read by every Claude Code agent at session start. It's stale. Update it to reflect current reality.

Steps:
1. Read current `_MAP.md`. Note all wrong paths and wrong statuses.
2. Rewrite `_MAP.md` to reflect v15.6.0 reality:
   - Fix all file paths (add `public/` prefix, remove old `data/*.js` references)
   - Update status of all files (grammar DB is active, book lenses are partial, etc.)
   - Remove references to old files (n3-w1.js, bank-soal.js, data/index.js)
   - Add new files (grammar-index.js, grammar-lens-sm-*.js, books/irodori/)
   - Update "What's next" section to match this MASTER-AUDIT.md task list
3. Update `CLAUDE.md` "What still needs doing" section to reflect actual current priorities (same as TASK list here).
4. Move `RESUME-v15.3.0.md` to `docs/project/archive/RESUME-v15.3.0.md`.
5. Run `node tests/run.js`.
6. Commit: `"docs: rewrite _MAP.md to v15.6.0 reality + update CLAUDE.md priorities"`

**DO NOT** change any JS/CSS/data files in this task.

---

### TASK 4 — FILL GRAMMAR_IDS: IRODORI A2-1 & A2-2 `[P0-B]`
**Estimated tokens:** Medium  
**Files touched:** `public/data/books/book-irodori-a2-1.js`, `public/data/books/book-irodori-a2-2.js`, `public/data/grammar/grammar-n5.js`, `public/data/grammar/grammar-n4.js`  
**Depends on:** TASK 1 (branch cleanup done)

Read `SPEC-GRAMMAR-IRODORI-A2.md` in full before starting. All decisions are made there.

Steps:
1. Read `SPEC-GRAMMAR-IRODORI-A2.md` completely.
2. Add 4 new entries to `grammar-n5.js` (gn5-00081 through gn5-00084) — exact content in SPEC.
3. Add 2 new entries to `grammar-n4.js` (gn4-00091 and gn4-00092) — exact content in SPEC.
4. Fill all 18 `grammar_ids: []` arrays in `book-irodori-a2-1.js` — per SPEC §A2-1.
5. Fill all 18 `grammar_ids: []` arrays in `book-irodori-a2-2.js` — per SPEC §A2-2.
6. Run `node tests/run.js` — verify 0 failures.
7. Commit: `"feat: fill grammar_ids for Irodori A2-1 & A2-2 + 6 new global grammar entries"`

---

### TASK 5 — FILL GRAMMAR LENS: IRODORI A2-1 & A2-2 `[P0-B continued]`
**Estimated tokens:** High — split into 2 sub-sessions if needed  
**Files touched:** `public/data/books/irodori/grammar-lens-ir-a2-1.js`, `grammar-lens-ir-a2-2.js`  
**Depends on:** TASK 1 (files exist in main), TASK 4 (global grammar entries added)

The lens files from TASK 1 are stubs. Fill them using `SPEC-GRAMMAR-IRODORI-A2.md` as reference, and the grammar-lens-ir-a1.js as format reference.

Each entry schema (from `public/data/_schema.md`):
```js
{
  id: 'ir-a2-1-001',           // sequential
  global_grammar_id: 'gn5-00029', // from SPEC
  lesson: 1,
  seq: 1,
  pattern: 'V-ています ①',
  raw: '',                      // verbatim from PDF if possible
  desc: '',                     // Indonesian explanation
  examples: [{ jp: '...', id: '...' }],
  notes: null,
}
```

Source for `raw` and `desc`: Use `SPEC-GRAMMAR-IRODORI-A2.md` grammar patterns. For `desc`, write in Bahasa Indonesia matching the style of existing entries in `grammar-lens-sm-n3.js`.

Sub-task A: Fill `grammar-lens-ir-a2-1.js` (L1-L9, 9 lessons)  
Sub-task B: Fill `grammar-lens-ir-a2-2.js` (L10-L18, 9 lessons) — or do full 18 if tokens allow

Run `node tests/run.js` after each sub-task.  
Commit each sub-task separately.

---

### TASK 6 — FILL GRAMMAR LENS: IRODORI A1 VERIFICATION `[P2]`
**Estimated tokens:** Low  
**Files touched:** `public/data/books/irodori/grammar-lens-ir-a1.js`  
**Depends on:** TASK 1

The A1 grammar lens (61 entries) was cherry-picked but has a note: "global_grammar_id links need verification against grammar-n5.js".

Steps:
1. Read `grammar-lens-ir-a1.js`.
2. For each entry, verify `global_grammar_id` exists in `grammar-n5.js`.
3. For entries with `global_grammar_id: null`, find the best matching gn5-* ID.
4. If no match exists, add new global entry to `grammar-n5.js` (follow existing schema).
5. Run `node tests/run.js`.
6. Commit: `"feat: verify + patch Irodori A1 grammar lens global_grammar_id links"`

---

### TASK 7 — FILL GRAMMAR_IDS: IRODORI A1 `[P2]`
**Estimated tokens:** Low  
**Files touched:** `public/data/books/book-irodori-a1.js`  
**Depends on:** TASK 6

After grammar-lens-ir-a1.js is verified, extract the grammar IDs and fill `book-irodori-a1.js`.

Steps:
1. Read `grammar-lens-ir-a1.js` — extract all `global_grammar_id` values per lesson.
2. Group by lesson number.
3. Fill `grammar_ids: []` in `book-irodori-a1.js` for each unit.
   Note: book-irodori-a1.js has 18 units (2 per topic). Map lesson N → unit 2N-1 and 2N (かつどう/りかい).
4. Run `node tests/run.js`.
5. Commit: `"feat: fill grammar_ids for Irodori A1"`

---

### TASK 8 — N3 VOCAB EXPANSION `[P3-A]`
**Estimated tokens:** Very High — must be broken into multiple sessions  
**Target:** Grow vocab-n3.js from 70 → 300+ entries  
**Depends on:** Nothing (can run in parallel with other tasks)

Current: 70 entries. Target for activation: 200 minimum, 300+ preferred.

Strategy: 50 entries per sub-session.

Each entry schema:
```js
{
  id          : 'vg-n3-00071',       // continue from last ID
  word        : '諦める',
  reading     : 'あきらめる',
  romaji      : 'akirameru',
  meaning_id  : 'menyerah',
  meaning_en  : 'to give up',
  jlpt        : 'n3',
  pos         : 'verb-ru',
  common      : true,
  related_grammar : [],
  formalitas  : 2,
  domain      : ['emosi'],
  register    : 'neutral',
  nuance      : null,
  conj_type   : 'ichidan',
  examples    : [
    { jp: '夢を<b>諦めた</b>くない。', id: 'Aku tidak mau menyerah pada impianku.', level: 'n3', tags: ['emosi'] },
  ],
  synonyms        : [],
  antonyms        : [],
  see_also        : [],
  confusion_pairs : [],
  provenance  : 'jlpt-corpus',
  added_v     : 'v15',
}
```

Source: Standard JLPT N3 vocabulary lists. Use frequency and JLPT exam appearance as priority.

Sub-task A: vg-n3-00071 to vg-n3-00120 (50 entries)  
Sub-task B: vg-n3-00121 to vg-n3-00170 (50 entries)  
Sub-task C: vg-n3-00171 to vg-n3-00220 (50 entries)  
... continue as needed.

Run `node tests/run.js` after each sub-task. Commit each separately.

---

## FILES CLAUDE CODE MUST READ FIRST (every session)

1. `CLAUDE.md` — Tech stack, conventions, what works, what doesn't
2. `MASTER-AUDIT.md` — This file. Task list and current state.
3. `public/data/_schema.md` — Data architecture v3 (ID formats, schemas)
4. `docs/project/_MAP.md` — File structure (after TASK 3 updates it)
5. The specific SPEC or task file for the current task

**Do NOT read these** (waste of tokens):
- `docs/agent-system/` — Old multi-agent system, not needed
- `docs/corpus/` — Research documents, not code
- `ARCHITECTURE.md` — Outdated architecture doc
- `RESUME-v15.3.0.md` — Stale

---

## CONVENTIONS CLAUDE CODE MUST FOLLOW

```
IDs:
  Vocab:   vg-{level}-{5digit}     e.g. vg-n3-00001
  Grammar: gn{level}-{5digit}      e.g. gn5-00001
  Lens (Irodori): ir-a1-{3digit}   e.g. ir-a1-001
  Lens (Soumatome): sm-n3-{3digit} e.g. sm-n3-001

Files:
  All deploy files → public/
  No bundler. Script order in index.html matters.
  version.js is the ONLY place to bump version.

Git:
  Work on auto-created claude/ branch → merge to main → delete branch
  Never commit to main directly
  Never touch corpus/v17-pass15 branch
  Commit message format: "type: description" (feat/fix/chore/docs)

Testing:
  Always run: node tests/run.js
  Target: 0 failures before every commit

Data Files:
  Never delete grammar-n*.js or vocab-n*.js content (append only)
  Always use provenance: 'irodori' or 'jlpt-corpus' on new entries
  added_v: 'v15' on all new entries
```

---

## DATA COUNTS — QUICK REFERENCE

| File | Count | Status |
|---|---|---|
| grammar-n5.js | 80 | ✅ Full |
| grammar-n4.js | 90 | ✅ Full |
| grammar-n3.js | 103 | ✅ Full |
| grammar-n2.js | 30 | 🌱 Seed |
| grammar-n1.js | 8 | 🌱 Seed |
| vocab-n5.js | 711 | ✅ Full |
| vocab-n4.js | 692 | ✅ Full |
| vocab-n3.js | 70 | ⚠️ Thin |
| vocab-n2.js | 50 | 🌱 Seed |
| vocab-n1.js | 20 | 🌱 Seed |
| grammar-lens-sm-n3.js | 132 | ✅ Full |
| grammar-lens-sm-n4.js | 102 | ✅ Full |
| grammar-lens-ir-a1.js | 61 | ✅ Full (pending verify) |
| grammar-lens-ir-a2-1.js | 0 | ❌ Stub |
| grammar-lens-ir-a2-2.js | 0 | ❌ Stub |
| book-irodori-a1.js | vocab ✅ grammar ❌ | Partial |
| book-irodori-a2-1.js | vocab ✅ grammar ❌ | Partial |
| book-irodori-a2-2.js | vocab ✅ grammar ❌ | Partial |
| book-minna-1.js | ❌ Empty | Not started |
| book-minna-2.js | ❌ Empty | Not started |

---

## CORPUS/V17-PASS15 BRANCH — WHAT IT IS

This branch is a **separate research world**. It has:
- `corpus/sections/` — 16+ research papers on SLA methodology
- `blueprint/` — Curriculum design documents  
- `archive/` — 30+ historical agent logs
- Different `docs/` structure than main

**It does NOT contain app code changes** that need to be merged. The research findings are for informational use when designing the curriculum, not for code merge.

**Rule:** Never merge `corpus/v17-pass15` into `main`. Never rebase it. Leave it as a research reference branch. If Nugget needs the research content in the app (e.g., methodology page), cherry-pick specific docs.

---

## WHY NUGGET KEEPS HITTING TOKEN LIMITS

Root causes:
1. **No pre-scoped tasks** — Claude Code was given vague instructions ("continue") and had to re-read the entire codebase every session.
2. **Stale orientation docs** — `_MAP.md` with wrong paths caused Claude Code to search for files that don't exist, consuming tokens.
3. **Too many branches** — Claude Code reads branch state, sees 8 branches, tries to understand all of them.
4. **No atomic task scope** — Single sessions tried to do branch cleanup + data fill + doc updates simultaneously.

**Fix going forward:** Use this MASTER-AUDIT.md as the single entry point. One task per session. Each task < 2000 tokens of context to load before starting real work.

---

*Last updated: 15 April 2026 — Senior PM/Architect audit session*  
*Next session should start with: "Read MASTER-AUDIT.md, then execute TASK 1."*
