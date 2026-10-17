/**
 * scripts/translate-pipeline.js
 * Ingests unique untranslated and pseudo-Indonesian phrases and builds
 * an authoritative, high-quality Indonesian translation dictionary.
 */

const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../tests/vocab_translation_cache.json');
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

// ── 1. Curated Dictionary Overrides (High-Stakes & High-Frequency) ──
const CURATED = {
  // Days of week
  'Monday': 'Senin',
  'Tuesday': 'Selasa',
  'Wednesday': 'Rabu',
  'Thursday': 'Kamis',
  'Friday': 'Jumat',
  'Saturday': 'Sabtu',
  'Sunday': 'Minggu',

  // Time expressions
  'day before yesterday': 'kemarin lusa',
  'yesterday': 'kemarin',
  'today': 'hari ini',
  'tomorrow': 'besok',
  'day after tomorrow': 'lusa',
  'this morning': 'pagi ini',
  'this evening': 'malam ini',
  'tonight': 'malam ini',
  'this week': 'minggu ini',
  'last week': 'minggu lalu',
  'next week': 'minggu depan',
  'this month': 'bulan ini',
  'last month': 'bulan lalu',
  'next month': 'bulan depan',
  'this year': 'tahun ini',
  'last year': 'tahun lalu',
  'next year': 'tahun depan',
  'year before last': 'dua tahun lalu',
  'year after next': 'dua tahun lagi',
  'every day': 'setiap hari',
  'every week': 'setiap minggu',
  'every month': 'setiap bulan',
  'every year': 'setiap tahun',
  'beginning': 'awal / permulaan',
  'for the first time': 'pertama kali',
  'half minute': 'setengah menit',
  'evening; night': 'malam / petang',

  // Common Nouns & Adverbs
  'not very': 'tidak begitu',
  'meaning': 'arti / makna',
  'always': 'selalu',
  'now': 'sekarang',
  'all': 'semua / seluruh',
  'very': 'sangat',
  'probably': 'mungkin',
  'gradually': 'berangsur-angsur',
  'exactly': 'tepat / persis',
  'somewhat': 'agak / sedikit',
  'test': 'ujian / tes',
  'telephone': 'telepon',
  'please': 'silakan / tolong',
  'again; and': 'lagi / dan',
  'yet; still': 'masih / belum',
  'already': 'sudah',
  'again': 'lagi / kembali',
  'more': 'lebih',
  'often; well': 'sering / dengan baik',
  'cuisine': 'masakan / kuliner',
  'job': 'pekerjaan',
  'economy': 'ekonomi',
  'lesson; class work': 'pelajaran',
  'instantly': 'seketika',
  'foot; leg': 'kaki',
  'head': 'kepala',
  'candy': 'permen',
  'Thank you': 'terima kasih',
  'part-time job': 'kerja paruh waktu (baito)',
  'relief': 'rasa lega / tenang',
  'within': 'dalam / di antara',
  'meeting': 'rapat',
  'apartment': 'apartemen',

  // High-frequency pseudo-Indonesian verbs
  'me-download': 'mengunduh',
  'me-confirm': 'mengonfirmasi',
  'me-check': 'memeriksa',
  'me-bathe': 'mandi',
  'me-be': 'ada',
  'me-need': 'membutuhkan',
  'me-get up': 'bangun',
  'me-return something': 'mengembalikan',
  'me-take time or money': 'memakan waktu atau biaya',
  'me-call by phone': 'menelepon',
  'me-cut': 'memotong',
  'me-erase': 'menghapus',
  'me-answer': 'menjawab',
  'me-be worried': 'merasa cemas / khawatir',
  'me-die': 'meninggal / mati',
  'me-tie': 'mengikat',
  'me-close something': 'menutup',
  'me-live in': 'tinggal di',
  'me-do': 'melakukan',
  'me-put out': 'mengeluarkan',
  'me-ask': 'bertanya',
  'me-differ': 'berbeda',
  'me-arrive at': 'tiba di',
  'me-turn on': 'menyalakan',
  'me-be able to': 'bisa / sanggup',
  'me-appear': 'muncul',
  'me-take something': 'mengambil',
  'me-make a sound': 'berbunyi',
  'me-line up': 'berbaris',
  'me-become': 'menjadi',
  'me-take off clothes': 'melepas pakaian',
  'me-wear': 'memakai',
  'me-begin': 'memulai',
  'me-stick': 'menempel',
  'me-play an instrument with strings': 'memetik / memainkan alat musik dawai',
  'me-hold': 'memegang',
  'me-rest': 'beristirahat',
  'me-practice': 'berlatih',
  'me-hand over': 'menyerahkan',
  'me-collect something': 'mengumpulkan',
  'me-apologize': 'meminta maaf',
  'me-guide': 'memandu',
  'me-hurry': 'terburu-buru / bergegas',
  'me-move': 'bergerak',
  'me-hit': 'memukul',
  'me-copy or photograph': 'menyalin / memotret',
  'me-move house or transfer': 'pindah rumah',
  'me-drive': 'mengemudi',
  'me-exercise': 'berolahraga',
  'me-get off': 'turun (kendaraan)',
  'me-break or to fold': 'mematahkan atau melipat',
  'me-change': 'mengubah',
  'me-tidy up': 'merapikan',
  'me-breathe': 'bernapas',
  'me-dilute': 'mengencerkan',
  'me-deny': 'menyangkal',
  'me-attack': 'menyerang',
  'me-curse': 'mengutuk',
  'me-behead': 'menebas',
  'me-serve sake': 'menuangkan sake',
  'me-be engulfed in': 'terbungkus',
  'me-send word': 'menyampaikan pesan',
  'me-be transparent': 'tembus pandang'
};

