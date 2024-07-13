import { valueof } from '../types'
import { Uniform, UniformType } from './Uniform'

type Uniforms = {
    [key: string]: {
        type: keyof UniformType
        value: valueof<UniformType>
    }
}

export class UniformGroup<UNIFORMS extends Uniforms = Uniforms> {
    public uniforms: {
        [key in keyof UNIFORMS]: Uniform
    }

    constructor(uniforms: UNIFORMS) {
        this.uniforms = {} as { [key in keyof UNIFORMS]: Uniform }

        for (const [name, options] of Object.entries(uniforms)) {
            this.uniforms[name as keyof UNIFORMS] = new Uniform(name, options.type, options.value)
        }
    }
}
