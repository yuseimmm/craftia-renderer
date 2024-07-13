import { BlendModeProps } from './BlendMode'

export const screenBlend: BlendModeProps = {
    key: 'screenBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendScreen(vec3 base, vec3 front, float opacity) {
            return (base + front - (base * front)) * opacity + base * (1.0f - opacity);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendScreen(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
