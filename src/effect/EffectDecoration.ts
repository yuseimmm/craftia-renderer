import { BlendMode } from '../blend-modes'
import { FrameBuffer, Shader, UniformGroup } from '../core'
import { Mesh, MeshGeometry, MeshTextures } from '../mesh'
import { RenderStream } from '../stream'
import { defaultFragment } from './shaders/defaultFragment'
import { defaultVertex } from './shaders/defaultVertex'

export type DecorationOptions = {
    dest: FrameBuffer
    shader: Shader
    source?: MeshTextures
}

export class EffectDecoration {
    private _mesh: Mesh<BlendMode['shader']>
    private _renderPipeline: RenderStream

    constructor(renderPipeline: RenderStream) {
        this._mesh = new Mesh({
            textures: {},
            geometry: new MeshGeometry(),
            shader: Shader.from(defaultVertex(), defaultFragment(), new UniformGroup({})),
        })

        this._renderPipeline = renderPipeline
    }

    public createDecoration(options: DecorationOptions) {
        this._renderPipeline.renderer.frameBuffer.bind(options.dest)
        this._mesh.textures = options.source ?? {}
        this._mesh.shader = options.shader
        this._renderPipeline.renderer.mesh.excude(this._mesh)
    }
}
