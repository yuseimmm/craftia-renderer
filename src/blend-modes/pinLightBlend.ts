import { BlendModeProps } from './BlendMode'

export const pinLightBlend: BlendModeProps = {
    key: 'pinLightBlend',
    bit: {
        func: /*glsl*/ `
        float pinLight(float base, float front) {
            return (front <= 0.5f) ? min(base, 2.0f * front) : max(base, 2.0f * (front - 0.5f));
        }

        vec3 blendPinLight(vec3 base, vec3 front, float opacity) {
            vec3 blended = vec3(
                pinLight(base.r, front.r), 
                pinLight(base.g, front.g), 
                pinLight(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendPinLight(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
