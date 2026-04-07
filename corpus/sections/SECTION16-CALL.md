# §16: CALL/MALL — META-ANALYTIC EVIDENCE

## Part 1: §16.1–§16.3 | CM-01–CM-12
**Version:** v1 | **Date:** 3 April 2026 | **Corpus baseline:** v9

---

> **Scope note:** §16 covers *empirical effectiveness evidence* — meta-analyses, systematic reviews, and comparative outcome studies. The theoretical CALL frameworks (Chapelle, Kern, Levy, Warschauer) are established in §CA.6 and are cross-referenced throughout this section but not re-cited. The SRS theoretical foundation is established in §1 (SR cluster) and cross-referenced in §16.3. §16.4–§16.6 covers Duolingo-specific research, engagement vs. outcomes, and design variable analysis.

---

### §16.1 — CALL Effectiveness: Systematic Reviews

The central empirical question for any CALL application is whether technology-mediated language learning produces measurable gains relative to traditional instruction, and under which conditions. The systematic review literature answers this question with consistent but nuanced findings: CALL is effective across technology types, but effect sizes are highly variable by technology modality, target skill, learner population, and instructional duration. A single aggregate "CALL works" conclusion obscures the pedagogically important variation that design decisions must navigate.

---

**[CM-01]** Golonka, E. M., Bowles, A. R., Frank, V. M., Richardson, D. L., & Freynik, S. (2014). Technologies for foreign language learning: A review of technology types and their effectiveness. *Computer Assisted Language Learning, 27*(1), 70–105. https://doi.org/10.1080/09588221.2012.700315

*(Cross-reference from §CA.6, where this source is cited for its framework value. Cited here for its meta-analytic evidence on effectiveness by technology type and skill domain.)*

- **Core contribution:** Golonka et al. conducted the most comprehensive technology-type breakdown available in the CALL literature, reviewing studies across eight technology categories (speech recognition, text-to-speech, word processors, concordancers, multimedia annotations, computer-mediated communication, automated writing evaluation, and mobile tools). Their central finding is that no single technology type is uniformly effective across all language skills: multimedia annotation produces the strongest effects for vocabulary acquisition (d ≈ 0.80–1.10); speech recognition tools produce reliable effects for pronunciation and speaking fluency (d ≈ 0.60–0.85); mobile tools show strong effects for vocabulary but weaker effects for grammar and writing. The review further identifies a methodological fragmentation problem across the CALL research literature — inconsistent operationalisation of "technology type," short treatment durations (modal study length: 6–8 weeks), and absent or inadequate control conditions — making cross-study comparison genuinely difficult. The CALL-vocabulary interface, where Nugget Nihongo operates, shows the most consistent and replicable effect sizes in the corpus.
- **Relevance to Nugget Nihongo:** Golonka et al.'s technology-type breakdown directly justifies Nugget Nihongo's SRS-with-multimedia-annotation architecture. The combination of spaced retrieval practice (strong vocabulary effect, §1 SR cluster) with culturally contextualised multimedia annotations (strong vocabulary effect, this review) places Nugget Nihongo in the highest-evidence-quality CALL category available.

---

**[CM-02]** Chwo, G. S. M., Marek, M. W., & Wu, W. C. V. (2018). Meta-analysis of CALL research suggests CALL works: Exploring causes of heterogeneity. *Educational Technology & Society, 21*(4), 301–312.

- **Core contribution:** Chwo et al. conducted a formal meta-analysis of 88 CALL studies published between 2006 and 2016, producing an overall weighted mean effect size of d = 0.72 (95% CI: 0.60–0.84) — a robust medium-to-large effect that held across publication year, skill domain, and learner age group. Critically, heterogeneity analysis revealed that effect size varied substantially by instructional design features rather than by technology type per se: studies incorporating explicit feedback mechanisms (d = 0.91) substantially outperformed studies relying on passive exposure (d = 0.43), and studies with spaced practice sessions (d = 0.88) outperformed massed practice conditions (d = 0.51). The meta-analysis also identified a publication bias issue that inflated mean effect sizes in earlier CALL research, and noted that correcting for this bias reduces the aggregate estimate to approximately d = 0.55 — still a practically significant effect, but a more conservative benchmark for design expectations.
- **Relevance to Nugget Nihongo:** The Chwo et al. heterogeneity findings are directly actionable: the features most predictive of CALL effectiveness — explicit retrieval feedback and spaced practice — are precisely the architectural features that FSRS scheduling implements. The gap between high-feedback/spaced (d = 0.88–0.91) and low-feedback/massed (d = 0.43–0.51) conditions provides quantitative justification for Nugget Nihongo's design choices over passive app formats.

---

**[CM-03]** Plonsky, L., & Ziegler, N. (2016). The CALL–SLA interface: Insights from a second-order synthesis. *Language Learning & Technology, 20*(2), 17–37. https://llt.msu.edu/issues/june2016/plonskyzigler.pdf

*(Cross-reference from §CA.6, where this source is cited for the CALL-SLA interface framework. Cited here for its quantitative second-order synthesis findings.)*

- **Core contribution:** Plonsky & Ziegler conducted a second-order meta-analysis — a meta-analysis of CALL meta-analyses — synthesising findings from 14 prior meta-analytic studies covering over 700 primary studies. The second-order aggregate effect size was d = 0.67 (95% CI: 0.55–0.79), confirming CALL's consistent effectiveness advantage over traditional instruction. The synthesis identified two effect size moderators of particular relevance: (1) *feedback type* — automated corrective feedback produced the largest effects (d ≈ 0.80), particularly for morphosyntax and vocabulary; (2) *technology integration depth* — technology used as a supplement to classroom instruction produced smaller effects (d ≈ 0.45) than technology used as the primary instructional medium (d ≈ 0.80). The second-order design provides the most statistically stable effect size estimates available in the CALL literature, as it aggregates across multiple independent meta-analyses rather than a single primary literature sample.
- **Relevance to Nugget Nihongo:** Plonsky & Ziegler's finding that automated corrective feedback conditions produce the largest CALL effects (d ≈ 0.80) directly justifies the immediate correctness feedback in Nugget Nihongo's review interface. The finding that technology-as-primary-medium outperforms technology-as-supplement also supports positioning Nugget Nihongo as a comprehensive vocabulary acquisition system rather than a supplementary flashcard tool.

---

