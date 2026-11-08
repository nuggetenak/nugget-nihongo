---
name: frontend-specialist
description: "End-to-end full-stack front-end engineering playbook for Nugget Nihongo: UI design system, UX psychology, multi-device mobile ergonomics, Japanese typography, audio/motion, state management, and Supabase backend bridges."
---

# Full-Stack Front-End & UI/UX Engineering Playbook (Nugget Nihongo)

This playbook is the authoritative engineering specification for crafting, polishing, and verifying full-stack front-end experiences in Nugget Nihongo. It unites high-taste visual design, Indonesian learner psychology, mobile ergonomics, Japanese typography, local-first state, and Supabase backend bridges.

---

## 1. Design System & Anti-Slop Visual Hierarchy

### The "Teman Belajar" Japanese Lacquerware Aesthetic
Nugget Nihongo's visual identity balances warm Japanese lacquerware (*urushi* 漆) and gold leaf repair (*kintsugi* 金継ぎ) with modern digital craftsmanship. It is a supportive study companion (*teman belajar*), never an aggressive or stressful testing platform.

#### Dark Mode Palette (Default)
```css
--bg:        #0F1117; /* Deep charcoal obsidian background */
--surface:   #161922; /* Primary card / panel container */
--surface-2: #1E222D; /* Interactive card / inset surface */
--surface-3: #282D3C; /* Elevated hover / selected state */
--border:    rgba(255, 255, 255, 0.08);
--border-2:  rgba(255, 255, 255, 0.16);
--text:      #F8FAFC; /* High-contrast readable typography */
--muted:     rgba(241, 245, 249, 0.65); /* Explanatory secondary text */
--accent:    #F59E0B; /* Refined Warm Amber */
--accent-hot:#FBBF24; /* Radiant Gold for streaks and milestones */
```

#### Light Mode Palette (`html.light`)
```css
--bg:        #F4F6FA;
--surface:   #FFFFFF;
--surface-2: #EEF1F7;
--surface-3: #E2E6EF;
--border:    rgba(0, 0, 0, 0.08);
--text:      #1A2030;
--muted:     rgba(26, 32, 48, 0.55);
--accent:    #D97706;
```

#### JLPT Level Spectral Tokens
| Level | Color Class | Dim Background (12% Fill) | Border (28% Opacity) | Pedagogical Focus |
| :--- | :--- | :--- | :--- | :--- |
| **N5** | `text-purple-400` | `bg-purple-500/10` | `border-purple-500/30` | Foundations (Approachable) |
| **N4** | `text-rose-400` | `bg-rose-500/10` | `border-rose-500/30` | Elementary Social & Daily Life |
| **N3** | `text-sky-400` | `bg-sky-500/10` | `border-sky-500/30` | Intermediate Bridge & Workplace |
| **N2** | `text-emerald-400`| `bg-emerald-500/10` | `border-emerald-500/30`| Business & Professional Fluency |
| **N1** | `text-amber-400` | `bg-amber-500/10` | `border-amber-500/30` | Advanced Mastery & Native Nuance|

### Strict Anti-Slop Rules
1. **Zero Hardcoded Hex Codes**: Never write ad-hoc hex values (`bg-[#1a150f]`). Always use semantic Tailwind tokens (`bg-surface`, `bg-surface-2`, `text-appText`, `text-accent`, `border-border`).
2. **Tabular Numerals**: Every numeric counter subject to change (XP, streak days, timers, review count, water drops) MUST include `tabular-nums font-mono` to prevent jarring horizontal layout shifts.
3. **Dual Status Cues**: Never signal status using color alone. Pair color with an icon (`Check`, `AlertTriangle`, `X`, `Flame`) and explicit descriptive Indonesian copy.
4. **Complete Triad States**: Every view must gracefully handle:
   - **Loading State:** Shimmering skeleton screens matching the exact layout dimensions.
   - **Zero / Empty State:** Encouraging illustrated empty state with a direct call-to-action button.
   - **Error Recovery State:** Clear explanation of what happened with a non-destructive "Coba Lagi" retry button.

---

## 2. Indonesian Learner Psychology & UX Ergonomics

Grounded in the 736-citation Research Foundation (Markus & Kitayama 1991 face-concern research, Hofstede IDV=14 collectivism, and Lamb 2012 L2 motivation):

1. **Anti-*Malu* (Save-Face) Feedback**:
   - Error states must be informational, never evaluative or punitive.
   - Say *"Hampir tepat! Perhatikan partikel ini..."* rather than *"Salah!"* or *"Gagal"*.
   - Praise effort before correction.
2. **Zero Dark Patterns & No Streak Shaming**:
   - No hearts, no punitive energy depletion, and no aggressive streak countdowns.
   - The 36-hour streak freeze engine protects shift workers, gig workers, and students during intense exam or factory schedules.
