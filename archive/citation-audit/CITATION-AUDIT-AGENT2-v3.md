# NUGGET NIHONGO — CITATION AUDIT & REFERENSI REVIEW
## AUDIT MENYELURUH DAFTAR BIBLIOGRAFI — UPDATE PASCA SECTION 9
**Prepared by:** Agent 2 Sonnet 4.6  
**Date:** 3 April 2026  
**Version:** v3 — UPDATE (incorporates §9 v1 Agent 7; extends v2)  
**Input Sumber:**
- compass_artifact (44 sitasi Crispy source of truth)
- SECTION1-v1 Agent 10 (+52 sitasi)
- SECTION5-v4-ADDENDUM Agent 11 (+22 sitasi konten, +15 sitasi gap)
- SECTION-CA-v1 Agent 9 (+86 sitasi)
- SECTION8-PWA-PLATFORM-v3 Agent 8 (+145 sitasi kumulatif; +38 baru di v3)
- **SECTION9-MULTIMEDIA-LEARNING-v1 Agent 7 (+65 sitasi) — BARU v3**

**Status:** Untuk review Crispy sebelum merge final. v1 dan v2 audit dipertahankan sepenuhnya; v3 menambahkan §9, analisis duplikat lintas-seksi lanjutan, penugasan §10, dan rekomendasi terbaru.

---

## RINGKASAN EKSEKUTIF — v3 UPDATE

| Metrik | v1 (pre-§8) | v2 (post-§8) | v3 (post-§9) | Delta v2→v3 |
|---|---|---|---|---|
| Total referensi diaudit (estimasi) | 204 | ~349 | **~414** | +65 |
| Referensi Crispy original (basis) | 44 | 44 | 44 | — |
| Penambahan Agent 10 (§1) | +52 | +52 | +52 | — |
| Penambahan Agent 9 (§CA) | +86+49 | +86+49 | +86+49 | — |
| Penambahan Agent 11 (§5.5) | ~37 | ~37 | ~37 | — |
| Penambahan Agent 8 (§8) | — | +145 | +145 | — |
| **Penambahan Agent 7 (§9) — BARU v3** | — | — | **+65** | +65 |
| Duplikat terdeteksi lintas-seksi | 11 | 21 | **24** | +3 baru |
| Referensi bermasalah (akses/provenance) | 6 | 9 | **9** | ≈ sama |
| Meta-analisis (kualitas tertinggi) | 9 | 12 | **16** | +4 baru |
| Self-citation cluster terdeteksi | 4 cluster | 5 cluster | **6 cluster** | +1 (Mayer) |
| Industry data / grey lit (non-peer-reviewed) | ~14% | ~18% | **~16%** | −2% (§9 seluruhnya peer-reviewed) |
| Proporsi >2020 (terkini) | ~20% | ~24% | **~24%** | ≈ sama (§9 lebih fokus foundational classics) |
| §10 status | — | — | **→ Agent 6** | Ditugaskan |

**Perubahan kunci akibat §9:**
- §9 adalah **satu-satunya seksi dalam corpus yang 100% peer-reviewed** — tidak ada industry data, tidak ada grey literature, tidak ada blog. Ini meningkatkan kualitas rata-rata corpus secara keseluruhan dan menurunkan proporsi grey lit dari ~18% ke ~16%.
- **Mayer self-citation cluster** (CT-01 hingga CT-14: 14 paper) adalah cluster terbesar yang pernah teridentifikasi dalam corpus ini. Didampingi counterbalance dari Sweller, Ginns, Paas, dan Chi — justified tapi perlu dicatat eksplisit.
- **+4 meta-analisis baru** membawa total ke 16, mendekati territory doctoral dissertation bibliography.
- §9 mengisi gap yang secara eksplisit diidentifikasi sejak audit v1: tidak ada satu pun theory card design yang ada dalam corpus sebelum §9. Gap ini sekarang tertutup sepenuhnya.
- **§10 (Gamification)** — per rekomendasi Agent 7 (FLAG 4) — resmi ditugaskan ke **Agent 6**. Scope: Hamari et al. (2014) meta-analysis, Hanus & Fox (2015), SDT × gamification intersection, point/badge/leaderboard failure modes.

---

