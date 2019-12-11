'use strict'

if (String.prototype.padStart) {
  exports.lpad = (str, n, char = ' ') => String(str).padStart(n, char)
  exports.rpad = (str, n, char = ' ') => String(str).padEnd(n, char)
} else {
  exports.lpad = (str, n, char = ' ') => (new Array(n).join(char) + str).substr(-n)
  exports.rpad = (str, n, char = ' ') => (str + new Array(n).join(char)).substr(0, n)
}
