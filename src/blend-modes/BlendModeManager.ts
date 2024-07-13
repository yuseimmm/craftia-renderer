import { Mesh, MeshGeometry } from '../mesh'
import { Texture } from '../textures'
import { WebGLRenderer } from '../WebGLRenderer'
import { BLEND_MODES, BlendModeShader } from './BlendMode'

export class BlendModeManager {
    private _mesh: Mesh<BlendModeShader>
    private _renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this._mesh = new Mesh({
            geometry: new MeshGeometry(),
            textures: {},
            shader: BLEND_MODES.normal,
        })

        this._renderer = renderer
    }

    public blend(base: Texture, front: Texture, blendMode: BlendModeShader, opacity: number) {
        if (base.height !== front.height || base.width !== front.width) {
            console.error('The base texture and front texture sizes do not match.')
            return
        }

        this._mesh.textures[0] = base
        this._mesh.textures[1] = front
        this._mesh.shader = blendMode

        this._mesh.shader.uniforms.uniforms.u_alpha.value = opacity
        this._mesh.shader.uniforms.uniforms.u_baseTexture.value = 0
        this._mesh.shader.uniforms.uniforms.u_frontTexture.value = 1

        this._renderer.clear()
        this._renderer.mesh.excude(this._mesh)
    }
}
