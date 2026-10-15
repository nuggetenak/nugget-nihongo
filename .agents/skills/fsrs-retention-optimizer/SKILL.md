---
name: fsrs-retention-optimizer
description: "FSRS (Free Spaced Repetition Scheduler) memory parameter optimizer and review interval tuning using open-spaced-repetition/fsrs-optimizer."
---

# FSRS Retention Optimizer Skill

Nugget Nihongo implements the modern FSRS spaced repetition algorithm (via `ts-fsrs`). This skill describes how to analyze learner review history logs to fine-tune the 17 FSRS weight parameters, compute personalized forgetting curves, and minimize daily study workload while hitting custom retention targets.

## 1. FSRS Review Log Schema
Each review log captures the card's state and student rating:
```ts
interface ReviewLog {
  card_id: string;
  rating: 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy
  state: 0 | 1 | 2 | 3;  // 0: New, 1: Learning, 2: Review, 3: Relearning
  review_time: string;   // ISO timestamp
  scheduled_days: number;
  elapsed_days: number;
}
```

## 2. Retention vs Load Optimization

The default FSRS parameters target 90% retention ($R = 0.90$). The optimizer calculates stability $S$ and difficulty $D$:
$$R(t) = (1 + F \cdot \frac{t}{S})^{-w}$$

Using the Python optimizer:
```bash
# Analyze user logs export (CSV) and output optimized weights
uv run python -m fsrs_optimizer user_reviews.csv
```

The output yields an optimized 17-float array:
```json
[0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234, 1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 0.2242, 0.2507, 2.9466]
```

## 3. Applying Custom Weights in `ts-fsrs`
In client code:
```ts
import { fsrs, generatorParameters } from 'ts-fsrs';

export function getCustomFsrsEngine(customWeights?: number[]) {
  const params = generatorParameters({
    request_retention: 0.9,
    maximum_interval: 365,
    w: customWeights || undefined,
  });
  return fsrs(params);
}
```
