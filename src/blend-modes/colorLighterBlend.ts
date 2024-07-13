import { BlendModeProps } from './BlendMode'
import { hsl } from './hsl'

export const colorLighterBlend: BlendModeProps = {
    key: 'colorLighterBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendDarken(vec3 base, vec3 front, float opacity) {
            return (min(base, front) * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendColorLighter(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
