/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

/**
 * Creates a case-insensitive regex pattern for word matching.
 */
export function pattern(value: string | RegExp): RegExp {
  if (value instanceof RegExp) {
    return value
  }

  return new RegExp(value, 'i')
}
