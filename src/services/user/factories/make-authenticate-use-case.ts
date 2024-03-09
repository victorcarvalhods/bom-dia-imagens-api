import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate'

export function makeAuthenticateUseCase(){
	const usersRepository = new PrismaUsersRepository()
	const authenticateUser = new AuthenticateUserUseCase(usersRepository)

	return authenticateUser
}