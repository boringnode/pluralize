/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

export interface Transformation {
  readonly pattern: RegExp
  readonly replacement: string
}
