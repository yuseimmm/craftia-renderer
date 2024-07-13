import { BlendModeProps } from './BlendMode'

export const linearDodgeBlend: BlendModeProps = {
    key: 'linearDodgeBlend',
    bit: {
        func: /*glsl*/ `
        float linearDodge(float base, float front) {
            return min(1.0f, base + front);
        }

        vec3 blendLinearDodge(vec3 base, vec3 front, float opacity) {
            vec3 blended = vec3(
                linearDodge(base.r, front.r), 
                linearDodge(base.g, front.g), 
                linearDodge(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendLinearDodge(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
