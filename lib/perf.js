'use strict'

const logr = require('@everymundo/simple-logr')// .createLogger({ prettyPrint: true })
const { performance, PerformanceObserver } = require('perf_hooks')

const sleep = n => new Promise((resolve) => setTimeout(resolve, n | 1000))

const prettyNum = (n) => ('' + n)

const createTimedFunction = (f, x) => {
  const max = Math.abs(x) || 100

  return () => {
    const start = performance.now()
    let i = 0
    do { f(); i++ } while (performance.now() - start < max)

    return i
  }
}

const createAsyncTimedFunction = (f, x) => {
  const max = Math.abs(x) || 100

  return async () => {
    const start = performance.now()
    do { await f() } while (performance.now() - start < max)
  }
}

class BenchSuite {
  constructor ({ initCount = 5000, delay = 0.5 }) {
    this.funcs = []
    this.initCount = initCount
    this.delay = delay
  }

  add (name, func) {
    if (typeof func !== 'function') throw new Error('add method requires a function')
    this.funcs.push({ name, func })

    return this
  }

  run ({ async = false, runForXms = 1000 }) {
    return async ? this.runAsync(runForXms) : this.runSync(runForXms)
  }

  async runAsync (runForXms) {
    const reports = new Array(this.funcs.length)
    const { funcs } = this

    for (let i = 0; i < funcs.length; i++) {
      const { name, func } = funcs[i]
      const fWrapped = performance.timerify(func)
      const multiCalls = createAsyncTimedFunction(fWrapped, runForXms, name)

      reports[i] = {
        name,
        calls: 0,
        total: 0,
        get avg () { return this.total / this.calls }
      }

      const obs = new PerformanceObserver((list) => {
        const listEntries = list.getEntries()
        for (let ix = listEntries.length; ix-- > 0;) {
          reports[i].total += listEntries[ix].duration
          reports[i].calls++
        }
      })

      obs.observe({ entryTypes: ['function'], buffered: true })
      console.time(name)
      await multiCalls()
      console.timeEnd(name)
      await sleep(10)
      obs.disconnect()
    }

    reports.sort((a, b) => a.calls - b.calls)
    logr.info(JSON.stringify(reports, null, 2))
    const { [reports.length - 1]: fastest, 0: slowest } = reports

    logr.info(`fastest ${fastest.name} with an average of ${(fastest.avg * 1000).toFixed(6)} microseconds it completed ${fastest.calls} calls in ${fastest.total}ms`)
    logr.info(`slowest ${slowest.name} with an average of ${(slowest.avg * 1000).toFixed(6)} microseconds it completed ${slowest.calls} calls in ${slowest.total}ms`)
  }

  runSync (runForXms) {
    const reports = new Array(this.funcs.length)

    for (let i = 0; i < this.funcs.length; i++) {
      const { name, func } = this.funcs[i]
      console.time(`${name}: Warming up`)
      for (let x = this.initCount; x-- > 0;) func()
      console.timeEnd(`${name}: Warming up`)
      logr.info({ runForXms })
      const fWrapped = performance.timerify(func)
      const multiCalls = createTimedFunction(fWrapped, runForXms)
      // const multiCalls = createTimedFunction(func, runForXms)

      reports[i] = {
        name,
        calls: 0,
        total: 0,
        // get avg () { return this.total / this.calls },
        get opsPerSec () { return this.total / (runForXms / 1000) }
      }

      const obs = new PerformanceObserver((list) => {
        const listEntries = list.getEntries()
        for (let ix = listEntries.length; ix-- > 0;) {
          reports[i].total += listEntries[ix].duration
          reports[i].calls++
        }
      })

      obs.observe({ entryTypes: ['function'], buffered: false })
      console.time(name)
      const multiCount = multiCalls()
      reports[i].total = multiCount
      logr.info({ name, multiCount })
      console.timeEnd(name)
      obs.disconnect()
    }

    reports.sort((a, b) => a.calls - b.calls)

    reports.forEach(report => logr.info({ report }))

    const { [reports.length - 1]: fastest, 0: slowest } = reports

    logr.info(`fastest ${fastest.name} with an average of ${(fastest.avg * 1000).toFixed(6)} microseconds it completed ${fastest.calls} calls in ${fastest.total}ms`)
    logr.info(`slowest ${slowest.name} with an average of ${(slowest.avg * 1000).toFixed(6)} microseconds it completed ${slowest.calls} calls in ${slowest.total}ms`)
  }

  simpleSync (runForXms) {
    const reports = new Array(this.funcs.length)

    for (let i = 0; i < this.funcs.length; i++) {
      const { name, func } = this.funcs[i]
      console.time(`${name}: Warming up`)
      for (let x = this.initCount; x-- > 0;) func()
      console.timeEnd(`${name}: Warming up`)
      logr.info({ runForXms })
      const multiCalls = createTimedFunction(func, runForXms)

      reports[i] = {
        name,
        calls: 0,
        get opsPerSec () { return this.calls / (runForXms / 1000) }
      }

      console.time(name)
      const multiCount = multiCalls()
      reports[i].calls = multiCount
      logr.info({ name, multiCount })
      console.timeEnd(name)
    }

    reports.sort((a, b) => a.calls - b.calls)

    reports.forEach(report => logr.info({ report }))

    const { [reports.length - 1]: fastest, 0: slowest } = reports

    logr.info(`fastest ${fastest.name} with an average of ${fastest.opsPerSec} operations/sec. Completed with a ${fastest.calls} total calls`)
    logr.info(`slowest ${slowest.name} with an average of ${slowest.opsPerSec} operations/sec. Completed with a ${slowest.calls} total calls`)
  }
}

module.exports = {
  get suite () {
    return new BenchSuite({ initCount: 5000, minSamples: 25, delay: 0.5 })
  }
}
