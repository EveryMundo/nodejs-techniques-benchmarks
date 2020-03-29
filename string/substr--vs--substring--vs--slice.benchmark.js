#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')
const bigString = Buffer.allocUnsafeSlow(1000).toString('base64')
// eslint-disable-next-line func-names

const substr = (s) => s.substr(10, 20)
const substring = (s) => s.substring(10, 30)
const slice = (s) => s.slice(10, 30)

const expected = Array.from({ length: 20 }, (_, i) => bigString[i + 10]).join('')

substr.test = substr(bigString)
assert(substr.test === expected, `substr fail the test, '${substr.test}' !== '${expected}'`)

substring.test = substring(bigString)
assert(substring.test === expected, `substring fail the test, '${substring.test}' !== '${expected}'`)

slice.test = slice(bigString)
assert(slice.test === expected, `slice fail the test, '${slice.test}' !== '${expected}'`)

// add tests
suite
  .add('slice      ', () => { slice(bigString) })
  .add('substr     ', () => { substr(bigString) })
  .add('substring  ', () => { substring(bigString) })
  .run({
    async: true
  })
