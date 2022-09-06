#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

const date = new Date('2022-06-05T01:25:43.000Z')

const shortDate1 = date => date.toISOString().slice(2, 10).replace(/-/g, '')
const shortDate2 = d => {
  const y = '' + d.getUTCFullYear()

  return `${y[2]}${y[3]}${('0' + (d.getUTCMonth() + 1)).slice(-2)}${('0' + d.getUTCDate()).slice(-2)}`
}

const pad20s = n => ('0' + n).slice(-2)

const shortDate3 = d => {
  const y = '' + d.getUTCFullYear()

  return `${y[2]}${y[3]}${pad20s(d.getUTCMonth() + 1)}${pad20s(d.getUTCDate())}`
}
const shortDate4 = d => {
  const y = '' + d.getUTCFullYear()

  return `${y[2]}${y[3]}${`0${d.getUTCMonth() + 1}`.slice(-2)}${`0${d.getUTCDate()}`.slice(-2)}`
}
const shortDate5 = d => {
  const y = '' + d.getUTCFullYear()

  return `${y[2]}${y[3]}${('' + (d.getUTCMonth() + 1)).padStart(2, 0)}${('' + d.getUTCDate()).padStart(2, '0')}`
}

const x = '220605'
let t
assert((t = shortDate1(date)) === x, `shortDate1 [${t}] != ${x} fail the test`)
assert((t = shortDate2(date)) === x, `shortDate2 [${t}] != ${x} fail the test`)
assert((t = shortDate3(date)) === x, `shortDate3 [${t}] != ${x} fail the test`)
assert((t = shortDate4(date)) === x, `shortDate4 [${t}] != ${x} fail the test`)
assert((t = shortDate5(date)) === x, `shortDate5 [${t}] != ${x} fail the test`)

// add tests
suite
  .add('shortDate1', () => { shortDate1(date) })
  .add('shortDate2', () => { shortDate2(date) })
  .add('shortDate3', () => { shortDate3(date) })
  .add('shortDate4', () => { shortDate4(date) })
  .add('shor5Date5', () => { shortDate5(date) })

module.exports = () => suite.run({ async: true })

if (require.main === module) module.exports()
