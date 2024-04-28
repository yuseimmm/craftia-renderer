import { BlendModeProps } from '../BlendMode'

export const linearLightBlend: BlendModeProps = {
    key: 'linearLightBlend',
    bit: {
        func: /*glsl*/ `
        float linearLight(float base, float front) {
            return (front <= 0.5f) ? linearBurn(base, 2.0f * front) : linearBurn(base, 2.0f * (front - 0.5f));
        }

        vec3 blendLinearLight(vec3 base, vec3 front) {
            return vec3(
                linearLight(base.r, front.r), 
                linearLight(base.g, front.g), 
                linearLight(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendLinearLight(base.rgb, front.rgb), front.a);
        `,
    },
}
