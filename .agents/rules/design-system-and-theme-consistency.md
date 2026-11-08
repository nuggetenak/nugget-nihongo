# Universal Design System & Theme Consistency Rule

Every component, modal, page, and layout in Nugget Nihongo MUST adhere strictly to the centralized semantic design tokens. No ad-hoc or unmapped color classes are permitted.

## 1. Strict Semantic Token Invariant
- **Never use hardcoded hex values** for surfaces or text (e.g. `bg-[#1A150F]`, `text-[#000]`).
- **Use only standardized Tailwind theme classes**:
  - Backgrounds: `bg-bg`, `bg-surface`, `bg-surface-2`, `bg-surface-3`, `bg-surface-4`
  - Text: `text-appText`, `text-appText-bright`, `text-appText-muted`, `text-appText-dim`
  - Accents: `bg-accent`, `text-accent`, `text-accent-hot`, `border-accent/20`, `border-accent/40`
  - Borders: `border-accent/15`, `border-accent/25`, `border-border`
- All modal overlays, toasts, and floating cards MUST respect `html.dark` and `html.light` CSS variable mapping.

## 2. Dark Theme Palette Elevation
- Dark mode must avoid muddy yellowish-brown sludge (`#0D0B08`).
- Dark mode surfaces must use a refined, eye-friendly charcoal obsidian palette:
  - Base: `#0F1117` (Deep Charcoal)
  - Surface: `#161922` (Elevated Card)
  - Surface-2: `#1E222D` (Interactive Card / Inset)
  - Surface-3: `#282D3C` (Hover / Selected)
  - Text Bright: `#F8FAFC` (High legibility)
  - Text Muted: `rgba(241, 245, 249, 0.65)`
  - Accent: `#F59E0B` (Refined Warm Amber)

## 3. Header & Navigation De-Cluttering
- The top header must never exceed 3 primary functional groups:
  1. Left: Mobile menu toggle or brand
  2. Center: Search bar with guaranteed minimum width (`min-w-[180px] sm:min-w-[280px] md:min-w-[320px]`)
  3. Right: Consolidated profile/toolbox cluster. Secondary actions (streak, XP, shortcuts) must collapse cleanly on medium screens (`< 1280px`).

## 4. Stale State Audit Requirement
- Never leave "Soon", "Beta", or placeholder badges on features that have been deployed.
- Any new component or page must be visually audited in BOTH light and dark mode before declaring completion.

## 5. Button Typography, WCAG Contrast & Anti-Overflow Invariants
1. **Solid Primary Action Contrast**:
   - On solid amber/gold buttons (`bg-amber-500`, `bg-amber-400`, `bg-gradient-to-r from-amber-500...`): **Always** pair with `text-stone-950 font-black` or `font-extrabold`. **NEVER** use white text (`text-white`) on yellow/amber surfaces as it critically fails WCAG contrast ratios.
2. **Ghost, Outlined & Surface Button Contrast**:
   - On `bg-surface-2` or `bg-surface-3`, always use `text-appText-bright` or theme accent (`text-amber-400 font-bold`). Never use low-contrast muted gray (`text-stone-400`, `text-zinc-500`) for clickable button labels.
3. **Anti-Overflow & Safe Truncation**:
   - Buttons must never specify rigid fixed widths (`w-24`, `w-32`) with dynamic or translated labels.
   - For horizontal button arrays, enforce `min-w-0 flex-1 truncate` or responsive shorthand variants (`<span className="hidden sm:inline">...</span>`).
   - In vertical or stacked layouts, permit natural text wrapping: `leading-snug text-center py-2.5 px-3 min-h-[44px]`.
4. **4R Review Cycle**:
   - Apply **Review, Rethink, Revise, Refine** to verify every button, badge, and interactive chip across light/dark themes and 320px–390px mobile viewports.

## 6. The 3 Clean Doors LMS Architecture
- In accordance with `DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md`, eradicate "Arcade Syndrome" (scattering 10+ disconnected mini-games across a single dashboard).
- Consolidate all exercises into **The 3 Clean Doors**:
  1. **Pintu 1**: Pusat Ujian JLPT (N5 – N1 Modular Sets & Mogi Shiken)
  2. **Pintu 2**: Pusat Ujian Tokutei Ginou (SSW 6 Sektor Vokasional & JFT-Basic A2)
  3. **Pintu 3**: Latihan Cepat & Review Harian (FSRS Review, Bank Soal Salah, Dynamic Rapid Drill, CAT Placement)

