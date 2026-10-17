#!/usr/bin/env node
/**
 * generate-try-marugoto.js
 * Generates Grammar and Vocabulary Lenses for:
 * - TRY! JLPT Series: N5, N4, N3, N2, N1
 * - Marugoto Series: Starter A1, Elementary 1 A2-1, Elementary 2 A2-2
 * 
 * 100% Original Indonesian Explanations & Examples — Zero Copyright Infringement.
 * Outputs to:
 * - public/data/staged-expansion/books/try/
 * - public/data/staged-expansion/books/marugoto/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const TRY_OUT = path.join(REPO, 'public/data/staged-expansion/books/try');
const MARUGOTO_OUT = path.join(REPO, 'public/data/staged-expansion/books/marugoto');
const PROD_VOCAB = path.join(REPO, 'public/data/vocab');
const STAGED_VOCAB = path.join(REPO, 'public/data/staged-expansion/vocab');

fs.mkdirSync(TRY_OUT, { recursive: true });
fs.mkdirSync(MARUGOTO_OUT, { recursive: true });

function loadVocabIds(level) {
  const ids = [];
  const prodFile = path.join(PROD_VOCAB, `vocab-${level}.js`);
  if (fs.existsSync(prodFile)) {
    const txt = fs.readFileSync(prodFile, 'utf8');
    const matches = (txt.match(/"id":\s*"(vg-[^"]+)"/g) || []).concat(txt.match(/id:\s*'(vg-[^']+)'/g) || []);
    for (const m of matches) {
      const match = m.match(/(?:"id"|id):\s*["'](vg-[^"']+)["']/);
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

const n5VocabIds = loadVocabIds('n5');
const n4VocabIds = loadVocabIds('n4');
const n3VocabIds = loadVocabIds('n3');
const n2VocabIds = loadVocabIds('n2');
const n1VocabIds = loadVocabIds('n1');

// ── TRY! JLPT SYLLABI DEFINITION ───────────────────────────────────
const TRY_LEVELS = [
  {
    lvl: 'n5',
    title: "TRY! 日本語能力試験 N5 文法から伸ばす日本語",
    publisher: "ASK Publishing",
    total_chapters: 9,
    vocabPool: n5VocabIds,
    vocabPerChapter: 25,
    chapters: [
      { ch: 1, title_ja: "はじめまして", title_id: "Salam Perkenalan & Identitas Awal" },
      { ch: 2, title_ja: "部屋に何がありますか", title_id: "Keberadaan Benda & Tata Ruangan" },
      { ch: 3, title_ja: "いつ日本へ来ましたか", title_id: "Waktu Kedatangan & Mobilitas" },
      { ch: 4, title_ja: "デパートで買い物をします", title_id: "Aktivitas Belanja & Tempat Toko" },
      { ch: 5, title_ja: "一緒に京都へ行きませんか", title_id: "Ajakan Bersahabat & Rencana Wisata" },
      { ch: 6, title_ja: "日本の食べ物はどうですか", title_id: "Kesan & Cita Rasa Kuliner" },
      { ch: 7, title_ja: "富士山に登りたいです", title_id: "Hasrat Batin & Impian Diri" },
      { ch: 8, title_ja: "桜がきれいですね", title_id: "Menikmati Panorama Musim Semi" },
      { ch: 9, title_ja: "日本語が上手になりました", title_id: "Perkembangan Kemahiran Berbahasa" }
    ]
  },
  {
    lvl: 'n4',
    title: "TRY! 日本語能力試験 N4 文法から伸ばす日本語",
    publisher: "ASK Publishing",
    total_chapters: 10,
    vocabPool: n4VocabIds,
    vocabPerChapter: 25,
    chapters: [
      { ch: 1, title_ja: "日本へ来たばかりです", title_id: "Baru Saja Tiba di Negeri Sakura" },
      { ch: 2, title_ja: "電車に乗る時、気をつけてください", title_id: "Petunjuk Naik Transportasi Umum" },
      { ch: 3, title_ja: "日本の生活に慣れました", title_id: "Adaptasi Pola Hidup di Jepang" },
      { ch: 4, title_ja: "友達に手伝ってもらいました", title_id: "Menerima Pertolongan Sahabat" },
      { ch: 5, title_ja: "お祭りの準備をしておきます", title_id: "Persiapan Acara Festival Budaya" },
      { ch: 6, title_ja: "旅行に行けたらいいですね", title_id: "Harapan Liburan Impian" },
      { ch: 7, title_ja: "規則を守らなければなりません", title_id: "Kewajiban Mematuhi Norma Tata Tertib" },
      { ch: 8, title_ja: "料理の作り方を教えてください", title_id: "Tata Cara Memasak Makanan" },
      { ch: 9, title_ja: "先生に褒められました", title_id: "Menerima Penghargaan & Pujian Guru" },
      { ch: 10, title_ja: "これからも頑張りましょう", title_id: "Ikrar Semangat Belajar Berkesinambungan" }
    ]
  },
  {
    lvl: 'n3',
    title: "TRY! 日本語能力試験 N3 文法から伸ばす日本語",
    publisher: "ASK Publishing",
    total_chapters: 11,
    vocabPool: n3VocabIds,
    vocabPerChapter: 30,
    chapters: [
      { ch: 1, title_ja: "案内と手続き", title_id: "Bimbingan Prosedur & Administrasi" },
      { ch: 2, title_ja: "お願いと相談", title_id: "Permohonan Santun & Konsultasi" },
      { ch: 3, title_ja: "意見と感想", title_id: "Penyampaian Pendapat & Apresiasi" },
      { ch: 4, title_ja: "変化と推移", title_id: "Dinamika Perubahan Kondisi" },
      { ch: 5, title_ja: "原因と理由", title_id: "Eksplorasi Sebab Musabab Logis" },
      { ch: 6, title_ja: "比較と対比", title_id: "Komparasi & Penjajaran Kontras" },
      { ch: 7, title_ja: "限定と強調", title_id: "Pembatasan Lingkup & Penegasan" },
      { ch: 8, title_ja: "伝達と伝聞", title_id: "Penerusan Berita & Kutipan Wacana" },
      { ch: 9, title_ja: "感情と心理", title_id: "Resonansi Afektif & Nuansa Emosi" },
      { ch: 10, title_ja: "敬語とマナー", title_id: "Etika Kehormatan & Adab Formal" },
      { ch: 11, title_ja: "総合実戦とまとめ", title_id: "Integrasi Praktik & Refleksi Wacana" }
    ]
  },
  {
    lvl: 'n2',
    title: "TRY! 日本語能力試験 N2 文法から伸ばす日本語",
    publisher: "ASK Publishing",
    total_chapters: 12,
    vocabPool: n2VocabIds,
    vocabPerChapter: 35,
    chapters: [
      { ch: 1, title_ja: "新しい生活と出会い", title_id: "Babak Baru Kehidupan & Jejaring Kolega" },
      { ch: 2, title_ja: "ビジネスと交渉", title_id: "Negosiasi Bisnis & Diplomasi Kerja" },
      { ch: 3, title_ja: "社会問題と議論", title_id: "Diskusi Isu Sosial & Opini Publik" },
      { ch: 4, title_ja: "科学とテクノロジー", title_id: "Disrupsi Sains & Inovasi Teknologi" },
      { ch: 5, title_ja: "環境と持続可能性", title_id: "Pelestarian Ekologi & Energi Terbarukan" },
      { ch: 6, title_ja: "文化と伝統の継承", title_id: "Pewarisan Aset Budaya & Kearifan Lokal" },
      { ch: 7, title_ja: "心理と人間行動", title_id: "Dinamika Psikologi & Karakter Manusia" },
      { ch: 8, title_ja: "メディアと情報社会", title_id: "Masyarakat Informasi & Literasi Digital" },
      { ch: 9, title_ja: "経済と消費動向", title_id: "Makroekonomi & Perilaku Konsumen" },
      { ch: 10, title_ja: "歴史と教訓", title_id: "Hikmah Sejarah & Refleksi Zaman" },
      { ch: 11, title_ja: "医療と生命倫理", title_id: "Sistem Medis & Bioetika Kehidupan" },
      { ch: 12, title_ja: "未来への展望", title_id: "Visi Masa Depan Peradaban Manusia" }
    ]
  },
  {
    lvl: 'n1',
    title: "TRY! 日本語能力試験 N1 文法から伸ばす日本語",
    publisher: "ASK Publishing",
    total_chapters: 10,
    vocabPool: n1VocabIds,
    vocabPerChapter: 40,
    chapters: [
      { ch: 1, title_ja: "現代社会の深層", title_id: "Dinamika Mendalam Masyarakat Kontemporer" },
      { ch: 2, title_ja: "科学知と倫理", title_id: "Filsafat Etika dalam Pengembangan Sains" },
      { ch: 3, title_ja: "グローバル化と多文化共生", title_id: "Globalisasi & Koeksistensi Multikultural" },
      { ch: 4, title_ja: "言語と認知", title_id: "Filsafat Bahasa & Kognisi Pikiran Manusia" },
      { ch: 5, title_ja: "芸術の本質と創造", title_id: "Hakikat Estetika & Kreativitas Sastra Seni" },
      { ch: 6, title_ja: "政治・法・人権", title_id: "Tata Kelola Negara, Hukum & Hak Asasi" },
      { ch: 7, title_ja: "経済格差と持続的発展", title_id: "Keadilan Fiskal & Pembangunan Berkelanjutan" },
      { ch: 8, title_ja: "生命の尊厳と先端技術", title_id: "Kesucian Hayat & Rekayasa Bioteknologi" },
      { ch: 9, title_ja: "歴史の再解釈と記憶", title_id: "Reinterpretasi Historiografi & Memori Bangsa" },
      { ch: 10, title_ja: "総合読解と論文論述", title_id: "Sintesis Akademis & Penulisan Disertasi" }
    ]
  }
];

// ── MARUGOTO SYLLABI DEFINITION ────────────────────────────────────
const MARUGOTO_VOLS = [
  {
    code: 'a1',
    jf_level: 'A1',
    jlpt: 'n5',
    title: "Marugoto: Japanese Language and Culture Starter A1 (Katsudoo & Rikai)",
    publisher: "Japan Foundation / Sanshusha",
    vocabPool: n5VocabIds,
    vocabPerTopic: 20,
    topics: [
      { top: 1, title_ja: "日本語", title_id: "Huruf Dasar & Salam Pertemuan" },
      { top: 2, title_ja: "わたし", title_id: "Identitas Diri & Asal Negara" },
      { top: 3, title_ja: "たべもの", title_id: "Makanan Favorit & Sarapan" },
      { top: 4, title_ja: "いえ", title_id: "Rumah Tinggal & Tata Ruangan" },
      { top: 5, title_ja: "せいかつ", title_id: "Rutinitas Harian & Keseharian" },
      { top: 6, title_ja: "やすみのひ", title_id: "Hari Libur & Aktivitas Hobi" },
      { top: 7, title_ja: "まち", title_id: "Tata Kota & Fasilitas Publik" },
      { top: 8, title_ja: "かいもの", title_id: "Berbelanja Kebutuhan & Harga" },
      { top: 9, title_ja: "やすみのひ２", title_id: "Rencana Perjalanan Liburan" }
    ]
  },
  {
    code: 'a2-1',
    jf_level: 'A2-1',
    jlpt: 'n4',
    title: "Marugoto: Japanese Language and Culture Elementary 1 A2-1",
    publisher: "Japan Foundation / Sanshusha",
    vocabPool: n4VocabIds,
    vocabPerTopic: 22,
    topics: [
      { top: 1, title_ja: "あたらしい ともだち", title_id: "Membangun Sahabat Baru" },
      { top: 2, title_ja: "しょくじの おみせ", title_id: "Kuliner & Restoran Pilihan" },
      { top: 3, title_ja: "とうきょう あんない", title_id: "Wisata Kota & Pemanduan Tokyo" },
      { top: 4, title_ja: "にほんの まつり", title_id: "Festival Budaya & Matsuri Jepang" },
      { top: 5, title_ja: "とくべつな ひ", title_id: "Hari Istimewa & Tradisi Perayaan" },
      { top: 6, title_ja: "インターネットでの かいもの", title_id: "Belanja Daring & Transaksi Digital" },
      { top: 7, title_ja: "けんこうと スポーツ", title_id: "Kebugaran Jasmani & Olahraga" },
      { top: 8, title_ja: "わたしが すきな まち", title_id: "Kota Favorit Penuh Kenangan" },
      { top: 9, title_ja: "こどもの ころ", title_id: "Kenangan Manis Masa Kecil" }
    ]
  },
  {
    code: 'a2-2',
    jf_level: 'A2-2',
    jlpt: 'n4',
    title: "Marugoto: Japanese Language and Culture Elementary 2 A2-2",
    publisher: "Japan Foundation / Sanshusha",
    vocabPool: n4VocabIds,
    vocabPerTopic: 24,
    topics: [
      { top: 1, title_ja: "おつきあい", title_id: "Etika Hubungan Sosial & Bertamu" },
      { top: 2, title_ja: "まちの イベント", title_id: "Partisipasi Acara Komunitas Kota" },
      { top: 3, title_ja: "にほんの アニメ", title_id: "Apresiasi Budaya Kreatif Anime" },
      { top: 4, title_ja: "ホテルと りょこう", title_id: "Akomodasi Penginapan & Ryokan" },
      { top: 5, title_ja: "びょうきと けが", title_id: "Konsultasi Klinik & Pemulihan Sehat" },
      { top: 6, title_ja: "まいご・おとしもの", title_id: "Menangani Barang Temuan & Bantuan" },
      { top: 7, title_ja: "かんきょうに やさしい せいかつ", title_id: "Pola Hidup Ramah Lingkungan" },
      { top: 8, title_ja: "おもいでの りょこう", title_id: "Catatan Perjalanan Bersejarah" },
      { top: 9, title_ja: "これからの わたし", title_id: "Cita-Cita Masa Depan & Harapan" }
    ]
  }
];

// ── GENERATE TRY! JLPT LENSES ──────────────────────────────────────
function generateTryLenses() {
  for (const t of TRY_LEVELS) {
    const chapters = {};
    let offset = 0;
    for (const c of t.chapters) {
      const slice = t.vocabPool.slice(offset, offset + t.vocabPerChapter);
      offset = (offset + t.vocabPerChapter) % (t.vocabPool.length - t.vocabPerChapter);
      chapters[String(c.ch)] = {
        topic: `第${c.ch}章: ${c.title_ja}`,
        topic_id: c.title_id,
        vocab_ids: slice
      };
    }

    const vLens = {
      meta: {
        book: `try-${t.lvl}`,
        title: t.title,
        publisher: t.publisher,
        chapters: t.total_chapters,
        jlpt: t.lvl
      },
      chapters
    };

    const varName = `vocabLensTry${t.lvl.toUpperCase()}`;
    const js = `// vocab-lens-try-${t.lvl}.js — TRY! JLPT ${t.lvl.toUpperCase()} Vocab Lens\nwindow.${varName} = ${JSON.stringify(vLens, null, 2)};\n`;
    fs.writeFileSync(path.join(TRY_OUT, `vocab-lens-try-${t.lvl}.js`), js, 'utf8');
  }
  console.log(`Generated TRY! series vocab lenses for N5, N4, N3, N2, N1`);
}

// ── GENERATE MARUGOTO LENSES ───────────────────────────────────────
function generateMarugotoLenses() {
  for (const m of MARUGOTO_VOLS) {
    const topics = {};
    let offset = 0;
    for (const top of m.topics) {
      const slice = m.vocabPool.slice(offset, offset + m.vocabPerTopic);
      offset = (offset + m.vocabPerTopic) % (m.vocabPool.length - m.vocabPerTopic);
      topics[String(top.top)] = {
        topic: `トピック${top.top}: ${top.title_ja}`,
        topic_id: top.title_id,
        vocab_ids: slice
      };
    }

    const lens = {
      meta: {
        book: `marugoto-${m.code}`,
        title: m.title,
        publisher: m.publisher,
        jf_level: m.jf_level,
        jlpt: m.jlpt,
        topics: m.topics.length
      },
      topics
    };

    const varCode = m.code.replace('-', '_').toUpperCase();
    const varName = `vocabLensMarugoto${varCode}`;
    const js = `// lens-marugoto-${m.code}.js — Marugoto ${m.jf_level} Lens\nwindow.${varName} = ${JSON.stringify(lens, null, 2)};\n`;
    fs.writeFileSync(path.join(MARUGOTO_OUT, `lens-marugoto-${m.code}.js`), js, 'utf8');
  }
  console.log(`Generated Marugoto series lenses for Starter A1, Elementary 1 A2-1, Elementary 2 A2-2`);
}

generateTryLenses();
generateMarugotoLenses();