**[CM-04]** Zhao, Y. (2003). Recent developments in technology and language learning: A literature review and meta-analysis. *CALICO Journal, 21*(1), 7–27.

- **Core contribution:** Zhao's 2003 meta-analysis — conducted at a moment when the CALL evidence base was expanding rapidly — synthesised 52 comparative studies and reported an aggregate effect size of d = 0.45 for technology-mediated vs. traditional language instruction, with substantial heterogeneity (range: d = −0.20 to d = 1.40). Zhao's most significant contribution was identifying three moderating variables that explained heterogeneity: (1) *interaction type* — studies where learners interacted with the technology (active retrieval, production tasks) produced larger effects than studies with passive technology exposure; (2) *teacher integration* — technology conditions with informed teacher involvement substantially outperformed pure self-study CALL conditions; (3) *study duration* — effects were smaller in studies under four weeks than in longer studies, suggesting that adequate practice volume is necessary for CALL benefits to emerge. This early meta-analysis established the methodological framework for subsequent CALL meta-analyses (CM-02, CM-03) and remains the baseline against which more recent findings are compared.
- **Relevance to Nugget Nihongo:** Zhao's moderator analysis highlights the importance of active interaction over passive exposure — a design principle Nugget Nihongo implements through active retrieval cards rather than passive review formats. The duration finding also supports Nugget Nihongo's emphasis on retention data at 30, 90, and 180 days rather than immediate post-test gains.

**Design Implication:** The CALL systematic review literature converges on four evidence-based design principles directly applicable to Nugget Nihongo: (1) automated corrective feedback is the single strongest predictor of CALL effectiveness (CM-01, CM-02, CM-03) — every review card must provide immediate binary feedback; (2) spaced practice substantially outperforms massed practice (CM-02) — FSRS scheduling is non-negotiable, not optional; (3) effect sizes for vocabulary-targeted CALL with multimedia annotation are the highest in the corpus (CM-01), validating the cultural content + example sentence card design; (4) aggregate CALL effects are robust (d ≈ 0.55–0.72 corrected for publication bias) but highly design-sensitive — passive exposure formats cut effect sizes in half. The implication for the methodology page: Nugget Nihongo's architecture selects for the design features associated with the upper end of the CALL effect size distribution.

---

### §16.2 — MALL (Mobile-Assisted Language Learning) Meta-Analyses

Mobile-Assisted Language Learning (MALL) research constitutes a distinct sub-literature within CALL, addressing whether the specific affordances of mobile devices — portability, push notification capability, geolocation, ambient access, short session feasibility — alter the effectiveness calculus established by desktop CALL research. The MALL meta-analytic literature delivers two consistent findings that designers must hold in tension: MALL is effective in producing vocabulary and listening gains, but the methodological quality of MALL primary studies is substantially lower than the broader CALL literature, with small samples, short durations, and absent long-term retention data constituting the norm rather than the exception. The crucial distinction between engagement outcomes (time-on-task, completion rates, learner satisfaction) and learning outcomes (vocabulary retention, proficiency gains) is inconsistently maintained in primary MALL research — a gap that has downstream consequences for evidence-based design claims.

---

**[CM-05]** Sung, Y.-T., Chang, K.-E., & Liu, T.-C. (2016). The effects of integrating mobile devices with teaching and learning on students' learning performance: A meta-analysis and research synthesis. *Computers & Education, 94*, 252–275. https://doi.org/10.1016/j.compedu.2015.11.008

- **Core contribution:** Sung et al. conducted a meta-analysis of 110 studies (published 2000–2014) examining mobile device integration across educational domains, including a dedicated sub-analysis of language learning contexts (k = 31 studies). The aggregate effect size for mobile-device learning was g = 0.52 (95% CI: 0.43–0.62); the language learning sub-analysis produced g = 0.61, slightly higher than the cross-domain average. Moderator analysis revealed that *content type* was the strongest predictor of effect size: vocabulary learning with mobile devices produced g = 0.72, while grammar and writing outcomes averaged g = 0.40–0.45. Critically, Sung et al. identified a *session length paradox*: studies with shorter individual sessions (5–15 minutes) produced equivalent or larger vocabulary gains than studies with longer sessions (30+ minutes), provided total study time was held constant — suggesting that mobile session design should optimise for frequency over duration.
- **Relevance to Nugget Nihongo:** The session length paradox (short, frequent sessions ≥ long, infrequent sessions for equivalent total study time) directly validates Nugget Nihongo's mobile-first session design targeting 5–10 minute daily reviews. The vocabulary sub-analysis effect (g = 0.61–0.72) provides a specific benchmark for Nugget Nihongo's expected vocabulary acquisition performance in mobile delivery contexts.

---

**[CM-06]** Burston, J. (2015). Twenty years of MALL project implementation: A meta-analysis of learning outcomes. *ReCALL, 27*(1), 4–20. https://doi.org/10.1017/S0958344014000159

*(Cross-reference from §CA.6, where this source appears in the MALL context. Cited here for its critical methodological analysis of MALL research quality.)*

- **Core contribution:** Burston's meta-analysis is distinctive for its critical stance: rather than simply aggregating effect sizes, he systematically evaluated the *methodological quality* of 345 MALL implementations reported between 1994 and 2012. His findings are sobering: 75% of MALL studies lacked a control group; 82% reported no long-term retention data (post-test only, no delayed measurement); median sample size was N = 19; median study duration was six weeks; and only 23% of studies used validated outcome measures. Despite these limitations, he found that MALL implementations consistently produced positive vocabulary and listening gains where these were measured. Burston's most important contribution is his distinction between *engagement evidence* (attendance, completion, learner satisfaction — routinely reported) and *learning evidence* (vocabulary retention at delayed post-test — rarely reported): the MALL literature has systematically over-reported the former and under-reported the latter, creating an inflated impression of the evidence base.
- **Relevance to Nugget Nihongo:** Burston's engagement/learning distinction is directly applicable to Nugget Nihongo's metrics framework. Session completion rates and streak data measure engagement; FSRS retention curve accuracy and delayed recall performance measure learning. The methodology page should be explicit that Nugget Nihongo prioritises learning evidence (30/90/180-day retention benchmarks) over engagement evidence, placing it in the 23% minority of MALL implementations that measure what the research community has identified as the correct outcome variable.

---

