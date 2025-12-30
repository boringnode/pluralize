<div align="center">

[![typescript-image]][typescript-url]
[![npm-image]][npm-url]
[![npm-download-image]][npm-download-url]
[![license-image]][license-url]

</div>

`@boringnode/pluralize` is a TypeScript port of the pluralization features from [Doctrine Inflector](https://github.com/doctrine/inflector).

Built-in support for:
- **English** (`en`, `english`)
- **French** (`fr`, `french`)

> [!NOTE]
> Changes to inflection rules (adding, removing, or modifying rules) will not be considered as breaking changes.

## Installation

```sh
npm install @boringnode/pluralize
```

## Usage

### Simple Functions

The easiest way to use the library is with the simple functions.

```ts
import { pluralize, singularize } from '@boringnode/pluralize'

pluralize('word') // 'words'
pluralize('person') // 'people'
pluralize('child') // 'children'

singularize('words') // 'word'
singularize('people') // 'person'
singularize('children') // 'child'
```

### Using a Different Locale

You can create an `Inflector` instance with a different locale.

```ts
import { Inflector } from '@boringnode/pluralize'

const inflector = new Inflector('fr')

inflector.pluralize('cheval')   // 'chevaux'
inflector.pluralize('bijou')    // 'bijoux'
inflector.singularize('chevaux') // 'cheval'
```

### Custom Rules with Inflector Class

You can create an `Inflector` instance to add custom rules.

```ts
import { Inflector } from '@boringnode/pluralize'

const inflector = new Inflector()
  .addIrregular('gex', 'gexes')
  .addUninflected('pokemon')
  .addPluralRule(/(.*)gon$/i, '$1gons')
  .addSingularRule(/(.*)gons$/i, '$1gon')

inflector.pluralize('gex') // 'gexes'
inflector.pluralize('pokemon') // 'pokemon'
inflector.singularize('dragons') // 'dragon'
```

### Creating a Custom Language Ruleset

You can create and register custom language rulesets for other languages.

```ts
import { Inflector, type LanguageRuleset } from '@boringnode/pluralize'
import {
  pattern,
  Patterns,
  Substitutions,
  Transformations,
} from '@boringnode/pluralize/builder'

const SpanishRuleset: LanguageRuleset = {
  getSingularRuleset: () => ({
    regular: new Transformations([
      { pattern: pattern('es$'), replacement: '' },
      { pattern: pattern('s$'), replacement: '' },
    ]),
    uninflected: new Patterns([pattern('lunes'), pattern('martes')]),
    irregular: new Substitutions([{ from: 'hombres', to: 'hombre' }]),
  }),
  getPluralRuleset: () => ({
    regular: new Transformations([
      { pattern: pattern('[aeiou]$'), replacement: '$&s' },
      { pattern: pattern('$'), replacement: 'es' },
    ]),
    uninflected: new Patterns([pattern('lunes'), pattern('martes')]),
    irregular: new Substitutions([{ from: 'hombre', to: 'hombres' }]),
  }),
}

// Register the ruleset
Inflector.register('es', SpanishRuleset)

// Use it
const inflector = new Inflector('es')
inflector.pluralize('gato') // 'gatos'
```

## API

### Functions

- `pluralize(word: string): string` - Returns the plural form of a word
- `singularize(word: string): string` - Returns the singular form of a word

### Inflector Class

| Method                                  | Description                                                 |
| --------------------------------------- | ----------------------------------------------------------- |
| `new Inflector(locale?: string)`        | Creates a new inflector instance (defaults to `'en'`)       |
| `Inflector.register(locale, ruleset)`   | Registers a custom language ruleset                         |
| `pluralize(word)`                       | Returns the plural form of a word                           |
| `singularize(word)`                     | Returns the singular form of a word                         |
| `addIrregular(singular, plural)`        | Adds an irregular word mapping                              |
| `addUninflected(word)`                  | Adds a word that doesn't change between singular and plural |
| `addPluralRule(pattern, replacement)`   | Adds a custom pluralization rule                            |
| `addSingularRule(pattern, replacement)` | Adds a custom singularization rule                          |

### Builder Exports (`@boringnode/pluralize/builder`)

For creating custom language rulesets:

| Export            | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `pattern`         | Helper function to create a case-insensitive regex       |
| `Patterns`        | A collection of patterns for uninflected words           |
| `Transformation`  | Interface: `{ pattern: RegExp, replacement: string }`    |
| `Transformations` | A collection of transformations                          |
| `Substitution`    | Interface: `{ from: string, to: string }`                |
| `Substitutions`   | A collection of substitutions                            |
| `Ruleset`         | Interface: `{ regular, uninflected, irregular }`         |

[npm-image]: https://img.shields.io/npm/v/@boringnode/pluralize.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/@boringnode/pluralize
[npm-download-image]: https://img.shields.io/npm/dm/@boringnode/pluralize?style=for-the-badge
[npm-download-url]: https://www.npmjs.com/package/@boringnode/pluralize
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: https://www.typescriptlang.org
[license-image]: https://img.shields.io/npm/l/@boringnode/pluralize?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md
