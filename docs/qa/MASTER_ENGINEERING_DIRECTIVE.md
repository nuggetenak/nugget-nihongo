# MASTER ENGINEERING DIRECTIVE
## Nugget Nihongo — Comprehensive QA & Testing Architecture

**ROLE:**
You are operating as a Principal QA Architect, Senior Software Engineer, Test Automation Engineer, Software Reliability Engineer, and Educational Data Quality Auditor.

Your assignment is to inspect, understand, audit, improve, and validate the complete testing ecosystem of the Nugget Nihongo application.

This is a repository-wide engineering assignment. Do not limit your investigation to the currently visible test runner, the existing master regression orchestrator, or the most recently modified modules.

---

# 1. PROJECT CONTEXT

Project: Nugget Nihongo

Repository:
https://github.com/nuggetenak/nugget-nihongo

Live application:
https://nugget-nihongo.pages.dev/

Product direction:
Nugget Nihongo is intended to evolve into a comprehensive Japanese-language Learning Management System (LMS).

Known educational scope includes:

- Complete JLPT learning coverage from N5 through N1.
- Hiragana and Katakana.
- Vocabulary acquisition.
- Grammar.
- Kanji.
- Reading comprehension and advanced Japanese learning.
- SSW learning and examination preparation across all relevant sectors available through Prometric, not exclusively Construction.

IMPORTANT:

These are known product-direction requirements, not a complete replacement for the actual project specifications.

You MUST inspect the repository's existing documentation, product requirements, Vision & Mission, data structures, and implementation before determining the complete application scope.

Do not invent missing product pillars, requirements, sectors, educational standards, or expected behaviors.

When documentation conflicts with the actual implementation, record the discrepancy instead of silently choosing one.

---

# 2. PRIMARY OBJECTIVE

Establish a reliable, comprehensive, maintainable, evidence-based Quality Assurance (QA) architecture.

Your objectives:

1. Discover every existing testing script, framework, test suite, configuration, and testing-related workflow.
2. Understand exactly what every discovered test does.
3. Identify redundant, weak, incomplete, misleading, flaky, and missing tests.
4. Map testing coverage against the application's actual modules and user journeys.
5. Verify that existing test results genuinely represent successful application behavior.
6. Build a unified and maintainable testing architecture.
7. Prevent regressions when new features or code changes are introduced.
8. Evaluate educational content and data quality independently from technical correctness.
9. Provide reproducible test execution and transparent reporting.
10. Establish evidence-based release-readiness criteria.

The intended outcome is NOT simply a higher number of passing tests.

The intended outcome is a more reliable application with meaningful test coverage and demonstrable quality.

---

# 3. NON-NEGOTIABLE ENGINEERING RULES

Follow these rules throughout the entire assignment.

### 3.1 No assumptions

- Never assume which testing frameworks or technologies the project uses.
- Never assume that a test name accurately describes what the test actually verifies.
- Never assume that a passing test means the feature works correctly.
- Inspect the implementation of every important test before evaluating its reliability.
- Never fabricate test results, coverage percentages, benchmark results, or bug counts.

### 3.2 Preserve existing functionality

- Do not delete existing tests merely because they fail.
- Do not disable failing tests to achieve a green test suite.
- Do not weaken assertions or modify expected values simply to make tests pass.
- Do not silently change production business logic.
- Do not introduce unnecessary dependencies or duplicate testing frameworks.
- Preserve existing project conventions and architectural decisions unless a documented problem justifies a change.

### 3.3 Evidence-based reporting

Every finding must include, whenever available:

- Finding ID.
- Severity.
- Relevant file path.
- Relevant function, component, or test name.
- Line references.
- Reproduction steps.
- Actual behavior.
- Expected behavior.
- Technical explanation.
- Recommended remediation.
- Verification evidence.

Clearly distinguish:
- Confirmed defects.
- Potential defects.
- Coverage gaps.
- Architectural risks.
- Unverified concerns.

### 3.4 Safe execution

- Never run destructive commands against production.
- Never modify production databases or real user data.
- Never expose secrets, API keys, tokens, or credentials in reports.
- Never run tests that send real emails, payments, or external transactions without explicit authorization.
- Do not introduce arbitrary network dependencies into otherwise self-contained tests.
- Inspect test commands before executing unfamiliar scripts.
- Use isolated test data and temporary resources wherever possible.

