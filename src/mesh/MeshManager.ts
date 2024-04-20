import { WebGLRenderer } from '../core'
import { Mesh } from './Mesh'

export class MeshManager {
    private _renderer: WebGLRenderer
    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer
    }
    public excude(mesh: Mesh) {
        this._renderer.shader.bind(mesh.shader)
        this._renderer.geometry.bind(mesh.geometry)

        for (const [unitNumber, texture] of Object.entries(mesh.textures)) {
            this._renderer.texture.bind(texture, parseInt(unitNumber, 10))
        }

        this._renderer.geometry.drawIndex()
    }
}
