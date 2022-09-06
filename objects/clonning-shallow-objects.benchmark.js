#!/usr/bin/env node
'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')
const cloner = require('@everymundo/simple-clone')
const suite = require('../lib/bench')

function hardCoded (o, val) {
  return {
    a_b_c_d: 100,
    a_b_c_e: 200,
    a_b_c_f: [300, 400],
    a_b_n: null,
    a_b_s: 'string',
    val
  }
}

function destructuring (o, val) {
  return { ...o, val }
}

function jsonStringifyAndParse (o, val) {
  const r = JSON.parse(JSON.stringify(o))

  r.val = val

  return r
}

function deepClone (o, val) {
  const r = cloner.deepClone(o)

  r.val = val

  return r
}

const originalObject = { a_b_c_d: 100, a_b_c_e: 200, a_b_c_f: [300, 400], a_b_n: null, a_b_s: 'string', val: 0 }
const expectedObject = { a_b_c_d: 100, a_b_c_e: 200, a_b_c_f: [300, 400], a_b_n: null, a_b_s: 'string', val: 1 }
const expectedJSON = JSON.stringify(expectedObject)

const t0 = JSON.stringify(destructuring(originalObject, 1))
assert(t0 === expectedJSON, `${destructuring.name} fail the test [${t0}] === ${expectedJSON}]`)

const t1 = JSON.stringify(jsonStringifyAndParse(originalObject, 1))
assert(t1 === expectedJSON, `${jsonStringifyAndParse.name} fail the test [${t1}] === ${expectedJSON}]`)

const t2 = JSON.stringify(deepClone(originalObject, 1))
assert(t2 === expectedJSON, `${deepClone.name} fail the test [${t2}] === ${expectedJSON}]`)

const t3 = JSON.stringify(hardCoded(originalObject, 1))
assert(t3 === expectedJSON, `${hardCoded.name} fail the test [${t3}] === ${expectedJSON}]`)

suite
  .add(`${destructuring.name}         `, () => {
    destructuring(originalObject)
  })
  .add(`${jsonStringifyAndParse.name} `, () => {
    jsonStringifyAndParse(originalObject)
  })
  .add(`${deepClone.name}             `, () => {
    deepClone(originalObject)
  })
  .add(`${hardCoded.name}             `, () => {
    hardCoded(originalObject)
  })
  .run({
    async: true
  })
