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

	async getImagesByUserId(userId: string): Promise<Image[]> {
		const images = await prisma.image.findMany({
			where: {
				userId
			},
		})

		return images
	}

	async getImages(): Promise<Image[]> {
		const images = await prisma.image.findMany({
		})

		return images

	}
}