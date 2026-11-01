// ══════════════════════════════════════════════════════════════════
//  counterData.ts — Master Japanese Counters (助数詞 - Jyosuushi) Dataset
//  Comprehensive phonetic sound-shift rules (音便 - Onbin), 1-10 readings,
//  Indonesian pedagogical explanations, object mappings, & quiz bank.
// ══════════════════════════════════════════════════════════════════

export type CounterCategory =
  | 'bentuk'
  | 'makhluk'
  | 'mesin-kendaraan'
  | 'buku-kertas'
  | 'wadah-makanan'
  | 'bangunan'
  | 'waktu-urutan'
  | 'umum';

export type SoundChangeType = 'sokuon' | 'rendaku' | 'wago' | 'regular' | 'special';

export interface CounterReadingEntry {
  number: number;
  kanji: string;
  kana: string;
  romaji: string;
  isIrregular: boolean;
  changeType: SoundChangeType;
}

export interface JapaneseCounter {
  id: string;
  kanji: string;
  kana: string;
  romaji: string;
  nameId: string;
  category: CounterCategory;
  categoryLabel: string;
  targetObjects: string[];
  targetObjectsId: string[];
  ruleExplanationId: string;
  questionWord: {
    kanji: string;
    kana: string;
    romaji: string;
    meaningId: string;
  };
  commonPitfallId: string;
  exampleSentence: {
    jp: string;
    kana: string;
    id: string;
  };
  readings1to10: CounterReadingEntry[];
}

export interface CounterQuizOption {
  text: string;
  reading: string;
  isCorrect: boolean;
  feedback: string;
}

export interface CounterQuizQuestion {
  id: string;
  prompt: string;
  objectName: string;
  objectJp: string;
  count: number;
  targetCounter: string;
  expectedKana: string;
  options: CounterQuizOption[];
  explanation: string;
  audioPhrase: string;
}

export interface CounterPitfallGuide {
  id: string;
  title: string;
  trap: string;
  correction: string;
  reason: string;
}

// ══════════════════════════════════════════════════════════════════
// 1. MASTER COUNTER BANK (18 ESSENTIAL COUNTERS FROM JLPT N5–N2)
// ══════════════════════════════════════════════════════════════════

