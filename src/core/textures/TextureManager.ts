import { WebGLRenderer } from '../WebGLRenderer'
import { Texture } from './Texture'

export class TextureManager {
    private _renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer
    }
    public bind(texture: Texture | null, unitNumber: number = 0) {
        if (!texture) {
            this.unbind(unitNumber)
            return
        }
        this.update(texture, unitNumber)
        const glTexture = texture.generateGLtexture(this._renderer.gl)
        glTexture.bind(unitNumber)
    }
    public unbind(unitNumber: number) {
        this._renderer.gl.activeTexture(this._renderer.gl.TEXTURE0 + unitNumber)
        this._renderer.gl.bindTexture(this._renderer.gl.TEXTURE_2D, null)
    }
    public update(texture: Texture, unitNumber: number) {
        const glTexture = texture.generateGLtexture(this._renderer.gl)

        if (glTexture.necessaryUpdate(texture.version)) {
            glTexture.setPixcels(
                unitNumber,
                texture.version,
                texture.pixcels,
                texture.width,
                texture.height
            )
        }
    }
}
