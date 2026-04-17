// grammar-n1.js — Grammar JLPT N1 Global (Tier 1)
// window.grammarN1
// Dibuat oleh: Agent 4 — Batter 🌾
// Task: RESTRUKTURISASI-B-BATTER-N3 (Plan B)
// Status: PLACEHOLDER — akan diisi setelah data tersedia
// Versi schema: Arsitektur Dua Tier (Plan A, v14.8.1)

window.grammarN1 = [

{
  id: 'gn1-00001', level: 'n1', pattern: '〜いかんによって／〜いかんで', reading: '〜ikan ni yotte / ikan de',
  meaning: 'tergantung pada ... (sangat formal)',
  cat: 'conditional-nara',
  connection: 'N + いかんによって / N + いかんで',
  desc: '<b>〜いかんによって</b> (atau <b>〜いかんで</b>) menyatakan bahwa hasil sepenuhnya bergantung pada isi atau keadaan sesuatu. Sering digunakan dalam pengumuman, surat resmi, dan regulasi.',
  nuance: 'Jauh lebih formal dari 〜によって biasa. Tidak dipakai dalam percakapan sehari-hari. Versi pendek いかんで sama artinya namun sedikit lebih sering digunakan secara lisan dalam konteks formal.',
  examples: [
    { jp: '試験の結果<b>いかんによって</b>、採用が決まる。', id: 'Keputusan penerimaan ditentukan tergantung pada hasil ujian.' },
    { jp: '今後の対応<b>いかんで</b>、契約を更新するかどうか判断します。', id: 'Keputusan perpanjangan kontrak akan ditentukan tergantung pada tindakan selanjutnya.' },
    { jp: '天候<b>いかんによって</b>、イベントは中止になることもある。', id: 'Bergantung pada cuaca, acara bisa saja dibatalkan.' }
  ],
  see_also_grammar: ['gn1-00002'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00002'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00002', level: 'n1', pattern: '〜いかんにかかわらず', reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari ... / tidak peduli bagaimanapun kondisinya',
  cat: 'contrast-concession',
  connection: 'N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa sesuatu tetap berlaku tanpa memperhatikan kondisi apa pun yang disebutkan. Sering ditemukan dalam dokumen hukum, peraturan, dan surat resmi.',
  nuance: 'Lebih kuat dari 〜にかかわらず biasa. Bila 〜いかんによって berarti "bergantung pada", maka 〜いかんにかかわらず adalah kebalikannya: "tidak bergantung pada apa pun". Keduanya sering tertukar.',
  examples: [
    { jp: '理由の<b>いかんにかかわらず</b>、遅刻は認められません。', id: 'Terlepas dari alasan apa pun, keterlambatan tidak diizinkan.' },
    { jp: '成績の<b>いかんにかかわらず</b>、全員参加できます。', id: 'Terlepas dari nilai, semua orang dapat ikut serta.' },
    { jp: '立場の<b>いかんにかかわらず</b>、規則は平等に適用される。', id: 'Terlepas dari jabatan, peraturan berlaku secara adil untuk semua.' }
  ],
  see_also_grammar: ['gn1-00001'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00001'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00003', level: 'n1', pattern: '〜をもって', reading: '〜wo motte',
  meaning: 'dengan ... / menggunakan ... / terhitung sejak ...',
  cat: 'reason-cause',
  connection: 'N + をもって',
  desc: '<b>〜をもって</b> memiliki dua makna utama: (1) menyatakan sarana atau cara ("dengan ..."), dan (2) menyatakan batas waktu formal ("terhitung sejak ..."). Keduanya digunakan dalam konteks sangat formal dan seremonial.',
  nuance: 'Lebih formal dari 〜で biasa. Dalam arti waktu (今月末をもって閉店します), menandai titik akhir yang resmi. Sering muncul dalam pengumuman perusahaan, pidato, dan surat resmi.',
  examples: [
    { jp: '誠意<b>をもって</b>対応いたします。', id: 'Kami akan menangani hal ini dengan penuh kesungguhan.' },
    { jp: '今月末<b>をもって</b>、この店舗は閉店いたします。', id: 'Terhitung akhir bulan ini, toko ini akan ditutup.' },
    { jp: 'これ<b>をもって</b>、式典を終了いたします。', id: 'Dengan ini, kami akhiri upacara.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00004', level: 'n1', pattern: '〜にして', reading: '〜ni shite',
  meaning: 'sekaligus ... / baru pada tahap ... (klasik/keigo)',
  cat: 'extent-degree',
  connection: 'N + にして',
  desc: '<b>〜にして</b> dalam konteks N1 menyatakan dua hal: (1) "sekaligus" — seseorang yang memiliki dua sifat/peran sekaligus (詩人にして哲学者 = penyair sekaligus filsuf); atau (2) "baru pada kondisi itu baru bisa terjadi" — menekankan betapa tingginya syarat yang dibutuhkan.',
  nuance: 'Bernuansa klasik dan agung. Pola (2) sering digunakan bersama 〜初めて → 〜にして初めて. Tidak lazim dalam percakapan modern. Berbeda dari 〜でも yang netral, 〜にして terasa lebih formal dan kagum.',
  examples: [
    { jp: '彼は作家<b>にして</b>外交官でもあった。', id: 'Dia adalah seorang penulis sekaligus diplomat.' },
    { jp: '80歳<b>にして</b>、まだ現役で働いている。', id: 'Di usia 80 tahun pun, dia masih aktif bekerja.' },
    { jp: 'この境地は長年の修行<b>にして</b>初めて達せるものだ。', id: 'Tataran ini baru bisa dicapai setelah bertahun-tahun berlatih.' }
  ],
  see_also_grammar: ['gn1-00005', 'gn1-00018'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00005', 'gn1-00018'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00005', level: 'n1', pattern: '〜にしては', reading: '〜ni shite wa',
  meaning: 'mengingat ... / untuk seseorang/sesuatu yang ...',
  cat: 'contrast-concession',
  connection: 'N / V-plain + にしては',
  desc: '<b>〜にしては</b> menyatakan kontras antara latar belakang atau kondisi dengan kenyataan yang ada. Artinya: "mengingat kondisinya X, hasilnya Y (di luar dugaan — bisa lebih baik atau lebih buruk dari yang diharapkan)".',
  nuance: 'Tidak selalu negatif — bisa berarti lebih baik dari harapan. Berbeda dari 〜にしても yang menerima fakta tanpa kontras, 〜にしては selalu mengandung unsur "di luar ekspektasi berdasarkan standar X".',
  examples: [
    { jp: '初めて作った<b>にしては</b>、よくできている。', id: 'Mengingat ini buatan pertama, hasilnya cukup bagus.' },
    { jp: '日本に10年いる<b>にしては</b>、日本語が上手じゃない。', id: 'Mengingat sudah 10 tahun di Jepang, bahasa Jepangnya kurang bagus.' },
    { jp: '専門家<b>にしては</b>、説明がわかりにくい。', id: 'Untuk seorang ahli, penjelasannya susah dipahami.' }
  ],
  see_also_grammar: ['gn1-00004', 'gn1-00006'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00004'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00006', level: 'n1', pattern: '〜にしても〜にしても', reading: '〜ni shite mo 〜ni shite mo',
  meaning: 'baik ... maupun ... (dalam kedua kasus, kesimpulan sama)',
  cat: 'listing-addition',
  connection: 'V-plain / N + にしても + V-plain / N + にしても',
  desc: '<b>〜にしても〜にしても</b> menyatakan bahwa apapun pilihannya atau kondisinya, kesimpulan atau penilaian yang sama tetap berlaku. Kedua kemungkinan disebutkan secara eksplisit.',
  nuance: 'Mirip dengan 〜にせよ〜にせよ dan 〜としても. Tidak bergantung pada apakah salah satu pilihan lebih disukai — keduanya diperlakukan setara. Lebih formal dari 〜でも〜でも.',
  examples: [
    { jp: '行く<b>にしても</b>行かない<b>にしても</b>、早めに決めてください。', id: 'Baik pergi maupun tidak, tolong putuskan lebih awal.' },
    { jp: '賛成する<b>にしても</b>反対する<b>にしても</b>、理由を述べてください。', id: 'Baik setuju maupun tidak setuju, nyatakan alasannya.' },
    { jp: '成功する<b>にしても</b>失敗する<b>にしても</b>、挑戦する価値はある。', id: 'Baik berhasil maupun gagal, ada nilai dalam mencoba.' }
  ],
  see_also_grammar: ['gn1-00005', 'gn1-00007'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00007', level: 'n1', pattern: '〜としても', reading: '〜to shite mo',
  meaning: 'meskipun dianggap sebagai ... / bahkan jika seandainya ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + としても',
  desc: '<b>〜としても</b> menyatakan kondisi hipotesis yang dikonsesikan: "meskipun kita anggap X benar, tetap saja Y". Menegaskan bahwa kesimpulan tidak berubah meskipun kondisi yang diberikan diterima.',
  nuance: 'Berbeda dari 〜ても yang mengacu pada fakta nyata, 〜としても mengacu pada asumsi atau hipotesis. Lebih analitis dan formal. Sering dipakai dalam argumen logis dan tulisan akademik.',
  examples: [
    { jp: 'それが事実だ<b>としても</b>、今すぐ対処するのは難しい。', id: 'Meskipun itu benar adanya, sulit untuk menanganinya sekarang.' },
    { jp: '急いで行った<b>としても</b>、間に合わなかっただろう。', id: 'Meskipun seandainya pergi terburu-buru, kemungkinan tetap tidak akan tepat waktu.' },
    { jp: '彼が天才だ<b>としても</b>、努力なしでは成功できない。', id: 'Meskipun dia jenius, tanpa usaha dia tidak bisa sukses.' }
  ],
  see_also_grammar: ['gn1-00008'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00008'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00008', level: 'n1', pattern: '〜とはいえ', reading: '〜to wa ie',
  meaning: 'meskipun dikatakan demikian ... / walaupun begitu ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + とはいえ',
  desc: '<b>〜とはいえ</b> mengakui kebenaran bagian pertama, lalu menyatakan kontras atau batasan di bagian kedua. Artinya: "memang benar X, namun Y". Formal dan sering dipakai dalam esai.',
  nuance: 'Lebih formal dari でも atau けど. Menerima fakta pertama sepenuhnya, lalu memberikan sanggahan atau nuansa pembatas. Berbeda dari 〜としても yang hipotesis, 〜とはいえ mengacu pada fakta yang sudah diakui.',
  examples: [
    { jp: '春<b>とはいえ</b>、まだ寒い日が続く。', id: 'Meskipun sudah musim semi, hari-hari yang dingin masih berlanjut.' },
    { jp: '慣れた<b>とはいえ</b>、この仕事はやはり大変だ。', id: 'Meskipun sudah terbiasa, pekerjaan ini tetap saja berat.' },
    { jp: '彼は優秀だ<b>とはいえ</b>、経験はまだ浅い。', id: 'Meskipun dia berbakat, pengalamannya masih minim.' }
  ],
  see_also_grammar: ['gn1-00007', 'gn1-00009'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00007', 'gn1-00009'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00009', level: 'n1', pattern: '〜といえども', reading: '〜to ie domo',
  meaning: 'meskipun ... bahkan (konsesi formal/sastra)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + といえども',
  desc: '<b>〜といえども</b> adalah ekspresi sastra/klasik untuk konsesi. Artinya "bahkan jika/meskipun", sering digunakan untuk menekankan bahwa tidak ada pengecualian — termasuk kondisi yang paling ekstrem sekalipun.',
  nuance: 'Jauh lebih formal dan bernuansa klasik dibanding 〜とはいえ. Sering muncul dalam peribahasa, regulasi, dan teks resmi. Hampir tidak pernah dipakai dalam percakapan sehari-hari.',
  examples: [
    { jp: 'いかなる理由<b>といえども</b>、暴力は許されない。', id: 'Meskipun dengan alasan apa pun, kekerasan tidak bisa dibenarkan.' },
    { jp: '専門家<b>といえども</b>、すべてを知っているわけではない。', id: 'Meskipun seorang ahli, tidak berarti tahu segalanya.' },
    { jp: '大統領<b>といえども</b>、法を超えることはできない。', id: 'Meskipun presiden, tidak bisa melampaui hukum.' }
  ],
  see_also_grammar: ['gn1-00008'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00008'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00010', level: 'n1', pattern: '〜ながらも', reading: '〜nagara mo',
  meaning: 'meskipun ... (tapi tetap ...) — kontras bernuansa sastra',
  cat: 'contrast-concession',
  connection: 'V-stem / Adj-i-stem / Adj-na / N + ながらも',
  desc: '<b>〜ながらも</b> menyatakan kontras bernuansa sastra: kondisi A ada atau sedang terjadi, namun tetap saja B juga ada/terjadi. Menekankan bahwa dua hal yang bertentangan berlangsung secara bersamaan.',
  nuance: 'Lebih puitis dan formal dibanding 〜けれど atau 〜のに. Sering muncul dalam novel, esai, dan lirik. Sering menghasilkan nuansa dramatis. Jangan samakan dengan 〜ながらに yang tidak menyatakan kontras.',
  examples: [
    { jp: '貧しい<b>ながらも</b>、幸せに暮らしていた。', id: 'Meskipun miskin, mereka hidup bahagia.' },
    { jp: '不安を感じ<b>ながらも</b>、彼女は前に進んだ。', id: 'Meskipun merasakan ketakutan, dia tetap melangkah maju.' },
    { jp: '短い時間<b>ながらも</b>、多くのことを学んだ。', id: 'Meskipun waktunya singkat, banyak hal yang dipelajari.' }
  ],
  see_also_grammar: ['gn1-00011'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00011'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00011', level: 'n1', pattern: '〜ながらに', reading: '〜nagara ni',
  meaning: 'dengan tetap dalam kondisi ... / sejak ... hingga sekarang',
  cat: 'extent-degree',
  connection: 'N / V-stem + ながらに（して）',
  desc: '<b>〜ながらに</b> menyatakan bahwa sesuatu terjadi atau ada dalam keadaan yang tetap/tidak berubah. Bisa berarti "sejak lahir" (生まれながらに) atau "dalam kondisi itu" (涙ながらに = sembari berurai air mata).',
  nuance: 'Berbeda dari 〜ながらも yang menyatakan kontras, 〜ながらに menyatakan kondisi yang menyertai tanpa kontras. Sering membentuk ekspresi tetap: 生まれながらに (sejak lahir), 涙ながらに (sembari menangis).',
  examples: [
    { jp: '彼女は生まれ<b>ながらに</b>才能を持っていた。', id: 'Dia memiliki bakat sejak lahir.' },
    { jp: '涙<b>ながらに</b>、別れを告げた。', id: 'Dia mengucapkan selamat tinggal sembari berurai air mata.' },
    { jp: 'い<b>ながらにして</b>、世界中の情報にアクセスできる。', id: 'Tanpa beranjak ke mana-mana, kita bisa mengakses informasi dari seluruh dunia.' }
  ],
  see_also_grammar: ['gn1-00010'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00010'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00012', level: 'n1', pattern: '〜てでも', reading: '〜te demo',
  meaning: 'bahkan dengan cara ... / tidak peduli bagaimana caranya',
  cat: 'purpose',
  connection: 'V-te form + でも',
  desc: '<b>〜てでも</b> menyatakan tekad yang kuat: pembicara rela melakukan sesuatu yang ekstrem atau tidak lazim demi mencapai tujuan tertentu. Menekankan kesungguhan niat.',
  nuance: 'Sering menyiratkan cara yang mungkin tidak ideal atau berlebihan, namun diterima karena tujuannya sangat penting. Berbeda dari 〜ても yang hanya menyatakan kondisi, 〜てでも mengandung niat aktif dan tekad.',
  examples: [
    { jp: '借金をし<b>てでも</b>、夢を叶えたい。', id: 'Meskipun harus berhutang, aku ingin mewujudkan impian.' },
    { jp: '徹夜し<b>てでも</b>、この仕事を終わらせる。', id: 'Bahkan dengan begadang sekalipun, aku akan menyelesaikan pekerjaan ini.' },
    { jp: '膝をつい<b>てでも</b>、謝るべきだ。', id: 'Bahkan dengan berlutut sekalipun, dia harus meminta maaf.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00013', level: 'n1', pattern: '〜ばかりに', reading: '〜bakari ni',
  meaning: 'justru karena ... / hanya karena ... (mengakibatkan hal negatif)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain + ばかりに',
  desc: '<b>〜ばかりに</b> menyatakan bahwa satu alasan tunggal menjadi penyebab suatu hasil negatif yang tidak diinginkan. Pembicara menyesalkan bahwa justru karena X, hal buruk Y terjadi.',
  nuance: 'Selalu diikuti hasil negatif. Mengandung nuansa penyesalan atau ironi nasib. Berbeda dari 〜から atau 〜ので yang netral, 〜ばかりに menekankan ironi bahwa satu hal itulah yang menjadi biang keladinya.',
  examples: [
    { jp: '正直に言った<b>ばかりに</b>、嫌われてしまった。', id: 'Justru karena berbicara jujur, malah dibenci.' },
    { jp: '欲張った<b>ばかりに</b>、全部失った。', id: 'Hanya karena terlalu serakah, semuanya hilang.' },
    { jp: '道を間違えた<b>ばかりに</b>、試験に遅刻した。', id: 'Justru karena salah jalan, terlambat ujian.' }
  ],
  see_also_grammar: ['gn1-00024'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00024'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00014', level: 'n1', pattern: '〜が最後', reading: '〜ga saigo',
  meaning: 'sekali ... maka tidak bisa kembali / begitu ... sudah selesai',
  cat: 'completion-regret',
  connection: 'V-ta + が最後',
  desc: '<b>〜が最後</b> menyatakan bahwa setelah suatu tindakan dilakukan, akibat negatif yang tidak bisa dihindari pasti akan menyusul. "Begitu X dilakukan, sudah selesai — tidak bisa kembali."',
  nuance: 'Selalu diikuti konsekuensi negatif atau yang tidak dapat diubah. Berbeda dari 〜たら yang netral, 〜が最後 mengandung nuansa peringatan keras atau kepastian yang tidak menyenangkan. Formal dan sering dalam narasi.',
  examples: [
    { jp: 'あの人に捕まった<b>が最後</b>、何時間も話を聞かされる。', id: 'Sekali ketahuan orang itu, kamu akan dipaksa mendengar ceritanya berjam-jam.' },
    { jp: '彼に秘密を話した<b>が最後</b>、すぐ全員に広まってしまう。', id: 'Begitu memberi tahu rahasia padanya, langsung menyebar ke semua orang.' },
    { jp: 'あのゲームを始めた<b>が最後</b>、やめられなくなる。', id: 'Sekali mulai game itu, tidak bisa berhenti lagi.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00015', level: 'n1', pattern: '〜に至っては', reading: '〜ni itte wa',
  meaning: 'bahkan dalam hal ... / lebih parah lagi ...',
  cat: 'extent-degree',
  connection: 'N + に至っては',
  desc: '<b>〜に至っては</b> digunakan untuk memperkenalkan kasus yang paling ekstrem dalam suatu rangkaian, biasanya untuk memperkuat argumen atau menunjukkan betapa parahnya situasi. "Bahkan X pun ..."',
  nuance: 'Mengindikasikan bahwa kasus yang disebutkan adalah yang paling buruk atau paling mengejutkan dari semuanya. Berbeda dari 〜に至るまで yang mencakup rentang, 〜に至っては memfokuskan pada satu titik ekstrem saja.',
  examples: [
    { jp: '他の部員はまだいいが、彼女<b>に至っては</b>一度も練習に来ない。', id: 'Anggota lain masih bisa dimaklumi, tapi bahkan dia tidak pernah datang latihan sekali pun.' },
    { jp: '子供はもちろん、大人<b>に至っては</b>もっとひどい行動をしていた。', id: 'Anak-anak sudah tentu, bahkan orang dewasa pun bertindak lebih parah.' },
    { jp: '部長も問題があるが、社長<b>に至っては</b>完全に無責任だ。', id: 'Manajer pun ada masalah, tapi bahkan direkturnya benar-benar tidak bertanggung jawab.' }
  ],
  see_also_grammar: ['gn1-00016', 'gn1-00017'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00016', 'gn1-00017'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00016', level: 'n1', pattern: '〜に至るまで', reading: '〜ni itaru made',
  meaning: 'sampai kepada ... / bahkan hingga ...',
  cat: 'extent-degree',
  connection: 'N + に至るまで',
  desc: '<b>〜に至るまで</b> menyatakan jangkauan yang sangat luas, hingga menyentuh hal-hal yang paling detail atau tidak terduga sekalipun. Sering digunakan bersama 〜から untuk membentuk "dari ... hingga ...".',
  nuance: 'Menekankan bahwa suatu hal mencakup semua elemen, termasuk yang paling kecil sekalipun. Berbeda dari 〜まで biasa, 〜に至るまで terasa lebih formal dan lebih menekankan kelengkapan atau kedalaman cakupan.',
  examples: [
    { jp: '日常の食事から服装<b>に至るまで</b>、彼女に管理されている。', id: 'Dari makan sehari-hari hingga pakaian, semuanya dikontrol olehnya.' },
    { jp: '会社の経営方針から細かいルール<b>に至るまで</b>、彼が決めている。', id: 'Dari kebijakan manajemen hingga aturan kecil, semuanya dia yang memutuskan.' },
    { jp: '歴史的な出来事から個人の生活<b>に至るまで</b>、詳しく書かれている。', id: 'Ditulis secara rinci dari peristiwa bersejarah hingga kehidupan pribadi.' }
  ],
  see_also_grammar: ['gn1-00015', 'gn1-00017'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00015', 'gn1-00017'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00017', level: 'n1', pattern: '〜に至って', reading: '〜ni itte',
  meaning: 'baru setelah sampai pada titik ... barulah sadar / akhirnya ...',
  cat: 'sequential-temporal',
  connection: 'V-dict / N + に至って',
  desc: '<b>〜に至って</b> menyatakan bahwa seseorang baru menyadari atau baru bertindak setelah situasi mencapai suatu titik kritis. Sering mengandung nuansa "sudah terlambat baru sadar".',
  nuance: 'Berbeda dari 〜になって, 〜に至って menekankan bahwa titik yang dicapai adalah ekstrem atau kritis, dan biasanya ada penyesalan atau urgensi yang menyertai. Formal dan sering dipakai dalam tulisan.',
  examples: [
    { jp: 'この段階<b>に至って</b>、今さら後悔しても遅い。', id: 'Sudah sampai tahap ini, menyesal sekarang pun sudah terlambat.' },
    { jp: '倒産寸前<b>に至って</b>、ようやく改革を始めた。', id: 'Baru setelah hampir bangkrut, akhirnya mulai melakukan reformasi.' },
    { jp: '病気が悪化する<b>に至って</b>、初めて医者に行った。', id: 'Baru setelah penyakitnya memburuk, dia akhirnya pergi ke dokter.' }
  ],
  see_also_grammar: ['gn1-00015', 'gn1-00016'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00015', 'gn1-00016'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00018', level: 'n1', pattern: '〜にして初めて', reading: '〜ni shite hajimete',
  meaning: 'hanya dengan ... barulah bisa ... / baru setelah menjadi ... barulah ...',
  cat: 'inception-continuation',
  connection: 'N + にして初めて',
  desc: '<b>〜にして初めて</b> menyatakan bahwa kondisi atau posisi tertentu adalah satu-satunya syarat agar sesuatu bisa terwujud. "Hanya dengan menjadi/berada dalam kondisi X, barulah Y bisa terjadi."',
  nuance: 'Menekankan bahwa X adalah syarat mutlak yang tidak tergantikan — tanpa X, Y tidak mungkin terjadi. Berbeda dari 〜てから yang hanya menunjukkan urutan waktu, 〜にして初めて menekankan eksklusivitas kondisi tersebut.',
  examples: [
    { jp: '親の立場<b>にして初めて</b>、子育ての大変さが実感できる。', id: 'Hanya setelah berada di posisi orang tua, barulah bisa merasakan beratnya membesarkan anak.' },
    { jp: 'この経験<b>にして初めて</b>、本当の苦労の意味が分かった。', id: 'Hanya melalui pengalaman ini, aku baru memahami makna perjuangan yang sesungguhnya.' },
    { jp: '現地<b>にして初めて</b>、問題の深刻さが理解できる。', id: 'Baru setelah langsung berada di lokasi, seseorang bisa memahami betapa seriusnya masalah itu.' }
  ],
  see_also_grammar: ['gn1-00004'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00004'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00019', level: 'n1', pattern: '〜をものともせず', reading: '〜wo mono to mo sezu',
  meaning: 'tanpa mempedulikan ... / mengabaikan ... (dengan gagah berani)',
  cat: 'contrast-concession',
  connection: 'N + をものともせず',
  desc: '<b>〜をものともせず</b> menyatakan bahwa seseorang menghadapi atau melakukan sesuatu tanpa gentar atau terhenti oleh rintangan, bahaya, atau kesulitan yang besar. Mengandung nuansa kekaguman terhadap keberanian.',
  nuance: 'Berbeda dari 〜にかかわらず yang netral, 〜をものともせず mengandung konotasi positif — kagum terhadap keberanian atau ketabahan subjek. Biasanya subjeknya manusia, tim, atau individu yang bersikap heroik.',
  examples: [
    { jp: '激しい雨<b>をものともせず</b>、彼らは試合を続けた。', id: 'Tanpa mempedulikan hujan deras, mereka melanjutkan pertandingan.' },
    { jp: '批判<b>をものともせず</b>、彼女は改革を推し進めた。', id: 'Mengabaikan kritik, dia terus mendorong reformasi.' },
    { jp: '危険<b>をものともせず</b>、救助隊は現場に向かった。', id: 'Tanpa mempedulikan bahaya, tim penyelamat menuju lokasi.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00020', level: 'n1', pattern: '〜もさることながら', reading: '〜mo saru koto nagara',
  meaning: 'sudah tentu ... tapi lebih dari itu ... / bukan hanya ...',
  cat: 'listing-addition',
  connection: 'N + もさることながら',
  desc: '<b>〜もさることながら</b> mengakui bahwa X sudah tentu menonjol atau penting, namun menekankan bahwa Y (yang disebutkan setelahnya) bahkan lebih menonjol atau lebih penting. Bentuk eskalasi penilaian.',
  nuance: 'Menyatakan urutan kepentingan: "X sudah tentu luar biasa, tapi Y lebih dari itu." Berbeda dari 〜だけでなく yang netral, 〜もさることながら mengandung eskalasi nilai. Formal dan sering muncul dalam sambutan atau esai.',
  examples: [
    { jp: '味<b>もさることながら</b>、この店の雰囲気も素晴らしい。', id: 'Sudah tentu rasanya lezat, tapi suasana restoran ini pun luar biasa.' },
    { jp: '技術<b>もさることながら</b>、チームワークが勝因だった。', id: 'Kemampuan teknis sudah tentu penting, namun kerja sama tim lah yang menjadi kunci kemenangan.' },
    { jp: '外見<b>もさることながら</b>、彼の人格が多くの人を惹きつける。', id: 'Penampilannya sudah tentu menarik, tapi kepribadiannya lah yang memikat banyak orang.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00021', level: 'n1', pattern: '〜と思いきや', reading: '〜to omoikiya',
  meaning: 'mengira ... ternyata ... (pembalikan tak terduga)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + と思いきや',
  desc: '<b>〜と思いきや</b> menyatakan bahwa asumsi atau dugaan awal ternyata salah — kenyataannya adalah kebalikannya. "Kukira X, ternyata Y (yang sama sekali berbeda)."',
  nuance: 'Selalu ada unsur kejutan atau pembalikan arah yang tak terduga. Berbeda dari 〜と思ったら yang lebih luas, 〜と思いきや secara spesifik menekankan rasa terkejut karena prediksi meleset secara dramatis.',
  examples: [
    { jp: '試験に合格した<b>と思いきや</b>、実は不合格だった。', id: 'Kukira lulus ujian, ternyata tidak lulus.' },
    { jp: 'もう終わった<b>と思いきや</b>、まだ続きがあった。', id: 'Kukira sudah selesai, ternyata masih ada kelanjutannya.' },
    { jp: '雨が止んだ<b>と思いきや</b>、また降り始めた。', id: 'Kukira hujan sudah berhenti, ternyata mulai turun lagi.' }
  ],
  see_also_grammar: ['gn1-00022'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00022'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00022', level: 'n1', pattern: '〜とみえて／〜とみえる', reading: '〜to miete / to mieru',
  meaning: 'kelihatannya ... / tampaknya ... (berdasarkan observasi)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + とみえて / とみえる',
  desc: '<b>〜とみえる</b> menyatakan dugaan yang didasarkan pada bukti yang dapat diamati secara langsung. <b>〜とみえて</b> digunakan sebagai klausa penghubung: "kelihatannya X, karenanya Y."',
  nuance: 'Berbeda dari 〜らしい atau 〜ようだ yang lebih umum, 〜とみえる/とみえて menekankan bahwa dugaan berasal dari observasi konkret. Lebih formal, sering muncul dalam tulisan naratif dan laporan.',
  examples: [
    { jp: '疲れている<b>とみえて</b>、彼はすぐ眠ってしまった。', id: 'Kelihatannya dia kelelahan, karena langsung tertidur.' },
    { jp: '気に入った<b>とみえて</b>、何度も読み返している。', id: 'Tampaknya dia menyukainya, karena berkali-kali dibaca ulang.' },
    { jp: '雨が降る<b>とみえる</b>、空が暗くなってきた。', id: 'Kelihatannya akan hujan, langit mulai gelap.' }
  ],
  see_also_grammar: ['gn1-00021'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00021'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00023', level: 'n1', pattern: '〜ともなく／〜ともなしに', reading: '〜to mo naku / to mo nashi ni',
  meaning: 'tanpa sengaja ... / tanpa kesadaran penuh ...',
  cat: 'directional-aspect',
  connection: 'V-dict + ともなく / ともなしに',
  desc: '<b>〜ともなく</b> (atau <b>〜ともなしに</b>) menyatakan bahwa suatu tindakan dilakukan tanpa tujuan jelas, tanpa sengaja, atau tanpa kesadaran penuh. Sering digunakan bersama verba persepsi seperti 見る dan 聞く.',
  nuance: 'Menggambarkan tindakan yang tidak terarah atau tidak disengaja. Berbeda dari 〜ないで yang hanya menyatakan "tanpa melakukan", 〜ともなく menekankan ketidaksengajaan yang menyertai tindakan yang dilakukan.',
  examples: [
    { jp: 'どこへ行く<b>ともなく</b>、街をぶらぶら歩いた。', id: 'Tanpa tujuan kemana, aku berjalan berkeliling kota.' },
    { jp: '聞く<b>ともなしに</b>、隣の会話が耳に入ってきた。', id: 'Tanpa sengaja mendengarkan, percakapan di sebelah masuk ke telingaku.' },
    { jp: '見る<b>ともなく</b>テレビを見ていたら、気になるニュースが流れた。', id: 'Saat menonton TV tanpa benar-benar memperhatikan, ada berita yang menarik perhatianku.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00024', level: 'n1', pattern: '〜が故に／〜がゆえに', reading: '〜ga yue ni',
  meaning: 'karena ... / justru karena ... (sastra/formal)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + が故に / がゆえに',
  desc: '<b>〜が故に</b> (atau <b>〜がゆえに</b>) adalah ekspresi klasik untuk menyatakan sebab-akibat, dengan nuansa formal/sastra yang kuat. Artinya serupa dengan 〜から atau 〜ので, namun jauh lebih formal dan literer.',
  nuance: 'Sering mengandung nuansa bahwa penyebabnya adalah sesuatu yang mendasar atau tak terhindarkan. Pemakaian dalam percakapan akan terdengar sangat kaku. Sering muncul dalam filsafat, sastra, dan esai.',
  examples: [
    { jp: '若い<b>が故に</b>、経験が足りないこともある。', id: 'Justru karena masih muda, kadang pengalamannya masih kurang.' },
    { jp: '正直である<b>が故に</b>、傷つくこともある。', id: 'Karena jujur, terkadang juga bisa terluka.' },
    { jp: '人間である<b>がゆえに</b>、感情に動かされることがある。', id: 'Karena manusia, kadang tergerak oleh emosi.' }
  ],
  see_also_grammar: ['gn1-00013'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00013'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00025', level: 'n1', pattern: '〜ならでは', reading: '〜nara de wa',
  meaning: 'hanya bisa ada pada ... / khas dari ... (tidak ada di tempat lain)',
  cat: 'limitation-only',
  connection: 'N + ならでは（の + N / で + predicate）',
  desc: '<b>〜ならでは</b> menyatakan bahwa sesuatu hanya bisa ada, dilakukan, atau dirasakan dalam konteks atau pada entitas yang disebutkan. Mengandung nuansa keistimewaan dan keunikan yang positif.',
  nuance: 'Selalu berkonotasi positif — menyoroti keistimewaan eksklusif. Berbeda dari 〜だけ atau 〜しか, 〜ならでは menekankan nilai istimewa yang tidak bisa ditemukan di tempat lain. Sering dalam konteks budaya dan pariwisata.',
  examples: [
    { jp: '京都<b>ならでは</b>の風景が広がっている。', id: 'Terbentang pemandangan yang hanya bisa ditemukan di Kyoto.' },
    { jp: 'これはプロ<b>ならでは</b>の技だ。', id: 'Ini adalah teknik yang hanya dimiliki oleh seorang profesional.' },
    { jp: '手作り<b>ならでは</b>の温かさがある。', id: 'Ada kehangatan yang hanya bisa ada pada barang buatan tangan.' }
  ],
  see_also_grammar: ['gn1-00026'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00026'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00026', level: 'n1', pattern: '〜ならではの', reading: '〜nara de wa no',
  meaning: 'yang khas/unik dari ... (sebagai pengubah nomina)',
  cat: 'limitation-only',
  connection: 'N + ならではの + N',
  desc: '<b>〜ならではの</b> adalah varian atributif (pengubah nomina) dari 〜ならでは, yang menyatakan keistimewaan eksklusif suatu entitas. Selalu diikuti nomina yang dijelaskannya.',
  nuance: 'Secara fungsi berbeda dari 〜ならでは: 〜ならではの selalu mendahului nomina (ならではの味、ならではの経験), sedangkan 〜ならでは bisa berdiri sendiri atau diikuti で + predikat. Keduanya bermakna sama namun berbeda posisi.',
  examples: [
    { jp: '日本<b>ならではの</b>おもてなし文化に感動した。', id: 'Aku terkesan dengan budaya おもてなし yang khas Jepang.' },
    { jp: 'このシェフ<b>ならではの</b>料理が楽しめる。', id: 'Kamu bisa menikmati masakan yang khas hanya dari chef ini.' },
    { jp: '子供時代<b>ならではの</b>無邪気な笑顔が忘れられない。', id: 'Senyum polos yang hanya ada di masa kanak-kanak tidak bisa terlupakan.' }
  ],
  see_also_grammar: ['gn1-00025'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00025'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00027', level: 'n1', pattern: '〜そばから', reading: '〜soba kara',
  meaning: 'segera setelah ... langsung ... lagi (siklus berulang yang melelahkan)',
  cat: 'sequential-temporal',
  connection: 'V-dict / V-ta + そばから',
  desc: '<b>〜そばから</b> menyatakan bahwa segera setelah melakukan sesuatu, hal itu langsung dibatalkan atau diulang kembali — menggambarkan siklus yang membuat frustrasi atau kesia-siaan.',
  nuance: 'Selalu mengandung nuansa frustrasi atau kelelahan: "Baru saja X, sudah Y lagi." Berbeda dari 〜たびに yang lebih netral, 〜そばから menekankan bahwa X tidak sempat "berlaku" sebelum Y langsung membatalkannya.',
  examples: [
    { jp: '片付ける<b>そばから</b>、子供が散らかす。', id: 'Baru saja dibereskan, anak-anak sudah mengacak-acak lagi.' },
    { jp: '覚える<b>そばから</b>、忘れてしまう。', id: 'Baru saja menghafal, langsung lupa lagi.' },
    { jp: '洗った<b>そばから</b>、また汚れてしまった。', id: 'Baru saja dicuci, langsung kotor lagi.' }
  ],
  see_also_grammar: ['gn1-00028'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00028'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00028', level: 'n1', pattern: '〜てからというもの', reading: '〜te kara to iu mono',
  meaning: 'sejak saat ... segalanya berubah',
  cat: 'inception-continuation',
  connection: 'V-te + からというもの',
  desc: '<b>〜てからというもの</b> menyatakan bahwa sejak suatu peristiwa terjadi, terjadi perubahan signifikan dan berkelanjutan hingga saat ini. Menekankan titik balik yang mengubah segalanya secara dramatis.',
  nuance: 'Berbeda dari 〜てから yang hanya menyatakan urutan, 〜てからというもの menekankan perubahan yang permanen dan dramatis. Sering diikuti kalimat yang menggambarkan keadaan yang berlanjut hingga sekarang.',
  examples: [
    { jp: '日本に来<b>てからというもの</b>、生活習慣がすっかり変わった。', id: 'Sejak datang ke Jepang, kebiasaan hidupku berubah sepenuhnya.' },
    { jp: '彼女と別れ<b>てからというもの</b>、ずっと落ち込んでいる。', id: 'Sejak berpisah dengannya, aku terus merasa sedih.' },
    { jp: 'あの本を読ん<b>でからというもの</b>、考え方が大きく変わった。', id: 'Sejak membaca buku itu, cara berpikirku berubah drastis.' }
  ],
  see_also_grammar: ['gn1-00027'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00027'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00029', level: 'n1', pattern: '〜を限りに', reading: '〜wo kagiri ni',
  meaning: 'mulai saat ... tidak lagi ... / terhitung sejak ...',
  cat: 'sequential-temporal',
  connection: 'N（waktu/acara）+ を限りに',
  desc: '<b>〜を限りに</b> menyatakan bahwa suatu titik waktu atau acara menjadi batas akhir dari sesuatu — setelah titik itu, sesuatu berakhir atau tidak lagi dilakukan. Sering digunakan dalam pengumuman resmi atau pernyataan tekad.',
  nuance: 'Berbeda dari 〜限りだ yang mengekspresikan emosi intens, 〜を限りに menyatakan batas waktu yang tegas dan faktual. Sering muncul dalam konteks pengunduran diri, penutupan, atau perpisahan resmi.',
  examples: [
    { jp: '今日<b>を限りに</b>、タバコをやめます。', id: 'Mulai hari ini, aku berhenti merokok.' },
    { jp: '今シーズン<b>を限りに</b>、引退することを発表した。', id: 'Dia mengumumkan pensiun terhitung akhir musim ini.' },
    { jp: '今回<b>を限りに</b>、このサービスは終了いたします。', id: 'Terhitung mulai sekarang, layanan ini akan dihentikan.' }
  ],
  see_also_grammar: ['gn1-00030'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00030'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00030', level: 'n1', pattern: '〜限りだ', reading: '〜kagiri da',
  meaning: 'betapa ... / sungguh ... (ungkapan emosi intens, orang pertama)',
  cat: 'sentence-final-modality',
  connection: 'Adj-i / Adj-na（な形）+ 限りだ',
  desc: '<b>〜限りだ</b> mengungkapkan perasaan yang sangat intens dari sudut pandang orang pertama — baik positif maupun negatif. "Sungguh X rasanya." Biasanya digunakan untuk emosi seperti kebahagiaan, keharuan, rasa malu, atau sedih.',
  nuance: 'Hanya untuk emosi orang pertama — tidak bisa menggambarkan perasaan orang lain. Berbeda dari 〜を限りに yang bermakna temporal, 〜限りだ murni ekspresi perasaan. Terasa formal dan khidmat, sering dalam sambutan resmi.',
  examples: [
    { jp: 'このような賞をいただき、光栄の<b>限りです</b>。', id: 'Menerima penghargaan seperti ini, sungguh merupakan kehormatan yang tiada tara.' },
    { jp: '皆さんの応援が、うれしい<b>限りです</b>。', id: 'Dukungan dari semua orang ini sungguh membahagiakan.' },
    { jp: 'こんな失敗をしてしまい、恥ずかしい<b>限りだ</b>。', id: 'Melakukan kesalahan seperti ini, sungguh sangat memalukan.' }
  ],
  see_also_grammar: ['gn1-00029'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00029'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00031', level: 'n1', pattern: '〜ずとも', reading: '〜zu tomo',
  meaning: 'meskipun tidak ... (pun tetap ...)',
  cat: 'contrast-concession',
  connection: 'V-neg (ず形) + とも',
  desc: '<b>〜ずとも</b> adalah bentuk sastra/klasik yang berarti "meskipun tidak melakukan X, Y tetap berlaku." Setara modern: 〜なくても.',
  nuance: 'Sangat literary — umumnya dalam tulisan formal, puisi, atau pidato. Lebih kuat dan lebih anggun dari なくても. Jangan dipakai dalam percakapan sehari-hari.',
  examples: [
    { jp: '言わ<b>ずとも</b>、彼は状況を理解していた。', id: 'Meskipun tidak diucapkan, dia sudah memahami situasinya.' },
    { jp: '頼ま<b>ずとも</b>、彼女はいつも助けてくれる。', id: 'Meskipun tidak diminta, dia selalu membantuku.' },
    { jp: '見<b>ずとも</b>わかる結果だった。', id: 'Itu adalah hasil yang sudah bisa diketahui tanpa perlu melihat.' }
  ],
  see_also_grammar: ['gn1-00033'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00033'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00032', level: 'n1', pattern: '〜ずじまい', reading: '〜zu jimai',
  meaning: 'akhirnya tidak sempat ... / tidak jadi ...',
  cat: 'completion-regret',
  connection: 'V-neg (ず形) + じまい',
  desc: '<b>〜ずじまい</b> mengungkapkan penyesalan bahwa sesuatu yang ingin dilakukan akhirnya tidak pernah terlaksana hingga akhir. Nuansa: "sudah berniat tapi kesempatan tidak datang."',
  nuance: 'Berbeda dari なかった yang hanya menyatakan fakta — ずじまい mengandung penyesalan implisit. Sering dipakai untuk mengenang sesuatu yang terlewat (misal: almarhum, perjalanan yang batal).',
  examples: [
    { jp: '結局、彼に謝ら<b>ずじまい</b>だった。', id: 'Akhirnya aku tidak sempat minta maaf kepadanya.' },
    { jp: '買おうと思っていたのに、行か<b>ずじまい</b>になってしまった。', id: 'Padahal berniat membeli, tapi akhirnya tidak jadi pergi.' },
    { jp: '祖父には一度も会わ<b>ずじまい</b>で、先月亡くなった。', id: 'Kakek meninggal bulan lalu tanpa pernah sempat aku temui.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00033', level: 'n1', pattern: '〜ないまでも', reading: '〜nai made mo',
  meaning: 'meskipun tidak sampai ... setidaknya ...',
  cat: 'contrast-concession',
  connection: 'V-plain-neg / i-adj-neg + までも',
  desc: '<b>〜ないまでも</b> menyatakan bahwa meski kondisi ideal tidak tercapai, minimal hal yang lebih rendah masih bisa diharapkan. Struktur: "tidak sampai A, tapi setidaknya B."',
  nuance: 'Berbeda dari なくても yang hanya menyatakan kondisi negatif sederhana. ないまでも menyiratkan ada gradasi — A adalah standar tinggi yang tidak bisa dicapai, B adalah standar lebih rendah yang masih realistis.',
  examples: [
    { jp: '毎日<b>ないまでも</b>、週に一度は運動した方がいい。', id: 'Meskipun tidak setiap hari, setidaknya berolahraga seminggu sekali.' },
    { jp: '完璧で<b>ないまでも</b>、誠実に取り組むことが大切だ。', id: 'Meskipun tidak sempurna, yang penting adalah bekerja dengan jujur.' },
    { jp: '一流で<b>ないまでも</b>、きちんとした仕事をしてほしい。', id: 'Meski tidak kelas satu, aku harap kamu bekerja dengan benar.' }
  ],
  see_also_grammar: ['gn1-00031'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00031'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00034', level: 'n1', pattern: '〜なくして / 〜なしに', reading: '〜naku shite / 〜nashi ni',
  meaning: 'tanpa ... (maka tidak bisa ...)',
  cat: 'reason-cause',
  connection: 'N + なくして(は) / なしに(は)',
  desc: '<b>〜なくして</b> dan <b>〜なしに</b> menyatakan bahwa tanpa X, Y tidak mungkin terjadi. Digunakan untuk menekankan bahwa X adalah syarat mutlak.',
  nuance: 'なくして lebih formal dan kaku (cocok untuk tulisan resmi/pidato). なしに lebih luas pemakaiannya. Sering diikuti は untuk memperkuat syarat negatif: なくしては / なしには.',
  examples: [
    { jp: '努力<b>なくして</b>、成功はない。', id: 'Tanpa kerja keras, tidak ada kesuksesan.' },
    { jp: '信頼<b>なしに</b>、チームワークは成り立たない。', id: 'Tanpa kepercayaan, kerja sama tim tidak bisa berjalan.' },
    { jp: '皆さんの協力<b>なくして</b>は、このプロジェクトは実現しなかった。', id: 'Tanpa kerja sama semua pihak, proyek ini tidak akan terwujud.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00035', level: 'n1', pattern: '〜に即して / 〜に即した', reading: '〜ni sokushite / 〜ni sokushita',
  meaning: 'sesuai dengan / berdasarkan kenyataan ...',
  cat: 'reason-cause',
  connection: 'N + に即して (adverbial) / に即した + N (adjectival)',
  desc: '<b>〜に即して</b> berarti "berdasarkan / mengikuti X secara konkret." Menekankan keselarasan dengan fakta nyata, aturan, atau kondisi aktual — bukan teoritis.',
  nuance: 'に即して berbeda dari に基づいて — に基づいて menekankan sumber/dasar, sedangkan に即して menekankan kesesuaian dengan realitas konkret. Sering dipakai dalam konteks hukum, pendidikan, atau kebijakan.',
  examples: [
    { jp: '現実<b>に即した</b>政策が必要だ。', id: 'Diperlukan kebijakan yang sesuai dengan kenyataan.' },
    { jp: '法律<b>に即して</b>判断するべきだ。', id: 'Harus mengambil keputusan sesuai hukum yang berlaku.' },
    { jp: '実情<b>に即した</b>指導を心がけている。', id: 'Aku berusaha memberikan bimbingan yang sesuai dengan kondisi nyata.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00036', level: 'n1', pattern: '〜に先立って / 〜に先立ち', reading: '〜ni sakidatte / 〜ni sakidachi',
  meaning: 'sebelum ... / mendahului ...',
  cat: 'sequential-temporal',
  connection: 'N / V-dict + に先立って / に先立ち',
  desc: '<b>〜に先立って</b> menyatakan bahwa suatu tindakan dilakukan sebelum peristiwa penting lainnya. に先立ち adalah bentuk yang lebih formal/tulisan.',
  nuance: 'Berbeda dari 前に yang netral — に先立って menyiratkan bahwa X dilakukan secara khusus sebagai persiapan atau dalam rangka Y. Umumnya dipakai dalam konteks resmi: upacara, proyek, pengumuman.',
  examples: [
    { jp: '式典<b>に先立って</b>、黙祷が行われた。', id: 'Sebelum upacara dimulai, dilakukan mengheningkan cipta.' },
    { jp: '工事<b>に先立ち</b>、住民説明会が開催された。', id: 'Mendahului dimulainya konstruksi, diadakan pertemuan penjelasan kepada warga.' },
    { jp: '試合<b>に先立って</b>、選手たちは体を温めた。', id: 'Sebelum pertandingan, para atlet melakukan pemanasan.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00037', level: 'n1', pattern: '〜を前提として', reading: '〜wo zentei to shite',
  meaning: 'dengan asumsi bahwa ... / berdasarkan premis ...',
  cat: 'reason-cause',
  connection: 'N / V-plain + ことを前提として',
  desc: '<b>〜を前提として</b> menyatakan bahwa X adalah asumsi dasar atau prasyarat yang sudah ditetapkan sebelum melanjutkan Y. Dipakai dalam konteks negosiasi, perencanaan, atau argumentasi formal.',
  nuance: 'Berbeda dari を踏まえて — を前提として berfokus pada asumsi/syarat awal yang belum tentu terjadi, sedangkan を踏まえて berfokus pada fakta yang sudah ada. Penting untuk debat akademis dan dokumen resmi.',
  examples: [
    { jp: '結婚<b>を前提として</b>付き合っている。', id: 'Kami berpacaran dengan asumsi menuju pernikahan.' },
    { jp: '留学することを前提として、英語の勉強を始めた。', id: 'Dengan premis akan belajar ke luar negeri, aku mulai belajar bahasa Inggris.' },
    { jp: '参加者全員の同意<b>を前提として</b>、計画を進める。', id: 'Dengan asumsi persetujuan seluruh peserta, rencana akan dilanjutkan.' }
  ],
  see_also_grammar: ['gn1-00038'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00038'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00038', level: 'n1', pattern: '〜を踏まえて', reading: '〜wo fumaete',
  meaning: 'berdasarkan ... / mempertimbangkan ... (fakta/pengalaman nyata)',
  cat: 'reason-cause',
  connection: 'N + を踏まえて / を踏まえた + N',
  desc: '<b>〜を踏まえて</b> berarti "mengambil X sebagai dasar pijakan" — X adalah fakta, hasil, atau pengalaman nyata yang sudah ada, dan Y adalah tindakan selanjutnya yang dibangun di atasnya.',
  nuance: 'Berbeda dari を前提として yang bersifat asumsi ke depan — を踏まえて mengacu pada sesuatu yang sudah nyata/terjadi. Pola ini sangat umum dalam laporan bisnis, proposal, dan tulisan akademis.',
  examples: [
    { jp: 'アンケート結果<b>を踏まえて</b>、サービスを改善します。', id: 'Berdasarkan hasil survei, kami akan memperbaiki layanan.' },
    { jp: '前回の失敗<b>を踏まえて</b>、今回は慎重に進めた。', id: 'Dengan mempertimbangkan kegagalan sebelumnya, kali ini aku melangkah hati-hati.' },
    { jp: '現状<b>を踏まえた</b>対策が求められる。', id: 'Diperlukan langkah yang didasarkan pada kondisi saat ini.' }
  ],
  see_also_grammar: ['gn1-00037'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00037'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00039', level: 'n1', pattern: '〜を皮切りに', reading: '〜wo kawakiri ni',
  meaning: 'dimulai dari ... sebagai awal / diawali dengan ...',
  cat: 'inception-continuation',
  connection: 'N + を皮切りに(して)',
  desc: '<b>〜を皮切りに</b> menyatakan bahwa X adalah titik awal dari serangkaian peristiwa yang terus berlanjut setelahnya. Nuansa: X membuka jalan bagi hal-hal berikutnya.',
  nuance: '皮切り berasal dari istilah pertanian (sayatan pertama). Selalu menyiratkan bahwa setelah X, ada rangkaian kejadian lain yang mengikuti. Dipakai untuk peluncuran, tur, atau kampanye yang berlanjut.',
  examples: [
    { jp: '東京公演<b>を皮切りに</b>、全国ツアーが始まった。', id: 'Diawali dengan pertunjukan di Tokyo, tur nasional pun dimulai.' },
    { jp: '彼の発言<b>を皮切りに</b>、議論が活発になった。', id: 'Dimulai dari pernyataannya, diskusi menjadi semakin aktif.' },
    { jp: '新製品の発売<b>を皮切りに</b>、次々と関連商品が登場した。', id: 'Diawali peluncuran produk baru, produk-produk terkait bermunculan satu per satu.' }
  ],
  see_also_grammar: ['gn1-00040', 'gn1-00041'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00040', 'gn1-00041'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00040', level: 'n1', pattern: '〜を境に / 〜を境として', reading: '〜wo sakai ni / 〜wo sakai to shite',
  meaning: 'sejak ... / mulai dari titik/momen itu (berubah)',
  cat: 'sequential-temporal',
  connection: 'N (waktu/peristiwa) + を境に / を境として',
  desc: '<b>〜を境に</b> menyatakan bahwa X adalah titik pembatas di mana keadaan sebelum dan sesudahnya berbeda secara signifikan. Menekankan adanya perubahan besar.',
  nuance: 'Berbeda dari を機に yang netral tentang arah perubahan — を境に sering menekankan kontras yang jelas antara "sebelum" dan "sesudah." Cocok untuk peristiwa bersejarah atau titik balik hidup seseorang.',
  examples: [
    { jp: '事故<b>を境に</b>、彼の人生は大きく変わった。', id: 'Sejak kecelakaan itu, hidupnya berubah drastis.' },
    { jp: '結婚<b>を境として</b>、生活スタイルが一変した。', id: 'Mulai dari pernikahan, gaya hidup berubah total.' },
    { jp: '転職<b>を境に</b>、彼女は別人のように明るくなった。', id: 'Sejak pindah kerja, dia menjadi jauh lebih ceria seperti orang yang berbeda.' }
  ],
  see_also_grammar: ['gn1-00041', 'gn1-00039'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00041', 'gn1-00039'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00041', level: 'n1', pattern: '〜を機に', reading: '〜wo ki ni',
  meaning: 'mengambil kesempatan dari ... / memanfaatkan momen ...',
  cat: 'sequential-temporal',
  connection: 'N + を機に(して)',
  desc: '<b>〜を機に</b> menyatakan bahwa X dimanfaatkan sebagai kesempatan/pemicu untuk melakukan atau memulai Y. Fokus pada niat aktif memanfaatkan momen.',
  nuance: 'Berbeda dari を境に yang hanya menandai perubahan — を機に mengandung nuansa volitional: subjek secara aktif "menggunakan" momen X. Sering dipakai untuk keputusan positif (berhenti merokok, memulai bisnis, dll).',
  examples: [
    { jp: '定年退職<b>を機に</b>、念願の旅行を計画した。', id: 'Memanfaatkan pensiun sebagai kesempatan, aku merencanakan perjalanan impian.' },
    { jp: '引っ越し<b>を機に</b>、断捨離を始めた。', id: 'Mengambil kesempatan dari pindahan rumah, aku mulai merapikan barang-barang.' },
    { jp: 'このプロジェクト<b>を機に</b>、チームの結束が強まった。', id: 'Berkat proyek ini, ikatan tim semakin kuat.' }
  ],
  see_also_grammar: ['gn1-00040', 'gn1-00039'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00040', 'gn1-00039'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00042', level: 'n1', pattern: '〜かたがた', reading: '〜katagata',
  meaning: 'sambil / sekaligus ... (dua tujuan dalam satu kunjungan — formal/surat)',
  cat: 'purpose',
  connection: 'N (verbal noun) + かたがた',
  desc: '<b>〜かたがた</b> menyatakan bahwa sebuah kunjungan atau tindakan memiliki dua tujuan sekaligus. Digunakan terutama dalam surat formal dan ucapan sopan.',
  nuance: 'Eksklusif untuk konteks formal/surat — tidak dipakai dalam percakapan biasa. Nomina yang digunakan biasanya adalah kata kerja yang dinominalisasi (挨拶、お礼、報告, dll). Bedakan dari かたわら (kegiatan sampingan jangka panjang) dan がてら (sambil jalan sehari-hari).',
  examples: [
    { jp: 'ご挨拶<b>かたがた</b>、近況をご報告申し上げます。', id: 'Sambil menyampaikan salam, saya juga ingin melaporkan kabar terkini.' },
    { jp: 'お礼<b>かたがた</b>、お伺いしたいと存じます。', id: 'Sambil mengucapkan terima kasih, saya bermaksud untuk berkunjung.' },
    { jp: 'ご報告<b>かたがた</b>、一度お目にかかれますでしょうか。', id: 'Sambil menyampaikan laporan, dapatkah saya menemui Anda sebentar?' }
  ],
  see_also_grammar: ['gn1-00043', 'gn1-00044'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00043', 'gn1-00044'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00043', level: 'n1', pattern: '〜かたわら', reading: '〜katawara',
  meaning: 'di samping kegiatan utama ... / sambil juga ...',
  cat: 'purpose',
  connection: 'V-dict / N-の + かたわら',
  desc: '<b>〜かたわら</b> menyatakan bahwa seseorang, di samping kegiatan atau pekerjaan utamanya (X), juga secara konsisten menjalankan aktivitas lain (Y). Keduanya berlangsung dalam jangka panjang.',
  nuance: 'Berbeda dari かたがた (dua tujuan satu kunjungan) dan がてら (sambil lewat/sekalian) — かたわら menekankan paralel dua aktivitas yang sama-sama rutin dan berkelanjutan. Sering mendeskripsikan hobi atau profesi sampingan.',
  examples: [
    { jp: '会社員をする<b>かたわら</b>、小説を書いている。', id: 'Di samping bekerja sebagai karyawan, dia juga menulis novel.' },
    { jp: '育児<b>かたわら</b>、オンラインで英語を教えている。', id: 'Di samping mengurus anak, dia juga mengajar bahasa Inggris secara online.' },
    { jp: '研究の<b>かたわら</b>、学生に講義も行っている。', id: 'Di samping meneliti, dia juga mengajar kuliah kepada mahasiswa.' }
  ],
  see_also_grammar: ['gn1-00042', 'gn1-00044'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00042', 'gn1-00044'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00044', level: 'n1', pattern: '〜がてら', reading: '〜gatera',
  meaning: 'sekalian / sambil (melakukan hal lain yang searah)',
  cat: 'purpose',
  connection: 'V-stem / N + がてら',
  desc: '<b>〜がてら</b> menyatakan bahwa seseorang melakukan Y "sekalian" saat melakukan X — X adalah tujuan utama atau aktivitas yang sudah direncanakan, dan Y ditambahkan secara spontan karena searah atau mudah dilakukan bersamaan.',
  nuance: 'Lebih kasual dibanding かたがた dan かたわら. Sering dipakai untuk aktivitas sehari-hari: jalan-jalan, belanja, keluar rumah. X biasanya adalah kegiatan yang mengharuskan bergerak/berpindah (散歩、買い物, dll).',
  examples: [
    { jp: '散歩<b>がてら</b>、コンビニに寄った。', id: 'Sekalian jalan-jalan, aku mampir ke minimarket.' },
    { jp: '買い物<b>がてら</b>、友達の家に寄ってみた。', id: 'Sekalian belanja, aku mampir ke rumah teman.' },
    { jp: '運動<b>がてら</b>、図書館まで歩いて行った。', id: 'Sambil berolahraga sekalian, aku berjalan kaki ke perpustakaan.' }
  ],
  see_also_grammar: ['gn1-00042', 'gn1-00043'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00042', 'gn1-00043'],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00045', level: 'n1', pattern: '〜て以来', reading: '〜te irai',
  meaning: 'sejak ... (sampai sekarang, terus-menerus)',
  cat: 'inception-continuation',
  connection: 'V-te-form + 以来',
  desc: '<b>〜て以来</b> menyatakan bahwa sejak peristiwa X terjadi, kondisi atau kebiasaan Y terus berlangsung tanpa berhenti hingga saat ini. Menekankan kesinambungan sejak titik awal.',
  nuance: 'Berbeda dari てから yang hanya menyatakan urutan — て以来 menekankan bahwa keadaan Y masih berlanjut hingga sekarang (tidak berhenti). Biasanya dipakai untuk menggambarkan perubahan karakter, kebiasaan, atau hubungan yang bertahan lama.',
  examples: [
    { jp: '留学し<b>て以来</b>、日本語への興味が深まった。', id: 'Sejak belajar di Jepang, minatku terhadap bahasa Jepang semakin dalam.' },
    { jp: '子供が生まれ<b>て以来</b>、生活が一変した。', id: 'Sejak anak lahir, kehidupan berubah total.' },
    { jp: '彼女に会っ<b>て以来</b>、ずっと気になっている。', id: 'Sejak bertemu dengannya, aku terus memikirkannya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00046', level: 'n1', pattern: '〜をよそに', reading: '〜wo yoso ni',
  meaning: 'mengabaikan ... / tidak peduli dengan ... (meski ada kekhawatiran orang lain)',
  cat: 'contrast-concession',
  connection: 'N + をよそに',
  desc: '<b>〜をよそに</b> menyatakan bahwa subjek bertindak tanpa memedulikan kekhawatiran, harapan, atau perasaan orang-orang di sekitarnya (N). Sering mengandung nuansa kritik atau ironi.',
  nuance: 'N yang digunakan biasanya berupa kata seperti 心配、期待、反対、懸念 (kekhawatiran, harapan, penolakan). Tidak bisa dipakai untuk mengabaikan benda mati. Sering mengekspresikan ketidaksetujuan penulis terhadap tindakan subjek.',
  examples: [
    { jp: '親の心配<b>をよそに</b>、彼は旅を続けた。', id: 'Mengabaikan kekhawatiran orang tuanya, dia terus melanjutkan perjalanan.' },
    { jp: '周囲の反対<b>をよそに</b>、二人は結婚した。', id: 'Tidak peduli dengan penolakan orang-orang sekitar, keduanya tetap menikah.' },
    { jp: '世間の批判<b>をよそに</b>、会社は強引に計画を進めた。', id: 'Mengabaikan kritik publik, perusahaan itu tetap memaksakan rencananya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00047', level: 'n1', pattern: '〜にほかならない', reading: '〜ni hoka naranai',
  meaning: 'tidak lain adalah ... / justru ... (penegasan kuat)',
  cat: 'copula',
  connection: 'N / V-plain + にほかならない',
  desc: '<b>〜にほかならない</b> adalah penegasan kuat bahwa X tidak lain, tidak lebih, tidak kurang dari Y. Pembicara menyimpulkan atau menyatakan identitas/alasan dengan sangat tegas.',
  nuance: 'Lebih kuat dari だ/です biasa. Sering digunakan untuk menyatakan kesimpulan logis atau evaluasi final. Setara dengan "tidak lain dan tidak bukan adalah X." Formal — jarang dalam percakapan kasual.',
  examples: [
    { jp: 'これは彼の努力の結果<b>にほかならない</b>。', id: 'Ini tidak lain adalah hasil dari kerja kerasnya.' },
    { jp: '彼女が成功したのは、才能ではなく努力<b>にほかならない</b>。', id: 'Keberhasilannya tidak lain adalah kerja keras, bukan bakat.' },
    { jp: '問題の根本は信頼の欠如<b>にほかならない</b>。', id: 'Akar permasalahannya tidak lain adalah kurangnya kepercayaan.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00048', level: 'n1', pattern: '〜であれ〜であれ', reading: '〜de are 〜de are',
  meaning: 'baik ... maupun ... / apapun itu',
  cat: 'listing-addition',
  connection: 'N / na-adj + であれ〜N / na-adj + であれ',
  desc: '<b>〜であれ〜であれ</b> menyatakan bahwa apapun pilihannya di antara dua kemungkinan (X atau Y), hal yang dinyatakan dalam klausa utama tetap berlaku. Bersifat inklusif dan exhaustif.',
  nuance: 'Bersifat literary/formal. Berbeda dari であろうと〜であろうと yang lebih menekankan kondisi hipotetis — であれ〜であれ lebih menekankan "keduanya sama-sama berlaku." Sering dipakai dalam tulisan filosofis atau pernyataan prinsip.',
  examples: [
    { jp: '成功<b>であれ</b>失敗<b>であれ</b>、全力を尽くすことが大切だ。', id: 'Baik sukses maupun gagal, yang terpenting adalah memberi usaha terbaik.' },
    { jp: '男性<b>であれ</b>女性<b>であれ</b>、平等に扱われるべきだ。', id: 'Baik pria maupun wanita, seharusnya diperlakukan secara setara.' },
    { jp: '賛成<b>であれ</b>反対<b>であれ</b>、意見を述べてほしい。', id: 'Baik setuju maupun tidak, aku harap kamu menyampaikan pendapat.' }
  ],
  see_also_grammar: ['gn1-00049'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00049'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00049', level: 'n1', pattern: '〜であろうと〜であろうと', reading: '〜de arou to 〜de arou to',
  meaning: 'apapun ... / tidak peduli apakah ... atau ...',
  cat: 'contrast-concession',
  connection: 'N / na-adj + であろうと〜N / na-adj + であろうと',
  desc: '<b>〜であろうと〜であろうと</b> menyatakan bahwa meskipun dua kondisi yang berbeda (X atau Y), hal yang disebutkan dalam klausa utama tidak berubah. Menekankan ketidakpedulian terhadap kondisi apapun.',
  nuance: 'Lebih kuat dari であれ〜であれ dalam hal penekanan "tidak peduli." Mengandung nuansa ketegasan (tidak ada kondisi yang akan mengubah prinsip ini). Sering dipakai dalam pernyataan moral atau hukum.',
  examples: [
    { jp: '相手が誰<b>であろうと</b>何<b>であろうと</b>、暴力は許されない。', id: 'Apapun orangnya dan apapun alasannya, kekerasan tidak bisa dibenarkan.' },
    { jp: '有名人<b>であろうと</b>一般人<b>であろうと</b>、法の前では平等だ。', id: 'Tidak peduli orang terkenal atau warga biasa, semua setara di hadapan hukum.' },
    { jp: '理由が何<b>であろうと</b>嘘<b>であろうと</b>、信頼は失われる。', id: 'Apapun alasannya, apapun kebohongannya, kepercayaan itu akan hilang.' }
  ],
  see_also_grammar: ['gn1-00048'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00048'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00050', level: 'n1', pattern: '〜べく', reading: '〜beku',
  meaning: 'untuk / dengan tujuan ... (literary/formal)',
  cat: 'purpose',
  connection: 'V-dict (する→すべく) + べく',
  desc: '<b>〜べく</b> adalah bentuk klasik yang menyatakan tujuan atau maksud tindakan — "melakukan X demi Y." Bentuk klasik dari ために dalam register tinggi.',
  nuance: 'Sangat literary dan formal — dipakai dalam tulisan sastra, jurnalistik serius, atau pernyataan resmi. する menjadi すべく (tidak するべく). Tidak dipakai dalam percakapan sehari-hari. Berbeda dari べくして yang mengandung nuansa keniscayaan.',
  examples: [
    { jp: '夢を叶える<b>べく</b>、彼は毎日練習した。', id: 'Demi mewujudkan impiannya, dia berlatih setiap hari.' },
    { jp: '問題を解決す<b>べく</b>、専門家が集められた。', id: 'Demi menyelesaikan masalah, para ahli dikumpulkan.' },
    { jp: '真実を明らかにす<b>べく</b>、調査が開始された。', id: 'Demi mengungkap kebenaran, penyelidikan dimulai.' }
  ],
  see_also_grammar: ['gn1-00051'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00051'],
  register: 'literary', exceptions: null,
  notes: 'する → すべく (bukan するべく)',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00051', level: 'n1', pattern: '〜べくして', reading: '〜beku shite',
  meaning: 'sudah seharusnya demikian / wajar terjadi ... (keniscayaan)',
  cat: 'sentence-final-modality',
  connection: 'V-dict + べくして + V (kata kerja sama)',
  desc: '<b>〜べくして</b> menyatakan bahwa hasil Y terjadi karena memang sudah seharusnya demikian — bukan kebetulan, melainkan keniscayaan logis atau alami. Selalu menggunakan kata kerja yang sama di depan dan belakang.',
  nuance: 'Berbeda dari べく yang menyatakan tujuan — べくして menyatakan bahwa kejadian itu sudah "tertulis" atau "wajar" terjadi. Sering dipakai untuk menggambarkan kemenangan, kegagalan, atau peristiwa yang tampak tak terelakkan.',
  examples: [
    { jp: '彼は勝つ<b>べくして</b>勝った — 準備が違った。', id: 'Dia menang karena memang sudah seharusnya menang — persiapannya berbeda.' },
    { jp: 'あの事故は起こる<b>べくして</b>起きた悲劇だった。', id: 'Kecelakaan itu adalah tragedi yang sudah seharusnya terjadi.' },
    { jp: '二人は出会う<b>べくして</b>出会ったのかもしれない。', id: 'Mungkin keduanya bertemu karena memang sudah ditakdirkan untuk bertemu.' }
  ],
  see_also_grammar: ['gn1-00050'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00050'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00052', level: 'n1', pattern: '〜まじき', reading: '〜majiki',
  meaning: 'tidak sepatutnya / tidak pantas dilakukan oleh ... (literary)',
  cat: 'permission-prohibition',
  connection: 'V-dict + まじき + N',
  desc: '<b>〜まじき</b> adalah bentuk klasik (dari まじ = larangan klasik) yang mengekspresikan sesuatu yang seharusnya tidak dilakukan oleh seseorang dalam posisi atau status tertentu.',
  nuance: 'Sangat literary dan formal — hampir eksklusif dalam tulisan serius, hukum, atau editorial. Kata benda yang mengikutinya biasanya adalah jabatan atau status (教師、医師、指導者, dll). Setara modern: 〜てはいけない / すべきでない が jauh lebih lemah.',
  examples: [
    { jp: 'それは教師にあるまじき行為だ。', id: 'Itu adalah tindakan yang tidak pantas dilakukan oleh seorang guru.' },
    { jp: '指導者にある<b>まじき</b>発言が批判を呼んだ。', id: 'Pernyataan yang tidak patut diucapkan pemimpin itu menuai kritik.' },
    { jp: '医師にある<b>まじき</b>態度で患者に接した。', id: 'Dia bersikap kepada pasien dengan cara yang tidak layak bagi seorang dokter.' }
  ],
  see_also_grammar: ['gn1-00053'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00053'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00053', level: 'n1', pattern: '〜ともあろう', reading: '〜to mo arou',
  meaning: 'seorang yang sekaliber ... seharusnya tidak ... (mengecam)',
  cat: 'sentence-final-modality',
  connection: 'N + ともあろう + N (jabatan/status)',
  desc: '<b>〜ともあろう</b> mengekspresikan kekecewaan atau kecaman bahwa seseorang dengan status/kaliber X melakukan sesuatu yang tidak sesuai dengan harapan. Menekankan kontras antara status tinggi dan tindakan yang rendah.',
  nuance: 'Selalu bernuansa kecaman atau kritik. N yang digunakan adalah jabatan/status yang dihormati (社長、教授、プロ選手, dll). Diikuti klausa negatif atau ekspresi penyesalan. Berbeda dari まじき yang lebih tentang larangan prinsipil.',
  examples: [
    { jp: '社長<b>ともあろう</b>人が、そんな失礼なことを言うとは。', id: 'Tidak disangka seseorang sekaliber direktur utama mengucapkan hal yang tidak sopan seperti itu.' },
    { jp: 'プロ<b>ともあろう</b>者が、基本的なミスをするとは情けない。', id: 'Sungguh memalukan bahwa seseorang yang mengaku profesional melakukan kesalahan dasar seperti itu.' },
    { jp: '教授<b>ともあろう</b>方が、そんな非論理的な意見を述べるとは驚きだ。', id: 'Sungguh mengejutkan bahwa seseorang sekaliber profesor mengemukakan pendapat yang tidak logis seperti itu.' }
  ],
  see_also_grammar: ['gn1-00052'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00052'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00054', level: 'n1', pattern: '〜ようによっては', reading: '〜you ni yotte wa',
  meaning: 'tergantung bagaimana cara ... / bergantung pada cara melakukan ...',
  cat: 'conditional-nara',
  connection: 'V-stem + ようによっては',
  desc: '<b>〜ようによっては</b> menyatakan bahwa hasil bisa berbeda tergantung pada cara atau metode melakukan X. Menekankan bahwa cara/pendekatan (ように) adalah faktor penentu.',
  nuance: 'Berbeda dari 次第では yang berfokus pada kondisi/hasil yang tidak pasti — ようによっては berfokus pada cara/metode. Sering dipakai untuk memberi saran atau menunjukkan bahwa ada cara yang lebih baik.',
  examples: [
    { jp: '言い方<b>ようによっては</b>、同じ内容でも相手に伝わり方が変わる。', id: 'Tergantung cara mengatakannya, pesan yang sama bisa tersampaikan dengan cara yang berbeda.' },
    { jp: '使い<b>ようによっては</b>、この道具はとても便利だ。', id: 'Tergantung cara menggunakannya, alat ini bisa sangat berguna.' },
    { jp: '考え<b>ようによっては</b>、この状況もチャンスと言える。', id: 'Tergantung cara memandangnya, situasi ini pun bisa disebut sebagai peluang.' }
  ],
  see_also_grammar: ['gn1-00055'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00055'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00055', level: 'n1', pattern: '〜次第では', reading: '〜shidai de wa',
  meaning: 'tergantung bagaimana ... / bergantung pada hasil ...',
  cat: 'conditional-nara',
  connection: 'N + 次第では',
  desc: '<b>〜次第では</b> menyatakan bahwa tindakan atau hasil Y akan berbeda tergantung pada kondisi atau hasil dari N. Menekankan bahwa N adalah variabel penentu — bisa ke arah mana saja.',
  nuance: 'Berbeda dari ようによっては yang berfokus pada cara/metode — 次第では berfokus pada kondisi/faktor eksternal yang hasilnya belum diketahui. Sering mengandung nuansa bahwa ada kemungkinan hasil buruk atau perubahan besar.',
  examples: [
    { jp: '交渉の結果<b>次第では</b>、計画を変更することもある。', id: 'Tergantung hasil negosiasi, ada kemungkinan rencana perlu diubah.' },
    { jp: '天候<b>次第では</b>、イベントが中止になる可能性がある。', id: 'Tergantung cuaca, ada kemungkinan acara dibatalkan.' },
    { jp: '彼の返事<b>次第では</b>、こちらも対応を変える必要がある。', id: 'Tergantung jawabannya, kita pun mungkin perlu mengubah respons kita.' }
  ],
  see_also_grammar: ['gn1-00054'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00054'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00056', level: 'n1', pattern: '〜ものを', reading: '〜mono wo',
  meaning: 'padahal kalau saja ... / sayang sekali ... (penyesalan)',
  cat: 'completion-regret',
  connection: 'V/Adj-plain + ものを',
  desc: '<b>〜ものを</b> mengekspresikan penyesalan pembicara bahwa suatu tindakan yang seharusnya mudah atau sudah seharusnya dilakukan, ternyata tidak dilakukan. Nada: "padahal tinggal X saja, kenapa tidak..."',
  nuance: 'Sering mengandung kritik halus atau kekecewaan. Berbeda dari のに (kontras netral) — ものを lebih emosional dan menyiratkan penilaian bahwa X seharusnya dilakukan. Klausa kedua sering tersirat (tidak harus ditulis).',
  examples: [
    { jp: '言ってくれれば助けた<b>ものを</b>、なぜ黙っていたのか。', id: 'Padahal kalau saja bilang, aku pasti bantu — kenapa diam saja?' },
    { jp: '素直に謝れば済んだ<b>ものを</b>、意地を張るから...', id: 'Padahal kalau saja mau minta maaf dengan tulus, sudah selesai — ini malah keras kepala...' },
    { jp: '早く病院に行けば良かった<b>ものを</b>、我慢したから悪化した。', id: 'Sayang sekali tidak langsung ke dokter — karena ditahan malah makin parah.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00057', level: 'n1', pattern: '〜ずにはおかない', reading: '〜zu ni wa okanai',
  meaning: 'pasti akan ... / tidak bisa tidak ... (tak terelakkan)',
  cat: 'obligation-necessity',
  connection: 'V-neg (ず形) + にはおかない',
  desc: '<b>〜ずにはおかない</b> menyatakan bahwa sesuatu pasti terjadi atau dilakukan — tidak bisa dihindari, baik karena dorongan kuat dari dalam maupun kekuatan luar yang mendesak.',
  nuance: 'Ada dua nuansa: (1) "sesuatu yang menimbulkan reaksi kuat" — X ずにはおかない = X pasti membuatmu bereaksi; (2) "tekad yang tidak tergoyahkan" — subjek pasti akan melakukan X. Berbeda dari ないではいられない yang lebih personal/emosional — ずにはおかない lebih kuat dan sering tentang efek pada orang lain.',
  examples: [
    { jp: 'この映画は観る者を感動させ<b>ずにはおかない</b>。', id: 'Film ini pasti akan mengharukan siapapun yang menontonnya.' },
    { jp: '彼の演奏は聴く人を感動させ<b>ずにはおかない</b>力があった。', id: 'Permainannya memiliki kekuatan yang pasti menggerakkan hati siapapun yang mendengar.' },
    { jp: 'この事件は社会に反省を促さ<b>ずにはおかない</b>だろう。', id: 'Kasus ini pasti akan mendorong masyarakat untuk introspeksi.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00058', level: 'n1', pattern: '〜にたえる / 〜にたえない', reading: '〜ni taeru / 〜ni taenai',
  meaning: 'layak / tidak layak untuk ... / tahan / tidak tahan menghadapi ...',
  cat: 'potential',
  connection: 'V-dict / N + に堪える / に堪えない',
  desc: '<b>〜にたえる</b> berarti "layak/tahan untuk X" — subjek memiliki kualitas yang memadai untuk menghadapi atau memenuhi standar X. <b>〜にたえない</b> sebaliknya: terlalu menyedihkan/buruk untuk ditanggung.',
  nuance: 'にたえる dipakai untuk hal positif (鑑賞にたえる = layak dinikmati). にたえない dipakai untuk hal yang terlalu menyakitkan/buruk untuk dilanjutkan (見るにたえない = tidak tega melihatnya). Keduanya formal dan sering dalam konteks estetika, kritik, atau emosi kuat.',
  examples: [
    { jp: 'この作品は鑑賞<b>に堪える</b>クオリティだ。', id: 'Karya ini memiliki kualitas yang layak untuk dinikmati.' },
    { jp: '見る<b>にたえない</b>ほど悲惨な光景だった。', id: 'Itu adalah pemandangan yang sangat memilukan sehingga tidak tega untuk dilihat.' },
    { jp: '彼の演技は批評<b>にたえる</b>ものだった。', id: 'Aktingnya adalah sesuatu yang layak untuk dikritisi secara serius.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00059', level: 'n1', pattern: '〜極まる / 〜極まりない', reading: '〜kiwamaru / 〜kiwamari nai',
  meaning: 'sungguh ... / keterlaluan / mencapai puncak dari ... (ekspresi intens)',
  cat: 'extent-degree',
  connection: 'na-adj語幹 + 極まる / 極まりない',
  desc: '<b>〜極まる</b> dan <b>〜極まりない</b> menyatakan bahwa sifat X mencapai puncak atau tingkatan tertinggi. Kedua bentuk memiliki makna yang hampir sama, namun 極まりない sedikit lebih umum dalam penggunaan modern.',
  nuance: 'Hanya digunakan dengan na-adjective (tanpa な). Sering dipakai dengan kata-kata yang menggambarkan sikap negatif atau kualitas yang ekstrem: 失礼極まる (sangat tidak sopan), 危険極まりない (sangat berbahaya). Sangat formal dan bernada keras.',
  examples: [
    { jp: 'あの態度は失礼<b>極まりない</b>。', id: 'Sikap itu benar-benar tidak sopan keterlaluan.' },
    { jp: '命綱なしで登山するとは、危険<b>極まる</b>行為だ。', id: 'Mendaki gunung tanpa tali pengaman adalah tindakan yang sungguh berbahaya.' },
    { jp: '公の場でそんな発言をするとは、無礼<b>極まりない</b>。', id: 'Mengucapkan hal seperti itu di tempat umum sungguh tidak beradab keterlaluan.' }
  ],
  see_also_grammar: ['gn1-00060'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00060', level: 'n1', pattern: '〜の至り', reading: '〜no itari',
  meaning: 'puncak dari ... / sungguh merupakan ... (formal/ceremonial)',
  cat: 'extent-degree',
  connection: 'N + の至り',
  desc: '<b>〜の至り</b> menyatakan bahwa suatu perasaan atau kondisi mencapai puncak tertingginya. Digunakan dalam konteks ceremonial atau formal untuk mengungkapkan perasaan yang sangat mendalam dengan cara yang elegan.',
  nuance: 'Hampir selalu dipakai dengan kata-kata positif/emosi tinggi dalam konteks ceremonial: 光栄の至り (sungguh suatu kehormatan), 恐縮の至り (sungguh mempermalukan diri), 若気の至り (kenakalan masa muda). Sangat formal — terdengar kuno jika dipakai di luar konteks ceremonial.',
  examples: [
    { jp: 'このような賞をいただき、光栄<b>の至り</b>でございます。', id: 'Mendapatkan penghargaan seperti ini sungguh merupakan kehormatan yang tiada tara.' },
    { jp: '皆様の前でご挨拶できますこと、感激<b>の至り</b>です。', id: 'Dapat menyampaikan sambutan di hadapan semua orang sungguh merupakan kebahagiaan yang luar biasa.' },
    { jp: 'あの頃の失礼な行動は、若気<b>の至り</b>だったと今は反省しております。', id: 'Tingkah laku yang tidak sopan di masa itu kini kusadari sebagai kecerobohan masa muda.' }
  ],
  see_also_grammar: ['gn1-00059'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
}
];
