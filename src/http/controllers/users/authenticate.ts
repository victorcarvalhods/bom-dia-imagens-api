import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '@/services/user/errors/InvalidCredentialsError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8)
	})

	const {email, password} = authenticateBodySchema.parse(req.body)



	try {
		const authenticateUseCase = makeAuthenticateUseCase()
		const { user } = await authenticateUseCase.execute({ email, password })

		const token = await reply.jwtSign({}, {
			sign:{
				sub: user.id
			},
		},
		)

		return reply.status(200).send({ 
			token: token,
		})

	} catch (error) {
		if (error instanceof InvalidCredentialsError){
			return reply.status(401).send({ message: 'Invalid credentials' })
		}
		throw error
	}


    
}