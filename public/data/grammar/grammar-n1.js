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
  cat: 'conditional-tara',
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
  cat: 'verb-form',
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
  cat: 'extent-degree',
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
  cat: 'extent-degree',
  connection: 'N + ならではの + N',
  desc: '<b>〜ならではの</b> adalah varian atributif (pengubah nomina) dari 〜ならでは, yang menyatakan keistimewaan eksklusif suatu entitas. Selalu diikuti nomina yang dijelaskannya.',
  nuance: 'Secara fungsi berbeda dari 〜ならでは: 〜ならではの selalu mendahului nomina (ならではの味、ならではの経験), sedangkan 〜ならでは bisa berdiri sendiri atau diikuti で + predikat. Keduanya bermakna sama namun berbeda posisi.',
  examples: [
    { jp: '日本<b>ならではの</b>おもてなし文化に感動した。', id: 'Aku terkesan dengan budaya penyambutan tulus yang khas Jepang.' },
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
  cat: 'conditional-tara',
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
  cat: 'conditional-tara',
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
},

{
  id: 'gn1-00061', level: 'n1', pattern: '〜に足る / 〜に足りる',
  reading: '〜ni taru / 〜ni tariru',
  meaning: 'layak untuk ... / cukup untuk ... (formal)',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + に足る',
  desc: '<b>〜に足る</b> menyatakan bahwa seseorang atau sesuatu memiliki kualitas yang cukup untuk memenuhi suatu standar atau pantas mendapatkan sesuatu. Varian klasik adalah 〜に足る, lebih modern 〜に足りる.',
  nuance: 'Pola formal dan tertulis. Paling sering dipadukan dengan kata seperti 信頼, 尊敬, 称賛, 注目 — menyatakan bahwa objeknya benar-benar pantas mendapat penilaian setinggi itu. Memberikan kesan penilaian yang berwibawa.',
  examples: [
    { jp: '彼女の業績は称賛に足るものだ。', id: 'Prestasinya memang layak mendapat pujian.' },
    { jp: 'この作品は繰り返し鑑賞に足る傑作だ。', id: 'Karya ini adalah mahakarya yang layak dinikmati berulang kali.' },
    { jp: '信頼に足る人物を選ぶことが重要だ。', id: 'Penting untuk memilih orang yang layak dipercaya.' }
  ],
  see_also_grammar: ['gn1-00062', 'gn1-00063'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00062'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00062', level: 'n1', pattern: '〜に足らない / 〜に足りない',
  reading: '〜ni taranai / 〜ni tarinai',
  meaning: 'tidak layak untuk ... / tidak perlu dirisaukan / tidak sebanding dengan ...',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + に足らない',
  desc: '<b>〜に足らない</b> adalah bentuk negatif dari 〜に足る — menyatakan bahwa sesuatu tidak memiliki nilai atau kualitas yang cukup, tidak pantas dipertimbangkan, atau tidak perlu dicemaskan.',
  nuance: 'Sering digunakan dengan nuansa meremehkan sesuatu — "hal sekecil itu tidak perlu dibesar-besarkan." Umum berpasangan dengan kata seperti 問題, 心配, 気にする, 取り上げる. Formal tapi juga bisa bernuansa merendahkan.',
  examples: [
    { jp: 'そんなことは気にするに足らない。', id: 'Hal seperti itu sama sekali tidak perlu dirisaukan.' },
    { jp: '彼の反論は取り上げるに足りない内容だった。', id: 'Sanggahan dia tidak berisi sesuatu yang layak dibahas.' }
  ],
  see_also_grammar: ['gn1-00061'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00061'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00063', level: 'n1', pattern: '〜にたえる',
  reading: '〜ni taeru',
  meaning: 'tahan menghadapi ... / mampu menanggung ... / layak untuk (ditonton/didengar)',
  cat: 'potential',
  connection: 'V-dictionary / N + にたえる',
  desc: '<b>〜にたえる</b> memiliki dua makna utama: (1) mampu bertahan terhadap sesuatu yang berat secara fisik atau mental; (2) sesuatu cukup bernilai untuk dinikmati atau layak untuk dilakukan.',
  nuance: 'Konteks menentukan makna. Makna (2) sering muncul dalam penilaian karya seni atau kemampuan seseorang: "bernilai untuk ditonton." Keduanya formal dan lebih umum dalam tulisan. Jangan digunakan untuk hal-hal sehari-hari yang sepele.',
  examples: [
    { jp: 'この小説は再読にたえる傑作だ。', id: 'Novel ini adalah mahakarya yang tahan dibaca berulang kali.' },
    { jp: '彼の演技はようやく鑑賞にたえるレベルになった。', id: 'Aktingnya akhirnya mencapai level yang layak untuk dinikmati.' },
    { jp: '長年の苦難にたえてきた人だ。', id: 'Dia adalah orang yang telah bertahan menanggung penderitaan bertahun-tahun.' }
  ],
  see_also_grammar: ['gn1-00064', 'gn1-00061'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00064'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00064', level: 'n1', pattern: '〜にたえない',
  reading: '〜ni taenai',
  meaning: 'tidak tahan ... / tidak sanggup menahan ... / terlalu (buruk/menyedihkan) untuk ditoleransi',
  cat: 'negative',
  connection: 'V-dictionary / N + にたえない',
  desc: '<b>〜にたえない</b> adalah bentuk negatif dari 〜にたえる — menyatakan bahwa seseorang tidak sanggup menahan perasaan yang muncul, atau bahwa sesuatu terlalu buruk atau menyedihkan untuk ditonton atau didengarkan.',
  nuance: 'Dua penggunaan utama: (1) ekspresi formal untuk perasaan yang tidak terbendung — 感謝にたえない, 遺憾にたえない (sering dalam surat resmi/pidato); (2) penilaian bahwa sesuatu terlalu jelek/menyedihkan untuk ditoleransi. Sangat formal.',
  examples: [
    { jp: '皆様のご支援に感謝にたえません。', id: 'Sungguh tidak kuasa menahan rasa syukur atas dukungan semua pihak.' },
    { jp: 'あの映像は目にたえない残酷さだった。', id: 'Tayangan itu sungguh terlalu kejam untuk ditonton.' }
  ],
  see_also_grammar: ['gn1-00063', 'gn1-00071'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00063', 'gn1-00071'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00065', level: 'n1', pattern: '〜をおいてほかにない',
  reading: '〜wo oite hoka ni nai',
  meaning: 'tidak ada yang lain selain ... / hanya ... lah yang bisa / tidak ada pilihan kecuali ...',
  cat: 'extent-degree',
  connection: 'N + をおいて(ほかに)ない / をおいてほかにいない',
  desc: '<b>〜をおいてほかにない</b> menyatakan eksklusivitas mutlak — hanya satu pilihan, satu orang, atau satu hal yang paling tepat atau mampu. Kata ほかに bersifat opsional tapi sering digunakan.',
  nuance: 'Sangat formal dan kuat. Digunakan untuk memuji seseorang sebagai satu-satunya yang mampu, atau menegaskan bahwa tidak ada alternatif lain. Tidak cocok untuk situasi biasa. Jika subjeknya orang, gunakan いない (bukan ない).',
  examples: [
    { jp: 'この仕事を任せられるのは彼女をおいてほかにいない。', id: 'Tidak ada selain dia yang bisa dipercaya untuk pekerjaan ini.' },
    { jp: 'この危機を乗り越える方法は対話をおいてほかにない。', id: 'Tidak ada cara lain untuk mengatasi krisis ini selain dialog.' }
  ],
  see_also_grammar: ['gn1-00066'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00066', level: 'n1', pattern: '〜をもってしても',
  reading: '〜wo motte shite mo',
  meaning: 'bahkan dengan ... pun / meskipun menggunakan ... sekalipun (tetap tidak bisa)',
  cat: 'contrast-concession',
  connection: 'N + をもってしても',
  desc: '<b>〜をもってしても</b> menyatakan bahwa bahkan dengan menggunakan kemampuan, kekuatan, atau sumber daya terbaik sekalipun, suatu hal tetap tidak bisa tercapai. Selalu diikuti klausa negatif.',
  nuance: 'Menekankan ketidakmampuan bahkan dalam kondisi yang paling ideal. Formal dan sering digunakan dalam konteks yang mengagumi kemampuan seseorang sambil mengakui ada batas yang tidak bisa ditembus. Berbeda dari でさえ yang lebih kasual.',
  examples: [
    { jp: '現代の科学をもってしても、解明できない謎がある。', id: 'Bahkan dengan ilmu pengetahuan modern sekalipun, ada misteri yang belum terpecahkan.' },
    { jp: '彼の卓越した技術をもってしても、その記録を破ることはできなかった。', id: 'Bahkan dengan keahliannya yang luar biasa sekalipun, catatan itu tidak bisa dipecahkan.' }
  ],
  see_also_grammar: ['gn1-00065'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00067', level: 'n1', pattern: '〜といったらない / 〜といったらありゃしない',
  reading: '〜to ittara nai / 〜to ittara arya shinai',
  meaning: 'sungguh sangat ... bukan main / ... -nya keterlaluan — ekspresi tingkat ekstrem',
  cat: 'extent-degree',
  connection: 'Adj-stem / N + といったらない; (kasual) といったらありゃしない',
  desc: '<b>〜といったらない</b> mengekspresikan tingkat yang ekstrem — bisa positif maupun negatif. Varian kasual 〜といったらありゃしない lebih emosional dan umumnya digunakan untuk mengeluh atau mengekspresikan hal negatif.',
  nuance: '〜といったらない bisa untuk hal positif (rasa haru, keindahan) maupun negatif; 〜といったらありゃしない hampir selalu untuk hal negatif atau keluhan. Keduanya mengekspresikan emosi yang sangat kuat dan sulit diungkapkan dengan kata-kata.',
  examples: [
    { jp: 'あの映画の感動といったらなかった。', id: 'Rasa haru dari film itu sungguh bukan main.' },
    { jp: '彼のマナーの悪さといったらありゃしない。', id: 'Sungguh keterlaluan kelakuannya yang tidak sopan itu.' },
    { jp: 'あの夏の暑さといったらなかった。', id: 'Panasnya musim panas itu sungguh luar biasa.' }
  ],
  see_also_grammar: ['gn1-00070', 'gn1-00071'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'Bentuk lampau (といったらなかった) sering digunakan saat mengenang pengalaman.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00068', level: 'n1', pattern: '〜ずにはすまない',
  reading: '〜zu ni wa sumanai',
  meaning: 'tidak bisa begitu saja tanpa melakukan ... / situasi sosial menuntut untuk ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ずにはすまない (suru → せずにはすまない)',
  desc: '<b>〜ずにはすまない</b> menyatakan bahwa seseorang tidak dapat menghindari suatu tindakan karena tekanan sosial, moral, atau situasional. Ada perasaan bahwa norma atau harapan orang lain mengharuskan tindakan tersebut.',
  nuance: 'Menekankan tekanan dari luar diri sendiri — norma sosial, harapan orang lain, atau konsekuensi moral. Berbeda dari ないわけにはいかない (alasan logis) dan ないではいられない (dorongan dari dalam). Formal-netral.',
  examples: [
    { jp: '迷惑をかけた以上、謝らずにはすまない。', id: 'Karena sudah merepotkan, tidak bisa begitu saja tanpa meminta maaf.' },
    { jp: 'こんな大きなミスをしたら、責任を取らずにはすまないだろう。', id: 'Kalau sudah membuat kesalahan sebesar ini, pasti tidak bisa lepas dari tanggung jawab.' }
  ],
  see_also_grammar: ['gn1-00069', 'gn1-00072'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00069', 'gn1-00072'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00069', level: 'n1', pattern: '〜ないではすまない',
  reading: '〜nai de wa sumanai',
  meaning: 'tidak bisa tidak melakukan ... / tidak bisa lepas dari keharusan ...',
  cat: 'obligation-necessity',
  connection: 'V-nai + ではすまない',
  desc: '<b>〜ないではすまない</b> memiliki makna yang sangat mirip dengan 〜ずにはすまない — menyatakan bahwa suatu tindakan tidak dapat dihindari karena tuntutan sosial atau moral.',
  nuance: 'Secara makna hampir identik dengan ずにはすまない. Perbedaan halus: ないではすまない sedikit lebih umum dalam percakapan modern dan lebih ringan terdengar; ずにはすまない terasa lebih formal/tertulis. Keduanya menekankan tekanan eksternal.',
  examples: [
    { jp: 'こんなことをされたら、怒らないではすまない。', id: 'Kalau diperlakukan seperti ini, tidak mungkin bisa tidak marah.' },
    { jp: '彼女に直接謝らないではすまない状況だ。', id: 'Ini situasi di mana tidak bisa tidak minta maaf langsung padanya.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00072'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00068'],
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
  nuance: 'Sangat formal dan hampir hanya ditemukan dalam tulisan atau pidato formal. Tidak bisa digunakan dengan kata kerja tindakan biasa. Mengekspresikan perasaan yang tulus, dalam, dan abadi — bukan perasaan sesaat.',
  examples: [
    { jp: '皆様のご健康とご多幸を願ってやみません。', id: 'Saya tidak henti-hentinya mendoakan kesehatan dan kebahagiaan semua pihak.' },
    { jp: '彼は子供たちの未来を愛してやまない。', id: 'Dia sungguh tidak henti-hentinya mencintai masa depan anak-anak itu.' }
  ],
  see_also_grammar: ['gn1-00071', 'gn1-00067'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00071'],
  register: 'formal', exceptions: null, notes: 'Hanya digunakan dengan kata kerja perasaan/keinginan. *動いてやまない (salah) — harus perasaan seperti 愛する、願う.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00071', level: 'n1', pattern: '〜を禁じ得ない',
  reading: '〜wo kinjienaI',
  meaning: 'tidak bisa menahan ... / tidak kuasa menahan (perasaan yang muncul spontan)',
  cat: 'sentence-final-modality',
  connection: 'N (kata benda perasaan) + を禁じ得ない',
  desc: '<b>〜を禁じ得ない</b> menyatakan bahwa seseorang tidak mampu menahan perasaan tertentu yang muncul secara spontan. Kata benda yang mendahului hampir selalu adalah perasaan: 感動, 涙, 怒り, 遺憾, 痛恨.',
  nuance: 'Sangat formal dan tertulis — lazim dalam pernyataan resmi, pidato, atau jurnalisme. Tidak digunakan dalam percakapan biasa. Berbeda dari にたえない — 禁じ得ない menekankan ketidakmampuan mengendalikan perasaan yang muncul, bukan evaluasi kualitas.',
  examples: [
    { jp: 'その報道を聞いて、怒りを禁じ得なかった。', id: 'Mendengar laporan itu, tidak bisa menahan amarah.' },
    { jp: '被災地の映像を見て、涙を禁じ得ない。', id: 'Melihat tayangan daerah bencana, tidak kuasa menahan air mata.' }
  ],
  see_also_grammar: ['gn1-00070', 'gn1-00064'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00064', 'gn1-00070'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00072', level: 'n1', pattern: '〜ないわけにはいかない',
  reading: '〜nai wake ni wa ikanai',
  meaning: 'tidak bisa tidak melakukan ... / ada alasan yang mengharuskan melakukan ...',
  cat: 'obligation-necessity',
  connection: 'V-nai + わけにはいかない',
  desc: '<b>〜ないわけにはいかない</b> menyatakan bahwa suatu tindakan tidak bisa dihindari karena ada alasan kuat — logis, moral, atau sosial — yang mengharuskannya. Seseorang merasa tidak mungkin melewatkan atau menolak tindakan tersebut.',
  nuance: 'Menekankan alasan yang jelas dan logis mengapa tindakan itu wajib dilakukan. Berbeda dari ずにはすまない (tekanan norma sosial dari luar) dan ないではいられない (dorongan emosional dari dalam). Ini lebih rasional dan umum penggunaannya.',
  examples: [
    { jp: '彼には本当のことを話さないわけにはいかない。', id: 'Tidak bisa tidak memberitahu dia yang sebenarnya.' },
    { jp: '招待されたのだから、行かないわけにはいかない。', id: 'Karena sudah diundang, tidak bisa tidak pergi.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00069', 'gn1-00073'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00068', 'gn1-00073'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00073', level: 'n1', pattern: '〜ないではいられない',
  reading: '〜nai de wa irarenai',
  meaning: 'tidak bisa menahan diri untuk tidak ... / terdorong untuk ... (dari dalam diri)',
  cat: 'desire-want',
  connection: 'V-nai + ではいられない',
  desc: '<b>〜ないではいられない</b> menyatakan dorongan kuat dari dalam diri — seseorang tidak bisa menahan impuls atau perasaan untuk tidak melakukan sesuatu. Sumber tekanannya adalah emosi atau dorongan internal.',
  nuance: 'Kunci perbedaannya: dorongan dari DALAM (perasaan, emosi, impuls) — bukan norma sosial atau alasan logis. Bisa digunakan untuk situasi positif maupun negatif. Relatif lebih umum digunakan dalam percakapan dibanding pola sinonim lainnya.',
  examples: [
    { jp: 'あの映画を見ると、笑わないではいられない。', id: 'Kalau melihat film itu, tidak bisa tidak tertawa.' },
    { jp: '不公平なことを見ると、文句を言わないではいられない。', id: 'Kalau melihat ketidakadilan, tidak bisa menahan diri untuk tidak protes.' }
  ],
  see_also_grammar: ['gn1-00072', 'gn1-00068'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00072'],
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
  nuance: 'Jauh lebih formal dari がてら — hampir hanya ditemukan dalam surat resmi atau kunjungan formal. Terbatas pada nominal tindakan yang bermakna interaksi sosial (挨拶, お礼, 近況報告). Memberikan kesan sangat sopan dan berwibawa.',
  examples: [
    { jp: 'ご挨拶かたがた、お伺いしました。', id: 'Sambil menyampaikan salam, saya datang berkunjung.' },
    { jp: 'お礼かたがた、近況をご報告申し上げます。', id: 'Sambil menyampaikan terima kasih, perkenankan saya melaporkan kabar terkini.' }
  ],
  see_also_grammar: ['gn1-00075'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00075'],
  register: 'written', exceptions: null, notes: 'Hampir hanya digunakan dalam surat formal atau ucapan resmi. Tidak cocok untuk percakapan biasa.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00075', level: 'n1', pattern: '〜がてら',
  reading: '〜gatera',
  meaning: 'sambil / sekalian memanfaatkan kesempatan untuk ...',
  cat: 'sequential-temporal',
  connection: 'V-masu-stem / N (verbal noun) + がてら',
  desc: '<b>〜がてら</b> menyatakan bahwa sambil melakukan suatu kegiatan utama, sekalian memanfaatkan kesempatan untuk melakukan hal lain. Tindakan sebelum がてら adalah kegiatan yang dijadikan alasan atau sarana.',
  nuance: 'Lebih kasual dari かたがた tapi tetap mengandung nuansa formal-netral. Bisa digunakan dalam percakapan maupun tulisan. Ciri khas: kedua kegiatan terjadi bersamaan atau dalam satu perjalanan. Kegiatan setelah がてら adalah tujuan sebenarnya.',
  examples: [
    { jp: '散歩がてら、コンビニに寄ってきた。', id: 'Sambil jalan-jalan, mampir ke konbini.' },
    { jp: '買い物がてら、久しぶりに友人の家を訪ねた。', id: 'Sambil belanja, mampir ke rumah teman yang sudah lama tidak dikunjungi.' }
  ],
  see_also_grammar: ['gn1-00074'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00074'],
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
  nuance: 'Berbeda dari なら yang netral — とあれば mengandung tekad dan keseriusan yang lebih kuat. Formal. Sering diikuti ekspresi kesiapan seperti どこへでも行く, 何でもする, 一肌脱ぐ. Mengimplikasikan kondisi yang dianggap penting atau mulia.',
  examples: [
    { jp: 'あなたのためとあれば、どこへでも参ります。', id: 'Demi kamu, saya siap pergi ke mana saja.' },
    { jp: '必要とあれば、夜を徹して作業します。', id: 'Kalau memang diperlukan, saya siap bekerja semalam suntuk.' }
  ],
  see_also_grammar: ['gn1-00077', 'gn1-00078'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00077', level: 'n1', pattern: '〜ともなると',
  reading: '〜to mo naru to',
  meaning: 'kalau sudah mencapai level ... / begitu sudah menjadi ... (konsekuensi yang wajar mengikuti)',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなると',
  desc: '<b>〜ともなると</b> menyatakan bahwa begitu seseorang atau sesuatu mencapai tingkat atau status tertentu, konsekuensi tertentu secara alami dan tak terelakkan mengikutinya. Menekankan kelogisan konsekuensi pada level tersebut.',
  nuance: 'Formal. Menekankan bahwa pada level atau status itu, suatu hal adalah konsekuensi yang wajar dan lumrah. Sering digunakan untuk mengacu pada jabatan tinggi, skala besar, atau kondisi khusus. Mirip ともなれば tapi lebih deskriptif tentang kondisi nyata.',
  examples: [
    { jp: '部長ともなると、背負う責任も格段に大きくなる。', id: 'Kalau sudah jadi manajer, tanggung jawab yang dipikul pun jauh lebih besar.' },
    { jp: 'この規模のプロジェクトともなると、管理だけで一苦労だ。', id: 'Kalau sudah proyek sebesar ini, pengelolaannya saja sudah susah payah.' }
  ],
  see_also_grammar: ['gn1-00078', 'gn1-00076'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00078'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00078', level: 'n1', pattern: '〜ともなれば',
  reading: '〜to mo nareba',
  meaning: 'kalau sudah sampai pada level ... / begitu sudah menjadi ... (varian hipotetis dari ともなると)',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなれば',
  desc: '<b>〜ともなれば</b> adalah varian dari 〜ともなると dengan makna yang sangat mirip — menyatakan bahwa di status atau kondisi tertentu, suatu konsekuensi adalah hal yang wajar. Menggunakan ば-form sehingga terasa sedikit lebih hipotetis.',
  nuance: 'Secara fungsional hampir identik dengan ともなると. Perbedaan halus: ともなれば terasa lebih hipotetis atau umum ("siapapun yang berada di posisi itu..."); ともなると lebih deskriptif tentang kondisi yang sudah terjadi. Keduanya formal.',
  examples: [
    { jp: '社長ともなれば、孤独な決断を迫られることも多い。', id: 'Kalau sudah menjadi direktur, banyak pula keputusan sulit yang harus diambil sendiri.' },
    { jp: '有名人ともなれば、プライバシーの確保が難しくなる。', id: 'Kalau sudah jadi orang terkenal, menjaga privasi pun menjadi sulit.' }
  ],
  see_also_grammar: ['gn1-00077', 'gn1-00076'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00077'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00079', level: 'n1', pattern: '〜んがために / 〜んがための',
  reading: '〜n ga tame ni / 〜n ga tame no',
  meaning: 'untuk / demi / dengan tujuan — (ekspresi tujuan literary/formal kuno yang sangat kuat)',
  cat: 'purpose',
  connection: 'V-nai-stem + んがために / んがための (suru → せんがために)',
  desc: '<b>〜んがために</b> adalah ekspresi tujuan yang sangat formal dan bernuansa sastra klasik. Menyatakan bahwa seseorang melakukan sesuatu dengan tekad kuat demi mencapai tujuan tertentu. Varian 〜んがための digunakan sebagai modifier nomina.',
  nuance: 'Hampir hanya ditemukan dalam tulisan sastra, pidato formal kenegaraan, atau dokumen sejarah. Jauh lebih kuat dan arkaik dari ために biasa. Memberikan kesan tekad yang sangat besar, serius, dan heroik. Tidak untuk percakapan sehari-hari.',
  examples: [
    { jp: '勝たんがために、選手たちは限界を超えて練習した。', id: 'Demi meraih kemenangan, para atlet berlatih melampaui batas kemampuan.' },
    { jp: '国を守らんがための犠牲であった。', id: 'Itu adalah pengorbanan demi melindungi negara.' }
  ],
  see_also_grammar: ['gn1-00074', 'gn1-00075'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: 'Konjugasi: 書く→書かんがために、する→せんがために、来る→来んがために. Pola ini adalah bentuk volitional kuno (未然形＋ん).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00080', level: 'n1', pattern: '〜ことなしに',
  reading: '〜koto nashi ni',
  meaning: 'tanpa melakukan ... / tanpa ... (prasyarat yang tidak dipenuhi)',
  cat: 'negative',
  connection: 'V-dictionary + ことなしに',
  desc: '<b>〜ことなしに</b> menyatakan bahwa suatu hal terjadi atau diupayakan tanpa melakukan tindakan tertentu. Sering digunakan untuk menyatakan bahwa sesuatu tidak mungkin terjadi tanpa prasyarat yang disebutkan.',
  nuance: 'Lebih formal dari ないで atau ずに. Sering muncul dalam konteks akademik, tulisan ilmiah, atau pernyataan formal. Memberikan kesan bahwa ketiadaan tindakan yang disebut merupakan hambatan nyata atau bertentangan dengan logika.',
  examples: [
    { jp: '努力することなしに、成功はありえない。', id: 'Tanpa berusaha, kesuksesan adalah hal yang mustahil.' },
    { jp: '互いに話し合うことなしに、問題は解決しない。', id: 'Tanpa saling berdiskusi, masalah tidak akan bisa diselesaikan.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00069'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00081', level: 'n1', pattern: '〜ずにはおかない',
  reading: '〜zu ni wa okanai',
  meaning: 'pasti akan ..., tidak bisa tidak menyebabkan ...; tekad kuat untuk tidak membiarkan sesuatu berlalu begitu saja',
  cat: 'sentence-final-modality',
  connection: 'V-nai-stem + ずにはおかない（する→せずにはおかない）',
  desc: '<b>〜ずにはおかない</b> menyatakan dua makna utama: (1) sesuatu pasti/niscaya menimbulkan efek tertentu pada orang lain atau keadaan — efek yang tak terhindarkan; (2) tekad kuat pembicara bahwa ia tidak akan membiarkan sesuatu terjadi tanpa tindakan. Kata kerja sebelum pola ini hampir selalu bersifat kausal.',
  nuance: 'Berbeda dari 〜ずにはいられない (tidak tahan untuk tidak melakukan sesuatu — fokus pada dorongan diri sendiri yang tak terkendali), 〜ずにはおかない menekankan efek yang ditimbulkan pada pihak lain atau hasil yang tak terelakkan. Makna (1): この映画は人を感動させ<b>ずにはおかない</b> = film ini pasti membuat orang tersentuh. Makna (2): 謝らせずにはおかない = aku pasti akan membuatnya minta maaf.',
  examples: [
    { jp: '彼女の演技は、観客を感動させ<b>ずにはおかない</b>ほど素晴らしかった。', id: 'Aktingnya begitu luar biasa sehingga pasti membuat para penonton tersentuh tanpa terkecuali.' },
    { jp: 'あんな不正を見たら、指摘せ<b>ずにはおかない</b>。', id: 'Kalau melihat kecurangan seperti itu, aku pasti tidak akan membiarkannya tanpa menegur.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'する動詞 → せずにはおかない（例：批判する→批判せずにはおかない）。〜ずにはいられない との違いに注意。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00082', level: 'n1', pattern: '〜をおいて（ほかに〜ない）',
  reading: '〜o oite (hoka ni 〜nai)',
  meaning: 'selain ..., tidak ada yang lain; kecuali ..., tidak ada pilihan',
  cat: 'negative',
  connection: 'N + をおいて（ほかに/他に）〜ない',
  desc: '<b>〜をおいて</b> digunakan untuk menyatakan bahwa tidak ada pilihan, orang, atau hal lain selain yang disebutkan. Selalu diikuti bentuk negatif. Menegaskan bahwa sesuatu/seseorang adalah satu-satunya yang paling tepat atau memungkinkan.',
  nuance: 'Berbeda dari 〜以外に（〜ない）yang lebih netral (tidak ada selain X), 〜をおいて memiliki nuansa lebih kuat dan emosional — menekankan keunikan atau ketidakhadiran alternatif secara absolut. Hampir selalu digunakan untuk memuji seseorang atau menegaskan satu-satunya pilihan yang ada dalam situasi penting.',
  examples: [
    { jp: 'この難局を乗り越えられるのは、山田さん<b>をおいて</b>ほかにいない。', id: 'Tidak ada orang lain selain Yamada-san yang bisa melewati situasi sulit ini.' },
    { jp: '今<b>をおいて</b>、行動するタイミングはない。', id: 'Tidak ada waktu yang lebih tepat untuk bertindak selain sekarang.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00083', level: 'n1', pattern: '〜が最後 / 〜たが最後',
  reading: '〜ga saigo / 〜ta ga saigo',
  meaning: 'begitu ..., sudah tidak bisa balik lagi; sekali ..., akibat buruk pasti menyusul',
  cat: 'conditional-tara',
  connection: 'V-ta + が最後',
  desc: '<b>〜たが最後</b> menyatakan bahwa begitu suatu tindakan dilakukan, akibat negatif atau tak terelakkan pasti akan terjadi dan tidak ada jalan kembali. Digunakan untuk situasi di mana satu langkah merupakan titik of no return.',
  nuance: 'Selalu diikuti ekspresi negatif atau situasi yang tidak diinginkan pembicara. Mirip dengan 〜たら最後 (hampir identik, sedikit lebih formal), dan 〜てしまう (sudah terlanjur). Perbedaannya: 〜たが最後 lebih dramatis dan menekankan konsekuensi yang sudah pasti terjadi dan tidak bisa dibatalkan.',
  examples: [
    { jp: '彼に秘密を話し<b>たが最後</b>、翌日には皆に知られてしまう。', id: 'Sekali kamu cerita rahasia ke dia, keesokan harinya semua orang pasti sudah tahu.' },
    { jp: 'あのゲームを始め<b>たが最後</b>、止められなくなる。', id: 'Begitu kamu mulai main game itu, kamu tidak akan bisa berhenti lagi.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'neutral', exceptions: null, notes: 'Varian: 〜が最後（辞書形＋が最後）も可だが、〜たが最後（タ形）のほうが一般的。後件は必ず否定的・不可逆な内容。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00084', level: 'n1', pattern: '〜んばかりに / 〜んばかりの',
  reading: '〜n bakari ni / 〜n bakari no',
  meaning: 'hampir seperti ..., seolah-olah ..., sampai nyaris ...',
  cat: 'extent-degree',
  connection: 'V-nai-stem + んばかりに（修飾用: んばかりの + N）（する→せんばかりに）',
  desc: '<b>〜んばかりに</b> menyatakan bahwa sesuatu hampir terjadi atau terkesan sangat kuat seolah-olah akan terjadi, meski pada kenyataannya tidak terjadi. Digunakan untuk ekspresi yang hidup dan berlebihan — cocok untuk menggambarkan reaksi, ekspresi wajah, atau suasana yang sangat intens.',
  nuance: 'Berbeda dari 〜かのように (seolah-olah, lebih netral dan umum), 〜んばかりに mengandung intensitas yang lebih tinggi — menekankan bahwa sesuatu nyaris mencapai titik tertentu. Hanya digunakan dengan V-nai-stem (bukan benda atau adjektiva secara langsung). Bernuansa sastra dan lebih formal dari かのように.',
  examples: [
    { jp: '彼女は今にも泣き出さ<b>んばかりに</b>、目を潤ませていた。', id: 'Matanya berlinang seolah-olah sebentar lagi akan menangis.' },
    { jp: '子どもたちは飛び上がら<b>んばかりに</b>喜んで、プレゼントを受け取った。', id: 'Anak-anak menerima hadiah dengan gembira seolah-olah hampir melompat kegirangan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: 'する→せんばかりに、来る→来んばかりに。否定の意味ではなく「今にも〜しそうな」の意。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00085', level: 'n1', pattern: '〜ないまでも',
  reading: '〜nai made mo',
  meaning: 'meskipun tidak sampai ..., setidaknya ...; kalaupun tidak bisa mencapai standar tertinggi, minimal ...',
  cat: 'contrast-concession',
  connection: 'V-nai + までも（〜くらい/〜ぐらい/〜は〜てほしい）',
  desc: '<b>〜ないまでも</b> digunakan ketika pembicara mengakui bahwa standar atau tindakan ideal tidak dapat dicapai, lalu menyebutkan alternatif yang lebih rendah namun masih diharapkan. Struktur: "meskipun tidak bisa X, setidaknya Y."',
  nuance: 'Berbeda dari 〜なくても (bahkan jika tidak — lebih umum dan netral), 〜ないまでも selalu memunculkan kontras dua level: ideal (yang tidak tercapai) dan minimum (yang masih diharapkan). Lebih formal dan lebih tegas dari 〜なくても. Umum dalam tulisan dan situasi formal.',
  examples: [
    { jp: '毎日でき<b>ないまでも</b>、週に二、三回は運動するようにしている。', id: 'Meskipun tidak bisa setiap hari, aku berusaha berolahraga dua atau tiga kali seminggu.' },
    { jp: '完璧にはでき<b>ないまでも</b>、誠実に取り組む姿勢が大切だ。', id: 'Meskipun tidak bisa sempurna, sikap yang serius dan tulus dalam mengerjakannya tetaplah penting.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00086', level: 'n1', pattern: '〜だに',
  reading: '〜da ni',
  meaning: 'sekadar ... saja sudah ...; hanya dengan ... pun sudah (terasa, tidak bisa, dst)',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + だに（〜ない / 感情表現）',
  desc: '<b>〜だに</b> adalah partikel arkaik/sastra yang menyatakan bahwa sekadar melakukan tindakan yang paling minimal pun sudah cukup memunculkan perasaan atau situasi tertentu. Umumnya muncul dalam frasa beku seperti 想像だにできない、考えるだに恐ろしい、夢にだに思わなかった.',
  nuance: 'Berbeda dari 〜さえ (bahkan, lebih umum dan dapat digunakan secara luas), 〜だに adalah bentuk yang sangat kuno dan hampir eksklusif sastra — tidak digunakan dalam percakapan modern. Kemunculannya pun terbatas pada kosakata tertentu. 〜さえ dapat menggantikan 〜だに di hampir semua konteks, tetapi tidak sebaliknya.',
  examples: [
    { jp: 'そんな失敗は、想像<b>だに</b>できなかった。', id: 'Kegagalan seperti itu bahkan tidak pernah terbayangkan sedikit pun.' },
    { jp: '戦場の惨状は、考える<b>だに</b>身の毛がよだつ。', id: 'Situasi mengerikan di medan perang itu, sekadar dibayangkan pun sudah membuat bulu kuduk berdiri.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00087'],
  register: 'literary', exceptions: null, notes: '現代語では「さえ」で代替可。固定表現で登場することが多い：想像だにできない、夢にだに思わない、考えるだに〜。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00087', level: 'n1', pattern: '〜すら（〜ない）',
  reading: '〜sura (〜nai)',
  meaning: 'bahkan ... pun (tidak); sekalipun ..., menunjukkan kasus ekstrem',
  cat: 'extent-degree',
  connection: 'N（+ 助詞省略）+ すら / N + にすら / V-stem + すら',
  desc: '<b>〜すら</b> menandai kasus yang paling ekstrem dalam suatu skala — menyiratkan bahwa jika hal yang paling dasar atau paling mudah ini pun (tidak) berlaku, maka hal yang lebih sulit tentu juga demikian. Sering diikuti bentuk negatif tetapi dapat juga positif.',
  nuance: 'Hampir sinonim dengan 〜さえ (lebih umum, bisa conversational), tetapi 〜すら lebih bernuansa sastra dan tertulis, serta lebih kuat dalam menekankan ekstremitas. 〜でさえ menggunakan partikel で sebelum さえ untuk nomina (バカでさえ = bahkan orang bodoh pun), sedangkan すら langsung menempel: バカすら。',
  examples: [
    { jp: '疲れ果てて、立つこと<b>すら</b>できなかった。', id: 'Terlalu lelah hingga bahkan berdiri pun sudah tidak bisa.' },
    { jp: '忙しすぎて、昼食をとる時間<b>すら</b>なかった。', id: 'Terlalu sibuk sampai bahkan tidak ada waktu untuk makan siang sekalipun.' },
  ],
  see_also_grammar: ['gn1-00088'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00088', 'gn1-00086'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00088', level: 'n1', pattern: '〜でさえ',
  reading: '〜de sae',
  meaning: 'bahkan ... pun; menandai kasus ekstrem yang mengejutkan atau ironis',
  cat: 'extent-degree',
  connection: 'N + でさえ / N + さえ / V-te + さえ',
  desc: '<b>〜でさえ</b> menandai suatu entitas atau situasi sebagai kasus ekstrem — baik yang paling rendah maupun paling tinggi dalam skala — untuk mempertegas bahwa sesuatu berlaku bahkan pada kasus yang paling tidak terduga. Digunakan dalam pernyataan mengejutkan atau ironisasi.',
  nuance: '〜でさえ adalah bentuk N + で + さえ yang paling umum dan sedikit lebih percakapan dibanding 〜すら. Perbedaan halus: 〜でさえ sering memiliki nuansa ironis atau mengejutkan ("bahkan si A yang biasanya X pun..."), sementara 〜すら lebih ekspresif dan lebih sastra. Keduanya sering dapat saling menggantikan.',
  examples: [
    { jp: '専門家<b>でさえ</b>答えられない難問だ。', id: 'Ini adalah pertanyaan sulit yang bahkan para ahli pun tidak bisa menjawabnya.' },
    { jp: '子ども<b>でさえ</b>知っている常識を、大人が知らないとは驚きだ。', id: 'Sungguh mengherankan bahwa seorang dewasa tidak tahu pengetahuan umum yang bahkan anak kecil pun tahu.' },
  ],
  see_also_grammar: ['gn1-00087'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00087'],
  register: 'neutral', exceptions: null, notes: 'さえ単体でも使用可（N + さえ）。でさえはNに「で」格が自然な場合に使う（学生でさえ、プロでさえ）。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00089', level: 'n1', pattern: '〜ながらに（して）',
  reading: '〜nagara ni (shite)',
  meaning: 'sejak ..., dalam keadaan ... yang alami atau bawaan; (sambil) tetap dalam kondisi ...',
  cat: 'sequential-temporal',
  connection: 'N / V-stem + ながらに（して）',
  desc: '<b>〜ながらに</b> menyatakan keadaan yang melekat secara alami atau bawaan sejak awal — bukan sesuatu yang diperoleh kemudian. Berbeda dari 〜ながら biasa (sambil melakukan dua tindakan bersamaan), 〜ながらに digunakan dalam ekspresi yang terleksikalisasi dan terbatas.',
  nuance: 'Jangan dikacaukan dengan 〜ながら (sambil A melakukan B — dua tindakan paralel). 〜ながらに muncul dalam kosakata terbatas: 生まれながらに(して) = sejak lahir, secara alami; 涙ながらに = sambil berurai air mata; 昔ながらに = seperti cara zaman dulu. Bernuansa sastra dan agak formal.',
  examples: [
    { jp: '彼女は生まれ<b>ながらにして</b>、音楽の才能に恵まれていた。', id: 'Dia dianugerahi bakat musik sejak lahir secara alami.' },
    { jp: '母は涙<b>ながらに</b>、息子の旅立ちを見送った。', id: 'Ibu melepas kepergian putranya sambil berurai air mata.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: '用いられる語はほぼ固定：生まれながら・涙ながら・昔ながら など。ながら（同時動作）との混同注意。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00090', level: 'n1', pattern: '〜とあっては',
  reading: '〜to atte wa',
  meaning: 'karena situasinya memang ..., mengingat kenyataan bahwa ...; dalam kondisi seperti itu, sudah wajar jika ...',
  cat: 'reason-cause',
  connection: 'N / plain clause + とあっては',
  desc: '<b>〜とあっては</b> menyatakan bahwa karena situasi atau kenyataan tertentu yang disebutkan (yang biasanya tidak biasa atau signifikan), suatu reaksi atau tindakan tertentu menjadi wajar, tak terhindarkan, atau terpaksa dilakukan.',
  nuance: 'Berbeda dari 〜からには (karena sudah demikian, maka sudah seharusnya — menekankan kewajiban/konsekuensi dari pilihan seseorang), 〜とあっては menekankan situasi eksternal yang tidak biasa sebagai alasan. Nuansanya: "mengingat situasinya seperti ini, tentu saja..." — ada perasaan tidak bisa dihindari karena kondisi tersebut.',
  examples: [
    { jp: '社長直々のお願い<b>とあっては</b>、断るわけにはいかない。', id: 'Karena ini adalah permintaan langsung dari direktur utama, tidak mungkin aku menolaknya.' },
    { jp: '子どもが熱を出した<b>とあっては</b>、仕事を早退するしかない。', id: 'Mengingat anak sudah demam, tidak ada pilihan selain pulang kerja lebih awal.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00091', level: 'n1', pattern: '〜ことなしに',
  reading: '〜koto nashi ni',
  meaning: 'tanpa melakukan ...; tanpa ... (sebagai prasyarat yang mutlak diperlukan)',
  cat: 'negative',
  connection: 'V-dictionary + ことなしに',
  desc: '<b>〜ことなしに</b> menyatakan bahwa suatu hal dilakukan atau dicapai tanpa tindakan tertentu yang seharusnya dilakukan — atau sebaliknya, tanpa tindakan itu sesuatu tidak mungkin terjadi. Sering muncul dalam konteks akademik dan formal sebagai penegas logika kausal.',
  nuance: 'Lebih formal dari 〜ないで / 〜ずに. Berbeda dari 〜ことなく (tanpa sama sekali, menekankan tidak adanya tindakan itu secara penuh), 〜ことなしに lebih menekankan tindakan tersebut sebagai prasyarat yang krusial — "tanpa melakukan X, Y tidak mungkin." Nuansa kausal lebih kuat.',
  examples: [
    { jp: '土台を固める<b>ことなしに</b>、建物は長くもたない。', id: 'Tanpa memperkuat pondasi, bangunan tidak akan bertahan lama.' },
    { jp: '相手の立場を理解する<b>ことなしに</b>、真の対話は生まれない。', id: 'Tanpa memahami posisi pihak lain, dialog yang sesungguhnya tidak akan pernah terwujud.' },
  ],
  see_also_grammar: ['gn1-00104'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00104'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00092', level: 'n1', pattern: '〜にあって',
  reading: '〜ni atte',
  meaning: 'dalam situasi/konteks ..., berada di tengah-tengah ...',
  cat: 'expression',
  connection: 'N + にあって（も）',
  desc: '<b>〜にあって</b> digunakan untuk menyebutkan situasi, era, atau konteks tertentu sebagai latar yang mempengaruhi tindakan atau keadaan yang dijelaskan. Memberikan nuansa bahwa situasi tersebut adalah latar yang khas dan bermakna.',
  nuance: 'Berbeda dari 〜において (menyatakan lokasi atau bidang — lebih statis dan formal), 〜にあって menekankan bahwa seseorang atau sesuatu berada secara aktif di dalam situasi tersebut dan situasi itu mempengaruhi perilaku/keadaan. 〜にあっても = bahkan dalam situasi sekalipun (lebih konsesif).',
  examples: [
    { jp: '激しい競争<b>にあって</b>も、彼は誠実さを失わなかった。', id: 'Bahkan di tengah persaingan yang sengit sekalipun, dia tidak kehilangan kejujurannya.' },
    { jp: 'グローバル化が進む現代<b>にあって</b>、文化的アイデンティティの保持は重要な課題だ。', id: 'Di tengah era globalisasi yang terus berkembang ini, menjaga identitas budaya merupakan tantangan penting.' },
  ],
  see_also_grammar: ['gn1-00093'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00093'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00093', level: 'n1', pattern: '〜において / 〜における',
  reading: '〜ni oite / 〜ni okeru',
  meaning: 'di ..., dalam bidang/konteks/waktu ... (penanda lokasi, bidang, atau situasi formal)',
  cat: 'particle',
  connection: 'N + において / においては / においても / における + N',
  desc: '<b>〜において</b> adalah partikel formal yang menandai lokasi, konteks, bidang, atau waktu di mana suatu peristiwa atau kondisi berlaku. Setara dengan で atau に dalam situasi formal. 〜における digunakan sebagai modifier nomina (adjektivalisasi).',
  nuance: 'Berbeda dari で (kasual, menandai lokasi aksi) dan に (lokasi keberadaan), 〜において hanya digunakan dalam tulisan formal, laporan, hukum, dan presentasi. Jangan digunakan dalam percakapan sehari-hari — terdengar sangat kaku. 〜にあって lebih aktif dan situasional; 〜において lebih statis sebagai penanda konteks.',
  examples: [
    { jp: '現代社会<b>において</b>、デジタルリテラシーは不可欠なスキルとなっている。', id: 'Dalam masyarakat modern, literasi digital telah menjadi keterampilan yang mutlak diperlukan.' },
    { jp: 'この分野<b>における</b>彼の貢献は計り知れない。', id: 'Kontribusinya dalam bidang ini tidak ternilai besarnya.' },
  ],
  see_also_grammar: ['gn1-00092', 'gn1-00094'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00092'],
  register: 'formal', exceptions: null, notes: '日常会話では「で」「に」で代替。〜においては（強調）、〜においても（even in〜）、〜における + N（形容詞的用法）。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00094', level: 'n1', pattern: '〜に際し（て） / 〜に際しての',
  reading: '〜ni saishi (te) / 〜ni saishi te no',
  meaning: 'pada saat ..., dalam rangka ..., pada kesempatan ... (digunakan untuk peristiwa penting, formal)',
  cat: 'sequential-temporal',
  connection: 'V-dictionary / N + に際し（て）/ に際しての + N',
  desc: '<b>〜に際して</b> menandai momen penting sebagai waktu atau kesempatan tertentu di mana tindakan perlu dilakukan atau perlu diperhatikan. Setara dengan 〜の際に dalam nuansa, tetapi lebih formal dan sering muncul dalam dokumen resmi, pengumuman, dan upacara.',
  nuance: 'Berbeda dari 〜にあたって (juga "pada saat penting," tetapi sedikit lebih umum dan dapat digunakan semi-formal), 〜に際して lebih kaku dan sering muncul dalam konteks sangat resmi: dokumen hukum, panduan prosedur, ucapan seremonial. 〜に際しての + N = hal-hal yang perlu diperhatikan saat X.',
  examples: [
    { jp: '入社<b>に際して</b>、必要書類を事前にご準備ください。', id: 'Dalam rangka mulai bekerja, mohon siapkan dokumen yang diperlukan terlebih dahulu.' },
    { jp: '式典<b>に際しての</b>注意事項を事前にご確認ください。', id: 'Mohon periksa hal-hal yang perlu diperhatikan pada upacara tersebut sebelumnya.' },
  ],
  see_also_grammar: ['gn1-00093'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: '〜にあたって との違い：に際して はより書き言葉的・儀礼的。〜に際しての + N は書類・案内でよく見る形。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00095', level: 'n1', pattern: '〜をもって',
  reading: '〜o motte',
  meaning: '(1) dengan ..., menggunakan ... sebagai cara/alat (手段); (2) terhitung sejak ..., pada saat ... (時点・期限)',
  cat: 'expression',
  connection: 'N + をもって',
  desc: '<b>〜をもって</b> memiliki dua makna utama: (1) menyatakan cara atau alat/metode yang digunakan — setara dengan 〜によって dalam konteks formal; (2) menyatakan batas waktu atau titik tertentu ketika sesuatu berakhir atau dimulai secara resmi. Keduanya sangat formal.',
  nuance: 'Makna (1) 〜をもって (dengan/melalui): 実力をもって示す = membuktikan dengan kemampuan nyata — lebih formal dari で。Makna (2) 〜をもって (terhitung sejak): 本日をもって閉店 = resmi tutup terhitung hari ini — digunakan dalam pengumuman resmi. Jangan dikacaukan dengan 〜をもとに (berdasarkan).',
  examples: [
    { jp: '誠意<b>をもって</b>対応することが、信頼関係の基本だ。', id: 'Merespons dengan ketulusan adalah dasar dari hubungan kepercayaan.' },
    { jp: '本日<b>をもって</b>、当サービスは終了いたします。', id: 'Terhitung mulai hari ini, layanan kami resmi berakhir.' },
  ],
  see_also_grammar: ['gn1-00098'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00098'],
  register: 'formal', exceptions: null, notes: '〜をもとに（基づく意味）との混同注意。〜をもって は「手段」か「時点・終了」。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00096', level: 'n1', pattern: '〜に至っては',
  reading: '〜ni itte wa',
  meaning: 'bahkan sampai ..., yang lebih mengejutkan/ekstrem lagi adalah ...',
  cat: 'extent-degree',
  connection: 'N + に至っては',
  desc: '<b>〜に至っては</b> digunakan untuk menyebutkan kasus paling ekstrem dalam suatu kelompok — biasanya untuk mempertegas betapa buruk atau tidak terduganya kasus tersebut dibanding yang lain. Selalu muncul setelah menyebutkan situasi umum yang sudah bermasalah, lalu menyebut kasus yang jauh lebih parah.',
  nuance: 'Berbeda dari 〜に至るまで (yang mencakup rentang dari awal hingga ujung ekstrem — lebih netral), 〜に至っては menyoroti satu kasus yang mengejutkan atau sangat ekstrem. Selalu bernuansa negatif atau terkejut. Mirip fungsinya dengan 〜はおろか...さえ (apalagi/jangankan), tetapi lebih fokus pada satu kasus yang dipilih.',
  examples: [
    { jp: '多くの社員が遅刻しているが、部長<b>に至っては</b>無断欠勤だ。', id: 'Banyak karyawan yang terlambat, bahkan yang lebih parah lagi atasannya tidak masuk tanpa keterangan.' },
    { jp: '他の教科は及第点だったが、数学<b>に至っては</b>零点だった。', id: 'Mata pelajaran lain sudah cukup, tetapi matematika bahkan mendapat nilai nol.' },
  ],
  see_also_grammar: ['gn1-00097'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00097'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00097', level: 'n1', pattern: '〜に至るまで',
  reading: '〜ni itaru made',
  meaning: 'sampai pada ..., bahkan hingga ..., mencakup rentang dari ... hingga ...',
  cat: 'extent-degree',
  connection: 'N + に至るまで / 〜から〜に至るまで',
  desc: '<b>〜に至るまで</b> menyatakan rentang yang sangat luas atau mendalam — dari yang paling umum hingga yang paling rinci atau ekstrem. Sering digunakan berpasangan dengan から (〜から〜に至るまで) untuk menggambarkan cakupan yang menyeluruh.',
  nuance: 'Berbeda dari 〜に至っては (menyoroti satu kasus mengejutkan yang ekstrem), 〜に至るまで menggambarkan rentang cakupan yang menyeluruh dan komprehensif — dari titik A sampai titik B yang jauh. Lebih netral dan deskriptif. 〜まで saja lebih kasual; に至るまで menambah nuansa formal dan cakupan yang luas.',
  examples: [
    { jp: '日常の小さな习慣から重大な意思決定<b>に至るまで</b>、彼は常に慎重だ。', id: 'Mulai dari kebiasaan kecil sehari-hari hingga keputusan besar, dia selalu berhati-hati.' },
    { jp: '衣食住から趣味娯楽<b>に至るまで</b>、生活のあらゆる面に影響が及んだ。', id: 'Dampaknya menyentuh segala aspek kehidupan, dari sandang-pangan-papan hingga hobi dan hiburan.' },
  ],
  see_also_grammar: ['gn1-00096'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00096'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00098', level: 'n1', pattern: '〜をもとに（して）',
  reading: '〜o moto ni (shite)',
  meaning: 'berdasarkan ..., dengan mengambil ... sebagai sumber atau acuan',
  cat: 'reason-cause',
  connection: 'N + をもとに（して）/ をもとにした + N',
  desc: '<b>〜をもとに</b> menyatakan bahwa sesuatu dibuat, dikerjakan, atau dikembangkan dengan menggunakan X sebagai bahan dasar, referensi, atau sumber utama. X bisa berupa data, pengalaman, ide, fakta, atau dokumen.',
  nuance: 'Berbeda dari 〜に基づいて (berdasarkan — lebih menekankan kesesuaian atau kepatuhan terhadap standar/aturan yang ada), 〜をもとに menekankan X sebagai bahan mentah atau titik tolak kreatif. 〜をもとに lebih umum untuk karya kreatif, penelitian, dan analisis; 〜に基づいて lebih untuk kepatuhan terhadap hukum, pedoman, atau data yang ada.',
  examples: [
    { jp: '実際の事件<b>をもとに</b>、この映画は制作された。', id: 'Film ini diproduksi berdasarkan kejadian nyata.' },
    { jp: 'アンケートの回答<b>をもとにして</b>、サービス改善案をまとめた。', id: 'Proposal perbaikan layanan disusun berdasarkan jawaban kuesioner.' },
  ],
  see_also_grammar: ['gn1-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00095'],
  register: 'neutral', exceptions: null, notes: '〜をもとにした + N（名詞修飾）も頻出：実話をもとにした映画。〜をもって（手段・時点）との混同注意。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00099', level: 'n1', pattern: '〜と相まって',
  reading: '〜to aimatte',
  meaning: 'dikombinasikan dengan ..., berpadu dengan ..., bersama-sama dengan ... menghasilkan efek',
  cat: 'listing-addition',
  connection: 'N + と相まって',
  desc: '<b>〜と相まって</b> menyatakan bahwa dua faktor atau lebih bergabung dan saling mendukung untuk menghasilkan suatu efek atau hasil. Tidak hanya "ditambah," tetapi keduanya bersinergi dan efeknya lebih besar dari jika hanya satu saja.',
  nuance: 'Berbeda dari 〜と合わせて (digabungkan/dikombinasikan — lebih netral dan mekanis), 〜と相まって menekankan sinergi — dua hal yang ketika bergabung menghasilkan efek yang lebih kuat. Selalu bernuansa positif atau setidaknya netral dalam menggambarkan efek yang dihasilkan. Lebih formal dan sastra dari だけでなく.',
  examples: [
    { jp: '彼の才能は、たゆまぬ努力<b>と相まって</b>、傑出した成果を生み出した。', id: 'Bakatnya, berpadu dengan kerja keras yang tak pernah berhenti, menghasilkan prestasi yang luar biasa.' },
    { jp: '好立地<b>と相まって</b>、そのカフェは瞬く間に人気店となった。', id: 'Dikombinasikan dengan lokasi yang strategis, kafe itu dalam sekejap menjadi tempat yang sangat populer.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00100', level: 'n1', pattern: '〜かたわら',
  reading: '〜katawara',
  meaning: 'sambil juga ..., di sela-sela ...; melakukan dua kegiatan secara paralel (kegiatan utama dan kegiatan sampingan)',
  cat: 'sequential-temporal',
  connection: 'V-dictionary / N + の + かたわら',
  desc: '<b>〜かたわら</b> menyatakan bahwa seseorang melakukan kegiatan sampingan atau tambahan di sela-sela kegiatan utamanya. Kegiatan pertama (sebelum かたわら) adalah aktivitas utama atau pekerjaan pokok; yang kedua adalah yang dilakukan secara paralel sebagai tambahan.',
  nuance: 'Berbeda dari 〜ながら (sambil — dua tindakan simultan dalam waktu yang persis sama, umumnya jangka pendek), 〜かたわら menekankan dua peran atau kegiatan yang berlangsung dalam jangka panjang secara paralel — biasanya kegiatan profesional. Lebih formal dan bernuansa tulisan dibanding ながら.',
  examples: [
    { jp: '会社員をする<b>かたわら</b>、週末はボランティア活動に励んでいる。', id: 'Di sela-sela kesibukannya sebagai karyawan, dia aktif dalam kegiatan sukarela di akhir pekan.' },
    { jp: '研究の<b>かたわら</b>、次世代の研究者の育成にも力を入れている。', id: 'Di samping kesibukannya meneliti, dia juga giat membina para peneliti generasi berikutnya.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: '主たる活動 + かたわら + 副次的活動。〜ながら（同時動作）との違いは、かたわらが長期的・習慣的な二重役割を指す点。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00101', level: 'n1', pattern: '〜ともなると',
  reading: '〜to mo naru to',
  meaning: 'ketika sudah mencapai level ..., kalau sudah sampai taraf ...; begitu sudah menjadi ...',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなると',
  desc: '<b>〜ともなると</b> menyatakan bahwa ketika seseorang atau sesuatu mencapai suatu level, status, atau tahapan tertentu, hal-hal tertentu secara alami muncul atau diharapkan. Menekankan perubahan yang terjadi seiring dengan naiknya level atau status.',
  nuance: 'Hampir sinonim dengan 〜ともなれば, tetapi 〜ともなると sedikit lebih deskriptif — menggambarkan realita yang memang terjadi ketika status itu dicapai. 〜ともなれば lebih bernuansa normatif — mengatakan apa yang seharusnya atau wajarnya terjadi. Keduanya sering dapat saling menggantikan.',
  examples: [
    { jp: '社会人3年目<b>ともなると</b>、ある程度の責任ある仕事を任されるようになる。', id: 'Begitu sudah tahun ketiga bekerja, secara alami mulai dipercaya dengan pekerjaan yang cukup bertanggung jawab.' },
    { jp: 'プロのアスリート<b>ともなると</b>、練習の質も量も一般人とは全然違う。', id: 'Kalau sudah menjadi atlet profesional, baik kualitas maupun kuantitas latihannya sangat berbeda dari orang biasa.' },
  ],
  see_also_grammar: ['gn1-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00102'],
  register: 'neutral', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00102', level: 'n1', pattern: '〜ともなれば',
  reading: '〜to mo nareba',
  meaning: 'kalau sudah menjadi ..., jika sudah berada di posisi/level ...; pada kondisi seperti itu sudah sewajarnya ...',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなれば',
  desc: '<b>〜ともなれば</b> menyatakan bahwa jika seseorang atau sesuatu mencapai level atau status tertentu, maka suatu sikap, tanggung jawab, atau situasi tertentu sudah sewajarnya ada atau diharapkan muncul. Lebih normatif dari 〜ともなると.',
  nuance: 'Hampir sama dengan 〜ともなると, tetapi 〜ともなれば memiliki nuansa lebih kuat bahwa ada ekspektasi atau norma yang berlaku — "sudah seharusnya demikian jika sudah pada posisi itu." Sering diikuti 〜ものだ atau 〜はずだ yang memperkuat nuansa normatif tersebut.',
  examples: [
    { jp: '一国のリーダー<b>ともなれば</b>、言葉の一つ一つに責任が伴う。', id: 'Jika sudah menjadi pemimpin suatu negara, setiap kata yang diucapkan membawa tanggung jawab.' },
    { jp: '親<b>ともなれば</b>、子どもの将来を真剣に考えるものだ。', id: 'Kalau sudah menjadi orang tua, sudah sewajarnya memikirkan masa depan anak dengan serius.' },
  ],
  see_also_grammar: ['gn1-00101'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00101'],
  register: 'neutral', exceptions: null, notes: 'ともなると（描写的）vs ともなれば（規範的）の微差に注意。後件に「ものだ」「はずだ」が来ることが多い。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00103', level: 'n1', pattern: '〜んがために / 〜んがための',
  reading: '〜n ga tame ni / 〜n ga tame no',
  meaning: 'demi ..., untuk tujuan ... (ekspresi tujuan yang sangat formal, sastra, dan penuh tekad)',
  cat: 'purpose',
  connection: 'V-nai-stem + んがために / んがための + N（する→せんがために）',
  desc: '<b>〜んがために</b> adalah ekspresi tujuan bercorak sastra klasik yang menyatakan bahwa seseorang melakukan sesuatu dengan tekad dan keseriusan yang sangat besar demi mencapai tujuan tertentu. Varian 〜んがための digunakan untuk memodifikasi nomina berikutnya.',
  nuance: 'Jauh lebih kuat dan arkaik dari ために biasa. Hampir tidak ditemukan dalam percakapan modern — penggunaannya terbatas pada sastra, sejarah, pidato kenegaraan, dan tulisan yang sengaja bergaya heroik atau khidmat. Memberikan kesan pengorbanan besar dan tekad yang tak tergoyahkan.',
  examples: [
    { jp: '国を救わ<b>んがために</b>、彼は命を賭した。', id: 'Demi menyelamatkan negara, dia mempertaruhkan nyawanya.' },
    { jp: '真実を知ら<b>んがための</b>長い調査が、ようやく実を結んだ。', id: 'Penyelidikan panjang demi mengetahui kebenaran akhirnya membuahkan hasil.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: 'コnjugasi：書く→書かんがために、する→せんがために、来る→来んがために。未然形＋んは古典的意志形。日常会話では絶対不使用。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00104', level: 'n1', pattern: '〜ことなく',
  reading: '〜koto naku',
  meaning: 'tanpa ... sama sekali, tidak pernah ...; dengan tidak melakukan ... sekalipun',
  cat: 'negative',
  connection: 'V-dictionary + ことなく',
  desc: '<b>〜ことなく</b> menyatakan bahwa suatu tindakan benar-benar tidak terjadi — tidak sekalipun, tidak pernah. Menekankan ketiadaan tindakan tersebut secara menyeluruh sepanjang periode tertentu. Digunakan untuk memuji ketekunan atau menggambarkan keadaan yang konsisten.',
  nuance: 'Berbeda dari 〜ことなしに (tanpa X sebagai prasyarat — lebih kausal: "tanpa X, Y tidak mungkin"), 〜ことなく lebih menekankan ketiadaan tindakan itu sendiri secara konsisten sepanjang waktu. 〜ないで lebih kasual dan umum; 〜ことなく lebih formal dan bermakna "tak sekalipun."',
  examples: [
    { jp: '彼は一度も諦める<b>ことなく</b>、10年間挑戦し続けた。', id: 'Tanpa sekali pun menyerah, dia terus berjuang selama sepuluh tahun.' },
    { jp: '誰にも頼る<b>ことなく</b>、彼女は独力で問題を解決した。', id: 'Tanpa mengandalkan siapa pun, dia menyelesaikan masalah itu dengan kekuatan sendiri.' },
  ],
  see_also_grammar: ['gn1-00091'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00091'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00105', level: 'n1', pattern: '〜をよそに',
  reading: '〜o yoso ni',
  meaning: 'tanpa peduli ..., mengabaikan ..., tidak menggubris perasaan/situasi ...',
  cat: 'contrast-concession',
  connection: 'N + をよそに',
  desc: '<b>〜をよそに</b> menyatakan bahwa seseorang melakukan sesuatu tanpa mempedulikan atau mengabaikan perasaan, kekhawatiran, atau situasi yang disebutkan. X (sebelum をよそに) adalah hal yang seharusnya diperhatikan tetapi justru diabaikan.',
  nuance: 'Berbeda dari 〜にもかかわらず (meskipun — mengakui kondisi tetapi tetap melanjutkan, lebih netral), 〜をよそに memiliki nuansa bahwa pengabaian tersebut bersifat sengaja atau setidaknya kontras — ada pihak yang peduli tetapi diabaikan. Sering bernuansa negatif terhadap subjek yang mengabaikan.',
  examples: [
    { jp: '周囲の反対<b>をよそに</b>、彼は独断でプロジェクトを進めた。', id: 'Tanpa menggubris penolakan orang-orang di sekitarnya, dia melanjutkan proyek itu secara sepihak.' },
    { jp: '親の心配<b>をよそに</b>、子どもたちは無邪気に遊んでいた。', id: 'Tanpa peduli kekhawatiran orang tua, anak-anak bermain dengan riang tanpa beban.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00106', level: 'n1', pattern: '〜であれ〜であれ',
  reading: '〜de are 〜de are',
  meaning: 'baik ... maupun ..., entah ... atau ...; apapun pilihannya, berlaku untuk keduanya',
  cat: 'listing-addition',
  connection: 'N / na-adj + であれ + N / na-adj + であれ',
  desc: '<b>〜であれ〜であれ</b> menyatakan bahwa terlepas dari pilihan mana di antara dua (atau lebih) kemungkinan yang disebutkan, pernyataan atau aturan yang mengikutinya tetap berlaku untuk semua. Setara dengan 〜にしても〜にしても atau 〜にせよ〜にせよ dalam nuansa.',
  nuance: 'Berbeda dari 〜といい〜といい (yang mengevaluasi dua aspek dari satu hal/orang), 〜であれ〜であれ menyebutkan dua entitas atau kondisi yang berbeda dan menyatakan bahwa pernyataan setelahnya berlaku untuk keduanya. Lebih formal dari 〜でも〜でも.',
  examples: [
    { jp: '男性<b>であれ</b>女性<b>であれ</b>、このルールはすべての社員に平等に適用される。', id: 'Baik pria maupun wanita, aturan ini berlaku secara merata untuk semua karyawan.' },
    { jp: '成功<b>であれ</b>失敗<b>であれ</b>、その経験から学ぶ姿勢が大切だ。', id: 'Baik sukses maupun gagal, yang terpenting adalah sikap untuk belajar dari pengalaman tersebut.' },
  ],
  see_also_grammar: ['gn1-00107', 'gn1-00108'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00107'],
  register: 'formal', exceptions: null, notes: 'N + であれ の繰り返し構造。〜にせよ〜にせよ、〜にしろ〜にしろ とほぼ同義（後者の方がやや口語的）。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00107', level: 'n1', pattern: '〜といい〜といい',
  reading: '〜to ii 〜to ii',
  meaning: 'baik ... maupun ..., dilihat dari segi ... dan ...; dalam hal ... dan ... keduanya (mengevaluasi beberapa aspek)',
  cat: 'listing-addition',
  connection: 'N + といい + N + といい',
  desc: '<b>〜といい〜といい</b> digunakan untuk menyebutkan dua aspek atau karakteristik dari satu hal/orang, lalu memberikan penilaian menyeluruh berdasarkan kedua aspek tersebut. Biasanya diikuti penilaian positif atau negatif yang mencakup keduanya.',
  nuance: 'Berbeda dari 〜であれ〜であれ (memilih antara dua entitas berbeda), 〜といい〜といい mengevaluasi dua aspek dari SATU entitas yang sama. Sering bermakna "baik dari segi X maupun Y, semuanya..." — sering diikuti pujian atau kritik yang menyeluruh.',
  examples: [
    { jp: 'このレストランは、料理<b>といい</b>サービス<b>といい</b>、文句のつけようがない。', id: 'Restoran ini, baik dari segi masakan maupun layanannya, tidak ada yang bisa dikomplain.' },
    { jp: '彼の態度<b>といい</b>言葉遣い<b>といい</b>、社会人として問題がある。', id: 'Baik dari sikapnya maupun cara bicaranya, ada masalah yang serius sebagai seorang profesional.' },
  ],
  see_also_grammar: ['gn1-00106', 'gn1-00108'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00106'],
  register: 'neutral', exceptions: null, notes: '一つの対象の複数側面を評価。〜であれ〜であれとの違いは「側面の列挙」vs「選択肢の網羅」。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00108', level: 'n1', pattern: '〜なり〜なり',
  reading: '〜nari 〜nari',
  meaning: '... atau ..., pilih salah satu yang mana pun; lakukan setidaknya salah satu dari beberapa pilihan',
  cat: 'listing-addition',
  connection: 'V-dictionary / N + なり + V-dictionary / N + なり',
  desc: '<b>〜なり〜なり</b> menyajikan dua atau lebih pilihan tindakan atau hal, dan menyiratkan bahwa subjek seharusnya atau sebaiknya memilih dan melakukan setidaknya salah satunya. Sering mengandung nuansa dorongan, saran, atau imbauan — "lakukan yang mana saja dari ini."',
  nuance: 'Berbeda dari 〜か〜か (pilihan eksklusif: ini atau itu), 〜なり〜なり tidak menekankan keeksklusifan pilihan — yang penting bertindak dengan pilihan yang tersedia. Sering bermakna "setidaknya lakukan salah satu ini" — ada nuansa mendesak atau frustrasi karena inaksi.',
  examples: [
    { jp: '困っているなら、相談する<b>なり</b>助けを求める<b>なり</b>してください。', id: 'Kalau kamu kesulitan, minta saran atau mintalah bantuan — lakukan yang mana saja.' },
    { jp: '電話する<b>なり</b>メールを送る<b>なり</b>、何か連絡をくれれば良かったのに。', id: 'Seharusnya kamu menghubungi, entah lewat telepon atau email — yang mana saja.' },
  ],
  see_also_grammar: ['gn1-00106', 'gn1-00107'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'neutral', exceptions: null, notes: '後件に話者の期待・要求・苛立ちが含まれることが多い。〜なり単体（〜するなり）は別用法（〜するや否や）と異なる点に注意。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00109', level: 'n1', pattern: '〜ごとく / 〜ごとき',
  reading: '〜gotoku / 〜gotoki',
  meaning: 'seperti ..., laksana ..., bagaikan ... (perbandingan bergaya klasik/sastra)',
  cat: 'comparison',
  connection: 'V-dictionary / N + の + ごとく（副詞的）/ ごとき + N（形容詞的） / ごとし（文末）',
  desc: '<b>〜ごとく</b> adalah ekspresi perbandingan kuno dan sastra — setara dengan 〜のように dalam penggunaan modern. ごとく berfungsi adverbial (memodifikasi verba), ごとき berfungsi adjectival (memodifikasi nomina dan sering bernuansa merendah diri atau meremehkan), ごとし digunakan di akhir kalimat.',
  nuance: 'Bernuansa sangat klasik — hampir hanya muncul dalam sastra, puisi, peribahasa, dan dokumen sejarah. ごとき juga sering digunakan dalam merendahkan diri: 私ごとき者 = "seseorang rendahan seperti saya." Jangan digunakan dalam percakapan atau tulisan modern biasa — kecuali untuk efek sastra yang disengaja.',
  examples: [
    { jp: '流れる水の<b>ごとく</b>、時は静かに、しかし確実に過ぎ去っていく。', id: 'Bagai air yang mengalir, waktu berlalu dengan tenang namun pasti.' },
    { jp: '私<b>ごとき</b>者には、身に余るお言葉をいただき、恐縮でございます。', id: 'Kata-kata yang begitu mulia terlalu berlebihan untuk seseorang seperti saya yang tidak berarti ini.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: '現代語の「〜のように」に対応。ごとく（副詞）・ごとき（連体）・ごとし（終止）の使い分けに注意。ごとき は自己卑下にも使う。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00110', level: 'n1', pattern: '〜いかんによっては / 〜いかんによらず',
  reading: '〜ikan ni yotte wa / 〜ikan ni yorazu',
  meaning: 'tergantung bagaimana ..., bergantung pada keadaan ...; (varian: terlepas dari bagaimana pun)',
  cat: 'conditional-tara',
  connection: 'N + いかんによっては / いかんによって / いかんによらず / いかんを問わず',
  desc: '<b>〜いかんによっては</b> menyatakan bahwa hasil atau tindakan tergantung pada kondisi atau keadaan yang disebutkan. 〜いかんによらず / いかんを問わず adalah varian dengan makna sebaliknya: terlepas dari bagaimana pun keadaannya, tetap berlaku.',
  nuance: '〜いかん (如何) berarti "bagaimana" — sangat formal dan kaku, hampir eksklusif digunakan dalam dokumen resmi, hukum, kontrak, dan pengumuman formal. Tidak untuk percakapan sehari-hari. Dua varian: いかんによっては (tergantung) vs いかんにかかわらず / いかんを問わず (tanpa tergantung = berlaku untuk semua kondisi).',
  examples: [
    { jp: '交渉の結果<b>いかんによっては</b>、契約を白紙に戻すこともありえる。', id: 'Tergantung bagaimana hasil negosiasi, ada kemungkinan kontrak akan dibatalkan sepenuhnya.' },
    { jp: '成績<b>いかんによっては</b>、奨学金の継続が難しくなる場合があります。', id: 'Bergantung pada bagaimana nilai akademisnya, perpanjangan beasiswa mungkin menjadi sulit.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'いかんによらず・いかんを問わず（〜に関係なく）との意味の違いに注意。いかん単体は「如何」（漢字）で書かれることも多い。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00111', level: 'n1', pattern: '〜べく',
  reading: '〜beku',
  meaning: 'demi ..., untuk tujuan ... (formal/literary)',
  cat: 'purpose',
  connection: 'V-dictionary + べく (suru → すべく)',
  desc: '<b>〜べく</b> menyatakan tujuan atau niat dengan nuansa sangat formal dan sastra. Maknanya setara dengan ために atau ようと, namun jauh lebih kuat secara register dan terasa arkaik. Digunakan dalam tulisan serius, pidato resmi, atau laporan formal.',
  nuance: 'Lebih formal dan kuno dari ために atau ように. Menunjukkan tekad atau tujuan yang kuat. Berbeda dengan 〜んがために (yang sangat arkaik dan heroik), 〜べく masih sering muncul di konteks profesional modern seperti laporan bisnis atau surat resmi.',
  examples: [
    { jp: '優勝すべく、チーム全員が一丸となって練習した。', id: 'Demi meraih kemenangan, seluruh anggota tim berlatih bersatu padu.' },
    { jp: '問題を解決すべく、専門家を招集した。', id: 'Demi menyelesaikan masalah, para ahli dipanggil untuk berkumpul.' },
    { jp: '夢を実現すべく、彼は故郷を離れた。', id: 'Demi mewujudkan impiannya, ia meninggalkan kampung halaman.' }
  ],
  see_also_grammar: ['gn1-00112', 'gn1-00079'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'Konjugasi: 書く→書くべく、する→すべく、来る→来るべく. Kata sifat-i dan kata sifat-na tidak menggunakan pola ini.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00112', level: 'n1', pattern: '〜べくして',
  reading: '〜beku shite',
  meaning: 'memang seharusnya ..., sudah takdirnya ..., wajar kalau ...',
  cat: 'expression',
  connection: 'V-dictionary + べくして + V (kata kerja yang sama, biasanya bentuk た)',
  desc: '<b>〜べくして</b> menyatakan bahwa sesuatu terjadi sesuai dengan hal yang seharusnya atau sudah ditakdirkan. Biasanya berbentuk 「〜べくしてVた」dan menggambarkan hasil yang sudah selayaknya terjadi berdasarkan keadaan atau logika.',
  nuance: 'Sering mengandung konotasi positif atau negatif tergantung konteks — bisa berarti "sudah selayaknya berhasil" (positif) atau "sudah semestinya gagal" (negatif). Berbeda dengan 〜べく (yang menyatakan tujuan), 〜べくして menyatakan keniscayaan atau kewajaran sebuah hasil.',
  examples: [
    { jp: 'あの事故は起こるべくして起こった。安全対策が全くなかったのだから。', id: 'Kecelakaan itu memang sudah semestinya terjadi. Karena tidak ada langkah keselamatan sama sekali.' },
    { jp: '彼は勝つべくして勝った。誰よりも努力してきたのだから。', id: 'Ia menang karena memang sudah sepatutnya menang. Ia telah berusaha lebih keras dari siapa pun.' }
  ],
  see_also_grammar: ['gn1-00111'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'Pola ini hampir selalu diikuti oleh kata kerja yang sama: 起こるべくして起こった、成功すべくして成功した. Memberikan kesan takdir atau kepastian logis.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00113', level: 'n1', pattern: '〜にあって',
  reading: '〜ni atte',
  meaning: 'berada dalam situasi ..., dalam kondisi ..., di tengah-tengah ...',
  cat: 'expression',
  connection: 'N + にあって(も)',
  desc: '<b>〜にあって</b> menyatakan bahwa seseorang atau sesuatu berada dalam situasi, kondisi, atau lingkungan tertentu. Biasanya diikuti oleh pernyataan tentang bagaimana seseorang bersikap atau berperilaku dalam situasi tersebut. Bentuk 〜にあっても menambahkan nuansa "meskipun dalam kondisi itu".',
  nuance: 'Lebih formal dari 〜の中で atau 〜において. Mengandung nuansa bahwa situasinya cukup khusus atau kritis. Sering dipakai dalam konteks kesulitan, krisis, atau momen penting. Tidak untuk situasi sehari-hari yang biasa.',
  examples: [
    { jp: '非常事態にあって、リーダーは冷静さを保った。', id: 'Di tengah keadaan darurat, sang pemimpin tetap mempertahankan ketenangannya.' },
    { jp: '困難な状況にあっても、彼女は諦めなかった。', id: 'Meskipun berada dalam kondisi yang sulit, ia tidak menyerah.' },
    { jp: '変化の時代にあって、企業は柔軟な対応が求められる。', id: 'Di tengah era perubahan, perusahaan dituntut untuk merespons dengan fleksibel.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00114', level: 'n1', pattern: '〜をもってすれば',
  reading: '〜wo motte sureba',
  meaning: 'kalau menggunakan ..., dengan kemampuan/kekuatan ..., bermodal ...',
  cat: 'conditional-tara',
  connection: 'N + をもってすれば',
  desc: '<b>〜をもってすれば</b> menyatakan bahwa dengan menggunakan kemampuan, kekuatan, atau sumber daya tertentu, sesuatu yang mungkin tampak sulit pun dapat tercapai. Sering mengandung nuansa pujian atau pengakuan terhadap kemampuan yang disebut.',
  nuance: 'Berbeda dengan 〜をもってしても (yang menyatakan ketidakmampuan bahkan dengan sumber daya itu), 〜をもってすれば justru menyatakan kemungkinan atau optimisme. Berpasangan secara semantis sebagai kebalikannya.',
  examples: [
    { jp: '彼女の能力をもってすれば、この難題も解決できるはずだ。', id: 'Dengan kemampuan yang ia miliki, masalah sulit ini pun seharusnya bisa diselesaikan.' },
    { jp: '最新技術をもってすれば、不可能なことはない。', id: 'Dengan teknologi terkini, tidak ada yang tidak mungkin.' }
  ],
  see_also_grammar: ['gn1-00115'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00115', level: 'n1', pattern: '〜をもってしても',
  reading: '〜wo motte shite mo',
  meaning: 'bahkan dengan ..., sekalipun menggunakan ..., meski bermodal ...',
  cat: 'contrast-concession',
  connection: 'N + をもってしても',
  desc: '<b>〜をもってしても</b> menyatakan bahwa bahkan dengan menggunakan sumber daya, kekuatan, atau kemampuan terbaik sekalipun, sesuatu tetap tidak dapat dilakukan atau tidak cukup. Mengandung nuansa penegasan terhadap keterbatasan.',
  nuance: 'Kebalikan langsung dari 〜をもってすれば. Kalimat setelahnya biasanya berisi ungkapan negatif atau ketidakmampuan (〜できない、〜難しい). Sering digunakan untuk memberikan penekanan dramatis bahwa situasinya benar-benar sulit atau mustahil.',
  examples: [
    { jp: 'どんな名医をもってしても、この病気は治せなかった。', id: 'Bahkan dengan dokter terbaik sekalipun, penyakit ini tidak bisa disembuhkan.' },
    { jp: '彼の努力をもってしても、合格点には届かなかった。', id: 'Bahkan dengan segala usaha kerasnya, nilai kelulusan pun tidak tercapai.' }
  ],
  see_also_grammar: ['gn1-00114'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00116', level: 'n1', pattern: '〜たるもの',
  reading: '〜taru mono',
  meaning: 'sebagai ..., orang yang berposisi sebagai ... (seharusnya bertindak demikian)',
  cat: 'obligation-necessity',
  connection: 'N + たるもの',
  desc: '<b>〜たるもの</b> menyatakan bahwa seseorang yang memegang posisi, jabatan, atau peran tertentu seharusnya berperilaku sesuai standar yang diharapkan dari posisi tersebut. Biasanya diikuti oleh pernyataan tentang kewajiban atau standar moral/profesional.',
  nuance: 'Sangat formal dan terasa seperti ceramah moral. Mengandung nuansa "sudah sepatutnya" atau "layaknya". Lebih kuat dari 〜として dan menekankan tanggung jawab yang melekat pada jabatan. Sering digunakan untuk menegur atau mengingatkan standar perilaku.',
  examples: [
    { jp: '教師たるもの、常に公正であるべきだ。', id: 'Sebagai seorang guru, sudah sepatutnya selalu bersikap adil.' },
    { jp: '社会人たるもの、礼儀を忘れてはならない。', id: 'Sebagai orang yang telah terjun ke masyarakat, jangan pernah melupakan sopan santun.' },
    { jp: 'リーダーたるもの、困難な時こそ率先して行動すべきだ。', id: 'Sebagai seorang pemimpin, justru di saat sulit harus bertindak sebagai pelopor.' }
  ],
  see_also_grammar: ['gn1-00117'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00117', level: 'n1', pattern: '〜たる',
  reading: '〜taru',
  meaning: 'yang layak disebut ..., yang sejati ..., yang sesungguhnya ...',
  cat: 'predicate-adjective',
  connection: 'N + たる + N',
  desc: '<b>〜たる</b> adalah bentuk atributif dari kopula formal たり. Digunakan untuk memodifikasi nomina dan menyatakan bahwa sesuatu atau seseorang benar-benar memenuhi kualifikasi atau esensi dari hal yang disebutkan. Memberikan kesan penilaian atau standar yang tinggi.',
  nuance: 'Lebih formal dan arkaik dari である. Sering muncul dalam judul jabatan formal, deskripsi karakter dalam tulisan sastra, atau pernyataan yang bernuansa idealis. Mirip dengan 〜たるもの namun berfungsi sebagai modifier nomina, bukan predikat.',
  examples: [
    { jp: '真のリーダーたる人物は、部下の失敗を自分の責任として引き受ける。', id: 'Seseorang yang layak disebut pemimpin sejati akan menanggung kegagalan bawahannya sebagai tanggung jawabnya sendiri.' },
    { jp: '名医たる所以は、技術だけでなく患者への共感にある。', id: 'Alasan seseorang layak disebut dokter ternama terletak bukan hanya pada keahlian, tetapi juga pada empati terhadap pasien.' }
  ],
  see_also_grammar: ['gn1-00116'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: 'Berbeda dari 〜たるもの yang berfungsi sebagai predikat, 〜たる digunakan sebagai prenominal modifier: 〜たる + Nomina.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00118', level: 'n1', pattern: '〜であれ',
  reading: '〜de are',
  meaning: 'meskipun ..., sekalipun ..., entah ... (formal)',
  cat: 'contrast-concession',
  connection: 'N + であれ / V-plain + であれ',
  desc: '<b>〜であれ</b> menyatakan konsesi atau penekanan bahwa terlepas dari kondisi yang disebutkan, pernyataan utama tetap berlaku. Digunakan secara formal untuk menyatakan bahwa tidak ada pengecualian. Bisa berdiri sendiri atau diulang (〜であれ〜であれ) untuk menyatakan "baik ... maupun ...".',
  nuance: 'Lebih formal dari 〜でも atau 〜にしても. Pola ulang 〜であれ〜であれ hampir setara dengan 〜にせよ〜にせよ namun sedikit lebih formal dan sering terasa seperti pernyataan prinsip. Versi tunggal menekankan tidak adanya pengecualian.',
  examples: [
    { jp: '何人であれ、法律の前では平等だ。', id: 'Siapa pun orangnya, semua sama di hadapan hukum.' },
    { jp: '成功であれ失敗であれ、挑戦することに意義がある。', id: 'Baik sukses maupun gagal, ada nilai dalam mencoba.' },
    { jp: '理由が何であれ、暴力は許されない。', id: 'Apa pun alasannya, kekerasan tidak bisa dibenarkan.' }
  ],
  see_also_grammar: ['gn1-00119', 'gn1-00120'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00119', level: 'n1', pattern: '〜にせよ〜にせよ',
  reading: '〜ni seyo 〜ni seyo',
  meaning: 'baik ... maupun ..., entah ... entah ...',
  cat: 'contrast-concession',
  connection: 'V-plain/N + にせよ〜V-plain/N + にせよ',
  desc: '<b>〜にせよ〜にせよ</b> menyatakan bahwa terlepas dari pilihan atau kondisi mana pun yang disebutkan, kesimpulan atau pernyataan utama tetap berlaku. Digunakan untuk menyatakan bahwa kedua kemungkinan tidak mengubah situasi atau sikap yang akan diambil.',
  nuance: 'Sedikit lebih formal dari 〜にしろ〜にしろ. Keduanya dapat digunakan secara bergantian dalam banyak konteks, namun 〜にせよ〜にせよ terasa lebih serius dan sering muncul dalam tulisan formal. Berbeda dari 〜であれ〜であれ yang lebih arkaik dan kuat secara register.',
  examples: [
    { jp: '行くにせよ行かないにせよ、早めに返事をください。', id: 'Baik kamu pergi maupun tidak, mohon segera beri jawaban.' },
    { jp: '賛成するにせよ反対するにせよ、理由を明確に述べてほしい。', id: 'Baik setuju maupun tidak, tolong nyatakan alasannya dengan jelas.' }
  ],
  see_also_grammar: ['gn1-00118', 'gn1-00120'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00120', level: 'n1', pattern: '〜にしろ〜にしろ',
  reading: '〜ni shiro 〜ni shiro',
  meaning: 'baik ... maupun ..., entah ... entah ... (agak lebih kasual)',
  cat: 'contrast-concession',
  connection: 'V-plain/N + にしろ〜V-plain/N + にしろ',
  desc: '<b>〜にしろ〜にしろ</b> menyatakan bahwa dalam situasi apa pun — baik A maupun B — pernyataan utama tetap berlaku. Secara makna dan fungsi sangat mirip dengan 〜にせよ〜にせよ, namun sedikit lebih kasual dan lebih sering digunakan dalam percakapan.',
  nuance: 'Pasangan minimnya adalah 〜にせよ〜にせよ (lebih formal). Keduanya dapat saling menggantikan dalam sebagian besar konteks. 〜にしろ〜にしろ lebih terasa alami dalam percakapan lisan, sementara 〜にせよ〜にせよ lebih sering dalam tulisan resmi.',
  examples: [
    { jp: '合格するにしろしないにしろ、最後まで全力でやろう。', id: 'Baik lulus maupun tidak, mari lakukan yang terbaik sampai akhir.' },
    { jp: '買うにしろ買わないにしろ、一度試してみる価値はある。', id: 'Baik kamu beli maupun tidak, mencobanya sekali tetap bernilai.' }
  ],
  see_also_grammar: ['gn1-00118', 'gn1-00119'],
  see_also_vocab: [],
  confusion_pairs: [],
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
  nuance: 'Selalu digunakan secara kritis — tidak bisa untuk pujian. Biasanya berbentuk 「〜ともあろう人が〜するとは」 dan menyiratkan "orang sekaliber itu pun melakukan hal seperti itu, sungguh mengejutkan". Kekuatan kritiknya cukup tajam dan terasa seperti teguran terhormat.',
  examples: [
    { jp: '大臣ともあろう人が、公の場でそんな発言をするとは信じられない。', id: 'Sungguh tidak dapat dipercaya bahwa seseorang yang statusnya setara menteri pun melontarkan pernyataan seperti itu di depan publik.' },
    { jp: 'ベテラン医師ともあろう者が、こんな初歩的なミスをするとは。', id: 'Mengejutkan sekali bahwa seorang dokter berpengalaman sekaliber itu pun membuat kesalahan dasar seperti ini.' }
  ],
  see_also_grammar: ['gn1-00116'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: 'Selalu mengandung konotasi negatif/kritik; tidak digunakan untuk memuji.', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00122', level: 'n1', pattern: '〜とも',
  reading: '〜to mo',
  meaning: 'meskipun ..., sekalipun ... (penegasan dengan konsesi)',
  cat: 'contrast-concession',
  connection: 'V-volitional + とも / Adj-i (stem) + かろうとも / N・Adj-na + であろうとも',
  desc: '<b>〜とも</b> menyatakan konsesi kuat — bahwa meskipun sesuatu terjadi atau kondisinya demikian, pembicara tetap pada sikapnya atau pernyataan utama tetap berlaku. Memberikan nuansa tekad yang kuat atau penerimaan yang tulus terhadap kondisi buruk sekalipun.',
  nuance: 'Lebih formal dan sastra dari 〜ても. Mengandung nuansa resolusi, keteguhan hati, atau penerimaan yang dalam. Sering ditemukan dalam puisi, pidato inspirasional, atau pernyataan bertekad tinggi. Berbeda dari 〜でも yang lebih kasual dan netral.',
  examples: [
    { jp: 'たとえ失敗しようとも、私はこの道を進み続ける。', id: 'Sekalipun gagal, aku akan terus melangkah di jalan ini.' },
    { jp: '嵐が来ようとも、私たちは計画を変えない。', id: 'Meskipun badai datang, kami tidak akan mengubah rencana.' },
    { jp: 'いかに困難であろうとも、諦めない精神が重要だ。', id: 'Betapapun sulitnya, semangat untuk tidak menyerah adalah hal yang penting.' }
  ],
  see_also_grammar: ['gn1-00136'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: 'Sering didahului oleh たとえ atau いかに untuk memperkuat nuansa konsesi.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00123', level: 'n1', pattern: '〜しも',
  reading: '〜shi mo',
  meaning: 'justru ..., tepat ..., bahkan ... (penekanan kontekstual)',
  cat: 'adverb',
  connection: 'Terikat pada kata-kata tertentu: 必ずしも、折りしも、何もしも',
  desc: '<b>〜しも</b> adalah partikel penekan yang muncul dalam kombinasi tetap dengan kata-kata tertentu. Paling umum dalam bentuk 必ずしも (tidak selalu/tidak serta-merta), 折りしも (tepat pada saat itu), dan 何もしも (apa pun juga). Menambahkan penekanan pada ketepatan waktu, konteks, atau cakupan yang disebut.',
  nuance: 'Tidak digunakan secara bebas — harus muncul dalam kombinasi tetap. 必ずしも は bentuk paling umum dan selalu diikuti negatif. 折りしも muncul dalam narasi dan menandai kebetulan waktu yang dramatis. Ketiganya bersifat formal atau sastra.',
  examples: [
    { jp: 'お金が多ければ必ずしも幸せになれるわけではない。', id: 'Banyak uang tidak serta-merta menjamin kebahagiaan.' },
    { jp: '折りしも、雪が降り始めた。', id: 'Tepat pada saat itu, salju mulai turun.' },
    { jp: '必ずしも専門家だけが正解を知っているとは限らない。', id: 'Tidak selalu hanya para ahli yang mengetahui jawaban yang benar.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: 'Tidak produktif — hanya muncul dalam kombinasi tetap (必ずしも、折りしも dll).', notes: '必ずしも selalu diikuti negatif. 折りしも digunakan untuk menyatakan kebetulan waktu dalam narasi.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00124', level: 'n1', pattern: '〜ならいざしらず',
  reading: '〜nara iza shirazu',
  meaning: 'kalau memang ..., lain soal kalau ..., bisa dimengerti kalau ...',
  cat: 'contrast-concession',
  connection: 'N + ならいざしらず / V-plain + ならいざしらず',
  desc: '<b>〜ならいざしらず</b> menyatakan bahwa kondisi A (yang disebutkan) mungkin bisa dimaklumi atau dipahami, namun kondisi aktual yang terjadi tidak bisa diterima dengan cara yang sama. Menetapkan pengecualian hipotetis untuk menekankan ketidaksesuaian situasi yang sebenarnya.',
  nuance: 'Konstruksi ini menyiratkan "kalau A mungkin bisa diterima, tapi faktanya bukan A, jadi ini tidak bisa diterima". Sangat formal dan hampir tidak digunakan dalam percakapan sehari-hari. Berbeda dari 〜はいざしらず yang tidak mensyaratkan kondisi hipotetis sekuat ini.',
  examples: [
    { jp: '初心者ならいざしらず、プロがこんなミスをするとは驚きだ。', id: 'Kalau pemula mungkin masih bisa dimaklumi, tapi seorang profesional membuat kesalahan seperti ini sungguh mengejutkan.' },
    { jp: '昔ならいざしらず、今はインターネットで何でも調べられる。', id: 'Kalau zaman dulu mungkin berbeda, tapi sekarang segala hal bisa dicari lewat internet.' }
  ],
  see_also_grammar: ['gn1-00125'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00125', level: 'n1', pattern: '〜はいざしらず',
  reading: '〜wa iza shirazu',
  meaning: '... itu lain soal, tapi ..., soal ... tidak tahu, tapi ...',
  cat: 'contrast-concession',
  connection: 'N + はいざしらず',
  desc: '<b>〜はいざしらず</b> menyatakan bahwa hal A (yang disebutkan sebelumnya) tidak dipermasalahkan atau dikecualikan, namun yang menjadi fokus adalah hal B yang berbeda atau lebih penting. Digunakan untuk mengalihkan atau memisahkan dua hal dan menekankan bahwa fokusnya bukan pada A.',
  nuance: 'Lebih umum digunakan daripada 〜ならいざしらず. 〜はいざしらず tidak membutuhkan kondisi hipotetis yang kuat — cukup mengatakan "soal X saya tidak akan mempermasalahkan, tapi...". Nuansanya lebih santai secara komparatif, meskipun tetap formal.',
  examples: [
    { jp: '趣味はいざしらず、仕事では正確さが求められる。', id: 'Soal hobi lain cerita, tapi dalam pekerjaan ketelitian sangat diperlukan.' },
    { jp: '他の人はいざしらず、あなたにはもっと頑張ってほしい。', id: 'Soal orang lain lain cerita, tapi dari kamu aku berharap bisa berusaha lebih keras.' }
  ],
  see_also_grammar: ['gn1-00124'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00126', level: 'n1', pattern: '〜に足る',
  reading: '〜ni taru',
  meaning: 'layak untuk ..., cukup untuk ..., memenuhi standar untuk ...',
  cat: 'expression',
  connection: 'V-dictionary + に足る (+ N)',
  desc: '<b>〜に足る</b> menyatakan bahwa sesuatu atau seseorang memenuhi standar atau kualifikasi yang diperlukan untuk tujuan tertentu. Sering digunakan untuk menyatakan kelayakan atau keabsahan seseorang/sesuatu dalam konteks formal.',
  nuance: 'Lebih formal dari 〜に値する dan terasa lebih kaku dan objektif. 〜に足る sering muncul dalam konteks evaluasi atau penilaian. Kebalikannya adalah 〜に足りない. Sering digunakan dalam frasa seperti 信頼するに足る (layak dipercaya), 尊敬するに足る (layak dihormati).',
  examples: [
    { jp: '彼の証言は信頼するに足るものだと判断された。', id: 'Kesaksiannya dinilai sebagai sesuatu yang layak untuk dipercaya.' },
    { jp: 'この研究は発表するに足る成果を上げている。', id: 'Penelitian ini telah menghasilkan capaian yang layak untuk dipresentasikan.' }
  ],
  see_also_grammar: ['gn1-00127', 'gn1-00128'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00127', level: 'n1', pattern: '〜に足りない',
  reading: '〜ni tarinai',
  meaning: 'tidak layak untuk ..., tidak cukup untuk ..., tidak memenuhi standar ...',
  cat: 'negative',
  connection: 'V-dictionary + に足りない',
  desc: '<b>〜に足りない</b> adalah bentuk negatif dari 〜に足る. Menyatakan bahwa sesuatu atau seseorang tidak memenuhi standar atau kualifikasi yang diperlukan untuk tujuan tertentu. Sering digunakan untuk menolak atau meremehkan sesuatu dengan nada formal.',
  nuance: 'Karena merupakan kebalikan langsung dari 〜に足る, keduanya sering berpasangan dalam konteks evaluasi. 〜に足りない tidak sekedar menyatakan ketidakcukupan biasa, tetapi mengandung nuansa penilaian yang lebih tegas bahwa standar benar-benar tidak terpenuhi.',
  examples: [
    { jp: 'その程度の努力では、合格するに足りない。', id: 'Dengan usaha sekecil itu, tidak cukup untuk lulus.' },
    { jp: '彼の実績は、リーダーを任せるに足りないと上司は判断した。', id: 'Atasannya menilai rekam jejaknya tidak cukup layak untuk dipercaya menjadi pemimpin.' }
  ],
  see_also_grammar: ['gn1-00126', 'gn1-00128'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00128', level: 'n1', pattern: '〜に値する',
  reading: '〜ni ataisuru',
  meaning: 'bernilai ..., layak mendapatkan ..., sepadan dengan ...',
  cat: 'expression',
  connection: 'V-dictionary / N + に値する',
  desc: '<b>〜に値する</b> menyatakan bahwa seseorang atau sesuatu layak untuk mendapatkan atau diperlakukan dengan cara tertentu karena kualitas atau capaiannya. Menunjukkan pengakuan terhadap nilai atau keunggulan sesuatu.',
  nuance: 'Berbeda dari 〜に足る yang lebih berfokus pada pemenuhan standar minimum, 〜に値する mengandung nuansa penghargaan atau pengakuan yang lebih positif. 〜に値する sering digunakan untuk menyatakan bahwa seseorang pantas mendapat pujian, penghargaan, atau perhatian.',
  examples: [
    { jp: 'この映画は、何度も観るに値する傑作だ。', id: 'Film ini adalah mahakarya yang layak untuk ditonton berkali-kali.' },
    { jp: '彼女の業績は、最高賞に値すると委員会は判断した。', id: 'Komite memutuskan bahwa prestasinya layak mendapatkan penghargaan tertinggi.' },
    { jp: 'その提案は検討に値する内容を含んでいる。', id: 'Proposal itu mengandung isi yang layak untuk dipertimbangkan.' }
  ],
  see_also_grammar: ['gn1-00126', 'gn1-00129'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00129', level: 'n1', pattern: '〜に堪える',
  reading: '〜ni taeru',
  meaning: 'tahan terhadap ..., layak untuk ..., mampu menanggung ...',
  cat: 'potential',
  connection: 'V-dictionary / N + に堪える',
  desc: '<b>〜に堪える</b> memiliki dua makna utama: (1) mampu atau tahan terhadap sesuatu yang berat atau menuntut, dan (2) layak atau cukup baik untuk sesuatu (mirip 〜に足る). Dalam makna kedua, sering muncul dalam frasa seperti 鑑賞に堪える (layak untuk dinikmati/diapresiasi).',
  nuance: 'Dalam makna "tahan/mampu menanggung" biasanya menyatakan kemampuan bertahan terhadap tekanan fisik, emosional, atau kritik. Dalam makna "layak untuk", mirip dengan 〜に足る. Konteks menentukan makna mana yang berlaku. Kebalikannya adalah 〜に堪えない.',
  examples: [
    { jp: 'この橋は重い車両にも堪えられるよう設計されている。', id: 'Jembatan ini dirancang agar mampu menahan kendaraan berat sekalipun.' },
    { jp: '彼の演技は批評に堪えるレベルに達している。', id: 'Aktingnya telah mencapai level yang layak mendapat ulasan kritis.' }
  ],
  see_also_grammar: ['gn1-00130', 'gn1-00128'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00130', level: 'n1', pattern: '〜に堪えない',
  reading: '〜ni taenai',
  meaning: 'tidak tahan terhadap ..., tidak sanggup menanggung ..., sungguh tidak tertahankan (emosi kuat)',
  cat: 'expression',
  connection: 'V-dictionary / N + に堪えない',
  desc: '<b>〜に堪えない</b> adalah bentuk negatif dari 〜に堪える, menyatakan ketidakmampuan untuk menahan atau menanggung sesuatu. Dalam penggunaan emosional, sering muncul dalam frasa tetap seperti 遺憾に堪えない (sangat menyesal), 感謝に堪えない (sangat berterima kasih), dengan makna yang paradoks namun sudah terkonvensionalisasi.',
  nuance: 'Dalam frasa konvensional seperti 遺憾に堪えない dan 感謝に堪えない, maknanya adalah "perasaan ini begitu kuat sampai tidak dapat ditahan" — bukan berarti tidak mau bersyukur atau tidak menyesal. Penggunaan ini sering di surat resmi atau pidato. Nuance ini berbeda dari penggunaan harfiahnya.',
  examples: [
    { jp: 'このような結果になったことは、遺憾に堪えません。', id: 'Kami sangat menyesalkan terjadinya hasil yang seperti ini.' },
    { jp: '皆様のご支援に感謝に堪えません。', id: 'Kami sungguh tidak bisa cukup berterima kasih atas dukungan semua pihak.' },
    { jp: 'その映像は目に堪えないほど残酷だった。', id: 'Rekaman itu begitu kejam sehingga tidak sanggup untuk ditonton.' }
  ],
  see_also_grammar: ['gn1-00129', 'gn1-00132'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: '遺憾に堪えない、感謝に堪えない、同情に堪えない adalah frasa tetap yang maknanya sudah terkonvensionalisasi dalam surat resmi/pidato.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00131', level: 'n1', pattern: '〜てやまない',
  reading: '〜te yamanai',
  meaning: 'tidak pernah berhenti ..., terus-menerus merasakan ..., dari lubuk hati ...',
  cat: 'sentence-final-modality',
  connection: 'V-te + やまない',
  desc: '<b>〜てやまない</b> menyatakan bahwa perasaan atau sikap tertentu terus berlanjut tanpa henti karena sangat kuat. Digunakan khusus untuk ekspresi perasaan positif yang mendalam seperti cinta, harapan, kekaguman, atau dukungan. Memberikan kesan ketulusan dan kedalaman emosional.',
  nuance: 'Hampir selalu digunakan dengan kata kerja emosi positif: 愛してやまない (mencintai sepenuh hati), 敬ってやまない (senantiasa menghormati), 願ってやまない (terus-menerus berharap). Tidak lazim dengan emosi negatif. Lebih kuat dan formal dari 〜続ける untuk ekspresi perasaan.',
  examples: [
    { jp: '私は故郷を愛してやまない。', id: 'Aku mencintai kampung halamanku dari lubuk hati yang paling dalam.' },
    { jp: '皆様のご活躍を願ってやまない。', id: 'Kami terus-menerus mendoakan kesuksesan dan kemajuan Anda semua.' },
    { jp: '恩師への敬意は、今も変わらずあってやまない。', id: 'Rasa hormat kepada guru yang berjasa tidak pernah pudar hingga kini.' }
  ],
  see_also_grammar: ['gn1-00132'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: 'Hampir eksklusif untuk perasaan positif — tidak lazim untuk emosi negatif.', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00132', level: 'n1', pattern: '〜を禁じ得ない',
  reading: '〜wo kinjienai',
  meaning: 'tidak bisa tidak merasakan ..., tidak tertahankan (rasa ...), diliputi rasa ...',
  cat: 'sentence-final-modality',
  connection: 'N (ekspresi emosi) + を禁じ得ない',
  desc: '<b>〜を禁じ得ない</b> menyatakan bahwa pembicara tidak mampu menahan atau menekan suatu perasaan karena begitu kuat. Berbeda dari 〜てやまない, pola ini sering digunakan untuk ekspresi emosi baik positif maupun negatif, termasuk indignasi, haru, kekhawatiran, atau simpati.',
  nuance: 'Kata benda yang mendahului biasanya adalah nomina emosi: 怒りを禁じ得ない (tidak bisa menahan amarah), 涙を禁じ得ない (tidak bisa menahan air mata), 驚きを禁じ得ない (tidak bisa menyembunyikan rasa terkejut). Lebih formal dari 〜ずにはいられない dan terasa lebih sastra.',
  examples: [
    { jp: 'その知らせを聞いて、悲しみを禁じ得なかった。', id: 'Setelah mendengar kabar itu, aku tidak bisa menahan rasa sedih.' },
    { jp: '子どもたちの努力に、感動を禁じ得ない。', id: 'Menghadapi usaha keras anak-anak itu, aku tidak bisa menahan rasa haru.' },
    { jp: '彼の無責任な態度には、怒りを禁じ得ない。', id: 'Menyaksikan sikapnya yang tidak bertanggung jawab, aku tidak bisa menahan amarah.' }
  ],
  see_also_grammar: ['gn1-00131', 'gn1-00130'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00133', level: 'n1', pattern: '〜ざるを得ない',
  reading: '〜zaru wo enai',
  meaning: 'terpaksa ..., tidak bisa tidak ..., tidak ada pilihan selain ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ざるを得ない (suru → せざるを得ない)',
  desc: '<b>〜ざるを得ない</b> menyatakan bahwa meskipun tidak diinginkan, seseorang terpaksa melakukan sesuatu karena tekanan situasi atau tidak ada pilihan lain. Mengandung nuansa keterpaksaan dan ketidakleluasaan.',
  nuance: 'Lebih formal dari 〜しかない atau 〜なければならない. Perbedaan utama: 〜ざるを得ない menekankan bahwa pilihan tersebut tidak disukai namun terpaksa diambil (keterpaksaan dari luar), sementara 〜なければならない lebih netral tentang sumber kewajiban. Sangat umum dalam konteks bisnis, hukum, dan tulisan formal.',
  examples: [
    { jp: '証拠が揃った以上、容疑者を逮捕せざるを得ない。', id: 'Karena buktinya sudah lengkap, tidak ada pilihan selain menangkap tersangka.' },
    { jp: '予算の削減で、プロジェクトを縮小せざるを得なくなった。', id: 'Karena pemotongan anggaran, kami terpaksa memperkecil skala proyek.' },
    { jp: '状況を考えると、同意せざるを得ない。', id: 'Kalau mempertimbangkan situasinya, aku tidak punya pilihan selain menyetujui.' }
  ],
  see_also_grammar: ['gn1-00134'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'Konjugasi: 書く→書かざるを得ない、する→せざるを得ない、来る→来ざるを得ない.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00134', level: 'n1', pattern: '〜を余儀なくされる',
  reading: '〜wo yoginaku sareru',
  meaning: 'dipaksa oleh keadaan untuk ..., tidak ada pilihan kecuali ... (karena situasi eksternal)',
  cat: 'passive',
  connection: 'N / V-plain + を余儀なくされる',
  desc: '<b>〜を余儀なくされる</b> menyatakan bahwa seseorang dipaksa oleh keadaan atau faktor eksternal untuk melakukan atau menerima sesuatu yang tidak diinginkan. Konstruksi ini bersifat pasif dan menekankan bahwa kekuatan dari luar yang memaksakan situasi tersebut.',
  nuance: 'Berbeda dari 〜ざるを得ない (yang lebih berfokus pada tidak adanya pilihan dari sudut pandang pembicara), 〜を余儀なくされる lebih bersifat pasif — penekanannya pada tekanan eksternal yang memaksa. Sering digunakan dalam berita atau laporan resmi tentang situasi krisis, bencana, atau keputusan sulit yang dipaksakan.',
  examples: [
    { jp: '地震の影響で、住民は避難を余儀なくされた。', id: 'Akibat gempa bumi, para penduduk terpaksa mengungsi.' },
    { jp: '業績悪化により、会社は大規模なリストラを余儀なくされた。', id: 'Akibat memburuknya kinerja, perusahaan terpaksa melakukan restrukturisasi besar-besaran.' },
    { jp: '悪天候のため、登山隊は撤退を余儀なくされた。', id: 'Karena cuaca buruk, tim pendaki terpaksa mundur.' }
  ],
  see_also_grammar: ['gn1-00133'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'Sering digunakan dalam konteks berita, laporan, dan tulisan akademik tentang situasi yang menekan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00135', level: 'n1', pattern: '〜にしてからが',
  reading: '〜ni shite kara ga',
  meaning: 'bahkan ..., yang seharusnya tidak pun ..., sampaipun ...',
  cat: 'expression',
  connection: 'N + にしてからが',
  desc: '<b>〜にしてからが</b> menyatakan bahwa bahkan entitas yang paling tidak terduga atau yang seharusnya memiliki standar lebih tinggi pun mengalami atau melakukan hal yang disebutkan. Menyoroti betapa ekstremnya situasi dengan menggunakan contoh yang paling mengejutkan.',
  nuance: 'Sangat mirip dengan 〜ですら dan 〜でさえ, namun lebih formal dan lebih kuat secara penekanan. 〜にしてからが secara khusus memilih contoh yang paling "tidak terduga" untuk menunjukkan bahwa jika entitas ini saja mengalaminya, maka situasinya benar-benar serius. Sering digunakan secara kritis.',
  examples: [
    { jp: '専門家にしてからが、この問題の解決策を見つけられないでいる。', id: 'Bahkan para ahli sekalipun belum bisa menemukan solusi untuk masalah ini.' },
    { jp: '親にしてからが、子どもに嘘をつくことがある。', id: 'Bahkan orang tua pun kadang berbohong kepada anaknya.' }
  ],
  see_also_grammar: ['gn1-00121'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00136', level: 'n1', pattern: '〜といえども',
  reading: '〜to iedo mo',
  meaning: 'meskipun ..., sekalipun ... (formal, dengan konsesi kuat)',
  cat: 'contrast-concession',
  connection: 'N / V-plain / Adj + といえども',
  desc: '<b>〜といえども</b> menyatakan konsesi kuat dalam bahasa yang sangat formal. Meskipun kondisi atau status yang disebutkan diakui, pernyataan utama tetap berlaku atau merupakan pengecualian. Sering mengandung nuansa prinsip yang tidak tergoyahkan meskipun menghadapi kondisi yang biasanya dianggap sebagai pengecualian.',
  nuance: 'Lebih formal dari 〜といっても dan 〜ても. Sering muncul dalam hukum, pidato kenegaraan, dan tulisan sastra. Memberikan kesan pernyataan prinsip yang kokoh. Berbeda dari 〜とも (yang lebih sastra/puitis), 〜といえども terasa lebih argumentatif dan logis.',
  examples: [
    { jp: '大統領といえども、法の上に立つことはできない。', id: 'Bahkan seorang presiden sekalipun tidak bisa berdiri di atas hukum.' },
    { jp: '緊急事態といえども、基本的人権は守られなければならない。', id: 'Meskipun dalam keadaan darurat sekalipun, hak asasi manusia dasar harus tetap dilindungi.' }
  ],
  see_also_grammar: ['gn1-00137', 'gn1-00122'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00137', level: 'n1', pattern: '〜といえど',
  reading: '〜to iedo',
  meaning: 'meskipun ..., sekalipun ... (sangat formal, literary)',
  cat: 'contrast-concession',
  connection: 'N / V-plain / Adj + といえど',
  desc: '<b>〜といえど</b> adalah bentuk yang lebih pendek dan lebih arkaik dari 〜といえども. Maknanya identik — menyatakan konsesi bahwa meskipun kondisi tertentu diakui, pernyataan utama tetap berlaku. Muncul terutama dalam karya sastra klasik, puisi, atau teks sangat formal.',
  nuance: 'Hampir tidak digunakan dalam percakapan maupun tulisan modern biasa. Muncul sebagian besar dalam konteks sastra, puisi, atau dokumen bersejarah. Lebih arkaik dari 〜といえども yang juga formal. Bagi ujian JLPT, penting untuk mengenali bentuk ini sebagai pasif form recognition.',
  examples: [
    { jp: '春といえど、山の頂にはまだ雪が残る。', id: 'Meskipun sudah musim semi, salju masih tersisa di puncak gunung.' },
    { jp: '友といえど、秘密を話すべきではなかった。', id: 'Meskipun itu seorang teman, seharusnya aku tidak menceritakan rahasianya.' }
  ],
  see_also_grammar: ['gn1-00136'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: 'Bentuk lebih pendek (〜といえど) vs. lengkap (〜といえども). Maknanya identik; perbedaannya hanya pada register dan konteks penggunaan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00138', level: 'n1', pattern: '〜ものとして',
  reading: '〜mono to shite',
  meaning: 'dengan anggapan bahwa ..., berdasarkan asumsi bahwa ..., menganggap bahwa ...',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとして',
  desc: '<b>〜ものとして</b> menyatakan bahwa sesuatu dijadikan sebagai asumsi atau anggapan dasar dalam konteks tertentu. Digunakan ketika seseorang bertindak atau membuat keputusan berdasarkan anggapan tertentu, meskipun kenyataannya belum pasti atau belum dikonfirmasi.',
  nuance: 'Berbeda dari 〜ものとする (yang menetapkan aturan) dan 〜ものとみなす (yang secara resmi menggolongkan sesuatu), 〜ものとして lebih bersifat operasional dan kontekstual — digunakan untuk menyatakan asumsi kerja dalam perencanaan, diskusi, atau simulasi.',
  examples: [
    { jp: '全員が参加するものとして、会場の手配を進めてください。', id: 'Tolong lanjutkan persiapan venue dengan anggapan bahwa semua orang akan hadir.' },
    { jp: '試験に合格したものとして、入学後の計画を立てておこう。', id: 'Dengan anggapan sudah lulus ujian, mari buat rencana setelah masuk.' }
  ],
  see_also_grammar: ['gn1-00139', 'gn1-00140'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00139', level: 'n1', pattern: '〜ものとする',
  reading: '〜mono to suru',
  meaning: 'ditetapkan bahwa ..., berlaku ketentuan bahwa ..., diatur bahwa ...',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとする',
  desc: '<b>〜ものとする</b> digunakan dalam dokumen hukum, peraturan, kontrak, dan regulasi untuk menyatakan bahwa suatu kondisi atau aturan ditetapkan dan berlaku. Menyatakan bahwa sesuatu diperlakukan atau diatur sebagaimana yang disebutkan secara resmi.',
  nuance: 'Ini adalah bahasa hukum dan birokratis yang khas. Sering ditemukan di pasal-pasal kontrak, peraturan perusahaan, atau undang-undang. Berbeda dari 〜ものとして (yang menyatakan asumsi operasional), 〜ものとする menetapkan kewajiban atau aturan yang mengikat.',
  examples: [
    { jp: '本契約は、双方が署名した日から有効になるものとする。', id: 'Perjanjian ini ditetapkan berlaku sejak tanggal ditandatangani oleh kedua belah pihak.' },
    { jp: '費用は甲が負担するものとする。', id: 'Ditetapkan bahwa biaya ditanggung oleh Pihak Pertama.' },
    { jp: '違反した場合は、会員資格を失うものとする。', id: 'Ditetapkan bahwa apabila melanggar, status keanggotaan akan dicabut.' }
  ],
  see_also_grammar: ['gn1-00138', 'gn1-00140'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'Eksklusif untuk konteks hukum, regulasi, kontrak, dan dokumen resmi. Tidak digunakan dalam percakapan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00140', level: 'n1', pattern: '〜ものとみなす',
  reading: '〜mono to minasu',
  meaning: 'dianggap sebagai ..., diperlakukan sebagai ... (secara resmi/hukum)',
  cat: 'expression',
  connection: 'V-plain / N + である + ものとみなす',
  desc: '<b>〜ものとみなす</b> menyatakan bahwa sesuatu secara resmi digolongkan, diperlakukan, atau dianggap sebagai hal tertentu — terlepas dari kondisi aktualnya. Digunakan dalam konteks hukum, regulasi, dan dokumen resmi untuk menetapkan suatu fiksi hukum atau standar klasifikasi.',
  nuance: 'Dibandingkan dengan 〜ものとする (yang menetapkan aturan atau kewajiban), 〜ものとみなす lebih berfokus pada klasifikasi atau penggolongan. Ini adalah "fiksi hukum" — bahkan jika kondisi aktualnya berbeda, secara hukum diperlakukan seolah-olah memenuhi kondisi tersebut. Eksklusif untuk bahasa hukum dan birokratis.',
  examples: [
    { jp: '届け出がない場合、同意したものとみなす。', id: 'Apabila tidak ada pemberitahuan, dianggap telah menyetujui.' },
    { jp: '期日までに返答がない場合、辞退したものとみなします。', id: 'Apabila tidak ada jawaban hingga batas waktu, akan dianggap mengundurkan diri.' },
    { jp: '本規約に同意した場合、成人と同等の資格を持つものとみなす。', id: 'Apabila menyetujui ketentuan ini, akan dianggap memiliki kualifikasi setara orang dewasa.' }
  ],
  see_also_grammar: ['gn1-00138', 'gn1-00139'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'Sering muncul dalam klausul kontrak, peraturan asosiasi, dan undang-undang. Pola ini menciptakan "fiksi hukum" — sesuatu diperlakukan seolah-olah memenuhi kondisi tertentu demi tujuan hukum.',
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
