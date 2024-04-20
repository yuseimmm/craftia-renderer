import { MeshManager } from '../mesh/MeshManager'
import { AttributeManager } from './attribute'
import { BufferManager } from './buffer'
import { FrameBufferManager } from './frameBuffer'
import { GeometryManager } from './geometry'
import { ShaderManager } from './shader'
import { TextureManager } from './textures'
import { UniformManager } from './uniforms'
import { Vec2, Vec4 } from './units'

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

    constructor(gl2: WebGL2RenderingContext) {
        this.gl = gl2
        this.buffer = new BufferManager(this)
        this.shader = new ShaderManager(this)
        this.geometry = new GeometryManager(this)
        this.texture = new TextureManager(this)
        this.uniforms = new UniformManager(this)
        this.attribute = new AttributeManager(this)
        this.frameBuffer = new FrameBufferManager(this)
        this.mesh = new MeshManager(this)
    }
    public get width() {
        return this.gl.canvas.width
    }
    public get height() {
        return this.gl.canvas.height
    }
    public setSize(size: Vec2) {
        this.gl.canvas.width = size.x
        this.gl.canvas.height = size.y
        this.gl.viewport(0, 0, size.x, size.y)
    }
    public clear(color: Vec4 = new Vec4(0, 0, 0, 0)) {
        this.gl.clearColor(color.x, color.y, color.z, color.w)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        return this
    }
    public getSize() {
        return new Vec2(this.width, this.height)
    }
}
