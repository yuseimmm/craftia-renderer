import { BlendModeProps } from '../BlendMode'

export const pinLightBlend: BlendModeProps = {
    key: 'pinLightBlend',
    bit: {
        func: /*glsl*/ `
        float pinLight(float base, float front) {
            return (front <= 0.5f) ? min(base, 2.0f * front) : max(base, 2.0f * (front - 0.5f));
        }

        vec3 blendPinLight(vec3 base, vec3 front) {
        return vec3(
            pinLight(base.r, front.r), 
            pinLight(base.g, front.g), 
            pinLight(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendPinLight(base.rgb, front.rgb), front.a);
        `,
    },
}
