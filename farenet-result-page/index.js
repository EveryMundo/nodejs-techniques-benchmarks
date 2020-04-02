(function (w) {
  const { gzip } = require('pako/lib/deflate')
  var { document, console, dataLayer, JSON } = w
  var getParentsTree = (currentElement, head, originalElement, openings = '', closings = '') => {
    const parent = currentElement.parentElement

    if (parent == null) {
      // return [openings, closings]
      return `${openings}${originalElement.outerHTML.replace(/[\s\n]+<\//g, '</').replace(/>[\s\n]+/g, '>')}${closings}`
    }

    const tagName = parent.nodeName.toLowerCase()

    if (tagName === 'html') {
      openings = `${head}${openings}`
    }

    const className = parent.className && ` class="${parent.className}"`
    const id = parent.id && ` id="${parent.id}"`
    // openings = `<${tagName}${className}${id}>${openings}`
    // closings += `</${tagName}>`

    return getParentsTree(parent, head, originalElement || currentElement, `<${tagName}${className}${id}>${openings}`, `${closings}</${tagName}>`)
  }

  var headTag = `<head>${Array.from(document.head.querySelectorAll('style')).map(s => s.outerHTML.replace(/\s*\n\s*/g, '')).filter(styleCode => styleCode !== '<style type="text/css"></style>').join('\n')}</head>`
  var el = document.querySelector('#ibe-depart-section > div')
  // var tree = getParentsTree(el, headTag)
  // var html = `${tree[0]}${el.outerHTML.replace(/[\s\n]+<\//g, '</').replace(/>[\s\n]+/g, '>')}${tree[1]}`
  var html = getParentsTree(el, headTag)
  var links = []
  document.querySelectorAll('link').forEach(link => { if (link.rel === 'stylesheet') { links.push(link.outerHTML) } })
  var info = dataLayer[7]
  // var { departureDate: dd, returnDate: rd } = dataLayer[7]
  // var trip = (dataLayer[3].ecommerce || dataLayer[4].ecommerce).impressions[0]
  var [o, d] = (('' + (dataLayer[3].ecommerce || dataLayer[4].ecommerce).impressions[0].id) || '').split('_')
  var content = [
    // JSON.stringify({ a: 'F9', o: trip.id.substr(0, 3), d: trip.id.substr(4, 3), dd: info.departureDate, rd: info.returnDate, se: 'en-us', curc: 'USD' }),
    JSON.stringify({ a: 'F9', o, d, dd: info.departureDate, rd: info.returnDate, se: 'en-us', curc: 'USD' }),
    // JSON.stringify({ a: 'F9', o, d, dd, rd, se: 'en-us', curc: 'USD' }),
    w.location.href,
    links.join('\n'),
    html
  ].join('\n\n')
  w.fetch('https://ighvs9kf1a.execute-api.us-west-2.amazonaws.com/f9', { method: 'POST', body: gzip(content) }).then((res) => res.json()).then(console.log).catch(console.error)
})(window)
