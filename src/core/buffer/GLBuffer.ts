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
    private version: number
    private byteLength: number
    private gl: WebGL2RenderingContext
    private webGLBuffer: WebGLBuffer
    readonly usage: BufferUsage
    readonly type: BufferType

    constructor(
        gl: WebGL2RenderingContext,
        type: BufferType,
        { usage = gl.STATIC_DRAW }: BufferParam = {}
    ) {
        this.gl = gl

        this.type = type
        this.usage = usage

        this.webGLBuffer = gl.createBuffer() as WebGLBuffer
        this.version = 0
        this.byteLength = 0
    }

    public necessaryUpdate(version: number) {
        return this.version !== version
    }

    /**
     * Sets data.
     * If possible, perform subset updates only.
     * @param bufferData Data to be set
     */
    public setData(version: number, bufferData: ITypedArray | null) {
        if (!bufferData) {
            this.setAllData(null)
        } else if (this.byteLength >= bufferData.byteLength) {
            this.setSubData(0, bufferData)
        } else {
            this.setAllData(bufferData)
        }
        this.version = version
    }

    /**
     * Update all data stores.
     * @param bufferData Data to be set
     */
    private setAllData(bufferData: ITypedArray | null) {
        this.bind()
        this.gl.bufferData(this.type, bufferData, this.usage)

        this.byteLength = bufferData ? bufferData.byteLength : 0
        return this
    }

    /**
     * Update subset of datastore.
     * @param offset Offset to start data replacement
     * @param bufferSubData  Data to subset
     */
    private setSubData(offset: number, bufferSubData: ITypedArray) {
        this.bind()
        this.gl.bufferSubData(this.type, offset, bufferSubData)

        return this
    }
    /**
     * bind buffer.
     */
    public bind() {
        this.gl.bindBuffer(this.type, this.webGLBuffer)
    }
    /**
     * unbind buffer.
     */
    public destroy() {
        this.gl.deleteBuffer(this.webGLBuffer)
        this.byteLength = 0
    }
}
