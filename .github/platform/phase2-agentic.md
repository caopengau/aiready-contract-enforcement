# Phase 2: Agentic Remediation Platform

> Human-in-the-Loop AI system that detects AND fixes AI code debt, with expert oversight for complex changes.

See [agents/README.md](./agents/README.md) for agent implementation detail.

---

## Strategic Context

**Phase 1 (done):** OSS tools detect AI code debt. Users must manually fix issues.

**Phase 2 vision:** _"AI Code Debt Remediation as a Service"_ — AI agents fix detected issues, with human experts providing oversight and architectural guidance.

**Pain point:** Teams using Copilot/Cursor/Claude Code accumulate debt 10x faster than they can fix it. No existing tool offers:

1. AI-specific debt detection ✅ (we have this)
2. Automated remediation with human oversight ← Phase 2
3. Continuous monitoring + proactive fixes ← Phase 2
4. Expert guidance for architectural decisions ← Phase 2

---

## Agentic System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     AIReady Agentic Platform                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐         │
│  │  DETECTION   │────▶│  ANALYSIS    │────▶│  PRIORITIZE  │         │
│  │  AGENTS ✅   │     │  AGENTS 2a   │     │  AGENT 2a    │         │
│  │              │     │              │     │              │         │
│  │ • Patterns   │     │ • Impact     │     │ • ROI-based  │         │
│  │ • Context    │     │ • Risk       │     │ • Effort est │         │
│  │ • Consistency│     │ • Dependencies│    │ • Auto-sched │         │
│  └──────────────┘     └──────────────┘     └──────────────┘         │
│         │                                           │                │
│         ▼                                           ▼                │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                    HUMAN REVIEW QUEUE                     │       │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │       │
│  │  │ Expert AI   │  │ Customer    │  │ Platform    │        │       │
│  │  │ Consultant  │  │ Team        │  │ Auto-approve│        │       │
│  │  │ $150-300/hr │  │ Self-serve  │  │ (low risk)  │        │       │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │       │
│  └──────────────────────────────────────────────────────────┘       │
│         │                                           │                │
│         ▼                                           ▼                │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐         │
│  │  REMEDIATION │────▶│  VALIDATION  │────▶│  DEPLOYMENT  │         │
│  │  AGENTS 2b   │     │  AGENTS 2b   │     │  2b          │         │
│  │ • Refactor   │     │ • Test run   │     │ • PR create  │         │
│  │ • Consolidate│     │ • Type check │     │ • Auto-merge │         │
│  │ • Rename     │     │ • AI review  │     │ • Schedule   │         │
│  │ • Restructure│     │ • Human sign │     │ • Rollback   │         │
│  └──────────────┘     └──────────────┘     └──────────────┘         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Agent Types

### 1. Detection Agents — ✅ Built (OSS packages)

The platform evaluates code using **9 Core AI-Readiness Metrics**:

| Metric                  | Category   | Focus                                         |
| ----------------------- | ---------- | --------------------------------------------- |
| **Cognitive Load**      | Complexity | Human/AI comprehension ease                   |
| **AI Signal Clarity**   | Semantics  | Clarity of intent and domain concepts         |
| **Agent Grounding**     | Context    | Traceability from code to requirements        |
| **Pattern Entropy**     | Structural | Consistency of implementation patterns        |
| **Concept Cohesion**    | Structural | Logical grouping of related functionality     |
| **Testability Index**   | Quality    | Ease of automated verification                |
| **Documentation Drift** | Context    | Alignment between code and documentation      |
| **Dependency Health**   | Structural | Fragility and fragmentation of imports        |
| **Semantic Distance**   | Semantics  | Consistency of terminology across the project |

### 2. Analysis Agents — Phase 2a

| Agent                | Input                     | Output                                         |
| -------------------- | ------------------------- | ---------------------------------------------- |
| **Impact Agent**     | Detection results         | Token savings estimate, AI comprehension delta |
| **Risk Agent**       | File list + test coverage | Risk level, breaking change probability        |
| **Dependency Agent** | File graph                | Safe refactoring order, affected files         |

### 3. Prioritization Agent — Phase 2a

- **ROI Calculator:** Ranks issues by impact/effort ratio.
- **Cost Impact Agent:** Quantifies token waste × API pricing to show real dollar savings.
- **Effort Estimator:** Predicts time and complexity per fix.
- **Auto-Scheduler:** Builds remediation sprint plan.

### 4. Remediation Agents — Phase 2b

| Agent                   | Action                             |
| ----------------------- | ---------------------------------- |
| **Refactor Agent**      | Consolidates duplicate code        |
| **Rename Agent**        | Standardizes naming conventions    |
| **Restructure Agent**   | Flattens deep import chains        |
| **Documentation Agent** | Updates docs to match code changes |

### 5. Validation Agents — Phase 2b

