import { BLEND_MODES } from '../blend-modes'
import { Container } from '../contanier'
import { Texture, Vec2 } from '../core'
import { RenderStream } from '../stream'
import { TextureSprite } from '../sprite'
import { ILayer } from './ILayer'

export type RasterLayerOptions = {
    blendMode?: keyof typeof BLEND_MODES
    translation?: Vec2
    visible?: boolean
    opacity?: number
    fill?: number
    texture: Texture
}

export class RasterLayer extends Container implements ILayer {
    private _sprite: TextureSprite

    constructor(options: RasterLayerOptions) {
        super(options)

        this._sprite = new TextureSprite({ texture: options.texture })
    }

    public get texture() {
        return this._sprite.texture
    }

    public clone(options: Partial<RasterLayerOptions>) {
        return new RasterLayer({
            visible: this.visible,
            blendMode: this.blendMode,
            opacity: this.opacity,
            translation: this.translation,
            fill: this.fill,
            texture: this._sprite.texture,
            ...options
        })
    }

    public renderFront(masterPipeline: RenderStream) {
        this._sprite.setTransform(this.projectionMatrix)
        this._sprite.render(masterPipeline.renderer, masterPipeline.front)

        return masterPipeline.front.getColorTexture()
    }
}
