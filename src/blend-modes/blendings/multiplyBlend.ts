import { BlendModeProps } from '../BlendMode'

export const multiplyBlend: BlendModeProps = {
    key: 'multiplyBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendMultiply(vec3 base, vec3 front) {
            return (base.rgb * front.rgb);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendMultiply(base.rgb, front.rgb), front.a);
        `,
    },
}
