// ══════════════════════════════════════════════════════════════════
//  Nugget Nihongo — AI Proxy Worker v3 (Multi-Model + Smart Cache)
//  Cloudflare Worker
//
//  Provider chain (auto-fallback):
//    1. Groq        (fastest — llama 3.1 8b)
//    2. Gemini      (Google — gemini-2.0-flash)
//    3. OpenRouter  (50+ free models — optional, set OPENROUTER_API_KEY)
//    4. KV Cache    (stored previous answers — always available)
//
//  Secrets needed (wrangler secret put):
//    GROQ_API_KEY       — console.groq.com (free)
//    GEMINI_API_KEY     — aistudio.google.com (free)
//    OPENROUTER_API_KEY — openrouter.ai (free, optional but recommended)
//
//  v3 — 16 April 2026
// ══════════════════════════════════════════════════════════════════

const ALLOWED_ORIGINS = [
  'https://nuggetenak.github.io',
  'https://nugget-nihongo.pages.dev',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const DAILY_LIMIT = 20; // bumped from 15 → 20 with caching reducing actual API hits

// ── Model config ────────────────────────────────────────────────
const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const OR_URL     = 'https://openrouter.ai/api/v1/chat/completions';

const GROQ_MODEL_FAST = 'llama-3.1-8b-instant';
const GROQ_MODEL_DEEP = 'llama-3.3-70b-versatile';

// OpenRouter free models — tried in order
const OR_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'deepseek/deepseek-chat-v3-0324:free',
  'qwen/qwen-2.5-72b-instruct:free',
  'google/gemma-3-27b-it:free',
];

// Cache TTL per query type (seconds)
const CACHE_TTL = {
  grammar_explain: 60 * 60 * 24 * 30, // 30 days — grammar explanations rarely change
  quiz:            60 * 60 * 24 * 7,  // 7 days — quiz questions
  chat:            60 * 60 * 6,        // 6 hours — general chat
};

// ── System persona ────────────────────────────────────────────────
const SYSTEM_PROMPT = `Kamu adalah teman belajar bahasa Jepang yang hangat, sabar, dan ahli — bernama Sensei Nugget.
Kamu mengajar pelajar Indonesia yang sedang belajar JLPT N5 sampai N1.

Prinsip komunikasimu (WAJIB dipatuhi):
1. Selalu gunakan Bahasa Indonesia sebagai bahasa utama, campur Jepang untuk contoh.
2. Untuk setiap grammar point: berikan struktur dulu, lalu 2 contoh konkret dengan romaji.
3. Gunakan perbandingan Indonesia-Jepang: jelaskan bedanya dengan cara berpikir Bahasa Indonesia.
4. Ketika pelajar salah, PUJI usahanya dulu sebelum mengoreksi — jangan pernah membuat mereka malu.
5. Jawaban ringkas (maksimum 4 paragraf) — jangan membanjiri pemula.
6. Untuk N3+, bahas nuansa pasangan yang sering membingungkan (に vs で, は vs が, dll).
7. Sesuaikan nada: santai untuk ngobrol, terstruktur untuk grammar, semangat untuk kuis.
8. Beri motivasi kecil di akhir — "Semangat!", "Kamu sudah di jalan yang benar!", dll.

Format: **Bold** untuk istilah penting. Blok kode untuk contoh kalimat. Romaji di sebelah kana untuk N5-N4.`;

// ── Helpers ──────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-ID',
    'Access-Control-Max-Age': '86400',
  };
}

function classifyQuery(messages) {
  if (!messages?.length) return 'chat';
  const text = (messages[messages.length - 1]?.content || '').toLowerCase();
  if (/jelaskan|perbedaan|kenapa|bagaimana|bedanya|kapan pakai|nuansa/.test(text)) return 'grammar_explain';
  if (/quiz|soal|latihan|tes|pertanyaan buat/.test(text)) return 'quiz';
  return 'chat';
}

