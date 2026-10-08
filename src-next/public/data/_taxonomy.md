# NUGGET NIHONGO — TAXONOMY MASTER DOCUMENT
**Version:** v1.0  
**Date:** 23 Maret 2026  
**Author:** Agent 8 — Fluffy (Curriculum Authority)  
**Status:** PROPOSAL — awaiting Nugget-san approval before dispatch to Crispy  
**Classification:** Curriculum Foundation Document

---

## HOW TO READ THIS DOCUMENT

This document defines three taxonomy layers for all content in the Nugget Nihongo project.

- `[L1]` = **Layer 1 — Operational.** These are the only valid values for agent assignment in schema fields. Stable. Changes require formal GOV update.
- `[L2]` = **Layer 2 — Stub.** Structurally defined but not yet active. Reserved for beyond-JLPT content when that phase begins.
- `[L3]` = **Layer 3 — Exhaustive Reference.** Academic completeness for curriculum design. NOT enforced in schema. Fluffy and Savory reference this for content planning.

**For agents:** Only `[L1]` values are valid in `pos`, `cat`, and `domain` fields.  
**For scripts:** Validators must reject any `[L2]` or `[L3]` value as invalid.  
**For curriculum design:** All three layers are relevant.

---

## ID FORMAT SPECIFICATION

Effective immediately. All new entries use 5-digit zero-padded IDs.

```
VOCAB GLOBAL:   vg-{level}-{5digit}    Example: vg-n5-00001
GRAMMAR GLOBAL: gn{level}-{5digit}     Example: gn5-00001
BANK SOAL:      bs-{level}-{type}-{5digit}  Example: bs-n3-fi-00001
```

**Reason for 5-digit:** Per-level vocab caps at 9,999 for N5-N1 with 4-digit. Beyond-JLPT layer may exceed this. 5-digit future-proofs all levels uniformly. All new entries from this point forward use 5-digit. Existing entries retain their 4-digit IDs until a formal migration task is dispatched.

---

# PART A — PART OF SPEECH (POS) TAXONOMY

---

## A.1 — LAYER 1: OPERATIONAL POS VALUES

These are the only values valid for the `pos` field in `_schema-vocab.md`.

---

### VERBS

**`[L1] verb-u`**  
五段動詞 — Godan verbs. Consonant-stem verbs.  
Conjugation base ends in consonant before inflection.  
Key test: ない form uses consonant + ない (書かない, 読まない).  
Examples: 書く, 読む, 話す, 飲む, 買う, 泳ぐ, 待つ, 死ぬ, 遊ぶ  
Note: 作る, 知る, 帰る, 走る, 切る look like ichidan but are godan — flag in `notes` field.

**`[L1] verb-ru`**  
一段動詞 — Ichidan verbs. Vowel-stem verbs.  
Conjugation base ends in え or い sound before る.  
Key test: ない form uses stem + ない (食べない, 見ない).  
Examples: 食べる, 見る, 起きる, 教える, 着る, 出る, 寝る, 借りる

**`[L1] verb-suru`**  
する compound verbs. Noun + する pattern.  
The noun component is entered separately as `noun-suru`.  
Enter as verb-suru only if the する-compound form has an entry.  
Examples: 勉強する, 運動する, 説明する, 料理する, 散歩する

**`[L1] verb-kuru`**  
来る — unique irregular verb. Only one member of this class.  
Conjugation: 来る(くる) / 来ない(こない) / 来て(きて) / 来た(きた)

**`[L1] verb-aru`**  
ある — special irregular verb.  
Negative form is ない, not あらない. This suppletive negative is unique.  
Also covers: ございます (formal/keigo form of ある/います).

**`[L1] verb-irr`**  
Other irregular verbs not covered by above categories.  
In modern Japanese this is very small. Primarily: する, くる, ある (already covered).  
Use for archaic or marginal forms that do not fit standard paradigms.

**`[L1] verb-potential-lexical`**  
Potential verbs lexicalized as independent entries with meaning divergence.  
These are NOT merely mechanical potential forms of other verbs.  
Examples: できる (can do — not derivable from する + potential with same nuance), 見える (can be seen — different from 見られる), 聞こえる (can be heard — different from 聞かれる)

---

### ADJECTIVES

**`[L1] i-adj`**  
い形容詞 — I-adjectives. End in い in plain form.  
Conjugate: 大きくない (neg), 大きかった (past), 大きくて (te-form).  
Examples: 大きい, 小さい, 高い, 安い, 新しい, 古い, 難しい, 楽しい

**`[L1] na-adj`**  
な形容詞 — Na-adjectives. Take な before nouns, だ as predicate.  
Conjugate: 静かじゃない (neg), 静かだった (past), 静かで (te-form).  
Examples: 静か, 便利, 好き, 嫌い, 有名, 丁寧, 複雑, 必要

**`[L1] no-adj`**  
の形容詞 — No-adjectives. Take の before nouns.  
Do NOT take な before nouns.  
Examples: 本物の, プロの, 特別の (when used as modifier)  
Note: some words can function as both na-adj and no-adj. Flag in `notes` field.

**`[L1] pre-noun-adj`**  
連体詞 — Pre-noun adjectives. Cannot conjugate. Only modify nouns.  
Cannot be used as predicates (×これはこのだ is ungrammatical).  
Examples: この, その, あの, どの, ある (a certain), いわゆる (so-called), たいした (considerable), とんだ (unexpected)

---

### NOUNS

**`[L1] noun`**  
一般名詞 — Common nouns. General category.  
Does NOT include nouns with special grammatical behavior (see subcategories below).  
Examples: 本, 学校, 山, 気持ち, 考え, 問題, 結果

**`[L1] noun-suru`**  
サ変名詞 — Nouns that can directly take する to become verbs.  
Entry is the noun form. The verb form (verb-suru) may have a separate entry if frequency warrants.  
Examples: 勉強, 運動, 説明, 旅行, 結婚, 準備, 確認

**`[L1] noun-temporal`**  
時間名詞 — Time nouns with special grammatical behavior.  
Can function as adverbs without particles in many contexts.  
Key distinction from noun: 今日行く (no particle needed) vs 学校に行く (particle required).  
Examples: 今日, 明日, 昨日, 今, 来年, 去年, 毎日, 先週, 来月, 今朝

**`[L1] noun-formal`**  
形式名詞 — Formal/abstract nouns. Largely grammaticalized.  
Take の before them when used grammatically. Bridge between vocab and grammar systems.  
The plain noun meaning is the vocab entry. The grammaticalized usage is a grammar entry.  
Both must exist and cross-reference each other via `related_grammar` and `see_also_vocab` fields.  
Examples: こと (thing/fact), もの (thing), の (nominalizer), ところ (place/point), わけ (reason/meaning), はず (expectation), つもり (intention), ため (purpose/result)

