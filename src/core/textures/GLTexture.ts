import { valueof } from '../../types'
import { Vec2 } from '../units'

export type TexOptions = {
    /** A GLint specifying the level of detail. */
    level?: number
    /**A GLenum specifying the color components in the texture. */
    internalformat?: valueof<typeof TEXTURE_FORMAT>
    /**A GLenum specifying the format of the texel data. */
    format?: valueof<typeof TEXTURE_FORMAT>
    /**A GLenum specifying the data type of the texel data. */
    type?: valueof<typeof TEXTURE_TYPE>
    /**A GLint specifying the width of the border. Must be 0. */
    border?: number
    repeat?: boolean
    flipY?: boolean
    magFilter?: valueof<typeof TEXTURE_MAG_FILTER>
    minFilter?: valueof<typeof TEXTURE_MIN_FILTER>
}

// TODO : Add parameters that can be used with `WebGL2RenderingContext`.
export const TEXTURE_MIN_FILTER = {
    NEAREST: 9728,
    LINEAR: 9729,
    NEAREST_MIPMAP_NEAREST: 9984,
    NEAREST_MIPMAP_LINEAR: 9986,
    LINEAR_MIPMAP_NEAREST: 9985,
    LINEAR_MIPMAP_LINEAR: 9987,
} as const

export const TEXTURE_MAG_FILTER = {
    LINEAR: 9729,
    NEAREST: 9728,
} as const

export const TEXTURE_FORMAT = {
    RGBA: 6408,
    RGB: 6407,
    LUMINANCE_ALPHA: 6410,
    LUMINANCE: 6409,
    ALPHA: 6406,
} as const

export const TEXTURE_TYPE = {
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT_5_6_5: 33635,
    UNSIGNED_SHORT_4_4_4_4: 32819,
    UNSIGNED_SHORT_5_5_5_1: 32820,
} as const

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
    public readonly internalformat: valueof<typeof TEXTURE_FORMAT>
    /**A GLenum specifying the format of the texel data. */
    public readonly format: valueof<typeof TEXTURE_FORMAT>
    /**A GLenum specifying the data type of the texel data. */
    public readonly type: valueof<typeof TEXTURE_TYPE>
    /**A GLint specifying the width of the border. Must be 0. */
    public readonly border: number = 0
    public readonly repeat: boolean
    public readonly flipY: boolean

    public readonly magFilter: valueof<typeof TEXTURE_MAG_FILTER>
    public readonly minFilter: valueof<typeof TEXTURE_MIN_FILTER>

    constructor(
        gl: WebGL2RenderingContext,
        {
            level = 0,
            internalformat = TEXTURE_FORMAT.RGBA,
            format = TEXTURE_FORMAT.RGBA,
            type = TEXTURE_TYPE.UNSIGNED_BYTE,
            border = 0,
            repeat = false,
            flipY = true,
            magFilter = TEXTURE_MAG_FILTER.NEAREST,
            minFilter = TEXTURE_MIN_FILTER.NEAREST,
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
