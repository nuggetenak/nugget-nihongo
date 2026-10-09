// ══════════════════════════════════════════════════════════════
//  build-curriculum-n5.js — Compiler for Nugget Nihongo Original Curriculum N5
//  Generates public/data/curriculum/curriculum-n5.js and .json
// ══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const grammarFile = path.join(ROOT, 'public/data/grammar/grammar-n5.js');
const vocabFile = path.join(ROOT, 'public/data/vocab/vocab-n5.js');
const outDir = path.join(ROOT, 'public/data/curriculum');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Load grammar and vocab data
const win = {};
eval(fs.readFileSync(grammarFile, 'utf8').replace('window.', 'win.'));
eval(fs.readFileSync(vocabFile, 'utf8').replace('window.', 'win.'));

const grammarN5 = win.grammarN5 || [];
const vocabN5 = win.vocabN5 || [];

const grammarMap = new Map(grammarN5.map(g => [g.id, g]));
const vocabMap = new Map(vocabN5.map(v => [v.id, v]));

// Helper to find vocab by keyword or reading
function findVocabIds(keywords) {
  const ids = [];
  for (const kw of keywords) {
    const match = vocabN5.find(v => 
      v.reading === kw || 
      v.word === kw || 
      (v.meaning_id && v.meaning_id.toLowerCase().includes(kw.toLowerCase()))
    );
    if (match && !ids.includes(match.id)) {
      ids.push(match.id);
    }
  }
  return ids;
}

