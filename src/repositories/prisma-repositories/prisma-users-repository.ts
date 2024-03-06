import { User } from '@prisma/client'
import { UsersRepository } from '../users-repositories'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository{
	async create(data: User){
		const user = await prisma.user.create({data})

		return user
	}

	async findByEmail(email: string){
		const user = await prisma.user.findUnique({
			where:{
				email
			}
		})

		return user
	}

	async findById(id: string){
		const user = await prisma.user.findFirst({
			where:{
				id
			}
		})

		return user
	}
}