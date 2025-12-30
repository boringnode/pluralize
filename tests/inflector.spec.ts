/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import { test } from '@japa/runner'
import { Inflector, pluralize, singularize } from '../index.js'
import { Transformations, Patterns, Substitutions, pattern } from '../src/builder.js'

test.group('pluralize function', () => {
  test('pluralizes regular words', ({ assert }) => {
    assert.equal(pluralize('word'), 'words')
    assert.equal(pluralize('test'), 'tests')
    assert.equal(pluralize('cat'), 'cats')
    assert.equal(pluralize('dog'), 'dogs')
  })

  test('pluralizes words ending in s, x, z, ch, sh', ({ assert }) => {
    assert.equal(pluralize('bus'), 'buses')
    assert.equal(pluralize('box'), 'boxes')
    assert.equal(pluralize('quiz'), 'quizzes')
    assert.equal(pluralize('church'), 'churches')
    assert.equal(pluralize('wish'), 'wishes')
  })

  test('pluralizes words ending in consonant + y', ({ assert }) => {
    assert.equal(pluralize('city'), 'cities')
    assert.equal(pluralize('baby'), 'babies')
    assert.equal(pluralize('story'), 'stories')
  })

  test('pluralizes words ending in vowel + y', ({ assert }) => {
    assert.equal(pluralize('day'), 'days')
    assert.equal(pluralize('key'), 'keys')
    assert.equal(pluralize('toy'), 'toys')
  })

  test('pluralizes irregular words', ({ assert }) => {
    assert.equal(pluralize('person'), 'people')
    assert.equal(pluralize('man'), 'men')
    assert.equal(pluralize('child'), 'children')
    assert.equal(pluralize('foot'), 'feet')
    assert.equal(pluralize('tooth'), 'teeth')
    assert.equal(pluralize('goose'), 'geese')
    assert.equal(pluralize('mouse'), 'mice')
  })

  test('does not pluralize uninflected words', ({ assert }) => {
    assert.equal(pluralize('sheep'), 'sheep')
    assert.equal(pluralize('fish'), 'fish')
    assert.equal(pluralize('deer'), 'deer')
    assert.equal(pluralize('species'), 'species')
    assert.equal(pluralize('series'), 'series')
    assert.equal(pluralize('news'), 'news')
    assert.equal(pluralize('equipment'), 'equipment')
  })

  test('preserves case for first letter', ({ assert }) => {
    assert.equal(pluralize('Person'), 'People')
    assert.equal(pluralize('Man'), 'Men')
    assert.equal(pluralize('Child'), 'Children')
  })
})

test.group('singularize function', () => {
  test('singularizes regular words', ({ assert }) => {
    assert.equal(singularize('words'), 'word')
    assert.equal(singularize('tests'), 'test')
    assert.equal(singularize('cats'), 'cat')
    assert.equal(singularize('dogs'), 'dog')
  })

  test('singularizes words ending in es', ({ assert }) => {
    assert.equal(singularize('buses'), 'bus')
    assert.equal(singularize('boxes'), 'box')
    assert.equal(singularize('quizzes'), 'quiz')
    assert.equal(singularize('churches'), 'church')
    assert.equal(singularize('wishes'), 'wish')
  })

  test('singularizes words ending in ies', ({ assert }) => {
    assert.equal(singularize('cities'), 'city')
    assert.equal(singularize('babies'), 'baby')
    assert.equal(singularize('stories'), 'story')
  })

  test('singularizes irregular words', ({ assert }) => {
    assert.equal(singularize('people'), 'person')
    assert.equal(singularize('men'), 'man')
    assert.equal(singularize('children'), 'child')
    assert.equal(singularize('feet'), 'foot')
    assert.equal(singularize('teeth'), 'tooth')
    assert.equal(singularize('geese'), 'goose')
    assert.equal(singularize('mice'), 'mouse')
  })

  test('does not singularize uninflected words', ({ assert }) => {
    assert.equal(singularize('sheep'), 'sheep')
    assert.equal(singularize('fish'), 'fish')
    assert.equal(singularize('deer'), 'deer')
    assert.equal(singularize('species'), 'species')
    assert.equal(singularize('series'), 'series')
    assert.equal(singularize('news'), 'news')
  })

  test('preserves case for first letter', ({ assert }) => {
    assert.equal(singularize('People'), 'Person')
    assert.equal(singularize('Men'), 'Man')
    assert.equal(singularize('Children'), 'Child')
  })
})