**`[L1] pronoun`**  
代名詞 — Pronouns.  
Personal: 私, あなた, 彼, 彼女, 彼ら, 私たち, 君, 俺  
Demonstrative: これ, それ, あれ, どれ, ここ, そこ, あそこ, どこ  
Interrogative: 誰, 何, どこ, いつ, どれ, どちら, どんな  
Note: Japanese pronouns are much less obligatory than in English or Indonesian. This must be addressed in the `nuance` field of each personal pronoun entry.

**`[L1] counter`**  
助数詞 — Counter words. Used with numbers to count specific types of things.  
Examples: 〜枚 (flat thin things), 〜本 (long thin things), 〜冊 (bound volumes), 〜匹 (small animals), 〜台 (machines/vehicles), 〜個 (general objects), 〜杯 (cups/bowls), 〜回 (times/occurrences)  
Time counters are also counter pos: 〜時, 〜分, 〜秒, 〜日, 〜週間, 〜ヶ月, 〜年

**`[L1] numeral`**  
数詞 — Numbers themselves.  
Sino-Japanese: 一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 百, 千, 万  
Native Japanese: 一つ, 二つ, 三つ, 四つ, 五つ, 六つ, 七つ, 八つ, 九つ, 十

**`[L1] proper-noun`**  
固有名詞 — Proper nouns included for curriculum relevance.  
Only include proper nouns genuinely needed for JLPT or curriculum content.  
Examples: 東京, 日本, 富士山, 田中 (as example name pattern), 東京大学

---

### ADVERBS

**`[L1] adverb-degree`**  
程度副詞 — Degree adverbs. Modify adjectives and verbs for intensity.  
Examples: とても, 非常に, かなり, 少し, あまり, もっと, 最も, かなり, ずいぶん

**`[L1] adverb-frequency`**  
頻度副詞 — Frequency adverbs.  
Examples: いつも, よく, たまに, 時々, めったに, 決して, 絶対に, ほとんど

**`[L1] adverb-manner`**  
様態副詞 — Manner adverbs. Describe how something is done.  
Many are onomatopoeia-derived. Flag onomatopoeia type in `notes` field.  
Examples: ゆっくり, はっきり, しっかり, きちんと, 急に, 突然, ていねいに

**`[L1] adverb-conjunctive`**  
接続副詞 — Conjunctive adverbs. Connect sentences and can stand at sentence start.  
Distinction from conjunctions (conj-*): conjunctive adverbs are more flexible positionally.  
Examples: しかし, でも, だから, それで, そして, したがって, ところが, なお, また

**`[L1] adverb-sentence`**  
文副詞 — Sentence adverbs. Scope over the entire proposition. Express speaker attitude.  
Examples: たぶん, きっと, もちろん, 確かに, 実は, 正直, 一般的に, どうも

---

### PARTICLES

**`[L1] particle-case`**  
格助詞 — Case-marking particles. Mark grammatical role of nouns.  
Members: が (subject), を (object), に (direction/time/indirect object), で (location of action/means), から (from/because), まで (until/to), と (with/quotation), より (than/from), へ (direction), の (possessive/nominalizer)  
Note: の also functions as nominalizer — cross-reference with `noun-formal`.

**`[L1] particle-topic`**  
係助詞 — Binding/focus particles.  
Members: は (topic/contrast), も (also/even), こそ (emphasis), でも (even/any), しか (only + negative), さえ (even/if only), だって (even/but)  
Critical note: The は vs が distinction is one of the most fundamental and frequently misunderstood features of Japanese. The `nuance` field for は MUST explicitly address the topic vs. subject distinction.

**`[L1] particle-conj`**  
接続助詞 — Conjunctive particles. Connect clauses.  
Members: て/で (sequential/causal), ば (conditional), たら (conditional/temporal), ながら (simultaneous/contrast), のに (unexpected result/purpose), から (reason), ので (reason-polite), けど/が (contrast/softener), し (listing reasons), ても/でも (even if)  
Classification rule for けど/が: When けど or が functions WITHIN a sentence connecting two clauses (mid-sentence, clause-connecting role), assign to `particle-conj`. When けど or が appears at the START of a standalone sentence as a discourse connector (sentence-initial adversative), assign to `conj-adversative`. The syntactic position is the deciding criterion, not surface meaning.

**`[L1] particle-final`**  
終助詞 — Sentence-final particles. Express speaker attitude.  
Members: ね (seeking agreement/softening), よ (assertion/new information), な (emotional/prohibition), わ (feminine assertion), ぞ (masculine assertion), ぜ (masculine encouragement), か (question), かな (wondering), もの/もん (explanation/justification), のに (regret)

**`[L1] particle-compound`**  
複合助詞 — Compound particles. Multiple elements functioning as a single particle unit.  
Examples: について (about/regarding), にとって (for/to), によると (according to), によって (by/depending on), として (as/in capacity of), に対して (toward/against), に関して (regarding), をとおして (through), のために (for the sake of), のように (like/as)

---

### CONJUNCTIONS

**`[L1] conj-coord`**  
等位接続詞 — Coordinating conjunctions. Connect equal elements.  
Examples: そして (and then), また (also/and), あるいは (or), または (or), および (and — formal written)

**`[L1] conj-adversative`**  
逆接接続詞 — Adversative conjunctions. Express contrast or unexpected result.  
Examples: しかし (however — formal), でも (but — casual), けれど/けど (but), ところが (however — unexpected), それでも (even so)

**`[L1] conj-causal`**  
因果接続詞 — Causal conjunctions. Express result or consequence.  
Examples: だから (so/therefore), それで (so/and then), したがって (therefore — formal), そのため (for that reason), ゆえに (therefore — literary)

**`[L1] conj-temporal`**  
時間接続詞 — Temporal conjunctions. Express time relationships.  
Examples: それから (and then/after that), その後 (after that), すると (then/thereupon)

---

### EXPRESSIONS

**`[L1] expr-greeting`**  
挨拶表現 — Fixed greeting expressions. Meaning is not compositionally analyzable.  
Examples: おはようございます, こんにちは, さようなら, ありがとう, すみません, おやすみなさい

**`[L1] expr-set`**  
慣用的表現 — Set/idiomatic expressions. Non-greeting fixed phrases.  
Includes: social fixed phrases, idioms where meaning is non-compositional.  
Examples: お世話になります, よろしくお願いします, いただきます, ご苦労様, 頭が固い (stubborn — lit. head is hard)

