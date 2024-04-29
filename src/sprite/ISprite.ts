import { mat3 } from 'gl-matrix'
import { FrameBuffer, Shader, WebGLRenderer } from '../core'

export interface ISprite {
    transform: mat3
    shader: Shader
    width: number
    height: number
    render(renderer: WebGLRenderer, target: FrameBuffer | null): unknown
    clone(): ISprite
}