### 3.5 Power interruption and recovery

Before continuing an interrupted task:

1. Inspect Git status and existing diffs.
2. Inspect unfinished tasks, logs, reports, and previously generated artifacts.
3. Identify which tests have already completed.
4. Identify whether generated files or processes are incomplete.
5. Resume from the last verified checkpoint.

Do not blindly repeat destructive or expensive operations.

---

# 4. PHASE 1 — COMPLETE REPOSITORY DISCOVERY

Do not start by writing new tests.

First, understand the repository.

Inspect:

- Project directory structure.
- Application entry points.
- Frontend architecture.
- Backend architecture, if present.
- Database models and schemas.
- API endpoints.
- Authentication and authorization.
- State-management architecture.
- Routing.
- Content/data storage.
- Configuration files.
- Build system.
- Dependency manifests and lockfiles.
- Deployment configuration.
- Existing CI/CD workflows.
- Existing developer instructions and agent rules.
- Documentation and product specifications.

Discover all existing test-related files and configurations.

Search for, but do not limit yourself to:

- package.json scripts.
- Test directories.
- Tests embedded alongside source modules.
- Jest configurations.
- Vitest configurations.
- Playwright configurations.
- Cypress configurations.
- Pytest configurations.
- ESLint configurations.
- TypeScript configurations.
- Storybook tests, if applicable.
- Lighthouse or accessibility workflows.
- Performance and load-testing scripts.
- Shell scripts.
- Custom Node/Python automation.
- GitHub Actions and other CI pipelines.
- Custom regression orchestrators.
- Test fixtures and mock datasets.
- Browser automation utilities.

Identify the actual frameworks from repository evidence. Do not install or introduce every framework listed above.

### Required deliverable

Create:

`docs/qa/REPOSITORY_TESTING_INVENTORY.md`

Include:

| Field | Description |
|---|---|
| Test ID | Unique identifier |
| Name | Script or test-suite name |
| File path | Exact location |
| Framework | Actual framework |
| Category | Test classification |
| Scope | What it examines |
| Execution command | Verified command |
| Dependencies | Required services or setup |
| Destructive risk | None, low, medium, high |
| Current status | Verified, unverified, broken |
| Notes | Important limitations |

Every discovered test-related script must be accounted for.

If a script cannot be safely executed, explain why.

---

# 5. PHASE 2 — TEST SUITE CLASSIFICATION

Classify the discovered tests into meaningful testing disciplines.

Do not assume that a project needs every category equally. Determine applicability based on actual architecture.

Investigate the following categories.

## A. Static Analysis

Examples:

- Linting.
- Formatting.
- Type checking.
- Dead code detection.
- Dependency consistency.
- Import validation.
- Build-time validation.
- Circular dependency detection.

Objective: identify problems without necessarily executing application behavior.

## B. Unit Testing

Examine individual functions, utilities, hooks, services, and components.

Examples:

- Validation functions.
- Japanese text utilities.
- Vocabulary processing.
- Grammar evaluation.
- Scoring calculations.
- Progress calculations.
- Date/time handling.
- Data transformation.
- Authentication utilities.

Check both normal and edge-case behavior.

## C. Component Testing

Verify individual UI components.

Examples:

- Flashcards.
- Quiz components.
- Answer options.
- Navigation.
- Modals.
- Forms.
- Progress indicators.
- Audio controls.
- Loading and error states.

Verify interactions, accessibility basics, input validation, and state transitions.

## D. Integration Testing

Verify communication between systems and modules.

Examples:

- Authentication and user profiles.
- Quiz engine and scoring engine.
- Learning modules and progress tracking.
- Content retrieval and rendering.
- Database and application services.
- API and frontend integration.
- User settings and persistence.

## E. End-to-End Testing

Test realistic user journeys from beginning to end.

Examples:

1. User opens the application.
2. User registers or logs in.
3. User accesses a learning module.
4. User studies new material.
5. User completes an exercise.
6. Application evaluates answers.
7. Learning progress is saved.
8. User navigates away.
9. User returns.
10. Previously saved progress is correctly restored.

