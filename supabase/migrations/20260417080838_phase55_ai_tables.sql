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
  approval_ratio      REAL GENERATED ALWAYS AS (
    CASE WHEN (thumbs_up + thumbs_down) = 0 THEN 0
         ELSE thumbs_up::REAL / (thumbs_up + thumbs_down)::REAL
    END
  ) STORED,
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

CREATE INDEX IF NOT EXISTS idx_promo_status    ON public.ai_promotion_queue(status);
CREATE INDEX IF NOT EXISTS idx_promo_ratio     ON public.ai_promotion_queue(approval_ratio DESC);
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
    -- promote to 'candidate' if criteria met
    status           = CASE
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