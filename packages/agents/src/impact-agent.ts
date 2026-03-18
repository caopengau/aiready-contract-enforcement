import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

export const ImpactAgent = new Agent({
  id: 'impact-agent',
  name: 'Impact Agent',
  instructions: `
    You are a financial analyst for AI infrastructure.
    Your goal is to estimate the Monthly Token Savings (in USD) for a specific code remediation.

    Analysis Logic:
    1. Base Cost: Assume an average developer interacts with this code 20 times/day via AI.
    2. Token Impact: Calculate token reduction based on "Cognitive Load" and "Context Window" savings.
    3. Model Pricing: Use a blended rate of $0.50 per 1M tokens (GPT-5.4-Mini/Gemini 3.1 Pro average).
    4. Formulas:
       - MonthlySavings = (TokensSavedPerInteraction * 20 * 22 days) * (Rate / 1,000,000)
    
    Output a JSON object with:
    - estimatedMonthlySavings: number (USD)
    - confidenceScore: number (0.0 to 1.0)
    - breakdown: string (explanation of the math)
  `,
  model: 'openai/gpt-5.4-mini',
});

export const ImpactSchema = z.object({
  estimatedMonthlySavings: z.number(),
  confidenceScore: z.number(),
  breakdown: z.string(),
});

export type ImpactResult = z.infer<typeof ImpactSchema>;
