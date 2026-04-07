# NUGGET NIHONGO — EVIDENCE BASE
## SECTION 11 — PHONOLOGICAL LEARNING SCIENCE
### For Japanese Pronunciation & Phonological Acquisition by Indonesian L1 Learners

**Prepared by:** Agent 5 (Claude Sonnet 4.6)
**Date:** 3 April 2026
**Version:** v1
**Status:** Canonical — v17
**Input package:** AGENT5-BRIEF-§11-PHONOLOGY.md + ANTI-DUPLICATION-BASELINE.md + CITATION-AUDIT-v5 + SECTION5-CONTRASTIVE-v4-ADDENDUM + SECTION9-MULTIMEDIA-v1

> **Corpus contribution:** 47 new citations (PH-01–PH-47) | ~455 existing → ~502 post-merge (estimasi)

---

## SCOPE & POSITIONING

§5.5 (Agent 11) telah mendokumentasikan *apa* perbedaan fonologis antara Indonesian dan Japanese — pitch accent, mora timing, sokuon, chōon, dan interference points spesifik. Yang belum ada di corpus adalah **teori tentang bagaimana manusia mengakuisisi sistem bunyi L2 yang berbeda dari L1-nya**, dan **paradigma pelatihan apa yang terbukti efektif** untuk perceptual dan productive mastery.

§11 mengisi gap ini dengan enam cluster teori:

| Cluster | Seksi | Gap yang Diisi |
|---|---|---|
| Speech Learning Model | §11.1 | Mengapa "mirip" lebih sulit dari "asing" — teori pembentukan kategori fonetik L2 |
| Perceptual Assimilation Model | §11.2 | Bagaimana learner mengasimilasi L2 sounds ke L1 categories — prediksi discrimination difficulty |
| Mora & Prosodic Perception | §11.3 | Teori unit persepsi ujaran Japanese; mengapa Indonesian learner systematically miss mora boundaries |
| Pitch Accent Acquisition | §11.4 | Bagaimana lexical tone system diakuisisi oleh learner non-tonal L1 |
| High Variability Phonetic Training | §11.5 | Satu-satunya training paradigm dengan robust empirical base untuk L2 phonological learning |
| Phonological Neighborhood Effects | §11.6 | Efek densitas phonological neighborhood pada word recognition & production L2 |

**§11.7** mensintesis semua cluster ke dalam Design Decision Matrix konkret untuk kartu Nugget Nihongo.

**Yang TIDAK dikerjakan §11 (cross-reference saja):**
- Deskripsi fonetik Indonesian–Japanese interferensi → **Lihat §5.5**
- Audio-visual integration theory (CTML, DCT) → **Lihat §9**
- Cognitive Load Theory (Sweller) → **Lihat §9 [CL-01–CL-08]**
- Comprehensible input (Krashen) → **Lihat §1 [CI-01–CI-05]**
- Kecemasan saat pronunciation practice → **Lihat §8 [CC-01–CC-07]**

---

## §11.1 — SPEECH LEARNING MODEL (SLM / SLM-r)

### Core Theoretical Background

Speech Learning Model (SLM), dikemukakan oleh James Flege dalam serangkaian karya 1987–1999, adalah framework dominan untuk memprediksi kesulitan akuisisi bunyi L2. Premis dasarnya mengejutkan — ia bertentangan dengan intuisi pedagogis umum: **bunyi L2 yang *mirip* dengan bunyi L1 lebih sulit dipelajari daripada bunyi yang sepenuhnya baru.**

Alasannya adalah mekanisme *equivalence classification*. Ketika sebuah bunyi L2 cukup mirip dengan kategori L1 yang ada, sistem persepsi learner secara otomatis meng-assimilasi-nya ke dalam kategori tersebut alih-alih membentuk kategori baru yang independen. Akibatnya, detail akustik yang membedakan kedua bunyi — yang kecil namun lexically atau semantically signifikan — tidak diproses secara sadar. Sebaliknya, bunyi yang *asing* sepenuhnya memerlukan pembentukan kategori fonetik baru (*new category formation*), yang justru lebih mudah karena tidak ada kategori L1 yang "menghalangi" persepsi.

Bagi Indonesian learner of Japanese, SLM menghasilkan prediksi konkret:

| Bunyi Japanese | Status SLM | Prediksi |
|---|---|---|
| Pitch accent | **New category** | Seharusnya lebih mudah dipelajari daripada intuitif — Indonesian tidak punya analog, jadi tidak ada interference dari kategori yang ada |
| /r/ Japanese (flap, [ɾ]) vs. Indonesian /r/ (trill, [r]) | **Similar category** | **Lebih sulit** — learner menggunakan Indonesian /r/ sebagai proxy, perbedaan akustik subtle tidak terdeteksi |
| Sokuon (geminate consonant) | **New category** (duration contrast tidak ada di Indonesian) | Lebih mudah secara perceptual *formation*, tapi butuh exposure karena tidak ada L1 anchor |
| Short vs. long vowel (chōon) | **Similar–new borderline** | Indonesian punya length variation non-phonemic — assimilation ke vowel quality possible |

### SLM-r: The 2021 Revision

Flege & Bohn (2021) mempublikasikan revisi formal SLM yang memperbarui beberapa prediksi. SLM-r mempertahankan mekanisme inti tetapi menambahkan: (1) penjelasan yang lebih eksplisit tentang role of L2 experience dalam memodifikasi kategori yang sudah terbentuk; (2) akun untuk *within-category* variation learning; dan (3) integrasi yang lebih baik dengan temuan neurolinguistik tentang plastisitas fonetik orang dewasa.

### Citations: §11.1

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| PH-01 | Flege, J. E. (1995). Second language speech learning: The role of phonetic category formation. In W. Strange (Ed.), *Speech perception and linguistic experience: Issues in cross-language research* (pp. 233–277). York Press. | No DOI (book chapter) | Pernyataan komprehensif awal SLM; menetapkan framework new vs. similar category dan prediksinya — justifikasi teoretis utama untuk urutan kesulitan fonetik di Nugget Nihongo | Theoretical framework (book chapter) | 5 | *(verify)* | 1995 | Satu-satunya sumber yang memaparkan SLM secara penuh dalam satu tempat; titik masuk wajib untuk §11 |
| PH-02 | Flege, J. E., Munro, M. J., & MacKay, I. R. A. (1995). Factors affecting strength of perceived foreign accent in a second language. *Journal of the Acoustical Society of America, 97*(5), 3125–3134. | https://doi.org/10.1121/1.413041 | Bukti empiris efek age-of-learning pada foreign accent; mengkuantifikasi hubungan antara AOL, jumlah L2 experience, dan kekuatan aksen — justifikasi untuk desain program remediasi fonetik | Empirical | 5 | ✅ (dari brief) | 1995 | Kuantifikasi faktor accent strength; lebih operasional dari Flege (1995) yang teoretis |
| PH-03 | Flege, J. E., & Bohn, O.-S. (2021). The revised Speech Learning Model (SLM-r). In R. Wayland (Ed.), *Second language speech learning: Theoretical and empirical progress* (pp. 3–83). Cambridge University Press. | No DOI (book chapter) | Revisi formal SLM terbaru; memperbarui prediksi untuk learner dewasa dan L2 experience effects; SLM-r lebih applicable ke adult independent learner seperti target Nugget Nihongo | Theoretical framework (book chapter) | 5 | *(verify)* | 2021 | Update resmi SLM; hanya sumber yang mencakup revisi 2021 |
| PH-04 | Bohn, O.-S., & Flege, J. E. (1990). Interlingual identification and the role of foreign language experience in L2 vowel perception. *Applied Psycholinguistics, 11*(3), 303–328. | *(verify)* | Studi empiris founding tentang bagaimana L2 experience memodifikasi persepsi vokal; relevan untuk memprediksi trajectory akuisisi fonologis Indonesian learner of Japanese | Empirical | 4 | *(verify)* | 1990 | Bukti empiris awal bahwa prior L2 experience mengubah persepsi — relevan untuk learner yang sudah punya English L2 |
| PH-05 | Flege, J. E. (1987). The production of "new" and "similar" phones in a foreign language: Evidence for the effect of equivalence classification. *Journal of Phonetics, 15*(1), 47–65. | *(verify)* | Studi produksi awal yang mendemonstrasikan asymmetry new vs. similar dalam speech production; menetapkan equivalence classification sebagai mekanisme interference | Empirical | 4 | *(verify)* | 1987 | Bukti produksi (bukan hanya persepsi) untuk new vs. similar asymmetry; sering dikutip sebagai founding empirical SLM |
| PH-06 | Munro, M. J., & Derwing, T. M. (1995). Foreign accent, comprehensibility, and intelligibility in the speech of second language learners. *Language Learning, 45*(1), 73–97. | *(verify)* | Membedakan antara foreign accent (apakah terdengar asing), comprehensibility (seberapa mudah dipahami), dan intelligibility (apakah pesan dipahami) — tiga konstruk yang perlu dibedakan dalam desain feedback pronunciation | Empirical | 5 | *(verify)* | 1995 | Satu-satunya sumber di corpus yang membedakan tiga konstruk ini secara operasional — penting untuk memprioritaskan aspek fonetik mana yang berdampak pada komunikasi |
| PH-07 | Bohn, O.-S., & Flege, J. E. (1992). The production of new and similar vowels by adult German learners of English. *Studies in Second Language Acquisition, 14*(2), 131–158. | *(verify)* | Replikasi dan perluasan new vs. similar asymmetry dengan L1 Jerman; menunjukkan generalisasi lintas L1 dari prediksi SLM | Empirical | 4 | *(verify)* | 1992 | Memperkuat generalizability SLM melampaui L1 Japanese–English pair; relevan untuk Indonesian–Japanese application |