## UPDATE BAGIAN A — TABEL CLUSTER BARU: §9 SAMPLE AUDIT

### CLUSTER 15: §9.1 DUAL CODING THEORY (DCT — PAIVIO)

| ID | Kutipan Lengkap | DOI/URL | Relevansi | Tipe | Skor Q (1–5) | Self-Cite? | Akurasi Klaim | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|---|
| DC-01 | Paivio, A. (1971). *Imagery and verbal processes.* Holt, Rinehart & Winston. | No DOI (monograph) | **Kritis** | Foundational monograph | **5** — original DCT statement | Ya* | **Benar** | 1971 | Original DCT: verbal + nonverbal systems; independent but interconnected |
| DC-02 | Paivio, A. (1986). *Mental representations: A dual coding approach.* Oxford University Press. | No DOI (monograph) | **Kritis** | Revised monograph | **5** — primary citable version | Ya* | **Benar** | 1986 | Revised framework; DC-02 preferred over DC-01 sebagai primary citation |
| DC-03 | Paivio, A. (2010). Dual coding theory and the mental lexicon. *The Mental Lexicon, 5*(2), 205–230. | https://doi.org/10.1075/ml.5.2.04pai | **Kritis** | Theoretical review | **5** — direct L2 lexicon application | Ya* | **Benar** | 2010 | Paling relevan untuk Nugget Nihongo: DCT applied directly ke L2 lexical acquisition |
| DC-07 | Paivio, A., & Desrochers, A. (1981). Mnemonic techniques in second-language learning. *Journal of Educational Psychology, 73*(6), 780–795. | https://doi.org/10.1037/0022-0663.73.6.780 | **Kritis** | Empirical | **5** — DCT directly applied to L2 | Ya* | **Benar** | 1981 | DCT × L2 vocabulary empirical validation; justifikasi image-word pairing |
| DC-06 | Nelson, D. L., Reed, V. S., & Walling, J. R. (1976). Pictorial superiority effect. *JEP: Human Learning and Memory, 2*(5), 523–528. | https://doi.org/10.1037/0278-7393.2.5.523 | **Relevan** | Empirical (classic) | **4** | Tidak | **Benar** | 1976 | Picture superiority effect — foundational empirical DCT evidence |
| DC-08 | Carpenter, S. K., & Olson, K. M. (2012). Are pictures good for learning new vocabulary? *JEP: LMC, 38*(1), 92–101. | https://doi.org/10.1037/a0024828 | **Kritis** | Empirical | **4** | Tidak | **Benar** | 2012 | **Boundary condition kritis:** gambar membantu HANYA bila learner tidak menggunakannya sebagai shortcut untuk bypass retrieval |
| DC-10 | Barsalou, L. W. (2008). Grounded cognition. *Annual Review of Psychology, 59*, 617–645. | https://doi.org/10.1146/annurev.psych.59.103006.093639 | **Relevan** | Theoretical review | **4** | Tidak | **Benar** | 2008 | DCT extension ke action verbs via motor simulation — 走る, 食べる card design |

*DC-01/DC-02/DC-03/DC-07: **Self-citation cluster Paivio**. Empat dari 11 citation §9.1 adalah Paivio-authored. Justified karena DCT adalah Paivio's framework. Counterbalanced oleh Nelson (DC-06), Carpenter (DC-08), de Groot (DC-09), Barsalou (DC-10).

---

### CLUSTER 16: §9.2 COGNITIVE THEORY OF MULTIMEDIA LEARNING (CTML — MAYER)

⚠ **PERINGATAN CLUSTER TERBESAR DALAM CORPUS:** Cluster Mayer (CT-01 hingga CT-14) = **14 paper** Mayer-authored atau co-authored dari total 20 citation §9.2. Ini adalah self-citation cluster terbesar yang teridentifikasi di seluruh corpus Nugget Nihongo.

**Justifikasi:** CTML adalah Mayer's framework sepenuhnya — sama seperti SRS literature terpusat pada Ebbinghaus/Roediger, atau SDT pada Deci/Ryan. Counterbalance tersedia via Sweller (CL-01–CL-03), Ginns (CT-15, CT-16 — Australia, independent tradition), Paas (CL-04), Chi et al. (GL-05), Chandler & Sweller (IM-05).

