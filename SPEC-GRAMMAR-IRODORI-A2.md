# SPEC: Fill grammar_ids — Irodori A2-1 & A2-2

**Status:** Ready for Claude Code  
**Source:** `Grammar_all.pdf` (Japan Foundation) — sections 初級1 (L1–L18) & 初級2 (L1–L18)  
**Target files:**
- `public/data/books/book-irodori-a2-1.js` — all `grammar_ids: []` need filling
- `public/data/books/book-irodori-a2-2.js` — all `grammar_ids: []` need filling

---

## TASK

Fill every `grammar_ids: []` in both files.  
Each unit maps to one 初級 lesson (unit 1 → L1, unit 2 → L2, … unit 18 → L18).  
`grammar_ids` must reference **existing global IDs** from `grammar-n5.js` or `grammar-n4.js`.  
IDs marked `null` need a **new global entry first** (see §NEW ENTRIES below).

**Do not** change `vocab_ids`, `topic`, `topic_id`, or any other field.  
**Do not** create new files. Only edit the two target files (and `grammar-n5.js` / `grammar-n4.js` if new entries needed).

---

## LESSON → UNIT MAPPING

Both books have 18 units. Unit N maps directly to 初級 Lesson N.

---

## A2-1: 初級1 Grammar → `book-irodori-a2-1.js`

### Unit 1 ← 初級1 L1「今の私」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | Polite style / Plain style 丁寧体・普通体 | `gn5-00001` | use (closest: は〜です registers) |
| ❷ | 【duration 期間】に なります | `gn5-00063` | ✓ exist |
| ❸ | 【point in time 時点】に | `gn5-00010` | ✓ exist |
| ❹ | V-ています ① (action in progress) | `gn5-00029` | ✓ exist |

```js
grammar_ids: ['gn5-00001', 'gn5-00063', 'gn5-00010', 'gn5-00029'],
```

---

### Unit 2 ← 初級1 L2「今の私」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-ることです (nominalization — defining) | `gn4-00052` | ✓ exist |
| ❷ | V-るのが好きです | `gn4-00051` | ✓ exist |
| ❹ | V1-て、V2 (te-form chain) | `gn5-00030` | ✓ exist (〜てください base) — use closest |
| ❺ | V-ています ② (habitual / resultant state) | `gn5-00029` | ✓ exist |

```js
grammar_ids: ['gn4-00052', 'gn4-00051', 'gn5-00029'],
```

---

### Unit 3 ← 初級1 L3「季節と天気」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❺ | S1 から、S2 (reason) | `gn5-00065` | ✓ exist |
| ❶ | N1 とか (N2 とか) (listing examples) | `gn4-00004` | ✓ exist |

```js
grammar_ids: ['gn5-00065', 'gn4-00004'],
```

---

### Unit 4 ← 初級1 L4「季節と天気」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❷ | Non-past / Past plain form 非過去・過去 | `gn5-00028` | ✓ exist (〜た) |
| ❸ | V-ています ③ (habitual) | `gn5-00029` | ✓ exist |
| ❹ | V-たら、～ | `gn5-00047` | ✓ exist |

```js
grammar_ids: ['gn5-00028', 'gn5-00029', 'gn5-00047'],
```

---

### Unit 5 ← 初級1 L5「私の町」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❸ | V-ることができます | `gn5-00050` | ✓ exist |

```js
grammar_ids: ['gn5-00050'],
```

---

### Unit 6 ← 初級1 L6「私の町」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | N に行きたいんですが… | `gn5-00040` | ✓ exist (〜たい) |
| ❷ | V-て、～ (te connector) | `gn5-00030` | ✓ exist |
| ❸ | N1 じゃなくて、N2 | `gn5-00002` | ✓ exist (〜じゃありません) |

```js
grammar_ids: ['gn5-00040', 'gn5-00030', 'gn5-00002'],
```

---

### Unit 7 ← 初級1 L7「いっしょに出かける」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | N はどうですか？ | `gn5-00044` | ✓ use (〜ましょうか — proposal) |
| ❷ | N でもいいですか？ | `gn4-00025` | ✓ exist (〜てもいい) |
| ❸ | N で、～ (reason/cause) | `gn5-00012` | ✓ exist (で — cara/alat) |

