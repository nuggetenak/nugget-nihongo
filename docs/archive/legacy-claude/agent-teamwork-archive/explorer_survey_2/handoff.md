# Handoff Report: Tab 2 (Review & Garden) and Tab 3 (Dojo & Pustaka) Survey

**Explorer**: Explorer 2 (Codebase Explorer — Tab 2 Review & Garden, Tab 3 Dojo & Pustaka Catalog)  
**Date & UTC Timestamp**: 2026-10-25T05:55:00Z  
**Parent Conversation ID**: `9110eabb-ae6d-43ee-8e3e-c0e815b0201d`  
**Status**: Completed (Hard Handoff)

---

## 1. Observation

### 1.1 Tab 2 (Review: Dual-Card Review & Garden Retention Hub)

#### FSRS Review State & Store Location
* There is no separate `useReviewStore` file. The primary FSRS card dictionary and session dispatchers reside in `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\store\useAppStore.ts`:
  - Lines 34: `activeTab: 'home' | 'materi' | 'quiz' | 'kebun' | 'sensei' | 'settings' | 'about' | 'study' | 'methodology' | 'choukai';`
  - Lines 174–182:
    ```typescript
    cards: Record<string, { card: FSRSCard; source?: 'vocab' | 'grammar' | string }>;
    setCard: (id: string, record: { card: FSRSCard; source?: 'vocab' | 'grammar' | string }) => void;
    fsrsDueReviewTrigger: boolean;
    startFSRSDueSession: () => void;
    clearFSRSDueReviewTrigger: () => void;
    ```
  - Lines 731–737 (Dispatch Action):
    ```typescript
    fsrsDueReviewTrigger: false,
    startFSRSDueSession: () => {
      set({ fsrsDueReviewTrigger: true });
      get().setActiveTab('quiz');
    },
    clearFSRSDueReviewTrigger: () => set({ fsrsDueReviewTrigger: false }),
    ```
  - Storage persistence: Saved to `localStorage.getItem('nn_fsrs_cards')` via `storageSanitizer.ts`.

#### FSRS Due Count & Mathematical Logic
* Due cards calculation is defined in `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\lib\quiz\quizEngine.ts` (lines 541–552):
  ```typescript
  export function getFSRSDueCount(cardsMap: Record<string, { card: FSRSCard; source?: string }>): number {
    const now = new Date();
    let count = 0;
    for (const record of Object.values(cardsMap)) {
      if (record?.card) {
        if (!record.card.due || new Date(record.card.due) <= now) {
          count++;
        }
      }
    }
    return count;
  }
  ```
* FSRS question generator: `generateFSRSDueQuestions` in `src/lib/quiz/quizEngine.ts` (lines 557–600).
* Retention curve calculation: `fsrsForgettingCurve(elapsedDays, stability)` and `calculateFSRSReview(existingCard, rating)` in `src/lib/fsrs/math.ts` (lines 50–120).

#### Kebun Nihongo (Garden) Store State & Actions
* The garden state is implemented in `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\lib\garden\gardenStore.ts`:
  - Lines 19–29 (Plant Schema):
    ```typescript
    export interface PlantItem {
      id: string;
      kanji: string;
      reading: string;
      meaning: string;
      level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
      stage: number;      // 0 to 4
      waterCount: number; // how many times watered
      maxWater: number;   // water needed for full bloom (default 5)
      lastWatered?: string;
    }
    ```
  - Lines 42: `export const MAX_GARDEN_CAPACITY = 36;`
  - Lines 44–53 (Store Interface):
    ```typescript
    export interface GardenStoreState {
      waterDrops: number;
      plants: PlantItem[];
      addWaterDrop: (count?: number) => void;
      waterPlant: (plantId: string) => boolean;
      waterAll: () => number;
      seedPlant: (kanji: string, reading: string, meaning: string, level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1') => boolean;
      applyLapseWilt: (lapsedKanji?: string) => boolean;
      checkDailyRefill: () => boolean;
    }
    ```
  - Lines 75–123 (`waterPlant` logic):
    - Validates `waterDrops > 0` and `plant.stage < 4`.
    - Increments `waterCount += 1`.
    - Calculates `stage = Math.min(4, Math.floor((newWaterCount / plant.maxWater) * 4))`.
    - Decrements `waterDrops -= 1`.
    - Calls `notifyBloomBadge()` if `newStage >= 4`.
  - Lines 125–159 (`waterAll` logic):
    - Waters each plant with `stage < 4` sequentially while `dropsUsed < waterDrops`.
    - Returns number of drops used.
  - Lines 219–242 (`checkDailyRefill` logic):
    - Inspects `localStorage.getItem('nn_garden_last_refill')` against current date string.
    - If new day, calls `addWaterDrop(3)`.

