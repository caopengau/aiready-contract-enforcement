/**
 * Business Value Metrics Module
 *
 * Provides business-aligned metrics that quantify ROI and survive technology changes.
 */

import type { ToolScoringOutput } from './scoring';
import {
  calculateTokenBudget,
  estimateCostFromBudget,
} from './business/cost-metrics';
import { calculateProductivityImpact } from './business/productivity-metrics';
import { getModelPreset } from './business/pricing-models';

export * from './business/pricing-models';
export * from './business/cost-metrics';
export * from './business/productivity-metrics';
export * from './business/risk-metrics';
export * from './business/comprehension-metrics';

/**
 * Historical score entry for trend tracking
 */
export interface ScoreHistoryEntry {
  timestamp: string;
  overallScore: number;
  breakdown: Record<string, number>;
  totalIssues: number;
  totalTokens: number;
}

/**
 * Trend analysis comparing current vs historical scores
 */
export interface ScoreTrend {
  direction: 'improving' | 'stable' | 'degrading';
  change30Days: number;
  change90Days: number;
  velocity: number; // points per week
  projectedScore: number; // 30-day projection
}

/**
 * Calculate Aggregate Business ROI
 */
export function calculateBusinessROI(params: {
  tokenWaste: number;
  issues: { severity: string }[];
  developerCount?: number;
  modelId?: string;
}): {
  monthlySavings: number;
  productivityGainHours: number;
  annualValue: number;
} {
  const model = getModelPreset(params.modelId || 'claude-4.6');
  const devCount = params.developerCount || 5;

  const budget = calculateTokenBudget({
    totalContextTokens: params.tokenWaste * 2.5,
    wastedTokens: {
      duplication: params.tokenWaste * 0.7,
      fragmentation: params.tokenWaste * 0.3,
      chattiness: 0,
    },
  });

  const cost = estimateCostFromBudget(budget, model, {
    developerCount: devCount,
  });
  const productivity = calculateProductivityImpact(params.issues);

  const monthlySavings = cost.total;
  const productivityGainHours = productivity.totalHours;
  const annualValue = (monthlySavings + productivityGainHours * 75) * 12;

  return {
    monthlySavings: Math.round(monthlySavings),
    productivityGainHours: Math.round(productivityGainHours),
    annualValue: Math.round(annualValue),
  };
}

/**
 * Format cost for display
 */
export function formatCost(cost: number): string {
  if (cost < 1) {
    return `$${cost.toFixed(2)}`;
  } else if (cost < 1000) {
    return `$${cost.toFixed(0)}`;
  } else {
    return `$${(cost / 1000).toFixed(1)}k`;
  }
}

/**
 * Format hours for display
 */
export function formatHours(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`;
  } else if (hours < 8) {
    return `${hours.toFixed(1)}h`;
  } else if (hours < 40) {
    return `${Math.round(hours)}h`;
  } else {
    return `${(hours / 40).toFixed(1)} weeks`;
  }
}

import type { TechnicalValueChain } from './types';

/**
 * Format acceptance rate for display
 */
export function formatAcceptanceRate(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

/**
 * Generate technical value chain for an issue (v0.12 legacy)
 */
export function generateValueChain(params: {
  issueType: string;
  count: number;
  severity: 'critical' | 'major' | 'minor';
}): TechnicalValueChain {
  const { issueType, count, severity } = params;

  const impacts: Record<string, any> = {
    'duplicate-pattern': {
      ai: 'Ambiguous context leads to code generation variants. AI picks wrong implementation 40% of the time.',
      dev: 'Developers must manually resolve conflicts between suggested variants.',
      risk: 'high',
    },
    'context-fragmentation': {
      ai: 'Context window overflow causes model to forget mid-file dependencies resulting in hallucinations.',
      dev: 'Slower AI responses and increased need for manual context pinning.',
      risk: 'critical',
    },
    'naming-inconsistency': {
      ai: 'Degraded intent inference. AI misidentifies domain concepts across file boundaries.',
      dev: 'Increased cognitive load for new devs during onboarding.',
      risk: 'moderate',
    },
  };

  const impact = impacts[issueType] || {
    ai: 'Reduced suggestion quality.',
    dev: 'Slowed development velocity.',
    risk: 'moderate',
  };

  const productivityLoss =
    severity === 'critical' ? 0.25 : severity === 'major' ? 0.1 : 0.05;

  return {
    issueType,
    technicalMetric: 'Issue Count',
    technicalValue: count,
    aiImpact: {
      description: impact.ai,
      scoreImpact: severity === 'critical' ? -15 : -5,
    },
    developerImpact: {
      description: impact.dev,
      productivityLoss,
    },
    businessOutcome: {
      directCost: count * 12,
      opportunityCost: productivityLoss * 15000,
      riskLevel: impact.risk as any,
    },
  };
}
