// ══════════════════════════════════════════════════════════════
//  build-curriculum-n5.js — Compiler for Nugget Nihongo Original Curriculum N5
//  Generates public/data/curriculum/curriculum-n5.js and .json
//  15 Thematic Units · 32 Lessons · 100% Zero-Orphan Vocab & Kanji Coverage
// ══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const grammarFile = path.join(ROOT, 'public/data/grammar/grammar-n5.js');
const vocabFile = path.join(ROOT, 'public/data/vocab/vocab-n5.js');
const kanjiFile = path.join(ROOT, 'public/data/staged-expansion/kanji/kanji-n5.js');
const outDir = path.join(ROOT, 'public/data/curriculum');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Load grammar, vocab, and kanji data
const win = {};
eval(fs.readFileSync(grammarFile, 'utf8').replace(/window\./g, 'win.'));
eval(fs.readFileSync(vocabFile, 'utf8').replace(/window\./g, 'win.'));
if (fs.existsSync(kanjiFile)) {
  eval(fs.readFileSync(kanjiFile, 'utf8').replace(/window\./g, 'win.'));
}

const grammarN5 = win.grammarN5 || [];
const vocabN5 = win.vocabN5 || [];
const kanjiN5 = win.nuggetKanjiN5 || [];

// 15 Thematic Units Specification (32 Lessons Total)
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
    grammar_ids: ['gn5-00001', 'gn5-00005', 'gn5-00002', 'gn5-00018', 'gn5-00003', 'gn5-00004', 'gn5-00016', 'gn5-00017'],
    kanji_ids: ['kj-n5-001', 'kj-n5-002', 'kj-n5-003', 'kj-n5-004', 'kj-n5-005', 'kj-n5-006'],
    vocab_domains: ['profesi', 'orang', 'pertemanan', 'sopan-santun', 'tata-krama', 'bahasa'],
    vocab_keywords: ['わたし', 'あなた', 'せんせい', 'がくせい', 'にほん', 'なまえ', 'ともだち', 'ひと', 'かた', 'しゃいん', 'だいがく', 'くに', 'はじめまして', 'どうぞよろしく', 'はい', 'いいえ', 'インドネシア'],
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
        grammar_ids: ['gn5-00002', 'gn5-00018'],
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
        grammar_ids: ['gn5-00003', 'gn5-00004', 'gn5-00016', 'gn5-00017'],
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
    title_id: 'Demonstratif Spasial & Orientasi Benda',
    title_jp: '物の指示と空間',
    theme: 'Kore, Sore, Are & Ko-So-A-Do',
    icon: '🧭',
    can_do_summary: 'Dapat menunjuk benda di dekat sendiri, dekat lawan bicara, atau jauh, serta menanyakan karakteristik barang.',
    l2d_focus_notes: 'Bahasa Indonesia hanya memiliki "ini" dan "itu", sedangkan bahasa Jepang membedakan 3 domain ruang (Kore/Sore/Are).',
    grammar_ids: ['gn5-00014', 'gn5-00090', 'gn5-00093', 'gn5-00019'],
    kanji_ids: ['kj-n5-007', 'kj-n5-008', 'kj-n5-009', 'kj-n5-010', 'kj-n5-011', 'kj-n5-012'],
    vocab_domains: ['tunjuk', 'benda', 'alat-tulis', 'peralatan', 'buku'],
    vocab_keywords: ['これ', 'それ', 'あれ', 'どれ', 'この', 'その', 'あの', 'どの', 'ほん', 'つくえ', 'いす', 'とけい', 'かばん', 'くるま', 'かさ', 'でんわ', 'てちょう'],
    lessons: [
      {
        id: 'les-n5-u02-01',
        lesson_number: 1,
        title_id: 'Menunjuk Benda di Sekitar',
        title_jp: 'これ・それ・あれ',
        desc_id: 'Menguasai perbedaan Kore, Sore, Are dan menanyakan barang apa.',
        can_do_statement: 'Bisa menanyakan nama barang yang dipegang sendiri atau orang lain.',
        grammar_ids: ['gn5-00014', 'gn5-00090'],
        l2d_contrastive_tags: ['contrastive-ko-so-a-do'],
        vocab_keywords: ['これ', 'それ', 'あれ', 'どれ', 'ほん', 'つくえ', 'いす']
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
        vocab_keywords: ['どんな', 'とけい', 'かばん', 'くるま', 'かさ', 'でんわ']
      }
    ]
  },
  {
    unit_number: 3,
    id: 'unit-n5-03',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Keberadaan Spasial: Ada Benda vs Orang',
    title_jp: '存在の表現（ある・いる）',
    theme: 'Arimasu & Imasu',
    icon: '🐱',
    can_do_summary: 'Dapat menyatakan keberadaan orang/hewan/benda di suatu tempat dan menjelaskan tata letak spasial.',
    l2d_focus_notes: 'contrastive-arimasu-imasu: bahasa Indonesia hanya mengenal kata "ada", Jepang membedakan benda mati (arimasu) vs makhluk hidup (imasu).',
    grammar_ids: ['gn5-00006', 'gn5-00061', 'gn5-00009', 'gn5-00062', 'gn5-00015'],
    kanji_ids: ['kj-n5-013', 'kj-n5-014', 'kj-n5-015', 'kj-n5-016', 'kj-n5-017', 'kj-n5-018'],
    vocab_domains: ['lokasi', 'posisi', 'tempat', 'arah-posisi', 'bangunan', 'ruang-arah', 'hewan'],
    vocab_keywords: ['ある', 'いる', 'うえ', 'した', 'まえ', 'うしろ', 'なか', 'そと', 'となり', 'いぬ', 'ねこ', 'へや', 'いえ', 'こうえん', 'ぎんこう', 'ちかく'],
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
        vocab_keywords: ['ある', 'いる', 'いぬ', 'ねこ', 'ほん', 'つくえ']
      },
      {
        id: 'les-n5-u03-02',
        lesson_number: 2,
        title_id: 'Lokasi Spasial & Posisi Benda',
        title_jp: '位置と方向',
        desc_id: 'Menjelaskan posisi atas, bawah, depan, belakang, dan samping menggunakan partikel ni.',
        can_do_statement: 'Bisa memberi petunjuk letak barang atau tempat secara akurat.',
        grammar_ids: ['gn5-00009', 'gn5-00062', 'gn5-00015'],
        l2d_contrastive_tags: ['contrastive-spatial-particles'],
        vocab_keywords: ['うえ', 'した', 'まえ', 'うしろ', 'なか', 'そと', 'となり', 'へや']
      }
    ]
  },
  {
    unit_number: 4,
    id: 'unit-n5-04',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
    title_jp: '日課と時間・行動',
    theme: 'Mainichi no Seikatsu',
    icon: '⏰',
    can_do_summary: 'Dapat menceritakan aktivitas harian, jam bangun/tidur, dan kebiasaan kerja secara berurutan.',
    l2d_focus_notes: 'Partikel o menandai objek langsung verba transitif. Partikel ni menunjukkan titik waktu spesifik, sedangkan de menunjukkan lokasi tindakan.',
    grammar_ids: ['gn5-00007', 'gn5-00089', 'gn5-00034', 'gn5-00010', 'gn5-00011', 'gn5-00087'],
    kanji_ids: ['kj-n5-019', 'kj-n5-020', 'kj-n5-021', 'kj-n5-022', 'kj-n5-023', 'kj-n5-024'],
    vocab_domains: ['rutinitas', 'aktivitas', 'pekerjaan', 'kerja', 'waktu', 'kalender'],
    vocab_keywords: ['おきる', 'ねる', 'はたらく', 'やすむ', 'べんきょうする', 'おわる', 'あさ', 'ひる', 'ばん', 'よる', 'きょう', 'きのう', 'あした', 'まいにち', 'じかん', 'ふん', 'ごはん'],
    lessons: [
      {
        id: 'les-n5-u04-01',
        lesson_number: 1,
        title_id: 'Verba Transitif & Rutinitas Kerja',
        title_jp: '他動詞と習慣・同時行動',
        desc_id: 'Menggunakan partikel o untuk objek konsumsi/kerja, kebiasaan, dan aksi simultan (~nagara).',
        can_do_statement: 'Bisa menyatakan aktivitas konsumsi dan rutinitas kerja harian.',
        grammar_ids: ['gn5-00007', 'gn5-00089', 'gn5-00034'],
        l2d_contrastive_tags: ['contrastive-object-marker'],
        vocab_keywords: ['たべる', 'のむ', 'よむ', 'みる', 'ごはん', 'ほん', 'きく']
      },
      {
        id: 'les-n5-u04-02',
        lesson_number: 2,
        title_id: 'Waktu Spesifik, Lokasi & Frekuensi',
        title_jp: '時間・場所と頻度副詞',
        desc_id: 'Menyatakan jam berapa melakukan sesuatu di mana dan seberapa sering melakukannya.',
        can_do_statement: 'Bisa membuat janji temu dan melaporkan jadwal kerja harian.',
        grammar_ids: ['gn5-00010', 'gn5-00011', 'gn5-00087'],
        l2d_contrastive_tags: ['contrastive-time-location'],
        vocab_keywords: ['あさ', 'ひる', 'ばん', 'かいしゃ', 'うち', 'いつも', 'よく']
      }
    ]
  },
  {
    unit_number: 5,
    id: 'unit-n5-05',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Mobilitas, Transportasi & Teman Beraktivitas',
    title_jp: '移動と交通・同行者',
    theme: 'Idou & Koutsuu',
    icon: '🚆',
    can_do_summary: 'Dapat menjelaskan pergi ke mana, menggunakan transportasi apa, dan bersama siapa secara jelas.',
    l2d_focus_notes: 'Partikel e menandai arah pergerakan (berbeda dari ni tujuan statis). Partikel de menandai sarana transportasi.',
    grammar_ids: ['gn5-00008', 'gn5-00013', 'gn5-00020', 'gn5-00012', 'gn5-00085'],
    kanji_ids: ['kj-n5-025', 'kj-n5-026', 'kj-n5-027', 'kj-n5-028', 'kj-n5-029', 'kj-n5-030'],
    vocab_domains: ['transportasi', 'perjalanan', 'arah', 'kendaraan', 'fasilitas-umum', 'geografi'],
    vocab_keywords: ['いく', 'くる', 'かえる', 'でんしゃ', 'ちかてつ', 'しんかんせん', 'バス', 'タクシー', 'じてんしゃ', 'あるいて', 'えき', 'ひこうき', 'ふね'],
    lessons: [
      {
        id: 'les-n5-u05-01',
        lesson_number: 1,
        title_id: 'Pergerakan, Transportasi & Titik Asal',
        title_jp: '移動手段と方向',
        desc_id: 'Menyatakan arah pergerakan dengan partikel e/ni dan rentang pergerakan kara-made.',
        can_do_statement: 'Bisa menjelaskan rute berangkat kerja dan sarana transportasi yang dipakai.',
        grammar_ids: ['gn5-00008', 'gn5-00013', 'gn5-00020'],
        l2d_contrastive_tags: ['contrastive-movement-particles'],
        vocab_keywords: ['いく', 'くる', 'かえる', 'でんしゃ', 'バス', 'えき']
      },
      {
        id: 'les-n5-u05-02',
        lesson_number: 2,
        title_id: 'Teman Beraktivitas & Pilihan Transportasi',
        title_jp: '同行者と手段の選択',
        desc_id: 'Menyatakan sarana transportasi de dan asal kedatangan kara.',
        can_do_statement: 'Bisa mengajak rekan bepergian dan menceritakan asal kota/negara.',
        grammar_ids: ['gn5-00012', 'gn5-00085'],
        l2d_contrastive_tags: ['contrastive-companion-marker'],
        vocab_keywords: ['ともだち', 'ひとり', 'じてんしゃ', 'あるいて', 'ひこうき']
      }
    ]
  },
  {
    unit_number: 6,
    id: 'unit-n5-06',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Transaksi Kuliner, Angka & Kaunter',
    title_jp: '買い物・外食と助数詞',
    theme: 'Kaimono & Resutoran',
    icon: '🍱',
    can_do_summary: 'Dapat memesan makanan di restoran, menyebutkan jumlah pesanan dengan kaunter Jepang, dan menanyakan harga.',
    l2d_focus_notes: 'Sistem kaunter bilangan bahasa Jepang bervariasi tergantung bentuk benda (hitotsu, futatsu, hon, mai, dai).',
    grammar_ids: ['gn5-00088', 'gn5-00073', 'gn5-00086', 'gn5-00022', 'gn5-00023', 'gn5-00074', 'gn5-00075'],
    kanji_ids: ['kj-n5-031', 'kj-n5-032', 'kj-n5-033', 'kj-n5-034', 'kj-n5-035', 'kj-n5-036'],
    vocab_domains: ['kuliner', 'makanan-minuman', 'makanan', 'belanja', 'angka', 'jumlah-ukuran', 'kuantitas', 'ekonomi'],
    vocab_keywords: ['ひとつ', 'ふたつ', 'みっつ', 'いくら', 'えん', 'メニュー', 'みず', 'おちゃ', 'コーヒー', 'パン', 'にく', 'さかな', 'やさい', 'りんご', 'きって'],
    lessons: [
      {
        id: 'les-n5-u06-01',
        lesson_number: 1,
        title_id: 'Memesan Makanan, Kaunter & Kesepakatan',
        title_jp: '注文・助数詞と妥協',
        desc_id: 'Memesan menu dengan kaunter bilangan, onegaishimasu, dan kesepakatan de ii.',
        can_do_statement: 'Bisa memesan menu di restoran atau kedai Jepang secara mandiri.',
        grammar_ids: ['gn5-00088', 'gn5-00073', 'gn5-00086'],
        l2d_contrastive_tags: ['contrastive-counters'],
        vocab_keywords: ['ひとつ', 'ふたつ', 'みっつ', 'みず', 'おちゃ', 'コーヒー']
      },
      {
        id: 'les-n5-u06-02',
        lesson_number: 2,
        title_id: 'Harga, Pembatasan & Pilihan Alternatif',
        title_jp: '値段・限定と選択並列',
        desc_id: 'Menanyakan harga dan menggunakan pembatas dake/shika~nai serta pilihan ka~ka/mo~mo.',
        can_do_statement: 'Bisa menawar atau membatasi jumlah pesanan belanja.',
        grammar_ids: ['gn5-00022', 'gn5-00023', 'gn5-00074', 'gn5-00075'],
        l2d_contrastive_tags: ['contrastive-limitation'],
        vocab_keywords: ['いくら', 'えん', 'だけ', 'しか', 'パン', 'にく']
      }
    ]
  },
  {
    unit_number: 7,
    id: 'unit-n5-07',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Kualitas & Deskripsi: Kata Sifat-i',
    title_jp: 'イ形容詞と性質描写',
    theme: 'I-Keiyoushi & Byousha',
    icon: '🎨',
    can_do_summary: 'Dapat mendeskripsikan sifat benda, cuaca, dan rasa makanan serta perubahannya ke bentuk negatif dan lampau.',
    l2d_focus_notes: 'Kata sifat-i mengonjugasikan bunyi akhiran i menjadi kunai (negatif) dan katta (lampau) tanpa menambahkan desu dewa arimasen.',
    grammar_ids: ['gn5-00024', 'gn5-00025', 'gn5-00063', 'gn5-00064', 'gn5-00040'],
    kanji_ids: ['kj-n5-037', 'kj-n5-038', 'kj-n5-039', 'kj-n5-040', 'kj-n5-041', 'kj-n5-042'],
    vocab_domains: ['sifat', 'kualitas', 'deskripsi', 'warna', 'cuaca', 'alam'],
    vocab_keywords: ['おおきい', 'ちいさい', 'あたらしい', 'ふるい', 'いい', 'わるい', 'あつい', 'さむい', 'つめたい', 'たかい', 'やすい', 'おいしい', 'いそがしい', 'しろい', 'くろい', 'あかい', 'あおい'],
    lessons: [
      {
        id: 'les-n5-u07-01',
        lesson_number: 1,
        title_id: 'Kata Sifat-i dan Perubahan Bentuk',
        title_jp: 'イ形容詞の活用',
        desc_id: 'Menguasai bentuk afirmatif, negatif (~kunai), dan lampau (~katta).',
        can_do_statement: 'Bisa mendeskripsikan rasa makanan dan cuaca masa kini serta masa lampau.',
        grammar_ids: ['gn5-00024', 'gn5-00025'],
        l2d_contrastive_tags: ['contrastive-i-adjective-inflection'],
        vocab_keywords: ['おおきい', 'ちいさい', 'あつい', 'さむい', 'おいしい', 'たかい', 'やすい']
      },
      {
        id: 'les-n5-u07-02',
        lesson_number: 2,
        title_id: 'Perubahan Keadaan & Keinginan',
        title_jp: '変化と希望（〜たい）',
        desc_id: 'Menyatakan perubahan menjadi (~ni naru), menjadikan (~ni suru) dan keinginan pribadi (~tai).',
        can_do_statement: 'Bisa menceritakan cuaca yang berubah menjadi dingin dan hal yang ingin dilakukan.',
        grammar_ids: ['gn5-00063', 'gn5-00064', 'gn5-00040'],
        l2d_contrastive_tags: ['contrastive-desire-tai'],
        vocab_keywords: ['なる', 'する', 'たべたい', 'のみたい', 'あたらしい', 'ふるい']
      }
    ]
  },
  {
    unit_number: 8,
    id: 'unit-n5-08',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Modifikasi & Preferensi: Kata Sifat-na',
    title_jp: 'ナ形容詞と嗜好・能力',
    theme: 'Na-Keiyoushi & Konomi',
    icon: '🌸',
    can_do_summary: 'Dapat memodifikasi kata benda menggunakan kata sifat-na dan menyatakan hal-hal yang disukai atau dikuasai.',
    l2d_focus_notes: 'Kata sifat-na memerlukan partikel na saat menempel di depan kata benda, tetapi berakhiran desu saat menjadi predikat.',
    grammar_ids: ['gn5-00026', 'gn5-00092', 'gn5-00091', 'gn5-00084', 'gn5-00041'],
    kanji_ids: ['kj-n5-043', 'kj-n5-044', 'kj-n5-045', 'kj-n5-046', 'kj-n5-047', 'kj-n5-048'],
    vocab_domains: ['kepribadian', 'keadaan', 'kondisi', 'bentuk', 'kemampuan', 'penilaian'],
    vocab_keywords: ['しずか', 'にぎやか', 'べんり', 'ふべん', 'すき', 'きらい', 'じょうず', 'へた', 'ひま', 'ゆうめい', 'げんき', 'たいせつ', 'かんたん'],
    lessons: [
      {
        id: 'les-n5-u08-01',
        lesson_number: 1,
        title_id: 'Kata Sifat-na & Modifikasi Benda',
        title_jp: 'ナ形容詞の名詞修飾',
        desc_id: 'Menggunakan partikel na untuk menerangkan kata benda dan bentuk penghubung de.',
        can_do_statement: 'Bisa mendeskripsikan kota atau kamar yang tenang, bersih, dan praktis.',
        grammar_ids: ['gn5-00026', 'gn5-00092'],
        l2d_contrastive_tags: ['contrastive-na-adjective-particle'],
        vocab_keywords: ['しずか', 'にぎやか', 'べんり', 'きれい', 'ゆうめい']
      },
      {
        id: 'les-n5-u08-02',
        lesson_number: 2,
        title_id: 'Kemampuan, Pemahaman & Adverbia Sifat',
        title_jp: '能力・理解と副詞化',
        desc_id: 'Menyatakan kemahiran (jouzu/heta), pemahaman (wakarimasu/dekiru), dan keinginan orang ketiga (tagaru).',
        can_do_statement: 'Bisa mengutarakan tingkat kemahiran bahasa Jepang dan hobi.',
        grammar_ids: ['gn5-00091', 'gn5-00084', 'gn5-00041'],
        l2d_contrastive_tags: ['contrastive-ability-ga'],
        vocab_keywords: ['すき', 'きらい', 'じょうず', 'へた', 'わかる', 'できる']
      }
    ]
  },
  {
    unit_number: 9,
    id: 'unit-n5-09',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Komparasi, Pilihan & Derajat Superlatif',
    title_jp: '比較と最上級',
    theme: 'Hikaku & Saikou',
    icon: '⚖️',
    can_do_summary: 'Dapat membandingkan dua pilihan (A lebih ... daripada B) dan menentukan pilihan terbaik dalam suatu kelompok.',
    l2d_focus_notes: 'Struktur komparasi Jepang [A wa B yori adj desu] berbeda dari pola bahasa Indonesia [A lebih adj daripada B].',
    grammar_ids: ['gn5-00021', 'gn5-00057', 'gn5-00058', 'gn5-00059', 'gn5-00060'],
    kanji_ids: ['kj-n5-049', 'kj-n5-050', 'kj-n5-051', 'kj-n5-052', 'kj-n5-053', 'kj-n5-054'],
    vocab_domains: ['perbandingan', 'ukuran', 'derajat', 'tingkat'],
    vocab_keywords: ['より', 'ほう', 'ずっと', 'いちばん', 'どちら', 'どちらも', 'おなじ', 'ちがう', 'きせつ', 'はる', 'なつ', 'あき', 'ふゆ', 'スポーツ'],
    lessons: [
      {
        id: 'les-n5-u09-01',
        lesson_number: 1,
        title_id: 'Perbandingan Dua Benda',
        title_jp: '２つの物の比較',
        desc_id: 'Membandingkan dua objek dengan pola A wa B yori dan dochira ga.',
        can_do_statement: 'Bisa membandingkan harga atau kecepatan dua alat transportasi.',
        grammar_ids: ['gn5-00021', 'gn5-00057', 'gn5-00058'],
        l2d_contrastive_tags: ['contrastive-comparative-order'],
        vocab_keywords: ['より', 'ほう', 'どちら', 'ずっと', 'でんしゃ', 'バス']
      },
      {
        id: 'les-n5-u09-02',
        lesson_number: 2,
        title_id: 'Pilihan Jamak & Superlatif',
        title_jp: '範囲内の最上級',
        desc_id: 'Menentukan objek nomor satu dalam satu kelompok (no naka de ichiban).',
        can_do_statement: 'Bisa menyatakan musim paling disukai atau makanan paling lezat.',
        grammar_ids: ['gn5-00059', 'gn5-00060'],
        l2d_contrastive_tags: ['contrastive-superlative-scope'],
        vocab_keywords: ['いちばん', 'はる', 'なつ', 'あき', 'ふゆ', 'スポーツ']
      }
    ]
  },
  {
    unit_number: 10,
    id: 'unit-n5-10',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Rangkaian Aksi & Konjugasi Bentuk-Te',
    title_jp: 'テ形と連続動作',
    theme: 'Te-Kei & Renkin',
    icon: '🔗',
    can_do_summary: 'Dapat mengonjugasikan kata kerja ke bentuk-te untuk merangkai tindakan berurutan dan meminta tolong secara sopan.',
    l2d_focus_notes: 'Aturan perubahan bentuk-te berdasarkan akhiran kelompok verba Godan (u, tsu, ru -> tte; ku -> ite; gu -> ide; mu, bu, nu -> nde).',
    grammar_ids: ['gn5-00094', 'gn5-00033', 'gn5-00081', 'gn5-00030', 'gn5-00036', 'gn5-00080', 'gn5-00078'],
    kanji_ids: ['kj-n5-055', 'kj-n5-056', 'kj-n5-057', 'kj-n5-058', 'kj-n5-059'],
    vocab_domains: ['aksi', 'tindakan', 'perubahan', 'urutan', 'gerakan'],
    vocab_keywords: ['いって', 'きて', 'たべて', 'のんで', 'みて', 'よんで', 'きいて', 'かいて', 'かって', 'まって', 'およいで', 'あそんで', 'あけて', 'しめて', 'つけて', 'けして'],
    lessons: [
      {
        id: 'les-n5-u10-01',
        lesson_number: 1,
        title_id: 'Konjugasi Bentuk-Te & Urutan Aksi',
        title_jp: 'テ形活用・順序とやり方',
        desc_id: 'Menguasai rumus konjugasi verba bentuk-te, rangkaian tindakan (te kara), dan cara melakukan (V-kata).',
        can_do_statement: 'Bisa mengurutkan langkah kerja harian dari awal hingga selesai.',
        grammar_ids: ['gn5-00094', 'gn5-00033', 'gn5-00081'],
        l2d_contrastive_tags: ['contrastive-te-inflection'],
        vocab_keywords: ['たべて', 'のんで', 'いって', 'きて', 'おきて', 'ねて']
      },
      {
        id: 'les-n5-u10-02',
        lesson_number: 2,
        title_id: 'Instruksi, Uji Coba & Ketuntasan',
        title_jp: '依頼・試行・完了と助言',
        desc_id: 'Meminta tolong (~te kudasai), mencoba hal baru (~te miru), tindakan tuntas/sesal (~te shimau), dan saran (~hou ga ii).',
        can_do_statement: 'Bisa meminta rekan menunjukkan alat kerja dan menceritakan uji coba hal baru.',
        grammar_ids: ['gn5-00030', 'gn5-00036', 'gn5-00080', 'gn5-00078'],
        l2d_contrastive_tags: ['contrastive-polite-request'],
        vocab_keywords: ['みせて', 'かいて', 'おしえて', 'まって', 'しまう']
      }
    ]
  },
  {
    unit_number: 11,
    id: 'unit-n5-11',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Izin, Larangan & Aspek Sedang Berlangsung',
    title_jp: '許可・禁止と現在進行',
    theme: 'Kyoka & Kinshi & Te-Iru',
    icon: '🚦',
    can_do_summary: 'Dapat meminta dan memberi izin di tempat kerja, memahami larangan SOP, dan menyatakan kondisi yang sedang berlangsung.',
    l2d_focus_notes: 'Te-iru memiliki dua makna: aksi yang sedang berlangsung (progressive) dan keadaan hasil yang bertahan (resultant state).',
    grammar_ids: ['gn5-00031', 'gn5-00032', 'gn5-00029', 'gn5-00082', 'gn5-00083'],
    kanji_ids: ['kj-n5-060', 'kj-n5-061', 'kj-n5-062', 'kj-n5-063', 'kj-n5-064'],
    vocab_domains: ['aturan', 'hukum', 'izin', 'larangan', 'kesehatan'],
    vocab_keywords: ['しゃしん', 'とる', 'たばこ', 'すう', 'はいる', 'すわる', 'つかう', 'すむ', 'しる', 'もつ', 'けっこんする', 'まだ', 'もう'],
    lessons: [
      {
        id: 'les-n5-u11-01',
        lesson_number: 1,
        title_id: 'Izin & Larangan Kerja',
        title_jp: '許可と禁止の表現',
        desc_id: 'Meminta izin (~te mo ii desu ka) dan memahami rambu larangan (~te wa ikemasen).',
        can_do_statement: 'Bisa meminta izin mengambil foto atau memakai peralatan kantor secara aman.',
        grammar_ids: ['gn5-00031', 'gn5-00032'],
        l2d_contrastive_tags: ['contrastive-permission-prohibition'],
        vocab_keywords: ['いい', 'だめ', 'とる', 'はいる', 'すわる', 'つかう']
      },
      {
        id: 'les-n5-u11-02',
        lesson_number: 2,
        title_id: 'Sedang Dilakukan vs Kondisi Hasil',
        title_jp: '動作の進行と結果の状態',
        desc_id: 'Membedakan aksi sedang berjalan (shite iru) dan keadaan hasil tetap (kekkon shite iru).',
        can_do_statement: 'Bisa menceritakan profesi saat ini dan tempat tinggal keluarga.',
        grammar_ids: ['gn5-00029', 'gn5-00082', 'gn5-00083'],
        l2d_contrastive_tags: ['contrastive-te-iru-aspect'],
        vocab_keywords: ['すんでいる', 'しっている', 'もっている', 'もう', 'まだ']
      }
    ]
  },
  {
    unit_number: 12,
    id: 'unit-n5-12',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Hubungan Bantuan & Permintaan Tolong',
    title_jp: '授受表現と思いやり',
    theme: 'Joju Kankei & Omoiyari',
    icon: '🤝',
    can_do_summary: 'Dapat mengungkapkan pertolongan timbal balik (te-ageru, te-morau, te-kureru) dan potensi kemampuan dasar.',
    l2d_focus_notes: 'Perbedaan perspektif te-morau (subjek penerima kebaikan) vs te-kureru (orang lain yang berinisiatif menolong subjek/kelompok).',
    grammar_ids: ['gn5-00037', 'gn5-00038', 'gn5-00039', 'gn5-00050', 'gn5-00051'],
    kanji_ids: ['kj-n5-065', 'kj-n5-066', 'kj-n5-067', 'kj-n5-068', 'kj-n5-069'],
    vocab_domains: ['hubungan', 'sosial', 'keluarga', 'bantuan', 'pelayanan'],
    vocab_keywords: ['あげる', 'もらう', 'くれる', 'てつだう', 'かす', 'かりる', 'おしえる', 'ならう', 'なおす', 'できる', 'ことがある'],
    lessons: [
      {
        id: 'les-n5-u12-01',
        lesson_number: 1,
        title_id: 'Memberi & Menerima Kebaikan Aksi',
        title_jp: '恩恵の授受表現',
        desc_id: 'Menguasai tiga sudut pandang: te-ageru, te-morau, dan te-kureru.',
        can_do_statement: 'Bisa mengucapkan terima kasih secara mendalam atas bantuan rekan kerja.',
        grammar_ids: ['gn5-00037', 'gn5-00038', 'gn5-00039'],
        l2d_contrastive_tags: ['contrastive-benefactives-perspective'],
        vocab_keywords: ['あげる', 'もらう', 'くれる', 'てつだう', 'かす', 'かりる']
      },
      {
        id: 'les-n5-u12-02',
        lesson_number: 2,
        title_id: 'Kemampuan & Pengalaman Nyata',
        title_jp: '可能表現と経験',
        desc_id: 'Menyatakan kapasitas (~koto ga dekiru) dan rekam jejak pengalaman (~koto ga aru).',
        can_do_statement: 'Bisa memaparkan keterampilan mengemudi atau pengalaman mendaki gunung di Jepang.',
        grammar_ids: ['gn5-00050', 'gn5-00051'],
        l2d_contrastive_tags: ['contrastive-experience-ta-koto'],
        vocab_keywords: ['できる', 'ことがある', 'のぼる', 'うんてんする']
      }
    ]
  },
  {
    unit_number: 13,
    id: 'unit-n5-13',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Bentuk Biasa (Futsuukei) & Percakapan Santai',
    title_jp: '普通形と友達言葉',
    theme: 'Futsuukei & Tameguchi',
    icon: '💬',
    can_do_summary: 'Dapat berbicara dalam ragam santai (Futsuukei) kepada teman sebaya dan mengundang rekan secara kasual.',
    l2d_focus_notes: 'Transisi dari Teineigo (sopan) ke Futsuukei (santai) menuntut penghilangan desu/masu dan penguasaan bentuk kamus, nai, ta, nakatta.',
    grammar_ids: ['gn5-00028', 'gn5-00042', 'gn5-00043', 'gn5-00044', 'gn5-00027', 'gn5-00035', 'gn5-00077'],
    kanji_ids: ['kj-n5-070', 'kj-n5-071', 'kj-n5-072', 'kj-n5-073', 'kj-n5-074'],
    vocab_domains: ['percakapan', 'kehidupan-sehari', 'kehidupan-sehari-hari', 'umum', 'hobi', 'hiburan', 'olahraga', 'musik', 'seni'],
    vocab_keywords: ['いく', 'いかない', 'いった', 'いかなかった', 'たべる', 'たべない', 'たべた', 'つもり', 'あそぶ', 'うたう', 'おんがく', 'えいが'],
    lessons: [
      {
        id: 'les-n5-u13-01',
        lesson_number: 1,
        title_id: 'Bentuk Biasa Masa Kini, Lampau & Ajakan',
        title_jp: '普通形の現在・過去・勧誘',
        desc_id: 'Konversi kalimat desu/masu ke bentuk biasa serta ajakan mashou/masen ka.',
        can_do_statement: 'Bisa mengobrol santai saat istirahat makan siang bersama teman sebaya.',
        grammar_ids: ['gn5-00028', 'gn5-00042', 'gn5-00043', 'gn5-00044'],
        l2d_contrastive_tags: ['contrastive-plain-style-shift'],
        vocab_keywords: ['いく', 'いった', 'たべる', 'たべた', 'いっしょに', 'えいが']
      },
      {
        id: 'les-n5-u13-02',
        lesson_number: 2,
        title_id: 'Negasi Plain & Melakukan Tanpa',
        title_jp: '否定普通形と付帯状況',
        desc_id: 'Menguasai konjugasi nai-form, melakukan tanpa (naide), dan rencana (tsumori).',
        can_do_statement: 'Bisa menceritakan rencana akhir pekan dan hal yang dihindari.',
        grammar_ids: ['gn5-00027', 'gn5-00035', 'gn5-00077'],
        l2d_contrastive_tags: ['contrastive-nai-inflection'],
        vocab_keywords: ['いかない', 'たべない', 'ないで', 'つもり', 'やすむ']
      }
    ]
  },
  {
    unit_number: 14,
    id: 'unit-n5-14',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Opini, Kutipan & Alasan Berbicara',
    title_jp: '意見・引用と理由の説明',
    theme: 'Iken & Inyou & Riyuu',
    icon: '💡',
    can_do_summary: 'Dapat menyampaikan opini pribadi (to omou), mengutip perkataan orang lain (to itte ita), dan menjelaskan rangkaian alasan.',
    l2d_focus_notes: 'Sebelum to omou dan to iu, kalimat wajib diubah ke bentuk biasa (Futsuukei).',
    grammar_ids: ['gn5-00065', 'gn5-00066', 'gn5-00076', 'gn5-00067', 'gn5-00068', 'gn5-00071', 'gn5-00072'],
    kanji_ids: ['kj-n5-075', 'kj-n5-076', 'kj-n5-077', 'kj-n5-078', 'kj-n5-079'],
    vocab_domains: ['komunikasi', 'bahasa-komunikasi', 'pikiran-opini', 'emosi', 'perasaan', 'emosi-positif', 'media', 'teknologi'],
    vocab_keywords: ['おもう', 'いう', 'はなし', 'ニュース', 'ほんとう', 'うそ', 'から', 'ので', 'でも', 'しかし', 'し', 'インターネット', 'メール'],
    lessons: [
      {
        id: 'les-n5-u14-01',
        lesson_number: 1,
        title_id: 'Menjelaskan Alasan & Penjelasan Wacana',
        title_jp: '理由の説明（から・ので・し）',
        desc_id: 'Membedakan subjektivitas kara vs objektivitas sopan node dan perangkaian shi.',
        can_do_statement: 'Bisa menjelaskan alasan terlambat atau izin tidak masuk secara masuk akal.',
        grammar_ids: ['gn5-00065', 'gn5-00066', 'gn5-00076'],
        l2d_contrastive_tags: ['contrastive-kara-vs-node'],
        vocab_keywords: ['から', 'ので', 'し', 'あたま', 'いたい', 'ねつ', 'びょういん']
      },
      {
        id: 'les-n5-u14-02',
        lesson_number: 2,
        title_id: 'Kontras Percakapan & Kutipan Kalimat',
        title_jp: '逆接と引用（〜と思う・〜と言う）',
        desc_id: 'Menyampaikan opini to omou, mengutip to itte iru, dan menyambung kontras ga/kedo.',
        can_do_statement: 'Bisa menyampaikan pendapat dalam rapat singkat dan meneruskan pesan supervisor.',
        grammar_ids: ['gn5-00067', 'gn5-00068', 'gn5-00071', 'gn5-00072'],
        l2d_contrastive_tags: ['contrastive-indirect-quotation'],
        vocab_keywords: ['おもう', 'いう', 'けど', 'が', 'ニュース', 'ほんとう']
      }
    ]
  },
  {
    unit_number: 15,
    id: 'unit-n5-15',
    level: 'n5',
    pt_stage: 2,
    title_id: 'Keharusan, Pengalaman & Modifikasi Klausa',
    title_jp: '義務・時相・条件とN4への扉',
    theme: 'Gimu & Jouken & N4 Tobira',
    icon: '🚪',
    can_do_summary: 'Dapat menyatakan keharusan SOP kerja, menceritakan urutan waktu sebelum/sesudah, dan menggunakan pengandaian dasar.',
    l2d_focus_notes: 'Pola nakereba naranai adalah pondasi kepatuhan SOP di Jepang. Kondisional tara dan to membuka jalan menuju N4.',
    grammar_ids: ['gn5-00045', 'gn5-00046', 'gn5-00052', 'gn5-00053', 'gn5-00054', 'gn5-00055', 'gn5-00056', 'gn5-00069', 'gn5-00070', 'gn5-00079', 'gn5-00047', 'gn5-00048', 'gn5-00049'],
    kanji_ids: ['kj-n5-080', 'kj-n5-081', 'kj-n5-082', 'kj-n5-083', 'kj-n5-084'],
    vocab_domains: ['kegiatan', 'kegiatan-luar', 'alam-lingkungan', 'masyarakat', 'pendidikan', 'sekolah', 'belajar'],
    vocab_keywords: ['なければならない', 'なくてもいい', 'まえに', 'あとで', 'とき', 'でしょう', 'そうだ', 'かもしれない', 'たら', 'と', 'ば', 'やくそく', 'じゅんび'],
    lessons: [
      {
        id: 'les-n5-u15-01',
        lesson_number: 1,
        title_id: 'Keharusan, Larangan & Keputusan',
        title_jp: '義務・不要と決定',
        desc_id: 'Menyatakan kewajiban nakereba naranai, dispensasi nakutemo ii, dan koto ni suru.',
        can_do_statement: 'Bisa memahami peraturan keselamatan pabrik dan kewajiban dokumen visa.',
        grammar_ids: ['gn5-00045', 'gn5-00046', 'gn5-00052', 'gn5-00053'],
        l2d_contrastive_tags: ['contrastive-obligation-double-negative'],
        vocab_keywords: ['なければならない', 'なくてもいい', 'パスポート', 'びざ', 'くすり']
      },
      {
        id: 'les-n5-u15-02',
        lesson_number: 2,
        title_id: 'Hubungan Waktu & Rangkaian Peristiwa',
        title_jp: '時間関係（前に・後で・時）',
        desc_id: 'Menyatakan urutan aksi: V-dict mae ni, V-ta ato de, dan toki.',
        can_do_statement: 'Bisa menjelaskan jadwal operasional sebelum dan sesudah mesin dinyalakan.',
        grammar_ids: ['gn5-00054', 'gn5-00055', 'gn5-00056'],
        l2d_contrastive_tags: ['contrastive-temporal-clauses'],
        vocab_keywords: ['まえに', 'あとで', 'とき', 'しょくじ', 'ねる', 'でかける']
      },
      {
        id: 'les-n5-u15-03',
        lesson_number: 3,
        title_id: 'Perkiraan, Dugaan, Pengandaian & Gerbang N4',
        title_jp: '推量・様態・条件とN4総括',
        desc_id: 'Dugaan (deshou, kamoshirenai), impresi (sou da), kondisional (tara, to, ba), dan kelulusan fondasi N5.',
        can_do_statement: 'Bisa memperkirakan cuaca dan membuat kalimat pengandaian jika mesin mengalami error.',
        grammar_ids: ['gn5-00069', 'gn5-00070', 'gn5-00079', 'gn5-00047', 'gn5-00048', 'gn5-00049'],
        l2d_contrastive_tags: ['contrastive-conditionals-bridge'],
        vocab_keywords: ['でしょう', 'そうだ', 'かもしれない', 'あめ', 'ふる', 'おす']
      }
    ]
  }
];

