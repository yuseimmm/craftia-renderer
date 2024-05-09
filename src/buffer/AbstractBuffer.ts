import { GLBuffer, ITypedArray } from './GLBuffer'

/**
 * A class that makes it easier to handle webgl buffers.
 */
export abstract class AbstractBuffer<
    T extends GLBuffer = GLBuffer,
    U extends ITypedArray = ITypedArray,
> {
    protected gl: WebGL2RenderingContext | null
    protected glBuffer: T | null

    private _data: U
    private _version: number

    /**
     * Create buffer.
     * @param data Data to be set
     * @param usage Applications for datastores
     */
    constructor(data: U) {
        this._data = data
        this.glBuffer = null
        this.gl = null
        this._version = 0

        this.setData(data)
    }
    public get data() {
        return this._data
    }
    public get version() {
        return this._version
    }

    /**
     * Returns a GLBuffer.
     * If necessary, this creates a new GLBuffer
     * @param gl WebGL2 context used to create GLBuffer
     */
    public abstract generateGLBuffer(gl: WebGL2RenderingContext): T

    /**
     * Set the data in this buffer and flag that it needs to be uploaded to the GPU.
     * @param data Data to be set
     * @returns self
     */
    public setData(data?: U): this {
        this._data = data ?? this._data
        this._version++
        return this
    }
    /**
     * Destroy buffer.
     * @returns self
     */
    public destroy(): this {
        this.glBuffer?.destroy()
        this.glBuffer = null
        return this
    }
}
