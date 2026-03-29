// DATA — N3 第4週 (Soumatome N3 Bunpou)
// 24 pola grammar · Week 4 · がんばるしかない！

const N3_W4 = [
// ── 第4週 1日目 ── にとって / わりに / くせに / なんか
  {id:'n3-w4d1-01', level:'n3', week:4, day:1, cat:'perspektif',
   grammar:'〜にとって', reading:'〜ni totte',
   meaning:'Bagi... / Dari sudut pandang...',
   connection:'Nに＋とって／とっては／とっても',
   desc:'Menyatakan <strong>penilaian atau kondisi dari perspektif tertentu</strong>. "Bagi X, ...".',
   nuance:'〜にとって = sudut pandang/penilaian. Berbeda dari 〜として (peran/kapasitas).',
   examples:[
     {jp:'あなた<b>にとって</b>、いちばん大切なものは何ですか。', id:'Bagi kamu, apa hal yang paling penting?'},
     {jp:'このあたりの人々<b>にとっては</b>、車は必需品です。', id:'Bagi orang-orang di sekitar sini, mobil adalah kebutuhan pokok.'}
   ]},

  {id:'n3-w4d1-02', level:'n3', week:4, day:1, cat:'perbandingan',
   grammar:'〜わりに（は）', reading:'〜wari ni (wa)',
   meaning:'Dibanding... / Padahal... (tidak sesuai ekspektasi)',
   connection:'V/A/na/N普通形＋わりに（は）（N幹の／na幹な）',
   desc:'Menyatakan bahwa hasilnya <strong>tidak sesuai dengan yang diharapkan berdasarkan kondisi yang ada</strong>. Nuansa kejutan — lebih baik atau lebih buruk dari seharusnya.',
   nuance:'Mirip 〜にしては tetapi 〜わりに menekankan proporsi/ketidaksesuaian. Keduanya bisa saling menggantikan dalam banyak konteks.',
   examples:[
     {jp:'年の<b>わりには</b>若く見える。', id:'Kelihatan muda untuk usianya.'},
     {jp:'お金がない（と言っている）<b>わりに</b>、よく買い物をするね。', id:'Padahal katanya tidak punya uang, tapi sering belanja ya.'}
   ]},

  {id:'n3-w4d1-03', level:'n3', week:4, day:1, cat:'kontras',
   grammar:'〜くせに', reading:'〜kuse ni',
   meaning:'Padahal... / Meskipun (seharusnya tahu lebih baik)',
   connection:'V/A/na/N普通形＋くせに（N幹の／na幹な）',
   desc:'Menyatakan <strong>kontradiksi atau inkonsistensi</strong> yang membuat pembicara merasa kesal atau mengkritik. "Padahal seharusnya tahu/bisa, tapi...".',
   nuance:'Selalu negatif — mengandung rasa kesal, kecewa, atau kritik. Lebih kasar dari 〜のに.',
   examples:[
     {jp:'知っている<b>くせに</b>、教えてくれない。', id:'Padahal tahu, tapi tidak mau memberitahu.'},
     {jp:'元気な<b>くせに</b>、病気のふりをしている。', id:'Padahal sehat, tapi pura-pura sakit.'}
   ]},

  {id:'n3-w4d1-04', level:'n3', week:4, day:1, cat:'ekspresi',
   grammar:'〜なんか／〜なんて／〜など', reading:'〜nanka / 〜nante / 〜nado',
   meaning:'Hal seperti... / ... saja / (meremehkan/terkejut)',
   connection:'N／na/Nで＋なんか／なんて／など／V/A/na/N普通形＋なんて',
   desc:'Digunakan untuk <strong>meremehkan, mengekspresikan kejutan, atau menunjukkan sikap negatif</strong> terhadap sesuatu. Sering diikuti kata negatif atau ekspresi negatif.',
   nuance:'なんか dan なんて kasual. など lebih formal. Ketiganya menekankan hal yang disebutkan secara negatif/merendah.',
   examples:[
     {jp:'お化粧<b>なんか</b>してはいけません。', id:'Tidak boleh memakai makeup seperti itu.'},
     {jp:'納豆<b>なんて</b>嫌いだ。', id:'Saya benci hal seperti natto.'},
     {jp:'日本語でスピーチ<b>など</b>できません。', id:'Saya tidak bisa berpidato dalam bahasa Jepang atau semacamnya.'}
   ]},

// ── 第4週 2日目 ── おかげ / せい / かわりに / にかわって
  {id:'n3-w4d2-01', level:'n3', week:4, day:2, cat:'sebab',
   grammar:'〜おかげで', reading:'〜okage de',
   meaning:'Berkat... / Karena (sesuatu yang baik)',
   connection:'V/i/na/N普通形＋おかげで／おかげだ（na幹な／N幹の）',
   desc:'Menyatakan bahwa hasil <strong>positif</strong> yang diperoleh adalah berkat sesuatu atau seseorang. Rasa syukur atau apresiasi.',
   nuance:'Selalu untuk hasil positif. Kebalikan dari 〜せいで (hasil negatif).',
   examples:[
     {jp:'先生の<b>おかげで</b>合格できました。', id:'Berkat sensei, saya bisa lulus.'},
     {jp:'日本へ来た<b>おかげで</b>、日本語が上手になった。', id:'Berkat datang ke Jepang, bahasa Jepangku jadi bagus.'}
   ]},

  {id:'n3-w4d2-02', level:'n3', week:4, day:2, cat:'sebab',
   grammar:'〜せいで／〜せいか', reading:'〜sei de / 〜sei ka',
   meaning:'Gara-gara... / Akibat... (menyalahkan)',
   connection:'V/i/na/N普通形＋せいで／せいか／せいだ（na幹な／N幹の）',
   desc:'Menyatakan bahwa hasil <strong>negatif</strong> disebabkan oleh sesuatu. 〜せいか menyatakan penyebab yang tidak pasti ("mungkin gara-gara...").',
   nuance:'Selalu untuk hasil negatif. 〜せいで = penyebab pasti. 〜せいか = tidak yakin tapi mungkin.',
   examples:[
     {jp:'バスが遅れた<b>せいで</b>、約束の時間に間に合わなかった。', id:'Gara-gara busnya terlambat, tidak sempat tepat waktu.'},
     {jp:'疲れた<b>せいか</b>、頭が痛い。', id:'Mungkin gara-gara lelah, kepala saya sakit.'}
   ]},

  {id:'n3-w4d2-03', level:'n3', week:4, day:2, cat:'penggantian',
   grammar:'〜かわりに', reading:'〜kawari ni',
   meaning:'Sebagai gantinya... / Alih-alih...',
   connection:'V/A/na/N普通形＋かわりに（na幹な／N幹の）',
   desc:'Menyatakan <strong>penggantian</strong>: satu hal menggantikan yang lain, atau ada kompensasi/imbalan atas sesuatu.',
   nuance:'Bisa berarti substitusi langsung (A instead of B) atau pertukaran (melakukan A sebagai kompensasi atas B).',
   examples:[
     {jp:'車で来たので、ビールの<b>かわりに</b>ジュースをください。', id:'Karena naik mobil, tolong minta jus sebagai gantinya bir.'},
     {jp:'日曜日に働いた<b>かわりに</b>、今日休みを取りました。', id:'Sebagai kompensasi kerja hari Minggu, hari ini ambil libur.'}
   ]},

  {id:'n3-w4d2-04', level:'n3', week:4, day:2, cat:'penggantian',
   grammar:'〜にかわって', reading:'〜ni kawatte',
   meaning:'Menggantikan... / Mewakili...',
   connection:'Nに＋かわって／かわり',
   desc:'Menyatakan bertindak <strong>sebagai pengganti atau perwakilan</strong> seseorang/sesuatu. Lebih formal dari 〜かわりに.',
   nuance:'〜にかわって lebih menekankan peran representasi/penggantian posisi. NG: ビールにかわってジュースをください (gunakan 〜かわりに).',
   examples:[
     {jp:'出張中の部長<b>にかわって</b>、私がごあいさつさせていただきます。', id:'Mewakili manajer yang sedang dinas, saya akan menyampaikan sambutan.'},
     {jp:'野球<b>にかわり</b>、サッカーがさかんになってきた。', id:'Menggantikan bisbol, sepak bola kini makin populer.'}
   ]},

// ── 第4週 3日目 ── くらい / ほど (perbandingan & derajat)
  {id:'n3-w4d3-01', level:'n3', week:4, day:3, cat:'derajat',
   grammar:'〜くらい／〜ぐらい／〜ほど（程度）', reading:'〜kurai / 〜gurai / 〜hodo (teido)',
   meaning:'Sekitar / Seukuran / Sampai (derajat tertentu)',
   connection:'N／naな／Aい／Vる＋くらい／ぐらい／ほど',
   desc:'Menyatakan <strong>perkiraan ukuran, jumlah, atau derajat</strong>. くらい/ぐらい dan ほど bisa saling menggantikan dalam konteks derajat.',
   nuance:'くらい/ぐらい lebih kasual dan perkiraan. ほど sedikit lebih formal/tertulis. Keduanya bisa dipakai untuk derajat.',
   examples:[
     {jp:'それは米粒<b>くらいの</b>大きさです。', id:'Itu besarnya sekitar sebutir beras.'},
     {jp:'この洗剤は、おもしろいほど汚れが落ちる。', id:'Deterjen ini membersihkan kotoran sampai mengagumkan.'},
     {jp:'あきる<b>ほど</b>食べた。', id:'Makan sampai bosan.'}
   ]},

  {id:'n3-w4d3-02', level:'n3', week:4, day:3, cat:'perbandingan',
   grammar:'〜ほど〜（比較）', reading:'〜hodo〜 (hikaku)',
   meaning:'Semakin... semakin... / Makin... makin...',
   connection:'Aい／naな／Nほど（比較対象）',
   desc:'Dalam konteks perbandingan, 〜ほど menyatakan bahwa <strong>X lebih... dari Y</strong>, atau dipakai sebagai tolok ukur perbandingan.',
   nuance:'若い人ほど〜する = makin muda makin cenderung melakukan... (proporsi).',
   examples:[
     {jp:'若い人<b>ほど</b>朝寝坊をする。', id:'Makin muda seseorang, makin sering kesiangan.'},
     {jp:'伝統的なものは、古い<b>ほど</b>価値がある。', id:'Barang tradisional, makin tua makin bernilai.'}
   ]},

  {id:'n3-w4d3-03', level:'n3', week:4, day:3, cat:'perbandingan',
   grammar:'〜ば〜ほど', reading:'〜ba〜hodo',
   meaning:'Semakin... semakin... (hubungan proporsional)',
   connection:'Vば Vるほど／AければAいほど／naならnaなほど',
   desc:'Menyatakan <strong>hubungan proporsional</strong>: semakin kondisi pertama meningkat, semakin kondisi kedua juga meningkat.',
   nuance:'Pola: 知れば知るほど、安ければ安いほど、食べれば食べるほど. Selalu ada pengulangan kata yang sama.',
   examples:[
     {jp:'彼のことを知れば知る<b>ほど</b>好きになる。', id:'Semakin mengenalnya, semakin suka.'},
     {jp:'荷物は少なければ少ない<b>ほど</b>いい。', id:'Barang bawaan, semakin sedikit semakin baik.'}
   ]},

  {id:'n3-w4d3-04', level:'n3', week:4, day:3, cat:'perbandingan',
   grammar:'〜ほど〜ない', reading:'〜hodo〜nai',
   meaning:'Tidak sepadan dengan... / Tidak setara...',
   connection:'N[人]くらいN[人]はいない／N[物事]ほどN[物事]はない',
   desc:'Menyatakan bahwa <strong>tidak ada yang menyamai atau melampaui</strong> standar yang disebutkan. "Tidak ada yang se... seperti...".',
   nuance:'〜くらい〜はいない (untuk orang), 〜ほど〜はない (untuk hal/benda). Keduanya sering bisa saling menggantikan.',
   examples:[
     {jp:'彼女<b>くらい</b>親切な人は<b>いない</b>。', id:'Tidak ada orang sebaik hati dia.'},
     {jp:'今年<b>ほど</b>雪の降った年は<b>なかった</b>。', id:'Tidak pernah ada tahun yang salju turun sebanyak tahun ini.'}
   ]},

// ── 第4週 4日目 ── ことはない / ということだ / ことだ / ことか
  {id:'n3-w4d4-01', level:'n3', week:4, day:4, cat:'keharusan',
   grammar:'〜ことはない', reading:'〜koto wa nai',
   meaning:'Tidak perlu... / Tidak ada alasan untuk...',
   connection:'Vること＋はない',
   desc:'Menyatakan bahwa <strong>tidak ada alasan atau kebutuhan untuk melakukan sesuatu</strong>. "Tidak perlu repot-repot...".',
   nuance:'Lebih lembut dari 〜しなくていい. Sering dipakai untuk menenangkan atau memberi izin.',
   examples:[
     {jp:'君があやまる<b>ことはない</b>よ。', id:'Kamu tidak perlu meminta maaf.'},
     {jp:'来ることはありません。郵送でいいですよ。', id:'Tidak perlu datang. Dikirim lewat pos saja tidak apa-apa.'}
   ]},

  {id:'n3-w4d4-02', level:'n3', week:4, day:4, cat:'penjelasan',
   grammar:'〜ということだ', reading:'〜to iu koto da',
   meaning:'Artinya... / Berarti... / Kata sumber lain...',
   connection:'V/A/na/N普通形＋ということだ',
   desc:'Dua fungsi utama: (1) <strong>menyimpulkan atau menjelaskan makna</strong> dari suatu pernyataan; (2) <strong>menyampaikan informasi yang didengar</strong> dari sumber lain (mirip 〜そうだ).',
   nuance:'Fungsi 1 (kesimpulan): 合格70%、つまり合格ということだ. Fungsi 2 (hearsay): 少し遅れるということです (Dikatakan bahwa dia agak terlambat).',
   examples:[
     {jp:'田中さんから電話があって、少し遅れる<b>ということです</b>。', id:'Ada telepon dari Tanaka-san, katanya akan sedikit terlambat.'},
     {jp:'試験の結果は70%、つまり合格<b>ということだ</b>。', id:'Hasil ujian 70%, artinya lulus.'}
   ]},

  {id:'n3-w4d4-03', level:'n3', week:4, day:4, cat:'saran',
   grammar:'〜ことだ', reading:'〜koto da',
   meaning:'Sebaiknya... / Yang penting adalah...',
   connection:'Vる／Vないこと＋だ',
   desc:'Digunakan untuk <strong>memberikan saran atau rekomendasi</strong>. "Yang sebaiknya dilakukan adalah...".',
   nuance:'Lebih langsung dari 〜たほうがいい. Digunakan saat memberikan nasihat praktis.',
   examples:[
     {jp:'暖かくして、ゆっくり休む<b>ことだ</b>。', id:'Yang penting tetap hangat dan istirahat cukup.'},
     {jp:'無理をしない<b>ことです</b>。', id:'Sebaiknya jangan memaksakan diri.'}
   ]},

  {id:'n3-w4d4-04', level:'n3', week:4, day:4, cat:'ekspresi',
   grammar:'〜ことか', reading:'〜koto ka',
   meaning:'Betapa... / Sungguh... (ekspresi emosi kuat)',
   connection:'どんなに／どれだけ／どれほど／何度／何時間＋V/Aことか',
   desc:'Digunakan untuk <strong>mengekspresikan perasaan yang sangat kuat</strong> — betapa bahagia, betapa susah, berapa kali sudah peringatkan, dsb.',
   nuance:'Sering diawali どんなに、どれだけ、何度、dsb. Bisa positif maupun negatif.',
   examples:[
     {jp:'合格できたら、どんなにうれしい<b>ことか</b>。', id:'Kalau bisa lulus, betapa bahagianya.'},
     {jp:'何度注意した<b>ことか</b>。', id:'Sudah berapa kali aku memperingatkan.'}
   ]},

// ── 第4週 5日目 ── だっけ / しかない / んだって / だもん
  {id:'n3-w4d5-01', level:'n3', week:4, day:5, cat:'konfirmasi',
   grammar:'〜だっけ', reading:'〜dakke',
   meaning:'... kan? / ... ya? (mengkonfirmasi sesuatu yang lupa)',
   connection:'Nだ／naだ／Aかった／Vた＋っけ',
   desc:'Digunakan untuk <strong>mengkonfirmasi atau mengingat kembali</strong> sesuatu yang sudah diketahui sebelumnya namun lupa atau tidak yakin.',
   nuance:'Kasual. OK: でしたっけ/ましたっけ (sedikit lebih sopan). Mencerminkan pembicara sedang berusaha mengingat.',
   examples:[
     {jp:'国へ帰るのは、来週だ（った）<b>っけ</b>？', id:'Pulang ke negara asal minggu depan kan?'},
     {jp:'明日のパーティーのこと、話（し）まし<b>たっけ</b>？', id:'Soal pesta besok, aku sudah ceritakan ya?'}
   ]},

  {id:'n3-w4d5-02', level:'n3', week:4, day:5, cat:'keharusan',
   grammar:'〜しかない', reading:'〜shika nai',
   meaning:'Tidak ada pilihan lain selain... / Terpaksa harus...',
   connection:'Vる＋しかない',
   desc:'Menyatakan bahwa <strong>tidak ada pilihan lain selain melakukan</strong> tindakan yang disebutkan. Nuansa terpaksa atau tidak ada jalan lain.',
   nuance:'〜しかない = tidak ada alternatif lain. Berbeda dari 〜だけ (hanya/sekedar).',
   examples:[
     {jp:'できるまで、やる<b>しかない</b>。', id:'Tidak ada pilihan lain selain terus mencoba sampai bisa.'},
     {jp:'直せないから、新しいのを買う<b>しかなかった</b>。', id:'Karena tidak bisa diperbaiki, terpaksa beli yang baru.'}
   ]},

  {id:'n3-w4d5-03', level:'n3', week:4, day:5, cat:'kabar',
   grammar:'〜んだって', reading:'〜ndatte',
   meaning:'Katanya... / Dengar-dengar... (kabar dari orang lain)',
   connection:'V/A普通形（んだ）って／na/N普通形（なんだ）って',
   desc:'Bentuk kasual untuk <strong>menyampaikan informasi yang didengar dari orang lain</strong>. Versi percakapan dari 〜そうだ (hearsay).',
   nuance:'Sangat kasual. 女性は「ですって」 lebih sering digunakan. Juga bisa: 〜までだって、〜からだって、〜だけだって.',
   examples:[
     {jp:'「田中さん、結婚してる<b>んだって</b>。」「へー、知らなかった。」', id:'"Katanya Tanaka-san sudah menikah." "Hoo, tidak tahu."'},
     {jp:'「試験の範囲は、教科書の最初から50ページまで<b>だって</b>。」', id:'"Katanya ruang lingkup ujian dari awal buku sampai halaman 50."'}
   ]},

  {id:'n3-w4d5-04', level:'n3', week:4, day:5, cat:'sebab',
   grammar:'〜だもん／〜だもの', reading:'〜damon / 〜damono',
   meaning:'Soalnya... / Habis... (alasan/pembenaran)',
   connection:'V/A普通形（んだ）もん／na/N普通形（なんだ）もん',
   desc:'Digunakan untuk <strong>memberikan alasan atau pembenaran</strong> atas sesuatu. Nuansa agak childish atau defensif.',
   nuance:'Sangat kasual, sedikit nuansa kekanak-kanakan/defensif. だって〜（んだ）もん adalah ekspresi turunan yang umum.',
   examples:[
     {jp:'「どうして食べないの？」「だって、まずい<b>んだもん</b>。」', id:'"Kenapa tidak makan?" "Habis, tidak enak soalnya."'},
     {jp:'今日の試験、できなかった……。勉強しなかった<b>んだもん</b>、仕方がない。', id:'Ujian hari ini tidak bisa... Ya mau bagaimana, soalnya tidak belajar.'}
   ]},

// ── 第4週 6日目 ── つまり / そのため / その結果 / なぜなら
  {id:'n3-w4d6-01', level:'n3', week:4, day:6, cat:'penjelasan',
   grammar:'〜つまり', reading:'〜tsumari',
   meaning:'Artinya / Dengan kata lain / Intinya',
   connection:'〔文〕つまり〔文〕',
   desc:'Digunakan untuk <strong>merumuskan ulang atau menyimpulkan</strong> dengan cara yang lebih jelas. "Dengan kata lain, intinya adalah...".',
   nuance:'Hanya digunakan untuk menyimpulkan/menjelaskan ulang, bukan menambahkan informasi baru.',
   examples:[
     {jp:'父の兄、<b>つまり</b>私の伯父は、医者をしている。', id:'Kakak ayahku, dengan kata lain pamanku, berprofesi sebagai dokter.'},
     {jp:'田中さんは、携帯もパソコンも持っていない。<b>つまり</b>、メールで連絡はできないのだ。', id:'Tanaka-san tidak punya HP maupun PC. Artinya, tidak bisa dihubungi lewat email.'}
   ]},

  {id:'n3-w4d6-02', level:'n3', week:4, day:6, cat:'sebab-akibat',
   grammar:'〜そのため（に）', reading:'〜sono tame (ni)',
   meaning:'Oleh karena itu / Untuk tujuan itu (sebab → akibat / tujuan)',
   connection:'〔原因/理由〕そのため（に）〔結果/目的〕',
   desc:'Dua fungsi: (1) <strong>sebab-akibat</strong> — menunjukkan bahwa kejadian sebelumnya menyebabkan hasil berikut; (2) <strong>tujuan</strong> — untuk mencapai hal yang disebutkan sebelumnya.',
   nuance:'Fungsi a (sebab): 事故があった。そのため電車が遅れている. Fungsi b (tujuan): 留学するつもりだ。そのためにバイトしている.',
   examples:[
     {jp:'隣の駅で事故があったらしい。<b>そのために</b>電車が遅れている。', id:'Sepertinya ada kecelakaan di stasiun sebelah. Oleh karena itu kereta terlambat.'},
     {jp:'留学するつもりだ。<b>そのために</b>、バイトしてお金をためている。', id:'Berencana belajar di luar negeri. Untuk itu, sambil kerja paruh waktu mengumpulkan uang.'}
   ]},

  {id:'n3-w4d6-03', level:'n3', week:4, day:6, cat:'sebab-akibat',
   grammar:'〜その結果', reading:'〜sono kekka',
   meaning:'Akibatnya / Hasilnya (dari kejadian sebelumnya)',
   connection:'〔過去の行動〕その結果〔結果〕',
   desc:'Menyatakan <strong>hasil yang terjadi akibat tindakan atau kejadian sebelumnya</strong>. Berbeda dari そのため — その結果 menekankan hasil/akibat yang sudah terjadi.',
   nuance:'Biasanya dipakai untuk hasil yang nyata sudah terjadi. そのため lebih ke arah penyebab, その結果 lebih ke hasil akhir.',
   examples:[
     {jp:'父は、人の何倍も努力した。<b>その結果</b>、仕事で成功した。', id:'Ayahku bekerja keras beberapa kali lipat dari orang lain. Akibatnya, berhasil dalam kariernya.'},
     {jp:'3ヵ月ダイエットを続けた。<b>その結果</b>、5キロやせた。', id:'Melanjutkan diet selama 3 bulan. Hasilnya, turun 5 kilo.'}
   ]},

  {id:'n3-w4d6-04', level:'n3', week:4, day:6, cat:'sebab-akibat',
   grammar:'〜なぜなら〜からだ', reading:'〜naze nara〜kara da',
   meaning:'Karena... / Alasannya adalah...',
   connection:'〔結論〕なぜなら（ば）〔原因/理由〕からだ',
   desc:'Digunakan untuk <strong>menjelaskan alasan setelah menyatakan kesimpulan</strong>. Urutannya terbalik dari 〜から: kesimpulan dulu, baru alasan.',
   nuance:'Urutan: Kesimpulan → なぜなら → Alasan → からだ. Lebih formal dari 〜だって. Juga: なぜかというと / どうしてかというと.',
   examples:[
     {jp:'来週、国に帰る予定です。<b>なぜなら（ば）</b>、親友の結婚式に出席するから<b>です</b>。', id:'Minggu depan berencana pulang. Karena akan menghadiri pernikahan sahabat.'},
     {jp:'学校を変えた。<b>なぜかというと</b>、ぼくのレベルのクラスがなかったからだ。', id:'Pindah sekolah. Alasannya karena tidak ada kelas yang sesuai levelku.'}
   ]},
];
