// ──────────────────────────────────────────────────────────────
//  n3-nouns-predicates.js — Nugget Nihongo · JLPT N3 Grammar
//  4 entries | Category: nouns-predicates
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN3_Nouns_Predicates = [

{
    id         : 'gn3-00063',
    level      : 'n3',
    pattern    : '〜ということ',
    reading    : '〜to iu koto',
    meaning    : 'hal bahwa ... / fakta bahwa ...',
    cat        : 'nominalization',
    connection : 'V/Adj plain / N + ということ',
    desc       : '<b>〜ということ</b> mengubah klausa menjadi nomina yang lebih abstrak atau umum: "hal bahwa", "fakta bahwa".',
    nuance     : null,
    examples   : [
      { jp: '彼が来ない<b>ということ</b>を、みんなに伝えてください。', id: 'Tolong sampaikan kepada semua orang bahwa dia tidak akan datang.' },
      { jp: '諦めない<b>ということ</b>が大切です。', id: 'Hal bahwa kita tidak menyerah itu penting.' },
    ],
    see_also_grammar : ['gn3-00062', 'gn3-00031'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn3-00064',
    level      : 'n3',
    pattern    : '〜というのは',
    reading    : '〜to iu no wa',
    meaning    : 'yang disebut ... adalah / maksud dari ... adalah',
    cat        : 'copula',
    connection : 'N / 「...」 + というのは + 文',
    desc       : '<b>〜というのは</b> digunakan untuk mendefinisikan atau menjelaskan suatu istilah atau pernyataan.',
    nuance     : null,
    examples   : [
      { jp: '「武士道」<b>というのは</b>、侍の倫理規範のことです。', id: '"Bushido" adalah norma etika para samurai.' },
      { jp: '行きたくない<b>というのは</b>、本当ですか。', id: 'Apakah benar bahwa kamu tidak mau pergi?' },
    ],
    see_also_grammar : ['gn3-00062'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn3-00097',
    level      : 'n3',
    pattern    : '〜のを',
    reading    : '〜no wo',
    meaning    : 'hal ... / tindakan ... (nominalisasi objek)',
    cat        : 'nominalization',
    connection : 'V + の + を + V',
    desc       : '<b>〜のを</b> menominalisasi klausa verba dan menjadikannya objek dari verba lain. Sering dengan verba persepsi (見る, 聞く, 知る) atau verba emosi.',
    nuance     : null,
    examples   : [
      { jp: '彼が走っている<b>のを</b>見た。', id: 'Saya melihat dia sedang berlari.' },
      { jp: '財布を落とした<b>のを</b>気づかなかった。', id: 'Tidak menyadari bahwa dompet terjatuh.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn3-00103',
    level      : 'n3',
    pattern    : '〜み (nominalisasi adjektif)',
    reading    : '〜mi',
    meaning    : 'rasa ... / kesan ... (nominalisasi adjektif)',
    cat        : 'nominalization',
    connection : 'Adj-i語幹 + み',
    desc       : '<b>〜み</b> mengubah adjektif menjadi nomina yang menyatakan kualitas atau kesan yang dirasakan. Berbeda dari さ yang lebih objektif.',
    nuance     : 'さ = ukuran objektif; み = kesan/rasa yang dirasakan.',
    examples   : [
      { jp: 'この物語には深<b>み</b>がある。', id: 'Kisah ini punya kedalaman.' },
      { jp: '子どもらし<b>い</b>かわいら<b>しみ</b>があります。', id: 'Ada kepolosan yang menggemaskan khas anak-anak.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : 'Tidak semua adjektif bisa membentuk 〜み. Yang umum: 深み, 甘み, 辛み, 面白み, 親しみ.',
  }

];
