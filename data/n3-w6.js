// DATA — N3 第6週 (Soumatome N3 Bunpou)
// 22 pola grammar · Week 6 · もっとがんばることにした！

const N3_W6 = [
// ── 第6週 1日目 ── もし〜たなら / もし〜としても / もしも〜なら
  {id:'n3-w6d1-01', level:'n3', week:6, day:1, cat:'kondisional',
   grammar:'もし〜たなら／〜たら', reading:'moshi〜ta nara / 〜tara',
   meaning:'Andaikan saja... / Seandainya... (kontrafaktual)',
   connection:'もし＋Vた(な)ら／Aかった(な)ら／na/Nだった(な)ら（実際はそうではないが、もしそうであったら）',
   desc:'Menyatakan <strong>kondisi yang berlawanan dengan kenyataan</strong> — sesuatu yang tidak terjadi di dunia nyata, tapi "andaikan terjadi". Mengandung rasa menyesal atau berandai-andai.',
   nuance:'Selalu untuk kondisi yang TIDAK terjadi (kontrafaktual). Berbeda dari 〜たら yang lebih umum; di sini もし memperkuat nuansa "andaikan/seandainya".',
   examples:[
     {jp:'もし試験を受けてい<b>たなら</b>、合格していたと思う。', id:'Andaikan aku ikut ujian itu, kurasa aku pasti sudah lulus.'},
     {jp:'もし彼が社長でなかっ<b>たなら</b>、会社はつぶれていたと思う。', id:'Seandainya dia bukan direktur, kurasa perusahaan sudah bangkrut.'}
   ]},

  {id:'n3-w6d1-02', level:'n3', week:6, day:1, cat:'kondisional',
   grammar:'もし〜としても／としたって', reading:'moshi〜to shite mo / to shitatte',
   meaning:'Sekalipun... / Bahkan jika pun... (kemungkinan rendah)',
   connection:'もし＋V/A/na/N普通形＋としても／としたって（実現する可能性が低い場合によく使う）',
   desc:'Menyatakan bahwa <strong>bahkan jika kondisi tertentu terpenuhi, hasilnya tetap sama</strong>. Sering digunakan untuk kondisi yang kemungkinan terjadi sangat kecil.',
   nuance:'Mirip 〜たとえ〜ても, tapi もし〜としても lebih menekankan kondisi yang kecil kemungkinannya. としたって lebih kasual dan ekspresif.',
   examples:[
     {jp:'もし休みが取れた<b>としても</b>、旅行には行かないつもりです。', id:'Sekalipun bisa libur pun, saya tidak berniat pergi wisata.'},
     {jp:'もしお金がたくさんあった<b>としても</b>、そんなものは買わない。', id:'Bahkan jika punya banyak uang pun, tidak akan kubeli hal itu.'}
   ]},

  {id:'n3-w6d1-03', level:'n3', week:6, day:1, cat:'kondisional',
   grammar:'もしも〜なら／〜たら／〜ても', reading:'moshimo〜nara / 〜tara / 〜temo',
   meaning:'Kalau seandainya... / Jika sampai... (penekanan もし)',
   connection:'もしも＋V/A/na/N普通形＋なら／たら／ても／でも（「もし」を強調した形）',
   desc:'Versi lebih kuat dari もし. Menyatakan <strong>kondisi yang sangat tidak terduga atau ekstrem</strong>. Sering muncul dalam konteks "jika terjadi sesuatu yang tidak diinginkan".',
   nuance:'もしも lebih dramatis dari もし. Sering digunakan dalam situasi serius atau mengkhawatirkan, seperti もしものことがあったら (kalau terjadi sesuatu yang tidak diinginkan).',
   examples:[
     {jp:'<b>もしも</b>生まれ変われる<b>なら</b>、男になりたい。', id:'Kalau seandainya bisa terlahir kembali, ingin jadi laki-laki.'},
     {jp:'<b>もしも</b>地震が起きて<b>も</b>、この家、丈夫だから倒れないでしょう。', id:'Sekalipun gempa terjadi pun, rumah ini kokoh jadi tidak akan roboh.'}
   ]},

// ── 第6週 2日目 ── ことになっている / ことにしている / ことは〜が / ことはない
  {id:'n3-w6d2-01', level:'n3', week:6, day:2, cat:'keputusan',
   grammar:'〜ことになっている／〜ことになった', reading:'〜koto ni natte iru / 〜koto ni natta',
   meaning:'Sudah diputuskan (dari luar) / Berlaku ketentuan...',
   connection:'Vる／Vない＋ことになる（外的な決定・規則・慣習）',
   desc:'Menyatakan bahwa sesuatu <strong>telah diputuskan atau ditetapkan oleh kekuatan luar</strong> — bukan oleh keputusan sendiri. Bisa berupa keputusan organisasi, aturan, atau kesepakatan.',
   nuance:'〜ことになった = baru saja diputuskan. 〜ことになっている = sudah berlaku/ditetapkan (kebiasaan/aturan tetap). Berbeda dari 〜ことにした yang merupakan keputusan diri sendiri.',
   examples:[
     {jp:'明日、新しい企画についての会議が行われる<b>ことになっている</b>。', id:'Besok sudah dijadwalkan ada rapat mengenai proyek baru.'},
     {jp:'今度、大阪に転勤する<b>ことになりました</b>。', id:'Sudah diputuskan bahwa saya akan dipindahtugaskan ke Osaka.'}
   ]},

  {id:'n3-w6d2-02', level:'n3', week:6, day:2, cat:'keputusan',
   grammar:'〜ことにしている／〜ことにした', reading:'〜koto ni shite iru / 〜koto ni shita',
   meaning:'Saya memutuskan untuk... / Sudah menjadi kebiasaan (sendiri)',
   connection:'Vる／Vない＋ことにする（自分の意思で決める）',
   desc:'Menyatakan <strong>keputusan yang dibuat sendiri</strong>. 〜ことにした = baru saja memutuskan. 〜ことにしている = sudah menjadi kebijakan/kebiasaan pribadi.',
   nuance:'〜ことにした = keputusan baru. 〜ことにしている = aturan pribadi yang sudah ada. Keduanya menekankan bahwa itu PILIHAN pribadi, bukan paksaan luar.',
   examples:[
     {jp:'毎朝、30分ジョギングする<b>ことにしています</b>。', id:'Sudah menjadi kebiasaanku untuk joging 30 menit setiap pagi.'},
     {jp:'「あれ？買い物に行かないの？」「うん、明日行く<b>ことにした</b>。」', id:'"Eh? Tidak jadi belanja?" "Iya, kuputuskan pergi besok saja."'}
   ]},

  {id:'n3-w6d2-03', level:'n3', week:6, day:2, cat:'kontras',
   grammar:'〜ことは〜が／けど', reading:'〜koto wa〜ga / kedo',
   meaning:'Memang... tapi... (mengakui tapi ada tapi)',
   connection:'Vることは Vる／AいことはAい／naなことは naだ＋が／けど',
   desc:'Menyatakan <strong>pengakuan parsial diikuti kontras</strong> — "Memang aku bisa X, tapi tidak sampai bagus." Mengakui fakta sekaligus memberi batasan/kekurangan.',
   nuance:'Pola ini menegaskan hal yang diakui (diulang dua kali), lalu menyatakan keterbatasan. Nuansanya lebih halus dari langsung menyangkal.',
   examples:[
     {jp:'ピアノは、弾ける<b>ことは弾けます</b>が、うまくありません。', id:'Memang bisa main piano, tapi tidak sampai mahir.'},
     {jp:'このバッグ、高い<b>ことは高い</b>けれど、すごく使いやすいです。', id:'Memang mahal sih tas ini, tapi sangat enak dipakai.'}
   ]},

  {id:'n3-w6d2-04', level:'n3', week:6, day:2, cat:'penyangkalan',
   grammar:'〜ことはない', reading:'〜koto wa nai',
   meaning:'Tidak berarti... / Tidak perlu... / Bukan berarti tidak...',
   connection:'Aくない／naじゃない／Vない／Vられない＋ことはない',
   desc:'Menyatakan bahwa <strong>sesuatu yang tampak negatif sebenarnya bukan sepenuhnya negatif</strong>. "Bukan berarti tidak..." — melunak dari penyangkalan total.',
   nuance:'〜ことはない mengurangi penyangkalan. 食べないことはない = tidak berarti tidak makan (kadang makan juga). Berbeda dari 〜必要はない (tidak perlu).',
   examples:[
     {jp:'鶏肉は、食べない<b>ことはない</b>ですが、あまり好きではありません。', id:'Bukan berarti tidak makan ayam, tapi tidak terlalu suka sih.'},
     {jp:'「走れば間に合わない<b>ことはない</b>よ。急ごう！」', id:'"Kalau lari bukan berarti tidak bisa tepat waktu. Ayo cepat!"'}
   ]},

// ── 第6週 3日目 ── 聞いたところ / ところだった / てはじめて / うちに
  {id:'n3-w6d3-01', level:'n3', week:6, day:3, cat:'penemuan',
   grammar:'〜たところ', reading:'〜ta tokoro',
   meaning:'Setelah melakukan... ternyata... (hasil penemuan)',
   connection:'Vた＋ところ（〜してみたら・〜したら, 発見・結果の発見）',
   desc:'Menyatakan bahwa <strong>setelah melakukan suatu tindakan, ditemukan hasil/informasi baru</strong>. Menekankan bahwa hasilnya adalah temuan yang (mungkin) tidak terduga.',
   nuance:'Mirip 〜てみたら/〜したら, tapi 〜たところ lebih menekankan aspek "menemukan informasi". Sering digunakan dalam laporan formal atau cerita.',
   examples:[
     {jp:'先生に今度のテストの範囲を聞い<b>たところ</b>、10課までだと言われた。', id:'Setelah bertanya ke guru soal cakupan ujian, ternyata sampai pelajaran 10.'},
     {jp:'歯が痛いので歯医者さんに行っ<b>たところ</b>、ひどい虫歯になっていると言われた。', id:'Pergi ke dokter gigi karena sakit gigi, ternyata kata dokter sudah berlubang parah.'}
   ]},

  {id:'n3-w6d3-02', level:'n3', week:6, day:3, cat:'hampir',
   grammar:'〜るところだった', reading:'〜ru tokoro datta',
   meaning:'Hampir saja... / Nyaris...',
   connection:'Vるところだった（＝〜しそうだったが、しなかった / もうちょっとで〜ところだった）',
   desc:'Menyatakan bahwa sesuatu <strong>hampir terjadi tapi akhirnya tidak jadi</strong>. Nuansa lega (syukurlah tidak terjadi) atau menyesal (sayangnya tidak jadi).',
   nuance:'〜るところだった = hampir melakukan, tapi tidak jadi. Bisa positif (hampir berhasil) atau negatif (hampir celaka). Sering dengan もう少しで, あと少しで.',
   examples:[
     {jp:'もう少しで遅刻する<b>ところだった</b>。', id:'Tadi hampir terlambat.'},
     {jp:'あと少しで合格する<b>ところだったのに</b>……。', id:'Hampir lulus tapi... (ternyata tidak).'}
   ]},

  {id:'n3-w6d3-03', level:'n3', week:6, day:3, cat:'peristiwa',
   grammar:'〜てはじめて', reading:'〜te hajimete',
   meaning:'Baru setelah... (baru menyadari/bisa)',
   connection:'Vて＋はじめて（〜して、それからはじめて / 〜するまでは気づかなかった）',
   desc:'Menyatakan bahwa <strong>hanya setelah melakukan X, barulah Y terjadi atau disadari</strong>. Mengandung nuansa "sebelum X, hal ini tidak mungkin atau tidak disadari".',
   nuance:'Menekankan X sebagai titik balik yang krusial. Berbeda dari 〜てから (urutan biasa) — はじめて menekankan bahwa tanpa X, Y tidak akan pernah terjadi.',
   examples:[
     {jp:'先生に注意され<b>てはじめて</b>、漢字の間違いに気が付いた。', id:'Baru setelah diingatkan guru, aku sadar ada kesalahan di kanjinya.'},
     {jp:'歌舞伎を見<b>てはじめて</b>、日本文化に興味を持った。', id:'Baru setelah menonton kabuki, aku mulai tertarik dengan budaya Jepang.'}
   ]},

  {id:'n3-w6d3-04', level:'n3', week:6, day:3, cat:'waktu',
   grammar:'〜うちに', reading:'〜uchi ni',
   meaning:'Selagi... / Sementara masih... / Sebelum...',
   connection:'Vている／Vない／Ai／naな／Nの＋うちに（ある状態が続いている間に〜する）',
   desc:'Menyatakan bahwa suatu tindakan dilakukan <strong>dalam periode tertentu — selagi kondisi itu masih berlaku</strong>. Mengandung urgensi: "lakukan sekarang sebelum terlambat".',
   nuance:'〜うちに menekankan bahwa kondisi itu tidak akan selamanya ada. Berbeda dari 〜間に (あいだに) yang lebih netral. うちに mengandung nuansa "sebelum kondisi berubah".',
   examples:[
     {jp:'明るい<b>うちに</b>帰ってきなさい。', id:'Pulanglah selagi masih terang (sebelum gelap).'},
     {jp:'忘れない<b>うちに</b>、メモをしておこう。', id:'Selagi belum lupa, mari buat catatan.'}
   ]},

// ── 第6週 4日目 ── わけだ / わけではない / わけがない / わけにはいかない
  {id:'n3-w6d4-01', level:'n3', week:6, day:4, cat:'logika',
   grammar:'〜わけだ', reading:'〜wake da',
   meaning:'Pantas saja... / Berarti... / Wajar kalau...',
   connection:'A/na/V普通形＋わけだ（naな）／VてもOK',
   desc:'Menyatakan bahwa suatu fakta <strong>menjelaskan mengapa sesuatu wajar terjadi</strong>. "Makanya begitu / Pantas saja." — kesimpulan logis dari situasi.',
   nuance:'〜わけだ ≈ なるほど, そういうことか. Nuansa "sekarang aku mengerti alasannya". Berbeda dari 〜はずだ (ekspektasi) — わけだ untuk kesimpulan dari fakta yang ada.',
   examples:[
     {jp:'暑い<b>わけだ</b>。気温が36度もある。', id:'Pantas saja panas. Ternyata suhunya sampai 36 derajat.'},
     {jp:'「田中さん、彼女にふられたらしいよ。」「なるほど、それで元気がない<b>わけだ</b>。」', id:'"Katanya Tanaka-san ditolak pacarnya." "Oh begitu, pantas saja dia kelihatan murung."'}
   ]},

  {id:'n3-w6d4-02', level:'n3', week:6, day:4, cat:'logika',
   grammar:'〜わけではない／〜わけじゃない', reading:'〜wake de wa nai / 〜wake ja nai',
   meaning:'Bukan berarti... / Tidak selalu begitu',
   connection:'A/na/V普通形＋わけではない（naな）／わけじゃない（kasual）',
   desc:'Menyatakan <strong>penyangkalan parsial</strong> — mengoreksi asumsi yang terlalu kuat. "Bukan berarti saya X, tapi..." Melunak dari kesimpulan yang terlalu mutlak.',
   nuance:'Sering digunakan untuk menolak asumsi/kesimpulan orang lain. 〜ことはない juga mirip tapi lebih langsung. わけではない lebih halus dalam membantah.',
   examples:[
     {jp:'きらいな<b>わけではない</b>が、肉はあまり食べない。', id:'Bukan berarti tidak suka, tapi memang jarang makan daging.'},
     {jp:'テレビは見ない<b>わけではない</b>が、音楽を聴いているほうが多い。', id:'Bukan berarti tidak nonton TV, tapi lebih banyak mendengar musik.'}
   ]},

  {id:'n3-w6d4-03', level:'n3', week:6, day:4, cat:'logika',
   grammar:'〜わけがない／〜わけはない', reading:'〜wake ga nai / 〜wake wa nai',
   meaning:'Tidak mungkin... / Mustahil... (sangat yakin)',
   connection:'V/A/na/N普通形＋わけがない（naな/Nの）／わけはない',
   desc:'Menyatakan <strong>keyakinan kuat bahwa sesuatu tidak mungkin terjadi</strong>. Lebih kuat dari 〜はずがない. Nuansa: "Tidak ada logika yang bisa membenarkan hal itu terjadi."',
   nuance:'〜はずがない = tidak seharusnya/sewajarnya. 〜わけがない = sama sekali tidak mungkin secara logika. Keduanya menyatakan kemustahilan, tapi わけがない lebih tegas.',
   examples:[
     {jp:'あの強い相手に勝てる<b>わけがない</b>。', id:'Tidak mungkin bisa mengalahkan lawan sekuat itu.'},
     {jp:'「このパン、古くない？」「古い<b>わけない</b>よ。昨日買ったんだから。」', id:'"Roti ini sudah basi ya?" "Tidak mungkin! Baru beli kemarin."'}
   ]},

  {id:'n3-w6d4-04', level:'n3', week:6, day:4, cat:'kewajiban',
   grammar:'〜わけにはいかない／〜わけにもいかない', reading:'〜wake ni wa ikanai / 〜wake ni mo ikanai',
   meaning:'Tidak bisa membiarkan diri... / Tidak sanggup (demi norma)',
   connection:'Vる／Vない／Vている／Vさせる＋わけにはいかない／わけにもいかない',
   desc:'Menyatakan bahwa pembicara <strong>tidak bisa melakukan sesuatu karena alasan sosial, moral, atau tanggung jawab</strong>. "Tidak mungkin bisa melakukan itu (meski ingin sekalipun)".',
   nuance:'Bukan tentang kemampuan fisik tapi tentang norma/tanggungjawab. Berbeda dari 〜てはいけない (aturan dari luar) — わけにはいかない berasal dari kesadaran diri sendiri.',
   examples:[
     {jp:'大事な会議があるから、休む<b>わけにはいかない</b>。', id:'Ada rapat penting, jadi tidak bisa sembarangan tidak masuk.'},
     {jp:'社長の命令だから、従わない<b>わけにはいかない</b>。', id:'Ini perintah direktur, jadi tidak mungkin bisa tidak mengikutinya.'}
   ]},

// ── 第6週 5日目 ── 決して / まったく / めったに / 少しも
  {id:'n3-w6d5-01', level:'n3', week:6, day:5, cat:'penyangkalan',
   grammar:'決して〜ない', reading:'kesshite〜nai',
   meaning:'Tidak pernah... / Tidak akan pernah... (tekad/penegasan)',
   connection:'決して＋Vない／Aくない／naでない／Nでない',
   desc:'Menyatakan <strong>penyangkalan yang tegas dan mutlak</strong>. Mengandung nuansa tekad kuat atau janji. "Saya tidak akan pernah melakukan itu, sekali pun tidak."',
   nuance:'決して lebih kuat dari 絶対に dalam konteks negatif formal. 絶対に bisa positif (絶対に勝つ) tapi 決して HANYA untuk penyangkalan. Sering dalam kalimat tekad/janji.',
   examples:[
     {jp:'私は<b>決して</b>夢をあきらめません。', id:'Saya tidak akan pernah menyerah pada impian saya.'},
     {jp:'「うそは<b>決して</b>申しません。」と彼は言った。', id:'"Saya tidak akan pernah berbohong," begitu katanya.'}
   ]},

  {id:'n3-w6d5-02', level:'n3', week:6, day:5, cat:'penyangkalan',
   grammar:'まったく〜ない', reading:'mattaku〜nai',
   meaning:'Sama sekali tidak... / Sungguh tidak...',
   connection:'まったく＋Vない／Aくない／naでない（全否定 / 強調否定）',
   desc:'Menyatakan <strong>penyangkalan total</strong> — tidak sama sekali, nol besar. Juga bisa digunakan untuk penekanan positif: まったく新しい (benar-benar baru).',
   nuance:'まったく〜ない = 100% tidak. Bisa untuk kemampuan (まったく泳げない) atau pemahaman (まったくわからない). Dalam konteks positif: まったく = 完全に/全然 (totally).',
   examples:[
     {jp:'私は<b>まったく</b>泳げない。', id:'Saya sama sekali tidak bisa berenang.'},
     {jp:'彼が怒っている理由は、私には<b>まったく</b>わからない。', id:'Alasan dia marah, saya sama sekali tidak mengerti.'}
   ]},

  {id:'n3-w6d5-03', level:'n3', week:6, day:5, cat:'frekuensi',
   grammar:'めったに〜ない', reading:'metta ni〜nai',
   meaning:'Jarang sekali... / Hampir tidak pernah...',
   connection:'Nはめったにない／めったに Vない（頻度が少ないことを表す）',
   desc:'Menyatakan bahwa sesuatu <strong>sangat jarang terjadi</strong> — hampir tidak pernah. Nuansa bahwa kejadian itu adalah pengecualian, bukan hal biasa.',
   nuance:'めったに lebih kuat dari あまり〜ない. めったにない = sangat langka. Sering muncul dengan N＋はめったにない (kesempatan seperti ini sangat jarang).',
   examples:[
     {jp:'飲み会には<b>めったに</b>行かない。', id:'Jarang sekali pergi ke acara minum-minum.'},
     {jp:'こんなチャンスは<b>めったにない</b>よ。', id:'Kesempatan seperti ini sangat jarang ada.'}
   ]},

  {id:'n3-w6d5-04', level:'n3', week:6, day:5, cat:'penyangkalan',
   grammar:'少しも〜ない／ちっとも〜ない', reading:'sukoshi mo〜nai / chitto mo〜nai',
   meaning:'Sama sekali tidak... / Sedikitpun tidak...',
   connection:'少しも／ちっとも＋Vない／Aくない／naでない（否定を強調する）',
   desc:'Menyatakan <strong>penyangkalan total bahkan sampai sedikit pun</strong>. Menekankan bahwa tidak ada sedikit pun dari hal yang dimaksud.',
   nuance:'少しも lebih netral. ちっとも lebih kasual dan ekspresif — sering mengandung rasa kesal atau frustrasi. Keduanya setara dengan まったく〜ない tapi lebih emosional.',
   examples:[
     {jp:'あの人が話す英語は<b>少しも</b>わからない。', id:'Bahasa Inggris yang dia bicara, sedikitpun tidak mengerti.'},
     {jp:'スタイルのことは、<b>少しも</b>気にならない。', id:'Soal penampilan, sama sekali tidak peduli.'}
   ]},

// ── 第6週 6日目 ── それと / それとも / その上
  {id:'n3-w6d6-01', level:'n3', week:6, day:6, cat:'konjungsi',
   grammar:'〜。それと／あと〜', reading:'〜。sore to / ato〜',
   meaning:'... Dan juga... / ... Tambah lagi...',
   connection:'a。それと b。／a。あと b。（a に b を付け加えるときに使う）',
   desc:'Digunakan untuk <strong>menambahkan informasi atau item ke pernyataan sebelumnya</strong>. Sering muncul saat mendaftar atau menambahkan hal yang terlupa.',
   nuance:'それと dan あと keduanya berarti "dan juga" tapi あと sering digunakan untuk item terakhir atau satu tambahan lagi. あと〈数量〉 = masih ada sebanyak...',
   examples:[
     {jp:'レタスひとつとトマトを3個ください。<b>それと</b>、ピーマンも1袋ください。', id:'Tolong satu selada dan tiga tomat. Dan juga tolong satu bungkus paprika.'},
     {jp:'言われたことはしました。<b>あと</b>、何をすればいいですか。', id:'Yang diperintahkan sudah saya kerjakan. Lalu, apalagi yang harus dilakukan?'}
   ]},

  {id:'n3-w6d6-02', level:'n3', week:6, day:6, cat:'konjungsi',
   grammar:'〜？それとも〜？', reading:'〜？soretomo〜？',
   meaning:'... Atau...? (pertanyaan pilihan)',
   connection:'a？それとも b？（＝あるいは／または — 疑問文をつなぐ）',
   desc:'Digunakan untuk <strong>menghubungkan dua kalimat tanya sebagai pilihan</strong>. "Apakah A, atau B?" — meminta memilih di antara dua kemungkinan.',
   nuance:'それとも HANYA untuk kalimat tanya (pertanyaan pilihan). Berbeda dari または/あるいは yang bisa di kalimat biasa. Jangan gunakan それとも di kalimat pernyataan.',
   examples:[
     {jp:'コーヒーにしますか。<b>それとも</b>紅茶にしますか。', id:'Mau kopi? Atau mau teh?'},
     {jp:'来週にしましょうか。<b>それとも</b>さ来週がいいですか。', id:'Gimana kalau minggu depan? Atau minggu depannya lagi lebih baik?'}
   ]},

  {id:'n3-w6d6-03', level:'n3', week:6, day:6, cat:'konjungsi',
   grammar:'〜。その上〜', reading:'〜。sono ue〜',
   meaning:'... Terlebih lagi... / ... Ditambah lagi... (menambah)',
   connection:'a。その上 b。（＝それに — a に付け加えて言うときに使う）',
   desc:'Digunakan untuk <strong>menambahkan informasi yang memperkuat pernyataan sebelumnya</strong>. Sering untuk menyebutkan kelebihan (atau kekurangan) tambahan yang semakin memperjelas penilaian.',
   nuance:'その上 lebih kuat dari それと dalam hal penekanan — menyiratkan "dan ini pun ada lagi!". Setara dengan さらに/加えて dalam konteks formal. Bisa positif maupun negatif.',
   examples:[
     {jp:'この店の料理はおいしい。<b>その上</b>値段も安い。', id:'Masakan di restoran ini enak. Terlebih lagi harganya pun murah.'},
     {jp:'彼は、頭がいい。<b>その上</b>スポーツも何でもできる。', id:'Dia pintar. Terlebih lagi, olahraga apa pun bisa dia kuasai.'}
   ]},
];