```js
grammar_ids: ['gn5-00044', 'gn4-00025', 'gn5-00012'],
```

---

### Unit 8 ← 初級1 L8「いっしょに出かける」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | もう V-ました | `gn5-00042` | use (〜ましょう area — temporal nuance) |
| ❷ | V-たことがあります | `gn5-00051` | ✓ exist |
| ❸ | V-に行きませんか？ | `gn5-00043` | ✓ exist (〜ませんか) |
| ❹ | N の前に、～ | `gn5-00054` | ✓ exist |
| ❺ | V-たいんですが… | `gn5-00040` | ✓ exist (〜たい) |

```js
grammar_ids: ['gn5-00051', 'gn5-00043', 'gn5-00054', 'gn5-00040'],
```

---

### Unit 9 ← 初級1 L9「日本語学習」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | N で ＜Means 手段＞ | `gn5-00012` | ✓ exist |
| ❸ | N1 は、～ (topic contrast) | `gn5-00005` | ✓ exist |
| ❹ | V-てもらえませんか？ | `gn4-00034` | ✓ exist |
| ❺ | V-方 (how to V) | `NEW-gn5-00081` | ⚠️ NEW ENTRY NEEDED |

```js
grammar_ids: ['gn5-00012', 'gn5-00005', 'gn4-00034', 'gn5-00081'],
```

---

### Unit 10 ← 初級1 L10「日本語学習」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-てみたいんですが… | `gn5-00036` | ✓ exist (〜てみる) |
| ❸ | V-ましょうか？ | `gn5-00044` | ✓ exist |
| ❺ | N のとき、～ | `gn5-00056` | ✓ exist |

```js
grammar_ids: ['gn5-00036', 'gn5-00044', 'gn5-00056'],
```

---

### Unit 11 ← 初級1 L11「おいしい料理」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-に行きます (purpose) | `gn5-00008` | ✓ exist (に — arah/tujuan) |
| ❷ | N1 と N2、どっちがいいですか？ | `gn5-00058` | ✓ exist |
| ❸ | N のほうがいいです | `gn5-00078` | ✓ exist |
| ❹ | 疑問詞 でもいいです | `gn4-00003` | ✓ exist (〜でも) |

```js
grammar_ids: ['gn5-00008', 'gn5-00058', 'gn5-00078', 'gn4-00003'],
```

---

### Unit 12 ← 初級1 L12「おいしい料理」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | な A- (na-adj predicative) | `gn5-00026` | ✓ exist |
| ❷ | な A- で、～ (na-adj te-form) | `gn5-00026` | ✓ exist |
| ❸ | い A- くて、～ (i-adj te-form) | `gn5-00024` | ✓ exist |
| ❹ | V-てみます | `gn5-00036` | ✓ exist |
| ❺ | 自動詞・他動詞 (transitive/intransitive) | `gn4-00073` | ✓ exist |

```js
grammar_ids: ['gn5-00026', 'gn5-00024', 'gn5-00036', 'gn4-00073'],
```

---

### Unit 13 ← 初級1 L13「仕事の連絡」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | 〜んですが… (explanatory) | `gn4-00048` | ✓ exist |
| ❷ | V-そうです (様態 — looks like) | `gn4-00053` | ✓ exist |
| ❸ | V-たいとき、～ | `gn5-00056` | ✓ exist (〜とき) |
| ❹ | V-ると、～ (conditional と) | `gn5-00048` | ✓ exist |

```js
grammar_ids: ['gn4-00048', 'gn4-00053', 'gn5-00056', 'gn5-00048'],
```

---

### Unit 14 ← 初級1 L14「仕事の連絡」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | N で、～ (reason) | `gn5-00012` | ✓ exist |
| ❷ | S1。それで、S2 | `gn4-00061` | ✓ exist |
| ❸ | V-てもいいですか？ | `gn4-00025` | ✓ exist |
| ❹ | V-てもいいでしょうか？ | `gn4-00025` | ✓ exist (same pattern, polite) |
| ❺ | V-なければなりません | `gn4-00023` | ✓ exist |

```js
grammar_ids: ['gn5-00012', 'gn4-00061', 'gn4-00025', 'gn4-00023'],
```

---

