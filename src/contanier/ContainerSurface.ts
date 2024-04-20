import { mat3 } from 'gl-matrix'
import { Vec2, WebGLRenderer } from '../core'
import { RenderPipeline } from '../pipeline/RenderPipeline'
import { TextureSprite, TextureSpriteOptions } from '../sprite/TextureSprite'

export type SurfaceGenerationOptions = {
    fn: (target: RenderPipeline) => unknown
    transform: mat3
}

export class ContainerSurface {
    public version: number

    private _pipeline?: RenderPipeline
    private _destination?: TextureSprite

    constructor() {
        this.version = 0
    }

    public createSufrace(renderer: WebGLRenderer, options: SurfaceGenerationOptions) {
        const pipeline = this._generatePipeline(renderer)

        if (
            pipeline.target.width !== renderer.width ||
            pipeline.target.height !== renderer.height
        ) {
            pipeline.resize(new Vec2(renderer.width, renderer.height))
        }

        options.fn(pipeline)

        return this._generateDestination({
            texture: pipeline.target.getColorTexture(),
            transform: options.transform,
        })
    }

    public getCurrentSurface() {
        return this._destination || null
    }

    private _generatePipeline(renderer: WebGLRenderer) {
        if (this._pipeline) {
            return this._pipeline
        }

        return (this._pipeline = new RenderPipeline(renderer, {
            width: renderer.width,
            height: renderer.height,
        }))
    }

    private _generateDestination(options: TextureSpriteOptions) {
        if (this._destination) {
            this._destination.texture = options.texture
            this._destination.transform = options.transform
            return this._destination
        }

        return (this._destination = new TextureSprite(options))
    }
}
