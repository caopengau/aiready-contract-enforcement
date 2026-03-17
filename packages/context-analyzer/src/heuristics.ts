import { DependencyNode } from './types';

/**
 * Detect if a file is a barrel export (index.ts)
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file matches barrel export patterns.
 */
export function isBarrelExport(node: DependencyNode): boolean {
  const { file, exports } = node;
  const fileName = file.split('/').pop()?.toLowerCase();

  const isIndexFile = fileName === 'index.ts' || fileName === 'index.js';
  const isSmallAndManyExports =
    node.tokenCost < 1000 && (exports || []).length > 5;

  const isReexportPattern =
    (exports || []).length >= 5 &&
    (exports || []).every((e) =>
      ['const', 'function', 'type', 'interface'].includes(e.type)
    );

  return !!isIndexFile || !!isSmallAndManyExports || !!isReexportPattern;
}

/**
 * Detect if a file is primarily type definitions
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file contains primarily types or matches type paths.
 */
export function isTypeDefinition(node: DependencyNode): boolean {
  const { file } = node;
  if (file.endsWith('.d.ts')) return true;

  const nodeExports = node.exports || [];
  const hasExports = nodeExports.length > 0;
  const areAllTypes =
    hasExports &&
    nodeExports.every((e) => e.type === 'type' || e.type === 'interface');

  const isTypePath = /\/(types|interfaces|models)\//i.test(file);
  return !!areAllTypes || (isTypePath && hasExports);
}

/**
 * Detect if a file is a utility module.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file path or name suggests a utility/helper role.
 */
export function isUtilityModule(node: DependencyNode): boolean {
  const { file } = node;
  const isUtilPath = /\/(utils|helpers|util|helper)\//i.test(file);
  const fileName = file.split('/').pop()?.toLowerCase() || '';
  const isUtilName = /(utils\.|helpers\.|util\.|helper\.)/i.test(fileName);
  return isUtilPath || isUtilName;
}

/**
 * Detect if a file is a Lambda/API handler.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file serves as a coordination point for requests/lambdas.
 */
export function isLambdaHandler(node: DependencyNode): boolean {
  const { file, exports } = node;
  const fileName = file.split('/').pop()?.toLowerCase() || '';
  const handlerPatterns = [
    'handler',
    '.handler.',
    '-handler.',
    'lambda',
    '.lambda.',
    '-lambda.',
  ];
  const isHandlerName = handlerPatterns.some((p) => fileName.includes(p));
  const isHandlerPath = /\/(handlers|lambdas|lambda|functions)\//i.test(file);
  const hasHandlerExport = (exports || []).some(
    (e) =>
      ['handler', 'main', 'lambdahandler'].includes(e.name.toLowerCase()) ||
      e.name.toLowerCase().endsWith('handler')
  );
  return isHandlerName || isHandlerPath || hasHandlerExport;
}

/**
 * Detect if a file is a service file.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file orchestrates logic or matches service patterns.
 */
export function isServiceFile(node: DependencyNode): boolean {
  const { file, exports } = node;
  const fileName = file.split('/').pop()?.toLowerCase() || '';
  const servicePatterns = ['service', '.service.', '-service.', '_service.'];
  const isServiceName = servicePatterns.some((p) => fileName.includes(p));
  const isServicePath = file.toLowerCase().includes('/services/');
  const hasServiceNamedExport = (exports || []).some((e) =>
    e.name.toLowerCase().includes('service')
  );
  const hasClassExport = (exports || []).some((e) => e.type === 'class');
  return (
    isServiceName || isServicePath || (hasServiceNamedExport && hasClassExport)
  );
}

/**
 * Detect if a file is an email template/layout.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file is used for rendering notifications or emails.
 */
