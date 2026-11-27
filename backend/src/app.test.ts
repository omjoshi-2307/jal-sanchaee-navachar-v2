import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildApp } from './app.js'


test('GET /health reports liveness without opening a network socket', async () => {
  const app = buildApp({ logger: false })

  try {
    const response = await app.inject({ method: 'GET', url: '/health' })
    assert.equal(response.statusCode, 200)
    assert.match(response.headers['content-type'] ?? '', /application\/json/)

    const payload = response.json() as { status?: unknown; timestamp?: unknown }
    assert.equal(payload.status, 'ok')
    assert.equal(typeof payload.timestamp, 'string')
    assert.ok(Number.isFinite(Date.parse(payload.timestamp as string)))
  } finally {
    await app.close()
  }
})
