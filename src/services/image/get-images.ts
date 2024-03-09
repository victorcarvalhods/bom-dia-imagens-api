import { ImagesRepository } from '@/repositories/images-repositories'
import { Image } from '@prisma/client'

interface GetImagesUseCaseRequest{
    page: number
}

interface GetImagesUseCaseReply{
    images: Image[]
}

export class GetImagesUseCase {
	constructor(private imageRepository: ImagesRepository) {}

	async execute({
		page
	}: GetImagesUseCaseRequest): Promise<GetImagesUseCaseReply> {
		const images = await this.imageRepository.getImages(page)

		return {
			images,
		}
	}
}