import { PrismaImageRepository } from '@/repositories/prisma-repositories/prisma-images-repository'
import { GetImagesByUserIdUseCase } from '../get-images-by-user-Id'


export function makeGetImagesByUserIdUseCase(){
	const imagesRepository = new PrismaImageRepository()
	const getImagesByUserId = new GetImagesByUserIdUseCase(imagesRepository)

	return getImagesByUserId
}