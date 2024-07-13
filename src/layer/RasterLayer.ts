import { Sprite, SpriteOptions } from '../sprite/Sprite'
import { Texture } from '../textures'

export type RasterLayerOptions = SpriteOptions

export class RasterLayer extends Sprite {
    public clone(options: Partial<RasterLayerOptions>) {
        return new RasterLayer({
            visible: this.visible,
            blendMode: this.blendMode,
            opacity: this.opacity,
            translation: this.translation,
            texture: this.texture,
            ...options,
        })
    }

    public get texture() {
        return super.texture
    }
    public set texture(texture: Texture) {
        super.texture = texture
    }
}
