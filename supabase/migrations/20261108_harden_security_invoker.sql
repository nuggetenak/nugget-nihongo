-- 20261108_harden_security_invoker.sql
-- Harden match_user_memories: Switch to SECURITY INVOKER to strictly enforce RLS policies
-- and prevent cross-tenant access.

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
SECURITY INVOKER
SET search_path = public, extensions
AS $$
BEGIN
  -- Strict caller verification: caller can only search their own memories
  IF auth.uid() IS NOT NULL AND auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'Access denied: Cannot query memories for another user';
  END IF;

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
