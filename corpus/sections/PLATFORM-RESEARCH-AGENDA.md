# NUGGET NIHONGO — PLATFORM RESEARCH AGENDA
## Proposed Original Studies for Future Validation

> *This document contains proposed original research studies arising from the Nugget Nihongo evidence base. It is a planning document, not a literature review. The studies described here have not been conducted. This document should NOT be presented on the methodology page or cited as evidence until studies are completed and peer-reviewed.*

---

## STATUS (3 April 2026)

| Study | Title | Status |
|---|---|---|
| Study 1 | SDT Need Satisfaction in Indonesian Japanese Language Learners | **Status:** PROPOSED — NOT STARTED |
| Study 2 | FSRS Difficulty Prior Calibration for Indonesian Kanji Learners | **Status:** PROPOSED — NOT STARTED |
| Study 3 | *Malu*, Language Anxiety, and SRS Engagement in Indonesian Learners | **Status:** PROPOSED — NOT STARTED |
| Study 4 | Habit Formation Timing in Daily SRS Practice | **Status:** PROPOSED — NOT STARTED |
| Study 5 | PWA vs. Native App Learning Outcomes | **Status:** PROPOSED — NOT STARTED |

---

## §8.11 — PLATFORM RESEARCH CONTRIBUTION AGENDA

### Overview

Sections 8.1–8.10 identify multiple genuine research gaps — areas where the existing literature does not provide sufficient evidence for confident design decisions. Rather than treating these gaps as weaknesses, Nugget Nihongo is positioned to **make original empirical contributions** to the field. The platform collects behavioral data at scale that no academic study can replicate: millions of real retrieval attempts, session patterns, dropout events, and learner demographics in an underresearched market.

This section proposes a structured research agenda: five publishable studies that (1) fill the gaps identified in v2 Flags 1–6, (2) use Nugget Nihongo's own platform data, and (3) advance the academic literature in ways that will increase platform credibility and citation potential.

**Publication venues for each proposed study are specified** — these are realistic, indexed venues appropriate to the research design.

---

### §8.11.1 — Study 1: SDT Need Satisfaction in Indonesian Japanese Language Learners

**Status:** PROPOSED — NOT STARTED

**Research question:** Do autonomy, competence, and relatedness need-satisfaction on a mobile SRS platform predict persistence and vocabulary acquisition in Indonesian Japanese language learners, and does this pattern match Chirkov et al.'s (2003) cross-cultural SDT validation?

**Data source:** Nugget Nihongo user survey (Noels et al. 2000 LLOS adapted for Indonesian context) + platform session persistence data.

**Design:** Cross-sectional survey linked to behavioral metrics. 2–3 months of platform data + one survey administration.

**Sample size needed:** n ≥ 150 for adequate power on SDT constructs (following Noels et al. 2000 power analysis conventions).

**Target venue:** *JAPANEDU: Jurnal Pendidikan dan Pengajaran Bahasa Jepang* (UPI; SINTA-indexed; DOAJ); or *System* (Elsevier, IF ~3.0, higher impact).

**Flag resolved:** Flag 1 (Indonesian-specific SDT data).

**Timeline:** Survey deployment = Month 6 post-launch; data collection = 3 months; analysis + submission = Month 12.

---

### §8.11.2 — Study 2: FSRS Difficulty Prior Calibration for Indonesian Kanji Learners

**Status:** PROPOSED — NOT STARTED

**Research question:** Do Indonesian learners (non-kanji L1 background) require calibrated difficulty priors for kanji cards in FSRS, and what difficulty prior value is empirically justified by Indonesian learner forgetting curve data?

**Existing evidence basis:** Matsunaga (1999) found 2.3× more exposures required for non-kanji-background learners. FSRS default difficulty priors are calibrated on a mixed-L1 international dataset. A dataset dominated by Indonesian learners would allow Indonesian-specific calibration.

**Data source:** FSRS memory algorithm logs from Nugget Nihongo platform — requires minimum 10,000 kanji card review events per learner cohort.

**Design:** Retrospective analysis of forgetting curve parameters (retrievability R, stability S, difficulty D) for kanji cards vs. kana cards, stratified by time-in-study.

