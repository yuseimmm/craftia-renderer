/**
 * This class is a wrapper for WebGLVertexArrayObject.
 */
export class VertexArray {
    protected gl2: WebGL2RenderingContext
    private _webGLVAO: WebGLVertexArrayObject
    private _version: number

    /**
     * @param gl WebGL2 context used to create WebGL2RenderingContext
     */
    constructor(gl: WebGL2RenderingContext) {
        this.gl2 = gl
        this._webGLVAO = this.gl2.createVertexArray() as WebGLVertexArrayObject
        this._version = 0
    }

    public requiresUpdate(version: number) {
        return version !== this._version
    }

    public setVersion(version: number) {
        this._version = version
    }

    public bind() {
        this.gl2.bindVertexArray(this._webGLVAO)
    }

    /**
     * unbind all currently bound vertex arrays.
     */
    public unbind() {
        this.gl2.bindVertexArray(null)
    }

    public destroy() {
        this.gl2.deleteVertexArray(this._webGLVAO)
    }
}
