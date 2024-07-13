import { BlendModeProps } from './BlendMode'

export const overlayBlend: BlendModeProps = {
    key: 'overlayBlend',
    bit: {
        func: /*glsl*/ `
        float overlay(float base, float front) {
            return (base <= 0.5f ? front * base * 2.0f : front + (2.0f * base - 1.0f) - (front * (2.0f * base - 1.0f)));
        }
        vec3 blendOverlay(vec3 base, vec3 front, float opacity) {
            vec3 blended =  vec3(
                overlay(base.r, front.r),
                overlay(base.g, front.g),
                overlay(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendOverlay(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
