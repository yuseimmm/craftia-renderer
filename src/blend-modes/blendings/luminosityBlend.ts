import { BlendModeProps } from '../BlendMode'
import { hsl } from '../hsl'

export const luminosityBlend: BlendModeProps = {
    key: 'luminosityBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendLuminosity(vec3 base, vec3 front) {
            return setLum(base, lum(front));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendLuminosity(base.rgb, front.rgb), front.a);
        `,
    },
}
