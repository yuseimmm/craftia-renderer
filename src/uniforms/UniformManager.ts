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
     * Transfers the value of Uniform to the GPU.
     * @param uniform
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
     * Update the Uniform location.
     * @param uniform
     */
    public update(uniform: Uniform) {
        const shaderManager = this.renderer.shader

        if (
            shaderManager.activeShader &&
            uniform.location.requiresUpdate(shaderManager.activeShader.id)
        ) {
            uniform.location.update(
                shaderManager.activeShader.id,
                shaderManager.getUniformLocation(uniform.name)
            )
        }
    }
}
