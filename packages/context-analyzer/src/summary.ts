import type {
  ContextAnalysisResult,
  ContextSummary,
  ModuleCluster,
} from './types';
import { GLOBAL_SCAN_OPTIONS } from '@aiready/core';
import { calculatePathEntropy } from './metrics';

/**
 * Generate summary of context analysis results
 *
 * @param results - Array of individual file analysis results.
 * @param options - Optional scan configuration for context extraction.
 * @returns A consolidated summary of the entire context scan.
 */
export function generateSummary(
  results: ContextAnalysisResult[],
  options: any = {}
): ContextSummary {
  const config = options
    ? Object.fromEntries(
        Object.entries(options).filter(
          ([key]) => !GLOBAL_SCAN_OPTIONS.includes(key) || key === 'rootDir'
        )
      )
    : {};

  const totalFiles = results.length;
  const totalTokens = results.reduce((sum, r) => sum + r.tokenCost, 0);
  const avgContextBudget =
    totalFiles > 0
      ? results.reduce((sum, r) => sum + r.contextBudget, 0) / totalFiles
      : 0;

  // Find deep files
  const deepFiles = results
    .filter((r) => r.importDepth > 5)
    .map((r) => ({ file: r.file, depth: r.importDepth }));

  const maxImportDepth = Math.max(0, ...results.map((r) => r.importDepth));

  // Find fragmented modules (clusters)
  const moduleMap = new Map<string, ContextAnalysisResult[]>();
  results.forEach((r) => {
    const parts = r.file.split('/');
    // Try to identify domain/module (e.g., packages/core, src/utils)
    let domain = 'root';
    if (parts.length > 2) {
      domain = parts.slice(0, 2).join('/');
    }
    if (!moduleMap.has(domain)) moduleMap.set(domain, []);
    moduleMap.get(domain)!.push(r);
  });

  const fragmentedModules: ModuleCluster[] = [];
  moduleMap.forEach((files, domain) => {
    const clusterTokens = files.reduce((sum, f) => sum + f.tokenCost, 0);
    const filePaths = files.map((f) => f.file);
    const avgEntropy = calculatePathEntropy(filePaths);

    // A module is fragmented if it has many files with high directory distance
    // and relatively low cohesion
    const fragmentationScore = Math.min(1, avgEntropy * (files.length / 10));

    if (fragmentationScore > 0.4) {
      fragmentedModules.push({
        domain,
        files: filePaths,
        fragmentationScore,
        totalTokens: clusterTokens,
        avgCohesion:
          files.reduce((sum, f) => sum + f.cohesionScore, 0) / files.length,
        suggestedStructure: {
          targetFiles: Math.ceil(files.length / 2),
          consolidationPlan: [
            `Consolidate ${files.length} files in ${domain} into fewer modules`,
          ],
        },
      });
    }
  });

  fragmentedModules.sort((a, b) => b.fragmentationScore - a.fragmentationScore);

  const avgFragmentation =
    fragmentedModules.length > 0
      ? fragmentedModules.reduce((sum, m) => sum + m.fragmentationScore, 0) /
        fragmentedModules.length
      : 0;

  // Cohesion
  const avgCohesion =
    results.reduce((sum, r) => sum + r.cohesionScore, 0) / (totalFiles || 1);

  const lowCohesionFiles = results
    .filter((r) => r.cohesionScore < 0.4)
    .map((r) => ({ file: r.file, score: r.cohesionScore }));

  // Issues
  const criticalIssues = results.filter(
    (r) => r.severity === 'critical'
  ).length;
  const majorIssues = results.filter((r) => r.severity === 'major').length;
  const minorIssues = results.filter((r) => r.severity === 'minor').length;

  const totalPotentialSavings = results.reduce(
    (sum, r) => sum + (r.potentialSavings || 0),
    0
  );

  const topExpensiveFiles = [...results]
    .sort((a, b) => b.contextBudget - a.contextBudget)
    .slice(0, 10)
    .map((r) => ({
      file: r.file,
      contextBudget: r.contextBudget,
      severity: r.severity,
    }));

  return {
    totalFiles,
    totalTokens,
    avgContextBudget,
    maxContextBudget: Math.max(0, ...results.map((r) => r.contextBudget)),
    avgImportDepth:
      results.reduce((sum, r) => sum + r.importDepth, 0) / (totalFiles || 1),
    maxImportDepth,
    deepFiles,
    avgFragmentation,
    fragmentedModules,
    avgCohesion,
    lowCohesionFiles,
    criticalIssues,
    majorIssues,
    minorIssues,
    totalPotentialSavings,
    topExpensiveFiles,
    config,
  };
}