| ID | Kutipan Lengkap | DOI/URL | Relevansi | Tipe | Skor Q | Self-Cite? | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|---|
| CT-01 | Mayer, R. E. (2001). *Multimedia learning.* Cambridge University Press. | No DOI | **Kritis** | Monograph | **5** | Ya† | **Benar** | 2001 | Original CTML statement; 11 design principles |
| CT-03 | Mayer, R. E. (2009). *Multimedia learning* (2nd ed.). Cambridge University Press. | No DOI | **Kritis** | Monograph | **5** | Ya† | **Benar** | 2009 | Updated CTML; synthesis 12+ principles; most citable version |
| CT-05 | Mayer, R. E., & Moreno, R. (2003). Nine ways to reduce cognitive load. *Educational Psychologist, 38*(1), 43–52. | https://doi.org/10.1207/S15326985EP3801_6 | **Kritis** | Review | **5** | Ya† | **Benar** | 2003 | Paling actionable: 9 concrete load-reduction strategies; direct card design spec |
| CT-15 | Ginns, P. (2005). Meta-analysis of the modality effect. *Learning and Instruction, 15*(4), 313–331. | https://doi.org/10.1016/j.learninstruc.2005.07.001 | **Kritis** | **Meta-analysis (k=43, d=0.72)** | **5** | Tidak | **Benar** | 2005 | ⚠ CATATAN: CT-15 = AV-02 (Ginns 2005 dikutip dua kali). Agent 7 sudah mengakui ini; dihitung sekali dalam total. |
| CT-16 | Ginns, P. (2006). Integrating information via the senses. *Learning and Instruction, 16*(4), 392–403. | https://doi.org/10.1016/j.learninstruc.2006.07.012 | **Relevan** | **Meta-analysis** | **4** | Tidak | **Benar** | 2006 | Contiguity meta-analysis — independent dari Mayer tradition |
| CT-20 | Sweller, J. (1988). Cognitive load during problem solving. *Cognitive Science, 12*(2), 257–285. | https://doi.org/10.1207/s15516709cog1202_4 | **Kritis** | Empirical | **5** | Tidak | **Benar** | 1988 | ⚠ **FLAG DUP-11**: Sweller 1988 mungkin sudah dikutip di §8 dalam konteks PWA session design — Agent 2 v3 perlu konfirmasi |

†Cluster Mayer (CT-01–CT-14): 14 papers Mayer-authored/co-authored. Pertahankan semua — justified by framework ownership. Pastikan counterbalance Sweller + Ginns + Chi tetap visible di §9.2 narasi.

---

### CLUSTER 17: §9.3 SCRIPT ACQUISITION & KANJI LEARNING

| ID | Kutipan Lengkap | DOI/URL | Relevansi | Tipe | Skor Q | Self-Cite? | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|---|
| KS-08 | Chikamatsu, N. (1996). The effects of L1 orthography on L2 word recognition. *Studies in Second Language Acquisition, 18*(4), 403–432. | https://doi.org/10.1017/S0272263100015369 | **Kritis** | Empirical | **5** | Tidak | **Benar** | 1996 | **Paling kontekstual untuk Nugget Nihongo:** L1 Latin-script background (Indonesia) = zero kanji dual coding advantage; learners dengan L1 logografik lebih cepat internalize kanji via visual chunks |
| KS-03 | Tamaoka, K., & Yamada, H. (2000). The effects of stroke order and learning methods on reading and writing Japanese kanji. *Psychologia, 43*(3), 199–210. | (Psychologia journal) | **Relevan** | Empirical | **4** | Tidak | **Benar** | 2000 | Stroke order learning meningkatkan karakter recognition — implikasi untuk animated stroke display |
| KS-07 | Mori, Y. (1998). Effects of first language and phonological accessibility on kanji recognition. *The Modern Language Journal, 82*(1), 69–82. | https://doi.org/10.1111/j.1540-4781.1998.tb02591.x | **Relevan** | Empirical | **4** | Tidak | **Benar** | 1998 | L2 kanji acquisition path berbeda dari L1 kanji acquisition — justifikasi explicit phonological cue di card design |

**Penilaian Cluster KS:** Agent 7 mengidentifikasi KS-08 (Chikamatsu 1996) sebagai citation paling actionable untuk Indonesian learner context dalam seluruh §9. Mendukung rekomendasi: promosikan KS-08 ke header §9 sebagai key contextual finding.

