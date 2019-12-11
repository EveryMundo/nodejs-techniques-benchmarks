#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const zlib = require('zlib')
const fs = require('fs')
const assert = require('assert')

const suite = require('../lib/bench')

const singleContent = fs.readFileSync(__filename)
const multiContent = Buffer.concat(Array.from({ length: 100 }, () => singleContent))
const compressedContent = zlib.deflateSync(multiContent)

// eslint-disable-next-line func-names
const inflate = () => new Promise((resolve) => {
  zlib.inflate(compressedContent, (_, data) => resolve(data))
})

const inflateSync = () => new Promise((resolve) => {
  resolve(zlib.inflateSync(compressedContent))
})

const inflateSync2 = async () => zlib.inflateSync(compressedContent)

const runAssertions = async () => {
  const inflateResult = await inflate()
  console.log({
    inflateResult
  })
  assert(multiContent.compare(inflateResult) === 0, 'result does not match for inflate')
  assert(multiContent.compare(await inflateSync()) === 0, 'result does not match for inflateSync')
  assert(multiContent.compare(await inflateSync2()) === 0, 'result does not match for inflateSync2')
}

const runBenchmarks = () => {
// add tests
  suite
    .add('inflate     ', inflate)
    .add('inflateSync2', inflateSync2)
    .add('inflateSync ', inflateSync)
    .run({
      async: true
    })
}

runAssertions().then(runBenchmarks)

module.exports = { inflate, inflateSync, inflateSync2 }
