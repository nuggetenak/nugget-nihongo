#!/usr/bin/env node
/**
 * generate-shin-kanzen-master.js
 * Generates Grammar and Vocabulary Lenses for Shin Kanzen Master (N3, N2, N1).
 * 
 * - SKM N3: Bunpou (12 Units) & Goi (10 Units)
 * - SKM N2: Bunpou (14 Units) & Goi (12 Units)
 * - SKM N1: Bunpou (15 Units) & Goi (14 Units)
 * 
 * 100% Original Indonesian Explanations & Examples — Zero Copyright Infringement.
 * Outputs to public/data/staged-expansion/books/shin-kanzen-master/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const OUT_DIR = path.join(REPO, 'public/data/staged-expansion/books/shin-kanzen-master');
const PROD_VOCAB = path.join(REPO, 'public/data/vocab');
const STAGED_VOCAB = path.join(REPO, 'public/data/staged-expansion/vocab');

fs.mkdirSync(OUT_DIR, { recursive: true });

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

const n3VocabIds = loadVocabIds('n3');
const n2VocabIds = loadVocabIds('n2');
const n1VocabIds = loadVocabIds('n1');

// ── SKM N3 BUNPOU DEFINITION (12 Units) ────────────────────────────
const SKM_N3_UNITS = [
  {
    unit: 1,
    title_ja: "時・時を表す表現",
    title_en: "Time and Chronological Relations",
    title_id: "Waktu & Hubungan Kronologis Peristiwa",
    entries: [
      {
        id: "skm-n3-u01-01",
        global_grammar_id: "gn3-00001",
        pattern: "〜最中に (さいちゅうに)",
        meaning: "tepat di tengah-tengah / saat sedang asyik ...",
        raw: "Verb ている / Noun の + 最中に",
        desc: "Menyatakan bahwa suatu kejadian mendadak atau tak terduga menyela aksi utama yang sedang aktif berlangsung.",
        examples: [
          { jp: "食事の最中に電話がかかってきた。", id: "Telepon berdering tepat saat sedang makan." },
          { jp: "会議の最中に停電が起きた。", id: "Mati lampu terjadi persis di tengah-tengah rapat." }
        ]
      },
      {
        id: "skm-n3-u01-02",
        global_grammar_id: "gn3-00002",
        pattern: "〜うちに",
        meaning: "selagi / mumpung ... (sebelum kondisi berubah)",
        raw: "Verb dictionary/nai/ている / Adj / Noun の + うちに",
        desc: "Mengambil tindakan mumpung batas kesempatan belum lenyap atau perubahan terjadi tanpa disadari di tengah proses.",
        examples: [
          { jp: "温かいうちに召し上がってください。", id: "Silakan dinikmati selagi masih hangat." },
          { jp: "日本にいるうちに富士山に登りたい。", id: "Mumpung masih berada di Jepang, saya ingin mendaki Gunung Fuji." }
        ]
      },
      {
        id: "skm-n3-u01-03",
        global_grammar_id: "gn3-00003",
        pattern: "〜たとたん（に）",
        meaning: "begitu ... seketika itu juga (kejadian spontan tak terduga)",
        raw: "Verb た-form + とたん（に）",
        desc: "Aksi kedua terjadi secara refleks atau mengejutkan seketika aksi pertama selesai.",
        examples: [
          { jp: "ドアを開けたとたん、猫が飛び出してきた。", id: "Begitu pintu dibuka, seekor kucing langsung melompat keluar." },
          { jp: "立ち上がったとたんに、めまいがした。", id: "Seketika berdiri, saya langsung merasa pusing." }
        ]
      }
    ]
  },
  {
    unit: 2,
    title_ja: "条件・仮定表現",
    title_en: "Conditions and Hypotheses",
    title_id: "Pengandaian & Kondisi Korelatif",
    entries: [
      {
        id: "skm-n3-u02-01",
        global_grammar_id: "gn3-00004",
        pattern: "〜ば〜ほど",
        meaning: "semakin ..., maka semakin ... (korelasi proporsional)",
        raw: "Verb/Adj ば + Verb/Adj ほど",
        desc: "Menyatakan bahwa peningkatan intensitas pada syarat pertama sebanding langsung dengan peningkatan hasil pada bagian kedua.",
        examples: [
          { jp: "練習すればするほど上手になります。", id: "Semakin banyak berlatih, maka akan semakin mahir." },
          { jp: "本は読めば読むほど新しい発見がある。", id: "Buku itu semakin dibaca, semakin banyak penemuan baru yang didapat." }
        ]
      },
      {
        id: "skm-n3-u02-02",
        global_grammar_id: "gn3-00005",
        pattern: "〜につれて / 〜にしたがって",
        meaning: "seiring dengan ... / sejalan dengan perkembangan ...",
        raw: "Verb dictionary / Noun + につれて / にしたがって",
        desc: "Menunjukkan perubahan bertahap alami yang terjadi secara paralel seiring bergeraknya faktor waktu atau kondisi.",
        examples: [
          { jp: "時間が経つにつれて、悲しみが薄れていった。", id: "Seiring berlalunya waktu, rasa duka perlahan memudar." },
          { jp: "台風が近づくにしたがって、風が強くなってきた。", id: "Sejalan dengan mendekatnya badai topan, angin bertiup makin kencang." }
        ]
      }
    ]
  },
  {
    unit: 3,
    title_ja: "目的・手段・対象",
    title_en: "Purpose, Means, and Targets",
    title_id: "Tujuan, Sarana & Objek Sasaran",
    entries: [
      {
        id: "skm-n3-u03-01",
        global_grammar_id: "gn3-00006",
        pattern: "〜ように",
        meaning: "supaya / agar ... (tujuan di luar kontrol langsung)",
        raw: "Verb potential / Verb nai + ように",
        desc: "Menetapkan target kondisi yang diharapkan dapat tercapai melalui usaha yang dilakukan.",
        examples: [
          { jp: "風邪をひかないように温かい服を着ます。", id: "Mengenakan pakaian hangat agar tidak masuk angin." },
          { jp: "忘れないようにメモしておきます。", id: "Mencatat supaya tidak lupa." }
        ]
      },
      {
        id: "skm-n3-u03-02",
        global_grammar_id: "gn3-00007",
        pattern: "〜によって / 〜による",
        meaning: "melalui sarana ... / tergantung pada ... / akibat dari ...",
        raw: "Noun + によって / による + Noun",
        desc: "Partikel majemuk serbaguna penunjuk metode kerja, instrumen, penyebab timbulnya dampak, atau variasi klasifikasi.",
        examples: [
          { jp: "インターネットによって世界中のニュースが読める。", id: "Melalui internet, berita dari seluruh dunia dapat dibaca." },
          { jp: "人によって考え方が違います。", id: "Tergantung orangnya, cara berpikirnya berbeda-beda." }
        ]
      },
      {
        id: "skm-n3-u03-03",
        global_grammar_id: "gn3-00008",
        pattern: "〜を通じて / 〜を通して (をつうじて / をとおして)",
        meaning: "melalui perantara ... / sepanjang kurun waktu ...",
        raw: "Noun + を通じて / を通して",
        desc: "Menunjukkan perantara mediasi komunikasi atau durasi kesinambungan sepanjang masa.",
        examples: [
          { jp: "ボランティア活動を通じて多くの友人ができた。", id: "Melalui kegiatan sukarelawan, saya mendapatkan banyak sahabat." },
          { jp: "四季を通じて観光客が訪れます。", id: "Sepanjang empat musim para wisatawan selalu berkunjung." }
        ]
      }
    ]
  },
  {
    unit: 4,
    title_ja: "理由・原因",
    title_en: "Reasons and Causes",
    title_id: "Alasan & Sebab Musabab Logis",
    entries: [
      {
        id: "skm-n3-u04-01",
        global_grammar_id: "gn3-00009",
        pattern: "〜おかげで / 〜せいで",
        meaning: "berkat ... (positif) / gara-gara ... (negatif)",
        raw: "Plain form / Noun の + おかげで / せいで",
        desc: "Kontras afektif: おかげで mengungkapkan rasa syukur atas hasil positif, sedangkan せいで menimpakan kesalahan pada faktor penyebab atas hasil buruk.",
        examples: [
          { jp: "先生のおかげでJLPTに合格できました。", id: "Berkat bimbingan guru, saya berhasil lulus JLPT." },
          { jp: "寝坊したせいで電車に乗り遅れた。", id: "Gara-gara bangun kesiangan, saya tertinggal kereta." }
        ]
      },
      {
        id: "skm-n3-u04-02",
        global_grammar_id: "gn3-00010",
        pattern: "〜につき",
        meaning: "dikarenakan ... (alasan formal dalam pengumuman tertulis)",
        raw: "Noun + につき",
        desc: "Register tertulis formal yang digunakan dalam plang pemberitahuan publik atau urusan resmi.",
        examples: [
          { jp: "工事中につき通り抜けできません。", id: "Dikarenakan sedang dalam perbaikan, jalan ini tidak dapat dilewati." },
          { jp: "雨天につき本日の試合は中止といたします。", id: "Dikarenakan cuaca hujan, pertandingan hari ini ditiadakan." }
        ]
      }
    ]
  },
  {
    unit: 5,
    title_ja: "逆接・譲歩",
    title_en: "Contrast and Concession",
    title_id: "Pertentangan & Kontras Tak Terduga",
    entries: [
      {
        id: "skm-n3-u05-01",
        global_grammar_id: "gn3-00011",
        pattern: "〜にもかかわらず",
        meaning: "meskipun ... / terlepas dari kenyataan bahwa ...",
        raw: "Plain form / Noun (である) + にもかかわらず",
        desc: "Hasil yang terjadi sama sekali bertolak belakang dengan situasi rintangan atau ekspektasi umum.",
        examples: [
          { jp: "大雨にもかかわらず、多くの観客が集まった。", id: "Meskipun hujan lebat, banyak penonton yang tetap berkumpul." }
        ]
      },
      {
        id: "skm-n3-u05-02",
        global_grammar_id: "gn3-00012",
        pattern: "〜わりに（は）",
        meaning: "untuk ukuran ... tergolong ... (kontras standar)",
        raw: "Plain form / Noun の + わりに",
        desc: "Menyatakan penilaian yang tidak proporsional dibanding ekspektasi standar yang melekat pada benda tersebut.",
        examples: [
          { jp: "このレストランは値段のわりに料理がおいしい。", id: "Restoran ini masakannya enak untuk ukuran harganya yang murah." }
        ]
      },
      {
        id: "skm-n3-u05-03",
        global_grammar_id: "gn3-00013",
        pattern: "〜くせに",
        meaning: "padahal cuma ... tapi sok ... (kritik mencela)",
        raw: "Plain form / Noun の + くせに",
        desc: "Ungkapan bernada menyindir atau mencela seseorang atas kontradiksi sikapnya yang tidak pantas.",
        examples: [
          { jp: "自分では何もしないくせに、文句ばかり言う。", id: "Padahal dirinya sendiri tidak berbuat apa-apa, tapi sukanya cuma mengeluh." }
        ]
      }
    ]
  },
  {
    unit: 6,
    title_ja: "程度・比較",
    title_en: "Degree and Comparison",
    title_id: "Derajat, Kadar & Komparasi Relatif",
    entries: [
      {
        id: "skm-n3-u06-01",
        global_grammar_id: "gn3-00014",
        pattern: "〜くらい / 〜ほど",
        meaning: "sampai-sampai ... / sedemikian hingga ... (tingkat ekstrem)",
        raw: "Plain form / Noun + くらい / ほど",
        desc: "Menggambarkan intensitas atau kedalaman suatu kondisi melalui perumpamaan peristiwa konkret.",
        examples: [
          { jp: "涙が出るほどうれしかった。", id: "Saya merasa begitu bahagia sampai-sampai meneteskan air mata." },
          { jp: "声が出ないくらい疲れた。", id: "Saya sangat lelah sampai-sampai tidak sanggup bersuara." }
        ]
      },
      {
        id: "skm-n3-u06-02",
        global_grammar_id: "gn3-00015",
        pattern: "〜に対して / 〜に比べて",
        meaning: "berbeda halnya dengan ... / dibanding dengan ...",
        raw: "Noun + に対して / に比べて",
        desc: "Menjajarkan dua hal secara kontras untuk menonjolkan perbedaan sifat atau parameter statistik.",
        examples: [
          { jp: "兄が活発なのに対して、弟は物静かだ。", id: "Berbeda dengan sang kakak yang enerjik, sang adik sangat pendiam." },
          { jp: "去年に比べて今年は雨が多い。", id: "Dibandingkan tahun lalu, tahun ini curah hujan lebih tinggi." }
        ]
      }
    ]
  },
  {
    unit: 7,
    title_ja: "限定・付加",
    title_en: "Limitation and Addition",
    title_id: "Pembatasan Cakupan & Penambahan Informasi",
    entries: [
      {
        id: "skm-n3-u07-01",
        global_grammar_id: "gn3-00016",
        pattern: "〜だけでなく / 〜ばかりか",
        meaning: "bukan hanya ..., melainkan juga ...",
        raw: "Plain form / Noun + だけでなく / ばかりか",
        desc: "Menambahkan informasi penguat yang derajatnya melampaui pernyataan awal.",
        examples: [
          { jp: "彼は英語だけでなく、フランス語も流暢に話す。", id: "Dia bukan hanya bisa bahasa Inggris, melainkan juga fasih berbahasa Prancis." }
        ]
      },
      {
        id: "skm-n3-u07-02",
        global_grammar_id: "gn3-00017",
        pattern: "〜をはじめ（として）",
        meaning: "mulai dari ... sebagai contoh utama (dan yang lainnya)",
        raw: "Noun + をはじめ / をはじめとする + Noun",
        desc: "Menyebutkan contoh representatif nomor satu dari sekumpulan entitas sejenis.",
        examples: [
          { jp: "日本には京都をはじめ、歴史的な名所がたくさんある。", id: "Di Jepang ada banyak tempat wisata bersejarah, mulai dari Kyoto sebagai ikon utamanya." }
        ]
      }
    ]
  },
  {
    unit: 8,
    title_ja: "評価・判断・立場",
    title_en: "Evaluation, Judgment, and Standpoint",
    title_id: "Sudut Pandang, Peran & Penilaian",
    entries: [
      {
        id: "skm-n3-u08-01",
        global_grammar_id: "gn3-00018",
        pattern: "〜にとって",
        meaning: "bagi ... (sudut pandang subjek tertentu)",
        raw: "Noun + にとって",
        desc: "Menyatakan evaluasi atau pertimbangan nilai dari kacamata subjek yang bersangkutan.",
        examples: [
          { jp: "若者にとってスマートフォンは必需品だ。", id: "Bagi kalangan anak muda, ponsel pintar adalah kebutuhan pokok." }
        ]
      },
      {
        id: "skm-n3-u08-02",
        global_grammar_id: "gn3-00019",
        pattern: "〜として",
        meaning: "sebagai ... (kapasitas, peran, kualifikasi)",
        raw: "Noun + として",
        desc: "Menunjukkan kedudukan resmi, fungsi, atau identitas formal seseorang dalam melakukan tindakan.",
        examples: [
          { jp: "留学生として日本にやってきました。", id: "Saya datang ke Jepang dengan kapasitas sebagai mahasiswa asing." }
        ]
      }
    ]
  },
  {
    unit: 9,
    title_ja: "感情・心理・強調",
    title_en: "Emotion and Psychological Urgency",
    title_id: "Resonansi Emosi & Dorongan Batin",
    entries: [
      {
        id: "skm-n3-u09-01",
        global_grammar_id: "gn3-00020",
        pattern: "〜たまらない / 〜てならない",
        meaning: "sangat ... tak tertahankan (dorongan emosi spontan)",
        raw: "Adj て-form / Verb て-form + たまらない / ならない",
        desc: "Perasaan fisik atau batin yang meluap sedemikian kuatnya sehingga tidak dapat dikendalikan akal sehat.",
        examples: [
          { jp: "故郷の家族に会いたくてたまらない。", id: "Saya sangat rindu dan ingin sekali bertemu keluarga di kampung halaman tak tertahankan." },
          { jp: "結果がどうなるか心配でならない。", id: "Saya merasa sangat cemas tak terkira memikirkan bagaimana hasilnya nanti." }
        ]
      }
    ]
  },
  {
    unit: 10,
    title_ja: "伝聞・推量・主張",
    title_en: "Hearsay, Conjecture, and Assertion",
    title_id: "Kepastian Logis, Dugaan & Opini Tegas",
    entries: [
      {
        id: "skm-n3-u10-01",
        global_grammar_id: "gn3-00021",
        pattern: "〜に違いない",
        meaning: "pasti ... / tidak salah lagi ... (keyakinan 100%)",
        raw: "Plain form (na-Adj/Noun tanpa だ) + に違いない",
        desc: "Keyakinan mutlak penutur atas suatu fakta berdasarkan penalaran bukti yang sangat kuat.",
        examples: [
          { jp: "毎日一生懸命勉強しているから、きっと合格するに違いない。", id: "Karena dia belajar giat setiap hari, pasti dia akan lulus tidak salah lagi." }
        ]
      },
      {
        id: "skm-n3-u10-02",
        global_grammar_id: "gn3-00022",
        pattern: "〜わけがない / 〜はずがない",
        meaning: "mustahil ... / tidak mungkin sekali ...",
        raw: "Plain form + わけがない / はずがない",
        desc: "Penolakan tegas penutur atas suatu kemungkinan berdasarkan akal sehat atau fakta rasional.",
        examples: [
          { jp: "あの誠実な人が嘘をつくわけがない。", id: "Mustahil orang sejujur dia berbohong." }
        ]
      }
    ]
  },
  {
    unit: 11,
    title_ja: "使役・受身・敬語",
    title_en: "Sociolinguistics and Politeness",
    title_id: "Sosiolinguistik, Kerendahan Diri & Permohonan",
    entries: [
      {
        id: "skm-n3-u11-01",
        global_grammar_id: "gn3-00023",
        pattern: "〜させていただく",
        meaning: "izinkan saya untuk ... (memohon izin dengan hormat)",
        raw: "Causative て-form + いただく / いただきます",
        desc: "Bentuk permohonan santun khas etika kerja Jepang untuk menyatakan inisiatif diri tanpa terkesan memaksa.",
        examples: [
          { jp: "本日の発表は私が担当させていただきます。", id: "Perkenankan saya yang memegang tanggung jawab atas presentasi hari ini." }
        ]
      }
    ]
  },
  {
    unit: 12,
    title_ja: "文末表現・複文",
    title_en: "Sentence Final Expressions and Discourse",
    title_id: "Ungkapan Akhir Kalimat, Keniscayaan & Wacana",
    entries: [
      {
        id: "skm-n3-u12-01",
        global_grammar_id: "gn3-00024",
        pattern: "〜わけだ",
        meaning: "pantas saja ... / wajar bila ... (pemahaman logis)",
        raw: "Plain form + わけだ (na-Adj + な)",
        desc: "Menyatakan kesadaran rasional yang masuk akal setelah mendengar atau melihat fakta di baliknya.",
        examples: [
          { jp: "気温が氷点下五度か。寒いわけだ。", id: "Suhunya minus 5 derajat ya. Pantas saja dingin sekali." }
        ]
      },
      {
        id: "skm-n3-u12-02",
        global_grammar_id: "gn3-00025",
        pattern: "〜べきだ / 〜べきではない",
        meaning: "seharusnya ... / tidak sepatutnya ... (kewajiban moral)",
        raw: "Verb dictionary-form + べきだ (する → すべきだ)",
        desc: "Menegaskan kewajiban etika sosial atau tanggung jawab moral umum yang patut dijalankan manusia.",
        examples: [
          { jp: "約束は守るべきだ。", id: "Janji itu sudah seharusnya ditepati." },
          { jp: "他人の悪口を言うべきではない。", id: "Tidak sepatutnya kita menjelek-jelekkan orang lain." }
        ]
      }
    ]
  }
];

// ── SKM N2 BUNPOU DEFINITION (14 Units) ────────────────────────────
const SKM_N2_UNITS = [
  {
    unit: 1,
    title_ja: "際・きっかけ",
    title_en: "Occasions and Triggers",
    title_id: "Titik Waktu Momentum & Pemicu",
    entries: [
      {
        id: "skm-n2-u01-01",
        global_grammar_id: "gn2-00001",
        pattern: "〜に際して / 〜にあたって",
        meaning: "berkenaan dengan momen penting ... / saat menjelang ...",
        raw: "Verb dictionary / Noun + に際して / にあたって",
        desc: "Menandai persiapan menjelang upacara, kontrak bisnis, atau momen istimewa dalam hidup.",
        examples: [
          { jp: "新事業の開始にあたって、挨拶を申し上げます。", id: "Menjelang dimulainya proyek bisnis baru, izinkan saya menyampaikan sepatah kata sambutan." }
        ]
      },
      {
        id: "skm-n2-u01-02",
        global_grammar_id: "gn2-00002",
        pattern: "〜をきっかけに（して）",
        meaning: "bermula dari pemicu ... / dipicu oleh momentum ...",
        raw: "Noun + をきっかけに（して）",
        desc: "Menyatakan peristiwa tak terduga yang menjadi titik balik lahirnya kebiasaan atau fase baru.",
        examples: [
          { jp: "病気をきっかけに、健康的な生活を始めた。", id: "Bermula dari sakit yang dialaminya, ia mulai menerapkan gaya hidup sehat." }
        ]
      }
    ]
  },
  {
    unit: 2,
    title_ja: "同時・進行",
    title_en: "Simultaneity and Progressive Trends",
    title_id: "Aksi Simultan & Perkembangan Tren",
    entries: [
      {
        id: "skm-n2-u02-01",
        global_grammar_id: "gn2-00003",
        pattern: "〜一方だ / 〜ばかりだ",
        meaning: "terus-menerus makin ... (kecenderungan perubahan searah)",
        raw: "Verb dictionary-form + 一方だ / ばかりだ",
        desc: "Menunjukkan tren perkembangan yang terus melaju ke satu arah tanpa henti.",
        examples: [
          { jp: "景気は悪化する一方だ。", id: "Kondisi perekonomian terus-menerus memburuk." }
        ]
      }
    ]
  },
  {
    unit: 3,
    title_ja: "関連・関係",
    title_en: "Relation and Reference",
    title_id: "Keterkaitan Topik & Objek Masalah",
    entries: [
      {
        id: "skm-n2-u03-01",
        global_grammar_id: "gn2-00004",
        pattern: "〜をめぐって / 〜をめぐる",
        meaning: "seputar perdebatan / memperebutkan isu ...",
        raw: "Noun + をめぐって / をめぐる + Noun",
        desc: "Menunjukkan isu sentral yang menjadi bahan sengketa, silang pendapat, atau kompetisi publik.",
        examples: [
          { jp: "遺産相続をめぐって激しい争いが起きた。", id: "Terjadi perselisihan sengit seputar perebutan warisan." }
        ]
      },
      {
        id: "skm-n2-u03-02",
        global_grammar_id: "gn2-00005",
        pattern: "〜にかけては",
        meaning: "bila menyangkut keahlian ... (paling unggul)",
        raw: "Noun + にかけては",
        desc: "Menegaskan bidang spesifik di mana seseorang memiliki keunggulan kompetitif tak tertandingi.",
        examples: [
          { jp: "プログラミングの速さにかけては誰にも負けない。", id: "Bila menyangkut kecepatan menulis kode pemrograman, ia tidak kalah dari siapa pun." }
        ]
      }
    ]
  },
  {
    unit: 4,
    title_ja: "基準・根拠",
    title_en: "Standards and Bases",
    title_id: "Dasar Acuan, Pedoman & Patokan Resmi",
    entries: [
      {
        id: "skm-n2-u04-01",
        global_grammar_id: "gn2-00006",
        pattern: "〜に基づいて (にもとづいて)",
        meaning: "berdasarkan fondasi hukum / data fakta ...",
        raw: "Noun + に基づいて / に基づく + Noun",
        desc: "Mengambil landasan otoritatif dari data statistik, peraturan undang-undang, atau filosofi prinsip dasar.",
        examples: [
          { jp: "最新の調査データに基づいて報告書を作成した。", id: "Menyusun laporan berdasarkan data survei investigasi termutakhir." }
        ]
      },
      {
        id: "skm-n2-u04-02",
        global_grammar_id: "gn2-00007",
        pattern: "〜に沿って (にそって)",
        meaning: "selaras dengan pedoman ... / mengikuti garis haluan",
        raw: "Noun + に沿って / に沿う + Noun",
        desc: "Melaksanakan aktivitas agar tidak menyimpang dari buku panduan teknis atau kurikulum resmi.",
        examples: [
          { jp: "マニュアルに沿って作業を進めてください。", id: "Silakan lanjutkan pekerjaan selaras dengan buku panduan manual." }
        ]
      }
    ]
  },
  {
    unit: 5,
    title_ja: "限定・非限定",
    title_en: "Scope, Limitation, and Exception",
    title_id: "Lingkup, Pembatasan & Pengecualian",
    entries: [
      {
        id: "skm-n2-u05-01",
        global_grammar_id: "gn2-00008",
        pattern: "〜に限らず (にかぎらず) / 〜のみならず",
        meaning: "tidak terbatas hanya pada ... saja, melainkan juga ...",
        raw: "Noun + に限らず / のみならず",
        desc: "Memperluas cakupan dari satu kelompok partikular ke kelompok universal yang lebih luas.",
        examples: [
          { jp: "日本国内に限らず、海外でも広く知られている。", id: "Tidak terbatas di dalam negeri Jepang saja, melainkan juga tersohor luas di mancanegara." }
        ]
      }
    ]
  },
  {
    unit: 6,
    title_ja: "理由・原因",
    title_en: "Causes and Determinants",
    title_id: "Sebab Musabab & Landasan Logis Kuat",
    entries: [
      {
        id: "skm-n2-u06-01",
        global_grammar_id: "gn2-00009",
        pattern: "〜からこそ",
        meaning: "justru persis karena itulah ...",
        raw: "Plain clause + からこそ",
        desc: "Menegaskan faktor esensial yang menjadi pemicu hakiki suatu keputusan besar.",
        examples: [
          { jp: "健康の大切さを知っているからこそ、運動を続ける。", id: "Justru persis karena paham betapa berharganya kesehatan, saya terus berolahraga." }
        ]
      },
      {
        id: "skm-n2-u06-02",
        global_grammar_id: "gn2-00010",
        pattern: "〜あまり (に)",
        meaning: "saking teramat ... sampai berujung negatif",
        raw: "Noun の / Verb plain + あまり",
        desc: "Intensitas emosi batin yang melampaui batas kewajaran hingga menimbulkan konsekuensi buruk.",
        examples: [
          { jp: "緊張のあまり、スピーチの言葉が出てこなかった。", id: "Saking teramat gugupnya, kata-kata pidato sampai tidak bisa keluar dari mulut." }
        ]
      }
    ]
  },
  {
    unit: 7,
    title_ja: "逆接・対比",
    title_en: "Contrast and Irony",
    title_id: "Kontras, Ironi & Keadaan Paradoks",
    entries: [
      {
        id: "skm-n2-u07-01",
        global_grammar_id: "gn2-00011",
        pattern: "〜反面 (はんめん)",
        meaning: "di sisi lain ... / namun di balik itu ... (dua sisi mata uang)",
        raw: "Plain form + 反面 (na-Adj + な/である)",
        desc: "Menyajikan dua karakteristik yang saling bertolak belakang dari satu objek yang sama.",
        examples: [
          { jp: "都会の暮らしは便利な反面、ストレスも多い。", id: "Kehidupan di metropolitan memang praktis, namun di sisi lain sarat akan stres." }
        ]
      },
      {
        id: "skm-n2-u07-02",
        global_grammar_id: "gn2-00012",
        pattern: "〜ものの",
        meaning: "meskipun memang benar ..., akan tetapi nyatanya ...",
        raw: "Verb/Adj plain + ものの (Noun + であるものの)",
        desc: "Mengakui kebenaran fakta pertama, namun kenyataan sesudahnya tidak seindah harapan.",
        examples: [
          { jp: "車を買ったものの、運転する機会がほとんどない。", id: "Meskipun sudah beli mobil, akan tetapi nyatanya kesempatan untuk menyetir hampir tidak ada." }
        ]
      }
    ]
  },
  {
    unit: 8,
    title_ja: "仮定・条件",
    title_en: "Hypotheses and Prerequisites",
    title_id: "Hipotesis & Kondisi Prasyarat Mutlak",
    entries: [
      {
        id: "skm-n2-u08-01",
        global_grammar_id: "gn2-00013",
        pattern: "〜さえ〜ば",
        meaning: "asal saja ... terpenuhi, maka semuanya beres",
        raw: "Noun さえ + Verb ば-form",
        desc: "Menyatakan bahwa hanya satu syarat tunggal inilah yang esensial untuk menjamin tercapainya hasil.",
        examples: [
          { jp: "健康でさえあれば、どんな困難も乗り越えられる。", id: "Asal saja tubuh tetap sehat, rintangan apa pun sanggup dilalui." }
        ]
      },
      {
        id: "skm-n2-u08-02",
        global_grammar_id: "gn2-00014",
        pattern: "〜ないことには",
        meaning: "kalau tidak ... terlebih dahulu, mustahil bisa ...",
        raw: "Verb ない-form + ことには、... できない",
        desc: "Prasyarat mutlak yang wajib dipenuhi sebelum hal lain dapat dimulai.",
        examples: [
          { jp: "実際に会って話を聞かないことには、判断できない。", id: "Kalau belum bertemu langsung dan mendengar keterangannya, kita mustahil mengambil keputusan." }
        ]
      }
    ]
  },
  {
    unit: 9,
    title_ja: "目的・手段",
    title_en: "Objectives and Formality",
    title_id: "Orientasi Tujuan & Instrumen Tertulis",
    entries: [
      {
        id: "skm-n2-u09-01",
        global_grammar_id: "gn2-00015",
        pattern: "〜べく",
        meaning: "demi untuk berikhtiar ... (gaya tertulis formal)",
        raw: "Verb dictionary-form + べく (する → すべく/するべく)",
        desc: "Menyatakan tekad kuat dalam ragam bahasa formal untuk mencapai misi agung.",
        examples: [
          { jp: "真実を究明すべく、徹底した調査を開始した。", id: "Demi untuk menguak kebenaran hakiki, penyelidikan menyeluruh segera dilancarkan." }
        ]
      }
    ]
  },
  {
    unit: 10,
    title_ja: "態度・評価",
    title_en: "Attitudes and Judgments",
    title_id: "Sikap Mental & Penilaian Eksklusif",
    entries: [
      {
        id: "skm-n2-u10-01",
        global_grammar_id: "gn2-00016",
        pattern: "〜にほかならない",
        meaning: "tiada lain dan tiada bukan adalah ...",
        raw: "Noun / Plain form + にほかならない",
        desc: "Penegasan konklusif bahwa satu-satunya penyebab utama adalah faktor yang disebutkan.",
        examples: [
          { jp: "成功したのは、日々の地道な努力の結果にほかならない。", id: "Keberhasilan yang diraih tiada lain adalah buah dari jerih payah usaha setiap hari." }
        ]
      },
      {
        id: "skm-n2-u10-02",
        global_grammar_id: "gn2-00017",
        pattern: "〜にすぎない",
        meaning: "hanyalah sebatas ... saja (tidak lebih dari)",
        raw: "Plain form / Noun + にすぎない",
        desc: "Merendahkan signifikansi suatu perkara agar tidak dianggap berlebihan dari kenyataan aslinya.",
        examples: [
          { jp: "これはまだ計画の第一歩にすぎません。", id: "Ini baru sebatas langkah awal dari keseluruhan rancangan besar." }
        ]
      }
    ]
  },
  {
    unit: 11,
    title_ja: "強調・感嘆",
    title_en: "Intensification and Emotional Heights",
    title_id: "Intensitas Afektif & Ketulusan Emosi",
    entries: [
      {
        id: "skm-n2-u11-01",
        global_grammar_id: "gn2-00018",
        pattern: "〜てやまない",
        meaning: "senantiasa mendoakan / berharap dari lubuk hati terdalam",
        raw: "Verb て-form + やまない",
        desc: "Ungkapan restu dan harapan mendalam yang tak henti-hentinya dipanjatkan dalam momen khidmat.",
        examples: [
          { jp: "二人の末永い幸せを祈ってやみません。", id: "Dari lubuk hati terdalam, saya senantiasa mendoakan kebahagiaan abadi bagi kedua mempelai." }
        ]
      }
    ]
  },
  {
    unit: 12,
    title_ja: "不可能・義務",
    title_en: "Impossibility, Necessity, and Restraint",
    title_id: "Kewajiban Etis, Larangan & Ketakberdayaan",
    entries: [
      {
        id: "skm-n2-u12-01",
        global_grammar_id: "gn2-00019",
        pattern: "〜ざるを得ない (ざるをえない)",
        meaning: "terpaksa mau tidak mau harus ... (tak ada pilihan lain)",
        raw: "Verb ない-stem + ざるを得ない (する → せざるを得ない)",
        desc: "Menyatakan ketidakberdayaan subjek di mana situasi objektif memaksanya untuk mengambil keputusan berat.",
        examples: [
          { jp: "これだけの証拠があれば、事実を認めざるを得ない。", id: "Bila bukti sudah sebanyak ini, mau tidak mau kita terpaksa mengakui kenyataan." }
        ]
      },
      {
        id: "skm-n2-u12-02",
        global_grammar_id: "gn2-00020",
        pattern: "〜わけにはいかない",
        meaning: "tidak mungkin bisa / terhalang norma moral untuk ...",
        raw: "Verb dictionary-form + わけにはいかない",
        desc: "Keengganan melanggar norma sosial, etika profesi, atau kewajiban hati nurani.",
        examples: [
          { jp: "大事な約束があるから、仕事を休むわけにはいかない。", id: "Karena ada janji penting, saya tidak mungkin bolos kerja begitu saja." }
        ]
      }
    ]
  },
  {
    unit: 13,
    title_ja: "敬語・待遇",
    title_en: "Business Honorifics and Diplomacy",
    title_id: "Kehormatan Bisnis & Diplomasi Formal",
    entries: [
      {
        id: "skm-n2-u13-01",
        global_grammar_id: "gn2-00021",
        pattern: "〜おいでになる / 〜存じ上げる",
        meaning: "berada / hadir (hormat) & mengetahui / mengenal (merendah)",
        raw: "Verba Kehormatan & Kerendahan Diri Tingkat Korporasi",
        desc: "Register bahasa bisnis resmi untuk korespondensi level dewan direksi dan instansi pemerintah.",
        examples: [
          { jp: "社長はただいま会議室においでになります。", id: "Bapak Presiden Direktur saat ini berkenan hadir di ruang rapat." }
        ]
      }
    ]
  },
  {
    unit: 14,
    title_ja: "結び・文末",
    title_en: "Discourse Closings and Inferences",
    title_id: "Simpulan & Penutup Wacana",
    entries: [
      {
        id: "skm-n2-u14-01",
        global_grammar_id: "gn2-00022",
        pattern: "〜ものだ / 〜ものではない",
        meaning: "sudah sewajarnya begitulah sifat alami ... / jangan pernah ...",
        raw: "Verb dictionary-form + ものだ / ものではない",
        desc: "Menyatakan hakikat alamiah kehidupan, prinsip umum, atau nasihat etika abadi.",
        examples: [
          { jp: "人の心は変わりやすいものだ。", id: "Sudah sewajarnya hati manusia itu memang mudah berubah." }
        ]
      }
    ]
  }
];

// ── SKM N1 BUNPOU DEFINITION (15 Units) ────────────────────────────
const SKM_N1_UNITS = [
  {
    unit: 1,
    title_ja: "時間的同時性・極限",
    title_en: "Extreme Simultaneity and Immediacy",
    title_id: "Simultanitas Ekstrem & Aksi Seketika",
    entries: [
      {
        id: "skm-n1-u01-01",
        global_grammar_id: "gn1-00001",
        pattern: "〜が早いか (がはやいか)",
        meaning: "seketika baru saja ... langsung seketika itu juga",
        raw: "Verb dictionary / Verb た-form + が早いか",
        desc: "Kecepatan luar biasa di mana aksi kedua meletup spontan tanpa jeda sedetik pun.",
        examples: [
          { jp: "チャイムが鳴るが早いか、生徒たちは教室を飛び出した。", id: "Seketika lonceng baru saja berdentang, para murid langsung berhamburan keluar kelas." }
        ]
      },
      {
        id: "skm-n1-u01-02",
        global_grammar_id: "gn1-00002",
        pattern: "〜や否や (やいなや)",
        meaning: "begitu ... seketika itu juga (sangat dramatis)",
        raw: "Verb dictionary-form + や否や",
        desc: "Gaya sastrawi untuk melukiskan pergantian aksi sekejap mata dalam narasi tertulis.",
        examples: [
          { jp: "飛行機が着陸するや否や、乗客たちは立ち上がった。", id: "Begitu pesawat menyentuh landasan, para penumpang seketika langsung berdiri." }
        ]
      }
    ]
  },
  {
    unit: 2,
    title_ja: "進行・相関・変化",
    title_en: "Progressive Correlation and Dynamic Extremes",
    title_id: "Korelasi Dinamis & Batas Titik Awal",
    entries: [
      {
        id: "skm-n1-u02-01",
        global_grammar_id: "gn1-00003",
        pattern: "〜を皮切りに（して） (をかわきりに)",
        meaning: "diawali dengan ... sebagai pembuka rangkaian peristiwa besar",
        raw: "Noun + を皮切りに（して）",
        desc: "Menandai sebuah terobosan perdana yang memicu gelombang aktivitas sejenis secara beruntun.",
        examples: [
          { jp: "東京公演を皮切りに、全国ツアーがスタートした。", id: "Diawali dengan konser akbar di Tokyo, tur keliling nasional resmi dimulai." }
        ]
      }
    ]
  },
  {
    unit: 3,
    title_ja: "限定・特別視",
    title_en: "Singularity and Absolute Exclusivity",
    title_id: "Pengkhususan & Pengecualian Absolut",
    entries: [
      {
        id: "skm-n1-u03-01",
        global_grammar_id: "gn1-00004",
        pattern: "〜をおいて〜ない",
        meaning: "tiada figur lain selain ... yang sanggup",
        raw: "Noun + をおいて（ほかに）... ない",
        desc: "Pujian tertinggi bahwa tidak ada kandidat lain yang memiliki kualifikasi setara.",
        examples: [
          { jp: "この大役を任せられる人は、彼をおいてほかにいない。", id: "Sosok yang sanggup mengemban mandat besar ini tiada lain selain dirinya seorang." }
        ]
      },
      {
        id: "skm-n1-u03-02",
        global_grammar_id: "gn1-00005",
        pattern: "〜ならでは（の）",
        meaning: "keunikan istimewa yang hanya ada pada ...",
        raw: "Noun + ならでは（の Noun）",
        desc: "Menonjolkan cita rasa atau identitas autentik orisinal yang tidak dapat ditiru oleh pihak lain.",
        examples: [
          { jp: "京都ならではの伝統的な風情を満喫した。", id: "Menikmati atmosfer tradisi khas yang hanya dapat ditemukan di Kyoto." }
        ]
      }
    ]
  },
  {
    unit: 4,
    title_ja: "非限定・包括",
    title_en: "Inclusivity and Broad Scope",
    title_id: "Inklusivitas & Cakupan Luas Menyeluruh",
    entries: [
      {
        id: "skm-n1-u04-01",
        global_grammar_id: "gn1-00006",
        pattern: "〜はおろか",
        meaning: "jangankan hal sepele ..., hal mendasar pun mustahil",
        raw: "Noun + はおろか",
        desc: "Menolak tingkatan paling dasar dengan membuktikan bahwa tingkatan sederhana di bawahnya pun gagal dipenuhi.",
        examples: [
          { jp: "彼は漢字はおろか、ひらがなさえ書けない。", id: "Jangankan kanji, menulis hiragana saja dia tidak bisa." }
        ]
      }
    ]
  },
  {
    unit: 5,
    title_ja: "関連・対応",
    title_en: "Relevance and Principles",
    title_id: "Relevansi Filosofis & Landasan Prinsip",
    entries: [
      {
        id: "skm-n1-u05-01",
        global_grammar_id: "gn1-00007",
        pattern: "〜に即して (にそくして)",
        meaning: "berlandaskan langsung pada realitas fakta / kaidah",
        raw: "Noun + に即して / に即した + Noun",
        desc: "Menyesuaikan tindakan secara cermat tanpa menyimpang dari realitas empiris di lapangan.",
        examples: [
          { jp: "現場の実態に即して柔軟に対応する。", id: "Merespons secara lentur selaras dengan kenyataan riil di lapangan." }
        ]
      }
    ]
  },
  {
    unit: 6,
    title_ja: "敬意・謙譲",
    title_en: "Court Protocol and High Diplomacy",
    title_id: "Protokol Kehormatan Istana & Diplomasi Tertinggi",
    entries: [
      {
        id: "skm-n1-u06-01",
        global_grammar_id: "gn1-00008",
        pattern: "〜申し上げます",
        meaning: "perkenankan kami menghaturkan ...",
        raw: "Noun + 申し上げます",
        desc: "Puncak kehalusan tutur kata dalam pernyataan publik dan dokumen kenegaraan.",
        examples: [
          { jp: "心よりお祝い申し上げます。", id: "Dari lubuk sanubari, kami menghaturkan ucapan selamat yang setinggi-tingginya." }
        ]
      }
    ]
  },
  {
    unit: 7,
    title_ja: "原因・契機",
    title_en: "Determinants and Catalysts",
    title_id: "Katalisator & Determinan Peristiwa",
    entries: [
      {
        id: "skm-n1-u07-01",
        global_grammar_id: "gn1-00009",
        pattern: "〜とあって",
        meaning: "karena momen istimewa ..., pantas saja ramai",
        raw: "Plain form / Noun + とあって",
        desc: "Kondisi perkecualian khusus yang memicu antusiasme atau fenomena luar biasa di luar kewajaran.",
        examples: [
          { jp: "夏休み最初の週末とあって、プールは大勢の人で賑わっている。", id: "Karena bertepatan dengan akhir pekan pertama liburan musim panas, kolam renang disesaki lautan pengunjung." }
        ]
      },
      {
        id: "skm-n1-u07-02",
        global_grammar_id: "gn1-00010",
        pattern: "〜ばこそ",
        meaning: "justru persis demi karena ... itulah",
        raw: "Verb ば-form / Adj ければ + こそ",
        desc: "Menegaskan motif batin hakiki mengapa suatu pengorbanan besar rela ditempuh.",
        examples: [
          { jp: "子どもの将来を思えばこそ、厳しく叱るのだ。", id: "Justru persis karena memikirkan masa depan sang anak, orang tua menegurnya dengan tegas." }
        ]
      }
    ]
  },
  {
    unit: 8,
    title_ja: "逆接・予想外",
    title_en: "Paradox and Defiance of Expectation",
    title_id: "Paradoks, Kontradiksi & Kejutan Tak Terduga",
    entries: [
      {
        id: "skm-n1-u08-01",
        global_grammar_id: "gn1-00011",
        pattern: "〜と思いきや (とおもいきや)",
        meaning: "dikira tadinya bakal ..., ternyata malah justru sebaliknya",
        raw: "Plain sentence + と思いきや",
        desc: "Perubahan alur dramatis yang mematahkan asumsi kuat penutur.",
        examples: [
          { jp: "試験は易しいと思いきや、難問ばかりだった。", id: "Dikira ujiannya bakal gampang, ternyata malah penuh soal-soal rumit menjebak." }
        ]
      }
    ]
  },
  {
    unit: 9,
    title_ja: "状態・様子",
    title_en: "States and Physical Nuances",
    title_id: "Nuansa Kondisi Fisik & Tampilan Semata",
    entries: [
      {
        id: "skm-n1-u09-01",
        global_grammar_id: "gn1-00012",
        pattern: "〜まみれ / 〜ずくめ",
        meaning: "berlumuran cairan kotor ... / serba dipenuhi hal ...",
        raw: "Noun + まみれ / ずくめ",
        desc: "まみれ untuk permukaan fisik yang kotor berlumuran (darah, lumpur, debu); ずくめ untuk deretan peristiwa menggembirakan/menyedihkan yang menyelimuti hidup.",
        examples: [
          { jp: "泥まみれになってサッカーを楽しんだ。", id: "Bermain sepak bola dengan badan berlumuran lumpur gembira." },
          { jp: "今年は良いことずくめの一年だった。", id: "Tahun ini merupakan tahun yang serba dipenuhi hal-hal membahagiakan." }
        ]
      }
    ]
  },
  {
    unit: 10,
    title_ja: "感情・情意",
    title_en: "Deep Emotional Overflow",
    title_id: "Ekspresi Emosional Mendalam & Resonansi Jiwa",
    entries: [
      {
        id: "skm-n1-u10-01",
        global_grammar_id: "gn1-00013",
        pattern: "〜に堪えない (にたえない)",
        meaning: "tak kuasa menahan luapan ... (rasa syukur / sesal mendalam)",
        raw: "Noun (感謝・喜び・後悔) + に堪えない",
        desc: "Resonansi emosi yang begitu meluap di dalam dada sehingga tak sanggup dibendung kata-kata biasa.",
        examples: [
          { jp: "皆様の温かいご支援に、感謝に堪えません。", id: "Atas dukungan hangat dari hadirin sekalian, kami tak kuasa membendung rasa syukur yang teramat mendalam." }
        ]
      }
    ]
  },
  {
    unit: 11,
    title_ja: "強調・極限",
    title_en: "Absolute Superlativity",
    title_id: "Puncak Superlativitas Mutlak",
    entries: [
      {
        id: "skm-n1-u11-01",
        global_grammar_id: "gn1-00014",
        pattern: "〜の至り (のいたり) / 〜の極み (のきわみ)",
        meaning: "puncak tertinggi dari ... (kehormatan / kesedihan)",
        raw: "Noun + の至り / の極み",
        desc: "Derajat superlatif tertinggi dari sebuah status emosional atau pengalaman martabat hidup.",
        examples: [
          { jp: "このような栄誉ある賞をいただき、光栄の至りでございます。", id: "Menerima anugerah terhormat ini merupakan puncak kemuliaan hidup bagi saya." }
        ]
      }
    ]
  },
  {
    unit: 12,
    title_ja: "主張・評価",
    title_en: "Definitive Arguments",
    title_id: "Penegasan Argumen & Kelayakan Evaluasi",
    entries: [
      {
        id: "skm-n1-u12-01",
        global_grammar_id: "gn1-00015",
        pattern: "〜に値する (にあたいする)",
        meaning: "layak / berhak menyandang nilai penghargaan ...",
        raw: "Verb dictionary-form / Noun + に値する",
        desc: "Menyatakan kelayakan objektif suatu karya atau dedikasi manusia untuk diapresiasi tinggi.",
        examples: [
          { jp: "彼の勇気ある行動は、賞賛に値する。", id: "Tindakan beraninya sangat layak menuai pujian terhormat." }
        ]
      }
    ]
  },
  {
    unit: 13,
    title_ja: "不可能・否定",
    title_en: "Absolute Impossibility",
    title_id: "Kemustahilan Absolut & Larangan Tabu",
    entries: [
      {
        id: "skm-n1-u13-01",
        global_grammar_id: "gn1-00016",
        pattern: "〜ようがない",
        meaning: "sama sekali tidak ada celah cara untuk dapat ...",
        raw: "Verb ます-stem + ようがない",
        desc: "Ketiadaan metode teknis atau solusi praktis untuk membalikkan kondisi yang sudah terjadi.",
        examples: [
          { jp: "データが完全に消えてしまい、復旧のしようがない。", id: "Data telah terhapus total, sama sekali tidak ada celah cara untuk memulihkannya lagi." }
        ]
      }
    ]
  },
  {
    unit: 14,
    title_ja: "義務・当然",
    title_en: "Moral Inevitability",
    title_id: "Keniscayaan Moral & Mandat Kewajiban",
    entries: [
      {
        id: "skm-n1-u14-01",
        global_grammar_id: "gn1-00017",
        pattern: "〜を余儀なくされる (をよぎなくされる)",
        meaning: "terpaksa harus menerima keadaan ... karena faktor luar",
        raw: "Noun + を余儀なくされる",
        desc: "Situasi krisis tak terelakkan yang memupus rencana semula dan menuntut pengorbanan berat.",
        examples: [
          { jp: "景気低迷により、工場の閉鎖を余儀なくされた。", id: "Akibat kelesuan ekonomi berkepanjangan, pabrik terpaksa harus ditutup." }
        ]
      }
    ]
  },
  {
    unit: 15,
    title_ja: "終結・余韻",
    title_en: "Discourse Epilogue and Rhetoric",
    title_id: "Konklusi Akademis & Retorika Penutup",
    entries: [
      {
        id: "skm-n1-u15-01",
        global_grammar_id: "gn1-00018",
        pattern: "〜きらいがある",
        meaning: "ada kecenderungan buruk yang patut disayangkan",
        raw: "Verb dictionary / Noun の + きらいがある",
        desc: "Kritik santun terhadap watak atau kebiasaan negatif seseorang yang cenderung berulang.",
        examples: [
          { jp: "彼は物事を悲観的に考えすぎるきらいがある。", id: "Ia memiliki kecenderungan kurang baik yaitu memandang berbagai hal terlalu pesimistis." }
        ]
      }
    ]
  }
];

// ── VOCAB THEMES FOR SKM GOI ───────────────────────────────────────
const SKM_N3_VOCAB_THEMES = [
  "人・性格・感情 (Orang, Kepribadian & Emosi)",
  "暮らし・住居・生活 (Gaya Hidup & Rumah Tangga)",
  "健康・身体・医療 (Kesehatan, Tubuh & Medis)",
  "学校・教育・学問 (Pendidikan, Sekolah & Riset)",
  "仕事・職場・ビジネス (Dunia Kerja, Karir & Bisnis)",
  "社会・事件・ニュース (Masyarakat, Hukum & Berita)",
  "自然・気象・環境 (Alam, Cuaca & Ekologi)",
  "街・交通・施設 (Tata Kota, Transportasi & Fasilitas)",
  "関係・コミュニケーション (Relasi Sosial & Komunikasi)",
  "抽象・状態・評価 (Konsep Abstrak, Kualitas & Penilaian)"
];

const SKM_N2_VOCAB_THEMES = [
  "人間関係・心理・態度 (Hubungan Antarmanusia & Psikologi)",
  "日常生活・行動・マナー (Aktivitas Harian & Etika Publik)",
  "都市・交通・インフラ (Infrastruktur Perkotaan & Logistik)",
  "ビジネス・経営・雇用 (Manajemen Bisnis, SDM & Finansial)",
  "産業・テクノロジー・科学 (Industri Manufaktur & Riset Ilmiah)",
  "政治・経済・社会問題 (Politik, Makroekonomi & Isu Publik)",
  "医療・福祉・少子高齢化 (Sistem Medis & Isu Demografi)",
  "地球環境・災害・資源 (Krisis Lingkungan, Bencana & Energi)",
  "文化・芸術・伝統 (Budaya, Seni Kriya & Tradisi)",
  "学術・論理・思考 (Wacana Akademis & Penalaran Kritis)",
  "状態・性質・変化 (Sifat Dinamis & Spektrum Kualitas)",
  "慣用句・オノマトペ・表現 (Idiom, Onomatope & Frasa Wacana)"
];

const SKM_N1_VOCAB_THEMES = [
  "高度心理・内面葛藤・人間性 (Psikologi Mendalam & Karakter Manusia)",
  "高度言語・修辞・レトリック (Kaidah Linguistik & Retorika Sastra)",
  "法と正義・国家統治・行政 (Filsafat Hukum & Tata Kelola Negara)",
  "マクロ経済・金融市場・通商 (Pasar Modal Global & Kebijakan Fiskal)",
  "科学哲学・宇宙探査・先端工学 (Filsafat Sains & Teknologi Mutakhir)",
  "生命倫理・先端医療・遺伝学 (Bioetika, Bioteknologi & Genomika)",
  "地球生態系・持続可能性・気候 (Biosfer Global & Keberlanjutan Iklim)",
  "歴史的変遷・地政学・国際紛争 (Sejarah Peradaban & Geopolitik Global)",
  "文学・美学・芸術評論 (Kritik Sastra, Estetika & Karya Seni)",
  "社会規範・倫理観・現代思想 (Sosiologi Kritis & Paradigma Kontemporer)",
  "抽象概念・論理構築・形而上学 (Konsep Abstrak & Metafisika Logika)",
  "高度四字熟語・故事成語 (Yojijukugo & Idiom Klasik)",
  "和語・雅語・格式文語 (Frasa Wago Otentik & Bahasa Klasik Anggun)",
  "文脈的類義語・ニュアンス弁別 (Distingsi Nuansa & Diksi Akademis)"
];

// ── GENERATE LENSES ────────────────────────────────────────────────
function generateSkmLenses() {
  // 1. SKM N3
  const n3GLens = {
    meta: {
      book: "skm-n3",
      title: "Shin Kanzen Master JLPT N3: Bunpou",
      publisher: "3A Corporation",
      jlpt: "n3",
      structure: "unit",
      total_units: SKM_N3_UNITS.length
    },
    entries: SKM_N3_UNITS.flatMap(u => u.entries)
  };
  fs.writeFileSync(path.join(OUT_DIR, 'grammar-lens-skm-n3.js'), `// grammar-lens-skm-n3.js — Shin Kanzen Master N3 Grammar Lens\nwindow.grammarLensSkmN3 = ${JSON.stringify(n3GLens, null, 2)};\n`, 'utf8');

  const n3VUnits = {};
  let offsetN3 = 0;
  for (let i = 0; i < SKM_N3_VOCAB_THEMES.length; i++) {
    const slice = n3VocabIds.slice(offsetN3, offsetN3 + 30);
    offsetN3 = (offsetN3 + 30) % (n3VocabIds.length - 30);
    n3VUnits[String(i + 1)] = {
      theme: SKM_N3_VOCAB_THEMES[i],
      vocab_ids: slice
    };
  }
  const n3VLens = {
    meta: { book: "skm-n3", title: "Shin Kanzen Master JLPT N3: Goi", publisher: "3A Corporation", jlpt: "n3", total_units: 10 },
    units: n3VUnits
  };
  fs.writeFileSync(path.join(OUT_DIR, 'vocab-lens-skm-n3.js'), `// vocab-lens-skm-n3.js — Shin Kanzen Master N3 Vocab Lens\nwindow.vocabLensSkmN3 = ${JSON.stringify(n3VLens, null, 2)};\n`, 'utf8');

  // 2. SKM N2
  const n2GLens = {
    meta: {
      book: "skm-n2",
      title: "Shin Kanzen Master JLPT N2: Bunpou",
      publisher: "3A Corporation",
      jlpt: "n2",
      structure: "unit",
      total_units: SKM_N2_UNITS.length
    },
    entries: SKM_N2_UNITS.flatMap(u => u.entries)
  };
  fs.writeFileSync(path.join(OUT_DIR, 'grammar-lens-skm-n2.js'), `// grammar-lens-skm-n2.js — Shin Kanzen Master N2 Grammar Lens\nwindow.grammarLensSkmN2 = ${JSON.stringify(n2GLens, null, 2)};\n`, 'utf8');

  const n2VUnits = {};
  let offsetN2 = 0;
  for (let i = 0; i < SKM_N2_VOCAB_THEMES.length; i++) {
    const slice = n2VocabIds.slice(offsetN2, offsetN2 + 35);
    offsetN2 = (offsetN2 + 35) % (n2VocabIds.length - 35);
    n2VUnits[String(i + 1)] = {
      theme: SKM_N2_VOCAB_THEMES[i],
      vocab_ids: slice
    };
  }
  const n2VLens = {
    meta: { book: "skm-n2", title: "Shin Kanzen Master JLPT N2: Goi", publisher: "3A Corporation", jlpt: "n2", total_units: 12 },
    units: n2VUnits
  };
  fs.writeFileSync(path.join(OUT_DIR, 'vocab-lens-skm-n2.js'), `// vocab-lens-skm-n2.js — Shin Kanzen Master N2 Vocab Lens\nwindow.vocabLensSkmN2 = ${JSON.stringify(n2VLens, null, 2)};\n`, 'utf8');

  // 3. SKM N1
  const n1GLens = {
    meta: {
      book: "skm-n1",
      title: "Shin Kanzen Master JLPT N1: Bunpou",
      publisher: "3A Corporation",
      jlpt: "n1",
      structure: "unit",
      total_units: SKM_N1_UNITS.length
    },
    entries: SKM_N1_UNITS.flatMap(u => u.entries)
  };
  fs.writeFileSync(path.join(OUT_DIR, 'grammar-lens-skm-n1.js'), `// grammar-lens-skm-n1.js — Shin Kanzen Master N1 Grammar Lens\nwindow.grammarLensSkmN1 = ${JSON.stringify(n1GLens, null, 2)};\n`, 'utf8');

  const n1VUnits = {};
  let offsetN1 = 0;
  for (let i = 0; i < SKM_N1_VOCAB_THEMES.length; i++) {
    const slice = n1VocabIds.slice(offsetN1, offsetN1 + 40);
    offsetN1 = (offsetN1 + 40) % (n1VocabIds.length - 40);
    n1VUnits[String(i + 1)] = {
      theme: SKM_N1_VOCAB_THEMES[i],
      vocab_ids: slice
    };
  }
  const n1VLens = {
    meta: { book: "skm-n1", title: "Shin Kanzen Master JLPT N1: Goi", publisher: "3A Corporation", jlpt: "n1", total_units: 14 },
    units: n1VUnits
  };
  fs.writeFileSync(path.join(OUT_DIR, 'vocab-lens-skm-n1.js'), `// vocab-lens-skm-n1.js — Shin Kanzen Master N1 Vocab Lens\nwindow.vocabLensSkmN1 = ${JSON.stringify(n1VLens, null, 2)};\n`, 'utf8');

  console.log(`Generated Shin Kanzen Master: N3 (${n3GLens.entries.length} grammar entries), N2 (${n2GLens.entries.length} grammar entries), N1 (${n1GLens.entries.length} grammar entries)`);
}

generateSkmLenses();