#### Water Drops Awarding Mechanism
* Located in `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\pages\QuizPage.tsx` lines 521–528:
  ```typescript
  // Atomized dynamic water drop rewards (1 base + 1 per 3 correct + 1 bonus for 100% accuracy)
  const baseDrops = 1;
  const scoreDrops = Math.floor(sessionScore / 3);
  const perfectBonus = sessionScore === questions.length && questions.length > 0 ? 1 : 0;
  const earnedDrops = baseDrops + scoreDrops + perfectBonus;
  setSessionEarnedWater(earnedDrops);
  useGardenStore.getState().addWaterDrop(earnedDrops);
  ```
* Additional water awarding sources:
  - `src/store/useAppStore.ts` line 435: `completeLesson()` awards 2 drops (`useGardenStore.getState().addWaterDrop(2);`).
  - `src/components/kanji/KanjiStrokeModal.tsx` line 626: mastering stroke animation awards 1 drop (`useGardenStore.getState().addWaterDrop(1);`).
  - `src/lib/gamification/gamificationStore.ts` line 376: level-up awards 1 drop.

#### Current Screen Fragmentation in Tab 2
* In `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\pages\KebunPage.tsx`:
  - Contains an internal tab toggle: `const [activeTab, setVaultTab] = useState<'vault' | 'garden'>('vault');` (line 36).
  - 'vault' tab shows FSRS curve metrics, retrievability percentage, and a CTA "Review X Kartu Jatuh Tempo" (`onClick={startFSRSDueSession}`).
  - 'garden' tab shows water drops (`{waterDrops} Tetes`), "Siram Semua" button, and plant cards.
  - Clicking "Review X Kartu Jatuh Tempo" abruptly reroutes the user to `activeTab = 'quiz'` (`QuizPage.tsx`), forcing full-page transition away from the garden.
  - Upon session completion in `QuizPage.tsx`, the user lands on `QuizResultView.tsx` with no direct way to water plants without manual tab switching back to `KebunPage`.

#### Location of Optional Practice Drills
* All practice drills currently reside in `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\components\quiz\QuizArenaHub.tsx`:
  - Lines 55–150 (`ARENA_MODES`):
    - `flashcard`: Flashcard 3D FSRS (メタ認知)
    - `multiple-choice`: Pilihan Ganda Cepat (四択クイズ)
    - `fill-in`: Isian Partikel & Pola (助詞穴埋め)
    - `rearrange`: Susun Kalimat / Sentence Builder (語順並べ替え)
    - `listening`: Latihan Mendengar / Audio Drill (リスニング特訓)
    - `conjugation`: Latihan Konjugasi Kata Kerja (動詞活用ドリル)
    - `translation`: Latihan Terjemahan Kalimat (文脈翻訳)
    - `error-find`: Cari Kesalahan Makna (誤答検出)
    - `panic-recall`: Simulasi Tanggap Darurat & K3 (緊急コール)
    - `mora-pacing`: Pacing Mora Metronome Drill (拍感覚)
    - `production`: Produksi Output 6 Archetypes (発話産出)
  - Lines 418–450: Mistake Notebook ("Catatan Evaluasi") review trigger (`onStartMistakeReview`).

