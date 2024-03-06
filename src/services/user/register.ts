import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repositories'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'
import { hash } from 'bcryptjs'


interface RegisterUserUseCaseProps{
    email: string;
    password: string;
}

interface RegisterUserUseCaseResponse{
    user: User
}

export class RegisterUserUseCase{
	constructor (private usersRepository: UsersRepository){}

	async execute({
		email,
		password
	}: RegisterUserUseCaseProps): Promise<RegisterUserUseCaseResponse>{
		const existsUserWithSameEmail = await this.haveUserWithSameEmail(email)
		if(existsUserWithSameEmail){
			throw new UserAlreadyExistsError()
		}

		const password_hash = await hash(password, 6)

		const user = await this.usersRepository.create({email, password_hash})

		return {
			user,
		}
	}

	private async haveUserWithSameEmail(email: string): Promise<boolean>{
		const existsUserWithSameEmail = await this.usersRepository.findByEmail(email)
		return existsUserWithSameEmail ? true : false
	}
}