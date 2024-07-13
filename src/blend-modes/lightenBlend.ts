import { BlendModeProps } from './BlendMode'

export const lightenBlend: BlendModeProps = {
    key: 'lightenBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendLighten(vec3 base, vec3 front, float opacity) {
            return max(base, front) * opacity + base * (1.0f - opacity);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendLighten(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
