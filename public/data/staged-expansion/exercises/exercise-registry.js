// exercise-registry.js — Master Exercise & Drill Taxonomy Registry
// Covers Authentic Exercise Mechanics for All 9 Major Japanese Learning Book Series
// 100% Pedagogically Faithful & Adaptable to Nugget Nihongo UI Drill Runners
window.nuggetExerciseRegistry = {
  "version": "1.0.0",
  "last_updated": "2026-10-15",
  "total_book_series": 9,
  "signature_mechanics_taxonomy": {
    "minna": {
      "name": "Minna no Nihongo Method (3A Corporation)",
      "pedagogical_approach": "Audiolingual Structural-Situational Method",
      "mechanics": [
        {
          "code": "renshuu_b_transform",
          "ja_name": "練習B (文型変形練習)",
          "en_name": "Cue-based Pattern Transformation",
          "ui_adapter": "cloze",
          "description": "Peserta diberikan isyarat kata kunci (cues) untuk diubah menjadi kalimat utuh dengan konjugasi dan partikel yang tepat."
        },
        {
          "code": "renshuu_c_dialogue",
          "ja_name": "練習C (場面会話代入)",
          "en_name": "Paired Dialogue Substitution Roleplay",
          "ui_adapter": "response",
          "description": "Substitusi bagian percakapan berpasangan untuk melatih kelancaran interaksi sosial sehari-hari."
        },
        {
          "code": "mondai_particle_cloze",
          "ja_name": "問題・助詞穴埋め",
          "en_name": "Particle Cloze Drill",
          "ui_adapter": "cloze",
          "description": "Melengkapi partikel yang rumpang (は・が・を・に・で・へ・と) dalam kalimat utuh."
        },
        {
          "code": "mondai_q_and_a",
          "ja_name": "問題・応答練習",
          "en_name": "Conversational Q&A Drill",
          "ui_adapter": "response",
          "description": "Menjawab pertanyaan kontekstual langsung sesuai kaidah waktu, tempat, dan subjek."
        }
      ]
    },
    "genki": {
      "name": "GENKI Method (The Japan Times)",
      "pedagogical_approach": "Integrated Communicative-Interactional Method",
      "mechanics": [
        {
          "code": "cue_substitution",
          "ja_name": "練習 I (代入練習)",
          "en_name": "Cue Substitution Pattern Drill",
          "ui_adapter": "cloze",
          "description": "Menyubstitusi kata isyarat ke dalam pola gramatika inti untuk mengotomatisasi struktur kalimat."
        },
        {
          "code": "pair_work_qa",
          "ja_name": "ペア・ワーク (対話練習)",
          "en_name": "Classroom Pair Work Survey/Q&A",
          "ui_adapter": "response",
          "description": "Latihan tanya jawab simulasi antar rekan pembelajar untuk mengumpulkan informasi atau opini."
        },
        {
          "code": "form_transformation",
          "ja_name": "ワークブック・活用変形",
          "en_name": "Morphological Form Transformation",
          "ui_adapter": "cloze",
          "description": "Konjugasi sistematis bentuk kata kerja/sifat (Te-form, Plain past, Nai-form, Potential, Passive, Causative)."
        },
        {
          "code": "contextual_choice",
          "ja_name": "場面選択問題",
          "en_name": "Situational Dialogue Choice",
          "ui_adapter": "response",
          "description": "Pemilihan tanggapan paling sopan dan wajar dalam konteks sosial pergaulan di Jepang."
        }
      ]
    },
    "soumatome": {
      "name": "Nihongo Sou Matome Method (ASK Publishing)",
      "pedagogical_approach": "Structured JLPT Daily Milestone Method",
      "mechanics": [
        {
          "code": "jlpt_bunpou_4choice",
          "ja_name": "文の文法１ (4択問題)",
          "en_name": "JLPT Sentence Grammar 4-Choice",
          "ui_adapter": "cloze",
          "description": "Format standar ujian JLPT Section 1: memilih satu dari 4 opsi untuk melengkapi kalimat rumpang."
        },
        {
          "code": "jlpt_star_order",
          "ja_name": "文の文法２ (★マーク並べ替え問題)",
          "en_name": "Star Order (★) Syntax Scrambling",
          "ui_adapter": "reorder",
          "description": "Format khas JLPT Section 2: menyusun 4 potongan kata acak dan menentukan potongan kata yang menempati posisi bintang (★)."
        },
        {
          "code": "jlpt_text_cloze",
          "ja_name": "文章の文法 (文脈穴埋め)",
          "en_name": "Discourse Cohesion Text Cloze",
          "ui_adapter": "cloze",
          "description": "Format JLPT Section 3: memilih ungkapan penghubung atau akhir kalimat yang tepat dalam satu wacana esai utuh."
        }
      ]
    },
    "shin_kanzen_master": {
      "name": "Shin Kanzen Master Method (3A Corporation)",
      "pedagogical_approach": "Rigorous Nuance-Distinction & Syntactic Analysis",
      "mechanics": [
        {
          "code": "nuance_comparison",
          "ja_name": "問題A (類義表現の使い分け)",
          "en_name": "Confusing Pair Nuance Discriminator",
          "ui_adapter": "trap_detect",
          "description": "Membedakan penggunaan dua pola gramatika mirip yang memiliki batasan semantis halus (misal: うちに vs 最中に)."
        },
        {
          "code": "jlpt_star_order",
          "ja_name": "問題B (複文構文・★並べ替え)",
          "en_name": "Advanced Syntactic Star Order (★)",
          "ui_adapter": "reorder",
          "description": "Menyusun klausa bertingkat kompleks tingkat menengah-atas pada posisi bintang (★)."
        },
        {
          "code": "collocation_selection",
          "ja_name": "語彙・連語コロケーション選択",
          "en_name": "High-Register Collocation Selection",
          "ui_adapter": "vocab_context",
          "description": "Memilih pasangan kata baku (kolokasi verba-nomina-partikel) yang presisi dalam ragam formal/bisnis."
        }
      ]
    },
    "tobira": {
      "name": "Tobira Method (Kuroshio Publishers)",
      "pedagogical_approach": "Content-Based Intermediate-Advanced Bridge",
      "mechanics": [
        {
          "code": "schema_warmup",
          "ja_name": "読みの前の質問 (背景知識の活性化)",
          "en_name": "Pre-Reading Schema Activation",
          "ui_adapter": "response",
          "description": "Pertanyaan reflektif sebelum membaca teks panjang untuk mengaktifkan pemahaman latar sosiokultural pembelajar."
        },
        {
          "code": "cue_sentence_completion",
          "ja_name": "文法練習・文完成",
          "en_name": "Cue-Based Intermediate Sentence Completion",
          "ui_adapter": "cloze",
          "description": "Menyempurnakan kalimat menggunakan pola gramatika transisi N3-N2 sesuai isyarat logika wacana."
        },
        {
          "code": "cultural_inference",
          "ja_name": "内容質問・文化理解",
          "en_name": "Cultural Text Inference & Critical Check",
          "ui_adapter": "response",
          "description": "Uji pemahaman komprehensif atas teks wacana budaya (geografi, tradisi, teknologi, lingkungan hidup)."
        }
      ]
    },
    "quartet": {
      "name": "QUARTET Method (The Japan Times)",
      "pedagogical_approach": "Four-Skills Integrated Strategic Literacy",
      "mechanics": [
        {
          "code": "4skills_speaking_roleplay",
          "ja_name": "話す・コミュニケーション戦略",
          "en_name": "Strategic Communicative Roleplay",
          "ui_adapter": "response",
          "description": "Simulasi negosiasi percakapan dua arah dengan teknik asertif dan tata krama profesional (cushion words)."
        },
        {
          "code": "pattern_expansion",
          "ja_name": "書く・複文結合・文型展開",
          "en_name": "Discourse Pattern & Clause Expansion",
          "ui_adapter": "reorder",
          "description": "Menggabungkan dua kalimat mandiri menjadi satu kalimat majemuk berkesinambungan menggunakan pola wacana."
        },
        {
          "code": "reading_strategy_check",
          "ja_name": "読む・読解ストラテジー",
          "en_name": "Essay Structure & Reading Strategy Check",
          "ui_adapter": "response",
          "description": "Memeriksa pemetaan alur esai (introduksi, argumen, kontra-argumen, simpulan)."
        }
      ]
    },
    "try": {
      "name": "TRY! JLPT Communicative Method (ASK Publishing)",
      "pedagogical_approach": "Can-Do Communicative Grammar in Passage Context",
      "mechanics": [
        {
          "code": "cando_check_cloze",
          "ja_name": "チェック問題 (基本確認)",
          "en_name": "Fast Can-Do Check Cloze",
          "ui_adapter": "cloze",
          "description": "Pengecekan instan 2/3 pilihan untuk mengonfirmasi pemahaman bentuk dasar setelah membaca dialog."
        },
        {
          "code": "matome_star_drill",
          "ja_name": "まとめ問題・星マーク",
          "en_name": "Chapter Review Star Order (★)",
          "ui_adapter": "reorder",
          "description": "Soal susunan bintang ringkasan akhir bab yang mengintegrasikan seluruh pola yang telah dipelajari."
        },
        {
          "code": "situational_response",
          "ja_name": "場面応答練習",
          "en_name": "Situational Conversational Response",
          "ui_adapter": "response",
          "description": "Memilih tuturan respons yang paling tepat dalam perjumpaan sosial masyarakat Jepang."
        }
      ]
    },
    "irodori": {
      "name": "Irodori Method (The Japan Foundation)",
      "pedagogical_approach": "Action-Oriented Real-Life Task Competence",
      "mechanics": [
        {
          "code": "cando_listening_match",
          "ja_name": "聞き取り・イラストマッチング",
          "en_name": "Can-Do Real Life Listening Matching",
          "ui_adapter": "response",
          "description": "Mencocokkan informasi kunci dari percakapan nyata dalam kehidupan sehari-hari ke dalam pilihan situasi/gambar."
        },
        {
          "code": "life_sign_reading",
          "ja_name": "生活の文字サイン",
          "en_name": "Everyday Japanese Signage Reading",
          "ui_adapter": "vocab_context",
          "description": "Membaca teks informasi publik di Jepang: rambu peringatan, jadwal kereta, kemasan makanan, dan pengumuman warga."
        },
        {
          "code": "can_do_self_assessment",
          "ja_name": "Can-Do 自己評価チェック",
          "en_name": "Action-Oriented Self-Assessment Milestone",
          "ui_adapter": "response",
          "description": "Pemeriksaan kemandirian pembelajar atas penguasaan target kompetensi bertindak (Can-Do checklist)."
        }
      ]
    },
    "marugoto": {
      "name": "Marugoto Method (The Japan Foundation)",
      "pedagogical_approach": "Dual Coursebook (Katsudoo & Rikai) Mutual Reinforcement",
      "mechanics": [
        {
          "code": "katsudoo_speech_bubble",
          "ja_name": "活動・吹き出し完成",
          "en_name": "Katsudoo Speech Bubble Completion",
          "ui_adapter": "response",
          "description": "Melengkapi balon kata dalam komik/ilustrasi situasi untuk membangun empati dan komunikasi ramah."
        },
        {
          "code": "rikai_grammar_form",
          "ja_name": "理解・文法フォーム練習",
          "en_name": "Rikai Structural Form & Conjugation Practice",
          "ui_adapter": "cloze",
          "description": "Latihan ketepatan bentuk gramatika sebagai fondasi penunjang kelancaran berbicara."
        }
      ]
    }
  },
  "book_exercise_files": {
    "minna": [
      {
        "vol": "1",
        "file": "exercises/minna/exercises-minna-1.js",
        "var_name": "exercisesMinna1",
        "chapters": 25
      },
      {
        "vol": "2",
        "file": "exercises/minna/exercises-minna-2.js",
        "var_name": "exercisesMinna2",
        "chapters": 25
      }
    ],
    "genki": [
      {
        "vol": "1",
        "file": "exercises/genki/exercises-genki-1.js",
        "var_name": "exercisesGenki1",
        "chapters": 12
      },
      {
        "vol": "2",
        "file": "exercises/genki/exercises-genki-2.js",
        "var_name": "exercisesGenki2",
        "chapters": 11
      }
    ],
    "soumatome": [
      {
        "lvl": "n5",
        "file": "exercises/soumatome/exercises-sm-n5.js",
        "var_name": "exercisesSoumatomeN5",
        "weeks": 6
      },
      {
        "lvl": "n4",
        "file": "exercises/soumatome/exercises-sm-n4.js",
        "var_name": "exercisesSoumatomeN4",
        "weeks": 6
      },
      {
        "lvl": "n3",
        "file": "exercises/soumatome/exercises-sm-n3.js",
        "var_name": "exercisesSoumatomeN3",
        "weeks": 6
      },
      {
        "lvl": "n2",
        "file": "exercises/soumatome/exercises-sm-n2.js",
        "var_name": "exercisesSoumatomeN2",
        "weeks": 8
      },
      {
        "lvl": "n1",
        "file": "exercises/soumatome/exercises-sm-n1.js",
        "var_name": "exercisesSoumatomeN1",
        "weeks": 8
      }
    ],
    "shin_kanzen_master": [
      {
        "lvl": "n3",
        "file": "exercises/shin-kanzen-master/exercises-skm-n3.js",
        "var_name": "exercisesSkmN3",
        "units": 12
      },
      {
        "lvl": "n2",
        "file": "exercises/shin-kanzen-master/exercises-skm-n2.js",
        "var_name": "exercisesSkmN2",
        "units": 14
      },
      {
        "lvl": "n1",
        "file": "exercises/shin-kanzen-master/exercises-skm-n1.js",
        "var_name": "exercisesSkmN1",
        "units": 15
      }
    ],
    "tobira": [
      {
        "vol": "1",
        "file": "exercises/tobira/exercises-tobira.js",
        "var_name": "exercisesTobira",
        "chapters": 15
      }
    ],
    "quartet": [
      {
        "vol": "1",
        "file": "exercises/quartet/exercises-quartet-1.js",
        "var_name": "exercisesQuartet1",
        "lessons": 6
      },
      {
        "vol": "2",
        "file": "exercises/quartet/exercises-quartet-2.js",
        "var_name": "exercisesQuartet2",
        "lessons": 6
      }
    ],
    "try": [
      {
        "lvl": "n5",
        "file": "exercises/try/exercises-try-n5.js",
        "var_name": "exercisesTryN5",
        "chapters": 9
      },
      {
        "lvl": "n4",
        "file": "exercises/try/exercises-try-n4.js",
        "var_name": "exercisesTryN4",
        "chapters": 10
      },
      {
        "lvl": "n3",
        "file": "exercises/try/exercises-try-n3.js",
        "var_name": "exercisesTryN3",
        "chapters": 11
      },
      {
        "lvl": "n2",
        "file": "exercises/try/exercises-try-n2.js",
        "var_name": "exercisesTryN2",
        "chapters": 12
      },
      {
        "lvl": "n1",
        "file": "exercises/try/exercises-try-n1.js",
        "var_name": "exercisesTryN1",
        "chapters": 10
      }
    ],
    "irodori": [
      {
        "code": "a1",
        "file": "exercises/irodori/exercises-ir-a1.js",
        "var_name": "exercisesIrodoriA1",
        "units": 18
      },
      {
        "code": "a2-1",
        "file": "exercises/irodori/exercises-ir-a2-1.js",
        "var_name": "exercisesIrodoriA2_1",
        "units": 18
      },
      {
        "code": "a2-2",
        "file": "exercises/irodori/exercises-ir-a2-2.js",
        "var_name": "exercisesIrodoriA2_2",
        "units": 18
      }
    ],
    "marugoto": [
      {
        "code": "a1",
        "file": "exercises/marugoto/exercises-marugoto-a1.js",
        "var_name": "exercisesMarugotoA1",
        "topics": 9
      },
      {
        "code": "a2-1",
        "file": "exercises/marugoto/exercises-marugoto-a2-1.js",
        "var_name": "exercisesMarugotoA2_1",
        "topics": 9
      },
      {
        "code": "a2-2",
        "file": "exercises/marugoto/exercises-marugoto-a2-2.js",
        "var_name": "exercisesMarugotoA2_2",
        "topics": 9
      }
    ]
  }
};
