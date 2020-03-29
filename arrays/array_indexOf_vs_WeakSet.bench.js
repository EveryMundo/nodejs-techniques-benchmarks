#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

const ArrayOfTypes = [Object, Array]
const arrayIndexOf = (inputData) => {
  const data = (inputData && ArrayOfTypes.indexOf(inputData.constructor) > -1) ? JSON.stringify(inputData) : inputData

  return data
}

const MapOfTypes = new WeakSet([Object, Array])
const weakSet = (inputData) => {
  const data = (inputData && MapOfTypes.has(inputData.constructor)) ? JSON.stringify(inputData) : inputData

  return data
}

const ifWithOr = (inputData) => {
  const data = (inputData && (inputData.constructor === Array || inputData.constructor === Object)) ? JSON.stringify(inputData) : inputData

  return data
}

const m = new Map([
  ['{"o":1}', { o: 1 }],
  ['["a","b"]', ['a', 'b']],
  ['abc', 'abc']
])

for (const [output, input] of m.entries()) {
  assert(arrayIndexOf(input) === output, `arrayIndexOf fail the test: output: ${output}`)
  assert(weakSet(input) === output, `weakSet fail the test: output: ${output}`)
  assert(ifWithOr(input) === output, `ifWithOr fail the test: output: ${output}`)
}

// add tests
suite
  .add('weakSet', () => {
    weakSet({ o: 1 })
    weakSet(['o', 1])
    weakSet('abc')
  })
  .add('arrayIndexOf', () => {
    arrayIndexOf({ o: 1 })
    arrayIndexOf(['o', 1])
    arrayIndexOf('abc')
  })
  .add('ifWithOr', () => {
    ifWithOr({ o: 1 })
    ifWithOr(['o', 1])
    ifWithOr('abc')
  })
  .run({
    async: true
  })