test.group('Inflector class', () => {
  test('creates an instance and pluralizes', ({ assert }) => {
    const inflector = new Inflector()

    assert.equal(inflector.pluralize('word'), 'words')
    assert.equal(inflector.pluralize('person'), 'people')
  })

  test('creates an instance and singularizes', ({ assert }) => {
    const inflector = new Inflector()

    assert.equal(inflector.singularize('words'), 'word')
    assert.equal(inflector.singularize('people'), 'person')
  })

  test('adds irregular words', ({ assert }) => {
    const inflector = new Inflector().addIrregular('gex', 'gexes')

    assert.equal(inflector.pluralize('gex'), 'gexes')
    assert.equal(inflector.singularize('gexes'), 'gex')
  })

  test('adds uninflected words', ({ assert }) => {
    const inflector = new Inflector().addUninflected('pokemon')

    assert.equal(inflector.pluralize('pokemon'), 'pokemon')
    assert.equal(inflector.singularize('pokemon'), 'pokemon')
  })

  test('adds custom plural rule', ({ assert }) => {
    const inflector = new Inflector().addPluralRule(/(.*)gon$/i, '$1gons')

    assert.equal(inflector.pluralize('dragon'), 'dragons')
    assert.equal(inflector.pluralize('wagon'), 'wagons')
  })

  test('adds custom singular rule', ({ assert }) => {
    const inflector = new Inflector().addSingularRule(/(.*)gons$/i, '$1gon')

    assert.equal(inflector.singularize('dragons'), 'dragon')
    assert.equal(inflector.singularize('wagons'), 'wagon')
  })

  test('chains multiple customizations', ({ assert }) => {
    const inflector = new Inflector()
      .addIrregular('cactus', 'cacti')
      .addUninflected('spaghetti')
      .addPluralRule(/(.*)zza$/i, '$1zze')

    assert.equal(inflector.pluralize('cactus'), 'cacti')
    assert.equal(inflector.singularize('cacti'), 'cactus')
    assert.equal(inflector.pluralize('spaghetti'), 'spaghetti')
    assert.equal(inflector.pluralize('pizza'), 'pizze')
  })

  test('caches results', ({ assert }) => {
    const inflector = new Inflector()

    const result1 = inflector.pluralize('word')
    const result2 = inflector.pluralize('word')

    assert.equal(result1, 'words')
    assert.equal(result2, 'words')
  })

  test('clears cache when adding rules', ({ assert }) => {
    const inflector = new Inflector()

    assert.equal(inflector.pluralize('foo'), 'foos')

    inflector.addIrregular('foo', 'foox')

    assert.equal(inflector.pluralize('foo'), 'foox')
  })
})

test.group('Inflector.register', () => {
  test('registers a custom locale', ({ assert }) => {
    const customRuleset = {
      getSingularRuleset: () => ({
        regular: new Transformations([{ pattern: pattern('os$'), replacement: 'o' }]),
        uninflected: new Patterns([]),
        irregular: new Substitutions(),
      }),
      getPluralRuleset: () => ({
        regular: new Transformations([{ pattern: pattern('o$'), replacement: 'os' }]),
        uninflected: new Patterns([]),
        irregular: new Substitutions(),
      }),
    }

    Inflector.register('custom', customRuleset)

    const inflector = new Inflector('custom')

    assert.equal(inflector.pluralize('gato'), 'gatos')
    assert.equal(inflector.singularize('gatos'), 'gato')
  })

  test('throws on unknown locale', ({ assert }) => {
    assert.throws(
      () => new Inflector('unknown'),
      'Unknown locale "unknown". Register it first with Inflector.register().'
    )
  })

  test('accepts "en" as locale', ({ assert }) => {
    const inflector = new Inflector('en')

    assert.equal(inflector.pluralize('word'), 'words')
  })

  test('accepts "english" as locale', ({ assert }) => {
    const inflector = new Inflector('english')

    assert.equal(inflector.pluralize('word'), 'words')
  })
})

test.group('Edge cases', () => {
  test('handles empty string', ({ assert }) => {
    assert.equal(pluralize(''), '')
    assert.equal(singularize(''), '')
  })

  test('handles already plural words', ({ assert }) => {
    assert.equal(pluralize('cats'), 'cats')
    assert.equal(pluralize('dogs'), 'dogs')
  })

  test('handles words with mixed case', ({ assert }) => {
    assert.equal(pluralize('Word'), 'Words')
    assert.equal(singularize('Words'), 'Word')
  })
})

test.group('French locale', () => {
  test('pluralizes regular words', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.pluralize('chat'), 'chats')
    assert.equal(inflector.pluralize('chien'), 'chiens')
  })

  test('pluralizes words ending in -al to -aux', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.pluralize('cheval'), 'chevaux')
    assert.equal(inflector.pluralize('journal'), 'journaux')
    assert.equal(inflector.pluralize('local'), 'locaux')
  })

  test('pluralizes words ending in -ail', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.pluralize('travail'), 'travaux')
    assert.equal(inflector.pluralize('corail'), 'coraux')
    assert.equal(inflector.pluralize('portail'), 'portails')
  })

  test('pluralizes words ending in -au, -eu, -eau', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.pluralize('eau'), 'eaux')
    assert.equal(inflector.pluralize('feu'), 'feux')
    assert.equal(inflector.pluralize('tuyau'), 'tuyaux')
  })

  test('pluralizes words ending in -ou', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.pluralize('bijou'), 'bijoux')
    assert.equal(inflector.pluralize('caillou'), 'cailloux')
    assert.equal(inflector.pluralize('chou'), 'choux')
    assert.equal(inflector.pluralize('genou'), 'genoux')
    assert.equal(inflector.pluralize('hibou'), 'hiboux')
  })

  test('does not change words ending in -s, -x, -z', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.pluralize('souris'), 'souris')
    assert.equal(inflector.pluralize('prix'), 'prix')
    assert.equal(inflector.pluralize('nez'), 'nez')
  })

  test('handles irregular words', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.pluralize('monsieur'), 'messieurs')
    assert.equal(inflector.pluralize('madame'), 'mesdames')
    assert.equal(inflector.pluralize('mademoiselle'), 'mesdemoiselles')
  })

  test('singularizes regular words', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.singularize('chats'), 'chat')
    assert.equal(inflector.singularize('chiens'), 'chien')
  })

  test('singularizes words ending in -aux', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.singularize('chevaux'), 'cheval')
    assert.equal(inflector.singularize('journaux'), 'journal')
    assert.equal(inflector.singularize('travaux'), 'travail')
  })

  test('singularizes irregular words', ({ assert }) => {
    const inflector = new Inflector('fr')

    assert.equal(inflector.singularize('messieurs'), 'monsieur')
    assert.equal(inflector.singularize('mesdames'), 'madame')
    assert.equal(inflector.singularize('mesdemoiselles'), 'mademoiselle')
  })

  test('accepts "french" as locale', ({ assert }) => {
    const inflector = new Inflector('french')

    assert.equal(inflector.pluralize('chat'), 'chats')
  })
})
