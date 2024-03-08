import { makeRegisterUseCase } from '@/services/factories/make-register-use-case'
import { UserAlreadyExistsError } from '@/services/user/errors/UserAlreadyExistsError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply : FastifyReply) {
	const registerBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8)
	})

	const {email, password} = registerBodySchema.parse(req.body)

	try {
		const registerUseCase = makeRegisterUseCase()

		await registerUseCase.execute({email, password})
	} catch (error) {
		if (error instanceof UserAlreadyExistsError){
			return reply.status(409).send({message: 'User already exists'})
		}

		throw error
	}

	return reply.status(201).send()
}