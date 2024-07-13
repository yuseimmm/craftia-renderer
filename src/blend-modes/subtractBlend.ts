import { BlendModeProps } from './BlendMode'

export const subtractBlend: BlendModeProps = {
    key: 'subtractBlend',
    bit: {
        func: /*glsl*/ `
        float subtract(float base, float front) {
            return max(0.0f, base - front);
        }

        vec3 blendSubtract(vec3 base, vec3 front, float opacity) {
            vec3 blended =  vec3(
                subtract(base.r, front.r), 
                subtract(base.g, front.g), 
                subtract(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendSubtract(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