// ── Smart Semantic Partitioning: 100% Zero Orphan Vocab ──
function getAffinityN5(v) {
  const d = v.domain || [];
  const p = v.pos || '';
  const m = (v.meaning_id || '').toLowerCase();
  const w = v.word || '';
  const r = v.reading || '';

  // U6: Counters & Food
  if (p === 'counter' || d.includes('angka') || d.includes('jumlah-ukuran') || d.includes('makanan') || d.includes('makanan-minuman') || d.includes('kuliner') || d.includes('belanja')) return 5;
  // U7: i-adj
  if (p === 'i-adj' || d.includes('sifat') || d.includes('warna') || d.includes('cuaca')) return 6;
  // U8: na-adj
  if (p === 'na-adj' || d.includes('kepribadian') || d.includes('kondisi') || d.includes('kemampuan')) return 7;
  // U9: Perbandingan, derajat
  if (d.includes('perbandingan') || d.includes('derajat') || m.includes('lebih') || m.includes('paling')) return 8;
  // U1: Profesi, Identitas, Aisatsu
  if (d.includes('profesi') || d.includes('orang') || d.includes('sopan-santun') || d.includes('tata-krama') || d.includes('pertemanan')) return 0;
  // U2: Ko-so-a-do, Alat tulis
  if (d.includes('tunjuk') || d.includes('alat-tulis') || d.includes('peralatan') || d.includes('buku')) return 1;
  // U3: Spasial, Posisi, Tempat, Hewan
  if (d.includes('posisi') || d.includes('arah-posisi') || d.includes('bangunan') || d.includes('hewan') || d.includes('tempat') || d.includes('lokasi')) return 2;
  // U5: Transportasi & Mobilitas
  if (d.includes('transportasi') || d.includes('kendaraan') || d.includes('perjalanan') || d.includes('fasilitas-umum')) return 4;
  // U4: Waktu, rutinitas
  if (d.includes('waktu') || d.includes('kalender') || d.includes('rutinitas') || d.includes('pekerjaan')) return 3;
  // U12: Keluarga, hubungan sosial
  if (d.includes('keluarga') || d.includes('sosial') || d.includes('hubungan')) return 11;
  // U14: Komunikasi, emosi, pikiran
  if (d.includes('komunikasi') || d.includes('bahasa-komunikasi') || d.includes('emosi') || d.includes('perasaan') || d.includes('teknologi')) return 13;
  // U15: Masyarakat, pendidikan, kegiatan luar
  if (d.includes('masyarakat') || d.includes('pendidikan') || d.includes('sekolah') || d.includes('alam-lingkungan') || d.includes('alam') || d.includes('kesehatan')) return 14;
  // Verbs distribution across verb-heavy units
  if (p.startsWith('verb')) {
    const code = (w.charCodeAt(0) || 0) + (r.charCodeAt(0) || 0);
    const verbUnits = [3, 9, 10, 11, 12];
    return verbUnits[code % verbUnits.length];
  }
  // Generic nouns & others
  const nounUnits = [0, 1, 2, 3, 4, 5, 8, 12, 13, 14];
  const code = (w.charCodeAt(0) || 0) + (r.charCodeAt(0) || 0);
  return nounUnits[code % nounUnits.length];
}

