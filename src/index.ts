import { ToolRegistry } from '@aiready/core';
import { CONTRACT_ENFORCEMENT_PROVIDER } from './provider';

ToolRegistry.register(CONTRACT_ENFORCEMENT_PROVIDER);

export { analyzeContractEnforcement } from './analyzer';
export { calculateContractEnforcementScore } from './scoring';
export { detectDefensivePatterns } from './detector';
export { CONTRACT_ENFORCEMENT_PROVIDER };
export type {
  ContractEnforcementOptions,
  ContractEnforcementReport,
  ContractEnforcementIssue,
  PatternCounts,
  DefensivePattern,
  DetectionResult,
} from './types';
