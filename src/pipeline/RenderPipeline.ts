import { BlendModePipeline } from '../blend-modes/BlendModePipeline'
import { FrameBuffer, Vec2, WebGLRenderer } from '../core'

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
    public readonly front: FrameBuffer
    public readonly blendMode: BlendModePipeline

    private _frameBuffers: [FrameBuffer, FrameBuffer]
    private _target: 1 | 0

    constructor(renderer: WebGLRenderer, options: RenderPipelineOptions = {}) {
        this.renderer = renderer
        this.blendMode = new BlendModePipeline(this)

        this.front = new FrameBuffer(options.width, options.height)
        this._frameBuffers = [
            new FrameBuffer(options.width, options.height),
            new FrameBuffer(options.width, options.height),
        ]

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

    public use() {
        this.renderer.frameBuffer.bind(this.front)
    }

    public readPixcels() {
        const u8 = new Uint8Array(
            this.renderer.gl.drawingBufferWidth * this.renderer.gl.drawingBufferHeight * 4
        )

        this.renderer.frameBuffer.bind(this.target)
        this.renderer.gl.readPixels(
            0,
            0,
            this.front.size.x,
            this.front.size.y,
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
            this.front.size.x,
            this.front.size.y,
            WebGL2RenderingContext.RGBA,
            WebGL2RenderingContext.UNSIGNED_BYTE,
            u8
        )
        return u8
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
