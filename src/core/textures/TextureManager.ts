import { WebGLRenderer } from '../WebGLRenderer'
import { Texture } from './Texture'

export class TextureManager {
    private readonly renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer
    }
    public bind(texture: Texture | null, unitNumber: number = 0) {
        if (!texture) {
            this.unbind(unitNumber)
            return
        }
        this.update(texture, unitNumber)
        const glTexture = texture.generateGLtexture(this.renderer.gl)
        glTexture.bind(unitNumber)
    }
    public unbind(unitNumber: number) {
        this.renderer.gl.activeTexture(this.renderer.gl.TEXTURE0 + unitNumber)
        this.renderer.gl.bindTexture(this.renderer.gl.TEXTURE_2D, null)
    }
    public update(texture: Texture, unitNumber: number) {
        const glTexture = texture.generateGLtexture(this.renderer.gl)

        if (glTexture.necessaryUpdate(texture.version)) {
            glTexture.setPixcels(unitNumber, texture.version, texture.pixcels, texture.size)
        }
    }
}
