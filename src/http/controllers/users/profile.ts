import { makeProfileUseCase } from '@/services/factories/make-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function profile(req: FastifyRequest, reply: FastifyReply) {
	const userId = req.user.sub

	const profileUseCase = makeProfileUseCase()

	const { user } = await profileUseCase.execute({userId})

	return reply.status(200).send({ 
		user: {
			...user,
			password_hash: undefined
		},
	})
    
}