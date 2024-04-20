import { BlendModeProps } from '../BlendMode'

export const screenBlend: BlendModeProps = {
    key: 'screenBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendScreen(vec3 back, vec3 front) {
            return (back + front - (back * front));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendScreen(base.rgb, front.rgb), front.a);
        `,
    },
}
