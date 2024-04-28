import { BlendModeProps } from '../BlendMode'

export const exclusionBlend: BlendModeProps = {
    key: 'exclusionBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendExclusion(vec3 base, vec3 front) {
            return base + front - 2.0f * base * front;
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendExclusion(base.rgb, front.rgb), front.a);
        `,
    },
}
