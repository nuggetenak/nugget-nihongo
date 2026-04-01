// ══════════════════════════════════════════════════════
//  js/quiz-generator.js — Nugget Nihongo
//  Generates quiz questions dynamically from vocabDB + grammarData
//  Load SETELAH vocab-index.js, grammar-query.js, conjugation-engine.js
// ══════════════════════════════════════════════════════

(function () {

// ── Config ─────────────────────────────────────────────
const CFG = {
  DISTRACTOR_POOL : 4,   // jumlah pilihan salah untuk multichoice
  MIN_POOL        : 4,   // minimum pool sebelum generate soal
  MAX_BATCH       : 20,  // max soal per sesi generated
};

// ── Public API ─────────────────────────────────────────

/**
 * Generate quiz deck dari vocab
 * @param {object} opts
 * @param {'flashcard'|'multichoice_meaning'|'multichoice_reading'|'fill_word'|'conjugation_vocab'} opts.type
 * @param {string}  opts.jlpt     — 'n5'|'n4'|'n3'|'n2'|'n1'|'all'
 * @param {string}  opts.pos      — filter by part of speech (opsional)
 * @param {string}  opts.domain   — filter by domain (opsional)
 * @param {number}  opts.n        — jumlah soal (default 10)
 * @returns QuizItem[]
 */
window.generateVocabQuiz = function (opts = {}) {
  const { type = 'multichoice_meaning', jlpt, pos, domain, n = 10 } = opts;

  const filter = {};
  if (jlpt && jlpt !== 'all') filter.jlpt = jlpt;
  if (pos)    filter.pos    = pos;
  if (domain) filter.domain = domain;

  const pool = window.queryVocab ? window.queryVocab(filter) : [];
  if (pool.length < CFG.MIN_POOL) return [];

  const sample = _shuffle(pool).slice(0, Math.min(n, CFG.MAX_BATCH));
  const allPool = window.vocabDB || pool;

  switch (type) {
    case 'flashcard':             return sample.map(_makeFlashcard);
    case 'multichoice_meaning':   return sample.map(v => _makeMultichoiceMeaning(v, allPool));
    case 'multichoice_reading':   return sample.map(v => _makeMultichoiceReading(v, allPool));
    case 'fill_word':             return sample.filter(v => v.examples.length > 0).map(_makeFillWord);
    case 'conjugation_vocab':     return sample.filter(v => v.conj_type).map(v => _makeConjugationVocab(v));
    default:                      return sample.map(_makeFlashcard);
  }
};

/**
 * Generate quiz dari grammarData
 * @param {object} opts
 * @param {'flashcard'|'multichoice_grammar'|'fill_grammar'} opts.type
 * @param {string} opts.level
 * @param {number} opts.week
 * @param {number} opts.n
 * @returns QuizItem[]
 */
window.generateGrammarQuiz = function (opts = {}) {
  const { type = 'flashcard', level, week, n = 10 } = opts;

  const filter = { excludeDummy: true };
  if (level) filter.level = level;
  if (week)  filter.week  = week;

  const pool = window.queryGrammar ? window.queryGrammar(filter) : [];
  if (pool.length < 1) return [];

  const sample = _shuffle(pool).slice(0, Math.min(n, CFG.MAX_BATCH));
  const allPool = window.grammarData || pool;

  switch (type) {
    case 'flashcard':         return sample.map(_makeGrammarFlashcard);
    case 'multichoice_grammar': return sample.map(c => _makeMultichoiceGrammar(c, allPool));
    case 'fill_grammar':      return sample.filter(c => c.examples?.length > 0).map(_makeFillGrammar);
    default:                  return sample.map(_makeGrammarFlashcard);
  }
};

/**
 * Mixed quiz — vocab + grammar interleaved
 * Berguna untuk review session harian
 */
window.generateMixedQuiz = function (opts = {}) {
  const { jlpt, level, n = 10 } = opts;
  const half = Math.floor(n / 2);

  const vocab   = window.generateVocabQuiz({ type: 'multichoice_meaning', jlpt, n: half });
  const grammar = window.generateGrammarQuiz({ type: 'flashcard', level: level || jlpt, n: n - half });

  return _shuffle([...vocab, ...grammar]);
};

// ── Flashcard makers ───────────────────────────────────

function _makeFlashcard(v) {
  return {
    type: 'flashcard_vocab',
    id: v.id,
    front: v.word,
    front_sub: v.reading,
    back: v.meaning_id,
    back_en: v.meaning_en,
    nuance: v.nuance,
    pos: v.pos,
    jlpt: v.jlpt,
    source: 'vocab',
    entry: v,
  };
}

function _makeGrammarFlashcard(c) {
  return {
    type: 'flashcard_grammar',
    id: c.id,
    front: c.grammar,
    front_sub: c.reading,
    back: c.meaning,
    desc: c.desc,
    nuance: c.nuance,
    examples: c.examples,
    level: c.level,
    source: 'grammar',
    entry: c,
  };
}

// ── Multichoice makers ─────────────────────────────────

function _makeMultichoiceMeaning(v, allPool) {
  const distractors = _pickDistractors(allPool, v, 'meaning_id', CFG.DISTRACTOR_POOL);
  const choices = _shuffle([v.meaning_id, ...distractors]);
  return {
    type: 'multichoice_meaning',
    id: v.id,
    prompt: v.word,
    prompt_sub: v.reading,
    question: `Apa arti dari "${v.word}"?`,
    choices,
    answer: v.meaning_id,
    jlpt: v.jlpt,
    source: 'vocab',
    entry: v,
  };
}

function _makeMultichoiceReading(v, allPool) {
  const distractors = _pickDistractors(allPool, v, 'reading', CFG.DISTRACTOR_POOL);
  const choices = _shuffle([v.reading, ...distractors]);
  return {
    type: 'multichoice_reading',
    id: v.id,
    prompt: v.word,
    question: `Bagaimana cara baca "${v.word}"?`,
    choices,
    answer: v.reading,
    jlpt: v.jlpt,
    source: 'vocab',
    entry: v,
  };
}

function _makeMultichoiceGrammar(c, allPool) {
  const sameLevel = allPool.filter(x => x.level === c.level && x.id !== c.id && x.cat !== 'dummy');
  const distractors = _shuffle(sameLevel).slice(0, CFG.DISTRACTOR_POOL).map(x => x.meaning);
  const choices = _shuffle([c.meaning, ...distractors]);
  return {
    type: 'multichoice_grammar',
    id: c.id,
    prompt: c.grammar,
    prompt_sub: c.reading,
    question: `Apa arti dari pola "${c.grammar}"?`,
    choices,
    answer: c.meaning,
    level: c.level,
    source: 'grammar',
    entry: c,
  };
}

// ── Fill-in makers ─────────────────────────────────────

function _makeFillWord(v) {
  // Pakai contoh kalimat pertama, blank-kan kata targetnya
  const ex = v.examples[0];
  const jp = ex.jp;

  // Cari kata dalam kalimat — coba reading atau kata
  let blanked = jp;
  const targets = [v.word, v.reading];
  for (const t of targets) {
    if (jp.includes(t)) {
      blanked = jp.replace(t, '＿＿＿');
      break;
    }
  }
  // Fallback: kalimat utuh sebagai konteks
  if (blanked === jp) blanked = jp + ' (isi: ＿＿＿)';

  return {
    type: 'fill_word',
    id: v.id,
    prompt: blanked,
    context_id: ex.id,
    answer: v.word,
    answer_reading: v.reading,
    meaning: v.meaning_id,
    jlpt: v.jlpt,
    source: 'vocab',
    entry: v,
  };
}

function _makeFillGrammar(c) {
  const ex = c.examples[0];
  // Cari pola grammar dalam kalimat (remove 〜 markers)
  const patternCore = c.grammar.replace(/[〜～＋\s]/g, '');
  let jp = ex.jp;

  // Coba extract dari bold tags
  const boldMatch = jp.match(/<b>(.*?)<\/b>/);
  const blankTarget = boldMatch ? boldMatch[1] : null;

  const blanked = blankTarget
    ? jp.replace(`<b>${blankTarget}</b>`, '<b>＿＿＿</b>')
    : jp;

  return {
    type: 'fill_grammar',
    id: c.id,
    prompt: blanked,
    context_id: ex.id,
    answer: blankTarget || patternCore,
    meaning: c.meaning,
    grammar: c.grammar,
    level: c.level,
    source: 'grammar',
    entry: c,
  };
}

// ── Conjugation from vocab ─────────────────────────────

const CONJ_FORMS = ['masu','nai','ta','te','potential','passive'];

function _makeConjugationVocab(v) {
  const form = CONJ_FORMS[Math.floor(Math.random() * CONJ_FORMS.length)];
  let answer = null;
  if (window.conjugate) {
    try { answer = window.conjugate(v.reading, form); } catch(e) {}
  }

  const formLabels = {
    masu:'bentuk sopan (ます)', nai:'bentuk negatif (ない)',
    ta:'bentuk lampau (た)', te:'bentuk て',
    potential:'bentuk potensial', passive:'bentuk pasif',
  };

  return {
    type: 'conjugation_vocab',
    id: v.id,
    prompt: `${v.word}（${v.reading}）`,
    question: `Ubah ke ${formLabels[form] || form}:`,
    form,
    answer: answer || '(lihat referensi)',
    meaning: v.meaning_id,
    jlpt: v.jlpt,
    source: 'vocab',
    entry: v,
  };
}

// ── Helpers ────────────────────────────────────────────

function _shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function _pickDistractors(pool, target, field, n) {
  // Pilih dari pool yang SAMA jlpt/level dulu, fallback ke semua
  const sameLevel = pool.filter(x => x.id !== target.id && x.jlpt === target.jlpt && x[field]);
  const source = sameLevel.length >= n ? sameLevel : pool.filter(x => x.id !== target.id && x[field]);
  return _shuffle(source).slice(0, n).map(x => x[field]);
}

// ── Expose diagnostics ─────────────────────────────────
window.quizGeneratorStats = function () {
  const vocab   = window.vocabDB?.length || 0;
  const grammar = (window.grammarData || []).filter(c => c.cat !== 'dummy').length;
  return { vocab, grammar, total: vocab + grammar };
};

})();
