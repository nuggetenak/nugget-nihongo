// ══════════════════════════════════════════════════════════════
//  build-curriculum-n4.js — Compiler for Nugget Nihongo Original Curriculum N4
//  Generates public/data/curriculum/curriculum-n4.js and .json
//  15 Thematic Units · 32 Lessons · 100% Zero-Orphan Vocab & Kanji Coverage
// ══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const outDir = path.join(ROOT, 'public/data/curriculum');
const grammarFile = path.join(ROOT, 'public/data/grammar/grammar-n4.js');
const vocabFile = path.join(ROOT, 'public/data/vocab/vocab-n4.js');
const kanjiFile = path.join(ROOT, 'public/data/staged-expansion/kanji/kanji-n4.js');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Load data
const win = {};
eval(fs.readFileSync(grammarFile, 'utf8').replace(/window\./g, 'win.'));
eval(fs.readFileSync(vocabFile, 'utf8').replace(/window\./g, 'win.'));
if (fs.existsSync(kanjiFile)) {
  eval(fs.readFileSync(kanjiFile, 'utf8').replace(/window\./g, 'win.'));
}

const grammarN4 = win.grammarN4 || [];
const vocabN4 = win.vocabN4 || [];
const kanjiN4 = win.nuggetKanjiN4 || [];