// 10 Units Specification
const unitsDef = [
  {
    unit_number: 1,
    id: 'unit-n5-01',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Perkenalan Diri & Identitas',
    title_jp: '自己紹介と挨拶',
    theme: 'Aisatsu & Jikoshoukai',
    icon: '👋',
    can_do_summary: 'Dapat memperkenalkan nama, asal negara, profesi, dan menyapa orang lain dengan sopan dalam perjumpaan pertama.',
    l2d_focus_notes: 'Waspadai contrastive-adalah-copula: desu bukan kata kerja "adalah", melainkan penanda kesopanan predikat.',
    grammar_ids: [
      'gn5-00001', 'gn5-00002', 'gn5-00003', 'gn5-00004',
      'gn5-00005', 'gn5-00017', 'gn5-00018', 'gn5-00016'
    ],
    vocab_keywords: ['わたし', 'あなた', 'せんせい', 'がくせい', 'にほん', 'なまえ', 'ともだち', 'ひと', 'かた', 'しゃいん', 'だいがく', 'くに', 'はじめまして', 'どうぞよろしく', 'はい', 'いいえ'],
    lessons: [
      {
        id: 'les-n5-u01-01',
        lesson_number: 1,
        title_id: 'Nama & Identitas Pokok',
        title_jp: '名前と身分',
        desc_id: 'Menyatakan nama dan profesi menggunakan pola 〜は〜です.',
        can_do_statement: 'Bisa menyatakan nama dan status diri dengan sopan.',
        grammar_ids: ['gn5-00001', 'gn5-00005'],
        l2d_contrastive_tags: ['contrastive-adalah-copula', 'contrastive-word-order'],
        vocab_keywords: ['わたし', 'あなた', 'せんせい', 'がくせい', 'なまえ', 'ひと']
      },
      {
        id: 'les-n5-u01-02',
        lesson_number: 2,
        title_id: 'Penyangkalan & Pertanyaan Sopan',
        title_jp: '否定と疑問',
        desc_id: 'Menyangkal profesi/kewarganegaraan dan menanyakan identitas orang lain.',
        can_do_statement: 'Bisa bertanya apakah seseorang adalah pelajar/orang Jepang dan menjawab ya/bukan.',
        grammar_ids: ['gn5-00002', 'gn5-00018', 'gn5-00016'],
        l2d_contrastive_tags: ['contrastive-adalah-copula'],
        vocab_keywords: ['にほん', 'ともだち', 'かた', 'しゃいん', 'はい', 'いいえ']
      },
      {
        id: 'les-n5-u01-03',
        lesson_number: 3,
        title_id: 'Kepemilikan & Lampau',
        title_jp: '所属と過去形',
        desc_id: 'Menyatakan afiliasi (mahasiswa universitas mana) dan bentuk lampau.',
        can_do_statement: 'Bisa menjelaskan asal institusi dan riwayat profesi masa lampau.',
        grammar_ids: ['gn5-00003', 'gn5-00004', 'gn5-00017'],
        l2d_contrastive_tags: ['contrastive-word-order'],
        vocab_keywords: ['だいがく', 'くに', 'はじめまして', 'どうぞよろしく']
      }
    ]
  },
  {
    unit_number: 2,
    id: 'unit-n5-02',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Menunjuk Benda, Tempat & Ruang',
    title_jp: '物の指示と空間',
    theme: 'Kore, Sore, Are & Ko-So-A-Do',
    icon: '🧭',
    can_do_summary: 'Dapat menunjuk benda di dekat sendiri, dekat lawan bicara, atau jauh, serta menanyakan barang milik siapa.',
    l2d_focus_notes: 'Bahasa Indonesia hanya memiliki "ini" dan "itu", sedangkan bahasa Jepang membedakan 3 domain ruang (Kore/Sore/Are).',
    grammar_ids: ['gn5-00014', 'gn5-00019', 'gn5-00090', 'gn5-00093'],
    vocab_keywords: ['これ', 'それ', 'あれ', 'ほん', 'つくえ', 'いす', 'とけい', 'かばん', 'くるま', 'かさ', 'じどうしゃ', 'でんわ', 'てちょう'],
    lessons: [
      {
        id: 'les-n5-u02-01',
        lesson_number: 1,
        title_id: 'Menunjuk Barang di Sekitar',
        title_jp: 'これ・それ・あれ',
        desc_id: 'Menguasai perbedaan Kore, Sore, Are dan menanyakan barang apa.',
        can_do_statement: 'Bisa menanyakan nama barang yang dipegang sendiri atau orang lain.',
        grammar_ids: ['gn5-00090', 'gn5-00014'],
        l2d_contrastive_tags: ['contrastive-ko-so-a-do'],
        vocab_keywords: ['これ', 'それ', 'あれ', 'ほん', 'つくえ', 'いす']
      },
      {
        id: 'les-n5-u02-02',
        lesson_number: 2,
        title_id: 'Menanyakan Karakteristik & Konfirmasi',
        title_jp: 'どんな物・確認',
        desc_id: 'Menggunakan donna N dan partikel akhir ne/yo.',
        can_do_statement: 'Bisa meminta konfirmasi tentang barang dan mendeskripsikan jenisnya.',
        grammar_ids: ['gn5-00093', 'gn5-00019'],
        l2d_contrastive_tags: ['contrastive-particles-final'],
        vocab_keywords: ['とけい', 'かばん', 'くるま', 'かさ', 'でんわ']
      }
    ]
  },
  {
    unit_number: 3,
    id: 'unit-n5-03',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Keberadaan Benda & Makhluk Hidup',
    title_jp: '存在の表現（ある・いる）',
    theme: 'Arimasu & Imasu',
    icon: '🐱',
    can_do_summary: 'Dapat menyatakan keberadaan orang/hewan/benda di suatu tempat dan menjelaskan tata letak spasial.',
    l2d_focus_notes: 'contrastive-arimasu-imasu: bahasa Indonesia hanya mengenal kata "ada", Jepang membedakan benda mati (arimasu) vs makhluk hidup (imasu).',
    grammar_ids: ['gn5-00006', 'gn5-00009', 'gn5-00015', 'gn5-00061', 'gn5-00062'],
    vocab_keywords: ['ある', 'いる', 'うえ', 'した', 'まえ', 'うしろ', 'なか', 'そと', 'となり', 'いぬ', 'ねこ', 'へや', 'いえ', 'こうえん'],
    lessons: [
      {
        id: 'les-n5-u03-01',
        lesson_number: 1,
        title_id: 'Ada Benda Mati vs Makhluk Bernyawa',
        title_jp: '物と人の存在',
        desc_id: 'Membedakan penggunaan ga arimasu dan ga imasu.',
        can_do_statement: 'Bisa menyatakan keberadaan binatang, orang, atau barang di dalam ruangan.',
        grammar_ids: ['gn5-00006', 'gn5-00061'],
        l2d_contrastive_tags: ['contrastive-arimasu-imasu'],
        vocab_keywords: ['ある', 'いる', 'いぬ', 'ねこ', 'へや', 'こうえん']
      },
      {
        id: 'les-n5-u03-02',
        lesson_number: 2,
        title_id: 'Lokasi Keberadaan Spasial',
        title_jp: '場所と位置関係',
        desc_id: 'Menjelaskan posisi atas, bawah, dalam, luar, dan bersama siapa.',
        can_do_statement: 'Bisa menjelaskan posisi detail benda (misal: kucing ada di atas meja).',
        grammar_ids: ['gn5-00009', 'gn5-00062', 'gn5-00015'],
        l2d_contrastive_tags: ['contrastive-ni-de'],
        vocab_keywords: ['うえ', 'した', 'まえ', 'うしろ', 'なか', 'そと', 'となり', 'いえ']
      }
    ]
  },
  {
    unit_number: 4,
    id: 'unit-n5-04',
    level: 'n5',
    pt_stage: 3,
    title_id: 'Aktivitas Harian, Waktu & Mobilitas',
    title_jp: '毎日の生活と移動',
    theme: 'Verba Dinamis & Waktu',
    icon: '🏃',
    can_do_summary: 'Dapat menceritakan jadwal harian, jam bangun/tidur, tujuan perjalanan dengan jenis transportasi, dan tempat beraktivitas.',
    l2d_focus_notes: 'contrastive-ni-de: lokasi aktivitas (de) vs waktu/titik kedatangan (ni). Waspadai penghilangan partikel wo.',
    grammar_ids: [
      'gn5-00007', 'gn5-00008', 'gn5-00010', 'gn5-00011',
      'gn5-00012', 'gn5-00013', 'gn5-00020', 'gn5-00085', 'gn5-00089'
    ],
    vocab_keywords: ['いく', 'くる', 'かえる', 'たべる', 'のむ', 'みる', 'きく', 'おきる', 'ねる', 'あさ', 'ひる', 'ばん', 'まいあさ', 'まいばん', 'でんしゃ', 'ばす', 'ひこうき', 'えき'],
    lessons: [
      {
        id: 'les-n5-u04-01',
        lesson_number: 1,
        title_id: 'Verba Transitif & Objek Langsung',
        title_jp: '動作と目的語（を）',
        desc_id: 'Menggunakan verba makan, minum, membaca dengan partikel wo.',
        can_do_statement: 'Bisa menceritakan apa yang dimakan dan diminum setiap hari.',
        grammar_ids: ['gn5-00007', 'gn5-00089'],
        l2d_contrastive_tags: ['contrastive-particle-omission'],
        vocab_keywords: ['たべる', 'のむ', 'みる', 'きく', 'あさ', 'ひる', 'ばん']
      },
      {
        id: 'les-n5-u04-02',
        lesson_number: 2,
        title_id: 'Pergerakan & Transportasi',
        title_jp: '移動と乗り物',
        desc_id: 'Menyatakan pergi, pulang, datang dengan sarana transportasi.',
        can_do_statement: 'Bisa menceritakan pergi ke kampus naik kereta atau bus.',
        grammar_ids: ['gn5-00008', 'gn5-00012', 'gn5-00013', 'gn5-00085'],
        l2d_contrastive_tags: ['contrastive-ni-de'],
        vocab_keywords: ['いく', 'くる', 'かえる', 'でんしゃ', 'ばす', 'ひこうき', 'えき']
      },
      {
        id: 'les-n5-u04-03',
        lesson_number: 3,
        title_id: 'Waktu, Lokasi Tindakan & Rentang',
        title_jp: '時間・動作の場所・範囲',
        desc_id: 'Menyatakan jam beraktivitas dan tempat melakukan sesuatu.',
        can_do_statement: 'Bisa menyatakan belajar di perpustakaan dari jam 9 sampai jam 12.',
        grammar_ids: ['gn5-00010', 'gn5-00011', 'gn5-00020'],
        l2d_contrastive_tags: ['contrastive-ni-de'],
        vocab_keywords: ['おきる', 'ねる', 'まいあさ', 'まいばん']
      }
    ]
  },
  {
    unit_number: 5,
    id: 'unit-n5-05',
    level: 'n5',
    pt_stage: 3,
    title_id: 'Bertransaksi, Berbelanja & Menghitung',
    title_jp: '買い物と助数詞',
    theme: 'Counters & Shopping',
    icon: '🛒',
    can_do_summary: 'Dapat memesan makanan di restoran, menanyakan harga total, meminta jumlah benda secara akurat, dan berbelanja mandiri.',
    l2d_focus_notes: 'contrastive-counters: perubahan bunyi kata bantu bilangan (1-pon, 2-hon, 3-bon).',
    grammar_ids: ['gn5-00022', 'gn5-00023', 'gn5-00074', 'gn5-00075', 'gn5-00087', 'gn5-00088'],
    vocab_keywords: ['みず', 'おちゃ', 'ごはん', 'りんご', 'ひとつ', 'ふたつ', 'みっつ', 'いくら', 'えん', 'みせ', 'かう', 'やすい', 'たかい'],
    lessons: [
      {
        id: 'les-n5-u05-01',
        lesson_number: 1,
        title_id: 'Memesan Makanan & Kata Bantu Bilangan',
        title_jp: '注文と個数の数え方',
        desc_id: 'Menggunakan hitotsu, futatsu dan pola onegaishimasu / kudasai.',
        can_do_statement: 'Bisa memesan menu makanan dan menyebutkan jumlah porsi.',
        grammar_ids: ['gn5-00088'],
        l2d_contrastive_tags: ['contrastive-counters'],
        vocab_keywords: ['みず', 'おちゃ', 'ごはん', 'りんご', 'ひとつ', 'ふたつ', 'みっつ']
      },
      {
        id: 'les-n5-u05-02',
        lesson_number: 2,
        title_id: 'Harga, Pembatasan & Pilihan',
        title_jp: '値段・限定・並列',
        desc_id: 'Menanyakan harga dan menyatakan hanya/keduanya.',
        can_do_statement: 'Bisa menanyakan berapa harganya dan menyatakan hanya membeli satu.',
        grammar_ids: ['gn5-00022', 'gn5-00023', 'gn5-00074', 'gn5-00075', 'gn5-00087'],
        l2d_contrastive_tags: ['contrastive-limitation'],
        vocab_keywords: ['いくら', 'えん', 'みせ', 'かう', 'やすい', 'たかい']
      }
    ]
  },
  {
    unit_number: 6,
    id: 'unit-n5-06',
    level: 'n5',
    pt_stage: 3,
    title_id: 'Mendeskripsikan Sifat, Rasa & Kesan',
    title_jp: '形容詞と感想・比較',
    theme: 'Adjektiva & Perbandingan',
    icon: '✨',
    can_do_summary: 'Dapat mendeskripsikan cuaca, suasana kota, rasa makanan, kualitas barang, dan membandingkan dua hal mana yang lebih unggul.',
    l2d_focus_notes: 'Infleksi internal kata sifat-i (samukunai, samukatta). Dilarang menyambung dewa arimasen langsung ke kata sifat-i.',
    grammar_ids: [
      'gn5-00021', 'gn5-00024', 'gn5-00025', 'gn5-00026',
      'gn5-00057', 'gn5-00058', 'gn5-00059', 'gn5-00060', 'gn5-00084'
    ],
    vocab_keywords: ['おいしい', 'おおきい', 'ちいさい', 'あつい', 'さむい', 'いい', 'わるい', 'きらい', 'すき', 'きづく', 'しずか', 'きれい', 'ゆうめい', 'まち', 'てんき'],
    lessons: [
      {
        id: 'les-n5-u06-01',
        lesson_number: 1,
        title_id: 'Kata Sifat-i dan Perubahan Bentuk',
        title_jp: 'い形容詞の活用',
        desc_id: 'Menguasai bentuk lampau dan negatif dari kata sifat-i.',
        can_do_statement: 'Bisa menceritakan makanan yang enak atau cuaca yang kemarin dingin.',
        grammar_ids: ['gn5-00024', 'gn5-00025'],
        l2d_contrastive_tags: ['contrastive-adjective-inflection'],
        vocab_keywords: ['おいしい', 'おおきい', 'ちいさい', 'あつい', 'さむい', 'いい', 'わるい', 'てんき']
      },
      {
        id: 'les-n5-u06-02',
        lesson_number: 2,
        title_id: 'Kata Sifat-na & Modifikasi Benda',
        title_jp: 'な形容詞と名詞修飾',
        desc_id: 'Menyambung kata sifat-na dengan benda dan menjadikannya adverbia.',
        can_do_statement: 'Bisa mendeskripsikan kota yang tenang atau orang yang terkenal.',
        grammar_ids: ['gn5-00026', 'gn5-00084'],
        l2d_contrastive_tags: ['contrastive-na-adjective-particle'],
        vocab_keywords: ['しずか', 'きれい', 'ゆうめい', 'まち', 'すき', 'きらい']
      },
      {
        id: 'les-n5-u06-03',
        lesson_number: 3,
        title_id: 'Perbandingan Dua Benda & Superlatif',
        title_jp: '比較と最上級',
        desc_id: 'Membandingkan A lebih ... dari B dan yang paling ...',
        can_do_statement: 'Bisa membandingkan kereta lebih cepat daripada bus.',
        grammar_ids: ['gn5-00021', 'gn5-00057', 'gn5-00058', 'gn5-00059', 'gn5-00060'],
        l2d_contrastive_tags: ['contrastive-comparison-syntax'],
        vocab_keywords: ['おおきい', 'ちいさい', 'やすい', 'たかい']
      }
    ]
  },
  {
    unit_number: 7,
    id: 'unit-n5-07',
    level: 'n5',
    pt_stage: 3,
    title_id: 'Keinginan, Ajakan & Potensi Dasar',
    title_jp: '希望・勧誘・可能',
    theme: 'Volitional & Modalitas',
    icon: '🎯',
    can_do_summary: 'Dapat menyatakan hobi/kemampuan, mengajak teman beraktivitas bersama, menerima atau menolak ajakan dengan santun tanpa menyakiti perasaan.',
    l2d_focus_notes: 'Bentuk ~tai hanya sah untuk orang pertama. Menolak secara budaya menggunakan frasa menggantung chotto... (enryo).',
    grammar_ids: [
      'gn5-00040', 'gn5-00041', 'gn5-00042', 'gn5-00043',
      'gn5-00044', 'gn5-00050', 'gn5-00086', 'gn5-00091'
    ],
    vocab_keywords: ['うたう', 'あそぶ', 'およぐ', 'できる', 'わかる', 'りょこう', 'えいが', 'おんがく', 'すぽーつ', 'いっしょに'],
    lessons: [
      {
        id: 'les-n5-u07-01',
        lesson_number: 1,
        title_id: 'Menyatakan Keinginan Pribadi',
        title_jp: 'したい・したがる',
        desc_id: 'Menggunakan ~tai untuk diri sendiri dan ~tagaru untuk orang ketiga.',
        can_do_statement: 'Bisa menyatakan ingin pergi ke Jepang atau ingin minum kopi.',
        grammar_ids: ['gn5-00040', 'gn5-00041'],
        l2d_contrastive_tags: ['contrastive-tai-person-restriction'],
        vocab_keywords: ['りょこう', 'えいが', 'おんがく', 'あそぶ']
      },
      {
        id: 'les-n5-u07-02',
        lesson_number: 2,
        title_id: 'Mengajak Teman & Penolakan Halus',
        title_jp: '勧誘と断り方',
        desc_id: 'Mengajak dengan ~masenka, ~mashou, dan menolak dengan chotto...',
        can_do_statement: 'Bisa mengajak teman menonton film dan merespons ajakan dengan sopan.',
        grammar_ids: ['gn5-00042', 'gn5-00043', 'gn5-00044', 'gn5-00086'],
        l2d_contrastive_tags: ['contrastive-refusal-enryo'],
        vocab_keywords: ['いっしょに', 'えいが', 'あそぶ']
      },
      {
        id: 'les-n5-u07-03',
        lesson_number: 3,
        title_id: 'Menyatakan Kemampuan & Kemahiran',
        title_jp: 'できる・能力',
        desc_id: 'Menggunakan koto ga dekiru dan N ga wakaru/dekiru.',
        can_do_statement: 'Bisa menyatakan mampu berenang atau bisa bahasa Jepang.',
        grammar_ids: ['gn5-00050', 'gn5-00091'],
        l2d_contrastive_tags: ['contrastive-potential-verb'],
        vocab_keywords: ['うたう', 'およぐ', 'できる', 'わかる', 'すぽーつ']
      }
    ]
  },
  {
    unit_number: 8,
    id: 'unit-n5-08',
    level: 'n5',
    pt_stage: 4,
    title_id: 'Gerbang Perubahan Bentuk (Te-Form)',
    title_jp: 'て形と行動の連結',
    theme: 'Pivot Morfologi Verba',
    icon: '⚡',
    can_do_summary: 'Dapat meminta tolong kepada orang lain secara santun, meminta/memberi izin, memahami aturan larangan, dan menceritakan 2–3 tindakan berurutan.',
    l2d_focus_notes: 'Asimilasi bunyi verba Godan (ite, ide, tte, nde) merupakan gerbang kognitif terpenting sebelum melangkah ke level menengah.',
    grammar_ids: [
      'gn5-00030', 'gn5-00031', 'gn5-00032', 'gn5-00033',
      'gn5-00036', 'gn5-00092', 'gn5-00094'
    ],
    vocab_keywords: ['かく', 'まつ', 'はなす', 'とる', 'よむ', 'かす', 'かりる', 'おしえる', 'みせる', 'しゃしん', 'たばこ', 'すう'],
    lessons: [
      {
        id: 'les-n5-u08-01',
        lesson_number: 1,
        title_id: 'Merangkai Tindakan & Verba Bentuk-Te',
        title_jp: 'て形の基本と連結',
        desc_id: 'Mempelajari konjugasi te-form dan menghubungkan urutan kegiatan.',
        can_do_statement: 'Bisa menceritakan rutinitas berurutan: mandi lalu sarapan lalu pergi.',
        grammar_ids: ['gn5-00094', 'gn5-00092', 'gn5-00033'],
        l2d_contrastive_tags: ['contrastive-te-form-rules'],
        vocab_keywords: ['かく', 'まつ', 'はなす', 'とる', 'よむ']
      },
      {
        id: 'les-n5-u08-02',
        lesson_number: 2,
        title_id: 'Permohonan, Izin & Larangan',
        title_jp: '依頼・許可・禁止',
        desc_id: 'Menguasai te kudasai, te mo ii desu, dan te wa ikemasen.',
        can_do_statement: 'Bisa meminta tolong difotokan dan memahami larangan merokok di area umum.',
        grammar_ids: ['gn5-00030', 'gn5-00031', 'gn5-00032', 'gn5-00036'],
        l2d_contrastive_tags: ['contrastive-request-levels'],
        vocab_keywords: ['かす', 'かりる', 'おしえる', 'みせる', 'しゃしん', 'たばこ', 'すう']
      }
    ]
  },
  {
    unit_number: 9,
    id: 'unit-n5-09',
    level: 'n5',
    pt_stage: 4,
    title_id: 'Aspek Sedang, Kondisi Hasil & Bantuan',
    title_jp: 'てある・ていると授受',
    theme: 'Aspect & Giving/Receiving',
    icon: '🤝',
    can_do_summary: 'Dapat menjelaskan pekerjaan yang sedang berlangsung, status pernikahan/pekerjaan/tempat tinggal saat ini, serta mengungkapkan rasa terima kasih saat dibantu.',
    l2d_focus_notes: 'contrastive-aspect-teiru: te-iru pada verba sesaat berarti status hasil (sudah menikah), bukan sedang melangsungkan akad. contrastive-giving-receiving: empati uchi/soto.',
    grammar_ids: [
      'gn5-00029', 'gn5-00034', 'gn5-00037', 'gn5-00038',
      'gn5-00039', 'gn5-00080', 'gn5-00082', 'gn5-00083'
    ],
    vocab_keywords: ['すむ', 'はたらく', 'けっこん', 'しる', 'もつ', 'てつだう', 'あげる', 'もらう', 'くれる', 'しごと', 'かいしゃ'],
    lessons: [
      {
        id: 'les-n5-u09-01',
        lesson_number: 1,
        title_id: 'Sedang Dilakukan vs Kondisi Hasil (~te iru)',
        title_jp: '進行と結果の状態',
        desc_id: 'Membedakan aspek progresif aktif vs status hasil tindakan.',
        can_do_statement: 'Bisa menjelaskan status tempat tinggal, pekerjaan, dan hal yang sedang dikerjakan.',
        grammar_ids: ['gn5-00029', 'gn5-00082', 'gn5-00083', 'gn5-00034'],
        l2d_contrastive_tags: ['contrastive-aspect-teiru'],
        vocab_keywords: ['すむ', 'はたらく', 'けっこん', 'しる', 'もつ', 'しごと', 'かいしゃ']
      },
      {
        id: 'les-n5-u09-02',
        lesson_number: 2,
        title_id: 'Ungkapan Tolong-Menolong & Penyesalan',
        title_jp: '授受表現と完了',
        desc_id: 'Menguasai te ageru, te morau, te kureru dan te shimau.',
        can_do_statement: 'Bisa mengucapkan terima kasih atas bantuan teman dan meminta tolong secara akrab.',
        grammar_ids: ['gn5-00037', 'gn5-00038', 'gn5-00039', 'gn5-00080'],
        l2d_contrastive_tags: ['contrastive-giving-receiving'],
        vocab_keywords: ['てつだう', 'あげる', 'もらう', 'くれる']
      }
    ]
  },
  {
    unit_number: 10,
    id: 'unit-n5-10',
    level: 'n5',
    pt_stage: 4,
    title_id: 'Alasan, Syarat, Wacana & Gerbang N4',
    title_jp: '理由・条件・総合完成',
    theme: 'Subordinasi Klausa & Konsolidasi',
    icon: '🎓',
    can_do_summary: 'Dapat menjelaskan alasan logis, menceritakan pengalaman liburan lampau, menyatakan aturan keharusan, serta membuat pengandaian dasar.',
    l2d_focus_notes: 'contrastive-conditionals: bedakan tara (kondisional kronologis), to (keniscayaan alamiah), dan ba (syarat logis).',
    grammar_ids: [
      'gn5-00027', 'gn5-00028', 'gn5-00035', 'gn5-00045', 'gn5-00046',
      'gn5-00047', 'gn5-00048', 'gn5-00049', 'gn5-00051', 'gn5-00052',
      'gn5-00053', 'gn5-00054', 'gn5-00055', 'gn5-00056', 'gn5-00063',
      'gn5-00064', 'gn5-00065', 'gn5-00066', 'gn5-00067', 'gn5-00068',
      'gn5-00069', 'gn5-00070', 'gn5-00071', 'gn5-00072', 'gn5-00073',
      'gn5-00076', 'gn5-00077', 'gn5-00078', 'gn5-00079', 'gn5-00081'
    ],
    vocab_keywords: ['びょうき', 'くすり', 'びょういん', 'しけん', 'べんきょう', 'りょうり', 'つくる', 'おもう', 'いう', 'あめ', 'ふる', 'あたま', 'いたい'],
    lessons: [
      {
        id: 'les-n5-u10-01',
        lesson_number: 1,
        title_id: 'Keharusan, Larangan & Tanpa Melakukan',
        title_jp: '義務と不要',
        desc_id: 'Menguasai bentuk nakereba naranai, nakutemo ii, dan naide.',
        can_do_statement: 'Bisa menjelaskan aturan kantor/sekolah tentang hal yang harus dilakukan.',
        grammar_ids: ['gn5-00027', 'gn5-00035', 'gn5-00045', 'gn5-00046'],
        l2d_contrastive_tags: ['contrastive-obligation-syntax'],
        vocab_keywords: ['びょうき', 'くすり', 'びょういん', 'しけん', 'べangkyou']
      },
      {
        id: 'les-n5-u10-02',
        lesson_number: 2,
        title_id: 'Pengalaman & Hubungan Waktu',
        title_jp: '経験と時間関係',
        desc_id: 'Menguasai koto ga aru, mae ni, ato de, dan toki.',
        can_do_statement: 'Bisa menceritakan pernah pergi ke Kyoto dan rutinitas sebelum/sesudah makan.',
        grammar_ids: ['gn5-00028', 'gn5-00051', 'gn5-00054', 'gn5-00055', 'gn5-00056'],
        l2d_contrastive_tags: ['contrastive-ta-form-experience'],
        vocab_keywords: ['りょうり', 'つくる', 'あたま', 'いたい']
      },
      {
        id: 'les-n5-u10-03',
        lesson_number: 3,
        title_id: 'Menjelaskan Alasan & Kontras Wacana',
        title_jp: '理由と逆接',
        desc_id: 'Menguasai kara, node, ga, kedo, dan shi.',
        can_do_statement: 'Bisa memberikan alasan izin tidak masuk kerja karena sakit.',
        grammar_ids: ['gn5-00065', 'gn5-00066', 'gn5-00067', 'gn5-00068', 'gn5-00076'],
        l2d_contrastive_tags: ['contrastive-kara-vs-node'],
        vocab_keywords: ['びょうき', 'あめ', 'ふる']
      },
      {
        id: 'les-n5-u10-04',
        lesson_number: 4,
        title_id: 'Rencana, Saran & Perkiraan',
        title_jp: '意志・助言・推量',
        desc_id: 'Menguasai tsumori, hou ga ii, deshou, sou desu, kamoshirenai.',
        can_do_statement: 'Bisa memberi saran minum obat dan menyatakan rencana liburan.',
        grammar_ids: ['gn5-00063', 'gn5-00064', 'gn5-00052', 'gn5-00053', 'gn5-00077', 'gn5-00078', 'gn5-00069', 'gn5-00070', 'gn5-00079', 'gn5-00073'],
        l2d_contrastive_tags: ['contrastive-advice-modality'],
        vocab_keywords: ['おもう', 'くすり', 'びょういん']
      },
      {
        id: 'les-n5-u10-05',
        lesson_number: 5,
        title_id: 'Pengandaian Dasar & Gerbang N4',
        title_jp: '条件と引用・まとめ',
        desc_id: 'Menguasai kondisional tara, to, ba, kuotasi to iu, dan cara melakukan V-kata.',
        can_do_statement: 'Bisa membuat kalimat pengandaian jika hujan dan siap melangkah ke level N4.',
        grammar_ids: ['gn5-00047', 'gn5-00048', 'gn5-00049', 'gn5-00071', 'gn5-00072', 'gn5-00081'],
        l2d_contrastive_tags: ['contrastive-conditionals'],
        vocab_keywords: ['いう', 'あめ', 'ふる', 'つくる']
      }
    ]
  }
];

