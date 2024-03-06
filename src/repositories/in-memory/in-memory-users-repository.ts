import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repositories'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements UsersRepository{
	public items: User[] = []

	async findById(id: string): Promise<User | null> {
		return this.items.find((user) => user.id === id) || null
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.items.find((user) => user.email === email) || null
	}
    
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: randomUUID(),
			email: data.email,
			password_hash: data.password_hash
		}

		this.items.push(user)
		return user
        
	}

}