// ══════════════════���═══════════════════════════════════════════════
//  Nugget Nihongo — AI Proxy Worker v2 (Smart Router)
//  Cloudflare Worker: speed-tiered AI routing with research-grounded
//  persona, learning_dna context injection, and per-user rate limiting.
//
//  Deploy: cd workers && npx wrangler deploy
//
//  Required secrets (wrangler secret put <NAME>):
//    GEMINI_API_KEY   — from aistudio.google.com
//    GROQ_API_KEY     — from console.groq.com
//
//  Required KV namespace (wrangler kv:namespace create "RATE_LIMITS"):
//    RATE_LIMITS      — stores daily request counts per user
//
//  Architecture v15.6.0 — 8 April 2026
// ═════��═══════════════════════════════════════════════════════════���

const ALLOWED_ORIGINS = [
  'https://nuggetenak.github.io',
  'https://nugget-nihongo.pages.dev',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const DAILY_LIMIT = 15;

// ── Model endpoints ─��────────────────────────────────────────────
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Speed-tiered models
const GROQ_MODEL_FAST = 'llama-3.1-8b-instant';  // Quick tasks: fastest inference
const GROQ_MODEL_DEEP = 'gemma2-9b-it';           // Complex fallback: better reasoning

// ── Research-grounded persona ────────────────────────────────────
// Based on: malu/face-concern research (Markus & Kitayama 1991),
// Hofstede IDV=14 for Indonesia, L1 contrastive analysis (59 citations §5),
// Processability Theory grammar sequencing (Pienemann 1998)
const SYSTEM_PROMPT = `Kamu adalah teman belajar bahasa Jepang yang hangat, sabar, dan ahli — bernama Sensei Nugget.
Kamu mengajar pelajar Indonesia yang sedang belajar JLPT N5 sampai N1.

Prinsip komunikasimu (WAJIB dipatuhi):
1. Selalu gunakan Bahasa Indonesia sebagai bahasa utama, campur Jepang untuk contoh.
2. Untuk setiap grammar point: berikan struktur dulu, lalu 2 contoh konkret dengan romaji.
3. Gunakan perbandingan Indonesia-Jepang (contrastive analysis): jelaskan bedanya dengan cara berpikir Bahasa Indonesia.
4. Ketika pelajar salah, PUJI usahanya dulu sebelum mengoreksi — jangan pernah membuat mereka malu.
5. Jawaban ringkas (maksimum 4 paragraf) — jangan membanjiri pemula.
6. Untuk N3+, bahas nuansa pasangan yang sering membingungkan (に vs で, は vs が, そうだ伝聞 vs そうだ様態).
7. Sesuaikan nada: santai untuk ngobrol, terstruktur untuk penjelasan grammar, semangat untuk feedback kuis.
8. Beri motivasi kecil di akhir jawaban — "Semangat!", "Kamu sudah di jalan yang benar!", dll.

Format jawaban:
- **Bold** untuk istilah penting
- Blok kode atau indentasi untuk contoh kalimat
- Romaji di sebelah kana untuk level N5-N4`;

// ── Task classification ──────────────────────────────────────────
// Determines whether a request needs fast feedback or deep explanation
const QUICK_KEYWORDS = /\b(tes|quiz|hint|contoh|artinya|translate|arti|terjemah|singkat|cepat)\b/i;
const COMPLEX_KEYWORDS = /\b(jelaskan|perbedaan|kenapa|bagaimana|bandingkan|kontrastif|grammar|nuansa|kapan pakai|apa bedanya)\b/i;

function classifyTask(messages) {
  if (!messages || messages.length === 0) return 'complex';
  const lastMsg = messages[messages.length - 1];
  if (!lastMsg || !lastMsg.content) return 'complex';
  const text = lastMsg.content;

  // Short messages are quick tasks
  if (text.length < 80 && !COMPLEX_KEYWORDS.test(text)) return 'quick';
  // Keyword-based classification
  if (COMPLEX_KEYWORDS.test(text)) return 'complex';
  if (QUICK_KEYWORDS.test(text)) return 'quick';
  return 'complex';
}

// ── CORS helper ────────────────────────────────────��─────────────
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-ID',
    'Access-Control-Max-Age': '86400',
  };
}

