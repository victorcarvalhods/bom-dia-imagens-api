import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should get user profile', async () => {
		await request(app.server).post('/users').send({
			email: 'Johndoe@gmail.com',
			password: '12345678',
		})

		const response = await request(app.server).post('/auth').send({
			email: 'Johndoe@gmail.com',
			password: '12345678',
		})

		const {token} = response.body

		const userProfile = await request(app.server)      
			.get('/profile')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(userProfile.statusCode).toBe(200)
		expect(userProfile.body.user).toEqual(expect.objectContaining({
			email: 'Johndoe@gmail.com',
		}))

	})
})
