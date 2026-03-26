import type { Issue, IssueType } from '@aiready/core';

export type DefensivePattern =
  | 'as-any'
  | 'as-unknown'
  | 'deep-optional-chain'
  | 'nullish-literal-default'
  | 'swallowed-error'
  | 'env-fallback'
  | 'unnecessary-guard'
  | 'any-parameter'
  | 'any-return';

export interface ContractEnforcementIssue extends Issue {
  type: IssueType.ContractGap;
  pattern: DefensivePattern;
  context: string;
}

export interface PatternCounts {
  'as-any': number;
  'as-unknown': number;
  'deep-optional-chain': number;
  'nullish-literal-default': number;
  'swallowed-error': number;
  'env-fallback': number;
  'unnecessary-guard': number;
  'any-parameter': number;
  'any-return': number;
}

export const ZERO_COUNTS: PatternCounts = {
  'as-any': 0,
  'as-unknown': 0,
  'deep-optional-chain': 0,
  'nullish-literal-default': 0,
  'swallowed-error': 0,
  'env-fallback': 0,
  'unnecessary-guard': 0,
  'any-parameter': 0,
  'any-return': 0,
};

export interface ContractEnforcementOptions {
  rootDir: string;
  include?: string[];
  exclude?: string[];
  onProgress?: (processed: number, total: number, message: string) => void;
  minChainDepth?: number;
}

export interface DetectionResult {
  issues: ContractEnforcementIssue[];
  counts: PatternCounts;
  totalLines: number;
}

export interface ScoreResult {
  score: number;
  rating: string;
  dimensions: Record<string, number>;
  recommendations: string[];
}

export interface ContractEnforcementReport {
  summary: {
    sourceFiles: number;
    totalDefensivePatterns: number;
    defensiveDensity: number;
    score: number;
    rating: string;
    dimensions: {
      typeEscapeHatchScore: number;
      fallbackCascadeScore: number;
      errorTransparencyScore: number;
      boundaryValidationScore: number;
    };
  };
  issues: ContractEnforcementIssue[];
  rawData: PatternCounts & { sourceFiles: number; totalLines: number };
  recommendations: string[];
}
