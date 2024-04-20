import { BlendModeProps } from '../BlendMode'

export const hardLightBlend: BlendModeProps = {
    key: 'hardLightBlend',
    bit: {
        func: /*glsl*/ `
        float hardLight(float base, float front) {
            return (front <= 0.5f ? base * front * 2.0f : base + (2.0f * front - 1.0f) - (base * (2.0f * front - 1.0f)));
        }
        vec3 blendHardLight(vec3 base, vec3 front) {
            return vec3(
                hardLight(base.r, front.r),
                hardLight(base.g, front.g),
                hardLight(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendHardLight(base.rgb, front.rgb), front.a);
        `,
    },
}
