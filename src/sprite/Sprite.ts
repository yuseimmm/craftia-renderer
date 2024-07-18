import { mat3 } from 'gl-matrix'
import { BLEND_MODES, BlendModeShader } from '../blend-modes/BlendMode'
import { Container } from '../contanier'
import { Mesh, MeshGeometry } from '../mesh'
import { Shader } from '../shader'
import { Texture } from '../textures'
import { UniformGroup } from '../uniforms'
import { Vec2 } from '../units'
import { WebGLRenderer } from '../WebGLRenderer'
import { Scene } from '../scene/Scene'

export type SpriteOptions = {
    blendMode?: keyof typeof BLEND_MODES
    translation?: Vec2
    visible?: boolean
    opacity?: number
    shader?: Shader<SpriteUniformGroup>
    texture: Texture
}

export type SpriteUniformGroup = UniformGroup<{
    u_texture: {
        type: 'int'
        value: number
    }
    u_matrix: {
        type: 'mat3x3<float>'
        value: mat3
    }
    u_opacity: {
        type: 'float'
        value: number
    }
}>

const defaultshader = Shader.from(
    /*glsl*/ `#version 300 es
    precision highp float;
    in vec2 a_position;

    in vec2 a_uv;
    out vec2 v_textureCoord;

    uniform mat3 u_matrix;

    void main() {
        v_textureCoord = a_uv;
        gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
    }`,
    /*glsl*/ `#version 300 es
    precision highp float;

    in vec2 v_textureCoord;
    out vec4 outColor;

    uniform sampler2D u_texture;
    uniform float u_opacity;

    void main() {
        vec4 color = texture(u_texture, v_textureCoord);

        outColor = vec4(color.rgb, color.a * u_opacity);
    }`,
    new UniformGroup({
        u_texture: { type: 'int', value: 0 },
        u_matrix: { type: 'mat3x3<float>', value: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
        u_opacity: { type: 'float', value: 1.0 },
    })
)

export class Sprite extends Container {
    protected _mesh: Mesh<Shader<LayerUniformGroup>>

    constructor(options: SpriteOptions) {
        super(options)

        this._mesh = new Mesh({
            shader: defaultshader,
            textures: {
                [0]: options.texture,
            },
            geometry: new MeshGeometry({
                positions: this._createVertexPositions(
                    options.texture.width,
                    options.texture.height
                ),
            }),
        })
    }

    protected get texture() {
        return this._mesh.textures[0]
    }

    protected set texture(texture: Texture) {
        if (
            texture.width !== this._mesh.textures[0].width ||
            texture.height !== this._mesh.textures[0].height
        ) {
            this._mesh.geometry.setPositions(
                this._createVertexPositions(texture.width, texture.height)
            )
        }
        this._mesh.textures[0] = texture
    }

    public render(renderer: WebGLRenderer, scene: Scene) {
        const blendMode = BLEND_MODES[this.blendMode]

        if (blendMode instanceof Shader) {
            scene.clear(renderer, scene.free)
            scene.bind(renderer, scene.free)

            this.excude(renderer, scene.width, scene.height)

            scene.bind(renderer, scene.current)

            renderer.blendMode.blend(
                scene.read(scene.previous),
                scene.read(scene.free),
                BLEND_MODES[this.blendMode] as BlendModeShader,
                1.0
            )

            // Advance the rendering cycle by one.
            scene.spin()

            return
        } else {
            scene.bind(renderer, scene.previous)

            renderer.gl.blendFuncSeparate(
                blendMode.srcRGB,
                blendMode.dstRGB,
                blendMode.srcAlpha,
                blendMode.dstAlpha
            )

            this.excude(renderer, scene.width, scene.height)
        }
    }

    public excude(renderer: WebGLRenderer, sceneWidth: number, sceneHeight: number) {
        const projectionMatrix = mat3.create()

        mat3.multiply(
            projectionMatrix,
            [2 / sceneWidth, 0, 0, 0, 2 / sceneHeight, 0, -1, -1, 1],
            this.getProjectionMatrix()
        )

        this._mesh.shader.uniforms.uniforms.u_matrix.value = projectionMatrix
        this._mesh.shader.uniforms.uniforms.u_opacity.value = this.opacity
        renderer.mesh.excude(this._mesh)
    }

    private _createVertexPositions(width: number, height: number) {
        const x1 = 0
        const x2 = 0 + width
        const y1 = 0
        const y2 = 0 + height

        return new Float32Array([x1, y1, x1, y2, x2, y1, x2, y2])
    }
}
