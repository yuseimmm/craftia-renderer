import { Texture } from '../textures'
import { Vec2 } from '../units'
import { GLFrameBuffer } from './GLFrameBuffer'

export class FrameBuffer {
    private _glFrameBuffer: GLFrameBuffer | null
    private _gl: WebGL2RenderingContext | null
    private _colorTexture: Texture

    private _size: Vec2
    public version: number

    constructor(width?: number, height?: number) {
        this._size = new Vec2(0, 0)
        this._colorTexture = new Texture()

        this._glFrameBuffer = null
        this._gl = null

        this.version = 0

        this.resize(new Vec2(width || 0, height || 0))
    }

    public get width() {
        return this._size.x
    }

    public get height() {
        return this._size.y
    }

    public getColorTexture() {
        return this._colorTexture
    }

    public detachColorTexture() {
        const detachedTexture = this._colorTexture

        this._colorTexture = new Texture()

        if (this._size.x > 0 && this._size.y > 0) {
            this._colorTexture.setPixcels(null, this._size.x, this._size.y)
        }

        this.version++

        return detachedTexture
    }

    public resize(size: Vec2) {
        const _size = size.round()

        if (_size.equal(this._size)) {
            return this
        }
        this._size = _size

        this._colorTexture.setPixcels(null, this._size.x, this._size.y)
        this.version++
    }

    public generateGLframeBuffer(gl: WebGL2RenderingContext) {
        if (gl === this._gl && this._glFrameBuffer) {
            return this._glFrameBuffer
        }
        this._gl = gl
        return (this._glFrameBuffer = new GLFrameBuffer(gl))
    }
    public destroy() {
        this._glFrameBuffer?.destroy()
        this._glFrameBuffer = null
    }
}
