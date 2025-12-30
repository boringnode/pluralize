/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import { Patterns } from '../../patterns.js'
import type { Ruleset } from '../../ruleset.js'
import { Substitutions } from '../../substitutions.js'
import { Transformations } from '../../transformations.js'
import * as Inflectible from './inflectible.js'
import * as Uninflected from './uninflected.js'

export function getSingularRuleset(): Ruleset {
  return {
    regular: new Transformations(Inflectible.getSingular()),
    uninflected: new Patterns(Uninflected.getSingular()),
    irregular: new Substitutions(Inflectible.getIrregular()).getFlippedSubstitutions(),
  }
}

export function getPluralRuleset(): Ruleset {
  return {
    regular: new Transformations(Inflectible.getPlural()),
    uninflected: new Patterns(Uninflected.getPlural()),
    irregular: new Substitutions(Inflectible.getIrregular()),
  }
}