export const MASTER_COUNTERS: JapaneseCounter[] = [
  // 1. 本 (ほん) — Benda panjang & silindris (The Classic H-Row Shift)
  {
    id: 'hon',
    kanji: '本',
    kana: 'ほん',
    romaji: 'hon',
    nameId: 'Benda Panjang, Silindris, & Ramping',
    category: 'bentuk',
    categoryLabel: 'Bentuk Fisik',
    targetObjects: ['ペン', 'ボトル', '木', '傘', 'バナナ', '川', '電車', '電話', '映画'],
    targetObjectsId: ['Pena / pensil', 'Botol minuman', 'Pohon', 'Payung', 'Pisang', 'Sungai', 'Jalur kereta', 'Panggilan telepon', 'Film / kaset'],
    ruleExplanationId:
      'HUKUM PERUBAHAN FONETIS BARIS-H: Bunyi "hon" berubah menjadi "pon" (sokuon) pada angka 1, 6, 8, 10; dan berubah menjadi "bon" (rendaku) pada angka 3 dan kata tanya 何 (なんぼん).',
    questionWord: {
      kanji: '何本',
      kana: 'なんぼん',
      romaji: 'nanbon',
      meaningId: 'Berapa batang / botol?',
    },
    commonPitfallId:
      'Hati-hati: Meskipun kanji 本 berarti "buku" sebagai kata benda, sebagai kata bantu bilangan 本 TIDAK PERNAH digunakan untuk menghitung buku! Buku dihitung dengan 冊 (satsu).',
    exampleSentence: {
      jp: '冷蔵庫にビールが三本冷えています。',
      kana: 'れいぞうこにびーるがさんぼんひえています。',
      id: 'Di dalam kulkas ada 3 botol bir yang sedang didinginkan.',
    },
    readings1to10: [
      { number: 1, kanji: '1本', kana: 'いっぽん', romaji: 'ippon', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2本', kana: 'にほん', romaji: 'nihon', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3本', kana: 'さんぼん', romaji: 'sanbon', isIrregular: true, changeType: 'rendaku' },
      { number: 4, kanji: '4本', kana: 'よんほん', romaji: 'yonhon', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5本', kana: 'ごほん', romaji: 'gohon', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6本', kana: 'ろっぽん', romaji: 'roppon', isIrregular: true, changeType: 'sokuon' },
      { number: 7, kanji: '7本', kana: 'ななほん', romaji: 'nanahon', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8本', kana: 'はっぽん', romaji: 'happon', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9本', kana: 'きゅうほん', romaji: 'kyuuhon', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10本', kana: 'じゅっぽん', romaji: 'juppon', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 2. 枚 (まい) — Benda tipis & pipih
  {
    id: 'mai',
    kanji: '枚',
    kana: 'まい',
    romaji: 'mai',
    nameId: 'Benda Tipis, Rata, & Pipih',
    category: 'bentuk',
    categoryLabel: 'Bentuk Fisik',
    targetObjects: ['紙', '写真', 'シャツ', '皿', '切手', 'チケット', 'ピザ', '毛布'],
    targetObjectsId: ['Kertas', 'Foto', 'Kemeja / baju kaos', 'Piring', 'Perangko', 'Tiket', 'Irisan piza', 'Selimut'],
    ruleExplanationId:
      'SANGAT TERATUR (REGULAR): Akhiran "mai" TIDAK MENGALAMI perubahan bunyi pada angka 1 s.d. 10. Selalu angka Kango murni + "mai" (ichimai, nimai, sanmai, yonmai, gomai, rokumai, nanamai, hachimai, kyuumai, juumai).',
    questionWord: {
      kanji: '何枚',
      kana: 'なんまい',
      romaji: 'nanmai',
      meaningId: 'Berapa lembar?',
    },
    commonPitfallId:
      'Baju kaos dan kemeja tipis dihitung dengan 枚 (mai), bukan 着 (chaku). Piring ceper juga dihitung dengan 枚!',
    exampleSentence: {
      jp: 'コンサートのチケットを二枚予約しました。',
      kana: 'こんさーとのちけっとをにまいよやくしました。',
      id: 'Saya telah memesan 2 lembar tiket konser.',
    },
    readings1to10: [
      { number: 1, kanji: '1枚', kana: 'いちまい', romaji: 'ichimai', isIrregular: false, changeType: 'regular' },
      { number: 2, kanji: '2枚', kana: 'にまい', romaji: 'nimai', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3枚', kana: 'さんまい', romaji: 'sanmai', isIrregular: false, changeType: 'regular' },
      { number: 4, kanji: '4枚', kana: 'よんまい', romaji: 'yonmai', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5枚', kana: 'ごまい', romaji: 'gomai', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6枚', kana: 'ろくまい', romaji: 'rokumai', isIrregular: false, changeType: 'regular' },
      { number: 7, kanji: '7枚', kana: 'ななまい', romaji: 'nanamai', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8枚', kana: 'はちまい', romaji: 'hachimai', isIrregular: false, changeType: 'regular' },
      { number: 9, kanji: '9枚', kana: 'きゅうまい', romaji: 'kyuumai', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10枚', kana: 'じゅうまい', romaji: 'juumai', isIrregular: false, changeType: 'regular' },
    ],
  },

  // 3. 匹 (ひき) — Hewan kecil, serangga, & ikan
  {
    id: 'hiki',
    kanji: '匹',
    kana: 'ひき',
    romaji: 'hiki',
    nameId: 'Hewan Kecil, Serangga, Ikan, & Reptil',
    category: 'makhluk',
    categoryLabel: 'Makhluk Hidup',
    targetObjects: ['犬', '猫', '魚', '虫', 'カエル', '蛇', '猿'],
    targetObjectsId: ['Anjing', 'Kucing', 'Ikan', 'Serangga', 'Katak', 'Ular', 'Monyet'],
    ruleExplanationId:
      'HUKUM PERUBAHAN FONETIS BARIS-H: Sama seperti 本 (hon), "hiki" berubah menjadi "piki" (sokuon) pada angka 1 (ippiki), 6 (roppiki), 8 (happiki), 10 (juppiki); dan berubah menjadi "biki" (rendaku) pada angka 3 (sanbiki) dan kata tanya 何匹 (nanbiki).',
    questionWord: {
      kanji: '何匹',
      kana: 'なんびき',
      romaji: 'nanbiki',
      meaningId: 'Berapa ekor (hewan kecil)?',
    },
    commonPitfallId:
      'Hewan besar seperti kuda, sapi, dan gajah TIDAK menggunakan 匹, melainkan 頭 (tou). Khusus burung dan kelinci menggunakan 羽 (wa).',
    exampleSentence: {
      jp: '庭に可愛い子猫が三匹遊んでいます。',
      kana: 'にわにかわいいこねこがさんびきあそんでいます。',
      id: 'Di halaman ada 3 ekor anak kucing lucu sedang bermain.',
    },
    readings1to10: [
      { number: 1, kanji: '1匹', kana: 'いっぴき', romaji: 'ippiki', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2匹', kana: 'にひき', romaji: 'nihiki', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3匹', kana: 'さんびき', romaji: 'sanbiki', isIrregular: true, changeType: 'rendaku' },
      { number: 4, kanji: '4匹', kana: 'よんひき', romaji: 'yonhiki', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5匹', kana: 'ごひき', romaji: 'gohiki', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6匹', kana: 'ろっぴき', romaji: 'roppiki', isIrregular: true, changeType: 'sokuon' },
      { number: 7, kanji: '7匹', kana: 'ななひき', romaji: 'nanahiki', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8匹', kana: 'はっぴき', romaji: 'happiki', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9匹', kana: 'きゅうひき', romaji: 'kyuuhiki', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10匹', kana: 'じゅっぴき', romaji: 'juppiki', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 4. 頭 (とう) — Hewan besar
  {
    id: 'tou',
    kanji: '頭',
    kana: 'とう',
    romaji: 'tou',
    nameId: 'Hewan Besar (Sapi, Kuda, Gajah, Paus)',
    category: 'makhluk',
    categoryLabel: 'Makhluk Hidup',
    targetObjects: ['牛', '馬', '象', '鯨', 'ライオン', '熊', 'キリン'],
    targetObjectsId: ['Sapi', 'Kuda', 'Gajah', 'Paus', 'Singa', 'Beruang', 'Jerapah'],
    ruleExplanationId:
      'Relatif teratur dengan sokuon pada angka 1 (いっとう) dan 8 (はっとう / はちとう) serta 10 (じゅっとう). Berasal dari kanji "kepala".',
    questionWord: {
      kanji: '何頭',
      kana: 'なんとう',
      romaji: 'nantou',
      meaningId: 'Berapa ekor (hewan besar)?',
    },
    commonPitfallId:
      'Gajah dan paus yang berukuran raksasa wajib memakai 頭 (tou), jangan sampai tertukar dengan 匹 (hiki)!',
    exampleSentence: {
      jp: '牧場で黒い牛が一頭草を食べています。',
      kana: 'ぼくじょうでくろいうしがいっとうくさをたべています。',
      id: 'Di padang ternak ada 1 ekor sapi hitam sedang memakan rumput.',
    },
    readings1to10: [
      { number: 1, kanji: '1頭', kana: 'いっとう', romaji: 'ittou', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2頭', kana: 'にとう', romaji: 'nitou', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3頭', kana: 'さんとう', romaji: 'santou', isIrregular: false, changeType: 'regular' },
      { number: 4, kanji: '4頭', kana: 'よんとう', romaji: 'yontou', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5頭', kana: 'ごとう', romaji: 'gotou', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6頭', kana: 'ろくとう', romaji: 'rokutou', isIrregular: false, changeType: 'regular' },
      { number: 7, kanji: '7頭', kana: 'ななとう', romaji: 'nanatou', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8頭', kana: 'はっとう', romaji: 'hattou', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9頭', kana: 'きゅうとう', romaji: 'kyuutou', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10頭', kana: 'じゅっとう', romaji: 'juttou', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 5. 羽 (わ) — Unggas, burung, & kelinci
  {
    id: 'wa',
    kanji: '羽',
    kana: 'わ',
    romaji: 'wa',
    nameId: 'Burung, Ayam, Unggas, & Kelinci',
    category: 'makhluk',
    categoryLabel: 'Makhluk Hidup',
    targetObjects: ['鳥', '鶏', 'ペンギン', 'ウサギ', 'カラス', '鳩'],
    targetObjectsId: ['Burung', 'Ayam', 'Penguin', 'Kelinci', 'Burung gagak', 'Burung merpati'],
    ruleExplanationId:
      'Aturan tradisi: Angka 3 bisa dibaca さんわ (modern) atau さんば (tradisional). Mengapa KELINCI dihitung dengan 羽 (sayap)? Dalam sejarah Jepang kuno saat biksu dilarang memakan daging hewan berkaki empat, telinga kelinci yang panjang diumpamakan seperti sayap burung agar halal disantap!',
    questionWord: {
      kanji: '何羽',
      kana: 'なんわ / なんば',
      romaji: 'nanwa / nanba',
      meaningId: 'Berapa ekor (burung/kelinci)?',
    },
    commonPitfallId:
      'Kelinci (ウサギ) secara tradisional dihitung dengan 羽 (wa), bukan 匹 (hiki)!',
    exampleSentence: {
      jp: '白いウサギが二羽跳ねています。',
      kana: 'しろいうさぎがにわはねています。',
      id: 'Ada 2 ekor kelinci putih yang sedang melompat-lompat.',
    },
    readings1to10: [
      { number: 1, kanji: '1羽', kana: 'いちわ', romaji: 'ichiva', isIrregular: false, changeType: 'regular' },
      { number: 2, kanji: '2羽', kana: 'にわ', romaji: 'niwa', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3羽', kana: 'さんわ / さんば', romaji: 'sanwa / sanba', isIrregular: true, changeType: 'rendaku' },
      { number: 4, kanji: '4羽', kana: 'よんわ', romaji: 'yonwa', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5羽', kana: 'ごわ', romaji: 'gowa', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6羽', kana: 'ろくわ / ろっぱ', romaji: 'rokuwa / roppa', isIrregular: false, changeType: 'regular' },
      { number: 7, kanji: '7羽', kana: 'ななわ', romaji: 'nanawa', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8羽', kana: 'はちわ / はっぱ', romaji: 'hachiwa / happa', isIrregular: false, changeType: 'regular' },
      { number: 9, kanji: '9羽', kana: 'きゅうわ', romaji: 'kyuuwa', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10羽', kana: 'じゅうわ / じゅっぱ', romaji: 'juuwa / juppa', isIrregular: false, changeType: 'regular' },
    ],
  },

  // 6. 冊 (さつ) — Buku, majalah, & dokumen berjilid
  {
    id: 'satsu',
    kanji: '冊',
    kana: 'さつ',
    romaji: 'satsu',
    nameId: 'Buku, Majalah, & Dokumen Berjilid',
    category: 'buku-kertas',
    categoryLabel: 'Buku & Kertas',
    targetObjects: ['本', '教科書', '雑誌', '辞書', '手帳', 'マンガ', 'ノート'],
    targetObjectsId: ['Buku', 'Buku pelajaran', 'Majalah', 'Kamus', 'Buku agenda', 'Manga / komik', 'Buku catatan'],
    ruleExplanationId:
      'HUKUM SOKUON BARIS-S: Huruf "satsu" memicu bunyi sokuon (konsonan ganda) pada angka 1 (いっさつ), 8 (はっさつ), dan 10 (じゅっさつ).',
    questionWord: {
      kanji: '何冊',
      kana: 'なんさつ',
      romaji: 'nansatsu',
      meaningId: 'Berapa jilid / eksemplar buku?',
    },
    commonPitfallId:
      'Jangan pernah menghitung buku dengan 本 (hon)! Kata "buku" ditulis dengan kanji 本 (hon), tetapi kata bantu bilangannya adalah 冊 (satsu). Contoh: 本が三冊 (hon ga sansatsu).',
    exampleSentence: {
      jp: '図書館で日本の小説を二冊借りました。',
      kana: 'としょかんでにほんのしょうせつをにさつかりました。',
      id: 'Saya telah meminjam 2 buku novel Jepang di perpustakaan.',
    },
    readings1to10: [
      { number: 1, kanji: '1冊', kana: 'いっさつ', romaji: 'issatsu', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2冊', kana: 'にさつ', romaji: 'nisatsu', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3冊', kana: 'さんさつ', romaji: 'sansatsu', isIrregular: false, changeType: 'regular' },
      { number: 4, kanji: '4冊', kana: 'よんさつ', romaji: 'yonsatsu', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5冊', kana: 'ごさつ', romaji: 'gosatsu', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6冊', kana: 'ろくさつ', romaji: 'rokusatsu', isIrregular: false, changeType: 'regular' },
      { number: 7, kanji: '7冊', kana: 'ななさつ', romaji: 'nanasatsu', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8冊', kana: 'はっさつ', romaji: 'hassatsu', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9冊', kana: 'きゅうさつ', romaji: 'kyuusatsu', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10冊', kana: 'じゅっさつ', romaji: 'jussatsu', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 7. 台 (だい) — Mesin, kendaraan, & alat elektronik
  {
    id: 'dai',
    kanji: '台',
    kana: 'だい',
    romaji: 'dai',
    nameId: 'Mesin, Kendaraan, Komputer, & Alat Elektronik',
    category: 'mesin-kendaraan',
    categoryLabel: 'Mesin & Kendaraan',
    targetObjects: ['車', '自転車', 'パソコン', 'テレビ', 'スマホ', '洗濯機', 'ピアノ'],
    targetObjectsId: ['Mobil', 'Sepeda', 'Laptop / PC', 'Televisi', 'Smartphone', 'Mesin cuci', 'Piano'],
    ruleExplanationId:
      'SANGAT REGULER: Karena diawali dengan konsonan dakuon "da", tidak ada perubahan bunyi sokuon atau rendaku. Cukup angka + dai: ichidai, nidai, sandai, yondai, godai, rokudai, nanadai, hachidai, kyuudai, juudai.',
    questionWord: {
      kanji: '何台',
      kana: 'なんだい',
      romaji: 'nandai',
      meaningId: 'Berapa unit (mesin/kendaraan)?',
    },
    commonPitfallId:
      'Mobil, sepeda, smartphone, dan piano dihitung dengan 台 (dai), bukan 個 (ko) atau つ (tsu)!',
    exampleSentence: {
      jp: '会社に新しいパソコンを五台導入しました。',
      kana: 'かいしゃにあたらしいぱそこんをごだいどうにゅうしました。',
      id: 'Perusahaan telah memasukkan 5 unit komputer baru.',
    },
    readings1to10: [
      { number: 1, kanji: '1台', kana: 'いちだい', romaji: 'ichidai', isIrregular: false, changeType: 'regular' },
      { number: 2, kanji: '2台', kana: 'にだい', romaji: 'nidai', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3台', kana: 'さんだい', romaji: 'sandai', isIrregular: false, changeType: 'regular' },
      { number: 4, kanji: '4台', kana: 'よんだい', romaji: 'yondai', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5台', kana: 'ごだい', romaji: 'godai', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6台', kana: 'ろくだい', romaji: 'rokudai', isIrregular: false, changeType: 'regular' },
      { number: 7, kanji: '7台', kana: 'ななだい', romaji: 'nanadai', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8台', kana: 'はちだい', romaji: 'hachidai', isIrregular: false, changeType: 'regular' },
      { number: 9, kanji: '9台', kana: 'きゅうだい', romaji: 'kyuudai', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10台', kana: 'じゅうだい', romaji: 'juudai', isIrregular: false, changeType: 'regular' },
    ],
  },

  // 8. 個 (こ) — Benda kecil, 3 dimensi, umum
  {
    id: 'ko',
    kanji: '個',
    kana: 'こ',
    romaji: 'ko',
    nameId: 'Benda Kecil Tiga Dimensi & Buah Bulat',
    category: 'bentuk',
    categoryLabel: 'Bentuk Fisik',
    targetObjects: ['リンゴ', '卵', '消しゴム', '箱', '石', 'ボール', 'トマト'],
    targetObjectsId: ['Apel', 'Telur', 'Penghapus', 'Kotak kecil', 'Batu', 'Bola', 'Tomat'],
    ruleExplanationId:
      'HUKUM SOKUON BARIS-K: Huruf "ko" memicu sokuon pada angka 1 (いっこ), 6 (ろっこ), 8 (はっこ), dan 10 (じゅっこ / じっこ).',
    questionWord: {
      kanji: '何個',
      kana: 'なんこ',
      romaji: 'nanko',
      meaningId: 'Berapa buah (benda kecil)?',
    },
    commonPitfallId:
      '個 (ko) digunakan untuk benda konkret yang berwujud fisik terpisah. Jangan gunakan untuk konsep abstrak (gunakan つ).',
    exampleSentence: {
      jp: 'スーパーで新鮮なリンゴを六個買いました。',
      kana: 'すーぱーでしんせんなりんごをろっこかいました。',
      id: 'Saya membeli 6 buah apel segar di supermarket.',
    },
    readings1to10: [
      { number: 1, kanji: '1個', kana: 'いっこ', romaji: 'ikko', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2個', kana: 'にこ', romaji: 'niko', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3個', kana: 'さんこ', romaji: 'sanko', isIrregular: false, changeType: 'regular' },
      { number: 4, kanji: '4個', kana: 'よんこ', romaji: 'yonko', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5個', kana: 'ごこ', romaji: 'goko', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6個', kana: 'ろっこ', romaji: 'rokko', isIrregular: true, changeType: 'sokuon' },
      { number: 7, kanji: '7個', kana: 'ななこ', romaji: 'nanako', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8個', kana: 'はっこ', romaji: 'hakko', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9個', kana: 'きゅうこ', romaji: 'kyuuko', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10個', kana: 'じゅっこ', romaji: 'jukko', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 9. つ (ひとつ、ふたつ…) — Penghitung universal asli Jepang (Wago)
  {
    id: 'tsu',
    kanji: 'つ',
    kana: 'つ',
    romaji: 'tsu',
    nameId: 'Penghitung Universal Asli Jepang (Wago 1–10)',
    category: 'umum',
    categoryLabel: 'Universal',
    targetObjects: ['物', '質問', '理由', 'アイディア', '椅子', '部屋', '荷物'],
    targetObjectsId: ['Benda apa saja jika lupa penghitung khusus', 'Pertanyaan', 'Alasan', 'Ide / gagasan', 'Kursi', 'Kamar', 'Barang bawaan'],
    ruleExplanationId:
      'WAGO MURNI 100%: Menggunakan sistem bilangan asli Jepang kuno dari 1 sampai 9 yang berakhiran "tsu", dan angka 10 dibaca "とお" (tanpa akhiran tsu!). Di atas angka 10, kembali memakai angka Kango biasa (11個, 12個).',
    questionWord: {
      kanji: '幾つ',
      kana: 'いくつ',
      romaji: 'ikutsu',
      meaningId: 'Berapa buah / biji (universal)?',
    },
    commonPitfallId:
      'Angka 10 dibaca とお (too), BUKAN じゅっつ! Dan つ hanya ada untuk angka 1 s.d. 10. Jika menghitung 11 ke atas, gunakan 個 (ko).',
    exampleSentence: {
      jp: '先生、質問が一つあります。',
      kana: 'せんせい、しつもんがひとつあります。',
      id: 'Pak/Bu Guru, saya memiliki 1 buah pertanyaan.',
    },
    readings1to10: [
      { number: 1, kanji: '一つ', kana: 'ひとつ', romaji: 'hitotsu', isIrregular: true, changeType: 'wago' },
      { number: 2, kanji: '二つ', kana: 'ふたつ', romaji: 'futatsu', isIrregular: true, changeType: 'wago' },
      { number: 3, kanji: '三つ', kana: 'みっつ', romaji: 'mittsu', isIrregular: true, changeType: 'wago' },
      { number: 4, kanji: '四つ', kana: 'よっつ', romaji: 'yottsu', isIrregular: true, changeType: 'wago' },
      { number: 5, kanji: '五つ', kana: 'いつつ', romaji: 'itsutsu', isIrregular: true, changeType: 'wago' },
      { number: 6, kanji: '六つ', kana: 'むっつ', romaji: 'muttsu', isIrregular: true, changeType: 'wago' },
      { number: 7, kanji: '七つ', kana: 'ななつ', romaji: 'nanatsu', isIrregular: true, changeType: 'wago' },
      { number: 8, kanji: '八つ', kana: 'やっつ', romaji: 'yattsu', isIrregular: true, changeType: 'wago' },
      { number: 9, kanji: '九つ', kana: 'ここのつ', romaji: 'kokonotsu', isIrregular: true, changeType: 'wago' },
      { number: 10, kanji: '十', kana: 'とお', romaji: 'too', isIrregular: true, changeType: 'wago' },
    ],
  },

  // 10. 人 (にん / り) — Jumlah Orang
  {
    id: 'nin',
    kanji: '人',
    kana: 'にん',
    romaji: 'nin',
    nameId: 'Jumlah Orang (Manusia)',
    category: 'makhluk',
    categoryLabel: 'Makhluk Hidup',
    targetObjects: ['人', '学生', '友達', '社員', '客', '先生'],
    targetObjectsId: ['Orang', 'Siswa / mahasiswa', 'Teman', 'Karyawan', 'Tamu', 'Guru'],
    ruleExplanationId:
      'WAGO HYBRID: 1 orang = 一人 (ひとり), 2 orang = 二人 (ふたり). Mulai angka 3 ke atas kembali ke pola Kango + nin: 三人 (さんにん), 四人 (よにん - BUKAN よんにん!), 五人 (ごにん), dst.',
    questionWord: {
      kanji: '何人',
      kana: 'なんにん',
      romaji: 'nannin',
      meaningId: 'Berapa orang?',
    },
    commonPitfallId:
      'Jangan pernah ucapkan "いちにん" atau "ににん"! Angka 1 dan 2 orang mutlak ひとり dan ふたり. Angka 4 orang dibaca よにん (yonin), huruf "n" dilepas!',
    exampleSentence: {
      jp: '今夜のパーティーには何人来ますか。',
      kana: 'こんやのぱーてぃーにはなんにんきますか。',
      id: 'Berapa orang yang akan datang ke pesta malam ini?',
    },
    readings1to10: [
      { number: 1, kanji: '1人', kana: 'ひとり', romaji: 'hitori', isIrregular: true, changeType: 'wago' },
      { number: 2, kanji: '2人', kana: 'ふたり', romaji: 'futari', isIrregular: true, changeType: 'wago' },
      { number: 3, kanji: '3人', kana: 'さんにん', romaji: 'sannin', isIrregular: false, changeType: 'regular' },
      { number: 4, kanji: '4人', kana: 'よにん', romaji: 'yonin', isIrregular: true, changeType: 'special' },
      { number: 5, kanji: '5人', kana: 'ごにん', romaji: 'gonin', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6人', kana: 'ろくにん', romaji: 'rokunin', isIrregular: false, changeType: 'regular' },
      { number: 7, kanji: '7人', kana: 'ななにん / しちにん', romaji: 'nananin / shichinin', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8人', kana: 'はちにん', romaji: 'hachinin', isIrregular: false, changeType: 'regular' },
      { number: 9, kanji: '9人', kana: 'きゅうにん / くにん', romaji: 'kyuunin / kunin', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10人', kana: 'じゅうにん', romaji: 'juunin', isIrregular: false, changeType: 'regular' },
    ],
  },

  // 11. 杯 (はい) — Minuman dalam cangkir, mangkuk, & gelas
  {
    id: 'hai',
    kanji: '杯',
    kana: 'はい',
    romaji: 'hai',
    nameId: 'Minuman Segelas, Secangkir, & Semangkuk Makanan',
    category: 'wadah-makanan',
    categoryLabel: 'Wadah & Makanan',
    targetObjects: ['コーヒー', 'お茶', '水', 'ワイン', 'ラーメン', '丼'],
    targetObjectsId: ['Kopi', 'Teh', 'Air putih', 'Anggur', 'Ramen (semangkuk)', 'Donburi'],
    ruleExplanationId:
      'HUKUM PERUBAHAN FONETIS BARIS-H: Sama persis seperti 本 dan 匹! 1杯 (いっぱい), 3杯 (さんばい - rendaku), 6杯 (ろっぱい), 8杯 (はっぱい), 10杯 (じゅっぱい), 何杯 (なんばい). Catatan: kata "いっぱい" juga menjadi idiom yang berarti "penuh" atau "banyak".',
    questionWord: {
      kanji: '何杯',
      kana: 'なんばい',
      romaji: 'nanbai',
      meaningId: 'Berapa cangkir / gelas / mangkuk?',
    },
    commonPitfallId:
      'Air dalam botol dihitung dengan 本 (hon), tetapi begitu dituangkan ke dalam gelas dihitung dengan 杯 (hai)!',
    exampleSentence: {
      jp: 'コーヒーをもう一杯いただけますか。',
      kana: 'こーひーをもういっぱいいただけますか。',
      id: 'Bolehkah saya minta secangkir kopi lagi?',
    },
    readings1to10: [
      { number: 1, kanji: '1杯', kana: 'いっぱい', romaji: 'ippai', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2杯', kana: 'にはい', romaji: 'nihai', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3杯', kana: 'さんばい', romaji: 'sanbai', isIrregular: true, changeType: 'rendaku' },
      { number: 4, kanji: '4杯', kana: 'よんはい', romaji: 'yonhai', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5杯', kana: 'ごはい', romaji: 'gohai', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6杯', kana: 'ろっぱい', romaji: 'roppai', isIrregular: true, changeType: 'sokuon' },
      { number: 7, kanji: '7杯', kana: 'ななはい', romaji: 'nanahai', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8杯', kana: 'はっぱい', romaji: 'happai', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9杯', kana: 'きゅうはい', romaji: 'kyuuhai', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10杯', kana: 'じゅっぱい', romaji: 'juppai', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 12. 階 (かい) — Tingkat / Lantai Gedung
  {
    id: 'kai_floor',
    kanji: '階',
    kana: 'かい',
    romaji: 'kai',
    nameId: 'Lantai / Tingkat Gedung',
    category: 'bangunan',
    categoryLabel: 'Bangunan',
    targetObjects: ['ビル', 'デパート', 'マンション', 'アパート'],
    targetObjectsId: ['Gedung bertingkat', 'Department store', 'Apartemen mansion', 'Apartemen sewa'],
    ruleExplanationId:
      'HUKUM SOKUON BARIS-K & RENDAKU ANOMALI: Lantai 1 = いっかい, lantai 6 = ろっかい, lantai 8 = はっかい, lantai 10 = じゅっかい. Khusus lantai 3 dibaca さんがい (rendaku gai) dalam bahasa Jepang standar, dan kata tanya 何階 (なんがい / なんかい).',
    questionWord: {
      kanji: '何階',
      kana: 'なんがい / なんかい',
      romaji: 'nangai / nankai',
      meaningId: 'Lantai berapa?',
    },
    commonPitfallId:
      'Lantai 3 adalah 三階 (さんがい - sangai), sering muncul di soal ujian JLPT N5/N4 listening (Choukai)!',
    exampleSentence: {
      jp: '事務所はビルの七階にあります。',
      kana: 'じむしょはびるのななかいにあります。',
      id: 'Kantor kami berada di lantai 7 gedung ini.',
    },
    readings1to10: [
      { number: 1, kanji: '1階', kana: 'いっかい', romaji: 'ikkai', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2階', kana: 'にかい', romaji: 'nikai', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3階', kana: 'さんがい', romaji: 'sangai', isIrregular: true, changeType: 'rendaku' },
      { number: 4, kanji: '4階', kana: 'よんかい', romaji: 'yonkai', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5階', kana: 'ごかい', romaji: 'gokai', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6階', kana: 'ろっかい', romaji: 'rokkai', isIrregular: true, changeType: 'sokuon' },
      { number: 7, kanji: '7階', kana: 'ななかい', romaji: 'nanakai', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8階', kana: 'はっかい', romaji: 'hakkai', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9階', kana: 'きゅうかい', romaji: 'kyuukai', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10階', kana: 'じゅっかい', romaji: 'jukkai', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 13. 回 (かい) — Frekuensi / Kali
  {
    id: 'kai_times',
    kanji: '回',
    kana: 'かい',
    romaji: 'kai',
    nameId: 'Frekuensi Kejadian / Kali',
    category: 'waktu-urutan',
    categoryLabel: 'Waktu & Frekuensi',
    targetObjects: ['練習', 'テスト', '旅行', 'チャンス', '薬の服用'],
    targetObjectsId: ['Latihan', 'Ujian', 'Perjalanan wisata', 'Kesempatan', 'Minum obat (3 kali sehari)'],
    ruleExplanationId:
      'SOKUON BARIS-K: Sama persis dengan 階 kecuali pada angka 3: 3 kali dibaca さんかい (sankai, tanpa rendaku!), berbeda dari lantai 3 yang さんがい.',
    questionWord: {
      kanji: '何回',
      kana: 'なんかい',
      romaji: 'nankai',
      meaningId: 'Berapa kali?',
    },
    commonPitfallId:
      'Perbedaan tipis: 3 kali = さんかい (sankai), sedangkan lantai 3 = さんがい (sangai).',
    exampleSentence: {
      jp: 'この薬は一日に三回飲んでください。',
      kana: 'このくすりはいちにちにさんかいのんでください。',
      id: 'Obat ini mohon diminum 3 kali dalam sehari.',
    },
    readings1to10: [
      { number: 1, kanji: '1回', kana: 'いっかい', romaji: 'ikkai', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2回', kana: 'にかい', romaji: 'nikai', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3回', kana: 'さんかい', romaji: 'sankai', isIrregular: false, changeType: 'regular' },
      { number: 4, kanji: '4回', kana: 'よんかい', romaji: 'yonkai', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5回', kana: 'ごかい', romaji: 'gokai', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6回', kana: 'ろっかい', romaji: 'rokkai', isIrregular: true, changeType: 'sokuon' },
      { number: 7, kanji: '7回', kana: 'ななかい', romaji: 'nanakai', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8回', kana: 'はっかい', romaji: 'hakkai', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9回', kana: 'きゅうかい', romaji: 'kyuukai', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10回', kana: 'じゅっかい', romaji: 'jukkai', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 14. 軒 (けん) — Rumah, Toko, & Bangunan Mandiri
  {
    id: 'ken',
    kanji: '軒',
    kana: 'けん',
    romaji: 'ken',
    nameId: 'Rumah, Toko, Kedai, & Bangunan Rumah',
    category: 'bangunan',
    categoryLabel: 'Bangunan',
    targetObjects: ['家', '店', 'レストラン', 'アパート', '農家'],
    targetObjectsId: ['Rumah tinggal', 'Toko / kios', 'Restoran', 'Bangunan apartemen', 'Rumah petani'],
    ruleExplanationId:
      'HUKUM SOKUON & RENDAKU: 1 rumah = いっけん, 3 rumah = さんげん (rendaku gen), 6 rumah = ろっけん, 8 rumah = はっけん, 10 rumah = じゅっけん.',
    questionWord: {
      kanji: '何軒',
      kana: 'なんげん / なんけん',
      romaji: 'nangen / nanken',
      meaningId: 'Berapa pintu rumah / toko?',
    },
    commonPitfallId:
      'Untuk rumah dan kedai mandiri dihitung 軒 (ken), bukan 個 (ko).',
    exampleSentence: {
      jp: 'この通りにはラーメン屋が三軒並んでいます。',
      kana: 'このとおりにはらーめんやがさんげんならんでいます。',
      id: 'Di jalan ini berjejer 3 buah kedai ramen.',
    },
    readings1to10: [
      { number: 1, kanji: '1軒', kana: 'いっけん', romaji: 'ikken', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2軒', kana: 'にけん', romaji: 'niken', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3軒', kana: 'さんげん', romaji: 'sangen', isIrregular: true, changeType: 'rendaku' },
      { number: 4, kanji: '4軒', kana: 'よんけん', romaji: 'yonken', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5軒', kana: 'ごけん', romaji: 'goken', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6軒', kana: 'ろっけん', romaji: 'rokken', isIrregular: true, changeType: 'sokuon' },
      { number: 7, kanji: '7軒', kana: 'ななけん', romaji: 'nanaken', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8軒', kana: 'はっけん', romaji: 'hakken', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9軒', kana: 'きゅうけん', romaji: 'kyuuken', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10軒', kana: 'じゅっけん', romaji: 'jukken', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 15. 足 (そく) — Pasang Alas Kaki (Sepatu, Kaos Kaki, Sandal)
  {
    id: 'soku',
    kanji: '足',
    kana: 'そく',
    romaji: 'soku',
    nameId: 'Pasang Alas Kaki (Sepatu, Kaos Kaki, Sandal)',
    category: 'bentuk',
    categoryLabel: 'Bentuk Fisik',
    targetObjects: ['靴', '靴下', 'スリッパ', 'サンダル', 'ブーツ'],
    targetObjectsId: ['Sepatu', 'Kaos kaki', 'Sandal rumah (slippers)', 'Sandal', 'Sepatu bot'],
    ruleExplanationId:
      'HUKUM SOKUON BARIS-S & RENDAKU ANOMALI: 1 pasang = いっそく (issoku), 3 pasang = さんぞく (sanzoku - rendaku zoku), 8 pasang = はっそく, 10 pasang = じゅっそく.',
    questionWord: {
      kanji: '何足',
      kana: 'なんぞく / なんそく',
      romaji: 'nanzoku / nansoku',
      meaningId: 'Berapa pasang (sepatu/kaos kaki)?',
    },
    commonPitfallId:
      'Sepasang sepatu dihitung 1足 (いっそく), BUKAN 2個! Satu pasang adalah satu unit.',
    exampleSentence: {
      jp: '新しいスニーカーを二足買いました。',
      kana: 'あたらしいすにーかーをにそくかいました。',
      id: 'Saya telah membeli 2 pasang sepatu kets baru.',
    },
    readings1to10: [
      { number: 1, kanji: '1足', kana: 'いっそく', romaji: 'issoku', isIrregular: true, changeType: 'sokuon' },
      { number: 2, kanji: '2足', kana: 'にそく', romaji: 'nisoku', isIrregular: false, changeType: 'regular' },
      { number: 3, kanji: '3足', kana: 'さんぞく', romaji: 'sanzoku', isIrregular: true, changeType: 'rendaku' },
      { number: 4, kanji: '4足', kana: 'よんそく', romaji: 'yonsoku', isIrregular: false, changeType: 'regular' },
      { number: 5, kanji: '5足', kana: 'ごそく', romaji: 'gosoku', isIrregular: false, changeType: 'regular' },
      { number: 6, kanji: '6足', kana: 'ろくそく', romaji: 'rokusoku', isIrregular: false, changeType: 'regular' },
      { number: 7, kanji: '7足', kana: 'ななそく', romaji: 'nanasoku', isIrregular: false, changeType: 'regular' },
      { number: 8, kanji: '8足', kana: 'はっそく', romaji: 'hassoku', isIrregular: true, changeType: 'sokuon' },
      { number: 9, kanji: '9足', kana: 'きゅうそく', romaji: 'kyuusoku', isIrregular: false, changeType: 'regular' },
      { number: 10, kanji: '10足', kana: 'じゅっそく', romaji: 'jussoku', isIrregular: true, changeType: 'sokuon' },
    ],
  },

  // 16. 日 (にち / か) — Hari & Tanggal Kalender (The Famous Special Days)
  {
    id: 'nichi',
    kanji: '日',
    kana: 'にち / か',
    romaji: 'nichi / ka',
    nameId: 'Hari & Tanggal Kalender (1–31)',
    category: 'waktu-urutan',
    categoryLabel: 'Waktu & Frekuensi',
    targetObjects: ['日付', '日数', 'カレンダー', '旅行日数'],
    targetObjectsId: ['Tanggal kalender', 'Durasi hari', 'Jadwal', 'Lama perjalanan'],
    ruleExplanationId:
      'PENGECUALIAN TERBESAR BAHASA JEPANG: Tanggal 1 s.d. 10 menggunakan bacaan kuno unik (ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか), tanggal 14 = じゅうよっか, tanggal 20 = はつか, tanggal 24 = にじゅうよっか. Selainnya memakai angka + にち (juuichinichi, dst.).',
    questionWord: {
      kanji: '何日',
      kana: 'なんにち',
      romaji: 'nannichi',
      meaningId: 'Tanggal berapa / berapa hari?',
    },
    commonPitfallId:
      'Hati-hati: Tanggal 1 = ついたち, tetapi durasi "1 hari" = いちにち. Tanggal 4 = よっか, tanggal 8 = ようか (jangan tertukar!). Tanggal 20 = はつか.',
    exampleSentence: {
      jp: '五月五日はこどもの日です。',
      kana: 'ごがついつかはこどものひです。',
      id: 'Tanggal 5 Mei adalah Hari Anak-anak.',
    },
    readings1to10: [
      { number: 1, kanji: '1日', kana: 'ついたち (Tgl 1) / いちにち (1 Hari)', romaji: 'tsuitachi / ichinichi', isIrregular: true, changeType: 'special' },
      { number: 2, kanji: '2日', kana: 'ふつか', romaji: 'futsuka', isIrregular: true, changeType: 'wago' },
      { number: 3, kanji: '3日', kana: 'みっか', romaji: 'mikka', isIrregular: true, changeType: 'wago' },
      { number: 4, kanji: '4日', kana: 'よっか', romaji: 'yokka', isIrregular: true, changeType: 'wago' },
      { number: 5, kanji: '5日', kana: 'いつか', romaji: 'itsuka', isIrregular: true, changeType: 'wago' },
      { number: 6, kanji: '6日', kana: 'むいか', romaji: 'muika', isIrregular: true, changeType: 'wago' },
      { number: 7, kanji: '7日', kana: 'なのか', romaji: 'nanoka', isIrregular: true, changeType: 'wago' },
      { number: 8, kanji: '8日', kana: 'ようか', romaji: 'youka', isIrregular: true, changeType: 'wago' },
      { number: 9, kanji: '9日', kana: 'ここのか', romaji: 'kokonoka', isIrregular: true, changeType: 'wago' },
      { number: 10, kanji: '10日', kana: 'とおか', romaji: 'tooka', isIrregular: true, changeType: 'wago' },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════
// 2. COUNTER QUIZ BANK (LATIHAN & UJI KOMPETENSI)
// ══════════════════════════════════════════════════════════════════

export const COUNTER_QUIZ_BANK: CounterQuizQuestion[] = [
  {
    id: 'cq-01',
    prompt: 'Bagaimana cara menghitung 3 botol bir dalam bahasa Jepang?',
    objectName: 'Botol Bir',
    objectJp: 'ビール',
    count: 3,
    targetCounter: '本',
    expectedKana: 'さんぼん',
    options: [
      {
        text: '三本 (さんぼん)',
        reading: 'さんぼん',
        isCorrect: true,
        feedback: 'Tepat sekali! Botol adalah benda panjang dan silindris (本), dan angka 3 memicu perubahan rendaku menjadi "bon" (さんぼん).',
      },
      {
        text: '三本 (さんほん)',
        reading: 'さんほん',
        isCorrect: false,
        feedback: 'Salah! Huruf "hon" mengalami rendaku menjadi "bon" setelah angka 3 (san).',
      },
      {
        text: '三冊 (さんさつ)',
        reading: 'さんさつ',
        isCorrect: false,
        feedback: 'Salah! 冊 (satsu) khusus untuk buku dan majalah, bukan botol.',
      },
      {
        text: '三個 (さんこ)',
        reading: 'さんこ',
        isCorrect: false,
        feedback: 'Kurang tepat. Meskipun orang Jepang mengerti, botol secara standar dihitung dengan 本.',
      },
    ],
    explanation: 'Benda panjang dan silindris seperti botol, pena, dan pohon menggunakan 本 (ほん). Pola fonetis: 1本 (いっぽん), 2本 (にほん), 3本 (さんぼん).',
    audioPhrase: 'ビールが三本あります。',
  },
  {
    id: 'cq-02',
    prompt: 'Bagaimana cara membaca "2 orang" dalam bahasa Jepang?',
    objectName: 'Dua orang sahabat',
    objectJp: '友達',
    count: 2,
    targetCounter: '人',
    expectedKana: 'ふたり',
    options: [
      {
        text: '二人 (ふたり)',
        reading: 'ふたり',
        isCorrect: true,
        feedback: 'Benar! Angka 1 dan 2 orang menggunakan bacaan asli Jepang: ひとり (1 orang) dan ふたり (2 orang).',
      },
      {
        text: '二人 (ににん)',
        reading: 'ににん',
        isCorrect: false,
        feedback: 'Keliru! "ににん" tidak baku dalam bahasa Jepang lisan sehari-hari.',
      },
      {
        text: '二名 (にめい)',
        reading: 'にめい',
        isCorrect: false,
        feedback: '二名 (にめい) adalah bahasa formal di restoran/reservasi, tetapi untuk 2 orang umum kanji 二人 dibaca ふたり.',
      },
      {
        text: '二匹 (にひき)',
        reading: 'にひき',
        isCorrect: false,
        feedback: 'Sangat keliru! 匹 (hiki) adalah kata bantu bilangan untuk hewan kecil, bukan manusia.',
      },
    ],
    explanation: '1 orang = 一人 (ひとり), 2 orang = 二人 (ふたり). Mulai 3 orang barulah memakai akhiran にん (三人 = さんにん).',
    audioPhrase: '友達が二人遊びに来ました。',
  },
  {
    id: 'cq-03',
    prompt: 'Kelinci putih dihitung menggunakan kata bantu bilangan apa?',
    objectName: 'Kelinci (ウサギ)',
    objectJp: 'ウサギ',
    count: 1,
    targetCounter: '羽',
    expectedKana: 'いちわ',
    options: [
      {
        text: '一羽 (いちわ)',
        reading: 'いちわ',
        isCorrect: true,
        feedback: 'Luar biasa! Menurut tradisi Jepang kuno, kelinci dihitung dengan 羽 (sayap/unggas) karena telinganya yang mirip sayap burung.',
      },
      {
        text: '一匹 (いっぴき)',
        reading: 'いっぴき',
        isCorrect: false,
        feedback: 'Meskipun anak kecil kadang salah mengucapkannya, standar bahasa Jepang yang benar dan sering diuji di JLPT adalah 羽 (wa).',
      },
      {
        text: '一頭 (いっとう)',
        reading: 'いっとう',
        isCorrect: false,
        feedback: 'Salah! 頭 (tou) khusus untuk hewan bertubuh besar seperti sapi, kuda, dan gajah.',
      },
      {
        text: '一個 (いっこ)',
        reading: 'いっこ',
        isCorrect: false,
        feedback: 'Salah! 個 (ko) untuk benda mati, bukan makhluk hidup.',
      },
    ],
    explanation: 'Secara budaya dan standar linguistik, kelinci dihitung bersama kelompok burung menggunakan 羽 (わ).',
    audioPhrase: '白いウサギが一羽跳ねています。',
  },
  {
    id: 'cq-04',
    prompt: 'Bagaimana cara menyebut "Tanggal 4" dalam bahasa Jepang?',
    objectName: 'Tanggal 4 Kalender',
    objectJp: '四日',
    count: 4,
    targetCounter: '日',
    expectedKana: 'よっか',
    options: [
      {
        text: '四日 (よっか)',
        reading: 'よっか',
        isCorrect: true,
        feedback: 'Tepat! Tanggal 4 adalah よっか (yokka dengan sokuon). Jangan sampai tertukar dengan tanggal 8 yaitu ようか (youka dengan vokal panjang).',
      },
      {
        text: '四日 (よんにち)',
        reading: 'よんにち',
        isCorrect: false,
        feedback: 'Salah! Tanggal 1 s.d. 10 tidak menggunakan pola angka + にち.',
      },
      {
        text: '八日 (ようか)',
        reading: 'ようか',
        isCorrect: false,
        feedback: 'Terbalik! ようか adalah tanggal 8, bukan tanggal 4.',
      },
      {
        text: '四日 (しにち)',
        reading: 'しにち',
        isCorrect: false,
        feedback: 'Salah total! Angka 4 tidak dibaca しにち.',
      },
    ],
    explanation: 'Perbedaan krusial kalender: 4日 = よっか (yokka), 8日 = ようか (youka). Keduanya adalah jebakan listening JLPT N5 tersering!',
    audioPhrase: '来月の四日に試験があります。',
  },
  {
    id: 'cq-05',
    prompt: 'Anda ingin memesan 3 cangkir kopi panas di kafe. Bagaimana kalimat yang tepat?',
    objectName: 'Kopi Hangat (3 cangkir)',
    objectJp: 'ホットコーヒー',
    count: 3,
    targetCounter: '杯',
    expectedKana: 'さんばい',
    options: [
      {
        text: 'ホットコーヒーを三杯 (さんばい) ください',
        reading: 'ほっとこーひーをさんばいください',
        isCorrect: true,
        feedback: 'Sempurna! Minuman dalam cangkir dihitung dengan 杯 (はい), dan pada angka 3 berubah bunyi menjadi "bai" (さんばい).',
      },
      {
        text: 'ホットコーヒーを三本 (さんぼん) ください',
        reading: 'ほっとこーひーをさんぼんください',
        isCorrect: false,
        feedback: 'Salah! Tiga botol kopi barulah 三本. Minuman dalam cangkir/gelas menggunakan 杯.',
      },
      {
        text: 'ホットコーヒーを三枚 (さんまい) ください',
        reading: 'ほっとこーひーをさんまいください',
        isCorrect: false,
        feedback: 'Salah! 枚 (mai) untuk benda pipih tipis seperti kertas atau tiket.',
      },
      {
        text: 'ホットコーヒーを三つ (みっつ) ください',
        reading: 'ほっとこーひーをみっつください',
        isCorrect: false,
        feedback: 'Bisa dimengerti pelayan kafe, tetapi 三杯 (さんばい) adalah kata bantu bilangan yang paling akurat secara gramatikal.',
      },
    ],
    explanation: 'Minuman yang disajikan dalam gelas, cangkir, atau cawan menggunakan kata bantu bilangan 杯 (はい $\\rightarrow$ さんばい).',
    audioPhrase: 'ホットコーヒーを三杯お願いします。',
  },
  {
    id: 'cq-06',
    prompt: 'Bagaimana cara menyebut "Lantai 3" pada sebuah gedung bertingkat?',
    objectName: 'Lantai 3 Gedung',
    objectJp: '三階',
    count: 3,
    targetCounter: '階',
    expectedKana: 'さんがい',
    options: [
      {
        text: '三階 (さんがい)',
        reading: 'さんがい',
        isCorrect: true,
        feedback: 'Tepat sekali! Khusus lantai 3 dibaca さんがい (sangai - rendaku gai). Berbeda dengan 3 kali kejadian yang dibaca さんかい (sankai).',
      },
      {
        text: '三階 (さんかい)',
        reading: 'さんかい',
        isCorrect: false,
        feedback: 'Salah! さんかい berarti "tiga kali" (frekuensi), sedangkan lantai 3 dibaca さんがい.',
      },
      {
        text: '三軒 (さんげん)',
        reading: 'さんげん',
        isCorrect: false,
        feedback: 'Salah! 軒 (ken) adalah penghitung jumlah bangunan/rumah, bukan lantai.',
      },
      {
        text: '三番 (さんばん)',
        reading: 'さんばん',
        isCorrect: false,
        feedback: 'Salah! 番 (ban) berarti "nomor 3", bukan tingkat/lantai.',
      },
    ],
    explanation: 'Lantai gedung menggunakan 階 (かい). Anomali penting: Lantai 3 dibaca 三階 (さんがい).',
    audioPhrase: '私の部屋はアパートの三階にあります。',
  },
];

// ══════════════════════════════════════════════════════════════════
// 3. COMMON PITFALLS & PRACTICAL COUNTER GUIDES (6 JEBAKAN UTAMA)
// ══════════════════════════════════════════════════════════════════

export const COUNTER_PITFALLS: CounterPitfallGuide[] = [
  {
    id: 'pf-01',
    title: 'Jebakan "Buku": 本 (Hon) vs 冊 (Satsu)',
    trap: 'Banyak pembelajar pemula mengira buku dihitung dengan 本 karena kanji 本 artinya buku.',
    correction: 'Buku, majalah, dan komik 100% dihitung dengan 冊 (さつ). Contoh: 本が二冊 (hon ga nisatsu).',
    reason:
      'Pada zaman kuno sebelum kertas ditemukan di Jepang, buku dibuat dari bilah-bilah bambu yang diikat tali (disebut sashi/satsu). Karakter 本 (asal-usul) baru belakangan diasosiasikan dengan buku tulisan tangan.',
  },
  {
    id: 'pf-02',
    title: 'Jebakan "Hewan": 匹 (Hiki) vs 頭 (Tou) vs 羽 (Wa)',
    trap: 'Menganggap semua hewan bisa dihitung dengan 匹 (hiki).',
    correction:
      'Hewan kecil/serangga/ikan = 匹 (hiki). Hewan besar (sapi, kuda, gajah, paus) = 頭 (tou). Unggas dan kelinci = 羽 (wa).',
    reason:
      'Ukuran fisik menentukan penghormatan dan visualisasi penutur Jepang terhadap hewan tersebut.',
  },
  {
    id: 'pf-03',
    title: 'Jebakan Kalender: 4日 (Yokka) vs 8日 (Youka)',
    trap: 'Salah membedakan tanggal 4 (よっか) dan tanggal 8 (ようか).',
    correction:
      'Tanggal 4 = よっか (konsonan ganda / sokuon pendek). Tanggal 8 = ようか (vokal panjang "o-u-ka").',
    reason:
      'Sering menjadi soal pengecoh nomor satu pada sesi listening (Choukai) JLPT N5 dan JFT-Basic.',
  },
  {
    id: 'pf-04',
    title: 'Jebakan "Lantai" vs "Frekuensi": さんがい vs さんかい',
    trap: 'Menyamakan pembacaan 三階 (lantai 3) dan 三回 (tiga kali).',
    correction: 'Lantai 3 gedung = 三階 (さんがい - gai). Tiga kali melakukan sesuatu = 三回 (さんかい - kai).',
    reason: 'Kata 階 mengalami rendaku vokal lunak pada angka 3.',
  },
  {
    id: 'pf-05',
    title: 'Jebakan "Universal": つ (Tsu) vs 個 (Ko)',
    trap: 'Menghitung benda di atas angka 10 dengan つ (misal: じゅういっつ).',
    correction: 'つ hanya ada dari angka 1 sampai 10 (ひとつ s.d. とお). Untuk angka 11 ke atas, beralih ke 個 (ko).',
    reason: 'Sistem bilangan Wago asli Jepang pada zaman purba hanya digunakan untuk menghitung satu hingga sepuluh.',
  },
  {
    id: 'pf-06',
    title: 'Jebakan "Benda Pipih": Kemeja & Piring = 枚 (Mai)',
    trap: 'Menghitung pakaian atau piring dengan 個 (ko).',
    correction: 'Baju tipis (kaos, kemeja) dan piring ceper dihitung dengan 枚 (mai).',
    reason: 'Konsep 枚 mencakup segala benda yang rasio ketebalannya sangat tipis dibanding luas permukaannya.',
  },
];
