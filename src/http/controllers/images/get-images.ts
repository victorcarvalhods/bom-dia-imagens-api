import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetImagesUseCase } from '../../../services/image/factories/make-get-images'

export async function getImages(req: FastifyRequest, reply: FastifyReply) {
	const getImagesQuerySchema = z.object({
		page: z.coerce.number().default(1),
	})

	const { page } = getImagesQuerySchema.parse(req.query)

	try {
		const getImages =  makeGetImagesUseCase()

		const { images } = await getImages.execute({page})

		return reply.status(200).send(images)
	} catch (error) {
		return reply.status(400).send({message: 'Unable to get Images'})
	}
    
}