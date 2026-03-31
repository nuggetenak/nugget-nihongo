# Nugget Nihongo — Project Map
> Read this first every session. Single source of truth for project structure.
> Last updated: v14.27.7 — 26 tasks seeded. Full mechanization document complete. 35 Termux possibilities locked. All gap fixes approved. 28 Maret 2026. (GOV-DISPATCH-FORMAT, INFRA-1/2, TOOL-MANIFEST, VALIDATOR-ROUTING, AGENTS-DIR, GH-ACTIONS, DOCS-TECH, PIPELINE x8, TESTS-SCAFFOLD, TERMUX-BOT, TERMUX-TUI). 28 Maret 2026
> Perubahan dari versi sebelumnya: v14.23.1 — GOV-017 merged (Taxonomy v5, MASTER-DIRECTIVE-LOG, VIOLATION-DB updates, 5 sub-tasks), TASK-SPICY-F-002 (AUTO-TRIGGER 5 agents), GRM-6 confirmed ✅, hygiene fixes.

---

## Status Legend

| Status | Arti |
|---|---|
| 🔴 | Belum mulai |
| 🟡 | In progress |
| 🔍 | In QA Review — menunggu verdict Agent 6 |
| ⚠️ | Needs Revision — dikembalikan ke agent |
| ✅ | Approved & merged — verified by Agent 6 QA |
| 🔒 | Locked / retired / belum aktif |

---

## File Structure