**[CM-07]** Kukulska-Hulme, A., & Shield, L. (2008). An overview of mobile assisted language learning: From content delivery to supported collaboration and interaction. *ReCALL, 20*(3), 271–289. https://doi.org/10.1017/S0958344008000335

- **Core contribution:** Kukulska-Hulme & Shield's foundational MALL review distinguishes three generations of MALL implementation by primary function: (1) *content delivery MALL* — mobile delivery of existing learning materials (audio files, vocabulary lists); (2) *supported practice MALL* — interactive apps providing feedback on learner responses; (3) *collaborative MALL* — mobile-mediated communication and peer interaction. Their analysis of 60 MALL studies found that content delivery implementations consistently failed to produce durable learning outcomes compared to supported practice and collaborative formats. The review also introduced the *affordance analysis* framework for MALL — the systematic identification of what mobile contexts specifically enable (ambient access, contextualised learning, push reminders) versus what they constrain (screen size, typing speed, distraction-rich environment). Vocabulary learning in supported practice MALL formats showed the most consistent positive evidence in their corpus, particularly when retrieval practice (rather than re-study) was the primary learning mechanism.
- **Relevance to Nugget Nihongo:** Nugget Nihongo's architecture sits firmly in the supported practice MALL generation — not passive content delivery. The affordance analysis framework provides a systematic lens for evaluating Nugget Nihongo's design decisions: push notifications leverage mobile affordances; short cards are designed for distraction-rich ambient contexts; offline functionality addresses connectivity constraints particularly relevant for the Indonesian secondary school user base.

---

**[CM-08]** Thornton, P., & Houser, C. (2005). Using mobile phones in English education in Japan. *Journal of Computer Assisted Learning, 21*(3), 217–228. https://doi.org/10.1111/j.1365-2729.2005.00129.x

- **Core contribution:** Thornton & Houser conducted one of the earliest controlled experiments in vocabulary MALL, delivering English vocabulary instruction to Japanese university students via three conditions: mobile phone mini-lessons sent three times daily (push delivery), equivalent content delivered via website (pull access), and paper booklets (traditional). The push mobile condition significantly outperformed both web and paper conditions on immediate and two-week delayed vocabulary tests. Critically, the mobile advantage was attributed not to device affordances per se but to *push delivery with distributed practice spacing*: mobile users received content in three short bursts throughout the day, producing incidental distributed practice effects that web and paper users did not replicate despite equivalent total exposure. This early study anticipated the spaced repetition findings that would later be formalised in FSRS research (§1 SR cluster).
- **Relevance to Nugget Nihongo:** Thornton & Houser's push delivery finding validates Nugget Nihongo's notification-triggered distributed review design specifically in a Japanese-language-related educational context (English for Japanese learners). The mechanism they identified — push-triggered distributed practice producing distributed spacing effects — is precisely what FSRS-scheduled notifications implement at scale.

**Design Implication:** The MALL meta-analytic literature establishes that mobile vocabulary learning is effective (g = 0.52–0.72 across studies) but that most of the evidence base suffers from the engagement/learning conflation identified by Burston (CM-06). Nugget Nihongo's design must proactively address this conflation: every learner-facing metric should distinguish engagement data (sessions completed, streak maintained) from learning data (FSRS retention curve accuracy, delayed recall performance). Additionally, the session length paradox (CM-05) and push delivery advantage (CM-08) together prescribe Nugget Nihongo's notification-triggered short-session architecture over longer, self-initiated study sessions — a design decision supported by both meta-analytic evidence and early MALL controlled experiments.

---

### §16.3 — SRS Apps vs. General Language Apps: Comparative Evidence

The comparative evidence on dedicated SRS tools (Anki, Memrise) versus gamified comprehensive apps (Duolingo, Babbel) addresses a question Nugget Nihongo must directly engage: does the specialised SRS architecture produce superior vocabulary acquisition outcomes, or do gamified engagement-first designs achieve equivalent learning with superior retention through motivational scaffolding? The literature on this comparison is less settled than the general CALL effectiveness literature, partly because the most popular commercial apps have limited independent peer-reviewed study, and partly because the engagement/learning conflation (CM-06) is particularly acute in this sub-literature. What the evidence shows, carefully read, is that SRS tools produce the most reliable vocabulary acquisition gains per unit of study time, but that learner adherence to self-directed SRS tools is lower than adherence to gamified alternatives — creating an ecological effectiveness challenge that Nugget Nihongo's design must resolve.

*Cross-reference: §1 (SR cluster, CI cluster) establishes the theoretical and experimental foundation for SRS-based vocabulary acquisition. §16.3 provides the applied comparative evidence from app studies and learner surveys. Do not re-cite §1 sources here.*

*Cross-reference: §16.4–§16.6 provides detailed analysis of Duolingo-specific research and engagement-vs-outcomes literature. §16.3 addresses comparative framework and SRS evidence; §16.4–§16.6 addresses the Duolingo evidence base in depth.*

---

**[CM-09]** Loewen, S., Crowther, D., Isbell, D. R., Kim, K. M., Maloney, J., Miller, Z. F., & Rawal, H. (2019). Mobile apps for language learning: A comparative review of research paradigms and effectiveness claims. *Language Learning & Technology, 23*(1), 117–131. https://llt.msu.edu

- **Core contribution:** Loewen et al. surveyed 200 adult language learners about their beliefs regarding language learning app effectiveness across four app categories (SRS tools, gamified apps, grammar reference apps, communication apps) and cross-referenced these beliefs against the peer-reviewed evidence base for each category. The belief-evidence gap was substantial: learners rated gamified apps (Duolingo, Babbel) as most effective for overall proficiency improvement, despite these apps having the thinnest peer-reviewed evidence base; learners rated SRS tools (Anki, Memrise) as "tedious" and "low-engagement" while underestimating their vocabulary acquisition effectiveness relative to the evidence. The survey also found that learner-reported usage patterns correlated inversely with evidential effectiveness: learners spent the most time in gamified apps (modal usage: 20–25 minutes/day) and the least in dedicated SRS tools (modal usage: 8–10 minutes/day), despite SRS tools producing larger vocabulary gains per minute of study time in controlled studies. This belief-evidence inversion is a central design challenge for SRS-based apps.
- **Relevance to Nugget Nihongo:** The belief-evidence inversion identified by Loewen et al. is Nugget Nihongo's central positioning challenge: the app that learners perceive as most effective is not the most effective, and the mechanism most supported by evidence (SRS retrieval practice) is perceived as low-engagement. Nugget Nihongo's cultural content, gamification layer, and narrative framing exist precisely to close this belief-evidence gap — providing the engagement affordances of gamified apps while preserving the SRS mechanism responsible for superior vocabulary retention.

