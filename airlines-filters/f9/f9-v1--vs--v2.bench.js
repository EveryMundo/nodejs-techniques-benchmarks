
/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')
const { f9: f9v1 } = require('./f9-v1')
const { f9: f9v2 } = require('./f9-v2')

const oGood = require('./good-farenet-doc')
const oBaad = require('./bad-farenet-doc')

const Tf9V1 = () => {
  const t = new Test1()
  t.o = 'ABC'
  t.d = 'DEF'

  return t.departureAirportIataCode + t.arrivalAirportIataCode
}

const Tf9V2 = () => {
  const t = new Test2()
  t.o = 'ABC'
  t.d = 'DEF'

  return t.departureAirportIataCode + t.arrivalAirportIataCode
}

suite
  .add(`${Tf9V1.name}   `, Tf9V1)
  .add(`${Tf9V2.name}   `, Tf9V2)
// .add(single.name, () => single())
  .run({
    async: false
  })
