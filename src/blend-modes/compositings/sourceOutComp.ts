import { BlendModeProps } from '../BlendMode'

export const sourceOutComp: BlendModeProps = {
    key: 'sourceOutComp',
    bit: {
        func: /*glsl*/ `
        vec4 compSourceOut(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb * (1.0f - base.a);
            float alpha = front.a * (1.0f - base.a);

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compSourceOut(base, front);
        `,
    },
}
