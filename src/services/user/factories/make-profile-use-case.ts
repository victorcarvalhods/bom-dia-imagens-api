import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { UserProfileUseCase } from '../profile'

export function makeProfileUseCase(){
	const usersRepository = new PrismaUsersRepository()
	const profileUseCase = new UserProfileUseCase(usersRepository)

	return profileUseCase
}