// ──────────────────────────────────────────────────────────────
//  n1-conditionals.js — Nugget Nihongo · JLPT N1 Grammar
//  11 entries | Category: conditionals
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Conditionals = [

{
  id: 'gn1-00001', level: 'n1', pattern: '〜いかんによって／〜いかんで', reading: '〜ikan ni yotte / ikan de',
  meaning: 'tergantung pada ... (sangat formal)',
  cat: 'conditional-tara',
  connection: 'N + いかんによって / N + いかんで',
  desc: '<b>〜いかんによって</b> (atau <b>〜いかんで</b>) menyatakan bahwa hasil sepenuhnya bergantung pada isi atau keadaan sesuatu. Sering digunakan dalam pengumuman, surat resmi, dan regulasi.',
  nuance: null,
  examples: [
    { jp: '試験の結果<b>いかんによって</b>、採用が決まる。', id: 'Keputusan penerimaan ditentukan tergantung pada hasil ujian.' },
    { jp: '今後の対応<b>いかんで</b>、契約を更新するかどうか判断します。', id: 'Keputusan perpanjangan kontrak akan ditentukan tergantung pada tindakan selanjutnya.' },
    { jp: '天候<b>いかんによって</b>、イベントは中止になることもある。', id: 'Bergantung pada cuaca, acara bisa saja dibatalkan.' }
  ],
  see_also_grammar: ['gn1-00002'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00054', 'gn1-00168', 'gn1-00002'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00054', level: 'n1', pattern: '〜ようによっては', reading: '〜you ni yotte wa',
  meaning: 'tergantung bagaimana cara ... / bergantung pada cara melakukan ...',
  cat: 'conditional-tara',
  connection: 'V-stem + ようによっては',
  desc: '<b>〜ようによっては</b> menyatakan bahwa hasil bisa berbeda tergantung pada cara atau metode melakukan X. Menekankan bahwa cara/pendekatan (ように) adalah faktor penentu.',
  nuance: null,
  examples: [
    { jp: '言い方<b>ようによっては</b>、同じ内容でも相手に伝わり方が変わる。', id: 'Tergantung cara mengatakannya, pesan yang sama bisa tersampaikan dengan cara yang berbeda.' },
    { jp: '使い<b>ようによっては</b>、この道具はとても便利だ。', id: 'Tergantung cara menggunakannya, alat ini bisa sangat berguna.' },
    { jp: '考え<b>ようによっては</b>、この状況もチャンスと言える。', id: 'Tergantung cara memandangnya, situasi ini pun bisa disebut sebagai peluang.' }
  ],
  see_also_grammar: ['gn1-00055'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00055'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00055', level: 'n1', pattern: '〜次第では', reading: '〜shidai de wa',
  meaning: 'tergantung bagaimana ... / bergantung pada hasil ...',
  cat: 'conditional-tara',
  connection: 'N + 次第では',
  desc: '<b>〜次第では</b> menyatakan bahwa tindakan atau hasil Y akan berbeda tergantung pada kondisi atau hasil dari N. Menekankan bahwa N adalah variabel penentu — bisa ke arah mana saja.',
  nuance: null,
  examples: [
    { jp: '交渉の結果<b>次第では</b>、計画を変更することもある。', id: 'Tergantung hasil negosiasi, ada kemungkinan rencana perlu diubah.' },
    { jp: '天候<b>次第では</b>、イベントが中止になる可能性がある。', id: 'Tergantung cuaca, ada kemungkinan acara dibatalkan.' },
    { jp: '彼の返事<b>次第では</b>、こちらも対応を変える必要がある。', id: 'Tergantung jawabannya, kita pun mungkin perlu mengubah respons kita.' }
  ],
  see_also_grammar: ['gn1-00054'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00243', 'gn1-00054', 'gn2-00019', 'gn2-00241', 'gn2-00272', 'gn2-00274', 'gn1-00110'],
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
  nuance: null,
  examples: [
    { jp: 'あなたのため<b>とあれば</b>、どこへでも参ります。', id: 'Demi kamu, saya siap pergi ke mana saja.' },
    { jp: '必要<b>とあれば</b>、夜を徹して作業します。', id: 'Kalau memang diperlukan, saya siap bekerja semalam suntuk.' }
  ],
  see_also_grammar: ['gn1-00077', 'gn1-00078'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00035', 'gn2-00090', 'gn2-00223'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00077', level: 'n1', pattern: '〜ともなると',
  reading: '〜to mo naru to',
  meaning: 'kalau sudah mencapai level ... / begitu sudah menjadi ... (konsekuensi yang wajar mengikuti)',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなると',
  desc: '<b>〜ともなると</b> menyatakan bahwa begitu seseorang atau sesuatu mencapai tingkat atau status tertentu, konsekuensi tertentu secara alami dan tak terelakkan mengikutinya. Menekankan kelogisan konsekuensi pada level tersebut.',
  nuance: null,
  examples: [
    { jp: '部長<b>ともなると</b>、背負う責任も格段に大きくなる。', id: 'Kalau sudah jadi manajer, tanggung jawab yang dipikul pun jauh lebih besar.' },
    { jp: 'この規模のプロジェクト<b>ともなると</b>、管理だけで一苦労だ。', id: 'Kalau sudah proyek sebesar ini, pengelolaannya saja sudah susah payah.' }
  ],
  see_also_grammar: ['gn1-00078', 'gn1-00076'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00078', 'gn1-00102'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00078', level: 'n1', pattern: '〜ともなれば',
  reading: '〜to mo nareba',
  meaning: 'kalau sudah sampai pada level ... / begitu sudah menjadi ... (varian hipotetis dari ともなると)',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなれば',
  desc: '<b>〜ともなれば</b> adalah varian dari 〜ともなると dengan makna yang sangat mirip — menyatakan bahwa di status atau kondisi tertentu, suatu konsekuensi adalah hal yang wajar. Menggunakan ば-form sehingga terasa sedikit lebih hipotetis.',
  nuance: null,
  examples: [
    { jp: '社長<b>ともなれば</b>、孤独な決断を迫られることも多い。', id: 'Kalau sudah menjadi direktur, banyak pula keputusan sulit yang harus diambil sendiri.' },
    { jp: '有名人<b>ともなれば</b>、プライバシーの確保が難しくなる。', id: 'Kalau sudah jadi orang terkenal, menjaga privasi pun menjadi sulit.' }
  ],
  see_also_grammar: ['gn1-00077', 'gn1-00076'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00077', 'gn1-00101'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00083', level: 'n1', pattern: '〜が最後 / 〜たが最後',
  reading: '〜ga saigo / 〜ta ga saigo',
  meaning: 'begitu ..., sudah tidak bisa balik lagi; sekali ..., akibat buruk pasti menyusul',
  cat: 'conditional-tara',
  connection: 'V-ta + が最後',
  desc: '<b>〜たが最後</b> menyatakan bahwa begitu suatu tindakan dilakukan, akibat negatif atau tak terelakkan pasti akan terjadi dan tidak ada jalan kembali. Digunakan untuk situasi di mana satu langkah merupakan titik of no return.',
  nuance: null,
  examples: [
    { jp: '彼に秘密を話し<b>たが最後</b>、翌日には皆に知られてしまう。', id: 'Sekali kamu cerita rahasia ke dia, keesokan harinya semua orang pasti sudah tahu.' },
    { jp: 'あのゲームを始め<b>たが最後</b>、止められなくなる。', id: 'Begitu kamu mulai main game itu, kamu tidak akan bisa berhenti lagi.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00131'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00101', level: 'n1', pattern: '〜ともなると',
  reading: '〜to mo naru to',
  meaning: 'ketika sudah mencapai level ..., kalau sudah sampai taraf ...; begitu sudah menjadi ...',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなると',
  desc: '<b>〜ともなると</b> menyatakan bahwa ketika seseorang atau sesuatu mencapai suatu level, status, atau tahapan tertentu, hal-hal tertentu secara alami muncul atau diharapkan. Menekankan perubahan yang terjadi seiring dengan naiknya level atau status.',
  nuance: null,
  examples: [
    { jp: '社会人3年目<b>ともなると</b>、ある程度の責任ある仕事を任されるようになる。', id: 'Begitu sudah tahun ketiga bekerja, secara alami mulai dipercaya dengan pekerjaan yang cukup bertanggung jawab.' },
    { jp: 'プロのアスリート<b>ともなると</b>、練習の質も量も一般人とは全然違う。', id: 'Kalau sudah menjadi atlet profesional, baik kualitas maupun kuantitas latihannya sangat berbeda dari orang biasa.' },
  ],
  see_also_grammar: ['gn1-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00078'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00102', level: 'n1', pattern: '〜ともなれば',
  reading: '〜to mo nareba',
  meaning: 'kalau sudah menjadi ..., jika sudah berada di posisi/level ...; pada kondisi seperti itu sudah sewajarnya ...',
  cat: 'conditional-tara',
  connection: 'N / V-dictionary + ともなれば',
  desc: '<b>〜ともなれば</b> menyatakan bahwa jika seseorang atau sesuatu mencapai level atau status tertentu, maka suatu sikap, tanggung jawab, atau situasi tertentu sudah sewajarnya ada atau diharapkan muncul. Lebih normatif dari 〜ともなると.',
  nuance: null,
  examples: [
    { jp: '一国のリーダー<b>ともなれば</b>、言葉の一つ一つに責任が伴う。', id: 'Jika sudah menjadi pemimpin suatu negara, setiap kata yang diucapkan membawa tanggung jawab.' },
    { jp: '親<b>ともなれば</b>、子どもの将来を真剣に考えるものだ。', id: 'Kalau sudah menjadi orang tua, sudah sewajarnya memikirkan masa depan anak dengan serius.' },
  ],
  see_also_grammar: ['gn1-00101'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00077'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00110', level: 'n1', pattern: '〜いかんによっては / 〜いかんによらず',
  reading: '〜ikan ni yotte wa / 〜ikan ni yorazu',
  meaning: 'tergantung bagaimana ..., bergantung pada keadaan ...; (varian: terlepas dari bagaimana pun)',
  cat: 'conditional-tara',
  connection: 'N + いかんによっては / いかんによって / いかんによらず / いかんを問わず',
  desc: '<b>〜いかんによっては</b> menyatakan bahwa hasil atau tindakan tergantung pada kondisi atau keadaan yang disebutkan. 〜いかんによらず / いかんを問わず adalah varian dengan makna sebaliknya: terlepas dari bagaimana pun keadaannya, tetap berlaku.',
  nuance: null,
  examples: [
    { jp: '交渉の結果<b>いかんによっては</b>、契約を白紙に戻すこともありえる。', id: 'Tergantung bagaimana hasil negosiasi, ada kemungkinan kontrak akan dibatalkan sepenuhnya.' },
    { jp: '成績<b>いかんによっては</b>、奨学金の継続が難しくなる場合があります。', id: 'Bergantung pada bagaimana nilai akademisnya, perpanjangan beasiswa mungkin menjadi sulit.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00055', 'gn2-00143'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00114', level: 'n1', pattern: '〜をもってすれば',
  reading: '〜wo motte sureba',
  meaning: 'kalau menggunakan ..., dengan kemampuan/kekuatan ..., bermodal ...',
  cat: 'conditional-tara',
  connection: 'N + をもってすれば',
  desc: '<b>〜をもってすれば</b> menyatakan bahwa dengan menggunakan kemampuan, kekuatan, atau sumber daya tertentu, sesuatu yang mungkin tampak sulit pun dapat tercapai. Sering mengandung nuansa pujian atau pengakuan terhadap kemampuan yang disebut.',
  nuance: null,
  examples: [
    { jp: '彼女の能力<b>をもってすれば</b>、この難題も解決できるはずだ。', id: 'Dengan kemampuan yang ia miliki, masalah sulit ini pun seharusnya bisa diselesaikan.' },
    { jp: '最新技術<b>をもってすれば</b>、不可能なことはない。', id: 'Dengan teknologi terkini, tidak ada yang tidak mungkin.' }
  ],
  see_also_grammar: ['gn1-00115'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00003', 'gn1-00066', 'gn1-00115'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
