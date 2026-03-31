// ══════════════════════════════════════════════════════
//  vocab-index.js — Nugget Nihongo Vocab DB
//  Merge semua level → window.vocabDB + window.vocabIdx
//  Load SETELAH semua vocab-nX.js dan book-*.js
//
//  ACTIVE sources (arsitektur unified, RESTRUKTURISASI-B v14.9.0):
//    vocabN5  — vocab-n5.js  (711 entries)
//    vocabN4  — vocab-n4.js  (692 entries)
//
//  PENDING (placeholder, belum aktif):
//    vocabN3  — vocab-n3.js  (tunggu data)
//    vocabN2  — vocab-n2.js  (tunggu data)
//    vocabN1  — vocab-n1.js  (tunggu data)
//
//  BOOK INDEX sources (bukan entries — hanya referensi id):
//    window.bookMinna1       — book-minna-1.js
//    window.bookMinna2       — book-minna-2.js
//    window.bookIrodoriA1    — book-irodori-a1.js
//    window.bookIrodoriA2_1  — book-irodori-a2-1.js
//    window.bookIrodoriA2_2  — book-irodori-a2-2.js
// ══════════════════════════════════════════════════════

(function () {

// ── Merge semua level ──────────────────────────────────
window.vocabDB = [
  ...(window.vocabN5 || []),  // N5 unified — 711 entries (RESTRUKTURISASI-B v14.9.0)
  ...(window.vocabN4 || []),  // N4 unified — 692 entries (RESTRUKTURISASI-B v14.9.0)
  ...(window.vocabN3 || []),  // N3 — ACTIVATED v14.27.7 (70 entries)
  // ...(window.vocabN2 || []),  // N2 — tunggu data (placeholder)
  // ...(window.vocabN1 || []),  // N1 — tunggu data (placeholder)
];

// ── Helpers ───────────────────────────────────────────
function groupBy(arr, key) {
  const out = {};
  for (const item of arr) {
    const val = item[key];
    if (!out[val]) out[val] = [];
    out[val].push(item);
  }
  return out;
}

function invertIndex(arr, key) {
  const out = {};
  for (const item of arr) {
    const vals = item[key] || [];
    for (const v of vals) {
      if (!out[v]) out[v] = [];
      out[v].push(item);
    }
  }
  return out;
}

// ── Build O(1) index ──────────────────────────────────
window.buildVocabIndex = function () {
  window.vocabIdx = {
    byId      : new Map(window.vocabDB.map(v => [v.id, v])),
    byPos     : groupBy(window.vocabDB, 'pos'),
    byJlpt    : groupBy(window.vocabDB, 'jlpt'),
    byDomain  : invertIndex(window.vocabDB, 'domain'),
    byRegister: groupBy(window.vocabDB, 'register'),
    byBook    : buildBookIndex(),   // { 'minna-no-nihongo-1': { 1: VocabEntry[], 2: ... } }
  };
};

// ── Book index builder ────────────────────────────────
function buildBookIndex() {
  const idMap = new Map(window.vocabDB.map(v => [v.id, v]));
  const result = {};

  const books = [
    window.bookMinna1,
    window.bookMinna2,
    window.bookIrodoriA1,
    window.bookIrodoriA2_1,
    window.bookIrodoriA2_2,
  ].filter(Boolean);

  for (const book of books) {
    const key = book.meta.book;
    result[key] = {};
    const sections = book.chapters || book.units || {};
    for (const [num, data] of Object.entries(sections)) {
      result[key][num] = (data.vocab_ids || [])
        .map(id => idMap.get(id))
        .filter(Boolean);
    }
  }
  return result;
}

// ── Query helpers (dipakai quiz-generator & detail.js) ─
/**
 * Ambil vocab berdasarkan filter
 * @param {{ jlpt, pos, domain, register, common }} filter
 * @returns VocabEntry[]
 */
window.queryVocab = function (filter = {}) {
  const idx = window.vocabIdx;
  if (!idx) return [];

  let pool = filter.jlpt   ? (idx.byJlpt[filter.jlpt] || [])
           : filter.domain ? (idx.byDomain[filter.domain] || [])
           : filter.pos    ? (idx.byPos[filter.pos] || [])
           : window.vocabDB;

  if (filter.pos      && filter.jlpt) pool = pool.filter(v => v.pos === filter.pos);
  if (filter.domain   && filter.jlpt) pool = pool.filter(v => v.domain?.includes(filter.domain));
  if (filter.register) pool = pool.filter(v => v.register === filter.register);
  if (filter.common)   pool = pool.filter(v => v.common === true);
  if (filter.formalitas !== undefined)
    pool = pool.filter(v => v.formalitas === filter.formalitas);

  return pool;
};

/** Ambil satu vocab by id */
window.getVocab = function (id) {
  return window.vocabIdx?.byId.get(id) || null;
};

/**
 * Ambil vocab dari buku + chapter/unit tertentu
 * @param {string} book     — e.g. 'minna-no-nihongo-1'
 * @param {number|number[]} chapters — chapter number, atau array chapters
 * @returns VocabEntry[]
 */
window.queryVocabByBook = function (book, chapters) {
  const bookIdx = window.vocabIdx?.byBook?.[book];
  if (!bookIdx) return [];
  const keys = Array.isArray(chapters) ? chapters : [chapters];
  const result = [];
  for (const k of keys) {
    result.push(...(bookIdx[k] || []));
  }
  return result;
};

/**
 * Daftar semua buku yang tersedia di index
 * @returns string[]
 */
window.listBooks = function () {
  return Object.keys(window.vocabIdx?.byBook || {});
};

/** Ambil random N entry dari pool */
window.sampleVocab = function (filter = {}, n = 10) {
  const pool = window.queryVocab(filter);
  return pool.sort(() => Math.random() - 0.5).slice(0, n);
};

})();
