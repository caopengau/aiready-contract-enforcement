import { describe, it, expect } from 'vitest';
import { ContractEnforcementProvider } from '../provider';
import { ToolName } from '@aiready/core';

describe('ContractEnforcementProvider', () => {
  it('has correct tool ID', () => {
    expect(ContractEnforcementProvider.id).toBe(ToolName.ContractEnforcement);
  });

  it('has aliases', () => {
    expect(ContractEnforcementProvider.alias).toContain('contract');
    expect(ContractEnforcementProvider.alias).toContain('ce');
  });

  it('has default weight', () => {
    expect(ContractEnforcementProvider.defaultWeight).toBe(10);
  });

  it('has analyze function', () => {
    expect(typeof ContractEnforcementProvider.analyze).toBe('function');
  });

  it('has score function', () => {
    expect(typeof ContractEnforcementProvider.score).toBe('function');
  });
});
