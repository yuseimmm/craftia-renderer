import { WebGLRenderer } from '../WebGLRenderer'
import { Attribute } from './Attribute'

export class AttributeManager {
    private renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer
    }

    public bind(attr: Attribute) {
        this.update(attr)
        attr.bind(this.renderer.gl)
    }
    public update(attr: Attribute) {
        const shaderManager = this.renderer.shader

        if (attr.location.necessaryUpdate(shaderManager.activeShader?.id ?? null)) {
            attr.location.update(
                shaderManager.activeShader?.id ?? null,
                shaderManager.getAttribLocation(attr.name)
            )
        }
    }
}