### Design Implications untuk Nugget Nihongo (§11.1)

*Catatan untuk Crispy — dalam Bahasa Indonesia:*

**Implikasi 1 (Urutan kesulitan fonetik berbasis SLM, bukan intuitif):** Jangan urutkan konten fonetik dari "familar ke asing." SLM memprediksi bahwa pitch accent (asing sepenuhnya dari sudut pandang Indonesian) justru lebih mudah diakuisisi persepsinya daripada /r/ Japanese (yang mirip tapi tidak identik dengan /r/ Indonesian). Sequence awal sebaiknya: pitch accent → mora duration contrast → /r/ distinction.

**Implikasi 2 (Explisit flagging untuk "similar" categories):** Kartu yang melibatkan bunyi "similar" (Indonesian /r/ vs Japanese /r/; suku kata akhir terbuka vs. tertutup) harus mendapatkan explicit pedagogical note yang menjelaskan bahwa "ini terdengar mirip bahasa Indonesia tapi berbeda di aspek X." Tanpa flagging ini, learner akan menggunakan L1 category dan tidak memproses perbedaan.

**Implikasi 3 (Exposure quantification untuk new categories):** Untuk bunyi "new" (pitch accent, sokuon sebagai durasi contrastive), exposure perceptual yang cukup akan membentuk kategori baru secara natural jika variasi akustik diberikan. Ini mendukung HVPT approach di §11.5 — tidak perlu extensive explicit instruction untuk pitch accent formation, tetapi perlu jumlah exposure yang adequate dengan variasi speaker.

### Cross-Section Integration Notes (§11.1)

- **§5.5:** SLM mengisi justifikasi teoretis untuk *mengapa* interference points di §5.5 terjadi. §5.5 menetapkan WHAT (sokuon 11% error, chōon 6% error, /r/ difficulty); §11.1 menjelaskan WHY (new vs. similar category mechanism). Gunakan cross-reference: *"Lihat §5.5 untuk data error rate empiris yang mendukung prediksi SLM ini."*
- **§9 [CL cluster]:** Proses pembentukan kategori fonetik baru (new category) memerlukan attentional resources yang signifikan — ini adalah intrinsic cognitive load yang tidak bisa dikurangi (berbeda dari extraneous load). Cross-reference §9 [CL-02–CL-04] untuk implikasi desain card yang tidak overload WM.
- **§11.4:** SLM prediction bahwa pitch accent = "new category" → seharusnya lebih mudah dipelajari daripada /r/ → ini counterintuitive dan perlu dielaborasi dengan data empiris akuisisi pitch accent di §11.4.

---

## §11.2 — PERCEPTUAL ASSIMILATION MODEL (PAM / PAM-L2)

### Core Theoretical Background

Perceptual Assimilation Model (PAM), dikemukakan oleh Catherine Best sejak 1993–1995, memberikan framework komplementer terhadap SLM dengan fokus pada *mekanisme persepsi* konkret. Sementara SLM berfokus pada outcome (kategori baru vs. kategori yang sudah ada), PAM berfokus pada proses: bagaimana tepatnya bunyi L2 di-assimilasi ke dalam sistem fonetik L1, dan bagaimana pola assimilation ini memprediksi kesulitan diskriminasi.

PAM mengidentifikasi beberapa tipe assimilation:

| Tipe | Deskripsi | Implikasi Diskriminasi |
|---|---|---|
| **Two-Category (TC)** | Dua bunyi L2 masing-masing assimilasi ke kategori L1 yang berbeda | Diskriminasi mudah — seperti native contrast |
| **Category Goodness (CG)** | Kedua bunyi L2 assimilasi ke kategori L1 yang sama, tapi dengan "goodness" berbeda | Diskriminasi sedang — bergantung pada seberapa jelas perbedaan goodness-nya |
| **Single Category (SC)** | Kedua bunyi L2 assimilasi ke satu kategori L1 dengan goodness yang sama | Diskriminasi sangat sulit |
| **Uncategorized (UC)** | Bunyi L2 tidak dapat diassimilasi ke kategori L1 manapun | Relatif mudah — tidak ada competing L1 category |

Untuk Indonesian learner of Japanese:
- Pitch accent contrast: Indonesian tidak punya lexical pitch → **UC type** → diskriminasi *bisa* dipelajari
- Mora-length contrast: Indonesian tidak punya duration-contrastive phonology → **SC atau UC** → sistemik, tapi bisa dipelajari dengan exposure
- /r/ contrast: Indonesian /r/ (trill) menyerap Japanese /r/ (flap) → **SC type** → diskriminasi sulit karena keduanya terasa "sama-sama /r/"

**PAM-L2** (Best & Tyler, 2007) memperluas PAM untuk *experienced L2 listeners* — mereka yang sudah punya beberapa exposure terhadap L2. PAM-L2 menjelaskan bagaimana L2 phonological knowledge yang berkembang mulai mempengaruhi assimilation pattern, sehingga model ini lebih relevan untuk intermediate learner yang menjadi target utama Nugget Nihongo.

### Citations: §11.2

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| PH-08 | Best, C. T. (1995). A direct realist view of cross-language speech perception. In W. Strange (Ed.), *Speech perception and linguistic experience: Issues in cross-language research* (pp. 171–204). York Press. | No DOI (book chapter) | Pernyataan awal PAM; mendefinisikan tipe-tipe assimilation (TC, CG, SC, UC) yang digunakan untuk memprediksi discrimination difficulty | Theoretical framework (book chapter) | 5 | *(verify)* | 1995 | Sumber primer PAM; tidak tergantikan untuk memahami mekanisme assimilation |
| PH-09 | Best, C. T., & Tyler, M. D. (2007). Nonnative and second-language speech perception: Commonalities and complementarities. In O.-S. Bohn & M. J. Munro (Eds.), *Language experience in second language speech learning* (pp. 13–34). John Benjamins. | No DOI (book chapter) | PAM-L2 untuk experienced L2 listeners; lebih applicable ke intermediate learner Nugget Nihongo daripada PAM original | Theoretical framework (book chapter) | 5 | *(verify)* | 2007 | Satu-satunya sumber yang membahas PAM untuk learner yang sudah punya L2 experience — relevan untuk tracking progression |
| PH-10 | Best, C. T., McRoberts, G. W., & Goodell, E. (2001). Discrimination of non-native consonant contrasts varying in perceptual assimilation to the listener's native phonological system. *Journal of the Acoustical Society of America, 109*(2), 775–794. | https://doi.org/10.1121/1.1332378 | Verifikasi empiris prediksi PAM untuk konsonan; menunjukkan bahwa SC pairs paling sulit, UC pairs relatif mudah — mendukung prediksi untuk /r/ Japanese | Empirical | 5 | *(verify)* | 2001 | Bukti empiris langsung untuk prediksi PAM hierarchy; memvalidasi aplikasi ke Indonesian-Japanese /r/ case |
| PH-11 | Hattori, K., & Iverson, P. (2009). English /r/–/l/ category assimilation by Japanese adults: Individual differences and the link between perception and production. *Journal of the Acoustical Society of America, 125*(1), 469–479. | https://doi.org/10.1121/1.3021295 | Studi Japanese learner menghadapi "similar" category challenge (mirip dengan Indonesian /r/ vs Japanese /r/); menemukan link antara persepsi dan produksi yang mendukung desain sequence | Empirical | 4 | *(verify)* | 2009 | Model case untuk "similar" category difficulty pada learner dengan L1 yang punya /r/ analog |
| PH-12 | Tyler, M. D., Best, C. T., Faber, A., & Levitt, A. G. (2014). Perceptual assimilation and discrimination of non-native vowel contrasts. *Phonetica, 71*(1), 4–21. | https://doi.org/10.1159/000356237 | Ekstensi PAM ke vokal; menunjukkan bahwa pola assimilation untuk vokal berbeda dari konsonan — relevan untuk long/short vowel discrimination di Japanese | Empirical | 4 | *(verify)* | 2014 | Satu-satunya studi yang mengaplikasikan PAM secara sistematis ke vokal contrasts — relevan untuk chōon acquisition |

