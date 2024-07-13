import { BlendModeProps } from './BlendMode'

export const colorDodgeBlend: BlendModeProps = {
    key: 'colorDodgeBlend',
    bit: {
        func: /*glsl*/ `
        float colorDodge(float base, float front) {
            if(base == 0.0f) {
                return 0.0f;
            } else if(front == 1.0f) {
                return 1.0f;
            } else {
                return min(1.0f, base / (1.0f - front));
            }
        }

        vec3 blendColorDodge(vec3 base, vec3 front, float opacity) {
            vec3 blended = vec3(
                colorDodge(base.r, front.r), 
                colorDodge(base.g, front.g), 
                colorDodge(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendColorDarker(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