Include important alternative paths and error scenarios.

## F. Regression Testing

Verify that previously functional behavior remains functional after changes.

Examples:

- Authentication changes must not break user sessions.
- Quiz changes must not break scoring.
- Content changes must not break search.
- Database changes must not invalidate saved progress.
- UI changes must not break mobile navigation.

Determine whether existing regression tests actually protect these behaviors.

## G. Smoke Testing

Develop a small, fast collection of high-priority checks.

These should answer:

"Is the application sufficiently functional to proceed with further testing?"

Include critical startup, routing, authentication, essential content access, and other verified critical paths.

## H. API and Contract Testing

Where applicable, examine:

- Request validation.
- Response schemas.
- Authentication.
- Authorization.
- Error handling.
- Status codes.
- API compatibility.
- Pagination.
- Invalid inputs.
- Rate limiting.
- Data serialization.

## I. Database and Data Integrity Testing

Where applicable:

- Schema validation.
- Required fields.
- Referential integrity.
- Duplicate identifiers.
- Orphaned records.
- Invalid relationships.
- Migration safety.
- Read/write consistency.
- Persistence after reload.
- Data loss scenarios.

## J. UI/UX and Visual Regression Testing

Examine:

- Responsive layouts.
- Mobile rendering.
- Desktop rendering.
- Navigation consistency.
- Overflow and clipping.
- Font rendering.
- Japanese typography.
- Dialog and modal behavior.
- Empty states.
- Loading states.
- Error states.
- Light and dark themes, if supported.

Do not equate pixel similarity with usability.

## K. Accessibility Testing

Examine applicable WCAG requirements, including:

- Semantic HTML.
- Keyboard navigation.
- Focus management.
- Accessible labels.
- Color contrast.
- Screen-reader compatibility.
- Form error announcements.
- Interactive element accessibility.
- Reduced-motion behavior.

Record the exact standard and scope used. Do not claim full WCAG compliance from an automated scan alone.

## L. Performance Testing

Examine:

- Initial page loading.
- Route transitions.
- Large content datasets.
- Search performance.
- Quiz response latency.
- Memory consumption.
- Rendering performance.
- API response time.
- Asset sizes.
- Mobile-device performance.

Establish baselines from measurements before proposing thresholds.

Do not invent performance benchmarks.

## M. Security Testing

Examine applicable risks:

- Authentication weaknesses.
- Authorization failures.
- Broken access control.
- Input validation.
- Injection vulnerabilities.
- XSS.
- CSRF, where applicable.
- Unsafe data exposure.
- Secret leakage.
- Dependency vulnerabilities.
- Insecure file handling.
- Session management.

Never attempt unauthorized exploitation of the live production environment.

## N. Compatibility Testing

Examine applicable combinations:

- Android.
- iOS.
- Desktop.
- Major browsers.
- Different screen sizes.
- Slow connections.
- Network interruptions.
- Unsupported browser features.

Do not claim a device or browser was tested unless it was actually tested.

## O. Educational and Japanese Language Data Quality Testing

This category is extremely important.

Do not treat educational correctness as equivalent to technical correctness.

Inspect:

- Vocabulary correctness.
- Reading accuracy.
- Kanji correctness.
- Kana correctness.
- Grammar accuracy.
- Particle usage.
- Conjugation accuracy.
- Naturalness of example sentences.
- Translation accuracy.
- JLPT level classification.
- Difficulty consistency.
- Answer-key correctness.
- Distractor quality.
- Duplicate content.
- Missing content.
- Broken media references.
- Incorrect explanations.
- Contradictory learning materials.
- Inconsistent terminology.
- Incorrect Japanese register.
- Contextual and pragmatic appropriateness.

Distinguish automatically verifiable properties from issues requiring qualified human linguistic review.

Do not claim that a language model or simple string comparison can definitively prove the linguistic correctness of all Japanese material.

## P. SSW Content and Catalogue Assurance

Verify the intended SSW coverage against actual project requirements and authoritative reference material available to the project.

Examine:

- Sector coverage.
- Catalogue completeness.
- Terminology.
- Relevant technical vocabulary.
- Examination relevance.
- Topic classification.
- Sector-specific learning paths.
- Data consistency.
- Translation quality.

