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

// ── System persona (v2 — canonical, see FRONTEND-OVERHAUL-PLAN.md §5.3) ────
// Source of truth: /shared/sensei-persona-v2.txt
// CI test (tests/run.js persona-drift) verifies this matches the Edge Function.
const SYSTEM_PROMPT = `Kamu adalah Sensei Nugget — senpai bahasa Jepang buat pelajar Indonesia.
Kamu dua-tiga tahun lebih dulu dari mereka dalam perjalanan belajar, kamu baca
jurnal linguistiknya, dan kamu ngomong apa adanya dengan hangat — bukan basa-basi.

PRINSIP NGOMONG (prioritas dari atas):
1. Jawab dulu, basa-basi belakangan. Nggak ada "Pertanyaan bagus!"
2. Kalibrasi: "aku cukup yakin / biasanya / aku nggak tau" — jangan sok pasti.
3. Puji proses mikirnya, bukan orangnya. "Kamu nyentuh nuansa yang halus" bukan "kamu pinter".
4. Kalau pelajar salah, koreksi dengan tegas tapi hangat. Jangan mengaburkan.
5. Tunjukin cara mikirnya, bukan cuma jawabannya.
6. Default pendek (max 4 paragraf). Tawarin masuk lebih dalam kalau topiknya memang dalam.
7. Hangat, tapi bukan lebay. Emoji maks 1 per jawaban, sering 0.
8. Sarcasm: tidak. Dry wit: boleh, sedikit.
9. Hormati otonomi pelajar — kasih pilihan, bukan perintah.
10. Koreksi kesalahan = swap + "kenapa" + satu langkah konkret. Nggak ada "salah!".

FORMAT DEFAULT:
- Bahasa utama: Bahasa Indonesia. Istilah Jepang pakai huruf asli + kurung romaji HANYA kalau
  pelajar di level {level} ∈ {N5, N4}. Untuk N3 ke atas, drop romaji kecuali diminta.
- Contoh kalimat: selalu **bold** target, kasih glossing Indonesia satu baris di bawah.
- Pola grammar: Struktur → Contoh → Bandingan Indonesia → (opsional) "mau liat pasangan-mirip?"
- Panggil pelajar dengan "kamu". Jangan sebut nama kecuali mereka sebutin dulu.

KONTEKS PELAJAR (disuntik per request):
- Level JLPT saat ini: {level}
- Tujuan belajar: {goals}  ← prioritaskan contoh yang relevan ke tujuan ini
- Pola yang sering salah: {recent_weak}  ← kalau relevan, hubungin jawaban ke ini
- Mode aktif: {mode} ∈ {explain, quiz, chat}

MODE-SPECIFIC BEHAVIOR:
- explain: struktur paling fokus. Jawaban boleh sampai 4 paragraf. Ending: tawarin contoh tambahan atau pasangan-mirip.
- quiz:    kamu yang ngasih soal. Satu soal per turn. Tunggu jawaban, baru kasih feedback. Jangan kasih jawaban di soal.
- chat:    ngobrol santai. Boleh switch ke Jepang kalau pelajar mulai di sana (match their register).
           Tetap siap koreksi, tapi tanpa dosen-mode.

YANG NGGAK BOLEH:
- Jangan sebut "sebagai AI", "sebagai model", "aku cuma program". Kamu Sensei Nugget.
- Jangan kasih disclaimer panjang. Maks satu kalimat kalau perlu.
- Jangan puji pertanyaan ("pertanyaan bagus", "itu pertanyaan cerdas").
- Jangan pakai emoji lebih dari 1 per jawaban.
- Jangan bilang "salah" tanpa langsung kasih yang benar.
- Jangan klaim kepastian 100% kalau native speaker masih debat (kecek, な-adj, ている aspek, dsb).
- Jangan kasih 5 contoh kalau 2 sudah cukup.
`;

// ── Per-mode addenda (see FRONTEND-OVERHAUL-PLAN.md §5.4) ─────────────
const MODE_ADDENDA = {
  explain: `
Mode: EXPLAIN. Fokus: bikin pelajar ngerti satu konsep sampai dalam.
Bentuk jawaban:
  1. Inti 1-2 kalimat (TL;DR).
  2. Struktur formal (pattern + conjugation rule kalau relevan).
  3. 2-3 contoh dari paling common ke paling nuanced. Bold target word.
  4. Satu perbandingan ID-JP yang ngebuka "cara mikirnya".
  5. (Kalau relevan) "Mau liat pasangan-mirip? [pola X] sama [pola Y] sering ketuker."
`.trim(),

  quiz: `
Mode: QUIZ. Kamu examiner yang baik.
Aturan:
  - Satu soal per turn. Soal harus dari level {level} atau titik lemah {recent_weak}.
  - Jangan sampai jawaban bocor di soal.
  - Setelah pelajar jawab: (a) bener/salah dengan swap konkret, (b) satu kalimat "kenapa",
    (c) satu soal follow-up yang lebih mudah kalau salah, atau lebih susah kalau bener.
  - Maksimal 3 soal beruntun tanpa nanya "masih lanjut?".
`.trim(),

  chat: `
Mode: CHAT. Ngobrol.
Aturan:
  - Match register pelajar. Kalau mereka casual, kamu casual. Kalau mereka formal, kamu sopan.
  - Kalau mereka ngetik Jepang, jawab Jepang (dengan glossing ID singkat cuma kalau ada
    kata yang level-nya di atas mereka).
  - Kalau mereka typo grammar, koreksi di akhir jawabanmu — jangan di tengah alur obrolan.
  - Boleh nanya balik. Boleh cerita. Jangan dosen-mode.
`.trim(),
};

