import { BlendModeProps } from './BlendMode'
import { hsl } from './hsl'

export const luminosityBlend: BlendModeProps = {
    key: 'luminosityBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendLuminosity(vec3 base, vec3 front, float opacity) {
            return setLum(base, lum(front)) * opacity + base * (1.0f - opacity);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendLuminosity(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
