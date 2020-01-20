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

originalObject.nested = JSON.parse(JSON.stringify(originalObject))
originalObject.circus = originalObject

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

const realClone = (input, history = []) => {
  if (history.includes(input)) return '[Circular]'

  if (Array.isArray(input)) {
    history.push(input)

    return input.map(_ => realClone(_, history))
  }

  if (input instanceof Object) {
    history.push(input)
    const ret = {}

    Object.keys(input).forEach((key) => {
      ret[key] = realClone(input[key], history)
    })

    return ret
  }

  return input
}

const realClone2 = (obj, history = new WeakSet()) => {
  if (history.has(obj)) return '[Circular]'

  if (Array.isArray(obj)) {
    history.add(obj)
    return obj.map(_ => realClone2(_, history))
  }

  if (obj instanceof Object) {
    history.add(obj)
    const ret = {}

    Object.keys(obj).forEach((key) => {
      ret[key] = realClone2(obj[key], history)
    })

    return ret
  }

  return obj
}

const realClone3 = (input, history = []) => {
  if (history.indexOf(input) > -1) return '[Circular]'

  if (Array.isArray(input)) {
    history.push(input)

    let iLen = input.length
    const arr = new Array(iLen)

    for (;iLen--;) {
      arr[iLen] = realClone3(input[iLen], history)
    }

    return arr
  }

  if (!(input instanceof Object)) return input

  history.push(input)
  const ret = {}

  for (const i in input) {
    ret[i] = (input[i] instanceof Object) ? realClone3(input[i], history) : input[i]
  }

  return ret
}

const realClone4 = (input, history = []) => {
  if (!(input instanceof Object)) return input

  if (history.indexOf(input) > -1) return '[Circular]'

  history.push(input)

  if (Array.isArray(input)) {
    let iLen = input.length
    const arr = new Array(iLen)

    for (;iLen--;) {
      arr[iLen] = realClone4(input[iLen], history)
    }

    return arr
  }

  const ret = {}

  for (const i in input) {
    ret[i] = (input[i] instanceof Object) ? realClone4(input[i], history) : input[i]
  }

  return ret
}

// const stringifyParse = json => JSON.parse(JSON.stringify(json))

runTests()

suite
//   .add(stringifyParse.name, () => stringifyParse(originalObject))
  // .add(realClone.name, () => realClone(originalObject))
  // .add(realClone2.name, () => realClone2(originalObject))
  .add(realClone3.name, () => realClone3(originalObject))
  .add(realClone4.name, () => realClone3(originalObject))
  .run({
    async: true
  })

function runTests () {
  const originalObjectString = JSON.stringify(realClone(originalObject))
  const originalArrayString = JSON.stringify(realClone(originalArray))

  const tReal = JSON.stringify(realClone(originalObject))
  assert(tReal === originalObjectString, `\n${tReal}\n---\n${originalObjectString}`)
  const taReal = JSON.stringify(realClone(originalArray))
  assert(taReal === originalArrayString, `\n${taReal}\n---\n${originalArrayString}`)

  const tReal2 = JSON.stringify(realClone2(originalObject))
  assert(tReal2 === originalObjectString, `\n${tReal2}\n---\n${originalObjectString}`)
  const taReal2 = JSON.stringify(realClone2(originalArray))
  assert(taReal2 === originalArrayString, `\n${taReal2}\n---\n${originalArrayString}`)

  const tReal3 = JSON.stringify(realClone3(originalObject))
  assert(tReal3 === originalObjectString, `\n${tReal3}\n---\n${originalObjectString}`)
  const taReal3 = JSON.stringify(realClone3(originalArray))
  assert(taReal3 === originalArrayString, `\n${taReal3}\n---\n${originalArrayString}`)

  const tReal4 = JSON.stringify(realClone4(originalObject))
  assert(tReal4 === originalObjectString, `\n${tReal4}\n---\n${originalObjectString}`)
  const taReal4 = JSON.stringify(realClone4(originalArray))
  assert(taReal4 === originalArrayString, `\n${taReal4}\n---\n${originalArrayString}`)
}
