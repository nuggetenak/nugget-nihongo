// ══════════════════════════════════════════════════════════════
//  grammar-n2.js — Nugget Nihongo · JLPT N2 Grammar
//  AUTO-GENERATED — DO NOT EDIT DIRECTLY
//  Edit: public/data/grammar/n2/*.js  then run: node scripts/merge-grammar.js
//  Entries: 310 | Generated: 2026-04-23
// ══════════════════════════════════════════════════════════════

window.grammarN2 = [

  // ── TENSE-ASPECT (42) ───────────────────────────────────

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
    see_also_grammar: ['gn2-00004'], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
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
    see_also_grammar: ['gn2-00003'], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
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
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00041', level: 'n2', pattern: '〜に従って / 〜に従い', reading: '〜ni shitagatte / 〜ni shitagai',
  meaning: 'sesuai dengan ... / mengikuti ... / seiring ...',
  cat: 'sequential-temporal',
  connection: 'V-dict / N + に従って / に従い',
  desc: '<b>〜に従って</b> memiliki dua makna: (1) mengikuti aturan, instruksi, atau otoritas tertentu; (2) seiring perubahan A, B pun ikut berubah secara proporsional.',
  nuance: 'Makna (2) mirip dengan に伴って, tetapi に従って lebih menekankan hubungan sebab-akibat yang mengalir secara alami. Makna (1) mirip dengan 通りに tetapi に従って lebih formal.',
  examples: [
    { jp: '規則<b>に従って</b>行動してください。', id: 'Mohon bertindak sesuai dengan peraturan.' },
    { jp: '時代<b>に従って</b>、働き方も変わった。', id: 'Seiring perkembangan zaman, cara bekerja pun berubah.' },
    { jp: '医師の指示<b>に従い</b>、薬を飲んでいます。', id: 'Saya minum obat mengikuti petunjuk dokter.' }
  ],
  see_also_grammar: ['gn2-00042'], see_also_vocab: [],
  confusion_pairs: ['gn2-00042'],
  register: 'formal', exceptions: null, notes: null,
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
  nuance: 'Menekankan bahwa X adalah "awal dari serentetan". Sering digunakan untuk tur, acara berturut-turut, atau tren yang menyebar. Agak formal; lebih jarang dalam percakapan biasa.',
  examples: [
    { jp: '東京<b>を皮切りに</b>、全国ツアーが幕を開けた。', id: 'Dimulai dari Tokyo, tur nasional pun resmi dimulai.' },
    { jp: 'この商品のヒット<b>を皮切りに</b>、次々と新製品が発売された。', id: 'Dimulai dari keberhasilan produk ini, produk-produk baru pun bermunculan satu per satu.' }
  ],
  see_also_grammar: ['gn2-00107', 'gn2-00108'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107', 'gn2-00108'],
  register: 'formal',
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
  nuance: 'Lebih netral register-nya dibanding に即して atau に基づいて. Bisa dipakai sehari-hari. Pada makna fisik menekankan pergerakan mengikuti garis/jalur; pada makna figuratif menekankan kepatuhan pada alur atau panduan.',
  examples: [
    { jp: '川<b>に沿って</b>歩いていくと、古い橋が見えてきます。', id: 'Jika berjalan mengikuti sungai, Anda akan melihat sebuah jembatan tua.' },
    { jp: '計画<b>に沿って</b>プロジェクトを進めてください。', id: 'Tolong jalankan proyek sesuai dengan rencana yang telah dibuat.' }
  ],
  see_also_grammar: ['gn2-00103', 'gn2-00101'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00103'],
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
  nuance: 'Lebih formal dari 〜の前に. Sering muncul dalam pengumuman resmi, upacara, atau rilis produk. に先立ち adalah bentuk yang lebih singkat dan sedikit lebih formal, umum dalam bahasa tulis.',
  examples: [
    { jp: '式典<b>に先立って</b>、リハーサルが行われた。', id: 'Sebelum upacara, gladi resik pun dilaksanakan.' },
    { jp: '製品発売<b>に先立ち</b>、プレスリリースが配布された。', id: 'Mendahului peluncuran produk, siaran pers telah dibagikan.' }
  ],
  see_also_grammar: ['gn2-00107'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107'],
  register: 'formal',
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
  nuance: 'Lebih formal dari をきっかけに dan sering dipakai untuk peristiwa besar atau bersejarah. を契機として lebih formal lagi. Konotasinya lebih berat/bermakna dibanding をきっかけに yang lebih kasual dan personal.',
  examples: [
    { jp: 'その事故<b>を契機に</b>、安全規制が大幅に強化された。', id: 'Berawal dari kecelakaan itu, regulasi keselamatan pun diperkuat secara signifikan.' },
    { jp: '転職<b>を契機に</b>、生き方そのものを見直した。', id: 'Menjadikan pergantian pekerjaan sebagai momentum, aku menata ulang cara hidupku.' }
  ],
  see_also_grammar: ['gn2-00108', 'gn2-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00108', 'gn2-00095', 'gn2-00106'],
  register: 'formal',
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
  nuance: 'Bisa digunakan untuk kejadian besar maupun kecil dalam kehidupan sehari-hari. Lebih umum dan fleksibel dari を契機に. Konotasinya lebih personal: sering menceritakan pengalaman individu.',
  examples: [
    { jp: '旅行<b>をきっかけに</b>、写真に深く興味を持つようになった。', id: 'Berawal dari perjalanan itu, aku jadi sangat tertarik dengan fotografi.' },
    { jp: '彼女に出会った<b>のをきっかけに</b>、日本語の勉強を始めた。', id: 'Dipicu oleh pertemuan dengannya, aku mulai belajar bahasa Jepang.' }
  ],
  see_also_grammar: ['gn2-00107', 'gn2-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107', 'gn2-00095'],
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
  nuance: 'Lebih formal dan literary dari のに. Mengandung nuansa kritik atau keluhan yang tertahan — pembicara menyayangkan kondisi yang tidak sesuai harapan. Sering terdengar dalam monolog, narasi, atau percakapan yang intens secara emosional.',
  examples: [
    { jp: '早く言えばよかった<b>ものを</b>。', id: 'Padahal kalau saja bilang lebih awal...' },
    { jp: '少し待てばよかった<b>ものを</b>、なぜそんなに急いだのか。', id: 'Padahal kalau sabar sebentar saja — mengapa tergesa-gesa begitu?' }
  ],
  see_also_grammar: ['gn2-00124', 'gn2-00125'], see_also_vocab: [],
  confusion_pairs: ['gn2-00124'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00131', level: 'n2', pattern: '〜を契機に',
  reading: '〜wo keiki ni',
  meaning: 'menjadikan ... sebagai titik balik / kesempatan untuk berubah',
  cat: 'inception-continuation',
  connection: 'N + を契機に / V-plain + のを契機に',
  desc: '<b>〜を契機に</b> menyatakan bahwa suatu peristiwa menjadi pemicu atau titik balik yang mendorong perubahan besar atau tindakan baru. Biasanya digunakan untuk momen penting dalam hidup atau organisasi.',
  nuance: 'Lebih formal dan bermakna lebih besar dibandingkan をきっかけに — を契機に digunakan untuk peristiwa bersejarah, perubahan karier, atau titik balik hidup yang signifikan. をきっかけに lebih umum dan bisa digunakan untuk hal sehari-hari.',
  examples: [
    { jp: '転職<b>を契機に</b>、生活スタイルを一新した。', id: 'Menjadikan pergantian kerja sebagai titik balik, ia merombak total gaya hidupnya.' },
    { jp: '震災<b>を契機に</b>、地域の防災意識が高まった。', id: 'Bencana gempa menjadi titik balik meningkatnya kesadaran mitigasi bencana di masyarakat.' },
    { jp: '留学<b>を契機に</b>、将来は国際的な仕事をしたいと思うようになった。', id: 'Pengalaman belajar di luar negeri menjadi kesempatan baginya untuk mulai bercita-cita berkarier di bidang internasional.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
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
  nuance: 'Berbeda dari まえに (sebelum, netral) — に先立って bersifat formal dan menyiratkan bahwa tindakan tersebut merupakan bagian dari prosedur atau persiapan yang disengaja. Tidak cocok untuk percakapan sehari-hari biasa.',
  examples: [
    { jp: '式典<b>に先立って</b>、主催者から挨拶がありました。', id: 'Sebelum upacara dimulai, ada sambutan dari penyelenggara.' },
    { jp: '工事<b>に先立って</b>、住民への説明会が開かれた。', id: 'Sebagai langkah pendahuluan sebelum konstruksi, diadakan sesi penjelasan bagi warga.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00133', level: 'n2', pattern: '〜に際して',
  reading: '〜ni saishite',
  meaning: 'saat ..., dalam rangka ..., pada kesempatan ...',
  cat: 'sequential-temporal',
  connection: 'N + に際して / V-dictionary + に際して',
  desc: '<b>〜に際して</b> menandai momen penting atau situasi khusus sebagai konteks untuk suatu tindakan. Digunakan saat memperkenalkan hal yang dilakukan atau diperhatikan pada suatu peristiwa penting.',
  nuance: 'Mirip dengan にあたって, namun に際して lebih menekankan pada saat terjadinya peristiwa itu sendiri (in the occasion of), sedangkan にあたって lebih menekankan pada persiapan menghadapi sesuatu yang akan datang. Keduanya formal.',
  examples: [
    { jp: '入社<b>に際して</b>、いくつかの書類を提出してください。', id: 'Dalam rangka masuk kerja, harap serahkan beberapa dokumen berikut.' },
    { jp: '試験<b>に際して</b>、携帯電話の電源をお切りください。', id: 'Saat ujian berlangsung, mohon matikan telepon genggam Anda.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00144', level: 'n2', pattern: '〜たびに',
  reading: '〜tabi ni',
  meaning: 'setiap kali ..., tiap kali ... (terjadi)',
  cat: 'sequential-temporal',
  connection: 'V-dictionary + たびに / N + のたびに',
  desc: '<b>〜たびに</b> menyatakan bahwa setiap kali suatu peristiwa atau tindakan terjadi, konsekuensi atau reaksi tertentu selalu mengikutinya. Menekankan pola berulang yang terpicu oleh suatu aksi.',
  nuance: 'Berbeda dari ごとに yang menyatakan interval waktu atau jumlah yang teratur — たびに tidak harus teratur waktunya, melainkan terpicu oleh terjadinya suatu peristiwa. Sering menyiratkan emosi atau reaksi yang konsisten.',
  examples: [
    { jp: '故郷に帰る<b>たびに</b>、昔のことを思い出す。', id: 'Setiap kali pulang ke kampung halaman, ia selalu teringat masa lalu.' },
    { jp: '試験<b>のたびに</b>、緊張してしまう。', id: 'Setiap kali ada ujian, ia selalu gugup.' }
  ],
  see_also_grammar: ['gn2-00145'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00145'],
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
  nuance: 'Berbeda dari たびに (terpicu oleh peristiwa) — ごとに menyatakan keteraturan interval (3日ごとに = setiap 3 hari) atau distribusi per unit (人ごとに = setiap orang berbeda). Juga berbeda dari おきに (interval dengan jeda), ごとに mencakup seluruh unit.',
  examples: [
    { jp: '薬は6時間<b>ごとに</b>飲んでください。', id: 'Minumlah obat ini setiap 6 jam sekali.' },
    { jp: '人<b>ごとに</b>、価値観が異なる。', id: 'Setiap orang memiliki nilai-nilai hidup yang berbeda-beda.' }
  ],
  see_also_grammar: ['gn2-00144'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00144'],
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
  nuance: 'Berbeda dari たびに yang netral — につけ hampir selalu menyiratkan respons emosional (kerinduan, kekhawatiran, kekaguman). Pola ganda いいにつけ悪いにつけ berarti "baik maupun buruk, selalu...". Umumnya digunakan dalam tulisan atau gaya yang agak literer.',
  examples: [
    { jp: '故郷の写真を見る<b>につけ</b>、両親のことが恋しくなる。', id: 'Setiap kali melihat foto kampung halaman, ia selalu rindu pada orang tuanya.' },
    { jp: 'いいに<b>つけ</b>悪いに<b>つけ</b>、彼女のことが気になる。', id: 'Entah dalam kondisi baik maupun buruk, ia selalu memikirkan perempuan itu.' }
  ],
  see_also_grammar: ['gn2-00144'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Bentuk ganda 〜につけ〜につけ = entah...maupun... (kedua kondisi menghasilkan hasil yang sama).',
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
  nuance: 'Berbeda dengan 〜に先立って yang lebih netral ("sebelum melakukan X"), 〜に先がけて mengandung nuansa menjadi pelopor atau yang terdepan — ada unsur kebanggaan atau inisiatif. 〜に先立って lebih cocok untuk prosedur atau formalitas, sedangkan 〜に先がけて menekankan keunggulan posisi.',
  examples: [
    { jp: '他社<b>に先がけて</b>、新製品を市場に投入した。', id: 'Mendahului perusahaan lain, mereka meluncurkan produk baru ke pasar.' },
    { jp: '世界<b>に先がけて</b>、日本がその技術を開発した。', id: 'Mendahului dunia, Jepang mengembangkan teknologi tersebut.' },
    { jp: '開会式<b>に先がけて</b>、リハーサルが行われた。', id: 'Mendahului upacara pembukaan, diadakan gladi resik.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
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
  nuance: 'Dibandingkan 〜にともなって, 〜とともに lebih luas penggunaannya dan bisa berarti "bersama" (dengan orang) atau "seiring" (dengan perubahan). 〜にともなって (gn2-00194) lebih khusus untuk perubahan yang satu mengikuti yang lain secara kausal, sering dalam konteks formal atau peraturan.',
  examples: [
    { jp: '年齢を重ねる<b>とともに</b>、視野が広がった。', id: 'Seiring bertambahnya usia, wawasan pun semakin luas.' },
    { jp: '彼女は仲間<b>とともに</b>、プロジェクトを成功させた。', id: 'Dia berhasil menyelesaikan proyek bersama timnya.' },
    { jp: '社会が変化する<b>とともに</b>、価値観も変わってきた。', id: 'Seiring perubahan masyarakat, nilai-nilai pun ikut berubah.' },
  ],
  see_also_grammar: ['gn2-00194', 'gn2-00211'],
  see_also_vocab: [],
  confusion_pairs: [],
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
  nuance: 'Berbeda dengan 〜とともに yang bisa berarti "bersama (orang)" atau "seiring", 〜にともなって selalu mengacu pada perubahan yang menyertai perubahan lain — ada nuansa kausal atau dampak. Tidak digunakan untuk kebersamaan fisik dengan orang. Bentuk 〜に伴い (gn2-00211) adalah versi tulisan yang lebih formal.',
  examples: [
    { jp: '少子化<b>にともなって</b>、学校の数が減った。', id: 'Seiring dengan penurunan angka kelahiran, jumlah sekolah pun berkurang.' },
    { jp: '経済成長<b>にともなって</b>、生活水準が向上した。', id: 'Seiring pertumbuhan ekonomi, standar hidup pun meningkat.' },
    { jp: '技術の進化<b>にともなう</b>変化に対応する。', id: 'Merespons perubahan yang menyertai evolusi teknologi.' },
  ],
  see_also_grammar: ['gn2-00193', 'gn2-00211'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '書き言葉では〜に伴い (gn2-00211) を使うことが多い',
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
  nuance: 'Berbeda dengan 〜とき yang sekadar menyatakan waktu, 〜に当たって menekankan bahwa situasinya adalah momen penting yang menuntut tindakan atau perhatian tertentu. Lebih formal dari 〜にあたり (gn2-00210), yang merupakan versi tulisan murni. Keduanya tidak cocok untuk tindakan berulang sehari-hari.',
  examples: [
    { jp: '新しい仕事を始める<b>に当たって</b>、心構えを改めた。', id: 'Dalam rangka memulai pekerjaan baru, saya memperbarui tekad hati.' },
    { jp: '卒業<b>に当たって</b>、先生に感謝の言葉を伝えた。', id: 'Pada saat kelulusan, saya menyampaikan kata-kata terima kasih kepada guru.' },
    { jp: '式典開催<b>に当たって</b>、準備を万全にする。', id: 'Dalam rangka penyelenggaraan upacara, persiapan dilakukan secara matang.' },
  ],
  see_also_grammar: ['gn2-00210'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '繰り返し行う日常的な行動には使わない。特別・重要な場面に使う。',
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
  nuance: 'Secara makna, 〜にあたり dan 〜に当たって dapat dipertukarkan. Perbedaannya murni pada register: 〜にあたり adalah bentuk 書き言葉 (bahasa tulis) yang sangat formal, sementara 〜に当たって sedikit lebih fleksibel dan bisa digunakan dalam pidato lisan. Keduanya tidak digunakan untuk kejadian sehari-hari yang biasa.',
  examples: [
    { jp: '新年度の開始<b>にあたり</b>、ご挨拶申し上げます。', id: 'Dalam rangka dimulainya tahun ajaran baru, perkenankan saya menyampaikan sambutan.' },
    { jp: '事業の拡大<b>にあたり</b>、新たな人材を募集します。', id: 'Dalam rangka perluasan usaha, kami membuka rekrutmen tenaga kerja baru.' },
    { jp: '本書の出版<b>にあたり</b>、多くの方にご協力いただきました。', id: 'Dalam rangka penerbitan buku ini, kami mendapat dukungan dari banyak pihak.' },
  ],
  see_also_grammar: ['gn2-00209'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '書き言葉専用。スピーチや公式文書で多用される。',
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
  nuance: 'Secara makna identik dengan 〜にともなって, namun 〜に伴い adalah bentuk yang lebih singkat dan lebih kaku — dikhususkan untuk bahasa tulis formal. Dalam percakapan atau teks semiformal, 〜にともなって lebih alami. Bentuk 〜に伴う digunakan sebelum kata benda sebagai modifier.',
  examples: [
    { jp: 'システム更新<b>に伴い</b>、一時的にサービスを停止します。', id: 'Seiring pembaruan sistem, layanan akan dihentikan sementara.' },
    { jp: '人口増加<b>に伴い</b>、インフラ整備が急がれる。', id: 'Seiring pertumbuhan penduduk, pembangunan infrastruktur semakin mendesak.' },
    { jp: '工事<b>に伴う</b>騒音にご注意ください。', id: 'Harap berhati-hati terhadap kebisingan yang menyertai proses konstruksi.' },
  ],
  see_also_grammar: ['gn2-00194', 'gn2-00193'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '書き言葉専用。〜にともなって の硬い文語形。',
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
  nuance: 'Berbeda dengan 〜の末に (gn2-00219) yang menekankan "akhirnya setelah perjuangan panjang" dengan nuansa kelegaan atau resolusi, 〜を経て lebih menekankan bahwa sesuatu dilewati sebagai proses atau tahapan — tanpa harus menyiratkan kesulitan. Lebih netral dan formal.',
  examples: [
    { jp: '長い交渉<b>を経て</b>、契約が成立した。', id: 'Setelah melalui negosiasi panjang, kontrak berhasil disepakati.' },
    { jp: '試験と面接<b>を経て</b>、採用された。', id: 'Setelah melewati ujian dan wawancara, dia diterima bekerja.' },
    { jp: '数年の研究<b>を経て</b>、新薬が開発された。', id: 'Setelah melalui beberapa tahun penelitian, obat baru berhasil dikembangkan.' },
  ],
  see_also_grammar: ['gn2-00219'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
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
  nuance: 'Berbeda dengan 〜の結果 (gn2-00218) yang netral dan hanya menyatakan hubungan sebab-akibat, 〜の末に selalu mengandung nuansa bahwa proses sebelumnya berat, panjang, atau penuh pertimbangan — dan ada rasa kelegaan atau kebermaknaan saat hasilnya tercapai. Tidak digunakan untuk proses singkat.',
  examples: [
    { jp: '長い話し合い<b>の末に</b>、結論に達した。', id: 'Setelah diskusi panjang, akhirnya tercapai kesimpulan.' },
    { jp: '苦労<b>の末に</b>、夢を実現した。', id: 'Setelah panjang berjuang, impiannya akhirnya terwujud.' },
    { jp: '悩んだ<b>末に</b>、転職を決めた。', id: 'Setelah lama mempertimbangkan, dia memutuskan untuk pindah kerja.' },
  ],
  see_also_grammar: ['gn2-00218', 'gn2-00213'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: '長期的・苦労を伴うプロセスにのみ使う。短い過程には不自然。',
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
  nuance: 'Berbeda dari のに (gn2-00238) yang lebih netral — ものを mengandung nada keluhan atau menyalahkan yang lebih kuat. Sering digunakan untuk mengkritik keputusan seseorang secara tidak langsung. Klausa setelahnya sering dihilangkan (elipsis), menyiratkan "tapi nyatanya tidak begitu."',
  examples: [
    { jp: '素直に謝れば許してもらえた<b>ものを</b>、強情を張るから…。', id: 'Kalau saja mau minta maaf dengan tulus, pasti sudah dimaafkan, tapi karena keras kepala...' },
    { jp: '早めに病院に行けばよかった<b>ものを</b>。', id: 'Seandainya saja pergi ke dokter lebih awal, pasti sudah lebih baik.' },
  ],
  see_also_grammar: ['gn2-00236', 'gn2-00238'], see_also_vocab: [],
  confusion_pairs: ['gn2-00236', 'gn2-00238'],
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
  nuance: 'Berbeda dari ものを (gn2-00235) yang cenderung menyalahkan seseorang — だろうに lebih banyak mengandung simpati atau penyesalan yang reflektif. Berbeda dari のに (gn2-00238) yang lebih umum dan kasual — だろうに lebih formal dan mengandung elemen perkiraan (だろう).',
  examples: [
    { jp: '少し休めば楽になる<b>だろうに</b>、無理をして倒れてしまった。', id: 'Padahal kalau sedikit saja istirahat pasti merasa lebih baik, tapi malah memaksakan diri sampai jatuh sakit.' },
    { jp: '言えば助けてもらえた<b>だろうに</b>、なぜ一人で抱え込んだのか。', id: 'Kalau bilang saja pasti sudah dibantu, mengapa menanggungnya sendiri?' },
  ],
  see_also_grammar: ['gn2-00235', 'gn2-00238'], see_also_vocab: [],
  confusion_pairs: ['gn2-00235'],
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
  nuance: 'Berbeda dengan 〜おわる (gn2-00293) yang hanya berarti "selesai melakukan," 〜きる menekankan ketuntasan penuh atau kehabisan sepenuhnya — tidak ada yang tersisa. Contoh: 食べ終わる = selesai makan; 食べきる = menghabiskan semuanya. Juga dapat menyatakan kelelahan total: 疲れきる (kelelahan sampai habis tenaga).',
  examples: [
    { jp: 'この本を今日中に読み<b>きる</b>つもりだ。', id: 'Aku berniat membaca buku ini sampai habis hari ini.' },
    { jp: '電池を使い<b>きる</b>前に充電した方がいい。', id: 'Lebih baik isi daya sebelum baterai benar-benar habis terpakai.' },
  ],
  see_also_grammar: ['gn2-00282', 'gn2-00283', 'gn2-00284', 'gn2-00293'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00282', 'gn2-00283', 'gn2-00284', 'gn2-00285', 'gn2-00293'],
  register: null, exceptions: null,
  notes: '疲れきる, 使いきる, 食べきる — bentuk ini produktif dan umum ditemukan di N2.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00284', level: 'n2', pattern: '〜きった',
  reading: '〜kitta',
  meaning: 'sudah benar-benar selesai, sudah tuntas (bentuk lampau dari 〜きる)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + きった (past)',
  desc: '<b>〜きった</b> adalah bentuk lampau (past tense) dari 〜きる, menyatakan bahwa suatu tindakan telah diselesaikan secara penuh dan tuntas. Selain menunjukkan penyelesaian, bentuk ini juga sering dipakai untuk menyatakan kondisi yang telah mencapai titik ekstrem, seperti "sudah kelelahan total" atau "sudah habis sama sekali."',
  nuance: 'Perlu dibedakan dengan 〜てしまった: してしまった (sudah terlanjur dilakukan, sering dengan nuansa penyesalan), sedangkan 〜きった hanya menyatakan penyelesaian/ketuntasan penuh tanpa nuansa penyesalan. Contoh: 疲れきった (kelelahan total — sudah mencapai batas ekstrem) vs 疲れてしまった (sudah terlanjur kelelahan — sedikit menyesal).',
  examples: [
    { jp: 'マラソン42kmを走り<b>きった</b>。気持ちよかった！', id: 'Berhasil berlari maraton 42 km sampai garis finish. Lega sekali rasanya!' },
    { jp: '長い旅の後でもう疲れ<b>きった</b>。', id: 'Setelah perjalanan panjang, sudah benar-benar habis tenaganya.' },
  ],
  see_also_grammar: ['gn2-00281'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281'],
  register: null, exceptions: null,
  notes: 'Bentuk lampau dari きる. Lihat gn2-00281 untuk bentuk non-past.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00285', level: 'n2', pattern: '〜ぬく',
  reading: '〜nuku',
  meaning: 'bertahan sampai akhir, melakukan sampai tuntas (meskipun sulit)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + ぬく',
  desc: '<b>〜ぬく</b> menyatakan bahwa seseorang bertahan dan melakukan sesuatu sampai akhir meskipun menghadapi kesulitan atau tantangan besar. Mengandung nuansa ketekunan, ketangguhan, dan tekad yang kuat. Berbeda dari sekadar "selesai," 〜ぬく menekankan perjuangan yang dilewati untuk mencapai hasil akhir.',
  nuance: 'Kunci dari 〜ぬく adalah nuansa kesulitan yang dihadapi. Tanpa konteks perjuangan, 〜ぬく terasa janggal. Berbeda dengan 〜きる (gn2-00281) yang lebih netral (selesai/habis), 〜ぬく selalu menyiratkan usaha keras dan ketahanan: 走りきる (berlari sampai habis) vs 走りぬく (berlari sampai akhir meski berat). 〜とおす (gn2-00286) juga serupa, tetapi lebih menekankan "terus tanpa berhenti di tengah jalan."',
  examples: [
    { jp: 'どんなに辛くても、最後まで走り<b>ぬく</b>！', id: 'Seberapa pun beratnya, aku akan berlari sampai akhir!' },
    { jp: '彼は貧しい環境の中でも勉強し<b>ぬいて</b>、医者になった。', id: 'Di tengah kondisi yang serba kekurangan, dia terus belajar hingga akhirnya menjadi dokter.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00286'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00286'],
  register: null, exceptions: null,
  notes: '〜ぬく selalu berkonotasi perjuangan dan ketahanan — tidak cocok dipakai untuk penyelesaian tugas biasa tanpa tantangan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00286', level: 'n2', pattern: '〜とおす',
  reading: '〜toosu',
  meaning: 'menyelesaikan, bertahan sampai selesai (tanpa menyerah atau berhenti)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + とおす',
  desc: '<b>〜とおす</b> menyatakan bahwa suatu tindakan dilakukan secara konsisten dari awal sampai akhir tanpa berhenti atau menyerah. Mengandung makna "menembus sampai ujung" — seperti satu jalur lurus yang tidak terputus. Dipakai untuk menggambarkan ketekunan, konsistensi, dan penyelesaian penuh.',
  nuance: '〜とおす vs 〜ぬく (gn2-00285): Keduanya menyatakan penyelesaian meskipun ada kesulitan, tetapi 〜とおす lebih menekankan tidak pernah berhenti/menyerah di tengah jalan, sedangkan 〜ぬく menekankan ketahanan menanggung perjuangan. 〜とおす cocok untuk tindakan yang membutuhkan konsistensi penuh: やりとおす (melakukan sampai selesai), 言いとおす (konsisten pada ucapan). Keduanya lebih bermuatan emosional daripada 〜きる yang netral.',
  examples: [
    { jp: 'どんなに難しくても、最後まで仕事をやり<b>とおした</b>。', id: 'Sesulit apapun, aku menyelesaikan pekerjaan sampai akhir tanpa menyerah.' },
    { jp: '彼女は反対を受けても自分の意見を言い<b>とおした</b>。', id: 'Meski mendapat penentangan, dia tetap konsisten pada pendapatnya sampai akhir.' },
  ],
  see_also_grammar: ['gn2-00285', 'gn2-00281'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00285'],
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
  nuance: '〜あげる (transitif) vs 〜あがる (gn2-00288) (intransitif): あげる = seseorang menyelesaikan sesuatu (subjek aktif); あがる = sesuatu selesai dengan sendirinya (fokus pada hasil). Contoh: 仕上げる (aku merampungkannya) vs 仕上がる (itu sudah jadi). 〜あげる juga berbeda dari 〜きる (gn2-00281): あげる menekankan "karya yang terbentuk/lahir," きる menekankan "habis/tuntas tanpa sisa."',
  examples: [
    { jp: '3年間かけてついに小説を書き<b>あげた</b>。', id: 'Setelah 3 tahun, akhirnya aku berhasil menyelesaikan penulisan novel.' },
    { jp: 'チームで協力して素晴らしい発表を作り<b>あげた</b>。', id: 'Kami bekerja sama sebagai tim dan berhasil membuat presentasi yang luar biasa.' },
  ],
  see_also_grammar: ['gn2-00288', 'gn2-00281'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00288'],
  register: null, exceptions: null,
  notes: '仕上げる adalah bentuk yang umum dipakai dalam konteks profesional: 〜を仕上げる (merampungkan ...).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00288', level: 'n2', pattern: '〜あがる',
  reading: '〜agaru',
  meaning: 'selesai, rampung (intransitif — proses selesai dengan sendirinya)',
  cat: 'completion-regret',
  connection: 'V-masu-stem + あがる',
  desc: '<b>〜あがる</b> adalah bentuk intransitif dari 〜あげる, menyatakan bahwa suatu proses atau karya telah selesai/rampung — dengan penekanan pada hasil akhir yang terbentuk, bukan pada siapa yang menyelesaikannya. Sering dipakai untuk produk, hasil kerja, atau kondisi yang "naik ke tahap selesai."',
  nuance: '〜あがる (intransitif) vs 〜あげる (gn2-00287) (transitif): Pasangan intransitif-transitif yang klasik dalam bahasa Jepang. 書き上げる (aku menyelesaikan menulis) vs 書き上がる (tulisan itu sudah jadi). Dalam percakapan, あがる lebih sering digunakan ketika subjek yang selesai adalah benda/hal yang dibuat, bukan pelaku yang menyelesaikannya. Juga umum: でき上がる (jadi/rampung), 出来上がり (hasil jadi).',
  examples: [
    { jp: '新しいアプリがやっと出来<b>あがった</b>。', id: 'Aplikasi baru itu akhirnya selesai dibuat.' },
    { jp: 'ケーキが焼き<b>あがった</b>ら声をかけてください。', id: 'Kalau kuenya sudah selesai dipanggang, tolong beritahu saya.' },
  ],
  see_also_grammar: ['gn2-00287'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00287'],
  register: null, exceptions: null,
  notes: 'でき上がる dan 仕上がる adalah bentuk paling umum dalam konteks sehari-hari dan profesional.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00291', level: 'n2', pattern: '〜だす',
  reading: '〜dasu',
  meaning: 'mulai tiba-tiba, mengeluarkan (secara spontan atau tak terduga)',
  cat: 'inception-continuation',
  connection: 'V-masu-stem + だす',
  desc: '<b>〜だす</b> menyatakan bahwa suatu tindakan atau peristiwa dimulai secara tiba-tiba atau mendadak, sering kali tanpa peringatan. Tidak seperti 〜はじめる yang menyatakan permulaan yang terencana atau alami, 〜だす menekankan aspek spontan atau tak terduga dari permulaan tindakan.',
  nuance: '〜だす vs 〜はじめる (gn2-00292): Keduanya menyatakan "mulai," namun perbedaannya penting. はじめる = mulai dengan sengaja atau terencana (勉強しはじめた = mulai belajar [dengan sengaja]); だす = mulai tiba-tiba/spontan (泣きだした = tiba-tiba menangis). 〜だす lebih sering dipakai untuk emosi, perubahan cuaca, atau kejadian yang tidak diduga. Tidak cocok untuk tindakan yang sudah direncanakan.',
  examples: [
    { jp: '急に子供が泣き<b>だした</b>。', id: 'Tiba-tiba anak itu mulai menangis.' },
    { jp: '映画が始まったとたん、雨が降り<b>だした</b>。', id: 'Tepat saat film dimulai, hujan tiba-tiba turun.' },
  ],
  see_also_grammar: ['gn2-00292'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00292'],
  register: null, exceptions: null,
  notes: '〜だす tidak dipakai untuk tindakan yang direncanakan sebelumnya — gunakan 〜はじめる untuk konteks itu.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00292', level: 'n2', pattern: '〜はじめる',
  reading: '〜hajimeru',
  meaning: 'mulai melakukan ...',
  cat: 'inception-continuation',
  connection: 'V-masu-stem + はじめる',
  desc: '<b>〜はじめる</b> menyatakan permulaan suatu tindakan. Dipakai secara luas untuk menyatakan bahwa seseorang mulai melakukan sesuatu, baik yang terencana maupun yang berlangsung secara alami dan bertahap. Ini adalah salah satu sufiks aspektual paling dasar dan paling sering digunakan dalam bahasa Jepang.',
  nuance: '〜はじめる vs 〜だす (gn2-00291): はじめる = mulai (netral atau terencana); だす = mulai tiba-tiba/tak terduga. Perbedaan contoh: 雨が降り始めた (mulai turun hujan — netral dalam narasi) vs 雨が降りだした (hujan tiba-tiba turun). 〜はじめる juga cocok untuk proses bertahap dan kebiasaan baru: 日本語を勉強しはじめた (mulai belajar bahasa Jepang — terencana). Keduanya menggunakan bentuk masu-stem.',
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
  nuance: '〜おわる vs 〜きる (gn2-00281): おわる = selesai melakukan tindakan (fokus pada titik akhir); きる = menghabiskan/menuntaskan sepenuhnya (fokus pada tidak ada sisa). Contoh: 食べ終わった = selesai makan; 食べきった = menghabiskan semuanya. Untuk pola aspektual, 〜おわる membentuk sistem tiga serangkai bersama 〜はじめる (mulai) dan 〜つづける (lanjut).',
  examples: [
    { jp: 'レポートを書き<b>おわった</b>のでやっと休める。', id: 'Laporan sudah selesai ditulis, jadi akhirnya bisa istirahat.' },
    { jp: '全員が発表し<b>おわったら</b>、質問の時間にします。', id: 'Setelah semua orang selesai presentasi, kita akan masuk ke sesi tanya jawab.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00292', 'gn2-00294'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281'],
  register: null, exceptions: null,
  notes: 'Pasangan dengan はじめる dan つづける untuk menyatakan aspek tindakan secara lengkap.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00294', level: 'n2', pattern: '〜つづける',
  reading: '〜tsuzukeru',
  meaning: 'terus melakukan ..., melanjutkan ...',
  cat: 'inception-continuation',
  connection: 'V-masu-stem + つづける',
  desc: '<b>〜つづける</b> menyatakan bahwa suatu tindakan berlanjut terus-menerus tanpa henti. Ini adalah sufiks aspektual yang menandai kontinuitas — kebalikan dari penyelesaian (おわる) atau permulaan (はじめる). Dapat dipakai untuk tindakan yang disengaja maupun kondisi yang berlangsung terus.',
  nuance: '〜つづける vs 〜ている: つづける = berlanjut terus-menerus dengan penekanan eksplisit bahwa tidak berhenti; ている = sedang berlangsung atau kebiasaan (lebih netral). Contoh: 雨が降りつづいている (hujan terus-terusan turun — penekanan pada tanpa henti) vs 雨が降っている (hujan sedang turun — netral). つづける memberikan tekanan pada durasi yang tidak terputus, sering dikombinasikan dengan ずっと untuk memperkuat makna.',
  examples: [
    { jp: '雨が3日間降り<b>つづけた</b>。', id: 'Hujan terus turun selama 3 hari berturut-turut tanpa henti.' },
    { jp: '諦めずに練習し<b>つづけた</b>結果、大会で優勝できた。', id: 'Berkat terus berlatih tanpa menyerah, aku bisa memenangkan kejuaraan.' },
  ],
  see_also_grammar: ['gn2-00292', 'gn2-00293'],
  see_also_vocab: [],
  confusion_pairs: [],
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
  nuance: '〜にわたる dipakai sebagai modifier sebelum nomina (長年にわたる交渉 = negosiasi yang berlangsung bertahun-tahun), sedangkan 〜にわたって dipakai sebagai adverbia untuk menerangkan verba (3日間にわたって行われた = dilaksanakan selama 3 hari). Pola ini berbeda dari 〜にかけて yang menyatakan rentang dari titik A ke titik B; にわたる menekankan cakupan menyeluruh di sepanjang rentang itu. Sering dipakai dalam tulisan formal, berita, dan laporan.',
  examples: [
    { jp: '交渉は3日間にわた<b>って</b>行われた。', id: 'Negosiasi berlangsung selama 3 hari penuh.' },
    { jp: 'この問題は広い地域にわた<b>る</b>環境被害を引き起こした。', id: 'Masalah ini menimbulkan kerusakan lingkungan yang mencakup wilayah yang sangat luas.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Sering dipakai dalam bahasa tulisan dan berita. にわたる (atributif sebelum N) vs にわたって (adverbial sebelum V).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00298', level: 'n2', pattern: '〜かける',
  reading: '〜kakeru',
  meaning: 'setengah jalan, hampir ..., mulai tapi belum selesai',
  cat: 'sequential-temporal',
  connection: 'V-masu-stem + かける',
  desc: '<b>〜かける</b> menyatakan bahwa suatu tindakan sudah dimulai tetapi belum selesai, atau hampir terjadi tetapi tidak jadi. Ada dua nuansa utama: (1) dalam proses tapi terganggu di tengah jalan (食べかける = sudah mulai makan tapi belum selesai); (2) hampir terjadi tapi tidak jadi/dicegah (死にかける = hampir mati, 言いかける = hampir mengatakan sesuatu tapi urung).',
  nuance: '〜かける vs 〜かけの (gn2-00299): かける dipakai sebagai verba (predikat), sedangkan かけの dipakai sebagai modifier atributif sebelum nomina. Contoh: 食べかけた (sudah mulai makan — predikat) vs 食べかけのケーキ (kue yang sudah dimakan sebagian — atributif). Keduanya menyatakan kondisi "setengah jalan," tetapi penggunaannya berbeda secara sintaktis.',
  examples: [
    { jp: '食べ<b>かけた</b>ところで電話が鳴って席を立った。', id: 'Tepat saat baru mau makan, telepon berbunyi dan aku berdiri dari kursi.' },
    { jp: '彼は事故で死に<b>かけた</b>が、奇跡的に助かった。', id: 'Dia hampir meninggal dalam kecelakaan itu, tapi ajaibnya selamat.' },
  ],
  see_also_grammar: ['gn2-00299'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00299'],
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
  nuance: '〜かけの selalu diikuti nomina (N), sedangkan 〜かける (gn2-00298) dipakai sebagai verba di posisi predikat. Contoh: 食べかけのケーキ (kue yang sudah dimakan sebagian) = かけの + N; 食べかけた (sudah mulai makan tapi belum selesai) = かける sebagai predikat. Bentuk ini sangat berguna untuk mendeskripsikan benda-benda yang tertinggal atau tidak selesai.',
  examples: [
    { jp: '読み<b>かけの</b>本を机の上に置いてきた。', id: 'Aku meninggalkan buku yang sedang dibaca di atas meja.' },
    { jp: '冷蔵庫に食べ<b>かけの</b>ケーキが残っている。', id: 'Di kulkas masih ada kue yang sudah dimakan sebagian.' },
  ],
  see_also_grammar: ['gn2-00298'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00298'],
  register: null, exceptions: null,
  notes: 'Selalu dipakai sebagai modifier sebelum nomina: 〜かけの + N.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00304', level: 'n2', pattern: '〜ところ(だ)',
  reading: '〜tokoro (da)',
  meaning: 'tepat ketika ..., saat ... (momen spesifik dalam suatu proses)',
  cat: 'sequential-temporal',
  connection: 'V-dict + ところ(だ) / V-te-iru + ところ(だ) / V-ta + ところ(だ)',
  desc: '<b>〜ところ(だ)</b> dipakai untuk menyatakan momen spesifik dari suatu tindakan berdasarkan tahap prosesnya. Tiga bentuk utama: (1) V-dict + ところ = "tepat akan melakukan" (belum mulai); (2) V-te-iru + ところ = "sedang melakukan saat ini"; (3) V-ta + ところ = "baru saja selesai melakukan."',
  nuance: '〜ところ adalah salah satu pola aspektual paling presisi dalam bahasa Jepang. Perbedaan waktu antar tiga bentuk sangat penting: 食べるところ (belum makan, tepat mau makan) vs 食べているところ (sedang makan sekarang) vs 食べたところ (baru saja selesai makan). Berbeda dari 〜もの (gn2-00303) yang lebih konseptual, ところ menyatakan titik waktu yang sangat spesifik dalam suatu proses. Bandingkan juga dengan 〜ところを (gn2-00305) yang dipakai dalam konteks "dilihat/dipergoki sedang melakukan."',
  examples: [
    { jp: '今から出かける<b>ところ</b>です。', id: 'Saya tepat mau berangkat sekarang.' },
    { jp: 'ちょうど夕食を食べている<b>ところ</b>なんだ。', id: 'Aku sedang makan malam ini sekarang.' },
  ],
  see_also_grammar: ['gn2-00303', 'gn2-00305'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00305', 'gn2-00303'],
  register: null, exceptions: null,
  notes: 'Tiga bentuk: V-dict + ところ (akan), V-て-いる + ところ (sedang), V-た + ところ (baru saja).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00305', level: 'n2', pattern: '〜ところを',
  reading: '〜tokoro wo',
  meaning: 'saat sedang ..., tepat ketika ... (momen yang dilihat atau menimpa seseorang)',
  cat: 'sequential-temporal',
  connection: 'V-te-iru + ところを / V-dict + ところを / V-ta + ところを',
  desc: '<b>〜ところを</b> dipakai untuk menyatakan saat atau momen ketika seseorang sedang melakukan sesuatu dan dilihat, ditangkap, atau dipergoki oleh pihak lain. Partikel を menunjukkan bahwa momen itu menjadi objek dari tindakan orang lain (melihat, menangkap, menghentikan, dsb.). Sering dipakai dalam konteks pengawasan, kejadian kebetulan, atau ekspresi sopan.',
  nuance: '〜ところを vs 〜ところ (gn2-00304): ところ = menyatakan tahap/momen tindakan secara mandiri; ところを = momen itu menjadi objek tindakan orang lain (dipergoki, dilihat, dihentikan). Contoh: 食べているところだ (sedang makan — mandiri) vs 食べているところを見られた (dipergoki sedang makan). Juga dipakai dalam ekspresi sopan: お忙しいところをすみません (maaf mengganggu di saat Anda sedang sibuk).',
  examples: [
    { jp: '試験中にカンニングしている<b>ところを</b>先生に見られた。', id: 'Aku ketahuan guru sedang menyontek di tengah ujian.' },
    { jp: 'お忙しい<b>ところを</b>、お時間をいただきありがとうございます。', id: 'Terima kasih sudah meluangkan waktu meski Anda sedang sibuk.' },
  ],
  see_also_grammar: ['gn2-00304'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00304'],
  register: null, exceptions: null,
  notes: 'Ekspresi sopan umum: お忙しいところを申し訳ありません / すみません.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── VERB-FORMS (14) ───────────────────────────────────

{
    id: 'gn2-00009', level: 'n2', pattern: '〜を通じて / 〜を通して', reading: '〜wo tsuujite / tooshite',
    meaning: 'melalui ... / sepanjang ...',
    cat: 'verb-form',
    connection: 'N + を通じて / を通して',
    desc: '<b>〜を通じて</b> berarti "melalui suatu media/perantara" atau "sepanjang suatu periode". <b>を通して</b> lebih menekankan proses.',
    examples: [
      { jp: 'SNS<b>を通じて</b>、友達と連絡を取る。', id: 'Saya berkomunikasi dengan teman melalui media sosial.' },
      { jp: '一年<b>を通じて</b>、温暖な気候だ。', id: 'Sepanjang tahun, iklimnya hangat.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00021', level: 'n2', pattern: '〜ことにする', reading: '〜koto ni suru',
    meaning: 'memutuskan untuk ... / sengaja ...',
    cat: 'volitional-intention',
    connection: 'V-dict / V-ない + ことにする',
    desc: '<b>〜ことにする</b> menyatakan keputusan atau pilihan sadar dari pembicara.',
    examples: [
      { jp: '毎日運動する<b>ことにした</b>。', id: 'Saya memutuskan untuk olahraga setiap hari.' },
      { jp: 'お酒を飲まない<b>ことにしている</b>。', id: 'Saya sengaja tidak minum alkohol.' },
    ],
    see_also_grammar: ['gn2-00022'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00066', level: 'n2', pattern: '〜ことにしている', reading: '〜koto ni shite iru',
  meaning: 'saya membiasakan diri untuk ... / saya selalu ...',
  cat: 'volitional-intention',
  connection: 'V-dict / V-nai + ことにしている',
  desc: '<b>〜ことにしている</b> menyatakan kebiasaan atau kebijakan pribadi yang dibuat sendiri oleh pembicara secara sadar dan konsisten dijalankan.',
  nuance: 'Ini adalah keputusan dan kebiasaan yang berasal dari diri sendiri. Berbeda dari ことになっている yang merupakan aturan dari pihak luar.',
  examples: [
    { jp: '健康のために、毎朝30分歩く<b>ことにしている</b>。', id: 'Demi kesehatan, saya selalu berjalan kaki 30 menit setiap pagi.' },
    { jp: '寝る前にスマホを見ない<b>ことにしている</b>。', id: 'Saya membiasakan diri tidak melihat HP sebelum tidur.' },
    { jp: '食事は腹八分目に抑える<b>ことにしている</b>。', id: 'Saya selalu membatasi makan sampai sekitar 80% kenyang.' }
  ],
  see_also_grammar: ['gn2-00065'], see_also_vocab: [],
  confusion_pairs: ['gn2-00065'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00159', level: 'n2', pattern: '〜得る / 〜得ない',
  reading: '〜uri / 〜enai (atau: 〜eru / 〜enai)',
  meaning: '〜得る: bisa terjadi, ada kemungkinan | 〜得ない: tidak mungkin terjadi, mustahil',
  cat: 'potential',
  connection: 'V-stem + 得る (うる/える) / V-stem + 得ない (えない)',
  desc: '<b>〜得る</b> menyatakan kemungkinan bahwa sesuatu bisa terjadi atau bisa dilakukan dalam prinsipnya. Bentuk negatifnya <b>〜得ない</b> menyatakan kemustahilan yang mendasar. Sering digunakan dalam konteks formal dan akademik.',
  nuance: 'Berbeda dari できる (bisa secara kemampuan fisik/praktis) — 得る menyatakan kemungkinan logis atau teoritis, bukan kemampuan konkret. 得る dibaca うる dalam bentuk formal/tertulis dan える dalam percakapan. 得ない selalu dibaca えない.',
  examples: [
    { jp: 'そのような事態は十分に起こり<b>得る</b>。', id: 'Situasi seperti itu sangat mungkin terjadi.' },
    { jp: '一人の人間があらゆることを知ることは<b>あり得ない</b>。', id: 'Tidak mungkin seorang manusia mengetahui segalanya.' }
  ],
  see_also_grammar: ['gn2-00160'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: '得る dibaca うる (formal/tulisan) atau える (bicara). 得ない selalu えない.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00231', level: 'n2', pattern: '〜まい',
  reading: '〜mai',
  meaning: 'tidak akan ... / tidak berniat ... (negatif volitional)',
  cat: 'volitional-intention',
  connection: 'V-dict (Gr.1&2) + まい / V-masu-stem (Gr.2, opsional) + まい',
  desc: '<b>〜まい</b> adalah bentuk negatif dari volitional — menyatakan tekad atau niat untuk tidak melakukan sesuatu, atau perkiraan bahwa sesuatu tidak akan terjadi. Merupakan ekspresi formal atau bernuansa sastra.',
  nuance: 'Berbeda dari ないだろう yang hanya merupakan perkiraan — まい mengandung nuansa tekad atau kesadaran kuat dari pembicara. Untuk kata kerja ichidan (Gr.2), bisa pakai bentuk dict + まい atau masu-stem + まい (食べるまい atau 食べまい). Untuk する bisa jadi すまい atau しまい. Jarang dipakai dalam percakapan biasa — lebih sering dalam tulisan atau pidato.',
  examples: [
    { jp: 'あんな失敗は二度とする<b>まい</b>と心に誓った。', id: 'Aku berjanji dalam hati untuk tidak mengulangi kesalahan seperti itu lagi.' },
    { jp: '彼はもう来る<b>まい</b>と思っていた。', id: 'Dia pikir dia tidak akan datang lagi.' },
  ],
  see_also_grammar: ['gn2-00230', 'gn2-00232'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: 'する → すまい / しまい; くる → くるまい / こまい', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00282', level: 'n2', pattern: '〜きれない',
  reading: '〜kirenai',
  meaning: 'tidak bisa menyelesaikan semua ..., terlalu banyak untuk ...',
  cat: 'potential',
  connection: 'V-masu-stem + きれない',
  desc: '<b>〜きれない</b> adalah bentuk negatif potensial dari 〜きる, menyatakan bahwa seseorang tidak mampu menyelesaikan atau menghabiskan sesuatu secara penuh — karena terlalu banyak, terlalu berat, atau melampaui kemampuan. Bentuk ini sangat umum dan ekspresif dalam percakapan sehari-hari.',
  nuance: '〜きれない berbeda dari ただ「できない」(tidak bisa) karena menekankan bahwa ketidakmampuan disebabkan oleh kelebihan kapasitas atau beban berlebih, bukan sekadar kurang kemampuan. Contoh: 食べられない = tidak bisa makan (karena alergi dsb.); 食べきれない = tidak bisa menghabiskan (karena terlalu banyak). Juga dipakai dalam konteks emosional: 忘れきれない (tidak bisa benar-benar melupakan).',
  examples: [
    { jp: 'こんなにたくさんの料理、とても食べ<b>きれない</b>。', id: 'Makanan sebanyak ini sungguh tidak bisa aku habiskan semuanya.' },
    { jp: '彼女への気持ちがまだ忘れ<b>きれない</b>。', id: 'Perasaanku padanya masih belum bisa benar-benar kulupakan.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00283'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00283'],
  register: null, exceptions: null,
  notes: 'Bentuk negatif potensial dari きる. Versi afirmatif: gn2-00283 〜きれる.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00283', level: 'n2', pattern: '〜きれる',
  reading: '〜kireru',
  meaning: 'bisa menyelesaikan ..., mampu sampai tuntas',
  cat: 'potential',
  connection: 'V-masu-stem + きれる',
  desc: '<b>〜きれる</b> adalah bentuk potensial dari 〜きる, menyatakan bahwa seseorang mampu menyelesaikan atau menghabiskan sesuatu secara penuh dan tuntas. Sering dipakai dalam konteks pertanyaan atau pernyataan tentang kemampuan menyelesaikan sesuatu yang tampaknya banyak atau sulit.',
  nuance: '〜きれる adalah pasangan potensial afirmatif dari 〜きれない (gn2-00282). Dalam percakapan, 〜きれる sering dipakai dengan nada ragu-ragu (kira-kira, mungkin bisa?) atau untuk menyatakan bahwa ya, semuanya bisa diselesaikan. Perbedaan dengan 〜できる: きれる menekankan "menghabiskan/menuntaskan semuanya," sementara できる hanya menyatakan kemampuan umum.',
  examples: [
    { jp: 'このケーキ、全部食べ<b>きれる</b>かな？量が多いけど。', id: 'Kue ini bisa dihabiskan semuanya tidak ya? Porsinya banyak soalnya.' },
    { jp: '一日でこの仕事を片付け<b>きれる</b>と思う。', id: 'Aku rasa bisa membereskan semua pekerjaan ini dalam satu hari.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00282'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00282'],
  register: null, exceptions: null,
  notes: 'Bentuk potensial afirmatif dari きる. Versi negatif: gn2-00282 〜きれない.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00289', level: 'n2', pattern: '〜こなす',
  reading: '〜konasu',
  meaning: 'berhasil menangani, menguasai (dengan terampil)',
  cat: 'verb-form',
  connection: 'V-masu-stem + こなす',
  desc: '<b>〜こなす</b> menyatakan bahwa seseorang berhasil menangani atau menguasai sesuatu yang sulit atau kompleks dengan terampil. Tidak hanya selesai, tapi selesai dengan baik dan kompeten. Dipakai untuk menggambarkan keterampilan dalam menggunakan alat, bahasa, atau menyelesaikan tugas-tugas yang menantang.',
  nuance: '〜こなす berbeda dari 〜きる (gn2-00281) (tuntas/habis) dan 〜あげる (gn2-00287) (selesai membuat): こなす menekankan kualitas penanganan dan keahlian, bukan sekadar kuantitas atau penyelesaian. 使いこなす = menggunakan dengan mahir (bukan sekadar menghabiskan). Pola ini cenderung memuji kemampuan seseorang dalam menaklukkan sesuatu yang sulit.',
  examples: [
    { jp: '新しいソフトをやっと使い<b>こなせる</b>ようになった。', id: 'Akhirnya aku bisa menggunakan software baru itu dengan mahir.' },
    { jp: '彼はどんな仕事でも上手にこ<b>なす</b>。', id: 'Dia bisa menangani pekerjaan apapun dengan terampil.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00287'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: '使いこなす (mahir menggunakan), 乗りこなす (mahir mengendarai) — semua berkonotasi kemampuan tinggi, bukan sekadar kuantitas.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00290', level: 'n2', pattern: '〜こむ',
  reading: '〜komu',
  meaning: 'masuk ke dalam, melakukan secara intensif/mendalam',
  cat: 'verb-form',
  connection: 'V-masu-stem + こむ',
  desc: '<b>〜こむ</b> sebagai sufiks verba majemuk mengandung dua makna utama: (1) masuk ke dalam suatu ruang atau kondisi secara fisik (押し込む, 飛び込む); dan (2) melakukan sesuatu secara intensif, mendalam, atau hingga terbenam — termasuk keyakinan atau pemikiran yang tertanam kuat (思い込む, 信じ込む). Sufiks ini sangat produktif dalam bahasa Jepang.',
  nuance: '〜こむ memiliki berbagai penggunaan yang luas. Tiga makna utama: (1) fisik — memasukkan ke dalam: 押し込む (mendorong masuk), 詰め込む (memasukkan penuh-penuh); (2) kognitif/emosional — terlanjur percaya atau terbenam: 思い込む (sudah terlanjur yakin), 信じ込む (percaya sungguh-sungguh); (3) intensitas — melakukan secara penuh/banyak: 書き込む (menulis lengkap di dalamnya). Konteks menentukan makna mana yang berlaku.',
  examples: [
    { jp: '彼は自分が絶対に正しいと思い<b>こんでいる</b>。', id: 'Dia sudah terlanjur yakin sekali bahwa dirinya pasti benar.' },
    { jp: 'ノートにポイントをしっかり書き<b>こんで</b>おいた。', id: 'Aku sudah menuliskan poin-poin penting secara lengkap di buku catatan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Verba umum dengan こむ: 思い込む, 押し込む, 書き込む, 詰め込む, 飛び込む — masing-masing dengan nuansa yang berbeda.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00295', level: 'n2', pattern: '〜かえる',
  reading: '〜kaeru',
  meaning: 'melakukan balik/kembali, mengubah dengan cara yang berbeda',
  cat: 'verb-form',
  connection: 'V-masu-stem + かえる',
  desc: '<b>〜かえる</b> sebagai sufiks verba majemuk menyatakan bahwa suatu tindakan dilakukan kembali dengan cara yang berbeda atau berlawanan, atau mengubah sesuatu melalui tindakan yang diulang. Contoh: 言いかえる (mengatakan ulang dengan kata lain/mengoreksi ucapan), 考えかえす (memikirkan kembali).',
  nuance: '〜かえる vs 〜なおす (gn2-00296): Keduanya menyatakan "melakukan ulang," tetapi berbeda nuansa. かえる = mengubah isi/cara dari sesuatu yang sudah dilakukan (sering dengan koreksi atau pembalikan arah); なおす = memperbaiki yang salah dengan mengulang karena ada kesalahan yang jelas. 言いかえる = mengatakan ulang dengan kata lain (tidak selalu karena salah); 言いなおす = mengatakan ulang karena salah/tidak jelas.',
  examples: [
    { jp: '難しい専門用語を分かりやすく言い<b>かえた</b>。', id: 'Istilah teknis yang sulit diubah menjadi ungkapan yang lebih mudah dipahami.' },
    { jp: '一度決めたことを急に言い<b>かえる</b>のは信頼を損なう。', id: 'Tiba-tiba mengubah apa yang sudah diputuskan dapat merusak kepercayaan.' },
  ],
  see_also_grammar: ['gn2-00296', 'gn2-00300'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00296', 'gn2-00301'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00296', level: 'n2', pattern: '〜なおす',
  reading: '〜naosu',
  meaning: 'melakukan ulang, memperbaiki dengan melakukan lagi',
  cat: 'verb-form',
  connection: 'V-masu-stem + なおす',
  desc: '<b>〜なおす</b> menyatakan bahwa suatu tindakan dilakukan ulang untuk memperbaiki kesalahan atau hasil yang tidak memuaskan sebelumnya. Nuansanya adalah "melakukan lagi karena yang pertama salah atau kurang baik." Sangat produktif dan umum dipakai dalam situasi pekerjaan, tulisan, dan koreksi.',
  nuance: '〜なおす vs 〜かえる (gn2-00295): なおす = melakukan ulang karena ada kesalahan yang harus diperbaiki (motivasi perbaikan yang jelas); かえる = mengubah atau melakukan kembali, tidak selalu karena kesalahan — bisa karena perubahan keputusan atau cara penyampaian. 書きなおす = menulis ulang karena ada yang salah; 書きかえる = menulis ulang dengan konten atau cara yang berbeda.',
  examples: [
    { jp: '間違えた箇所を全部書き<b>なおした</b>。', id: 'Aku menulis ulang semua bagian yang salah.' },
    { jp: 'このコードにバグがあるので書き<b>なおす</b>必要がある。', id: 'Kode ini ada bug-nya, jadi perlu ditulis ulang.' },
  ],
  see_also_grammar: ['gn2-00295'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00295'],
  register: null, exceptions: null,
  notes: 'Verba umum: 書きなおす, 作りなおす, やりなおす, 読みなおす.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00300', level: 'n2', pattern: '〜もどる / 〜にもどる',
  reading: '〜modoru / 〜ni modoru',
  meaning: 'kembali ke keadaan semula, kembali lagi ke ...',
  cat: 'verb-form',
  connection: 'V-masu-stem + もどる / N + にもどる',
  desc: '<b>〜もどる</b> sebagai sufiks verba majemuk atau pola gramatikal menyatakan kembali ke kondisi, tempat, atau keadaan sebelumnya. Dipakai baik sebagai sufiks (引きもどる = kembali mundur) maupun sebagai pola 〜にもどる (kembali ke N — kondisi/topik/tempat).',
  nuance: '〜もどる vs 〜かえる (gn2-00295): もどる = kembali ke titik/kondisi asal (reversi, memulihkan ke keadaan semula); かえる = mengubah dengan cara yang berbeda (transformasi). Contoh: 元にもどる (kembali ke kondisi semula — reversi); 言いかえる (mengatakan dengan cara berbeda — perubahan). Dalam percakapan, にもどる sering dipakai saat topik diskusi kembali ke pokok bahasan.',
  examples: [
    { jp: '本題に<b>もどり</b>ましょう。', id: 'Mari kembali ke topik utama.' },
    { jp: '元の状態に<b>もどる</b>のに1週間かかった。', id: 'Butuh waktu satu minggu untuk kembali ke kondisi semula.' },
  ],
  see_also_grammar: ['gn2-00295', 'gn2-00296'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: '引きもどす (menarik kembali — transitif) vs 引きもどる (kembali — intransitif).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00301', level: 'n2', pattern: '〜かわる / 代わる代わる',
  reading: '〜kawaru / かわるがわる',
  meaning: 'bergantian melakukan, berubah (sebagai verba majemuk)',
  cat: 'verb-form',
  connection: 'V-masu-stem + かわる / 代わる代わる (idiom adverbia)',
  desc: '<b>〜かわる</b> sebagai sufiks verba majemuk menyatakan adanya perubahan atau pergantian dalam konteks tindakan yang dilakukan. Contoh: 入れかわる (silih berganti/bertukar posisi), 移りかわる (berubah seiring waktu). Bentuk idiomatis <b>代わる代わる (かわるがわる)</b> berarti "bergantian satu per satu" dan dipakai sebagai adverbia.',
  nuance: '〜かわる berbeda dari 〜かえる (gn2-00295): かわる adalah verba intransitif (sesuatu berubah atau terjadi pergantian dengan sendirinya), sedangkan かえる adalah transitif (seseorang mengubah sesuatu). 入れかわる (mereka bertukar tempat — intransitif) vs 入れかえる (aku menukar mereka — transitif). 代わる代わる/かわるがわる dipakai sebagai adverbia: 代わる代わる当番をする (melakukan piket secara bergantian).',
  examples: [
    { jp: 'リーダーが次々と入れ<b>かわって</b>、組織が混乱した。', id: 'Pemimpin silih berganti, sehingga organisasi menjadi kacau.' },
    { jp: '子供たちが<b>代わる代わる</b>（かわるがわる）ゲームをした。', id: 'Para anak-anak bermain game secara bergantian.' },
  ],
  see_also_grammar: ['gn2-00295'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00295'],
  register: null, exceptions: null,
  notes: '入れかわる (intransitif) vs 入れかえる (transitif) — pasangan intransitif-transitif penting.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00302', level: 'n2', pattern: '〜あう',
  reading: '〜au',
  meaning: 'saling melakukan, melakukan bersama-sama (resiprok)',
  cat: 'verb-form',
  connection: 'V-masu-stem + あう',
  desc: '<b>〜あう</b> menyatakan bahwa suatu tindakan dilakukan secara timbal balik antara dua pihak atau lebih — artinya, kedua pihak melakukan tindakan yang sama terhadap satu sama lain. Ini adalah sufiks resiprok dalam bahasa Jepang. Contoh: 助けあう (saling membantu), 愛しあう (saling mencintai), 話しあう (saling berbicara/berdiskusi).',
  nuance: '〜あう menyatakan resiprositas wajib — kedua pihak terlibat aktif. Berbeda dari ずつ atau お互いに yang hanya adverbia, 〜あう mengubah verba secara gramatikal menjadi "saling V." Perhatikan bahwa beberapa ungkapan dengan あう sudah terleksikalisasi dan maknanya tidak lagi terasa "saling": 間に合う (tepat waktu), 付き合う (bergaul). Dalam percakapan, 〜あう sering dikombinasikan dengan お互いに untuk memperkuat makna.',
  examples: [
    { jp: '困ったときは助け<b>あう</b>のが大切だ。', id: 'Di saat susah, saling membantu itu hal yang penting.' },
    { jp: '二人は長時間話し<b>あった</b>結果、和解できた。', id: 'Setelah berbicara panjang lebar satu sama lain, keduanya berhasil berdamai.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Verba umum: 助けあう, 話しあう, 愛しあう, 競いあう, 支えあう.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── CONDITIONALS (18) ───────────────────────────────────

{
    id: 'gn2-00006', level: 'n2', pattern: '〜上で', reading: '〜ue de',
    meaning: 'setelah ... / dalam hal ... / dari segi ...',
    cat: 'conditional-tara',
    connection: 'V-た / N + の + 上で',
    desc: '<b>〜上で</b> memiliki dua makna: (1) setelah melakukan sesuatu sebagai syarat; (2) dari segi / dalam konteks.',
    examples: [
      { jp: 'よく考えた<b>上で</b>、決めてください。', id: 'Setelah berpikir baik-baik, silakan putuskan.' },
      { jp: '仕事の<b>上で</b>の悩みを話した。', id: 'Saya berbicara tentang masalah dalam pekerjaan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00019', level: 'n2', pattern: '〜次第', reading: '〜shidai',
    meaning: '(1) segera setelah ... (2) tergantung pada ...',
    cat: 'conditional-tara',
    connection: 'V-stem / N + 次第',
    desc: '<b>〜次第</b> bermakna ganda: (1) segera setelah tindakan selesai; (2) bergantung pada kondisi yang disebutkan.',
    examples: [
      { jp: '準備ができ<b>次第</b>、出発します。', id: 'Segera setelah persiapan selesai, kami akan berangkat.' },
      { jp: '結果<b>次第</b>で、方針が変わります。', id: 'Kebijakan akan berubah tergantung pada hasilnya.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00047', level: 'n2', pattern: '〜さえ〜ば', reading: '〜sae 〜ba',
  meaning: 'asalkan ... / kalau saja ... (satu syarat cukup)',
  cat: 'conditional-tara',
  connection: 'N + さえ + V-ba / Adj-kereba / N + でさえあれば',
  desc: '<b>〜さえ〜ば</b> menyatakan bahwa jika satu syarat kunci terpenuhi, maka segalanya akan baik-baik saja. Satu kondisi itu sudah cukup untuk menghasilkan hasil yang diharapkan.',
  nuance: 'Menekankan bahwa syarat yang disebutkan adalah satu-satunya yang diperlukan. Berbeda dari さえ〜ても yang mengungkapkan kondisi ekstrem tetapi hasilnya tetap berlawanan.',
  examples: [
    { jp: 'お金<b>さえ</b>あれ<b>ば</b>、何でもできる。', id: 'Asalkan ada uang, apa pun bisa dilakukan.' },
    { jp: '健康<b>でさえあれば</b>、それで十分だ。', id: 'Asalkan sehat, itu sudah cukup.' },
    { jp: '彼が来て<b>さえくれれば</b>、問題ない。', id: 'Asalkan dia mau datang, tidak ada masalah.' }
  ],
  see_also_grammar: ['gn2-00048'], see_also_vocab: [],
  confusion_pairs: ['gn2-00048'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00054', level: 'n2', pattern: '〜次第で', reading: '〜shidai de',
  meaning: 'tergantung pada ... (hasilnya bisa berbeda)',
  cat: 'conditional-tara',
  connection: 'N + 次第で / 次第では',
  desc: '<b>〜次第で</b> menyatakan bahwa hasil atau kondisi akhir sepenuhnya ditentukan oleh faktor yang disebutkan. Faktor itu menjadi penentu utama.',
  nuance: 'Menekankan variabilitas hasil bergantung pada satu faktor. Berbeda dari 次第だ (kesimpulan/penjelasan keadaan) — 次第で selalu diikuti kondisi atau akibat yang berubah-ubah.',
  examples: [
    { jp: '努力<b>次第で</b>、結果は変わる。', id: 'Tergantung pada usaha, hasilnya bisa berubah.' },
    { jp: '天気<b>次第で</b>、ピクニックを中止するかもしれない。', id: 'Tergantung cuaca, piknik mungkin akan dibatalkan.' },
    { jp: '返事<b>次第では</b>、計画を変更する必要がある。', id: 'Tergantung jawabannya, mungkin perlu mengubah rencana.' }
  ],
  see_also_grammar: ['gn2-00055'], see_also_vocab: [],
  confusion_pairs: ['gn2-00055'],
  register: null, exceptions: null, notes: '次第では (dengan は) menambah nuansa kondisional yang lebih kuat — "kalau sampai ..."',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00089', level: 'n2', pattern: '〜とあれば', reading: '〜to areba',
  meaning: 'kalau memang ... — rela melakukan apapun / demi ...',
  cat: 'conditional-tara',
  connection: 'V-plain / N + とあれば',
  desc: '<b>〜とあれば</b> menyatakan bahwa jika suatu kondisi tertentu terpenuhi, pembicara rela atau bersedia melakukan apa saja. Biasanya mengungkapkan kesediaan atau pengorbanan yang kuat.',
  nuance: 'Lebih kuat dari なら. Menyiratkan "apapun akan saya lakukan demi ...". Sering digunakan untuk mengungkapkan kesetiaan, dedikasi, atau pengorbanan tanpa syarat.',
  examples: [
    { jp: '君のため<b>とあれば</b>、何でもするよ。', id: 'Kalau memang demi kamu, aku akan lakukan apa saja.' },
    { jp: '会社の存続<b>とあれば</b>、給料カットも仕方がない。', id: 'Kalau memang demi kelangsungan perusahaan, pemotongan gaji pun tidak apa-apa.' },
    { jp: '子供のため<b>とあれば</b>、親は何でも惜しまない。', id: 'Kalau demi anak, orang tua tidak akan segan melakukan apapun.' }
  ],
  see_also_grammar: ['gn2-00090'], see_also_vocab: [],
  confusion_pairs: ['gn2-00090'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00090', level: 'n2', pattern: '〜とあっては', reading: '〜to atte wa',
  meaning: 'dalam kondisi seperti ini ... / mengingat keadaan yang ...',
  cat: 'conditional-tara',
  connection: 'V-plain / N + とあっては',
  desc: '<b>〜とあっては</b> menyatakan bahwa mengingat kondisi atau situasi tertentu yang sudah ada, suatu konsekuensi logis tidak bisa dihindari.',
  nuance: 'Berbeda dari とあれば (kesediaan aktif dari dalam diri). とあっては menekankan tekanan dari situasi yang sudah ada — "menghadapi kenyataan ini, tidak ada pilihan lain selain ...".',
  examples: [
    { jp: '社長自らの命令<b>とあっては</b>、従わないわけにはいかない。', id: 'Mengingat ini perintah langsung dari presiden direktur, tidak ada pilihan selain mematuhi.' },
    { jp: 'これほどの非常事態<b>とあっては</b>、冷静でいるのは難しい。', id: 'Dalam kondisi darurat seserius ini, sulit untuk tetap tenang.' },
    { jp: '彼女の一言<b>とあっては</b>、断れない。', id: 'Kalau sudah kata-kata darinya, tidak bisa menolak.' }
  ],
  see_also_grammar: ['gn2-00089'], see_also_vocab: [],
  confusion_pairs: ['gn2-00089'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00099',
  level: 'n2',
  pattern: '〜いかんによって',
  reading: '〜ikan ni yotte',
  meaning: 'tergantung pada ... / bergantung bagaimana ...',
  cat: 'conditional-tara',
  connection: 'N + いかんによって / いかんによっては',
  desc: '<b>〜いかんによって</b> menyatakan bahwa hasil atau tindakan bergantung pada kondisi atau variabel tertentu yang disebutkan.',
  nuance: 'Kebalikan nuansa dari いかんにかかわらず: di sini kondisi MENENTUKAN hasil. Formal. いかんによっては (dengan は) menambahkan nuansa "ada kemungkinan tertentu bergantung pada kondisi".',
  examples: [
    { jp: '交渉の結果<b>いかんによっては</b>、契約を見直す可能性がある。', id: 'Tergantung hasil negosiasinya, ada kemungkinan kontrak perlu ditinjau ulang.' },
    { jp: '対応<b>いかんによって</b>、顧客の信頼を失うこともある。', id: 'Tergantung bagaimana penanganannya, kepercayaan pelanggan bisa hilang.' }
  ],
  see_also_grammar: ['gn2-00097'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00097'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00104',
  level: 'n2',
  pattern: '〜に応じて',
  reading: '〜ni ojite',
  meaning: 'sesuai dengan ... / menyesuaikan dengan ... / bergantung pada ...',
  cat: 'conditional-tara',
  connection: 'N + に応じて / に応じた (+ N)',
  desc: '<b>〜に応じて</b> menyatakan bahwa sesuatu berubah atau disesuaikan mengikuti kondisi, permintaan, atau situasi yang disebutkan.',
  nuance: 'Menekankan fleksibilitas atau penyesuaian: hasilnya bervariasi tergantung X. Sangat umum dalam konteks bisnis, regulasi, dan pendidikan. Bedakan dengan に基づいて (berdasarkan) — に応じて lebih menekankan dinamika penyesuaian.',
  examples: [
    { jp: '状況<b>に応じて</b>対応を変える必要がある。', id: 'Perlu mengubah respons sesuai situasi yang berkembang.' },
    { jp: '収入<b>に応じて</b>税額が決まります。', id: 'Jumlah pajak ditentukan sesuai pendapatan.' }
  ],
  see_also_grammar: ['gn2-00105', 'gn2-00099'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00105'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00105',
  level: 'n2',
  pattern: '〜に応じた',
  reading: '〜ni ojita',
  meaning: 'yang disesuaikan dengan ... / yang sesuai dengan ...',
  cat: 'conditional-tara',
  connection: 'N + に応じた + N (bentuk atributif)',
  desc: '<b>〜に応じた</b> adalah bentuk atributif (prenominal) dari に応じて, digunakan langsung sebelum nomina untuk menyatakan "N yang disesuaikan dengan X".',
  nuance: 'Secara semantis sama dengan に応じて, tapi posisinya adalah modifier nomina. Sangat umum dalam konteks kebijakan, pendidikan, dan layanan. Pelajar sering lupa bahwa bentuk atributif memakai た, bukan て.',
  examples: [
    { jp: '個人の能力<b>に応じた</b>学習計画を作成してください。', id: 'Tolong buat rencana belajar yang disesuaikan dengan kemampuan masing-masing individu.' },
    { jp: 'ニーズ<b>に応じた</b>サービスを提供することが重要だ。', id: 'Penting untuk menyediakan layanan yang disesuaikan dengan kebutuhan pelanggan.' }
  ],
  see_also_grammar: ['gn2-00104'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00104'],
  register: null,
  exceptions: null,
  notes: '〜に応じた adalah bentuk adjektival dari に応じて. Selalu diikuti nomina, bukan predikat.',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00187', level: 'n2', pattern: '〜ようでは',
  reading: '〜you de wa',
  meaning: 'kalau sampai ..., kalau kondisinya seperti itu ...',
  cat: 'conditional-tara',
  connection: 'V-plain + ようでは / い-Adj-plain + ようでは / N + の + ようでは',
  desc: '<b>〜ようでは</b> menyatakan kondisi hipotetis yang tidak diinginkan sebagai dasar untuk penilaian negatif atau peringatan. Mengungkapkan bahwa jika kondisi demikian memang terjadi, maka hasilnya akan bermasalah.',
  nuance: 'Sering diikuti oleh kalimat berisi penilaian negatif, peringatan, atau konsekuensi buruk. Berbeda dari たら/なら (kondisional umum) — ようでは mengandung nuansa evaluatif: "kalau sampai kondisi seburuk itu terjadi, ada sesuatu yang serius." Sering digunakan oleh atasan atau orang yang lebih tua.',
  examples: [
    { jp: 'こんな簡単な問題も解けない<b>ようでは</b>、試験は無理だ。', id: 'Kalau soal semudah ini saja tidak bisa diselesaikan, ujiannya tidak akan berhasil.' },
    { jp: '部下の名前も覚えていない<b>ようでは</b>、リーダーとして失格だ。', id: 'Kalau sampai nama bawahannya sendiri tidak hafal, itu tidak layak sebagai pemimpin.' }
  ],
  see_also_grammar: ['gn2-00188'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00188'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00188', level: 'n2', pattern: '〜ようでは困る',
  reading: '〜you de wa komaru',
  meaning: 'tidak baik kalau sampai ..., tidak bisa dibiarkan kalau ...',
  cat: 'conditional-tara',
  connection: 'V-plain + ようでは困る / い-Adj-plain + ようでは困る',
  desc: '<b>〜ようでは困る</b> adalah pola spesifik dari ようでは yang diikuti 困る — menyatakan bahwa suatu kondisi atau perilaku yang disebutkan tidak bisa diterima atau bermasalah. Sering digunakan untuk menyampaikan ketidakpuasan atau peringatan kepada orang yang dinilai.',
  nuance: 'Pada dasarnya adalah ようでは + ekspresi konsekuensi negatif 困る. Digunakan dalam konteks evaluasi atau teguran — lebih spesifik dan langsung dari ようでは + kalimat umum. Sering terdengar dalam percakapan atasan ke bawahan atau guru ke murid.',
  examples: [
    { jp: '毎回遅刻する<b>ようでは困る</b>。', id: 'Tidak bisa dibiarkan kalau setiap kali selalu datang terlambat.' },
    { jp: '指示を一度しか言わないのに聞いていない<b>ようでは困る</b>。', id: 'Tidak baik kalau instruksi yang hanya disampaikan sekali saja tidak diperhatikan.' }
  ],
  see_also_grammar: ['gn2-00187'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00187'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00198',
  level: 'n2',
  pattern: '〜を条件に',
  reading: '~wo jouken ni',
  meaning: 'dengan syarat ..., asalkan ...',
  cat: 'conditional-tara',
  connection: 'N + を条件に(して) / V-plain + ことを条件に',
  desc: '<b>〜を条件に</b> menyatakan bahwa suatu tindakan atau persetujuan baru akan berlaku jika syarat tertentu terpenuhi. Syarat ini bersifat aktif dan harus benar-benar dipenuhi — berbeda dari asumsi yang sudah diterima. Pola ini sering muncul dalam konteks negosiasi, perjanjian, atau izin.',
  nuance: 'Berbeda dengan 〜を前提に (gn2-00197) yang menyatakan asumsi yang sudah dianggap ada, 〜を条件に menyatakan syarat yang harus dipenuhi terlebih dahulu agar sesuatu bisa terjadi. Nuansanya lebih tegas dan kondisional — ada tawar-menawar atau kesepakatan yang sedang dibentuk.',
  examples: [
    { jp: '毎日練習すること<b>を条件に</b>、チームへの入部を許可した。', id: 'Dengan syarat berlatih setiap hari, dia diizinkan masuk tim.' },
    { jp: '秘密を守ること<b>を条件に</b>、話してあげた。', id: 'Asalkan merahasiakannya, saya ceritakan kepadanya.' },
    { jp: '給料の引き上げ<b>を条件に</b>、残業に応じた。', id: 'Dengan syarat kenaikan gaji, dia menyetujui lembur.' },
  ],
  see_also_grammar: ['gn2-00197'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00220',
  level: 'n2',
  pattern: '〜次第で',
  reading: '~shidai de',
  meaning: 'tergantung pada ..., bergantung pada ...',
  cat: 'conditional-tara',
  connection: 'N + 次第で / 次第だ / 次第では',
  desc: '<b>〜次第で</b> menyatakan bahwa hasil atau kondisi sepenuhnya bergantung pada hal yang disebutkan. Mengandung makna bahwa faktor tersebut adalah penentu yang krusial — jika berbeda, hasilnya pun akan berbeda. Bentuk 〜次第では menambahkan nuansa "tergantung pada situasinya, bisa jadi...".',
  nuance: 'Berbeda dengan 〜によって (tergantung — lebih umum dan deskriptif), 〜次第で mengandung nuansa bahwa pembicara menekankan betapa pentingnya faktor penentu tersebut — sering bermakna "semuanya tergantung pada". Berbeda juga dengan 〜しだいだ yang menyatakan "tergantung, bukan wewenang saya". Perhatikan konteks untuk membedakan keduanya.',
  examples: [
    { jp: '努力<b>次第で</b>、結果は変わる。', id: 'Hasilnya akan berubah tergantung pada usaha yang dilakukan.' },
    { jp: 'やり方<b>次第で</b>、うまくいくこともある。', id: 'Tergantung caranya, bisa saja berhasil.' },
    { jp: '状況<b>次第では</b>、計画を変更する可能性もある。', id: 'Tergantung situasi, ada kemungkinan rencana akan diubah.' },
  ],
  see_also_grammar: ['gn2-00195'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: '〜次第では = 「場合によっては」のニュアンスが加わる。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00222', level: 'n2', pattern: '〜とあれば',
  reading: '〜to areba',
  meaning: 'kalau memang ... / jika situasinya demikian maka (rela melakukan)',
  cat: 'conditional-tara',
  connection: 'N / phrase + とあれば',
  desc: '<b>〜とあれば</b> menyatakan bahwa jika kondisi atau alasan yang disebutkan terpenuhi, maka pembicara bersedia atau merasa harus melakukan sesuatu. Mengandung nuansa kerelaan atau dorongan kuat karena situasinya.',
  nuance: 'Berbeda dari とあっては (gn2-00223) — とあれば lebih menekankan kerelaan/kesediaan sebagai respons terhadap kondisi tertentu. Sering digunakan dalam makna "demi ... saya siap melakukan apa saja." Berbeda dari なら yang lebih netral — とあれば mengimplikasikan kondisi yang luar biasa atau bermakna penting.',
  examples: [
    { jp: '子供のためと<b>あれば</b>、どんな苦労も厭わない。', id: 'Kalau memang demi anak, tidak ada kesulitan yang tidak rela aku tanggung.' },
    { jp: '彼女の頼みと<b>あれば</b>、断れない。', id: 'Kalau memang itu permintaannya, aku tidak bisa menolak.' },
  ],
  see_also_grammar: ['gn2-00223', 'gn2-00224'], see_also_vocab: [],
  confusion_pairs: ['gn2-00223'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00240', level: 'n2', pattern: '〜いかん',
  reading: '〜ikan',
  meaning: 'tergantung bagaimana / bergantung pada ... (formal)',
  cat: 'conditional-tara',
  connection: 'N + いかん',
  desc: '<b>〜いかん</b> menyatakan bahwa sesuatu bergantung pada kondisi atau cara yang disebutkan. Merupakan ekspresi formal yang sering muncul dalam konteks administratif, hukum, atau tulisan resmi.',
  nuance: 'Setara dengan 〜次第 (しだい) dalam makna, namun いかん jauh lebih formal. Kata ini berasal dari 如何 yang berarti "bagaimana." Berbeda dari いかんによっては (gn2-00241) yang menekankan variasi kemungkinan — いかん lebih umum menyatakan ketergantungan tersebut.',
  examples: [
    { jp: '今後の対応<b>いかん</b>では、契約を解除することになる。', id: 'Tergantung bagaimana penanganan ke depannya, bisa saja kontrak dibatalkan.' },
    { jp: '結果<b>いかん</b>によって、次の対策を検討する。', id: 'Tergantung pada hasilnya, kami akan mempertimbangkan langkah selanjutnya.' },
  ],
  see_also_grammar: ['gn2-00241', 'gn2-00242', 'gn2-00243', 'gn2-00244'], see_also_vocab: [],
  confusion_pairs: ['gn2-00241', 'gn2-00244'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00241', level: 'n2', pattern: '〜いかんによっては',
  reading: '〜ikan ni yotte wa',
  meaning: 'tergantung bagaimana ... / bergantung pada kondisi/hasil ...',
  cat: 'conditional-tara',
  connection: 'N + いかんによっては',
  desc: '<b>〜いかんによっては</b> menyatakan bahwa bergantung pada kondisi atau hasilnya, konsekuensi tertentu mungkin terjadi. Menekankan bahwa ada kemungkinan perubahan atau variasi berdasarkan kondisi yang disebutkan.',
  nuance: 'Lebih spesifik dari いかん (gn2-00240) karena mengisyaratkan adanya kemungkinan tertentu yang bergantung pada kondisi. Sering digunakan dalam konteks ancaman halus, peringatan, atau pengambilan keputusan kondisional. Berbeda dari いかんにかかわらず (gn2-00242) yang justru menyatakan "tidak bergantung pada."',
  examples: [
    { jp: '検査の結果<b>いかんによっては</b>、入院が必要になるかもしれない。', id: 'Tergantung hasil pemeriksaan, mungkin diperlukan rawat inap.' },
    { jp: '今後の態度<b>いかんによっては</b>、処分を検討することになる。', id: 'Bergantung pada sikap ke depannya, akan dipertimbangkan sanksi.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00242', 'gn2-00243'], see_also_vocab: [],
  confusion_pairs: ['gn2-00240', 'gn2-00242', 'gn2-00243'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00243', level: 'n2', pattern: '〜いかんで',
  reading: '〜ikan de',
  meaning: 'tergantung pada ... / ditentukan oleh ... (formal/tertulis)',
  cat: 'conditional-tara',
  connection: 'N + いかんで',
  desc: '<b>〜いかんで</b> menyatakan bahwa sesuatu ditentukan atau dipengaruhi oleh kondisi yang disebutkan. Digunakan dalam konteks formal untuk menyatakan ketergantungan langsung pada suatu faktor.',
  nuance: 'Secara fungsi mirip dengan いかんによっては (gn2-00241), namun いかんで lebih menekankan hubungan kausal langsung — "X-lah yang menentukan Y." Sedikit lebih langsung dibanding いかんによっては yang lebih menekankan kemungkinan. Keduanya formal, namun いかんで sering dipakai dalam pernyataan singkat.',
  examples: [
    { jp: 'この交渉の成否は、あなたの判断<b>いかんで</b>決まる。', id: 'Berhasil atau tidaknya negosiasi ini ditentukan oleh keputusanmu.' },
    { jp: '今後の努力<b>いかんで</b>、昇進の可能性もある。', id: 'Tergantung pada usahamu ke depan, ada kemungkinan promosi jabatan.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00241', 'gn2-00244'], see_also_vocab: [],
  confusion_pairs: ['gn2-00241'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00244', level: 'n2', pattern: '〜如何',
  reading: '〜ikan (penulisan kanji resmi dari いかん)',
  meaning: 'tergantung pada ... (sangat formal/tertulis)',
  cat: 'conditional-tara',
  connection: 'N + 如何',
  desc: '<b>〜如何</b> adalah penulisan kanji dari いかん — digunakan dalam dokumen sangat formal seperti peraturan perusahaan, surat resmi, dan pengumuman pemerintah. Maknanya identik dengan いかんで dan いかんによっては, namun levelnya lebih tinggi.',
  nuance: '如何 dan いかん secara makna sama, namun 如何 hampir eksklusif muncul dalam tulisan resmi seperti hukum, peraturan, atau dokumen bisnis formal. Dalam percakapan, bentuk ini tidak pernah digunakan. Perhatian: 如何 juga bisa dibaca いかが (pertanyaan "bagaimana?") dalam konteks yang berbeda — beda pembacaan, beda makna.',
  examples: [
    { jp: '応募の合否は書類審査の結果<b>如何</b>による。', id: 'Diterima atau tidaknya lamaran bergantung pada hasil seleksi dokumen.' },
    { jp: '今後の対応<b>如何</b>では、法的措置も辞さない。', id: 'Tergantung penanganan ke depan, tindakan hukum pun tidak akan dihindari.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00243'], see_also_vocab: [],
  confusion_pairs: ['gn2-00240'],
  register: 'formal', exceptions: null, notes: '如何 juga dapat dibaca いかが (bagaimana?) dalam konteks lain — berbeda makna.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── MODALITY (53) ───────────────────────────────────

{
    id: 'gn2-00007', level: 'n2', pattern: '〜かねない', reading: '〜kanenai',
    meaning: 'bisa jadi ... (hal negatif) / ada kemungkinan ...',
    cat: 'conjecture-possibility',
    connection: 'V-stem + かねない',
    desc: '<b>〜かねない</b> mengungkapkan kemungkinan terjadinya sesuatu yang negatif atau tidak diinginkan.',
    examples: [
      { jp: 'こんな運転をしていたら、事故を起こし<b>かねない</b>。', id: 'Kalau mengemudi seperti ini, bisa jadi terjadi kecelakaan.' },
      { jp: '放っておくと、もっと悪化し<b>かねない</b>。', id: 'Kalau dibiarkan, bisa makin parah.' },
    ],
    see_also_grammar: ['gn2-00008'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00008', level: 'n2', pattern: '〜かねる', reading: '〜kaneru',
    meaning: 'tidak bisa (melakukan) ... / sulit untuk ...',
    cat: 'conjecture-possibility',
    connection: 'V-stem + かねる',
    desc: '<b>〜かねる</b> menyatakan bahwa secara psikologis atau moral pembicara tidak dapat atau sulit untuk melakukan sesuatu.',
    examples: [
      { jp: 'その要求には応じ<b>かねます</b>。', id: 'Kami sulit memenuhi permintaan tersebut.' },
      { jp: '一人では決め<b>かねます</b>。', id: 'Saya tidak bisa memutuskan sendiri.' },
    ],
    see_also_grammar: ['gn2-00007'], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

{
    id: 'gn2-00013', level: 'n2', pattern: '〜ばかりか', reading: '〜bakari ka',
    meaning: 'tidak hanya ... bahkan ...',
    cat: 'sentence-final-modality',
    connection: 'V/Adj plain / N + ばかりか',
    desc: '<b>〜ばかりか</b> menambahkan informasi yang mengejutkan atau melebihi ekspektasi dari apa yang disebutkan.',
    examples: [
      { jp: '彼は歌う<b>ばかりか</b>、踊ることもできる。', id: 'Tidak hanya menyanyi, dia bahkan bisa menari.' },
      { jp: '宿題を忘れた<b>ばかりか</b>、教科書まで忘れた。', id: 'Tidak hanya lupa PR, bahkan buku teksnya pun lupa.' },
    ],
    see_also_grammar: ['gn2-00014'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00017', level: 'n2', pattern: '〜わけにはいかない', reading: '〜wake ni wa ikanai',
    meaning: 'tidak mungkin (bisa) ... / tidak boleh ...',
    cat: 'obligation-necessity',
    connection: 'V-dict / V-ない + わけにはいかない',
    desc: '<b>〜わけにはいかない</b> menyatakan bahwa secara sosial, moral, atau situasional seseorang tidak bisa melakukan sesuatu.',
    examples: [
      { jp: '約束したから、行かない<b>わけにはいかない</b>。', id: 'Karena sudah berjanji, tidak mungkin tidak pergi.' },
      { jp: '試験前なのに、遊んでいる<b>わけにはいかない</b>。', id: 'Menjelang ujian, tidak boleh bermain-main.' },
    ],
    see_also_grammar: ['gn2-00016'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00018', level: 'n2', pattern: '〜に違いない', reading: '〜ni chigai nai',
    meaning: 'pasti ... / tidak salah lagi ...',
    cat: 'conjecture-possibility',
    connection: 'V/Adj plain / N + に違いない',
    desc: '<b>〜に違いない</b> menyatakan keyakinan kuat pembicara bahwa sesuatu pasti benar.',
    examples: [
      { jp: '彼が来ない<b>に違いない</b>。', id: 'Pasti dia tidak akan datang.' },
      { jp: 'この映画は面白い<b>に違いない</b>。', id: 'Film ini pasti menarik.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00020', level: 'n2', pattern: '〜てならない', reading: '〜te naranai',
    meaning: 'sangat ... / tidak tahan merasa ...',
    cat: 'sentence-final-modality',
    connection: 'V-te / い-Adj-くて / な-Adj-で + ならない',
    desc: '<b>〜てならない</b> mengungkapkan perasaan yang sangat kuat dan alami (tidak bisa ditahan) dari dalam diri.',
    examples: [
      { jp: '故郷が恋しく<b>てならない</b>。', id: 'Sangat merindukan kampung halaman.' },
      { jp: '彼のことが心配で<b>ならない</b>。', id: 'Sangat khawatir akan dia.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00022', level: 'n2', pattern: '〜ことになっている', reading: '〜koto ni natte iru',
    meaning: 'sudah ditetapkan bahwa ... / seharusnya ...',
    cat: 'obligation-necessity',
    connection: 'V-dict / V-ない + ことになっている',
    desc: '<b>〜ことになっている</b> menyatakan aturan, ketentuan, atau jadwal yang sudah ditetapkan dari luar.',
    examples: [
      { jp: '会議は9時に始まる<b>ことになっている</b>。', id: 'Rapat sudah ditetapkan mulai pukul 9.' },
      { jp: '社内ではスーツを着る<b>ことになっている</b>。', id: 'Di kantor, sudah menjadi aturan untuk memakai setelan.' },
    ],
    see_also_grammar: ['gn2-00021'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00029', level: 'n2', pattern: '〜ざるを得ない', reading: '〜zaru wo enai',
    meaning: 'terpaksa ... / tidak bisa tidak ...',
    cat: 'obligation-necessity',
    connection: 'V-ない-stem + ざるを得ない（例外: する→せざるを得ない）',
    desc: '<b>〜ざるを得ない</b> menyatakan bahwa pembicara terpaksa melakukan sesuatu karena tidak ada pilihan lain.',
    examples: [
      { jp: '事情があって、断らざるを得なかった。', id: 'Ada alasan, terpaksa harus menolak.' },
      { jp: '証拠があるから、認めざるを得ない。', id: 'Karena ada bukti, terpaksa harus mengakui.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: 'する → せざるを得ない', notes: null,
  },

{
  id: 'gn2-00043', level: 'n2', pattern: '〜によると / 〜によれば', reading: '〜ni yoru to / 〜ni yoreba',
  meaning: 'menurut ... (informasi dari sumber luar)',
  cat: 'hearsay-report',
  connection: 'N (sumber) + によると / によれば + [informasi] + そうだ / とのことだ',
  desc: '<b>〜によると</b> digunakan untuk menyampaikan informasi yang bersumber dari luar — berita, laporan, atau perkataan orang lain. Kalimat sering diakhiri dengan そうだ atau とのことだ.',
  nuance: 'Berbeda dari そうだ (hearsay) saja, によると secara eksplisit menyebutkan sumbernya. によれば sedikit lebih formal dan sering dipakai dalam berita atau tulisan.',
  examples: [
    { jp: '天気予報<b>によると</b>、明日は雨らしい。', id: 'Menurut prakiraan cuaca, besok sepertinya akan hujan.' },
    { jp: '彼女の話<b>によると</b>、会議は中止になったそうだ。', id: 'Menurut ceritanya, rapat katanya dibatalkan.' },
    { jp: '報告書<b>によれば</b>、売上は増加している。', id: 'Menurut laporan, penjualan sedang meningkat.' }
  ],
  see_also_grammar: ['gn2-00042'], see_also_vocab: [],
  confusion_pairs: ['gn2-00042'],
  register: null, exceptions: null, notes: 'によると dan によれば hampir sama; によれば sedikit lebih formal/tulisan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00055', level: 'n2', pattern: '〜次第だ / 〜次第です', reading: '〜shidai da / 〜shidai desu',
  meaning: 'sepenuhnya tergantung pada ... / itulah alasannya ...',
  cat: 'sentence-final-modality',
  connection: 'N + 次第だ / [penjelasan] + という次第だ',
  desc: '<b>〜次第だ</b> memiliki dua makna: (1) menyatakan bahwa sesuatu sepenuhnya bergantung pada faktor tertentu (akhir kalimat); (2) menjelaskan kronologi atau alasan keadaan saat ini.',
  nuance: 'Makna (2) — "という次第です" — sering dipakai dalam email formal atau laporan untuk menjelaskan latar belakang situasi. Terdengar sangat formal dan kaku dalam percakapan.',
  examples: [
    { jp: 'あとはあなた<b>次第だ</b>。', id: 'Sisanya sepenuhnya tergantung padamu.' },
    { jp: '成功するかどうかは努力<b>次第だ</b>。', id: 'Berhasil atau tidak sepenuhnya tergantung pada usaha.' },
    { jp: 'ご連絡が遅くなり、申し訳ない<b>という次第です</b>。', id: 'Itulah mengapa kami terlambat menghubungi Anda, kami mohon maaf.' }
  ],
  see_also_grammar: ['gn2-00054'], see_also_vocab: [],
  confusion_pairs: ['gn2-00054'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00061', level: 'n2', pattern: '〜ざるを得ない', reading: '〜zaru o enai',
  meaning: 'tidak bisa tidak ... / terpaksa ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ざるを得ない (する → せざるを得ない)',
  desc: '<b>〜ざるを得ない</b> mengungkapkan bahwa seseorang terpaksa melakukan sesuatu karena tidak ada pilihan lain — bukan karena keinginan sendiri.',
  nuance: 'Lebih kuat dari しなければならない. Menekankan ketidakberdayaan akibat tekanan dari luar. Berbeda dari ずにはいられない yang didorong oleh emosi dari dalam.',
  examples: [
    { jp: '電車が止まったので、タクシーで行か<b>ざるを得なかった</b>。', id: 'Karena kereta berhenti, terpaksa harus naik taksi.' },
    { jp: '体調が悪くて、会議を欠席せ<b>ざるを得ない</b>。', id: 'Badan tidak enak, terpaksa tidak hadir rapat.' },
    { jp: '証拠を見せられては、認め<b>ざるを得ない</b>。', id: 'Setelah diberi bukti, terpaksa harus mengakui.' }
  ],
  see_also_grammar: ['gn2-00072'], see_also_vocab: [],
  confusion_pairs: ['gn2-00072', 'gn2-00082'],
  register: null, exceptions: 'する → せざるを得ない (bukan しざる)', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00062', level: 'n2', pattern: '〜わけにはいかない', reading: '〜wake ni wa ikanai',
  meaning: 'tidak bisa melakukan ... / tidak mungkin melakukan ... (hambatan sosial atau moral)',
  cat: 'permission-prohibition',
  connection: 'V-dict / V-nai + わけにはいかない',
  desc: '<b>〜わけにはいかない</b> menyatakan bahwa sesuatu tidak bisa dilakukan karena ada hambatan sosial, moral, atau situasional — bukan karena ketidakmampuan fisik.',
  nuance: 'Berbeda dari できない (tidak mampu secara fisik/teknis). わけにはいかない menekankan "tidak pantas" atau "tidak mungkin dilakukan secara sosial/moral".',
  examples: [
    { jp: 'みんなが頑張っているのに、私だけ休む<b>わけにはいかない</b>。', id: 'Padahal semua sedang kerja keras, masa saya sendiri yang istirahat.' },
    { jp: '約束したから、断る<b>わけにはいかない</b>。', id: 'Karena sudah berjanji, tidak bisa menolak.' },
    { jp: 'ここで諦める<b>わけにはいかない</b>。', id: 'Di titik ini, tidak mungkin menyerah.' }
  ],
  see_also_grammar: ['gn2-00061'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00063', level: 'n2', pattern: '〜わけがない', reading: '〜wake ga nai',
  meaning: 'tidak mungkin ... (berdasarkan logika — nada heran)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + な + わけがない',
  desc: '<b>〜わけがない</b> digunakan untuk menyatakan bahwa sesuatu mustahil terjadi, berdasarkan penalaran logis pembicara. Sering membawa nuansa kaget atau tidak percaya.',
  nuance: 'Lebih emosional dari はずがない. わけがない terasa seperti "tidak masuk akal sama sekali!", sementara はずがない lebih dingin dan faktual.',
  examples: [
    { jp: '彼がそんなことをする<b>わけがない</b>。', id: 'Tidak mungkin dia melakukan hal seperti itu.' },
    { jp: '昨日会ったばかりなのに、忘れた<b>わけがない</b>。', id: 'Baru ketemu kemarin, tidak mungkin sudah lupa.' },
    { jp: 'こんな難しい問題、小学生に解ける<b>わけがない</b>。', id: 'Soal sesulit ini, tidak mungkin bisa diselesaikan anak SD.' }
  ],
  see_also_grammar: ['gn2-00068'], see_also_vocab: [],
  confusion_pairs: ['gn2-00068'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00064', level: 'n2', pattern: '〜わけだ', reading: '〜wake da',
  meaning: 'jadi memang ... / pantas saja ... / berarti ...',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + な + わけだ',
  desc: '<b>〜わけだ</b> mengungkapkan kesimpulan logis dari informasi yang baru saja diketahui — "jadi itulah alasannya" atau "pantas saja". Pembicara merasa pemahamannya terkonfirmasi.',
  nuance: 'Berbeda dari のだ: わけだ menekankan kesimpulan logis yang kini masuk akal berkat informasi baru. のだ lebih luas (bisa untuk penjelasan, konfirmasi, atau pertanyaan).',
  examples: [
    { jp: '彼は10年間日本に住んでいた。日本語が上手な<b>わけだ</b>。', id: 'Dia sudah tinggal 10 tahun di Jepang. Pantas saja bahasa Jepangnya bagus.' },
    { jp: 'セールだったから、混んでいた<b>わけだ</b>。', id: 'Karena lagi sale, pantas saja ramai.' },
    { jp: 'そういう事情があったから、断った<b>わけだ</b>。', id: 'Ada alasan seperti itu, jadi memang dia menolak.' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00065', level: 'n2', pattern: '〜ことになっている', reading: '〜koto ni natte iru',
  meaning: 'sudah ditetapkan bahwa ... / seharusnya ... (aturan atau kesepakatan dari luar)',
  cat: 'obligation-necessity',
  connection: 'V-dict / V-nai + ことになっている',
  desc: '<b>〜ことになっている</b> menyatakan bahwa suatu hal sudah ditetapkan, direncanakan, atau diatur — bukan oleh pembicara sendiri, melainkan oleh pihak luar, sistem, atau kesepakatan bersama.',
  nuance: 'Berbeda dari ことにしている (keputusan pribadi). ことになっている = aturan, jadwal, atau keputusan yang datang dari luar diri pembicara.',
  examples: [
    { jp: '社員は毎朝9時に出社する<b>ことになっている</b>。', id: 'Karyawan sudah ditentukan harus masuk jam 9 pagi.' },
    { jp: 'このビルではペットを飼わない<b>ことになっている</b>。', id: 'Di gedung ini sudah diatur tidak boleh memelihara hewan peliharaan.' },
    { jp: '来月、東京支社に異動する<b>ことになっている</b>。', id: 'Bulan depan, sudah diputuskan akan pindah ke kantor cabang Tokyo.' }
  ],
  see_also_grammar: ['gn2-00066'], see_also_vocab: [],
  confusion_pairs: ['gn2-00066'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00067', level: 'n2', pattern: '〜に違いない', reading: '〜ni chigai nai',
  meaning: 'pasti ... (keyakinan kuat pembicara)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + に違いない',
  desc: '<b>〜に違いない</b> menyatakan keyakinan kuat pembicara bahwa sesuatu pasti benar, berdasarkan penilaian subjektifnya terhadap situasi atau bukti yang ada.',
  nuance: 'Lebih personal dan emosional dibanding に相違ない. Bisa digunakan dalam percakapan sehari-hari maupun tulisan. Keyakinannya datang dari dalam diri pembicara.',
  examples: [
    { jp: '彼女は今頃、怒っている<b>に違いない</b>。', id: 'Dia pasti sedang marah sekarang.' },
    { jp: 'あんなに練習したから、合格する<b>に違いない</b>。', id: 'Sudah latihan sekeras itu, pasti lulus.' },
    { jp: '電気がついている。まだ起きている<b>に違いない</b>。', id: 'Lampunya menyala. Pasti masih terjaga.' }
  ],
  see_also_grammar: ['gn2-00080'], see_also_vocab: [],
  confusion_pairs: ['gn2-00080', 'gn2-00068'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00068', level: 'n2', pattern: '〜はずがない', reading: '〜hazu ga nai',
  meaning: 'tidak mungkin ... (berdasarkan logika atau ekspektasi yang wajar)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + の + はずがない',
  desc: '<b>〜はずがない</b> menyatakan bahwa sesuatu seharusnya tidak mungkin terjadi, berdasarkan pengetahuan atau logika objektif pembicara.',
  nuance: 'Lebih dingin dan faktual dibanding わけがない. わけがない sering membawa nuansa heran atau emosional, sedangkan はずがない lebih berdasarkan ekspektasi logis.',
  examples: [
    { jp: '昨日日本に着いたばかりだ。疲れていない<b>はずがない</b>。', id: 'Baru tiba di Jepang kemarin. Tidak mungkin tidak lelah.' },
    { jp: 'あの優しい人が嘘をつく<b>はずがない</b>。', id: 'Orang sebaik itu tidak mungkin berbohong.' },
    { jp: '10年も勉強して、できない<b>はずがない</b>。', id: 'Belajar selama 10 tahun, tidak mungkin tidak bisa.' }
  ],
  see_also_grammar: ['gn2-00063'], see_also_vocab: [],
  confusion_pairs: ['gn2-00063', 'gn2-00067'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00069', level: 'n2', pattern: '〜べきだ', reading: '〜beki da',
  meaning: 'seharusnya ... / sudah semestinya ... (kewajiban moral)',
  cat: 'obligation-necessity',
  connection: 'V-dict + べきだ (する → すべきだ atau するべきだ)',
  desc: '<b>〜べきだ</b> menyatakan bahwa suatu tindakan adalah hal yang benar atau semestinya dilakukan, berdasarkan norma moral, sosial, atau logika yang berlaku.',
  nuance: 'Lebih kuat dari 〜たほうがいい. べきだ membawa nuansa kewajiban moral, bukan sekadar saran. Hati-hati — bisa terkesan menggurui jika langsung diucapkan ke lawan bicara.',
  examples: [
    { jp: '間違えたら、素直に謝る<b>べきだ</b>。', id: 'Kalau salah, seharusnya jujur meminta maaf.' },
    { jp: 'そんな大切なことは親に相談す<b>べきだ</b>。', id: 'Hal sepenting itu seharusnya didiskusikan dengan orang tua.' },
    { jp: '健康のために、もっと野菜を食べる<b>べきだ</b>。', id: 'Demi kesehatan, seharusnya makan lebih banyak sayuran.' }
  ],
  see_also_grammar: ['gn2-00070'], see_also_vocab: [],
  confusion_pairs: ['gn2-00070'],
  register: null, exceptions: 'する → すべきだ (lebih formal/tulisan) atau するべきだ (lebih umum/lisan)', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00070', level: 'n2', pattern: '〜べきではない', reading: '〜beki de wa nai',
  meaning: 'tidak seharusnya ... / tidak semestinya ...',
  cat: 'obligation-necessity',
  connection: 'V-dict + べきではない',
  desc: '<b>〜べきではない</b> adalah bentuk negatif dari べきだ — menyatakan bahwa suatu tindakan tidak sesuai dengan norma, moral, atau logika yang benar.',
  nuance: 'Lebih tegas dari 〜ないほうがいい. べきではない berbasis norma atau moral, bukan sekadar preferensi atau saran praktis.',
  examples: [
    { jp: '人のプライバシーを勝手に見る<b>べきではない</b>。', id: 'Tidak seharusnya mengintip privasi orang lain sembarangan.' },
    { jp: '大切なことを人任せにする<b>べきではない</b>。', id: 'Hal-hal penting tidak seharusnya diserahkan begitu saja kepada orang lain.' },
    { jp: '感情的になって判断する<b>べきではない</b>。', id: 'Tidak seharusnya mengambil keputusan dalam keadaan emosi.' }
  ],
  see_also_grammar: ['gn2-00069'], see_also_vocab: [],
  confusion_pairs: ['gn2-00069'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00071', level: 'n2', pattern: '〜得る／〜得ない', reading: '〜uru / 〜enai',
  meaning: 'bisa terjadi / tidak bisa terjadi (kemungkinan — formal)',
  cat: 'conjecture-possibility',
  connection: 'V-stem + 得る (うる/える) / V-stem + 得ない (えない)',
  desc: '<b>〜得る</b> menyatakan bahwa sesuatu berpotensi atau memungkinkan untuk terjadi. <b>〜得ない</b> menyatakan sesuatu yang mustahil terjadi. Digunakan dalam konteks formal atau tulisan.',
  nuance: '得る dibaca うる (formal, tulisan) atau える (lebih umum). 得ない selalu dibaca えない. Lebih formal dari かもしれない. Sering muncul dalam laporan, analisis, atau pidato.',
  examples: [
    { jp: 'そのような事故は十分起こり<b>得る</b>。', id: 'Kecelakaan seperti itu sangat mungkin terjadi.' },
    { jp: 'あり<b>得ない</b>ことが現実になった。', id: 'Hal yang dianggap mustahil menjadi kenyataan.' },
    { jp: 'あらゆる可能性を考え<b>得る</b>限り検討した。', id: 'Kami sudah mempertimbangkan semua kemungkinan yang bisa dibayangkan.' }
  ],
  see_also_grammar: ['gn2-00067'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: '得る: うる (tulisan/formal), える (umum/lisan). 得ない: selalu えない', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00072', level: 'n2', pattern: '〜ずにはいられない', reading: '〜zu ni wa irarenai',
  meaning: 'tidak bisa tidak ... / tidak bisa menahan diri untuk tidak ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ずにはいられない (する → せずにはいられない)',
  desc: '<b>〜ずにはいられない</b> mengungkapkan dorongan yang tidak bisa ditahan — pembicara merasa terpaksa melakukan sesuatu karena emosi atau perasaan yang kuat dari dalam dirinya.',
  nuance: 'Lebih emosional dari ざるを得ない. ざるを得ない = terpaksa karena tekanan dari luar; ずにはいられない = dorongan tak tertahankan dari dalam diri (emosi, naluri, perasaan).',
  examples: [
    { jp: 'その映画を見て、泣か<b>ずにはいられなかった</b>。', id: 'Menonton film itu, tidak bisa tidak menangis.' },
    { jp: '彼女の歌声を聞いて、感動せ<b>ずにはいられなかった</b>。', id: 'Mendengar suara nyanyiannya, tidak bisa tidak tersentuh.' },
    { jp: '不公平な扱いを見て、抗議せ<b>ずにはいられない</b>。', id: 'Melihat perlakuan tidak adil itu, tidak bisa tidak protes.' }
  ],
  see_also_grammar: ['gn2-00061'], see_also_vocab: [],
  confusion_pairs: ['gn2-00061'],
  register: null, exceptions: 'する → せずにはいられない', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00076', level: 'n2', pattern: '〜ものだ', reading: '〜mono da',
  meaning: 'memang begitulah ... / seharusnya ... (generalisasi, norma, atau nostalgia)',
  cat: 'sentence-final-modality',
  connection: 'V-dict / V-nai / Adj-plain / N + ものだ',
  desc: '<b>〜ものだ</b> memiliki tiga fungsi utama tergantung konteks: (1) generalisasi/norma umum — "begitulah adanya"; (2) nostalgia — mengenang kebiasaan masa lalu; (3) kekaguman atau perasaan mendalam.',
  nuance: 'Jangan tertukar dengan ものではない (larangan berdasarkan norma). Konteks dan predikat sebelumnya menentukan fungsi mana yang digunakan.',
  examples: [
    { jp: '人間は失敗から学ぶ<b>ものだ</b>。', id: 'Memang manusia belajar dari kegagalan.' },
    { jp: '子供のころは、よく川で遊んだ<b>ものだ</b>。', id: 'Waktu kecil dulu, sering main di sungai.' },
    { jp: '彼女のやさしさには、本当に感動する<b>ものだ</b>。', id: 'Kebaikan hatinya sungguh mengharukan.' }
  ],
  see_also_grammar: ['gn2-00077', 'gn2-00078'], see_also_vocab: [],
  confusion_pairs: ['gn2-00077'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00077', level: 'n2', pattern: '〜ものではない', reading: '〜mono de wa nai',
  meaning: 'tidak seharusnya ... / tidak pantas ... (larangan berdasarkan norma atau etika)',
  cat: 'permission-prohibition',
  connection: 'V-dict + ものではない',
  desc: '<b>〜ものではない</b> menyatakan larangan atau penilaian bahwa suatu tindakan tidak sesuai dengan norma sosial, etika, atau akal sehat.',
  nuance: 'Lebih bernada nasihat moral dibandingkan べきではない. Sering digunakan oleh orang yang lebih tua kepada yang lebih muda, atau dalam ungkapan pepatah.',
  examples: [
    { jp: '人前でそんなことを言う<b>ものではない</b>。', id: 'Tidak pantas mengatakan hal seperti itu di depan orang.' },
    { jp: '食べ物を粗末にする<b>ものではない</b>。', id: 'Tidak seharusnya menyia-nyiakan makanan.' },
    { jp: '困っている人を見捨てる<b>ものではない</b>。', id: 'Tidak pantas meninggalkan orang yang sedang kesulitan.' }
  ],
  see_also_grammar: ['gn2-00076'], see_also_vocab: [],
  confusion_pairs: ['gn2-00076'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00078', level: 'n2', pattern: '〜ものがある', reading: '〜mono ga aru',
  meaning: 'ada sesuatu yang ... / terasa ada unsur ... (kesan subjektif yang dalam)',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain + ものがある',
  desc: '<b>〜ものがある</b> mengungkapkan perasaan atau kesan subjektif yang kuat — bahwa ada suatu kualitas atau elemen tertentu yang benar-benar dirasakan oleh pembicara.',
  nuance: 'Selalu mengungkapkan penilaian subjektif yang dalam, bukan fakta objektif. Sering diikuti kata seperti 感動する、心を打つ、考えさせられる. Tidak bisa digunakan untuk hal-hal biasa.',
  examples: [
    { jp: '彼の演技には心を打つ<b>ものがある</b>。', id: 'Ada sesuatu dalam aktingnya yang benar-benar menyentuh hati.' },
    { jp: 'この話には考えさせられる<b>ものがある</b>。', id: 'Ada sesuatu dalam cerita ini yang membuat kita berpikir.' },
    { jp: '彼女の作品には独特の美しさを感じる<b>ものがある</b>。', id: 'Ada sesuatu dalam karya-karyanya yang memancarkan keindahan yang unik.' }
  ],
  see_also_grammar: ['gn2-00076'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00079', level: 'n2', pattern: '〜ではないか', reading: '〜de wa nai ka',
  meaning: 'bukankah ... ? / ayo ... — (retorikal atau ajakan)',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + ではないか (kasual: じゃないか)',
  desc: '<b>〜ではないか</b> digunakan dalam dua fungsi: (1) pertanyaan retoris untuk menegaskan pendapat pembicara, atau (2) ajakan atau usulan kepada lawan bicara.',
  nuance: 'Intonasi dan konteks menentukan fungsinya. Fungsi retoris: "bukankah ini masalah serius?" Fungsi ajakan: "ayo kita coba, bagaimana?" Versi kasual: じゃないか / じゃないですか.',
  examples: [
    { jp: 'これは重大な問題<b>ではないか</b>。', id: 'Bukankah ini masalah yang sangat serius?' },
    { jp: 'せっかくだから、一緒に行こう<b>ではないか</b>。', id: 'Sudah jauh-jauh ke sini, ayo pergi bersama.' },
    { jp: 'この景色、本当に美しい<b>じゃないか</b>。', id: 'Pemandangan ini, indah sekali kan?' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00080', level: 'n2', pattern: '〜に相違ない', reading: '〜ni sōi nai',
  meaning: 'pasti ... (keyakinan formal dan kuat — lebih formal dari に違いない)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + に相違ない',
  desc: '<b>〜に相違ない</b> mengungkapkan keyakinan kuat bahwa sesuatu pasti benar — setara dengan に違いない tetapi lebih formal. Sering ditemukan dalam tulisan resmi, dokumen hukum, atau laporan.',
  nuance: 'Sangat formal. Jarang dalam percakapan biasa. Jika に違いない = bahasa sehari-hari yang tegas, maka に相違ない = setara dalam dokumen resmi atau akademik.',
  examples: [
    { jp: '目撃者の証言から、彼が犯人である<b>に相違ない</b>。', id: 'Berdasarkan kesaksian saksi mata, dialah pasti pelakunya.' },
    { jp: 'その方針は正しい<b>に相違ない</b>。', id: 'Kebijakan tersebut pasti benar.' },
    { jp: 'この発見は歴史的な意義を持つ<b>に相違ない</b>。', id: 'Penemuan ini pasti memiliki makna historis.' }
  ],
  see_also_grammar: ['gn2-00067'], see_also_vocab: [],
  confusion_pairs: ['gn2-00067'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00082', level: 'n2', pattern: '〜を余儀なくされる', reading: '〜wo yogi naku sareru',
  meaning: 'dipaksa (oleh keadaan) untuk melakukan ... (pasif formal)',
  cat: 'obligation-necessity',
  connection: 'N + を余儀なくされる',
  desc: '<b>〜を余儀なくされる</b> adalah ungkapan pasif formal yang menyatakan bahwa seseorang terpaksa melakukan sesuatu bukan atas kemauan sendiri, melainkan karena keadaan yang memaksa dari luar.',
  nuance: 'Sangat formal. Hampir selalu ditemukan dalam berita, laporan resmi, atau tulisan akademik. Subjek selalu berposisi sebagai pihak yang tidak berdaya terhadap keadaan.',
  examples: [
    { jp: '地震の影響で、住民は避難<b>を余儀なくされた</b>。', id: 'Akibat gempa bumi, warga terpaksa mengungsi.' },
    { jp: '経営難で、会社は工場閉鎖<b>を余儀なくされた</b>。', id: 'Karena kesulitan keuangan, perusahaan terpaksa menutup pabrik.' },
    { jp: '怪我で選手は引退<b>を余儀なくされた</b>。', id: 'Akibat cedera, atlet itu terpaksa pensiun.' }
  ],
  see_also_grammar: ['gn2-00061'], see_also_vocab: [],
  confusion_pairs: ['gn2-00061'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00124', level: 'n2', pattern: '〜ものなら',
  reading: '〜mono nara',
  meaning: 'kalau saja bisa ... (harapan hypothetical / tantangan implisit)',
  cat: 'conjecture-possibility',
  connection: 'V-potential / V-volitional-plain + ものなら',
  desc: '<b>〜ものなら</b> memiliki dua penggunaan: (1) harapan terhadap sesuatu yang dianggap sulit atau mustahil; (2) tantangan atau provokasi implisit.',
  nuance: 'Perhatikan konteks: できるものなら〜したい = harapan yang sulit terwujud; やれるものならやってみろ = tantangan/provokasi. Keduanya menyiratkan skeptisisme terhadap kemungkinan terjadinya hal tersebut.',
  examples: [
    { jp: 'できる<b>ものなら</b>、もう一度やり直したい。', id: 'Kalau saja bisa, ingin mengulang dari awal.' },
    { jp: 'やれる<b>ものなら</b>やってみろ。', id: 'Kalau memang bisa, silakan coba saja.' }
  ],
  see_also_grammar: ['gn2-00123', 'gn2-00125'], see_also_vocab: [],
  confusion_pairs: ['gn2-00123'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00126', level: 'n2', pattern: '〜というものだ',
  reading: '〜to iu mono da',
  meaning: 'memang begitulah seharusnya / itulah yang namanya ...',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + というものだ',
  desc: '<b>〜というものだ</b> menyatakan bahwa sesuatu memang sudah seharusnya begitu — mengungkapkan prinsip umum, nilai, atau kebenaran yang dipegang pembicara.',
  nuance: 'Digunakan untuk menegaskan kebenaran umum atau penilaian moral. Sering terdengar seperti pernyataan filosofis atau bijak. Berbeda dari というものでもない yang menyangkal generalisasi — keduanya berlawanan langsung.',
  examples: [
    { jp: '親が子を思うのは当然<b>というものだ</b>。', id: 'Memang sudah seharusnya orang tua menyayangi anaknya.' },
    { jp: '苦しい時に助け合う、それが友情<b>というものだ</b>。', id: 'Saling membantu di saat sulit — itulah yang namanya persahabatan.' }
  ],
  see_also_grammar: ['gn2-00127', 'gn2-00128'], see_also_vocab: [],
  confusion_pairs: ['gn2-00127'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00127', level: 'n2', pattern: '〜というものでもない',
  reading: '〜to iu mono demo nai',
  meaning: 'bukan berarti ... / tidak harus selalu begitu ...',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + というものでもない',
  desc: '<b>〜というものでもない</b> menyangkal generalisasi atau asumsi yang terlalu mutlak — "bukan berarti selalu begitu."',
  nuance: 'Kebalikan langsung dari というものだ. Sering dipadukan dengan かならずしも (tidak selalu). Digunakan untuk meluruskan asumsi atau pendapat umum yang terlalu ekstrem. Tone-nya lebih analitis dan reflektif.',
  examples: [
    { jp: '値段が高ければいい<b>というものでもない</b>。', id: 'Bukan berarti karena mahal pasti bagus.' },
    { jp: '努力すれば必ず成功する<b>というものでもない</b>。', id: 'Bukan berarti kalau sudah berusaha keras pasti berhasil.' }
  ],
  see_also_grammar: ['gn2-00126', 'gn2-00130'], see_also_vocab: [],
  confusion_pairs: ['gn2-00126', 'gn2-00130'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00129', level: 'n2', pattern: '〜ということになっている',
  reading: '〜to iu koto ni natte iru',
  meaning: 'sudah menjadi aturan bahwa ... / secara tidak tertulis ...',
  cat: 'obligation-necessity',
  connection: 'Clause + ということになっている',
  desc: '<b>〜ということになっている</b> menyatakan bahwa sesuatu telah menjadi aturan, kesepakatan, atau norma yang berlaku — baik tertulis maupun tak tertulis.',
  nuance: 'Berbeda dari ことになっている (aturan/rencana resmi) — ということになっている sering menyiratkan norma implisit atau konvensi sosial yang sudah dipahami bersama. Mengandung nuansa "begitulah ketentuannya, sudah seperti itu dari dulu."',
  examples: [
    { jp: 'ここでは靴を脱ぐ<b>ということになっている</b>。', id: 'Di sini sudah menjadi aturan bahwa harus melepas sepatu.' },
    { jp: '会議の費用は会社が負担する<b>ということになっている</b>。', id: 'Sudah menjadi ketentuan bahwa biaya rapat ditanggung perusahaan.' }
  ],
  see_also_grammar: ['gn2-00128'], see_also_vocab: [],
  confusion_pairs: ['gn2-00128', 'gn2-00151', 'gn2-00152'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00130', level: 'n2', pattern: '〜とは限らない',
  reading: '〜to wa kagiranai',
  meaning: 'tidak selalu ... / belum tentu ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + とは限らない',
  desc: '<b>〜とは限らない</b> menyatakan bahwa sesuatu tidak selalu benar atau tidak bisa dipastikan — menyanggah generalisasi atau asumsi.',
  nuance: 'Berbeda dari わけではない (bukan berarti dalam kasus ini) — とは限らない lebih menekankan "tidak selalu terjadi" dari sisi kemungkinan umum. Sering dipadukan dengan かならずしも. Digunakan untuk berpikir kritis atau mempertanyakan asumsi.',
  examples: [
    { jp: '有名な人が優れている<b>とは限らない</b>。', id: 'Belum tentu orang yang terkenal itu unggul.' },
    { jp: '高い薬が効く<b>とは限らない</b>。', id: 'Belum tentu obat yang mahal itu ampuh.' }
  ],
  see_also_grammar: ['gn2-00127', 'gn2-00124'], see_also_vocab: [],
  confusion_pairs: ['gn2-00127'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00139', level: 'n2', pattern: '〜によれば / 〜によると',
  reading: '〜ni yoreba / 〜ni yoru to',
  meaning: 'menurut ..., berdasarkan informasi dari ...',
  cat: 'hearsay-report',
  connection: 'N + によれば / N + によると',
  desc: '<b>〜によれば</b> dan <b>〜によると</b> digunakan untuk mengutip sumber informasi — berita, laporan, ucapan seseorang, dsb. Biasanya diikuti oleh pernyataan atau klaim yang berasal dari sumber tersebut.',
  nuance: 'Keduanya hampir identik dalam makna. によれば sedikit lebih formal dan lebih sering muncul dalam tulisan, sementara によると lebih umum dalam percakapan lisan. Keduanya berbeda dari に基づいて yang menyatakan bahwa sesuatu berlandaskan fakta/aturan secara aktif.',
  examples: [
    { jp: '天気予報<b>によると</b>、明日は雨が降るそうだ。', id: 'Menurut prakiraan cuaca, besok katanya akan hujan.' },
    { jp: '報告書<b>によれば</b>、今年の売上は前年比で増加した。', id: 'Menurut laporan tersebut, penjualan tahun ini meningkat dibandingkan tahun lalu.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00149', level: 'n2', pattern: '〜に違いない',
  reading: '〜ni chigai nai',
  meaning: 'pasti ..., tidak diragukan lagi ..., tentu saja ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / い-Adj-plain / な-Adj + に違いない / N + に違いない',
  desc: '<b>〜に違いない</b> menyatakan keyakinan kuat dari penutur bahwa sesuatu pasti benar, berdasarkan bukti atau intuisi yang kuat. Tidak ada keraguan di benak penutur.',
  nuance: 'Lebih kuat dari はずだ (seharusnya, berdasarkan logika) — に違いない mengungkapkan keyakinan personal yang hampir tidak tergoyahkan. はずだ lebih obyektif dan logis; に違いない lebih subyektif dan emosional. Keduanya berbeda dari だろう yang lebih umum.',
  examples: [
    { jp: 'あの電気は消えていない。まだ誰かいる<b>に違いない</b>。', id: 'Lampunya masih menyala. Pasti masih ada seseorang di dalam.' },
    { jp: '彼女がそんなことをするはずがない。何か理由がある<b>に違いない</b>。', id: 'Tidak mungkin dia melakukan hal itu. Pasti ada alasan tertentu.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00152', level: 'n2', pattern: '〜ということになっている',
  reading: '〜to iu koto ni natte iru',
  meaning: 'sudah diputuskan/berlaku ketentuan bahwa ..., secara tidak tertulis sudah ...',
  cat: 'obligation-necessity',
  connection: 'Clause + ということになっている',
  desc: '<b>〜ということになっている</b> menyatakan bahwa sesuatu telah menjadi aturan, konvensi, atau norma yang berlaku dalam suatu kelompok atau masyarakat — baik tertulis maupun tidak tertulis.',
  nuance: 'Berbeda dari ことになっている (aturan/rencana resmi yang tertulis atau dijadwalkan) — ということになっている sering menyiratkan norma implisit atau konvensi sosial yang sudah dipahami bersama tanpa perlu ditulis. Lihat juga gn2-00129 untuk pembahasan serupa.',
  examples: [
    { jp: 'この会社では、上司より先に帰ってはいけない<b>ということになっている</b>。', id: 'Di perusahaan ini sudah menjadi norma bahwa karyawan tidak boleh pulang sebelum atasan.' },
    { jp: '入社した社員は最初の一年は現場研修をする<b>ということになっている</b>。', id: 'Sudah menjadi ketentuan bahwa karyawan baru menjalani pelatihan lapangan selama satu tahun pertama.' }
  ],
  see_also_grammar: ['gn2-00129', 'gn2-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00129'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00153', level: 'n2', pattern: '〜とは限らない',
  reading: '〜to wa kagiranai',
  meaning: 'tidak selalu ..., belum tentu ..., tidak bisa dipastikan ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / い-Adj-plain / な-Adj + とは限らない / N + とは限らない',
  desc: '<b>〜とは限らない</b> menyatakan bahwa suatu generalisasi atau asumsi tidak selalu berlaku — ada pengecualian atau kemungkinan yang berbeda. Digunakan untuk menyangkal kepastian atau pukul rata.',
  nuance: 'Berbeda dari わけではない (bukan berarti dalam kasus tertentu) — とは限らない menekankan "tidak selalu terjadi secara umum" dan lebih bersifat logis/kritis. Lihat juga gn2-00130. Sering dipadukan dengan かならずしも untuk penekanan.',
  examples: [
    { jp: '一生懸命勉強すれば合格できる<b>とは限らない</b>。', id: 'Belum tentu belajar keras selalu menjamin kelulusan.' },
    { jp: '外国語が話せる<b>とは限らない</b>から、通訳を用意した方がいい。', id: 'Belum tentu mereka bisa berbahasa asing, jadi lebih baik siapkan penerjemah.' }
  ],
  see_also_grammar: ['gn2-00130', 'gn2-00154'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00154'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00155', level: 'n2', pattern: '〜わけにはいかない',
  reading: '〜wake ni wa ikanai',
  meaning: 'tidak bisa begitu saja ..., tidak mungkin tidak ..., tidak ada alasan untuk tidak ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + わけにはいかない / V-ない + わけにはいかない',
  desc: '<b>〜わけにはいかない</b> menyatakan bahwa sesuatu tidak dapat dilakukan karena alasan moral, sosial, atau situasional yang kuat — meski ada keinginan untuk melakukannya. Bentuk negatif (ないわけにはいかない) menyatakan ketidakmampuan untuk tidak melakukan sesuatu.',
  nuance: 'Berbeda dari てはいけない (larangan eksternal) — わけにはいかない adalah hambatan internal berdasarkan norma, tanggung jawab, atau rasa tidak pantas. "Secara logis atau sosial, aku tidak bisa melakukan ini." Bentuk ganda ないわけにはいかない = "tidak ada pilihan selain melakukan".',
  examples: [
    { jp: '大事な会議があるから、休む<b>わけにはいかない</b>。', id: 'Ada rapat penting, jadi tidak bisa begitu saja absen.' },
    { jp: '頼まれた以上、断る<b>わけにはいかない</b>。', id: 'Karena sudah dimintai tolong, tidak mungkin menolaknya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00160', 'gn2-00154'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00156', level: 'n2', pattern: '〜ないものでもない',
  reading: '〜nai mono demo nai',
  meaning: 'bukan tidak mungkin ..., bisa saja ..., tidak mustahil ...',
  cat: 'conjecture-possibility',
  connection: 'V-ない + ものでもない',
  desc: '<b>〜ないものでもない</b> adalah ungkapan negatif ganda yang menyatakan kemungkinan dengan nada ragu-ragu atau hati-hati — "tidak bisa dikatakan tidak mungkin". Menyiratkan kesediaan atau kemungkinan yang kecil namun ada.',
  nuance: 'Lebih ragu-ragu dibandingkan かもしれない (mungkin) atau できる (bisa) — ないものでもない menyiratkan keengganan atau kondisional. "Bukannya tidak bisa... kalau dipaksa/kondisi tepat." Digunakan saat berbicara secara hati-hati atau berdiplomasi.',
  examples: [
    { jp: '条件次第では、協力でき<b>ないものでもない</b>。', id: 'Tergantung kondisinya, bukan tidak mungkin saya bisa membantu.' },
    { jp: '彼の言い分にも、一理あら<b>ないものでもない</b>。', id: 'Bukan berarti argumennya sama sekali tidak ada benarnya.' }
  ],
  see_also_grammar: ['gn2-00157'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00157', level: 'n2', pattern: '〜かねない',
  reading: '〜kanenai',
  meaning: 'bisa saja (hal buruk) terjadi, ada kemungkinan (negatif) ...',
  cat: 'conjecture-possibility',
  connection: 'V-stem + かねない',
  desc: '<b>〜かねない</b> menyatakan bahwa ada kemungkinan nyata bahwa hal yang tidak diinginkan atau berbahaya bisa terjadi. Selalu menyiratkan konsekuensi negatif yang perlu diwaspadai.',
  nuance: 'Berlawanan dengan かねる (tidak bisa/sulit melakukan) meski berasal dari akar yang sama — かねない = "bisa saja terjadi (hal buruk)", bukan "tidak bisa melakukan". Selalu konteks negatif. Berbeda dari かもしれない yang netral.',
  examples: [
    { jp: '無理をすると、体を壊し<b>かねない</b>。', id: 'Kalau memaksakan diri, bisa-bisa merusak kesehatan.' },
    { jp: 'そんな発言は誤解を招き<b>かねない</b>から、気をつけてください。', id: 'Pernyataan seperti itu bisa menimbulkan kesalahpahaman, jadi hati-hati.' }
  ],
  see_also_grammar: ['gn2-00158'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00158'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00160', level: 'n2', pattern: '〜ざるを得ない',
  reading: '〜zaru wo enai',
  meaning: 'terpaksa ..., tidak punya pilihan selain ..., mau tidak mau ...',
  cat: 'obligation-necessity',
  connection: 'V-ない-stem + ざるを得ない (kecuali する → せざるを得ない)',
  desc: '<b>〜ざるを得ない</b> menyatakan keterpaksaan yang tidak terelakkan — pembicara tidak ingin melakukan sesuatu, namun situasi memaksanya untuk melakukannya. Menekankan ketiadaan pilihan.',
  nuance: 'Lebih kuat rasa terpaksanya dibandingkan しなければならない (harus melakukan) — ざるを得ない secara tegas menyiratkan "kalau bisa tidak mau, tapi tidak ada pilihan lain". Kata する menjadi せ (bukan しざる) — pengecualian penting yang sering salah.',
  examples: [
    { jp: '電車が止まって、歩か<b>ざるを得なかった</b>。', id: 'Karena kereta berhenti, terpaksa harus jalan kaki.' },
    { jp: '証拠が出た以上、認め<b>ざるを得ない</b>。', id: 'Setelah bukti muncul, tidak ada pilihan selain mengakuinya.' },
    { jp: 'コスト削減のため、プロジェクトを縮小<b>せざるを得ない</b>。', id: 'Demi penghematan biaya, terpaksa harus memperkecil skala proyek.' }
  ],
  see_also_grammar: ['gn2-00155'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00155'],
  register: null, exceptions: null,
  notes: 'Pengecualian: する → せざるを得ない (bukan しざるを得ない).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00170', level: 'n2', pattern: '〜からには',
  reading: '〜kara ni wa',
  meaning: 'karena sudah ..., maka harus ...; karena memang begitu, sudah selayaknya ...',
  cat: 'obligation-necessity',
  connection: 'V-plain + からには / N + である + からには',
  desc: '<b>〜からには</b> menyatakan bahwa karena suatu kondisi atau situasi sudah terjadi atau benar, maka ada tanggung jawab, kewajiban, atau konsekuensi logis yang harus diikuti. Menekankan komitmen atau konsekuensi yang tidak terelakkan.',
  nuance: 'Lebih spoken dibandingkan 上は dan 以上は yang lebih formal/tertulis. Semua tiga pola berbagi makna dasar, namun からには paling sering digunakan dalam percakapan sehari-hari dan tulisan semi-formal.',
  examples: [
    { jp: '約束した<b>からには</b>、必ず守らなければならない。', id: 'Karena sudah berjanji, harus ditepati tanpa kecuali.' },
    { jp: '参加する<b>からには</b>、全力で頑張ります。', id: 'Karena sudah memutuskan ikut, saya akan berusaha sepenuh hati.' }
  ],
  see_also_grammar: ['gn2-00171', 'gn2-00172'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00171', 'gn2-00172', 'gn2-00169'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00171', level: 'n2', pattern: '〜上は',
  reading: '〜ue wa',
  meaning: 'karena sudah ..., maka harus ... (formal, mengungkapkan tekad)',
  cat: 'obligation-necessity',
  connection: 'V-plain + 上は',
  desc: '<b>〜上は</b> menyatakan bahwa karena situasi atau keputusan sudah final, ada kewajiban atau tekad yang mengikutinya. Lebih formal dan kaku dibandingkan からには, sering muncul dalam pidato, tulisan resmi, atau ungkapan tekad yang sungguh-sungguh.',
  nuance: 'Dari tiga pola serupa (からには / 以上は / 上は), 上は paling formal dan paling jarang dalam percakapan. Berbagi makna inti dengan keduanya — mengungkapkan konsekuensi yang logis dan wajib dari kondisi yang sudah terjadi.',
  examples: [
    { jp: '引き受けた<b>上は</b>、最後まで責任を持ってやり遂げる。', id: 'Karena sudah menerimanya, saya akan menyelesaikannya dengan penuh tanggung jawab sampai akhir.' },
    { jp: '社会人となった<b>上は</b>、自覚を持って行動しなければならない。', id: 'Karena sudah menjadi anggota masyarakat dewasa, harus bertindak dengan penuh kesadaran.' }
  ],
  see_also_grammar: ['gn2-00170', 'gn2-00172'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00170', 'gn2-00172'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00172', level: 'n2', pattern: '〜以上は',
  reading: '〜ijou wa',
  meaning: 'karena sudah ..., maka harus ...; selama masih dalam kondisi ...',
  cat: 'obligation-necessity',
  connection: 'V-plain + 以上は / N + である + 以上は',
  desc: '<b>〜以上は</b> memiliki dua nuansa: (1) karena situasi sudah demikian, ada kewajiban yang mengikutinya; (2) selama kondisi tertentu masih berlaku, hal lain harus terpenuhi. Lebih formal dari からには namun lebih umum dari 上は.',
  nuance: 'Dari tiga pola (からには / 以上は / 上は): 以上は adalah posisi tengah — lebih formal dari からには, namun tidak sekaku 上は. Juga bisa menyatakan kondisi berkelanjutan "selama masih X", sedangkan からには dan 上は lebih terfokus pada momen keputusan.',
  examples: [
    { jp: 'プロである<b>以上は</b>、常に最善を尽くすべきだ。', id: 'Selama masih seorang profesional, sudah seharusnya selalu memberikan yang terbaik.' },
    { jp: '決めた<b>以上は</b>、後悔しないようにしよう。', id: 'Karena sudah memutuskan, jangan sampai menyesal nantinya.' }
  ],
  see_also_grammar: ['gn2-00170', 'gn2-00171'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00170', 'gn2-00171'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00173', level: 'n2', pattern: '〜べきだ',
  reading: '〜beki da',
  meaning: 'seharusnya ..., sudah selayaknya ..., wajib secara moral ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + べきだ (kecuali: する → すべきだ atau するべきだ)',
  desc: '<b>〜べきだ</b> menyatakan kewajiban atau keharusan berdasarkan penilaian moral, norma sosial, atau nalar penutur. Mengungkapkan bahwa sesuatu sudah selayaknya dilakukan menurut standar yang berlaku.',
  nuance: 'Berbeda dari なければならない (keharusan eksternal/aturan) — べきだ adalah penilaian normatif penutur: "menurut saya/norma ini, seharusnya demikian". Lebih bernada menggurui atau memberi saran kuat. する menjadi すべき atau するべき (keduanya diterima).',
  examples: [
    { jp: '間違えたなら、素直に謝る<b>べきだ</b>。', id: 'Kalau memang salah, seharusnya minta maaf dengan tulus.' },
    { jp: '健康のために、もっと野菜を食べる<b>べきだ</b>。', id: 'Demi kesehatan, seharusnya makan lebih banyak sayuran.' }
  ],
  see_also_grammar: ['gn2-00174'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00174'],
  register: null, exceptions: null,
  notes: 'する → すべきだ atau するべきだ (keduanya diterima; すべきだ lebih formal).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00174', level: 'n2', pattern: '〜べきではない',
  reading: '〜beki de wa nai',
  meaning: 'seharusnya tidak ..., tidak sepantasnya ..., tidak layak secara moral ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + べきではない (kecuali: する → すべきではない)',
  desc: '<b>〜べきではない</b> adalah bentuk negatif dari べきだ — menyatakan bahwa suatu tindakan tidak seharusnya dilakukan berdasarkan penilaian moral atau norma sosial penutur.',
  nuance: 'Berbeda dari てはいけない (larangan yang berasal dari aturan atau instruksi eksternal) — べきではない adalah penilaian normatif internal penutur. "Menurut saya atau menurut norma yang berlaku, ini tidak selayaknya dilakukan." Bernada lebih serius dan formal.',
  examples: [
    { jp: '人の秘密をむやみに話す<b>べきではない</b>。', id: 'Seharusnya tidak sembarangan membocorkan rahasia orang lain.' },
    { jp: '感情的になって判断する<b>べきではない</b>。', id: 'Tidak sepantasnya mengambil keputusan dalam keadaan emosi.' }
  ],
  see_also_grammar: ['gn2-00173'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00173', 'gn2-00176'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00176', level: 'n2', pattern: '〜ものではない',
  reading: '〜mono de wa nai',
  meaning: 'seharusnya tidak ..., tidak sepantasnya dilakukan ..., orang yang baik tidak akan ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + ものではない',
  desc: '<b>〜ものではない</b> menyatakan bahwa suatu tindakan tidak pantas atau tidak sepantasnya dilakukan berdasarkan norma sosial atau kebiasaan umum. Bernada menggurui atau mengingatkan.',
  nuance: 'Berbeda dari べきではない (penilaian moral penutur) — ものではない lebih menekankan norma sosial yang sudah berlaku umum: "orang yang tahu sopan santun tidak akan melakukan ini". Sering digunakan oleh orang yang lebih tua untuk menasihati.',
  examples: [
    { jp: '人の悪口を言う<b>ものではない</b>。', id: 'Tidak sepantasnya mengumpat orang lain.' },
    { jp: '食べ物を粗末にする<b>ものではない</b>。', id: 'Tidak seharusnya menyia-nyiakan makanan.' }
  ],
  see_also_grammar: ['gn2-00173', 'gn2-00175'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00174', 'gn2-00175'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00179', level: 'n2', pattern: '〜ずにはいられない',
  reading: '〜zu ni wa irarenai',
  meaning: 'tidak bisa tidak ..., tidak sanggup menahan diri untuk tidak ...',
  cat: 'obligation-necessity',
  connection: 'V-ない-stem + ずにはいられない (kecuali: する → せずにはいられない)',
  desc: '<b>〜ずにはいられない</b> menyatakan bahwa penutur tidak bisa menahan dorongan internal untuk melakukan sesuatu — suatu tindakan yang terjadi karena tidak sanggup menahannya, bukan karena pilihan sadar.',
  nuance: 'Berbeda dari ざるを得ない (terpaksa karena tekanan atau situasi eksternal) — ずにはいられない menekankan dorongan atau perasaan dari dalam diri sendiri yang tidak bisa dilawan. "Tidak bisa menahan diri untuk tidak melakukan X."',
  examples: [
    { jp: 'あの映画を見たら、泣か<b>ずにはいられない</b>。', id: 'Kalau menonton film itu, tidak mungkin bisa menahan tangis.' },
    { jp: '不正を見たら、指摘せ<b>ずにはいられない</b>性格だ。', id: 'Ia memang berkepribadian tidak sanggup diam saat melihat ketidakadilan.' }
  ],
  see_also_grammar: ['gn2-00180'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00180'],
  register: null, exceptions: null,
  notes: 'する → せずにはいられない. Dorongan bersifat internal/psikologis, berbeda dari を余儀なくされる yang bersifat eksternal.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00180', level: 'n2', pattern: '〜を余儀なくされる',
  reading: '〜wo yogi naku sareru',
  meaning: 'terpaksa ..., dipaksa oleh keadaan untuk ...',
  cat: 'obligation-necessity',
  connection: 'N + を余儀なくされる / V-plain + ことを余儀なくされる',
  desc: '<b>〜を余儀なくされる</b> menyatakan bahwa seseorang dipaksa oleh situasi, kondisi, atau pihak lain untuk melakukan sesuatu yang tidak diinginkan. Menekankan keterpaksaan yang datang dari luar diri pelaku.',
  nuance: 'Berbeda dari ずにはいられない (dorongan internal yang tak terbendung) dan ざるを得ない (terpaksa dari perspektif penutur aktif) — を余儀なくされる lebih pasif dan formal. Sering muncul dalam berita atau laporan: "X dipaksa untuk melakukan Y oleh keadaan Z."',
  examples: [
    { jp: '台風の影響で、イベントは中止<b>を余儀なくされた</b>。', id: 'Akibat topan, acara tersebut terpaksa harus dibatalkan.' },
    { jp: '業績不振により、会社は大規模なリストラ<b>を余儀なくされた</b>。', id: 'Akibat kinerja yang buruk, perusahaan dipaksa keadaan untuk melakukan PHK besar-besaran.' }
  ],
  see_also_grammar: ['gn2-00179'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00179'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00185', level: 'n2', pattern: '〜ことか',
  reading: '〜koto ka',
  meaning: 'betapa ..., sungguh ... (ekspresi perasaan yang sangat kuat)',
  cat: 'sentence-final-modality',
  connection: 'どんなに / どれほど / 何度 + V-plain + ことか',
  desc: '<b>〜ことか</b> digunakan bersama kata tanya (どんなに, どれほど, 何度) untuk mengungkapkan betapa besar, banyak, atau dalamnya suatu perasaan atau pengalaman. Merupakan ungkapan emosional yang kuat, sering bernada haru atau menyesal.',
  nuance: 'Selalu membutuhkan kata tanya di depannya — tidak bisa berdiri sendiri. Berbeda dari なんて (eksklamasi biasa) — ことか lebih formal dan literer, sering muncul dalam tulisan, pidato, atau ungkapan perasaan yang dalam. Jarang dalam percakapan kasual.',
  examples: [
    { jp: 'あなたに会いたいと、どれほど思った<b>ことか</b>。', id: 'Betapa seringnya aku memikirkan betapa inginnya bertemu denganmu.' },
    { jp: '何度失敗した<b>ことか</b>、それでも諦めなかった。', id: 'Betapa banyak kali ia gagal, namun tetap tidak menyerah.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Wajib didahului kata tanya: どれほど、どんなに、何度 dll. Tidak bisa berdiri sendiri.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00206',
  level: 'n2',
  pattern: '〜と考えられる',
  reading: '~to kangaerareru',
  meaning: 'dapat dipikirkan bahwa ..., tampaknya ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + と考えられる',
  desc: '<b>〜と考えられる</b> menyatakan bahwa berdasarkan informasi atau penalaran yang ada, suatu kesimpulan atau penilaian tampaknya masuk akal atau dapat disimpulkan. Pola ini mencerminkan inferensi logis dari pembicara, sering digunakan dalam teks akademis atau laporan ilmiah.',
  nuance: 'Berbeda dengan 〜とされている (konsensus eksternal yang sudah mapan) dan 〜と見られている (perkiraan dari pengamat/media), 〜と考えられる menekankan proses penalaran pembicara sendiri. Dalam tulisan akademis, ini adalah cara standar untuk menyampaikan kesimpulan tanpa terlalu menegaskan kepastian.',
  examples: [
    { jp: 'この現象は気候変動が原因<b>と考えられる</b>。', id: 'Fenomena ini dapat dipikirkan disebabkan oleh perubahan iklim.' },
    { jp: '患者の症状から、ウイルス感染<b>と考えられる</b>。', id: 'Berdasarkan gejala pasien, tampaknya terjadi infeksi virus.' },
    { jp: '需要の増加が価格上昇につながった<b>と考えられる</b>。', id: 'Dapat disimpulkan bahwa peningkatan permintaan menyebabkan kenaikan harga.' },
  ],
  see_also_grammar: ['gn2-00204', 'gn2-00205'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '学術論文・報告書での推論表現として最も一般的。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00232', level: 'n2', pattern: '〜ではあるまいか',
  reading: '〜de wa aru mai ka',
  meaning: 'mungkinkah ... / bukankah ...? (perkiraan retorik yang halus)',
  cat: 'conjecture-possibility',
  connection: 'N / V-plain / Adj-plain + ではあるまいか',
  desc: '<b>〜ではあるまいか</b> digunakan untuk menyampaikan pendapat atau dugaan dengan cara yang halus dan tidak langsung, seperti bertanya kepada diri sendiri. Mengandung nuansa retorik — pembicara sebenarnya sudah cukup yakin dengan pendapatnya.',
  nuance: 'Lebih formal dan tidak langsung dibandingkan だろう atau のではないか. Penggunaan まいか (negatif dari volitional) menciptakan nuansa "bukankah ini..., bisa jadi begini..." yang lebih reflektif dan intelektual. Sering muncul dalam esai, karya sastra, atau wacana analitis.',
  examples: [
    { jp: '問題の根本は、コミュニケーション不足<b>ではあるまいか</b>。', id: 'Mungkinkah akar masalahnya adalah kurangnya komunikasi?' },
    { jp: '彼の行動の裏には深い後悔があるの<b>ではあるまいか</b>。', id: 'Bukankah di balik tindakannya itu ada penyesalan yang mendalam?' },
  ],
  see_also_grammar: ['gn2-00231', 'gn2-00233'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00234', level: 'n2', pattern: '〜ものか',
  reading: '〜mono ka',
  meaning: 'tidak mungkin ... / pasti tidak ... (penolakan kuat dan emosional)',
  cat: 'sentence-final-modality',
  connection: 'V-dict / Adj-plain + ものか',
  desc: '<b>〜ものか</b> menyatakan penolakan, bantahan kuat, atau ketidakmungkinan sesuatu dengan nuansa emosional. Merupakan pernyataan tegas bahwa pembicara tidak akan melakukan atau tidak percaya sesuatu terjadi.',
  nuance: 'Lebih emosional dan kuat dari ないだろう. Bentuk kasual もんか sering dipakai dalam percakapan. Versi lebih halus: ものですか. Berbeda dari わけがない yang lebih logis dan analitis — ものか lebih bersifat emosional dan berbasis tekad atau kemarahan.',
  examples: [
    { jp: 'あんな人に負ける<b>ものか</b>！', id: 'Tidak mungkin aku kalah dari orang seperti itu!' },
    { jp: 'そんな辛い思いを、もう一度する<b>ものか</b>。', id: 'Sudah pasti aku tidak akan mengalami penderitaan seperti itu lagi.' },
  ],
  see_also_grammar: ['gn2-00233', 'gn2-00235'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'Bentuk kasual: もんか. Bentuk halus (feminim): ものですか.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00239', level: 'n2', pattern: '〜ないもの(だろう)か',
  reading: '〜nai mono (darou) ka',
  meaning: 'tidak bisakah ... / mungkinkah tidak ada cara untuk ...? (harapan/keinginan)',
  cat: 'sentence-final-request',
  connection: 'V-nai + もの(だろう)か',
  desc: '<b>〜ないものだろうか</b> mengekspresikan keinginan atau harapan agar sesuatu bisa terwujud, dengan nada bertanya kepada diri sendiri atau lingkungan. Menyiratkan bahwa situasinya sulit tetapi pembicara berharap ada jalan keluar.',
  nuance: 'Berbeda dari てほしい yang langsung meminta kepada seseorang — ないものだろうか lebih bersifat reflektif, merupakan harapan umum bukan permintaan langsung. Sering muncul dalam monolog atau tulisan. Bisa muncul sebagai ないものか (lebih kasual) atau ないものでしょうか (lebih sopan).',
  examples: [
    { jp: 'もっと効率的な方法は<b>ないものだろうか</b>。', id: 'Tidak bisakah ada cara yang lebih efisien dari ini?' },
    { jp: 'この問題を平和的に解決でき<b>ないものか</b>と思う。', id: 'Aku berharap masalah ini bisa diselesaikan secara damai.' },
  ],
  see_also_grammar: ['gn2-00232'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── NEGATION-EXTENT (23) ───────────────────────────────────

{
    id: 'gn2-00010', level: 'n2', pattern: '〜にわたって', reading: '〜ni watatte',
    meaning: 'meliputi ... / selama ... / di seluruh ...',
    cat: 'extent-degree',
    connection: 'N（periode/wilayah）+ にわたって',
    desc: '<b>〜にわたって</b> menyatakan rentang waktu atau wilayah yang luas.',
    examples: [
      { jp: '三日間<b>にわたって</b>、会議が続いた。', id: 'Selama tiga hari, rapat terus berlangsung.' },
      { jp: '全国<b>にわたって</b>、調査が行われた。', id: 'Survei dilakukan di seluruh negeri.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00026', level: 'n2', pattern: '〜に応じて', reading: '〜ni oujite',
    meaning: 'sesuai dengan ... / sesuai keadaan ...',
    cat: 'comparison',
    connection: 'N + に応じて',
    desc: '<b>〜に応じて</b> menyatakan bahwa sesuatu berubah atau disesuaikan mengikuti kondisi yang disebutkan.',
    examples: [
      { jp: '能力<b>に応じて</b>、仕事を割り当てる。', id: 'Pekerjaan dibagi sesuai kemampuan.' },
      { jp: '状況<b>に応じて</b>、対応を変える。', id: 'Tanggapan diubah sesuai situasi.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00030', level: 'n2', pattern: '〜にすぎない', reading: '〜ni suginai',
    meaning: 'hanya ... saja / tidak lebih dari ...',
    cat: 'extent-degree',
    connection: 'V-dict / N + にすぎない',
    desc: '<b>〜にすぎない</b> menyatakan bahwa sesuatu tidak lebih dari apa yang disebutkan; meremehkan atau merendah.',
    examples: [
      { jp: 'これは私の意見<b>にすぎない</b>。', id: 'Ini hanya pendapat saya saja.' },
      { jp: '彼はただの知り合い<b>にすぎない</b>。', id: 'Dia tidak lebih dari sekadar kenalan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00036', level: 'n2', pattern: '〜どころではない', reading: '〜doko ro de wa nai',
  meaning: 'bukan waktunya untuk ... / tidak sempat ...',
  cat: 'extent-degree',
  connection: 'V-dict / N + どころではない',
  desc: '<b>〜どころではない</b> menyatakan bahwa situasi saat ini terlalu genting atau sibuk sehingga hal yang disebutkan sama sekali tidak memungkinkan untuk dilakukan.',
  nuance: 'Berbeda dari どころか yang membandingkan dua hal. どころではない menekankan ketidakmungkinan akibat kondisi yang mendesak. Terasa lebih kuat dari それどころじゃない (percakapan kasual).',
  examples: [
    { jp: '締め切りが明日なので、遊ぶ<b>どころではない</b>。', id: 'Karena deadline besok, ini bukan waktunya untuk bermain.' },
    { jp: '試験勉強<b>どころではない</b>、熱が40度もある。', id: 'Bukan waktunya belajar ujian, demamnya sampai 40 derajat.' },
    { jp: '旅行<b>どころではない</b>、仕事が山積みだ。', id: 'Bukan waktunya untuk liburan, pekerjaan menumpuk.' }
  ],
  see_also_grammar: ['gn2-00035'], see_also_vocab: [],
  confusion_pairs: ['gn2-00035'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00037', level: 'n2', pattern: '〜に過ぎない', reading: '〜ni sugi nai',
  meaning: 'hanya / tidak lebih dari ...',
  cat: 'extent-degree',
  connection: 'V-plain / N / Adj-plain + に過ぎない',
  desc: '<b>〜に過ぎない</b> menyatakan bahwa sesuatu tidak melebihi batas tertentu — "hanya sebatas itu" dan tidak lebih.',
  nuance: 'Mengandung nada meremehkan atau mengecilkan sesuatu. Berbeda dari だけ yang netral, に過ぎない terasa lebih kritis atau merendahkan nilai sesuatu.',
  examples: [
    { jp: 'これは私の個人的な意見<b>に過ぎない</b>。', id: 'Ini hanyalah pendapat pribadi saya, tidak lebih.' },
    { jp: '彼の言葉は冗談<b>に過ぎない</b>。', id: 'Kata-katanya hanyalah candaan belaka.' },
    { jp: 'まだ始まった<b>に過ぎない</b>ので、諦めないでほしい。', id: 'Ini baru saja dimulai, jadi tolong jangan menyerah.' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00040', level: 'n2', pattern: '〜にわたって / 〜にわたる', reading: '〜ni watatte / 〜ni wataru',
  meaning: 'sepanjang ... / mencakup ... / selama ...',
  cat: 'extent-degree',
  connection: 'N (waktu/jumlah/rentang) + にわたって / にわたる + N',
  desc: '<b>〜にわたって</b> menyatakan bahwa sesuatu berlangsung atau mencakup jangkauan tertentu — bisa dari segi waktu, jarak, maupun cakupan. Bentuk <b>〜にわたる</b> digunakan sebelum nomina.',
  nuance: 'Menekankan luas atau panjang cakupan tersebut. Berbeda dari 間 (aida) yang netral — にわたって mengandung kesan cakupan yang signifikan dan mengesankan.',
  examples: [
    { jp: '３年間<b>にわたって</b>研究を続けた。', id: 'Penelitian dilanjutkan selama 3 tahun penuh.' },
    { jp: '全国<b>にわたる</b>調査が実施された。', id: 'Survei yang mencakup seluruh negeri dilaksanakan.' },
    { jp: '長期<b>にわたって</b>交渉が続いている。', id: 'Negosiasi terus berlangsung dalam jangka panjang.' }
  ],
  see_also_grammar: ['gn2-00039'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00049', level: 'n2', pattern: '〜ほど〜ない', reading: '〜hodo 〜nai',
  meaning: 'tidak se... seperti ... / tidak semewah / tidak sehebat ...',
  cat: 'extent-degree',
  connection: 'N + ほど + V-nai / Adj-nai',
  desc: '<b>〜ほど〜ない</b> membandingkan dua hal dan menyatakan bahwa yang satu tidak mencapai tingkat atau kualitas yang lain. Digunakan untuk komparasi yang merendahkan atau mengurangi.',
  nuance: 'Berbeda dari と比べて yang lebih netral, ほど〜ない selalu bernuansa "kurang dari". Pembicara menetapkan standar referensi dengan nomina setelah ほど.',
  examples: [
    { jp: '東京<b>ほど</b>大きな都市は<b>ない</b>。', id: 'Tidak ada kota sebesar Tokyo.' },
    { jp: '思った<b>ほど</b>難しく<b>なかった</b>。', id: 'Tidak sesulit yang saya bayangkan.' },
    { jp: '彼女<b>ほど</b>優しい人は<b>いない</b>。', id: 'Tidak ada orang sebaik hati dirinya.' }
  ],
  see_also_grammar: ['gn2-00050'], see_also_vocab: [],
  confusion_pairs: ['gn2-00050'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00050', level: 'n2', pattern: '〜と比べて / 〜に比べて', reading: '〜to kurabete / 〜ni kurabete',
  meaning: 'dibandingkan dengan ...',
  cat: 'comparison',
  connection: 'N + と比べて / に比べて + [perbandingan]',
  desc: '<b>〜と比べて</b> dan <b>〜に比べて</b> digunakan untuk membandingkan dua hal secara langsung. Keduanya hampir identik, tetapi に比べて sedikit lebih formal.',
  nuance: 'Perbandingan bersifat netral — bisa lebih baik maupun lebih buruk. Berbeda dari ほど〜ない yang selalu bernuansa "kurang dari". と比べて lebih umum dipakai dalam percakapan.',
  examples: [
    { jp: '去年<b>と比べて</b>、今年は暑い。', id: 'Dibandingkan tahun lalu, tahun ini lebih panas.' },
    { jp: '日本語<b>に比べて</b>、中国語の発音は難しいと感じる。', id: 'Dibandingkan bahasa Jepang, saya merasa pengucapan bahasa Mandarin lebih sulit.' },
    { jp: '兄<b>と比べて</b>、私は背が低い。', id: 'Dibandingkan dengan kakak, saya lebih pendek.' }
  ],
  see_also_grammar: ['gn2-00049'], see_also_vocab: [],
  confusion_pairs: ['gn2-00049'],
  register: null, exceptions: null, notes: 'と比べて lebih umum/kasual; に比べて lebih formal. Keduanya bisa saling menggantikan di sebagian besar konteks.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00058', level: 'n2', pattern: '〜ことなく', reading: '〜koto naku',
  meaning: 'tanpa ... / tidak pernah (melakukan) ...',
  cat: 'negative',
  connection: 'V-dict + ことなく',
  desc: '<b>〜ことなく</b> menyatakan bahwa suatu tindakan dilakukan tanpa pernah melakukan tindakan lain yang disebutkan. Berfungsi seperti 〜ないで tetapi lebih formal.',
  nuance: 'Lebih formal dari ないで. ことなく mengandung nuansa konsistensi — seseorang terus melakukan sesuatu tanpa sekalipun menyimpang. Sering dipakai dalam tulisan dan narasi.',
  examples: [
    { jp: '彼は一度も休む<b>ことなく</b>、毎日練習した。', id: 'Tanpa sekalipun istirahat, dia berlatih setiap hari.' },
    { jp: '誰にも相談する<b>ことなく</b>、決断した。', id: 'Tanpa berkonsultasi dengan siapa pun, keputusan dibuat.' },
    { jp: '諦める<b>ことなく</b>、挑戦し続けた。', id: 'Tanpa menyerah, dia terus mencoba.' }
  ],
  see_also_grammar: ['gn2-00059'], see_also_vocab: [],
  confusion_pairs: ['gn2-00059'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00059', level: 'n2', pattern: '〜ことなしに', reading: '〜koto nashi ni',
  meaning: 'tanpa ... (lebih formal dari ことなく)',
  cat: 'negative',
  connection: 'V-dict + ことなしに',
  desc: '<b>〜ことなしに</b> memiliki makna yang sama dengan ことなく — menyatakan bahwa sesuatu dilakukan tanpa melakukan tindakan yang disebutkan — tetapi berasa lebih kaku dan formal.',
  nuance: 'Sering dipakai dalam konteks yang menegaskan bahwa kondisi tertentu tidak bisa dihindari: "tidak mungkin A tanpa B". Lebih sering dalam tulisan akademis atau sastrawi.',
  examples: [
    { jp: '練習する<b>ことなしに</b>、上達はできない。', id: 'Tanpa berlatih, tidak mungkin bisa berkembang.' },
    { jp: '彼の助け<b>なしに</b>は、成功しなかったでしょう。', id: 'Tanpa bantuannya, kemungkinan tidak akan berhasil.' },
    { jp: '犠牲を払う<b>ことなしに</b>、夢は実現しない。', id: 'Tanpa pengorbanan, impian tidak akan terwujud.' }
  ],
  see_also_grammar: ['gn2-00058'], see_also_vocab: [],
  confusion_pairs: ['gn2-00058'],
  register: 'written', exceptions: null, notes: 'ことなく dan ことなしに hampir sama; ことなしに lebih kaku dan lebih sering dalam teks tertulis atau sastra.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00073', level: 'n2', pattern: '〜てたまらない', reading: '〜te tamaranai',
  meaning: 'sangat ... / tidak tahan ... (sensasi atau keinginan yang kuat)',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + たまらない',
  desc: '<b>〜てたまらない</b> mengungkapkan perasaan, sensasi fisik, atau keinginan yang sangat kuat sehingga tidak tertahankan.',
  nuance: 'Bisa digunakan untuk emosi positif maupun negatif, dan juga sensasi fisik (lapar, dingin, sakit). Dibanding てならない yang lebih halus, たまらない terasa lebih intens dan langsung.',
  examples: [
    { jp: '寒くて<b>たまらない</b>から、早く帰りたい。', id: 'Sangat kedinginan, ingin cepat pulang.' },
    { jp: '彼のことが好きで<b>たまらない</b>。', id: 'Sangat menyukainya, tidak tahan.' },
    { jp: '試験前で緊張して<b>たまらない</b>。', id: 'Menjelang ujian, sangat gugup sampai tidak tahan.' }
  ],
  see_also_grammar: ['gn2-00074', 'gn2-00075'], see_also_vocab: [],
  confusion_pairs: ['gn2-00074', 'gn2-00075'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00074', level: 'n2', pattern: '〜てならない', reading: '〜te naranai',
  meaning: 'sungguh terasa ... / tidak bisa menahan perasaan ... (emosi yang muncul alami)',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + ならない',
  desc: '<b>〜てならない</b> mengungkapkan perasaan yang muncul secara alami dan kuat di luar kendali pembicara — biasanya emosi seperti sedih, rindu, khawatir, atau penasaran.',
  nuance: 'Lebih halus dan puitis dibanding てたまらない. Hampir selalu digunakan untuk emosi mendalam (悲しい、心配、気になる). Jarang untuk sensasi fisik seperti lapar atau lelah.',
  examples: [
    { jp: '故郷のことが懐かしく<b>てならない</b>。', id: 'Sungguh merindukan kampung halaman.' },
    { jp: '彼女の体調が心配で<b>ならない</b>。', id: 'Sangat khawatir dengan kondisi kesehatannya.' },
    { jp: 'なぜそうなったのか、気になっ<b>てならない</b>。', id: 'Sungguh penasaran mengapa hal itu bisa terjadi.' }
  ],
  see_also_grammar: ['gn2-00073', 'gn2-00075'], see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn2-00075'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00075', level: 'n2', pattern: '〜てしょうがない', reading: '〜te shō ga nai',
  meaning: 'sangat ... / tidak ada yang bisa dilakukan terhadap perasaan ini',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + しょうがない',
  desc: '<b>〜てしょうがない</b> mengungkapkan perasaan atau kondisi yang sangat kuat dan tidak bisa dikendalikan. Fungsinya mirip てたまらない, namun nuansanya lebih kasual.',
  nuance: 'てしょうがない = lebih kasual, biasa dalam percakapan lisan. てたまらない = bisa digunakan dalam tulisan juga. Bentuk lain yang sedikit lebih formal: てしかたない.',
  examples: [
    { jp: '眠くて<b>しょうがない</b>から、少し休憩した。', id: 'Sangat mengantuk, jadi istirahat sebentar.' },
    { jp: 'あのドラマが気になって<b>しょうがない</b>。', id: 'Sangat penasaran dengan drama itu.' },
    { jp: '試合に負けて、悔しくて<b>しょうがない</b>。', id: 'Kalah pertandingan, sangat kesal.' }
  ],
  see_also_grammar: ['gn2-00073', 'gn2-00074'], see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn2-00074'],
  register: 'spoken', exceptions: 'Bentuk lain: てしかたない (sedikit lebih formal/tulisan)', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00083', level: 'n2', pattern: '〜限り', reading: '〜kagiri',
  meaning: 'selama ... / sejauh ... / sampai batas ...',
  cat: 'extent-degree',
  connection: 'V-dict / V-nai / N + の + 限り',
  desc: '<b>〜限り</b> memiliki dua fungsi utama: (1) menyatakan batas kondisi atau waktu — "selama kondisi ini berlangsung"; (2) menyatakan batas pengetahuan atau kemampuan pembicara — "sejauh yang saya tahu/bisa".',
  nuance: 'Lebih luas dari 限りでは. Bisa digunakan untuk batas temporal (命ある限り) maupun batas pengetahuan (知る限り). 限りでは lebih spesifik untuk konteks pengetahuan pembicara.',
  examples: [
    { jp: '私が知る<b>限り</b>、彼は嘘をついたことがない。', id: 'Sejauh yang saya tahu, dia belum pernah berbohong.' },
    { jp: '命ある<b>限り</b>、夢を追い続ける。', id: 'Selama masih hidup, akan terus mengejar impian.' },
    { jp: '力の<b>限り</b>、全力で頑張ります。', id: 'Akan berusaha semaksimal kemampuan saya.' }
  ],
  see_also_grammar: ['gn2-00084'], see_also_vocab: [],
  confusion_pairs: ['gn2-00084'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00084', level: 'n2', pattern: '〜限りでは', reading: '〜kagiri de wa',
  meaning: 'sejauh yang saya ketahui ... / berdasarkan yang saya amati ...',
  cat: 'extent-degree',
  connection: 'V-dict / N + の + 限りでは',
  desc: '<b>〜限りでは</b> menyatakan bahwa informasi yang disampaikan terbatas pada apa yang diamati atau diketahui oleh pembicara — "sejauh yang saya lihat / ketahui".',
  nuance: 'Lebih spesifik dari 限り. Hampir selalu digunakan untuk membatasi ruang lingkup pengetahuan pembicara, bukan kondisi temporal. Sering diikuti dengan ekspresi ketidakpastian seperti ようだ atau らしい.',
  examples: [
    { jp: '私が調べた<b>限りでは</b>、問題はないようだ。', id: 'Sejauh yang saya teliti, tampaknya tidak ada masalah.' },
    { jp: '今のところ確認できた<b>限りでは</b>、被害は出ていない。', id: 'Sejauh yang bisa dikonfirmasi sejauh ini, belum ada korban.' },
    { jp: '彼が話した<b>限りでは</b>、計画は順調らしい。', id: 'Berdasarkan yang dia ceritakan, rencana tampaknya berjalan lancar.' }
  ],
  see_also_grammar: ['gn2-00083'], see_also_vocab: [],
  confusion_pairs: ['gn2-00083'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00094',
  level: 'n2',
  pattern: '〜に限らず',
  reading: '〜ni kagirazu',
  meaning: 'tidak terbatas pada ... saja / tidak hanya ...',
  cat: 'extent-degree',
  connection: 'N + に限らず',
  desc: '<b>〜に限らず</b> menyatakan bahwa sesuatu tidak terbatas hanya pada X, melainkan berlaku lebih luas atau mencakup Y juga.',
  nuance: 'Menekankan perluasan cakupan — "jangan salah anggap ini hanya soal X". Sering berpasangan dengan 〜も atau 〜でも. Bisa digunakan dalam konteks formal maupun sehari-hari.',
  examples: [
    { jp: '子供<b>に限らず</b>、大人にも人気のあるゲームだ。', id: 'Ini bukan hanya permainan yang populer di kalangan anak-anak, tapi juga di kalangan orang dewasa.' },
    { jp: '日本<b>に限らず</b>、アジア全体でこの問題が深刻化している。', id: 'Masalah ini tidak hanya serius di Jepang, tapi di seluruh Asia.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00093'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091'],
  register: null,
  exceptions: null,
  notes: '〜に限らず adalah bentuk negatif dari 〜に限り (terbatas pada ...). Jangan dicampur dengan 〜にかかわらず.',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00110',
  level: 'n2',
  pattern: '〜を中心に',
  reading: '〜wo chuushin ni',
  meaning: 'berpusat pada ... / dengan ... sebagai inti / yang difokuskan pada ...',
  cat: 'extent-degree',
  connection: 'N + を中心に / を中心として / を中心にして',
  desc: '<b>〜を中心に</b> menyatakan bahwa sesuatu terjadi atau dilakukan dengan X sebagai pusat, titik fokus, atau inti. Bisa bermakna geografis maupun figuratif.',
  nuance: 'Sangat fleksibel dan umum digunakan dalam berbagai register. Makna geografis: "berpusat di X secara fisik". Makna figuratif: "dengan X sebagai fokus utama". を中心として sedikit lebih formal.',
  examples: [
    { jp: '東京<b>を中心に</b>、関東地方全域に被害が広がった。', id: 'Dengan Tokyo sebagai pusat, kerusakan meluas ke seluruh wilayah Kanto.' },
    { jp: '若者層<b>を中心に</b>、このサービスへの支持が急速に広がっている。', id: 'Berpusat pada kalangan anak muda, dukungan terhadap layanan ini menyebar dengan cepat.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00135', level: 'n2', pattern: '〜に照らして',
  reading: '〜ni terashite',
  meaning: 'bila dibandingkan/diukur dengan standar ..., berdasarkan tolok ukur ...',
  cat: 'comparison',
  connection: 'N + に照らして / N + に照らすと',
  desc: '<b>〜に照らして</b> menyatakan bahwa sesuatu dinilai, diverifikasi, atau dipertimbangkan dengan mengacu pada standar, hukum, aturan, atau preseden tertentu. Seperti "menerangi dengan cahaya X untuk memeriksa Y".',
  nuance: 'Berbeda dari に基づいて yang menyatakan "berlandaskan" secara umum — に照らして secara spesifik menyiratkan perbandingan terhadap norma atau standar yang sudah ada (hukum, aturan, pengalaman lalu). Digunakan dalam konteks hukum, evaluasi akademik, atau penilaian formal.',
  examples: [
    { jp: '法律<b>に照らして</b>、この行為は問題ないと判断された。', id: 'Bila diukur dengan standar hukum, tindakan ini dinilai tidak bermasalah.' },
    { jp: '過去の事例<b>に照らして</b>考えると、このプロジェクトは成功する可能性が高い。', id: 'Bila dibandingkan dengan kasus-kasus terdahulu, proyek ini cukup berpeluang berhasil.' }
  ],
  see_also_grammar: ['gn2-00136'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00136'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00147', level: 'n2', pattern: '〜に過ぎない',
  reading: '〜ni suginai',
  meaning: 'hanyalah ..., tidak lebih dari ..., sekadar ...',
  cat: 'extent-degree',
  connection: 'N + に過ぎない / V-plain + に過ぎない',
  desc: '<b>〜に過ぎない</b> menyatakan bahwa sesuatu tidak lebih dari apa yang disebutkan — meminimalkan atau meremehkan suatu hal. Memberikan kesan bahwa hal tersebut tidak sepenting yang dibayangkan.',
  nuance: 'Berbeda dari だけ/しか (hanya, netral secara jumlah) — に過ぎない mengandung nuansa merendahkan atau menyatakan keterbatasan secara evaluatif. "Ini hanyalah... jangan terlalu berharap/dilebihkan." Umumnya digunakan dalam bahasa tulis atau formal.',
  examples: [
    { jp: 'これはあくまでも私の意見<b>に過ぎない</b>。', id: 'Ini tidak lebih dari sekadar pendapat pribadi saya.' },
    { jp: '彼の成功は運<b>に過ぎない</b>と言う人もいる。', id: 'Ada yang mengatakan keberhasilannya hanyalah keberuntungan semata.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00148'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00158', level: 'n2', pattern: '〜かねる',
  reading: '〜kaneru',
  meaning: 'sulit untuk ..., tidak bisa (dengan halus) ..., tidak sanggup ...',
  cat: 'negative',
  connection: 'V-stem + かねる',
  desc: '<b>〜かねる</b> digunakan untuk menolak atau menyatakan ketidaksanggupan secara sopan dan tidak langsung. Menyiratkan bahwa ada hambatan psikologis, emosional, atau moral yang membuat pembicara tidak bisa melakukan sesuatu.',
  nuance: 'Berbeda dari かねない (kemungkinan hal buruk) — かねる adalah penolakan halus dari sudut pandang penutur. Sering digunakan dalam konteks bisnis atau formal untuk menolak permintaan tanpa terkesan kasar. Contoh: 承りかねます (tidak dapat kami terima dengan hormat).',
  examples: [
    { jp: 'そのご要望にはお応えし<b>かねます</b>。', id: 'Dengan hormat, kami tidak dapat memenuhi permintaan tersebut.' },
    { jp: 'あの映画は内容が残酷すぎて、見<b>かねる</b>。', id: 'Film itu terlalu kejam isinya, rasanya tidak sanggup menontonnya.' }
  ],
  see_also_grammar: ['gn2-00157'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00157'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00177', level: 'n2', pattern: '〜てたまらない',
  reading: '〜te tamaranai',
  meaning: 'tidak tahan ..., sangat ... (perasaan/sensasi yang tidak bisa ditahan)',
  cat: 'extent-degree',
  connection: 'V-て + たまらない / い-Adj-くて + たまらない / な-Adj-で + たまらない',
  desc: '<b>〜てたまらない</b> mengungkapkan perasaan, keinginan, atau sensasi fisik yang sangat kuat hingga tidak bisa ditahan. Selalu mengacu pada kondisi involunter — sesuatu yang dirasakan, bukan dipilih.',
  nuance: 'Lebih spoken dan intens dibandingkan てならない — てたまらない bisa digunakan untuk perasaan emosional (寂しくてたまらない) maupun sensasi fisik (お腹が空いてたまらない). てならない lebih formal dan terbatas pada perasaan mendalam, tidak untuk sensasi fisik.',
  examples: [
    { jp: '試験前で、緊張し<b>てたまらない</b>。', id: 'Menjelang ujian, rasanya tidak tahan gugupnya.' },
    { jp: '彼女に会いたく<b>てたまらない</b>。', id: 'Tidak tahan rasanya ingin bertemu dengannya.' },
    { jp: '辛いものを食べて、口が痛く<b>てたまらない</b>。', id: 'Setelah makan yang pedas, mulutnya terasa sakit tidak tertahankan.' }
  ],
  see_also_grammar: ['gn2-00178'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00178'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00178', level: 'n2', pattern: '〜てならない',
  reading: '〜te naranai',
  meaning: 'sangat ... tanpa bisa ditahan (perasaan mendalam, formal)',
  cat: 'extent-degree',
  connection: 'V-て + ならない / い-Adj-くて + ならない',
  desc: '<b>〜てならない</b> mengungkapkan perasaan yang sangat mendalam dan tidak bisa dikendalikan — seperti kerinduan, kekhawatiran, rasa haru, atau kesedihan yang muncul secara alami. Lebih formal dan literer dari てたまらない.',
  nuance: 'Berbeda dari てたまらない (bisa untuk sensasi fisik dan lebih spoken) — てならない terbatas pada perasaan emosional atau psikologis yang mendalam, dan tidak bisa digunakan untuk sensasi fisik seperti lapar atau sakit. Umumnya muncul dalam tulisan, sastra, atau bahasa formal.',
  examples: [
    { jp: '故郷のことが懐かしく<b>てならない</b>。', id: 'Rasa rindu pada kampung halaman sungguh tidak terbendung.' },
    { jp: '彼の将来が心配で<b>てならない</b>。', id: 'Kekhawatiran akan masa depannya sungguh tidak bisa kubendung.' }
  ],
  see_also_grammar: ['gn2-00177'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00177'],
  register: 'formal', exceptions: null,
  notes: 'Tidak bisa digunakan untuk sensasi fisik (lapar, sakit, dll) — hanya untuk perasaan emosional/psikologis.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00208',
  level: 'n2',
  pattern: '〜ことはない',
  reading: '~koto wa nai',
  meaning: 'tidak perlu ..., tidak ada alasan untuk ...',
  cat: 'negative',
  connection: 'V-plain (辞書形) + ことはない',
  desc: '<b>〜ことはない</b> menyatakan bahwa tidak ada kebutuhan atau alasan untuk melakukan sesuatu — digunakan untuk menenangkan orang atau melarang dengan cara yang halus. Seringkali digunakan untuk mengatakan bahwa kekhawatiran atau tindakan seseorang tidak diperlukan.',
  nuance: 'Berbeda dengan 〜なくていい (tidak harus) yang lebih kasual dan netral, 〜ことはない mengandung nuansa yang lebih persuasif atau menenangkan — seperti merespons kekhawatiran seseorang dengan "tidak perlu begitu". Juga berbeda dengan 〜てはいけない (dilarang) — 〜ことはない tidak melarang, hanya menyatakan ketidakperluan.',
  examples: [
    { jp: 'そんなに心配する<b>ことはない</b>よ。', id: 'Tidak perlu khawatir sebegitu itu.' },
    { jp: '一度の失敗で諦める<b>ことはない</b>。', id: 'Tidak ada alasan untuk menyerah hanya karena satu kali gagal.' },
    { jp: '謝る<b>ことはない</b>。あなたは悪くない。', id: 'Tidak perlu minta maaf. Kamu tidak salah.' },
  ],
  see_also_grammar: ['gn2-00207'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── CONNECTIVES (112) ───────────────────────────────────

{
    id: 'gn2-00001', level: 'n2', pattern: '〜に反して', reading: '〜ni hanshite',
    meaning: 'bertentangan dengan ... / melawan ...',
    cat: 'contrast-concession',
    connection: 'N + に反して',
    desc: '<b>〜に反して</b> menyatakan bahwa sesuatu terjadi berlawanan dari harapan, aturan, atau kehendak yang disebutkan.',
    examples: [
      { jp: '予想<b>に反して</b>、試験は難しかった。', id: 'Bertentangan dengan perkiraan, ujiannya sulit.' },
      { jp: '親の意志<b>に反して</b>、彼は会社を辞めた。', id: 'Melawan kehendak orang tuanya, dia berhenti dari perusahaan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00002', level: 'n2', pattern: '〜に加えて', reading: '〜ni kuwaete',
    meaning: 'selain ... / ditambah dengan ...',
    cat: 'listing-addition',
    connection: 'N + に加えて',
    desc: '<b>〜に加えて</b> digunakan untuk menambahkan informasi atau kondisi di atas yang sudah ada.',
    examples: [
      { jp: '寒さ<b>に加えて</b>、風も強かった。', id: 'Selain dingin, anginnya pun kencang.' },
      { jp: '英語<b>に加えて</b>、日本語も話せます。', id: 'Selain bahasa Inggris, saya juga bisa berbahasa Jepang.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00011', level: 'n2', pattern: '〜に基づいて', reading: '〜ni motozuite',
    meaning: 'berdasarkan ... / berlandaskan ...',
    cat: 'quotation-thought',
    connection: 'N + に基づいて',
    desc: '<b>〜に基づいて</b> menyatakan dasar atau landasan dari suatu tindakan atau keputusan.',
    examples: [
      { jp: 'データ<b>に基づいて</b>、報告書を作成した。', id: 'Berdasarkan data, laporan dibuat.' },
      { jp: '法律<b>に基づいて</b>、処罰される。', id: 'Dihukum berdasarkan hukum.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00012', level: 'n2', pattern: '〜はもちろん', reading: '〜wa mochiron',
    meaning: 'sudah tentu ... / tidak hanya ... bahkan ...',
    cat: 'listing-addition',
    connection: 'N + はもちろん',
    desc: '<b>〜はもちろん</b> menyatakan bahwa hal yang disebutkan pertama sudah jelas, dan hal kedua pun juga berlaku.',
    examples: [
      { jp: '日本語<b>はもちろん</b>、英語も話せる。', id: 'Sudah tentu bahasa Jepang, bahasa Inggris pun bisa.' },
      { jp: '大人<b>はもちろん</b>、子供も楽しめる。', id: 'Tidak hanya orang dewasa, anak-anak pun bisa menikmati.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00014', level: 'n2', pattern: '〜どころか', reading: '〜dokoro ka',
    meaning: 'jangankan ... bahkan ... / bukannya ... malah ...',
    cat: 'contrast-concession',
    connection: 'V/Adj plain / N + どころか',
    desc: '<b>〜どころか</b> menyatakan bahwa kenyataannya jauh berbeda (biasanya lebih ekstrem) dari yang diharapkan atau disebutkan.',
    examples: [
      { jp: '褒める<b>どころか</b>、叱られた。', id: 'Bukannya dipuji, malah dimarahi.' },
      { jp: '楽になる<b>どころか</b>、もっと忙しくなった。', id: 'Jangankan santai, malah makin sibuk.' },
    ],
    see_also_grammar: ['gn2-00013'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00015', level: 'n2', pattern: '〜ものの', reading: '〜mono no',
    meaning: 'meskipun ... / walau ...',
    cat: 'contrast-concession',
    connection: 'V/Adj plain / N + である + ものの',
    desc: '<b>〜ものの</b> menyatakan konsesi: meskipun kondisi pertama terpenuhi, hasilnya tidak sesuai harapan.',
    examples: [
      { jp: '資格は取った<b>ものの</b>、使う機会がない。', id: 'Meskipun sudah dapat sertifikat, tidak ada kesempatan menggunakannya.' },
      { jp: '安い<b>ものの</b>、品質が悪い。', id: 'Walaupun murah, kualitasnya buruk.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00016', level: 'n2', pattern: '〜わけだ', reading: '〜wake da',
    meaning: 'pantas saja ... / memang ... / artinya ...',
    cat: 'reason-cause',
    connection: 'V/Adj plain / N + の + わけだ',
    desc: '<b>〜わけだ</b> digunakan ketika pembicara memahami alasan atau kesimpulan dari suatu situasi.',
    examples: [
      { jp: '彼は10年間日本にいた。日本語が上手な<b>わけだ</b>。', id: 'Dia tinggal 10 tahun di Jepang. Pantas saja bahasa Jepangnya bagus.' },
      { jp: 'そういう<b>わけだ</b>ったのか。', id: 'Jadi begitu ya ceritanya.' },
    ],
    see_also_grammar: ['gn2-00017'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00024', level: 'n2', pattern: '〜といえば', reading: '〜to ieba',
    meaning: 'berbicara tentang ... / kalau bicara soal ...',
    cat: 'quotation-thought',
    connection: 'N + といえば',
    desc: '<b>〜といえば</b> digunakan untuk memperkenalkan topik atau merespons sesuatu yang baru saja disebutkan.',
    examples: [
      { jp: '桜<b>といえば</b>、京都が有名だ。', id: 'Kalau bicara soal bunga sakura, Kyoto terkenal.' },
      { jp: '夏<b>といえば</b>、花火だね。', id: 'Berbicara tentang musim panas, ya kembang api.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00025', level: 'n2', pattern: '〜をはじめ', reading: '〜wo hajime',
    meaning: 'mulai dari ... / terutama ... dan lainnya',
    cat: 'listing-addition',
    connection: 'N + をはじめ（として）',
    desc: '<b>〜をはじめ</b> memperkenalkan contoh utama/terpenting sebelum menyebutkan yang lain.',
    examples: [
      { jp: '東京<b>をはじめ</b>、多くの都市で開催された。', id: 'Diadakan di banyak kota, mulai dari Tokyo.' },
      { jp: '山田さん<b>をはじめ</b>、全員が賛成した。', id: 'Mulai dari Yamada-san, semua setuju.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00027', level: 'n2', pattern: '〜をもとに', reading: '〜wo moto ni',
    meaning: 'berdasarkan ... / mengacu pada ...',
    cat: 'quotation-thought',
    connection: 'N + をもとに（して）',
    desc: '<b>〜をもとに</b> menyatakan sumber atau bahan dasar dari suatu tindakan atau karya.',
    examples: [
      { jp: '実話<b>をもとに</b>した映画だ。', id: 'Ini film yang didasarkan pada kisah nyata.' },
      { jp: 'アンケート結果<b>をもとに</b>、改善した。', id: 'Diperbaiki berdasarkan hasil kuesioner.' },
    ],
    see_also_grammar: ['gn2-00011'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00028', level: 'n2', pattern: '〜だけでなく', reading: '〜dake de naku',
    meaning: 'tidak hanya ... tetapi juga ...',
    cat: 'listing-addition',
    connection: 'V/Adj plain / N + だけでなく',
    desc: '<b>〜だけでなく</b> menambahkan informasi tambahan; mirip ばかりでなく dan のみならず.',
    examples: [
      { jp: '彼女は頭がいい<b>だけでなく</b>、心も優しい。', id: 'Dia tidak hanya cerdas, tapi juga baik hati.' },
      { jp: '日本<b>だけでなく</b>、海外でも人気だ。', id: 'Tidak hanya di Jepang, tapi juga populer di luar negeri.' },
    ],
    see_also_grammar: ['gn2-00013'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00031', level: 'n2', pattern: '〜にもかかわらず', reading: '〜ni mo kakawarazu',
  meaning: 'meskipun ... (formal) / walaupun ...',
  cat: 'contrast-concession',
  connection: 'V-plain / N / Adj-plain + にもかかわらず',
  desc: '<b>〜にもかかわらず</b> menyatakan bahwa hasil sesuatu berlawanan dari yang diharapkan, meskipun ada kondisi atau fakta tertentu. Digunakan dalam konteks formal dan tulisan resmi.',
  nuance: 'Lebih kuat dan formal dibanding のに atau けれども. Cocok untuk laporan, berita, dan teks akademis. Pembicara tidak perlu terlibat secara emosional seperti pada のに.',
  examples: [
    { jp: '雨<b>にもかかわらず</b>、大勢の人が集まった。', id: 'Meskipun hujan, banyak orang yang berkumpul.' },
    { jp: '努力した<b>にもかかわらず</b>、結果は出なかった。', id: 'Meskipun sudah berusaha, hasilnya tidak muncul.' },
    { jp: '反対意見<b>にもかかわらず</b>、計画は進められた。', id: 'Meskipun ada pendapat yang menentang, rencana tetap dilanjutkan.' }
  ],
  see_also_grammar: ['gn2-00032'], see_also_vocab: [],
  confusion_pairs: ['gn2-00032'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00032', level: 'n2', pattern: '〜ものの', reading: '〜mono no',
  meaning: 'meskipun ... (tapi kenyataannya ...)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + ではある + ものの',
  desc: '<b>〜ものの</b> mengakui kondisi di bagian pertama kalimat, lalu menunjukkan bahwa bagian kedua berlawanan dari harapan atau logika yang semestinya.',
  nuance: 'Lebih formal dari けど atau が. Sering muncul dalam teks tulisan. Berbeda dari にもかかわらず — ものの terasa lebih reflektif dan personal, sedangkan にもかかわらず lebih objektif.',
  examples: [
    { jp: '合格した<b>ものの</b>、喜ぶ気になれなかった。', id: 'Meskipun lulus, tidak bisa merasa senang.' },
    { jp: '買った<b>ものの</b>、まだ一度も使っていない。', id: 'Meskipun sudah dibeli, belum pernah dipakai sekalipun.' },
    { jp: '日本語を勉強している<b>ものの</b>、会話はまだ難しい。', id: 'Meskipun sedang belajar bahasa Jepang, percakapan masih sulit.' }
  ],
  see_also_grammar: ['gn2-00031'], see_also_vocab: [],
  confusion_pairs: ['gn2-00031'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00033', level: 'n2', pattern: '〜だけでなく〜も', reading: '〜dake de naku 〜mo',
  meaning: 'bukan hanya A, tapi juga B',
  cat: 'listing-addition',
  connection: 'N / V-plain / Adj + だけでなく + [elemen tambahan] + も',
  desc: '<b>〜だけでなく〜も</b> digunakan untuk menambahkan informasi — menyatakan bahwa tidak hanya A yang berlaku, melainkan B juga termasuk.',
  nuance: 'Dapat digunakan dalam konteks formal maupun informal. Lebih tegas dari も saja karena secara eksplisit menekankan "bukan hanya". Bandingkan dengan のみならず yang lebih formal.',
  examples: [
    { jp: '彼は英語<b>だけでなく</b>、フランス語<b>も</b>話せる。', id: 'Dia tidak hanya bisa bahasa Inggris, tapi juga bahasa Prancis.' },
    { jp: '子ども<b>だけでなく</b>、大人<b>も</b>楽しめるイベントです。', id: 'Ini adalah acara yang tidak hanya bisa dinikmati anak-anak, tapi orang dewasa juga.' },
    { jp: '体<b>だけでなく</b>、心<b>も</b>疲れている。', id: 'Bukan hanya badan, tapi hati pun sudah lelah.' }
  ],
  see_also_grammar: ['gn2-00046', 'gn2-00034'], see_also_vocab: [],
  confusion_pairs: ['gn2-00046', 'gn2-00034'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00034', level: 'n2', pattern: '〜に限らず', reading: '〜ni kagirazu',
  meaning: 'tidak terbatas pada ... / tidak hanya ...',
  cat: 'listing-addition',
  connection: 'N + に限らず',
  desc: '<b>〜に限らず</b> menyatakan bahwa sesuatu tidak terbatas hanya pada satu hal atau kelompok tertentu — berlaku lebih luas dari yang disebutkan.',
  nuance: 'Lebih formal dari だけでなく. Sering dipakai dalam tulisan dan pengumuman resmi. Subyek yang mengikuti に限らず biasanya merupakan kategori atau kelompok (bukan individu).',
  examples: [
    { jp: '日本人<b>に限らず</b>、外国人も参加できます。', id: 'Tidak terbatas hanya warga Jepang, orang asing pun bisa ikut serta.' },
    { jp: '社員<b>に限らず</b>、家族も招待されました。', id: 'Tidak hanya karyawan, keluarga pun diundang.' },
    { jp: '大都市<b>に限らず</b>、地方でも問題が起きている。', id: 'Bukan hanya di kota besar, masalah juga terjadi di daerah.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00046'], see_also_vocab: [],
  confusion_pairs: ['gn2-00033'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00035', level: 'n2', pattern: '〜どころか', reading: '〜doko ro ka',
  meaning: 'jauh dari itu / bahkan ... (malah sebaliknya)',
  cat: 'contrast-concession',
  connection: 'V-plain / N / Adj-plain + どころか',
  desc: '<b>〜どころか</b> menyangkal anggapan sebelumnya dan menyatakan bahwa kenyataannya justru jauh berbeda — bahkan bisa kebalikannya.',
  nuance: 'Sangat berbeda dari のに atau ものの. どころか mengandung unsur kejutan atau bantahan yang kuat. Sering diikuti penegasan seperti むしろ atau さえ.',
  examples: [
    { jp: '休む<b>どころか</b>、残業が増えた。', id: 'Bukannya istirahat, malah lembur semakin banyak.' },
    { jp: '謝る<b>どころか</b>、怒り出した。', id: 'Bukannya minta maaf, malah marah.' },
    { jp: '楽になる<b>どころか</b>、もっと大変になった。', id: 'Bukannya menjadi lebih mudah, malah semakin berat.' }
  ],
  see_also_grammar: ['gn2-00036'], see_also_vocab: [],
  confusion_pairs: ['gn2-00036'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00038', level: 'n2', pattern: '〜に対して', reading: '〜ni taishite',
  meaning: 'terhadap ... / sedangkan ... / berbanding dengan ...',
  cat: 'contrast-concession',
  connection: 'N + に対して / に対する + N',
  desc: '<b>〜に対して</b> memiliki dua fungsi utama: (1) menunjukkan arah atau sasaran tindakan, (2) membandingkan dua hal yang berlawanan atau berbeda.',
  nuance: 'Ketika dipakai untuk kontras, に対して bersifat objektif — cocok untuk tulisan formal. Berbeda dari 一方で yang juga kontras tetapi lebih berstruktur naratif.',
  examples: [
    { jp: '弟が内向的<b>に対して</b>、姉は社交的だ。', id: 'Berbanding dengan adik yang introvert, kakak perempuannya ekstrovert.' },
    { jp: '昨年の売上<b>に対して</b>、今年は大幅に増加した。', id: 'Dibandingkan penjualan tahun lalu, tahun ini meningkat drastis.' },
    { jp: '先生の質問<b>に対して</b>、学生が答えた。', id: 'Terhadap pertanyaan guru, murid-murid menjawab.' }
  ],
  see_also_grammar: ['gn2-00051', 'gn2-00052'], see_also_vocab: [],
  confusion_pairs: ['gn2-00051'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00042', level: 'n2', pattern: '〜によって / 〜による', reading: '〜ni yotte / 〜ni yoru',
  meaning: 'oleh ... / tergantung pada ... / karena ... (varian makna)',
  cat: 'reason-cause',
  connection: 'N + によって / による + N',
  desc: '<b>〜によって</b> memiliki beberapa makna sekaligus: (1) pelaku dalam kalimat pasif, (2) cara/metode ("melalui/dengan cara"), (3) penyebab, (4) variasi tergantung kondisi.',
  nuance: 'Pola ini sangat multifungsi. Untuk makna "tergantung", よって tidak bisa diganti で. Bentuk attributif による sering muncul dalam berita: 〜による被害 (kerugian akibat ...).',
  examples: [
    { jp: 'この小説はある作家<b>によって</b>書かれた。', id: 'Novel ini ditulis oleh seorang penulis tertentu.' },
    { jp: '人<b>によって</b>、意見が異なる。', id: 'Tergantung orangnya, pendapat bisa berbeda-beda.' },
    { jp: '台風<b>による</b>被害が広がっている。', id: 'Kerusakan akibat topan terus meluas.' }
  ],
  see_also_grammar: ['gn2-00041', 'gn2-00043'], see_also_vocab: [],
  confusion_pairs: ['gn2-00041', 'gn2-00043'],
  register: null, exceptions: null, notes: 'Pelajari tiap makna secara terpisah karena masing-masing memiliki konteks yang berbeda.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00044', level: 'n2', pattern: '〜をはじめ / 〜をはじめとして', reading: '〜wo hajime / 〜wo hajime to shite',
  meaning: 'dimulai dari ... / termasuk ... / antara lain ...',
  cat: 'listing-addition',
  connection: 'N (representatif) + をはじめ / をはじめとして + N (kelompok/tambahan)',
  desc: '<b>〜をはじめ</b> memperkenalkan daftar dengan menyebut satu contoh paling representatif, lalu mengisyaratkan bahwa masih ada anggota lain dalam kelompok tersebut.',
  nuance: 'Nomina pertama harus yang paling menonjol atau penting dalam kelompok. Berbeda dari など yang hanya menambahkan contoh tanpa hierarki.',
  examples: [
    { jp: '東京<b>をはじめ</b>、全国各地でイベントが開催された。', id: 'Dimulai dari Tokyo, acara diselenggarakan di berbagai penjuru negeri.' },
    { jp: '社長<b>をはじめとして</b>、全員が参加した。', id: 'Dimulai dari direktur, semua orang ikut serta.' },
    { jp: '日本語<b>をはじめ</b>、アジアの言語に興味がある。', id: 'Saya tertarik pada bahasa-bahasa Asia, terutama dimulai dari bahasa Jepang.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00046'], see_also_vocab: [],
  confusion_pairs: ['gn2-00046'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00046', level: 'n2', pattern: '〜のみならず', reading: '〜nomi narazu',
  meaning: 'tidak hanya ... (formal/tulisan)',
  cat: 'listing-addition',
  connection: 'V-plain / N / Adj + のみならず',
  desc: '<b>〜のみならず</b> adalah padanan formal dari だけでなく — menyatakan bahwa tidak hanya A, tapi B juga termasuk. Hampir eksklusif digunakan dalam tulisan formal.',
  nuance: 'Setara dengan だけでなく dalam makna, tetapi jauh lebih formal dan kaku. Tidak lazim dalam percakapan sehari-hari. Sering muncul dalam pidato, teks akademis, dan berita.',
  examples: [
    { jp: 'この問題は学生<b>のみならず</b>、教師にも関係する。', id: 'Masalah ini tidak hanya berkaitan dengan siswa, tetapi juga dengan guru.' },
    { jp: '健康<b>のみならず</b>、精神的な安定も重要だ。', id: 'Tidak hanya kesehatan fisik, keseimbangan mental pun penting.' },
    { jp: '国内<b>のみならず</b>、海外でも評価されている。', id: 'Tidak hanya diakui di dalam negeri, tapi juga dihargai di luar negeri.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00034'], see_also_vocab: [],
  confusion_pairs: ['gn2-00033', 'gn2-00044'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00048', level: 'n2', pattern: '〜さえ〜ても', reading: '〜sae 〜temo',
  meaning: 'bahkan jika ... (pun tetap ...)',
  cat: 'contrast-concession',
  connection: 'N + さえ + V-te + も / Adj + くさえあっても',
  desc: '<b>〜さえ〜ても</b> mengungkapkan kondisi ekstrem yang diikuti hasil yang tidak berubah. Menyatakan bahwa bahkan dalam kasus paling ekstrem sekalipun, hasilnya tetap sama.',
  nuance: 'Berbeda dari さえ〜ば yang kondisional-positif, さえ〜ても bersifat kontraharapan. Menekankan bahwa bahkan kondisi yang paling sulit tidak mengubah kenyataan.',
  examples: [
    { jp: '努力<b>さえし</b>ても、全員が合格するわけではない。', id: 'Bahkan jika berusaha sekalipun, tidak berarti semua orang bisa lulus.' },
    { jp: 'お金<b>さえあっても</b>、幸せになれるとは限らない。', id: 'Bahkan jika punya uang sekalipun, belum tentu bisa bahagia.' },
    { jp: '謝って<b>さえいても</b>、許されないこともある。', id: 'Bahkan jika sudah meminta maaf sekalipun, kadang tidak dimaafkan.' }
  ],
  see_also_grammar: ['gn2-00047'], see_also_vocab: [],
  confusion_pairs: ['gn2-00047'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00051', level: 'n2', pattern: '〜一方で', reading: '〜ippou de',
  meaning: 'di satu sisi ... di sisi lain ... / sementara itu ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + である + 一方で',
  desc: '<b>〜一方で</b> digunakan untuk menyandingkan dua fakta atau tindakan yang berbeda, sering kali berlawanan atau kontras, yang dimiliki oleh subjek yang sama atau situasi yang sama.',
  nuance: 'Berbeda dari に対して yang membandingkan dua subjek berbeda, 一方で sering menggambarkan dua sisi dari satu hal yang sama. Bisa juga berarti "sementara itu" (progresif paralel).',
  examples: [
    { jp: '便利になった<b>一方で</b>、プライバシーの問題も増えた。', id: 'Di satu sisi menjadi lebih praktis, di sisi lain masalah privasi pun bertambah.' },
    { jp: '彼は優しい<b>一方で</b>、とても厳しい面もある。', id: 'Di satu sisi dia baik hati, di sisi lain ada sisi yang sangat tegas.' },
    { jp: '勉強している<b>一方で</b>、アルバイトもしている。', id: 'Di satu sisi sedang belajar, di sisi lain juga bekerja paruh waktu.' }
  ],
  see_also_grammar: ['gn2-00052', 'gn2-00038'], see_also_vocab: [],
  confusion_pairs: ['gn2-00052', 'gn2-00038'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00052', level: 'n2', pattern: '〜反面', reading: '〜hanmen',
  meaning: 'di satu sisi ... di sisi lain ... (formal — dua sisi berlawanan)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + である + 反面',
  desc: '<b>〜反面</b> menyatakan bahwa suatu hal memiliki dua sisi yang bertentangan — kelebihan dan kekurangan, atau sifat positif dan negatif secara bersamaan.',
  nuance: 'Lebih formal dan kuat dari 一方で. 反面 (harfiah: "sisi sebaliknya") menyiratkan adanya kontradiksi inheren dalam satu hal yang sama. Tidak bisa digunakan untuk dua subjek berbeda.',
  examples: [
    { jp: 'この薬は効果がある<b>反面</b>、副作用も強い。', id: 'Obat ini efektif, namun di sisi lain efek sampingnya juga kuat.' },
    { jp: '都市生活は便利な<b>反面</b>、孤独を感じやすい。', id: 'Kehidupan kota itu nyaman, namun di sisi lain mudah merasa kesepian.' },
    { jp: '彼は頭が良い<b>反面</b>、コミュニケーションが苦手だ。', id: 'Dia cerdas, namun di sisi lain lemah dalam berkomunikasi.' }
  ],
  see_also_grammar: ['gn2-00051'], see_also_vocab: [],
  confusion_pairs: ['gn2-00051'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00056', level: 'n2', pattern: '〜を通じて / 〜を通して', reading: '〜wo tsuujite / 〜wo tooshite',
  meaning: 'melalui ... / lewat ... / sepanjang ...',
  cat: 'purpose',
  connection: 'N (media/periode) + を通じて / を通して',
  desc: '<b>〜を通じて</b> dan <b>〜を通して</b> menyatakan saluran, media, atau metode yang digunakan untuk melakukan sesuatu, atau rentang waktu yang berkelanjutan. Keduanya hampir sinonim.',
  nuance: 'を通じて lebih sering untuk media/perantara dan rentang waktu. を通して lebih sering untuk proses pengalaman langsung. Keduanya bisa saling menggantikan dalam banyak konteks.',
  examples: [
    { jp: 'インターネット<b>を通じて</b>、世界中の人とつながれる。', id: 'Melalui internet, kita bisa terhubung dengan orang di seluruh dunia.' },
    { jp: '旅行<b>を通して</b>、多くのことを学んだ。', id: 'Melalui perjalanan, saya belajar banyak hal.' },
    { jp: '一年<b>を通じて</b>、気温の変化が少ない。', id: 'Sepanjang tahun, perubahan suhu tidak banyak.' }
  ],
  see_also_grammar: ['gn2-00057'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'を通じて — lebih untuk media/perantara dan rentang waktu. を通して — lebih untuk pengalaman atau proses.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00057', level: 'n2', pattern: '〜ことから', reading: '〜koto kara',
  meaning: 'dari fakta bahwa ... / karena (berdasarkan fakta) ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + であること + から',
  desc: '<b>〜ことから</b> menyatakan bahwa suatu kesimpulan, nama, atau keputusan diambil berdasarkan fakta atau keadaan tertentu yang diamati.',
  nuance: 'Berbeda dari から atau ので yang umum, ことから menekankan bahwa alasannya adalah sebuah fakta atau observasi konkret — lebih logis dan objektif.',
  examples: [
    { jp: '花が多いこと<b>から</b>、この町は「花の町」と呼ばれている。', id: 'Karena banyaknya bunga, kota ini disebut "Kota Bunga".' },
    { jp: '試験の点数が下がっていること<b>から</b>、勉強不足だとわかる。', id: 'Dari fakta menurunnya nilai ujian, dapat diketahui bahwa belajarnya kurang.' },
    { jp: '毎日遅刻すること<b>から</b>、彼の時間管理に問題があると思われる。', id: 'Dari fakta dia terlambat setiap hari, diduga ada masalah dalam manajemen waktunya.' }
  ],
  see_also_grammar: ['gn2-00056', 'gn2-00060'], see_also_vocab: [],
  confusion_pairs: ['gn2-00060'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00060', level: 'n2', pattern: '〜だけあって', reading: '〜dake atte',
  meaning: 'memang karena ... / pantas saja karena ... / wajar saja ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas yang ada sesuai ekspektasi berdasarkan latar belakang atau reputasi yang diketahui. Mengandung kesan pengakuan dan pujian.',
  nuance: 'Selalu mengandung konotasi positif atau setidaknya netral. Tidak bisa digunakan untuk hal negatif yang tidak diinginkan. Berbeda dari ことから yang lebih analitis/objektif.',
  examples: [
    { jp: 'プロ<b>だけあって</b>、演奏は素晴らしかった。', id: 'Memang karena dia seorang profesional, penampilannya luar biasa.' },
    { jp: '10年のキャリア<b>だけあって</b>、仕事が速い。', id: 'Pantas saja, dengan pengalaman 10 tahun, pekerjaannya cepat.' },
    { jp: '高い料理<b>だけあって</b>、味は格別だった。', id: 'Memang karena harganya mahal, rasanya istimewa.' }
  ],
  see_also_grammar: ['gn2-00057'], see_also_vocab: [],
  confusion_pairs: ['gn2-00057'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00085', level: 'n2', pattern: '〜上は', reading: '〜ue wa',
  meaning: 'karena sudah memutuskan ... maka harus ... (tanggung jawab yang mengikuti)',
  cat: 'reason-cause',
  connection: 'V-ta / V-dict + 上は',
  desc: '<b>〜上は</b> menyatakan bahwa karena suatu keputusan atau situasi sudah ada, maka konsekuensi atau tanggung jawab tertentu harus dipenuhi secara penuh.',
  nuance: 'Lebih formal dibanding からには. 上は lebih sering dalam tulisan. Nuansanya: tanggung jawab yang muncul secara logis dari keputusan yang sudah dibuat.',
  examples: [
    { jp: '引き受けた<b>上は</b>、最後まで責任を持ってやり遂げる。', id: 'Karena sudah menerima tanggung jawab ini, harus diselesaikan sampai akhir.' },
    { jp: 'チームに入った<b>上は</b>、全力で取り組む覚悟が必要だ。', id: 'Karena sudah masuk tim, perlu tekad untuk berusaha sepenuh hati.' },
    { jp: '決めた<b>上は</b>、迷わずに進むべきだ。', id: 'Karena sudah diputuskan, seharusnya maju tanpa ragu.' }
  ],
  see_also_grammar: ['gn2-00086', 'gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00086', 'gn2-00087'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00086', level: 'n2', pattern: '〜以上は', reading: '〜ijō wa',
  meaning: 'karena sudah ... maka wajib ... / mengingat bahwa ...',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta / N + である + 以上は',
  desc: '<b>〜以上は</b> menyatakan bahwa karena fakta atau kondisi tertentu sudah ada, maka suatu konsekuensi atau kewajiban secara logis harus diikuti.',
  nuance: 'Hampir identik dengan からには dalam fungsi. 以上は terasa sedikit lebih formal. Perbedaan halus: からには lebih menekankan tekad personal; 以上は lebih menekankan konsekuensi logis.',
  examples: [
    { jp: 'プロである<b>以上は</b>、常に最高のパフォーマンスを見せなければならない。', id: 'Karena sudah jadi profesional, harus selalu menampilkan performa terbaik.' },
    { jp: '約束した<b>以上は</b>、必ず守るべきだ。', id: 'Karena sudah berjanji, harus ditepati.' },
    { jp: '参加する<b>以上は</b>、ルールを守る必要がある。', id: 'Karena ikut berpartisipasi, perlu mematuhi aturan.' }
  ],
  see_also_grammar: ['gn2-00085', 'gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00085', 'gn2-00087'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00087', level: 'n2', pattern: '〜からには', reading: '〜kara ni wa',
  meaning: 'karena sudah ... maka harus ... (tekad kuat berdasarkan pilihan)',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta + からには',
  desc: '<b>〜からには</b> menyatakan bahwa mengingat fakta atau keputusan yang ada, pembicara bertekad atau berkewajiban untuk melakukan sesuatu. Lebih menekankan tekad diri sendiri.',
  nuance: 'Lebih menekankan tekad personal dibanding 以上は dan 上は. Paling sering muncul dalam pernyataan tekad diri: "karena sudah memilih ini, saya akan benar-benar ...".',
  examples: [
    { jp: 'やると決めた<b>からには</b>、途中で諦めない。', id: 'Karena sudah memutuskan untuk melakukannya, tidak akan menyerah di tengah jalan.' },
    { jp: '日本に来た<b>からには</b>、日本語をマスターしたい。', id: 'Karena sudah datang ke Jepang, ingin menguasai bahasa Jepang.' },
    { jp: '勝負に出た<b>からには</b>、全力を尽くす。', id: 'Karena sudah terjun bersaing, akan berusaha sepenuh kemampuan.' }
  ],
  see_also_grammar: ['gn2-00085', 'gn2-00086'], see_also_vocab: [],
  confusion_pairs: ['gn2-00085', 'gn2-00086', 'gn2-00088'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00088', level: 'n2', pattern: '〜手前', reading: '〜temae',
  meaning: 'karena sudah terlanjur ... di depan orang, tidak bisa mundur',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta / N + の + 手前',
  desc: '<b>〜手前</b> menyatakan bahwa karena pembicara sudah mengatakan atau melakukan sesuatu di depan orang lain, ada tekanan sosial untuk menjaga konsistensi — tidak bisa mundur karena menjaga muka atau wibawa.',
  nuance: 'Berbeda dari からには yang berbasis tekad. 手前 lebih menekankan tekanan sosial eksternal: "karena sudah terlanjur dilihat orang, tidak bisa tidak melanjutkan". Nuansanya lebih sosial dan terkait muka.',
  examples: [
    { jp: '大口をたたいた<b>手前</b>、失敗するわけにはいかない。', id: 'Karena sudah sesumbar di depan orang, tidak bisa gagal.' },
    { jp: '自分で言い出した<b>手前</b>、やらないわけにはいかない。', id: 'Karena sudah saya sendiri yang bilang, tidak bisa tidak melakukannya.' },
    { jp: '部下の<b>手前</b>、ミスを認めにくい。', id: 'Di depan bawahan, sulit untuk mengakui kesalahan.' }
  ],
  see_also_grammar: ['gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00087'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00091',
  level: 'n2',
  pattern: '〜のみならず',
  reading: '〜nomi narazu',
  meaning: 'tidak hanya ... (tetapi juga ...)',
  cat: 'listing-addition',
  connection: 'V-plain / Adj-plain / N + のみならず',
  desc: '<b>〜のみならず</b> menyatakan "tidak hanya X tetapi juga Y". Setara dengan だけでなく tapi lebih formal dan banyak ditemukan dalam bahasa tulisan.',
  nuance: 'Register written/formal — hindari dalam percakapan sehari-hari. Lebih kuat dan lebih luas cakupannya dibanding だけでなく; biasa muncul di berita, laporan, dan esai akademis.',
  examples: [
    { jp: '彼は成績が優秀な<b>のみならず</b>、スポーツも得意だ。', id: 'Dia tidak hanya berprestasi dalam pelajaran, tetapi juga pandai olahraga.' },
    { jp: 'この政策は国内<b>のみならず</b>、海外にも大きな影響を与えた。', id: 'Kebijakan ini tidak hanya berdampak di dalam negeri, tetapi juga di luar negeri.' },
    { jp: '環境問題は一国<b>のみならず</b>、全人類が取り組むべき課題だ。', id: 'Masalah lingkungan bukan hanya tanggung jawab satu negara, melainkan seluruh umat manusia.' }
  ],
  see_also_grammar: ['gn2-00092', 'gn2-00093', 'gn2-00094'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00092', 'gn2-00093', 'gn2-00094'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00092',
  level: 'n2',
  pattern: '〜はもとより',
  reading: '〜wa moto yori',
  meaning: 'sudah pasti ... / tidak perlu dikatakan lagi ..., bahkan juga ...',
  cat: 'listing-addition',
  connection: 'N + はもとより',
  desc: '<b>〜はもとより</b> menyatakan bahwa hal pertama sudah merupakan sesuatu yang sudah pasti/jelas terjadi, lalu menambahkan hal kedua yang cakupannya lebih luas atau mengejutkan.',
  nuance: 'Lebih formal dari はもちろん dan lebih sering muncul dalam tulisan. Menekankan bahwa X adalah hal yang "sudah semestinya", sebelum menambahkan Y yang mungkin tak terduga.',
  examples: [
    { jp: '英語<b>はもとより</b>、中国語も流暢に話せます。', id: 'Bahasa Inggris sudah pasti, bahkan bahasa Mandarin pun bisa berbicara dengan lancar.' },
    { jp: '専門家<b>はもとより</b>、一般市民もこの問題に強い関心を示している。', id: 'Sudah pasti para ahli, bahkan masyarakat umum pun menunjukkan perhatian besar terhadap masalah ini.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00093', 'gn2-00096'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091', 'gn2-00093', 'gn2-00096'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00093',
  level: 'n2',
  pattern: '〜はもちろん',
  reading: '〜wa mochiron',
  meaning: 'tentu saja ... / sudah jelas ..., dan (tidak ketinggalan) ...',
  cat: 'listing-addition',
  connection: 'N + はもちろん',
  desc: '<b>〜はもちろん</b> menyatakan bahwa X sudah pasti/jelas, kemudian menambahkan Y. Sedikit lebih kasual dan lebih luas penggunaannya dibanding はもとより.',
  nuance: 'Bisa muncul dalam percakapan semi-formal maupun tulisan. Tidak sekuat はもとより dalam hal keformalan, tapi sama-sama menyiratkan "X sudah tentu, apalagi Y".',
  examples: [
    { jp: '日本語<b>はもちろん</b>、文化についても深く勉強したい。', id: 'Bahasa Jepang tentu saja, aku juga ingin belajar lebih dalam tentang budayanya.' },
    { jp: '彼女は料理<b>はもちろん</b>、掃除も得意だ。', id: 'Sudah pasti soal memasak, dia juga pandai membersihkan rumah.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00092'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091', 'gn2-00092'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00096',
  level: 'n2',
  pattern: '〜もさることながら',
  reading: '〜mo saru koto nagara',
  meaning: 'sudah tentu ... (tapi yang tidak kalah penting / bahkan lebih dari itu ...)',
  cat: 'listing-addition',
  connection: 'N + もさることながら',
  desc: '<b>〜もさることながら</b> menyatakan bahwa X memang sudah pasti/diakui, tapi Y bahkan lebih menonjol, penting, atau mengesankan.',
  nuance: 'Sangat formal dan hampir eksklusif untuk tulisan. Berbeda dari はもとより: もさることながら lebih menyiratkan "X itu sudah jelas hebat, tapi Y justru lebih lagi". Jarang sekali dalam percakapan.',
  examples: [
    { jp: '技術力<b>もさることながら</b>、彼の粘り強い努力には頭が下がる。', id: 'Sudah tentu soal kemampuan teknisnya, tapi ketekunannya justru lebih mengesankan.' },
    { jp: '景色<b>もさることながら</b>、地元の料理が旅の一番の思い出になった。', id: 'Pemandangannya sudah tentu indah, tapi makanan lokalnya justru menjadi kenangan terbaik dari perjalanan itu.' }
  ],
  see_also_grammar: ['gn2-00092', 'gn2-00091'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00092'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00097',
  level: 'n2',
  pattern: '〜いかんにかかわらず',
  reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari ... / tidak peduli bagaimana keadaan ...',
  cat: 'contrast-concession',
  connection: 'N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa hasil atau tindakan tidak dipengaruhi oleh kondisi atau variabel yang disebutkan — "apapun yang terjadi dengan X, hasilnya tetap sama".',
  nuance: 'Sangat formal; umum dalam dokumen resmi, kontrak, pengumuman institusi. Jauh lebih kuat dari にかかわらず biasa. Kontras dengan いかんによって: di sini kondisi TIDAK menentukan hasil.',
  examples: [
    { jp: '結果<b>いかんにかかわらず</b>、最善を尽くします。', id: 'Terlepas dari hasilnya bagaimana, kami akan berupaya sebaik-baiknya.' },
    { jp: '理由<b>いかんにかかわらず</b>、期限内の提出が義務付けられています。', id: 'Terlepas dari alasan apapun, pengumpulan sebelum batas waktu adalah kewajiban.' }
  ],
  see_also_grammar: ['gn2-00099'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00099'],
  register: 'formal',
  exceptions: null,
  notes: 'いかん adalah kata formal yang berarti "keadaan/kondisi". Bentuk lain: いかんを問わず (sama artinya, sedikit lebih formal).',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00098',
  level: 'n2',
  pattern: '〜をものともせず',
  reading: '〜wo mono to mo sezu',
  meaning: 'tanpa mempedulikan ... / tidak menjadikan ... sebagai halangan',
  cat: 'contrast-concession',
  connection: 'N + をものともせず',
  desc: '<b>〜をものともせず</b> menyatakan bahwa subjek menghadapi atau melewati rintangan/kesulitan yang disebutkan tanpa menjadikannya hambatan.',
  nuance: 'Selalu berkonotasi positif atau heroik — memuji keberanian, ketabahan, atau determinasi subjek. TIDAK digunakan untuk hal negatif. Berbeda dari をよそに yang berkonotasi mengabaikan perasaan orang lain.',
  examples: [
    { jp: '激しい嵐<b>をものともせず</b>、船は航海を続けた。', id: 'Tanpa mempedulikan badai yang ganas, kapal terus berlayar.' },
    { jp: '激しい批判<b>をものともせず</b>、彼は改革を断行した。', id: 'Tanpa tergoyahkan oleh kritik keras, dia melaksanakan reformasi.' }
  ],
  see_also_grammar: ['gn2-00100'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00100'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00100',
  level: 'n2',
  pattern: '〜をよそに',
  reading: '〜wo yoso ni',
  meaning: 'mengabaikan ... / tidak peduli terhadap ... (situasi atau perasaan sekitar)',
  cat: 'contrast-concession',
  connection: 'N + をよそに',
  desc: '<b>〜をよそに</b> menyatakan bahwa subjek bertindak seolah tidak peduli terhadap kondisi, kekhawatiran, atau perasaan pihak lain yang disebutkan.',
  nuance: 'Sering berkonotasi negatif ringan — subjek tampak egois atau tidak berempati. Berbeda dari をものともせず yang heroik: をよそに lebih netral hingga sedikit negatif. Register written/agak formal.',
  examples: [
    { jp: '親の心配<b>をよそに</b>、子供たちは楽しそうに遊んでいた。', id: 'Mengabaikan kekhawatiran orang tua, anak-anak tetap bermain dengan riang gembira.' },
    { jp: '世間の批判<b>をよそに</b>、彼は独自の道を歩み続けた。', id: 'Mengabaikan kritik masyarakat, dia terus berjalan di jalannya sendiri.' }
  ],
  see_also_grammar: ['gn2-00098'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00098'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00101',
  level: 'n2',
  pattern: '〜に即して',
  reading: '〜ni soku shite',
  meaning: 'sesuai dengan kenyataan ... / berdasarkan situasi aktual ...',
  cat: 'reason-cause',
  connection: 'N + に即して / に即した (+ N)',
  desc: '<b>〜に即して</b> menyatakan bahwa sesuatu dilakukan sesuai dengan realita, fakta di lapangan, atau kondisi aktual yang disebutkan — bukan sekadar teori.',
  nuance: 'Menekankan kesesuaian dengan "kenyataan nyata di lapangan". Berbeda dari に基づいて yang bertumpu pada data/teori/hukum: に即して lebih menekankan pada realita praktis dan situasi yang hidup.',
  examples: [
    { jp: '実態<b>に即した</b>政策を立案することが求められている。', id: 'Dibutuhkan perumusan kebijakan yang sesuai dengan kondisi nyata di lapangan.' },
    { jp: '状況<b>に即して</b>柔軟に対応してください。', id: 'Tolong tanggapi dengan fleksibel sesuai situasi yang ada.' }
  ],
  see_also_grammar: ['gn2-00103', 'gn2-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00103'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00103',
  level: 'n2',
  pattern: '〜に基づいて / 〜にもとづいて',
  reading: '〜ni motozuite',
  meaning: 'berdasarkan ... / berlandaskan ...',
  cat: 'reason-cause',
  connection: 'N + に基づいて / に基づいた (+ N)',
  desc: '<b>〜に基づいて</b> menyatakan bahwa sesuatu dilakukan berlandaskan data, bukti, hukum, teori, atau prinsip tertentu yang disebutkan.',
  nuance: 'Menekankan fondasi intelektual, legal, atau faktual dari suatu tindakan atau keputusan. Sangat umum dalam dokumen resmi, laporan akademis, dan konteks hukum. Berbeda dari に即して yang menekankan realita lapangan.',
  examples: [
    { jp: '証拠<b>に基づいて</b>判断を下した。', id: 'Keputusan diambil berdasarkan bukti yang ada.' },
    { jp: 'この規則<b>に基づいて</b>、手続きが行われます。', id: 'Prosedur dilaksanakan berdasarkan aturan ini.' },
    { jp: 'データ<b>に基づいた</b>分析が必要だ。', id: 'Diperlukan analisis yang berlandaskan data.' }
  ],
  see_also_grammar: ['gn2-00101', 'gn2-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00101', 'gn2-00102'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00109',
  level: 'n2',
  pattern: '〜をめどに',
  reading: '〜wo medo ni',
  meaning: 'dengan target ... / dengan patokan waktu ... / paling lambat ...',
  cat: 'purpose',
  connection: 'N (waktu/angka) + をめどに / をめどとして',
  desc: '<b>〜をめどに</b> menyatakan suatu target waktu atau angka yang dijadikan patokan, dengan nuansa fleksibel — bukan batas mati, tapi tujuan yang diupayakan.',
  nuance: 'Berbeda dari までに (batas waktu keras dan wajib): をめどに adalah target yang diupayakan, sedikit fleksibel. Sering digunakan dalam konteks bisnis, proyek, dan pernyataan pemerintah.',
  examples: [
    { jp: '来月末<b>をめどに</b>、報告書を提出してください。', id: 'Harap selesaikan laporan dengan target akhir bulan depan.' },
    { jp: '三年<b>をめどに</b>、この事業の黒字化を目指します。', id: 'Dengan target tiga tahun, kami berupaya mencapai profitabilitas bisnis ini.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: 'Perbedaan kunci: をめどに = target/patokan (fleksibel); までに = batas waktu (wajib).',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00111', level: 'n2', pattern: '〜ようでは / 〜ようじゃ',
  reading: '〜you de wa / 〜you ja',
  meaning: 'kalau sampai seperti itu ... (ekspresi kekecewaan/kekhawatiran)',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは / ようじゃ',
  desc: '<b>〜ようでは</b> digunakan ketika pembicara mengekspresikan kekhawatiran atau ketidaksetujuan terhadap kondisi yang disebutkan — menyiratkan bahwa kondisi tersebut tidak dapat diterima.',
  nuance: 'ようじゃ adalah bentuk kasual dari ようでは. Sering diikuti ungkapan negatif seperti 困る、話にならない、だめだ. Menyiratkan kritik atau peringatan — "kalau sampai begitu, maka ada masalah."',
  examples: [
    { jp: 'そんなことで怒る<b>ようでは</b>、社会人として失格だ。', id: 'Kalau sampai marah karena hal seperti itu, tidak layak jadi orang dewasa.' },
    { jp: '基本も分からない<b>ようじゃ</b>、試験に合格できないよ。', id: 'Kalau dasar saja tidak mengerti, tidak akan bisa lulus ujian.' }
  ],
  see_also_grammar: ['gn2-00112', 'gn2-00113'], see_also_vocab: [],
  confusion_pairs: ['gn2-00112', 'gn2-00113'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00112', level: 'n2', pattern: '〜ようでは困る',
  reading: '〜you de wa komaru',
  meaning: 'kalau sampai begitu akan bermasalah',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは困る',
  desc: '<b>〜ようでは困る</b> mengungkapkan bahwa jika kondisi tertentu terjadi atau berlanjut, hal itu akan menjadi masalah serius. Digunakan sebagai peringatan atau teguran halus.',
  nuance: 'Lebih spesifik dari ようでは — selalu berakhir dengan 困る. Sering digunakan atasan kepada bawahan, atau orang tua kepada anak. Nada lebih halus dibanding ようでは話にならない, tapi tetap mengandung ketidaksetujuan.',
  examples: [
    { jp: '毎回遅刻する<b>ようでは困る</b>。', id: 'Kalau sampai terlambat setiap kali, itu akan jadi masalah.' },
    { jp: '部下に頼り続ける<b>ようでは困る</b>よ。', id: 'Kalau terus bergantung pada bawahan, itu akan jadi masalah.' }
  ],
  see_also_grammar: ['gn2-00111', 'gn2-00113'], see_also_vocab: [],
  confusion_pairs: ['gn2-00111', 'gn2-00113'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00113', level: 'n2', pattern: '〜ようでは話にならない',
  reading: '〜you de wa hanashi ni naranai',
  meaning: 'kalau begitu tidak ada gunanya bicara',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは話にならない',
  desc: '<b>〜ようでは話にならない</b> menyatakan bahwa kondisi yang disebutkan sangat tidak memadai sehingga tidak ada gunanya melanjutkan diskusi atau harapan.',
  nuance: 'Lebih keras dari ようでは困る — menyiratkan penolakan total atau frustrasi mendalam. Digunakan ketika standar minimum pun tidak terpenuhi. Cocok dalam konteks profesional atau evaluasi kinerja.',
  examples: [
    { jp: 'この程度しかできない<b>ようでは話にならない</b>。', id: 'Kalau kemampuannya hanya segitu, tidak ada gunanya bicara.' },
    { jp: '自分の意見も言えない<b>ようでは話にならない</b>よ。', id: 'Kalau pendapat sendiri saja tidak bisa diungkapkan, tidak ada artinya.' }
  ],
  see_also_grammar: ['gn2-00111', 'gn2-00112'], see_also_vocab: [],
  confusion_pairs: ['gn2-00111', 'gn2-00112'],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00114', level: 'n2', pattern: '〜てこそ',
  reading: '〜te koso',
  meaning: 'justru karena ... baru bisa ... (syarat esensial)',
  cat: 'reason-cause',
  connection: 'V-te + こそ',
  desc: '<b>〜てこそ</b> menyatakan bahwa justru karena melakukan A, barulah kondisi atau hasil B bisa tercapai. A adalah syarat mutlak agar B terwujud.',
  nuance: 'Berbeda dari てから (urutan waktu) — てこそ menekankan bahwa A adalah syarat hakiki, bukan sekadar urutan. Sering digunakan dalam konteks motivasi, nilai hidup, atau pelajaran mendalam.',
  examples: [
    { jp: '失敗し<b>てこそ</b>、人は本当に成長できる。', id: 'Justru karena mengalami kegagalan, manusia bisa benar-benar bertumbuh.' },
    { jp: '努力し<b>てこそ</b>、達成感が生まれる。', id: 'Justru karena sudah berusaha keras, barulah muncul rasa pencapaian.' }
  ],
  see_also_grammar: ['gn2-00115', 'gn2-00116'], see_also_vocab: [],
  confusion_pairs: ['gn2-00115'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00115', level: 'n2', pattern: '〜からこそ',
  reading: '〜kara koso',
  meaning: 'justru karena itulah ... (penekanan pada alasan)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だ + からこそ',
  desc: '<b>〜からこそ</b> memperkuat alasan atau sebab — menegaskan bahwa alasan yang disebut adalah faktor penentu yang sesungguhnya.',
  nuance: 'からこそ = から + こそ (partikel penegas). Digunakan untuk menegaskan alasan yang dianggap menentukan, sering untuk membenarkan tindakan atau mengungkapkan apresiasi mendalam. Berbeda dari てこそ yang menekankan prasyarat tindakan.',
  examples: [
    { jp: 'あなたを信頼している<b>からこそ</b>、この話をしている。', id: 'Justru karena aku percaya padamu, aku membicarakan hal ini.' },
    { jp: '難しい<b>からこそ</b>、挑戦する価値がある。', id: 'Justru karena sulit, ada nilai yang layak untuk diperjuangkan.' }
  ],
  see_also_grammar: ['gn2-00114', 'gn2-00116'], see_also_vocab: [],
  confusion_pairs: ['gn2-00114', 'gn2-00116'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00116', level: 'n2', pattern: '〜ばこそ',
  reading: '〜ba koso',
  meaning: 'justru karena ... (bentuk literary dari からこそ)',
  cat: 'reason-cause',
  connection: 'V-conditional (〜ば) / N・Adj + であればこそ',
  desc: '<b>〜ばこそ</b> adalah bentuk literary dan sangat formal dari からこそ — menekankan alasan dengan bobot yang lebih kuat menggunakan struktur kondisional ば.',
  nuance: 'Sangat formal dan literary — jarang dalam percakapan sehari-hari. Lebih kuat dari からこそ karena menggunakan bentuk kondisional. Sering ditemukan dalam tulisan formal, pidato, atau sastra. Pelajar perlu mengenali tapi tidak perlu aktif menggunakannya dalam percakapan.',
  examples: [
    { jp: '愛してい<b>ればこそ</b>、厳しく言うのだ。', id: 'Justru karena mencintaimu, aku berbicara dengan tegas.' },
    { jp: '君の将来を思え<b>ばこそ</b>、忠告したのだ。', id: 'Justru karena memikirkan masa depanmu, aku memberikan nasihat itu.' }
  ],
  see_also_grammar: ['gn2-00115', 'gn2-00114'], see_also_vocab: [],
  confusion_pairs: ['gn2-00115'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00117', level: 'n2', pattern: '〜だけに',
  reading: '〜dake ni',
  meaning: 'justru karena ... / mengingat ... (hasil terasa lebih kuat)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけに',
  desc: '<b>〜だけに</b> menyatakan bahwa justru karena kondisi di bagian pertama, dampak atau perasaan di bagian kedua terasa lebih kuat atau lebih wajar.',
  nuance: 'Berbeda dari だけあって — だけに bisa digunakan untuk hasil negatif maupun positif, sedangkan だけあって hampir selalu positif. だけに sering menyiratkan beban harapan atau dampak emosional yang diperbesar oleh kondisi yang disebutkan.',
  examples: [
    { jp: '長年努力してきた<b>だけに</b>、失敗のショックは大きかった。', id: 'Justru karena sudah berjuang bertahun-tahun, guncangan kegagalan itu terasa sangat besar.' },
    { jp: '期待されていた<b>だけに</b>、残念な結果だった。', id: 'Mengingat betapa besarnya harapan yang disematkan, hasilnya sungguh mengecewakan.' }
  ],
  see_also_grammar: ['gn2-00118', 'gn2-00119'], see_also_vocab: [],
  confusion_pairs: ['gn2-00118', 'gn2-00119'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00118', level: 'n2', pattern: '〜だけあって',
  reading: '〜dake atte',
  meaning: 'memang pantas karena ... / tidak heran karena ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas di bagian kedua memang wajar dan sejalan dengan reputasi, pengalaman, atau kemampuan yang disebutkan di bagian pertama.',
  nuance: 'Hampir selalu digunakan untuk penilaian positif — berbeda dari だけに yang bisa untuk hasil negatif. Mengandung nuansa "terbukti wajar, tidak mengherankan." Cocok untuk memuji seseorang secara tidak langsung.',
  examples: [
    { jp: 'プロ<b>だけあって</b>、仕事がとても丁寧だ。', id: 'Tidak heran karena profesional, pekerjaannya sangat teliti.' },
    { jp: '長く勉強した<b>だけあって</b>、日本語がとても上手だ。', id: 'Memang pantas karena sudah lama belajar, bahasa Jepangnya sangat bagus.' }
  ],
  see_also_grammar: ['gn2-00117', 'gn2-00119'], see_also_vocab: [],
  confusion_pairs: ['gn2-00117', 'gn2-00119'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00119', level: 'n2', pattern: '〜だけのことはある',
  reading: '〜dake no koto wa aru',
  meaning: 'memang ada alasannya / tidak sia-sia ...',
  cat: 'reason-cause',
  connection: 'V-plain / N + だけのことはある',
  desc: '<b>〜だけのことはある</b> mengkonfirmasi bahwa usaha, biaya, atau kondisi yang disebutkan memang sepadan dengan hasil yang diperoleh — "terbukti tidak sia-sia."',
  nuance: 'Lebih kuat nuansa konfirmasinya dibanding だけあって. Sering diucapkan setelah menyaksikan langsung hasil yang mengesankan. Mengandung makna "memang layak, tidak mengecewakan" — pujian berdasarkan bukti nyata.',
  examples: [
    { jp: '長年修行した<b>だけのことはある</b>。料理が絶品だ。', id: 'Memang tidak sia-sia bertahun-tahun berlatih. Masakannya luar biasa.' },
    { jp: '値段が高い<b>だけのことはある</b>、品質が全然違う。', id: 'Memang ada alasannya kenapa mahal — kualitasnya jauh berbeda.' }
  ],
  see_also_grammar: ['gn2-00117', 'gn2-00118'], see_also_vocab: [],
  confusion_pairs: ['gn2-00117', 'gn2-00118'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00120', level: 'n2', pattern: '〜ながら(も)',
  reading: '〜nagara (mo)',
  meaning: 'meskipun ... (tapi berlawanan dari yang diharapkan)',
  cat: 'contrast-concession',
  connection: 'V-masu-stem / Adj-plain / N + ながら(も)',
  desc: '<b>〜ながら(も)</b> menyatakan kontras — kondisi A diakui, tapi kondisi B yang mengikutinya bertentangan dengan harapan wajar.',
  nuance: 'も setelah ながら memperkuat nuansa kontras/kejutan. Berbeda dari つつ(も) yang hanya menempel ke verb — ながら(も) bisa menempel ke noun dan adjective juga. Contoh: 小さいながらも (meskipun kecil), 新人ながらも (meskipun masih baru).',
  examples: [
    { jp: '小さい<b>ながらも</b>、立派な庭がある。', id: 'Meskipun kecil, taman itu tampak sangat megah.' },
    { jp: '反対し<b>ながらも</b>、彼は最終的に従った。', id: 'Meskipun menentang, akhirnya dia tetap menurut.' }
  ],
  see_also_grammar: ['gn2-00121'], see_also_vocab: [],
  confusion_pairs: ['gn2-00121'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00121', level: 'n2', pattern: '〜つつ(も)',
  reading: '〜tsutsu (mo)',
  meaning: 'sambil ... / meskipun tahu ... (kontras dengan konflik batin)',
  cat: 'contrast-concession',
  connection: 'V-masu-stem + つつ(も)',
  desc: '<b>〜つつ(も)</b> menyatakan bahwa meskipun menyadari atau melakukan A secara bersamaan, kondisi berlawanan B tetap terjadi — sering menyiratkan konflik batin.',
  nuance: 'Lebih formal dari ながら(も) dan hanya menempel ke verb. Menekankan ketegangan antara dua hal yang terjadi bersamaan — terutama antara apa yang diketahui/dirasakan dengan apa yang dilakukan. Sering digunakan dalam tulisan atau narasi introspektif.',
  examples: [
    { jp: '悪いと分かり<b>つつも</b>、やめられなかった。', id: 'Meskipun tahu itu salah, tidak bisa berhenti juga.' },
    { jp: '疲れを感じ<b>つつも</b>、仕事を続けた。', id: 'Meskipun merasakan kelelahan, terus bekerja juga.' }
  ],
  see_also_grammar: ['gn2-00120'], see_also_vocab: [],
  confusion_pairs: ['gn2-00120'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00122', level: 'n2', pattern: '〜くせに',
  reading: '〜kuse ni',
  meaning: 'padahal ... / meskipun begitu malah ... (kecaman/sinisme)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + の + くせに',
  desc: '<b>〜くせに</b> mengekspresikan kritik, ketidaksenangan, atau sinisme — perilaku atau kondisi subjek bertentangan dengan apa yang seharusnya, dan pembicara tidak menyukainya.',
  nuance: 'Selalu mengandung nada negatif — berbeda dari のに yang lebih netral. Tidak sopan digunakan kepada orang yang lebih tua atau atasan. Penggunaannya menyiratkan bahwa pembicara merasa kesal atau kecewa dengan inkonsistensi subjek.',
  examples: [
    { jp: '知っている<b>くせに</b>、知らないふりをしている。', id: 'Padahal tahu, malah pura-pura tidak tahu.' },
    { jp: '下手な<b>くせに</b>、人の仕事を批判する。', id: 'Padahal tidak mahir, malah mengkritik pekerjaan orang lain.' }
  ],
  see_also_grammar: ['gn2-00120', 'gn2-00121'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00125', level: 'n2', pattern: '〜もので / 〜ものだから',
  reading: '〜mono de / 〜mono dakara',
  meaning: 'karena ... (penjelasan/pembenaran dari sudut pandang pembicara)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + もので / ものだから',
  desc: '<b>〜ものだから</b> dan <b>〜もので</b> memberikan penjelasan atau pembenaran atas suatu kondisi, sering untuk minta maaf atau mengklarifikasi.',
  nuance: 'ものだから lebih kuat dan terkesan seperti pembelaan diri. もので sedikit lebih halus. Keduanya lebih subjektif dari ので — menekankan alasan dari sudut pandang pembicara yang tidak bisa dihindari. Sering digunakan untuk meminta maaf karena keterlambatan atau kesalahan.',
  examples: [
    { jp: '急いでいた<b>もので</b>、ご連絡できませんでした。', id: 'Karena sedang terburu-buru, tidak sempat menghubungi.' },
    { jp: '子供が熱を出した<b>ものだから</b>、早退しました。', id: 'Karena anak demam, saya pulang lebih awal.' }
  ],
  see_also_grammar: ['gn2-00123', 'gn2-00124'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00128', level: 'n2', pattern: '〜ということになる',
  reading: '〜to iu koto ni naru',
  meaning: 'artinya ... / berarti ... (kesimpulan logis)',
  cat: 'quotation-thought',
  connection: 'Clause + ということになる',
  desc: '<b>〜ということになる</b> menyatakan kesimpulan logis yang ditarik dari kondisi atau informasi yang telah diberikan sebelumnya.',
  nuance: 'Berbeda dari ということになっている (aturan yang sudah ada) — ということになる adalah proses penarikan kesimpulan baru. Digunakan untuk menyimpulkan implikasi dari fakta yang sudah diketahui, sering dalam diskusi logis atau analisis.',
  examples: [
    { jp: '彼が来ないと、計画は中止<b>ということになる</b>。', id: 'Kalau dia tidak datang, artinya rencana harus dibatalkan.' },
    { jp: '全員賛成なら、決定した<b>ということになる</b>。', id: 'Kalau semua setuju, berarti sudah diputuskan.' }
  ],
  see_also_grammar: ['gn2-00129', 'gn2-00126'], see_also_vocab: [],
  confusion_pairs: ['gn2-00129'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00134', level: 'n2', pattern: '〜を踏まえて',
  reading: '〜wo fumaete',
  meaning: 'berdasarkan ..., dengan mempertimbangkan ..., berpijak pada ...',
  cat: 'reason-cause',
  connection: 'N + を踏まえて / V-plain + のを踏まえて',
  desc: '<b>〜を踏まえて</b> menyatakan bahwa suatu keputusan atau tindakan diambil dengan sepenuhnya mempertimbangkan dan berpijak pada fakta, situasi, atau pengalaman tertentu. Menekankan proses penghayatan mendalam sebelum bertindak.',
  nuance: 'Berbeda dari に基づいて (berlandaskan aturan/data secara ketat) — を踏まえて lebih menyiratkan "menghayati dan mempertimbangkan secara menyeluruh" sebelum mengambil langkah. Sering digunakan untuk diskusi kebijakan, evaluasi, atau pengembangan.',
  examples: [
    { jp: 'アンケートの結果<b>を踏まえて</b>、サービスを改善します。', id: 'Berdasarkan hasil kuesioner, kami akan memperbaiki layanan.' },
    { jp: 'これまでの経験<b>を踏まえて</b>、新しい計画を立てた。', id: 'Dengan mempertimbangkan pengalaman selama ini, kami menyusun rencana baru.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00136'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00136', level: 'n2', pattern: '〜に基づいて',
  reading: '〜ni motozuite',
  meaning: 'berdasarkan ..., berlandaskan ..., mengacu pada ...',
  cat: 'reason-cause',
  connection: 'N + に基づいて / N + に基づく + N',
  desc: '<b>〜に基づいて</b> menyatakan bahwa suatu tindakan, keputusan, atau pernyataan didasarkan secara langsung pada data, aturan, hukum, atau fakta tertentu. Menekankan landasan yang kuat dan konkret.',
  nuance: 'Dibandingkan を踏まえて (mempertimbangkan secara menyeluruh) dan に照らして (mengukur terhadap standar), に基づいて paling netral dan langsung — berarti "berpijak pada" tanpa nuansa evaluatif tambahan. Bisa digunakan dalam konteks formal maupun semi-formal.',
  examples: [
    { jp: '契約書<b>に基づいて</b>、支払いを行います。', id: 'Pembayaran dilakukan berdasarkan isi kontrak.' },
    { jp: '科学的なデータ<b>に基づいた</b>結論が必要だ。', id: 'Diperlukan kesimpulan yang berlandaskan data ilmiah.' }
  ],
  see_also_grammar: ['gn2-00134', 'gn2-00135', 'gn2-00137'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00134', 'gn2-00135', 'gn2-00137'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00137', level: 'n2', pattern: '〜に即して',
  reading: '〜ni sokushite',
  meaning: 'sesuai dengan ..., mengikuti secara dekat ..., berpedoman pada kenyataan ...',
  cat: 'reason-cause',
  connection: 'N + に即して / N + に即した + N',
  desc: '<b>〜に即して</b> menyatakan bahwa sesuatu dilakukan dengan mengikuti atau menyesuaikan diri secara ketat terhadap realitas, kebutuhan nyata, atau situasi yang ada. Menekankan kesesuaian dengan kondisi aktual.',
  nuance: 'Berbeda dari に基づいて (berlandaskan aturan/data) — に即して lebih menekankan kesesuaian dengan situasi atau kenyataan yang konkret dan dinamis, bukan hanya mengacu pada dokumen atau prinsip abstrak. Sering digunakan dalam konteks pendidikan atau pembuatan kebijakan.',
  examples: [
    { jp: '現場の状況<b>に即して</b>、柔軟に対応することが求められる。', id: 'Diperlukan respons yang fleksibel sesuai dengan kondisi nyata di lapangan.' },
    { jp: '実態<b>に即した</b>教育改革が必要だ。', id: 'Reformasi pendidikan yang sesuai dengan kondisi nyata sangat dibutuhkan.' }
  ],
  see_also_grammar: ['gn2-00136'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00136'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00142', level: 'n2', pattern: '〜にかかわらず',
  reading: '〜ni kakawarazu',
  meaning: 'terlepas dari ..., tidak peduli ..., tanpa memandang ...',
  cat: 'contrast-concession',
  connection: 'N + にかかわらず / V-plain + かどうかにかかわらず / A-い + かどうかにかかわらず',
  desc: '<b>〜にかかわらず</b> menyatakan bahwa suatu hal berlaku atau terjadi tanpa dipengaruhi oleh kondisi atau faktor yang disebutkan. Dapat digunakan dengan kata tanya, kondisi ganda (あるなし), maupun klausa.',
  nuance: 'Lebih luas dan fleksibel dibandingkan を問わず yang biasanya mengikuti pasangan kata benda (男女を問わず, 年齢を問わず). にかかわらず bisa mengikuti klausa penuh dengan かどうか, dan lebih menekankan "tanpa terpengaruh oleh" faktor tersebut.',
  examples: [
    { jp: '天候<b>にかかわらず</b>、試合は予定通り行われます。', id: 'Terlepas dari cuaca, pertandingan akan tetap berlangsung sesuai jadwal.' },
    { jp: '経験があるかどうか<b>にかかわらず</b>、応募できます。', id: 'Siapa pun boleh melamar, tidak peduli ada pengalaman atau tidak.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00143'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00143', level: 'n2', pattern: '〜を問わず',
  reading: '〜wo towazu',
  meaning: 'tanpa memandang ..., tanpa terkecuali ..., apapun ...-nya',
  cat: 'contrast-concession',
  connection: 'N + を問わず / N・N + を問わず',
  desc: '<b>〜を問わず</b> menyatakan bahwa sesuatu berlaku tanpa pengecualian, terlepas dari kategori yang disebutkan. Biasanya digunakan dengan kata benda yang berpasangan atau yang mewakili suatu kategori.',
  nuance: 'Berbeda dari にかかわらず yang lebih fleksibel — を問わず umumnya digunakan dengan kategori berpasangan (男女を問わず, 昼夜を問わず) atau kata yang mewakili kategori luas (経験を問わず, 国籍を問わず). Lebih formulaik dan sering muncul di pengumuman resmi.',
  examples: [
    { jp: '男女<b>を問わず</b>、誰でも参加できます。', id: 'Siapa pun boleh berpartisipasi, tanpa memandang jenis kelamin.' },
    { jp: '昼夜<b>を問わず</b>、患者のために働いた。', id: 'Ia bekerja untuk para pasien tanpa memandang siang atau malam.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00142'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00154', level: 'n2', pattern: '〜わけではない',
  reading: '〜wake de wa nai',
  meaning: 'bukan berarti ..., tidak persis begitu ..., bukan karena ...',
  cat: 'contrast-concession',
  connection: 'V-plain + わけではない / い-Adj-plain + わけではない / N + というわけではない',
  desc: '<b>〜わけではない</b> digunakan untuk membantah atau mengklarifikasi kesimpulan yang salah — menyatakan bahwa situasinya tidak persis seperti yang diasumsikan orang lain, meski ada kesan seolah demikian.',
  nuance: 'Berbeda dari とは限らない (tidak selalu terjadi secara umum) — わけではない lebih spesifik pada kasus saat ini dan digunakan untuk mengklarifikasi asumsi yang berkembang dari situasi yang ada. Sering disertai penjelasan alternatif.',
  examples: [
    { jp: '嫌いな<b>わけではない</b>けど、今は気分じゃない。', id: 'Bukan berarti aku tidak suka, hanya saja sekarang tidak mood.' },
    { jp: '彼が悪い<b>わけではない</b>。ただ状況が難しかっただけだ。', id: 'Bukan berarti dia yang salah. Situasinya saja yang memang sulit.' }
  ],
  see_also_grammar: ['gn2-00153'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00153', 'gn2-00155'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00161', level: 'n2', pattern: '〜ものの',
  reading: '〜mono no',
  meaning: 'meskipun ..., walaupun ... (tapi kenyataannya berbeda dari harapan)',
  cat: 'contrast-concession',
  connection: 'V-plain + ものの / い-Adj-plain + ものの / な-Adj + な + ものの / N + である + ものの',
  desc: '<b>〜ものの</b> menyatakan kontras antara kondisi yang terpenuhi (klausa pertama) dan kenyataan atau hasil yang tidak sesuai ekspektasi (klausa kedua). Menyiratkan rasa kecewa atau ketidaksesuaian.',
  nuance: 'Berbeda dari けれど/が (kontras umum, netral) — ものの secara khas menekankan bahwa meski kondisi A tampak terpenuhi, hasilnya mengecewakan atau tidak sebagaimana yang seharusnya. Umumnya digunakan dalam bahasa tulis atau formal.',
  examples: [
    { jp: '頑張った<b>ものの</b>、試験に合格できなかった。', id: 'Meskipun sudah berusaha keras, tetap saja tidak bisa lulus ujian.' },
    { jp: '謝った<b>ものの</b>、彼女はなかなか許してくれなかった。', id: 'Walaupun sudah minta maaf, dia tidak kunjung memaafkanku.' },
    { jp: '計画は立てた<b>ものの</b>、実行する時間がない。', id: 'Meskipun rencana sudah dibuat, tidak ada waktu untuk melaksanakannya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00162', 'gn2-00163'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00162', level: 'n2', pattern: '〜ながらも',
  reading: '〜nagara mo',
  meaning: 'walaupun ..., sambil tetap dalam kondisi ...',
  cat: 'contrast-concession',
  connection: 'V-stem + ながらも / い-Adj-plain + ながらも / な-Adj + ながらも / N + ながらも',
  desc: '<b>〜ながらも</b> menyatakan bahwa dua kondisi yang tampak bertentangan terjadi secara bersamaan. Kondisi pertama tetap ada, namun kondisi kedua yang berbeda atau mengejutkan juga berlaku.',
  nuance: 'Berbeda dari ものの (ekspektasi yang meleset) — ながらも lebih menekankan koeksistensi dua kondisi yang kontras secara simultan. "Dalam kondisi A sekalipun, tetap terjadi B." Bisa mengungkap semangat, ketabahan, atau ironi.',
  examples: [
    { jp: '貧しい<b>ながらも</b>、家族は幸せに暮らしていた。', id: 'Walaupun hidup dalam kemiskinan, keluarga itu tetap hidup bahagia.' },
    { jp: '不安を感じ<b>ながらも</b>、彼は壇上に上がった。', id: 'Sambil tetap merasakan kecemasan, ia tetap naik ke atas panggung.' }
  ],
  see_also_grammar: ['gn2-00161'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00161'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00163', level: 'n2', pattern: '〜とはいえ',
  reading: '〜to wa ie',
  meaning: 'meskipun begitu, walaupun memang demikian',
  cat: 'contrast-concession',
  connection: 'Clause + とはいえ / N + とはいえ',
  desc: '<b>〜とはいえ</b> mengakui kebenaran kondisi pertama, namun kemudian menambahkan reservasi, pengecualian, atau kenyataan yang berbeda. Artinya "meski kita akui hal itu benar, namun..."',
  nuance: 'Mirip dengan とはいうものの namun lebih ringkas dan umum digunakan. Berbeda dari ものの (menekankan ketidaksesuaian hasil) — とはいえ lebih netral dan digunakan untuk menambahkan nuansa atau batasan terhadap pernyataan yang sebelumnya diakui.',
  examples: [
    { jp: '春だ<b>とはいえ</b>、まだ肌寒い日が続く。', id: 'Meskipun memang sudah musim semi, hari-hari yang agak dingin masih berlanjut.' },
    { jp: '失敗した<b>とはいえ</b>、努力したことは評価されるべきだ。', id: 'Walaupun memang gagal, usaha yang sudah dilakukan sepatutnya tetap diapresiasi.' }
  ],
  see_also_grammar: ['gn2-00189'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00189', 'gn2-00161'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00164', level: 'n2', pattern: '〜にしては',
  reading: '〜ni shite wa',
  meaning: 'untuk ukuran ..., mengingat kondisinya sebagai ...',
  cat: 'contrast-concession',
  connection: 'V-plain + にしては / N + にしては',
  desc: '<b>〜にしては</b> menyatakan bahwa hasil atau kondisi yang ada berbeda dari apa yang seharusnya diharapkan berdasarkan standar atau latar belakang yang disebutkan. Bisa bernada positif maupun negatif.',
  nuance: 'Berbeda dari わりに (proporsi tidak sesuai secara umum) — にしては secara spesifik mengacu pada standar yang diharapkan dari kelompok atau kondisi tertentu. "Untuk seseorang dengan latar belakang X, hasilnya Y cukup mengejutkan."',
  examples: [
    { jp: '初めて作った料理<b>にしては</b>、とてもおいしい。', id: 'Untuk ukuran masakan yang dibuat pertama kali, ini sangat enak.' },
    { jp: '10年勉強した<b>にしては</b>、日本語があまり上手ではない。', id: 'Mengingat sudah belajar 10 tahun, kemampuan bahasa Jepangnya tidak terlalu bagus.' }
  ],
  see_also_grammar: ['gn2-00165'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00165'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00165', level: 'n2', pattern: '〜わりに',
  reading: '〜wari ni',
  meaning: 'padahal seharusnya ..., tidak sebanding dengan ..., tidak sesuai dengan ...',
  cat: 'contrast-concession',
  connection: 'V-plain + わりに / い-Adj-plain + わりに / な-Adj + な + わりに / N + の + わりに',
  desc: '<b>〜わりに</b> menyatakan bahwa hasil atau kondisi tidak proporsional atau tidak sebanding dengan apa yang disebutkan. Mengungkapkan ketidaksesuaian antara kondisi dan hasilnya.',
  nuance: 'Berbeda dari にしては (standar kelompok/latar belakang tertentu) — わりに lebih menekankan "dibandingkan dengan tingkatan/jumlah X, hasilnya Y tidak sebanding". Sering digunakan untuk penilaian nilai atau kualitas.',
  examples: [
    { jp: '値段が高い<b>わりに</b>、品質がよくない。', id: 'Padahal harganya mahal, tapi kualitasnya tidak bagus.' },
    { jp: '忙しい<b>わりに</b>、彼はいつも元気そうだ。', id: 'Padahal selalu sibuk, dia terlihat selalu bersemangat.' }
  ],
  see_also_grammar: ['gn2-00164'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00164'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00166', level: 'n2', pattern: '〜だけあって',
  reading: '〜dake atte',
  meaning: 'memang pantas karena ..., wajar saja karena ..., sebanding dengan ...',
  cat: 'reason-cause',
  connection: 'V-plain + だけあって / い-Adj-plain + だけあって / な-Adj + な + だけあって / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas yang ada memang sepadan dan wajar mengingat latar belakang, kemampuan, atau kondisi yang disebutkan. Menekankan kesesuaian antara penyebab dan hasil — selalu bernada positif.',
  nuance: 'Berbeda dari だけに (bisa positif atau negatif, menekankan dampak emosional) — だけあって selalu afirmatif dan digunakan untuk memuji atau mengakui bahwa sesuatu memang layak mendapat hasilnya. "Memang pantas karena memang benar-benar X."',
  examples: [
    { jp: 'プロ<b>だけあって</b>、仕上がりが全然違う。', id: 'Memang pantas karena seorang profesional — hasilnya jauh berbeda.' },
    { jp: '長年修行した<b>だけあって</b>、その料理人の腕は本物だ。', id: 'Wajar saja mengingat sudah berlatih bertahun-tahun — keahlian juru masak itu memang nyata.' }
  ],
  see_also_grammar: ['gn2-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00167'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00167', level: 'n2', pattern: '〜だけに',
  reading: '〜dake ni',
  meaning: 'justru karena ..., tepat karena itulah ...',
  cat: 'reason-cause',
  connection: 'V-plain + だけに / い-Adj-plain + だけに / な-Adj + な + だけに / N + だけに',
  desc: '<b>〜だけに</b> menyatakan bahwa justru karena kondisi yang disebutkan, dampak atau perasaan yang muncul terasa lebih kuat atau lebih bermakna. Menekankan hubungan sebab-akibat yang intens, bisa positif maupun negatif.',
  nuance: 'Berbeda dari だけあって (selalu afirmatif, memuji) — だけに lebih menekankan dampak emosional yang diperkuat oleh alasan tersebut. "Justru karena X itulah, Y terasa semakin kuat/dalam." Sering digunakan untuk mengungkapkan rasa kecewa, terharu, atau ironi.',
  examples: [
    { jp: '期待していた<b>だけに</b>、失敗したときのショックが大きかった。', id: 'Justru karena sudah berharap besar, kekecewaan saat gagal pun terasa sangat dalam.' },
    { jp: '親友<b>だけに</b>、裏切られたときのダメージは計り知れない。', id: 'Justru karena dia sahabat karib, luka karena pengkhianatannya tidak terkira.' }
  ],
  see_also_grammar: ['gn2-00166'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00166', 'gn2-00168'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00168', level: 'n2', pattern: '〜からこそ',
  reading: '〜kara koso',
  meaning: 'justru karena itulah ..., memang karena ... (dan bukan alasan lain)',
  cat: 'reason-cause',
  connection: 'V-plain + からこそ / い-Adj-plain + からこそ / な-Adj + だからこそ / N + だからこそ',
  desc: '<b>〜からこそ</b> menegaskan bahwa faktor yang disebutkan adalah alasan yang sesungguhnya dan paling mendasar — bukan alasan lain. Menambahkan penekanan eksklusif pada sebab yang disebutkan.',
  nuance: 'Berbeda dari から (karena, umum dan netral) — からこそ menambahkan tekanan kuat: "justru faktor inilah, dan bukan yang lain, yang menjadi alasan sebenarnya". Sering digunakan dalam argumen persuasif, pembelaan diri, atau pernyataan emosional.',
  examples: [
    { jp: '大変だ<b>からこそ</b>、乗り越えたときに達成感が生まれる。', id: 'Justru karena sulitnya itulah, rasa pencapaian muncul saat berhasil melewatinya.' },
    { jp: '心配している<b>からこそ</b>、厳しいことを言うのだ。', id: 'Justru karena aku khawatir, aku mengatakannya dengan keras.' }
  ],
  see_also_grammar: ['gn2-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00167'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00169', level: 'n2', pattern: '〜からといって',
  reading: '〜kara to itte',
  meaning: 'hanya karena ... bukan berarti ..., meskipun ... tidak berarti boleh ...',
  cat: 'contrast-concession',
  connection: 'V-plain + からといって / い-Adj-plain + からといって / N + だからといって',
  desc: '<b>〜からといって</b> digunakan untuk menyanggah justifikasi atau alasan yang dianggap berlebihan. Menyatakan bahwa meski alasan pertama ada, alasan itu tidak cukup untuk membenarkan tindakan atau kesimpulan berikutnya.',
  nuance: 'Berbeda dari からには (karena sudah, maka ada kewajiban) — からといって justru berfungsi sebaliknya: menolak anggapan bahwa alasan A secara otomatis membenarkan B. Biasanya diikuti kalimat negatif atau larangan.',
  examples: [
    { jp: '忙しい<b>からといって</b>、礼儀を忘れていいわけではない。', id: 'Hanya karena sibuk bukan berarti boleh melupakan sopan santun.' },
    { jp: '失敗した<b>からといって</b>、すべてを諦める必要はない。', id: 'Hanya karena gagal tidak berarti harus menyerah pada segalanya.' }
  ],
  see_also_grammar: ['gn2-00170'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00170'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00181', level: 'n2', pattern: '〜はおろか',
  reading: '〜wa oroka',
  meaning: 'apalagi ..., jangankan ..., bahkan ... pun tidak',
  cat: 'listing-addition',
  connection: 'N + はおろか',
  desc: '<b>〜はおろか</b> menyatakan bahwa bahkan hal yang lebih mudah atau lebih dasar pun tidak bisa dilakukan atau tidak terjadi, apalagi hal yang lebih sulit. Menekankan keparahan atau ekstremnya suatu kondisi.',
  nuance: 'Berbeda dari はもとより (A sudah pasti, B juga) — はおろか biasanya digunakan dalam konteks negatif atau mengejutkan. "Jangankan X yang sulit, bahkan Y yang mudah pun tidak bisa." Sering mempertegas keadaan yang sangat buruk atau mengejutkan.',
  examples: [
    { jp: '食費<b>はおろか</b>、家賃も払えない状況だ。', id: 'Jangankan biaya makan, bahkan uang sewa pun tidak bisa dibayar.' },
    { jp: '漢字<b>はおろか</b>、ひらがなも読めない。', id: 'Jangankan kanji, bahkan hiragana pun tidak bisa dibaca.' }
  ],
  see_also_grammar: ['gn2-00182'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00182'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00182', level: 'n2', pattern: '〜はもとより',
  reading: '〜wa moto yori',
  meaning: 'sudah pasti ..., belum lagi ..., A sudah jelas, apalagi B',
  cat: 'listing-addition',
  connection: 'N + はもとより',
  desc: '<b>〜はもとより</b> menyatakan bahwa hal pertama (A) sudah jelas dan tidak perlu dipertanyakan, ditambah lagi dengan hal lain (B) yang juga berlaku. Menekankan bahwa A adalah titik awal yang sudah pasti, dan B menambah cakupannya.',
  nuance: 'Berbeda dari はおろか (konteks negatif, jangankan A bahkan B pun tidak) — はもとより umumnya netral atau positif: "A sudah pasti, dan B juga". Lebih formal dari だけでなく. Sering muncul dalam tulisan resmi atau deskripsi produk/jasa.',
  examples: [
    { jp: '日本語<b>はもとより</b>、英語や中国語も話せる。', id: 'Bahasa Jepang sudah pasti, belum lagi ia juga bisa berbicara bahasa Inggris dan Mandarin.' },
    { jp: '国内<b>はもとより</b>、海外でも高い評価を受けている。', id: 'Di dalam negeri sudah pasti, di luar negeri pun mendapat pengakuan tinggi.' }
  ],
  see_also_grammar: ['gn2-00181', 'gn2-00184'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00181'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00183', level: 'n2', pattern: '〜にとどまらず',
  reading: '〜ni todomarazu',
  meaning: 'tidak hanya ..., melampaui batas ..., tidak terbatas pada ...',
  cat: 'listing-addition',
  connection: 'N + にとどまらず / V-plain + にとどまらず',
  desc: '<b>〜にとどまらず</b> menyatakan bahwa dampak, pengaruh, atau cakupan sesuatu tidak berhenti pada hal yang disebutkan, melainkan meluas lebih jauh. Menekankan jangkauan yang melebihi batas yang diharapkan.',
  nuance: 'Berbeda dari のみならず (bukan hanya, formal dan netral) — にとどまらず lebih menekankan aspek penyebaran atau perluasan yang dinamis: sesuatu yang awalnya ada di A, kini sudah melampaui A. Sering digunakan untuk tren, pengaruh, atau bencana yang meluas.',
  examples: [
    { jp: 'その影響は国内<b>にとどまらず</b>、海外にも広がっている。', id: 'Dampaknya tidak terbatas di dalam negeri saja, sudah meluas hingga ke luar negeri.' },
    { jp: '問題は個人レベル<b>にとどまらず</b>、社会全体に関わっている。', id: 'Masalah ini tidak hanya pada level individu, melainkan menyangkut seluruh masyarakat.' }
  ],
  see_also_grammar: ['gn2-00184'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00184'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00184', level: 'n2', pattern: '〜のみならず',
  reading: '〜nomi narazu',
  meaning: 'bukan hanya ..., tapi juga ..., tidak hanya ... melainkan juga ...',
  cat: 'listing-addition',
  connection: 'N + のみならず / V-plain + のみならず / い-Adj-plain + のみならず',
  desc: '<b>〜のみならず</b> menyatakan penambahan — tidak hanya hal pertama yang berlaku, tetapi juga hal kedua. Setara dengan だけでなく namun jauh lebih formal dan sering digunakan dalam tulisan akademik atau resmi.',
  nuance: 'Secara makna identik dengan だけでなく (tidak hanya ... tapi juga) — perbedaannya murni pada register. のみならず sangat formal dan cocok untuk tulisan, sedangkan だけでなく lebih umum dan bisa digunakan di mana saja. Berbeda dari にとどまらず yang menekankan penyebaran.',
  examples: [
    { jp: '彼女は美しい<b>のみならず</b>、非常に聡明でもある。', id: 'Bukan hanya cantik, ia juga sangat cerdas.' },
    { jp: 'この薬は痛みを和らげる<b>のみならず</b>、炎症も抑える効果がある。', id: 'Obat ini bukan hanya meredakan nyeri, tetapi juga memiliki efek menekan peradangan.' }
  ],
  see_also_grammar: ['gn2-00182', 'gn2-00183'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00183'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00186', level: 'n2', pattern: '〜ことのないよう',
  reading: '〜koto no nai you',
  meaning: 'agar tidak terjadi ..., untuk mencegah agar ... tidak terjadi',
  cat: 'purpose',
  connection: 'V-dictionary + ことのないよう / V-ない + ことのないよう',
  desc: '<b>〜ことのないよう</b> digunakan untuk menyatakan tujuan pencegahan — melakukan sesuatu agar suatu kejadian yang tidak diinginkan tidak terjadi. Lebih formal dibandingkan ないように.',
  nuance: 'Berbeda dari ないように (jangan sampai, lebih umum dan spoken) — ことのないよう lebih formal dan sering muncul dalam instruksi tertulis, pengumuman resmi, atau peringatan. Menekankan pencegahan kejadian yang dianggap serius.',
  examples: [
    { jp: '同じ過ちを繰り返す<b>ことのないよう</b>、しっかり反省してください。', id: 'Mohon introspeksi dengan sungguh-sungguh agar kesalahan yang sama tidak terulang.' },
    { jp: '情報が漏れる<b>ことのないよう</b>、管理を徹底してください。', id: 'Mohon perketat pengelolaan agar informasi tidak bocor.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00189', level: 'n2', pattern: '〜とはいうものの',
  reading: '〜to wa iu mono no',
  meaning: 'meskipun ada yang mengatakan ..., walau memang begitu dikatakan ...',
  cat: 'contrast-concession',
  connection: 'Clause + とはいうものの / N + とはいうものの',
  desc: '<b>〜とはいうものの</b> mengakui suatu pernyataan, pandangan umum, atau fakta yang dikenal, namun kemudian menambahkan reservasi, kenyataan lain, atau kondisi yang membuatnya tidak sepenuhnya berlaku.',
  nuance: 'Lebih panjang dan formal dibandingkan とはいえ, dan lebih menekankan pengakuan terhadap pandangan atau pernyataan orang lain sebelum menambahkan reservasi. "Memang benar demikian dikatakan, namun kenyataannya..." Sering digunakan dalam esai atau diskusi formal.',
  examples: [
    { jp: '春だ<b>とはいうものの</b>、今年はまだ雪が降っている。', id: 'Meskipun dikatakan sudah musim semi, tahun ini salju masih turun.' },
    { jp: '体に悪い<b>とはいうものの</b>、やめられない人も多い。', id: 'Meski dikatakan buruk bagi kesehatan, tetap banyak orang yang tidak bisa berhenti.' }
  ],
  see_also_grammar: ['gn2-00163'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00163'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00192',
  level: 'n2',
  pattern: '〜をきっかけに',
  reading: '~wo kikkake ni',
  meaning: 'berawal dari ..., dipicu oleh ...',
  cat: 'reason-cause',
  connection: 'N + をきっかけに(して) / V-plain + ことをきっかけに',
  desc: '<b>〜をきっかけに</b> menyatakan bahwa suatu peristiwa atau hal tertentu menjadi titik awal atau pemicu terjadinya perubahan atau tindakan. Pola ini menekankan momen atau kejadian yang menyulut perubahan besar, bukan sekadar penyebab biasa.',
  nuance: 'Berbeda dengan 〜が原因で (penyebab negatif) atau 〜がもとで (berdasarkan pada), 〜をきっかけに menekankan peristiwa pencetus yang menjadi titik balik. Sering digunakan untuk perubahan positif atau netral dalam hidup seseorang. Bentuk 〜をきっかけとして lebih formal.',
  examples: [
    { jp: '留学<b>をきっかけに</b>、外国語に興味を持った。', id: 'Berawal dari pengalaman studi di luar negeri, saya menjadi tertarik pada bahasa asing.' },
    { jp: '友人との出会い<b>をきっかけに</b>、人生が変わった。', id: 'Dipicu oleh pertemuan dengan seorang teman, hidupnya berubah.' },
    { jp: '震災<b>をきっかけに</b>、防災意識が高まった。', id: 'Berawal dari bencana gempa, kesadaran akan kesiapsiagaan bencana meningkat.' },
  ],
  see_also_grammar: ['gn2-00212'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00200',
  level: 'n2',
  pattern: '〜をはじめ',
  reading: '~wo hajime',
  meaning: 'dimulai dari ..., termasuk ... (dan lainnya)',
  cat: 'listing-addition',
  connection: 'N + をはじめ(として) / をはじめとする + N',
  desc: '<b>〜をはじめ</b> menyatakan bahwa suatu hal disebut sebagai contoh pertama atau paling representatif dari sebuah kelompok yang lebih besar. Pola ini membuka daftar dengan menyebutkan yang paling menonjol, lalu mengisyaratkan bahwa masih ada banyak lagi. Bentuk 〜をはじめとする digunakan sebelum kata benda.',
  nuance: 'Berbeda dengan 〜など yang sekadar mendaftar contoh secara kasual, 〜をはじめ memilih satu hal sebagai representasi yang paling penting atau menonjol dari keseluruhan kelompok. Berbeda juga dengan 〜をはじめとして yang lebih formal. Penggunaan 〜をはじめ terasa lebih tegas dan resmi dari sekadar 〜や〜など.',
  examples: [
    { jp: '東京<b>をはじめ</b>、各地で祭りが開催された。', id: 'Di berbagai daerah, termasuk Tokyo, festival diadakan.' },
    { jp: '社長<b>をはじめ</b>、社員全員が参加した。', id: 'Mulai dari direktur hingga seluruh karyawan ikut berpartisipasi.' },
    { jp: '日本語<b>をはじめとする</b>アジアの言語を研究している。', id: 'Saya meneliti bahasa-bahasa Asia, termasuk bahasa Jepang.' },
  ],
  see_also_grammar: ['gn2-00199'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00204',
  level: 'n2',
  pattern: '〜とされている',
  reading: '~to sarete iru',
  meaning: 'dikatakan bahwa ..., dianggap sebagai ...',
  cat: 'quotation-thought',
  connection: 'V-plain / Adj-plain / N + とされている',
  desc: '<b>〜とされている</b> menyatakan bahwa suatu pandangan, penilaian, atau anggapan telah menjadi konsensus umum atau diterima secara luas oleh masyarakat, komunitas ilmiah, atau otoritas tertentu. Berbeda dari hearsay biasa, pola ini mengindikasikan pandangan yang sudah mapan.',
  nuance: 'Dibandingkan 〜と言われている (dikatakan orang, bersifat lebih informal dan bisa berupa rumor), 〜とされている mengindikasikan bahwa anggapan tersebut sudah lebih resmi, misalnya hasil penelitian atau konsensus akademis. 〜と考えられる (gn2-00206) lebih menekankan inferensi logis dari pembicara sendiri.',
  examples: [
    { jp: '睡眠は健康に重要<b>とされている</b>。', id: 'Tidur dianggap penting bagi kesehatan.' },
    { jp: 'この遺跡は江戸時代のもの<b>とされている</b>。', id: 'Situs ini dianggap berasal dari periode Edo.' },
    { jp: '彼は業界の第一人者<b>とされている</b>。', id: 'Dia dianggap sebagai yang terdepan di industri ini.' },
  ],
  see_also_grammar: ['gn2-00205', 'gn2-00206'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00205',
  level: 'n2',
  pattern: '〜と見られている',
  reading: '~to mirarete iru',
  meaning: 'dipandang sebagai ..., diperkirakan ...',
  cat: 'quotation-thought',
  connection: 'V-plain / N + と見られている',
  desc: '<b>〜と見られている</b> menyatakan bahwa suatu situasi, penyebab, atau hasil dinilai atau diperkirakan demikian oleh pihak luar — terutama para ahli, pengamat, atau media. Pola ini sering muncul dalam berita dan laporan untuk menyampaikan analisis atau perkiraan tanpa menjamin kebenarannya secara pasti.',
  nuance: 'Berbeda dengan 〜とされている (sudah mapan sebagai anggapan umum), 〜と見られている lebih bersifat analisis atau perkiraan yang sedang berkembang — belum tentu sudah menjadi konsensus. Sering digunakan untuk penilaian situasi politik, ekonomi, atau investigasi yang masih berlangsung.',
  examples: [
    { jp: '今回の事故は人為的なミスが原因<b>と見られている</b>。', id: 'Kecelakaan kali ini diperkirakan disebabkan oleh kesalahan manusia.' },
    { jp: '景気は来年回復する<b>と見られている</b>。', id: 'Perekonomian diperkirakan akan pulih tahun depan.' },
    { jp: '彼が次期リーダー候補<b>と見られている</b>。', id: 'Dia dipandang sebagai kandidat pemimpin berikutnya.' },
  ],
  see_also_grammar: ['gn2-00204', 'gn2-00206'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: 'ニュース・報道での分析や推測の表現として頻出。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00212',
  level: 'n2',
  pattern: '〜を受けて',
  reading: '~wo ukete',
  meaning: 'sebagai respons terhadap ..., setelah menerima ...',
  cat: 'reason-cause',
  connection: 'N + を受けて',
  desc: '<b>〜を受けて</b> menyatakan bahwa suatu tindakan atau keputusan diambil sebagai respons langsung terhadap suatu peristiwa, keputusan, laporan, atau kritik yang telah terjadi sebelumnya. Mengandung makna bahwa tindakan tersebut adalah reaksi yang dipicu oleh sesuatu yang sudah diterima.',
  nuance: 'Berbeda dengan 〜をきっかけに (gn2-00192) yang menekankan pemicu yang memulai perubahan jangka panjang, 〜を受けて menekankan respons langsung dan konkret terhadap suatu peristiwa spesifik. Lebih formal dan sering digunakan dalam konteks organisasi, kebijakan, atau berita.',
  examples: [
    { jp: '市民からの苦情<b>を受けて</b>、市は対策を講じた。', id: 'Sebagai respons terhadap keluhan warga, kota mengambil tindakan.' },
    { jp: '調査結果<b>を受けて</b>、新たな規制が設けられた。', id: 'Setelah menerima hasil investigasi, peraturan baru ditetapkan.' },
    { jp: '社長の指示<b>を受けて</b>、プロジェクトを再開した。', id: 'Merespons instruksi direktur, proyek dilanjutkan kembali.' },
  ],
  see_also_grammar: ['gn2-00192'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00215',
  level: 'n2',
  pattern: '〜に向けて',
  reading: '~ni mukete',
  meaning: 'menuju ..., dengan tujuan ...',
  cat: 'purpose',
  connection: 'N + に向けて',
  desc: '<b>〜に向けて</b> menyatakan arah tindakan — baik secara fisik (mengarah ke suatu tempat) maupun secara abstrak (dengan tujuan mencapai sesuatu). Dalam makna abstrak, mengandung nuansa usaha atau persiapan yang diarahkan menuju suatu sasaran di masa depan.',
  nuance: 'Berbeda dengan 〜のために yang menyatakan tujuan atau manfaat, 〜に向けて lebih menekankan arah atau orientasi tindakan menuju suatu sasaran. 〜に向けた (gn2-00216) adalah bentuk yang digunakan sebagai modifier sebelum kata benda — perbedaannya hanya gramatikal, bukan makna.',
  examples: [
    { jp: '試合<b>に向けて</b>、毎日練習している。', id: 'Menuju pertandingan, saya berlatih setiap hari.' },
    { jp: '目標の実現<b>に向けて</b>、努力を続ける。', id: 'Menuju terwujudnya tujuan, saya terus berupaya.' },
    { jp: 'カメラ<b>に向けて</b>、微笑んだ。', id: 'Dia tersenyum ke arah kamera.' },
  ],
  see_also_grammar: ['gn2-00216'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00216',
  level: 'n2',
  pattern: '〜に向けた',
  reading: '~ni muketa',
  meaning: 'yang ditujukan untuk ..., yang diarahkan ke ...',
  cat: 'purpose',
  connection: 'N + に向けた + N',
  desc: '<b>〜に向けた</b> adalah bentuk adnominal (prenominal modifier) dari 〜に向けて, yang digunakan untuk menerangkan kata benda. Maknanya identik — menyatakan bahwa sesuatu ditujukan atau diarahkan menuju sasaran tertentu. Contoh: "試合に向けた練習" (latihan menuju pertandingan).',
  nuance: 'Perbedaan dengan 〜に向けて (gn2-00215) murni gramatikal: 〜に向けて digunakan sebagai adverbia (menerangkan verba), sedangkan 〜に向けた digunakan sebagai adjektiva (menerangkan nomina). Keduanya tidak berbeda makna. Pilihan yang tepat bergantung pada fungsi dalam kalimat.',
  examples: [
    { jp: '五輪<b>に向けた</b>選手強化プログラムが始まった。', id: 'Program penguatan atlet yang ditujukan menuju Olimpiade telah dimulai.' },
    { jp: '高齢者<b>に向けた</b>サービスが充実している。', id: 'Layanan yang ditujukan bagi lansia sudah lengkap.' },
    { jp: '環境改善<b>に向けた</b>取り組みを続ける。', id: 'Kami terus melanjutkan upaya yang diarahkan untuk perbaikan lingkungan.' },
  ],
  see_also_grammar: ['gn2-00215'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '〜に向けて の連体形。名詞修飾に使う。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00218',
  level: 'n2',
  pattern: '〜の結果',
  reading: '~no kekka',
  meaning: 'sebagai hasil dari ..., akibat ...',
  cat: 'reason-cause',
  connection: 'N + の結果 / V-た + 結果',
  desc: '<b>〜の結果</b> menyatakan bahwa suatu kondisi atau peristiwa adalah hasil langsung dari tindakan atau proses yang disebutkan sebelumnya. Pola ini menekankan hubungan sebab-akibat yang jelas dan konkret, baik untuk hasil positif maupun negatif.',
  nuance: 'Berbeda dengan 〜の末に (gn2-00219) yang selalu mengandung nuansa proses panjang yang berat atau melelahkan sebelum mencapai hasil, 〜の結果 lebih netral dan dapat digunakan untuk hasil dari proses singkat maupun panjang. 〜の結果 juga lebih formal dan tidak mengandung nuansa emosional.',
  examples: [
    { jp: '努力の<b>結果</b>、試験に合格した。', id: 'Sebagai hasil dari kerja keras, dia lulus ujian.' },
    { jp: '調査<b>の結果</b>、問題の原因が判明した。', id: 'Sebagai hasil investigasi, penyebab masalah terungkap.' },
    { jp: '長年の研究<b>の結果</b>として、新しい発見があった。', id: 'Sebagai hasil penelitian bertahun-tahun, ditemukan penemuan baru.' },
  ],
  see_also_grammar: ['gn2-00219', 'gn2-00213'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00221', level: 'n2', pattern: '〜ようでは',
  reading: '〜you de wa',
  meaning: 'kalau sampai (keadaannya) seperti itu / kalau begini terus maka ...',
  cat: 'contrast-concession',
  connection: 'V-dict / V-ている + ようでは',
  desc: '<b>〜ようでは</b> digunakan untuk menyatakan bahwa jika keadaan atau perilaku seseorang seperti yang disebutkan, maka hasilnya akan buruk atau mengkhawatirkan. Mengandung nada kritik atau peringatan dari pembicara.',
  nuance: 'Berbeda dari ようだ yang hanya mendeskripsikan keadaan — di sini ようでは menekankan kekhawatiran atas kondisi yang ada. Klausa setelahnya biasanya berisi penilaian negatif seperti だめだ, 困る, atau 無理だ. Sering digunakan kepada orang yang lebih muda atau setara, bukan kepada atasan.',
  examples: [
    { jp: 'そんなことも知らない<b>ようでは</b>、試験に合格できないよ。', id: 'Kalau sampai hal seperti itu pun tidak tahu, kamu tidak akan bisa lulus ujian.' },
    { jp: 'ちょっとしたことで諦める<b>ようでは</b>、一人前にはなれない。', id: 'Kalau hanya karena hal sepele saja sudah menyerah, kamu tidak akan bisa jadi orang yang mandiri.' },
  ],
  see_also_grammar: ['gn2-00225'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00223', level: 'n2', pattern: '〜とあっては',
  reading: '〜to atte wa',
  meaning: 'karena situasinya ... / mengingat kenyataan ini maka ...',
  cat: 'reason-cause',
  connection: 'N / clause + とあっては',
  desc: '<b>〜とあっては</b> menyatakan bahwa mengingat situasi atau kenyataan yang disebutkan, ada konsekuensi atau tindakan yang tidak bisa dihindari. Menekankan bahwa situasi tersebut memaksa seseorang untuk bertindak.',
  nuance: 'Berbeda dari とあれば (gn2-00222) yang lebih menekankan kerelaan — とあっては lebih menekankan "terpaksa" atau "tidak bisa tidak" karena situasinya sudah seperti itu. Klausa setelahnya sering berisi ekspresi ketidakberdayaan atau keharusan seperti 〜ざるを得ない atau 〜しなければならない.',
  examples: [
    { jp: '上司の命令と<b>あっては</b>、従わざるを得ない。', id: 'Karena ini perintah atasan, tidak ada pilihan selain mengikutinya.' },
    { jp: '緊急事態と<b>あっては</b>、すぐに対応しなければならない。', id: 'Mengingat ini adalah keadaan darurat, harus segera ditangani.' },
  ],
  see_also_grammar: ['gn2-00222', 'gn2-00224'], see_also_vocab: [],
  confusion_pairs: ['gn2-00222'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00224', level: 'n2', pattern: '〜とあって',
  reading: '〜to atte',
  meaning: 'karena ... / dikarenakan ... (sehingga efek/reaksi terlihat nyata)',
  cat: 'reason-cause',
  connection: 'N / clause + とあって',
  desc: '<b>〜とあって</b> menyatakan alasan atau latar belakang dari suatu situasi yang hasilnya terlihat nyata. Sering digunakan dalam laporan atau narasi untuk mendeskripsikan mengapa sesuatu terjadi seperti itu.',
  nuance: 'Berbeda dari から/ので yang netral — とあって mengandung nuansa bahwa kondisi yang disebutkan adalah luar biasa atau penting, sehingga efeknya pun karenanya terlihat jelas. Tidak bisa dipakai untuk keinginan atau perintah. Sering muncul dalam berita, laporan, atau narasi tertulis.',
  examples: [
    { jp: '連休<b>とあって</b>、観光地はどこも大混雑だった。', id: 'Karena ini hari libur panjang, tempat wisata di mana-mana penuh sesak.' },
    { jp: '人気アイドルの来日<b>とあって</b>、ファンが空港に殺到した。', id: 'Dikarenakan kedatangan idola populer ke Jepang, para penggemar berbondong-bondong ke bandara.' },
  ],
  see_also_grammar: ['gn2-00222', 'gn2-00223'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00225', level: 'n2', pattern: '〜たところで',
  reading: '〜ta tokoro de',
  meaning: 'meskipun melakukan ... / percuma saja melakukan ...',
  cat: 'contrast-concession',
  connection: 'V-ta + ところで',
  desc: '<b>〜たところで</b> menyatakan bahwa meskipun melakukan tindakan yang disebutkan, hasilnya tidak akan berubah atau tidak ada gunanya. Mengandung makna pesimistis atau resignasi.',
  nuance: 'Berbeda dari ても yang lebih netral — たところで menekankan bahwa usaha tersebut sia-sia atau hasilnya sudah jelas tidak memuaskan. Klausa setelahnya sering berisi negasi atau ekspresi nihilisme seperti 無駄だ, 意味がない, どうにもならない. Berbeda dari ようでは (gn2-00221) yang menilai kondisi — たところで menilai tindakan.',
  examples: [
    { jp: '今さら謝っ<b>たところで</b>、許してもらえないだろう。', id: 'Meskipun minta maaf sekarang pun, kemungkinan besar tidak akan dimaafkan.' },
    { jp: '急いで行っ<b>たところで</b>、もう間に合わない。', id: 'Percuma saja terburu-buru pergi sekarang, sudah tidak akan tepat waktu.' },
  ],
  see_also_grammar: ['gn2-00221', 'gn2-00226'], see_also_vocab: [],
  confusion_pairs: ['gn2-00226'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00226', level: 'n2', pattern: '〜にしても',
  reading: '〜ni shite mo',
  meaning: 'meskipun ... / sekalipun ... / bahkan kalau ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + にしても',
  desc: '<b>〜にしても</b> menyatakan konsesi — "meskipun begitu, tetap saja...". Digunakan untuk menyampaikan bahwa bahkan dalam kondisi yang disebutkan, kesimpulan atau penilaian tertentu tetap berlaku.',
  nuance: 'Mirip dengan としても namun にしても lebih sering digunakan dalam situasi konkret atau nyata, bukan hipotetis. Bisa bermakna "terlepas apakah A atau B" saat diulang (にしても〜にしても). Berbeda dari にしては yang berarti "untuk ukuran ..." — nuansanya sama sekali berbeda.',
  examples: [
    { jp: '忙しい<b>にしても</b>、連絡ぐらいはするべきだ。', id: 'Meskipun sibuk, minimal harus memberi kabar.' },
    { jp: 'ミスをした<b>にしても</b>、あの言い方はひどすぎる。', id: 'Sekalipun sudah membuat kesalahan, cara bicara itu terlalu keterlaluan.' },
  ],
  see_also_grammar: ['gn2-00227', 'gn2-00225'], see_also_vocab: [],
  confusion_pairs: ['gn2-00227', 'gn2-00225'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00227', level: 'n2', pattern: '〜にしろ〜にしろ',
  reading: '〜ni shiro〜ni shiro',
  meaning: 'baik ... maupun ... / entah ... atau ...',
  cat: 'listing-addition',
  connection: 'V-plain / N + にしろ〜にしろ',
  desc: '<b>〜にしろ〜にしろ</b> menyatakan bahwa terlepas dari pilihan atau kondisi mana yang berlaku (A atau B), kesimpulan yang sama tetap berlaku. Digunakan untuk menyatakan inklusivitas dari dua kemungkinan.',
  nuance: 'Hampir sama dengan にせよ〜にせよ yang lebih formal. にしろ〜にしろ lebih sering digunakan dalam percakapan sehari-hari. Berbeda dari 〜であれ〜であれ (gn2-00228) yang lebih formal dan tertulis, serta lebih terbatas pada nomina.',
  examples: [
    { jp: '賛成する<b>にしろ</b>反対する<b>にしろ</b>、まず意見を言うべきだ。', id: 'Entah setuju atau tidak, yang penting harus menyampaikan pendapat terlebih dahulu.' },
    { jp: '行く<b>にしろ</b>行かない<b>にしろ</b>、早めに決めてください。', id: 'Baik pergi maupun tidak, mohon segera buat keputusan.' },
  ],
  see_also_grammar: ['gn2-00228', 'gn2-00226'], see_also_vocab: [],
  confusion_pairs: ['gn2-00228', 'gn2-00226'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00228', level: 'n2', pattern: '〜であれ〜であれ',
  reading: '〜de are〜de are',
  meaning: 'baik ... maupun ... (formal) / apapun pilihannya ...',
  cat: 'listing-addition',
  connection: 'N + であれ〜N + であれ',
  desc: '<b>〜であれ〜であれ</b> menyatakan bahwa apapun pilihannya dari dua kemungkinan yang disebutkan, kesimpulan yang sama berlaku. Merupakan ekspresi yang lebih formal dibandingkan にしろ〜にしろ.',
  nuance: 'Lebih formal dari にしろ〜にしろ (gn2-00227) — であれ〜であれ umumnya muncul dalam tulisan formal, pidato, atau dokumen resmi. Digunakan terutama dengan nomina. Berbeda dari であれ standalone yang bermakna "meskipun/sekalipun" dan berfungsi sebagai konsesi.',
  examples: [
    { jp: '男<b>であれ</b>女<b>であれ</b>、この規則はすべての人に適用される。', id: 'Baik laki-laki maupun perempuan, aturan ini berlaku untuk semua orang.' },
    { jp: '賛成<b>であれ</b>反対<b>であれ</b>、理由を明確にして意見を述べてください。', id: 'Baik setuju maupun tidak, silakan sampaikan pendapat dengan alasan yang jelas.' },
  ],
  see_also_grammar: ['gn2-00227', 'gn2-00229'], see_also_vocab: [],
  confusion_pairs: ['gn2-00227'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00229', level: 'n2', pattern: '〜であろうと',
  reading: '〜de arou to',
  meaning: 'meskipun ... / sekalipun ... / tidak peduli apakah ...',
  cat: 'contrast-concession',
  connection: 'N / V-volitional form + であろうと',
  desc: '<b>〜であろうと</b> menyatakan bahwa terlepas dari kondisi atau keadaan yang disebutkan, hasil atau tindakan tetap sama. Merupakan ungkapan formal yang menekankan tidak ada pengecualian.',
  nuance: 'Lebih formal dari でも (meskipun). Sering muncul dalam konteks argumentasi atau pernyataan prinsip. Bisa dikombinasikan menjadi 〜であろうと〜であろうと untuk dua alternatif, mirip dengan であれ〜であれ (gn2-00228). Berbeda dari であれ〜であれ yang lebih terbatas pada dua pilihan eksplisit.',
  examples: [
    { jp: '相手が誰<b>であろうと</b>、礼儀は守らなければならない。', id: 'Meskipun lawannya siapa saja, sopan santun harus tetap dijaga.' },
    { jp: 'どんな困難<b>であろうと</b>、諦めずに立ち向かう。', id: 'Sekalipun kesulitannya seperti apa, aku akan menghadapinya tanpa menyerah.' },
  ],
  see_also_grammar: ['gn2-00228', 'gn2-00230'], see_also_vocab: [],
  confusion_pairs: ['gn2-00230'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00230', level: 'n2', pattern: '〜ようが〜まいが',
  reading: '〜you ga〜mai ga',
  meaning: 'mau ... atau tidak, tetap saja ... / entah ... atau tidak ...',
  cat: 'contrast-concession',
  connection: 'V-dict + ようが + V-dict + まいが',
  desc: '<b>〜ようが〜まいが</b> menyatakan bahwa terlepas dari apakah seseorang melakukan sesuatu atau tidak, hasilnya tetap sama. Menggabungkan ようが (meskipun melakukan) dan まいが (meskipun tidak melakukan) untuk menekankan totalitas ketidakpedulian.',
  nuance: 'Merupakan kombinasi dari ようと dan まいと (versi lebih formal). Digunakan untuk menekankan "tidak ada pengaruhnya apapun yang dilakukan atau tidak." Berbeda dari ようと〜まいと yang sedikit lebih formal namun bermakna sama. Verb yang digunakan biasanya sama di kedua bagian.',
  examples: [
    { jp: 'あなたが信じ<b>ようが</b>信じ<b>まいが</b>、これは事実だ。', id: 'Mau kamu percaya atau tidak, ini adalah kenyataan.' },
    { jp: '雨が降り<b>ようが</b>降る<b>まいが</b>、試合は決行される。', id: 'Entah hujan turun atau tidak, pertandingan tetap akan dilangsungkan.' },
  ],
  see_also_grammar: ['gn2-00229', 'gn2-00231'], see_also_vocab: [],
  confusion_pairs: ['gn2-00229'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00237', level: 'n2', pattern: '〜くせに',
  reading: '〜kuse ni',
  meaning: 'padahal ... / meski sebenarnya ... (kecewa atau kritis terhadap seseorang)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + の + くせに',
  desc: '<b>〜くせに</b> menyatakan kontras antara kenyataan dan perilaku seseorang, dengan nada kecewa, kritis, atau menyalahkan. Digunakan ketika pembicara merasa seseorang tidak konsisten dengan kondisi atau kemampuannya.',
  nuance: 'Berbeda dari のに (gn2-00238) yang lebih netral — くせに selalu mengandung nuansa kritik atau ketidakpuasan yang ditujukan kepada orang tertentu. Tidak sopan digunakan kepada orang yang lebih tua atau atasan. Subyek biasanya orang lain, bukan diri sendiri.',
  examples: [
    { jp: '知らない<b>くせに</b>、知ったかぶりをするな。', id: 'Padahal tidak tahu apa-apa, jangan sok tahu.' },
    { jp: '自分もできない<b>くせに</b>、人のことをとやかく言うな。', id: 'Kamu sendiri juga tidak bisa, tapi malah mengkritik orang lain.' },
  ],
  see_also_grammar: ['gn2-00238'], see_also_vocab: [],
  confusion_pairs: ['gn2-00238'],
  register: null, exceptions: null, notes: 'Tidak sopan — hindari penggunaan kepada orang yang lebih tua atau atasan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00238', level: 'n2', pattern: '〜のに',
  reading: '〜no ni',
  meaning: 'padahal ... / tapi ... (harapan vs kenyataan yang mengecewakan)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + な + のに',
  desc: '<b>〜のに</b> menyatakan kontras antara harapan atau logika dengan kenyataan yang mengecewakan. Digunakan ketika pembicara merasa sesuatu tidak berjalan seperti yang seharusnya.',
  nuance: 'Berbeda dari が dan けど yang netral — のに selalu mengandung unsur kekecewaan atau kejutan negatif. Berbeda dari くせに (gn2-00237) yang lebih kasar dan kritis — のに lebih umum dan bisa digunakan dalam berbagai situasi. Catatan: のに juga bermakna "untuk/demi" (purpose) ketika diikuti V-dict — fungsi yang sama sekali berbeda.',
  examples: [
    { jp: 'せっかく来た<b>のに</b>、彼女はいなかった。', id: 'Padahal sudah jauh-jauh datang, tapi ternyata dia tidak ada.' },
    { jp: 'こんなに頑張っている<b>のに</b>、なぜ評価してもらえないんだろう。', id: 'Padahal sudah berusaha sekeras ini, tapi mengapa tidak diapresiasi.' },
  ],
  see_also_grammar: ['gn2-00237', 'gn2-00235'], see_also_vocab: [],
  confusion_pairs: ['gn2-00237', 'gn2-00235'],
  register: null, exceptions: null, notes: 'Jangan bingung dengan のに bermakna "untuk/demi" (purpose): 〜するのに必要だ.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00242', level: 'n2', pattern: '〜いかんにかかわらず',
  reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari ... / tidak peduli bagaimanapun ... (formal)',
  cat: 'contrast-concession',
  connection: 'N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa apapun kondisi atau hasilnya, sesuatu tetap berlaku. Merupakan ungkapan formal yang berarti "tidak bergantung pada" atau "terlepas dari."',
  nuance: 'Kebalikan dari いかんによっては (gn2-00241) — di sini kondisi tidak berpengaruh pada hasilnya. Mirip dengan にかかわらず yang lebih umum, namun kombinasi dengan いかん menambah keformalan. Sering muncul dalam dokumen resmi, peraturan, atau pengumuman resmi.',
  examples: [
    { jp: '理由<b>いかんにかかわらず</b>、無断欠席は認められない。', id: 'Terlepas dari alasan apapun, ketidakhadiran tanpa izin tidak dapat dibenarkan.' },
    { jp: '結果<b>いかんにかかわらず</b>、参加したことに意義がある。', id: 'Terlepas dari hasilnya, ada makna tersendiri dalam keikutsertaan ini.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00241'], see_also_vocab: [],
  confusion_pairs: ['gn2-00241'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00251', level: 'n2', pattern: '〜をはじめとして',
  reading: '〜wo hajime to shite',
  meaning: 'dimulai dengan ..., termasuk di antaranya ...',
  cat: 'listing-addition',
  connection: 'N + をはじめとして',
  desc: '<b>〜をはじめとして</b> menyatakan bahwa suatu hal disebutkan sebagai contoh perwakilan dari sekelompok hal serupa. Nuansanya formal dan sering muncul dalam tulisan resmi, laporan, atau pidato. Subjek yang ditandai berfungsi sebagai "wakil" dari kelompok yang lebih besar.',
  nuance: 'Mirip dengan をはじめ(とする) (gn2-00252), tetapi をはじめとして lebih sering berdiri sendiri sebagai frasa pengantar tanpa langsung memodifikasi nomina berikutnya. をはじめとする lebih sering dipakai sebagai prenominal modifier (〜をはじめとする + N). Keduanya lebih formal daripada など.',
  examples: [
    { jp: '東京<b>をはじめとして</b>、日本各地で祭りが開催された。', id: 'Dimulai dari Tokyo, festival diselenggarakan di berbagai tempat di Jepang.' },
    { jp: '鈴木先生<b>をはじめとして</b>、多くの先生方にお世話になりました。', id: 'Dimulai dari Sensei Suzuki, saya mendapat banyak bantuan dari para guru.' },
  ],
  see_also_grammar: ['gn2-00252'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00252'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00252', level: 'n2', pattern: '〜をはじめ(とする)',
  reading: '〜wo hajime (to suru)',
  meaning: 'mulai dari ..., dan lainnya seperti ...',
  cat: 'listing-addition',
  connection: 'N + をはじめ / N + をはじめとする + N',
  desc: '<b>〜をはじめ</b> digunakan untuk menyebut satu contoh representatif dari kelompok yang lebih besar, menyiratkan bahwa ada banyak hal serupa lainnya. Bentuk <b>〜をはじめとする</b> berfungsi sebagai prenominal modifier untuk mendeskripsikan nomina setelahnya.',
  nuance: 'をはじめ dapat berdiri sendiri (東京をはじめ、各地で…) atau menjadi modifier (東京をはじめとする都市). Dibanding をはじめとして (gn2-00251), をはじめとする lebih sering dipakai sebagai modifier sebelum nomina. Keduanya setara dalam register formalnya — lebih formal dari など, lebih natural dalam fungsi modifier dibanding をはじめとして.',
  examples: [
    { jp: '日本語<b>をはじめ</b>、英語や中国語も話せます。', id: 'Mulai dari bahasa Jepang, saya juga bisa berbicara bahasa Inggris dan Mandarin.' },
    { jp: '東京<b>をはじめとする</b>大都市では、人口が集中している。', id: 'Di kota-kota besar mulai dari Tokyo, penduduk terkonsentrasi.' },
  ],
  see_also_grammar: ['gn2-00251'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00251'],
  register: 'formal',
  exceptions: null,
  notes: 'をはじめとする + N digunakan sebagai prenominal modifier; をはじめとして lebih sering sebagai frasa pengantar klausa.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00253', level: 'n2', pattern: '〜のみならず〜も',
  reading: '〜nomi narazu 〜mo',
  meaning: 'bukan hanya ..., bahkan ... juga',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + のみならず',
  desc: '<b>〜のみならず〜も</b> menyatakan bahwa tidak hanya hal A yang berlaku, tetapi hal B yang lebih luas atau lebih mengejutkan juga berlaku. Nuansanya formal dan sering muncul dalam tulisan akademik atau berita. Bagian setelah も memperkuat atau memperluas pernyataan pertama.',
  nuance: 'のみならず adalah padanan formal dari だけでなく (gn2-00254). のみ adalah bentuk formal dari だけ, sehingga のみならず tidak cocok untuk percakapan sehari-hari. Bandingkan juga dengan ばかりか (gn2-00256) yang memberi nuansa lebih mengejutkan/mengintensifkan, dan に加えて (gn2-00255) yang menekankan "penambahan kumulatif".',
  examples: [
    { jp: '彼は日本語<b>のみならず</b>、英語<b>も</b>流暢に話せる。', id: 'Bukan hanya bahasa Jepang, dia juga lancar berbicara bahasa Inggris.' },
    { jp: '環境問題は国内<b>のみならず</b>、世界全体の問題で<b>も</b>ある。', id: 'Masalah lingkungan bukan hanya masalah domestik, bahkan juga masalah seluruh dunia.' },
  ],
  see_also_grammar: ['gn2-00254', 'gn2-00255', 'gn2-00256'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00254', 'gn2-00256', 'gn2-00260'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00254', level: 'n2', pattern: '〜だけでなく〜も',
  reading: '〜dake de naku 〜mo',
  meaning: 'tidak hanya ..., tapi juga ...',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + だけでなく',
  desc: '<b>〜だけでなく〜も</b> menyatakan bahwa tidak hanya A tetapi juga B. Ini adalah bentuk yang paling umum dan netral untuk mengekspresikan "tidak hanya ... tapi juga" dan dapat digunakan dalam hampir semua konteks, baik lisan maupun tulisan.',
  nuance: 'だけでなく adalah bentuk paling netral dan dapat dipakai dalam percakapan biasa maupun tulisan formal. のみならず (gn2-00253) adalah padanan yang lebih formal dan terasa kaku dalam obrolan. ばかりか (gn2-00256/gn2-00257) memberi nuansa bahwa hal kedua lebih mengejutkan. に加えて (gn2-00255) menekankan "penambahan" daripada cakupan yang diperluas.',
  examples: [
    { jp: '彼女は歌が上手な<b>だけでなく</b>、ダンス<b>も</b>できる。', id: 'Tidak hanya pandai menyanyi, dia juga bisa menari.' },
    { jp: '健康のため<b>だけでなく</b>、ストレス解消のために<b>も</b>運動しています。', id: 'Saya berolahraga tidak hanya untuk kesehatan, tapi juga untuk menghilangkan stres.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00255', 'gn2-00256'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00253', 'gn2-00255'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00255', level: 'n2', pattern: '〜に加えて',
  reading: '〜ni kuwaete',
  meaning: 'ditambah dengan ..., selain itu ...',
  cat: 'listing-addition',
  connection: 'N + に加えて',
  desc: '<b>〜に加えて</b> menyatakan penambahan sesuatu di atas hal yang sudah ada atau sudah disebutkan sebelumnya. Nuansanya menekankan "penambahan/akumulasi" bukan perluasan cakupan. Sering dipakai ketika hal yang ditambahkan bersifat nyata dan konkret.',
  nuance: 'に加えて menekankan penambahan kumulatif — A sudah ada, dan B ditambahkan di atasnya. Berbeda dengan だけでなく (gn2-00254) yang menekankan "tidak terbatas pada A saja". に加えて tidak mengandung nuansa kejutan seperti ばかりか (gn2-00256/gn2-00257). Cocok untuk konteks di mana dua hal positif saling melengkapi atau dua masalah saling memperparah.',
  examples: [
    { jp: '経験<b>に加えて</b>、資格もあれば採用される可能性が高い。', id: 'Ditambah dengan pengalaman, jika memiliki kualifikasi pun kemungkinan diterima semakin tinggi.' },
    { jp: '台風の被害<b>に加えて</b>、洪水まで起きてしまった。', id: 'Ditambah dengan kerusakan akibat topan, bahkan banjir pun terjadi.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00254'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00256', level: 'n2', pattern: '〜ばかりか〜まで',
  reading: '〜bakari ka 〜made',
  meaning: 'bukan hanya ..., bahkan sampai ...',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + ばかりか',
  desc: '<b>〜ばかりか〜まで</b> mengekspresikan bahwa tidak hanya A (yang sudah cukup mengejutkan), tetapi bahkan B yang lebih ekstrem atau tak terduga juga terjadi. Kombinasi dengan まで memperkuat rasa kejutan dan menekankan bahwa sesuatu telah "melampaui batas" yang diperkirakan.',
  nuance: 'ばかりか selalu diikuti elemen kedua yang melebihi ekspektasi — nuansanya lebih kuat daripada だけでなく (gn2-00254) atau のみならず (gn2-00253). Varian ばかりか〜さえ (gn2-00257) menggunakan さえ untuk nuansa "bahkan hal tak terduga itu pun terlibat". まで menekankan batas yang terlampaui; さえ menekankan ketidakterdugaan subjek yang disebutkan.',
  examples: [
    { jp: '彼は謝らない<b>ばかりか</b>、逆に怒り出し<b>まで</b>した。', id: 'Bukan hanya tidak minta maaf, bahkan sampai balik marah.' },
    { jp: '体調が悪い<b>ばかりか</b>、熱<b>まで</b>出てしまった。', id: 'Bukan hanya kondisi badannya buruk, bahkan sampai demam.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254', 'gn2-00257'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00253', 'gn2-00257'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00257', level: 'n2', pattern: '〜ばかりか〜さえ',
  reading: '〜bakari ka 〜sae',
  meaning: 'bukan hanya ..., bahkan ...',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + ばかりか',
  desc: '<b>〜ばかりか〜さえ</b> menyatakan bahwa tidak hanya A, bahkan B yang tak terduga atau sulit dipercaya pun ikut berlaku. さえ menekankan kejutan atas hal yang biasanya dianggap tidak mungkin atau tidak terduga, memberikan nuansa lebih dramatis.',
  nuance: 'ばかりか〜さえ dan ばかりか〜まで (gn2-00256) keduanya mengungkapkan "bukan hanya... bahkan..." dengan nuansa mengejutkan. まで (gn2-00256) menekankan pencapaian batas ekstrem ("sampai sejauh itu"), sementara さえ menekankan ketidakterdugaan subjek yang disebutkan ("hal itu saja pun terjadi"). さえ sering dipakai ketika hal kedua terasa hampir mustahil.',
  examples: [
    { jp: '彼は宿題をやらない<b>ばかりか</b>、教科書<b>さえ</b>持ってこない。', id: 'Bukan hanya tidak mengerjakan PR, bahkan buku teks saja pun tidak dibawa.' },
    { jp: '病気で食事ができない<b>ばかりか</b>、水<b>さえ</b>飲めない状態だ。', id: 'Bukan hanya tidak bisa makan karena sakit, bahkan air saja pun tidak bisa diminum.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00256'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00256'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00258', level: 'n2', pattern: '〜はもちろん〜も',
  reading: '〜wa mochiron 〜mo',
  meaning: 'sudah tentu ..., dan ... juga',
  cat: 'listing-addition',
  connection: 'N + はもちろん',
  desc: '<b>〜はもちろん〜も</b> menyatakan bahwa A sudah pasti/tentu berlaku, dan di samping itu B juga berlaku. Nuansanya menyiratkan bahwa A adalah hal yang sudah jelas dan tidak perlu dipertanyakan, lalu menambahkan B sebagai informasi tambahan.',
  nuance: 'はもちろん lebih natural dalam percakapan sehari-hari, sedangkan はもとより (gn2-00259) terasa lebih formal/tertulis. Keduanya bermakna dasar "A sudah jelas, B pun juga". Berbeda dengan だけでなく (gn2-00254) — もちろん secara eksplisit menyatakan bahwa A adalah hal yang "sudah pasti/given", memberi penekanan retoris bahwa A tidak perlu diperdebatkan.',
  examples: [
    { jp: '彼は英語は<b>もちろん</b>、中国語<b>も</b>ぺらぺらだ。', id: 'Bahasa Inggris sudah tentu, bahasa Mandarin pun dia fasih.' },
    { jp: '健康のため<b>はもちろん</b>、ダイエット<b>も</b>兼ねて走っています。', id: 'Sudah tentu untuk kesehatan, dan juga sekaligus diet, saya berlari.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254', 'gn2-00259'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00259'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00259', level: 'n2', pattern: '〜はもとより',
  reading: '〜wa moto yori',
  meaning: '(itu) sudah jelas ..., apalagi ...',
  cat: 'listing-addition',
  connection: 'N + はもとより',
  desc: '<b>〜はもとより</b> menyatakan bahwa A adalah hal yang sudah seharusnya/sudah jelas berlaku, dan menambahkan bahwa B yang lebih luas atau lebih mengejutkan juga berlaku. Ekspresi ini lebih formal dibanding はもちろん dan sering muncul dalam tulisan resmi atau pernyataan formal.',
  nuance: 'はもとより vs はもちろん (gn2-00258): keduanya bermakna "sudah jelas A, dan B pun juga", tetapi はもとより bersifat lebih formal dan tertulis, jarang dipakai dalam percakapan biasa. Penggunaan はもとより dalam obrolan sehari-hari dapat terdengar kaku dan berlebihan. はもとより juga lebih sering menyiratkan bahwa A adalah hal yang benar-benar "taken for granted".',
  examples: [
    { jp: '彼女は国内<b>はもとより</b>、海外でも活躍している。', id: 'Dia sudah jelas aktif di dalam negeri, bahkan di luar negeri pun demikian.' },
    { jp: '基本的なことは<b>もとより</b>、応用的な内容も理解しておく必要がある。', id: 'Hal dasar sudah tentu, kita juga perlu memahami konten yang bersifat aplikatif.' },
  ],
  see_also_grammar: ['gn2-00258'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00258'],
  register: 'formal',
  exceptions: null,
  notes: 'もとより sendiri (tanpa は) juga bermakna "sejak awal / dari dulu" dalam konteks berbeda.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00260', level: 'n2', pattern: '〜にかぎらず',
  reading: '〜ni kagirazu',
  meaning: 'tidak hanya ..., tidak terbatas pada ...',
  cat: 'listing-addition',
  connection: 'N + にかぎらず',
  desc: '<b>〜にかぎらず</b> berarti "tidak terbatas hanya pada N, tetapi juga mencakup hal lain". Pola ini digunakan untuk memperluas cakupan pernyataan: N yang disebutkan bukan satu-satunya yang relevan, melainkan hanya salah satu dari banyak contoh.',
  nuance: 'にかぎらず mengandung nuansa "pencabutan batasan" — N yang disebut bukan eksklusif/satu-satunya yang relevan. Berbeda dengan のみならず (gn2-00253) yang menekankan "penambahan", にかぎらず lebih menekankan "tidak eksklusif/tidak terbatas pada satu hal itu saja". Sering muncul dalam konteks saran atau pernyataan umum.',
  examples: [
    { jp: 'これは子供<b>にかぎらず</b>、大人にも言えることだ。', id: 'Ini bukan hanya berlaku untuk anak-anak, tapi juga berlaku untuk orang dewasa.' },
    { jp: '日本<b>にかぎらず</b>、アジア全体で同じ問題が起きている。', id: 'Tidak terbatas hanya di Jepang, masalah yang sama terjadi di seluruh Asia.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00253'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00269', level: 'n2', pattern: '〜による',
  reading: '〜ni yoru',
  meaning: 'yang disebabkan oleh ..., berdasarkan ...',
  cat: 'reason-cause',
  connection: 'N + による + N / N + によって',
  desc: '<b>〜による</b> memiliki beberapa makna: (1) penyebab atau agen tindakan (〜によって = oleh.../karena...); (2) cara atau metode (〜による = dengan cara...); (3) sumber informasi (〜によれば = menurut...). Bentuk による digunakan sebagai prenominal modifier; によって sebagai adverbial.',
  nuance: 'による adalah kata multifungsi. Sebagai penyebab: 地震による被害 (kerusakan akibat gempa) — lebih formal dari で. Sebagai agen pasif: 彼によって発見された (ditemukan olehnya). Sebagai metode: メールによる連絡 (kontak melalui email). Jangan dikacaukan dengan によっては (gn2-00274) yang bermakna "tergantung", atau によって異なる (gn2-00270) yang menyatakan variasi.',
  examples: [
    { jp: '台風<b>による</b>被害が各地で報告された。', id: 'Kerusakan yang disebabkan oleh topan dilaporkan di berbagai tempat.' },
    { jp: '新薬は最先端技術<b>によって</b>開発された。', id: 'Obat baru dikembangkan dengan menggunakan teknologi mutakhir.' },
  ],
  see_also_grammar: ['gn2-00267', 'gn2-00268', 'gn2-00270', 'gn2-00274'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00268', 'gn2-00270'],
  register: null,
  exceptions: null,
  notes: 'によれば = menurut ... (bentuk kondisional untuk sumber informasi/hearsay).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00271', level: 'n2', pattern: '〜いかんにかかわらず',
  reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari bagaimana ..., tidak peduli hasil ...',
  cat: 'contrast-concession',
  connection: 'N + のいかんにかかわらず / N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa terlepas dari bagaimana kondisi atau hasil N, hal tersebut tidak mengubah kesimpulan atau tindakan yang diambil. 如何 (いかん) berarti "bagaimana keadaannya", sehingga ekspresi ini menyatakan bahwa kondisi N sama sekali tidak relevan/tidak berpengaruh.',
  nuance: 'いかんにかかわらず adalah ekspresi sangat formal — biasanya muncul dalam dokumen resmi, syarat dan ketentuan, atau pernyataan formal. Untuk percakapan, padanan yang lebih natural adalah 〜にかかわらず atau 〜に関係なく. Berbeda dari 次第だ (gn2-00272) yang menyatakan "bergantung pada N" — いかんにかかわらず justru menyatakan "TIDAK bergantung pada N".',
  examples: [
    { jp: '結果<b>のいかんにかかわらず</b>、最後まで全力を尽くします。', id: 'Terlepas dari bagaimana hasilnya, saya akan berusaha sepenuh tenaga sampai akhir.' },
    { jp: '天候<b>のいかんにかかわらず</b>、イベントは予定通り開催されます。', id: 'Terlepas dari kondisi cuaca bagaimanapun, acara akan diselenggarakan sesuai rencana.' },
  ],
  see_also_grammar: ['gn2-00272', 'gn2-00274'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00272'],
  register: 'formal',
  exceptions: null,
  notes: 'いかんによっては = "tergantung bagaimana kondisinya" — berlawanan makna dengan いかんにかかわらず.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00306', level: 'n2', pattern: '〜もので',
  reading: '〜mono de',
  meaning: 'karena ..., disebabkan oleh ... (alasan alami atau sifat yang melekat)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + もので',
  desc: '<b>〜もので</b> dipakai untuk menyatakan alasan yang bersifat alami, inheren, atau merupakan sifat yang melekat pada subjek atau situasi. Pembicara menyampaikan alasan sebagai sesuatu yang wajar dan dapat dimaklumi karena memang "seperti itulah adanya." Nuansanya lebih objektif dibandingkan 〜ものだから yang lebih membenarkan diri.',
  nuance: 'Spektrum formalitas keluarga pola もの-alasan: もんで (gn2-00310, sangat kasual) < もので kasual (gn2-00309) < もので formal/netral (gn2-00306) < ものだから (gn2-00307, semi-formal) < ものですから (gn2-00308, sopan). もので (306) lebih objektif dan netral — cocok untuk situasi semi-formal atau saat alasannya merupakan sifat alami yang tidak dapat dihindari.',
  examples: [
    { jp: '子供な<b>もので</b>、まだ上手に話せません。', id: 'Maklumlah, masih anak-anak, jadi belum bisa bicara dengan baik.' },
    { jp: '初めての経験な<b>もので</b>、不慣れな点はご容赦ください。', id: 'Karena ini pertama kali bagi saya, mohon dimaklumi kalau ada yang kurang.' },
  ],
  see_also_grammar: ['gn2-00307', 'gn2-00308', 'gn2-00309', 'gn2-00310', 'gn2-00303'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00307', 'gn2-00308', 'gn2-00309', 'gn2-00310'],
  register: null, exceptions: null,
  notes: 'Nuansa lebih objektif/formal dibandingkan ものだから. Lihat gn2-00307–00310 untuk spektrum formalitas lengkap.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00307', level: 'n2', pattern: '〜ものだから',
  reading: '〜mono dakara',
  meaning: 'karena ..., sebab ... (membenarkan diri atau menjelaskan penyebab)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + ものだから',
  desc: '<b>〜ものだから</b> dipakai untuk menyatakan alasan dengan nuansa pembicara membenarkan perilaku atau situasinya sendiri. Lebih kuat dari 〜から atau 〜ので, mengandung sedikit nada pembelaan diri atau permintaan maklum. Sering muncul dalam percakapan ketika seseorang menjelaskan mengapa melakukan sesuatu yang mungkin kurang tepat.',
  nuance: '〜ものだから vs 〜もので (gn2-00306): ものだから lebih bersifat subjektif dan membenarkan diri, sering terasa seperti "maklumlah, aku melakukan itu karena..."; sedangkan もので lebih objektif dan alami. 〜ものだから vs 〜ものですから (gn2-00308): ものだから adalah versi kasual-semi-formal; ものですから adalah versi lebih sopan, dipakai saat berbicara dengan atasan atau dalam situasi formal.',
  examples: [
    { jp: '急いでいた<b>ものだから</b>、メールを確認し忘れた。', id: 'Soalnya terburu-buru, jadi lupa mengecek email.' },
    { jp: '疲れていた<b>ものだから</b>、約束をすっかり忘れてしまった。', id: 'Karena kelelahan, aku benar-benar lupa dengan janjinya.' },
  ],
  see_also_grammar: ['gn2-00306', 'gn2-00308', 'gn2-00303'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00306', 'gn2-00308'],
  register: null, exceptions: null,
  notes: 'Lebih kasual dari 〜ものですから. Dipakai dalam percakapan sehari-hari semi-formal.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00308', level: 'n2', pattern: '〜ものですから',
  reading: '〜mono desu kara',
  meaning: 'karena ... (sopan, memohon pengertian dari lawan bicara)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + ものですから',
  desc: '<b>〜ものですから</b> adalah versi sopan dan formal dari 〜ものだから (gn2-00307). Dipakai untuk memberikan alasan dengan nada memohon pengertian atau maklum dari pihak lain, terutama dalam situasi formal seperti saat berbicara dengan atasan, pelanggan, atau dalam surat resmi. Nuansanya sangat sopan dan menunjukkan kesadaran sosial pembicara.',
  nuance: 'Spektrum formalitas: もんで (sangat kasual) < もので kasual < もので formal < ものだから (semi-formal) < ものですから (sopan/formal). Pilih ものですから saat berbicara dengan orang yang lebih tinggi statusnya atau dalam situasi yang memerlukan kesopanan tinggi. Versi ini paling sering muncul dalam surat resmi, email bisnis, atau percakapan formal di tempat kerja.',
  examples: [
    { jp: '体調が優れない<b>ものですから</b>、早退させていただけますか。', id: 'Karena kondisi badan kurang baik, bolehkah saya izin pulang lebih awal?' },
    { jp: '初めての参加な<b>ものですから</b>、ご説明いただけますと幸いです。', id: 'Karena ini pertama kali saya ikut serta, saya akan sangat berterima kasih kalau berkenan menjelaskan.' },
  ],
  see_also_grammar: ['gn2-00306', 'gn2-00307', 'gn2-00309'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00307', 'gn2-00306'],
  register: 'teineigo', exceptions: null,
  notes: 'Pola paling formal dalam keluarga ものだから. Direkomendasikan untuk komunikasi bisnis dan surat resmi.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00309', level: 'n2', pattern: '〜もので',
  reading: '〜mono de',
  meaning: 'karena ... (kasual, sehari-hari — versi lisan dan santai)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain + もので (konteks lisan, kasual)',
  desc: '<b>〜もので</b> dalam register kasual dipakai dalam percakapan sehari-hari untuk menyatakan alasan secara santai. Meskipun bentuknya sama dengan 〜もので (gn2-00306), nuansanya lebih ringan dan spontan — lebih cocok untuk obrolan teman sebaya atau situasi tidak formal. Sering dipakai dalam bentuk lisan dengan intonasi yang tidak terlalu serius.',
  nuance: 'Secara bentuk identik dengan gn2-00306 (〜もので netral-formal), tetapi register dan konteks penggunaannya berbeda. もので (309) lebih kasual dan lisan — pembicara tidak terlalu memikirkan formalitas. Dalam praktik, perbedaan muncul dari konteks percakapan: ke teman = もので kasual (309); ke pelanggan/atasan = もので netral (306) atau ものですから (308). Versi yang lebih kasual lagi adalah もんで (gn2-00310).',
  examples: [
    { jp: '眠かった<b>もので</b>、ちょっとうとうとしちゃった。', id: 'Soalnya ngantuk, jadi ketiduran sebentar deh.' },
    { jp: '忙しかった<b>もので</b>、連絡できなかったんだ。', id: 'Soalnya sibuk, jadi tidak bisa kasih kabar.' },
  ],
  see_also_grammar: ['gn2-00306', 'gn2-00307', 'gn2-00310'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00306', 'gn2-00310'],
  register: null, exceptions: null,
  notes: 'Register lebih kasual dari gn2-00306. Versi paling kasual: もんで (gn2-00310).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00310', level: 'n2', pattern: '〜もんで',
  reading: '〜monde',
  meaning: 'karena ... (sangat kasual, kontraksi dari 〜ものだから / 〜もので)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain + もんで',
  desc: '<b>〜もんで</b> adalah kontraksi sangat kasual dan dialektal dari 〜ものだから atau 〜もので, dipakai dalam percakapan sehari-hari yang sangat informal. Bentuk ini muncul ketika ものだから atau もので "dipotong" dalam ujaran cepat dan kasual. Umum didengar dalam percakapan spontan antara teman dekat atau anggota keluarga.',
  nuance: 'もんで adalah bentuk paling kasual dalam spektrum pola もの-alasan: ものですから (formal) > ものだから (semi-formal) > もので (kasual) > もんで (sangat kasual/dialek). Tidak cocok untuk situasi formal, tulisan resmi, atau saat berbicara dengan orang yang statusnya lebih tinggi. Dalam konteks ujian JLPT, もんで biasanya muncul sebagai pilihan jawaban yang salah (terlalu kasual) atau sebagai materi pemahaman percakapan.',
  examples: [
    { jp: 'ちょっと遅れた<b>もんで</b>、ごめんね。', id: 'Maaf ya terlambat sedikit — soalnya ada hal.' },
    { jp: '知らなかった<b>もんで</b>、間違えちゃったよ。', id: 'Soalnya tidak tahu, jadi salah deh.' },
  ],
  see_also_grammar: ['gn2-00309', 'gn2-00307', 'gn2-00306'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00309', 'gn2-00306'],
  register: null, exceptions: null,
  notes: 'Register paling kasual dalam keluarga もの-alasan. Tidak cocok untuk konteks formal atau tulisan resmi. Umum dalam dialek Jepang bagian timur (Kantō).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── NOUNS-PREDICATES (10) ───────────────────────────────────

{
  id: 'gn2-00039', level: 'n2', pattern: '〜において / 〜における', reading: '〜ni oite / 〜ni okeru',
  meaning: 'di dalam ... / dalam hal ... / pada ... (formal)',
  cat: 'nominalization',
  connection: 'N + において / N + における + N',
  desc: '<b>〜において</b> adalah partikel majemuk formal yang menunjukkan tempat, waktu, atau ranah terjadinya sesuatu. Bentuk <b>〜における</b> digunakan sebelum nomina (atributif).',
  nuance: 'Pengganti formal dari で atau の中で. Hampir tidak dipakai dalam percakapan sehari-hari. Sering muncul dalam dokumen resmi, berita, dan akademik.',
  examples: [
    { jp: '現代社会<b>において</b>、スマホは必需品だ。', id: 'Dalam masyarakat modern, smartphone adalah kebutuhan pokok.' },
    { jp: '日本<b>における</b>少子化問題は深刻だ。', id: 'Masalah penurunan angka kelahiran di Jepang sangat serius.' },
    { jp: 'このプロジェクト<b>において</b>、彼の役割は大きい。', id: 'Dalam proyek ini, perannya sangat besar.' }
  ],
  see_also_grammar: ['gn2-00040'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: 'における adalah bentuk atributif (sebelum nomina); において adalah bentuk predikatif.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00045', level: 'n2', pattern: '〜をめぐって / 〜をめぐる', reading: '〜wo megutte / 〜wo meguru',
  meaning: 'seputar ... / mengenai ... / terkait isu ...',
  cat: 'nominalization',
  connection: 'N (isu/topik) + をめぐって / をめぐる + N',
  desc: '<b>〜をめぐって</b> menandai topik yang menjadi pusat diskusi, perdebatan, atau konflik. <b>〜をめぐる</b> adalah bentuk atributif yang diikuti nomina.',
  nuance: 'Berbeda dari について (yang netral dan umum), をめぐって menyiratkan adanya perselisihan, kontroversi, atau diskusi aktif di sekitar topik tersebut.',
  examples: [
    { jp: '領土問題<b>をめぐって</b>、両国は対立している。', id: 'Kedua negara bertikai seputar masalah wilayah.' },
    { jp: '予算<b>をめぐる</b>議論が続いている。', id: 'Perdebatan mengenai anggaran terus berlanjut.' },
    { jp: '遺産<b>をめぐって</b>、家族の間で争いが起きた。', id: 'Perselisihan terjadi di antara keluarga seputar warisan.' }
  ],
  see_also_grammar: ['gn2-00053'], see_also_vocab: [],
  confusion_pairs: ['gn2-00053'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00053', level: 'n2', pattern: '〜に関して / 〜に関する', reading: '〜ni kanshite / 〜ni kansuru',
  meaning: 'mengenai ... / terkait dengan ... / berkenaan dengan ...',
  cat: 'nominalization',
  connection: 'N + に関して / に関する + N',
  desc: '<b>〜に関して</b> menandai topik atau bidang yang dibicarakan. <b>〜に関する</b> adalah bentuk atributif (sebelum nomina). Digunakan dalam konteks formal.',
  nuance: 'Lebih formal dari について. に関して cocok untuk dokumen, surat resmi, dan presentasi. Dalam percakapan sehari-hari, についてのほうが自然.',
  examples: [
    { jp: '環境問題<b>に関して</b>、専門家が意見を述べた。', id: 'Mengenai masalah lingkungan, para ahli menyampaikan pendapatnya.' },
    { jp: '契約<b>に関する</b>書類を提出してください。', id: 'Mohon serahkan dokumen yang terkait dengan kontrak.' },
    { jp: 'この件<b>に関して</b>、ご不明な点はありますか？', id: 'Terkait hal ini, apakah ada yang kurang jelas?' }
  ],
  see_also_grammar: ['gn2-00045'], see_also_vocab: [],
  confusion_pairs: ['gn2-00045'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00081', level: 'n2', pattern: '〜に値する', reading: '〜ni atai suru',
  meaning: 'layak ... / patut mendapatkan ... / sebanding dengan ...',
  cat: 'predicate-adjective',
  connection: 'V-dict / N + に値する',
  desc: '<b>〜に値する</b> menyatakan bahwa sesuatu atau seseorang layak atau pantas mendapatkan perlakuan, penilaian, atau penghargaan tertentu.',
  nuance: 'Formal. Sering digunakan dalam konteks evaluasi atau penilaian. Bentuk negatif に値しない menyatakan "tidak layak". Berbeda dari てもいい yang sekadar memberi izin.',
  examples: [
    { jp: '彼女の努力は称賛<b>に値する</b>。', id: 'Usaha kerasnya layak mendapat pujian.' },
    { jp: 'この作品は世界に紹介する<b>に値する</b>。', id: 'Karya ini layak untuk diperkenalkan ke dunia.' },
    { jp: '彼の行動は信頼<b>に値しない</b>。', id: 'Tindakannya tidak layak untuk dipercaya.' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00246', level: 'n2', pattern: '〜がちだ',
  reading: '〜gachi da',
  meaning: 'cenderung ... / sering ... (biasanya hal negatif)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N + がちだ',
  desc: '<b>〜がちだ</b> menyatakan kecenderungan untuk sering melakukan atau mengalami sesuatu, biasanya hal yang kurang diinginkan. Dapat digunakan sebagai predikat (がちだ) maupun sebagai modifier sebelum nomina (がちな).',
  nuance: 'Berbeda dari きらいがある (gn2-00245) yang lebih evaluatif dan formal — がちだ lebih deskriptif dan umum. Biasanya digunakan untuk hal-hal negatif atau yang dianggap tidak ideal. Berbeda dari っぽい (gn2-00247) yang tentang kesan/tampilan daripada kecenderungan perilaku berulang.',
  examples: [
    { jp: '冬は運動不足になり<b>がちだ</b>。', id: 'Di musim dingin orang cenderung kurang bergerak.' },
    { jp: '一人暮らしをすると、食生活が偏り<b>がちだ</b>。', id: 'Saat tinggal sendiri, pola makan cenderung jadi tidak seimbang.' },
  ],
  see_also_grammar: ['gn2-00245', 'gn2-00248'], see_also_vocab: [],
  confusion_pairs: ['gn2-00245', 'gn2-00248'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00247', level: 'n2', pattern: '〜っぽい',
  reading: '〜ppoi',
  meaning: 'terasa seperti ... / agak ... / -ish (berkesan seperti)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N / Adj-stem + っぽい',
  desc: '<b>〜っぽい</b> menyatakan bahwa sesuatu memberikan kesan atau terasa seperti yang disebutkan, meski belum tentu demikian. Bersifat informal dan sering digunakan dalam percakapan sehari-hari.',
  nuance: 'Berbeda dari らしい yang menyatakan "memang seperti seharusnya" — っぽい lebih menyatakan "terasa/tampak seperti, tapi mungkin tidak benar." Biasanya berkonotasi sedikit negatif atau merendahkan (contoh: 子供っぽい = kekanak-kanakan). Berbeda dari がちだ (gn2-00246) yang tentang kecenderungan perilaku berulang, っぽい lebih tentang kesan tampilan atau sifat.',
  examples: [
    { jp: 'この映画、ちょっと古<b>っぽい</b>ね。', id: 'Film ini agak terasa jadul ya.' },
    { jp: '彼女の話し方、子供<b>っぽい</b>と思わない？', id: 'Menurutmu cara ngomong dia kekanak-kanakan tidak?' },
  ],
  see_also_grammar: ['gn2-00248', 'gn2-00246'], see_also_vocab: [],
  confusion_pairs: ['gn2-00248'],
  register: null, exceptions: null, notes: 'Ekspresi informal — hindari dalam tulisan atau situasi formal.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00248', level: 'n2', pattern: '〜気味だ',
  reading: '〜gimi da',
  meaning: 'agak ... / sedikit ... (kondisi sedikit mengarah ke hal negatif)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N + 気味だ',
  desc: '<b>〜気味だ</b> menyatakan bahwa seseorang atau sesuatu berada dalam kondisi yang sedikit mengarah ke hal negatif. Mengandung nuansa bahwa kondisi tersebut belum serius namun mulai terasa.',
  nuance: 'Berbeda dari がちだ (gn2-00246) yang menyatakan kecenderungan berulang — 気味だ lebih menyatakan kondisi sesaat yang sedang dialami. Biasanya digunakan untuk kondisi fisik atau mental. Berbeda dari っぽい (gn2-00247) yang tentang kesan dari luar — 気味だ adalah kondisi yang dialami sendiri.',
  examples: [
    { jp: '最近、疲れ<b>気味だ</b>から、早めに帰ることにした。', id: 'Akhir-akhir ini agak kelelahan, jadi memutuskan untuk pulang lebih awal.' },
    { jp: '風邪<b>気味だ</b>から、今日は無理をしないようにする。', id: 'Agak sedikit flu, jadi hari ini tidak mau memaksakan diri.' },
  ],
  see_also_grammar: ['gn2-00249', 'gn2-00246'], see_also_vocab: [],
  confusion_pairs: ['gn2-00249', 'gn2-00246', 'gn2-00247'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00249', level: 'n2', pattern: '〜ぎみ',
  reading: '〜gimi',
  meaning: 'sedikit ... / agak ... (penulisan hiragana dari 気味, lebih kasual)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N + ぎみ',
  desc: '<b>〜ぎみ</b> adalah varian penulisan hiragana dari 〜気味だ (gn2-00248). Memiliki makna yang sama — menyatakan kondisi sedikit mengarah ke hal negatif. Sering dipakai saat digunakan sebagai modifier sebelum nomina atau dalam teks informal.',
  nuance: 'Secara gramatikal dan semantik identik dengan 気味だ — perbedaannya hanya pada ortografi. Penulisan hiragana ぎみ lebih sering muncul dalam pesan teks, chat, atau penulisan kasual. Dalam tulisan formal atau dokumen resmi, lebih diutamakan 気味. Sebagai modifier: 疲れぎみの体 (tubuh yang agak kelelahan).',
  examples: [
    { jp: '今日はちょっと体調が悪<b>ぎみ</b>で…。', id: 'Hari ini kondisi badan agak kurang baik...' },
    { jp: '最近、遅刻<b>ぎみ</b>だから気をつけないと。', id: 'Belakangan ini agak sering terlambat, harus lebih hati-hati.' },
  ],
  see_also_grammar: ['gn2-00248'], see_also_vocab: [],
  confusion_pairs: ['gn2-00248'],
  register: null, exceptions: null, notes: 'Identik dengan 気味だ — perbedaan hanya pada penulisan (kanji vs hiragana).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00250', level: 'n2', pattern: '〜向きだ / 〜向け',
  reading: '〜muki da / 〜muke',
  meaning: 'cocok untuk ... / ditujukan untuk ... / sesuai bagi ...',
  cat: 'predicate-adjective',
  connection: 'N + 向きだ / N + 向け + (N)',
  desc: '<b>〜向きだ</b> menyatakan bahwa sesuatu cocok atau sesuai untuk kondisi/orang tertentu secara alami berdasarkan karakteristiknya. <b>〜向け</b> menyatakan bahwa sesuatu sengaja dibuat atau dirancang untuk kelompok atau tujuan tertentu.',
  nuance: '向きだ vs 向け: 向きだ (cocok secara alami/karakteristik) vs 向け (sengaja dibuat/dirancang untuk). Contoh: この仕事は彼向きだ (pekerjaan ini secara karakter cocok untuknya) vs 子供向けの本 (buku yang memang dibuat untuk anak-anak). Perhatian: 向き juga bermakna "menghadap ke arah tertentu" (東向き = menghadap timur) — beda konteks, beda makna.',
  examples: [
    { jp: 'この映画は子供<b>向け</b>に作られている。', id: 'Film ini dibuat dan ditujukan untuk anak-anak.' },
    { jp: '細かい作業が好きな人<b>向きだ</b>と思います。', id: 'Menurutku ini cocok untuk orang yang suka pekerjaan yang membutuhkan ketelitian.' },
  ],
  see_also_grammar: ['gn2-00245', 'gn2-00246'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: '向き juga bermakna "arah menghadap" (東向き = menghadap timur) dalam konteks berbeda.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00303', level: 'n2', pattern: '〜もの(だ)',
  reading: '〜mono (da)',
  meaning: 'hal yang ..., sesuatu yang ... (sifat alami; nominalisasi dengan nuansa kebenaran umum)',
  cat: 'nominalization',
  connection: 'V-plain / Adj-plain + もの(だ)',
  desc: '<b>〜もの(だ)</b> sebagai pola nominalisasi/ekspresi dipakai untuk menyatakan bahwa sesuatu pada dasarnya atau secara alami seperti itu — sering menyatakan kebenaran umum, keniscayaan, atau sifat alamiah dari sesuatu. Juga dipakai untuk menyatakan kenangan atau kebiasaan masa lalu dengan nada nostalgia (〜たものだ = dulu biasanya...).',
  nuance: '〜もの mempunyai beberapa penggunaan yang perlu dibedakan: (1) kebenaran umum/sifat alami: 人間は間違えるものだ (manusia itu pada dasarnya bisa salah); (2) kenangan/nostalgia: 昔はよく遊んだものだ (dulu sering bermain); (3) nominalisasi: 私が欲しいものは自由だ (yang aku inginkan adalah kebebasan). Berbeda dari 〜こと (nominalisasi faktual/netral), 〜もの lebih bermuatan emosional atau menyatakan sifat esensial. Lihat juga 〜ところ (gn2-00304) untuk penggunaan temporal.',
  examples: [
    { jp: '友達というのは困ったときに助けてくれる<b>もの</b>だ。', id: 'Teman itu pada dasarnya adalah orang yang menolong kamu di saat susah — begitulah adanya.' },
    { jp: '子供の頃、よく川で遊んだ<b>もの</b>だ。', id: 'Waktu kecil, dulu sering bermain di sungai.' },
  ],
  see_also_grammar: ['gn2-00304', 'gn2-00306'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00304'],
  register: null, exceptions: null,
  notes: '〜もの (nomina fisik: "benda") vs 〜もの (gramatikal: "hal yang") — dibedakan dari konteks kalimat.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── PARTICLES (10) ───────────────────────────────────

{
  id: 'gn2-00199',
  level: 'n2',
  pattern: '〜を除いて',
  reading: '~wo nozoite',
  meaning: 'kecuali ..., tidak termasuk ...',
  cat: 'particle',
  connection: 'N + を除いて / を除く + N / を除いては',
  desc: '<b>〜を除いて</b> menyatakan pengecualian — bahwa sesuatu tidak termasuk dalam cakupan pernyataan yang dibuat. Digunakan untuk mengecualikan satu atau beberapa hal dari suatu kelompok atau kondisi umum. Bentuk 〜を除く digunakan sebelum kata benda sebagai modifier.',
  nuance: 'Berbeda dengan 〜以外は yang juga bermakna "selain dari", 〜を除いて lebih formal dan eksplisit dalam menyatakan pengecualian. 〜以外は lebih umum dalam percakapan sehari-hari. Dalam konteks hukum atau tulisan resmi, 〜を除き adalah bentuk yang paling sering digunakan.',
  examples: [
    { jp: '緊急時<b>を除いて</b>、携帯電話の使用は禁止です。', id: 'Kecuali dalam keadaan darurat, penggunaan ponsel dilarang.' },
    { jp: '彼<b>を除いて</b>、全員が賛成した。', id: 'Kecuali dia, semua orang setuju.' },
    { jp: '週末<b>を除く</b>日は開館しています。', id: 'Buka pada hari-hari selain akhir pekan.' },
  ],
  see_also_grammar: ['gn2-00200'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: '書き言葉・法律文では〜を除き が使われる',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00214',
  level: 'n2',
  pattern: '〜を通じて / 〜を通して',
  reading: '~wo tsuujite / ~wo tooshite',
  meaning: 'melalui ..., lewat ...',
  cat: 'particle',
  connection: 'N + を通じて / を通して',
  desc: '<b>〜を通じて / 〜を通して</b> menyatakan bahwa sesuatu terjadi, dicapai, atau disampaikan melalui suatu media, perantara, atau jangka waktu. Keduanya sering dapat dipertukarkan, namun dengan perbedaan nuansa kecil. Juga bisa berarti "sepanjang" dalam konteks waktu.',
  nuance: '〜を通じて lebih sering digunakan ketika ada perantara (orang, organisasi, media komunikasi). 〜を通して lebih sering digunakan untuk medium atau proses pengalaman langsung, dan untuk makna temporal "sepanjang" (例: 一年を通して). Dalam banyak kasus keduanya dapat dipertukarkan.',
  examples: [
    { jp: '友人<b>を通じて</b>、仕事の紹介を受けた。', id: 'Melalui seorang teman, saya mendapat referensi pekerjaan.' },
    { jp: '経験<b>を通して</b>、多くのことを学んだ。', id: 'Melalui pengalaman, saya belajar banyak hal.' },
    { jp: '一年<b>を通じて</b>、安定した気候が続く。', id: 'Sepanjang tahun, iklimnya tetap stabil.' },
  ],
  see_also_grammar: ['gn2-00215'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '〜を通じて は仲介者あり、〜を通して は媒体・経験・期間に多い。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00261', level: 'n2', pattern: '〜をめぐる',
  reading: '〜wo meguru',
  meaning: 'seputar ..., yang berkaitan dengan ...',
  cat: 'particle',
  connection: 'N + をめぐる + N / N + をめぐって',
  desc: '<b>〜をめぐる</b> digunakan sebagai prenominal modifier untuk menyatakan bahwa sesuatu "berkisar pada" isu/topik yang menjadi pusat perhatian atau perdebatan. Kata 巡る secara harfiah berarti "berputar mengelilingi", dan dalam ekspresi ini menyiratkan berbagai pihak atau aspek yang melingkupi satu isu kompleks.',
  nuance: 'をめぐる vs に関する (gn2-00262): をめぐる mengimplikasikan adanya dinamika, konflik, atau berbagai perspektif "mengelilingi" topik tersebut — paling cocok untuk isu seperti 争い (pertikaian), 議論 (perdebatan), 問題 (masalah). に関する lebih netral dan hanya berarti "berkaitan dengan", cocok untuk topik informasional.',
  examples: [
    { jp: '領土問題<b>をめぐる</b>交渉が続いている。', id: 'Negosiasi seputar masalah wilayah terus berlangsung.' },
    { jp: '遺産<b>をめぐる</b>争いが家族を分断した。', id: 'Pertikaian seputar warisan memecah belah keluarga.' },
  ],
  see_also_grammar: ['gn2-00262', 'gn2-00263', 'gn2-00264'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00262', 'gn2-00263'],
  register: null,
  exceptions: null,
  notes: 'をめぐって juga digunakan sebagai bentuk adverbial (〜をめぐって議論する).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00262', level: 'n2', pattern: '〜に関する',
  reading: '〜ni kansuru',
  meaning: 'mengenai ..., berkaitan dengan ...',
  cat: 'particle',
  connection: 'N + に関する + N',
  desc: '<b>〜に関する</b> berfungsi sebagai prenominal modifier yang menyatakan bahwa sesuatu "berhubungan dengan" atau "berkenaan dengan" topik tertentu. Digunakan dalam register formal dan tulisan resmi. Selalu diikuti nomina.',
  nuance: 'に関する (prenominal) vs に関して (gn2-00263, adverbial): に関する digunakan sebelum nomina (〜に関する情報), sementara に関して digunakan sebelum predikat (〜に関して説明する). Keduanya lebih formal dari について (gn2-00264). をめぐる (gn2-00261) berbeda karena menyiratkan konflik/kompleksitas; に関する bersifat netral.',
  examples: [
    { jp: '環境問題<b>に関する</b>報告書が発表された。', id: 'Laporan mengenai masalah lingkungan telah dipublikasikan.' },
    { jp: '個人情報<b>に関する</b>法律が改正された。', id: 'Undang-undang berkaitan dengan informasi pribadi telah direvisi.' },
  ],
  see_also_grammar: ['gn2-00261', 'gn2-00263', 'gn2-00264'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00263', 'gn2-00264', 'gn2-00261'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00263', level: 'n2', pattern: '〜に関して',
  reading: '〜ni kanshite',
  meaning: 'mengenai ..., tentang ...',
  cat: 'particle',
  connection: 'N + に関して',
  desc: '<b>〜に関して</b> menyatakan topik atau hal yang dibicarakan/dibahas. Berfungsi sebagai frasa adverbial (sebelum predikat). Digunakan dalam register formal hingga semi-formal, lebih umum dalam tulisan dibanding percakapan.',
  nuance: 'に関して vs に関する (gn2-00262): に関して adalah bentuk adverbial (〜に関して話す), sementara に関する adalah prenominal modifier (〜に関する資料). Keduanya setara dalam tingkat formalitasnya. について (gn2-00264) lebih ringan dan cocok untuk percakapan maupun tulisan; に関して terasa lebih resmi dan akademis.',
  examples: [
    { jp: '今回のプロジェクト<b>に関して</b>、いくつか質問があります。', id: 'Mengenai proyek kali ini, ada beberapa pertanyaan yang ingin saya sampaikan.' },
    { jp: '試験の結果<b>に関して</b>は、来週お知らせします。', id: 'Mengenai hasil ujian, akan kami sampaikan minggu depan.' },
  ],
  see_also_grammar: ['gn2-00261', 'gn2-00262', 'gn2-00264'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00262', 'gn2-00264', 'gn2-00261'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00264', level: 'n2', pattern: '〜について',
  reading: '〜ni tsuite',
  meaning: 'tentang ..., mengenai ... (paling umum)',
  cat: 'particle',
  connection: 'N + について / N + についての + N',
  desc: '<b>〜について</b> adalah partikel paling umum dan netral untuk menyatakan topik yang dibicarakan atau dipikirkan. Dapat digunakan dalam percakapan sehari-hari maupun tulisan formal. Bentuk についての digunakan sebagai prenominal modifier.',
  nuance: 'について adalah pilihan paling netral dan paling sering digunakan dalam semua register. に関して (gn2-00263) dan に関する (gn2-00262) lebih formal. についての mirip に関する sebagai prenominal modifier, tetapi に関する terasa lebih resmi. について tidak cocok saat ada nuansa "konflik" atau "perdebatan" — dalam konteks itu, をめぐる (gn2-00261) lebih tepat.',
  examples: [
    { jp: '日本の文化<b>について</b>もっと知りたいです。', id: 'Saya ingin tahu lebih banyak tentang budaya Jepang.' },
    { jp: '来月の旅行<b>について</b>、計画を立てましょう。', id: 'Ayo buat rencana mengenai perjalanan bulan depan.' },
  ],
  see_also_grammar: ['gn2-00262', 'gn2-00263', 'gn2-00265', 'gn2-00266'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00262', 'gn2-00263', 'gn2-00266', 'gn2-00265'],
  register: null,
  exceptions: null,
  notes: 'Bentuk についての digunakan sebagai prenominal modifier: 日本についての本 (buku tentang Jepang).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00265', level: 'n2', pattern: '〜に対する',
  reading: '〜ni taisuru',
  meaning: 'terhadap ..., untuk ...',
  cat: 'particle',
  connection: 'N + に対する + N',
  desc: '<b>〜に対する</b> digunakan sebagai prenominal modifier untuk menyatakan arah atau target suatu tindakan, perasaan, atau sikap. Menunjukkan relasi "terhadap" sesuatu yang menjadi objek dari respons atau tindakan tertentu.',
  nuance: 'に対する (prenominal) vs に対して (gn2-00266, adverbial): に対する digunakan sebelum nomina (〜に対する態度), sementara に対して digunakan sebelum predikat (〜に対して批判する). に対する berbeda dari について (gn2-00264): について menyatakan "topik pembicaraan", sedangkan に対する menyatakan "target/arah dari sikap atau tindakan".',
  examples: [
    { jp: '彼の意見<b>に対する</b>反論を述べた。', id: 'Saya menyampaikan sanggahan terhadap pendapatnya.' },
    { jp: '社員<b>に対する</b>評価制度が見直された。', id: 'Sistem penilaian terhadap karyawan telah ditinjau ulang.' },
  ],
  see_also_grammar: ['gn2-00264', 'gn2-00266'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00264', 'gn2-00266'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00266', level: 'n2', pattern: '〜に対して',
  reading: '〜ni taishite',
  meaning: 'terhadap ..., kepada ...',
  cat: 'particle',
  connection: 'N + に対して',
  desc: '<b>〜に対して</b> adalah bentuk adverbial yang menyatakan arah atau target tindakan, sikap, atau perasaan. Selain menunjukkan target, に対して juga sering digunakan untuk kontras antara dua pihak atau situasi: "dibandingkan dengan A, B...".',
  nuance: 'に対して vs に対する (gn2-00265): に対して adalah bentuk adverbial (sebelum predikat), sementara に対する adalah prenominal modifier. Selain menunjukkan target, に対して memiliki fungsi kontrastif (〜に対して、一方で...) yang tidak dimiliki について (gn2-00264). に対して menyiratkan ada reaksi atau sikap yang diarahkan ke sesuatu, bukan sekadar "topik pembicaraan".',
  examples: [
    { jp: '先生の指導<b>に対して</b>、感謝の気持ちを伝えた。', id: 'Saya menyampaikan rasa terima kasih terhadap bimbingan dari sensei.' },
    { jp: '日本語が難しい<b>に対して</b>、英語は比較的簡単だと思う。', id: 'Berbanding dengan bahasa Jepang yang sulit, bahasa Inggris menurutku relatif mudah.' },
  ],
  see_also_grammar: ['gn2-00264', 'gn2-00265'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00265', 'gn2-00264'],
  register: null,
  exceptions: null,
  notes: 'に対して juga digunakan untuk menyatakan kontras antara dua pihak/situasi.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00267', level: 'n2', pattern: '〜をもとにした',
  reading: '〜wo moto ni shita',
  meaning: 'yang berdasarkan pada ..., bersumber dari ...',
  cat: 'particle',
  connection: 'N + をもとに / N + をもとにした + N',
  desc: '<b>〜をもとにした</b> menyatakan bahwa sesuatu dibuat, dikembangkan, atau dibentuk berdasarkan N yang menjadi fondasi atau sumber. Bentuk をもとに digunakan sebagai adverbial; をもとにした sebagai prenominal modifier.',
  nuance: 'をもとに(した) vs に基づく (gn2-00268): をもとに menekankan bahwa N adalah bahan dasar atau sumber yang diolah (seperti "bahan mentah" yang diproses menjadi sesuatu). に基づく menekankan kesesuaian atau kepatuhan terhadap standar, aturan, atau prinsip yang ada. Contoh: 事実をもとにした話 (terinspirasi dari fakta) vs 事実に基づいた話 (mengikuti fakta secara ketat).',
  examples: [
    { jp: 'この映画は実話<b>をもとにした</b>作品だ。', id: 'Film ini adalah karya yang berdasarkan kisah nyata.' },
    { jp: '彼女の経験<b>をもとに</b>、マニュアルが作られた。', id: 'Berdasarkan pengalaman dia, buku panduan dibuat.' },
  ],
  see_also_grammar: ['gn2-00268', 'gn2-00269'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00268'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00268', level: 'n2', pattern: '〜に基づいた',
  reading: '〜ni motozuita',
  meaning: 'yang berlandaskan ..., berdasarkan ...',
  cat: 'particle',
  connection: 'N + に基づいた + N / N + に基づいて',
  desc: '<b>〜に基づいた</b> menyatakan bahwa sesuatu dilakukan, dibuat, atau diputuskan sesuai dengan N yang menjadi dasar, standar, atau prinsip. Menekankan kepatuhan atau kesesuaian dengan landasan yang ada. Bentuk に基づいて digunakan sebagai adverbial.',
  nuance: 'に基づく vs をもとに (gn2-00267): に基づく mengimplikasikan kepatuhan terhadap standar atau aturan yang sudah ada (landasan resmi/normatif). をもとに lebih bebas — hanya menunjukkan bahwa sesuatu "terinspirasi dari" atau "menggunakan N sebagai bahan". Contoh: 法律に基づいた判断 (keputusan mengikuti hukum) vs 経験をもとにした判断 (keputusan berdasarkan pengalaman).',
  examples: [
    { jp: 'この政策はデータ<b>に基づいた</b>判断で決まった。', id: 'Kebijakan ini diputuskan berdasarkan penilaian yang berlandaskan data.' },
    { jp: '規則<b>に基づいて</b>行動することが大切だ。', id: 'Bertindak berdasarkan aturan adalah hal yang penting.' },
  ],
  see_also_grammar: ['gn2-00267', 'gn2-00269'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00267', 'gn2-00269', 'gn2-00280'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── EXPRESSIONS (28) ───────────────────────────────────

{
  id: 'gn2-00138', level: 'n2', pattern: '〜を通じて',
  reading: '〜wo tsuujite',
  meaning: 'melalui ..., lewat ..., sepanjang ...',
  cat: 'expression',
  connection: 'N + を通じて / N + を通して',
  desc: '<b>〜を通じて</b> memiliki dua makna utama: (1) melalui suatu perantara atau media, dan (2) sepanjang suatu periode waktu. Bentuk を通して lebih umum digunakan untuk makna perantara/media.',
  nuance: 'を通じて dan を通して sering dapat saling menggantikan, namun を通じて cenderung lebih formal dan lebih sering digunakan untuk makna "sepanjang waktu" (一年を通じて), sedangkan を通して lebih umum untuk makna "melalui perantara". Berbeda dari によって yang menyatakan cara/sebab.',
  examples: [
    { jp: 'SNS<b>を通じて</b>、世界中の人とつながることができる。', id: 'Melalui media sosial, kita bisa terhubung dengan orang-orang di seluruh dunia.' },
    { jp: '一年<b>を通じて</b>、この地域は温暖な気候が続く。', id: 'Sepanjang tahun, daerah ini memiliki iklim yang hangat.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00140', level: 'n2', pattern: '〜を中心に',
  reading: '〜wo chuushin ni',
  meaning: 'berpusat pada ..., dengan ... sebagai inti / fokus utama',
  cat: 'expression',
  connection: 'N + を中心に / N + を中心として',
  desc: '<b>〜を中心に</b> menyatakan bahwa sesuatu berfokus pada, berkisar pada, atau tersusun di sekitar suatu hal atau orang tertentu sebagai inti. Digunakan untuk distribusi, aktivitas, maupun organisasi.',
  nuance: 'を中心として lebih formal dibandingkan を中心に. Keduanya dapat digunakan untuk lokasi fisik (駅を中心に = berpusat di stasiun), orang (彼を中心に = dengan dia sebagai tokoh utama), atau topik (この問題を中心に = berpusat pada masalah ini).',
  examples: [
    { jp: '駅<b>を中心に</b>、新しいショッピングモールが建設される。', id: 'Pusat perbelanjaan baru akan dibangun dengan berpusat di sekitar stasiun.' },
    { jp: '若者<b>を中心に</b>、このアプリが人気を集めている。', id: 'Aplikasi ini tengah populer dengan kalangan anak muda sebagai penggunanya yang utama.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00141', level: 'n2', pattern: '〜をめぐって',
  reading: '〜wo megutte',
  meaning: 'seputar ..., berkenaan dengan (isu yang diperdebatkan) ...',
  cat: 'expression',
  connection: 'N + をめぐって / N + をめぐる + N',
  desc: '<b>〜をめぐって</b> menyatakan bahwa berbagai pihak berdiskusi, berkonflik, atau beradu pendapat seputar suatu isu atau topik tertentu. Menyiratkan adanya kontroversi, perdebatan, atau kompetisi.',
  nuance: 'Berbeda dari について (tentang, netral) — をめぐって secara implisit menyiratkan adanya perselisihan, kompetisi, atau isu yang diperdebatkan. Tidak tepat digunakan untuk percakapan biasa yang tidak mengandung konflik.',
  examples: [
    { jp: '領土問題<b>をめぐって</b>、両国間の交渉が続いている。', id: 'Negosiasi antara kedua negara terus berlangsung seputar masalah wilayah.' },
    { jp: '遺産<b>をめぐる</b>争いが家族を分裂させた。', id: 'Pertikaian seputar warisan memecah belah keluarga tersebut.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00148', level: 'n2', pattern: '〜に他ならない',
  reading: '〜ni hoka naranai',
  meaning: 'tidak lain adalah ..., memang itulah ..., sesungguhnya adalah ...',
  cat: 'expression',
  connection: 'N + に他ならない / V-plain + からに他ならない',
  desc: '<b>〜に他ならない</b> menyatakan secara tegas bahwa sesuatu adalah persis hal yang disebutkan — tidak ada penjelasan atau identitas lain. Digunakan untuk menegaskan suatu identitas, alasan, atau esensi.',
  nuance: 'Berlawanan nuansa dengan に過ぎない (hanyalah, merendahkan) — に他ならない bersifat afirmatif dan penuh keyakinan: "tidak ada yang lain, inilah tepatnya". Sering muncul dalam argumen, tulisan opini, atau ucapan yang penuh penekanan.',
  examples: [
    { jp: '彼が成功したのは、努力の結果<b>に他ならない</b>。', id: 'Keberhasilannya tidak lain adalah buah dari kerja kerasnya.' },
    { jp: 'これこそ本物のもてなし<b>に他ならない</b>。', id: 'Inilah yang sesungguhnya disebut keramahan yang tulus.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00147'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00150', level: 'n2', pattern: '〜というものだ',
  reading: '〜to iu mono da',
  meaning: 'itulah yang namanya ..., begitulah seharusnya ..., hakikatnya memang ...',
  cat: 'expression',
  connection: 'Clause + というものだ',
  desc: '<b>〜というものだ</b> digunakan untuk menyatakan penilaian atau definisi tentang apa yang seharusnya atau apa yang hakikatnya benar — biasanya bernada evaluatif, bijaksana, atau menegaskan suatu kebenaran umum.',
  nuance: 'Berbeda dari というものではない (yang menyangkal cara yang salah) — というものだ bersifat afirmatif, menegaskan "inilah yang disebut X yang sebenarnya" atau "begitulah seharusnya". Sering bernada agak menggurui atau filosofis.',
  examples: [
    { jp: '困っている人を助けるのが、本当の友情<b>というものだ</b>。', id: 'Menolong orang yang kesulitan, itulah yang namanya persahabatan sejati.' },
    { jp: '失敗を恐れずに挑戦するのが、若さ<b>というものだ</b>。', id: 'Berani mencoba tanpa takut gagal — itulah hakikat dari masa muda.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00151', level: 'n2', pattern: '〜ということになる',
  reading: '〜to iu koto ni naru',
  meaning: 'artinya ..., berarti ..., kesimpulannya adalah ...',
  cat: 'expression',
  connection: 'Clause + ということになる',
  desc: '<b>〜ということになる</b> digunakan untuk menarik kesimpulan atau konsekuensi logis dari premis yang telah disebutkan. Menyatakan bahwa jika kondisi A benar, maka secara logis hal B mengikutinya.',
  nuance: 'Berbeda dari ということになっている (gn2-00129, konvensi/aturan yang berlaku) — ということになる menekankan proses berpikir logis dan penarikan kesimpulan. "Jika begitu... maka artinya...". Sering digunakan dalam argumen, diskusi, atau penjelasan.',
  examples: [
    { jp: '彼が来ないなら、会議は中止だ<b>ということになる</b>。', id: 'Kalau dia tidak datang, artinya rapat akan dibatalkan.' },
    { jp: 'このデータが正しければ、計画は見直しが必要だ<b>ということになる</b>。', id: 'Jika data ini benar, berarti rencana perlu ditinjau ulang.' }
  ],
  see_also_grammar: ['gn2-00129'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00129'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00175', level: 'n2', pattern: '〜ものだ',
  reading: '〜mono da',
  meaning: 'memang begitulah ... (kebenaran umum) / dulu sering ... (kenangan) / sungguh ingin ... (keinginan kuat)',
  cat: 'expression',
  connection: 'V-plain + ものだ / い-Adj-plain + ものだ / V-た + ものだ (kenangan) / V-たい + ものだ (keinginan)',
  desc: '<b>〜ものだ</b> memiliki tiga penggunaan utama: (1) menyatakan kebenaran umum atau norma (子供は元気なものだ); (2) mengungkapkan kenangan masa lalu dengan nostalgia (よく遊んだものだ); (3) mengungkapkan keinginan atau harapan yang kuat (〜たいものだ).',
  nuance: 'Berbeda dari というものだ (menegaskan esensi/hakikat sesuatu) — ものだ lebih beragam penggunaannya. Konteks menentukan makna: bentuk た untuk kenangan, bentuk たい untuk keinginan, dan bentuk present untuk norma. Perhatikan konteksnya dengan cermat.',
  examples: [
    { jp: '人生というのは、思い通りにいかない<b>ものだ</b>。', id: 'Memang begitulah hidup — tidak selalu berjalan sesuai keinginan.' },
    { jp: '子どものころ、よくこの公園で遊んだ<b>ものだ</b>。', id: 'Waktu kecil dulu, sering sekali bermain di taman ini.' }
  ],
  see_also_grammar: ['gn2-00176'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00176'],
  register: null, exceptions: null,
  notes: 'Tiga fungsi: (1) norma umum (plain+ものだ), (2) kenangan (た+ものだ), (3) keinginan (たい+ものだ).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00190', level: 'n2', pattern: '〜ものがある',
  reading: '〜mono ga aru',
  meaning: 'ada sesuatu yang ..., memiliki kualitas yang ..., terasa ada sesuatu yang ...',
  cat: 'expression',
  connection: 'V-plain + ものがある / い-Adj-plain + ものがある',
  desc: '<b>〜ものがある</b> mengungkapkan bahwa penutur merasakan adanya kualitas, kedalaman, atau daya tarik tertentu yang sulit didefinisikan secara tepat — namun nyata dan berkesan. Digunakan saat ingin mengakui sesuatu yang bernilai atau berkesan tanpa kata-kata yang tepat.',
  nuance: 'Berbeda dari だ/である (pernyataan faktual) — ものがある menambahkan nuansa subjektif dan evaluatif: "ada sesuatu (yang bermakna/dalam) dalam hal ini". Sering digunakan untuk memuji karya seni, kemampuan seseorang, atau pengalaman yang mengesankan. Tidak digunakan untuk pernyataan negatif.',
  examples: [
    { jp: '彼の演技には、胸を打つ<b>ものがある</b>。', id: 'Dalam aktingnya, ada sesuatu yang benar-benar menyentuh hati.' },
    { jp: 'あの映画の映像美には、見る者を引き込む<b>ものがある</b>。', id: 'Dalam keindahan visual film itu, ada sesuatu yang menarik penonton masuk ke dalamnya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00195',
  level: 'n2',
  pattern: '〜に応じて',
  reading: '~ni oujite',
  meaning: 'sesuai dengan ..., bergantung pada ...',
  cat: 'expression',
  connection: 'N + に応じて / に応じた + N',
  desc: '<b>〜に応じて</b> menyatakan bahwa suatu tindakan, keputusan, atau kondisi disesuaikan atau direspons berdasarkan situasi, kebutuhan, atau permintaan tertentu. Mengandung makna fleksibilitas — bahwa sesuatu bervariasi atau beradaptasi sesuai kondisi yang ada.',
  nuance: 'Berbeda dengan 〜に従って (mengikuti aturan/instruksi secara patuh), 〜に応じて lebih menekankan respons atau adaptasi terhadap kondisi yang beragam. Berbeda juga dengan 〜によって (tergantung pada, sering untuk perbedaan pasif), 〜に応じて mengandung unsur respons aktif.',
  examples: [
    { jp: '能力<b>に応じて</b>、仕事を割り当てる。', id: 'Pekerjaan dibagi sesuai dengan kemampuan masing-masing.' },
    { jp: '要望<b>に応じて</b>、プランを変更できます。', id: 'Rencana dapat diubah sesuai dengan permintaan Anda.' },
    { jp: '状況<b>に応じた</b>対応が必要だ。', id: 'Diperlukan respons yang sesuai dengan situasi.' },
  ],
  see_also_grammar: ['gn2-00196'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00196',
  level: 'n2',
  pattern: '〜に沿って',
  reading: '~ni sotte',
  meaning: 'mengikuti ..., sepanjang ..., sesuai dengan ...',
  cat: 'expression',
  connection: 'N + に沿って / に沿った + N',
  desc: '<b>〜に沿って</b> memiliki dua makna: (1) secara fisik, bergerak atau membentang sepanjang sesuatu (jalan, sungai, pantai); (2) secara abstrak, bertindak sesuai dengan pedoman, kebijakan, rencana, atau keinginan tertentu. Keduanya mengandung makna "mengikuti jalur" sesuatu.',
  nuance: 'Dibandingkan 〜に従って yang menekankan kepatuhan terhadap instruksi atau aturan (ada otoritas yang dipatuhi), 〜に沿って lebih menekankan keselarasan dengan arah atau garis panduan tanpa harus ada perintah formal. Cocok digunakan ketika mengikuti suatu rencana, visi, atau permintaan seseorang.',
  examples: [
    { jp: '川<b>に沿って</b>、散歩した。', id: 'Saya berjalan-jalan mengikuti tepian sungai.' },
    { jp: '計画<b>に沿って</b>、プロジェクトを進める。', id: 'Proyek dilaksanakan sesuai dengan rencana yang ada.' },
    { jp: '顧客のニーズ<b>に沿った</b>サービスを提供する。', id: 'Memberikan layanan yang sesuai dengan kebutuhan pelanggan.' },
  ],
  see_also_grammar: ['gn2-00195'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00197',
  level: 'n2',
  pattern: '〜を前提に',
  reading: '~wo zentei ni',
  meaning: 'dengan asumsi ..., dengan syarat (yang sudah diterima) ...',
  cat: 'expression',
  connection: 'N + を前提に(して) / V-plain + ことを前提に',
  desc: '<b>〜を前提に</b> menyatakan bahwa suatu tindakan atau keputusan diambil dengan menganggap sesuatu sebagai hal yang sudah pasti, sudah disepakati, atau sudah diterima sebagai dasar. Berbeda dari syarat yang masih bersifat kondisional, "前提" (zentei) adalah asumsi dasar yang tidak dipertanyakan lagi.',
  nuance: 'Berbeda dengan 〜を条件に (gn2-00198) yang menyatakan syarat yang harus dipenuhi, 〜を前提に menyatakan asumsi yang sudah dianggap berlaku. Contoh: "結婚を前提に付き合う" (berpacaran dengan asumsi akan menikah) vs "結婚を条件に付き合う" (berpacaran dengan syarat harus menikah — lebih keras).',
  examples: [
    { jp: '結婚<b>を前提に</b>、お付き合いしたい。', id: 'Saya ingin menjalin hubungan dengan asumsi (menuju) pernikahan.' },
    { jp: '採用<b>を前提に</b>、研修を行う。', id: 'Pelatihan dilaksanakan dengan asumsi akan ada penerimaan kerja.' },
    { jp: '長期使用<b>を前提に</b>した設計になっている。', id: 'Dirancang dengan asumsi penggunaan jangka panjang.' },
  ],
  see_also_grammar: ['gn2-00198'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00201',
  level: 'n2',
  pattern: '〜ならではの',
  reading: '~nara dewa no',
  meaning: 'khas ..., hanya bisa ada di/dari ...',
  cat: 'expression',
  connection: 'N + ならではの + N / N + ならでは',
  desc: '<b>〜ならではの</b> menyatakan bahwa sesuatu hanya bisa ditemukan, terjadi, atau dirasakan berkat keunikan tertentu dari subjek yang disebutkan. Pola ini menekankan keistimewaan atau ciri khas eksklusif yang tidak dimiliki oleh hal lain. Selalu diikuti kata benda, atau berdiri sendiri sebagai 〜ならでは di akhir klausa.',
  nuance: 'Berbeda dengan 〜だけの atau 〜しかない yang sekadar menyatakan kuantitas terbatas, 〜ならではの mengandung nuansa positif dan penghargaan terhadap keunikan tersebut. Sering digunakan dalam konteks promosi pariwisata, kuliner, budaya, atau keahlian seseorang yang istimewa.',
  examples: [
    { jp: 'これは京都<b>ならではの</b>景色だ。', id: 'Ini adalah pemandangan yang hanya bisa ada di Kyoto.' },
    { jp: '職人<b>ならではの</b>技が光る作品だ。', id: 'Ini adalah karya yang memancarkan keahlian khas seorang pengrajin terampil.' },
    { jp: '手作り<b>ならでは</b>の温かみがある。', id: 'Ada kehangatan yang khas dari buatan tangan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: 'ほぼ常に肯定的ニュアンス。否定表現には使わない。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00202',
  level: 'n2',
  pattern: '〜にほかならない',
  reading: '~ni hoka naranai',
  meaning: 'tidak lain adalah ..., memang ...',
  cat: 'expression',
  connection: 'N + にほかならない / V-plain + ことにほかならない',
  desc: '<b>〜にほかならない</b> menyatakan bahwa sesuatu adalah persis dan tidak lain dari apa yang disebutkan — menegaskan identitas atau penyebab dengan sangat tegas. Secara harfiah berarti "tidak ada yang lain selain ini". Pola ini memberikan penekanan yang kuat dan bersifat definitif.',
  nuance: 'Berbeda dengan 〜に違いない (pasti, berdasarkan dugaan kuat) yang mengandung unsur inferensi dari pihak luar, 〜にほかならない menyatakan fakta yang sudah pasti dari sudut pandang pembicara — sering digunakan untuk menarik kesimpulan logis. Lebih tegas dan formal dari sekadar 〜だ atau 〜です.',
  examples: [
    { jp: 'この成功は、チーム全員の努力<b>にほかならない</b>。', id: 'Keberhasilan ini tidak lain adalah hasil kerja keras seluruh tim.' },
    { jp: '彼の行為は裏切り<b>にほかならない</b>。', id: 'Tindakannya tidak lain adalah pengkhianatan.' },
    { jp: '失敗は成功への第一歩<b>にほかならない</b>。', id: 'Kegagalan tidak lain adalah langkah pertama menuju keberhasilan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00203',
  level: 'n2',
  pattern: '〜ものとする',
  reading: '~mono to suru',
  meaning: 'dianggap sebagai ..., diperlakukan seperti ... (hukum/peraturan)',
  cat: 'expression',
  connection: 'V-plain / N + ものとする',
  desc: '<b>〜ものとする</b> adalah ungkapan formal yang digunakan dalam dokumen hukum, peraturan, kontrak, atau aturan resmi untuk menetapkan suatu hal sebagai ketentuan yang berlaku. Maknanya setara dengan "ditetapkan bahwa" atau "diperlakukan sebagai". Pola ini hampir tidak digunakan dalam percakapan sehari-hari.',
  nuance: 'Berbeda dengan 〜とする yang lebih umum dan bisa digunakan dalam berbagai konteks (termasuk asumsi sementara), 〜ものとする secara khusus digunakan dalam regulasi dan dokumen resmi untuk menetapkan aturan yang mengikat. Jika Anda tidak menulis peraturan, gunakan 〜とする atau 〜にする.',
  examples: [
    { jp: '本規定に反した場合は、契約を無効<b>ものとする</b>。', id: 'Jika melanggar ketentuan ini, kontrak dianggap batal.' },
    { jp: '申請書の提出をもって、同意した<b>ものとする</b>。', id: 'Dengan menyerahkan formulir pendaftaran, dianggap telah menyetujui.' },
    { jp: '未成年者は保護者の同意を得た<b>ものとする</b>。', id: 'Bagi yang di bawah umur, dianggap telah mendapat persetujuan wali.' },
  ],
  see_also_grammar: ['gn2-00204'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '法律・契約書・規則文書専用。日常会話では使わない。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00207',
  level: 'n2',
  pattern: '〜ことが多い',
  reading: '~koto ga ooi',
  meaning: 'seringkali ..., banyak yang ...',
  cat: 'expression',
  connection: 'V-plain + ことが多い / V-plain + ことが多くある',
  desc: '<b>〜ことが多い</b> menyatakan bahwa suatu tindakan atau situasi terjadi dengan frekuensi yang tinggi — sering terjadi atau merupakan hal yang umum. Pola ini digunakan untuk menggeneralisasi kebiasaan, kecenderungan, atau pola yang berulang.',
  nuance: 'Berbeda dari 〜がちだ yang mengandung nuansa negatif atau tidak diinginkan, 〜ことが多い bersifat netral dan sekadar menyatakan frekuensi. Berbeda juga dari 〜よく yang lebih kasual dan biasanya digunakan sebagai adverbia. 〜ことが多い lebih formal dan cocok untuk tulisan deskriptif atau analitis.',
  examples: [
    { jp: '日本では、夕食は家族で食べる<b>ことが多い</b>。', id: 'Di Jepang, makan malam seringkali dilakukan bersama keluarga.' },
    { jp: '初心者はこの部分で間違える<b>ことが多い</b>。', id: 'Para pemula sering melakukan kesalahan di bagian ini.' },
    { jp: '会議は長引く<b>ことが多い</b>。', id: 'Rapat seringkali berlangsung lama.' },
  ],
  see_also_grammar: ['gn2-00208'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00217',
  level: 'n2',
  pattern: '〜の下で / 〜のもとで',
  reading: '~no moto de',
  meaning: 'di bawah ..., di bawah pengaruh/arahan ...',
  cat: 'expression',
  connection: 'N + の下で / のもとで / のもとに',
  desc: '<b>〜の下で / 〜のもとで</b> menyatakan bahwa suatu tindakan atau kondisi berlangsung di bawah kepemimpinan, pengawasan, kondisi, atau pengaruh tertentu. Bisa berarti di bawah otoritas seseorang, di bawah kondisi tertentu (hukum, aturan), atau dalam suasana tertentu.',
  nuance: 'Berbeda dengan 〜によって (karena/oleh), 〜の下で menekankan lingkungan atau kondisi yang melingkupi — bukan penyebabnya. Bentuk 〜のもとに (menggunakan に) lebih formal dan sering digunakan dalam konteks hukum atau deklarasi, sedangkan 〜のもとで lebih umum.',
  examples: [
    { jp: '先生の指導<b>のもとで</b>、研究を進めた。', id: 'Di bawah bimbingan dosen, penelitian dilanjutkan.' },
    { jp: '民主主義<b>の下で</b>、国民の権利が保障される。', id: 'Di bawah demokrasi, hak-hak warga negara dijamin.' },
    { jp: '厳しい条件<b>のもとで</b>、訓練が行われた。', id: 'Latihan dilaksanakan di bawah kondisi yang berat.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: '〜のもとに は法令文や宣言文でよく使われる硬い形。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00233', level: 'n2', pattern: '〜とは',
  reading: '〜to wa',
  meaning: 'sungguh ... / ternyata ... / siapa sangka ... (ekspresi kejutan/emosi)',
  cat: 'expression',
  connection: 'clause / N + とは',
  desc: '<b>〜とは</b> digunakan untuk mengekspresikan rasa terkejut, kagum, atau kecewa terhadap sesuatu yang tidak terduga. Kalimat sering berakhir di とは saja (tanpa predikat lengkap), dengan emosi tersirat.',
  nuance: 'Berbeda dari とは dalam konteks definitif (Xとは Yのことだ — "X adalah Y") — di sini とは berdiri sendiri sebagai ekspresi emosi. Nuansanya bisa positif (kagum) maupun negatif (kecewa, marah). Sering digunakan dalam bahasa tulis atau pidato. Fungsinya mirip dengan まさか atau なんと dalam hal mengekspresikan kejutan.',
  examples: [
    { jp: 'まさかあの人が優勝する<b>とは</b>、驚いた。', id: 'Sungguh mengejutkan, siapa sangka orang itu yang menang.' },
    { jp: '10年ぶりに再会できる<b>とは</b>、夢にも思わなかった。', id: 'Ternyata bisa bertemu kembali setelah 10 tahun, tidak pernah terbayangkan sekalipun.' },
  ],
  see_also_grammar: ['gn2-00234'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'Jangan bingung dengan とは dalam fungsi definitif: Xとは Yのことだ.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00245', level: 'n2', pattern: '〜きらいがある',
  reading: '〜kirai ga aru',
  meaning: 'ada kecenderungan ... / cenderung ... (biasanya negatif)',
  cat: 'expression',
  connection: 'V-dict / N + の + きらいがある',
  desc: '<b>〜きらいがある</b> menyatakan bahwa seseorang atau sesuatu memiliki kecenderungan tertentu yang biasanya dianggap kurang baik. きらい di sini bukan berarti "tidak suka" melainkan bermakna "kecenderungan" yang berasal dari kosakata kuno.',
  nuance: 'Berbeda dari がちだ (gn2-00246) yang lebih konkret dan kasual — きらいがある lebih bersifat evaluatif dan digunakan dalam konteks analitis atau formal. Sering dipakai untuk menilai karakter, kebiasaan, atau sifat suatu kelompok/institusi. Nuansanya lebih "penilaian kritis dari luar."',
  examples: [
    { jp: '彼は物事を大げさに考える<b>きらいがある</b>。', id: 'Dia cenderung melebih-lebihkan segala sesuatu.' },
    { jp: '日本の会議は長引く<b>きらいがある</b>と指摘されている。', id: 'Rapat-rapat di Jepang sering disorot karena cenderung berlarut-larut.' },
  ],
  see_also_grammar: ['gn2-00246'], see_also_vocab: [],
  confusion_pairs: ['gn2-00246'],
  register: null, exceptions: null, notes: 'きらい di sini bukan "tidak suka" — berasal dari kosakata kuno yang bermakna "kecenderungan."',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00270', level: 'n2', pattern: '〜によって異なる',
  reading: '〜ni yotte kotonaru',
  meaning: 'berbeda tergantung pada ..., bervariasi menurut ...',
  cat: 'expression',
  connection: 'N + によって異なる',
  desc: '<b>〜によって異なる</b> menyatakan bahwa suatu hal berubah atau berbeda tergantung pada kondisi atau faktor N. Merupakan ekspresi idiomatik yang sering muncul dalam tulisan formal, penjelasan resmi, syarat layanan, dan dokumen teknis.',
  nuance: 'によって異なる secara eksplisit menyatakan perbedaan/variasi antar kasus. Mirip dengan に応じて (gn2-00276) dan 次第だ (gn2-00272) dalam menyatakan ketergantungan, tetapi によって異なる lebih tegas: hasilnya benar-benar berbeda, bukan hanya "disesuaikan". Lebih formal dan lebih spesifik dari によっては (gn2-00274).',
  examples: [
    { jp: '料金は地域<b>によって異なります</b>。', id: 'Biaya bervariasi tergantung pada wilayahnya.' },
    { jp: '回答は人<b>によって異なる</b>ため、一概には言えない。', id: 'Karena jawabannya berbeda tergantung orangnya, tidak bisa dikatakan secara umum.' },
  ],
  see_also_grammar: ['gn2-00269', 'gn2-00272', 'gn2-00274', 'gn2-00276'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00272', 'gn2-00274', 'gn2-00269'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00272', level: 'n2', pattern: '〜次第だ',
  reading: '〜shidai da',
  meaning: 'tergantung pada ..., bergantung pada ...',
  cat: 'expression',
  connection: 'N + 次第だ',
  desc: '<b>〜次第だ</b> menyatakan bahwa hasil atau situasi sepenuhnya bergantung pada N. N adalah faktor penentu utama. Pola ini juga memiliki penggunaan lain: 〜次第です yang menjelaskan latar belakang/alasan suatu keputusan dalam konteks formal — maknanya berbeda.',
  nuance: '次第だ vs 次第では (gn2-00273): 次第だ menyatakan bahwa sesuatu sepenuhnya ditentukan oleh N (pernyataan penuh). 次第では membuka kemungkinan kondisional ("tergantung bagaimana N-nya, ada kemungkinan..."). Bandingkan juga dengan によっては (gn2-00274) yang bermakna mirip dengan 次第では, tetapi lebih luwes dan lebih umum dipakai.',
  examples: [
    { jp: '合格できるかどうかは努力<b>次第だ</b>。', id: 'Bisa lulus atau tidak sepenuhnya bergantung pada usaha.' },
    { jp: '成功するかどうかはあなた<b>次第です</b>。', id: 'Berhasil atau tidak sepenuhnya tergantung pada Anda.' },
  ],
  see_also_grammar: ['gn2-00271', 'gn2-00273', 'gn2-00274'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00273', 'gn2-00274', 'gn2-00270', 'gn2-00271'],
  register: null,
  exceptions: null,
  notes: '〜次第です (makna berbeda): dipakai dalam konteks formal untuk menjelaskan alasan/latar belakang — bukan bermakna "bergantung pada".',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00273', level: 'n2', pattern: '〜次第では',
  reading: '〜shidai de wa',
  meaning: 'tergantung bagaimana ..., kalau ...nya ...',
  cat: 'expression',
  connection: 'N + 次第では',
  desc: '<b>〜次第では</b> menyatakan kemungkinan kondisional: "tergantung bagaimana N-nya, ada kemungkinan hal tertentu akan terjadi". Kalimat setelahnya biasanya mengungkapkan kemungkinan, konsekuensi, atau tindakan yang mungkin diambil.',
  nuance: '次第では vs 次第だ (gn2-00272): 次第だ = X sepenuhnya ditentukan oleh N (pernyataan total). 次第では = tergantung kondisi N, ada kemungkinan Y (membuka hipotesis kondisional). Bandingkan dengan によっては (gn2-00274): keduanya sangat mirip, tetapi 次第では cenderung dipakai dengan nomina abstrak yang menggambarkan perkembangan situasi (結果、成績、対応), sementara によっては lebih bebas dengan semua jenis nomina.',
  examples: [
    { jp: '結果<b>次第では</b>、計画を変更することもあります。', id: 'Tergantung bagaimana hasilnya, ada kemungkinan rencana akan diubah.' },
    { jp: '状況<b>次第では</b>、キャンセルも検討します。', id: 'Tergantung situasinya, pembatalan pun akan dipertimbangkan.' },
  ],
  see_also_grammar: ['gn2-00271', 'gn2-00272', 'gn2-00274'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00272', 'gn2-00274'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00274', level: 'n2', pattern: '〜によっては',
  reading: '〜ni yotte wa',
  meaning: 'tergantung ..., dalam beberapa kasus ...',
  cat: 'expression',
  connection: 'N + によっては',
  desc: '<b>〜によっては</b> menyatakan bahwa dalam beberapa kasus atau tergantung pada N tertentu, situasinya bisa berbeda. Sering menyiratkan "ada kalanya" atau "untuk sebagian kasus". Lebih luwes dan lebih sering dipakai secara lisan dibanding 次第では.',
  nuance: 'によっては vs 次第では (gn2-00273): keduanya sangat mirip. 次第では cenderung dipakai dengan nomina yang menggambarkan "kondisi yang berkembang" (結果、状況). によっては lebih bebas — bisa dipakai dengan hampir semua nomina: 人によっては、地域によっては、場合によっては (gn2-00275). によっては juga lebih natural dalam percakapan lisan.',
  examples: [
    { jp: '人<b>によっては</b>、この食べ物が苦手な場合もある。', id: 'Tergantung orangnya, ada kalanya orang tidak suka makanan ini.' },
    { jp: '地域<b>によっては</b>、まだ雪が残っている。', id: 'Tergantung wilayahnya, masih ada salju yang tersisa.' },
  ],
  see_also_grammar: ['gn2-00270', 'gn2-00272', 'gn2-00273', 'gn2-00275'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00273', 'gn2-00275', 'gn2-00270', 'gn2-00272'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00275', level: 'n2', pattern: '〜場合によっては',
  reading: '〜baai ni yotte wa',
  meaning: 'tergantung situasinya ..., dalam kondisi tertentu ...',
  cat: 'expression',
  connection: '場合によっては (ekspresi tetap)',
  desc: '<b>〜場合によっては</b> adalah ekspresi tetap yang berarti "tergantung situasinya" atau "dalam kondisi tertentu". Digunakan untuk memperkenalkan kemungkinan yang bergantung pada keadaan — sering mengimplikasikan konsekuensi yang mungkin tidak biasa atau perlu diwaspadai.',
  nuance: '場合によっては adalah bentuk khusus dari によっては (gn2-00274) di mana 場合 (situasi/kondisi) sudah tertanam dalam ekspresi. Berbeda dari によっては yang mengisi N dengan nomina spesifik (人、地域), 場合によっては adalah frasa tetap yang berfungsi mandiri. Nada yang ditimbulkan lebih situasional dan sering dipakai untuk memperingatkan kemungkinan konsekuensi yang tidak terduga.',
  examples: [
    { jp: '<b>場合によっては</b>、手術が必要になることもあります。', id: 'Tergantung situasinya, ada kalanya operasi bisa jadi diperlukan.' },
    { jp: '<b>場合によっては</b>、ご連絡が遅れる場合がございます。', id: 'Tergantung kondisi, mungkin ada keterlambatan dalam menghubungi Anda.' },
  ],
  see_also_grammar: ['gn2-00273', 'gn2-00274'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00274'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00276', level: 'n2', pattern: '〜に応じて',
  reading: '〜ni oujite',
  meaning: 'sesuai dengan ..., tergantung pada ...',
  cat: 'expression',
  connection: 'N + に応じて / N + に応じた + N',
  desc: '<b>〜に応じて</b> menyatakan bahwa sesuatu dilakukan atau berubah sesuai dengan kondisi, permintaan, atau keadaan N. Menekankan respons atau penyesuaian yang proporsional terhadap N — tindakan mengikuti/menyesuaikan diri dengan keadaan yang ada.',
  nuance: 'に応じて vs に従って (gn2-00277): に応じて menyiratkan respons aktif terhadap kondisi yang berubah-ubah (flexible response). に従って lebih menekankan "mematuhi" aturan atau prosedur yang sudah ditetapkan. に沿って (gn2-00278) menekankan "sejalan dengan rencana atau garis". に応じて lebih natural ketika kondisi N berupa kebutuhan, permintaan, atau kemampuan yang bervariasi.',
  examples: [
    { jp: '能力<b>に応じて</b>、仕事を担当してもらいます。', id: 'Pekerjaan akan ditugaskan sesuai dengan kemampuan masing-masing.' },
    { jp: '状況<b>に応じた</b>対応が求められる。', id: 'Diperlukan penanganan yang sesuai dengan situasi.' },
  ],
  see_also_grammar: ['gn2-00270', 'gn2-00277', 'gn2-00278'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00277', 'gn2-00278'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00277', level: 'n2', pattern: '〜に従って',
  reading: '〜ni shitagatte',
  meaning: 'sesuai dengan ..., mengikuti ...',
  cat: 'expression',
  connection: 'V-dictionary / N + に従って',
  desc: '<b>〜に従って</b> memiliki dua makna utama: (1) mengikuti/mematuhi aturan, instruksi, atau otoritas (従う = taat); (2) seiring berjalannya sesuatu, hal lain berubah secara bersamaan — dipakai untuk menyatakan perubahan paralel ("semakin... maka semakin...").',
  nuance: 'に従って vs に応じて (gn2-00276): に従って menekankan kepatuhan pada aturan atau otoritas yang ada. に応じて menekankan penyesuaian responsif terhadap kondisi yang berubah. に沿って (gn2-00278) menekankan "sejalan dengan rencana/arah" — lebih visual. Dalam makna temporal perubahan paralel, に従って dapat digantikan oleh につれて atau とともに.',
  examples: [
    { jp: '規則<b>に従って</b>、手続きを進めてください。', id: 'Mohon lanjutkan prosedur sesuai dengan aturan.' },
    { jp: '時代の流れ<b>に従って</b>、技術も進化している。', id: 'Seiring arus zaman, teknologi pun terus berkembang.' },
  ],
  see_also_grammar: ['gn2-00276', 'gn2-00278', 'gn2-00279'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00276', 'gn2-00278'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00278', level: 'n2', pattern: '〜に沿って',
  reading: '〜ni sotte',
  meaning: 'sepanjang ..., sesuai arah ...',
  cat: 'expression',
  connection: 'N + に沿って / N + に沿った + N',
  desc: '<b>〜に沿って</b> secara harfiah berarti "sepanjang" atau "menelusuri" jalur/garis tertentu, dan secara kiasan berarti "sejalan dengan" atau "mengikuti jalur" rencana, kebijakan, atau panduan yang sudah ada. Menekankan bahwa tindakan mengikuti "garis" yang telah ditetapkan.',
  nuance: 'に沿って vs に従って (gn2-00277): に沿って menyiratkan "mengikuti jalur/rencana" — lebih visual dan cocok untuk konteks rencana, panduan, atau kebijakan (計画に沿って、方針に沿って). に従って lebih menekankan "kepatuhan" terhadap aturan/otoritas. に即して (gn2-00279) lebih ketat — menyiratkan kesesuaian yang presisi dengan kenyataan aktual.',
  examples: [
    { jp: '計画<b>に沿って</b>プロジェクトを進めます。', id: 'Kami akan menjalankan proyek sesuai dengan rencana.' },
    { jp: '川<b>に沿って</b>歩いていくと、公園があります。', id: 'Jika berjalan menyusuri sungai, ada taman di sana.' },
  ],
  see_also_grammar: ['gn2-00276', 'gn2-00277', 'gn2-00279'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00277', 'gn2-00279', 'gn2-00276'],
  register: null,
  exceptions: null,
  notes: 'に沿って juga digunakan secara literal untuk menggambarkan berjalan sepanjang jalur fisik (sungai, jalan raya).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00279', level: 'n2', pattern: '〜に即して',
  reading: '〜ni sokushite',
  meaning: 'sesuai tepat dengan ..., mengikuti secara persis ...',
  cat: 'expression',
  connection: 'N + に即して / N + に即した + N',
  desc: '<b>〜に即して</b> menyatakan bahwa sesuatu dilakukan secara tepat sesuai dengan kenyataan, situasi aktual, atau standar yang ada. Kata 即 menyiratkan keselarasan yang presisi — tidak hanya "mengikuti" tetapi "mengikuti secara tepat dan langsung". Sering muncul dalam konteks akademik, hukum, atau evaluasi.',
  nuance: 'に即して vs に沿って (gn2-00278): に即して menekankan kesesuaian yang tepat dan presisi dengan kenyataan atau kondisi aktual (事実に即して、現実に即して). に沿って menekankan "mengikuti garis/rencana" — lebih tentang jalur yang dirancang. に従って (gn2-00277) menekankan kepatuhan pada aturan/otoritas; に即して menekankan kesesuaian dengan realitas/kondisi konkret yang ada.',
  examples: [
    { jp: '現実<b>に即した</b>教育が求められている。', id: 'Pendidikan yang tepat sesuai dengan realitas nyata sangat diperlukan.' },
    { jp: '事実<b>に即して</b>報告してください。', id: 'Mohon laporkan sesuai dengan fakta yang sebenarnya.' },
  ],
  see_also_grammar: ['gn2-00277', 'gn2-00278', 'gn2-00280'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00278', 'gn2-00280'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00280', level: 'n2', pattern: '〜に照らし合わせて',
  reading: '〜ni terashiawasete',
  meaning: 'dengan mencocokkan terhadap ..., berdasarkan standar ...',
  cat: 'expression',
  connection: 'N + に照らし合わせて / N + に照らし合わせた + N',
  desc: '<b>〜に照らし合わせて</b> berarti "mencocokkan dengan" atau "memverifikasi terhadap" suatu standar, kriteria, atau referensi. Kata 照らし合わせる berarti "menyejajarkan dan menerangi bersama" — menyiratkan proses aktif membandingkan dua hal untuk mengecek kesesuaiannya.',
  nuance: 'に照らし合わせて vs に即して (gn2-00279): に即して menyatakan kesesuaian pasif (sudah selaras dengan realitas). に照らし合わせて menyiratkan proses aktif membandingkan/mencocokkan sesuatu terhadap standar tertentu untuk verifikasi. Juga berbeda dari に基づいて (gn2-00268): に基づいて tentang "berdasarkan"; に照らし合わせて menyiratkan pengecekan aktif antara dua hal secara paralel.',
  examples: [
    { jp: '規定<b>に照らし合わせて</b>、申請内容を確認します。', id: 'Kami akan memeriksa isi permohonan dengan mencocokkannya terhadap ketentuan yang berlaku.' },
    { jp: '過去の事例<b>に照らし合わせた</b>判断が求められる。', id: 'Diperlukan penilaian yang mencocokkan terhadap kasus-kasus sebelumnya.' },
  ],
  see_also_grammar: ['gn2-00268', 'gn2-00278', 'gn2-00279'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00268', 'gn2-00279'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
}

];