// 15 TEMATIK UNIT KURIKULUM MANDIRI N4 (32 Lessons Total)
const n4UnitDefinitions = [
  {
    unit_number: 1,
    id: 'unit-n4-01',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Niat, Tekad & Rencana Kehidupan',
    title_jp: '意志形と将来の予定',
    theme: 'Ishi & Keikaku',
    icon: '🎯',
    can_do_summary: 'Bisa menyatakan tekad pribadi, menyusun rencana kerja, dan membiasakan rutinitas harian.',
    l2d_focus_notes: 'Membedakan derajat niat: V-you (spontan kasual) vs V-you to omou (niat terpendam) vs V-tsumori (rencana matang).',
    grammar_ids: ['gn4-00076', 'gn4-00075', 'gn4-00074', 'gn4-00090', 'gn4-00041'],
    kanji_ids: Array.from({ length: 12 }, (_, i) => `kj-n4-${String(i + 1).padStart(3, '0')}`),
    vocab_domains: ['rencana', 'pikiran', 'usaha', 'waktu', 'pekerjaan'],
    vocab_keywords: ['けいかく', 'よてい', 'じゅんび', 'そうだん', 'いけん', 'きめる', 'つもり', 'おもう'],
    lessons: [
      {
        id: 'les-n4-u01-01',
        lesson_number: 1,
        title_id: 'Niat, Tekad & Rencana Pribadi',
        title_jp: '意志形と将来の予定',
        desc_id: 'Menguasai bentuk volisional (ikoukei), niat terencana (~you to omou), dan rencana matang (~tsumori).',
        can_do_statement: 'Bisa menyampaikan niat dan rencana kerja jangka pendek dan menengah.',
        grammar_ids: ['gn4-00076', 'gn4-00075', 'gn4-00074'],
        l2d_contrastive_tags: ['contrastive-volitional-gradience'],
        vocab_keywords: ['よてい', 'けいかく', 'きめる', 'つもり']
      },
      {
        id: 'les-n4-u01-02',
        lesson_number: 2,
        title_id: 'Kebiasaan Diri & Upaya Bertindak',
        title_jp: '習慣化と行動の工夫',
        desc_id: 'Menyatakan aturan kebiasaan yang diputuskan sendiri (~koto ni shite iru) dan upaya teratur (~you ni suru).',
        can_do_statement: 'Bisa menceritakan komitmen kedisiplinan dan rutinitas belajar mandiri di Jepang.',
        grammar_ids: ['gn4-00090', 'gn4-00041'],
        l2d_contrastive_tags: ['contrastive-habit-formation'],
        vocab_keywords: ['しゅうかん', 'まいにち', 'どりょく', 'つづける']
      }
    ]
  },
  {
    unit_number: 2,
    id: 'unit-n4-02',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Rekomendasi, Saran & Derajat Berlebih',
    title_jp: '助言・目的と過度表現',
    theme: 'Jyogen & Mokuteki',
    icon: '💡',
    can_do_summary: 'Bisa memberi saran bersahabat, menjelaskan batas kelebihan, dan menyatakan tujuan tindakan.',
    l2d_focus_notes: 'Pola ~hou ga ii vs ~tara dou desu ka: perhatikan tingkat kehalusan nasihat kepada rekan atau atasan.',
    grammar_ids: ['gn4-00038', 'gn4-00039', 'gn4-00068', 'gn4-00042', 'gn4-00071', 'gn4-00072'],
    kanji_ids: Array.from({ length: 12 }, (_, i) => `kj-n4-${String(i + 13).padStart(3, '0')}`),
    vocab_domains: ['evaluasi', 'kualitas', 'derajat', 'komunikasi'],
    vocab_keywords: ['そうだん', 'いけん', 'やくにたつ', 'アドバイス', 'すぎる', 'ため'],
    lessons: [
      {
        id: 'les-n4-u02-01',
        lesson_number: 1,
        title_id: 'Memberi Rekomendasi & Saran Sopan',
        title_jp: '助言と提案（〜ほうがいい）',
        desc_id: 'Memberi saran bersahabat (~hou ga ii) dan mengajukan opsi santun (~tara dou desu ka).',
        can_do_statement: 'Bisa menasihati rekan kerja yang menghadapi masalah secara empatik.',
        grammar_ids: ['gn4-00038', 'gn4-00039'],
        l2d_contrastive_tags: ['contrastive-advisory-tones'],
        vocab_keywords: ['ほう', 'どう', 'そうだん', 'いけん']
      },
      {
        id: 'les-n4-u02-02',
        lesson_number: 2,
        title_id: 'Derajat Berlebih & Tujuan Tindakan',
        title_jp: '過度と目的の表現',
        desc_id: 'Menyatakan batas yang terlampaui (~sugiru), tujuan mulia (~tame ni), dan demonstratif cara (konna/kou).',
        can_do_statement: 'Bisa menjelaskan tindakan korektif saat bekerja terlalu lelah.',
        grammar_ids: ['gn4-00068', 'gn4-00042', 'gn4-00071', 'gn4-00072'],
        l2d_contrastive_tags: ['contrastive-excessive-sugiru'],
        vocab_keywords: ['すぎる', 'ため', 'こんな', 'こう', 'つかれる']
      }
    ]
  },
  {
    unit_number: 3,
    id: 'unit-n4-03',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Potensial, Kapasitas & Perubahan Diri',
    title_jp: '可能動詞と自発・能力変化',
    theme: 'Kanou & Henka',
    icon: '⚡',
    can_do_summary: 'Bisa menjelaskan keterampilan kerja, persepsi indrawi, dan proses perubahan kemampuan.',
    l2d_focus_notes: 'Partikel ga pada bentuk potensial dan perbedaan persepsi spontan kikoeru/mieru vs kiku/miru.',
    grammar_ids: ['gn4-00031', 'gn4-00066', 'gn4-00040', 'gn4-00043'],
    kanji_ids: Array.from({ length: 12 }, (_, i) => `kj-n4-${String(i + 25).padStart(3, '0')}`),
    vocab_domains: ['kemampuan', 'perubahan', 'kondisi', 'kegiatan'],
    vocab_keywords: ['できる', 'きこえる', 'みえる', 'なおす', 'れんしゅう', 'なる', 'する'],
    lessons: [
      {
        id: 'les-n4-u03-01',
        lesson_number: 1,
        title_id: 'Bentuk Potensial & Persepsi Alami',
        title_jp: '可能形と自発知覚',
        desc_id: 'Konjugasi verba potensial (kanoukei) dan persepsi indrawi spontan (kikoeru, mieru).',
        can_do_statement: 'Bisa menjelaskan keterampilan operasional dan melaporkan suara mesin yang terdengar aneh.',
        grammar_ids: ['gn4-00031', 'gn4-00066'],
        l2d_contrastive_tags: ['contrastive-potential-ga', 'contrastive-spontaneous-perception'],
        vocab_keywords: ['できる', 'きこえる', 'みえる', 'おと', 'こえ']
      },
      {
        id: 'les-n4-u03-02',
        lesson_number: 2,
        title_id: 'Proses Perubahan Kemampuan & Keadaan',
        title_jp: '能力変化と状態移行',
        desc_id: 'Menyatakan proses menjadi bisa (you ni naru) dan menjadikan sifat (~ku suru / ~ni suru).',
        can_do_statement: 'Bisa menceritakan peningkatan pemahaman bahasa Jepang selama magang.',
        grammar_ids: ['gn4-00040', 'gn4-00043'],
        l2d_contrastive_tags: ['contrastive-gradual-transformation'],
        vocab_keywords: ['ようになる', 'する', 'じょうず', 'わかる']
      }
    ]
  },
  {
    unit_number: 4,
    id: 'unit-n4-04',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Kemudahan Operasional & Ukuran Sifat',
    title_jp: '操作の難易度と性質の度合い',
    theme: 'Sousa & Seishitsu',
    icon: '🛠️',
    can_do_summary: 'Bisa mendeskripsikan tingkat kemudahan penggunaan alat dan mengukur derajat kualitas sifat.',
    l2d_focus_notes: 'Sufiks ~yasui dan ~nikui menempel pada stem kata kerja (masu-stem).',
    grammar_ids: ['gn4-00044', 'gn4-00045', 'gn4-00002', 'gn4-00070', 'gn4-00069', 'gn4-00005'],
    kanji_ids: Array.from({ length: 12 }, (_, i) => `kj-n4-${String(i + 37).padStart(3, '0')}`),
    vocab_domains: ['kemudahan', 'kualitas', 'sifat', 'jumlah', 'alat'],
    vocab_keywords: ['やすい', 'にくい', 'つかいやすい', 'わかりにくい', 'おもさ', 'たかさ', 'ふかさ'],
    lessons: [
      {
        id: 'les-n4-u04-01',
        lesson_number: 1,
        title_id: 'Tingkat Kemudahan & Alokasi Satuan',
        title_jp: '難易度接辞と配分表現',
        desc_id: 'Menggunakan sufiks ~yasui / ~nikui dan partikel alokasi satuan ~zutsu.',
        can_do_statement: 'Bisa menilai manual operasional alat yang mudah dipahami dan membagikan komponen per orang.',
        grammar_ids: ['gn4-00044', 'gn4-00045', 'gn4-00002'],
        l2d_contrastive_tags: ['contrastive-ease-difficulty-suffixes'],
        vocab_keywords: ['やすい', 'にくい', 'つかいやすい', 'ずつ']
      },
      {
        id: 'les-n4-u04-02',
        lesson_number: 2,
        title_id: 'Nominalisasi Ukuran Sifat & Interval Rutin',
        title_jp: '性質の名詞化（〜さ）と反復間隔',
        desc_id: 'Mengubah kata sifat menjadi besaran objektif (~sa), ekspresi pihak ketiga (~garu), dan interval waktu (~goto ni).',
        can_do_statement: 'Bisa melaporkan berat beban paket dan mengecek mesin setiap 30 menit.',
        grammar_ids: ['gn4-00070', 'gn4-00069', 'gn4-00005'],
        l2d_contrastive_tags: ['contrastive-nominalized-dimensions'],
        vocab_keywords: ['おもさ', 'ながさ', 'たかさ', 'ごとに', 'がる']
      }
    ]
  },
  {
    unit_number: 5,
    id: 'unit-n4-05',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Aspek Waktu, Batas Momen & Fase Aksi',
    title_jp: '時間のアスペクト・期限と局面',
    theme: 'Kigen & Shousai',
    icon: '⏳',
    can_do_summary: 'Bisa mengomunikasikan tenggat waktu ketat, fase momen aksi, dan awal tindakan.',
    l2d_focus_notes: 'Perbedaan mendasar ~made (kontinu) vs ~made ni (batas akhir penyelesaian / deadline).',
    grammar_ids: [
      'gn4-00011', 'gn4-00092', 'gn4-00012', 'gn4-00001',
      'gn4-00013', 'gn4-00014', 'gn4-00015',
      'gn4-00091', 'gn4-00021', 'gn4-00022', 'gn4-00010'
    ],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 49).padStart(3, '0')}`),
    vocab_domains: ['waktu', 'kejadian', 'frekuensi', 'rutinitas'],
    vocab_keywords: ['までに', 'あいだに', 'ところ', 'はじめる', 'だす', 'ばかり', 'きげん', 'しめきり'],
    lessons: [
      {
        id: 'les-n4-u05-01',
        lesson_number: 1,
        title_id: 'Tenggat Waktu & Rentang Kejadian',
        title_jp: '期限（までに）と期間（間に）',
        desc_id: 'Membedakan batas waktu mutlak (~made ni) vs rentang berkelanjutan (~aida ni) dan frekuensi (~ni).',
        can_do_statement: 'Bisa menyepakati deadline pengumpulan laporan kerja shift.',
        grammar_ids: ['gn4-00011', 'gn4-00092', 'gn4-00012', 'gn4-00001'],
        l2d_contrastive_tags: ['contrastive-deadline-vs-duration'],
        vocab_keywords: ['までに', 'まで', 'あいだに', 'しめきり', 'きげん']
      },
      {
        id: 'les-n4-u05-02',
        lesson_number: 2,
        title_id: 'Momen Presisi Tindakan (Tokoro da)',
        title_jp: '局面描写（〜ところだ）',
        desc_id: 'Tiga titik waktu: tepat akan (V-ru tokoro), sedang berlangsung (V-te iru tokoro), dan baru selesai (V-ta tokoro).',
        can_do_statement: 'Bisa mengabarkan progres tugas seketika melalui radio kerja atau telepon.',
        grammar_ids: ['gn4-00013', 'gn4-00014', 'gn4-00015'],
        l2d_contrastive_tags: ['contrastive-tokoro-phases'],
        vocab_keywords: ['いま', 'ちょうど', 'ところ', 'おわる', 'はじまる']
      },
      {
        id: 'les-n4-u05-03',
        lesson_number: 3,
        title_id: 'Permulaan Spontan & Kejadian Segar',
        title_jp: '動作の開始と直後性',
        desc_id: 'Menyatakan aksi yang baru saja terjadi (~ta bakari), permulaan gradual (~hajimeru), dan spontan (~dasu).',
        can_do_statement: 'Bisa menceritakan insiden mesin yang tiba-tiba berbunyi keras.',
        grammar_ids: ['gn4-00091', 'gn4-00021', 'gn4-00022', 'gn4-00010'],
        l2d_contrastive_tags: ['contrastive-inception-inchoative'],
        vocab_keywords: ['ばかり', 'はじめる', 'だす', 'きゅうに', 'あめ']
      }
    ]
  },
  {
    unit_number: 6,
    id: 'unit-n4-06',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Persiapan Kerja & Keadaan Tertata',
    title_jp: '事前の準備と結果状態の維持',
    theme: 'Junbi & Joutai',
    icon: '📋',
    can_do_summary: 'Bisa melaporkan persiapan alat kerja dan kondisi ruangan yang tertata rapi.',
    l2d_focus_notes: 'Kontras esensial: ~te oku (persiapan masa depan) vs ~te aru (hasil tindakan yang terlihat) vs ~te iru.',
    grammar_ids: ['gn4-00017', 'gn4-00073', 'gn4-00018', 'gn4-00019'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 60).padStart(3, '0')}`),
    vocab_domains: ['pekerjaan', 'benda', 'tempat', 'keadaan'],
    vocab_keywords: ['じゅんび', 'ならべる', 'かたづける', 'おく', 'ある', 'あく', 'あける', 'つく', 'つける'],
    lessons: [
      {
        id: 'les-n4-u06-01',
        lesson_number: 1,
        title_id: 'Persiapan Kerja & Pasangan Transitif/Intransitif',
        title_jp: '事前準備（〜ておく）と自他動詞',
        desc_id: 'Melakukan tindakan persiapan demi kelancaran tugas (~te oku) dan membedakan pasangan jidoshi/tadoshi.',
        can_do_statement: 'Bisa menyiapkan materi rapat sebelum tamu bisnis tiba.',
        grammar_ids: ['gn4-00017', 'gn4-00073'],
        l2d_contrastive_tags: ['contrastive-preparatory-action', 'contrastive-transitive-intransitive-pairs'],
        vocab_keywords: ['ておく', 'じゅんび', 'あける', 'あく', 'しめる', 'しまる']
      },
      {
        id: 'les-n4-u06-02',
        lesson_number: 2,
        title_id: 'Keadaan Tertata vs Kondisi Alami',
        title_jp: '作為的結果状態（〜てある）と自然推移',
        desc_id: 'Membedakan kondisi tertata sengaja (~te aru) dan keadaan alamiah verba intransitif (~te iru).',
        can_do_statement: 'Bisa mengecek papan pengumuman kerja dan memastikan pintu darurat terkunci rapi.',
        grammar_ids: ['gn4-00018', 'gn4-00019'],
        l2d_contrastive_tags: ['contrastive-te-aru-vs-te-iru'],
        vocab_keywords: ['てある', 'ている', 'かいてある', 'はってある', 'きえる', 'つく']
      }
    ]
  },
  {
    unit_number: 7,
    id: 'unit-n4-07',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Ketuntasan, Penyesalan & Kondisi Bertahan',
    title_jp: '完了・遺憾と放置状態',
    theme: 'Kanryou & Koukai',
    icon: '📦',
    can_do_summary: 'Bisa menyampaikan permohonan maaf, rasa syukur, dan keadaan yang dibiarkan apa adanya.',
    l2d_focus_notes: 'Pola V-ta mama menyatakan kondisi yang dibiarkan tanpa pengembalian ke posisi semula.',
    grammar_ids: ['gn4-00064', 'gn4-00065', 'gn4-00020', 'gn4-00086', 'gn4-00089'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 71).padStart(3, '0')}`),
    vocab_domains: ['emosi-negatif', 'emosi-positif', 'perasaan', 'kesopanan'],
    vocab_keywords: ['すみません', 'ごめんなさい', 'よかった', 'まま', 'わすれる', 'おとす', 'こわす'],
    lessons: [
      {
        id: 'les-n4-u07-01',
        lesson_number: 1,
        title_id: 'Permohonan Maaf Santun & Syukur Emosional',
        title_jp: '謝罪・感謝と安堵の表現',
        desc_id: 'Meminta maaf atas kekhilafan tindakan (~te sumimasen) dan mengungkapkan kelegaan (~te yokatta).',
        can_do_statement: 'Bisa meminta maaf kepada atasan saat datang terlambat karena kendala kereta.',
        grammar_ids: ['gn4-00064', 'gn4-00065'],
        l2d_contrastive_tags: ['contrastive-apology-relief-framing'],
        vocab_keywords: ['すみません', 'おくれて', 'よかった', 'あんしん']
      },
      {
        id: 'les-n4-u07-02',
        lesson_number: 2,
        title_id: 'Kondisi Bertahan & Kadangkala Terjadi',
        title_jp: '放置状態（〜まま）と偶発事象',
        desc_id: 'Menyatakan kondisi dibiarkan tanpa diubah (~ta mama) dan situasi yang kadangkala terjadi (~koto ga aru).',
        can_do_statement: 'Bisa menegur rekan yang lupa mematikan sakelar AC kantor.',
        grammar_ids: ['gn4-00020', 'gn4-00086', 'gn4-00089'],
        l2d_contrastive_tags: ['contrastive-mama-unaltered-state'],
        vocab_keywords: ['まま', 'つけたまま', 'エアコン', 'ことがある']
      }
    ]
  },
  {
    unit_number: 8,
    id: 'unit-n4-08',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Relasi Bantuan & Etika Pelayanan Lanjutan',
    title_jp: '授受関係と高度な依頼表現',
    theme: 'Joju & Irai',
    icon: '🤝',
    can_do_summary: 'Bisa meminta tolong secara sopan (te-itadakemasen ka) dan menyatakan izin/keharusan fleksibel.',
    l2d_focus_notes: 'Tingkatan kesopanan permohonan: ~te kudasai -> ~te kuremasen ka -> ~te moraemasen ka -> ~te itadakemasen ka.',
    grammar_ids: ['gn4-00032', 'gn4-00033', 'gn4-00034', 'gn4-00025', 'gn4-00026'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 82).padStart(3, '0')}`),
    vocab_domains: ['hubungan', 'sopan-santun', 'pelayanan', 'sosial'],
    vocab_keywords: ['あげる', 'もらう', 'くれる', 'ほしい', 'てつだう', '案内する', 'せつめいする', 'よろしく'],
    lessons: [
      {
        id: 'les-n4-u08-01',
        lesson_number: 1,
        title_id: 'Arah Transaksi Kebaikan & Keinginan Bantuan',
        title_jp: '恩恵の授受と他者への要望',
        desc_id: 'Merinci aksi memberi/menerima bantuan (~te ageru/morau/kureru) dan harapan bantuan orang lain (~te hoshii).',
        can_do_statement: 'Bisa menawarkan bantuan kepada rekan kerja yang kewalahan mengangkat barang.',
        grammar_ids: ['gn4-00032', 'gn4-00033'],
        l2d_contrastive_tags: ['contrastive-benefactives-directionality'],
        vocab_keywords: ['あげる', 'もらう', 'くれる', 'ほしい', 'にもつ']
      },
      {
        id: 'les-n4-u08-02',
        lesson_number: 2,
        title_id: 'Permohonan Santun & Kelonggaran Izin',
        title_jp: '丁寧な依頼と許諾・不要',
        desc_id: 'Meminta tolong dengan etika bisnis (~te itadakemasen ka) dan menyatakan dispensasi (~nakutemo ii).',
        can_do_statement: 'Bisa memohon bimbingan pengisian formulir bank secara santun kepada staf loket.',
        grammar_ids: ['gn4-00034', 'gn4-00025', 'gn4-00026'],
        l2d_contrastive_tags: ['contrastive-polite-workplace-requests'],
        vocab_keywords: ['いただけませんか', 'いい', 'なくてもいい', 'しょるい', 'かく']
      }
    ]
  },
  {
    unit_number: 9,
    id: 'unit-n4-09',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Suara Pasif Langsung & Sejarah Publik',
    title_jp: '直接受身と歴史・客観的事実',
    theme: 'Ukemi & Rekishi',
    icon: '🏛️',
    can_do_summary: 'Bisa menjelaskan bangunan bersejarah, penemuan ilmiah, dan peranan dengan suara pasif objektif.',
    l2d_focus_notes: 'Pasif langsung objek mati (Kono tatemono wa 100-nen mae ni taterareta) menggunakan ~ni yotte sebagai penanda agen.',
    grammar_ids: ['gn4-00028', 'gn4-00067', 'gn4-00007', 'gn4-00008', 'gn4-00009'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 93).padStart(3, '0')}`),
    vocab_domains: ['bangunan', 'sejarah', 'budaya', 'masyarakat'],
    vocab_keywords: ['たてる', 'つくる', 'はつめいする', 'はっけんする', 'によって', 'として', 'たいして', 'むかし', 'せかい'],
    lessons: [
      {
        id: 'les-n4-u09-01',
        lesson_number: 1,
        title_id: 'Bentuk Pasif Standar & Asal Pembuatan',
        title_jp: '直接受身と素材・原料',
        desc_id: 'Konjugasi verba pasif (~rareru) dan menyatakan bahan dasar pembuatan (~kara tsukuru / ~de dekite iru).',
        can_do_statement: 'Bisa memandu rekan kerja mengenai sejarah pabrik atau bangunan budaya di kota.',
        grammar_ids: ['gn4-00028', 'gn4-00067'],
        l2d_contrastive_tags: ['contrastive-passive-inflection', 'contrastive-material-origin'],
        vocab_keywords: ['たてられる', 'つくられる', 'できる', 'き', 'いし']
      },
      {
        id: 'les-n4-u09-02',
        lesson_number: 2,
        title_id: 'Penanda Agen & Kedudukan Peran',
        title_jp: '主体（によって）・対象と資格',
        desc_id: 'Mengidentifikasi agen pencipta (~ni yotte), sasaran sikap (~ni taishite), dan peran kapasitas (~to shite).',
        can_do_statement: 'Bisa berbicara mewakili posisi peserta magang teknis dalam sambutan resmi.',
        grammar_ids: ['gn4-00007', 'gn4-00008', 'gn4-00009'],
        l2d_contrastive_tags: ['contrastive-agent-and-capacity'],
        vocab_keywords: ['によって', 'たいして', 'として', 'けんしゅうせい', '代表']
      }
    ]
  },
  {
    unit_number: 10,
    id: 'unit-n4-10',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Pasif Gangguan, Keluhan & Kekecewaan',
    title_jp: '迷惑受身と逆接・失望',
    theme: 'Meiwaku Ukemi & Fuman',
    icon: '🌧️',
    can_do_summary: 'Bisa menceritakan situasi tidak mengenakkan atau gangguan tak terduga dengan pasif penderitaan.',
    l2d_focus_notes: 'Meiwaku Ukemi (pasif gangguan): subjek terkena dampak buruk dari tindakan pihak lain (Ame ni furareta).',
    grammar_ids: ['gn4-00059', 'gn4-00060', 'gn4-00037', 'gn4-00077', 'gn4-00003'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 104).padStart(3, '0')}`),
    vocab_domains: ['emosi-negatif', 'cuaca', 'kejadian', 'perasaan'],
    vocab_keywords: ['のに', 'ところが', 'ても', 'あめ', 'ふる', 'こまる', 'たいへん', 'じこ', 'ちこく'],
    lessons: [
      {
        id: 'les-n4-u10-01',
        lesson_number: 1,
        title_id: 'Padahal vs Kenyataan Tak Terduga',
        title_jp: '不満の逆接（〜のに）と急転換',
        desc_id: 'Menyatakan rasa kecewa terhadap ekspektasi yang gagal (~noni) dan peralihan kontras mengejutkan (tokoroga).',
        can_do_statement: 'Bisa menceritakan kronologi kendala kiriman barang yang tidak kunjung tiba padahal sudah dipesan.',
        grammar_ids: ['gn4-00059', 'gn4-00060'],
        l2d_contrastive_tags: ['contrastive-noni-regret'],
        vocab_keywords: ['のに', 'ところが', 'やくそく', 'こない', 'とどかない']
      },
      {
        id: 'les-n4-u10-02',
        lesson_number: 2,
        title_id: 'Konsesi Tetap Bertahan & Konfirmasi Kejutan',
        title_jp: '譲歩条件（〜ても）と再確認',
        desc_id: 'Menyatakan tindakan yang tetap dijalankan meskipun sulit (~temo) dan konfirmasi tak terduga (~janai ka).',
        can_do_statement: 'Bisa menegaskan semangat kerja pantang menyerah meski kondisi hujan deras.',
        grammar_ids: ['gn4-00037', 'gn4-00077', 'gn4-00003'],
        l2d_contrastive_tags: ['contrastive-temo-concession'],
        vocab_keywords: ['ても', 'でも', 'じゃないか', 'がんばる', 'あめ']
      }
    ]
  },
  {
    unit_number: 11,
    id: 'unit-n4-11',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Kausatif, Izin Cuti & Keselamatan K3',
    title_jp: '使役形・許可申請と安全衛生指導',
    theme: 'Shieki & K3 Anzen',
    icon: '🦺',
    can_do_summary: 'Bisa memohon izin pulang/cuti (saseru), memahami instruksi keselamatan K3 pabrik, dan mematuhi larangan ketat.',
    l2d_focus_notes: 'Rumus permohonan izin kausatif: V-sashite kudasai / V-sashite itadakemasen ka. Bentuk perintah (Meireikei) dan larangan (Kinshikei) lazim di rambu K3.',
    grammar_ids: ['gn4-00029', 'gn4-00030', 'gn4-00023', 'gn4-00024', 'gn4-00027', 'gn4-00056', 'gn4-00057', 'gn4-00058'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 115).padStart(3, '0')}`),
    vocab_domains: ['kesehatan', 'pekerjaan', 'hukum', 'aturan'],
    vocab_keywords: ['休む', '病院', '早退', '許可', '熱', '薬', '気をつける', '安全', '危険', '注意'],
    lessons: [
      {
        id: 'les-n4-u11-01',
        lesson_number: 1,
        title_id: 'Bentuk Kausatif & Permohonan Izin Cuti',
        title_jp: '使役形と早退・休暇申請',
        desc_id: 'Menguasai bentuk kausatif (~saseru), kausatif-pasif (~saserareru), dan keharusan SOP kerja.',
        can_do_statement: 'Bisa memohon izin pulang lebih awal (soutai) kepada atasan saat sakit demam.',
        grammar_ids: ['gn4-00029', 'gn4-00030', 'gn4-00023', 'gn4-00024'],
        l2d_contrastive_tags: ['contrastive-causative-leave-request'],
        vocab_keywords: ['休ませてください', '早退', 'ねつ', '病院']
      },
      {
        id: 'les-n4-u11-02',
        lesson_number: 2,
        title_id: 'Instruksi Direktif, Perintah & Rambu K3',
        title_jp: '安全指示・命令と禁止標識',
        desc_id: 'Memahami rambu larangan keras (~te wa ikenai), bentuk perintah (Meireikei), dan larangan darurat (Kinshikei).',
        can_do_statement: 'Bisa membaca papan peringatan K3 di area konstruksi atau pabrik manufaktur.',
        grammar_ids: ['gn4-00027', 'gn4-00056', 'gn4-00057', 'gn4-00058'],
        l2d_contrastive_tags: ['contrastive-imperative-prohibition-safety'],
        vocab_keywords: ['止まれ', '入るな', 'きけん', 'ヘルメット', 'ちゅうい']
      }
    ]
  },
  {
    unit_number: 12,
    id: 'unit-n4-12',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Sistem Pengandaian 4 Serangkai (To/Tara/Ba/Nara)',
    title_jp: '条件表現（と・ば・なら・場合）',
    theme: 'Jouken & Kanousei',
    icon: '🔀',
    can_do_summary: 'Bisa memilih pola pengandaian yang tepat (to untuk otomatis, ba untuk syarat mutlak, nara untuk topik lawan bicara).',
    l2d_focus_notes: 'Empat serangkai pengandaian Jepang (To, Tara, Ba, Nara) memiliki batasan modalitas predikat pokok yang ketat.',
    grammar_ids: ['gn4-00035', 'gn4-00016', 'gn4-00036', 'gn4-00046', 'gn4-00004', 'gn4-00078', 'gn4-00079', 'gn4-00080'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 126).padStart(3, '0')}`),
    vocab_domains: ['teknologi', 'kondisi', 'percakapan', 'komunikasi'],
    vocab_keywords: ['なら', '場合', 'おす', 'うごく', 'とまる', 'ボタン', 'みち', 'まがる', 'こうさてん'],
    lessons: [
      {
        id: 'les-n4-u12-01',
        lesson_number: 1,
        title_id: 'Kondisi Kasus Khusus & Asalkan Syarat',
        title_jp: '条件（なら・場合）と最低条件',
        desc_id: 'Menganalisis pengandaian berbasis topik (~nara), kontingensi darurat (~baai wa), dan syarat minimal (~sae ~ba).',
        can_do_statement: 'Bisa memberikan petunjuk jika terjadi gempa bumi atau keadaan darurat di tempat kerja.',
        grammar_ids: ['gn4-00035', 'gn4-00016', 'gn4-00036', 'gn4-00046', 'gn4-00004'],
        l2d_contrastive_tags: ['contrastive-conditional-nara-baai'],
        vocab_keywords: ['なら', 'ばあい', 'さえ', 'じしん', 'ひなん']
      },
      {
        id: 'les-n4-u12-02',
        lesson_number: 2,
        title_id: 'Partikel Monolog Batin & Nada Keraguan',
        title_jp: '終助詞と独り言（かな・なあ・かい）',
        desc_id: 'Menggunakan partikel akhir afektif untuk monolog batin (~ka na, ~kashira, ~naa) dan pertanyaan akrab (~kai).',
        can_do_statement: 'Bisa mengekspresikan keraguan wajar secara santun saat berdiskusi bersama teman.',
        grammar_ids: ['gn4-00078', 'gn4-00079', 'gn4-00080'],
        l2d_contrastive_tags: ['contrastive-affective-final-particles'],
        vocab_keywords: ['かな', 'かしら', 'なあ', 'かい', 'だいじょうぶ']
      }
    ]
  },
  {
    unit_number: 13,
    id: 'unit-n4-13',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Sebab-Akibat, Dampak & Hubungan Berantai',
    title_jp: '原因・理由と因果関係の接続',
    theme: 'Inka Kankei & Renkan',
    icon: '🔗',
    can_do_summary: 'Bisa menjelaskan rantai sebab-akibat insiden kerja dan penambahan argumen logis.',
    l2d_focus_notes: 'Menyambung klausa sebab dengan te-form verba/kata sifat atau partikel konektif sorede/dakara.',
    grammar_ids: ['gn4-00061', 'gn4-00062', 'gn4-00063', 'gn4-00081', 'gn4-00088'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 137).padStart(3, '0')}`),
    vocab_domains: ['bisnis', 'ekonomi', 'organisasi', 'masyarakat'],
    vocab_keywords: ['それで', 'それに', 'て', 'で', 'ため', 'りゆう', 'げんいん', 'じこ', 'たいふう', 'えいきょう'],
    lessons: [
      {
        id: 'les-n4-u13-01',
        lesson_number: 1,
        title_id: 'Konektor Logis Sebab & Penambahan Argumen',
        title_jp: '接続詞による因果と付加',
        desc_id: 'Menyusun argumen menggunakan penyambung antarkalimat (sore de, dakara) dan penambahan (sore ni, sono ue).',
        can_do_statement: 'Bisa memaparkan faktor keterlambatan pengiriman bahan baku secara sistematis.',
        grammar_ids: ['gn4-00061', 'gn4-00062'],
        l2d_contrastive_tags: ['contrastive-discourse-connectors'],
        vocab_keywords: ['それで', 'だから', 'それに', 'そのうえ', 'たいふう']
      },
      {
        id: 'les-n4-u13-02',
        lesson_number: 2,
        title_id: 'Sebab Objektif & Bukan Hanya Satu Faktor',
        title_jp: '客観的要因と複合理由',
        desc_id: 'Menghubungkan klausa kausalitas (~te / ~de sebab, ~tame ni objektif) dan penekanan majemuk (~dakedenaku ~mo).',
        can_do_statement: 'Bisa membuat laporan kecelakaan kerja sederhana dengan rincian sebab-akibat.',
        grammar_ids: ['gn4-00063', 'gn4-00081', 'gn4-00088'],
        l2d_contrastive_tags: ['contrastive-objective-causality'],
        vocab_keywords: ['て', 'ため', 'だけでなく', 'げんいん', 'えいきょう']
      }
    ]
  },
  {
    unit_number: 14,
    id: 'unit-n4-14',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Dugaan, Bukti Sensorik & Laporan Kabar',
    title_jp: '様態・伝聞・推量と証拠性',
    theme: 'Suiryou & Denbun',
    icon: '🔍',
    can_do_summary: 'Bisa membedakan bukti visual langsung (sou da) vs simpati situasi (you da/mitai da) vs kabar angin/berita (denbun sou da/rashii).',
    l2d_focus_notes: 'Pembedaan krusial: Ame ga furi-sou (kelihatannya akan hujan - visual) vs Ame ga furu-sou (katanya akan hujan - kabar).',
    grammar_ids: ['gn4-00053', 'gn4-00087', 'gn4-00054', 'gn4-00082', 'gn4-00085', 'gn4-00055'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 148).padStart(3, '0')}`),
    vocab_domains: ['cuaca', 'berita', 'informasi', 'penampilan'],
    vocab_keywords: ['そうだ', 'ようだ', 'らしい', 'てんきよほう', 'あめ', 'ニュース', 'うわさ', 'きく'],
    lessons: [
      {
        id: 'les-n4-u14-01',
        lesson_number: 1,
        title_id: 'Penampilan Visual vs Laporan Kabar (Sou da)',
        title_jp: '様態のそうだ vs 伝聞のそうだ',
        desc_id: 'Membedakan konstruksi visual stem+sou da (kelihatannya) vs bentuk kamus+sou da (katanya).',
        can_do_statement: 'Bisa memperingatkan rekan bahwa tali derek tampak akan putus.',
        grammar_ids: ['gn4-00053', 'gn4-00087'],
        l2d_contrastive_tags: ['contrastive-sou-da-visual-vs-hearsay'],
        vocab_keywords: ['ふりそう', 'ふるそうだ', 'てんきよほう', 'きれる']
      },
      {
        id: 'les-n4-u14-02',
        lesson_number: 2,
        title_id: 'Inferensi Sensorik, Karakteristik & Dugaan',
        title_jp: '状況推量（ようだ・らしい）と不確実性',
        desc_id: 'Menguasai inferensi bukti konkrit (~you da / ~mitai da), kabar khas (~rashii), dan perkiraan (~deshou).',
        can_do_statement: 'Bisa menyimpulkan anomali suhu ruang pendingin berdasarkan tetesan es.',
        grammar_ids: ['gn4-00054', 'gn4-00082', 'gn4-00085', 'gn4-00055'],
        l2d_contrastive_tags: ['contrastive-evidentiality-hierarchy'],
        vocab_keywords: ['ようだ', 'みたい', 'らしい', 'でしょう', 'おんど']
      }
    ]
  },
  {
    unit_number: 15,
    id: 'unit-n4-15',
    level: 'n4',
    pt_stage: 3,
    title_id: 'Kepastian Logis, Embedded Questions & Keigo',
    title_jp: '確信・間接疑問と職場敬語の基礎',
    theme: 'Kakushin & Keigo Kiso',
    icon: '👔',
    can_do_summary: 'Bisa menyimpulkan kepastian logis (hazu da), menanamkan pertanyaan dalam kalimat (ka dou ka), dan menggunakan fondasi kesantunan kerja.',
    l2d_focus_notes: 'Pola ~n desu memberi nuansa penjelasan empati. Embedded questions (~ka dou ka) esensial untuk koordinasi operasional.',
    grammar_ids: ['gn4-00083', 'gn4-00084', 'gn4-00049', 'gn4-00050', 'gn4-00047', 'gn4-00048', 'gn4-00051', 'gn4-00052', 'gn4-00006'],
    kanji_ids: Array.from({ length: 11 }, (_, i) => `kj-n4-${String(i + 159).padStart(3, '0')}`),
    vocab_domains: ['keigo', 'formal', 'bisnis', 'pekerjaan'],
    vocab_keywords: ['はず', 'かどうか', 'について', 'んです', 'こと', 'の', 'いらっしゃる', 'まいる', '申す', 'いただく'],
    lessons: [
      {
        id: 'les-n4-u15-01',
        lesson_number: 1,
        title_id: 'Kepastian Logis & Mustahil (Hazu da)',
        title_jp: '論理的確信（〜はずだ・はずがない）',
        desc_id: 'Menyatakan keyakinan deduktif berbasis bukti (~hazu da) dan negasi mutlak (~hazu ga nai).',
        can_do_statement: 'Bisa memastikan bahwa suku cadang cadangan seharusnya sudah tersimpan di gudang.',
        grammar_ids: ['gn4-00083', 'gn4-00084'],
        l2d_contrastive_tags: ['contrastive-logical-necessity-hazu'],
        vocab_keywords: ['はず', 'はずがない', 'とどく', 'そうこ', 'ある']
      },
      {
        id: 'les-n4-u15-02',
        lesson_number: 2,
        title_id: 'Pertanyaan Tertanam & Koordinasi Operasional',
        title_jp: '間接疑問（〜かどうか・疑問詞〜か）',
        desc_id: 'Menyematkan pertanyaan ya/tidak (~ka dou ka) dan pertanyaan berkata tanya (gimonshi ~ka) dalam kalimat inti.',
        can_do_statement: 'Bisa mengonfirmasi apakah klien bisnis jadi berkunjung atau tidak besok pagi.',
        grammar_ids: ['gn4-00049', 'gn4-00050', 'gn4-00047'],
        l2d_contrastive_tags: ['contrastive-embedded-questions'],
        vocab_keywords: ['かどうか', 'どこか', 'いつか', 'かくにん', 'しらべる']
      },
      {
        id: 'les-n4-u15-03',
        lesson_number: 3,
        title_id: 'Penjelasan Halus, Nominalisasi & Fondasi Keigo',
        title_jp: '説明調（〜んです）・名詞化と職場敬語',
        desc_id: 'Menjelaskan alasan secara halus (~n desu), nominalisasi (~no / ~koto), perihal (~ni tsuite), dan kesantunan kantor.',
        can_do_statement: 'Bisa menyapa tamu kantor dengan sopan dan menjelaskan agenda rapat perwakilan perusahaan.',
        grammar_ids: ['gn4-00048', 'gn4-00051', 'gn4-00052', 'gn4-00006'],
        l2d_contrastive_tags: ['contrastive-explanatory-n-desu', 'contrastive-workplace-honorifics'],
        vocab_keywords: ['んです', 'こと', 'の', 'について', 'いらっしゃる', 'まいる']
      }
    ]
  }
];

