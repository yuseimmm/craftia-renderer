import { BlendModeProps } from './BlendMode'

export const multiplyBlend: BlendModeProps = {
    key: 'multiplyBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendMultiply(vec3 base, vec3 front, float opacity) {
            return (base.rgb * front.rgb) * opacity + base * (1.0f - opacity);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendMultiply(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
