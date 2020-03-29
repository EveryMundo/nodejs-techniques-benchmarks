const departureDate = formatDate(Date.now() + 1296000000) // 15 days
const lessThanTwoDate = formatDate(Date.now() + 86400000) // 1 day
const obj = {
  journey: {
    outboundFlight: { departureDate: departureDate },
    journeyType: 'ONE_WAY',
    fareTensor: {
    journeyType: 'ONE_WAY',
    cells: [{
        priceSpecification: {
        totalPrice: 100
        },
        boundType: 'OUTBOUND',
        isSoldOut: false,
        outboundDate: departureDate,
        inboundDate: null
    },
      {
        priceSpecification: {
        totalPrice: 100
        },
        boundType: 'OUTBOUND',
        isSoldOut: false,
        outboundDate: lessThanTwoDate,
        inboundDate: null
      }]
    }
  }
}