/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import { pattern } from '../../pattern.js'

function getDefault(): RegExp[] {
  return []
}

export function getSingular(): RegExp[] {
  return [...getDefault(), pattern('bois'), pattern('mas')]
}

export function getPlural(): RegExp[] {
  return [...getDefault()]
}
