/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import type { Patterns } from './patterns.js'
import type { Substitutions } from './substitutions.js'
import type { Transformations } from './transformations.js'

export interface Ruleset {
  readonly regular: Transformations
  readonly uninflected: Patterns
  readonly irregular: Substitutions
}
