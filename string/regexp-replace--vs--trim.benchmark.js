#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

const replace = (s) => ('' + s).replace(/^\s+/, '').replace(/\s+$/, '')
const trim = (s) => ('' + s).trim()

assert(replace(' \n  a  \t  ') === 'a', 'replace fail the test')
assert(trim(' \n  a  \t  ') === 'a', 'staticSubstrConcat fail the test')

// add tests
suite
  .add('trim    ', () => trim('  a   '))
  .add('replace ', () => replace('  a   '))
  .run({
    async: true
  })
