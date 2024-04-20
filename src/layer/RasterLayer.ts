import { TextureSprite, TextureSpriteOptions } from '../sprite/TextureSprite'
import { Layer, LayerOptions } from './Layer'

export type RasterLayerOptions = TextureSpriteOptions & LayerOptions

export class RasterLayer extends Layer {
    protected sprite: TextureSprite

    constructor(options: RasterLayerOptions) {
        super(options)
        this.sprite = new TextureSprite(options)
    }

    public getRenderables() {
        this.sprite.transform = this.getMatrix()
        return this.visible ? [this.sprite] : []
    }
}