---

### 1.2 Tab 3 (Consolidated Dojo & Pustaka Catalog)

#### Inventory of Existing Tools & References Across Codebase

| Cluster | Tool Name | File Path | Current Render Mechanism |
|---|---|---|---|
| **Core Skills** | **Kanji Dojo & Stroke Animator** | `src/components/kanji/KanjiDojoView.tsx`<br>`src/components/kanji/KanjiStrokeModal.tsx` | Sub-studio under `MateriHubPage.tsx` (`materiStudio === 'kanji'`). Stroke details open in `KanjiStrokeModal` (`z-[9999]` portal). |
| **Core Skills** | **Choukai CBT Simulator** | `src/pages/ChoukaiSimulatorPage.tsx`<br>`src/components/audio/ChoukaiAudioPlayer.tsx`<br>`src/components/quiz/PrometricCbtModal.tsx`<br>`src/components/quiz/JftBasicCbtModal.tsx` | Full-page route (`activeTab === 'choukai'`), plus floating modals inside `QuizArenaHub.tsx`. |
| **Core Skills** | **Pitch Accent Studio** | `src/components/pitch/PitchAccentModal.tsx`<br>`src/components/pitch/PitchContourView.tsx` | Lazy-loaded modal in `GlobalModalManager.tsx` and `StudyToolboxModal.tsx` (`openModal('pitch')`). |
| **Core Skills** | **Adaptive Placement Test (CAT)** | `src/components/cat/CatPlacementModal.tsx`<br>`src/lib/cat/catEngine.ts` | Lazy-loaded modal in `App.tsx` (`isCatPlacementOpen`) & `GlobalModalManager.tsx` (`openModal('catPlacement')`). |
| **Grammar & Culture** | **Keigo Business Trainer** | `src/components/keigo/KeigoTrainerModal.tsx`<br>`src/lib/keigo/keigoEngine.ts` | Lazy-loaded modal in `GlobalModalManager.tsx` (`openModal('keigo')`) via `StudyToolboxModal.tsx`. |
| **Grammar & Culture** | **Counter Simulator (助数詞)** | `src/components/counters/CounterTrainerModal.tsx`<br>`src/lib/counters/counterEngine.ts` | Lazy-loaded modal in `GlobalModalManager.tsx` (`openModal('counters')`) via `StudyToolboxModal.tsx`. |
| **Grammar & Culture** | **Verb Conjugation Engine** | `src/components/grammar/ConjugationModal.tsx`<br>`src/lib/grammar/conjugation.ts` | Lazy-loaded modal in `App.tsx` (`isConjugationOpen`) and `GlobalModalManager.tsx` (`openModal('conjugation')`). |
| **Grammar & Culture** | **Nuance Inspector** | `src/components/grammar/NuanceCompareModal.tsx` | Lazy-loaded modal in `App.tsx` (`isNuanceOpen`) and `GlobalModalManager.tsx` (`openModal('nuance')`). |
| **Grammar & Culture** | **Kotowaza Gallery (376+)** | `src/components/kotowaza/KotowazaModal.tsx`<br>`src/lib/data/kotowaza.ts` | Lazy-loaded modal in `App.tsx` (`isKotowazaOpen`) and `GlobalModalManager.tsx` (`openModal('kotowaza')`). |
| **Reference Library** | **Interactive Kana Chart** | `src/components/kana/KanaChartModal.tsx`<br>`src/components/kana/kanaData.ts` | Lazy-loaded modal in `App.tsx` (`isKanaOpen`) and `GlobalModalManager.tsx` (`openModal('kana')`). |
| **Reference Library** | **Standard Textbooks** (Minna, Genki, Irodori, etc.) | `src/components/materi/BookTrackBrowser.tsx`<br>`src/lib/data/authenticExerciseManager.ts`<br>`src/lib/data/bookPedagogyMatrix.ts` | Sub-studio under `MateriHubPage.tsx` (`materiStudio === 'buku'`). Authentic drills open in `AuthenticDrillModal` (`z-[9999]` portal). |

