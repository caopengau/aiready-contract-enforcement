import { describe, it, expect } from 'vitest';
import { calculateAgentGrounding } from '../metrics/agent-grounding';

describe('Agent Grounding Metric', () => {
  it('should calculate excellent score for well-structured codebases', () => {
    const result = calculateAgentGrounding({
      deepDirectories: 0,
      totalDirectories: 5,
      vagueFileNames: 0,
      totalFiles: 20,
      hasRootReadme: true,
      readmeIsFresh: true,
      barrelExports: 2,
      untypedExports: 0,
      totalExports: 50,
      inconsistentDomainTerms: 0,
      domainVocabularySize: 10,
    });

    expect(result.score).toBeGreaterThan(90);
    expect(result.rating).toBe('excellent');
  });

  it('should calculate disorienting score for poor structure', () => {
    const result = calculateAgentGrounding({
      deepDirectories: 10,
      totalDirectories: 10,
      vagueFileNames: 20,
      totalFiles: 20,
      hasRootReadme: false,
      readmeIsFresh: false,
      barrelExports: 0,
      untypedExports: 50,
      totalExports: 50,
      inconsistentDomainTerms: 25,
      domainVocabularySize: 25,
    });

    expect(result.score).toBeLessThan(30);
    expect(result.rating).toBe('disorienting');
    expect(result.recommendations.some((r) => r.includes('README.md'))).toBe(
      true
    );
  });
});
