import { Command } from 'commander';
import { contextActionHandler } from './cli-action';

/**
 * Define the context analysis command structure.
 * Separating this from the execution logic helps reduce context overhead.
 *
 * @param program - Commander program instance to attach the command to.
 */
export function defineContextCommand(program: Command): void {
  program
    .name('aiready-context')
    .description('Analyze AI context window cost and code structure')
    .version('0.1.0')
    .addHelpText(
      'after',
      '\nCONFIGURATION:\n  Supports config files: aiready.json, aiready.config.json, .aiready.json, .aireadyrc.json, aiready.config.js, .aireadyrc.js\n  CLI options override config file settings'
    )
    .argument('<directory>', 'Directory to analyze')
    .option('--max-depth <number>', 'Maximum acceptable import depth')
    .option(
      '--max-context <number>',
      'Maximum acceptable context budget (tokens)'
    )
    .option(
      '--min-cohesion <number>',
      'Minimum acceptable cohesion score (0-1)'
    )
    .option(
      '--max-fragmentation <number>',
      'Maximum acceptable fragmentation (0-1)'
    )
    .option(
      '--focus <type>',
      'Analysis focus: fragmentation, cohesion, depth, all'
    )
    .option('--include-node-modules', 'Include node_modules in analysis')
    .option(
      '--include <patterns>',
      'File patterns to include (comma-separated)'
    )
    .option(
      '--exclude <patterns>',
      'File patterns to exclude (comma-separated)'
    )
    .option(
      '--max-results <number>',
      'Maximum number of results to show in console output'
    )
    .option(
      '-o, --output <format>',
      'Output format: console, json, html',
      'console'
    )
    .option('--output-file <path>', 'Output file path (for json/html)')
    .option(
      '--interactive',
      'Run interactive setup to suggest excludes and focus areas'
    )
    .action(contextActionHandler);
}
