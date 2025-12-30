/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import { pattern } from '../../pattern.js'
import type { Substitution } from '../../substitution.js'
import type { Transformation } from '../../transformation.js'

export function getSingular(): Transformation[] {
  return [
    { pattern: pattern('(b|cor|ém|gemm|soupir|trav|vant|vitr)aux$'), replacement: '$1ail' },
    { pattern: pattern('ails$'), replacement: 'ail' },
    { pattern: pattern('(journ|chev|loc)aux$'), replacement: '$1al' },
    {
      pattern: pattern('(bijou|caillou|chou|genou|hibou|joujou|pou|au|eu|eau)x$'),
      replacement: '$1',
    },
    { pattern: pattern('s$'), replacement: '' },
  ]
}

export function getPlural(): Transformation[] {
  return [
    { pattern: pattern('(s|x|z)$'), replacement: '$1' },
    { pattern: pattern('(b|cor|ém|gemm|soupir|trav|vant|vitr)ail$'), replacement: '$1aux' },
    { pattern: pattern('ail$'), replacement: 'ails' },
    { pattern: pattern('(chacal|carnaval|festival|récital)$'), replacement: '$1s' },
    { pattern: pattern('al$'), replacement: 'aux' },
    { pattern: pattern('(bleu|émeu|landau|pneu|sarrau)$'), replacement: '$1s' },
    {
      pattern: pattern('(bijou|caillou|chou|genou|hibou|joujou|lieu|pou|au|eu|eau)$'),
      replacement: '$1x',
    },
    { pattern: pattern('$'), replacement: 's' },
  ]
}

export function getIrregular(): Substitution[] {
  return [
    { from: 'monsieur', to: 'messieurs' },
    { from: 'madame', to: 'mesdames' },
    { from: 'mademoiselle', to: 'mesdemoiselles' },
  ]
}
