import { Attribute } from '../attribute'
import { AbstractBuffer } from '../buffer/AbstractBuffer'
import { IndexBuffer } from '../buffer/IndexBuffer'
import { VertexBuffer } from '../buffer/VertexBuffer'
import { VertexArray } from './VertexArray'

export type GeometryOptions = {
    attributes?: {
        [key: string]: {
            buffer: VertexBuffer | Float32Array | number[]
            size: number
            stride?: number
            offset?: number
        }
    }
    indices?: IndexBuffer | Int16Array | number[]
    topology?: GLenum
}

/**
 * This class represents a model for vertex buffers and vertex attributes.
 *
 * @example
 *
 * const geometry = new Geometry();
 *
 * geometry.addAttribute('a_texCoord',[ 0.0, 0.0, 0.0, 1.0, 1.0,  0.0 ,1.0, 1.0 ], 2);
 * geometry.addIndex([0, 1, 2, 1, 3, 2]);
 *
 */
export class Geometry {
    public buffers: (IndexBuffer | VertexBuffer)[]
    public attributes: Attribute[]
    public topology: GLenum

    public indexBuffer: IndexBuffer | null
    public version: number

    private vertexArray: VertexArray | null
    private gl: WebGL2RenderingContext | null

    constructor(options: GeometryOptions = {}) {
        this.buffers = []
        this.attributes = []

        this.indexBuffer = null
        this.vertexArray = null
        this.gl = null

        this.version = 0

        this.topology = options.topology || WebGL2RenderingContext.TRIANGLES

        if (options.attributes) {
            for (const [key, a] of Object.entries(options.attributes)) {
                this.addAttribute(key, a.buffer, a.size, a.stride, a.offset)
            }
        }
        if (options.indices) {
            this.addIndex(options.indices)
        }
    }

    /**
     * Add vertex buffers and vertex attribute and flag them for upload to the GPU.
     *
     * @param name vertex attribute name
     * @param buffer buffer that this attribute searches.
     * @param size the number of components per vertex attribute
     */
    public addAttribute(
        name: string,
        buffer: VertexBuffer | Float32Array | number[],
        size: number,
        stride?: number,
        offset?: number
    ) {
        let _buffer: VertexBuffer

        if (buffer instanceof VertexBuffer) {
            _buffer = buffer
        } else {
            const bufferData = buffer instanceof Array ? new Float32Array(buffer) : buffer

            _buffer = new VertexBuffer(bufferData)
        }

        let bufferIndex = this.buffers.indexOf(_buffer)

        if (bufferIndex === -1) {
            this.buffers.push(_buffer)

            bufferIndex = this.buffers.length - 1
        }

        const attribute = new Attribute(bufferIndex, name, size, stride || 0, offset || 0)
        this.attributes.push(attribute)

        this.version++
        return this
    }

    /**
     * Gets the vertex attributes.
     * @param name the name of vertex attribute
     * @returns the vertex attribute. If not found, this returns null.
     */
    public getAttribute(name: string) {
        for (let i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i].name === name) return this.attributes[i]
        }
        return null
    }

    /**
     * Gets the vertex buffer to be searched by vertex attribute.
     * @param name the name of vertex attribute
     * @returns the vertex buffer. If not found, this returns null.
     */
    public getBuffer(name: string): AbstractBuffer | null {
        const bufferIndex = this.getAttribute(name)?.buffer

        return typeof bufferIndex !== 'undefined' ? this.buffers[bufferIndex] : null
    }

    /**
     * Sets the index buffer and flags that an upload to the GPU is required.
     * @param buffer index buffer
     */
    public addIndex(buffer: IndexBuffer | Int16Array | number[]): this {
        let _buffer: IndexBuffer

        if (buffer instanceof IndexBuffer) {
            _buffer = buffer
        } else {
            const bufferData = buffer instanceof Array ? new Int16Array(buffer) : buffer

            _buffer = new IndexBuffer(bufferData)
        }

        this.indexBuffer = _buffer
        this.buffers.push(_buffer)

        this.version++
        return this
    }

    /**
     * Get index buffer.
     * @returns the index buffer. If not found, this returns null.
     */
    public getIndexBuffer(): IndexBuffer | null {
        return this.indexBuffer
    }

    /**
     * Interleave buffers so that all current attributes use a single buffer.
     * This improves performance slightly..
     * @returns self
     */
    public interleave(): this {
        //check if the array is already interleaved.
        if (this.buffers.length === 1 || (this.indexBuffer && this.buffers.length === 2)) {
            return this
        }
        let offset: number = 0
        const array: number[] = []
        const attributes: Attribute[] = []

        for (let i = 0; i < this.attributes.length; i++) {
            const attribute = this.attributes[i]
            const buffer = this.buffers[attribute.buffer]

            array.push(...Array.from(buffer.data))

            attributes[i] = new Attribute(0, attribute.name, attribute.size, 0, offset)
            offset += buffer.data.length * Float32Array.BYTES_PER_ELEMENT

            buffer.destroy()
        }
        this.attributes = attributes
        this.buffers = this.indexBuffer
            ? [new VertexBuffer(new Float32Array(array)), this.indexBuffer]
            : [new VertexBuffer(new Float32Array(array))]

        this.version++
        return this
    }

    /**
     * destroy geometry
     */
    public destroy(): this {
        this.indexBuffer = null
        this.buffers = []
        this.attributes = []

        this.vertexArray?.destroy()
        this.vertexArray = null

        return this
    }

    /**
     * Returns a vertex array.
     * If necessary, this creates a new vertex array
     *
     * @param gl WebGL2 context used to create vertex array
     * @returns vertex array
     */
    public generateVao(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.vertexArray) {
            return this.vertexArray
        }
        this.gl = gl
        return (this.vertexArray = new VertexArray(gl))
    }
}