**`[L1] expr-onomatopoeia`**  
擬音語/擬態語 etc. — All onomatopoeia and mimetic words. Single L1 category.  
Subtype must be noted in the `notes` field: giongo / gitaigo / gijougo / giyougo.  
Examples: ざあざあ (giongo — sound of rain), ふわふわ (gitaigo — fluffy manner), わくわく (gijougo — excited feeling), ぴかぴか (giyougo — sparkling appearance)

**`[L1] interjection`**  
感動詞 — Interjections and backchannel expressions.  
Examples: あ, うん, えっ, ね, そう, へえ, なるほど, はい, いいえ, よし

---

### SUFFIXES AND AFFIXES

**`[L1] suffix-honorific`**  
敬称 — Honorific suffixes attached to names and titles.  
Examples: 〜さん, 〜様, 〜君, 〜ちゃん, 〜先生, 〜氏  
Note: these attach to names/nouns. Enter as independent entries with clear `connection` and `nuance` explaining attachment rules.

**`[L1] suffix-nominal`**  
名詞化接尾辞 — Suffixes that derive nouns from other word classes.  
Examples: 〜者 (person/practitioner), 〜家 (expert/artist), 〜員 (member/staff), 〜師 (master/practitioner), 〜性 (quality/nature — abstract), 〜的 (adjectival suffix), 〜化 (transformation), 〜感 (feeling of), 〜力 (power/ability)

**`[L1] prefix-honorific`**  
美化語接頭辞 — Honorific/beautification prefixes.  
Members: お〜, ご〜  
Critical learning point: whether to use お (native Japanese words) vs ご (Sino-Japanese words) follows word-origin rules — this distinction must be addressed in `notes`.

---

## A.2 — LAYER 3: EXHAUSTIVE POS REFERENCE

*Not for agent assignment. For curriculum design and advanced content planning.*

---

### VERBS — Extended

**`[L3] verb-compound`** — 複合動詞. V1+V2 compound verbs. Two subtypes: te-compounds (食べてみる, 持っていく) and stem-compounds (書き直す, 食べ始める). Many fixed compounds deserve individual entries when meaning is non-compositional (飛び込む, 思い出す).

**`[L3] verb-auxiliary-grammaticalized`** — Verbs that have largely grammaticalized into grammar patterns. These need both vocab entries AND grammar entries with explicit cross-referencing: もらう/くれる/あげる (giving/receiving system), いる (progressive/resultant state), くる/いく (directional aspect), おく (preparatory aspect), しまう (completive/regret), みる (attemptive), ある (resultant state).

**`[L3] verb-light`** — 軽動詞. する and なる in lightest uses. 〜になる (become), 〜にする (make/decide), 〜がする (sensation). Grammar-adjacent entries.

**`[L3] verb-suppletive`** — Verbs with suppletive paradigms across different forms. Important for N1 accuracy.

**`[L3] verb-mimetic-derived`** — Onomatopoeia-derived verbs: どきどきする, うろうろする, ぼーっとする. Many gitaigo/gijougo can take する.

---

### ADJECTIVES — Extended

**`[L3] adj-nominal`** — Adjective-nouns. Words functioning as both noun and adjective (元気, 大変). The overlap causes learner confusion.

**`[L3] adj-evaluative`** — Evaluative adjectives with special pragmatic restrictions. In Japanese, these sound immodest when applied to one's own things (×私の料理はおいしい). Key Indonesian-Japanese interference point.

**`[L3] adj-psych`** — Psychological/emotional adjectives with third-person restrictions. 嬉しい, 悲しい, 怖い cannot freely predicate about third persons without evidential modifiers. Major interference point from Indonesian.

**`[L3] adj-relational`** — Relational adjectives expressing relationships: 隣の, 反対の, 特有の.

---

### NOUNS — Extended

**`[L3] noun-event`** — Event nouns denoting events/actions with special aspectual properties: 到着, 出発, 爆発, 誕生.

**`[L3] noun-abstract`** — Abstract nouns with no physical referent: 自由, 平和, 正義, 概念, 存在. Important for N1.

**`[L3] noun-mass`** — Mass nouns: 水, 空気, 情報, 知識. Counter usage differs.

**`[L3] noun-collective`** — Collective and reduplicated nouns: 人々, 国々, 山々, 我々.

**`[L3] noun-compound`** — Compound nouns. Japanese is highly productive in noun compounding. N1 requires understanding compound formation patterns.

**`[L3] noun-deverbal`** — Nouns derived from verb masu-stems: 休み, 話し, 書き. Have interesting usage restrictions.

**`[L3] expletive-noun`** — Empty/expletive nouns. Highly grammaticalized: もの (for emphasis/softening), こと (for nominalization/rule-making), の (feminine/explanatory).

---

### ADVERBS — Extended

**`[L3] adverb-evaluative`** — Speaker-evaluative/modal adverbs: 残念ながら, 幸い, 不思議なことに. Express speaker's evaluation of the proposition.

**`[L3] adverb-focus`** — Focus adverbs highlighting particular constituents: 特に, 主に, だけ (adverbial use).

**`[L3] adverb-approximating`** — Approximation adverbs: だいたい, およそ, 約, ほぼ, ちょうど (exactly — opposite direction from others).

**`[L3] adverb-discourse`** — Discourse-organizing adverbs above sentence level: まず, 次に, 最後に, 一方, 要するに, つまり.

**`[L3] adverb-speech-act`** — Speech act adverbs modifying the speech act itself: 正直に言うと, 実を言えば, 失礼ですが.

**`[L3] adverb-correlative`** — Correlative adverb pairs: もし〜たら/ば, たとえ〜ても, いくら〜ても.

---

### PARTICLES — Extended

**`[L3] particle-interrog`** — Interrogative/wondering particles: か (question), かどうか (whether or not), かな (wondering — sentence-final).

**`[L3] particle-parallel`** — Listing particles connecting parallel elements: と (exhaustive), や (non-exhaustive), か (alternative), とか (casual), なり (literary: Aなり Bなり). Note: と here is distinct from case particle と.

**`[L3] particle-scope`** — Particles marking scope relationships. The は vs しか vs だけ system of scope and exclusion.

**`[L3] particle-quotation`** — Quotation particles: と (direct/indirect quote marker), って (casual quote/topic marker). Quotation と has different properties from case と.

**`[L3] particle-hesitation`** — Mid-sentence particles: ね (mid-sentence confirmation), さ (casual), よ (mid-sentence assertion).

---

### GRAMMAR-BOUNDARY CATEGORIES — Extended

