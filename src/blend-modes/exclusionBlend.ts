import { BlendModeProps } from './BlendMode'

export const exclusionBlend: BlendModeProps = {
    key: 'exclusionBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendExclusion(vec3 base, vec3 front, float opacity) {
            vec3 blended = base + front - 2.0f * base * front;
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendExclusion(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