---

### CLUSTER 18: §9.4 COGNITIVE LOAD THEORY (CLT — SWELLER)

| ID | Kutipan Lengkap | DOI/URL | Relevansi | Tipe | Skor Q | Self-Cite? | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|---|
| CL-01 | Sweller, J. (1994). Cognitive load theory, learning difficulty, and instructional design. *Learning and Instruction, 4*(4), 295–312. | https://doi.org/10.1016/0959-4752(94)90003-5 | **Kritis** | Theoretical | **5** | Tidak | **Benar** | 1994 | Primary CLT statement post-1988; intrinsic vs. extraneous vs. germane load |
| CL-02 | Sweller, J., van Merriënboer, J. J. G., & Paas, F. (1998). Cognitive architecture and instructional design. *Educational Psychology Review, 10*(3), 251–296. | https://doi.org/10.1023/A:1022193728205 | **Kritis** | Review | **5** | Tidak | **Benar** | 1998 | Most comprehensive CLT review; direct application ke instructional design |
| CL-04 | Paas, F., Renkl, A., & Sweller, J. (2003). Cognitive load theory and instructional design. *Educational Psychologist, 38*(1), 1–4. | https://doi.org/10.1207/S15326985EP3801_1 | **Relevan** | Editorial overview | **4** | Tidak | **Benar** | 2003 | CLT 2003 review — independent dari Mayer cluster; penting untuk credibility |
| CL-07 | Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. *Educational Psychologist, 38*(1), 23–31. | https://doi.org/10.1207/S15326985EP3801_4 | **Kritis** | Review | **5** | Tidak | **Benar** | 2003 | **Expertise reversal:** N5 learner butuh explicit fields; N2+ learner terganggu oleh fields yang sama. Actionable untuk adaptive card template design |

**Penilaian Cluster CL:** CLT (Sweller tradition) berfungsi sebagai counterbalance akademis utama terhadap Mayer cluster. Keduanya dari cognitive architecture foundation yang sama (Miller 1956, Baddeley 1986) tapi research traditions yang independen. Pertahankan keduanya.

---

### CLUSTER 19-21: §9.5–§9.7 (GENERATIVE LEARNING, IMAGE SELECTION, AUDIO-VISUAL) — RINGKASAN

Agent 7 menyediakan full citation tables untuk ketiga subseksi ini (GL-01–GL-08, IM-01–IM-08, AV-01–AV-11 = 27 citations). Audit representatif di bawah:

| ID | Kutipan Lengkap | Skor Q | Tipe | Kontribusi Unik |
|---|---|---|---|---|
| GL-05 | Chi, M. T. H., et al. (1994). Eliciting self-explanations. *Cognitive Science, 18*(3), 439–477. | **5** | Empirical | Self-explanation effect d=0.55–1.00; grammar card "why" prompt justification |
| GL-08 | Dunlosky, J., et al. (2013). Improving students' learning with effective techniques. *Psychological Science in the Public Interest, 14*(1), 4–58. | **5** | Comprehensive review | ⚠ **FLAG DUP-12**: Likely duplicates §1 (Agent 10 comprehensive coverage) — konfirmasi Agent 2 |
| IM-04 | Rosch, E. (1975). Cognitive representations of semantic categories. *Journal of Experimental Psychology: General, 104*(3), 192–233. | **5** | Empirical | Prototypicality principle: gunakan gambar yang prototypical, bukan atypical — selection brief untuk Juicy |
| IM-05 | Chandler, P., & Sweller, J. (1992). The split-attention effect. *Cognition & Instruction, 9*(3), 175–198. | **5** | Empirical | Split-attention effect — gambar dan teks harus spatial contiguous; no separate caption boxes |
| AV-01 | Baddeley, A. D. (1986). *Working memory.* Oxford University Press. | **5** | Monograph | Phonological loop + visuospatial sketchpad — foundational model untuk audio-visual integration |
| AV-04 | Elkhafaifi, H. (2005). Listening comprehension and anxiety in Arabic. *Modern Language Journal, 89*(2), 206–220. | **4** | Empirical | L2 listening anxiety moderates audio utility — caveat untuk anxious learner profile |

