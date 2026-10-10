---
name: multi-device-responsive
description: Universal Multi-Device Responsive Design & Viewport Anti-Leak Rule for Nugget Nihongo
trigger: always_on
---

# Universal Multi-Device Responsive Design Rule

Every component, page, layout, modal, and interactive widget in Nugget Nihongo MUST be designed and verified to work seamlessly across all screen sizes and form factors:
- **Ultra-Compact / Small Mobile**: 320px – 375px (iPhone SE, small Androids)
- **Standard Modern Mobile**: 390px – 430px (iPhone 13/14/15/16, Galaxy S-series)
- **Tablet / Phablet**: 640px – 1024px (iPad mini, iPad, Surface, foldables)
- **Desktop & Wide Displays**: 1024px – 1920px+ (MacBook, PC monitors)

## Anti-Leakage & Viewport Constraints
1. **No Fixed Pixel Viewport Blowouts**:
   - Never use rigid fixed widths (`w-[...]`, `min-w-[...]`) in horizontal flex/grid parents without `min-w-0` or responsive prefixes (`flex-1 min-w-0 sm:min-w-[140px]`).
   - Containers must maintain `w-full max-w-full overflow-x-hidden` on page wrappers.
2. **Horizontal Overflow Wrapping & Scrolling**:
   - Filter pills, level selectors, and segmented track switchers MUST use `overflow-x-auto scrollbar-none max-w-full` with `whitespace-nowrap shrink-0` and compact labels on mobile.
3. **Safe Area & Floating Navigation Cushion**:
   - Mobile content containers MUST maintain adequate bottom padding: `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12` so content and buttons are never obscured by `BottomNav`.
4. **Touch Target Dimensions**:
   - All interactive touch targets (buttons, pills, modal triggers, kana cells) must be at least 40px × 40px (or padded comfortably) with active scale feedback (`active:scale-95`).
5. **Modal Adaptations**:
   - Modals must render as bottom sheets or centered cards capped at `max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto` with drag handles on mobile.
6. **Japanese Typography Safeguards**:
   - Long kanji compounds, furigana readings, and example sentences must employ `break-words`, `min-w-0`, or `truncate` to prevent pushing out card widths.
