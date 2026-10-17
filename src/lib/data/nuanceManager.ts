/**
 * nuanceManager.ts — Nuance Notes & Linguistic Breakdown Manager
 * 
 * Ingests Pomax linguistic analyses, particles nuance distinctions, connectives,
 * counter euphonic rules, syntax frameworks, and giongo/gitaigo mimetic nuances.
 */

export interface NuanceExample {
  jp: string;
  id: string;
  note?: string;
}

export interface NuanceNote {
  id: string;
  topic: string;
  category: 'particles' | 'connectives' | 'syntax' | 'counters' | 'onomatopoeia' | string;
  reading?: string;
  role?: string;
  summary_id: string;
  explanation_id?: string;
  pitfalls_id?: string;
  register?: string;
  rules?: string[];
  items?: Array<{
    counter: string;
    reading: string;
    target: string;
    examples: string;
  }>;
  examples?: NuanceExample[];
  word?: string;
  type?: string;
  meaning_id?: string;
  nuance_id?: string;
  domain?: string;
}

export const CANONICAL_NUANCE_NOTES: NuanceNote[] = [
  // ── 1. PARTICLES (助詞 / てにをは) ──
  {
    id: 'particle-wa',
    topic: 'は (wa)',
    category: 'particles',
    reading: 'wa',
    role: 'Penanda Topik Utama / Kontras',
    summary_id: 'Menandai topik pembicaraan ("mengenai X / berbicara tentang X") atau menghadirkan kontras dengan hal lain.',
    explanation_id: 'Partikel は (dibaca wa) berfungsi sebagai topic marker, bukan penanda subjek gramatikal. は mengangkat suatu topik ke atas meja percakapan sebagai latar belakang (old information/shared context), kemudian predikat memberikan informasi baru mengenai topik tersebut. Dalam konteks negatif atau komparatif, は menegaskan kontras.',
    pitfalls_id: 'Sering tertukar dengan が. Gunakan は saat fokus kalimat ada pada predikat/informasi setelah は. Jangan gunakan は dalam anak kalimat penjelas (relative clause).',
    examples: [
      { jp: '私はインドネシア人です。', id: 'Mengenai saya, saya adalah orang Indonesia.' },
      { jp: 'お酒は飲みますが、タバコは吸いません。', id: 'Kalau alkohol saya minum, tetapi rokok tidak saya hisap (kontras).' }
    ]
  },
  {
    id: 'particle-ga',
    topic: 'が (ga)',
    category: 'particles',
    reading: 'ga',
    role: 'Penanda Subjek Faktual / Fokus Baru / Objek Potensial',
    summary_id: 'Menandai subjek gramatikal yang melakukan tindakan, informasi baru yang disorot, atau objek dari kata sifat/kemampuan.',
    explanation_id: 'Partikel が menunjuk langsung entitas mana yang melakukan atau mengalami suatu keadaan. Fokus penekanan ada pada kata SEBELUM が ("Dialah yang...", bukan orang lain). Digunakan juga untuk fenomena alam yang tiba-tiba tertangkap indra (雨が降っている), subjek dalam anak kalimat, dan objek untuk kata sifat seperti 好き, 嫌い, 上手 serta bentuk potensial (できる).',
    pitfalls_id: 'Ketika menjawab pertanyaan seperti "Siapa yang datang?", wajib memakai が (田中さんが来ました), karena penjawab sedang menentukan subjek faktual.',
    examples: [
      { jp: '雨が降ってきました。', id: 'Hujan (tiba-tiba) mulai turun (pengamatan indrawi).' },
      { jp: '日本語が少し話せます。', id: 'Bisa berbicara bahasa Jepang sedikit (objek potensial).' },
      { jp: '誰がリーダーですか。私がリーダーです。', id: 'Siapa yang menjadi ketua? Sayalah ketuanya (fokus identitas).' }
    ]
  },
  {
    id: 'particle-wo',
    topic: 'を (wo/o)',
    category: 'particles',
    reading: 'o',
    role: 'Penanda Objek Langsung / Titik Lintasan atau Pelepasan',
    summary_id: 'Menandai objek penderita dari kata kerja transitif, atau ruang/jalur yang dilewati saat bergerak.',
    explanation_id: 'Fungsi utama を adalah menandai direct object (penderita) dari kata kerja transitif (本を読む). Fungsi kedua yang penting adalah menandai ruang pergerakan atau titik pelepasan dengan kata kerja gerak seperti 歩く, 飛ぶ, 出る, 降りる (公園を散歩する: berjalan melintasi taman; 電車を降りる: turun keluar dari kereta).',
    pitfalls_id: 'Banyak pembelajar keliru memakai で atau から untuk lokasi bergerak/turun. Ingat: berjalan melintasi jembatan adalah 橋を渡る.',
    examples: [
      { jp: '朝ご飯を食べました。', id: 'Saya sudah makan sarapan pagi.' },
      { jp: '空を鳥が飛んでいる。', id: 'Burung terbang melintasi langit luas.' },
      { jp: '毎朝七時に家を出ます。', id: 'Setiap pagi jam 7 saya berangkat meninggalkan rumah.' }
    ]
  },
  {
    id: 'particle-ni',
    topic: 'に (ni)',
    category: 'particles',
    reading: 'ni',
    role: 'Titik Waktu Spesifik / Tujuan Arah / Lokasi Keberadaan / Target Aksi / Agen Pasif',
    summary_id: 'Menandai titik sasaran statis tempat sesuatu berada, waktu spesifik kalender/jam, target penerima aksi, atau pelaku pasif.',
    explanation_id: 'Partikel に memiliki spektrum kegunaan luas yang semuanya berakar pada satu konsep: "titik sasaran tetap (point of contact/destination)". 1) Titik keberadaan statis (東京に住んでいる, 机の上にある). 2) Waktu spesifik dengan angka (7時に起きる). 3) Tujuan pergerakan akhir (日本に行く). 4) Penerima aksi (友達に手紙を書く). 5) Agen dalam kalimat pasif/kausatif (先生に褒められた).',
    pitfalls_id: 'Jangan gunakan に untuk waktu relatif yang tidak berangka angka kalender (misal: 毎日, 明日, 来週 TIDAK memakai に).',
    examples: [
      { jp: '京都に住んでいます。', id: 'Saya tinggal di Kyoto (lokasi statis keberadaan).' },
      { jp: '月曜日に会議があります。', id: 'Ada rapat pada hari Senin (waktu spesifik).' },
      { jp: '部長に書類を提出した。', id: 'Saya menyerahkan dokumen kepada kepala bagian.' }
    ]
  },
  {
    id: 'particle-de',
    topic: 'で (de)',
    category: 'particles',
    reading: 'de',
    role: 'Lokasi Aktivitas Dinamis / Alat Sarana / Penyebab / Batasan Jumlah',
    summary_id: 'Menandai tempat di mana aksi aktif berlangsung, alat/metode yang digunakan, penyebab terjadinya sesuatu, atau batasan kuantitas.',
    explanation_id: 'Berbeda dari に yang menandai titik sasaran statis, で menandai wadah/lingkungan tempat terjadinya aksi dinamis (図書館で勉強する). Selain lokasi aksi, で menandai: sarana/alat/bahasa (日本語で話す, 電車で行く), penyebab alami/penyakit (風邪で休む), dan batasan nilai/waktu/kelompok (一人で行く, 全部で千円).',
    pitfalls_id: 'Tempat aksi aktif selalu memakai で, sedangkan tempat diam/tinggal/keberadaan memakai に.',
    examples: [
      { jp: 'レストランで晩ご飯を食べた。', id: 'Makan malam di restoran (lokasi aktivitas).' },
      { jp: 'ハサミで紙を切ります。', id: 'Memotong kertas menggunakan gunting (alat/sarana).' },
      { jp: '大雪で電車が止まりました。', id: 'Kereta berhenti beroperasi karena salju lebat (penyebab).' }
    ]
  },
  {
    id: 'particle-to',
    topic: 'と (to)',
    category: 'particles',
    reading: 'to',
    role: 'Penyambung Inklusif Lengkap / Partner Bersama / Pengutip Isi / Pengandaian Alami',
    summary_id: 'Menyambung kata benda secara tuntas ("dan"), menandai mitra yang melakukan aksi bersama, mengutip isi pikiran/ucapan, atau kondisional otomatis.',
    explanation_id: 'Partikel と menyiratkan enumerasi tertutup/lengkap dari daftar kata benda (りんごとみかん: apel dan jeruk, tidak ada buah lain). Bila dipasangkan dengan kata kerja sosial, menandai partner (友達と話す). Sebagai partikel sitiran, mengikuti isi ucapan atau pikiran sebelum 言う, 思う. Sebagai konjungsi kondisional antar klausa, menandai akibat otomatis yang pasti terjadi (春になると花が咲く).',
    pitfalls_id: 'Untuk menyebutkan contoh yang tidak tuntas ("seperti ini dan itu, dll"), gunakan や, bukan と.',
    examples: [
      { jp: 'ペンとノートを買いました。', id: 'Saya membeli pulpen dan buku catatan (hanya dua itu saja).' },
      { jp: '田中さんと一緒に映画を見に行った。', id: 'Pergi menonton film bersama Saudara Tanaka.' },
      { jp: '明日は雨が降ると思います。', id: 'Saya pikir besok akan turun hujan (kutipan pikiran).' }
    ]
  },
  {
    id: 'particle-kara-made',
    topic: 'から・まで (kara / made)',
    category: 'particles',
    reading: 'kara / made',
    role: 'Titik Awal & Titik Akhir (Ruang & Waktu) / Alasan Sebab',
    summary_id: 'Menandai batas mula (dari) dan batas akhir (sampai). から juga menandai alasan subjektif dari sudut pandang pembicara.',
    explanation_id: 'から menandai titik tolak baik spasial (stasiun), temporal (jam 9), maupun bahan sumber (anggur dari buah anggur). まで menandai titik terminus/tujuan akhir pergerakan atau durasi. Sebagai konjungsi kalimat, から mengemukakan alasan subjektif pembicara yang menjadi dasar ajakan, permohonan, atau saran (危ないですから、触らないでください).',
    pitfalls_id: 'Jangan tertukar antara まで (sampai aksi berlangsung terus) dan までに (paling lambat sebelum/tenggat waktu penyerahan).',
    examples: [
      { jp: '会社は朝九時から夕方六時までです。', id: 'Jam kerja kantor adalah dari jam 9 pagi sampai jam 6 sore.' },
      { jp: '時間がありませんから、急ぎましょう。', id: 'Karena tidak ada waktu, ayo kita bergegas (alasan ajakan).' }
    ]
  },
  {
    id: 'particle-mo',
    topic: 'も (mo)',
    category: 'particles',
    reading: 'mo',
    role: 'Inklusi "Juga" / Penekanan Kuantitas Ekstrem',
    summary_id: 'Menggantikan は/が/を untuk menyatakan "juga/pun", atau diletakkan setelah angka untuk menegaskan jumlah yang luar biasa banyak/sedikit.',
    explanation_id: 'Partikel も menambahkan entitas baru ke dalam proposisi yang sama ("A juga melakukan hal serupa"). Bila diletakkan setelah angka/penghitung (misal: 10時間も待った), も mengekspresikan rasa kaget atau keluhan pembicara bahwa jumlah tersebut sangat banyak ("sampai-sampai 10 jam!"). Bila dipasangkan dengan 1 + penyangkal (1回も〜ない), bermakna "sama sekali tidak pernah walau sekali pun".',
    pitfalls_id: 'も langsung menimpa dan menghapus は, が, dan を. Jangan menulis "はも" atau "をも".',
    examples: [
      { jp: '私もそう思います。', id: 'Saya pun berpikir demikian.' },
      { jp: '昨日は十時間も寝てしまった。', id: 'Kemarin saya tidur sampai sepuluh jam lamanya (penekanan banyak).' },
      { jp: '財布の中に一円も残っていない。', id: 'Di dalam dompet tidak tersisa satu yen pun (penyangkalan mutlak).' }
    ]
  },
  {
    id: 'particle-no',
    topic: 'の (no)',
    category: 'particles',
    reading: 'no',
    role: 'Kepemilikan / Modifikasi Kata Benda / Nominalisasi / Pengganti Benda',
    summary_id: 'Menghubungkan dua kata benda ("milik", "tentang", "buatan"), menominalkan frasa kata kerja, atau berfungsi sebagai kata ganti ("yang").',
    explanation_id: 'Partikel の menghubungkan Noun 1 sebagai penjelas bagi Noun 2 (私の本, 日本の車, 日本語の先生). Selain modifikasi nomina, の dapat menominalkan kalimat kerja (走るのが好き: suka berlari) dan menggantikan kata benda yang sudah jelas konteksnya (大きいのが欲しい: ingin yang besar). Di akhir kalimat percakapan informal, の dipakai untuk mencari konfirmasi atau nada ramah.',
    pitfalls_id: 'Berbeda dari bahasa Indonesia di mana kata yang diterangkan ada di depan ("mobil Jepang"), dalam bahasa Jepang penjelas selalu di depan (日本の車).',
    examples: [
      { jp: 'これは私のパスポートです。', id: 'Ini adalah paspor milik saya.' },
      { jp: '絵を描くのがとても楽しい。', id: 'Menggambar lukisan itu sangat menyenangkan (nominalisasi).' },
      { jp: '赤いペンが売り切れたので、青いのを買った。', id: 'Karena pulpen merah habis, saya membeli yang biru (pengganti kata benda).' }
    ]
  },
  {
    id: 'particle-ne-yo',
    topic: 'ね・よ (ne / yo)',
    category: 'particles',
    reading: 'ne / yo',
    role: 'Partikel Akhir Penyelaras Komunikasi (Interpersonal Nuance)',
    summary_id: 'ね meminta konfirmasi/kesepakatan rasa ("ya kan?"), sedangkan よ menyampaikan informasi baru dengan keyakinan ("lho/nih/lho ya").',
    explanation_id: 'Keduanya merupakan modalitas komunikasi khas lisan Jepang. ね menciptakan kehangatan relasional dengan mengasumsikan lawan bicara memiliki persepsi yang sama (今日はいい天気ですね). よ digunakan saat pembicara percaya lawan bicara belum mengetahui atau belum menyadari informasi tersebut, berfungsi memberi tahu, meyakinkan, atau memperingatkan (このラーメン、とても美味しいですよ). Gabungan よね dipakai saat pembicara yakin namun tetap meminta penegasan konfirmasi lawan bicara.',
    pitfalls_id: 'Terlalu sering memakai よ kepada atasan bisa terkesan menggurui atau sok tahu. Gunakan dengan penuh pertimbangan etiket.',
    examples: [
      { jp: '昨日の映画は本当に面白かったですね。', id: 'Film kemarin benar-benar seru sekali ya (berbagi perasaan).' },
      { jp: '明日は祝日ですから、学校は休みですよ。', id: 'Besok hari libur nasional lho, jadi sekolah libur (memberi informasi baru).' }
    ]
  },

  // ── 2. CONNECTIVES (接続詞) ──
  {
    id: 'conn-aruiwa',
    topic: '或いは (あるいは / aruiwa)',
    category: 'connectives',
    reading: 'aruiwa',
    role: 'Pilihan Alternatif / Kemungkinan Lain',
    summary_id: 'Menyajikan alternatif pilihan setara secara formal ("atau / mungkin pula"), sering dipakai dalam teks resmi, hukum, dan presentasi bisnis.',
    explanation_id: 'Secara etimologi linguistik Pomax, kata ini merupakan gabungan dari bentuk Renyoukei 或る (arui) + partikel klasik い (penegas klausa) + partikel は. Digunakan untuk menyajikan alternatif kemungkinan atau opsi yang setara dalam analisis suatu situasi (AあるいはB). Dapat pula berpasangan di awal dua kalimat (あるいは〜、あるいは〜) menyerupai "di satu sisi..., di sisi lain...".',
    register: 'formal / tulisan ilmiah / bisnis',
    examples: [
      { jp: '書類は郵送あるいは直接窓口にご持参ください。', id: 'Dokumen harap dikirim lewat pos atau dibawa langsung ke loket pendaftaran.' },
      { jp: '午後は曇り、あるいは雨になるでしょう。', id: 'Siang hari akan berawan, atau kemungkinan pula turun hujan.' }
    ]
  },
  {
    id: 'conn-matawa',
    topic: '又は (または / matawa)',
    category: 'connectives',
    reading: 'matawa',
    role: 'Pilihan Eksklusif Regulasi ("Atau")',
    summary_id: 'Konjungsi standar untuk menyatakan "atau" di antara dua pilihan yang bersifat mutually exclusive (pilih salah satu).',
    explanation_id: 'Berasal dari kata keterangan 又 (kembali/lagi) + partikel topik は. Dalam teks hukum dan peraturan Jepang, 又は memiliki hirarki legal khusus: digunakan untuk menghubungkan pilihan tingkat dasar, berbeda dengan 若しくは (moshiku wa) yang digunakan untuk sub-pilihan di dalam cabang pilihan utama.',
    register: 'formal / standar tulisan',
    examples: [
      { jp: '黒または青のボールペンで記入してください。', id: 'Harap isi dengan pulpen hitam atau biru.' },
      { jp: '電話またはメールでご連絡いたします。', id: 'Kami akan menghubungi Anda melalui telepon atau email.' }
    ]
  },
  {
    id: 'conn-omakeni',
    topic: 'おまけに (omake ni)',
    category: 'connectives',
    reading: 'omake ni',
    role: 'Penambahan Kumulatif ("Ditambah Lagi / Parahnya Lagi")',
    summary_id: 'Menambahkan fakta berikutnya yang memperkuat situasi sebelumnya, sering dengan nuansa kekecewaan ("sudah begitu, ditambah lagi...").',
    explanation_id: 'Berasal dari kata kerja 負ける (memberi diskon/bonus cuma-cuma) dengan awalan honorific お dan partikel に. Dalam tata bahasa diskursus, おまけに menghubungkan dua kejadian yang sejalan, di mana fakta kedua datang sebagai pukulan tambahan atau kejutan ekstra yang tidak diharapkan.',
    register: 'informal / semi-formal lisan',
    examples: [
      { jp: '雨が激しく降り出し、おまけに風まで強くなってきた。', id: 'Hujan mulai turun deras, ditambah lagi angin pun menjadi sangat kencang.' },
      { jp: 'このアパートは狭く、おまけに駅から遠い。', id: 'Apartemen ini sempit, dan parahnya lagi jauh dari stasiun.' }
    ]
  },
  {
    id: 'conn-oyobi',
    topic: '及び (および / oyobi)',
    category: 'connectives',
    reading: 'oyobi',
    role: 'Penggabungan Resmi Dua Elemen ("Serta / Dan")',
    summary_id: 'Konjungsi formal tertulis untuk menyatukan dua kata benda atau frasa setara ("A serta B") dalam dokumen hukum atau perjanjian.',
    explanation_id: 'Berasal dari Renyoukei kata kerja klasik 及ぶ (mencapai/meliputi). Digunakan dalam bahasa resmi negara dan kontrak bisnis untuk menghubungkan subjek atau objek yang setara derajatnya. Sering dikombinasikan dengan 並びに (narabi ni) dalam klausul bertingkat.',
    register: 'sangat formal / hukum / kontrak',
    examples: [
      { jp: '氏名及び住所を記入してください。', id: 'Harap cantumkan nama lengkap serta alamat tempat tinggal.' },
      { jp: '日本国及び東南アジア諸国との友好関係。', id: 'Hubungan persahabatan antara Negara Jepang serta negara-negara Asia Tenggara.' }
    ]
  },
  {
    id: 'conn-sorekara',
    topic: 'それから (sore kara)',
    category: 'connectives',
    reading: 'sore kara',
    role: 'Urutan Kronologis / Penambahan Item Susulan',
    summary_id: 'Menyambung urutan waktu ("setelah itu / kemudian") atau menambahkan barang belanjaan/daftar yang baru teringat ("dan juga...").',
    explanation_id: 'Tersusun dari kata ganti penunjuk それ + partikel awal から (dari hal itu). Sangat sering dipakai dalam bercerita kronologis kejadian masa lalu atau saat memesan makanan di kasir ketika teringat item tambahan yang ingin dipesan.',
    register: 'netral / percakapan sehari-hari',
    examples: [
      { jp: '宿題を終わらせた。それから、友達とゲームをした。', id: 'Saya menyelesaikan PR. Setelah itu, saya bermain game bersama teman.' },
      { jp: 'コーヒーを一つ。それから、チーズケーキもお願いします。', id: 'Satu cangkir kopi. Dan juga, tolong satu cheesecake.' }
    ]
  },
  {
    id: 'conn-dakara',
    topic: 'だから / ですから (dakara / desu kara)',
    category: 'connectives',
    reading: 'dakara / desu kara',
    role: 'Kesimpulan Logis Konsekuensial ("Oleh Karena Itu")',
    summary_id: 'Menyatakan bahwa kalimat kedua merupakan konsekuensi langsung atau keputusan yang ditarik dari kondisi kalimat pertama.',
    explanation_id: 'Kopula だ/です + partikel kausal から. Menghubungkan sebab obyektif atau subyektif dengan tindakan selanjutnya. Berhati-hatilah saat memakai だから sendirian secara singkat kepada orang yang lebih tua karena bisa terdengar mendesak atau tidak sabar ("kan sudah kubilang!").',
    register: 'percakapan netral (ですから untuk situasi sopan)',
    examples: [
      { jp: '明日は大事な試験があります。ですから、今夜は早く寝ます。', id: 'Besok ada ujian penting. Oleh karena itu, malam ini saya akan tidur lebih awal.' }
    ]
  },
  {
    id: 'conn-shikashi',
    topic: 'しかし / けれども (shikashi / keredomo)',
    category: 'connectives',
    reading: 'shikashi / keredomo',
    role: 'Pertentangan / Pembalikan Arah Pemikiran ("Namun / Tetapi")',
    summary_id: 'Membalikkan alur ekspektasi yang dibangun oleh kalimat pertama dengan menyajikan kenyataan kontras pada kalimat kedua.',
    explanation_id: 'しかし adalah konjungsi adversatif klasik yang tegas dan bermartabat, umum dipakai dalam pidato, esai, dan diskusi serius. Dalam percakapan lisan kasual, orang lebih sering memakai でも, けど, atau だけど.',
    register: 'shikashi: formal/tertulis; keredomo: sopan percakapan; demo: kasual',
    examples: [
      { jp: '全力を尽くした。しかし、結果は惜しくも敗北だった。', id: 'Kami sudah mengerahkan seluruh daya upaya. Namun, hasilnya sayangnya kalah.' }
    ]
  },

  // ── 3. SYNTAX (統語論 / 語順) ──
  {
    id: 'syntax-sov-order',
    topic: 'Struktur Dasar SOV (Subject - Object - Verb)',
    category: 'syntax',
    role: 'Kerangka Dasar Sintaksis Bahasa Jepang',
    summary_id: 'Bahasa Jepang adalah bahasa berkepala akhir (head-final) dengan struktur inti Subjek - Objek - Predikat di paling akhir.',
    explanation_id: 'Aturan emas sintaksis Jepang: PREDICAT SELALU DI AKHIR. Komponen lain di depan predikat dapat bertukar posisi dengan cukup fleksibel selama partikel penandanya tidak berubah. Karena predikat selalu di akhir, pendengar harus mendengarkan kalimat sampai selesai untuk mengetahui apakah kalimat itu positif, negatif, lampau, ajakan, atau pengandaian.',
    rules: [
      'Predikat (kata kerja / kata sifat / kopula) mengunci akhir klausa.',
      'Kata penjelas (modifikator) SELALU mendahului kata yang dijelaskan (head).',
      'Urutan konstituen relatif bebas berkat peran partikel pasca-posisional (postpositions).'
    ],
    examples: [
      { jp: '田中さんが（S）図書館で（Loc）日本語を（O）勉強する（V）。', id: 'Saudara Tanaka belajar bahasa Jepang di perpustakaan.' },
      { jp: '日本語を（O）図書館で（Loc）田中さんが（S）勉強する（V）。', id: 'Tetap bermakna sama persis, hanya fokus penekanan yang bergeser ke objek.' }
    ]
  },
  {
    id: 'syntax-zero-pronoun',
    topic: 'Zero Pronoun & Elipsis Kontekstual (Subjek Tersirat)',
    category: 'syntax',
    role: 'Efisiensi Pragmatik Percakapan Alami',
    summary_id: 'Subjek atau objek yang sudah dapat dipahami dari konteks WAJIB dihilangkan agar bahasa Jepang terdengar alami.',
    explanation_id: 'Pembelajar pemula dari bahasa yang berorientasi pronomina (seperti bahasa Indonesia "saya" atau bahasa Inggris "I") cenderung mengulang 私は di setiap kalimat. Dalam sintaksis Jepang asli, jika pembicara membicarakan dirinya sendiri atau situasi sudah jelas, kata ganti seperti 私は atau あなたは HARUS dihilangkan (disebut zero pronoun atau zero anaphora). Menyebutkan "kamu" berulang-ulang justru terdengar tidak sopan atau menuduh.',
    rules: [
      'Jangan mengulang 私は di setiap kalimat baru.',
      'Gunakan nama orang + さん daripada あなた saat berbicara dengan lawan bicara.',
      'Arah tindakan pada kata kerja memberi/menerima (あげる/くれる/もらう) secara otomatis menjelaskan siapa subjek dan objeknya tanpa perlu menyebut kata ganti.'
    ],
    examples: [
      { jp: '（私は）明日、（東京へ）行きます。', id: '(Saya) besok akan pergi (ke Tokyo). Cukup ucapkan "明日行きます".' },
      { jp: '手伝ってあげましょうか。', id: 'Bolehkah saya bantu? (Tak perlu sebut "saya membantu Anda").' }
    ]
  },
  {
    id: 'syntax-relative-clause',
    topic: 'Klausa Penjelas Nomina (Relative Clauses)',
    category: 'syntax',
    role: 'Penggabungan Kalimat Penjelas ke Kata Benda',
    summary_id: 'Klausa penjelas diletakkan langsung di depan kata benda tanpa kata penghubung seperti "yang" dalam bahasa Indonesia.',
    explanation_id: 'Bahasa Indonesia menggunakan kata "yang" untuk merangkai kalimat penjelas di belakang kata benda (misal: "Buku yang kemarin saya beli"). Dalam bahasa Jepang, klausa penjelas berbentuk bentuk biasa (biasa/kamus/ta-form) diletakkan LANGSUNG di DEPAN kata benda sasaran. Jika di dalam klausa penjelas terdapat subjek, partikel が sering kali dapat melunak menjadi の.',
    rules: [
      'Gunakan bentuk biasa (plain form / futsuukei) di akhir klausa penjelas, jangan bentuk masu/desu.',
      'Tidak ada kata yang setara dengan "yang" (seperti which/who/that).',
      'Partikel が dalam klausa penjelas boleh berubah menjadi の (misal: 私が買った本 -> 私の買った本).'
    ],
    examples: [
      { jp: '昨日買った本を読み終えた。', id: 'Saya selesai membaca [buku yang saya beli kemarin].' },
      { jp: '背が高い人は田中さんです。', id: '[Orang yang bertubuh tinggi itu] adalah Saudara Tanaka.' }
    ]
  },

  // ── 4. COUNTERS (助数詞 / 音便規則) ──
  {
    id: 'counter-rules-euphonic',
    topic: 'Hukum Perubahan Bunyi Angka (Onbin & Rendaku)',
    category: 'counters',
    role: 'Aturan Fonotaktik Penghitungan Angka + Suffix',
    summary_id: 'Angka 1 (ichi), 3 (san), 6 (roku), 8 (hachi), 10 (juu), dan 何 (nan) mengalami asimilasi bunyi konsonan ganda (sokuon) atau pelunakan bunyi (rendaku).',
    explanation_id: 'Menurut analisis linguistik Pomax, perubahan bunyi saat angka bertemu suffix counter bukan terjadi sembarangan, melainkan mengikuti pola fonetik konsisten: 1) Angka berakhiran bunyi ku/tsu (1, 6, 8, 10) saat bertemu bunyi k/s/t/h/p berubah menjadi konsonan ganda sokuon っ (ippon, roppon, happon, jippon). 2) Angka 3 dan 何 memicu pergeseran bunyi tak bersuara menjadi bersuara (rendaku), seperti h -> b (sambon, nambon) atau k -> g (sangai).',
    rules: [
      '1 (ichi) + h/p -> ip-... (1本 = いっぽん, 1杯 = いっぱい)',
      '3 (san) + h/p -> sam-b... (3本 = さんぼん, 3杯 = さんばい)',
      '6 (roku) + h/p -> rop-... (6本 = ろっぽん, 6匹 = ろっぴき)',
      '8 (hachi) + h/p -> hap-... (8本 = はっぽん, 8匹 = はっぴき)',
      '10 (juu) + h/p -> jip-... / jup-... (10本 = じっぽん / じゅっぽん)',
      '何 (nan) + h/p -> nam-b... (何本 = なんぼん, 何杯 = なんばい)'
    ]
  },
  {
    id: 'counter-essential-list',
    topic: 'Katalog Kata Bantu Bilangan Esensial (Essential Counters)',
    category: 'counters',
    role: 'Daftar Pengklasifikasi Benda Sehari-hari & Ujian JLPT',
    summary_id: 'Klasifikasi kata bantu bilangan untuk orang, benda panjang silinder, lembaran tipis, buku, mesin/kendaraan, hewan kecil, dan benda umum.',
    items: [
      { counter: '〜人 (にん)', reading: 'nin (1=hitori, 2=futari)', target: 'Orang / manusia', examples: '1人 (ひとり), 2人 (ふたり), 3人 (さんにん), 4人 (よにん)' },
      { counter: '〜本 (ほん)', reading: 'hon / pon / bon', target: 'Benda silinder panjang (botol, pulpen, payung, pohon, video)', examples: '1本 (いっぽん), 2本 (にほん), 3本 (さんぼん)' },
      { counter: '〜枚 (まい)', reading: 'mai', target: 'Benda tipis dan rata (kertas, tiket, baju kaos, piring, foto)', examples: '1枚 (いちまい), 2枚 (にまい), 3枚 (さんまい)' },
      { counter: '〜冊 (さつ)', reading: 'satsu', target: 'Benda berjilid (buku, majalah, kamus, buku catatan)', examples: '1冊 (いっさつ), 2冊 (にさつ), 3冊 (さんさつ)' },
      { counter: '〜台 (だい)', reading: 'dai', target: 'Kendaraan & mesin/perangkat elektronik (mobil, motor, komputer, TV)', examples: '1台 (いちだい), 2台 (にだい), 3台 (さんだい)' },
      { counter: '〜匹 (ひき)', reading: 'hiki / piki / biki', target: 'Hewan kecil, ikan, serangga (kucing, anjing, nyamuk, ikan)', examples: '1匹 (いっぴき), 2匹 (にひき), 3匹 (さんびき)' },
      { counter: '〜頭 (とう)', reading: 'tou', target: 'Hewan besar (gajah, kuda, sapi, beruang, paus)', examples: '1頭 (いっとう), 2頭 (にごう/にとう), 3頭 (さんとう)' },
      { counter: '〜個 (こ)', reading: 'ko', target: 'Benda kecil kompak / buah bulat (apel, telur, sabun, kotak kecil)', examples: '1個 (いっこ), 2個 (にご), 3個 (さんこ)' },
      { counter: '〜杯 (はい)', reading: 'hai / pai / bai', target: 'Cangkir / gelas berisi cairan atau mangkok nasi/mie', examples: '1杯 (いっぱい), 2杯 (にはい), 3杯 (さんばい)' },
      { counter: '〜階 (かい)', reading: 'kai / gai', target: 'Lantai tingkat gedung', examples: '1階 (いっかい), 2階 (にかい), 3階 (さんがい)' }
    ]
  },

  // ── 5. GIONGO & GITAIGO (オノマトペ) ──
  {
    id: 'ono-dokidoki',
    word: 'ドキドキ',
    type: 'gijougo',
    reading: 'dokidoki',
    topic: 'ドキドキ (dokidoki)',
    category: 'onomatopoeia',
    meaning_id: 'berdebar-debar; deg-degan',
    summary_id: 'Detak jantung yang berdegup kencang karena cemas, gugup, atau jatuh cinta.',
    nuance_id: 'Detak jantung yang berdegup kencang karena cemas, gugup, atau jatuh cinta.',
    domain: 'emosi',
    examples: [
      { jp: '面接の前で心臓がドキドキしている。', id: 'Jantung saya berdebar-debar kencang sebelum wawancara.' }
    ]
  },
  {
    id: 'ono-wakuwaku',
    word: 'ワクワク',
    type: 'gijougo',
    reading: 'wakuwaku',
    topic: 'ワクワク (wakuwaku)',
    category: 'onomatopoeia',
    meaning_id: 'antusias; sangat bersemangat menantikan sesuatu',
    summary_id: 'Perasaan gembira dan tidak sabar menyambut kejadian membahagiakan di masa depan.',
    nuance_id: 'Perasaan gembira dan tidak sabar menyambut kejadian membahagiakan di masa depan.',
    domain: 'emosi',
    examples: [
      { jp: '明日からの日本旅行を思うと胸がワクワクする。', id: 'Membayangkan perjalanan ke Jepang mulai besok membuat hati saya sangat antusias.' }
    ]
  },
  {
    id: 'ono-perapera',
    word: 'ペラペラ',
    type: 'gitaigo',
    reading: 'perapera',
    topic: 'ペラペラ (perapera)',
    category: 'onomatopoeia',
    meaning_id: 'lancar fasih (berbahasa); tipis (kertas)',
    summary_id: 'Kemampuan berbicara bahasa asing mengalir tanpa terbata-bata.',
    nuance_id: 'Kemampuan berbicara bahasa asing mengalir tanpa terbata-bata.',
    domain: 'kemampuan-bahasa',
    examples: [
      { jp: '彼は日本語も英語もペラペラです。', id: 'Dia sangat fasih berbahasa Jepang maupun bahasa Inggris.' }
    ]
  },
  {
    id: 'ono-girigiri',
    word: 'ギリギリ',
    type: 'gitaigo',
    reading: 'girigiri',
    topic: 'ギリギリ (girigiri)',
    category: 'onomatopoeia',
    meaning_id: 'pas-pasan; di detik-detik terakhir; batas tipis',
    summary_id: 'Kondisi waktu atau nilai yang nyaris tidak mencukupi namun berhasil selamat di detik terakhir.',
    nuance_id: 'Kondisi waktu atau nilai yang nyaris tidak mencukupi namun berhasil selamat di detik terakhir.',
    domain: 'waktu-kondisi',
    examples: [
      { jp: '電車の出発時間ギリギリに間に合った。', id: 'Saya berhasil tepat waktu pas di detik-detik terakhir sebelum kereta berangkat.' }
    ]
  },
  {
    id: 'ono-iraira',
    word: 'イライラ',
    type: 'gijougo',
    reading: 'iraira',
    topic: 'イライラ (iraira)',
    category: 'onomatopoeia',
    meaning_id: 'jengkel; kesal; geregetan karena tertahan',
    summary_id: 'Emosi frustrasi karena hal-hal tidak berjalan lancar seperti antrean lama atau kemacetan.',
    nuance_id: 'Emosi frustrasi karena hal-hal tidak berjalan lancar seperti antrean lama atau kemacetan.',
    domain: 'emosi',
    examples: [
      { jp: '渋滞に巻き込まれてイライラした。', id: 'Saya merasa kesal jengkel karena terjebak macet.' }
    ]
  },
  {
    id: 'ono-sarasara',
    word: 'サラサラ',
    type: 'gitaigo / giongo',
    reading: 'sarasara',
    topic: 'サラサラ (sarasara)',
    category: 'onomatopoeia',
    meaning_id: 'halus lembut mengalir (rambut, aliran sungai kecil, pasir)',
    summary_id: 'Kondisi permukaan yang kering, bersih, dan meluncur mulus tanpa ada rasa lengket.',
    nuance_id: 'Kondisi permukaan yang kering, bersih, dan meluncur mulus tanpa ada rasa lengket.',
    domain: 'tekstur-aliran',
    examples: [
      { jp: 'シャンプーの後、髪がサラサラになった。', id: 'Setelah keramas dengan sampo, rambut menjadi halus lembut mengalir.' }
    ]
  },
  {
    id: 'ono-pikapika',
    word: 'ピカピカ',
    type: 'gitaigo',
    reading: 'pikapika',
    topic: 'ピカピカ (pikapika)',
    category: 'onomatopoeia',
    meaning_id: 'berkilau bersih; mengkilap baru',
    summary_id: 'Cahaya gemerlap dari benda yang baru, bersih dipoles, atau belum tergores.',
    nuance_id: 'Cahaya gemerlap dari benda yang baru, bersih dipoles, atau belum tergores.',
    domain: 'visual-kebersihan',
    examples: [
      { jp: '床をピカピカに磨き上げました。', id: 'Saya memoles lantai hingga berkilau bersih mengkilap.' }
    ]
  },
  {
    id: 'ono-barabara',
    word: 'バラバラ',
    type: 'gitaigo',
    reading: 'barabara',
    topic: 'バラバラ (barabara)',
    category: 'onomatopoeia',
    meaning_id: 'berantakan terpisah-pisah; tidak serempak',
    summary_id: 'Benda atau pendapat anggota tim yang tercerai-berai dan tidak bersatu padu.',
    nuance_id: 'Benda atau pendapat anggota tim yang tercerai-berai dan tidak bersatu padu.',
    domain: 'kondisi-sosial',
    examples: [
      { jp: 'チームの意見がバラバラでまとまらない。', id: 'Pendapat tim tercerai-berai dan sulit disatukan.' }
    ]
  },
  {
    id: 'ono-zukizuki',
    word: 'ズキズキ',
    type: 'gitaigo',
    reading: 'zukizuki',
    topic: 'ズキズキ (zukizuki)',
    category: 'onomatopoeia',
    meaning_id: 'berdenyut-denyut nyeri (sakit kepala, sakit gigi)',
    summary_id: 'Rasa sakit berirama ritmis seiring detak pembuluh darah (nyeri tajam berdenyut).',
    nuance_id: 'Rasa sakit berirama ritmis seiring detak pembuluh darah (nyeri tajam berdenyut).',
    domain: 'kesehatan-k3',
    examples: [
      { jp: '虫歯がズキズキ痛んで眠れない。', id: 'Gigi berlubang terasa sakit berdenyut-denyut hingga tidak bisa tidur.' }
    ]
  },
  {
    id: 'ono-gangan',
    word: 'ガンガン',
    type: 'giongo / gitaigo',
    reading: 'gangan',
    topic: 'ガンガン (gangan)',
    category: 'onomatopoeia',
    meaning_id: 'sakit kepala berat serasa dipukul palu; suara dentuman keras bertalu-talu',
    summary_id: 'Sakit kepala hebat (hangover/migrain berat) atau aksi dilakukan dengan intensitas maksimal tanpa ragu.',
    nuance_id: 'Sakit kepala hebat (hangover/migrain berat) atau aksi dilakukan dengan intensitas maksimal tanpa ragu.',
    domain: 'kesehatan-k3',
    examples: [
      { jp: '二日酔いで頭がガンガンする。', id: 'Kepala saya sakit serasa dipukul palu karena mabuk kemarin.' }
    ]
  }
];

