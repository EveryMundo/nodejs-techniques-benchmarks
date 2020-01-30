const siteEditionRegExp = /^[a-z]{2}-[A-Z]{2}$/
const airlineIataCodeRegExp = /^[A-Z0-9]{2}$/
const _3upperCasedLettersRegExp = /^[A-Z]{3}$/

class Test2 {
  static formatSiteEdition (siteEdition) {
    const [, lang, countryCode] = ('' + siteEdition).match(/^([A-Za-z]{2})[^A-Za-z]?([A-Za-z]{2})?$/) || []

    if (!lang) return `INVALID_SITE_EDITION [${siteEdition}]`

    return countryCode ? `${lang.toLowerCase()}_${countryCode.toUpperCase()}` : lang.toLowerCase()
  }

  a = undefined // airlineIataCode
  o = undefined // departureAirportIataCode
  d = undefined // arrivalAirportIataCode
  oc = undefined // departureCityCode
  dc = undefined // arrivalCityCode
  dd = undefined // outboundDate
  rd = undefined // inboundDate
  c = undefined // currencyCode
  jt = undefined // journeyType
  fc = undefined // fareClass
  ft = undefined // flightType
  se = undefined // siteEdition
  p = undefined // totalPrice
  ca = undefined // createdAt
  ua = undefined // createdAt
  si = undefined // sourceId
  so = false // isSoldOut

  constructor() {
    
  }

  get airlineIataCode () {
    return this.a
  }

  set airlineIataCode (v) {
    if (!airlineIataCodeRegExp.test(v)) {
      throw new Error(`airlineIataCode [${v}] does not match ${airlineIataCodeRegExp}`)
    }

    this.a = v
  }

  get departureAirportIataCode () {
    return this.o
  }

  set departureAirportIataCode (v) {
    if (!_3upperCasedLettersRegExp.test(v)) {
      throw new Error(`departureAirportIataCode [${v}] does not match ${_3upperCasedLettersRegExp}`)
    }

    this.o = v
  }

  get arrivalAirportIataCode () {
    return this.d
  }

  set arrivalAirportIataCode (v) {
    if (!_3upperCasedLettersRegExp.test(v)) {
      throw new Error(`arrivalAirportIataCode [${v}] does not match ${_3upperCasedLettersRegExp}`)
    }

    this.d = v
  }

  get departureCityCode () {
    return this.oc
  }

  set departureCityCode (v) {
    if (!_3upperCasedLettersRegExp.test(v)) {
      throw new Error(`departureCityCode [${v}] does not match ${_3upperCasedLettersRegExp}`)
    }

    this.oc = v
  }

  get arrivalCityCode () {
    return this.dc
  }

  set arrivalCityCode (v) {
    if (!_3upperCasedLettersRegExp.test(v)) {
      throw new Error(`arrivalCityCode [${v}] does not match ${_3upperCasedLettersRegExp}`)
    }

    this.dc = v
  }

  get outboundDate () {
    return this.dd
  }

  set outboundDate (v) {
    if (!/\d{4}-\d{2}-\d{2}/.test(v)) throw new Error(`outboundDate [${v}] is not valid`)
    this.dd = v
  }

  get inboundDate () {
    return this.rd
  }

  set inboundDate (v) {
    if (v !== undefined && !/\d{4}-\d{2}-\d{2}/.test(v)) throw new Error(`outboundDate [${v}] is not valid`)
    this.rd = v
  }

  get currencyCode () {
    return this.c
  }

  set currencyCode (v) {
    if (!_3upperCasedLettersRegExp.test(v)) {
      throw new Error(`currencyCode [${v}] does not match ${_3upperCasedLettersRegExp}`)
    }

    this.c = v
  }

  get journeyType () {
    return this.jt
  }

  set journeyType (v) {
    if (v === 'RT' || v === 'OW') {
      this.jt = v

      return
    }

    throw new Error(`journeyType [${v}] does not equal [RT] or [OW]`)
  }

  get fareClass () {
    return this.fc
  }

  set fareClass (v) {
    if (v === 'E' || v === 'B' || v === 'F') {
      this.fc = v

      return
    }

    throw new Error(`fareClass [${v}] does not equal [E]CONOMY or [B]USINESS or [F]IRST`)
  }

  get flightType () {
    return this.ft
  }

  set flightType (v) {
    if (v === 'I' || v === 'D') {
      this.ft = v

      return
    }

    throw new Error(`flightType [${v}] does not equal [I] or [D]`)
  }

  get siteEdition () {
    return this.se
  }

  set siteEdition (v) {
    if (v === undefined) return

    if (!siteEditionRegExp.test(v)) {
      throw new Error(`siteEdition [${v}] does not match ${siteEditionRegExp}`)
    }

    this.se = v
  }

  get totalPrice () {
    return this.p
  }

  set totalPrice (v) {
    this.p = v
  }

  get createdAt () {
    return this.ca
  }

  set createdAt (v) {
    this.ca = v
  }

  get updatedAt () {
    return this.ua
  }

  set updatedAt (v) {
    this.ua = v
  }

  get sourceId () {
    return this.si
  }

  set sourceId (v) {
    this.si = v
  }

  get isSoldOut () {
    return this.so
  }

  set isSoldOut (v) {
    this.so = Boolean(v)
  }

  get _id () {
    return {
      a: this.a,
      o: this.o,
      d: this.d,
      dd: this.dd,
      rd: this.rd,
      c: this.c,
      jt: this.jt,
      ft: this.ft,
      se: this.se,
      fc: this.fc
    }
  }

  get mongoDoc () {
    return {
      _id: this._id,
      p: this.p
    }
  }

  get mongoUpdateDoc () {
    return {
      // $set: this.mongoDoc,
      $set: { p: this.p },
      $setOnInsert: { ca: this.ca, ua: this.ua, si: this.si, so: this.so }
    }
  }

  get mongoUpdateList () {
    return [
      { _id: this._id },
      this.mongoUpdateDoc,
      { upsert: true }
    ]
  }
}

module.exports = { Test2 }
