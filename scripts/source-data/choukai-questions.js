// JFT-Basic Practice Questions & Media Database (Updated with Audited Audio)
const questionSets = [
  {
    "id": 1,
    "title": "模擬試験 1 — Simulasi JFT Basic 1",
    "pdfUrl": "pdf/set1.pdf",
    "sections": [
      {
        "id": "vocab",
        "name": "Script & Vocabulary",
        "nameJp": "文字と語彙",
        "icon": "📝",
        "description": "Kanji, vocabulary, and grammar practice",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set1/p1_img3_img_p0_4.png",
            "options": [
              "神社に行きたい（じんじゃにいきたい）",
              "京都へ行きたい（きょうとへいきたい）",
              "お寺へ行きたい（おてらへいきたい）"
            ],
            "answer": "a"
          },
          {
            "id": 2,
            "promptImage": "images/set1/p1_img4_img_p0_5.png",
            "options": [
              "洗濯（せんたく）",
              "料理（りょうり）",
              "掃除（そうじ）"
            ],
            "answer": "c"
          },
          {
            "id": 3,
            "promptImage": "images/set1/p2_img4_img_p1_5.png",
            "options": [
              "まあまあでした",
              "よかったです",
              "大変でした（たいへんでした）"
            ],
            "answer": "c"
          },
          {
            "id": 4,
            "promptImage": "images/set1/p2_img5_img_p1_6.png",
            "options": [
              "カレンダー",
              "お菓子（おかし）",
              "招き猫（まねきねこ）"
            ],
            "answer": "b"
          },
          {
            "id": 5,
            "promptImage": "images/set1/p3_img4_img_p2_2.png",
            "options": [
              "電車（でんしゃ）",
              "電話（でんわ）",
              "電池（でんち）"
            ],
            "answer": "c"
          },
          {
            "id": 6,
            "promptImage": "images/set1/p3_img5_img_p2_3.png",
            "options": [
              "ネクタイ",
              "ワンピース",
              "したぎ"
            ],
            "answer": "a"
          },
          {
            "id": 7,
            "promptImage": "images/set1/p4_img3_img_p3_1.png",
            "options": [
              "夜（よる）",
              "朝（あさ）",
              "昼（ひる）"
            ],
            "answer": "b"
          },
          {
            "id": 8,
            "promptImage": "images/set1/p4_img4_img_p3_2.png",
            "options": [
              "焼き鳥（やきとり）",
              "刺身（さしみ）",
              "枝豆（えだまめ）"
            ],
            "answer": "b"
          },
          {
            "id": 9,
            "promptImage": "images/set1/p5_img3_img_p4_1.png",
            "options": [
              "倉庫（そうこ）",
              "食堂（しょくどう）",
              "更衣室（こういしつ）"
            ],
            "answer": "a"
          },
          {
            "id": 10,
            "promptImage": "images/set1/p5_img4_img_p4_2.png",
            "options": [
              "会議室（かいぎしつ）",
              "更衣室（こういしつ）",
              "給湯室（きゅうとうしつ）"
            ],
            "answer": "c"
          },
          {
            "id": 11,
            "promptImage": "images/set1/p6_img5_img_p5_1.png",
            "options": [
              "せんしょ",
              "せんしゅ",
              "せんしゅう"
            ],
            "answer": "c"
          },
          {
            "id": 12,
            "promptImage": "images/set1/p6_img6_img_p5_2.png",
            "options": [
              "とりにく",
              "ぶたにく",
              "ぎゅうにく"
            ],
            "answer": "b"
          },
          {
            "id": 13,
            "promptImage": "images/set1/p6_img7_img_p5_3.png",
            "options": [
              "眠",
              "熱",
              "痛"
            ],
            "answer": "c"
          },
          {
            "id": 14,
            "promptImage": "images/set1/p6_img8_img_p5_4.png",
            "options": [
              "かんじ",
              "つごう",
              "すうじ"
            ],
            "answer": "c"
          },
          {
            "id": 15,
            "promptImage": "images/set1/p6_img9_img_p5_5.png",
            "options": [
              "わるい",
              "かるい",
              "ふるい"
            ],
            "answer": "a"
          },
          {
            "id": 16,
            "promptImage": "images/set1/p7_img3_img_p6_1.png",
            "options": [
              "おと",
              "そと",
              "あと"
            ],
            "answer": "a"
          },
          {
            "id": 17,
            "promptImage": "images/set1/p7_img4_img_p6_2.png",
            "options": [
              "右方",
              "夕方",
              "悪方"
            ],
            "answer": "b"
          },
          {
            "id": 18,
            "promptImage": "images/set1/p7_img5_img_p6_3.png",
            "options": [
              "大学",
              "合格",
              "高校"
            ],
            "answer": "b"
          },
          {
            "id": 19,
            "promptImage": "images/set1/p7_img6_img_p6_4.png",
            "options": [
              "音楽",
              "薬",
              "寝"
            ],
            "answer": "b"
          },
          {
            "id": 20,
            "promptImage": "images/set1/p7_img7_img_p6_5.png",
            "options": [
              "病気",
              "病院",
              "医者"
            ],
            "answer": "a"
          },
          {
            "id": 21,
            "promptImage": "images/set1/p8_img3_img_p7_1.png",
            "options": [
              "勉強しています",
              "勉強しました",
              "勉強することです"
            ],
            "answer": "c"
          },
          {
            "id": 22,
            "promptImage": "images/set1/p8_img4_img_p7_2.png",
            "options": [
              "晴れました",
              "晴れています",
              "晴れるでしょう"
            ],
            "answer": "c"
          },
          {
            "id": 23,
            "promptImage": "images/set1/p8_img5_img_p7_3.png",
            "options": [
              "暑かったです",
              "暑くなります",
              "暑いです"
            ],
            "answer": "a"
          },
          {
            "id": 24,
            "promptImage": "images/set1/p8_img6_img_p7_4.png",
            "options": [
              "曲がりますから",
              "曲がる",
              "曲がって"
            ],
            "answer": "c"
          },
          {
            "id": 25,
            "promptImage": "images/set1/p8_img7_img_p7_5.png",
            "options": [
              "前",
              "前に",
              "前で"
            ],
            "answer": "b"
          },
          {
            "id": 26,
            "promptImage": "images/set1/p9_img3_img_p8_1.png",
            "options": [
              "暇",
              "暇な",
              "暇の"
            ],
            "answer": "c"
          },
          {
            "id": 27,
            "promptImage": "images/set1/p9_img4_img_p8_2.png",
            "options": [
              "紹介しましょうか",
              "紹介していますか",
              "紹介したことがありますか"
            ],
            "answer": "a"
          },
          {
            "id": 28,
            "promptImage": "images/set1/p9_img5_img_p8_3.png",
            "options": [
              "甘そう",
              "甘そうな",
              "甘そうで"
            ],
            "answer": "b"
          },
          {
            "id": 29,
            "promptImage": "images/set1/p9_img6_img_p8_4.png",
            "options": [
              "混んでいると",
              "混んでいるけど",
              "混んでいて"
            ],
            "answer": "c"
          },
          {
            "id": 30,
            "options": [
              "質問したら",
              "質問するのが",
              "質問しても"
            ],
            "answer": "c"
          }
        ]
      },
      {
        "id": "conv",
        "name": "Conversation & Expression",
        "nameJp": "会話と表現",
        "icon": "💬",
        "description": "Situational conversations and dialogue expressions",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set1/p10_img3_img_p9_1.png",
            "options": [
              "もう少しどうですか",
              "どうされましたか",
              "どの辺ですか"
            ],
            "answer": "b"
          },
          {
            "id": 2,
            "promptImage": "images/set1/p10_img4_img_p9_2.png",
            "options": [
              "どうしていますか",
              "どうしたんですか",
              "どうされましたか"
            ],
            "answer": "a"
          },
          {
            "id": 3,
            "promptImage": "images/set1/p10_img5_img_p9_3.png",
            "options": [
              "どうしたんですか",
              "どうですか",
              "いいでしょうか"
            ],
            "answer": "a"
          },
          {
            "id": 4,
            "promptImage": "images/set1/p11_img3_img_p10_1.png",
            "options": [
              "を使っています",
              "がいっぱいです",
              "といいます"
            ],
            "answer": "c"
          },
          {
            "id": 5,
            "promptImage": "images/set1/p11_img4_img_p10_2.png",
            "options": [
              "大切にします",
              "いつもでも幸せに",
              "ごめんください"
            ],
            "answer": "a"
          }
        ]
      },
      {
        "id": "listening",
        "name": "Listening Comprehension",
        "nameJp": "聴解",
        "icon": "🎧",
        "description": "Audio-based listening questions with pictures and dialogues",
        "audioFiles": [
          {
            "mp3": "audio/set1/soal_1.mp3",
            "m4a": "audio/set1/soal_1.m4a",
            "label": "問題 1 (赤ちゃん誕生)"
          },
          {
            "mp3": "audio/set1/soal_2.mp3",
            "m4a": "audio/set1/soal_2.m4a",
            "label": "問題 2 (ベトナムのお土産)"
          },
          {
            "mp3": "audio/set1/soal_3.mp3",
            "m4a": "audio/set1/soal_3.m4a",
            "label": "問題 3 (ミャンマーの手作りカバン)"
          },
          {
            "mp3": "audio/set1/soal_4.mp3",
            "m4a": "audio/set1/soal_4.m4a",
            "label": "問題 4-5 (二日酔いとアドバイス)"
          }
        ],
        "questions": [
          {
            "id": 1,
            "audioIndex": 0,
            "promptImage": "images/set1/p12_img3_img_p11_1.png",
            "promptText": "何のお祝いですか？",
            "options": [
              {
                "label": "a",
                "image": "images/set1/p12_img4_img_p11_2.png",
                "text": "結婚式 (Wedding)"
              },
              {
                "label": "b",
                "image": "images/set1/p12_img5_img_p11_3.png",
                "text": "合格・卒業 (Passed exam)"
              },
              {
                "label": "c",
                "image": "images/set1/p12_img6_img_p11_4.png",
                "text": "出産 (Baby born)"
              }
            ],
            "answer": "c"
          },
          {
            "id": 2,
            "audioIndex": 1,
            "promptImage": "images/set1/p13_img3_img_p12_1.png",
            "promptText": "トアさんは、お土産に何を渡しましたか。",
            "options": [
              {
                "label": "a",
                "text": "ベトナムの服"
              },
              {
                "label": "b",
                "text": "フィリピンのお茶"
              },
              {
                "label": "c",
                "text": "ベトナムのコーヒー"
              }
            ],
            "answer": "c"
          },
          {
            "id": 3,
            "audioIndex": 2,
            "promptImage": "images/set1/p13_img4_img_p12_2.png",
            "promptText": "だれにもらいましたか。",
            "options": [
              {
                "label": "a",
                "text": "お父さん"
              },
              {
                "label": "b",
                "text": "お母さん"
              },
              {
                "label": "c",
                "text": "お子さん"
              }
            ],
            "answer": "b"
          },
          {
            "id": 4,
            "audioIndex": 3,
            "promptImage": "images/set1/p14_img3_img_p13_1.png",
            "promptText": "どのように体の調子が悪いですか？",
            "options": [
              {
                "label": "a",
                "text": "二日酔い"
              },
              {
                "label": "b",
                "text": "胃の調子が悪い"
              },
              {
                "label": "c",
                "text": "頭が痛い"
              }
            ],
            "answer": "a"
          },
          {
            "id": 5,
            "audioIndex": 3,
            "promptImage": "images/set1/p14_img4_img_p13_2.png",
            "promptText": "どんなアドバイスでしたか？",
            "options": [
              {
                "label": "a",
                "text": "マッサージする"
              },
              {
                "label": "b",
                "text": "薬を飲む"
              },
              {
                "label": "c",
                "text": "温かい飲み物を飲む"
              }
            ],
            "answer": "c"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "模擬試験 2 — Simulasi JFT Basic 2",
    "pdfUrl": "pdf/set2.pdf",
    "sections": [
      {
        "id": "vocab",
        "name": "Script & Vocabulary",
        "nameJp": "文字と語彙",
        "icon": "📝",
        "description": "Kanji, vocabulary, and grammar practice",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set2/p1_img3_img_p0_4.png",
            "options": [
              "ききます",
              "かきます",
              "さきます"
            ],
            "answer": "b"
          },
          {
            "id": 2,
            "promptImage": "images/set2/p1_img4_img_p0_5.png",
            "options": [
              "ガラス",
              "カップ",
              "カーテン"
            ],
            "answer": "b"
          },
          {
            "id": 3,
            "promptImage": "images/set2/p2_img3_img_p1_4.png",
            "options": [
              "そうじします",
              "しょくじします",
              "せんたくします"
            ],
            "answer": "c"
          },
          {
            "id": 4,
            "promptImage": "images/set2/p2_img4_img_p1_5.png",
            "options": [
              "はくぶつかん",
              "びじゅつかん",
              "どうぶつえん"
            ],
            "answer": "a"
          },
          {
            "id": 5,
            "promptImage": "images/set2/p3_img3_img_p2_1.png",
            "options": [
              "ちゃいろ",
              "しろ",
              "ぎんいろ"
            ],
            "answer": "c"
          },
          {
            "id": 6,
            "promptImage": "images/set2/p3_img4_img_p2_2.png",
            "options": [
              "けいさつかん",
              "えきいん",
              "うんてんしゃ"
            ],
            "answer": "b"
          },
          {
            "id": 7,
            "promptImage": "images/set2/p4_img3_img_p3_1.png",
            "options": [
              "にんじん",
              "たまねぎ",
              "きゅうり"
            ],
            "answer": "a"
          },
          {
            "id": 8,
            "promptImage": "images/set2/p4_img4_img_p3_2.png",
            "options": [
              "かおをあらいます",
              "ひげをそります",
              "おけしょうします"
            ],
            "answer": "c"
          },
          {
            "id": 9,
            "promptImage": "images/set2/p5_img3_img_p4_1.png",
            "options": [
              "たっきゅう",
              "やきゅう",
              "じゅうどう"
            ],
            "answer": "b"
          },
          {
            "id": 10,
            "promptImage": "images/set2/p5_img4_img_p4_2.png",
            "options": [
              "うんどうします",
              "さんぽします",
              "おしゃべりします"
            ],
            "answer": "b"
          },
          {
            "id": 11,
            "promptImage": "images/set2/p6_img3_img_p5_1.png",
            "options": [
              "けつようび",
              "げつようび",
              "げつよび"
            ],
            "answer": "b"
          },
          {
            "id": 12,
            "promptImage": "images/set2/p6_img4_img_p5_2.png",
            "options": [
              "じゅうじ",
              "じゅじい",
              "しゅうじ"
            ],
            "answer": "a"
          },
          {
            "id": 13,
            "promptImage": "images/set2/p6_img5_img_p5_3.png",
            "options": [
              "なつやすみ",
              "ひるやすみ",
              "あきやすみ"
            ],
            "answer": "b"
          },
          {
            "id": 14,
            "promptImage": "images/set2/p6_img6_img_p5_4.png",
            "options": [
              "せんしゅう",
              "らいしゅう",
              "こんしゅう"
            ],
            "answer": "c"
          },
          {
            "id": 15,
            "promptImage": "images/set2/p6_img7_img_p5_5.png",
            "options": [
              "こんとう",
              "こんどう",
              "こんど"
            ],
            "answer": "c"
          },
          {
            "id": 16,
            "promptImage": "images/set2/p7_img3_img_p6_1.png",
            "options": [
              "西",
              "南",
              "東"
            ],
            "answer": "c"
          },
          {
            "id": 17,
            "promptImage": "images/set2/p7_img4_img_p6_2.png",
            "options": [
              "後",
              "横",
              "秋"
            ],
            "answer": "b"
          },
          {
            "id": 18,
            "promptImage": "images/set2/p7_img5_img_p6_3.png",
            "options": [
              "万円",
              "百円",
              "千円"
            ],
            "answer": "b"
          },
          {
            "id": 19,
            "promptImage": "images/set2/p7_img6_img_p6_4.png",
            "options": [
              "予約",
              "予算",
              "予定"
            ],
            "answer": "c"
          },
          {
            "id": 20,
            "promptImage": "images/set2/p7_img7_img_p6_5.png",
            "options": [
              "下",
              "上",
              "正"
            ],
            "answer": "a"
          },
          {
            "id": 21,
            "promptImage": "images/set2/p8_img3_img_p7_1.png",
            "options": [
              "ようになりました",
              "ようにしてください",
              "ようにしています"
            ],
            "answer": "a"
          },
          {
            "id": 22,
            "promptImage": "images/set2/p8_img4_img_p7_2.png",
            "options": [
              "教える",
              "教えられる",
              "教えている"
            ],
            "answer": "b"
          },
          {
            "id": 23,
            "promptImage": "images/set2/p8_img5_img_p7_3.png",
            "options": [
              "する",
              "できる",
              "される"
            ],
            "answer": "b"
          },
          {
            "id": 24,
            "promptImage": "images/set2/p8_img6_img_p7_4.png",
            "options": [
              "わかって",
              "わかった",
              "わかる"
            ],
            "answer": "c"
          },
          {
            "id": 25,
            "promptImage": "images/set2/p8_img7_img_p7_5.png",
            "options": [
              "書くのに",
              "書いて",
              "書けるように"
            ],
            "answer": "c"
          },
          {
            "id": 26,
            "promptImage": "images/set2/p9_img3_img_p8_1.png",
            "options": [
              "紹介してくれました",
              "紹介してもらいました",
              "紹介してあげました"
            ],
            "answer": "a"
          },
          {
            "id": 27,
            "promptImage": "images/set2/p9_img4_img_p8_2.png",
            "options": [
              "見てみよう",
              "見てみる",
              "見てみたら"
            ],
            "answer": "a"
          },
          {
            "id": 28,
            "promptImage": "images/set2/p9_img5_img_p8_3.png",
            "options": [
              "送ってくれます",
              "送ってもらいます",
              "送ってあげます"
            ],
            "answer": "c"
          },
          {
            "id": 29,
            "promptImage": "images/set2/p9_img6_img_p8_4.png",
            "options": [
              "ように",
              "ために",
              "のに"
            ],
            "answer": "b"
          },
          {
            "id": 30,
            "promptImage": "images/set2/p9_img7_img_p8_5.png",
            "options": [
              "助けてあげました",
              "助けてくれました",
              "助けてもらいました"
            ],
            "answer": "c"
          }
        ]
      },
      {
        "id": "conv",
        "name": "Conversation & Expression",
        "nameJp": "会話と表現",
        "icon": "💬",
        "description": "Situational conversations and dialogue expressions",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set2/p10_img3_img_p9_1.png",
            "options": [
              "できれば",
              "おかげで",
              "もしかしたら"
            ],
            "answer": "b"
          },
          {
            "id": 2,
            "promptImage": "images/set2/p10_img4_img_p9_2.png",
            "options": [
              "きっと",
              "だいぶ",
              "まっすぐ"
            ],
            "answer": "b"
          },
          {
            "id": 3,
            "promptImage": "images/set2/p10_img5_img_p9_3.png",
            "options": [
              "おかげで",
              "だいたい",
              "とにかく"
            ],
            "answer": "c"
          },
          {
            "id": 4,
            "promptImage": "images/set2/p11_img3_img_p10_1.png",
            "options": [
              "もともと",
              "なんとか",
              "なるほど"
            ],
            "answer": "a"
          },
          {
            "id": 5,
            "promptImage": "images/set2/p11_img4_img_p10_2.png",
            "options": [
              "いろいろ考えてみます",
              "よろしくお伝えください",
              "別にかまいません"
            ],
            "answer": "a"
          },
          {
            "id": 6,
            "promptImage": "images/set2/p11_img5_img_p10_3.png",
            "options": [
              "そうなんですか",
              "そうですね",
              "そんなことないです"
            ],
            "answer": "c"
          },
          {
            "id": 7,
            "promptImage": "images/set2/p12_img3_img_p11_1.png",
            "options": [
              "なんとか",
              "よかったら",
              "たしかに"
            ],
            "answer": "b"
          },
          {
            "id": 8,
            "promptImage": "images/set2/p12_img4_img_p11_2.png",
            "options": [
              "どうしてですか",
              "どうでしたか",
              "どうしますか"
            ],
            "answer": "b"
          }
        ]
      },
      {
        "id": "listening",
        "name": "Listening Comprehension",
        "nameJp": "聴解",
        "icon": "🎧",
        "description": "Audio-based listening questions with pictures and dialogues",
        "audioFiles": [
          {
            "mp3": "audio/set2/soal_1.mp3",
            "m4a": "audio/set2/soal_1.m4a",
            "label": "問題 1 (和太鼓の趣味)"
          },
          {
            "mp3": "audio/set2/soal_2.mp3",
            "m4a": "audio/set2/soal_2.m4a",
            "label": "問題 2 (スーパーの買い物)"
          },
          {
            "mp3": "audio/set2/soal_3.mp3",
            "m4a": "audio/set2/soal_3.m4a",
            "label": "問題 3 (週末の海釣り)"
          },
          {
            "mp3": "audio/set2/soal_4.mp3",
            "m4a": "audio/set2/soal_4.m4a",
            "label": "問題 4 (持ち物の確認)"
          },
          {
            "mp3": "audio/set2/soal_5.mp3",
            "m4a": "audio/set2/soal_5.m4a",
            "label": "問題 5 (日本のお菓子)"
          }
        ],
        "questions": [
          {
            "id": 1,
            "audioIndex": 0,
            "promptText": "何番の絵ですか？ 音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "image": "images/set2/p13_img3_img_p12_1.png",
                "text": "イヤホン・動画を見る"
              },
              {
                "label": "b",
                "image": "images/set2/p13_img4_img_p12_2.png",
                "text": "スーパーで買い物"
              },
              {
                "label": "c",
                "image": "images/set2/p13_img5_img_p12_3.png",
                "text": "和太鼓をたたく"
              }
            ],
            "answer": "c"
          },
          {
            "id": 2,
            "audioIndex": 1,
            "promptText": "何番の絵ですか？ 音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "image": "images/set2/p14_img3_img_p13_1.png",
                "text": "絵 A"
              },
              {
                "label": "b",
                "image": "images/set2/p14_img4_img_p13_2.png",
                "text": "絵 B"
              },
              {
                "label": "c",
                "image": "images/set2/p14_img5_img_p13_3.png",
                "text": "絵 C"
              }
            ],
            "answer": "c"
          },
          {
            "id": 3,
            "audioIndex": 2,
            "promptImage": "images/set2/p15_img3_img_p14_1.png",
            "promptText": "音声を聞いて正しい絵を選んでください。",
            "options": [
              {
                "label": "a",
                "image": "images/set2/p15_img4_img_p14_2.png",
                "text": "絵 A"
              },
              {
                "label": "b",
                "image": "images/set2/p15_img5_img_p14_3.png",
                "text": "絵 B"
              },
              {
                "label": "c",
                "image": "images/set2/p15_img6_img_p14_4.png",
                "text": "絵 C"
              }
            ],
            "answer": "c"
          },
          {
            "id": 4,
            "audioIndex": 3,
            "promptImage": "images/set2/p16_img3_img_p15_1.png",
            "promptText": "音声を聞いて正しい絵を選んでください。",
            "options": [
              {
                "label": "a",
                "image": "images/set2/p16_img4_img_p15_2.png",
                "text": "絵 A"
              },
              {
                "label": "b",
                "image": "images/set2/p16_img5_img_p15_3.png",
                "text": "絵 B"
              },
              {
                "label": "c",
                "image": "images/set2/p16_img6_img_p15_4.png",
                "text": "絵 C"
              }
            ],
            "answer": "a"
          },
          {
            "id": 5,
            "audioIndex": 4,
            "promptImage": "images/set2/p17_img3_img_p16_1.png",
            "promptText": "味はどうでしたか？",
            "options": [
              {
                "label": "a",
                "text": "甘くておいしい"
              },
              {
                "label": "b",
                "text": "おいしい"
              },
              {
                "label": "c",
                "text": "だめ"
              }
            ],
            "answer": "a"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "模擬試験 3 — Simulasi JFT Basic 3",
    "pdfUrl": "pdf/set3.pdf",
    "sections": [
      {
        "id": "vocab",
        "name": "Script & Vocabulary",
        "nameJp": "文字と語彙",
        "icon": "📝",
        "description": "Kanji, vocabulary, and grammar practice",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set3/p1_img3_img_p0_4.png",
            "options": [
              "しばる",
              "つぶす",
              "包む（つつむ）"
            ],
            "answer": "a"
          },
          {
            "id": 2,
            "promptImage": "images/set3/p1_img4_img_p0_5.png",
            "options": [
              "ストロー",
              "チャップ",
              "ラベル"
            ],
            "answer": "a"
          },
          {
            "id": 3,
            "promptImage": "images/set3/p2_img3_img_p1_4.png",
            "options": [
              "取る（とる）",
              "固める（かためる）",
              "しばる"
            ],
            "answer": "a"
          },
          {
            "id": 4,
            "promptImage": "images/set3/p2_img4_img_p1_5.png",
            "options": [
              "包む（つつむ）",
              "固める（かためる）",
              "分ける（わける）"
            ],
            "answer": "a"
          },
          {
            "id": 5,
            "promptImage": "images/set3/p3_img3_img_p2_1.png",
            "options": [
              "開ける（あける）",
              "守る（まもる）",
              "消す（けす）"
            ],
            "answer": "c"
          },
          {
            "id": 6,
            "promptImage": "images/set3/p3_img4_img_p2_2.png",
            "options": [
              "津波（つなみ）",
              "台風（たいふ）",
              "火事（かじ）"
            ],
            "answer": "a"
          },
          {
            "id": 7,
            "promptImage": "images/set3/p4_img3_img_p3_1.png",
            "options": [
              "積もる（つもる）",
              "消える（きえる）",
              "倒れる（たおれる）"
            ],
            "answer": "c"
          },
          {
            "id": 8,
            "promptImage": "images/set3/p4_img4_img_p3_2.png",
            "options": [
              "断水する（だんすいする）",
              "避難する（ひなんする）",
              "停電する（ていでんする）"
            ],
            "answer": "c"
          },
          {
            "id": 9,
            "promptImage": "images/set3/p5_img3_img_p4_1.png",
            "options": [
              "近づく（ちかづく）",
              "隠れる（かくれる）",
              "離れる（はなれる）"
            ],
            "answer": "b"
          },
          {
            "id": 10,
            "promptImage": "images/set3/p5_img4_img_p4_2.png",
            "options": [
              "分別する（ぶんべつする）",
              "減らす（へらす）",
              "リサイクルする"
            ],
            "answer": "c"
          },
          {
            "id": 11,
            "promptImage": "images/set3/p6_img3_img_p5_1.png",
            "options": [
              "けす",
              "かす",
              "きす"
            ],
            "answer": "a"
          },
          {
            "id": 12,
            "promptImage": "images/set3/p6_img4_img_p5_2.png",
            "options": [
              "おてら",
              "おんど",
              "おんせん"
            ],
            "answer": "b"
          },
          {
            "id": 13,
            "promptImage": "images/set3/p6_img5_img_p5_3.png",
            "options": [
              "まい",
              "しゅるい",
              "さつ"
            ],
            "answer": "b"
          },
          {
            "id": 14,
            "promptImage": "images/set3/p6_img6_img_p5_4.png",
            "options": [
              "もえる",
              "まえる",
              "おしえる"
            ],
            "answer": "a"
          },
          {
            "id": 15,
            "promptImage": "images/set3/p6_img7_img_p5_5.png",
            "options": [
              "しんみ",
              "べつい",
              "いみ"
            ],
            "answer": "c"
          },
          {
            "id": 16,
            "promptImage": "images/set3/p7_img3_img_p6_1.png",
            "options": [
              "しんぱい",
              "せんぱい",
              "しりあい"
            ],
            "answer": "a"
          },
          {
            "id": 17,
            "promptImage": "images/set3/p7_img4_img_p6_2.png",
            "options": [
              "だいすき",
              "たいへん",
              "たいせつ"
            ],
            "answer": "c"
          },
          {
            "id": 18,
            "promptImage": "images/set3/p7_img5_img_p6_3.png",
            "options": [
              "あわない",
              "あぶない",
              "あんない"
            ],
            "answer": "b"
          },
          {
            "id": 19,
            "promptImage": "images/set3/p7_img6_img_p6_4.png",
            "options": [
              "くろまります",
              "たたまります",
              "あつまります"
            ],
            "answer": "c"
          },
          {
            "id": 20,
            "promptImage": "images/set3/p7_img7_img_p6_5.png",
            "options": [
              "すいます",
              "ひきます",
              "やきます"
            ],
            "answer": "c"
          },
          {
            "id": 21,
            "promptImage": "images/set3/p8_img3_img_p7_1.png",
            "options": [
              "ついた",
              "ついて",
              "つく"
            ],
            "answer": "a"
          },
          {
            "id": 22,
            "promptImage": "images/set3/p8_img4_img_p7_2.png",
            "options": [
              "へらした",
              "へらす",
              "へらせる"
            ],
            "answer": "b"
          },
          {
            "id": 23,
            "promptImage": "images/set3/p8_img5_img_p7_3.png",
            "options": [
              "包む",
              "包んだ",
              "包んで"
            ],
            "answer": "a"
          },
          {
            "id": 24,
            "promptImage": "images/set3/p8_img6_img_p7_4.png",
            "options": [
              "開いた",
              "開いて",
              "開く"
            ],
            "answer": "a"
          },
          {
            "id": 25,
            "promptImage": "images/set3/p8_img7_img_p7_5.png",
            "options": [
              "届かなくて",
              "届かない",
              "届かなく"
            ],
            "answer": "c"
          },
          {
            "id": 26,
            "promptImage": "images/set3/p9_img3_img_p8_1.png",
            "options": [
              "出たほうがいいです",
              "出なくちゃ",
              "出ないようにしてください"
            ],
            "answer": "c"
          },
          {
            "id": 27,
            "promptImage": "images/set3/p9_img4_img_p8_2.png",
            "options": [
              "離れた",
              "離れろ",
              "離れる"
            ],
            "answer": "b"
          },
          {
            "id": 28,
            "promptImage": "images/set3/p9_img5_img_p8_3.png",
            "options": [
              "開いていれば",
              "開いている",
              "開いていて"
            ],
            "answer": "b"
          },
          {
            "id": 29,
            "promptImage": "images/set3/p9_img6_img_p8_4.png",
            "options": [
              "逃げる",
              "逃げるな",
              "逃げない"
            ],
            "answer": "a"
          },
          {
            "id": 30,
            "promptImage": "images/set3/p9_img7_img_p8_5.png",
            "options": [
              "出られないで",
              "出られない",
              "出られなく"
            ],
            "answer": "c"
          }
        ]
      },
      {
        "id": "conv",
        "name": "Conversation & Expression",
        "nameJp": "会話と表現",
        "icon": "💬",
        "description": "Situational conversations and dialogue expressions",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set3/p10_img3_img_p9_1.png",
            "options": [
              "気おつけます",
              "助かります",
              "遠慮します"
            ],
            "answer": "a"
          },
          {
            "id": 2,
            "promptImage": "images/set3/p10_img4_img_p9_2.png",
            "options": [
              "めんどくさいです",
              "信じられないです",
              "もったいないです"
            ],
            "answer": "c"
          },
          {
            "id": 3,
            "promptImage": "images/set3/p10_img5_img_p9_3.png",
            "options": [
              "なるほど",
              "あわてて",
              "早めに"
            ],
            "answer": "c"
          },
          {
            "id": 4,
            "promptImage": "images/set3/p11_img3_img_p10_1.png",
            "options": [
              "そう",
              "ただ",
              "まず"
            ],
            "answer": "b"
          },
          {
            "id": 5,
            "promptImage": "images/set3/p11_img4_img_p10_2.png",
            "options": [
              "もう少しどうですか",
              "どの辺ですか",
              "どうされましたか"
            ],
            "answer": "c"
          }
        ]
      },
      {
        "id": "listening",
        "name": "Listening Comprehension",
        "nameJp": "聴解",
        "icon": "🎧",
        "description": "Audio-based listening questions with pictures and dialogues",
        "audioFiles": [
          {
            "mp3": "audio/set3/soal_1.mp3",
            "m4a": "audio/set3/soal_1.m4a",
            "label": "問題 1 (エアコン)"
          },
          {
            "mp3": "audio/set3/soal_2.mp3",
            "m4a": "audio/set3/soal_2.m4a",
            "label": "問題 2 (水を止める)"
          },
          {
            "mp3": "audio/set3/soal_3.mp3",
            "m4a": "audio/set3/soal_3.m4a",
            "label": "問題 3 (台風の接近)"
          },
          {
            "mp3": "audio/set3/soal_4.mp3",
            "m4a": "audio/set3/soal_4.m4a",
            "label": "問題 4 (スマホの充電)"
          },
          {
            "mp3": "audio/set3/soal_5.mp3",
            "m4a": "audio/set3/soal_5.m4a",
            "label": "問題 5 (地震の対応)"
          }
        ],
        "questions": [
          {
            "id": 1,
            "audioIndex": 0,
            "promptImage": "images/set3/p12_img3_img_p11_1.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "パソコン"
              },
              {
                "label": "b",
                "text": "エアコン"
              },
              {
                "label": "c",
                "text": "スマホ"
              }
            ],
            "answer": "b"
          },
          {
            "id": 2,
            "audioIndex": 1,
            "promptImage": "images/set3/p12_img4_img_p11_2.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "水をかえる"
              },
              {
                "label": "b",
                "text": "水を使う"
              },
              {
                "label": "c",
                "text": "水を止める"
              }
            ],
            "answer": "c"
          },
          {
            "id": 3,
            "audioIndex": 2,
            "promptImage": "images/set3/p13_img3_img_p12_1.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "台風"
              },
              {
                "label": "b",
                "text": "火災"
              },
              {
                "label": "c",
                "text": "地震"
              }
            ],
            "answer": "a"
          },
          {
            "id": 4,
            "audioIndex": 3,
            "promptImage": "images/set3/p13_img4_img_p12_2.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "パソコンの充電"
              },
              {
                "label": "b",
                "text": "スマホの充電"
              },
              {
                "label": "c",
                "text": "エアコンの充電"
              }
            ],
            "answer": "b"
          },
          {
            "id": 5,
            "audioIndex": 4,
            "promptImage": "images/set3/p14_img3_img_p13_1.png",
            "promptText": "正しい絵を選んでください。",
            "options": [
              {
                "label": "a",
                "image": "images/set3/p14_img4_img_p13_2.png",
                "text": "絵 A"
              },
              {
                "label": "b",
                "image": "images/set3/p14_img5_img_p13_3.png",
                "text": "絵 B"
              },
              {
                "label": "c",
                "image": "images/set3/p14_img6_img_p13_4.png",
                "text": "絵 C"
              }
            ],
            "answer": "c"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "模擬試験 4 — Simulasi JFT Basic 4",
    "pdfUrl": "pdf/set4.pdf",
    "sections": [
      {
        "id": "vocab",
        "name": "Script & Vocabulary",
        "nameJp": "文字と語彙",
        "icon": "📝",
        "description": "Kanji, vocabulary, and grammar practice",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set4/p1_img3_img_p0_4.png",
            "options": [
              "ホール",
              "プラネタリウム",
              "スポーツジム"
            ],
            "answer": "c"
          },
          {
            "id": 2,
            "promptImage": "images/set4/p1_img4_img_p0_5.png",
            "options": [
              "もらう",
              "返す（かえす）",
              "貸す（かす）"
            ],
            "answer": "b"
          },
          {
            "id": 3,
            "promptImage": "images/set4/p2_img3_img_p1_4.png",
            "options": [
              "トレーナー",
              "マシン",
              "シューズ"
            ],
            "answer": "c"
          },
          {
            "id": 4,
            "promptImage": "images/set4/p2_img4_img_p1_5.png",
            "options": [
              "物産コーナー（ぶっさんコーナー）",
              "ホール",
              "プラネタリウム"
            ],
            "answer": "b"
          },
          {
            "id": 5,
            "promptImage": "images/set4/p3_img3_img_p2_1.png",
            "options": [
              "預ける（あずける）",
              "受け取る（うけとる）",
              "申し込む（もうしこむ）"
            ],
            "answer": "b"
          },
          {
            "id": 6,
            "promptImage": "images/set4/p3_img4_img_p2_2.png",
            "options": [
              "両替する（りょうがえする）",
              "表示する（ひょうじする）",
              "入力する（にゅうりょくする）"
            ],
            "answer": "a"
          },
          {
            "id": 7,
            "promptImage": "images/set4/p4_img3_img_p3_1.png",
            "options": [
              "美容院（びよういん）",
              "理髪店（りはつてん）",
              "病院（びょういん）"
            ],
            "answer": "a"
          },
          {
            "id": 8,
            "promptImage": "images/set4/p4_img4_img_p3_2.png",
            "options": [
              "鏡（かがみ）",
              "バリカン",
              "洗面台（せんめんだい）"
            ],
            "answer": "a"
          },
          {
            "id": 9,
            "promptImage": "images/set4/p5_img3_img_p4_1.png",
            "options": [
              "相談（そうだん）",
              "通訳（つうやく）",
              "質問（しつもん）"
            ],
            "answer": "b"
          },
          {
            "id": 10,
            "promptImage": "images/set4/p5_img4_img_p4_2.png",
            "options": [
              "ポイントカード",
              "キャッシュカード",
              "ギフトカード"
            ],
            "answer": "b"
          },
          {
            "id": 11,
            "promptImage": "images/set4/p6_img3_img_p5_1.png",
            "options": [
              "かえし",
              "かえ",
              "かつ"
            ],
            "answer": "a"
          },
          {
            "id": 12,
            "promptImage": "images/set4/p6_img4_img_p5_2.png",
            "options": [
              "きいています",
              "あいています",
              "ひいています"
            ],
            "answer": "b"
          },
          {
            "id": 13,
            "promptImage": "images/set4/p6_img5_img_p5_3.png",
            "options": [
              "しつもん",
              "きんじょ",
              "じょうほう"
            ],
            "answer": "b"
          },
          {
            "id": 14,
            "promptImage": "images/set4/p6_img6_img_p5_4.png",
            "options": [
              "およぎます",
              "はいります",
              "あらいます"
            ],
            "answer": "c"
          },
          {
            "id": 15,
            "promptImage": "images/set4/p6_img7_img_p5_5.png",
            "options": [
              "しつもん",
              "がいこく",
              "じどう"
            ],
            "answer": "c"
          },
          {
            "id": 16,
            "promptImage": "images/set4/p7_img3_img_p6_1.png",
            "options": [
              "店",
              "町",
              "点"
            ],
            "answer": "a"
          },
          {
            "id": 17,
            "promptImage": "images/set4/p7_img4_img_p6_2.png",
            "options": [
              "不便",
              "便利",
              "有名"
            ],
            "answer": "b"
          },
          {
            "id": 18,
            "promptImage": "images/set4/p7_img5_img_p6_3.png",
            "options": [
              "右",
              "西",
              "左"
            ],
            "answer": "c"
          },
          {
            "id": 19,
            "promptImage": "images/set4/p7_img6_img_p6_4.png",
            "options": [
              "料理",
              "神社",
              "野菜"
            ],
            "answer": "b"
          },
          {
            "id": 20,
            "promptImage": "images/set4/p7_img7_img_p6_5.png",
            "options": [
              "公園",
              "会社",
              "仕事"
            ],
            "answer": "c"
          },
          {
            "id": 21,
            "promptImage": "images/set4/p8_img3_img_p7_1.png",
            "options": [
              "返してもいいです",
              "返したほうがいいです",
              "返したらいいです"
            ],
            "answer": "a"
          },
          {
            "id": 22,
            "promptImage": "images/set4/p8_img4_img_p7_2.png",
            "options": [
              "飾ってしまいます",
              "飾っています",
              "飾ってあります"
            ],
            "answer": "c"
          },
          {
            "id": 23,
            "promptImage": "images/set4/p8_img5_img_p7_3.png",
            "options": [
              "じゃなくて",
              "じゃないけど",
              "じゃないし"
            ],
            "answer": "a"
          },
          {
            "id": 24,
            "promptImage": "images/set4/p8_img6_img_p7_4.png",
            "options": [
              "建てています",
              "建てられました",
              "建てました"
            ],
            "answer": "b"
          },
          {
            "id": 25,
            "promptImage": "images/set4/p8_img7_img_p7_5.png",
            "options": [
              "行っても",
              "行くと",
              "行ったら"
            ],
            "answer": "a"
          },
          {
            "id": 26,
            "promptImage": "images/set4/p9_img3_img_p8_1.png",
            "options": [
              "用意してあります",
              "用意しています",
              "用意されています"
            ],
            "answer": "a"
          },
          {
            "id": 27,
            "promptImage": "images/set4/p9_img4_img_p8_2.png",
            "options": [
              "しか",
              "より",
              "だけ"
            ],
            "answer": "c"
          },
          {
            "id": 28,
            "promptImage": "images/set4/p9_img5_img_p8_3.png",
            "options": [
              "作れました",
              "作りました",
              "作られました"
            ],
            "answer": "c"
          },
          {
            "id": 29,
            "promptImage": "images/set4/p9_img6_img_p8_4.png",
            "options": [
              "なら",
              "しか",
              "とか"
            ],
            "answer": "a"
          },
          {
            "id": 30,
            "promptImage": "images/set4/p9_img7_img_p8_5.png",
            "options": [
              "入れれば",
              "入れたら",
              "入れでも"
            ],
            "answer": "c"
          }
        ]
      },
      {
        "id": "conv",
        "name": "Conversation & Expression",
        "nameJp": "会話と表現",
        "icon": "💬",
        "description": "Situational conversations and dialogue expressions",
        "questions": [
          {
            "id": 1,
            "promptImage": "images/set4/p10_img3_img_p9_1.png",
            "options": [
              "ちょっといいですか",
              "ついていますか",
              "お待ちですか"
            ],
            "answer": "b"
          },
          {
            "id": 2,
            "promptImage": "images/set4/p10_img4_img_p9_2.png",
            "options": [
              "これでいいですか",
              "どうしていますか",
              "しってますか"
            ],
            "answer": "a"
          },
          {
            "id": 3,
            "promptImage": "images/set4/p10_img5_img_p9_3.png",
            "options": [
              "いやになります",
              "たすかります",
              "大切にします"
            ],
            "answer": "b"
          },
          {
            "id": 4,
            "promptImage": "images/set4/p11_img3_img_p10_1.png",
            "options": [
              "知りませんでした",
              "よくわからなくて",
              "勉強になります"
            ],
            "answer": "b"
          },
          {
            "id": 5,
            "promptImage": "images/set4/p11_img4_img_p10_2.png",
            "options": [
              "どうされましたか",
              "いかがですか",
              "どうなさいますか"
            ],
            "answer": "b"
          }
        ]
      },
      {
        "id": "listening",
        "name": "Listening Comprehension",
        "nameJp": "聴解",
        "icon": "🎧",
        "description": "Audio-based listening questions with pictures and dialogues",
        "audioFiles": [
          {
            "mp3": "audio/set4/soal_1.mp3",
            "m4a": "audio/set4/soal_1.m4a",
            "label": "問題 1 (図書館の貸出期間)"
          },
          {
            "mp3": "audio/set4/soal_2.mp3",
            "m4a": "audio/set4/soal_2.m4a",
            "label": "問題 2 (利用料金)"
          },
          {
            "mp3": "audio/set4/soal_3.mp3",
            "m4a": "audio/set4/soal_3.m4a",
            "label": "問題 3 (お祭りの時間)"
          },
          {
            "mp3": "audio/set4/soal_4.mp3",
            "m4a": "audio/set4/soal_4.m4a",
            "label": "問題 4 (町の紹介)"
          },
          {
            "mp3": "audio/set4/soal_5.mp3",
            "m4a": "audio/set4/soal_5.m4a",
            "label": "問題 5 (鍋料理の具材)"
          }
        ],
        "questions": [
          {
            "id": 1,
            "audioIndex": 0,
            "promptImage": "images/set4/p12_img3_img_p11_1.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "２週間ぐらい"
              },
              {
                "label": "b",
                "text": "１週間ぐらい"
              },
              {
                "label": "c",
                "text": "3週間ぐらい"
              }
            ],
            "answer": "a"
          },
          {
            "id": 2,
            "audioIndex": 1,
            "promptImage": "images/set4/p12_img4_img_p11_2.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "10円"
              },
              {
                "label": "b",
                "text": "50円"
              },
              {
                "label": "c",
                "text": "０円"
              }
            ],
            "answer": "c"
          },
          {
            "id": 3,
            "audioIndex": 2,
            "promptImage": "images/set4/p13_img3_img_p12_1.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "昨日の夜 / 20:00 - 21:00"
              },
              {
                "label": "b",
                "text": "明日の夜 / 21:00 - 22:00"
              },
              {
                "label": "c",
                "text": "明日の夜 / 19:00 - 21:00"
              }
            ],
            "answer": "c"
          },
          {
            "id": 4,
            "audioIndex": 3,
            "promptImage": "images/set4/p13_img4_img_p12_2.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "こうげんのまち"
              },
              {
                "label": "b",
                "text": "観光地"
              },
              {
                "label": "c",
                "text": "大町"
              }
            ],
            "answer": "b"
          },
          {
            "id": 5,
            "audioIndex": 4,
            "promptImage": "images/set4/p14_img3_img_p13_1.png",
            "promptText": "音声を聞いて選んでください。",
            "options": [
              {
                "label": "a",
                "text": "肉、魚"
              },
              {
                "label": "b",
                "text": "豚肉、野菜"
              },
              {
                "label": "c",
                "text": "トーフ"
              }
            ],
            "answer": "a"
          }
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = { questionSets };
}
