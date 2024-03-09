import { AWSS3Client } from '@/hooks/aws-S3-client'
import { FastifyReply, FastifyRequest } from 'fastify'
import {InvalidImageExtension} from './erros/Invalid-image-extension-error'
import path from 'path'
import { MultipartFile } from '@fastify/multipart'
import { makePostImageUseCase } from '@/services/image/factories/make-post-image-factory'


export async function postImage(req: FastifyRequest, reply: FastifyReply) {
	const userID = req.user.sub

	const uploadedImage = await req.file()

	if (!uploadedImage){
		return reply.status(400).send({message: 'No image file provided'})
	}

	try {
		const imageURL = await uploadImageToAWS(userID, uploadedImage)
		const postImageUseCase = makePostImageUseCase()

		const { image } =  await postImageUseCase.execute({
			userId: userID,
			url: imageURL
		})

		return reply.status(201).send(image)
	} catch (error) {
		if (error instanceof InvalidImageExtension){
			return reply.status(400).send({message: 'Invalid Image file Exentension. expected one of the following: png, jpeg, jpg, gif'})
		}
	}


    
}

async function uploadImageToAWS(userID: string, image: MultipartFile) {

	const originalFileName = image.filename

	const fileExtension = path.extname(originalFileName).replace('.', '')

	if (!isFileExtensionValid(fileExtension)){
		throw new InvalidImageExtension()
	}

	const newFileName = `${userID}_${originalFileName}` //add userId at the front of the img name


	const awsS3Client = new AWSS3Client()

	const imageURL = await awsS3Client.upload(await image.toBuffer(), newFileName, fileExtension)
    
	return imageURL

}

function isFileExtensionValid(fileExtension: string): boolean{ 
	const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']

	if (!allowedExtensions.includes(fileExtension)){
		return false
	}

	return true

}