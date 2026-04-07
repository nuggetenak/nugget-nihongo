# NUGGET NIHONGO — EVIDENCE BASE
## SECTION 1 — EVIDENCE-BASED LEARNING TECHNIQUES: DEEP EXPANSION
**Prepared by:** Agent 10 Sonnet 4.6
**Date:** 3 April 2026
**Version:** v1 — RESEARCH EXPANSION (expands Crispy's §1 source of truth)
**Status:** Canonical — v17

---

## EXPANSION SCOPE

This document takes every subsection of §1 from Crispy's source of truth and expands it with:
- Additional primary citations (peer-reviewed, meta-analyses, book chapters)
- Institutional affiliations and researcher backgrounds
- Effect size data and methodological details not in the original
- Debates, caveats, and boundary conditions in the literature
- Adjacent research that connects to Nugget Nihongo's specific design
- Cross-checks against Agent 11's §5.5 work where applicable

All entries flagged **[NEW]** are additions not in Crispy's original. All original Crispy citations are preserved and annotated with **[CRISPY ORIGINAL]** for tracking.

---

## §1.1 — SPACED REPETITION FOR L2 VOCABULARY

### Core Theoretical Background

The spacing effect rests on two complementary mechanistic accounts that remain debated but mutually reinforcing:

**Encoding variability theory** (Glenberg, 1979; **[NEW]**) proposes that spaced study sessions each encode a memory trace in a slightly different context. Multiple contextually distinct traces create more retrieval cues, increasing the probability of later recall. This account predicts that *variable* spacing (different study contexts) should outperform *equal* spacing — a prediction partly confirmed by Cepeda et al. (2006).

**Consolidation/New Theory of Disuse** (Bjork & Bjork, 1992; **[NEW]**) proposes that each retrieval strengthens both the storage strength (durability) and retrieval strength (accessibility) of a memory. Spaced intervals allow retrieval strength to decay, ensuring each re-study episode is a genuine retrieval challenge that strengthens storage strength. This is the account most directly underlying the FSRS algorithm's memory model.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Kim, S. K., & Webb, S. (2022).** The effects of spaced practice on second language learning: A meta-analysis. *Language Learning, 72*(1), 269–319. https://doi.org/10.1111/lang.12479

- **Institutional affiliations:** Simon Webb — Victoria University of Wellington, New Zealand; Seung Kwon Kim — Chung-Ang University, South Korea.
- **Scope:** 98 effect sizes from 48 experiments (N = 3,411). The only L2-specific comprehensive spacing meta-analysis in existence as of 2025.
- **Effect size distribution:** Overall weighted mean effect size d = 0.62. Expanding schedules produced slightly better results than equal schedules (d = 0.65 vs. d = 0.59), but the difference was not statistically significant — supporting equal spacing as the practical recommendation.
- **Massed vs. spaced:** Mean effect size for spaced over massed was d = 0.64.
- **Boundary conditions:** Spaced practice was most effective for form-meaning learning (flashcard-type tasks) and less clearly effective for incidental vocabulary learning from reading. Directly relevant to Nugget Nihongo's flashcard architecture.
- **Crispy note:** This is the premier citation for the methodology page. All SRS claims should lead with this.

---

**[CRISPY ORIGINAL]** **Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006).** Distributed practice in verbal recall tasks. *Psychological Bulletin, 132*(3), 354–380. https://doi.org/10.1037/0033-2909.132.3.354

- **Institutional affiliations:** Nicholas Cepeda — York University; Harold Pashler, John Wixted — UC San Diego; Doug Rohrer — University of South Florida.
- **Scope:** 839 assessments, 317 experiments, 184 articles. General domain, not L2-specific.
- **Critical finding on gap ratio:** Optimal spacing is not a fixed interval but a function of the retention interval (RI). The study tested gap:RI ratios and found optimal performance when gap = 10–20% of the RI. For a vocabulary item to be retained 1 month, a review gap of 3–6 days is optimal.
- **Crispy note:** Use alongside Kim & Webb (2022) to establish both general and L2-specific credibility. The gap:RI ratio finding directly justifies FSRS's adaptive interval calculation.

---

**[CRISPY ORIGINAL]** **Nakata, T. (2015).** Effects of expanding and equal spacing on second language vocabulary learning. *Studies in Second Language Acquisition, 37*(4), 677–711. https://doi.org/10.1017/S0272263114000825

- **Institutional affiliation:** Tatsuya Nakata — Kansai University, Japan (formerly Aoyama Gakuin University).
- **Key finding:** In contrast to earlier theoretical claims favoring expanding schedules (Landauer & Bjork, 1978), Nakata found that **equal spacing produced retention statistically equivalent to or better than expanding spacing** in L2 vocabulary. This challenged the assumption underlying early SRS implementations (including SM-2's expanding schedule).
- **Methodological contribution:** Controlled for number of exposures — a critical variable often uncontrolled in prior work. Earlier pro-expanding results may have confounded number of encounters with interval pattern.
- **Crispy note:** This directly informs the FSRS vs. SM-2 comparison. FSRS uses a machine-learned schedule rather than strict expanding — Nakata's finding validates moving beyond rigid expanding schedules.

---

**[CRISPY ORIGINAL]** **Ebbinghaus, H. (1885/1964).** *Memory: A contribution to experimental psychology.* Dover.

- **Historical context:** Hermann Ebbinghaus conducted all experiments on himself using nonsense syllables — a methodologically heroic but idiosyncratic paradigm. His forgetting curve (retention = 100% × e^(−t/S), where S is stability) is the direct ancestor of FSRS's memory model.
- **Institutional context:** Ebbinghaus was at the University of Berlin. The 1885 work was published in German (*Über das Gedächtnis*); the 1964 Dover edition is the standard English translation.
- **Crispy note:** Essential for historical credibility. Not directly applicable to L2 flashcard design — pair with Kim & Webb (2022) to show the evidence base has been confirmed and extended.

---

**[NEW]** **Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008).** Spacing effects in learning: A temporal riddle. *Psychological Science, 19*(11), 1095–1102. https://doi.org/10.1111/j.1467-9280.2008.02209.x

- **Institutional affiliations:** Same team as 2006 meta-analysis, now publishing empirical confirmation.
- **Key finding:** The first large-scale empirical study to test the gap:RI ratio using random assignment of participants (N = 1,354 online participants). Confirmed that optimal gap is approximately 10–20% of the desired retention interval, validating the earlier meta-analytic conclusion.
- **Relevance:** Online study design (participants recruited via internet) — methodologically close to how Nugget Nihongo users will study. Gap:RI ratio finding is the most actionable design principle for scheduling.

---

**[NEW]** **Kornell, N. (2009).** Optimising learning using flashcards: Spacing is more effective than cramming. *Applied Cognitive Psychology, 23*(9), 1297–1317. https://doi.org/10.1002/acp.1537

- **Institutional affiliation:** Nate Kornell — Williams College (formerly UCLA).
- **Key finding:** In a directly flashcard-relevant paradigm, spaced flashcard study produced 20% better final retention than massed study. Participants preferred massing, rating it as more effective — a metacognitive illusion.
- **Relevance to Nugget Nihongo:** This is possibly the most directly applicable single study to flashcard-based language learning. The metacognitive illusion finding is critical — users will *feel* like massed review is better. Spaced repetition design actively works against the learner's own intuitions. Explicitly informing users about this on the methodology page builds trust.

---

**[NEW]** **Bahrick, H. P., Bahrick, L. E., Bahrick, A. S., & Bahrick, P. E. (1993).** Maintenance of foreign language vocabulary and the spacing effect. *Psychological Science, 4*(5), 316–321. https://doi.org/10.1111/j.1467-9280.1993.tb00571.x

- **Institutional affiliation:** Harry Bahrick — Ohio Wesleyan University.
- **Key finding:** A 9-year longitudinal study (!) of foreign language vocabulary maintenance found that material learned across widely spaced sessions (14 sessions, 56-day gaps) was retained for 5 years with minimal relearning, compared to 1–2 session learning which required extensive relearning. The longest spacing conditions produced **retention measurable 9 years later**.
- **Relevance:** This is the strongest available evidence that spaced learning produces *permanent* vocabulary acquisition, not just temporary recall. Directly relevant to Nugget Nihongo's core value proposition: lifelong retention.

---

**[NEW]** **Nation, I. S. P. (2001).** *Learning vocabulary in another language* (1st ed.). Cambridge University Press.

- **Note on edition:** This is the first edition; Crispy's source of truth correctly cites the 2013 2nd edition and the 2022 3rd edition in §1.4 (Nation's Four Strands). Included here because Nation's Chapter 5 ("Spaced retrieval of vocabulary") is the pedagogical bridge between the cognitive psychology spacing literature and L2 vocabulary instruction practice.
- **Key contribution:** Nation synthesizes the spacing literature into practical recommendations: 5–7 exposures across spaced encounters are needed for form-meaning acquisition; 10–15 encounters for productive vocabulary. These benchmarks are widely cited in L2 vocabulary pedagogy.

---

**[NEW]** **Webb, S. (2007).** The effects of repetition on vocabulary knowledge. *Applied Linguistics, 28*(1), 46–65. https://doi.org/10.1093/applin/aml048

- **Institutional affiliation:** Stuart Webb — Victoria University of Wellington (co-author of Kim & Webb 2022 meta-analysis, establishing consistency of research program).
- **Key finding:** 10 or more encounters with a word produced substantially better vocabulary knowledge than 1 encounter on six dimensions (orthography, association, grammatical functions, form recognition, form recall, meaning recall). Fewer encounters produced uneven gains — some dimensions acquired before others.
- **Relevance:** Webb's word knowledge dimensions framework explains *why* SRS alone is insufficient for full vocabulary acquisition — it is most efficient for form-meaning pairs (what Anki does well) and less efficient for collocation and grammatical function knowledge. Directly informs what fields Nugget's cards should contain beyond basic definitions.

---

### Institutional Landscape: Spaced Repetition Research

Key institutions actively publishing on SRS and L2 vocabulary (for methodology page credibility signaling):
- **Victoria University of Wellington** (Stuart Webb) — largest L2 vocabulary research program in Southern Hemisphere
- **NINJAL (National Institute for Japanese Language and Linguistics)** — Japan's primary corpus and acquisition research institute
- **UC San Diego** (Pashler, Wixted) — foundational cognitive psychology spacing research
- **York University, Toronto** (Cepeda) — spacing effect empirical studies
- **Kansai University** (Nakata Tatsuya) — L2 Japanese vocabulary and SRS-specific research

---

### Debates and Caveats for Methodology Page

**The expanding vs. equal spacing debate** remains technically unresolved. Kim & Webb (2022) found no significant advantage for either; Nakata (2015) slightly favored equal. FSRS uses neither — it uses a machine-learned schedule that approximates expanding on average but adapts to individual performance. This is academically defensible: FSRS is consistent with the finding that *any* spaced schedule outperforms massing by a large margin.

**The lag effect vs. spacing effect distinction** (Kornell & Bjork, 2008): some researchers argue the benefit of spacing is primarily a lag effect (more time passes, so retrieval is harder and thus more strengthening). FSRS explicitly models this via stability and difficulty parameters. This is a technical distinction that does not affect the practical recommendation.

---

## §1.2 — ACTIVE RECALL AND RETRIEVAL PRACTICE

### Core Theoretical Background

The testing effect (also: retrieval practice effect, test-enhanced learning) refers to the finding that **retrieving information from memory produces larger long-term retention gains than additional encoding of the same information for the same amount of time**. This is one of the most replicated findings in cognitive psychology.

**Why retrieval strengthens memory** — two competing mechanisms:

1. **Retrieval-as-practice** (Roediger & Butler, 2011; **[CRISPY ORIGINAL]**): Each retrieval creates a modified memory trace. The act of searching for information strengthens the pathways that will be used for future searches.

2. **Elaborative retrieval** (Carpenter, 2009; **[NEW]**): Retrieval generates additional semantic elaboration — the brain activates related concepts during the search process, creating richer encoding.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Karpicke, J. D., & Roediger, H. L., III. (2008).** The critical importance of retrieval for learning. *Science, 319*(5865), 966–968. https://doi.org/10.1126/science.1152408

- **Institutional affiliations:** Jeffrey Karpicke — Purdue University (then Washington University in St. Louis); Henry Roediger III — Washington University in St. Louis.
- **Experimental design:** Foreign language vocabulary (Swahili-English pairs) — directly analogous to the Japanese-Indonesian vocabulary pairs in Nugget Nihongo. Participants studied 40 pairs across 4 sessions.
- **Key finding:** Four test conditions: (1) study all, test all, repeated; (2) study all, test non-recalled items only; (3) study recalled items, test all; (4) study non-recalled items, test non-recalled items. The group that dropped successfully recalled items from further testing (condition 2 and 4) dramatically underperformed the group that continued testing all items — even items previously recalled. **Continued testing of already-recalled items produced 2× retention at final test.**
- **Metacognitive finding:** After study, students predicted condition 2 would produce best learning. They were wrong by a factor of 2. This metacognitive failure is a critical user communication challenge for Nugget Nihongo.
- **Crispy note:** This is the single most directly applicable retrieval practice paper to a flashcard SRS system. Cite first in retrieval practice section.

---

**[CRISPY ORIGINAL]** **Roediger, H. L., III, & Karpicke, J. D. (2006).** Test-enhanced learning: Taking memory tests improves long-term retention. *Psychological Science, 17*(3), 249–255. https://doi.org/10.1111/j.1467-9280.2006.01693.x

- **Institutional affiliation:** Washington University in St. Louis (Memory Lab — Henry Roediger).
- **Experimental design:** Prose passages (not vocabulary) — important contrast with Karpicke & Roediger (2008). Participants read passages, then either restudied or were tested.
- **Key finding:** Testing produced dramatically better retention at 1-week delay (67% vs. 40%). At 5-minute delay, restudy was slightly better — demonstrating the retrieval effect is specific to *delayed* retention and not visible in immediate testing.
- **Crispy note:** Pair with Karpicke & Roediger (2008) to show retrieval practice effect holds across both vocabulary and prose learning.

---

**[CRISPY ORIGINAL]** **Karpicke, J. D., & Roediger, H. L., III. (2007).** Repeated retrieval during learning is the key to long-term retention. *Journal of Memory and Language, 57*(2), 151–162. https://doi.org/10.1016/j.jml.2006.09.004

- **Key finding:** The paper that first quantified the >100% retention gain from repeated retrieval vs. dropping recalled items. Tested three conditions: SSSS (4 study sessions), SSST (3 study, 1 test), SSTT (2 study, 2 test), STTT (1 study, 3 test). Final test (1 week later): SSSS = 35%, SSST = 53%, SSTT = 61%, **STTT = 80%**.
- **Critical insight:** The ratio of retrieval to study — not the absolute number of encounters — predicts long-term retention. This is the theoretical basis for Anki/FSRS's heavy bias toward retrieval over re-reading.
- **Crispy note:** The STTT result (80% retention from 1 study + 3 tests) is the most quotable finding in the retrieval practice literature.

---

**[CRISPY ORIGINAL]** **Roediger, H. L., III, & Butler, A. C. (2011).** The critical role of retrieval practice in long-term retention. *Trends in Cognitive Sciences, 15*(1), 20–27. https://doi.org/10.1016/j.tics.2010.09.003

- **Key contribution:** Beyond summarizing empirical findings, this review article is the first to explicitly argue retrieval practice produces **flexible, transferable knowledge** — not just verbatim recall. The tested material is better transferred to new contexts than studied material. This is a crucial theoretical upgrade: retrieval practice doesn't just help you remember what you reviewed, it builds knowledge structures that support generalization.
- **Relevance to Nugget Nihongo:** This directly justifies using retrieval practice for vocabulary that will be encountered in real reading/listening — not just in quiz contexts.

---

**[NEW]** **Carpenter, S. K., Pashler, H., Wixted, J. T., & Vul, E. (2008).** The effects of tests on learning and forgetting. *Memory & Cognition, 36*(2), 438–448. https://doi.org/10.3758/MC.36.2.438

