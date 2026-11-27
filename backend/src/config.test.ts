import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DEFAULT_HOST, DEFAULT_PORT, getServerConfig, parsePort } from './config.js'


test('parsePort uses the default when PORT is not provided', () => {
  assert.equal(parsePort(undefined), DEFAULT_PORT)
})


test('parsePort accepts valid integer ports and surrounding whitespace', () => {
  assert.equal(parsePort(' 8080 '), 8080)
  assert.equal(parsePort('1'), 1)
  assert.equal(parsePort('65535'), 65535)
})

test('parsePort rejects malformed and out-of-range values', () => {
  for (const value of ['', 'abc', '1.5', '0', '65536', '-1', 'NaN', 'Infinity']) {
    assert.throws(() => parsePort(value), /PORT must be an integer/)
  }
})

test('getServerConfig defaults to loopback and the standard port', () => {
  assert.deepEqual(getServerConfig({}), { host: DEFAULT_HOST, port: DEFAULT_PORT })
})

test('getServerConfig trims a custom host and parses its port', () => {
  assert.deepEqual(getServerConfig({ HOST: ' 0.0.0.0 ', PORT: '4321' }), {
    host: '0.0.0.0',
    port: 4321,
  })
})
