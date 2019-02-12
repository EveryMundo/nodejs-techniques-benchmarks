#!/usr/bin/env node

'use strict';

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('./lib/bench');
const {stdout} = process;
// eslint-disable-next-line func-names
const logr = (...args) => stdout.write(args.join(' ') + '\n');

const consoleLog = () => { console.log('1000', 1000, 'abc'); };
// const single = () => { stdout.write('1000'+'\n'); };
const logger = () => { logr('1000', 1000, 'abc'); };


// add tests
suite
  .add(consoleLog.name, () => consoleLog())
  .add(logger.name, () => logger())
  // .add(single.name, () => single())
  .run({
    async: true
  });
