/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import type { Transformation } from './transformation.js'

/**
 * Applies transformation rules to inflect words.
 */
export class Transformations {
  readonly #transformations: Transformation[]

  constructor(transformations: Transformation[] = []) {
    this.#transformations = transformations
  }

  inflect(word: string): string {
    for (const transformation of this.#transformations) {
      if (transformation.pattern.test(word)) {
        return word.replace(transformation.pattern, transformation.replacement)
      }
    }

    return word
  }
}
