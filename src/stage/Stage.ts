import { mat3 } from 'gl-matrix'
import { Group } from '../group'
import { WebGLRenderer } from '../WebGLRenderer'
import { Vec2 } from '../units'

export class Stage extends Group {
    private _renderer: WebGLRenderer
    constructor(renderer: WebGLRenderer, width: number, height: number) {
        super()

        this._renderer = renderer

        this._localScene.width = width
        this._localScene.height = height
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

    public renderStage() {
        this.updateLocalScene(this._renderer)
        super.texture = this._localScene.read(this._localScene.previous)

        this._renderer.frameBuffer.unbind()
        this.excude(this._renderer, this._renderer.width, this._renderer.height)
    }
}
