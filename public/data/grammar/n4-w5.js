// DATA — N4 第5週 (Soumatome N4 Bunpou)
// 第5週 · 読解文型 — Partikel Lanjutan, Kondisional, Ekspresi
// Enriched v14.4.8

const N4_W5 = [

// ── 第5週 1日目 ── 読解文型 (reading patterns)
  {id:'n4-w5d1-01', level:'n4', week:5, day:1, cat:'partikel',
   grammar:'〜について', reading:'ni tsuite',
   meaning:'tentang; mengenai; berkaitan dengan',
   connection:'Noun + について',
   desc:'Menyatakan <strong>topik yang dibahas, dipelajari, atau diteliti</strong>. Setara dengan "tentang" atau "mengenai" dalam bahasa Indonesia. Bisa diikuti kata kerja seperti 話す, 考える, 書く, 知る.',
   nuance:'Bedakan dengan に関して (ni kanshite) yang lebih formal dan biasa untuk dokumen resmi/tulisan akademik. について lebih umum dan fleksibel. Juga bedakan にとって yang berarti "bagi/menurut (seseorang)" — artinya berbeda sama sekali.',
   examples:[
     {jp:'日本の文化<b>について</b>、レポートを書きました。', id:'Saya menulis laporan tentang budaya Jepang.'},
     {jp:'あなたの夢<b>について</b>、聞かせてください。', id:'Ceritakanlah kepada saya tentang impianmu.'},
     {jp:'先生は環境問題<b>について</b>、くわしく説明してくれた。', id:'Guru menjelaskan secara rinci tentang masalah lingkungan.'}
   ]},

  {id:'n4-w5d1-02', level:'n4', week:5, day:1, cat:'sebab',
   grammar:'〜によって / 〜による', reading:'ni yotte / ni yoru',
   meaning:'tergantung pada; karena; oleh; melalui',
   connection:'Noun + によって / Noun + による + Noun',
   desc:'Memiliki <strong>tiga makna utama</strong>: ① agen/pelaku pasif (oleh siapa/apa), ② variasi dan perbedaan (tergantung pada), ③ cara atau metode (dengan cara/melalui). による digunakan sebelum nomina sebagai bentuk atributif.',
   nuance:'Tiga makna perlu dibedakan dari konteks: ① 彼によって書かれた (ditulis oleh dia) = agen pasif, ② 国によって違う (berbeda tergantung negara) = variasi, ③ 努力によって成功する (berhasil melalui kerja keras) = cara. Jangan campur dengan によると (menurut sumber/katanya).',
   examples:[
     {jp:'天気<b>によって</b>、気分が変わります。', id:'Suasana hati berubah tergantung cuaca.'},
     {jp:'この法律は政府<b>によって</b>作られました。', id:'Undang-undang ini dibuat oleh pemerintah.'},
     {jp:'練習<b>によって</b>、だれでも上手になれる。', id:'Melalui latihan, siapa pun bisa menjadi mahir.'}
   ]},

// ── 第5週 2日目 ── 読解文型 (reading patterns)
  {id:'n4-w5d2-01', level:'n4', week:5, day:2, cat:'partikel',
   grammar:'〜として', reading:'to shite',
   meaning:'sebagai; dalam kapasitas sebagai; berperan sebagai',
   connection:'Noun + として',
   desc:'Menyatakan <strong>peran, fungsi, status, atau kapasitas seseorang/sesuatu</strong>. Setara dengan "sebagai" dalam bahasa Indonesia ketika menekankan peran yang dimainkan, bukan sekadar identitas. として + wa (としては) menambahkan nuansa evaluasi.',
   nuance:'Bedakan: 先生として (sebagai guru = peran/kapasitas) vs 先生に (kepada guru = arah/tujuan). Bentuk としては menambah nuansa "dilihat dari sudut pandang X": 学生としてはよくできた = lumayan baik untuk ukuran seorang pelajar.',
   examples:[
     {jp:'彼女は通訳<b>として</b>働いています。', id:'Dia bekerja sebagai penerjemah.'},
     {jp:'友達<b>として</b>、正直に言わなければなりません。', id:'Sebagai teman, saya harus berbicara jujur.'},
     {jp:'この映画は教材<b>として</b>も使えます。', id:'Film ini juga bisa digunakan sebagai bahan ajar.'}
   ]},

  {id:'n4-w5d2-02', level:'n4', week:5, day:2, cat:'partikel',
   grammar:'〜に対して', reading:'ni taishite',
   meaning:'terhadap; kepada; berbeda dengan; berlawanan dengan',
   connection:'Noun + に対して / Noun + に対する + Noun',
   desc:'Menyatakan <strong>sasaran suatu tindakan, sikap, atau perasaan</strong>, atau digunakan untuk <strong>membandingkan dua hal yang berlawanan</strong>. に対する digunakan sebelum nomina sebagai bentuk atributif.',
   nuance:'Ada dua nuansa utama: ① sasaran sikap/tindakan: 子供に対して優しくする (bersikap baik terhadap anak), ② kontras: 男性が30人であるのに対して、女性は10人だ (sedangkan). Nuansa ② mirip dengan が/けど tetapi lebih formal dan tertulis.',
   examples:[
     {jp:'先生は学生<b>に対して</b>、いつも親切です。', id:'Guru selalu bersikap baik terhadap para murid.'},
     {jp:'彼の意見<b>に対して</b>、みんなが反対した。', id:'Semua orang menentang pendapatnya.'},
     {jp:'兄が背が高い<b>のに対して</b>、弟は低い。', id:'Berbeda dengan kakak yang tinggi, adik bertubuh pendek.'}
   ]},

// ── 第5週 3日目 ── 読解文型 (reading patterns)
  {id:'n4-w5d3-01', level:'n4', week:5, day:3, cat:'kondisional',
   grammar:'〜場合は / 〜場合に', reading:'baai wa / baai ni',
   meaning:'dalam hal; jika terjadi; apabila; dalam situasi',
   connection:'Noun の / Verb (plain) + 場合は',
   desc:'Menyatakan <strong>kondisi hipotetis atau situasi tertentu yang mungkin terjadi</strong>, lalu memberikan instruksi atau hasil. Lebih formal dari たら/ば dan sering muncul dalam panduan, peraturan, pengumuman, atau instruksi tertulis.',
   nuance:'Berbeda dengan たら yang lebih umum dan personal, 場合は lebih netral dan formal — cocok untuk aturan atau prosedur. Perhatikan: 〜の場合 (setelah nomina) vs 〜た場合 (setelah verba bentuk lampau = dalam hal sudah terjadi) vs 〜る場合 (dalam hal akan terjadi).',
   examples:[
     {jp:'緊急の<b>場合は</b>、このボタンを押してください。', id:'Dalam keadaan darurat, tekan tombol ini.'},
     {jp:'雨の<b>場合は</b>、イベントは中止になります。', id:'Jika hujan, acara akan dibatalkan.'},
     {jp:'カードを失くした<b>場合は</b>、すぐにご連絡ください。', id:'Jika kehilangan kartu, segera hubungi kami.'}
   ]},

  {id:'n4-w5d3-02', level:'n4', week:5, day:3, cat:'kondisional',
   grammar:'〜さえ〜ば', reading:'sae~ba',
   meaning:'asalkan; cukup dengan; selama ada; bahkan jika hanya',
   connection:'Noun + さえ + Verb (ba-conditional) / Verb (て) + さえいれば',
   desc:'Menyatakan bahwa <strong>satu syarat saja sudah cukup</strong> untuk mencapai suatu hasil. Menekankan bahwa hanya hal itulah yang penting — "kalau syarat minimum ini terpenuhi, sisanya tidak masalah". Mengandung nuansa harapan atau keyakinan.',
   nuance:'さえ dapat diganti dengan でさえ untuk penekanan lebih kuat ("bahkan X pun"). Untuk verba: Vて+さえいれば (asalkan terus melakukan). Jangan gunakan さえ〜ば pada kondisi yang sudah pasti terjadi — harus bersifat hipotetis.',
   examples:[
     {jp:'健康<b>さえあれば</b>、何でもできる。', id:'Asalkan ada kesehatan, segalanya bisa dilakukan.'},
     {jp:'あなた<b>さえいれば</b>、私は幸せです。', id:'Asalkan kamu ada, aku sudah bahagia.'},
     {jp:'毎日練習し<b>さえすれば</b>、必ず上手になります。', id:'Asalkan berlatih setiap hari, pasti akan mahir.'}
   ]},

// ── 第5週 4日目 ── 読解文型 (reading patterns)
  {id:'n4-w5d4-01', level:'n4', week:5, day:4, cat:'ekspresi',
   grammar:'〜てよかった', reading:'te yokatta',
   meaning:'syukurlah; untunglah; senang karena telah melakukan',
   connection:'Verb (て-form) + よかった',
   desc:'Mengungkapkan <strong>rasa lega atau syukur atas tindakan yang sudah dilakukan</strong>. Pembicara merasa puas karena tindakan tersebut ternyata menghasilkan hal yang baik. Kebalikannya: 〜なければよかった (seharusnya tidak melakukan itu).',
   nuance:'Bedakan: Vてよかった = lega karena sudah melakukan, sedangkan Vなくてよかった = lega karena tidak jadi melakukan. Contoh: 行ってよかった (syukurlah pergi) vs 行かなくてよかった (syukurlah tidak pergi). Konteks menentukan maknanya.',
   examples:[
     {jp:'傘を持ってきて<b>よかった</b>。急に雨が降ったから。', id:'Syukurlah saya membawa payung. Tiba-tiba hujan turun.'},
     {jp:'早めに予約し<b>てよかった</b>。もう満席らしい。', id:'Untunglah saya pesan lebih awal. Katanya sudah penuh.'},
     {jp:'日本語を勉強し<b>てよかった</b>と、今でも思います。', id:'Sampai sekarang saya merasa bersyukur sudah belajar bahasa Jepang.'}
   ]},

  {id:'n4-w5d4-02', level:'n4', week:5, day:4, cat:'ekspresi',
   grammar:'〜てすみません / 〜てごめんなさい', reading:'te sumimasen / te gomen nasai',
   meaning:'maaf karena telah melakukan; mohon maaf sudah',
   connection:'Verb (て-form) + すみません / ごめんなさい',
   desc:'Menyatakan <strong>permintaan maaf atas sesuatu yang sudah dilakukan</strong>. Berbeda dengan すみません saja yang lebih umum, pola Vて+すみません secara spesifik menyebutkan tindakan yang disesali dan bertanggung jawab.',
   nuance:'Tingkat keformalan: 〜て申し訳ありません (paling formal) > 〜てすみません (sopan, situasi formal/semi-formal) > 〜てごめんなさい (kasual, teman/keluarga) > 〜てごめん (sangat kasual). Pilih sesuai hubungan dan konteks.',
   examples:[
     {jp:'遅れ<b>てすみません</b>。電車が止まってしまいました。', id:'Maaf sudah terlambat. Keretanya berhenti.'},
     {jp:'うるさくし<b>てごめんなさい</b>。', id:'Maaf sudah ribut.'},
     {jp:'ご迷惑をおかけし<b>てすみません</b>でした。', id:'Mohon maaf sudah merepotkan Anda.'}
   ]},

// ── 第5週 5日目 ── 読解文型 (reading patterns)
  {id:'n4-w5d5-01', level:'n4', week:5, day:5, cat:'pembatasan',
   grammar:'〜だけ', reading:'dake',
   meaning:'hanya; saja; sebanyak; sesuai kemampuan',
   connection:'Noun / Verb (plain) + だけ / だけで / だけに',
   desc:'Menyatakan <strong>pembatasan atau batas</strong>. Bisa berarti "hanya" (membatasi jumlah/orang), "sebanyak mungkin" (できるだけ = semaksimal mungkin), atau "karena justru" (だけに = justru karena itu). Berbeda dengan しか, だけ bersifat netral.',
   nuance:'Bedakan dengan しか〜ない: だけ bersifat netral ("hanya X, itu saja"), sedangkan しか〜ない mengandung nuansa kekurangan atau penyesalan ("tidak ada selain X, kurang"). Contoh: 一人だけ来た (netral) vs 一人しか来なかった (mengecewakan).',
   examples:[
     {jp:'できる<b>だけ</b>早く返事します。', id:'Saya akan membalas secepat mungkin.'},
     {jp:'私の話を聞く<b>だけ</b>でいいです。', id:'Cukup dengan mendengarkan saya saja.'},
     {jp:'もう少し<b>だけ</b>待ってください。', id:'Tolong tunggu sebentar lagi saja.'}
   ]},

  {id:'n4-w5d5-02', level:'n4', week:5, day:5, cat:'aspek',
   grammar:'〜ばかり', reading:'bakari',
   meaning:'baru saja; hanya/terus-terusan; makin lama makin',
   connection:'Verb (ta-form) + ばかり / Noun + ばかり / Verb (dict.) + ばかりだ',
   desc:'Memiliki <strong>tiga makna berbeda</strong> tergantung bentuk yang mendahuluinya: ① Vた+ばかり = baru saja selesai (jarak waktu sangat dekat), ② Noun/Vる+ばかり = hanya itu terus / tidak ada yang lain, ③ Vる+ばかりだ = kondisi yang terus memburuk.',
   nuance:'Tiga makna wajib dibedakan: ① 食べたばかり (baru saja makan — waktu dekat), ② ゲームばかりしている (main game terus-terusan — nuansa kritis), ③ 悪くなるばかりだ (makin lama makin parah — tren negatif). Makna ② sering mengandung kritik halus.',
   examples:[
     {jp:'ご飯を食べた<b>ばかり</b>なので、おなかがいっぱいです。', id:'Saya baru saja makan, jadi perut sudah kenyang.'},
     {jp:'彼はゲーム<b>ばかり</b>して、勉強しない。', id:'Dia hanya main game terus, tidak mau belajar.'},
     {jp:'最近、物価が上がる<b>ばかりだ</b>。', id:'Belakangan ini, harga barang terus naik saja.'}
   ]},

// ── 第5週 6日目 ── 読解文型 (reading patterns)
  {id:'n4-w5d6-01', level:'n4', week:5, day:6, cat:'waktu',
   grammar:'〜ごとに', reading:'goto ni',
   meaning:'setiap; masing-masing; pada interval tertentu',
   connection:'Noun (waktu/jumlah) + ごとに / Verb (dict.) + ごとに',
   desc:'Menyatakan <strong>interval yang teratur</strong> — setiap X waktu/jumlah, sesuatu terjadi atau dilakukan. Bisa digunakan dengan nomina waktu (1時間ごとに = setiap jam) maupun nomina lain sebagai unit (駅ごとに = di setiap stasiun).',
   nuance:'Bedakan dengan に: 1日に3回 = 3 kali dalam sehari (total frekuensi). 1日ごとに = setiap satu hari berlalu (interval). Bedakan juga dengan おきに: ごとに = setiap X terjadi tanpa jeda, おきに = dengan jeda X sebelum kejadian berikutnya.',
   examples:[
     {jp:'1時間<b>ごとに</b>、短い休憩を取ります。', id:'Saya mengambil istirahat singkat setiap satu jam.'},
     {jp:'駅<b>ごとに</b>、乗り降りする人がいます。', id:'Di setiap stasiun ada orang yang naik turun.'},
     {jp:'季節が変わる<b>ごとに</b>、景色が美しくなります。', id:'Setiap kali musim berganti, pemandangannya makin indah.'}
   ]},

];

if (typeof window !== 'undefined') window.N4_W5 = N4_W5;
