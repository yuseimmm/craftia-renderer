import { BlendModeProps } from '../BlendMode'

export const differenceBlend: BlendModeProps = {
    key: 'differenceBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendDifference(vec3 base, vec3 front) {
            return abs(base - front);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendDifference(base.rgb, front.rgb), front.a);
        `,
    },
}
