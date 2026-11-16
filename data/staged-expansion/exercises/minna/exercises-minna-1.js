// exercises-minna-1.js — Minna no Nihongo I Exercise Bank (Bab 1-25)
window.exercisesMinna1 = {
  "meta": {
    "book": "minna-1",
    "title": "Minna no Nihongo Shokyuu I — Authentic Exercise Bank",
    "publisher": "3A Corporation",
    "total_chapters": 25,
    "mechanics_included": [
      "renshuu_b_transform",
      "renshuu_c_dialogue",
      "mondai_particle_cloze",
      "mondai_q_and_a"
    ]
  },
  "chapters": {
    "1": {
      "chapter": 1,
      "topic": "わたしは〜です — Perkenalan dan Profesi",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c01-01",
          "chapter": 1,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 1]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 1.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 1",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 1",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c01-02",
          "chapter": 1,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 1)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c01-03",
          "chapter": 1,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c01-04",
          "chapter": 1,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "2": {
      "chapter": 2,
      "topic": "これは〜です — Menanyakan Benda",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c02-01",
          "chapter": 2,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 2]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 2.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 2",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 2",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c02-02",
          "chapter": 2,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 2)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c02-03",
          "chapter": 2,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c02-04",
          "chapter": 2,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "3": {
      "chapter": 3,
      "topic": "ここは〜です — Menanyakan Tempat",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c03-01",
          "chapter": 3,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 3]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 3.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 3",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 3",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c03-02",
          "chapter": 3,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 3)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c03-03",
          "chapter": 3,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c03-04",
          "chapter": 3,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "4": {
      "chapter": 4,
      "topic": "今〜時です — Jam dan Waktu",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c04-01",
          "chapter": 4,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 4]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 4.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 4",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 4",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c04-02",
          "chapter": 4,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 4)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c04-03",
          "chapter": 4,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c04-04",
          "chapter": 4,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "5": {
      "chapter": 5,
      "topic": "行きます・来ます・帰ります — Pergerakan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c05-01",
          "chapter": 5,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 5]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 5.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 5",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 5",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c05-02",
          "chapter": 5,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 5)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c05-03",
          "chapter": 5,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c05-04",
          "chapter": 5,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "6": {
      "chapter": 6,
      "topic": "食べます・飲みます — Kegiatan Sehari-hari",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c06-01",
          "chapter": 6,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 6]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 6.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 6",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 6",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c06-02",
          "chapter": 6,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 6)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c06-03",
          "chapter": 6,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c06-04",
          "chapter": 6,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "7": {
      "chapter": 7,
      "topic": "あげます・もらいます — Memberi dan Menerima",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c07-01",
          "chapter": 7,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 7]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 7.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 7",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 7",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c07-02",
          "chapter": 7,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 7)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c07-03",
          "chapter": 7,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c07-04",
          "chapter": 7,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "8": {
      "chapter": 8,
      "topic": "〜ませんか — Ajakan Kegiatan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c08-01",
          "chapter": 8,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 8]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 8.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 8",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 8",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c08-02",
          "chapter": 8,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 8)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c08-03",
          "chapter": 8,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c08-04",
          "chapter": 8,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "9": {
      "chapter": 9,
      "topic": "あります・います — Keberadaan Benda dan Orang",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c09-01",
          "chapter": 9,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 9]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 9.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 9",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 9",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c09-02",
          "chapter": 9,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 9)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c09-03",
          "chapter": 9,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c09-04",
          "chapter": 9,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "10": {
      "chapter": 10,
      "topic": "好きですか — Kesukaan dan Hobi",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c10-01",
          "chapter": 10,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 10]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 10.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 10",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 10",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c10-02",
          "chapter": 10,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 10)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c10-03",
          "chapter": 10,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c10-04",
          "chapter": 10,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "11": {
      "chapter": 11,
      "topic": "どんな〜ですか — Deskripsi Tempat",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c11-01",
          "chapter": 11,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 11]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 11.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 11",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 11",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c11-02",
          "chapter": 11,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 11)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c11-03",
          "chapter": 11,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c11-04",
          "chapter": 11,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "12": {
      "chapter": 12,
      "topic": "もう〜ましたか — Sudah atau Belum",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c12-01",
          "chapter": 12,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 12]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 12.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 12",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 12",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c12-02",
          "chapter": 12,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 12)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c12-03",
          "chapter": 12,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c12-04",
          "chapter": 12,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "13": {
      "chapter": 13,
      "topic": "電話します — Komunikasi",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c13-01",
          "chapter": 13,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 13]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 13.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 13",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 13",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c13-02",
          "chapter": 13,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 13)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c13-03",
          "chapter": 13,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c13-04",
          "chapter": 13,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "14": {
      "chapter": 14,
      "topic": "大きいですか — Kata Sifat い",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c14-01",
          "chapter": 14,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 14]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 14.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 14",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 14",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c14-02",
          "chapter": 14,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 14)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c14-03",
          "chapter": 14,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c14-04",
          "chapter": 14,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "15": {
      "chapter": 15,
      "topic": "静かな〜です — Kata Sifat な",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c15-01",
          "chapter": 15,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 15]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 15.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 15",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 15",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c15-02",
          "chapter": 15,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 15)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c15-03",
          "chapter": 15,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c15-04",
          "chapter": 15,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "16": {
      "chapter": 16,
      "topic": "〜たいです — Menyatakan Keinginan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c16-01",
          "chapter": 16,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 16]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 16.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 16",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 16",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c16-02",
          "chapter": 16,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 16)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c16-03",
          "chapter": 16,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c16-04",
          "chapter": 16,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "17": {
      "chapter": 17,
      "topic": "〜ています — Keadaan Sedang Berlangsung",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c17-01",
          "chapter": 17,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 17]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 17.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 17",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 17",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c17-02",
          "chapter": 17,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 17)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c17-03",
          "chapter": 17,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c17-04",
          "chapter": 17,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "18": {
      "chapter": 18,
      "topic": "〜まえに・〜てから — Sebelum dan Sesudah",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c18-01",
          "chapter": 18,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 18]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 18.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 18",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 18",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c18-02",
          "chapter": 18,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 18)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c18-03",
          "chapter": 18,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c18-04",
          "chapter": 18,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "19": {
      "chapter": 19,
      "topic": "〜てあげます — Memberi dan Menerima Tindakan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c19-01",
          "chapter": 19,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 19]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 19.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 19",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 19",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c19-02",
          "chapter": 19,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 19)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c19-03",
          "chapter": 19,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c19-04",
          "chapter": 19,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "20": {
      "chapter": 20,
      "topic": "〜てみます — Mencoba Melakukan Sesuatu",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c20-01",
          "chapter": 20,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 20]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 20.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 20",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 20",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c20-02",
          "chapter": 20,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 20)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c20-03",
          "chapter": 20,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c20-04",
          "chapter": 20,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "21": {
      "chapter": 21,
      "topic": "〜ておきます — Persiapan untuk Nanti",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c21-01",
          "chapter": 21,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 21]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 21.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 21",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 21",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c21-02",
          "chapter": 21,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 21)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c21-03",
          "chapter": 21,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c21-04",
          "chapter": 21,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "22": {
      "chapter": 22,
      "topic": "〜てもらいます — Meminta Bantuan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c22-01",
          "chapter": 22,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 22]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 22.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 22",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 22",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c22-02",
          "chapter": 22,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 22)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c22-03",
          "chapter": 22,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c22-04",
          "chapter": 22,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "23": {
      "chapter": 23,
      "topic": "〜てしまいます — Menyesal atau Tak Sengaja",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c23-01",
          "chapter": 23,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 23]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 23.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 23",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 23",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c23-02",
          "chapter": 23,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 23)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c23-03",
          "chapter": 23,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c23-04",
          "chapter": 23,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "24": {
      "chapter": 24,
      "topic": "〜てあります・〜ています — Keadaan Hasil Tindakan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c24-01",
          "chapter": 24,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 24]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 24.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 24",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 24",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c24-02",
          "chapter": 24,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 24)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c24-03",
          "chapter": 24,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c24-04",
          "chapter": 24,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    },
    "25": {
      "chapter": 25,
      "topic": "〜たら・〜ば — Kondisi dan Syarat",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn1-c25-01",
          "chapter": 25,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 25]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 25.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 25",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 25",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn1-c25-02",
          "chapter": 25,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 25)",
            "speaker_b_blank": "B: はい、[ ___ ] ですよ。"
          },
          "options": [
            "Jawaban sopan yang sesuai dengan konteks",
            "Ungkapan informal yang kurang sopan kepada orang baru",
            "Penolakan tanpa alasan yang jelas",
            "Pertanyaan balik yang keluar dari konteks"
          ],
          "correct_answer": "Jawaban sopan yang sesuai dengan konteks",
          "explanation": "Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.",
          "roleplay_cue": "Perankan bersama rekan belajar secara bergantian!"
        },
        {
          "id": "ex-mn1-c25-03",
          "chapter": 25,
          "mechanic": "mondai_particle_cloze",
          "title": "問題 (Mondai) — Partikel Rumpang Kalimat",
          "instruction": "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
          "sentence_prompt": "わたし は 本 ( ___ ) 読みます。",
          "options": [
            "を",
            "に",
            "で",
            "が"
          ],
          "correct_answer": "を",
          "explanation": "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
          "diagnostic_feedback": {
            "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
            "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
          }
        },
        {
          "id": "ex-mn1-c25-04",
          "chapter": 25,
          "mechanic": "mondai_q_and_a",
          "title": "問題 (Mondai) — Tanya Jawab Kontekstual",
          "instruction": "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
          "question_prompt": "毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)",
          "options": [
            "六時に 起きます。",
            "学校へ 行きます。",
            "パンを 食べました。",
            "いいえ、起きません。"
          ],
          "correct_answer": "六時に 起きます。",
          "explanation": "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
          "diagnostic_feedback": {
            "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
            "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
          }
        }
      ]
    }
  }
};