### Unit 15 ← 初級1 L15「健康な生活」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | 〜んです ② (explanatory — explanation mode) | `gn4-00048` | ✓ exist |
| ❷ | V-ないでください | `gn5-00035` | ✓ exist (〜ないで) |
| ❸ | V (plain) + N ① (relative clause — subject) | `gn5-00017` | ✓ exist (の) |
| ❹ | V-る前に、～ | `gn5-00054` | ✓ exist |
| ❺ | 〜とき（に）、～ | `gn5-00056` | ✓ exist |

```js
grammar_ids: ['gn4-00048', 'gn5-00035', 'gn5-00017', 'gn5-00054', 'gn5-00056'],
```

---

### Unit 16 ← 初級1 L16「健康な生活」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-るといいです | `gn4-00038` | ✓ exist |
| ❷ | V-すぎます | `gn4-00068` | ✓ exist |
| ❸ | V1-たり、V2-たり | `gn4-00046` | ✓ exist |

```js
grammar_ids: ['gn4-00038', 'gn4-00068', 'gn4-00046'],
```

---

### Unit 17 ← 初級1 L17「交際」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V (plain) + N ② (relative clause — object) | `gn5-00017` | ✓ exist |
| ❷ | 【人】に【物】をもらいます | `gn5-00038` | ✓ exist (〜てもらう) |
| ❸ | 【人】が【物】をくれます | `gn5-00039` | ✓ exist (〜てくれる) |

```js
grammar_ids: ['gn5-00017', 'gn5-00038', 'gn5-00039'],
```

---

### Unit 18 ← 初級1 L18「交際」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | S (plain) そうです (hearsay — 伝聞) | `gn4-00087` | ✓ exist |
| ❷ | 【人】に【物】をあげます | `gn5-00037` | ✓ exist (〜てあげる) |
| ❸ | S (plain) と言っていました | `gn4-00047` | ✓ exist |
| ❹ | S (plain) と思います | `gn4-00047` | ✓ exist |

```js
grammar_ids: ['gn4-00087', 'gn5-00037', 'gn4-00047'],
```

---

---

## A2-2: 初級2 Grammar → `book-irodori-a2-2.js`

### Unit 1 ← 初級2 L1「私の周りの人たち」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | N1 という N2 | `gn5-00071` | ✓ exist |
| ❷ | V-たばかりです | `NEW-gn4-00091` | ⚠️ NEW ENTRY NEEDED |
| ❸ | V-ていました (past progressive) | `gn5-00029` | ✓ exist (〜ている past) |
| ❹ | それ／そこ (discourse demonstratives) | `gn5-00014` | use (と — referential, closest) |
| ❺ | 〜て、～ (te-chain connector) | `gn5-00030` | ✓ exist |

```js
grammar_ids: ['gn5-00071', 'gn4-00091', 'gn5-00029'],
```

---

### Unit 2 ← 初級2 L2「私の周りの人たち」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | な A- です (predicative) | `gn5-00026` | ✓ exist |
| ❷ | V-ている + 人 (relative clause) | `gn5-00029` | ✓ exist |
| ❹ | S し、～ | `gn5-00076` | ✓ exist |

```js
grammar_ids: ['gn5-00026', 'gn5-00029', 'gn5-00076'],
```

---

### Unit 3 ← 初級2 L3「レストランで」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | S1 ので、S2 | `gn5-00066` | ✓ exist |
| ❷ | S よね (confirmation) | `gn5-00019` | ✓ exist |
| ❸ | N で～ (context/setting) | `gn5-00011` | ✓ exist |

```js
grammar_ids: ['gn5-00066', 'gn5-00019', 'gn5-00011'],
```

---

### Unit 4 ← 初級2 L4「レストランで」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | N なら、～ | `gn4-00035` | ✓ exist |
| ❸ | V-ちゃだめです (casual prohibition) | `gn4-00027` | ✓ exist (〜てはいけない) |
| ❹ | V-てから、～ | `gn5-00033` | ✓ exist |
| ❺ | S1 が、S2 (contrast) | `gn5-00067` | ✓ exist |

```js
grammar_ids: ['gn4-00035', 'gn4-00027', 'gn5-00033', 'gn5-00067'],
```

---

