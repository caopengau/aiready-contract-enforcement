import { parse } from '@typescript-eslint/typescript-estree';
import { Severity, IssueType } from '@aiready/core';
import type {
  ContractEnforcementIssue,
  DetectionResult,
  DefensivePattern,
  PatternCounts,
} from './types';
import { ZERO_COUNTS } from './types';

function makeIssue(
  pattern: DefensivePattern,
  severity: Severity,
  message: string,
  filePath: string,
  line: number,
  column: number,
  context: string
): ContractEnforcementIssue {
  return {
    type: IssueType.ContractGap,
    severity,
    pattern,
    message,
    location: { file: filePath, line, column },
    context,
    suggestion: getSuggestion(pattern),
  };
}

function getSuggestion(pattern: DefensivePattern): string {
  switch (pattern) {
    case 'as-any':
      return 'Define a proper type or use type narrowing instead of `as any`.';
    case 'as-unknown':
      return 'Use a single validated type assertion or schema validation instead of `as unknown as`.';
    case 'deep-optional-chain':
      return 'Enforce a non-nullable type at the source to eliminate deep optional chaining.';
    case 'nullish-literal-default':
      return 'Define defaults in a typed config object rather than inline literal fallbacks.';
    case 'swallowed-error':
      return 'Log or propagate errors — silent catch blocks hide failures.';
    case 'env-fallback':
      return 'Use a validated env schema (e.g., Zod) to enforce required variables at startup.';
    case 'unnecessary-guard':
      return 'Make the parameter non-nullable in the type signature to eliminate the guard.';
    case 'any-parameter':
      return 'Define a proper type for this parameter instead of `any`.';
    case 'any-return':
      return 'Define a proper return type instead of `any`.';
  }
}

function getLineContent(code: string, line: number): string {
  const lines = code.split('\n');
  return (lines[line - 1] || '').trim().slice(0, 120);
}

function countOptionalChainDepth(node: any): number {
  let depth = 0;
  let current = node;
  while (current) {
    if (current.type === 'MemberExpression' && current.optional) {
      depth++;
      current = current.object;
    } else if (current.type === 'ChainExpression') {
      current = current.expression;
    } else if (current.type === 'CallExpression' && current.optional) {
      depth++;
      current = current.callee;
    } else {
      break;
    }
  }
  return depth;
}

function isLiteral(node: any): boolean {
  if (!node) return false;
  if (node.type === 'Literal') return true;
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0)
    return true;
  if (
    node.type === 'UnaryExpression' &&
    (node.operator === '-' || node.operator === '+')
  ) {
    return isLiteral(node.argument);
  }
  return false;
}

function isProcessEnvAccess(node: any): boolean {
  return (
    node?.type === 'MemberExpression' &&
    node.object?.type === 'MemberExpression' &&
    node.object.object?.name === 'process' &&
    node.object.property?.name === 'env'
  );
}

function isSwallowedCatch(body: any[]): boolean {
  if (body.length === 0) return true;
  if (body.length === 1) {
    const stmt = body[0];
    if (
      stmt.type === 'ExpressionStatement' &&
      stmt.expression?.type === 'CallExpression'
    ) {
      const callee = stmt.expression.callee;
      if (callee?.object?.name === 'console') return true;
    }
    if (stmt.type === 'ThrowStatement') return false;
  }
  return false;
}

