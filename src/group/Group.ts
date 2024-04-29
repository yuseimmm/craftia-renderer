import { mat3 } from 'gl-matrix'
import { BLEND_MODES } from '../blend-modes'
import { Container, ContainerOptions } from '../contanier'
import { Vec2, WebGLRenderer } from '../core'
import { Effect } from '../effect/Effect'
import { ILayer } from '../layer'
import { RenderPipeline } from '../pipeline'
import { TextureSprite } from '../sprite'

export type GroupOptions = Partial<ContainerOptions> & {
    blendMode?: keyof typeof BLEND_MODES
}

export class Group extends Container {
    public blendMode: keyof typeof BLEND_MODES

    private _surface: Effect | null
    private _surfaceDest: RenderPipeline | null
    private _children: (Group | ILayer)[]
    private _update: boolean

    constructor(options: GroupOptions) {
        super(options)

        this._surface = null
        this._surfaceDest = null
        this.blendMode = options.blendMode ?? 'normal'
        this._children = []
        this._update = false
    }

    public get update() {
        if (this._update) {
            return true
        }

        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].update) return true
        }
        return false
    }

    public set update(update: boolean) {
        if (update) {
            this._update = true
        } else {
            for (let i = 0; i < this._children.length; i++) {
                this._children[i].update = false
            }
        }
    }

    public get children() {
        return this._children
    }

    public setChildren(children: (Group | ILayer)[]) {
        this._children = children
    }

    public render(pipeline: RenderPipeline): void {
        if (this.blendMode === 'normal') {
            this._surfaceDest?.destroy()
            this._surface = null
            this._surfaceDest = null

            super.render(pipeline)
        } else {
            if (this._surface && !this.update) {
                this._surface.render(pipeline)
                return
            }

            const surfaceDest = this.generateSurfaceDestination(
                pipeline.renderer,
                pipeline.renderer.width,
                pipeline.renderer.height
            )

            super.render(surfaceDest)

            const sprite = new TextureSprite({
                transform: mat3.identity(mat3.create()),
                texture: surfaceDest.target.getColorTexture(),
            })

            this._surface = new Effect({
                blendMode: this.blendMode,
                opacity: this.getOpacity(),
                sprite,
            })

            this._surface.render(pipeline)
        }
    }

    public generateSurfaceDestination(renderer: WebGLRenderer, width: number, height: number) {
        if (this._surfaceDest) {
            this._surfaceDest.resize(new Vec2(width, height))
            return this._surfaceDest
        }

        return (this._surfaceDest = new RenderPipeline(renderer, {
            width,
            height,
        }))
    }
}