| Agent               | Check                                     |
| ------------------- | ----------------------------------------- |
| **Test Agent**      | Runs test suite, reports failures         |
| **Type Agent**      | TypeScript type checking (`tsc --noEmit`) |
| **AI-Review Agent** | LLM reviews change for correctness        |
| **Human Sign-off**  | Queues for human approval                 |

---

## Human-in-the-Loop Review Tiers

| Tier           | Who reviews        | When                    | SLA        | Cost        |
| -------------- | ------------------ | ----------------------- | ---------- | ----------- |
| **Auto**       | Platform rules     | Low risk, < 50 lines    | Instant    | Included    |
| **Team**       | Customer's team    | Medium risk, any size   | Self-serve | Included    |
| **Expert**     | AIReady consultant | High risk, architecture | 24–48h     | $150–300/hr |
| **Enterprise** | Dedicated engineer | Critical systems        | 4h SLA     | Contract    |

### Risk Classification

```typescript
interface RemediationRisk {
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    linesChanged: number; // <50: low, 50-200: medium, >200: high
    filesAffected: number; // 1-3: low, 4-10: medium, >10: high
    testCoverage: number; // >80%: low, 50-80%: medium, <50%: high
    hasTypeCheck: boolean; // true: reduces risk
    isPublicAPI: boolean; // true: increases risk
    dependencyDepth: number; // deeper = higher risk
  };
  autoApprovalEligible: boolean; // low risk + all rules met
}
```

---

---

## Revenue Model: Hybrid SaaS

### Tier 1: Free (OSS)
- Local CLI & core detection agents.
- Static visualization & HTML exports.
- Community support.

### Tier 2: Pro ($49/mo)
- **Trends & Benchmarks:** Historical tracking and industry comparisons.
- **Cost Impact Dashboard:** Real-time visibility into AI token waste.
- **Team Collaboration:** Shared dashboards and member management.
- **CI/CD Integration:** Automated scan uploads on every PR.

### Tier 3: Enterprise ($499+/mo)
- **Managed Remediation:** Agents fix detected issues (Phase 2b).
- **Human-in-the-Loop:** Expert oversight for critical architectural changes.
- **SSO & RBAC:** Enterprise-grade security and access control.
- **Priority SLAs:** 4h response for critical remediations.

---

## Strategic Moats (Why We Win)

1. **The Data Moat:** Analyzing thousands of repos creates the world's best dataset for "AI-Ready Code," making our benchmarks unbeatable.
2. **ROI-Driven Selling:** We don't sell "Code Quality"; we sell **AI Cost Efficiency** and **Developer Velocity**.
3. **The "Prettier" Strategy:** Position AIReady as the standard, expected infra for any repository used with AI assistants.

---

## Competitive Positioning

| Feature                      | AIReady | SonarQube | Cursor  | Copilot |
| ---------------------------- | ------- | --------- | ------- | ------- |
| AI-specific debt detection   | ✅      | ❌        | ❌      | ❌      |
| Semantic duplicate detection | ✅      | ❌        | ❌      | ❌      |
| Context budget optimization  | ✅      | ❌        | ❌      | ❌      |
| Automated remediation        | ✅      | ❌        | Partial | ❌      |
| Human expert review          | ✅      | ❌        | ❌      | ❌      |
| Continuous monitoring        | ✅      | ✅        | ❌      | ❌      |
| Team benchmarking            | ✅      | Partial   | ❌      | ❌      |

---

## Agentic Tech Stack

- **Framework:** [Mastra](https://mastra.ai/) — For building agentic workflows, memory, and tool integration.
- **Runtime:** AWS Lambda + SQS (async remediation batches).
- **Storage:** DynamoDB (remediation state + risk logs) + S3 (code diffs).
- **LLMs:** Claude 3.5 Sonnet (for complex refactoring), GPT-4o (for validation).

---

## Phase 2 Go-to-Market

### Months 1–2: MVP Agentic Platform (Current Focus)

- [ ] **Mastra Integration:** Set up the agentic framework in `packages/agents`.
- [ ] Build remediation agents (consolidate, rename, restructure) using Mastra workflows.
- [ ] Implement human review queue UI in the platform dashboard.
- [ ] Create risk classification system for auto-approval.
- [ ] Auto-PR creation for approved fixes.

### Months 3–4: Expert Network Launch

- [ ] Recruit 3–5 AI engineering consultants.
- [ ] Build consultant dashboard for oversight.
- [ ] Implement billing/time tracking for expert reviews.
- [ ] Launch "AI Code Health Check" service ($499 one-time).

### Months 5–6: Enterprise Features

- [ ] Custom remediation policies.
- [ ] Jira/Linear integration.
- [ ] Slack/Teams notifications.
- [ ] White-label reports.

---

_Last updated: 2026-03-06_
