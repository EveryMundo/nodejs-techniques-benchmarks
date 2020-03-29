#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')

const suite = require('../lib/bench')
const globalPassenger = {
  count: 1,
  seniorCount: 0,
  adultCount: 1,
  youngAdultCount: 0,
  childCount: 0,
  infantInLapCount: 0,
  infantInSeatCount: 0
}
// eslint-disable-next-line func-names
const getpassengerDetails0 = (passenger) => {
  const passDetails = []

  for (const key in passenger) {
    if (passenger.hasOwnProperty(key)) {
      if (key === 'count') continue
      const element = +passenger[key]
      if (element > 0) {
        const detail = {
          category: null,
          mappedTo: null,
          count: 0
        }
        switch (key) {
          case 'adultCount': detail.category = 'Adult 15+'
            break
          case 'childCount': detail.category = 'Children 2 - 11'
            break
          case 'infantCount': detail.category = 'Infant up to 2'
            break
          case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
            break
          default: detail.category = key
            break
        }
        detail.mappedTo = key
        detail.count = element
        passDetails.push(detail)
      }
    }
  }

  return passDetails
}

const getpassengerDetailsD = (passenger) => {
  const passDetails = []

  for (const key in passenger) {
    if (key === 'count') continue
    const element = +passenger[key]
    if (element > 0) {
      const detail = {
        category: null,
        mappedTo: null,
        count: 0
      }
      switch (key) {
        case 'adultCount': detail.category = 'Adult 15+'
          break
        case 'childCount': detail.category = 'Children 2 - 11'
          break
        case 'infantCount': detail.category = 'Infant up to 2'
          break
        case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
          break
        default: detail.category = key
          break
      }
      detail.mappedTo = key
      detail.count = element
      passDetails.push(detail)
    }
  }

  return passDetails
}

const getpassengerDetails1 = (passenger) => {
  const passDetails = []

  for (const key in passenger) {
    if ({}.hasOwnProperty.call(passenger, key)) {
      if (key === 'count') continue
      const element = +passenger[key]
      if (element > 0) {
        const detail = {
          category: null,
          mappedTo: null,
          count: 0
        }
        switch (key) {
          case 'adultCount': detail.category = 'Adult 15+'
            break
          case 'childCount': detail.category = 'Children 2 - 11'
            break
          case 'infantCount': detail.category = 'Infant up to 2'
            break
          case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
            break
          default: detail.category = key
            break
        }
        detail.mappedTo = key
        detail.count = element
        passDetails.push(detail)
      }
    }
  }

  return passDetails
}

const objectKeys = (o) => {
  const arr = []
  // const hasOwnProperty = Object.prototype.hasOwnProperty.bind(o)
  for (const key in o) {
    // if (hasOwnProperty(key)) {
    if (o.hasOwnProperty(key)) {
      arr.push(key)
    }
  }

  return arr
}

const getpassengerDetails2 = (passenger) => {
  const passDetails = []

  for (const key in passenger) {
    if (Object.prototype.hasOwnProperty.call(passenger, key)) {
      if (key === 'count') continue
      const element = +passenger[key]
      if (element > 0) {
        const detail = {
          category: null,
          mappedTo: null,
          count: 0
        }
        switch (key) {
          case 'adultCount': detail.category = 'Adult 15+'
            break
          case 'childCount': detail.category = 'Children 2 - 11'
            break
          case 'infantCount': detail.category = 'Infant up to 2'
            break
          case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
            break
          default: detail.category = key
            break
        }
        detail.mappedTo = key
        detail.count = element
        passDetails.push(detail)
      }
    }
  }
  return passDetails
}

const getpassengerDetails3 = (passenger) => {
  const passDetails = []

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(passenger)
  for (const key in passenger) {
    if (hasOwnProperty(key)) {
      if (key === 'count') continue
      const element = +passenger[key]
      if (element > 0) {
        const detail = {
          category: null,
          mappedTo: null,
          count: 0
        }
        switch (key) {
          case 'adultCount': detail.category = 'Adult 15+'
            break
          case 'childCount': detail.category = 'Children 2 - 11'
            break
          case 'infantCount': detail.category = 'Infant up to 2'
            break
          case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
            break
          default: detail.category = key
            break
        }
        detail.mappedTo = key
        detail.count = element
        passDetails.push(detail)
      }
    }
  }
  return passDetails
}

