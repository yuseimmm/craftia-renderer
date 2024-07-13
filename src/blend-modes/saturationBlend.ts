import { BlendModeProps } from './BlendMode'
import { hsl } from './hsl'

export const saturationBlend: BlendModeProps = {
    key: 'saturationBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blenSaturation(vec3 base, vec3 front, float opacity) {
            vec3 blended = setLum(setSat(base, sat(front)), lum(base));
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blenSaturation(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
