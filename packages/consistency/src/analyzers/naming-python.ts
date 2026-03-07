/**
 * Python Naming Analyzer - PEP 8 Compliant
 *
 * Analyzes Python code for PEP 8 naming convention violations
 * https://peps.python.org/pep-0008/#naming-conventions
 */

import { getParser, Severity } from '@aiready/core';
import type { NamingIssue } from '../types';

/**
 * Analyze Python files for PEP 8 naming violations
 */
export async function analyzePythonNaming(
  files: string[]
): Promise<NamingIssue[]> {
  const issues: NamingIssue[] = [];
  const parser = getParser('dummy.py'); // Get Python parser instance

  if (!parser) {
    console.warn('Python parser not available');
    return issues;
  }

  // Filter to only Python files
  const pythonFiles = files.filter((f) => f.toLowerCase().endsWith('.py'));

  for (const file of pythonFiles) {
    try {
      const fs = await import('fs');
      const code = await fs.promises.readFile(file, 'utf-8');
      const result = parser.parse(code, file);

      // Analyze each export for naming violations
      for (const exp of result.exports) {
        const nameIssue = checkPythonNaming(
          exp.name,
          exp.type,
          file,
          exp.loc?.start.line || 0
        );
        if (nameIssue) {
          issues.push(nameIssue);
        }
      }

      // Analyze imports for naming issues (optional, less critical)
      for (const imp of result.imports) {
        for (const spec of imp.specifiers) {
          if (spec !== '*' && spec !== 'default') {
            const nameIssue = checkPythonNaming(
              spec,
              'variable',
              file,
              imp.loc?.start.line || 0
            );
            if (nameIssue) {
              issues.push(nameIssue);
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Skipping ${file} due to error:`, error);
    }
  }

  return issues;
}

/**
 * Check a Python identifier against PEP 8 conventions
 */
function checkPythonNaming(
  identifier: string,
  type: string,
  file: string,
  line: number
): NamingIssue | null {
  // Get naming conventions from parser
  const parser = getParser('dummy.py');
  const conventions = parser?.getNamingConventions();
  if (!conventions) return null;

  // Skip special methods and exceptions
  if (conventions.exceptions?.includes(identifier)) {
    return null;
  }

  // Check based on type
  if (type === 'class') {
    // Classes should be PascalCase
    if (!conventions.classPattern.test(identifier)) {
      return {
        type: 'poor-naming',
        identifier,
        file,
        line,
        column: 0,
        severity: Severity.Major,
        category: 'naming',
        suggestion: `Class names should use PascalCase (e.g., ${toPascalCase(identifier)})`,
      };
    }
  } else if (type === 'function') {
    // Functions should be snake_case
    if (!conventions.functionPattern.test(identifier)) {
      // Check if it's incorrectly using camelCase
      if (/^[a-z][a-zA-Z0-9]*$/.test(identifier) && /[A-Z]/.test(identifier)) {
        return {
          type: 'convention-mix',
          identifier,
          file,
          line,
          column: 0,
          severity: Severity.Major,
          category: 'naming',
          suggestion: `Function names should use snake_case, not camelCase (e.g., ${toSnakeCase(identifier)})`,
        };
      }
    }
  } else if (type === 'const' || type === 'variable') {
    // Check if it looks like a constant (all uppercase)
    if (identifier === identifier.toUpperCase() && identifier.length > 1) {
      // Constants should be UPPER_CASE_WITH_UNDERSCORES
      if (!conventions.constantPattern.test(identifier)) {
        return {
          type: 'poor-naming',
          identifier,
          file,
          line,
          column: 0,
          severity: Severity.Minor,
          category: 'naming',
          suggestion: 'Constants should use UPPER_CASE_WITH_UNDERSCORES',
        };
      }
    } else {
      // Regular variables should be snake_case
      if (!conventions.variablePattern.test(identifier)) {
        // Check if it's using camelCase (common mistake from JS/TS developers)
        if (
          /^[a-z][a-zA-Z0-9]*$/.test(identifier) &&
          /[A-Z]/.test(identifier)
        ) {
          return {
            type: 'convention-mix',
            identifier,
            file,
            line,
            column: 0,
            severity: Severity.Major,
            category: 'naming',
            suggestion: `Variable names should use snake_case, not camelCase (e.g., ${toSnakeCase(identifier)})`,
          };
        }
      }
    }
  }

  return null;
}

/**
 * Convert camelCase to snake_case
 */
function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

/**
 * Convert snake_case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Detect common Python anti-patterns in naming
 */
export function detectPythonNamingAntiPatterns(
  _files: string[]
): NamingIssue[] {
  const issues: NamingIssue[] = [];

  // Parameter currently unused; reference to avoid lint warnings
  void _files;

  // Anti-pattern 1: Using camelCase in Python (common for JS/TS developers)
  // Anti-pattern 2: Using PascalCase for functions
  // Anti-pattern 3: Not using leading underscore for private methods
  // Anti-pattern 4: Using single letter names outside of comprehensions

  // These will be implemented as we refine the analyzer

  return issues;
}
