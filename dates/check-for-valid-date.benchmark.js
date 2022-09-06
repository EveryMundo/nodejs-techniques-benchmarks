#!/usr/bin/env node
'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

const globalIsNaN = (d) => isNaN(d)
const numberIsNaNplus = (d) => Number.isNaN(+d)
const numberIsNaNgetTime = (d) => Number.isNaN(d.getTime())
const invalidDateImplicitString = (d) => '' + d === 'Invalid Date'
const invalidDateToString = (d) => d.toString() === 'Invalid Date'
const invalidDateJSON = (d) => d.toJSON() === null

assert(globalIsNaN(new Date()) === false, 'globalIsNaN fail the test')
assert(globalIsNaN(new Date('some invalid date')) === true, 'globalIsNaN fail the test')

assert(numberIsNaNplus(new Date()) === false, 'numberIsNaN fail the test')
assert(numberIsNaNplus(new Date('some invalid date')) === true, 'numberIsNaN fail the test')

assert(numberIsNaNgetTime(new Date()) === false, 'numberIsNaN2 fail the test')
assert(numberIsNaNgetTime(new Date('some invalid date')) === true, 'numberIsNaN2 fail the test')

assert(invalidDateImplicitString(new Date()) === false, 'invalidDateImplicitString fail the test')
assert(invalidDateImplicitString(new Date('some invalid date')) === true, 'invalidDateImplicitString fail the test')

assert(invalidDateToString(new Date()) === false, 'invalidDateToStringfail the test')
assert(invalidDateToString(new Date('some invalid date')) === true, 'invalidDateToStringfail the test')

assert(invalidDateJSON(new Date()) === false, 'invalidDateJSON fail the test')
assert(invalidDateJSON(new Date('some invalid date')) === true, 'invalidDateJSON fail the test')

// add tests
suite
  .add('invalidDateImplicitString', () => {
    invalidDateImplicitString(new Date())
    invalidDateImplicitString(new Date('some invalid date'))
  })
  .add('invalidDateToString', () => {
    invalidDateToString(new Date())
    invalidDateToString(new Date('some invalid date'))
  })
  .add('invalidDateJSON', () => {
    invalidDateJSON(new Date())
    invalidDateJSON(new Date('some invalid date'))
  })
  .add('numberIsNaNplus', () => {
    numberIsNaNplus(new Date())
    numberIsNaNplus(new Date('some invalid date'))
  })
  .add('numberIsNaNgetTime', () => {
    numberIsNaNgetTime(new Date())
    numberIsNaNgetTime(new Date('some invalid date'))
  })
  .add('globalIsNaN', () => {
    globalIsNaN(new Date())
    globalIsNaN(new Date('some invalid date'))
  })

module.exports = () => suite.run({ async: true })

if (require.main === module) module.exports()