### Unit 5 ← 初級2 L5「旅行に行こう」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-(られ)ます 可能形① (potential form) | `gn4-00031` | ✓ exist |
| ❷ | 〜ところ (V-るところ — point/scene) | `gn4-00013` | ✓ exist |
| ❹ | 疑問詞 V-たらいいですか？ | `gn4-00038` | ✓ exist (〜たらいい) |
| ❺ | V-た (plain past) | `gn5-00028` | ✓ exist |

```js
grammar_ids: ['gn4-00031', 'gn4-00013', 'gn4-00038', 'gn5-00028'],
```

---

### Unit 6 ← 初級2 L6「旅行に行こう」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-るつもりです | `gn4-00074` | ✓ exist |
| ❸ | S1 し、S2 し、～ | `gn5-00076` | ✓ exist |
| ❺ | 【人】と【人数】で | `gn5-00015` | ✓ exist (と — bersama) |

```js
grammar_ids: ['gn4-00074', 'gn5-00076', 'gn5-00015'],
```

---

### Unit 7 ← 初級2 L7「地域のイベント」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | 〜たら、～ (conditional) | `gn5-00047` | ✓ exist |
| ❷ | V-(ら)れます 受身① (passive) | `gn4-00028` | ✓ exist |
| ❸ | V-(られ)ます 可能形② (potential 2) | `gn4-00031` | ✓ exist |

```js
grammar_ids: ['gn5-00047', 'gn4-00028', 'gn4-00031'],
```

---

### Unit 8 ← 初級2 L8「地域のイベント」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | もう V-ました (already completed) | `NEW-gn5-00082` | ⚠️ NEW ENTRY NEEDED |
| ❷ | まだ V-ます (still / not yet) | `NEW-gn5-00083` | ⚠️ NEW ENTRY NEEDED |
| ❸ | 疑問詞 + S (plain) か、～ (embedded Q) | `gn4-00050` | ✓ exist |

```js
grammar_ids: ['gn5-00082', 'gn5-00083', 'gn4-00050'],
```

---

### Unit 9 ← 初級2 L9「年中行事とマナー」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | 〜んですか？ (seeking explanation) | `gn4-00048` | ✓ exist |
| ❷ | N しか + 否定文 | `gn5-00023` | ✓ exist |
| ❸ | N だけ (only) | `gn5-00022` | ✓ exist |
| ❹ | V-たりして、～ | `gn4-00046` | ✓ exist |
| ❺ | V-なくちゃならない | `gn4-00024` | ✓ exist |

```js
grammar_ids: ['gn4-00048', 'gn5-00023', 'gn5-00022', 'gn4-00046', 'gn4-00024'],
```

---

### Unit 10 ← 初級2 L10「年中行事とマナー」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | 疑問詞 V-ばいいですか？ | `gn4-00038` | ✓ exist |
| ❷ | V-ては (prohibition nuance) | `gn4-00027` | ✓ exist |
| ❸ | V-なくちゃ (casual must) | `gn4-00024` | ✓ exist |
| ❺ | V-(ら)れます 受身② | `gn4-00028` | ✓ exist |

```js
grammar_ids: ['gn4-00038', 'gn4-00027', 'gn4-00024', 'gn4-00028'],
```

---

### Unit 11 ← 初級2 L11「上手な買い物」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-てみてもいいですか？ | `gn4-00025` | ✓ exist (〜てもいい) |
| ❷ | な A- (predicative, plain style) | `gn5-00026` | ✓ exist |
| ❸ | な A- な (attributive) | `gn5-00026` | ✓ exist |
| ❹ | N を V-(ら)れます 受身③ | `gn4-00028` | ✓ exist |
| ❺ | S (plain) かもしれません | `gn5-00079` | ✓ exist |

```js
grammar_ids: ['gn4-00025', 'gn5-00026', 'gn4-00028', 'gn5-00079'],
```

---

### Unit 12 ← 初級2 L12「上手な買い物」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-るまで、～ (until) | `NEW-gn4-00092` | ⚠️ NEW ENTRY NEEDED |
| ❷ | V-やすいです | `gn4-00044` | ✓ exist |
| ❸ | N1 と N2、どちら／どっちが〜か？ | `gn5-00058` | ✓ exist |

```js
grammar_ids: ['gn4-00092', 'gn4-00044', 'gn5-00058'],
```

---