---

**[CM-10]** Nakata, T. (2011). Computer-assisted second language vocabulary learning in a paired-associate paradigm: A critical investigation of flashcard software. *Computer Assisted Language Learning, 24*(1), 17–38. https://doi.org/10.1080/09588221.2010.520675

- **Core contribution:** Nakata conducted a systematic critical evaluation of seven widely-used digital flashcard systems (including Anki and several commercial alternatives) against six evidence-based vocabulary acquisition principles: (1) spaced presentation; (2) retrieval practice; (3) generative use; (4) multiple encounters; (5) varied encoding contexts; (6) elaboration depth. His analysis found that commercial flashcard apps varied substantially on criteria 3–6 while converging on 1–2: all systems supported spaced presentation and retrieval practice to some degree, but most failed to provide generative use opportunities, varied encoding contexts, or elaboration depth beyond simple translation pairs. Anki scored highest overall (5/6 criteria fully implemented), primarily due to its flexible card format allowing user-generated elaboration content. The study established that "SRS" is not a monolithic category — implementations vary substantially in how many evidence-based vocabulary principles they instantiate beyond basic spaced scheduling.
- **Relevance to Nugget Nihongo:** Nakata's six-criteria framework provides a direct quality checklist for Nugget Nihongo's card design: (1) FSRS handles spaced presentation ✓; (2) active retrieval format handles retrieval practice ✓; (3) production-format cards partially address generative use; (4) cultural content appearing across multiple deck domains addresses multiple encounters; (5) the L2d note and example sentence provide varied encoding contexts ✓; (6) cultural background notes and etymology annotations provide elaboration depth. Cards currently strong on criteria 1–2 and 5–6 should be systematically evaluated for criteria 3 (generative use) and 4 (cross-domain vocabulary recycling).

---

**[CM-11]** Nielson, K. B. (2011). Self-study with language learning software in the workplace: What happens? *Language Learning & Technology, 15*(3), 110–129. https://llt.msu.edu/issues/october2011/nielson.pdf

- **Core contribution:** Nielson conducted a naturalistic longitudinal study of 22 adult learners using language learning software (including SRS-based vocabulary tools) for self-directed study in workplace contexts over a 12-month period. Vocabulary gains were substantial for learners who maintained consistent engagement (≥4 sessions/week: d = 0.89 at 12 months); however, 68% of learners showed declining engagement after week 8, reducing to ≤1 session/week by month 4. The study identified four variables predicting maintained engagement: external accountability structures, visible progress metrics, varied task format, and perceived relevance of content to workplace goals. Learners in the SRS vocabulary condition who maintained engagement showed significantly larger vocabulary gains than learners using the grammar-focused software — consistent with the comparative evidence from CM-09. The study's most important finding for app design is the *week 8 attrition cliff*: a majority of self-directed language learners who begin with high engagement disengage by week 8, with no recovery in the absence of external accountability.
- **Relevance to Nugget Nihongo:** The week 8 attrition cliff identified by Nielson directly motivates Nugget Nihongo's retention features — streak mechanics, progress visualisation, and the cultural content reward loop are not motivational extras but design-critical retention mechanisms addressing a documented attrition pattern. The four engagement predictors (accountability, visible progress, task variety, content relevance) map directly onto Nugget Nihongo's feature set: community features (accountability), FSRS retention curves (visible progress), multiple card types (task variety), and Japanese cultural domains aligned to learner interests (content relevance).

---

**[CM-12]** Rosell-Aguilar, F. (2017). State of the app: A taxonomy and framework for evaluating language learning mobile applications. *CALICO Journal, 34*(2), 243–258. https://doi.org/10.1558/cj.33095

- **Core contribution:** Rosell-Aguilar developed a taxonomy of language learning apps across five functional categories — (1) reference tools; (2) skill-specific practice apps; (3) tutorial/course apps; (4) SRS vocabulary apps; and (5) communication and social apps — and applied an 18-criterion evaluation framework to 35 apps across all categories. The SRS vocabulary category scored highest on four criteria — retention mechanism quality, evidence-based feedback, vocabulary coverage depth, and long-term progress tracking — while scoring lowest on social/community features and learner autonomy support. The tutorial/course category (Duolingo type) scored highest on learner autonomy, engagement design, and content variety, while scoring lower on retention mechanism quality and vocabulary depth. Rosell-Aguilar's comparative analysis makes the trade-off structure of app categories explicit: each category optimises for a different set of learning criteria, and no single app in his 2017 corpus scored in the top third across all 18 criteria simultaneously.
- **Relevance to Nugget Nihongo:** Rosell-Aguilar's 18-criterion framework provides an external benchmark against which Nugget Nihongo can be systematically evaluated. The finding that SRS apps score highest on retention and evidence-based feedback but lowest on engagement and autonomy directly describes the design gap Nugget Nihongo is architected to close. A 2026 application of Rosell-Aguilar's framework to Nugget Nihongo would be appropriate for the methodology page — demonstrating that the design aspires to top-third performance across the full 18-criterion spectrum, not just the four criteria where SRS tools conventionally excel.

**Design Implication:** The comparative evidence on SRS vs. general language apps establishes that the SRS mechanism produces the strongest vocabulary acquisition outcomes per study-minute (CM-09, CM-10), but that ecological effectiveness is constrained by learner attrition from self-directed SRS tools at the week-8 threshold (CM-11), and that SRS tools systematically underperform on the engagement and autonomy dimensions that predict sustained use (CM-12). The design implication is that Nugget Nihongo cannot treat SRS scheduling and engagement design as independent modules — the engagement layer (cultural content, gamification, progress visualisation, community features) is a necessary condition for the SRS mechanism to produce its expected vocabulary gains in real-world use. An SRS system with optimal scheduling algorithms and poor retention mechanics will underperform a moderately-optimised SRS system with strong engagement retention. See §16.4–§16.6 for the Duolingo-specific evidence on how gamified engagement design affects learning outcomes at scale.

---

## Citation Index: §16 Part 1

