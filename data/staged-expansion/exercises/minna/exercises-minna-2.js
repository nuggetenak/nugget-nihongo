// exercises-minna-2.js — Minna no Nihongo II Exercise Bank (Bab 26-50)
window.exercisesMinna2 = {
  "meta": {
    "book": "minna-2",
    "title": "Minna no Nihongo Shokyuu II — Authentic Exercise Bank",
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
    "26": {
      "chapter": 26,
      "topic": "普通形 — Bentuk Biasa (Plain Form)",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c26-01",
          "chapter": 26,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 26]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 26.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 26",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 26",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c26-02",
          "chapter": 26,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 26)",
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
          "id": "ex-mn2-c26-03",
          "chapter": 26,
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
          "id": "ex-mn2-c26-04",
          "chapter": 26,
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
    "27": {
      "chapter": 27,
      "topic": "〜と思います — Menyatakan Pendapat",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c27-01",
          "chapter": 27,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 27]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 27.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 27",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 27",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c27-02",
          "chapter": 27,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 27)",
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
          "id": "ex-mn2-c27-03",
          "chapter": 27,
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
          "id": "ex-mn2-c27-04",
          "chapter": 27,
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
    "28": {
      "chapter": 28,
      "topic": "〜でしょう — Perkiraan dan Ramalan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c28-01",
          "chapter": 28,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 28]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 28.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 28",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 28",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c28-02",
          "chapter": 28,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 28)",
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
          "id": "ex-mn2-c28-03",
          "chapter": 28,
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
          "id": "ex-mn2-c28-04",
          "chapter": 28,
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
    "29": {
      "chapter": 29,
      "topic": "〜ながら — Sambil Melakukan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c29-01",
          "chapter": 29,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 29]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 29.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 29",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 29",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c29-02",
          "chapter": 29,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 29)",
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
          "id": "ex-mn2-c29-03",
          "chapter": 29,
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
          "id": "ex-mn2-c29-04",
          "chapter": 29,
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
    "30": {
      "chapter": 30,
      "topic": "〜てから — Urutan Kegiatan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c30-01",
          "chapter": 30,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 30]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 30.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 30",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 30",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c30-02",
          "chapter": 30,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 30)",
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
          "id": "ex-mn2-c30-03",
          "chapter": 30,
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
          "id": "ex-mn2-c30-04",
          "chapter": 30,
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
    "31": {
      "chapter": 31,
      "topic": "〜たことがあります — Pengalaman Pernah",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c31-01",
          "chapter": 31,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 31]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 31.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 31",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 31",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c31-02",
          "chapter": 31,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 31)",
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
          "id": "ex-mn2-c31-03",
          "chapter": 31,
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
          "id": "ex-mn2-c31-04",
          "chapter": 31,
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
    "32": {
      "chapter": 32,
      "topic": "〜たり〜たりします — Berbagai Kegiatan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c32-01",
          "chapter": 32,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 32]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 32.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 32",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 32",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c32-02",
          "chapter": 32,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 32)",
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
          "id": "ex-mn2-c32-03",
          "chapter": 32,
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
          "id": "ex-mn2-c32-04",
          "chapter": 32,
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
    "33": {
      "chapter": 33,
      "topic": "〜なります — Menyatakan Perubahan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c33-01",
          "chapter": 33,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 33]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 33.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 33",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 33",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c33-02",
          "chapter": 33,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 33)",
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
          "id": "ex-mn2-c33-03",
          "chapter": 33,
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
          "id": "ex-mn2-c33-04",
          "chapter": 33,
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
    "34": {
      "chapter": 34,
      "topic": "〜くて・〜で — Menghubungkan Kata Sifat",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c34-01",
          "chapter": 34,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 34]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 34.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 34",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 34",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c34-02",
          "chapter": 34,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 34)",
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
          "id": "ex-mn2-c34-03",
          "chapter": 34,
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
          "id": "ex-mn2-c34-04",
          "chapter": 34,
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
    "35": {
      "chapter": 35,
      "topic": "〜から — Menyatakan Alasan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c35-01",
          "chapter": 35,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 35]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 35.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 35",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 35",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c35-02",
          "chapter": 35,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 35)",
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
          "id": "ex-mn2-c35-03",
          "chapter": 35,
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
          "id": "ex-mn2-c35-04",
          "chapter": 35,
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
    "36": {
      "chapter": 36,
      "topic": "〜ので・〜のに — Alasan dan Kontras",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c36-01",
          "chapter": 36,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 36]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 36.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 36",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 36",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c36-02",
          "chapter": 36,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 36)",
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
          "id": "ex-mn2-c36-03",
          "chapter": 36,
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
          "id": "ex-mn2-c36-04",
          "chapter": 36,
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
    "37": {
      "chapter": 37,
      "topic": "〜てはいけません・〜なければなりません — Larangan dan Kewajiban",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c37-01",
          "chapter": 37,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 37]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 37.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 37",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 37",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c37-02",
          "chapter": 37,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 37)",
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
          "id": "ex-mn2-c37-03",
          "chapter": 37,
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
          "id": "ex-mn2-c37-04",
          "chapter": 37,
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
    "38": {
      "chapter": 38,
      "topic": "〜そうです — Perkiraan dari Penampilan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c38-01",
          "chapter": 38,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 38]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 38.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 38",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 38",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c38-02",
          "chapter": 38,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 38)",
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
          "id": "ex-mn2-c38-03",
          "chapter": 38,
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
          "id": "ex-mn2-c38-04",
          "chapter": 38,
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
    "39": {
      "chapter": 39,
      "topic": "〜てあげる・てもらう・てくれる — Tindakan Memberi dan Menerima",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c39-01",
          "chapter": 39,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 39]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 39.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 39",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 39",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c39-02",
          "chapter": 39,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 39)",
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
          "id": "ex-mn2-c39-03",
          "chapter": 39,
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
          "id": "ex-mn2-c39-04",
          "chapter": 39,
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
    "40": {
      "chapter": 40,
      "topic": "〜すぎます — Terlalu Berlebihan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c40-01",
          "chapter": 40,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 40]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 40.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 40",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 40",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c40-02",
          "chapter": 40,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 40)",
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
          "id": "ex-mn2-c40-03",
          "chapter": 40,
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
          "id": "ex-mn2-c40-04",
          "chapter": 40,
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
    "41": {
      "chapter": 41,
      "topic": "〜やすい・〜にくい — Mudah atau Sulit Dilakukan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c41-01",
          "chapter": 41,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 41]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 41.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 41",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 41",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c41-02",
          "chapter": 41,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 41)",
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
          "id": "ex-mn2-c41-03",
          "chapter": 41,
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
          "id": "ex-mn2-c41-04",
          "chapter": 41,
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
    "42": {
      "chapter": 42,
      "topic": "〜かもしれません — Kemungkinan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c42-01",
          "chapter": 42,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 42]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 42.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 42",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 42",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c42-02",
          "chapter": 42,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 42)",
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
          "id": "ex-mn2-c42-03",
          "chapter": 42,
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
          "id": "ex-mn2-c42-04",
          "chapter": 42,
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
    "43": {
      "chapter": 43,
      "topic": "〜ようです・〜みたいです — Sepertinya",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c43-01",
          "chapter": 43,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 43]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 43.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 43",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 43",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c43-02",
          "chapter": 43,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 43)",
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
          "id": "ex-mn2-c43-03",
          "chapter": 43,
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
          "id": "ex-mn2-c43-04",
          "chapter": 43,
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
    "44": {
      "chapter": 44,
      "topic": "〜られます — Bentuk Pasif",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c44-01",
          "chapter": 44,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 44]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 44.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 44",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 44",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c44-02",
          "chapter": 44,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 44)",
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
          "id": "ex-mn2-c44-03",
          "chapter": 44,
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
          "id": "ex-mn2-c44-04",
          "chapter": 44,
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
    "45": {
      "chapter": 45,
      "topic": "〜てあります — Keadaan yang Sudah Dipersiapkan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c45-01",
          "chapter": 45,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 45]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 45.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 45",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 45",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c45-02",
          "chapter": 45,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 45)",
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
          "id": "ex-mn2-c45-03",
          "chapter": 45,
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
          "id": "ex-mn2-c45-04",
          "chapter": 45,
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
    "46": {
      "chapter": 46,
      "topic": "〜させます — Bentuk Kausatif (Menyuruh)",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c46-01",
          "chapter": 46,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 46]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 46.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 46",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 46",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c46-02",
          "chapter": 46,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 46)",
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
          "id": "ex-mn2-c46-03",
          "chapter": 46,
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
          "id": "ex-mn2-c46-04",
          "chapter": 46,
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
    "47": {
      "chapter": 47,
      "topic": "〜ておく・〜てしまう — Persiapan dan Penyesalan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c47-01",
          "chapter": 47,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 47]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 47.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 47",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 47",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c47-02",
          "chapter": 47,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 47)",
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
          "id": "ex-mn2-c47-03",
          "chapter": 47,
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
          "id": "ex-mn2-c47-04",
          "chapter": 47,
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
    "48": {
      "chapter": 48,
      "topic": "敬語 — Bahasa Hormat (Keigo)",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c48-01",
          "chapter": 48,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 48]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 48.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 48",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 48",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c48-02",
          "chapter": 48,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 48)",
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
          "id": "ex-mn2-c48-03",
          "chapter": 48,
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
          "id": "ex-mn2-c48-04",
          "chapter": 48,
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
    "49": {
      "chapter": 49,
      "topic": "〜ようになります — Perubahan Kemampuan atau Kebiasaan",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c49-01",
          "chapter": 49,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 49]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 49.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 49",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 49",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c49-02",
          "chapter": 49,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 49)",
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
          "id": "ex-mn2-c49-03",
          "chapter": 49,
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
          "id": "ex-mn2-c49-04",
          "chapter": 49,
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
    "50": {
      "chapter": 50,
      "topic": "〜まま — Keadaan Tetap Seperti Semula",
      "total_drills": 4,
      "drills": [
        {
          "id": "ex-mn2-c50-01",
          "chapter": 50,
          "mechanic": "renshuu_b_transform",
          "title": "練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata",
          "instruction": "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
          "cue_tokens": [
            "例: [キーワード 50]",
            "〜ます"
          ],
          "prompt": "[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab 50.",
          "sample_format": "[Kata 1 / Kata 2] → [Kalimat Utuh]",
          "options": [
            "Pilihan A: Kalimat pola standar Bab 50",
            "Pilihan B: Bentuk lampau yang kurang tepat",
            "Pilihan C: Penggunaan partikel yang salah",
            "Pilihan D: Kalimat tanpa predikat yang lengkap"
          ],
          "correct_answer": "Pilihan A: Kalimat pola standar Bab 50",
          "explanation": "Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.",
          "diagnostic_feedback": {
            "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
          }
        },
        {
          "id": "ex-mn2-c50-02",
          "chapter": 50,
          "mechanic": "renshuu_c_dialogue",
          "title": "練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)",
          "instruction": "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
          "dialogue_prompt": {
            "speaker_a": "A: すみません、ちょっと伺いますが... (Terkait topik Bab 50)",
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
          "id": "ex-mn2-c50-03",
          "chapter": 50,
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
          "id": "ex-mn2-c50-04",
          "chapter": 50,
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