### Unit 13 ← 初級2 L13「さまざまなサービス」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-(ら)れます 受身④ | `gn4-00028` | ✓ exist |
| ❷ | V-てあります | `gn4-00018` | ✓ exist |
| ❸ | N1 だけじゃなくて、N2 も〜 | `gn4-00081` | ✓ exist |
| ❹ | N なら、〜 | `gn4-00035` | ✓ exist |
| ❺ | 疑問詞 V-ても、〜 | `gn4-00037` | ✓ exist |

```js
grammar_ids: ['gn4-00028', 'gn4-00018', 'gn4-00081', 'gn4-00035', 'gn4-00037'],
```

---

### Unit 14 ← 初級2 L14「さまざまなサービス」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | な A- に (adverbial form) | `NEW-gn5-00084` | ⚠️ NEW ENTRY NEEDED |
| ❷ | N のために、〜 (for the sake of) | `gn4-00042` | ✓ exist |

```js
grammar_ids: ['gn5-00084', 'gn4-00042'],
```

---

### Unit 15 ← 初級2 L15「自然と環境」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-たままです | `gn4-00086` | ✓ exist (〜まま) |
| ❷ | V-るのにいいです | `gn4-00051` | ✓ exist (〜の nominalization) |

```js
grammar_ids: ['gn4-00086', 'gn4-00051'],
```

---

### Unit 16 ← 初級2 L16「自然と環境」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V (命令形 — imperative) | `gn4-00056` | ✓ exist |
| ❷ | V-ないようにしてください | `gn4-00041` | ✓ exist (Vようにする) |
| ❸ | V-(られ)なくなります | `gn4-00040` | ✓ exist (Vようになる neg) |
| ❹ | S ても、〜 (even if) | `gn4-00037` | ✓ exist |
| ❺ | V (plain) かどうか、〜 | `gn4-00049` | ✓ exist |

```js
grammar_ids: ['gn4-00056', 'gn4-00041', 'gn4-00040', 'gn4-00037', 'gn4-00049'],
```

---

### Unit 17 ← 初級2 L17「私の人生」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-(られ)るようになりました | `gn4-00040` | ✓ exist (Vようになる) |

```js
grammar_ids: ['gn4-00040'],
```

---

### Unit 18 ← 初級2 L18「私の人生」

| # | Pattern | Global ID | Status |
|---|---------|-----------|--------|
| ❶ | V-(よ)うと思います／思っています | `gn4-00075` | ✓ exist |
| ❷ | V-るために、〜 (purpose) | `gn4-00042` | ✓ exist |
| ❸ | V-てあげます | `gn5-00037` | ✓ exist |
| ❹ | V-てもらいます | `gn5-00038` | ✓ exist |
| ❺ | V-てくれます | `gn5-00039` | ✓ exist |

```js
grammar_ids: ['gn4-00075', 'gn4-00042', 'gn5-00037', 'gn5-00038', 'gn5-00039'],
```

---

---

## ⚠️ NEW GLOBAL GRAMMAR ENTRIES NEEDED

Before filling `grammar_ids`, create these entries in the global grammar files.  
Use existing entries as schema reference. `provenance: 'irodori'`, `added_v: 'v15'`.

### `grammar-n5.js` — append after `gn5-00080`

#### `gn5-00081` — V-方 (how to do V)
```js
{
  id         : 'gn5-00081',
  level      : 'n5',
  pattern    : 'V-方',
  reading    : 'V-kata',
  meaning    : 'cara melakukan V',
  cat        : 'nominalization',
  form_class : 'suffix',
  jlpt_sub   : 9,
  connection : 'V(ます-stem) + 方',
  desc       : '<b>V-方</b> menyatakan "cara melakukan sesuatu". Dibentuk dari bentuk ます (ます-stem) + 方. Contoh: 食べ方 = cara makan, 書き方 = cara menulis.',
  nuance     : 'Digunakan untuk menanyakan atau menjelaskan metode/cara suatu tindakan.',
  examples   : [
    { jp: 'この漢字の<b>読み方</b>を教えてください。', id: 'Tolong ajari saya cara membaca kanji ini.' },
    { jp: 'パスタの<b>作り方</b>を知っていますか？', id: 'Apakah kamu tahu cara membuat pasta?' },
    { jp: 'ごみの<b>捨て方</b>がわかりません。', id: 'Saya tidak tahu cara membuang sampah.' },
  ],
  see_also_grammar : ['gn5-00050'],
  see_also_vocab   : [],
  confusion_pairs  : [],
  register   : null,
  exceptions : null,
  notes      : 'Pattern from Irodori 初級1 L9. Common in daily communication.',
  provenance : 'irodori',
  added_v    : 'v15',
},
```

