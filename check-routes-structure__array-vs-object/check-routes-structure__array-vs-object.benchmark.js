#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')
const clone = require('../lib/clone')
const supportData = require('./support-data')
const arrayToObject = a => a.reduce((o, item) => (o[item] = true) && o, {})

const { arrivalAirportIataCodes } = supportData
const arrivalAirportIataCodesLength = arrivalAirportIataCodes.length
const objectInnerStructure = arrayToObject(arrivalAirportIataCodes)
const departureAirportIataCodes = arrivalAirportIataCodes.slice(100, 200)
const departureAirportIataCodesLength = departureAirportIataCodes.length

const objectWithLists = departureAirportIataCodes.reduce((_, code) => { _[code] = clone(arrivalAirportIataCodes); return _ }, {})
const simpleList = departureAirportIataCodes.flatMap(orig => arrivalAirportIataCodes.map(dest => `${orig}${dest}`))// .sort();
// const simpleString = simpleList.join('|')// .sort();
const simpleSet = new Set(simpleList)
const simpleObjectUndef = simpleList.reduce((o, route) => (o[route] = undefined) || o, {})
const simpleObject = simpleList.reduce((o, route) => (o[route] = true) && o, {})
const objectWithSets = departureAirportIataCodes.reduce((_, code) => { _[code] = new Set(arrivalAirportIataCodes); return _ }, {})
const mapWithSets = departureAirportIataCodes.reduce((_, code) => { _.set(code, new Set(arrivalAirportIataCodes)); return _ }, new Map())
const objectWithStrings = departureAirportIataCodes.reduce((_, code) => { _[code] = arrivalAirportIataCodes.join('|'); return _ }, {})
const objectWithBuffers = departureAirportIataCodes.reduce((_, code) => { _[code] = Buffer.from(arrivalAirportIataCodes.join('|')); return _ }, {})
const objectWithObjects = departureAirportIataCodes.reduce((_, code) => { _[code] = clone(objectInnerStructure); return _ }, {})

console.log({
  simpleList: simpleList.length,
  departureAirportIataCodes: departureAirportIataCodes.length
})

const departureAirportIataCodesRandom = departureAirportIataCodes.reduce((a, item) => {
  if (Math.random() > 0.49) {
    a.push(item)
  } else {
    a.unshift(item)
  }

  return a
}, [])

const validateSimpleListsDotIndexOf = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!simpleList.indexOf(orig + dest) === -1) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateSimpleListsDotIndexOf2 = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const route = orig + arrivalAirportIataCodes[j]
      // Number(route)
      if (!simpleList.indexOf(route) === -1) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateSimpleSetDotHas = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]

    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!simpleSet.has(orig + arrivalAirportIataCodes[j]) === -1) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateSimpleObjectUndefIn = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]

    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!(orig + arrivalAirportIataCodes[j] in simpleObjectUndef)) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateSimpleObjectIn = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]

    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!(orig + arrivalAirportIataCodes[j] in simpleObject)) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateSimpleObjectValue = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]

    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!simpleObject[orig + arrivalAirportIataCodes[j]]) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateWithListsDotIncludes = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithLists)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!objectWithLists[orig].includes(dest)) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateWithListsDotIndexOf = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithLists)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!objectWithLists[orig].indexOf(dest) === -1) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateWithListsDotIndexOfNoConst = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    if (!(departureAirportIataCodesRandom[i] in objectWithLists)) {
      throw new Error(`houston we have a problem with ${departureAirportIataCodesRandom[i]}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!objectWithLists[departureAirportIataCodesRandom[i]].indexOf(arrivalAirportIataCodes[j]) === -1) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const validateWithSetsDotHas = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithSets)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!objectWithSets[orig].has(dest)) {
        throw new Error(`houston we have a problem with ${objectWithSets}`)
      }
    }
  }
}

const validateMapsWithSetsDotHas = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!mapWithSets.has(orig)) {
      throw new Error(`houston we have a problem with ${mapWithSets}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!mapWithSets.get(orig).has(dest)) {
        throw new Error(`houston we have a problem with ${mapWithSets}`)
      }
    }
  }
}

const validateWithStringDotIncludes = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithStrings)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!objectWithStrings[orig].includes(dest)) {
        throw new Error(`houston we have a problem with ${objectWithStrings}`)
      }
    }
  }
}

const validateWithStringDotIndexOf = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithStrings)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!objectWithStrings[orig].indexOf(dest) === -1) {
        throw new Error(`houston we have a problem with ${objectWithStrings}`)
      }
    }
  }
}

