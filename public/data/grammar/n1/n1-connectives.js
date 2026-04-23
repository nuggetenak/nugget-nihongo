// ──────────────────────────────────────────────────────────────
//  n1-connectives.js — Nugget Nihongo · JLPT N1 Grammar
//  51 entries | Category: connectives
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Connectives = [

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
  id: 'gn1-00168',
  level: 'n1',
  pattern: '〜によって',
  reading: '〜ni yotte',
  meaning: 'melalui ..., disebabkan oleh ..., bergantung pada ..., oleh ...',
  cat: 'reason-cause',
  connection: 'N + によって',
  desc: '<b>〜によって</b> adalah partikel majemuk serba guna dengan beberapa fungsi utama: (1) menyatakan agen dalam kalimat pasif ("oleh ..."), (2) menyatakan cara atau metode ("melalui/dengan cara ..."), (3) menyatakan penyebab ("disebabkan oleh ..."), dan (4) menyatakan variasi bergantung pada kondisi ("tergantung pada ...").',
  nuance: 'Pola ini sangat polisemantik. Fungsi "agen pasif" (彼によって書かれた = ditulis olehnya) adalah yang paling mendasar. Fungsi "variasi" (人によって違う = berbeda tergantung orangnya) bersifat khas. Berbeda dari 〜をもって (gn1-00169) yang lebih formal dan digunakan dengan cara/sarana resmi, 〜によって lebih umum. Bentuk prenominal adalah 〜による.',
  examples: [
    { jp: 'この橋は地震<b>によって</b>崩壊した。', id: 'Jembatan ini runtuh disebabkan oleh gempa bumi.' },
    { jp: '結果は努力<b>によって</b>大きく変わる。', id: 'Hasil bisa berubah besar bergantung pada usaha.' },
    { jp: '新技術<b>によって</b>、生産効率が上がった。', id: 'Melalui teknologi baru, efisiensi produksi meningkat.' },
  ],
  see_also_grammar: ['gn1-00169'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00169'],
  register: null,
  exceptions: null,
  notes: 'Bentuk prenominal: 〜による + N (misalnya, 地震による被害 = kerusakan akibat gempa).',
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
  nuance: 'Ini adalah bentuk yang lebih eksplisit kontrastif dari 〜つつ (gn1-00185). Berbeda dari 〜ながら (gn1-00184) yang bisa simultan atau kontrastif, 〜つつも selalu kontrastif. Lebih formal dan lebih sering menggambarkan konflik batin (misalnya tahu bahwa itu salah tapi tetap melakukan). Berbeda dari 〜にもかかわらず yang lebih objektif, 〜つつも mengandung nuansa subjektif dan internal.',
  examples: [
    { jp: '悪いと思い<b>つつも</b>、つい言ってしまった。', id: 'Meskipun merasa itu salah, terpeleset mengatakannya juga.' },
    { jp: '迷い<b>つつも</b>、最終的には参加することにした。', id: 'Meskipun ragu-ragu, akhirnya memutuskan untuk ikut.' },
    { jp: '反対し<b>つつも</b>、上司の判断に従った。', id: 'Meskipun menentang, ia mengikuti keputusan atasannya.' },
  ],
  see_also_grammar: ['gn1-00185', 'gn1-00184'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00185', 'gn1-00184'],
  register: 'formal',
  exceptions: null,
  notes: 'Sering menggambarkan konflik batin. も memperkuat nuansa kontras.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
