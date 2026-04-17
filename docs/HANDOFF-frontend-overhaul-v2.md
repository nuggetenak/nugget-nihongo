# HANDOFF — Frontend Overhaul (v2.1)
**For:** next Claude agent (any model, any session)
**From:** Claude Opus 4.6 · claude.ai session · 16 April 2026
**Owner:** Nugget (`@nuggetenak`)
**Branch:** `claude/frontend-overhaul`
**Status:** Phase 0 + 2 + 3 + 5 + 5.5a + 5.5b complete. Run §15.7 quality gates next, then Phase 5.5c.

---


## Session update — 2026-04-17 (Agent: Claude Opus 4.7, session 5)

### Completed this session
**Phase 5.5b DONE** — feedback widget + Latihan AI UI + fallback drills + pre-gen scheduler. 1 atomic commit. Tests 10741 → 10788 (+47).

**Files added/modified:**
- `public/js/ai-feedback.js` (new) — 👍/👎/✏️ widget. Quarantines on 👎 (localStorage blocklist + IDB eviction). Reason picker: grammar_wrong / out_of_level / unnatural / wrong_answer / not_relevant / other. Edit picker: correction textarea. Syncs to Supabase `ai_feedback` table (fire-and-forget). Anonymous users supported. CSS injected dynamically.
- `public/js/ai-quiz-mode.js` (new) — Intercepts `setQuizMode('ai_quiz')` + `startQuiz()` via chain-override (same pattern as quiz-mixed.js). Loads AIContentEngine, renders MCQ cards + feedback widgets. Falls back to `getFallbackDrills()` if AI fails. Reveals `#modeAIQuiz` button on DOMContentLoaded if flag on.
- `public/data/fallback/quiz-drills.json` (new) — 12 offline fallback drills (6×N5, 6×N4). All pass structural validator.
- `public/js/offline-ai-cache.js` — added `removeQuiz(key)` (quarantine eviction), `getFallbackDrills(level)`, pre-gen scheduler (4 triggers: app-open, tab-focus, night-time, card-idle).
- `supabase/schema.sql` — `ai_feedback` table (RLS: INSERT=all, SELECT=own rows), `ai_quiz_cache` table (shared server-side cache, public read, expires 7d).
- `public/index.html` — `<script>` tags for 4 new files, `#modeAIQuiz` button in `#qcat-latihan` (hidden by default).
- `public/styles/app.css` — `.mode-btn--ai`, `.mode-badge` styles.

**Commit:** `4277b58`

**Feature still fully OFF for all users.** Nothing is visible without:
```js
localStorage.setItem('nn_feature_ai_quiz_gen', '1'); location.reload();
```

### ⚠️ Manual deploy required BEFORE enabling flag
```bash
# 1. Deploy Worker (new /generate-quiz + /critique endpoints)
cd workers && wrangler deploy

# 2. Apply Supabase schema (run in Supabase SQL editor or):
supabase db push   # if using CLI + linked project
```

### What's next — §15.7 Quality Gates (YOU need to do this)

This is the human-in-the-loop gate before the flag ships to users.

1. Enable flag locally: `localStorage.setItem('nn_feature_ai_quiz_gen', '1')`
2. Open app → Latihan → Latihan AI
3. Generate questions at N4 (your main level)
4. Review manually: does each question feel correct? Are distractors plausible? Does the Japanese sound natural?
5. Target: ≥90% of questions pass your review
6. If <90%: tell next Claude agent which patterns fail → tune prompts in `QUIZ_GEN_SYSTEM_PROMPT` in `workers/ai-proxy.js`
7. If ≥90%: proceed to Phase 5.5c OR flip flag for yourself only first to gather real feedback data for a week before flipping for all users

**You don't need to review 100 questions in one sitting.** Even 20-30 gives a clear signal. The §15.7 "100 questions" target is for the formal pre-launch gate; an informal 20-question spot-check now will tell you if prompt tuning is needed.

### After quality gates: Phase 5.5c (promotion pipeline)
- `supabase/schema.sql` — `ai_promotion_queue` table
- `workers/admin-api.js` (new) — Cloudflare Worker for promote/reject/blocklist actions
- `public/admin/promote.html` (new) — admin UI (URL-only access, not in main nav)
- Tests — lineage metadata validation on promoted items

---

## Session update — 2026-04-17 (Agent: Claude Opus 4.7, session 4)

