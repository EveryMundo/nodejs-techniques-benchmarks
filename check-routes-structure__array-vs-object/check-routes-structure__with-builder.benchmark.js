#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')
const clone = require('../lib/clone')
const supportData = require('./support-data')
const arrayToObject = (a, value = true) => a.reduce((o, item) => { o[item] = value; return o }, {})

const { arrivalAirportIataCodes } = supportData
arrivalAirportIataCodes.sort()
const arrivalAirportIataCodesLength = arrivalAirportIataCodes.length
const objectInnerStructure = arrayToObject(arrivalAirportIataCodes)
const objectInnerStructureNulls = arrayToObject(arrivalAirportIataCodes, null)
const departureAirportIataCodes = arrivalAirportIataCodes.slice(100, 110)
const departureAirportIataCodesLength = departureAirportIataCodes.length

const objectWithLists = departureAirportIataCodes.reduce((o, code) => (o[code] = clone(arrivalAirportIataCodes)) && o, {})
const simpleList = departureAirportIataCodes.flatMap(orig => arrivalAirportIataCodes.map(dest => `${orig}${dest}`))// .sort();
const ximpleList = departureAirportIataCodes.flatMap(orig => arrivalAirportIataCodes.map(dest => { const route = `${orig}${dest}`; Number(route); return route }))// .sort();
const simpleString = simpleList.join('|')// .sort();
const ximpleString = simpleList.join('|')// .sort();
Number(ximpleString)
const simpleSet = new Set(simpleList)
const simpleObjectUndef = simpleList.reduce((o, route) => (o[route] = undefined) || o, {})
const simpleObject = simpleList.reduce((o, route) => (o[route] = true) && o, {})
const objectWithSets = departureAirportIataCodes.reduce((_, code) => { _[code] = new Set(arrivalAirportIataCodes); return _ }, {})
const mapWithSets = departureAirportIataCodes.reduce((_, code) => { _.set(code, new Set(arrivalAirportIataCodes)); return _ }, new Map())
const objectWithStrings = departureAirportIataCodes.reduce((_, code) => { _[code] = arrivalAirportIataCodes.join('|'); return _ }, {})
const objectWithBuffers = departureAirportIataCodes.reduce((_, code) => { _[code] = Buffer.from(arrivalAirportIataCodes.join('|')); return _ }, {})
const objectWithObjects = departureAirportIataCodes.reduce((_, code) => { _[code] = clone(objectInnerStructure); return _ }, {})
const objectWithObjectNulls = departureAirportIataCodes.reduce((_, code) => { _[code] = clone(objectInnerStructureNulls); return _ }, {})

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

const builder01 = valitador => () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    const orig = departureAirportIataCodesRandom[i]

    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!valitador(orig, arrivalAirportIataCodes[j])) {
        // console.log(Object.keys(objectWithLists).sort());
        console.log(objectWithLists.CID)
        console.log(objectWithLists.CID.indexOf('ZYT'))
        console.log(objectWithLists[orig].indexOf(arrivalAirportIataCodes[j]))
        console.log(`valitador(orig, arrivalAirportIataCodes[j]) ${valitador(orig, arrivalAirportIataCodes[j])}`)
        console.log(valitador.toString())
        throw new Error(`houston we have a problem with ${valitador.name} and ${orig} => ${arrivalAirportIataCodes[j]}`)
      }
    }
  }
}

