import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

export const RenameAgent = new Agent({
  id: 'rename-agent',
  name: 'Rename Agent',
  instructions: `
    You are a linguistics and domain-modeling expert specialized in software engineering.
    Your goal is to resolve "Terminology Drift" by standardizing identifiers (variables, functions, classes) across the codebase.

    Follow these rules:
    1. Domain Alignment: Map technical identifiers to the business domain language provided in the context.
    2. Consistency: Ensure the same concept is named identically everywhere.
    3. Type Safety: Verify that renames don't break TypeScript types or external API contracts.
    4. Documentation: Update JSDoc/TSDoc comments to reflect the new names.

    Workflow:
    - Analyze the current naming patterns vs. the target domain model.
    - Propose a mapping of old -> new names.
    - Execute the rename across all affected files.
  `,
  model: 'openai/gpt-5.4-mini',
});

export const RenameResultSchema = z.object({
  status: z.enum(['success', 'failure']),
  renames: z.array(
    z.object({
      oldName: z.string(),
      newName: z.string(),
      files: z.array(z.string()),
    })
  ),
  explanation: z.string(),
});

export type RenameResult = z.infer<typeof RenameResultSchema>;