**`[L3] modal-expression`** — Modal expressions functioning like single words: 〜かもしれない, 〜はずがない, 〜に違いない.

**`[L3] discourse-marker-lexical`** — Discourse markers lexicalized from other categories: なるほど, そういえば, ところで, 要するに.

**`[L3] auxiliary-complex`** — Complex auxiliary constructions: 〜ていただく, 〜てさしあげる, 〜てくださる.

---

### SPECIALIZED CATEGORIES — Extended

**`[L3] classical-form`** — Classical Japanese forms in modern writing: 〜なり (copula), 〜べし (obligation), 〜ず (negative), 〜たり (continuative), 〜けり (past/discovery). Appear in N1 reading.

**`[L3] dialect-form`** — Dialect vocabulary for cultural literacy: 〜や (Kansai), 〜じゃ (Chugoku/Shikoku), 〜だべ (Tohoku), 〜ばい/〜けん (Kyushu).

**`[L3] loanword-assimilated`** — Fully assimilated loanwords by origin: English-origin (テレビ, スマホ), German-origin (アルバイト, リュック), French-origin (アトリエ), Portuguese-origin (パン, タバコ).

**`[L3] wasei-eigo`** — Japanese-made English words: サラリーマン, ホームドラマ. Critical for learners who assume these match English usage.

**`[L3] four-character-compound`** — 四字熟語: 一石二鳥, 七転八起, 以心伝心. N2/N1 vocabulary level.

**`[L3] proverb-kotowaza`** — ことわざ: 七転び八起き, 猿も木から落ちる. Beyond JLPT, important for cultural competence.

---

# PART B — GRAMMAR CATEGORY (CAT) TAXONOMY

---

## B.1 — LAYER 1: OPERATIONAL GRAMMAR CATEGORIES

These are the only values valid for the `cat` field in `_schema.md`.

---

### PREDICATES AND CORE STRUCTURES

**`[L1] copula`**  
だ/です family. State of being.  
Covers: 〜は〜です, 〜じゃない, 〜でした, 〜ではありません  
Note: だ and です are the same copula at different register levels.

**`[L1] existence`**  
ある/いる patterns and extensions.  
Covers: 〜がある/いる, 〜にある/いる, 〜てある (resultant), 〜ている (resultant state use)

**`[L1] predicate-adjective`**  
Adjective as predicate patterns.  
Covers: い-adj and な-adj predicate forms, negative forms, past forms, て-form linking.

---

### VERB INFLECTION PATTERNS

**`[L1] te-form-use`**  
て-form and its multiple functions.  
Covers: Sequential use (AてB), reason use (〜て for cause), request (〜てください), progressive (〜ている), permission (〜てもいい), prohibition (〜てはいけない).  
Note: The uses of て-form are what learners must understand — not just its formation.

**`[L1] negative`**  
Negative patterns across word classes.  
Covers: 〜ない, 〜ません, 〜じゃない/ではない, 〜くない, double negation, partial negative scope.

**`[L1] past-tense`**  
Past/perfective patterns.  
Covers: 〜た, 〜ました, 〜かった, 〜だった, past progressive, past presumptive.

**`[L1] progressive-state`**  
Progressive and resultant state distinction.  
Covers: 〜ている (action in progress vs resultant state — critical distinction), 〜てある (resultant — someone did it intentionally), 〜ておく (preparatory — done for future use).  
Note: The ている action vs state distinction is a major learner challenge. Must be addressed in `nuance`.

**`[L1] potential`**  
Ability and possibility expressions.  
Covers: 〜られる/〜える (potential conjugation), できる (general ability), 〜ことができる (formal ability expression).

**`[L1] passive`**  
Passive voice constructions.  
Covers: 〜られる (direct passive), suffering/nuisance passive (迷惑の受身), passive used as honorific.  
Note: The suffering passive is unique to Japanese and has no direct parallel in Indonesian. Must be addressed in `nuance`.

**`[L1] causative`**  
Causative constructions.  
Covers: 〜させる (make/let someone do), 〜させてください (permission request using causative), causative-passive (〜させられる — being made to do).

**`[L1] volitional-intention`**  
Volition and intention expressions.  
Covers: 〜う/〜よう (volitional form), 〜つもり (personal intention/plan), 〜予定 (scheduled/arranged plan), 〜ようとする (attempt/be about to).

---

### MODALITY

**`[L1] permission-prohibition`**  
Permission and prohibition.  
Covers: 〜てもいい (permission), 〜てはいけない (prohibition), 〜てもかまわない (no objection), 〜てはならない (must not — formal/written).

**`[L1] obligation-necessity`**  
Obligation and necessity spectrum.  
Covers: 〜なければならない (must/have to — strong), 〜なくてはいけない (have to — neutral), 〜べきだ (should — moral obligation), 〜必要がある (it is necessary), 〜ないといけない (have to — casual).  
Note: These have subtle register and strength differences — all should be in each other's `confusion_pairs`.

**`[L1] desire-want`**  
Desire expressions with person-restriction rules.  
Covers: 〜たい (want to do — primarily first person), 〜てほしい (want someone to do), 〜たがる (appears to want — third person observation), 〜ほしい (want something — object-focused).

**`[L1] conjecture-possibility`**  
Conjecture and possibility on a certainty spectrum.  
Covers (from weakest to strongest): 〜かもしれない (might/maybe), 〜だろう (probably), 〜らしい (apparently — evidence-based), 〜ようだ (seems — direct observation), 〜はずだ (should be — logical expectation), 〜に違いない (must be — strong certainty).  
Note: Placing these on a certainty scale is critical for curriculum — they are not interchangeable.

**`[L1] hearsay-report`**  
Hearsay and reported information.  
Covers: 〜そうだ (I heard that — hearsay), 〜と言っていた (said that), 〜によると (according to).  
Critical note: Hearsay そうだ (〜だそうだ) is entirely different from appearance そうだ (〜そうだ — looks like). This is one of the most common N3 confusion points.  
confusion_pairs enforcement (HARD): All entries for hearsay そうだ MUST list appearance そうだ as a confusion_pair, and vice versa. This is bidirectional and non-negotiable. Validation script will hard-fail on missing or unidirectional entries. No exception permitted.

---

### CONDITIONALS

**`[L1] conditional-to`**  
〜と conditional. Natural/automatic result.  
Used for: habitual truth, instructions, natural sequences, discoveries.  
Key restriction: CANNOT use request, command, intention, or invitation in result clause.

**`[L1] conditional-ba`**  
〜ば conditional. Hypothetical/counterfactual-leaning.  
Used for: advice (〜ばよかった for regret), hypotheticals, proverbs.  
Key restriction: mainly used when speaker's desire or regret is involved.