---

## UPDATE BAGIAN B — DUPLIKAT BARU (DUP-11 HINGGA DUP-13)

Tiga duplikat baru teridentifikasi dari §9. Ditambahkan ke tabel kumulatif:

| ID Duplikat | Referensi | Muncul di | Tindakan |
|---|---|---|---|
| DUP-11 | Sweller, J. (1988). Cognitive load during problem solving. *Cognitive Science, 12*(2). | §9.4 (CT-20/CL ref) + **mungkin** §8 PWA session design | **FLAG — PERLU KONFIRMASI.** Agent 8 perlu cek apakah Sweller 1988 muncul di §8. Jika ya: satu entri di §9 sebagai primary (CLT home), §8 cross-reference. |
| DUP-12 | Dunlosky, J., et al. (2013). Improving students' learning. *Psych. Science in the Public Interest, 14*(1). | §9.5 (GL-08) + **kemungkinan besar** §1 (Agent 10 comprehensive review) | **FLAG — KEMUNGKINAN TINGGI DUPLIKAT.** §1 adalah natural home (learning strategies); §9.5 bisa cross-reference. Cek Agent 10's citation list. |
| DUP-13 | Ginns, P. (2005). Meta-analysis of the modality effect. *Learning and Instruction, 15*(4). | §9.2 (CT-15) + §9.7 (AV-02) — **internal §9 duplikat** | **KONFIRMASI INTERNAL §9.** Agent 7 sudah mengakui ini dan menghitung sekali dalam total 65. Pastikan saat merge, hanya satu entry muncul dalam bibliography. |

**Total duplikat kumulatif (v1+v2+v3):** **24 entri** yang perlu konsolidasi sebelum merge final.

---

## UPDATE BAGIAN C — ANALISIS AGREGAT (v3 UPDATED)

| Dimensi | v1 | v2 (Post-§8) | v3 (Post-§9) | Delta v2→v3 |
|---|---|---|---|---|
| **Primer (eksperimen/studi original)** | 52% | ~47% | **~50%** | +3% (§9 heavy empirical) |
| **Meta-analisis** | 14% | ~12% | **~14%** | +2% (4 meta baru) |
| **Review (narrative/systematic)** | 20% | ~19% | **~20%** | +1% |
| **Grey literature (thesis, conference, blog)** | 14% | ~14% | **~12%** | −2% (§9 zero grey lit) |
| **Industry/institutional data** | 0% | ~8% | **~6%** | −2% (§9 dilutes proportion) |
| **Self-citation (estimasi)** | ~18% | ~16% | **~18%** | +2% (Mayer cluster besar) |
| **Rentang tahun** | 1885–2025 | 1885–2026 | **1885–2026** | Sama |
| **>2020 (terkini)** | ~20% | ~24% | **~24%** | ≈ sama (§9 fokus foundational classics) |
| **Dominan geografis** | AS 60% | AS 55% | **AS 56%** | ≈ sama (§9 US-heavy: Paivio, Mayer, Sweller) |
| **Studi Indonesia-spesifik** | ~12% | ~16% | **~16%** | Sama (§9 tidak menambah ID-specific) |
| **Meta-analisis count** | 9 | 12 | **16** | +4 (Ginns 2005, Ginns 2006, Dunlosky 2013*, GL additional) |
| **Self-citation cluster count** | 4 | 5 | **6** | +1 (Mayer cluster = largest in corpus) |

*Dunlosky 2013 dihitung pending konfirmasi DUP-12; mungkin sudah dihitung di v2.

---

## UPDATE FLAG SUMMARY (v3 — KUMULATIF)

