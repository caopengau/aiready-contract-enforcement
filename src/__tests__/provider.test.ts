import { describe, it, expect } from 'vitest';
import { CONTRACT_ENFORCEMENT_PROVIDER } from '../provider';
import { ToolName } from '@aiready/core';

describe('CONTRACT_ENFORCEMENT_PROVIDER', () => {
  it('has correct tool ID', () => {
    expect(CONTRACT_ENFORCEMENT_PROVIDER.id).toBe(ToolName.ContractEnforcement);
  });

  it('has aliases', () => {
    expect(CONTRACT_ENFORCEMENT_PROVIDER.alias).toContain('contract');
    expect(CONTRACT_ENFORCEMENT_PROVIDER.alias).toContain('ce');
  });

  it('has default weight', () => {
    expect(CONTRACT_ENFORCEMENT_PROVIDER.defaultWeight).toBe(10);
  });

  it('has analyze function', () => {
    expect(typeof CONTRACT_ENFORCEMENT_PROVIDER.analyze).toBe('function');
  });

  it('has score function', () => {
    expect(typeof CONTRACT_ENFORCEMENT_PROVIDER.score).toBe('function');
  });
});
