import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import sharp from 'sharp'
import path from 'node:path'
import { AWSS3Client } from '@/hooks/aws-S3-client'

describe('Get images by user Id (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get images from a user', async () => {
		await request(app.server).post('/users').send({
			email: 'Johndoe@gmail.com',
			password: '12345678',
		})

		const response = await request(app.server).post('/auth').send({
			email: 'Johndoe@gmail.com',
			password: '12345678',
		})

		const {token} = response.body

		const imageBuffer = await sharp({
			create: {
				width: 100,
				height: 100,
				channels: 4,
				background: { r: 255, g: 0, b: 0, alpha: 0.5 
				},
			},
		}).png().toBuffer()

		const uploadedImage = await request(app.server)
			.post('/users/images')
			.set('Authorization', `Bearer ${token}`)
			.attach('file', imageBuffer, 'image.png')
        
		const userId = uploadedImage.body.userId

		const getImages = await request(app.server)
			.get(`/users/${userId}/images`)
        
        

		expect(getImages.statusCode).toBe(200)
		expect(Array.isArray(getImages.body)).toBe(true)

		const { url } = uploadedImage.body
		const fileName = path.basename(url)

		const s3Client = new AWSS3Client()
		await s3Client.delete(fileName)
	})
})
