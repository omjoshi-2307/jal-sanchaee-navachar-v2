export const DEFAULT_PORT = 3000
export const DEFAULT_HOST = '127.0.0.1'


export function parsePort(raw: string | undefined, fallback = DEFAULT_PORT): number {
  if (raw === undefined) return fallback

  const value = raw.trim()
  if (!/^\d+$/.test(value)) {
    throw new Error('PORT must be an integer between 1 and 65535.')
  }

  const port = Number(value)
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.')
  }

  return port
}


export function getServerConfig(env: NodeJS.ProcessEnv = process.env) {
  return {
    port: parsePort(env.PORT),
    host: env.HOST?.trim() || DEFAULT_HOST,
  }
}
