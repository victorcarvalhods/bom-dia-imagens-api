import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetImagesUseCase } from '../../../services/image/factories/make-get-images'

export async function getImages(req: FastifyRequest, reply: FastifyReply) {

	try {
		const getImages =  makeGetImagesUseCase()

		const { images } = await getImages.execute()

		return reply.status(200).send(images)
	} catch (error) {
		return reply.status(400).send({message: 'Unable to get Images'})
	}
    
}