import { BlendModeProps } from './BlendMode'

export const divideBlend: BlendModeProps = {
    key: 'divideBlend',
    bit: {
        func: /*glsl*/ `
        float divide(float base, float front) {
            return (front > 0.0f) ? clamp(base / front, 0.0f, 1.0f) : 1.0f;
        }

        vec3 blendDivide(vec3 base, vec3 front, float opacity) {
            vec3 blended = vec3(
                divide(base.r, front.r), 
                divide(base.g, front.g), 
                divide(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendDivide(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
