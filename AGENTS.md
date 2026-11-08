# 🍙 Nugget Nihongo — Antigravity Agent Engineering Standards
> **Authoritative Agent Operating System & Architectural Charter**  
> **Platform:** Google Antigravity (AGY) · **Status:** PRODUCTION ACTIVE  
> **Repository:** `nugget-nihongo` · **Version:** v22.0.0

---

## 1. Executive Summary & Brand Soul
**Nugget Nihongo (ナゲット日本語)** is an offline-first, scientific, and comfort-driven Japanese language learning ecosystem built specifically for Indonesian native speakers.
- **Brand Motto:** *"Bite-Sized Japanese for Indonesian Speakers · Teman Belajar Tanpa Rasa Bersalah"*
- **Core Philosophy:** No punitive hearts/lives penalties, no anxiety-inducing public leaderboards. Steady, guilt-free daily micro-learning (5–10 minutes) powered by the **FSRS v4.5 Spaced Repetition Engine** and **L1 Indonesian Contrastive Linguistics**.
- **Dual Flagship Tracks:**
  1. **Academic JLPT Track:** N5 through N1 with 10,508 active vocabulary, 859 grammar patterns, and 2,210 kanji.
  2. **Vocational SSW Track (Tokutei Ginou):** 19 industrial sectors (Kaigo nursing, Food manufacturing, Restaurant, Construction, Agriculture, etc.) with real-world K3 safety protocol drills and Prometric CBT simulations.

---

## 2. Inviolable Engineering Rules (Zero Exception)

### 📌 Rule 1: Cumulative Regression Test Contract
- Historical test suites (Sprints 1–44, Phase 1–5, Siklus I–III) **must remain 100% GREEN (Exit Code 0)** on every single task and turn.
- **Never disable, bypass, or comment out** a previous sprint's test to pass a new one.
- Prefer validating behavioral runtime outputs and AST properties over brittle literal string matching.

### 📌 Rule 2: Universal Multi-Device Responsive Design
- Every component, modal, sheet, and button must support all screen viewports:
  - **Ultra-Compact Mobile:** 320px – 375px (iPhone SE, small Androids) — zero horizontal scroll blowout!
  - **Standard Mobile:** 390px – 430px (iPhone 13/14/15/16, Galaxy S)
  - **Tablet & Foldable:** 640px – 1024px (iPad mini, iPad Air)
  - **Desktop:** 1024px – 1920px+
- **Touch Target Dimensions:** Interactive elements must maintain at least $40\times 40$px bounding box (`min-h-[40px]` or `min-w-[40px]`) with `active:scale-95` tactile scale.
- **Safe Area Inset:** Mobile views must maintain bottom cushion: `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.

### 📌 Rule 3: Windows PowerShell Command Chaining
- In Windows PowerShell environments, **NEVER use raw `&&`** as a statement separator.
- Always use `;` for sequential statement separation in PowerShell, or wrap commands in `cmd /c "command1 && command2"`.
- Maintain package locks with `legacy-peer-deps=true`.

### 📌 Rule 4: Forensic Pace & Rigor
- In multi-pass audits and refactoring, execute exactly **ONE single pass per turn**.
- Never bundle or leapfrog multiple passes.
- Microscopic empirical proof is mandatory: cite exact file paths, line numbers, and verified terminal test executions.

---

## 3. Architecture & Single Source of Truth Navigation
All engineering and pedagogical documentation is centralized under [`docs/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs):

1. **[`docs/PROJECT_ARCHITECTURE_MAP.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/PROJECT_ARCHITECTURE_MAP.md):** Complete hierarchical index of all modules, engines, modals, datasets, and test files.
2. **[`docs/01-product-and-mission/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/01-product-and-mission/):** Product charter, 200 Indonesian learner personas, and milestone roadmap.
3. **[`docs/02-architecture-and-systems/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/02-architecture-and-systems/):** PWA offline caching, TinyBase CRDT sync, FSRS v4.5 memory engine, and CAT IRT 3PL diagnostic.
4. **[`docs/03-pedagogy-and-curriculum/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/03-pedagogy-and-curriculum/):** JLPT/JFT curricula, SSW 19 industrial sectors, and Indonesian L1 contrastive analysis.
5. **[`docs/04-design-system-and-brand/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/04-design-system-and-brand/):** Warm Editorial Hybrid design system, 8 Nippon Colors tokens, and Irasutoya assets.
6. **[`docs/05-data-corpus-and-schemas/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/05-data-corpus-and-schemas/):** Data schemas for 10.508 vocab, 859 grammar, 2.210 kanji, and Supabase tables.
7. **[`docs/06-qa-and-verification-contracts/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/06-qa-and-verification-contracts/):** 44 Sprint cumulative contracts and multi-device verification test suites.
8. **[`docs/07-architecture-decisions-adr/`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/07-architecture-decisions-adr/):** Architecture Decision Records (ADR-001 through ADR-011).

---

## 4. Key CLI Commands & Workflows
```powershell
# Run the master cumulative test suite (100% green required)
npm test

# Typecheck TypeScript codebase
npm run typecheck

# Synchronize patch notes to CHANGELOG.md
npm run changelog

# Build complete production bundle
npm run build

# Start local dev server
npm run dev
```

*Nugget Nihongo Engineering Group · Antigravity Native Operating Charter*
