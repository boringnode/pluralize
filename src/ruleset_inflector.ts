/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import type { Ruleset } from './ruleset.js'

/**
 * Inflects based on multiple rulesets.
 *
 * Rules:
 * - If the word matches any uninflected word pattern, it is not inflected
 * - The first ruleset that returns a different value for an irregular word wins
 * - The first ruleset that returns a different value for a regular word wins
 * - If none of the above match, the word is left as-is
 */
export class RulesetInflector {
  readonly #rulesets: Ruleset[]

  constructor(rulesets: Ruleset[]) {
    this.#rulesets = rulesets
  }

  inflect(word: string): string {
    if (word === '') {
      return ''
    }

    for (const ruleset of this.#rulesets) {
      if (ruleset.uninflected.matches(word)) {
        return word
      }

      const irregularInflected = ruleset.irregular.inflect(word)
      if (irregularInflected !== word) {
        return irregularInflected
      }

      const regularInflected = ruleset.regular.inflect(word)
      if (regularInflected !== word) {
        return regularInflected
      }
    }

    return word
  }
}
