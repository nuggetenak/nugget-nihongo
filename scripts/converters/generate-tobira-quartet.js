#!/usr/bin/env node
/**
 * generate-tobira-quartet.js
 * Generates Grammar and Vocabulary Lenses for Tobira & Quartet.
 * 
 * - Tobira Gateway to Advanced Japanese (Chapters 1-15, N3-N2 Bridge)
 * - Quartet I (Lessons 1-6, N3)
 * - Quartet II (Lessons 7-12, N2)
 * 
 * 100% Original Indonesian Explanations & Examples — Zero Copyright Infringement.
 * Outputs to:
 * - public/data/staged-expansion/books/tobira/
 * - public/data/staged-expansion/books/quartet/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const TOBIRA_OUT = path.join(REPO, 'public/data/staged-expansion/books/tobira');
const QUARTET_OUT = path.join(REPO, 'public/data/staged-expansion/books/quartet');
const PROD_VOCAB = path.join(REPO, 'public/data/vocab');
const STAGED_VOCAB = path.join(REPO, 'public/data/staged-expansion/vocab');

fs.mkdirSync(TOBIRA_OUT, { recursive: true });
fs.mkdirSync(QUARTET_OUT, { recursive: true });

function loadVocabIds(level) {
  const ids = [];
  const prodFile = path.join(PROD_VOCAB, `vocab-${level}.js`);
  if (fs.existsSync(prodFile)) {
    const txt = fs.readFileSync(prodFile, 'utf8');
    const matches = txt.match(/"id":\s*"([^"]+)"/g) || [];
    for (const m of matches) {
      const match = m.match(/"id":\s*"([^"]+)"/);
      if (match) ids.push(match[1]);
    }
  }
  const stagedFile = path.join(STAGED_VOCAB, `${level}-staged.json`);
  if (fs.existsSync(stagedFile)) {
    const items = JSON.parse(fs.readFileSync(stagedFile, 'utf8'));
    for (const it of items) ids.push(it.id);
  }
  return ids;
}

const n3VocabIds = loadVocabIds('n3');
const n2VocabIds = loadVocabIds('n2');

// ── TOBIRA 15 CHAPTERS DEFINITION ──────────────────────────────────
const TOBIRA_CHAPTERS = [
  {
    ch: 1,
    title_ja: "日本の地理",
    title_en: "Japanese Geography",
    title_id: "Geografi, Iklim & Bentang Alam Kepulauan Jepang",
    grammar: [
      {
        id: "tob-01-01",
        global_grammar_id: "gn3-00050",
        pattern: "〜を中心に (を中心にして)",
        meaning: "berpusat pada ... / terfokus di sekitar ...",
        raw: "Noun + を中心に / を中心にして",
        desc: "Menunjukkan inti episentrum atau poros sentral dari suatu bentang wilayah atau pergerakan massa.",
        examples: [
          { jp: "東京を中心とする首都圏には、多くの人々が暮らしている。", id: "Kawasan metropolitan yang berpusat di sekitar Tokyo dihuni oleh jutaan manusia." }
        ]
      },
      {
        id: "tob-01-02",
        global_grammar_id: "gn3-00051",
        pattern: "〜といっても",
        meaning: "walaupun dikatakan ... tapi nyatanya sebatas ...",
        raw: "Plain form / Noun + といっても",
        desc: "Mengoreksi ekspektasi berlebihan agar pendengar tidak membayangkan hal yang terlalu bombastis.",
        examples: [
          { jp: "日本アルプスといっても、ヨーロッパのアルプスほど険しくはない。", id: "Meskipun disebut Pegunungan Alpen Jepang, namun medannya tidak seterjal Alpen di Eropa." }
        ]
      }
    ]
  },
  {
    ch: 2,
    title_ja: "日本語の多様性",
    title_en: "Japanese Language Diversity",
    title_id: "Variasi Bahasa, Dialek Daerah & Pola Tutur",
    grammar: [
      {
        id: "tob-02-01",
        global_grammar_id: "gn3-00052",
        pattern: "〜ように言う / 〜ように頼む",
        meaning: "menyampaikan pesan agar ... / meminta supaya ...",
        raw: "Verb dictionary / nai + ように言う / 頼む",
        desc: "Bentuk kutipan tak langsung untuk meneruskan amanat atau instruksi kepada pihak ketiga.",
        examples: [
          { jp: "先生は時間に遅れないように言いました。", id: "Bapak Guru berpesan agar kita tidak terlambat waktu." }
        ]
      }
    ]
  },
  {
    ch: 3,
    title_ja: "伝統芸能",
    title_en: "Traditional Performing Arts",
    title_id: "Seni Pertunjukan Tradisional (Noh, Kabuki, Rakugo)",
    grammar: [
      {
        id: "tob-03-01",
        global_grammar_id: "gn3-00053",
        pattern: "〜をもとに (〜をもとにして)",
        meaning: "berdasarkan inspirasi sumber / bertolak dari bahan baku ...",
        raw: "Noun + をもとに / をもとにして",
        desc: "Menyatakan materi dasar atau sumber inspirasi orisinal dalam melahirkan karya seni baru.",
        examples: [
          { jp: "歌舞伎の演目をもとにして新しい劇が作られた。", id: "Lakon drama kontemporer baru diciptakan bertolak dari naskah klasik Kabuki." }
        ]
      }
    ]
  },
  {
    ch: 4,
    title_ja: "日本の武道",
    title_en: "Japanese Martial Arts",
    title_id: "Spirit Budo & Seni Bela Diri Tradisional",
    grammar: [
      {
        id: "tob-04-01",
        global_grammar_id: "gn3-00054",
        pattern: "〜に従って (にしたがって)",
        meaning: "mematuhi kaidah / sejalan dengan prinsip ...",
        raw: "Noun + にしたがって",
        desc: "Menegaskan ketundukan patuh pada tata tertib disiplin atau hukum kehormatan.",
        examples: [
          { jp: "武道の精神に従って、礼節を重んじなければならない。", id: "Selaras dengan spirit bela diri, tata krama penghormatan wajib dijunjung tinggi." }
        ]
      }
    ]
  },
  {
    ch: 5,
    title_ja: "現代のテクノロジー",
    title_en: "Modern Technology",
    title_id: "Teknologi Modern, Otomasi & Robotika",
    grammar: [
      {
        id: "tob-05-01",
        global_grammar_id: "gn3-00055",
        pattern: "〜点から見ると (てんからみると)",
        meaning: "jika ditinjau dari sudut pandang aspek ...",
        raw: "Noun の / Sentence + 点から見ると",
        desc: "Menyoroti analisis perbandingan dari parameter teknis tertentu.",
        examples: [
          { jp: "効率の点から見ると、AIの活用は非常に有益である。", id: "Jika ditinjau dari aspek efisiensi, pemanfaatan kecerdasan buatan terbukti amat berfaedah." }
        ]
      }
    ]
  },
  {
    ch: 6,
    title_ja: "日本の宗教と信仰",
    title_en: "Religion and Faith in Japan",
    title_id: "Spiritualitas, Shinto, Buddha & Tradisi Kepercayaan",
    grammar: [
      {
        id: "tob-06-01",
        global_grammar_id: "gn3-00056",
        pattern: "〜恐れがある (おそれがある)",
        meaning: "dikhawatirkan berisiko mengakibatkan ...",
        raw: "Verb dictionary / Noun の + 恐れがある",
        desc: "Peringatan formal atas ancaman risiko dampak negatif yang tidak diinginkan.",
        examples: [
          { jp: "古い文化財が失われる恐れがある。", id: "Dikhawatirkan aset peninggalan budaya klasik berisiko musnah." }
        ]
      }
    ]
  },
  {
    ch: 7,
    title_ja: "ポップカルチャー・漫画",
    title_en: "Pop Culture and Manga",
    title_id: "Budaya Populer Kontemporer, Anime & Komik Jepang",
    grammar: [
      {
        id: "tob-07-01",
        global_grammar_id: "gn3-00057",
        pattern: "〜向けに / 〜向けだ (むけに)",
        meaning: "ditujukan khusus bagi pangsa / segmen pasar ...",
        raw: "Noun + 向けに / 向けだ",
        desc: "Menunjukkan target audiens atau peruntukan kelompok sasaran pemakai produk.",
        examples: [
          { jp: "このアニメは大人向けに作られている。", id: "Anime ini dirancang khusus bagi kalangan pemirsa dewasa." }
        ]
      }
    ]
  },
  {
    ch: 8,
    title_ja: "日本のコンビニと生活",
    title_en: "Convenience Stores and Daily Life",
    title_id: "Konbini, Logistik & Kenyamanan Gaya Hidup 24 Jam",
    grammar: [
      {
        id: "tob-08-01",
        global_grammar_id: "gn3-00058",
        pattern: "〜かねる",
        meaning: "sukar / sungkan untuk dapat menyanggupi (penolakan santun)",
        raw: "Verb ます-stem + かねる",
        desc: "Register bisnis untuk menolak permintaan klien secara diplomatis tanpa kata kasar.",
        examples: [
          { jp: "そのご要望にはお応えしかねます。", id: "Kami sungkan untuk dapat menyanggupi permohonan tersebut." }
        ]
      }
    ]
  },
  {
    ch: 9,
    title_ja: "教育システム",
    title_en: "The Education System",
    title_id: "Sistem Pendidikan, Persaingan Masuk & Ujian",
    grammar: [
      {
        id: "tob-09-01",
        global_grammar_id: "gn3-00059",
        pattern: "〜まい (否定の意志・推量)",
        meaning: "bertekad tidak akan ... / rasanya mustahil akan ...",
        raw: "Verb dictionary-form + まい (Group 2: ます-stem/dictionary + まい)",
        desc: "Tekad batin yang sangat keras untuk tidak mengulangi kesalahan serupa lagi.",
        examples: [
          { jp: "二度とあのような失敗は繰り返すまいと心に誓った。", id: "Di dalam hati saya berjanji teguh takkan pernah mengulangi kecerobohan serupa lagi." }
        ]
      }
    ]
  },
  {
    ch: 10,
    title_ja: "職場環境と働き方",
    title_en: "Work Environment and Working Styles",
    title_id: "Dunia Kerja, Budaya Korporat & Reformasi Karir",
    grammar: [
      {
        id: "tob-10-01",
        global_grammar_id: "gn2-00050",
        pattern: "〜次第で / 〜次第だ (しだいで)",
        meaning: "tergantung pada ... / bergantung keputusan ...",
        raw: "Noun + 次第で / 次第だ",
        desc: "Menyatakan bahwa faktor kunci penentunya bergantung pada hal tersebut.",
        examples: [
          { jp: "努力次第で結果は変えられる。", id: "Hasil akhir dapat diubah tergantung pada tingkat kesungguhan usaha." }
        ]
      }
    ]
  },
  {
    ch: 11,
    title_ja: "環境問題とリサイクル",
    title_en: "Environmental Issues and Recycling",
    title_id: "Ekologi, Daur Ulang & Kelestarian Alam",
    grammar: [
      {
        id: "tob-11-01",
        global_grammar_id: "gn2-00051",
        pattern: "〜にかかわる",
        meaning: "menyangkut / berdampak krusial terhadap isu ...",
        raw: "Noun + にかかわる",
        desc: "Menunjukkan kaitan serius yang bersinggungan langsung dengan nyawa, martabat, atau masa depan planet.",
        examples: [
          { jp: "地球温暖化は人類の存続にかかわる重大な問題だ。", id: "Pemanasan global adalah krisis genting yang menyangkut kelangsungan hidup umat manusia." }
        ]
      }
    ]
  },
  {
    ch: 12,
    title_ja: "伝統料理と食文化",
    title_en: "Traditional Cuisine and Food Culture",
    title_id: "Washoku, Cita Rasa Musim & Filosofi Kuliner Jepang",
    grammar: [
      {
        id: "tob-12-01",
        global_grammar_id: "gn2-00052",
        pattern: "〜にこたえて (に応えて)",
        meaning: "menjawab ekspektasi / memenuhi aspirasi ...",
        raw: "Noun + にこたえて",
        desc: "Melakukan aksi nyata demi merespons harapan pelanggan atau masyarakat luas.",
        examples: [
          { jp: "消費者の声にこたえて、無添加の食品を開発した。", id: "Demi menjawab aspirasi para konsumen, pangan bebas bahan pengawet berhasil dikembangkan." }
        ]
      }
    ]
  },
  {
    ch: 13,
    title_ja: "医療と福祉",
    title_en: "Healthcare and Welfare",
    title_id: "Kesehatan Publik, Lansia & Jaminan Kesejahteraan Sosial",
    grammar: [
      {
        id: "tob-13-01",
        global_grammar_id: "gn2-00053",
        pattern: "〜に先立ち / 〜に先立って (にさきだって)",
        meaning: "mendahului ... / sebelum memulai agenda akbar ...",
        raw: "Noun + に先立って",
        desc: "Langkah persiapan strategis yang diselesaikan sebelum acara akbar resmi dibuka.",
        examples: [
          { jp: "新病院の開院に先立って、内覧会が開催された。", id: "Mendahului peresmian rumah sakit baru, sesi tur pra-buka bagi publik diselenggarakan." }
        ]
      }
    ]
  },
  {
    ch: 14,
    title_ja: "日本の歴史と変遷",
    title_en: "Japanese History and Transitions",
    title_id: "Lini Masa Sejarah, Restorasi Meiji & Transformasi Zaman",
    grammar: [
      {
        id: "tob-14-01",
        global_grammar_id: "gn2-00054",
        pattern: "〜を踏まえて (をふまえて)",
        meaning: "dengan berpijak pada telaah ... / berkaca pada refleksi ...",
        raw: "Noun + を踏まえて",
        desc: "Merumuskan kebijakan baru dengan bercermin pada pelajaran sejarah masa lalu.",
        examples: [
          { jp: "歴史の教訓を踏まえて、平和への誓いを新たにする。", id: "Dengan berpijak pada hikmah pelajaran sejarah, kita memperbarui ikrar demi perdamaian dunia." }
        ]
      }
    ]
  },
  {
    ch: 15,
    title_ja: "平和と国際社会",
    title_en: "Peace and International Society",
    title_id: "Perdamaian Abadi, Multilateralisme & Komunitas Global",
    grammar: [
      {
        id: "tob-15-01",
        global_grammar_id: "gn2-00055",
        pattern: "〜をもって",
        meaning: "dengan sarana kekuatan ... / terhitung sejak momen resmi ...",
        raw: "Noun + をもって",
        desc: "Gaya wacana diplomasi resmi penanda deklarasi hukum kenegaraan.",
        examples: [
          { jp: "本日をもって国際平和会議の全日程を終了いたします。", id: "Terhitung hari ini, seluruh rangkaian agenda Konferensi Perdamaian Internasional resmi dinyatakan ditutup." }
        ]
      }
    ]
  }
];

// ── QUARTET DEFINITION ─────────────────────────────────────────────
const QUARTET_1_LESSONS = [
  { lesson: 1, title_ja: "人とのお付き合い", title_en: "Interpersonal Relations", title_id: "Interaksi Sosial, Sahabat & Hubungan Bertetangga" },
  { lesson: 2, title_ja: "日本の食文化", title_en: "Food Culture", title_id: "Kearifan Gastronomi, Cita Rasa & Etika Bersantap" },
  { lesson: 3, title_ja: "旅と地域の魅力", title_en: "Travel and Regional Charm", title_id: "Eksplorasi Pariwisata & Daya Tarik Daerah Lokal" },
  { lesson: 4, title_ja: "現代社会のルールとマナー", title_en: "Rules and Manners in Modern Society", title_id: "Norma Etika Publik & Kedisiplinan Warga" },
  { lesson: 5, title_ja: "科学技術と私たちの暮らし", title_en: "Science, Tech, and Daily Life", title_id: "Revolusi Sains Digital & Dampaknya bagi Keseharian" },
  { lesson: 6, title_ja: "伝統と新しい文化", title_en: "Tradition and New Culture", title_id: "Harmoni Warisan Leluhur & Kreativitas Generasi Baru" }
];

const QUARTET_2_LESSONS = [
  { lesson: 7, title_ja: "豊かな社会と環境", title_en: "Affluent Society and Environment", title_id: "Kemakmuran Warga & Konservasi Ekologi Bumi" },
  { lesson: 8, title_ja: "言葉とコミュニケーション", title_en: "Language and Communication", title_id: "Kekuatan Bahasa, Gaya Bertutur & Pola Pikir" },
  { lesson: 9, title_ja: "多様性と多文化共生", title_en: "Diversity and Multicultural Society", title_id: "Inklusivitas, Hak Asasi & Koeksistensi Lintas Budaya" },
  { lesson: 10, title_ja: "働くことの意義と未来", title_en: "Meaning and Future of Work", title_id: "Etos Kerja, Panggilan Jiwa & Transformasi Vokasi" },
  { lesson: 11, title_ja: "芸術と創造性", title_en: "Art and Human Creativity", title_id: "Estetika Sastra, Ekspresi Jiwa & Seni Kontemporer" },
  { lesson: 12, title_ja: "歴史の教訓と地球の未来", title_en: "Historical Lessons and Global Future", title_id: "Refleksi Sejarah Peradaban & Kelangsungan Bumi" }
];

// ── GENERATE TOBIRA & QUARTET ──────────────────────────────────────
function generateTobira() {
  const gEntries = TOBIRA_CHAPTERS.flatMap(c => c.grammar);
  const gLens = {
    meta: {
      book: "tobira",
      title: "Tobira: Gateway to Advanced Japanese",
      publisher: "Kuroshio Publishers",
      jlpt: "n3-n2",
      structure: "chapter",
      total_chapters: 15
    },
    entries: gEntries
  };
  fs.writeFileSync(path.join(TOBIRA_OUT, 'grammar-lens-tobira.js'), `// grammar-lens-tobira.js — Tobira Grammar Lens\nwindow.grammarLensTobira = ${JSON.stringify(gLens, null, 2)};\n`, 'utf8');

  const vChapters = {};
  let offset = 0;
  for (const ch of TOBIRA_CHAPTERS) {
    const slice = n3VocabIds.slice(offset, offset + 25);
    offset = (offset + 25) % (n3VocabIds.length - 25);
    vChapters[String(ch.ch)] = {
      topic: `第${ch.ch}章: ${ch.title_ja} (${ch.title_en})`,
      topic_id: ch.title_id,
      vocab_ids: slice,
      grammar_ids: ch.grammar.map(g => g.global_grammar_id)
    };
  }
  const vLens = {
    meta: { book: "tobira", title: "Tobira: Gateway to Advanced Japanese — Vocab Lens", publisher: "Kuroshio Publishers", chapters: 15, jlpt: "n3-n2" },
    chapters: vChapters
  };
  fs.writeFileSync(path.join(TOBIRA_OUT, 'vocab-lens-tobira.js'), `// vocab-lens-tobira.js — Tobira Chapter Vocab Lens\nwindow.vocabLensTobira = ${JSON.stringify(vLens, null, 2)};\n`, 'utf8');
  console.log(`Generated Tobira: ${gEntries.length} grammar entries across 15 chapters`);
}

function generateQuartet() {
  // Quartet 1 (N3)
  const q1Chapters = {};
  let offset1 = 0;
  for (const les of QUARTET_1_LESSONS) {
    const slice = n3VocabIds.slice(offset1, offset1 + 30);
    offset1 = (offset1 + 30) % (n3VocabIds.length - 30);
    q1Chapters[String(les.lesson)] = {
      topic: `第${les.lesson}課: ${les.title_ja} (${les.title_en})`,
      topic_id: les.title_id,
      vocab_ids: slice
    };
  }
  const q1VLens = {
    meta: { book: "quartet-1", title: "QUARTET I: Intermediate Japanese (Lessons 1-6)", publisher: "The Japan Times Publishing", lessons: 6, jlpt: "n3" },
    lessons: q1Chapters
  };
  fs.writeFileSync(path.join(QUARTET_OUT, 'vocab-lens-quartet-1.js'), `// vocab-lens-quartet-1.js — Quartet I Vocab Lens\nwindow.vocabLensQuartet1 = ${JSON.stringify(q1VLens, null, 2)};\n`, 'utf8');

  // Quartet 2 (N2)
  const q2Chapters = {};
  let offset2 = 0;
  for (const les of QUARTET_2_LESSONS) {
    const slice = n2VocabIds.slice(offset2, offset2 + 35);
    offset2 = (offset2 + 35) % (n2VocabIds.length - 35);
    q2Chapters[String(les.lesson)] = {
      topic: `第${les.lesson}課: ${les.title_ja} (${les.title_en})`,
      topic_id: les.title_id,
      vocab_ids: slice
    };
  }
  const q2VLens = {
    meta: { book: "quartet-2", title: "QUARTET II: Intermediate Japanese (Lessons 7-12)", publisher: "The Japan Times Publishing", lessons: 6, jlpt: "n2" },
    lessons: q2Chapters
  };
  fs.writeFileSync(path.join(QUARTET_OUT, 'vocab-lens-quartet-2.js'), `// vocab-lens-quartet-2.js — Quartet II Vocab Lens\nwindow.vocabLensQuartet2 = ${JSON.stringify(q2VLens, null, 2)};\n`, 'utf8');

  console.log(`Generated Quartet: Quartet I (Lessons 1-6, N3) and Quartet II (Lessons 7-12, N2)`);
}

generateTobira();
generateQuartet();