const validateWithBufferDotIncludes = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithBuffers)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!objectWithBuffers[orig].includes(dest)) {
        throw new Error(`houston we have a problem with ${objectWithBuffers}`)
      }
    }
  }
}

const validateWithBufferDotIndexOf = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithBuffers)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!objectWithBuffers[orig].indexOf(dest) === -1) {
        throw new Error(`houston we have a problem with ${objectWithBuffers}`)
      }
    }
  }
}

const validateWithObjectValueTrue = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = objectWithObjects[departureAirportIataCodesRandom[i]]
    if (orig === undefined) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = orig[arrivalAirportIataCodes[j]]
      if (!dest) {
        throw new Error(`houston we have a problem with j=${j} and dest=[${dest}]`)
      }
    }
  }
}

const validateWithObjectKeyIn = () => {
  let i = departureAirportIataCodesLength
  for (; i--;) {
    const orig = departureAirportIataCodesRandom[i]
    if (!(orig in objectWithObjects)) {
      throw new Error(`houston we have a problem with ${orig}`)
    }

    for (let j = arrivalAirportIataCodesLength; j--;) {
      const dest = arrivalAirportIataCodes[j]
      if (!(dest in objectWithObjects[orig])) {
        throw new Error(`houston we have a problem with j=${j} and dest=[${dest}]`)
      }
    }
  }
}

const validateWithObjectKeyInNoVar = () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!(arrivalAirportIataCodes[j] in objectWithObjects[departureAirportIataCodesRandom[i]])) {
        throw new Error(`houston we have a problem with ${arrivalAirportIataCodes}`)
      }
    }
  }
}

const functions = [
  validateSimpleObjectUndefIn,
  validateSimpleObjectIn,
  validateSimpleObjectValue,
  validateSimpleSetDotHas,
  validateWithListsDotIndexOfNoConst,
  validateWithListsDotIncludes,
  validateWithListsDotIndexOf,
  validateWithSetsDotHas,
  validateMapsWithSetsDotHas,
  validateWithStringDotIncludes,
  validateWithStringDotIndexOf,
  validateWithBufferDotIncludes,
  validateWithBufferDotIndexOf,
  validateWithObjectValueTrue,
  validateWithObjectKeyIn,
  validateWithObjectKeyInNoVar
]

Promise.all(functions.map((f) => {
  console.log(`calling ${f.name}`)
  f()
}))
  .then(() => {
    // add tests
    suite
      // .add(`${validateSimpleSetDotHas.name}            `, () => validateSimpleSetDotHas())
      .add(`${validateSimpleListsDotIndexOf.name}      `, () => validateSimpleListsDotIndexOf())
      .add(`${validateSimpleListsDotIndexOf2.name}      `, () => validateSimpleListsDotIndexOf2())
      .add(`${validateWithListsDotIndexOfNoConst.name} `, () => validateWithListsDotIndexOfNoConst())
      .add(`${validateWithObjectKeyInNoVar.name}       `, () => validateWithObjectKeyInNoVar())
      .add(`${validateSimpleObjectUndefIn.name}        `, () => validateSimpleObjectUndefIn())
      .add(`${validateSimpleObjectIn.name}             `, () => validateSimpleObjectIn())
      .add(`${validateSimpleObjectValue.name}          `, () => validateSimpleObjectValue())
      .add(`${validateWithListsDotIncludes.name}       `, () => validateWithListsDotIncludes())
      .add(`${validateWithListsDotIndexOf.name}        `, () => validateWithListsDotIndexOf())
      .add(`${validateWithSetsDotHas.name}             `, () => validateWithSetsDotHas())
      .add(`${validateMapsWithSetsDotHas.name}         `, () => validateMapsWithSetsDotHas())
      .add(`${validateWithStringDotIncludes.name}      `, () => validateWithStringDotIncludes())
      .add(`${validateWithStringDotIndexOf.name}       `, () => validateWithStringDotIndexOf())
      .add(`${validateWithBufferDotIncludes.name}      `, () => validateWithBufferDotIncludes())
      .add(`${validateWithBufferDotIndexOf.name}       `, () => validateWithBufferDotIndexOf())
      .add(`${validateWithObjectValueTrue.name}        `, () => validateWithObjectValueTrue())
      .add(`${validateWithObjectKeyIn.name}            `, () => validateWithObjectKeyIn())
    // .add(single.name, () => single())
      .run({
        async: false
      })
  })
