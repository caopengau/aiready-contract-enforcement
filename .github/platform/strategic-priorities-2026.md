# AIReady Platform Strategic Priorities (2026 Q2)

This document outlines the next phase of evolution for the AIReady SaaS platform, focusing on commercial traction, technical stability, and product differentiation.

---

## 1. Commercial Success: The "Gatekeeper" Pivot
**Goal:** Transition from a "scanner" to a "blocker" to drive recurring revenue.

*   **The Move:** Launch the **Team Tier ($99/mo)** centered on **CI/CD Enforcement**.
*   **Action Items:**
    *   [ ] Finalize GitHub Action/GitLab CI templates.
    *   [ ] Enable the PR Gatekeeper feature (blocking merges on score drops).
    *   [ ] Flip `MVP_FREE_ONLY = false` in `platform/src/lib/plans.ts`.
    *   [ ] Update landing page hero to emphasize "Don't merge technical debt."
*   **Value Prop:** "Protect your AI context budget automatically on every PR."

## 2. Technology Stability: Observability & Trust
**Goal:** Ensure the async analysis pipeline is rock-solid and transparent.

*   **The Move:** Implement **Deep Observability** to catch "silent failures" in SQS/Lambda.
*   **Action Items:**
    *   [ ] **Option A (External):** Integrate Sentry (Free Tier) for error tracking.
    *   [ ] **Option B (AWS Native):** Configure CloudWatch Alarms for Lambda Errors and SQS AgeOfOldestMessage.
    *   [ ] Implement a "System Status" indicator in the Dashboard for analysis jobs.
    *   [ ] Add retry logic and DLQ (Dead Letter Queue) alerts for failed analyses.
*   **Value Prop:** "Never wonder if an analysis is stuck—get notified immediately."

## 3. User Friendliness: Closing the Action Gap
**Goal:** Move from "detecting problems" to "delivering solutions."

*   **The Move:** Deploy **One-Click Remediation** using Phase 2 Agents.
*   **Action Items:**
    *   [ ] Integrate `RefactorAgent` and `RenameAgent` into the Dashboard UI.
    *   [ ] Add a "Generate PR" button to high-ROI issues in the Remediation Queue.
    *   [ ] Build a "Preview Diff" modal for AI-generated fixes.
    *   [ ] Allow users to "Approve" a fix, triggering an automated PR to their repo.
*   **Value Prop:** "Don't just find issues—fix them in one click."

## 4. Staying Ahead: The "AI Signal" Moat
**Goal:** Differentiate from generic linting/security tools.

*   **The Move:** Double down on **LLM Context Optimization** metrics.
*   **Action Items:**
    *   [ ] Refine the **ROI Dashboard** to show "Estimated Token Savings."
    *   [ ] Build a "Grounding Score" for documentation vs. code alignment.
    *   [ ] Create "AI-Readiness Benchmarks" comparing the repo against industry standards.
*   **Value Prop:** "We aren't a linter; we are your AI's best friend."

---

## Success Metrics (Q2 2026)
*   **Conversion:** 5% of active CLI users adopt CI/CD Gatekeeper.
*   **Retention:** 80% of users who merge an "AI-Generated PR" remain active.
*   **Stability:** 99.9% successful analysis completion rate.
