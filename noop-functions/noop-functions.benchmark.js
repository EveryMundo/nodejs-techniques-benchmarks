#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')
const { rpad } = require('../lib/string-helpers')

// eslint-disable-next-line func-names
const noop1 = function () {}
const noop2 = function noop () {}
const noop3 = () => {}
const noop4 = () => undefined
// eslint-disable-next-line no-new-func
const noop5 = new Function('')

// add tests
suite
  .add('promise', () => new Promise((resolve) => setTimeout(resolve, 500)))
  .add(`noop1 ${rpad(JSON.stringify(noop1.toString()), 33)}`, () => noop1())
  .add(`noop2 ${rpad(JSON.stringify(noop2.toString()), 33)}`, () => noop2())
  .add(`noop3 ${rpad(JSON.stringify(noop3.toString()), 33)}`, () => noop3())
  .add(`noop4 ${rpad(JSON.stringify(noop4.toString()), 33)}`, () => noop4())
  .add(`noop5 ${rpad(JSON.stringify(noop5.toString()), 33)}`, () => noop5())
  .run({
    async: true
  })