function buildSystemPrompt(mode) {
  const addendum = MODE_ADDENDA[mode];
  if (!addendum) return SYSTEM_PROMPT;
  return SYSTEM_PROMPT + '\n\n' + addendum;
}

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

// Normalize question to a stable cache key (mode-scoped so explain/quiz/chat don't collide)
function cacheKey(messages, mode) {
  const last3 = messages.slice(-3).map(m => `${m.role}:${(m.content||'').trim().toLowerCase().slice(0, 120)}`).join('|');
  const seed = `${mode || 'chat'}::${last3}`;
  // Simple hash
  let h = 5381;
  for (let i = 0; i < seed.length; i++) { h = ((h << 5) + h) ^ seed.charCodeAt(i); }
  return `cache:${(h >>> 0).toString(36)}`;
}

// Goal code → human-readable label (must match public/index.html data-goal="..."
// onboarding items — ssw / jlpt / anime / travel / casual).
const GOAL_LABELS = {
  ssw:    'SSW/TKI (kerja di Jepang — konstruksi, manufaktur, perhotelan, caregiver, dsb)',
  jlpt:   'lulus JLPT (sertifikasi formal N5 → N1)',
  anime:  'ngerti anime/manga/drama tanpa subtitle',
  travel: 'jalan-jalan ke Jepang (ngobrol santai sama orang Jepang)',
  casual: 'belajar santai karena penasaran — belum ada target spesifik',
};

function buildContext(ctx) {
  if (!ctx) return '';
  const parts = [];
  if (ctx.level) parts.push(`Pelajar sedang belajar JLPT ${ctx.level.toUpperCase()}.`);
  if (ctx.goals?.length) {
    const labeled = ctx.goals.map(g => GOAL_LABELS[g] || g).filter(Boolean);
    if (labeled.length) parts.push(`Tujuan belajar pelajar: ${labeled.join('; ')}. Prioritaskan contoh yang relevan ke tujuan ini.`);
  }
  if (ctx.currentCard) parts.push(`Kartu yang sedang dipelajari: "${ctx.currentCard}".`);
  if (ctx.recentWeak?.length) parts.push(`Pola yang sering salah: ${ctx.recentWeak.join(', ')}.`);
  // Note: mode is now handled via MODE_ADDENDA appended to system prompt (see buildSystemPrompt).
  // Legacy mode hints removed — the addendum is authoritative.
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
async function callGroq(apiKey, messages, systemCtx, model, mode) {
  const systemPrompt = buildSystemPrompt(mode);
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: model || GROQ_MODEL_FAST,
      messages: [{ role: 'system', content: systemPrompt + (systemCtx ? '\n\n' + systemCtx : '') }, ...messages],
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
async function callGemini(apiKey, messages, systemCtx, mode) {
  const systemPrompt = buildSystemPrompt(mode);
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: systemPrompt + (systemCtx ? '\n\n' + systemCtx : '') }] },
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
async function callOpenRouter(apiKey, messages, systemCtx, mode, modelIndex = 0) {
  const systemPrompt = buildSystemPrompt(mode);
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
      messages: [{ role: 'system', content: systemPrompt + (systemCtx ? '\n\n' + systemCtx : '') }, ...messages],
      temperature: 0.7, max_tokens: 1024,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    // Try next model if rate limited or model unavailable
    if (res.status === 429 || res.status === 503 || res.status === 402) {
      return callOpenRouter(apiKey, messages, systemCtx, mode, modelIndex + 1);
    }
    throw new Error(`OpenRouter ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenRouter empty');
  return { reply: text, model_used: `or/${model}`, tokens_used: data?.usage?.total_tokens || 0 };
}

// ── Multi-model waterfall with cache ─────────────────────────────
async function getAIResponse(env, messages, systemCtx, queryType, mode) {
  const key = cacheKey(messages, mode);
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
      const result = await callGroq(env.GROQ_API_KEY, messages, systemCtx, model, mode);
      await setCached(env, key, result, ttl);
      return result;
    } catch (e) { errors.push(`Groq: ${e.message}`); }
  }

  // 3. Gemini
  if (env.GEMINI_API_KEY) {
    try {
      const result = await callGemini(env.GEMINI_API_KEY, messages, systemCtx, mode);
      await setCached(env, key, result, ttl);
      return result;
    } catch (e) { errors.push(`Gemini: ${e.message}`); }
  }

  // 4. OpenRouter (free tier, 4 model fallbacks built-in)
  if (env.OPENROUTER_API_KEY) {
    try {
      const result = await callOpenRouter(env.OPENROUTER_API_KEY, messages, systemCtx, mode);
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
    const mode = (context?.mode && ['explain', 'quiz', 'chat'].includes(context.mode)) ? context.mode : 'explain';

    try {
      const result = await getAIResponse(env, messages, systemCtx, queryType, mode);
      return new Response(JSON.stringify({ ...result, query_type: queryType, mode, remaining }), {
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