const unitAssignedVocab = Array.from({ length: 15 }, () => []);
vocabN5.forEach(v => {
  const uIdx = getAffinityN5(v);
  unitAssignedVocab[uIdx].push(v.id);
});

// Build the fully populated units and lessons
const fullUnits = unitsDef.map((u, uIdx) => {
  const unitVocabList = unitAssignedVocab[uIdx] || [];
  const unitKanjiIds = u.kanji_ids || [];
  const lessonsCount = u.lessons.length;
  const vocabPerLesson = Math.ceil(unitVocabList.length / lessonsCount);
  const kanjiPerLesson = Math.ceil(unitKanjiIds.length / lessonsCount);

  const populatedLessons = u.lessons.map((les, lIdx) => {
    const lessonVocabIds = unitVocabList.slice(lIdx * vocabPerLesson, (lIdx + 1) * vocabPerLesson);
    const lessonKanjiIds = unitKanjiIds.slice(lIdx * kanjiPerLesson, (lIdx + 1) * kanjiPerLesson);

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
      kanji_ids: lessonKanjiIds,
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
    kanji_ids: unitKanjiIds,
    vocab_ids: unitVocabList,
    vocab_count_approx: unitVocabList.length,
    lessons: populatedLessons
  };
});

// Master Curriculum N5 Object
const curriculumTrackN5 = {
  meta: {
    track_id: 'curriculum-n5',
    level: 'n5',
    title: 'Kurikulum Original Nugget Nihongo · N5',
    title_id: 'Jalur Mandiri N5 (Kurikulum Nugget)',
    version: '2.0.0',
    total_units: fullUnits.length,
    total_lessons: fullUnits.reduce((acc, u) => acc + u.lessons.length, 0),
    total_grammar_points: grammarN5.length,
    total_kanji_count: kanjiN5.length,
    core_target_vocab_count: 124,
    total_vocab_points: vocabN5.length,
    total_vocab_bank_count: vocabN5.length,
    authoritative: true
  },
  id: 'trk-nugget-n5',
  name: 'Kurikulum Original Nugget Nihongo · N5',
  name_id: 'Jalur Mandiri N5 (Kurikulum Nugget)',
  level: 'n5',
  tagline: 'Dirancang khusus untuk penutur bahasa Indonesia dengan Processability Theory & Analisis Kontrasif.',
  desc: 'Jalur belajar bertahap 15 unit lengkap dari salam dasar hingga penguasaan 94 pola tata bahasa, 124 target kosakata inti (1.321 total kosakata terpetakan), dan 870+ bank kosakata JLPT N5.',
  total_units: fullUnits.length,
  total_grammar_count: grammarN5.length,
  units: fullUnits
};

// Write JSON
const jsonPath = path.join(outDir, 'curriculum-n5.json');
fs.writeFileSync(jsonPath, JSON.stringify(curriculumTrackN5, null, 2), 'utf8');

// Write JS
const jsPath = path.join(outDir, 'curriculum-n5.js');
const jsContent = `// ══════════════════════════════════════════════════════════════
//  curriculum-n5.js — Nugget Nihongo Original Curriculum N5
//  Auto-generated by scripts/build-curriculum-n5.js
// ══════════════════════════════════════════════════════════════

window.curriculumN5 = ${JSON.stringify(curriculumTrackN5, null, 2)};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { curriculumN5: window.curriculumN5 };
}
`;
fs.writeFileSync(jsPath, jsContent, 'utf8');

console.log(`✅ Curriculum N5 successfully built!`);
console.log(`   - Units: ${fullUnits.length}`);
console.log(`   - Lessons: ${fullUnits.reduce((acc, u) => acc + u.lessons.length, 0)}`);
console.log(`   - Grammar points mapped: ${fullUnits.reduce((acc, u) => acc + u.grammar_ids.length, 0)} / ${grammarN5.length}`);
console.log(`   - Kanji mapped: ${fullUnits.reduce((acc, u) => acc + u.kanji_ids.length, 0)} / ${kanjiN5.length}`);
console.log(`   - Vocab mapped: ${fullUnits.reduce((acc, u) => acc + u.vocab_ids.length, 0)} / ${vocabN5.length}`);
console.log(`   - Output: ${jsonPath}`);