### Completed this session
- **Phase 5.5a DONE**: AI Content Engine foundation — Generator + Critic + Validator pipeline, feature-flagged OFF. 3 atomic commits. Tests 10725 → 10741 (+16 validator/engine assertions on top of the +21 from validator commit).

**Files added/modified:**
- `public/js/ai-validator.js` (new, 267 lines) — Stage 3 structural validator. All 7 rules (R1 schema, R2 target-present, R3 no-spoiler, R4 level-leak, R5 mojibake, R6 distractor-quality, R7 answer-in-choices). Pure JS, no LLM. Also exports `buildVocabLevelIndex()` which consumes the `window.vocabN5..vocabN1` globals.
- `workers/ai-proxy.js` (+375 lines) — added 2 new routes:
  * `POST /generate-quiz` — Stage 1, over-generates by 50% per §15.2
  * `POST /critique` — Stage 2, cross-provider (excludes generator from cascade)
  * New standalone system prompts: `QUIZ_GEN_SYSTEM_PROMPT`, `CRITIC_SYSTEM_PROMPT`
  * New helpers: `rawGroq`/`rawGemini`/`rawOpenRouter` (explicit systemPrompt, returns provider identity), `callWithCascade` (with `excludeProvider` option), `extractJSONArray` (tolerant of markdown fences)
  * Main `fetch()` refactored to switch on `url.pathname`: `/chat` / `/generate-quiz` / `/critique`
  * `/chat` behavior untouched — persona-drift test still passes
- `public/js/ai-content-engine.js` (new, 270 lines) — client-side orchestrator. Feature-flagged via `localStorage.nn_feature_ai_quiz_gen`. 3-round retry with rejection-reason hints. Soft-fails if critic 503s (treats all as APPROVED, validator alone decides). Every served question gets full §15.9 lineage metadata.
- `tests/run.js` (+160 lines) — 21 validator tests + 16 content-engine tests. All passing.

**Commits (3 atomic):**
- `f3043f7` — `feat(ai-content): structural validator + 21 tests (§15.2 stage 3)`
- `b137de1` — `feat(ai-content): Worker /generate-quiz + /critique endpoints (§15.2 stages 1-2)`
- `de61e4c` — `feat(ai-content): client-side G+C+V orchestrator (flag off) + 16 tests`

**Architectural deviation from plan (important to understand):**
Plan §15.8 listed `workers/ai-validator.js`. I moved the structural validator to `public/js/ai-validator.js` because R4 (level-leak check) needs the vocab DB, which is client-side (~100KB across vocab-n5..vocab-n1.js). Shipping that into every Worker request would be wasteful. The Worker got the LLM-based `/critique` endpoint instead (which is the LLM-heavy half of the pipeline — Worker is the right place for that). Net effect: same pipeline, better-chosen deployment boundary.

**Nothing user-visible changed.** The content engine:
1. Is flagged off by default (`localStorage.nn_feature_ai_quiz_gen !== '1'`)
2. Is not yet loaded via `<script>` tag in `index.html`
3. Is not yet called from any UI code

All three gates must be opened for users to see AI-generated quizzes. By design — the 5 §15.7 quality gates include a human native-speaker review of 100 questions that hasn't happened yet.

**Deploy requirements (manual, not automated):**
- `wrangler deploy` from `workers/` — new endpoints won't exist in production until this runs
- No Edge Function changes this phase
- No schema changes this phase
- No `sw.js` cache-key bump needed (no `public/` runtime behavior changed for users)

### What's next (Phase 5.5b — recommended order)

Next unit of work, per plan §15:

1. **`supabase/schema.sql`** — add `ai_feedback` table (user_id, ai_item_id, verdict, reason, correction, lineage_json, created_at)
2. **`public/js/ai-feedback.js`** (new) — 👍/👎/✏️ widget. Flagged items are immediately quarantined (removed from `nn_ai_cache` + added to local blocklist) AND sync to Supabase.
3. **`public/data/fallback/quiz-drills.json`** (new) — offline fallback. §15.5 item 4.
4. **Extend `public/js/offline-ai-cache.js`** — pre-gen scheduler (§15.4). Triggers: app-open + wifi + battery>50%, session-end, idle-on-card >30s, night-time bulk.
5. **UI wiring** — add `<script>` tags in `index.html`, add `Latihan AI` button in Latihan tab behind same feature flag. Copy: "Eksperimen — AI generate soal. Buka kalau lu mau bantuin kami test." Default: hidden unless `localStorage.nn_feature_ai_quiz_gen === '1'`.

