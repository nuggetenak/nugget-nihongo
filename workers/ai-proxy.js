// ══════════════════════════════════════════════════════════════════
//  Nugget Nihongo — AI Proxy Worker
//  Cloudflare Worker: routes AI requests to Gemini/Groq with
//  per-user rate limiting, key security, and fallback logic.
//
//  Deploy: cd workers && npx wrangler deploy
//
//  Required secrets (wrangler secret put <NAME>):
//    GEMINI_API_KEY   — from aistudio.google.com
//    GROQ_API_KEY     — from console.groq.com
//
//  Required KV namespace (wrangler kv:namespace create "RATE_LIMITS"):
//    RATE_LIMITS      — stores daily request counts per user
// ══════════════════════════════════════════════════════════════════

const ALLOWED_ORIGINS = [
  'https://nuggetenak.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const DAILY_LIMIT = 15; // free AI requests per user per day

// ── Gemini 2.0 Flash endpoint ──────────────────────────────────────
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// ── Groq endpoint (fallback) ───────────────────────────────────────
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'gemma2-9b-it'; // Free on Groq; fast and multilingual

// ── Sensei system prompt ───────────────────────────────────────────
const SYSTEM_PROMPT = `Kamu adalah Sensei Nugget, guru bahasa Jepang yang ramah dan ahli untuk pelajar Indonesia.

Gaya mengajarmu:
- Komunikasi dalam Bahasa Indonesia (bisa campur Jepang untuk contoh)
- Selalu beri contoh kalimat konkret ketika menjelaskan grammar/kosakata
- Bandingkan dengan Bahasa Indonesia untuk memperjelas (contrastive analysis)
- Gunakan romaji di sebelah hiragana/katakana untuk pelajar pemula
- Jawaban ringkas dan to-the-point, tapi lengkap
- Kalau ada perbedaan nuansa (に vs で, は vs が), jelaskan kapan pakai masing-masing
- Beri tips hafalan kalau relevan

Format jawaban:
- Gunakan **bold** untuk istilah penting
- Gunakan blok kode atau indentasi untuk contoh kalimat
- Maksimum 4-5 paragraf kecuali diminta lebih detail

Kamu mengajar level JLPT N5 sampai N1. Target pelajar: orang Indonesia yang ingin lulus JLPT.`;

// ── CORS helper ────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-ID',
    'Access-Control-Max-Age': '86400',
  };
}

// ── Rate limiter ───────────────────────────────────────────────────
async function checkRateLimit(env, userId) {
  if (!env.RATE_LIMITS) return { allowed: true, remaining: DAILY_LIMIT }; // KV not set up yet

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const key = `${userId}:${today}`;
  const raw = await env.RATE_LIMITS.get(key);
  const count = raw ? parseInt(raw) : 0;

  if (count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  await env.RATE_LIMITS.put(key, String(count + 1), { expirationTtl: 90000 }); // 25h TTL
  return { allowed: true, remaining: DAILY_LIMIT - count - 1 };
}

// ── Call Gemini ────────────────────────────────────────────────────
async function callGemini(apiKey, messages, systemCtx) {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    contents,
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT + (systemCtx ? '\n\n' + systemCtx : '') }] },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      topP: 0.9,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
    ],
  };

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned empty response');

  return {
    reply: text,
    model_used: 'gemini-2.0-flash',
    tokens_used: data?.usageMetadata?.totalTokenCount || 0,
  };
}

// ── Call Groq (fallback) ───────────────────────────────────────────
async function callGroq(apiKey, messages, systemCtx) {
  const systemMessage = {
    role: 'system',
    content: SYSTEM_PROMPT + (systemCtx ? '\n\n' + systemCtx : ''),
  };

  const body = {
    model: GROQ_MODEL,
    messages: [systemMessage, ...messages],
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 0.9,
  };

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq returned empty response');

  return {
    reply: text,
    model_used: GROQ_MODEL,
    tokens_used: data?.usage?.total_tokens || 0,
  };
}

// ── Build context string from user state ──────────────────────────
function buildContext(ctx) {
  if (!ctx) return '';
  const parts = [];
  if (ctx.level) parts.push(`Pelajar sedang belajar JLPT ${ctx.level.toUpperCase()}.`);
  if (ctx.currentCard) parts.push(`Kartu yang sedang dipelajari: "${ctx.currentCard}".`);
  if (ctx.recentWeak?.length) parts.push(`Pola yang sering salah: ${ctx.recentWeak.join(', ')}.`);
  if (ctx.mode === 'quiz') parts.push('Mode: tantang pelajar dengan soal relevan ke level mereka.');
  return parts.join(' ');
}

// ── Main handler ───────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: cors });
    }

    // Only allow /chat
    const url = new URL(request.url);
    if (url.pathname !== '/chat') {
      return new Response('Not found', { status: 404, headers: cors });
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const { messages, context, userId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages array required' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    // Rate limiting
    const uid = userId || request.headers.get('CF-Connecting-IP') || 'anonymous';
    const { allowed, remaining } = await checkRateLimit(env, uid);

    if (!allowed) {
      return new Response(JSON.stringify({
        error: 'daily_limit_reached',
        message: 'Kamu sudah mencapai batas 15 pertanyaan gratis hari ini. Coba lagi besok!',
        remaining: 0,
      }), {
        status: 429,
        headers: { ...cors, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '0' },
      });
    }

    const systemCtx = buildContext(context);

    // Try Gemini first, fall back to Groq
    let result;
    let lastError;

    if (env.GEMINI_API_KEY) {
      try {
        result = await callGemini(env.GEMINI_API_KEY, messages, systemCtx);
      } catch (e) {
        lastError = e.message;
        console.error('Gemini failed:', e.message);
      }
    }

    if (!result && env.GROQ_API_KEY) {
      try {
        result = await callGroq(env.GROQ_API_KEY, messages, systemCtx);
      } catch (e) {
        lastError = e.message;
        console.error('Groq failed:', e.message);
      }
    }

    if (!result) {
      return new Response(JSON.stringify({
        error: 'ai_unavailable',
        message: 'AI sedang tidak tersedia. Silakan coba beberapa saat lagi.',
        detail: lastError,
      }), {
        status: 503,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      ...result,
      remaining,
    }), {
      status: 200,
      headers: { ...cors, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': String(remaining) },
    });
  },
};
