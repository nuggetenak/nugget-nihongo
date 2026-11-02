/**
 * JLPT N5 Golden Set 01 (Foundational Units 1-5)
 * 15 Authentic Items with 5-Layer Explanations & Strict Permutation Proof
 */

function getJLPTN5Set() {
  return {
    setId: 'jlpt-n5-set01',
    trackType: 'jlpt',
    level: 'n5',
    title: 'Set Latihan JLPT N5 - 01',
    description: 'Simulasi modular 15 menit menguji penguasaan fondasi Unit 1 s/d 5 (Identitas, Ruang, Keberadaan, Rutinitas, & Transportasi).',
    targetUnits: 'Unit 1 s/d 5: Fondasi Identitas, Spasial, Keberadaan, Rutinitas, & Transportasi',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'JLPT-N5-S01-Q01',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 1,
        mondaiType: 'kanji_reading',
        instructionJp: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah cara baca kanji yang bergaris bawah dari pilihan 1, 2, 3, 4.',
        prompt: 'あしたは **日曜日** です。',
        targetWord: '日曜日',
        options: ['にちようび', 'げつようび', 'すいようび', 'きんようび'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kanji 「日曜日」 dibaca 「にちようび」 yang berarti hari Minggu. Huruf 日 di awal melambangkan matahari (nichi), dan di akhir dibaca bi.',
          distractorAutopsy: {
            '1': 'にちようび adalah KUNCI BENAR (hari Minggu).',
            '2': 'げつようび adalah bacaan untuk 「月曜日」 (hari Senin).',
            '3': 'すいようび adalah bacaan untuk 「水曜日」 (hari Rabu).',
            '4': 'きんようび adalah bacaan untuk 「金曜日」 (hari Jumat).'
          },
          mnemonicSensei: 'Matahari bersinar paling terang di hari Minggu! Nichi (日) = Sun = Sunday = Nichiyoubi.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia nama hari berasal dari bahasa Arab (Senin, Selasa, Minggu). Di Jepang, nama hari menggunakan kanji elemen alam (Matahari, Bulan, Api, Air, Kayu, Logam, Tanah). Jangan tertukar!',
          remedialPrescription: {
            unitId: 'unit-n5-04',
            unitNumber: 4,
            unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
            lessonId: 'les-n5-u04-01',
            vocabId: 'vg-n5-00019',
            advice: 'Pelajari kembali nama-nama hari dan kanji waktu di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-04',
          unitNumber: 4,
          unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
          lessonId: 'les-n5-u04-01',
          vocabId: 'vg-n5-00019'
        }
      },
      {
        id: 'JLPT-N5-S01-Q02',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 1,
        mondaiType: 'kanji_reading',
        instructionJp: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah cara baca kanji yang bergaris bawah dari pilihan 1, 2, 3, 4.',
        prompt: '公園で **友達** と 会いました。',
        targetWord: '友達',
        options: ['ともだち', 'こども', 'かぞく', 'ひと'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kanji 「友達」 dibaca 「ともだち」 yang berarti teman/kawan akrab.',
          distractorAutopsy: {
            '1': 'ともだち adalah KUNCI BENAR (友達 = teman).',
            '2': 'こども adalah bacaan untuk 「子供」 (anak-anak).',
            '3': 'かぞく adalah bacaan untuk 「家族」 (keluarga).',
            '4': 'ひと adalah bacaan untuk 「人」 (orang).'
          },
          mnemonicSensei: 'Tomo (友 = sahabat) + Dachi (達 = jamak akrab) = kawan seperjuangan!',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita menyebut teman tunggal atau jamak dengan kata yang sama. Di Jepang, tomodachi bisa untuk satu orang teman maupun kelompok teman.',
          remedialPrescription: {
            unitId: 'unit-n5-05',
            unitNumber: 5,
            unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
            lessonId: 'les-n5-u05-02',
            vocabId: 'vg-n5-00027',
            advice: 'Buka kembali daftar kosakata relasi sosial dan partner beraktivitas di Unit 5.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-05',
          unitNumber: 5,
          unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
          lessonId: 'les-n5-u05-02',
          vocabId: 'vg-n5-00027'
        }
      },
      {
        id: 'JLPT-N5-S01-Q03',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 2,
        mondaiType: 'orthography',
        instructionJp: '____の言葉を漢字で書くとき、最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah penulisan kanji yang paling tepat untuk kata bergaris bawah.',
        prompt: 'つくえの うえに ほんが **さんさつ** あります。',
        targetWord: 'さんさつ',
        options: ['三本', '三枚', '三冊', '三匹'],
        correctOptionIndex: 2,
        explanation: {
          justification: 'Kata bantu bilangan untuk menghitung buku, majalah, atau jilidan adalah 「冊 (さつ)」. Tiga buku ditulis 「三冊 (さんさつ)」.',
          distractorAutopsy: {
            '1': '三本 (さんぼん) digunakan untuk benda panjang silinder (pena, botol, pohon).',
            '2': '三枚 (さんまい) digunakan untuk lembaran tipis (kertas, baju, tiket).',
            '3': '三冊 (さんさつ) adalah KUNCI BENAR (buku/jilid).',
            '4': '三匹 (さんびき) digunakan untuk hewan berkaki empat/ikan.'
          },
          mnemonicSensei: 'Kanji 冊 bentuknya seperti gulungan buku bilah bambu kuno yang diikat tali vertikal. Ingat buku = 冊 (satsu)!',
          l1InterferenceAlert: 'Di Indonesia kita sering menghitung buku dengan kata bantu generik \"buah\" (3 buah buku). Di bahasa Jepang jangan gunakan tsu jika ada kata bantu spesifik 冊 (satsu).',
          remedialPrescription: {
            unitId: 'unit-n5-03',
            unitNumber: 3,
            unitTitleId: 'Keberadaan Spasial: Ada Benda vs Orang',
            lessonId: 'les-n5-u03-02',
            vocabId: 'vg-n5-01079',
            advice: 'Tinjau ulang tabel Josuushi (kata bantu bilangan benda) di Unit 3 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-03',
          unitNumber: 3,
          unitTitleId: 'Keberadaan Spasial: Ada Benda vs Orang',
          lessonId: 'les-n5-u03-02',
          vocabId: 'vg-n5-01079'
        }
      },
      {
        id: 'JLPT-N5-S01-Q04',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 3,
        mondaiType: 'contextual_vocab',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: '朝起きて、顔を（　　）から ごはんを食べます。',
        options: ['あらって', 'あけて', 'みせて', 'のんで'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kolokasi alami untuk wajah 「顔」 adalah mencuci 「洗う (あらって)」. 顔を洗う = mencuci muka.',
          distractorAutopsy: {
            '1': 'あらって (洗って) adalah KUNCI BENAR (mencuci wajah).',
            '2': 'あけて (開けて) berarti membuka (pintu/jendela).',
            '3': 'みせて (見せて) berarti memperlihatkan/menunjukkan.',
            '4': 'のんで (飲んで) berarti meminum.'
          },
          mnemonicSensei: 'Muka bantal harus di-ARAU (dicuci)! 顔を洗う (kao o arau).',
          l1InterferenceAlert: 'Bentuk te-form dari arau adalah ara-TTE (bukan ara-ite). Hati-hati konjugasi kata kerja Golongan 1 berakhiran u.',
          remedialPrescription: {
            unitId: 'unit-n5-04',
            unitNumber: 4,
            unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
            lessonId: 'les-n5-u04-01',
            vocabId: 'vg-n5-00012',
            advice: 'Buka materi kolokasi kata kerja rutinitas pagi di Unit 4.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-04',
          unitNumber: 4,
          unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
          lessonId: 'les-n5-u04-01',
          vocabId: 'vg-n5-00012'
        }
      },
      {
        id: 'JLPT-N5-S01-Q05',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 3,
        mondaiType: 'contextual_vocab',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: '駅まで 歩いて 10分（　　）かかります。',
        options: ['ぐらい', 'ごろ', 'ばかり', 'ほど'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Untuk menyatakan taksiran rentang durasi waktu (kira-kira 10 menit), gunakan partikel 「ぐらい」. 「ごろ」 hanya untuk titik waktu pada jam (misal 10時ごろ).',
          distractorAutopsy: {
            '1': 'ぐらい adalah KUNCI BENAR (perkiraan rentang waktu/durasi).',
            '2': 'ごろ adalah jebakan populer! Goro hanya digunakan untuk titik jam (3時ごろ = sekitar jam 3), tidak bisa untuk durasi menit.',
            '3': 'ばかり adalah pola tingkat lanjut (hanya/baru saja).',
            '4': 'ほど memiliki nuansa lebih formal yang biasanya dipelajari di N3/N2.'
          },
          mnemonicSensei: 'Rentang panjang waktu = GURAI. Titik jarum jam = GORO. 10 menit adalah rentang waktu, jadi jawabannya GURAI!',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita memakai \"kira-kira\" untuk titik jam maupun durasi. Di bahasa Jepang, GORO dan GURAI tidak boleh saling ditukar!',
          remedialPrescription: {
            unitId: 'unit-n5-05',
            unitNumber: 5,
            unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
            lessonId: 'les-n5-u05-01',
            grammarId: 'gn5-00008',
            advice: 'Pelajari perbedaan kritis antara Goro dan Gurai di Unit 5 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-05',
          unitNumber: 5,
          unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
          lessonId: 'les-n5-u05-01',
          grammarId: 'gn5-00008'
        }
      },
      {
        id: 'JLPT-N5-S01-Q06',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 4,
        mondaiType: 'paraphrase_synonym',
        instructionJp: '____の文とだいたい同じ意味の文を、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kalimat yang memiliki makna paling mendekati kalimat bergaris bawah.',
        prompt: '田中さんは **会社員** です。',
        targetWord: '会社員',
        options: [
          '田中さんは 会社で 働いています。',
          '田中さんは 病院で 働いています。',
          '田中さんは 学校で 勉強しています。',
          '田中さんは 銀行を 休みました。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: '「会社員 (kaishain)」 berarti pegawai perusahaan, yang semakna dengan 「会社で働いています (bekerja di perusahaan)」.',
          distractorAutopsy: {
            '1': '会社で 働いています adalah KUNCI BENAR.',
            '2': '病院で 働いています berarti dokter/perawat, bukan kaishain umum.',
            '3': '学校で 勉強しています berarti siswa/mahasiswa.',
            '4': '銀行を 休みました berarti meliburkan diri dari bank, bukan profesi.'
          },
          mnemonicSensei: 'Kaisha (perusahaan) + In (anggota) = Orang yang bekerja di kantor!',
          l1InterferenceAlert: 'Perhatikan partikel tempat kerja: gunakan で (de) untuk tempat melakukan kegiatan bekerja (働いています), bukan に.',
          remedialPrescription: {
            unitId: 'unit-n5-01',
            unitNumber: 1,
            unitTitleId: 'Perkenalan Diri & Identitas',
            lessonId: 'les-n5-u01-01',
            vocabId: 'vg-n5-00165',
            advice: 'Tinjau ulang kosakata profesi dan parafrasa pekerjaan di Unit 1.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-01',
          unitNumber: 1,
          unitTitleId: 'Perkenalan Diri & Identitas',
          lessonId: 'les-n5-u01-01',
          vocabId: 'vg-n5-00165'
        }
      },
      {
        id: 'JLPT-N5-S01-Q07',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 3,
        mondaiType: 'contextual_vocab',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: 'この 部屋は （　　）ですから、エアコンを つけましょう。',
        options: ['あついです', 'さむいです', 'すずしいです', 'あたたかいです'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Alasan menyalakan AC (エアコンをつける) adalah karena suhu ruangan terasa panas (あついです / 暑い).',
          distractorAutopsy: {
            '1': 'あついです adalah KUNCI BENAR (panas).',
            '2': 'さむいです (dingin) biasanya membuat orang mematikan AC atau menyalakan pemanas.',
            '3': 'すずしいです (sejuk) adalah kondisi sejuk nyaman.',
            '4': 'あたたかいです (hangat) kondisi nyaman tanpa perlu pendingin udara.'
          },
          mnemonicSensei: 'Atsui = Panas! Keringat menetes, tekan tombol AC!',
          l1InterferenceAlert: 'Bahasa Jepang membedakan kanji atsui: 暑い untuk cuaca/udara panas, dan 熱い untuk benda/makanan panas. Keduanya sama-sama dibaca atsui.',
          remedialPrescription: {
            unitId: 'unit-n5-02',
            unitNumber: 2,
            unitTitleId: 'Demonstratif Spasial & Orientasi Benda',
            lessonId: 'les-n5-u02-02',
            vocabId: 'vg-n5-00994',
            advice: 'Pelajari kata sifat kondisi fisik dan lingkungan di Unit 2.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-02',
          unitNumber: 2,
          unitTitleId: 'Demonstratif Spasial & Orientasi Benda',
          lessonId: 'les-n5-u02-02',
          vocabId: 'vg-n5-00994'
        }
      },
      {
        id: 'JLPT-N5-S01-Q08',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 5,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah partikel/tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '庭に かわいい 犬が （　　）。',
        options: ['います', 'あります', 'します', 'いきます'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Untuk menyatakan keberadaan makhluk hidup bernyawa (hewan seperti 犬/anjing, manusia), wajib menggunakan kata kerja 「います」.',
          distractorAutopsy: {
            '1': 'います adalah KUNCI BENAR (makhluk hidup/bernyawa).',
            '2': 'あります adalah jebakan! Hanya untuk benda mati atau tanaman diam.',
            '3': 'します berarti melakukan aktivitas.',
            '4': 'いきます berarti bergerak pergi ke suatu arah.'
          },
          mnemonicSensei: 'IMASU untuk yang punya NYAWA. ARIMASU untuk BARANG MATI. Anjing punya nyawa, jadi IMASU!',
          l1InterferenceAlert: 'Bahasa Indonesia hanya memiliki satu kata \"ada\" untuk benda mati maupun hidup. Jangan terjemahkan langsung, selalu periksa apakah subjeknya bernyawa!',
          remedialPrescription: {
            unitId: 'unit-n5-03',
            unitNumber: 3,
            unitTitleId: 'Keberadaan Spasial: Ada Benda vs Orang',
            lessonId: 'les-n5-u03-01',
            grammarId: 'gn5-00006',
            advice: 'Buka kembali perbandingan mutlak Arimasu vs Imasu di Unit 3 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-03',
          unitNumber: 3,
          unitTitleId: 'Keberadaan Spasial: Ada Benda vs Orang',
          lessonId: 'les-n5-u03-01',
          grammarId: 'gn5-00006'
        }
      },
      {
        id: 'JLPT-N5-S01-Q09',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 5,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah partikel/tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '私は 毎朝 7時（　　）起きます。',
        options: ['に', 'で', 'を', 'へ'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Partikel 「に」 digunakan untuk menandai titik waktu spesifik yang memuat angka pasti (7時に = pada jam 7).',
          distractorAutopsy: {
            '1': 'に adalah KUNCI BENAR (titik waktu spesifik berangka).',
            '2': 'で adalah partikel sarana atau tempat aktivitas.',
            '3': 'を adalah penanda objek langsung.',
            '4': 'へ adalah penanda arah pergerakan.'
          },
          mnemonicSensei: 'Ada angkanya? Beri partikel NI! (7-ji ni). Tanpa angka (ashita, kyou)? Jangan pakai NI!',
          l1InterferenceAlert: 'Jangan memberi partikel ni pada kata waktu relatif seperti ashita atau kyou, tapi wajib pakai ni jika ada angka jamnya!',
          remedialPrescription: {
            unitId: 'unit-n5-04',
            unitNumber: 4,
            unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
            lessonId: 'les-n5-u04-01',
            grammarId: 'gn5-00007',
            advice: 'Pelajari aturan partikel waktu NI di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-04',
          unitNumber: 4,
          unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
          lessonId: 'les-n5-u04-01',
          grammarId: 'gn5-00007'
        }
      },
      {
        id: 'JLPT-N5-S01-Q10',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 5,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah partikel/tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '留学生の アグスさんは 電車（　　）学校へ 行きます。',
        options: ['で', 'に', 'を', 'から'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Partikel 「で」 menandai sarana atau moda transportasi yang digunakan untuk melakukan perpindahan gerak (電車で = naik/dengan kereta).',
          distractorAutopsy: {
            '1': 'で adalah KUNCI BENAR (sarana alat transportasi).',
            '2': 'に adalah penanda arah tempat tujuan atau titik waktu.',
            '3': 'を adalah penanda objek.',
            '4': 'から berarti \"dari\".'
          },
          mnemonicSensei: 'Naik apa perginya? Pakai DE (Densha DE, Basu DE)! Pengecualian jalan kaki: Aruite (tanpa de).',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita memakai kata kerja \"naik kereta\". Di bahasa Jepang polanya adalah nama kendaraan + DE + ikimasu.',
          remedialPrescription: {
            unitId: 'unit-n5-05',
            unitNumber: 5,
            unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
            lessonId: 'les-n5-u05-01',
            grammarId: 'gn5-00013',
            advice: 'Tinjau kembali fungsi partikel sarana DE di Unit 5 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-05',
          unitNumber: 5,
          unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
          lessonId: 'les-n5-u05-01',
          grammarId: 'gn5-00013'
        }
      },
      {
        id: 'JLPT-N5-S01-Q11',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 5,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah partikel/tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '田中さんは 先生です。ブディさん（　　）先生です。',
        options: ['も', 'は', 'の', 'か'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Partikel 「も」 berarti \"juga/pun\", menggantikan partikel 「は」 saat predikat yang diberikan identik dengan kalimat sebelumnya.',
          distractorAutopsy: {
            '1': 'も adalah KUNCI BENAR (Budi-san juga guru).',
            '2': 'は tidak salah gramatikal, tetapi tidak menyampaikan nuansa perbandingan kesamaan predikat yang baru saja diutarakan.',
            '3': 'の menandai kepemilikan (Budi-san no sensei = gurunya Budi).',
            '4': 'か adalah partikel tanya.'
          },
          mnemonicSensei: 'Sama-sama guru? Ganti WA dengan MO!',
          l1InterferenceAlert: 'Di Indonesia kata \"juga\" berada di tengah (\"Budi juga guru\"). Di Jepang partikel も langsung menempel tepat di belakang subjek (Budi-san MO).',
          remedialPrescription: {
            unitId: 'unit-n5-01',
            unitNumber: 1,
            unitTitleId: 'Perkenalan Diri & Identitas',
            lessonId: 'les-n5-u01-02',
            grammarId: 'gn5-00005',
            advice: 'Buka materi partikel penanda kesamaan predikat MO di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-01',
          unitNumber: 1,
          unitTitleId: 'Perkenalan Diri & Identitas',
          lessonId: 'les-n5-u01-02',
          grammarId: 'gn5-00005'
        }
      },
      {
        id: 'JLPT-N5-S01-Q12',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 6,
        mondaiType: 'sentence_star',
        instructionJp: '★に入るものはどれですか。最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Tentukan kata yang jatuh pada posisi bintang (★).',
        prompt: '私は 毎晩 ______ ______ __★__ ______ 寝ます。',
        options: ['お風呂に', '入って', '本を', '読んでから'],
        correctOptionIndex: 2,
        starScramble: {
          leadText: '私は 毎晩',
          tailText: '寝ます。',
          tokens: ['お風呂に', '入って', '本を', '読んでから'],
          correctOrder: [0, 1, 2, 3],
          starPosition: 3,
          fullSentence: '私は 毎晩 お風呂に 入って 本を 読んでから 寝ます。'
        },
        explanation: {
          justification: 'Urutan susunan kalimat yang benar adalah: お風呂に (1) 入って (2) 本を (3) 読んでから (4) 寝ます。Kata yang berada pada posisi bintang ke-3 adalah 「本を」 (opsi 3).',
          distractorAutopsy: {
            '1': 'お風呂に berada di urutan 1.',
            '2': '入って berada di urutan 2.',
            '3': '本を adalah KUNCI BENAR (berada di posisi bintang ke-3).',
            '4': '読んでから berada di urutan 4 sebelum kata kerja akhir 寝ます.'
          },
          mnemonicSensei: 'Mandi dulu (ofuro ni haitte), baca buku (hon o yonde kara), baru tidur (nemasu). Bintang di posisi 3 = Hon o!',
          l1InterferenceAlert: 'Dalam bahasa Jepang, frasa urutan V-te kara diletakkan tepat sebelum kata kerja penutup kalimat.',
          remedialPrescription: {
            unitId: 'unit-n5-04',
            unitNumber: 4,
            unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
            lessonId: 'les-n5-u04-02',
            grammarId: 'gn5-00089',
            advice: 'Pelajari pola urutan tindakan te-kara dan susun kalimat di Unit 4.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-04',
          unitNumber: 4,
          unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
          lessonId: 'les-n5-u04-02',
          grammarId: 'gn5-00089'
        }
      },
      {
        id: 'JLPT-N5-S01-Q13',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 6,
        mondaiType: 'sentence_star',
        instructionJp: '★に入るものはどれですか。最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Tentukan kata yang jatuh pada posisi bintang (★).',
        prompt: '日曜日、______ ______ __★__ ______ 行きました。',
        options: ['友達と', 'デパートへ', '自転車で', '買い物に'],
        correctOptionIndex: 1,
        starScramble: {
          leadText: '日曜日、',
          tailText: '行きました。',
          tokens: ['友達と', '自転車で', 'デパートへ', '買い物に'],
          correctOrder: [0, 1, 2, 3],
          starPosition: 3,
          fullSentence: '日曜日、友達と 自転車で デパートへ 買い物に 行きました。'
        },
        explanation: {
          justification: 'Susunan gramatikal alami: 友達と (1) [partner] + 自転車で (2) [kendaraan] + デパートへ (3) [tempat] + 買い物に (4) [tujuan V-stem/N ni] + 行きました。Kata pada posisi bintang ke-3 adalah 「デパートへ」 (opsi 2).',
          distractorAutopsy: {
            '1': '友達と berada di posisi 1.',
            '2': 'デパートへ adalah KUNCI BENAR (posisi bintang ke-3).',
            '3': '自転車で berada di posisi 2.',
            '4': '買い物に berada di posisi 4 tepat sebelum kata kerja ikimashita.'
          },
          mnemonicSensei: 'Sama siapa? Naik apa? Ke mana? Mau apa? Urutannya logis: Partner -> Alat -> Tempat -> Aktivitas!',
          l1InterferenceAlert: 'Pola \"pergi belanja\" adalah kaimono NI ikimasu. Bagian kaimono ni wajib menempel di depan ikimasu.',
          remedialPrescription: {
            unitId: 'unit-n5-05',
            unitNumber: 5,
            unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
            lessonId: 'les-n5-u05-02',
            grammarId: 'gn5-00013',
            advice: 'Tinjau kembali struktur kalimat gabungan sarana transportasi di Unit 5.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-05',
          unitNumber: 5,
          unitTitleId: 'Mobilitas, Transportasi & Teman Beraktivitas',
          lessonId: 'les-n5-u05-02',
          grammarId: 'gn5-00013'
        }
      },
      {
        id: 'JLPT-N5-S01-Q14',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 7,
        mondaiType: 'short_reading',
        instructionJp: '次の文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つ選びなさい。',
        instructionId: 'Bacalah teks singkat berikut, lalu pilihlah jawaban yang paling tepat dari 1, 2, 3, 4.',
        prompt: 'リンさんは 何時に どこへ 行きますか。',
        readingPassage: {
          genre: 'email',
          passageTitle: 'リンさんへの メモ',
          passageText: 'リンさんへ\n\nお疲れ様です。田中です。\n今日の 会議は 2階の 第1会議室で 午後3時から 行います。\n始まる 10分前に 部屋へ 来てください。\n資料は 私が 持って 行きます。\nよろしく お願いします。\n\n田中より'
        },
        options: [
          '午後2時50分に 2階の 第1会議室へ 行きます。',
          '午後3時に 2階の 第1会議室へ 行きます。',
          '午後3時10分に 1階の 部屋へ 行きます。',
          '午後2時50分に 3階の 会議室へ 行きます。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Rapat dimulai pukul 3 sore (午後3時から) dan peserta diminta hadir 10 menit sebelumnya (始まる10分前に部屋へ来てください). Jam 3 dikurangi 10 menit = 2.50 sore (午後2時50分). Ruangan rapat di lantai 2 (2階 第1会議室).',
          distractorAutopsy: {
            '1': '午後2時50分に 2階の 第1会議室へ 行きます adalah KUNCI BENAR.',
            '2': '午後3時 adalah jam rapat dimulai, bukan jam kedatangan yang diminta.',
            '3': '午後3時10分 terlambat dan ruangannya salah di lantai 1.',
            '4': '3階 adalah lantai yang salah.'
          },
          mnemonicSensei: 'Perhatikan frasa kunci 「10分前」! Waktu mulai dikurangi 10 menit.',
          l1InterferenceAlert: 'Dalam budaya kerja Jepang, hadir tepat waktu berarti hadir 5-10 menit sebelum acara dimulai (5分前行動). Ini sering menjadi konteks soal Dokkai di ujian JLPT.',
          remedialPrescription: {
            unitId: 'unit-n5-04',
            unitNumber: 4,
            unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
            lessonId: 'les-n5-u04-02',
            grammarId: 'gn5-00089',
            advice: 'Latih kemampuan membaca instruksi memo kerja dan waktu di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-04',
          unitNumber: 4,
          unitTitleId: 'Aksi Keseharian, Waktu & Rutinitas Kerja',
          lessonId: 'les-n5-u04-02',
          grammarId: 'gn5-00089'
        }
      },
      {
        id: 'JLPT-N5-S01-Q15',
        trackType: 'jlpt',
        level: 'n5',
        mondaiNumber: 7,
        mondaiType: 'info_retrieval',
        instructionJp: '右の案内を見て、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つ選びなさい。',
        instructionId: 'Perhatikan pengumuman jadwal berikut, lalu pilihlah jawaban yang paling tepat.',
        prompt: '留学生の アグスさんは 月曜日の 午後に 本を 借りたいです。図書館は 開いていますか。',
        readingPassage: {
          genre: 'realia_table',
          passageTitle: '【町民図書館の 利用案内】',
          passageText: '【町民図書館の 利用案内】\n\n◆ 開館時間（かいかんじかん）\n・火曜日 〜 金曜日： 午前9時 〜 午後7時\n・土曜日・日曜日： 午前10時 〜 午後5時\n\n◆ 休館日（きゅうかんび：お休みの日）\n・毎週月曜日（げつようび）\n・毎月第3水曜日\n※ 月曜日が 祝日の ときは、火曜日が 休みになります。'
        },
        options: [
          'いいえ、月曜日は 休みですから 開いていません。',
          'はい、午後7時まで 開いています。',
          'はい、午後5時まで 開いています。',
          'いいえ、午前中だけ 開いています。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pada pengumuman tertulis 休館日 (Hari Libur): 「毎週月曜日 (Setiap hari Senin)」. Karena hari Senin libur, perpustakaan tutup (開いていません).',
          distractorAutopsy: {
            '1': 'いいえ、月曜日は 休みですから 開いていません adalah KUNCI BENAR.',
            '2': 'Tutup jam 7 malam berlaku untuk Selasa sampai Jumat.',
            '3': 'Tutup jam 5 sore berlaku untuk Sabtu dan Minggu.',
            '4': 'Tidak ada keterangan buka setengah hari pada hari Senin.'
          },
          mnemonicSensei: 'Cari kata kunci 「休館日 (Kyuukanbi = Hari Libur)」! Jika tertulis 毎週月曜日, berarti setiap Senin pasti tutup.',
          l1InterferenceAlert: 'Soal Information Retrieval menguji scanning cepat. Langsung cari kata kunci hari Senin di bagian hari libur!',
          remedialPrescription: {
            unitId: 'unit-n5-02',
            unitNumber: 2,
            unitTitleId: 'Demonstratif Spasial & Orientasi Benda',
            lessonId: 'les-n5-u02-01',
            vocabId: 'vg-n5-01118',
            advice: 'Latih membaca tabel informasi fasilitas umum di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n5',
          unitId: 'unit-n5-02',
          unitNumber: 2,
          unitTitleId: 'Demonstratif Spasial & Orientasi Benda',
          lessonId: 'les-n5-u02-01',
          vocabId: 'vg-n5-01118'
        }
      }
    ]
  };
}

module.exports = { getJLPTN5Set };
