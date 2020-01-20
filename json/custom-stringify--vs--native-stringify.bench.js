#!/usr/bin/env node

const assert = require('assert')

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')
// eslint-disable-next-line func-names
// const single = () => { stdout.write('1000'+'\n'); };
const originalObject = {
  a: 1,
  b: 2,
  c: { d: 3, e: 4 },
  date: new Date(),
  array: [1, 2, 3, 4, '5', [6, 7, 8]],
  nan: NaN,
  infinty: Infinity,
  null: null,
  true: true,
  false: false,
  objects: [
    { a: 1, b: 2 },
    { a: '1', b: '2' }
  ],
  regExp: /abc/,
  nested: undefined,
  circus: undefined
}

// originalObject.circus = originalObject

const originalArray = [{
  a: 1,
  b: 2,
  c: { d: 3, e: 4 },
  array: [1, 2, 3, 4, '5', [6, 7, 8]],
  null: null,
  true: true,
  false: false,
  objects: [
    { a: 1, b: 2 },
    { a: '1', b: '2' }
  ],
  nested: undefined
}]

originalObject.nested = JSON.parse(JSON.stringify(originalObject))

const stringify0 = json => JSON.stringify(json)

function stringify1 (input) {
  if (!(input instanceof Object)) {
    if (input === undefined) return
    if (input === null) return 'null'

    switch (input.constructor) {
      case String: return `"${input}"`
      case Number: {
        return Number.isNaN(input) || !Number.isFinite(input) ? 'null' : ('' + input)
      }
      default: return '' + input
    }
  }

  if (input.toJSON instanceof Function) return stringify1(input.toJSON())

  let str = ''

  if (Array.isArray(input)) {
    for (let iLen = 0; iLen < input.length; iLen++) {
      str += stringify1(input[iLen]) + ','
    }

    str = '[' + str.substr(0, str.length - 1) + ']'
    Number(str)

    return str
  }

  for (const i in input) {
    const r = stringify1(input[i])
    // if (r !== undefined) str += `"${i}":${r},`
    if (r !== undefined) str += '"' + i + '":' + r + ','
  }

  str = '{' + str.substr(0, str.length - 1) + '}'
  Number(str)

  return str
}

runTests()

suite
  .add(stringify0.name, () => stringify0(originalObject))
  .add(stringify1.name, () => stringify1(originalObject))
  .run({
    async: true
  })

function runTests () {
  const originalObjectString = JSON.stringify(originalObject)
  const originalArrayString = JSON.stringify(originalArray)

  const t0 = stringify0(originalObject)
  assert(t0 === originalObjectString)

  const tO1 = (stringify1(originalObject))
  assert(tO1 === originalObjectString, `\n${tO1}\n---\n${originalObjectString}`)
  const tA1 = (stringify1(originalArray))
  assert(tA1 === originalArrayString, `\n${tA1}\n---\n${originalArrayString}`)
}