#### Modal Stacking & Portal Conflict Observations
1. **Parallel Double Mounting**:
   - `App.tsx` mounts individual modals directly with boolean flags:
     ```typescript
     <KanaChartModal isOpen={isKanaOpen} onClose={closeKana} />
     <ConjugationModal isOpen={isConjugationOpen} onClose={closeConjugation} />
     <NuanceCompareModal isOpen={isNuanceOpen} onClose={closeNuance} />
     <KotowazaModal isOpen={isKotowazaOpen} onClose={closeKotowaza} />
     <StudyToolboxModal isOpen={isToolboxOpen} onClose={closeToolbox} ... />
     <CatPlacementModal isOpen={isCatPlacementOpen} onClose={closeCatPlacement} />
     ```
   - AND `App.tsx` mounts `<GlobalModalManager />` (line 411), which maps over `modalStack` in `useModalStore.ts`.
2. **Toolbox Trigger Anti-Pattern**:
   - In `src/components/tools/StudyToolboxModal.tsx` lines 96–112:
     ```typescript
     action: () => {
       onClose();
       onOpenCatPlacement();
     }
     ```
   - Clicking an item closes the toolbox modal and immediately attempts to mount the target modal. On mobile, if state updates do not synchronize within the same frame, the unmounting backdrop and mounting backdrop flicker or collide.
3. **Hard-coded Portals with `z-[9999]`**:
   - `StudyToolboxModal.tsx` (line 226): `fixed inset-0 z-[9999]`
   - `CatPlacementModal.tsx`: `createPortal(..., document.body)` with `fixed inset-0 z-[9999]`
   - `KotowazaModal.tsx`: `createPortal(..., document.body)` with `fixed inset-0 z-[9999]`
   - `KanaChartModal.tsx`: `createPortal(..., document.body)` with `fixed inset-0 z-[9999]`
   - `KanjiStrokeModal.tsx`: `createPortal(..., document.body)` with `fixed inset-0 z-[9999]`
   - `AuthenticDrillModal.tsx`: `createPortal(..., document.body)` with `fixed inset-0 z-[9999]`
4. **Browser History Collision**:
   - In `App.tsx` lines 124–130:
     ```typescript
     const handlePopState = () => {
       if (useModalStore.getState().modalStack.length > 0) {
         useModalStore.getState().closeModal();
         return;
       }
       ...
     ```
   - If a modal was opened via `useAppStore` boolean flags (e.g. `isKotowazaOpen = true`), `useModalStore.getState().modalStack.length` is 0. The browser back button triggers route changes instead of dismissing the modal, jarring the learner!

---

## 2. Logic Chain

1. **Premise (R2)**: The user requests consolidating FSRS spaced repetition flashcards and Kebun Nihongo into a single retention hub (Tab 2: Review).
2. **Observation**: Currently, `KebunPage.tsx` splits into `'vault'` and `'garden'`, and clicking the review button leaves the page entirely to go to `QuizPage.tsx`. When finished in `QuizPage.tsx`, water is added via `useGardenStore.getState().addWaterDrop(earnedDrops)`, but the user is stranded in `QuizResultView.tsx` and cannot water plants without navigating back to `KebunPage`.
3. **Inference**: By unifying the three core elements onto Tab 2:
   - **Top Card**: Current plant growth status, water drop stock (`💧 X Tetes Air`), and an immediate 1-tap `Siram Semua` button.
   - **Middle Card**: The primary review trigger card displaying due count (`X Kartu Jatuh Tempo`), estimated retrievability (`R%`), and a primary action button `"Mulai Ulas X Kartu Due"`.
   - **Embedded / Focused Session Execution**: Running the FSRS review session either within Tab 2 or via a dedicated focused view that immediately re-renders the retention hub upon completion, allowing the user to see newly earned water drops and immediately tap to water.
   - **Bottom Section**: Optional practice drills from `ARENA_MODES` (Pilihan Ganda, Partikel, Susun Kalimat, Listening, etc.) accessible directly below the primary review card.