After 5.5b: **Run §15.7 quality gates** (manual, human-in-loop). Only then can the flag ship to all users.

After gates pass: **Phase 5.5c** — promotion pipeline (§15.9) with admin panel, `ai_promotion_queue` table, lineage-validation tests.

### What NOT to touch
Everything from previous handoff entries still applies. Notably:
- `corpus/v17-pass15` branch — READ ONLY
- Persona prompt in `workers/ai-proxy.js` SYSTEM_PROMPT and `supabase/functions/ai-router/index.ts` MASTER_SYSTEM_PROMPT are byte-locked by drift test
- `public/data/vocab/*.js` and `public/data/grammar/*.js` are append-only

### Open questions for Nugget
- When wrangler-deploying the Worker, there's no staging env configured. Deploy goes straight to production. New endpoints are POST-only behind 404 for GET, and the main `/chat` route is unchanged, so this is safe — but worth flagging.
- Feature flag mechanism for 5.5b: pure localStorage? Or promote to a Supabase-backed user setting? Plan doesn't specify. Defaulting to localStorage for now; trivial to promote later.
- Should the 5.5b feedback widget write to Supabase even for anonymous (not-logged-in) users via anon ID? Plan §15.6 implies yes ("syncs to Supabase"); worth confirming — RLS policy matters.

---

## Session update — 2026-04-17 (Agent: Claude Opus 4.7, session 3)

### Completed this session
- **Phase 5 DONE**: Sensei persona v2 — canonical prompt shipped. 3 atomic commits. Tests 10704/0.

**Files added/modified:**
- `shared/sensei-persona-v2.txt` (new) — canonical §5.3 prompt (2633 bytes), single source of truth for drift check
- `shared/sensei-mode-addenda.js` (new) — reference copy of per-mode addenda (explain/quiz/chat)
- `workers/ai-proxy.js` — `SYSTEM_PROMPT` swapped to §5.3; added `MODE_ADDENDA` + `buildSystemPrompt(mode)`; threaded `mode` through `callGroq`/`callGemini`/`callOpenRouter`/`getAIResponse`; cache key now mode-scoped (no cross-mode pollution); `buildContext` injects `ctx.goals` via `GOAL_LABELS` map (ssw/jlpt/anime/travel/casual — matches onboarding data-goal codes); main handler extracts/validates `ctx.mode` (default `explain`) and echoes it back in response
- `supabase/functions/ai-router/index.ts` — `MASTER_SYSTEM_PROMPT` swapped to §5.3 (byte-identical to Worker, 2633 bytes); TS version of `MODE_ADDENDA` + `buildSystemPrompt`; `callGemini` now takes explicit `systemPrompt` param and filters `role:'system'` before sending to Gemini API (correct channel is `systemInstruction`); main handler parses `mode`/`goals`/`level` from body and builds mode-scoped prompt with learner context inline
- `public/js/ai-tutor.js` — `_buildContext()` reads `localStorage.getItem('nn_goals')` and attaches as `ctx.goals`; pre-Phase-3 users unaffected (empty array → no goals line added)
- `tests/run.js` — new `── Sensei persona drift ──` section with 4 assertions: Worker prompt present & substantial, Edge Function prompt present & substantial, byte-identical diff (with first-diff-byte diagnostic), shared .txt matches Worker. Negative-tested.

**Commits (3 atomic):**
- `781c884` — `feat(sensei): persona v2 canonical prompt — Worker + Edge Function`
- `9223e8c` — `feat(sensei): inject learner goals from onboarding into AI context`
- `ea62fef` — `test(ci): persona drift check — Worker vs Edge Function byte-identical`

**Behavior changes users will notice:**
- Warmer but less saccharine voice (no "Ganbatte! 💪", no "Pertanyaan bagus!")
- Answers lead with the answer, context follows (principle 1 of §5.2)
- Corrections are direct: swap → why → next step (no praise-sandwich)
- Mode actually changes behavior now (addenda, not just hint text)
- Goals from onboarding prioritize example selection

**Known caveats for next agent:**
- Worker deploy: Nugget needs to run `wrangler deploy` in `workers/` dir for the new persona to hit production. Cloudflare Pages auto-deploys `public/` but NOT workers. Remind him.
- Edge Function deploy: `supabase functions deploy ai-router`. Same story — needs manual deploy.
- Cache note: since `cacheKey()` now includes mode, existing KV cache entries are effectively invalidated (different hash). This is intentional — old entries were generated with the v1 generic persona and should not be served anymore.
- Gemini mode filter: `callGemini` in the Edge Function now drops any `role:'system'` messages from the `contents` array before sending, because `systemInstruction` is the correct channel. Previously it was silently double-injecting (system message in messages[] + systemInstruction). This is a bonus fix.