export function detectDefensivePatterns(
  filePath: string,
  code: string,
  minChainDepth: number = 3
): DetectionResult {
  const issues: ContractEnforcementIssue[] = [];
  const counts: PatternCounts = { ...ZERO_COUNTS };
  const totalLines = code.split('\n').length;

  let ast: any;
  try {
    ast = parse(code, {
      filePath,
      loc: true,
      range: true,
      jsx: filePath.endsWith('x'),
    });
  } catch {
    return { issues, counts, totalLines };
  }

  const nodesAtFunctionStart = new WeakSet<any>();

  function markFunctionParamNodes(node: any) {
    if (
      node.type === 'FunctionDeclaration' ||
      node.type === 'FunctionExpression' ||
      node.type === 'ArrowFunctionExpression'
    ) {
      const body = node.body?.type === 'BlockStatement' ? node.body.body : null;
      if (body && body.length > 0) {
        nodesAtFunctionStart.add(body[0]);
      }
    }
  }

  function visit(node: any, _parent?: any, _keyInParent?: string) {
    if (!node || typeof node !== 'object') return;

    markFunctionParamNodes(node);

    // Pattern: as any
    if (
      node.type === 'TSAsExpression' &&
      node.typeAnnotation?.type === 'TSAnyKeyword'
    ) {
      counts['as-any']++;
      issues.push(
        makeIssue(
          'as-any',
          Severity.Major,
          '`as any` type assertion bypasses type safety',
          filePath,
          node.loc?.start.line ?? 0,
          node.loc?.start.column ?? 0,
          getLineContent(code, node.loc?.start.line ?? 0)
        )
      );
    }

    // Pattern: as unknown
    if (
      node.type === 'TSAsExpression' &&
      node.typeAnnotation?.type === 'TSUnknownKeyword'
    ) {
      counts['as-unknown']++;
      issues.push(
        makeIssue(
          'as-unknown',
          Severity.Major,
          '`as unknown` double-cast bypasses type safety',
          filePath,
          node.loc?.start.line ?? 0,
          node.loc?.start.column ?? 0,
          getLineContent(code, node.loc?.start.line ?? 0)
        )
      );
    }

    // Pattern: deep optional chaining
    if (node.type === 'ChainExpression') {
      const depth = countOptionalChainDepth(node);
      if (depth >= minChainDepth) {
        counts['deep-optional-chain']++;
        issues.push(
          makeIssue(
            'deep-optional-chain',
            Severity.Minor,
            `Optional chain depth of ${depth} indicates missing structural guarantees`,
            filePath,
            node.loc?.start.line ?? 0,
            node.loc?.start.column ?? 0,
            getLineContent(code, node.loc?.start.line ?? 0)
          )
        );
      }
    }

    // Pattern: nullish coalescing with literal default
    if (
      node.type === 'LogicalExpression' &&
      node.operator === '??' &&
      isLiteral(node.right)
    ) {
      counts['nullish-literal-default']++;
      issues.push(
        makeIssue(
          'nullish-literal-default',
          Severity.Minor,
          'Nullish coalescing with literal default suggests missing upstream type guarantee',
          filePath,
          node.loc?.start.line ?? 0,
          node.loc?.start.column ?? 0,
          getLineContent(code, node.loc?.start.line ?? 0)
        )
      );
    }

    // Pattern: swallowed error
    if (node.type === 'TryStatement' && node.handler) {
      const catchBody = node.handler.body?.body;
      if (catchBody && isSwallowedCatch(catchBody)) {
        counts['swallowed-error']++;
        issues.push(
          makeIssue(
            'swallowed-error',
            Severity.Major,
            'Error is swallowed in catch block — failures will be silent',
            filePath,
            node.handler.loc?.start.line ?? 0,
            node.handler.loc?.start.column ?? 0,
            getLineContent(code, node.handler.loc?.start.line ?? 0)
          )
        );
      }
    }

    // Pattern: process.env.X || default
    if (
      node.type === 'LogicalExpression' &&
      node.operator === '||' &&
      isProcessEnvAccess(node.left)
    ) {
      counts['env-fallback']++;
      issues.push(
        makeIssue(
          'env-fallback',
          Severity.Minor,
          'Environment variable with fallback — use a validated env schema instead',
          filePath,
          node.loc?.start.line ?? 0,
          node.loc?.start.column ?? 0,
          getLineContent(code, node.loc?.start.line ?? 0)
        )
      );
    }

    // Pattern: if (!x) return guard at function entry
    if (
      node.type === 'IfStatement' &&
      node.test?.type === 'UnaryExpression' &&
      node.test.operator === '!'
    ) {
      const consequent = node.consequent;
      let isReturn = false;
      if (consequent.type === 'ReturnStatement') {
        isReturn = true;
      } else if (
        consequent.type === 'BlockStatement' &&
        consequent.body?.length === 1 &&
        consequent.body[0].type === 'ReturnStatement'
      ) {
        isReturn = true;
      }
      if (isReturn && nodesAtFunctionStart.has(node)) {
        counts['unnecessary-guard']++;
        issues.push(
          makeIssue(
            'unnecessary-guard',
            Severity.Info,
            'Guard clause could be eliminated with non-nullable type at source',
            filePath,
            node.loc?.start.line ?? 0,
            node.loc?.start.column ?? 0,
            getLineContent(code, node.loc?.start.line ?? 0)
          )
        );
      }
    }

    // Pattern: any parameter type
    if (
      (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression') &&
      node.params
    ) {
      for (const param of node.params) {
        const typeAnno =
          param.typeAnnotation?.typeAnnotation ?? param.typeAnnotation;
        if (typeAnno?.type === 'TSAnyKeyword') {
          counts['any-parameter']++;
          issues.push(
            makeIssue(
              'any-parameter',
              Severity.Major,
              'Parameter typed as `any` bypasses type safety',
              filePath,
              param.loc?.start.line ?? 0,
              param.loc?.start.column ?? 0,
              getLineContent(code, param.loc?.start.line ?? 0)
            )
          );
        }
      }

      // Pattern: any return type
      const returnAnno = node.returnType?.typeAnnotation ?? node.returnType;
      if (returnAnno?.type === 'TSAnyKeyword') {
        counts['any-return']++;
        issues.push(
          makeIssue(
            'any-return',
            Severity.Major,
            'Return type is `any` — callers cannot rely on the result shape',
            filePath,
            node.returnType?.loc?.start.line ?? 0,
            node.returnType?.loc?.start.column ?? 0,
            getLineContent(code, node.returnType?.loc?.start.line ?? 0)
          )
        );
      }
    }

    // Recurse
    for (const key in node) {
      if (key === 'loc' || key === 'range' || key === 'parent') continue;
      const child = node[key];
      if (Array.isArray(child)) {
        for (const item of child) {
          if (item && typeof item.type === 'string') {
            visit(item, node, key);
          }
        }
      } else if (
        child &&
        typeof child === 'object' &&
        typeof child.type === 'string'
      ) {
        visit(child, node, key);
      }
    }
  }

  visit(ast);
  return { issues, counts, totalLines };
}
