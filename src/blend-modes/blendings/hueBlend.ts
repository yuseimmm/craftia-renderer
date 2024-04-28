import { BlendModeProps } from '../BlendMode'
import { hsl } from '../hsl'

export const hueBlend: BlendModeProps = {
    key: 'hueBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendHue(vec3 base, vec3 front) {
            return setLum(setSat(front, sat(base)), lum(base));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendDarken(base.rgb, front.rgb), front.a);
        `,
    },
}
