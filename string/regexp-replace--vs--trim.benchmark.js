#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

// const suite = require('../lib/bench')
const { suite } = require('../lib/perf')

// eslint-disable-next-line func-names

const replace = (s) => ('' + s).replace(/^\s+/, '').replace(/\s+$/, '')
const trim = (s) => ('' + s).trim()
const doubleTrim = (s) => ('' + s).trimStart(' ').trimEnd(' ')

assert(replace(' \n  a  \t  ') === 'a', 'replace fail the test')
assert(trim(' \n  a  \t  ') === 'a', 'staticSubstrConcat fail the test')

// add tests
suite
  .add('trim      ', () => trim('  a   '))
  .add('replace   ', () => replace('  a   '))
  .add('doubleTrim', () => doubleTrim('  a   '))
  // .run({ async: false, runForXms: 2000 })
  .simpleSync(2000)
