#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

const replace = (s) => s.replace('/W/', '/w/')
const staticSubstrConcat = (s) => `/w/${s.substr(3)}`
const staticSubstringConcat = (s) => `/w/${s.substring(3)}`
const staticSubstrConcat2 = (s) => '/w/' + s.substr(3)

assert(replace('/W/lala') === '/w/lala', 'replace fail the test')
assert(staticSubstrConcat('/W/lala') === '/w/lala', 'staticSubstrConcat fail the test')

// add tests
suite
  .add('staticSubstringConcat', () => staticSubstringConcat)
  .add('replace              ', () => replace)
  .add('staticSubstrConcat   ', () => staticSubstrConcat)
  .add('staticSubstrConcat2  ', () => staticSubstrConcat2)
  .run({
    async: true
  })
