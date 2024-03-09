import { ImagesRepository } from '@/repositories/images-repositories'
import { Image } from '@prisma/client'

interface GetImagesByUserIdUseCaseRequest{
    userId: string
}

interface GetImagesByUserIdUseCaseReply{
    images: Image[]
}

export class GetImagesByUserIdUseCase {
	constructor(private imageRepository: ImagesRepository) {}

	async execute({
		userId,
	}: GetImagesByUserIdUseCaseRequest): Promise<GetImagesByUserIdUseCaseReply> {
		const images = await this.imageRepository.getImagesByUserId(userId)

		return {
			images,
		}
	}
}