### What's next (recommended order)
1. **Phase 5.5 — AI Content Engine** (Generator → Critic → Validator pipeline, §15). This is the dangerous/high-impact one Nugget explicitly approved. Do it next if he has energy for careful work. Five quality gates in §15.7 must all pass before shipping. User feedback widget §15.6 is required (non-optional).
2. **Phase 4 — Markup refactor** (rewrite each page using design system tokens from Phase 1). Lower-risk but tedious.
3. **Phase 5.75 — Tanya Sensei** (§17): 💬 Tanya buttons on every material card → opens Sensei drawer with card snapshot as `ctx.card`. Persona v2 is now ready for this since mode+context plumbing works.
4. **Phase 1 — Design system tokens** (`public/styles/tokens.css`) if not done — this was the plan's Phase 1 but got reordered. Check with Nugget.

### What was NOT open-to-decide
All decisions from handoff v2.0 and v2.1 still apply. No new decisions were made this session.

### Small followups (non-blocking)
- `DAILY_LIMIT` in Worker is still set to 20 and rate-limiting still runs. Per §5.7 + §16, the "no daily limit" UX change should remove the quota bar from the UI and replace with status strip. That's a separate UI phase (§16), not Phase 5. Don't do it as part of Phase 5.
- Worker response now includes `mode` field. Frontend doesn't currently use it but could for analytics/debugging.

---

## Session update — 2026-04-16 (Agent: Claude Sonnet 4.6, session 2)

### Completed this session
- **Phase 3 DONE**: Onboarding + Settings + About. Commit `1c8365b`. Tests 10700/0.

**Files added/modified:**
- `public/styles/onboarding.css` — onboarding overlay styles (246 lines)
- `public/styles/settings.css` — Settings + About + ⋯ More bottom-sheet styles (389 lines)
- `public/js/pages/onboarding.js` — 3-screen force-through logic; writes `nn_starting_level` + `nn_goals` to localStorage
- `public/js/pages/settings.js` — all settings controls; `window.openMoreSheet` / `closeMoreSheet` / `showToast` exposed
- `public/js/pages/about.js` — cite toggle + version display
- `public/index.html` — onboarding overlay HTML, settings page HTML, about page HTML, ⋯ More bottom-sheet, nav restructure
- `public/js/app.js` — `switchTab` extended for settings/about; three new page inits on DOMContentLoaded
- `public/styles/app.css` — `.tab-btn--hidden` utility added

**Nav change:** "Tema" tab removed from bottom nav. Replaced with "⋯ Lainnya" → opens bottom-sheet (Settings, About, Theme, Install, Login). `themeToggle` ID moved to the sheet's icon div — `theme.js` still works (references same ID to update icon text).

**Key localStorage keys written by Phase 3:**
- `nn_onboarded` = `'1'` → onboarding guard
- `nn_starting_level` → `'beginner'|'kana'|'n5'|'n4plus'|'unknown'`
- `nn_goals` → JSON array, e.g. `["ssw","jlpt"]`
- `nn_theme`, `nn_fontsize`, `nn_furigana`, `nn_romaji`, `nn_card_target`, `nn_reduce_motion` → settings values

### What's next (recommended order)
1. **Phase 5** — Sensei persona v2: replace SYSTEM_PROMPT in `workers/ai-proxy.js` AND `supabase/functions/ai-router/index.ts` with §5.3 canonical prompt. Add CI test that diffs them (drift check). Wire `aiSetMode()` to send `ctx.mode` to Worker. Inject `nn_goals` from localStorage into every Sensei request payload.
2. **Phase 4** — Markup refactor (rewrite each page using design system tokens)
3. **Phase 5.5** — AI Content Engine (Generator → Critic → Validator pipeline) — dangerous, do last

### What was NOT open-to-decide
All decisions from handoff v2.0 still apply. No new decisions were made this session.

---

## Session update — 2026-04-16 (Agent: Claude Sonnet 4.6, session 1)

### Completed this session
- **Phase 0 DONE**: B1 (quiz pills order), B7 (iOS safe-area), B6 (skeleton loading state). Tests 10700/0.
- **Phase 2 DONE**: Materi Hub shipped.
  - `public/styles/layout/shell.css` — responsive 3-breakpoint shell
  - `public/js/pages/materi-hub.js` — two-door hub, JLPT/Buku doors, chapter grids, cross-lens breadcrumbs
  - Irodori grammar lenses now loaded in index.html
  - `hubInit()` wired into app.js after `browseInit()`
  - Tests still 10700/0

