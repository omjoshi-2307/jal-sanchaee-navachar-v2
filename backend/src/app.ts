import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import { getServerConfig } from './config.js'


export function buildApp(options: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify(options)

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }))

  return app
}