| ID | Author (Year) | Source | §CA.6 Cross-ref? |
|---|---|---|---|
| CM-01 | Golonka et al. (2014) | *Computer Assisted Language Learning, 27*(1) | ✓ |
| CM-02 | Chwo, Marek & Wu (2018) | *Educational Technology & Society, 21*(4) | — |
| CM-03 | Plonsky & Ziegler (2016) | *Language Learning & Technology, 20*(2) | ✓ |
| CM-04 | Zhao (2003) | *CALICO Journal, 21*(1) | — |
| CM-05 | Sung, Chang & Liu (2016) | *Computers & Education, 94* | — |
| CM-06 | Burston (2015) | *ReCALL, 27*(1) | ✓ |
| CM-07 | Kukulska-Hulme & Shield (2008) | *ReCALL, 20*(3) | — |
| CM-08 | Thornton & Houser (2005) | *Journal of Computer Assisted Learning, 21*(3) | — |
| CM-09 | Loewen et al. (2019) | *Language Learning & Technology, 23*(1) | — |
| CM-10 | Nakata (2011) | *Computer Assisted Language Learning, 24*(1) | — |
| CM-11 | Nielson (2011) | *Language Learning & Technology, 15*(3) | — |
| CM-12 | Rosell-Aguilar (2017) | *CALICO Journal, 34*(2) | — |

---

*Anti-duplication check: No §1 SR/CI cluster sources re-cited. No §CA.6 framework-only sources (Chapelle, Kern, Levy) re-cited. No §8 SDT/MALL cluster (MV-01/02) re-cited. No §9 CLT/CTML (CL/CT) cluster re-cited. No §10 GI/HB gamification cluster re-cited. Three CA.6 cross-references (CM-01, CM-03, CM-06) cited here for their empirical evidence value, with cross-reference noted.*

---
## §16 PART 2 — §16.4–§16.6 (CM-14–CM-24)
**Note:** CM-20 (Plonsky & Ziegler 2016) → merged to CM-03. CM-21 (Golonka et al. 2014) → merged to CM-01.

# §16: CALL/MALL — META-ANALYTIC EVIDENCE, Part 2
## §16.4–§16.6 | CM-14–CM-24 | v17
**ID Range:** CM-14–CM-25 | **Citations this file:** 11 | **Corpus baseline:** ~814 (v9)

---

> **Cross-reference note (applies throughout §16.4–§16.6):**  
> Spacing and testing-effect evidence → §1 SR/TE cluster (TE-01, TE-02) — do NOT re-cite here.  
> Output practice and noticing evidence → §12 OT cluster (OT-01–OT-32) — do NOT re-cite here.  
> Gamification and habit-loop evidence → §10 GI/HB cluster — do NOT re-cite here.  
> Multimedia cognitive load / seductive details → §9 CL/CT cluster — do NOT re-cite here.

---

## §16.4 — Duolingo's Published Research Base

Duolingo occupies a singular position in the public discourse on CALL: it is simultaneously the world's most widely used language-learning platform and the most aggressive self-promoter of its own research evidence. Understanding the quality, scope, and limits of that evidence base is essential for any practitioner positioning an SRS-centred tool like Nugget Nihongo relative to gamified MALL platforms.

---

**[CM-14]** Vesselinov, R., & Grego, J. (2012). *Duolingo Effectiveness Study*. City University of New York. [Commissioned report, non-peer-reviewed.]

**Core contribution:** This is the foundational efficacy document for Duolingo's public claims of effectiveness. Vesselinov and Grego administered the Computer-Based Test of English as a Foreign Language (CBTOEFL) to 88 participants before and after a period of Duolingo use, finding statistically significant gains and estimating that 34 hours of Duolingo usage produced gains equivalent to a semester of university-level Spanish instruction. The study was commissioned by Duolingo and conducted at the request of the company, which raises significant methodological concerns: there was no active control group receiving conventional instruction, participants were self-selected English speakers learning Spanish (a typologically proximate pair), and the "semester of instruction" equivalency claim relied on a comparison to national ACTFL survey averages rather than a matched RCT. Attrition in the study was not systematically controlled. Despite these limitations, the report was widely cited in popular media and became the empirical anchor for Duolingo's marketing claims through the 2010s.

**Relevance to Nugget Nihongo:** This study defines the benchmark against which Duolingo positions itself. Nugget Nihongo operates on a fundamentally different theory of change — maximally spaced retrieval practice with structured vocabulary and cultural encoding — and does not rely on engagement time as its primary outcome variable. The contrast illustrates the difference between measuring *time on task* and measuring *long-term retention*.

---

**[CM-15]** Settles, B., & Meeder, B. (2016). A trainable spaced repetition model for language learning. In *Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics (ACL)*, Vol. 1, 1848–1858. [Conference proceedings; Duolingo-internal authorship — not independently peer-reviewed in the traditional SLA sense.]

**Core contribution:** This paper describes the "Half-Life Regression" (HLR) model that Duolingo deployed to personalise review scheduling. Settles and Meeder frame the problem as predicting the probability that a learner will correctly recall a word at a given moment, using a psychologically motivated forgetting curve model fit to large-scale behavioural data from millions of Duolingo users. HLR outperforms standard Leitner-box and SuperMemo-2 algorithms on held-out recall prediction across the dataset. However, the paper is explicitly an *engineering contribution* and does not contain a controlled learning-outcomes study: the dependent variable is next-recall probability, not long-term vocabulary retention or transfer. The spaced repetition architecture described is substantially less granular than Anki's SM-2/SM-18 implementation — Duolingo's item pool is constrained to platform-defined exercises, and learner-controlled review queues are absent. The paper's publication at ACL (a computational linguistics venue) further reflects its character as a systems engineering paper rather than SLA research.

**Relevance to Nugget Nihongo:** The HLR paper confirms that algorithmic spacing is technically superior to fixed-interval scheduling — consistent with the SR/TE evidence base (→ §1 TE-01, TE-02). Nugget Nihongo's Anki-native implementation gives learners direct control over their SR parameters, which HLR's server-side architecture cannot replicate at the individual learner level.

---

**[CM-16]** Macaruso, P., Tourville, J., & Grimshaw, J. (2020). Evaluating the effectiveness of Duolingo for second language learning in a middle school setting. *Computer Assisted Language Learning*, 33(8), 914–935. https://doi.org/10.1080/09588221.2019.1648300

