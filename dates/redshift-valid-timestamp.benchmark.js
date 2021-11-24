#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

function tryRedshiftTimestamp (v) {
  if (!v) return

  const d = new Date(v).toJSON()
  return d ? d.replace('T', ' ').substr(0, 23) : INVALID_DATE
}

function tryRedshiftTimestamp2 (v) {
  if (!v) return

  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? INVALID_DATE : d.toJSON().replace('T', ' ').substr(0, 23)
}

function tryRedshiftTimestamp3 (v) {
  if (!v) return

  const d = v.constructor === Date ? v : new Date(v)
  return Number.isNaN(d.getTime()) ? INVALID_DATE : d.toJSON().replace('T', ' ').substr(0, 23)
}

function tryRedshiftTimestamp4 (v) {
  if (!v) return

  const d = v.constructor === Date ? v : new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  const json = d.toJSON()

  return `${json.substr(0, 10)} ${json.substr(11, 12)}`
}

function tryRedshiftTimestamp41 (v) {
  if (v == null) return

  const d = v.constructor === Date ? v : new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  const json = d.toISOString()

  return `${json.substr(0, 10)} ${json.substr(11, 12)}`
}

function tryRedshiftTimestamp51 (v) {
  if (v == null) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return `${d.getUTCFullYear()}-${('' + (d.getUTCMonth() + 1)).padStart(2, '0')}-${('' + d.getUTCDate()).padStart(2, '0')} ${('' + d.getUTCHours()).padStart(2, '0')}:${('' + d.getUTCMinutes()).padStart(2, '0')}:${('' + d.getUTCSeconds()).padStart(2, '0')}.${('' + d.getUTCMilliseconds()).padStart(3, '0')}`
}

function padStart (n, pad = 2) {
  return ('000' + n).substr(-pad)
}

function tryRedshiftTimestamp61 (v) {
  if (v == null) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return `${d.getUTCFullYear()}-${padStart(d.getUTCMonth() + 1)}-${padStart(d.getUTCDate())} ${padStart(d.getUTCHours())}:${padStart(d.getUTCMinutes())}:${padStart(d.getUTCSeconds())}.${padStart(d.getUTCMilliseconds(), 3)}`
}

const INVALID_DATE = new function INVALID_DATE () {
  this.toJSON = () => undefined
}()

const staticDateString = '2020-02-04T14:23:02.000Z'
const expectedTimestampString = '2020-02-04 14:23:02.000'

const validDate = new Date()
const invalidDate = new Date('some invalid date')

assert(tryRedshiftTimestamp(staticDateString) === expectedTimestampString, `tryRedshiftTimestamp fail the test [${tryRedshiftTimestamp(staticDateString)}] !== [${expectedTimestampString}]`)
assert(tryRedshiftTimestamp(validDate) !== INVALID_DATE, 'tryRedshiftTimestamp fail the test')
assert(tryRedshiftTimestamp(invalidDate) === INVALID_DATE, 'tryRedshiftTimestamp fail the test')

assert(tryRedshiftTimestamp2(staticDateString) === expectedTimestampString, `tryRedshiftTimestamp2 fail the test [${tryRedshiftTimestamp2(staticDateString)}] !== [${expectedTimestampString}]`)
assert(tryRedshiftTimestamp2(validDate) !== INVALID_DATE, 'tryRedshiftTimestamp2 fail the test')
assert(tryRedshiftTimestamp2(invalidDate) === INVALID_DATE, 'tryRedshiftTimestamp2 fail the test')

assert(tryRedshiftTimestamp3(staticDateString) === expectedTimestampString, `tryRedshiftTimestamp3 fail the test [${tryRedshiftTimestamp3(staticDateString)}] !== [${expectedTimestampString}]`)
assert(tryRedshiftTimestamp3(invalidDate) === INVALID_DATE, 'tryRedshiftTimestamp3 fail the test')

assert(tryRedshiftTimestamp4(staticDateString) === expectedTimestampString, `tryRedshiftTimestamp4 fail the test [${tryRedshiftTimestamp4(staticDateString)}] !== [${expectedTimestampString}]`)
assert(tryRedshiftTimestamp4(invalidDate) === INVALID_DATE, 'tryRedshiftTimestamp4 fail the test')

assert(tryRedshiftTimestamp41(staticDateString) === expectedTimestampString, `tryRedshiftTimestamp4 fail the test [${tryRedshiftTimestamp41(staticDateString)}] !== [${expectedTimestampString}]`)
assert(tryRedshiftTimestamp41(invalidDate) === INVALID_DATE, 'tryRedshiftTimestamp4 fail the test')

assert(tryRedshiftTimestamp51(staticDateString) === expectedTimestampString, `tryRedshiftTimestamp4 fail the test [${tryRedshiftTimestamp51(staticDateString)}] !== [${expectedTimestampString}]`)
assert(tryRedshiftTimestamp51(invalidDate) === INVALID_DATE, 'tryRedshiftTimestamp4 fail the test')

assert(tryRedshiftTimestamp61(staticDateString) === expectedTimestampString, `tryRedshiftTimestamp4 fail the test [${tryRedshiftTimestamp61(staticDateString)}] !== [${expectedTimestampString}]`)
assert(tryRedshiftTimestamp61(invalidDate) === INVALID_DATE, 'tryRedshiftTimestamp4 fail the test')

// add tests
suite
  .add('tryRedshiftTimestamp41', () => {
    tryRedshiftTimestamp41(validDate)
    tryRedshiftTimestamp41('2020-02-04')
    tryRedshiftTimestamp41(invalidDate)
    tryRedshiftTimestamp41('something Weird')
  })
  .add('tryRedshiftTimestamp51', () => {
    tryRedshiftTimestamp51(validDate)
    tryRedshiftTimestamp51('2020-02-04')
    tryRedshiftTimestamp51(invalidDate)
    tryRedshiftTimestamp51('something Weird')
  })
  .add('tryRedshiftTimestamp61', () => {
    tryRedshiftTimestamp61(validDate)
    tryRedshiftTimestamp61('2020-02-04')
    tryRedshiftTimestamp61(invalidDate)
    tryRedshiftTimestamp61('something Weird')
  })
  .add('tryRedshiftTimestamp', () => {
    tryRedshiftTimestamp(validDate)
    tryRedshiftTimestamp('2020-02-04')
    tryRedshiftTimestamp(invalidDate)
    tryRedshiftTimestamp('something Weird')
  })
  .add('tryRedshiftTimestamp2', () => {
    tryRedshiftTimestamp2(validDate)
    tryRedshiftTimestamp2('2020-02-04')
    tryRedshiftTimestamp2(invalidDate)
    tryRedshiftTimestamp2('something Weird')
  })
  .add('tryRedshiftTimestamp3', () => {
    tryRedshiftTimestamp3(validDate)
    tryRedshiftTimestamp3('2020-02-04')
    tryRedshiftTimestamp3(invalidDate)
    tryRedshiftTimestamp3('something Weird')
  })
  .add('tryRedshiftTimestamp4', () => {
    tryRedshiftTimestamp4(validDate)
    tryRedshiftTimestamp4('2020-02-04')
    tryRedshiftTimestamp4(invalidDate)
    tryRedshiftTimestamp4('something Weird')
  })

module.exports = () => suite.run({ async: true })

if (require.main === module) module.exports()
