import { mat3 } from 'gl-matrix'
import { BLEND_MODES } from '../blend-modes/BlendMode'
import { Layer } from '../layer/Layer'
import { Node, NodeOptions } from '../node/Node'
import { RenderPipeline } from '../pipeline/RenderPipeline'
import { ValOrUpdater } from '../types'
import { ContainerSurface } from './ContainerSurface'
import { WebGLRenderer } from '../core'

export interface ContainerOptions extends NodeOptions {}

export class Container extends Node {
    public version: number

    private _children: (Layer | Container)[]
    private _surface: ContainerSurface

    constructor(options: ContainerOptions) {
        super(options)

        this._children = []
        this.version = 0
        this._surface = new ContainerSurface()
    }

    public setChildren(valOrUpdater: ValOrUpdater<(Layer | Container)[]>) {
        if (typeof valOrUpdater === 'function') {
            this._children = valOrUpdater(this._children)
        } else {
            this._children = valOrUpdater
        }
        this.version++
    }

    public render(target: RenderPipeline) {
        if (!this.visible) {
            return
        }
        if (this.blendMode === 'normal') {
            this.renderChildren(target)
        } else {
            this.renderSurface(target)
        }
    }

    public renderSurface(target: RenderPipeline) {
        target.spin()
        this.generateSurfece(target.renderer).render(target)

        target.blendMode.blend(BLEND_MODES[this.blendMode], {
            opacity: this.getOpacity(),
        })
    }

    public generateSurfece(renderer: WebGLRenderer) {
        const curent = this._surface.getCurrentSurface()

        if (curent && this._surface.version === this.version) {
            return curent
        }

        this._surface.version = this.version

        return this._surface.createSufrace(renderer, {
            fn: (target) => {
                this.renderChildren(target)
            },
            transform: this.getMatrix(),
        })
    }

    public renderChildren(target: RenderPipeline) {
        const matrix = this.getMatrix()
        const opacity = this.getOpacity()

        for (let i = 0; i < this._children.length; i++) {
            const child = this._children[i]

            if (child instanceof Container) {
                this.renderContainer(target, child, matrix, opacity)
            } else {
                this.renderLayer(target, child, matrix, opacity)
            }
        }
    }

    public renderLayer(target: RenderPipeline, layer: Layer, matrix: mat3, opacity: number) {
        layer.parent.transform = matrix
        layer.parent.opacity = opacity

        const renderables = layer.getRenderables()

        for (let i = 0; i < renderables.length; i++) {
            target.spin()
            renderables[i].render(target)
            target.blendMode.blend(BLEND_MODES[layer.blendMode], {
                opacity: layer.getOpacity(),
            })
        }
    }

    public renderContainer(
        target: RenderPipeline,
        container: Container,
        matrix: mat3,
        opacity: number
    ) {
        container.parent.transform = matrix
        container.parent.opacity = opacity
        container.render(target)
    }
}
