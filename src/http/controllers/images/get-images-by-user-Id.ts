import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetImagesByUserIdUseCase } from '@/services/image/factories/make-get-images-by-userId'

export async function getImagesByUserId(req: FastifyRequest, reply: FastifyReply) {
	const getImagesByUserIdQuerySchema = z.object({
		page: z.coerce.number().default(1),
	})

	const { page } = getImagesByUserIdQuerySchema.parse(req.query)

	const userId = req.user.sub

	try {
		const getImagesByUserId =  makeGetImagesByUserIdUseCase()

		const { images } = await getImagesByUserId.execute({page, userId})

		return reply.status(200).send(images)
	} catch (error) {
		return reply.status(400).send({message: 'Unable to get Images'})
	}
    
}