// Clean raw translation output
function cleanIndonesian(raw, origText) {
  if (!raw) return '';
  let str = raw.trim();

  // Strip unwanted English remnants or prepositions at start
  str = str.replace(/^untuk\s+/i, '');
  str = str.replace(/^sebuah\s+/i, '');
  str = str.replace(/^sang\s+/i, '');
  str = str.replace(/^para\s+/i, '');

  // Deduplicate semicolon-separated phrases (e.g. "kaki; kaki" -> "kaki")
  if (str.includes(';')) {
    const parts = str.split(';').map(p => p.trim()).filter(Boolean);
    const seen = new Set();
    const unique = [];
    for (const p of parts) {
      const lower = p.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        unique.push(p);
      }
    }
    str = unique.join('; ');
  }

  // Deduplicate comma-separated identical words (e.g. "rumah, rumah" -> "rumah")
  if (str.includes(',')) {
    const parts = str.split(',').map(p => p.trim()).filter(Boolean);
    const seen = new Set();
    const unique = [];
    for (const p of parts) {
      const lower = p.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        unique.push(p);
      }
    }
    str = unique.join(', ');
  }

  // Lowercase first letter if original wasn't capitalized (like days of week)
  if (origText && /^[a-z]/.test(origText)) {
    str = str.charAt(0).toLowerCase() + str.slice(1);
  }

  return str.trim();
}

// Convert pseudo-Indonesian verb to authentic verb
function formatVerb(trans, orig) {
  let v = trans;
  // If translation starts with 'panggilan', 'jawaban', convert to verb
  if (v === 'panggilan melalui telepon') return 'menelepon';
  if (v === 'jawaban') return 'menjawab';
  if (v === 'dasi') return 'mengikat';
  if (v === 'cepat' && orig && orig.includes('hurry')) return 'bergegas';
  if (v === 'panduan' && orig && orig.includes('guide')) return 'memandu';
  if (v === 'potong') return 'memotong';
  return v;
}

// Translate batch via Google Translate API
async function fetchGoogleTranslateBatch(items) {
  // Strip 'to ' prefix from English verbs for more natural translation
  const cleaned = items.map(s => {
    let t = s.replace(/^me-/, '').replace(/^to\s+/i, '').trim();
    return t;
  });

  const text = cleaned.join('\n');
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=' + encodeURIComponent(text);

  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) {
    throw new Error(`Google Translate error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  const rawTrans = data[0].map(x => x[0]).join('');
  const lines = rawTrans.split('\n');

  const result = {};
  for (let i = 0; i < items.length; i++) {
    const orig = items[i];
    let trans = (lines[i] || '').trim();
    trans = cleanIndonesian(trans, orig);
    if (orig.startsWith('me-')) {
      trans = formatVerb(trans, orig);
    }
    result[orig] = trans;
  }
  return result;
}

// Main runner to translate all needed strings
async function buildDictionary() {
  console.log('1. Gathering all phrases needing translation across public/data/vocab/ ...');
  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const cats = ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions'];

  const needed = new Set();

  for (const lvl of levels) {
    for (const cat of cats) {
      const file = path.join(__dirname, '../public/data/vocab', lvl, `${lvl}-${cat}.js`);
      if (!fs.existsSync(file)) continue;
      const content = fs.readFileSync(file, 'utf8');
      const sandbox = { window: {} };
      try { new Function('window', content)(sandbox.window); } catch (e) { continue; }
      const items = Object.values(sandbox.window)[0] || [];
      for (const item of items) {
        const mId = (item.meaning_id || '').trim();
        const mEn = (item.meaning_en || '').trim();

        if (/me-[a-zA-Z]/i.test(mId)) {
          needed.add(mId);
        }
        if (mId && mEn && mId.toLowerCase() === mEn.toLowerCase()) {
          needed.add(mEn);
        }
        if (mId && (mId.startsWith('to ') || mId.startsWith('the ') || mId.startsWith('a '))) {
          needed.add(mId);
        }
      }
    }
  }

  console.log(`Total unique phrases needing translation: ${needed.size}`);

  // Apply curated overrides first
  let cachedCount = 0;
  for (const [k, v] of Object.entries(CURATED)) {
    cache[k] = v;
  }

  const pending = [];
  for (const phrase of needed) {
    if (cache[phrase]) {
      cachedCount++;
    } else {
      pending.push(phrase);
    }
  }

  console.log(`Already in cache/curated: ${cachedCount}`);
  console.log(`Pending translation: ${pending.length}`);

  // Batch translate pending in chunks of 40
  const BATCH_SIZE = 40;
  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const chunk = pending.slice(i, i + BATCH_SIZE);
    process.stdout.write(`Translating chunk ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(pending.length / BATCH_SIZE)} (${chunk.length} items)... `);
    try {
      const transMap = await fetchGoogleTranslateBatch(chunk);
      for (const [orig, trans] of Object.entries(transMap)) {
        cache[orig] = trans || orig;
      }
      console.log('✓');
    } catch (err) {
      console.error('FAILED:', err.message);
      // Fallback: translate one by one or strip me-
      for (const item of chunk) {
        if (item.startsWith('me-')) {
          cache[item] = item.replace(/^me-/, '');
        }
      }
    }
    // Small delay to be polite
    await new Promise(r => setTimeout(r, 150));
  }

  // Save cache
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`Translation cache saved to ${CACHE_FILE} (${Object.keys(cache).length} entries)`);
}

if (require.main === module) {
  buildDictionary().catch(err => {
    console.error('Fatal:', err);
    process.exit(1);
  });
}

module.exports = { CURATED, cleanIndonesian, fetchGoogleTranslateBatch };
