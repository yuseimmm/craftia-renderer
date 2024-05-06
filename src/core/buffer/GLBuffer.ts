export type BufferParam = {
    usage?: BufferUsage
}

export interface IArrayBuffer extends ArrayBuffer {}

export interface ITypedArray extends IArrayBuffer {
    readonly length: number
    [index: number]: number
    readonly BYTES_PER_ELEMENT: number
}

export type BufferType = WebGL2RenderingContext[
    | 'ARRAY_BUFFER'
    | 'ELEMENT_ARRAY_BUFFER'
    | 'COPY_READ_BUFFER'
    | 'COPY_WRITE_BUFFER'
    | 'TRANSFORM_FEEDBACK_BUFFER'
    | 'UNIFORM_BUFFER'
    | 'PIXEL_PACK_BUFFER'
    | 'PIXEL_UNPACK_BUFFER']

export type BufferUsage = WebGL2RenderingContext[
    | 'STATIC_DRAW'
    | 'DYNAMIC_DRAW'
    | 'STREAM_DRAW'
    | 'STATIC_READ'
    | 'DYNAMIC_READ'
    | 'STREAM_READ'
    | 'STATIC_COPY'
    | 'DYNAMIC_COPY'
    | 'STREAM_COPY']

/**
 * Wrapper for Typed Arrays to enable transfer to WebGL.
 */
export class GLBuffer {
    private _version: number
    private _byteLength: number
    private _gl: WebGL2RenderingContext
    private _webGLBuffer: WebGLBuffer
    readonly usage: BufferUsage
    readonly type: BufferType

    constructor(
        gl: WebGL2RenderingContext,
        type: BufferType,
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
