const fs = require('fs');
const path = require('path');

const verbsFile = path.join(__dirname, '../public/data/vocab/n2/n2-verbs.js');
const adverbsFile = path.join(__dirname, '../public/data/vocab/n2/n2-adverbs.js');
const openjlptFile = path.join(__dirname, '../../open-source-datasets/jlpt-openjlpt/vocab/n2.json');

// 1. Read n2-verbs.js
const verbsContent = fs.readFileSync(verbsFile, 'utf8');
const sandbox = {};
new Function('window', verbsContent)(sandbox);
const allVerbsData = sandbox.vocabN2_Verbs || [];

console.log(`Original n2-verbs entries: ${allVerbsData.length}`);

const realVerbs = [];
const extractedAdverbs = [];

for (const item of allVerbsData) {
  const pos = (item.pos || '').toLowerCase();
  if (pos.includes('adv')) {
    extractedAdverbs.push(item);
  } else {
    realVerbs.push(item);
  }
}

console.log(`Extracted adverbs from n2-verbs: ${extractedAdverbs.length}`);
console.log(`Remaining real verbs: ${realVerbs.length}`);

// 2. Load openjlpt missing adverbs
const openjlpt = JSON.parse(fs.readFileSync(openjlptFile, 'utf8'));
const openAdv = openjlpt.filter(x => Array.isArray(x.pos) ? x.pos.some(p => p.startsWith('adv')) : (x.pos||'').includes('adv'));

const existingWords = new Set(extractedAdverbs.map(x => x.word));

