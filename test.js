const _ = require('rubico')
const a = require('a-sert')
const queryLexer = require('.')

describe('queryLexer', () => {
  it('lexes a chimaera query - orderBy', () => _.flow(
    a.eq(queryLexer, {
      filter: {
        operator: 'and',
        operations: [
          { operator: 'eq', field: 'a', values: ['hey'] },
          { operator: 'neq', field: 'a', values: ['heya'] },
          { operator: 'lt', field: 'b', values: [6] },
          { operator: 'gt', field: 'c', values: [0] },
          { operator: 'lte', field: 'd', values: [5] },
          { operator: 'gte', field: 'e', values: [1] },
          { operator: 'prefix', field: 'f', values: ['wazz'] },
          { operator: 'between', field: 'g', values: [1, 5] },
          {
            operator: 'or',
            operations: [
              { operator: 'eq', field: 'h', values: ['yo'] },
              { operator: 'exists', field: 'i', values: [] },
              { operator: 'dne', field: 'j', values: [] },
            ],
          },
        ],
      },
      sort: {
        operator: 'orderBy',
        operations: [
          { operator: 'asc', field: 'b', values: [] },
          { operator: 'desc', field: 'c', values: [] },
        ],
      },
      limit: 100,
    }),
  )($ => ({
    filter: $.and(
      $.eq('a', 'hey'),
      $.neq('a', 'heya'),
      $.lt('b', 6),
      $.gt('c', 0),
      $.lte('d', 5),
      $.gte('e', 1),
      $.prefix('f', 'wazz'),
      $.between('g', 1, 5),
      $.or(
        $.eq('h', 'yo'),
        $.exists('i'),
        $.dne('j')
      ),
    ),
    sort: $.orderBy(
      $.asc('b'),
      $.desc('c'),
    ),
    limit: 100,
  })))

  it('lexes a chimaera query - functionScore', () => _.flow(
    a.eq(queryLexer, {
      filter: {
        operator: 'and',
        operations: [
          { operator: 'eq', field: 'a', values: ['hey'] },
          { operator: 'lt', field: 'b', values: [6] },
          { operator: 'gt', field: 'c', values: [0] },
          { operator: 'lte', field: 'd', values: [5] },
          { operator: 'gte', field: 'e', values: [1] },
          { operator: 'prefix', field: 'f', values: ['wazz'] },
          { operator: 'between', field: 'g', values: [1, 5] },
          {
            operator: 'or',
            operations: [
              { operator: 'eq', field: 'h', values: ['yo'] },
              { operator: 'exists', field: 'i', values: [] },
              { operator: 'dne', field: 'j', values: [] },
            ],
          },
        ],
      },
      sort: {
        operator: 'functionScore',
        operations: [
          {
            operator: 'gauss',
            field: 'l',
            values: [{ origin: '1998-01-01', scale: '1825d' }],
          },
          {
            operator: 'gauss',
            field: 'm',
            values: [{ origin: { lat: 34, lon: -118 }, scale: '100mi' }],
          },
          {
            operator: 'fieldValueFactor',
            field: 'n',
            values: [{ factor: 5, missing: 0, modifier: 'ln2p' }],
          },
        ],
      },
      limit: 100,
    }),
  )($ => ({
    filter: $.and(
      $.eq('a', 'hey'),
      $.lt('b', 6),
      $.gt('c', 0),
      $.lte('d', 5),
      $.gte('e', 1),
      $.prefix('f', 'wazz'),
      $.between('g', 1, 5),
      $.or(
        $.eq('h', 'yo'),
        $.exists('i'),
        $.dne('j')
      ),
    ),
    sort: $.functionScore(
      $.gauss('l', { origin: '1998-01-01', scale: '1825d' }),
      $.gauss('m', { origin: { lat: 34, lon: -118 }, scale: '100mi' }),
      $.fieldValueFactor('n', { factor: 5, missing: 0, modifier: 'ln2p' }),
    ),
    limit: 100,
  })))
})
