import { FastifyInstance } from 'fastify'
import { getImages } from './get-images'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { getImagesByUserId } from './get-images-by-user-Id'
import { postImage } from './post-image'
import multipart from '@fastify/multipart'

export async function imagesRoutes (app: FastifyInstance){
	app.get('/images', getImages)

	
	//user should be authenticated to use the follow routes
	app.addHook('onRequest', verifyJWT)
	app.get('/users/images', getImagesByUserId)

	app.register(multipart)//file handler
	app.post('/users/images', postImage)
}