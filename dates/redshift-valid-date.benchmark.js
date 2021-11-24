#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

function tryRedshiftDate (v) {
  if (!v) return

  const d = new Date(v).toJSON()
  return d ? d.substr(0, 10) : INVALID_DATE
}

function tryRedshiftDate2 (v) {
  if (!v) return

  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? INVALID_DATE : d.toJSON().substr(0, 10)
}

function tryRedshiftDate21 (v) {
  if (!v) return

  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? INVALID_DATE : d.toISOString().substr(0, 10)
}

function tryRedshiftDate3 (v) {
  if (!v) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return d.toJSON().substr(0, 10)
}

function tryRedshiftDate31 (v) {
  if (v == null) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return `${d.getUTCFullYear()}-${('' + (d.getUTCMonth() + 1)).padStart(2, '0')}-${('' + d.getUTCDate()).padStart(2, '0')}`
}

function padStart (n) {
  return ('00' + n).substr(-2)
}

function tryRedshiftDate41 (v) {
  if (v == null) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return `${d.getUTCFullYear()}-${padStart(d.getUTCMonth() + 1)}-${padStart(d.getUTCDate())}`
}

function tryRedshiftDate51 (v) {
  if (v == null) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return d.getUTCFullYear() + '-' + padStart(d.getUTCMonth() + 1) + '-' + padStart(d.getUTCDate())
}

function tryRedshiftDate61 (v, pad = padStart) {
  if (v == null) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate())
}

const INVALID_DATE = new function INVALID_DATE () {
  this.toJSON = () => undefined
}()

const staticDateString = '2020-02-04T14:23:02.000Z'
const expectedDateString = '2020-02-04'

const validDate = new Date()
const invalidDate = new Date('some invalid date')

assert(tryRedshiftDate(staticDateString) === expectedDateString, `tryRedshiftDate(staticDateString) [${tryRedshiftDate(staticDateString)}] !== [${expectedDateString}] === expectedDateString`)
assert(tryRedshiftDate(validDate) !== INVALID_DATE, 'tryRedshiftDate fail the test')
assert(tryRedshiftDate(invalidDate) === INVALID_DATE, 'tryRedshiftDate fail the test')

assert(tryRedshiftDate2(staticDateString) === expectedDateString, `tryRedshiftDate2(staticDateString) [${tryRedshiftDate2(staticDateString)}] !== [${expectedDateString}] === expectedDateString`)
assert(tryRedshiftDate2(validDate) !== INVALID_DATE, 'tryRedshiftDate2 fail the test')
assert(tryRedshiftDate2(invalidDate) === INVALID_DATE, 'tryRedshiftDate2 fail the test')

assert(tryRedshiftDate21(staticDateString) === expectedDateString, `tryRedshiftDate21(staticDateString) [${tryRedshiftDate21(staticDateString)}] !== [${expectedDateString}] === expectedDateString`)
assert(tryRedshiftDate21(validDate) !== INVALID_DATE, 'tryRedshiftDate2 fail the test')
assert(tryRedshiftDate21(invalidDate) === INVALID_DATE, 'tryRedshiftDate2 fail the test')

assert(tryRedshiftDate3(staticDateString) === expectedDateString, `tryRedshiftDate3(staticDateString) [${tryRedshiftDate3(staticDateString)}] !== [${expectedDateString}] === expectedDateString`)
assert(tryRedshiftDate3(validDate) !== INVALID_DATE, 'tryRedshiftDate3 fail the test')
assert(tryRedshiftDate3(invalidDate) === INVALID_DATE, 'tryRedshiftDate3 fail the test')

assert(tryRedshiftDate31(staticDateString) === expectedDateString, `tryRedshiftDate31(staticDateString) [${tryRedshiftDate31(staticDateString)}] !== [${expectedDateString}] === expectedDateString`)
assert(tryRedshiftDate31(validDate) !== INVALID_DATE, 'tryRedshiftDate3 fail the test')
assert(tryRedshiftDate31(invalidDate) === INVALID_DATE, 'tryRedshiftDate3 fail the test')

assert(tryRedshiftDate41(staticDateString) === expectedDateString, `tryRedshiftDate41(staticDateString) [${tryRedshiftDate41(staticDateString)}] !== [${expectedDateString}] === expectedDateString`)
assert(tryRedshiftDate41(validDate) !== INVALID_DATE, 'tryRedshiftDate3 fail the test')
assert(tryRedshiftDate41(invalidDate) === INVALID_DATE, 'tryRedshiftDate3 fail the test')

// add tests
suite
  .add('tryRedshiftDate31', () => {
    tryRedshiftDate31(validDate)
    tryRedshiftDate31('2020-02-04')
    tryRedshiftDate31(invalidDate)
    tryRedshiftDate31('something Weird')
  })
  .add('tryRedshiftDate41', () => {
    tryRedshiftDate41(validDate)
    tryRedshiftDate41('2020-02-04')
    tryRedshiftDate41(invalidDate)
    tryRedshiftDate41('something Weird')
  })
  .add('tryRedshiftDate51', () => {
    tryRedshiftDate51(validDate)
    tryRedshiftDate51('2020-02-04')
    tryRedshiftDate51(invalidDate)
    tryRedshiftDate51('something Weird')
  })
  .add('tryRedshiftDate61', () => {
    tryRedshiftDate61(validDate)
    tryRedshiftDate61('2020-02-04')
    tryRedshiftDate61(invalidDate)
    tryRedshiftDate61('something Weird')
  })
  .add('tryRedshiftDate', () => {
    tryRedshiftDate(validDate)
    tryRedshiftDate('2020-02-04')
    tryRedshiftDate(invalidDate)
    tryRedshiftDate('something Weird')
  })
  .add('tryRedshiftDate2', () => {
    tryRedshiftDate2(validDate)
    tryRedshiftDate2('2020-02-04')
    tryRedshiftDate2(invalidDate)
    tryRedshiftDate2('something Weird')
  })
  .add('tryRedshiftDate21', () => {
    tryRedshiftDate21(validDate)
    tryRedshiftDate21('2020-02-04')
    tryRedshiftDate21(invalidDate)
    tryRedshiftDate21('something Weird')
  })
  .add('tryRedshiftDate3', () => {
    tryRedshiftDate3(validDate)
    tryRedshiftDate3('2020-02-04')
    tryRedshiftDate3(invalidDate)
    tryRedshiftDate3('something Weird')
  })

module.exports = () => suite.run({ async: true })

if (require.main === module) module.exports()