### What was NOT open-to-decide
All Phase 0 and Phase 2 decisions match the locked v2.1 plan. No new decisions needed.

---
## READ THIS FIRST (in order)

1. **This file** — know the state and the rules before touching anything
2. **`FRONTEND-OVERHAUL-PLAN.md`** — the authoritative plan (1800+ lines, 20 sections). DON'T skim. At minimum read §0 TL;DR, §5 Sensei persona, §14 Materi Hub, §15 AI Content Engine, §17 Tanya Sensei
3. **`CLAUDE.md`** — existing project conventions. Especially: ID formats, script load order, `corpus/v17-pass15` is off-limits
4. **`MASTER-AUDIT.md`** — existing task list. Note which tasks this overhaul supersedes
5. Only then: touch code

---

## Session context you need

### Who is Nugget?
Non-programmer, Indonesian speaker, based in Bali (planning Japan relocation via SSW visa), building this app for himself + eventually the Indonesian Japanese-learning community. Communicates casually in Indonesian with English + Japanese code-switching. Prefers direct, no-preamble responses. Uses enthusiastic informal expressions ("GAS," "MANTAB," "BOOM") when hyped.

**He can't debug code.** If you break something, he can't fix it. Be careful.

### What was decided in the last session

v2.1 of the plan is LOCKED. Nugget explicitly approved:

| Decision | Answer |
|---|---|
| Desktop first-launch | A (same onboarding as mobile), B parked |
| Sensei column default | Open on desktop |
| Onboarding | Force through all 3 screens |
| Voice | "kamu" (not "Anda") |
| English mode | Later (post-launch) |
| `lang="ja"` CI test | Yes, approved |
| Generator + Critic + Validator for AI quiz | **Approved** — and if quality is high, promote into permanent DB (§15.9) |
| UI copy for "no daily limit" | *"Tanpa batas harian — Sensei nggak bakal bilang 'stop udah habis.' Kalau lagi ramai, jawabannya mungkin lebih pelan."* |
| Vocab DB stays as spine | Yes — AI supplements, doesn't replace |

**Do not re-litigate these.** If Nugget says something that contradicts, ask once to confirm he's changing a decision, don't just silently pivot.

### What's NOT yet decided (open until Nugget weighs in)

- Path order for execution. Previous session offered three paths:
  - **Path A** — Phase 0 cosmetic cleanup (B1-B7 bugs, fast win)
  - **Path B** — Phase 5.5 AI content engine (dangerous, high-impact, needs time)
  - **Path C** — Phase 2 Materi Hub (high-visibility, low-risk, most user-visible UX win)
  - Recommendation given: **C → A → B**
  - Nugget has not yet confirmed a path. Ask when he opens the next session.

---

## Repo layout — what you'll be touching

```
nugget-nihongo/                          ← you clone this
├── FRONTEND-OVERHAUL-PLAN.md            ← the plan — READ THIS
├── docs/
│   └── HANDOFF-frontend-overhaul-v2.md  ← this file
├── CLAUDE.md                            ← existing conventions
├── MASTER-AUDIT.md                      ← existing task list
├── DESIGN_SYSTEM.md                     ← existing design research doc (keep)
├── ARCHITECTURE.md                      ← existing architecture (keep)
├── public/                              ← deploy root, main workspace
│   ├── index.html                       ← 1439 lines, will shrink
│   ├── styles/app.css                   ← 3294 lines, will be split into styles/ tree
│   ├── js/                              ← 40+ modules
│   │   ├── core/
│   │   ├── ai-tutor.js                  ← AI Sensei UI
│   │   └── [feature modules]
│   └── data/                            ← vocab + grammar + book lenses
├── workers/
│   └── ai-proxy.js                      ← Cloudflare Worker with two personas (WILL BE UNIFIED per §5.3)
├── supabase/
│   ├── schema.sql
│   └── functions/ai-router/index.ts     ← duplicate persona (will be synced)
└── tests/
    └── run.js                           ← 10,550 tests passing
```

### Branches

