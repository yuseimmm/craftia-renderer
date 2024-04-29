import { GLProgram } from './GLProgram'
import { GLShader } from './GLShader'

export class Program {
    public readonly vertexSrc: string
    public readonly fragmentSrc: string
    private _gl: WebGL2RenderingContext | null
    private _glProgram: GLProgram | null

    constructor(vertexSrc: string, fragmentSrc: string) {
        this.vertexSrc = vertexSrc
        this.fragmentSrc = fragmentSrc

        this._glProgram = null
        this._gl = null
    }
    public generateGLProgram(gl: WebGL2RenderingContext) {
        if (gl === this._gl && this._glProgram) {
            return this._glProgram
        }

        this._gl = gl
        return (this._glProgram = new GLProgram(
            gl,
            new GLShader(gl, WebGL2RenderingContext.VERTEX_SHADER, this.vertexSrc),
            new GLShader(gl, WebGL2RenderingContext.FRAGMENT_SHADER, this.fragmentSrc)
        ))
    }
    public destroy() {
        this._glProgram?.destroy()
        this._glProgram = null
    }
}
