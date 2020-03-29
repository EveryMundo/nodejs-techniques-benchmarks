#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-extraneous-dependencies, no-console */
const assert = require('assert')
const zlib = require('zlib')

const suite = require('../lib/bench')
const buffer = Buffer.allocUnsafeSlow(10000)
const original = {
  buffer,
  b64: buffer.toString('base64')
}
const gzip = {
  // buffer: zlib.gzipSync(original.buffer),
  b64: zlib.gzipSync(original.buffer).toString('base64')
}
const deflate = {
  buffer: zlib.deflateSync(original.buffer),
  b64: zlib.deflateSync(original.buffer).toString('base64')
}

// compare string not storing substring
const parseKinesisRecord1 = (record) => {
  if (typeof record !== 'string') {
    throw new Error('Kinesis record expected to be string but got', typeof record)
  }

  if (record.substr(0, 4) === 'H4sI') {
    return zlib.gunzipSync(Buffer.from(record, 'base64'))
  }

  return Buffer.from(record, 'base64')
}

const gzHeader = Buffer.from([0x1f, 0x8b])
// compare string store the sbustring
const parseKinesisRecord2 = (record) => {
  if (typeof record !== 'string') {
    throw new Error('Kinesis record expected to be string but got', typeof record)
  }

  const buffer = Buffer.from(record, 'base64')

  if (buffer.indexOf(gzHeader) === 0) {
    return zlib.gunzipSync(buffer)
  }

  return buffer
}

// compare buffer storing buffer
const parseKinesisRecord3 = (record) => {
  if (typeof record !== 'string') {
    throw new Error('Kinesis record expected to be string but got', typeof record)
  }

  const buffer = Buffer.from(record, 'base64')

  if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
    return zlib.gunzipSync(buffer)
  }

  return Buffer.from(record, 'base64')
}

const parseKinesisRecord1Test1 = parseKinesisRecord1(original.b64)
assert(parseKinesisRecord1Test1.equals(original.buffer), 'parseKinesisRecord1Test fail the test')
const parseKinesisRecord1Test2 = parseKinesisRecord1(gzip.b64)
assert(parseKinesisRecord1Test2.equals(original.buffer), 'parseKinesisRecord1Test2 fail the test')
const parseKinesisRecord1Test3 = parseKinesisRecord1(deflate.b64)
assert(parseKinesisRecord1Test3.equals(deflate.buffer), 'parseKinesisRecord1Test3 fail the test')

const parseKinesisRecord2Test1 = parseKinesisRecord2(original.b64)
assert(parseKinesisRecord2Test1.equals(original.buffer), 'parseKinesisRecord2Test fail the test')
const parseKinesisRecord2Test2 = parseKinesisRecord2(gzip.b64)
assert(parseKinesisRecord2Test2.equals(original.buffer), 'parseKinesisRecord2Test2 fail the test')
const parseKinesisRecord2Test3 = parseKinesisRecord2(deflate.b64)
assert(parseKinesisRecord2Test3.equals(deflate.buffer), 'parseKinesisRecord2Test3 fail the test')

const parseKinesisRecord3Test1 = parseKinesisRecord3(original.b64)
assert(parseKinesisRecord3Test1.equals(original.buffer), 'parseKinesisRecord3Test fail the test')
const parseKinesisRecord3Test2 = parseKinesisRecord3(gzip.b64)
assert(parseKinesisRecord3Test2.equals(original.buffer), 'parseKinesisRecord3Test2 fail the test')
const parseKinesisRecord3Test3 = parseKinesisRecord3(deflate.b64)
assert(parseKinesisRecord3Test3.equals(deflate.buffer), 'parseKinesisRecord3Test3 fail the test')

suite
  .add('parseKinesisRecord1', () => {
    parseKinesisRecord1(original.b64)
    parseKinesisRecord1(gzip.b64)
    parseKinesisRecord1(deflate.b64)
  })
  .add('parseKinesisRecord2', () => {
    parseKinesisRecord2(original.b64)
    parseKinesisRecord2(gzip.b64)
    parseKinesisRecord2(deflate.b64)
  })
  .add('parseKinesisRecord3', () => {
    parseKinesisRecord3(original.b64)
    parseKinesisRecord3(gzip.b64)
    parseKinesisRecord3(deflate.b64)
  })

  .run({
    async: true
  })
