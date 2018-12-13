'use strict';

const logr      = require('@everymundo/simple-logr');
const { Suite } = require('benchmark');

const suite = new Suite();

suite
  .on('cycle', (event) => {
    logr.info(String(event.target));
  })
  .on('start', () => {
    logr.info(`
      Starting with Node ${process.version}
    `);
  })
  .on('complete', function onComplete() {
    const fastest = this.filter('fastest').map('name');
    logr.info(`
      Node ${process.version}
      Fastest is ${fastest}
    `);
  });

module.exports = suite;