```
index.html              Entry point. Script load order documented inline.
sw.js                   Service worker. Bump CACHE version on every release.
manifest.json           PWA manifest.
js/core/version.js      APP_VERSION — bump here only, nowhere else.
js/core/state.js        LS keys, window.progress, window.bookmarks, saveProgress(), toggleBookmark()
js/core/router.js       switchTab()
js/core/theme.js        toggleTheme(), loadTheme()
js/core/install.js      PWA install modal, registerSW(), offline badge
js/srs.js               SM-2 algorithm. srsLoad/Save/Review, srsDueToday(), srsStatus()
js/streak.js            loadStreak(), showStreakBroken(), closeStreakBroken()
js/swipe.js             initSwipeGesture() — touch left/down/right on quiz card
js/browse.js            Browse tab: render cards, filter, search, bookmarks. Tiap card punya tombol ⤢ → openDetail()
js/browse-vocab.js      Browse Vocab sub-tab: switchBrowseTab(), vbPillLevel(), vbPillPos(), vbSearch() (v14 NEW)
js/quiz.js              Flashcard quiz: flip, assess(), progress panel
js/fillin.js            Fill-in + Rearrange quiz mode. Juga berisi setQuizMode(), switchQuizCategory(), routing startQuiz()
js/conjugation.js       Conjugation quiz mode
js/translation.js       Translation quiz mode
js/errorfind.js         Error-find quiz mode
js/multichoice.js       Multiple choice quiz mode
js/conjugation-engine.js  Layer 0-3 conjugation service (v12 NEW)
js/detail.js            openDetail(), buildBreakdownSafe() (v12 NEW)
js/quiz-typetr.js       startTypeTrQuiz() — Ketik Terjemahan mode (v12 NEW)
js/lang/lang-core.js    langGenerate(), VOCAB, TEMPLATES (v12 NEW)
js/quiz-generator.js    generateVocabQuiz(), generateGrammarQuiz(), generateMixedQuiz() — data-driven quiz (v13 NEW)
js/quiz-vocab.js        Vocab Quiz Mode: vocab_flash/vocab_mc/vocab_fill (v14 NEW)
js/quiz-mixed.js        Mixed Quiz Mode: grammar flash + vocab MC interleaved (v14.3 NEW)
js/daily-word.js        Daily Word: pilih kata dari vocabDB by date seed, render di welcome banner (v14.3 NEW)
js/app.js               Thin orchestrator — DOMContentLoaded init only. Always loaded last.
data/_schema.md         Data object shapes for all data files
data/index.js           Merges all data arrays → window.grammarData + window.levelMeta
data/n3-w1.js … n3-w6.js   N3 grammar cards (132 cards total, 6 weeks)
data/n4-w1.js … n4-w6.js   N4 grammar cards (6 weeks — W5/W6 ada card, bank soal belum lengkap)
data/bank-soal.js       Quiz bank: fill_in + rearrange (N3 — hanya W1 yang ada soal)
data/bank-soal-n4.js    Quiz bank: N4 (hanya W1-W4 yang ada soal)
data/bank-soal-quiz4.js Quiz bank: extra mode 4

── VOCAB ENTRIES (naming: vocab-{level}.js — unified per RESTRUKTURISASI-B v14.9.0) ────────
data/vocab-n5.js        N5 · unified (711 entries) · window.vocabN5   ✅ Active (RESTRUKTURISASI-B v14.9.0)
data/vocab-n4.js        N4 · unified (720 entries) · window.vocabN4   ✅ Active (RESTRUKTURISASI-B v14.9.0)
data/vocab-n3.js        N3 · 70 entries            · window.vocabN3   ✅ Active (v14.27.7)
data/vocab-n2.js        N2 · placeholder           · window.vocabN2   🔒 Inactive — tunggu data
data/vocab-n1.js        N1 · placeholder           · window.vocabN1   🔒 Inactive — tunggu data

── GRAMMAR DB (format baru, belum aktif) ────────────────────────────────────
data/grammar-n5.js      N5 · 248 entries · window.grammarN5  🔒 Inactive — tunggu engine (RESTRUKTURISASI-D)
data/grammar-n4.js      N4 · 272 entries · window.grammarN4  🔒 Inactive — tunggu engine
data/grammar-n3.js      N3 · 313+16 entries (120 global tier 1) · window.grammarN3  🔒 Inactive — tunggu engine
data/grammar-n2.js      N2 · placeholder · window.grammarN2  🔒 Inactive — tunggu data + engine
data/grammar-n1.js      N1 · placeholder · window.grammarN1  🔒 Inactive — tunggu data + engine

── BOOK INDEX (referensi chapter→vocab_ids, BUKAN entries) ──────────────────
data/book-minna-1.js            Minna no Nihongo I, ch.1–25    · window.bookMinna1       🔒 Empty — data belum terisi
data/book-minna-2.js            Minna no Nihongo II, ch.26–50  · window.bookMinna2       🔒 Empty — data belum terisi
data/book-irodori-a1.js         Irodori A1, unit 1–18           · window.bookIrodoriA1    🔒 Empty — data belum terisi
data/book-irodori-a2-1.js       Irodori A2-1, unit 1–18         · window.bookIrodoriA2_1  🔒 Empty — data belum terisi
data/book-irodori-a2-2.js       Irodori A2-2, unit 1–18         · window.bookIrodoriA2_2  🔒 Empty — data belum terisi

── VOCAB MERGER & INDEX ──────────────────────────────────────────────────────
data/vocab-index.js     Merge semua vocab → window.vocabDB + buildVocabIndex() + queryVocab() + sampleVocab()
                        Aktif: ...(window.vocabN5 || []) + ...(window.vocabN4 || []) — 1.403 entries total
                        N3/N2/N1 dicomment — aktifkan saat data tersedia
data/_schema-vocab.md   Schema & field docs untuk semua VocabEntry — source of truth Agent 2
data/sources.js         window.nuggetSources — metadata buku + credit
css/style.css           All styles. Section index §1–§19 at top of file.
                        ✅ 1 blok :root (TASK-UI-11 v14.11.0)
fonts/dm-sans.woff2     DM Sans variable (Latin, subsetted 24KB)
fonts/biz-udgothic.woff2  BIZ UDGothic (JP chars only, subsetted 101KB)
tools/subset-fonts.py   Re-run when content grows to re-subset fonts
```

---

## Script Load Order

```
✅ LOAD ORDER AKTUAL (v14.5.6 — TASK-INT-1 + TASK-UI-0 sudah resolved):

core/version.js   → error-boundary.js ← KEDUA ✅
→ core/state.js   → core/router.js    → core/theme.js → core/install.js → core/grammar-query.js
→ [data files]
→ srs.js → streak.js → swipe.js → browse.js → quiz.js
→ quiz-feedback.js    ← SEBELUM fillin.js ✅
→ fillin.js → conjugation.js → translation.js → errorfind.js → multichoice.js
→ lang/lang-core.js → conjugation-engine.js → quiz-typetr.js → detail.js
→ quiz-generator.js → quiz-vocab.js → quiz-mixed.js → daily-word.js → browse-vocab.js
→ app.js   ← ALWAYS LAST
```

---

## Multi-Agent Rules

### Peran & Scope

