import { BlendModeProps } from './BlendMode'
import { hsl } from './hsl'

export const colorBlend: BlendModeProps = {
    key: 'colorBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendColor(vec3 base, vec3 front, float opacity) {
            return setLum(front, lum(base)) * opacity + base * (1.0f - opacity);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendColor(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
