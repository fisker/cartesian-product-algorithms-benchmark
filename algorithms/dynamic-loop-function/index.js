// generated from https://git.io/fjbxg

;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.fastCartesianProduct = factory()))
})(this, function() {
  'use strict'

  var cache = {}
  var ARGUMENT_NAME = 'sets'
  var RESULTS_NAME = 'results'
  var SETS_PREFIX = 'sets'
  var LENGTH_PREFIX = 'length'
  var INDEX_PREFIX = 'index'

  function makeProductFunction(setSize) {
    var elementsCache = new Array(setSize)
    var lengthCache = new Array(setSize)
    var loopLength = setSize * 2 + 1
    var loopBody = new Array(loopLength)
    var resultBody = new Array(setSize)
    var lengthCheck = new Array(setSize)

    for (var setIndex = 0; setIndex < setSize; setIndex += 1) {
      elementsCache[setIndex] = 'var '
        .concat(SETS_PREFIX)
        .concat(setIndex, ' = ')
        .concat(ARGUMENT_NAME, '[')
        .concat(setIndex, ']')
      lengthCache[setIndex] = 'var '
        .concat(LENGTH_PREFIX)
        .concat(setIndex, ' = ')
        .concat(SETS_PREFIX)
        .concat(setIndex, '.length')
      lengthCheck[setIndex] = ''
        .concat(LENGTH_PREFIX)
        .concat(setIndex, ' === 0')
      resultBody[setIndex] = ''
        .concat(SETS_PREFIX)
        .concat(setIndex, '[')
        .concat(INDEX_PREFIX)
        .concat(setIndex, ']')
      loopBody[setIndex] = 'for (var '
        .concat(INDEX_PREFIX)
        .concat(setIndex, ' = 0; ')
        .concat(INDEX_PREFIX)
        .concat(setIndex, ' < ')
        .concat(LENGTH_PREFIX)
        .concat(setIndex, '; ')
        .concat(INDEX_PREFIX)
        .concat(setIndex, ' += 1) {')
      loopBody[loopLength - setIndex] = '}'
    }

    loopBody[setSize + 1] = ''
      .concat(RESULTS_NAME, '.push([')
      .concat(resultBody.join(','), '])')
    lengthCheck = 'if('.concat(
      lengthCheck.join(' || '),
      ") {throw new TypeError('`sets` should not has empty elements')}"
    )
    var functionBody = [
      'var '.concat(RESULTS_NAME, ' = []'),
      elementsCache.join('\n'),
      lengthCache.join('\n'),
      lengthCheck,
      loopBody.join('\n'),
      'return '.concat(RESULTS_NAME),
    ].join('\n') // eslint-disable-next-line no-new-func

    return new Function(ARGUMENT_NAME, functionBody)
  }

  function product(sets) {
    var setsSize = sets.length

    if (setsSize === 0) {
      return []
    }

    var function_ =
      cache[setsSize] || (cache[setsSize] = makeProductFunction(setsSize))
    return function_(sets)
  }

  return product
})
//# sourceMappingURL=index.js.map