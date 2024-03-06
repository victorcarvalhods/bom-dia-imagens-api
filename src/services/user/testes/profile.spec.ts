import {it, describe, beforeEach, expect} from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UserProfileUseCase } from '../profile'
import { ResourceNotFound } from '@/services/erros/ResourceNotFound'

let userRepository: InMemoryUserRepository
let sut: UserProfileUseCase

describe('User profile', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		sut = new UserProfileUseCase(userRepository)
	})

	it('should be able to get user profile', async() => {
		const createduser = await userRepository.create({
			email: 'user1@email.com',
			password_hash: await hash('123456', 6)
		})

		const {user} = await sut.execute({
			userId: createduser.id
		})

		expect(user.id).toEqual(expect.any(String))
		expect(user.email).toEqual(expect.any(String))
		
	})

	it('should not be able to get profile of non-existent user', async() => {
		await expect(() => 
			sut.execute({
				userId: 'non-existent-user-id'
			})
		).rejects.toBeInstanceOf(ResourceNotFound)
		
	})


})