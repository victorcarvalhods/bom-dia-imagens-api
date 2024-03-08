import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import type { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDBURL(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL not found')
	}
	const url = new URL(process.env.DATABASE_URL)

	url.searchParams.set('schema', schema)

	return url.toString()
}

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID()
		const dbURL = generateDBURL(schema)

		process.env.DATABASE_URL = dbURL

		execSync('npx prisma migrate deploy')

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				)
				await prisma.$disconnect()
			},
		}
	},
}
