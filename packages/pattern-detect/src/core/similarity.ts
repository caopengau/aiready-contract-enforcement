/**
 * Calculate Jaccard similarity between two token arrays.
 *
 * @param tokens1 - First set of tokens.
 * @param tokens2 - Second set of tokens.
 * @returns Normalized similarity score (0-1).
 * @lastUpdated 2026-03-18
 */
export function jaccardSimilarity(
  tokens1: string[],
  tokens2: string[]
): number {
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  if (set1.size === 0 && set2.size === 0) return 0;

  let intersection = 0;
  for (const token of set1) {
    if (set2.has(token)) intersection++;
  }

  const union = set1.size + set2.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