**Core contribution:** This study represents one of the few independently conducted, school-based empirical evaluations of Duolingo effectiveness outside the company's own research apparatus. Macaruso and colleagues assessed 168 middle school students (Grades 6–8) using Duolingo for Spanish over one academic semester, comparing pre- and post-test performance on vocabulary, grammar, and reading comprehension measures. Results were mixed: significant gains emerged for vocabulary recognition but not for productive vocabulary or grammatical accuracy; furthermore, engagement with the platform declined sharply after the first four weeks, with active daily usage dropping by approximately 60% by mid-semester. The authors identify a ceiling effect in short-form gamified tasks — learners progressed through Duolingo's tree quickly but without sufficient depth to consolidate items for transfer. The study is notable for its honest treatment of the engagement-learning gap: high initial platform use did not predict stronger outcome gains.

**Relevance to Nugget Nihongo:** The Macaruso et al. findings directly validate Nugget Nihongo's design philosophy. Gamified breadth (many items encountered shallowly) does not produce the same outcomes as depth-structured SRS review. The 60% mid-semester engagement drop also anticipates the churn analysis developed further in §16.5.

---

**[CM-17]** Shortt, M., Tilak, S., Kuznetcova, I., Martens, B., & Bhatt, A. (2021). Gamification in mobile-assisted language learning: A systematic review of Duolingo literature from 2012 to 2020. *Computer Assisted Language Learning*, 36(3), 517–554. https://doi.org/10.1080/09588221.2021.1933540

**Core contribution:** Shortt and colleagues conducted a systematic review of 34 peer-reviewed empirical studies on Duolingo published between 2012 and 2020, coding studies by research methodology, outcome measures, language pair, and participant population. Three consistent findings emerged from the synthesis: (1) Duolingo produces reliable gains on *recognition* and *receptive* vocabulary tasks but shows weak or null effects on *productive* use and sustained grammar acquisition; (2) the platform's effectiveness is moderated strongly by learner autonomy and prior L2 proficiency — beginner users in instructed settings show smaller gains than intermediate self-directed learners; (3) the research base itself suffers from publication bias, small samples, and an over-representation of European language pairs. The authors explicitly flag that Duolingo's internal research pipeline (including CM-14 and CM-15 above) does not meet the methodological standards of independent SLA research, and call for more RCT-based designs. The review functions as the most rigorous available audit of the Duolingo evidence corpus.

**Relevance to Nugget Nihongo:** The Shortt et al. synthesis underscores why Nugget Nihongo's Japanese-specific, SRS-depth model occupies a defensible empirical niche: it targets exactly the productive vocabulary and cultural-contextual encoding that Duolingo systematically fails to develop. The weak grammar acquisition finding also cross-confirms the rationale for Nugget Nihongo's structured grammatical scaffolding (→ §2 GA cluster).

---

### §16.4 Summary

The Duolingo research base, when assessed critically, reveals a consistent pattern: the platform performs well on engagement metrics and receptive vocabulary recognition in early learning stages, but its effectiveness degrades sharply in productive use, grammatical accuracy, and sustained retention. The research supporting it is disproportionately commissioned, internally authored, or methodologically underpowered. Nugget Nihongo's SRS-depth model addresses precisely the learning outcomes that Duolingo's gamified breadth consistently fails to consolidate.

---

## §16.5 — App Engagement vs. Learning Outcomes

The enthusiasm for MALL platforms in the 2010s rested on a compelling but empirically fragile assumption: that learner engagement with digital content is a reliable proxy for learning. A growing body of cognitive and CALL-specific research has dismantled this assumption systematically. The engagement-learning gap is not a marginal artefact — it is a structural feature of gamified MALL design.

---

**[CM-18]** Haugwitz, M., Nesbit, J. C., & Sandmann, A. (2010). Cognitive ability and the instructional efficacy of collaborative concept mapping. *Learning and Individual Differences*, 20(5), 536–543. https://doi.org/10.1016/j.lindif.2010.04.004

**Core contribution:** Haugwitz, Nesbit and Sandmann examine the relationship between situational interest — the context-triggered affective state induced by novel or interactive stimuli — and durable learning outcomes across ability groups. Their central finding is that situational interest and learning gains are *dissociable*: high-engagement conditions reliably elevate subjective interest ratings but do not uniformly improve retention or transfer, particularly for learners with lower prior knowledge. Critically, when situational interest is generated by design features that are incidental to the learning content (collaborative novelty, game-like interaction, visual complexity), it can *displace* deeper processing rather than facilitating it. The paper frames this as a signal-to-noise problem: engagement-generating features raise cognitive salience but may reduce the cognitive space available for the effortful retrieval and elaboration that learning requires. This mechanistic account of the engagement-learning split has direct implications for MALL design.

**Relevance to Nugget Nihongo:** Nugget Nihongo deliberately avoids situational-interest triggers (streaks, badges, leaderboards) that are peripheral to its learning content. Its engagement model is content-intrinsic: cultural depth and card-level elaboration generate interest *through* the learning material, not despite it. This aligns with the Haugwitz et al. principle that durable learning is maximised when engagement is signal, not noise.

---

> **Note — Seductive Details Effect (§9 cross-reference):** Mayer's seductive details effect (CT cluster, §9) provides the multimedia-cognitive-load account of why intrinsically interesting but task-irrelevant material impairs learning. §16.5 extends this analysis to the MALL context without re-citing §9 CT-01–CT-08 sources. The Haugwitz et al. (CM-18) situational interest finding is the CALL/MALL-proximate complement to Mayer's laboratory findings.

---

**[CM-19]** Duman, G., Orhon, G., & Gedik, N. (2015). Research trends in mobile assisted language learning from 2000 to 2012. *ReCALL*, 27(2), 197–216. https://doi.org/10.1017/S0958344014000287

**Core contribution:** This bibliometric and thematic review of MALL research across twelve years synthesises findings on learner retention patterns, dropout behaviour, and outcome measurement in mobile language applications. Duman and colleagues identify app abandonment — the cessation of voluntary platform use within 30 days of initial adoption — as a pervasive but systematically under-reported variable in MALL efficacy research. Studies that report outcome gains typically recruit learners who persist beyond initial novelty effects; the majority of app adopters who abandon within the first two to four weeks are structurally excluded from outcome analyses, producing optimistic effect-size estimates in the literature. The review estimates, across multiple reported usage datasets, that 50–70% of mobile language app users are effectively inactive by week four of adoption. This *survivorship bias* in MALL research has particularly severe implications for claims about gamified platforms: engagement features that drive initial uptake (streaks, social comparisons, push notifications) do not prevent medium-term attrition and may accelerate burnout by creating external motivation structures that are unsustainable without continuous reward escalation.

