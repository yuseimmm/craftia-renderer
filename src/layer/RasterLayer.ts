import { mat3 } from 'gl-matrix'
import { Container, ContainerOptions } from '../contanier'
import { FrameBuffer, Texture, Vec2, WebGLRenderer } from '../core'
import { Effect } from '../effect/Effect'
import { TextureSprite } from '../sprite'
import { ILayer } from './ILayer'
import { BLEND_MODES } from '../blend-modes'

export type RasterLayerOptions = Partial<ContainerOptions> & {
    blendMode?: keyof typeof BLEND_MODES
    translation?: Vec2
    texture: Texture
}

export class RasterLayer extends Container implements ILayer {
    public blendMode: keyof typeof BLEND_MODES
    public translation: Vec2
    public source: Effect<TextureSprite>
    public update: boolean

    constructor(options: RasterLayerOptions) {
        super(options)

        this.blendMode = options.blendMode ?? 'normal'
        this.translation = options.translation ?? new Vec2(0, 0)
        this.update = false

        this.source = new Effect({
            blendMode: this.blendMode,
            opacity: this.getOpacity(),
            sprite: new TextureSprite({
                transform: this._createTransform(),
                texture: options.texture,
            }),
        })
    }

    public get children() {
        this.source.opacity = this.getOpacity()
        this.source.blendMode = this.blendMode

        //TODO : Add layer effects.
        return [this.source]
    }

    public updateTransform() {
        this.source.sprite.transform = this._createTransform()
    }

    private _createTransform() {
        const matrix = mat3.create()
        mat3.translate(matrix, matrix, this.translation.toArray())
        return matrix
    }

    public renderSource(renderer: WebGLRenderer, target: FrameBuffer) {
        this.source.opacity = this.getOpacity()
        this.source.blendMode = this.blendMode
        this.source.sprite.render(renderer, target)
    }

    public clone() {
        return new RasterLayer({
            visible: this.visible,
            blendMode: this.blendMode,
            opacity: this.opacity,
            parent: { ...this.parent },
            translation: this.translation,
            texture: this.source.sprite.texture,
        })
    }
}