const builder02 = valitador => () => {
  for (let i = departureAirportIataCodesLength; i--;) {
    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!valitador(departureAirportIataCodesRandom[i], arrivalAirportIataCodes[j])) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const builder03 = valitador => () => {
  let orig
  for (let i = departureAirportIataCodesLength; i--;) {
    orig = departureAirportIataCodesRandom[i]
    for (let j = arrivalAirportIataCodesLength; j--;) {
      if (!valitador(orig, arrivalAirportIataCodes[j])) {
        throw new Error(`houston we have a problem with ${objectWithLists}`)
      }
    }
  }
}

const builder = builder01

const validateSimpleListsDotIndexOf = (orig, dest) => simpleList.indexOf(`${orig}${dest}`) !== -1
const validateSimpleListsDotInclude = (orig, dest) => simpleList.includes(`${orig}${dest}`)
const validateXimpleListsDotIndexOf = (orig, dest) => ximpleList.indexOf(`${orig}${dest}`) !== -1
const validateXimpleListsDotInclude = (orig, dest) => ximpleList.includes(`${orig}${dest}`)

const validateSimpleSetDotHas = (orig, dest) => simpleSet.has(`${orig}${dest}`)

const validateSimpleObjectUndefIn = (orig, dest) => (`${orig}${dest}` in simpleObjectUndef)

const validateSimpleObjectIn = (orig, dest) => (`${orig}${dest}` in simpleObject)

const validateSimpleObjectValue = (orig, dest) => simpleObject[`${orig}${dest}`]

const validateObjectWithListsDotIncludes = (orig, dest) => objectWithLists[orig].includes(dest)

const validateObjectWithListsDotIndexOf = (orig, dest) => objectWithLists[orig] && objectWithLists[orig].indexOf(dest) !== -1
const validateObjectWithListsDotIndexOfNoConst = (orig, dest) => objectWithLists[orig] && objectWithLists[orig].indexOf(dest) !== -1

const validateObjectWithSetsDotHas = (orig, dest) => objectWithSets[orig] && objectWithSets[orig].has(dest)

const validateMapsWithSetsDotHas = (orig, dest) => mapWithSets.get(orig).has(dest)

const validateObjectWithStringDotIncludes = (orig, dest) => objectWithStrings[orig] && objectWithStrings[orig].includes(dest)

const validateObjectWithStringDotIndexOf = (orig, dest) => objectWithStrings[orig] && objectWithStrings[orig].indexOf(dest) !== -1

const validateObjectWithBufferDotIncludes = (orig, dest) => objectWithBuffers[orig] && objectWithBuffers[orig].includes(dest)

const validateObjectWithBufferDotIndexOf = (orig, dest) => orig in objectWithBuffers && objectWithBuffers[orig].indexOf(dest) !== -1

const validateObjectWithObjectKeyIn = (orig, dest) => (objectWithObjects[orig] && objectWithObjects[orig][dest])
const validateObjectWithObjectKeyIn2 = (orig, dest) => (objectWithObjects[orig] && dest in objectWithObjects[orig])
const validateObjectWithObjectKeyIn3 = (orig, dest) => (orig in objectWithObjectNulls && dest in objectWithObjectNulls[orig])

const functions = [
  validateSimpleListsDotIndexOf,
  validateSimpleListsDotInclude,
  validateXimpleListsDotIndexOf,
  validateXimpleListsDotInclude,
  validateSimpleObjectUndefIn,
  validateSimpleObjectIn,
  validateSimpleObjectValue,
  validateSimpleSetDotHas,
  validateObjectWithListsDotIndexOf,
  validateObjectWithListsDotIndexOfNoConst,
  validateObjectWithListsDotIncludes,
  validateObjectWithSetsDotHas,
  validateMapsWithSetsDotHas,
  validateObjectWithStringDotIncludes,
  validateObjectWithStringDotIndexOf,
  validateObjectWithBufferDotIncludes,
  validateObjectWithBufferDotIndexOf,
  validateObjectWithObjectKeyIn,
  validateObjectWithObjectKeyIn2,
  validateObjectWithObjectKeyIn3
]

Promise.all(functions.map((f) => {
  console.log(`calling ${f.name}`)
  builder(f)()
}))
  .then(() => {
    // add tests
    suite
      // .add(`${validateSimpleListsDotIndexOf.name}            `, builder(validateSimpleListsDotIndexOf))
      // .add(`${validateXimpleListsDotIndexOf.name}            `, builder(validateXimpleListsDotIndexOf))
      // .add(`${validateSimpleListsDotInclude.name}            `, builder(validateSimpleListsDotInclude))
      // .add(`${validateXimpleListsDotInclude.name}            `, builder(validateXimpleListsDotInclude))
      .add(`${validateSimpleSetDotHas.name}                  `, builder(validateSimpleSetDotHas))
      .add(`${validateObjectWithListsDotIndexOfNoConst.name} `, builder(validateObjectWithListsDotIndexOfNoConst))
      .add(`${validateSimpleObjectUndefIn.name}              `, builder(validateSimpleObjectUndefIn))
      .add(`${validateSimpleObjectIn.name}                   `, builder(validateSimpleObjectIn))
      .add(`${validateSimpleObjectValue.name}                `, builder(validateSimpleObjectValue))
      .add(`${validateObjectWithListsDotIncludes.name}       `, builder(validateObjectWithListsDotIncludes))
      .add(`${validateObjectWithListsDotIndexOf.name}        `, builder(validateObjectWithListsDotIndexOf))
      .add(`${validateObjectWithSetsDotHas.name}             `, builder(validateObjectWithSetsDotHas))
      .add(`${validateMapsWithSetsDotHas.name}               `, builder(validateMapsWithSetsDotHas))
      .add(`${validateObjectWithStringDotIncludes.name}      `, builder(validateObjectWithStringDotIncludes))
      .add(`${validateObjectWithStringDotIndexOf.name}       `, builder(validateObjectWithStringDotIndexOf))
      .add(`${validateObjectWithBufferDotIncludes.name}      `, builder(validateObjectWithBufferDotIncludes))
      .add(`${validateObjectWithBufferDotIndexOf.name}       `, builder(validateObjectWithBufferDotIndexOf))
      .add(`${validateObjectWithObjectKeyIn.name}            `, builder(validateObjectWithObjectKeyIn))
      .add(`${validateObjectWithObjectKeyIn2.name}           `, builder(validateObjectWithObjectKeyIn2))
      .add(`${validateObjectWithObjectKeyIn3.name}           `, builder(validateObjectWithObjectKeyIn3))
    // .add(single.name, () => single())
      .run({
        async: false
      })
  })
