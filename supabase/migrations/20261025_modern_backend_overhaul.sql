-- ══════════════════════════════════════════════════════════════════
--  20261025_modern_backend_overhaul.sql
--  Supabase Free-Tier Maximum Capacity Overhaul (Project: xipvhxorvwpvfokauboy)
--  Incorporating Official Supabase Best Practices (pgvector, RLS Cache, Auto-Prune)
-- ══════════════════════════════════════════════════════════════════

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

-- 2. SECURITY HARDENING (Revoke RPC from public, Set search_paths)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

ALTER FUNCTION public.handle_new_user() SET search_path = public, auth;
ALTER FUNCTION public.rls_auto_enable() SET search_path = public, pg_catalog;
ALTER FUNCTION public.update_updated_at() SET search_path = public;
ALTER FUNCTION public.upsert_promotion_signal(text, text, jsonb, text, text, text, text, text, text) SET search_path = public;

-- 3. COVERING INDEXES FOR FOREIGN KEYS (Performance Advisor Remediation)
CREATE INDEX IF NOT EXISTS idx_error_reports_user_id ON public.error_reports(user_id);

-- 4. MISSING RLS POLICIES (Security Advisor Remediation)
DROP POLICY IF EXISTS "book_grammar_public_read" ON public.book_grammar;
CREATE POLICY "book_grammar_public_read" ON public.book_grammar FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "book_quiz_public_read" ON public.book_quiz;
CREATE POLICY "book_quiz_public_read" ON public.book_quiz FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "ai_semantic_cache_select" ON public.ai_semantic_cache;
CREATE POLICY "ai_semantic_cache_select" ON public.ai_semantic_cache FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "ai_semantic_cache_insert" ON public.ai_semantic_cache;
CREATE POLICY "ai_semantic_cache_insert" ON public.ai_semantic_cache FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "ai_quiz_cache_insert" ON public.ai_quiz_cache;
CREATE POLICY "ai_quiz_cache_insert" ON public.ai_quiz_cache FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 5. RLS INITIALIZATION PLAN CACHING (Performance Advisor: 22 Policies upgraded from auth.uid() to (SELECT auth.uid()))
ALTER POLICY "profiles_select_own" ON public.profiles USING ((SELECT auth.uid()) = id);
ALTER POLICY "profiles_insert_own" ON public.profiles WITH CHECK ((SELECT auth.uid()) = id);
ALTER POLICY "profiles_update_own" ON public.profiles USING ((SELECT auth.uid()) = id);

ALTER POLICY "srs_select_own" ON public.srs_cards USING ((SELECT auth.uid()) = user_id);
ALTER POLICY "srs_insert_own" ON public.srs_cards WITH CHECK ((SELECT auth.uid()) = user_id);
ALTER POLICY "srs_update_own" ON public.srs_cards USING ((SELECT auth.uid()) = user_id);
ALTER POLICY "srs_delete_own" ON public.srs_cards USING ((SELECT auth.uid()) = user_id);

ALTER POLICY "course_select_own" ON public.course_progress USING ((SELECT auth.uid()) = user_id);
ALTER POLICY "course_insert_own" ON public.course_progress WITH CHECK ((SELECT auth.uid()) = user_id);
ALTER POLICY "course_update_own" ON public.course_progress USING ((SELECT auth.uid()) = user_id);

ALTER POLICY "ach_select_own" ON public.achievements USING ((SELECT auth.uid()) = user_id);
ALTER POLICY "ach_insert_own" ON public.achievements WITH CHECK ((SELECT auth.uid()) = user_id);

ALTER POLICY "review_select_own" ON public.review_history USING ((SELECT auth.uid()) = user_id);
ALTER POLICY "review_insert_own" ON public.review_history WITH CHECK ((SELECT auth.uid()) = user_id);

ALTER POLICY "error_select_own" ON public.error_reports USING ((SELECT auth.uid()) = user_id);

ALTER POLICY "settings_select_own" ON public.user_settings USING ((SELECT auth.uid()) = user_id);
ALTER POLICY "settings_insert_own" ON public.user_settings WITH CHECK ((SELECT auth.uid()) = user_id);
ALTER POLICY "settings_update_own" ON public.user_settings USING ((SELECT auth.uid()) = user_id);

ALTER POLICY "ai_promo_admin_all" ON public.ai_promotion_queue
  USING (((SELECT auth.role()) = 'service_role'::text) OR (((SELECT auth.jwt()) ->> 'role'::text) = 'admin'::text));

