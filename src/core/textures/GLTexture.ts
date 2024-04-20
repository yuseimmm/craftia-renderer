import { Vec2 } from '../units'

/** テクスチャ画像の仕様・オプション */
export type TexOptions = {
    /** 最大のミップ */
    level?: number
    /**テクスチャの形式 */
    internalformat?: GLenum
    /**データの形式 */
    format?: GLenum
    /**データの種類 */
    type?: GLenum
    /**使用するテクスチャユニット */
    unitNumber?: number
    /**境界線の幅。0 である必要がある。 */
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

/**テクスチャに使用できる画像ののピクセルソース*/
export type TexImageSource =
    | OffscreenCanvas
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | ImageBitmap
    | ImageData

/** テクスチャに使用できる型付き配列のピクセルソース*/
export type TexTypedArray = Uint8Array | Uint16Array | Uint32Array | Float32Array | null

/**テクスチャに利用できるピクセルソース */
export type TexPixcels = TexImageSource | TexTypedArray

/**
 * WegGLの型付き配列テクスチャを管理するクラス。
 */
export class GLTexture {
    private version: number
    /**現在のサイズ */
    private _resolution: Vec2 = new Vec2(0, 0)
    /**WebGL2のコンテキスト */
    public readonly gl: WebGL2RenderingContext
    /**内包する`WebGLTexture` */
    public readonly webGLTexture: WebGLTexture
    /** 最大のミップ */
    public readonly level: number
    /**テクスチャの形式 */
    public readonly internalformat: GLenum
    /**データの形式 */
    public readonly format: GLenum
    /**データの種類 */
    public readonly type: GLenum
    /**境界線の幅。0 である必要がある。 */
    public readonly border: number = 0
    /**画像繰り返し */
    public readonly repeat: boolean
    /**y座標を反転 */
    public readonly flipY: boolean

    public readonly magFilter: GLenum
    public readonly minFilter: GLenum

    public get resolution() {
        return this._resolution
    }

    constructor(
        gl: WebGL2RenderingContext,
        {
            level = 0,
            internalformat = gl.RGBA,
            format = gl.RGBA,
            type = gl.UNSIGNED_BYTE,
            border = 0,
            repeat = false,
            flipY = false,
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
        this.version = 0
    }

    public necessaryUpdate(version: number) {
        return version !== this.version
    }

    public bind(unitNmber: number) {
        this.gl.activeTexture(this.gl.TEXTURE0 + unitNmber)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.webGLTexture)
        return this
    }
    /**
     * This transfers a pixel source to the texture.
     * @param pixcels the pixel source for the texture
     * @param size the width and height of the texture
     * @param unitNmber Texture unit used for binding.
     * @param param2.enableNPOT Whether to use something other than a squared size image.
     * @param param2.repeat Whether to repeat the image.
     * @param param2.yCoordinateInversion Whether to flip the image vertically.
     */
    public setPixcels(unitNmber: number, version: number, pixcels: TexPixcels, size: Vec2) {
        this.version = version
        this._resolution = size
        this.bind(unitNmber)

        if (ArrayBuffer.isView(pixcels) || pixcels === null) {
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                this.level,
                this.internalformat,
                this._resolution.x,
                this._resolution.y,
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
                this._resolution.x,
                this._resolution.y,
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
