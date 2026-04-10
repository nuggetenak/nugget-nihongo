# "Teman Belajar" Design System — Nugget Nihongo
**Version:** v15.6.0 · 8 April 2026  
**Research basis:** 736-citation Research Foundation + Curriculum Blueprint v1

---

## 1. Design Philosophy

Nugget Nihongo is a **teman belajar** (study companion) — warm, encouraging,
privacy-first, and clean. This is NOT a "war room" or gamified competition
platform. Every design decision is grounded in the research foundation.

**Core identity:** A free, clean, Japanese-inspired learning environment that
feels like studying with a supportive friend — not a strict teacher, not a game.

### Research grounding

| Principle | Research basis | Implication |
|-----------|--------------|-------------|
| Privacy-first, no social pressure | Malu/face-concern (Markus & Kitayama 1991), Hofstede IDV=14 for Indonesia | No public leaderboards, no comparative rankings, anonymous error review |
| Mobile-first | APJII 2023: 95.4% smartphone access in Indonesia | Touch-optimized, all targets ≥44px, safe-area padding |
| Offline-first | GSMA 2023: variable connectivity across Indonesian archipelago | Full functionality without network; sync is optional enhancement |
| Short sessions | App Annie 2022: 5.5hr/day mobile usage competing for attention | Bite-sized content, clear session endpoints, quick-win feedback |
| Encouraging feedback | Malu research: error feedback must be informational, never evaluative | "Hampir benar!" not "Salah!"; praise effort before correction |
| Relatable scenarios | Lamb 2012: vivid Indonesian L2 use scenarios drive motivation | "Pesan ramen di Jepang", "Nonton anime tanpa subtitle" |
| No dark patterns | Luo 2023: gamification tied to learning outcomes, not engagement | No hearts, no gem scarcity, no streak-shaming |

---

## 2. Design Principles

1. **Informational, never evaluative** — Error states say "Coba lagi" not "Gagal". Quiz feedback explains why, doesn't judge.
2. **Progress visibility without comparison** — Show personal growth (XP, streaks, JLPT rings) but never rank against others.
3. **Short-session optimized** — Every interaction completable in <5 minutes. Clear "done for today" signals.
4. **Clean Japanese aesthetic** — Minimal, intentional use of space. Japanese typography respected with proper font stack.
5. **Inclusive by default** — Works on low-end Android (2GB RAM), slow connections (3G), small screens (360px).

---

## 3. Color Tokens

### Dark mode (default)
```css
--bg:        #141920      /* Base background */
--surface:   #1C2230      /* Card/panel background */
--surface-2: #242C3A      /* Elevated surface */
--surface-3: #2E3648      /* Highest elevation */
--border:    rgba(255,255,255,0.09)
--border-2:  rgba(255,255,255,0.16)
--text:      #EFF3F8      /* Primary text */
--muted:     rgba(239,243,248,0.52)  /* Secondary text */
--accent:    #3B82C4      /* Primary action */
--gold:      #FBBF24      /* Achievement/streak */
```

### Light mode (`body.light`)
```css
--bg:        #F4F6FA
--surface:   #FFFFFF
--surface-2: #EEF1F7
--surface-3: #E2E6EF
--text:      #1A2030
--muted:     rgba(26,32,48,0.48)
```

### JLPT level colors
```css
--n5: #A78BFA (purple)    /* Beginner — approachable */
--n4: #F87171 (red)       /* Elementary */
--n3: #60A5FA (blue)      /* Intermediate */
--n2: #34D399 (green)     /* Upper intermediate */
--n1: #FBBF24 (gold)      /* Advanced — achievement */
```

Each level has `-dim` (12% opacity fill) and `-border` (28% opacity border) variants for cards and badges.

### Status feedback
```css
--success-dim:  rgba(52,211,153,0.15)   --success-text: #34D399
--error-dim:    rgba(248,113,113,0.15)   --error-text:   #F87171
```

### Brand gradient
```css
--grad: linear-gradient(135deg, #2D6A4F 25%, #3B82C4 100%)
```

---

## 4. Typography