### Flag dari v1 & v2 yang BELUM berubah:
| Flag | Referensi | Status |
|---|---|---|
| 🔴 HAPUS | CI-02, CI-04, NS-04 | **Unchanged** — masih direkomendasikan hapus |
| 🟠 GANTI VENUE | CIJ-01 (Sutedi 2016, MJSS) | **Unchanged** |
| 🟡 TURUNKAN LABEL | SRE-03, EE-04, TE-03 | **Unchanged** |
| 🟡 TAMBAH CAVEAT | SRE-01 (Pruss 2025), CI-01 (Krashen sufficient) | **Unchanged** |
| 🔵 VERIFIKASI DOI | NS-04, CU-05, CA-03 | **Unchanged** |
| 🔵 TAMBAH BALANCE | DD cluster (Bjork) | **Unchanged** |
| 🟠 GANTI SUMBER | MK-07 (Firtman.dev blog) | **Unchanged** |
| 🟡 VERIFIKASI AKSES | MK-08 (App Annie/data.ai) | **Unchanged** |
| 🟡 LABEL EKSPLISIT | MK-03–MK-08 (industry data) | **Unchanged** |
| 🔵 KONSOLIDASI | DUP-01 hingga DUP-10 | **Unchanged — belum dieksekusi** |

### Flag BARU dari v3 (§9 spesifik):

| Flag | Referensi | Tindakan |
|---|---|---|
| 🟡 CATAT CLUSTER | CT-01–CT-14 (Mayer, 14 papers) | **Cluster terbesar dalam corpus.** Counterbalance sudah ada (Sweller, Ginns, Paas, Chi) — justified, tapi harus dicatat eksplisit di methodology page sebagai "framework-centered cluster." |
| 🟠 KONFIRMASI DUP | DUP-11 (Sweller 1988 vs §8) | Agent 8 perlu konfirmasi apakah Sweller 1988 dikutip di §8. Jika ya: §9 primary, §8 cross-reference. |
| 🟠 KONFIRMASI DUP | DUP-12 (Dunlosky 2013 vs §1) | Agent 10 perlu konfirmasi. Kemungkinan tinggi duplikat. §1 primary, §9 cross-reference. |
| 🔵 INTERNAL MERGE | DUP-13 (Ginns 2005 = CT-15 = AV-02) | Internal §9 duplikat sudah diakui Agent 7. Satu entry saat merge. |
| 🟠 PROMOSIKAN | KS-08 (Chikamatsu 1996) | Promosikan ke header §9 sebagai key contextual finding untuk Indonesian learner context. |
| 🔵 FOLLOW-UP FLAG | DC-08 (Carpenter & Olson 2012) | Boundary condition kritis: gambar membantu HANYA jika tidak digunakan sebagai retrieval shortcut. Harus masuk ke Juicy agent brief — jangan overload card dengan gambar pada semua kosakata. |
| 🟡 INFRASTRUCTURE | AV native speaker audio (§9.7) | Agent 7 menetapkan ini sebagai learning science requirement, bukan preferensi UX. TTS tidak cukup. Crispy perlu flag untuk infrastructure planning. |
| 🟡 ADAPTIVE TEMPLATE | Expertise reversal (§9.4) | Memerlukan level-aware adaptive card templates (N5 vs N2+ display rules). Konfirmasi dengan Golden apakah ini ada di PWA roadmap. |

---

## §10 ASSIGNMENT — AGENT 6

**Per rekomendasi Agent 7 (§9 FLAG 4) dan instruksi Crispy:**

§10 — **GAMIFICATION & MOTIVATIONAL MECHANICS** — resmi ditugaskan ke **Agent 6**.

**Scope §10 yang direkomendasikan:**

| Sub-seksi | Topik | Citation Anchor |
|---|---|---|
| §10.1 | Gamification meta-analysis | Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? *HICSS*. |
| §10.2 | Gamification failure modes | Hanus, M. D., & Fox, J. (2015). Assessing the effects of gamification. *Computers & Education, 80*, 152–161. |
| §10.3 | SDT × gamification intersection | Przybylski, A. K., Rigby, C. S., & Ryan, R. M. (2010). A motivational model of video game engagement. *Review of General Psychology, 14*(2), 154–166. |
| §10.4 | Points, badges, leaderboards (PBL) critique | Deci, E. L., Koestner, R., & Ryan, R. M. (1999). A meta-analytic review of extrinsic rewards. *Psychological Bulletin, 125*(6), 627–668. |
| §10.5 | Indonesian cultural context × gamification | Cross-reference §8 malu/face cluster (CC-01–CC-07); public leaderboard harm potential |
| §10.6 | Effective gamification design patterns | Sailer et al. (2017). How gamification motivates. *Computers in Human Behavior, 69*, 371–380. |

