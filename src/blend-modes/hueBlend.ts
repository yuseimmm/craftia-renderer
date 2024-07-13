import { BlendModeProps } from './BlendMode'
import { hsl } from './hsl'

export const hueBlend: BlendModeProps = {
    key: 'hueBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendHue(vec3 base, vec3 front, float opacity) {
            vec3 blended = setLum(setSat(front, sat(base)), lum(base));
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendHue(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
