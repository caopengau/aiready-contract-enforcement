# Platform Roadmap

> Implementation tasks broken down by timeframe. Update status here as work progresses.

---

## Immediate — Month 1 (MVP SaaS)

### CI/CD Gatekeeper (Strategic Priority)

- [x] Add `--ci` flag to CLI for GitHub Actions integration
- [x] Add `--fail-on` option for granular control (critical, major, any)
- [x] Output GitHub Actions annotations for PR checks
- [x] Block PRs that don't meet threshold with remediation steps
- [x] Create GitHub Action marketplace action (aiready-action)
- [x] Add GitLab CI template

### Pricing & Plans (MVP Launch Strategy)

- [x] Launch with Free tier only (no billing required)
- [x] Mark Pro, Team, Enterprise as "Coming Soon"
- [x] Add MVP_FREE_ONLY flag for easy toggle
- [x] Update plan comparison table
- [x] Plan-gating middleware with "coming soon" messages
- [x] **Waitlist signup mechanism** (Modal + API + SES)
- [ ] Create Stripe products/prices (deferred until paid tier launch)
- [ ] Set MVP_FREE_ONLY = false when ready for paid tiers

### Infrastructure & Data

- [x] Create SST project in `platform/` (see [data-model.md](./data-model.md) for full SST definition)
- [x] Provision DynamoDB single table (`aiready-platform`) with GSI1, GSI2, TTL
- [x] Provision S3 bucket for raw analysis JSON
- [x] **SES notification system for waitlist/feedback**
- [x] Set up EventBridge bus + SQS queues (for async processing)
- [ ] Configure CloudWatch monitoring + Sentry

### Growth & Support

- [x] **Contact Us page** (/contact)
- [x] **Floating Feedback Widget** (global)
- [ ] Onboard beta users
- [ ] Email notifications for analysis completion (in progress)

---

## ⚡ Phase 1.1: Business Value & ROI (Immediate)

### Cost Impact & Profitability
- [ ] Implement `estimatedMonthlyCost` metric in `@aiready/core`
- [ ] Add "ROI Dashboard" to platform showing potential token savings
- [ ] Launch "State of AI-Readiness" benchmarking report (Lead Gen)

### Remediation MVP
- [ ] Build "Remediation Queue" UI stub in dashboard
- [ ] Implement `aiready fix` command in CLI for basic consolidations
- [ ] Finalize Stripe Customer Portal for self-serve Pro upgrades

---

## Short-term — Months 2–3

### Metrics & Trends (Next Priority)

- [ ] Historical trend charts for all **9 core metrics**:
    1. **Cognitive Load** — Complexity of code for AI/human comprehension.
    2. **AI Signal Clarity** — Clarity of intent and domain concepts.
    3. **Agent Grounding** — Ability for agents to link code to requirements.
    4. **Pattern Entropy** — Consistency of implementation patterns.
    5. **Concept Cohesion** — Logical grouping of related functionality.
    6. **Testability Index** — Ease of automated verification.
    7. **Documentation Drift** — Alignment between code and docs.
    8. **Dependency Health** — Fragility and fragmentation of imports.
    9. **Semantic Distance** — Consistency of terminology across the codebase.
- [ ] `GET /repos/:repoId/metrics` endpoint with tool + date range filters.
- [ ] Chart components using D3.js (reusing logic from `@aiready/visualizer`).

### Async Pipeline

- [ ] EventBridge bus for "Analysis Uploaded" events
- [ ] SQS queue for reliable processing
- [ ] Processing Lambda — extract metrics, compute trends, write daily metric records

### Billing Preparation

- [ ] Stripe integration: subscription creation, webhook handler, portal link
- [ ] Plan enforcement in Lambda middleware (Free tier limits)
- [ ] Upgrade prompts in dashboard for locked features

---

## Medium-term — Months 4–6

### Phase 2a: Analysis Agents

- [ ] Impact Agent — estimate token savings per recommendation
- [ ] Risk Agent — classify remediation risk level
- [ ] Dependency Agent — safe refactoring order
- [ ] Prioritization Agent — ROI-ranked remediation queue

### CI/CD Integration

- [ ] GitHub Actions workflow: `aiready analyze && aiready upload`
- [ ] Status checks: block merge if AI readiness score drops
- [ ] GitLab CI equivalent

### Benchmarking

- [ ] `GET /repos/:repoId/benchmarks` — compare against anonymized repo cohort
- [ ] Aggregate metrics pipeline (aggregate across opted-in repos)

---

## Long-term — Months 7–12

### Phase 2b: Remediation Agents

- [ ] Refactor Agent (consolidate duplicates)
- [ ] Rename Agent (standardize naming)
- [ ] Restructure Agent (flatten import chains)
- [ ] Validation Agents (test + type check + AI review)
- [ ] Auto-PR creation for approved low-risk remediations
- [ ] Human review queue UI (team + expert tiers)

### Enterprise Features

- [ ] SSO (SAML/OIDC)
- [ ] RBAC (owner / admin / member / read-only)
- [ ] Custom rules and thresholds
- [ ] on-premise deployment option
- [ ] Dedicated account manager workflow

### Platform

- [ ] Real-time WebSocket updates (API Gateway v2) for run progress
- [ ] Team collaboration (comments on recommendations, assignment)
- [ ] Jira / Linear integration
- [ ] White-label reports

---

## Decisions Log

| Date    | Decision                                                 | Rationale                                                                                      |
| ------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 2026-01 | Serverless (Lambda + DynamoDB) over Express + PostgreSQL | ~90% cost savings at low user counts, zero ops burden                                          |
| 2026-01 | Single-table DynamoDB design                             | Eliminates JOINs, serves all 15 access patterns from one table                                 |
| 2026-01 | SST for IaC                                              | Already in use for landing, consistent toolchain                                               |
| 2026-02 | Phase 2 = agentic remediation + consulting hybrid        | Closes gap between detection and fix; unique market position                                   |
| 2026-02 | MVP launch with Free tier only                           | Remove friction for initial users, defer billing complexity, gather feedback before monetizing |
