/**
 * @type { import("fastify").RouteHandlerMethod }
 */

export function home(req, reply) {
  reply.send({ message: 'Server is running' })
}