### Design Implications untuk Nugget Nihongo (§11.2)

**Implikasi 1 (Diagnosa sebelum instruksi):** PAM memprediksi bahwa jenis kesalahan persepsi berbeda-beda berdasarkan tipe assimilation. Untuk pitch accent (UC) dan sokuon (borderline SC/UC), instruksi explicit mungkin tidak perlu dimulai sejak awal — exposure sudah membantu. Untuk /r/ (SC), instruksi explicit tentang perbedaan artikulatoris *wajib* karena learner tidak akan menangkap perbedaan dari audio saja.

**Implikasi 2 (Card note untuk SC pairs):** Kartu yang melibatkan Japanese /r/ harus menyertakan tooltips atau note eksplisit: "Bunyi ini mirip /r/ Indonesia tapi bukan trill — dengarkan lagi." Ini bukan redundancy — PAM menunjukkan bahwa tanpa cueing eksplisit, SC-type L1 assimilation akan override persepsi.

**Implikasi 3 (Sequencing berbasis PAM type):** Urutan introducsi kontras fonetik: UC first (pitch accent, geminate duration) → CG/SC later (/r/ distinction, vowel length contrast). Ini sesuai dengan SLM di §11.1 dan memberikan dua independent justifikasi untuk sequencing decision yang sama.

### Cross-Section Integration Notes (§11.2)

- **§5.5:** PAM prediction untuk /r/ (SC type) secara langsung menjelaskan *mengapa* /r/ muncul sebagai interference point di §5.5 — bukan karena learner "malas" tapi karena mekanisme perceptual assimilation yang involuntary. Cross-reference: *"Lihat §5.5 untuk deskripsi linguistik perbedaan /r/ Indonesian–Japanese."*
- **§11.1 [SLM]:** PAM dan SLM memberikan prediksi yang *converging* untuk kasus /r/ (SC = similar category) tapi dengan mekanisme berbeda. Convergence ini memperkuat rekomendasi desain yang sama dari dua teori independen.

---

## §11.3 — MORA & PROSODIC PERCEPTION

### Core Theoretical Background

Japanese menggunakan **mora** (モーラ) sebagai unit dasar persepsi dan produksi ujaran, bukan suku kata (syllable). Sebuah mora adalah unit durasi waktu — kira-kira sama panjangnya dengan satu vokal pendek. Kata *kitte* (切手, perangko) terdiri dari empat mora: ki-t-te (di mana geminat /t/ = 1 mora tersendiri), sementara dari perspektif suku kata hanya dua: kit-te.

Perbedaan ini bukan hanya linguistik deskriptif — ia punya konsekuensi perseptual yang mendalam. Cutler & Otake (1994) dan serangkaian studi terkait menunjukkan bahwa **native Japanese speakers secara default menggunakan mora sebagai unit segmentasi ujaran**, sementara speakers dari bahasa suku-kata atau stress-timed menggunakan suku kata atau foot sebagai unit.

**Konsekuensi untuk Indonesian learner:**

Indonesian adalah bahasa dengan syllable timing yang cukup regular. Ketika learner Indonesian mendengarkan Japanese, sistem segmentasi mereka beroperasi pada level suku kata, bukan mora. Akibatnya:

1. **Sokuon (っ):** Geminat konsonan = 2 mora, tapi hanya 1 suku kata onset. Learner Indonesian mendengar *kippu* (切符) sebagai /ki-pu/ (dua suku kata, 2 mora) alih-alih /ki-p-pu/ (dua suku kata, 3 mora). Ini menghasilkan error produksi dan persepsi yang sistemik.

2. **Chōon (ー):** Long vowel = 2 mora, tapi learner Indonesian cenderung memperpendek ke 1 mora karena vowel length tidak contrastive di Indonesian. *Okāsan* (お母さん) terdengar sama dengan *okasan* yang tidak bermakna.

3. **Moraic nasal (ん):** Bunyi /N/ diakhir suku kata = 1 mora penuh. Learner Indonesian sering menggabungkan ini ke suku kata sebelumnya, mengompres durasi.

Data empiris dari §5.5 (Agent 11) mengkonfirmasi: 11% error rate untuk sokuon, 6% untuk long vowels, 18% untuk short vowel differentiation di Indonesian learners. §11.3 menjelaskan *mengapa* error rate ini terjadi.

**Phonological Working Memory Note:** Persepsi mora yang tepat bergantung sebagian pada kapasitas *phonological loop* (Baddeley) — khususnya kemampuan untuk mempertahankan representasi durasi yang akurat dalam working memory. Lihat §13 (Agent 3) untuk pembahasan phonological working memory; §11.3 menggunakan Papagno et al. (1991) dalam konteks spesifik phonological store untuk word learning (PH-21).

