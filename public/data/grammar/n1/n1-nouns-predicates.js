// ──────────────────────────────────────────────────────────────
//  n1-nouns-predicates.js — Nugget Nihongo · JLPT N1 Grammar
//  2 entries | Category: nouns-predicates
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Nouns_Predicates = [

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
}

];
