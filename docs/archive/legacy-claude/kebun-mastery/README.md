# Kebun Mastery — Design Draft v0.1

Status: **DRAFT — not wired into app yet**

## Files
- `kebun-mastery.js` → `public/js/kebun-mastery.js` ✅ written
- `kebun-snippet.html` → paste into `statsPage` in `index.html`
- `kebun-styles.css` → append to `public/styles/app.css` §30

## Wire-up checklist
- [ ] Add `<script src="./js/kebun-mastery.js"></script>` to `index.html` (after `detail.js`)
- [ ] Add `'./js/kebun-mastery.js'` to SW ASSETS in `sw.js`
- [ ] Paste `kebun-snippet.html` into `statsPage` (before `weakPointsSection`)
- [ ] Append `kebun-styles.css` to `app.css`
- [ ] Call `window.initKebunMastery()` from `_analyticsOnTabShow` in `analytics.js`
- [ ] Test: empty state, single level, all levels, tap → detail

## Visual concept
Grid of plant icons (24×24 SVG) where each plant = one grammar/vocab card.
State = SRS state from FSRS:
  🌱 unseen   → seed dot (muted)
  🌿 learning → sprout (amber)
  🌻 young    → flower (orange)
  🌳 mature   → tree (green)
  🥀 lapsing  → wilting (red, lapses > 0 and low stability)

Tap any plant → opens detail modal for that card.
Filter by N-level via tab pills at top.
Toggle Grammar / Vocab.
Stats bar shows: seen / mature / due today / total.