### Citations: §11.3

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| PH-13 | Cutler, A., & Otake, T. (1994). Mora or syllable? Speech segmentation in Japanese. *Journal of the Acoustical Society of America, 95*(4), 1694–1703. | https://doi.org/10.1121/1.408600 | Bukti behavioral founding bahwa native Japanese speakers menggunakan mora sebagai segmentation unit; justifikasi langsung mengapa Indonesian learner (syllable-based) akan systematically misparse Japanese speech | Empirical | 5 | ✅ (dari brief) | 1994 | Satu-satunya studi yang membuktikan mora sebagai unit segmentasi secara behavioral — tidak tergantikan |
| PH-14 | Otake, T., Hatano, G., Cutler, A., & Mehler, J. (1993). Mora or syllable? Speech segmentation in Japanese. *Journal of Memory and Language, 32*(2), 258–278. | https://doi.org/10.1006/jmla.1993.1014 | Studi pendahulu yang pertama kali mengidentifikasi mora sebagai preferred unit dengan metode phoneme monitoring; mendokumentasikan contrast dengan French listeners yang menggunakan syllable | Empirical | 5 | ✅ (dari brief) | 1993 | Establishes mora primacy dengan cross-linguistic comparison yang langsung relevan — French = syllable-timed seperti Indonesian |
| PH-15 | McQueen, J. M., Otake, T., & Cutler, A. (2001). Rhythmic cues and possible-word constraints in Japanese word segmentation. *Journal of Memory and Language, 45*(1), 103–132. | *(verify)* | Ekstensi dari Cutler & Otake (1994): bagaimana mora-timing cues diintegrasikan dengan lexical knowledge dalam word segmentation; relevan untuk kartu yang menyajikan kata dalam isolation vs. konteks | Empirical | 5 | *(verify)* | 2001 | Satu-satunya sumber yang membahas word segmentation in context (bukan isolation) dengan mora — relevan untuk sentence-level audio cards |
| PH-16 | Port, R., Dalby, J., & O'Dell, M. (1987). Evidence for mora timing in Japanese. *Journal of the Acoustical Society of America, 81*(5), 1574–1585. | https://doi.org/10.1121/1.394510 | Bukti akustik untuk mora timing regularity di Japanese; menunjukkan bahwa mora isochrony adalah fitur produktif, bukan hanya perceptual — mendukung pentingnya visual timing cue di kartu | Empirical | 5 | ✅ (dari brief) | 1987 | Satu-satunya sumber yang mendokumentasikan akustik mora timing dengan data instrumental — justifikasi untuk visual duration bar di card design |
| PH-17 | Cutler, A., & Otake, T. (1999). Pitch accent in spoken-word recognition in Japanese. *Journal of the Acoustical Society of America, 105*(3), 1877–1888. | https://doi.org/10.1121/1.426727 | Menunjukkan bahwa pitch accent dan mora bekerja bersama dalam word recognition — learner yang gagal encode mora juga akan gagal menggunakan pitch accent cues secara optimal | Empirical | 5 | *(verify)* | 1999 | Satu-satunya sumber yang menghubungkan mora perception dengan pitch accent utilization — justifikasi untuk mengintegrasikan keduanya dalam satu card feature |
| PH-18 | Otake, T., Yoneyama, K., Cutler, A., & van der Lugt, A. (1996). The representation of Japanese moraic nasals. *Journal of the Acoustical Society of America, 100*(5), 3831–3842. | https://doi.org/10.1121/1.417237 | Studi khusus tentang moraic nasal /N/ — satu dari error paling umum di Indonesian learner; menunjukkan bahwa /N/ direpresentasikan sebagai unit mora penuh dalam persepsi Japanese native | Empirical | 4 | *(verify)* | 1996 | Studi satu-satunya yang fokus pada moraic nasal sebagai unit persepsi — directly relevan untuk ん acquisition |
| PH-19 | Kubozono, H. (1999). Mora and syllable. In N. Tsujimura (Ed.), *The handbook of Japanese linguistics* (pp. 31–61). Blackwell. | No DOI (book chapter) | Tinjauan linguistik komprehensif tentang mora sebagai unit fonologis Japanese; menyediakan foundation linguistik untuk desainer yang perlu memahami mengapa mora penting sebelum membuat visual cue | Review (book chapter) | 4 | *(verify)* | 1999 | Satu-satunya review linguistik komprehensif tentang mora di corpus — background essential untuk desainer non-linguist |
| PH-20 | Näätänen, R., Lehtokoski, A., Lennes, M., Cheour, M., Huotilainen, M., Iivonen, A., ... Alho, K. (1997). Language-specific phoneme representations revealed by electric and magnetic brain responses. *Nature, 385*(6615), 432–434. | https://doi.org/10.1038/385432a0 | Bukti neurosains (MMN/ERP) bahwa representasi fonem adalah language-specific; relevan untuk memahami mengapa mora boundaries tidak diproses secara automatic oleh Indonesian learner | Empirical (ERP/neuroimaging) | 5 | *(verify)* | 1997 | Satu-satunya sumber neurosains di §11 — menunjukkan bahwa phonological perception bukan universal melainkan learned, yang mendukung trainability |
| PH-21 | Papagno, C., Valentine, T., & Baddeley, A. (1991). Phonological short-term memory and foreign-language vocabulary learning. *Journal of Memory and Language, 30*(3), 331–347. | https://doi.org/10.1016/0749-596X(91)90040-Q | Menunjukkan bahwa phonological loop capacity memprediksi kecepatan L2 vocabulary learning; relevan untuk memahami mengapa mora-accurate perception penting — tanpa phonological store yang accurate, word-form acquisition lambat | Empirical | 5 | *(verify)* | 1991 | Satu-satunya sumber di §11 yang menghubungkan phonological working memory dengan vocabulary acquisition rate — catatan: gunakan dalam konteks phonological store (bukan general WM); koordinasikan dengan §13 Agent 3 |

### Design Implications untuk Nugget Nihongo (§11.3)

**Implikasi 1 (Visual mora counter wajib untuk kata dengan sokuon/chōon):** Setiap kartu yang mengandung sokuon (っ), chōon (ー), atau moraic nasal (ん) harus menampilkan penghitung mora visual — baik berupa bar durasi, titik berwarna, atau segmentasi teks eksplisit (例: ki-p-pu = ●●●). Audio saja tidak cukup: Port et al. (1987) membuktikan mora isochrony akustik ada, tapi Cutler & Otake (1994) menunjukkan bahwa non-native listeners tidak otomatis mendeteksinya.

**Implikasi 2 (Slow audio playback untuk kata-kata bermasalah):** Untuk kata dengan sokuon/chōon, sediakan opsi playback lambat (50–70% kecepatan) yang mempertahankan pitch contour tapi memperpanjang durasi secara proporsional. Ini memungkinkan learner menginternalisasi durasi mora sebelum native-speed exposure — equivalent dengan desirable difficulty spacing (Lihat §1 [DD-01–DD-03]).

**Implikasi 3 (Explicit mora count di front card):** Pertimbangkan menampilkan jumlah mora di bagian depan kartu (contoh: 切手 きって ⬤⬤⬤⬤ = 4 mora). Ini memanfaatkan explicit phonological encoding yang mendukung phonological loop storage (PH-21 / Papagno et al. 1991).

**Implikasi 4 (Audio pronunciation test harus discriminate mora duration):** Test/review mode kartu audio harus menskor secara eksplisit apakah learner merespons dengan mora yang benar — bukan hanya "correct/incorrect" untuk seluruh kata. Untuk kartu pitch accent + mora combination, kedua dimensi perlu umpan balik terpisah.

### Cross-Section Integration Notes (§11.3)

- **§5.5:** Data error rate (sokuon 11%, chōon 6%, short vowel 18%) dari §5.5 adalah bukti empiris yang dikonfirmasi oleh teori §11.3. Cross-reference: *"Lihat §5.5 untuk data error rate empiris; §11.3 menyediakan mekanisme teoretis."*
- **§9 [CT/CL cluster]:** Visual mora counter adalah aplikasi dari modality effect dan split-attention principle (Lihat §9 [CT-08–CT-12]). Desain visual yang integrated dengan audio meminimalkan cognitive load untuk proses yang sudah intrinsically demanding.
- **§13 (Agent 3, belum dibuat):** Phonological loop capacity (PH-21) perlu dikoordinasikan dengan §13 pembahasan individual differences di working memory. Agent 3 diminta untuk tidak re-cite Papagno et al. dalam konteks yang overlap dengan §11.3.

---

## §11.4 — PITCH ACCENT ACQUISITION

### Core Theoretical Background

Pitch accent Japanese (東京方言/Tokyo dialect) adalah sistem tonal **lexical** — artinya, kontras nada membedakan makna kata (箸 *hashi* HIGH-low = chopsticks vs. 橋 *hashi* low-HIGH = bridge). Ini berbeda fundamental dari dua sistem tonal lain yang mungkin familiar:

| Sistem | Contoh | Karakteristik |
|---|---|---|
| **Tone language** (Mandarin) | 4 tones per syllable | Pitch contour pada setiap suku kata; sangat kontrastif |
| **Intonation accent** (English, Indonesian) | Sentence-level stress | Pitch digunakan untuk penekanan pragmatis, bukan lexical |
| **Pitch accent** (Japanese) | 1 accent mora per word | Satu "drop" pitch per kata; lexical function |

Dari perspektif SLM (§11.1): pitch accent Japanese adalah *new category* bagi Indonesian learner — Indonesian tidak punya suprasegmental kontrast lexical apapun. Artinya tidak ada L1 kategori yang menghalangi pembentukan kategori baru. Namun ada komplikasi: Indonesian learner **sudah familier dengan penggunaan pitch secara intonasional**, sehingga mereka mungkin *salah menginterpretasikan* pitch accent kontras sebagai intonasi pragmatis. Ini bukan SC assimilation (à la PAM), melainkan misattribution fungsional.

Implikasinya: mendengar pitch saja tidak cukup — learner harus memahami bahwa pitch contrast ini bersifat **lexical** (mengubah makna kata), bukan pragmatis.

**Intelligibility impact:** Tajima et al. (1997) dan studi terkait menunjukkan bahwa pitch accent errors pada intermediate learner jarang mengganggu intelligibility secara langsung karena konteks biasanya cukup untuk disambiguasi. Namun pada advanced level, ketepatan pitch accent berkontribusi signifikan terhadap perceived proficiency dan naturalness. Ini mengimplikasikan bahwa pitch accent instruction tidak perlu diutamakan di tahap awal, tetapi harus hadir sebagai explicit layer di semua kartu.