// Populate vocab IDs into each lesson and unit
const fullUnits = unitsDef.map(u => {
  const unitVocabIds = findVocabIds(u.vocab_keywords);
  
  const populatedLessons = u.lessons.map(les => {
    const lessonVocabIds = findVocabIds(les.vocab_keywords || []);
    return {
      id: les.id,
      unit_id: u.id,
      lesson_number: les.lesson_number,
      title_id: les.title_id,
      title_jp: les.title_jp,
      desc_id: les.desc_id,
      can_do_statement: les.can_do_statement,
      grammar_ids: les.grammar_ids,
      vocab_ids: lessonVocabIds,
      l2d_contrastive_tags: les.l2d_contrastive_tags,
      estimated_minutes: 15
    };
  });

  return {
    id: u.id,
    unit_number: u.unit_number,
    level: u.level,
    pt_stage: u.pt_stage,
    title_id: u.title_id,
    title_jp: u.title_jp,
    theme: u.theme,
    icon: u.icon,
    can_do_summary: u.can_do_summary,
    l2d_focus_notes: u.l2d_focus_notes,
    grammar_ids: u.grammar_ids,
    vocab_count_approx: unitVocabIds.length,
    lessons: populatedLessons
  };
});

const curriculumTrackN5 = {
  id: 'trk-nugget-n5',
  name: 'Kurikulum Original Nugget Nihongo · N5',
  name_id: 'Jalur Mandiri N5 (Kurikulum Nugget)',
  level: 'n5',
  tagline: 'Dirancang khusus untuk penutur bahasa Indonesia dengan Processability Theory & Analisis Kontrasif.',
  desc: 'Jalur belajar bertahap 10 unit lengkap dari salam dasar hingga penguasaan 94 pola tata bahasa dan 990+ kosakata JLPT N5.',
  total_units: fullUnits.length,
  total_grammar_count: grammarN5.length,
  units: fullUnits
};

// Write JSON
const jsonPath = path.join(outDir, 'curriculum-n5.json');
fs.writeFileSync(jsonPath, JSON.stringify(curriculumTrackN5, null, 2), 'utf8');

// Write JS (for browser script tags if needed)
const jsPath = path.join(outDir, 'curriculum-n5.js');
const jsContent = `// ══════════════════════════════════════════════════════════════
//  curriculum-n5.js — Nugget Nihongo Original Curriculum N5
//  Auto-generated by scripts/build-curriculum-n5.js
// ══════════════════════════════════════════════════════════════

window.curriculumN5 = ${JSON.stringify(curriculumTrackN5, null, 2)};
`;
fs.writeFileSync(jsPath, jsContent, 'utf8');

console.log(`✅ Curriculum N5 successfully built!`);
console.log(`   - Units: ${fullUnits.length}`);
console.log(`   - Grammar points mapped: ${fullUnits.reduce((acc, u) => acc + u.grammar_ids.length, 0)} / ${grammarN5.length}`);
console.log(`   - Output: ${jsonPath}`);
console.log(`   - Output: ${jsPath}`);
