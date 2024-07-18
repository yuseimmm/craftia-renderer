import { UniformLocation } from './UniformLocation'
import { mat3 } from 'gl-matrix'
import { Vec2, Vec3, Vec4 } from '../units'

export type UniformType = {
    float: number
    int: number
    'vec2<float>': Vec2
    'vec2<int>': Vec2
    'vec3<float>': Vec3
    'vec3<int>': Vec3
    'vec4<float>': Vec4
    'vec4<int>': Vec4
    'mat3x3<float>': mat3
}

export class Uniform<TYPE extends keyof UniformType = keyof UniformType> {
    public readonly name: string
    public readonly type: TYPE
    public readonly location: UniformLocation

    public value: UniformType[TYPE]

    constructor(name: string, type: TYPE, value: UniformType[TYPE], location?: UniformLocation) {
        this.name = name
        this.type = type
        this.location = location || new UniformLocation()

        this.value = value
    }

    public bind(gl: WebGL2RenderingContext) {
        if (typeof this.value === 'number') {
            this.bindNumber(gl, this.value)
            return
        }
        if (this.value instanceof Vec2) {
            this.bindVec2(gl, this.value)
            return
        }
        if (this.value instanceof Vec3) {
            this.bindVec3(gl, this.value)
            return
        }
        if (this.value instanceof Vec4) {
            this.bindVec4(gl, this.value)
            return
        }
        if (Array.isArray(this.value) || this.value instanceof Float32Array) {
            this.bindIterable(gl, this.value)
            return
        }

        console.error('Uniform types do not match.', '  value:', this.value)
    }

    private bindNumber(gl: WebGL2RenderingContext, value: number) {
        if (this.type === 'float') {
            gl.uniform1f(this.location.get(), value)
            return
        }
        if (this.type === 'int') {
            gl.uniform1i(this.location.get(), value)
            return
        }
        console.error('Uniform types do not match.', '  value:', this.value)
    }

    private bindIterable(gl: WebGL2RenderingContext, value: Float32Array | number[]) {
        if (this.type == 'mat3x3<float>') {
            gl.uniformMatrix3fv(this.location.get(), false, value)
            return
        }
        console.error('Uniform types do not match.', '  value:', this.value)
    }

    private bindVec2(gl: WebGL2RenderingContext, vec2: Vec2) {
        if (this.type === 'vec2<float>') {
            gl.uniform2f(this.location.get(), vec2.x, vec2.y)
            return
        }
        if (this.type === 'vec2<int>') {
            gl.uniform2i(this.location.get(), vec2.x, vec2.y)
            return
        }
        console.error('Uniform types do not match.', '  value:', this.value)
    }

    private bindVec3(gl: WebGL2RenderingContext, vec3: Vec3) {
        if (this.type === 'vec3<float>') {
            gl.uniform3f(this.location.get(), vec3.x, vec3.y, vec3.z)
            return
        }

        if (this.type === 'vec3<int>') {
            gl.uniform3i(this.location.get(), vec3.x, vec3.y, vec3.z)
            return
        }
        console.error('Uniform types do not match.', '  value:', this.value)
    }

    private bindVec4(gl: WebGL2RenderingContext, vec4: Vec4) {
        if (this.type === 'vec4<float>') {
            gl.uniform4f(this.location.get(), vec4.x, vec4.y, vec4.z, vec4.w)
            return
        }

        if (this.type === 'vec4<int>') {
            gl.uniform4i(this.location.get(), vec4.x, vec4.y, vec4.z, vec4.w)
            return
        }
        console.error('Uniform types do not match.', '  value:', this.value)
    }
}
