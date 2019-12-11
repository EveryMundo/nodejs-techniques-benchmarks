#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('./lib/bench')

// const str = require('fs').readFileSync(__filename).toString();
// const sampleString = Array.from({length: 10}, () => str).join('\n');
const sampleString = '11111\n222222\n333333\n4444444\n5555555'
const sampleBuffer = Buffer.from(sampleString)

const splitAndCount = (input) => input.split('\n').length

// const single = () => { stdout.write('1000'+'\n'); };
const iterateOverBreakLines = (input) => {
  const enter = '\n'
  let indexOfEnter = 0
  let total = 0

  while (indexOfEnter !== -1) {
    indexOfEnter = input.indexOf(enter, indexOfEnter + 1)
    total += 1
  }

  return total
}

const iterateOverBufferBreakLines = (input) => {
  const enter = 10
  const buffer = Buffer.from(input)

  let indexOfEnter = 0
  let total = 0

  while (indexOfEnter !== -1) {
    indexOfEnter = buffer.indexOf(enter, indexOfEnter + 1)
    total += 1
  }

  return total
}

const iterateOverSampleBuffer = (buffer) => {
  const enter = Buffer.from('\n')

  let indexOfEnter = 0
  let total = 0

  while (indexOfEnter !== -1) {
    indexOfEnter = buffer.indexOf(enter, indexOfEnter + 1)
    total += 1
  }

  return total
}

const iterateOverSampleBuffer10 = (buffer) => {
  const enter = 10

  let indexOfEnter = 0
  let total = 0

  while (indexOfEnter !== -1) {
    indexOfEnter = buffer.indexOf(enter, indexOfEnter + 1)
    total += 1
  }

  return total
}

const countStringCharByChar = (inputString) => {
  let i = -1
  let count = 1

  while (inputString[++i] !== undefined) {
    if (inputString[i] === '\n') {
      count++
    }
  }

  return count
}

const countBufferCharByChar = (inputString) => {
  let i = -1
  let count = 1
  const inputBuffer = Buffer.from(inputString)

  while (inputBuffer[++i] !== undefined) {
    if (inputBuffer[i] === 10) {
      count++
    }
  }

  return count
}

Promise.all([
  splitAndCount(sampleString),
  iterateOverBreakLines(sampleString),
  iterateOverBufferBreakLines(sampleString),
  countStringCharByChar(sampleString),
  countBufferCharByChar(sampleString)
])
  .then(([res1, res2, res3, res4, res5]) => {
    if (res1 !== res2) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res2}] iterateOverBreakLines(superString)`)
    //   process.exit(1);
    }

    if (res1 !== res3) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res3}] iterateOverBufferBreakLines(superString)`)
    //   process.exit(1);
    }

    if (res1 !== res4) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res4}] countWithFor(superString)`)
    //   process.exit(1);
    }

    if (res1 !== res5) {
      console.log(`splitAndCount(superString) [${res1}] !== [${res4}] countWithFor(superString)`)
    //   process.exit(1);
    }

    // add tests
    suite
      .add(`${iterateOverSampleBuffer10.name}  `, () => iterateOverSampleBuffer10(sampleBuffer))
      .add(`${iterateOverSampleBuffer.name}    `, () => iterateOverSampleBuffer(sampleBuffer))
      .add(`${iterateOverBufferBreakLines.name}`, () => iterateOverBufferBreakLines(sampleString))
      .add(`${iterateOverBreakLines.name}      `, () => iterateOverBreakLines(sampleString))
      .add(`${countStringCharByChar.name}      `, () => countStringCharByChar(sampleString))
      .add(`${countBufferCharByChar.name}      `, () => countBufferCharByChar(sampleString))
      .add(`${splitAndCount.name}              `, () => splitAndCount(sampleString))
    // .add(single.name, () => single())
      .run({
        async: false
      })
  })
