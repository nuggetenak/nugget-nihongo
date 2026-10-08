// ──────────────────────────────────────────────────────────────
//  n2-tense-aspect.js — Nugget Nihongo · JLPT N2 Grammar
//  42 entries | Category: tense-aspect
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN2_Tense_Aspect = [

{
    id: 'gn2-00003', level: 'n2', pattern: '〜に際して', reading: '〜ni saishite',
    meaning: 'pada saat ... / ketika (momen penting) ...',
    cat: 'sequential-temporal',
    connection: 'V-dict / N + に際して',
    desc: '<b>〜に際して</b> digunakan untuk momen penting atau formal seperti upacara, awal kegiatan, atau situasi khusus.',
    examples: [
      { jp: '入学<b>に際して</b>、学長が挨拶をした。', id: 'Pada saat masuk sekolah, rektor memberikan sambutan.' },
      { jp: '契約<b>に際して</b>、注意事項をよく読んでください。', id: 'Pada saat kontrak, bacalah dengan teliti hal-hal yang perlu diperhatikan.' },
    ],
    nuance: null,
    confusion_pairs: ['gn2-00004'],
    see_also_grammar: ['gn2-00004'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00004', level: 'n2', pattern: '〜にあたって', reading: '〜ni atatte',
    meaning: 'pada saat ... / dalam rangka ...',
    cat: 'sequential-temporal',
    connection: 'V-dict / N + にあたって',
    desc: '<b>〜にあたって</b> hampir sama dengan に際して tetapi lebih menekankan persiapan atau tindakan menjelang suatu momen.',
    examples: [
      { jp: '旅行<b>にあたって</b>、保険に加入した。', id: 'Dalam rangka perjalanan, saya mengambil asuransi.' },
      { jp: '発表<b>にあたって</b>、資料をまとめた。', id: 'Menjelang presentasi, saya menyusun bahan-bahan.' },
    ],
    nuance: null,
    confusion_pairs: ['gn1-00194', 'gn2-00106', 'gn2-00003', 'gn2-00132', 'gn2-00133', 'gn2-00039', 'gn1-00094', 'gn1-00199'],
    see_also_grammar: ['gn2-00003'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00005', level: 'n2', pattern: '〜に伴って', reading: '〜ni tomonatte',
    meaning: 'seiring dengan ... / bersamaan dengan ...',
    cat: 'sequential-temporal',
    connection: 'V-dict / N + に伴って',
    desc: '<b>〜に伴って</b> menyatakan bahwa dua perubahan terjadi secara bersamaan dan saling berkaitan.',
    examples: [
      { jp: '経済の発展<b>に伴って</b>、生活水準が上がった。', id: 'Seiring perkembangan ekonomi, taraf hidup meningkat.' },
      { jp: '年齢<b>に伴って</b>、体力が落ちる。', id: 'Seiring bertambahnya usia, stamina menurun.' },
    ],
    nuance: null,
    confusion_pairs: ['gn2-00193', 'gn3-00146', 'gn2-00277', 'gn3-00145', 'gn2-00041', 'gn2-00211'],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00023', level: 'n2', pattern: '〜ものだ', reading: '〜mono da',
    meaning: '(1) memang seharusnya ... (2) dulu sering ...',
    cat: 'progressive-state',
    connection: 'V-dict / V-ない + ものだ',
    desc: '<b>〜ものだ</b>: (1) mengungkapkan kebenaran umum atau norma; (2) mengenang kebiasaan di masa lalu.',
    examples: [
      { jp: '人は誰でも間違える<b>ものだ</b>。', id: 'Memang sudah sewajarnya manusia berbuat salah.' },
      { jp: '子供の頃、よくここで遊んだ<b>ものだ</b>。', id: 'Waktu kecil, saya dulu sering bermain di sini.' },
    ],
    nuance: null,
    confusion_pairs: ['gn3-00073', 'gn3-00175'],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00041', level: 'n2', pattern: '〜に従って / 〜に従い', reading: '〜ni shitagatte / 〜ni shitagai',
  meaning: 'sesuai dengan ... / mengikuti ... / seiring ...',
  cat: 'sequential-temporal',
  connection: 'V-dict / N + に従って / に従い',
  desc: '<b>〜に従って</b> memiliki dua makna: (1) mengikuti aturan, instruksi, atau otoritas tertentu; (2) seiring perubahan A, B pun ikut berubah secara proporsional.',
  nuance: null,
  examples: [
    { jp: '規則<b>に従って</b>行動してください。', id: 'Mohon bertindak sesuai dengan peraturan.' },
    { jp: '時代<b>に従って</b>、働き方も変わった。', id: 'Seiring perkembangan zaman, cara bekerja pun berubah.' },
    { jp: '医師の指示<b>に従い</b>、薬を飲んでいます。', id: 'Saya minum obat mengikuti petunjuk dokter.' }
  ],
  see_also_grammar: ['gn2-00042'], see_also_vocab: [],
  confusion_pairs: ['gn2-00005', 'gn3-00146'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00095',
  level: 'n2',
  pattern: '〜を皮切りに',
  reading: '〜wo kawakiri ni',
  meaning: 'diawali dengan ... / dimulai dari ... (sebagai pembuka serangkaian)',
  cat: 'inception-continuation',
  connection: 'N + を皮切りに / を皮切りとして',
  desc: '<b>〜を皮切りに</b> menyatakan bahwa X menjadi titik awal atau pembuka dari serangkaian kejadian atau tindakan yang menyusul setelahnya.',
  nuance: null,
  examples: [
    { jp: '東京<b>を皮切りに</b>、全国ツアーが幕を開けた。', id: 'Dimulai dari Tokyo, tur nasional pun resmi dimulai.' },
    { jp: 'この商品のヒット<b>を皮切りに</b>、次々と新製品が発売された。', id: 'Dimulai dari keberhasilan produk ini, produk-produk baru pun bermunculan satu per satu.' }
  ],
  see_also_grammar: ['gn2-00107', 'gn2-00108'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00025', 'gn2-00192'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00102',
  level: 'n2',
  pattern: '〜にそって / 〜に沿って',
  reading: '〜ni sotte',
  meaning: 'mengikuti / selaras dengan / sepanjang ...',
  cat: 'sequential-temporal',
  connection: 'N + に沿って / に沿った (+ N)',
  desc: '<b>〜に沿って</b> menyatakan bahwa sesuatu dilakukan mengikuti jalur, rencana, pedoman, atau arah yang disebutkan. Bisa bermakna literal (mengikuti jalan/sungai) maupun figuratif (mengikuti rencana).',
  nuance: null,
  examples: [
    { jp: '川<b>に沿って</b>歩いていくと、古い橋が見えてきます。', id: 'Jika berjalan mengikuti sungai, Anda akan melihat sebuah jembatan tua.' },
    { jp: '計画<b>に沿って</b>プロジェクトを進めてください。', id: 'Tolong jalankan proyek sesuai dengan rencana yang telah dibuat.' }
  ],
  see_also_grammar: ['gn2-00103', 'gn2-00101'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00277', 'gn1-00167'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00106',
  level: 'n2',
  pattern: '〜に先立って',
  reading: '〜ni sakidatte',
  meaning: 'sebelum ... / mendahului ... / sebagai persiapan menjelang ...',
  cat: 'sequential-temporal',
  connection: 'N / V-dict + に先立って / に先立ち',
  desc: '<b>〜に先立って</b> menyatakan bahwa suatu tindakan atau persiapan dilakukan sebelum kejadian besar atau penting yang disebutkan.',
  nuance: null,
  examples: [
    { jp: '式典<b>に先立って</b>、リハーサルが行われた。', id: 'Sebelum upacara, gladi resik pun dilaksanakan.' },
    { jp: '製品発売<b>に先立ち</b>、プレスリリースが配布された。', id: 'Mendahului peluncuran produk, siaran pers telah dibagikan.' }
  ],
  see_also_grammar: ['gn2-00107'],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00054', 'gn1-00194', 'gn2-00191', 'gn2-00004'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00107',
  level: 'n2',
  pattern: '〜を契機に',
  reading: '〜wo keiki ni',
  meaning: 'menjadikan ... sebagai momentum / berawal dari ... (sebagai titik balik penting)',
  cat: 'inception-continuation',
  connection: 'N + を契機に / を契機として',
  desc: '<b>〜を契機に</b> menyatakan bahwa peristiwa X menjadi momentum atau titik balik yang mendorong perubahan atau tindakan signifikan sesudahnya.',
  nuance: null,
  examples: [
    { jp: 'その事故<b>を契機に</b>、安全規制が大幅に強化された。', id: 'Berawal dari kecelakaan itu, regulasi keselamatan pun diperkuat secara signifikan.' },
    { jp: '転職<b>を契機に</b>、生き方そのものを見直した。', id: 'Menjadikan pergantian pekerjaan sebagai momentum, aku menata ulang cara hidupku.' }
  ],
  see_also_grammar: ['gn2-00108', 'gn2-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00192', 'gn1-00039', 'gn2-00108', 'gn1-00041'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00108',
  level: 'n2',
  pattern: '〜をきっかけに',
  reading: '〜wo kikkake ni',
  meaning: 'karena dipicu oleh ... / berawal dari ... / gara-gara ...',
  cat: 'inception-continuation',
  connection: 'N / V-plain + のをきっかけに',
  desc: '<b>〜をきっかけに</b> menyatakan bahwa X menjadi pemicu atau awal mula dari suatu perubahan atau tindakan. Lebih kasual dan personal dibanding を契機に.',
  nuance: null,
  examples: [
    { jp: '旅行<b>をきっかけに</b>、写真に深く興味を持つようになった。', id: 'Berawal dari perjalanan itu, aku jadi sangat tertarik dengan fotografi.' },
    { jp: '彼女に出会った<b>のをきっかけに</b>、日本語の勉強を始めた。', id: 'Dipicu oleh pertemuan dengannya, aku mulai belajar bahasa Jepang.' }
  ],
  see_also_grammar: ['gn2-00107', 'gn2-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107', 'gn1-00045'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00123', level: 'n2', pattern: '〜ものを',
  reading: '〜mono o',
  meaning: 'padahal kalau saja ... (penyesalan yang tertahan)',
  cat: 'completion-regret',
  connection: 'V-plain / Adj-plain + ものを',
  desc: '<b>〜ものを</b> mengungkapkan penyesalan — situasi yang disesalkan seharusnya bisa dihindari jika kondisi tertentu terpenuhi. Sering digunakan di akhir kalimat.',
  nuance: null,
  examples: [
    { jp: '早く言えばよかった<b>ものを</b>。', id: 'Padahal kalau saja bilang lebih awal...' },
    { jp: '少し待てばよかった<b>ものを</b>、なぜそんなに急いだのか。', id: 'Padahal kalau sabar sebentar saja — mengapa tergesa-gesa begitu?' }
  ],
  see_also_grammar: ['gn2-00124', 'gn2-00125'], see_also_vocab: [],
  confusion_pairs: ['gn2-00238', 'gn3-00163'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00131', level: 'n2', pattern: '〜を契機に',
  reading: '〜wo keiki ni',
  meaning: 'menjadikan ... sebagai titik balik / kesempatan untuk berubah',
  cat: 'inception-continuation',
  connection: 'N + を契機に / V-plain + のを契機に',
  desc: '<b>〜を契機に</b> menyatakan bahwa suatu peristiwa menjadi pemicu atau titik balik yang mendorong perubahan besar atau tindakan baru. Biasanya digunakan untuk momen penting dalam hidup atau organisasi.',
  nuance: null,
  examples: [
    { jp: '転職<b>を契機に</b>、生活スタイルを一新した。', id: 'Menjadikan pergantian kerja sebagai titik balik, ia merombak total gaya hidupnya.' },
    { jp: '震災<b>を契機に</b>、地域の防災意識が高まった。', id: 'Bencana gempa menjadi titik balik meningkatnya kesadaran mitigasi bencana di masyarakat.' },
    { jp: '留学<b>を契機に</b>、将来は国際的な仕事をしたいと思うようになった。', id: 'Pengalaman belajar di luar negeri menjadi kesempatan baginya untuk mulai bercita-cita berkarier di bidang internasional.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00192'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00132', level: 'n2', pattern: '〜に先立って',
  reading: '〜ni sakidatte',
  meaning: 'sebelum ..., sebagai langkah pendahuluan sebelum ...',
  cat: 'sequential-temporal',
  connection: 'N + に先立って / V-dictionary + に先立って',
  desc: '<b>〜に先立って</b> menyatakan bahwa suatu tindakan dilakukan terlebih dahulu sebagai persiapan atau langkah awal sebelum peristiwa utama. Digunakan dalam konteks formal seperti upacara, proyek, atau pengumuman resmi.',
  nuance: null,
  examples: [
    { jp: '式典<b>に先立って</b>、主催者から挨拶がありました。', id: 'Sebelum upacara dimulai, ada sambutan dari penyelenggara.' },
    { jp: '工事<b>に先立って</b>、住民への説明会が開かれた。', id: 'Sebagai langkah pendahuluan sebelum konstruksi, diadakan sesi penjelasan bagi warga.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00054', 'gn2-00004'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00133', level: 'n2', pattern: '〜に際して',
  reading: '〜ni saishite',
  meaning: 'saat ..., dalam rangka ..., pada kesempatan ...',
  cat: 'sequential-temporal',
  connection: 'N + に際して / V-dictionary + に際して',
  desc: '<b>〜に際して</b> menandai momen penting atau situasi khusus sebagai konteks untuk suatu tindakan. Digunakan saat memperkenalkan hal yang dilakukan atau diperhatikan pada suatu peristiwa penting.',
  nuance: null,
  examples: [
    { jp: '入社<b>に際して</b>、いくつかの書類を提出してください。', id: 'Dalam rangka masuk kerja, harap serahkan beberapa dokumen berikut.' },
    { jp: '試験<b>に際して</b>、携帯電話の電源をお切りください。', id: 'Saat ujian berlangsung, mohon matikan telepon genggam Anda.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00004'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00144', level: 'n2', pattern: '〜たびに',
  reading: '〜tabi ni',
  meaning: 'setiap kali ..., tiap kali ... (terjadi)',
  cat: 'sequential-temporal',
  connection: 'V-dictionary + たびに / N + のたびに',
  desc: '<b>〜たびに</b> menyatakan bahwa setiap kali suatu peristiwa atau tindakan terjadi, konsekuensi atau reaksi tertentu selalu mengikutinya. Menekankan pola berulang yang terpicu oleh suatu aksi.',
  nuance: null,
  examples: [
    { jp: '故郷に帰る<b>たびに</b>、昔のことを思い出す。', id: 'Setiap kali pulang ke kampung halaman, ia selalu teringat masa lalu.' },
    { jp: '試験<b>のたびに</b>、緊張してしまう。', id: 'Setiap kali ada ujian, ia selalu gugup.' }
  ],
  see_also_grammar: ['gn2-00145'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00145', 'gn2-00146', 'gn4-00005', 'gn1-00027'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00145', level: 'n2', pattern: '〜ごとに',
  reading: '〜goto ni',
  meaning: 'setiap ..., per ..., dengan interval teratur ...',
  cat: 'sequential-temporal',
  connection: 'N(waktu/jumlah) + ごとに / V-dictionary + ごとに',
  desc: '<b>〜ごとに</b> menyatakan interval waktu atau satuan yang teratur, atau bahwa setiap unit/individu memiliki kondisi yang berbeda. Digunakan untuk keteraturan atau distribusi.',
  nuance: null,
  examples: [
    { jp: '薬は6時間<b>ごとに</b>飲んでください。', id: 'Minumlah obat ini setiap 6 jam sekali.' },
    { jp: '人<b>ごとに</b>、価値観が異なる。', id: 'Setiap orang memiliki nilai-nilai hidup yang berbeda-beda.' }
  ],
  see_also_grammar: ['gn2-00144'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00144', 'gn4-00001'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00146', level: 'n2', pattern: '〜につけ',
  reading: '〜ni tsuke',
  meaning: 'setiap kali ..., entah ... maupun ... (selalu menimbulkan perasaan tertentu)',
  cat: 'sequential-temporal',
  connection: 'V-dictionary + につけ / い-Adj(stem) + につけ / 〜につけ〜につけ',
  desc: '<b>〜につけ</b> menyatakan bahwa setiap kali suatu situasi terjadi, selalu timbul perasaan atau reaksi tertentu. Sering digunakan dalam pola berpasangan (いいにつけ悪いにつけ) untuk menyatakan "bagaimanapun kondisinya".',
  nuance: null,
  examples: [
    { jp: '故郷の写真を見る<b>につけ</b>、両親のことが恋しくなる。', id: 'Setiap kali melihat foto kampung halaman, ia selalu rindu pada orang tuanya.' },
    { jp: 'いいに<b>つけ</b>悪いに<b>つけ</b>、彼女のことが気になる。', id: 'Entah dalam kondisi baik maupun buruk, ia selalu memikirkan perempuan itu.' }
  ],
  see_also_grammar: ['gn2-00144'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00144', 'gn3-00146'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00191',
  level: 'n2',
  pattern: '〜に先がけて',
  reading: '~ni sakigakete',
  meaning: 'mendahului ..., sebelum orang lain ...',
  cat: 'sequential-temporal',
  connection: 'N + に先がけて',
  desc: '<b>〜に先がけて</b> menyatakan bahwa seseorang atau suatu pihak melakukan sesuatu lebih awal dari orang lain atau sebelum suatu peristiwa terjadi, seringkali dengan nuansa menjadi yang pertama atau memelopori. Digunakan untuk menggambarkan tindakan yang bersifat inisiatif atau pionir.',
  nuance: null,
  examples: [
    { jp: '他社<b>に先がけて</b>、新製品を市場に投入した。', id: 'Mendahului perusahaan lain, mereka meluncurkan produk baru ke pasar.' },
    { jp: '世界<b>に先がけて</b>、日本がその技術を開発した。', id: 'Mendahului dunia, Jepang mengembangkan teknologi tersebut.' },
    { jp: '開会式<b>に先がけて</b>、リハーサルが行われた。', id: 'Mendahului upacara pembukaan, diadakan gladi resik.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00106'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00193',
  level: 'n2',
  pattern: '〜とともに',
  reading: '~to tomo ni',
  meaning: 'bersamaan dengan ..., seiring ...',
  cat: 'sequential-temporal',
  connection: 'N + とともに / V-plain + とともに',
  desc: '<b>〜とともに</b> memiliki dua fungsi: (1) "bersama dengan" — menyatakan bahwa dua hal atau pihak terlibat secara bersamaan; (2) "seiring dengan" — menyatakan perubahan yang terjadi secara paralel. Dalam makna kedua, digunakan untuk menggambarkan dua hal yang berkembang atau berubah secara sejajar.',
  nuance: null,
  examples: [
    { jp: '年齢を重ねる<b>とともに</b>、視野が広がった。', id: 'Seiring bertambahnya usia, wawasan pun semakin luas.' },
    { jp: '彼女は仲間<b>とともに</b>、プロジェクトを成功させた。', id: 'Dia berhasil menyelesaikan proyek bersama timnya.' },
    { jp: '社会が変化する<b>とともに</b>、価値観も変わってきた。', id: 'Seiring perubahan masyarakat, nilai-nilai pun ikut berubah.' },
  ],
  see_also_grammar: ['gn2-00194', 'gn2-00211'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00005', 'gn3-00146', 'gn3-00147', 'gn2-00194', 'gn2-00211'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00194',
  level: 'n2',
  pattern: '〜にともなって',
  reading: '~ni tomonatte',
  meaning: 'seiring dengan ..., bersamaan dengan (perubahan)',
  cat: 'sequential-temporal',
  connection: 'N + にともなって / V-plain + にともなって / にともなう + N',
  desc: '<b>〜にともなって</b> menyatakan bahwa suatu perubahan atau peristiwa membawa serta perubahan lain secara bersamaan — perubahan yang satu memicu atau disertai perubahan yang lain. Pola ini lebih formal dibandingkan 〜とともに dan sering digunakan dalam teks berita, laporan, atau akademis.',
  nuance: null,
  examples: [
    { jp: '少子化<b>にともなって</b>、学校の数が減った。', id: 'Seiring dengan penurunan angka kelahiran, jumlah sekolah pun berkurang.' },
    { jp: '経済成長<b>にともなって</b>、生活水準が向上した。', id: 'Seiring pertumbuhan ekonomi, standar hidup pun meningkat.' },
    { jp: '技術の進化<b>にともなう</b>変化に対応する。', id: 'Merespons perubahan yang menyertai evolusi teknologi.' },
  ],
  see_also_grammar: ['gn2-00193', 'gn2-00211'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00193', 'gn2-00277'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00209',
  level: 'n2',
  pattern: '〜に当たって',
  reading: '~ni atatte',
  meaning: 'pada saat ..., dalam rangka ...',
  cat: 'sequential-temporal',
  connection: 'V-plain (辞書形) / N + に当たって',
  desc: '<b>〜に当たって</b> menyatakan bahwa suatu tindakan atau pertimbangan khusus dilakukan pada momen penting atau krusial — saat melakukan sesuatu yang signifikan. Pola ini menekankan bahwa momen tersebut adalah kesempatan atau situasi yang layak mendapat perhatian khusus.',
  nuance: null,
  examples: [
    { jp: '新しい仕事を始める<b>に当たって</b>、心構えを改めた。', id: 'Dalam rangka memulai pekerjaan baru, saya memperbarui tekad hati.' },
    { jp: '卒業<b>に当たって</b>、先生に感謝の言葉を伝えた。', id: 'Pada saat kelulusan, saya menyampaikan kata-kata terima kasih kepada guru.' },
    { jp: '式典開催<b>に当たって</b>、準備を万全にする。', id: 'Dalam rangka penyelenggaraan upacara, persiapan dilakukan secara matang.' },
  ],
  see_also_grammar: ['gn2-00210'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00194', 'gn2-00210'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00210',
  level: 'n2',
  pattern: '〜にあたり',
  reading: '~ni atari',
  meaning: 'pada saat ..., dalam rangka ... (formal/tulisan)',
  cat: 'sequential-temporal',
  connection: 'V-plain (辞書形) / N + にあたり',
  desc: '<b>〜にあたり</b> adalah bentuk tulisan formal dari 〜に当たって (gn2-00209). Maknanya identik — digunakan untuk menyatakan bahwa sesuatu dilakukan pada momen penting atau dalam rangka suatu peristiwa signifikan. Bentuk ini sangat umum ditemukan dalam pidato, sambutan, pengumuman resmi, dan dokumen tertulis.',
  nuance: null,
  examples: [
    { jp: '新年度の開始<b>にあたり</b>、ご挨拶申し上げます。', id: 'Dalam rangka dimulainya tahun ajaran baru, perkenankan saya menyampaikan sambutan.' },
    { jp: '事業の拡大<b>にあたり</b>、新たな人材を募集します。', id: 'Dalam rangka perluasan usaha, kami membuka rekrutmen tenaga kerja baru.' },
    { jp: '本書の出版<b>にあたり</b>、多くの方にご協力いただきました。', id: 'Dalam rangka penerbitan buku ini, kami mendapat dukungan dari banyak pihak.' },
  ],
  see_also_grammar: ['gn2-00209'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00192', 'gn1-00194', 'gn2-00209'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00211',
  level: 'n2',
  pattern: '〜に伴い',
  reading: '~ni tomonai',
  meaning: 'seiring dengan ... (formal/tulisan)',
  cat: 'sequential-temporal',
  connection: 'N + に伴い / V-plain + に伴い / に伴う + N',
  desc: '<b>〜に伴い</b> adalah bentuk tulisan formal dari 〜にともなって (gn2-00194). Menyatakan bahwa suatu perubahan atau kejadian membawa serta perubahan atau dampak lain secara bersamaan. Sangat umum dalam berita, laporan, pengumuman resmi, dan surat menyurat bisnis.',
  nuance: null,
  examples: [
    { jp: 'システム更新<b>に伴い</b>、一時的にサービスを停止します。', id: 'Seiring pembaruan sistem, layanan akan dihentikan sementara.' },
    { jp: '人口増加<b>に伴い</b>、インフラ整備が急がれる。', id: 'Seiring pertumbuhan penduduk, pembangunan infrastruktur semakin mendesak.' },
    { jp: '工事<b>に伴う</b>騒音にご注意ください。', id: 'Harap berhati-hati terhadap kebisingan yang menyertai proses konstruksi.' },
  ],
  see_also_grammar: ['gn2-00194', 'gn2-00193'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00005', 'gn2-00193'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00213',
  level: 'n2',
  pattern: '〜を経て',
  reading: '~wo hete',
  meaning: 'setelah melalui ..., melewati proses ...',
  cat: 'sequential-temporal',
  connection: 'N + を経て / V-plain + 過程を経て',
  desc: '<b>〜を経て</b> menyatakan bahwa suatu hasil dicapai setelah melalui suatu proses, tahapan, atau pengalaman tertentu. Mengandung nuansa bahwa proses tersebut memerlukan waktu, usaha, atau perjalanan yang berarti sebelum mencapai tujuan akhir.',
  nuance: null,
  examples: [
    { jp: '長い交渉<b>を経て</b>、契約が成立した。', id: 'Setelah melalui negosiasi panjang, kontrak berhasil disepakati.' },
    { jp: '試験と面接<b>を経て</b>、採用された。', id: 'Setelah melewati ujian dan wawancara, dia diterima bekerja.' },
    { jp: '数年の研究<b>を経て</b>、新薬が開発された。', id: 'Setelah melalui beberapa tahun penelitian, obat baru berhasil dikembangkan.' },
  ],
  see_also_grammar: ['gn2-00219'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00219', 'gn2-00138'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00219',
  level: 'n2',
  pattern: '〜の末に',
  reading: '~no sue ni',
  meaning: 'setelah panjang ..., pada akhirnya setelah ...',
  cat: 'sequential-temporal',
  connection: 'N (proses/usaha) + の末に / V-た + 末に',
  desc: '<b>〜の末に</b> menyatakan bahwa setelah melalui proses yang panjang, melelahkan, atau penuh perjuangan, akhirnya tercapai suatu hasil. Pola ini secara khas digunakan dengan kata benda yang menggambarkan proses panjang seperti "苦労" (kerja keras), "努力" (usaha), "悩み" (kekhawatiran), atau "話し合い" (diskusi).',
  nuance: null,
  examples: [
    { jp: '長い話し合い<b>の末に</b>、結論に達した。', id: 'Setelah diskusi panjang, akhirnya tercapai kesimpulan.' },
    { jp: '苦労<b>の末に</b>、夢を実現した。', id: 'Setelah panjang berjuang, impiannya akhirnya terwujud.' },
    { jp: '悩んだ<b>末に</b>、転職を決めた。', id: 'Setelah lama mempertimbangkan, dia memutuskan untuk pindah kerja.' },
  ],
  see_also_grammar: ['gn2-00218', 'gn2-00213'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00218', 'gn2-00213'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00235', level: 'n2', pattern: '〜ものを',
  reading: '〜mono wo',
  meaning: 'padahal bisa saja ... / seandainya saja ... (penyesalan atau keluhan)',
  cat: 'completion-regret',
  connection: 'V-plain / Adj-plain + ものを',
  desc: '<b>〜ものを</b> menyatakan penyesalan atau keluhan bahwa sesuatu yang seharusnya bisa terjadi justru tidak terjadi, atau seseorang tidak melakukan hal yang seharusnya. Mengandung nada menyesal atau menyalahkan.',
  nuance: null,
  examples: [
    { jp: '素直に謝れば許してもらえた<b>ものを</b>、強情を張るから…。', id: 'Kalau saja mau minta maaf dengan tulus, pasti sudah dimaafkan, tapi karena keras kepala...' },
    { jp: '早めに病院に行けばよかった<b>ものを</b>。', id: 'Seandainya saja pergi ke dokter lebih awal, pasti sudah lebih baik.' },
  ],
  see_also_grammar: ['gn2-00236', 'gn2-00238'], see_also_vocab: [],
  confusion_pairs: ['gn2-00238', 'gn3-00163'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00236', level: 'n2', pattern: '〜だろうに',
  reading: '〜darou ni',
  meaning: 'padahal pasti ... / seandainya ... tentu ... (penyesalan kontrafaktual)',
  cat: 'completion-regret',
  connection: 'V-plain / Adj-plain / N + だろうに',
  desc: '<b>〜だろうに</b> menyatakan penyesalan atau simpati dengan membayangkan kondisi yang seharusnya bisa terjadi tetapi tidak. Pembicara menyiratkan "padahal sudah jelas hasilnya bisa baik, tapi nyatanya tidak begitu."',
  nuance: null,
  examples: [
    { jp: '少し休めば楽になる<b>だろうに</b>、無理をして倒れてしまった。', id: 'Padahal kalau sedikit saja istirahat pasti merasa lebih baik, tapi malah memaksakan diri sampai jatuh sakit.' },
    { jp: '言えば助けてもらえた<b>だろうに</b>、なぜ一人で抱え込んだのか。', id: 'Kalau bilang saja pasti sudah dibantu, mengapa menanggungnya sendiri?' },
  ],
  see_also_grammar: ['gn2-00235', 'gn2-00238'], see_also_vocab: [],
  confusion_pairs: ['gn1-00056', 'gn2-00238', 'gn3-00163', 'gn2-00079', 'gn2-00149'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00281', level: 'n2', pattern: '〜きる',
  reading: '〜kiru',
  meaning: 'benar-benar menyelesaikan ..., sampai habis/tuntas',
  cat: 'completion-regret',
  connection: 'V-masu-stem + きる',
  desc: '<b>〜きる</b> menyatakan bahwa suatu tindakan dilakukan secara penuh, menyeluruh, hingga tuntas — tidak setengah-setengah. Dipakai terutama dengan verba yang melibatkan konsumsi, usaha, atau penyelesaian seperti 食べる, 飲む, 使う, 読む. Menekankan aspek "sampai tidak ada sisa" atau "sampai benar-benar habis."',
  nuance: null,
  examples: [
    { jp: 'この本を今日中に読み<b>きる</b>つもりだ。', id: 'Aku berniat membaca buku ini sampai habis hari ini.' },
    { jp: '電池を使い<b>きる</b>前に充電した方がいい。', id: 'Lebih baik isi daya sebelum baterai benar-benar habis terpakai.' },
  ],
  see_also_grammar: ['gn2-00282', 'gn2-00283', 'gn2-00284', 'gn2-00293'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00293', 'gn2-00285', 'gn2-00284', 'gn2-00287', 'gn2-00159', 'gn2-00282', 'gn2-00283', 'gn2-00289', 'gn2-00290'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00284', level: 'n2', pattern: '〜きった',
  reading: '〜kitta',
  meaning: 'sudah benar-benar selesai, sudah tuntas (bentuk lampau dari 〜きる)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + きった (past)',
  desc: '<b>〜きった</b> adalah bentuk lampau (past tense) dari 〜きる, menyatakan bahwa suatu tindakan telah diselesaikan secara penuh dan tuntas. Selain menunjukkan penyelesaian, bentuk ini juga sering dipakai untuk menyatakan kondisi yang telah mencapai titik ekstrem, seperti "sudah kelelahan total" atau "sudah habis sama sekali."',
  nuance: null,
  examples: [
    { jp: 'マラソン42kmを走り<b>きった</b>。気持ちよかった！', id: 'Berhasil berlari maraton 42 km sampai garis finish. Lega sekali rasanya!' },
    { jp: '長い旅の後でもう疲れ<b>きった</b>。', id: 'Setelah perjalanan panjang, sudah benar-benar habis tenaganya.' },
  ],
  see_also_grammar: ['gn2-00281'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00285', level: 'n2', pattern: '〜ぬく',
  reading: '〜nuku',
  meaning: 'bertahan sampai akhir, melakukan sampai tuntas (meskipun sulit)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + ぬく',
  desc: '<b>〜ぬく</b> menyatakan bahwa seseorang bertahan dan melakukan sesuatu sampai akhir meskipun menghadapi kesulitan atau tantangan besar. Mengandung nuansa ketekunan, ketangguhan, dan tekad yang kuat. Berbeda dari sekadar "selesai," 〜ぬく menekankan perjuangan yang dilewati untuk mencapai hasil akhir.',
  nuance: null,
  examples: [
    { jp: 'どんなに辛くても、最後まで走り<b>ぬく</b>！', id: 'Seberapa pun beratnya, aku akan berlari sampai akhir!' },
    { jp: '彼は貧しい環境の中でも勉強し<b>ぬいて</b>、医者になった。', id: 'Di tengah kondisi yang serba kekurangan, dia terus belajar hingga akhirnya menjadi dokter.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00286'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00286'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00286', level: 'n2', pattern: '〜とおす',
  reading: '〜toosu',
  meaning: 'menyelesaikan, bertahan sampai selesai (tanpa menyerah atau berhenti)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + とおす',
  desc: '<b>〜とおす</b> menyatakan bahwa suatu tindakan dilakukan secara konsisten dari awal sampai akhir tanpa berhenti atau menyerah. Mengandung makna "menembus sampai ujung" — seperti satu jalur lurus yang tidak terputus. Dipakai untuk menggambarkan ketekunan, konsistensi, dan penyelesaian penuh.',
  nuance: null,
  examples: [
    { jp: 'どんなに難しくても、最後まで仕事をやり<b>とおした</b>。', id: 'Sesulit apapun, aku menyelesaikan pekerjaan sampai akhir tanpa menyerah.' },
    { jp: '彼女は反対を受けても自分の意見を言い<b>とおした</b>。', id: 'Meski mendapat penentangan, dia tetap konsisten pada pendapatnya sampai akhir.' },
  ],
  see_also_grammar: ['gn2-00285', 'gn2-00281'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00285', 'gn2-00294'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00287', level: 'n2', pattern: '〜あげる',
  reading: '〜ageru',
  meaning: 'menyelesaikan (membuat sampai jadi), merampungkan sesuatu',
  cat: 'completion-regret',
  connection: 'V-masu-stem + あげる',
  desc: '<b>〜あげる</b> sebagai sufiks verba majemuk menyatakan bahwa suatu proses atau karya diselesaikan secara penuh — dari awal sampai akhir. Nuansanya adalah "mengangkat sesuatu ke tingkat selesai/jadi" — sering dipakai untuk karya, produk, atau hasil usaha yang memerlukan proses panjang. Contoh umum: 書き上げる, 作り上げる, 仕上げる.',
  nuance: null,
  examples: [
    { jp: '3年間かけてついに小説を書き<b>あげた</b>。', id: 'Setelah 3 tahun, akhirnya aku berhasil menyelesaikan penulisan novel.' },
    { jp: 'チームで協力して素晴らしい発表を作り<b>あげた</b>。', id: 'Kami bekerja sama sebagai tim dan berhasil membuat presentasi yang luar biasa.' },
  ],
  see_also_grammar: ['gn2-00288', 'gn2-00281'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00293', 'gn2-00288', 'gn2-00289'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00288', level: 'n2', pattern: '〜あがる',
  reading: '〜agaru',
  meaning: 'selesai, rampung (intransitif — proses selesai dengan sendirinya)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + あがる',
  desc: '<b>〜あがる</b> adalah bentuk intransitif dari 〜あげる, menyatakan bahwa suatu proses atau karya telah selesai/rampung — dengan penekanan pada hasil akhir yang terbentuk, bukan pada siapa yang menyelesaikannya. Sering dipakai untuk produk, hasil kerja, atau kondisi yang "naik ke tahap selesai."',
  nuance: null,
  examples: [
    { jp: '新しいアプリがやっと出来<b>あがった</b>。', id: 'Aplikasi baru itu akhirnya selesai dibuat.' },
    { jp: 'ケーキが焼き<b>あがった</b>ら声をかけてください。', id: 'Kalau kuenya sudah selesai dipanggang, tolong beritahu saya.' },
  ],
  see_also_grammar: ['gn2-00287'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00287', 'gn2-00293', 'gn3-00075'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00291', level: 'n2', pattern: '〜だす',
  reading: '〜dasu',
  meaning: 'mulai tiba-tiba, mengeluarkan (secara spontan atau tak terduga)',
  cat: 'inception-continuation',
  connection: 'V-masu-stem + だす',
  desc: '<b>〜だす</b> menyatakan bahwa suatu tindakan atau peristiwa dimulai secara tiba-tiba atau mendadak, sering kali tanpa peringatan. Tidak seperti 〜はじめる yang menyatakan permulaan yang terencana atau alami, 〜だす menekankan aspek spontan atau tak terduga dari permulaan tindakan.',
  nuance: null,
  examples: [
    { jp: '急に子供が泣き<b>だした</b>。', id: 'Tiba-tiba anak itu mulai menangis.' },
    { jp: '映画が始まったとたん、雨が降り<b>だした</b>。', id: 'Tepat saat film dimulai, hujan tiba-tiba turun.' },
  ],
  see_also_grammar: ['gn2-00292'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00292'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00292', level: 'n2', pattern: '〜はじめる',
  reading: '〜hajimeru',
  meaning: 'mulai melakukan ...',
  cat: 'inception-continuation',
  connection: 'V-masu-stem + はじめる',
  desc: '<b>〜はじめる</b> menyatakan permulaan suatu tindakan. Dipakai secara luas untuk menyatakan bahwa seseorang mulai melakukan sesuatu, baik yang terencana maupun yang berlangsung secara alami dan bertahap. Ini adalah salah satu sufiks aspektual paling dasar dan paling sering digunakan dalam bahasa Jepang.',
  nuance: null,
  examples: [
    { jp: '日本語を勉強し<b>はじめた</b>のは去年のことだ。', id: 'Aku mulai belajar bahasa Jepang tahun lalu.' },
    { jp: 'やっと外が明るくなり<b>はじめた</b>。', id: 'Akhirnya di luar mulai terang — fajar pun datang.' },
  ],
  see_also_grammar: ['gn2-00291', 'gn2-00293', 'gn2-00294'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00291'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00293', level: 'n2', pattern: '〜おわる',
  reading: '〜owaru',
  meaning: 'selesai melakukan ...',
  cat: 'completion-regret',
  connection: 'V-masu-stem + おわる',
  desc: '<b>〜おわる</b> menyatakan bahwa suatu tindakan telah selesai dilakukan. Pasangan alami dari 〜はじめる (mulai) dan 〜つづける (lanjut). Dipakai untuk menyatakan titik akhir dari suatu kegiatan — saat seseorang berhenti karena sudah selesai, bukan karena terpaksa berhenti.',
  nuance: null,
  examples: [
    { jp: 'レポートを書き<b>おわった</b>のでやっと休める。', id: 'Laporan sudah selesai ditulis, jadi akhirnya bisa istirahat.' },
    { jp: '全員が発表し<b>おわったら</b>、質問の時間にします。', id: 'Setelah semua orang selesai presentasi, kita akan masuk ke sesi tanya jawab.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00292', 'gn2-00294'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00287', 'gn2-00288'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00294', level: 'n2', pattern: '〜つづける',
  reading: '〜tsuzukeru',
  meaning: 'terus melakukan ..., melanjutkan ...',
  cat: 'inception-continuation',
  connection: 'V-masu-stem + つづける',
  desc: '<b>〜つづける</b> menyatakan bahwa suatu tindakan berlanjut terus-menerus tanpa henti. Ini adalah sufiks aspektual yang menandai kontinuitas — kebalikan dari penyelesaian (おわる) atau permulaan (はじめる). Dapat dipakai untuk tindakan yang disengaja maupun kondisi yang berlangsung terus.',
  nuance: null,
  examples: [
    { jp: '雨が3日間降り<b>つづけた</b>。', id: 'Hujan terus turun selama 3 hari berturut-turut tanpa henti.' },
    { jp: '諦めずに練習し<b>つづけた</b>結果、大会で優勝できた。', id: 'Berkat terus berlatih tanpa menyerah, aku bisa memenangkan kejuaraan.' },
  ],
  see_also_grammar: ['gn2-00292', 'gn2-00293'],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00029', 'gn2-00286'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00297', level: 'n2', pattern: '〜にわたる / 〜にわたって',
  reading: '〜ni wataru / 〜ni watatte',
  meaning: 'melintasi, mencakup (rentang waktu atau wilayah yang luas)',
  cat: 'sequential-temporal',
  connection: 'N (waktu / tempat / jangkauan) + にわたる / にわたって',
  desc: '<b>〜にわたる</b> / <b>〜にわたって</b> menyatakan bahwa suatu hal mencakup, melintasi, atau berlangsung di seluruh rentang waktu atau ruang yang disebutkan. Dipakai untuk menunjukkan bahwa sesuatu tersebar atau berlangsung di sepanjang suatu periode atau wilayah secara menyeluruh.',
  nuance: null,
  examples: [
    { jp: '交渉は3日間にわた<b>って</b>行われた。', id: 'Negosiasi berlangsung selama 3 hari penuh.' },
    { jp: 'この問題は広い地域にわた<b>る</b>環境被害を引き起こした。', id: 'Masalah ini menimbulkan kerusakan lingkungan yang mencakup wilayah yang sangat luas.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00052', 'gn2-00138'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00298', level: 'n2', pattern: '〜かける',
  reading: '〜kakeru',
  meaning: 'setengah jalan, hampir ..., mulai tapi belum selesai',
  cat: 'sequential-temporal',
  connection: 'V-masu-stem + かける',
  desc: '<b>〜かける</b> menyatakan bahwa suatu tindakan sudah dimulai tetapi belum selesai, atau hampir terjadi tetapi tidak jadi. Ada dua nuansa utama: (1) dalam proses tapi terganggu di tengah jalan (食べかける = sudah mulai makan tapi belum selesai); (2) hampir terjadi tapi tidak jadi/dicegah (死にかける = hampir mati, 言いかける = hampir mengatakan sesuatu tapi urung).',
  nuance: null,
  examples: [
    { jp: '食べ<b>かけた</b>ところで電話が鳴って席を立った。', id: 'Tepat saat baru mau makan, telepon berbunyi dan aku berdiri dari kursi.' },
    { jp: '彼は事故で死に<b>かけた</b>が、奇跡的に助かった。', id: 'Dia hampir meninggal dalam kecelakaan itu, tapi ajaibnya selamat.' },
  ],
  see_also_grammar: ['gn2-00299'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00304', 'gn2-00299'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00299', level: 'n2', pattern: '〜かけの',
  reading: '〜kake no',
  meaning: 'yang setengah jalan, yang belum selesai (modifier atributif)',
  cat: 'sequential-temporal',
  connection: 'V-masu-stem + かけの + N',
  desc: '<b>〜かけの</b> adalah bentuk atributif dari 〜かける, dipakai sebelum nomina untuk menerangkan benda atau hal yang sedang dalam kondisi setengah jalan atau belum selesai. Menggambarkan sesuatu yang prosesnya sudah dimulai tapi terhenti atau belum rampung.',
  nuance: null,
  examples: [
    { jp: '読み<b>かけの</b>本を机の上に置いてきた。', id: 'Aku meninggalkan buku yang sedang dibaca di atas meja.' },
    { jp: '冷蔵庫に食べ<b>かけの</b>ケーキが残っている。', id: 'Di kulkas masih ada kue yang sudah dimakan sebagian.' },
  ],
  see_also_grammar: ['gn2-00298'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00298'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00304', level: 'n2', pattern: '〜ところ(だ)',
  reading: '〜tokoro (da)',
  meaning: 'tepat ketika ..., saat ... (momen spesifik dalam suatu proses)',
  cat: 'sequential-temporal',
  connection: 'V-dict + ところ(だ) / V-te-iru + ところ(だ) / V-ta + ところ(だ)',
  desc: '<b>〜ところ(だ)</b> dipakai untuk menyatakan momen spesifik dari suatu tindakan berdasarkan tahap prosesnya. Tiga bentuk utama: (1) V-dict + ところ = "tepat akan melakukan" (belum mulai); (2) V-te-iru + ところ = "sedang melakukan saat ini"; (3) V-ta + ところ = "baru saja selesai melakukan."',
  nuance: null,
  examples: [
    { jp: '今から出かける<b>ところ</b>です。', id: 'Saya tepat mau berangkat sekarang.' },
    { jp: 'ちょうど夕食を食べている<b>ところ</b>なんだ。', id: 'Aku sedang makan malam ini sekarang.' },
  ],
  see_also_grammar: ['gn2-00303', 'gn2-00305'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00010', 'gn2-00305', 'gn3-00126', 'gn3-00129', 'gn3-00130', 'gn3-00171', 'gn2-00298', 'gn2-00303'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00305', level: 'n2', pattern: '〜ところを',
  reading: '〜tokoro wo',
  meaning: 'saat sedang ..., tepat ketika ... (momen yang dilihat atau menimpa seseorang)',
  cat: 'sequential-temporal',
  connection: 'V-te-iru + ところを / V-dict + ところを / V-ta + ところを',
  desc: '<b>〜ところを</b> dipakai untuk menyatakan saat atau momen ketika seseorang sedang melakukan sesuatu dan dilihat, ditangkap, atau dipergoki oleh pihak lain. Partikel を menunjukkan bahwa momen itu menjadi objek dari tindakan orang lain (melihat, menangkap, menghentikan, dsb.). Sering dipakai dalam konteks pengawasan, kejadian kebetulan, atau ekspresi sopan.',
  nuance: null,
  examples: [
    { jp: '試験中にカンニングしている<b>ところを</b>先生に見られた。', id: 'Aku ketahuan guru sedang menyontek di tengah ujian.' },
    { jp: 'お忙しい<b>ところを</b>、お時間をいただきありがとうございます。', id: 'Terima kasih sudah meluangkan waktu meski Anda sedang sibuk.' },
  ],
  see_also_grammar: ['gn2-00304'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00304'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
