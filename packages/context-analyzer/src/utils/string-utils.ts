/**
 * Converts an English plural word to its singular form.
 * Used for normalizing module names and file paths during dependency analysis.
 * Handles common irregular plurals and regular -s/-es endings.
 *
 * @param word - The plural word to convert to singular form
 * @returns The singular form of the word (e.g., 'children' -> 'child')
 */
export function singularize(word: string): string {
  const irregulars: Record<string, string> = {
    people: 'person',
    children: 'child',
    men: 'man',
    women: 'woman',
  };
  if (irregulars[word]) return irregulars[word];
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('ses')) return word.slice(0, -2);
  if (word.endsWith('s') && word.length > 3) return word.slice(0, -1);
  return word;
}
