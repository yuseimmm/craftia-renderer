/**
 * Wrapper for WebGLFramebuffer
 */
export class GLFrameBuffer {
    private gl: WebGL2RenderingContext
    private webGLFramebuffer: WebGLFramebuffer | null
    private version: number

    /**
     * Create a GLFrameBuffer
     * @param gl WebGL2 context used to create WebGLFramebuffer
     */
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl
        this.webGLFramebuffer = this.gl.createFramebuffer()
        this.version = 0
    }

    public necessaryUpdate(version: number) {
        return version !== this.version
    }

    public setVersion(version: number) {
        this.version = version
    }

    /**
     * Bind WebGLFramebuffer.
     */
    public bind() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.webGLFramebuffer)
    }

    /**
     * destroy WebGLFramebuffer.
     */
    public destroy() {
        this.gl.deleteFramebuffer(this.webGLFramebuffer)
    }

    /**
     * Unbind all currently bound framebuffers.
     * @param gl target
     */
    static unbind(gl: WebGL2RenderingContext) {
        gl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null)
    }
}
