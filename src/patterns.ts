/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

/**
 * Combines multiple patterns into a single regex for matching uninflected words.
 */
export class Patterns {
  readonly #regex: RegExp

  constructor(patterns: RegExp[]) {
    const combined = patterns.map((p) => p.source).join('|')
    this.#regex = new RegExp(`^(?:${combined})$`, 'i')
  }

  matches(word: string): boolean {
    return this.#regex.test(word)
  }
}
