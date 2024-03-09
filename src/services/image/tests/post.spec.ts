import { InMemoryImageRepository } from '@/repositories/in-memory/in-memory-images-repository'
import {it, describe, beforeEach, expect} from 'vitest'
import { PostImageUseCase } from '../post'

let imageRepository: InMemoryImageRepository
let sut: PostImageUseCase

describe('Post Image', () => {
	beforeEach(() => {
		imageRepository = new InMemoryImageRepository()
		sut = new PostImageUseCase(imageRepository)
	})
	it('should be able to post a image', async() => {
		const { image } = await sut.execute({
			userId: 'user-id',
			url: 'image-url'
		})

		expect(image.id).toEqual(expect.any(String))
	})

})