import { Vec2 } from '../units'

export type TexOptions = {
    /** A GLint specifying the level of detail. */
    level?: number
    /**A GLenum specifying the color components in the texture. */
    internalformat?: GLenum
    /**A GLenum specifying the format of the texel data. */
    format?: GLenum
    /**A GLenum specifying the data type of the texel data. */
    type?: GLenum
    /**A GLint specifying the width of the border. Must be 0. */
    border?: number
    repeat?: boolean
    flipY?: boolean
    magFilter?: GLenum
    minFilter?: GLenum
}

export type TextureMinFilter = WebGL2RenderingContext[
    | 'NEAREST'
    | 'LINEAR'
    | 'NEAREST_MIPMAP_NEAREST'
    | 'NEAREST_MIPMAP_LINEAR'
    | 'LINEAR_MIPMAP_NEAREST'
    | 'LINEAR_MIPMAP_LINEAR']

export type TextureMagFilter = WebGL2RenderingContext['NEAREST' | 'LINEAR']

export type TexImageSource =
    | OffscreenCanvas
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | ImageBitmap
    | ImageData

export type TexTypedArray = Uint8Array | Uint16Array | Uint32Array | Float32Array | null

export type TexPixcels = TexImageSource | TexTypedArray

export class GLTexture {
    private _version: number
    private _size: Vec2 = new Vec2(0, 0)
    public readonly gl: WebGL2RenderingContext
    public readonly webGLTexture: WebGLTexture
    /** A GLint specifying the level of detail. */
    public readonly level: number
    public readonly internalformat: GLenum
    /**A GLenum specifying the format of the texel data. */
    public readonly format: GLenum
    /**A GLenum specifying the data type of the texel data. */
    public readonly type: GLenum
    /**A GLint specifying the width of the border. Must be 0. */
    public readonly border: number = 0
    public readonly repeat: boolean
    public readonly flipY: boolean

    public readonly magFilter: GLenum
    public readonly minFilter: GLenum

    constructor(
        gl: WebGL2RenderingContext,
        {
            level = 0,
            internalformat = gl.RGBA,
            format = gl.RGBA,
            type = gl.UNSIGNED_BYTE,
            border = 0,
            repeat = false,
            flipY = true,
            magFilter = WebGL2RenderingContext.NEAREST,
            minFilter = WebGL2RenderingContext.NEAREST,
        }: TexOptions = {}
    ) {
        this.gl = gl
        this.webGLTexture = this.gl.createTexture() as WebGLTexture
        this.level = level
        this.internalformat = internalformat
        this.format = format
        this.type = type
        this.border = border
        this.repeat = repeat
        this.flipY = flipY
        this.magFilter = magFilter
        this.minFilter = minFilter
        this._version = 0
    }

    public get width() {
        return this._size.x
    }

    public get height() {
        return this._size.y
    }

    public requiresUpdate(version: number) {
        return version !== this._version
    }

    public bind(unitNmber: number) {
        this.gl.activeTexture(this.gl.TEXTURE0 + unitNmber)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.webGLTexture)
        return this
    }

    /**
     * This transfers a pixel source to the texture.
     * @param unitNmber the texture unit to make active when binding.
     * @param version the version of the texture
     * @param pixcels the pixel source for the texture
     * @param width the width of the texture
     * @param height the height of the texture
     * @returns
     */
    public setPixcels(
        unitNmber: number,
        version: number,
        pixcels: TexPixcels,
        width: number,
        height: number
    ) {
        this._version = version
        this._size = new Vec2(width, height)
        this.bind(unitNmber)

        if (ArrayBuffer.isView(pixcels) || pixcels === null) {
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                this.level,
                this.internalformat,
                this._size.x,
                this._size.y,
                this.border,
                this.format,
                this.type,
                pixcels
            )
        } else {
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                this.level,
                this.internalformat,
                this._size.x,
                this._size.y,
                this.border,
                this.format,
                this.type,
                pixcels
            )
        }

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.minFilter)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.magFilter)

        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY)

        if (!this.repeat) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
        }

        return this
    }

    public destroy() {
        this.gl.deleteTexture(this.webGLTexture)
    }
}
