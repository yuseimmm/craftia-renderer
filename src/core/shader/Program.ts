import { GLProgram } from './GLProgram'
import { GLShader } from './GLShader'

export class Program {
    public readonly vertexSrc: string
    public readonly fragmentSrc: string
    private gl: WebGL2RenderingContext | null
    private glProgram: GLProgram | null

    constructor(vertexSrc: string, fragmentSrc: string) {
        this.vertexSrc = vertexSrc
        this.fragmentSrc = fragmentSrc

        this.glProgram = null
        this.gl = null
    }
    public generateGLProgram(gl: WebGL2RenderingContext) {
        if (gl === this.gl && this.glProgram) {
            return this.glProgram
        }

        this.gl = gl
        return (this.glProgram = new GLProgram(
            gl,
            new GLShader(gl, WebGL2RenderingContext.VERTEX_SHADER, this.vertexSrc),
            new GLShader(gl, WebGL2RenderingContext.FRAGMENT_SHADER, this.fragmentSrc)
        ))
    }
    public destroy() {
        this.glProgram?.destroy()
        this.glProgram = null
    }
}
