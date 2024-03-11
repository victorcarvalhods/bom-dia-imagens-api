import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import sharp from 'sharp'
import path from 'node:path'
import { AWSS3Client } from '@/hooks/aws-S3-client'

describe('Post Image (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should post a image and recieve the url', async () => {
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

		const imagePost = await request(app.server)
			.post('/users/images')
			.set('Authorization', `Bearer ${token}`)
			.attach('file', imageBuffer, 'image.png')
        

		expect(imagePost.statusCode).toBe(201)
		expect(imagePost.body).toEqual(expect.objectContaining({
			id: expect.any(String),
			url: expect.any(String),
		}))

		const { url } = imagePost.body
		const fileName = path.basename(url)

		const s3Client = new AWSS3Client()
		await s3Client.delete(fileName)
	})
})
