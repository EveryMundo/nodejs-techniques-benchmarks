'use strict';

/* eslint-disable import/no-extraneous-dependencies, no-console */
/* eslint-disable import/no-extraneous-dependencies, no-console */
const zlib = require('zlib');
const fs   = require('fs');
const assert = require('assert');

const suite = require('../lib/bench');

const singleContent = fs.readFileSync(__filename);
const multiContent  = Buffer.concat(Array.from({length: 100}, () => singleContent));
const compressedContent = zlib.gzipSync(multiContent);

// eslint-disable-next-line func-names
const gunzip = () => new Promise((resolve) => {
  zlib.gunzip(compressedContent, (_, data) => resolve(data));
});

const gunzipSync = () => new Promise((resolve) => {
  resolve(zlib.gunzipSync(compressedContent));
});

const gunzipSync2 = async () => {
  return zlib.gunzipSync(compressedContent);
};

const runAssertions = async () => {
  assert(multiContent.compare(await gunzip()) === 0, `result does not match for gunzip`);
  assert(multiContent.compare(await gunzipSync()) === 0, `result does not match for gunzipSync`);
  assert(multiContent.compare(await gunzipSync2()) === 0, `result does not match for gunzipSync2`);
};

const runBenchmarks = () => suite
  .add(`gunzip     `, gunzip)
  .add(`gunzipSync `, gunzipSync)
  .add(`gunzipSyncs`, gunzipSync2)
  .run({
    async: true
  });

runAssertions().then(runBenchmarks);


