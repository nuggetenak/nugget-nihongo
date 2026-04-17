// ══════════════════════════════════════════════════════
//  ai-router — Nugget Nihongo Supabase Edge Function
//  Routes AI requests to Groq (fast) or Gemini (complex).
//  Injects master persona prompt. Handles rate-limit fallback.
//
//  Deploy: supabase functions deploy ai-router
//  Secrets (Supabase Dashboard → Edge Functions → Secrets):
//    GROQ_API_KEY
//    GEMINI_API_KEY
//
//  Request body: {
//    task_type: 'simple' | 'complex',
//    messages:  [{role: 'user'|'assistant', content: string}],
//    dna_summary?: string   // ≤200 tokens from dna-summarizer.js
//  }
//
//  Response: { text: string } | { fallback: true, reason: string }
// ══════════════════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

// ── Master Persona Prompt (v2 — canonical, see FRONTEND-OVERHAUL-PLAN.md §5.3) ─
// Source of truth: /shared/sensei-persona-v2.txt
// CI test (tests/run.js persona-drift) verifies this matches workers/ai-proxy.js.
// MUST be kept byte-identical to SYSTEM_PROMPT in workers/ai-proxy.js.
const MASTER_SYSTEM_PROMPT = `Kamu adalah Sensei Nugget — senpai bahasa Jepang buat pelajar Indonesia.
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
// MUST be kept byte-identical to MODE_ADDENDA in workers/ai-proxy.js.
const MODE_ADDENDA: Record<string, string> = {
  explain: `Mode: EXPLAIN. Fokus: bikin pelajar ngerti satu konsep sampai dalam.
Bentuk jawaban:
  1. Inti 1-2 kalimat (TL;DR).
  2. Struktur formal (pattern + conjugation rule kalau relevan).
  3. 2-3 contoh dari paling common ke paling nuanced. Bold target word.
  4. Satu perbandingan ID-JP yang ngebuka "cara mikirnya".
  5. (Kalau relevan) "Mau liat pasangan-mirip? [pola X] sama [pola Y] sering ketuker."`,

  quiz: `Mode: QUIZ. Kamu examiner yang baik.
Aturan:
  - Satu soal per turn. Soal harus dari level {level} atau titik lemah {recent_weak}.
  - Jangan sampai jawaban bocor di soal.
  - Setelah pelajar jawab: (a) bener/salah dengan swap konkret, (b) satu kalimat "kenapa",
    (c) satu soal follow-up yang lebih mudah kalau salah, atau lebih susah kalau bener.
  - Maksimal 3 soal beruntun tanpa nanya "masih lanjut?".`,

  chat: `Mode: CHAT. Ngobrol.
