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

function tryRedshiftDate3 (v) {
  if (!v) return

  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return INVALID_DATE

  return d.toJSON().substr(0, 10)
}

const INVALID_DATE = new function INVALID_DATE () {
  this.toJSON = () => undefined
}()

const staticDateString = '2020-02-04T14:23:02.000Z'
const expectedDateString = '2020-02-04 14:23:02.000'
assert(tryRedshiftTimestamp(new Date()) !== INVALID_DATE, 'tryRedshiftTimestamp fail the test')
assert(tryRedshiftTimestamp(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftTimestamp fail the test')

assert(tryRedshiftTimestamp2(new Date()) !== INVALID_DATE, 'tryRedshiftTimestamp2 fail the test')
assert(tryRedshiftTimestamp2(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftTimestamp2 fail the test')

assert(tryRedshiftTimestamp3(staticDateString) === expectedDateString, `tryRedshiftTimestamp3 fail the test [${tryRedshiftTimestamp3(staticDateString)}] !== [${expectedDateString}]`)
assert(tryRedshiftTimestamp3(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftTimestamp3 fail the test')

assert(tryRedshiftTimestamp4(staticDateString) === expectedDateString, `tryRedshiftTimestamp4 fail the test [${tryRedshiftTimestamp4(staticDateString)}] !== [${expectedDateString}]`)
assert(tryRedshiftTimestamp4(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftTimestamp4 fail the test')

assert(tryRedshiftDate(new Date()) !== INVALID_DATE, 'tryRedshiftDate fail the test')
assert(tryRedshiftDate(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftDate fail the test')

assert(tryRedshiftDate2(new Date()) !== INVALID_DATE, 'tryRedshiftDate2 fail the test')
assert(tryRedshiftDate2(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftDate2 fail the test')

assert(tryRedshiftDate3(new Date()) !== INVALID_DATE, 'tryRedshiftDate3 fail the test')
assert(tryRedshiftDate3(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftDate3 fail the test')

const validDate = new Date()
const invalidDate = new Date('some invalid date')
// add tests
suite
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
  .add('tryRedshiftDate3', () => {
    tryRedshiftDate3(validDate)
    tryRedshiftDate3('2020-02-04')
    tryRedshiftDate3(invalidDate)
    tryRedshiftDate3('something Weird')
  })  
  .run({
    async: true
  })
