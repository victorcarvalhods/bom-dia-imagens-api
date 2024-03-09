import { ImagesRepository } from '@/repositories/images-repositories'
import { Image } from '@prisma/client'

interface GetImagesUseCaseReply{
    images: Image[]
}

export class GetImagesUseCase {
	constructor(private imageRepository: ImagesRepository) {}

	async execute(): Promise<GetImagesUseCaseReply> {
		const images = await this.imageRepository.getImages()

		return {
			images,
		}
	}
}