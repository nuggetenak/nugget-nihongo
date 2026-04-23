// ──────────────────────────────────────────────────────────────
//  n5-connectives.js — Nugget Nihongo · JLPT N5 Grammar
//  7 entries | Category: connectives
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Connectives = [

{
    id         : 'gn5-00065',
    level      : 'n5',
    pattern    : '〜から (alasan)',
    reading    : '〜kara',
    meaning    : 'karena ... (alasan)',
    cat        : 'reason-cause',
    connection : '文 (plain/polite) + から',
    desc       : '<b>〜から</b> menghubungkan dua kalimat sebagai alasan dan akibat: "karena X, maka Y". Lebih tegas dan subjektif dari ので.',
    nuance     : null,
    examples   : [
      { jp: 'あめが<b>ふっているから</b>、でかけません。', id: 'Karena sedang hujan, tidak keluar.' },
      { jp: 'びょうきです<b>から</b>、がっこうをやすみます。', id: 'Karena sakit, tidak masuk sekolah.' },
    ],
    see_also_grammar : ['gn5-00066'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00066',
    level      : 'n5',
    pattern    : '〜ので',
    reading    : '〜node',
    meaning    : 'karena ... (alasan sopan)',
    cat        : 'reason-cause',
    connection : 'V/Adj plain + ので / N/Adj-na + な + ので',
    desc       : '<b>〜ので</b> menyatakan alasan dengan nuansa lebih objektif dan sopan dari から. Digunakan di konteks formal dan saat memberikan penjelasan kepada orang yang lebih tua/senior.',
    nuance     : 'ので lebih halus dan tidak terkesan memaksakan pendapat.',
    examples   : [
      { jp: 'あしたしけんがある<b>ので</b>、はやくねます。', id: 'Karena besok ada ujian, tidur lebih awal.' },
      { jp: 'いそがしい<b>ので</b>、てつだえません。', id: 'Karena sibuk, tidak bisa membantu.' },
    ],
    see_also_grammar : ['gn5-00065'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00067',
    level      : 'n5',
    pattern    : '〜が (tapi)',
    reading    : '〜ga',
    meaning    : 'tapi / namun (kontras)',
    cat        : 'listing-addition',
    connection : '文1 + が + 文2',
    desc       : '<b>〜が</b> sebagai konjungsi menghubungkan dua kalimat yang kontras atau bertentangan: "..., tapi...".',
    nuance     : 'Bisa juga digunakan sebagai pengantar halus tanpa kontras yang kuat.',
    examples   : [
      { jp: 'にほんごはすきです<b>が</b>、むずかしいです。', id: 'Suka bahasa Jepang, tapi susah.' },
      { jp: 'まいにちれんしゅうします<b>が</b>、まだじょうずじゃないです。', id: 'Latihan setiap hari, tapi belum mahir.' },
    ],
    see_also_grammar : ['gn5-00068'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00068',
    level      : 'n5',
    pattern    : '〜けど / 〜けれど',
    reading    : '〜kedo / keredomo',
    meaning    : 'tapi / walaupun (kasual)',
    cat        : 'listing-addition',
    connection : '文1 + けど / けれど(も) + 文2',
    desc       : '<b>〜けど</b> adalah bentuk lebih kasual dari が sebagai konjungsi kontras. <b>けれど</b> sedikit lebih formal. <b>けれども</b> paling formal.',
    nuance     : null,
    examples   : [
      { jp: 'やってみた<b>けど</b>、できなかった。', id: 'Sudah dicoba, tapi tidak bisa.' },
      { jp: 'たかい<b>けど</b>、かいます。', id: 'Mahal, tapi beli.' },
    ],
    see_also_grammar : ['gn5-00067'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00071',
    level      : 'n5',
    pattern    : '〜という',
    reading    : '〜to iu',
    meaning    : 'yang bernama ... / yang disebut ...',
    cat        : 'quotation-thought',
    connection : 'N1 + という + N2',
    desc       : '<b>〜という</b> digunakan untuk memperkenalkan atau menjelaskan nama/sebutan sesuatu: "X yang bernama Y".',
    nuance     : null,
    examples   : [
      { jp: '「さくら」<b>という</b>えいがをみましたか。', id: 'Sudah menonton film yang berjudul "Sakura"?' },
      { jp: 'やまだ<b>という</b>ひとがきました。', id: 'Datang seseorang bernama Yamada.' },
    ],
    see_also_grammar : ['gn5-00072'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00072',
    level      : 'n5',
    pattern    : '〜と言っています',
    reading    : '〜to itte imasu',
    meaning    : 'mengatakan bahwa ...',
    cat        : 'quotation-thought',
    connection : '「...」 + と + 言っています / 言いました',
    desc       : '<b>〜と言っています</b> melaporkan perkataan orang lain secara tidak langsung. Kutipan sebelum と menggunakan bentuk plain.',
    nuance     : null,
    examples   : [
      { jp: 'かれはあした<b>くると言っています</b>。', id: 'Dia bilang akan datang besok.' },
      { jp: 'ははは「はやくかえって」<b>と言いました</b>。', id: 'Ibu bilang "pulang cepat".' },
    ],
    see_also_grammar : ['gn5-00071'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00076',
    level      : 'n5',
    pattern    : '〜し',
    reading    : '〜shi',
    meaning    : 'dan juga ... (menghubungkan alasan)',
    cat        : 'listing-addition',
    connection : 'V/Adj plain / N (+ だ) + し',
    desc       : '<b>〜し</b> menghubungkan beberapa alasan atau kondisi yang mendukung satu simpulan. Sering digunakan untuk memberikan alasan yang berlapis.',
    nuance     : 'Berbeda dari から/ので: し tidak menunjuk satu alasan saja, melainkan beberapa faktor.',
    examples   : [
      { jp: 'やすい<b>し</b>、おいしい<b>し</b>、このみせがすきです。', id: 'Karena murah dan enak, suka toko ini.' },
      { jp: 'あめ<b>だし</b>、つかれてる<b>し</b>、でかけたくない。', id: 'Hujan, capek, tidak mau keluar.' },
    ],
    see_also_grammar : ['gn5-00065', 'gn5-00066'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  }

];