3. **Bite-Sized Sessions ($\le 5$ Minutes)**:
   - Provide clear session boundaries with satisfying completion milestones ("Selesai untuk hari ini!").
4. **L1 Dialect Adaptability**:
   - Support learner substratum preferences (Bahasa Indonesia Umum, Logat Jawa, Logat Sunda, Logat Batak/Timur) in explanatory microcopy.

---

## 3. Universal Multi-Device Layout & Anti-Leakage Contracts

Every layout must be responsive across the entire device spectrum:
- **Ultra-Compact Mobile**: 320px – 375px (iPhone SE 1st/2nd/3rd gen, compact Androids)
- **Standard Modern Mobile**: 390px – 430px (iPhone 14/15/16, Galaxy S/A series, Xiaomi)
- **Tablet / Foldables**: 640px – 1024px (iPad mini, iPad, Surface, Galaxy Fold)
- **Desktop & Ultra-Wide**: 1024px – 1920px+ (Laptops, 4K monitors)

### Anti-Leakage Rules
1. **Flex & Grid Overflow Defenses**:
   - Every horizontal flex/grid item containing text must carry `min-w-0` to prevent long words or kanji compounds from forcing the container wider than the screen.
   - Root page containers must enforce `w-full max-w-full overflow-x-hidden`.
2. **Horizontal Segment & Filter Wrappers**:
   - Filter pills, level selectors, and category tabs must use:
     ```html
     <div class="flex items-center gap-2 overflow-x-auto scrollbar-none max-w-full px-4 py-2">
       <button class="shrink-0 whitespace-nowrap ...">...</button>
     </div>
     ```
3. **Safe Area & Floating Navigation Cushion**:
   - Mobile page wrappers must feature generous bottom padding:
     ```html
     <main class="w-full min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12">
     ```
   - Primary action buttons (e.g. "Lanjutkan Belajar") must never be hidden behind `BottomNav`.
4. **Mobile Input Sizing (Anti-Zoom)**:
   - Inputs and textareas must specify `text-base sm:text-sm` ($\ge 16$px on mobile) to suppress iOS Safari automatic zoom/pan jumps upon focus.
5. **Touch Targets**:
   - All interactive touch targets must measure at least $44\times 44$px (or padded bounds) with active tactile scale feedback:
     ```html
     <button class="min-h-[44px] min-w-[44px] px-4 py-2.5 active:scale-95 transition-transform ...">
     ```
6. **Mobile Sheet & Modal Adaptations**:
   - Modals render as bottom sheets on mobile and centered dialogs on desktop:
     ```html
     <div class="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 max-h-[90dvh] sm:max-h-[85vh] w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-y-auto overscroll-contain">
     ```

---

## 4. Japanese Typography & Educational UX

1. **Font Hierarchy**:
   - Latin UI: `DM Sans, system-ui, sans-serif`.
   - Japanese Glyphs: `BIZ UDGothic, "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif`.
   - Both fonts are self-hosted WOFF2 for instant offline readiness.
2. **Google BudouX Semantic Wrapping**:
   - Always wrap Japanese drill sentences and explanations with BudouX bunsetsu segmentation to eliminate unnatural line breaks:
     ```tsx
     import { loadDefaultJapaneseParser } from 'budoux';
     const parser = loadDefaultJapaneseParser();

     export function JapaneseText({ text, className = '' }: { text: string; className?: string }) {
       const chunks = parser.parse(text);
       return (
         <span className={`inline-block leading-relaxed break-keep ${className}`}>
           {chunks.map((chunk, i) => (
             <span key={i} className="inline-block">{chunk}</span>
           ))}
         </span>
       );
     }
     ```
3. **Stable Furigana Alignment**:
   - Ensure `<ruby>` and `<rt>` tags specify `line-height: normal` and do not cause parent card heights to jitter during toggle interactions.
4. **Stroke Order & Pitch-Accent Integration**:
   - Integrate KanjiVG stroke order SVG paths with step-by-step stroke animation.
   - Render pitch accent contour lines and mora boundary chips accurately based on OJAD data.

---

## 5. Micro-Interactions, Animation & Procedural Audio

1. **GPU Compositor-Friendly Transitions**:
   - Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
   - Avoid `transition: all`. Specify explicit transitions: `transition-colors duration-150`, `transition-transform duration-200`.
   - Always respect reduced motion: `motion-reduce:animate-none motion-reduce:transition-none`.
