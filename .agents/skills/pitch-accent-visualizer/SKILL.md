---
name: pitch-accent-visualizer
description: "Japanese pitch accent contour visualizer and mora tile mapper using OJAD and Wadoku pitch data."
---

# Japanese Pitch Accent Visualizer Skill (OJAD / Wadoku)

This skill provides guides for rendering pitch accent contours (high/low tone lines) across Japanese words and sentences. It helps learners distinguish between homophones (e.g. 雨/ame *rain* vs 飴/ame *candy*) and develop natural, native Japanese prosody.

## 1. Pitch Accent Categories in Standard Tokyo Japanese

| Pattern | Name | High Mora | Downstep Location | Example |
| :--- | :--- | :--- | :--- | :--- |
| **0** | **Heiban (平板)** | Starts low, rises from 2nd mora, stays high into particle | No drop | さくら (sa-KU-RA) |
| **1** | **Atamadaka (頭高)** | 1st mora high, drops immediately on 2nd mora | After 1st mora | あめ (A-me *rain*) |
| **2** | **Nakadaka (中高)** | Starts low, rises, then drops before the end | Inside the word | たまご (ta-MA-go *egg*) |
| **3** | **Odaka (尾高)** | Starts low, rises, drops on the following particle | After last mora | おとこ (o-TO-KO [ga]) |

## 2. Rendering Pitch SVG Contours

```tsx
interface PitchMora {
  mora: string;
  isHigh: boolean;
  hasDrop: boolean;
}

export function PitchContourView({ moras }: { moras: PitchMora[] }) {
  const stepWidth = 32;
  const highY = 8;
  const lowY = 24;

  const points = moras.map((m, i) => {
    const x = i * stepWidth + stepWidth / 2;
    const y = m.isHigh ? highY : lowY;
    return `${x},${y}`;
  });

  return (
    <div className="flex flex-col items-center">
      <svg className="w-full h-8 overflow-visible">
        <polyline
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          points={points.join(' ')}
        />
        {moras.map((m, i) => (
          <circle
            key={i}
            cx={i * stepWidth + stepWidth / 2}
            cy={m.isHigh ? highY : lowY}
            r="4"
            fill={m.hasDrop ? '#EF4444' : '#F59E0B'}
          />
        ))}
      </svg>
      <div className="flex">
        {moras.map((m, i) => (
          <span key={i} className="w-8 text-center font-japanese text-sm text-amber-100">
            {m.mora}
          </span>
        ))}
      </div>
    </div>
  );
}
```
