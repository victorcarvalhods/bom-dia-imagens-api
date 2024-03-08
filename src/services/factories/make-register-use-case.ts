import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { RegisterUserUseCase } from '../user/register'

export function makeRegisterUseCase(){
	const usersRepository = new PrismaUsersRepository()
	const registerUseCase = new RegisterUserUseCase(usersRepository)

	return registerUseCase
}