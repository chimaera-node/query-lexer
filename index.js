const $ = {}

const fieldOperators = new Set([
  'eq', 'neq', 'gt', 'lt', 'gte', 'lte',
  'exists', 'dne', 'prefix', 'between',
  'like', 'geo',
  'asc', 'desc',
  'gauss', 'fieldValueFactor',
])

const groupOperators = new Set([
  'and', 'or', 'orderBy', 'functionScore',
])

for (const operator of fieldOperators) {
  $[operator] = (field, ...values) => ({ operator, field, values })
}

for (const operator of groupOperators) {
  $[operator] = (...operations) => ({ operator, operations })
}

module.exports = query => query($)
