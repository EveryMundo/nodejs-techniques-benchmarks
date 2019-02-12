#!/usr/bin/env node

'use strict';

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('./lib/bench');

const str = require('fs').readFileSync(__filename).toString();
// const superString = Array.from({length: 10}, () => str).join('\n');
const superString = '11111\n222222\n333333\n4444444\n5555555';
const superBuffer = Buffer.from(superString);

const splitAndCount = (input) => input.split('\n').length;

// const single = () => { stdout.write('1000'+'\n'); };
const iterateOverBreakLines = (input) => {
  const enter = '\n';
  let indexOfEnter = 0;
  let total = 0;

  while(indexOfEnter !== -1) {
    indexOfEnter = input.indexOf(enter, indexOfEnter + 1);
    total += 1;
  }

  return total;
};

const iterateOverBufferBreakLines = (input) => {
  const enter = 10;
  const buffer = Buffer.from(input);

  let indexOfEnter = 0;
  let total = 0;

  while(indexOfEnter !== -1) {
    indexOfEnter = buffer.indexOf(enter, indexOfEnter + 1);
    total += 1;
  }

  return total;
};

const iterateOverSuperBuffer = (buffer) => {
  const enter = Buffer.from('\n');

  let indexOfEnter = 0;
  let total = 0;

  while(indexOfEnter !== -1) {
    indexOfEnter = buffer.indexOf(enter, indexOfEnter + 1);
    total += 1;
  }

  return total;
};

const iterateOverSuperBuffer10 = (buffer) => {
  const enter = 10;

  let indexOfEnter = 0;
  let total = 0;

  while(indexOfEnter !== -1) {
    indexOfEnter = buffer.indexOf(enter, indexOfEnter + 1);
    total += 1;
  }

  return total;
};

const countWithFor = (inputString) => {
  let i = -1;
  let count = 1;

  while (inputString[++i] !== undefined) {
    if (inputString[i] === '\n') {
      count++;
    }
  }

  return count;
};

const countWithForBuffer = (inputString) => {
  let i = -1;
  let count = 1;
  const inputBuffer = Buffer.from(inputString);

  while (inputBuffer[++i] !== undefined) {
    if (inputBuffer[i] === 10) {
      count++;
    }
  }

  return count;
};

Promise.all([
  splitAndCount(superString),
  iterateOverBreakLines(superString),
  iterateOverBufferBreakLines(superString),
  countWithFor(superString),
  countWithForBuffer(superString),
])
  .then(([res1, res2, res3, res4, res5]) => {
    if (res1 !== res2) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res2}] iterateOverBreakLines(superString)`);
    //   process.exit(1);
    }

    if (res1 !== res3) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res3}] iterateOverBufferBreakLines(superString)`);
    //   process.exit(1);
    }
    
    if (res1 !== res4) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res4}] countWithFor(superString)`);
    //   process.exit(1);
    }
    
    if (res1 !== res5) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res4}] countWithFor(superString)`);
    //   process.exit(1);
    }
    
    // add tests
    suite
      .add(iterateOverSuperBuffer10.name,    () => iterateOverSuperBuffer10(superBuffer))
      .add(iterateOverSuperBuffer.name,      () => iterateOverSuperBuffer(superBuffer))
      .add(iterateOverBufferBreakLines.name, () => iterateOverBufferBreakLines(superString))
      .add(iterateOverBreakLines.name,       () => iterateOverBreakLines(superString))

      .add(countWithFor.name,       () => countWithFor(superString))
      .add(countWithForBuffer.name, () => countWithForBuffer(superString))
      .add(splitAndCount.name,      () => splitAndCount(superString))
    // .add(single.name, () => single())
      .run({
        async: false
      });
  });