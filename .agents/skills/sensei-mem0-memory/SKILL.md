---
name: sensei-mem0-memory
description: "Intelligent long-term memory layer for Sensei Nugget tutor using Mem0 (mem0ai) and Supabase pgvector to persist student learning history, weak grammar points, JLPT goals, and conversation context."
---

# Sensei Long-Term Memory Skill (Mem0 + Supabase pgvector)

This skill describes the architecture and integration of **Mem0** (`mem0ai`) into Nugget Nihongo's AI Tutor ("Sensei Nugget"). It allows Sensei to retain personal student context across sessions, including:
- Chronic grammar weaknesses (e.g., confusing は vs が, passive vs causative forms).
- Current JLPT or JFT exam targets and study pace.
- Personal interests and Indonesian background context.
- Daily quiz achievements and streak milestones.

---

## 1. Supabase `pgvector` Schema

Run this migration in your Supabase SQL editor or local migration script:

```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Table for user memories
CREATE TABLE IF NOT EXISTS public.user_memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'general', -- 'grammar_weakness', 'vocabulary', 'goal', 'preference'
    embedding vector(768),            -- 768 for Gemini text-embedding-004 / 1536 for OpenAI
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast cosine similarity search
CREATE INDEX IF NOT EXISTS user_memories_embedding_idx 
ON public.user_memories 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Row Level Security
ALTER TABLE public.user_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own memories"
ON public.user_memories
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

---

## 2. Mem0 Client Setup in Next.js / Cloudflare Worker

```bash
npm install mem0ai @supabase/supabase-js
```

### Initializing Mem0 with Supabase Vector Store
```ts
// src/lib/ai/memory.ts
import { Memory } from 'mem0ai/oss';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const memoryClient = new Memory({
  vectorStore: {
    provider: 'supabase',
    config: {
      client: supabase,
      tableName: 'user_memories',
    },
  },
  llm: {
    provider: 'gemini',
    config: {
      apiKey: process.env.GEMINI_API_KEY!,
      model: 'gemini-1.5-flash',
    },
  },
  embedder: {
    provider: 'gemini',
    config: {
      apiKey: process.env.GEMINI_API_KEY!,
      model: 'text-embedding-004',
    },
  },
});
```

---

## 3. Storing and Retrieving Memories in Sensei Chat

### When a Student Chat Finishes
Extract and save key facts:
```ts
export async function recordLearningEvent(userId: string, interactionSummary: string) {
  await memoryClient.add(interactionSummary, {
    userId,
    metadata: { source: 'quiz_mistake_review', timestamp: new Date().toISOString() },
  });
}
```

### When Sensei Prepares a Response
Query relevant past memories and inject them into the system prompt:
```ts
export async function getSenseiContext(userId: string, currentTopic: string): Promise<string> {
  const memories = await memoryClient.search(currentTopic, {
    userId,
    limit: 5,
  });

  if (!memories || memories.length === 0) return '';

  const memoryBullets = memories.map((m: any) => `- ${m.memory}`).join('\n');
  return `\n[STUDENT RECALL CONTEXT]\n${memoryBullets}\n`;
}
```
