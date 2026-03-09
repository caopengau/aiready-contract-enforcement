import { calculateDocDrift, ToolName } from '@aiready/core';
import type { ToolScoringOutput } from '@aiready/core';
import type { DocDriftReport } from './types';

/**
 * Convert doc-drift report into a ToolScoringOutput.
 */
export function calculateDocDriftScore(
  report: DocDriftReport
): ToolScoringOutput {
  const { rawData, summary } = report;

  // Recalculate using core math to get risk contribution breakdown
  const riskResult = calculateDocDrift({
    uncommentedExports: rawData.uncommentedExports,
    totalExports: rawData.totalExports,
    outdatedComments: rawData.outdatedComments,
    undocumentedComplexity: rawData.undocumentedComplexity,
  });

  const factors: ToolScoringOutput['factors'] = [
    {
      name: 'Uncommented Exports',
      impact: -Math.min(
        20,
        (rawData.uncommentedExports / Math.max(1, rawData.totalExports)) *
          100 *
          0.2
      ),
      description: `${rawData.uncommentedExports} uncommented exports`,
    },
    {
      name: 'Outdated Comments',
      impact: -Math.min(60, rawData.outdatedComments * 15 * 0.6),
      description: `${rawData.outdatedComments} outdated comments`,
    },
    {
      name: 'Undocumented Complexity',
      impact: -Math.min(20, rawData.undocumentedComplexity * 10 * 0.2),
      description: `${rawData.undocumentedComplexity} complex functions lack docs`,
    },
  ];

  const recommendations: ToolScoringOutput['recommendations'] =
    riskResult.recommendations.map((rec) => ({
      action: rec,
      estimatedImpact: 8,
      priority: summary.score < 50 ? 'high' : 'medium',
    }));

  return {
    toolName: ToolName.DocDrift,
    score: summary.score,
    rawMetrics: {
      ...rawData,
      rating: summary.rating,
    },
    factors,
    recommendations,
  };
}
