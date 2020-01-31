#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const micro = require('microtime')

const suite = require('../lib/bench')

// eslint-disable-next-line func-names

const dateNow = () => { Date.now() }
const microNow = () => { micro.now() }

// add tests
suite
  .add('Date.now', dateNow)
  .add('microNow', microNow)
  .run({
    async: true
  })