// Normalize question to a stable cache key
function cacheKey(messages) {
  const last3 = messages.slice(-3).map(m => `${m.role}:${(m.content||'').trim().toLowerCase().slice(0, 120)}`).join('|');
  // Simple hash
  let h = 5381;
  for (let i = 0; i < last3.length; i++) { h = ((h << 5) + h) ^ last3.charCodeAt(i); }
  return `cache:${(h >>> 0).toString(36)}`;
}

function buildContext(ctx) {
  if (!ctx) return '';
  const parts = [];
  if (ctx.level) parts.push(`Pelajar sedang belajar JLPT ${ctx.level.toUpperCase()}.`);
  if (ctx.currentCard) parts.push(`Kartu yang sedang dipelajari: "${ctx.currentCard}".`);
  if (ctx.recentWeak?.length) parts.push(`Pola yang sering salah: ${ctx.recentWeak.join(', ')}.`);
  if (ctx.mode === 'quiz') parts.push('Mode: tantang pelajar dengan soal relevan ke level mereka.');
  if (ctx.mode === 'explain') parts.push('Mode: jelaskan dengan detail dan contoh.');
  if (ctx.learning_dna?.mistakes?.length) {
    const top5 = [...ctx.learning_dna.mistakes]
      .sort((a, b) => (b.count || 0) - (a.count || 0))
      .slice(0, 5)
      .map(m => `${m.pattern || m.item_id} (salah ${m.count}x)`);
    parts.push(`Kesalahan berulang: ${top5.join(', ')}.`);
  }
  return parts.join(' ');
}

// ── Rate limiter ─────────────────────────────────────────────────
async function checkRateLimit(env, userId) {
  if (!env.RATE_LIMITS) return { allowed: true, remaining: DAILY_LIMIT };
  const today = new Date().toISOString().slice(0, 10);
  const key = `rl:${userId}:${today}`;
  const raw = await env.RATE_LIMITS.get(key);
  const count = raw ? parseInt(raw) : 0;
  if (count >= DAILY_LIMIT) return { allowed: false, remaining: 0 };
  await env.RATE_LIMITS.put(key, String(count + 1), { expirationTtl: 90000 });
  return { allowed: true, remaining: DAILY_LIMIT - count - 1 };
}

// ── KV response cache ─────────────────────────────────────────────
async function getCached(env, key) {
  if (!env.RATE_LIMITS) return null;
  try {
    const raw = await env.RATE_LIMITS.get(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

async function setCached(env, key, value, ttl) {
  if (!env.RATE_LIMITS) return;
  try {
    await env.RATE_LIMITS.put(key, JSON.stringify(value), { expirationTtl: ttl });
  } catch { /* silent fail */ }
}

// ── Provider: Groq ────────────────────────────────────────────────
async function callGroq(apiKey, messages, systemCtx, model) {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: model || GROQ_MODEL_FAST,
      messages: [{ role: 'system', content: SYSTEM_PROMPT + (systemCtx ? '\n\n' + systemCtx : '') }, ...messages],
      temperature: 0.7, max_tokens: 1024, top_p: 0.9,
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq empty');
  return { reply: text, model_used: `groq/${model || GROQ_MODEL_FAST}`, tokens_used: data?.usage?.total_tokens || 0 };
}

// ── Provider: Gemini ──────────────────────────────────────────────
async function callGemini(apiKey, messages, systemCtx) {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT + (systemCtx ? '\n\n' + systemCtx : '') }] },
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024, topP: 0.9 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini empty');
  return { reply: text, model_used: 'gemini-2.0-flash', tokens_used: data?.usageMetadata?.totalTokenCount || 0 };
}

