import { BlendModeProps } from './BlendMode'

export const darkenBlend: BlendModeProps = {
    key: 'darkenBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendDarken(vec3 base, vec3 front, float opacity) {
            return (min(base, front) * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendDarken(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
