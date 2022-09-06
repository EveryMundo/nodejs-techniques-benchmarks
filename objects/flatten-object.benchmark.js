#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names, camelcase
function flatObject_continue (o, _ret, _prefix) {
  if (!o) return o

  const ret = _ret || {}
  const prefix = _prefix || ''
  const keys = Object.keys(o)
  const len = keys.length

  for (let i = 0; i < len; i++) {
    const key = keys[i]
    const newKey = (prefix ? prefix + '_' : '') + key
    if (o[key] && typeof o[key] === 'object' && !Array.isArray(o[key])) {
      // console.log(`${key} is an object prefix:${prefix}`);
      flatObject_continue(o[key], ret, newKey)
      continue
    }

    ret[newKey] = o[key]
  }

  return ret
}

// eslint-disable-next-line func-names, camelcase
function flatObject_else (o, _ret, _prefix) {
  if (!o) return o

  const ret = _ret || {}
  const prefix = _prefix || ''
  const keys = Object.keys(o)
  const len = keys.length

  for (let i = 0; i < len; i++) {
    const key = keys[i]
    const newKey = (prefix ? prefix + '_' : '') + key
    if (o[key] && typeof o[key] === 'object' && !Array.isArray(o[key])) {
      // console.log(`${key} is an object prefix:${prefix}`);
      flatObject_else(o[key], ret, newKey)
    } else {
      ret[newKey] = o[key]
    }
  }

  return ret
}

// eslint-disable-next-line func-names, camelcase
function flatObject_else2 (o, ret = {}, prefix = '') {
  if (!o) return o

  const keys = Object.keys(o)
  const len = keys.length

  for (let i = 0; i < len; i++) {
    const key = keys[i]
    const newKey = (prefix ? prefix + '_' : '') + key
    if (o[key] && typeof o[key] === 'object' && !Array.isArray(o[key])) {
      // console.log(`${key} is an object prefix:${prefix}`);
      flatObject_else2(o[key], ret, newKey)
    } else {
      ret[newKey] = o[key]
    }
  }

  return ret
}

// eslint-disable-next-line func-names, camelcase
function flatObject_else3 (o, ret = {}, prefix = '') {
  if (!o) return o

  const keys = Object.keys(o)
  const len = keys.length

  let key
  let newKey
  for (let i = 0; i < len; i++) {
    key = keys[i]
    newKey = (prefix ? prefix + '_' : '') + key
    if (o[key] && typeof o[key] === 'object' && !Array.isArray(o[key])) {
      // console.log(`${key} is an object prefix:${prefix}`);
      flatObject_else3(o[key], ret, newKey)
    } else {
      ret[newKey] = o[key]
    }
  }

  return ret
}

// eslint-disable-next-line func-names, camelcase
function flatObject_else5 (o, ret = {}, prefix = '') {
  if (!o) return o

  const keys = Object.keys(o)
  const len = keys.length

  let key
  let newKey
  let oo
  for (let i = 0; i < len; i++) {
    key = keys[i]
    oo = o[key]
    newKey = (prefix ? prefix + '_' : '') + key
    if (oo && typeof oo === 'object' && !Array.isArray(oo)) {
      // console.log(`${key} is an object prefix:${prefix}`);
      flatObject_else5(oo, ret, newKey)
    } else {
      ret[newKey] = oo
    }
  }

  return ret
}

// eslint-disable-next-line func-names, camelcase
function flatObject_else4 (o, ret = {}, prefix = '') {
  if (!o) return o

  const keys = Object.keys(o)

  let newKey
  for (const key of keys) {
    newKey = (prefix ? prefix + '_' : '') + key
    if (o[key] && typeof o[key] === 'object' && !Array.isArray(o[key])) {
      // console.log(`${key} is an object prefix:${prefix}`);
      flatObject_else4(o[key], ret, newKey)
    } else {
      ret[newKey] = o[key]
    }
  }

  return ret
}

const originalObject = { a: { b: { c: { d: 100, e: 200, f: [300, 400] }, n: null, s: 'string', t: true } } }
const expectedObject = { a_b_c_d: 100, a_b_c_e: 200, a_b_c_f: [300, 400], a_b_n: null, a_b_s: 'string', a_b_t: true }
const expectedJSON = JSON.stringify(expectedObject)

const t0 = JSON.stringify(flatObject_continue(originalObject))
assert(t0 === expectedJSON, `flatObject_continue fail the test [${t0}] === ${expectedJSON}]`)

const t1 = JSON.stringify(flatObject_else(originalObject))
assert(t1 === expectedJSON, `flatObject_else fail the test [${t1}] === ${expectedJSON}]`)

const t2 = JSON.stringify(flatObject_else2(originalObject))
assert(t2 === expectedJSON, `flatObject_else2 fail the test [${t2}] === ${expectedJSON}]`)

const t3 = JSON.stringify(flatObject_else3(originalObject))
assert(t3 === expectedJSON, `flatObject_else3 fail the test [${t3}] === ${expectedJSON}]`)

const t4 = JSON.stringify(flatObject_else4(originalObject))
assert(t4 === expectedJSON, `flatObject_else4 fail the test [${t4}] === ${expectedJSON}]`)

const t5 = JSON.stringify(flatObject_else5(originalObject))
assert(t5 === expectedJSON, `flatObject_else5 fail the test [${t5}] === ${expectedJSON}]`)

// assert(tryRedshiftTimestamp3(staticDateString) === expectedDateString, `tryRedshiftTimestamp3 fail the test [${tryRedshiftTimestamp3(staticDateString)}] !== [${expectedDateString}]`)
// assert(tryRedshiftTimestamp3(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftTimestamp3 fail the test')

// assert(tryRedshiftTimestamp4(staticDateString) === expectedDateString, `tryRedshiftTimestamp4 fail the test [${tryRedshiftTimestamp4(staticDateString)}] !== [${expectedDateString}]`)
// assert(tryRedshiftTimestamp4(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftTimestamp4 fail the test')

// assert(tryRedshiftDate(new Date()) !== INVALID_DATE, 'tryRedshiftDate fail the test')
// assert(tryRedshiftDate(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftDate fail the test')

// assert(tryRedshiftDate2(new Date()) !== INVALID_DATE, 'tryRedshiftDate2 fail the test')
// assert(tryRedshiftDate2(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftDate2 fail the test')

// assert(tryRedshiftDate3(new Date()) !== INVALID_DATE, 'tryRedshiftDate3 fail the test')
// assert(tryRedshiftDate3(new Date('some invalid date')) === INVALID_DATE, 'tryRedshiftDate3 fail the test')

// add tests
suite
  .add('flatObject_continue', () => {
    flatObject_continue(originalObject)
  })
  .add('flatObject_else3', () => {
    flatObject_else3(originalObject)
  })
  .add('flatObject_else', () => {
    flatObject_else(originalObject)
  })
  .add('flatObject_else5', () => {
    flatObject_else5(originalObject)
  })
  .add('flatObject_else2', () => {
    flatObject_else2(originalObject)
  })
  .add('flatObject_else4', () => {
    flatObject_else4(originalObject)
  })
  .run({
    async: true
  })
