import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verifyJWT'

export async function usersRoutes(app: FastifyInstance){
	app.post('/users', register)
	app.post('/auth', authenticate)

	// requires authentication
	app.get('/profile', {onRequest: [verifyJWT] } , profile)
}