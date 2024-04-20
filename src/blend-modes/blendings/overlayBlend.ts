import { BlendModeProps } from '../BlendMode'

export const overlayBlend: BlendModeProps = {
    key: 'overlayBlend',
    bit: {
        func: /*glsl*/ `
        float overlay(float base, float front) {
            return (base <= 0.5f ? front * base * 2.0f : front + (2.0f * base - 1.0f) - (front * (2.0f * base - 1.0f)));
        }
        vec3 blendOverlay(vec3 base, vec3 front) {
            return vec3(
                overlay(base.r, front.r),
                overlay(base.g, front.g),
                overlay(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendOverlay(base.rgb, front.rgb), front.a);
        `,
    },
}