#### `gn5-00082` — もう V-ました (already done)
```js
{
  id         : 'gn5-00082',
  level      : 'n5',
  pattern    : 'もう V-ました',
  reading    : 'mou V-mashita',
  meaning    : 'sudah V (selesai)',
  cat        : 'completion-regret',
  form_class : null,
  jlpt_sub   : 10,
  connection : 'もう + V(ます-form past)',
  desc       : '<b>もう V-ました</b> menyatakan bahwa suatu tindakan sudah selesai dilakukan. もう menambah nuansa "sudah" atau "sekarang sudah".',
  nuance     : 'Digunakan saat memberi tahu bahwa sesuatu telah diselesaikan. Pasangan: まだ V-ていません (belum selesai).',
  examples   : [
    { jp: '<b>もう</b>宿題をしました。', id: 'Saya sudah mengerjakan PR.' },
    { jp: '荷物は<b>もう</b>送りましたか？', id: 'Apakah barang bawaannya sudah dikirim?' },
    { jp: '<b>もう</b>ご飯を食べましたか？', id: 'Apakah kamu sudah makan?' },
  ],
  see_also_grammar : ['gn5-00083'],
  see_also_vocab   : [],
  confusion_pairs  : ['gn5-00083'],
  register   : null,
  exceptions : null,
  notes      : 'Pattern from Irodori 初級2 L8.',
  provenance : 'irodori',
  added_v    : 'v15',
},
```

#### `gn5-00083` — まだ V-ます / まだ V-ていません (still / not yet)
```js
{
  id         : 'gn5-00083',
  level      : 'n5',
  pattern    : 'まだ V-ます / まだ V-ていません',
  reading    : 'mada V-masu / mada V-te imasen',
  meaning    : 'masih V / belum V',
  cat        : 'progressive-state',
  form_class : null,
  jlpt_sub   : 10,
  connection : 'まだ + V(ます) または まだ + V-ていません',
  desc       : '<b>まだ V-ます</b> = masih melakukan V (sedang berlanjut). <b>まだ V-ていません</b> = belum selesai melakukan V.',
  nuance     : 'Pasangan: もう V-ました (sudah selesai).',
  examples   : [
    { jp: '<b>まだ</b>仕事をしています。', id: 'Saya masih bekerja.' },
    { jp: '報告書は<b>まだ</b>書いていません。', id: 'Laporan belum saya tulis.' },
    { jp: '<b>まだ</b>決めていません。', id: 'Saya belum memutuskan.' },
  ],
  see_also_grammar : ['gn5-00082'],
  see_also_vocab   : [],
  confusion_pairs  : ['gn5-00082'],
  register   : null,
  exceptions : null,
  notes      : 'Pattern from Irodori 初級2 L8.',
  provenance : 'irodori',
  added_v    : 'v15',
},
```

#### `gn5-00084` — な A- に (na-adjective adverbial)
```js
{
  id         : 'gn5-00084',
  level      : 'n5',
  pattern    : 'な A- に',
  reading    : 'na-A ni',
  meaning    : 'dengan cara yang [na-adj] — bentuk adverbia',
  cat        : 'predicate-adjective',
  form_class : 'particle-compound',
  jlpt_sub   : 8,
  connection : 'な-adjective (stem) + に',
  desc       : 'Mengubah <b>な-adjective</b> menjadi bentuk adverbia dengan menambahkan に. Digunakan untuk memodifikasi kata kerja.',
  nuance     : 'Setara dengan "-ly" dalam bahasa Indonesia: 丁寧に = dengan sopan, 静かに = dengan tenang.',
  examples   : [
    { jp: '<b>丁寧に</b>書いてください。', id: 'Tolong tulis dengan rapi.' },
    { jp: '<b>静かに</b>してください。', id: 'Tolong tenang.' },
    { jp: '<b>親切に</b>教えてくれました。', id: 'Beliau mengajar dengan baik hati.' },
  ],
  see_also_grammar : ['gn5-00026'],
  see_also_vocab   : [],
  confusion_pairs  : [],
  register   : null,
  exceptions : null,
  notes      : 'Pattern from Irodori 初級2 L14.',
  provenance : 'irodori',
  added_v    : 'v15',
},
```

