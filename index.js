const t0 = new Date().getTime()

const PP = log => x => {
  const stack = (new Error()).stack.split('\n')
  const indent = [...new Array(stack.length - 2)].map(s => '|').join('')
  const where = (stack.length >= 3 ? stack[2] : '???')
    .replace(/\s*at /, '')
    .replace(process.cwd() + '/', '')
  const t = new Date().getTime()
  log(`${indent}${where} ${t - t0}ms`, x)
  return x
}

const pp = PP(console.warn)

module.exports = { pp, PP }
