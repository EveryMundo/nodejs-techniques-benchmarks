#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

const globalIsNaN = (d) => isNaN(d)
const numberIsNaN = (d) => Number.isNaN(+d)
const numberIsNaN2 = (d) => Number.isNaN(d.getTime())
const invalidDate = (d) => '' + d === 'Invalid Date'
const invalidDateStr = (d) => d.toString() === 'Invalid Date'

assert(globalIsNaN(new Date()) === false, 'globalIsNaN fail the test')
assert(globalIsNaN(new Date('some invalid date')) === true, 'globalIsNaN fail the test')

assert(numberIsNaN(new Date()) === false, 'numberIsNaN fail the test')
assert(numberIsNaN(new Date('some invalid date')) === true, 'numberIsNaN fail the test')

assert(numberIsNaN2(new Date()) === false, 'numberIsNaN2 fail the test')
assert(numberIsNaN2(new Date('some invalid date')) === true, 'numberIsNaN2 fail the test')

assert(invalidDate(new Date()) === false, 'invalidDate fail the test')
assert(invalidDate(new Date('some invalid date')) === true, 'invalidDate fail the test')

// add tests
suite
  .add('invalidDate', () => {
    invalidDate(new Date())
    invalidDate(new Date('some invalid date'))
  })
  .add('invalidDateStr', () => {
    invalidDateStr(new Date())
    invalidDateStr(new Date('some invalid date'))
  })
  .add('numberIsNaN', () => {
    numberIsNaN(new Date())
    numberIsNaN(new Date('some invalid date'))
  })
  .add('numberIsNaN2', () => {
    numberIsNaN2(new Date())
    numberIsNaN2(new Date('some invalid date'))
  })
  .add('globalIsNaN', () => {
    globalIsNaN(new Date())
    globalIsNaN(new Date('some invalid date'))
  })
  .run({
    async: true
  })
