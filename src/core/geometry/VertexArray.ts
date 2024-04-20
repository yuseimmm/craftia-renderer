/**
 * This class is a wrapper for WebGLVertexArrayObject.
 */
export class VertexArray {
    protected gl2: WebGL2RenderingContext
    private webGLVAO: WebGLVertexArrayObject
    private version: number

    /**
     * @param gl WebGL2 context used to create WebGL2RenderingContext
     */
    constructor(gl: WebGL2RenderingContext) {
        this.gl2 = gl
        this.webGLVAO = this.gl2.createVertexArray() as WebGLVertexArrayObject
        this.version = 0
    }

    public necessaryUpdate(version: number) {
        return version !== this.version
    }

    public setVersion(version: number) {
        this.version = version
    }

    public bind() {
        this.gl2.bindVertexArray(this.webGLVAO)
    }

    /**
     * unbind all currently bound vertex arrays.
     */
    public unbind() {
        this.gl2.bindVertexArray(null)
    }

    public destroy() {
        this.gl2.deleteVertexArray(this.webGLVAO)
    }
}
