
/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')
const { Test1 } = require('./Test1.class')
const { Test2 } = require('./Test2.class')

const T1 = () => {
  const t = new Test1()
  t.o = 'ABC'
  t.d = 'DEF'

  return t.departureAirportIataCode + t.arrivalAirportIataCode
}

const T1b = () => {
  const t = new Test1()
  t.o = 'ABC'
  t.d = 'DEF'

  return t.o + t.d
}

const T1c = () => {
  const t = new Test1()
  t.departureAirportIataCode = 'ABC'
  t.arrivalAirportIataCode = 'DEF'

  return t.departureAirportIataCode + t.arrivalAirportIataCode
}

const T2 = () => {
  const t = new Test2()
  t.o = 'ABC'
  t.d = 'DEF'

  return t.departureAirportIataCode + t.arrivalAirportIataCode
}

const T2b = () => {
  const t = new Test2()
  t.o = 'ABC'
  t.d = 'DEF'

  return t.o + t.d
}

const T2c = () => {
  const t = new Test2()
  t.departureAirportIataCode = 'ABC'
  t.arrivalAirportIataCode = 'DEF'

  return t.departureAirportIataCode + t.arrivalAirportIataCode
}

suite
  .add(`${T1.name}   `, T1)
  .add(`${T1b.name}  `, T1b)
  .add(`${T1c.name}  `, T1c)
  .add(`${T2.name}   `, T2)
  .add(`${T2b.name}  `, T2b)
  .add(`${T2c.name}  `, T2c)
// .add(single.name, () => single())
  .run({
    async: false
  })