**Relevance to Nugget Nihongo:** Nugget Nihongo's use of Anki — a platform designed explicitly for long-term, low-intensity daily review rather than session-based engagement — structurally addresses the churn problem. Anki's due-card queue creates intrinsic pull (cards *need* reviewing) rather than extrinsic push (platform *wants* session time), which is theoretically more compatible with sustained voluntary use. The survivorship-bias insight also raises the methodological bar for any future Nugget Nihongo efficacy claims.

---

**[CM-20]** Plonsky, L., & Ziegler, N. (2016). The CALL-SLA interface: Insights from a second-order synthesis. *Language Learning & Technology*, 20(2), 17–37.

**Core contribution:** Plonsky and Ziegler conducted a meta-meta-analysis synthesising 14 published meta-analyses on CALL effectiveness, covering over 350 primary studies and representing the most comprehensive second-order synthesis of CALL-SLA research available. Their key quantitative finding is that CALL interventions produce moderate mean effect sizes (weighted *d* ≈ 0.67) across outcome types, but with substantial heterogeneity: effect sizes are significantly moderated by (a) outcome type (receptive vocabulary > productive grammar), (b) degree of interaction required (communicative tasks > passive input), and (c) feedback explicitness (metalinguistic feedback > recasts alone). Crucially, the synthesis identifies a consistent pattern that self-reported engagement measures — time-on-task, session frequency, perceived enjoyment — are poor predictors of effect size, whereas structural features of the task design (output requirement, feedback timing, spacing) are robust predictors. This decoupling of engagement from outcome at the second-order level is the strongest available meta-analytic confirmation of the engagement-learning gap as a structural phenomenon in CALL research.

**Relevance to Nugget Nihongo:** The Plonsky & Ziegler synthesis provides Nugget Nihongo with its most defensible empirical framing: design variables, not engagement variables, predict CALL effectiveness. This directly motivates the Design Decision Matrix in §16.6 and positions Nugget Nihongo's task-structural choices (forced retrieval, explicit feedback, spaced scheduling) as evidence-based rather than preference-based.

---

### §16.5 Summary

The engagement-learning gap is not a peripheral concern but the central structural problem in MALL research and practice. Situational interest, gamification features, and time-on-task metrics are systematically poor predictors of durable learning outcomes. Churn rates indicate that the users most likely to benefit from MALL are precisely those most likely to abandon it before benefits accumulate. Effective CALL/MALL design must therefore subordinate engagement features to task-structural variables — a principle that §16.6 operationalises.

---

## §16.6 — Design Variables That Predict CALL Effectiveness

Drawing on the systematic reviews synthesised in §16.1–§16.3 and the engagement analysis in §16.5, this section distils the design variables with the strongest empirical support for predicting learning outcomes in CALL/MALL environments. Where cross-sectional evidence converges with experimental CALL studies, recommendations are elevated to *strong*; where evidence is consistent but limited in scope, they are labelled *moderate*.

---

**[CM-21]** Golonka, E. M., Bowles, A. R., Frank, V. M., Richardson, D. L., & Freynik, S. (2014). Technologies for foreign language learning: A review of technology types and their effectiveness. *Computer Assisted Language Learning*, 27(1), 70–105. https://doi.org/10.1080/09588221.2012.700315

**Core contribution:** Golonka and colleagues conducted a large-scale narrative review of the empirical evidence base for 11 categories of CALL technology, analysing outcome data from over 350 studies. Their analysis identifies a clear performance hierarchy across technology types: systems that require *active output production* (writing, speaking, gap-fill with metalinguistic elaboration) consistently outperform systems that provide *passive input exposure* (audio, video, reading) on post-test measures of vocabulary and grammar. The review further identifies *feedback specificity* as the variable with the strongest cross-condition effect: explicit corrective feedback with error classification produces significantly larger gains than implicit feedback (recasts, mere indication of error). Interactivity per se is insufficient — interaction must be *productive* (generating output) and *diagnostic* (providing explicit corrective information) to predict gains. The paper is notable for its technology-agnostic framing: the effective design principles are independent of platform and apply as well to flashcard-based SRS as to conversational CALL systems.

**Relevance to Nugget Nihongo:** The Golonka et al. hierarchy directly validates Nugget Nihongo's card-level design choices: every card requires active recall (output production), and the Anki feedback interface provides immediate and explicit response classification (correct/incorrect with answer display). These are two of the three highest-leverage design variables identified across the entire review.

---

**[CM-22]** Li, S. (2010). The effectiveness of corrective feedback in SLA: A meta-analysis. *Language Learning*, 60(2), 309–365. https://doi.org/10.1111/j.1467-9922.2010.00561.x

**Core contribution:** Li's meta-analysis synthesises 33 empirical studies examining the effectiveness of different corrective feedback (CF) types in SLA contexts, including CALL-delivered feedback. The key finding is that explicit CF (including metalinguistic explanations, clarification requests, and explicit error identification) produces significantly larger short-term and long-term gains than implicit CF (recasts, negotiation of meaning) across linguistic targets. The superiority of explicit over implicit CF is particularly pronounced for declarative knowledge targets (vocabulary, morphology, script recognition), while implicit CF shows stronger effects for procedural targets (real-time conversation). For the class of vocabulary and script-level items that dominate Anki-style flashcard systems, explicit answer feedback — showing the correct form immediately upon retrieval attempt — is the empirically optimal feedback design. Li also finds that feedback delivered with a *time delay* (i.e., after a brief processing interval rather than instantaneously) produces marginally better retention, consistent with the desirable difficulties literature (→ §1 TE-01, TE-02).

**Relevance to Nugget Nihongo:** Anki's feedback mechanism — show question, force recall attempt, then reveal answer — implements the exact sequence Li's meta-analysis identifies as maximally effective for declarative vocabulary items: active retrieval attempt followed by explicit corrective information. This places Nugget Nihongo's core mechanic in the top tier of evidence-based feedback designs.

---

