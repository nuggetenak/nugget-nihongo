// grammar-lens-ir-a2-1.js — Irodori: Japanese for Life in Japan (Elementary 1 / A2-1)
// Book Lens: Grammar patterns per lesson, linked to GrammarGlobal
// Source: Official Irodori Grammar Notes PDF (CC BY 4.0, Japan Foundation)
// PDF: https://www.irodori.jpf.go.jp/assets/data/Grammar_all.pdf
// Total: 18 lessons (初級1 Shokyuu 1 / Elementary 1)
// Entries: 65
// Status: COMPLETE — filled from SPEC-GRAMMAR-IRODORI-A2.md
// Generated: 2026-04-15 · Architecture v3

window.grammarLensIrodoriA21 = {
  meta: {
    book         : 'irodori-a2-1',
    title        : 'Irodori: Japanese for Life in Japan — Elementary 1 (A2)',
    publisher    : 'Japan Foundation',
    jf_level     : 'A2',
    cefr_level   : 'A2',
    jlpt_range   : ['n5', 'n4'],
    structure    : 'lesson',
    total_lessons: 18,
    url          : 'https://www.irodori.jpf.go.jp/en/elementary01/pdf.html',
    notes        : 'Elementary 1 covers: plain/polite style switch, ている usages ①②③, te-form chaining, potential, conditionals (たら・と), comparatives, giving/receiving, relative clauses, and more. Bridges N5→N4.',
  },

  // ── LESSON TOPIC MAP (初級1 per Grammar_all.pdf) ──────────────────────────
  // Lesson 1:  今の私 (Who I am now) — part 1
  // Lesson 2:  今の私 (Who I am now) — part 2
  // Lesson 3:  季節と天気 (Seasons and weather) — part 1
  // Lesson 4:  季節と天気 (Seasons and weather) — part 2
  // Lesson 5:  私の町 (My town) — part 1
  // Lesson 6:  私の町 (My town) — part 2
  // Lesson 7:  いっしょに出かける (Going out together) — part 1
  // Lesson 8:  いっしょに出かける (Going out together) — part 2
  // Lesson 9:  日本語学習 (Learning Japanese) — part 1
  // Lesson 10: 日本語学習 (Learning Japanese) — part 2
  // Lesson 11: おいしい料理 (Delicious food) — part 1
  // Lesson 12: おいしい料理 (Delicious food) — part 2
  // Lesson 13: 仕事の連絡 (Work communication) — part 1
  // Lesson 14: 仕事の連絡 (Work communication) — part 2
  // Lesson 15: 健康な生活 (Healthy living) — part 1
  // Lesson 16: 健康な生活 (Healthy living) — part 2
  // Lesson 17: 交際 (Social relationships) — part 1
  // Lesson 18: 交際 (Social relationships) — part 2

  entries: [

    // ── Lesson 1: 今の私 ① ───────────────────────────────────────────────────
    {
      id: 'ir-a2-1-001', global_grammar_id: 'gn5-00001',
      lesson: 1, seq: 1,
      pattern: '丁寧体・普通体 (Polite style ↔ Plain style)',
      raw: '丁寧体（V-ます・N/A-です）↔ 普通体（V辞書形・Vた形・Aい/だ）',
      desc: 'Bahasa Jepang memiliki dua gaya bicara utama: <b>丁寧体</b> (gaya sopan — menggunakan ます/です) dan <b>普通体</b> (gaya biasa/kasual — menggunakan bentuk kamus atau た). Irodori Elementary 1 memperkenalkan perbedaan keduanya dan kapan masing-masing digunakan.',
      examples: [
        { jp: '明日は休みます。（丁寧体） → 明日は休む。（普通体）', id: 'Besok saya tidak masuk. (sopan) → Besok tidak masuk. (kasual)' },
        { jp: '日本語を勉強しています。（丁寧体） → 日本語を勉強している。（普通体）', id: 'Saya sedang belajar bahasa Jepang. (sopan) → Sedang belajar bahasa Jepang. (kasual)' },
        { jp: '友だちと話すとき、普通体を使います。', id: 'Saat berbicara dengan teman, gunakan gaya biasa.' },
      ],
      notes: '丁寧体 untuk situasi formal/dengan atasan; 普通体 untuk teman/keluarga. Elementary 1 memperluas penggunaan 普通体.',
    },
    {
      id: 'ir-a2-1-002', global_grammar_id: 'gn5-00063',
      lesson: 1, seq: 2,
      pattern: '【期間】に なります',
      raw: '期間（〜年/〜ヶ月/〜年間）＋になります',
      desc: 'Menyatakan <b>berapa lama sejak suatu peristiwa terjadi atau akan terjadi</b>. Pola: durasi + に + なります = "sudah/akan menjadi [durasi]".',
      examples: [
        { jp: '日本に来て3年になります。', id: 'Sudah tiga tahun sejak saya datang ke Jepang.' },
        { jp: '来月、この会社に入って1年になります。', id: 'Bulan depan akan genap satu tahun saya masuk perusahaan ini.' },
        { jp: '結婚して5年になりました。', id: 'Sudah lima tahun kami menikah.' },
      ],
    },
    {
      id: 'ir-a2-1-003', global_grammar_id: 'gn5-00010',
      lesson: 1, seq: 3,
      pattern: '【時点】に (partikel waktu spesifik)',
      raw: '時点（曜日・時刻・日付）＋に＋V',
      desc: 'Partikel <b>に</b> menandai <b>titik waktu spesifik</b> kapan suatu tindakan terjadi. Digunakan dengan waktu yang terukur: jam, hari, tanggal, bulan, tahun.',
      examples: [
        { jp: '毎朝7時に起きます。', id: 'Saya bangun jam 7 setiap pagi.' },
        { jp: '月曜日に会議があります。', id: 'Ada rapat hari Senin.' },
        { jp: '4月に日本に来ました。', id: 'Saya datang ke Jepang pada bulan April.' },
      ],
      notes: 'に tidak digunakan dengan: 今日、明日、毎日、先週 (kata waktu relatif).',
    },
    {
      id: 'ir-a2-1-004', global_grammar_id: 'gn5-00029',
      lesson: 1, seq: 4,
      pattern: 'V-ています ① (tindakan sedang berlangsung)',
      raw: 'V〜て形＋います（動作進行中）',
      desc: '<b>V-ています</b> penggunaan pertama: menyatakan tindakan yang <b>sedang berlangsung</b> pada saat bicara. Setara "sedang V-ing" dalam bahasa Indonesia.',
      examples: [
        { jp: '今、ご飯を食べています。', id: 'Sekarang saya sedang makan.' },
        { jp: '電話で話しています。少し待ってください。', id: 'Sedang berbicara di telepon. Tolong tunggu sebentar.' },
        { jp: '子どもたちは外で遊んでいます。', id: 'Anak-anak sedang bermain di luar.' },
      ],
      notes: 'Ini adalah penggunaan ① dari tiga penggunaan ている. Lihat ② (kebiasaan) dan ③ (keadaan hasil).',
    },

    // ── Lesson 2: 今の私 ② ───────────────────────────────────────────────────
    {
      id: 'ir-a2-1-005', global_grammar_id: 'gn4-00052',
      lesson: 2, seq: 1,
      pattern: 'V-ることです (nominalisasi — mendefinisikan)',
      raw: 'V辞書形＋ことです',
      desc: '<b>V-ること</b> mengubah kata kerja menjadi nomina (kata benda abstrak). Sering digunakan untuk mendefinisikan hobi, tujuan, atau kegiatan melalui predikat です.',
      examples: [
        { jp: '私の趣味は写真を撮ることです。', id: 'Hobi saya adalah memotret.' },
        { jp: '私の夢は日本で働くことです。', id: 'Impian saya adalah bekerja di Jepang.' },
        { jp: '大切なことは毎日続けることです。', id: 'Yang penting adalah terus melakukan setiap hari.' },
      ],
      notes: 'こと bersifat lebih formal/abstrak. Bandingkan dengan の yang lebih kasual.',
    },
    {
      id: 'ir-a2-1-006', global_grammar_id: 'gn4-00051',
      lesson: 2, seq: 2,
      pattern: 'V-るのが好きです / 得意です',
      raw: 'V辞書形＋のが＋好き・嫌い・得意・苦手です',
      desc: '<b>V-るの</b> mengubah kata kerja menjadi nomina dengan nuansa lebih kasual/konkret dari こと. Sangat umum dengan adjektif perasaan: 好き、嫌い、得意、苦手.',
      examples: [
        { jp: '山に登るのが好きです。', id: 'Saya suka mendaki gunung.' },
        { jp: '料理をするのが得意ではありません。', id: 'Saya tidak pandai memasak.' },
        { jp: '人前で話すのが苦手です。', id: 'Saya kurang bisa berbicara di depan orang.' },
      ],
    },
    {
      id: 'ir-a2-1-007', global_grammar_id: 'gn5-00030',
      lesson: 2, seq: 3,
      pattern: 'V1-て、V2 (て形チェーン — urutan tindakan)',
      raw: 'V1〜て形、V2〜て形、V3…',
      desc: 'Bentuk <b>て</b> menghubungkan beberapa tindakan secara berurutan: V1 terjadi terlebih dahulu, lalu V2, lalu V3. Menyatakan rangkaian aktivitas.',
      examples: [
        { jp: '朝起きて、シャワーを浴びて、朝ご飯を食べます。', id: 'Pagi bangun, mandi, lalu sarapan.' },
        { jp: 'スーパーに行って、野菜を買いました。', id: 'Saya pergi ke supermarket dan membeli sayuran.' },
        { jp: '図書館で本を借りて、家で読みます。', id: 'Saya meminjam buku di perpustakaan dan membacanya di rumah.' },
      ],
    },
    {
      id: 'ir-a2-1-008', global_grammar_id: 'gn5-00029',
      lesson: 2, seq: 4,
      pattern: 'V-ています ② (kebiasaan / keadaan hasil)',
      raw: 'V〜て形＋います（習慣・結果状態）',
      desc: '<b>V-ています</b> penggunaan kedua: menyatakan (a) <b>kebiasaan rutin</b> yang sedang terus dilakukan, atau (b) <b>keadaan yang merupakan hasil</b> dari suatu tindakan sebelumnya.',
      examples: [
        { jp: '毎日日本語を勉強しています。', id: 'Saya belajar bahasa Jepang setiap hari. (kebiasaan rutin)' },
        { jp: '結婚しています。', id: 'Saya sudah menikah. (keadaan hasil pernikahan)' },
        { jp: '東京に住んでいます。', id: 'Saya tinggal di Tokyo. (keadaan berlanjut)' },
      ],
      notes: 'Bedakan: ① = aksi sedang terjadi saat ini; ② = kebiasaan atau keadaan permanen yang dihasilkan dari aksi sebelumnya.',
    },

    // ── Lesson 3: 季節と天気 ① ───────────────────────────────────────────────
    {
      id: 'ir-a2-1-009', global_grammar_id: 'gn5-00065',
      lesson: 3, seq: 1,
      pattern: 'S1 から、S2 (alasan)',
      raw: 'S1（普通形）から、S2',
      desc: '<b>〜から</b> menyatakan <b>alasan atau penyebab</b>. S1 adalah alasannya, S2 adalah hasilnya. Lebih langsung dan tegas dibanding 〜ので.',
      examples: [
        { jp: '今日は寒いから、コートを着ます。', id: 'Karena hari ini dingin, saya memakai mantel.' },
        { jp: '日本語が好きだから、毎日練習しています。', id: 'Karena saya suka bahasa Jepang, saya berlatih setiap hari.' },
        { jp: '明日は早いから、もう寝ます。', id: 'Karena besok harus pagi-pagi, saya tidur sekarang.' },
      ],
      notes: 'Dalam percakapan kasual, S2 sering dihilangkan jika alasannya sudah cukup jelas.',
    },
    {
      id: 'ir-a2-1-010', global_grammar_id: 'gn4-00004',
      lesson: 3, seq: 2,
      pattern: 'N1 とか（N2 とか） (menyebut contoh)',
      raw: 'N1とか（N2とか）＋V',
      desc: '<b>とか</b> digunakan untuk <b>menyebutkan beberapa contoh</b> dari suatu kategori tanpa menyebutkan semuanya. Lebih kasual dari 〜や〜など.',
      examples: [
        { jp: '春は花見とかピクニックとかをします。', id: 'Di musim semi, kami melakukan hanami atau piknik dan sebagainya.' },
        { jp: '日本の冬は雪とか氷とかが見られます。', id: 'Di musim dingin Jepang, bisa melihat salju atau es dan sebagainya.' },
        { jp: '週末は掃除とか洗濯とかをする予定です。', id: 'Di akhir pekan saya berencana beres-beres atau mencuci pakaian.' },
      ],
    },

    // ── Lesson 4: 季節と天気 ② ───────────────────────────────────────────────
    {
      id: 'ir-a2-1-011', global_grammar_id: 'gn5-00028',
      lesson: 4, seq: 1,
      pattern: '非過去・過去 普通形 (Plain non-past / Past)',
      raw: 'V辞書形（非過去）/ V〜た形（過去）/ A-い（非過去）/ A-かった（過去）',
      desc: 'Mengenal dan menggunakan <b>bentuk biasa (普通形)</b> baik non-past maupun past. Digunakan dalam percakapan kasual dan sebagai dasar pola tata bahasa kompleks.',
      examples: [
        { jp: '昨日、映画を見た。', id: 'Kemarin saya menonton film. (plain past)' },
        { jp: '明日も行く？', id: 'Besok juga ikut? (plain non-past)' },
        { jp: '先週は忙しかった。今週は暇だ。', id: 'Minggu lalu sibuk. Minggu ini ada waktu luang.' },
      ],
      notes: 'Bentuk 普通形 adalah dasar untuk pola: んです、から、と思う、と言った, dll.',
    },
    {
      id: 'ir-a2-1-012', global_grammar_id: 'gn5-00029',
      lesson: 4, seq: 2,
      pattern: 'V-ています ③ (kebiasaan rutin / aktivitas berkelanjutan)',
      raw: 'V〜て形＋います（継続的・定期的習慣）',
      desc: '<b>V-ています</b> penggunaan ketiga: menyatakan <b>rutinitas atau aktivitas yang dilakukan secara terus-menerus</b>, terutama terkait pekerjaan, kegiatan sehari-hari, atau gaya hidup.',
      examples: [
        { jp: 'スーパーで働いています。', id: 'Saya bekerja di supermarket. (pekerjaan rutin)' },
        { jp: '毎朝ジョギングしています。', id: 'Setiap pagi saya jogging.' },
        { jp: '今、日本語を習っています。', id: 'Sekarang saya sedang belajar bahasa Jepang (dalam proses panjang).' },
      ],
      notes: 'Nuansa ketiga: menekankan aktivitas yang merupakan bagian dari rutinitas/gaya hidup, bukan hanya terjadi saat ini.',
    },
    {
      id: 'ir-a2-1-013', global_grammar_id: 'gn5-00047',
      lesson: 4, seq: 3,
      pattern: 'V-たら、～ (kondisional たら)',
      raw: 'V〜た形＋ら、S2',
      desc: '<b>〜たら</b> menyatakan kondisi: "kalau/setelah V terjadi, maka...". Bisa menyatakan kondisi hipotetis (andaikan) atau urutan temporal (setelah selesai).',
      examples: [
        { jp: '春になったら、花見をしましょう。', id: 'Kalau musim semi datang, mari hanami.' },
        { jp: '宿題が終わったら、遊んでもいいです。', id: 'Setelah PR selesai, boleh bermain.' },
        { jp: '安かったら、買います。', id: 'Kalau harganya murah, saya beli.' },
      ],
    },

    // ── Lesson 5: 私の町 ① ───────────────────────────────────────────────────
    {
      id: 'ir-a2-1-014', global_grammar_id: 'gn5-00050',
      lesson: 5, seq: 1,
      pattern: 'V-ることができます (kemampuan/kemungkinan)',
      raw: 'V辞書形＋ことができます',
      desc: 'Menyatakan <b>kemampuan atau kemungkinan</b> melakukan V. Lebih formal dari bentuk potensial (〜られます). Sering digunakan untuk menjelaskan kemampuan atau fasilitas yang tersedia.',
      examples: [
        { jp: 'この図書館では本を借りることができます。', id: 'Di perpustakaan ini bisa meminjam buku.' },
        { jp: '私は少し日本語を話すことができます。', id: 'Saya bisa berbicara sedikit bahasa Jepang.' },
        { jp: 'ここではカードで払うことができます。', id: 'Di sini bisa membayar dengan kartu.' },
      ],
    },

    // ── Lesson 6: 私の町 ② ───────────────────────────────────────────────────
    {
      id: 'ir-a2-1-015', global_grammar_id: 'gn5-00040',
      lesson: 6, seq: 1,
      pattern: 'N/V に行きたいんですが… (ingin + penjelasan halus)',
      raw: 'V辞書形／N＋に行きたいんですが…',
      desc: '<b>〜たいんですが…</b> menggabungkan keinginan (〜たい) dengan nuansa penjelasan atau permohonan informasi (んですが). Kalimat dibiarkan menggantung (…) untuk mengundang respons dari lawan bicara.',
      examples: [
        { jp: '郵便局に行きたいんですが、どこですか？', id: 'Saya ingin pergi ke kantor pos, di mana ya?' },
        { jp: '日本語を習いたいんですが、どこかいいところを知っていますか？', id: 'Saya ingin belajar bahasa Jepang, apakah tahu tempat yang bagus?' },
        { jp: 'もう少し安くしたいんですが…', id: 'Saya ingin agak murah lagi, tapi...' },
      ],
    },
    {
      id: 'ir-a2-1-016', global_grammar_id: 'gn5-00030',
      lesson: 6, seq: 2,
      pattern: 'V-て、～ (て形 — cara/sarana)',
      raw: 'V〜て形（手段・方法）＋V2',
      desc: 'Bentuk <b>て</b> digunakan untuk menyatakan <b>cara atau sarana</b> melakukan tindakan berikutnya. V1-て menjawab "bagaimana caranya" untuk mencapai V2.',
      examples: [
        { jp: '電車に乗って、大阪に行きます。', id: 'Pergi ke Osaka dengan naik kereta.' },
        { jp: 'バスに乗り換えて行ってください。', id: 'Pergilah dengan naik bus (setelah transit).' },
        { jp: '左に曲がって、まっすぐ行ってください。', id: 'Belok kiri, lalu jalan lurus.' },
      ],
    },
    {
      id: 'ir-a2-1-017', global_grammar_id: 'gn5-00002',
      lesson: 6, seq: 3,
      pattern: 'N1 じゃなくて、N2 (koreksi — bukan N1, tapi N2)',
      raw: 'N1じゃなくて（N1ではなくて）、N2（です）',
      desc: '<b>じゃなくて</b> digunakan untuk <b>mengoreksi informasi</b>: "bukan N1, melainkan N2". Bentuk ini memperhalus koreksi sehingga tidak terkesan terlalu langsung.',
      examples: [
        { jp: '右じゃなくて、左に曲がってください。', id: 'Bukan ke kanan, tolong belok ke kiri.' },
        { jp: '月曜日じゃなくて、火曜日に来てください。', id: 'Bukan hari Senin, tapi datanglah hari Selasa.' },
        { jp: '田中さんじゃなくて、山田さんに連絡してください。', id: 'Bukan Tanaka-san, tolong hubungi Yamada-san.' },
      ],
    },

    // ── Lesson 7: いっしょに出かける ① ──────────────────────────────────────
    {
      id: 'ir-a2-1-018', global_grammar_id: 'gn5-00044',
      lesson: 7, seq: 1,
      pattern: 'N はどうですか？ (saran/usul)',
      raw: 'N／Vること＋はどうですか？',
      desc: '<b>〜はどうですか？</b> digunakan untuk <b>menyarankan atau mengusulkan</b> sesuatu kepada lawan bicara. Sopan dan tidak memaksa, mengundang lawan bicara untuk mempertimbangkan.',
      examples: [
        { jp: '週末、映画はどうですか？', id: 'Akhir pekan, bagaimana kalau nonton film?' },
        { jp: '少し休むのはどうですか？', id: 'Bagaimana kalau istirahat sebentar?' },
        { jp: 'コーヒーはどうですか？', id: 'Bagaimana dengan kopi? (ditawarkan)' },
      ],
    },
    {
      id: 'ir-a2-1-019', global_grammar_id: 'gn4-00025',
      lesson: 7, seq: 2,
      pattern: 'N でもいいですか？ (apakah N tidak masalah?)',
      raw: 'N＋でもいいですか？',
      desc: '<b>〜でもいいですか？</b> meminta persetujuan atau izin dengan sesuatu yang mungkin bukan pilihan ideal. Artinya "apakah kalau [N] juga tidak masalah?"',
      examples: [
        { jp: '3時でもいいですか？', id: 'Apakah jam 3 juga tidak masalah?' },
        { jp: '一人でもいいですか？', id: 'Apakah sendirian juga tidak masalah?' },
        { jp: 'お茶でもいいですか？コーヒーがないんです。', id: 'Apakah teh juga tidak masalah? Tidak ada kopi.' },
      ],
    },
    {
      id: 'ir-a2-1-020', global_grammar_id: 'gn5-00012',
      lesson: 7, seq: 3,
      pattern: 'N で、～ (alasan/penyebab dengan nomina)',
      raw: 'N（理由・原因）＋で、S',
      desc: 'Partikel <b>で</b> setelah nomina menyatakan <b>alasan atau penyebab</b>. Berbeda dari 〜から yang membutuhkan kalimat penuh; pola ini cukup menggunakan nomina saja.',
      examples: [
        { jp: '電車の遅延で、遅刻しました。', id: 'Karena keterlambatan kereta, saya terlambat.' },
        { jp: '仕事で、行けません。', id: 'Karena pekerjaan, saya tidak bisa pergi.' },
        { jp: '病気で、学校を休みました。', id: 'Karena sakit, saya tidak masuk sekolah.' },
      ],
    },

    // ── Lesson 8: いっしょに出かける ② ──────────────────────────────────────
    {
      id: 'ir-a2-1-021', global_grammar_id: 'gn5-00082',
      lesson: 8, seq: 1,
      pattern: 'もう V-ました (sudah selesai)',
      raw: 'もう＋V〜ました',
      desc: '<b>もう V-ました</b> menyatakan bahwa suatu tindakan <b>sudah selesai dilakukan</b>. もう menambahkan nuansa "sudah" atau "sekarang sudah". Pasangannya: まだ V-ていません (belum).',
      examples: [
        { jp: 'もう宿題をしました。', id: 'Saya sudah mengerjakan PR.' },
        { jp: 'もうご飯を食べましたか？', id: 'Apakah sudah makan?' },
        { jp: 'はい、もう終わりました。', id: 'Ya, sudah selesai.' },
      ],
    },
    {
      id: 'ir-a2-1-022', global_grammar_id: 'gn5-00051',
      lesson: 8, seq: 2,
      pattern: 'V-たことがあります (pernah melakukan)',
      raw: 'V〜た形＋ことがあります',
      desc: '<b>V-たことがあります</b> menyatakan <b>pengalaman pernah melakukan</b> sesuatu setidaknya sekali di masa lalu. Konteksnya adalah pengalaman hidup secara umum, bukan peristiwa spesifik.',
      examples: [
        { jp: '富士山に登ったことがあります。', id: 'Saya pernah mendaki Gunung Fuji.' },
        { jp: '日本料理を作ったことがありますか？', id: 'Apakah pernah memasak masakan Jepang?' },
        { jp: '一度も負けたことがありません。', id: 'Saya belum pernah kalah sekali pun.' },
      ],
    },
    {
      id: 'ir-a2-1-023', global_grammar_id: 'gn5-00043',
      lesson: 8, seq: 3,
      pattern: 'V-に行きませんか？ (ajakan — maukah kamu...?)',
      raw: 'V〜ます形＋に行きませんか？',
      desc: '<b>〜ませんか？</b> digunakan untuk <b>mengajak</b> lawan bicara melakukan sesuatu bersama. Sopan, tidak memaksa, dan mengundang respons.',
      examples: [
        { jp: '来週、映画を見に行きませんか？', id: 'Minggu depan, maukah kita pergi menonton film?' },
        { jp: '一緒に昼ご飯を食べに行きませんか？', id: 'Maukah kita pergi makan siang bersama?' },
        { jp: '花見に行きませんか？', id: 'Maukah kita pergi hanami?' },
      ],
    },
    {
      id: 'ir-a2-1-024', global_grammar_id: 'gn5-00054',
      lesson: 8, seq: 4,
      pattern: 'N の前に、～ (sebelum N)',
      raw: 'N（nomina/V辞書形+こと）＋の前に、S',
      desc: '<b>〜の前に</b> menyatakan bahwa S terjadi <b>sebelum</b> N. Digunakan untuk menyatakan urutan kegiatan atau persiapan.',
      examples: [
        { jp: '寝る前に、歯を磨いてください。', id: 'Sebelum tidur, gosok gigi.' },
        { jp: '出かける前に、窓を閉めてください。', id: 'Sebelum keluar, tutup jendela.' },
        { jp: '映画の前に、夕食を食べましょう。', id: 'Sebelum film, mari makan malam.' },
      ],
    },
    {
      id: 'ir-a2-1-025', global_grammar_id: 'gn5-00040',
      lesson: 8, seq: 5,
      pattern: 'V-たいんですが… (ingin + penjelasan/permohonan)',
      raw: 'V〜たい＋んですが…',
      desc: '<b>V-たいんですが…</b> mengungkapkan keinginan sambil mengundang bantuan atau saran. 〜んですが menambah nuansa penjelasan dan membuat kalimat terasa lebih sopan.',
      examples: [
        { jp: '来週、休みたいんですが…', id: 'Saya ingin libur minggu depan, tapi...' },
        { jp: '日本語を学びたいんですが、どこかいい教室はありますか？', id: 'Saya ingin belajar bahasa Jepang, ada kelas yang bagus?' },
        { jp: 'もう少し安くしたいんですが…', id: 'Saya ingin agak murah lagi...' },
      ],
    },

    // ── Lesson 9: 日本語学習 ① ───────────────────────────────────────────────
    {
      id: 'ir-a2-1-026', global_grammar_id: 'gn5-00012',
      lesson: 9, seq: 1,
      pattern: 'N で ＜手段＞ (dengan N / menggunakan N)',
      raw: 'N（道具・手段）＋で＋V',
      desc: 'Partikel <b>で</b> menyatakan <b>cara atau alat</b> yang digunakan untuk melakukan sesuatu. "Dengan [N]" atau "menggunakan [N]".',
      examples: [
        { jp: 'スマホで日本語を勉強しています。', id: 'Saya belajar bahasa Jepang dengan smartphone.' },
        { jp: '日本語でメモを書きました。', id: 'Saya menulis catatan dalam bahasa Jepang.' },
        { jp: 'アプリで漢字を調べます。', id: 'Saya mencari kanji menggunakan aplikasi.' },
      ],
    },
    {
      id: 'ir-a2-1-027', global_grammar_id: 'gn5-00005',
      lesson: 9, seq: 2,
      pattern: 'N1 は、～ (topik + kontras)',
      raw: 'N1は、〜が、N2は〜（対比）',
      desc: 'Partikel <b>は</b> menandai topik kalimat dan sekaligus menyiratkan <b>kontras atau perbandingan</b> dengan sesuatu yang lain. "Mengenai N1, ..."',
      examples: [
        { jp: '漢字は難しいですが、ひらがなは簡単です。', id: 'Kanji memang sulit, tapi hiragana mudah.' },
        { jp: '聞くのはできますが、話すのはまだ難しいです。', id: 'Mendengarkan bisa, tapi berbicara masih sulit.' },
        { jp: '読むのは得意ですが、書くのは苦手です。', id: 'Membaca pandai, tapi menulis kurang bisa.' },
      ],
    },
    {
      id: 'ir-a2-1-028', global_grammar_id: 'gn4-00034',
      lesson: 9, seq: 3,
      pattern: 'V-てもらえませんか？ (bisakah kamu... untuk saya?)',
      raw: 'V〜て形＋もらえませんか？／もらえますか？',
      desc: '<b>V-てもらえませんか？</b> adalah permintaan sopan kepada lawan bicara untuk melakukan sesuatu demi kepentingan pembicara. Lebih sopan dari 〜てください.',
      examples: [
        { jp: 'もう一度説明してもらえませんか？', id: 'Bisakah Anda menjelaskan sekali lagi?' },
        { jp: 'ゆっくり話してもらえますか？', id: 'Bisakah berbicara lebih pelan?' },
        { jp: 'これを日本語に直してもらえませんか？', id: 'Bisakah kamu membetulkan ini ke bahasa Jepang?' },
      ],
    },
    {
      id: 'ir-a2-1-029', global_grammar_id: 'gn5-00081',
      lesson: 9, seq: 4,
      pattern: 'V-方 (cara melakukan V)',
      raw: 'V〜ます形（ます除く）＋方',
      desc: '<b>V-方</b> menyatakan "cara melakukan V". Dibentuk dari ます-stem (bentuk ます tanpa ます) + 方 (かた). Digunakan untuk menanyakan atau menjelaskan metode melakukan sesuatu.',
      examples: [
        { jp: 'この漢字の読み方を教えてください。', id: 'Tolong ajari saya cara membaca kanji ini.' },
        { jp: 'パスタの作り方を知っていますか？', id: 'Apakah kamu tahu cara membuat pasta?' },
        { jp: 'ごみの捨て方がわかりません。', id: 'Saya tidak tahu cara membuang sampah.' },
      ],
      notes: 'Contoh ます-stem: 食べ(ます)→ 食べ方, 書き(ます)→ 書き方, 読み(ます)→ 読み方.',
    },

    // ── Lesson 10: 日本語学習 ② ──────────────────────────────────────────────
    {
      id: 'ir-a2-1-030', global_grammar_id: 'gn5-00036',
      lesson: 10, seq: 1,
      pattern: 'V-てみたいんですが… (ingin mencoba)',
      raw: 'V〜て形＋みたいんですが…',
      desc: '<b>V-てみたい</b> menyatakan keinginan untuk <b>mencoba</b> melakukan sesuatu. Ditambah んですが mengundang informasi atau bantuan dari lawan bicara.',
      examples: [
        { jp: '茶道を習ってみたいんですが、どこかいいところはありますか？', id: 'Saya ingin mencoba belajar upacara teh, ada tempat yang bagus?' },
        { jp: '日本のお酒を飲んでみたいんですが…', id: 'Saya ingin mencoba sake Jepang...' },
        { jp: '一度作ってみたいと思っています。', id: 'Saya ingin mencoba membuatnya sekali.' },
      ],
    },
    {
      id: 'ir-a2-1-031', global_grammar_id: 'gn5-00044',
      lesson: 10, seq: 2,
      pattern: 'V-ましょうか？ (bolehkah saya...? / apakah kita...?)',
      raw: 'V〜ます形＋ましょうか？',
      desc: '<b>V-ましょうか？</b> menawarkan bantuan kepada lawan bicara ("bolehkah saya melakukan V untukmu?") atau mengusulkan tindakan bersama ("apakah kita V?").',
      examples: [
        { jp: '窓を開けましょうか？', id: 'Bolehkah saya membukakan jendelanya?' },
        { jp: '一緒に行きましょうか？', id: 'Apakah kita pergi bersama?' },
        { jp: '手伝いましょうか？', id: 'Bolehkah saya membantu?' },
      ],
    },
    {
      id: 'ir-a2-1-032', global_grammar_id: 'gn5-00056',
      lesson: 10, seq: 3,
      pattern: 'N のとき、～ (ketika / saat N)',
      raw: 'N（時点・状況）のとき（に）、S',
      desc: '<b>〜のとき</b> menyatakan <b>waktu atau situasi</b> ketika suatu tindakan terjadi. "Ketika N, ..." Bisa diikuti partikel に (menekankan titik waktu) atau tanpa に.',
      examples: [
        { jp: '子どものとき、よくここで遊びました。', id: 'Waktu kecil, saya sering bermain di sini.' },
        { jp: '困ったとき、相談してください。', id: 'Saat kesulitan, konsultasikan kepada saya.' },
        { jp: '暇なとき、本を読みます。', id: 'Saat ada waktu luang, saya membaca buku.' },
      ],
    },

    // ── Lesson 11: おいしい料理 ① ─────────────────────────────────────────────
    {
      id: 'ir-a2-1-033', global_grammar_id: 'gn5-00008',
      lesson: 11, seq: 1,
      pattern: 'V-に行きます (pergi dengan tujuan V)',
      raw: 'V〜ます形＋に行きます／来ます',
      desc: 'Partikel <b>に</b> menyatakan <b>tujuan pergerakan</b>. "Pergi/datang untuk melakukan V." V dalam bentuk ます-stem ditambah に sebelum 行きます/来ます.',
      examples: [
        { jp: '買い物に行きます。', id: 'Saya pergi belanja.' },
        { jp: '友だちと食事に行きました。', id: 'Saya pergi makan bersama teman.' },
        { jp: '図書館へ本を返しに来ました。', id: 'Saya datang ke perpustakaan untuk mengembalikan buku.' },
      ],
    },
    {
      id: 'ir-a2-1-034', global_grammar_id: 'gn5-00058',
      lesson: 11, seq: 2,
      pattern: 'N1 と N2、どっちがいいですか？ (pilihan — mana yang lebih baik?)',
      raw: 'N1とN2（と）、どっち／どちらが〜ですか？',
      desc: 'Pola untuk <b>meminta pilihan antara dua opsi</b>. "Di antara N1 dan N2, mana yang lebih [adjektif]?" どっち lebih kasual, どちら lebih formal.',
      examples: [
        { jp: 'ラーメンとすし、どっちが好きですか？', id: 'Ramen dan sushi, mana yang kamu sukai?' },
        { jp: '電車とバス、どちらが速いですか？', id: 'Kereta dan bus, mana yang lebih cepat?' },
        { jp: 'AとB、どっちにしますか？', id: 'A dan B, mana yang kamu pilih?' },
      ],
    },
    {
      id: 'ir-a2-1-035', global_grammar_id: 'gn5-00078',
      lesson: 11, seq: 3,
      pattern: 'N のほうがいいです (N lebih baik)',
      raw: 'N＋のほうが＋A（形容詞）です／Vほうがいい',
      desc: '<b>〜のほうが</b> menyatakan bahwa N <b>lebih baik atau lebih [adjektif]</b> dibandingkan yang lain. Digunakan untuk membandingkan atau memberikan rekomendasi.',
      examples: [
        { jp: '電車のほうが速いです。', id: 'Kereta lebih cepat.' },
        { jp: '早く行ったほうがいいですよ。', id: 'Lebih baik pergi lebih awal.' },
        { jp: 'こちらのほうが新鮮ですよ。', id: 'Yang ini lebih segar.' },
      ],
    },
    {
      id: 'ir-a2-1-036', global_grammar_id: 'gn4-00003',
      lesson: 11, seq: 4,
      pattern: '疑問詞 でもいいです (apa pun tidak masalah)',
      raw: '疑問詞（何・どこ・誰・いつ）＋でもいいです',
      desc: '<b>疑問詞 + でも</b> menyatakan bahwa <b>pilihan apa pun tidak masalah</b>. "Apa pun boleh / Siapa pun boleh / Kapan pun boleh."',
      examples: [
        { jp: '何でもいいです。お任せします。', id: 'Apa pun boleh. Saya serahkan kepada Anda.' },
        { jp: 'どこでもいいですよ。あなたに決めてもらっていいです。', id: 'Di mana pun boleh. Anda yang memutuskan.' },
        { jp: '誰でも参加できます。', id: 'Siapa pun bisa ikut serta.' },
      ],
    },

    // ── Lesson 12: おいしい料理 ② ─────────────────────────────────────────────
    {
      id: 'ir-a2-1-037', global_grammar_id: 'gn5-00026',
      lesson: 12, seq: 1,
      pattern: 'な-adjective (predikat) — な-adj です',
      raw: 'な形容詞（語幹）＋です',
      desc: '<b>な-adjective</b> sebagai predikat: diikuti langsung oleh です tanpa perubahan bentuk dasar. Bentuk negatif: 〜じゃないです / 〜ではありません.',
      examples: [
        { jp: 'この料理はとても有名です。', id: 'Masakan ini sangat terkenal.' },
        { jp: '彼女はとても親切です。', id: 'Dia (perempuan) sangat baik hati.' },
        { jp: 'この町は静かじゃないです。', id: 'Kota ini tidak tenang.' },
      ],
    },
    {
      id: 'ir-a2-1-038', global_grammar_id: 'gn5-00026',
      lesson: 12, seq: 2,
      pattern: 'な-adj で、～ (bentuk て dari な-adjective)',
      raw: 'な形容詞（語幹）＋で、S2',
      desc: '<b>な-adjective + で</b> adalah bentuk て (te-form) dari な-adjective. Menghubungkan dua kalimat atau menyatakan dua sifat sekaligus.',
      examples: [
        { jp: 'この店は有名で、いつも込んでいます。', id: 'Toko ini terkenal dan selalu ramai.' },
        { jp: '彼は親切で、みんなに好かれています。', id: 'Dia baik hati dan disukai semua orang.' },
        { jp: 'この部屋は静かで、広いです。', id: 'Kamar ini tenang dan luas.' },
      ],
      notes: 'い-adjective bentuk て: 〜くて. な-adjective bentuk て: 〜で. Nomina bentuk て: 〜で (sama dengan で lokasi, tapi konteks berbeda).',
    },
    {
      id: 'ir-a2-1-039', global_grammar_id: 'gn5-00024',
      lesson: 12, seq: 3,
      pattern: 'い-adj くて、～ (bentuk て dari い-adjective)',
      raw: 'い形容詞（〜い→〜くて）＋V/A',
      desc: '<b>い-adjective + くて</b> adalah bentuk て dari い-adjective. Menghubungkan dua sifat atau menjadi alasan dari suatu keadaan.',
      examples: [
        { jp: 'この料理は辛くて、食べられません。', id: 'Masakan ini pedas dan saya tidak bisa memakannya.' },
        { jp: '今日は暑くて、疲れました。', id: 'Hari ini panas sehingga saya lelah.' },
        { jp: 'このケーキは甘くておいしいです。', id: 'Kue ini manis dan enak.' },
      ],
    },
    {
      id: 'ir-a2-1-040', global_grammar_id: 'gn5-00036',
      lesson: 12, seq: 4,
      pattern: 'V-てみます (mencoba melakukan)',
      raw: 'V〜て形＋みます',
      desc: '<b>V-てみます</b> menyatakan melakukan V sebagai percobaan atau pengalaman baru. "Mencoba V" dengan nuansa penasaran atau niat untuk merasakan hasilnya.',
      examples: [
        { jp: '一度食べてみます。', id: 'Saya akan mencoba makan sekali.' },
        { jp: '新しいレストランに行ってみましょう。', id: 'Mari mencoba pergi ke restoran baru.' },
        { jp: '着てみてもいいですか？', id: 'Bolehkah saya mencoba memakainya?' },
      ],
    },
    {
      id: 'ir-a2-1-041', global_grammar_id: 'gn4-00073',
      lesson: 12, seq: 5,
      pattern: '自動詞・他動詞 (verba intransitif / transitif)',
      raw: '自動詞（Vが〜）vs 他動詞（Nを〜）',
      desc: '<b>自動詞</b> (intransitif) tidak membutuhkan objek langsung — tindakan terjadi sendiri (partikel が). <b>他動詞</b> (transitif) membutuhkan objek — seseorang melakukan tindakan kepada sesuatu (partikel を).',
      examples: [
        { jp: '電気がつきました。（自動詞）', id: 'Lampunya menyala. (intransitif — sendiri)' },
        { jp: '電気をつけました。（他動詞）', id: 'Saya menyalakan lampu. (transitif — saya melakukan)' },
        { jp: 'ドアが開きました。vs ドアを開けました。', id: 'Pintunya terbuka. vs Saya membuka pintu.' },
      ],
      notes: 'Pasangan umum: つく(自)↔つける(他)、開く(自)↔開ける(他)、閉まる(自)↔閉める(他).',
    },

    // ── Lesson 13: 仕事の連絡 ① ──────────────────────────────────────────────
    {
      id: 'ir-a2-1-042', global_grammar_id: 'gn4-00048',
      lesson: 13, seq: 1,
      pattern: '〜んですが… (penjelasan — memohon pemahaman)',
      raw: 'V普通形／A普通形＋んですが…',
      desc: '<b>〜んですが</b> menambahkan nuansa <b>penjelasan atau permohonan</b>. Pembicara menjelaskan situasinya sambil mengharapkan respons, bantuan, atau pemahaman dari lawan bicara. Kalimat sengaja dibiarkan menggantung.',
      examples: [
        { jp: '実は、来週休みたいんですが…', id: 'Sebenarnya, saya ingin libur minggu depan, (bagaimana?)' },
        { jp: '少し問題があるんですが、相談してもいいですか？', id: 'Ada sedikit masalah, bolehkah saya berkonsultasi?' },
        { jp: 'ちょっと聞きたいことがあるんですが…', id: 'Ada hal yang ingin saya tanyakan...' },
      ],
    },
    {
      id: 'ir-a2-1-043', global_grammar_id: 'gn4-00053',
      lesson: 13, seq: 2,
      pattern: 'V-そうです (様態 — kelihatannya / sepertinya)',
      raw: 'V〜ます形（ます除く）／A語幹＋そうです',
      desc: '<b>V-そうです (様態)</b> menyatakan <b>perkiraan berdasarkan penglihatan atau kesan langsung</b>. "Kelihatannya akan V" atau "sepertinya [adjektif]".',
      examples: [
        { jp: '雨が降りそうです。', id: 'Sepertinya akan turun hujan.' },
        { jp: 'この料理はおいしそうです。', id: 'Masakan ini kelihatannya enak.' },
        { jp: '彼は疲れそうな顔をしています。', id: 'Wajahnya kelihatan lelah.' },
      ],
      notes: 'Bedakan dari 〜そうだ (伝聞/hearsay): ① 様態 = perkiraan dari penglihatan; ② 伝聞 = informasi dari orang lain (〜と聞いた).',
    },
    {
      id: 'ir-a2-1-044', global_grammar_id: 'gn5-00056',
      lesson: 13, seq: 3,
      pattern: 'V-たいとき、～ (ketika ingin V)',
      raw: 'V〜たい形＋とき（に）、S',
      desc: '<b>〜たいとき</b> menyatakan situasi "ketika ingin melakukan V". Menggunakan 〜たい (keinginan) + とき (waktu/situasi).',
      examples: [
        { jp: '話したいとき、いつでも電話してください。', id: 'Saat ingin berbicara, telepon saya kapan saja.' },
        { jp: '休みたいときは、言ってください。', id: 'Saat ingin istirahat, katakan saja.' },
        { jp: '相談したいときは、上司に声をかけてください。', id: 'Saat ingin berkonsultasi, hubungi atasan Anda.' },
      ],
    },
    {
      id: 'ir-a2-1-045', global_grammar_id: 'gn5-00048',
      lesson: 13, seq: 4,
      pattern: 'V-ると、～ (kondisional と — otomatis/alami)',
      raw: 'V辞書形＋と、S2（自然な結果）',
      desc: '<b>〜と</b> sebagai kondisional menyatakan bahwa S2 adalah <b>hasil alami atau otomatis</b> dari V. Biasanya untuk instruksi, petunjuk arah, atau fakta umum.',
      examples: [
        { jp: 'この道を行くと、駅に着きます。', id: 'Kalau jalan di jalan ini, akan sampai di stasiun.' },
        { jp: '右に曲がると、コンビニがあります。', id: 'Kalau belok kanan, ada konbini.' },
        { jp: 'ボタンを押すと、ドアが開きます。', id: 'Kalau tombolnya ditekan, pintu terbuka.' },
      ],
      notes: 'と untuk kondisi alami/berurutan. Berbeda dari たら (lebih umum/hipotetis) dan ば (lebih formal/tulisan).',
    },

    // ── Lesson 14: 仕事の連絡 ② ──────────────────────────────────────────────
    {
      id: 'ir-a2-1-046', global_grammar_id: 'gn5-00012',
      lesson: 14, seq: 1,
      pattern: 'N で、～ (alasan dengan nomina — konteks kerja)',
      raw: 'N（理由）＋で、S（結果）',
      desc: 'Dalam konteks pekerjaan, <b>N で</b> sering digunakan untuk menyatakan <b>alasan formal atau situasional</b> secara singkat dan efisien.',
      examples: [
        { jp: '急用で、今日は早退します。', id: 'Karena urusan mendadak, hari ini saya pulang lebih awal.' },
        { jp: '体調不良で、欠勤します。', id: 'Karena kondisi badan tidak baik, saya tidak masuk.' },
        { jp: '会議で、電話に出られませんでした。', id: 'Karena rapat, saya tidak bisa menjawab telepon.' },
      ],
    },
    {
      id: 'ir-a2-1-047', global_grammar_id: 'gn4-00061',
      lesson: 14, seq: 2,
      pattern: 'S1。それで、S2 (akibatnya / oleh karena itu)',
      raw: 'S1。それで（だから）、S2',
      desc: '<b>それで</b> menghubungkan dua kalimat sebagai <b>sebab dan akibat</b>. S1 adalah penyebab, それで mengantar ke akibat atau tindakan lanjutan di S2.',
      examples: [
        { jp: '電車が遅れました。それで、遅刻しました。', id: 'Kereta terlambat. Oleh karena itu, saya terlambat.' },
        { jp: '熱があります。それで、今日は休みます。', id: 'Saya demam. Makanya, hari ini saya tidak masuk.' },
        { jp: '来週は忙しいです。それで、今週中に終わらせます。', id: 'Minggu depan sibuk. Jadi, saya selesaikan dalam minggu ini.' },
      ],
    },
    {
      id: 'ir-a2-1-048', global_grammar_id: 'gn4-00025',
      lesson: 14, seq: 3,
      pattern: 'V-てもいいですか？ (bolehkah saya V?)',
      raw: 'V〜て形＋もいいですか？',
      desc: '<b>V-てもいいですか？</b> meminta <b>izin</b> untuk melakukan sesuatu. "Bolehkah saya V?" Merupakan cara yang sopan dan umum untuk meminta persetujuan.',
      examples: [
        { jp: 'トイレに行ってもいいですか？', id: 'Bolehkah saya pergi ke kamar mandi?' },
        { jp: 'ここに座ってもいいですか？', id: 'Bolehkah saya duduk di sini?' },
        { jp: '明日、早めに帰ってもいいですか？', id: 'Bolehkah saya pulang lebih awal besok?' },
      ],
    },
    {
      id: 'ir-a2-1-049', global_grammar_id: 'gn4-00025',
      lesson: 14, seq: 4,
      pattern: 'V-てもいいでしょうか？ (bolehkah saya V? — lebih formal)',
      raw: 'V〜て形＋もいいでしょうか？',
      desc: '<b>V-てもいいでしょうか？</b> adalah versi yang <b>lebih formal dan sopan</b> dari てもいいですか？ Digunakan dalam situasi kerja formal atau kepada atasan/senior.',
      examples: [
        { jp: '資料を見てもいいでしょうか？', id: 'Bolehkah saya melihat dokumennya?' },
        { jp: '来週の会議を変更してもいいでしょうか？', id: 'Bolehkah saya mengubah jadwal rapat minggu depan?' },
        { jp: 'お名前を伺ってもいいでしょうか？', id: 'Bolehkah saya menanyakan nama Anda?' },
      ],
    },
    {
      id: 'ir-a2-1-050', global_grammar_id: 'gn4-00023',
      lesson: 14, seq: 5,
      pattern: 'V-なければなりません (harus V)',
      raw: 'V〜ない形＋なければなりません（なければならない）',
      desc: '<b>V-なければなりません</b> menyatakan <b>kewajiban atau keharusan</b>. "Harus V / wajib V." Dibentuk dari bentuk ない + なければ + なりません.',
      examples: [
        { jp: 'レポートを明日までに出さなければなりません。', id: 'Saya harus mengumpulkan laporan paling lambat besok.' },
        { jp: '毎日薬を飲まなければなりません。', id: 'Saya harus minum obat setiap hari.' },
        { jp: '規則を守らなければなりません。', id: 'Kita harus mematuhi peraturan.' },
      ],
      notes: 'Variasi lebih kasual: なければならない, なきゃならない, なきゃいけない, なくちゃならない.',
    },

    // ── Lesson 15: 健康な生活 ① ──────────────────────────────────────────────
    {
      id: 'ir-a2-1-051', global_grammar_id: 'gn4-00048',
      lesson: 15, seq: 1,
      pattern: '〜んです ② (mode penjelasan — menjelaskan latar belakang)',
      raw: 'V普通形／A普通形＋んです／のです',
      desc: '<b>〜んです ②</b> digunakan untuk <b>menjelaskan latar belakang atau alasan</b> dari suatu situasi. Berbeda dari 〜んですが (yang mengundang respons), 〜んです digunakan saat memberikan penjelasan.',
      examples: [
        { jp: '実は、昨日から体調が悪いんです。', id: 'Sebenarnya, sejak kemarin kondisi badan saya tidak baik.' },
        { jp: 'このごろ、仕事がとても忙しいんです。', id: 'Akhir-akhir ini pekerjaan saya sangat sibuk.' },
        { jp: 'すみません、少し遅れているんです。', id: 'Maaf, saya agak terlambat.' },
      ],
    },
    {
      id: 'ir-a2-1-052', global_grammar_id: 'gn5-00035',
      lesson: 15, seq: 2,
      pattern: 'V-ないでください (jangan V / tolong jangan)',
      raw: 'V〜ない形＋でください',
      desc: '<b>V-ないでください</b> menyatakan <b>larangan yang sopan</b> atau permintaan untuk tidak melakukan sesuatu. Lebih sopan dari 〜てはいけません.',
      examples: [
        { jp: 'ここでタバコを吸わないでください。', id: 'Tolong jangan merokok di sini.' },
        { jp: '無理をしないでください。', id: 'Tolong jangan memaksakan diri.' },
        { jp: '遅くまで起きていないでください。', id: 'Tolong jangan begadang terlalu malam.' },
      ],
    },
    {
      id: 'ir-a2-1-053', global_grammar_id: 'gn5-00017',
      lesson: 15, seq: 3,
      pattern: 'V (plain) + N ① (klausa relatif — subjek)',
      raw: 'V普通形＋N（関係節①：主語の説明）',
      desc: 'Kata kerja dalam <b>bentuk biasa (plain form)</b> bisa memodifikasi nomina seperti adjektiva — disebut klausa relatif. Di sini V mendeskripsikan N sebagai pelaku/subjek tindakan.',
      examples: [
        { jp: 'あそこにいる人は誰ですか？', id: 'Orang yang ada di sana itu siapa?' },
        { jp: '日本語を話す人が増えています。', id: 'Orang yang berbicara bahasa Jepang semakin bertambah.' },
        { jp: '毎朝ジョギングをする人が多いです。', id: 'Banyak orang yang jogging setiap pagi.' },
      ],
    },
    {
      id: 'ir-a2-1-054', global_grammar_id: 'gn5-00054',
      lesson: 15, seq: 4,
      pattern: 'V-る前に、～ (sebelum melakukan V)',
      raw: 'V辞書形＋前に、S',
      desc: '<b>V-る前に</b> menyatakan bahwa S terjadi <b>sebelum tindakan V dilakukan</b>. V selalu dalam bentuk kamus (non-past), bukan た-form.',
      examples: [
        { jp: '寝る前に、歯を磨いてください。', id: 'Sebelum tidur, gosok gigi.' },
        { jp: '食べる前に、手を洗いましょう。', id: 'Sebelum makan, mari cuci tangan.' },
        { jp: '出かける前に、電気を消してください。', id: 'Sebelum keluar, matikan lampu.' },
      ],
    },
    {
      id: 'ir-a2-1-055', global_grammar_id: 'gn5-00056',
      lesson: 15, seq: 5,
      pattern: '〜とき（に）、～ (ketika / pada saat)',
      raw: 'V普通形／N／A語幹な＋とき（に）、S',
      desc: '<b>〜とき（に）</b> menyatakan waktu atau situasi ketika S terjadi. Bisa digunakan dengan kata kerja bentuk biasa, nomina, atau adjektiva.',
      examples: [
        { jp: '具合が悪いとき、病院に行ってください。', id: 'Saat kondisi badan tidak baik, pergi ke rumah sakit.' },
        { jp: '困ったとき、いつでも連絡してください。', id: 'Saat kesulitan, hubungi saya kapan saja.' },
        { jp: '子どものとき、よく外で遊びました。', id: 'Waktu kecil, saya sering bermain di luar.' },
      ],
    },

    // ── Lesson 16: 健康な生活 ② ──────────────────────────────────────────────
    {
      id: 'ir-a2-1-056', global_grammar_id: 'gn4-00038',
      lesson: 16, seq: 1,
      pattern: 'V-るといいです (sebaiknya V / alangkah baik kalau V)',
      raw: 'V辞書形／Vた形＋らいいです／といいです',
      desc: '<b>V-るといいです</b> memberikan <b>saran atau rekomendasi</b>. "Alangkah baik kalau V" atau "sebaiknya V." Terasa lebih lembut dari べきです.',
      examples: [
        { jp: '野菜をたくさん食べるといいですよ。', id: 'Sebaiknya banyak makan sayuran.' },
        { jp: '早く寝るといいですよ。', id: 'Sebaiknya tidur lebih awal.' },
        { jp: '毎日少し運動するといいと思います。', id: 'Saya rasa sebaiknya olahraga sedikit setiap hari.' },
      ],
    },
    {
      id: 'ir-a2-1-057', global_grammar_id: 'gn4-00068',
      lesson: 16, seq: 2,
      pattern: 'V-すぎます (terlalu banyak V / berlebihan)',
      raw: 'V〜ます形（ます除く）＋すぎます',
      desc: '<b>〜すぎます</b> menyatakan bahwa tindakan atau keadaan <b>melampaui batas yang wajar</b>. "Terlalu V / berlebihan". Bisa digunakan dengan kata kerja maupun adjektiva.',
      examples: [
        { jp: '食べすぎて、お腹が痛いです。', id: 'Karena makan terlalu banyak, perut saya sakit.' },
        { jp: '仕事をしすぎると、体に悪いです。', id: 'Kalau terlalu banyak bekerja, tidak baik untuk tubuh.' },
        { jp: 'この料理は塩が多すぎます。', id: 'Masakan ini terlalu banyak garamnya.' },
      ],
    },
    {
      id: 'ir-a2-1-058', global_grammar_id: 'gn4-00046',
      lesson: 16, seq: 3,
      pattern: 'V1-たり、V2-たり (melakukan hal-hal seperti V1 dan V2)',
      raw: 'V1〜た形＋り、V2〜た形＋りします',
      desc: '<b>〜たり〜たりします</b> menyebutkan beberapa contoh aktivitas tanpa menyebut semuanya, atau menyatakan tindakan yang berulang-ulang. "Melakukan hal-hal seperti V1 dan V2."',
      examples: [
        { jp: '休みの日は料理をしたり、散歩をしたりします。', id: 'Di hari libur, saya memasak atau jalan-jalan dan sebagainya.' },
        { jp: '最近、運動したり、食事に気をつけたりしています。', id: 'Akhir-akhir ini saya berolahraga dan menjaga pola makan.' },
        { jp: '症状が良くなったり悪くなったりしています。', id: 'Gejalanya kadang membaik kadang memburuk.' },
      ],
    },

    // ── Lesson 17: 交際 ① ────────────────────────────────────────────────────
    {
      id: 'ir-a2-1-059', global_grammar_id: 'gn5-00017',
      lesson: 17, seq: 1,
      pattern: 'V (plain) + N ② (klausa relatif — objek)',
      raw: 'V普通形＋N（関係節②：目的語・補足説明）',
      desc: 'Kata kerja dalam bentuk biasa memodifikasi nomina sebagai klausa relatif. Di sini N adalah <b>objek atau sesuatu yang terkait</b> dengan tindakan dalam V.',
      examples: [
        { jp: '私が作った料理を食べてください。', id: 'Silakan makan masakan yang saya buat.' },
        { jp: '先生に教えてもらった方法です。', id: 'Ini metode yang diajarkan oleh guru.' },
        { jp: '友だちからもらったプレゼントです。', id: 'Ini hadiah yang saya terima dari teman.' },
      ],
    },
    {
      id: 'ir-a2-1-060', global_grammar_id: 'gn5-00038',
      lesson: 17, seq: 2,
      pattern: '【人】に【物】をもらいます (menerima dari seseorang)',
      raw: '人（から／に）＋物をもらいます',
      desc: '<b>〜をもらいます</b> menyatakan tindakan <b>menerima sesuatu dari orang lain</b>. Dipandang dari perspektif penerima. Partikel から atau に untuk menandai pemberi.',
      examples: [
        { jp: '友だちにプレゼントをもらいました。', id: 'Saya menerima hadiah dari teman.' },
        { jp: '先生から大切なアドバイスをもらいました。', id: 'Saya mendapat nasihat penting dari guru.' },
        { jp: '誕生日に家族からケーキをもらいました。', id: 'Di ulang tahun, saya menerima kue dari keluarga.' },
      ],
    },
    {
      id: 'ir-a2-1-061', global_grammar_id: 'gn5-00039',
      lesson: 17, seq: 3,
      pattern: '【人】が【物】をくれます (seseorang memberi saya)',
      raw: '人が（私に）物をくれます',
      desc: '<b>〜をくれます</b> menyatakan bahwa <b>orang lain memberi sesuatu kepada saya</b> (atau seseorang yang dekat dengan saya). Perspektif penerima, subjek adalah pemberi.',
      examples: [
        { jp: '友だちが花をくれました。', id: 'Teman memberikan bunga kepada saya.' },
        { jp: '先生が本をくれました。', id: 'Guru memberikan buku kepada saya.' },
        { jp: '子どもが手紙を書いてくれました。', id: 'Anak memberikan surat (yang ia tulis) kepada saya.' },
      ],
      notes: 'Bedakan: もらいます (saya menerima) vs くれます (orang lain memberi kepada saya). Lihat juga: あげます (saya memberi kepada orang lain).',
    },

    // ── Lesson 18: 交際 ② ────────────────────────────────────────────────────
    {
      id: 'ir-a2-1-062', global_grammar_id: 'gn4-00087',
      lesson: 18, seq: 1,
      pattern: 'S (plain) そうです (伝聞 — katanya / konon)',
      raw: 'S（普通形）＋そうです（伝聞）',
      desc: '<b>S そうです (伝聞)</b> menyatakan informasi yang <b>didengar dari orang lain atau sumber berita</b>. "Katanya S / Konon S." Berbeda dari 様態 そうです (perkiraan dari penglihatan).',
      examples: [
        { jp: '天気予報によると、明日は雨が降るそうです。', id: 'Menurut ramalan cuaca, katanya besok akan hujan.' },
        { jp: '田中さんは来月日本に帰るそうです。', id: 'Katanya Tanaka-san bulan depan akan pulang ke Jepang.' },
        { jp: 'あの店のラーメンはおいしいそうですよ。', id: 'Katanya ramen di restoran itu enak.' },
      ],
      notes: '伝聞 そうです melekat pada bentuk biasa (plain form) kalimat. 様態 そうです melekat pada ます-stem atau A語幹.',
    },
    {
      id: 'ir-a2-1-063', global_grammar_id: 'gn5-00037',
      lesson: 18, seq: 2,
      pattern: '【人】に【物】をあげます (memberi kepada seseorang)',
      raw: '私が人に物をあげます',
      desc: '<b>〜をあげます</b> menyatakan tindakan <b>memberi sesuatu kepada orang lain</b>. Perspektif pemberi (saya atau orang ketiga). Partikel に untuk menandai penerima.',
      examples: [
        { jp: '友だちに誕生日プレゼントをあげました。', id: 'Saya memberi hadiah ulang tahun kepada teman.' },
        { jp: '子どもにお土産をあげます。', id: 'Saya akan memberi oleh-oleh kepada anak.' },
        { jp: '先生にお礼の手紙を書いてあげました。', id: 'Saya menuliskan surat ucapan terima kasih untuk guru.' },
      ],
      notes: 'Perlu berhati-hati: あげます TIDAK digunakan saat memberi kepada orang yang lebih tinggi statusnya — gunakan 差し上げます (keigo).',
    },
    {
      id: 'ir-a2-1-064', global_grammar_id: 'gn4-00047',
      lesson: 18, seq: 3,
      pattern: 'S (plain) と言っていました (katanya / dia bilang bahwa)',
      raw: 'S（普通形）＋と言っていました／と言いました',
      desc: '<b>〜と言っていました</b> melaporkan <b>apa yang dikatakan orang lain</b>. "Dia bilang bahwa S." Menggunakan bentuk biasa (plain form) sebelum と.',
      examples: [
        { jp: '田中さんは来週来ないと言っていました。', id: 'Tanaka-san bilang tidak akan datang minggu depan.' },
        { jp: '友だちが日本語は難しいと言っていました。', id: 'Teman saya bilang bahasa Jepang itu sulit.' },
        { jp: '先生は明日テストがあると言いました。', id: 'Guru bilang besok ada ujian.' },
      ],
    },
    {
      id: 'ir-a2-1-065', global_grammar_id: 'gn4-00047',
      lesson: 18, seq: 4,
      pattern: 'S (plain) と思います (saya rasa / saya pikir)',
      raw: 'S（普通形）＋と思います／と思っています',
      desc: '<b>〜と思います</b> menyatakan <b>pendapat atau perkiraan</b> pembicara. "Saya pikir/rasa bahwa S." Menggunakan bentuk biasa (plain form) sebelum と.',
      examples: [
        { jp: '明日は晴れると思います。', id: 'Saya rasa besok akan cerah.' },
        { jp: 'この仕事は難しいと思います。', id: 'Saya pikir pekerjaan ini sulit.' },
        { jp: '彼は来ないと思います。', id: 'Saya rasa dia tidak akan datang.' },
      ],
      notes: 'と思っています menekankan pendapat yang sudah lama dipegang. と思います lebih spontan/saat itu juga.',
    },

  ],
};

console.log('[irodori] grammar-lens-ir-a2-1.js: 65 entries loaded (Elementary 1 A2-1, L1-L18 完成)');
