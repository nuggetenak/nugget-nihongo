/**
 * lang-core.js — Nugget Nihongo Language Module
 * Fase 1: Template-based sentence pool (reuse GrammarCard.examples)
 * Fase 2: Slot-fill generator (lihat bagian GENERATOR di bawah)
 *
 * Output standar — semua sumber harus produce format ini:
 * { jp: string, id: string, keywords: string[], grammarId?: string, level?: string }
 */

'use strict';

// ─────────────────────────────────────────────
// § 1  SENTENCE POOL  (Fase 1 — dari data existing)
// Ambil examples[] dari GrammarCard, strip tag HTML, normalize.
// ─────────────────────────────────────────────

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '').trim();
}

/**
 * extractPool(grammarDataArray)
 * Baca window.grammarData, kembalikan array standar output.
 * Panggil sekali saat init, cache hasilnya.
 */
window.langExtractPool = function(grammarDataArray) {
  const pool = [];
  (grammarDataArray || []).forEach(card => {
    (card.examples || []).forEach(ex => {
      if (!ex.jp || !ex.id) return;
      const jp = stripHtml(ex.jp);
      const id = stripHtml(ex.id);
      if (jp.length < 3 || id.length < 3) return;
      pool.push({
        jp,
        id,
        keywords : extractKeywords(id),
        grammarId: card.id,
        level    : card.level
      });
    });
  });
  return pool;
};

// ─────────────────────────────────────────────
// § 2  KEYWORD EXTRACTOR
// Kata konten penting (bukan partikel/kopula pendek).
// ─────────────────────────────────────────────

const STOPWORDS_ID = new Set([
  'adalah','yang','di','ke','dari','dan','atau','dengan','untuk',
  'pada','dalam','ini','itu','tidak','sudah','akan','juga','nya',
  'saya','aku','kamu','dia','mereka','kami','kita','ada'
]);

function extractKeywords(idStr) {
  return idStr
    .toLowerCase()
    .replace(/[.,!?;:]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS_ID.has(w));
}

// ─────────────────────────────────────────────
// § 3  TEMPLATE ENGINE  (Fase 2 — generator)
// Slot syntax: {SUBJ} {VERB_MASU} {OBJ} {PLACE} {TIME} dsb.
// Setiap template punya jp_tpl + id_tpl.
// ─────────────────────────────────────────────

const VOCAB = {
  SUBJ: [
    { jp:'私',      id:'saya' },
    { jp:'彼',      id:'dia (laki-laki)' },
    { jp:'彼女',    id:'dia (perempuan)' },
    { jp:'田中さん',id:'Tanaka-san' },
    { jp:'学生',    id:'murid' },
    { jp:'先生',    id:'guru' },
  ],
  OBJ: [
    { jp:'本',      id:'buku' },
    { jp:'ご飯',    id:'nasi' },
    { jp:'水',      id:'air' },
    { jp:'映画',    id:'film' },
    { jp:'日本語',  id:'bahasa Jepang' },
    { jp:'レポート',id:'laporan' },
  ],
  PLACE: [
    { jp:'学校',    id:'sekolah' },
    { jp:'図書館',  id:'perpustakaan' },
    { jp:'家',      id:'rumah' },
    { jp:'駅',      id:'stasiun' },
    { jp:'公園',    id:'taman' },
  ],
  TIME: [
    { jp:'毎日',    id:'setiap hari' },
    { jp:'昨日',    id:'kemarin' },
    { jp:'明日',    id:'besok' },
    { jp:'今',      id:'sekarang' },
    { jp:'もうすぐ',id:'sebentar lagi' },
  ],
  // Verb groups — bentuk sudah di-conjugate per template
  VERB_MASU: [
    { jp:'食べます',  id:'makan' },
    { jp:'飲みます',  id:'minum' },
    { jp:'読みます',  id:'membaca' },
    { jp:'書きます',  id:'menulis' },
    { jp:'見ます',    id:'menonton / melihat' },
    { jp:'行きます',  id:'pergi' },
    { jp:'来ます',    id:'datang' },
    { jp:'します',    id:'melakukan' },
    { jp:'勉強します',id:'belajar' },
  ],
  VERB_TE: [
    { jp:'食べて',    id:'makan (dan/lalu)' },
    { jp:'飲んで',    id:'minum (dan/lalu)' },
    { jp:'読んで',    id:'membaca (dan/lalu)' },
    { jp:'行って',    id:'pergi (dan/lalu)' },
    { jp:'して',      id:'melakukan (dan/lalu)' },
  ],
  ADJ_I: [
    { jp:'おいしい',  id:'enak' },
    { jp:'難しい',    id:'sulit' },
    { jp:'楽しい',    id:'menyenangkan' },
    { jp:'忙しい',    id:'sibuk' },
  ],
  ADJ_NA: [
    { jp:'静か',      id:'tenang' },
    { jp:'有名',      id:'terkenal' },
    { jp:'大切',      id:'penting' },
    { jp:'元気',      id:'sehat / bersemangat' },
  ],
};