| Agent | Peran | File Domain |
|---|---|---|
| **Agent 1 — Integrator** | Koordinasi, merge, versioning | index.html, sw.js, manifest.json, js/core/version.js, data/vocab-index.js, data/index.js, agent-prompts/*, _MAP.md |
| **Agent 2 — Vocab** | Data kosakata | data/vocab-n5.js, vocab-n4.js, vocab-n3.js, vocab-n2.js, vocab-n1.js, data/_schema-vocab.md |
| **Agent 3 — Book** | Book index & docs | data/book-*.js, data/sources.js |
| **Agent 4 — Grammar** | Grammar cards & bank soal | data/n3-w*.js, n4-w*.js, bank-soal*.js, data/_schema.md, data/grammar-n*.js |
| **Agent 5 — UI** | JavaScript, CSS, HTML UI | js/*.js (non-core), js/core/ (state/router/theme/install), js/lang/, css/style.css, index.html (UI only) |
| **Agent 6 — QA** | Verifikasi & audit | _MAP.md (status only), data/qa-tests.js, docs/DECISION-DB.md, docs/ERROR-PATTERN-DB.md, docs/QA-EFFECTIVENESS-DB.md |
| **Agent 7 — Spicy** | Tooling & scripts | tools/scripts/spicy/, tools/scripts/utils/ |
| **Agent 8 — Fluffy** | Kurikulum | docs/curriculum/ |
| **Agent 9 — Savory** | Analytics & insights | docs/RESEARCH-SUMMARY.md (draft only) |

### Workflow Patch (wajib tanpa pengecualian) — GOV-008

```
[1] Nugget-san → Crispy       : sampaikan ide / task
[2] Crispy → Nugget-san       : buat Task Brief + DISPATCH-MANIFEST.md + ZIP
[3] Nugget-san → Crunchy      : serahkan ZIP untuk Checkpoint (1) pre-dispatch audit
[4] Crunchy → Nugget-san      : terbitkan DISPATCH CLEARANCE (jika lolos)
[5] Nugget-san → Agent        : serahkan ZIP task ke agent yang di-assign
[6] Agent → Nugget-san        : kerjakan + eksport hasil ZIP
[7] Nugget-san → Crunchy      : serahkan hasil ZIP untuk Checkpoint (2) QA
[8] Crunchy → Nugget-san      : terbitkan QA VERDICT APPROVED + FOR-INTEGRATOR ZIP
[9] Nugget-san → Crispy       : serahkan FOR-INTEGRATOR ZIP untuk merge
[10] Crispy                   : merge → update _MAP.md → bump versi → jalankan run-merge-checklist.js → tampilkan menu
[11] Nugget-san → Spicy       : carry merged ZIP untuk post-merge scan (Fase 6b — tidak blocking)
[12] Spicy → Nugget-san       : eksport SPICY-SCAN ZIP
[13] Nugget-san → Crunchy     : carry SPICY-SCAN ZIP untuk acknowledge findings

Revision: maks 1x per patch. Round ke-2 gagal = otomatis REJECT.
Source of truth lengkap: AGENT-CORE modules (master-flow.md, zip-formats.md). Legacy MASTER-FLOW-NUGGET-NIHONGO-v5.md superseded by GOV-018-C.
```

### Aturan _MAP.md

- Status 🚧 → ✅ HANYA boleh diubah oleh Agent 6 QA
- Agent lain TIDAK boleh self-approve task mereka sendiri
- Setiap ✅ harus disertai: "✅ [tanggal] — verified by Agent 6 QA"

### Aturan Patch

- Kirim HANYA file yang diubah — jangan sertakan file yang tidak berubah
- Sertakan PATCH-NOTES.md di setiap patch (lihat template di agent-prompts/)
- Jangan sertakan file di luar scope domain kamu — patch akan langsung ditolak QA

### Koordinasi Antar Agent (dependency aktif)

```
TASK-GRM-6 (Agent 4) ✅ SELESAI — daftar cat final sudah tersedia
  → TASK-UI-4 (sync catPanel): UNLOCKED ✅

TASK-UI-12 (Agent 5) harus selesai dan icon PNG tersedia
  → SEBELUM Integrator update sw.js ASSETS (TASK-UI-14)
```

---

## Key Global Variables

| Variable | Defined in | Shape |
|---|---|---|
| `window.grammarData` | data/index.js | GrammarCard[] |
| `window.levelMeta` | data/index.js | { n1..n5: LevelMeta } |
| `window.bankSoal` | data/bank-soal.js | BankSoalEntry[] |
| `window.vocabDB` | data/vocab-index.js | VocabEntry[] (merged all levels) |
| `window.progress` | core/state.js | { [cardId]: 'know'\|'unsure'\|'forgot' } |
| `window.bookmarks` | core/state.js | Set\<cardId\> |
| `window.srsData` | srs.js | { [cardId]: SRSCard } |
| `window.APP_VERSION` | core/version.js | string e.g. 'v14.5.3' |
| `window.renderQuizFeedback` | quiz-feedback.js | fn(opts) |
| `window.openDetail` | detail.js | fn(cardId) |
| `window.startTypeTrQuiz` | quiz-typetr.js | fn() |
| `window.langGenerate` | lang/lang-core.js | fn(grammarCard) → { jp, id } |
| `window.switchQuizCategory` | fillin.js | fn(cat, tabEl) |
| `window.generateVocabQuiz` | quiz-generator.js | fn(opts) → QuizItem[] |
| `window.generateGrammarQuiz` | quiz-generator.js | fn(opts) → QuizItem[] |
| `window._activeQuizMode` | quiz-vocab.js / setQuizMode | string |
| `window.startVocabQuiz` | quiz-vocab.js | fn(mode?) |
| `window.switchBrowseTab` | browse-vocab.js | fn(tab, btn) |
| `window.startMixedQuiz` | quiz-mixed.js | fn() |
| `window.initDailyWord` | daily-word.js | fn() |
| `window.srsUpdate` | srs.js | alias ke srsReview() ✅ FIXED v14.5.6 (TASK-UI-5) |

---

## Known Gotchas

- `srs.js` wraps `window.saveProgress` — load order matters, must be after `core/state.js`
- `swipe.js` calls `assess()` which lives in `quiz.js` — swipe only works after quiz is active
- `quiz-feedback.js` WAJIB load SEBELUM fillin, conjugation, translation, errorfind, multichoice, quiz-typetr — ✅ FIXED v14.5.6 (TASK-UI-0)
- `error-boundary.js` load posisi ke-2 setelah version.js — ✅ FIXED v14.5.5 (TASK-INT-1)
- `quiz-typetr.js` pool diambil dari `GrammarCard.examples[]` — pastikan field `examples` terisi
- `detail.js` pakai `buildBreakdownSafe()` — jangan revert ke `buildBreakdown()` lama
- `quiz-vocab.js` menggunakan `window._activeQuizMode` untuk routing — di-set oleh override `setQuizMode`
- `quiz-mixed.js` load SETELAH quiz-vocab.js agar chain order benar
- `conjugation-engine.js`: GODAN_EXCEPTIONS sudah berisi kanji + hiragana pair ✅ (TASK-UI-1 resolved v14.5.6)
- `daily-word.js`: pool sudah difilter — hanya entry dengan examples + nuance (✅ TASK-UI-8 v14.11.0)
- `fillin.js:343`: memanggil `window.srsUpdate()` — ✅ FIXED v14.5.6 (TASK-UI-5), alias sudah ada di srs.js
- `vocab-n4.js` adalah file AKTIF unified N4 (692 entries, window.vocabN4) — RESTRUKTURISASI-B v14.9.0
- `vocab-n3.js` placeholder (window.vocabN3 = []) — aktifkan di vocab-index.js dan index.html saat data sudah cukup
- `DM Sans` variable font (wght 100–900); `BIZ UDGothic` subset weight 400 only
- Level pills N1/N2/N5 pakai `disabled` attribute — jangan hapus
- Welcome banner dismiss: localStorage key `wb-dismissed`
- `vbPillPos('verb-u')` matches ALL verb subtypes untuk UX simpel
- Vocab DB aktif: vocab-n5.js (711) + vocab-n4.js (692) + vocab-n3.js (70) = **1.473 entries** (RESTRUKTURISASI-B v14.9.0 + subsequent patches)
- Vocab naming convention: `vocab-{level}.js` (unified format — berlaku sejak RESTRUKTURISASI-B v14.9.0)
- `data/qa-tests.js` TIDAK di ASSETS sw.js — intentional, dev-only tool (DEC-009).
  Crispy bisa run di browser sebelum merge sebagai referential integrity check. Jangan tambahkan ke ASSETS.
- 26 data files load sebelum version.js dan error-boundary.js di index.html — pre-existing pattern
  sejak sebelum v14.9.0, tidak menyebabkan bug fungsional yang terdeteksi. Monitor saja.
- Book index convention (LOCKED): `book-{nama-buku}.js` — referensi vocab_ids per chapter, BUKAN entries

---

## Checklist Rilis (Integrator wajib lakukan setiap merge)

- [ ] Bump `js/core/version.js` → `window.APP_VERSION`
- [ ] Bump `sw.js` → `const CACHE = 'nihongo-vXX'`
- [ ] Tambahkan file baru ke `ASSETS` array di `sw.js`
- [ ] Re-run `tools/subset-fonts.py` jika ada konten JP baru
- [ ] Update `_MAP.md` — tandai task yang selesai dengan tanggal
- [ ] Distribusikan ZIP baru ke semua agent

---

## ══ TASK LIST ══════════════════════════════════════════════════════════════

> Done tasks (✅) dipindahkan ke _MAP-ARCHIVE.md. Hanya task OPEN, LINKED, WARNING yang ditampilkan di sini.

#### TASK-VOC-5 🟡 LINKED — Isi examples[] dan nuance (ongoing)
- File: vocab-n5.js, vocab-n4.js (file unified baru, RESTRUKTURISASI-B v14.9.0)
- Detail: Banyak entries tanpa examples[] — perlu dilengkapi di file unified baru
- Status: RESTRUKTURISASI-B selesai — file target sudah tersedia, task bisa dilanjutkan
- Dependency: Konfirmasi dengan Juicy apakah ada perubahan lain di vocab-n5.js/n4.js dulu
- Assign: Agent 2


#### TASK-N3 ✅ 1 Apr 2026 — Integrasi Vocab N3
- File: vocab-n3.js (placeholder, window.vocabN3 = [] — RESTRUKTURISASI-B v14.9.0)
- Prasyarat: TASK-VOC-1 selesai ✅
- Status: RESTRUKTURISASI-B selesai — vocab-n3.js tersedia sebagai placeholder
  Tugas: ✅ 70 entries filled, activated in vocab-index.js + index.html v14.27.7
- Assign: Agent 1 (direct fill, Opus 4.6)

---

### ── BOOK TASKS ────────────────────────────────────────────────────────────


#### TASK-BOOK-MINNA 🔒 — Input Book Index Minna no Nihongo
- 🔒 BLOCKED — tunggu Saucy isi data book-minna-*.js (pending prioritization Nugget-san)
- File: book-minna-1.js, book-minna-2.js
- Assign: Agent 3 — isi vocab_ids + grammar_ids per chapter
- Catatan: pernah di-✅ prematur (data masih kosong). Status dikoreksi via AUDIT-TIER1-001 (21 Maret 2026).


#### TASK-BOOK-IRODORI 🔒 — Input Book Index Irodori
- 🔒 BLOCKED — tunggu Saucy isi data book-irodori-*.js (pending prioritization Nugget-san)
- File: book-irodori-a1.js, book-irodori-a2-1.js, book-irodori-a2-2.js
- Catatan: unit numbering 1–18 per volume (bukan 1-9/10-18/19-27). Pernah di-✅ prematur — koreksi via AUDIT-TIER1-001.
- Assign: Agent 3


#### TASK-UI-BOOK-FILTER 🔒 — Filter Quiz by Buku
- 🔒 BLOCKED — dep: TASK-BOOK-MINNA + TASK-BOOK-IRODORI selesai
- Backend siap, UI siap — akan aktif otomatis setelah data tersedia. Tidak perlu dikerjakan ulang Golden.
- Catatan: pernah di-✅ prematur. Status dikoreksi via AUDIT-TIER1-001 (21 Maret 2026).


#### TASK-UI-BOOK-PROGRESS 🔒 — Progress per Buku
- 🔒 BLOCKED — dep: TASK-UI-BOOK-FILTER
- Assign: Agent 5 — aktifkan setelah book data tersedia


---

### ── SCHEMA TASKS ──────────────────────────────────────────────────────────


#### TASK-SCHEMA-SOURCES 🟡 — Backfill field `sources` ke existing vocab (ongoing)
- Status: vocab-n5.js (RESTRUKTURISASI-B), vocab-n5-soumatome/core/n4-core RETIRED
- Low priority — kerjakan saat input data buku
- Assign: Agent 2

---

### ── QA TASKS ───────────────────────────────────────────────────────────────


#### TASK-QA-INIT-3 🔴 — READY FOR DISPATCH (TASK-GRM-6 ✅)
- Dependency: TASK-GRM-6 ✅ selesai 23 Maret 2026
- Detail: verifikasi daftar cat sebelum approve TASK-UI-4
- Assign: Agent 6 Crunchy

---

## Violation Log (dicatat oleh Agent 6 QA)

> Detail lengkap ada di docs/VIOLATION-DB.md — dikelola Crunchy.
> Tabel di bawah adalah ringkasan open/recent violations saja.

| Tanggal | Agent | Pelanggaran | Status |
|---|---|---|---|
| Maret 2026 | Agent 3 | Menyentuh vocab-n5-soumatome.js (domain Agent 2) | Dicatat, tidak dirollback |
| Maret 2026 | Agent 4 | Patch menyertakan _schema.md + index.js (domain Integrator) | Closed — abandoned |
| 15 Maret 2026 | Agent 5 Golden | TASK-UI-9 bypass Crunchy (GOV-005) | Dicatat |

Lihat docs/VIOLATION-DB.md untuk Fix Effective status dan detail setiap entry.

---


## Catatan Historis

- **v14.22.3** — 22 Maret 2026. Batch merge 8 tasks: TASK-SPICY-7 (tooling patch v14.21.1), TASK-SPICY-DIAG (tooling minor v14.22.0 — 6 fixes + scan-deprecated-fields.js baru + CRUNCHY-DISPATCH-DIAG-001.md), TASK-INTEL-P0B (patch v14.22.1 — extract-archive-metadata.js + METADATA-HEADER-STANDARD.md), TASK-UI-10 (patch v14.22.2 — SRS quality bug fix), TASK-INC015-FIX (FALSE POSITIVE confirmed — validator bug), TASK-INC014-FIX (FALSE POSITIVE confirmed — validator bug), TASK-BATTER-CATS-REVIEW (patch v14.22.3 — hapus duplicate 'kontras' di config.js), TASK-8 (dokumentasi investigasi noun-suru). Merged by Agent 1 Crispy, 22 Maret 2026. ✅ semua verified by Agent 6 Crunchy.
- **v14.23.1 hygiene** — RESTRUKTURISASI-B-BATTER-BANKSOAL dihapus dari DISPATCH QUEUE — scope ter-cover di RESTRUKTURISASI-D (Plan B bank-soal redo total). Removed per TASK-HYGIENE-C001 verdict Crunchy, 23 Maret 2026.
- **v14.14.0** — TASK-SPICY-1: 19 scripts baru di tools/scripts/spicy/ (9 infra .sh + 9 app .js + config.js) + README. Bug fixes: vocab-n4 false positive, grammar ID flood, RETIRED_FILES terpusat. TASK-SPICY-2 di-unlock. Merged by Agent 1 Crispy, 18 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.13.0** — GOV-011: Ekspansi Tim (Spicy A7, Fluffy A8, Savory A9), Tools Infrastructure, Redistribusi jobdesk. AGENT-COMMON v9, AGENT-1 v8, AGENT-6 v8, MASTER-FLOW v4. 3 agent baru + 44 scripts governance. Merged by Agent 1 Crispy, 18 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.12.0** — TASK-UI-12: PWA icon SVG → PNG (icon-192.png + icon-512.png), TASK-UI-14: tambah PNG ke sw.js ASSETS (Crispy). Merged by Agent 1 Crispy, 17 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.11.0** — TASK-UI-BUNDLE-1: fix daily-word filter pool (UI-8), konsolidasi CSS :root + INC-001 (UI-11), update README 5 inkonsistensi (UI-13), fix querySelector fragile (UI-15). Merged by Agent 1 Crispy, 17 Maret 2026. ✅ verified by Agent 6 Crunchy.

- **v14.5.3** — dikerjakan Agent 5 sementara sbg Integrator (integrator utama kena limit): TASK-6 POS audit ✅, TASK-7 domain enrichment ✅, TASK-8 noun-suru duplikat fix (partial) ✅, TASK-9 grammar N4 w5-w6 audit clean ✅, TASK-10 split vocab-n4.js → soumatome+core ✅
- **v14.9.0** — RESTRUKTURISASI-B: migrasi vocab global (N5 711 entries, N4 692 entries) + grammar global (N5 80, N4 90, N3 103 entries) ke format unified. Split files lama (vocab-n5-core/soumatome, vocab-n4-core/soumatome, vocab-n3-soumatome) retired. Grammar files siap tapi belum aktif (tunggu engine). Merged by Agent 1 Crispy, 17 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.8.2** — TASK-BUTTON-FIX: hapus → dari tombol Mulai Latihan, Mulai, Ulang, Ulangi di index.html. Merged by Agent 1 Crispy, 16 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.8.1** — RESTRUKTURISASI-A (Plan A): schema dua tier (vocab global + book lens, grammar global + per buku) ditetapkan di _schema-vocab.md dan _schema.md. ID format: vg-{level}-{4digit} (vocab global), gn{level}-{4digit} (grammar global). App masih di-freeze. Merged by Agent 1 Crispy, 16 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.10.0** — GOV-010: Research Infrastructure. 6 file DB baru di docs/. AGENT-COMMON v8, AGENT-1-INTEGRATOR v7, AGENT-6-QA v7. Merged by Agent 1 Crispy, 17 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.9.0** — GOV-009: Audit Quality & Packaging Integrity. MASTER-FLOW v3, AGENT-COMMON v7, AGENT-1-INTEGRATOR v6, AGENT-6-QA v6. Merged by Agent 1 Crispy, Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.8.0** — GOV-008: Rate Limit Protocol + Periodic Audit Mechanism. MASTER-FLOW v2, AGENT-COMMON v6, semua agent prompts A1–A6 v5. AGENT-RATE-LIMIT-LOG.md dibuat. Merged by Agent 1 Crispy, 16 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.6.6** — GOV-007: Master Flow + Language Standardization. MASTER-FLOW-NUGGET-NIHONGO-v1.md ditambahkan, AGENT-COMMON v5, semua agent prompts A1–A6 v4. TASK-UI-15 (rename dari duplikat UI-9), TASK-BOOK-4 ditambahkan. Merged by Agent 1 Crispy, 15 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.6.5** — GOV-006: SESSION STATE BRIEF ditambahkan ke semua agent (AGENT-COMMON v4, AGENT-1–6 v3). Merged by Agent 1 Crispy, 15 Maret 2026. ✅ verified by Agent 6 Crunchy.
- **v14.5.x** — Agent 6 QA mulai aktif. Semua task berikutnya wajib melalui QA sebelum merge.
- **TASK-BOOK-MINNA dan TASK-BOOK-IRODORI** — status ✅ di versi sebelumnya tidak akurat. Direvisi ke ⚠️ karena data book-*.js masih kosong. Script tag sudah uncomment tapi fitur belum functional.

---

## Spicy Transition Status
> GOV-011. Diupdate setiap merge setelah Spicy aktif.

| Metrik | Status |
|--------|--------|
| Merge paralel selesai | 2/3 |
| Status | ONGOING |
| Declared by Crunchy | pending |

---

## Spicy Scan Counter
> GOV-011. Diupdate setiap merge setelah Spicy aktif.

| Metrik | Status |
|--------|--------|
| Merge sejak last Spicy periodic | 4/3 |
| Last Spicy periodic | SPICY-SCAN_PERIODIC-2026-03-30 — acknowledged by Crispy (30 Maret 2026) |

---

## Milestone Counter
> Di-seed saat merge GOV-008. Counter aktif mulai v15.0.0.

| Metrik | Status |
|--------|--------|
| App minor sejak last audit | 0/5 |
| Tier 1 count               | 1/2 |
| Last audit                 | Tier 1 (QA-002) — 21 Maret 2026 |
| Counter aktif sejak        | v15.0.0 |

---

## DISPATCH QUEUE
> Diupdate: 31 Maret 2026 (full cleanup by Crunchy — all ✅ items moved to _MAP-ARCHIVE.md)
> Hanya task OPEN / IN PROGRESS / BLOCKED yang ditampilkan.

### ACTIVE — Content Progress Path
| Task ID | Agent | Status | Catatan |
|---------|-------|--------|---------|
| TASK-VOC-5 | Juicy | 🟡 PARTIAL | examples[] + nuance: N5 213 missing, N4 614 missing. INC-027 xrefs FIXED. |
| TASK-N3 | Crispy | ✅ 1 Apr 2026 | 70 entries filled + activated. Verified. |
| TASK-SPICY-8 | Spicy | ✅ 1 Apr 2026 | 5 validation scripts merged. Verified by Agent 6 Crunchy. |
| TASK-VOC-6 | Juicy | 🔴 dep: SPICY-8 | Schema update vocab: provenance, confusion_pairs |
| TASK-GRM-7 | Batter | 🔴 dep: SPICY-8 | Schema update grammar + 16 new N3. ID canonical: gn (DEC-014) |
| TASK-BOOK-3 | Saucy | 🔴 dep: GRM-7 | grammar_ids field di book-*.js |
| TASK-INC018-FIX | — | ✅ 1 Apr 2026 | Data verified clean. No duplicate choices found in current files. |
| TASK-QA-INIT-3 | Crunchy | 🟢 READY | Verify cat list → unlocks TASK-UI-4 |
| TASK-GOLDEN-DAFPUS | Golden | 🔴 OPEN | Unified Daftar Pustaka UI |
| TASK-UI-PWA-UPDATE-NOTIFY | Golden | 🔴 OPEN | SW cache update banner. P2. |
| RESTRUKTURISASI-C | Saucy+Batter+Crispy | 🟢 READY | Book files lens |
| RESTRUKTURISASI-D | Golden+Crispy | 🔒 dep: B+C | UI+engine update |
| TASK-SCHEMA-SOURCES | Juicy | 🟡 LOW | Backfill `sources` field. Low priority. |

### ACTIVE — Infrastructure / Governance
| Task ID | Agent | Status | Catatan |
|---------|-------|--------|---------|
| GOV-018 | Crispy+Spicy | 🟡 IN PROGRESS | GitHub-Native Workflow Migration. Sub-tasks A✅ B✅ C✅ D pending. |
| TASK-GOV-018-D | Crispy | 🔓 dep satisfied | Repo restructure → src/+public/. HIGH RISK. CP(1) pending minor fix. |
| TASK-GOV-DISPATCH-FORMAT | Crispy | 🔴 OPEN | Define DISPATCH/PUSH ZIP formats. Tier S. |
| TASK-GOV-DECISION-13 | Crispy+Crunchy | 🔴 OPEN | Crispy deputy authority. Low urgency. |
| TASK-AGENTS-DIR | Crispy | 🔴 OPEN | Rename agent-prompts/ → agents/. Tier S. |
| TASK-DOCS-TECH | Crispy | 🔴 OPEN | ARCHITECTURE.md, DEPLOYMENT.md, CHANGELOG. Tier S. |

### ACTIVE — Tooling Pipeline (all Spicy)
| Task ID | Status | Catatan |
|---------|--------|---------|
| TASK-TOOL-MANIFEST | 🔴 OPEN | agent-tool-manifest.json. Unlocks all PIPELINE tasks. |
| TASK-VALIDATOR-ROUTING | 🔴 dep: TOOL-MANIFEST | validator-routes.json |
| TASK-PIPELINE-ZIP | 🔴 dep: TOOL-MANIFEST | pipeline-zip.py. Tier M. |
| TASK-PIPELINE-SESSION | 🔴 dep: TOOL-MANIFEST | pipeline-session.py. Tier M. |
| TASK-PIPELINE-GOV | 🔴 dep: TOOL-MANIFEST | pipeline-governance.py. Tier M. |
| TASK-PIPELINE-QA | 🔴 dep: TOOL-MANIFEST | pipeline-qa.py. Tier M. |
| TASK-PIPELINE-VOCAB | 🔴 dep: TOOL-MANIFEST | pipeline-vocab.py. Tier M. |
| TASK-PIPELINE-GRAMMAR | 🔴 dep: TOOL-MANIFEST | pipeline-grammar.py. Tier M. |
| TASK-PIPELINE-BOOK | 🔴 dep: TOOL-MANIFEST | pipeline-book.py. Tier M. |
| TASK-PIPELINE-SPICY | 🔴 dep: TOOL-MANIFEST | pipeline-spicy.py. Tier M. |
| TASK-TESTS-SCAFFOLD | 🔴 OPEN | tests/ directory + node test runner. Tier M. |
| TASK-GH-ACTIONS | 🔴 OPEN | CI workflows. Tier S. |
| TASK-UI-JLPT-VALIDATOR | 🔴 OPEN | jlpt-reference.json. P2. |
| TASK-SPICY-6-C4 | 🔒 BLOCKED | PDF Generator — spec pending |

### BLOCKED — Termux Bot (deep dependency chain)
| Task ID | Status | Catatan |
|---------|--------|---------|
| TASK-TERMUX-BOT | 🔒 dep: INFRA-2✅ + DISPATCH-FORMAT + PIPELINE-ZIP | Full Python engine. Tier L. |
| TASK-TERMUX-TUI | 🔒 dep: TERMUX-BOT | Interactive TUI. Tier M. |

### BLOCKED — Intelligence Pipeline (long-term, post-launch)
| Task ID | Status | Catatan |
|---------|--------|---------|
| TASK-SAVORY-PREP | 🔴 OPEN | Compile DBs for Savory |
| TASK-INTEL-P0C → P6B | 🔒 CHAIN | 14 tasks, sequential. P0C is next (AGENT-PERFORMANCE-DB seed). |

---

## Catatan untuk Savory
> Diisi Crispy saat ada temuan yang relevan untuk analisis. Savory pick up saat TASK-SAVORY-PREP unlock.

### Process Miss — Crispy (20 Maret 2026)
- **Kejadian**: Task Brief TASK-SPICY-BUCKET-J dikirim ke Crunchy tanpa entry di _MAP.md terlebih dahulu.
- **Terdeteksi**: CP(1) oleh Crunchy — REVISION v1 diterbitkan.
- **Resolved**: Entry ditambahkan, ZIP v2 diresubmit.
- **Klasifikasi**: Process miss Crispy (bukan GOV violation). Sistem CP(1) bekerja benar.
- **Relevan untuk**: Analisis efektivitas CP(1) sebagai safety net, pola miss Crispy pre-dispatch.
