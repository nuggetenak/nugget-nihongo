// ──────────────────────────────────────────────────────────────
//  n2-conditionals.js — Nugget Nihongo · JLPT N2 Grammar
//  18 entries | Category: conditionals
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN2_Conditionals = [

{
    id: 'gn2-00006', level: 'n2', pattern: '〜上で', reading: '〜ue de',
    meaning: 'setelah ... / dalam hal ... / dari segi ...',
    cat: 'conditional-tara',
    connection: 'V-た / N + の + 上で',
    desc: '<b>〜上で</b> memiliki dua makna: (1) setelah melakukan sesuatu sebagai syarat; (2) dari segi / dalam konteks.',
    examples: [
      { jp: 'よく考えた<b>上で</b>、決めてください。', id: 'Setelah berpikir baik-baik, silakan putuskan.' },
      { jp: '仕事の<b>上で</b>の悩みを話した。', id: 'Saya berbicara tentang masalah dalam pekerjaan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00019', level: 'n2', pattern: '〜次第', reading: '〜shidai',
    meaning: '(1) segera setelah ... (2) tergantung pada ...',
    cat: 'conditional-tara',
    connection: 'V-stem / N + 次第',
    desc: '<b>〜次第</b> bermakna ganda: (1) segera setelah tindakan selesai; (2) bergantung pada kondisi yang disebutkan.',
    examples: [
      { jp: '準備ができ<b>次第</b>、出発します。', id: 'Segera setelah persiapan selesai, kami akan berangkat.' },
      { jp: '結果<b>次第</b>で、方針が変わります。', id: 'Kebijakan akan berubah tergantung pada hasilnya.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00047', level: 'n2', pattern: '〜さえ〜ば', reading: '〜sae 〜ba',
  meaning: 'asalkan ... / kalau saja ... (satu syarat cukup)',
  cat: 'conditional-tara',
  connection: 'N + さえ + V-ba / Adj-kereba / N + でさえあれば',
  desc: '<b>〜さえ〜ば</b> menyatakan bahwa jika satu syarat kunci terpenuhi, maka segalanya akan baik-baik saja. Satu kondisi itu sudah cukup untuk menghasilkan hasil yang diharapkan.',
  nuance: 'Menekankan bahwa syarat yang disebutkan adalah satu-satunya yang diperlukan. Berbeda dari さえ〜ても yang mengungkapkan kondisi ekstrem tetapi hasilnya tetap berlawanan.',
  examples: [
    { jp: 'お金<b>さえ</b>あれ<b>ば</b>、何でもできる。', id: 'Asalkan ada uang, apa pun bisa dilakukan.' },
    { jp: '健康<b>でさえあれば</b>、それで十分だ。', id: 'Asalkan sehat, itu sudah cukup.' },
    { jp: '彼が来て<b>さえくれれば</b>、問題ない。', id: 'Asalkan dia mau datang, tidak ada masalah.' }
  ],
  see_also_grammar: ['gn2-00048'], see_also_vocab: [],
  confusion_pairs: ['gn2-00048'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00054', level: 'n2', pattern: '〜次第で', reading: '〜shidai de',
  meaning: 'tergantung pada ... (hasilnya bisa berbeda)',
  cat: 'conditional-tara',
  connection: 'N + 次第で / 次第では',
  desc: '<b>〜次第で</b> menyatakan bahwa hasil atau kondisi akhir sepenuhnya ditentukan oleh faktor yang disebutkan. Faktor itu menjadi penentu utama.',
  nuance: 'Menekankan variabilitas hasil bergantung pada satu faktor. Berbeda dari 次第だ (kesimpulan/penjelasan keadaan) — 次第で selalu diikuti kondisi atau akibat yang berubah-ubah.',
  examples: [
    { jp: '努力<b>次第で</b>、結果は変わる。', id: 'Tergantung pada usaha, hasilnya bisa berubah.' },
    { jp: '天気<b>次第で</b>、ピクニックを中止するかもしれない。', id: 'Tergantung cuaca, piknik mungkin akan dibatalkan.' },
    { jp: '返事<b>次第では</b>、計画を変更する必要がある。', id: 'Tergantung jawabannya, mungkin perlu mengubah rencana.' }
  ],
  see_also_grammar: ['gn2-00055'], see_also_vocab: [],
  confusion_pairs: ['gn2-00055'],
  register: null, exceptions: null, notes: '次第では (dengan は) menambah nuansa kondisional yang lebih kuat — "kalau sampai ..."',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00089', level: 'n2', pattern: '〜とあれば', reading: '〜to areba',
  meaning: 'kalau memang ... — rela melakukan apapun / demi ...',
  cat: 'conditional-tara',
  connection: 'V-plain / N + とあれば',
  desc: '<b>〜とあれば</b> menyatakan bahwa jika suatu kondisi tertentu terpenuhi, pembicara rela atau bersedia melakukan apa saja. Biasanya mengungkapkan kesediaan atau pengorbanan yang kuat.',
  nuance: 'Lebih kuat dari なら. Menyiratkan "apapun akan saya lakukan demi ...". Sering digunakan untuk mengungkapkan kesetiaan, dedikasi, atau pengorbanan tanpa syarat.',
  examples: [
    { jp: '君のため<b>とあれば</b>、何でもするよ。', id: 'Kalau memang demi kamu, aku akan lakukan apa saja.' },
    { jp: '会社の存続<b>とあれば</b>、給料カットも仕方がない。', id: 'Kalau memang demi kelangsungan perusahaan, pemotongan gaji pun tidak apa-apa.' },
    { jp: '子供のため<b>とあれば</b>、親は何でも惜しまない。', id: 'Kalau demi anak, orang tua tidak akan segan melakukan apapun.' }
  ],
  see_also_grammar: ['gn2-00090'], see_also_vocab: [],
  confusion_pairs: ['gn2-00090'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00090', level: 'n2', pattern: '〜とあっては', reading: '〜to atte wa',
  meaning: 'dalam kondisi seperti ini ... / mengingat keadaan yang ...',
  cat: 'conditional-tara',
  connection: 'V-plain / N + とあっては',
  desc: '<b>〜とあっては</b> menyatakan bahwa mengingat kondisi atau situasi tertentu yang sudah ada, suatu konsekuensi logis tidak bisa dihindari.',
  nuance: 'Berbeda dari とあれば (kesediaan aktif dari dalam diri). とあっては menekankan tekanan dari situasi yang sudah ada — "menghadapi kenyataan ini, tidak ada pilihan lain selain ...".',
  examples: [
    { jp: '社長自らの命令<b>とあっては</b>、従わないわけにはいかない。', id: 'Mengingat ini perintah langsung dari presiden direktur, tidak ada pilihan selain mematuhi.' },
    { jp: 'これほどの非常事態<b>とあっては</b>、冷静でいるのは難しい。', id: 'Dalam kondisi darurat seserius ini, sulit untuk tetap tenang.' },
    { jp: '彼女の一言<b>とあっては</b>、断れない。', id: 'Kalau sudah kata-kata darinya, tidak bisa menolak.' }
  ],
  see_also_grammar: ['gn2-00089'], see_also_vocab: [],
  confusion_pairs: ['gn2-00089'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00099',
  level: 'n2',
  pattern: '〜いかんによって',
  reading: '〜ikan ni yotte',
  meaning: 'tergantung pada ... / bergantung bagaimana ...',
  cat: 'conditional-tara',
  connection: 'N + いかんによって / いかんによっては',
  desc: '<b>〜いかんによって</b> menyatakan bahwa hasil atau tindakan bergantung pada kondisi atau variabel tertentu yang disebutkan.',
  nuance: 'Kebalikan nuansa dari いかんにかかわらず: di sini kondisi MENENTUKAN hasil. Formal. いかんによっては (dengan は) menambahkan nuansa "ada kemungkinan tertentu bergantung pada kondisi".',
  examples: [
    { jp: '交渉の結果<b>いかんによっては</b>、契約を見直す可能性がある。', id: 'Tergantung hasil negosiasinya, ada kemungkinan kontrak perlu ditinjau ulang.' },
    { jp: '対応<b>いかんによって</b>、顧客の信頼を失うこともある。', id: 'Tergantung bagaimana penanganannya, kepercayaan pelanggan bisa hilang.' }
  ],
  see_also_grammar: ['gn2-00097'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00097'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00104',
  level: 'n2',
  pattern: '〜に応じて',
  reading: '〜ni ojite',
  meaning: 'sesuai dengan ... / menyesuaikan dengan ... / bergantung pada ...',
  cat: 'conditional-tara',
  connection: 'N + に応じて / に応じた (+ N)',
  desc: '<b>〜に応じて</b> menyatakan bahwa sesuatu berubah atau disesuaikan mengikuti kondisi, permintaan, atau situasi yang disebutkan.',
  nuance: 'Menekankan fleksibilitas atau penyesuaian: hasilnya bervariasi tergantung X. Sangat umum dalam konteks bisnis, regulasi, dan pendidikan. Bedakan dengan に基づいて (berdasarkan) — に応じて lebih menekankan dinamika penyesuaian.',
  examples: [
    { jp: '状況<b>に応じて</b>対応を変える必要がある。', id: 'Perlu mengubah respons sesuai situasi yang berkembang.' },
    { jp: '収入<b>に応じて</b>税額が決まります。', id: 'Jumlah pajak ditentukan sesuai pendapatan.' }
  ],
  see_also_grammar: ['gn2-00105', 'gn2-00099'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00105'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00105',
  level: 'n2',
  pattern: '〜に応じた',
  reading: '〜ni ojita',
  meaning: 'yang disesuaikan dengan ... / yang sesuai dengan ...',
  cat: 'conditional-tara',
  connection: 'N + に応じた + N (bentuk atributif)',
  desc: '<b>〜に応じた</b> adalah bentuk atributif (prenominal) dari に応じて, digunakan langsung sebelum nomina untuk menyatakan "N yang disesuaikan dengan X".',
  nuance: 'Secara semantis sama dengan に応じて, tapi posisinya adalah modifier nomina. Sangat umum dalam konteks kebijakan, pendidikan, dan layanan. Pelajar sering lupa bahwa bentuk atributif memakai た, bukan て.',
  examples: [
    { jp: '個人の能力<b>に応じた</b>学習計画を作成してください。', id: 'Tolong buat rencana belajar yang disesuaikan dengan kemampuan masing-masing individu.' },
    { jp: 'ニーズ<b>に応じた</b>サービスを提供することが重要だ。', id: 'Penting untuk menyediakan layanan yang disesuaikan dengan kebutuhan pelanggan.' }
  ],
  see_also_grammar: ['gn2-00104'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00104'],
  register: null,
  exceptions: null,
  notes: '〜に応じた adalah bentuk adjektival dari に応じて. Selalu diikuti nomina, bukan predikat.',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00187', level: 'n2', pattern: '〜ようでは',
  reading: '〜you de wa',
  meaning: 'kalau sampai ..., kalau kondisinya seperti itu ...',
  cat: 'conditional-tara',
  connection: 'V-plain + ようでは / い-Adj-plain + ようでは / N + の + ようでは',
  desc: '<b>〜ようでは</b> menyatakan kondisi hipotetis yang tidak diinginkan sebagai dasar untuk penilaian negatif atau peringatan. Mengungkapkan bahwa jika kondisi demikian memang terjadi, maka hasilnya akan bermasalah.',
  nuance: 'Sering diikuti oleh kalimat berisi penilaian negatif, peringatan, atau konsekuensi buruk. Berbeda dari たら/なら (kondisional umum) — ようでは mengandung nuansa evaluatif: "kalau sampai kondisi seburuk itu terjadi, ada sesuatu yang serius." Sering digunakan oleh atasan atau orang yang lebih tua.',
  examples: [
    { jp: 'こんな簡単な問題も解けない<b>ようでは</b>、試験は無理だ。', id: 'Kalau soal semudah ini saja tidak bisa diselesaikan, ujiannya tidak akan berhasil.' },
    { jp: '部下の名前も覚えていない<b>ようでは</b>、リーダーとして失格だ。', id: 'Kalau sampai nama bawahannya sendiri tidak hafal, itu tidak layak sebagai pemimpin.' }
  ],
  see_also_grammar: ['gn2-00188'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00188'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00188', level: 'n2', pattern: '〜ようでは困る',
  reading: '〜you de wa komaru',
  meaning: 'tidak baik kalau sampai ..., tidak bisa dibiarkan kalau ...',
  cat: 'conditional-tara',
  connection: 'V-plain + ようでは困る / い-Adj-plain + ようでは困る',
  desc: '<b>〜ようでは困る</b> adalah pola spesifik dari ようでは yang diikuti 困る — menyatakan bahwa suatu kondisi atau perilaku yang disebutkan tidak bisa diterima atau bermasalah. Sering digunakan untuk menyampaikan ketidakpuasan atau peringatan kepada orang yang dinilai.',
  nuance: 'Pada dasarnya adalah ようでは + ekspresi konsekuensi negatif 困る. Digunakan dalam konteks evaluasi atau teguran — lebih spesifik dan langsung dari ようでは + kalimat umum. Sering terdengar dalam percakapan atasan ke bawahan atau guru ke murid.',
  examples: [
    { jp: '毎回遅刻する<b>ようでは困る</b>。', id: 'Tidak bisa dibiarkan kalau setiap kali selalu datang terlambat.' },
    { jp: '指示を一度しか言わないのに聞いていない<b>ようでは困る</b>。', id: 'Tidak baik kalau instruksi yang hanya disampaikan sekali saja tidak diperhatikan.' }
  ],
  see_also_grammar: ['gn2-00187'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00187'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00198',
  level: 'n2',
  pattern: '〜を条件に',
  reading: '~wo jouken ni',
  meaning: 'dengan syarat ..., asalkan ...',
  cat: 'conditional-tara',
  connection: 'N + を条件に(して) / V-plain + ことを条件に',
  desc: '<b>〜を条件に</b> menyatakan bahwa suatu tindakan atau persetujuan baru akan berlaku jika syarat tertentu terpenuhi. Syarat ini bersifat aktif dan harus benar-benar dipenuhi — berbeda dari asumsi yang sudah diterima. Pola ini sering muncul dalam konteks negosiasi, perjanjian, atau izin.',
  nuance: 'Berbeda dengan 〜を前提に (gn2-00197) yang menyatakan asumsi yang sudah dianggap ada, 〜を条件に menyatakan syarat yang harus dipenuhi terlebih dahulu agar sesuatu bisa terjadi. Nuansanya lebih tegas dan kondisional — ada tawar-menawar atau kesepakatan yang sedang dibentuk.',
  examples: [
    { jp: '毎日練習すること<b>を条件に</b>、チームへの入部を許可した。', id: 'Dengan syarat berlatih setiap hari, dia diizinkan masuk tim.' },
    { jp: '秘密を守ること<b>を条件に</b>、話してあげた。', id: 'Asalkan merahasiakannya, saya ceritakan kepadanya.' },
    { jp: '給料の引き上げ<b>を条件に</b>、残業に応じた。', id: 'Dengan syarat kenaikan gaji, dia menyetujui lembur.' },
  ],
  see_also_grammar: ['gn2-00197'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00220',
  level: 'n2',
  pattern: '〜次第で',
  reading: '~shidai de',
  meaning: 'tergantung pada ..., bergantung pada ...',
  cat: 'conditional-tara',
  connection: 'N + 次第で / 次第だ / 次第では',
  desc: '<b>〜次第で</b> menyatakan bahwa hasil atau kondisi sepenuhnya bergantung pada hal yang disebutkan. Mengandung makna bahwa faktor tersebut adalah penentu yang krusial — jika berbeda, hasilnya pun akan berbeda. Bentuk 〜次第では menambahkan nuansa "tergantung pada situasinya, bisa jadi...".',
  nuance: 'Berbeda dengan 〜によって (tergantung — lebih umum dan deskriptif), 〜次第で mengandung nuansa bahwa pembicara menekankan betapa pentingnya faktor penentu tersebut — sering bermakna "semuanya tergantung pada". Berbeda juga dengan 〜しだいだ yang menyatakan "tergantung, bukan wewenang saya". Perhatikan konteks untuk membedakan keduanya.',
  examples: [
    { jp: '努力<b>次第で</b>、結果は変わる。', id: 'Hasilnya akan berubah tergantung pada usaha yang dilakukan.' },
    { jp: 'やり方<b>次第で</b>、うまくいくこともある。', id: 'Tergantung caranya, bisa saja berhasil.' },
    { jp: '状況<b>次第では</b>、計画を変更する可能性もある。', id: 'Tergantung situasi, ada kemungkinan rencana akan diubah.' },
  ],
  see_also_grammar: ['gn2-00195'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: '〜次第では = 「場合によっては」のニュアンスが加わる。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00222', level: 'n2', pattern: '〜とあれば',
  reading: '〜to areba',
  meaning: 'kalau memang ... / jika situasinya demikian maka (rela melakukan)',
  cat: 'conditional-tara',
  connection: 'N / phrase + とあれば',
  desc: '<b>〜とあれば</b> menyatakan bahwa jika kondisi atau alasan yang disebutkan terpenuhi, maka pembicara bersedia atau merasa harus melakukan sesuatu. Mengandung nuansa kerelaan atau dorongan kuat karena situasinya.',
  nuance: 'Berbeda dari とあっては (gn2-00223) — とあれば lebih menekankan kerelaan/kesediaan sebagai respons terhadap kondisi tertentu. Sering digunakan dalam makna "demi ... saya siap melakukan apa saja." Berbeda dari なら yang lebih netral — とあれば mengimplikasikan kondisi yang luar biasa atau bermakna penting.',
  examples: [
    { jp: '子供のためと<b>あれば</b>、どんな苦労も厭わない。', id: 'Kalau memang demi anak, tidak ada kesulitan yang tidak rela aku tanggung.' },
    { jp: '彼女の頼みと<b>あれば</b>、断れない。', id: 'Kalau memang itu permintaannya, aku tidak bisa menolak.' },
  ],
  see_also_grammar: ['gn2-00223', 'gn2-00224'], see_also_vocab: [],
  confusion_pairs: ['gn2-00223'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00240', level: 'n2', pattern: '〜いかん',
  reading: '〜ikan',
  meaning: 'tergantung bagaimana / bergantung pada ... (formal)',
  cat: 'conditional-tara',
  connection: 'N + いかん',
  desc: '<b>〜いかん</b> menyatakan bahwa sesuatu bergantung pada kondisi atau cara yang disebutkan. Merupakan ekspresi formal yang sering muncul dalam konteks administratif, hukum, atau tulisan resmi.',
  nuance: 'Setara dengan 〜次第 (しだい) dalam makna, namun いかん jauh lebih formal. Kata ini berasal dari 如何 yang berarti "bagaimana." Berbeda dari いかんによっては (gn2-00241) yang menekankan variasi kemungkinan — いかん lebih umum menyatakan ketergantungan tersebut.',
  examples: [
    { jp: '今後の対応<b>いかん</b>では、契約を解除することになる。', id: 'Tergantung bagaimana penanganan ke depannya, bisa saja kontrak dibatalkan.' },
    { jp: '結果<b>いかん</b>によって、次の対策を検討する。', id: 'Tergantung pada hasilnya, kami akan mempertimbangkan langkah selanjutnya.' },
  ],
  see_also_grammar: ['gn2-00241', 'gn2-00242', 'gn2-00243', 'gn2-00244'], see_also_vocab: [],
  confusion_pairs: ['gn2-00241', 'gn2-00244'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00241', level: 'n2', pattern: '〜いかんによっては',
  reading: '〜ikan ni yotte wa',
  meaning: 'tergantung bagaimana ... / bergantung pada kondisi/hasil ...',
  cat: 'conditional-tara',
  connection: 'N + いかんによっては',
  desc: '<b>〜いかんによっては</b> menyatakan bahwa bergantung pada kondisi atau hasilnya, konsekuensi tertentu mungkin terjadi. Menekankan bahwa ada kemungkinan perubahan atau variasi berdasarkan kondisi yang disebutkan.',
  nuance: 'Lebih spesifik dari いかん (gn2-00240) karena mengisyaratkan adanya kemungkinan tertentu yang bergantung pada kondisi. Sering digunakan dalam konteks ancaman halus, peringatan, atau pengambilan keputusan kondisional. Berbeda dari いかんにかかわらず (gn2-00242) yang justru menyatakan "tidak bergantung pada."',
  examples: [
    { jp: '検査の結果<b>いかんによっては</b>、入院が必要になるかもしれない。', id: 'Tergantung hasil pemeriksaan, mungkin diperlukan rawat inap.' },
    { jp: '今後の態度<b>いかんによっては</b>、処分を検討することになる。', id: 'Bergantung pada sikap ke depannya, akan dipertimbangkan sanksi.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00242', 'gn2-00243'], see_also_vocab: [],
  confusion_pairs: ['gn2-00240', 'gn2-00242', 'gn2-00243'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00243', level: 'n2', pattern: '〜いかんで',
  reading: '〜ikan de',
  meaning: 'tergantung pada ... / ditentukan oleh ... (formal/tertulis)',
  cat: 'conditional-tara',
  connection: 'N + いかんで',
  desc: '<b>〜いかんで</b> menyatakan bahwa sesuatu ditentukan atau dipengaruhi oleh kondisi yang disebutkan. Digunakan dalam konteks formal untuk menyatakan ketergantungan langsung pada suatu faktor.',
  nuance: 'Secara fungsi mirip dengan いかんによっては (gn2-00241), namun いかんで lebih menekankan hubungan kausal langsung — "X-lah yang menentukan Y." Sedikit lebih langsung dibanding いかんによっては yang lebih menekankan kemungkinan. Keduanya formal, namun いかんで sering dipakai dalam pernyataan singkat.',
  examples: [
    { jp: 'この交渉の成否は、あなたの判断<b>いかんで</b>決まる。', id: 'Berhasil atau tidaknya negosiasi ini ditentukan oleh keputusanmu.' },
    { jp: '今後の努力<b>いかんで</b>、昇進の可能性もある。', id: 'Tergantung pada usahamu ke depan, ada kemungkinan promosi jabatan.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00241', 'gn2-00244'], see_also_vocab: [],
  confusion_pairs: ['gn2-00241'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00244', level: 'n2', pattern: '〜如何',
  reading: '〜ikan (penulisan kanji resmi dari いかん)',
  meaning: 'tergantung pada ... (sangat formal/tertulis)',
  cat: 'conditional-tara',
  connection: 'N + 如何',
  desc: '<b>〜如何</b> adalah penulisan kanji dari いかん — digunakan dalam dokumen sangat formal seperti peraturan perusahaan, surat resmi, dan pengumuman pemerintah. Maknanya identik dengan いかんで dan いかんによっては, namun levelnya lebih tinggi.',
  nuance: '如何 dan いかん secara makna sama, namun 如何 hampir eksklusif muncul dalam tulisan resmi seperti hukum, peraturan, atau dokumen bisnis formal. Dalam percakapan, bentuk ini tidak pernah digunakan. Perhatian: 如何 juga bisa dibaca いかが (pertanyaan "bagaimana?") dalam konteks yang berbeda — beda pembacaan, beda makna.',
  examples: [
    { jp: '応募の合否は書類審査の結果<b>如何</b>による。', id: 'Diterima atau tidaknya lamaran bergantung pada hasil seleksi dokumen.' },
    { jp: '今後の対応<b>如何</b>では、法的措置も辞さない。', id: 'Tergantung penanganan ke depan, tindakan hukum pun tidak akan dihindari.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00243'], see_also_vocab: [],
  confusion_pairs: ['gn2-00240'],
  register: 'formal', exceptions: null, notes: '如何 juga dapat dibaca いかが (bagaimana?) dalam konteks lain — berbeda makna.',
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
