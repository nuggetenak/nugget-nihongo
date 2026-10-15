---
name: adaptive-placement-cat
description: "Computer Adaptive Testing (CAT) and Item Response Theory (IRT) engine for diagnosing student JLPT and JFT Japanese proficiency in 10-12 questions."
---

# Computer Adaptive Placement Skill (IRT / CAT)

This skill describes the architecture for dynamic, adaptive diagnostic tests. Instead of a fixed 50- or 100-question test, this engine dynamically selects questions based on each answer, accurately estimating the student's JLPT level (N5 through N1) in just 10 to 12 questions.

## 1. Item Response Theory (3PL Model)
Each diagnostic item in the question bank has 3 calibrated parameters:
1. $a$ (Discrimination): How sharply the question separates high-ability from low-ability students.
2. $b$ (Difficulty): The proficiency level where a student has a 50% chance of getting it right.
3. $c$ (Guessing parameter): The baseline probability of guessing correctly (typically $0.25$ for 4-option MCQs).

Probability of correct answer $P(\theta)$ given ability $\theta$:
$$P_i(\theta) = c_i + \frac{1 - c_i}{1 + e^{-a_i(\theta - b_i)}}$$

## 2. Adaptive Loop Algorithm
1. **Initialize Ability:** Start student with prior ability $\theta_0 = 0.0$ (centered around N4/N3 border).
2. **Item Selection (Maximum Fisher Information):** Select the unused question $i$ that maximizes Fisher Information $I_i(\theta)$ at the student's current estimated ability $\hat{\theta}$.
3. **Update Ability Estimate:** Using Bayes modal estimation (EAP/MAP) or Maximum Likelihood, re-estimate $\hat{\theta}$ and standard error $SE(\hat{\theta})$ based on whether the answer was correct or incorrect.
4. **Stopping Criteria:** Stop when $SE(\hat{\theta}) < 0.35$ or after 12 questions have been administered.
5. **Output Result:** Map final $\theta$ to CEFR / JLPT brackets:
   - $\theta < -1.5$: N5 (Beginner)
   - $-1.5 \le \theta < -0.5$: N4 (Elementary)
   - $-0.5 \le \theta < 0.5$: N3 (Intermediate)
   - $0.5 \le \theta < 1.5$: N2 (Upper Intermediate)
   - $\theta \ge 1.5$: N1 (Advanced)
