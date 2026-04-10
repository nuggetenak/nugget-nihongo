# Nugget Nihongo — Project Map
> Read this first every session. Single source of truth for project structure.
> Last updated: v14.27.2 — 26 tasks seeded. Full mechanization document complete. 35 Termux possibilities locked. All gap fixes approved. 28 Maret 2026. (GOV-DISPATCH-FORMAT, INFRA-1/2, TOOL-MANIFEST, VALIDATOR-ROUTING, AGENTS-DIR, GH-ACTIONS, DOCS-TECH, PIPELINE x8, TESTS-SCAFFOLD, TERMUX-BOT, TERMUX-TUI). 28 Maret 2026
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
data/vocab-n4.js        N4 · unified (692 entries) · window.vocabN4   ✅ Active (RESTRUKTURISASI-B v14.9.0)
data/vocab-n3.js        N3 · placeholder           · window.vocabN3   🔒 Inactive — tunggu data
data/vocab-n2.js        N2 · placeholder           · window.vocabN2   🔒 Inactive — tunggu data
data/vocab-n1.js        N1 · placeholder           · window.vocabN1   🔒 Inactive — tunggu data

── GRAMMAR DB (format baru, belum aktif) ────────────────────────────────────
data/grammar-n5.js      N5 · 248 entries · window.grammarN5  🔒 Inactive — tunggu engine (RESTRUKTURISASI-D)
data/grammar-n4.js      N4 · 272 entries · window.grammarN4  🔒 Inactive — tunggu engine
data/grammar-n3.js      N3 · 313 entries · window.grammarN3  🔒 Inactive — tunggu engine
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
| **Agent 3 — Book** | Book index & docs | data/book-*.js, data/sources.js, docs/ |
| **Agent 4 — Grammar** | Grammar cards & bank soal | data/n3-w*.js, n4-w*.js, bank-soal*.js, data/_schema.md, data/grammar-n*.js |
| **Agent 5 — UI** | JavaScript, CSS, HTML UI | js/*.js, css/style.css, index.html (UI only) |
| **Agent 6 — QA** | Verifikasi & audit | _MAP.md (status only), data/qa-tests.js, docs/audit/, docs/DECISION-DB.md |
| **Agent 7 — Spicy** | Tooling & scripts | tools/scripts/spicy/, tools/scripts/utils/ |
| **Agent 8 — Fluffy** | Kurikulum | docs/curriculum/ |
| **Agent 9 — Savory** | Analytics & insights | docs/analytics/, RESEARCH-SUMMARY.md (draft) |

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
Source of truth lengkap: MASTER-FLOW-NUGGET-NIHONGO-v5.md
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
- Vocab DB aktif: vocab-n5.js (711) + vocab-n4.js (692) = **1.403 entries** (RESTRUKTURISASI-B v14.9.0)
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


#### TASK-N3 🟡 LINKED — Integrasi Vocab N3
- File: vocab-n3.js (placeholder, window.vocabN3 = [] — RESTRUKTURISASI-B v14.9.0)
- Prasyarat: TASK-VOC-1 selesai ✅
- Status: RESTRUKTURISASI-B selesai — vocab-n3.js tersedia sebagai placeholder
  Tugas: isi vocab-n3.js sampai >50 entries, lalu aktifkan di vocab-index.js + index.html
- Assign: Agent 2

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
| Merge sejak last Spicy periodic | 3/3 |
| Last Spicy periodic | SPICY-SCAN_ONDEMAND-2026-03-22 — acknowledged by Crunchy (22 Maret 2026) |

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
> Diupdate setiap merge oleh Agent 1 Crispy. Last updated: v14.27.0, 26 Maret 2026.

| Task ID | Agent | Dep. Status | Bisa mulai? | Unlocks | Catatan |
|---------|-------|-------------|-------------|---------|---------|
| RESTRUKTURISASI-B | Juicy+Batter+Crispy | ✅ DONE | — | — | Merged v14.9.0 |
| RESTRUKTURISASI-C | Saucy+Batter+Crispy | 🟢 READY | Bisa mulai | — | Book files lens; wajib pecah per buku |
| RESTRUKTURISASI-D | Golden+Crispy | 🔒 BLOCKED | Tunggu B+C | — | UI+engine update; selfTest 0 failures wajib |
| TASK-BUTTON-FIX | Golden | ✅ DONE | — | — | Merged v14.8.2 |
| TASK-N3 | Juicy | 🟢 READY | vocab-n3.js placeholder tersedia. Isi >50 entries. | — | Was BLOCKED tunggu RESTRUKTURISASI-B |
| TASK-VOC-5 | Juicy | 🟢 READY | vocab-n4.js migrasi selesai. Lanjutkan examples[] + nuance. | — | Was PAUSED tunggu RESTRUKTURISASI-B |
| TASK-UI-10 | Golden | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | Bug fix SRS quality mapping. Merged v14.22.2 |
| TASK-8 | Juicy | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | Dokumentasi investigasi noun-suru. Referensi vocab-n5-soumatome.js (RETIRED) dihapus. |
| TASK-SPICY-1 | Spicy (A7) | ✅ DONE | — | — | Merged v14.14.0 |
| TASK-SPICY-2 | Spicy (A7) | ✅ DONE | — | — | Merged v14.15.0 |
| TASK-SPICY-3 | Spicy (A7) | ✅ DONE | — | TASK-SPICY-4A–4D, TASK-SPICY-5 (Bucket E) | Merged v14.15.1. 12 deliverables: 9 scripts + parse-docx.py + 2 updates. |
| TASK-CONFIG-FIX | Spicy (A7) | ✅ DONE | — | TASK-SPICY-4A–4D | Merged v14.15.2. Fix A–D (INC-007–010 RESOLVED). scope expand: +validate-grammar-schema.js +schema-validate.js (approved Nugget-san). |
| TASK-INC012-FIX | Juicy (A2) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | Fix 533 entri vocab-n4.js non-verb conj_type 'godan' (INC-012). Tier S. |
| TASK-BATTER-CATS-REVIEW | Batter (A4) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | Hapus duplicate 'kontras' dari config.js. Merged v14.22.3. TASK-QA-INIT-3 bisa di-dispatch. |
| TASK-QA-INIT-3 | Crunchy (A6) | 🟢 READY | TASK-GRM-6 ✅ | TASK-UI-4 | Verifikasi daftar cat final sebelum approve TASK-UI-4 dispatch. Tier S. |
| TASK-GRM-6 | Batter (A4) | ✅ 23 Maret 2026 — confirmed by Nugget-san | — | TASK-UI-4 UNLOCKED | Daftar cat final selesai. Dikonfirmasi Nugget-san 23 Maret 2026. Tidak ada patch ZIP — status update saja. |
| TASK-INC017-FIX | Golden (A5) | ✅ 23 Mar 2026 — verified by Agent 6 | — | — | INC-017: load order violation — conjugation-engine.js load setelah quiz.js di index.html. HIGH priority. Tier S. |
| TASK-INC018-FIX | Batter (A4) | 🔍 Task Brief di CP(1) Crunchy | Task Brief dispatched 24 Maret 2026 | — | INC-018: bs-n4-w4d7-13 duplicate choices in bank-soal.js (BSL-006). Tier S. |
| TASK-INC019-FIX-A | Spicy (A7) | ✅ 23 Mar 2026 — verified by Agent 6 | — | TASK-INC019-FIX-B | INC-019: Investigasi selesai. 3 entries bermasalah ditemukan (bukan 2) — missing opening quote. INVESTIGATION-REPORT.md tersedia. |
| TASK-INC019-FIX-B | Batter (A4) | ✅ 2026-03-23 — verified by Agent 6 | — | — | INC-019: Fix 3 malformed jp: entries di grammar-n4.js. RESOLVED. |
| TASK-SPICY-PROP-008 | Spicy (A7) | ✅ 23 Mar 2026 — verified by Agent 6 | — | — | ZIP Robustness: run-cp1-checklist.js fix (nested path detection + Format B parsing). resolve-project-root.js dan project-health.js sudah resolved via TASK-SPICY-7. Merged v14.24.0. |
| TASK-INC013-FIX | Juicy (A2) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | Fix 106 broken see_also refs di vocab-n4.js (INC-013). Count diupdate 57→106 per SPICY-SCAN post-v14.18.5. Tier S. |
| TASK-INC014-FIX | Batter (A4) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | INC-014: FALSE POSITIVE — validator bug (validate-bank-soal-coverage.js). Tidak ada perubahan data. |
| TASK-INC015-FIX | Golden (A5) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | INC-015: FALSE POSITIVE — validator bug (validate-css-variables.js). Tidak ada perubahan CSS. |
| TASK-SPICY-4A | Spicy (A7) | ✅ DONE | — | — | Merged v14.16.0. get-pos-list, get-field-template, check-xref-bidirectional, count-entries-by-level, get-vocab-completeness. |
| TASK-SPICY-4B | Spicy (A7) | ✅ DONE | — | — | Merged v14.16.0. get-cat-list, get-week-summary, get-bank-soal-stats, validate-bank-soal-coverage, check-grammar-duplicates. |
| TASK-SPICY-4C | Spicy (A7) | ✅ DONE | — | — | Merged v14.16.0. get-book-stats, get-unit-summary, validate-book-completeness, scaffold-book-chapter, validate-sources-counts. |
| TASK-SPICY-4D | Spicy (A7) | ✅ DONE | — | — | Merged v14.16.0. get-css-variable-list, get-js-function-index, get-component-map, validate-css-variables, get-dead-css-classes, get-quiz-api-map. |
| TASK-SPICY-5A | Spicy (A7) | ✅ DONE | — | — | Merged v14.18.0. 17 scripts: Bucket F (Crunchy) + Bucket J/new (session tools). ✅ 20 Maret 2026 — verified by Agent 6 |
| TASK-SPICY-5B | Spicy (A7) | ✅ DONE | — | — | Merged v14.18.1. 6 scripts: Bucket E (Crispy). ✅ 20 Maret 2026 — verified by Agent 6 |
| TASK-SPICY-5C | Spicy (A7) | ✅ DONE | — | — | Merged v14.18.2. 10 scripts: Bucket I (governance/meta) + Bucket K (audit). ✅ 20 Maret 2026 — verified by Agent 6 |
| TASK-SPICY-5D | Spicy (A7) | ✅ DONE | — | — | Merged v14.18.3. 5 scripts: Bucket G (Spicy self) + Bucket H (cross-file). ✅ 20 Maret 2026 — verified by Agent 6 |
| TASK-SPICY-5E | Spicy (A7) | ✅ DONE | — | — | Merged v14.18.4. prepare-deployment.js. ✅ 20 Maret 2026 — verified by Agent 6 |
| TASK-SPICY-BUCKET-J | Spicy (A7) | ✅ DONE | — | — | Merged v14.17.2. 8 scripts testing/self-diagnostic infrastructure. ✅ 20 Maret 2026 — verified by Agent 6 |
| TASK-SPICY-6-C1 | Spicy (A7) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | Bugfixes Kritikal — path + schema + orientation. Tier S. |
| TASK-SPICY-6-C2 | Spicy (A7) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | Validator Fixes — grammar/book/bank/conjugation. Tier M. |
| TASK-SPICY-6-C3a | Spicy (A7) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | New Scripts — scan-ids.js + scan-secrets.js + run-full-scan.js. Tier M. |
| TASK-SPICY-6-C3b | Spicy (A7) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | New Scripts — detect-stale + validate-cross-schema + validate-inc-db-sync. Tier M. |
| TASK-SPICY-6-C4 | Spicy (A7) | 🔒 BLOCKED | template spec pending | — | PDF Generator — hold sampai SPICY-PDF-TEMPLATE-SPEC.md + pdfkit eval. |
| TASK-SPICY-7 | Spicy (A7) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | project-health.js + resolve-project-root.js (BARU) + run-cp1-checklist.js. Merged v14.21.1. |
| TASK-SPICY-DIAG | Spicy (A7) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | 6 script fixes + scan-deprecated-fields.js (BARU) + CRUNCHY-DISPATCH-DIAG-001.md. Merged v14.22.0. |
| TASK-GOV-MANDATORY-TAHAP1 | Crunchy (A6) | ✅ DONE | — | — | Merged v14.17.1. AGENT-COMMON v11, 2 addendum v2, 9 prompts updated. |
| TASK-GOV-MANDATORY-TAHAP2 | Crunchy (A6) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | Update sequence commands + Crunchy SESSION MENU (get-db-summary). Tier 🟡 M. |
| TASK-GOV-MANDATORY-TAHAP3 | Crunchy (A6) | ✅ 21 Mar 2026 — verified by Agent 6 | — | — | Implementasi TOOLS distribution penuh, generate-tools-zip, agent-tools-config. Tier 🟢 S. |
| TASK-ARCHIVE-INIT | Crispy (A1) | ✅ DONE | — | — | GOV-015. Merged v14.17.1. Folder structure, archive init, Step 5–6 selesai. |
| TASK-INC020-FIX | Spicy (A7) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | Fix INC-020 (SWA-001): tambah grammar-n3/4/5 + vocab stubs ke sw.js ASSETS list. Merged v14.22.4. |
| TASK-GAP5-FASE-A | Spicy (A7) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | GAP 5 Fase A (SPICY-PROP-007): .gitignore + deploy.yml hardening + pre-deploy-checks.yml + install-hooks.sh. Independent. |
| TASK-SPICY-F-002 | Spicy (A7) | ✅ 23 Maret 2026 — verified by Agent 6 | — | — | AUTO-TRIGGER fix: tambah ⚡ AUTO-TRIGGER line di 5 senior agent prompts (A1/A6/A7/A8/A9). Tier S. |
| TASK-SAVORY-PREP | Savory (A9) | 🔴 OPEN | Task Brief pending | — | Compile semua DB existing ready untuk Savory. Tambah SCRIPT-METRICS-DB. |
| TASK-HYGIENE-C001 | Crunchy (A6) | ✅ 23 Maret 2026 — verified by Crunchy | — | — | Governance hygiene decisions resolved: ST5 (VISION.md archived), UF6 (ghost task removed), UF8 (Violation Log closed). |
| TASK-FLUFFY-1 | Fluffy (A8) | ✅ 24 Maret 2026 — Ecosystem Fit Clearance by Agent 6 Crunchy | — | TASK-GOLDEN-DAFPUS, TASK-SPICY-8, TASK-VOC-6, TASK-GRM-7, TASK-BOOK-3 | Curriculum audit + Architecture Proposal. docs/curriculum/ seeded: TAXONOMY-MASTER-v2, conjugation_engine_v1, CURRICULUM-PROPOSAL-v2. |
| TASK-GOLDEN-DAFPUS | Golden (A5) | 🔴 OPEN | Task Brief pending — dep TASK-FLUFFY-1 ✅ | — | Unified Daftar Pustaka UI |
| TASK-SPICY-8 | Spicy (A7) | 🔴 OPEN | Task Brief pending — dep TASK-FLUFFY-1 ✅ | TASK-VOC-6, TASK-GRM-7 | 5 validation scripts baru dari CP-8: validate-confusion-pairs, validate-provenance, validate-grammar-ids-xref, validate-id-format, validate-jlpt-values |
| TASK-VOC-6 | Juicy (A2) | 🔴 OPEN | Task Brief pending — dep TASK-SPICY-8 | — | Schema update vocab: provenance, confusion_pairs, jlpt:'beyond'. ID format: vg-{level}-{4digit} (4-digit). |
| TASK-GRM-7 | Batter (A4) | 🔴 OPEN | Task Brief pending — dep TASK-SPICY-8 | TASK-BOOK-3 | Schema update grammar: provenance, confusion_pairs, register:'literary', jlpt:'beyond' + 16 new N3 entries. ID canonical: gn{level}-{4digit}. |
| TASK-BOOK-3 | Saucy (A3) | 🔴 OPEN | Task Brief pending — dep TASK-GRM-7 | — | Tambah grammar_ids field di semua book-*.js entries |
| GOV-016 | Crunchy (A6) | ✅ DONE | — | — | Merged v14.18.5. VISION.md + PIA.md + DECISION-MATRIX-CONFIG.yaml + IDEA-PLAN. ✅ 20 Maret 2026 — verified by Agent 6 |
| TASK-INTEL-P0A | Crunchy+Crispy | ✅ 21 Maret 2026 — verified by Agent 6 | — | — | Archive enforcement + FOR-INTEGRATOR packaging update |
| TASK-INTEL-P0B | Spicy (A7) | ✅ 22 Maret 2026 — verified by Agent 6 | — | — | extract-archive-metadata.js + METADATA-HEADER-STANDARD.md. Merged v14.22.1. TASK-INTEL-P0C di-unlock. |
| TASK-INTEL-P0C | Crunchy+Crispy | 🔴 OPEN | — | TASK-INTEL-P0B ✅ | AGENT-PERFORMANCE-DB seed dari data existing |
| TASK-INTEL-P0D | Savory+Spicy | 🔒 | TASK-INTEL-P0C | — | generate-daily-brief.js + DAILY-BRIEF.md operational |
| TASK-INTEL-P1A | Savory+Spicy | 🔒 | TASK-INTEL-P0D | — | Scoring Engine core |
| TASK-INTEL-P1B | Savory+Crispy | 🔒 | TASK-INTEL-P1A | — | Alert system |
| TASK-INTEL-P1C | Savory | 🔒 | TASK-INTEL-P1B | — | DECISION-SNAPSHOT per merge |
| TASK-INTEL-P2A | Savory+Spicy | 🔒 | TASK-INTEL-P1C | — | Knowledge Graph |
| TASK-INTEL-P2B | Savory+Crispy | 🔒 | TASK-INTEL-P2A | — | Dependency Intelligence |
| TASK-INTEL-P3A | Savory | 🔒 | TASK-INTEL-P2B | — | Temporal Intelligence |
| TASK-INTEL-P3B | Crunchy+Savory | 🔒 | TASK-INTEL-P3A | — | Governance Intelligence |
| TASK-INTEL-P4A | Savory+Crispy | 🔒 | TASK-INTEL-P3B | — | Agent Collaboration Intelligence |
| TASK-INTEL-P4B | Savory+Fluffy | 🔒 | TASK-INTEL-P4A | — | Content Intelligence |
| TASK-INTEL-P5A | Savory+Crispy | 🔒 | TASK-INTEL-P4B | — | Risk Simulation |
| TASK-INTEL-P5B | Savory+Crunchy | 🔒 | TASK-INTEL-P5A | — | Learning Loop |
| TASK-INTEL-P6A | Crunchy+NS | 🔒 | TASK-INTEL-P5B | — | Meta-Governance + Succession |
| TASK-INTEL-P6B | Savory | 🔒 | app launched | — | External Intelligence |
| TASK-GOV-017 | Crunchy (A6) | ✅ 23 Maret 2026 — verified by Agent 6 | — | — | Governance Hygiene + Reform Proposal (GOV-017). Taxonomy v5, MASTER-DIRECTIVE-LOG, VIOLATION-DB updates. |
| TASK-GOV-017-A | Spicy (A7) | ✅ 23 Mar 2026 — verified by Agent 6 | — | — | Extend run-merge-checklist.js (15 checks, hard exit, fix hints) + generate-for-integrator-readme.js baru. Merged v14.25.0 (batch dengan GOV-017-B). |
| TASK-GOV-017-B | Spicy (A7) | ✅ 23 Mar 2026 — verified by Agent 6 | — | — | scan-unarchived-docs.js + snapshot-dbs.js + 11 new folders. Merged v14.25.0 (batch dengan GOV-017-A). |
| TASK-GOV-017-C | Crunchy (A6) | ✅ 2026-03-23 — verified by Agent 6 | — | — | Update Crunchy packaging: DISPATCH-CLEARANCE ke archive. AGENT-6-QA v13, ADDENDUM v5, DECISION-DB HYG-011/022 fixed. |
| TASK-GOV-017-D1 | Crispy (A1) | ✅ 2026-03-23 — verified by Agent 6 | — | — | AGENT-1-INTEGRATOR v12 + AGENT-COMMON v14 + _MAP.md hygiene (HYG-002/003/006/017). MASTER-DIRECTIVE-LOG seeded. |
| TASK-GOV-017-D2 | Crispy (A1) | ❌ CANCELLED | 26 Maret 2026 | — | Backfill + stray cleanup — scope absorbed ke GOV-018-C (rewrite AGENT-CORE). File lama akan di-replace total. |
| GOV-018 | Crispy (A1) + Spicy (A7) | 🟡 IN PROGRESS | 26 Maret 2026 | — | GitHub-Native Workflow Migration. Ganti full project ZIP (~40MB+) dengan claude_patch/ kecil via Termux scripts. IDEA-PLAN: IDEA-PLAN-GOV-018-GITHUB-WORKFLOW.md (Crunchy). Sub-tasks: A→B→C+D. |
| TASK-GOV-018-A | Spicy (A7) | ✅ 28 Maret 2026 | — | — | Generate Termux scripts: pull_script.sh, push_script.sh, merge_script.sh, conflict_check.sh, rollback_script.sh, init_workspace.sh + TERMUX-README.md. Output: tools/scripts/utils/termux/ |
| TASK-GOV-018-B | Spicy (A7) | 🔴 OPEN — Task Brief di CP(1) Crunchy (paralel dengan A) | — | — | Rewire semua tools/scripts paths ke new src/ structure. Backward compat wajib. Partial patch mode untuk run-cp2-mechanical-checks.js + zip-intake-check.js. |
| TASK-GOV-018-C-TRIM | Crispy (A1) | ✅ 28 Maret 2026 | — | — | PK Trim: 9 AGENT-CORE files trimmed (29% reduction, 852→605 lines). OUTPUT DISCIPLINE rule added. Standalone — no dep on A/B. |
| TASK-GOV-018-C | Crispy (A1) | 🔒 BLOCKED — dep: TASK-GOV-018-A + B ✅ | TASK-GOV-018-A, TASK-GOV-018-B | — | Update agent prompts → AGENT-CORE format (replaces AGENT-COMMON, MASTER-FLOW, all AGENT-[N] files). Absorbs scope TASK-GOV-017-D2. |
| TASK-GOV-018-D | Crispy (A1) | 🔒 BLOCKED — dep: TASK-GOV-018-B ✅ | TASK-GOV-018-B | — | Repo cleanup: hapus root-level legacy folders (js/, css/, data/, fonts/) + legacy files. HIGH RISK — selfTest() wajib pass sebelum delete. |


| TASK-DEPLOY-FIX | Crispy (A1) | 🔴 OPEN — URGENT | — | — | SECURITY: pk-nugget-nihongo/ currently PUBLIC on GitHub Pages. Fix deploy.yml exclusions: add agents/, pk-nugget-nihongo/, AGENT-COMMON-*.md, MASTER-DIRECTIVE-LOG.md, logs/, state/, tests/, CHANGELOG.md. Include Crispy notification to Crunchy. Tier S. |
| TASK-GOV-DECISION-13 | Crispy (A1) + Crunchy input | 🔴 OPEN | — | — | Formal GOV treatment for DECISION-13: Crispy as Crunchy deputy for certain approvals when Crunchy unavailable. Tier S. Low urgency. |
| TASK-UI-PWA-UPDATE-NOTIFY | Golden (A5) | 🔴 OPEN | — | — | Add in-app banner when new sw.js cache version detected: "📱 New content available! Tap to refresh." Tier S. P2. |
| TASK-UI-JLPT-VALIDATOR | Batter (A4) | 🔴 OPEN | — | TASK-PIPELINE-VOCAB, TASK-PIPELINE-GRAMMAR | Create data/schemas/jlpt-reference.json — standard JLPT N1-N5 word/grammar lists for cross-reference validation. Tier S. P2. |
| TASK-GOV-DISPATCH-FORMAT | Crispy (A1) | 🔴 OPEN | — | TASK-TERMUX-BOT | Define DISPATCH ZIP + PUSH ZIP formats. Update zip-formats.md, naming-convention.md, AGENT-CORE-A1.md. Tier S. |
| TASK-INFRA-1 | Spicy (A7) | 🔴 OPEN | — | — | Add package.json (no "type:module"), .editorconfig, jsconfig.json, .env.example. Tier S. |
| TASK-INFRA-2 | Spicy (A7) | 🟢 READY | GOV-018-A ✅ | TASK-TERMUX-BOT | logs/ structure, state/ folder, enhance 5 termux scripts (conventional commits, diff preview, SHA256 dedup, rate limit check, log output). Fix INC-NEW-1 (merge_script.sh wrong INC-DB path). Tier M. |
| TASK-TOOL-MANIFEST | Spicy (A7) | 🔴 OPEN | — | TASK-TERMUX-BOT, all PIPELINE tasks | Create tools/config/agent-tool-manifest.json — maps A1–A9 to pipeline tools for auto-inject. Tier S. |
| TASK-VALIDATOR-ROUTING | Spicy (A7) | 🔴 OPEN | — | TASK-TERMUX-BOT | Create tools/config/validator-routes.json — file pattern → validator script mapping. Update push_script.sh to read it. Tier S. |
| TASK-AGENTS-DIR | Crispy (A1) | 🔴 OPEN | — | — | Rename agent-prompts/ → agents/prompts/. Create agents/common/, agents/registry/AGENT-REGISTRY.md, agents/archive/. Move AGENT-COMMON-*.md from root. Create docs/agents/ + docs/database/ sub-folders. Tier S. |
| TASK-GH-ACTIONS | Spicy (A7) | 🔴 OPEN | — | — | Add validate-data.yml, test.yml (stub), Lighthouse CI workflow, staging branch deploy workflow. Add ISSUE_TEMPLATE/data_correction.md. Deploy preview comments on feature branches. Tier S. |
| TASK-DOCS-TECH | Crispy (A1) | 🔴 OPEN | — | — | Create docs/technical/ARCHITECTURE.md (5 design principles + app overview), DATA-SCHEMA.md, DEPLOYMENT.md. Add CHANGELOG.md + LICENSE to root. Tier S. |
| TASK-PIPELINE-ZIP | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | All pipeline tasks, TASK-TERMUX-BOT | pipeline-zip.py — shared ZIP ops: package-patch, package-brief, package-integrator, intake-check, extract, inject. Python. Tier M. |
| TASK-PIPELINE-SESSION | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | All pipeline tasks | pipeline-session.py — shared session ops: proof-gen, warmstart, patch-notes, rate-limit-partial. Python. Tier M. |
| TASK-PIPELINE-GOV | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | — | pipeline-governance.py — Crispy domain: health, orientation, merge-check, map-summary, version. Python. Tier M. |
| TASK-PIPELINE-QA | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | — | pipeline-qa.py — Crunchy domain: cp1, cp2, intake, verdict, inc-check. Python. Tier M. |
| TASK-PIPELINE-VOCAB | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | — | pipeline-vocab.py — Juicy domain: validate, scaffold, audit, completeness, next-id, duplicate, n-level balance. Python. Tier M. |
| TASK-PIPELINE-GRAMMAR | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | — | pipeline-grammar.py — Batter domain: validate, scaffold, audit, cat-check, pos-check, duplicate. Python. Tier M. |
| TASK-PIPELINE-BOOK | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | — | pipeline-book.py — Saucy domain: validate, scaffold, chapter-check, completeness. Python. Tier M. |
| TASK-PIPELINE-SPICY | Spicy (A7) | 🔴 OPEN | TASK-TOOL-MANIFEST ✅ | — | pipeline-spicy.py — Spicy domain: full-scan, targeted-scan, schema-validate, xref-check. Python. Tier M. |
| TASK-TESTS-SCAFFOLD | Spicy (A7) | 🔴 OPEN | — | — | Scaffold tests/: unit/ stubs, data/validate-vocab.js + validate-grammar.js (real), fixtures/. Node test runner. Tier M. |
| TASK-TERMUX-BOT | Spicy (A7) | 🔒 BLOCKED | TASK-INFRA-2 ✅ + TASK-GOV-DISPATCH-FORMAT ✅ + TASK-PIPELINE-ZIP ✅ | TASK-TERMUX-TUI | Full Nugget-Bot Python engine. 15 components + all 35 mechanization possibilities. See MASTER-MECHANIZATION-DOCUMENT.md for full scope. ~3,000+ lines Python. Tier L — multi-session. |
| TASK-TERMUX-TUI | Spicy (A7) | 🔒 BLOCKED | TASK-TERMUX-BOT ✅ | — | Full interactive TUI. Python rich + prompt_toolkit. 10 screens, context-sensitive help, plain Indonesian UI, disaster recovery (8 scenarios). Spec: docs/governance/proposals/TUI-DESIGN-DOCUMENT.md. Tier M. |

---

## Catatan untuk Savory
> Diisi Crispy saat ada temuan yang relevan untuk analisis. Savory pick up saat TASK-SAVORY-PREP unlock.

### Process Miss — Crispy (20 Maret 2026)
- **Kejadian**: Task Brief TASK-SPICY-BUCKET-J dikirim ke Crunchy tanpa entry di _MAP.md terlebih dahulu.
- **Terdeteksi**: CP(1) oleh Crunchy — REVISION v1 diterbitkan.
- **Resolved**: Entry ditambahkan, ZIP v2 diresubmit.
- **Klasifikasi**: Process miss Crispy (bukan GOV violation). Sistem CP(1) bekerja benar.
- **Relevan untuk**: Analisis efektivitas CP(1) sebagai safety net, pola miss Crispy pre-dispatch.
