import { UsersRepository } from '@/repositories/users-repositories'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'
import { compare } from 'bcryptjs'

interface AuthenticateUserUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateUserUseCaseReply{
    user: User
}

export class AuthenticateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password
	}: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseReply>{
		const user = await this.usersRepository.findByEmail(email)

		if (!user){
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatch = await compare(password, user.password_hash)

		if (!doesPasswordMatch){
			throw new InvalidCredentialsError()
		}

		return {
			user,
		}

	}
}