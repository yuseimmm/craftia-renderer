import { BlendModeProps } from '../BlendMode'
import { hsl } from '../hsl'

export const colorDarkerBlend: BlendModeProps = {
    key: 'colorDarkerBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendColorDarker(vec3 base, vec3 front) {
            return lum(base) < lum(front) ? base : front;
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendColorDarker(base.rgb, front.rgb), front.a);
        `,
    },
}
