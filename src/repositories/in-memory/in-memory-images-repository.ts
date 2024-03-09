import { Prisma, Image } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ImagesRepository } from '../images-repositories'

export class InMemoryImageRepository implements ImagesRepository{
	public items: Image[] = []

	async getImagesByUserId(userId: string): Promise<Image[]> {
		return this.items.filter((image) => image.userId === userId)
	}

	async getImages(): Promise<Image[]> {
		return this.items
	}

	async postImage(data: Prisma.ImageUncheckedCreateInput): Promise<Image>{
		const image = {
			id: randomUUID(),
			url: data.url,
			userId: data.userId,
			createdAt: new Date(),
		}

		this.items.push(image)

		return image

	}
}