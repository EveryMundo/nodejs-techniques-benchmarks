
/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')

const CURRENT_DATE = new Date('2020-01-28').getTime()
const TWO_DAYS = 48 * 60 * 60 * 1000

const fareTensor = {
  journeyType: 'ONE_WAY',
  cells: [{
    priceSpecification: {
      totalPrice: 100
    },
    boundType: 'OUTBOUND',
    isSoldOut: false,
    outboundDate: '2020-01-27',
    inboundDate: null
  },
  {
    priceSpecification: {
      totalPrice: 100
    },
    boundType: 'OUTBOUND',
    isSoldOut: false,
    outboundDate: '2020-01-30',
    inboundDate: null
  }]
}

const callNewDateTwice = () => {
  const newTensor = { cells: [] }
  fareTensor.cells.forEach(element => {
    if (!Number.isNaN(+(new Date(element.outboundDate))) && new Date(element.outboundDate) - CURRENT_DATE > TWO_DAYS) {
      newTensor.cells.push(element)
    }
  })

  return newTensor
}

const storeDateInAConst = () => {
  const newTensor = { cells: [] }
  fareTensor.cells.forEach((element) => {
    const outboundDate = +(new Date(element.outboundDate))
    if (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS) {
      newTensor.cells.push(element)
    }
  })

  return newTensor
}

const storeDateInAConstC = () => {
  const newTensor = { cells: [] }
  fareTensor.cells.forEach((element) => {
    const outboundDate = new Date(element.outboundDate).getTime()
    if (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS) {
      newTensor.cells.push(element)
    }
  })

  return newTensor
}

const storeDateInAConstD = () => {
  const newTensor = { cells: [] }
  for (const element of fareTensor.cells) {
    const outboundDate = new Date(element.outboundDate).getTime()
    if (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS) {
      newTensor.cells.push(element)
    }
  }

  return newTensor
}

const storeDateInAConstE = () => {
  const newTensor = { cells: [] }
  for (let i = 0; i < fareTensor.cells.length; i++) {
    const outboundDate = new Date(fareTensor.cells[i].outboundDate).getTime()
    if (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS) {
      newTensor.cells.push(fareTensor.cells[i])
    }
  }

  return newTensor
}

const storeDateInAConstF = () => {
  const newCells = []
  const { cells } = fareTensor
  const cellsLen = cells.length

  for (let i = 0, element = cells[i]; i < cellsLen; element = cells[++i]) {
    const outboundDate = new Date(element.outboundDate).getTime()
    if (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS) {
      cells.push(element)
    }
  }

  return { cells: newCells }
}

const storeDateInAConstBFilter = () => {
  const newTensor = { cells: [] }
  let outboundDate
  newTensor.cells = fareTensor.cells.filter((element) => {
    outboundDate = +(new Date(element.outboundDate))

    return (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS)
  })

  return newTensor
}

const storeDateInAConstBFilterB = () => {
  const newTensor = { cells: [] }

  newTensor.cells = fareTensor.cells.filter((element) => {
    const outboundDate = +(new Date(element.outboundDate))

    return (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS)
  })

  return newTensor
}

const storeDateInAConstBFilterC = () => ({
  cells: fareTensor.cells.filter((element) => {
    const outboundDate = new Date(element.outboundDate).getTime()

    return (!Number.isNaN(outboundDate) && outboundDate - CURRENT_DATE > TWO_DAYS)
  })
})

suite
  .add(`${callNewDateTwice.name}   `, callNewDateTwice)
  .add(`${storeDateInAConst.name}  `, storeDateInAConst)
  .add(`${storeDateInAConstC.name} `, storeDateInAConstC)
  .add(`${storeDateInAConstD.name} `, storeDateInAConstD)
  .add(`${storeDateInAConstE.name} `, storeDateInAConstE)
  .add(`${storeDateInAConstF.name} `, storeDateInAConstF)
  .add(`${storeDateInAConstBFilter.name} `, storeDateInAConstBFilter)
  .add(`${storeDateInAConstBFilterB.name} `, storeDateInAConstBFilterB)
  .add(`${storeDateInAConstBFilterC.name} `, storeDateInAConstBFilterC)

module.exports = () => suite.run({ async: true })

if (require.main === module) module.exports()
