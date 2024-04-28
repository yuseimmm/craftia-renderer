import { BlendModeProps } from '../BlendMode'

export const sourceInComp: BlendModeProps = {
    key: 'sourceInComp',
    bit: {
        func: /*glsl*/ `
        vec4 compSourceIn(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb * base.a;
            float alpha = front.a * base.a;

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compSourceIn(base, front);
        `,
    },
}
