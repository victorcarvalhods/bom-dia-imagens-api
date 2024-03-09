import { PrismaImageRepository } from '@/repositories/prisma-repositories/prisma-images-repository'
import { PostImageUseCase } from '../post'


export function makePostImageUseCase(){
	const imagesRepository = new PrismaImageRepository()
	const postImage = new PostImageUseCase(imagesRepository)

	return postImage
}