export function isEmailTemplate(node: DependencyNode): boolean {
  const { file, exports } = node;
  const fileName = file.split('/').pop()?.toLowerCase() || '';
  const emailPatterns = [
    '-email-',
    '.email.',
    '_email_',
    '-template',
    '.template.',
    '_template',
    '-mail.',
    '.mail.',
  ];
  const isEmailName = emailPatterns.some((p) => fileName.includes(p));
  const isEmailPath = /\/(emails|mail|notifications)\//i.test(file);
  const hasTemplateFunction = (exports || []).some(
    (e) =>
      e.type === 'function' &&
      (e.name.toLowerCase().startsWith('render') ||
        e.name.toLowerCase().startsWith('generate'))
  );
  return isEmailPath || isEmailName || hasTemplateFunction;
}

/**
 * Detect if a file is a parser/transformer.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file handles data conversion or serialization.
 */
export function isParserFile(node: DependencyNode): boolean {
  const { file, exports } = node;
  const fileName = file.split('/').pop()?.toLowerCase() || '';
  const parserPatterns = [
    'parser',
    '.parser.',
    '-parser.',
    '_parser.',
    'transform',
    'converter',
    'mapper',
    'serializer',
  ];
  const isParserName = parserPatterns.some((p) => fileName.includes(p));
  const isParserPath = /\/(parsers|transformers)\//i.test(file);
  const hasParseFunction = (exports || []).some(
    (e) =>
      e.type === 'function' &&
      (e.name.toLowerCase().startsWith('parse') ||
        e.name.toLowerCase().startsWith('transform'))
  );
  return isParserName || isParserPath || hasParseFunction;
}

/**
 * Detect if a file is a session/state management file.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file manages application state or sessions.
 */
export function isSessionFile(node: DependencyNode): boolean {
  const { file, exports } = node;
  const fileName = file.split('/').pop()?.toLowerCase() || '';
  const sessionPatterns = ['session', 'state', 'context', 'store'];
  const isSessionName = sessionPatterns.some((p) => fileName.includes(p));
  const isSessionPath = /\/(sessions|state)\//i.test(file);
  const hasSessionExport = (exports || []).some((e) =>
    ['session', 'state', 'store'].some((p) => e.name.toLowerCase().includes(p))
  );
  return isSessionName || isSessionPath || hasSessionExport;
}

/**
 * Detect if a file is a Next.js App Router page.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file is a Next.js page or metadata entry.
 */
export function isNextJsPage(node: DependencyNode): boolean {
  const { file, exports } = node;
  const lowerPath = file.toLowerCase();
  const fileName = file.split('/').pop()?.toLowerCase() || '';

  const isInAppDir =
    lowerPath.includes('/app/') || lowerPath.startsWith('app/');
  if (!isInAppDir || (fileName !== 'page.tsx' && fileName !== 'page.ts'))
    return false;

  const hasDefaultExport = (exports || []).some((e) => e.type === 'default');
  const nextJsExports = [
    'metadata',
    'generatemetadata',
    'faqjsonld',
    'jsonld',
    'icon',
  ];
  const hasNextJsExport = (exports || []).some((e) =>
    nextJsExports.includes(e.name.toLowerCase())
  );

  return hasDefaultExport || hasNextJsExport;
}

/**
 * Detect if a file is a configuration or schema file.
 *
 * @param node - The dependency node to analyze.
 * @returns True if the file matches configuration, setting, or schema patterns.
 */
export function isConfigFile(node: DependencyNode): boolean {
  const { file, exports } = node;
  const lowerPath = file.toLowerCase();
  const fileName = file.split('/').pop()?.toLowerCase() || '';

  const configPatterns = [
    '.config.',
    'tsconfig',
    'jest.config',
    'package.json',
    'aiready.json',
    'next.config',
    'sst.config',
  ];
  const isConfigName = configPatterns.some((p) => fileName.includes(p));
  const isConfigPath = /\/(config|settings|schemas)\//i.test(lowerPath);
  const hasSchemaExport = (exports || []).some((e) =>
    ['schema', 'config', 'setting'].some((p) =>
      e.name.toLowerCase().includes(p)
    )
  );

  return isConfigName || isConfigPath || hasSchemaExport;
}
