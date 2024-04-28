import { BlendModeProps } from '../BlendMode'

export const hardMixBlend: BlendModeProps = {
    key: 'hardMixBlend',
    bit: {
        func: /*glsl*/ `
        float hardMix(float base, float front) {
            return (base + front >= 1.0f) ? 1.0f : 0.0f;
        }

        vec3 blendHardMix(vec3 base, vec3 front) {
            return vec3(
                hardMix(base.r, front.r), 
                hardMix(base.g, front.g), 
                hardMix(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendHardMix(base.rgb, front.rgb), front.a);
        `,
    },
}
