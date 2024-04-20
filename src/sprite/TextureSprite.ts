import { mat3 } from 'gl-matrix'
import { Shader, Texture, Vec2 } from '../core'
import { Sprite, SpriteOptions } from './Sprite'
import { MeshGeometry } from '../mesh/MeshGeometry'
import { Mesh } from '../mesh/Mesh'
import { RenderPipeline } from '../pipeline/RenderPipeline'
import { defaultVertex } from './shaders/defaultVertex'
import { defaultFragment } from './shaders/defaultFragment'
import { UniformGroup } from '../core/uniforms/UniformGroup'

const TEXTURE_UNITNUMBER = 0

const SHADER = Shader.from(
    defaultVertex(),
    defaultFragment(),
    new UniformGroup({
        int: {
            u_texture: 0,
        },
        'mat3x3<float>': {
            u_matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
        },
    })
)

export interface TextureSpriteOptions extends SpriteOptions {
    texture: Texture
}

export class TextureSprite extends Sprite {
    public texture: Texture
    private _mesh
    private _size: Vec2

    constructor({ texture, ...options }: TextureSpriteOptions) {
        super(options)
        this.texture = texture

        this._mesh = new Mesh({
            geometry: new MeshGeometry({
                positions: this._getPositions(),
            }),
            shader: SHADER,
            textures: {},
        })

        this._size = this.texture.size
    }

    public get realWidth() {
        return this.texture.size.x
    }

    public get realHeight() {
        return this.texture.size.y
    }

    public render(target: RenderPipeline) {
        if (!this._size.equal(this.texture.size)) {
            this._onResize()
        }

        this._size = this.texture.size
        // prettier-ignore
        const projectionMatrix = mat3.fromValues(
            2 / target.front.size.x, 0, 0,
            0, 2 / target.front.size.y, 0,
            -1, -1, 1
        );

        const matrix = mat3.multiply(projectionMatrix, projectionMatrix, this.transform)

        this._mesh.shader.uniforms.setValues({
            int: {
                u_texture: 0,
            },
            'mat3x3<float>': {
                u_matrix: matrix,
            },
        })

        this._mesh.textures = {
            [TEXTURE_UNITNUMBER]: this.texture,
        }

        target.use()
        target.renderer.clear()
        target.renderer.mesh.excude(this._mesh)

        return target.front.getColorTexture()
    }

    private _getPositions() {
        const x1 = 0
        const x2 = 0 + this.texture.size.x
        const y1 = 0
        const y2 = 0 + this.texture.size.y
        // prettier-ignore
        return new Float32Array([
            x1, y1,
            x1, y2,
            x2, y1,
            x2, y2,
        ]);
    }

    private _onResize() {
        this._mesh.geometry.setPositions(this._getPositions())
    }
}