Do not restrict coverage to Construction unless the verified product requirements explicitly say so.

Do not invent sectors or claim completeness without a verified reference.

---

# 6. PHASE 3 — AUDIT TEST QUALITY

This is one of the most important phases.

The existence of a test does not prove that it is useful.

Inspect the implementation of existing tests and identify:

- Empty tests.
- Assertions that always pass.
- Assertions that only check whether a component exists.
- Tests that merely inspect hardcoded output.
- Excessive mocking that bypasses the behavior under test.
- Tests that do not validate meaningful results.
- Incomplete error-path testing.
- Missing boundary conditions.
- Tests that never exercise actual user workflows.
- Duplicate tests.
- Flaky tests.
- Skipped tests.
- Disabled tests.
- Outdated tests.
- Incorrect test expectations.
- Tests with hidden external dependencies.
- Tests that modify shared data.
- Tests with nondeterministic behavior.

For every questionable test, explain its weakness.

Example:

A test that only checks whether a quiz component renders does NOT prove that the quiz evaluates answers correctly, saves results correctly, or calculates scores correctly.

A test that checks whether a progress number exists does NOT prove that the number reflects actual user activity.

A test that receives a mocked successful API response does NOT prove that the real API integration works.

### Required deliverable

`docs/qa/TEST_QUALITY_AUDIT.md`

Include a severity-based audit and prioritized recommendations.

---

# 7. PHASE 4 — FEATURE AND REQUIREMENT TRACEABILITY

Discover the actual application modules from the source code and documentation.

Build a traceability matrix linking:

Product requirement → Application module → Implementation → Test coverage → Test result → Remaining risk.

Example structure:

| Feature | Requirement | Test coverage | Evidence | Gap |
|---|---|---|---|---|
| Authentication | Verified requirement | Unit + E2E | Test IDs | Missing edge cases |
| Flashcards | Verified requirement | Component + E2E | Test IDs | Persistence gap |
| JLPT learning | Verified requirement | Data + functional | Test IDs | Content review needed |
| SSW catalogue | Verified requirement | Data integrity | Test IDs | Sector coverage unverified |

This is an illustrative structure, not a declaration of actual implemented features.

Discover actual modules and use their real names.

### Required deliverable

`docs/qa/FEATURE_TEST_TRACEABILITY.md`

Every significant implemented feature should have an explicit testing status.

Do not label an untested feature as PASS.

---

# 8. PHASE 5 — MASTER TEST ORCHESTRATION

Inspect the existing master regression orchestrator first.

In particular, investigate the previously reported result:

141/141 tests passed, 100%, execution time 67.95 seconds, zero regressions detected.

Treat this as a reported result that must be independently investigated.

Determine:

- Where the orchestrator is implemented.
- Which exact test suites it invokes.
- Whether all suites are actually executed.
- Whether failed subprocesses propagate failure correctly.
- Whether asynchronous processes are awaited.
- Whether timeouts are handled.
- Whether missing test files produce failures or are silently ignored.
- Whether skipped tests are counted correctly.
- Whether duplicate tests inflate totals.
- Whether results are based on actual assertions.
- Whether stale output could be mistaken for a new run.
- Whether exit codes are reliable.
- Whether execution time is measured correctly.

Do not assume the existing result is invalid. Verify it.

## Master orchestrator requirements

If an adequate orchestrator already exists, improve it instead of creating a duplicate.

Otherwise, design a unified test runner that supports the actual project stack.

It should ideally provide these execution modes, where applicable:

1. `smoke`
2. `unit`
3. `component`
4. `integration`
5. `e2e`
6. `regression`
7. `data-quality`
8. `accessibility`
9. `performance`
10. `security`
11. `compatibility`
12. `full`

Use existing project command conventions whenever possible.

The full test command must:

- Execute all applicable test categories.
- Preserve individual suite results.
- Detect process failures.
- Report timeouts.
- Report skipped and blocked tests separately.
- Capture logs.
- Return a non-zero exit code when mandatory checks fail.
- Produce a machine-readable result.
- Provide a human-readable summary.

Do not create fake suites just to populate these categories.

Do not require expensive browser or infrastructure tests for every small code change if a sensible test selection strategy exists.

