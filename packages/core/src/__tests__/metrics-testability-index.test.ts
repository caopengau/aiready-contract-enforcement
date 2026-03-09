import { describe, it, expect } from 'vitest';
import { calculateTestabilityIndex } from '../metrics/testability-index';

describe('Testability Index Metric', () => {
  it('should calculate safe rating for high coverage and framework', () => {
    const result = calculateTestabilityIndex({
      testFiles: 50,
      sourceFiles: 100,
      pureFunctions: 80,
      totalFunctions: 100,
      injectionPatterns: 5,
      totalClasses: 5,
      bloatedInterfaces: 0,
      totalInterfaces: 10,
      externalStateMutations: 5,
      hasTestFramework: true,
    });

    expect(result.score).toBeGreaterThan(70);
    expect(result.aiChangeSafetyRating).toBe('safe');
  });

  it('should calculate blind-risk for zero tests', () => {
    const result = calculateTestabilityIndex({
      testFiles: 0,
      sourceFiles: 100,
      pureFunctions: 10,
      totalFunctions: 100,
      injectionPatterns: 0,
      totalClasses: 5,
      bloatedInterfaces: 5,
      totalInterfaces: 10,
      externalStateMutations: 50,
      hasTestFramework: false,
    });

    expect(result.aiChangeSafetyRating).toBe('blind-risk');
    expect(
      result.recommendations.some((r) => r.includes('Add a testing framework'))
    ).toBe(true);
  });
});
