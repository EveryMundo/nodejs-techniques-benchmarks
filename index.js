const handler = (event, context) => {
  require(`${event.benchmark}.js`)()
}

module.exports = { handler }
