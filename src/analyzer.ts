import { readFileSync } from 'fs';
import { scanFiles, runBatchAnalysis } from '@aiready/core';
import { detectDefensivePatterns } from './detector';
import { calculateContractEnforcementScore } from './scoring';
import type {
  ContractEnforcementOptions,
  ContractEnforcementReport,
  DetectionResult,
  PatternCounts,
} from './types';
import { ZERO_COUNTS } from './types';

export async function analyzeContractEnforcement(
  options: ContractEnforcementOptions
): Promise<ContractEnforcementReport> {
  const files = await scanFiles({
    ...options,
    include: options.include || ['**/*.{ts,tsx,js,jsx}'],
  });

  const allIssues: ContractEnforcementReport['issues'] = [];
  const aggregate: PatternCounts = { ...ZERO_COUNTS };
  let totalLines = 0;

  await runBatchAnalysis(
    files,
    'scanning for defensive patterns',
    'contract-enforcement',
    options.onProgress,
    async (f: string) => {
      let code: string;
      try {
        code = readFileSync(f, 'utf-8');
      } catch {
        return { issues: [], counts: { ...ZERO_COUNTS }, totalLines: 0 };
      }
      return detectDefensivePatterns(f, code, options.minChainDepth ?? 3);
    },
    (result: DetectionResult) => {
      allIssues.push(...result.issues);
      totalLines += result.totalLines;
      for (const key of Object.keys(aggregate) as Array<keyof PatternCounts>) {
        aggregate[key] += result.counts[key];
      }
    }
  );

  const totalPatterns = Object.values(aggregate).reduce((a, b) => a + b, 0);
  const density =
    totalLines > 0 ? Math.round((totalPatterns / totalLines) * 10000) / 10 : 0;

  const scoreResult = calculateContractEnforcementScore(
    aggregate,
    totalLines,
    files.length
  );

  return {
    summary: {
      sourceFiles: files.length,
      totalDefensivePatterns: totalPatterns,
      defensiveDensity: density,
      score: scoreResult.score,
      rating: scoreResult.rating,
      dimensions: {
        typeEscapeHatchScore: scoreResult.dimensions
          .typeEscapeHatchScore as number,
        fallbackCascadeScore: scoreResult.dimensions
          .fallbackCascadeScore as number,
        errorTransparencyScore: scoreResult.dimensions
          .errorTransparencyScore as number,
        boundaryValidationScore: scoreResult.dimensions
          .boundaryValidationScore as number,
      },
    },
    issues: allIssues,
    rawData: { ...aggregate, sourceFiles: files.length, totalLines },
    recommendations: scoreResult.recommendations,
  };
}
