const { array: fastCartesian } = require('fast-cartesian')
const { cartesianArray: fastCartesianOld } = require('fast-cartesian-old')
const fastCartesianProduct = require('fast-cartesian-product')
const fastCartesianProduct2 = require('dynamic-loop-function')

const width = Number(process.argv[2])
const height = Number(process.argv[3])
const loops = Number(process.argv[4])

const args = Array.from({ length: width }, () =>
  Array.from({ length: height }, (value, index) => index),
)

const algorithms = [
  { name: 'fast-cartesian', fn: args => fastCartesian(...args) },
  { name: 'fast-cartesian@v2.0.0', fn: args => fastCartesianOld(...args) },
  { name: 'fast-cartesian-product', fn: args => fastCartesianProduct(args) },
  { name: 'fast-cartesian-product (dynamic-loop-function)', fn: args => fastCartesianProduct2(args) },
]

algorithms.forEach(({ name, fn }) => {
  let repeat = loops
  const start = process.hrtime.bigint()

  while (repeat--) {
    fn(args)
  }

  const duration = Number(process.hrtime.bigint() - start) / loops
  console.log(
    `${width}x${height} (${loops.toLocaleString()} loops)`,
    name,
    `${Math.round(duration)}ns`,
  )
})
