import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should authenticate a user', async () => {
		await request(app.server).post('/users').send({
			email: 'Johndoe@gmail.com',
			password: '12345678',
		})

		const response = await request(app.server).post('/auth').send({
			email: 'Johndoe@gmail.com',
			password: '12345678',
		})
		console.log(response.body.token)
        
		expect(response.statusCode).toBe(200)
		expect(response.body.token).toEqual(expect.any(String))
	})
})
