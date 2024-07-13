import { FrameBuffer } from '../frameBuffer'
import { Vec2 } from '../units'
import { WebGLRenderer } from '../WebGLRenderer'

export class Scene {
    private _frameBuffers: FrameBuffer[]
    private _currentIndex: number

    constructor(frameBuffers: FrameBuffer[]) {
        this._currentIndex = 0
        this._frameBuffers = frameBuffers
    }
    public get previous() {
        return this._currentIndex === 0 ? 1 : 0
    }

    public get current() {
        return this._currentIndex
    }

    public get free() {
        return 2
    }

    public get width() {
        return this._frameBuffers[this.current].width
    }

    public get height() {
        return this._frameBuffers[this.current].height
    }

    public set width(width: number) {
        const size = new Vec2(width, this.height)
        this._frameBuffers.forEach((fbo) => fbo.resize(size))
    }

    public set height(height: number) {
        const size = new Vec2(this.width, height)
        this._frameBuffers.forEach((fbo) => fbo.resize(size))
    }

    public bind(renderer: WebGLRenderer, index: number) {
        renderer.frameBuffer.bind(this._frameBuffers[index])
    }

    public read(index: number) {
        return this._frameBuffers[index].getColorTexture()
    }

    public spin() {
        this._currentIndex = this._currentIndex === 0 ? 1 : 0
    }

    public clear(renderer: WebGLRenderer, index: number) {
        renderer.frameBuffer.clear(this._frameBuffers[index])
    }
}
