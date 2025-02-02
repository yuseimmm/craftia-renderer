import { WebGLRenderer } from '../WebGLRenderer'
import { Attribute } from './Attribute'

export class AttributeManager {
    private _renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer
    }

    public bind(attr: Attribute) {
        this.update(attr)
        attr.bind(this._renderer.gl)
    }
    public update(attr: Attribute) {
        const shaderManager = this._renderer.shader
        if (
            shaderManager.activeShader &&
            attr.location.requiresUpdate(shaderManager.activeShader.id)
        ) {
            attr.location.update(
                shaderManager.activeShader.id,
                shaderManager.getAttribLocation(attr.name)
            )
        }
    }
}