| Role | Font | Weight | Size token |
|------|------|--------|-----------|
| UI text (Latin) | DM Sans | 400–700 | `--text-base` (0.875rem) |
| Japanese text | BIZ UDGothic | 400 | `--font-jp` |
| Small labels | DM Sans | 400 | `--text-xs` (0.68rem) |
| Section headers | DM Sans | 600 | `--text-md` (0.95rem) |

Both fonts are self-hosted as subsetted WOFF2 for offline reliability.

**Scale:** `--text-xs` (0.68rem) → `--text-sm` (0.78rem) → `--text-base` (0.875rem) → `--text-md` (0.95rem)

---

## 5. Component Patterns

### Cards
- Background: `var(--surface)`, border: `var(--border)`, border-radius: 14px
- JLPT-colored left border or dim background by level
- Tap target: entire card is tappable on mobile

### Buttons
- Primary: gradient background (`var(--grad)`), white text, 12px padding, 10px radius
- Secondary: `var(--surface-2)` background, `var(--text)` text
- Disabled: 40% opacity, no pointer events
- All buttons ≥44px touch target

### Input fields
- Background: `var(--input-bg)`, border: `var(--border)`, 10px radius
- Focus: `var(--accent)` border glow
- Placeholder: `var(--muted)` color

### Quiz feedback
- Correct: green dim background, encouraging message ("Benar! Hebat!")
- Incorrect: warm correction ("Hampir! Yang benar adalah..."), explain why
- Never use red backgrounds for wrong answers — use neutral surface with informational text

### AI chat bubbles
- User: right-aligned, accent-tinted background
- Bot: left-aligned, surface background
- Error/retry: regular bot bubble with friendly text + "Coba lagi →" link (not red error banner)

---

## 6. Mobile-First Rules

1. **All interactive targets ≥ 44px** — per Apple HIG and Material guidelines
2. **Safe-area padding** — `env(safe-area-inset-top)` for notched devices
3. **No hover-dependent interactions** — all hover states are visual enhancements only
4. **Viewport meta** — `width=device-width, initial-scale=1, viewport-fit=cover`
5. **Max content width** — 480px centered for readability on tablets
6. **Touch-friendly spacing** — 12px minimum gap between tappable elements
7. **Font minimum** — 14px (0.875rem) base, never below 11px (0.68rem) for labels

---

## 7. Accessibility Baseline

Per Gap 12 in the Blueprint (Accessibility audit):

1. **Color contrast** — WCAG AA minimum (4.5:1 for text, 3:1 for large text). Current dark theme verified.
2. **Focus indicators** — Visible focus rings on all interactive elements (keyboard navigation)
3. **Semantic HTML** — Proper heading hierarchy, `<button>` for actions, `<a>` for navigation
4. **Screen reader support** — `aria-label` on icon-only buttons, `role` attributes on dynamic content
5. **Reduced motion** — Respect `prefers-reduced-motion: reduce` for animations
6. **Language attributes** — `lang="id"` on document, `lang="ja"` on Japanese text spans

---

## 8. Tone & Voice (UI Copy)

| Context | Tone | Example |
|---------|------|---------|
| Success | Encouraging, warm | "Hebat! Kamu sudah review 10 kartu hari ini!" |
| Error/wrong answer | Informational, supportive | "Hampir! Yang benar adalah ～ために. Coba lagi?" |
| Empty state | Inviting, motivational | "Belum ada kartu di sini. Mulai belajar yuk!" |
| Quota/limit | Matter-of-fact, hopeful | "15 pertanyaan gratis sudah terpakai. Besok bisa tanya lagi!" |
| Achievement | Celebratory, personal | "Streak 7 hari! Konsistensi kamu luar biasa!" |
| Loading/waiting | Casual, patient | "Sensei Nugget sedang berpikir..." |

**Never use:**
- "Gagal" (failed) — use "Hmm, coba lagi" or "Belum tepat"
- "Salah" (wrong) alone — always pair with the correct answer
- Comparative language ("lebih baik dari pengguna lain")
- Pressure language ("Kamu akan kehilangan streak!")

---

*This design system is a living document. All additions must cite research basis from the 736-citation foundation.*
