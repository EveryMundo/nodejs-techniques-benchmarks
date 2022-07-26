'use strict'

const logr = require('@everymundo/simple-logr')// .createLogger({ prettyPrint: true })
const { Suite } = require('benchmark')

const suite = new Suite({
  initCount: 10000
})

suite
  .on('start', () => {
    logr.info(`\nStarting with Node ${process.version}\n`)
  })
  .on('cycle', (event) => {
    logr.info(String(event.target))
  })
  .on('complete', function onComplete () {
    const fastest = this.filter('fastest').map('name')
    logr.info(`
      Node ${process.version}
      Fastest is ${fastest}
    `)
  })

module.exports = suite
