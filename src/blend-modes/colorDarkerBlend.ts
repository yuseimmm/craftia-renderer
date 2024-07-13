import { BlendModeProps } from './BlendMode'
import { hsl } from './hsl'

export const colorDarkerBlend: BlendModeProps = {
    key: 'colorDarkerBlend',
    bit: {
        func: /*glsl*/ `
        ${hsl}
        vec3 blendColorDarker(vec3 base, vec3 front, float opacity) {
            vec3 blended = lum(base) < lum(front) ? base : front;

            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendColorDarker(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