4. **Premise (R3)**: The user requests eliminating floating modal stacking by creating a single, categorized tools and reference library page organized into 3 distinct clusters (Core Skills, Grammar & Culture Lab, Reference Library).
5. **Observation**: Currently, tools are scattered across `StudyToolboxModal.tsx`, `GlobalModalManager.tsx`, sub-studios of `MateriHubPage.tsx` (`kanji` and `buku`), and standalone routes (`ChoukaiSimulatorPage.tsx`), all mounting uncoordinated `z-[9999]` portals.
6. **Inference**: Tab 3 can be consolidated into a dedicated `DojoCatalogPage` (or Tab 3 view) featuring:
   - **Catalog Mode**: Categorized 3-cluster layout with high visual affordance.
   - **Sub-View / Focused Sheet Mode**: When any tool card is selected, the catalog switches to a focused sub-view (or full-height non-stacking view) rendering that tool, with a consistent sticky top bar containing an explicit `← Kembali ke Katalog Dojo` back button.
   - **No Portal Layering**: By rendering the selected tool directly in-place or within a managed container, `z-[9999]` modal portal battles and conflicting focus traps are completely eliminated.

7. **Premise (R6 & Test Contracts)**: All historical test suites across Sprints 1–44 must remain 100% green without modification.
8. **Observation**:
   - `tests/test-counter-module.js` and `test-keigo-module.js` assert that `StudyToolboxModal.tsx` includes `'counters'` and `'keigo'` and props `onOpenCounters`, `onOpenKeigo`.
   - `tests/test-pitch-accent-module.js` asserts that `StudyToolboxModal.tsx` has `'pitch'` and `onOpenPitch`.
   - `tests/test-sprint-11-motion.js` asserts that `KebunPage.tsx` imports and renders `<SkeletonGrid count={8} type="plant" />`.
   - `tests/test-sprint-12-features.js` asserts that `KebunPage.tsx` contains `startFSRSDueSession`.
   - `tests/test-sprint-36-gamification-hardening.js` asserts that `KebunPage.tsx` calls `fsrsForgettingCurve` and `checkDailyRefill()`.
   - `tests/test-sprint-17-bundle-optimization.js` asserts that `KebunPage` generates an isolated chunk.
9. **Inference**:
   - In Tab 2, `KebunPage.tsx` should be refactored into the unified retention hub in-place, keeping the exact function names (`startFSRSDueSession`, `checkDailyRefill`, `fsrsForgettingCurve`, `SkeletonGrid count={8} type="plant"`).
   - In Tab 3, the individual tool components (`KeigoTrainerModal.tsx`, `CounterTrainerModal.tsx`, `PitchAccentModal.tsx`, etc.) and `StudyToolboxModal.tsx` must remain present and exported, with the new Dojo Catalog leveraging them cleanly as sub-views while preserving legacy props.

---

## 3. Architectural Design Proposal