const getpassengerDetails4 = (passenger) => {
  const passDetails = []

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(passenger)
  for (const key in passenger) {
    if (hasOwnProperty(key) && key !== 'count') {
      const element = +passenger[key]
      if (element > 0) {
        const detail = {
          category: null,
          mappedTo: null,
          count: 0
        }
        switch (key) {
          case 'adultCount': detail.category = 'Adult 15+'
            break
          case 'childCount': detail.category = 'Children 2 - 11'
            break
          case 'infantCount': detail.category = 'Infant up to 2'
            break
          case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
            break
          default: detail.category = key
            break
        }
        detail.mappedTo = key
        detail.count = element
        passDetails.push(detail)
      }
    }
  }
  return passDetails
}

const getpassengerDetails5 = (passenger) => {
  const passDetails = []

  Object.keys(passenger).forEach((key) => {
    if (key !== 'count') {
      const element = +passenger[key]
      if (element > 0) {
        const detail = {
          category: null,
          mappedTo: null,
          count: 0
        }
        switch (key) {
          case 'adultCount': detail.category = 'Adult 15+'
            break
          case 'childCount': detail.category = 'Children 2 - 11'
            break
          case 'infantCount': detail.category = 'Infant up to 2'
            break
          case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
            break
          default: detail.category = key
            break
        }
        detail.mappedTo = key
        detail.count = element
        passDetails.push(detail)
      }
    }
  })

  return passDetails
}

const getpassengerDetails6 = (passenger) => {
  const passDetails = []

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(passenger)
  let element
  for (const key in passenger) {
    if (hasOwnProperty(key) && key !== 'count' && (element = +passenger[key]) > 0) {
      const detail = {
        category: null,
        mappedTo: null,
        count: 0
      }
      switch (key) {
        case 'adultCount': detail.category = 'Adult 15+'
          break
        case 'childCount': detail.category = 'Children 2 - 11'
          break
        case 'infantCount': detail.category = 'Infant up to 2'
          break
        case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
          break
        default: detail.category = key
          break
      }
      detail.mappedTo = key
      detail.count = element
      passDetails.push(detail)
    }
  }
  return passDetails
}

const getpassengerDetails7 = (passenger) => {
  const passDetails = []

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(passenger)
  let element
  for (const key in passenger) {
    if (hasOwnProperty(key) && key !== 'count' && (element = +passenger[key]) > 0) {
      const detail = {
        category: null,
        mappedTo: key,
        count: 0
      }
      switch (key) {
        case 'adultCount': detail.category = 'Adult 15+'
          break
        case 'childCount': detail.category = 'Children 2 - 11'
          break
        case 'infantCount': detail.category = 'Infant up to 2'
          break
        case 'youngAdultCount': detail.category = 'Young Adult 12 - 15'
          break
        default: detail.category = key
          break
      }

      detail.count = element
      passDetails.push(detail)
    }
  }
  return passDetails
}

const getpassengerDetails8 = (passenger) => {
  const passDetails = []
  const categories = {
    adultCount: 'Adult 15+',
    childCount: 'Children 2 - 11',
    infantCount: 'Infant up to 2',
    youngAdultCount: 'Young Adult 12 - 15'
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(passenger)
  let element
  for (const key in passenger) {
    if (hasOwnProperty(key) && key !== 'count' && (element = +passenger[key]) > 0) {
      const detail = {
        category: categories[key] || key,
        mappedTo: key,
        count: element
      }

      passDetails.push(detail)
    }
  }

  return passDetails
}

const categories = {
  adultCount: 'Adult 15+',
  childCount: 'Children 2 - 11',
  infantCount: 'Infant up to 2',
  youngAdultCount: 'Young Adult 12 - 15'
}

const getpassengerDetails9 = (passenger) => {
  const passDetails = []

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(passenger)
  let element
  for (const key in passenger) {
    if (hasOwnProperty(key) && key !== 'count' && (element = +passenger[key]) > 0) {
      passDetails.push({
        category: categories[key] || key,
        mappedTo: key,
        count: element
      })
    }
  }

  return passDetails
}

const categoriesMap = new Map([
  ['adultCount', 'Adult 15+'],
  ['childCount', 'Children 2 - 11'],
  ['infantCount', 'Infant up to 2'],
  ['youngAdultCount', 'Young Adult 12 - 15']
])

const getpassengerDetailsA = (passenger) => {
  const passDetails = []

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(passenger)
  let element
  for (const key in passenger) {
    if (hasOwnProperty(key) && key !== 'count' && (element = +passenger[key]) > 0) {
      passDetails.push({
        category: categoriesMap.get(key) || key,
        mappedTo: key,
        count: element
      })
    }
  }

  return passDetails
}

const getpassengerDetailsB = (passenger) => {
  const passDetails = []

  let element, key
  const keys = Object.keys(passenger)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    if (key !== 'count' && (element = +passenger[key]) > 0) {
      passDetails.push({
        category: categoriesMap.get(key) || key,
        mappedTo: key,
        count: element
      })
    }
  }

  return passDetails
}