const missing15 = [
  {
    word: 'あちらこちら',
    reading: 'あちらこちら',
    romaji: 'achirakochira',
    meaning_id: 'di sana-sini; ke sana kemari',
    meaning_en: 'here and there; all over',
    examples: [
      {
        jp: '旅行中、あちらこちらを観光した。',
        id: 'Selama perjalanan, saya jalan-jalan ke sana kemari melihat pemandangan.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: '生き生き',
    reading: 'いきいき',
    romaji: 'ikiiki',
    meaning_id: 'lincah; bersemangat; hidup',
    meaning_en: 'vividly; lively',
    examples: [
      {
        jp: '子供たちが生き生きと遊んでいる。',
        id: 'Anak-anak sedang bermain dengan lincah dan bersemangat.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'うっかり',
    reading: 'うっかり',
    romaji: 'ukkari',
    meaning_id: 'tanpa sengaja; ceroboh; lalai',
    meaning_en: 'carelessly; thoughtlessly; inadvertently',
    examples: [
      {
        jp: 'うっかり宿題を家に忘れてしまった。',
        id: 'Saya tidak sengaja meninggalkan PR di rumah karena ceroboh.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: '流石',
    reading: 'さすが',
    romaji: 'sasuga',
    meaning_id: 'seperti yang diharapkan; memang hebat; luar biasa',
    meaning_en: 'as one would expect; naturally; clever',
    examples: [
      {
        jp: '彼は流石にプロだけのことはある。',
        id: 'Dia memang pantas disebut profesional, luar biasa seperti yang diharapkan.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'すっきり',
    reading: 'すっきり',
    romaji: 'sukkiri',
    meaning_id: 'lega; segar; rapi',
    meaning_en: 'refreshed; clear; neat',
    examples: [
      {
        jp: 'シャワーを浴びてすっきりした。',
        id: 'Setelah mandi shower, rasanya sangat segar dan lega.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: '転々',
    reading: 'てんてん',
    romaji: 'tenten',
    meaning_id: 'berpindah-pindah tempat; berganti-ganti',
    meaning_en: 'moving from place to place',
    examples: [
      {
        jp: '仕事の都合で各地を転々とした。',
        id: 'Karena tuntutan pekerjaan, saya berpindah-pindah ke berbagai daerah.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'にこにこ',
    reading: 'にこにこ',
    romaji: 'nikoniko',
    meaning_id: 'tersenyum simpul; tersenyum ramah; berseri-seri',
    meaning_en: 'smilingly; with a friendly grin',
    examples: [
      {
        jp: '彼女はいつもにこにこ笑っている。',
        id: 'Dia selalu tersenyum ramah berseri-seri.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'のろのろ',
    reading: 'のろのろ',
    romaji: 'noronoro',
    meaning_id: 'lambat laun; merayap; lamban',
    meaning_en: 'slowly; sluggishly',
    examples: [
      {
        jp: '渋滞で車がのろのろ運転している。',
        id: 'Karena macet, mobil berjalan lamban merayap.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'はきはき',
    reading: 'はきはき',
    romaji: 'hakihaki',
    meaning_id: 'tegas dan jelas; lugas; tanggap',
    meaning_en: 'lucidly; briskly; clearly',
    examples: [
      {
        jp: '面接ではきはきと答えた。',
        id: 'Menjawab dengan tegas dan jelas saat wawancara.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'ぴかぴか',
    reading: 'ぴかぴか',
    romaji: 'pikapika',
    meaning_id: 'berkilau; mengkilap; berkilau-kilau',
    meaning_en: 'glitter; sparkle; shiny',
    examples: [
      {
        jp: '靴をぴかぴかに磨いた。',
        id: 'Saya menggosok sepatu hingga berkilau bersih.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'ぴたり',
    reading: 'ぴたり',
    romaji: 'pitari',
    meaning_id: 'pas; tepat; rapat',
    meaning_en: 'tightly; closely; exactly',
    examples: [
      {
        jp: '彼の予想がぴたりと当たった。',
        id: 'Prediksinya tepat mengenai sasaran.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: '広々',
    reading: 'ひろびろ',
    romaji: 'hirobiro',
    meaning_id: 'luas; lapang',
    meaning_en: 'extensive; spacious',
    examples: [
      {
        jp: '広々とした庭のある家に住みたい。',
        id: 'Saya ingin tinggal di rumah yang memiliki halaman luas lapang.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'ふわふわ',
    reading: 'ふわふわ',
    romaji: 'fuwafuwa',
    meaning_id: 'lembut; empuk; melayang-layang',
    meaning_en: 'light; soft; fluffy',
    examples: [
      {
        jp: 'このパンケーキはふわふわでおいしい。',
        id: 'Pancake ini sangat lembut dan enak.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'まあまあ',
    reading: 'まあまあ',
    romaji: 'maamaa',
    meaning_id: 'lumayan; cukup baik; biasa saja',
    meaning_en: 'so-so; passable; well enough',
    examples: [
      {
        jp: 'テストの成績はまあまあだった。',
        id: 'Hasil tes saya lumayan baik.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  },
  {
    word: 'まごまご',
    reading: 'まごまご',
    romaji: 'magomago',
    meaning_id: 'bingung; ragu-ragu; kelabakan',
    meaning_en: 'confused; flustered; at a loss',
    examples: [
      {
        jp: '道が分からなくてまごまごした。',
        id: 'Saya bingung kelabakan karena tidak tahu jalannya.',
        level: 'n2',
        tags: ['umum']
      }
    ]
  }
];

// Find highest existing ID across all n2 files
const files = ['n2-adjectives.js', 'n2-expressions.js', 'n2-nouns.js'];
let maxNum = 2300;
for (const f of files) {
  const c = fs.readFileSync(path.join(__dirname, '../public/data/vocab/n2', f), 'utf8');
  const ids = c.match(/vg-n2-\d+/g) || [];
  for (const id of ids) {
    const num = parseInt(id.replace('vg-n2-', ''), 10);
    if (num > maxNum) maxNum = num;
  }
}

const allAdverbs = [...extractedAdverbs];

for (const m of missing15) {
  if (!existingWords.has(m.word)) {
    maxNum++;
    const id = `vg-n2-${String(maxNum).padStart(5, '0')}`;
    allAdverbs.push({
      id: id,
      word: m.word,
      reading: m.reading,
      romaji: m.romaji,
      meaning_id: m.meaning_id,
      meaning_en: m.meaning_en,
      jlpt: 'n2',
      pos: 'adverb',
      common: true,
      related_grammar: [],
      formalitas: 2,
      domain: ['umum', 'kehidupan-sehari-hari'],
      register: 'neutral',
      lawan_bicara: ['teman', 'umum'],
      nuance: 'Kosakata adverbia N2 penting untuk ekspresi percakapan dan ujian.',
      examples: m.examples
    });
  }
}

console.log(`Total final N2 adverbs: ${allAdverbs.length}`);

// Write n2-adverbs.js
const adverbsHeader = `// ────────────────────────────────────────────────────────────
//  n2-adverbs.js — Nugget Nihongo · JLPT N2 · Adverbs
//  ${allAdverbs.length} entries | Staged & Curated
//  Schema: data/_schema-vocab.md | Part of vocab/n2/ module
// ────────────────────────────────────────────────────────────

window.vocabN2_Adverbs = [

`;

const formattedAdverbs = allAdverbs.map(x => JSON.stringify(x, null, 2)).join(',\n\n');
fs.writeFileSync(adverbsFile, adverbsHeader + formattedAdverbs + '\n\n];\n', 'utf8');
console.log(`✅ Saved ${allAdverbs.length} adverbs to ${adverbsFile}`);

// Re-write n2-verbs.js without adverbs
const verbsHeader = `// ────────────────────────────────────────────────────────────
//  n2-verbs.js — Nugget Nihongo · JLPT N2 · Verbs
//  ${realVerbs.length} entries | Verified Verbs Only
//  Schema: data/_schema-vocab.md | Part of vocab/n2/ module
// ────────────────────────────────────────────────────────────

window.vocabN2_Verbs = [

`;

const formattedVerbs = realVerbs.map(x => JSON.stringify(x, null, 2)).join(',\n\n');
fs.writeFileSync(verbsFile, verbsHeader + formattedVerbs + '\n\n];\n', 'utf8');
console.log(`✅ Cleaned n2-verbs.js, remaining entries: ${realVerbs.length}`);
