// ──────────────────────────────────────────────────────────────
//  n1-verb-forms.js — Nugget Nihongo · JLPT N1 Grammar
//  5 entries | Category: verb-forms
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Verb_Forms = [

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
}

];
