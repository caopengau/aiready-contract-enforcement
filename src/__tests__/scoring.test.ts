import { describe, it, expect } from 'vitest';
import { calculateContractEnforcementScore } from '../scoring';
import { ZERO_COUNTS } from '../types';

describe('calculateContractEnforcementScore', () => {
  it('returns 100 with no defensive patterns', () => {
    const result = calculateContractEnforcementScore(ZERO_COUNTS, 1000, 10);
    expect(result.score).toBe(100);
    expect(result.rating).toBe('excellent');
  });

  it('returns lower score with many as-any patterns', () => {
    const counts = { ...ZERO_COUNTS, 'as-any': 50 };
    const result = calculateContractEnforcementScore(counts, 1000, 10);
    expect(result.score).toBeLessThan(100);
    expect(result.dimensions.typeEscapeHatchScore).toBeLessThan(100);
  });

  it('returns lower score with many swallowed errors', () => {
    const counts = { ...ZERO_COUNTS, 'swallowed-error': 10 };
    const result = calculateContractEnforcementScore(counts, 1000, 10);
    expect(result.score).toBeLessThan(100);
    expect(result.dimensions.errorTransparencyScore).toBeLessThan(100);
  });

  it('scores boundary validation correctly', () => {
    const counts = {
      ...ZERO_COUNTS,
      'env-fallback': 20,
      'unnecessary-guard': 10,
    };
    const result = calculateContractEnforcementScore(counts, 1000, 10);
    expect(result.dimensions.boundaryValidationScore).toBeLessThan(100);
  });

  it('generates recommendations for low-scoring dimensions', () => {
    const counts = {
      ...ZERO_COUNTS,
      'as-any': 30,
      'swallowed-error': 10,
    };
    const result = calculateContractEnforcementScore(counts, 1000, 10);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('handles zero LOC without division errors', () => {
    const result = calculateContractEnforcementScore(ZERO_COUNTS, 0, 0);
    expect(result.score).toBe(100);
    expect(isNaN(result.score)).toBe(false);
  });

  it('rates correctly across thresholds', () => {
    // Excellent (>= 90)
    expect(
      calculateContractEnforcementScore(ZERO_COUNTS, 1000, 10).rating
    ).toBe('excellent');
  });
});
