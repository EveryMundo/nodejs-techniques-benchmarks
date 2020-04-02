(function (w) {
  var document = w.document
  if (w.pako) { return saveResultPage() } else { var s = document.createElement('script'); s.src = 'https://rawgit.com/nodeca/pako/master/dist/pako.js'; s.onload = saveResultPage; document.head.appendChild(s) }
  function saveResultPage () {
    var dataLayer = w.dataLayer
    var headTag = `<head>${Array.from(document.head.querySelectorAll('style')).map(s => s.outerHTML.replace(/\s*\n\s*/g, '')).filter(styleCode => styleCode !== '<style type="text/css"></style>').join('\n')}</head>`
    var getParentsTree = (el, head, openings = '', closings = '') => { const p = el.parentElement; if (p == null) { return { openings, closings } } const tagName = p.nodeName.toLowerCase(); if (tagName === 'html') { openings = `${head}${openings}` } const className = p.className && ` class="${p.className}"`; const id = p.id && ` id="${p.id}"`; openings = `<${tagName}${className}${id}>${openings}`; closings += `</${tagName}>`; return getParentsTree(p, headTag, openings, closings) }
    var el = document.querySelector('#ibe-depart-section > div')
    var { openings, closings } = getParentsTree(el)
    var html = `${openings}${el.outerHTML.replace(/[\s\n]+<\//g, '</').replace(/>[\s\n]+/g, '>')}${closings}`
    var links = []; document.querySelectorAll('link').forEach(link => { if (link.rel === 'stylesheet') { links.push(link.outerHTML) } })
    var info = dataLayer[7]; var trip = (dataLayer[3].ecommerce || dataLayer[4].ecommerce).impressions[0]
    var content = [JSON.stringify({ a: 'F9', o: trip.id.substr(0, 3), d: trip.id.substr(4, 3), dd: info.departureDate, rd: info.returnDate, se: 'en-us', curc: 'USD' }), w.location.href, links.join('\n'), html].join('\n\n')
    w.fetch('https://ighvs9kf1a.execute-api.us-west-2.amazonaws.com/f9', { method: 'POST', body: w.pako.gzip(content) }).then((res) => res.json().then(body => { console.log(body) })).catch(console.error)
  }
})(window)
