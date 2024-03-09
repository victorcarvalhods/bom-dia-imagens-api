import { Prisma, Image } from '@prisma/client'

export interface ImagesRepository {
    postImage: (data: Prisma.ImageUncheckedCreateInput) => Promise<Image>
    getImagesByUserId: (userId: string, page: number) => Promise<Image[]>
    getImages: (page: number) => Promise<Image[]>
}