**`[L1] conditional-tara`**  
〜たら conditional. Sequential/temporal or hypothetical.  
Most versatile conditional — can express temporal sequence (when/after) or hypothesis.  
Result clause: any type allowed (unlike と and ば).

**`[L1] conditional-nara`**  
〜なら conditional. Topic-based/premise-based condition.  
Based on premise established by context or previous speaker's utterance.  
Different from other conditionals: does not mark temporal sequence, marks topic of condition.

---

### CONNECTIVES AND DISCOURSE

**`[L1] reason-cause`**  
Reason and cause expressions.  
Covers: 〜から (reason — subjective, personal, used in requests/commands), 〜ので (reason — objective, polite, not used in commands), 〜ため (reason — formal written), 〜おかげで (thanks to — positive result), 〜せいで (due to — negative result/blame assignment).  
Note: から vs ので is a critical N4 confusion point requiring contrastive explanation.

**`[L1] contrast-concession`**  
Contrast and concession.  
Covers: 〜が/〜けど (but — contrast or softener), 〜のに (unexpectedly/despite — disappointment nuance), 〜ても/〜でも (even if/even though), 〜にもかかわらず (despite — formal), 〜ながらも (while/although — literary).

**`[L1] purpose`**  
Purpose expressions.  
Covers: 〜ために (for the purpose of — clear goal-oriented), 〜ように (so that — result-oriented, often for abilities/states).  
Note: ために vs ように is a major N3/N4 confusion point. ために requires volitional verb in preceding clause. ように does not.

**`[L1] sequential-temporal`**  
Sequence and temporal relations.  
Covers: 〜てから (after doing A completely, then B), 〜たあとで (after A, B — A already completed), 〜まえに (before), 〜ながら (while simultaneously), 〜ているあいだに (while/during), 〜たとき (when/at the time of).

**`[L1] listing-addition`**  
Listing and addition patterns.  
Covers: 〜し〜し (listing reasons/attributes), 〜たり〜たりする (representative examples listing), 〜だけでなく〜も (not only A but also B), 〜に加えて (in addition to).

---

### SCOPE AND FOCUS

**`[L1] limitation-only`**  
Limitation patterns. Critical N3 distinction group.  
Covers: 〜だけ (only/just — neutral), 〜しか〜ない (nothing but/only — always with negative, stronger emphasis), 〜ばかり (only/nothing but — often with nuance of excess or monotony), 〜のみ (only — formal written).  
Note: だけ vs しか vs ばかり is one of the most nuanced three-way distinctions in N3.

**`[L1] extent-degree`**  
Extent and degree.  
Covers: 〜ほど (to the extent that / the more...the more), 〜くらい/ぐらい (about/approximately/to the degree of), 〜だけ (as much as — extent use vs. limitation use of the same word).

**`[L1] comparison`**  
Comparison structures.  
Covers: 〜より〜 (more than), 〜の方が〜 (A is more than B), 〜と同じくらい (about the same as), 一番〜 (most/best), 〜ほど〜ない (not as...as).

---

### NOMINALIZATION AND EMBEDDING

**`[L1] nominalization`**  
Turning clauses into noun phrases.  
Covers: 〜こと (nominalization — fact/event/rule), 〜の (nominalization — activity/direct perception).  
Note: こと vs の is one of the most important N4/N3 distinctions. こと is used for rules and facts; の is used for perceptions and personal feelings. Must have contrastive examples.

**`[L1] quotation-thought`**  
Quoting and reporting thoughts and speech.  
Covers: 〜と思う (I think that), 〜と言う (say that), 〜と感じる (feel that), embedded questions (〜かどうか — whether or not, 〜か — indirect question).

**`[L1] relative-clause`**  
Noun modification via relative clauses.  
Japanese relative clauses: modifier precedes the noun, no relative pronoun.  
Format: [Verb/Adj] + Noun (e.g., 昨日読んだ本).  
Note: This is a fundamental structural difference from Indonesian (yang + verb after noun). Must be explicitly addressed.

---

### ASPECT

**`[L1] completion-regret`**  
Completion — with nuance of finality, completion, or regret.  
Covers: 〜てしまう/〜ちゃう (completion — neutral to regretful depending on context), 〜きる (completely/to the end — thorough), 〜おわる (finish doing — neutral completion).

**`[L1] inception-continuation`**  
Beginning and continuation patterns.  
Covers: 〜だす (begin suddenly — often involuntary start), 〜はじめる (begin — more planned start), 〜つづける (continue doing).  
Note: 〜ていく and 〜てくる are NOT members of this category. See `[L1] directional-aspect` below.

**`[L1] directional-aspect`**  
Aspectual patterns encoding temporal direction relative to the present moment.  
Covers: 〜ていく (action/state moves away from present into future — continuation outward), 〜てくる (action/state moves toward present from past — continuation inward).  
Classification rule: If the grammatical point primarily encodes DIRECTION OF TIME relative to speaker's present (away = ていく, toward = てくる), assign here — NOT to `inception-continuation`. The surface meaning of "continuing" is shared, but the deictic anchor is the distinguishing feature.  
confusion_pairs enforcement: ていく and てくる MUST be mutual confusion_pairs in their respective entries.

---

### KEIGO PATTERNS

**`[L1] sonkeigo-pattern`**  
Honorific patterns for actions of respected person.  
Covers: いらっしゃる (be/go/come — honorific), おっしゃる (say — honorific), なさる (do — honorific), お/ご〜になる (general honorific pattern), お/ご〜くださる (honorific request receiving).

**`[L1] kenjougo-pattern`**  
Humble patterns for speaker's own actions.  
Covers: いたす (do — humble), 申す (say — humble), 参る (go/come — humble), いただく (receive/eat/drink — humble), お/ご〜する (general humble pattern), お/ご〜いただく (humble request pattern).

**`[L1] teineigo-pattern`**  
Polite language patterns above basic です/ます.  
Covers: 〜でございます (polite copula — higher than です), 〜ております (polite progressive — higher than 〜ています), 〜いただけますか (polite request — higher than 〜てもらえますか).

---

### SENTENCE-FINAL PATTERNS

**`[L1] sentence-final-modality`**  
Sentence-final patterns expressing speaker stance.  
Covers: 〜ね (seeking confirmation/softening), 〜よ (providing new information/assertion), 〜よね (assertion seeking confirmation), 〜かな (wondering to oneself), 〜わけだ (logical conclusion/explanation), 〜のだ/んだ (explanation/background/emphasis).

