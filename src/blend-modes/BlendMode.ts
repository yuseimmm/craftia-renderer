import { Shader } from '../core'
import { ShaderOptions } from '../types/Shaders'
import { darkenBlend } from './blendings/darkenBlend'
import { hardLightBlend } from './blendings/hardLightBlend'
import { multiplyBlend } from './blendings/multiplyBlend'
import { normalBlend } from './blendings/normalBlend'
import { overlayBlend } from './blendings/overlayBlend'
import { screenBlend } from './blendings/screenBlend'
import { sourceOverComp } from './compositings/sourceOverComp'
import { fragTemplate } from './fragTemplate'
import { vertTemplate } from './vertTemplate'
import { UniformGroup } from '../core/uniforms/UniformGroup'

export type BlendModeProps = {
    key: string
    bit: ShaderOptions
    deps?: BlendModeProps[]
}

let uid = 0

export class BlendMode {
    readonly shader
    readonly id: number

    constructor(blending: BlendModeProps, compositing: BlendModeProps) {
        const bit: ShaderOptions = {
            header: `
            ${blending.bit.header ?? ''}
            ${compositing.bit.header ?? ''}`,

            func: /*glsl*/ `
            ${blending.bit.func ?? ''}
            ${compositing.bit.func ?? ''}
        
            vec4 blend(vec4 base, vec4 front){
                ${blending.bit.start ?? ''}
                vec4 outColor;
                ${blending.bit.main ?? ''}
                return outColor;
            }
        
            vec4 composite(vec4 base, vec4 front){
                ${compositing.bit.start ?? ''}
                vec4 outColor;
                ${compositing.bit.main ?? ''}
                return outColor;
            }`,

            main: /*glsl*/ `
            outColor = blend(base, front);
            outColor = composite(base, outColor);
            `,
        }

        this.shader = Shader.from(
            vertTemplate(),
            fragTemplate(bit),
            new UniformGroup({
                float: {
                    u_alpha: 1.0,
                },
                int: {
                    u_baseTexture: 0,
                    u_frontTexture: 1,
                },
                'mat3x3<float>': {
                    u_matrix: [1, 0, 0, 0, -1, 0, 0, 0, 1],
                },
            })
        )

        this.id = uid++
    }
}

export const BLEND_MODES = {
    darken: new BlendMode(darkenBlend, sourceOverComp),
    'hard-light': new BlendMode(hardLightBlend, sourceOverComp),
    multiply: new BlendMode(multiplyBlend, sourceOverComp),
    normal: new BlendMode(normalBlend, sourceOverComp),
    overlay: new BlendMode(overlayBlend, sourceOverComp),
    screen: new BlendMode(screenBlend, sourceOverComp),
}
