import fastify from 'fastify'
import { routes } from './routes/index.js'

/**
 * @param { import('fastify').FastifyServerOptions } options
 */

export function build(options = {}) {
  const app = fastify(options)

  app.register(routes)

  return app
}
