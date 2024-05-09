import { mat3 } from 'gl-matrix'
import { BLEND_MODES } from '../blend-modes'
import { Container } from '../contanier'
import { Texture, Vec2 } from '../core'
import { RenderStream } from '../stream'
import { TextureSprite } from '../sprite'
import { ILayer } from './ILayer'

export type SmartLayerOptions = {
    blendMode?: keyof typeof BLEND_MODES
    scaling?: Vec2
    translation?: Vec2
    rotation?: number
    transform?: mat3
    visible?: boolean
    opacity?: number
    fill?: number
    texture: Texture
}

export class SmartLayer extends Container implements ILayer<SmartLayerOptions> {
    private _sprite: TextureSprite

    constructor(options: SmartLayerOptions) {
        super(options)

        this._sprite = new TextureSprite({ texture: options.texture })
    }

    public get texture() {
        return this._sprite.texture
    }

    public get rotation() {
        return super.rotation
    }

    public set rotation(rotation: number) {
        super.rotation = rotation
    }

    public get transform() {
        return super.transform
    }

    public set transform(transform: mat3) {
        super.transform = transform
    }

    public get scaling() {
        return super.scaling
    }

    public set scaling(scaling: Vec2) {
        super.scaling = scaling
    }

    public clone(options: Partial<SmartLayerOptions>) {
        return new SmartLayer({
            visible: this.visible,
            blendMode: this.blendMode,
            opacity: this.opacity,
            texture: this._sprite.texture,
            translation: this.translation,
            rotation: this.rotation,
            scaling: this.scaling,
            fill: this.fill,
            transform: mat3.clone(this.transform),
            ...options,
        })
    }

    public renderFront(masterStream: RenderStream) {
        this._sprite.setTransform(this.projectionMatrix)
        this._sprite.render(masterStream.renderer, masterStream.front)

        return masterStream.front.getColorTexture()
    }
}
