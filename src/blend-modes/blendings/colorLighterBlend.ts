import { BlendModeProps } from '../BlendMode'
import { hsl } from '../hsl'

export const colorLighterBlend: BlendModeProps = {
    key: 'colorLighterBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendColorLighter(vec3 base, vec3 front) {
            return lum(base) > lum(front) ? base : front;
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendColorLighter(base.rgb, front.rgb), front.a);
        `,
    },
}