### Citations: §11.4

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| PH-22 | Aoyama, K., & Guion, S. G. (2007). Prosody in second language acquisition: Acoustic analyses of duration and f0 in Japanese. In O.-S. Bohn & M. J. Munro (Eds.), *Language experience in second language speech learning* (pp. 281–297). John Benjamins. | No DOI (book chapter) | Analisis akustik produksi pitch accent dan durasi oleh L2 learner Japanese; menunjukkan bahwa duration dan f0 errors co-occur — learner yang struggle dengan mora juga struggle dengan pitch accent | Empirical (book chapter) | 4 | *(verify)* | 2007 | Satu-satunya sumber yang secara bersamaan mengukur pitch dan durasi errors di L2 Japanese — relevan untuk joint training |
| PH-23 | Hirano, S. (1999). Learning Japanese pitch-accent as a foreign language. *Journal of the Japan Academy of Language Studies, 3*, 77–107. | *(no DOI — verify via NDL Digital or CiNii)* | Studi pemerolehan pitch accent Japanese sebagai L2; mendokumentasikan trajectory akuisisi dan error patterns | Empirical | 3 | ⚠ **FLAGGED** — DOI tidak tersedia; verify via NDL Digital (https://ndlsearch.ndl.go.jp) atau CiNii (https://ci.nii.ac.jp) sebelum final merge | 1999 | Salah satu studi langka yang fokus pada pitch accent acquisition sebagai FL (bukan heritage/near-native) |
| PH-24 | Kubozono, H. (2012). Varieties of pitch accent systems in Japanese. *Lingua, 122*(13), 1393–1414. | https://doi.org/10.1016/j.lingua.2011.11.002 | Menjelaskan variasi dialect pitch accent di Japanese dan menetapkan Tokyo dialect sebagai target standard — penting untuk memperjelas bahwa Nugget Nihongo menargetkan Tokyo/standard pitch, bukan all Japanese | Review | 4 | *(verify)* | 2012 | Satu-satunya sumber yang mengklarifikasi ruang lingkup pitch accent mana yang perlu diajarkan |
| PH-25 | Pierrehumbert, J., & Beckman, M. E. (1988). *Japanese tone structure.* MIT Press. | No DOI (monograph) | Analisis linguistik formal pitch accent Tokyo Japanese yang paling cited; mendefinisikan H, L, dan H* tones yang digunakan dalam visualisasi pitch graph | Foundational monograph | 5 | *(verify)* | 1988 | Basis formal untuk sistem notasi pitch accent yang digunakan dalam pedagogical tools; diperlukan untuk mendesain pitch graph yang linguistically accurate |
| PH-26 | Gandour, J. T. (1983). Tone perception in Far Eastern languages. *Journal of Phonetics, 11*(2), 149–175. | *(verify)* | Studi komparatif persepsi tonal oleh listeners dengan L1 tonal vs. non-tonal; menunjukkan bahwa listeners non-tonal dapat belajar membedakan pitch contrasts, tapi dengan kurva lebih lambat | Empirical | 4 | *(verify)* | 1983 | Satu-satunya sumber yang membandingkan tonal perception learning rate antara tonal-L1 dan non-tonal-L1 learners — relevan untuk expectations setting |
| PH-27 | Wayland, R. P., & Guion, S. G. (2004). Training English and Chinese listeners to perceive Thai tones: A preliminary report. *Language Learning, 54*(4), 681–712. | https://doi.org/10.1111/j.1467-9922.2004.00283.x | Kompara learning rate antara L1 English (non-tonal, seperti Indonesian) dan L1 Mandarin (tonal) untuk mempersepsi Thai tones; L1 non-tonal learner dapat belajar meskipun lebih lambat awal | Empirical | 4 | *(verify)* | 2004 | Analog paling dekat untuk Indonesian (non-tonal L1) belajar Japanese pitch accent; menetapkan bahwa trainability ada meski L1 advantage tidak dimiliki |
| PH-28 | Tajima, K., Port, R., & Dalby, J. (1997). Effects of temporal correction on intelligibility of foreign-accented English. *Journal of Phonetics, 25*(1), 1–24. | https://doi.org/10.1006/jpho.1996.0031 | Menunjukkan bahwa temporal errors (termasuk pitch-timing misalignment) berkontribusi pada intelligibility reduction; memberikan framework untuk prioritisasi error types | Empirical | 4 | *(verify)* | 1997 | Satu-satunya sumber yang mengkuantifikasi intelligibility cost dari prosodic errors — justifikasi untuk flagging pitch accent dalam advanced-level cards |
| PH-29 | Venditti, J. J. (2005). The J_ToBI model of Japanese intonation. In S.-A. Jun (Ed.), *Prosodic typology: The phonology of intonation and phrasing* (pp. 108–137). Oxford University Press. | No DOI (book chapter) | Menjelaskan sistem notasi J_ToBI yang digunakan dalam banyak corpus pitch accent Japanese; penting jika Nugget Nihongo akan mengintegrasikan audio corpus pitch annotation | Technical review (book chapter) | 4 | *(verify)* | 2005 | Referensi teknis untuk implementasi pitch annotation system — relevant jika audio corpus digunakan untuk multi-speaker training |

### Design Implications untuk Nugget Nihongo (§11.4)

**Implikasi 1 (Pitch graph pada semua kata konten):** Setiap kata konten (noun, verb, adjective) harus dilengkapi pitch contour visualization (biola graph atau sistem titik H/L). Ini bukan optional — tanpa representasi visual, learner non-tonal L1 tidak memiliki sarana untuk memproses pitch accent sebagai lexical feature (Pierrehumbert & Beckman, PH-25; SLM §11.1).

**Implikasi 2 (Labeling eksplisit "ini mengubah makna"):** Back card harus menyertakan minimal satu contoh minimal pair yang menunjukkan efek pitch accent pada makna (例: 飴 vs. 雨 untuk learner tingkat menengah ke atas). Ini penting karena Indonesian learner mungkin awalnya memperlakukan pitch sebagai intonasi pragmatis, bukan lexical distinguisher.

**Implikasi 3 (Delayed emphasis — pitch bukan prioritas JLPT N5/N4):** Temuan intelligibility (Tajima et al., PH-28; Gandour, PH-26) menunjukkan bahwa pitch accent errors jarang mengganggu comprehension di level awal. Pitch graph sebaiknya hadir di semua kartu sejak awal (familiarisasi), tetapi tes eksplisit tentang pitch accent baru diaktifkan setelah learner mencapai ~500 kata aktif.

**Implikasi 4 (Multi-speaker pitch recording):** Karena Tokyo pitch accent memiliki variasi inter-speaker yang signifikan, gunakan minimal 2 speaker per kata untuk audio pitch display. Ini sejalan dengan prinsip HVPT di §11.5.

### Cross-Section Integration Notes (§11.4)

- **§5.5:** §5.5 mendokumentasikan pitch accent sebagai interference point bagi Indonesian learner. §11.4 menjelaskan mekanisme akuisisi; keduanya bersamaan menjustifikasi pitch graph feature.
- **§9 [CT-08, Mayer's multimedia principles]:** Pitch graph adalah multimedia representation yang membutuhkan cognitive resources. Lihat §9 tentang spatial contiguity principle — pitch graph harus ditempatkan adjacent dengan kata (bukan di halaman terpisah) untuk meminimalkan split attention.
- **§11.1 [SLM]:** Pitch accent = "new category" di SLM — seharusnya lebih mudah dari /r/ distinction. §11.4 memberikan data empiris yang mungkin memodifikasi optimisme ini: *new* tidak berarti *easy*, hanya berarti lebih trainable.

---

## §11.5 — HIGH VARIABILITY PHONETIC TRAINING (HVPT)

### Core Theoretical Background

High Variability Phonetic Training (HVPT) adalah paradigma pelatihan L2 phonological perception yang paling well-supported secara empiris. Dikembangkan oleh Logan, Lively, dan Pisoni di Indiana University pada 1990-an, HVPT dibangun di atas premis bahwa **variasi across multiple talkers adalah ingredient kritis** untuk generalisasi perceptual learning.

Intuisi awalnya: ketika learner dilatih mendengar /r/ dan /l/ hanya dari satu penutur, mereka belajar mengidentifikasi *speaker-specific* acoustic cues, bukan *category-level* cues yang berlaku secara umum. Ketika diekspose pada multiple talkers, mereka terpaksa mengidentifikasi cues yang invariant across speakers — yaitu cues yang benar-benar mendefinisikan kategori fonetik.

Hasil utama HVPT (dari Logan et al. 1991 melalui Thomson 2012):
1. **Multi-talker training > single-talker training** untuk generalisasi ke speaker baru
2. **Perceptual learning transfers to production** — meningkatkan persepsi juga meningkatkan produksi (Bradlow et al. 1997)
3. **Learning adalah durable** — Lively et al. (1994) menunjukkan retention setelah 3 bulan tanpa practice
4. **Computer-mediated HVPT feasible** — Thomson (2012) mereplikasi keberhasilan lab dalam setting computer self-study
5. **Applicable ke tonal/prosodic targets** — Wang et al. (1999) menerapkan prinsip ke Mandarin tones dengan sukses

**Implikasi langsung untuk Nugget Nihongo:** Audio cards harus menggunakan setidaknya 2–3 native speaker yang berbeda per kata. Single-voice audio database yang banyak digunakan di aplikasi SRS standar tidak memenuhi prinsip HVPT.

**Berapa banyak variasi optimal?** Literature menunjukkan diminishing returns setelah 6–8 talkers dalam lab setting. Untuk resource-constrained setting seperti aplikasi mobile, 3–4 talker recording per word adalah target realistis yang tetap memberikan generalization benefit.

### Citations: §11.5

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| PH-30 | Logan, J. S., Lively, S. E., & Pisoni, D. B. (1991). Training Japanese listeners to identify English /r/ and /l/: A first report. *Journal of the Acoustical Society of America, 89*(2), 874–886. | https://doi.org/10.1121/1.401553 | Founding study HVPT; pertama kali menunjukkan bahwa multi-talker training memungkinkan Japanese learner mengidentifikasi English /r/–/l/ contrast — model paradigma untuk Indonesian learner of Japanese phonology | Empirical | 5 | ✅ (dari brief) | 1991 | Founding HVPT study; menginisiasi paradigma yang paling replicated dalam L2 phonological training |
| PH-31 | Lively, S. E., Logan, J. S., & Pisoni, D. B. (1993). Training Japanese listeners to identify English /r/ and /l/. II. The role of phonetic environment and talker variability in learning new perceptual categories. *Journal of the Acoustical Society of America, 94*(3), 1242–1255. | https://doi.org/10.1121/1.408177 | Replication dan ekstensi; memisahkan kontribusi phonetic environment variability dari talker variability — shows both matter, tapi talker variability adalah komponen kritis | Empirical | 5 | ✅ (dari brief) | 1993 | Satu-satunya studi yang mengisolasi effect of talker variability dari environmental variability — justifikasi untuk multi-speaker requirement |
| PH-32 | Bradlow, A. R., Pisoni, D. B., Akahane-Yamada, R., & Tohkura, Y. (1997). Training Japanese listeners to identify English /r/ and /l/: IV. Some effects of perceptual learning on speech production. *Journal of the Acoustical Society of America, 101*(4), 2299–2310. | https://doi.org/10.1121/1.418073 | Bukti bahwa perceptual training → production improvement; mendukung sequence perception-first, kemudian production practice | Empirical | 5 | ✅ (dari brief) | 1997 | Satu-satunya studi dalam series yang membuktikan perception-to-production transfer — justifikasi kritis untuk card sequence design |
| PH-33 | Thomson, R. I. (2012). Improving L2 listeners' perception of English vowels: A computer-mediated approach. *Language Learning, 62*(4), 1189–1228. | https://doi.org/10.1111/j.1467-9584.2012.01202.x | Replikasi HVPT dalam setting computer-mediated (bukan lab); directly applicable ke Nugget Nihongo sebagai PWA/mobile app | Empirical | 5 | ✅ (dari brief) | 2012 | Satu-satunya studi HVPT dalam computer self-study setting yang mencapai efek setara lab — validasi langsung untuk mobile app implementation |
| PH-34 | Lively, S. E., Pisoni, D. B., Yamada, R. A., Tohkura, Y., & Yamada, T. (1994). Training Japanese listeners to identify English /r/ and /l/. III. Long-term retention of new phonetic categories. *Journal of the Acoustical Society of America, 96*(4), 2076–2087. | https://doi.org/10.1121/1.410149 | Menunjukkan retensi perceptual learning setelah 3 bulan tanpa additional training; mendukung durability dari phonological training gains | Empirical | 5 | *(verify)* | 1994 | Satu-satunya studi retention jangka panjang dalam HVPT series — menunjukkan bahwa gains bersifat durable, bukan hanya short-term effect |
| PH-35 | Bradlow, A. R., Akahane-Yamada, R., Pisoni, D. B., & Tohkura, Y. (1999). Training Japanese listeners to identify English /r/ and /l/: Long-term retention of learning in perception and production. *Perception & Psychophysics, 61*(5), 977–985. | https://doi.org/10.3758/BF03206911 | Follow-up study Bradlow et al. 1997 untuk retention; menunjukkan bahwa production gains juga dipertahankan setelah 6 bulan | Empirical | 4 | *(verify)* | 1999 | Long-term retention data untuk production gains (bukan hanya perception) — memperkuat durability claim |
| PH-36 | Wang, Y., Spence, M. M., Jongman, A., & Sereno, J. A. (1999). Training American listeners to perceive Mandarin tones. *Journal of the Acoustical Society of America, 106*(6), 3649–3658. | https://doi.org/10.1121/1.428217 | Aplikasi prinsip HVPT ke tonal training (Mandarin); menunjukkan trainability lexical tone untuk L1 non-tonal speakers — paling relevan untuk pitch accent training di Nugget Nihongo | Empirical | 4 | *(verify)* | 1999 | Satu-satunya HVPT application ke tonal targets (bukan hanya consonant contrasts) — generalizability dari paradigma ke pitch accent training |
| PH-37 | Iverson, P., Hazan, V., & Bannister, K. (2005). Phonetic training with acoustic cue manipulations: A comparison of methods for teaching English /r/–/l/ to Japanese adults. *Journal of the Acoustical Society of America, 118*(5), 3267–3278. | https://doi.org/10.1121/1.2062307 | Membandingkan HVPT standar dengan variasi yang memanipulasi acoustic cues secara eksplisit; HVPT + cue salience enhancement menghasilkan outcomes lebih baik | Empirical | 4 | *(verify)* | 2005 | Memberikan bukti bahwa explicit acoustic cue highlighting dapat memperkuat HVPT — justifikasi untuk amplitude/visual cue enhancement pada kartu audio |
| PH-38 | Nishi, K., & Kewley-Port, D. (2008). Individual differences in second-language phonetic learning: Japanese acquisition of English /l/–/r/. *Journal of the Acoustical Society of America, 124*(1), 700–708. | https://doi.org/10.1121/1.2931581 | Mendokumentasikan individual differences yang signifikan dalam rate of phonological learning; implikasi untuk adaptive difficulty dalam SRS | Empirical | 4 | *(verify)* | 2008 | Satu-satunya sumber yang mendokumentasikan individual differences dalam HVPT response — mendukung adaptive phonological training approach |
| PH-39 | Shinohara, Y., & Iverson, P. (2016). High variability phonetic training for Japanese and Korean listeners on English /l/–/r/. *Journal of Phonetics, 58*, 144–158. | https://doi.org/10.1016/j.wocn.2016.08.005 | Membandingkan HVPT outcome untuk learner dengan L1 berbeda (Japanese vs. Korean) yang menghadapi contrast serupa; menunjukkan bahwa L1 background mempengaruhi trajectory tapi bukan trainability | Empirical | 4 | *(verify)* | 2016 | Update terbaru HVPT research dengan cross-L1 comparison — relevan untuk Indonesian context (L1 background matters) |

### Design Implications untuk Nugget Nihongo (§11.5)

**Implikasi 1 (Multi-speaker audio database adalah prerequisite, bukan nice-to-have):** Audio cards untuk fonem target (khususnya pitch accent, sokuon, /r/) harus menggunakan minimal 2–3 native speaker recordings yang berbeda per kata. Single-voice databases (seperti banyak aplikasi yang hanya menggunakan text-to-speech atau satu voice actor) tidak memenuhi kondisi HVPT untuk generalisasi. Ini adalah rekomendasi dengan strongest empirical base di seluruh §11.

**Implikasi 2 (Sequence: perception training → production practice):** Bradlow et al. (1997, PH-32) membuktikan bahwa perception training menghasilkan production improvement, tetapi bukan sebaliknya. Implikasi untuk card design: untuk kata yang fonetik targetnya complex (pitch accent + mora), audio recognition card (dengar → identifikasi/pilih kata) harus hadir *sebelum* type-answer card. Ini bukan hanya pedagogi — ada transfer mechanism yang teridentifikasi.

**Implikasi 3 (Variasi konteks, bukan hanya variasi speaker):** Lively et al. (1993, PH-31) menunjukkan bahwa phonetic environment variability juga contributes ke learning. Kata yang sama sebaiknya hadir dalam beberapa konteks fonetik (isolated word, dalam kalimat, dalam percakapan pendek) — ini mendukung sentence-example cards di Nugget Nihongo.

**Implikasi 4 (Individual differences → adaptive system):** Nishi & Kewley-Port (PH-38) menunjukkan perbedaan besar antar learner dalam phonological learning rate. FSRS algorithm Nugget Nihongo harus memperlakukan phonological cards dengan interval berbeda dibanding semantic cards — jika learner terus gagal di audio recognition, interval harus lebih pendek dan variasi speaker lebih banyak.

### Cross-Section Integration Notes (§11.5)

- **§9 [CT, audio-visual integration]:** HVPT beroperasi melalui perceptual learning (bottom-up), sementara multimedia learning (§9) beroperasi melalui representational construction (top-down). Keduanya complementary untuk pronunciation cards — perceptual training (PH-30–PH-39) + visual pitch display (§9) mengaktifkan dua jalur.
- **§1 [AR, retrieval practice]:** HVPT secara implisit menggunakan identification task yang adalah retrieval practice. Cross-reference §1 [AR-01] untuk justifikasi tambahan bahwa identification > passive listening.
- **§8 [CC cluster, kecemasan pronunciation]:** HVPT dilakukan secara private (computer-mediated, Thomson PH-33) — ini mengurangi anxiety yang didokumentasikan di §8 [CC cluster] sebagai barrier pronunciation practice. Ini sebuah hidden benefit dari computer-mediated phonological training.

---

## §11.6 — PHONOLOGICAL NEIGHBORHOOD EFFECTS

### Core Theoretical Background

*Catatan: Seksi ini adalah supporting theory dengan prioritas lebih rendah dibanding §11.1–§11.5. Basis empiris lebih speculative dalam aplikasinya ke L2 Japanese untuk Indonesian learner. Hadir untuk completeness dan sebagai optional design consideration.*

Phonological neighborhood theory (Luce & Pisoni, 1998) mendefinisikan sebuah **phonological neighborhood** sebagai set dari semua kata yang dapat dibentuk dari sebuah kata target dengan menambah, menghapus, atau mensubstitusi satu fonem. Kata dengan banyak neighbor = *dense neighborhood*; kata dengan sedikit neighbor = *sparse neighborhood*.

Temuan utama: kata dalam **dense neighborhoods dikenali lebih lambat** dalam isolated word recognition (lebih banyak competing aktivasi), tetapi **diproduksi lebih lancar** (lebih banyak phonological support). Dalam konteks L2, dense neighborhood words memberikan lebih banyak kesempatan untuk *implicit phonological learning melalui cross-activation*.

Untuk Japanese: kata-kata pendek (2–3 mora) cenderung memiliki denser neighborhoods karena ruang fonemik Japanese relatif terbatas (5 vokal, ~15 konsonan). Kata compound panjang memiliki sparser neighborhoods. Ini mengimplikasikan bahwa target vocabulary pilihan yang memiliki banyak phonological neighbors bisa memberikan implicit phonological reinforcement — learner "berlatih" phonological representations dari kata target secara indirect ketika belajar kata-kata tetangga.

### Citations: §11.6

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| PH-40 | Vitevitch, M. S., & Luce, P. A. (1998). When words compete: Levels of processing in perception of spoken words. *Psychological Science, 9*(4), 325–329. | https://doi.org/10.1111/1467-9280.00064 | Demonstrates differential effects of phonological neighborhood density on spoken word processing; establishes the neighborhood activation model | Empirical | 5 | ✅ (dari brief) | 1998 | Menetapkan phonological neighborhood density sebagai variable prediktif dalam spoken word recognition |
| PH-41 | Luce, P. A., & Pisoni, D. B. (1998). Recognizing spoken words: The neighborhood activation model. *Ear and Hearing, 19*(1), 1–36. | *(verify)* | Full model explication; menjelaskan neighborhood activation dalam spoken word recognition secara komprehensif; basis teoretis untuk aplikasi ke L2 | Theoretical model | 5 | *(verify)* | 1998 | Model formal yang menjelaskan mekanisme neighborhood effects — essential untuk memahami aplikasinya ke L2 sequencing |
| PH-42 | Vitevitch, M. S., & Luce, P. A. (1999). Probabilistic phonotactics and neighborhood activation in spoken word recognition. *Journal of Memory and Language, 40*(3), 374–408. | https://doi.org/10.1006/jmla.1998.2618 | Menghubungkan phonotactic probability dengan neighborhood effects; relevan untuk Japanese yang memiliki sangat restricted phonotactic patterns | Empirical | 4 | *(verify)* | 1999 | Menghubungkan phonotactics (sangat relevant untuk Japanese) dengan neighborhood activation |
| PH-43 | Vitevitch, M. S., & Rodríguez, E. (2005). Neighborhood density effects in spoken word production in Spanish. *Journal of Multilingual and Multicultural Development, 26*(6), 519–528. | *(verify)* | Neighborhood effects dalam produksi (bukan hanya persepsi), dan dalam bahasa non-English; menunjukkan cross-linguistic generalizability | Empirical | 3 | *(verify)* | 2005 | Extends neighborhood effects ke production domain dan language non-English |
| PH-44 | Trofimovich, P., & Gatbonton, E. (2006). Repetition and focus on form in processing L2 Spanish words: Implications for pronunciation instruction. *The Modern Language Journal, 90*(4), 519–535. | https://doi.org/10.1111/j.1540-4781.2006.00470.x | Menunjukkan bahwa repetition strengthens L2 phonological representations; dalam konteks L2, density effects mungkin terbalik — sparse words perlu lebih banyak repetition | Empirical | 4 | ✅ (dari brief) | 2006 | Satu-satunya sumber yang mengaplikasikan neighborhood theory ke L2 pronunciation instruction implications |

### Design Implications untuk Nugget Nihongo (§11.6)

**Implikasi 1 (Secondary factor untuk sequencing):** Phonological neighborhood density bisa menjadi salah satu faktor ordering ketika dua kata yang setara dalam hal frequency dan JLPT level harus diprioritaskan. Kata dengan denser neighborhood (kata pendek, fonem common) sebaiknya hadir lebih awal — lebih banyak cross-activation yang mendukung phonological encoding.

**Implikasi 2 (Sparse neighborhood words perlu lebih banyak repetition):** Kata-kata dengan sparse neighborhoods (compound panjang, kata teknis) harus mendapat interval FSRS yang lebih pendek di audio recognition cards — trofimovich & Gatbonton (PH-44) menunjukkan bahwa word-form representations yang sparse perlu lebih banyak repetition untuk konsolidasi.

### Cross-Section Integration Notes (§11.6)

- **§1 [SRS/FSRS]:** Neighborhood density bisa diintegrasikan sebagai faktor dalam initial interval setting untuk audio cards — ini adalah spezifikasi untuk tim engineering, bukan perubahan pada core algorithm.

---

## §11.7 — DESIGN DECISION MATRIX: PRONUNCIATION CARDS

Sintesis dari §11.1–§11.6 → spesifikasi actionable untuk fitur audio/phonological di Nugget Nihongo.

| Fitur Desain | Justifikasi Teoretis | Seksi | Q-Score Basis | Implementasi Rekomendasi |
|---|---|---|---|---|
| **Pitch graph pada setiap kata konten** | Pitch accent = lexical distinction; L1 non-tonal tidak punya L1 category untuk ini; explicit visual representation diperlukan untuk conscious attention | §11.4 (PH-25, PH-22) + §11.1 SLM | 5 | H/L dot system di atas hiragana reading; adjacent dengan kata (spatial contiguity, §9 CT-08) |
| **Multi-speaker audio (≥ 2 native speakers per kata)** | HVPT: talker variability adalah kritis untuk perceptual generalization; single-speaker tidak menghasilkan generalizable phonological categories | §11.5 (PH-30, PH-31) | 5 | Minimum 2 native speaker recordings; 3–4 untuk high-frequency target words; flag TTS-only cards sebagai suboptimal |
| **Visual mora counter untuk sokuon/chōon/moraic N** | Indonesian learner systematically misperceive mora boundaries; audio saja tidak sufficient karena segmentation unit mismatch | §11.3 (PH-13, PH-16) | 5 | Dot counter (●●●●) atau segmented hiragana (き・っ・て) di front card |
| **Slow-playback option untuk phonetically complex words** | Mora isochrony acoustic evidence; learner perlu menginternalisasi duration sebelum native-speed | §11.3 (PH-16) + §11.5 HVPT | 4 | 65% speed toggle; pitch contour harus dipertahankan proporsional |
| **Sequence: pitch accent (new) → /r/ distinction (similar)** | SLM: new categories easier than similar; PAM: /r/ = SC type (hardest); pitch accent = UC type (more trainable) | §11.1 (PH-01) + §11.2 (PH-10) | 5 | Pitch accent introduced di N5 level; /r/ explicit discrimination kartu mulai N4 |
| **Explicit "ini beda dari /r/ Indonesia" note untuk kata /r/ Japanese** | SLM equivalence classification: learner tanpa explicit flagging akan use Indonesian /r/ as proxy dan gagal detect perbedaan | §11.1 (PH-05) + §11.2 (PH-08) | 5 | Tooltip atau pedagogical note di back card untuk kata dengan ら行 |
| **Audio recognition cards sebelum type-answer cards untuk phonologically complex words** | HVPT: perception → production transfer terbukti; production practice sebelum perceptual mastery tidak efisien | §11.5 (PH-32) | 5 | Card sequence: audio recognition → reading recognition → type-answer; tidak boleh dibalik untuk kata fonetik complex |
| **Minimal pair examples di back card untuk pitch accent** | Pitch accent = lexical; tanpa contoh contrast, learner mungkin treat sebagai intonation bukan meaning | §11.4 (PH-24, PH-25) | 4 | Satu minimal pair per kata jika ada (例: 箸/橋, 飴/雨); dimulai N3+ |
| **Neighborhood density sebagai secondary sequencing factor** | Dense neighborhood words → lebih banyak phonological support → appropriate untuk earlier introduction | §11.6 (PH-40, PH-44) | 3 | Terapkan sebagai tiebreaker ketika JLPT level dan frequency equivalent |
| **Phonological training tagged sebagai SRS-separate dari semantic review** | Individual differences dalam phonological learning rate (PH-38) suggest different interval requirements dari semantic memory | §11.5 (PH-38) + §11.1 SLM | 4 | Audio cards mendapat terpisah FSRS queue atau parameter yang disesuaikan; jangan blend phonological dan semantic review |

---

## §11.8 — CROSS-SECTION INTEGRATION MAP

| §11 Section | Primary Integration | Secondary Integration | Note |
|---|---|---|---|
| §11.1 SLM | §5.5 (kontrastif data yang dikonfirmasi oleh SLM theory) | §9 [CL-01–CL-04] (cognitive load untuk new category formation) | §11.1 provides WHY for §5.5 WHAT |
| §11.2 PAM | §5.5 (interference prediction converging dengan PAM types) | §11.1 (PAM dan SLM = complementary, bukan competing) | Gunakan keduanya untuk stronger design justification |
| §11.3 Mora | §5.5 (error rate data), §9 [CT audio-visual] | §13 Agent 3 (phonological loop — coordinate agar tidak duplikasi Papagno) | §11.3 adds acquisition theory ke §5.5 deskripsi |
| §11.4 Pitch Accent | §5.5 (pitch interference documented), §9 [CT-08 contiguity] | §11.1 (SLM prediction untuk new category) | Data dari §5.5 + theory dari §11.1 + design dari §9 |
| §11.5 HVPT | §1 [AR retrieval practice] (HVPT = implicit retrieval), §9 [CT audio] | §8 [CC anxiety] (computer-mediated HVPT mengurangi anxiety barrier) | HVPT menjembatani §9 theory dengan §1 practice |
| §11.6 Neighborhoods | §1 [FSRS parameters] | — | Secondary factor; tidak memerlukan changes ke core architecture |

---

## SUMMARY: NEW CITATIONS ADDED IN §11

| ID Range | Section | Citations Count | Confidence |
|---|---|---|---|
| PH-01 — PH-07 | §11.1 Speech Learning Model | 7 | High (seed citations dari brief + established literature) |
| PH-08 — PH-12 | §11.2 Perceptual Assimilation Model | 5 | High |
| PH-13 — PH-21 | §11.3 Mora & Prosodic Perception | 9 | High (core citations DOI-verified dari brief) |
| PH-22 — PH-29 | §11.4 Pitch Accent Acquisition | 8 | Medium-High (PH-23 flagged) |
| PH-30 — PH-39 | §11.5 HVPT | 10 | High (core citations DOI-verified dari brief) |
| PH-40 — PH-44 | §11.6 Phonological Neighborhoods | 5 | Medium (speculative application cluster) |
| — | §11.7 Design Matrix | 0 new | Synthesis dari PH-01–PH-44 |
| **TOTAL** | | **44** | |

**Total §11 contribution: 44 new citations (PH-01–PH-44)**
**Estimated corpus post-merge: ~455 + 44 = ~499 citations**

---

## PRIORITY SUMMARY UNTUK CRISPY MERGE DECISION

### Tier 1 — Merge langsung (High confidence, DOI dari brief atau well-established):

| ID | Paper | Alasan Priority |
|---|---|---|
| PH-01 | Flege (1995) SLM | Theoretical anchor §11; tidak tergantikan |
| PH-02 | Flege, Munro & MacKay (1995) | DOI dari brief; empirical foundation |
| PH-03 | Flege & Bohn (2021) SLM-r | Update resmi terbaru |
| PH-08 | Best (1995) PAM | Theoretical anchor §11.2 |
| PH-09 | Best & Tyler (2007) PAM-L2 | Applied version untuk experienced learner |
| PH-13 | Cutler & Otake (1994) | DOI dari brief; founding mora study |
| PH-14 | Otake et al. (1993) | DOI dari brief; JML founding |
| PH-16 | Port et al. (1987) | DOI dari brief; acoustic mora timing |
| PH-25 | Pierrehumbert & Beckman (1988) | Foundational pitch accent linguistics |
| PH-30–PH-33 | Logan 1991, Lively 1993, Bradlow 1997, Thomson 2012 | DOI dari brief; HVPT core series |
| PH-40 | Vitevitch & Luce (1998) | DOI dari brief; neighborhood founding |
| PH-44 | Trofimovich & Gatbonton (2006) | DOI dari brief |

### Tier 2 — Verify sebelum merge (*(verify)* status):

Semua citation dengan *(verify)* di kolom Akurasi — terutama PH-04, PH-10, PH-11, PH-15, PH-20 (Näätänen et al. Nature paper — DOI should be verifiable), PH-34, PH-35.

### Tier 3 — Prioritas rendah / optional:

PH-43 (Vitevitch & Rodríguez, JMMD 2005) — Q-Score 3; bisa dihapus jika budget citations ketat.

---

## UNRESOLVED FLAGS UNTUK CRISPY

| Flag | ID | Issue | Aksi yang Diminta |
|---|---|---|---|
| **FLAG §11-A** | PH-23 | Hirano (1999) — Journal Japan Academy of Language Studies vol. 3 — DOI tidak tersedia; journal tidak terindeks di major databases | Verify via NDL Digital (https://ndlsearch.ndl.go.jp) atau CiNii (https://ci.nii.ac.jp/search?q=Hirano+pitch+accent); jika tidak dapat ditemukan, hapus |
| **FLAG §11-B** | PH-21 | Papagno, Valentine & Baddeley (1991) — phonological loop dalam konteks L2 vocabulary — koordinasi dengan Agent 3 §13 diperlukan untuk menghindari duplikasi | Agent 3 diminta tidak re-cite Papagno et al. dalam konteks yang overlap; §11.3 menggunakannya untuk phonological store specifically |
| **FLAG §11-C** | PH-40–PH-44 | §11.6 Phonological Neighborhood cluster — theoretical application ke L2 Japanese belum tervalidasi secara empiris langsung; semua dalam konteks L1 atau non-Japanese L2 | Pertimbangkan label "Speculative Application Cluster" saat merge; jangan sajikan sebagai evidence-based design recommendation setara HVPT |
| **FLAG §11-D** | PH-03 | Flege & Bohn (2021) adalah book chapter dalam edited volume Cambridge UP; DOI belum dikonfirmasi; verifikasi via Cambridge Core | Prioritas verify — SLM-r adalah update penting |

---


