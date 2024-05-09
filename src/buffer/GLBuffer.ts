import { valueof } from '../types'

export type BufferParam = {
    usage?: valueof<typeof BUFFER_USAGE>
}

export interface IArrayBuffer extends ArrayBuffer {}

export interface ITypedArray extends IArrayBuffer {
    readonly length: number
    [index: number]: number
    readonly BYTES_PER_ELEMENT: number
}

export const BUFFER_TYPE = {
    ARRAY_BUFFER: 34962,
    ELEMENT_ARRAY_BUFFER: 34963,
    COPY_READ_BUFFER: 36662,
    COPY_WRITE_BUFFER: 36663,
    TRANSFORM_FEEDBACK_BUFFER: 35982,
    UNIFORM_BUFFER: 35345,
    PIXEL_PACK_BUFFER: 35051,
    PIXEL_UNPACK_BUFFER: 35052,
} as const

export const BUFFER_USAGE = {
    STATIC_DRAW: 35044,
    DYNAMIC_DRAW: 35048,
    STREAM_DRAW: 35040,
    STATIC_READ: 35045,
    DYNAMIC_READ: 35049,
    STREAM_READ: 35041,
    STATIC_COPY: 35046,
    DYNAMIC_COPY: 35050,
    STREAM_COPY: 35042,
} as const

/**
 * Wrapper for Typed Arrays to enable transfer to WebGL.
 */
export class GLBuffer {
    private _version: number
    private _byteLength: number
    private _gl: WebGL2RenderingContext
    private _webGLBuffer: WebGLBuffer
    readonly usage: valueof<typeof BUFFER_USAGE>
    readonly type: valueof<typeof BUFFER_TYPE>

    constructor(
        gl: WebGL2RenderingContext,
        type: valueof<typeof BUFFER_TYPE>,
        { usage = gl.STATIC_DRAW }: BufferParam = {}
    ) {
        this._gl = gl

        this.type = type
        this.usage = usage

        this._webGLBuffer = gl.createBuffer() as WebGLBuffer
        this._version = 0
        this._byteLength = 0
    }

    public requiresUpdate(version: number) {
        return this._version !== version
    }

    /**
     * bind buffer.
     */
    public bind() {
        this._gl.bindBuffer(this.type, this._webGLBuffer)
    }
    /**
     * Sets data.
     * If possible, perform subset updates only.
     * @param bufferData Data to be set
     */
    public setData(version: number, bufferData: ITypedArray | null) {
        if (!bufferData) {
            this._setAllData(null)
        } else if (this._byteLength >= bufferData.byteLength) {
            this._setSubData(0, bufferData)
        } else {
            this._setAllData(bufferData)
        }
        this._version = version
    }

    /**
     * Update all data stores.
     * @param bufferData Data to be set
     */
    private _setAllData(bufferData: ITypedArray | null) {
        this.bind()
        this._gl.bufferData(this.type, bufferData, this.usage)

        this._byteLength = bufferData ? bufferData.byteLength : 0
        return this
    }

    /**
     * Update subset of datastore.
     * @param offset Offset to start data replacement
     * @param bufferSubData  Data to subset
     */
    private _setSubData(offset: number, bufferSubData: ITypedArray) {
        this.bind()
        this._gl.bufferSubData(this.type, offset, bufferSubData)

        return this
    }

    /**
     * unbind buffer.
     */
    public destroy() {
        this._gl.deleteBuffer(this._webGLBuffer)
        this._byteLength = 0
    }
}
