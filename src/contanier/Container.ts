import { mat3 } from 'gl-matrix'
import { BLEND_MODES } from '../blend-modes/BlendMode'
import { Vec2 } from '../units'
import { WebGLRenderer } from '../WebGLRenderer'
import { Scene } from '../scene/Scene'

export type ContainerParentProps = {
    opacity?: number
}

export interface ContainerOptions {
    blendMode: keyof typeof BLEND_MODES
    scaling: Vec2
    translation: Vec2
    rotation: number
    transform: mat3
    visible: boolean
    opacity: number
}

export type ContainerRenderOptions = {
    parentOpacity?: number
}

export class Container {
    private _blendMode: keyof typeof BLEND_MODES
    private _scaling: Vec2
    private _translation: Vec2
    private _rotation: number
    private _transform: mat3
    private _visible: boolean
    private _opacity: number
    protected projectionMatrix: mat3

    protected update: boolean

    constructor({
        blendMode,
        scaling,
        translation,
        rotation,
        transform,
        visible,
        opacity,
    }: Partial<ContainerOptions> = {}) {
        this._blendMode = blendMode ?? 'normal'
        this._scaling = scaling ?? new Vec2(1, 1)
        this._translation = translation ?? new Vec2(0, 0)
        this._rotation = rotation ?? 0
        this._transform = transform ?? mat3.create()
        this._visible = visible ?? true
        this._opacity = opacity ?? 1.0

        this.projectionMatrix = mat3.create()
        this.update = false

        this.updateProjectionMatrix()
    }

    public get visible() {
        return this._visible
    }

    public set visible(visible: boolean) {
        this._visible = visible
        this.update = true
    }

    public get opacity() {
        return this._opacity
    }

    public set opacity(opacity: number) {
        this._opacity = Math.max(Math.min(1, opacity), 0)
        this.update = true
    }

    public get blendMode() {
        return this._blendMode
    }

    public set blendMode(blendMode: keyof typeof BLEND_MODES) {
        this._blendMode = blendMode
        this.update = true
    }

    public get translation() {
        return this._translation
    }

    public set translation(translation: Vec2) {
        this._translation = translation

        this.updateProjectionMatrix()
        this.update = true
    }

    protected get rotation() {
        return this._rotation
    }

    protected set rotation(rotation: number) {
        this._rotation = rotation

        this.updateProjectionMatrix()
        this.update = true
    }

    protected get transform() {
        return this._transform
    }

    protected set transform(transform: mat3) {
        this._transform = transform

        this.updateProjectionMatrix()
        this.update = true
    }

    protected get scaling() {
        return this._scaling
    }

    protected set scaling(scaling: Vec2) {
        this._scaling = scaling

        this.updateProjectionMatrix()
        this.update = true
    }

    public updateProjectionMatrix() {
        mat3.identity(this.projectionMatrix)

        mat3.scale(this.projectionMatrix, this.projectionMatrix, this.scaling.toArray())
        mat3.rotate(this.projectionMatrix, this.projectionMatrix, this.rotation)
        mat3.translate(this.projectionMatrix, this.projectionMatrix, this.translation.toArray())
        mat3.multiply(this.projectionMatrix, this.projectionMatrix, this.transform)
    }

    public requiresUpdate() {
        return this.update
    }

    public refreshUpdate(update: boolean = true) {
        this.update = update
    }

    public getProjectionMatrix() {
        return this.projectionMatrix
    }

    public render(renderer: WebGLRenderer, scene: Scene): void {} // eslint-disable-line
}
