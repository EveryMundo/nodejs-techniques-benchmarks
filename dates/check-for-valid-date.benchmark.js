'use strict';

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert');

const suite = require('../lib/bench');

// eslint-disable-next-line func-names

const globalIsNaN = (d) => isNaN(d);
const numberIsNaN = (d) => Number.isNaN(+d);
const invalidDate = (d) => '' + d === 'Invalid Date';

assert(globalIsNaN(new Date()) === false, 'globalIsNaN fail the test');
assert(globalIsNaN(new Date('some invalid date')) === true, 'globalIsNaN fail the test');

assert(numberIsNaN(new Date()) === false, 'numberIsNaN fail the test');
assert(numberIsNaN(new Date('some invalid date')) === true, 'numberIsNaN fail the test');

assert(invalidDate(new Date()) === false, 'invalidDate fail the test');
assert(invalidDate(new Date('some invalid date')) === true, 'invalidDate fail the test');



// add tests
suite
  .add('invalidDate', () => {
    invalidDate(new Date());
    invalidDate(new Date('some invalid date'));
  })
  .add('numberIsNaN', () => {
    numberIsNaN(new Date());
    numberIsNaN(new Date('some invalid date'));
  })
  .add('globalIsNaN', () => {
    globalIsNaN(new Date());
    globalIsNaN(new Date('some invalid date'));
  })
  .run({
    async: true
  });
