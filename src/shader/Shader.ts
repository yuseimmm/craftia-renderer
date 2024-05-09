import { UniformGroup } from '../uniforms/UniformGroup'
import { Program } from './Program'

let UID = 0

export class Shader<UNIFORMS extends UniformGroup = UniformGroup> {
    public readonly program: Program
    public readonly id: number
    public uniforms: UNIFORMS

    /**
     * create a shader
     * @param program the program the shader will use
     * @param uniforms uniforms
     */
    constructor(program: Program, uniforms: UNIFORMS) {
        this.program = program
        this.id = UID++

        this.uniforms = uniforms
    }

    /**
     * Create shaders from shader source and uniforms information
     * @param vertexSrc a string containing the source code of the fragment shader to set.
     * @param fragmentSrc a string containing the source code of the vertex shader to set.
     * @param uniforms uniforms
     * @returns new shader
     */
    static from<UNIFORMS extends UniformGroup>(
        vertexSrc: string,
        fragmentSrc: string,
        uniforms: UNIFORMS
    ) {
        return new Shader(new Program(vertexSrc, fragmentSrc), uniforms)
    }

    /**
     * Destroy shader
     * @returns
     */
    public destroy(): this {
        this.program.destroy()
        return this
    }
}
