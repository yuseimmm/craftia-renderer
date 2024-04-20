import { Texture } from '../textures'
import { Vec2 } from '../units'
import { GLFrameBuffer } from './GLFrameBuffer'

export class FrameBuffer {
    private glFrameBuffer: GLFrameBuffer | null
    private gl: WebGL2RenderingContext | null
    private colorTexture: Texture

    public size: Vec2
    public version: number

    constructor(width?: number, height?: number) {
        this.size = new Vec2(0, 0)
        this.colorTexture = new Texture()

        this.glFrameBuffer = null
        this.gl = null

        this.version = 0

        this.resize(new Vec2(width || 0, height || 0))
    }

    public get width() {
        return this.size.x
    }

    public get height() {
        return this.size.y
    }

    public getColorTexture() {
        return this.colorTexture
    }

    public detachColorTexture() {
        const detachedTexture = this.colorTexture

        this.colorTexture = new Texture()

        if (this.size.x > 0 && this.size.y > 0) {
            this.colorTexture.setPixcels(null, this.size)
        }

        this.version++

        return detachedTexture
    }

    public resize(size: Vec2) {
        const _size = size.round()

        if (_size.equal(this.size)) {
            return this
        }
        this.size = _size

        this.colorTexture.setPixcels(null, this.size)
        this.version++
    }

    public generateGLframeBuffer(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glFrameBuffer) {
            return this.glFrameBuffer
        }
        this.gl = gl
        return (this.glFrameBuffer = new GLFrameBuffer(gl))
    }
    public destroy() {
        this.glFrameBuffer?.destroy()
        this.glFrameBuffer = null
    }
}
