-- ══════════════════════════════════════════════════════
--  Nugget Nihongo — Supabase Schema
--  Version: v1.1 (8 April 2026)
--  Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
--  Safe to re-run: all statements are idempotent.
--
--  Tables: profiles, srs_cards, course_progress, achievements,
--          review_history, error_reports, user_settings
--  All user data tables have RLS (Row Level Security) enabled.
-- ══════════════════════════════════════════════════════

-- ── PROFILES ────────────────────────────────────────────
-- Auto-created on signup via trigger
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT,
  avatar_url    TEXT,
  current_level TEXT DEFAULT 'n5' CHECK (current_level IN ('n5','n4','n3','n2','n1','beyond')),
  xp            INTEGER DEFAULT 0,
  streak_days   INTEGER DEFAULT 0,
  streak_last   DATE,
  learning_dna  JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Add learning_dna if table pre-existed without it (safe no-op if already present)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS learning_dna JSONB DEFAULT '{}';

-- Indexes (IF NOT EXISTS makes these safe to re-run)
CREATE INDEX IF NOT EXISTS idx_profiles_learning_dna ON public.profiles USING GIN (learning_dna);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ── SRS CARDS ───────────────────────────────────────────
-- FSRS card state per user per item
CREATE TABLE IF NOT EXISTS public.srs_cards (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type     TEXT NOT NULL CHECK (item_type IN ('vocab','grammar','kanji')),
  item_id       TEXT NOT NULL,  -- e.g. 'vg-n5-00001' or 'gn5-00001'
  -- FSRS fields
  stability     REAL DEFAULT 0,
  difficulty    REAL DEFAULT 0,
  elapsed_days  INTEGER DEFAULT 0,
  scheduled_days INTEGER DEFAULT 0,
  reps          INTEGER DEFAULT 0,
  lapses        INTEGER DEFAULT 0,
  state         SMALLINT DEFAULT 0, -- 0=New, 1=Learning, 2=Review, 3=Relearning
  due           TIMESTAMPTZ DEFAULT NOW(),
  last_review   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_srs_user_due   ON public.srs_cards(user_id, due);
CREATE INDEX IF NOT EXISTS idx_srs_user_state ON public.srs_cards(user_id, state);

ALTER TABLE public.srs_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "srs_select_own" ON public.srs_cards;
CREATE POLICY "srs_select_own" ON public.srs_cards
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "srs_insert_own" ON public.srs_cards;
CREATE POLICY "srs_insert_own" ON public.srs_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "srs_update_own" ON public.srs_cards;
CREATE POLICY "srs_update_own" ON public.srs_cards
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "srs_delete_own" ON public.srs_cards;
CREATE POLICY "srs_delete_own" ON public.srs_cards
  FOR DELETE USING (auth.uid() = user_id);

-- ── COURSE PROGRESS ─────────────────────────────────────
-- Tracks which tracks/books a user is following and how far they are
CREATE TABLE IF NOT EXISTS public.course_progress (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  track_id      TEXT NOT NULL,  -- e.g. 'trk-jlpt-n5', 'trk-book-sm-n3'
  current_index INTEGER DEFAULT 0,
  completed     BOOLEAN DEFAULT FALSE,
  started_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "course_select_own" ON public.course_progress;
CREATE POLICY "course_select_own" ON public.course_progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "course_insert_own" ON public.course_progress;
CREATE POLICY "course_insert_own" ON public.course_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "course_update_own" ON public.course_progress;
CREATE POLICY "course_update_own" ON public.course_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- ── ACHIEVEMENTS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.achievements (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement   TEXT NOT NULL,  -- e.g. 'first_review', 'streak_7', 'n5_complete'
  earned_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ach_select_own" ON public.achievements;
CREATE POLICY "ach_select_own" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ach_insert_own" ON public.achievements;
CREATE POLICY "ach_insert_own" ON public.achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── REVIEW HISTORY ──────────────────────────────────────
-- Immutable log of every review action (for analytics)
CREATE TABLE IF NOT EXISTS public.review_history (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type     TEXT NOT NULL,
  item_id       TEXT NOT NULL,
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 4), -- FSRS: 1=Again 2=Hard 3=Good 4=Easy
  response_ms   INTEGER,  -- how long user took to answer
  reviewed_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_review_user_time ON public.review_history(user_id, reviewed_at DESC);

ALTER TABLE public.review_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "review_select_own" ON public.review_history;
CREATE POLICY "review_select_own" ON public.review_history
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "review_insert_own" ON public.review_history;
CREATE POLICY "review_insert_own" ON public.review_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── ERROR REPORTS ───────────────────────────────────────
-- Users can report content errors (wrong translation, typo, etc.)
CREATE TABLE IF NOT EXISTS public.error_reports (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  item_type     TEXT NOT NULL,
  item_id       TEXT NOT NULL,
  field         TEXT,  -- which field has the error (e.g. 'meaning_id', 'examples')
  description   TEXT NOT NULL,
  status        TEXT DEFAULT 'open' CHECK (status IN ('open','reviewed','fixed','rejected')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.error_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "error_insert_any" ON public.error_reports;
CREATE POLICY "error_insert_any" ON public.error_reports
  FOR INSERT WITH CHECK (true);  -- anyone can report

DROP POLICY IF EXISTS "error_select_own" ON public.error_reports;
CREATE POLICY "error_select_own" ON public.error_reports
  FOR SELECT USING (auth.uid() = user_id);

-- ── USER SETTINGS ───────────────────────────────────────
-- Client-side preferences synced to cloud
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme            TEXT DEFAULT 'system' CHECK (theme IN ('light','dark','system')),
  daily_goal       INTEGER DEFAULT 20,
  preferred_quiz   TEXT DEFAULT 'mixed',
  show_romaji      BOOLEAN DEFAULT TRUE,
  auto_play_audio  BOOLEAN DEFAULT FALSE,
  ui_language      TEXT DEFAULT 'id' CHECK (ui_language IN ('id','en')),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_select_own" ON public.user_settings;
CREATE POLICY "settings_select_own" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "settings_insert_own" ON public.user_settings;
CREATE POLICY "settings_insert_own" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "settings_update_own" ON public.user_settings;
CREATE POLICY "settings_update_own" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- ── AUTO-CREATE PROFILE + SETTINGS ON SIGNUP ────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));

  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── UPDATED_AT TRIGGERS ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS srs_updated_at ON public.srs_cards;
CREATE TRIGGER srs_updated_at BEFORE UPDATE ON public.srs_cards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS course_updated_at ON public.course_progress;
CREATE TRIGGER course_updated_at BEFORE UPDATE ON public.course_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS settings_updated_at ON public.user_settings;
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ── BOOK GRAMMAR ENTRIES ─────────────────────────────────
-- Book-faithful grammar data (Soumatome, Irodori, Minna series)
-- source_verified = false until checked against physical book
CREATE TABLE IF NOT EXISTS public.book_grammar (
  id              TEXT PRIMARY KEY,        -- e.g. 'sm-n5-001', 'ir-a1-001'
  book            TEXT NOT NULL,           -- 'soumatome-n5', 'irodori-a1', etc.
  level           TEXT,                    -- 'n5','n4','n3','n2','n1','a1','a2'
  week            SMALLINT,                -- week number in book (Soumatome)
  day             SMALLINT,                -- day within week
  seq             SMALLINT,                -- sequence within day
  unit            TEXT,                    -- unit/topic (Irodori/Minna)
  pattern         TEXT NOT NULL,           -- '〜てから'
  form            TEXT,                    -- 'V てから' (with conjugation info)
  meaning_id      TEXT,                    -- Indonesian meaning (short)
  meaning_en      TEXT,                    -- English meaning (short)
  desc_id         TEXT,                    -- Indonesian full explanation
  examples        JSONB   DEFAULT '[]',    -- [{jp:'...', id:'...'}]
  quiz_items      JSONB   DEFAULT '[]',    -- exact quiz items from book
  global_id       TEXT,                    -- cross-ref to grammar-n*.js global DB
  source_verified BOOLEAN DEFAULT FALSE,   -- true = confirmed against physical book
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_book_grammar_book  ON public.book_grammar(book);
CREATE INDEX IF NOT EXISTS idx_book_grammar_level ON public.book_grammar(level);
CREATE INDEX IF NOT EXISTS idx_book_grammar_week  ON public.book_grammar(book, week, day, seq);

-- ── BOOK QUIZ ITEMS ──────────────────────────────────────
-- Exact quiz/practice questions from each textbook
CREATE TABLE IF NOT EXISTS public.book_quiz (
  id              TEXT PRIMARY KEY,        -- e.g. 'sm-n3-q001'
  book            TEXT NOT NULL,
  grammar_id      TEXT REFERENCES public.book_grammar(id) ON DELETE SET NULL,
  week            SMALLINT,
  day             SMALLINT,
  question        TEXT NOT NULL,
  options         JSONB,                   -- [{text:'...', correct:true}]
  answer          TEXT NOT NULL,
  explanation_id  TEXT,                    -- Indonesian explanation
  type            TEXT DEFAULT 'multiple_choice',
  source_verified BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_book_quiz_book       ON public.book_quiz(book);
CREATE INDEX IF NOT EXISTS idx_book_quiz_grammar_id ON public.book_quiz(grammar_id);

DROP TRIGGER IF EXISTS book_grammar_updated_at ON public.book_grammar;
CREATE TRIGGER book_grammar_updated_at BEFORE UPDATE ON public.book_grammar
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ── AI FEEDBACK (Phase 5.5b §15.6) ──────────────────────────────
-- Stores user feedback on AI-generated content (quiz questions, examples,
-- chat replies). Flagged items are immediately quarantined client-side;
-- this table is the long-term quality audit trail.
-- Anonymous users write via their nn_user_id (random uuid from localStorage).
CREATE TABLE IF NOT EXISTS public.ai_feedback (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         TEXT NOT NULL,            -- nn_user_id from localStorage (may be anon)
  ai_item_id      TEXT NOT NULL,            -- lineage_id from item.lineage.lineage_id
  item_type       TEXT NOT NULL,            -- 'quiz_question' | 'example_sentence' | 'chat_reply'
  verdict         TEXT NOT NULL CHECK (verdict IN ('thumbs_up','thumbs_down','edit')),
  -- reason codes (for thumbs_down) — array of strings
  -- e.g. ['grammar_wrong','out_of_level','unnatural']
  reason_codes    TEXT[]        DEFAULT '{}',
  reason_other    TEXT,                     -- free text for "Lainnya"
  correction      TEXT,                     -- user's corrected version (for edit verdict)
  -- lineage snapshot — enough to trace back to provider + model
  generator_provider   TEXT,
  generator_model      TEXT,
  critic_provider      TEXT,
  critic_verdict       TEXT,
  prompt_version       TEXT,
  -- quarantine flag: set client-side immediately, confirmed here on sync
  quarantined     BOOLEAN       DEFAULT FALSE,
  created_at      TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_feedback_item_id   ON public.ai_feedback(ai_item_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_user_id   ON public.ai_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_verdict   ON public.ai_feedback(verdict);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_created   ON public.ai_feedback(created_at DESC);

-- RLS: anyone can INSERT (anonymous users included via anon key).
-- Only service_role can SELECT all rows (for admin review).
-- Users can SELECT their own rows.
ALTER TABLE public.ai_feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS ai_feedback_insert  ON public.ai_feedback;
DROP POLICY IF EXISTS ai_feedback_own_select ON public.ai_feedback;
CREATE POLICY ai_feedback_insert
  ON public.ai_feedback FOR INSERT
  WITH CHECK (true);   -- allow all inserts (anon + authed)
CREATE POLICY ai_feedback_own_select
  ON public.ai_feedback FOR SELECT
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      OR user_id = current_setting('request.headers', true)::json->>'x-user-id');

-- ── AI QUIZ CACHE (Phase 5.5b §15.4) ───────────────────────────
-- Shared server-side cache for generated quiz batches.
-- Key: target_id + level + type + prompt_version (normalized).
-- Avoids re-generating the same batch for every user.
-- TTL enforced by expires_at; stale rows cleaned by a weekly cron.
CREATE TABLE IF NOT EXISTS public.ai_quiz_cache (
  cache_key       TEXT PRIMARY KEY,        -- sha256 of (target_id|level|type|prompt_version)
  target_id       TEXT NOT NULL,
  level           TEXT NOT NULL,
  quiz_type       TEXT NOT NULL,
  questions       JSONB NOT NULL,          -- array of validated quiz questions with lineage
  question_count  SMALLINT NOT NULL,
  prompt_version  TEXT NOT NULL,
  generator_provider TEXT,
  critic_provider TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ NOT NULL     -- quiz cache: 7 days per §15.4
);

CREATE INDEX IF NOT EXISTS idx_ai_quiz_cache_target ON public.ai_quiz_cache(target_id, level);
CREATE INDEX IF NOT EXISTS idx_ai_quiz_cache_expiry ON public.ai_quiz_cache(expires_at);

-- RLS: public read (cache is shared), service_role write only
ALTER TABLE public.ai_quiz_cache ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS ai_quiz_cache_select ON public.ai_quiz_cache;
CREATE POLICY ai_quiz_cache_select
  ON public.ai_quiz_cache FOR SELECT
  USING (expires_at > NOW());

-- ── AI PROMOTION QUEUE (Phase 5.5c §15.9) ────────────────────────
-- Aggregates serve counts + feedback signals per ai_item_id to surface
-- promotion candidates. Populated via a Supabase DB function that
-- materializes from ai_feedback (run on-demand or nightly).
-- Nugget reviews candidates in /admin/promote.html.
CREATE TABLE IF NOT EXISTS public.ai_promotion_queue (
  ai_item_id          TEXT PRIMARY KEY,   -- lineage_id from ai-content-engine
  item_type           TEXT NOT NULL,      -- 'quiz_question'|'example_sentence'|'chat_reply'
  -- the full question/content payload stored as JSONB
  content             JSONB NOT NULL,
  -- lineage snapshot (from first feedback row seen for this item)
  generator_provider  TEXT,
  generator_model     TEXT,
  critic_provider     TEXT,
  critic_verdict      TEXT,
  prompt_version      TEXT,
  -- aggregated signal
  serve_count         INTEGER DEFAULT 0,
  thumbs_up           INTEGER DEFAULT 0,
  thumbs_down         INTEGER DEFAULT 0,
  edits_submitted     INTEGER DEFAULT 0,
  -- approval_ratio computed in queries: thumbs_up::REAL / NULLIF(thumbs_up+thumbs_down,0)
  -- promotion state
  -- 'candidate'  → meets §15.9 criteria (≥10 serves, ≥0.85 ratio, ≥30 days)
  -- 'promoted'   → human clicked Promote
  -- 'rejected'   → human clicked Reject & Blocklist
  -- 'pending'    → gathering signal, not yet a candidate
  status              TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','candidate','promoted','rejected')),
  quarantined         BOOLEAN DEFAULT FALSE,  -- true if any 👎 flag ever
  first_seen_at       TIMESTAMPTZ DEFAULT NOW(),
  last_feedback_at    TIMESTAMPTZ,
  promoted_at         TIMESTAMPTZ,
  promoted_by         TEXT,               -- 'nugget' or reviewer name
  rejected_at         TIMESTAMPTZ,
  -- the final item as it will appear in data/ files (set at promotion time)
  promoted_payload    JSONB,
  promotion_target    TEXT  -- e.g. 'public/data/quiz-bank/n4.js'
);

CREATE INDEX IF NOT EXISTS idx_promo_status ON public.ai_promotion_queue(status);
CREATE INDEX IF NOT EXISTS idx_promo_serves    ON public.ai_promotion_queue(serve_count DESC);
CREATE INDEX IF NOT EXISTS idx_promo_type      ON public.ai_promotion_queue(item_type);
CREATE INDEX IF NOT EXISTS idx_promo_first     ON public.ai_promotion_queue(first_seen_at);

-- RLS: service_role only for writes. Authenticated admin users for reads.
ALTER TABLE public.ai_promotion_queue ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS ai_promo_admin_all ON public.ai_promotion_queue;
CREATE POLICY ai_promo_admin_all
  ON public.ai_promotion_queue FOR ALL
  USING (auth.role() = 'service_role' OR auth.jwt() ->> 'role' = 'admin');

-- ── FUNCTION: upsert_promotion_signal ────────────────────────────
-- Called by a trigger on ai_feedback (or manually) to keep the queue
-- aggregates up to date. Upserts a row per ai_item_id.
CREATE OR REPLACE FUNCTION public.upsert_promotion_signal(
  p_ai_item_id        TEXT,
  p_item_type         TEXT,
  p_content           JSONB,
  p_verdict           TEXT,   -- 'thumbs_up'|'thumbs_down'|'edit'
  p_generator_provider TEXT DEFAULT NULL,
  p_generator_model   TEXT DEFAULT NULL,
  p_critic_provider   TEXT DEFAULT NULL,
  p_critic_verdict    TEXT DEFAULT NULL,
  p_prompt_version    TEXT DEFAULT NULL
) RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.ai_promotion_queue (
    ai_item_id, item_type, content,
    generator_provider, generator_model,
    critic_provider, critic_verdict, prompt_version,
    thumbs_up, thumbs_down, edits_submitted,
    serve_count, last_feedback_at
  ) VALUES (
    p_ai_item_id, p_item_type, COALESCE(p_content, '{}'::jsonb),
    p_generator_provider, p_generator_model,
    p_critic_provider, p_critic_verdict, p_prompt_version,
    CASE WHEN p_verdict = 'thumbs_up'   THEN 1 ELSE 0 END,
    CASE WHEN p_verdict = 'thumbs_down' THEN 1 ELSE 0 END,
    CASE WHEN p_verdict = 'edit'        THEN 1 ELSE 0 END,
    1, NOW()
  )
  ON CONFLICT (ai_item_id) DO UPDATE SET
    thumbs_up        = ai_promotion_queue.thumbs_up
                       + CASE WHEN p_verdict = 'thumbs_up'   THEN 1 ELSE 0 END,
    thumbs_down      = ai_promotion_queue.thumbs_down
                       + CASE WHEN p_verdict = 'thumbs_down' THEN 1 ELSE 0 END,
    edits_submitted  = ai_promotion_queue.edits_submitted
                       + CASE WHEN p_verdict = 'edit'        THEN 1 ELSE 0 END,
    serve_count      = ai_promotion_queue.serve_count + 1,
    quarantined      = ai_promotion_queue.quarantined
                       OR (p_verdict IN ('thumbs_down', 'edit')),
    last_feedback_at = NOW(),
    status = CASE
      WHEN ai_promotion_queue.status IN ('promoted','rejected') THEN ai_promotion_queue.status
      WHEN (ai_promotion_queue.serve_count + 1) >= 10
        AND ai_promotion_queue.thumbs_down = 0
        AND (ai_promotion_queue.thumbs_up + 1)::REAL
            / NULLIF((ai_promotion_queue.thumbs_up + 1 + ai_promotion_queue.thumbs_down), 0) >= 0.85
        AND NOW() - ai_promotion_queue.first_seen_at >= INTERVAL '30 days'
        AND p_verdict != 'thumbs_down'
      THEN 'candidate'
      ELSE 'pending'
    END;
END;
$$;