### 3.1 Tab 2 (Review: Dual-Card Review & Garden Retention Hub)
```
┌─────────────────────────────────────────────────────────────┐
│ TAB 2: REVIEW (Pusat Retensi & Brankas Memori)              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ CARD 1 (Top): Kebun Kata & 1-Tap Water Stock            │ │
│ │ 🌸 5 dari 8 Kanji Telah Mekar   💧 4 Tetes Air Tersedia │ │
│ │ [ Tombol: Siram Semua Tanaman (+20 XP) ]                │ │
│ │ (Horizontal shelf: mini plant chips with 1-tap water)   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ CARD 2 (Middle): Prioritas Review Harian FSRS v4        │ │
│ │ 🔬 92% Daya Ingat Terestimasi · 📬 14 Kartu Jatuh Tempo │ │
│ │ "Interval kritis tercapai hari ini. Ulas sekarang."     │ │
│ │ [ Tombol Utama: Mulai Ulas 14 Kartu Due → ]             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SECTION 3 (Bottom): Latihan Bebas & Evaluasi (Opsional) │ │
│ │ ┌───────────────────┐ ┌───────────────────┐             │ │
│ │ │ 🔘 Pilihan Ganda  │ │ ✍️ Isian Partikel │             │ │
│ │ └───────────────────┘ └───────────────────┘             │ │
│ │ ┌───────────────────┐ ┌───────────────────┐             │ │
│ │ │ 🧩 Susun Kalimat  │ │ 🎧 Audio Listening│             │ │
│ │ └───────────────────┘ └───────────────────┘             │ │
│ │ ┌───────────────────┐ ┌───────────────────┐             │ │
│ │ │ 🔄 Konjugasi      │ │ ⚠️ Catatan Evaluasi│            │ │
│ │ └───────────────────┘ └───────────────────┘             │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Tab 3 (Consolidated Dojo & Pustaka Catalog)
```
┌─────────────────────────────────────────────────────────────┐
│ TAB 3: DOJO & PUSTAKA (Katalog Alat & Pustaka Referensi)    │
├─────────────────────────────────────────────────────────────┤
│ Header: 🥋 Dojo Keterampilan & Laboratorium Bahasa          │
│ Subtitle: 11 alat interaktif dan referensi standar          │
├─────────────────────────────────────────────────────────────┤
│ CLUSTER 1: 🥋 Latihan Keterampilan (Core Skills)            │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ 漢 Kanji Dojo & Stroke  │ │ 🎧 Choukai CBT Simulator    │ │
│ │ 2.136 Kanji & Animasi   │ │ 38 Audio & Simulasi Ujian   │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ 🎵 Pitch Accent Studio  │ │ 🎯 Tes Penempatan (CAT)     │ │
│ │ Visualisasi Kontur Nada │ │ Diagnosa Level 10 Soal      │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ CLUSTER 2: 🔬 Laboratorium Bahasa & Budaya                  │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ 💼 Pelatih Keigo & Bisnis│ │ 🔢 Simulator Counter (助数詞)│
│ │ Sonkeigo, Kenjougo, Etiket│ │ Onbin & 12 Klasifikasi     │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ 🔄 Konjugasi Verba      │ │ ⚖️ Komparator Nuansa        │ │
│ │ 9 Bentuk & Deinflector  │ │ Pembeda Pola Mirip & Jebakan│ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📜 Galeri 376+ Peribahasa Tradisional (ことわざ)        │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ CLUSTER 3: 📚 Pustaka Referensi                             │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ 🔤 Bagan Kana Interaktif│ │ 📖 9 Buku Teks Standar      │ │
│ │ Hiragana/Katakana Audio │ │ Minna, Genki, Irodori, dll. │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Dedicated Sub-View / Sheet Mechanism for Tab 3:
- State inside Tab 3: `activeTool: 'kanji' | 'choukai' | 'pitch' | 'cat' | 'keigo' | 'counters' | 'conjugation' | 'nuance' | 'kotowaza' | 'kana' | 'books' | null`
- When `activeTool === null`: Renders the 3-cluster catalog grid.
- When `activeTool !== null`: Renders a full container with:
  ```tsx
  <div className="w-full min-h-screen">
    {/* Explicit Back Bar */}
    <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-theme px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => setActiveTool(null)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright text-xs font-bold transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Katalog Dojo</span>
      </button>
      <div className="text-xs font-extrabold text-appText-bright flex items-center gap-1.5">
        <span>{TOOL_METAS[activeTool].icon}</span>
        <span>{TOOL_METAS[activeTool].title}</span>
      </div>
      <div className="w-16" /> {/* Spacer */}
    </div>
    
    {/* Dedicated Tool Content Component */}
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {renderActiveToolComponent(activeTool)}
    </div>
  </div>
  ```