**`[L1] sentence-final-request`**  
Request and command patterns.  
Covers: 〜てください (please do), 〜てくれますか (will you do for me — direct), 〜てもらえますか (can I have you do — indirect), 〜なさい (instruction/mild command — parental/teacher tone), 〜ないでください (please don't), 〜てはいけません (you must not).

---

## B.2 — LAYER 3: EXHAUSTIVE GRAMMAR REFERENCE

*Not for agent assignment. For curriculum design and advanced content planning.*

---

### EVIDENTIALITY SYSTEM

**`[L3] evid-direct-perception`** — Evidence from direct sensory experience: 〜ている (direct observation), 〜のが見える (can see that), 〜のが聞こえる (can hear that). Highest epistemic certainty, first-hand.

**`[L3] evid-inferential-appearance`** — Inference from visible evidence. Scale of directness: 〜ようだ (direct visual evidence) > 〜らしい (indirect/hearsay-adjacent) > 〜そうだ (looks like from appearance).

**`[L3] evid-inferential-reasoning`** — Inference from logic: 〜はずだ (expectation from logic), 〜に違いない (strong logical inference), 〜だろう (weaker inference).

**`[L3] evid-hearsay`** — Information from others: 〜そうだ (hearsay — distinct from appearance そうだ), 〜らしい (apparently), 〜とのことだ (formal reported speech), 〜ということだ (it is said that).

**`[L3] evid-memory`** — Evidence from memory: 〜たことがある (have experience of), 〜たはずだ (should have done), 〜はずだった (was supposed to — unmet expectation).

---

### ASPECT SYSTEM — COMPLETE

**`[L3] aspect-lexical`** — Inherent lexical aspect (Aktionsart). Achievement verbs (instantaneous: 死ぬ, 到着する), Accomplishment verbs (telic: 書く, 作る), Activity verbs (atelic: 走る, 泳ぐ), State verbs (stative: 知る, ある). These interact with ている differently — critical for N2/N1 accuracy.

**`[L3] aspect-prospective`** — About-to patterns: 〜ところだ (just about to), 〜ようとする/〜うとする (on the verge of/trying to).

**`[L3] aspect-inchoative`** — Beginning of state change: 〜くなる/〜になる (become — gradual), 〜だす (suddenly begin — often involuntary), 〜かける (begin but not complete).

**`[L3] aspect-cessative`** — Ending of activity: 〜やむ (cease naturally), 〜なくなる (stop being), 〜をやめる (stop volitionally).

**`[L3] aspect-iterative-resumptive`** — Repeating/resuming: 〜なおす (redo from start), 〜かえす (do back/repeat).

**`[L3] aspect-coercion`** — Context-forced reinterpretation of lexical aspect. 走っている (activity: running) vs 結婚している (state: married). Same ている, different interpretation based on lexical aspect class. N1 level.

---

### DISCOURSE STRUCTURE PATTERNS

**`[L3] discourse-topic-shift`** — ところで, それはそうと, 話は変わりますが, 〜と言えば.

**`[L3] discourse-frame-setting`** — 〜について, 〜に関して言えば, 〜の観点から.

**`[L3] discourse-exemplification`** — 例えば, 〜など/〜なんか, 〜を例に挙げると, 〜をはじめ.

**`[L3] discourse-elaboration`** — つまり, すなわち, 言い換えれば, 具体的に言うと.

**`[L3] discourse-concession-advance`** — Concede then argue: 確かに〜が/しかし〜, 〜は認めるが〜, なるほど〜だが〜. Very common in formal Japanese discourse.

**`[L3] discourse-reformulation`** — 〜じゃなくて, 〜というより, 正確に言うと.

**`[L3] discourse-digression`** — ちなみに, 余談ですが, 話が脱線しますが.

**`[L3] discourse-conclusion`** — 要するに, 結局, 以上のことから, まとめると.

---

### INFORMATION STRUCTURE

**`[L3] info-topic-comment`** — Japanese topic-comment structure. は as topic marker vs が as subject marker. The most fundamental structural difference from Indonesian/English. Double subject construction: 象は鼻が長い.

**`[L3] info-focus-marking`** — が for focused subject (new information), は for topic (given/contrastive), こそ for emphatic focus, だって for inclusive focus.

**`[L3] info-wa-ga-distinction`** — The complete は vs が system: discourse-new vs discourse-given, exhaustive-listing が, neutral description が, contrastive は, topic は. Deserves multiple dedicated grammar entries.

**`[L3] info-scrambling`** — Japanese word order variation. SOV is basic but scrambling is allowed for information structure purposes. Important for N1 reading comprehension.

---

### PRAGMATICS AND POLITENESS

**`[L3] pragmatic-face-threatening`** — Face-threatening act mitigation. Request softeners, refusal strategies (ちょっと... as soft no), disagreement softening. Not grammar per se but critical pragmatic patterns.

**`[L3] pragmatic-indirectness`** — Japanese high-context indirect communication: implicit refusal, topic avoidance as face-saving, vague expressions as hedging. Critical for real-world communication.

**`[L3] pragmatic-register-ladder`** — Context-appropriate language selection across the register system. Choosing between 食べる/食べます/いただく/召し上がる. Reference table for common verbs.

**`[L3] pragmatic-uchi-soto`** — In-group/out-group language distinction. 〜の者 (one of us), family terms (うちの主人 vs ご主人). Humble own side, honor other side principle.

**`[L3] pragmatic-implicature`** — Conversational implicature in Japanese. もう少し考えさせてください = likely refusal. Requires cultural context notes beyond linguistics.

---

### CLASSICAL JAPANESE GRAMMAR

**`[L3] classical-copula`** — なり (classical だ/です), たり (classical な of na-adj). Appear in N1 reading passages.

**`[L3] classical-negative`** — 〜ず (classical ない), 〜ぬ (literary negative). Frequent in set expressions: 知らず知らず, 思わず, たまらず.

**`[L3] classical-modality`** — 〜べし → 〜べき (obligation in formal writing), 〜まじ → 〜まじき (prohibition in formal/legal), 〜けり (discovery/realization in literature).

---

### MORPHOLOGY PATTERNS

**`[L3] morphology-compound-verb-back`** — Back-element patterns in V+V compounds. Learning these unlocks hundreds of compound verbs: 〜出す (begin suddenly/produce), 〜込む (into/thoroughly), 〜合う (mutually), 〜上げる (complete/raise), 〜切る (completely), 〜直す (redo). Highly productive pattern.

**`[L3] morphology-rendaku`** — 連濁. Sequential voicing in compounds: 花 + 火 → 花火 (hanabi). Rules and exceptions important for correct pronunciation of compounds.

**`[L3] morphology-onbin`** — 音便. Euphonic sound changes in て-form conjugation: 書いて (not 書きて), 読んで (not 読みて). Systematic rules that enable prediction.

---

### CONTRASTIVE LINGUISTICS
*Japanese-specific interference patterns for Indonesian speakers. Unique Nugget Nihongo differentiator.*

**`[L3] contrastive-null-subject`** — Both languages allow subject omission, but Japanese drops subject based on discourse givenness, not just when "obvious." Subtle but important difference.

**`[L3] contrastive-topic-subject`** — Indonesian has no は/が distinction. 「Saya pergi」 can map to either 私は行く or 私が行く depending on information structure. Causes systematic errors.

**`[L3] contrastive-word-order`** — Indonesian SVO vs Japanese SOV. Predicate-final principle in Japanese. Most common structural transfer error from Indonesian.

**`[L3] contrastive-tense`** — Indonesian is largely tenseless (uses temporal adverbs). Japanese marks tense morphologically. But Japanese past tense is also perfective: 「食べた」 = ate AND have eaten.

**`[L3] contrastive-counter`** — Indonesian has classifiers (sebuah, seekor, selembar) but Japanese counter system is far more extensive and obligatory. Indonesian classifier precedes noun; Japanese counter follows number.

**`[L3] contrastive-passive`** — Indonesian passive (di- prefix) is neutral and frequent. Japanese passive often implies suffering/nuisance. Indonesian learners systematically overuse Japanese passive.

**`[L3] contrastive-aspect`** — ている is NOT equivalent to "sedang" in all cases. Resultant state ている (結婚している = married) has no direct Indonesian parallel, causing systematic misuse.

**`[L3] contrastive-psych-adjective`** — Indonesian psychological adjectives (senang, sedih) can freely predicate about third persons. Japanese equivalents (嬉しい, 悲しい) cannot, without evidential modifiers. Major error source.

---

# PART C — DOMAIN TAXONOMY

---

## C.1 — LAYER 1: OPERATIONAL DOMAIN VALUES

These are the only values valid for the `domain` field in `_schema-vocab.md`.

**Assignment rules:**
- Minimum 1 tag, maximum 4 tags per entry
- Order by relevance: most relevant domain first
- Do not over-tag: 食べる needs `makanan`, not `makanan` + `kesehatan` + `kehidupan-sehari`
- For general-purpose words (する, ある, いる): use `umum`

---

### SITUASI KEHIDUPAN

| Domain Tag | Scope |
|---|---|
| `kehidupan-sehari` | Daily life activities, routines, habits |
| `keluarga` | Family relationships, home, domestic life |
| `pertemanan` | Friendship, social relationships |
| `percintaan` | Romantic relationships, dating |
| `pendidikan` | School, studying, tests, academic life |
| `pekerjaan` | Work, office, colleagues, career |
| `bisnis` | Business formal, contracts, formal meetings |
| `perjalanan` | Travel, transportation, navigation |
| `belanja` | Shopping, transactions, prices, stores |
| `kesehatan` | Health, medical, body, illness |
| `makanan-minuman` | Food, drinks, cooking, restaurants |
| `olahraga` | Sports, exercise, physical activity |
| `hiburan` | Entertainment, hobbies, leisure, arts |
| `teknologi` | Technology, digital, internet, devices |
| `alam-lingkungan` | Nature, weather, seasons, environment |
| `budaya` | Culture, customs, traditions, festivals |
| `bahasa-komunikasi` | Language itself, studying Japanese, communication acts |

### EMOSI DAN MENTAL

| Domain Tag | Scope |
|---|---|
| `emosi` | Emotions and feelings (general) |
| `emosi-positif` | Happiness, joy, excitement, relief |
| `emosi-negatif` | Sadness, anger, fear, frustration |
| `emosi-sosial` | Embarrassment, gratitude, sympathy |
| `pikiran-opini` | Thoughts, opinions, beliefs |
| `keputusan` | Choices, decisions, planning |
| `karakter` | Personality traits, character descriptions |

### ABSTRAK DAN KONSEPTUAL

| Domain Tag | Scope |
|---|---|
| `waktu` | Time expressions, temporal reference |
| `ruang-arah` | Space, location, direction, distance |
| `kuantitas` | Quantity, amount, measurement, degree |
| `kualitas` | Properties, characteristics, states |
| `perubahan` | Change, transformation, development |
| `hubungan-konsep` | Relationships between concepts (not people) |
| `sebab-akibat` | Cause, effect, reason, result |

### SOSIAL DAN INSTITUSI

| Domain Tag | Scope |
|---|---|
| `sopan-santun` | Politeness, etiquette, social rules |
| `keigo-vocabulary` | Keigo-specific vocabulary |
| `hukum-aturan` | Rules, regulations, rights, obligations |
| `politik-masyarakat` | Society, social issues, politics (N2/N1) |
| `ekonomi-keuangan` | Economics, finance, money, business concepts |

### AKADEMIS DAN PROFESIONAL

| Domain Tag | Scope |
|---|---|
| `ilmu-pengetahuan` | Science, research, academic discourse |
| `seni-budaya` | Arts, aesthetics, creative expression |
| `sastra` | Literature, writing, classical culture |
| `media` | Media, news, journalism |

### KHUSUS

| Domain Tag | Scope |
|---|---|
| `umum` | General purpose — no specific domain |
| `onomatope` | Onomatopoeia and mimetic expressions |
| `konsep-jepang` | Japanese cultural concepts (wa, ma, wabi-sabi) |
| `klasik` | Classical/literary Japanese |

---

## C.2 — LAYER 3: EXHAUSTIVE DOMAIN REFERENCE

*Not for agent assignment. For curriculum planning and content gap analysis.*

---

### FINE-GRAINED LIFE SITUATIONS

`rumah-tangga` — Household chores, domestic management  
`memasak-detail` — Detailed cooking: techniques, ingredients, utensils  
`mode-penampilan` — Fashion, clothing, appearance, style  
`kecantikan` — Beauty, grooming, cosmetics  
`pertanian` — Farming, agriculture, rural life  
`konstruksi` — Construction, building, architecture  
`maritim` — Marine, fishing, ocean-related  
`penerbangan` — Aviation-specific vocabulary  

### HEALTH AND BODY — FINE-GRAINED

`bagian-tubuh` — Body parts (detailed)  
`gejala-penyakit` — Symptoms and illness descriptions  
`pengobatan` — Medical treatment, medicine, procedures  
`kesehatan-mental` — Mental health, psychology  
`kebugaran` — Fitness, nutrition, wellness  
`kecacatan` — Disability, accessibility  

### EMOTIONS — FINE-GRAINED

`nuansa-positif` — Fine-grained positive: 嬉しい vs 楽しい vs 幸せ vs 喜ぶ distinctions  
`nuansa-negatif` — Fine-grained negative: 悲しい vs 寂しい vs 辛い vs 苦しい distinctions  
`estetika` — Aesthetic appreciation: 美しい, wabi-sabi related concepts  
`emosi-kompleks` — Complex emotions with no Indonesian equivalent: 切ない, 懐かしい, もどかしい  

### PROFESSIONAL FIELDS

`医療-医学` — Medical/clinical vocabulary  
`法律` — Legal vocabulary: 契約, 訴訟, 権利  
`工学-技術` — Engineering and technical  
`IT-コンピューター` — IT and programming vocabulary  
`経済-経営` — Economics and management  
`教育-学術` — Academic and educational  
`料理-調理` — Professional culinary  
`芸術` — Fine arts  
`音楽` — Music-specific vocabulary  
`スポーツ-詳細` — Sports-specific vocabulary per sport  

### NATURE — FINE-GRAINED

`植物` — Plants, botany, gardening  
`動物` — Animals, zoology  
`地理-地形` — Geography, terrain, landscape  
`天気-気象` — Weather, meteorology, climate  
`宇宙` — Space, astronomy, cosmos  
`海-水` — Ocean, water bodies, marine  
`山-森` — Mountains, forests, wilderness  
`環境問題` — Environmental issues, ecology  

### ABSTRACT — FINE-GRAINED

`哲学-倫理` — Philosophy, ethics, moral concepts  
`宗教-精神性` — Religion, spirituality  
`論理-推論` — Logic, reasoning, argumentation  
`概念-理念` — Abstract concepts, ideals  
`美学` — Aesthetics, beauty concepts  

### DISCOURSE AND RHETORIC

`議論` — Argumentation, debate  
`説明` — Explanation, description  
`物語-叙述` — Narrative, storytelling  
`説得` — Persuasion, rhetoric  

### JAPANESE CULTURAL SPECIFIC

`茶道` — Tea ceremony vocabulary  
`武道` — Martial arts vocabulary  
`歌舞伎-能` — Classical performing arts  
`神道-仏教` — Shinto and Buddhist vocabulary  
`年中行事` — Annual events and festivals  
`食文化` — Food culture specific (beyond general food)  
`贈り物文化` — Gift-giving culture vocabulary  
`わびさびもののあわれ` — Aesthetic concept vocabulary  
`恥-面子文化` — Shame/face culture vocabulary  
`集団-個人` — Collectivism vs individualism concepts  

### CONTEMPORARY JAPANESE

`SNS-インターネット` — Social media, internet slang  
`サブカルチャー` — Subculture: anime, manga, gaming vocabulary  
`若者言葉` — Youth language, contemporary slang  
`ビジネス敬語-詳細` — Detailed business keigo patterns  

---

# PART D — AGENT REFERENCE SUMMARY

*Quick reference for each agent. This section is operational.*

---

## D.1 — Agent 2 Juicy (Vocab)

- `pos` field: assign ONLY `[L1]` values from Part A.1
- `domain` field: assign ONLY `[L1]` values from Part C.1
- For edge-case POS: use closest `[L1]` value, document the nuance in `notes` field
- For domain not in `[L1]` list: use `umum` and flag in `notes` for Fluffy review
- `noun-formal` entries (こと, もの, の, ところ, わけ, はず, つもり, ため): require explicit cross-referencing to grammar entries via `related_grammar` field
- Psychological adjectives (嬉しい, 悲しい, 怖い, 寂しい): `notes` field MUST address third-person restriction
- `confusion_pairs` is now a required field starting N3. Bidirectionality is required — if A lists B, B must list A.

## D.2 — Agent 4 Batter (Grammar)

- `cat` field: assign ONLY `[L1]` values from Part B.1
- For evidentiality patterns: map to `[L1] conjecture-possibility` or `[L1] hearsay-report`
- For discourse patterns: map to closest `[L1]` or flag for Fluffy review — do not create new cat values
- n3-w and n4-w migration: the original `cat` values in those files need mapping to `[L1]` grammar categories — create explicit field mapping table as part of the migration task
- `confusion_pairs` grammar entries: when two grammar points are listed as confusion pairs, both entries' `nuance` fields MUST explicitly address the distinction between them

## D.3 — Agent 3 Saucy (Book)

- `themes` field in book lens: use `[L1]` domain values from Part C.1 as guidance
- No new `pos` or domain values — only `[L1]`
- `grammar_ids` is a new field in book lens schema — requires Batter to update `_schema.md` first before Saucy can fill this field

## D.4 — Agent 7 Spicy (Scripts)

- `validate-pos.js`: valid values = all `[L1]` pos values from Part A.1
- `validate-cat.js`: valid values = all `[L1]` grammar cat values from Part B.1
- `validate-domain.js`: valid values = all `[L1]` domain values from Part C.1
- Scripts MUST reject any `[L2]` or `[L3]` values as invalid
- Flag entries where `notes` field contains `[L3]` references — these need Fluffy review before any promotion

---

# APPENDIX — DECISIONS LOG

The following items were open questions in v1. All decisions approved by Nugget-san (Sesi 3, 23 Maret 2026).

1. **beyond-JLPT level tag** — DECISION: `jlpt` field accepts `'beyond'` as a valid value for entries above N1. ✅ LOCKED.

2. **Psychological adjective handling** — DECISION: Third-person restriction for 嬉しい, 悲しい etc. documented in `notes` field only. No schema flag at this stage. Future flag field deferred to Phase 2. ✅ LOCKED.

3. **Contrastive linguistics notes** — DECISION: `contrastive_note` as optional field deferred to Phase 2. Not in current schema. ✅ LOCKED.

4. **Classical Japanese scope** — DECISION: Classical Japanese grammar (L3) is in-scope for N1 content. Entries flagged with `register: 'literary'`. ✅ LOCKED.

5. **`confusion_pairs` directionality enforcement** — DECISION: Validation script HARD-FAILS on non-bidirectional or missing confusion_pairs. No warnings-only mode. ✅ LOCKED.

---

*NUGGET-NIHONGO-TAXONOMY-MASTER-v2.md*  
*v1 authored: Fluffy 🫧 — 23 Maret 2026*  
*v2 patches applied: Fluffy 🫧 — 24 Maret 2026*  
*Patches: PATCH A (directional-aspect split), PATCH B (hearsay-report enforcement), PATCH C (particle-conj classification rule)*  
*Decisions: Q1–Q5 all locked*
