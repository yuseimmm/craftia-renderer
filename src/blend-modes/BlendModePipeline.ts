import { BLEND_MODES, BlendMode } from './BlendMode'
import { Mesh } from '../mesh/Mesh'
import { MeshGeometry } from '../mesh/MeshGeometry'
import { RenderPipeline } from '../pipeline/RenderPipeline'

export type BlendOptions = {
    blendMode: BlendMode
    opacity: number
}

export class BlendModePipeline {
    private _renderPipeline: RenderPipeline

    //use for blending!
    private _mesh: Mesh<BlendMode['shader']>

    constructor(pipeline: RenderPipeline) {
        this._renderPipeline = pipeline
        this._mesh = new Mesh({
            textures: {},
            geometry: new MeshGeometry(),
            shader: BLEND_MODES.normal.shader, //default shader
        })
    }

    public blend({ blendMode, opacity }: BlendOptions) {
        this._renderPipeline.renderer.frameBuffer.bind(this._renderPipeline.target)

        blendMode.shader.uniforms.setValues({
            float: {
                u_alpha: opacity,
            },
        })

        this._mesh.textures = {
            [0]: this._renderPipeline.base.getColorTexture(),
            [1]: this._renderPipeline.front.getColorTexture(),
        }

        this._mesh.shader = blendMode.shader
        this._renderPipeline.renderer.mesh.excude(this._mesh)
    }
}
