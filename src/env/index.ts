import 'dotenv/config'
import { z } from 'zod'


const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
	AWS_ACCESS_KEY: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_REGION: z.string(),
	AWS_BUCKET_NAME: z.string(),
	AWS_BUCKET_PREFIX: z.string(),
	AWS_BUCKET_URL: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
	console.log('Invalid environment variable', _env.error.format())

	throw new Error('Invalid environment variable')
    
}

export const env = _env.data