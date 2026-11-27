import { buildApp } from './app.js'
import { getServerConfig } from './config.js'


const app = buildApp({ logger: true })
const config = getServerConfig()


async function start() {
  try {
    await app.listen(config)
  } catch (error) {
    app.log.error(error)
    process.exitCode = 1
  }
}


for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, async () => {
    app.log.info({ signal }, 'Closing server')
    try {
      await app.close()
    } catch (error) {
      app.log.error(error)
      process.exitCode = 1
    }
  })
}


void start()
