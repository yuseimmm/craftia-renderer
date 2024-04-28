import { BlendModeProps } from '../BlendMode'

export const vividLightBlend: BlendModeProps = {
    key: 'vividLightBlend',
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

        float colorDodge(float base, float front) {
            if(base == 0.0f) {
                return 0.0f;
            } else if(front == 1.0f) {
                return 1.0f;
            } else {
                return min(1.0f, base / (1.0f - front));
            }
        }
        float vividLight(float base, float front) {
            return (front < 0.5f) ? colorBurn(base, (2.0f * front)) : colorDodge(base, (2.0f * (front - 0.5f)));
        }
        vec3 blendVividLight(vec3 base, vec3 front) {
            return vec3(
                vividLight(base.r, front.r), 
                vividLight(base.g, front.g),
                vividLight(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendVividLight(base.rgb, front.rgb), front.a);
        `,
    },
}
