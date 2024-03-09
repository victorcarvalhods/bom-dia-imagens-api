import { InMemoryImageRepository } from '@/repositories/in-memory/in-memory-images-repository'
import {it, describe, beforeEach, expect} from 'vitest'
import { GetImagesUseCase } from '../get-images'

let imageRepository: InMemoryImageRepository
let sut: GetImagesUseCase

describe('Get Images', () => {
	beforeEach(() => {
		imageRepository = new InMemoryImageRepository()
		sut = new GetImagesUseCase(imageRepository)
	})
	it('should be able to get list os images', async() => {

		await imageRepository.postImage({
			userId: 'user-id',
			url: 'image-url'
		})

		await imageRepository.postImage({
			userId: 'user-id',
			url: 'image-url2'
		})

		const {images} = await sut.execute()

		expect(images).toHaveLength(2)

	})

})