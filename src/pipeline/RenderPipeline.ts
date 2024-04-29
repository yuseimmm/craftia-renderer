import { mat3 } from 'gl-matrix'
import { BlendModePipeline } from '../blend-modes/BlendModePipeline'
import { FrameBuffer, Vec2, WebGLRenderer } from '../core'
import { TextureSprite } from '../sprite'

export type RenderPipelineOptions = {
    width?: number
    height?: number
}

/**
 * Class that manages the frame buffer for cosecutive drawings.
 * Using this class, the result of the previous rendering can be used for a new rendering.
 */
export class RenderPipeline {
    public readonly renderer: WebGLRenderer
    public readonly blendMode: BlendModePipeline
    public readonly front: FrameBuffer

    private _frameBuffers: [FrameBuffer, FrameBuffer]
    private _target: 1 | 0

    constructor(renderer: WebGLRenderer, options: RenderPipelineOptions = {}) {
        const width = options.width ?? renderer.width
        const height = options.height ?? renderer.height

        this.renderer = renderer
        this.blendMode = new BlendModePipeline(this)
        this.front = new FrameBuffer(width, height)

        this._frameBuffers = [new FrameBuffer(width, height), new FrameBuffer(width, height)]

        this._target = 0
    }

    public get base() {
        return this._frameBuffers[this._target === 0 ? 1 : 0]
    }

    public get target() {
        return this._frameBuffers[this._target]
    }

    public spin() {
        this._target = this._target === 0 ? 1 : 0
    }

    public readPixcels() {
        const u8 = new Uint8Array(
            this.renderer.gl.drawingBufferWidth * this.renderer.gl.drawingBufferHeight * 4
        )

        this.renderer.frameBuffer.bind(this.target)
        this.renderer.gl.readPixels(
            0,
            0,
            this.front.width,
            this.front.height,
            WebGL2RenderingContext.RGBA,
            WebGL2RenderingContext.UNSIGNED_BYTE,
            u8
        )
        return u8
    }

    public readPixcelsFront() {
        const u8 = new Uint8Array(
            this.renderer.gl.drawingBufferWidth * this.renderer.gl.drawingBufferHeight * 4
        )

        this.renderer.frameBuffer.bind(this.front)
        this.renderer.gl.readPixels(
            0,
            0,
            this.front.width,
            this.front.height,
            WebGL2RenderingContext.RGBA,
            WebGL2RenderingContext.UNSIGNED_BYTE,
            u8
        )
        return u8
    }

    public renderScreen() {
        const sprite = new TextureSprite({
            texture: this.target.getColorTexture(),
            transform: mat3.identity(mat3.create()),
        })

        sprite.render(this.renderer, null)
    }

    public destroy() {
        this._frameBuffers.forEach((fbo) => {
            fbo.destroy()
        })

        this.front.destroy()
    }

    /**
     * Resizes all frame buffers managed by the render pipe.
     * Note: All drawing content will be lost.
     * @param size
     */
    public resize(size: Vec2) {
        this._frameBuffers.forEach((fbo) => {
            fbo.resize(size)
        })
        this.front.resize(size)
    }
}
