import { mat3 } from 'gl-matrix'
import { Sprite, SpriteOptions, SpriteUniformGroup } from '../sprite/Sprite'
import { Texture } from '../textures'
import { Vec2 } from '../units'
import { Shader } from '../shader'

export type SmartLayerOptions = SpriteOptions & {
    rotation?: number
    translation?: Vec2
    scaling?: Vec2
    transform?: mat3
    shader?: Shader<SpriteUniformGroup>
}

export class SmartLayer extends Sprite {
    constructor(options: SmartLayerOptions) {
        super(options)

        this.scaling = options.scaling ?? new Vec2(1, 1)
        this.translation = options.translation ?? new Vec2(0, 0)
        this.rotation = options.rotation ?? 0
        this.transform = options.transform ?? mat3.create()
    }

    public clone(options: Partial<SmartLayerOptions>) {
        return new SmartLayer({
            ...this.getConfigs(),
            transform: mat3.clone(this.transform),
            ...options,
        })
    }

    public getConfigs() {
        return {
            visible: this.visible,
            blendMode: this.blendMode,
            opacity: this.opacity,
            translation: this.translation,
            texture: this.texture,
            scaling: this.scaling,
            rotation: this.rotation,
            transform: this.transform
        }
    }

    public get texture() {
        return super.texture
    }
    public set texture(texture: Texture) {
        super.texture = texture
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
}
