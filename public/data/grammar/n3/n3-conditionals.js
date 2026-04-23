// ──────────────────────────────────────────────────────────────
//  n3-conditionals.js — Nugget Nihongo · JLPT N3 Grammar
//  4 entries | Category: conditionals
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN3_Conditionals = [

{
    id         : 'gn3-00013',
    level      : 'n3',
    pattern    : '〜としたら / 〜とすれば',
    reading    : '〜to shitara / to sureba',
    meaning    : 'seandainya ... / jika misalnya ...',
    cat        : 'conditional-tara',
    connection : 'V/Adj plain / N + としたら / とすれば',
    desc       : '<b>〜としたら / 〜とすれば</b> digunakan untuk kondisi hipotetis: "seandainya", "andai kata". Menyatakan kondisi yang masih dalam perkiraan atau belum terjadi.',
    nuance     : null,
    examples   : [
      { jp: '宝くじが当たったと<b>したら</b>、何をしますか。', id: 'Seandainya menang lotre, apa yang akan kamu lakukan?' },
      { jp: '彼が正直に言ったと<b>すれば</b>、信じます。', id: 'Seandainya dia berkata jujur, saya percaya.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn3-00014',
    level      : 'n3',
    pattern    : '〜ば〜ほど',
    reading    : '〜ba〜hodo',
    meaning    : 'semakin ... semakin ...',
    cat        : 'conditional-tara',
    connection : 'Vば + Vる + ほど / Adj-ければ + Adj + ほど',
    desc       : '<b>〜ば〜ほど</b> menyatakan hubungan proporsional: semakin satu hal meningkat, semakin hal lain juga meningkat.',
    nuance     : null,
    examples   : [
      { jp: '練習すれ<b>ば</b>する<b>ほど</b>、上手になります。', id: 'Semakin banyak berlatih, semakin mahir.' },
      { jp: '考えれ<b>ば</b>考える<b>ほど</b>、わからなくなる。', id: 'Semakin dipikir, semakin tidak mengerti.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn3-00017',
    level      : 'n3',
    pattern    : 'もし〜たなら / 〜たら',
    reading    : 'moshi〜ta nara / tara',
    meaning    : 'seandainya / kalau saja (hipotetis kuat)',
    cat        : 'conditional-tara',
    connection : 'もし + V/Adj + たなら / たら',
    desc       : '<b>もし〜たなら</b> memperkuat nuansa hipotetis atau tidak nyata dari kondisi.',
    nuance     : null,
    examples   : [
      { jp: '<b>もし</b>昨日来られていた<b>なら</b>、会えたのに。', id: 'Seandainya kemarin bisa datang, pasti bisa bertemu.' },
      { jp: '<b>もし</b>一人で住んでいた<b>ら</b>、何を作りますか。', id: 'Kalau tinggal sendiri, apa yang akan kamu masak?' },
    ],
    see_also_grammar : ['gn3-00013'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
  id: 'gn3-00139',
  level: 'n3',
  pattern: '〜ないことには',
  reading: '~nai koto ni wa',
  meaning: 'kalau tidak ..., tanpa ... tidak mungkin ...',
  cat: 'conditional-tara',
  connection: 'V-ない + ことには / N + でないことには',
  desc: '<b>〜ないことには</b> menyatakan kondisi yang harus dipenuhi terlebih dahulu agar sesuatu yang lain bisa terjadi. Klausa setelah ことには biasanya berisi ungkapan negatif seperti 〜ない、〜できない、〜わからない. Artinya: "tanpa melakukan X, Y tidak mungkin terjadi".',
  nuance: 'Berbeda dari 〜なければ yang merupakan syarat umum, 〜ないことには secara khusus menekankan bahwa tanpa memenuhi kondisi tersebut, hasil yang diharapkan mustahil tercapai. Pola ini lebih menekankan ketergantungan mutlak antara kondisi dan hasil.',
  examples: [
    { jp: '実際に試し<b>てみないことには</b>、わからない。', id: 'Kalau tidak mencoba langsung, tidak akan tahu hasilnya.' },
    { jp: '本人に会わ<b>ないことには</b>、判断できない。', id: 'Tanpa bertemu orangnya langsung, tidak bisa membuat keputusan.' },
    { jp: '努力し<b>ないことには</b>、夢は叶わない。', id: 'Tanpa usaha, impian tidak akan terwujud.' },
  ],
  see_also_grammar: ['gn3-00138'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
