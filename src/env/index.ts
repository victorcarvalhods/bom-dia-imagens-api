import 'dotenv/config'
import { z } from 'zod'


const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
	console.log('Invalid environment variable', _env.error.format())

	throw new Error('Invalid environment variable')
    
}

export const env = _env.data