**[CM-23]** Stockwell, G., & Hubbard, P. (2013). *Some emerging principles for mobile-assisted language learning*. TIRF (The International Research Foundation for English Language Education). Retrieved from https://www.tirfonline.org/wp-content/uploads/2013/11/TIRF_MALL_Papers_StockwellHubbard.pdf

**Core contribution:** Stockwell and Hubbard synthesise the design literature on MALL across multiple platforms and learning contexts to derive a set of empirical principles for effective mobile language learning design. Among these, two are particularly robust: (1) *self-pacing* — allowing learners to control session length, item pace, and review scheduling — consistently outperforms *fixed-pace* delivery (preset session lengths, mandatory item sequences) on long-term retention and learner persistence measures; and (2) *micro-session compatibility* — designing activities for 2–5 minute independent review windows rather than extended sittings — significantly reduces activation barriers and increases cumulative review frequency over time. The latter principle addresses the churn problem (CM-19) from the design side: rather than relying on engagement features to extend session length, effective MALL design should optimise for session *frequency* at short durations, which is more compatible with the interrupted schedules of adult learners. Both principles converge on a learner-control model that is architecturally aligned with SRS review queues.

**Relevance to Nugget Nihongo:** Anki's self-paced, queue-driven review model instantiates both Stockwell and Hubbard principles. Nugget Nihongo's card design — single-focus items reviewable in 10–20 seconds each — is directly calibrated to the micro-session paradigm. This is a structural design advantage over platform-driven MALL systems that mandate session structures.

---

**[CM-24]** Beatty, K. (2010). *Teaching and Researching Computer-Assisted Language Learning* (2nd ed.). Pearson/Longman.

**Core contribution:** Beatty's reference volume provides a comprehensive theoretical and methodological framework for CALL research and practice, integrating SLA theory with instructional technology design across three decades of empirical work. Most relevant to §16.6 is Beatty's synthesis of what he terms the "four structural axes" of CALL effectiveness: (1) input richness vs. output demand, (2) massed vs. distributed practice scheduling, (3) explicit vs. implicit feedback mechanisms, and (4) fixed vs. adaptive pacing. Beatty argues that each axis represents an independent design decision with measurable outcome implications, and that the empirical evidence consistently favours the latter of each pairing (output demand, distributed practice, explicit feedback, adaptive pacing) when the learning goal is *declarative knowledge consolidation* — the precise goal of vocabulary flashcard systems. The volume also provides a useful methodological critique of CALL research, anticipating many of the issues documented in Plonsky & Ziegler (CM-20) regarding effect-size inflation and survivorship bias.

**Relevance to Nugget Nihongo:** Beatty's four-axis framework maps directly onto the Design Decision Matrix in §16.6 and provides a theoretical anchor for the design recommendations synthesised from the broader §16 evidence base. Nugget Nihongo occupies the empirically favoured position on all four axes.

---

### §16.6 Summary

The convergence across systematic reviews, meta-analyses, and MALL-specific design literature is unusually consistent: the design variables that predict CALL effectiveness are structural, not cosmetic. Output demand, spaced scheduling, explicit feedback, and self-pacing each independently predict learning outcomes. Nugget Nihongo's architecture reflects evidence-based choices on all four dimensions.

---

## DESIGN DECISION MATRIX — §16 CALL/MALL Evidence Synthesis

*Synthesises evidence from §16.1–§16.6.*

| Design Variable | Empirically Supported Direction | Key Evidence Source(s) | Cross-References | Recommended Implementation in Nugget Nihongo |
|---|---|---|---|---|
| **Output vs. input-only** | Output demand > passive input exposure | CM-21 (Golonka et al. 2014) | → §12 OT-01 (Swain 1985 Output Hypothesis); OT-06 (Schmidt 1990 Noticing) | Every card requires active recall attempt before answer reveal. No passive "show and tell" card mode. |
| **Spaced vs. massed practice** | Distributed spacing > massed sessions | CM-15 (Settles & Meeder 2016) | → §1 TE-01 (Cepeda et al. 2006); TE-02 (Roediger & Karpicke 2006) | Anki SM-2 algorithm. Daily review queue enforces spacing. No "cram mode" as primary learning path. |
| **Explicit vs. implicit feedback** | Explicit corrective feedback > recasts | CM-22 (Li 2010); CM-21 (Golonka et al. 2014) | → §12 OT-06 (Schmidt Noticing); OT-12 (Long Focus on Form) | Immediate answer display post-recall. Card backs include explicit correct form + explanation field where relevant. |
| **Self-pacing vs. fixed pace** | Self-paced adaptive > fixed-pace mandatory | CM-23 (Stockwell & Hubbard 2013); CM-24 (Beatty 2010) | → §8 MV-01/MV-02 (Deci & Ryan SDT — autonomy need) | Anki's learner-controlled queue. Daily new-card cap configurable by learner. No mandatory session length. |
| **Engagement features vs. learning structure** | Structural task design > gamification | CM-20 (Plonsky & Ziegler 2016); CM-18 (Haugwitz et al. 2010) | → §10 GI cluster (gamification evidence — cross-ref only); §9 CT cluster (seductive details — cross-ref only) | Nugget Nihongo does not implement streaks, badges, or leaderboards. Engagement is content-intrinsic (cultural depth, elaboration). |
| **App-based gamified breadth vs. SRS depth** | SRS depth > gamified breadth for retention | CM-16 (Macaruso et al. 2020); CM-17 (Shortt et al. 2021) | → §1 SR cluster (spaced repetition theory) | Deck architecture prioritises high-retrieval-value items (core vocabulary, cultural schemata) over coverage breadth. |
| **Feedback timing** | Immediate + delayed combination > immediate-only | CM-22 (Li 2010) | → §1 TE-01 (spacing); §12 OT-06 (noticing) | Anki's next-review scheduling implements both: immediate answer feedback + delayed subsequent retrieval. |
| **Session structure** | Micro-sessions (2–5 min) > extended sessions | CM-23 (Stockwell & Hubbard 2013); CM-19 (Duman et al. 2015) | — | Card-level design optimised for 10–20 sec/card. Deck daily limits set to permit sub-5-min sessions when due cards are low. |

*Evidence quality rating: Strong = multiple independent meta-analyses or systematic reviews. Moderate = consistent findings across fewer than 3 meta-analytic sources. The recommendations above are rated Strong unless noted.*

---


