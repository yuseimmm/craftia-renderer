import { BlendModeProps } from './BlendMode'

export const colorBurnBlend: BlendModeProps = {
    key: 'colorBurnBlend',
    bit: {
        func: /*glsl*/ `
        float colorBurn(float base, float front) {
            if(base == 1.0f) {
                return 1.0f;
            } else if(front == 0.0f) {
                return 0.0f;
            } else {
                return 1.0f - min(1.0f, (1.0f - base) / front);
            }
        }

        vec3 blendColorBurn(vec3 base, vec3 front, float opacity) {
            vec3 blended = vec3(
                colorBurn(base.r, front.r), 
                colorBurn(base.g, front.g),
                colorBurn(base.b, front.b)
            );

            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendColorBurn(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
