# DESIGN.md — Nugget Nihongo Design System Specification

This document defines the visual design system, aesthetic standards, tokens, and component contracts for **Nugget Nihongo** (ナゲット日本語), formatted in accordance with the Google Stitch `DESIGN.md` specification standard.

---

## 1. Design Philosophy & Aesthetic Pillars

### The Aesthetic: *Kintsugi* & *Urushi* (金継ぎと漆)
Nugget Nihongo rejects generic, cold, clinical software templates. Instead, it draws inspiration from Japanese craftsmanship:
- **Urushi (漆 - Deep Lacquerware)**: Deep, warm charcoal surfaces (`#0D0B08`, `#181410`) provide high-contrast, eye-comforting dark mode immersion for late-night study sessions.
- **Kintsugi (金継ぎ - Golden Repair)**: Warm amber gold leaf accents (`#F59E0B`, `#FBBF24`) celebrate the process of learning from mistakes. Every incorrect quiz answer is seen not as a failure, but as a crack being mended with golden knowledge.
- **Wabi-Sabi & Zen Garden**: Natural moss emeralds (`#10B981`), clear spring cyan (`#06B6D4`), and tatami sumi-e accents ground the gamification garden (*Kebun Kata*).

### Anti-Slop Principles
- **No Boilerplate Slop**: Every card has deliberate surface layering (`surface` on `bg`, `surface-2` on `surface`), optical alignment, and subtle amber border glows (`border-accent/20`).
- **Tactile Feedback**: Every interactive target responds with scale dampening (`active:scale-95`), smooth transitions, and distinct `:focus-visible` rings.
- **Zero Content Distortion**: Furigana, romaji, and kanji are strictly preserved with anti-overflow protections (`break-words`, `min-w-0`).

---

## 2. Color Palette & Semantic Tokens

| Token Name | Hex Value | Tailwind Class | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Background** | `#0D0B08` | `bg-bg` | Main application backdrop |
| **Surface 1** | `#181410` | `bg-surface` | Primary cards, sidebars, header |
| **Surface 2** | `#221C16` | `bg-surface-2` | Interactive sub-cards, option tiles |
| **Surface 3** | `#2E251E` | `bg-surface-3` | Active selections, highlighted items |
| **Accent Gold** | `#F59E0B` | `text-accent`, `bg-accent` | Primary brand actions, badges, borders |
| **Accent Radiant**| `#FBBF24` | `text-accent-hot` | Golden glow, streak multipliers, XP |
| **Text Bright** | `#FAF7F2` | `text-appText-bright` | High-contrast headings, Kanji glyphs |
| **Text Primary** | `#E5E0D8` | `text-appText` | Standard body copy and sentence translations |
| **Text Muted** | `#9E9689` | `text-appText-muted` | Sub-labels, romaji readings, secondary metadata |
| **Emerald Zen** | `#10B981` | `text-emerald-400` | Kebun growth, correct answers, mastery |
| **Water Spring** | `#06B6D4` | `text-cyan-400` | Water inventory drops, daily refresh |
| **Flame Orange** | `#F97316` | `text-orange-400` | Continuous study streak, active drills |
| **Error / Alert**| `#EF4444` | `text-red-400` | Mistake notebook, forgotten flashcards |
| **Sensei Violet**| `#A855F7` | `text-purple-400` | AI Tutor, conjugation engine |

---

## 3. Typography & Hierarchy

### Font Families
- **Japanese Typography**: `Zen Maru Gothic`, `Noto Sans JP`, `Hiragino Sans`, sans-serif (`font-jp`).
- **UI / Latin Typography**: `Inter`, `Plus Jakarta Sans`, system-ui, sans-serif (`font-ui`).
- **Tabular & Numerals**: `JetBrains Mono`, `Geist Mono`, `ui-monospace`, monospace (`font-mono tabular-nums`).

### Type Scales
- **Kanji Hero Focus**: `text-4xl sm:text-5xl md:text-6xl font-jp font-bold`
- **Section Headings**: `text-xl sm:text-2xl font-extrabold tracking-tight`
- **Card Titles**: `text-sm sm:text-base font-bold text-appText-bright`
- **Reading Badges**: `text-xs font-mono font-medium text-amber-400`
- **Body & Explanations**: `text-xs sm:text-sm leading-relaxed text-appText`
- **Sub-captions & Micro-metadata**: `text-[10px] sm:text-[11px] font-semibold text-appText-muted`

---

## 4. Spacing, Elevation & Radii

- **Corner Radii**:
  - Compact chips & buttons: `rounded-xl` (12px)
  - Standard cards & dialog panels: `rounded-2xl` (16px)
  - Hero banners & modal bottom sheets: `rounded-3xl` (24px)
  - Pill tags: `rounded-full`
- **Shadows**:
  - Subtle card depth: `shadow-sm`
  - Floating dialogs: `shadow-2xl`
  - Golden Amber Accent Glow: `shadow-glow` (`box-shadow: 0 0 25px -5px rgba(245, 158, 11, 0.25)`)
- **Safe Area Insets**:
  - Mobile bottom padding: `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`
  - Desktop sidebar offset: `lg:pl-[260px]`

---

## 5. Component State Contracts

### Buttons
- **Idle**: `bg-accent text-bg font-extrabold rounded-xl px-4 py-2.5 transition-all shadow-glow`
- **Hover**: `hover:bg-accent-hot hover:-translate-y-0.5`
- **Active / Pressed**: `active:scale-95`
- **Focus**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg`
- **Disabled**: `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`

### Options in Quiz
- **Idle**: `bg-surface-2 border border-accent/20 hover:border-accent/40 text-appText-bright`
- **Selected Correct**: `bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold`
- **Selected Incorrect**: `bg-red-950/50 border-red-500 text-red-300 font-bold`
- **Faded Distractor**: `bg-surface-2/40 border-transparent text-appText-muted opacity-50`

### Modals & Bottom Sheets
- **Backdrop**: `fixed inset-0 bg-black/85 backdrop-blur-md z-50`
- **Mobile Container**: Bottom-anchored sheet capped at `max-h-[92dvh] overflow-y-auto w-full` with pull drag indicator (`w-10 h-1 rounded-full bg-accent/30 mx-auto`).
- **Desktop Container**: Centered dialog `sm:max-w-2xl lg:max-w-4xl rounded-3xl border border-accent/30`.

---

## 6. Accessibility & Multi-Device Checklist

- [x] All touch targets are $\ge 44 \times 44$px on mobile.
- [x] Input elements use `text-base` ($\ge 16$px) on mobile to prevent iOS Safari auto-zoom.
- [x] Horizontal scroll pill bars use `overflow-x-auto scrollbar-none max-w-full whitespace-nowrap`.
- [x] Tabular numbers (`tabular-nums font-mono`) applied to all live stats, scores, and streak days.
- [x] Redundant status cues implemented: never relying on color alone.
- [x] Tested across 320px (iPhone SE), 390px (iPhone 14/15/16), 768px (iPad), and 1440px+ (Desktop).