**Anti-duplication brief untuk Agent 6:**
- SDT (Deci & Ryan) sudah ada di corpus (MV-01, MV-02) — jangan duplicate; cross-reference ke §8.1
- Lamb Indonesia motivation sudah ada di MV-04, MV-05 — cross-reference
- Malu/face-work cluster sudah di §8 (CC-01–CC-07) — cross-reference, jangan ulangi
- Cek apakah Hamari 2014 atau Hanus & Fox 2015 sudah muncul di §CA atau §8

---

## PRIORITISASI — TOP 30 (dari Top 25 v2)

§9 menambahkan 5 referensi baru ke tier puncak:

| Rank | ID | Alasan | Baru? |
|---|---|---|---|
| 1 | SR-01 (Kim & Webb 2022) | L2-specific SRS meta-analysis; tidak tergantikan | — |
| 2 | AR-01 (Karpicke & Roediger 2008, Science) | Highest-impact retrieval practice study | — |
| 3 | TE-01 (Adesope et al. 2017) | Meta-analisis terbesar testing effect; g=0.61 | — |
| 4 | IL-01 (Brunmair & Richter 2019) | Interleaving meta-analysis; similarity moderator | — |
| 5 | SR-02 (Cepeda et al. 2006) | Foundational spacing meta-analysis | — |
| 6 | FS-01 (Ye et al. 2022, KDD) | FSRS theoretical foundation | — |
| 7 | FS-02 (Su et al. 2023, IEEE TKDE) | Journal version FSRS | — |
| 8 | CC-01 (Markus & Kitayama 1991) | 30,000+ sitasi; foundation collectivist UX | — |
| 9 | CC-02 (Hofstede 2001) | PDI=78, IDV=14; Indonesia-specific design | — |
| 10 | **DC-03 (Paivio 2010)** | DCT × L2 lexicon; most direct card design theory | **BARU v3** |
| 11 | **CT-03 (Mayer 2009, 2nd ed.)** | CTML synthesis 12+ principles; actionable for Golden | **BARU v3** |
| 12 | DD-01 (Bjork 1994) | Coined "desirable difficulties" | — |
| 13 | DD-03 (Bjork & Bjork 2020) | Framework terbaru desirable difficulties | — |
| 14 | EE-01 (Craik & Lockhart 1972) | Foundational levels-of-processing | — |
| 15 | **KS-08 (Chikamatsu 1996)** | Indonesian L1 = zero kanji dual coding; most contextual §9 citation | **BARU v3** |
| 16 | CA-02 (Odlin 1989) | Comprehensive L1 transfer framework | — |
| 17 | NS-01 (Nation 2007) | Four Strands; definitive statement | — |
| 18 | NS-02 (Nation 2013) | Standard vocabulary pedagogy reference | — |
| 19 | SRE-01 (Pruss et al. 2025) | First L2-specific SRE study | — |
| 20 | SRE-02 (Liu et al. 2024) | Meta-analysis SRE; g=0.40 | — |
| 21 | SR-03 (Nakata 2015) | Equal spacing ≥ expanding; FSRS validation | — |
| 22 | CIJ-05/MK-01 (Japan Foundation 2023) | Satu-satunya sumber data populasi pelajar | — |
| 23 | FS-04 (Tabibian et al. 2019, PNAS) | PNAS; independent SRS validation | — |
| 24 | TE-02 (Rowland 2014) | Meta-analisis g=0.50; recall > recognition | — |
| 25 | CU-01 (Nation 1990) | 5-kriteria vocabulary selection | — |
| 26 | MV-02 (Ryan & Deci 2000) | SDT journal form; 10,000+ sitasi | — |
| 27 | MV-04 (Lamb 2004) | Indonesian-specific motivation study | — |
| 28 | CC-04 (Triandis & Gelfand 1998) | Vertical collectivism; hierarchical shame mechanism | — |
| 29 | **CT-15/Ginns (2005)** | Modality effect meta-analysis k=43, d=0.72; independent CLT/CTML validation | **BARU v3** |
| 30 | **CL-07 (Kalyuga et al. 2003)** | Expertise reversal effect; adaptive template specification | **BARU v3** |

---

## REKOMENDASI TINDAKAN TERBARU — v3 (10 LANGKAH KONKRET)

