import { mat3 } from 'gl-matrix'
import { Texture } from '../core'
import { RenderPipeline } from '../pipeline/RenderPipeline'

export interface SpriteOptions {
    transform: mat3
}

export abstract class Sprite implements SpriteOptions {
    public transform: mat3

    constructor({ transform }: SpriteOptions) {
        this.transform = transform
    }

    public abstract get realWidth(): number
    public abstract get realHeight(): number

    abstract render(target: RenderPipeline): Texture
}
