import { mat3 } from 'gl-matrix'
import { BLEND_MODES } from '../blend-modes'
import { Texture, Vec2 } from '../core'
import { RenderStream } from '../stream'
import { EffectStream } from '../effect/EffectStream'
import { EffectStroke } from '../effect'

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
    fill: number
}

export type ContainerRenderOptions = {
    parentOpacity?: number
}

// prettier-ignore
export type Effects = {
    'stroke'?: EffectStroke
}

const EFFECTS = ['stroke'] as const

export abstract class Container {
    private _blendMode: keyof typeof BLEND_MODES
    private _scaling: Vec2
    private _translation: Vec2
    private _rotation: number
    private _transform: mat3
    private _visible: boolean
    private _opacity: number
    private _fill: number
    private _effects: Effects
    protected projectionMatrix: mat3

    protected update: boolean
    public updateEffects: boolean

    constructor({
        blendMode,
        scaling,
        translation,
        rotation,
        transform,
        visible,
        opacity,
        fill,
    }: Partial<ContainerOptions>) {
        this._blendMode = blendMode ?? 'normal'
        this._scaling = scaling ?? new Vec2(1, 1)
        this._translation = translation ?? new Vec2(0, 0)
        this._rotation = rotation ?? 0
        this._transform = transform ?? mat3.create()
        this._visible = visible ?? true
        this._opacity = opacity ?? 1.0
        this._fill = fill ?? 1.0

        this._effects = {}

        this.projectionMatrix = mat3.create()
        this.update = false
        this.updateEffects = false

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
        this._opacity = opacity
        this.update = true
    }

    public get fill() {
        return this._fill
    }

    public set fill(fill: number) {
        this._fill = fill
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
        this.updateEffects = true
    }

    protected get rotation() {
        return this._rotation
    }

    protected set rotation(rotation: number) {
        this._rotation = rotation

        this.updateProjectionMatrix()
        this.update = true
        this.updateEffects = true
    }

    protected get transform() {
        return this._transform
    }

    protected set transform(transform: mat3) {
        this._transform = transform

        this.updateProjectionMatrix()
        this.update = true
        this.updateEffects = true
    }

    protected get scaling() {
        return this._scaling
    }

    protected set scaling(scaling: Vec2) {
        this._scaling = scaling

        this.updateProjectionMatrix()
        this.update = true
        this.updateEffects = true
    }

    public setEffect<KEY extends keyof Effects>(key: KEY, effect: Effects[KEY]) {
        this._effects[key] = effect

        this.updateEffects = true
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

    public render(
        masterStream: RenderStream,
        effectStream: EffectStream,
        options: ContainerRenderOptions = {}
    ) {
        masterStream.spin()

        const front = this.renderFront(masterStream, effectStream)

        effectStream.masterBase = masterStream.base.getColorTexture()
        effectStream.masterFront = front

        if (this.updateEffects) {
            for (const effect of Object.values(this._effects)) {
                effect.update(effectStream)
            }
        }

        let useEffects: boolean = false

        for (let i = 0; i < EFFECTS.length; i++) {
            const effect = this._effects[EFFECTS[i]]

            if (effect) {
                effect.render(effectStream)
                useEffects = true
            }
        }

        masterStream.blendMode.blend({
            front: front,
            blendMode: BLEND_MODES[this._blendMode],
            opacity: this.opacity * this.fill * (options.parentOpacity ?? 1.0),
        })

        if (useEffects) {
            masterStream.spin()
            masterStream.blendMode.blend({
                front: effectStream.dest.getColorTexture(),
                blendMode: BLEND_MODES['normal'],
                opacity: 1.0,
            })
        }
    }

    // override!!
    abstract renderFront(masterPipeline: RenderStream, effectPipeline: EffectStream): Texture
}
