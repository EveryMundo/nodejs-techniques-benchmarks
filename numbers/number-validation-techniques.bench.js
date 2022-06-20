#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console, no-new-func */
const assert = require('assert')

// const suite = require('../lib/bench')

const sleep = n => new Promise((resolve) => setTimeout(resolve, n | 1000))
async function run (runForXms = 1000) {
// eslint-disable-next-line func-names
  const NumberRegx = /^\s*-?\d+(?:\.\d+)?\s*$/
  const datacore = (val) => val != null && NumberRegx.test(val)
  const singleLined = (val) => '' + val !== '' && Number.isFinite(+('' + val))
  const stackOverflow = function isReferringFiniteNumber (candidate) {
    if (typeof (candidate) === 'number') return Number.isFinite(candidate)
    if (typeof (candidate) === 'string') {
      return (candidate.trim() !== '') && Number.isFinite(Number(candidate))
    }

    return false
  }

  const stackOverflowB = (candidate) => {
    if (typeof (candidate) === 'number') return Number.isFinite(candidate)

    return (typeof (candidate) === 'string') && (candidate.trim() !== '') && Number.isFinite(Number(candidate))
  }

  const falseList = [NaN, Infinity, -Infinity, '', false, true, undefined, null, [], [1, 2], {}, { a: 10 }]
  falseList.forEach((val) => {
    assert.strictEqual(datacore(val), false, `val [${val}] should be false! failed for datacore`)
    assert.strictEqual(singleLined(val), false, `val [${val}] should be false! failed for singleLined`)
    assert.strictEqual(stackOverflow(val), false, `val [${val}] should be false! failed for stackOverflow`)
    assert.strictEqual(stackOverflowB(val), false, `val [${val}] should be false! failed for stackOverflowB`)
  })

  const trueList = [-1, 100, 0, 2.5e10]
  trueList.forEach((val) => {
    assert.strictEqual(datacore(val), true, `val [${val}] should be true! failed for datacore`)
    assert.strictEqual(singleLined(val), true, `val [${val}] should be true! failed for singleLined`)
    assert.strictEqual(stackOverflow(val), true, `val [${val}] should be true! failed for stackOverflow`)
    assert.strictEqual(stackOverflowB(val), true, `val [${val}] should be true! failed for stackOverflowB`)
  })

  // const { A, B, C, D } = falseList.concat(trueList).reduce((acc, val) => {
  //   const V = val instanceof Object ? JSON.stringify(val) : (val === '' ? '\'\'' : val)
  //   acc.A = `${acc.A}\n\tdatacore(${V})`
  //   acc.B = `${acc.B}\n\tsingleLined(${V})`
  //   acc.C = `${acc.C}\n\tstackOverflow(${V})`
  //   acc.D = `${acc.D}\n\tstackOverflowB(${V})`

  //   return acc
  // }, { A: ' ', B: ' ', C: ' ', D: ' ' })

  // console.log(A.toString())
  // console.log(B.toString())
  // console.log(C.toString())
  // console.log(D.toString())

  // let fOfA, fOfB, fOfC, fOfD
  // eval(`fOfA = () => {${A}}`)
  // eval(`fOfB = () => {${B}}`)
  // eval(`fOfC = () => {${C}}`)
  // eval(`fOfD = () => {${D}}`)

  function datacoreBench () {
    // datacore(NaN)
    // datacore(Infinity)
    // datacore(-Infinity)
    // datacore('')
    // datacore(false)
    // datacore(true)
    // datacore(undefined)
    // datacore(null)
    // datacore([])
    // datacore([1, 2])
    // datacore({})
    // datacore({ a: 10 })
    datacore(-1)
    datacore(100)
    datacore(0)
    datacore(25000000000)
  }
  function singleLinedBench () {
    // singleLined(NaN)
    // singleLined(Infinity)
    // singleLined(-Infinity)
    // singleLined('')
    // singleLined(false)
    // singleLined(true)
    // singleLined(undefined)
    // singleLined(null)
    // singleLined([])
    // singleLined([1, 2])
    // singleLined({})
    // singleLined({ a: 10 })
    singleLined(-1)
    singleLined(100)
    singleLined(0)
    singleLined(25000000000)
  }

  function stackOverflow1Bench () {
    // stackOverflow(NaN)
    // stackOverflow(Infinity)
    // stackOverflow(-Infinity)
    // stackOverflow('')
    // stackOverflow(false)
    // stackOverflow(true)
    // stackOverflow(undefined)
    // stackOverflow(null)
    // stackOverflow([])
    // stackOverflow([1, 2])
    // stackOverflow({})
    // stackOverflow({ a: 10 })
    stackOverflow(-1)
    stackOverflow(100)
    stackOverflow(0)
    stackOverflow(25000000000)
  }

  function stackOverflow2Bench () {
    // stackOverflowB(NaN)
    // stackOverflowB(Infinity)
    // stackOverflowB(-Infinity)
    // stackOverflowB('')
    // stackOverflowB(false)
    // stackOverflowB(true)
    // stackOverflowB(undefined)
    // stackOverflowB(null)
    // stackOverflowB([])
    // stackOverflowB([1, 2])
    // stackOverflowB({})
    // stackOverflowB({ a: 10 })
    stackOverflowB(-1)
    stackOverflowB(100)
    stackOverflowB(0)
    stackOverflowB(25000000000)
  }
  /*
  const createFunction = (f, x = 10 ** 7) => {
    const func = () => {
      for (let i = x; i-- > 0;) f()
    }

    return Object.defineProperty(func, 'name', { value: f.name })
  }
  */

  const createTimedFunction = (f, x) => {
    const max = Math.abs(x) || 100

    return () => {
      const start = performance.now()
      do { f() } while (performance.now() - start < max)
    }
  }

  const funcs = [datacoreBench, singleLinedBench, stackOverflow1Bench, stackOverflow2Bench]
  const { performance, PerformanceObserver } = require('perf_hooks')

  const reports = new Array(funcs.length)

  for (let i = 0; i < funcs.length; i++) {
    const f = funcs[i]
    const fWrapped = performance.timerify(f)
    const { name } = f
    const multiCalls = createTimedFunction(fWrapped, runForXms, name)

    const report = {
      name,
      calls: 0,
      total: 0,
      get avg () { return this.total / this.calls }
    }
    reports[i] = report

    const obs = new PerformanceObserver((list) => {
      const listEntries = list.getEntries()
      for (let ix = listEntries.length; ix-- > 0;) {
        report.total += listEntries[ix].duration
        report.calls++
      }
    })

    obs.observe({ entryTypes: ['function'], buffered: true })
    console.time(name)
    multiCalls()
    console.timeEnd(name)
    await sleep(10)
    obs.disconnect()
  }

  reports.sort((a, b) => a.calls - b.calls)
  console.log(JSON.stringify(reports, null, 2))
  const { [reports.length - 1]: fastest, 0: slowest } = reports

  console.log(`fastest ${fastest.name} with an average of ${(fastest.avg * 1000).toFixed(6)} microseconds it completed ${fastest.calls} calls in ${fastest.total}ms`)
  console.log(`slowest ${slowest.name} with an average of ${(slowest.avg * 1000).toFixed(6)} microseconds it completed ${slowest.calls} calls in ${slowest.total}ms`)
}

module.exports = { run }

if (require.main === module) run(+process.argv[2] || 1000)