---

# 9. PHASE 6 — BUILD MISSING HIGH-VALUE TESTS

Only after completing the discovery and quality audit should you add missing tests.

Prioritize by actual risk and business importance.

### Priority P0 — Critical

Potential examples:

- Authentication and session integrity.
- User data protection.
- Learning progress persistence.
- Quiz evaluation correctness.
- Data corruption.
- Critical application startup failures.

### Priority P1 — High

Potential examples:

- Learning workflow integrity.
- Content retrieval.
- Search and filtering.
- Quiz navigation.
- Answer validation.
- User settings.
- Japanese data integrity.

### Priority P2 — Medium

Potential examples:

- Responsive behavior.
- Noncritical UI interactions.
- Accessibility improvements.
- Performance optimizations.
- Secondary workflows.

### Priority P3 — Low

Potential examples:

- Minor cosmetic inconsistencies.
- Noncritical convenience functionality.
- Low-risk visual refinements.

These are suggested risk classes. Assign actual priorities only after inspecting the application.

### Test development rules

Every new test must:

- Verify a meaningful expected behavior.
- Have a clear reason for existence.
- Use appropriate test data.
- Include edge cases when relevant.
- Be reproducible.
- Avoid depending on execution order.
- Clean up temporary state.
- Avoid unnecessary mocking.
- Provide useful failure messages.

Never create tests that merely increase the test count.

---

# 10. PHASE 7 — TEST DATA AND CONTENT QUALITY VALIDATION

Build a data-quality validation approach appropriate to the actual data model.

Consider:

- Schema validation.
- Required-field validation.
- Unique identifiers.
- Broken references.
- Duplicate records.
- Invalid data types.
- Missing translations.
- Empty explanations.
- Invalid JLPT levels.
- Broken Japanese text.
- Invalid answer keys.
- Invalid option references.
- Duplicate quiz questions.
- Inconsistent classification.
- Broken asset references.
- Incorrect metadata relationships.

For language content, implement automated checks where they are reliable.

For semantic correctness, use a separate review process with explicit human-review status.

Create clear classifications:

- Automatically verified.
- Automatically flagged for review.
- Human review required.
- Unable to verify.

Do not convert uncertainty into an automatic PASS.

---

# 11. PHASE 8 — CI/CD AND CHANGE-BASED TESTING

Inspect the existing CI/CD configuration.

Determine:

- Which tests run on pull requests.
- Which tests run on commits.
- Which tests run before release.
- Whether failures block deployment.
- Whether production builds are independently validated.
- Whether test results are retained.

Where appropriate, implement a layered execution strategy.

### On every relevant code change

Run the smallest relevant tests plus essential safety checks.

### Before merging

Run all required unit, integration, static-analysis, and applicable regression tests.

### Before release

Run the full mandatory validation suite, including applicable E2E, security, compatibility, performance, and data-quality checks.

Do not introduce new CI providers, external credentials, secrets, or paid services without justification and authorization.

---

# 12. PHASE 9 — IMPLEMENTATION AND CHANGE CONTROL

After the audit:

1. Present a concise summary of confirmed findings.
2. Identify the highest-priority gaps.
3. Identify exactly what needs to change.
4. Implement safe QA documentation and test improvements.
5. Modify the orchestrator only when evidence demonstrates a need.
6. Add tests for confirmed missing coverage.
7. Correct test infrastructure defects.
8. Fix production-code defects only when they are demonstrated and the minimal safe fix is clear.
9. Keep production-code changes separate from test-infrastructure changes.
10. Record all changes.

Do not perform a large application refactor as part of this QA assignment.

Do not silently change product requirements to make tests pass.

Do not rewrite working functionality merely to conform to your preferred architecture.

If an essential decision cannot be made from repository evidence, document the uncertainty and proceed with safe, independent work.

---

# 13. PHASE 10 — FINAL VALIDATION

After implementing changes:

- Re-run relevant tests.
- Re-run all required regression suites.
- Verify orchestrator exit codes.
- Verify failure propagation.
- Verify test counts.
- Verify that skipped tests are not reported as passed.
- Verify that reports correspond to the latest execution.
- Verify that generated documentation matches the actual implementation.
- Verify the application build.
- Verify that no unintended files or production changes were introduced.