### `grammar-n4.js` — append after `gn4-00090`

#### `gn4-00091` — V-たばかりです (just did)
```js
{
  id         : 'gn4-00091',
  level      : 'n4',
  pattern    : 'V-たばかりです',
  reading    : 'V-ta bakari desu',
  meaning    : 'baru saja V (baru selesai)',
  cat        : 'completion-regret',
  form_class : 'suffix',
  jlpt_sub   : 1,
  connection : 'V(plain past た-form) + ばかり',
  desc       : '<b>V-たばかり</b> menyatakan bahwa suatu tindakan baru saja selesai dilakukan. Menekankan kesegaran/kebaruan dari tindakan tersebut.',
  nuance     : 'Berbeda dari もうV-ました: ばかり menekankan "sangat baru saja", biasanya dalam hitungan menit/jam.',
  examples   : [
    { jp: '日本に来た<b>ばかり</b>なので、まだ慣れていません。', id: 'Saya baru saja tiba di Jepang jadi belum terbiasa.' },
    { jp: 'ご飯を食べた<b>ばかり</b>です。', id: 'Saya baru saja makan.' },
    { jp: '仕事を始めた<b>ばかり</b>で、覚えることがたくさんあります。', id: 'Baru saja mulai bekerja jadi banyak hal yang perlu diingat.' },
  ],
  see_also_grammar : ['gn5-00082'],
  see_also_vocab   : [],
  confusion_pairs  : ['gn5-00082'],
  register   : null,
  exceptions : null,
  notes      : 'Pattern from Irodori 初級2 L1.',
  provenance : 'irodori',
  added_v    : 'v15',
},
```

#### `gn4-00092` — V-るまで、〜 (until V)
```js
{
  id         : 'gn4-00092',
  level      : 'n4',
  pattern    : 'V-るまで、〜',
  reading    : 'V-ru made',
  meaning    : 'sampai V / hingga V',
  cat        : 'sequential-temporal',
  form_class : 'particle-compound',
  jlpt_sub   : 2,
  connection : 'V(dictionary form) + まで + clause',
  desc       : '<b>V-るまで</b> menyatakan batas waktu akhir dari suatu tindakan atau keadaan. Artinya "sampai/hingga terjadi V".',
  nuance     : 'Berbeda dari まで (partikel batas tempat/waktu polos). Di sini menekankan titik akhir dari proses.',
  examples   : [
    { jp: '電車が来る<b>まで</b>ここで待ってください。', id: 'Tolong tunggu di sini sampai kereta datang.' },
    { jp: '試験が終わる<b>まで</b>帰れません。', id: 'Saya tidak bisa pulang sampai ujian selesai.' },
    { jp: '準備ができる<b>まで</b>少し待ってください。', id: 'Tolong tunggu sebentar sampai persiapan selesai.' },
  ],
  see_also_grammar : ['gn5-00033', 'gn5-00054'],
  see_also_vocab   : [],
  confusion_pairs  : [],
  register   : null,
  exceptions : null,
  notes      : 'Pattern from Irodori 初級2 L12.',
  provenance : 'irodori',
  added_v    : 'v15',
},
```

---

## EXECUTION ORDER

1. **Add new global entries** to `grammar-n5.js` and `grammar-n4.js` (entries above)
2. **Fill `grammar_ids`** in `book-irodori-a2-1.js` — units 1–18
3. **Fill `grammar_ids`** in `book-irodori-a2-2.js` — units 1–18
4. Run `node tests/run.js` — confirm 0 failures

---

## NOTES

- Some grammar points share the same global ID (e.g. ている is used for multiple usages ①②③ — that's intentional, the global entry covers all usages)
- Duplicate IDs in a `grammar_ids` array are fine; the UI deduplicates at render time
- The mapping Unit N → Lesson N is a reasonable approximation; exact correspondence can be refined later
- `provenance: 'irodori'` on new global entries signals these came from Irodori content