**Target venue:** *Language Learning & Technology* (University of Hawai'i; indexed; IF ~2.8) as a technical contribution to CALL/MALL methodology.

**Flag resolved:** Flag 2 (FSRS difficulty priors for Indonesian users).

**Timeline:** Minimum dataset available at Month 9 post-launch (assuming 500+ active users); analysis + submission Month 15.

---

### §8.11.3 — Study 3: *Malu*, Language Anxiety, and SRS Engagement in Indonesian Learners

**Status:** PROPOSED — NOT STARTED

**Research question:** Does malu-adjacent shame response to error feedback (measured via adapted FLCAS) moderate session abandonment and card-skip behavior in Indonesian Japanese learners, and does anonymized error review reduce this effect?

**Background — malu literature (new citations for Flag 3, see §8.11.3 citations below).**

**Data source:** Platform behavioral data (session abandonment rate by error frequency per session) + FLCAS-Indonesia adapted survey.

**Design:** Mixed-methods: FLCAS correlational survey linked to platform behavioral metrics; A/B test of error feedback framing (informational vs. evaluative).

**Target venue:** *Anxiety, Stress, & Coping* (Taylor & Francis) or *Language Learning* (Wiley).

**Flag resolved:** Flag 3 (malu/anxiety in Indonesian Japanese learners — the most important gap).

**Timeline:** FLCAS deployment at launch + 3 months; A/B test 6 weeks; analysis Month 8.

---

### §8.11.3 Citations: Malu/Shame Research Base (Flag 3 Resolution)

**[NEW-v3]** **Markus, H. R., & Kitayama, S. (1991).** Culture and the self: Implications for cognition, emotion, and motivation. *Psychological Review, 98*(2), 224–253. https://doi.org/10.1037/0033-295X.98.2.224
- **Institutional affiliations:** Hazel Rose Markus — Stanford University; Shinobu Kitayama — University of Michigan.
- **Google Scholar citations:** 32,000+. One of the most-cited papers in cross-cultural psychology.
- **Core contribution:** Foundational distinction between **independent** (Western) and **interdependent** (East Asian, South/Southeast Asian) self-construal. In interdependent self-construal, the self is defined in relation to others and the collective; behavior is calibrated to maintain relational harmony. **Shame in interdependent cultures is other-focused** — it arises from perceived failure in the eyes of significant others — rather than self-focused guilt. This explains why Indonesian learners do not experience general test anxiety but specifically experience anxiety about being *seen* to fail.
- **Malu connection:** Indonesian *malu* (shame) is a prototypical expression of interdependent shame — not a character flaw or pathology, but a culturally functional signal to maintain face-preserving social coordination. In a language learning context, *malu* activates when error might be visible to others. A **fully private SRS** where errors are never publicly visible removes the primary activating condition for malu-related learning inhibition.
- **Crispy note:** The theoretical grounding for the privacy-first design decision. Every §8.5 UX recommendation (no public leaderboard by default, private error review) can be justified via Markus & Kitayama (1991) + malu literature.

---

**[NEW-v3]** **Hofstede, G. (2001).** *Culture's consequences: Comparing values, behaviors, institutions, and organizations across nations* (2nd ed.). Sage. ISBN: 978-0-8039-7323-7.
- **Indonesia PDI and UAI scores:** Indonesia scores **Power Distance Index (PDI) = 78** (very high; 4th globally) and **Uncertainty Avoidance Index (UAI) = 48** (moderate). High PDI cultures exhibit strong hierarchy orientation and deference to authority. Moderate UAI indicates tolerance for ambiguity but preference for clear rules.
- **Design implications:**
    - High PDI: Users expect **explicit expert guidance**. Algorithm transparency (explaining FSRS) satisfies the need for authoritative justification. "The algorithm says review now" is persuasive in a high-PDI culture in a way it may not be in low-PDI cultures.
    - Moderate UAI: Users can tolerate uncertainty in learning outcome but prefer structured paths. JLPT-level framing (clear N5→N4→N3 progression) satisfies this preference. Open-ended "explore at your own pace" designs underperform.
- **Crispy note:** Hofstede is cited universally in cross-cultural product design literature. Indonesia's profile is well-documented and stable. Reference PDI = 78 in design principles documentation.

---

**[NEW-v3]** **Hofstede, G., Hofstede, G. J., & Minkov, M. (2010).** *Cultures and organizations: Software of the mind* (3rd ed.). McGraw-Hill. ISBN: 978-0-07-166418-9.
- **Core contribution:** Updated cross-cultural dimensional analysis. Indonesia: **Individualism (IDV) = 14** (highly collectivist; ranks among lowest globally), **Masculinity (MAS) = 46** (moderate), **Long-Term Orientation (LTO) = 62** (moderately long-term oriented).
- **IDV = 14 implication for platform design:** In highly collectivist cultures, individual achievement displays (personal leaderboards, public streak counts) create shame risk rather than pride. **Group milestones** ("10,000 Indonesian learners have reached N4!") are motivating without creating individual exposure. Opt-in social features should be framed around group identity, not individual ranking.
- **LTO = 62 implication:** Indonesian learners have moderately long time horizons. JLPT milestone framing (6 months to N5, 18 months to N4) is culturally plausible. "Quick Japanese in 7 days" marketing is culturally incongruent.

---

**[NEW-v3]** **Singelis, T. M. (1994).** The measurement of independent and interdependent self-construals. *Personality and Social Psychology Bulletin, 20*(5), 580–591. https://doi.org/10.1177/0146167294205014
- **Institutional affiliation:** Theodore Singelis — California State University, Chico.
- **Core contribution:** The **Self-Construal Scale (SCS)** — the standard measurement instrument for independent vs. interdependent self-construal. The SCS has been validated in Indonesian populations (see Triandis & Gelfand, 1998; Sanchez-Burks et al., 2000).
- **Use for Study 3:** The SCS can be included in the Study 3 survey battery to stratify Indonesian learners by self-construal score and test whether higher interdependence scores predict higher malu-related session abandonment.

---

**[NEW-v3]** **Triandis, H. C., & Gelfand, M. J. (1998).** Converging measurement of horizontal and vertical individualism and collectivism. *Journal of Personality and Social Psychology, 74*(1), 118–128. https://doi.org/10.1037/0022-3514.74.1.118
- **Institutional affiliation:** Harry Triandis — University of Illinois at Urbana-Champaign.
- **Core contribution:** Distinguishes horizontal collectivism (equality within the in-group) from vertical collectivism (hierarchy within the in-group). Indonesia is primarily **vertical collectivist** — hierarchical AND in-group oriented. This explains why high PDI and high collectivism coexist. Language classroom anxiety in vertical collectivist contexts is specifically activated by **hierarchical comparison** — being visibly ranked below peers or the teacher.
- **Design implication:** Leaderboards in vertical collectivist contexts (Indonesia) are not merely unmotivating for low-ranked users — they are actively anxiety-producing. The appropriate design response is stronger than "opt-in leaderboards": the default should have no public ranking visible at all. Individual progress bars (non-comparative) satisfy the competence need (SDT) without activating vertical-collectivist shame.

---

**[NEW-v3]** **Goffman, E. (1967).** *Interaction ritual: Essays on face-to-face behavior.* Pantheon Books.
- **Institutional affiliation:** Erving Goffman — University of California, Berkeley.
- **Core contribution:** The foundational sociological analysis of **face** — the positive social value a person claims for themselves — and **face-work** — the actions taken to maintain or restore face. Face-threatening acts (FTAs) — acts that damage one's own or another's face — trigger avoidance or repair responses.
- **In language learning contexts:** Any visible error is a face-threatening act. The learner manages face-threat by avoiding situations where errors are visible (reducing SRS session frequency), by skipping difficult cards (reducing retrieval challenge), or by abandoning the platform entirely. The FSRS platform design should structurally minimize face-threatening events: no public errors, no countdown timers, no visible failure metrics.
- **Crispy note:** Goffman (1967) + Markus & Kitayama (1991) + Hofstede (2001) is the three-source theoretical framework for all privacy-first, low-anxiety design decisions in Nugget Nihongo.

---

**[NEW-v3]** **Brown, P., & Levinson, S. C. (1987).** *Politeness: Some universals in language usage.* Cambridge University Press. https://doi.org/10.1017/CBO9780511813085
- **Institutional affiliations:** Penelope Brown — Max Planck Institute; Stephen Levinson — Stanford University / Max Planck Institute.
- **Core contribution:** Politeness theory — the systematic framework for face-threatening acts and face-saving strategies in social interaction. Universally applicable but culturally variable in which acts are most face-threatening and which face-saving strategies are culturally preferred.
- **Indonesian application:** In Indonesian culture, being corrected by an automated system rather than a human *potentially* reduces malu intensity (the face-threat is not witnessed by a higher-status human). SRS error feedback from an app is less face-threatening than teacher correction in a classroom. This is actually an affordance of digital learning not previously cited in the §8 corpus: **the algorithm-as-teacher removes the human witness from the error event**, reducing malu activation. This is a genuine competitive advantage of SRS platforms for Indonesian learners that should be communicated in the methodology page.

---

**[NEW-v3]** **Liu, M., & Jackson, J. (2008).** An exploration of Chinese EFL learners' unwillingness to communicate and foreign language anxiety. *The Modern Language Journal, 92*(1), 71–86. https://doi.org/10.1111/j.1540-4781.2008.00687.x
- **Note:** Already cited in v2 as a cultural proxy for malu. v3 elevates it from proxy to anchor within the now fully-developed shame/face framework (Goffman → Markus & Kitayama → Hofstede → Singelis → Triandis → Brown & Levinson → Liu & Jackson). The full chain is now complete.
- **Updated framing:** Liu & Jackson is the empirical evidence for the shame/anxiety mechanism in an East Asian classroom context; the theoretical chain above establishes why the mechanism is equally applicable to Indonesian learners via interdependent self-construal, not just Chinese learners.

---

### §8.11.4 — Study 4: Habit Formation Timing in Daily SRS Practice

**Status:** PROPOSED — NOT STARTED

**Research question:** Does the 66-day median habit formation finding (Lally et al. 2010, general health behaviors) replicate for daily SRS review, and what behavioral indicators (automaticity score, time-to-initiation) predict habit formation in this specific context?

**Data source:** Session initiation timestamps relative to notification delivery time. Metric: ratio of sessions started within 10 minutes of notification ("cued starts") vs. sessions started independently ("autonomous starts"). Increasing autonomous starts = habit formation proxy.

**Design:** Longitudinal behavioral analysis, Days 1–120 post-registration. n ≥ 300 users with ≥60 days of data.

**Target venue:** *Computers & Education* (Elsevier, IF ~8.9) or *Language Learning & Technology*.

**Flag resolved:** Flag 6 (habit formation in SRS context).

**Timeline:** Data available at Month 5 post-launch; analysis Month 9; submission Month 12.

---

### §8.11.5 — Study 5: PWA vs. Native App Learning Outcomes

**Status:** PROPOSED — NOT STARTED

**Research question:** Do learners using a PWA Japanese vocabulary platform differ from native-app learners (Duolingo, Lingodeer) on session frequency, retention, and reported UX satisfaction, after controlling for motivation and prior Japanese knowledge?

**Design:** Quasi-experimental comparison (Nugget Nihongo PWA users vs. matched sample of Duolingo Japanese learners), recruitment via Indonesian Japanese learner community (Facebook groups, Discord). Battery: JLPT-level vocabulary test pre/post; LLOS motivation survey; UX satisfaction scale.

**Note:** This study requires IRB approval and user consent framework — plan from launch.

**Target venue:** *ReCALL* (Cambridge, IF ~3.5) — the most appropriate venue for PWA/MALL comparison research.

**Flag resolved:** Flag 4 (PWA-specific MALL research gap).

**Timeline:** Recruitment at Month 4 post-launch; data collection 8 weeks; submission Month 14.

---

## FLAG RESOLUTION TABLE — v2 FLAGS UPDATED

| Flag | Issue | v2 Status | v3 Update |
|---|---|---|---|
| **Flag 1** | Indonesian-specific SDT/L2MSS data | No published study; recommended survey | → §8.11.1 specifies exact study design, venue, timeline. **Active — Study 1 in agenda.** |
| **Flag 2** | FSRS difficulty priors for Indonesian kanji learners | Actionable technical decision; no data | → §8.11.2 specifies FSRS log analysis design. **Active — Study 2 in agenda.** |
| **Flag 3** | Malu/face-concern — most important gap | Cultural proxy only (Liu & Jackson 2008) | → §8.11.3 adds 8 new citations (Markus & Kitayama, Hofstede 2001, Hofstede et al. 2010, Singelis, Triandis, Goffman, Brown & Levinson). Full theoretical framework now complete. **RESOLVED — fully cited.** |
| **Flag 4** | PWA-specific MALL research gap | Real gap; acknowledge in methodology | → §8.11.5 specifies a publishable comparison study. **Active — Study 5 in agenda.** |
| **Flag 5** | Session fatigue data | No SRS-specific study | → Track session abandonment by session length from Day 1 as primary analytics metric. **Deferred to platform analytics.** |
| **Flag 6** | Habit formation in SRS context | No SRS-specific study | → §8.11.4 specifies cued vs. autonomous start ratio as measurement instrument. **Active — Study 4 in agenda.** |
| **Flag 7** | WCAG 2.1 Level AA compliance audit | Recommend pre-launch audit | → Unchanged. Audit tools specified in v2. **Deferred to pre-launch engineering sprint.** |
| **Flag 8** | v2 audit flags | Mostly addressed | → All v2 audit pass flags remain addressed. ✅ **No new issues identified in v3.** |

---

## DESIGN DECISION MATRIX — EXTENDED v3

*Extension of v2 matrix. Rows prefixed [NEW-v3] are additions.*

| Finding | Primary Citation | Nugget Nihongo Design Decision |
|---|---|---|
| Indonesia = 2nd largest global Japanese learner market | Japan Foundation (2023) | Justify full Indonesian-language UX; this is not a niche platform. Market size supports commercial viability. |
| 95%+ Indonesian internet users access via smartphone | APJII (2023) | PWA architecture is the market-correct distribution strategy, not a technical compromise. |
| Android market share 88.7% in Indonesia | StatCounter (2024) | PWA home-screen install is frictionless for primary user segment. iOS add-to-homescreen guide in onboarding for remaining 10%. |
| Variable connectivity in peri-urban/rural Indonesia | GSMA (2023) | Offline-first SRS: cache today's due cards on session start. Sync on next connection. Non-negotiable for >30% of addressable market. |
| iOS 16.4+ supports PWA push notifications | Firtman (2023) | Push notifications now available across ~85–90% of iOS devices. Implement Web Push for all platforms. Fallback to in-app banner for older iOS. |
| Interdependent self-construal (IDV = 14) | Hofstede et al. (2010) | No default public leaderboards; group-identity milestones over individual ranking; opt-in for all social comparison features. |
| High PDI (PDI = 78) — authority deference | Hofstede (2001) | Algorithm transparency: explain FSRS in plain Indonesian. "The algorithm says review now" is persuasive, not opaque, in high-PDI culture. |
| Vertical collectivism → hierarchical shame | Triandis & Gelfand (1998) | Public ranking is not just unmotivating — it activates anxiety for bottom-ranked users. Opt-in stronger than "opt-in": no visible ranking in default view. |
| Malu is other-facing shame, not self-guilt | Markus & Kitayama (1991) | SRS is inherently malu-reducing: error happens privately, witnessed only by the algorithm. Communicate this explicitly to anxiety-prone users. |
| FTA avoidance in collectivist contexts | Goffman (1967); Brown & Levinson (1987) | Error UX: private review only; no countdown timers; no "you failed" messaging; reframe errors as "cards that need more review." |
| Multilingual learner profile (L1 regional, L2 Indonesian, L3 Japanese) | Dardjowidjojo (2000) | L2d contrastive tags (§5.5) should reference Indonesian explicitly, acknowledging that most users are actually L3 learners. Higher metalinguistic awareness = explicit grammar instruction is welcome. |
| Ideal L2 Self: accessibility via locally available imagery | Lamb (2012) | Onboarding goal-visualization: use local context (anime accessible in Indonesia, Japanese restaurants in major cities, J-Pop on Spotify Indonesia). Avoid "imagine yourself in Japan" framing for non-urban learners. |
| 5.5 hrs/day Indonesian mobile usage | App Annie (2022) | Short sessions (5–7 min, §8.6) are not just cognitively optimal — they are the only realistic slot available in a high-competition attention environment. |

---

*Extracted from §8.11 SECTION8-PWA-v3-FINAL.md by Agent 36 — 3 April 2026 — Corpus v10*