Compare baseline and final results.

If a test fails, investigate and report the failure honestly.

Never alter the test expectation simply to achieve green status.

---

# 14. REQUIRED QA DELIVERABLES

Create or update the following documents, adapting their content to the actual repository structure.

`docs/qa/`

1. `README.md`
   - QA architecture overview.
   - How to run the tests.
   - Test category explanations.
   - Troubleshooting.

2. `REPOSITORY_TESTING_INVENTORY.md`
   - Complete discovered test inventory.

3. `TEST_QUALITY_AUDIT.md`
   - Reliability, duplication, weaknesses, and risks.

4. `FEATURE_TEST_TRACEABILITY.md`
   - Requirement-to-test mapping.

5. `QA_ARCHITECTURE.md`
   - Proposed and implemented architecture.

6. `DATA_QUALITY_STANDARDS.md`
   - Rules for educational and Japanese learning data.

7. `TEST_EXECUTION_GUIDE.md`
   - Commands, prerequisites, and execution modes.

8. `REGRESSION_POLICY.md`
   - Rules for preventing future regressions.

9. `RELEASE_READINESS.md`
   - Evidence-based quality gates.

10. `QA_BACKLOG.md`
    - Remaining defects, unimplemented tests, and prioritized work.

Additionally, produce:

`docs/qa/reports/`

- A dated baseline report.
- A final execution report.
- A machine-readable JSON test summary.
- A record of unresolved failures and limitations.

Use appropriate timestamps and actual test results.

Do not overwrite historical reports without preserving their history.

---

# 15. FINAL REPORT FORMAT

When finished, provide a structured engineering report in this format.

## A. Repository Discovery

- Main application architecture.
- Testing frameworks discovered.
- Number of unique testing scripts.
- Number of individual test cases, where measurable.
- Main test directories.
- Master orchestrator location.

## B. Existing QA Health

- Existing test categories.
- Verified passing tests.
- Failed tests.
- Skipped tests.
- Blocked tests.
- Flaky tests.
- Duplicate tests.
- Weak or misleading tests.
- Coverage gaps.

Do not combine these figures into a misleading total.

## C. Regression Orchestrator Audit

Explain whether the previous 141/141 PASS result was independently reproduced and whether its reporting mechanism is trustworthy.

Show the actual commands and results.

## D. Implemented Improvements

List every relevant new or modified file.

Explain what was changed and why.

## E. Final Test Results

For each applicable category, provide:

- Number discovered.
- Number executed.
- Passed.
- Failed.
- Skipped.
- Blocked.
- Duration.
- Execution command.
- Evidence/report path.

## F. Remaining Risks

Explicitly identify:

- Untested features.
- Incomplete test coverage.
- Unverified Japanese content.
- Unverified SSW coverage.
- Manual testing requirements.
- Environmental limitations.
- Security and performance concerns.

## G. Final QA Assessment

Use one of these classifications:

**PASS:** All mandatory checks passed and no unresolved release-blocking issues remain within the verified test scope.

**CONDITIONAL PASS:** Mandatory checks are satisfactory, but specific documented risks, unverified areas, or nonblocking gaps remain.

**FAIL:** One or more mandatory quality gates failed.

**BLOCKED:** Required infrastructure, credentials, data, or environment was unavailable, preventing a valid assessment.

A 100% test pass rate alone is NOT sufficient to declare release readiness.

---

# 16. EXECUTION PROTOCOL

Start now.

Work systematically and autonomously within the existing repository.

Do not ask me to manually list all testing scripts. Discover them yourself.

Do not repeatedly ask me which framework the project uses. Investigate it.

Do not stop after finding the first test directory.

Do not stop after seeing a green regression report.

Do not produce an implementation plan without performing the available safe work.

Do not claim completion if any required phase remains unverified.

Maintain concise checkpoints so that interrupted work can resume safely.

Your first action must be a repository and testing-environment discovery, followed by the complete testing inventory.

**FINAL DIRECTIVE:**

Build a trustworthy QA ecosystem, not a test-count inflation machine.

The standard of success is demonstrable correctness, reliable regression protection, maintainable automation, educational data integrity, and transparent engineering evidence.

Proceed.
