import { BlendModeProps } from './BlendMode'

export const normalBlend: BlendModeProps = {
    key: 'normalBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendNormal(vec3 base, vec3 front, float opacity) {
            return (front.rgb) * opacity + base * (1.0f - opacity);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendNormal(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
