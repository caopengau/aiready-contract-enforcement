import McpSuperpowersContextAware from './mcp-superpowers-context-aware';
import mcpSuperpowersContextAwareMeta from './mcp-superpowers-context-aware.meta';
import McpSuperpowersCustomTools from './mcp-superpowers-custom-tools';
import mcpSuperpowersCustomToolsMeta from './mcp-superpowers-custom-tools.meta';
import McpSuperpowersOrchestrationLoop from './mcp-superpowers-orchestration-loop';
import mcpSuperpowersOrchestrationLoopMeta from './mcp-superpowers-orchestration-loop.meta';
import AgenticRoiNavigationTax from './agentic-roi-navigation-tax';
import agenticRoiNavigationTaxMeta from './agentic-roi-navigation-tax.meta';
import AgenticRoiTokenRoi from './agentic-roi-token-roi';
import agenticRoiTokenRoiMeta from './agentic-roi-token-roi.meta';
import AgenticRoiTalentMoat from './agentic-roi-talent-moat';
import agenticRoiTalentMoatMeta from './agentic-roi-talent-moat.meta';
import TenMinuteAiAudit from './10-minute-ai-audit';
import tenMinuteAiAuditMeta from './10-minute-ai-audit.meta';
import EclawnomyPart1 from './eclawnomy-part-1';
import eclawnomyPart1Meta from './eclawnomy-part-1.meta';
import EclawnomyPart2 from './eclawnomy-part-2';
import eclawnomyPart2Meta from './eclawnomy-part-2.meta';
import EclawnomyPart3 from './eclawnomy-part-3';
import eclawnomyPart3Meta from './eclawnomy-part-3.meta';
import EclawnomyPart4 from './eclawnomy-part-4';
import eclawnomyPart4Meta from './eclawnomy-part-4.meta';
import TheTokenTax from './the-token-tax';
import theTokenTaxMeta from './the-token-tax.meta';
import The9Metrics from './the-9-metrics';
import the9MetricsMeta from './the-9-metrics.meta';
import LivingDocumentation from './living-documentation';
import livingDocumentationMeta from './living-documentation.meta';
import ArchitectingForAgents from './architecting-for-agents';
import architectingForAgentsMeta from './architecting-for-agents.meta';
import TheReadinessScorecard from './the-readiness-scorecard';
import readinessScorecardMeta from './readiness-scorecard.meta';
import GettingStartedWithAireadyCli from './getting-started-with-aiready-cli';
import gettingStartedWithAireadyCliMeta from './getting-started-with-aiready-cli.meta';
import WhyAiCodingAssistantsGetWorse from './why-ai-coding-assistants-get-worse';
import whyAiCodingAssistantsGetWorseMeta from './why-ai-coding-assistants-get-worse.meta';
import MultiHumanMultiAgentCollaboration from './multi-human-multi-agent-collaboration';
import multiHumanMultiAgentCollaborationMeta from './multi-human-multi-agent-collaboration.meta';
import { createPostEntry, type BlogPostEntry } from './posts-registry';

export const group2Posts: BlogPostEntry[] = [
  createPostEntry(mcpSuperpowersContextAwareMeta, McpSuperpowersContextAware),
  createPostEntry(mcpSuperpowersCustomToolsMeta, McpSuperpowersCustomTools),
  createPostEntry(
    mcpSuperpowersOrchestrationLoopMeta,
    McpSuperpowersOrchestrationLoop
  ),
  createPostEntry(agenticRoiNavigationTaxMeta, AgenticRoiNavigationTax),
  createPostEntry(agenticRoiTokenRoiMeta, AgenticRoiTokenRoi),
  createPostEntry(agenticRoiTalentMoatMeta, AgenticRoiTalentMoat),
  createPostEntry(tenMinuteAiAuditMeta, TenMinuteAiAudit),
  createPostEntry(eclawnomyPart1Meta, EclawnomyPart1),
  createPostEntry(eclawnomyPart2Meta, EclawnomyPart2),
  createPostEntry(eclawnomyPart3Meta, EclawnomyPart3),
  createPostEntry(eclawnomyPart4Meta, EclawnomyPart4),
  createPostEntry(theTokenTaxMeta, TheTokenTax),
  createPostEntry(the9MetricsMeta, The9Metrics),
  createPostEntry(livingDocumentationMeta, LivingDocumentation),
  createPostEntry(architectingForAgentsMeta, ArchitectingForAgents),
  createPostEntry(readinessScorecardMeta, TheReadinessScorecard),
  createPostEntry(
    gettingStartedWithAireadyCliMeta,
    GettingStartedWithAireadyCli
  ),
  createPostEntry(
    whyAiCodingAssistantsGetWorseMeta,
    WhyAiCodingAssistantsGetWorse
  ),
  createPostEntry(
    multiHumanMultiAgentCollaborationMeta,
    MultiHumanMultiAgentCollaboration
  ),
];
