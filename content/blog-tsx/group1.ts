import BeyondTheSidekick from './beyond-the-sidekick';
import beyondTheSidekickMeta from './beyond-the-sidekick.meta';
import TheEconomicMoat from './the-economic-moat';
import theEconomicMoatMeta from './the-economic-moat.meta';
import TheNeuralSpine from './the-neural-spine';
import theNeuralSpineMeta from './the-neural-spine.meta';
import ClosingTheLoop from './closing-the-loop';
import closingTheLoopMeta from './closing-the-loop.meta';
import CognitiveTiering from './cognitive-tiering';
import cognitiveTieringMeta from './cognitive-tiering.meta';
import ResilienceFortress from './resilience-fortress';
import resilienceFortressMeta from './resilience-fortress.meta';
import ObservabilityIntelligence from './observability-intelligence';
import observabilityIntelligenceMeta from './observability-intelligence.meta';
import HumanAgentCoManagement from './human-agent-co-management';
import humanAgentCoManagementMeta from './human-agent-co-management.meta';
import RecursiveSafety from './recursive-safety';
import recursiveSafetyMeta from './recursive-safety.meta';
import RoadmapToAutonomy from './roadmap-to-autonomy';
import roadmapToAutonomyMeta from './roadmap-to-autonomy.meta';
import LivingRepository from './living-repository';
import livingRepositoryMeta from './living-repository.meta';
import TheAgenticWall from './the-agentic-wall';
import theAgenticWallMeta from './the-agentic-wall.meta';
import FutureHumanFriendlyCode from './future-human-friendly-code';
import futureHumanFriendlyCodeMeta from './future-human-friendly-code.meta';
import VisualizingInvisible from './visualizing-invisible';
import visualizingInvisibleMeta from './visualizing-invisible.meta';
import InvisibleCodebase from './invisible-codebase';
import invisibleCodebaseMeta from './invisible-codebase.meta';
import AiCodeDebtTsunami from './ai-code-debt-tsunami';
import aiCodeDebtTsunamiMeta from './ai-code-debt-tsunami.meta';
import MetricsThatMatter from './metrics-that-actually-matter';
import metricsThatMatterMeta from './metrics-that-actually-matter.meta';
import SemanticDuplicateDetection from './semantic-duplicate-detection';
import semanticDuplicateDetectionMeta from './semantic-duplicate-detection.meta';
import HiddenCostImportChains from './hidden-cost-import-chains';
import hiddenCostImportChainsMeta from './hidden-cost-import-chains.meta';
import { createPostEntry, type BlogPostEntry } from './posts-registry';

export const group1Posts: BlogPostEntry[] = [
  createPostEntry(beyondTheSidekickMeta, BeyondTheSidekick),
  createPostEntry(theEconomicMoatMeta, TheEconomicMoat),
  createPostEntry(theNeuralSpineMeta, TheNeuralSpine),
  createPostEntry(closingTheLoopMeta, ClosingTheLoop),
  createPostEntry(cognitiveTieringMeta, CognitiveTiering),
  createPostEntry(resilienceFortressMeta, ResilienceFortress),
  createPostEntry(observabilityIntelligenceMeta, ObservabilityIntelligence),
  createPostEntry(humanAgentCoManagementMeta, HumanAgentCoManagement),
  createPostEntry(recursiveSafetyMeta, RecursiveSafety),
  createPostEntry(roadmapToAutonomyMeta, RoadmapToAutonomy),
  createPostEntry(livingRepositoryMeta, LivingRepository),
  createPostEntry(theAgenticWallMeta, TheAgenticWall),
  createPostEntry(futureHumanFriendlyCodeMeta, FutureHumanFriendlyCode),
  createPostEntry(visualizingInvisibleMeta, VisualizingInvisible),
  createPostEntry(invisibleCodebaseMeta, InvisibleCodebase),
  createPostEntry(aiCodeDebtTsunamiMeta, AiCodeDebtTsunami),
  createPostEntry(metricsThatMatterMeta, MetricsThatMatter),
  createPostEntry(semanticDuplicateDetectionMeta, SemanticDuplicateDetection),
  createPostEntry(hiddenCostImportChainsMeta, HiddenCostImportChains),
];
