#!/usr/bin/env node
/**
 * expand-n2-n1-vocab.js (now expanded to cover N5, N4, N3, N2, N1)
 * Expands vocabulary datasets from OpenJLPT across all levels to match standard benchmarks (like Bunpro).
 * Outputs staged files to public/data/staged-expansion/vocab/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const WORKSPACE_ROOT = path.join(REPO, '..');
const OPENJLPT_DIR = path.join(WORKSPACE_ROOT, 'open-source-datasets/jlpt-openjlpt/vocab');
const STAGED_DIR = path.join(REPO, 'public/data/staged-expansion/vocab');
const PROD_VOCAB_DIR = path.join(REPO, 'public/data/vocab');

fs.mkdirSync(STAGED_DIR, { recursive: true });

// Rich English-to-Indonesian dictionary for N5-N1
const EN_ID_MAP = {
  // Common N5/N4 core words
  'red': 'merah',
  'blue': 'biru',
  'black': 'hitam',
  'white': 'putih',
  'yellow': 'kuning',
  'brown': 'cokelat',
  'morning': 'pagi',
  'breakfast': 'sarapan',
  'lunch': 'makan siang',
  'dinner': 'makan malam',
  'autumn': 'musim gugur',
  'fall': 'musim gugur / jatuh',
  'spring': 'musim semi',
  'summer': 'musim panas',
  'winter': 'musim dingin',
  'day after tomorrow': 'lusa',
  'tomorrow': 'besok',
  'yesterday': 'kemarin',
  'infant': 'bayi',
  'baby': 'bayi',
  'to greet': 'menyapa',
  'greeting': 'salam; sapaan',
  'salutation': 'sapaan / salam',
  'to match': 'cocok; pas',
  'a space': 'ruang; jeda waktu; celah',
  'space': 'ruang / celah',
  'ice cream': 'es krim',
  'electric iron': 'setrika listrik',
  'iron': 'setrika',
  'room': 'kamar; ruangan',
  'time to spare': 'waktu luang',
  'to get tired of': 'bosan; jenuh',
  'to lose interest in': 'hilang minat; bosan',
  'like that': 'seperti itu',
  'father': 'ayah',
  'mother': 'ibu',
  'older brother': 'kakak laki-laki',
  'older sister': 'kakak perempuan',
  'younger brother': 'adik laki-laki',
  'younger sister': 'adik perempuan',
  'umbrella': 'payung',
  'shoes': 'sepatu',
  'hat': 'topi',
  'cap': 'topi',
  'clothes': 'pakaian',
  'bag': 'tas',
  'station': 'stasiun',
  'train': 'kereta',
  'airplane': 'pesawat',
  'bicycle': 'sepeda',
  'bus': 'bus',
  'car': 'mobil',
  'hospital': 'rumah sakit',
  'doctor': 'dokter',
  'nurse': 'perawat',
  'student': 'siswa / murid',
  'teacher': 'guru',
  'school': 'sekolah',
  'company': 'perusahaan',
  'bank': 'bank',
  'convenience store': 'minimarket',
  'supermarket': 'supermarket',
  'park': 'taman',
  'mountain': 'gunung',
  'river': 'sungai',
  'sea': 'laut',
  'rain': 'hujan',
  'snow': 'salju',
  'weather': 'cuaca',
  'water': 'air',
  'tea': 'teh',
  'coffee': 'kopi',
  'bread': 'roti',
  'meat': 'daging',
  'fish': 'ikan',
  'egg': 'telur',
  'vegetable': 'sayuran',
  'fruit': 'buah-buahan',
  'delicious': 'enak / lezat',
  'hot': 'panas',
  'cold': 'dingin',
  'warm': 'hangat',
  'cool': 'sejuk',
  'big': 'besar',
  'small': 'kecil',
  'tall': 'tinggi',
  'short': 'pendek',
  'fast': 'cepat',
  'slow': 'lambat',
  'early': 'pagi / awal',
  'late': 'terlambat',
  'near': 'dekat',
  'far': 'jauh',
  'new': 'baru',
  'old': 'tua / lama',
  'good': 'bagus / baik',
  'bad': 'buruk / jelek',
  'difficult': 'sulit',
  'easy': 'mudah / gampang',
  'cheap': 'murah',
  'expensive': 'mahal',
  'clean': 'bersih',
  'dirty': 'kotor',
  'quiet': 'tenang / sunyi',
  'busy': 'sibuk',
  'convenient': 'praktis / nyaman',
  'inconvenient': 'tidak praktis',
  'happy': 'senang / gembira',
  'sad': 'sedih',
  'tired': 'lelah / capek',
  'sleepy': 'mengantuk',

  // Common verbs
  'to eat': 'makan',
  'to drink': 'minum',
  'to go': 'pergi',
  'to come': 'datang',
  'to return': 'pulang',
  'to see': 'melihat',
  'to watch': 'menonton',
  'to hear': 'mendengar',
  'to listen': 'mendengarkan',
  'to read': 'membaca',
  'to write': 'menulis',
  'to speak': 'berbicara',
  'to buy': 'membeli',
  'to sell': 'menjual',
  'to make': 'membuat',
  'to meet': 'bertemu',
  'to wait': 'menunggu',
  'to open': 'membuka',
  'to close': 'menutup',
  'to stand': 'berdiri',
  'to sit': 'duduk',
  'to sleep': 'tidur',
  'to wake up': 'bangun',
  'to wash': 'mencuci',
  'to take': 'mengambil',
  'to put': 'meletakkan',
  'to give': 'memberi',
  'to receive': 'menerima',
  'to teach': 'mengajar',
  'to learn': 'belajar',
  'to lend': 'meminjamkan',
  'to borrow': 'meminjam',
  'to send': 'mengirim',
  'to walk': 'berjalan',
  'to run': 'berlari',
  'to play': 'bermain',
  'to sing': 'menyanyi',
  'to swim': 'berenang',
  'to enter': 'masuk',
  'to exit': 'keluar',
  'to remember': 'mengingat',
  'to forget': 'lupa / melupakan',
  'to understand': 'mengerti / memahami',
  'to know': 'mengetahui / kenal',
  'to think': 'berpikir',
  'to call': 'memanggil / menelepon',
  'to say': 'berkata',
  'to use': 'menggunakan',
  'to help': 'membantu',
  'to start': 'memulai',
  'to finish': 'selesai / mengakhiri',
  'to live': 'tinggal / hidup',
  'to work': 'bekerja',
  'to pay': 'membayar',

  // Higher level terms
  'discount': 'diskon; potongan harga',
  'division': 'pembagian',
  'relatively': 'relatif; lumayan',
  'bowl': 'mangkuk',
  'dress': 'gaun',
  'as usual': 'seperti biasa',
  'as ever': 'seperti biasa',
  'same': 'sama'
};

function translateEnToId(meanings) {
  if (!meanings || meanings.length === 0) return '';
  const first = meanings[0].toLowerCase().trim();
  
  if (EN_ID_MAP[first]) return EN_ID_MAP[first];

  // Try matching without punctuation or qualifiers
  const cleanFirst = first.replace(/\([^)]*\)/g, '').trim();
  if (EN_ID_MAP[cleanFirst]) return EN_ID_MAP[cleanFirst];

  if (first.startsWith('to ')) {
    const verbBase = cleanFirst.slice(3).trim();
    if (EN_ID_MAP[verbBase]) {
      return EN_ID_MAP[verbBase];
    }
    if (EN_ID_MAP[`to ${verbBase}`]) {
      return EN_ID_MAP[`to ${verbBase}`];
    }
    return `me-${verbBase}`;
  }

  // Fallback: take up to 2 meanings cleanly
  return meanings.slice(0, 2).join('; ');
}

function mapPos(posList) {
  if (!posList || !Array.isArray(posList)) return 'noun';
  const str = posList.join(' ');
  if (str.includes('v1')) return 'verb-ichidan';
  if (str.includes('v5')) return 'verb-godan';
  if (str.includes('vs')) return 'verb-suru';
  if (str.includes('vk')) return 'verb-kuru';
  if (str.includes('adj-i')) return 'i-adj';
  if (str.includes('adj-na')) return 'na-adj';
  if (str.includes('adv')) return 'adverb';
  if (str.includes('exp')) return 'expression';
  return 'noun';
}

function getPosPrefix(pos) {
  if (pos.startsWith('verb')) return 'vg';
  if (pos.includes('adj')) return 'ag';
  if (pos === 'adverb') return 'adv';
  if (pos === 'expression') return 'exp';
  return 'ng';
}

function processLevel(lvl) {
  console.log(`\nProcessing ${lvl.toUpperCase()}...`);
  const openJlptPath = path.join(OPENJLPT_DIR, `${lvl}.json`);
  if (!fs.existsSync(openJlptPath)) {
    console.error(`Missing OpenJLPT file: ${openJlptPath}`);
    return;
  }

  const rawItems = JSON.parse(fs.readFileSync(openJlptPath, 'utf8'));

  // Load existing words to avoid duplicate words
  const prodFile = path.join(PROD_VOCAB_DIR, `vocab-${lvl}.js`);
  const existingWords = new Set();
  let maxIdNum = 0;

  if (fs.existsSync(prodFile)) {
    const prodContent = fs.readFileSync(prodFile, 'utf8');
    const wordMatches = prodContent.match(/"word":\s*"([^"]+)"/g) || [];
    for (const m of wordMatches) {
      const w = m.match(/"word":\s*"([^"]+)"/)[1];
      existingWords.add(w);
    }
    const idMatches = prodContent.match(/([a-z]+-n\d-(\d+))/g) || [];
    for (const m of idMatches) {
      const num = parseInt(m.split('-')[2], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  }

  console.log(`Existing ${lvl.toUpperCase()} words: ${existingWords.size}, Current Max ID Num: ${maxIdNum}`);

  const stagedList = [];
  let addedCount = 0;

  for (const item of rawItems) {
    const wordText = item.word || item.reading;
    if (existingWords.has(wordText)) {
      continue; // Skip already existing word
    }
    existingWords.add(wordText);

    maxIdNum++;
    const pos = mapPos(item.pos);
    const prefix = getPosPrefix(pos);
    const id = `${prefix}-${lvl}-${String(maxIdNum).padStart(5, '0')}`;

    const meaningEn = (item.meanings || []).join('; ');
    const meaningId = translateEnToId(item.meanings);

    // Examples from Tatoeba in OpenJLPT
    const examples = (item.examples || []).slice(0, 2).map(ex => ({
      jp: ex.ja,
      id: ex.en ? `[Terjemahan] ${ex.en}` : `Contoh penggunaan kosakata ${wordText}.`,
      level: lvl,
      tags: ['umum']
    }));

    const formalityScore = lvl === 'n1' ? 4 : (lvl === 'n2' ? 3 : 2);
    const registerType = (lvl === 'n1' || lvl === 'n2') ? 'formal' : 'standard';

    const entry = {
      id,
      word: wordText,
      reading: item.reading || wordText,
      romaji: item.romaji || '',
      meaning_id: meaningId || meaningEn,
      meaning_en: meaningEn,
      jlpt: lvl,
      pos,
      common: true,
      related_grammar: [],
      formalitas: formalityScore,
      domain: ['umum', 'kehidupan-sehari-hari'],
      register: registerType,
      lawan_bicara: ['rekan-kerja', 'umum'],
      nuance: `Kosakata level ${lvl.toUpperCase()}: perbendaharaan kata penting untuk pemahaman standar JLPT.`,
      examples: examples.length > 0 ? examples : [
        {
          jp: `${wordText}を使います。`,
          id: `Menggunakan ${meaningId || wordText}.`,
          level: lvl,
          tags: ['umum']
        }
      ]
    };

    stagedList.push(entry);
    addedCount++;
  }

  console.log(`Added ${addedCount} new words to staged ${lvl.toUpperCase()} (Total in staged: ${stagedList.length})`);

  // Write JSON
  const jsonPath = path.join(STAGED_DIR, `${lvl}-staged.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(stagedList, null, 2), 'utf8');

  // Write JS
  const capLvl = lvl.toUpperCase();
  const varName = `window.stagedVocab${capLvl}`;
  const jsContent = `// ${lvl}-staged.js — Staged Expansion for ${capLvl}
// Total New Entries: ${stagedList.length}
// Generated: ${new Date().toISOString().slice(0, 10)}
${varName} = ${JSON.stringify(stagedList, null, 2)};
`;
  const jsPath = path.join(STAGED_DIR, `${lvl}-staged.js`);
  fs.writeFileSync(jsPath, jsContent, 'utf8');
}

// Process all levels N5, N4, N3, N2, N1
['n5', 'n4', 'n3', 'n2', 'n1'].forEach(lvl => processLevel(lvl));
console.log('\n✅ All-level vocab expansion processing complete.');
