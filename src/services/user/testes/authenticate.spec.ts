import {it, describe, beforeEach, expect} from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUserUseCase } from '../authenticate'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		sut = new AuthenticateUserUseCase(userRepository)
	})
	it('should be able to authenticate a user', async() => {
		await userRepository.create({
			email: 'user1@email.com',
			password_hash: await hash('123456', 6)
		})

		const { user } = await sut.execute({
			email: 'user1@email.com',
			password: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async() => {
		await expect(()=> 
			sut.execute({
				email: 'user1@email.com',
				password: '123456'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async() => {
		await userRepository.create({
			email: 'user1@email.com',
			password_hash: await hash('123456', 6)
		})

		await expect(()=> 
			sut.execute({
				email: 'user1@email.com',
				password: '12345'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})