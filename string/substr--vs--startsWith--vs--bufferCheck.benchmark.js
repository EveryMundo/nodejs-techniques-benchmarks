#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')
const origBuff = Buffer.allocUnsafeSlow(10000)
const origB64 = origBuff.toString('base64')
const gzBuff = require('zlib').gzipSync(origBuff)
const gzB64 = gzBuff.toString('base64')
// eslint-disable-next-line func-names

const substr = (s) => s.substr(0, 4) === 'H4sI'
const substring = (s) => s.substring(0, 4) === 'H4sI'
const slice = (s) => s.slice(0, 4) === 'H4sI'
const startsWith = (s) => s.startsWith('H4sI')
const bufferCheck = (b) => b[0] === 0x1f && b[1] === 0x8b

const expected = true

substr.test = substr(gzB64)
assert(substr.test, `substr fail the test, '${substr.test}' !== '${expected}'`)
substr.test2 = substr(origB64)
assert(!substr.test2, `substr fail the test2, '${substr.test2}' === '${expected}'`)

substring.test = substring(gzB64)
assert(substring.test, `substring fail the test, '${substring.test}' !== '${expected}'`)
substring.test2 = substring(origB64)
assert(!substring.test2, `substring fail the test2, '${substring.test2}' !== '${expected}'`)

slice.test = slice(gzB64)
assert(slice.test, `slice fail the test, '${slice.test}' !== '${expected}'`)
slice.test = slice(origB64)
assert(!slice.test2, `slice fail the test2, '${slice.test2}' !== '${expected}'`)

startsWith.test = startsWith(gzB64)
assert(startsWith.test, `startsWith fail the test, '${startsWith.test}' !== '${expected}'`)
startsWith.test = startsWith(origB64)
assert(!startsWith.test2, `startsWith fail the test2, '${startsWith.test2}' !== '${expected}'`)

bufferCheck.test = bufferCheck(gzBuff)
assert(bufferCheck.test, `bufferCheck fail the test, '${bufferCheck.test}' !== '${expected}'`)
bufferCheck.test = bufferCheck(origBuff)
assert(!bufferCheck.test2, `bufferCheck fail the test2, '${bufferCheck.test2}' !== '${expected}'`)

// add tests
suite
  .add('slice      ', () => {
    slice(gzB64)
    slice(origB64)
  })
  .add('substr     ', () => {
    substr(gzB64)
    substr(origB64)
  })
  .add('substring  ', () => {
    substring(gzB64)
    substring(origB64)
  })
  .add('startsWith  ', () => {
    startsWith(gzB64)
    startsWith(origB64)
  })
  .add('bufferCheck  ', () => {
    bufferCheck(gzB64)
    bufferCheck(origB64)
  })
  .run({
    async: true
  })
