import { mat3 } from 'gl-matrix'
import { FrameBuffer, Shader, WebGLRenderer } from '../core'

export interface ISprite {
    width: number
    height: number
    render(
        renderer: WebGLRenderer,
        target: FrameBuffer | null,
        options?: SpriteRenderOptions
    ): unknown
    clone(): ISprite
}

export type SpriteRenderOptions = {
    transform?: mat3
    shader?: Shader
}
