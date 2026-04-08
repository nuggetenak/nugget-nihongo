-- ══════════════════════════════════════════════════════
--  Nugget Nihongo — Supabase Schema
--  Version: v1.0 (2 April 2026)
--  Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
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
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
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

CREATE INDEX idx_srs_user_due ON public.srs_cards(user_id, due);
CREATE INDEX idx_srs_user_state ON public.srs_cards(user_id, state);

ALTER TABLE public.srs_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "srs_select_own" ON public.srs_cards
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "srs_insert_own" ON public.srs_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "srs_update_own" ON public.srs_cards
  FOR UPDATE USING (auth.uid() = user_id);
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

CREATE POLICY "course_select_own" ON public.course_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "course_insert_own" ON public.course_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
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

CREATE POLICY "ach_select_own" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);
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

CREATE INDEX idx_review_user_time ON public.review_history(user_id, reviewed_at DESC);

ALTER TABLE public.review_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "review_select_own" ON public.review_history
  FOR SELECT USING (auth.uid() = user_id);
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

CREATE POLICY "error_insert_any" ON public.error_reports
  FOR INSERT WITH CHECK (true);  -- anyone can report
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

CREATE POLICY "settings_select_own" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "settings_insert_own" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
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

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER srs_updated_at BEFORE UPDATE ON public.srs_cards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER course_updated_at BEFORE UPDATE ON public.course_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ── learning_dna — adaptive mistake memory (v15.6.0) ──────────────
-- Tracks per-user mistake patterns for AI context injection.
-- Blueprint basis: Gap 4 (Adaptive Learning beyond SRS), Study 2 (§8.11.2)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS learning_dna JSONB
  DEFAULT '{"mistakes":[],"error_cats":{},"reviewed_at":null}'::jsonb;
