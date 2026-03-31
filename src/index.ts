import { ToolRegistry } from '@aiready/core';
import { CONTRACT_ENFORCEMENT_PROVIDER } from './provider';

// Register with global registry
ToolRegistry.register(CONTRACT_ENFORCEMENT_PROVIDER);

export * from './types';
export * from './analyzer';
export { CONTRACT_ENFORCEMENT_PROVIDER };
