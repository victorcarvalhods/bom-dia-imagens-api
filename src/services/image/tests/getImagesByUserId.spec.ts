import { InMemoryImageRepository } from '@/repositories/in-memory/in-memory-images-repository'
import {it, describe, beforeEach, expect} from 'vitest'
import { GetImagesByUserIdUseCase } from '../get-images-by-user-Id'

let imageRepository: InMemoryImageRepository
let sut: GetImagesByUserIdUseCase

describe('Get Images by user id', () => {
	beforeEach(() => {
		imageRepository = new InMemoryImageRepository()
		sut = new GetImagesByUserIdUseCase(imageRepository)
	})
	it('should be able to get list os images by user id', async() => {

		await imageRepository.postImage({
			userId: 'user-id',
			url: 'image-url'
		})

		await imageRepository.postImage({
			userId: 'user-id',
			url: 'image-url2'
		})

		const {images} = await sut.execute({
			userId: 'user-id',
		})

		expect(images).toHaveLength(2)

	})

})