| Branch | Purpose | Safe to touch? |
|---|---|---|
| `main` | Production (auto-deploys to Cloudflare Pages) | ❌ Never push direct |
| `develop` | Main working branch, tests run on push | ✅ Merge target |
| `claude/frontend-overhaul` | **This plan's branch. START HERE.** | ✅ Work here |
| `corpus/v17-pass15` | Research library (736 citations) | ❌ **NEVER TOUCH** — read only |
| `claude/*` | Claude Code auto-created branches | ✅ Normal workflow |

### Data conventions (from `CLAUDE.md` — non-negotiable)

- Vocab ID: `vg-{level}-{5digit}` (e.g., `vg-n5-00001`)
- Grammar ID: `gn{level}-{5digit}` (e.g., `gn5-00001`)
- Data files are **append-only**. Never delete existing entries.
- New entries: `provenance: 'jlpt-corpus'`, `added_v: 'v15'`
- New promoted-from-AI entries (v2.1 addition): `provenance: 'ai-gen-promoted-v1'` + full lineage object (see §15.9)
- No bundler. All JS via `<script>` tags. Load order matters. Check `ARCHITECTURE.md § Script Load Order` before adding scripts.
- Version sync: `public/js/core/version.js` APP_VERSION must match `sw.js` cache key `nihongo-v{version}`. Always bump both.
- Tests: `node tests/run.js` must return 0 FAIL before any commit.

---

## How to pick up in a new session — protocol

### Step 1: Get Nugget to rotate and share fresh credentials

Previous session had **two keys leaked** in chat:
- GitHub PAT (starts with `ghp_tnQK…`) — must be revoked
- OpenRouter key (starts with `sk-or-v1-5bd9217c…`) — must be revoked

**First message to Nugget:** ask if he rotated them. If yes, ask for fresh ones. If no, tell him to rotate first. Do not proceed without fresh tokens.

### Step 2: Clone + switch to the overhaul branch

```bash
cd /home/claude
git clone https://{PAT}@github.com/nuggetenak/nugget-nihongo.git
cd nugget-nihongo
git checkout claude/frontend-overhaul
git config user.email "claude@anthropic.com"
git config user.name "Claude (Senior FE)"
```

### Step 3: Verify state

```bash
# Latest commits should be from the plan authoring session
git log --oneline -5

# Expected to see:
#   f72bd74 docs(plan): v2 — Materi hub, Tanya Sensei, AI content engine, multi-provider cascade
#   52ebf8f docs: add FRONTEND-OVERHAUL-PLAN.md (senior FE audit + Sensei persona v2)
#   + any v2.1 commits (revision log update, handoff doc creation)

# Confirm tests still pass
node tests/run.js 2>&1 | tail -5
```

### Step 4: Ask Nugget which phase to start

Default recommendation if he says "you decide": **Phase 0 first** (cosmetic cleanup, ½ day, zero risk, instantly visible improvement). Then Phase 2a (Materi Hub scaffolding).

---

## Phase-by-phase starter guide

When Nugget picks a phase, here's the minimum viable starting point for each:

### Phase 0 — Cosmetic cleanup (½ day, start here by default)

Fixes B1–B7 in §1.3 of the plan. All in `index.html` + ~1 CSS rule. Concrete tasks:

1. **B1** — Level pill order: find `<div class="level-pills">` in `index.html` line ~155. Current order: Semua, N5, N4, N3, N2, N1 — **this is already correct**. But there's a duplicate pill row later in `#vocabBrowsePanel` (~line 395) that needs verification. Double-check both match N5→N1 order.
2. **B2** — Header `<h1>Nugget <span lang="ja">日本語</span></h1>` — actually this was already updated in `develop`. Previous session noted `<h1>日本語総まとめ</h1>` but that may already be fixed. **Verify first** with `grep "<h1>" public/index.html` before changing.
3. **B3** — 40+ cat chips: already accordion-grouped into 8 `<div class="cat-group">` blocks. Just verify mobile-default-collapsed state works. If not, add `.cat-group-body { display:none }` + `.cat-group.open .cat-group-body { display:flex }` + wire `toggleCatGroup()`.
4. **B4** — Auth button `style="display:none"` on `#authHeaderBtn` — remove the inline style, let JS handle *state* not *visibility*. Line ~71 of `index.html`.
5. **B5** — Doc-only fix. Update `DESIGN_SYSTEM.md` ref to Sensei emoji (`✨` not `🤖`).
6. **B6** — Skeleton state when grammar renders. Add `<div class="sk-card">` template to card-wrap render functions. Full CSS spec in plan §4.6.
7. **B7** — iOS safe-area for `#installStrip`. Add `padding-bottom: max(0.75rem, env(safe-area-inset-bottom))` to its CSS.

