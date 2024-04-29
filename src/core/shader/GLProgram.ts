import { GLShader } from './GLShader'

/**
 * This class is a wrapper for WebGLProgram.
 */
export class GLProgram {
    readonly gl: WebGL2RenderingContext
    private _webGLprogram: WebGLProgram
    private _vertexShader: GLShader<typeof WebGL2RenderingContext.VERTEX_SHADER>
    private _fragmentShader: GLShader<typeof WebGL2RenderingContext.FRAGMENT_SHADER>
    /**
     * @param gl WebGL2 context used to create WebGLProgram
     * @param vertexShader vetex shader
     * @param fragmentShader fragment shader
     */
    constructor(
        gl: WebGL2RenderingContext,
        vertexShader: GLShader<typeof WebGL2RenderingContext.VERTEX_SHADER>,
        fragmentShader: GLShader<typeof WebGL2RenderingContext.FRAGMENT_SHADER>
    ) {
        this.gl = gl
        const program = this.gl.createProgram() as WebGLProgram

        this._vertexShader = vertexShader
        this._fragmentShader = fragmentShader

        this.gl.attachShader(program, this._vertexShader.webGLShader)
        this.gl.attachShader(program, this._fragmentShader.webGLShader)
        this.gl.linkProgram(program)

        const linkStatus = this.gl.getProgramParameter(program, this.gl.LINK_STATUS)

        if (linkStatus) {
            this._webGLprogram = program
        } else {
            const info = this.gl.getProgramInfoLog(program) ?? 'Failed to link program.'
            this.gl.deleteProgram(program)
            throw Error(info)
        }
    }

    /**
     * Activate the program.
     */
    public bind() {
        this.gl.useProgram(this._webGLprogram)
    }

    /**
     * returns the location of an attribute variable in this program.
     * @param name the name of attribute
     * @returns the location of an attribute
     */
    public getAttribLocation(name: string) {
        return this.gl.getAttribLocation(this._webGLprogram, name)
    }

    /**
     * returns the location of an uniform variable in this program.
     * @param name the name of uniform
     * @returns the location of an uniform
     */
    public getUniformLocation(name: string) {
        return this.gl.getUniformLocation(this._webGLprogram, name)
    }
    /**
     * Destroy program.
     */
    public destroy() {
        this.gl.deleteProgram(this._webGLprogram)
    }
}