const getpassengerDetailsC = (passenger) => {
  const passDetails = []

  let element, key
  const keys = objectKeys(passenger)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    if (key !== 'count' && (element = +passenger[key]) > 0) {
      passDetails.push({
        category: categoriesMap.get(key) || key,
        mappedTo: key,
        count: element
      })
    }
  }

  return passDetails
}

const expected = '[{"category":"Adult 15+","mappedTo":"adultCount","count":1}]'

const t0 = JSON.stringify(getpassengerDetails0(globalPassenger))
assert(t0 === expected, `getpassengerDetails fail the test t0[${t0}] !== expected[${expected}]`)

const t1 = JSON.stringify(getpassengerDetails1(globalPassenger))
assert(t1 === expected, `getpassengerDetails fail the test t1[${t1}] !== expected[${expected}]`)

const t2 = JSON.stringify(getpassengerDetails2(globalPassenger))
assert(t2 === expected, `getpassengerDetails2 fail the test t2[${t2}] !== expected[${expected}]`)

const t3 = JSON.stringify(getpassengerDetails3(globalPassenger))
assert(t3 === expected, `getpassengerDetails3 fail the test t3[${t3}] !== expected[${expected}]`)

const t4 = JSON.stringify(getpassengerDetails4(globalPassenger))
assert(t4 === expected, `getpassengerDetails4 fail the test t4[${t4}] !== expected[${expected}]`)

const t5 = JSON.stringify(getpassengerDetails5(globalPassenger))
assert(t5 === expected, `getpassengerDetails5 fail the test t5[${t5}] !== expected[${expected}]`)

const t6 = JSON.stringify(getpassengerDetails6(globalPassenger))
assert(t6 === expected, `getpassengerDetails6 fail the test t6[${t6}] !== expected[${expected}]`)

const t7 = JSON.stringify(getpassengerDetails7(globalPassenger))
assert(t7 === expected, `getpassengerDetails7 fail the test t7[${t7}] !== expected[${expected}]`)

const t8 = JSON.stringify(getpassengerDetails8(globalPassenger))
assert(t8 === expected, `getpassengerDetails8 fail the test t8[${t8}] !== expected[${expected}]`)

const t9 = JSON.stringify(getpassengerDetails9(globalPassenger))
assert(t9 === expected, `getpassengerDetails9 fail the test t9[${t9}] !== expected[${expected}]`)

const tA = JSON.stringify(getpassengerDetailsA(globalPassenger))
assert(tA === expected, `getpassengerDetailsA fail the test tA[${tA}] !== expected[${expected}]`)

const tB = JSON.stringify(getpassengerDetailsB(globalPassenger))
assert(tB === expected, `getpassengerDetailsB fail the test tB[${tB}] !== expected[${expected}]`)

const tC = JSON.stringify(getpassengerDetailsC(globalPassenger))
assert(tC === expected, `getpassengerDetailsC fail the test tC[${tC}] !== expected[${expected}]`)

const tD = JSON.stringify(getpassengerDetailsD(globalPassenger))
assert(tD === expected, `getpassengerDetailsD fail the test tD[${tD}] !== expected[${expected}]`)

// add tests
suite
  .add('getpassengerDetails0', () => { getpassengerDetails0(globalPassenger) })
  .add('getpassengerDetails1', () => { getpassengerDetails1(globalPassenger) })
  .add('getpassengerDetails2', () => { getpassengerDetails2(globalPassenger) })
  .add('getpassengerDetails3', () => { getpassengerDetails3(globalPassenger) })
  // .add('getpassengerDetails4', () => { getpassengerDetails4(globalPassenger) })
  // .add('getpassengerDetails5', () => { getpassengerDetails5(globalPassenger) })
  // .add('getpassengerDetails6', () => { getpassengerDetails6(globalPassenger) })
  // .add('getpassengerDetails7', () => { getpassengerDetails7(globalPassenger) })
  // .add('getpassengerDetails8', () => { getpassengerDetails8(globalPassenger) })
  // .add('getpassengerDetails9', () => { getpassengerDetails9(globalPassenger) })
  .add('getpassengerDetailsA', () => { getpassengerDetailsA(globalPassenger) })
  .add('getpassengerDetailsB', () => { getpassengerDetailsB(globalPassenger) })
  .add('getpassengerDetailsC', () => { getpassengerDetailsC(globalPassenger) })
  .add('getpassengerDetailsD', () => { getpassengerDetailsD(globalPassenger) })
  .run({
    async: true
  })
