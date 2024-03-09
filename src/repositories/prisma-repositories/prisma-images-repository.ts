import { Prisma, Image } from '@prisma/client'
import { ImagesRepository } from '../images-repositories'
import { prisma } from '@/lib/prisma'

export class PrismaImageRepository implements ImagesRepository{
	async postImage(data: Prisma.ImageUncheckedCreateInput): Promise<Image> {
		const image = await prisma.image.create({
			data
		})

		return image
	}

	async getImagesByUserId(userId: string, page: number): Promise<Image[]> {
		const images = await prisma.image.findMany({
			where: {
				userId
			},
			take: 10,
			skip: page * 10
		})

		return images
	}

	async getImages(page: number): Promise<Image[]> {
		const images = await prisma.image.findMany({
			take: 10,
			skip: page * 10
		})

		return images

	}
}