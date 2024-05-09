import { BLEND_MODES, BlendMode } from './BlendMode'
import { Mesh } from '../mesh/Mesh'
import { MeshGeometry } from '../mesh/MeshGeometry'
import { RenderStream } from '../stream/RenderStream'
import { FrameBuffer } from '../frameBuffer'
import { Texture } from '../textures'
import { mat3 } from 'gl-matrix'

export type BlendOptions = {
    blendMode: BlendMode
    opacity: number
    front?: Texture
    base?: Texture
    dest?: FrameBuffer
    transform?: mat3
}

export class BlendModeStream {
    private _renderPipeline: RenderStream

    //use for blending!
    private _mesh: Mesh<BlendMode['shader']>

    constructor(pipeline: RenderStream) {
        this._renderPipeline = pipeline
        this._mesh = new Mesh({
            textures: {},
            geometry: new MeshGeometry(),
            shader: BLEND_MODES.normal.shader, //default shader
        })
    }

    public blend({ blendMode, opacity, base, front, dest, transform }: BlendOptions) {
        this._renderPipeline.renderer.frameBuffer.bind(dest || this._renderPipeline.dest)

        blendMode.shader.uniforms.setValues({
            float: {
                u_alpha: opacity,
            },
            'mat3x3<float>': {
                u_matrix: transform ?? BlendMode.defaultMatrix,
            },
        })

        this._mesh.textures = {
            [0]: base || this._renderPipeline.base.getColorTexture(),
            [1]: front || this._renderPipeline.front.getColorTexture(),
        }

        this._mesh.shader = blendMode.shader
        this._renderPipeline.renderer.mesh.excude(this._mesh)
    }
}
