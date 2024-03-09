import { Prisma, Image } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ImagesRepository } from '../images-repositories'

export class InMemoryImageRepository implements ImagesRepository{
	public items: Image[] = []

	async getImagesByUserId(userId: string, page:number): Promise<Image[]> {
		return this.items.filter((image) => image.userId === userId).slice((page - 1) * 10, page * 10)
	}

	async getImages(page: number): Promise<Image[]> {
		return this.items.slice((page - 1) * 10, page * 10)
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