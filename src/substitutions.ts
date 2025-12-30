/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import type { Substitution } from './substitution.js'

/**
 * Handles irregular word substitutions (e.g., "man" -> "men").
 */
export class Substitutions {
  readonly #substitutions: Map<string, Substitution>

  constructor(substitutions: Substitution[] = []) {
    this.#substitutions = new Map()

    for (const substitution of substitutions) {
      this.#substitutions.set(substitution.from, substitution)
    }
  }

  getFlippedSubstitutions(): Substitutions {
    const flipped: Substitution[] = []

    for (const substitution of this.#substitutions.values()) {
      flipped.push({ from: substitution.to, to: substitution.from })
    }

    return new Substitutions(flipped)
  }

  inflect(value: string): string {
    const lowerWord = value.toLowerCase()
    const substitution = this.#substitutions.get(lowerWord)

    if (substitution) {
      const firstLetterUppercase = lowerWord[0] !== value[0]
      const toWord = substitution.to

      if (firstLetterUppercase) {
        return toWord[0].toUpperCase() + toWord.slice(1)
      }

      return toWord
    }

    return value
  }
}
