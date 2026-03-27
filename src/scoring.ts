import type { PatternCounts, ScoreResult } from './types';

const DIMENSION_WEIGHTS = {
  typeEscapeHatch: 0.35,
  fallbackCascade: 0.25,
  errorTransparency: 0.2,
  boundaryValidation: 0.2,
};

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function calculateContractEnforcementScore(
  counts: PatternCounts,
  totalLines: number,
  _fileCount: number
): ScoreResult {
  const loc = Math.max(1, totalLines);

  const typeEscapeCount =
    counts['as-any'] +
    counts['as-unknown'] +
    counts['any-parameter'] +
    counts['any-return'];
  const fallbackCount =
    counts['deep-optional-chain'] + counts['nullish-literal-default'];
  const errorCount = counts['swallowed-error'];
  const boundaryCount = counts['env-fallback'] + counts['unnecessary-guard'];

  // Density: patterns per 1000 LOC
  const typeDensity = (typeEscapeCount / loc) * 1000;
  const fallbackDensity = (fallbackCount / loc) * 1000;
  const errorDensity = (errorCount / loc) * 1000;
  const boundaryDensity = (boundaryCount / loc) * 1000;

  // Dimension scores: 100 = no patterns, 0 = very high density
  // Adjusted to be more lenient - many defensive patterns are valid practices
  const typeEscapeHatchScore = clamp(100 - typeDensity * 10, 0, 100);
  const fallbackCascadeScore = clamp(100 - fallbackDensity * 8, 0, 100);
  const errorTransparencyScore = clamp(100 - errorDensity * 15, 0, 100);
  const boundaryValidationScore = clamp(100 - boundaryDensity * 7, 0, 100);

  const score = Math.round(
    typeEscapeHatchScore * DIMENSION_WEIGHTS.typeEscapeHatch +
      fallbackCascadeScore * DIMENSION_WEIGHTS.fallbackCascade +
      errorTransparencyScore * DIMENSION_WEIGHTS.errorTransparency +
      boundaryValidationScore * DIMENSION_WEIGHTS.boundaryValidation
  );

  const rating =
    score >= 90
      ? 'excellent'
      : score >= 75
        ? 'good'
        : score >= 60
          ? 'moderate'
          : score >= 40
            ? 'needs-work'
            : 'critical';

  const recommendations: string[] = [];
  if (typeEscapeHatchScore < 60) {
    recommendations.push(
      `Reduce type escape hatches (${typeEscapeCount} found): define proper types at system boundaries instead of \`as any\`/parameter \`any\`.`
    );
  }
  if (fallbackCascadeScore < 60) {
    recommendations.push(
      `Reduce fallback cascades (${fallbackCount} found): enforce non-nullable types at the source so consumers don't need \`?.\`/?? fallbacks.`
    );
  }
  if (errorTransparencyScore < 60) {
    recommendations.push(
      `Fix swallowed errors (${errorCount} found): log or propagate errors so failures are visible.`
    );
  }
  if (boundaryValidationScore < 60) {
    recommendations.push(
      `Add boundary validation (${boundaryCount} gaps): use a Zod schema for env vars and API inputs instead of inline fallbacks.`
    );
  }

  return {
    score,
    rating,
    dimensions: {
      typeEscapeHatchScore: Math.round(typeEscapeHatchScore),
      fallbackCascadeScore: Math.round(fallbackCascadeScore),
      errorTransparencyScore: Math.round(errorTransparencyScore),
      boundaryValidationScore: Math.round(boundaryValidationScore),
    },
    recommendations,
  };
}
