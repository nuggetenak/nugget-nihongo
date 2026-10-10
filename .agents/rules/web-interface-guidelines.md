# Web Interface & Anti-Slop Design Guidelines Rule

Every page, layout, modal, card, and interactive widget in Nugget Nihongo MUST adhere to these high-taste web interface standards (synthesized from Vercel Web Interface Guidelines and Taste Skill anti-slop principles):

## 1. Interaction & Accessibility Invariants
1. **Clear Focus Rings**:
   - Every focusable element must have a visible, unobscured focus ring using `:focus-visible` (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg`).
   - Sticky headers, floating navigation bars (`BottomNav`), and modal backdrops must never obscure the focused element.
2. **Mobile Input Sizing (Anti-Zoom)**:
   - All `<input>` and `<textarea>` elements must have a font size $\ge 16$px on mobile (`text-base sm:text-sm`) to prevent iOS Safari auto-zoom/pan shifts upon focus.
3. **Touch Targets & Manipulation**:
   - All mobile touch targets must be at least 44px × 44px (or comfortably padded).
   - Set `touch-action: manipulation` on buttons and interactive chips to suppress double-tap zoom delays.
   - Provide tactile pressed feedback with `active:scale-95` or `active:scale-[0.98]`.
4. **Forgiving Interactions & No Dead Zones**:
   - If an element appears interactive, the entire bounding card or row must be interactive.
   - Destructive actions (e.g. data reset, card deletion) must always provide a confirmation guard dialog or an undo mechanism.
   - Modals and drawers must lock body scrolling and set `overscroll-behavior: contain`.

## 2. Animation & Motion Invariants
1. **Compositor-Friendly Only**:
   - Animate only GPU-accelerated properties (`opacity`, `transform`). Never animate properties that trigger layout reflow (`width`, `height`, `top`, `left`, `margin`, `padding`).
   - **Never use `transition: all`**: Explicitly specify the properties being transitioned (e.g., `transition-colors`, `transition-transform`, `transition-opacity`).
2. **Respect `prefers-reduced-motion`**:
   - All animations must gracefully degrade when the user requests reduced motion (`motion-reduce:animate-none motion-reduce:transition-none`).
3. **Interruptible & Purposeful**:
   - Micro-interactions must clarify cause and effect (e.g., card flip, token insertion, plant watering ripple) without delaying the user flow.

## 3. Anti-Slop Visual Hierarchy & Aesthetics
1. **No Generic AI Boilerplate**:
   - Avoid generic, flat grayish cards with uniform padding and generic rounded corners.
   - Maintain the warm Japanese lacquerware (*urushi* 漆) and gold leaf (*kintsugi* 金継ぎ) identity:
     - Dark background: `#0D0B08` (`bg`)
     - Layered surfaces: `#181410` (`surface`), `#221C16` (`surface-2`), `#2E251E` (`surface-3`)
     - Amber accents: `#F59E0B` (`accent`), `#FBBF24` (`accent-hot`) with warm golden glows (`shadow-glow`).
2. **Redundant Status Cues**:
   - Never communicate status through color alone. Always pair color with an icon (e.g., `Check`, `AlertTriangle`, `X`, `Flame`) and explicit descriptive text.
3. **Tabular Numerals**:
   - All numbers subject to comparison, counting, or real-time updates (XP points, streaks, timers, review card counts, water drops) must use tabular numbers (`tabular-nums font-mono`).
4. **All States Designed**:
   - Always design and implement empty states (empty search results, no cards due, garden without plants), loading states, and error states with clear recovery actions.
