import { UsersRepository } from '@/repositories/users-repositories'
import { ResourceNotFound } from '../global-erros/ResourceNotFound'
import { User } from '@prisma/client'

interface UserProfileUseCaseRequest{
    userId: string
}

interface UserProfileUseCaseReply{
    user: User
}

export class UserProfileUseCase{
	constructor(private usersRepository: UsersRepository){}
	async execute({
		userId
	}: UserProfileUseCaseRequest): Promise<UserProfileUseCaseReply>{
		const user = await this.usersRepository.findById(userId)
		if (!user){
			throw new ResourceNotFound()
		}
		return {
			user,
		}
	}
}