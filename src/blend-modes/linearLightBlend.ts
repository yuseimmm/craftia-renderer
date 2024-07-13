import { BlendModeProps } from './BlendMode'

export const linearLightBlend: BlendModeProps = {
    key: 'linearLightBlend',
    bit: {
        func: /*glsl*/ `
        vec3 blendLinearLight(vec3 base, vec3 front, float opacity) {
            vec3 blended =  vec3(
                linearLight(base.r, front.r), 
                linearLight(base.g, front.g), 
                linearLight(base.b, front.b)
            );
            return (blended * opacity + base * (1.0f - opacity));
        }
        `,
        main: /*glsl*/ `
        outColor = vec4(blendLinearLight(base.rgb, front.rgb, front.a), blend);
        `,
    },
}