Aturan:
  - Match register pelajar. Kalau mereka casual, kamu casual. Kalau mereka formal, kamu sopan.
  - Kalau mereka ngetik Jepang, jawab Jepang (dengan glossing ID singkat cuma kalau ada
    kata yang level-nya di atas mereka).
  - Kalau mereka typo grammar, koreksi di akhir jawabanmu — jangan di tengah alur obrolan.
  - Boleh nanya balik. Boleh cerita. Jangan dosen-mode.`,
};

function buildSystemPrompt(mode?: string): string {
  const addendum = mode ? MODE_ADDENDA[mode] : undefined;
  if (!addendum) return MASTER_SYSTEM_PROMPT;
  return MASTER_SYSTEM_PROMPT + '\n\n' + addendum;
}

// ── Provider: Groq ─────────────────────────────────────
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL   = 'llama-3.1-70b-versatile';

async function callGroq(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
  timeoutMs = 10000
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    if (resp.status === 429) throw new RateLimitError('Groq rate limit');
    if (!resp.ok) throw new Error(`Groq HTTP ${resp.status}`);

    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('Groq: empty response');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

// ── Provider: Gemini Flash ─────────────────────────────
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function callGemini(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
  systemPrompt: string,
  timeoutMs = 20000
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Gemini uses a different message format.
  // Filter out "system" roles — they go into systemInstruction instead.
  const geminiContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  for (const msg of messages) {
    if (msg.role === 'system') continue; // handled via systemInstruction
    // Map OpenAI roles to Gemini roles
    const role = msg.role === 'assistant' ? 'model' : 'user';
    geminiContents.push({ role, parts: [{ text: msg.content }] });
  }

  try {
    const resp = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
      }),
      signal: controller.signal,
    });

    if (resp.status === 429) throw new RateLimitError('Gemini rate limit');
    if (!resp.ok) throw new Error(`Gemini HTTP ${resp.status}`);

    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error('Gemini: empty response');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

// ── Custom error for rate limiting ────────────────────
class RateLimitError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'RateLimitError';
  }
}

// ── CORS headers ──────────────────────────────────────
function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// ── Main handler ──────────────────────────────────────
serve(async (req: Request) => {
  const origin = req.headers.get('origin') || '*';

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    });
  }

  // ── Parse body ──────────────────────────────────────
  let body: {
    task_type?: string;
    messages?: unknown[];
    dna_summary?: string;
    mode?: string;
    goals?: unknown[];
    level?: string;
  };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    });
  }

  const taskType   = body.task_type === 'complex' ? 'complex' : 'simple';
  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const dnaSummary  = typeof body.dna_summary === 'string' ? body.dna_summary.slice(0, 2000) : '';
  const mode        = (body.mode && ['explain', 'quiz', 'chat'].includes(body.mode)) ? body.mode : 'explain';
  const goals       = Array.isArray(body.goals) ? body.goals.filter((g): g is string => typeof g === 'string').slice(0, 10) : [];
  const level       = typeof body.level === 'string' ? body.level.slice(0, 10) : '';

  // Validate messages
  const messages: Array<{ role: string; content: string }> = rawMessages
    .filter((m): m is { role: string; content: string } =>
      typeof m === 'object' && m !== null &&
      typeof (m as Record<string, unknown>).role === 'string' &&
      typeof (m as Record<string, unknown>).content === 'string'
    )
    .slice(0, 20); // hard cap to prevent abuse

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No valid messages provided' }), {
      status: 400,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    });
  }

  // ── Build full message list with system prompt ───────
  // Goal code → human-readable label (must match public/index.html data-goal="..."
  // onboarding items — ssw / jlpt / anime / travel / casual).
  const GOAL_LABELS: Record<string, string> = {
    ssw:    'SSW/TKI (kerja di Jepang — konstruksi, manufaktur, perhotelan, caregiver, dsb)',
    jlpt:   'lulus JLPT (sertifikasi formal N5 → N1)',
    anime:  'ngerti anime/manga/drama tanpa subtitle',
    travel: 'jalan-jalan ke Jepang (ngobrol santai sama orang Jepang)',
    casual: 'belajar santai karena penasaran — belum ada target spesifik',
  };
  const ctxParts: string[] = [];
  if (level) ctxParts.push(`Pelajar sedang belajar JLPT ${level.toUpperCase()}.`);
  if (goals.length) {
    const labeled = goals.map(g => GOAL_LABELS[g] || g).filter(Boolean);
    if (labeled.length) ctxParts.push(`Tujuan belajar pelajar: ${labeled.join('; ')}. Prioritaskan contoh yang relevan ke tujuan ini.`);
  }
  const ctxString = ctxParts.join(' ');
  const modeSystemPrompt = buildSystemPrompt(mode) + (ctxString ? '\n\n' + ctxString : '');

  const systemMessage = { role: 'system', content: modeSystemPrompt };

  // If DNA summary is provided, prepend to the first user message
  let augmentedMessages = [systemMessage, ...messages];
  if (dnaSummary) {
    const dnaContext = `[Konteks belajar pelajar: ${dnaSummary}]\n\n`;
    augmentedMessages = [
      systemMessage,
      { role: 'user', content: dnaContext + messages[0].content },
      ...messages.slice(1),
    ];
  }

  // ── API keys ─────────────────────────────────────────
  const groqKey   = Deno.env.get('GROQ_API_KEY')   || '';
  const geminiKey = Deno.env.get('GEMINI_API_KEY') || '';

  const responseHeaders = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

  // ── Routing logic ─────────────────────────────────────
  // simple → Groq first, fallback Gemini
  // complex → Gemini first, fallback Groq
  let text: string | null = null;
  let providerErrors: string[] = [];

  if (taskType === 'simple') {
    // Try Groq first
    if (groqKey) {
      try {
        text = await callGroq(augmentedMessages, groqKey, 10000);
      } catch (e) {
        providerErrors.push(`Groq: ${(e as Error).message}`);
        console.warn('[ai-router] Groq failed, trying Gemini:', (e as Error).message);
      }
    }
    // Fallback to Gemini
    if (!text && geminiKey) {
      try {
        text = await callGemini(augmentedMessages, geminiKey, modeSystemPrompt, 15000);
      } catch (e) {
        providerErrors.push(`Gemini: ${(e as Error).message}`);
        console.warn('[ai-router] Gemini also failed:', (e as Error).message);
      }
    }
  } else {
    // complex: Gemini first
    if (geminiKey) {
      try {
        text = await callGemini(augmentedMessages, geminiKey, modeSystemPrompt, 20000);
      } catch (e) {
        providerErrors.push(`Gemini: ${(e as Error).message}`);
        console.warn('[ai-router] Gemini failed, trying Groq:', (e as Error).message);
      }
    }
    // Fallback to Groq
    if (!text && groqKey) {
      try {
        text = await callGroq(augmentedMessages, groqKey, 15000);
      } catch (e) {
        providerErrors.push(`Groq: ${(e as Error).message}`);
        console.warn('[ai-router] Groq also failed:', (e as Error).message);
      }
    }
  }

  // ── Both failed → trigger offline fallback ───────────
  if (!text) {
    console.error('[ai-router] All providers failed:', providerErrors.join('; '));
    return new Response(
      JSON.stringify({ fallback: true, reason: 'all_providers_failed' }),
      { status: 200, headers: responseHeaders }
    );
  }

  return new Response(
    JSON.stringify({ text }),
    { status: 200, headers: responseHeaders }
  );
});
