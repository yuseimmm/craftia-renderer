import { mat3 } from 'gl-matrix'
import { Vec2 } from '../core'
import { BLEND_MODES } from '../blend-modes/BlendMode'

export interface NodeOptions {
    visible: boolean
    translation: Vec2
    rotation: number
    scaling: Vec2
    transform: mat3
    blendMode: keyof typeof BLEND_MODES
    opacity: number
    parent?: {
        transform?: mat3
    }
}

export abstract class Node {
    public visible: boolean
    public translation: Vec2
    public rotation: number
    public scaling: Vec2
    public transform: mat3
    public blendMode: keyof typeof BLEND_MODES
    public opacity: number
    public parent: {
        transform?: mat3
        opacity?: number
    }

    constructor({
        transform,
        visible,
        translation,
        rotation,
        scaling,
        parent,
        blendMode,
        opacity,
    }: NodeOptions) {
        this.transform = transform
        this.visible = visible
        this.translation = translation
        this.rotation = rotation
        this.scaling = scaling
        this.blendMode = blendMode
        this.opacity = opacity
        this.parent = parent || {}
    }

    public translate(matrix: mat3) {
        // prettier-ignore
        const translation = mat3.fromValues(
            1, 0, 0,
            0, 1, 0,
            this.translation.x, this.translation.y, 1
        )
        return mat3.multiply(matrix, matrix, translation)
    }

    public scale(matrix: mat3) {
        // prettier-ignore
        const scaling = mat3.fromValues(
            this.scaling.x, 0, 0,
            0, this.scaling.y, 0,
            0, 0, 1
        );
        return mat3.multiply(matrix, matrix, scaling)
    }

    public rotate(matrix: mat3) {
        // prettier-ignore
        const rotation = mat3.fromValues(
            Math.cos(this.rotation), -Math.sin(this.rotation), 0,
            Math.sin(this.rotation), Math.cos(this.rotation), 0,
            0, 0, 1
        )
        return mat3.multiply(matrix, matrix, rotation)
    }

    public getMatrix() {
        const matrix = mat3.identity(mat3.create())

        this.scale(matrix)
        this.rotate(matrix)
        this.translate(matrix)

        if (this.parent.transform) {
            return mat3.multiply(matrix, matrix, this.parent.transform)
        }

        return matrix
    }

    public getOpacity() {
        if (this.parent.opacity) {
            return this.parent.opacity * this.opacity
        } else {
            return this.opacity
        }
    }
}
