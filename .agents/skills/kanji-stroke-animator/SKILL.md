---
name: kanji-stroke-animator
description: "Interactive Kanji stroke order visualization, SVG path animation, and touch-drawing validation using KanjiVG XML data and animCJK."
---

# Kanji Stroke Animator Skill (KanjiVG + animCJK)

This skill provides guides and code patterns for turning raw KanjiVG SVG/XML vector files (located in `open-source-datasets/kanjivg/kanji/`) into interactive, animated stroke-order diagrams and mobile touch-writing canvases.

## 1. KanjiVG Data Structure
Each Kanji file is named by its hexadecimal unicode (e.g., `065e5.svg` for 日, `0672c.svg` for 本):
- `<g id="kvg:StrokePaths_...">`: Contains `<path id="kvg:...-s1" d="..."/>` representing each stroke in strict sequential order.
- `<g id="kvg:StrokeNumbers_...">`: Contains text coordinates indicating where each stroke number bubble should appear.

## 2. Animated Stroke Rendering (CSS Dasharray Trick)

To animate strokes sequentially in pure SVG/CSS or React without heavy libraries:

```ts
// Calculate path length dynamically to create the drawing effect
export function createStrokeAnimation(pathElement: SVGPathElement, delayMs: number) {
  const length = pathElement.getTotalLength();
  pathElement.style.strokeDasharray = `${length}`;
  pathElement.style.strokeDashoffset = `${length}`;
  pathElement.style.animation = `drawStroke 0.6s ease-in-out ${delayMs}ms forwards`;
}
```

CSS keyframe definition:
```css
@keyframes drawStroke {
  to {
    strokeDashoffset: 0;
  }
}
```

## 3. Interactive Touch Drawing & Stroke Validation

When the student draws on mobile:
1. Capture touch/pointer coordinates via PointerEvents (`pointerdown`, `pointermove`, `pointerup`).
2. Compare the user's gesture points against the target stroke path using Fréchet distance or angle direction check.
3. If correct, color stroke gold (`#F59E0B`), trigger tactile scale vibration, and advance to the next stroke.
4. If wrong, flash subtle red (`#EF4444`) and show directional guide arrow.
