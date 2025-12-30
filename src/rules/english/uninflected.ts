/**
 * @boringnode/pluralize
 *
 * @license MIT
 * @copyright BoringNode
 */

import { pattern } from '../../pattern.js'

function getDefault(): RegExp[] {
  return [
    pattern('\\w+media'),
    pattern('\\w+deer'),
    pattern('advice'),
    pattern('aegis'),
    pattern('aircraft'),
    pattern('art'),
    pattern('audio'),
    pattern('bison'),
    pattern('butter'),
    pattern('cattle'),
    pattern('chassis'),
    pattern('clothing'),
    pattern('coal'),
    pattern('cod'),
    pattern('compensation'),
    pattern('cotton'),
    pattern('data'),
    pattern('debris'),
    pattern('deceased'),
    pattern('deer'),
    pattern('education'),
    pattern('elk'),
    pattern('emoji'),
    pattern('equipment'),
    pattern('evidence'),
    pattern('feedback'),
    pattern('fish'),
    pattern('flour'),
    pattern('food'),
    pattern('furniture'),
    pattern('gold'),
    pattern('headquarters'),
    pattern('hertz'),
    pattern('homework'),
    pattern('information'),
    pattern('jeans'),
    pattern('knowledge'),
    pattern('leather'),
    pattern('love'),
    pattern('luggage'),
    pattern('management'),
    pattern('memorabilia'),
    pattern('metadata'),
    pattern('money'),
    pattern('moose'),
    pattern('music'),
    pattern('news'),
    pattern('nutrition'),
    pattern('offspring'),
    pattern('oil'),
    pattern('plankton'),
    pattern('pokemon'),
    pattern('police'),
    pattern('progress'),
    pattern('rain'),
    pattern('research'),
    pattern('rice'),
    pattern('salmon'),
    pattern('sand'),
    pattern('scissors'),
    pattern('series'),
    pattern('sheep'),
    pattern('silk'),
    pattern('sms'),
    pattern('spam'),
    pattern('species'),
    pattern('staff'),
    pattern('sugar'),
    pattern('swine'),
    pattern('traffic'),
    pattern('trousers'),
    pattern('trout'),
    pattern('tuna'),
    pattern('weather'),
    pattern('wheat'),
    pattern('wood'),
    pattern('wool'),
  ]
}

export function getSingular(): RegExp[] {
  return [...getDefault(), pattern('.*ss'), pattern('clothes'), pattern('pants')]
}

export function getPlural(): RegExp[] {
  return [...getDefault(), pattern('people'), pattern('\\w+ware$'), pattern('media')]
}
