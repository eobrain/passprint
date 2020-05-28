const { pp, PP } = require('./index.js')

const test = require('ava')

test('passthrough', t => {
  const xs = [
    5,
    'hello',
    [1, 2, 3],
    { foo: 'FOO', bar: 'BAR' }
  ]

  xs.forEach((x, i) => {
    t.deepEqual(pp(x), x, `Test #${i}`)
  })
})

test('print', t => {
  let message
  let value
  const pp = PP((m, v) => {
    message = m
    value = v
  })

  pp(999)

  t.deepEqual(value, 999)
  t.regex(message, /\|+test.js:[0-9]+:[0-9]+ [0-9]+ms/)
})

const zip = (v1, v2) => v1.map((x, i) => [x, v2[i]])
const dotProd = (v1, v2) =>
  zip(v1, v2).map(pair => pair[0] * pair[1]).reduce((a, x) => a + x, 0)

test('dotProduct', t => {
  const a = [10, 100, 1000]
  const b = [2, 3, 5]
  t.deepEqual(dotProd(a, b), 5320)
})

const dotProdPP = (v1, v2) =>
  zip(v1, v2).map(pair => pair[0] * pair[1]).reduce((a, x) => pp(a + x), 0)

test('dotProductPP', t => {
  const a = [10, 100, 1000]
  const b = [2, 3, 5]
  t.deepEqual(dotProdPP(a, b), 5320)
})