2. **Procedural Audio Hooks (ZzFX)**:
   - Provide zero-latency, zero-asset WebAudio sound effects:
     ```ts
     import { zzfx } from './utils/zzfx';

     export const soundEffects = {
       correctDing: () => zzfx(...[1.1,,330,.03,.1,.2,1,1.4,,-2,300,.04,,,,,,.8,.02]),
       streakMilestone: () => zzfx(...[1.5,,520,.05,.2,.3,1,1.8,,15,100,.08,,,,,,.9,.05]),
       waterDrop: () => zzfx(...[0.8,,880,.02,.05,.1,2,1.2,-5,10,,,.01,,,,.7,.01]),
       cardFlip: () => zzfx(...[0.4,,180,.01,.02,.05,3,0.5,,-1,,,,,,,.5,.02]),
     };
     ```
3. **Listening Drills (asbplayer & Kokoro TTS)**:
   - Implement sentence-aligned audio playback with condensed listening controls (0.75x, 1.0x, 1.25x), auto-pause after each phrase, and waveform visualization.

---

## 6. Client State & Local-First Resilience (TinyBase + Zustand)

Nugget Nihongo is local-first: full offline functionality is guaranteed.

```ts
import { createStore } from 'tinybase';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';

// Unified local-first persistence
export async function initializeLocalState() {
  const store = createStore();
  const persister = createIndexedDbPersister(store, 'nugget_nihongo_v19');
  await persister.startAutoLoad();
  await persister.startAutoSave();
  return { store, persister };
}
```

- **Zustand Store Harmony**:
  - `useAppStore`: Active tab, active theme, audio settings, modal state.
  - `useCurriculumStore`: Active track (JLPT N5–N1, SSW 19 sectors), lesson progress, Can-Do mastery.
  - `useGardenStore`: Plant growth stages, water drops inventory, watering history.
  - `useAuthStore`: Supabase session, offline user profile, sync status.

---

## 7. Full-Stack Bridges (Touching the Backend)

When front-end features require backend adjustments, the engineer acts autonomously across:

### 1. Supabase Client & Realtime Sync
```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
```

### 2. Idempotent Schema Migrations (`supabase/migrations/`)
Always craft additive, non-breaking SQL migrations:
```sql
-- Example: Adding dialect preference to user profile
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS dialect_preference text DEFAULT 'id_standard';

-- Row Level Security (RLS) enforcement
CREATE POLICY "Users can update their own dialect"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

### 3. Edge Functions (Deno / TypeScript)
When authoring or updating Supabase Edge Functions (`supabase/functions/`):
- Include proper CORS headers (`access-control-allow-origin: *`).
- Verify Bearer token authorization using `supabase.auth.getUser(token)`.
- Return clean JSON payloads with standard error schema: `{ error: string, code: number }`.

---

## 8. Performance, Bundle Budgets & Verification Checklist

Before declaring any front-end feature, view, or overhaul complete, execute this checklist:

1. **Production Bundle Budget ($\le 500\text{ kB}$)**:
   - Run `npm run build:vite` or `npm run build`.
   - Ensure vendor chunks (React, Lucide, BudouX, TinyBase) are cleanly split in `vite.config.ts`.
   - No single generated JavaScript chunk may exceed $500\text{ kB}$.
2. **Cumulative Regression Test Suite**:
   - Execute `npm run test` (or targeted Vitest suites).
   - Ensure historical Sprint 1–44 test contracts remain 100% green. Never disable existing tests.
3. **Viewport Inspection**:
   - Inspect the component across 375px (iPhone SE), 390px (Mobile), 768px (Tablet), and 1280px (Desktop).
   - Verify zero horizontal scrollbars on `<body>` or page wrappers.
4. **Theme Audit**:
   - Toggle between Dark Obsidian and Light Mode. Check contrast and ensure zero unmapped color tokens.
5. **Accessibility Verification**:
   - Verify keyboard navigation via Tab key with visible `:focus-visible` rings.
   - Ensure all icon-only buttons carry descriptive `aria-label` attributes.

---

## 9. External Community Portals & Anti-Hallucination Standards

When designing community gateways, social channels, or peer study portals:

1. **Anti-Hallucination on External Links**:
   - Never assume or extrapolate live status for uncreated accounts, Discord servers, or Telegram groups.
   - Any platform not explicitly declared active and ready by the user must be displayed with a `(Segera Hadir)` tag, or hidden from clickable navigation to prevent broken external links.
2. **Accurate Linguistic Framing**:
   - Nugget Nihongo operates on an **External Community Hub** model.
   - Never use "Community" to describe purely algorithmic or client-side features. Use **"Tantangan Kanji Harian"** / **"Kanji Hari Ini"**, never "Daily Community Kanji".
   - The share button broadcasts externally ("Bagikan ke Media Sosial / 𝕏").
3. **Creator Micro-Donations**:
   - Present Trakteer (`https://trakteer.id/nugget-nihongo`) authentically as community support for server bills and open education ("Traktir Kopi Sensei").