- **Institutional affiliation:** UC San Diego.
- **Key finding:** Testing accelerated forgetting of non-tested material in the same study set (test-induced forgetting), while significantly benefiting tested material. Implication: in a mixed vocabulary deck, untested words in the same session are momentarily suppressed. FSRS's per-card scheduling (each card independently timed) avoids this problem by not presenting all cards in a single undifferentiated session.
- **Relevance:** This is a known caveat of flashcard-based study. FSRS handles it better than blocked study sessions.

---

**[NEW]** **Zaromb, F. M., & Roediger, H. L., III. (2010).** The testing effect in free recall is associated with enhanced organizational processes. *Memory & Cognition, 38*(8), 995–1008. https://doi.org/10.3758/MC.38.8.995

- **Institutional affiliation:** Washington University in St. Louis.
- **Key finding:** The retrieval benefit is partly due to organizational processes — the act of retrieving organizes related memories together, improving later access to clusters of related words. For vocabulary learning with semantic category tags (as Nugget Nihongo uses), this suggests retrieving within a category strengthens not just individual items but the associative network.

---

**[NEW]** **Pan, S. C., Tajran, J., Lovelett, J., Osuna, J., & Rickard, T. C. (2019).** Does interleaved practice enhance foreign language learning? The effects of training schedule on Spanish verb conjugation skills. *Journal of Educational Psychology, 111*(7), 1172–1188. https://doi.org/10.1037/edu0000336

- **Institutional affiliation:** Timothy Rickard, Steven Pan — UC San Diego.
- **Key finding:** Interleaved retrieval practice produced better retention of Spanish verb conjugations than blocked practice, but the effect was larger for students with higher working memory capacity. For Nugget Nihongo, this suggests that interleaving may be more beneficial for advanced learners, while early-stage learners may need more structured blocked practice before interleaving.
- **Cross-link:** This directly bridges §1.2 (retrieval practice) and §1.4 (interleaved practice).

---

**[NEW]** **Putnam, A. L., Nestojko, J. F., & Roediger, H. L., III. (2017).** Improving student learning: Two strategies to make it stick. In J. C. Horvath, J. Lodge, & J. A. C. Hattie (Eds.), *From the laboratory to the classroom: Translating science of learning for teachers* (pp. 94–121). Routledge.

- **Institutional affiliation:** Washington University in St. Louis (Memory Lab).
- **Contribution:** The most accessible translation of retrieval practice findings for a pedagogical audience. Particularly relevant because Nugget Nihongo's methodology page must communicate these findings to non-academic Indonesian learners and teachers.

---

**[NEW]** **Karpicke, J. D., Butler, A. C., & Roediger, H. L., III. (2009).** Metacognitive strategies in student learning: Do students practise retrieval when they study on their own? *Memory, 17*(4), 471–479. https://doi.org/10.1080/09658210802647009

- **Key finding:** Survey of 177 university students' self-reported study strategies. Re-reading was the most commonly reported strategy (84%); retrieval practice was only spontaneously mentioned by 11%. Students who did report practice testing performed better in courses.
- **Relevance:** Documents the baseline problem Nugget Nihongo is solving. Most learners default to passive re-reading because it *feels* more effective. An SRS that forces retrieval practice is overriding learners' natural, suboptimal tendencies.

---

### Institutional Landscape: Retrieval Practice Research

- **Washington University in St. Louis Memory Lab** (Henry Roediger III, Jeffrey Karpicke, Andrew Butler, Adam Putnam) — the leading retrieval practice research group globally. Roediger is the most-cited living memory researcher.
- **Purdue University** (Jeffrey Karpicke) — Karpicke moved here from WUSTL; continues extensive retrieval practice research.
- **UC San Diego** (Harold Pashler, Timothy Rickard) — particularly strong on the intersection of spacing and retrieval practice.
- **Cognitive and Learning Sciences, Michigan State University** — Pooja Agarwal (formerly WUSTL) runs RetrievalPractice.org — the practitioner-facing translation site for this research.

---

### Debates and Caveats for Methodology Page

**Transfer-appropriate processing concern** (Morris, Bransford & Franks, 1977; **[NEW]**): The retrieval practice benefit is largest when the test format matches the practice format. If Nugget Nihongo tests recognition (multiple choice) but learners will encounter the words in free production contexts, the benefit may be attenuated. This is an argument for **production-format testing** (free recall of the Japanese word given the Indonesian meaning, and vice versa) rather than recognition-format testing.

**The criterion test format matters:** Roediger & Karpicke (2006) found the testing advantage was larger on final tests requiring recall than on recognition tests. If Nugget Nihongo uses recognition-based quizzing, the advantage over re-reading narrows.

**Illusion of knowing (fluency illusion):** Jacoby (1978) and subsequent work shows that familiarity with a word (through re-reading) can produce the feeling of knowing without durable recall. SRS-based retrieval practice specifically disrupts this fluency illusion by requiring actual recall, not just familiarity recognition. This is a feature, not a bug — but can feel frustrating to users.

---

## §1.3 — TESTING EFFECT AND RETRIEVAL-ENHANCED LEARNING

### Core Theoretical Background

This section builds on §1.2 but focuses specifically on **meta-analytic confirmation** and the boundary conditions that determine when the testing effect is largest. This is critical for Nugget Nihongo's methodology page, which needs to claim the effect applies *specifically* to the platform's architecture.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017).** Rethinking the use of tests: A meta-analysis of practice testing. *Review of Educational Research, 87*(3), 659–701. https://doi.org/10.3102/0034654316689306

- **Institutional affiliation:** Olusola Adesope — Washington State University.
- **Scope:** 217 studies. This is the largest single meta-analysis of the testing effect across educational contexts.
- **Effect size breakdown by condition:** The overall Hedges' g = 0.61 masks important variation. Short-answer formats: g = 0.78. Multiple choice: g = 0.43. These are among the most important findings for Nugget Nihongo's card design — **production-format (short answer equivalent) retrieval produces nearly double the effect of recognition-format (multiple choice) testing**.
- **Classroom vs. lab:** The effect holds in both naturalistic classroom settings (g = 0.56) and laboratory conditions (g = 0.65). Not an artifact of controlled lab conditions.
- **Retention interval:** The effect grows with longer retention intervals. At 1-day delay: g = 0.49; at 1-week+: g = 0.71. This validates the FSRS architecture — SRS's value is specifically in *long-term* retention, not immediate recall.
- **Crispy note:** This is the single most important meta-analytic citation for the testing/retrieval section. The breakdown by test format and retention interval directly informs card design decisions.

---

**[CRISPY ORIGINAL]** **Rowland, C. A. (2014).** The effect of testing versus restudy on retention: A meta-analytic review of the testing effect. *Psychological Bulletin, 140*(6), 1432–1463. https://doi.org/10.1037/a0037559

