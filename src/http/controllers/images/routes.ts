import { FastifyInstance } from 'fastify'
import { getImages } from './get-images'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { getImagesByUserId } from './get-images-by-user-Id'
import { postImage } from './post-image'
import multipart from '@fastify/multipart'

export async function imagesRoutes (app: FastifyInstance){
	app.get('/images', getImages)
	app.get('/users/:userId/images', getImagesByUserId)
    
	app.register(multipart) //file handler

	//user should be authenticated to use the follow routes

	app.post('/users/images', { onRequest: verifyJWT }, postImage)
}