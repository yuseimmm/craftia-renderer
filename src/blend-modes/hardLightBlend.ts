import { BlendModeProps } from './BlendMode'

export const hardLightBlend: BlendModeProps = {
    key: 'hardLightBlend',
    bit: {
        func: /*glsl*/ `
        float hardLight(float base, float front) {
            return (front <= 0.5f ? base * front * 2.0f : base + (2.0f * front - 1.0f) - (base * (2.0f * front - 1.0f)));
        }
        vec3 blendHardLight(vec3 base, vec3 front, float opacity) {
            vec3 blended =  vec3(
                hardLight(base.r, front.r),
                hardLight(base.g, front.g),
                hardLight(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }

        `,
        main: /*glsl*/ `
        outColor = vec4(blendHardLight(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
