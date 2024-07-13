import { BlendModeProps } from './BlendMode'

export const differenceBlend: BlendModeProps = {
    key: 'differenceBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendDifference(vec3 base, vec3 front, float opacity) {
            return abs(base - front) * opacity + base * (1.0f - opacity);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendDifference(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
