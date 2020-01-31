
/* eslint-disable import/no-extraneous-dependencies, no-console */
const suite = require('../lib/bench')

const generateRequestIdA = (prefix = 'a00a') => {
  const requestId = ('' + Date.now() + (1 + Math.random())).substr(0, 22) + prefix

  Number(requestId)

  return requestId
}

const generateRequestIdB = (_prefix) => {
  const requestId = ('' + Date.now() + (1 + Math.random())).substr(0, 22) + (_prefix || 'a00a')

  Number(requestId)

  return requestId
}

const generateRequestIdC = (prefix = 'a00a') => {
  const requestId = `${`${Date.now()}${(1 + Math.random())}`.substr(0, 22)}${prefix}`

  Number(requestId)

  return requestId
}

const generateRequestIdD = (prefix) => {
  const requestId = `${`${Date.now()}${(1 + Math.random())}`.substr(0, 22)}${(prefix || 'a00a')}`

  Number(requestId)

  return requestId
}

suite
  .add(`${generateRequestIdA.name}  `, generateRequestIdA)
  .add(`${generateRequestIdB.name}  `, generateRequestIdB)
  .add(`${generateRequestIdC.name}  `, generateRequestIdC)
  .add(`${generateRequestIdD.name}  `, generateRequestIdD)
  .run({
    async: false
  })
