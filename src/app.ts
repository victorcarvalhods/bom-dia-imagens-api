import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { imagesRoutes } from './http/controllers/images/routes'
import fastifyRateLimit from '@fastify/rate-limit'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(fastifyRateLimit, {
	max: 10,
	timeWindow: 1000 * 60 * 5, // 5 minutes
})

app.register(usersRoutes)
app.register(imagesRoutes)