import { ToolRegistry } from '@aiready/core';
import { ContractEnforcementProvider } from './provider';

ToolRegistry.register(ContractEnforcementProvider);

export { analyzeContractEnforcement } from './analyzer';
export { calculateContractEnforcementScore } from './scoring';
export { detectDefensivePatterns } from './detector';
export { ContractEnforcementProvider };
export type {
  ContractEnforcementOptions,
  ContractEnforcementReport,
  ContractEnforcementIssue,
  PatternCounts,
  DefensivePattern,
  DetectionResult,
} from './types';