const BY_ID = new Map<string, NuanceNote>();
for (const note of CANONICAL_NUANCE_NOTES) {
  BY_ID.set(note.id, note);
}

/**
 * Retrieve all nuance notes across all 5 domains
 */
export function getAllNuanceNotes(): NuanceNote[] {
  return [...CANONICAL_NUANCE_NOTES];
}

/**
 * Retrieve a specific nuance note by its unique identifier
 */
export function getNuanceNoteById(id: string): NuanceNote | undefined {
  return BY_ID.get(id);
}

/**
 * Retrieve all nuance notes within a specific category
 */
export function getNuanceNotesByCategory(category: string): NuanceNote[] {
  const catLower = category.toLowerCase();
  return CANONICAL_NUANCE_NOTES.filter(n => n.category.toLowerCase() === catLower);
}

/**
 * Search nuance notes by topic, keyword, or Indonesian summary
 */
export function searchNuanceNotes(query: string): NuanceNote[] {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return CANONICAL_NUANCE_NOTES.filter(n => {
    return (
      n.topic.toLowerCase().includes(q) ||
      (n.reading && n.reading.toLowerCase().includes(q)) ||
      (n.role && n.role.toLowerCase().includes(q)) ||
      n.summary_id.toLowerCase().includes(q) ||
      (n.explanation_id && n.explanation_id.toLowerCase().includes(q)) ||
      (n.word && n.word.toLowerCase().includes(q))
    );
  });
}

/**
 * Find the most relevant nuance note for a grammar pattern or particle
 */
export function findNuanceForPattern(pattern: string): NuanceNote | undefined {
  if (!pattern) return undefined;
  const p = pattern.trim().replace(/^〜/, '');

  // Exact topic match
  const exact = CANONICAL_NUANCE_NOTES.find(n => n.topic.includes(p) || (n.word && n.word === p));
  if (exact) return exact;

  // Particle match
  if (p === 'は' || p === 'wa') return BY_ID.get('particle-wa');
  if (p === 'が' || p === 'ga') return BY_ID.get('particle-ga');
  if (p === 'を' || p === 'wo' || p === 'o') return BY_ID.get('particle-wo');
  if (p === 'に' || p === 'ni') return BY_ID.get('particle-ni');
  if (p === 'で' || p === 'de') return BY_ID.get('particle-de');
  if (p === 'と' || p === 'to') return BY_ID.get('particle-to');
  if (p === 'も' || p === 'mo') return BY_ID.get('particle-mo');
  if (p === 'の' || p === 'no') return BY_ID.get('particle-no');

  // Search fallback
  const results = searchNuanceNotes(p);
  return results.length > 0 ? results[0] : undefined;
}
