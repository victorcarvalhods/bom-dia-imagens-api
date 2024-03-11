import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Images (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should get images', async () => {

		const response = await request(app.server)
			.get('/images')
			.send()

		expect(response.status).toBe(200)
		expect(Array.isArray(response.body)).toBe(true)
	})
})