import { Vec2 } from '../units'
import { GLTexture, TexOptions, TexPixcels } from './GLTexture'

export class Texture {
    readonly options: TexOptions

    public pixcels: TexPixcels
    public size: Vec2
    public version: number

    private glTexture: GLTexture | null
    private gl: WebGL2RenderingContext | null

    constructor(options: TexOptions = {}) {
        this.options = options

        this.pixcels = null
        this.size = new Vec2(0, 0)

        this.glTexture = null
        this.gl = null

        this.version = 0
    }

    public setPixcels(pixcels: TexPixcels, size: Vec2) {
        if (pixcels === this.pixcels && size.equal(this.size)) {
            return this
        }

        this.pixcels = pixcels
        this.size = size
        this.version++
        return this
    }
    public generateGLtexture(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glTexture) {
            return this.glTexture
        }
        this.gl = gl

        return (this.glTexture = new GLTexture(gl, this.options))
    }
    public destroy() {
        this.glTexture?.destroy()
        this.glTexture = null
        this.pixcels = null
    }
}
