import { Texture } from './textures'

export const createTextureAsync = async (src: string) => {
    const img = new Image()
    img.src = src
    await img.decode()

    return new Texture().setPixcels(img, img.width, img.height)
}
