import { AttributeLocation } from './AttributeLocation'

export class Attribute {
    /** the index of associated buffer */
    public buffer: number
    /** the name of attribute*/
    public name: string
    /** the number of components per vertex attribute */
    public size: number
    /** the offset in bytes between the beginning of consecutive vertex attributes*/
    public stride: number = 0
    /** an offset in bytes of the first component in the vertex attribute array*/
    public offset: number = 0
    /** the location of the vertex attribute that is to be modified*/
    readonly location: AttributeLocation

    /**
     * A class for managing vertex attributesof buffers.
     *
     * Vertex attributes specify the layout of the currently bound buffer..
     *
     * @param buffer the index of the buffer that this attribute will look for
     * @param name the name of attribute
     * @param size the number of components per vertex attribute
     * @param stride the offset in bytes between the beginning of consecutive vertex attributes
     * @param offset an offset in bytes of the first component in the vertex attribute array
     */
    constructor(buffer: number, name: string, size: number, stride: number, offset: number) {
        this.buffer = buffer
        this.name = name
        this.size = size
        this.stride = stride
        this.offset = offset
        this.location = new AttributeLocation()
    }

    public bind(gl2: WebGL2RenderingContext) {
        gl2.enableVertexAttribArray(this.location.get())
        gl2.vertexAttribPointer(
            this.location.get(),
            this.size,
            gl2.FLOAT,
            false,
            this.stride,
            this.offset
        )
    }
}
