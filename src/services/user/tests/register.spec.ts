import {it, describe, beforeEach, expect} from 'vitest'
import { RegisterUserUseCase } from '../register'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'

let userRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register User', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		sut = new RegisterUserUseCase(userRepository)
	})
	it('should be able to register a user', async() => {
		const { user } = await sut.execute({
			email: 'user1@email.com',
			password: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should be able to hash the user password upon registration', async() => {
		const { user } = await sut.execute({
			email: 'user1@email.com',
			password: '123456'
		})

		const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with same email twice', async() => {
		await sut.execute({
			email: 'user1@email.com',
			password: '123456'
		})

		await expect(() => 
			sut.execute({
				email: 'user1@email.com',
				password: '123456'
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})