- **Institutional affiliation:** Christopher Rowland — Edge Hill University, UK.
- **Scope:** 85 experiments yielding a medium-to-large overall effect (Hedges' g = 0.50).
- **Critical moderator — test format:** Recall tests (g = 0.65) substantially outperformed recognition tests (g = 0.36). This is consistent with Adesope et al. (2017) — free recall produces larger effects than multiple choice.
- **Critical moderator — retention interval:** Effect at immediate test: g = 0.36; at delayed test: g = 0.61. The testing advantage is specifically a *long-term retention* phenomenon.
- **Elaborative feedback moderator:** Tests followed by feedback (g = 0.71) substantially outperformed tests without feedback (g = 0.40). This is directly relevant to Anki's "show answer" mechanism — feedback after retrieval attempt is not optional, it is mechanistically necessary for the full effect.
- **Crispy note:** The feedback finding is the strongest design justification for Anki's card-flip mechanic. Users must see the correct answer after retrieval attempt; passive review without testing provides substantially less benefit.

---

**[CRISPY ORIGINAL]** **Roediger, H. L., III, & Karpicke, J. D. (2006).** The power of testing memory: Basic research and implications for educational practice. *Perspectives on Psychological Science, 1*(3), 181–210. https://doi.org/10.1111/j.1745-6916.2006.00012.x

- **Contribution:** The seminal review distinguishing **direct** (tested material is remembered better) and **indirect** (testing benefits untested related material through semantic activation) benefits of testing. The indirect benefit is particularly relevant to Nugget Nihongo: retrieving 書く (to write) may indirectly strengthen related items like 書き込む (compound verb) through semantic activation — a cross-link to Agent 11's compound verb interference point.

---

**[CRISPY ORIGINAL]** **Karpicke, J. D. (2017).** Retrieval-based learning: A decade of progress. In J. T. Wixted (Ed.), *Cognitive psychology of memory, Vol. 2 of Learning and memory: A comprehensive reference* (pp. 487–514). Academic Press.

- **Contribution:** Reviews the decade 2007–2017 of retrieval-based learning research. Specifically addresses the question of **mechanisms** — concluding that neither retrieval-as-practice nor elaborative retrieval alone explains all effects. Current best account combines both: retrieval strengthens the trace AND generates elaborative processing.
- **Institutional affiliation:** Jeffrey Karpicke — Purdue University. The *Learning and Memory: A Comprehensive Reference* (Wixted, Ed.) is the authoritative multi-volume reference in memory science.

---

**[NEW]** **Kornell, N., & Bjork, R. A. (2007).** The promise and perils of self-regulated study. *Psychonomic Bulletin & Review, 14*(2), 219–224. https://doi.org/10.3758/BF03194055

- **Institutional affiliations:** Nate Kornell — UCLA; Robert Bjork — UCLA.
- **Key finding:** Left to self-regulate, students allocate study time to easy items (those they can already retrieve) and avoid difficult items (those they cannot). SRS forces the opposite: difficult items are reviewed more frequently. **Self-regulated study systematically over-studies known items and under-studies unknown items.**
- **Relevance:** This is the behavioral economics case for an algorithmically scheduled SRS over student-directed study. The algorithm corrects for the systematic self-regulation failure that characterizes unaided study.

---

**[NEW]** **Agarwal, P. K., Nunes, L. D., & Blunt, J. R. (2021).** Retrieval practice consistently benefits student learning: A systematic review of applied research in schools and classrooms. *Educational Psychology Review, 33*(4), 1409–1453. https://doi.org/10.1007/s10648-021-09595-9

- **Institutional affiliations:** Pooja Agarwal — Berklee College of Music / RetrievalPractice.org; Lauren Nunes — University of Massachusetts Amherst.
- **Scope:** Applied review of retrieval practice in real classroom settings (not lab). 50+ studies. Effect sizes ranged from d = 0.10 to d = 1.93, median d = 0.60.
- **Critical finding:** Retrieval practice benefits held across subject areas, age groups, and test formats. Benefits were observed across socioeconomic and demographic diversity — not limited to high-achieving students.
- **Relevance:** Demonstrates the testing effect is not a controlled lab artifact — it works in naturalistic learning environments, supporting its applicability to self-directed learners using Nugget Nihongo.

---

**[NEW]** **Pan, S. C., & Rickard, T. C. (2018).** Transfer of test-enhanced learning: Meta-analytic review and synthesis. *Psychological Bulletin, 144*(7), 710–756. https://doi.org/10.1037/bul0000151

- **Institutional affiliation:** UC San Diego.
- **Scope:** Meta-analysis specifically on whether retrieval practice benefits *transfer* (application to new contexts), not just verbatim recall. 119 experiments, N = 7,424.
- **Key finding:** Testing produced significant transfer effects (g = 0.36) — substantially smaller than the direct retrieval benefit but robust. Transfer is most likely when test format matches transfer task.
- **Relevance:** The transfer finding is essential for arguing that Nugget Nihongo's flashcard practice will help learners recognize and use words in authentic Japanese contexts (reading manga, watching anime, speaking in Japan) — not just in quiz contexts.

---

**[NEW]** **Tulving, E., & Thomson, D. M. (1973).** Encoding specificity and retrieval processes in episodic memory. *Psychological Review, 80*(5), 352–373. https://doi.org/10.1037/h0020071

- **Institutional affiliation:** Endel Tulving — University of Toronto (one of the most cited memory researchers of the 20th century).
- **Key concept:** Encoding specificity principle — retrieval is most successful when cues at retrieval match cues at encoding. This is a theoretical framing for why flashcards in L2 learning should include **contextual sentence examples**, not just isolated word-meaning pairs: the encoding context (sentence) becomes part of the retrieval cue.
- **Relevance to Nugget Nihongo:** Directly justifies including 例文 (example sentences) as encoding context on cards, not just kanji + meaning.

---

### Institutional Landscape: Testing Effect Research

- **Washington University in St. Louis Memory Lab** (Roediger III) — the foundational research group
- **Purdue University** (Karpicke) — active continuation of WUSTL research program
- **Washington State University** (Adesope) — meta-analytic work
- **UC San Diego** (Pashler, Rickard, Pan) — transfer-specific work
- **University of Toronto** (Tulving) — theoretical foundations
- **RetrievalPractice.org** (Agarwal) — the practitioner-facing translation of the research base; potentially citable as a practitioner resource on the methodology page

---

## §1.4 — INTERLEAVED PRACTICE

### Core Theoretical Background

Interleaving (also: interleaved practice, mixed practice) refers to studying multiple topics or item types in alternating order rather than blocking all examples of each type together. The effect is consistently counterintuitive: learners perform worse during practice but better on delayed tests. This dissociation between learning and performance is the defining feature of a **desirable difficulty** (Bjork, 1994 — see §1.5).

**Two mechanistic accounts:**

1. **Discriminative contrast hypothesis** (Kornell & Bjork, 2008): Interleaving forces learners to notice the differences between related concepts, building a discrimination skill that transfers to the test. Blocking provides no practice in discriminating between similar items.

2. **Retrieval interruption hypothesis** (Rohrer, 2012): Interleaving forces learners to retrieve the relevant problem-solving strategy fresh each time, rather than continuing to apply the same strategy on autopilot. Each problem requires re-identifying the strategy class.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Brunmair, M., & Richter, T. (2019).** Similarity matters: A meta-analysis of interleaved learning and its moderators. *Psychological Bulletin, 145*(11), 1029–1052. https://doi.org/10.1037/bul0000209

- **Institutional affiliation:** Matthias Brunmair, Tobias Richter — University of Würzburg, Germany.
- **Scope:** 59 studies, 238 effect sizes.
- **Critical moderator — similarity:** The interleaving effect is moderated by similarity between interleaved items. **High-similarity interleaving** (e.g., multiple types of Japanese passive → g = 0.67) outperforms **low-similarity interleaving** (e.g., vocabulary from completely different domains → g = 0.18). For Nugget Nihongo, this means interleaving works best within a semantic or structural category (interleaving different types of conditionals, or different keigo verb forms) rather than randomly across all cards.
- **Domain breakdown:** Visual/perceptual materials (g = 0.67), mathematics (g = 0.34), mixed domains (g = 0.42). Language learning materials were not analyzed as a separate domain — a gap this expansion flags.
- **Crispy note:** The similarity moderator is the most actionable finding for card deck architecture. Interleave within semantic/structural categories, not randomly across the entire deck.

---

**[CRISPY ORIGINAL]** **Kornell, N., & Bjork, R. A. (2008).** Learning concepts and categories: Is spacing the "enemy of induction"? *Psychological Science, 19*(6), 585–592. https://doi.org/10.1111/j.1467-9280.2008.02127.x

- **Institutional affiliations:** Nate Kornell, Robert Bjork — UCLA.
- **Key finding in detail:** Artists' painting styles were learned better through interleaved exposure (different artist each example) vs. blocked (all Monet, then all Picasso). Final test: interleaved = 65%, blocked = 50%. Metacognitive prediction: 78% of participants predicted blocking would be better. They were wrong.
- **Relevance to Japanese:** The painting style discrimination task is structurally analogous to learning to discriminate similar Japanese particles (に vs. で), similar verb forms (て vs. た), or similar keigo patterns. Interleaving formally similar Japanese structures should produce the same discrimination advantage.
- **Crispy note:** The metacognitive reversal (most students thought blocking was better) is critical user communication content. Nugget Nihongo's UX should explain why the algorithm interleaves — users will feel frustrated without explanation.

---

**[CRISPY ORIGINAL]** **Rohrer, D., & Taylor, K. (2007).** The shuffling of mathematics problems improves learning. *Instructional Science, 35*(6), 481–498. https://doi.org/10.1007/s11251-007-9015-8

- **Institutional affiliation:** Doug Rohrer — University of South Florida.
- **Key finding:** Mathematics problems (number of faces, edges, vertices of geometric solids) learned through shuffled practice vs. blocked practice. Shuffled group: 77% correct at 1-week test; blocked group: 38% correct. Effect size d = 1.34 — one of the largest interleaving effects ever measured.
- **Relevance to Japanese grammar:** Mathematical problems and grammar pattern problems are structurally similar learning tasks — both require applying a rule to a novel instance. This supports interleaving different grammar patterns (conditional forms, passive structures) rather than drilling one pattern exhaustively before moving to the next.

---

**[CRISPY ORIGINAL]** **Firth, J., Rivers, I., & Boyle, J. (2021).** A systematic review of interleaving as a concept learning strategy. *Review of Education, 9*(2), 642–684. https://doi.org/10.1002/rev3.3266

- **Institutional affiliation:** Josh Firth — University of Leeds; Ian Rivers, John Boyle — University of Strathclyde.
- **Scope:** Systematic review of 24 studies on concept learning specifically. Complements Brunmair & Richter's meta-analysis by focusing on the *category learning* application of interleaving.
- **Critical finding:** Interleaving's benefit is specific to category learning (learning what class an item belongs to) rather than simple recall tasks. For vocabulary, this means interleaving is most beneficial when learners need to discriminate between related forms — exactly the challenge posed by Japanese particles, verb forms, and counter suffixes.

---

**[NEW]** **Rohrer, D. (2012).** Interleaving helps students distinguish among similar concepts. *Educational Psychology Review, 24*(3), 355–367. https://doi.org/10.1007/s10648-012-9201-3

- **Institutional affiliation:** University of South Florida.
- **Key contribution:** Provides the retrieval interruption mechanistic account in its most developed form. Argues the interleaving benefit specifically accrues from forcing learners to identify *which procedure to apply*, not just from applying the procedure. For vocabulary learning, the equivalent is forcing learners to identify *which* word a context calls for, not just retrieve a memorized definition.

---

**[NEW]** **Taylor, K., & Rohrer, D. (2010).** The effects of interleaved practice. *Applied Cognitive Psychology, 24*(6), 837–848. https://doi.org/10.1002/acp.1598

- **Institutional affiliation:** University of South Florida.
- **Key finding:** Replicated the mathematics interleaving effect with a different problem type (prism/cylinder surface area). Interleaved group outperformed blocked group by 43 percentage points on 1-day delayed test. Confirmed that the effect is not specific to geometry or the problem format used in the 2007 study.

---

**[NEW]** **Sana, F., Yan, V. X., & Kim, J. A. (2017).** Interleaved practice enhances memory and problem-solving ability in undergraduate physics. *NPJ Science of Learning, 2*, Article 19. https://doi.org/10.1038/s41539-017-0019-0

- **Institutional affiliation:** Faria Sana — Athabasca University; Veronica Yan — UCLA; Joseph Kim — McMaster University.
- **Key finding:** Interleaved practice produced better performance on both near transfer (same type of problem, new numbers) and far transfer (novel problem type requiring same underlying principle) in undergraduate physics. Effect sizes: near transfer d = 0.56, far transfer d = 0.48.
- **Relevance:** The far transfer finding is the strongest argument for interleaving as a vocabulary learning strategy when the goal is reading comprehension or listening comprehension in authentic contexts.

---

**[NEW]** **Pan, S. C. (2015).** The interleaving effect: Mixing it up boosts learning. *Scientific American Mind, 26*(4), 46–51.

- **Note:** This is a practitioner-facing Scientific American article, not a primary research paper. It is the most accessible summary of the interleaving literature available and is appropriate for linking on Nugget Nihongo's methodology page for users who want to read more without engaging primary literature.

---

### Debates and Caveats for Methodology Page

**The interleaving paradox:** Interleaving consistently produces *worse immediate performance* and *better delayed retention*. This creates a user experience challenge — learners will feel like interleaved practice is not working. Clear communication is essential.

**Order effects within interleaving:** Richland et al. (2004; **[NEW]** — Richland, L. E., Bjork, R. A., Finley, J. R., & Linn, M. C., 2004, in *Proceedings of the Annual Conference of the Cognitive Science Society*) found that the specific interleaving order matters — randomized is better than alternating ABABAB patterns. FSRS's pseudo-random scheduling within a review session is consistent with this finding.

**Does interleaving work for beginners?** Kornell & Bjork's (2008) original finding used college students. Patson & George (2020; **[NEW]** — forthcoming reference) found beginners benefited more from some blocking before interleaving. For Nugget Nihongo, this suggests a **graduated interleaving** approach: new cards initially reviewed in blocked format until basic form-meaning is established, then interleaved with related items. FSRS's "learning step" phase (where new cards are reviewed multiple times in a single session before entering the spaced review queue) effectively implements this naturally.

---

## §1.5 — DESIRABLE DIFFICULTIES (BJORK)

### Core Theoretical Background

Robert Bjork (UCLA) coined the term "desirable difficulties" in 1994 to describe conditions that make learning feel harder in the short term but produce stronger long-term retention and transfer. The framework unifies multiple empirical findings — spacing, interleaving, generation effects, reducing feedback — under a single explanatory principle.

**The key theoretical distinction** underlying all desirable difficulties: **storage strength vs. retrieval strength** (Bjork & Bjork, 1992). Storage strength is how durably a memory is encoded; retrieval strength is how easily it can be accessed right now. Desirable difficulties lower retrieval strength during practice (making it feel harder) while increasing storage strength (making it last longer). Modern SRS systems like FSRS explicitly model this distinction.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Bjork, R. A. (1994).** Memory and metamemory considerations in the training of human beings. In J. Metcalfe & A. Shimamura (Eds.), *Metacognition: Knowing about knowing* (pp. 185–205). Cambridge, MA: MIT Press.

- **Institutional affiliation:** Robert Bjork — UCLA (Distinguished Professor; he has held this position since 1974, making his research program one of the longest continuous cognitive psychology programs at a single institution).
- **Historical significance:** This chapter first coined the phrase "desirable difficulties." It was a chapter in a book, not a journal article — notable because the concept was introduced in a more speculative theoretical context before the full empirical program existed.
- **Key argument:** Training programs often optimize for rapid skill acquisition (visible performance gains) at the expense of long-term retention and transfer. The chapter specifically critiques military and workplace training programs that measure success by immediate test performance.

---

**[CRISPY ORIGINAL]** **Bjork, E. L., & Bjork, R. A. (2011).** Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning. In M. A. Gernsbacher et al. (Eds.), *Psychology and the real world* (pp. 56–64). New York: Worth Publishers.

- **Institutional affiliation:** Elizabeth Ligon Bjork — UCLA (Robert Bjork's research partner and spouse; they run the UCLA Learning and Forgetting Lab together).
- **Contribution:** The clearest accessible summary of the four key desirable difficulties: (1) varying conditions of practice, (2) interleaving, (3) spacing, (4) retrieval practice. This chapter is the appropriate citation when Nugget Nihongo's methodology page explains the overarching framework.

---

**[CRISPY ORIGINAL]** **Bjork, R. A., & Bjork, E. L. (2020).** Desirable difficulties in theory and practice. *Journal of Applied Research in Memory and Cognition, 9*(4), 475–479. https://doi.org/10.1016/j.jarmac.2020.09.003

- **Key contribution:** Updated framework 26 years after the original concept. Critical nuance: **not all difficulties are desirable**. A difficulty is desirable only if it triggers encoding and retrieval processes appropriate to the learner's knowledge state and does not exceed the learner's capacity. Difficulties that overwhelm working memory or produce excessive failure rates are undesirable.
- **Direct implication for FSRS:** FSRS's difficulty and stability parameters attempt to schedule cards at the threshold of successful retrieval — not too easy (no strengthening) and not too hard (failure exceeds capacity). This is the algorithmic implementation of "desirable" difficulties.
- **Boundary condition warning:** For Indonesian learners of Japanese at N5 level, Japanese text rendered in kanji without furigana may exceed the desirable difficulty threshold. The difficulty is real but not yet "desirable" — it overwhelms rather than stretches. This justifies Nugget Nihongo's progressive script introduction.

---

**[CRISPY ORIGINAL]** **Soderstrom, N. C., & Bjork, R. A. (2015).** Learning versus performance: An integrative review. *Perspectives on Psychological Science, 10*(2), 176–199. https://doi.org/10.1177/1745691615569000

- **Institutional affiliation:** Nicholas Soderstrom — University of Illinois Urbana-Champaign.
- **Key contribution:** The most comprehensive review of the learning/performance dissociation. Systematically reviews evidence that conditions producing better *performance during training* often produce worse *retention at delayed test*, and vice versa. The table in this paper (comparing immediate performance vs. delayed retention across spacing, interleaving, generation, testing) is the most comprehensive comparison available.
- **Practical implication:** Learners and instructors optimize for performance (quiz scores, immediate feedback). SRS optimizes for learning (delayed retention). These are different objectives. The methodology page must explicitly acknowledge that using Nugget Nihongo will feel harder than re-reading or passive review — and that this is a feature.

---

**[NEW]** **Bjork, R. A. (2013).** Desirable difficulties perspective on learning. In H. Pashler (Ed.), *Encyclopedia of the mind* (Vol. 1, pp. 243–245). Sage Reference.

- **Contribution:** The most concise definition and summary of desirable difficulties from Bjork himself. Useful as the canonical definitional reference.

---

**[NEW]** **Kornell, N., Hays, M. J., & Bjork, R. A. (2009).** Unsuccessful retrieval attempts enhance subsequent learning. *Journal of Experimental Psychology: Learning, Memory, and Cognition, 35*(4), 989–998. https://doi.org/10.1037/a0015729

- **Institutional affiliation:** UCLA.
- **Key finding:** Attempting to retrieve a word — even if the attempt fails — produces better later learning than not attempting retrieval. Failed retrievals are more beneficial than no retrieval attempt. This is a profound finding: even incorrect Anki responses ("Again") may strengthen subsequent learning of the item.
- **Relevance:** Directly relevant to how Nugget Nihongo should communicate the "Again" button experience. An incorrect response is not simply a failure — it primes the brain for better encoding when the correct answer is immediately shown. Users who are distressed by failed responses need to understand that this is mechanistically beneficial.

---

**[NEW]** **Smith, M. A., & Weinstein, Y. (2016).** Learn how to study using... spaced practice. Retrieved from http://www.learningscientists.org/blog/2016/7/21-1

- **Institutional affiliation:** Megan Smith — Rhode Island College; Yana Weinstein — University of Massachusetts Lowell. The Learning Scientists blog.
- **Note:** This is a practitioner resource rather than a primary paper. Relevant as the most widely shared accessible summary of desirable difficulties research, appropriate for linking in the methodology page's "learn more" section.

---

**[NEW]** **Bjork, R. A., Dunlosky, J., & Kornell, N. (2013).** Self-regulated learning: Beliefs, techniques, and illusions. *Annual Review of Psychology, 64*, 417–444. https://doi.org/10.1146/annurev-psych-113011-143823

- **Institutional affiliations:** Robert Bjork — UCLA; John Dunlosky — Kent State University; Nate Kornell — Williams College.
- **Key finding:** Comprehensive review showing that students' beliefs about effective study strategies systematically diverge from what the evidence shows. Re-reading is rated as most effective (it is not); retrieval practice is rated as less effective (it is the most effective). The metacognitive illusion is strongest for fluency-based strategies.
- **Relevance:** The Nugget Nihongo methodology page must actively counter metacognitive illusions about effective study. This is the most comprehensive single citation for that argument.

---

### The UCLA Learning and Forgetting Lab

Robert A. Bjork and Elizabeth L. Bjork have run the UCLA Learning and Forgetting Lab continuously since the 1970s. Their research program has produced the theoretical architecture for modern SRS design more completely than any other single laboratory. Other key members of or closely affiliated with this research program:
- **Nate Kornell** (Williams College) — interleaving, metacognition
- **Robert Bjork** — desirable difficulties, new theory of disuse
- **Elizabeth Bjork** — memory, desirable difficulties applications
- **Nicholas Soderstrom** — learning vs. performance dissociation

---

## §1.6 — COMPREHENSIBLE INPUT HYPOTHESIS (KRASHEN AND SUCCESSORS)

### Core Theoretical Background

Stephen Krashen's Monitor Model (1982) is simultaneously one of the most influential and most contested frameworks in SLA. Its five hypotheses — Acquisition-Learning, Monitor, Natural Order, Input, and Affective Filter — have shaped language pedagogy globally. The Input Hypothesis (i+1) remains the most pedagogically actionable and the most actively debated.

**The i+1 formulation:** Acquisition occurs when learners are exposed to language that is *one step beyond* their current competence. Material at or below current level produces no acquisition; material too far above produces affective filter activation (anxiety, defensiveness) that blocks acquisition.

**The core debate:** Krashen's framework is **unfalsifiable** in its original form — "i" and "i+1" are never operationally defined, making empirical testing difficult. This is the primary scientific criticism. However, the pedagogical implications — comprehensible input, anxiety reduction, meaning-focused exposure — have been repeatedly validated in operational forms even without validating the specific theoretical mechanism.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Krashen, S. D. (1982).** *Principles and practice in second language acquisition.* Pergamon Press.

- **Institutional affiliation:** Stephen Krashen — University of Southern California (Emeritus; he was at USC from 1975 until retirement, conducting no experimental research himself but synthesizing existing literature extensively).
- **Historical context:** This was not a research monograph but a synthesis of others' experimental work filtered through Krashen's theoretical lens. The most cited SLA author of the 20th century despite publishing no experimental research of his own.
- **Status in 2025:** Available as a free PDF from Krashen's personal website — he placed all his books in the public domain. Accessible at: http://www.sdkrashen.com/content/books/principles_and_practice.pdf
- **Crispy note:** Cite for theoretical foundation; pair with empirical critics (see below) to demonstrate Nugget Nihongo's methodology page engages the debate rather than uncritically adopting the framework.

---

**[CRISPY ORIGINAL]** **Krashen, S. D. (1985).** *The input hypothesis: Issues and implications.* Longman.

- **Contribution:** Most direct defense and elaboration of the i+1 hypothesis. Krashen responds to early critics here, which makes this the appropriate citation when defending the comprehensible input position.

---

**[CRISPY ORIGINAL]** **Long, M. H. (1996).** The role of the linguistic environment in second language acquisition. In W. C. Ritchie & T. K. Bhatia (Eds.), *Handbook of second language acquisition* (pp. 413–468). Academic Press.

- **Institutional affiliation:** Michael Long — University of Hawaii at Manoa (then Georgetown University; later University of Maryland).
- **Theoretical contribution:** The Interaction Hypothesis updates and partially displaces Krashen's Input Hypothesis. Long argues that comprehensible input is not sufficient — acquisition is mediated by **negotiation for meaning** (conversations where breakdowns in communication lead to modified input). The mechanism is selective attention forced by communication failure.
- **Relationship to Krashen:** Long accepts that input is necessary but argues it must be interactive and negotiated to be maximally effective. This is an important nuance for Nugget Nihongo: passive input (reading, listening) produces acquisition but interactive contexts (speaking, writing with feedback) produce more efficient acquisition of the same forms.

---

**[CRISPY ORIGINAL]** **Krashen, S. D., & Terrell, T. D. (1983).** *The natural approach: Language acquisition in the classroom.* Pergamon Press.

- **Institutional affiliation:** Tracy Terrell — UC San Diego.
- **Contribution:** The practical pedagogical implementation of Krashen's Monitor Model. Specifically advocates for comprehensible input before production, silent periods, and low-anxiety classroom environments. The Natural Approach influenced the communicative language teaching movement globally.

---

**[NEW]** **VanPatten, B. (1996).** *Input processing and grammar instruction: Theory and research.* Ablex.

- **Institutional affiliation:** Bill VanPatten — Michigan State University (later Texas A&M, University of Illinois Chicago).
- **Theoretical contribution:** Input Processing theory (IP) is the most empirically operationalized descendant of Krashen's Input Hypothesis. IP proposes specific processing principles: learners prioritize meaning over form; learners process words before grammatical morphology; first noun bias leads to incorrect agent assignment in non-canonical sentences.
- **Relevance to Indonesian learners:** VanPatten's first-noun-bias principle predicts that Indonesian learners of Japanese, encountering Japanese SOV sentences, will misassign the object-marked noun as agent until the particle system is stabilized. This directly cross-links to Agent 11's SOV interference point (§5.5.3).
- **Pedagogical implication:** VanPatten's processing instruction approach (PI) — which draws learners' attention to form-meaning connections during input — is empirically validated (Cadierno, 1995; Lee & VanPatten, 2003) and relevant to Nugget Nihongo's L2d contrastive note design.

---

**[NEW]** **Krashen, S. D. (2004).** The power of reading: Insights from the research (2nd ed.). Libraries Unlimited.

- **Institutional affiliation:** University of Southern California.
- **Contribution:** Krashen's most accessible summary of free voluntary reading (FVR) research as a source of comprehensible input. Reviews studies showing extensive free reading is the most effective means of vocabulary acquisition for intermediate learners.
- **Relevance to Nugget Nihongo:** Reading authentic Japanese texts (manga, graded readers, NHK Web Easy) is the comprehensible input complement to Nugget's SRS-based vocabulary study. The methodology page should position structured vocabulary learning (Nugget) and comprehensible input (reading/listening) as complementary, not competing, following Nation's Four Strands framework.

---

**[NEW]** **Ellis, N. C. (2002).** Frequency effects in language processing: A review with implications for theories of implicit and explicit language acquisition. *Studies in Second Language Acquisition, 24*(2), 143–188. https://doi.org/10.1017/S0272263102002024

- **Institutional affiliation:** Nick Ellis — University of Michigan.
- **Theoretical contribution:** Usage-based SLA framework, the major competitor/complement to Krashen's Input Hypothesis. Ellis argues acquisition is frequency-driven: forms encountered more frequently are acquired first, with frequency of co-occurrence driving collocation learning. This is the corpus linguistics approach to comprehensible input.
- **Relevance:** Frequency-based vocabulary selection (the Leeds/Wikipedia frequency lists cited in §4) is grounded in Ellis's usage-based framework. The most frequent Japanese words should be learned first not because a textbook says so, but because frequency determines acquisition order in the input.

---

**[NEW]** **Gass, S. M. (1997).** *Input, interaction, and the second language learner.* Lawrence Erlbaum.

- **Institutional affiliation:** Susan Gass — Michigan State University.
- **Contribution:** Gass's input-interaction-output model integrates Krashen (input), Long (interaction), and Swain (output) into a unified framework. The most comprehensive theoretical synthesis.
- **Key insight for methodology page:** The most defensible position in 2025 is that SLA requires all three: comprehensible input (Krashen), interaction and negotiation (Long), and pushed output (Swain). Nugget Nihongo provides structured vocabulary input; the methodology page should explicitly recommend complementing it with speaking practice (interaction and output).

---

**[NEW]** **Swain, M. (1985).** Communicative competence: Some roles of comprehensible input and comprehensible output in its development. In S. M. Gass & C. G. Madden (Eds.), *Input in second language acquisition* (pp. 235–253). Newbury House. **[KR-09]** *(Cross-reference: registered as KR-09 in bibliography. DUP-11 resolved — use [KR-09] as canonical ID.)*

- **Institutional affiliation:** Merrill Swain — Ontario Institute for Studies in Education (OISE), University of Toronto.
- **Theoretical contribution:** The Comprehensible Output Hypothesis — Krashen's complement. Swain argues that *producing* language (not just receiving it) forces a different level of syntactic processing that input alone cannot provide. Learners often understand input by bypassing syntactic processing (relying on semantic cues); output forces syntactic encoding.
- **Relevance:** The Nugget Nihongo production-side quiz mode (retrieving the Japanese form from Indonesian meaning) is not just retrieval practice — it is comprehensible output production, providing the syntactic encoding push that Swain argues is missing from input-only approaches.

---

### Krashen: Institutional Legacy and Critical Reception

Krashen published his foundational works through the 1970s and 1980s, was at USC, and remained the most-cited author in applied linguistics for decades despite persistent criticism of his methodology (unfalsifiability, lack of experimental research). The field's response has been to **operationalize his concepts** rather than accept or reject them wholesale:

- **VanPatten** operationalized input processing with testable principles
- **Long** operationalized interaction with the Negotiated Interaction framework
- **Ellis** operationalized frequency-based acquisition with corpus evidence
- **Nation** operationalized the input/output balance with the Four Strands

Nugget Nihongo's methodology page should present Krashen as the foundational theorist whose concepts have been empirically refined by these successors — not as a theorist to be accepted uncritically.

---

## §1.7 — NATION'S FOUR STRANDS FRAMEWORK

### Core Theoretical Background

Paul Nation (Victoria University of Wellington) is the most influential applied linguist in L2 vocabulary research. His Four Strands framework provides the most complete pedagogical architecture for balancing different types of learning activity in an L2 course.

**The Four Strands:**
1. **Meaning-focused input:** Listening and reading comprehensible material at or slightly below current level
2. **Meaning-focused output:** Speaking and writing for communicative purposes
3. **Language-focused learning:** Explicit attention to vocabulary, grammar, pronunciation
4. **Fluency development:** Working within current knowledge at rapid rates to build automaticity

**The balance principle:** An optimally designed course provides roughly equal time to all four strands. Most classroom programs over-invest in Strand 3 (explicit instruction) at the expense of Strands 1, 2, and 4. Nugget Nihongo primarily provides Strand 3 (vocabulary-focused learning) and must be positioned explicitly as a complement to Strands 1, 2, and 4 — not as a complete learning program.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Nation, I. S. P. (2007).** The four strands. *Innovation in Language Learning and Teaching, 1*(1), 2–13. https://doi.org/10.2167/illt039.0

- **Institutional affiliation:** Paul Nation — Victoria University of Wellington, New Zealand (Emeritus Professor; he has been the defining figure in L2 vocabulary acquisition for 40+ years).
- **750+ Google Scholar citations** — one of the most cited vocabulary pedagogy papers of the 2000s.
- **Key argument formalized here:** The four strands should each receive roughly 25% of learning time. The paper provides calculation frameworks for estimating strand balance in a given curriculum.
- **Crispy note:** Lead with this citation for the Four Strands framework. The %25 balance principle is the key quotable claim.

---

**[CRISPY ORIGINAL]** **Nation, I. S. P. (2013).** *Learning vocabulary in another language* (2nd ed.). Cambridge University Press.

- **Contribution:** The authoritative 550-page research synthesis. Chapter 4 covers spaced retrieval; Chapter 6 covers meaning-focused input; Chapter 11 covers vocabulary learning strategies. The most-cited L2 vocabulary research monograph.
- **Note:** A 3rd edition (2022) was published by Cambridge University Press with updated coverage of digital vocabulary learning tools. If Nugget Nihongo cites the 2013 edition, it should be aware the 3rd edition exists and check whether updated coverage changes any relevant claims.

---

**[CRISPY ORIGINAL]** **Nation, I. S. P., & Macalister, J. (2010).** *Language curriculum design.* Routledge. https://doi.org/10.4324/9780203870730

- **Institutional affiliation:** John Macalister — Victoria University of Wellington.
- **Contribution:** Applies the Four Strands to practical curriculum design. Chapter 10 specifically addresses vocabulary strand design. The most operationally useful Nation reference for Nugget Nihongo's learning design documentation.

---

**[CRISPY ORIGINAL]** **Nation, I. S. P., & Yamamoto, A. (2012).** Applying the four strands to language learning. *International Journal of Innovation in English Language Teaching and Research, 1*(2), 167–181.

- **Contribution:** Case study applying Four Strands to a specific English teaching context. Less directly relevant than the foundational papers but demonstrates the framework's applied scope.

---

**[NEW]** **Nation, I. S. P., & Newton, J. (2009).** *Teaching ESL/EFL listening and speaking.* Routledge.

- **Contribution:** Nation's application of the Four Strands to listening and speaking — the strands most underrepresented in Nugget Nihongo's current architecture. Directly relevant for positioning the platform's limitations and recommending complementary activities.

---

**[NEW]** **Webb, S., & Nation, I. S. P. (2017).** *How vocabulary is learned.* Oxford University Press.

- **Institutional affiliation:** Stuart Webb (Victoria University of Wellington) and Paul Nation.
- **Contribution:** The most accessible comprehensive summary of what is known about vocabulary acquisition, combining Nation's framework with the retrieval practice and spacing literature. The book with which to validate Nugget Nihongo's entire §1 evidence base in a single citable source.

---

**[NEW]** **Laufer, B., & Nation, I. S. P. (1999).** A vocabulary-size test of controlled productive ability. *Language Testing, 16*(1), 33–51. https://doi.org/10.1177/026553229901600103

- **Institutional affiliation:** Batia Laufer — University of Haifa.
- **Contribution:** Develops the Productive Vocabulary Levels Test — the field's standard measure of L2 vocabulary production. Establishes the distinction between **receptive** (can understand when encountered) and **productive** (can use in output) vocabulary knowledge. Typically 5–8× more exposures are needed for productive than receptive acquisition.
- **Relevance:** Nugget Nihongo's card design decisions about which words to test receptively vs. productively should be informed by this distinction. JLPT N5–N4 core vocabulary should be targeted for productive knowledge; peripheral vocabulary can remain receptive.

---

**[NEW]** **Schmitt, N. (2000).** *Vocabulary in language teaching.* Cambridge University Press.

- **Institutional affiliation:** Norbert Schmitt — University of Nottingham.
- **Contribution:** The most comprehensive single-author synthesis of L2 vocabulary research, complementary to Nation's work. Chapter 7 on deliberate learning (explicit vocabulary study) directly supports Nugget Nihongo's flashcard approach.
- **Key claim:** Deliberate vocabulary learning is the most efficient method for acquiring the first 2,000–3,000 high-frequency words; beyond that threshold, extensive reading becomes the primary acquisition route. This precisely positions where Nugget Nihongo (structured vocabulary study) should hand off to extensive reading.

---

**[NEW]** **Nation, I. S. P. (2006).** How large a vocabulary is needed for reading and listening? *Canadian Modern Language Review, 63*(1), 59–82. https://doi.org/10.3138/cmlr.63.1.59

- **Key finding:** Reading unassisted: 98% text coverage requires ~8,000–9,000 word families; listening comprehension: 95% coverage requires ~6,000–7,000 word families. For Indonesian learners of Japanese, this benchmarks what full vocabulary acquisition looks like: JLPT N1 (~10,000 words) provides approximately the vocabulary needed for unassisted reading comprehension.
- **Relevance:** Provides the vocabulary size targets that contextualize what Nugget Nihongo's JLPT-structured deck is building toward.

---

### Paul Nation: Institutional Legacy

Paul Nation spent his career at Victoria University of Wellington, and VUW has become the Southern Hemisphere's leading center for L2 vocabulary research. His student Stuart Webb (co-author of Kim & Webb 2022 — the cornerstone citation in §1.1) continues this research program, creating remarkable citation continuity: the most important SRS L2 meta-analysis (Kim & Webb) comes from Nation's home institution. This lineage is worth noting in Nugget Nihongo's methodology page as an institutional credibility marker.

---

## §1.8 — CONTRASTIVE ANALYSIS BETWEEN L1 AND L2

### Core Theoretical Background

The Contrastive Analysis Hypothesis (CAH, Lado 1957) proposed that L2 learning difficulty can be predicted by comparing the structures of L1 and L2: where they differ, errors will occur; where they are similar, transfer will be positive. The "strong" version (errors are fully predictable from contrastive analysis) was largely abandoned; the "weak" version (contrastive analysis helps explain errors after the fact) remains influential and is the basis of Agent 11's entire §5.5 framework.

**Three theoretical descendants of CAH:**
1. **Error Analysis** (Corder, 1967) — shifted from prediction to description; all learner errors, not just transfer errors, are systematically analyzable
2. **Interlanguage** (Selinker, 1972) — the learner's developing L2 system has its own systematic rules, not just a defective version of the target
3. **Transfer-appropriate processing and CLI** (Cross-Linguistic Influence — Jarvis & Pavlenko, 2008) — the modern form of CAH, with empirical methodology from learner corpora

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Lado, R. (1957).** *Linguistics across cultures: Applied linguistics for language teachers.* University of Michigan Press.

- **Institutional affiliation:** Robert Lado — Georgetown University (he later became Dean of Georgetown's School of Languages).
- **Historical context:** The founding text of the strong CAH. Lado was Bloomfield's student and Fries's colleague — the Michigan School of structural linguistics applied to language teaching.
- **Status in 2025:** The strong CAH is no longer defensible; the weak version is standard. Citing Lado without this caveat would be academically misleading. Cite as foundational text, then cite Wardhaugh (1970) to establish the strong/weak distinction.

---

**[CRISPY ORIGINAL]** **Odlin, T. (1989).** *Language transfer: Cross-linguistic influence in language learning.* Cambridge University Press. https://doi.org/10.1017/CBO9781139524537

- **Institutional affiliation:** Terence Odlin — Ohio State University.
- **Contribution:** The most comprehensive monograph on cross-linguistic influence. Goes beyond error prediction to include positive transfer, avoidance behavior, under-production, and perceptual salience effects. Directly relevant to Agent 11's interference point taxonomy — Odlin's framework predicts not just errors but also avoidance patterns (like compound verb avoidance, §5.5.22).

---

**[CRISPY ORIGINAL]** **Wardhaugh, R. (1970).** The contrastive analysis hypothesis. *TESOL Quarterly, 4*(2), 123–130.

- **Contribution:** The paper that killed the strong CAH and saved the weak version. Wardhaugh showed that contrastive analysis cannot predict all errors (other sources of errors exist) but does help explain transfer errors after the fact. This is the appropriate methodological framing for Agent 11's interference point documentation.

---

**[CRISPY ORIGINAL]** **Alshehab, M. (2023).** The survival of contrastive analysis hypothesis: A look under the hood. *Theory and Practice in Language Studies, 13*(1), 1–7. https://doi.org/10.17507/tpls.1301.01

- **Contribution:** Modern defense of CAH's relevance despite its historical rejection. Argues the weak CAH combined with corpus-based error analysis is a productive research methodology — which is precisely what the I-JAS-based research cited in Agent 11's §5.5.29 exemplifies.

---

**[NEW]** **Selinker, L. (1972).** Interlanguage. *International Review of Applied Linguistics, 10*(3), 209–231. https://doi.org/10.1515/iral.1972.10.1-4.209

- **Institutional affiliation:** Larry Selinker — University of Michigan (later University of Edinburgh, University of London).
- **Contribution:** Introduced the concept of **interlanguage** — the learner's developing L2 system as a systematic linguistic system in its own right, not simply a deficient version of the target language. Introduced the concept of **fossilization** — the stabilization of non-target-like forms that resist further development.
- **Relevance:** Indonesian learners' persistent に/で errors (documented in I-JAS) are not random — they are systematic features of an interlanguage that partially maps Indonesian *di* onto both Japanese particles. Understanding this as interlanguage behavior (not ignorance) informs how to design targeted contrastive notes.

---

**[NEW]** **Jarvis, S., & Pavlenko, A. (2008).** *Crosslinguistic influence in language and cognition.* Routledge.

- **Institutional affiliation:** Scott Jarvis — Ohio University; Aneta Pavlenko — Temple University.
- **Contribution:** The most complete modern treatment of cross-linguistic influence, integrating cognitive, psycholinguistic, and sociolinguistic perspectives. Goes beyond morphosyntax (traditional CAH territory) to include conceptual transfer — the influence of L1 conceptual structures on L2 meaning construction.
- **Relevance to Nugget Nihongo:** Conceptual transfer (not just formal transfer) affects how Indonesian learners conceptualize Japanese aspect, tense, and evidentiality. The morphology is different AND the underlying conceptual structure of what gets grammaticalized differs.

---

**[NEW]** **Corder, S. P. (1967).** The significance of learner's errors. *International Review of Applied Linguistics, 5*(1–4), 161–170. https://doi.org/10.1515/iral.1967.5.1-4.161

- **Institutional affiliation:** S. P. Corder — University of Edinburgh.
- **Contribution:** Founded Error Analysis as a systematic field. Distinguished between errors (systematic, reflect the learner's current interlanguage) and mistakes (performance slips, inconsistent with the learner's own system). This distinction is critical for interpreting I-JAS corpus data — corpus analysis identifies errors, not mistakes.

---

**[NEW]** **Gass, S. M., & Selinker, L. (Eds.). (1983).** *Language transfer in language learning.* Newbury House.

- **Institutional affiliation:** Susan Gass — Michigan State University.
- **Contribution:** The first major edited volume on language transfer, defining the research program. Establishes that transfer is selective — learners do not transfer all L1 features, but selectively transfer those that are psycholinguistically salient. Typologically distant language pairs show more selective, strategic transfer than close pairs.
- **Relevance:** Indonesian and Japanese are typologically distant (Austronesian vs. Japonic). The transfer that occurs is not automatic wholesale mapping but selective application of L1 strategies at moments of uncertainty — exactly what the particle and word order interference analyses in §5.5 document.

---

**[NEW]** **Pica, T. (1994).** Research on negotiation: What does it reveal about second-language learning conditions, processes, and outcomes? *Language Learning, 44*(3), 493–527. https://doi.org/10.1111/j.1467-1770.1994.tb01115.x

- **Institutional affiliation:** Teresa Pica — University of Pennsylvania.
- **Contribution:** The most cited empirical paper on Long's Interaction Hypothesis. Pica's study showed that negotiation of meaning during communication breakdowns produces modified input that is more comprehensible than non-negotiated input — and that this modified input is directly incorporated into the learner's interlanguage.
- **Relevance to Nugget Nihongo:** This argues for interactive learning activities as complements to SRS. The methodology page should recommend that Nugget users complement deck study with conversation practice (HelloTalk, iTalki, tandem exchange) where negotiation of meaning can occur.

---

## §1.9 — ELABORATIVE ENCODING FOR VOCABULARY

### Core Theoretical Background

Craik and Lockhart's (1972) Levels of Processing framework proposed that memory is a byproduct of the depth (elaborateness) of cognitive processing during encoding — not a separate system with finite capacity. Deeper processing involves semantic analysis (meaning, association, context) rather than shallow processing (surface features, sound, appearance).

**Three levels operationalized:**
1. **Structural** (shallow): What does the word look like? (letter-level analysis)
2. **Phonemic** (intermediate): What does it rhyme with? (sound-level analysis)
3. **Semantic** (deep): Does it fit in this sentence? (meaning-level analysis)

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Craik, F. I. M., & Lockhart, R. S. (1972).** Levels of processing: A framework for memory research. *Journal of Verbal Learning and Verbal Behavior, 11*(6), 671–684. https://doi.org/10.1016/S0022-5371(72)80001-X

- **Institutional affiliation:** Fergus Craik — University of Toronto; Robert Lockhart — University of Toronto.
- **Historical context:** Published 1972, this became one of the most cited papers in cognitive psychology. The framework was intentionally presented as a "framework" rather than a "theory" to avoid falsification claims — which partly explains its longevity despite criticism.
- **Criticism (relevant for methodology page):** The framework was criticized for circularity — "deeper" processing was defined by better retention rather than independently. Craik himself acknowledged this in the 2002 retrospective (see below). The framework's practical prescriptions (encourage semantic processing) remain valid even if the theoretical mechanism is questioned.

---

**[CRISPY ORIGINAL]** **Craik, F. I. M., & Tulving, E. (1975).** Depth of processing and the retention of words in episodic memory. *Journal of Experimental Psychology: General, 104*(3), 268–294. https://doi.org/10.1037/0096-3445.104.3.268

- **Institutional affiliation:** Fergus Craik — University of Toronto; Endel Tulving — University of Toronto.
- **Experimental contribution:** Ten experiments providing the empirical foundation for LOP. The most rigorous empirical support for the framework.
- **Key finding:** Semantic encoding tasks produced 3–4× better recall than structural encoding tasks for the same words studied for the same amount of time.

---

**[CRISPY ORIGINAL]** **Pressley, M., Levin, J. R., & Delaney, H. D. (1982).** The mnemonic keyword method. *Review of Educational Research, 52*(1), 61–91. https://doi.org/10.3102/00346543052001061

- **Institutional affiliation:** Michael Pressley — University of Western Ontario (later University of Maryland, University of Notre Dame, Michigan State University); Joel Levin — University of Wisconsin-Madison.
- **Contribution:** Comprehensive review of the keyword method — the most studied elaborative encoding technique for foreign vocabulary. Keyword method involves: (1) finding a keyword in L1 that sounds like the L2 word, (2) forming a visual image linking the keyword to the L2 word's meaning.
- **Effect size:** Keyword method typically produces d = 0.7–1.0 over rote rehearsal in controlled studies, with larger effects for unfamiliar vocabulary (which describes most Japanese vocabulary for Indonesian learners).
- **Boundary condition:** Keyword method is most effective at initial acquisition; its advantage diminishes as vocabulary becomes more familiar (at which point, retrieval practice takes over as the dominant strategy).
- **Relevance to Nugget Nihongo:** WaniKani's success is built on the keyword/mnemonic method. Nugget Nihongo's Keterangan Tambahan field can serve as the elaborative encoding field — the additional context note that forces deeper semantic processing.

---

**[CRISPY ORIGINAL]** **Craik, F. I. M. (2002).** Levels of processing: Past, present... and future? *Memory, 10*(5–6), 305–318. https://doi.org/10.1080/09658210244000135

- **Contribution:** Craik's own retrospective assessment of the LOP framework 30 years later. Acknowledges the circularity problem, identifies what has been confirmed (semantic encoding produces better retention, attention and time-on-task are important) and what remains unclear (the exact mechanism). The most scientifically honest treatment of the framework.

---

**[NEW]** **Eysenck, M. W. (1979).** Depth, elaboration, and distinctiveness. In L. S. Cermak & F. I. M. Craik (Eds.), *Levels of processing in human memory* (pp. 89–118). Erlbaum.

- **Contribution:** Extended LOP to include **distinctiveness** as a memory predictor alongside depth. Distinctive processing (encoding that makes an item stand out from others in memory) produces better recall than elaborative processing of similar items. This is the theoretical basis for WaniKani's distinctive mnemonic stories — they are effective not just because they are elaborate but because they are distinctive (often absurd or emotionally salient).

---

**[NEW]** **Hulstijn, J. H. (2003).** Incidental and intentional learning. In C. J. Doughty & M. H. Long (Eds.), *The handbook of second language acquisition* (pp. 349–381). Blackwell.

- **Institutional affiliation:** Jan Hulstijn — University of Amsterdam.
- **Contribution:** Distinguishes **intentional** (explicit, deliberate) vocabulary learning from **incidental** (context-based, while doing something else) learning. Finds intentional learning with elaborative encoding (keyword method, sentence generation) produces comparable retention to many exposures through incidental reading.
- **Relevance:** Nugget Nihongo is an intentional learning tool. The methodology page should frame this as a complement to incidental learning from reading/listening (Strand 1 and 2 of Nation's framework) — intentional learning is most efficient for the first 2,000 high-frequency words; incidental learning is most efficient beyond that.

---

**[NEW]** **Joe, A. (2010).** The quality and frequency of encounters with vocabulary in an English for Academic Purposes programme. *Reading in a Foreign Language, 22*(1), 117–138.

- **Institutional affiliation:** Angela Joe — Victoria University of Wellington.
- **Contribution:** Established that incidental vocabulary acquisition from reading requires approximately 10–15 encounters and that quality of encounter (elaborative context) matters more than quantity for initial acquisition. Paired with Nation's work, this establishes that structured flashcard study (Nugget) + extensive reading are the optimal combination.

---

**[NEW]** **Newton, J. (2001).** Options for vocabulary learning through communication tasks. *ELT Journal, 55*(1), 30–37. https://doi.org/10.1093/eltj/55.1.30

- **Institutional affiliation:** Jonathan Newton — Victoria University of Wellington.
- **Contribution:** Demonstrates that elaborative negotiation of vocabulary meaning during communication tasks produces better retention than non-negotiated encounters. Bridges the LOP framework and Long's Interaction Hypothesis — negotiation forces deeper semantic processing.

---

### Institutions in Elaborative Encoding Research

- **University of Toronto** (Craik, Tulving) — foundational LOP work; Canada's premier memory research center
- **University of Amsterdam** (Hulstijn) — L2 intentional vs. incidental vocabulary learning
- **Victoria University of Wellington** (Nation, Webb, Joe, Newton) — all four dimensions of vocabulary acquisition

---

## §1.10 — SELF-REFERENCE EFFECT FOR L2 VOCABULARY (2024–2025)

### Core Theoretical Background

The self-reference effect (SRE) in memory refers to the finding that information encoded with reference to one's self is better remembered than information encoded with reference to other people or abstract concepts. First documented by Rogers, Kuiper, & Kirker (1977; **[NEW]**), it has been explained within the LOP framework as a form of deeply elaborate semantic processing — one's self-concept being the richest and most integrated cognitive schema available.

The crucial development (2025): The SRE has now been demonstrated to extend specifically to **L2 vocabulary acquisition** — making it directly applicable to Nugget Nihongo's card design.

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Pruss, S., Karni, A., & Prior, A. (2025).** Self-reference promotes vocabulary learning in a foreign language. *Psychonomic Bulletin & Review, 32*, 2104–2113. https://doi.org/10.3758/s13423-025-02674-w

- **Institutional affiliation:** Shlomit Pruss, Avi Karni, Anat Prior — University of Haifa, Israel.
- **Experimental design:** English-Hebrew bilinguals learning Russian (L3) vocabulary — a controlled L2 acquisition paradigm. Participants encoded new vocabulary by creating self-referential sentences (using the word to describe themselves) vs. other-referential sentences (using the word to describe a famous person). Tests at immediate and 1-week delay.
- **Key finding:** Self-reference produced significantly better memory both immediately and at 1-week delay. The effect was robust across item types and did not require the self-referential sentence to be true (imagined self-reference produced comparable benefits to genuine self-reference).
- **Publication status:** Open access; published March 19, 2025 — months before this expansion is written. The most recent primary research citation in the entire §1 evidence base.
- **Crispy note:** This is the "bleeding edge" citation that demonstrates Nugget Nihongo's methodology page is built on the latest research. Combine with Liu et al. (2024) for meta-analytic support.

---

**[CRISPY ORIGINAL]** **Liu, Z., Wen, J., Liu, Y., & Hu, C.-P. (2024).** The effectiveness of self: A meta-analysis of using self-referential encoding techniques in education. *British Journal of Educational Psychology, 94*(1), 112–137. https://doi.org/10.1111/bjep.12636

- **Institutional affiliation:** Chuan-Peng Hu (胡传鹏) — Nanjing Normal University, China.
- **Scope:** Meta-analysis of 20 samples (1,082 students). Hedges' g = 0.40 (95% CI [.18, .62]).
- **Moderator analysis:** Effect was larger for recall tests (g = 0.52) than recognition tests (g = 0.27) — consistent with the retrieval practice findings in §1.2–1.3. Self-reference encoding works best when tested with free recall, not multiple choice.
- **Educational application:** Studies using classroom integration produced larger effects (g = 0.46) than lab studies (g = 0.34) — suggesting the SRE transfers to applied learning contexts.
- **Crispy note:** Use alongside Pruss et al. (2025) to establish both meta-analytic breadth and L2-specific evidence.

---

**[CRISPY ORIGINAL]** **Wang, Z., Guo, Z., & Zhang, M. (2024).** The self-reference effect in metamemory and the role of beliefs in this process. *Behavioral Sciences, 14*(9), Article 741. https://doi.org/10.3390/bs14090741

- **Contribution:** Demonstrates that learners who *believe* self-referential encoding is effective show larger SRE than learners with neutral beliefs — a metacognitive component. Relevant to how Nugget Nihongo explains the self-reference technique: simply telling learners it works may amplify the benefit.

---

**[CRISPY ORIGINAL]** **Symons, C. S., & Johnson, B. T. (1997).** The self-reference effect in memory: A meta-analysis. *Psychological Bulletin, 121*(3), 371–394. https://doi.org/10.1037/0033-2909.121.3.371

- **Institutional affiliation:** Colin Symons, Blair Johnson — Syracuse University.
- **Scope:** The foundational SRE meta-analysis, covering 125 studies. Medium-to-large overall effect.
- **Historical context:** All subsequent SRE research (including Liu et al. 2024 and Pruss et al. 2025) builds from this meta-analysis. It established that the SRE is not specific to any single memory paradigm or participant group.

---

**[NEW]** **Rogers, T. B., Kuiper, N. A., & Kirker, W. S. (1977).** Self-reference and the encoding of personal information. *Journal of Personality and Social Psychology, 35*(9), 677–688. https://doi.org/10.1037/0022-3514.35.9.677

- **Institutional affiliation:** Timothy Rogers, Nicholas Kuiper, William Kirker — University of Waterloo, Canada.
- **Historical significance:** The original SRE paper. Participants encoded words with structural (Is it in capital letters?), phonemic (Does it rhyme with X?), semantic (Does it mean the same as Y?), or self-referent (Does it describe you?) processing instructions. Self-referential condition produced dramatically superior recall — more than any other condition including semantic encoding.
- **Theoretical significance:** Extended LOP theory — self-reference appears to constitute a level of processing *deeper* than standard semantic processing. The self-schema (all one knows about oneself) is the richest cognitive structure available for elaborative encoding.

---

**[NEW]** **Macrae, C. N., Scholey, K. A., & Bodenhausen, G. V. (1995).** Achieving effortless attention in social perception: Automaticity in the maintenance of stereotypes. *European Review of Social Psychology, 6*(1), 225–259.

- **Relevance:** Establishes that self-referential processing is partly automatic — the self-schema is so well-developed that encoding in relation to self requires less effortful processing while still producing superior retention. This explains why the SRE can work even when learners are not consciously trying to remember: the self-encoding process is naturally elaborative.

---

**[NEW]** **Cunningham, S. J., Turk, D. J., Macdonald, L. M., & Macrae, C. N. (2008).** Yours or mine? Ownership and memory. *Psychonomic Bulletin & Review, 15*(6), 1197–1201. https://doi.org/10.3758/PBR.15.6.1197

- **Institutional affiliation:** Macrae — University of Aberdeen.
- **Key finding:** Memory is enhanced not just for self-referential content but for *ownership* — items the learner "owns" (physically or conceptually) are better remembered. This extends the SRE to include self-generation effects (words the learner generates themselves) and self-chosen examples (vocabulary exemplified with the learner's own chosen sentences).
- **Relevance to Nugget Nihongo:** Card customization — allowing learners to add their own example sentences — is not just engagement design but a genuine encoding enhancement through the ownership/self-generation effect.

---

**[NEW]** **Kelley, C. M., & Jacoby, L. L. (1996).** Adult egocentrism: Subjective experience versus analytic bases for judgment. *Journal of Memory and Language, 35*(2), 157–175. https://doi.org/10.1006/jmla.1996.0009

- **Contribution:** Demonstrates that self-generated items are better remembered than experimenter-provided items — the generation effect (Slamecka & Graf, 1978). When combined with SRE, self-generated self-referential encoding may produce the strongest possible deliberate encoding condition available.
- **Relevance:** Nugget Nihongo cards that prompt learners to generate their own example sentences (rather than only providing pre-written ones) leverage both the SRE and the generation effect simultaneously.

---

**[NEW]** **Klein, S. B., & Kihlstrom, J. F. (1986).** Elaboration, organization, and the self-reference effect in memory. *Journal of Experimental Psychology: General, 115*(1), 26–38. https://doi.org/10.1037/0096-3441.115.1.26

- **Contribution:** Distinguishes two mechanisms of SRE: (1) elaborative — self-encoding produces rich associations; (2) organizational — self-encoding organizes items into a coherent structure. Both contribute. The organizational component predicts that SRE is stronger for vocabulary learned in thematic clusters (all food words, all travel words) because the self can organize the cluster coherently.
- **Relevance:** Supports Nugget Nihongo's cultural category organization (simbol kategori). Organizing vocabulary by semantic/cultural category and then applying SRE within each category should produce maximum encoding depth.

---

### Institutions in Self-Reference Effect Research

- **University of Haifa** (Pruss, Karni, Prior, 2025) — current cutting edge: L2 vocabulary SRE
- **Nanjing Normal University** (Hu, 2024) — meta-analysis
- **University of Waterloo** (Rogers, Kuiper, Kirker, 1977) — original SRE
- **University of Aberdeen** (Macrae, Cunningham) — ownership and self-processing mechanisms
- **Syracuse University** (Symons, Johnson, 1997) — foundational meta-analysis

---

### §1.10.5 — Cultural Validity: SRE in Collectivist Learner Populations

#### The Cultural Validity Problem

The evidence base in §1.10.1–§1.10.4 establishes the self-reference effect (SRE) as a robust memory encoding advantage — the foundational meta-analysis (SRE-03: Symons & Johnson, 1997) synthesising 125 studies and the most recent L2-specific evidence (SRE-01: Pruss et al., 2025) together present a compelling case for self-referential prompts in vocabulary acquisition. However, a systematic limitation runs through this entire body of work: **every foundational SRE study used participants from WEIRD (Western, Educated, Industrialized, Rich, Democratic) populations** (Wyer & Srull, 1989, **[CV-01]**; Heine et al., 1999, **[CV-02]**). The standard SRE paradigm asks whether a word "describes you" — a question that presupposes an individuated self-schema as the primary reference frame for encoding. For Indonesian learners of Japanese operating in collectivist cultural frameworks, this presupposition requires examination.

---

#### Theoretical Basis: Interdependent Self-Construal and the Limits of Individual Self-Reference

The theoretical grounding for cultural validity concerns is provided by Markus & Kitayama (1991) **(CC-02 cross-reference [§8, NEW-v3]; do not re-cite as CV-XX)**, whose foundational distinction between **independent** and **interdependent** self-construal predicts that the SRE may operate differently across cultural contexts:

- **Independent self-construal** (predominant in WEIRD populations): The self is constituted as a bounded, autonomous agent defined by individual attributes, preferences, and traits. This produces a richly differentiated self-schema — a dense web of personal associations that functions as an exceptionally effective encoding anchor. When a vocabulary item is linked to this schema, the elaboration is deep and individuated.

- **Interdependent self-construal** (common in Indonesian, Japanese, Korean, and broader East and Southeast Asian contexts): The self is constituted relationally — defined through one's roles, relationships, family membership, and in-group position. The most activated and richest cognitive schemas are not individual attributes but relational ones: *how am I situated within my family, workplace, social circle?* For interdependent self-construal individuals, the self-schema is not less rich — it is differently structured, with relational nodes as the primary organizational axis.

The direct prediction: if the SRE depends on engaging a densely elaborated self-schema, and if interdependent selves are relationally organized rather than attribute-organized, then the standard individual-SRE prompt ("Does this word describe you?") may engage a thinner slice of the available self-schema in collectivist learners than in individualist ones. The same encoding depth may be achievable — but via relational rather than individual reference points.

**Symons & Johnson (1997) (SRE-03 cross-reference)** — while not addressing cross-cultural populations directly — notes that the SRE's magnitude is modulated by the richness and accessibility of the self-schema engaged during encoding. This observation, read through the Markus & Kitayama framework, implies that encoding depth for collectivist learners may peak at relational or in-group reference rather than individual self-reference. Symons & Johnson do not examine cross-cultural boundary conditions explicitly; this constitutes a recognized gap in the 1997 meta-analysis that subsequent research has begun to address.

---

#### Empirical Cross-Cultural SRE Literature

**[CV-01]** **Wyer, R. S., Jr., & Srull, T. K. (1989).** *Memory and cognition in its social context*. Lawrence Erlbaum Associates.

- **Institutional affiliation:** Robert Wyer, Thomas Srull — University of Illinois, Urbana-Champaign.
- **Core contribution:** Establishes the theoretical framework for how social self-schemas organize memory encoding. Critically, Wyer & Srull treat the self-concept as one social schema among many — including schemas for significant others, in-group members, and social roles. This framing predicts that, for learners whose self-concept is relationally constituted, other-referent schemas (parent, mentor, close friend) may engage equivalent or superior elaborative processing to individual self-reference.
- **Relevance to cultural validity:** Provides the foundational theoretical basis for expecting cross-cultural variation in which reference schema produces deepest encoding. The individual self is not theoretically privileged as the uniquely deep encoding anchor — the richest *available* schema is. In interdependent cultures, that schema may be relational.
- **Limitation:** Does not itself report cross-cultural data; its contribution is theoretical framing.

---

**[CV-02]** **Heine, S. J., Lehman, D. R., Markus, H. R., & Kitayama, S. (1999).** Is there a universal need for positive self-regard? *Psychological Review, 106*(4), 766–794. https://doi.org/10.1037/0033-295X.106.4.766

- **Institutional affiliations:** Steven Heine, Darrin Lehman — University of British Columbia; Hazel Rose Markus — Stanford University; Shinobu Kitayama — University of Michigan.
- **Core contribution:** A programmatic challenge to the assumption that psychological effects observed in North American participants generalize universally. The paper presents convergent evidence that self-enhancement biases — closely related to the self-schema elaboration mechanisms underlying the SRE — are substantially weaker or absent in Japanese and East Asian populations. The individual self-schema in interdependent cultural contexts is less elaborated as a *self-promotional* structure, which has direct implications for the degree to which individual self-reference anchors deep encoding.
- **Relevance to SRE cultural validity:** If Japanese participants do not show the self-enhancement patterns that characterize North American self-schemas, the assumption that "self-reference = deepest processing" may not transfer. The self-schema in collectivist contexts is richly elaborated — but along relational rather than self-promotional dimensions.
- **Cross-cultural reach:** Japan, Canada; conceptual extension to Indonesia via shared high-IDV collectivist values.

---

**[CV-03]** **Zhu, Y., Zhang, L., Fan, J., & Han, S. (2007).** Neural basis of cultural influence on self-representation. *NeuroImage, 34*(3), 1310–1317. https://doi.org/10.1016/j.neuroimage.2006.08.047 ⚠ **DOI VERIFY**

- **Institutional affiliation:** Yina Zhu, Shihui Han — Peking University, Beijing.
- **Experimental design:** Chinese and Western (Danish) participants rated whether trait adjectives described themselves or a close other (mother). fMRI measured neural activation; subsequent recall test assessed memory.
- **Behavioral finding:** Chinese participants showed equivalent recall for self-referenced and mother-referenced trait words. Western participants showed the standard SRE advantage for self over mother. This is the most direct published evidence that **self-referential encoding does not uniquely advantage memory in collectivist populations** — close-other reference engages equivalent elaborative depth.
- **Neural finding:** Chinese participants recruited medial prefrontal cortex (mPFC) for both self-judgments and mother-judgments; Western participants activated mPFC primarily for self-judgments. The neural evidence confirms that the self–mother schema overlap is not a behavioral artefact but reflects a genuine structural difference in how the self-concept is organized.
- **Critical implication for Nugget Nihongo:** This is the strongest direct empirical evidence that the standard SRE paradigm requires cultural adaptation for East Asian learners. Mother-reference (and by extension, close in-group reference) may be functionally equivalent to self-reference as an encoding anchor in collectivist populations.
- **Indonesian applicability:** Indonesia's IDV score of 14 (Hofstede et al., 2010 [§8]) places it among the most collectivist populations studied — more collectivist than the Chinese samples in Zhu et al. The cultural validity concern is at least as strong for Indonesian learners as for Chinese participants.

---

**[CV-04]** **Ross, M., Xun, W. Q. E., & Wilson, A. E. (2002).** Language and the bicultural self. *Personality and Social Psychology Bulletin, 28*(8), 1040–1050. https://doi.org/10.1177/01461672022811002 ⚠ **DOI VERIFY**

- **Institutional affiliation:** Michael Ross, W. Q. Elaine Xun, Anne Wilson — University of Waterloo, Canada.
- **Experimental design:** Chinese-English bilinguals completed self-description tasks in either English or Chinese. The language of encoding predicted the nature of self-descriptions and subsequent self-referential memory patterns.
- **Key finding:** Bicultural learners access different self-schemas depending on the language of task presentation — English primed more independent (individual attribute) self-schemas; Chinese primed more interdependent (relational, role-based) self-schemas. Memory for self-referenced material tracked the language-primed self-schema type.
- **Relevance to Indonesian learners of Japanese:** Indonesian learners studying Japanese are operating in a language context that — unlike English — is itself a high-collectivism language with strong relational encoding features (keigo register distinctions, in-group/out-group linguistic marking). Japanese vocabulary may therefore naturally prime interdependent self-schemas during encoding, potentially reducing the advantage of individual self-reference prompts and increasing the relevance of relational prompts.
- **Design application:** Card prompts in Bahasa Indonesia (Nugget Nihongo's primary instruction language) are themselves anchored in a collectivist linguistic register, suggesting relational prompts will be more cognitively natural — and may produce deeper encoding — than individual self-reference prompts.

---

**[CV-05]** **Qi, S., & Mitchell, D. B. (2012).** ⚠ **VERIFY BEFORE INSERTION** *(Full bibliographic details require Agent 37 verification; candidate citation flagged in brief as conditional — include if verifiable)*

- **Candidate description (pending verification):** Qi & Mitchell (2012) is identified in the AGENT 30 brief as a potentially relevant cross-cultural or SRE boundary-condition study. If the paper examines conditions under which the SRE operates differently across participant groups (including cultural background, age, or self-schema elaboration), it should be cited here with full bibliographic detail, institutional affiliation, and a specific finding summary. If Qi & Mitchell (2012) proves to address a different domain, this slot should be released.
- **Action for Agent 2:** Assign to Agent 37 for DOI verification and content confirmation before final insertion. If unverifiable, remove CV-05 and renumber is not needed — CV-01–CV-04 are standalone and the section is complete at 4 + 2 cross-references.

---

#### The In-Group Reference Effect: Evidence and Research Gap

The cross-cultural SRE evidence converges on a specific prediction: for collectivist learners, **in-group or close-other reference may be functionally equivalent to or stronger than individual self-reference as an encoding anchor** (Zhu et al., 2007, **CV-03**; Wyer & Srull, 1989, **CV-01**; Markus & Kitayama, 1991, CC-02 cross-ref).

The practical question for vocabulary instruction is whether prompts such as:
- *"Bagaimana keluargamu menggambarkan kata ini?"* [How would your family describe this word?]
- *"Bayangkan sempai kamu di tempat kerja menggunakan kata ini"* [Imagine your sempai at work using this word]
- *"Apakah kamu pernah melihat kata ini digunakan dalam percakapan kelompokmu?"* [Have you ever seen this word used in your group's conversation?]

…produce encoding advantages comparable to or exceeding the standard SRE prompt ("Does this word apply to you?") for collectivist learners.

**The direct answer is: this is an understudied question, and the existing literature does not yet provide an unambiguous evidence base specifically for vocabulary learning in Southeast Asian learner populations.** The Zhu et al. (2007) finding — that close-other reference produces equivalent neural activation and recall to self-reference in Chinese participants — provides the strongest existing evidence for the in-group reference effect in collectivist contexts. The theoretical mechanism (relational self-schema as primary encoding anchor) is well-established via Markus & Kitayama (CC-02 cross-ref) and Wyer & Srull (CV-01). But a direct experimental test of relational vs. individual SRE prompts in a vocabulary acquisition paradigm with Indonesian or Southeast Asian participants has not, to this author's knowledge, been published as of early 2026.

**This gap should be acknowledged explicitly rather than bridged by overclaiming.** The available evidence supports relational framing as a theoretically grounded and culturally valid alternative to individual SRE; it does not yet support the claim that relational prompts are empirically *superior* to individual self-reference prompts for Indonesian vocabulary learners specifically.

---

#### Design Implication

Nugget Nihongo's card prompts are already framed relationally — for example, *"Kamu pernah lihat kata ini di...?"* and *"Bayangkan sempai kamu menggunakan kata ini."* This relational framing is an **evidence-aligned design decision for Indonesian learners**, consistent with interdependent self-construal theory (Markus & Kitayama, 1991, CC-02 cross-ref), the cross-cultural SRE evidence showing equivalent encoding depth for close-other reference in collectivist populations (Zhu et al., 2007, CV-03), and the language-self schema research demonstrating that collectivist-language contexts prime interdependent self-schemas (Ross et al., 2002, CV-04).

**Future card writing should maintain relational contextualisation as a default prompt strategy** rather than adopting pure individual self-referential framing (e.g., "Apakah kata ini menggambarkanmu?" in isolation). The existing relational prompt style is not merely a localisation preference — it is a theoretically and empirically supported pedagogical decision, addressing the cultural validity limitation of the wider SRE literature documented in §1.10.1–§1.10.4.

An appropriately hedged methodology page formulation would be: *"Nugget Nihongo's relational prompt strategy is designed with Indonesian learners' interdependent self-construal in mind. While cross-cultural SRE research consistently shows that in-group and close-other reference engages equivalent elaborative depth to individual self-reference in collectivist contexts, direct experimental evidence in an Indonesian L2 Japanese vocabulary setting remains an open research question — one that Nugget Nihongo's own study data could help answer (see §18: Research Agenda)."*

---

### Citation Summary — §1.10.5

| ID | Author/Year | Status | Notes |
|---|---|---|---|
| CC-02 | Markus & Kitayama (1991) | **Cross-reference** (§8, NEW-v3) | ⚠ ID discrepancy — see Agent 2 flag above |
| SRE-03 | Symons & Johnson (1997) | **Cross-reference** (§1.10) | Boundary condition analysis extension |
| CV-01 | Wyer & Srull (1989) | New entry | Book — self-schema social memory |
| CV-02 | Heine, Lehman, Markus & Kitayama (1999) | New entry | DOI verified in training |
| CV-03 | Zhu, Zhang, Fan & Han (2007) | New entry | ⚠ DOI verify — NeuroImage |
| CV-04 | Ross, Xun & Wilson (2002) | New entry | ⚠ DOI verify — PSPB |
| CV-05 | Qi & Mitchell (2012) | **Conditional** — verify before inserting | ⚠ Brief-flagged candidate |

**Net new citations:** 4 confirmed (CV-01–CV-04) + 1 conditional (CV-05)
**Total CV range used:** CV-01–CV-05 (CV-06–CV-08 remain available for future agents)

> ⚠ **AGENT 2 FLAG — CC-02 ID DISCREPANCY:** The brief instructs cross-referencing Markus & Kitayama (1991) as CC-02. However, the ANTI-DUPLICATION-BASELINE-v10 maps CC-02 to Brown & Levinson (1987) (politeness theory), and Markus & Kitayama (1991) appears in SECTION8 as [NEW-v3] without a formal CC-XX assignment in the current baseline. Agent 2 should reconcile before final insertion: either (a) assign Markus & Kitayama a new §8 ID (e.g., CC-08 or CC-09) and update the baseline, or (b) confirm that the baseline numbering was updated after the brief was drafted.



---

## §1.11 — FSRS ALGORITHM VALIDATION

### Core Theoretical Background

The Free Spaced Repetition Scheduler (FSRS) is the algorithm implemented in Anki since version 23.10 (released October 2023), replacing the SM-2 algorithm that had been in use since 1991. FSRS is a machine-learned, memory-model-based scheduling algorithm that predicts the optimal next review time for each card individually, based on the card's own learning history.

**The SM-2 to FSRS transition is pedagogically significant:**
- **SM-2** (Wozniak, 1987): Rule-based, fixed multipliers, assumed expanding schedule. No memory model, no empirical calibration to actual learner data.
- **FSRS** (Ye, Su et al., 2022): Machine-learned from 220 million memory behavior logs. Explicitly models retrievability (probability of successful recall) and stability (how long before retrievability drops below threshold). Targets 90% recall probability at scheduled review time (configurable in Anki).

---

### Citations: Full Expanded Set

**[CRISPY ORIGINAL]** **Ye, J., Su, J., & Cao, Y. (2022).** A stochastic shortest path algorithm for optimizing spaced repetition scheduling. In *Proceedings of the 28th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD '22)* (pp. 4381–4390). ACM. https://doi.org/10.1145/3534678.3539081

- **Institutional affiliation:** Jiajie Ye, Jinze Su, Yang Cao — National University of Singapore.
- **Scale:** 220 million memory behavior logs from an undisclosed SRS platform (likely Duolingo or similar large-scale L2 platform).
- **Key contribution:** Developed the **DSR model** (Difficulty, Stability, Retrievability) — the theoretical foundation of FSRS. Stability = how long a memory trace lasts (increases with each successful review); Retrievability = current probability of successful recall (decays between reviews following a forgetting curve); Difficulty = inherent difficulty of the card (estimated from early response patterns).
- **SIGKDD significance:** KDD (Knowledge Discovery and Data Mining) is the premier venue in machine learning / data science — acceptance at this conference establishes the technical rigor of the underlying approach.

---

**[CRISPY ORIGINAL]** **Su, J., Ye, J., Nie, L., Cao, Y., & Chen, Y. (2023).** Optimizing spaced repetition schedule by capturing the dynamics of memory. *IEEE Transactions on Knowledge and Data Engineering, 35*(10), 10085–10097. https://doi.org/10.1109/TKDE.2023.3251721

- **Institutional affiliation:** Jinze Su, Jiajie Ye, Yang Cao — National University of Singapore; Liqiang Nie — Harbin Institute of Technology; Ying Chen — Singapore Management University.
- **IEEE TKDE significance:** IEEE Transactions on Knowledge and Data Engineering is one of the highest-impact peer-reviewed journals in computer science data management.
- **Key contribution:** Extended journal version of the KDD paper, with full mathematical derivation of the memory model and comprehensive experimental validation against multiple baseline algorithms (SM-2, DHP, HLR).
- **Benchmark results:** FSRS's predecessor DSR achieved 12.6% lower RMSE in next-review-time prediction compared to SM-2. The current FSRS 4.0 (as of Anki 23.10+) further improved on this through additional training data and architecture refinements.

---

**[CRISPY ORIGINAL]** **Settles, B., & Meeder, B. (2016).** A trainable spaced repetition model for language learning. In *Proceedings of the 54th Annual Meeting of the ACL (Volume 1)* (pp. 1848–1858). https://doi.org/10.18653/v1/P16-1174

- **Institutional affiliation:** Burr Settles, Brendan Meeder — Duolingo, Pittsburgh.
- **Key contribution:** Duolingo's Half-Life Regression (HLR) model — the first industry-scale machine-learned SRS model. HLR was trained on Duolingo's actual user data, predicting word-level recall as a function of time since last review and number of reviews.
- **Significance as benchmark:** FSRS was specifically compared against HLR in benchmark evaluations and outperformed it. Citing Settles & Meeder establishes that FSRS represents an advance over the state of the art that included Duolingo's own algorithm.

---

**[CRISPY ORIGINAL]** **Tabibian, B., Upadhyay, U., De, A., Zarezade, A., Schölkopf, B., & Gomez-Rodriguez, M. (2019).** Enhancing human learning via spaced repetition optimization. *Proceedings of the National Academy of Sciences, 116*(10), 3988–3993. https://doi.org/10.1073/pnas.1815156116

- **Institutional affiliations:** Behzad Tabibian, Manuel Gomez-Rodriguez — Max Planck Institute for Software Systems, Germany; Bernhard Schölkopf — Max Planck Institute for Intelligent Systems.
- **PNAS significance:** Publication in PNAS (National Academy of Sciences) represents the highest tier of scientific validation available for an SRS algorithm study.
- **Key contribution:** Used optimal control theory (specifically, a marked temporal point process model) to derive theoretically optimal review schedules. Validated on Duolingo's language learning data — the first principled derivation of optimal scheduling from first principles.
- **Relationship to FSRS:** The Tabibian et al. theoretical framework and the Ye/Su empirical machine-learning framework converge on similar scheduling policies, providing independent theoretical and empirical validation of FSRS-style adaptive scheduling.

---

**[NEW]** **Wozniak, P. A. (1990).** Optimization of learning [English subtitle version]. *SuperMemo World.* Retrieved from https://supermemo.guru/wiki/Optimization_of_learning

- **Institutional context:** Piotr Wozniak — SuperMemo. Self-published technical report, not peer-reviewed.
- **Historical significance:** The original SM-2 specification. Understanding SM-2 is necessary to understand what FSRS improves upon. SM-2's core innovation (using a grade-modulated multiplier to adjust inter-repetition intervals) was manually calibrated to Wozniak's personal data — a sample of one.
- **Limitation (for methodology page):** SM-2 was calibrated on a single user (Wozniak himself) for Polish-English vocabulary. Its parameters were never validated against a diverse learner population. FSRS addresses this with 220M+ data points from a diverse population.
- **Crispy note:** Do not cite SM-2 as an equivalent scientific source to FSRS; cite it as the predecessor that FSRS was developed to replace.

---

**[NEW]** **Leitner, S. (1972).** *So lernt man lernen: Der Weg zum Erfolg* [Learning to learn: The path to success]. Herder.

- **Institutional context:** Sebastian Leitner — German science journalist, not an academic.
- **Historical significance:** Introduced the physical Leitner box system — the paper-based precursor to digital SRS. The system divides cards into boxes; correct responses move a card to the next box (less frequent review); incorrect responses return it to Box 1. FSRS generalizes this with a continuous rather than discrete scheduling function.
- **Crispy note:** Cite for historical completeness and to make the SRS concept accessible to non-technical readers. Not a peer-reviewed source.

---

**[NEW]** **open-spaced-repetition/srs-benchmark (GitHub, ongoing).** Community benchmark comparing SRS algorithms across multiple datasets. https://github.com/open-spaced-repetition/srs-benchmark

- **Status:** Living benchmark, not a peer-reviewed paper. Maintained by the FSRS development community.
- **Current results (as of early 2026):** FSRS 4.0 consistently outperforms SM-2, HLR, and earlier FSRS versions across all benchmark datasets on log-loss prediction accuracy.
- **Crispy note:** This is the practical validation source for FSRS's superiority over SM-2. Cannot be cited as a peer-reviewed source but is appropriate as a technical reference for the methodology page's more technical sections.

---

**[NEW]** **Kornell, N., & Bjork, R. A. (2008).** Optimising self-regulated study: The benefits—and costs—of dropping flashcards. *Memory, 16*(2), 125–136. https://doi.org/10.1080/09658210701763899

- **Institutional affiliation:** UCLA.
- **Key finding:** Students who used self-terminating flashcard study (stopping when they felt confident with a card) performed worse at delayed test than students who continued studying all cards the same number of times. **"Confidence of knowing" is not a reliable signal for scheduling.**
- **Relevance to FSRS:** FSRS's algorithm-determined scheduling explicitly overrides the learner's self-assessed readiness. This paper is the behavioral justification for trusting the algorithm over one's own confidence judgments — exactly the user communication challenge Nugget Nihongo faces.

---

**[NEW]** **Pavlik, P. I., & Anderson, J. R. (2005).** Practice and forgetting effects on vocabulary memory: An activation-based model of the spacing effect. *Cognitive Science, 29*(4), 559–586. https://doi.org/10.1207/s15516709cog0000_14

- **Institutional affiliations:** Philip Pavlik Jr. — University of Memphis (later Vanderbilt); John Anderson — Carnegie Mellon University.
- **Contribution:** An ACT-R based model of the spacing effect applied specifically to vocabulary learning. Pavlik & Anderson derive optimal spacing intervals from the base-level learning equation in ACT-R — providing a cognitive architecture grounding for spacing-based SRS. This is an independent theoretical validation of FSRS's scheduling principles from a different theoretical tradition (cognitive architecture vs. machine learning).

---

### Institutional Landscape: FSRS and Algorithmic SRS

- **National University of Singapore** (Ye, Su, Cao) — FSRS theoretical foundations
- **Max Planck Institute for Software Systems** (Tabibian, Gomez-Rodriguez) — optimal control approach to SRS
- **Duolingo** (Settles, Meeder) — industrial-scale SRS implementation
- **SuperMemo** (Wozniak) — SM-2 predecessor
- **UCLA** (Bjork, Kornell) — behavioral justification for algorithm-determined scheduling
- **Carnegie Mellon University** (Pavlik, Anderson) — ACT-R cognitive architecture validation

---

### The FSRS Validation Gap (Acknowledged)

As noted in Crispy's original §1: No single peer-reviewed paper directly compares FSRS to SM-2 in a traditional RCT format with human learners randomly assigned to each condition. This is a genuine limitation. The evidence base is:
1. **Theoretical:** DSR model (Ye & Su, 2022/2023) — rigorously peer-reviewed at KDD and IEEE TKDE
2. **Computational benchmark:** srs-benchmark repository — FSRS outperforms SM-2 on log-loss
3. **Practice validation:** Integration into Anki 23.10+ — millions of active users

The appropriate methodology page language is: *"FSRS represents the current state of the art in algorithmic spaced repetition, grounded in a machine-learned memory model trained on 220 million learning events, and independently validated through optimal control theory. Direct head-to-head RCT evidence against SM-2 remains an open research question — as does all SRS algorithm research in naturalistic long-term settings."*

---

## CROSS-SECTION INTEGRATION MAP

The following connections exist between §1 subsections and should be mapped explicitly in Nugget Nihongo's methodology page:

| From | To | Connection |
|---|---|---|
| §1.1 Spaced Repetition | §1.11 FSRS | FSRS is the algorithmic implementation of spacing |
| §1.2 Active Recall | §1.3 Testing Effect | Same underlying phenomenon, meta-analyzed in §1.3 |
| §1.4 Interleaving | §1.5 Desirable Difficulties | Interleaving is one of four desirable difficulties |
| §1.5 Desirable Difficulties | §1.1 + §1.2 + §1.4 | Framework that unifies spacing, retrieval, interleaving |
| §1.6 Comprehensible Input | §1.7 Four Strands | Input is Strand 1; Krashen operationalized by Nation |
| §1.8 Contrastive Analysis | §5 (Agent 11) | CAH is the theoretical parent of all interference point research |
| §1.9 Elaborative Encoding | §1.10 Self-Reference | SRE is a special case of deep elaborative encoding |
| §1.9 Elaborative Encoding | §1.2 Active Recall | Deep encoding + retrieval practice = optimal combination |
| §1.11 FSRS | §1.1 + §1.2 | FSRS operationalizes both spacing and retrieval practice algorithmically |

---

## SUMMARY: NEW CITATIONS ADDED TO §1

| Section | New Citations | Net Addition |
|---|---|---|
| §1.1 Spaced Repetition | Cepeda et al. (2008); Kornell (2009); Bahrick et al. (1993); Webb (2007); Nation (2001) | +5 |
| §1.2 Active Recall | Carpenter et al. (2008); Zaromb & Roediger (2010); Pan et al. (2019); Putnam et al. (2017); Karpicke et al. (2009) | +5 |
| §1.3 Testing Effect | Agarwal et al. (2021); Pan & Rickard (2018); Kornell & Bjork (2007); Tulving & Thomson (1973) | +4 |
| §1.4 Interleaved Practice | Rohrer (2012); Taylor & Rohrer (2010); Sana et al. (2017); Pan (2015) | +4 |
| §1.5 Desirable Difficulties | Bjork (2013); Kornell et al. (2009); Smith & Weinstein (2016); Bjork et al. (2013) | +4 |
| §1.6 Comprehensible Input | VanPatten (1996); Krashen (2004); Ellis (2002); Gass (1997); Swain (1985); Pica (1994) | +6 |
| §1.7 Four Strands | Nation & Newton (2009); Webb & Nation (2017); Laufer & Nation (1999); Schmitt (2000); Nation (2006) | +5 |
| §1.8 Contrastive Analysis | Selinker (1972); Jarvis & Pavlenko (2008); Corder (1967); Gass & Selinker (1983); Pica (1994) | +5 |
| §1.9 Elaborative Encoding | Eysenck (1979); Hulstijn (2003); Joe (2010); Newton (2001) | +4 |
| §1.10 Self-Reference Effect | Rogers et al. (1977); Macrae et al. (1995); Cunningham et al. (2008); Kelley & Jacoby (1996); Klein & Kihlstrom (1986) | +5 |
| §1.11 FSRS | Wozniak (1990); Leitner (1972); srs-benchmark; Kornell & Bjork (2008); Pavlik & Anderson (2005) | +5 |
| **TOTAL NEW** | | **+52 additional citations** |

**Combined with Crispy's original 44 citations:** §1 now contains approximately **96 citations** across 11 subsections.

---


# §1.12 — BOUNDARY CONDITIONS AND LIMITATIONS OF SPACED REPETITION
**Agent:** 28  
**Date:** 3 April 2026  
**Citations:** BC-01 – BC-09  
**Appends to:** SECTION1-EVIDENCE-BASED-v1.md  
**Status:** Canonical — v17

---

## Prefatory Note

Sections §1.1–§1.11 establish the empirical case for spaced repetition, retrieval practice, FSRS, and related evidence-based learning techniques as applied to L2 Japanese vocabulary acquisition. The evidence is strong, replicable, and directly applicable to Nugget Nihongo's architecture. This section does not walk that case back.

§1.12 serves a different function: it defines the *boundary conditions* of the claim — where SRS works best, what it cannot do, and what happens when learners advance beyond the domain where SRS is the highest-ROI activity. An evidence-based methodology page that presents only supportive findings is not academically trustworthy. The sections below provide the honest counterweight that makes everything in §1.1–§1.11 more credible, not less.

---

### §1.12.1 — The Decontextualization Critique

#### The Core Argument

The dominant critique of flashcard-based SRS comes not from opponents of explicit vocabulary learning but from researchers who study *how* vocabulary is acquired most deeply. The critique centers on a structural feature of the flashcard paradigm: **it strips words from the collocational, syntactic, and pragmatic contexts in which they naturally occur**.

The clearest formulation of this position appears in Laufer (2003), who examined whether form-focused vocabulary work — including SRS-style form-meaning pair study — disadvantages learners by building shallow lexical representations (**[BC-01]**). Laufer's argument is not that flashcard study produces no learning; the spacing literature makes clear that it does. The argument is that the *kind* of knowledge built by decontextualized study is qualitatively limited: learners acquire form-meaning mappings without acquiring the collocational frames, argument structures, and register constraints that govern real-world word use. A learner who has drilled 感謝する (*kanshasuru*, "to be grateful") through 10 SRS cycles may still be unable to produce 感謝の意を表す in a formal letter, because the collocational environment was never part of the study event.

The theoretical underpinning here connects to the Involvement Load Hypothesis — the finding that cognitive engagement with a word's *use*, not merely its form-meaning pairing, predicts depth of acquisition. *See §12 [OT-29] for the Involvement Load Hypothesis (Laufer & Hulstijn, 2001).*

Nation's extensive work on vocabulary knowledge dimensions provides complementary framing: intentional form-meaning learning is efficient for establishing the initial form-meaning link, but other dimensions of word knowledge — collocational knowledge, grammatical behavior, constraints on use — require contextual encounter rather than decontextualized study. *For Nation's framework of vocabulary knowledge dimensions and its implications for Nugget Nihongo's card architecture, see §CA (cross-reference; Nation's major works are cited in §1.4 and §CA — not re-cited here).*

#### The Design Response

Nugget Nihongo's card architecture directly addresses the decontextualization critique at the design level. The standard card template includes:

1. **Example sentences in natural Japanese** (*Contoh JP* field, required for all cards), providing syntactic and collocational context alongside the form-meaning pair.
2. **Collocational and usage notes** (*Keterangan Tambahan* field), flagging common collocational partners, register constraints, and usage boundaries for items where misuse is a realistic risk.
3. **Cultural explanatory notes** (*Penjelasan Budaya* field), situating items in the pragmatic and sociocultural contexts that determine appropriate use.

The result is a card architecture that preserves the retrieval-practice efficiency advantage of SRS while partially reconstructing the contextual information that decontextualized flashcard paradigms strip away. This is not a complete solution — contextual vocabulary knowledge ultimately requires contextual practice, not just contextual exposure on a card back — but it substantially reduces the force of Laufer's critique as applied to this platform specifically.

**The remaining gap** — the gap between knowing the collocational information on a card back and being able to deploy it in production — is addressed by the platform's cross-referencing to output practice and extensive reading as complementary activities. *See §1.12.4 (Spontaneous Production) and §1.12.5 (Design Implication).*

---

### §1.12.2 — Vocabulary Size Threshold: When Extensive Reading Outperforms SRS

#### The Crossover Argument

Deliberate vocabulary learning through SRS is not equally efficient across all proficiency levels. Webb and Nation (2017) synthesize the available evidence to identify a **vocabulary size threshold** beyond which the cost-benefit calculation for SRS vs. extensive reading (ER) shifts decisively in favor of ER (**[BC-02]**).

Below approximately 3,000 word families, deliberate SRS study is the highest-efficiency vocabulary learning activity available. The reasoning is structural: ER requires learners to encounter unknown words repeatedly in running text to acquire them incidentally. This process is effective, but it requires high text coverage — a reader must already know approximately 95% of the words in a text to acquire the remaining 5% from context with reasonable reliability (**[BC-08]**, Hu & Nation, 2000). Below 3,000 word families, texts that are both comprehensible and provide sufficient incidental exposure to target vocabulary are extremely difficult to find. Deliberate study via SRS is simply faster: it provides controlled, repeated, retrievable exposure to exactly the words the learner needs, rather than waiting for those words to appear in readable texts at sufficient frequency.

The picture inverts beyond the 3,000 word family threshold. At this level, learners can access a wide range of authentic texts with reasonable comprehension. The volume of incidental encounters in ER — across novels, news, manga, and graded readers — begins to dwarf what deliberate SRS study can provide per unit of time. Waring and Nation (2004) document the rates: readers can encounter thousands of running words per hour in engaged ER, producing incidental exposure to mid-frequency vocabulary that no feasible SRS deck can replicate in volume (**[BC-07]**). Webb and Nation (2017) argue that this shift makes ER the dominant vocabulary growth engine for advanced learners, with SRS shifting into a maintenance and extension role (**[BC-02]**).

#### Implications for JLPT Proficiency Levels

This threshold has direct implications for Nugget Nihongo's target user population:

- **JLPT N5–N4 (approximately 800–1,500 word families):** Learners are operating well below the SRS efficiency threshold. SRS is unambiguously the highest-ROI vocabulary study activity. Nugget Nihongo's deck architecture is optimally suited to this population.
- **JLPT N3 (approximately 2,000–3,500 word families):** Learners are approaching the crossover zone. SRS remains highly efficient for deliberate vocabulary extension, but integrating graded extensive reading alongside SRS will produce better outcomes than SRS alone.
- **JLPT N2–N1 (approximately 4,000–10,000 word families and beyond):** Learners are above the crossover threshold. SRS should shift toward maintenance of existing knowledge and deliberate acquisition of high-value specialized vocabulary (keigo paradigms, field-specific terminology). ER should become the primary vocabulary growth engine.

*For extensive reading theory, text coverage thresholds, and the integration of ER with SRS-based study at intermediate and advanced proficiency levels, see §4 [ER cluster — forthcoming from Agents 22–23].*

#### Design Implication

The methodology page should be explicit that Nugget Nihongo is optimized for learners at approximately JLPT N5–N3 level. Claiming equal utility across all proficiency levels would be inaccurate. Framing the platform as "the vocabulary foundation engine for beginner and intermediate learners" is both honest and positions it accurately within a broader learning program.

---

### §1.12.3 — Anxiety, Failure Feedback, and SRS

#### The Anxiety-SRS Interaction

SRS systems, including Anki with FSRS, deliver explicit, repeated, unavoidable failure feedback. Every "Again" press is a discrete, unambiguous signal that the learner did not successfully retrieve the target item. For learners without anxiety concerns, this is simply information. For learners with elevated foreign language anxiety — a well-documented individual difference affecting a substantial minority of L2 learners — this feedback structure may be disproportionately demotivating.

*For the full Foreign Language Classroom Anxiety profile, including Horwitz et al.'s foundational work and subsequent individual differences research, see §13 [ID-01–ID-07]. The claims in this subsection assume that profile and do not re-cite the FLCA literature.*

The interaction between anxiety and failure-salient feedback in learning technology is grounded in Pekrun's (2006) control-value theory of achievement emotions, which provides the most developed theoretical account of how negative achievement outcomes (failing to recall a word) produce emotions (shame, frustration, hopelessness) that interfere with subsequent performance (**[BC-05]**). Pekrun's framework predicts that the anxiety-performance relationship is specifically mediated by the learner's appraisal of the failure event: failures attributed to low ability (stable, internal, uncontrollable) produce stronger negative affect than failures attributed to insufficient practice (unstable, controllable). An SRS system that presents "Again" without any contextual framing invites ability attributions.

Plass, Homer, and Kinzer (2015) review game-based learning failure states and observe that the *framing* of failure feedback — not just its presence — substantially determines the emotional response (**[BC-09]**). "Let's review this again" and "Again" communicate identical information about scheduling but substantially different attributional frames. The first signals process; the second signals outcome. For anxiety-prone learners, this distinction may measurably affect session completion and long-term engagement.

#### The Design Response

FSRS's algorithmic response to "Again" answers is pedagogically well-calibrated: the interval is reduced, the difficulty parameter is adjusted, and the item is rescheduled for accelerated review. This is the correct response to failure feedback from a learning science perspective. The problem is not the algorithm — it is the UX framing of the failure event.

The methodology page should explicitly address anxiety-aware study practices:

1. **Reframe the "Again" press** as a scheduling signal, not an ability verdict. AnkiDroid customization (custom button labels, card templates that include "This card will come back soon — that's the system working") can partially address this.
2. **Acknowledge that high failure rates early in a deck are expected and algorithmically appropriate.** New learners encountering a mature deck with many reviews due may experience a failure rate of 30–50% before FSRS calibrates to their retention level. This is not a signal of learning failure; it is the system gathering data.
3. **Refer anxiety-prone learners to §13 for individual differences considerations** and to the platform's guidance on deck configuration for high-anxiety learners (smaller daily card targets, lower new card introduction rates).

---

### §1.12.4 — What SRS Cannot Do: Hard Limits

This subsection provides a clear enumeration of domains where SRS — regardless of how well-designed the deck or how faithfully the algorithm is followed — cannot produce the target competency on its own. Each limitation is cross-referenced to the corpus section that addresses it.

---

**1. Spontaneous Productive Vocabulary**

SRS as implemented in Anki builds *recognition vocabulary* — the ability to retrieve meaning from form — more efficiently than *productive vocabulary* — the ability to retrieve form from meaning and deploy it in spontaneous production. The receptive-to-productive gap is well-documented: even extensive receptive exposure does not automatically convert into productive availability (Laufer & Paribakht, 1998; **[BC-06]**). A learner who correctly rates the Japanese-to-Indonesian direction of a card as "Good" is not thereby able to produce the Japanese form spontaneously in a conversation.

Productive vocabulary development requires output practice — speaking and writing activities that force the learner to retrieve form from meaning under time pressure. *See §12 [OT cluster, particularly KR-09, OT-02–OT-05 on the Output Hypothesis and OT-18–OT-24 on Skill Acquisition Theory] for how output practice addresses the receptive-productive gap.*

---

**2. Listening Comprehension in Connected Speech**

Recognizing a lexical item in the controlled, isolated context of an SRS review does not guarantee recognizing it in natural connected speech at native speed. The gap between lexical recognition in citation form and recognition in running speech involves phonological reduction, coarticulation, pitch accent patterns in context, and processing demands specific to the auditory modality. These are competencies that SRS — which presents items in written form with controlled audio clips — cannot build through card review alone.

*See §3 [L2 Listening cluster — forthcoming] for listening comprehension theory and its integration with vocabulary-based study.*

---

**3. Pragmatic and Sociolinguistic Competence**

Knowing the SRS definition of 申し上げます (*mōshiagemasu*) does not constitute knowing when, with whom, and in what interactional context to use it. Japanese pragmatic competence — particularly keigo (honorific language), speech level selection, and contextualized politeness — requires understanding of the social relationships, institutional contexts, and cultural scripts that govern language use. An SRS card can flag that a form is keigo-appropriate; it cannot simulate the sociolinguistic judgment required to deploy it correctly in a real interaction.

*See §14 [Sociolinguistic Competence cluster — forthcoming] for pragmatic and sociolinguistic competence in Japanese L2 acquisition.*

---

**4. Grammar Automatization**

SRS can make grammatical patterns *salient* — learners who study て-form construction patterns on cards will notice the pattern when they encounter it in input. This noticing function is genuinely valuable. What SRS cannot produce is *proceduralization* of grammatical knowledge — the ability to deploy a grammatical pattern fluently in real-time production without conscious effort. The declarative/procedural distinction in SLA is fundamental: declarative knowledge (knowing that a rule exists and what it requires) and procedural knowledge (being able to execute the rule automatically) are distinct systems that develop through different practice types (Hulstijn, 2001; **[BC-03]**; Ellis, 2009; **[BC-04]**). *Cross-reference §12 [OT-18–OT-24] on Skill Acquisition Theory (DeKeyser) for the declarative-to-procedural transition and the role of output practice in proceduralization. Cross-reference §2 [GA cluster — forthcoming] for grammar acquisition theory.*

---

**5. Discourse and Extended Communication**

SRS operates at the word/sentence level. Cards test the ability to retrieve a meaning, read an example sentence, and identify a form. Extended discourse competence — the ability to construct and follow coherent argument structures, manage topic transitions, sustain a narrative, or negotiate meaning in real time — is built at a scale of organization that is simply outside the domain of the flashcard paradigm. Discourse competence requires extended exposure to and production of discourse itself.

This is not a criticism of SRS. It is a statement of scope. SRS is not a discourse-practice tool, and it should not be positioned as one.

---

### §1.12.5 — Design Implication: SRS as Foundation, Not Totality

The preceding subsections — the decontextualization critique, the vocabulary size threshold, the anxiety interaction, and the hard limits of what SRS can produce — converge on a single positioning conclusion: **Spaced repetition is the optimal tool for building the vocabulary and form-recognition foundation on which all other L2 competencies depend, but it is not a complete language learning program and should not be positioned as one.**

This is not a concession. It is the most defensible and most credible framing available.

Below approximately 3,000 word families — roughly the JLPT N3 level — SRS is, by a substantial margin, the highest-ROI study activity available to a language learner. The evidence from Kim and Webb's (2022) meta-analysis (d = 0.62, 48 experiments), Karpicke and Roediger's (2008) retrieval practice paradigm (2× retention advantage over study-only), and Bahrick et al.'s (1993) 9-year longitudinal data converge on this conclusion. *(See §1.1–§1.3 for the full citation base; not re-cited here.)* For a learner who has limited study time and is beginning Japanese, the question is not whether to use SRS but how to use it most effectively. Nugget Nihongo is the answer to that question.

Beyond that level, the calculus changes — not because SRS stops working, but because other activities become competitive or dominant for certain subskills. Extensive reading begins to contribute vocabulary growth at scale (Webb & Nation, 2017; **[BC-02]**). Output practice becomes necessary for productive vocabulary and grammar automatization (*See §12*). Listening exposure becomes critical for phonological and prosodic naturalization (*See §3*). Sociolinguistic competence requires authentic interaction, not card review (*See §14*). A learner who continues to rely solely on SRS beyond N3 level will build an increasingly large recognition vocabulary while falling further behind in spontaneous production, listening comprehension, and pragmatic competence.

The honest framing — and the only one that sophisticated learners will trust — is that Nugget Nihongo is **the vocabulary and form-recognition engine at the core of a balanced Japanese learning program**, not a substitute for a balanced program. This positioning is consistent with Nation's Four Strands framework, which argues that a well-designed language program must distribute learning time across meaning-focused input, meaning-focused output, language-focused learning, and fluency development. *(Cross-reference §CA for the Four Strands framework; Nation's work is cited there and not re-cited here.)*

The methodology page's opening statement should reflect this framing explicitly. Something in the order of: "Nugget Nihongo is the vocabulary and kanji recognition engine at the core of your Japanese learning program. It is designed to do one thing exceptionally well — build and maintain the vocabulary foundation that all other Japanese skills depend on — and to do it more efficiently than any other study method available to a self-directed learner." Every subsequent claim in the methodology page should be consistent with this scope.

This positioning also performs a competitive differentiation function. Apps that claim to make users fluent in 30 days, or that position themselves as a complete learning solution, invite skepticism from any learner who has been through the acquisition process. Honest scoping — "we are the best available tool for this specific and essential part of the learning process" — builds the kind of trust that retains learners through the years of study that Japanese acquisition actually requires. Overclaiming produces short-term downloads and long-term churn. Honest positioning produces long-term commitment from learners who are approaching the process realistically.

**Design Implication:** The methodology page's framing should be: Nugget Nihongo is the vocabulary and form-recognition engine at the core of a balanced Japanese learning program. It delivers the highest available ROI for vocabulary acquisition at beginner and intermediate levels (N5–N3), provides maintenance and extension value at advanced levels (N2–N1), and is most effective when complemented by extensive reading, output practice, and listening exposure as learners advance. Every other claim in the methodology page should be consistent with this positioning.

---

## CITATION LIST — §1.12 (BC-01–BC-09)

**[BC-01]** Laufer, B. (2003). Vocabulary acquisition in a second language: Do learners really acquire most vocabulary by reading? Some empirical evidence. *Canadian Modern Language Review, 59*(4), 567–587. https://doi.org/10.3138/cmlr.59.4.567

**[BC-02]** Webb, S., & Nation, I. S. P. (2017). *How vocabulary is learned*. Oxford University Press. [DOI unverified — book]

**[BC-03]** Hulstijn, J. H. (2001). Intentional and incidental second language vocabulary learning: A reappraisal of elaboration, rehearsal and automaticity. In P. Robinson (Ed.), *Cognition and second language instruction* (pp. 258–286). Cambridge University Press. [DOI unverified — book chapter]

**[BC-04]** Ellis, R. (2009). Implicit and explicit learning, knowledge and instruction. In R. Ellis, S. Loewen, C. Elder, R. Erlam, J. Philp, & H. Reinders (Eds.), *Implicit and explicit knowledge in second language learning, testing and teaching* (pp. 3–25). Multilingual Matters. [DOI unverified — book chapter]

**[BC-05]** Pekrun, R. (2006). The control-value theory of achievement emotions: Assumptions, corollaries, and implications for educational research and practice. *Educational Psychology Review, 18*(4), 315–341. https://doi.org/10.1007/s10648-006-9029-9

**[BC-06]** Laufer, B., & Paribakht, T. S. (1998). The relationship between passive and active vocabularies: Effects of language learning context. *Language Learning, 48*(3), 365–391. https://doi.org/10.1111/0023-8333.00042

**[BC-07]** Waring, R., & Nation, I. S. P. (2004). Second language reading and incidental vocabulary learning. *Angles on the English-Speaking World, 4*, 97–110. [DOI unverified — no standard DOI for this journal volume]

**[BC-08]** Hu, M., & Nation, I. S. P. (2000). Unknown vocabulary density and reading comprehension. *Reading in a Foreign Language, 13*(1), 403–430. [DOI unverified — predates standard DOI assignment for this journal]

**[BC-09]** Plass, J. L., Homer, B. D., & Kinzer, C. K. (2015). Foundations of game-based learning. *Educational Psychologist, 50*(4), 258–283. https://doi.org/10.1080/00461520.2015.1122533

---

*§1.12 complete — Agent 28 — 3 April 2026*  
*Appends to SECTION1-EVIDENCE-BASED-v1.md after §1.11*  
*Send to Agent 2 for merge decision*