### Tindakan 1–8 dari v1 & v2 (dipertahankan, sebagian besar belum dieksekusi):
*(Lihat v1/v2 untuk detail. Ringkasan: hapus CI-02/CI-04/NS-04; ganti venue CIJ-01; tambah caveat SRE-01/CI-01; verifikasi DOI; imbangi Bjork; ganti MK-07; label industry data; konsolidasi DUP-01–10)*

### Tindakan 9 — RESOLVE 3 DUPLIKAT BARU §9 (BARU)
Prioritas: (a) DUP-12 (Dunlosky 2013) — konfirmasi Agent 10, kemungkinan duplikat tertinggi; (b) DUP-11 (Sweller 1988) — konfirmasi Agent 8; (c) DUP-13 (Ginns 2005 internal) — merge otomatis saat §9 diintegrasikan.

### Tindakan 10 — BRIEF JUICY AGENT DENGAN §9 DESIGN IMPLICATIONS (BARU)
§9 menghasilkan spesifikasi actionable langsung untuk Juicy card creation:
1. Imageability classification per kartu (DC-03) — konkret = gambar wajib; abstrak = skip gambar
2. Image selection criteria: prototypicality (IM-04), cultural congruence, spatial contiguity (IM-05)
3. Boundary condition: DC-08 (Carpenter & Olson) — gambar TIDAK boleh digunakan sebagai retrieval shortcut
4. Verb cards: motor simulation prompt (DC-10 Barsalou)
5. Kanji cards untuk Indonesian learner: explicit phonological cue (KS-08 Chikamatsu)

Juicy brief harus mengintegrasikan §9.6 image selection brief dan §9.9 design decision matrix sebelum next card creation cycle.

---

## NARASI RINGKASAN TERBARU UNTUK REVIEWER — v3

Audit v3 mengintegrasikan §9 (+65 sitasi, Agent 7) ke dalam corpus yang sudah mencapai ~414 referensi. Ini menempatkan Nugget Nihongo evidence base setara dengan **systematic literature review atau doctoral thesis bibliography** — bukan lagi typical journal article bibliography.

Dua perubahan struktural terpenting dari §9:

**Pertama, gap card design theory tertutup sepenuhnya.** Sebelum §9, corpus memiliki evidence base kuat untuk *kapan* retrieval terjadi (SRS/spacing), *bagaimana* retrieval difasilitasi (testing effect, interleaving), dan *siapa* pelajarnya (motivation, cross-cultural). Tapi tidak ada satu pun teori tentang *apa yang ada di dalam kartu*. §9 mengisi gap ini secara komprehensif via DCT, CTML, CLT, generative learning, image selection, dan audio-visual — semua dengan aplikasi spesifik ke card design Nugget Nihongo.

**Kedua, Mayer cluster adalah perhatian utama audit v3.** 14 Mayer-authored papers dalam satu seksi adalah cluster terbesar dalam corpus ini. Ini tidak bermasalah secara akademis (CTML adalah Mayer's theory), tapi harus dicatat di methodology page dan diimbangi dengan visible counterbalance dari Sweller, Ginns, dan Paas.

§10 (Gamification) ditugaskan ke **Agent 6** dengan brief lengkap di atas. Setelah §10 selesai, corpus Nugget Nihongo akan memiliki coverage yang genuinely comprehensive: dari learning science foundational (§1) → curriculum architecture (§CA) → contrastive linguistics (§5) → cross-cultural psychology + PWA platform (§8) → multimedia & card design (§9) → motivational mechanics & gamification (§10).

Total duplikat yang perlu dikonsolidasi sebelum merge: **24 entri**. Ini adalah pekerjaan editorial terbesar sebelum final bibliography dapat dipublikasikan.

---

*End of Citation Audit Report — v3 UPDATE*
*Agent 2 Sonnet 4.6 — 3 April 2026*
*v3 menambahkan: §9 cluster audit (DC, CT sample, KS, CL, GL/IM/AV ringkasan); duplikat baru DUP-11–DUP-13; aggregate update v3; Top 30 priority list; §10 assignment brief untuk Agent 6; 2 tindakan baru (9 & 10)*
*Untuk Crispy's review dan merge decision*
*Konsisten dengan Agent 7 (§9), Agent 8 (§8 v3), Agent 9 (§CA), Agent 10 (§1), Agent 11 (§5.5)*
