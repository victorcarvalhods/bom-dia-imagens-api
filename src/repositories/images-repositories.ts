import { Prisma, Image } from '@prisma/client'

export interface ImagesRepository {
    postImage: (data: Prisma.ImageUncheckedCreateInput) => Promise<Image>
    getImagesByUserId: (userId: string) => Promise<Image[]>
    getImages: () => Promise<Image[]>
}