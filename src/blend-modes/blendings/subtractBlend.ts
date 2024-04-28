import { BlendModeProps } from '../BlendMode'

export const subtractBlend: BlendModeProps = {
    key: 'subtractBlend',
    bit: {
        func: /*glsl*/ `
        float subtract(float base, float front) {
            return max(0.0f, base - front);
        }

        vec3 blendSubtract(vec3 base, vec3 front) {
            return vec3(
                subtract(base.r, front.r), 
                subtract(base.g, front.g), 
                subtract(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendSubtract(base.rgb, front.rgb), front.a);
        `,
    },
}
