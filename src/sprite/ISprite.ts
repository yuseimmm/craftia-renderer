import { mat3 } from 'gl-matrix'
import { WebGLRenderer } from '../WebGLRenderer'
import { FrameBuffer } from '../frameBuffer'
import { Shader } from '../shader'

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
