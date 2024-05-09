import { AbstractBuffer } from './AbstractBuffer'
import { BUFFER_TYPE, GLBuffer } from './GLBuffer'

export type IndexBufferData = Int8Array | Int16Array | Int32Array

/**
 * A class that makes it easier to handle WebGL index buffers.
 *
 * @example
 *
 * const indexBuffer = new IndexBuffer(
 *   new Int32Array([0, 1, 2, 1, 3, 2]),
 *   WebGL2RenderingContext.STATIC_DRAW
 * );
 *
 */
export class IndexBuffer extends AbstractBuffer<GLBuffer, IndexBufferData> {
    public generateGLBuffer(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glBuffer) {
            return this.glBuffer
        }

        this.gl = gl

        return (this.glBuffer = new GLBuffer(gl, BUFFER_TYPE.ELEMENT_ARRAY_BUFFER))
    }
}
