import { ImagesRepository } from '@/repositories/images-repositories'
import { Image } from '@prisma/client'

interface PostImageUseCaseRequest{
    userId: string
    url: string
}

interface PostImageUseCaseReply{
    image: Image
}

export class PostImageUseCase {
	constructor(private imageRepository: ImagesRepository) {}

	async execute({
		userId,
		url
	}: PostImageUseCaseRequest): Promise<PostImageUseCaseReply> {
		const image = await this.imageRepository.postImage({
			userId,
			url,
		})

		return {
			image,
		}
	}
}