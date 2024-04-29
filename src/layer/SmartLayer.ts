import { mat3 } from 'gl-matrix'
import { Container, ContainerOptions } from '../contanier'
import { Texture, Vec2 } from '../core'
import { Effect } from '../effect/Effect'
import { TextureSprite } from '../sprite'
import { ILayer } from './ILayer'
import { BLEND_MODES } from '../blend-modes'

export type SmartLayerOptions = Partial<ContainerOptions> & {
    blendMode?: keyof typeof BLEND_MODES
    translation?: Vec2
    rotation?: number
    scaling?: Vec2
    transform?: mat3
    texture: Texture
}

export class SmartLayer extends Container implements ILayer {
    public blendMode: keyof typeof BLEND_MODES
    public translation: Vec2
    public rotation: number
    public scaling: Vec2
    public transform: mat3
    public update: boolean

    public source: Effect<TextureSprite>

    constructor(options: SmartLayerOptions) {
        super(options)

        this.blendMode = options.blendMode ?? 'normal'
        this.translation = options.translation ?? new Vec2(0, 0)
        this.rotation = options.rotation ?? 0
        this.scaling = options.scaling ?? new Vec2(1, 1)
        this.transform = options.transform ?? mat3.identity(mat3.create())
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

        return [this.source]
    }

    public updateTransform() {
        this.source.sprite.transform = this._createTransform()
    }

    public clone() {
        return new SmartLayer({
            visible: this.visible,
            blendMode: this.blendMode,
            opacity: this.opacity,
            parent: { ...this.parent },
            texture: this.source.sprite.texture,
            translation: this.translation,
            rotation: this.rotation,
            scaling: this.scaling,
            transform: mat3.clone(this.transform),
        })
    }

    private _createTransform() {
        const matrix = mat3.create()

        mat3.scale(matrix, matrix, this.scaling.toArray())
        mat3.rotate(matrix, matrix, this.rotation)
        mat3.translate(matrix, matrix, this.translation.toArray())
        mat3.multiply(matrix, matrix, this.transform)

        return matrix
    }
}
