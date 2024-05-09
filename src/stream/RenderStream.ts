import { WebGLRenderer } from '../WebGLRenderer'
import { BlendModeStream } from '../blend-modes/BlendModeStream'
import { FrameBuffer } from '../frameBuffer'
import { TextureSprite } from '../sprite'
import { Vec2 } from '../units'

/**
 * Class that manages the frame buffer for cosecutive drawings.
 * Using this class, the result of the previous rendering can be used for a new rendering.
 */
export class RenderStream {
    public readonly renderer: WebGLRenderer
    public readonly blendMode: BlendModeStream
    public readonly front: FrameBuffer

    private _frameBuffers: [FrameBuffer, FrameBuffer]
    private _dest: 1 | 0

    constructor(renderer: WebGLRenderer, width: number, height: number) {
        this.renderer = renderer
        this.blendMode = new BlendModeStream(this)
        this.front = new FrameBuffer(width, height)

        this._frameBuffers = [new FrameBuffer(width, height), new FrameBuffer(width, height)]

        this._dest = 0
    }

    public get base() {
        return this._frameBuffers[this._dest === 0 ? 1 : 0]
    }

    public get dest() {
        return this._frameBuffers[this._dest]
    }

    public spin() {
        this._dest = this._dest === 0 ? 1 : 0
    }

    public renderScreen() {
        const sprite = new TextureSprite({
            texture: this.dest.getColorTexture(),
        })

        sprite.render(this.renderer, null)
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

    public destroy() {
        this._frameBuffers.forEach((fbo) => {
            fbo.destroy()
        })

        this.front.destroy()
    }
}