Commit per-bug (B1–B7 = 7 commits) or as one "chore: Phase 0 cosmetic cleanup" if he prefers atomic. Ask.

### Phase 1 — Design System v2 (2-3 days)

Start with `public/styles/tokens.css`. Copy the block from plan §2.1 verbatim. Link it in `index.html` BEFORE `app.css`:

```html
<link rel="stylesheet" href="./styles/tokens.css">
<link rel="stylesheet" href="./styles/app.css">
```

Don't split `app.css` yet — just introduce tokens. Phase 1 is about having a source of truth; Phase 1b is about rewiring existing CSS to use it.

Then add the global focus-visible rule (plan §2.5) and reduced-motion guard (plan §2.4). That's ~20 lines. These two are P0 accessibility fixes.

Last: add the `lang="ja"` lint to `tests/run.js` per plan §2.5. Basic grep-based test: flag any Unicode CJK character in HTML that isn't inside a `lang="ja"` context.

### Phase 2 — Responsive + Materi Hub (4-5 days, the big one)

Hardest phase. Do it in order:

**2a (1 day)** — Responsive shell. Build `public/styles/layout/shell.css`. Three breakpoints only to start (mobile ≤767, tablet 768-959, desktop ≥960). Existing mobile layout keeps working; desktop grid is additive.

**2b (1 day)** — Materi Hub landing page. New file `public/js/pages/materi-hub.js` — factory function that renders the two-door UI per plan §14.2. Hash route: `#materi` now shows hub, `#materi/semua` shows the old flat view. Don't break existing deep-links (e.g., `#materi/jlpt/n4`).

**2c (1 day)** — JLPT door + Buku door sub-pages. JLPT door is basically the existing browse filtered by level. Buku door needs new: `<BukuSeriesGrid>` (Soumatome N3, Soumatome N4, Irodori A1/A2-1/A2-2 only — Minna empty, Freeway sparse). Pull lens data from `public/data/books/`.

**2d (1 day)** — Cross-lens breadcrumbs on card detail. When card detail opens, query all lens files for this card's ID. Show lens memberships per plan §14.7. This is the magic moment that makes the hub feel connected.

**2e (½-1 day)** — Per-book progress bars. Derive from existing FSRS state filtered to that lens's card IDs. See plan §14.6.

### Phase 3, 4, 5, 5.5, 5.75, 6, 7, 8

See plan §9 roadmap. Each phase has file-level specs elsewhere in the plan. Follow the plan; don't improvise architecture.

---

## AI Sensei work — critical rules

When the time comes to touch Sensei (Phase 5, 5.5, 5.75):

### The persona (§5.3) is canonical

Replace BOTH:
- `workers/ai-proxy.js` → `SYSTEM_PROMPT` constant
- `supabase/functions/ai-router/index.ts` → `MASTER_SYSTEM_PROMPT` constant

…with the §5.3 Indonesian system prompt, verbatim. After this, add a `tests/run.js` check that diffs the two files' prompts and fails CI if they drift.

### Mode handling (§5.4)

Current `aiSetMode()` in `public/js/ai-tutor.js` only changes hint text. Must be extended to:
1. Send `ctx.mode` to Worker in request payload
2. Worker appends mode-specific addendum to system prompt per §5.4

This is a behavior change the model will actually reflect in outputs. Regression-test with fixtures.

### AI content generation (§15) — DO NOT SKIP THE CRITIC

Non-negotiable per Nugget's approval:
- Every generated quiz question goes through Generator → Critic → Structural Validator
- Critic must be a DIFFERENT provider than Generator (cross-provider validation)
- Five launch quality gates in §15.7 must all pass before shipping to users
- User feedback widget (§15.6) is required — not optional polish

And the new addition (§15.9): high-quality items get promoted to permanent DB via human-reviewed admin panel. Design the lineage tracking from day 1 even if the admin UI ships later.

### "No daily limit" copy (§5.7 + §16)

Remove `.ai-quota-bar` from UI. Use Nugget's approved line:

> "Tanpa batas harian — Sensei nggak bakal bilang 'stop udah habis.' Kalau lagi ramai, jawabannya mungkin lebih pelan."

As a short status strip. Replace quota tracking in `ai-tutor.js` with simple "ready" state.

Per-provider rate limits (§16.4) stay in the Worker but are NEVER shown to users. Per-user soft cap only triggers at abuse levels (>100/hr) with a friendly decelerator, not a block.

---

## Things that will trip you up

