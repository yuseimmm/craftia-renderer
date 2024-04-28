import { BlendModeProps } from '../BlendMode'

export const lightenBlend: BlendModeProps = {
    key: 'lightenBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendLighten(vec3 base, vec3 front) {
            return max(base, front);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendLighten(base.rgb, front.rgb), front.a);
        `,
    },
}
