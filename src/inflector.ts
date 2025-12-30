/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import { pattern } from './pattern.js'
import { Patterns } from './patterns.js'
import type { Ruleset } from './ruleset.js'
import { RulesetInflector } from './ruleset_inflector.js'
import { Substitutions } from './substitutions.js'
import { Transformations } from './transformations.js'
import * as EnglishRules from './rules/english/rules.js'
import * as FrenchRules from './rules/french/rules.js'

/**
 * A language ruleset containing rules for both pluralization and singularization.
 */
export interface LanguageRuleset {
  getSingularRuleset(): Ruleset
  getPluralRuleset(): Ruleset
}

/**
 * Registry of language rulesets.
 */
const rulesetRegistry = new Map<string, LanguageRuleset>([
  ['en', EnglishRules],
  ['english', EnglishRules],
  ['fr', FrenchRules],
  ['french', FrenchRules],
])

export class Inflector {
  #singularRulesets: Ruleset[]
  #pluralRulesets: Ruleset[]
  #cache: Map<string, string> = new Map()

  /**
   * Register a language ruleset for a given locale.
   */
  static register(locale: string, ruleset: LanguageRuleset): void {
    rulesetRegistry.set(locale, ruleset)
  }

  constructor(locale: string = 'en') {
    const ruleset = rulesetRegistry.get(locale)

    if (!ruleset) {
      throw new Error(`Unknown locale "${locale}". Register it first with Inflector.register().`)
    }

    this.#singularRulesets = [ruleset.getSingularRuleset()]
    this.#pluralRulesets = [ruleset.getPluralRuleset()]
  }

  /**
   * Returns a word in plural form.
   */
  pluralize(value: string): string {
    const cacheKey = `plural:${value}`
    const cached = this.#cache.get(cacheKey)

    if (cached !== undefined) {
      return cached
    }

    const inflector = new RulesetInflector(this.#pluralRulesets)
    const result = inflector.inflect(value)

    this.#cache.set(cacheKey, result)

    return result
  }

  /**
   * Returns a word in singular form.
   */
  singularize(value: string): string {
    const cacheKey = `singular:${value}`
    const cached = this.#cache.get(cacheKey)

    if (cached !== undefined) {
      return cached
    }

    const inflector = new RulesetInflector(this.#singularRulesets)
    const result = inflector.inflect(value)

    this.#cache.set(cacheKey, result)

    return result
  }

  /**
   * Add an irregular word mapping (singular <-> plural).
   */
  addIrregular(singular: string, plural: string): this {
    this.#cache.clear()

    this.#pluralRulesets.unshift({
      regular: new Transformations(),
      uninflected: new Patterns([]),
      irregular: new Substitutions([{ from: singular, to: plural }]),
    })

    this.#singularRulesets.unshift({
      regular: new Transformations(),
      uninflected: new Patterns([]),
      irregular: new Substitutions([{ from: plural, to: singular }]),
    })

    return this
  }

  /**
   * Add an uninflected word (word that doesn't change between singular and plural).
   */
  addUninflected(value: string): this {
    this.#cache.clear()

    const ruleset: Ruleset = {
      regular: new Transformations(),
      uninflected: new Patterns([pattern(`^${value}$`)]),
      irregular: new Substitutions(),
    }

    this.#pluralRulesets.unshift(ruleset)
    this.#singularRulesets.unshift(ruleset)

    return this
  }

  /**
   * Add a custom pluralization rule.
   */
  addPluralRule(rule: RegExp, replacement: string): this {
    this.#cache.clear()

    this.#pluralRulesets.unshift({
      regular: new Transformations([{ pattern: rule, replacement }]),
      uninflected: new Patterns([]),
      irregular: new Substitutions(),
    })

    return this
  }

  /**
   * Add a custom singularization rule.
   */
  addSingularRule(rule: RegExp, replacement: string): this {
    this.#cache.clear()

    this.#singularRulesets.unshift({
      regular: new Transformations([{ pattern: rule, replacement }]),
      uninflected: new Patterns([]),
      irregular: new Substitutions(),
    })

    return this
  }
}

/**
 * Default English inflector instance used by the simple functions.
 */
const defaultInflector = new Inflector()

/**
 * Returns a word in plural form.
 */
export function pluralize(value: string): string {
  return defaultInflector.pluralize(value)
}

/**
 * Returns a word in singular form.
 */
export function singularize(value: string): string {
  return defaultInflector.singularize(value)
}
