import { Texture } from './textures'

export const createTextureAsync = async (src: string) => {
    const response = await fetch(src)
    const blob = await response.blob()
    const imageBitmap = await createImageBitmap(blob, { imageOrientation: 'flipY' })

    return new Texture().setPixcels(imageBitmap, imageBitmap.width, imageBitmap.height)
}
