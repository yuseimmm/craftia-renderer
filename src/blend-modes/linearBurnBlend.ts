import { BlendModeProps } from './BlendMode'

export const linearBurnBlend: BlendModeProps = {
    key: 'linearBurnBlend',
    bit: {
        func: /*glsl*/ `
        float linearBurn(float base, float front) {
            return max(0.0f, base + front - 1.0f);
        }

        vec3 blendLinearBurn(vec3 base, vec3 front, float opacity) {
            vec3 blended = vec3(
                linearBurn(base.r, front.r), 
                linearBurn(base.g, front.g), 
                linearBurn(base.b, front.b)
            );

            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendLinearBurn(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
