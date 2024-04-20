import { WebGLRenderer } from '../WebGLRenderer'
import { Uniform } from './Uniform'
import { UniformGroup } from './UniformGroup'

export class UniformManager {
    private renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer
    }

    private _bind(uniform: Uniform) {
        this.update(uniform)
        uniform.bind(this.renderer.gl)
    }

    /**
     * Uniformの値を転送
     * @param uniform 転送するUniform
     */
    public bind(uniform: Uniform | UniformGroup) {
        if (uniform instanceof Uniform) {
            this._bind(uniform)
        } else {
            for (const value of Object.values(uniform.uniforms)) {
                this._bind(value)
            }
        }
    }

    /**
     * Uniformをアップデート
     * @param uniform アップデートするUniform
     */
    public update(uniform: Uniform) {
        const shaderManager = this.renderer.shader

        if (uniform.location.necessaryUpdate(shaderManager.activeShader?.id ?? null)) {
            uniform.location.update(
                shaderManager.activeShader?.id ?? null,
                shaderManager.getUniformLocation(uniform.name)
            )
        }
    }
}