### 1. The research branch is poisoned fruit

`corpus/v17-pass15` has incredible research (754-entry bibliography, 16 completed sections, the curriculum blueprint). You will be tempted to cite from it. **Don't check it out and don't modify it.** It's owned by a different process. Read via GitHub web UI if you need to reference a section, then cite by section number in your work.

### 2. Claude Code vs claude.ai timeouts

Per MASTER-AUDIT: content generation (vocab entries, grammar descriptions, lens population) **times out in Claude Code**. Do those in claude.ai sessions. Claude Code is for: code changes, git ops, tests, wrangler deploys.

If Nugget asks you (claude.ai) to generate content, that's appropriate. If he asks you to commit code, you can either:
- Do it yourself via bash tool (you have git access if he shares a PAT)
- Tell him to send the change to Claude Code for commit

### 3. The 40+ JS modules have implicit load-order dependencies

Don't reorder `<script>` tags in `index.html` without checking `ARCHITECTURE.md § Script Load Order`. Some modules set `window.*` globals that later modules consume. Breaking this order causes silent `ReferenceError` on page load — hard to debug, easy to avoid.

Specifically: `local-state.js` → `core/*` → `fsrs-math.js` → `fsrs-engine.js` → `gamification.js` → `streak.js` (must be AFTER gamification) → Supabase CDN → `supabase-client.js` → `ai-*.js` → features → `app.js` (last).

### 4. Tests fast-fail on data changes

`node tests/run.js` validates: ID format, required fields, no duplicates, provenance tags. If you add an AI-promoted item without full lineage metadata (per §15.9), tests will fail. Lineage is required from day 1 of promotion pipeline.

### 5. Deploy target is Cloudflare Pages (not GitHub Pages)

Despite `homepage` in `package.json` pointing to github.io, actual production is Cloudflare Pages per MASTER-AUDIT. Deploy via `wrangler pages deploy public` or push to main (deploy.yml handles it). Don't blindly trust the README.

### 6. The Materi hub hash-routing

Existing router is `public/js/core/router.js` — read it. It's minimal (~25 lines). Adding `#materi/jlpt/n4` style nested routes requires a tiny rewrite, not a framework. Keep it boring.

---

## Key contacts / references

| Need | Where |
|---|---|
| What is the AI Sensei persona? | `FRONTEND-OVERHAUL-PLAN.md` §5 — THE canonical source |
| What does a unified card look like? | §14.4 |
| How does Tanya Sensei work? | §17 |
| What providers does AI use? | §16.2 |
| How does AI content get promoted to DB? | §15.9 |
| What are the launch quality gates? | §8.3 + §15.7 |
| Script load order? | `ARCHITECTURE.md` |
| Data file conventions? | `CLAUDE.md` + `public/data/_schema.md` |
| Existing open tasks? | `MASTER-AUDIT.md` |
| Research citations? | `corpus/v17-pass15` branch (read-only) |

---

## What to say to Nugget in your first response

Suggested opening (adapt tone to match his energy):

> Oke, sesi baru. Udah baca handoff + plan v2.1. Sebelum mulai — 2 hal:
>
> 1. GitHub PAT + OpenRouter key dari sesi kemarin udah di-rotate? Kalau belum, rotate dulu, terus kasih yang baru.
> 2. Mau mulai dari fase mana? Rekomendasi kemarin: Phase 0 dulu (½ hari, beres-beres kosmetik), terus Phase 2 (Materi Hub — fase paling visible). Phase 5.5 (AI content engine) ditaruh belakangan karena butuh waktu + hati-hati.
>
> Mau ikutin rekomendasi itu, atau kamu punya prioritas lain?

Then wait for his answer. Don't front-load the plan — he already approved it.

---

## Token/context budget hints

- `FRONTEND-OVERHAUL-PLAN.md` is ~60k tokens. Don't `cat` the whole thing. Use `view` with `view_range` or `grep -n` for targeted sections.
- When reading Nugget's repo, prefer `ls -la` + targeted `sed -n 'START,ENDp'` over full file reads. Most files are 200-500 lines.
- If you burn context early, start a fresh session with this handoff doc as first input.

---

## Final note from the previous session

Nugget finished the last session with "see you next week" — he's out of weekly usage quota on claude.ai. Don't expect rapid responses if you're picking up mid-week. Plan work that can be kicked off with minimal back-and-forth.

Good luck. The plan is solid. Don't overthink, don't under-test. Ship.

— Claude Opus 4.6, 16 April 2026
