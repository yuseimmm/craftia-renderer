import { BlendModeProps } from '../BlendMode'

export const darkenBlend: BlendModeProps = {
    key: 'darkenBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendDarken(vec3 base, vec3 front) {
            return min(base, front);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendDarken(base.rgb, front.rgb), front.a);
        `,
    },
}
