// ══════════════════════════════════════════════════════════════
//  grammar-n1.js — Nugget Nihongo · JLPT N1 Grammar
//  AUTO-GENERATED — DO NOT EDIT DIRECTLY
//  Edit: public/data/grammar/n1/*.js  then run: node scripts/merge-grammar.js
//  Entries: 200 | Generated: 2026-10-01
// ══════════════════════════════════════════════════════════════

window.grammarN1 = [

  // ── TENSE-ASPECT (35) ───────────────────────────────────

{
  id: 'gn1-00014', level: 'n1', pattern: '〜が最後', reading: '〜ga saigo',
  meaning: 'sekali ... maka tidak bisa kembali / begitu ... sudah selesai',
  cat: 'completion-regret',
  connection: 'V-ta + が最後',
  desc: '<b>〜が最後</b> menyatakan bahwa setelah suatu tindakan dilakukan, akibat negatif yang tidak bisa dihindari pasti akan menyusul. "Begitu X dilakukan, sudah selesai — tidak bisa kembali."',
  nuance: null,
  examples: [
    { jp: 'あの人に捕まった<b>が最後</b>、何時間も話を聞かされる。', id: 'Sekali ketahuan orang itu, kamu akan dipaksa mendengar ceritanya berjam-jam.' },
    { jp: '彼に秘密を話した<b>が最後</b>、すぐ全員に広まってしまう。', id: 'Begitu memberi tahu rahasia padanya, langsung menyebar ke semua orang.' },
    { jp: 'あのゲームを始めた<b>が最後</b>、やめられなくなる。', id: 'Sekali mulai game itu, tidak bisa berhenti lagi.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00047'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00017', level: 'n1', pattern: '〜に至って', reading: '〜ni itte',
  meaning: 'baru setelah sampai pada titik ... barulah sadar / akhirnya ...',
  cat: 'sequential-temporal',
  connection: 'V-dict / N + に至って',
  desc: '<b>〜に至って</b> menyatakan bahwa seseorang baru menyadari atau baru bertindak setelah situasi mencapai suatu titik kritis. Sering mengandung nuansa "sudah terlambat baru sadar".',
  nuance: null,
  examples: [
    { jp: 'この段階<b>に至って</b>、今さら後悔しても遅い。', id: 'Sudah sampai tahap ini, menyesal sekarang pun sudah terlambat.' },
    { jp: '倒産寸前<b>に至って</b>、ようやく改革を始めた。', id: 'Baru setelah hampir bangkrut, akhirnya mulai melakukan reformasi.' },
    { jp: '病気が悪化する<b>に至って</b>、初めて医者に行った。', id: 'Baru setelah penyakitnya memburuk, dia akhirnya pergi ke dokter.' }
  ],
  see_also_grammar: ['gn1-00015', 'gn1-00016'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00016'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00018', level: 'n1', pattern: '〜にして初めて', reading: '〜ni shite hajimete',
  meaning: 'hanya dengan ... barulah bisa ... / baru setelah menjadi ... barulah ...',
  cat: 'inception-continuation',
  connection: 'N + にして初めて',
  desc: '<b>〜にして初めて</b> menyatakan bahwa kondisi atau posisi tertentu adalah satu-satunya syarat agar sesuatu bisa terwujud. "Hanya dengan menjadi/berada dalam kondisi X, barulah Y bisa terjadi."',
  nuance: null,
  examples: [
    { jp: '親の立場<b>にして初めて</b>、子育ての大変さが実感できる。', id: 'Hanya setelah berada di posisi orang tua, barulah bisa merasakan beratnya membesarkan anak.' },
    { jp: 'この経験<b>にして初めて</b>、本当の苦労の意味が分かった。', id: 'Hanya melalui pengalaman ini, aku baru memahami makna perjuangan yang sesungguhnya.' },
    { jp: '現地<b>にして初めて</b>、問題の深刻さが理解できる。', id: 'Baru setelah langsung berada di lokasi, seseorang bisa memahami betapa seriusnya masalah itu.' }
  ],
  see_also_grammar: ['gn1-00004'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00011', 'gn5-00033', 'gn1-00004'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00027', level: 'n1', pattern: '〜そばから', reading: '〜soba kara',
  meaning: 'segera setelah ... langsung ... lagi (siklus berulang yang melelahkan)',
  cat: 'sequential-temporal',
  connection: 'V-dict / V-ta + そばから',
  desc: '<b>〜そばから</b> menyatakan bahwa segera setelah melakukan sesuatu, hal itu langsung dibatalkan atau diulang kembali — menggambarkan siklus yang membuat frustrasi atau kesia-siaan.',
  nuance: null,
  examples: [
    { jp: '片付ける<b>そばから</b>、子供が散らかす。', id: 'Baru saja dibereskan, anak-anak sudah mengacak-acak lagi.' },
    { jp: '覚える<b>そばから</b>、忘れてしまう。', id: 'Baru saja menghafal, langsung lupa lagi.' },
    { jp: '洗った<b>そばから</b>、また汚れてしまった。', id: 'Baru saja dicuci, langsung kotor lagi.' }
  ],
  see_also_grammar: ['gn1-00028'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00144'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00028', level: 'n1', pattern: '〜てからというもの', reading: '〜te kara to iu mono',
  meaning: 'sejak saat ... segalanya berubah',
  cat: 'inception-continuation',
  connection: 'V-te + からというもの',
  desc: '<b>〜てからというもの</b> menyatakan bahwa sejak suatu peristiwa terjadi, terjadi perubahan signifikan dan berkelanjutan hingga saat ini. Menekankan titik balik yang mengubah segalanya secara dramatis.',
  nuance: null,
  examples: [
    { jp: '日本に来<b>てからというもの</b>、生活習慣がすっかり変わった。', id: 'Sejak datang ke Jepang, kebiasaan hidupku berubah sepenuhnya.' },
    { jp: '彼女と別れ<b>てからというもの</b>、ずっと落ち込んでいる。', id: 'Sejak berpisah dengannya, aku terus merasa sedih.' },
    { jp: 'あの本を読ん<b>でからというもの</b>、考え方が大きく変わった。', id: 'Sejak membaca buku itu, cara berpikirku berubah drastis.' }
  ],
  see_also_grammar: ['gn1-00027'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00045', 'gn5-00033'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00029', level: 'n1', pattern: '〜を限りに', reading: '〜wo kagiri ni',
  meaning: 'mulai saat ... tidak lagi ... / terhitung sejak ...',
  cat: 'sequential-temporal',
  connection: 'N（waktu/acara）+ を限りに',
  desc: '<b>〜を限りに</b> menyatakan bahwa suatu titik waktu atau acara menjadi batas akhir dari sesuatu — setelah titik itu, sesuatu berakhir atau tidak lagi dilakukan. Sering digunakan dalam pengumuman resmi atau pernyataan tekad.',
  nuance: null,
  examples: [
    { jp: '今日<b>を限りに</b>、タバコをやめます。', id: 'Mulai hari ini, aku berhenti merokok.' },
    { jp: '今シーズン<b>を限りに</b>、引退することを発表した。', id: 'Dia mengumumkan pensiun terhitung akhir musim ini.' },
    { jp: '今回<b>を限りに</b>、このサービスは終了いたします。', id: 'Terhitung mulai sekarang, layanan ini akan dihentikan.' }
  ],
  see_also_grammar: ['gn1-00030'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00030', 'gn1-00003'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00032', level: 'n1', pattern: '〜ずじまい', reading: '〜zu jimai',
  meaning: 'akhirnya tidak sempat ... / tidak jadi ...',
  cat: 'completion-regret',
  connection: 'V-neg (ず形) + じまい',
  desc: '<b>〜ずじまい</b> mengungkapkan penyesalan bahwa sesuatu yang ingin dilakukan akhirnya tidak pernah terlaksana hingga akhir. Nuansa: "sudah berniat tapi kesempatan tidak datang."',
  nuance: null,
  examples: [
    { jp: '結局、彼に謝ら<b>ずじまい</b>だった。', id: 'Akhirnya aku tidak sempat minta maaf kepadanya.' },
    { jp: '買おうと思っていたのに、行か<b>ずじまい</b>になってしまった。', id: 'Padahal berniat membeli, tapi akhirnya tidak jadi pergi.' },
    { jp: '祖父には一度も会わ<b>ずじまい</b>で、先月亡くなった。', id: 'Kakek meninggal bulan lalu tanpa pernah sempat aku temui.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00178', 'gn1-00177'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00036', level: 'n1', pattern: '〜に先立って / 〜に先立ち', reading: '〜ni sakidatte / 〜ni sakidachi',
  meaning: 'sebelum ... / mendahului ...',
  cat: 'sequential-temporal',
  connection: 'N / V-dict + に先立って / に先立ち',
  desc: '<b>〜に先立って</b> menyatakan bahwa suatu tindakan dilakukan sebelum peristiwa penting lainnya. に先立ち adalah bentuk yang lebih formal/tulisan.',
  nuance: null,
  examples: [
    { jp: '式典<b>に先立って</b>、黙祷が行われた。', id: 'Sebelum upacara dimulai, dilakukan mengheningkan cipta.' },
    { jp: '工事<b>に先立ち</b>、住民説明会が開催された。', id: 'Mendahului dimulainya konstruksi, diadakan pertemuan penjelasan kepada warga.' },
    { jp: '試合<b>に先立って</b>、選手たちは体を温めた。', id: 'Sebelum pertandingan, para atlet melakukan pemanasan.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00054', 'gn1-00141'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00039', level: 'n1', pattern: '〜を皮切りに', reading: '〜wo kawakiri ni',
  meaning: 'dimulai dari ... sebagai awal / diawali dengan ...',
  cat: 'inception-continuation',
  connection: 'N + を皮切りに(して)',
  desc: '<b>〜を皮切りに</b> menyatakan bahwa X adalah titik awal dari serangkaian peristiwa yang terus berlanjut setelahnya. Nuansa: X membuka jalan bagi hal-hal berikutnya.',
  nuance: null,
  examples: [
    { jp: '東京公演<b>を皮切りに</b>、全国ツアーが始まった。', id: 'Diawali dengan pertunjukan di Tokyo, tur nasional pun dimulai.' },
    { jp: '彼の発言<b>を皮切りに</b>、議論が活発になった。', id: 'Dimulai dari pernyataannya, diskusi menjadi semakin aktif.' },
    { jp: '新製品の発売<b>を皮切りに</b>、次々と関連商品が登場した。', id: 'Diawali peluncuran produk baru, produk-produk terkait bermunculan satu per satu.' }
  ],
  see_also_grammar: ['gn1-00040', 'gn1-00041'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00025', 'gn2-00107', 'gn1-00003'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00040', level: 'n1', pattern: '〜を境に / 〜を境として', reading: '〜wo sakai ni / 〜wo sakai to shite',
  meaning: 'sejak ... / mulai dari titik/momen itu (berubah)',
  cat: 'sequential-temporal',
  connection: 'N (waktu/peristiwa) + を境に / を境として',
  desc: '<b>〜を境に</b> menyatakan bahwa X adalah titik pembatas di mana keadaan sebelum dan sesudahnya berbeda secara signifikan. Menekankan adanya perubahan besar.',
  nuance: null,
  examples: [
    { jp: '事故<b>を境に</b>、彼の人生は大きく変わった。', id: 'Sejak kecelakaan itu, hidupnya berubah drastis.' },
    { jp: '結婚<b>を境として</b>、生活スタイルが一変した。', id: 'Mulai dari pernikahan, gaya hidup berubah total.' },
    { jp: '転職<b>を境に</b>、彼女は別人のように明るくなった。', id: 'Sejak pindah kerja, dia menjadi jauh lebih ceria seperti orang yang berbeda.' }
  ],
  see_also_grammar: ['gn1-00041', 'gn1-00039'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00041', 'gn1-00045'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00041', level: 'n1', pattern: '〜を機に', reading: '〜wo ki ni',
  meaning: 'mengambil kesempatan dari ... / memanfaatkan momen ...',
  cat: 'sequential-temporal',
  connection: 'N + を機に(して)',
  desc: '<b>〜を機に</b> menyatakan bahwa X dimanfaatkan sebagai kesempatan/pemicu untuk melakukan atau memulai Y. Fokus pada niat aktif memanfaatkan momen.',
  nuance: null,
  examples: [
    { jp: '定年退職<b>を機に</b>、念願の旅行を計画した。', id: 'Memanfaatkan pensiun sebagai kesempatan, aku merencanakan perjalanan impian.' },
    { jp: '引っ越し<b>を機に</b>、断捨離を始めた。', id: 'Mengambil kesempatan dari pindahan rumah, aku mulai merapikan barang-barang.' },
    { jp: 'このプロジェクト<b>を機に</b>、チームの結束が強まった。', id: 'Berkat proyek ini, ikatan tim semakin kuat.' }
  ],
  see_also_grammar: ['gn1-00040', 'gn1-00039'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107', 'gn1-00040'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00045', level: 'n1', pattern: '〜て以来', reading: '〜te irai',
  meaning: 'sejak ... (sampai sekarang, terus-menerus)',
  cat: 'inception-continuation',
  connection: 'V-te-form + 以来',
  desc: '<b>〜て以来</b> menyatakan bahwa sejak peristiwa X terjadi, kondisi atau kebiasaan Y terus berlangsung tanpa berhenti hingga saat ini. Menekankan kesinambungan sejak titik awal.',
  nuance: null,
  examples: [
    { jp: '留学し<b>て以来</b>、日本語への興味が深まった。', id: 'Sejak belajar di Jepang, minatku terhadap bahasa Jepang semakin dalam.' },
    { jp: '子供が生まれ<b>て以来</b>、生活が一変した。', id: 'Sejak anak lahir, kehidupan berubah total.' },
    { jp: '彼女に会っ<b>て以来</b>、ずっと気になっている。', id: 'Sejak bertemu dengannya, aku terus memikirkannya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00033', 'gn1-00028', 'gn3-00011', 'gn2-00108', 'gn1-00040'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00056', level: 'n1', pattern: '〜ものを', reading: '〜mono wo',
  meaning: 'padahal kalau saja ... / sayang sekali ... (penyesalan)',
  cat: 'completion-regret',
  connection: 'V/Adj-plain + ものを',
  desc: '<b>〜ものを</b> mengekspresikan penyesalan pembicara bahwa suatu tindakan yang seharusnya mudah atau sudah seharusnya dilakukan, ternyata tidak dilakukan. Nada: "padahal tinggal X saja, kenapa tidak..."',
  nuance: null,
  examples: [
    { jp: '言ってくれれば助けた<b>ものを</b>、なぜ黙っていたのか。', id: 'Padahal kalau saja bilang, aku pasti bantu — kenapa diam saja?' },
    { jp: '素直に謝れば済んだ<b>ものを</b>、意地を張るから...', id: 'Padahal kalau saja mau minta maaf dengan tulus, sudah selesai — ini malah keras kepala...' },
    { jp: '早く病院に行けば良かった<b>ものを</b>、我慢したから悪化した。', id: 'Sayang sekali tidak langsung ke dokter — karena ditahan malah makin parah.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00238', 'gn2-00236'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00070', level: 'n1', pattern: '〜てやまない',
  reading: '〜te yamanai',
  meaning: 'tidak henti-hentinya ... / terus-menerus ... dari lubuk hati (perasaan mendalam)',
  cat: 'inception-continuation',
  connection: 'V-te + やまない (hanya kata kerja perasaan/keinginan)',
  desc: '<b>〜てやまない</b> menyatakan perasaan yang terus-menerus dan mendalam yang tidak pernah berhenti. Hampir selalu digunakan dengan kata kerja yang menyatakan emosi atau keinginan: 愛する, 願う, 望む, 敬う, 期待する.',
  nuance: null,
  examples: [
    { jp: '皆様のご健康とご多幸を願っ<b>てやみません</b>。', id: 'Saya tidak henti-hentinya mendoakan kesehatan dan kebahagiaan semua pihak.' },
    { jp: '彼は子供たちの未来を愛し<b>てやまない</b>。', id: 'Dia sungguh tidak henti-hentinya mencintai masa depan anak-anak itu.' }
  ],
  see_also_grammar: ['gn1-00071', 'gn1-00067'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn2-00020'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00075', level: 'n1', pattern: '〜がてら',
  reading: '〜gatera',
  meaning: 'sambil / sekalian memanfaatkan kesempatan untuk ...',
  cat: 'sequential-temporal',
  connection: 'V-masu-stem / N (verbal noun) + がてら',
  desc: '<b>〜がてら</b> menyatakan bahwa sambil melakukan suatu kegiatan utama, sekalian memanfaatkan kesempatan untuk melakukan hal lain. Tindakan sebelum がてら adalah kegiatan yang dijadikan alasan atau sarana.',
  nuance: null,
  examples: [
    { jp: '散歩<b>がてら</b>、コンビニに寄ってきた。', id: 'Sambil jalan-jalan, mampir ke konbini.' },
    { jp: '買い物<b>がてら</b>、久しぶりに友人の家を訪ねた。', id: 'Sambil belanja, mampir ke rumah teman yang sudah lama tidak dikunjungi.' }
  ],
  see_also_grammar: ['gn1-00074'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00016', 'gn1-00042'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00089', level: 'n1', pattern: '〜ながらに（して）',
  reading: '〜nagara ni (shite)',
  meaning: 'sejak ..., dalam keadaan ... yang alami atau bawaan; (sambil) tetap dalam kondisi ...',
  cat: 'sequential-temporal',
  connection: 'N / V-stem + ながらに（して）',
  desc: '<b>〜ながらに</b> menyatakan keadaan yang melekat secara alami atau bawaan sejak awal — bukan sesuatu yang diperoleh kemudian. Berbeda dari 〜ながら biasa (sambil melakukan dua tindakan bersamaan), 〜ながらに digunakan dalam ekspresi yang terleksikalisasi dan terbatas.',
  nuance: null,
  examples: [
    { jp: '彼女は生まれ<b>ながらにして</b>、音楽の才能に恵まれていた。', id: 'Dia dianugerahi bakat musik sejak lahir secara alami.' },
    { jp: '母は涙<b>ながらに</b>、息子の旅立ちを見送った。', id: 'Ibu melepas kepergian putranya sambil berurai air mata.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00184', 'gn4-00086'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00094', level: 'n1', pattern: '〜に際し（て） / 〜に際しての',
  reading: '〜ni saishi (te) / 〜ni saishi te no',
  meaning: 'pada saat ..., dalam rangka ..., pada kesempatan ... (digunakan untuk peristiwa penting, formal)',
  cat: 'sequential-temporal',
  connection: 'V-dictionary / N + に際し（て）/ に際しての + N',
  desc: '<b>〜に際して</b> menandai momen penting sebagai waktu atau kesempatan tertentu di mana tindakan perlu dilakukan atau perlu diperhatikan. Setara dengan 〜の際に dalam nuansa, tetapi lebih formal dan sering muncul dalam dokumen resmi, pengumuman, dan upacara.',
  nuance: null,
  examples: [
    { jp: '入社<b>に際して</b>、必要書類を事前にご準備ください。', id: 'Dalam rangka mulai bekerja, mohon siapkan dokumen yang diperlukan terlebih dahulu.' },
    { jp: '式典<b>に際しての</b>注意事項を事前にご確認ください。', id: 'Mohon periksa hal-hal yang perlu diperhatikan pada upacara tersebut sebelumnya.' },
  ],
  see_also_grammar: ['gn1-00093'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00004'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00100', level: 'n1', pattern: '〜かたわら',
  reading: '〜katawara',
  meaning: 'sambil juga ..., di sela-sela ...; melakukan dua kegiatan secara paralel (kegiatan utama dan kegiatan sampingan)',
  cat: 'sequential-temporal',
  connection: 'V-dictionary / N + の + かたわら',
  desc: '<b>〜かたわら</b> menyatakan bahwa seseorang melakukan kegiatan sampingan atau tambahan di sela-sela kegiatan utamanya. Kegiatan pertama (sebelum かたわら) adalah aktivitas utama atau pekerjaan pokok; yang kedua adalah yang dilakukan secara paralel sebagai tambahan.',
  nuance: null,
  examples: [
    { jp: '会社員をする<b>かたわら</b>、週末はボランティア活動に励んでいる。', id: 'Di sela-sela kesibukannya sebagai karyawan, dia aktif dalam kegiatan sukarela di akhir pekan.' },
    { jp: '研究の<b>かたわら</b>、次世代の研究者の育成にも力を入れている。', id: 'Di samping kesibukannya meneliti, dia juga giat membina para peneliti generasi berikutnya.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00184', 'gn1-00185'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00142',
  level: 'n1',
  pattern: '〜にしてから',
  reading: '〜ni shite kara',
  meaning: 'mulai dari saat ..., sejak menjadi ...',
  cat: 'inception-continuation',
  connection: 'N + にしてから',
  desc: '<b>〜にしてから</b> menyatakan bahwa sejak seseorang memasuki suatu kondisi atau peran tertentu, suatu perubahan atau kesadaran baru mulai terjadi. Biasanya digunakan dengan peran sosial seperti "orang tua", "karyawan", "mahasiswa", dan sebagainya.',
  nuance: null,
  examples: [
    { jp: '親<b>にしてから</b>、子どもの苦労が初めてわかった。', id: 'Sejak menjadi orang tua, baru saya memahami susah payahnya anak-anak.' },
    { jp: '社会人<b>にしてから</b>、時間の大切さを痛感するようになった。', id: 'Sejak menjadi karyawan, saya benar-benar merasakan betapa pentingnya waktu.' },
  ],
  see_also_grammar: ['gn1-00141', 'gn1-00143'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00143', 'gn1-00144', 'gn1-00141'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00143',
  level: 'n1',
  pattern: '〜にしてはじめて',
  reading: '〜ni shite hajimete',
  meaning: 'hanya setelah (berada dalam kondisi) ..., baru bisa ...',
  cat: 'sequential-temporal',
  connection: 'N + にしてはじめて',
  desc: '<b>〜にしてはじめて</b> menyatakan bahwa hanya setelah seseorang benar-benar berada dalam suatu kondisi atau posisi tertentu, barulah ia dapat memahami, merasakan, atau melakukan sesuatu. Menekankan bahwa kondisi tersebut adalah prasyarat mutlak.',
  nuance: null,
  examples: [
    { jp: '病気<b>にしてはじめて</b>、健康の大切さがわかった。', id: 'Hanya setelah sakit, baru saya benar-benar memahami pentingnya kesehatan.' },
    { jp: '指導者<b>にしてはじめて</b>、責任の重さが実感できる。', id: 'Hanya setelah menjadi pemimpin, baru bisa merasakan betapa beratnya tanggung jawab itu.' },
  ],
  see_also_grammar: ['gn1-00144', 'gn1-00141'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00011', 'gn1-00142', 'gn1-00141'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00144',
  level: 'n1',
  pattern: '〜にして初めて',
  reading: '〜ni shite hajimete',
  meaning: 'hanya setelah (berada dalam kondisi) ..., baru terjadi/bisa ...',
  cat: 'sequential-temporal',
  connection: 'N + にして初めて',
  desc: '<b>〜にして初めて</b> menyatakan bahwa suatu pemahaman, pengalaman, atau kemampuan baru dapat terwujud hanya setelah seseorang benar-benar menjalani kondisi atau posisi tertentu. Menggunakan kanji 初めて, namun makna identik dengan 〜にしてはじめて.',
  nuance: null,
  examples: [
    { jp: '留学<b>にして初めて</b>、日本語の難しさを実感した。', id: 'Hanya setelah belajar di luar negeri, baru saya benar-benar merasakan betapa sulitnya bahasa Jepang.' },
    { jp: '現地に立って<b>にして初めて</b>、問題の深刻さが理解できた。', id: 'Hanya setelah benar-benar berdiri di lokasi, baru bisa memahami betapa seriusnya masalah itu.' },
  ],
  see_also_grammar: ['gn1-00143', 'gn1-00141'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00011', 'gn1-00142'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00176',
  level: 'n1',
  pattern: '〜ずじまい',
  reading: '〜zu jimai',
  meaning: 'akhirnya tidak jadi ..., berakhir tanpa melakukan ... (dengan nuansa sesal)',
  cat: 'completion-regret',
  connection: 'V-(a)ず + じまい',
  desc: '<b>〜ずじまい</b> menyatakan bahwa seseorang pada akhirnya tidak melakukan sesuatu yang seharusnya atau ingin dilakukan — biasanya karena kesempatan yang tidak pernah datang atau situasi yang menghalangi. Mengandung nuansa penyesalan bahwa hal tersebut tidak pernah terwujud.',
  nuance: null,
  examples: [
    { jp: '祖父に感謝の言葉を伝えられ<b>ずじまい</b>に終わった。', id: 'Aku berakhir tanpa pernah menyampaikan ucapan terima kasih kepada kakek.' },
    { jp: 'あの本は結局読ま<b>ずじまい</b>だった。', id: 'Buku itu akhirnya berakhir tanpa pernah aku baca.' },
    { jp: '彼女に謝ら<b>ずじまい</b>で、疎遠になってしまった。', id: 'Tanpa pernah meminta maaf padanya, akhirnya kami menjauh.' },
  ],
  see_also_grammar: ['gn1-00177', 'gn1-00178', 'gn1-00179'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00177', 'gn1-00178'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00177',
  level: 'n1',
  pattern: '〜じまい',
  reading: '〜jimai',
  meaning: 'berakhir tanpa melakukan ... (varian kasual dari ずじまい)',
  cat: 'completion-regret',
  connection: 'V-masu stem + じまい',
  desc: '<b>〜じまい</b> adalah varian yang lebih kasual dari 〜ずじまい (gn1-00176), dengan makna yang identik — menyatakan bahwa sesuatu akhirnya tidak pernah dilakukan. Pembentukan: melekat pada bentuk masu-stem (連用形) verba, seperti 食べじまい, 行きじまい, 言いじまい.',
  nuance: null,
  examples: [
    { jp: '買うつもりだったのに、結局買い<b>じまい</b>だった。', id: 'Padahal sudah berniat membeli, tapi akhirnya berakhir tanpa membeli.' },
    { jp: '言い<b>じまい</b>になって、後悔した。', id: 'Akhirnya berakhir tanpa mengatakannya, dan saya menyesal.' },
    { jp: 'あの映画、見<b>じまい</b>のまま上映が終わった。', id: 'Film itu berakhir tayang tanpa pernah kutonton.' },
  ],
  see_also_grammar: ['gn1-00176', 'gn1-00178'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00032', 'gn1-00178', 'gn1-00176'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00178',
  level: 'n1',
  pattern: '〜そびれる',
  reading: '〜sobireru',
  meaning: 'kehilangan kesempatan untuk ..., terlewat melakukan ...',
  cat: 'completion-regret',
  connection: 'V-masu stem + そびれる',
  desc: '<b>〜そびれる</b> menyatakan bahwa seseorang kehilangan kesempatan untuk melakukan sesuatu — bukan karena tidak mau, tetapi karena saat yang tepat terlewat atau kondisi tidak memungkinkan. Biasanya merujuk pada tindakan yang diinginkan tetapi tidak berhasil dilakukan.',
  nuance: null,
  examples: [
    { jp: 'お礼を言い<b>そびれて</b>、ずっと気になっている。', id: 'Kehilangan kesempatan untuk mengucapkan terima kasih dan terus kepikiran.' },
    { jp: '電車に乗り<b>そびれて</b>、遅刻してしまった。', id: 'Terlewat naik kereta dan akhirnya terlambat.' },
    { jp: '聞き<b>そびれた</b>まま、ずっと疑問が残っている。', id: 'Karena melewatkan kesempatan bertanya, pertanyaannya masih terus tersisa.' },
  ],
  see_also_grammar: ['gn1-00176', 'gn1-00177', 'gn1-00179'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00179', 'gn1-00032', 'gn1-00176', 'gn1-00177'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00179',
  level: 'n1',
  pattern: '〜そこなう',
  reading: '〜sokonau',
  meaning: 'gagal melakukan ..., salah dalam ..., melewatkan (karena kesalahan/kelalaian)',
  cat: 'completion-regret',
  connection: 'V-masu stem + そこなう',
  desc: '<b>〜そこなう</b> menyatakan bahwa seseorang gagal melakukan sesuatu dengan benar, melewatkan sesuatu karena kelalaian, atau tidak berhasil menangkap/melakukan tindakan pada saat yang tepat. Berbeda dari sekadar kehilangan kesempatan, ada unsur "meleset" atau "tidak berhasil".',
  nuance: null,
  examples: [
    { jp: '大事な部分を聞き<b>そこなって</b>、もう一度聞き直した。', id: 'Gagal mendengar bagian penting dan menanyakan lagi dari awal.' },
    { jp: '乗り換えを見<b>そこなって</b>、終点まで行ってしまった。', id: 'Melewatkan stasiun transfer dan kebablasan sampai ujung.' },
    { jp: '読み<b>そこなった</b>ページがあって、内容が理解できなかった。', id: 'Ada halaman yang terlewat dibaca sehingga isinya tidak dipahami.' },
  ],
  see_also_grammar: ['gn1-00178', 'gn1-00176'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00178'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00184',
  level: 'n1',
  pattern: '〜ながら',
  reading: '〜nagara',
  meaning: 'sambil ..., walaupun ... (dua arti: simultan atau kontrastif)',
  cat: 'te-form-use',
  connection: 'V-masu stem / N / adj + ながら',
  desc: '<b>〜ながら</b> memiliki dua fungsi: (1) simultan — menyatakan dua tindakan dilakukan bersamaan ("sambil melakukan X, melakukan Y"); dan (2) kontrastif/konsesif — menyatakan bahwa meski kondisi A, terjadi B yang berlawanan dari yang diharapkan ("walaupun / meski"). Konteks menentukan arti mana yang digunakan.',
  nuance: null,
  examples: [
    { jp: '音楽を聴き<b>ながら</b>、料理をした。', id: 'Sambil mendengarkan musik, memasak.' },
    { jp: '知り<b>ながら</b>、黙っていた。', id: 'Walaupun sudah tahu, tetap diam.' },
    { jp: '残念<b>ながら</b>、ご希望には沿えません。', id: 'Sayangnya (walaupun disayangkan), kami tidak dapat memenuhi keinginan Anda.' },
  ],
  see_also_grammar: ['gn1-00185', 'gn1-00183', 'gn1-00187'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00185', 'gn2-00015', 'gn1-00043', 'gn5-00056', 'gn5-00094', 'gn1-00089', 'gn1-00100', 'gn1-00011', 'gn1-00010', 'gn1-00183'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00185',
  level: 'n1',
  pattern: '〜つつ',
  reading: '〜tsutsu',
  meaning: 'sambil ..., walaupun ... (lebih formal dari ながら)',
  cat: 'te-form-use',
  connection: 'V-masu stem + つつ',
  desc: '<b>〜つつ</b> memiliki dua fungsi seperti 〜ながら: (1) simultan — dua tindakan berlangsung bersamaan, dan (2) kontrastif — meskipun kondisi A berlaku, B terjadi. Lebih formal dan lebih sering ditemukan dalam tulisan dibanding 〜ながら.',
  nuance: null,
  examples: [
    { jp: '景色を楽しみ<b>つつ</b>、山を登った。', id: 'Sambil menikmati pemandangan, mendaki gunung.' },
    { jp: '迷い<b>つつ</b>、最終的には決断した。', id: 'Sambil ragu-ragu, pada akhirnya membuat keputusan.' },
    { jp: '感謝し<b>つつ</b>も、断らざるを得なかった。', id: 'Meskipun berterima kasih, terpaksa harus menolak.' },
  ],
  see_also_grammar: ['gn1-00184', 'gn1-00186', 'gn1-00187'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00184', 'gn1-00186', 'gn2-00015', 'gn1-00100', 'gn1-00011', 'gn1-00187'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00186',
  level: 'n1',
  pattern: '〜つつある',
  reading: '〜tsutsu aru',
  meaning: 'sedang dalam proses ..., berangsur-angsur ... (perubahan bertahap yang sedang berlangsung)',
  cat: 'progressive-state',
  connection: 'V-masu stem + つつある',
  desc: '<b>〜つつある</b> menyatakan bahwa suatu perubahan atau proses sedang berlangsung secara bertahap pada saat ini. Digunakan untuk menggambarkan perubahan yang bersifat berangsur-angsur — bukan yang sudah selesai, bukan yang baru saja dimulai, melainkan yang sedang dalam perjalanan.',
  nuance: null,
  examples: [
    { jp: '経済は回復し<b>つつある</b>。', id: 'Ekonomi sedang dalam proses pemulihan.' },
    { jp: '社会の意識は変わり<b>つつある</b>。', id: 'Kesadaran masyarakat sedang berangsur-angsur berubah.' },
    { jp: '新しい技術が普及し<b>つつある</b>。', id: 'Teknologi baru sedang dalam proses penyebaran.' },
  ],
  see_also_grammar: ['gn1-00185', 'gn1-00187'],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00029', 'gn1-00185'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00188',
  level: 'n1',
  pattern: '〜折に',
  reading: '〜ori ni',
  meaning: 'ketika ada kesempatan ..., sewaktu ... (pada suatu saat yang tepat)',
  cat: 'sequential-temporal',
  connection: 'N-の / V-plain dict + 折に',
  desc: '<b>〜折に</b> menyatakan "pada waktu/kesempatan tertentu" — digunakan untuk merujuk pada saat yang dianggap tepat atau momen yang cocok untuk melakukan sesuatu. Mengandung nuansa menunggu atau memanfaatkan momen yang pas.',
  nuance: null,
  examples: [
    { jp: 'お近くにお越しの<b>折に</b>、ぜひお立ち寄りください。', id: 'Ketika ada kesempatan Anda melintas di sini, silakan mampir.' },
    { jp: '上京の<b>折に</b>、旧友と再会した。', id: 'Sewaktu ada kesempatan ke Tokyo, bertemu kembali dengan teman lama.' },
    { jp: 'ご不便をおかけした<b>折に</b>、深くお詫び申し上げます。', id: 'Atas ketidaknyamanan yang saya sebabkan pada saat itu, saya mohon maaf sebesar-besarnya.' },
  ],
  see_also_grammar: ['gn1-00189', 'gn1-00190'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00189', 'gn1-00190'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00189',
  level: 'n1',
  pattern: '〜折から',
  reading: '〜orikara',
  meaning: 'tepat ketika ..., bertepatan saat ..., di tengah situasi ...',
  cat: 'sequential-temporal',
  connection: 'N-の / V-plain dict + 折から / 折柄',
  desc: '<b>〜折から</b> menyatakan bahwa sesuatu terjadi tepat pada saat kondisi atau situasi tertentu sedang berlangsung. Mengandung nuansa kebetulan waktu atau latar belakang situasi yang relevan. Sering digunakan untuk menetapkan konteks waktu yang signifikan dalam tulisan formal.',
  nuance: null,
  examples: [
    { jp: '花見の<b>折から</b>、突然雨が降り出した。', id: 'Tepat saat sedang menikmati bunga sakura, tiba-tiba hujan turun.' },
    { jp: '寒い<b>折から</b>、どうぞご自愛ください。', id: 'Di tengah cuaca dingin ini, mohon jaga kesehatan Anda.' },
    { jp: '多忙の<b>折から</b>、ご無理をお願いして申し訳ありません。', id: 'Bertepatan dengan kesibukan Anda, mohon maaf atas permintaan yang memberatkan.' },
  ],
  see_also_grammar: ['gn1-00188', 'gn1-00190'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00188', 'gn5-00066', 'gn5-00076', 'gn4-00042', 'gn4-00063', 'gn4-00088', 'gn3-00005', 'gn3-00090', 'gn3-00006', 'gn3-00142', 'gn2-00027', 'gn2-00192', 'gn1-00024'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00190',
  level: 'n1',
  pattern: '〜折には',
  reading: '〜ori ni wa',
  meaning: 'ketika saatnya tiba ..., sewaktu ada kesempatan ... (dengan penekanan kondisional)',
  cat: 'sequential-temporal',
  connection: 'N-の / V-plain dict + 折には',
  desc: '<b>〜折には</b> menyatakan "ketika kesempatan atau momen tersebut tiba". Partikel は menambahkan penekanan atau nuansa kondisional ringan dibanding 〜折に, menunjukkan "apabila saat itu tiba, maka...". Sering digunakan dalam undangan atau harapan agar orang lain melakukan sesuatu pada waktu tertentu.',
  nuance: null,
  examples: [
    { jp: 'またお会いできる<b>折には</b>、ぜひお話ししましょう。', id: 'Ketika ada kesempatan kita bertemu lagi, mari kita berbincang.' },
    { jp: '東京にいらっしゃる<b>折には</b>、ご連絡ください。', id: 'Sewaktu ada kesempatan Anda ke Tokyo, mohon hubungi saya.' },
    { jp: 'お暇な<b>折には</b>、ぜひお越しください。', id: 'Ketika Anda ada waktu luang, silakan datang berkunjung.' },
  ],
  see_also_grammar: ['gn1-00188', 'gn1-00189'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00188', 'gn5-00047'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00191',
  level: 'n1',
  pattern: '〜に当たり',
  reading: '〜ni atari',
  meaning: 'pada saat ..., dalam rangka ... (sangat formal; versi tertulis dari に当たって)',
  cat: 'sequential-temporal',
  connection: 'N / V-plain dict + に当たり',
  desc: '<b>〜に当たり</b> adalah bentuk sangat formal dari 〜に当たって (gn1-00192), digunakan untuk menyatakan "pada saat/kesempatan penting ini". Dengan membuang て, bentuk ini menjadi lebih kaku dan seremonial. Biasanya digunakan dalam pidato, sambutan resmi, atau tulisan seremonial.',
  nuance: null,
  examples: [
    { jp: '開会式<b>に当たり</b>、一言ご挨拶申し上げます。', id: 'Pada kesempatan upacara pembukaan ini, izinkan saya menyampaikan sepatah kata.' },
    { jp: '新年<b>に当たり</b>、皆様のご健康をお祈り申し上げます。', id: 'Dalam rangka tahun baru ini, saya mendoakan kesehatan Anda semua.' },
    { jp: '本事業を開始する<b>に当たり</b>、関係各位に感謝申し上げます。', id: 'Dalam rangka memulai proyek ini, saya mengucapkan terima kasih kepada semua pihak terkait.' },
  ],
  see_also_grammar: ['gn1-00192', 'gn1-00193'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00192', 'gn1-00193'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00192',
  level: 'n1',
  pattern: '〜に当たって',
  reading: '〜ni atatte',
  meaning: 'pada saat ..., dalam rangka ... (menyatakan momen penting sebagai latar)',
  cat: 'sequential-temporal',
  connection: 'N / V-plain dict + に当たって',
  desc: '<b>〜に当たって</b> menyatakan bahwa "pada saat/dalam rangka peristiwa atau tindakan penting ini, seseorang melakukan atau mempertimbangkan sesuatu". Sering digunakan untuk memberikan konteks sebelum tindakan besar dimulai.',
  nuance: null,
  examples: [
    { jp: '試験<b>に当たって</b>、十分に準備してください。', id: 'Dalam menghadapi ujian, mohon persiapkan diri dengan matang.' },
    { jp: '新しい生活を始める<b>に当たって</b>、いくつか注意事項があります。', id: 'Dalam rangka memulai kehidupan baru, ada beberapa hal yang perlu diperhatikan.' },
    { jp: '事業を拡大する<b>に当たって</b>、リスクを十分に検討した。', id: 'Dalam rangka memperluas usaha, risiko telah dipertimbangkan secara matang.' },
  ],
  see_also_grammar: ['gn1-00191', 'gn1-00193', 'gn1-00194'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00194', 'gn1-00191', 'gn2-00210'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00193',
  level: 'n1',
  pattern: '〜に際し',
  reading: '〜ni saishi',
  meaning: 'pada saat ..., dalam ... (formal tertulis; versi ringkas dari に際して)',
  cat: 'sequential-temporal',
  connection: 'N / V-plain dict + に際し',
  desc: '<b>〜に際し</b> adalah bentuk yang lebih formal dan lebih sering tertulis dari 〜に際して (gn1-00194), digunakan untuk menyatakan "pada saat peristiwa penting ini". Dengan membuang て, bentuk ini terasa lebih padat dan resmi, cocok untuk dokumen, pengumuman, dan ucapan formal.',
  nuance: null,
  examples: [
    { jp: 'ご入学<b>に際し</b>、心よりお祝い申し上げます。', id: 'Pada kesempatan penerimaan Anda, saya mengucapkan selamat yang sebesar-besarnya.' },
    { jp: '退職<b>に際し</b>、一言ご挨拶申し上げます。', id: 'Pada saat pensiun ini, izinkan saya menyampaikan sepatah kata perpisahan.' },
    { jp: '海外赴任<b>に際し</strong>、必要な手続きを確認した。', id: 'Dalam menghadapi penugasan ke luar negeri, prosedur yang diperlukan telah dikonfirmasi.' },
  ],
  see_also_grammar: ['gn1-00194', 'gn1-00191', 'gn1-00192'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00194', 'gn1-00191'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00194',
  level: 'n1',
  pattern: '〜に際して',
  reading: '〜ni saishite',
  meaning: 'saat ..., dalam rangka ... (pada peristiwa atau tindakan penting)',
  cat: 'sequential-temporal',
  connection: 'N / V-plain dict + に際して',
  desc: '<b>〜に際して</b> menyatakan bahwa "pada saat atau dalam rangka peristiwa penting tertentu", suatu tindakan dilakukan atau pertimbangan tertentu diperlukan. Sering digunakan untuk persiapan, tindakan prosedural, atau pernyataan yang berkaitan dengan momen penting.',
  nuance: null,
  examples: [
    { jp: '手術<b>に際して</b>、リスクについて十分な説明を受けた。', id: 'Saat menjalani operasi, saya menerima penjelasan yang cukup tentang risikonya.' },
    { jp: '卒業<b>に際して</b>、恩師への感謝を述べた。', id: 'Dalam rangka wisuda, saya menyampaikan rasa terima kasih kepada guru yang berjasa.' },
    { jp: '新製品の発売<b>に際して</b>、記者会見が行われた。', id: 'Bersamaan dengan peluncuran produk baru, konferensi pers diadakan.' },
  ],
  see_also_grammar: ['gn1-00193', 'gn1-00191', 'gn1-00192'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00192', 'gn2-00004', 'gn2-00106', 'gn2-00209', 'gn2-00210', 'gn1-00193'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── VERB-FORMS (5) ───────────────────────────────────

{
  id: 'gn1-00023', level: 'n1', pattern: '〜ともなく／〜ともなしに', reading: '〜to mo naku / to mo nashi ni',
  meaning: 'tanpa sengaja ... / tanpa kesadaran penuh ...',
  cat: 'verb-form',
  connection: 'V-dict + ともなく / ともなしに',
  desc: '<b>〜ともなく</b> (atau <b>〜ともなしに</b>) menyatakan bahwa suatu tindakan dilakukan tanpa tujuan jelas, tanpa sengaja, atau tanpa kesadaran penuh. Sering digunakan bersama verba persepsi seperti 見る dan 聞く.',
  nuance: null,
  examples: [
    { jp: 'どこへ行く<b>ともなく</b>、街をぶらぶら歩いた。', id: 'Tanpa tujuan kemana, aku berjalan berkeliling kota.' },
    { jp: '聞く<b>ともなしに</b>、隣の会話が耳に入ってきた。', id: 'Tanpa sengaja mendengarkan, percakapan di sebelah masuk ke telingaku.' },
    { jp: '見る<b>ともなく</b>テレビを見ていたら、気になるニュースが流れた。', id: 'Saat menonton TV tanpa benar-benar memperhatikan, ada berita yang menarik perhatianku.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00035'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00058', level: 'n1', pattern: '〜にたえる / 〜にたえない', reading: '〜ni taeru / 〜ni taenai',
  meaning: 'layak / tidak layak untuk ... / tahan / tidak tahan menghadapi ...',
  cat: 'potential',
  connection: 'V-dict / N + に堪える / に堪えない',
  desc: '<b>〜にたえる</b> berarti "layak/tahan untuk X" — subjek memiliki kualitas yang memadai untuk menghadapi atau memenuhi standar X. <b>〜にたえない</b> sebaliknya: terlalu menyedihkan/buruk untuk ditanggung.',
  nuance: null,
  examples: [
    { jp: 'この作品は鑑賞<b>に堪える</b>クオリティだ。', id: 'Karya ini memiliki kualitas yang layak untuk dinikmati.' },
    { jp: '見る<b>にたえない</b>ほど悲惨な光景だった。', id: 'Itu adalah pemandangan yang sangat memilukan sehingga tidak tega untuk dilihat.' },
    { jp: '彼の演技は批評<b>にたえる</b>ものだった。', id: 'Aktingnya adalah sesuatu yang layak untuk dikritisi secara serius.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00126', 'gn2-00073'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00063', level: 'n1', pattern: '〜にたえる',
  reading: '〜ni taeru',
  meaning: 'tahan menghadapi ... / mampu menanggung ... / layak untuk (ditonton/didengar)',
  cat: 'potential',
  connection: 'V-dictionary / N + にたえる',
  desc: '<b>〜にたえる</b> memiliki dua makna utama: (1) mampu bertahan terhadap sesuatu yang berat secara fisik atau mental; (2) sesuatu cukup bernilai untuk dinikmati atau layak untuk dilakukan.',
  nuance: null,
  examples: [
    { jp: 'この小説は再読<b>にたえる</b>傑作だ。', id: 'Novel ini adalah mahakarya yang tahan dibaca berulang kali.' },
    { jp: '彼の演技はようやく鑑賞<b>にたえる</b>レベルになった。', id: 'Aktingnya akhirnya mencapai level yang layak untuk dinikmati.' },
    { jp: '長年の苦難<b>にたえてきた</b>人だ。', id: 'Dia adalah orang yang telah bertahan menanggung penderitaan bertahun-tahun.' }
  ],
  see_also_grammar: ['gn1-00064', 'gn1-00061'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00126'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00129', level: 'n1', pattern: '〜に堪える',
  reading: '〜ni taeru',
  meaning: 'tahan terhadap ..., layak untuk ..., mampu menanggung ...',
  cat: 'potential',
  connection: 'V-dictionary / N + に堪える',
  desc: '<b>〜に堪える</b> memiliki dua makna utama: (1) mampu atau tahan terhadap sesuatu yang berat atau menuntut, dan (2) layak atau cukup baik untuk sesuatu (mirip 〜に足る). Dalam makna kedua, sering muncul dalam frasa seperti 鑑賞に堪える (layak untuk dinikmati/diapresiasi).',
  nuance: null,
  examples: [
    { jp: 'この橋は重い車両<b>にも堪えられる</b>よう設計されている。', id: 'Jembatan ini dirancang agar mampu menahan kendaraan berat sekalipun.' },
    { jp: '彼の演技は批評<b>に堪える</b>レベルに達している。', id: 'Aktingnya telah mencapai level yang layak mendapat ulasan kritis.' }
  ],
  see_also_grammar: ['gn1-00130', 'gn1-00128'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00126'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00134', level: 'n1', pattern: '〜を余儀なくされる',
  reading: '〜wo yoginaku sareru',
  meaning: 'dipaksa oleh keadaan untuk ..., tidak ada pilihan kecuali ... (karena situasi eksternal)',
  cat: 'passive',
  connection: 'N / V-plain + を余儀なくされる',
  desc: '<b>〜を余儀なくされる</b> menyatakan bahwa seseorang dipaksa oleh keadaan atau faktor eksternal untuk melakukan atau menerima sesuatu yang tidak diinginkan. Konstruksi ini bersifat pasif dan menekankan bahwa kekuatan dari luar yang memaksakan situasi tersebut.',
  nuance: null,
  examples: [
    { jp: '地震の影響で、住民は避難<b>を余儀なくされた</b>。', id: 'Akibat gempa bumi, para penduduk terpaksa mengungsi.' },
    { jp: '業績悪化により、会社は大規模なリストラ<b>を余儀なくされた</b>。', id: 'Akibat memburuknya kinerja, perusahaan terpaksa melakukan restrukturisasi besar-besaran.' },
    { jp: '悪天候のため、登山隊は撤退<b>を余儀なくされた</b>。', id: 'Karena cuaca buruk, tim pendaki terpaksa mundur.' }
  ],
  see_also_grammar: ['gn1-00133'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00133'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── CONDITIONALS (11) ───────────────────────────────────

{
  id: 'gn1-00001', level: 'n1', pattern: '〜いかんによって／〜いかんで', reading: '〜ikan ni yotte / ikan de',
  meaning: 'tergantung pada ... (sangat formal)',
  cat: 'conditional-tara',
  connection: 'N + いかんによって / N + いかんで',
  desc: '<b>〜いかんによって</b> (atau <b>〜いかんで</b>) menyatakan bahwa hasil sepenuhnya bergantung pada isi atau keadaan sesuatu. Sering digunakan dalam pengumuman, surat resmi, dan regulasi.',
  nuance: null,
  examples: [
    { jp: '試験の結果<b>いかんによって</b>、採用が決まる。', id: 'Keputusan penerimaan ditentukan tergantung pada hasil ujian.' },
    { jp: '今後の対応<b>いかんで</b>、契約を更新するかどうか判断します。', id: 'Keputusan perpanjangan kontrak akan ditentukan tergantung pada tindakan selanjutnya.' },
    { jp: '天候<b>いかんによって</b>、イベントは中止になることもある。', id: 'Bergantung pada cuaca, acara bisa saja dibatalkan.' }
  ],
  see_also_grammar: ['gn1-00002'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00054', 'gn1-00168', 'gn1-00002'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00054', level: 'n1', pattern: '〜ようによっては', reading: '〜you ni yotte wa',
  meaning: 'tergantung bagaimana cara ... / bergantung pada cara melakukan ...',
  cat: 'conditional-tara',
  connection: 'V-stem + ようによっては',
  desc: '<b>〜ようによっては</b> menyatakan bahwa hasil bisa berbeda tergantung pada cara atau metode melakukan X. Menekankan bahwa cara/pendekatan (ように) adalah faktor penentu.',
  nuance: null,
  examples: [
    { jp: '言い方<b>ようによっては</b>、同じ内容でも相手に伝わり方が変わる。', id: 'Tergantung cara mengatakannya, pesan yang sama bisa tersampaikan dengan cara yang berbeda.' },
    { jp: '使い<b>ようによっては</b>、この道具はとても便利だ。', id: 'Tergantung cara menggunakannya, alat ini bisa sangat berguna.' },
    { jp: '考え<b>ようによっては</b>、この状況もチャンスと言える。', id: 'Tergantung cara memandangnya, situasi ini pun bisa disebut sebagai peluang.' }
  ],
  see_also_grammar: ['gn1-00055'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00055'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00055', level: 'n1', pattern: '〜次第では', reading: '〜shidai de wa',
  meaning: 'tergantung bagaimana ... / bergantung pada hasil ...',
  cat: 'conditional-tara',
  connection: 'N + 次第では',
  desc: '<b>〜次第では</b> menyatakan bahwa tindakan atau hasil Y akan berbeda tergantung pada kondisi atau hasil dari N. Menekankan bahwa N adalah variabel penentu — bisa ke arah mana saja.',
  nuance: null,
  examples: [
    { jp: '交渉の結果<b>次第では</b>、計画を変更することもある。', id: 'Tergantung hasil negosiasi, ada kemungkinan rencana perlu diubah.' },
    { jp: '天候<b>次第では</b>、イベントが中止になる可能性がある。', id: 'Tergantung cuaca, ada kemungkinan acara dibatalkan.' },
    { jp: '彼の返事<b>次第では</b>、こちらも対応を変える必要がある。', id: 'Tergantung jawabannya, kita pun mungkin perlu mengubah respons kita.' }
  ],
  see_also_grammar: ['gn1-00054'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00243', 'gn1-00054', 'gn2-00019', 'gn2-00241', 'gn2-00272', 'gn2-00274', 'gn1-00110'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00076', level: 'n1', pattern: '〜とあれば',
  reading: '〜to areba',
  meaning: 'kalau memang ... / demi ... / jika untuk keperluan itu (siap melakukan apa saja)',
  cat: 'conditional-tara',
  connection: 'N / Clause (plain form) + とあれば',
  desc: '<b>〜とあれば</b> menyatakan kesiapan atau kesediaan untuk melakukan sesuatu demi suatu kondisi atau tujuan tertentu. Mengandung nuansa pengorbanan atau dedikasi — "demi hal itu, saya rela melakukan apa saja."',
  nuance: null,
  examples: [
    { jp: 'あなたのため<b>とあれば</b>、どこへでも参ります。', id: 'Demi kamu, saya siap pergi ke mana saja.' },
    { jp: '必要<b>とあれば</b>、夜を徹して作業します。', id: 'Kalau memang diperlukan, saya siap bekerja semalam suntuk.' }
  ],
  see_also_grammar: ['gn1-00077', 'gn1-00078'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00035', 'gn2-00090', 'gn2-00223'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00077', level: 'n1', pattern: '〜ともなると',
  reading: '〜to mo naru to',
  meaning: 'kalau sudah mencapai level ... / begitu sudah menjadi ... (konsekuensi yang wajar mengikuti)',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなると',
  desc: '<b>〜ともなると</b> menyatakan bahwa begitu seseorang atau sesuatu mencapai tingkat atau status tertentu, konsekuensi tertentu secara alami dan tak terelakkan mengikutinya. Menekankan kelogisan konsekuensi pada level tersebut.',
  nuance: null,
  examples: [
    { jp: '部長<b>ともなると</b>、背負う責任も格段に大きくなる。', id: 'Kalau sudah jadi manajer, tanggung jawab yang dipikul pun jauh lebih besar.' },
    { jp: 'この規模のプロジェクト<b>ともなると</b>、管理だけで一苦労だ。', id: 'Kalau sudah proyek sebesar ini, pengelolaannya saja sudah susah payah.' }
  ],
  see_also_grammar: ['gn1-00078', 'gn1-00076'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00078', 'gn1-00102'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00078', level: 'n1', pattern: '〜ともなれば',
  reading: '〜to mo nareba',
  meaning: 'kalau sudah sampai pada level ... / begitu sudah menjadi ... (varian hipotetis dari ともなると)',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなれば',
  desc: '<b>〜ともなれば</b> adalah varian dari 〜ともなると dengan makna yang sangat mirip — menyatakan bahwa di status atau kondisi tertentu, suatu konsekuensi adalah hal yang wajar. Menggunakan ば-form sehingga terasa sedikit lebih hipotetis.',
  nuance: null,
  examples: [
    { jp: '社長<b>ともなれば</b>、孤独な決断を迫られることも多い。', id: 'Kalau sudah menjadi direktur, banyak pula keputusan sulit yang harus diambil sendiri.' },
    { jp: '有名人<b>ともなれば</b>、プライバシーの確保が難しくなる。', id: 'Kalau sudah jadi orang terkenal, menjaga privasi pun menjadi sulit.' }
  ],
  see_also_grammar: ['gn1-00077', 'gn1-00076'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00077', 'gn1-00101'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00083', level: 'n1', pattern: '〜が最後 / 〜たが最後',
  reading: '〜ga saigo / 〜ta ga saigo',
  meaning: 'begitu ..., sudah tidak bisa balik lagi; sekali ..., akibat buruk pasti menyusul',
  cat: 'conditional-tara',
  connection: 'V-ta + が最後',
  desc: '<b>〜たが最後</b> menyatakan bahwa begitu suatu tindakan dilakukan, akibat negatif atau tak terelakkan pasti akan terjadi dan tidak ada jalan kembali. Digunakan untuk situasi di mana satu langkah merupakan titik of no return.',
  nuance: null,
  examples: [
    { jp: '彼に秘密を話し<b>たが最後</b>、翌日には皆に知られてしまう。', id: 'Sekali kamu cerita rahasia ke dia, keesokan harinya semua orang pasti sudah tahu.' },
    { jp: 'あのゲームを始め<b>たが最後</b>、止められなくなる。', id: 'Begitu kamu mulai main game itu, kamu tidak akan bisa berhenti lagi.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00131'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00101', level: 'n1', pattern: '〜ともなると',
  reading: '〜to mo naru to',
  meaning: 'ketika sudah mencapai level ..., kalau sudah sampai taraf ...; begitu sudah menjadi ...',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなると',
  desc: '<b>〜ともなると</b> menyatakan bahwa ketika seseorang atau sesuatu mencapai suatu level, status, atau tahapan tertentu, hal-hal tertentu secara alami muncul atau diharapkan. Menekankan perubahan yang terjadi seiring dengan naiknya level atau status.',
  nuance: null,
  examples: [
    { jp: '社会人3年目<b>ともなると</b>、ある程度の責任ある仕事を任されるようになる。', id: 'Begitu sudah tahun ketiga bekerja, secara alami mulai dipercaya dengan pekerjaan yang cukup bertanggung jawab.' },
    { jp: 'プロのアスリート<b>ともなると</b>、練習の質も量も一般人とは全然違う。', id: 'Kalau sudah menjadi atlet profesional, baik kualitas maupun kuantitas latihannya sangat berbeda dari orang biasa.' },
  ],
  see_also_grammar: ['gn1-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00078'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00102', level: 'n1', pattern: '〜ともなれば',
  reading: '〜to mo nareba',
  meaning: 'kalau sudah menjadi ..., jika sudah berada di posisi/level ...; pada kondisi seperti itu sudah sewajarnya ...',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなれば',
  desc: '<b>〜ともなれば</b> menyatakan bahwa jika seseorang atau sesuatu mencapai level atau status tertentu, maka suatu sikap, tanggung jawab, atau situasi tertentu sudah sewajarnya ada atau diharapkan muncul. Lebih normatif dari 〜ともなると.',
  nuance: null,
  examples: [
    { jp: '一国のリーダー<b>ともなれば</b>、言葉の一つ一つに責任が伴う。', id: 'Jika sudah menjadi pemimpin suatu negara, setiap kata yang diucapkan membawa tanggung jawab.' },
    { jp: '親<b>ともなれば</b>、子どもの将来を真剣に考えるものだ。', id: 'Kalau sudah menjadi orang tua, sudah sewajarnya memikirkan masa depan anak dengan serius.' },
  ],
  see_also_grammar: ['gn1-00101'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00077'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00110', level: 'n1', pattern: '〜いかんによっては / 〜いかんによらず',
  reading: '〜ikan ni yotte wa / 〜ikan ni yorazu',
  meaning: 'tergantung bagaimana ..., bergantung pada keadaan ...; (varian: terlepas dari bagaimana pun)',
  cat: 'conditional-tara',
  connection: 'N + いかんによっては / いかんによって / いかんによらず / いかんを問わず',
  desc: '<b>〜いかんによっては</b> menyatakan bahwa hasil atau tindakan tergantung pada kondisi atau keadaan yang disebutkan. 〜いかんによらず / いかんを問わず adalah varian dengan makna sebaliknya: terlepas dari bagaimana pun keadaannya, tetap berlaku.',
  nuance: null,
  examples: [
    { jp: '交渉の結果<b>いかんによっては</b>、契約を白紙に戻すこともありえる。', id: 'Tergantung bagaimana hasil negosiasi, ada kemungkinan kontrak akan dibatalkan sepenuhnya.' },
    { jp: '成績<b>いかんによっては</b>、奨学金の継続が難しくなる場合があります。', id: 'Bergantung pada bagaimana nilai akademisnya, perpanjangan beasiswa mungkin menjadi sulit.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00055', 'gn2-00143'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00114', level: 'n1', pattern: '〜をもってすれば',
  reading: '〜wo motte sureba',
  meaning: 'kalau menggunakan ..., dengan kemampuan/kekuatan ..., bermodal ...',
  cat: 'conditional-tara',
  connection: 'N + をもってすれば',
  desc: '<b>〜をもってすれば</b> menyatakan bahwa dengan menggunakan kemampuan, kekuatan, atau sumber daya tertentu, sesuatu yang mungkin tampak sulit pun dapat tercapai. Sering mengandung nuansa pujian atau pengakuan terhadap kemampuan yang disebut.',
  nuance: null,
  examples: [
    { jp: '彼女の能力<b>をもってすれば</b>、この難題も解決できるはずだ。', id: 'Dengan kemampuan yang ia miliki, masalah sulit ini pun seharusnya bisa diselesaikan.' },
    { jp: '最新技術<b>をもってすれば</b>、不可能なことはない。', id: 'Dengan teknologi terkini, tidak ada yang tidak mungkin.' }
  ],
  see_also_grammar: ['gn1-00115'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00003', 'gn1-00066', 'gn1-00115'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── MODALITY (19) ───────────────────────────────────

{
  id: 'gn1-00022', level: 'n1', pattern: '〜とみえて／〜とみえる', reading: '〜to miete / to mieru',
  meaning: 'kelihatannya ... / tampaknya ... (berdasarkan observasi)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + とみえて / とみえる',
  desc: '<b>〜とみえる</b> menyatakan dugaan yang didasarkan pada bukti yang dapat diamati secara langsung. <b>〜とみえて</b> digunakan sebagai klausa penghubung: "kelihatannya X, karenanya Y."',
  nuance: null,
  examples: [
    { jp: '疲れている<b>とみえて</b>、彼はすぐ眠ってしまった。', id: 'Kelihatannya dia kelelahan, karena langsung tertidur.' },
    { jp: '気に入った<b>とみえて</b>、何度も読み返している。', id: 'Tampaknya dia menyukainya, karena berkali-kali dibaca ulang.' },
    { jp: '雨が降る<b>とみえる</b>、空が暗くなってきた。', id: 'Kelihatannya akan hujan, langit mulai gelap.' }
  ],
  see_also_grammar: ['gn1-00021'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00085', 'gn1-00021'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00030', level: 'n1', pattern: '〜限りだ', reading: '〜kagiri da',
  meaning: 'betapa ... / sungguh ... (ungkapan emosi intens, orang pertama)',
  cat: 'sentence-final-modality',
  connection: 'Adj-i / Adj-na（な形）+ 限りだ',
  desc: '<b>〜限りだ</b> mengungkapkan perasaan yang sangat intens dari sudut pandang orang pertama — baik positif maupun negatif. "Sungguh X rasanya." Biasanya digunakan untuk emosi seperti kebahagiaan, keharuan, rasa malu, atau sedih.',
  nuance: null,
  examples: [
    { jp: 'このような賞をいただき、光栄の<b>限りです</b>。', id: 'Menerima penghargaan seperti ini, sungguh merupakan kehormatan yang tiada tara.' },
    { jp: '皆さんの応援が、うれしい<b>限りです</b>。', id: 'Dukungan dari semua orang ini sungguh membahagiakan.' },
    { jp: 'こんな失敗をしてしまい、恥ずかしい<b>限りだ</b>。', id: 'Melakukan kesalahan seperti ini, sungguh sangat memalukan.' }
  ],
  see_also_grammar: ['gn1-00029'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn1-00029'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00051', level: 'n1', pattern: '〜べくして', reading: '〜beku shite',
  meaning: 'sudah seharusnya demikian / wajar terjadi ... (keniscayaan)',
  cat: 'sentence-final-modality',
  connection: 'V-dict + べくして + V (kata kerja sama)',
  desc: '<b>〜べくして</b> menyatakan bahwa hasil Y terjadi karena memang sudah seharusnya demikian — bukan kebetulan, melainkan keniscayaan logis atau alami. Selalu menggunakan kata kerja yang sama di depan dan belakang.',
  nuance: null,
  examples: [
    { jp: '彼は勝つ<b>べくして</b>勝った — 準備が違った。', id: 'Dia menang karena memang sudah seharusnya menang — persiapannya berbeda.' },
    { jp: 'あの事故は起こる<b>べくして</b>起きた悲劇だった。', id: 'Kecelakaan itu adalah tragedi yang sudah seharusnya terjadi.' },
    { jp: '二人は出会う<b>べくして</b>出会ったのかもしれない。', id: 'Mungkin keduanya bertemu karena memang sudah ditakdirkan untuk bertemu.' }
  ],
  see_also_grammar: ['gn1-00050'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00050', 'gn3-00175', 'gn3-00177'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00052', level: 'n1', pattern: '〜まじき', reading: '〜majiki',
  meaning: 'tidak sepatutnya / tidak pantas dilakukan oleh ... (literary)',
  cat: 'permission-prohibition',
  connection: 'V-dict + まじき + N',
  desc: '<b>〜まじき</b> adalah bentuk klasik (dari まじ = larangan klasik) yang mengekspresikan sesuatu yang seharusnya tidak dilakukan oleh seseorang dalam posisi atau status tertentu.',
  nuance: null,
  examples: [
    { jp: 'それは教師にある<b>まじき</b>行為だ。', id: 'Itu adalah tindakan yang tidak pantas dilakukan oleh seorang guru.' },
    { jp: '指導者にある<b>まじき</b>発言が批判を呼んだ。', id: 'Pernyataan yang tidak patut diucapkan pemimpin itu menuai kritik.' },
    { jp: '医師にある<b>まじき</b>態度で患者に接した。', id: 'Dia bersikap kepada pasien dengan cara yang tidak layak bagi seorang dokter.' }
  ],
  see_also_grammar: ['gn1-00053'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00070', 'gn1-00121', 'gn4-00027', 'gn1-00053', 'gn1-00116'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00053', level: 'n1', pattern: '〜ともあろう', reading: '〜to mo arou',
  meaning: 'seorang yang sekaliber ... seharusnya tidak ... (mengecam)',
  cat: 'sentence-final-modality',
  connection: 'N + ともあろう + N (jabatan/status)',
  desc: '<b>〜ともあろう</b> mengekspresikan kekecewaan atau kecaman bahwa seseorang dengan status/kaliber X melakukan sesuatu yang tidak sesuai dengan harapan. Menekankan kontras antara status tinggi dan tindakan yang rendah.',
  nuance: null,
  examples: [
    { jp: '社長<b>ともあろう</b>人が、そんな失礼なことを言うとは。', id: 'Tidak disangka seseorang sekaliber direktur utama mengucapkan hal yang tidak sopan seperti itu.' },
    { jp: 'プロ<b>ともあろう</b>者が、基本的なミスをするとは情けない。', id: 'Sungguh memalukan bahwa seseorang yang mengaku profesional melakukan kesalahan dasar seperti itu.' },
    { jp: '教授<b>ともあろう</b>方が、そんな非論理的な意見を述べるとは驚きだ。', id: 'Sungguh mengejutkan bahwa seseorang sekaliber profesor mengemukakan pendapat yang tidak logis seperti itu.' }
  ],
  see_also_grammar: ['gn1-00052'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00052', 'gn1-00116', 'gn2-00122'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00057', level: 'n1', pattern: '〜ずにはおかない', reading: '〜zu ni wa okanai',
  meaning: 'pasti akan ... / tidak bisa tidak ... (tak terelakkan)',
  cat: 'obligation-necessity',
  connection: 'V-neg (ず形) + にはおかない',
  desc: '<b>〜ずにはおかない</b> menyatakan bahwa sesuatu pasti terjadi atau dilakukan — tidak bisa dihindari, baik karena dorongan kuat dari dalam maupun kekuatan luar yang mendesak.',
  nuance: null,
  examples: [
    { jp: 'この映画は観る者を感動させ<b>ずにはおかない</b>。', id: 'Film ini pasti akan mengharukan siapapun yang menontonnya.' },
    { jp: '彼の演奏は聴く人を感動させ<b>ずにはおかない</b>力があった。', id: 'Permainannya memiliki kekuatan yang pasti menggerakkan hati siapapun yang mendengar.' },
    { jp: 'この事件は社会に反省を促さ<b>ずにはおかない</b>だろう。', id: 'Kasus ini pasti akan mendorong masyarakat untuk introspeksi.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00072', 'gn1-00072'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00068', level: 'n1', pattern: '〜ずにはすまない',
  reading: '〜zu ni wa sumanai',
  meaning: 'tidak bisa begitu saja tanpa melakukan ... / situasi sosial menuntut untuk ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ずにはすまない (suru → せずにはすまない)',
  desc: '<b>〜ずにはすまない</b> menyatakan bahwa seseorang tidak dapat menghindari suatu tindakan karena tekanan sosial, moral, atau situasional. Ada perasaan bahwa norma atau harapan orang lain mengharuskan tindakan tersebut.',
  nuance: null,
  examples: [
    { jp: '迷惑をかけた以上、謝ら<b>ずにはすまない</b>。', id: 'Karena sudah merepotkan, tidak bisa begitu saja tanpa meminta maaf.' },
    { jp: 'こんな大きなミスをしたら、責任を取ら<b>ずにはすまない</b>だろう。', id: 'Kalau sudah membuat kesalahan sebesar ini, pasti tidak bisa lepas dari tanggung jawab.' }
  ],
  see_also_grammar: ['gn1-00069', 'gn1-00072'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00069', 'gn1-00072', 'gn1-00133'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00069', level: 'n1', pattern: '〜ないではすまない',
  reading: '〜nai de wa sumanai',
  meaning: 'tidak bisa tidak melakukan ... / tidak bisa lepas dari keharusan ...',
  cat: 'obligation-necessity',
  connection: 'V-nai + ではすまない',
  desc: '<b>〜ないではすまない</b> memiliki makna yang sangat mirip dengan 〜ずにはすまない — menyatakan bahwa suatu tindakan tidak dapat dihindari karena tuntutan sosial atau moral.',
  nuance: null,
  examples: [
    { jp: 'こんなことをされたら、怒ら<b>ないではすまない</b>。', id: 'Kalau diperlakukan seperti ini, tidak mungkin bisa tidak marah.' },
    { jp: '彼女に直接謝ら<b>ないではすまない</b>状況だ。', id: 'Ini situasi di mana tidak bisa tidak minta maaf langsung padanya.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00072'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00068', 'gn1-00072', 'gn5-00045'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00071', level: 'n1', pattern: '〜を禁じ得ない',
  reading: '〜wo kinjienaI',
  meaning: 'tidak bisa menahan ... / tidak kuasa menahan (perasaan yang muncul spontan)',
  cat: 'sentence-final-modality',
  connection: 'N (kata benda perasaan) + を禁じ得ない',
  desc: '<b>〜を禁じ得ない</b> menyatakan bahwa seseorang tidak mampu menahan perasaan tertentu yang muncul secara spontan. Kata benda yang mendahului hampir selalu adalah perasaan: 感動, 涙, 怒り, 遺憾, 痛恨.',
  nuance: null,
  examples: [
    { jp: 'その報道を聞いて、怒り<b>を禁じ得なかった</b>。', id: 'Mendengar laporan itu, tidak bisa menahan amarah.' },
    { jp: '被災地の映像を見て、涙<b>を禁じ得ない</b>。', id: 'Melihat tayangan daerah bencana, tidak kuasa menahan air mata.' }
  ],
  see_also_grammar: ['gn1-00070', 'gn1-00064'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00131', 'gn1-00064', 'gn2-00072'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00072', level: 'n1', pattern: '〜ないわけにはいかない',
  reading: '〜nai wake ni wa ikanai',
  meaning: 'tidak bisa tidak melakukan ... / ada alasan yang mengharuskan melakukan ...',
  cat: 'obligation-necessity',
  connection: 'V-nai + わけにはいかない',
  desc: '<b>〜ないわけにはいかない</b> menyatakan bahwa suatu tindakan tidak bisa dihindari karena ada alasan kuat — logis, moral, atau sosial — yang mengharuskannya. Seseorang merasa tidak mungkin melewatkan atau menolak tindakan tersebut.',
  nuance: null,
  examples: [
    { jp: '彼には本当のことを話さ<b>ないわけにはいかない</b>。', id: 'Tidak bisa tidak memberitahu dia yang sebenarnya.' },
    { jp: '招待されたのだから、行か<b>ないわけにはいかない</b>。', id: 'Karena sudah diundang, tidak bisa tidak pergi.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00069', 'gn1-00073'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00069', 'gn1-00133', 'gn3-00036', 'gn1-00057', 'gn1-00068'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00081', level: 'n1', pattern: '〜ずにはおかない',
  reading: '〜zu ni wa okanai',
  meaning: 'pasti akan ..., tidak bisa tidak menyebabkan ...; tekad kuat untuk tidak membiarkan sesuatu berlalu begitu saja',
  cat: 'sentence-final-modality',
  connection: 'V-nai-stem + ずにはおかない（する→せずにはおかない）',
  desc: '<b>〜ずにはおかない</b> menyatakan dua makna utama: (1) sesuatu pasti/niscaya menimbulkan efek tertentu pada orang lain atau keadaan — efek yang tak terhindarkan; (2) tekad kuat pembicara bahwa ia tidak akan membiarkan sesuatu terjadi tanpa tindakan. Kata kerja sebelum pola ini hampir selalu bersifat kausal.',
  nuance: null,
  examples: [
    { jp: '彼女の演技は、観客を感動させ<b>ずにはおかない</b>ほど素晴らしかった。', id: 'Aktingnya begitu luar biasa sehingga pasti membuat para penonton tersentuh tanpa terkecuali.' },
    { jp: 'あんな不正を見たら、指摘せ<b>ずにはおかない</b>。', id: 'Kalau melihat kecurangan seperti itu, aku pasti tidak akan membiarkannya tanpa menegur.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00072', 'gn1-00133'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00116', level: 'n1', pattern: '〜たるもの',
  reading: '〜taru mono',
  meaning: 'sebagai ..., orang yang berposisi sebagai ... (seharusnya bertindak demikian)',
  cat: 'obligation-necessity',
  connection: 'N + たるもの',
  desc: '<b>〜たるもの</b> menyatakan bahwa seseorang yang memegang posisi, jabatan, atau peran tertentu seharusnya berperilaku sesuai standar yang diharapkan dari posisi tersebut. Biasanya diikuti oleh pernyataan tentang kewajiban atau standar moral/profesional.',
  nuance: null,
  examples: [
    { jp: '教師<b>たるもの</b>、常に公正であるべきだ。', id: 'Sebagai seorang guru, sudah sepatutnya selalu bersikap adil.' },
    { jp: '社会人<b>たるもの</b>、礼儀を忘れてはならない。', id: 'Sebagai orang yang telah terjun ke masyarakat, jangan pernah melupakan sopan santun.' },
    { jp: 'リーダー<b>たるもの</b>、困難な時こそ率先して行動すべきだ。', id: 'Sebagai seorang pemimpin, justru di saat sulit harus bertindak sebagai pelopor.' }
  ],
  see_also_grammar: ['gn1-00117'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00144', 'gn1-00121', 'gn1-00052', 'gn1-00053', 'gn1-00117'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00131', level: 'n1', pattern: '〜てやまない',
  reading: '〜te yamanai',
  meaning: 'tidak pernah berhenti ..., terus-menerus merasakan ..., dari lubuk hati ...',
  cat: 'sentence-final-modality',
  connection: 'V-te + やまない',
  desc: '<b>〜てやまない</b> menyatakan bahwa perasaan atau sikap tertentu terus berlanjut tanpa henti karena sangat kuat. Digunakan khusus untuk ekspresi perasaan positif yang mendalam seperti cinta, harapan, kekaguman, atau dukungan. Memberikan kesan ketulusan dan kedalaman emosional.',
  nuance: null,
  examples: [
    { jp: '私は故郷を愛し<b>てやまない</b>。', id: 'Aku mencintai kampung halamanku dari lubuk hati yang paling dalam.' },
    { jp: '皆様のご活躍を願っ<b>てやまない</b>。', id: 'Kami terus-menerus mendoakan kesuksesan dan kemajuan Anda semua.' },
    { jp: '恩師への敬意は、今も変わらずあっ<b>てやまない</b>。', id: 'Rasa hormat kepada guru yang berjasa tidak pernah pudar hingga kini.' }
  ],
  see_also_grammar: ['gn1-00132'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00071', 'gn2-00073', 'gn1-00132'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00132', level: 'n1', pattern: '〜を禁じ得ない',
  reading: '〜wo kinjienai',
  meaning: 'tidak bisa tidak merasakan ..., tidak tertahankan (rasa ...), diliputi rasa ...',
  cat: 'sentence-final-modality',
  connection: 'N (ekspresi emosi) + を禁じ得ない',
  desc: '<b>〜を禁じ得ない</b> menyatakan bahwa pembicara tidak mampu menahan atau menekan suatu perasaan karena begitu kuat. Berbeda dari 〜てやまない, pola ini sering digunakan untuk ekspresi emosi baik positif maupun negatif, termasuk indignasi, haru, kekhawatiran, atau simpati.',
  nuance: null,
  examples: [
    { jp: 'その知らせを聞いて、悲しみ<b>を禁じ得なかった</b>。', id: 'Setelah mendengar kabar itu, aku tidak bisa menahan rasa sedih.' },
    { jp: '子どもたちの努力に、感動<b>を禁じ得ない</b>。', id: 'Menghadapi usaha keras anak-anak itu, aku tidak bisa menahan rasa haru.' },
    { jp: '彼の無責任な態度には、怒り<b>を禁じ得ない</b>。', id: 'Menyaksikan sikapnya yang tidak bertanggung jawab, aku tidak bisa menahan amarah.' }
  ],
  see_also_grammar: ['gn1-00131', 'gn1-00130'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00131', 'gn1-00064', 'gn2-00072'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00133', level: 'n1', pattern: '〜ざるを得ない',
  reading: '〜zaru wo enai',
  meaning: 'terpaksa ..., tidak bisa tidak ..., tidak ada pilihan selain ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ざるを得ない (suru → せざるを得ない)',
  desc: '<b>〜ざるを得ない</b> menyatakan bahwa meskipun tidak diinginkan, seseorang terpaksa melakukan sesuatu karena tekanan situasi atau tidak ada pilihan lain. Mengandung nuansa keterpaksaan dan ketidakleluasaan.',
  nuance: null,
  examples: [
    { jp: '証拠が揃った以上、容疑者を逮捕<b>せざるを得ない</b>。', id: 'Karena buktinya sudah lengkap, tidak ada pilihan selain menangkap tersangka.' },
    { jp: '予算の削減で、プロジェクトを縮小<b>せざるを得なくなった</b>。', id: 'Karena pemotongan anggaran, kami terpaksa memperkecil skala proyek.' },
    { jp: '状況を考えると、同意<b>せざるを得ない</b>。', id: 'Kalau mempertimbangkan situasinya, aku tidak punya pilihan selain menyetujui.' }
  ],
  see_also_grammar: ['gn1-00134'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00036', 'gn1-00072', 'gn3-00138', 'gn2-00072', 'gn2-00082', 'gn2-00155', 'gn2-00179', 'gn2-00180', 'gn1-00134', 'gn1-00068', 'gn1-00081', 'gn1-00073'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00148',
  level: 'n1',
  pattern: '〜と見られる',
  reading: '〜to mirareru',
  meaning: 'dianggap sebagai ..., dipandang ..., diperkirakan ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + と見られる',
  desc: '<b>〜と見られる</b> menyatakan bahwa sesuatu dipandang, diperkirakan, atau dinilai demikian oleh banyak orang atau oleh pengamat secara umum. Sering digunakan dalam berita, laporan, dan analisis untuk menyatakan perkiraan atau penilaian yang belum dikonfirmasi secara resmi.',
  nuance: null,
  examples: [
    { jp: '事故の原因は機器の故障<b>と見られる</b>。', id: 'Penyebab kecelakaan diperkirakan adalah kerusakan alat.' },
    { jp: '被害総額は数十億円に上る<b>と見られている</b>。', id: 'Total kerugian dipandang bisa mencapai puluhan miliar yen.' },
    { jp: '彼は次の候補者として有力<b>と見られている</b>。', id: 'Dia dipandang sebagai kandidat terkuat berikutnya.' },
  ],
  see_also_grammar: ['gn1-00149', 'gn1-00150', 'gn1-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00149', 'gn1-00152', 'gn5-00050', 'gn4-00066', 'gn1-00147'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00149',
  level: 'n1',
  pattern: '〜とされる',
  reading: '〜to sareru',
  meaning: 'dikatakan bahwa ..., dianggap ..., dipandang secara umum ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + とされる',
  desc: '<b>〜とされる</b> menyatakan bahwa sesuatu dianggap atau digolongkan demikian berdasarkan penilaian umum, konvensi, atau otoritas. Menyampaikan anggapan yang bersifat konsensus atau sudah diterima, tanpa harus menyebutkan sumber spesifik.',
  nuance: null,
  examples: [
    { jp: 'この地域は危険区域<b>とされる</b>。', id: 'Kawasan ini dianggap sebagai zona berbahaya.' },
    { jp: '彼の発言は問題あり<b>とされた</b>。', id: 'Pernyataannya dinilai bermasalah.' },
    { jp: 'その薬は副作用が少ない<b>とされている</b>。', id: 'Obat tersebut dianggap memiliki efek samping yang sedikit.' },
  ],
  see_also_grammar: ['gn1-00148', 'gn1-00150', 'gn1-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00150', 'gn1-00148', 'gn1-00152', 'gn1-00151'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00150',
  level: 'n1',
  pattern: '〜といわれる',
  reading: '〜to iwareru',
  meaning: 'dikatakan bahwa ..., konon ..., menurut orang ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + といわれる',
  desc: '<b>〜といわれる</b> menyatakan bahwa sesuatu dikatakan atau dipercaya demikian oleh banyak orang atau oleh tradisi. Menyampaikan informasi yang beredar luas atau diturunkan secara budaya, tanpa mengklaim kebenarannya secara langsung.',
  nuance: null,
  examples: [
    { jp: '富士山は日本の象徴<b>といわれる</b>。', id: 'Gunung Fuji konon adalah simbol Jepang.' },
    { jp: '彼女は天才<b>といわれている</b>が、本人は謙遜している。', id: 'Dia dikatakan sebagai jenius, namun ia sendiri merendah.' },
    { jp: 'この泉の水を飲むと長生きできる<b>といわれている</b>。', id: 'Konon, meminum air dari mata air ini bisa membuat panjang umur.' },
  ],
  see_also_grammar: ['gn1-00149', 'gn1-00148', 'gn1-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00149', 'gn4-00085'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00151',
  level: 'n1',
  pattern: '〜とされている',
  reading: '〜to sarete iru',
  meaning: 'sudah diakui bahwa ..., berlaku anggapan bahwa ..., secara umum dipandang ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + とされている',
  desc: '<b>〜とされている</b> menyatakan bahwa suatu anggapan atau penilaian sudah berlaku dan masih diterima hingga saat ini. Menekankan aspek kondisi yang berkelanjutan (〜ている), sehingga menunjukkan bahwa konsensus atau klasifikasi tersebut masih aktif.',
  nuance: null,
  examples: [
    { jp: 'この物質は有害<b>とされている</b>。', id: 'Zat ini saat ini berlaku anggapan bahwa ia berbahaya.' },
    { jp: '彼は業界のパイオニア<b>とされている</b>。', id: 'Ia diakui sebagai pelopor di industri ini.' },
    { jp: 'その慣行は時代遅れ<b>とされている</b>。', id: 'Praktik tersebut sudah dipandang ketinggalan zaman.' },
  ],
  see_also_grammar: ['gn1-00149', 'gn1-00150', 'gn1-00148'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00149', 'gn2-00206', 'gn2-00205', 'gn1-00152'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── NEGATION-EXTENT (34) ───────────────────────────────────

{
  id: 'gn1-00004', level: 'n1', pattern: '〜にして', reading: '〜ni shite',
  meaning: 'sekaligus ... / baru pada tahap ... (klasik/keigo)',
  cat: 'extent-degree',
  connection: 'N + にして',
  desc: '<b>〜にして</b> dalam konteks N1 menyatakan dua hal: (1) "sekaligus" — seseorang yang memiliki dua sifat/peran sekaligus (詩人にして哲学者 = penyair sekaligus filsuf); atau (2) "baru pada kondisi itu baru bisa terjadi" — menekankan betapa tingginya syarat yang dibutuhkan.',
  nuance: null,
  examples: [
    { jp: '彼は作家<b>にして</b>外交官でもあった。', id: 'Dia adalah seorang penulis sekaligus diplomat.' },
    { jp: '80歳<b>にして</b>、まだ現役で働いている。', id: 'Di usia 80 tahun pun, dia masih aktif bekerja.' },
    { jp: 'この境地は長年の修行<b>にして</b>初めて達せるものだ。', id: 'Tataran ini baru bisa dicapai setelah bertahun-tahun berlatih.' }
  ],
  see_also_grammar: ['gn1-00005', 'gn1-00018'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00018'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00011', level: 'n1', pattern: '〜ながらに', reading: '〜nagara ni',
  meaning: 'dengan tetap dalam kondisi ... / sejak ... hingga sekarang',
  cat: 'extent-degree',
  connection: 'N / V-stem + ながらに（して）',
  desc: '<b>〜ながらに</b> menyatakan bahwa sesuatu terjadi atau ada dalam keadaan yang tetap/tidak berubah. Bisa berarti "sejak lahir" (生まれながらに) atau "dalam kondisi itu" (涙ながらに = sembari berurai air mata).',
  nuance: null,
  examples: [
    { jp: '彼女は生まれ<b>ながらに</b>才能を持っていた。', id: 'Dia memiliki bakat sejak lahir.' },
    { jp: '涙<b>ながらに</b>、別れを告げた。', id: 'Dia mengucapkan selamat tinggal sembari berurai air mata.' },
    { jp: 'い<b>ながらにして</b>、世界中の情報にアクセスできる。', id: 'Tanpa beranjak ke mana-mana, kita bisa mengakses informasi dari seluruh dunia.' }
  ],
  see_also_grammar: ['gn1-00010'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00184', 'gn1-00185'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00015', level: 'n1', pattern: '〜に至っては', reading: '〜ni itte wa',
  meaning: 'bahkan dalam hal ... / lebih parah lagi ...',
  cat: 'extent-degree',
  connection: 'N + に至っては',
  desc: '<b>〜に至っては</b> digunakan untuk memperkenalkan kasus yang paling ekstrem dalam suatu rangkaian, biasanya untuk memperkuat argumen atau menunjukkan betapa parahnya situasi. "Bahkan X pun ..."',
  nuance: null,
  examples: [
    { jp: '他の部員はまだいいが、彼女<b>に至っては</b>一度も練習に来ない。', id: 'Anggota lain masih bisa dimaklumi, tapi bahkan dia tidak pernah datang latihan sekali pun.' },
    { jp: '子供はもちろん、大人<b>に至っては</b>もっとひどい行動をしていた。', id: 'Anak-anak sudah tentu, bahkan orang dewasa pun bertindak lebih parah.' },
    { jp: '部長も問題があるが、社長<b>に至っては</b>完全に無責任だ。', id: 'Manajer pun ada masalah, tapi bahkan direkturnya benar-benar tidak bertanggung jawab.' }
  ],
  see_also_grammar: ['gn1-00016', 'gn1-00017'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00016', 'gn2-00181', 'gn1-00097'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00016', level: 'n1', pattern: '〜に至るまで', reading: '〜ni itaru made',
  meaning: 'sampai kepada ... / bahkan hingga ...',
  cat: 'extent-degree',
  connection: 'N + に至るまで',
  desc: '<b>〜に至るまで</b> menyatakan jangkauan yang sangat luas, hingga menyentuh hal-hal yang paling detail atau tidak terduga sekalipun. Sering digunakan bersama 〜から untuk membentuk "dari ... hingga ...".',
  nuance: null,
  examples: [
    { jp: '日常の食事から服装<b>に至るまで</b>、彼女に管理されている。', id: 'Dari makan sehari-hari hingga pakaian, semuanya dikontrol olehnya.' },
    { jp: '会社の経営方針から細かいルール<b>に至るまで</b>、彼が決めている。', id: 'Dari kebijakan manajemen hingga aturan kecil, semuanya dia yang memutuskan.' },
    { jp: '歴史的な出来事から個人の生活<b>に至るまで</b>、詳しく書かれている。', id: 'Ditulis secara rinci dari peristiwa bersejarah hingga kehidupan pribadi.' }
  ],
  see_also_grammar: ['gn1-00015', 'gn1-00017'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00011', 'gn1-00015', 'gn1-00017', 'gn1-00096'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00025', level: 'n1', pattern: '〜ならでは', reading: '〜nara de wa',
  meaning: 'hanya bisa ada pada ... / khas dari ... (tidak ada di tempat lain)',
  cat: 'extent-degree',
  connection: 'N + ならでは（の + N / で + predicate）',
  desc: '<b>〜ならでは</b> menyatakan bahwa sesuatu hanya bisa ada, dilakukan, atau dirasakan dalam konteks atau pada entitas yang disebutkan. Mengandung nuansa keistimewaan dan keunikan yang positif.',
  nuance: null,
  examples: [
    { jp: '京都<b>ならでは</b>の風景が広がっている。', id: 'Terbentang pemandangan yang hanya bisa ditemukan di Kyoto.' },
    { jp: 'これはプロ<b>ならでは</b>の技だ。', id: 'Ini adalah teknik yang hanya dimiliki oleh seorang profesional.' },
    { jp: '手作り<b>ならでは</b>の温かさがある。', id: 'Ada kehangatan yang hanya bisa ada pada barang buatan tangan.' }
  ],
  see_also_grammar: ['gn1-00026'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00026'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00026', level: 'n1', pattern: '〜ならではの', reading: '〜nara de wa no',
  meaning: 'yang khas/unik dari ... (sebagai pengubah nomina)',
  cat: 'extent-degree',
  connection: 'N + ならではの + N',
  desc: '<b>〜ならではの</b> adalah varian atributif (pengubah nomina) dari 〜ならでは, yang menyatakan keistimewaan eksklusif suatu entitas. Selalu diikuti nomina yang dijelaskannya.',
  nuance: null,
  examples: [
    { jp: '日本<b>ならではの</b>おもてなし文化に感動した。', id: 'Aku terkesan dengan budaya penyambutan tulus yang khas Jepang.' },
    { jp: 'このシェフ<b>ならではの</b>料理が楽しめる。', id: 'Kamu bisa menikmati masakan yang khas hanya dari chef ini.' },
    { jp: '子供時代<b>ならではの</b>無邪気な笑顔が忘れられない。', id: 'Senyum polos yang hanya ada di masa kanak-kanak tidak bisa terlupakan.' }
  ],
  see_also_grammar: ['gn1-00025'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00025'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00059', level: 'n1', pattern: '〜極まる / 〜極まりない', reading: '〜kiwamaru / 〜kiwamari nai',
  meaning: 'sungguh ... / keterlaluan / mencapai puncak dari ... (ekspresi intens)',
  cat: 'extent-degree',
  connection: 'na-adj語幹 + 極まる / 極まりない',
  desc: '<b>〜極まる</b> dan <b>〜極まりない</b> menyatakan bahwa sifat X mencapai puncak atau tingkatan tertinggi. Kedua bentuk memiliki makna yang hampir sama, namun 極まりない sedikit lebih umum dalam penggunaan modern.',
  nuance: null,
  examples: [
    { jp: 'あの態度は失礼<b>極まりない</b>。', id: 'Sikap itu benar-benar tidak sopan keterlaluan.' },
    { jp: '命綱なしで登山するとは、危険<b>極まる</b>行為だ。', id: 'Mendaki gunung tanpa tali pengaman adalah tindakan yang sungguh berbahaya.' },
    { jp: '公の場でそんな発言をするとは、無礼<b>極まりない</b>。', id: 'Mengucapkan hal seperti itu di tempat umum sungguh tidak beradab keterlaluan.' }
  ],
  see_also_grammar: ['gn1-00060'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00060'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00060', level: 'n1', pattern: '〜の至り', reading: '〜no itari',
  meaning: 'puncak dari ... / sungguh merupakan ... (formal/ceremonial)',
  cat: 'extent-degree',
  connection: 'N + の至り',
  desc: '<b>〜の至り</b> menyatakan bahwa suatu perasaan atau kondisi mencapai puncak tertingginya. Digunakan dalam konteks ceremonial atau formal untuk mengungkapkan perasaan yang sangat mendalam dengan cara yang elegan.',
  nuance: null,
  examples: [
    { jp: 'このような賞をいただき、光栄<b>の至り</b>でございます。', id: 'Mendapatkan penghargaan seperti ini sungguh merupakan kehormatan yang tiada tara.' },
    { jp: '皆様の前でご挨拶できますこと、感激<b>の至り</b>です。', id: 'Dapat menyampaikan sambutan di hadapan semua orang sungguh merupakan kebahagiaan yang luar biasa.' },
    { jp: 'あの頃の失礼な行動は、若気<b>の至り</b>だったと今は反省しております。', id: 'Tingkah laku yang tidak sopan di masa itu kini kusadari sebagai kecerobohan masa muda.' }
  ],
  see_also_grammar: ['gn1-00059'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00064', 'gn1-00059'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00061', level: 'n1', pattern: '〜に足る / 〜に足りる',
  reading: '〜ni taru / 〜ni tariru',
  meaning: 'layak untuk ... / cukup untuk ... (formal)',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + に足る',
  desc: '<b>〜に足る</b> menyatakan bahwa seseorang atau sesuatu memiliki kualitas yang cukup untuk memenuhi suatu standar atau pantas mendapatkan sesuatu. Varian klasik adalah 〜に足る, lebih modern 〜に足りる.',
  nuance: null,
  examples: [
    { jp: '彼女の業績は称賛<b>に足る</b>ものだ。', id: 'Prestasinya memang layak mendapat pujian.' },
    { jp: 'この作品は繰り返し鑑賞<b>に足る</b>傑作だ。', id: 'Karya ini adalah mahakarya yang layak dinikmati berulang kali.' },
    { jp: '信頼<b>に足る</b>人物を選ぶことが重要だ。', id: 'Penting untuk memilih orang yang layak dipercaya.' }
  ],
  see_also_grammar: ['gn1-00062', 'gn1-00063'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00128', 'gn1-00062'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00062', level: 'n1', pattern: '〜に足らない / 〜に足りない',
  reading: '〜ni taranai / 〜ni tarinai',
  meaning: 'tidak layak untuk ... / tidak perlu dirisaukan / tidak sebanding dengan ...',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + に足らない',
  desc: '<b>〜に足らない</b> adalah bentuk negatif dari 〜に足る — menyatakan bahwa sesuatu tidak memiliki nilai atau kualitas yang cukup, tidak pantas dipertimbangkan, atau tidak perlu dicemaskan.',
  nuance: null,
  examples: [
    { jp: 'そんなことは気にする<b>に足らない</b>。', id: 'Hal seperti itu sama sekali tidak perlu dirisaukan.' },
    { jp: '彼の反論は取り上げる<b>に足りない</b>内容だった。', id: 'Sanggahan dia tidak berisi sesuatu yang layak dibahas.' }
  ],
  see_also_grammar: ['gn1-00061'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00061'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00064', level: 'n1', pattern: '〜にたえない',
  reading: '〜ni taenai',
  meaning: 'tidak tahan ... / tidak sanggup menahan ... / terlalu (buruk/menyedihkan) untuk ditoleransi',
  cat: 'negative',
  connection: 'V-dictionary / N + にたえない',
  desc: '<b>〜にたえない</b> adalah bentuk negatif dari 〜にたえる — menyatakan bahwa seseorang tidak sanggup menahan perasaan yang muncul, atau bahwa sesuatu terlalu buruk atau menyedihkan untuk ditonton atau didengarkan.',
  nuance: null,
  examples: [
    { jp: '皆様のご支援に感謝<b>にたえません</b>。', id: 'Sungguh tidak kuasa menahan rasa syukur atas dukungan semua pihak.' },
    { jp: 'あの映像は目<b>にたえない</b>残酷さだった。', id: 'Tayangan itu sungguh terlalu kejam untuk ditonton.' }
  ],
  see_also_grammar: ['gn1-00063', 'gn1-00071'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn1-00060', 'gn1-00071', 'gn1-00132'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00065', level: 'n1', pattern: '〜をおいてほかにない',
  reading: '〜wo oite hoka ni nai',
  meaning: 'tidak ada yang lain selain ... / hanya ... lah yang bisa / tidak ada pilihan kecuali ...',
  cat: 'extent-degree',
  connection: 'N + をおいて(ほかに)ない / をおいてほかにいない',
  desc: '<b>〜をおいてほかにない</b> menyatakan eksklusivitas mutlak — hanya satu pilihan, satu orang, atau satu hal yang paling tepat atau mampu. Kata ほかに bersifat opsional tapi sering digunakan.',
  nuance: null,
  examples: [
    { jp: 'この仕事を任せられるのは彼女<b>をおいてほかにいない</b>。', id: 'Tidak ada selain dia yang bisa dipercaya untuk pekerjaan ini.' },
    { jp: 'この危機を乗り越える方法は対話<b>をおいてほかにない</b>。', id: 'Tidak ada cara lain untuk mengatasi krisis ini selain dialog.' }
  ],
  see_also_grammar: ['gn1-00066'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00082'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00067', level: 'n1', pattern: '〜といったらない / 〜といったらありゃしない',
  reading: '〜to ittara nai / 〜to ittara arya shinai',
  meaning: 'sungguh sangat ... bukan main / ... -nya keterlaluan — ekspresi tingkat ekstrem',
  cat: 'extent-degree',
  connection: 'Adj-stem / N + といったらない; (kasual) といったらありゃしない',
  desc: '<b>〜といったらない</b> mengekspresikan tingkat yang ekstrem — bisa positif maupun negatif. Varian kasual 〜といったらありゃしない lebih emosional dan umumnya digunakan untuk mengeluh atau mengekspresikan hal negatif.',
  nuance: null,
  examples: [
    { jp: 'あの映画の感動<b>といったらなかった</b>。', id: 'Rasa haru dari film itu sungguh bukan main.' },
    { jp: '彼のマナーの悪さ<b>といったらありゃしない</b>。', id: 'Sungguh keterlaluan kelakuannya yang tidak sopan itu.' },
    { jp: 'あの夏の暑さ<b>といったらなかった</b>。', id: 'Panasnya musim panas itu sungguh luar biasa.' }
  ],
  see_also_grammar: ['gn1-00070', 'gn1-00071'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00073'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00080', level: 'n1', pattern: '〜ことなしに',
  reading: '〜koto nashi ni',
  meaning: 'tanpa melakukan ... / tanpa ... (prasyarat yang tidak dipenuhi)',
  cat: 'negative',
  connection: 'V-dictionary + ことなしに',
  desc: '<b>〜ことなしに</b> menyatakan bahwa suatu hal terjadi atau diupayakan tanpa melakukan tindakan tertentu. Sering digunakan untuk menyatakan bahwa sesuatu tidak mungkin terjadi tanpa prasyarat yang disebutkan.',
  nuance: null,
  examples: [
    { jp: '努力する<b>ことなしに</b>、成功はありえない。', id: 'Tanpa berusaha, kesuksesan adalah hal yang mustahil.' },
    { jp: '互いに話し合う<b>ことなしに</b>、問題は解決しない。', id: 'Tanpa saling berdiskusi, masalah tidak akan bisa diselesaikan.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00069'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00104', 'gn1-00171', 'gn2-00058', 'gn1-00091'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00082', level: 'n1', pattern: '〜をおいて（ほかに〜ない）',
  reading: '〜o oite (hoka ni 〜nai)',
  meaning: 'selain ..., tidak ada yang lain; kecuali ..., tidak ada pilihan',
  cat: 'negative',
  connection: 'N + をおいて（ほかに/他に）〜ない',
  desc: '<b>〜をおいて</b> digunakan untuk menyatakan bahwa tidak ada pilihan, orang, atau hal lain selain yang disebutkan. Selalu diikuti bentuk negatif. Menegaskan bahwa sesuatu/seseorang adalah satu-satunya yang paling tepat atau memungkinkan.',
  nuance: null,
  examples: [
    { jp: 'この難局を乗り越えられるのは、山田さん<b>をおいて</b>ほかにいない。', id: 'Tidak ada orang lain selain Yamada-san yang bisa melewati situasi sulit ini.' },
    { jp: '今<b>をおいて</b>、行動するタイミングはない。', id: 'Tidak ada waktu yang lebih tepat untuk bertindak selain sekarang.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00065'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00084', level: 'n1', pattern: '〜んばかりに / 〜んばかりの',
  reading: '〜n bakari ni / 〜n bakari no',
  meaning: 'hampir seperti ..., seolah-olah ..., sampai nyaris ...',
  cat: 'extent-degree',
  connection: 'V-nai-stem + んばかりに（修飾用: んばかりの + N）（する→せんばかりに）',
  desc: '<b>〜んばかりに</b> menyatakan bahwa sesuatu hampir terjadi atau terkesan sangat kuat seolah-olah akan terjadi, meski pada kenyataannya tidak terjadi. Digunakan untuk ekspresi yang hidup dan berlebihan — cocok untuk menggambarkan reaksi, ekspresi wajah, atau suasana yang sangat intens.',
  nuance: null,
  examples: [
    { jp: '彼女は今にも泣き出さ<b>んばかりに</b>、目を潤ませていた。', id: 'Matanya berlinang seolah-olah sebentar lagi akan menangis.' },
    { jp: '子どもたちは飛び上がら<b>んばかりに</b>喜んで、プレゼントを受け取った。', id: 'Anak-anak menerima hadiah dengan gembira seolah-olah hampir melompat kegirangan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00086', level: 'n1', pattern: '〜だに',
  reading: '〜da ni',
  meaning: 'sekadar ... saja sudah ...; hanya dengan ... pun sudah (terasa, tidak bisa, dst)',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + だに（〜ない / 感情表現）',
  desc: '<b>〜だに</b> adalah partikel arkaik/sastra yang menyatakan bahwa sekadar melakukan tindakan yang paling minimal pun sudah cukup memunculkan perasaan atau situasi tertentu. Umumnya muncul dalam frasa beku seperti 想像だにできない、考えるだに恐ろしい、夢にだに思わなかった.',
  nuance: null,
  examples: [
    { jp: 'そんな失敗は、想像<b>だに</b>できなかった。', id: 'Kegagalan seperti itu bahkan tidak pernah terbayangkan sedikit pun.' },
    { jp: '戦場の惨状は、考える<b>だに</b>身の毛がよだつ。', id: 'Situasi mengerikan di medan perang itu, sekadar dibayangkan pun sudah membuat bulu kuduk berdiri.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00040'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00087', level: 'n1', pattern: '〜すら（〜ない）',
  reading: '〜sura (〜nai)',
  meaning: 'bahkan ... pun (tidak); sekalipun ..., menunjukkan kasus ekstrem',
  cat: 'extent-degree',
  connection: 'N（+ 助詞省略）+ すら / N + にすら / V-stem + すら',
  desc: '<b>〜すら</b> menandai kasus yang paling ekstrem dalam suatu skala — menyiratkan bahwa jika hal yang paling dasar atau paling mudah ini pun (tidak) berlaku, maka hal yang lebih sulit tentu juga demikian. Sering diikuti bentuk negatif tetapi dapat juga positif.',
  nuance: null,
  examples: [
    { jp: '疲れ果てて、立つこと<b>すら</b>できなかった。', id: 'Terlalu lelah hingga bahkan berdiri pun sudah tidak bisa.' },
    { jp: '忙しすぎて、昼食をとる時間<b>すら</b>なかった。', id: 'Terlalu sibuk sampai bahkan tidak ada waktu untuk makan siang sekalipun.' },
  ],
  see_also_grammar: ['gn1-00088'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00040', 'gn1-00088'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00088', level: 'n1', pattern: '〜でさえ',
  reading: '〜de sae',
  meaning: 'bahkan ... pun; menandai kasus ekstrem yang mengejutkan atau ironis',
  cat: 'extent-degree',
  connection: 'N + でさえ / N + さえ / V-te + さえ',
  desc: '<b>〜でさえ</b> menandai suatu entitas atau situasi sebagai kasus ekstrem — baik yang paling rendah maupun paling tinggi dalam skala — untuk mempertegas bahwa sesuatu berlaku bahkan pada kasus yang paling tidak terduga. Digunakan dalam pernyataan mengejutkan atau ironisasi.',
  nuance: null,
  examples: [
    { jp: '専門家<b>でさえ</b>答えられない難問だ。', id: 'Ini adalah pertanyaan sulit yang bahkan para ahli pun tidak bisa menjawabnya.' },
    { jp: '子ども<b>でさえ</b>知っている常識を、大人が知らないとは驚きだ。', id: 'Sungguh mengherankan bahwa seorang dewasa tidak tahu pengetahuan umum yang bahkan anak kecil pun tahu.' },
  ],
  see_also_grammar: ['gn1-00087'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00040', 'gn1-00087', 'gn1-00066', 'gn1-00115', 'gn1-00135'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00091', level: 'n1', pattern: '〜ことなしに',
  reading: '〜koto nashi ni',
  meaning: 'tanpa melakukan ...; tanpa ... (sebagai prasyarat yang mutlak diperlukan)',
  cat: 'negative',
  connection: 'V-dictionary + ことなしに',
  desc: '<b>〜ことなしに</b> menyatakan bahwa suatu hal dilakukan atau dicapai tanpa tindakan tertentu yang seharusnya dilakukan — atau sebaliknya, tanpa tindakan itu sesuatu tidak mungkin terjadi. Sering muncul dalam konteks akademik dan formal sebagai penegas logika kausal.',
  nuance: null,
  examples: [
    { jp: '土台を固める<b>ことなしに</b>、建物は長くもたない。', id: 'Tanpa memperkuat pondasi, bangunan tidak akan bertahan lama.' },
    { jp: '相手の立場を理解する<b>ことなしに</b>、真の対話は生まれない。', id: 'Tanpa memahami posisi pihak lain, dialog yang sesungguhnya tidak akan pernah terwujud.' },
  ],
  see_also_grammar: ['gn1-00104'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00104', 'gn1-00080'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00096', level: 'n1', pattern: '〜に至っては',
  reading: '〜ni itte wa',
  meaning: 'bahkan sampai ..., yang lebih mengejutkan/ekstrem lagi adalah ...',
  cat: 'extent-degree',
  connection: 'N + に至っては',
  desc: '<b>〜に至っては</b> digunakan untuk menyebutkan kasus paling ekstrem dalam suatu kelompok — biasanya untuk mempertegas betapa buruk atau tidak terduganya kasus tersebut dibanding yang lain. Selalu muncul setelah menyebutkan situasi umum yang sudah bermasalah, lalu menyebut kasus yang jauh lebih parah.',
  nuance: null,
  examples: [
    { jp: '多くの社員が遅刻しているが、部長<b>に至っては</b>無断欠勤だ。', id: 'Banyak karyawan yang terlambat, bahkan yang lebih parah lagi atasannya tidak masuk tanpa keterangan.' },
    { jp: '他の教科は及第点だったが、数学<b>に至っては</b>零点だった。', id: 'Mata pelajaran lain sudah cukup, tetapi matematika bahkan mendapat nilai nol.' },
  ],
  see_also_grammar: ['gn1-00097'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00016', 'gn2-00181'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00097', level: 'n1', pattern: '〜に至るまで',
  reading: '〜ni itaru made',
  meaning: 'sampai pada ..., bahkan hingga ..., mencakup rentang dari ... hingga ...',
  cat: 'extent-degree',
  connection: 'N + に至るまで / 〜から〜に至るまで',
  desc: '<b>〜に至るまで</b> menyatakan rentang yang sangat luas atau mendalam — dari yang paling umum hingga yang paling rinci atau ekstrem. Sering digunakan berpasangan dengan から (〜から〜に至るまで) untuk menggambarkan cakupan yang menyeluruh.',
  nuance: null,
  examples: [
    { jp: '日常の小さな习慣から重大な意思決定<b>に至るまで</b>、彼は常に慎重だ。', id: 'Mulai dari kebiasaan kecil sehari-hari hingga keputusan besar, dia selalu berhati-hati.' },
    { jp: '衣食住から趣味娯楽<b>に至るまで</b>、生活のあらゆる面に影響が及んだ。', id: 'Dampaknya menyentuh segala aspek kehidupan, dari sandang-pangan-papan hingga hobi dan hiburan.' },
  ],
  see_also_grammar: ['gn1-00096'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00011', 'gn1-00015'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00104', level: 'n1', pattern: '〜ことなく',
  reading: '〜koto naku',
  meaning: 'tanpa ... sama sekali, tidak pernah ...; dengan tidak melakukan ... sekalipun',
  cat: 'negative',
  connection: 'V-dictionary + ことなく',
  desc: '<b>〜ことなく</b> menyatakan bahwa suatu tindakan benar-benar tidak terjadi — tidak sekalipun, tidak pernah. Menekankan ketiadaan tindakan tersebut secara menyeluruh sepanjang periode tertentu. Digunakan untuk memuji ketekunan atau menggambarkan keadaan yang konsisten.',
  nuance: null,
  examples: [
    { jp: '彼は一度も諦める<b>ことなく</b>、10年間挑戦し続けた。', id: 'Tanpa sekali pun menyerah, dia terus berjuang selama sepuluh tahun.' },
    { jp: '誰にも頼る<b>ことなく</b>、彼女は独力で問題を解決した。', id: 'Tanpa mengandalkan siapa pun, dia menyelesaikan masalah itu dengan kekuatan sendiri.' },
  ],
  see_also_grammar: ['gn1-00091'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00080', 'gn5-00035', 'gn2-00059', 'gn1-00091'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00109', level: 'n1', pattern: '〜ごとく / 〜ごとき',
  reading: '〜gotoku / 〜gotoki',
  meaning: 'seperti ..., laksana ..., bagaikan ... (perbandingan bergaya klasik/sastra)',
  cat: 'comparison',
  connection: 'V-dictionary / N + の + ごとく（副詞的）/ ごとき + N（形容詞的） / ごとし（文末）',
  desc: '<b>〜ごとく</b> adalah ekspresi perbandingan kuno dan sastra — setara dengan 〜のように dalam penggunaan modern. ごとく berfungsi adverbial (memodifikasi verba), ごとき berfungsi adjectival (memodifikasi nomina dan sering bernuansa merendah diri atau meremehkan), ごとし digunakan di akhir kalimat.',
  nuance: null,
  examples: [
    { jp: '流れる水の<b>ごとく</b>、時は静かに、しかし確実に過ぎ去っていく。', id: 'Bagai air yang mengalir, waktu berlalu dengan tenang namun pasti.' },
    { jp: '私<b>ごとき</b>者には、身に余るお言葉をいただき、恐縮でございます。', id: 'Kata-kata yang begitu mulia terlalu berlebihan untuk seseorang seperti saya yang tidak berarti ini.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00071'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00127', level: 'n1', pattern: '〜に足りない',
  reading: '〜ni tarinai',
  meaning: 'tidak layak untuk ..., tidak cukup untuk ..., tidak memenuhi standar ...',
  cat: 'negative',
  connection: 'V-dictionary + に足りない',
  desc: '<b>〜に足りない</b> adalah bentuk negatif dari 〜に足る. Menyatakan bahwa sesuatu atau seseorang tidak memenuhi standar atau kualifikasi yang diperlukan untuk tujuan tertentu. Sering digunakan untuk menolak atau meremehkan sesuatu dengan nada formal.',
  nuance: null,
  examples: [
    { jp: 'その程度の努力では、合格する<b>に足りない</b>。', id: 'Dengan usaha sekecil itu, tidak cukup untuk lulus.' },
    { jp: '彼の実績は、リーダーを任せる<b>に足りない</b>と上司は判断した。', id: 'Atasannya menilai rekam jejaknya tidak cukup layak untuk dipercaya menjadi pemimpin.' }
  ],
  see_also_grammar: ['gn1-00126', 'gn1-00128'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00154',
  level: 'n1',
  pattern: '〜にすぎない',
  reading: '〜ni suginai',
  meaning: 'hanya ..., tidak lebih dari ..., sekadar ...',
  cat: 'extent-degree',
  connection: 'V-plain / N + にすぎない',
  desc: '<b>〜にすぎない</b> menyatakan bahwa sesuatu tidak melebihi batas tertentu — hanya sebatas itu, tidak lebih. Mengandung nuansa bahwa hal tersebut dianggap kurang signifikan, terlalu kecil, atau tidak perlu dibesar-besarkan.',
  nuance: null,
  examples: [
    { jp: 'それは単なる偶然<b>にすぎない</b>。', id: 'Itu tidak lebih dari sebuah kebetulan belaka.' },
    { jp: '私はただの会社員<b>にすぎない</b>。', id: 'Saya hanyalah seorang karyawan biasa.' },
    { jp: '今回の改善は表面的なもの<b>にすぎない</b>。', id: 'Perbaikan kali ini tidak lebih dari sekadar perubahan permukaan.' },
  ],
  see_also_grammar: ['gn1-00153', 'gn1-00155', 'gn1-00156'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00156', 'gn3-00036', 'gn2-00148', 'gn2-00202', 'gn1-00047', 'gn1-00153'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00155',
  level: 'n1',
  pattern: '〜にとどまらない',
  reading: '〜ni todomaranai',
  meaning: 'tidak hanya ..., melampaui ..., lebih dari sekadar ...',
  cat: 'extent-degree',
  connection: 'N + にとどまらない',
  desc: '<b>〜にとどまらない</b> menyatakan bahwa dampak, cakupan, atau relevansi sesuatu tidak terbatas hanya pada hal yang disebutkan, melainkan meluas lebih jauh. Sering digunakan untuk menekankan bahwa suatu pengaruh atau masalah bersifat lebih luas dari yang dibayangkan.',
  nuance: null,
  examples: [
    { jp: '問題は国内<b>にとどまらない</b>、国際的な課題だ。', id: 'Masalah ini tidak hanya terbatas di dalam negeri, melainkan merupakan isu internasional.' },
    { jp: '彼女の影響は音楽<b>にとどまらず</b>、映画や文化にも及んだ。', id: 'Pengaruhnya tidak hanya di bidang musik, melainkan merambah ke film dan budaya juga.' },
    { jp: '被害は一部地域<b>にとどまらない</b>広がりを見せた。', id: 'Kerugian menunjukkan penyebaran yang tidak terbatas hanya pada sebagian wilayah.' },
  ],
  see_also_grammar: ['gn1-00156', 'gn1-00154'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00013', 'gn2-00046'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00156',
  level: 'n1',
  pattern: '〜にとどまる',
  reading: '〜ni todomaru',
  meaning: 'sebatas ..., hanya sampai pada ..., terbatas pada ...',
  cat: 'extent-degree',
  connection: 'N + にとどまる',
  desc: '<b>〜にとどまる</b> menyatakan bahwa sesuatu tidak melebihi atau tidak berkembang melampaui batas yang disebutkan. Digunakan untuk menyatakan bahwa dampak, pertumbuhan, atau pencapaian terbatas pada tingkat tertentu — dan tidak lebih.',
  nuance: null,
  examples: [
    { jp: '今期の成長率は2%<b>にとどまった</b>。', id: 'Tingkat pertumbuhan periode ini hanya sebatas 2%.' },
    { jp: '被害は軽傷<b>にとどまり</b>、死者は出なかった。', id: 'Kerugian terbatas pada luka ringan, dan tidak ada korban jiwa.' },
    { jp: '参加者は予想の半数<b>にとどまった</b>。', id: 'Jumlah peserta hanya sampai pada setengah dari perkiraan.' },
  ],
  see_also_grammar: ['gn1-00155', 'gn1-00154'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00154'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00157',
  level: 'n1',
  pattern: '〜にわたる',
  reading: '〜ni wataru',
  meaning: 'mencakup ..., melintasi ... (rentang waktu atau wilayah)',
  cat: 'extent-degree',
  connection: 'N + にわたる + N',
  desc: '<b>〜にわたる</b> digunakan sebagai kata sifat untuk menerangkan nomina berikutnya, menyatakan bahwa sesuatu mencakup atau melintasi rentang waktu, wilayah, atau bidang tertentu. Berbeda dari 〜にわたって, bentuk ini memodifikasi nomina secara langsung.',
  nuance: null,
  examples: [
    { jp: '二週間<b>にわたる</b>調査が終了した。', id: 'Investigasi yang mencakup dua minggu telah selesai.' },
    { jp: '広い範囲<b>にわたる</b>被害が報告された。', id: 'Dilaporkan kerusakan yang mencakup area yang luas.' },
    { jp: '長年<b>にわたる</b>研究の成果がついに発表された。', id: 'Hasil penelitian yang berlangsung bertahun-tahun akhirnya dipublikasikan.' },
  ],
  see_also_grammar: ['gn1-00158', 'gn1-00159'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00158', 'gn1-00159'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00158',
  level: 'n1',
  pattern: '〜にわたって',
  reading: '〜ni watatte',
  meaning: 'selama ..., sepanjang ..., dalam rentang ... (adverbial)',
  cat: 'extent-degree',
  connection: 'N + にわたって',
  desc: '<b>〜にわたって</b> berfungsi sebagai adverbial untuk menerangkan verba, menyatakan bahwa suatu tindakan atau kondisi berlangsung sepanjang atau mencakup seluruh rentang yang disebutkan (waktu, ruang, atau bidang).',
  nuance: null,
  examples: [
    { jp: '三ヶ月<b>にわたって</b>交渉が続いた。', id: 'Perundingan berlanjut selama tiga bulan.' },
    { jp: '全国<b>にわたって</b>調査が実施された。', id: 'Survei dilaksanakan di seluruh penjuru negeri.' },
    { jp: '幅広い分野<b>にわたって</b>業績を残した。', id: 'Ia meninggalkan pencapaian di berbagai bidang yang luas.' },
  ],
  see_also_grammar: ['gn1-00157', 'gn1-00159'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00157', 'gn2-00138', 'gn2-00009', 'gn2-00056', 'gn1-00159'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00159',
  level: 'n1',
  pattern: '〜にまたがる',
  reading: '〜ni matagaru',
  meaning: 'melintasi batas ..., mencakup beberapa ... yang berbeda',
  cat: 'extent-degree',
  connection: 'N + にまたがる',
  desc: '<b>〜にまたがる</b> menyatakan bahwa sesuatu melintasi atau mencakup beberapa wilayah, bidang, atau kategori yang secara inheren berbeda dan terpisah. Menekankan aspek "melintasi batas" antara entitas yang berbeda-beda.',
  nuance: null,
  examples: [
    { jp: 'この事件は複数の県<b>にまたがる</b>広域捜査となった。', id: 'Kasus ini menjadi penyelidikan lintas wilayah yang mencakup beberapa prefektur.' },
    { jp: '彼の研究は工学と医学<b>にまたがる</b>分野だ。', id: 'Penelitiannya mencakup bidang yang melintasi teknik dan kedokteran.' },
    { jp: '両国<b>にまたがる</b>プロジェクトは慎重な調整が必要だ。', id: 'Proyek yang melintasi dua negara memerlukan koordinasi yang cermat.' },
  ],
  see_also_grammar: ['gn1-00157', 'gn1-00158'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00158', 'gn1-00157'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00172',
  level: 'n1',
  pattern: '〜ないことはない',
  reading: '〜nai koto wa nai',
  meaning: 'bukan tidak bisa ..., bisa saja, tapi ... (negatif ganda yang ragu-ragu)',
  cat: 'negative',
  connection: 'V-negative plain + ことはない',
  desc: '<b>〜ないことはない</b> adalah konstruksi negatif ganda yang menyatakan bahwa sesuatu bukan sepenuhnya mustahil atau tidak bisa dilakukan, namun ada keengganan, syarat, atau kendala tertentu. Secara logis berarti "ada kemungkinan", tapi nuansanya lebih ke "bisa, tapi tidak sepenuhnya bersemangat".',
  nuance: null,
  examples: [
    { jp: '行け<b>ないことはない</b>けど、あまり気が進まない。', id: 'Bukan tidak bisa pergi, tapi tidak terlalu bersemangat.' },
    { jp: 'でき<b>ないことはない</b>が、かなり時間がかかる。', id: 'Bukan tidak bisa dilakukan, tapi butuh waktu cukup lama.' },
    { jp: '理解でき<b>ないことはない</b>が、賛成はできない。', id: 'Bukan tidak bisa memahami, tapi tidak bisa setuju.' },
  ],
  see_also_grammar: ['gn1-00173', 'gn1-00174'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00174', 'gn1-00173', 'gn2-00156', 'gn1-00171'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00173',
  level: 'n1',
  pattern: '〜ないものでもない',
  reading: '〜nai mono demo nai',
  meaning: 'bukan tidak mungkin ..., ada kemungkinan ... (sangat hati-hati dan tidak langsung)',
  cat: 'negative',
  connection: 'V-negative plain + ものでもない',
  desc: '<b>〜ないものでもない</b> adalah ungkapan negatif ganda yang sangat hati-hati dan tidak langsung. Secara logis menyatakan "tidak sepenuhnya tidak ada", yang berarti ada kemungkinan kecil atau keinginan yang tidak diungkapkan secara langsung. Sering digunakan saat pembicara tidak ingin berkomitmen secara jelas.',
  nuance: null,
  examples: [
    { jp: '少し手伝わ<b>ないものでもない</b>が、条件がある。', id: 'Bukan tidak mungkin saya bantu sedikit, tapi ada syaratnya.' },
    { jp: '興味が<b>ないものでもない</b>が、まだ迷っている。', id: 'Bukan tidak ada minat, tapi saya masih ragu-ragu.' },
    { jp: '彼の提案を考慮し<b>ないものでもない</b>。', id: 'Bukan tidak mungkin saya mempertimbangkan proposalnya.' },
  ],
  see_also_grammar: ['gn1-00172', 'gn1-00174', 'gn1-00175'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00172', 'gn1-00174', 'gn1-00175'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00174',
  level: 'n1',
  pattern: '〜なくもない',
  reading: '〜naku mo nai',
  meaning: 'tidak sepenuhnya tidak ..., ada sedikit ..., bukan tak ada sama sekali',
  cat: 'negative',
  connection: 'V-stem (なく form) + もない',
  desc: '<b>〜なくもない</b> adalah negatif ganda yang menyatakan bahwa sesuatu tidak sepenuhnya absen atau tidak ada — ada sedikit, meski tidak banyak. Sering digunakan untuk mengakui perasaan, keinginan, atau kemungkinan dengan cara yang merendah atau tidak terlalu tegas.',
  nuance: null,
  examples: [
    { jp: '彼の気持ちはわから<b>なくもない</b>。', id: 'Bukan tidak mengerti perasaannya sama sekali.' },
    { jp: '少し不満が<b>なくもない</b>が、我慢することにした。', id: 'Bukan tidak ada rasa tidak puas sedikit, tapi saya memutuskan untuk bersabar.' },
    { jp: '行ってみたい気持ちが<b>なくもない</b>が、お金がない。', id: 'Bukan tak ada keinginan untuk pergi, tapi tidak ada uang.' },
  ],
  see_also_grammar: ['gn1-00172', 'gn1-00173'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00172', 'gn1-00173', 'gn1-00175'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── CONNECTIVES (51) ───────────────────────────────────

{
  id: 'gn1-00002', level: 'n1', pattern: '〜いかんにかかわらず', reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari ... / tidak peduli bagaimanapun kondisinya',
  cat: 'contrast-concession',
  connection: 'N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa sesuatu tetap berlaku tanpa memperhatikan kondisi apa pun yang disebutkan. Sering ditemukan dalam dokumen hukum, peraturan, dan surat resmi.',
  nuance: null,
  examples: [
    { jp: '理由の<b>いかんにかかわらず</b>、遅刻は認められません。', id: 'Terlepas dari alasan apa pun, keterlambatan tidak diizinkan.' },
    { jp: '成績の<b>いかんにかかわらず</b>、全員参加できます。', id: 'Terlepas dari nilai, semua orang dapat ikut serta.' },
    { jp: '立場の<b>いかんにかかわらず</b>、規則は平等に適用される。', id: 'Terlepas dari jabatan, peraturan berlaku secara adil untuk semua.' }
  ],
  see_also_grammar: ['gn1-00001'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00099', 'gn2-00143', 'gn2-00142', 'gn1-00001'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00003', level: 'n1', pattern: '〜をもって', reading: '〜wo motte',
  meaning: 'dengan ... / menggunakan ... / terhitung sejak ...',
  cat: 'reason-cause',
  connection: 'N + をもって',
  desc: '<b>〜をもって</b> memiliki dua makna utama: (1) menyatakan sarana atau cara ("dengan ..."), dan (2) menyatakan batas waktu formal ("terhitung sejak ..."). Keduanya digunakan dalam konteks sangat formal dan seremonial.',
  nuance: null,
  examples: [
    { jp: '誠意<b>をもって</b>対応いたします。', id: 'Kami akan menangani hal ini dengan penuh kesungguhan.' },
    { jp: '今月末<b>をもって</b>、この店舗は閉店いたします。', id: 'Terhitung akhir bulan ini, toko ini akan ditutup.' },
    { jp: 'これ<b>をもって</b>、式典を終了いたします。', id: 'Dengan ini, kami akhiri upacara.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00039', 'gn1-00029', 'gn1-00114', 'gn1-00170'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00005', level: 'n1', pattern: '〜にしては', reading: '〜ni shite wa',
  meaning: 'mengingat ... / untuk seseorang/sesuatu yang ...',
  cat: 'contrast-concession',
  connection: 'N / V-plain + にしては',
  desc: '<b>〜にしては</b> menyatakan kontras antara latar belakang atau kondisi dengan kenyataan yang ada. Artinya: "mengingat kondisinya X, hasilnya Y (di luar dugaan — bisa lebih baik atau lebih buruk dari yang diharapkan)".',
  nuance: null,
  examples: [
    { jp: '初めて作った<b>にしては</b>、よくできている。', id: 'Mengingat ini buatan pertama, hasilnya cukup bagus.' },
    { jp: '日本に10年いる<b>にしては</b>、日本語が上手じゃない。', id: 'Mengingat sudah 10 tahun di Jepang, bahasa Jepangnya kurang bagus.' },
    { jp: '専門家<b>にしては</b>、説明がわかりにくい。', id: 'Untuk seorang ahli, penjelasannya susah dipahami.' }
  ],
  see_also_grammar: ['gn1-00004', 'gn1-00006'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00226', 'gn3-00020', 'gn4-00009', 'gn2-00059', 'gn2-00165'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00006', level: 'n1', pattern: '〜にしても〜にしても', reading: '〜ni shite mo 〜ni shite mo',
  meaning: 'baik ... maupun ... (dalam kedua kasus, kesimpulan sama)',
  cat: 'listing-addition',
  connection: 'V-plain / N + にしても + V-plain / N + にしても',
  desc: '<b>〜にしても〜にしても</b> menyatakan bahwa apapun pilihannya atau kondisinya, kesimpulan atau penilaian yang sama tetap berlaku. Kedua kemungkinan disebutkan secara eksplisit.',
  nuance: null,
  examples: [
    { jp: '行く<b>にしても</b>行かない<b>にしても</b>、早めに決めてください。', id: 'Baik pergi maupun tidak, tolong putuskan lebih awal.' },
    { jp: '賛成する<b>にしても</b>反対する<b>にしても</b>、理由を述べてください。', id: 'Baik setuju maupun tidak setuju, nyatakan alasannya.' },
    { jp: '成功する<b>にしても</b>失敗する<b>にしても</b>、挑戦する価値はある。', id: 'Baik berhasil maupun gagal, ada nilai dalam mencoba.' }
  ],
  see_also_grammar: ['gn1-00005', 'gn1-00007'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00120', 'gn1-00119', 'gn1-00048', 'gn2-00227', 'gn1-00049', 'gn1-00107'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00007', level: 'n1', pattern: '〜としても', reading: '〜to shite mo',
  meaning: 'meskipun dianggap sebagai ... / bahkan jika seandainya ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + としても',
  desc: '<b>〜としても</b> menyatakan kondisi hipotesis yang dikonsesikan: "meskipun kita anggap X benar, tetap saja Y". Menegaskan bahwa kesimpulan tidak berubah meskipun kondisi yang diberikan diterima.',
  nuance: null,
  examples: [
    { jp: 'それが事実だ<b>としても</b>、今すぐ対処するのは難しい。', id: 'Meskipun itu benar adanya, sulit untuk menanganinya sekarang.' },
    { jp: '急いで行った<b>としても</b>、間に合わなかっただろう。', id: 'Meskipun seandainya pergi terburu-buru, kemungkinan tetap tidak akan tepat waktu.' },
    { jp: '彼が天才だ<b>としても</b>、努力なしでは成功できない。', id: 'Meskipun dia jenius, tanpa usaha dia tidak bisa sukses.' }
  ],
  see_also_grammar: ['gn1-00008'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00226', 'gn4-00009', 'gn3-00018', 'gn3-00023'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00008', level: 'n1', pattern: '〜とはいえ', reading: '〜to wa ie',
  meaning: 'meskipun dikatakan demikian ... / walaupun begitu ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + とはいえ',
  desc: '<b>〜とはいえ</b> mengakui kebenaran bagian pertama, lalu menyatakan kontras atau batasan di bagian kedua. Artinya: "memang benar X, namun Y". Formal dan sering dipakai dalam esai.',
  nuance: null,
  examples: [
    { jp: '春<b>とはいえ</b>、まだ寒い日が続く。', id: 'Meskipun sudah musim semi, hari-hari yang dingin masih berlanjut.' },
    { jp: '慣れた<b>とはいえ</b>、この仕事はやはり大変だ。', id: 'Meskipun sudah terbiasa, pekerjaan ini tetap saja berat.' },
    { jp: '彼は優秀だ<b>とはいえ</b>、経験はまだ浅い。', id: 'Meskipun dia berbakat, pengalamannya masih minim.' }
  ],
  see_also_grammar: ['gn1-00007', 'gn1-00009'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00009', 'gn3-00024', 'gn3-00066', 'gn2-00153', 'gn2-00189', 'gn1-00136', 'gn1-00137'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00009', level: 'n1', pattern: '〜といえども', reading: '〜to ie domo',
  meaning: 'meskipun ... bahkan (konsesi formal/sastra)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + といえども',
  desc: '<b>〜といえども</b> adalah ekspresi sastra/klasik untuk konsesi. Artinya "bahkan jika/meskipun", sering digunakan untuk menekankan bahwa tidak ada pengecualian — termasuk kondisi yang paling ekstrem sekalipun.',
  nuance: null,
  examples: [
    { jp: 'いかなる理由<b>といえども</b>、暴力は許されない。', id: 'Meskipun dengan alasan apa pun, kekerasan tidak bisa dibenarkan.' },
    { jp: '専門家<b>といえども</b>、すべてを知っているわけではない。', id: 'Meskipun seorang ahli, tidak berarti tahu segalanya.' },
    { jp: '大統領<b>といえども</b>、法を超えることはできない。', id: 'Meskipun presiden, tidak bisa melampaui hukum.' }
  ],
  see_also_grammar: ['gn1-00008'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00008', 'gn1-00118', 'gn1-00137'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00010', level: 'n1', pattern: '〜ながらも', reading: '〜nagara mo',
  meaning: 'meskipun ... (tapi tetap ...) — kontras bernuansa sastra',
  cat: 'contrast-concession',
  connection: 'V-stem / Adj-i-stem / Adj-na / N + ながらも',
  desc: '<b>〜ながらも</b> menyatakan kontras bernuansa sastra: kondisi A ada atau sedang terjadi, namun tetap saja B juga ada/terjadi. Menekankan bahwa dua hal yang bertentangan berlangsung secara bersamaan.',
  nuance: null,
  examples: [
    { jp: '貧しい<b>ながらも</b>、幸せに暮らしていた。', id: 'Meskipun miskin, mereka hidup bahagia.' },
    { jp: '不安を感じ<b>ながらも</b>、彼女は前に進んだ。', id: 'Meskipun merasakan ketakutan, dia tetap melangkah maju.' },
    { jp: '短い時間<b>ながらも</b>、多くのことを学んだ。', id: 'Meskipun waktunya singkat, banyak hal yang dipelajari.' }
  ],
  see_also_grammar: ['gn1-00011'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00015', 'gn1-00187', 'gn1-00184', 'gn3-00022', 'gn2-00121', 'gn2-00161', 'gn2-00189'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00012', level: 'n1', pattern: '〜てでも', reading: '〜te demo',
  meaning: 'bahkan dengan cara ... / tidak peduli bagaimana caranya',
  cat: 'purpose',
  connection: 'V-te form + でも',
  desc: '<b>〜てでも</b> menyatakan tekad yang kuat: pembicara rela melakukan sesuatu yang ekstrem atau tidak lazim demi mencapai tujuan tertentu. Menekankan kesungguhan niat.',
  nuance: null,
  examples: [
    { jp: '借金をし<b>てでも</b>、夢を叶えたい。', id: 'Meskipun harus berhutang, aku ingin mewujudkan impian.' },
    { jp: '徹夜し<b>てでも</b>、この仕事を終わらせる。', id: 'Bahkan dengan begadang sekalipun, aku akan menyelesaikan pekerjaan ini.' },
    { jp: '膝をつい<b>てでも</b>、謝るべきだ。', id: 'Bahkan dengan berlutut sekalipun, dia harus meminta maaf.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00226', 'gn5-00067', 'gn4-00060', 'gn1-00118', 'gn1-00170'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00013', level: 'n1', pattern: '〜ばかりに', reading: '〜bakari ni',
  meaning: 'justru karena ... / hanya karena ... (mengakibatkan hal negatif)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain + ばかりに',
  desc: '<b>〜ばかりに</b> menyatakan bahwa satu alasan tunggal menjadi penyebab suatu hasil negatif yang tidak diinginkan. Pembicara menyesalkan bahwa justru karena X, hal buruk Y terjadi.',
  nuance: null,
  examples: [
    { jp: '正直に言った<b>ばかりに</b>、嫌われてしまった。', id: 'Justru karena berbicara jujur, malah dibenci.' },
    { jp: '欲張った<b>ばかりに</b>、全部失った。', id: 'Hanya karena terlalu serakah, semuanya hilang.' },
    { jp: '道を間違えた<b>ばかりに</b>、試験に遅刻した。', id: 'Justru karena salah jalan, terlambat ujian.' }
  ],
  see_also_grammar: ['gn1-00024'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00013', 'gn2-00117', 'gn2-00166', 'gn2-00169', 'gn2-00225', 'gn1-00024'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00019', level: 'n1', pattern: '〜をものともせず', reading: '〜wo mono to mo sezu',
  meaning: 'tanpa mempedulikan ... / mengabaikan ... (dengan gagah berani)',
  cat: 'contrast-concession',
  connection: 'N + をものともせず',
  desc: '<b>〜をものともせず</b> menyatakan bahwa seseorang menghadapi atau melakukan sesuatu tanpa gentar atau terhenti oleh rintangan, bahaya, atau kesulitan yang besar. Mengandung nuansa kekaguman terhadap keberanian.',
  nuance: null,
  examples: [
    { jp: '激しい雨<b>をものともせず</b>、彼らは試合を続けた。', id: 'Tanpa mempedulikan hujan deras, mereka melanjutkan pertandingan.' },
    { jp: '批判<b>をものともせず</b>、彼女は改革を推し進めた。', id: 'Mengabaikan kritik, dia terus mendorong reformasi.' },
    { jp: '危険<b>をものともせず</b>、救助隊は現場に向かった。', id: 'Tanpa mempedulikan bahaya, tim penyelamat menuju lokasi.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00046', 'gn2-00142', 'gn2-00100', 'gn1-00105'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00020', level: 'n1', pattern: '〜もさることながら', reading: '〜mo saru koto nagara',
  meaning: 'sudah tentu ... tapi lebih dari itu ... / bukan hanya ...',
  cat: 'listing-addition',
  connection: 'N + もさることながら',
  desc: '<b>〜もさることながら</b> mengakui bahwa X sudah tentu menonjol atau penting, namun menekankan bahwa Y (yang disebutkan setelahnya) bahkan lebih menonjol atau lebih penting. Bentuk eskalasi penilaian.',
  nuance: null,
  examples: [
    { jp: '味<b>もさることながら</b>、この店の雰囲気も素晴らしい。', id: 'Sudah tentu rasanya lezat, tapi suasana restoran ini pun luar biasa.' },
    { jp: '技術<b>もさることながら</b>、チームワークが勝因だった。', id: 'Kemampuan teknis sudah tentu penting, namun kerja sama tim lah yang menjadi kunci kemenangan.' },
    { jp: '外見<b>もさることながら</b>、彼の人格が多くの人を惹きつける。', id: 'Penampilannya sudah tentu menarik, tapi kepribadiannya lah yang memikat banyak orang.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00012', 'gn2-00013', 'gn2-00046', 'gn2-00092'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00021', level: 'n1', pattern: '〜と思いきや', reading: '〜to omoikiya',
  meaning: 'mengira ... ternyata ... (pembalikan tak terduga)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + と思いきや',
  desc: '<b>〜と思いきや</b> menyatakan bahwa asumsi atau dugaan awal ternyata salah — kenyataannya adalah kebalikannya. "Kukira X, ternyata Y (yang sama sekali berbeda)."',
  nuance: null,
  examples: [
    { jp: '試験に合格した<b>と思いきや</b>、実は不合格だった。', id: 'Kukira lulus ujian, ternyata tidak lulus.' },
    { jp: 'もう終わった<b>と思いきや</b>、まだ続きがあった。', id: 'Kukira sudah selesai, ternyata masih ada kelanjutannya.' },
    { jp: '雨が止んだ<b>と思いきや</b>、また降り始めた。', id: 'Kukira hujan sudah berhenti, ternyata mulai turun lagi.' }
  ],
  see_also_grammar: ['gn1-00022'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00022'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00024', level: 'n1', pattern: '〜が故に／〜がゆえに', reading: '〜ga yue ni',
  meaning: 'karena ... / justru karena ... (sastra/formal)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + が故に / がゆえに',
  desc: '<b>〜が故に</b> (atau <b>〜がゆえに</b>) adalah ekspresi klasik untuk menyatakan sebab-akibat, dengan nuansa formal/sastra yang kuat. Artinya serupa dengan 〜から atau 〜ので, namun jauh lebih formal dan literer.',
  nuance: null,
  examples: [
    { jp: '若い<b>が故に</b>、経験が足りないこともある。', id: 'Justru karena masih muda, kadang pengalamannya masih kurang.' },
    { jp: '正直である<b>が故に</b>、傷つくこともある。', id: 'Karena jujur, terkadang juga bisa terluka.' },
    { jp: '人間である<b>がゆえに</b>、感情に動かされることがある。', id: 'Karena manusia, kadang tergerak oleh emosi.' }
  ],
  see_also_grammar: ['gn1-00013'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00189', 'gn1-00013'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00031', level: 'n1', pattern: '〜ずとも', reading: '〜zu tomo',
  meaning: 'meskipun tidak ... (pun tetap ...)',
  cat: 'contrast-concession',
  connection: 'V-neg (ず形) + とも',
  desc: '<b>〜ずとも</b> adalah bentuk sastra/klasik yang berarti "meskipun tidak melakukan X, Y tetap berlaku." Setara modern: 〜なくても.',
  nuance: null,
  examples: [
    { jp: '言わ<b>ずとも</b>、彼は状況を理解していた。', id: 'Meskipun tidak diucapkan, dia sudah memahami situasinya.' },
    { jp: '頼ま<b>ずとも</b>、彼女はいつも助けてくれる。', id: 'Meskipun tidak diminta, dia selalu membantuku.' },
    { jp: '見<b>ずとも</b>わかる結果だった。', id: 'Itu adalah hasil yang sudah bisa diketahui tanpa perlu melihat.' }
  ],
  see_also_grammar: ['gn1-00033'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00026'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00033', level: 'n1', pattern: '〜ないまでも', reading: '〜nai made mo',
  meaning: 'meskipun tidak sampai ... setidaknya ...',
  cat: 'contrast-concession',
  connection: 'V-plain-neg / i-adj-neg + までも',
  desc: '<b>〜ないまでも</b> menyatakan bahwa meski kondisi ideal tidak tercapai, minimal hal yang lebih rendah masih bisa diharapkan. Struktur: "tidak sampai A, tapi setidaknya B."',
  nuance: null,
  examples: [
    { jp: '毎日<b>ないまでも</b>、週に一度は運動した方がいい。', id: 'Meskipun tidak setiap hari, setidaknya berolahraga seminggu sekali.' },
    { jp: '完璧で<b>ないまでも</b>、誠実に取り組むことが大切だ。', id: 'Meskipun tidak sempurna, yang penting adalah bekerja dengan jujur.' },
    { jp: '一流で<b>ないまでも</b>、きちんとした仕事をしてほしい。', id: 'Meski tidak kelas satu, aku harap kamu bekerja dengan benar.' }
  ],
  see_also_grammar: ['gn1-00031'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00226'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00034', level: 'n1', pattern: '〜なくして / 〜なしに', reading: '〜naku shite / 〜nashi ni',
  meaning: 'tanpa ... (maka tidak bisa ...)',
  cat: 'reason-cause',
  connection: 'N + なくして(は) / なしに(は)',
  desc: '<b>〜なくして</b> dan <b>〜なしに</b> menyatakan bahwa tanpa X, Y tidak mungkin terjadi. Digunakan untuk menekankan bahwa X adalah syarat mutlak.',
  nuance: null,
  examples: [
    { jp: '努力<b>なくして</b>、成功はない。', id: 'Tanpa kerja keras, tidak ada kesuksesan.' },
    { jp: '信頼<b>なしに</b>、チームワークは成り立たない。', id: 'Tanpa kepercayaan, kerja sama tim tidak bisa berjalan.' },
    { jp: '皆さんの協力<b>なくして</b>は、このプロジェクトは実現しなかった。', id: 'Tanpa kerja sama semua pihak, proyek ini tidak akan terwujud.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00141'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00035', level: 'n1', pattern: '〜に即して / 〜に即した', reading: '〜ni sokushite / 〜ni sokushita',
  meaning: 'sesuai dengan / berdasarkan kenyataan ...',
  cat: 'reason-cause',
  connection: 'N + に即して (adverbial) / に即した + N (adjectival)',
  desc: '<b>〜に即して</b> berarti "berdasarkan / mengikuti X secara konkret." Menekankan keselarasan dengan fakta nyata, aturan, atau kondisi aktual — bukan teoritis.',
  nuance: null,
  examples: [
    { jp: '現実<b>に即した</b>政策が必要だ。', id: 'Diperlukan kebijakan yang sesuai dengan kenyataan.' },
    { jp: '法律<b>に即して</b>判断するべきだ。', id: 'Harus mengambil keputusan sesuai hukum yang berlaku.' },
    { jp: '実情<b>に即した</b>指導を心がけている。', id: 'Aku berusaha memberikan bimbingan yang sesuai dengan kondisi nyata.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00167', 'gn2-00196'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00037', level: 'n1', pattern: '〜を前提として', reading: '〜wo zentei to shite',
  meaning: 'dengan asumsi bahwa ... / berdasarkan premis ...',
  cat: 'reason-cause',
  connection: 'N / V-plain + ことを前提として',
  desc: '<b>〜を前提として</b> menyatakan bahwa X adalah asumsi dasar atau prasyarat yang sudah ditetapkan sebelum melanjutkan Y. Dipakai dalam konteks negosiasi, perencanaan, atau argumentasi formal.',
  nuance: null,
  examples: [
    { jp: '結婚<b>を前提として</b>付き合っている。', id: 'Kami berpacaran dengan asumsi menuju pernikahan.' },
    { jp: '留学すること<b>を前提として</b>、英語の勉強を始めた。', id: 'Dengan premis akan belajar ke luar negeri, aku mulai belajar bahasa Inggris.' },
    { jp: '参加者全員の同意<b>を前提として</b>、計画を進める。', id: 'Dengan asumsi persetujuan seluruh peserta, rencana akan dilanjutkan.' }
  ],
  see_also_grammar: ['gn1-00038'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00038', 'gn2-00198'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00038', level: 'n1', pattern: '〜を踏まえて', reading: '〜wo fumaete',
  meaning: 'berdasarkan ... / mempertimbangkan ... (fakta/pengalaman nyata)',
  cat: 'reason-cause',
  connection: 'N + を踏まえて / を踏まえた + N',
  desc: '<b>〜を踏まえて</b> berarti "mengambil X sebagai dasar pijakan" — X adalah fakta, hasil, atau pengalaman nyata yang sudah ada, dan Y adalah tindakan selanjutnya yang dibangun di atasnya.',
  nuance: null,
  examples: [
    { jp: 'アンケート結果<b>を踏まえて</b>、サービスを改善します。', id: 'Berdasarkan hasil survei, kami akan memperbaiki layanan.' },
    { jp: '前回の失敗<b>を踏まえて</b>、今回は慎重に進めた。', id: 'Dengan mempertimbangkan kegagalan sebelumnya, kali ini aku melangkah hati-hati.' },
    { jp: '現状<b>を踏まえた</b>対策が求められる。', id: 'Diperlukan langkah yang didasarkan pada kondisi saat ini.' }
  ],
  see_also_grammar: ['gn1-00037'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00037', 'gn1-00167', 'gn2-00101', 'gn2-00103', 'gn2-00136', 'gn1-00162', 'gn1-00164'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00042', level: 'n1', pattern: '〜かたがた', reading: '〜katagata',
  meaning: 'sambil / sekaligus ... (dua tujuan dalam satu kunjungan — formal/surat)',
  cat: 'purpose',
  connection: 'N (verbal noun) + かたがた',
  desc: '<b>〜かたがた</b> menyatakan bahwa sebuah kunjungan atau tindakan memiliki dua tujuan sekaligus. Digunakan terutama dalam surat formal dan ucapan sopan.',
  nuance: null,
  examples: [
    { jp: 'ご挨拶<b>かたがた</b>、近況をご報告申し上げます。', id: 'Sambil menyampaikan salam, saya juga ingin melaporkan kabar terkini.' },
    { jp: 'お礼<b>かたがた</b>、お伺いしたいと存じます。', id: 'Sambil mengucapkan terima kasih, saya bermaksud untuk berkunjung.' },
    { jp: 'ご報告<b>かたがた</b>、一度お目にかかれますでしょうか。', id: 'Sambil menyampaikan laporan, dapatkah saya menemui Anda sebentar?' }
  ],
  see_also_grammar: ['gn1-00043', 'gn1-00044'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00044', 'gn1-00043', 'gn3-00016', 'gn1-00075', 'gn1-00183'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00043', level: 'n1', pattern: '〜かたわら', reading: '〜katawara',
  meaning: 'di samping kegiatan utama ... / sambil juga ...',
  cat: 'purpose',
  connection: 'V-dict / N-の + かたわら',
  desc: '<b>〜かたわら</b> menyatakan bahwa seseorang, di samping kegiatan atau pekerjaan utamanya (X), juga secara konsisten menjalankan aktivitas lain (Y). Keduanya berlangsung dalam jangka panjang.',
  nuance: null,
  examples: [
    { jp: '会社員をする<b>かたわら</b>、小説を書いている。', id: 'Di samping bekerja sebagai karyawan, dia juga menulis novel.' },
    { jp: '育児<b>かたわら</b>、オンラインで英語を教えている。', id: 'Di samping mengurus anak, dia juga mengajar bahasa Inggris secara online.' },
    { jp: '研究の<b>かたわら</b>、学生に講義も行っている。', id: 'Di samping meneliti, dia juga mengajar kuliah kepada mahasiswa.' }
  ],
  see_also_grammar: ['gn1-00042', 'gn1-00044'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00184', 'gn1-00042', 'gn1-00074', 'gn1-00182'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00044', level: 'n1', pattern: '〜がてら', reading: '〜gatera',
  meaning: 'sekalian / sambil (melakukan hal lain yang searah)',
  cat: 'purpose',
  connection: 'V-stem / N + がてら',
  desc: '<b>〜がてら</b> menyatakan bahwa seseorang melakukan Y "sekalian" saat melakukan X — X adalah tujuan utama atau aktivitas yang sudah direncanakan, dan Y ditambahkan secara spontan karena searah atau mudah dilakukan bersamaan.',
  nuance: null,
  examples: [
    { jp: '散歩<b>がてら</b>、コンビニに寄った。', id: 'Sekalian jalan-jalan, aku mampir ke minimarket.' },
    { jp: '買い物<b>がてら</b>、友達の家に寄ってみた。', id: 'Sekalian belanja, aku mampir ke rumah teman.' },
    { jp: '運動<b>がてら</b>、図書館まで歩いて行った。', id: 'Sambil berolahraga sekalian, aku berjalan kaki ke perpustakaan.' }
  ],
  see_also_grammar: ['gn1-00042', 'gn1-00043'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00016', 'gn1-00042', 'gn1-00074', 'gn1-00182'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00046', level: 'n1', pattern: '〜をよそに', reading: '〜wo yoso ni',
  meaning: 'mengabaikan ... / tidak peduli dengan ... (meski ada kekhawatiran orang lain)',
  cat: 'contrast-concession',
  connection: 'N + をよそに',
  desc: '<b>〜をよそに</b> menyatakan bahwa subjek bertindak tanpa memedulikan kekhawatiran, harapan, atau perasaan orang-orang di sekitarnya (N). Sering mengandung nuansa kritik atau ironi.',
  nuance: null,
  examples: [
    { jp: '親の心配<b>をよそに</b>、彼は旅を続けた。', id: 'Mengabaikan kekhawatiran orang tuanya, dia terus melanjutkan perjalanan.' },
    { jp: '周囲の反対<b>をよそに</b>、二人は結婚した。', id: 'Tidak peduli dengan penolakan orang-orang sekitar, keduanya tetap menikah.' },
    { jp: '世間の批判<b>をよそに</b>、会社は強引に計画を進めた。', id: 'Mengabaikan kritik publik, perusahaan itu tetap memaksakan rencananya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00019', 'gn2-00142', 'gn2-00098'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00048', level: 'n1', pattern: '〜であれ〜であれ', reading: '〜de are 〜de are',
  meaning: 'baik ... maupun ... / apapun itu',
  cat: 'listing-addition',
  connection: 'N / na-adj + であれ〜N / na-adj + であれ',
  desc: '<b>〜であれ〜であれ</b> menyatakan bahwa apapun pilihannya di antara dua kemungkinan (X atau Y), hal yang dinyatakan dalam klausa utama tetap berlaku. Bersifat inklusif dan exhaustif.',
  nuance: null,
  examples: [
    { jp: '成功<b>であれ</b>失敗<b>であれ</b>、全力を尽くすことが大切だ。', id: 'Baik sukses maupun gagal, yang terpenting adalah memberi usaha terbaik.' },
    { jp: '男性<b>であれ</b>女性<b>であれ</b>、平等に扱われるべきだ。', id: 'Baik pria maupun wanita, seharusnya diperlakukan secara setara.' },
    { jp: '賛成<b>であれ</b>反対<b>であれ</b>、意見を述べてほしい。', id: 'Baik setuju maupun tidak, aku harap kamu menyampaikan pendapat.' }
  ],
  see_also_grammar: ['gn1-00049'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00049', 'gn1-00120', 'gn2-00227', 'gn1-00006', 'gn1-00107', 'gn1-00119'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00049', level: 'n1', pattern: '〜であろうと〜であろうと', reading: '〜de arou to 〜de arou to',
  meaning: 'apapun ... / tidak peduli apakah ... atau ...',
  cat: 'contrast-concession',
  connection: 'N / na-adj + であろうと〜N / na-adj + であろうと',
  desc: '<b>〜であろうと〜であろうと</b> menyatakan bahwa meskipun dua kondisi yang berbeda (X atau Y), hal yang disebutkan dalam klausa utama tidak berubah. Menekankan ketidakpedulian terhadap kondisi apapun.',
  nuance: null,
  examples: [
    { jp: '相手が誰<b>であろうと</b>何<b>であろうと</b>、暴力は許されない。', id: 'Apapun orangnya dan apapun alasannya, kekerasan tidak bisa dibenarkan.' },
    { jp: '有名人<b>であろうと</b>一般人<b>であろうと</b>、法の前では平等だ。', id: 'Tidak peduli orang terkenal atau warga biasa, semua setara di hadapan hukum.' },
    { jp: '理由が何<b>であろうと</b>嘘<b>であろうと</b>、信頼は失われる。', id: 'Apapun alasannya, apapun kebohongannya, kepercayaan itu akan hilang.' }
  ],
  see_also_grammar: ['gn1-00048'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00048', 'gn1-00006', 'gn2-00228'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00050', level: 'n1', pattern: '〜べく', reading: '〜beku',
  meaning: 'untuk / dengan tujuan ... (literary/formal)',
  cat: 'purpose',
  connection: 'V-dict (する→すべく) + べく',
  desc: '<b>〜べく</b> adalah bentuk klasik yang menyatakan tujuan atau maksud tindakan — "melakukan X demi Y." Bentuk klasik dari ために dalam register tinggi.',
  nuance: null,
  examples: [
    { jp: '夢を叶える<b>べく</b>、彼は毎日練習した。', id: 'Demi mewujudkan impiannya, dia berlatih setiap hari.' },
    { jp: '問題を解決す<b>べく</b>、専門家が集められた。', id: 'Demi menyelesaikan masalah, para ahli dikumpulkan.' },
    { jp: '真実を明らかにす<b>べく</b>、調査が開始された。', id: 'Demi mengungkap kebenaran, penyelidikan dimulai.' }
  ],
  see_also_grammar: ['gn1-00051'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00003', 'gn3-00071', 'gn1-00051', 'gn1-00079', 'gn1-00103'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00066', level: 'n1', pattern: '〜をもってしても',
  reading: '〜wo motte shite mo',
  meaning: 'bahkan dengan ... pun / meskipun menggunakan ... sekalipun (tetap tidak bisa)',
  cat: 'contrast-concession',
  connection: 'N + をもってしても',
  desc: '<b>〜をもってしても</b> menyatakan bahwa bahkan dengan menggunakan kemampuan, kekuatan, atau sumber daya terbaik sekalipun, suatu hal tetap tidak bisa tercapai. Selalu diikuti klausa negatif.',
  nuance: null,
  examples: [
    { jp: '現代の科学<b>をもってしても</b>、解明できない謎がある。', id: 'Bahkan dengan ilmu pengetahuan modern sekalipun, ada misteri yang belum terpecahkan.' },
    { jp: '彼の卓越した技術<b>をもってしても</b>、その記録を破ることはできなかった。', id: 'Bahkan dengan keahliannya yang luar biasa sekalipun, catatan itu tidak bisa dipecahkan.' }
  ],
  see_also_grammar: ['gn1-00065'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00088', 'gn1-00114'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00074', level: 'n1', pattern: '〜かたがた',
  reading: '〜katagata',
  meaning: 'sambil ... / sekaligus untuk ... (dua tujuan dalam satu kunjungan — sangat formal)',
  cat: 'purpose',
  connection: 'N (verbal noun: 挨拶、お礼、報告など) + かたがた',
  desc: '<b>〜かたがた</b> menyatakan bahwa suatu kunjungan atau pertemuan dilakukan untuk dua tujuan sekaligus. Tujuan yang disebutkan sebelum かたがた adalah tujuan pendamping; tujuan utama biasanya disebutkan setelahnya.',
  nuance: null,
  examples: [
    { jp: 'ご挨拶<b>かたがた</b>、お伺いしました。', id: 'Sambil menyampaikan salam, saya datang berkunjung.' },
    { jp: 'お礼<b>かたがた</b>、近況をご報告申し上げます。', id: 'Sambil menyampaikan terima kasih, perkenankan saya melaporkan kabar terkini.' }
  ],
  see_also_grammar: ['gn1-00075'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00044', 'gn3-00016', 'gn1-00043'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00079', level: 'n1', pattern: '〜んがために / 〜んがための',
  reading: '〜n ga tame ni / 〜n ga tame no',
  meaning: 'untuk / demi / dengan tujuan — (ekspresi tujuan literary/formal kuno yang sangat kuat)',
  cat: 'purpose',
  connection: 'V-nai-stem + んがために / んがための (suru → せんがために)',
  desc: '<b>〜んがために</b> adalah ekspresi tujuan yang sangat formal dan bernuansa sastra klasik. Menyatakan bahwa seseorang melakukan sesuatu dengan tekad kuat demi mencapai tujuan tertentu. Varian 〜んがための digunakan sebagai modifier nomina.',
  nuance: null,
  examples: [
    { jp: '勝た<b>んがために</b>、選手たちは限界を超えて練習した。', id: 'Demi meraih kemenangan, para atlet berlatih melampaui batas kemampuan.' },
    { jp: '国を守ら<b>んがための</b>犠牲であった。', id: 'Itu adalah pengorbanan demi melindungi negara.' }
  ],
  see_also_grammar: ['gn1-00074', 'gn1-00075'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00003', 'gn1-00050'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00085', level: 'n1', pattern: '〜ないまでも',
  reading: '〜nai made mo',
  meaning: 'meskipun tidak sampai ..., setidaknya ...; kalaupun tidak bisa mencapai standar tertinggi, minimal ...',
  cat: 'contrast-concession',
  connection: 'V-nai + までも（〜くらい/〜ぐらい/〜は〜てほしい）',
  desc: '<b>〜ないまでも</b> digunakan ketika pembicara mengakui bahwa standar atau tindakan ideal tidak dapat dicapai, lalu menyebutkan alternatif yang lebih rendah namun masih diharapkan. Struktur: "meskipun tidak bisa X, setidaknya Y."',
  nuance: null,
  examples: [
    { jp: '毎日でき<b>ないまでも</b>、週に二、三回は運動するようにしている。', id: 'Meskipun tidak bisa setiap hari, aku berusaha berolahraga dua atau tiga kali seminggu.' },
    { jp: '完璧にはでき<b>ないまでも</b>、誠実に取り組む姿勢が大切だ。', id: 'Meskipun tidak bisa sempurna, sikap yang serius dan tulus dalam mengerjakannya tetaplah penting.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00026', 'gn2-00226'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00090', level: 'n1', pattern: '〜とあっては',
  reading: '〜to atte wa',
  meaning: 'karena situasinya memang ..., mengingat kenyataan bahwa ...; dalam kondisi seperti itu, sudah wajar jika ...',
  cat: 'reason-cause',
  connection: 'N / plain clause + とあっては',
  desc: '<b>〜とあっては</b> menyatakan bahwa karena situasi atau kenyataan tertentu yang disebutkan (yang biasanya tidak biasa atau signifikan), suatu reaksi atau tindakan tertentu menjadi wajar, tak terhindarkan, atau terpaksa dilakukan.',
  nuance: null,
  examples: [
    { jp: '社長直々のお願い<b>とあっては</b>、断るわけにはいかない。', id: 'Karena ini adalah permintaan langsung dari direktur utama, tidak mungkin aku menolaknya.' },
    { jp: '子どもが熱を出した<b>とあっては</b>、仕事を早退するしかない。', id: 'Mengingat anak sudah demam, tidak ada pilihan selain pulang kerja lebih awal.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00087', 'gn2-00086', 'gn3-00073', 'gn2-00089', 'gn2-00222', 'gn2-00224'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00098', level: 'n1', pattern: '〜をもとに（して）',
  reading: '〜o moto ni (shite)',
  meaning: 'berdasarkan ..., dengan mengambil ... sebagai sumber atau acuan',
  cat: 'reason-cause',
  connection: 'N + をもとに（して）/ をもとにした + N',
  desc: '<b>〜をもとに</b> menyatakan bahwa sesuatu dibuat, dikerjakan, atau dikembangkan dengan menggunakan X sebagai bahan dasar, referensi, atau sumber utama. X bisa berupa data, pengalaman, ide, fakta, atau dokumen.',
  nuance: null,
  examples: [
    { jp: '実際の事件<b>をもとに</b>、この映画は制作された。', id: 'Film ini diproduksi berdasarkan kejadian nyata.' },
    { jp: 'アンケートの回答<b>をもとにして</b>、サービス改善案をまとめた。', id: 'Proposal perbaikan layanan disusun berdasarkan jawaban kuesioner.' },
  ],
  see_also_grammar: ['gn1-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00167', 'gn1-00163'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00099', level: 'n1', pattern: '〜と相まって',
  reading: '〜to aimatte',
  meaning: 'dikombinasikan dengan ..., berpadu dengan ..., bersama-sama dengan ... menghasilkan efek',
  cat: 'listing-addition',
  connection: 'N + と相まって',
  desc: '<b>〜と相まって</b> menyatakan bahwa dua faktor atau lebih bergabung dan saling mendukung untuk menghasilkan suatu efek atau hasil. Tidak hanya "ditambah," tetapi keduanya bersinergi dan efeknya lebih besar dari jika hanya satu saja.',
  nuance: null,
  examples: [
    { jp: '彼の才能は、たゆまぬ努力<b>と相まって</b>、傑出した成果を生み出した。', id: 'Bakatnya, berpadu dengan kerja keras yang tak pernah berhenti, menghasilkan prestasi yang luar biasa.' },
    { jp: '好立地<b>と相まって</b>、そのカフェは瞬く間に人気店となった。', id: 'Dikombinasikan dengan lokasi yang strategis, kafe itu dalam sekejap menjadi tempat yang sangat populer.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00002', 'gn2-00028'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00103', level: 'n1', pattern: '〜んがために / 〜んがための',
  reading: '〜n ga tame ni / 〜n ga tame no',
  meaning: 'demi ..., untuk tujuan ... (ekspresi tujuan yang sangat formal, sastra, dan penuh tekad)',
  cat: 'purpose',
  connection: 'V-nai-stem + んがために / んがための + N（する→せんがために）',
  desc: '<b>〜んがために</b> adalah ekspresi tujuan bercorak sastra klasik yang menyatakan bahwa seseorang melakukan sesuatu dengan tekad dan keseriusan yang sangat besar demi mencapai tujuan tertentu. Varian 〜んがための digunakan untuk memodifikasi nomina berikutnya.',
  nuance: null,
  examples: [
    { jp: '国を救わ<b>んがために</b>、彼は命を賭した。', id: 'Demi menyelamatkan negara, dia mempertaruhkan nyawanya.' },
    { jp: '真実を知ら<b>んがための</b>長い調査が、ようやく実を結んだ。', id: 'Penyelidikan panjang demi mengetahui kebenaran akhirnya membuahkan hasil.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00050', 'gn3-00003'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00105', level: 'n1', pattern: '〜をよそに',
  reading: '〜o yoso ni',
  meaning: 'tanpa peduli ..., mengabaikan ..., tidak menggubris perasaan/situasi ...',
  cat: 'contrast-concession',
  connection: 'N + をよそに',
  desc: '<b>〜をよそに</b> menyatakan bahwa seseorang melakukan sesuatu tanpa mempedulikan atau mengabaikan perasaan, kekhawatiran, atau situasi yang disebutkan. X (sebelum をよそに) adalah hal yang seharusnya diperhatikan tetapi justru diabaikan.',
  nuance: null,
  examples: [
    { jp: '周囲の反対<b>をよそに</b>、彼は独断でプロジェクトを進めた。', id: 'Tanpa menggubris penolakan orang-orang di sekitarnya, dia melanjutkan proyek itu secara sepihak.' },
    { jp: '親の心配<b>をよそに</b>、子どもたちは無邪気に遊んでいた。', id: 'Tanpa peduli kekhawatiran orang tua, anak-anak bermain dengan riang tanpa beban.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00031', 'gn1-00019'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00106', level: 'n1', pattern: '〜であれ〜であれ',
  reading: '〜de are 〜de are',
  meaning: 'baik ... maupun ..., entah ... atau ...; apapun pilihannya, berlaku untuk keduanya',
  cat: 'listing-addition',
  connection: 'N / na-adj + であれ + N / na-adj + であれ',
  desc: '<b>〜であれ〜であれ</b> menyatakan bahwa terlepas dari pilihan mana di antara dua (atau lebih) kemungkinan yang disebutkan, pernyataan atau aturan yang mengikutinya tetap berlaku untuk semua. Setara dengan 〜にしても〜にしても atau 〜にせよ〜にせよ dalam nuansa.',
  nuance: null,
  examples: [
    { jp: '男性<b>であれ</b>女性<b>であれ</b>、このルールはすべての社員に平等に適用される。', id: 'Baik pria maupun wanita, aturan ini berlaku secara merata untuk semua karyawan.' },
    { jp: '成功<b>であれ</b>失敗<b>であれ</b>、その経験から学ぶ姿勢が大切だ。', id: 'Baik sukses maupun gagal, yang terpenting adalah sikap untuk belajar dari pengalaman tersebut.' },
  ],
  see_also_grammar: ['gn1-00107', 'gn1-00108'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00119', 'gn1-00107', 'gn2-00229'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00107', level: 'n1', pattern: '〜といい〜といい',
  reading: '〜to ii 〜to ii',
  meaning: 'baik ... maupun ..., dilihat dari segi ... dan ...; dalam hal ... dan ... keduanya (mengevaluasi beberapa aspek)',
  cat: 'listing-addition',
  connection: 'N + といい + N + といい',
  desc: '<b>〜といい〜といい</b> digunakan untuk menyebutkan dua aspek atau karakteristik dari satu hal/orang, lalu memberikan penilaian menyeluruh berdasarkan kedua aspek tersebut. Biasanya diikuti penilaian positif atau negatif yang mencakup keduanya.',
  nuance: null,
  examples: [
    { jp: 'このレストランは、料理<b>といい</b>サービス<b>といい</b>、文句のつけようがない。', id: 'Restoran ini, baik dari segi masakan maupun layanannya, tidak ada yang bisa dikomplain.' },
    { jp: '彼の態度<b>といい</b>言葉遣い<b>といい</b>、社会人として問題がある。', id: 'Baik dari sikapnya maupun cara bicaranya, ada masalah yang serius sebagai seorang profesional.' },
  ],
  see_also_grammar: ['gn1-00106', 'gn1-00108'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00048', 'gn1-00006', 'gn1-00106'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00108', level: 'n1', pattern: '〜なり〜なり',
  reading: '〜nari 〜nari',
  meaning: '... atau ..., pilih salah satu yang mana pun; lakukan setidaknya salah satu dari beberapa pilihan',
  cat: 'listing-addition',
  connection: 'V-dictionary / N + なり + V-dictionary / N + なり',
  desc: '<b>〜なり〜なり</b> menyajikan dua atau lebih pilihan tindakan atau hal, dan menyiratkan bahwa subjek seharusnya atau sebaiknya memilih dan melakukan setidaknya salah satunya. Sering mengandung nuansa dorongan, saran, atau imbauan — "lakukan yang mana saja dari ini."',
  nuance: null,
  examples: [
    { jp: '困っているなら、相談する<b>なり</b>助けを求める<b>なり</b>してください。', id: 'Kalau kamu kesulitan, minta saran atau mintalah bantuan — lakukan yang mana saja.' },
    { jp: '電話する<b>なり</b>メールを送る<b>なり</b>、何か連絡をくれれば良かったのに。', id: 'Seharusnya kamu menghubungi, entah lewat telepon atau email — yang mana saja.' },
  ],
  see_also_grammar: ['gn1-00106', 'gn1-00107'],
  see_also_vocab: [],
  confusion_pairs: ['gn5-00074', 'gn4-00004'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00111', level: 'n1', pattern: '〜べく',
  reading: '〜beku',
  meaning: 'demi ..., untuk tujuan ... (formal/literary)',
  cat: 'purpose',
  connection: 'V-dictionary + べく (suru → すべく)',
  desc: '<b>〜べく</b> menyatakan tujuan atau niat dengan nuansa sangat formal dan sastra. Maknanya setara dengan ために atau ようと, namun jauh lebih kuat secara register dan terasa arkaik. Digunakan dalam tulisan serius, pidato resmi, atau laporan formal.',
  nuance: null,
  examples: [
    { jp: '優勝す<b>べく</b>、チーム全員が一丸となって練習した。', id: 'Demi meraih kemenangan, seluruh anggota tim berlatih bersatu padu.' },
    { jp: '問題を解決す<b>べく</b>、専門家を招集した。', id: 'Demi menyelesaikan masalah, para ahli dipanggil untuk berkumpul.' },
    { jp: '夢を実現す<b>べく</b>、彼は故郷を離れた。', id: 'Demi mewujudkan impiannya, ia meninggalkan kampung halaman.' }
  ],
  see_also_grammar: ['gn1-00112', 'gn1-00079'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00003'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00115', level: 'n1', pattern: '〜をもってしても',
  reading: '〜wo motte shite mo',
  meaning: 'bahkan dengan ..., sekalipun menggunakan ..., meski bermodal ...',
  cat: 'contrast-concession',
  connection: 'N + をもってしても',
  desc: '<b>〜をもってしても</b> menyatakan bahwa bahkan dengan menggunakan sumber daya, kekuatan, atau kemampuan terbaik sekalipun, sesuatu tetap tidak dapat dilakukan atau tidak cukup. Mengandung nuansa penegasan terhadap keterbatasan.',
  nuance: null,
  examples: [
    { jp: 'どんな名医<b>をもってしても</b>、この病気は治せなかった。', id: 'Bahkan dengan dokter terbaik sekalipun, penyakit ini tidak bisa disembuhkan.' },
    { jp: '彼の努力<b>をもってしても</b>、合格点には届かなかった。', id: 'Bahkan dengan segala usaha kerasnya, nilai kelulusan pun tidak tercapai.' }
  ],
  see_also_grammar: ['gn1-00114'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00088', 'gn1-00114'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00118', level: 'n1', pattern: '〜であれ',
  reading: '〜de are',
  meaning: 'meskipun ..., sekalipun ..., entah ... (formal)',
  cat: 'contrast-concession',
  connection: 'N + であれ / V-plain + であれ',
  desc: '<b>〜であれ</b> menyatakan konsesi atau penekanan bahwa terlepas dari kondisi yang disebutkan, pernyataan utama tetap berlaku. Digunakan secara formal untuk menyatakan bahwa tidak ada pengecualian. Bisa berdiri sendiri atau diulang (〜であれ〜であれ) untuk menyatakan "baik ... maupun ...".',
  nuance: null,
  examples: [
    { jp: '何人<b>であれ</b>、法律の前では平等だ。', id: 'Siapa pun orangnya, semua sama di hadapan hukum.' },
    { jp: '成功<b>であれ</b>失敗<b>であれ</b>、挑戦することに意義がある。', id: 'Baik sukses maupun gagal, ada nilai dalam mencoba.' },
    { jp: '理由が何<b>であれ</b>、暴力は許されない。', id: 'Apa pun alasannya, kekerasan tidak bisa dibenarkan.' }
  ],
  see_also_grammar: ['gn1-00119', 'gn1-00120'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00012', 'gn2-00229', 'gn1-00009'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00119', level: 'n1', pattern: '〜にせよ〜にせよ',
  reading: '〜ni seyo 〜ni seyo',
  meaning: 'baik ... maupun ..., entah ... entah ...',
  cat: 'contrast-concession',
  connection: 'V-plain/N + にせよ〜V-plain/N + にせよ',
  desc: '<b>〜にせよ〜にせよ</b> menyatakan bahwa terlepas dari pilihan atau kondisi mana pun yang disebutkan, kesimpulan atau pernyataan utama tetap berlaku. Digunakan untuk menyatakan bahwa kedua kemungkinan tidak mengubah situasi atau sikap yang akan diambil.',
  nuance: null,
  examples: [
    { jp: '行く<b>にせよ</b>行かない<b>にせよ</b>、早めに返事をください。', id: 'Baik kamu pergi maupun tidak, mohon segera beri jawaban.' },
    { jp: '賛成する<b>にせよ</b>反対する<b>にせよ</b>、理由を明確に述べてほしい。', id: 'Baik setuju maupun tidak, tolong nyatakan alasannya dengan jelas.' }
  ],
  see_also_grammar: ['gn1-00118', 'gn1-00120'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00120', 'gn1-00048', 'gn1-00006', 'gn2-00227', 'gn1-00106'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00120', level: 'n1', pattern: '〜にしろ〜にしろ',
  reading: '〜ni shiro 〜ni shiro',
  meaning: 'baik ... maupun ..., entah ... entah ... (agak lebih kasual)',
  cat: 'contrast-concession',
  connection: 'V-plain/N + にしろ〜V-plain/N + にしろ',
  desc: '<b>〜にしろ〜にしろ</b> menyatakan bahwa dalam situasi apa pun — baik A maupun B — pernyataan utama tetap berlaku. Secara makna dan fungsi sangat mirip dengan 〜にせよ〜にせよ, namun sedikit lebih kasual dan lebih sering digunakan dalam percakapan.',
  nuance: null,
  examples: [
    { jp: '合格する<b>にしろ</b>しない<b>にしろ</b>、最後まで全力でやろう。', id: 'Baik lulus maupun tidak, mari lakukan yang terbaik sampai akhir.' },
    { jp: '買う<b>にしろ</b>買わない<b>にしろ</b>、一度試してみる価値はある。', id: 'Baik kamu beli maupun tidak, mencobanya sekali tetap bernilai.' }
  ],
  see_also_grammar: ['gn1-00118', 'gn1-00119'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00119', 'gn1-00006', 'gn2-00228', 'gn1-00048'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00122', level: 'n1', pattern: '〜とも',
  reading: '〜to mo',
  meaning: 'meskipun ..., sekalipun ... (penegasan dengan konsesi)',
  cat: 'contrast-concession',
  connection: 'V-volitional + とも / Adj-i (stem) + かろうとも / N・Adj-na + であろうとも',
  desc: '<b>〜とも</b> menyatakan konsesi kuat — bahwa meskipun sesuatu terjadi atau kondisinya demikian, pembicara tetap pada sikapnya atau pernyataan utama tetap berlaku. Memberikan nuansa tekad yang kuat atau penerimaan yang tulus terhadap kondisi buruk sekalipun.',
  nuance: null,
  examples: [
    { jp: 'たとえ失敗しよう<b>とも</b>、私はこの道を進み続ける。', id: 'Sekalipun gagal, aku akan terus melangkah di jalan ini.' },
    { jp: '嵐が来よう<b>とも</b>、私たちは計画を変えない。', id: 'Meskipun badai datang, kami tidak akan mengubah rencana.' },
    { jp: 'いかに困難であろう<b>とも</b>、諦めない精神が重要だ。', id: 'Betapapun sulitnya, semangat untuk tidak menyerah adalah hal yang penting.' }
  ],
  see_also_grammar: ['gn1-00136'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00225', 'gn1-00123'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00124', level: 'n1', pattern: '〜ならいざしらず',
  reading: '〜nara iza shirazu',
  meaning: 'kalau memang ..., lain soal kalau ..., bisa dimengerti kalau ...',
  cat: 'contrast-concession',
  connection: 'N + ならいざしらず / V-plain + ならいざしらず',
  desc: '<b>〜ならいざしらず</b> menyatakan bahwa kondisi A (yang disebutkan) mungkin bisa dimaklumi atau dipahami, namun kondisi aktual yang terjadi tidak bisa diterima dengan cara yang sama. Menetapkan pengecualian hipotetis untuk menekankan ketidaksesuaian situasi yang sebenarnya.',
  nuance: null,
  examples: [
    { jp: '初心者<b>ならいざしらず</b>、プロがこんなミスをするとは驚きだ。', id: 'Kalau pemula mungkin masih bisa dimaklumi, tapi seorang profesional membuat kesalahan seperti ini sungguh mengejutkan.' },
    { jp: '昔<b>ならいざしらず</b>、今はインターネットで何でも調べられる。', id: 'Kalau zaman dulu mungkin berbeda, tapi sekarang segala hal bisa dicari lewat internet.' }
  ],
  see_also_grammar: ['gn1-00125'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00125'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00125', level: 'n1', pattern: '〜はいざしらず',
  reading: '〜wa iza shirazu',
  meaning: '... itu lain soal, tapi ..., soal ... tidak tahu, tapi ...',
  cat: 'contrast-concession',
  connection: 'N + はいざしらず',
  desc: '<b>〜はいざしらず</b> menyatakan bahwa hal A (yang disebutkan sebelumnya) tidak dipermasalahkan atau dikecualikan, namun yang menjadi fokus adalah hal B yang berbeda atau lebih penting. Digunakan untuk mengalihkan atau memisahkan dua hal dan menekankan bahwa fokusnya bukan pada A.',
  nuance: null,
  examples: [
    { jp: '趣味<b>はいざしらず</b>、仕事では正確さが求められる。', id: 'Soal hobi lain cerita, tapi dalam pekerjaan ketelitian sangat diperlukan.' },
    { jp: '他の人<b>はいざしらず</b>、あなたにはもっと頑張ってほしい。', id: 'Soal orang lain lain cerita, tapi dari kamu aku berharap bisa berusaha lebih keras.' }
  ],
  see_also_grammar: ['gn1-00124'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00124'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00136', level: 'n1', pattern: '〜といえども',
  reading: '〜to iedo mo',
  meaning: 'meskipun ..., sekalipun ... (formal, dengan konsesi kuat)',
  cat: 'contrast-concession',
  connection: 'N / V-plain / Adj + といえども',
  desc: '<b>〜といえども</b> menyatakan konsesi kuat dalam bahasa yang sangat formal. Meskipun kondisi atau status yang disebutkan diakui, pernyataan utama tetap berlaku atau merupakan pengecualian. Sering mengandung nuansa prinsip yang tidak tergoyahkan meskipun menghadapi kondisi yang biasanya dianggap sebagai pengecualian.',
  nuance: null,
  examples: [
    { jp: '大統領<b>といえども</b>、法の上に立つことはできない。', id: 'Bahkan seorang presiden sekalipun tidak bisa berdiri di atas hukum.' },
    { jp: '緊急事態<b>といえども</b>、基本的人権は守られなければならない。', id: 'Meskipun dalam keadaan darurat sekalipun, hak asasi manusia dasar harus tetap dilindungi.' }
  ],
  see_also_grammar: ['gn1-00137', 'gn1-00122'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00008', 'gn1-00137', 'gn2-00169'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00137', level: 'n1', pattern: '〜といえど',
  reading: '〜to iedo',
  meaning: 'meskipun ..., sekalipun ... (sangat formal, literary)',
  cat: 'contrast-concession',
  connection: 'N / V-plain / Adj + といえど',
  desc: '<b>〜といえど</b> adalah bentuk yang lebih pendek dan lebih arkaik dari 〜といえども. Maknanya identik — menyatakan konsesi bahwa meskipun kondisi tertentu diakui, pernyataan utama tetap berlaku. Muncul terutama dalam karya sastra klasik, puisi, atau teks sangat formal.',
  nuance: null,
  examples: [
    { jp: '春<b>といえど</b>、山の頂にはまだ雪が残る。', id: 'Meskipun sudah musim semi, salju masih tersisa di puncak gunung.' },
    { jp: '友<b>といえど</b>、秘密を話すべきではなかった。', id: 'Meskipun itu seorang teman, seharusnya aku tidak menceritakan rahasianya.' }
  ],
  see_also_grammar: ['gn1-00136'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00009', 'gn1-00008', 'gn1-00136'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00168',
  level: 'n1',
  pattern: '〜によって',
  reading: '〜ni yotte',
  meaning: 'melalui ..., disebabkan oleh ..., bergantung pada ..., oleh ...',
  cat: 'reason-cause',
  connection: 'N + によって',
  desc: '<b>〜によって</b> adalah partikel majemuk serba guna dengan beberapa fungsi utama: (1) menyatakan agen dalam kalimat pasif ("oleh ..."), (2) menyatakan cara atau metode ("melalui/dengan cara ..."), (3) menyatakan penyebab ("disebabkan oleh ..."), dan (4) menyatakan variasi bergantung pada kondisi ("tergantung pada ...").',
  nuance: null,
  examples: [
    { jp: 'この橋は地震<b>によって</b>崩壊した。', id: 'Jembatan ini runtuh disebabkan oleh gempa bumi.' },
    { jp: '結果は努力<b>によって</b>大きく変わる。', id: 'Hasil bisa berubah besar bergantung pada usaha.' },
    { jp: '新技術<b>によって</b>、生産効率が上がった。', id: 'Melalui teknologi baru, efisiensi produksi meningkat.' },
  ],
  see_also_grammar: ['gn1-00169'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00104', 'gn2-00009', 'gn2-00054', 'gn2-00099', 'gn2-00220', 'gn2-00056', 'gn2-00138', 'gn2-00195', 'gn2-00217', 'gn1-00001', 'gn1-00095', 'gn1-00169'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00187',
  level: 'n1',
  pattern: '〜つつも',
  reading: '〜tsutsu mo',
  meaning: 'meskipun ... (kontras formal; sadar akan kondisi tapi tetap bertindak sebaliknya)',
  cat: 'contrast-concession',
  connection: 'V-masu stem + つつも',
  desc: '<b>〜つつも</b> menyatakan kontras: meskipun pembicara menyadari atau merasakan kondisi A, tindakan atau kenyataan B yang berlawanan tetap terjadi. Partikel も memperkuat nuansa kontras. Lebih formal dari 〜けれど dan sering mengandung nuansa konflik batin.',
  nuance: null,
  examples: [
    { jp: '悪いと思い<b>つつも</b>、つい言ってしまった。', id: 'Meskipun merasa itu salah, terpeleset mengatakannya juga.' },
    { jp: '迷い<b>つつも</b>、最終的には参加することにした。', id: 'Meskipun ragu-ragu, akhirnya memutuskan untuk ikut.' },
    { jp: '反対し<b>つつも</b>、上司の判断に従った。', id: 'Meskipun menentang, ia mengikuti keputusan atasannya.' },
  ],
  see_also_grammar: ['gn1-00185', 'gn1-00184'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00010', 'gn1-00185', 'gn2-00238', 'gn2-00120'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── NOUNS-PREDICATES (2) ───────────────────────────────────

{
  id: 'gn1-00047', level: 'n1', pattern: '〜にほかならない', reading: '〜ni hoka naranai',
  meaning: 'tidak lain adalah ... / justru ... (penegasan kuat)',
  cat: 'copula',
  connection: 'N / V-plain + にほかならない',
  desc: '<b>〜にほかならない</b> adalah penegasan kuat bahwa X tidak lain, tidak lebih, tidak kurang dari Y. Pembicara menyimpulkan atau menyatakan identitas/alasan dengan sangat tegas.',
  nuance: null,
  examples: [
    { jp: 'これは彼の努力の結果<b>にほかならない</b>。', id: 'Ini tidak lain adalah hasil dari kerja kerasnya.' },
    { jp: '彼女が成功したのは、才能ではなく努力<b>にほかならない</b>。', id: 'Keberhasilannya tidak lain adalah kerja keras, bukan bakat.' },
    { jp: '問題の根本は信頼の欠如<b>にほかならない</b>。', id: 'Akar permasalahannya tidak lain adalah kurangnya kepercayaan.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00154'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00117', level: 'n1', pattern: '〜たる',
  reading: '〜taru',
  meaning: 'yang layak disebut ..., yang sejati ..., yang sesungguhnya ...',
  cat: 'predicate-adjective',
  connection: 'N + たる + N',
  desc: '<b>〜たる</b> adalah bentuk atributif dari kopula formal たり. Digunakan untuk memodifikasi nomina dan menyatakan bahwa sesuatu atau seseorang benar-benar memenuhi kualifikasi atau esensi dari hal yang disebutkan. Memberikan kesan penilaian atau standar yang tinggi.',
  nuance: null,
  examples: [
    { jp: '真のリーダー<b>たる</b>人物は、部下の失敗を自分の責任として引き受ける。', id: 'Seseorang yang layak disebut pemimpin sejati akan menanggung kegagalan bawahannya sebagai tanggung jawabnya sendiri.' },
    { jp: '名医<b>たる</b>所以は、技術だけでなく患者への共感にある。', id: 'Alasan seseorang layak disebut dokter ternama terletak bukan hanya pada keahlian, tetapi juga pada empati terhadap pasien.' }
  ],
  see_also_grammar: ['gn1-00116'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00144', 'gn1-00116'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── DESIRE-SOCIAL (1) ───────────────────────────────────

{
  id: 'gn1-00073', level: 'n1', pattern: '〜ないではいられない',
  reading: '〜nai de wa irarenai',
  meaning: 'tidak bisa menahan diri untuk tidak ... / terdorong untuk ... (dari dalam diri)',
  cat: 'desire-want',
  connection: 'V-nai + ではいられない',
  desc: '<b>〜ないではいられない</b> menyatakan dorongan kuat dari dalam diri — seseorang tidak bisa menahan impuls atau perasaan untuk tidak melakukan sesuatu. Sumber tekanannya adalah emosi atau dorongan internal.',
  nuance: null,
  examples: [
    { jp: 'あの映画を見ると、笑わ<b>ないではいられない</b>。', id: 'Kalau melihat film itu, tidak bisa tidak tertawa.' },
    { jp: '不公平なことを見ると、文句を言わ<b>ないではいられない</b>。', id: 'Kalau melihat ketidakadilan, tidak bisa menahan diri untuk tidak protes.' }
  ],
  see_also_grammar: ['gn1-00072', 'gn1-00068'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00072', 'gn1-00133', 'gn2-00179'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

  // ── PARTICLES (3) ───────────────────────────────────

{
  id: 'gn1-00093', level: 'n1', pattern: '〜において / 〜における',
  reading: '〜ni oite / 〜ni okeru',
  meaning: 'di ..., dalam bidang/konteks/waktu ... (penanda lokasi, bidang, atau situasi formal)',
  cat: 'particle',
  connection: 'N + において / においては / においても / における + N',
  desc: '<b>〜において</b> adalah partikel formal yang menandai lokasi, konteks, bidang, atau waktu di mana suatu peristiwa atau kondisi berlaku. Setara dengan で atau に dalam situasi formal. 〜における digunakan sebagai modifier nomina (adjektivalisasi).',
  nuance: null,
  examples: [
    { jp: '現代社会<b>において</b>、デジタルリテラシーは不可欠なスキルとなっている。', id: 'Dalam masyarakat modern, literasi digital telah menjadi keterampilan yang mutlak diperlukan.' },
    { jp: 'この分野<b>における</b>彼の貢献は計り知れない。', id: 'Kontribusinya dalam bidang ini tidak ternilai besarnya.' },
  ],
  see_also_grammar: ['gn1-00092', 'gn1-00094'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00092', 'gn4-00011'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00195',
  level: 'n1',
  pattern: '〜において',
  reading: '〜ni oite',
  meaning: 'di ..., dalam ..., dalam konteks ... (formal; adverbial)',
  cat: 'particle',
  connection: 'N + において',
  desc: '<b>〜において</b> adalah partikel majemuk formal yang menyatakan tempat, waktu, atau konteks di mana sesuatu terjadi atau berlaku. Berfungsi sebagai adverbial — menerangkan verba atau predikat kalimat. Sering digunakan untuk menggantikan で atau に dalam konteks formal.',
  nuance: null,
  examples: [
    { jp: '現代社会<b>において</b>、情報リテラシーは必須だ。', id: 'Dalam masyarakat modern, literasi informasi adalah hal yang wajib.' },
    { jp: 'この分野<b>において</b>、彼女は第一人者だ。', id: 'Dalam bidang ini, dia adalah yang terdepan.' },
    { jp: '国際会議<b>において</b>、重要な決定が下された。', id: 'Dalam konferensi internasional itu, keputusan penting telah diambil.' },
  ],
  see_also_grammar: ['gn1-00196', 'gn1-00197'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00196', 'gn2-00006', 'gn1-00092', 'gn1-00113', 'gn1-00197', 'gn1-00198'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00196',
  level: 'n1',
  pattern: '〜における',
  reading: '〜ni okeru',
  meaning: 'yang berada di ..., dalam konteks ... (formal; prenominal/atributif)',
  cat: 'particle',
  connection: 'N + における + N',
  desc: '<b>〜における</b> adalah bentuk prenominal (atributif) dari 〜において (gn1-00195). Digunakan untuk menerangkan nomina yang mengikutinya — sama dengan 〜において namun posisinya sebelum nomina, bukan sebelum predikat.',
  nuance: null,
  examples: [
    { jp: '日本<b>における</b>少子化は深刻な課題だ。', id: 'Penurunan angka kelahiran di Jepang adalah masalah yang serius.' },
    { jp: 'グローバル化社会<b>における</b>言語教育の重要性が増している。', id: 'Pentingnya pendidikan bahasa dalam masyarakat yang mengglobal semakin meningkat.' },
    { jp: '現代医学<b>における</b>最新の研究成果を紹介する。', id: 'Memperkenalkan hasil penelitian terbaru dalam ilmu kedokteran modern.' },
  ],
  see_also_grammar: ['gn1-00195', 'gn1-00197'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00195'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── ADVERBS (3) ───────────────────────────────────

{
  id: 'gn1-00123', level: 'n1', pattern: '〜しも',
  reading: '〜shi mo',
  meaning: 'justru ..., tepat ..., bahkan ... (penekanan kontekstual)',
  cat: 'adverb',
  connection: 'Terikat pada kata-kata tertentu: 必ずしも、折りしも、何もしも',
  desc: '<b>〜しも</b> adalah partikel penekan yang muncul dalam kombinasi tetap dengan kata-kata tertentu. Paling umum dalam bentuk 必ずしも (tidak selalu/tidak serta-merta), 折りしも (tepat pada saat itu), dan 何もしも (apa pun juga). Menambahkan penekanan pada ketepatan waktu, konteks, atau cakupan yang disebut.',
  nuance: null,
  examples: [
    { jp: 'お金が多ければ必ず<b>しも</b>幸せになれるわけではない。', id: 'Banyak uang tidak serta-merta menjamin kebahagiaan.' },
    { jp: '折り<b>しも</b>、雪が降り始めた。', id: 'Tepat pada saat itu, salju mulai turun.' },
    { jp: '必ず<b>しも</b>専門家だけが正解を知っているとは限らない。', id: 'Tidak selalu hanya para ahli yang mengetahui jawaban yang benar.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00122'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00180',
  level: 'n1',
  pattern: '〜かねがね',
  reading: '〜kanegane',
  meaning: 'sudah lama (ingin/berpikir) ..., sejak dulu ... (adverbia waktu)',
  cat: 'adverb',
  connection: 'かねがね + V (terutama 思う, 聞く, 存じる)',
  desc: '<b>〜かねがね</b> adalah adverbia yang menyatakan bahwa sesuatu sudah ada dalam pikiran atau keinginan pembicara sejak lama — jauh sebelum momen yang dibicarakan. Sering digunakan dalam konteks pertemuan, perkenalan, atau ungkapan yang menunjukkan antusiasme yang telah lama tersimpan.',
  nuance: null,
  examples: [
    { jp: '<b>かねがね</b>お会いしたいと思っておりました。', id: 'Sudah lama saya ingin bertemu dengan Anda.' },
    { jp: '<b>かねがね</b>ご評判は伺っておりました。', id: 'Sudah lama saya mendengar reputasi Anda.' },
    { jp: '<b>かねがね</b>この地を訪れたいと思っていた。', id: 'Sudah lama saya ingin mengunjungi tempat ini.' },
  ],
  see_also_grammar: ['gn1-00181'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00181', 'gn2-00092'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00181',
  level: 'n1',
  pattern: '〜かねてから',
  reading: '〜kanete kara',
  meaning: 'sudah sejak lama ..., dari jauh hari ... (rencana atau keinginan yang sudah ada)',
  cat: 'adverb',
  connection: 'かねてから + V',
  desc: '<b>〜かねてから</b> menyatakan bahwa sesuatu sudah ada dalam rencana, keinginan, atau pemikiran pembicara sejak jauh sebelumnya — bukan sesuatu yang baru muncul. Menekankan bahwa hal tersebut sudah dipersiapkan atau diinginkan dari waktu yang lama.',
  nuance: null,
  examples: [
    { jp: '<b>かねてから</b>の夢がついに実現した。', id: 'Impian yang sudah lama tersimpan akhirnya terwujud.' },
    { jp: '<b>かねてから</b>計画していた事業をスタートさせた。', id: 'Usaha yang sudah lama direncanakan akhirnya dimulai.' },
    { jp: '<b>かねてから</b>交流のある団体と協定を結んだ。', id: 'Perjanjian dibuat dengan organisasi yang sudah lama menjalin hubungan.' },
  ],
  see_also_grammar: ['gn1-00180'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00180'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

  // ── EXPRESSIONS (36) ───────────────────────────────────

{
  id: 'gn1-00092', level: 'n1', pattern: '〜にあって',
  reading: '〜ni atte',
  meaning: 'dalam situasi/konteks ..., berada di tengah-tengah ...',
  cat: 'expression',
  connection: 'N + にあって（も）',
  desc: '<b>〜にあって</b> digunakan untuk menyebutkan situasi, era, atau konteks tertentu sebagai latar yang mempengaruhi tindakan atau keadaan yang dijelaskan. Memberikan nuansa bahwa situasi tersebut adalah latar yang khas dan bermakna.',
  nuance: null,
  examples: [
    { jp: '激しい競争<b>にあって</b>も、彼は誠実さを失わなかった。', id: 'Bahkan di tengah persaingan yang sengit sekalipun, dia tidak kehilangan kejujurannya.' },
    { jp: 'グローバル化が進む現代<b>にあって</b>、文化的アイデンティティの保持は重要な課題だ。', id: 'Di tengah era globalisasi yang terus berkembang ini, menjaga identitas budaya merupakan tantangan penting.' },
  ],
  see_also_grammar: ['gn1-00093'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00195', 'gn1-00093', 'gn1-00198'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00095', level: 'n1', pattern: '〜をもって',
  reading: '〜o motte',
  meaning: '(1) dengan ..., menggunakan ... sebagai cara/alat (手段); (2) terhitung sejak ..., pada saat ... (時点・期限)',
  cat: 'expression',
  connection: 'N + をもって',
  desc: '<b>〜をもって</b> memiliki dua makna utama: (1) menyatakan cara atau alat/metode yang digunakan — setara dengan 〜によって dalam konteks formal; (2) menyatakan batas waktu atau titik tertentu ketika sesuatu berakhir atau dimulai secara resmi. Keduanya sangat formal.',
  nuance: null,
  examples: [
    { jp: '誠意<b>をもって</b>対応することが、信頼関係の基本だ。', id: 'Merespons dengan ketulusan adalah dasar dari hubungan kepercayaan.' },
    { jp: '本日<b>をもって</b>、当サービスは終了いたします。', id: 'Terhitung mulai hari ini, layanan kami resmi berakhir.' },
  ],
  see_also_grammar: ['gn1-00098'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00168', 'gn2-00027'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00112', level: 'n1', pattern: '〜べくして',
  reading: '〜beku shite',
  meaning: 'memang seharusnya ..., sudah takdirnya ..., wajar kalau ...',
  cat: 'expression',
  connection: 'V-dictionary + べくして + V (kata kerja yang sama, biasanya bentuk た)',
  desc: '<b>〜べくして</b> menyatakan bahwa sesuatu terjadi sesuai dengan hal yang seharusnya atau sudah ditakdirkan. Biasanya berbentuk 「〜べくしてVた」dan menggambarkan hasil yang sudah selayaknya terjadi berdasarkan keadaan atau logika.',
  nuance: null,
  examples: [
    { jp: 'あの事故は起こる<b>べくして</b>起こった。安全対策が全くなかったのだから。', id: 'Kecelakaan itu memang sudah semestinya terjadi. Karena tidak ada langkah keselamatan sama sekali.' },
    { jp: '彼は勝つ<b>べくして</b>勝った。誰よりも努力してきたのだから。', id: 'Ia menang karena memang sudah sepatutnya menang. Ia telah berusaha lebih keras dari siapa pun.' }
  ],
  see_also_grammar: ['gn1-00111'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00175', 'gn2-00016'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00113', level: 'n1', pattern: '〜にあって',
  reading: '〜ni atte',
  meaning: 'berada dalam situasi ..., dalam kondisi ..., di tengah-tengah ...',
  cat: 'expression',
  connection: 'N + にあって(も)',
  desc: '<b>〜にあって</b> menyatakan bahwa seseorang atau sesuatu berada dalam situasi, kondisi, atau lingkungan tertentu. Biasanya diikuti oleh pernyataan tentang bagaimana seseorang bersikap atau berperilaku dalam situasi tersebut. Bentuk 〜にあっても menambahkan nuansa "meskipun dalam kondisi itu".',
  nuance: null,
  examples: [
    { jp: '非常事態<b>にあって</b>、リーダーは冷静さを保った。', id: 'Di tengah keadaan darurat, sang pemimpin tetap mempertahankan ketenangannya.' },
    { jp: '困難な状況<b>にあっても</b>、彼女は諦めなかった。', id: 'Meskipun berada dalam kondisi yang sulit, ia tidak menyerah.' },
    { jp: '変化の時代<b>にあって</b>、企業は柔軟な対応が求められる。', id: 'Di tengah era perubahan, perusahaan dituntut untuk merespons dengan fleksibel.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00195'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00121', level: 'n1', pattern: '〜ともあろう',
  reading: '〜to mo arou',
  meaning: 'yang seharusnya tahu lebih baik, sekelas ... pun, orang dengan posisi/status seperti ...',
  cat: 'expression',
  connection: 'N + ともあろう + N/人/者 + が',
  desc: '<b>〜ともあろう</b> menyatakan kejutan atau kekecewaan bahwa seseorang yang seharusnya memiliki standar lebih tinggi karena posisi atau statusnya justru melakukan sesuatu yang tidak pantas. Selalu mengandung nuansa penilaian negatif atau kritik tersirat.',
  nuance: null,
  examples: [
    { jp: '大臣<b>ともあろう</b>人が、公の場でそんな発言をするとは信じられない。', id: 'Sungguh tidak dapat dipercaya bahwa seseorang yang statusnya setara menteri pun melontarkan pernyataan seperti itu di depan publik.' },
    { jp: 'ベテラン医師<b>ともあろう</b>者が、こんな初歩的なミスをするとは。', id: 'Mengejutkan sekali bahwa seorang dokter berpengalaman sekaliber itu pun membuat kesalahan dasar seperti ini.' }
  ],
  see_also_grammar: ['gn1-00116'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00116', 'gn1-00052'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00126', level: 'n1', pattern: '〜に足る',
  reading: '〜ni taru',
  meaning: 'layak untuk ..., cukup untuk ..., memenuhi standar untuk ...',
  cat: 'expression',
  connection: 'V-dictionary + に足る (+ N)',
  desc: '<b>〜に足る</b> menyatakan bahwa sesuatu atau seseorang memenuhi standar atau kualifikasi yang diperlukan untuk tujuan tertentu. Sering digunakan untuk menyatakan kelayakan atau keabsahan seseorang/sesuatu dalam konteks formal.',
  nuance: null,
  examples: [
    { jp: '彼の証言は信頼する<b>に足る</b>ものだと判断された。', id: 'Kesaksiannya dinilai sebagai sesuatu yang layak untuk dipercaya.' },
    { jp: 'この研究は発表する<b>に足る</b>成果を上げている。', id: 'Penelitian ini telah menghasilkan capaian yang layak untuk dipresentasikan.' }
  ],
  see_also_grammar: ['gn1-00127', 'gn1-00128'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00128', 'gn1-00058', 'gn1-00063', 'gn1-00129'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00128', level: 'n1', pattern: '〜に値する',
  reading: '〜ni ataisuru',
  meaning: 'bernilai ..., layak mendapatkan ..., sepadan dengan ...',
  cat: 'expression',
  connection: 'V-dictionary / N + に値する',
  desc: '<b>〜に値する</b> menyatakan bahwa seseorang atau sesuatu layak untuk mendapatkan atau diperlakukan dengan cara tertentu karena kualitas atau capaiannya. Menunjukkan pengakuan terhadap nilai atau keunggulan sesuatu.',
  nuance: null,
  examples: [
    { jp: 'この映画は、何度も観る<b>に値する</b>傑作だ。', id: 'Film ini adalah mahakarya yang layak untuk ditonton berkali-kali.' },
    { jp: '彼女の業績は、最高賞<b>に値する</b>と委員会は判断した。', id: 'Komite memutuskan bahwa prestasinya layak mendapatkan penghargaan tertinggi.' },
    { jp: 'その提案は検討<b>に値する</b>内容を含んでいる。', id: 'Proposal itu mengandung isi yang layak untuk dipertimbangkan.' }
  ],
  see_also_grammar: ['gn1-00126', 'gn1-00129'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00126', 'gn2-00069', 'gn1-00061'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00130', level: 'n1', pattern: '〜に堪えない',
  reading: '〜ni taenai',
  meaning: 'tidak tahan terhadap ..., tidak sanggup menanggung ..., sungguh tidak tertahankan (emosi kuat)',
  cat: 'expression',
  connection: 'V-dictionary / N + に堪えない',
  desc: '<b>〜に堪えない</b> adalah bentuk negatif dari 〜に堪える, menyatakan ketidakmampuan untuk menahan atau menanggung sesuatu. Dalam penggunaan emosional, sering muncul dalam frasa tetap seperti 遺憾に堪えない (sangat menyesal), 感謝に堪えない (sangat berterima kasih), dengan makna yang paradoks namun sudah terkonvensionalisasi.',
  nuance: null,
  examples: [
    { jp: 'このような結果になったことは、遺憾<b>に堪えません</b>。', id: 'Kami sangat menyesalkan terjadinya hasil yang seperti ini.' },
    { jp: '皆様のご支援に感謝<b>に堪えません</b>。', id: 'Kami sungguh tidak bisa cukup berterima kasih atas dukungan semua pihak.' },
    { jp: 'その映像は目<b>に堪えない</b>ほど残酷だった。', id: 'Rekaman itu begitu kejam sehingga tidak sanggup untuk ditonton.' }
  ],
  see_also_grammar: ['gn1-00129', 'gn1-00132'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn2-00072'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00135', level: 'n1', pattern: '〜にしてからが',
  reading: '〜ni shite kara ga',
  meaning: 'bahkan ..., yang seharusnya tidak pun ..., sampaipun ...',
  cat: 'expression',
  connection: 'N + にしてからが',
  desc: '<b>〜にしてからが</b> menyatakan bahwa bahkan entitas yang paling tidak terduga atau yang seharusnya memiliki standar lebih tinggi pun mengalami atau melakukan hal yang disebutkan. Menyoroti betapa ekstremnya situasi dengan menggunakan contoh yang paling mengejutkan.',
  nuance: null,
  examples: [
    { jp: '専門家<b>にしてからが</b>、この問題の解決策を見つけられないでいる。', id: 'Bahkan para ahli sekalipun belum bisa menemukan solusi untuk masalah ini.' },
    { jp: '親<b>にしてからが</b>、子どもに嘘をつくことがある。', id: 'Bahkan orang tua pun kadang berbohong kepada anaknya.' }
  ],
  see_also_grammar: ['gn1-00121'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00088'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00138', level: 'n1', pattern: '〜ものとして',
  reading: '〜mono to shite',
  meaning: 'dengan anggapan bahwa ..., berdasarkan asumsi bahwa ..., menganggap bahwa ...',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとして',
  desc: '<b>〜ものとして</b> menyatakan bahwa sesuatu dijadikan sebagai asumsi atau anggapan dasar dalam konteks tertentu. Digunakan ketika seseorang bertindak atau membuat keputusan berdasarkan anggapan tertentu, meskipun kenyataannya belum pasti atau belum dikonfirmasi.',
  nuance: null,
  examples: [
    { jp: '全員が参加する<b>ものとして</b>、会場の手配を進めてください。', id: 'Tolong lanjutkan persiapan venue dengan anggapan bahwa semua orang akan hadir.' },
    { jp: '試験に合格した<b>ものとして</b>、入学後の計画を立てておこう。', id: 'Dengan anggapan sudah lulus ujian, mari buat rencana setelah masuk.' }
  ],
  see_also_grammar: ['gn1-00139', 'gn1-00140'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00139', 'gn1-00140'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00139', level: 'n1', pattern: '〜ものとする',
  reading: '〜mono to suru',
  meaning: 'ditetapkan bahwa ..., berlaku ketentuan bahwa ..., diatur bahwa ...',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとする',
  desc: '<b>〜ものとする</b> digunakan dalam dokumen hukum, peraturan, kontrak, dan regulasi untuk menyatakan bahwa suatu kondisi atau aturan ditetapkan dan berlaku. Menyatakan bahwa sesuatu diperlakukan atau diatur sebagaimana yang disebutkan secara resmi.',
  nuance: null,
  examples: [
    { jp: '本契約は、双方が署名した日から有効になる<b>ものとする</b>。', id: 'Perjanjian ini ditetapkan berlaku sejak tanggal ditandatangani oleh kedua belah pihak.' },
    { jp: '費用は甲が負担する<b>ものとする</b>。', id: 'Ditetapkan bahwa biaya ditanggung oleh Pihak Pertama.' },
    { jp: '違反した場合は、会員資格を失う<b>ものとする</b>。', id: 'Ditetapkan bahwa apabila melanggar, status keanggotaan akan dicabut.' }
  ],
  see_also_grammar: ['gn1-00138', 'gn1-00140'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00138', 'gn1-00140', 'gn2-00203', 'gn1-00146'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00140', level: 'n1', pattern: '〜ものとみなす',
  reading: '〜mono to minasu',
  meaning: 'dianggap sebagai ..., diperlakukan sebagai ... (secara resmi/hukum)',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとみなす',
  desc: '<b>〜ものとみなす</b> menyatakan bahwa sesuatu secara resmi digolongkan, diperlakukan, atau dianggap sebagai hal tertentu — terlepas dari kondisi aktualnya. Digunakan dalam konteks hukum, regulasi, dan dokumen resmi untuk menetapkan suatu fiksi hukum atau standar klasifikasi.',
  nuance: null,
  examples: [
    { jp: '届け出がない場合、同意した<b>ものとみなす</b>。', id: 'Apabila tidak ada pemberitahuan, dianggap telah menyetujui.' },
    { jp: '期日までに返答がない場合、辞退した<b>ものとみなします</b>。', id: 'Apabila tidak ada jawaban hingga batas waktu, akan dianggap mengundurkan diri.' },
    { jp: '本規約に同意した場合、成人と同等の資格を持つ<b>ものとみなす</b>。', id: 'Apabila menyetujui ketentuan ini, akan dianggap memiliki kualifikasi setara orang dewasa.' }
  ],
  see_also_grammar: ['gn1-00138', 'gn1-00139'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00139', 'gn3-00144', 'gn1-00138', 'gn1-00147'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00141',
  level: 'n1',
  pattern: '〜にして',
  reading: '〜ni shite',
  meaning: 'pada saat ..., sekaligus ... (dua kualitas atau titik waktu yang mencolok)',
  cat: 'expression',
  connection: 'N + にして',
  desc: '<b>〜にして</b> memiliki dua fungsi utama. Pertama, menyatakan bahwa seseorang atau sesuatu memiliki dua kualitas sekaligus (sekaligus A sekaligus B). Kedua, menandai titik waktu atau kondisi tertentu yang dianggap luar biasa — terutama usia muda atau posisi tinggi.',
  nuance: null,
  examples: [
    { jp: '彼は天才<b>にして</b>、努力家でもある。', id: 'Dia adalah seorang jenius sekaligus pekerja keras.' },
    { jp: '三歳<b>にして</b>ピアノを弾き始めた。', id: 'Ia mulai memainkan piano pada usia tiga tahun.' },
    { jp: 'この作品は彼の傑作<b>にして</b>最後の遺作となった。', id: 'Karya ini menjadi mahakarya sekaligus warisan terakhirnya.' },
  ],
  see_also_grammar: ['gn1-00142', 'gn1-00143'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00142', 'gn1-00143', 'gn2-00164', 'gn1-00036', 'gn1-00034'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00145',
  level: 'n1',
  pattern: '〜ものとして',
  reading: '〜mono to shite',
  meaning: 'dengan asumsi bahwa ..., dengan menganggap (bahwa) ...',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとして',
  desc: '<b>〜ものとして</b> digunakan untuk menyatakan bahwa suatu tindakan dilakukan berdasarkan asumsi atau anggapan tertentu, meskipun kondisi tersebut belum tentu nyata atau sudah pasti. Sering digunakan dalam simulasi, perencanaan, atau diskusi hipotetis.',
  nuance: null,
  examples: [
    { jp: '合格した<b>ものとして</b>、次のステップを計画しよう。', id: 'Dengan asumsi sudah lulus, mari kita rencanakan langkah berikutnya.' },
    { jp: '彼は欠席する<b>ものとして</b>、会議を進めてください。', id: 'Dengan menganggap dia tidak hadir, silakan lanjutkan rapatnya.' },
    { jp: '予算は十分ある<b>ものとして</b>、プランを立ててみた。', id: 'Dengan berasumsi anggaran cukup, saya mencoba menyusun rencana.' },
  ],
  see_also_grammar: ['gn1-00139', 'gn1-00146'],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00144'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00146',
  level: 'n1',
  pattern: '〜ものとみなす',
  reading: '〜mono to minasu',
  meaning: 'menganggap sebagai ..., memperlakukan seolah-olah ... (dalam konteks umum/resmi)',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとみなす',
  desc: '<b>〜ものとみなす</b> menyatakan bahwa sesuatu diperlakukan atau digolongkan sebagai hal tertentu berdasarkan pertimbangan, standar, atau konvensi yang berlaku. Digunakan baik dalam konteks resmi maupun semi-formal ketika suatu penilaian atau klasifikasi ditetapkan.',
  nuance: null,
  examples: [
    { jp: '無断欠席は辞退した<b>ものとみなす</b>。', id: 'Ketidakhadiran tanpa izin dianggap sebagai pengunduran diri.' },
    { jp: '署名をもって同意した<b>ものとみなします</b>。', id: 'Penandatanganan dianggap sebagai persetujuan.' },
    { jp: '期限を過ぎた申請は無効<b>ものとみなす</b>。', id: 'Pengajuan yang melewati batas waktu dianggap tidak berlaku.' },
  ],
  see_also_grammar: ['gn1-00140', 'gn1-00147', 'gn1-00145'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00147', 'gn1-00139'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00147',
  level: 'n1',
  pattern: '〜とみなす',
  reading: '〜to minasu',
  meaning: 'menganggap sebagai ..., memandang sebagai ...',
  cat: 'expression',
  connection: 'N / V-plain + とみなす',
  desc: '<b>〜とみなす</b> menyatakan bahwa seseorang atau pihak tertentu menganggap, menilai, atau memperlakukan sesuatu/seseorang sebagai hal tertentu. Dapat digunakan dalam berbagai konteks mulai dari penilaian pribadi hingga keputusan resmi.',
  nuance: null,
  examples: [
    { jp: '彼の行為は規則違反<b>とみなされた</b>。', id: 'Tindakannya dianggap sebagai pelanggaran aturan.' },
    { jp: '委員会はその提案を不適切<b>とみなした</b>。', id: 'Komite memandang proposal tersebut sebagai tidak tepat.' },
    { jp: '敵対行為<b>とみなす</b>には十分な証拠が必要だ。', id: 'Diperlukan bukti yang cukup untuk menganggap sesuatu sebagai tindakan permusuhan.' },
  ],
  see_also_grammar: ['gn1-00146', 'gn1-00148', 'gn1-00152'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00140', 'gn1-00148', 'gn1-00146', 'gn1-00152'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00152',
  level: 'n1',
  pattern: '〜とみなされる',
  reading: '〜to minasareru',
  meaning: 'dianggap (oleh orang lain/pihak luar), diperlakukan sebagai ...',
  cat: 'expression',
  connection: 'N / V-plain + とみなされる',
  desc: '<b>〜とみなされる</b> adalah bentuk pasif dari 〜とみなす. Menyatakan bahwa seseorang atau sesuatu diperlakukan atau digolongkan sebagai hal tertentu oleh pihak luar — bukan berdasarkan penilaian sendiri. Fokus pada sudut pandang orang lain atau masyarakat.',
  nuance: null,
  examples: [
    { jp: 'その発言は差別的<b>とみなされる</b>おそれがある。', id: 'Pernyataan tersebut bisa dianggap diskriminatif oleh orang lain.' },
    { jp: '無断転載は著作権侵害<b>とみなされる</b>。', id: 'Reproduksi tanpa izin dianggap sebagai pelanggaran hak cipta.' },
    { jp: '不正行為<b>とみなされれば</b>、資格を失う。', id: 'Jika dianggap sebagai kecurangan, kualifikasi akan dicabut.' },
  ],
  see_also_grammar: ['gn1-00147', 'gn1-00149', 'gn1-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00147', 'gn1-00151', 'gn1-00148', 'gn1-00149'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00153',
  level: 'n1',
  pattern: '〜にほかならない',
  reading: '〜ni hoka naranai',
  meaning: 'tidak lain adalah ..., memang ..., sesungguhnya ...',
  cat: 'expression',
  connection: 'N / V-plain + にほかならない',
  desc: '<b>〜にほかならない</b> digunakan untuk menegaskan dengan kuat bahwa suatu hal tidak lain adalah apa yang disebutkan — tidak ada penjelasan atau interpretasi lain. Menunjukkan keyakinan kuat pembicara bahwa definisi atau penyebab tersebut tepat dan eksklusif.',
  nuance: null,
  examples: [
    { jp: '彼の成功は努力の賜物<b>にほかならない</b>。', id: 'Kesuksesannya tidak lain adalah buah dari kerja keras.' },
    { jp: 'これは差別<b>にほかならない</b>と強く抗議した。', id: 'Ia memprotes keras bahwa ini tidak lain adalah diskriminasi.' },
    { jp: '今回の失敗は準備不足<b>にほかならない</b>。', id: 'Kegagalan kali ini sesungguhnya adalah akibat dari kurangnya persiapan.' },
  ],
  see_also_grammar: ['gn1-00154'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00154', 'gn2-00018', 'gn2-00077', 'gn2-00030', 'gn2-00037', 'gn2-00147'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00160',
  level: 'n1',
  pattern: '〜のもとに',
  reading: '〜no moto ni',
  meaning: 'di bawah ..., berdasarkan ... (formal; kondisi atau otoritas)',
  cat: 'expression',
  connection: 'N + のもとに',
  desc: '<b>〜のもとに</b> menyatakan bahwa suatu tindakan dilakukan di bawah kondisi, otoritas, prinsip, atau nama tertentu. Sering digunakan dalam konteks formal untuk menyatakan landasan atau naungan suatu tindakan.',
  nuance: null,
  examples: [
    { jp: '法律の<b>もとに</b>、すべての人は平等だ。', id: 'Di bawah hukum, semua orang adalah setara.' },
    { jp: '彼の指示の<b>もとに</b>プロジェクトが進められた。', id: 'Proyek dijalankan berdasarkan arahan darinya.' },
    { jp: '友好の名<b>もとに</b>、両国は協力した。', id: 'Atas nama persahabatan, kedua negara bekerja sama.' },
  ],
  see_also_grammar: ['gn1-00161'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00161', 'gn1-00167'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00161',
  level: 'n1',
  pattern: '〜のもとで',
  reading: '〜no moto de',
  meaning: 'di bawah kondisi/kepemimpinan ..., dalam naungan ...',
  cat: 'expression',
  connection: 'N + のもとで',
  desc: '<b>〜のもとで</b> menyatakan bahwa suatu tindakan berlangsung dalam lingkungan, kondisi, atau di bawah kepemimpinan/naungan tertentu. Menekankan konteks atau lingkungan yang melingkupi tindakan tersebut.',
  nuance: null,
  examples: [
    { jp: '厳しい条件の<b>もとで</b>、選手たちは訓練した。', id: 'Para atlet berlatih di bawah kondisi yang keras.' },
    { jp: '新しい体制の<b>もとで</b>、改革が始まった。', id: 'Di bawah rezim baru, reformasi dimulai.' },
    { jp: '彼女の指導の<b>もとで</b>、多くの優秀な学生が育った。', id: 'Di bawah bimbingannya, banyak siswa berprestasi yang berkembang.' },
  ],
  see_also_grammar: ['gn1-00160'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00160', 'gn1-00198'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00162',
  level: 'n1',
  pattern: '〜をもとにして',
  reading: '〜wo moto ni shite',
  meaning: 'berdasarkan ..., bersumber dari ..., dengan mengacu pada ...',
  cat: 'expression',
  connection: 'N + をもとにして',
  desc: '<b>〜をもとにして</b> menyatakan bahwa sesuatu dibuat, dikembangkan, atau dilakukan dengan bahan, data, atau materi tertentu sebagai sumbernya. Menekankan bahwa sesuatu dihasilkan atau terbentuk dari bahan dasar yang disebutkan.',
  nuance: null,
  examples: [
    { jp: 'この映画は実話<b>をもとにして</b>作られた。', id: 'Film ini dibuat berdasarkan kisah nyata.' },
    { jp: 'アンケート結果<b>をもとにして</b>、新サービスを開発した。', id: 'Layanan baru dikembangkan bersumber dari hasil kuesioner.' },
    { jp: '伝統料理<b>をもとにして</b>、新しいレシピが生まれた。', id: 'Resep baru lahir berdasarkan masakan tradisional.' },
  ],
  see_also_grammar: ['gn1-00163', 'gn1-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00167', 'gn1-00038'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00163',
  level: 'n1',
  pattern: '〜を踏まえて',
  reading: '〜wo fumaete',
  meaning: 'mempertimbangkan ..., berdasarkan (fakta/situasi) ..., dengan mengindahkan ...',
  cat: 'expression',
  connection: 'N + を踏まえて',
  desc: '<b>〜を踏まえて</b> menyatakan bahwa suatu tindakan atau keputusan diambil dengan mempertimbangkan atau mengindahkan fakta, situasi, atau informasi tertentu yang disebutkan. Menekankan proses "menginjak" (踏まえる) realita sebagai landasan sebelum bertindak.',
  nuance: null,
  examples: [
    { jp: '前回の失敗<b>を踏まえて</b>、計画を修正した。', id: 'Berdasarkan kegagalan sebelumnya, rencana direvisi.' },
    { jp: '現状<b>を踏まえて</b>、今後の方針を決定する。', id: 'Mempertimbangkan situasi saat ini, kebijakan ke depan akan ditentukan.' },
    { jp: '参加者の意見<b>を踏まえて</b>、プログラムを改善した。', id: 'Program diperbaiki dengan mempertimbangkan pendapat para peserta.' },
  ],
  see_also_grammar: ['gn1-00162', 'gn1-00164', 'gn1-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00098', 'gn1-00164', 'gn1-00167'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00164',
  level: 'n1',
  pattern: '〜に鑑みて',
  reading: '〜ni kangamite',
  meaning: 'mengingat ..., berdasarkan pertimbangan menyeluruh atas ..., dengan memperhatikan ...',
  cat: 'expression',
  connection: 'N + に鑑みて',
  desc: '<b>〜に鑑みて</b> menyatakan bahwa suatu keputusan atau tindakan diambil dengan memperhatikan dan mempertimbangkan secara seksama situasi, preseden, atau fakta yang relevan. 鑑みる berasal dari 鑑 (cermin, contoh), menunjukkan tindakan "menjadikan sesuatu sebagai cermin".',
  nuance: null,
  examples: [
    { jp: '現在の状況<b>に鑑みて</b>、イベントの延期を決定した。', id: 'Mengingat situasi saat ini, diputuskan untuk menunda acara.' },
    { jp: '過去の事例<b>に鑑みて</b>、新しい規制が設けられた。', id: 'Berdasarkan pertimbangan atas kasus-kasus sebelumnya, regulasi baru ditetapkan.' },
    { jp: '社会的影響<b>に鑑みて</b>、慎重な判断が求められる。', id: 'Mengingat dampak sosialnya, diperlukan penilaian yang cermat.' },
  ],
  see_also_grammar: ['gn1-00163', 'gn1-00165', 'gn1-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00038', 'gn1-00165', 'gn1-00163'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00165',
  level: 'n1',
  pattern: '〜に照らして',
  reading: '〜ni terashite',
  meaning: 'sesuai standar ..., bila dicocokkan dengan ..., berdasarkan tolok ukur ...',
  cat: 'expression',
  connection: 'N + に照らして',
  desc: '<b>〜に照らして</b> menyatakan bahwa sesuatu dievaluasi, dinilai, atau diputuskan dengan mencocokkannya dengan standar, norma, peraturan, atau fakta tertentu sebagai tolok ukur. 照らす berarti "menyinari/menerangi", menunjukkan gambaran "menerangi sesuatu dengan standar agar terlihat jelas".',
  nuance: null,
  examples: [
    { jp: '規則<b>に照らして</b>、この行為は違反と判断される。', id: 'Bila dicocokkan dengan aturan, tindakan ini dinilai sebagai pelanggaran.' },
    { jp: '事実<b>に照らして</b>みると、その主張には矛盾がある。', id: 'Bila diterangi dengan fakta, ada kontradiksi dalam klaim tersebut.' },
    { jp: '法律<b>に照らして</b>、適切かどうかを判断してください。', id: 'Nilailah apakah hal ini tepat bila dicocokkan dengan hukum.' },
  ],
  see_also_grammar: ['gn1-00164', 'gn1-00166', 'gn1-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00164', 'gn1-00166', 'gn2-00277'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00166',
  level: 'n1',
  pattern: '〜に即して',
  reading: '〜ni sokushite',
  meaning: 'sesuai persis dengan ..., mengacu langsung pada ..., mengikuti ...',
  cat: 'expression',
  connection: 'N + に即して',
  desc: '<b>〜に即して</b> menyatakan bahwa sesuatu dilakukan secara langsung mengacu pada atau sesuai dengan sesuatu yang konkret — biasanya realita, teks, contoh, atau situasi aktual. 即する berarti "langsung mengikuti/sesuai persis", menunjukkan kecocokan yang erat dengan acuan.',
  nuance: null,
  examples: [
    { jp: '具体例<b>に即して</b>説明してください。', id: 'Tolong jelaskan dengan mengacu langsung pada contoh konkret.' },
    { jp: '現実<b>に即した</b>計画を立てることが大切だ。', id: 'Penting untuk membuat rencana yang sesuai persis dengan kenyataan.' },
    { jp: 'テキスト<b>に即して</b>問題を解いた。', id: 'Soal diselesaikan dengan mengacu langsung pada teks.' },
  ],
  see_also_grammar: ['gn1-00165', 'gn1-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00165', 'gn1-00167', 'gn2-00277', 'gn2-00103', 'gn2-00134', 'gn2-00196', 'gn2-00278', 'gn2-00280'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00167',
  level: 'n1',
  pattern: '〜に基づいて',
  reading: '〜ni motozuite',
  meaning: 'berlandaskan ..., berdasarkan ... (prinsip, bukti, atau aturan)',
  cat: 'expression',
  connection: 'N + に基づいて / に基づく + N',
  desc: '<b>〜に基づいて</b> menyatakan bahwa suatu tindakan, keputusan, atau kesimpulan diambil berlandaskan pada data, aturan, bukti, atau prinsip tertentu sebagai fondasinya. 基づく berarti "berlandaskan pada".',
  nuance: null,
  examples: [
    { jp: 'データ<b>に基づいて</b>、結論を導き出した。', id: 'Kesimpulan ditarik berlandaskan pada data.' },
    { jp: '法律<b>に基づいて</b>、適切な措置を取った。', id: 'Langkah yang tepat diambil berdasarkan hukum.' },
    { jp: '科学的証拠<b>に基づいた</b>判断が求められる。', id: 'Diperlukan penilaian yang berlandaskan bukti ilmiah.' },
  ],
  see_also_grammar: ['gn1-00162', 'gn1-00163', 'gn1-00166'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00098', 'gn1-00166', 'gn2-00277', 'gn2-00102', 'gn2-00104', 'gn2-00139', 'gn2-00135', 'gn2-00027', 'gn2-00101', 'gn2-00134', 'gn2-00137', 'gn2-00268', 'gn2-00280', 'gn1-00035', 'gn1-00038', 'gn1-00160', 'gn1-00162', 'gn1-00163'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00169',
  level: 'n1',
  pattern: '〜をもって',
  reading: '〜wo motte',
  meaning: 'dengan ..., menggunakan ..., pada saat ... (menyatakan cara/batas waktu resmi)',
  cat: 'expression',
  connection: 'N + をもって',
  desc: '<b>〜をもって</b> memiliki dua fungsi utama. Pertama, menyatakan cara atau sarana yang digunakan untuk melakukan sesuatu secara formal ("dengan menggunakan ..."). Kedua, menyatakan titik waktu yang menandai akhir atau dimulainya sesuatu secara resmi ("pada saat ...", "terhitung mulai ...").',
  nuance: null,
  examples: [
    { jp: '本日<b>をもって</b>、退職いたします。', id: 'Terhitung mulai hari ini, saya mengundurkan diri.' },
    { jp: '実力<b>をもって</b>、道を切り開いた。', id: 'Ia membuka jalan dengan kemampuan nyata yang dimilikinya.' },
    { jp: 'これ<b>をもって</b>、本会議を終了します。', id: 'Dengan ini, rapat resmi ditutup.' },
  ],
  see_also_grammar: ['gn1-00168', 'gn1-00170'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00168', 'gn1-00170'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00170',
  level: 'n1',
  pattern: '〜をもってして',
  reading: '〜wo motte shite',
  meaning: 'bahkan dengan ..., sekalipun dengan ..., meski menggunakan ... pun',
  cat: 'expression',
  connection: 'N + をもってしても / をもってしてさえ',
  desc: '<b>〜をもってして</b> menyatakan bahwa bahkan dengan kemampuan, sarana, atau sumber daya tertentu yang dianggap luar biasa atau maksimal sekalipun, hasilnya tidak tercapai atau sulit. Biasanya muncul dalam pola 〜をもってしても + negatif/sulit.',
  nuance: null,
  examples: [
    { jp: '現代医学<b>をもってしても</b>、治せない病気がある。', id: 'Bahkan dengan ilmu kedokteran modern sekalipun, ada penyakit yang tidak bisa disembuhkan.' },
    { jp: '彼の技術<b>をもってしても</b>、この問題は解決できなかった。', id: 'Sekalipun dengan keahliannya, masalah ini tetap tidak bisa diselesaikan.' },
    { jp: 'どんな努力<b>をもってしても</b>、限界はある。', id: 'Bahkan dengan usaha sebesar apapun sekalipun, ada batasnya.' },
  ],
  see_also_grammar: ['gn1-00169'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00003', 'gn1-00012', 'gn1-00169'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00171',
  level: 'n1',
  pattern: '〜ないことには',
  reading: '〜nai koto ni wa',
  meaning: 'kalau tidak ..., tanpa ..., tidak bisa ... (syarat mutlak negatif)',
  cat: 'expression',
  connection: 'V-negative plain + ことには',
  desc: '<b>〜ないことには</b> menyatakan bahwa tanpa memenuhi syarat yang disebutkan, hasil pada klausa berikutnya — biasanya berisi negatif atau ketidakmampuan — tidak bisa terwujud. Menegaskan bahwa kondisi tersebut adalah prasyarat mutlak.',
  nuance: null,
  examples: [
    { jp: '実際にやってみ<b>ないことには</b>、難しさはわからない。', id: 'Tanpa benar-benar mencobanya, tidak bisa tahu betapa sulitnya.' },
    { jp: '本人に聞か<b>ないことには</b>、真相はわからない。', id: 'Tanpa bertanya langsung kepada orangnya, kebenaran tidak akan diketahui.' },
    { jp: '見て<b>ないことには</b>、判断できない。', id: 'Tanpa melihatnya sendiri, tidak bisa memberikan penilaian.' },
  ],
  see_also_grammar: ['gn1-00172'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00172', 'gn1-00080'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00175',
  level: 'n1',
  pattern: '〜なきにしもあらず',
  reading: '〜naki ni shimo arazu',
  meaning: 'tidak bisa dikatakan tidak ada ..., ada juga kemungkinannya (ungkapan sastrawi)',
  cat: 'expression',
  connection: 'N + なきにしもあらず',
  desc: '<b>〜なきにしもあらず</b> adalah ungkapan sastrawi dan sangat formal yang berasal dari bahasa Jepang klasik. Secara harfiah berarti "tidak dapat dikatakan tidak ada" — dengan kata lain, ada kemungkinan atau ada sedikit unsur dari hal yang disebutkan. なき adalah bentuk klasik dari ない dalam bahasa Jepang lama.',
  nuance: null,
  examples: [
    { jp: '不安<b>なきにしもあらず</b>だが、ベストを尽くす。', id: 'Bukan tidak ada rasa khawatir, tapi akan berusaha semaksimal mungkin.' },
    { jp: '懸念<b>なきにしもあらず</b>だが、計画を進めたい。', id: 'Ada juga kekhawatirannya, tapi saya ingin melanjutkan rencana.' },
    { jp: 'リスク<b>なきにしもあらず</b>だが、挑戦する価値はある。', id: 'Bukan tidak ada risiko, tapi ada nilai dalam mencoba.' },
  ],
  see_also_grammar: ['gn1-00173', 'gn1-00174'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00174', 'gn1-00173'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00182',
  level: 'n1',
  pattern: '〜かたがた',
  reading: '〜katagata',
  meaning: 'sambil sekalian ..., dalam rangka sekaligus ... (dua tujuan dalam satu kunjungan)',
  cat: 'expression',
  connection: 'N + かたがた',
  desc: '<b>〜かたがた</b> menyatakan bahwa satu kunjungan atau tindakan dilakukan dengan dua tujuan sekaligus — satu tujuan utama dan satu tujuan yang sekalian dilakukan. Biasanya digunakan dalam konteks formal seperti kunjungan sopan, surat, atau sapaan resmi. Selalu menggunakan nomina.',
  nuance: null,
  examples: [
    { jp: 'ご挨拶<b>かたがた</b>、近況をお知らせしたく参りました。', id: 'Saya datang sambil sekalian menyampaikan salam dan memberikan kabar terbaru.' },
    { jp: 'お礼<b>かたがた</b>、ご報告に伺いました。', id: 'Saya datang untuk menyampaikan terima kasih sekaligus laporan.' },
    { jp: '散歩<b>かたがた</b>、用事を済ませてきた。', id: 'Sambil sekalian jalan-jalan, saya menyelesaikan keperluan.' },
  ],
  see_also_grammar: ['gn1-00183', 'gn1-00184'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00043', 'gn1-00044', 'gn3-00016'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00183',
  level: 'n1',
  pattern: '〜かたわら',
  reading: '〜katawara',
  meaning: 'di sela-sela ..., sambil juga ... (dua kegiatan yang berjalan paralel dalam jangka panjang)',
  cat: 'expression',
  connection: 'N-の / V-plain dict + かたわら',
  desc: '<b>〜かたわら</b> menyatakan bahwa seseorang melakukan dua kegiatan secara paralel dalam kehidupan atau rutinitas — biasanya satu kegiatan utama dan satu kegiatan sampingan yang juga dijalani secara konsisten. Berbeda dari 〜かたがた, 〜かたわら berfokus pada kegiatan berulang atau gaya hidup.',
  nuance: null,
  examples: [
    { jp: '会社員の<b>かたわら</b>、ボランティア活動もしている。', id: 'Di sela-sela menjadi karyawan, ia juga aktif dalam kegiatan sukarela.' },
    { jp: '育児の<b>かたわら</b>、在宅ワークを続けている。', id: 'Di sela-sela mengasuh anak, ia terus bekerja dari rumah.' },
    { jp: '研究の<b>かたわら</b>、学生の指導も行っている。', id: 'Di sela-sela penelitian, ia juga membimbing mahasiswa.' },
  ],
  see_also_grammar: ['gn1-00182', 'gn1-00184', 'gn1-00185'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00042', 'gn1-00184', 'gn2-00051'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00197',
  level: 'n1',
  pattern: '〜にあって',
  reading: '〜ni atte',
  meaning: 'dalam situasi/kondisi ..., berada di dalam keadaan ... (menekankan konteks yang ekstrem)',
  cat: 'expression',
  connection: 'N + にあって',
  desc: '<b>〜にあって</b> menyatakan bahwa seseorang atau sesuatu berada dalam situasi atau kondisi tertentu yang disebutkan — biasanya kondisi yang luar biasa, penuh tantangan, atau khusus. Menekankan bahwa tindakan atau kondisi dalam kalimat berlangsung di tengah keadaan tersebut.',
  nuance: null,
  examples: [
    { jp: '戦時下<b>にあって</b>、人々は互いに助け合った。', id: 'Dalam situasi perang, orang-orang saling membantu.' },
    { jp: '困難な状況<b>にあって</b>、彼は冷静さを保った。', id: 'Dalam kondisi yang sulit, dia tetap menjaga ketenangan.' },
    { jp: '激しい競争<b>にあって</b>、彼女は着実に成長している。', id: 'Di tengah persaingan yang sengit, dia terus berkembang dengan mantap.' },
  ],
  see_also_grammar: ['gn1-00195', 'gn1-00198'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00198', 'gn1-00195'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00198',
  level: 'n1',
  pattern: '〜にあっては',
  reading: '〜ni atte wa',
  meaning: 'mengingat situasi ..., dalam keadaan seperti ini ..., karena berada dalam ...',
  cat: 'expression',
  connection: 'N + にあっては',
  desc: '<b>〜にあっては</b> menyatakan bahwa dalam situasi atau kondisi tertentu yang disebutkan, suatu hal berlaku atau diperlukan secara khusus. Partikel は menambahkan nuansa penekanan atau kontras — "justru dalam kondisi seperti inilah, ...".',
  nuance: null,
  examples: [
    { jp: 'このような危機<b>にあっては</b>、全員の協力が不可欠だ。', id: 'Mengingat krisis seperti ini, kerja sama semua pihak adalah mutlak.' },
    { jp: '現代社会<b>にあっては</b>、変化への対応力が問われる。', id: 'Dalam masyarakat modern, kemampuan beradaptasi terhadap perubahan menjadi ujian.' },
    { jp: '非常事態<b>にあっては</b>、通常のルールは適用されない。', id: 'Dalam keadaan darurat, aturan biasa tidak berlaku.' },
  ],
  see_also_grammar: ['gn1-00197', 'gn1-00195'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00092', 'gn1-00195', 'gn1-00161', 'gn1-00197'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00199',
  level: 'n1',
  pattern: '〜にあたる',
  reading: '〜ni ataru',
  meaning: 'setara dengan ..., sesuai dengan ..., termasuk dalam kategori ...',
  cat: 'expression',
  connection: 'N + にあたる / V-plain + にあたる',
  desc: '<b>〜にあたる</b> menyatakan bahwa sesuatu setara dengan, sesuai dengan, atau masuk dalam kategori yang disebutkan. Digunakan untuk menunjukkan kesamaan, padanan, atau kesesuaian antara dua hal — misalnya tanggal yang bertepatan dengan hari tertentu, atau tindakan yang termasuk kategori hukum tertentu.',
  nuance: null,
  examples: [
    { jp: 'この行為は詐欺<b>にあたる</b>。', id: 'Tindakan ini termasuk/setara dengan penipuan.' },
    { jp: '本日は彼の一周忌<b>にあたる</b>。', id: 'Hari ini bertepatan dengan setahun kepergiannya.' },
    { jp: '彼は私の恩師<b>にあたる</b>人物だ。', id: 'Dia adalah orang yang setara dengan guru budi bagi saya.' },
  ],
  see_also_grammar: ['gn1-00200'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00004', 'gn1-00200'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00200',
  level: 'n1',
  pattern: '〜にあたらない',
  reading: '〜ni ataranai',
  meaning: 'tidak perlu ..., tidak sepantasnya ..., tidak layak untuk ...',
  cat: 'expression',
  connection: 'V-plain dict / N + にあたらない',
  desc: '<b>〜にあたらない</b> adalah bentuk negatif dari 〜にあたる, namun memiliki penggunaan khas: menyatakan bahwa suatu reaksi, tindakan, atau penilaian tidak diperlukan atau tidak pantas dalam situasi yang disebutkan. Biasanya digunakan untuk meremehkan atau menilai bahwa sesuatu tidak sebesar yang dibayangkan.',
  nuance: null,
  examples: [
    { jp: 'そんなに驚く<b>にあたらない</b>。よくあることだ。', id: 'Tidak perlu terkejut sampai seperti itu. Ini hal yang biasa.' },
    { jp: '謝る<b>にあたらない</b>。君は何も悪くない。', id: 'Tidak perlu minta maaf. Kamu tidak melakukan kesalahan apa pun.' },
    { jp: '称賛する<b>にあたらない</b>行為だと批評家は言った。', id: 'Kritikus mengatakan itu adalah tindakan yang tidak layak untuk dipuji.' },
  ],
  see_also_grammar: ['gn1-00199'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00199'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
