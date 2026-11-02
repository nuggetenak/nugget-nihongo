/**
 * JLPT N2 Golden Set 01 (Foundational Units 1-5)
 * 15 Authentic Items with 5-Layer Explanations & Strict Permutation Proof
 */

function getJLPTN2Set() {
  return {
    setId: 'jlpt-n2-set01',
    trackType: 'jlpt',
    level: 'n2',
    title: 'Set Latihan JLPT N2 - 01',
    description: 'Simulasi modular 15 menit menguji penguasaan Unit 1 s/d 5 Kurikulum N2 (Suksesi Instan, Batas Kapasitas, Milestone Proyek, Adaptasi Lapangan & Resonansi Batin).',
    targetUnits: 'Unit 1 s/d 5: Titik Balik, Pencapaian Bertahap, Ketuntasan Kapasitas, Kemahiran Teknis & Gejolak Emosi',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'JLPT-N2-S01-Q01',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 1,
        mondaiType: 'kanji_reading',
        instructionJp: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah cara baca kanji yang bergaris bawah dari pilihan 1, 2, 3, 4.',
        prompt: '過去の 失敗を **教訓** として、新たな 開発に 取り組む。',
        targetWord: '教訓',
        options: ['きょうくん', 'きょうかん', 'きょうけん', 'きょうろん'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kanji 「教訓」 dibaca 「きょうくん」 yang bermakna hikmah / pelajaran berharga dari pengalaman masa lalu.',
          distractorAutopsy: {
            '1': 'きょうくん adalah KUNCI BENAR (教訓 = pelajaran berharga).',
            '2': 'きょうかん adalah bacaan untuk 「共感」 (empati) atau 「強悍」.',
            '3': 'きょうけん adalah bacaan untuk 「強権」 (otoriter).',
            '4': 'きょうろん adalah bacaan keliru.'
          },
          mnemonicSensei: 'Kyou (教 = ajaran) + Kun (訓 = petuah/nasihat). N2 sering memunculkan kata hikmah kegagalan ini!',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita sering menyebutnya \"pelajaran hidup\". Di bahasa Jepang bisnis, kosa kata yang elegan dan formal adalah 教訓 (kyoukun).',
          remedialPrescription: {
            unitId: 'unit-n2-04',
            unitNumber: 4,
            unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
            lessonId: 'les-n2-u04-01',
            vocabId: 'vg-n2-00045',
            advice: 'Pelajari kanji pembentuk istilah refleksi dan evaluasi di Unit 4 N2.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-04',
          unitNumber: 4,
          unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
          lessonId: 'les-n2-u04-01',
          vocabId: 'vg-n2-00045'
        }
      },
      {
        id: 'JLPT-N2-S01-Q02',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 2,
        mondaiType: 'word_formation',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah prefiks/sufiks pembentuk kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: '契約書に （　　）記入の 項目が ないか、提出前に 確認してください。',
        options: ['未', '無', '不', '非'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prefiks kanji penyangkal 「未 (mi-)」 bermakna \"belum terjadi / belum dilaksanakan (tetapi semestinya/akan diselesaikan)\". Kolokasi yang tepat untuk kolom yang belum diisi adalah 「未記入 (mi-kinyuu)」.',
          distractorAutopsy: {
            '1': '未 adalah KUNCI BENAR (未記入 = belum diisi / pending).',
            '2': '無 (mu-) bermakna ketiadaan eksistensi (contoh: 無責任 = tidak bertanggung jawab).',
            '3': '不 (fu-) bermakna ketidaksesuaian/negatif (contoh: 不安 = gelisah).',
            '4': '非 (hi-) bermakna berlawanan/non (contoh: 非公式 = non-formal).'
          },
          mnemonicSensei: 'Belum kelar tapi harus dikerjakan? Gunakan MI (未)! Mikansei = belum selesai, Mikinyuu = belum diisi.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita memakai kata \"tidak\" atau \"belum\". Di Jepang, perbedaan prefiks 無, 不, 非, dan 未 adalah materi wajib nomor satu di seksi Moji-Goi N2!',
          remedialPrescription: {
            unitId: 'unit-n2-02',
            unitNumber: 2,
            unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
            lessonId: 'les-n2-u02-01',
            vocabId: 'vg-n2-00021',
            advice: 'Kuasai 4 prefiks penyangkal N2 (Mu, Fu, Hi, Mi) di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-02',
          unitNumber: 2,
          unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
          lessonId: 'les-n2-u02-01',
          vocabId: 'vg-n2-00021'
        }
      },
      {
        id: 'JLPT-N2-S01-Q03',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 3,
        mondaiType: 'usage',
        instructionJp: '次の言葉の使い方として最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kalimat yang menggunakan kata berikut secara paling tepat dan alami.',
        prompt: '【かねる】',
        targetWord: 'かねる',
        options: [
          '申し訳ございませんが、そのご要望には 応じかねます。',
          '毎日 忙しくて、部屋の 掃除を かねています。',
          '風邪を ひいてしまい、学校を かねました。',
          '新しい パソコンを 買って、使いかねています。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-stem + かねる」 adalah ekspresi penolakan halus bisnis yang sangat sopan, bermakna \"karena mempertimbangkan situasi/kewenangan, kami dengan berat hati tidak dapat melakukannya\". Contoh standar bisnis: Mohon maaf, kami tidak dapat mengabulkan permintaan tersebut (応じかねます).',
          distractorAutopsy: {
            '1': '申し訳ございませんが、そのご要望には 応じかねます adalah KUNCI BENAR (penolakan sopan bisnis).',
            '2': 'Membersihkan kamar tidak bisa memakai kaneru untuk alasan sibuk.',
            '3': 'Meliburkan diri dari sekolah tidak menggunakan kaneru.',
            '4': 'Tidak bisa memakai komputer baru adalah masalah keterampilan pribadi, bukan penolakan sopan relasional.'
          },
          mnemonicSensei: 'V-stem + KANEMASU = Maaf beribu maaf, posisi/aturan kami membuat kami sulit/mustahil mengabulkannya!',
          l1InterferenceAlert: 'Kaneru BUKAN sekadar \"tidak bisa\" (dekinai), melainkan penolakan formal dengan kepekaan sosial tingkat tinggi dalam etika bisnis Jepang.',
          remedialPrescription: {
            unitId: 'unit-n2-03',
            unitNumber: 3,
            unitTitleId: 'Ketuntasan Tindakan, Batas Kapasitas & Kelelahan Fisik',
            lessonId: 'les-n2-u03-02',
            grammarId: 'gn2-00035',
            advice: 'Pelajari ragam penolakan bisnis halus Kaneru vs Gatai di Unit 3 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-03',
          unitNumber: 3,
          unitTitleId: 'Ketuntasan Tindakan, Batas Kapasitas & Kelelahan Fisik',
          lessonId: 'les-n2-u03-02',
          grammarId: 'gn2-00035'
        }
      },
      {
        id: 'JLPT-N2-S01-Q04',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 4,
        mondaiType: 'contextual_vocab',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: 'どんなに 困難な 道であっても、最後まで （　　）覚悟がある。',
        options: ['やりぬく', 'やりきる', 'やりかける', 'やりだす'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-stem + ぬく (nuku)」 bermakna \"menuntaskan suatu perjuangan yang penuh rintangan, penderitaan, atau kesulitan sampai titik darah penghabisan dengan keteguhan mental baja\". Kalimat: Betapapun sulit jalannya, saya punya tekad untuk menuntaskannya sampai akhir (やりぬく).',
          distractorAutopsy: {
            '1': 'やりぬく adalah KUNCI BENAR (menuntaskan di tengah badai kesulitan batin/fisik).',
            '2': 'やりきる menyatakan menyelesaikan seluruh kuantitas pekerjaan hingga habis tuntas, tetapi kurang menekankan aspek bertahan melawan derita.',
            '3': 'やりかける berarti baru mulai setengah jalan.',
            '4': 'やりだす berarti mulai melakukan.'
          },
          mnemonicSensei: 'NUKU = Menembus badai kesulitan! Hashiri-nuku (lari maraton sampai garis akhir meski kaki keram), Yari-nuku (menuntaskan tekad).',
          l1InterferenceAlert: 'Bedakan ~nuku (bertahan melewati penderitaan psikologis/fisik) dengan ~kiru (menyelesaikan volume pekerjaan hingga nol sisa).',
          remedialPrescription: {
            unitId: 'unit-n2-03',
            unitNumber: 3,
            unitTitleId: 'Ketuntasan Tindakan, Batas Kapasitas & Kelelahan Fisik',
            lessonId: 'les-n2-u03-01',
            grammarId: 'gn2-00031',
            advice: 'Buka kembali perbandingan V-nuku vs V-kiru di Unit 3 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-03',
          unitNumber: 3,
          unitTitleId: 'Ketuntasan Tindakan, Batas Kapasitas & Kelelahan Fisik',
          lessonId: 'les-n2-u03-01',
          grammarId: 'gn2-00031'
        }
      },
      {
        id: 'JLPT-N2-S01-Q05',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 4,
        mondaiType: 'contextual_vocab',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: '現地の 実情を （　　）支援計画を 策定しなければ ならない。',
        options: ['踏まえた', '通じた', 'めぐった', '限った'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「〜を踏まえて (〜をふまえて)」 berarti \"berlandaskan pada / berpijak pada / mempertimbangkan secara mendalam data/kondisi nyata\". Rencana bantuan harus dirumuskan dengan berpijak pada realitas lapangan (実情を踏まえた).',
          distractorAutopsy: {
            '1': '踏まえた (ふまえた) adalah KUNCI BENAR (berpijak pada fakta riil lapangan).',
            '2': '通じた (つうじた) berarti melalui perantara.',
            '3': 'めぐった (めぐった) berarti seputar perdebatan/konflik.',
            '4': '限った (かぎった) berarti terbatas hanya pada.'
          },
          mnemonicSensei: 'Fumaeru = Menginjakkan kaki dengan kokoh! Berpijak kuat di atas realitas lapangan sebelum menyusun strategi.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita berkata \"berdasarkan\". Di N2, ~o fumaete menunjukkan pertimbangan data/kondisi masa lalu yang dijadikan fondasi pijakan perumusan rencana masa depan.',
          remedialPrescription: {
            unitId: 'unit-n2-04',
            unitNumber: 4,
            unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
            lessonId: 'les-n2-u04-02',
            grammarId: 'gn2-00042',
            advice: 'Kuasai pola pertimbangan fakta ~o fumaete di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-04',
          unitNumber: 4,
          unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
          lessonId: 'les-n2-u04-02',
          grammarId: 'gn2-00042'
        }
      },
      {
        id: 'JLPT-N2-S01-Q06',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 5,
        mondaiType: 'paraphrase_synonym',
        instructionJp: '____の文とだいたい同じ意味の文を、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kalimat yang memiliki makna paling mendekati kalimat bergaris bawah.',
        prompt: '彼の スピーチには **感銘を 受けた**。',
        targetWord: '感銘を 受けた',
        options: [
          '心から 深く 感動した。',
          '強い 怒りを 感じた。',
          '退屈で 眠くなった。',
          '内容が よく 理解できなかった。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: '「感銘を受ける (かんめいを受ける)」 adalah ungkapan N2 formal yang bermakna sangat terkesan dan tersentuh mendalam di lubuk hati (心から深く感動した).',
          distractorAutopsy: {
            '1': '心から 深く 感動した adalah KUNCI BENAR.',
            '2': 'Merasa marah bertolak belakang dengan kanmei.',
            '3': 'Bosan dan mengantuk bertolak belakang.',
            '4': 'Tidak memahami isi bukan makna tersentuh batin.'
          },
          mnemonicSensei: 'Kan (感 = perasaan) + Mei (銘 = terukir). Perasaan yang terukir mendalam di hati sanubari = Kanmei!',
          l1InterferenceAlert: 'Orang Indonesia sering hanya tahu kata kandou suru. Di tulisan formal dan pidato N2, gunakan kanmei o ukeru untuk derajat rasa terkesan yang lebih mendalam dan intelek.',
          remedialPrescription: {
            unitId: 'unit-n2-05',
            unitNumber: 5,
            unitTitleId: 'Gejolak Emosi, Dorongan Spontan & Resonansi Batin',
            lessonId: 'les-n2-u05-01',
            vocabId: 'vg-n2-00105',
            advice: 'Buka kembali kosakata resonansi emosi formal di Unit 5 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-05',
          unitNumber: 5,
          unitTitleId: 'Gejolak Emosi, Dorongan Spontan & Resonansi Batin',
          lessonId: 'les-n2-u05-01',
          vocabId: 'vg-n2-00105'
        }
      },
      {
        id: 'JLPT-N2-S01-Q07',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '詳しい 日程が （　　）、すぐにお知らせ いたします。',
        options: ['決まり次第', '決まったとたん', '決まるにつれて', '決まるばかりで'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-stem + 次第 (しだい)」 dalam konteks bisnis formal bermakna \"segera setelah kejadian A terwujud di masa depan, maka tindakan B langsung dilakukan tanpa jeda\". Begitu jadwal rinci sudah diputuskan, akan segera kami kabari (決まり次第、お知らせいたします).',
          distractorAutopsy: {
            '1': '決まり次第 adalah KUNCI BENAR (formula janji tindakan masa depan: segera setelah...).',
            '2': '決まったとたん hanya untuk kejadian lampau yang tiba-tiba terjadi di luar kendali.',
            '3': '決まるにつれて menyatakan perubahan gradual beriringan, tidak cocok untuk janji pemberitahuan.',
            '4': '決まるばかりで berarti hanya memutuskan saja tanpa aksi lanjutan.'
          },
          mnemonicSensei: 'V-stem + SHIDAI = Begitu kelar, langsung kabari! Rumus emas komunikasi email bisnis Jepang.',
          l1InterferenceAlert: 'Hati-hati: Shidai untuk kejadian masa depan, sedangkan Totan untuk kejadian masa lampau yang mengagetkan. Jangan tertukar!',
          remedialPrescription: {
            unitId: 'unit-n2-01',
            unitNumber: 1,
            unitTitleId: 'Titik Balik, Suksesi Instan & Momentum Waktu',
            lessonId: 'les-n2-u01-02',
            grammarId: 'gn2-00005',
            advice: 'Pelajari formula momentum instan V-stem + shidai di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-01',
          unitNumber: 1,
          unitTitleId: 'Titik Balik, Suksesi Instan & Momentum Waktu',
          lessonId: 'les-n2-u01-02',
          grammarId: 'gn2-00005'
        }
      },
      {
        id: 'JLPT-N2-S01-Q08',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '東京公演を （　　）、全国10都市での ツアーが スタートした。',
        options: ['皮切りに', '契機に', '限りに', 'もとに'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「〜を皮切りに（して） (〜をかわきりに)」 berarti \"diawali dengan peristiwa pembuka A, kemudian serangkaian aksi serupa menyusul berturut-turut dalam skala yang semakin meluas\". Dimulai dari penampilan di Tokyo sebagai gong pembuka, tur berlanjut ke 10 kota se-Jepang.',
          distractorAutopsy: {
            '1': '皮切りに adalah KUNCI BENAR (tonggak pembuka rangkaian tur/ekspansi berkelanjutan).',
            '2': '契機に (けいきに) bermakna momentum titik balik perubahan hidup/sejarah, bukan rangkaian rute tur.',
            '3': '限りに bermakna batas akhir waktu (terakhir kali).',
            '4': 'もとに bermakna berdasarkan bahan dasar.'
          },
          mnemonicSensei: 'Kawakiri = Mengiris kulit pertama! Simbol gong pembuka rangkaian acara yang menyusul di berbagai tempat.',
          l1InterferenceAlert: 'Bedakan ~o kawakiri ni (pembuka rangkaian event beruntun) dengan ~o keiki ni (momentum titik balik perubahan batin/perilaku).',
          remedialPrescription: {
            unitId: 'unit-n2-02',
            unitNumber: 2,
            unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
            lessonId: 'les-n2-u02-01',
            grammarId: 'gn2-00015',
            advice: 'Pelajari pola tonggak pembuka event ~o kawakiri ni di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-02',
          unitNumber: 2,
          unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
          lessonId: 'les-n2-u02-01',
          grammarId: 'gn2-00015'
        }
      },
      {
        id: 'JLPT-N2-S01-Q09',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '被災地の方々の 一日も早い 復興を 祈って （　　）。',
        options: ['やまない', 'たまらない', 'たえない', 'ならない'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-te + やまない (〜てやまない)」 adalah ungkapan formal untuk menyatakan perasaan batin mendalam yang terus bergelora tanpa pernah padam (biasanya untuk kata doa/harapan: 祈ってやまない, 願ってやまない).',
          distractorAutopsy: {
            '1': 'やまない adalah KUNCI BENAR (doa/harapan tulus yang tak pernah berhenti).',
            '2': 'たまらない untuk desakan fisik/emosi tak tertahankan (misal: 暑くてたまらない = panas tak tertahankan).',
            '3': 'たえない berpasangan dengan nomina rasa syukur/kagum (感謝にたえない).',
            '4': 'ならない untuk rasa khawatir spontan yang tak terbendung (心配でならない).'
          },
          mnemonicSensei: 'Yamanai = Tidak pernah berhenti (止まない)! Doa restu tulus yang tak berkesudahan.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita hanya berkata \"sangat mendoakan\". Di bahasa Jepang N2, kolokasi resmi untuk doa batin adalah 祈ってやまない.',
          remedialPrescription: {
            unitId: 'unit-n2-05',
            unitNumber: 5,
            unitTitleId: 'Gejolak Emosi, Dorongan Spontan & Resonansi Batin',
            lessonId: 'les-n2-u05-01',
            grammarId: 'gn2-00051',
            advice: 'Pelajari formula emosi batin formal ~te yamanai di Unit 5 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-05',
          unitNumber: 5,
          unitTitleId: 'Gejolak Emosi, Dorongan Spontan & Resonansi Batin',
          lessonId: 'les-n2-u05-01',
          grammarId: 'gn2-00051'
        }
      },
      {
        id: 'JLPT-N2-S01-Q10',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: 'この ホールは、国際会議を 開催するのに （　　）設備が 整っている。',
        options: ['相応しい', '際立った', '限られた', '沿った'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kata sifat 「相応しい (ふさわしい)」 bermakna sangat layak / pantas / selaras dengan martabat atau kualifikasi yang dituntut. Gedung ini memiliki fasilitas yang sangat layak untuk menggelar konferensi internasional.',
          distractorAutopsy: {
            '1': '相応しい (ふさわしい) adalah KUNCI BENAR (pantas/layak sesuai level martabat).',
            '2': '際立った (きわだった) bermakna mencolok/menonjol.',
            '3': '限られた bermakna terbatas.',
            '4': '沿った bermakna mengikuti alur jalan/kebijakan.'
          },
          mnemonicSensei: 'Fusawashii = Cocok dan pas dengan kehormatan statusnya!',
          l1InterferenceAlert: 'Jangan tertukar antara fusawashii (layak martabat) dengan tekitou (sesuai kebutuhan praktis). Fusawashii membawa nuansa prestise formal.',
          remedialPrescription: {
            unitId: 'unit-n2-04',
            unitNumber: 4,
            unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
            lessonId: 'les-n2-u04-01',
            vocabId: 'vg-n2-00045',
            advice: 'Pelajari kosakata keselarasan kualifikasi Fusawashii di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-04',
          unitNumber: 4,
          unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
          lessonId: 'les-n2-u04-01',
          vocabId: 'vg-n2-00045'
        }
      },
      {
        id: 'JLPT-N2-S01-Q11',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: 'ベルが （　　）、生徒たちは 一斉に 教室を 飛び出した。',
        options: ['鳴るか鳴らないかのうちに', '鳴り次第', '鳴るにつれて', '鳴った末に'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-jisho + か + V-nai + かのうちに」 bermakna \"nyaris bersamaan pada detik yang sama ketika aksi A baru saja mulai, aksi B langsung meledak terjadi\". Bel berbunyi nyaris belum usai, murid-murid serentak berhamburan keluar kelas.',
          distractorAutopsy: {
            '1': '鳴るか鳴らないかのうちに adalah KUNCI BENAR (kecepatan suksesi instan tingkat detik).',
            '2': '鳴り次第 untuk rencana masa depan yang dijanjikan, bukan kejadian spontan murid.',
            '3': '鳴るにつれて menyatakan perubahan proporsional bertahap.',
            '4': '鳴った末に menyatakan hasil akhir setelah pergulatan waktu panjang, tidak logis untuk bunyi bel.'
          },
          mnemonicSensei: 'Baru bunyi atau belum bunyi nih? Saking sekejapnya, nyaris di detik yang sama murid langsung kabur!',
          l1InterferenceAlert: 'Pola ini menguji kecepatan sekejap mata. Rumusnya: Verba Kamus + KA + Verba Negatif + KA NO UCHI NI.',
          remedialPrescription: {
            unitId: 'unit-n2-01',
            unitNumber: 1,
            unitTitleId: 'Titik Balik, Suksesi Instan & Momentum Waktu',
            lessonId: 'les-n2-u01-01',
            grammarId: 'gn2-00003',
            advice: 'Pelajari rumus suksesi instan Ka nai ka no uchi ni di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-01',
          unitNumber: 1,
          unitTitleId: 'Titik Balik, Suksesi Instan & Momentum Waktu',
          lessonId: 'les-n2-u01-01',
          grammarId: 'gn2-00003'
        }
      },
      {
        id: 'JLPT-N2-S01-Q12',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 7,
        mondaiType: 'sentence_star',
        instructionJp: '★に入るものはどれですか。最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Tentukan kata yang jatuh pada posisi bintang (★).',
        prompt: '病気で ______ ______ __★__ ______ 感謝しています。',
        options: ['倒れたことを', '家族の絆の', '契機に', '大切さに気づき'],
        correctOptionIndex: 3,
        starScramble: {
          leadText: '病気で',
          tailText: '感謝しています。',
          tokens: ['倒れたことを', '契機に', '家族の絆の', '大切さに気づき'],
          correctOrder: [0, 1, 3, 2],
          starPosition: 3,
          fullSentence: '病気で 倒れたことを 契機に 大切さに気づき 家族の絆の 感謝しています。'
        },
        explanation: {
          justification: 'Susunan gramatikal yang tepat: 倒れたことを (1) + 契機に (2) [berangkat dari momentum jatuh sakit] + 家族の絆の (3) [modifikasi ikatan keluarga] + 大切さに気づき (4) [menyadari betapa berharganya]... Kata pada slot bintang ke-3 adalah 「大切さに気づき」 (opsi 4 pada daftar).',
          distractorAutopsy: {
            '1': '倒れたことを berada di urutan 1.',
            '2': '契機に berada di urutan 2.',
            '3': '家族の絆の berada di urutan 3 sebelum taisetsusa.',
            '4': '大切さに気づき adalah KUNCI BENAR (menempati slot bintang ke-3).'
          },
          mnemonicSensei: 'Jatuh sakit menjadi momentum titik balik (keiki ni) untuk menyadari arti penting ikatan keluarga!',
          l1InterferenceAlert: 'Pola ~o keiki ni selalu didahului nomina peristiwa titik balik hidup (pernikahan, penyakit, kelulusan, bencana).',
          remedialPrescription: {
            unitId: 'unit-n2-02',
            unitNumber: 2,
            unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
            lessonId: 'les-n2-u02-02',
            grammarId: 'gn2-00018',
            advice: 'Pelajari susun kalimat pola titik balik ~o keiki ni di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-02',
          unitNumber: 2,
          unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
          lessonId: 'les-n2-u02-02',
          grammarId: 'gn2-00018'
        }
      },
      {
        id: 'JLPT-N2-S01-Q13',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 7,
        mondaiType: 'sentence_star',
        instructionJp: '★に入るものはどれですか。最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Tentukan kata yang jatuh pada posisi bintang (★).',
        prompt: '住民の ______ ______ __★__ ______ 修正された。',
        options: ['要望に', '再開発計画が', '即して', '市街地の'],
        correctOptionIndex: 3,
        starScramble: {
          leadText: '住民の',
          tailText: '修正された。',
          tokens: ['要望に', '即して', '市街地の', '再開発計画が'],
          correctOrder: [0, 1, 2, 3],
          starPosition: 3,
          fullSentence: '住民の 要望に 即して 市街地の 再開発計画が 修正された。'
        },
        explanation: {
          justification: 'Susunan gramatikal yang tepat: 要望に (1) + 即して (2) [selaras dengan aspirasi warga] + 市街地の (3) + 再開発計画が (4) [rencana tata ruang kota] + 修正された [direvisi]. Kata pada slot bintang ke-3 adalah 「市街地の」 (opsi 4 pada daftar).',
          distractorAutopsy: {
            '1': '要望に berada di urutan 1 menempel pada juumin no.',
            '2': '即して berada di urutan 2 (pola ~ni sokushite = selaras dengan).',
            '3': '再開発計画が berada di urutan 4 sebagai subjek verba pasif shuusei sareta.',
            '4': '市街地の adalah KUNCI BENAR (menempati slot bintang ke-3).'
          },
          mnemonicSensei: 'Sokushite = Selaras menempel pas pada regulasi/aspirasi warga!',
          l1InterferenceAlert: 'Bedakan ~ni sokushite (mengikuti aspirasi/aturan) dengan ~ni sotte (mengikuti jalur garis/kebijakan umum).',
          remedialPrescription: {
            unitId: 'unit-n2-04',
            unitNumber: 4,
            unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
            lessonId: 'les-n2-u04-02',
            grammarId: 'gn2-00045',
            advice: 'Kuasai tata bahasa penyelarasan ~ni sokushite di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-04',
          unitNumber: 4,
          unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
          lessonId: 'les-n2-u04-02',
          grammarId: 'gn2-00045'
        }
      },
      {
        id: 'JLPT-N2-S01-Q14',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 8,
        mondaiType: 'medium_reading',
        instructionJp: '次の文章を読んで、後の問いに対する答えとして最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Bacalah wacana berikut, lalu tentukan jawaban yang paling tepat dari 1, 2, 3, 4.',
        prompt: '筆者は、組織における「失敗の共有」について どのように述べているか。',
        readingPassage: {
          genre: 'essay',
          passageTitle: '【イノベーションを生む組織風土】',
          passageText: '【イノベーションを生む組織風土】\n\n多くの企業では、成功事例ばかりが社内報や表彰で称賛され、失敗体験は個人の胸の内に封印されがちである。しかし、真のイノベーションは無数の試行錯誤の果てに生まれるものであり、失敗の中にこそ次のブレイクスルーへの貴重な教訓が眠っている。\n\n失敗した担当者を責めるのではなく、なぜその仮説が外れたのかを組織全体で冷静に分析し、知の資産として共有できる文化を持つ組織だけが、変化の激しい現代市場において持続的な成長を遂げることができるのである。'
        },
        options: [
          '失敗を個人の責任として追及せず、組織全体の学びの資産として共有することが持続的成長に不可欠である。',
          '失敗を避けるために、過去の成功事例だけを徹底的に模倣して業務を進めるべきである。',
          '社員のモチベーションを保つため、失敗体験は社内で決して公表せず 隠蔽したほうがよい。',
          '試行錯誤を繰り返すよりも、最初から100%成功する確実な計画だけを実行すべきである。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Penulis menegaskan pada paragraf kedua: 「失敗した担当者を責めるのではなく、なぜその仮説が外れたのかを組織全体で冷静に分析し、知の資産として共有できる文化を持つ組織だけが、持続的な成長を遂げることができる (Bukan menyalahkan individu, melainkan menganalisis kegagalan hipotesis secara dingin dan membagikannya sebagai aset intelektual organisasi agar tumbuh berkelanjutan)」. Pilihan 1 merangkum inti gagasan ini secara sempurna.',
          distractorAutopsy: {
            '1': '失敗を個人の責任として追及せず、組織全体の学びの資産として共有することが持続的成長に不可欠である adalah KUNCI BENAR.',
            '2': 'Meniru kesuksesan lama bertentangan dengan semangat inovasi dan uji coba hipotesis baru.',
            '3': 'Menyembunyikan kegagalan justru dikritik sebagai kelemahan umum perusahaan konservatif.',
            '4': 'Hanya menjalankan rencana yang pasti 100% sukses adalah ilusi yang mematikan inovasi.'
          },
          mnemonicSensei: 'Cari kata kunci kontras: 「〜責めるのではなく、〜資産として共有できる組織だけが持続的成長を遂げる」!',
          l1InterferenceAlert: 'Dalam Dokkai N2, penulis sering menyajikan kebiasaan umum (paragraf 1) hanya untuk membantahnya dengan kata \"しかし (tetapi)\" di paragraf 2. Jawaban selalu berada setelah kata penanda kontras!',
          remedialPrescription: {
            unitId: 'unit-n2-04',
            unitNumber: 4,
            unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
            lessonId: 'les-n2-u04-02',
            vocabId: 'vg-n2-00045',
            advice: 'Latih kemampuan dekonstruksi wacana manajerial dan argumen kontras di Unit 4 N2.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-04',
          unitNumber: 4,
          unitTitleId: 'Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban',
          lessonId: 'les-n2-u04-02',
          vocabId: 'vg-n2-00045'
        }
      },
      {
        id: 'JLPT-N2-S01-Q15',
        trackType: 'jlpt',
        level: 'n2',
        mondaiNumber: 8,
        mondaiType: 'info_retrieval',
        instructionJp: '右の案内を見て、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つ選びなさい。',
        instructionId: 'Perhatikan dokumen ketentuan subsidi berikut, lalu tentukan jawaban yang tepat.',
        prompt: '従業員25名の 中小企業が、社員に IT資格を取得させたい。助成金の 支給条件として 正しいものは どれか。',
        readingPassage: {
          genre: 'realia_table',
          passageTitle: '【中小企業 人材育成支援 助成金制度のご案内】',
          passageText: '【中小企業 人材育成支援 助成金制度のご案内】\n\n◆ 対象企業： 資本金5,000万円以下、または常時雇用する従業員が100名以下の企業\n◆ 助成率： 研修費用の 3分の2（上限：1社あたり年間100万円）\n\n◆ 主な支給要件：\n1. 受講開始の「1か月前まで」に 職業能力開発計画書を 労働局へ 提出すること。\n2. 受講者の 出席率が「80%以上」であること。\n3. 研修終了後「2か月以内」に 支給申請書および 領収書を 提出すること。\n※ 社員本人が 費用を 全額立て替え払いした場合は、対象外となります（会社名義での 振込必須）。'
        },
        options: [
          '研修開始の1か月前までに計画書を出し、会社名義で受講費を支払い、出席率80%以上を達成する。',
          '研修終了後に社員本人がクレジットカードで支払い、領収書を後から会社名義に変更する。',
          '出席率が70%以上であれば、申請期限を過ぎても 理由書を添えれば受給できる。',
          '常時雇用する従業員が25名なので、助成率が全額（100%）に引き上げられる。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Syarat mutlak yang tercantum: 1. Rencana diserahkan 1 bulan sebelum pelatihan dimulai (1か月前まで), 2. Kehadiran minimal 80% (80%以上), 3. Biaya wajib dibayar atas nama rekening perusahaan (会社名義での振込必須; jika ditalangi pribadi gugur). Pilihan 1 memenuhi seluruh ketentuan.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR.',
            '2': 'Ditalangi pribadi oleh karyawan secara tegas dinyatakan gugur/diskualifikasi (対象外).',
            '3': 'Kehadiran minimal 80%, bukan 70%, dan batas waktu tidak bisa dinegosiasikan.',
            '4': 'Besaran subsidi adalah 2/3 (3分の2), bukan 100% penuh.'
          },
          mnemonicSensei: 'Cek 3 pilar syarat dokumen administrasi Jepang: 1. Batas waktu pengajuan (Kigen), 2. Ambang batas kehadiran (Shusseki-ritsu), 3. Rekening atas nama badan hukum (Meigi)!',
          l1InterferenceAlert: 'Dalam urusan subsidi birokrasi Jepang, kesalahan kecil nama rekening pentransfer (pribadi vs perusahaan) langsung menggugurkan bantuan uang ratusan juta rupiah. Soal ini menguji ketelitian klausul pengecualian (※).',
          remedialPrescription: {
            unitId: 'unit-n2-02',
            unitNumber: 2,
            unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
            lessonId: 'les-n2-u02-02',
            vocabId: 'vg-n2-00021',
            advice: 'Latih membaca dokumen syarat subsidi legalitas korporat di Unit 2 N2.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n2',
          unitId: 'unit-n2-02',
          unitNumber: 2,
          unitTitleId: 'Pencapaian Bertahap, Batas Waktu & Mileston Kerja',
          lessonId: 'les-n2-u02-02',
          vocabId: 'vg-n2-00021'
        }
      }
    ]
  };
}

module.exports = { getJLPTN2Set };
