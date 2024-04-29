/**
 * Wrapper for WebGLFramebuffer
 */
export class GLFrameBuffer {
    private _gl: WebGL2RenderingContext
    private _webGLFramebuffer: WebGLFramebuffer | null
    private _version: number

    /**
     * Create a GLFrameBuffer
     * @param gl WebGL2 context used to create WebGLFramebuffer
     */
    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl
        this._webGLFramebuffer = this._gl.createFramebuffer()
        this._version = 0
    }

    public necessaryUpdate(version: number) {
        return version !== this._version
    }

    public setVersion(version: number) {
        this._version = version
    }

    /**
     * Bind WebGLFramebuffer.
     */
    public bind() {
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._webGLFramebuffer)
    }

    /**
     * destroy WebGLFramebuffer.
     */
    public destroy() {
        this._gl.deleteFramebuffer(this._webGLFramebuffer)
    }

    /**
     * Unbind all currently bound framebuffers.
     * @param gl target
     */
    static unbind(gl: WebGL2RenderingContext) {
        gl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null)
    }
}
