import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetImagesByUserIdUseCase } from '@/services/image/factories/make-get-images-by-userId'

export async function getImagesByUserId(req: FastifyRequest, reply: FastifyReply) {
	const getImagesByUserIdParamsSchema = z.object({
		userId: z.coerce.string(),
	})

	const {userId} = getImagesByUserIdParamsSchema.parse(req.params)

	try {
		const getImagesByUserId =  makeGetImagesByUserIdUseCase()

		const { images } = await getImagesByUserId.execute({userId})

		return reply.status(200).send(images)
	} catch (error) {
		return reply.status(400).send({message: 'Unable to get Images'})
	}
    
}