// ──────────────────────────────────────────────────────────────
//  n4-nouns-predicates.js — Nugget Nihongo · JLPT N4 Grammar
//  3 entries | Category: nouns-predicates
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN4_Nouns_Predicates = [

{
    id         : 'gn4-00051',
    level      : 'n4',
    pattern    : '〜の (nominalisasi)',
    reading    : '〜no',
    meaning    : 'hal ... / tindakan ... (nominalisasi)',
    cat        : 'nominalization',
    connection : 'V/Adj plain + の + は/が/を',
    desc       : '<b>〜の</b> mengubah verba atau frasa menjadi nomina. Lebih informal dari こと. Sering digunakan untuk kegiatan konkret yang dapat dirasakan.',
    nuance     : 'の lebih cocok untuk pengalaman langsung (見る, 聞く, 感じる); こと lebih abstrak/umum.',
    examples   : [
      { jp: '歌う<b>の</b>が好きです。', id: 'Saya suka bernyanyi.' },
      { jp: '彼が走っている<b>の</b>を見ました。', id: 'Saya melihat dia sedang berlari.' },
    ],
    see_also_grammar : ['gn4-00052'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn4-00052',
    level      : 'n4',
    pattern    : '〜こと (nominalisasi)',
    reading    : '〜koto',
    meaning    : 'hal ... / fakta bahwa ... (nominalisasi)',
    cat        : 'nominalization',
    connection : 'V/Adj plain + こと + は/が/を/etc.',
    desc       : '<b>〜こと</b> mengubah verba atau frasa menjadi nomina abstrak. Digunakan dalam ekspresi formal dan aturan.',
    nuance     : null,
    examples   : [
      { jp: '毎日練習する<b>こと</b>が大切です。', id: 'Berlatih setiap hari adalah hal yang penting.' },
      { jp: '彼女が結婚する<b>こと</b>を知りました。', id: 'Saya tahu bahwa dia akan menikah.' },
    ],
    see_also_grammar : ['gn4-00051'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn4-00070',
    level      : 'n4',
    pattern    : '形容詞 + さ',
    reading    : 'keiyoushi + sa',
    meaning    : 'tingkat ... / derajat ... (nominalisasi adjektif)',
    cat        : 'nominalization',
    connection : 'Adj-i語幹 + さ / Adj-na + さ',
    desc       : '<b>〜さ</b> mengubah adjektif menjadi nomina yang menyatakan tingkat atau derajat kualitas tersebut.',
    nuance     : null,
    examples   : [
      { jp: 'この山の高<b>さ</b>は3000メートルです。', id: 'Ketinggian gunung ini adalah 3000 meter.' },
      { jp: '彼の優し<b>さ</b>に感動しました。', id: 'Saya terkesan dengan kebaikannya.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  }

];
