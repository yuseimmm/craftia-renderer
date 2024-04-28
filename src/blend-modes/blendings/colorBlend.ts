import { BlendModeProps } from '../BlendMode'
import { hsl } from '../hsl'

export const colorBlend: BlendModeProps = {
    key: 'colorBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendColor(vec3 base, vec3 front) {
            return setLum(front, lum(base));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendColor(base.rgb, front.rgb), front.a);
        `,
    },
}
