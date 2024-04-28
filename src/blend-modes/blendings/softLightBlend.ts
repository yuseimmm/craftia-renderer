import { BlendModeProps } from '../BlendMode'

export const softLightBlend: BlendModeProps = {
    key: 'softLightBlend',
    bit: {
        func: /*glsl*/ `
        float softLight(float base, float front) {
            if(base < 0.5f) {
                return 2.0f * front * base + pow(front, 2.0f) * (1.0f - 2.0f * base);
            } else {
                return 2.0f * front * (1.0f - base) + sqrt(front) * (2.0f * base - 1.0f);
            }
        }
        vec3 blendSoftLight(vec3 base, vec3 front){
            return vec3(
                softLight(base.r, front.r), 
                softLight(base.g, front.g), 
                softLight(base.b, front.b)
            );
        }
        `,
        main: /*glsl*/ `
        outColor = vec4((1.0f - base.a) * front.rgb + base.a * blendSoftLight(base.rgb, front.rgb), front.a);
        `,
    },
}
