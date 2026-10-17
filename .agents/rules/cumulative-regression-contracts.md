---
name: cumulative-regression-contracts
description: Mandate behavioral contracts over brittle literal string matchers in cumulative multi-sprint regression suites
trigger: always_on
---

# Cumulative Regression Test Contract Rule

When authoring verification suites for multi-sprint roadmaps, cumulative regression runners, and long-range test suites across Nugget Nihongo:

1. **Behavioral Contracts Over Literal String Matchers**:
   - Prefer validating runtime outputs, exported functions, AST properties, or schema definitions rather than brittle literal string slices of configuration files.
   - Example: Verify that `vite.config.ts` exports `manualChunks` containing the required vendor packages, rather than asserting the exact formatting, quotation marks, or array order.
2. **Backward-Compatible Refactoring**:
   - If a later sprint improves an architectural pattern tested in an earlier sprint, update both the earlier assertion and the new test suite to share a unified contract, maintaining 100% green status across all historical suites.
3. **Additive Assertions & Zero Disabling**:
   - Historical sprint tests (Sprint $1 \dots N-1$) must remain green upon the conclusion of Sprint $N$.
   - Never disable, bypass, or comment out a previous sprint's test to pass a new one. Maintain all cumulative suites in continuous green alignment.
