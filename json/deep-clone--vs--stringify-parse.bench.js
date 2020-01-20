#!/usr/bin/env node

const assert = require('assert')

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')
// eslint-disable-next-line func-names
// const single = () => { stdout.write('1000'+'\n'); };
const originalObject = {
  a: 1,
  b: 2,
  c: { d: 3, e: 4 },
  array: [1, 2, 3, 4, '5', [6, 7, 8]],
  nan: NaN,
  null: null,
  true: true,
  false: false,
  objects: [
    { a: 1, b: 2 },
    { a: '1', b: '2' }
  ],
  nested: undefined,
  circus: undefined
}

// originalObject.circus = originalObject

const originalArray = [{
  a: 1,
  b: 2,
  c: { d: 3, e: 4 },
  array: [1, 2, 3, 4, '5', [6, 7, 8]],
  null: null,
  true: true,
  false: false,
  objects: [
    { a: 1, b: 2 },
    { a: '1', b: '2' }
  ],
  nested: undefined
}]

originalObject.nested = JSON.parse(JSON.stringify(originalObject))

const stringifyParse = json => JSON.parse(JSON.stringify(json))

function deepClone1 (input) {
  if (Array.isArray(input)) return input.map(deepClone1)

  if (!(input instanceof Object)) return input

  const clObj = {}
  for (const i in input) {
    if (input[i] instanceof Object) {
      clObj[i] = deepClone1(input[i])
      continue
    }
    clObj[i] = input[i]
  }
  return clObj
}

function deepClone2 (input) {
  if (Array.isArray(input)) {
    let iLen = input.length
    const arr = new Array(iLen)

    for (;iLen--;) {
      arr[iLen] = deepClone2(input[iLen])
    }

    return arr
  }

  if (!(input instanceof Object)) return input

  const clObj = {}
  for (const i in input) {
    if (input[i] instanceof Object) {
      clObj[i] = deepClone2(input[i])
      continue
    }

    clObj[i] = input[i]
  }

  return clObj
}

function deepClone3 (input) {
  if (Array.isArray(input)) {
    let iLen = input.length
    const arr = new Array(iLen)

    for (;iLen--;) {
      arr[iLen] = deepClone3(input[iLen])
    }

    return arr
  }

  if (!(input instanceof Object)) return input

  const clObj = {}
  for (const i in input) {
    clObj[i] = (input[i] instanceof Object) ? deepClone3(input[i]) : input[i]
  }

  return clObj
}

function deepClone4 (input) {
  if (Array.isArray(input)) {
    var iLen = input.length
    var arr = new Array(iLen)

    for (;iLen--;) {
      arr[iLen] = deepClone4(input[iLen])
    }

    return arr
  }

  if (!(input instanceof Object)) return input

  var clObj = {}
  for (var i in input) {
    clObj[i] = (input[i] instanceof Object) ? deepClone4(input[i]) : input[i]
  }

  return clObj
}

function deepClone5 (input) {
  if (!(input instanceof Object)) return input

  if (Array.isArray(input)) {
    let iLen = input.length
    const arr = new Array(iLen)

    for (;iLen--;) {
      arr[iLen] = deepClone5(input[iLen])
    }

    return arr
  }

  const clObj = {}
  for (const i in input) {
    clObj[i] = deepClone5(input[i])
  }

  return clObj
}


const deepClone6 = (input) => {
  if (!(input instanceof Object)) return input

  if (Array.isArray(input)) {
    let iLen = input.length
    const arr = new Array(iLen)

    for (;iLen--;) {
      arr[iLen] = deepClone6(input[iLen])
    }

    return arr
  }

  const clObj = {}
  for (const i in input) {
    clObj[i] = deepClone6(input[i])
  }

  return clObj
}

runTests()

suite
  // .add(stringifyParse.name, () => stringifyParse(originalObject))
  // .add(deepClone1.name, () => deepClone1(originalObject))
  // .add(deepClone2.name, () => deepClone2(originalObject))
  .add(deepClone3.name, () => deepClone3(originalObject))
  // .add(deepClone4.name, () => deepClone4(originalObject))
  .add(deepClone5.name, () => deepClone5(originalObject))
  .add(deepClone6.name, () => deepClone6(originalObject))
  .run({
    async: true
  })

function runTests () {
  const originalObjectString = JSON.stringify(originalObject)
  const originalArrayString = JSON.stringify(originalArray)

  const t0 = stringifyParse(originalObject)
  assert(JSON.stringify(t0) === originalObjectString)

  const tO1 = JSON.stringify(deepClone1(originalObject))
  assert(tO1 === originalObjectString, `\n${tO1}\n---\n${originalObjectString}`)
  const tA1 = JSON.stringify(deepClone1(originalArray))
  assert(tA1 === originalArrayString, `\n${tA1}\n---\n${originalArrayString}`)

  const tO2 = JSON.stringify(deepClone2(originalObject))
  assert(tO2 === originalObjectString, `\n${tO2}\n---\n${originalObjectString}`)
  const tA2 = JSON.stringify(deepClone2(originalArray))
  assert(tA2 === originalArrayString, `\n${tA2}\n---\n${originalArrayString}`)

  const tO3 = JSON.stringify(deepClone3(originalObject))
  assert(tO3 === originalObjectString, `\n${tO3}\n---\n${originalObjectString}`)
  const tA3 = JSON.stringify(deepClone3(originalArray))
  assert(tA3 === originalArrayString, `\n${tA3}\n---\n${originalArrayString}`)

  const tO4 = JSON.stringify(deepClone4(originalObject))
  assert(tO4 === originalObjectString, `\n${tO4}\n---\n${originalObjectString}`)
  const tA4 = JSON.stringify(deepClone4(originalArray))
  assert(tA4 === originalArrayString, `\n${tA4}\n---\n${originalArrayString}`)

  const tO5 = JSON.stringify(deepClone5(originalObject))
  assert(tO5 === originalObjectString, `\n${tO5}\n---\n${originalObjectString}`)
  const tA5 = JSON.stringify(deepClone5(originalArray))
  assert(tA5 === originalArrayString, `\n${tA5}\n---\n${originalArrayString}`)
}
