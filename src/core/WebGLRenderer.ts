import { MeshManager } from '../mesh/MeshManager'
import { RenderStream } from '../stream'
import { AttributeManager } from './attribute'
import { BufferManager } from './buffer'
import { FrameBufferManager } from './frameBuffer'
import { GeometryManager } from './geometry'
import { ShaderManager } from './shader'
import { TextureManager } from './textures'
import { UniformManager } from './uniforms'
import { Vec4 } from './units'

export type WebGLRendererOptions = {
    width: number
    height: number
}

export class WebGLRenderer {
    public readonly gl: WebGL2RenderingContext
    public readonly buffer: BufferManager
    public readonly shader: ShaderManager
    public readonly geometry: GeometryManager
    public readonly texture: TextureManager
    public readonly uniforms: UniformManager
    public readonly attribute: AttributeManager
    public readonly frameBuffer: FrameBufferManager
    public readonly mesh: MeshManager

    constructor(gl2: WebGL2RenderingContext, options: WebGLRendererOptions) {
        this.gl = gl2
        this.buffer = new BufferManager(this)
        this.shader = new ShaderManager(this)
        this.geometry = new GeometryManager(this)
        this.texture = new TextureManager(this)
        this.uniforms = new UniformManager(this)
        this.attribute = new AttributeManager(this)
        this.frameBuffer = new FrameBufferManager(this)
        this.mesh = new MeshManager(this)

        this.resize(options.width, options.height)
    }
    public get width() {
        return this.gl.canvas.width
    }
    public get height() {
        return this.gl.canvas.height
    }
    public resize(width: number, height: number) {
        this.gl.canvas.width = width
        this.gl.canvas.height = height
        this.gl.viewport(0, 0, width, height)
        return this
    }
    public clear(color: Vec4 = new Vec4(0, 0, 0, 0)) {
        this.gl.clearColor(color.x, color.y, color.z, color.w)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        return this
    }
    public createRenderStream(width?: number, height?: number) {
        return new RenderStream(this, width ?? this.width, height ?? this.height)
    }
}
