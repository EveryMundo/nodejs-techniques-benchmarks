#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console, no-new-func */
const assert = require('assert')

// const suite = require('../lib/bench')

const sleep = n => new Promise((resolve) => setTimeout(resolve, n | 1000))

async function run (runForXms = 1000) {
// eslint-disable-next-line func-names

  const oldPad = _idx => ('00000' + _idx).substr(-5)
  const nativePad1 = _idx => _idx.toString().padStart(5, '0')
  const nativePad2 = _idx => ('' + _idx).padStart(5, '0')
  const nativePadCall1 = _idx => String.prototype.padStart.call(_idx, 5, '0')
  const { padStart } = String.prototype
  const nativePadCall2 = _idx => padStart.call(_idx, 5, '0')

  const baseNumber = (Math.random() * 1000) | 0
  const baseline = oldPad(baseNumber)
  console.log({ baseNumber, baseline });
  [oldPad, nativePad1, nativePad2, nativePadCall1, nativePadCall2].forEach(f => {
    const t = f(baseNumber)
    const res = assert(t === baseline, `Error on ${f.name}(${baseNumber})[${t}] !== ${baseline}`)
    if (res instanceof Error) {
    //   throw res
      process.exit(0)
    }
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

  function oldPadBench () {
    oldPad(1)
    oldPad(10)
    oldPad(100)
    oldPad(1000)
    oldPad(10000)
  }

  function nativePad1Bench () {
    nativePad1(1)
    nativePad1(10)
    nativePad1(100)
    nativePad1(1000)
    nativePad1(10000)
  }

  function nativePad2Bench () {
    nativePad2(1)
    nativePad2(10)
    nativePad2(100)
    nativePad2(1000)
    nativePad2(10000)
  }

  function nativePadCall1Bench () {
    nativePadCall1(1)
    nativePadCall1(10)
    nativePadCall1(100)
    nativePadCall1(1000)
    nativePadCall1(10000)
  }

  function nativePadCall2Bench () {
    nativePadCall2(1)
    nativePadCall2(10)
    nativePadCall2(100)
    nativePadCall2(1000)
    nativePadCall2(10000)
  }

  const createTimedFunction = (f, x, y) => {
    const max = Math.abs(x) || 100
    const loopSize = Math.abs(y) || 100

    return () => {
      const start = performance.now()
      do {
        for (let i = loopSize; i--;) f()
      } while (performance.now() - start < max)
    }
  }

  const funcs = [oldPadBench, nativePad1Bench, nativePad2Bench, nativePadCall1Bench, nativePadCall2Bench]
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

  // reports.sort((a, b) => a.calls - b.calls)
  reports.sort((a, b) => b.avg - a.avg)
  console.log(JSON.stringify(reports, null, 2))
  const { [reports.length - 1]: fastest, 0: slowest } = reports

  console.log(`fastest ${fastest.name} with an average of ${(fastest.avg * 1000).toFixed(6)} microseconds it completed ${fastest.calls} calls in ${fastest.total}ms`)
  console.log(`slowest ${slowest.name} with an average of ${(slowest.avg * 1000).toFixed(6)} microseconds it completed ${slowest.calls} calls in ${slowest.total}ms`)
}

module.exports = { run }

if (process.mainModule === module) run(+process.argv[2] || 1000)
