import { BlendModeProps } from '../BlendMode'
import { hsl } from '../hsl'

export const saturationBlend: BlendModeProps = {
    key: 'saturationBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blenSaturation(vec3 base, vec3 front) {
            return setLum(setSat(base, sat(front)), lum(base));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blenSaturation(base.rgb, front.rgb), front.a);
        `,
    },
}
