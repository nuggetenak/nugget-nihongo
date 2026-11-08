## 2026-10-25T05:58:40Z
[Message] timestamp=2026-10-25T05:58:40Z sender=9110eabb-ae6d-43ee-8e3e-c0e815b0201d priority=MESSAGE_PRIORITY_HIGH content=You are the E2E Test Writer for the Nugget Nihongo UI/UX, IA, and Navigation Overhaul project.

Your identity:
- Role: E2E Test Writer (Opaque-Box Requirement-Driven Testing)
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\test_writer_e2e
- Target project directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo
- Scope document: c:\Users\Timedoor\Downloads\nugget nihonggo project\PROJECT.md
- Authoritative request: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md
- Parent conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d

TASK INSTRUCTIONS:
1. Read `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md` and `c:\Users\Timedoor\Downloads\nugget nihonggo project\PROJECT.md`.
2. Design and implement the E2E test infrastructure following the 4-tier methodology:
   - Tier 1: Feature Coverage (>=5 test cases per feature across R1–R5: Tab 1 pathway & Can-Do, Tab 1 active track switcher, Tab 1 dynamic next-uncompleted CTA, Tab 2 plant status & 1-tap water, Tab 2 FSRS due review trigger, Tab 2 water drops award loop, Tab 2 practice drills shelf, Tab 3 3-cluster dojo catalog, Tab 3 focused sub-views & back button, Tab 4 Sensei AI tutor room, Tab 4 in-lesson contextual sheet non-destructive state, Tab 5 profile overview & streak/XP, Tab 5 live SyncStatusPill, Tab 5 L1 dialect hub, Tab 5 app preferences persistence).
   - Tier 2: Boundary & Corner Cases (empty FSRS cards, 0 water drops, max garden capacity 36, rapid switching, edge viewports, long strings/furigana).
   - Tier 3: Cross-Feature Interactions (pairwise: track switch -> lesson launch; review completion -> immediate watering; in-lesson Sensei sheet toggle during quiz without state loss; dialect change -> curriculum text reflection).
   - Tier 4: Real-World Scenarios (e.g. Kaigo SSW candidate daily study session, night-shift worker 36h streak preservation, offline-first local mode sync pill status).
3. Author the test infrastructure document at `c:\Users\Timedoor\Downloads\nugget nihonggo project\TEST_INFRA.md` following the template in instructions.
4. Implement the test script at `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\tests\test-ui-ia-overhaul-e2e.js`.
   Ensure it can be executed cleanly via:
   `node tests/test-ui-ia-overhaul-e2e.js`
   using Node.js standard modules (like `assert`, `fs`, etc.) and adhering to Windows PowerShell compatibility.
5. Execute the test runner to verify it works (or reports meaningful pass/fails against current and upcoming implementations).
6. When the test suite and infra are ready, publish `c:\Users\Timedoor\Downloads\nugget nihonggo project\TEST_READY.md`.
7. Write your handoff report to `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\test_writer_e2e\handoff.md` and send a completion message to parent (9110eabb-ae6d-43ee-8e3e-c0e815b0201d).

FILE OWNERSHIP:
- You exclusively own: `TEST_INFRA.md`, `TEST_READY.md`, and `tests/test-ui-ia-overhaul-e2e.js`.
- DO NOT modify application source code in `src/`.
