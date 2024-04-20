import { BlendModeProps } from '../BlendMode'

export const normalBlend: BlendModeProps = {
    key: 'normalBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendNormal(vec3 base, vec3 front) {
            return (front.rgb);
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendNormal(base.rgb, front.rgb), front.a);
        `,
    },
}
