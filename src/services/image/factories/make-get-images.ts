import { PrismaImageRepository } from '@/repositories/prisma-repositories/prisma-images-repository'
import { GetImagesUseCase } from '../get-images'


export function makeGetImagesUseCase(){
	const imagesRepository = new PrismaImageRepository()
	const getImages = new GetImagesUseCase(imagesRepository)

	return getImages
}