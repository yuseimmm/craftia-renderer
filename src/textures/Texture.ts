import { Vec2 } from '../units'
import { GLTexture, TexOptions, TexPixcels } from './GLTexture'

export class Texture {
    readonly options: TexOptions

    public pixcels: TexPixcels

    public version: number
    private _size: Vec2
    private _glTexture: GLTexture | null
    private _gl: WebGL2RenderingContext | null

    constructor(options: TexOptions = {}) {
        this.options = options

        this.pixcels = null
        this._size = new Vec2(0, 0)

        this._glTexture = null
        this._gl = null

        this.version = 0
    }

    public get width() {
        return this._size.x
    }
    public get height() {
        return this._size.y
    }
    public setPixcels(pixcels: TexPixcels, width: number, height: number) {
        const size = new Vec2(width, height)
        if (pixcels === this.pixcels && size.equal(this._size)) {
            return this
        }

        this.pixcels = pixcels
        this._size = size
        this.version++
        return this
    }
    public generateGLtexture(gl: WebGL2RenderingContext) {
        if (gl === this._gl && this._glTexture) {
            return this._glTexture
        }
        this._gl = gl

        return (this._glTexture = new GLTexture(gl, this.options))
    }
    public destroy() {
        this._glTexture?.destroy()
        this._glTexture = null
        this.pixcels = null
    }
}

export const TEXTURE_EMPTY = new Texture()