// ── Smart Semantic Partitioning: 100% Zero Orphan Vocab for N4 ──
function getAffinityN4(v) {
  const d = v.domain || [];
  const p = v.pos || '';
  const m = (v.meaning_id || '').toLowerCase();
  const w = v.word || '';
  const r = v.reading || '';

  // U15: Keigo & Formal
  if (d.includes('keigo') || d.includes('formal') || m.includes('hormat') || m.includes('merendah') || m.includes('sopan')) return 14;
  // U11: K3 & Kesehatan, Aturan
  if (d.includes('kesehatan') || d.includes('hukum') || d.includes('aturan') || m.includes('sakit') || m.includes('bahaya') || m.includes('obat')) return 10;
  // U14: Cuaca & Berita, Informasi
  if (d.includes('cuaca') || d.includes('berita') || d.includes('informasi') || d.includes('penampilan') || m.includes('hujan') || m.includes('angin')) return 13;
  // U9: Sejarah, Budaya, Bangunan
  if (d.includes('sejarah') || d.includes('budaya') || d.includes('bangunan') || d.includes('seni-budaya')) return 8;
  // U13: Bisnis, Ekonomi, Organisasi
  if (d.includes('bisnis') || d.includes('ekonomi') || d.includes('organisasi') || d.includes('ekonomi-keuangan')) return 12;
  // U5: Waktu, Tenggat
  if (d.includes('waktu') || d.includes('frekuensi') || m.includes('pukul') || m.includes('hari') || m.includes('minggu')) return 4;
  // U6: Persiapan, Tempat, Benda
  if (d.includes('tempat') || d.includes('benda') || d.includes('keadaan') || d.includes('dapur')) return 5;
  // U8: Hubungan, Pelayanan, Keluarga
  if (d.includes('hubungan') || d.includes('keluarga') || d.includes('pelayanan') || d.includes('sopan-santun')) return 7;
  // U10: Emosi negatif, keluhan
  if (d.includes('emosi-negatif') || m.includes('kecewa') || m.includes('susah') || m.includes('rusak')) return 9;
  // U7: Perasaan, emosi positif
  if (d.includes('emosi-positif') || d.includes('perasaan') || d.includes('emosi')) return 6;
  // U4: Kemudahan, Ukuran, Alat
  if (d.includes('kemudahan') || d.includes('alat') || d.includes('jumlah') || d.includes('kuantitas')) return 3;
  // U3: Kemampuan, Potensial, Perubahan
  if (d.includes('kemampuan') || d.includes('perubahan') || m.includes('bisa') || m.includes('mampu')) return 2;
  // U2: Evaluasi, Derajat, Kualitas
  if (d.includes('evaluasi') || d.includes('derajat') || d.includes('kualitas') || p === 'i-adj' || p === 'na-adj') return 1;
  // U1: Rencana, Usaha, Pikiran
  if (d.includes('rencana') || d.includes('pikiran') || d.includes('usaha') || d.includes('pendidikan')) return 0;
  // U12: Teknologi, Komunikasi
  if (d.includes('teknologi') || d.includes('komunikasi') || d.includes('bahasa-komunikasi')) return 11;

  // Verbs distribution across verb-focused units: U1, U3, U5, U6, U7, U8, U9, U10, U11, U12, U13
  if (p.startsWith('verb')) {
    const code = (w.charCodeAt(0) || 0) + (r.charCodeAt(0) || 0);
    const verbUnits = [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return verbUnits[code % verbUnits.length];
  }

  // Generic nouns & others
  const nounUnits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const code = (w.charCodeAt(0) || 0) + (r.charCodeAt(0) || 0);
  return nounUnits[code % nounUnits.length];
}

const unitAssignedVocabN4 = Array.from({ length: 15 }, () => []);
vocabN4.forEach(v => {
  const uIdx = getAffinityN4(v);
  unitAssignedVocabN4[uIdx].push(v.id);
});

// Build fully populated N4 units and lessons
const fullUnitsN4 = n4UnitDefinitions.map((u, uIdx) => {
  const unitVocabList = unitAssignedVocabN4[uIdx] || [];
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
      estimated_minutes: 20
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

// Master Curriculum N4 Object
const curriculumTrackN4 = {
  meta: {
    track_id: 'curriculum-n4',
    level: 'n4',
    title: 'Kurikulum Original Nugget Nihongo · N4',
    title_id: 'Jalur Mandiri N4 (Kurikulum Nugget)',
    version: '2.0.0',
    total_units: fullUnitsN4.length,
    total_lessons: fullUnitsN4.reduce((acc, u) => acc + u.lessons.length, 0),
    total_grammar_points: grammarN4.length,
    total_kanji_count: kanjiN4.length,
    total_vocab_points: vocabN4.length,
    total_vocab_bank_count: vocabN4.length,
    authoritative: true
  },
  id: 'trk-nugget-n4',
  name: 'Kurikulum Original Nugget Nihongo · N4',
  name_id: 'Jalur Mandiri N4 (Kurikulum Nugget)',
  level: 'n4',
  tagline: 'Jalur Mandiri Menengah Bawah (N4) — Standar Emas Penguasaan Dunia Kerja & Magang Jepang.',
  desc: 'Jalur belajar bertahap 15 unit lengkap mencakup 92 pola tata bahasa, 169 kanji, dan 1.286 kosakata JLPT N4 terpetakan penuh.',
  total_units: fullUnitsN4.length,
  total_grammar_count: grammarN4.length,
  units: fullUnitsN4
};

// Write JSON
const jsonPath = path.join(outDir, 'curriculum-n4.json');
fs.writeFileSync(jsonPath, JSON.stringify(curriculumTrackN4, null, 2), 'utf8');

// Write JS
const jsPath = path.join(outDir, 'curriculum-n4.js');
const jsContent = `// ══════════════════════════════════════════════════════════════
//  curriculum-n4.js — Nugget Nihongo Original Curriculum N4
//  Auto-generated by scripts/build-curriculum-n4.js
// ══════════════════════════════════════════════════════════════

window.curriculumN4 = ${JSON.stringify(curriculumTrackN4, null, 2)};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { curriculumN4: window.curriculumN4 };
}
`;
fs.writeFileSync(jsPath, jsContent, 'utf8');

console.log(`✅ Curriculum N4 successfully built!`);
console.log(`   - Units: ${fullUnitsN4.length}`);
console.log(`   - Lessons: ${fullUnitsN4.reduce((acc, u) => acc + u.lessons.length, 0)}`);
console.log(`   - Grammar points mapped: ${fullUnitsN4.reduce((acc, u) => acc + u.grammar_ids.length, 0)} / ${grammarN4.length}`);
console.log(`   - Kanji mapped: ${fullUnitsN4.reduce((acc, u) => acc + u.kanji_ids.length, 0)} / ${kanjiN4.length}`);
console.log(`   - Vocab mapped: ${fullUnitsN4.reduce((acc, u) => acc + u.vocab_ids.length, 0)} / ${vocabN4.length}`);
console.log(`   - Output: ${jsonPath}`);
