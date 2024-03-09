import {S3} from '@aws-sdk/client-s3'
import { env } from '@/env'

export class AWSS3Client{
	private s3Client: S3
	private bucketName: string
	private bucketPrefix: string
	private bucketURL: string

	constructor(){
		this.s3Client = new S3({
			credentials: {
				accessKeyId: env.AWS_ACCESS_KEY,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY
			},

			region: env.AWS_REGION
		})

		this.bucketName = env.AWS_BUCKET_NAME
		this.bucketPrefix = env.AWS_BUCKET_PREFIX
		this.bucketURL = env.AWS_BUCKET_URL
	}

	async upload(image: Buffer, filename: string, fileExtension: string){
		const params = {
			Bucket: this.bucketName,
			Key: `${this.bucketPrefix}${filename}`,
			ContentType: `image/${fileExtension}`,
			Body: image,
		}

		await this.s3Client.putObject(params)

		return this.bucketURL + this.bucketPrefix + filename
        
	}
}