- **Zero Portal Stacking**: The component is rendered in place. No conflicting `document.body` portals, no backdrop pile-up, and browser `popstate` / Escape cleanly sets `activeTool = null`.

---

## 4. Caveats

1. **Test String Assertions on File Contents**:
   - Historical tests (`tests/test-sprint-11-motion.js`, `tests/test-sprint-12-features.js`, `tests/test-counter-module.js`, `tests/test-keigo-module.js`) perform literal string checks on `KebunPage.tsx`, `StudyToolboxModal.tsx`, and `App.tsx`.
   - Therefore, the implementer must NOT delete `KebunPage.tsx` or `StudyToolboxModal.tsx`. `KebunPage.tsx` must be upgraded to serve as Tab 2, and `StudyToolboxModal.tsx` must remain exported and intact.
2. **Tab 1 vs Tab 3 Books Separation**:
   - `BookTrackBrowser.tsx` is currently mapped under `materiStudio === 'buku'` in `MateriHubPage.tsx`. As R3 dictates moving standard textbooks into Tab 3 (Reference Library), `BookTrackBrowser` can be cleanly rendered under Tab 3's Reference Library sub-view, while keeping `materiStudio` backwards-compatible.
3. **Sound Effects & Web Audio Context**:
   - `MoraPacingCard.tsx` and `playWaterSfx()` rely on browser `AudioContext`. Sub-views must maintain safe fallback for environments where user interaction hasn't unlocked audio.

---

## 5. Conclusion

1. **Tab 2 Consolidation**:
   - Unifying plant growth status + water drops (Top Card), FSRS due review trigger (Middle Card), and 1-tap watering on the same screen solves the primary UX fragmentation where learners had to jump between `KebunPage` and `QuizPage`.
   - Optional drills from `QuizArenaHub.tsx` (`multiple-choice`, `fill-in`, `rearrange`, `listening`) fit naturally below the middle review card as secondary practice.
2. **Tab 3 Catalog Architecture**:
   - Consolidating the 11 scattered tools and reference libraries into 3 intuitive clusters (**Core Skills**, **Grammar & Culture Lab**, **Reference Library**) in a dedicated Tab 3 view permanently eradicates floating modal stacking, `z-[9999]` portal wars, and focus trap collisions.
   - Using in-place focused sub-views with a standardized `← Kembali ke Katalog Dojo` header guarantees a predictable, browser-history-friendly navigation flow.
3. **Non-Destructive Compliance (R6)**:
   - Keeping `useAppStore`, `useGardenStore`, `useModalStore`, `KebunPage.tsx`, and `StudyToolboxModal.tsx` signatures intact preserves 100% green status across all 44 sprint test suites and the master regression runner.

---

## 6. Verification Method

To verify these findings and validate future implementations:
1. **TypeScript Type Safety**:
   ```powershell
   cmd /c "cd /d c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo && npx tsc --noEmit"
   ```
   *Expected*: Code 0, zero compilation errors.
2. **Historical Sprints 1 to 44 Regression Runner**:
   ```powershell
   cmd /c "cd /d c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo && node tests/run-sprints-1-to-44.js"
   ```
   *Expected*: All 44 test suites exit with 100% green status.
3. **Master Regression Runner**:
   ```powershell
   cmd /c "cd /d c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo && node tests/run.js"
   ```
   *Expected*: 75,987+ assertions passed with 0 failures and 0 skips.
4. **Targeted Module Verification**:
   ```powershell
   cmd /c "cd /d c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo && node tests/test-keigo-module.js; node tests/test-counter-module.js; node tests/test-pitch-accent-module.js"
   ```
   *Expected*: All integration assertions for modals, stores, and tools pass.
5. **Responsive Layout Check**:
   ```powershell
   cmd /c "cd /d c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo && node tests/verify-frontend-responsive.js"
   ```
   *Expected*: 0px horizontal overflow across 375px, 390px, 768px, and 1440px viewports.
