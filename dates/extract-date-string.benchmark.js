#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')
const suite = require('../lib/bench')

const date = new Date('2022-06-05T01:25:43.000Z')

const viaISOStringSlice = (d) => d.toISOString().slice(0, 10)
const viaISOSubstring = (d) => d.toISOString().substring(0, 10)
const viaUTCCalls = (d) => `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}`

assert(viaISOStringSlice(date) === '2022-06-05', 'viaISOStringSlice fail the test')
assert(viaISOSubstring(date) === '2022-06-05', 'viaISOStringSlice fail the test')
assert(viaUTCCalls(date) === '2022-06-05', 'viaISOStringSlice fail the test')

suite
  .add('viaISOStringSlice', () => { viaISOStringSlice(date) })
  .add('viaISOSubstring', () => { viaISOSubstring(date) })
  .add('viaUTCCalls', () => { viaUTCCalls(date) })

module.exports = () => suite.run({ async: true })

if (require.main === module) module.exports()
