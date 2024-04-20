import { WebGLRenderer } from '../WebGLRenderer'
import { Shader } from './Shader'

export class ShaderManager {
    private renderer: WebGLRenderer
    private _activeShader: Shader | null

    public get activeShader() {
        return this._activeShader
    }
    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer
        this._activeShader = null
    }
    public bind(shader: Shader) {
        if (this._activeShader === shader) {
            return
        }

        this._activeShader = shader

        //bind program
        const glProgram = shader.program.generateGLProgram(this.renderer.gl)
        glProgram.bind()

        //bind uniforms
        this.renderer.uniforms.bind(shader.uniforms)
    }
    public getAttribLocation(name: string, shader?: Shader) {
        const _shader = shader ?? this._activeShader
        if (!_shader) {
            return -1
        }

        const glProgram = _shader.program.generateGLProgram(this.renderer.gl)
        return glProgram.getAttribLocation(name)
    }
    public getUniformLocation(name: string, shader?: Shader) {
        const _shader = shader ?? this._activeShader
        if (!_shader) {
            return null
        }

        const glProgram = _shader.program.generateGLProgram(this.renderer.gl)
        return glProgram.getUniformLocation(name)
    }
}