// ── Rate limiter ───────────��──────────────────────────���──────────
async function checkRateLimit(env, userId) {
  if (!env.RATE_LIMITS) return { allowed: true, remaining: DAILY_LIMIT };

  const today = new Date().toISOString().slice(0, 10);
  const key = `${userId}:${today}`;
  const raw = await env.RATE_LIMITS.get(key);
  const count = raw ? parseInt(raw) : 0;

  if (count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  await env.RATE_LIMITS.put(key, String(count + 1), { expirationTtl: 90000 });
  return { allowed: true, remaining: DAILY_LIMIT - count - 1 };
}

// ── Call Gemini ─────────��────────────────────────────────────────
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

// ── Call Groq ────────��───────────────────────────────────���───────
async function callGroq(apiKey, messages, systemCtx, model) {
  const systemMessage = {
    role: 'system',
    content: SYSTEM_PROMPT + (systemCtx ? '\n\n' + systemCtx : ''),
  };

  const body = {
    model: model || GROQ_MODEL_FAST,
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
    model_used: model || GROQ_MODEL_FAST,
    tokens_used: data?.usage?.total_tokens || 0,
  };
}

// ── Build context string from user state ─────────────────────────
function buildContext(ctx) {
  if (!ctx) return '';
  const parts = [];
  if (ctx.level) parts.push(`Pelajar sedang belajar JLPT ${ctx.level.toUpperCase()}.`);
  if (ctx.currentCard) parts.push(`Kartu yang sedang dipelajari: "${ctx.currentCard}".`);
  if (ctx.recentWeak?.length) parts.push(`Pola yang sering salah: ${ctx.recentWeak.join(', ')}.`);
  if (ctx.mode === 'quiz') parts.push('Mode: tantang pelajar dengan soal relevan ke level mereka.');
  if (ctx.mode === 'explain') parts.push('Mode: jelaskan dengan detail dan contoh.');

  // learning_dna injection — top 5 recurring mistakes as hidden context
  if (ctx.learning_dna && ctx.learning_dna.mistakes && ctx.learning_dna.mistakes.length) {
    var top5 = ctx.learning_dna.mistakes
      .sort(function (a, b) { return (b.count || 0) - (a.count || 0); })
      .slice(0, 5)
      .map(function (m) { return (m.pattern || m.item_id) + ' (salah ' + m.count + 'x)'; });
    parts.push('Kesalahan berulang pelajar ini: ' + top5.join(', ') + '. Bantu mereka dengan pola-pola ini.');
  }

  return parts.join(' ');
}

// ── Main handler ──────���──────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: cors });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/chat') {
      return new Response('Not found', { status: 404, headers: cors });
    }

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
        message: 'Kamu sudah mencapai batas 15 pertanyaan gratis hari ini. Coba lagi besok ya! 💪',
        remaining: 0,
      }), {
        status: 429,
        headers: { ...cors, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': '0' },
      });
    }

    const systemCtx = buildContext(context);
    const taskType = classifyTask(messages);

    // Speed-tiered routing
    let result;
    let lastError;

    if (taskType === 'quick') {
      // Quick tasks: Groq (fast) first → Gemini fallback
      if (env.GROQ_API_KEY) {
        try {
          result = await callGroq(env.GROQ_API_KEY, messages, systemCtx, GROQ_MODEL_FAST);
        } catch (e) {
          lastError = e.message;
          console.error('Groq (quick) failed:', e.message);
        }
      }
      if (!result && env.GEMINI_API_KEY) {
        try {
          result = await callGemini(env.GEMINI_API_KEY, messages, systemCtx);
        } catch (e) {
          lastError = e.message;
          console.error('Gemini (quick fallback) failed:', e.message);
        }
      }
    } else {
      // Complex tasks: Gemini first → Groq (deep) fallback
      if (env.GEMINI_API_KEY) {
        try {
          result = await callGemini(env.GEMINI_API_KEY, messages, systemCtx);
        } catch (e) {
          lastError = e.message;
          console.error('Gemini (complex) failed:', e.message);
        }
      }
      if (!result && env.GROQ_API_KEY) {
        try {
          result = await callGroq(env.GROQ_API_KEY, messages, systemCtx, GROQ_MODEL_DEEP);
        } catch (e) {
          lastError = e.message;
          console.error('Groq (complex fallback) failed:', e.message);
        }
      }
    }

    if (!result) {
      return new Response(JSON.stringify({
        error: 'ai_unavailable',
        message: 'AI sedang istirahat sebentar. Coba lagi ya! 🙏',
        detail: lastError,
      }), {
        status: 503,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      ...result,
      task_type: taskType,
      remaining,
    }), {
      status: 200,
      headers: { ...cors, 'Content-Type': 'application/json', 'X-RateLimit-Remaining': String(remaining) },
    });
  },
};
