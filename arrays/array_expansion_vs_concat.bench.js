#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

const expansion = () => {
  const obj = {
    original: [1, 2, 3, 4, 5]
  }
  const theOther = [6, 7, 8, 9, 0]

  obj.original.push(...theOther)

  return obj
}

const concat = () => {
  const obj = {
    original: [1, 2, 3, 4, 5]
  }
  const theOther = [6, 7, 8, 9, 0]

  obj.original = obj.original.concat(theOther)

  return obj
}

assert(expansion().original.join() === '1,2,3,4,5,6,7,8,9,0', 'expansion fail the test')
assert(concat().original.join() === '1,2,3,4,5,6,7,8,9,0', 'concat fail the test')

// add tests
suite
  .add('concat', concat)
  .add('expansion', expansion)
  .run({
    async: true
  })