ALTER POLICY "ai_feedback_own_select" ON public.ai_feedback
  USING (
    (user_id = (((SELECT current_setting('request.jwt.claims'::text, true)))::json ->> 'sub'::text))
    OR (user_id = (((SELECT current_setting('request.headers'::text, true)))::json ->> 'x-user-id'::text))
  );

ALTER POLICY "fsrs_atoms_select_own" ON public.fsrs_atoms TO service_role;
ALTER POLICY "fsrs_atoms_all_own" ON public.fsrs_atoms USING ((SELECT auth.uid()) = user_id);

-- 6. KEEP-ALIVE HEARTBEAT TABLE (Immunity from 7-Day Inactivity Auto-Pause)
CREATE TABLE IF NOT EXISTS public.health_heartbeats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ping_source TEXT NOT NULL,          -- 'github_actions', 'client_pwa', 'live_test_script'
  pinged_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.health_heartbeats ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.health_heartbeats TO anon, authenticated;

DROP POLICY IF EXISTS "heartbeat_insert_anon" ON public.health_heartbeats;
CREATE POLICY "heartbeat_insert_anon" ON public.health_heartbeats
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "heartbeat_select_all" ON public.health_heartbeats;
CREATE POLICY "heartbeat_select_all" ON public.health_heartbeats
  FOR SELECT TO anon, authenticated
  USING (true);

-- 7. AI TUTOR LONG-TERM VECTOR MEMORY (Mem0 / Gemini text-embedding-004)
CREATE TABLE IF NOT EXISTS public.user_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('grammar_weakness', 'vocabulary', 'goal', 'preference', 'general')),
  embedding extensions.vector(768),   -- 768 dimensions for Gemini text-embedding-004
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_memories_user ON public.user_memories(user_id);
CREATE INDEX IF NOT EXISTS idx_user_memories_cat  ON public.user_memories(category);

ALTER TABLE public.user_memories ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.user_memories TO authenticated;

DROP POLICY IF EXISTS "user_memories_all_own" ON public.user_memories;
CREATE POLICY "user_memories_all_own" ON public.user_memories
  FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Vector Similarity Search Helper Function
CREATE OR REPLACE FUNCTION public.match_user_memories(
  p_user_id UUID,
  p_query_embedding extensions.vector(768),
  p_match_threshold FLOAT DEFAULT 0.6,
  p_match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  category TEXT,
  similarity FLOAT,
  metadata JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id,
    m.content,
    m.category,
    (1 - (m.embedding <=> p_query_embedding))::FLOAT AS similarity,
    m.metadata
  FROM public.user_memories m
  WHERE m.user_id = p_user_id
    AND 1 - (m.embedding <=> p_query_embedding) > p_match_threshold
  ORDER BY m.embedding <=> p_query_embedding
  LIMIT p_match_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.match_user_memories(UUID, extensions.vector, FLOAT, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.match_user_memories(UUID, extensions.vector, FLOAT, INT) TO authenticated;

-- 8. UPDATE PROFILES CONSTRAINTS (N5–N1 & SSW 19 Sectors)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_current_level_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_current_level_check CHECK (
  current_level IN (
    'n5','n4','n3','n2','n1','beyond',
    'jft','jft_a1','jft_a2','jft-a1','jft-a2','a1','a2',
    'ssw-kaigo','ssw_kaigo',
    'ssw-food','ssw_food',
    'ssw-construction','ssw_construction',
    'ssw-agriculture','ssw_agriculture',
    'ssw-accommodation','ssw_accommodation',
    'ssw-building-cleaning','ssw_building_cleaning',
    'ssw-manufacturing','ssw_manufacturing',
    'ssw-automobile','ssw_automobile',
    'ssw-aviation','ssw_aviation',
    'ssw-fishery','ssw_fishery',
    'ssw-food-service','ssw_food_service',
    'ssw-industrial-machinery','ssw_industrial_machinery',
    'ssw-electric-electronic','ssw_electric_electronic',
    'ssw-shipbuilding','ssw_shipbuilding',
    'ssw-logistics','ssw_logistics',
    'ssw-railway','ssw_railway',
    'ssw-forestry','ssw_forestry',
    'ssw-timber','ssw_timber',
    'ssw-textile','ssw_textile'
  )
);

-- 9. EXPAND SRS CARDS ITEM TYPES
ALTER TABLE public.srs_cards DROP CONSTRAINT IF EXISTS srs_cards_item_type_check;
ALTER TABLE public.srs_cards ADD CONSTRAINT srs_cards_item_type_check CHECK (
  item_type IN (
    'vocab','grammar','kanji','choukai','dialogue',
    'k3_safety','diagnostic','panic','k3','gemba',
    'kotowaza','counter','pitch_minimal_pair'
  )
);
