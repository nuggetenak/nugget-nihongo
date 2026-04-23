// ──────────────────────────────────────────────────────────────
//  n1-adverbs.js — Nugget Nihongo · JLPT N1 Grammar
//  3 entries | Category: adverbs
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Adverbs = [

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
  id: 'gn1-00180',
  level: 'n1',
  pattern: '〜かねがね',
  reading: '〜kanegane',
  meaning: 'sudah lama (ingin/berpikir) ..., sejak dulu ... (adverbia waktu)',
  cat: 'adverb',
  connection: 'かねがね + V (terutama 思う, 聞く, 存じる)',
  desc: '<b>〜かねがね</b> adalah adverbia yang menyatakan bahwa sesuatu sudah ada dalam pikiran atau keinginan pembicara sejak lama — jauh sebelum momen yang dibicarakan. Sering digunakan dalam konteks pertemuan, perkenalan, atau ungkapan yang menunjukkan antusiasme yang telah lama tersimpan.',
  nuance: 'Sangat mirip dengan 〜かねてから (gn1-00181), tetapi かねがね lebih terasa seperti adverbia perasaan/niat pribadi yang sudah lama ada ("sudah lama saya ingin..."), sedangkan かねてから lebih condong ke rencana atau persiapan yang sudah lama dilakukan. かねがね hampir selalu berpasangan dengan kata kerja seperti 思う, 聞く, 存じる. Bersifat formal dan sering terdengar dalam sapaan resmi.',
  examples: [
    { jp: '<b>かねがね</b>お会いしたいと思っておりました。', id: 'Sudah lama saya ingin bertemu dengan Anda.' },
    { jp: '<b>かねがね</b>ご評判は伺っておりました。', id: 'Sudah lama saya mendengar reputasi Anda.' },
    { jp: '<b>かねがね</b>この地を訪れたいと思っていた。', id: 'Sudah lama saya ingin mengunjungi tempat ini.' },
  ],
  see_also_grammar: ['gn1-00181'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00181'],
  register: 'formal',
  exceptions: null,
  notes: 'Hampir selalu berpasangan dengan verba niat atau persepsi (思う, 聞く, 存じる). Umum dalam ucapan pembuka atau sapaan resmi.',
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
  nuance: 'Sangat mirip dengan かねがね (gn1-00180), namun かねてから lebih sering digunakan dengan rencana, impian, atau ambisi yang sudah lama dipendam dan akhirnya terwujud. かねがね lebih condong ke perasaan/niat yang diekspresikan kepada orang lain dalam konteks sopan. かねてから bisa muncul bersama kata kerja yang menunjukkan realisasi (実現する, 叶える).',
  examples: [
    { jp: '<b>かねてから</b>の夢がついに実現した。', id: 'Impian yang sudah lama tersimpan akhirnya terwujud.' },
    { jp: '<b>かねてから</b>計画していた事業をスタートさせた。', id: 'Usaha yang sudah lama direncanakan akhirnya dimulai.' },
    { jp: '<b>かねてから</b>交流のある団体と協定を結んだ。', id: 'Perjanjian dibuat dengan organisasi yang sudah lama menjalin hubungan.' },
  ],
  see_also_grammar: ['gn1-00180'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00180'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
