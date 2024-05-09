/**
 * This class is a wrapper for WebGLShader.
 */
export class GLShader<T extends WebGL2RenderingContext['VERTEX_SHADER' | 'FRAGMENT_SHADER']> {
    readonly webGLShader: WebGLShader
    readonly type: GLenum
    /**
     * @param gl WebGL2 context used to create WebGLProgram
     * @param type either `gl.VERTEX_SHADER` or `gl.FRAGMENT_SHADER`
     * @param source a string containing the GLSL source code to set.
     */
    constructor(gl: WebGL2RenderingContext, type: T, source: string) {
        this.type = type
        const shader = gl.createShader(this.type) as WebGLShader

        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        const ShaderCompileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

        if (ShaderCompileStatus) {
            this.webGLShader = shader
        } else {
            const info = gl.getShaderInfoLog(shader)
            gl.deleteShader(shader)

            throw Error(`shadertype:${this.getShaderTypeName(this.type)}` + info)
        }
    }
    private getShaderTypeName(shadertype: GLenum) {
        return shadertype === WebGL2RenderingContext.FRAGMENT_SHADER
            ? 'FRAGMENT_SHADER'
            : 'VERTEX_SHADER'
    }
}