/**
 * Template list.
 * jp_tpl & id_tpl: gunakan {SLOT} untuk placeholder.
 * level: grammar level target.
 * grammarHint: pola yang dilatih (opsional, untuk UI).
 */
const TEMPLATES = [
  // N4 basic
  {
    jp_tpl : '{SUBJ}は{OBJ}を{VERB_MASU}。',
    id_tpl : '{SUBJ} {VERB_MASU} {OBJ}.',
    slots  : ['SUBJ','OBJ','VERB_MASU'],
    level  : 'n4',
    grammarHint: 'は〜を〜ます'
  },
  {
    jp_tpl : '{TIME}、{SUBJ}は{PLACE}に{VERB_MASU}。',
    id_tpl : '{TIME}, {SUBJ} {VERB_MASU} ke {PLACE}.',
    slots  : ['TIME','SUBJ','PLACE','VERB_MASU'],
    level  : 'n4',
    grammarHint: '〜に行きます'
  },
  {
    jp_tpl : '{SUBJ}は{ADJ_I}です。',
    id_tpl : '{SUBJ} {ADJ_I}.',
    slots  : ['SUBJ','ADJ_I'],
    level  : 'n4',
    grammarHint: '〜は〜です (い形)'
  },
  {
    jp_tpl : '{PLACE}は{ADJ_NA}です。',
    id_tpl : '{PLACE} {ADJ_NA}.',
    slots  : ['PLACE','ADJ_NA'],
    level  : 'n4',
    grammarHint: '〜は〜です (な形)'
  },
  // N3 — te-form chaining
  {
    jp_tpl : '{SUBJ}は{PLACE}に{VERB_TE}、{OBJ}を{VERB_MASU}。',
    id_tpl : '{SUBJ} pergi ke {PLACE}, lalu {VERB_MASU} {OBJ}.',
    slots  : ['SUBJ','PLACE','VERB_TE','OBJ','VERB_MASU'],
    level  : 'n3',
    grammarHint: '〜て、〜ます'
  },
  {
    jp_tpl : '{OBJ}は{SUBJ}に{VERB_TE}います。',
    id_tpl : '{OBJ} sedang di-{VERB_TE} oleh {SUBJ}.',
    slots  : ['OBJ','SUBJ','VERB_TE'],
    level  : 'n3',
    grammarHint: '〜ている (passive nuance)'
  },
];

// ─────────────────────────────────────────────
// § 4  GENERATOR
// ─────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillTemplate(tpl, slotValues) {
  return tpl.replace(/\{(\w+)\}/g, (_, key) => slotValues[key] || `{${key}}`);
}

/**
 * langGenerate(options?)
 * options: { level: 'n3'|'n4', grammarHint: string }
 * Returns standar output object.
 */
window.langGenerate = function(options = {}) {
  const candidates = options.level
    ? TEMPLATES.filter(t => t.level === options.level)
    : TEMPLATES;

  const tmpl = pick(candidates);
  const jpVals = {}, idVals = {};

  tmpl.slots.forEach(slot => {
    const entry = pick(VOCAB[slot] || [{ jp: '？', id: '?' }]);
    jpVals[slot] = entry.jp;
    idVals[slot] = entry.id;
  });

  const jp = fillTemplate(tmpl.jp_tpl, jpVals);
  const id = fillTemplate(tmpl.id_tpl, idVals);

  return {
    jp,
    id,
    keywords   : extractKeywords(id),
    grammarHint: tmpl.grammarHint,
    level      : tmpl.level,
    generated  : true   // flag: bukan dari bank soal
  };
};

// ─────────────────────────────────────────────
// § 5  UNIFIED PROVIDER
// Sumber data untuk quiz-typetr.js — abstrak, bisa swap.
// ─────────────────────────────────────────────

let _poolCache = null;

/**
 * langGetQuestion(options?)
 * options: { level, preferPool, grammarId }
 * preferPool=true → ambil dari pool dulu, fallback ke generator
 * preferPool=false → selalu generate
 */
window.langGetQuestion = function(options = {}) {
  const preferPool = options.preferPool !== false;

  if (preferPool) {
    if (!_poolCache) {
      _poolCache = window.langExtractPool(window.grammarData || []);
    }
    const pool = options.level
      ? _poolCache.filter(q => q.level === options.level)
      : _poolCache;

    if (pool.length > 0) return pick(pool);
  }

  return window.langGenerate(options);
};

// Expose untuk dev/debug
window._langVOCAB     = VOCAB;
window._langTEMPLATES = TEMPLATES;
