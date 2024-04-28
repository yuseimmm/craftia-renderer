import { BlendModeProps } from '../BlendMode'

export const divideBlend: BlendModeProps = {
    key: 'divideBlend',
    bit: {
        func: /*glsl*/ `
        float divide(float base, float front) {
            return (front > 0.0f) ? clamp(base / front, 0.0f, 1.0f) : 1.0f;
        }

        vec3 blendDivide(vec3 base, vec3 front) {
            return vec3(
                divide(base.r, front.r), 
                divide(base.g, front.g), 
                divide(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendDivide(base.rgb, front.rgb), front.a);
        `,
    },
}
