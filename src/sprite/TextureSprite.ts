import { mat3 } from 'gl-matrix'
import { FrameBuffer, Shader, Texture, WebGLRenderer } from '../core'
import { MeshGeometry } from '../mesh/MeshGeometry'
import { Mesh } from '../mesh/Mesh'
import { defaultVertex } from './shaders/defaultVertex'
import { defaultFragment } from './shaders/defaultFragment'
import { UniformGroup, Uniforms } from '../core/uniforms/UniformGroup'
import { ISprite } from './ISprite'

const TEXTURE_UNITNUMBER = 0

export type TextureSpriteShader = Shader<
    UniformGroup<
        {
            int: {
                [key: string]: number
                u_texture: number
            }
            'mat3x3<float>': {
                [key: string]: mat3
                u_matrix: mat3
            }
        } & Uniforms
    >
>

export interface TextureSpriteOptions {
    texture: Texture
    transform?: mat3
    shader?: TextureSpriteShader
}

export class TextureSprite implements ISprite {
    static readonly defaultMatrix: mat3 = mat3.fromValues(1, 0, 0, 0, 1, 0, 0, 0, 1)
    static readonly defaultShader: TextureSpriteShader = Shader.from(
        defaultVertex(),
        defaultFragment(),
        new UniformGroup({
            int: {
                u_texture: 0,
            },
            'mat3x3<float>': {
                u_matrix: TextureSprite.defaultMatrix,
            },
        })
    )
    public readonly texture: Texture
    private _transform: mat3
    private _shader: TextureSpriteShader

    private _mesh
    private _geometryWidth: number
    private _geometryHeight: number

    constructor({ texture, transform, shader }: TextureSpriteOptions) {
        this.texture = texture
        this._transform = transform ?? TextureSprite.defaultMatrix
        this._shader = shader ?? TextureSprite.defaultShader

        this._mesh = new Mesh({
            geometry: new MeshGeometry({
                positions: this._createPositions(),
            }),
            shader: TextureSprite.defaultShader,
            textures: {},
        })

        this._geometryWidth = texture.width
        this._geometryHeight = texture.height
    }

    public get width() {
        return this.texture.width
    }

    public get height() {
        return this.texture.height
    }

    public setShader(shader: Shader) {
        this._shader = shader
    }

    public setTransform(transform: mat3) {
        this._transform = transform
    }

    public getTransform() {
        return this._transform
    }

    public render(renderer: WebGLRenderer, target: FrameBuffer | null) {
        const width = target?.width ? target.width : renderer.width
        const height = target?.height ? target.height : renderer.height
        if (
            this._geometryWidth !== this.texture.width ||
            this._geometryHeight !== this.texture.height
        ) {
            this._onResize()
        }

        this._geometryWidth = this.texture.width
        this._geometryHeight = this.texture.width

        // prettier-ignore
        const projectionMatrix = mat3.fromValues(
            2 / width, 0, 0,
            0, 2 / height, 0,
            -1, -1, 1
        );

        const matrix = mat3.multiply(projectionMatrix, projectionMatrix, this._transform)

        this._mesh.shader = this._shader
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

        renderer.frameBuffer.bind(target)
        renderer.clear()
        renderer.mesh.excude(this._mesh)
    }

    private _onResize() {
        this._mesh.geometry.setPositions(this._createPositions())
    }

    private _createPositions() {
        const x1 = 0
        const x2 = 0 + this.texture.width
        const y1 = 0
        const y2 = 0 + this.texture.height
        // prettier-ignore
        return new Float32Array([
            x1, y1,
            x1, y2,
            x2, y1,
            x2, y2,
        ]);
    }

    public clone() {
        return new TextureSprite({
            texture: this.texture,
        })
    }
}
