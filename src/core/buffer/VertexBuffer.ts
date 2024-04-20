import { AbstractBuffer } from './AbstractBuffer'
import { GLBuffer } from './GLBuffer'

export type VertexBuferData = Float32Array | Float64Array

/**
 * A class that makes it easier to handle WebGL vertex buffers.
 *
 * @example
 *
 * const indexBuffer = new VertexBuffer(
 *   new Float32Array([0, 1, 2, 1, 3, 2]),
 *   WebGL2RenderingContext.STATIC_DRAW
 * );
 *
 */
export class VertexBuffer extends AbstractBuffer<GLBuffer, VertexBuferData> {
    public generateGLBuffer(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glBuffer) {
            return this.glBuffer
        }

        this.gl = gl

        return (this.glBuffer = new GLBuffer(gl, gl.ARRAY_BUFFER))
    }
}
