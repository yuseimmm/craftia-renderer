import { type valueof } from '../types'
import { Uniform, type UniformType } from './Uniform'

export type Uniforms = {
    [key in keyof UniformType]?: {
        [name: string]: UniformType[key]
    }
}

type OptionalUniforms<UNIFORMS extends Uniforms> = {
    [key in keyof Uniforms]?: {
        [name in keyof UNIFORMS[key]]?: UniformType[key]
    }
}

export class UniformGroup<UNIFORMS extends Uniforms = Uniforms> {
    public uniforms: {
        [key: string]: Uniform
    }

    constructor(uniforms: UNIFORMS) {
        this.uniforms = {}

        for (const [uniformType, _uniforms] of Object.entries(uniforms)) {
            for (const [name, value] of Object.entries(_uniforms)) {
                this.uniforms[name] = new Uniform(name, uniformType as keyof UniformType, value)
            }
        }
    }

    public setValues(uniforms: OptionalUniforms<UNIFORMS>) {
        for (const _uniforms of Object.values(uniforms)) {
            for (const [name, value] of Object.entries(_uniforms)) {
                if (this.uniforms[name] && typeof this.uniforms[name].value !== 'undefined') {
                    this.uniforms[name].value = value as valueof<UniformType>
                } else {
                    console.warn(`Uniform "${name}" is not found.`)
                }
            }
        }
    }
}
