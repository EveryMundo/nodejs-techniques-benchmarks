const FilterError = require('../lib/filter-error')

const errorCodes = {
  'F9.0': () => ['F9.0', 'Departure date less than 2 days in the future'],
  'F9.1': () => ['F9.1', 'Trip length less than 2 days'],
  'F9.2': () => ['F9.2', 'Trip length greater than 15 days'],
  'F9.3': () => ['F9.3', 'Invalid date']
}

const transformTensor = obj => {
  const TWO_DAYS = 172800000
  const CURRENT_DATE = Date.now()

  const fareTensor = obj.journey && obj.journey.fareTensor
  if (fareTensor) {
    const journeyType = fareTensor.journeyType
    const newTensor = {
      journeyType: journeyType,
      cells: []
    }
    if (journeyType === 'ONE_WAY') {
      fareTensor.cells.forEach(element => {
        if (!Number.isNaN(+(new Date(element.outboundDate))) && new Date(element.outboundDate) - CURRENT_DATE > TWO_DAYS) {
          newTensor.cells.push(element)
        }
      })
    } else {
      const outBounds = fareTensor.cells.filter(_ => _.boundType === 'OUTBOUND')
      const inBounds = fareTensor.cells.filter(_ => _.boundType === 'INBOUND')
      for (let index = 0; index < outBounds.length; index++) {
        const depElement = outBounds[index]
        if (Number.isNaN(+(new Date(depElement.outboundDate)))) continue
        if (new Date(depElement.outboundDate) - CURRENT_DATE < TWO_DAYS) continue
        for (let j = 0; j < inBounds.length; j++) {
          const retElement = inBounds[j]
          if (Number.isNaN(+(new Date(retElement.inboundDate)))) continue
          const depDate = new Date(depElement.outboundDate)
          const retDate = new Date(retElement.inboundDate)
          if (retDate - depDate >= TWO_DAYS) {
            const newCell = {
              priceSpecification: {
                totalPrice: depElement.priceSpecification.totalPrice + retElement.priceSpecification.totalPrice
              },
              boundType: 'MATRIX',
              isSoldOut: false,
              outboundDate: depElement.outboundDate,
              inboundDate: retElement.inboundDate
            }
            newTensor.cells.push(newCell)
          }
        }
      }
    }
    if (newTensor.cells.length > 0) {
      obj.journey.fareTensor = newTensor
    } else {
      obj.journey.fareTensor = undefined
    }

    return obj
  }
  return obj
}

const f9 = (obj) => {
  const TWO_DAYS = 172800000
  const FIFTEEN_DAYS = 1296000000
  const CURRENT_DATE = Date.now()

  const journeyType = obj.journey && obj.journey.journeyType
  let departureDate = obj.journey && obj.journey.outboundFlight && obj.journey.outboundFlight.departureDate
  departureDate = new Date(departureDate)
  if (Number.isNaN(+departureDate)) {
    return new FilterError(...errorCodes['F9.3']())
  }
  if (journeyType === 'ONE_WAY') {
    if (departureDate - CURRENT_DATE < TWO_DAYS) {
      return new FilterError(...errorCodes['F9.0']())
    } else {
      obj = transformTensor(obj)
    }
  } else {
    let returnDate = obj.journey && obj.journey.inboundFlight && obj.journey.inboundFlight.departureDate
    returnDate = new Date(returnDate)
    if (Number.isNaN(+returnDate)) {
      return new FilterError(...errorCodes['F9.3']())
    }
    if (departureDate - CURRENT_DATE < TWO_DAYS) {
      return new FilterError(...errorCodes['F9.0']())
    } else if (returnDate - departureDate < TWO_DAYS) {
      return new FilterError(...errorCodes['F9.1']())
    } else if (returnDate - departureDate > FIFTEEN_DAYS) {
      return new FilterError(...errorCodes['F9.2']())
    } else {
      obj = transformTensor(obj)
    }
  }

  return obj
}

module.exports = { f9, transformTensor }