// ── Provider: OpenRouter ──────────────────────────────────────────
async function callOpenRouter(apiKey, messages, systemCtx, modelIndex = 0) {
  const model = OR_MODELS[modelIndex];
  if (!model) throw new Error('OpenRouter: no more models to try');
  const res = await fetch(OR_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://nuggetenak.github.io/nugget-nihongo',
      'X-Title': 'Nugget Nihongo',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT + (systemCtx ? '\n\n' + systemCtx : '') }, ...messages],
      temperature: 0.7, max_tokens: 1024,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    // Try next model if rate limited or model unavailable
    if (res.status === 429 || res.status === 503 || res.status === 402) {
      return callOpenRouter(apiKey, messages, systemCtx, modelIndex + 1);
    }
    throw new Error(`OpenRouter ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenRouter empty');
  return { reply: text, model_used: `or/${model}`, tokens_used: data?.usage?.total_tokens || 0 };
}

// ── Multi-model waterfall with cache ─────────────────────────────
async function getAIResponse(env, messages, systemCtx, queryType) {
  const key = cacheKey(messages);
  const ttl = CACHE_TTL[queryType] || CACHE_TTL.chat;

  // 1. Check KV cache first
  const cached = await getCached(env, key);
  if (cached) {
    return { ...cached, from_cache: true };
  }

  const errors = [];

  // 2. Groq (fastest — always try first)
  if (env.GROQ_API_KEY) {
    try {
      const model = queryType === 'grammar_explain' ? GROQ_MODEL_DEEP : GROQ_MODEL_FAST;
      const result = await callGroq(env.GROQ_API_KEY, messages, systemCtx, model);
      await setCached(env, key, result, ttl);
      return result;
    } catch (e) { errors.push(`Groq: ${e.message}`); }
  }

  // 3. Gemini
  if (env.GEMINI_API_KEY) {
    try {
      const result = await callGemini(env.GEMINI_API_KEY, messages, systemCtx);
      await setCached(env, key, result, ttl);
      return result;
    } catch (e) { errors.push(`Gemini: ${e.message}`); }
  }

  // 4. OpenRouter (free tier, 4 model fallbacks built-in)
  if (env.OPENROUTER_API_KEY) {
    try {
      const result = await callOpenRouter(env.OPENROUTER_API_KEY, messages, systemCtx);
      await setCached(env, key, result, ttl);
      return result;
    } catch (e) { errors.push(`OpenRouter: ${e.message}`); }
  }

  throw new Error(`All providers failed: ${errors.join(' | ')}`);
}

// ── Main handler ──────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    const url = new URL(request.url);
    if (url.pathname !== '/chat') return new Response('Not found', { status: 404, headers: cors });

    let body;
    try { body = await request.json(); }
    catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }); }

    const { messages, context, userId } = body;
    if (!messages?.length) {
      return new Response(JSON.stringify({ error: 'messages required' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
    }

    // Rate limiting (uses IP as fallback if no userId)
    const uid = userId || request.headers.get('CF-Connecting-IP') || 'anon';
    const { allowed, remaining } = await checkRateLimit(env, uid);
    if (!allowed) {
      return new Response(JSON.stringify({
        error: 'daily_limit_reached',
        message: `Kamu sudah mencapai batas ${DAILY_LIMIT} pertanyaan gratis hari ini. Coba lagi besok ya! 💪`,
        remaining: 0,
      }), { status: 429, headers: { ...cors, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '0' } });
    }

    const systemCtx = buildContext(context);
    const queryType = classifyQuery(messages);

    try {
      const result = await getAIResponse(env, messages, systemCtx, queryType);
      return new Response(JSON.stringify({ ...result, query_type: queryType, remaining }), {
        status: 200,
        headers: { ...cors, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': String(remaining) },
      });
    } catch (e) {
      console.error('All AI providers failed:', e.message);
      return new Response(JSON.stringify({
        error: 'ai_unavailable',
        message: 'AI sedang istirahat sebentar. Coba lagi ya! 🙏',
        detail: e.message,
      }), { status: 503, headers: { ...cors, 'Content-Type': 'application/json' } });
    }
  },
};
