---
name: forensic-audit-pace-and-rigor
description: Enforce strict single-pass execution and the Supreme Forensic Tri-Phase protocol for Siklus V
trigger: always_on
---

# Forensic Audit Pace & Rigor Rule (Siklus V Supreme Protocol)

When conducting multi-pass QA audits, deep-dive forensic evaluations, or architectural remediations across Nugget Nihongo:

1. **Strict Single-Pass Execution (One Pass at a Time)**:
   - NEVER bundle, jump, or leapfrog multiple passes in a single turn (e.g., jumping from Pass 1 to Pass 5).
   - Even if invoked under long-running directives (e.g. `/goal`), execute and report exactly **ONE single pass per turn**.
   - Solicit or announce the transition to the next sequential pass (Pass $N \rightarrow N+1$) without skipping numbers.

2. **The Supreme Forensic Tri-Phase Protocol (Per Pass Execution Invariant)**:
   Every single pass MUST execute the following 4-step sequence:
   - **Step 1: The Ruthless Inquisition (Audit & Critique)**:
     - Inspect implementation source code line-by-line using `read_file`.
     - Test extreme edge cases: null/undefined/0/NaN, offline mode, network jitter, 320px iPhone SE screen, concurrent multi-tab writes, 1000+ item iterations.
     - Document flaws, code smells, type inconsistencies, and UX friction openly.
   - **Step 2: Surgical Remediation (Direct Code Patching)**:
     - Patch defects directly in source files (`edit_file` / `write_file`).
     - Never use brittle workarounds; maintain 100% backward compatibility and strict TypeScript typing.
   - **Step 3: Cumulative Regression Gate**:
     - Author a dedicated regression suite for the pass (`tests/test-s5-passX-*.js`).
     - Register as a new suite in `tests/master-regression-orchestrator.js`.
     - Run orchestrator and verify 100% GREEN (Exit code 0 across all historical suites).
   - **Step 4: Empirical Ledger & Docket**:
     - Cite exact file paths, line ranges before/after, and terminal test outputs.

3. **Zero Omission Scope (100% Codebase Coverage)**:
   - Must cover all 15 functional clusters, including previously latent modules:
     - HVPT (High-Variability Phonetic Training: `HVPTPlayer.tsx`)
     - Jalur 9 Buku Teks Pendamping (`public/data/books/` Minna, Irodori, Sou Matome)
     - Multi-Tab Broadcast Sync Daemon (`broadcastSync.ts`, `syncDaemon.ts`)
     - Heatmap Calendar & Badges Modal (`HeatmapCalendar.tsx`, `BadgesModal.tsx`)
     - Micro-Session Pacing Engine (`microSessionEngine.ts`)
     - Telemetry & Core Web Vitals (`errorReporter.ts`, `reviewTelemetry.ts`, `webVitals.ts`)
     - PWA Standalone Lifecycle (`pwaStore.ts`)

4. **Microscopic Empirical Proof**:
   - Cite exact file paths with clickable links: `[Filename.tsx:123-145](file:///absolute/path/to/Filename.tsx#L123-L145)`.
   - Theoretical assumptions are prohibited until confirmed by inspecting code or terminal execution.

5. **Windows PowerShell Safe Command Chaining**:
   - In Windows environments, **never use POSIX `&&`**.
   - Always use `;` for sequential statements, or wrap in `cmd /c "command1 && command2"`.
