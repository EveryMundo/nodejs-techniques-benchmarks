/* eslint-disable no-console */
module.exports = o => {
  try {
    return JSON.parse(JSON.stringify(o))
  } catch (e) {
    console.error('Error input:', o)
    throw e
  }
}
